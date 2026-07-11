// [1]→[2] raw ファイルをパーサに通し、Zod 検証済みの parsed JSON を出力する。
// 使い方: bun run pipeline:parse <sourceId>
import { findSource } from "./registry/sources";
import { getParser } from "./parsers/index";
import { anyParsedDocSchema } from "./types";
import { parsedPath, readRawMeta, resolveRawFile, writeJson } from "./lib/store";

const sourceId = process.argv[2];
if (!sourceId) {
  console.error("使い方: bun run pipeline:parse <sourceId>");
  process.exit(1);
}
const source = findSource(sourceId);
const meta = readRawMeta(sourceId);
if (!meta) {
  console.error(`${sourceId}: raw がありません。先に pipeline:fetch / pipeline:ingest を実行してください。`);
  process.exit(1);
}

const parser = getParser(source.parser);
// 1ソース=複数ファイル可。パーサが団体コードで facts をマージする
const files = meta.files.map((f) => ({
  path: resolveRawFile(sourceId, f.filename), // ハッシュ検証込み
  filename: f.filename,
}));
const doc = anyParsedDocSchema.parse(parser(files, source));
writeJson(parsedPath(sourceId), doc);
const what = doc.docType === "municipal-accounts" ? "自治体" : "款";
console.log(
  `✓ ${sourceId}: ${files.length} ファイルから ${doc.facts.length} ${what}を抽出 → data/parsed/${sourceId}.json`,
);
console.log(`  次: bun run pipeline:validate ${sourceId}`);
