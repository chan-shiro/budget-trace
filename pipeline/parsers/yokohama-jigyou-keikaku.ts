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

const num = (s: string): number | null => {
  const v = s.replace(/[,\s]/g, "");
  return /^\d+$/.test(v) ? Number(v) : null;
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
function amountsOf(row: W[], pageColRight: number): (number | null)[] {
  const vals: number[] = [];
  for (let i = 0; i < row.length; i++) {
    const w = row[i]!;
    if (w.x1 <= pageColRight) continue; // 計画書頁の列だけ除く
    const v = num(w.t);
    if (v == null) continue;
    const prev = row[i - 1];
    const neg = prev && /^[△▲]$/.test(prev.t) && w.x0 - prev.x1 < 14;
    vals.push(neg ? -v : v);
  }
  return vals;
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
  const bureau = /\[\s*([^\]]{2,20}?)\s*\]/.exec(text)?.[1]?.replace(/[\s　]+/g, "");
  if (!bureau) return null;
  const h = han(text);
  const m = /(\d+)\s*款(?:\s*(\d+)\s*項)?(?:\s*([\d・]+)\s*目)?/.exec(h);
  if (!m) return null;
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
    /** 列の位置は**目次の開始ページ**で決めて、見出しの無い継続ページへ引き継ぐ */
    let cols: { numLeft: number; nameLeft: number; headY: number } | null = null;

    /** 目のグループを「計」で閉じる。**Σ事業 = 計** がこの資料の一次ゲート */
    const closeGroup = (tot: (number | null)[], page: number) => {
      if (!head) return;
      const label = `[${head.bureau}] ${head.kanNo}款${head.koNo ?? "-"}項${head.mokuNo ?? "-"}目`;
      const sum = group.reduce((a, x) => a + x.amount, 0);
      const sumPrev = group.reduce((a, x) => a + (x.prevAmount ?? 0), 0);
      if (tot[0] != null && sum !== tot[0]) {
        throw new Error(
          `${f.filename} p.${page} ${label}: Σ事業費 ${sum.toLocaleString()} が「計」` +
            `${tot[0].toLocaleString()} と一致しません（差 ${(sum - tot[0]).toLocaleString()}・${group.length}事業）`,
        );
      }
      if (tot[2] != null && sumPrev !== tot[2]) {
        throw new Error(
          `${f.filename} p.${page} ${label}: Σ前年度 ${sumPrev.toLocaleString()} が「計」` +
            `${tot[2].toLocaleString()} と一致しません（差 ${(sumPrev - tot[2]).toLocaleString()}）`,
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
      facts.push(...group);
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
      const hdr = rowsOf(ws).find(
        (r) => r.filter((w) => w.t === "事業費").length >= 2 && r.filter((w) => w.t === "市債+一財").length >= 2,
      );
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
          numLeft: Math.min(...hdr.filter((w) => /^(事業費|市債\+一財)$/.test(w.t)).map((w) => w.x0)) - 6,
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
      // ⚠ **新しい目が始まるのに前の目が「計」で閉じていないのは異常**（取りこぼしか、
      //   目の合計を課の小計と取り違えている）。黙って次へ行くと事業が別の目に混ざる
      if (h && group.length > 0 && head) {
        throw new Error(
          `${f.filename} p.${p}: 前の目 [${head.bureau}] ${head.kanNo}款${head.koNo ?? "-"}項${head.mokuNo ?? "-"}目 が` +
            `「計」で閉じないまま次の目が始まりました（${group.length}事業が宙に浮いています）`,
        );
      }
      if (h) head = h;
      if (!head) continue;
      const hd = head;
      for (const row of rowsOf(joinSplitNumbers(ws))) {
        const yThis = row[0]!.y;
        // ⚠ **見出しより上の行は見ない** — `[医療局] ８款１項１目（単位：千円）` の
        //   款項目の数字を金額として拾ってしまう（実測）
        if (yThis <= headY) continue;
        const amts = amountsOf(row, nameLeft);
        if (amts.length === 0) continue; // 金額行でない
        // 事業名は**この金額行と同じ帯**（上下に折返す型があるので ±14pt で拾う）。
        // ⚠ **名前の窓の中の数字を除いてはいけない** — `GREEN×EXPO 2027中小企業出展支援事業` の
        //   `2027` が名前から静かに落ちた（実測）。窓で既に金額と分かれているので除外は不要
        //   （§9c の「文字クラスで広げる」の逆で、**窓があるなら中身を選り好みしない**）
        const name = ws
          .filter(
            (w) =>
              w.x0 >= nameLeft &&
              w.x1 <= numLeft &&
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
        const flat = name.replace(/[（）()\s　]/g, "");
        if (flat === "計") {
          if (amts.length !== 6) {
            throw new Error(`${f.filename} p.${p}: 目の「計」の金額が ${amts.length} 個です（期待 6）`);
          }
          closeGroup(amts, p);
          continue;
        }
        if (/課計$|計.*課$/.test(flat)) continue; // 課ごとの小計は事業ではない
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
        group.push({
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
        });
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
