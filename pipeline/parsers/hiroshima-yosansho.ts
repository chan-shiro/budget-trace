// 広島市 当初予算の概要「資料1」パーサ — 款別歳入歳出＋前年当初比較
//
// **予算書本体（事項別明細書）は使えない**。全編がスキャン画像＋OCR で、`pdftotext` が
// 空にならず**もっともらしい誤数字を出す**（`262,フ73,622` / `3,4四,171` / 款番号24が `討`）。
// 空のテキスト層より危険で、Σ が偶然通れば気付かずに誤収録する。同じ数値が born-digital で
// 載っている**財政局の記者発表資料「資料1」の p.8（歳入）/ p.9（歳出）**を使う。
//
// なぜ専用パーサか — `kofu-yosansho` の骨格（1ページ＝1側の単独表）は保たれているが、
// 列の作りが違って前提が2つ崩れる:
//
// 1. **款番号の列が無い**（左端は `区 分`）。`kofu-yosansho` は款番号を款行の判定にも使う。
//    → **kanNo は全件 null**（原典が振っていないものを捏造しない・メダリオン）。
//    行順から採番することもできるが、款の行順は明細書の款番号と一致しない
//    （廃止款の環境性能割交付金が末尾に別掲されるため、素直に採ると款10以降が全部1つずれる）。
//    採番規則を推測して当てにいくと**静かに1つずれる**ので、番号は持たない。
// 2. **列が10個ある**（本年度 / 前年当初 / 前年2月補正後 × 予算額・構成比 ＋ 差引増減・増減率 × 2）。
//    しかも**構成比・差引欄が空欄になる行がある**ので、列位置では取れない。
//    → **小数点を含まないトークンだけが金額**（構成比・増減率は必ず `34.3` のように小数、
//    `皆減`/`皆増` は数字を持たない）という性質を使い、**先頭2つ＝本年度・前年当初**を取る。
//
// 罠（実測）:
// - **款名が2行に折返す**（7件: 株式等譲渡／分離課税／法人事業税／地方消費税／ゴルフ場利用税／
//   国有提供施設等所在／交通安全対策）。**款番号が無いので折返しの起点が無い**。放置すると
//   款名が「所得割交付金」「交付金」に化けるが、**金額は正しいので Σ は通る**
//   ＝ validate を素通りする型（§8 の「款名だけが静かに壊れる」の再来）→ 収録後に款名を全件目視した。
// - **廃止款 環境性能割交付金**（本年度0・前年 681,000・`皆減`）。款番号を持たない。
//   落とすと歳入の前年度Σが 681,000 ずれる。
// - **象徴計上 繰越金 `1/1`**（大阪 §8e と同型）。桁数で絞ると静かに落ちる。
// - 字間空白の両端揃え（`市                       税`）。
// - 合計ラベルが `計`（`歳入合計` ではない）。
import { execFileSync } from "node:child_process";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  revenuePage?: number;
  expenditurePage?: number;
  totalLabel?: string;
}

const compact = (s: string) => s.replace(/[\s　]/g, "");
/** 金額トークン＝小数点を含まない整数のみ。構成比 `34.3`・増減率 `△18.3` は必ず小数なので当たらない */
const AMOUNT_TOKEN = /^[△▲]?[\d,]+$/;
const toAmount = (t: string): number => {
  const neg = /^[△▲]/.test(t);
  const n = Number(t.replace(/[△▲,]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${t}`);
  return neg ? -n : n;
};

function parseSide(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
  totalLabel: string,
): { lines: BudgetLineFact[]; total: number; prevTotal: number } {
  const text = execFileSync("pdftotext", ["-layout", "-f", String(page), "-l", String(page), filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  const locator = { file: filename, page };
  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  let pendName = "";
  // 見出しブロック（`区分`・`当初`・`２月補正後` 等）は日本語だけの行なので、そのままだと
  // 款名の折返し断片と見分けが付かない。**単位行 `億 万 千円 ％ …` が見出しの最終行**なので、
  // 最初に `％` を含む行までを読み飛ばす（構造で切る）。
  let started = false;

  for (const l of text.split("\n")) {
    if (!started) {
      if (l.includes("％")) started = true;
      continue;
    }
    const tokens = [...l.matchAll(/\S+/g)];
    const first = tokens.findIndex((t) => AMOUNT_TOKEN.test(t[0]));
    if (first < 0) {
      // 金額を持たない行 = 款名の折返し断片（`株 式 等 譲 渡`）
      const c = compact(l);
      if (c) pendName += c;
      continue;
    }
    const ints = tokens.slice(first).filter((t) => AMOUNT_TOKEN.test(t[0]));
    if (ints.length < 2) {
      pendName = "";
      continue; // ページ番号 `－8－` 等
    }
    const name = pendName + compact(l.slice(0, tokens[first]!.index));
    pendName = "";
    const amount = toAmount(ints[0]![0]);
    const prevAmount = toAmount(ints[1]![0]);
    if (name === totalLabel) {
      total = amount;
      prevTotal = prevAmount;
      continue;
    }
    if (!name) continue;
    lines.push({ side, kanNo: null, kanName: name, amount, prevAmount, locator });
  }
  if (total == null || prevTotal == null) {
    throw new Error(`${filename} p.${page}: 合計行（${totalLabel}）が見つかりません`);
  }
  if (lines.length === 0) throw new Error(`${filename} p.${page}: ${side} の款が1件も抽出できませんでした`);
  return { lines, total, prevTotal };
}

export function parseHiroshimaYosansho(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  if (!opts.revenuePage || !opts.expenditurePage) {
    throw new Error(`${source.id}: parserOptions.revenuePage / expenditurePage が必要です`);
  }
  const f = files[0]!;
  const totalLabel = opts.totalLabel ?? "計";
  const rev = parseSide(f.path, f.filename, opts.revenuePage, "revenue", totalLabel);
  const exp = parseSide(f.path, f.filename, opts.expenditurePage, "expenditure", totalLabel);
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
    // 資料1 は前年度の「当初」と「2月補正後」を両方載せる。先頭2列＝本年度・前年当初を取っている。
    prevBasis: "当初",
    facts: [...rev.lines, ...exp.lines],
  };
}
