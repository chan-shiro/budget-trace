// 新宿区「款別予算決算対照表」パーサ（一般会計・款別の決算＋執行率/収入率・#138）
//
// 決算書ページに単独 PDF（R6 は 2p・8KB・born-digital）で載る款別専用の対照表。
// full 階層の「執行」画面（予算現額・収入/支出済額・率）の2例目（甲府・山梨県に次ぐ区で初）。
//
// 版面（-layout・実測）:
//   歳入（p.1）: `款No 款名 予算現額 収入済額 比較増減(△) 収入率% 構成比%`＝数値6トークン
//   歳出（p.2）: `款No 款名 予算現額 支出済額 翌年度繰越額 不用額 執行率% 繰越率% 構成比%`＝9トークン
//   各款行の間に単位行（`円 円 円 ％ ％`）が挟まる。合計行は**款番号欄が 99**（`99 歳 入 合 計 …`）。
//
// ⚠ yamanashi-kessan に乗せなかった理由（静かな誤読が2つ起きる・実測）:
//   1. **款番号列がある** — 先頭の整数トークンを予算現額と誤読する（currentBudget=1 等）
//   2. **率が整数で印字される款がある**（地方特例交付金の `100`・繰越 `0`）— 「小数を含む
//      トークン＝率」の仕分けだと整数の率が金額側に紛れ、構成比を率と誤読する
//   → トークンの**固定位置**で取る（この表は 0 も省略せず全列印字する様式・実測）。
// 単位は**円**（整数）。yamanashi-kessan と同じく unit="yen" のまま保持する。
import { execFileSync } from "node:child_process";
import type { BudgetExecutionDoc, ExecutionLineFact, SourceEntry } from "../types";
import { eraYear } from "../lib/fy";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /** 歳入・歳出ページ（1-origin）。省略時は 1, 2 */
  revenuePage?: number;
  expenditurePage?: number;
}

function pdfPageText(filePath: string, page: number): string {
  try {
    return execFileSync("pdftotext", ["-f", String(page), "-l", String(page), "-layout", filePath, "-"], {
      encoding: "utf8",
    });
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("pdftotext が見つかりません。poppler を入れてください（brew install poppler）");
    }
    throw e;
  }
}

interface TsvWord { x: number; y: number; text: string }
/** pdftotext -tsv の単語（充用のある款の行割れ再構成に使う） */
function pdfPageWords(filePath: string, page: number): TsvWord[] {
  const out = execFileSync("pdftotext", ["-tsv", "-f", String(page), "-l", String(page), filePath, "-"], {
    encoding: "utf8",
  });
  const words: TsvWord[] = [];
  for (const line of out.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12 || c[11]!.startsWith("###")) continue;
    words.push({ x: Number(c[6]), y: Number(c[7]), text: c[11]! });
  }
  return words;
}

/**
 * **充用のある款（R6 は予備費）は行が3つに割れる**（-layout 実測）:
 *   `266,975,000 円   0 円 … 0 ％`          ← 予算現額・支出済・率の一部が1行上
 *   `13 予備費   0 円   266,975,000  0 ％ …` ← 款行（残りの列）
 *   `(300,000,000) (33,025,000) … (11.0)`   ← 括弧書きの当初値・充用額（採らない注記）
 * 行テキストでは列順を復元できないので、**座標で再構成する**: 款番号の y クラスタと
 * その直上のクラスタ（括弧を含むクラスタは注記なので除外）から数値を集め、x 順に並べる。
 */
function reassembleShortRow(
  filePath: string,
  page: number,
  kanNo: number,
  expectTokens: number,
): string[] | null {
  const words = pdfPageWords(filePath, page);
  const clusters: TsvWord[][] = [];
  for (const w of [...words].sort((a, b) => a.y - b.y || a.x - b.x)) {
    const last = clusters[clusters.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) <= 2.5) last.push(w);
    else clusters.push([w]);
  }
  const isParen = (c: TsvWord[]) => c.some((w) => w.text.includes("(") || w.text.includes(")"));
  const rowIdx = clusters.findIndex((c) =>
    c.some((w) => w.text === String(kanNo) && w.x < 50),
  );
  if (rowIdx < 0) return null;
  const take: TsvWord[] = [];
  // 款行そのもの＋直上の非注記クラスタ（単位ラベルだけのクラスタは数値0個なので無害）
  for (const c of [clusters[rowIdx - 1], clusters[rowIdx]]) {
    if (!c || isParen(c)) continue;
    take.push(...c.filter((w) => /^[\d,]+(?:\.\d+)?$/.test(w.text) && w.x > 50));
  }
  const tokens = take.sort((a, b) => a.x - b.x).map((w) => w.text);
  return tokens.length === expectTokens ? tokens : null;
}

const yen = (token: string): number => {
  const n = Number(token.replace(/,/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${token}`);
  return n;
};

function parsePage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
): { lines: ExecutionLineFact[]; budgetTotal: number; settledTotal: number } {
  const text = pdfPageText(filePath, page);
  const compactAll = text.replace(/[\s　]/g, "");
  // タイトルは1ページ目（歳入）にだけ印字される（p.2 は「歳出」の節見出しから始まる・実測）
  if (side === "revenue" && !compactAll.includes("款別予算決算対照表")) {
    throw new Error(`${filename} p.${page}: 「款別予算決算対照表」の見出しがありません`);
  }
  const sectionMark = side === "revenue" ? "歳入" : "歳出";
  if (!compactAll.includes(sectionMark)) {
    throw new Error(`${filename} p.${page}: 「${sectionMark}」の節がありません（ページ取り違え？）`);
  }
  // 数値トークンの固定位置（款No を除いた後）:
  //   歳入: [予算現額, 収入済額, 比較増減, 収入率, 構成比]           → settled=1, rate=3
  //   歳出: [予算現額, 支出済額, 繰越額, 不用額, 執行率, 繰越率, 構成比] → settled=1, rate=4
  const expectTokens = side === "revenue" ? 5 : 7;
  const rateIdx = side === "revenue" ? 3 : 4;
  const locator = { file: filename, page };

  const lines: ExecutionLineFact[] = [];
  let budgetTotal: number | null = null;
  let settledTotal: number | null = null;
  for (const raw of text.split("\n")) {
    const compact = raw.replace(/[\s　]/g, "");
    if (!compact) continue;
    // 款行 = 行頭が款番号（1〜2桁）。合計行は款番号 99 ＋「歳入合計/歳出合計」
    const m = raw.match(/^\s*(\d{1,2})\s+(.+)$/);
    if (!m) continue; // 単位行（円 円 ％…）・表ヘッダ・タイトル
    const body = m[2]!;
    let tokens: string[] = body.match(/[\d,]+(?:\.\d+)?/g) ?? [];
    // 款名は**再構成前**の行から取る（再構成後の tokens[0] は行内の別の数値に一致し得る —
    // 予備費で name が「予備費0円」に化けた実測）
    const nameFromRow = tokens.length > 0 ? body.slice(0, body.indexOf(tokens[0]!)).replace(/[\s　]/g, "") : "";
    if (tokens.length < expectTokens && tokens.length > 0) {
      // 充用のある款は行が割れて数値が欠ける（予備費・実測）→ 座標で再構成
      const rebuilt = reassembleShortRow(filePath, page, Number(m[1]!), expectTokens);
      if (rebuilt == null) {
        throw new Error(
          `${filename} p.${page}: 款行の数値が ${tokens.length}/${expectTokens} 個しか無く、` +
            `座標でも再構成できませんでした: ${raw.trim()}`,
        );
      }
      tokens = rebuilt;
    } else if (tokens.length === 0) continue;
    if (tokens.length > expectTokens) {
      throw new Error(`${filename} p.${page}: 数値が ${tokens.length} 個あり様式と合いません: ${raw.trim()}`);
    }
    const name = nameFromRow;
    if (!name) continue;
    const currentBudget = yen(tokens[0]!);
    const settled = yen(tokens[1]!);
    if (compact.includes(`${sectionMark}合計`)) {
      if (budgetTotal != null) throw new Error(`${filename} p.${page}: 合計行が2回あります`);
      budgetTotal = currentBudget;
      settledTotal = settled;
      continue;
    }
    lines.push({
      side,
      name,
      currentBudget,
      settled,
      // 記載の収入率/執行率。予算現額 0 は率に意味が無いので null（この資料は 0 予算の款自体が無い）
      ratePct: currentBudget === 0 ? null : Number(tokens[rateIdx]!),
      locator,
    });
  }
  if (lines.length === 0) throw new Error(`${filename} p.${page}: 款行が1件も抽出できませんでした`);
  if (budgetTotal == null || settledTotal == null) {
    throw new Error(`${filename} p.${page}: 合計行（款番号99・${sectionMark}合計）が見つかりません`);
  }
  return { lines, budgetTotal, settledTotal };
}

export function parseShinjukuKessanTaisho(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetExecutionDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: 対照表 PDF は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const opts = (source.parserOptions ?? {}) as Options;
  // タイトルの年度と fiscalYear を突合（決算書ページの PDF 群から別年度を静かに掴む事故を止める）
  const head = pdfPageText(file!.path, opts.revenuePage ?? 1).replace(/[\s　]/g, "");
  const era = `${eraYear(source.fiscalYear ?? "")}年度`;
  if (!head.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).includes(era)) {
    throw new Error(`${source.id}: タイトルに「${era}」が見つかりません（別年度のファイル？）`);
  }
  const rev = parsePage(file!.path, file!.filename, opts.revenuePage ?? 1, "revenue");
  const exp = parsePage(file!.path, file!.filename, opts.expenditurePage ?? 2, "expenditure");
  return {
    docType: "budget-execution",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "yen",
    fiscalYear: source.fiscalYear ?? "",
    account: "一般会計",
    asOf: `令和${(source.fiscalYear ?? "").slice(1)}年度決算（確定値）`,
    basis: "確定",
    population: null,
    revenueBudgetTotal: rev.budgetTotal,
    revenueSettledTotal: rev.settledTotal,
    expenditureBudgetTotal: exp.budgetTotal,
    expenditureSettledTotal: exp.settledTotal,
    facts: [...rev.lines, ...exp.lines],
  };
}
