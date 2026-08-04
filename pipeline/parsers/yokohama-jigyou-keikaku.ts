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
 * ⚠ 負号 `△`/`▲` は**別トークン**なので直前を見る。**6個ちょうどでなければ throw**。
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
  if (vals.length === 0) return [];
  if (vals.length !== 6) {
    throw new Error(
      `金額が ${vals.length} 個の行があります（期待 6＝R8事業費/R8市債+一財/R7事業費/R7市債+一財/増減×2）: ` +
        row.map((w) => w.t).join(" "),
    );
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
      // 目次ページだけを見る（詳細シートは会計名の確認にしか使わない）
      if (!/（単位：千円）/.test(text) || /歳出予算科目/.test(text)) continue;
      const ws = byPage.get(p) ?? [];
      if (ws.length === 0) continue;

      // ⚠⚠ **列の x はファイルごとに違う**ので、**見出し行から毎ページ導出する**
      //   （固定値にしたら別の局のファイルで名前も金額も取りこぼした＝実測）。
      const hdr = rowsOf(ws).find((r) => r.filter((w) => w.t === "事業費").length >= 2);
      if (!hdr) continue;
      const numLeft = Math.min(...hdr.filter((w) => /^(事業費|市債\+一財)$/.test(w.t)).map((w) => w.x0)) - 6;
      const pageColRight = Math.max(
        ...ws.filter((w) => /^(計画|書頁)$/.test(w.t)).map((w) => w.x1),
        0,
      );
      const nameLeft = pageColRight > 0 ? pageColRight : 90;

      const h = parseHead(text);
      // ⚠ **見出しの無い継続ページがある**（事業の多い目は目次が2ページに渡り、
      //   2ページ目に見出しが無い＝実測 こども青少年局 6款2項2目）。直前の見出しを引き継ぐ
      if (h) head = h;
      if (!head) continue;

      for (const row of rowsOf(ws)) {
        const amts = amountsOf(row, nameLeft);
        if (amts.length === 0) continue; // 金額行でない
        const yThis = row[0]!.y;
        if (row.some((w) => w.t === "計" && w.x1 <= numLeft)) {
          closeGroup(amts, p);
          continue;
        }
        // 事業名は**この金額行と同じ帯**（上下に折返す型があるので ±14pt で拾う）
        const name = ws
          .filter(
            (w) =>
              w.x0 >= nameLeft &&
              w.x1 <= numLeft &&
              Math.abs(w.y - yThis) <= 14 &&
              !/^[0-9,]+$/.test(w.t),
          )
          .sort((a, b) => a.y - b.y || a.x0 - b.x0)
          .map((w) => w.t)
          .join("")
          .replace(/[\s　]+/g, "");
        if (!name) continue;
        const pageCell = row.find((w) => w.x1 <= nameLeft + 2);
        const pageRight = Math.max(...ws.map((w) => w.x1));
        const marked = ws.some(
          (w) => w.x0 >= pageRight - COL.kubunFromRight && Math.abs(w.y - yThis) <= 8 && /[○〇◎]/.test(w.t),
        );
        group.push({
          accountName: head.accountName,
          kanNo: head.kanNo,
          koNo: head.koNo,
          mokuNo: head.mokuNo,
          bureau: head.bureau,
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
