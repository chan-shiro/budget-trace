// 練馬区「一般会計歳入歳出予算款別一覧表」XLSX パーサ（#125）
//
// 区オープンデータサイトの款別 XLSX（歳入・歳出の2ファイル/年度・H23〜R8 の16年）。
// 都カタログ t131202d0000000008 に同一実体が登載＝**データ自体が CC BY 4.0**（世田谷・千代田と
// 同じ「予算データ自体がオープン」組）。既存パーサは PDF/CSV 前提のため XLSX 用に新設。
//
// 列構造（全16年で不変・偵察 2026-07-23 実測）:
//   A=款（款番号密着款名 `1特別区税` 型）/ B=当年度額 / C=構成比% / D=前年度額 / E=構成比% /
//   F=増減 / G=前年度比%（`皆増`/`皆減` の文字列が混ざる — 使わない）。
//   行1がヘッダ（B1 が `令和８年度歳入額` 等 → **年度突合に使う**）、末尾に合計行（A=`歳入合計` 等）。
//
// クセ（すべて偵察の実測）:
// - **シート名が揺れる**（`Sheet1` / `"Sheet1 "`（末尾スペース）/ `R7` / `R8`）→ 先頭シート固定
// - **単位が年度で違う**: H23〜H29=円 / H30〜R8=千円。⚠ **発行元の注記はどちらも当てにならない**
//   （都カタログは「円単位」・区ページは「千円単位」と一律表記で半分ずつ誤り。H29→H30 の
//   クロスチェックが factor=1000 で全款一致することから確定）。registry の parserOptions.unit で
//   明示し、円年度は ÷1000 で千円へ正規化（**端数が出たら throw** — 実測で全値が1000の倍数）
// - **A列が空の継続行**（H24 の「（　）書きの修正後前年度額」— 負数や文字列）→ 読み飛ばす
// - **番号なしの款行は捨てない**（R2〜R4 歳入の ` 自動車取得税交付金`＝廃止款・前年度額のみ）。
//   kanNo=null で保持（落とすと前年度Σが割れる）
// - 前年度セルの `-` は 0 扱い（R1 歳入の環境性能割交付金＝皆増）
import XLSX from "../lib/xlsx";
import type { BudgetBookDoc, BudgetLineFact, SourceEntry } from "../types";
import { eraYear } from "../lib/fy";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /** 金額の単位（原典）。"yen" は千円へ正規化する（端数が出たら throw） */
  unit: "yen" | "thousandYen";
}

const toHalfDigits = (s: string) => s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
const compact = (s: string) => s.replace(/[\s　]/g, "");

function toAmount(v: unknown, unit: "yen" | "thousandYen", where: string): number | null {
  if (v == null || v === "" || v === "-" || v === "－") return null;
  const n = typeof v === "number" ? v : Number(String(v).replace(/[,、\s　]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`${where}: 金額を解釈できません: ${String(v)}`);
  if (unit === "thousandYen") return n;
  if (n % 1000 !== 0) {
    throw new Error(`${where}: 円単位のはずの値 ${n} が 1000 の倍数ではありません（単位の取り違え？）`);
  }
  return n / 1000;
}

function parseSide(
  path: string,
  filename: string,
  side: "revenue" | "expenditure",
  source: SourceEntry,
  unit: "yen" | "thousandYen",
): { lines: BudgetLineFact[]; total: number; prevTotal: number } {
  const wb = XLSX.readFile(path);
  const sheetName = wb.SheetNames[0]!; // シート名は年度で揺れる（Sheet1 / "Sheet1 " / R8）— 先頭固定
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]!, { header: 1 }) as unknown[][];
  if (rows.length < 3) throw new Error(`${filename}: 行数が少なすぎます（${rows.length}）`);

  // 年度突合: B1 ヘッダ（`令和８年度歳入額` / `平成２９年度歳出額`）と fiscalYear・側の両方を照合
  const b1 = toHalfDigits(compact(String(rows[0]?.[1] ?? "")));
  const era = `${eraYear(source.fiscalYear ?? "")}年度`;
  // R1 の資料表記は「令和元年度」（eraYear は 令和1）— 元/1 の両方を受ける
  const eraAlt = era.replace("令和1年度", "令和元年度");
  if (!(b1.includes(era) || b1.includes(eraAlt))) {
    throw new Error(`${filename}: B1「${rows[0]?.[1]}」が ${source.fiscalYear}（${era}）と一致しません（別年度のファイル？）`);
  }
  const sideLabel = side === "revenue" ? "歳入" : "歳出";
  if (!b1.includes(sideLabel)) {
    throw new Error(`${filename}: B1「${rows[0]?.[1]}」に「${sideLabel}」がありません（側の取り違え？）`);
  }

  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i] ?? [];
    const a = compact(String(r[0] ?? ""));
    if (!a) continue; // A列が空の行（H24 の（　）書き修正後前年度額の継続行等）は構造外
    const where = `${filename} 行${i + 1}`;
    if (a === `${sideLabel}合計`) {
      if (total != null) throw new Error(`${where}: 合計行が2回あります`);
      total = toAmount(r[1], unit, where) ?? 0;
      prevTotal = toAmount(r[3], unit, where) ?? 0;
      continue;
    }
    // 款行: `1特別区税` 型（番号密着）または番号なし（廃止款 ` 自動車取得税交付金`）
    const m = toHalfDigits(a).match(/^(\d{1,2})(.+)$/);
    const kanNo = m ? Number(m[1]) : null;
    const kanName = m ? m[2]! : a;
    if (!/[぀-ヿ㐀-鿿]/.test(kanName)) continue; // 日本語を含まない行（注記等）は款ではない
    const amount = toAmount(r[1], unit, where) ?? 0;
    const prevAmount = toAmount(r[3], unit, where);
    lines.push({
      side,
      kanNo,
      kanName,
      amount,
      prevAmount: prevAmount ?? 0, // `-` は皆増（前年度 0）
      locator: { file: filename, sheet: sheetName, row: i + 1 },
    });
  }
  if (lines.length === 0) throw new Error(`${filename}: 款行が1件も抽出できませんでした`);
  if (total == null || prevTotal == null) throw new Error(`${filename}: 合計行（${sideLabel}合計）が見つかりません`);
  return { lines, total, prevTotal };
}

export function parseNerimaKanbetsuXlsx(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const opts = source.parserOptions as unknown as Options;
  if (opts?.unit !== "yen" && opts?.unit !== "thousandYen") {
    throw new Error(`${source.id}: parserOptions.unit（"yen" | "thousandYen"）が必要です（単位は年度で違い、発行元の注記は当てにならない — parsers のコメント参照）`);
  }
  const revFile = files.find((f) => /sainyu/.test(f.filename));
  const expFile = files.find((f) => /saishutu/.test(f.filename));
  if (!revFile || !expFile) {
    throw new Error(`${source.id}: 歳入/歳出の XLSX が揃っていません: ${files.map((f) => f.filename).join(", ")}`);
  }
  const rev = parseSide(revFile.path, revFile.filename, "revenue", source, opts.unit);
  const exp = parseSide(expFile.path, expFile.filename, "expenditure", source, opts.unit);
  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: "nerima-kanbetsu-xlsx",
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
