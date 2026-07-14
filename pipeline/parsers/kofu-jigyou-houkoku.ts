// 甲府市「事務事業評価 詳細票（第2号様式）」パーサ — 事業報告（成果）。
//
// 行政評価の公表用 XLSX（6kouhyouyou6.xlsx 等）に、個別事業の詳細票が事業番号を
// シート名にして数枚だけ埋め込まれている（例: "79", "136"）。各詳細票は固定様式で:
//   - 事務事業名 / 担当部室課名 / 区分 / 事業実施結果（実施内容）
//   - コスト表: 年度（R?年度）× 決算/当初/計画、事業費・一般財源・トータルコスト（千円）
//   - 総合評価（A〜F）・評価点（／24）
//   - 目標達成状況: 活動指標・成果指標ごとに 目標値（〜5年）／実績値（決算年度分）
// 予算→執行→成果を1事業で通して見られる唯一の一次資料。公表は各年サンプル数件のみ。
import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

type Grid = string[][];

/** 全角数字・カンマ交じりの千円セル → 数値。空・非数は null */
function toNum(s: string): number | null {
  const t = s
    .replace(/[，,]/g, "")
    .replace(/[０-９]/g, (c) => String(c.charCodeAt(0) - 0xff10))
    .trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(t)) return null;
  return Number(t);
}

/** 令和/平成の「対象：令和X年度」などから "R5" 形式へ */
function toFyCode(era: string, n: string): string {
  const num = Number(era === "令和" ? n : n); // 平成は使わない想定
  return `${era === "令和" ? "R" : "H"}${num}`;
}

function readGrid(ws: XLSX.WorkSheet): Grid {
  const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: "", blankrows: true });
  return rows.map((r) => (r ?? []).map((c) => String(c).replace(/\s+/g, " ").trim()));
}

/** 詳細票シート1枚 → 1事業の報告 */
function parseSheet(no: string, grid: Grid, filename: string): ProjectReportFact | null {
  const cell = (r: number, c: number): string => grid[r]?.[c] ?? "";
  const findRow = (pred: (cells: string[]) => boolean): number =>
    grid.findIndex((r) => pred(r ?? []));

  // 事務事業名: 「事務事業名」ラベルの次の非空セル
  const nameRow = findRow((cs) => cs.includes("事務事業名"));
  if (nameRow < 0) return null;
  const nameIdx = grid[nameRow]!.indexOf("事務事業名");
  const name = (grid[nameRow]!.slice(nameIdx + 1).find(Boolean) ?? "").trim();
  if (!name) return null;

  // 担当部室課名
  const bukaRow = findRow((cs) => cs.includes("担当部室課名"));
  const buka =
    bukaRow >= 0
      ? (grid[bukaRow]!.slice(grid[bukaRow]!.indexOf("担当部室課名") + 1).find(Boolean) ?? "").trim()
      : "";

  // 区分（継続/主要/総合戦略 の選ばれた語。ラベル行に "区分" があるが選択値の特定は難しいので
  // 「主要」を含めば主要事業と分かる程度の軽い抽出に留める）
  const kubunRow = grid[nameRow]!;
  const kubun = kubunRow.includes("主要") ? "主要" : null;

  // 事業実施結果（実施内容）: 「評価対象年度における」を含むラベルの次セル
  const implRow = findRow((cs) => cs.some((c) => c.includes("評価対象年度における")));
  let implementation: string | null = null;
  if (implRow >= 0) {
    const cells = grid[implRow]!;
    const li = cells.findIndex((c) => c.includes("評価対象年度における"));
    implementation = (cells.slice(li + 1).find((c) => c.length > 10) ?? "").trim() || null;
  }

  // コスト表: 年度ヘッダ行（R?年度 が並ぶ）を探し、値の列インデックスを得る
  const yearHeaderRow = findRow((cs) => cs.filter((c) => /^[RH]?令?和?\d+年度$|^R\d+年度$/.test(c)).length >= 3);
  if (yearHeaderRow < 0) return null;
  const yearCols: { col: number; fy: string }[] = [];
  grid[yearHeaderRow]!.forEach((c, ci) => {
    const m = c.match(/^R(\d+)年度$/) || c.match(/^令和(\d+)年度$/);
    if (m) yearCols.push({ col: ci, fy: `R${m[1]}` });
  });
  if (yearCols.length < 3) return null;

  // 種別行（決算額/当初予算額/計画額）は年度行の次行
  const kindRow = grid[yearHeaderRow + 1] ?? [];
  const kindOf = (col: number): "決算" | "当初" | "計画" => {
    const k = kindRow[col] ?? "";
    if (k.includes("当初")) return "当初";
    if (k.includes("計画")) return "計画";
    return "決算";
  };

  const valuesAt = (rowIdx: number): (number | null)[] => yearCols.map(({ col }) => toNum(cell(rowIdx, col)));
  const rowByFirstCell = (label: string): number => findRow((cs) => (cs.find(Boolean) ?? "").trim() === label);
  const rowByStartsWith = (label: string): number => findRow((cs) => (cs.find(Boolean) ?? "").trim().startsWith(label));

  const jigyohiRow = rowByFirstCell("事業費");
  const ippanRow = rowByFirstCell("一般財源");
  const totalRow = rowByStartsWith("トータルコスト");
  const jigyohi = jigyohiRow >= 0 ? valuesAt(jigyohiRow) : yearCols.map(() => null);
  const ippan = ippanRow >= 0 ? valuesAt(ippanRow) : yearCols.map(() => null);
  const total = totalRow >= 0 ? valuesAt(totalRow) : yearCols.map(() => null);
  const cost = yearCols.map(({ fy, col }, i) => ({
    fy,
    kind: kindOf(col),
    jigyohi: jigyohi[i] ?? null,
    ippanZaigen: ippan[i] ?? null,
    totalCost: total[i] ?? null,
  }));

  // 総合評価（A〜F）と評価点（／24）
  const gradeRow = findRow((cs) => cs.includes("総合評価"));
  let grade = "";
  if (gradeRow >= 0) {
    const cells = grid[gradeRow]!;
    const gi = cells.indexOf("総合評価");
    grade = (cells.slice(gi + 1).find((c) => /^[A-F]$/.test(c)) ?? "").trim();
  }
  if (!/^[A-F]$/.test(grade)) return null;
  // 評価点: 「／２４」等を含むセルの直前の数値
  let score: number | null = null;
  for (const r of grid) {
    const idx = (r ?? []).findIndex((c) => /／\s*[２2][４4]/.test(c));
    if (idx > 0) {
      const s = toNum(r[idx - 1] ?? "");
      if (s != null) { score = s; break; }
    }
  }

  // 目標達成状況: 「≪指標名≫ …」の行が指標。直前の 活動指標/成果指標 セルで分類。
  const indicators: ProjectReportFact["indicators"] = [];
  let category: "活動指標" | "成果指標" | null = null;
  for (let r = 0; r < grid.length; r++) {
    const cells = grid[r] ?? [];
    if (cells.some((c) => c.trim() === "活動指標")) category = "活動指標";
    if (cells.some((c) => c.trim() === "成果指標")) category = "成果指標";
    const nameCell = cells.find((c) => c.includes("≪指標名≫"));
    if (!nameCell || !category) continue;
    const indName = nameCell.replace(/.*≪指標名≫\s*/, "").trim();
    if (!indName) continue;
    const targets = valuesAt(r);
    const actuals = valuesAt(r + 1); // 実績値は次行（決算年度分のみ）
    // 全て null（定性指標）はスキップ
    if (targets.every((v) => v == null) && actuals.every((v) => v == null)) continue;
    indicators.push({ category, name: indName, targets, actuals });
  }

  return {
    no,
    name,
    buka,
    kubun,
    implementation,
    grade,
    score,
    cost,
    indicators,
    locator: { file: filename, sheet: no, row: nameRow },
  };
}

export function parseKofuJigyouHoukoku(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  if (files.length !== 1) {
    throw new Error(`${source.id}: XLSX 1ファイルを想定（現在 ${files.length} 件）`);
  }
  const file = files[0]!;
  const wb = XLSX.read(readFileSync(file.path), { type: "buffer" });
  // 評価年度・対象年度は最初の詳細票のヘッダから取る
  const detailSheets = wb.SheetNames.filter((n) => /^\s*\d+\s*$/.test(n));
  if (detailSheets.length === 0) {
    throw new Error(`${file.filename}: 数字名の詳細票シートが見つかりません`);
  }
  let fiscalYear = source.fiscalYear;
  let targetFy = "";
  const facts: ProjectReportFact[] = [];
  for (const sheet of detailSheets) {
    const grid = readGrid(wb.Sheets[sheet]!);
    // ヘッダ「令和X年度第…事務事業評価票（対象：令和Y年度）」
    const head = grid.slice(0, 3).flat().join(" ");
    const hm = head.match(/(令和|平成)(\d+)年度.*?対象[：:]\s*(令和|平成)(\d+)年度/);
    if (hm) {
      fiscalYear = toFyCode(hm[1]!, hm[2]!);
      targetFy = toFyCode(hm[3]!, hm[4]!);
    }
    const fact = parseSheet(sheet.trim(), grid, file.filename);
    if (fact) facts.push(fact);
  }
  if (facts.length === 0) throw new Error(`${file.filename}: 詳細票を1件も抽出できませんでした`);
  return {
    docType: "project-report",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear,
    targetFy,
    facts,
  };
}
