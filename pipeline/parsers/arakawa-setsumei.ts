// 荒川区「予算説明書」パーサ — ToUnicode 欠落 PDF の決定論的復号（#125・2026-07-23）
//
// 荒川の予算書・説明書は全 CID フォントが uni=no（pdffonts 実測）で pdftotext が化けるが、
// **化け方が決定論的**という第4の型（港=部首異体字/豊島=修復不可のどちらでもない）:
//   - **数字・カンマ・空白は「真の文字 − 0x1D」**（\x13〜\x1C=0〜9・\x0F=,・\x03=空白）
//     → +0x1D シフトで完全復元
//   - **漢字は固定のガーブル**（≉=特・஺=交・㈝=費 …）で **R2〜R8 で同一マップ**（R2/R7/R8 の
//     3年度で実測）。約80字の文字マップで復元する
//   - △（負号）は ڹ(U+06B9) に化け、bidi 制御（U+202A-U+202E 等）で表示順が乱れる → 除去/置換
//
// **未知の化け字は黙って通さない** — 款名ゾーンに文字マップ外の字が出たら **その字を列挙して throw**
// する（フォントのサブセットが変わって同じ字が別の化け方をする実例あり: 会=U+0C4D と U+0C0D）。
// 静かな誤読を許すと款名の破損が Σ を素通りする（§2-4）。
//
// 検証の網:
//   1. Σ款 = 記載合計（歳入合計/歳出合計・復号値どうし）— validate が照合
//   2. **比較列の等式ゲート**: 本年度 − 前年度 = 記載の比較（△=負）を全款＋合計行で要求。
//      復号の取り違え（数字のシフト誤り等）はここで大声で落ちる
//   3. 年度間クロスチェーン（derive）・概要 PDF（テキスト健全・百万円）との突合は収録時に実施
import { execFileSync } from "node:child_process";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  revenuePage: number;
  expenditurePage: number;
}

// 漢字ガーブル → 真の文字（R2/R7/R8 の款名・合計行から機械構築・矛盾0を確認済み）
const CHAR_MAP: Record<string, string> = {
  "Ύ": "清",
  "Ύ": "清",
  "Ώ": "渡",
  "⮬": "自",
  "ື": "動",
  "㌴": "車",
  "\u0F76": "取",
  "Ώ": "渡",
  "ࡧ": "び",
  "୚": "与",
  "ண": "予",
  "஺": "交",
  "௜": "付",
  "఍": "会",
  "౑": "使",
  "౛": "例",
  "ഛ": "備",
  "മ": "債",
  "ධ": "入",
  "඲": "全",
  "බ": "公",
  "ฟ": "出",
  "ศ": "分",
  "ู": "別",
  "฼": "利",
  "๭": "割",
  "ົ": "務",
  "༊": "区",
  "ཬ": "及",
  "཰": "収",
  "ྜ": "合",
  "ᅜ": "国",
  "ᅵ": "土",
  "ᆅ": "地",
  "ቃ": "境",
  "Ꮚ": "子",
  "Ᏻ": "安",
  "ᐤ": "寄",
  "ᑐ": "対",
  "ᗜ": "庫",
  "ᘧ": "式",
  "ᙜ": "当",
  "ᚓ": "得",
  "ᛶ": "性",
  "ᡤ": "所",
  "ᡭ": "手",
  "ᢸ": "担",
  "ᤲ": "掃",
  "ᨭ": "支",
  "ᩍ": "教",
  "ᩘ": "数",
  "ᩱ": "料",
  "᪉": "方",
  "ᮌ": "木",
  "ᰴ": "株",
  "ᴗ": "業",
  "ṓ": "歳",
  "Ẹ": "民",
  "ᾘ": "消",
  "῭": "済",
  "≉": "特",
  "⎔": "環",
  "⏕": "生",
  "⏘": "産",
  "⏝": "用",
  "⛯": "税",
  "➼": "等",
  "⟇": "策",
  "⤒": "経",
  "⥲": "総",
  "⧞": "繰",
  "⫱": "育",
  "⬟": "能",
  "⾨": "衛",
  "ィ": "計",
  "ㅖ": "諸",
  "㆟": "議",
  "ㆡ": "譲",
  "㈇": "負",
  "㈈": "財",
  "㈝": "費",
  "㉺": "越",
  "㏻": "通",
  "㒔": "都",
  "㓄": "配",
  "㔠": "金",
  "㝃": "附"
};

function pdfPageText(filePath: string, page: number): string {
  return execFileSync("pdftotext", ["-layout", "-f", String(page), "-l", String(page), filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
}

/**
 * 数字シフト（+0x1D）・△・bidi 処理。漢字マップは**款名ゾーンだけ**に適用する（呼び出し側）。
 * ⚠ **RLE(U+202B)〜PDF(U+202C) で囲まれた負数は視覚順＝逆順で出てくる**（`△4,006` が
 * `600,4△` に化ける・実測）。区間の中身を反転して論理順に戻す。比較列の等式ゲートが
 * この処理の正しさを全款で検算する（反転を忘れると即・等式が割れる）。
 */
function decodeBase(s: string): string {
  let out = "";
  let rtl: string[] | null = null;
  for (const ch of s) {
    const o = ch.codePointAt(0)!;
    let mapped: string | null = null;
    if (o >= 0x03 && o <= 0x1c) mapped = String.fromCharCode(o + 0x1d);
    else if (o === 0x06b9) mapped = "△";
    else if (o === 0x202b) { rtl = []; continue; } // RLE: 逆順区間の開始
    else if (o === 0x202c) { // PDF: 区間の終わり → 反転して吐く
      if (rtl) { out += rtl.reverse().join(""); rtl = null; }
      continue;
    } else if ((o >= 0x202a && o <= 0x202e) || (o >= 0x2066 && o <= 0x2069)) continue;
    else mapped = ch;
    if (rtl) rtl.push(mapped);
    else out += mapped;
  }
  if (rtl) out += rtl.reverse().join(""); // 閉じ忘れ（行末で切れた区間）
  return out;
}

function decodeName(garbled: string, where: string): string {
  let out = "";
  const unknown: string[] = [];
  for (const ch of garbled) {
    if (CHAR_MAP[ch] != null) out += CHAR_MAP[ch];
    else if (/[\u3040-\u30ff\u4e00-\u9fff]/.test(ch)) out += ch; // 素の日本語（化けていない字）
    else unknown.push(`${ch}(U+${ch.codePointAt(0)!.toString(16).toUpperCase()})`);
  }
  if (unknown.length > 0) {
    throw new Error(
      `${where}: 款名に文字マップ外の化け字があります: ${unknown.join(" ")}。` +
        `CHAR_MAP に追加する前に、必ず健全な資料（概要 PDF 等）と突合して真の字を確定すること`,
    );
  }
  return out;
}

const toAmount = (t: string): number => {
  const neg = t.includes("△");
  const n = Number(t.replace(/[△,\s　]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${t}`);
  return neg ? -n : n;
};

function parsePage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
): { lines: BudgetLineFact[]; total: number; prevTotal: number } {
  const raw = pdfPageText(filePath, page);
  const sideLabel = side === "revenue" ? "歳入" : "歳出";
  const locator = { file: filename, page };
  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  for (const line of raw.split("\n")) {
    const d = decodeBase(line);
    // 款行: `1 <ガーブル款名> 本年度 前年度 比較`
    // ⚠ 比較列の負号 △ は bidi の論理順で**数字の後ろ**に来ることがある（`977,271△`）。
    //   前後どちらも受ける（toAmount は位置を問わず △ を負と読む）
    const m = d.match(/^\s*(\d{1,2})\s+(\S+)\s+([\d,]+)\s+([\d,]+)\s+(△?\s*[\d,]+\s*△?)\s*$/);
    if (m) {
      const kanName = decodeName(m[2]!, `${filename} p.${page}`);
      const amount = toAmount(m[3]!);
      const prevAmount = toAmount(m[4]!);
      const cmp = toAmount(m[5]!.replace(/\s/g, ""));
      // **比較列の等式ゲート**: 復号の数字誤りをここで止める
      if (amount - prevAmount !== cmp) {
        throw new Error(
          `${filename} p.${page}「${kanName}」: 本年度 ${amount} − 前年度 ${prevAmount} = ${amount - prevAmount} が` +
            `記載の比較 ${cmp} と一致しません（復号の取り違え？）`,
        );
      }
      lines.push({ side, kanNo: Number(m[1]), kanName, amount, prevAmount, locator });
      continue;
    }
    // **廃止款の行（款番号なし・○マーカー）**: R3 歳入の `○ 自動車取得税交付金 0 1 △1`（実測）。
    // ○ は ۑ(U+06D1) に化け、bidi で名前の中に紛れ込む。落とすと前年度Σが 1千円 割れる
    //（=Σゲートが実際に検出した）。款番号なし・マーカーつき・数値3つの行だけを拾う
    const ab = d.match(/^\s*[ۑ○〇]?\s*(\S+)\s+([\d,]+)\s+([\d,]+)\s+(△?\s*[\d,]+\s*△?)\s*$/);
    if (!m && ab && /[ۑ○〇]/.test(d.slice(0, 8))) {
      const kanName = decodeName(ab[1]!.replace(/[ۑ○〇]/g, ""), `${filename} p.${page}`);
      const amount = toAmount(ab[2]!);
      const prevAmount = toAmount(ab[3]!);
      const cmp = toAmount(ab[4]!.replace(/\s/g, ""));
      if (amount - prevAmount !== cmp) {
        throw new Error(`${filename} p.${page}「${kanName}」(廃止款): ${amount} − ${prevAmount} ≠ ${cmp}`);
      }
      lines.push({ side, kanNo: null, kanName, amount, prevAmount, locator });
      continue;
    }
    // 合計行: `歳 入 合 計 <本年度> <前年度> <比較>`（ガーブル → 復号して判定）
    const dn = d.replace(/[\s　ࠉ]/g, "");
    const decodedLabel = [...dn.slice(0, 8)].map((c) => CHAR_MAP[c] ?? c).join("");
    if (decodedLabel.startsWith(`${sideLabel}合計`)) {
      const nums = d.match(/(△?\s*[\d,]+)/g)?.filter((t) => /\d/.test(t)) ?? [];
      if (nums.length < 3) throw new Error(`${filename} p.${page}: 合計行を解釈できません: ${d.trim()}`);
      total = toAmount(nums[0]!);
      prevTotal = toAmount(nums[1]!);
      const cmp = toAmount(nums[2]!.replace(/\s/g, ""));
      if (total - prevTotal !== cmp) {
        throw new Error(`${filename} p.${page}: 合計行の 本年度−前年度 ${total - prevTotal} ≠ 比較 ${cmp}`);
      }
    }
  }
  if (lines.length === 0) throw new Error(`${filename} p.${page}: 款行が1件も抽出できませんでした`);
  if (total == null || prevTotal == null) throw new Error(`${filename} p.${page}: ${sideLabel}合計の行が見つかりません`);
  return { lines, total, prevTotal };
}

export function parseArakawaSetsumei(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: 予算説明書 PDF は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const opts = source.parserOptions as unknown as Options;
  if (!opts?.revenuePage || !opts?.expenditurePage) {
    throw new Error(`${source.id}: parserOptions.revenuePage / expenditurePage（総括の物理ページ）が必要です`);
  }
  const rev = parsePage(file!.path, file!.filename, opts.revenuePage, "revenue");
  const exp = parsePage(file!.path, file!.filename, opts.expenditurePage, "expenditure");
  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: "arakawa-setsumei",
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
