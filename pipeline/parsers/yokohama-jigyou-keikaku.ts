// 横浜市 局・統括本部 事業計画書 — 政令市の主な事業（#164）
//
// **#164 は「主な事業 CSV から」と書かれていたが、実測して資料を差し替えた**。
// CSV（393事業）は**単位が百万円**で、資料自身が「表示単位未満を四捨五入…合計等と一致しない
// 場合があります」「**事業計画書の事業費と一致しない場合があります**」と明記している
// ＝ **Σ=合計のゲートが原理的に張れない**。しかも**款項目を持たない**（局名だけ）。
// 事業計画書は**款項目つき・千円・丸め無し**で、既収録の款項目明細（#191）と目レベルで突合できる。
//
// **1ファイル = 目次ページ（目単位の事業一覧＋「計」）＋ 事業ごとの詳細シート**の2層。
// ⚠ **目次を主にする** — 詳細シートは**当年度に廃止された事業が丸ごと無い**（目次には
//   「計画書頁 = －」で載る）。詳細シートを主にすると前年度が静かに欠ける。
//
// ⚠⚠ **行ベースの正規表現では取りこぼす**（実測）。事業名の折返しに3つの型がある:
//   ①1行完結 ②事業名が上下に折返し数字は中央行 ③**計画書頁と事業名が別行で、行頭に番号が無い**
//   → **座標で列を切り、数字行を基準に名前を y の帯で拾う**（杉並 #163 と同じ作法）。
import { execFileSync } from "node:child_process";
import type { BudgetProjectsDoc, BudgetProjectLine, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface W {
  x0: number;
  x1: number;
  y: number;
  t: string;
}

/** 目次の列。⚠ **金額列の x はファイルごとに違う**ので、ここには持たない（下記 amountsOf） */
const COL = {
  /** 新規・拡充の印はページの右端に出る（金額列より右） */
  kubunFromRight: 60,
} as const;

function pageWords(path: string): Map<number, W[]> {
  const tsv = execFileSync("pdftotext", ["-tsv", path, "-"], { maxBuffer: 1 << 30 }).toString("utf8");
  const out = new Map<number, W[]>();
  for (const line of tsv.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12 || c[0] !== "5") continue;
    const t = c[11]!;
    if (!t.trim()) continue;
    const page = Number(c[1]);
    const x0 = Number(c[6]);
    if (!out.has(page)) out.set(page, []);
    out.get(page)!.push({ x0, x1: x0 + Number(c[8]), y: Number(c[7]), t });
  }
  return out;
}

function layoutPages(path: string): string[] {
  return execFileSync("pdftotext", ["-layout", path, "-"], { maxBuffer: 1 << 30 })
    .toString("utf8")
    .split("\f");
}

/** 全角数字・全角空白を半角へ。款項目の見出しは全角と半角が混ざる（実測） */
const han = (s: string): string =>
  s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/　/g, " ");

/**
 * 数字。⚠ **負号は「別トークン」のときと「くっついた1トークン」のときがある**（実測）。
 * `△ 2`（空白あり）は別トークンだが、`△2`（空白なし）は1トークンで来る。
 * 後者を数字と認めないと、その行の金額が4個になって**事業ごと落ちる**
 * （資源循環局 10款1項4目「車両燃料費」331,166 がまるごと消えた）。
 */
const num = (s: string): number | null => {
  // ⚠ **全角数字が混ざる** — 資源循環局 10款1項1目 の7件目は計画書頁が全角の `７` で、
  //   半角しか見ないと「頁の欄が無い行」＝枠見出しと誤判定して**事業ごと落ちた**（差 3,772）。
  const v = han(s).replace(/[,\s]/g, "");
  const m = /^([△▲]?)(\d+)$/.exec(v);
  return m ? (m[1] ? -Number(m[2]) : Number(m[2])) : null;
};

/**
 * **セル内で行をまたいで割れた数字をつなぐ**（実測）。
 *
 * 列が狭い目次では `141,848` が `141,84`（上の行）と `8`（下の行）に割れて印字される
 * （健康福祉局 7款3項2目 の「在宅高齢者生活支援・虐待防止事業」）。割れたままだと
 * その行の金額が4個になって事業ごと落ち、Σ が 141,848 ちょうど足りなくなる。
 *
 * ⚠ **無条件につないではいけない**（同じ列の上下は別の事業の値であることが普通）。
 * **上の断片が数字として未完成**（カンマの後が1〜2桁）で、**下が1〜2桁だけ**で、
 * **x が重なっていて y が近い**ときだけつなぐ。
 */
function joinSplitNumbers(ws: W[]): W[] {
  const out = [...ws];
  const partial = (t: string) => /,\d{1,2}$/.test(t);
  const tail = (t: string) => /^\d{1,2}$/.test(t);
  for (const a of out) {
    if (!partial(a.t)) continue;
    const b = out.find(
      (x) => x !== a && tail(x.t) && x.y > a.y && x.y - a.y < 12 && x.x0 < a.x1 && x.x1 > a.x0,
    );
    if (!b) continue;
    a.t += b.t;
    // ⚠ **つないだ数字は2つの断片の「中点」に置く** — 上の断片の y のままだと、その事業の
    //   ほかの金額（別の行にある）と同じ行にまとまらず、結局4個のまま落ちる。
    //   実測: `141,84`(y=501.8) と `8`(y=513.0) の中点 507.4 は、同じ事業の `5,788` の y と一致する。
    a.y = (a.y + b.y) / 2;
    b.t = ""; // 使い切ったので消す（下の行の金額として二重に数えない）
  }
  return out.filter((w) => w.t !== "");
}

function rowsOf(ws: W[], tol = 3): W[][] {
  const sorted = [...ws].sort((a, b) => a.y - b.y || a.x0 - b.x0);
  const out: W[][] = [];
  for (const w of sorted) {
    const last = out[out.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) <= tol) last.push(w);
    else out.push([w]);
  }
  for (const r of out) r.sort((a, b) => a.x0 - b.x0);
  return out;
}

/**
 * 金額6つを**並び順**で割り当てる（R8事業費 / R8市債+一財 / R7事業費 / R7市債+一財 / 増減 ×2）。
 *
 * ⚠⚠ **列の x を固定してはいけない** — 表の左右位置は**ファイルごとに違う**（実測。市民局で
 * 測った右端 250/301/351/402/452/502 は、脱炭素局のファイルでは3・4列目にしか当たらず、
 * **R8 の値を R7 として読んでいた**。Σ=計 のゲートが捕まえたが、ゲートが無ければ画面まで通っていた）。
 * → **計画書頁の列を除いた数字を、左から順に6つ**取る。
 * ⚠ **見出しの左端を境界にしてはいけない** — 金額は右寄せなので、**桁の多い数字は見出しより
 *   左へはみ出す**（`3,619,120` が落ちて「5個」で throw した＝実測）。**除くのは頁の列だけ**。
 * ⚠ 負号 `△`/`▲` は**別トークン**なので直前を見る。
 * **6個でないときは throw せずそのまま返す** — 判断は呼び出し側（名前があるかで意味が変わる）。
 */
function amountsOf(row: W[], pageColRight: number): { vals: (number | null)[]; used: Set<W> } {
  const vals: (number | null)[] = [];
  const used = new Set<W>();
  for (let i = 0; i < row.length; i++) {
    const w = row[i]!;
    if (w.x1 <= pageColRight) continue; // 計画書頁の列だけ除く
    // ⚠ **`-`（該当なし）も1つの値** — 財政局 2款9項2目「資産活用推進基金積立金」は
    //   一財+市債の列が `-` で、数えないと金額が4個になって**事業ごと落ちる**（差 7,567）。
    if (/^[-‐－—―−]$/.test(w.t)) {
      vals.push(null);
      used.add(w);
      continue;
    }
    const v = num(w.t);
    if (v == null) continue;
    const prev = row[i - 1];
    const neg = prev && /^[△▲]$/.test(prev.t) && w.x0 - prev.x1 < 14;
    vals.push(neg ? -v : v);
    used.add(w);
    if (neg && prev) used.add(prev);
  }
  return { vals, used };
}

interface Head {
  bureau: string;
  kanNo: string;
  koNo: string | null;
  mokuNo: string | null;
  accountName: string;
}

/** 目次ページの見出し `[局名] ３款 １項 １目`。項目が無い款（公債費）・会計名つきの型もある */
function parseHead(text: string): Head | null {
  // ⚠⚠ **ページ全体から拾ってはいけない** — 会計名の正規表現が事業名を拾って
  //   `都市計画課会計` `その他会計事務費（会計` のような会計が20種も生まれた（実測）。
  //   見出しは `[局名] N款N項N目 …（単位：千円）` の**1行**なので、その行だけを見る。
  // ⚠ 見出しの行は「款がある」か「会計名だけ」のどちらか（特別会計は後者）
  const line = han(text)
    .split("\n")
    .find((l) => /\[[^\]]{2,20}\]/.test(l) && (/\d+\s*款/.test(l) || /会計/.test(l)));
  if (!line) return null;
  const bureau = /\[\s*([^\]]{2,20}?)\s*\]/.exec(line)?.[1]?.replace(/[\s　]+/g, "");
  if (!bureau) return null;
  const h = line;
  const m = /(\d+)\s*款(?:\s*(\d+)\s*項)?(?:\s*([\d・]+)\s*目)?/.exec(h);
  // ⚠⚠ **款項目を持たない見出しがある** — 特別会計は `[財政局] 市債金会計` のように
  //   会計名だけを印字する（実測 0056 p.77・p.84）。null を返すと**直前の目の続き**として
  //   扱われ、市債金会計の 4,758億 が一般会計の款20（予備費・実際は10億）に流れ込んだ。
  //   → **会計名だけの見出しも「新しい節の始まり」として受ける**（款は不明なので "0"）。
  if (!m) {
    const accOnly = /([^\s\]０-９0-9]{2,12}会計)/.exec(h)?.[1];
    if (!accOnly) return null;
    return { bureau, kanNo: "0", koNo: null, mokuNo: null, accountName: accOnly };
  }
  // ⚠ **目次ページには会計名が無いのが普通**（一般会計）。特別会計は見出しに会計名が出る。
  //   一般会計の1款（議会費）と特会の1款が**番号で衝突する**ので、会計名は必ず持つ
  const acc = /([^\s\]０-９0-9]{2,12}会計)/.exec(h)?.[1] ?? "一般会計";
  return { bureau, kanNo: m[1]!, koNo: m[2] ?? null, mokuNo: m[3] ?? null, accountName: acc };
}

export function parseYokohamaJigyouKeikaku(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetProjectsDoc {
  const facts: BudgetProjectLine[] = [];
  const totals: BudgetProjectsDoc["totals"] = [];

  for (const f of files) {
    const texts = layoutPages(f.path);
    const byPage = pageWords(f.path);

    let head: Head | null = null;
    let group: BudgetProjectLine[] = [];
    /** 計画書頁の欄が空だった行（枠見出しの候補。実在の事業もここに入る） */
    const noPage = new WeakSet<BudgetProjectLine>();
    /** 列の位置は**目次の開始ページ**で決めて、見出しの無い継続ページへ引き継ぐ */
    let cols: { numLeft: number; nameLeft: number; headY: number } | null = null;

    /** 目のグループを「計」で閉じる。**Σ事業 = 計** がこの資料の一次ゲート */
    const closeGroup = (tot: (number | null)[], page: number) => {
      if (!head) return;
      const label = `[${head.bureau}] ${head.kanNo}款${head.koNo ?? "-"}項${head.mokuNo ?? "-"}目`;
      let use = group;
      let sum = use.reduce((a, x) => a + x.amount, 0);
      // ★ **「計」を権威にして枠見出しを外す** — 超過分とちょうど同じ額の「頁なし行」があれば
      //   それが枠見出し（配下の合計）。**照合で外れたときだけ落とす**ので、
      //   実在の事業（職員人件費・委員報酬）を取りこぼさない。
      if (tot[0] != null && sum > tot[0]) {
        const over = sum - tot[0];
        const heading = use.find((x) => noPage.has(x) && x.amount === over);
        if (heading) {
          use = use.filter((x) => x !== heading);
          sum = use.reduce((a, x) => a + x.amount, 0);
        }
      }
      const sumPrev = use.reduce((a, x) => a + (x.prevAmount ?? 0), 0);
      if (tot[0] != null && sum !== tot[0]) {
        throw new Error(
          `${f.filename} p.${page} ${label}: Σ事業費 ${sum.toLocaleString()} が「計」` +
            `${tot[0].toLocaleString()} と一致しません（差 ${(sum - tot[0]).toLocaleString()}・${use.length}事業）` +
            `\n  取れた頁: ${use.map((x) => x.page ?? "?").join(",")}`,
        );
      }
      // ⚠⚠ **前年度は等号で張れない**（#192 で横浜の説明書に対して得たのと同じ結論）。
      //   当年度に廃止された事業は**行として印字されない目がある**のに、「計」の前年度には
      //   その額が残る（実測 教育委員会 17款7項4目 は Σ13,882,567 に対し計 13,990,906＝差 108,339。
      //   その額のトークンはページ上に1つも無い）。**当年度は全目で厳密に一致する**ので、
      //   前年度だけ `≦` にする。**超えたら二重計上**なので、そちらは落とす。
      if (tot[2] != null && sumPrev > tot[2]) {
        throw new Error(
          `${f.filename} p.${page} ${label}: Σ前年度 ${sumPrev.toLocaleString()} が「計」` +
            `${tot[2].toLocaleString()} を**超えています**（差 +${(sumPrev - tot[2]).toLocaleString()}）＝二重計上`,
        );
      }
      totals.push({
        accountName: head.accountName,
        kanNo: head.kanNo,
        koNo: head.koNo,
        mokuNo: head.mokuNo,
        bureau: head.bureau,
        amount: tot[0] ?? sum,
        prevAmount: tot[2] ?? null,
        locator: { file: f.filename, page },
      });
      facts.push(...use);
      group = [];
    };

    for (let p = 1; p <= texts.length; p++) {
      const text = texts[p - 1] ?? "";
      // ⚠⚠ **目次ページは「除外」ではなく「積極的な特徴」で同定する。**
      //   `（単位：千円）を含み歳出予算科目を含まない` で切ったら、**詳細シートの継続ページ**が
      //   目次として通った（`歳出予算科目` はシートの1ページ目にしか無い）。その結果、
      //   細事業の数字が事業として積まれ、27事業が別の目に混ざった（実測 健康福祉局 7款2項1目）。
      //   → **`市債+一財` の列見出しは目次にしか無い**ので、これを鍵にする。
      const ws = byPage.get(p) ?? [];
      if (ws.length === 0) continue;
      // ⚠⚠ **目次と詳細シートはどちらも複数ページに渡る。** 見分け方を2回間違えた（実測）:
      //   ① `（単位：千円）を含み歳出予算科目を含まない` → **詳細シートの継続ページ**が通った
      //      （`歳出予算科目` はシートの1ページ目にしか無い）。細事業の数字が事業として積まれた
      //   ② `（単位：千円）` を必須にした → **目次の継続ページ**が落ちた（継続ページには
      //      `（単位：千円）` も `[局名] 款項目` も無い。健康福祉局 7款2項1目 は p.79 で
      //      27事業目までしか無く、続きと「計」は p.80 にある）
      //   → **列見出し（`事業費`×2 + `市債+一財`×2）があれば目次のページ**（開始・継続を問わず）。
      const isDetail = /歳出予算科目|細事業|事業局課|本資料は/.test(text);
      if (isDetail) continue;

      // ⚠⚠ **列の x はファイルごとに違う**ので、**見出し行から毎ページ導出する**
      //   （固定値にしたら別の局のファイルで名前も金額も取りこぼした＝実測）。
      // ⚠⚠ **列見出しの語は局によって違う** — `市債+一財` と **`一財+市債`（逆順）** の
      //   両方が使われている（実測: こども青少年局・港湾局・財政局は逆順で、
      //   `市債+一財` だけを見ていたため**3ファイル・款6/15/18/20 がまるごと0件だった**）。
      //   ⚠ こども青少年局と財政局は `事業費` の見出しも別の書き方なので、**財源列の語だけを鍵にする**。
      const isMoneyHdr = (t: string) => /^(市債\+一財|一財\+市債)$/.test(t);
      const hdr = rowsOf(ws).find((r) => r.filter((w) => isMoneyHdr(w.t)).length >= 2);
      // ⚠⚠ **目次の継続ページは「列見出しがあるとき」と「無いとき」の両方がある**（実測）:
      //   健康福祉局 p.80 は見出しあり、p.198 は見出しも `（単位：千円）` も `[局名]` も無く
      //   「計」の行だけ。**見出し必須にすると後者が落ちて、目が閉じないまま次の目が始まる**。
      //   → **目が開いているあいだは、詳細シートの印が無いページを継続とみなす**（列は引き継ぐ）。
      //   安全弁は Σ事業 = 計 のゲートで、取りこぼせば必ず差が出る。
      if (!hdr && (!head || group.length === 0)) continue;
      if (hdr) {
        // 計画書頁の列は `計画` / `書頁` のラベルの真下にある。
        // ⚠ **ラベルの右端ちょうどで切ると値がはみ出す** — 健康福祉局 p.23 の `10` は右端 63.5 で、
        //   ラベル `計画` の右端 63.4 を **0.1pt** 超えて金額として数えられた（実測）。
        //   名前の左端はラベルよりさらに右（同ページで 68.1）なので、**2pt の許容で両立する**。
        const labelRight = Math.max(
          ...ws.filter((w) => /^(計画|書頁|計画書頁|頁)$/.test(w.t)).map((w) => w.x1),
          0,
        );
        cols = {
          numLeft: Math.min(...hdr.filter((w) => /^(事業費|市債\+一財|一財\+市債)$/.test(w.t)).map((w) => w.x0)) - 6,
          // ⚠ **継続ページにはラベルが無い**ので、開始ページの値を引き継ぐ（引き継がないと
          //   フォールバック 90 になり、頁の値 `18` を金額として数えて「7個」で落ちる＝実測 p.198）
          nameLeft: labelRight > 0 ? labelRight + 2 : 90,
          headY: hdr[0]!.y,
        };
      }
      if (!cols) continue;
      const numLeft = cols.numLeft;
      const nameLeft = cols.nameLeft;
      // 継続ページには見出しが無いので、そのページは上端から読む
      const headY = hdr ? cols.headY : 0;

      const h = parseHead(text);
      // ⚠⚠ **継続ページが同じ見出しを繰り返す型がある**（実測 建築局 11款1項1目 は p.1・p.2 とも
      //   `[建築局] 11 款１項１目 建築行政総務費` を印字し、「計」は p.2 にある）。
      //   見出しが在るだけで「次の目」とみなすと、**同じ目の途中で throw する**。
      //   → **見出しが前と変わったときだけ**新しい目とみなす。
      const isNew =
        !!h &&
        (!head ||
          h.kanNo !== head.kanNo ||
          h.koNo !== head.koNo ||
          h.mokuNo !== head.mokuNo ||
          h.accountName !== head.accountName);
      // ⚠ **新しい目が始まるのに前の目が「計」で閉じていないのは異常**（取りこぼしか、
      //   目の合計を課の小計と取り違えている）。黙って次へ行くと事業が別の目に混ざる
      if (isNew && group.length > 0 && head) {
        throw new Error(
          `${f.filename} p.${p}: 前の目 [${head.bureau}] ${head.kanNo}款${head.koNo ?? "-"}項${head.mokuNo ?? "-"}目 が` +
            `「計」で閉じないまま次の目が始まりました（${group.length}事業が宙に浮いています）`,
        );
      }
      if (isNew && h) head = h;
      if (!head) continue;
      const hd = head;
      for (const row of rowsOf(joinSplitNumbers(ws))) {
        const yThis = row[0]!.y;
        // ⚠ **見出しより上の行は見ない** — `[医療局] ８款１項１目（単位：千円）` の
        //   款項目の数字を金額として拾ってしまう（実測）
        if (yThis <= headY) continue;
        const { vals: amts, used: amtTokens } = amountsOf(row, nameLeft);
        if (amts.length === 0) continue; // 金額行でない
        // 事業名は**この金額行と同じ帯**（上下に折返す型があるので ±14pt で拾う）。
        // ⚠ **名前の窓の中の数字を除いてはいけない** — `GREEN×EXPO 2027中小企業出展支援事業` の
        //   `2027` が名前から静かに落ちた（実測）。窓で既に金額と分かれているので除外は不要
        //   （§9c の「文字クラスで広げる」の逆で、**窓があるなら中身を選り好みしない**）
        // ⚠ **名前の右端を numLeft で切ってはいけない** — 長い事業名は数値列へはみ出す
        //   （`学校特別営繕費（枠的公共）` が丸ごと落ちて「名前がありません」で throw した＝実測）。
        //   → **金額として使わなかったトークン**を名前とする（除外の基準を x から「使ったか」へ）。
        // ⚠⚠ 名前の窓に入ってはいけないものが2つある（実測）:
        //   ①**新規・拡充の印 `○`**（右端の列）→ `○中学校給食事業費` になった
        //   ②**見出しの文字**（`19款１項１目`）→ 1行目の事業で `19款１項１目国民健康保険…` になった。
        //     行そのものは headY で弾いているが、**名前の窓（±14pt）は見出しへ届く**
        const nameRight = Math.max(...ws.map((w) => w.x1)) - COL.kubunFromRight;
        const name = ws
          .filter(
            (w) =>
              !amtTokens.has(w) &&
              num(w.t) === null &&
              w.y > headY &&
              w.x0 < nameRight &&
              Math.abs(w.y - yThis) <= 14,
          )
          .sort((a, b) => a.y - b.y || a.x0 - b.x0)
          .map((w) => w.t)
          .join("")
          .replace(/[\s　]+/g, "");
        // ⚠⚠ **様式は空行を印字する** — 事業が無い枠は名前が空で、増減の列だけ `0 0` が入る
        //   （実測 選挙管理委員会事務局 2款14項1目 で8行）。**空行は落とす**。
        //   ⚠ ただし**金額が揃っているのに名前が無い**のは抽出の失敗なので throw する
        //   （この2つを混ぜると取りこぼしが静かに消える＝杉並 #163 と同じ判断）。
        // ⚠⚠ **金額が6個に満たない行は事業行ではない**（様式が印字する空行や、事業名の
        //   折返しに数字が混じった行 `GREEN×EXPO 2027`）。**落とす**。
        //   ⚠ **落として良い根拠は Σ=計 のゲート** — 本物の事業行を落とせば必ず差が出て throw する。
        //   ゲートが無ければこの判断は危険（取りこぼしが静かに消える）。
        // ⚠⚠ **「計」には2種類ある** — 目の合計（名前がちょうど `計`）と、**課ごとの小計**
        //   （`（福祉保健課計）`）。小計を目の計と誤認すると**そこでグループを閉じてしまい**、
        //   以降の事業が次のグループに落ちて「Σ 0 が 計 9,524,955 と一致しません」になる（実測）。
        //   ⚠ トークンの並び順は折返しで崩れる（`計）（福祉保健課`）ので、**括弧と空白を落として**判定する。
        // ⚠⚠ **「計」の判定に名前の窓（±14pt）を使ってはいけない** — 直上の事業名の折返しを
        //   巻き込んで `〜事業計` になり、**目の合計が事業として扱われてグループが閉じない**
        //   （実測 教育委員会 0214 は50事業が宙に浮いた）。**行そのもののトークン**で見る。
        const flat = name.replace(/[（）()\s　]/g, "");
        //   ⚠ ただし**トークン1個で見るのも駄目** — 課の小計 `（福祉保健課計）` にも `計` の
        //   トークンがあり、目の合計と区別できない。**その行の名前欄の文字だけ**を連結して見る。
        //   ⚠ **左端も制限しない** — 頁番号の無い行では事業名が頁の列より左から始まる
        //     （`学校特別営繕費（枠的公共）` は x0=67.6 でラベル右端 71 より左＝実測）。
        //     頁の列に入るのは数字か `-` だけなので、**数字を除けば左端の制限は要らない**。
        const rowName = row
          .filter((w) => !amtTokens.has(w) && num(w.t) === null)
          .map((w) => w.t)
          .join("")
          .replace(/[（）()\s　]/g, "");
        const isTotalRow = rowName === "計";
        if (isTotalRow) {
          if (amts.length !== 6) {
            throw new Error(`${f.filename} p.${p}: 目の「計」の金額が ${amts.length} 個です（期待 6）`);
          }
          closeGroup(amts, p);
          continue;
        }
        // ⚠⚠ **課の小計の判定を緩くすると正当な事業名を巻き込む** — `計.*課$` は
        //   `会計年度任用職員雇用経費（港湾管財課）` に当たり、**事業が丸ごと消えた**（差 3,753）。
        //   小計の原文は `（○○課計）` なので、**括弧を残したまま**判定する
        //   （折返しで語順が崩れた `計）（福祉保健課` は先頭の `計）` で拾う）。
        if (/課計/.test(name) || /^計）/.test(name)) continue;
        // ⚠⚠ **枠（グループ）の見出し行がある** — `学校特別営繕費（枠的公共）` は配下の事業の
        //   合計を持つ行で、**そのまま事業として数えると二重計上**になる（実測 +15,313,643）。
        //   見分けは**計画書頁の欄が無いこと**（事業には番号か `-`＝廃止 が必ず入る）。
        const hasPageCell = row.some(
          (w) => w.x1 <= nameLeft && (num(w.t) !== null || /^[-‐－—―−]$/.test(w.t)),
        );
        //   ⚠⚠ **頁の欄が空の行には3種類ある**（実測。見た目では区別できない）:
        //     ①枠見出し（`学校特別営繕費（枠的公共）`＝配下の事業の合計。**二重計上になる**）
        //     ②廃止事業（`0 0 10,000 10,000 △10,000 △10,000`＝当年度0・実在の事業）
        //     ③頁を持たない実在の事業（`職員人件費` `人事委員会委員報酬`）
        //     金額の形（当年度=前年度・増減0 など）では②③と①を分けられない
        //     （委員報酬は 13,128 = 13,128・増減0 で枠見出しと同じ形）。
        //     → **落とさず印だけ付けて、「計」との照合で外す**（下の closeGroup）。
        if (amts.length < 6) continue;
        if (amts.length > 6) {
          throw new Error(
            `${f.filename} p.${p} 「${name}」: 金額が ${amts.length} 個です（期待 6）: ` +
              row.map((w) => w.t).join(" "),
          );
        }
        if (!name) {
          throw new Error(
            `${f.filename} p.${p}: 金額が6個そろっているのに事業名がありません: ${row.map((w) => w.t).join(" ")}`,
          );
        }
        const pageCell = row.find((w) => w.x1 <= nameLeft + 2);
        const pageRight = Math.max(...ws.map((w) => w.x1));
        const marked = ws.some(
          (w) => w.x0 >= pageRight - COL.kubunFromRight && Math.abs(w.y - yThis) <= 8 && /[○〇◎]/.test(w.t),
        );
        const line: BudgetProjectLine = {
          accountName: hd.accountName,
          kanNo: hd.kanNo,
          koNo: hd.koNo,
          mokuNo: hd.mokuNo,
          bureau: hd.bureau,
          name,
          amount: amts[0] ?? 0,
          shisaiIppan: amts[1],
          prevAmount: amts[2],
          prevShisaiIppan: amts[3],
          // ⚠ 原典は新規と拡充を**同じ1列**で丸印だけ付ける（どちらかは詳細シートにしか無い）。
          //   区別できないものを区別したように書かないため、印の有無だけを持つ
          kubun: marked ? "新規・拡充" : null,
          page: pageCell?.t ?? null,
          locator: { file: f.filename, page: p },
        };
        if (!hasPageCell) noPage.add(line);
        group.push(line);
      }
    }
    if (group.length > 0) {
      throw new Error(`${f.filename}: 「計」で閉じていない事業が ${group.length} 件あります（最後の目の「計」が取れていない）`);
    }
  }

  if (facts.length === 0) throw new Error(`${source.id}: 事業を1件も抽出できませんでした`);

  return {
    docType: "budget-projects",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    totals,
    facts,
  };
}
