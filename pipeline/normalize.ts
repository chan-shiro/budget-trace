// [2]→[3] 検証済み parsed を比較可能な normalized データセットへ変換する。
// - 自治体は団体コード（JIS X 0402・6桁）で識別
// - 目的別歳出は標準科目（STANDARD_PURPOSES）へマッピング。未知の科目は「その他」へ
//   寄せず error にする（黙って分類を変えない）
// - 各レコードに来歴（sourceId + ファイルの sha256 + locator）を残す
// 使い方: bun run pipeline:normalize <sourceId> [--force]
import {
  anyParsedDocSchema,
  normalizedDatasetSchema,
  validationResultSchema,
  STANDARD_PURPOSES,
  type NormalizedMuniAccount,
  type StandardPurpose,
} from "./types";
import { findSource } from "./registry/sources";
import {
  normalizedPath,
  parsedPath,
  readJson,
  readRawMeta,
  validationPath,
  writeJson,
} from "./lib/store";

const sourceId = process.argv[2];
const force = process.argv.includes("--force");
if (!sourceId) {
  console.error("使い方: bun run pipeline:normalize <sourceId> [--force]");
  process.exit(1);
}
const source = findSource(sourceId);
const doc = anyParsedDocSchema.parse(readJson(parsedPath(sourceId)));
if (doc.docType === "budget-book") {
  // 予算書は自治体間比較のレイヤではなく単一自治体の款別データ。
  // アプリへは pipeline:derive で parsed から直接導出する（validate 通過が前提）
  console.log(
    `– ${sourceId}: budget-book は normalize 対象外です。validate 通過後、pipeline:derive で利用します。`,
  );
  process.exit(0);
}
const validation = validationResultSchema.parse(readJson(validationPath(sourceId)));
if (validation.status !== "ok" && !force) {
  console.error(
    `✗ ${sourceId} は ${validation.status} のため normalize しません。` +
      `問題を解消するか、確認済みなら --force を付けてください。`,
  );
  process.exit(1);
}

const rawMeta = readRawMeta(sourceId);
// locator が指すファイルのハッシュを来歴として残す（1ソース=複数ファイル対応）
const sha256ByFile = new Map<string, string>(
  (rawMeta?.files ?? []).map((f) => [f.filename, f.sha256]),
);
const standardSet = new Set<string>(STANDARD_PURPOSES);

const records: NormalizedMuniAccount[] = doc.facts.map((f) => {
  const byPurpose: Partial<Record<StandardPurpose, number>> = {};
  for (const [k, v] of Object.entries(f.expenditureByPurpose)) {
    if (!standardSet.has(k)) {
      throw new Error(
        `${f.muniName}: 未知の目的別科目「${k}」。STANDARD_PURPOSES への追加かマッピングを検討してください。`,
      );
    }
    byPurpose[k as StandardPurpose] = v;
  }
  return {
    muniCode: f.muniCode,
    prefName: f.prefName,
    muniName: f.muniName,
    fiscalYear: source.fiscalYear,
    population: f.population,
    revenueTotal: f.revenueTotal,
    expenditureTotal: f.expenditureTotal,
    expenditureByPurpose: byPurpose,
    expenditurePerCapitaYen:
      f.population && f.expenditureTotal != null
        ? Math.round((f.expenditureTotal * 1000) / f.population)
        : null,
    sourceRef: {
      sourceId,
      sha256: sha256ByFile.get(f.locator.file) ?? "unknown",
      locator: f.locator,
    },
  };
});

const dataset = normalizedDatasetSchema.parse({
  dataset: "municipal-accounts",
  fiscalYear: source.fiscalYear,
  unit: "thousandYen",
  generatedAt: new Date().toISOString(),
  sources: (rawMeta?.files ?? []).map((f) => ({ sourceId, sha256: f.sha256 })),
  records,
});

const out = normalizedPath("municipal-accounts", source.fiscalYear, !!source.fixture);
writeJson(out, dataset);
console.log(
  `✓ ${sourceId}: ${records.length} 自治体 → ${out.replace(process.cwd() + "/", "")}` +
    (source.fixture ? "（フィクスチャ隔離）" : ""),
);
