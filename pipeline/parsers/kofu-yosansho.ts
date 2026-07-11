// 甲府市「当初予算（案）資料」PDF パーサ — 款別一覧（歳入・歳出）
//
// 対象は「一般会計歳入予算款別一覧」「一般会計歳出予算款別一覧」のページ。
// PDF にテキスト層があるため pdftotext -layout（poppler）で決定的に抽出する。
// LLM 併用が要る「主な事業一覧」ページは別パーサとして今後追加する。
//
// 行の形式（-layout 出力）:
//   "  3   民           生           費   38,933,883   37,479,942   1,453,941   42.42   3.88"
// 款名は字間スペース入り。数値トークンは [款番号, 当年度, 前年度, 増減額, 構成比, 増減率] の順で、
// 増減額が空欄の行（災害復旧費・予備費など）もある。先頭3トークンだけを使う。
import { execFileSync } from "node:child_process";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /** 歳入款別一覧・歳出款別一覧の PDF ページ番号（1-origin） */
  revenuePage?: number;
  expenditurePage?: number;
}

/** "1,234" / "△1,234" → number。構成比などの小数は対象外（呼び出し側で弾く） */
function toAmount(token: string): number {
  const neg = token.startsWith("△") || token.startsWith("-");
  const n = Number(token.replace(/[△\-,]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${token}`);
  return neg ? -n : n;
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

interface PageResult {
  lines: BudgetLineFact[];
  total: number;
  prevTotal: number | null;
}

function parseKanPage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
): PageResult {
  const text = pdfPageText(filePath, page);
  const expectTitle = side === "revenue" ? "歳入予算款別一覧" : "歳出予算款別一覧";
  if (!text.replace(/\s/g, "").includes(expectTitle)) {
    throw new Error(
      `${filename} p.${page}: 「${expectTitle}」の見出しがありません。ページ構成が変わった可能性があるので parserOptions のページ番号を確認してください。`,
    );
  }
  const totalLabel = side === "revenue" ? "歳入合計" : "歳出合計";
  const locator = { file: filename, page };

  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  for (const raw of text.split("\n")) {
    const tokens = raw.match(/△?[\d,]+(?:\.\d+)?/g) ?? [];
    const compact = raw.replace(/[\s　]/g, "");

    const [t0, t1, t2] = tokens;

    if (compact.includes(totalLabel)) {
      if (t0 == null || t1 == null || t0.includes(".")) {
        throw new Error(`${filename} p.${page}: 合計行を解釈できません: ${raw.trim()}`);
      }
      total = toAmount(t0);
      prevTotal = t1.includes(".") ? null : toAmount(t1);
      continue;
    }

    // 款行: 行頭が款番号で、数値トークンが [款番号, 当年度, 前年度, …]
    if (!/^\s*\d+\s/.test(raw) || t0 == null || t1 == null || t2 == null) continue;
    if (t1.includes(".") || t2.includes(".")) {
      throw new Error(`${filename} p.${page}: 款行の金額列を解釈できません: ${raw.trim()}`);
    }
    const kanNo = Number(t0);
    // 款名 = 款番号の直後から当年度額の手前まで（字間スペースを除去）
    const afterNo = raw.slice(raw.indexOf(t0) + t0.length);
    const name = afterNo.slice(0, afterNo.indexOf(t1)).replace(/[\s　]/g, "");
    if (!name) continue; // ページ番号などの数値だけの行
    lines.push({
      side,
      kanNo,
      kanName: name,
      amount: toAmount(t1),
      prevAmount: toAmount(t2),
      locator,
    });
  }

  if (lines.length === 0) throw new Error(`${filename} p.${page}: 款行が1件も抽出できませんでした`);
  if (total == null) throw new Error(`${filename} p.${page}: ${totalLabel} 行が見つかりません`);
  return { lines, total, prevTotal };
}

export function parseKofuYosansho(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  const revenuePage = opts.revenuePage;
  const expenditurePage = opts.expenditurePage;
  if (!revenuePage || !expenditurePage) {
    throw new Error(
      `${source.id}: parserOptions.revenuePage / expenditurePage（款別一覧の PDF ページ番号）が必要です`,
    );
  }
  // 予算資料 PDF は1ファイル想定（複数登録されていたら先頭を使う前提にせずエラー）
  if (files.length !== 1) {
    throw new Error(`${source.id}: 予算資料 PDF は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;

  const rev = parseKanPage(file.path, file.filename, revenuePage, "revenue");
  const exp = parseKanPage(file.path, file.filename, expenditurePage, "expenditure");

  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    account: "一般会計",
    revenueTotal: rev.total,
    expenditureTotal: exp.total,
    prevRevenueTotal: rev.prevTotal,
    prevExpenditureTotal: exp.prevTotal,
    facts: [...rev.lines, ...exp.lines],
  };
}
