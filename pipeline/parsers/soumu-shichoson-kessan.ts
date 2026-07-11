// 総務省「市町村別決算状況調」Excel パーサ
//
// 実データは1年度分が複数ファイルに分かれる（都市別/町村別 × 概況/目的別歳出内訳）。
// このパーサは1ソースの raw ファイル群をまとめて受け取り、団体コードで
// マージした1自治体=1レコードの facts を返す。
//
// 実ファイルの形式（令和6年度で確認）:
// - ヘッダは複数行。「団体コード」を含む行をヘッダ先頭行とする
// - 概況: 団体コード / 団体名 / 住民基本台帳登載人口 / … / 歳入総額 / 歳出総額。
//   都道府県名の列はなく、県名は「団体コードが空で団体名だけの区切り行」として現れる
// - 目的別歳出内訳: ヘッダが3行（漢数字「一」「二」… / 科目名・内訳連番 / 内訳科目名）。
//   労働費と諸支出金は総額列がなく内訳列のみ → 内訳を合算する。
//   末尾の「（参考）一般行政経費」ブロックは款の名前を再掲するため列解決から除外する
// - フィクスチャ（dev/make-fixture.ts）は1ファイル・1行ヘッダに全列が載る形式。
//   同じ列解決ロジック（ヘッダ行に科目名が直接ある場合）で通る
import * as XLSX from "xlsx";
import type { Locator, MuniAccountFact, ParsedDoc, SourceEntry } from "../types";

export const PARSER_VERSION = "0.2.0";

// 目的別歳出の標準科目（この名前の列・列グループを拾う）
const PURPOSE_COLUMNS = [
  "議会費", "総務費", "民生費", "衛生費", "労働費", "農林水産業費", "商工費",
  "土木費", "消防費", "警察費", "教育費", "災害復旧費", "公債費", "諸支出金",
  "前年度繰上充用金",
] as const;

const normalize = (s: unknown): string =>
  String(s ?? "").replace(/[\s　\r\n]/g, "");

/** "1,234" / 1234 / "-" などを数値へ。空・記号は null */
function toNumber(v: unknown): number | null {
  if (v == null || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).replace(/[,\s　]/g, "");
  if (s === "" || s === "-" || s === "−" || s === "…") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** 団体コードを6桁ゼロ埋めに（Excel が数値化して先頭0が落ちる対策） */
function toMuniCode(v: unknown): string | null {
  const s = normalize(v).replace(/\D/g, "");
  if (s.length < 5 || s.length > 6) return null;
  return s.padStart(6, "0");
}

/** 先頭の漢数字（款の番号「一」〜「十四」）を落とす: "五労働費" → "労働費" */
const stripKanjiNo = (s: string): string => s.replace(/^[一二三四五六七八九十]+/, "");
const isKanjiNoOnly = (s: string): boolean => /^[一二三四五六七八九十]*$/.test(s);

interface Options {
  sheet?: string;
  /** 実ファイルの列名ゆれを吸収する: { 正規化後の実列名: 標準列名 } */
  columnAliases?: Record<string, string>;
}

/** シートを行列に展開し、結合セルの値を範囲全体へ展開する（複数行ヘッダの解決用） */
function sheetToRows(sheet: XLSX.WorkSheet): unknown[][] {
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });
  for (const m of sheet["!merges"] ?? []) {
    const v = rows[m.s.r]?.[m.s.c];
    if (v == null || v === "") continue;
    for (let r = m.s.r; r <= m.e.r; r++) {
      for (let c = m.s.c; c <= m.e.c; c++) {
        rows[r] ??= [];
        if (rows[r][c] == null || rows[r][c] === "") rows[r][c] = v;
      }
    }
  }
  return rows;
}

/** 1ファイル分の部分レコード（概況 or 目的別。マージ前） */
interface PartialFact {
  muniCode: string;
  prefName: string;
  muniName: string;
  population?: number | null;
  revenueTotal?: number | null;
  expenditureTotal?: number | null;
  expenditureByPurpose?: Record<string, number>;
  locator: Locator;
}

function parseOneFile(
  filePath: string,
  filename: string,
  opts: Options,
): PartialFact[] {
  const wb = XLSX.readFile(filePath);
  const sheetName = opts.sheet ?? wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  if (!sheet) throw new Error(`シートが見つかりません: ${sheetName}`);
  const rows = sheetToRows(sheet);

  // ヘッダ先頭行 = 「団体コード」を含む行
  const headerIdx = rows.findIndex((r) => (r ?? []).some((c) => normalize(c).includes("団体コード")));
  if (headerIdx < 0) throw new Error(`${filename}: ヘッダ行（「団体コード」を含む行）が見つかりません`);
  const alias = (s: string): string => opts.columnAliases?.[s] ?? s;
  // ヘッダ3行分（実ファイルの目的別歳出は 款番号/科目名・連番/内訳名 の3段）
  const h0 = (rows[headerIdx] ?? []).map((c) => alias(normalize(c)));
  const h1 = (rows[headerIdx + 1] ?? []).map((c) => alias(normalize(c)));
  const h2 = (rows[headerIdx + 2] ?? []).map((c) => alias(normalize(c)));
  const width = Math.max(h0.length, h1.length, h2.length);

  // 「（参考）…」ブロック以降は款名を再掲するため列解決から外す
  let refStart = width;
  for (let c = 0; c < width; c++) {
    if ((h0[c] ?? "").includes("参考")) {
      refStart = c;
      break;
    }
  }

  const colOf = (name: string, exact = false): number => {
    for (let c = 0; c < refStart; c++) {
      const h = h0[c] ?? "";
      if (exact ? h === name : h.includes(name)) return c;
    }
    return -1;
  };
  const codeCol = colOf("団体コード");
  const nameCol = colOf("団体名");
  const prefCol = colOf("都道府県名");
  if (codeCol < 0 || nameCol < 0) {
    throw new Error(
      `${filename}: 必須列（団体コード・団体名）を解決できません。` +
        `parserOptions.columnAliases で実列名をマッピングしてください。\nヘッダ: ${h0.join(" | ")}`,
    );
  }

  // 概況系の列（あれば拾う）。「国勢調査人口」を誤って拾わないよう住基を優先する
  const popCol = (() => {
    const i = colOf("住民基本台帳");
    return i >= 0 ? i : colOf("人口", true);
  })();
  const revCol = colOf("歳入総額");
  const expCol = colOf("歳出総額");

  // 目的別歳出の列解決:
  // - 総額列: ヘッダ先頭行が科目名そのもの（フィクスチャ）、または
  //   先頭行が款番号（漢数字のみ）で2行目が科目名（実ファイル）
  // - 総額列がない科目（労働費・諸支出金）: 先頭行が「<款番号><科目名>」の
  //   結合セルで内訳列だけが並ぶ → 小計列を除いた内訳列を合算する
  const purposeTotalCols: [string, number][] = [];
  const purposeGroupCols: [string, number[]][] = [];
  for (const p of PURPOSE_COLUMNS) {
    let total = -1;
    const group: number[] = [];
    for (let c = 0; c < refStart; c++) {
      const top = h0[c] ?? "";
      const mid = h1[c] ?? "";
      const sub = h2[c] ?? "";
      if (top === p) total = total < 0 ? c : total; // フィクスチャ形式
      else if (isKanjiNoOnly(top) && top !== "" && mid === p) total = total < 0 ? c : total; // 実ファイルの総額列
      else if (stripKanjiNo(top) === p && top !== p && !mid.includes("小計") && !sub.includes("小計")) {
        group.push(c); // 総額列のない款の内訳列
      }
      if (total >= 0) break;
    }
    if (total >= 0) purposeTotalCols.push([p, total]);
    else if (group.length > 0) purposeGroupCols.push([p, group]);
  }
  if (purposeTotalCols.length === 0 && purposeGroupCols.length === 0 && revCol < 0 && expCol < 0) {
    throw new Error(
      `${filename}: 目的別歳出・歳入歳出総額のいずれの列も見つかりません。対象外のファイルの可能性があります。\nヘッダ: ${h0.join(" | ")}`,
    );
  }

  const facts: PartialFact[] = [];
  // 実ファイルは都道府県名列がなく、「団体コード空 + 団体名だけ」の区切り行で県が変わる
  let currentPref = "";
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i] ?? [];
    const muniCode = toMuniCode(row[codeCol]);
    if (!muniCode) {
      // 実ファイルの県名は「山　梨　県」のように字間スペース入りなので除去する
      const label = normalize(row[nameCol]);
      if (prefCol < 0 && /[都道府県]$/.test(label)) currentPref = label;
      continue; // 県区切り行・小計行・空行はスキップ
    }
    const byPurpose: Record<string, number> = {};
    for (const [p, col] of purposeTotalCols) {
      const v = toNumber(row[col]);
      if (v != null) byPurpose[p] = v;
    }
    for (const [p, cols] of purposeGroupCols) {
      const vs = cols.map((c) => toNumber(row[c])).filter((v): v is number => v != null);
      if (vs.length > 0) byPurpose[p] = vs.reduce((a, b) => a + b, 0);
    }
    facts.push({
      muniCode,
      prefName: prefCol >= 0 ? String(row[prefCol] ?? "").trim() : currentPref,
      muniName: String(row[nameCol] ?? "").trim(),
      population: popCol >= 0 ? toNumber(row[popCol]) : undefined,
      revenueTotal: revCol >= 0 ? toNumber(row[revCol]) : undefined,
      expenditureTotal: expCol >= 0 ? toNumber(row[expCol]) : undefined,
      expenditureByPurpose:
        purposeTotalCols.length + purposeGroupCols.length > 0 ? byPurpose : undefined,
      locator: { file: filename, sheet: sheetName, row: i + 1 }, // 1-origin（Excel表示行）
    });
  }
  if (facts.length === 0) throw new Error(`${filename}: 自治体行が1件も抽出できませんでした`);
  return facts;
}

export function parseShichosonKessan(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ParsedDoc {
  const opts = (source.parserOptions ?? {}) as Options;

  // 団体コードでマージ。最初に現れたファイルの行を主 locator とし、
  // 合成に使った全位置を locators に残す
  const merged = new Map<string, MuniAccountFact>();
  for (const f of files) {
    for (const part of parseOneFile(f.path, f.filename, opts)) {
      const prev = merged.get(part.muniCode);
      if (!prev) {
        merged.set(part.muniCode, {
          muniCode: part.muniCode,
          prefName: part.prefName,
          muniName: part.muniName,
          population: part.population ?? null,
          revenueTotal: part.revenueTotal ?? null,
          expenditureTotal: part.expenditureTotal ?? null,
          expenditureByPurpose: part.expenditureByPurpose ?? {},
          locator: part.locator,
          locators: [part.locator],
        });
        continue;
      }
      if (prev.muniName !== part.muniName) {
        throw new Error(
          `${part.muniCode}: ファイル間で団体名が一致しません（${prev.muniName} / ${part.muniName}）`,
        );
      }
      prev.prefName ||= part.prefName;
      prev.population ??= part.population ?? null;
      prev.revenueTotal ??= part.revenueTotal ?? null;
      prev.expenditureTotal ??= part.expenditureTotal ?? null;
      for (const [k, v] of Object.entries(part.expenditureByPurpose ?? {})) {
        prev.expenditureByPurpose[k] ??= v;
      }
      prev.locators!.push(part.locator);
    }
  }

  return {
    docType: "municipal-accounts",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    facts: [...merged.values()],
  };
}
