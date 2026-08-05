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

/**
 * 詳細シートの `事業名称`。⚠ **行をまたいで折返す**（実測 0056 p.55 は
 * `事業名称 一般会計 第三セクター等改革推進債公債費 公債` / 次行 `諸費`）。
 * 1行しか読まないと名前が切れて**目次との照合が外れ、目が付かない**（18款2項3目 の 433 が
 * 目に割り当たらなかった）。**次の行が短くラベルでなければ続きとみなす**。
 */
function detailName(h: string): string {
  const lines = h.split("\n");
  const i = lines.findIndex((l) => /事業名称\s+\S/.test(l));
  if (i < 0) return "";
  let nm = /事業名称\s+(.+?)\s*$/.exec(lines[i]!)?.[1] ?? "";
  for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
    const l = lines[j]!.trim();
    // 続きの行は**短く・ラベルを含まない**。ラベル行に当たったら止める
    if (!l || l.length > 24 || /（単位|区\s*分|金\s*額|事業概要|歳出|予算|決算|財\s*源/.test(l)) break;
    nm += l;
  }
  return nm.replace(/[\s　]+/g, "");
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
  //   一般会計の1款（議会費）と特会の1款が**番号で衝突する**ので、会計名は必ず持つ。
  // ⚠⚠ **会計名を探すのは款より「前」だけ** — 目の名前に会計名が入ることがあり
  //   （`[財政局] 19款1項15目 水道事業会計繰出金`）、行全体から拾うと**一般会計の繰出金が
  //   特別会計に分類されて丸ごと消える**（款19 諸支出金が 12,173,415千円 足りなかった）。
  //   繰出金の会計名は**支出先**であって、その歳出が属する会計ではない。
  const beforeKan = h.slice(0, m.index);
  const acc = /([^\s\]０-９0-9]{2,12}会計)/.exec(beforeKan)?.[1] ?? "一般会計";
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

    // ⚠⚠ **目次の見出しには会計名が無いことがある** — 特別会計のファイルでも
    //   `[経済局] １款１項１目` としか書かず、素で読むと**一般会計の議会費に化ける**
    //   （全329本に広げて発覚。62本の最小集合では表に出なかった）。
    //   → **詳細シートの `歳出予算科目 <会計名> N款N項N目` から会計を引く**。
    //     ここは会計名が必ず明記されている唯一の場所。
    const accountOf = new Map<string, string>();
    for (const t of texts) {
      for (const m of han(t).matchAll(
        /歳出予算科目\s*(\S+?会計[^\s\d]*)\s*(\d+)\s*款\s*(\d+)\s*項\s*(\d+)\s*目/g,
      )) {
        accountOf.set(`${Number(m[2])}-${Number(m[3])}-${Number(m[4])}`, m[1]!);
      }
    }
    // ⚠ **見出しが項・目を持たない目次がある**（`[経済局] １款 ２項`）ので、
    //   款項目のキーでは引けない。→ **そのファイルで最も多い会計**を既定にする
    //   （1ファイル＝1会計が原則。これを入れないと中央卸売市場費会計が一般会計の
    //   議会費に化けて +1,321,124 になった＝実測）。
    const accCount = new Map<string, number>();
    for (const a of accountOf.values()) accCount.set(a, (accCount.get(a) ?? 0) + 1);
    const fileAccount = [...accCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "一般会計";

    let head: Head | null = null;
    let group: BudgetProjectLine[] = [];
    /** 計画書頁の欄が空だった行（枠見出しの候補。実在の事業もここに入る） */
    const noPage = new WeakSet<BudgetProjectLine>();
    /** 列の位置は**目次の開始ページ**で決めて、見出しの無い継続ページへ引き継ぐ */
    let cols: { numLeft: number; nameLeft: number; headY: number } | null = null;

    /** 目のグループを「計」で閉じる。**Σ事業 = 計** がこの資料の一次ゲート */
    /** 「計」を記録するときの会計名（目次に無ければ詳細シートから引く） */
    let headAcc: () => string = () => "一般会計";
    const closeGroup = (tot: (number | null)[], page: number) => {
      if (!head) return;
      // ⚠⚠ **一般会計以外はゲートの対象から外す**（2026-08-06）。全329本に広げると
      //   特別会計・企業会計のファイルが入り、**様式の変種の尾が延々と続く**（会計名が
      //   局名に埋まっている `[港湾局埋立事業会計]`、款項目を持たない見出し、等）。
      //   このソースの scope は**一般会計**で、収録しないものの版面に付き合う理由が無い。
      //   ⚠ 落とすのは「ゲートと収録」だけで、**会計の判別自体はしている**（黙って
      //     一般会計に混ぜない）。
      if (headAcc() !== "一般会計") {
        group = [];
        return;
      }
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
        accountName: headAcc(),
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
      // ⚠ 1ページに目次ブロックが複数あるとき、**2つ目以降は自分の見出しより下だけ**を見る
      //   （そうしないと2つ目のブロックの列見出しが名前に丸ごと入る＝実測）
      let headY = hdr ? cols.headY : 0;

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
      // 見出しが会計名を書いていない場合だけ、詳細シート由来の対応表で補う
      headAcc = () =>
        head!.accountName !== "一般会計"
          ? head!.accountName
          : accountOf.get(`${Number(head!.kanNo)}-${Number(head!.koNo)}-${Number(head!.mokuNo)}`) ??
            fileAccount;
      const hd: Head =
        head.accountName !== "一般会計"
          ? head
          : {
              ...head,
              accountName:
                accountOf.get(`${Number(head.kanNo)}-${Number(head.koNo)}-${Number(head.mokuNo)}`) ??
                fileAccount,
            };
      // ⚠⚠ **名前の窓を固定の ±14pt にしてはいけない**（レビューで発覚）。行ピッチが詰まった
      //   目次（教育委員会 0214）では**隣の行の折返し断片を巻き込み**、4行を超える折返しでは
      //   **窓の外の行を落とす**。実測で 42件の事業名が壊れ、`推進事業グローバル教育推進事業
      //   グローバル人材育成に` のような名前が**そのまま画面に出ていた**。
      //   ⚠ 金額は全件正しく Σ=計 も款/目の突合も全緑なので、**ゲートは何も言わない**。
      //   → **隣り合う金額行の中間**を境界にする（行ピッチに追随する）。
      const allRows = rowsOf(joinSplitNumbers(ws));
      const dataYs = allRows
        .filter((r) => amountsOf(r, cols!.nameLeft).vals.length >= 6)
        .map((r) => r[0]!.y);
      const bandOf = (y: number): [number, number] => {
        const i = dataYs.indexOf(y);
        const prev = i > 0 ? dataYs[i - 1]! : headY;
        const next = i >= 0 && i < dataYs.length - 1 ? dataYs[i + 1]! : y + (y - prev);
        return [(prev + y) / 2, (y + next) / 2];
      };
      for (const row of allRows) {
        const yThis = row[0]!.y;
        // ⚠⚠ **1ページに目次ブロックが2つ以上あることがある**（実測 都市整備局 2026_01_19.pdf は
        //   `19款1項10目` と `19款1項17目` が同じページに並ぶ）。ページ単位で見出しを1つだけ
        //   読むと、**後半のブロックの事業が前半の目に入る**（126,468 が 10目 と 17目 で
        //   ずれた）。→ **行ごとに見出しを検出して切り替える**。
        // ⚠ **見出しが2行に割れることがある**（`19款1項17目…` と `[都市整備局]（単位：千円）` が
        //   別の y。実測 2026_01_19.pdf）。行単位で見ると見出しと認識できず、
        //   **2つ目のブロックの事業が1つ目の目に入る**（126,468 が 10目 と 17目 でずれた）。
        //   → 見出しの判定だけ**近傍（±8pt）の語を合わせて**行う。
        const rowText = ws
          .filter((w) => Math.abs(w.y - yThis) <= 8)
          .sort((a, b) => a.y - b.y || a.x0 - b.x0)
          .map((w) => w.t)
          .join("");
        if (/\[[^\]]{2,20}\]/.test(rowText) && /\d+\s*款/.test(han(rowText))) {
          const h2 = parseHead(rowText);
          // ⚠ 継続ページは**同じ見出しを繰り返す**ので、変わったときだけ切り替える
          const changed =
            !!h2 &&
            (!head ||
              h2.kanNo !== head.kanNo ||
              h2.koNo !== head.koNo ||
              h2.mokuNo !== head.mokuNo ||
              h2.accountName !== head.accountName);
          if (h2 && changed) {
            // ⚠ 見出しの直下には列見出し（`事業費` `市債+一財` …）が2〜3行あり、
            //   これを名前から外さないと**丸ごと事業名に入る**（実測）。
            //   固定の pt では足りないので、**次の列見出し行の y** を基準にする。
            const nextHdr = allRows.find(
              (r) => r[0]!.y > yThis && r.filter((w) => isMoneyHdr(w.t)).length >= 2,
            );
            headY = nextHdr ? nextHdr[0]!.y : yThis + 30;
            if (group.length > 0) {
              throw new Error(
                `${f.filename} p.${p}: 目次ブロックが「計」で閉じないまま次の見出しが来ました（${group.length}事業）`,
              );
            }
            head = h2;
            continue;
          }
        }
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
        const band = bandOf(yThis);
        const name = ws
          .filter(
            (w) =>
              !amtTokens.has(w) &&
              num(w.t) === null &&
              // ⚠ **計画書頁の `-`（廃止事業）が名前に混ざる** — `横浜市生活交通バス路-線維持…`
              //   `市街地開発事業費会計-繰出金` になり、**詳細シートとの名前照合が外れて
              //   目が直らない**（19-1-10 と 19-1-17 が 126,468 ずれた＝実測）
              !/^[-‐－—―−]$/.test(w.t) &&
              // ⚠ 見出しの款項目が名前に混ざる（継続ページは headY が 0 なので y だけでは弾けない）
              !/\d+\s*款/.test(w.t) &&
              w.y > headY &&
              w.x0 < nameRight &&
              w.y > band[0] &&
              w.y < band[1],
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
        // ⚠ **ファイル末尾に `事業費 合計` の総計行がある**（実測 経済局 0163。
        //   `（令和７年度終了事業）` という別ブロックの後に置かれる）。事業として数えない
        if (/合計$/.test(rowName)) continue;
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
        // ⚠⚠ **`hd` はページ単位で1回しか計算されない** — 行途中で見出しが切り替わっても
        //   反映されず、**2つ目のブロックの事業が1つ目の目に入る**（126,468 が 10目 のまま。
        //   `totals` は正しく 17目 で閉じているのに fact だけずれる＝実測）。
        //   → **その行の時点の `head`** を使う。
        const cur = head!;
        const curAcc =
          cur.accountName !== "一般会計"
            ? cur.accountName
            : accountOf.get(`${Number(cur.kanNo)}-${Number(cur.koNo)}-${Number(cur.mokuNo)}`) ?? fileAccount;
        const line: BudgetProjectLine = {
          accountName: curAcc,
          kanNo: cur.kanNo,
          koNo: cur.koNo,
          mokuNo: cur.mokuNo,
          bureau: cur.bureau,
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
    if (group.length > 0 && headAcc() === "一般会計") {
      throw new Error(`${f.filename}: 「計」で閉じていない事業が ${group.length} 件あります（最後の目の「計」が取れていない）`);
    }
    group = [];
  }

  // ---- 目次が項・目を書かない款の「目」を詳細シートから埋める -------------------
  // ⚠⚠ **目次の見出しが款どまりのことがある**（`[財政局] 18款 公債費`）。そのままだと
  //   事業に項・目が付かず、**款の合計は合うのに目のレベルでは全部ゼロ**になる
  //   （款18 公債費の 177,285,013 が 6つの目に1円も割り当たらなかった＝実測）。
  //   #192 で学んだ「総和のゲートは局所の間違いを隠す」型そのもの。
  //   → **詳細シートの `歳出予算科目 … N款N項N目` と `事業名称` の対応表**で埋める。
  {
    /** 事業名 → 目。⚠ **一意でない名前は `null`**（衝突を使うと正しい目まで壊す） */
    const mokuOf = new Map<string, { ko: string; moku: string } | null>();
    /**
     * 事業名 → 新規/拡充。⚠ **目次の丸印は新規と拡充を区別しない**ので、
     * 一律「拡充」と書くと**原典より強い主張**になる（前年度0の事業まで拡充になる）。
     * 詳細シートには `■新規` / `■拡充` のチェックがあるのでそこから引く。
     */
    const kubunOf = new Map<string, string | null>();
    for (const f of files) {
      for (const text of layoutPages(f.path)) {
        const h = han(text);
        const m = /歳出予算科目\s*(\S+?)\s+(\d+)\s*款\s*(\d+)\s*項\s*(\d+)\s*目/.exec(h);
        if (!m) continue;
        const nm = detailName(h);
        if (!nm) continue;
        // ⚠⚠ **同じ事業名が複数の目にある**（`職員人件費` は款2 だけで多数）。
        //   衝突したまま使うと**正しく付いていた目まで書き換えて壊す**（実測。全件上書きに
        //   したら差のある目が 10 → 21 に増えた）。**款の中で一意な名前だけ**を使う。
        const val = { ko: String(Number(m[3])), moku: String(Number(m[4])) };
        // ⚠ **款だけの鍵では `職員人件費` のような名前が衝突する**。項まで含めた鍵も作り、
        //   引くときは**具体的な方を優先**する（監査の 2款13項 は項まで入れれば一意になり、
        //   原典が `1・2目` と合併して書いている目を事業ごとに正しく分けられる）。
        const kb = /■\s*新規/.test(h) ? "新規" : /■\s*拡充/.test(h) ? "拡充" : null;
        for (const key of [
          `${m[1]}\u0001${Number(m[2])}\u0001${nm}`,
          `${m[1]}\u0001${Number(m[2])}\u0001${Number(m[3])}\u0001${nm}`,
        ]) {
          const cur = mokuOf.get(key);
          if (cur === undefined) mokuOf.set(key, val);
          else if (cur && (cur.ko !== val.ko || cur.moku !== val.moku)) mokuOf.set(key, null);
          const ck = kubunOf.get(key);
          if (ck === undefined) kubunOf.set(key, kb);
          else if (ck !== kb) kubunOf.set(key, null);
        }
      }
    }
    // ⚠⚠ **見出しの目より詳細シートの目を優先する**（実測）。1つの目次ページに
    //   **複数の目の事業が並ぶ**ことがある（経済局 0158 p.1 は見出しが `19款1項5目` なのに、
    //   中央と畜場費(6目)・中央卸売市場費(5目)・勤労者福祉共済(8目) が同じ表に載る）。
    //   見出しは「そのページの先頭の目」でしかなく、行ごとの目ではない。
    //   詳細シートは**事業ごとに**科目を明記しているので、名前が一致したらそちらを採る。
    let filled = 0;
    for (const x of facts) {
      // 項まで一致する鍵を優先し、無ければ款だけの鍵にフォールバック
      const hit =
        (x.koNo != null
          ? mokuOf.get(`${x.accountName}\u0001${Number(x.kanNo)}\u0001${Number(x.koNo)}\u0001${x.name}`)
          : undefined) ?? mokuOf.get(`${x.accountName}\u0001${Number(x.kanNo)}\u0001${x.name}`);
      const kb =
        (x.koNo != null
          ? kubunOf.get(`${x.accountName}\u0001${Number(x.kanNo)}\u0001${Number(x.koNo)}\u0001${x.name}`)
          : undefined) ?? kubunOf.get(`${x.accountName}\u0001${Number(x.kanNo)}\u0001${x.name}`);
      // 目次の丸印がある事業だけ、詳細シートの新規/拡充で具体化する
      if (x.kubun && kb) x.kubun = kb;
      if (!hit) continue;
      if (x.koNo === hit.ko && x.mokuNo === hit.moku) continue;
      x.koNo = hit.ko;
      x.mokuNo = hit.moku;
      filled++;
    }
    void filled;
  }

  // ---- 目次に載らない目を詳細シートから補う -----------------------------------
  // ⚠⚠ **一部の目は目次に1行も載らず、詳細シートにしかない**（実測。経済局の
  //   19款1項6目「中央と畜場費会計繰出金」2,579,388 など。19-1-6/7/8 が該当し、
  //   諸支出金が 14,820,671千円 足りなかった）。**目次だけを読む設計では原理的に届かない**。
  //   → **目次が1件も持たない目だけ**を詳細シートから補う（両方から採ると二重計上になる）。
  // ⚠⚠ **目次側の目番号は「無い」ことも「`1・2` の合併」もある**ので、文字列キーでは突合できない
  //   （公債費は目次が項・目を持たず、素朴に照合したら**詳細シート由来が丸ごと二重計上**になり
  //   款18 がちょうど2倍になった。監査の `1・2目` も同型）。**含意で判定する**。
  const isCovered = (acc: string, kan: number, ko: number, moku: number): boolean =>
    totals.some((t) => {
      if (t.accountName !== acc || Number(t.kanNo) !== kan) return false;
      if (t.koNo == null) return true; // 項も目も持たない見出し（公債費）＝款まるごと
      if (Number(t.koNo) !== ko) return false;
      if (t.mokuNo == null) return true;
      return t.mokuNo.split("・").some((x) => Number(x) === moku);
    });
  const curLabel = `令和${Number(/\d+/.exec(source.fiscalYear)![0])}年度`;
  const prevLabel = `令和${Number(/\d+/.exec(source.fiscalYear)![0]) - 1}年度`;
  for (const f of files) {
    for (const [i, text] of layoutPages(f.path).entries()) {
      const h = han(text);
      const m = /歳出予算科目\s*(\S+?)\s+(\d+)\s*款\s*(\d+)\s*項\s*(\d+)\s*目/.exec(h);
      if (!m) continue;
      const [, acc, kanNo, koNo, mokuNo] = m;
      // 目次が持っている目は目次を正とする（詳細シートは廃止事業を持たないため）
      if (isCovered(acc!, Number(kanNo), Number(koNo), Number(mokuNo))) continue;
      if (acc !== "一般会計") continue;
      // ⚠ **事業名称は折返す**（実測 1,529シート中41件が2行）。ラベル行の続きも拾う
      const name = detailName(h);
      if (!name) continue;
      const amt = (label: string): number | null => {
        const r = new RegExp(`^\\s*${label}\\s+([\\d,]+)`, "m").exec(h);
        return r ? Number(r[1]!.replace(/,/g, "")) : null;
      };
      const cur = amt(curLabel);
      if (cur == null) continue;
      facts.push({
        accountName: acc!,
        kanNo: String(Number(kanNo)),
        koNo: String(Number(koNo)),
        mokuNo: String(Number(mokuNo)),
        bureau: /事業局課\s+(\S+)/.exec(h)?.[1] ?? "",
        name,
        amount: cur,
        shisaiIppan: null,
        prevAmount: amt(prevLabel),
        prevShisaiIppan: null,
        kubun: /■\s*(新規|拡充)/.test(h) ? "新規・拡充" : null,
        page: null,
        fromDetail: true,
        locator: { file: f.filename, page: i + 1 },
      });
    }
  }

  if (facts.length === 0) throw new Error(`${source.id}: 事業を1件も抽出できませんでした`);

  // ---- 重複を落とす -----------------------------------------------------------
  // ⚠⚠ **発行元は同じ事業を「款単位の一括」と「目単位の個別」の両方に載せる**（全329本）。
  //   人が「一般会計を1回ずつ含む最小集合」を選ぶ方式は**不完全になった**（偵察の62本には
  //   19款1項6・7・8目の見出しがどこにも無く、諸支出金が 14,820,671千円 足りなかった）。
  //   どのファイルがどの目を持つかは**開けるまで分からない**ので、全部入れて機械で解く。
  //
  // ⚠ **「同じ目が2ファイルに出る」には2種類ある**ので、目の単位で落としてはいけない:
  //   ①重複（一括と目別が同じ事業を載せる）→ **落とす**
  //   ②分割（複数の局・課が同じ目に事業を持つ）→ **足す**
  //   → **事業の単位**（会計・款項目・事業名・金額）で見れば、①は同じ行・②は違う行になる。
  const seen = new Set<string>();
  const uniq: BudgetProjectLine[] = [];
  for (const x of facts) {
    const k = [x.accountName, x.kanNo, x.koNo, x.mokuNo, x.name, x.amount, x.prevAmount].join("\u0001");
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(x);
  }
  // ⚠⚠ **目の「計」はファイル横断で合算してはいけない**（実測）。同じ目が複数ファイルに
  //   出るとき各ファイルの「計」は**そのファイルの分**で、合算すると 19款1項10目 が
  //   Σ事業 769,619 に対し「計」11,140,277 のような値になる。**ファイルごとに残す**
  //   （locator で区別でき、照合もファイル単位でできる）。

  return {
    docType: "budget-projects",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    totals,
    facts: uniq,
  };
}
