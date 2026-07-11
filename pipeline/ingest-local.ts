// 手動ダウンロードしたファイルを raw 層に登録する（fetch の代替経路）。
// 使い方: bun run pipeline:ingest <sourceId> <ファイルパス>
import { basename } from "node:path";
import { existsSync } from "node:fs";
import { findSource } from "./registry/sources";
import { registerRawFile } from "./lib/store";

const [sourceId, filePath] = process.argv.slice(2);
if (!sourceId || !filePath) {
  console.error("使い方: bun run pipeline:ingest <sourceId> <ファイルパス>");
  process.exit(1);
}
findSource(sourceId); // 未登録ならここで一覧付きエラー
if (!existsSync(filePath)) {
  console.error(`ファイルがありません: ${filePath}`);
  process.exit(1);
}
const { meta } = registerRawFile(sourceId, filePath, `manual:${basename(filePath)}`);
const f = meta.files.find((x) => x.filename === basename(filePath))!;
console.log(`✓ ${sourceId}/${f.filename} を登録 (${f.bytes.toLocaleString()} bytes, sha256=${f.sha256.slice(0, 12)}…)`);
console.log(`  次: bun run pipeline:parse ${sourceId}`);
