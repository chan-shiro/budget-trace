// 大阪市 予算書（事項別明細書）パーサ — 款別歳入歳出＋前年当初比較
//
// **未収録で最大の自治体**（278万人）。docs §8。
// 既存の `kofu-yosansho` は「1ページ = 1側の款別一覧」前提だが、大阪は**款項目が同一表に混在し
// 182ページに渡る**事項別明細書なので乗らない。
//
// 構造（実測で裏付け済み）:
// - **款は `-layout` 出力の列0始まりの行**。項・目は字下げされるので列0では出ない。
//   歳出は182p中16行=16款ちょうど（偽陽性0）で、Σ款=合計が本年度・前年度とも厳密一致した。
// - **歳入の款5・6・13 だけ款名が2行に折返し、款番号が単独行に落ちる**:
//     `    株式等譲渡所得割`
//     `5`
//     `    交   付  金           7,371,000    5,761,000       1,610,000`
//   **列0判定だけだと20款しか取れず Σ が 8,430,001 千円不足する**（実測）。
// - 歳入末尾に**廃止款の括弧書き**（`（自動車取得税交付金）`・本年度0）。
// - 款名は字間空白の両端揃え（`1市                   税`）。
// - 目行のみ右列に節（`1 現 年 課 税 分  271,517,931`）が乗るが、款行は必ず3金額。
import { execFileSync } from "node:child_process";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  revenuePages?: { from: number; to: number };
  expenditurePages?: { from: number; to: number };
  revenueTotalLabel?: string;
  expenditureTotalLabel?: string;
}

const compact = (s: string) => s.replace(/[\s　]/g, "");
const AMOUNT = /[△▲]?[\d,]+/g;
const toAmount = (t: string): number => {
  const neg = /^[△▲]/.test(t);
  const n = Number(t.replace(/[△▲,]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${t}`);
  return neg ? -n : n;
};

const pageText = (filePath: string, from: number, to: number): string =>
  execFileSync("pdftotext", ["-layout", "-f", String(from), "-l", String(to), filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });

interface SideResult {
  lines: BudgetLineFact[];
  total: number;
  prevTotal: number;
}

function parseSide(
  filePath: string,
  filename: string,
  pages: { from: number; to: number },
  side: "revenue" | "expenditure",
  totalLabel: string,
): SideResult {
  const text = pageText(filePath, pages.from, pages.to);
  const raw = text.split("\n");
  const lines: BudgetLineFact[] = [];
  const locator = { file: filename, page: pages.from };
  let total: number | null = null;
  let prevTotal: number | null = null;

  // 合計行（`歳 入 合 計  2,188,221,198 …`）。字間空白があるので compact で判定する
  for (const l of raw) {
    if (!compact(l).includes(totalLabel)) continue;
    const ints = (l.match(AMOUNT) ?? []).filter((t) => t.replace(/[△▲,]/g, "").length > 3);
    if (ints.length >= 2) {
      total = toAmount(ints[0]!);
      prevTotal = toAmount(ints[1]!);
    }
  }
  if (total == null || prevTotal == null) {
    throw new Error(`${filename} p.${pages.from}-${pages.to}: ${totalLabel} 行が見つかりません`);
  }

  // 行から「本年度・前年度」の2金額（5桁以上＝節の枝番と区別）を取り出す
  // minLen は「節の枝番（`1 現年課税分 …`）を金額と取り違えない」ための桁数下限。
  // 款行と分かっている文脈でだけ 1 に緩める（款22 繰越金は「1」千円の象徴計上）。
  const amountsOf = (l: string, minLen = 4): string[] => {
    AMOUNT.lastIndex = 0;
    return (l.match(AMOUNT) ?? []).filter((t) => t.replace(/[△▲,]/g, "").length >= minLen);
  };
  // 款名になり得る断片か（金額を持たない日本語行。単位行 `千円` や区分ヘッダは除く）
  const isNameFrag = (l: string): boolean => {
    const c = compact(l);
    return (
      /^[ぁ-んァ-ヶ一-龠等・]+$/.test(c) &&
      !/^千円+$/.test(c) &&
      !c.startsWith("区分") &&
      amountsOf(l).length === 0
    );
  };
  const push = (kanNo: number | null, kanName: string, ints: string[]) => {
    const name = kanName.replace(/[△▲\d,\s　]/g, "");
    if (!name) return;
    lines.push({
      side,
      kanNo,
      kanName: name,
      amount: toAmount(ints[0]!),
      prevAmount: toAmount(ints[1]!),
      locator,
    });
  };

  for (let i = 0; i < raw.length; i++) {
    const l = raw[i]!;
    if (!l || l[0] === " ") continue; // 字下げ行＝項・目・節（折返しの断片は下の bare 分岐から参照する）
    const c = compact(l);
    if (c.includes(totalLabel)) break; // 合計行以降は款ではない

    // **款番号だけが単独行に落ちる折返し**（歳入の款5・6・13）:
    //   `    株式等譲渡所得割` / `5` / `    交  付  金   7,371,000 …`
    // 上段＝直前の断片行、下段＝直後の最初の金額行。列0判定だけではこの3款を取りこぼす。
    // **廃止款の括弧書き**（歳入末尾）。款番号を持たず、3行に割れる:
    //   `（` / `自 動 車 取 得 税` / `交    付    金   ）    0    1△    1`
    // 本年度0・**前年度1千円が歳入合計に含まれる**ので、落とすと Σ前年 が 1 だけ合わない。
    // 差引の符号が `1△   1` と数値の後ろに来る（他の行と逆）が、先頭2金額しか見ないので影響しない。
    if (c.startsWith("（")) {
      let name = c;
      for (let j = i + 1; j < raw.length; j++) {
        const ints = amountsOf(raw[j]!, 1);
        if (ints.length < 2) {
          name += compact(raw[j]!);
          continue;
        }
        name += compact(raw[j]!.slice(0, raw[j]!.indexOf(ints[0]!)));
        push(null, name, ints);
        i = j;
        break;
      }
      continue;
    }

    const bare = /^(\d+)$/.exec(c);
    if (bare) {
      const upper = i > 0 && isNameFrag(raw[i - 1]!) ? compact(raw[i - 1]!) : "";
      for (let j = i + 1; j < raw.length; j++) {
        const ints = amountsOf(raw[j]!);
        if (ints.length < 2) continue;
        const lower = compact(raw[j]!.slice(0, raw[j]!.indexOf(ints[0]!)));
        push(Number(bare[1]), upper + lower, ints);
        i = j;
        break;
      }
      continue;
    }

    // 列0の款行 = `款番号` + `款名（数字を含まない・字間空白あり）` + 本年度 + 前年度 + 差引。
    // 金額を桁数で絞らない: **款22 繰越金は本年度・前年度とも「1」千円の象徴計上**で、
    // 桁数フィルタを噛ませると静かに落ちる（Σ が 1 だけ合わない形で露見した）。
    const m = /^(\d+)([^\d△▲]+?)\s+([△▲]?[\d,]+)\s+([△▲]?[\d,]+)(?:\s|$)/.exec(l);
    if (!m) continue;
    push(Number(m[1]), m[2]!, [m[3]!, m[4]!]);
  }
  if (lines.length === 0) throw new Error(`${filename}: ${side} の款が1件も抽出できませんでした`);
  return { lines, total, prevTotal };
}

export function parseOsakaYosansho(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  if (!opts.revenuePages || !opts.expenditurePages) {
    throw new Error(`${source.id}: parserOptions.revenuePages / expenditurePages が必要です`);
  }
  const f = files[0]!;
  const rev = parseSide(f.path, f.filename, opts.revenuePages, "revenue", opts.revenueTotalLabel ?? "歳入合計");
  const exp = parseSide(f.path, f.filename, opts.expenditurePages, "expenditure", opts.expenditureTotalLabel ?? "歳出合計");
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
    prevBasis: "当初",
    facts: [...rev.lines, ...exp.lines],
  };
}
