// [1]→[2] raw ファイルをパーサに通し、Zod 検証済みの parsed JSON を出力する。
// 使い方: bun run pipeline:parse <sourceId>
import { findSource } from "./registry/sources";
import { getParser } from "./parsers/index";
import { parsedDocSchema } from "./types";
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
// 現状は 1ソース=1ファイル想定。複数ファイル化するときは facts を結合する。
const [file] = meta.files;
const path = resolveRawFile(sourceId, file.filename); // ハッシュ検証込み
const doc = parsedDocSchema.parse(parser(path, file.filename, source));
writeJson(parsedPath(sourceId), doc);
console.log(`✓ ${sourceId}: ${doc.facts.length} 自治体を抽出 → data/parsed/${sourceId}.json`);
console.log(`  次: bun run pipeline:validate ${sourceId}`);
