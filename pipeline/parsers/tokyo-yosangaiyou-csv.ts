// 東京都 予算概要CSV パーサ — 一般会計の款別歳入歳出＋前年当初比較（#124）
//
// **東京都の当初予算 PDF は3経路とも決定的パース不可**（2026-07-22 実測・docs data-sources.md 東京都の節）:
// 予算説明書＝200dpi スキャン＋OCR（`2β93,268` 型の数字化け・値の行浮き＝静かに壊れる型）／
// 概要（案）＝金額フォントの ToUnicode 欠落／成立後概要＝全文字ベクターアウトライン。
// **唯一の機械可読経路が財務局の「東京都予算概要CSVファイル集」**（Power BI ダッシュボードが
// 配る素の CSV。実体 URL は registry 参照 — H30〜R8 の9年＋H29 はオープンデータカタログの別形式）。
//
// CSV は2レイアウトある（どちらも cp932・単位千円・前年当初比較つき）:
//   A) H30〜R8（CSVファイル集）: `タイトル / 単位：千円 / (空行) / 区分,当年度,前年度 / 款行…/ 合計`
//      - **5款ごとに空行**が入る年度がある（`,,`）
//      - ⚠ **2019〜2022 の歳出だけ合計行のラベルが空**（`,7461000000,7046000000`）。
//        「区分が空で金額が両方入っている行」を合計行として受ける
//      - **款番号列が無い** → kanNo は全件 null（原典が振っていない番号を捏造しない・広島 §8 と同じ）
//   B) H29（カタログ「平成29年度予算概要①」・CC BY）: `番号,区分,２９予算額(千円),構成比,
//      ２８予算額(千円),構成比,比較増減額,増減率`。番号列があるので kanNo を持てる。
//      合計行は番号列に `合計` が入る変則
//
// 検証の網:
// - **年度ヘッダの突合**: 当年度列の見出しに source.fiscalYear の年号が含まれることを必須にする
//   （全角数字を正規化して比較）。URL パターンがサイト改修で年度ごとに変わる資料なので、
//   **別年度のファイルを静かに掴む事故**をここで止める。前年度列見出しに「補正」が出たら throw
//   （prevBasis=当初 の前提が崩れるため）
// - Σ款=合計行は validate が照合する（ここでは記載合計をそのまま持つ）
import { readFileSync } from "node:fs";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";
import { eraYear } from "../lib/fy";

export const PARSER_VERSION = "0.1.0";

/** cp932 → UTF-8。BOM や UTF-8 のファイルが混ざったら化けて年度ヘッダ突合で落ちる（それでよい） */
const decode = (path: string): string => new TextDecoder("shift_jis").decode(readFileSync(path));

/** 最小の CSV 行パーサ（ダブルクォート内のカンマ対応。金額は `"7,385,632,321"` で来る） */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  for (const line of text.split(/\r?\n/)) {
    const cells: string[] = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i]!;
      if (inQ) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') inQ = false;
        else cur += c;
      } else if (c === '"') inQ = true;
      else if (c === ",") { cells.push(cur); cur = ""; }
      else cur += c;
    }
    cells.push(cur);
    rows.push(cells);
  }
  return rows;
}

const compact = (s: string) => s.replace(/[\s　]/g, "");
/** 全角数字→半角（見出し「令和８年度」「２９予算額」の突合用） */
const toHalfDigits = (s: string) => s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
const toAmount = (t: string): number => {
  const n = Number(t.replace(/[,、\s　]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${t}`);
  return n;
};

function parseSide(
  path: string,
  filename: string,
  side: "revenue" | "expenditure",
  source: SourceEntry,
): { lines: BudgetLineFact[]; total: number; prevTotal: number } {
  const rows = parseCsv(decode(path));
  // ヘッダ行: レイアウトA は先頭セル `区分`、B は `番号`（**B はタイトル行を持たず1行目がヘッダ**）
  const hi = rows.findIndex((r) => r[0] !== undefined && ["区分", "番号"].includes(compact(r[0]!)));
  if (hi < 0) throw new Error(`${filename}: ヘッダ行（区分/番号）が見つかりません`);
  const hdr = rows[hi]!;
  const layoutB = compact(hdr[0]!) === "番号";
  // 側の取り違えチェック。A はタイトル行（`03_一般会計歳入予算款別内訳`）で、
  // B はタイトルが無いので抽出後に**側の代表款名**（歳入=都税 / 歳出=議会費）で確かめる（下）。
  const expectTitle = side === "revenue" ? "歳入予算款別内訳" : "歳出予算款別内訳";
  if (!layoutB && !rows.some((r) => r[0] && compact(r[0]).includes(expectTitle))) {
    throw new Error(`${filename}: タイトル行に「${expectTitle}」が見つかりません（側の取り違え？）`);
  }
  // 列位置: A=名前0/当年1/前年2, B=番号0/名前1/当年2/前年4
  const nameCol = layoutB ? 1 : 0;
  const curCol = layoutB ? 2 : 1;
  const prevCol = layoutB ? 4 : 2;

  // **年度ヘッダの突合**（別年度ファイルの静かな取り違えを止める）
  const era = eraYear(source.fiscalYear); // "令和8" / "平成31"
  const fyNum = source.fiscalYear.slice(1);
  const curHdr = toHalfDigits(compact(hdr[curCol] ?? ""));
  const okA = curHdr.includes(`${era}年度`);
  const okB = layoutB && curHdr.includes(`${fyNum}予算額`);
  if (!(okA || okB)) {
    throw new Error(`${filename}: 当年度列の見出し「${hdr[curCol]}」が ${source.fiscalYear}（${era}年度）と一致しません`);
  }
  const prevHdr = toHalfDigits(compact(hdr[prevCol] ?? ""));
  if (prevHdr.includes("補正")) {
    throw new Error(`${filename}: 前年度列の見出し「${hdr[prevCol]}」が補正基準です（prevBasis=当初 の前提が崩れる）`);
  }
  // レイアウトA は単位行を必須にする（単位取り違えで4桁ずれる事故を止める）
  if (!layoutB && !rows.some((r) => r[0] && compact(r[0]).includes("単位：千円"))) {
    throw new Error(`${filename}: 「単位：千円」の行が見つかりません`);
  }

  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  for (let i = hi + 1; i < rows.length; i++) {
    const r = rows[i]!;
    const name = compact(r[nameCol] ?? "");
    const cur = (r[curCol] ?? "").trim();
    const prev = (r[prevCol] ?? "").trim();
    if (!cur && !prev) continue; // 空行スペーサ（`,,`）・末尾
    const isTotal =
      name === "合計" ||
      (layoutB && compact(r[0] ?? "") === "合計") ||
      // 2019〜2022 の歳出: 合計行のラベルが空のまま金額だけ入る
      (!layoutB && name === "" && cur !== "" && prev !== "");
    if (isTotal) {
      if (total != null) throw new Error(`${filename}: 合計行が2回現れました（${i + 1}行目）`);
      total = toAmount(cur);
      prevTotal = toAmount(prev);
      continue;
    }
    if (!name) continue; // 名前なし・金額片方だけの行は構造外（現物には無い。増えたら合計照合で気づく）
    let kanNo: number | null = null;
    if (layoutB) {
      const no = toHalfDigits(compact(r[0] ?? ""));
      kanNo = /^\d+$/.test(no) ? Number(no) : null;
    }
    lines.push({
      side,
      kanNo,
      kanName: name,
      amount: toAmount(cur),
      prevAmount: toAmount(prev),
      locator: { file: filename, row: i + 1 },
    });
  }
  if (lines.length === 0) throw new Error(`${filename}: 款行が1件も抽出できませんでした`);
  if (total == null || prevTotal == null) throw new Error(`${filename}: 合計行が見つかりません`);
  // 側の代表款名チェック（都税は歳入だけ・議会費は歳出だけに現れる。特にタイトル行の無い
  // レイアウトB で、ファイル名だけを頼りに側を決める事故を止める）
  const marker = side === "revenue" ? "都税" : "議会費";
  if (!lines.some((l) => l.kanName === marker)) {
    throw new Error(`${filename}: ${side === "revenue" ? "歳入" : "歳出"}の代表款「${marker}」がありません（側の取り違え？）`);
  }
  return { lines, total, prevTotal };
}

export function parseTokyoYosangaiyouCsv(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const revFile = files.find((f) => /sainyu|_3-1/.test(f.filename));
  const expFile = files.find((f) => /saishutsu|_4-1/.test(f.filename));
  if (!revFile || !expFile) {
    throw new Error(`歳入/歳出の CSV が揃っていません: ${files.map((f) => f.filename).join(", ")}`);
  }
  const rev = parseSide(revFile.path, revFile.filename, "revenue", source);
  const exp = parseSide(expFile.path, expFile.filename, "expenditure", source);
  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: "tokyo-yosangaiyou-csv",
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear ?? "",
    account: "一般会計",
    revenueTotal: rev.total,
    expenditureTotal: exp.total,
    prevRevenueTotal: rev.prevTotal,
    prevExpenditureTotal: exp.prevTotal,
    prevBasis: "当初",
    facts: [...rev.lines, ...exp.lines],
  };
}
