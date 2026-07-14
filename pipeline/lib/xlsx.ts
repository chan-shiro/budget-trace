// SheetJS(xlsx) のラッパ。**パーサは "xlsx" ではなくこのモジュールから import する。**
//
// SheetJS は 0.18.5 を最後に npm への公開を停止しており、脆弱性修正済みの版は公式 CDN
// （cdn.sheetjs.com）から入れている（package.json の devDependencies 参照）。その ESM ビルド
// （xlsx.mjs）は `readFile`/`writeFile` が fs を自動で掴まないため、明示的に注入しないと
// "Cannot access file ..." で落ちる（0.18.5 の CJS では自動で繋がっていた）。
// ここで一度だけ注入して re-export する。
import * as XLSX from "xlsx";
import * as fs from "node:fs";

XLSX.set_fs(fs);

export * from "xlsx";
export default XLSX;
