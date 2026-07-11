// [2] 検証ゲート — parsed データの自己整合性をチェックする。
// 予算・決算データは「合計 = 内訳の和」で自己検証できるのが強み。
// error が1件でもあれば needs_review になり、normalize は通らない。
// 使い方: bun run pipeline:validate <sourceId>
import { anyParsedDocSchema, type BudgetBookDoc, type ValidationResult } from "./types";
import { parsedPath, readJson, validationPath, writeJson } from "./lib/store";

const sourceId = process.argv[2];
if (!sourceId) {
  console.error("使い方: bun run pipeline:validate <sourceId>");
  process.exit(1);
}
const doc = anyParsedDocSchema.parse(readJson(parsedPath(sourceId)));

const issues: ValidationResult["issues"] = [];

/** 検証結果の書き出しと終了（両ドキュメント型共通の締め処理） */
function finish(count: number, unitLabel: string): never {
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
  console.log(`${status === "ok" ? "✓" : "✗"} ${sourceId}: ${status}（error ${errors} / warning ${warnings}、${count} ${unitLabel}）`);
  for (const i of issues.slice(0, 20)) console.log(`  [${i.level}] ${i.message}`);
  if (issues.length > 20) console.log(`  … 他 ${issues.length - 20} 件（data/parsed/${sourceId}.validation.json）`);
  if (status === "ok") console.log(`  次: bun run pipeline:normalize ${sourceId}`);
  process.exit(status === "ok" ? 0 : 1);
}

// ---- 予算書（款別）の検証 -----------------------------------------------------
function validateBudgetBook(d: BudgetBookDoc): void {
  for (const side of ["revenue", "expenditure"] as const) {
    const label = side === "revenue" ? "歳入" : "歳出";
    const lines = d.facts.filter((f) => f.side === side);
    const total = side === "revenue" ? d.revenueTotal : d.expenditureTotal;

    // 款番号の重複・欠番
    const nos = lines.map((f) => f.kanNo).sort((a, b) => a - b);
    for (let i = 0; i < nos.length; i++) {
      if (i > 0 && nos[i] === nos[i - 1]) {
        issues.push({ level: "error", message: `${label}: 款番号 ${nos[i]} が重複` });
      }
      if (nos[i] !== i + 1) {
        issues.push({ level: "warning", message: `${label}: 款番号が連番ではありません（${nos.join(",")}）` });
        break;
      }
    }
    // 負値（当初予算に負は原則ない）
    for (const f of lines) {
      if (f.amount < 0) issues.push({ level: "error", message: `${label} ${f.kanName}: 負値 (${f.amount})` });
    }
    // 合計 = 内訳の和（予算書は端数がないので厳密一致）
    const sum = lines.reduce((a, f) => a + f.amount, 0);
    if (sum !== total) {
      issues.push({
        level: "error",
        message: `${label}: 款の和 ${sum} が${label}合計 ${total} と一致しません（差 ${sum - total}）`,
      });
    }
  }
  // 当初予算は歳入と歳出が同額で編成される
  if (d.revenueTotal !== d.expenditureTotal) {
    issues.push({
      level: "error",
      message: `歳入合計 ${d.revenueTotal} と歳出合計 ${d.expenditureTotal} が一致しません（予算は同額編成のはず）`,
    });
  }

  // 主な事業一覧の整合
  if (d.projects) {
    const kanBudget = new Map(
      d.facts.filter((f) => f.side === "expenditure").map((f) => [f.kanName, f.amount]),
    );
    const seenNo = new Set<number>();
    let prevNo = 0;
    for (const p of d.projects) {
      const tag = `事業 No.${p.no}「${p.name}」`;
      if (seenNo.has(p.no)) issues.push({ level: "error", message: `${tag}: No が重複` });
      seenNo.add(p.no);
      if (p.no !== prevNo + 1) {
        issues.push({ level: "warning", message: `${tag}: No が連番ではありません（直前 ${prevNo}）` });
      }
      prevNo = p.no;
      if (p.amount <= 0) issues.push({ level: "error", message: `${tag}: 予算額が不正 (${p.amount})` });
      // 一般会計の款に属する事業は款予算を超えられない（特別会計セクションは対象外）
      const kb = kanBudget.get(p.kan);
      if (kb != null && p.amount > kb) {
        issues.push({ level: "error", message: `${tag}: 事業額 ${p.amount} が款「${p.kan}」の予算 ${kb} を超過` });
      }
      if (kb == null && !/会計$/.test(p.kan)) {
        issues.push({ level: "error", message: `${tag}: 款「${p.kan}」が歳出款別一覧にありません` });
      }
      if (p.basicGoal && !/^(ひと|まち|魅力)(・(ひと|まち|魅力))*$/.test(p.basicGoal)) {
        issues.push({ level: "warning", message: `${tag}: 基本目標が想定外（${p.basicGoal}）` });
      }
      if (!p.shisaku) issues.push({ level: "warning", message: `${tag}: 施策が空` });
    }
  }
}

if (doc.docType === "budget-book") {
  validateBudgetBook(doc);
  finish(doc.facts.length, "款");
}

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

finish(doc.facts.length, "自治体");
