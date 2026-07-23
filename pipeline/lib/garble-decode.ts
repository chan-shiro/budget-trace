// ToUnicode 欠落 PDF の決定論的復号（#125 荒川 → #159 で共通化）
//
// 荒川で「修復不可ではなく第4の型」と確立した復号が、**豊島 R4/R2/H31〜H29・大田 H27・
// 品川 R2 と同一の化けマップ**であることを実測で確認した（≉=特・༊=区・⛯=税 … 生成系が同じ）。
// 資料別マップではなく**共通マップ**としてここに置き、パーサ間で共有する。
//
// 復号規則（すべて実測・比較列/Σ ゲートで検算済み）:
//   1. **ASCII 帯**: 真の文字 − 0x1D（\x13〜\x1C=0〜9・\x0F=,・\x03=空白 …）→ +0x1D で復元
//   2. **全角帯**: 真の文字 − 0xC0E2（㸲(U+3E32)=４・㸦=（・㸧=） …）→ +0xC0E2 で復元
//      （U+3E1F〜U+3E7C が全角 ASCII U+FF01〜U+FF5E に対応。豊島 R4 で実測）
//   3. **漢字・かな**: 固定ガーブル（下の GARBLE_CHAR_MAP）。荒川 R2〜R8 で同一・豊島 R4 でも同一
//   4. △（負号）は ڹ(U+06B9)・○ は ۑ(U+06D1) に化け、bidi 制御（U+202B〜U+202C）で
//      **視覚順＝逆順**になる区間がある → 区間を反転して論理順へ戻す
//
// **未知の化け字は黙って通さない** — マップ外の字は列挙して throw（フォントのサブセットが
// 変わって同じ字が別の化け方をする実例あり: 会=U+0C4D と U+0C0D）。静かな誤読を許すと
// 款名の破損が Σ を素通りする（§2-4）。**CHAR_MAP に足す前に必ず健全な資料と突合すること**。
export const GARBLE_CHAR_MAP: Record<string, string> = {
  // ---- 荒川 R2〜R8 の款名・合計行から機械構築（矛盾0・#125）----
  // ⚠ 同じ字が別の化け方をする変種（フォントのサブセット差・荒川で実測）:
  //    清=U+038E/U+1FEB・渡=U+038F/U+1FFB・会=U+0C4D/U+0C0D。
  //    取(U+0F76) はエディタの NFC 正規化で分解されるため必ず \u エスケープで書く
  "\u038E": "清",
  "\u1FEB": "清",
  "\u038F": "渡",
  "\u1FFB": "渡",
  "\u0F76": "取",
  "\u0C4D": "会",
  "\u0C0D": "会",
  "ࡧ": "び",
  "⮬": "自",
  "ື": "動",
  "㌴": "車",
  "୚": "与",
  "ண": "予",
  "஺": "交",
  "௜": "付",
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
  "㝃": "附",
  // ---- 豊島 R4/R2 の総括表から追加（#159）。真の字は健全な R3/R5（同一様式）のヘッダ・款名と突合 ----
  "\u27EC": "算",
  "\u18D3": "括",
  "\u2FB2": "表",
  "\u1E30": "款",
  "\u1B8F": "本",
  "\u15BA": "年",
  "\u15D8": "度",
  "\u0E53": "前",
  "\u0F13": "千",
  "\u0DC7": "円",
  // 豊島 歳出13款（政策経営費・文化商工費・福祉費・子ども家庭費・都市整備費）と突合
  "\u1A3B": "政",
  "\u10A0": "営",
  "\u1A65": "文",
  "\u0EEC": "化",
  "\u105F": "商",
  "\u1564": "工",
  "\u269F": "福",
  "\u2674": "祉",
  "\u085D": "ど",
  "\u0876": "も",
  "\u1419": "家",
  "\u15DE": "庭",
  "\u1577": "市",
  "\u1A5A": "整",
  // ---- 大田 H27 の集計表から追加（#159）。ヘッダ語彙は同一様式の H28 と突合 ----
  "\u15B9": "平",
  "\u1842": "成",
  "\u0B4D": "一",
  "\u2BE1": "般",
  "\u1C4C": "案",
  "\u0F22": "単",
  "\u0C29": "位",
  "\u0E36": "初",
  "\u1E9A": "比",
  "\u1D53": "構",
  "\u1251": "増",
  "\u1FF6": "減",
  "\u22E1": "率",
  "\u11DE": "△",
  // ⚠ CJK 域内に落ちるガーブル（isSuspectGarble を素通りする型）。ヘッダの「予算額」で実測。
  //   款名は全件目視＋クロスチェーンが網だが、この型は throw で捕まらないので見つけ次第ここに足す
  "㢠": "額",
  "㍑": "較",
};

/**
 * 数字シフト（+0x1D）・全角シフト（+0xC0E2）・△・bidi 処理。漢字マップは適用しない
 * （款名ゾーンだけに適用する — 呼び出し側が decodeGarbleName / decodeGarbleText を選ぶ）。
 * ⚠ **RLE(U+202B)〜PDF(U+202C) で囲まれた負数は視覚順＝逆順で出てくる**（`△4,006` が
 * `600,4△` に化ける・荒川で実測）。区間の中身を反転して論理順に戻す。比較列の等式ゲートが
 * この処理の正しさを全款で検算する（反転を忘れると即・等式が割れる）。
 */
export function decodeGarbleBase(s: string): string {
  let out = "";
  let rtl: string[] | null = null;
  for (const ch of s) {
    const o = ch.codePointAt(0)!;
    let mapped: string | null = null;
    if (o >= 0x03 && o <= 0x1c && o !== 0x09 && o !== 0x0a && o !== 0x0c && o !== 0x0d) {
      mapped = String.fromCharCode(o + 0x1d); // ASCII 帯（タブ・改行・改頁は素通し）
    } else if (o >= 0x3e1f && o <= 0x3e7c) {
      mapped = String.fromCodePoint(o + 0xc0e2); // 全角帯（㸲=４・㸦=（ …）
    } else if (o === 0x06b9) mapped = "△";
    else if (o === 0x06d1) mapped = "○";
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

/** 化けている可能性のある字か（素の日本語・ASCII・記号は false） */
function isSuspectGarble(o: number): boolean {
  if (o < 0x80) return false; // ASCII（シフト済み前提）
  if (o >= 0x3040 && o <= 0x30ff) return false; // かな
  if (o >= 0x3400 && o <= 0x9fff) return false; // CJK
  if (o >= 0xf900 && o <= 0xfaff) return false; // CJK 互換
  if (o >= 0xff00 && o <= 0xffef) return false; // 全角形
  if (o === 0x3000 || o === 0x3001 || o === 0x3002 || o === 0x30fb) return false; // 　、。・
  if (o === 0x2015 || o === 0x2010 || o === 0x2212) return false; // ― ‐ −
  if (o === 0x25b3 || o === 0x25b2 || o === 0x3007 || o === 0x25cb || o === 0x25ce || o === 0x25cf) return false; // △▲〇○◎●
  return true;
}

/** 款名など名前ゾーンの復号。**マップ外の化け字は列挙して throw** */
export function decodeGarbleName(garbled: string, where: string): string {
  let out = "";
  const unknown: string[] = [];
  for (const ch of garbled) {
    const o = ch.codePointAt(0)!;
    if (GARBLE_CHAR_MAP[ch] != null) out += GARBLE_CHAR_MAP[ch];
    else if (!isSuspectGarble(o)) out += ch;
    else unknown.push(`${ch}(U+${o.toString(16).toUpperCase()})`);
  }
  if (unknown.length > 0) {
    throw new Error(
      `${where}: 文字マップ外の化け字があります: ${unknown.join(" ")}。` +
        `GARBLE_CHAR_MAP に追加する前に、必ず健全な資料（概要 PDF・他年度等）と突合して真の字を確定すること`,
    );
  }
  return out;
}

/**
 * ページ全文の復号（kofu-yosansho の decodeGarble オプション用）:
 * base シフト → 残りの化け字をマップで置換。**マップ外の化け字は throw**。
 * 全角空白ガーブル ࠉ(U+0809) は頻出のためここで直接扱う。
 */
export function decodeGarbleText(s: string, where: string): string {
  const base = decodeGarbleBase(s).replace(/ࠉ/g, "　");
  return decodeGarbleName(base, where);
}
