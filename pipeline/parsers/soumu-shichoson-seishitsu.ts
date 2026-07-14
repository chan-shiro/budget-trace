// 総務省「市町村別決算状況調」(4)性質別歳出内訳 ＋ (5)地方債現在高 のパーサ。
// 既存の soumu-shichoson-kessan（概況/歳入内訳/目的別歳出）とは別ソース・別 docType にして
// 触らない（回帰リスク隔離）。decision シャードの derive で団体コードで結合する。
//
// 構造（実ファイル・R6 で確認、様式は年度で安定）:
// - 性質別ファイル: ヘッダ行（団体コードを含む行）に主要14性質の**漢数字マーカー**
//   （一=人件費 / 二=物件費 / 三=維持補修費 / 四=扶助費 / 五=補助費等 / 六=普通建設事業費 /
//     七=災害復旧事業費 / 八=失業対策事業費 / 九=公債費 / 十=積立金 / 十一=投資及び出資金 /
//     十二=貸付金 / 十三=繰出金 / 十四=前年度繰上充用金）があり、直下の行に性質名。
//   Σ主要14性質 = 歳出総額（概況）で自己検証できる（derive で突合）。
// - 地方債ファイル: 地方債現在高 / 積立金現在高（＋財政調整基金・減債基金・その他特定目的基金）/
//   債務負担行為額翌年度以降支出予定額 / 公営企業等に対する繰出金。
import * as XLSX from "../lib/xlsx";
import type { MunicipalNatureDoc, MunicipalNatureFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

const normalize = (v: unknown): string => String(v ?? "").replace(/[\s　]/g, "").trim();

function toNumber(v: unknown): number | null {
  if (v == null || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).replace(/[,\s　]/g, "");
  if (s === "" || s === "-" || s === "−" || s === "…") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function toMuniCode(v: unknown): string | null {
  const s = normalize(v).replace(/\D/g, "");
  if (s.length < 5 || s.length > 6) return null;
  return s.padStart(6, "0");
}

const isKanjiNo = (s: string): boolean => /^[一二三四五六七八九十]+$/.test(s.trim());

/** ヘッダ先頭行（団体コードを含む行）の index と、団体コード・団体名の列 */
function locateHeader(rows: unknown[][]): { headerIdx: number; codeCol: number; nameCol: number } {
  const headerIdx = rows.findIndex((r) => (r ?? []).some((c) => normalize(c).includes("団体コード")));
  if (headerIdx < 0) throw new Error("ヘッダ行（「団体コード」を含む行）が見つかりません");
  const h = rows[headerIdx] ?? [];
  const codeCol = h.findIndex((c) => normalize(c).includes("団体コード"));
  const nameCol = h.findIndex((c) => normalize(c) === "団体名");
  if (codeCol < 0 || nameCol < 0) throw new Error("団体コード・団体名の列が見つかりません");
  return { headerIdx, codeCol, nameCol };
}

/** 「団体コード空＋団体名だけ」の県区切り行を追跡しつつデータ行を走査する */
function forEachMuni(
  rows: unknown[][],
  headerIdx: number,
  codeCol: number,
  nameCol: number,
  fn: (muniCode: string, muniName: string, prefName: string, row: unknown[]) => void,
) {
  let currentPref = "";
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i] ?? [];
    const muniCode = toMuniCode(row[codeCol]);
    if (!muniCode) {
      const label = normalize(row[nameCol]);
      if (/[都道府県]$/.test(label)) currentPref = label;
      continue;
    }
    fn(muniCode, normalize(row[nameCol]), currentPref, row);
  }
}

/** 性質別ファイル（都市別 or 町村別）: 漢数字マーカー列から主要14性質を拾う */
function parseSeishitsu(filePath: string, filename: string): Map<string, { byNature: Record<string, number>; natureTotal: number; row: number }> {
  const wb = XLSX.readFile(filePath);
  const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]!]!, { header: 1, raw: true });
  const { headerIdx, codeCol, nameCol } = locateHeader(rows);
  const nameRow = rows[headerIdx + 1] ?? [];
  // 漢数字マーカーのある列 = 主要性質の総額列。直下行から性質名を取る
  const natureCols: [string, number][] = [];
  for (let c = 0; c < (rows[headerIdx] ?? []).length; c++) {
    if (isKanjiNo(String(rows[headerIdx]![c] ?? ""))) {
      const name = normalize(nameRow[c]);
      if (name) natureCols.push([name, c]);
    }
  }
  if (natureCols.length < 10) {
    throw new Error(`${filename}: 性質別の漢数字マーカー列が ${natureCols.length} 件しか見つかりません（様式変更の可能性）`);
  }
  const out = new Map<string, { byNature: Record<string, number>; natureTotal: number; row: number }>();
  forEachMuni(rows, headerIdx, codeCol, nameCol, (muniCode, _name, _pref, row) => {
    const byNature: Record<string, number> = {};
    let total = 0;
    for (const [nm, col] of natureCols) {
      const v = toNumber(row[col]) ?? 0;
      byNature[nm] = v;
      total += v;
    }
    out.set(muniCode, { byNature, natureTotal: total, row: 0 });
  });
  return out;
}

/** 地方債ファイル: 現在高・積立金（内訳）・債務負担行為・公営企業繰出金 */
function parseChihosai(filePath: string, filename: string): Map<string, MunicipalNatureFact["localBond"]> {
  const wb = XLSX.readFile(filePath);
  const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]!]!, { header: 1, raw: true });
  const { headerIdx, codeCol, nameCol } = locateHeader(rows);
  const h = rows[headerIdx] ?? [];
  const h1 = rows[headerIdx + 1] ?? [];
  const colBy = (labels: string[], header: unknown[]): number =>
    header.findIndex((c) => labels.some((l) => normalize(c) === l));
  const balanceCol = colBy(["地方債現在高"], h);
  const reserveCol = colBy(["積立金現在高"], h);
  const debtBurdenCol = colBy(["債務負担行為額翌年度以降支出予定額", "債務負担行為額翌年度以降支出予定額等"], h);
  const pubEntCol = colBy(["公営企業等に対する繰出金"], h);
  const chouseiCol = colBy(["財政調整基金"], h1);
  const gensaiCol = colBy(["減債基金"], h1);
  const otherFundCol = colBy(["その他特定目的基金"], h1);
  if (balanceCol < 0) throw new Error(`${filename}: 「地方債現在高」列が見つかりません`);
  const out = new Map<string, MunicipalNatureFact["localBond"]>();
  const g = (row: unknown[], c: number): number | null => (c >= 0 ? toNumber(row[c]) : null);
  forEachMuni(rows, headerIdx, codeCol, nameCol, (muniCode, _n, _p, row) => {
    out.set(muniCode, {
      balance: g(row, balanceCol) ?? 0,
      reserveTotal: g(row, reserveCol),
      reserveByType: {
        財政調整基金: g(row, chouseiCol),
        減債基金: g(row, gensaiCol),
        その他特定目的基金: g(row, otherFundCol),
      },
      debtBurdenFuture: g(row, debtBurdenCol),
      publicEnterpriseTransfer: g(row, pubEntCol),
    });
  });
  return out;
}

export function parseShichosonSeishitsu(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): MunicipalNatureDoc {
  // ファイルを種別で振り分ける（タイトルセルで判定: 「性質別」/「地方債」）
  const classify = (f: { path: string; filename: string }): "nature" | "bond" => {
    const wb = XLSX.readFile(f.path);
    const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]!]!, { header: 1, raw: true });
    // タイトルセルは先頭数行のどこか（raw 展開だと空行が入るので広めに走査）
    const head = rows.slice(0, 20).flat().map(normalize).join("");
    if (head.includes("性質別")) return "nature";
    if (head.includes("地方債")) return "bond";
    throw new Error(`${f.filename}: 性質別・地方債のどちらのファイルか判定できません`);
  };

  const natureMap = new Map<string, { byNature: Record<string, number>; natureTotal: number; row: number }>();
  const bondMap = new Map<string, MunicipalNatureFact["localBond"]>();
  let natureLoc = { file: "", sheet: "" };
  for (const f of files) {
    if (classify(f) === "nature") {
      for (const [k, v] of parseSeishitsu(f.path, f.filename)) natureMap.set(k, v);
      if (!natureLoc.file) natureLoc = { file: f.filename, sheet: "" };
    } else {
      for (const [k, v] of parseChihosai(f.path, f.filename)) bondMap.set(k, v);
    }
  }

  const facts: MunicipalNatureFact[] = [];
  for (const [muniCode, nature] of natureMap) {
    facts.push({
      muniCode,
      byNature: nature.byNature,
      natureTotal: nature.natureTotal,
      localBond: bondMap.get(muniCode) ?? null,
      locator: { file: natureLoc.file, row: 0 },
    });
  }
  if (facts.length === 0) throw new Error(`${source.id}: 性質別の自治体が1件も抽出できませんでした`);

  return {
    docType: "municipal-nature",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    facts,
  };
}
