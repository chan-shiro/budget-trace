// 甲府市統計書「一般会計歳入歳出状況」パーサ — 款＋項 × 当初/最終/決算（円）。
// 1ソース = 2ファイル（15-01 歳入 / 15-02 歳出）。シートには **3年度分のブロックが縦に連続**
// する（例: 令和7年版 = R5・R6 の3値ブロック ＋ R7 の当初のみブロック）。
// 「款　項　／　年　度」ヘッダ行でブロックに分割し、registry の fiscalYear と一致する
// ブロックだけを読む（決算前の当初のみブロックを選んだらエラー）。
//   款行: col0=款名（字間スペース入り）, col2-4 = 3値
//   項行: col0=null, col1=項名, col2-4 = 3値
//   総額行: col0="総　額"。col5 以降の注記列は無視する
import * as XLSX from "../lib/xlsx";
import type { BudgetOutturnDoc, OutturnLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /**
   * 原典側の誤配置行のスキップ（ファイル名 → 1-origin 行番号）。
   * 実例: 令和4年版 15-01.xls の行65 — R2 ブロック末尾に R1 年度の市債行が
   * 紛れ込んでいる（R2版から取った R1 の値と完全一致することで原典事故と確認済み）
   */
  skipRows?: Record<string, number[]>;
}

const compact = (v: unknown): string => (v == null ? "" : String(v)).replace(/[\s　]/g, "");

/** 「令和5年度」「平成30年度」→ "R5" / "H30" */
function toFy(label: string): string {
  const m = label.match(/(令和|平成)(\d+|元)年度/);
  if (!m) throw new Error(`年度表記を解釈できません: ${label}`);
  const n = m[2] === "元" ? 1 : Number(m[2]);
  return `${m[1] === "令和" ? "R" : "H"}${n}`;
}

function parseSide(
  path: string,
  filename: string,
  side: "revenue" | "expenditure",
  expectedFy: string,
  skipRows: number[],
): { facts: OutturnLineFact[]; total: { initial: number; final: number; settled: number } } {
  const wb = XLSX.readFile(path);
  const sheetName = wb.SheetNames[0]!;
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]!, { header: 1 }) as unknown[][];

  // 年度ブロックの境界（「款…年度」ヘッダ行）を探し、対象年度の範囲を決める
  const headers: { row: number; fy: string }[] = [];
  rows.forEach((r, i) => {
    const cells = (r ?? []).map(compact);
    if (!cells.some((c) => c.includes("款") && c.includes("年度"))) return;
    const label = cells.find((c) => /(令和|平成)(\d+|元)年度/.test(c));
    if (label) headers.push({ row: i, fy: toFy(label) });
  });
  if (headers.length === 0) throw new Error(`${filename}: 年度ヘッダが見つかりません`);
  const idx = headers.findIndex((h) => h.fy === expectedFy);
  if (idx === -1) {
    throw new Error(
      `${filename}: ${expectedFy} 年度のブロックがありません（存在: ${headers.map((h) => h.fy).join(", ")}）。統計書の版とデータ年度の対応を registry で見直してください`,
    );
  }
  const from = headers[idx]!.row;
  const to = idx + 1 < headers.length ? headers[idx + 1]!.row : rows.length;

  const num = (v: unknown): number | null => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && /^[\d,]+$/.test(v.trim())) return Number(v.replace(/,/g, ""));
    return null;
  };

  const facts: OutturnLineFact[] = [];
  let total: { initial: number; final: number; settled: number } | null = null;
  let currentKan = "";
  for (let i = from; i < to; i++) {
    if (skipRows.includes(i + 1)) continue; // 原典側の誤配置行（parserOptions.skipRows）
    const r = rows[i];
    const kanCell = compact(r?.[0]);
    const kouCell = compact(r?.[1]);
    const initial = num(r?.[2]);
    const final = num(r?.[3]);
    const settled = num(r?.[4]);
    if (initial == null) continue; // ヘッダ・注記
    if (final == null || settled == null) {
      // 当初のみのブロック（決算前の年度）を選んでしまった場合はここに来る
      throw new Error(`${filename} 行${i + 1}: ${expectedFy} のブロックに最終予算額/決算額がありません（決算前の年度の可能性）`);
    }
    const locator = { file: filename, sheet: sheetName, row: i + 1 };
    if (kanCell.startsWith("総額")) {
      total = { initial, final, settled };
      continue;
    }
    if (kanCell) {
      currentKan = kanCell;
      facts.push({ side, kanName: kanCell, kouName: null, initialBudget: initial, finalBudget: final, settled, locator });
      continue;
    }
    if (kouCell) {
      if (!currentKan) throw new Error(`${filename} 行${i + 1}: 款の前に項「${kouCell}」が現れました`);
      facts.push({ side, kanName: currentKan, kouName: kouCell, initialBudget: initial, finalBudget: final, settled, locator });
    }
  }

  if (!total) throw new Error(`${filename}: ${expectedFy} ブロックに総額行が見つかりません`);
  if (facts.length === 0) throw new Error(`${filename}: 款項が1件も抽出できませんでした`);
  return { facts, total };
}

export function parseKofuToukeiZaisei(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetOutturnDoc {
  // 15-01 = 歳入 / 15-02 = 歳出（ファイル名の "15-01/02" 部分で判別）
  const revFile = files.find((f) => f.filename.includes("15-01"));
  const expFile = files.find((f) => f.filename.includes("15-02"));
  if (!revFile || !expFile) {
    throw new Error(`${source.id}: 15-01（歳入）と 15-02（歳出）の2ファイルが必要です（現在: ${files.map((f) => f.filename).join(", ")}）`);
  }
  const opts = (source.parserOptions ?? {}) as unknown as Options;
  const rev = parseSide(revFile.path, revFile.filename, "revenue", source.fiscalYear, opts.skipRows?.[revFile.filename] ?? []);
  const exp = parseSide(expFile.path, expFile.filename, "expenditure", source.fiscalYear, opts.skipRows?.[expFile.filename] ?? []);

  return {
    docType: "budget-outturn",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "yen",
    fiscalYear: source.fiscalYear,
    account: "一般会計",
    revenueTotal: rev.total,
    expenditureTotal: exp.total,
    facts: [...rev.facts, ...exp.facts],
  };
}
