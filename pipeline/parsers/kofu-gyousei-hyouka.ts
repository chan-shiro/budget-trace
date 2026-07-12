// 甲府市「行政評価（事務事業評価）結果一覧」パーサ — 実施計画事業ごとの総合評価。
// 年度により形式が大きく違う（parserOptions.format で切替。docs/data-sources.md 参照）:
//   form-plus-plan (R6・R7 xlsx): 評価票シート（NO/部/課/事業名/目的/総合評価/前回評価）＋
//     実施計画一覧シート（事業名→予算名）。予算名は主な事業の予算書名と突合できる
//   hyouka-form (R3 xlsx): 施策/事業名/目的/評価点6項目/合計点数/総合評価
//   list-simple (R1・R2・H29・H30 xls(x)): 施策/小施策/事務事業名/区分/部/室/課/評価結果
//   form-pdf (R4・R5 pdf): form-plus-plan の評価票と同じ列構成の PDF 表
import { execFileSync } from "node:child_process";
import * as XLSX from "xlsx";
import type { ProjectEvaluationDoc, ProjectEvaluationFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  format: "form-plus-plan" | "hyouka-form" | "list-simple" | "form-pdf";
  /** form-pdf: 一覧のページ範囲 */
  pages?: { from: number; to: number };
}

/** 全角英字・全角ハイフンを半角へ（評価は "Ｂ" 等で入っている年度がある） */
function normGrade(s: string): string {
  return s
    .replace(/[Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[-‐−]/g, "－")
    .trim();
}

const cell = (v: unknown): string => (v == null ? "" : String(v)).replace(/\r?\n/g, "").trim();

function readSheet(path: string, sheetName: string | RegExp): { rows: unknown[][]; sheet: string } {
  const wb = XLSX.readFile(path);
  const name =
    typeof sheetName === "string"
      ? wb.SheetNames.find((n) => n.trim() === sheetName)
      : wb.SheetNames.find((n) => sheetName.test(n));
  if (!name) {
    throw new Error(`シートが見つかりません（${String(sheetName)}）。存在: ${wb.SheetNames.join(", ")}`);
  }
  return { rows: XLSX.utils.sheet_to_json(wb.Sheets[name]!, { header: 1 }) as unknown[][], sheet: name };
}

/** ヘッダ行（指定ラベルを含む行）を探し、ラベル→列番号のマップを返す */
function headerMap(rows: unknown[][], required: string[]): { rowIdx: number; col: Map<string, number> } {
  for (let i = 0; i < Math.min(rows.length, 10); i++) {
    const cells = (rows[i] ?? []).map(cell);
    if (required.every((label) => cells.some((c) => c.includes(label)))) {
      const col = new Map<string, number>();
      cells.forEach((c, j) => {
        if (c) col.set(c, j);
      });
      return { rowIdx: i, col };
    }
  }
  throw new Error(`ヘッダ行が見つかりません（必要な列: ${required.join("・")}）`);
}

const findCol = (col: Map<string, number>, label: string): number => {
  for (const [k, v] of col) if (k.includes(label)) return v;
  throw new Error(`列「${label}」が見つかりません（存在: ${[...col.keys()].join(", ")}）`);
};

// ---- form-plus-plan（R6・R7）: 評価票 + 実施計画一覧の予算名 join ---------------
function parseFormPlusPlan(path: string, filename: string): ProjectEvaluationFact[] {
  const form = readSheet(path, /様式|公表用/);
  const h = headerMap(form.rows, ["NO", "実施計画掲載事業名", "総合"]);
  const cName = findCol(h.col, "実施計画掲載事業名");
  const cBu = findCol(h.col, "部");
  const cKa = findCol(h.col, "課");
  const cPurpose = findCol(h.col, "事業の目的");
  const cGrade = findCol(h.col, "総合");
  const cPrev = findCol(h.col, "前回");

  // 実施計画一覧シート: 実施計画掲載事業名 → 予算名
  const plan = readSheet(path, /実施計画事業一覧/);
  const ph = headerMap(plan.rows, ["実施計画掲載事業名", "予"]);
  const pName = findCol(ph.col, "実施計画掲載事業名");
  const pBudget = findCol(ph.col, "予");
  const budgetByName = new Map<string, string>();
  for (const r of plan.rows.slice(ph.rowIdx + 1)) {
    const n = cell(r?.[pName]);
    const b = cell(r?.[pBudget]);
    if (n && b) budgetByName.set(n, b);
  }

  const facts: ProjectEvaluationFact[] = [];
  form.rows.slice(h.rowIdx + 1).forEach((r, i) => {
    const name = cell(r?.[cName]);
    const grade = normGrade(cell(r?.[cGrade]));
    if (!name || !/^([A-F－]|完了)$/.test(grade)) return; // 部・課の続き行・空行・ヘッダ
    facts.push({
      name,
      grade,
      prevGrade: cell(r?.[cPrev]) || null,
      scoreTotal: null,
      bu: cell(r?.[cBu]) || null,
      ka: cell(r?.[cKa]) || null,
      shisaku: null,
      kubun: null,
      purpose: cell(r?.[cPurpose]) || null,
      budgetName: budgetByName.get(name) ?? null,
      locator: { file: filename, sheet: form.sheet, row: h.rowIdx + 2 + i },
    });
  });
  return facts;
}

// ---- hyouka-form（R3）: 評価点つき様式 ----------------------------------------
function parseHyoukaForm(path: string, filename: string): ProjectEvaluationFact[] {
  const form = readSheet(path, /様式/);
  const h = headerMap(form.rows, ["施策", "事業名", "事務事業評価"]);
  // 列は固定（結合ヘッダのため位置で解決）: 0施策 1事業名 2目的 3-8点数 9合計 10総合評価 13部 15課
  const facts: ProjectEvaluationFact[] = [];
  form.rows.slice(h.rowIdx + 3).forEach((r, i) => {
    const name = cell(r?.[1]);
    const grade = normGrade(cell(r?.[10]));
    if (!name || !/^([A-F－]|完了)$/.test(grade)) return;
    const score = Number(r?.[9]);
    facts.push({
      name,
      grade,
      prevGrade: null,
      scoreTotal: Number.isFinite(score) ? score : null,
      bu: cell(r?.[13]) || null,
      ka: cell(r?.[15]) || null,
      shisaku: cell(r?.[0]) || null,
      kubun: null,
      purpose: cell(r?.[2]) || null,
      budgetName: null,
      locator: { file: filename, sheet: form.sheet, row: h.rowIdx + 4 + i },
    });
  });
  return facts;
}

// ---- list-simple（R1・R2・H29・H30） ------------------------------------------
function parseListSimple(path: string, filename: string): ProjectEvaluationFact[] {
  const list = readSheet(path, "事業一覧");
  const h = headerMap(list.rows, ["事務事業名", "評価結果"]);
  const cName = findCol(h.col, "事務事業名");
  const cGrade = findCol(h.col, "評価結果");
  const cShisaku = findCol(h.col, "施");
  const cKubun = findCol(h.col, "区");
  const cBu = findCol(h.col, "部");
  const cKa = findCol(h.col, "課");

  const facts: ProjectEvaluationFact[] = [];
  let shisaku = "";
  list.rows.slice(h.rowIdx + 1).forEach((r, i) => {
    if (cell(r?.[cShisaku])) shisaku = cell(r?.[cShisaku]); // 結合セルの持ち越し
    const name = cell(r?.[cName]);
    const grade = normGrade(cell(r?.[cGrade]));
    if (!name || !/^([A-F－]|完了)$/.test(grade)) return;
    facts.push({
      name,
      grade,
      prevGrade: null,
      scoreTotal: null,
      bu: cell(r?.[cBu]) || null,
      ka: cell(r?.[cKa]) || null,
      shisaku: shisaku || null,
      kubun: cell(r?.[cKubun]) || null,
      purpose: null,
      budgetName: null,
      locator: { file: filename, sheet: list.sheet, row: h.rowIdx + 2 + i },
    });
  });
  return facts;
}

// ---- form-pdf（R4・R5）: 評価票と同じ列構成の PDF 表 ---------------------------
// pdftotext -tsv の単語座標。行アンカー = NO 列の数値。列は X 範囲で判別
// （実測: NO<50 / 部<75 / 課<100 / 事業名<190 / 目的<460 / 総合評価<505 / 前回それ以降。
//   事業名の左端は x≈106.9 のため課との境界は 100）
function parseFormPdf(
  path: string,
  filename: string,
  pages: { from: number; to: number },
): ProjectEvaluationFact[] {
  const facts: ProjectEvaluationFact[] = [];
  for (let page = pages.from; page <= pages.to; page++) {
    const out = execFileSync("pdftotext", ["-f", String(page), "-l", String(page), "-tsv", path, "-"], {
      encoding: "utf8",
    });
    const words: { x: number; y: number; h: number; text: string }[] = [];
    for (const line of out.split("\n").slice(1)) {
      const c = line.split("\t");
      if (c.length < 12 || c[0] !== "5" || c[11]!.startsWith("###")) continue;
      words.push({ x: +c[6]!, y: +c[7]!, h: +c[9]!, text: c[11]! });
    }
    const anchors = words
      .filter((w) => /^\d+$/.test(w.text) && w.x < 60)
      .sort((a, b) => a.y - b.y);
    if (anchors.length === 0) continue;
    const centers = anchors.map((a) => a.y + a.h / 2);
    const bounds: number[] = [centers[0]! - (centers.length > 1 ? (centers[1]! - centers[0]!) / 2 : 30)];
    for (let i = 1; i < anchors.length; i++) bounds.push((centers[i - 1]! + centers[i]!) / 2);
    bounds.push(centers[centers.length - 1]! + (centers.length > 1 ? (centers[centers.length - 1]! - centers[centers.length - 2]!) / 2 : 30));

    anchors.forEach((a, i) => {
      const rowWords = words.filter((w) => {
        const cy = w.y + w.h / 2;
        return cy >= bounds[i]! && cy < bounds[i + 1]! && w !== a;
      });
      const inCol = (min: number, max: number) =>
        rowWords
          .filter((w) => w.x >= min && w.x < max)
          .sort((x, y) => x.y - y.y || x.x - y.x)
          .map((w) => w.text)
          .join("");
      const name = inCol(100, 190);
      const grade = normGrade(inCol(460, 505));
      const prev = normGrade(inCol(505, 10_000));
      if (!name || !/^([A-F－]|完了)$/.test(grade)) return;
      facts.push({
        name,
        grade,
        prevGrade: prev || null,
        scoreTotal: null,
        bu: inCol(50, 75) || null,
        ka: inCol(75, 100) || null,
        shisaku: null,
        kubun: null,
        purpose: inCol(190, 460) || null,
        budgetName: null,
        locator: { file: filename, page },
      });
    });
  }
  return facts;
}

export function parseKofuGyouseiHyouka(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectEvaluationDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: 1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;
  const opts = (source.parserOptions ?? {}) as unknown as Options;

  let facts: ProjectEvaluationFact[];
  switch (opts.format) {
    case "form-plus-plan":
      facts = parseFormPlusPlan(file!.path, file!.filename);
      break;
    case "hyouka-form":
      facts = parseHyoukaForm(file!.path, file!.filename);
      break;
    case "list-simple":
      facts = parseListSimple(file!.path, file!.filename);
      break;
    case "form-pdf":
      if (!opts.pages) throw new Error(`${source.id}: form-pdf には parserOptions.pages が必要です`);
      facts = parseFormPdf(file!.path, file!.filename, opts.pages);
      break;
    default:
      throw new Error(`${source.id}: parserOptions.format が未指定または未知です（${opts.format}）`);
  }
  if (facts.length === 0) throw new Error(`${source.id}: 評価が1件も抽出できませんでした`);

  return {
    docType: "project-evaluation",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    formNote: opts.format,
    facts,
  };
}
