// 開発用フィクスチャ Excel を生成して raw 層に登録する。
// 実データが投入できない環境でもパイプライン全体を end-to-end で検証するためのもの。
// 使い方: bun run pipeline:fixture
import * as XLSX from "../lib/xlsx";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { registerRawFile } from "../lib/store";

const SOURCE_ID = "fixture-shichoson-kessan-r6";

// 目的別の構成比（甲府市の款構成に似せたダミー。単位: 千円で出力）
const PURPOSES = [
  "議会費", "総務費", "民生費", "衛生費", "労働費", "農林水産業費", "商工費",
  "土木費", "消防費", "教育費", "公債費", "諸支出金",
] as const;
const SHARES = [0.007, 0.147, 0.42, 0.11, 0.002, 0.012, 0.015, 0.073, 0.027, 0.096, 0.087, 0.004];

// [団体コード, 都道府県名, 団体名, 人口, 歳出総額(千円)]
const MUNIS: [string, string, string, number, number][] = [
  ["192015", "山梨県", "甲府市", 186000, 80_800_000],
  ["192023", "山梨県", "富士吉田市", 46000, 26_400_000],
  ["202013", "長野県", "松本市", 239000, 105_300_000],
  ["202045", "長野県", "上田市", 153000, 66_100_000],
  ["222038", "静岡県", "沼津市", 187000, 80_100_000],
];

const header = ["団体コード", "都道府県名", "団体名", "住民基本台帳人口", "歳入総額", "歳出総額", ...PURPOSES];
const rows: (string | number)[][] = [header];
for (const [code, pref, name, pop, expTotal] of MUNIS) {
  // 目的別は構成比で按分し、端数は最後の科目で調整して「合計=内訳の和」を厳密に満たす
  const amounts = SHARES.map((s) => Math.round(expTotal * s));
  const diff = expTotal - amounts.reduce((a, b) => a + b, 0);
  amounts[amounts.length - 1] += diff;
  const revTotal = Math.round(expTotal * 1.025); // 形式収支ぶん歳入を上乗せ
  rows.push([code, pref, name, pop, revTotal, expTotal, ...amounts]);
}

const ws = XLSX.utils.aoa_to_sheet(rows);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "決算状況調");
const tmp = join(tmpdir(), "fixture-shichoson-kessan-r6.xlsx");
XLSX.writeFile(wb, tmp);

registerRawFile(SOURCE_ID, tmp, "generated:pipeline/dev/make-fixture.ts");
console.log(`✓ フィクスチャを生成・登録しました → data/raw/${SOURCE_ID}/`);
console.log(`  次: bun run pipeline:parse ${SOURCE_ID}`);
