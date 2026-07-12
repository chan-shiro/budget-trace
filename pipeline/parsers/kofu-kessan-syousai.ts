// 甲府市「決算状況 収入支出詳細」HTML パーサ — 款別の予算現額・収入/支出済額・
// 収入率/執行率（出納整理後の**確定値**）。市税などの内訳行（予算現額のみ）も拾う。
//
// ページ構造（R1〜R6 で同一を確認）:
//   <table> が2つ。ヘッダは「科目 | 予算現額（万円） | 収入済額（万円） | 収入率（％） |
//   市民1人当たりの金額（円）」（歳出側は 支出済額/執行率）。
//   款行はセルが全て埋まり、内訳行（市民税・固定資産税など）は予算現額のみ。
//   末尾に「合計」行。単位は万円 → 千円（×10）に変換して保持する。
//   市民1人当たり列は 済額÷人口 の導出値なので保持しない（再計算可能）。
import { readFileSync } from "node:fs";
import type { BudgetExecutionDoc, ExecutionLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

/** "2,946,777" → 万円数値。空・"-" は null */
function toManYen(s: string): number | null {
  const t = s.replace(/[\s,，]/g, "");
  if (t === "" || t === "-" || t === "−" || t === "―") return null;
  const n = Number(t);
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${s}`);
  return n;
}

/** HTML → テーブルの行列（セルはタグ除去・空白正規化済みテキスト） */
function parseTables(html: string): string[][][] {
  const noScript = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  const tables = noScript.match(/<table[\s\S]*?<\/table>/g) ?? [];
  return tables.map((t) =>
    (t.match(/<tr[\s\S]*?<\/tr>/g) ?? []).map((r) =>
      (r.match(/<t[hd][\s\S]*?<\/t[hd]>/g) ?? []).map((c) =>
        c
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/[\s　]+/g, "")
          .trim(),
      ),
    ),
  );
}

export function parseKofuKessanSyousai(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetExecutionDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: HTML は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const html = readFileSync(file!.path, "utf8");
  const tables = parseTables(html);

  // 対象テーブルをヘッダで特定する（収入済額 / 支出済額）
  const findTable = (settledLabel: string) => {
    for (const rows of tables) {
      const head = rows[0]?.join("|") ?? "";
      if (head.includes("予算現額") && head.includes(settledLabel)) return rows;
    }
    throw new Error(
      `${file!.filename}: 「${settledLabel}」のテーブルが見つかりません。ページ構成が変わった可能性があります`,
    );
  };

  const facts: ExecutionLineFact[] = [];
  let totals: Record<string, { budget: number; settled: number }> = {};

  for (const side of ["revenue", "expenditure"] as const) {
    const settledLabel = side === "revenue" ? "収入済額" : "支出済額";
    const rows = findTable(settledLabel);
    let current: ExecutionLineFact | null = null;
    let total: { budget: number; settled: number } | null = null;

    rows.slice(1).forEach((cells, i) => {
      if (cells.length < 2 || !cells[0]) return;
      const name = cells[0]!;
      const budget = toManYen(cells[1] ?? "");
      const settled = cells.length > 2 ? toManYen(cells[2] ?? "") : null;
      const rate = cells.length > 3 && cells[3] !== "" ? Number(cells[3]!.replace(/[%％]/g, "")) : null;
      const locator = { file: file!.filename, row: i + 2 }; // ヘッダ行 = 1

      if (budget == null) return; // 注記行など
      if (name === "合計") {
        if (settled == null) throw new Error(`${file!.filename}: 合計行に済額がありません`);
        total = { budget: budget * 10, settled: settled * 10 };
        current = null;
        return;
      }
      if (settled == null) {
        // 内訳行（予算現額のみ）。直前の款にぶら下げる
        if (!current) throw new Error(`${file!.filename} ${side} 行${i + 2}: 款の前に内訳行「${name}」が現れました`);
        current.breakdown = [...(current.breakdown ?? []), { name, currentBudget: budget * 10 }];
        return;
      }
      current = {
        side,
        name,
        currentBudget: budget * 10,
        settled: settled * 10,
        ratePct: rate != null && Number.isFinite(rate) ? rate : null,
        locator,
      };
      facts.push(current);
    });

    if (!total) throw new Error(`${file!.filename}: ${settledLabel} テーブルに合計行がありません`);
    totals[side] = total;
  }

  return {
    docType: "budget-execution",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    account: "一般会計",
    asOf: "決算（確定値）",
    basis: "確定",
    population: null, // ページに人口の記載なし（1人当たり列は導出値のため保持しない）
    revenueBudgetTotal: totals["revenue"]!.budget,
    revenueSettledTotal: totals["revenue"]!.settled,
    expenditureBudgetTotal: totals["expenditure"]!.budget,
    expenditureSettledTotal: totals["expenditure"]!.settled,
    facts,
  };
}
