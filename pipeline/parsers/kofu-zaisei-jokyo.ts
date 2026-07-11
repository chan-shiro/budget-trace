// 甲府市「財政事情の公表 — 一般会計の状況」PDF パーサ（予算執行状況）
//
// 地方自治法に基づき年2回公表される2ページの資料。
//   p.1: 歳入の状況 — 款別の予算現額・収入済額・収入率・市民1人当たり ＋ 合計行
//   p.2: 歳出の状況 — 款別の予算現額・支出済額・執行率・市民1人当たり ＋ 合計行
// 冒頭に「令和N年3月31日現在の人口 xxx,xxx人」があり、基準日と人口をここから取る。
// 金額の単位は万円 → 千円（×10）に変換して保持する。
//
// 行の見分け方（-layout 出力）:
//   款行:   数値トークンが3つ以上（予算現額・収入/支出済額・率…）
//   内訳行: 市税の内訳（市民税など）は収入済額の1トークンのみ → スキップ
//   合計行: 「合計」を含む行
import { execFileSync } from "node:child_process";
import type { BudgetExecutionDoc, ExecutionLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /** 歳入・歳出ページの PDF ページ番号（1-origin）。省略時は 1, 2 */
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

/** "3,087,456"（万円）→ 千円 */
function manYenToSenYen(token: string): number {
  const n = Number(token.replace(/,/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${token}`);
  return n * 10;
}

interface PageResult {
  lines: ExecutionLineFact[];
  budgetTotal: number;
  settledTotal: number;
}

function parseExecPage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
): PageResult {
  const text = pdfPageText(filePath, page);
  const expectTitle = side === "revenue" ? "歳入の状況" : "歳出の状況";
  if (!text.replace(/\s/g, "").includes(expectTitle)) {
    throw new Error(
      `${filename} p.${page}: 「${expectTitle}」の見出しがありません。ページ構成を確認してください。`,
    );
  }
  const locator = { file: filename, page };

  const lines: ExecutionLineFact[] = [];
  let budgetTotal: number | null = null;
  let settledTotal: number | null = null;
  for (const raw of text.split("\n")) {
    const compact = raw.replace(/[\s　]/g, "");
    // 数値トークン: 金額（カンマ区切り）と率（小数）
    const tokens = raw.match(/[\d,]+(?:\.\d+)?/g) ?? [];
    const amounts = tokens.filter((t) => !t.includes("."));
    const rates = tokens.filter((t) => t.includes("."));

    if (compact.startsWith("合計")) {
      if (amounts.length < 2) throw new Error(`${filename} p.${page}: 合計行を解釈できません: ${raw.trim()}`);
      budgetTotal = manYenToSenYen(amounts[0]!);
      settledTotal = manYenToSenYen(amounts[1]!);
      continue;
    }
    // 款行 = 金額2つ（予算現額・済額）以上を持つ行。内訳行（済額のみ）や見出しは弾く
    if (amounts.length < 2 || tokens.length < 3) continue;
    if (/科目|人口|状況|現額|済額|収入率|執行率|当たり/.test(compact)) continue;
    const name = raw.slice(0, raw.indexOf(tokens[0]!)).replace(/[\s　]/g, "");
    if (!name) continue;
    const currentBudget = manYenToSenYen(amounts[0]!);
    lines.push({
      side,
      name,
      currentBudget,
      settled: manYenToSenYen(amounts[1]!),
      // 率は資料記載値を使う。予算現額0（災害復旧費など）は率に意味がないため null
      ratePct: currentBudget === 0 ? null : rates.length > 0 ? Number(rates[0]) : null,
      locator,
    });
  }
  if (lines.length === 0) throw new Error(`${filename} p.${page}: 款行が1件も抽出できませんでした`);
  if (budgetTotal == null || settledTotal == null) {
    throw new Error(`${filename} p.${page}: 合計行が見つかりません`);
  }
  return { lines, budgetTotal, settledTotal };
}

export function parseKofuZaiseiJokyo(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetExecutionDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: 財政事情 PDF は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const opts = (source.parserOptions ?? {}) as Options;
  const revenuePage = opts.revenuePage ?? 1;
  const expenditurePage = opts.expenditurePage ?? 2;

  // 基準日と人口: 「令和8年3月31日現在の人口 181,461人」
  const head = pdfPageText(file.path, revenuePage);
  const m = head.replace(/[\s　]/g, "").match(/(令和\d+年\d+月\d+日)現在の人口([\d,]+)人/);
  if (!m) {
    throw new Error(`${file.filename}: 基準日・人口の行（「令和N年M月D日現在の人口」）が見つかりません`);
  }
  const asOf = `${m[1]}現在`;
  const population = Number(m[2]!.replace(/,/g, ""));

  const rev = parseExecPage(file.path, file.filename, revenuePage, "revenue");
  const exp = parseExecPage(file.path, file.filename, expenditurePage, "expenditure");

  return {
    docType: "budget-execution",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    account: "一般会計",
    asOf,
    population,
    revenueBudgetTotal: rev.budgetTotal,
    revenueSettledTotal: rev.settledTotal,
    expenditureBudgetTotal: exp.budgetTotal,
    expenditureSettledTotal: exp.settledTotal,
    facts: [...rev.lines, ...exp.lines],
  };
}
