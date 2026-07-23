// 世田谷区の款別歳入歳出パーサ2本（#125・2026-07-23）
//
// 世田谷は**予算データ自体が CC BY**（区オープンデータカタログに登載・世田谷/練馬/千代田組）。
// 資料は2系統あり、**ID は setagaya-kanbetsu-* で統一**して年度間クロスチェーンを資料またぎで張る
// （江戸川の「年度により資料が違う」前例）:
//   - R8       … 「予算の見える化ボード」CSV（歳入・歳出の2ファイル・cp932・千円）。
//                **款項目節細節の明細**が 2018〜2026 の9年分入った単一ファイル（毎年上書き更新）で、
//                年度別に9ソース化すると 9.2MB×9 の raw 重複になるため**最新年度だけ**これを使う
//   - H21〜R7  … 「年度別当初予算データ」XLS（tousyoyosan.xls・135KB・17年の款別総括・合計行あり）
//
// ── mieruka CSV（setagaya-mieruka-csv）──────────────────────────────────────
// 列: 年度, 当初補正区分, 事業区分, 所属…, 会計, 款, 款名称, 項…, 予算前額, …, 予算見積額, 現計予算額…
// - **当年度額は「予算見積額」**（Σ が概要 PDF の記載合計と差0・偵察実測）。⚠ **「現計予算額」は
//   2018〜2023 の歳入で全行0＝使わない**
// - **前年度額は「予算前額」**（前年当初。年度間クロスチェック 8ペア×2側×款別まで全一致・偵察実測）
// - 合計行は無い（明細）→ 合計はΣ。網は (a) 指定年度の行が0件なら throw (b) 会計名称の確認
//   (c) 列は**ヘッダ名で**引く（列順変更で静かに別の列を読まない） (d) 年度間クロスチェーン（derive）
//
// ── tousyoyosan XLS（setagaya-tousho-xls）────────────────────────────────────
// シート「歳入（款別）」「歳出（款別）」に**年度の列グループ**（[予算額, 構成比, 増減額, 増減率] × 17年・
// H21〜R7）。款行は 款番号+款名称、末尾に合計行。
// - 前年度額は**前年の列グループの予算額**から取る（同一ファイル内・款名で結合）。最古の H21 だけ
//   前年グループが無いので 予算額 − 増減額 で復元（どちらも原典の印字値・推計ではない）
// - **款ごとの等式ゲート**: 当年度額 − 前年度額 = 印字の増減額（全款・全年度で要求）。
//   列グループの取り違え・款名結合の誤りをここで止める
// - `-` セル＝その年度に款が無い（環境性能割交付金の未新設期など）→ その年度の款行を出さない
// - 年度ラベルの揺れ: H21〜H30 は `21年度`、R1 は `令和元年度（2019年度）`、R2〜R7 は
//   `2年度（2020年度）` — **括弧の西暦で引く**（R系）／完全一致（H系）
import { readFileSync } from "node:fs";
import XLSX from "../lib/xlsx";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

const compact = (s: string) => s.replace(/[\s　]/g, "");

// ---- mieruka CSV ----------------------------------------------------------

const decodeCp932 = (path: string): string => new TextDecoder("shift_jis").decode(readFileSync(path));

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
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

function fyToSeireki(fy: string): number {
  const m = /^([HR])(\d+)$/.exec(fy);
  if (!m) throw new Error(`年度を解釈できません: ${fy}`);
  return (m[1] === "R" ? 2018 : 1988) + Number(m[2]);
}

function parseMierukaSide(
  path: string,
  filename: string,
  side: "revenue" | "expenditure",
  fy: string,
): { lines: BudgetLineFact[]; total: number; prevTotal: number } {
  const rows = parseCsvRows(decodeCp932(path));
  const hdr = rows[0] ?? [];
  const col = (name: string): number => {
    const i = hdr.findIndex((h) => compact(h) === name);
    if (i < 0) throw new Error(`${filename}: 列「${name}」が見つかりません（列構成が変わった？）`);
    return i;
  };
  // 列は**名前で**引く（列順の変更で静かに別の列を読まないため）
  const cYear = col("年度");
  const cKubun = col("当初補正区分");
  const cAccount = col("会計");
  const cAccountName = col("会計名称");
  const cKan = col("款");
  const cKanName = col("款名称");
  const cPrev = col("予算前額");
  const cAmount = col("予算見積額");

  const seireki = String(fyToSeireki(fy));
  const byKan = new Map<string, { kanNo: number | null; name: string; amount: number; prev: number; row: number }>();
  let hit = 0;
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]!;
    if ((r[cYear] ?? "").trim() !== seireki) continue;
    if ((r[cKubun] ?? "").trim() !== "0") continue; // 当初のみ
    if ((r[cAccount] ?? "").trim() !== "1") continue; // 一般会計のみ
    hit++;
    const an = compact(r[cAccountName] ?? "");
    if (an && an !== "一般会計") {
      throw new Error(`${filename} 行${i + 1}: 会計=1 なのに会計名称が「${an}」です（列の取り違え？）`);
    }
    const key = `${r[cKan]}|${r[cKanName]}`;
    const cur = byKan.get(key) ?? {
      kanNo: /^\d+$/.test((r[cKan] ?? "").trim()) ? Number(r[cKan]) : null,
      name: compact(r[cKanName] ?? ""),
      amount: 0,
      prev: 0,
      row: i + 1,
    };
    const toN = (v: string | undefined): number => {
      const t = (v ?? "").replace(/[",\s　]/g, "");
      if (t === "" || t === "-") return 0;
      const n = Number(t);
      if (!Number.isFinite(n)) throw new Error(`${filename} 行${i + 1}: 金額を解釈できません: ${v}`);
      return n;
    };
    cur.amount += toN(r[cAmount]);
    cur.prev += toN(r[cPrev]);
    byKan.set(key, cur);
  }
  if (hit === 0) throw new Error(`${filename}: 年度=${seireki}（当初・一般会計）の行が0件です（年度の取り違え？）`);
  const lines: BudgetLineFact[] = [...byKan.values()]
    .filter((k) => k.name)
    .sort((a, b) => (a.kanNo ?? 999) - (b.kanNo ?? 999))
    // 当年度・前年度とも0の款（その年度に存在しない款の残骸）は出さない
    .filter((k) => k.amount !== 0 || k.prev !== 0)
    .map((k) => ({
      side,
      kanNo: k.kanNo,
      kanName: k.name,
      amount: k.amount,
      prevAmount: k.prev,
      locator: { file: filename, row: k.row },
    }));
  if (lines.length === 0) throw new Error(`${filename}: 款が1件も組めませんでした`);
  const total = lines.reduce((a, l) => a + l.amount, 0);
  const prevTotal = lines.reduce((a, l) => a + (l.prevAmount ?? 0), 0);
  return { lines, total, prevTotal };
}

export function parseSetagayaMierukaCsv(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  // 世田谷のローマ字は sainyu / saisyutu（syu）— 側判定は両綴りを受ける
  const revFile = files.find((f) => /sainyu/.test(f.filename));
  const expFile = files.find((f) => /saisyutu|saishutu/.test(f.filename));
  if (!revFile || !expFile) {
    throw new Error(`${source.id}: 歳入/歳出の CSV が揃っていません: ${files.map((f) => f.filename).join(", ")}`);
  }
  const fy = source.fiscalYear ?? "";
  const rev = parseMierukaSide(revFile.path, revFile.filename, "revenue", fy);
  const exp = parseMierukaSide(expFile.path, expFile.filename, "expenditure", fy);
  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: "setagaya-mieruka-csv",
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: fy,
    account: "一般会計",
    revenueTotal: rev.total,
    expenditureTotal: exp.total,
    prevRevenueTotal: rev.prevTotal,
    prevExpenditureTotal: exp.prevTotal,
    prevBasis: "当初",
    facts: [...rev.lines, ...exp.lines],
  };
}

// ---- tousyoyosan XLS ------------------------------------------------------

function yearColOf(hdr: unknown[], fy: string, filename: string): number {
  const m = /^([HR])(\d+)$/.exec(fy)!;
  for (let i = 0; i < hdr.length; i++) {
    const v = hdr[i];
    if (v == null) continue;
    const label = compact(String(v));
    if (m[1] === "H" && label === `${m[2]}年度`) return i;
    if (m[1] === "R" && label.includes(`（${2018 + Number(m[2])}年度）`)) return i;
  }
  throw new Error(`${filename}: 年度列「${fy}」が見つかりません`);
}

function parseToushoSide(
  path: string,
  filename: string,
  sheetName: string,
  side: "revenue" | "expenditure",
  fy: string,
): { lines: BudgetLineFact[]; total: number; prevTotal: number } {
  const wb = XLSX.readFile(path);
  const name = wb.SheetNames.find((n) => n.trim() === sheetName);
  if (!name) throw new Error(`${filename}: シート「${sheetName}」がありません（存在: ${wb.SheetNames.join(", ")}）`);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[name]!, { header: 1 }) as unknown[][];
  const hdr = rows[2] ?? [];
  const c = yearColOf(hdr, fy, filename);
  // 前年の列グループ（同一ファイル内）。最古の H21 だけ無い → 予算額 − 増減額 で復元
  const hasPrevGroup = c - 4 >= 2;
  const num = (v: unknown): number | null => {
    if (v == null || v === "-" || v === "") return null;
    const n = typeof v === "number" ? v : Number(String(v).replace(/[,\s　]/g, ""));
    if (!Number.isFinite(n)) throw new Error(`${filename} ${sheetName}: 金額を解釈できません: ${String(v)}`);
    return n;
  };
  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  for (let i = 4; i < rows.length; i++) {
    const r = rows[i] ?? [];
    const kanName = compact(String(r[1] ?? ""));
    if (!kanName) continue;
    const amount = num(r[c]);
    const diff = num(r[c + 2]);
    if (kanName === "合計") {
      if (amount == null || diff == null) throw new Error(`${filename} ${sheetName}: 合計行の値が欠けています`);
      total = amount;
      prevTotal = hasPrevGroup ? (num(rows[i]![c - 4]) ?? 0) : amount - diff;
      // **歳出シートの後半には「※職員費を関係各款へ算入した場合」の第2表**（発行元の参考再配分版・
      // .5千円の端数が出る按分値）が独自の年度見出し行つきで続く（偵察実測）。第1表の合計で止める。
      // 再配分版は原典の主表ではないので採らない（世田谷の職員費の扱いは §10 参照）
      break;
    }
    if (amount == null) continue; // `-`＝その年度に款が無い
    const prevRaw = hasPrevGroup ? num(r[c - 4]) : null;
    const prevAmount = hasPrevGroup ? (prevRaw ?? 0) : amount - (diff ?? 0);
    // **款ごとの等式ゲート**: 当年度額 − 前年度額 = 印字の増減額。
    // 列グループの取り違え・前年グループとの結合誤りをここで止める（H21 は復元式なので恒等＝無検査）
    if (hasPrevGroup && diff != null && amount - prevAmount !== diff) {
      throw new Error(
        `${filename} ${sheetName} ${fy}「${kanName}」: 当年 ${amount} − 前年 ${prevAmount} = ${amount - prevAmount} が` +
          `印字の増減額 ${diff} と一致しません（列グループの取り違え？）`,
      );
    }
    const kanNoRaw = String(r[0] ?? "").trim();
    lines.push({
      side,
      kanNo: /^\d+$/.test(kanNoRaw) ? Number(kanNoRaw) : null,
      kanName,
      amount,
      prevAmount,
      locator: { file: filename, sheet: name, row: i + 1 },
    });
  }
  if (lines.length === 0) throw new Error(`${filename} ${sheetName}: 款行が1件も抽出できませんでした`);
  if (total == null || prevTotal == null) throw new Error(`${filename} ${sheetName}: 合計行が見つかりません`);
  return { lines, total, prevTotal };
}

export function parseSetagayaToushoXls(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: 年度別当初予算データは1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const fy = source.fiscalYear ?? "";
  const rev = parseToushoSide(file!.path, file!.filename, "歳入（款別）", "revenue", fy);
  const exp = parseToushoSide(file!.path, file!.filename, "歳出（款別）", "expenditure", fy);
  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: "setagaya-tousho-xls",
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: fy,
    account: "一般会計",
    revenueTotal: rev.total,
    expenditureTotal: exp.total,
    prevRevenueTotal: rev.prevTotal,
    prevExpenditureTotal: exp.prevTotal,
    prevBasis: "当初",
    facts: [...rev.lines, ...exp.lines],
  };
}
