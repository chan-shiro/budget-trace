// [2] 検証ゲート — parsed データの自己整合性をチェックする。
// 予算・決算データは「合計 = 内訳の和」で自己検証できるのが強み。
// error が1件でもあれば needs_review になり、normalize は通らない。
// 使い方: bun run pipeline:validate <sourceId>
import { parsedDocSchema, type ValidationResult } from "./types";
import { parsedPath, readJson, validationPath, writeJson } from "./lib/store";

const sourceId = process.argv[2];
if (!sourceId) {
  console.error("使い方: bun run pipeline:validate <sourceId>");
  process.exit(1);
}
const doc = parsedDocSchema.parse(readJson(parsedPath(sourceId)));

const issues: ValidationResult["issues"] = [];
const seen = new Set<string>();

for (const f of doc.facts) {
  const tag = `${f.muniCode} ${f.muniName}`;

  // 団体コードの重複
  if (seen.has(f.muniCode)) {
    issues.push({ level: "error", muniCode: f.muniCode, message: `${tag}: 団体コードが重複` });
  }
  seen.add(f.muniCode);

  // 負値（決算額に負は原則ない）
  for (const [k, v] of Object.entries(f.expenditureByPurpose)) {
    if (v < 0) issues.push({ level: "error", muniCode: f.muniCode, message: `${tag}: ${k} が負値 (${v})` });
  }
  if (f.population != null && f.population <= 0) {
    issues.push({ level: "error", muniCode: f.muniCode, message: `${tag}: 人口が不正 (${f.population})` });
  }

  // 複数ファイル合成の取りこぼし（概況だけ・目的別だけの自治体）
  if (f.expenditureTotal == null) {
    issues.push({ level: "warning", muniCode: f.muniCode, message: `${tag}: 歳出総額が欠損（概況ファイルに行がない可能性）` });
  }
  if (Object.keys(f.expenditureByPurpose).length === 0) {
    issues.push({ level: "warning", muniCode: f.muniCode, message: `${tag}: 目的別歳出が欠損（目的別歳出内訳ファイルに行がない可能性）` });
  }

  // 目的別の和 ≒ 歳出総額（許容 0.5% / 5% 超は error）
  const purposeSum = Object.values(f.expenditureByPurpose).reduce((a, b) => a + b, 0);
  if (f.expenditureTotal != null && f.expenditureTotal > 0 && purposeSum > 0) {
    const diff = Math.abs(purposeSum - f.expenditureTotal) / f.expenditureTotal;
    if (diff > 0.05) {
      issues.push({
        level: "error",
        muniCode: f.muniCode,
        message: `${tag}: 目的別合計 ${purposeSum} と歳出総額 ${f.expenditureTotal} が ${(diff * 100).toFixed(1)}% 乖離`,
      });
    } else if (diff > 0.005) {
      issues.push({
        level: "warning",
        muniCode: f.muniCode,
        message: `${tag}: 目的別合計と歳出総額が ${(diff * 100).toFixed(2)}% 乖離（科目の取りこぼしの可能性）`,
      });
    }
  }

  // 形式収支（歳入−歳出）が大幅なマイナスは異常
  if (f.revenueTotal != null && f.expenditureTotal != null && f.revenueTotal < f.expenditureTotal * 0.9) {
    issues.push({
      level: "warning",
      muniCode: f.muniCode,
      message: `${tag}: 歳入総額が歳出総額を大きく下回る（歳入 ${f.revenueTotal} / 歳出 ${f.expenditureTotal}）`,
    });
  }
}

const status: ValidationResult["status"] = issues.some((i) => i.level === "error")
  ? "needs_review"
  : "ok";
const result: ValidationResult = {
  sourceId,
  validatedAt: new Date().toISOString(),
  status,
  issues,
};
writeJson(validationPath(sourceId), result);

const errors = issues.filter((i) => i.level === "error").length;
const warnings = issues.filter((i) => i.level === "warning").length;
console.log(`${status === "ok" ? "✓" : "✗"} ${sourceId}: ${status}（error ${errors} / warning ${warnings}、${doc.facts.length} 自治体）`);
for (const i of issues.slice(0, 20)) console.log(`  [${i.level}] ${i.message}`);
if (issues.length > 20) console.log(`  … 他 ${issues.length - 20} 件（data/parsed/${sourceId}.validation.json）`);
if (status === "ok") console.log(`  次: bun run pipeline:normalize ${sourceId}`);
process.exit(status === "ok" ? 0 : 1);
