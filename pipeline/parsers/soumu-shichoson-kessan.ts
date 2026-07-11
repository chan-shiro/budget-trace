// 総務省「市町村別決算状況調」Excel パーサ
//
// 想定形式: 1行 = 1自治体。ヘッダ行に「団体コード」を含む。
// 実ファイルはヘッダが複数行に割れている年度があるため、列名は正規化
// （空白・改行除去）した上で部分一致で解決する。実ファイルで列名が合わない
// 場合は registry の parserOptions.columnAliases で吸収する。
import * as XLSX from "xlsx";
import type { MuniAccountFact, ParsedDoc, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

// 目的別歳出の標準科目（この名前の列を拾う）
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

interface Options {
  sheet?: string;
  /** 実ファイルの列名ゆれを吸収する: { 正規化後の実列名: 標準列名 } */
  columnAliases?: Record<string, string>;
}

export function parseShichosonKessan(
  filePath: string,
  filename: string,
  source: SourceEntry,
): ParsedDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  const wb = XLSX.readFile(filePath);
  const sheetName = opts.sheet ?? wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  if (!sheet) throw new Error(`シートが見つかりません: ${sheetName}`);

  // 行列に展開（セル値そのまま）
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  // ヘッダ行 = 「団体コード」を含む行
  const headerIdx = rows.findIndex((r) => r.some((c) => normalize(c).includes("団体コード")));
  if (headerIdx < 0) throw new Error(`${filename}: ヘッダ行（「団体コード」を含む行）が見つかりません`);
  const header = rows[headerIdx].map((c) => {
    const n = normalize(c);
    return opts.columnAliases?.[n] ?? n;
  });

  const colOf = (name: string): number => header.findIndex((h) => h === name || h.includes(name));
  const codeCol = colOf("団体コード");
  const nameCol = colOf("団体名");
  const prefCol = colOf("都道府県名");
  const popCol = (() => {
    const i = colOf("住民基本台帳人口");
    return i >= 0 ? i : colOf("人口");
  })();
  const revCol = colOf("歳入総額");
  const expCol = colOf("歳出総額");
  if (codeCol < 0 || nameCol < 0) {
    throw new Error(
      `${filename}: 必須列（団体コード・団体名）を解決できません。` +
        `parserOptions.columnAliases で実列名をマッピングしてください。\nヘッダ: ${header.join(" | ")}`,
    );
  }
  const purposeCols = PURPOSE_COLUMNS.map((p) => [p, colOf(p)] as const).filter(([, i]) => i >= 0);

  const facts: MuniAccountFact[] = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    const muniCode = toMuniCode(row[codeCol]);
    if (!muniCode) continue; // 小計行・空行などはスキップ
    const byPurpose: Record<string, number> = {};
    for (const [p, col] of purposeCols) {
      const v = toNumber(row[col]);
      if (v != null) byPurpose[p] = v;
    }
    facts.push({
      muniCode,
      prefName: prefCol >= 0 ? String(row[prefCol] ?? "").trim() : "",
      muniName: String(row[nameCol] ?? "").trim(),
      population: popCol >= 0 ? toNumber(row[popCol]) : null,
      revenueTotal: revCol >= 0 ? toNumber(row[revCol]) : null,
      expenditureTotal: expCol >= 0 ? toNumber(row[expCol]) : null,
      expenditureByPurpose: byPurpose,
      locator: { file: filename, sheet: sheetName, row: i + 1 }, // 1-origin（Excel表示行）
    });
  }
  if (facts.length === 0) throw new Error(`${filename}: 自治体行が1件も抽出できませんでした`);

  return {
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    facts,
  };
}
