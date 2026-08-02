// 横浜市「予算に関する説明書（一般会計）」XLSX — 款項目＋**前年度列**（#192）
//
// #191（歳入歳出 CSV）の**過年度への延伸**。CSV 形式があるのは R6・R7・R8 の3年だけで、
// **R5 以前は同内容が `rNippan.zip` 内の XLSX** に入っている。**CSV に無い「前年度」列を持つ**
// のがこちらの強みで、**項・目レベルの前年比較**は CSV 版では出せない。
//
// ⚠ **フラット表ではない** — ページ組みをそのまま再現したレイアウト型で、
// `款項目 / 本年度 / 前年度 / 比較 / 節 / 説明` のヘッダ行が**数ページごとに繰り返す**
// （実測: R5 歳入56回・歳出112回）。結合セルも多い。
//
// **階層は「番号がどの列に入っているか」で決まる**（インデントではない・実測）:
//   款 … 番号 col0 / 名前 col1
//   項 … 番号 col1 / 名前 col2
//   目 … 番号 col2 / 名前 col4
// ⚠ **見出しは結合セルの左端に入るので、値の列は見出しの位置より右**（実測 本年度は
//   見出し col6 に対し値 col7）。**固定オフセットにすると年度で崩れる**ので、
//   **見出しの位置から右へ最初の数値セル**を値の列として自動で決める。
//
// ⚠ **節・細節は取らない**（#191 と同じ判断）。この様式の節は説明欄と混ざったレイアウトで、
//   しかも歳出の節は性質別区分＝款項目の目的別とは軸が違う。画面には項・目までしか出さない。
//
// ⚠⚠ **R2・H31 は収録しない**（2026-08-02 実測）。**歳入と歳出で「前年度」列の Σ が食い違う**:
//   R2  歳入 1,759,429,383 / 歳出 1,761,506,383（差 2,077,000）
//   H31 歳入 1,713,697,299 / 歳出 1,726,435,299（差 12,738,000）
//   当年度は両側とも一致するので**前年度列だけが壊れている**。**前年度列こそがこの資料の
//   価値**（#192 の目的）なので、そこが検証できない年度は入れない（#191 の R7 と同じ判断）。
import type { BudgetDetailDoc, BudgetDetailFact, SourceEntry } from "../types";
import * as XLSX from "../lib/xlsx";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// 0.2.0: 項行・款行の前年度額も取る（Σ目prev では項の前年比が符号ごと狂う。#192 のレビュー）
export const PARSER_VERSION = "0.2.0";

interface Options {
  /** 説明書 XLSX を選ぶ zip エントリの接頭辞（既定 "02_"） */
  entryPrefix?: string;
}

const toNum = (v: unknown): number | null => {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v ?? "").replace(/[,\s]/g, "");
  return /^-?\d+$/.test(s) ? Number(s) : null;
};
/** セルの値を1行に均す（見出し・番号の照合用） */
const clean = (v: unknown): string => String(v ?? "").replace(/\s+/g, " ").replace(/　/g, " ").trim();
/**
 * 科目名から**空白を全部落とす**。
 * ⚠ この様式は**列幅に合わせてセル内で改行**しており（`株式等譲渡\n所得割交付金`）、
 * 空白に均すと款別一覧の名前と一致しなくなる（実測 R5・R4・R3 で **192 種**）。
 * 地方財政の科目名に意味のある空白は無いので**全部落とす**のが正しい。
 * これは derive の「款項目の款が款別一覧にあるか」で捕まえた — **画面まで行けば静かに壊れていた**型。
 */
const cleanName = (v: unknown): string => String(v ?? "").replace(/[\s　]+/g, "").trim();

/** zip から説明書 XLSX を取り出す（エントリ名は CP932 なので接頭辞のバイト列で選ぶ） */
function extractXlsx(zipPath: string, prefix: string): string {
  const listing = execFileSync("unzip", ["-Z", "-1", zipPath], { maxBuffer: 1 << 28 }).toString("binary");
  const entries = listing.split("\n").filter((l) => l.trim() !== "");
  const hit = entries.find((e) => (e.split("/").pop() ?? "").startsWith(prefix));
  if (!hit) {
    throw new Error(`${zipPath}: zip の中に "${prefix}" で始まるエントリがありません（${entries.length}件）`);
  }
  const buf = execFileSync("unzip", ["-p", zipPath, `*${prefix}*`], { maxBuffer: 1 << 28 });
  const dir = mkdtempSync(join(tmpdir(), "yokohama-setsumei-"));
  const out = join(dir, "setsumeisho.xlsx");
  writeFileSync(out, buf);
  void readdirSync; void readFileSync;
  return out;
}

export function parseYokohamaSetsumeishoXlsx(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetDetailDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  const zip = files.find((f) => f.filename.toLowerCase().endsWith(".zip"));
  if (!zip) throw new Error(`${source.id}: zip が見つかりません（${files.map((f) => f.filename).join(", ")}）`);
  const xlsxPath = extractXlsx(zip.path, opts.entryPrefix ?? "02_");
  const wb = XLSX.readFile(xlsxPath, { cellDates: false });

  const facts: BudgetDetailFact[] = [];
  const totals: Record<"revenue" | "expenditure", { cur: number; prev: number }> = {
    revenue: { cur: 0, prev: 0 },
    expenditure: { cur: 0, prev: 0 },
  };

  for (const [kw, side] of [["歳入事項別", "revenue"], ["歳出事項別", "expenditure"]] as const) {
    const sheetName = wb.SheetNames.find((n) => n.includes(kw));
    if (!sheetName) throw new Error(`${source.id}: シート「…${kw}…」が見つかりません（${wb.SheetNames.join(" / ")}）`);
    const rows = XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[sheetName]!, { header: 1, blankrows: false, defval: "" });

    // 見出し行（`款項目 … 本年度 … 前年度`）。**繰り返し出る**ので最初の1本で列を決める
    const hdr = rows.find((r) => clean((r as unknown[])[0]) === "款項目") as unknown[] | undefined;
    if (!hdr) throw new Error(`${source.id} ${kw}: 見出し行（款項目）が見つかりません`);
    const kanRow = rows.find((r) => {
      const a = r as unknown[];
      return /^\d+$/.test(clean(a[0])) && clean(a[1]) !== "";
    }) as unknown[] | undefined;
    if (!kanRow) throw new Error(`${source.id} ${kw}: 款の行が1つも見つかりません`);
    // ⚠ 見出しは結合セルの左端なので、値は**見出しの位置から右へ最初の数値セル**
    const colOf = (label: string): number => {
      const h = hdr.findIndex((c) => clean(c) === label);
      if (h < 0) throw new Error(`${source.id} ${kw}: 見出しに「${label}」がありません`);
      for (let i = h; i < h + 4 && i < kanRow.length; i++) if (toNum(kanRow[i]) != null) return i;
      throw new Error(`${source.id} ${kw}: 「${label}」の値の列を決められません（見出し col${h}）`);
    };
    const cCur = colOf("本年度");
    const cPrev = colOf("前年度");

    let kanNo = "", kanName = "", koNo = "", koName = "";
    // ⚠⚠ **項行・款行にも前年度が印字されており、そちらが正**（#192 のレビューで発覚）。
    //   当年度に廃止された目は行ごと消えるので、Σ目prev は項行prev より小さくなる
    //   （実測 R5 歳出「選挙費」項行 2,833,438 / Σ目 1,499,819）。**Σ目で項の前年比を作ると
    //   符号が逆になる**（選挙費は実際は減なのに +50.1% と出ていた）。葉に持たせて derive へ渡す。
    let kanPrev: number | null = null, koPrev: number | null = null;
    let nKan = 0;
    // **当年度は 款 = 項 = 目 で厳密に閉じる**（実測・全年度・両側）。ここが唯一3階層を
    // 同時に見られる場所なので assert する。⚠ **前年度は閉じない**（当年度に廃止された目は
    // 行として現れず、その額は款の合計にだけ残る）ので前年度でこの等式を張ってはいけない。
    let curKan = 0, curKo = 0, curMoku = 0;
    for (const r0 of rows) {
      const r = r0 as unknown[];
      const c = (i: number) => clean(r[i]);
      if (c(0) === "款項目") continue; // 繰り返す見出し行
      const cur = toNum(r[cCur]);
      const prev = toNum(r[cPrev]);
      if (cur == null) continue;

      if (/^\d+$/.test(c(0)) && c(1)) {
        kanNo = c(0); kanName = cleanName(r[1]); koNo = ""; koName = "";
        kanPrev = prev; koPrev = null;
        nKan++; curKan += cur;
        totals[side].cur += cur;
        totals[side].prev += prev ?? 0;
      } else if (/^\d+$/.test(c(1)) && c(2)) {
        koNo = c(1); koName = cleanName(r[2]); koPrev = prev; curKo += cur;
      } else if (/^\d+$/.test(c(2)) && c(4)) {
        curMoku += cur;
        if (!kanName || !koName) {
          throw new Error(`${source.id} ${kw}: 目「${c(4)}」の上に款/項がありません（行の取り違えを疑う）`);
        }
        facts.push({
          side,
          accountCode: "01",
          accountName: "一般会計",
          kanNo, kanName, koNo, koName,
          mokuNo: c(2), mokuName: cleanName(r[4]),
          // ⚠ この様式から節は取らない（説明欄と混ざる・性質別で軸が違う）。
          //   スキーマ上は必須なので「—」を入れず、目レベルで木を止めることを明示する
          setsuNo: "-", setsuName: "（この資料では節を収録していない）",
          saisetsuNo: null, saisetsuName: null,
          amount: cur,
          prevAmount: prev,
          koPrevAmount: koPrev,
          kanPrevAmount: kanPrev,
          locator: { file: zip.filename, sheet: sheetName },
        });
      }
    }
    if (nKan < 5) throw new Error(`${source.id} ${kw}: 款が ${nKan} 件しか取れていません`);
    if (curKan !== curKo || curKan !== curMoku) {
      throw new Error(
        `${source.id} ${kw}: 当年度が階層で閉じていません（款 ${curKan.toLocaleString()} / ` +
          `項 ${curKo.toLocaleString()} / 目 ${curMoku.toLocaleString()}）。行の階層判定を疑うこと`,
      );
    }
  }

  return {
    docType: "budget-detail",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    generalRevenueTotal: totals.revenue.cur,
    generalExpenditureTotal: totals.expenditure.cur,
    // この資料は一般会計だけなので「全会計」＝一般会計。特別会計は別 zip
    allRevenueTotal: totals.revenue.cur,
    allExpenditureTotal: totals.expenditure.cur,
    statedRevenueTotal: null,
    statedExpenditureTotal: null,
    // **前年度の合計**。⚠ R2・H31 はここが歳入と歳出で食い違う（＝収録しない理由）
    prevRevenueTotal: totals.revenue.prev,
    prevExpenditureTotal: totals.expenditure.prev,
    facts,
  };
}
