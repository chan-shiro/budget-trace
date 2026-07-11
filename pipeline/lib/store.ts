// data/ 階層の入出力ヘルパ。
// - data/raw/<sourceId>/         バイナリ本体（原本アーカイブとしてコミット。
//                                フィクスチャの raw だけ gitignore・再生成可能）
// - data/raw-meta/<sourceId>.json 取得来歴（コミット対象。ハッシュで raw を固定）
// - data/parsed/<sourceId>.json   抽出結果（コミット対象）
// - data/parsed/<sourceId>.validation.json 検証結果
// - data/normalized/<dataset>/<fy>.json     比較可能データ（コミット対象）
// - data/normalized/_fixtures/…             フィクスチャ由来の隔離出力
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { rawMetaSchema, type RawMeta } from "../types";

export const DATA_DIR = join(process.cwd(), "data");
export const rawDir = (sourceId: string) => join(DATA_DIR, "raw", sourceId);
export const rawMetaPath = (sourceId: string) => join(DATA_DIR, "raw-meta", `${sourceId}.json`);
export const parsedPath = (sourceId: string) => join(DATA_DIR, "parsed", `${sourceId}.json`);
export const validationPath = (sourceId: string) =>
  join(DATA_DIR, "parsed", `${sourceId}.validation.json`);
export const normalizedPath = (dataset: string, fiscalYear: string, fixture: boolean) =>
  join(DATA_DIR, "normalized", ...(fixture ? ["_fixtures"] : []), dataset, `${fiscalYear}.json`);

export function sha256Of(filePath: string): string {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

export function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + "\n", "utf8");
}

export function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function readRawMeta(sourceId: string): RawMeta | null {
  const p = rawMetaPath(sourceId);
  if (!existsSync(p)) return null;
  return rawMetaSchema.parse(readJson(p));
}

/**
 * ファイルを raw 層に登録する（fetch / ingest-local 共通）。
 * 既存メタとハッシュが違う場合は「資料が更新された」ことを警告して上書きする。
 */
export function registerRawFile(
  sourceId: string,
  srcFilePath: string,
  fetchedFrom: string,
): { meta: RawMeta; changed: boolean } {
  const dir = rawDir(sourceId);
  mkdirSync(dir, { recursive: true });
  const filename = basename(srcFilePath);
  const dest = join(dir, filename);
  if (srcFilePath !== dest) copyFileSync(srcFilePath, dest);

  const entry = {
    filename,
    sha256: sha256Of(dest),
    bytes: readFileSync(dest).byteLength,
    fetchedAt: new Date().toISOString(),
    fetchedFrom,
  };

  const prev = readRawMeta(sourceId);
  const prevEntry = prev?.files.find((f) => f.filename === filename);
  const changed = !!prevEntry && prevEntry.sha256 !== entry.sha256;
  if (changed) {
    console.warn(
      `⚠ ${sourceId}/${filename}: ハッシュが前回と異なります（資料が更新された可能性）。\n` +
        `  旧: ${prevEntry!.sha256}\n  新: ${entry.sha256}`,
    );
  }

  const files = [...(prev?.files.filter((f) => f.filename !== filename) ?? []), entry];
  const meta: RawMeta = rawMetaSchema.parse({ sourceId, files });
  writeJson(rawMetaPath(sourceId), meta);
  return { meta, changed };
}

/** raw 層のファイルがメタのハッシュと一致するか検証してからパスを返す */
export function resolveRawFile(sourceId: string, filename: string): string {
  const meta = readRawMeta(sourceId);
  const entry = meta?.files.find((f) => f.filename === filename);
  if (!meta || !entry) {
    throw new Error(
      `${sourceId} の raw メタがありません。先に pipeline:fetch か pipeline:ingest を実行してください。`,
    );
  }
  const path = join(rawDir(sourceId), filename);
  if (!existsSync(path)) {
    throw new Error(
      `${path} がありません。fetch/ingest で再取得してください（フィクスチャは pipeline:fixture で再生成）。`,
    );
  }
  const actual = sha256Of(path);
  if (actual !== entry.sha256) {
    throw new Error(
      `${path} のハッシュがメタと一致しません。来歴が壊れています。\n` +
        `  メタ: ${entry.sha256}\n  実体: ${actual}`,
    );
  }
  return path;
}
