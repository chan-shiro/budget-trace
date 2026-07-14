// 山梨県「決算の状況」PDF パーサ（一般会計・款別の決算＋執行率／収入率）
//
// 出納局が公表する冊子。目次（p.2）のうち本パーサが使うのは:
//   ②一般会計 歳入決算の状況（p.4）: 科目別に 予算現額(A)・調定額(B)・収入済額(C)・
//      不納欠損額・収入未済額・収入率(C/A,C/B)・前年度収入済額… ＋ 合計行
//   ③一般会計 歳出決算の状況（p.5）: 科目別に 予算現額(A)・支出済額(B)・翌年度繰越額・
//      不用額・執行率(B/A)・前年度支出済額… ＋ 合計行
// 単位は円（整数）。thousandYen に割ると端数が出て厳密一致の検証に落ちるため、
// unit="yen" のまま整数で保持する（derive 側が yenToOku で億に換算）。
//
// 列の取り方（-layout 出力・数値トークン列で決定的に）:
//   歳入: currentBudget = 金額[0](A) / settled = 金額[2](C・収入済額) / rate = 小数[0](C/A収入率)
//   歳出: currentBudget = 金額[0](A) / settled = 金額[1](B・支出済額) / rate = 小数[0](B/A執行率)
// 負号 △ は増減額・増減率の列（本パーサは不使用）にしか出ないので、
// 金額トークンは絶対値のまま拾ってよい（A・C・B はいずれも非負）。
import { execFileSync } from "node:child_process";
import type { BudgetExecutionDoc, ExecutionLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /** 歳入・歳出ページの PDF ページ番号（1-origin）。省略時は 4, 5 */
  revenuePage?: number;
  expenditurePage?: number;
}

function pdfPageText(filePath: string, page: number): string {
  try {
    return execFileSync(
      "pdftotext",
      ["-f", String(page), "-l", String(page), "-layout", filePath, "-"],
      { encoding: "utf8" },
    );
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("pdftotext が見つかりません。poppler を入れてください（brew install poppler）");
    }
    throw e;
  }
}

/** "107,321,812,008"（円）→ 数値（整数円） */
function yen(token: string): number {
  const n = Number(token.replace(/,/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${token}`);
  return n;
}

interface PageResult {
  lines: ExecutionLineFact[];
  budgetTotal: number;
  settledTotal: number;
}

function parsePage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
): PageResult {
  const text = pdfPageText(filePath, page);
  const expectTitle = side === "revenue" ? "歳入決算の状況" : "歳出決算の状況";
  if (!text.replace(/\s/g, "").includes(expectTitle)) {
    throw new Error(`${filename} p.${page}: 「${expectTitle}」の見出しがありません。ページ構成を確認してください。`);
  }
  // 済額の列位置は歳入・歳出で異なる（歳入=収入済額が3番目、歳出=支出済額が2番目）
  const settledIdx = side === "revenue" ? 2 : 1;
  const locator = { file: filename, page };

  const lines: ExecutionLineFact[] = [];
  let budgetTotal: number | null = null;
  let settledTotal: number | null = null;
  for (const raw of text.split("\n")) {
    const compact = raw.replace(/[\s　]/g, "");
    if (!compact) continue;
    // 金額（カンマ区切り整数）と率（小数）を分けて拾う
    const tokens = raw.match(/[\d,]+(?:\.\d+)?/g) ?? [];
    const amounts = tokens.filter((t) => !t.includes("."));
    const rates = tokens.filter((t) => t.includes("."));

    if (compact.startsWith("合計")) {
      if (amounts.length < settledIdx + 1) {
        throw new Error(`${filename} p.${page}: 合計行を解釈できません: ${raw.trim()}`);
      }
      budgetTotal = yen(amounts[0]!);
      settledTotal = yen(amounts[settledIdx]!);
      continue;
    }
    // 科目行 = 金額が (settledIdx+1) 個以上ある行。見出し・単位注記・年度列見出しは弾く
    if (amounts.length < settledIdx + 1) continue;
    if (/科目|予算現額|調定額|済額|欠損|未済|執行率|収入率|割合|区分|単位|令和/.test(compact)) continue;
    const name = raw.slice(0, raw.indexOf(tokens[0]!)).replace(/[\s　]/g, "");
    if (!name) continue;
    const currentBudget = yen(amounts[0]!);
    lines.push({
      side,
      name,
      currentBudget,
      settled: yen(amounts[settledIdx]!),
      // 記載の収入率/執行率（小数1桁）。予算現額0（予備費など）は率に意味がないので null
      ratePct: currentBudget === 0 ? null : rates.length > 0 ? Number(rates[0]) : null,
      locator,
    });
  }
  if (lines.length === 0) throw new Error(`${filename} p.${page}: 科目行が1件も抽出できませんでした`);
  if (budgetTotal == null || settledTotal == null) {
    throw new Error(`${filename} p.${page}: 合計行が見つかりません`);
  }
  return { lines, budgetTotal, settledTotal };
}

export function parseYamanashiKessan(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetExecutionDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: 決算の状況 PDF は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const opts = (source.parserOptions ?? {}) as Options;
  const revenuePage = opts.revenuePage ?? 4;
  const expenditurePage = opts.expenditurePage ?? 5;

  const rev = parsePage(file.path, file.filename, revenuePage, "revenue");
  const exp = parsePage(file.path, file.filename, expenditurePage, "expenditure");

  return {
    docType: "budget-execution",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "yen",
    fiscalYear: source.fiscalYear,
    account: "一般会計",
    asOf: `令和${source.fiscalYear.slice(1)}年度決算（確定値）`,
    basis: "確定",
    // この資料に人口の記載はない（1人あたりは当初予算側の県内人口合計を使う）
    population: null,
    revenueBudgetTotal: rev.budgetTotal,
    revenueSettledTotal: rev.settledTotal,
    expenditureBudgetTotal: exp.budgetTotal,
    expenditureSettledTotal: exp.settledTotal,
    facts: [...rev.lines, ...exp.lines],
  };
}
