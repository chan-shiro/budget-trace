// [2] 検証ゲート — parsed データの自己整合性をチェックする。
// 予算・決算データは「合計 = 内訳の和」で自己検証できるのが強み。
// error が1件でもあれば needs_review になり、normalize は通らない。
// 使い方: bun run pipeline:validate <sourceId>
import {
  anyParsedDocSchema,
  type BudgetBookDoc,
  type BudgetExecutionDoc,
  type ValidationResult,
} from "./types";
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

    // **前年度も同じゲートに掛ける**（2026-07-15 追加）。ここを検査していなかったため、
    // 前年度列だけが静かに壊れる事故を長く見逃していた:
    //   - 甲府 R2 の款6「法人事業税交付金」は前年度欄が空（皆増＝当年度に新設）で、
    //     パーサが「比較」列を前年度として読み +190,691 ずれていた（画面に増減0と表示）
    //   - 同 R2 の「廃款（自動車取得税交付金）」は款番号欄が数字でないため行ごと落ち −76,900
    // 当年度 Σ は両方の誤りが相殺して一致していたので、当年度だけの検査では捕まらない。
    // 廃止税目の行（款番号が △/▲/廃款）は款として表現できず prevAmount に載らないため、
    // error ではなく warning にして「既知の欠落」と「新しいバグ」を人が判別できるようにする。
    const prevTotal = side === "revenue" ? d.prevRevenueTotal : d.prevExpenditureTotal;
    const prevs = lines.map((f) => f.prevAmount).filter((v): v is number => v != null);
    if (prevTotal != null && prevs.length === lines.length) {
      const prevSum = prevs.reduce((a, v) => a + v, 0);
      if (prevSum !== prevTotal) {
        issues.push({
          level: "warning",
          message:
            `${label}: 款の前年度の和 ${prevSum} が${label}前年度合計 ${prevTotal} と一致しません（差 ${prevSum - prevTotal}）。` +
            `廃止税目の行（款番号が △/▲/廃款）が款として拾えない既知の欠落か、前年度欄が空の款で「比較」列を誤読している可能性があります`,
        });
      }
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
    // 施策・基本目標は甲府の様式のみ持つ。1件も無い様式（豊川・和泉）では欠落を警告しない
    const usesStrategy = d.projects.some((p) => p.shisaku || p.basicGoal);
    const seenNo = new Set<number>();
    let prevNo = 0;
    for (const p of d.projects) {
      const tag = p.no != null ? `事業 No.${p.no}「${p.name}」` : `事業「${p.name}」`;
      // No・款は表形式（R6〜）のみ。箇条書き形式（R2・R3）は null なので対象外
      if (p.no != null) {
        if (seenNo.has(p.no)) issues.push({ level: "error", message: `${tag}: No が重複` });
        seenNo.add(p.no);
        if (p.no !== prevNo + 1) {
          issues.push({ level: "warning", message: `${tag}: No が連番ではありません（直前 ${prevNo}）` });
        }
        prevNo = p.no;
      }
      // 負値はパース誤り。0 は原典どおり（笛吹の一般財源0の重点事業など）なので warning
      if (p.amount < 0) issues.push({ level: "error", message: `${tag}: 予算額が不正 (${p.amount})` });
      else if (p.amount === 0) issues.push({ level: "warning", message: `${tag}: 予算額が0（原典どおりか確認）` });
      if (p.kan != null) {
        // 一般会計の款に属する事業は款予算を超えられない（特別会計セクションは対象外）
        const kb = kanBudget.get(p.kan);
        if (kb != null && p.amount > kb) {
          issues.push({ level: "error", message: `${tag}: 事業額 ${p.amount} が款「${p.kan}」の予算 ${kb} を超過` });
        }
        if (kb == null && !/会計$/.test(p.kan)) {
          issues.push({ level: "error", message: `${tag}: 款「${p.kan}」が歳出款別一覧にありません` });
        }
        if (usesStrategy && !p.shisaku) issues.push({ level: "warning", message: `${tag}: 施策が空` });
      }
      // R8〜: 第七次総合計画（ひと/まち/魅力）。R6・R7: 第六次総合計画（基本目標1〜4・基本構想の推進）
      const goalToken = "(ひと|まち|魅力|基本目標[1-4１-４]|基本構想の推進)";
      if (p.basicGoal && !new RegExp(`^${goalToken}(・${goalToken})*$`).test(p.basicGoal)) {
        issues.push({ level: "warning", message: `${tag}: 基本目標が想定外（${p.basicGoal}）` });
      }
    }
  }
}

if (doc.docType === "budget-book") {
  validateBudgetBook(doc);
  finish(doc.facts.length, "款");
}

// ---- 予算執行状況（財政事情の公表）の検証 -------------------------------------
function validateBudgetExecution(d: BudgetExecutionDoc): void {
  for (const side of ["revenue", "expenditure"] as const) {
    const label = side === "revenue" ? "歳入" : "歳出";
    const lines = d.facts.filter((f) => f.side === side);
    const budgetTotal = side === "revenue" ? d.revenueBudgetTotal : d.expenditureBudgetTotal;
    const settledTotal = side === "revenue" ? d.revenueSettledTotal : d.expenditureSettledTotal;

    // 合計 = 内訳の和（万円→千円変換のみなので厳密一致）
    const bSum = lines.reduce((a, f) => a + f.currentBudget, 0);
    const sSum = lines.reduce((a, f) => a + f.settled, 0);
    if (bSum !== budgetTotal) {
      issues.push({ level: "error", message: `${label}: 予算現額の和 ${bSum} が合計 ${budgetTotal} と一致しません（差 ${bSum - budgetTotal}）` });
    }
    if (sSum !== settledTotal) {
      issues.push({ level: "error", message: `${label}: 済額の和 ${sSum} が合計 ${settledTotal} と一致しません（差 ${sSum - settledTotal}）` });
    }
    for (const f of lines) {
      if (f.currentBudget < 0 || f.settled < 0) {
        issues.push({ level: "error", message: `${label} ${f.name}: 負値 (${f.currentBudget} / ${f.settled})` });
      }
      // 資料記載の率と 済額/現額 の再計算が一致するか（記載は小数1桁・四捨五入）
      if (f.ratePct != null && f.currentBudget > 0) {
        const calc = (f.settled / f.currentBudget) * 100;
        if (Math.abs(calc - f.ratePct) > 0.06) {
          issues.push({
            level: "warning",
            message: `${label} ${f.name}: 記載率 ${f.ratePct}% と再計算 ${calc.toFixed(2)}% が乖離（列の取り違えの可能性）`,
          });
        }
      }
    }
  }
  if (d.population != null && d.population <= 0) {
    issues.push({ level: "error", message: `人口が不正 (${d.population})` });
  }
}

if (doc.docType === "budget-execution") {
  validateBudgetExecution(doc);
  finish(doc.facts.length, "款");
}

// ---- 統計書 財政章（款項×当初/最終/決算） --------------------------------------
if (doc.docType === "budget-outturn") {
  for (const side of ["revenue", "expenditure"] as const) {
    const label = side === "revenue" ? "歳入" : "歳出";
    const lines = doc.facts.filter((f) => f.side === side);
    const kans = lines.filter((f) => f.kouName == null);
    const total = side === "revenue" ? doc.revenueTotal : doc.expenditureTotal;
    // 総額 = Σ款 / 款 = Σ項（円単位の厳密一致）
    for (const key of ["initialBudget", "finalBudget", "settled"] as const) {
      const kanSum = kans.reduce((a, f) => a + f[key], 0);
      const totalVal = total[key === "initialBudget" ? "initial" : key === "finalBudget" ? "final" : "settled"];
      if (kanSum !== totalVal) {
        issues.push({ level: "error", message: `${label} ${key}: 款の和 ${kanSum} が総額 ${totalVal} と一致しません（差 ${kanSum - totalVal}）` });
      }
      for (const kan of kans) {
        const kous = lines.filter((f) => f.kouName != null && f.kanName === kan.kanName);
        if (kous.length === 0) continue;
        const kouSum = kous.reduce((a, f) => a + f[key], 0);
        if (kouSum !== kan[key]) {
          issues.push({ level: "error", message: `${label} ${kan.kanName} ${key}: 項の和 ${kouSum} が款 ${kan[key]} と一致しません（差 ${kouSum - kan[key]}）` });
        }
      }
    }
    for (const f of lines) {
      if (f.initialBudget < 0 || f.finalBudget < 0 || f.settled < 0) {
        issues.push({ level: "error", message: `${label} ${f.kanName}${f.kouName ? "/" + f.kouName : ""}: 負値` });
      }
    }
  }
  finish(doc.facts.length, "款項");
}

// ---- 行政評価（事務事業評価） -------------------------------------------------
if (doc.docType === "project-evaluation") {
  const seenNames = new Set<string>();
  for (const f of doc.facts) {
    // 同名事業は原則ないが、部・課違いの再掲があり得るため warning に留める
    if (seenNames.has(f.name)) {
      issues.push({ level: "warning", message: `事業「${f.name}」が重複しています（再掲の可能性）` });
    }
    seenNames.add(f.name);
    if (f.scoreTotal != null && (f.scoreTotal < 6 || f.scoreTotal > 24)) {
      issues.push({ level: "error", message: `事業「${f.name}」: 合計点数が範囲外 (${f.scoreTotal})` });
    }
  }
  if (doc.facts.length < 10) {
    issues.push({ level: "warning", message: `事業数が少なすぎます（${doc.facts.length}件）— 取りこぼしの可能性` });
  }
  finish(doc.facts.length, "事業");
}

// ---- 決算状況調(4)性質別・(5)地方債 -----------------------------------------
if (doc.docType === "municipal-nature") {
  const MAIN = ["人件費", "物件費", "扶助費", "普通建設事業費", "公債費"];
  const seenNature = new Set<string>();
  for (const f of doc.facts) {
    if (seenNature.has(f.muniCode)) issues.push({ level: "error", message: `団体コード ${f.muniCode} が重複` });
    seenNature.add(f.muniCode);
    // 主要性質が揃っているか（様式変更や列ずれの検知）
    for (const nm of MAIN) {
      if (!(nm in f.byNature)) issues.push({ level: "error", message: `${f.muniCode}: 性質「${nm}」が欠落` });
    }
    // natureTotal = Σ byNature（丸めなし・厳密）。歳出総額との突合は derive で実施
    const sum = Object.values(f.byNature).reduce((a, b) => a + b, 0);
    if (sum !== f.natureTotal) {
      issues.push({ level: "error", message: `${f.muniCode}: natureTotal ${f.natureTotal} ≠ Σ性質 ${sum}` });
    }
    if (f.byNature["公債費"]! < 0 || f.natureTotal <= 0) {
      issues.push({ level: "error", message: `${f.muniCode}: 性質額が不正（公債費<0 または 総額≤0）` });
    }
  }
  if (doc.facts.length < 700) {
    issues.push({ level: "warning", message: `自治体数が少なすぎます（${doc.facts.length}）— 取りこぼしの可能性` });
  }
  finish(doc.facts.length, "自治体");
}

// ---- 議会の構成（会派別議席数）＋当初予算の議決 -------------------------------
if (doc.docType === "council-composition") {
  const seenFaction = new Set<string>();
  for (const f of doc.factions) {
    if (seenFaction.has(f.name)) issues.push({ level: "error", message: `会派「${f.name}」が重複` });
    seenFaction.add(f.name);
    if (f.seats <= 0) issues.push({ level: "error", message: `会派「${f.name}」の議席数が不正 (${f.seats})` });
  }
  // 会派の議席合計 = 定数（当市は現員=定数）。ズレは名簿とりこぼしの兆候
  const sum = doc.factions.reduce((s, f) => s + f.seats, 0);
  if (sum !== doc.seats) {
    issues.push({ level: "error", message: `会派議席の和 ${sum} が定数 ${doc.seats} と一致しません` });
  }
  if (doc.factions.length < 2) {
    issues.push({ level: "warning", message: `会派数が少なすぎます（${doc.factions.length}）— 取りこぼしの可能性` });
  }
  // 議決の必須項目
  const r = doc.resolution;
  if (!r.billName.includes("予算")) issues.push({ level: "error", message: `議決の件名が予算ではありません: ${r.billName}` });
  if (!/可決|否決|修正/.test(r.result)) issues.push({ level: "warning", message: `議決結果が想定外: ${r.result}` });
  finish(doc.factions.length, "会派");
}

// ---- 事業報告（成果）＝事務事業評価 詳細票 -----------------------------------
if (doc.docType === "project-report") {
  const seenNo = new Set<string>();
  for (const f of doc.facts) {
    if (seenNo.has(f.no)) issues.push({ level: "error", message: `詳細票 No.${f.no} が重複` });
    seenNo.add(f.no);
    if (!f.cost.length) issues.push({ level: "error", message: `${f.name}: コスト経年が空` });
    // 事業費がどの年度も取れていない＝列ずれの疑い
    if (f.cost.every((c) => c.jigyohi == null)) {
      issues.push({ level: "error", message: `${f.name}: 事業費が全年度 null（列ずれの可能性）` });
    }
    // 実績値のある成果/活動指標が1つも無い＝目標達成状況の取りこぼし
    const hasActual = f.indicators.some((i) => i.actuals.some((v) => v != null));
    if (f.indicators.length > 0 && !hasActual) {
      issues.push({ level: "warning", message: `${f.name}: 指標の実績値が全て null` });
    }

    // ---- 算術の自己検証（川崎の事務事業評価シート。持たない資料は該当列が null で素通り）----
    // **列の取り違えを算術で検出する**のが狙い。実装中にこの2本が年度ずれ・人件費の欠落・
    // ヘッダの読み違いを実際に捕まえた（docs §8c）。
    for (const c of f.cost) {
      const at = `${f.name} ${c.fy}${c.kind}`;
      // ①総コスト = 事業費A + 人件費B
      if (c.jigyohi != null && c.jinkenhi != null && c.totalCost != null) {
        const d = c.jigyohi + c.jinkenhi - c.totalCost;
        if (d !== 0) {
          // 人件費Bは「職員1人当たり人件費 × 人工」の計算値なので**原典側に±1千円の丸め**が出る
          // （川崎 R6 の「明るい町づくり対策」3列が該当）。それを超える差はパースの誤り。
          issues.push({
            level: Math.abs(d) <= 1 ? "warning" : "error",
            message:
              `${at}: 総コスト ${c.totalCost} が 事業費A ${c.jigyohi} + 人件費B ${c.jinkenhi} = ${c.jigyohi + c.jinkenhi} と一致しません（差 ${d}）` +
              (Math.abs(d) <= 1 ? "。人件費は人工との積なので原典側の丸めの範囲" : "。列の対応が誤っている可能性"),
          });
        }
      }
      // ②財源内訳（国庫支出金＋市債＋その他特財＋一般財源）の和 = 事業費A
      const zaigen = [c.kokkoShishutsukin, c.shisai, c.sonotaTokuzai, c.ippanZaigen];
      if (c.jigyohi != null && zaigen.every((v) => v != null)) {
        const sum = zaigen.reduce((a: number, v) => a + (v as number), 0);
        if (sum !== c.jigyohi) {
          issues.push({
            level: "error",
            message: `${at}: 財源内訳の和 ${sum} が 事業費A ${c.jigyohi} と一致しません（差 ${sum - c.jigyohi}）`,
          });
        }
      }
    }
    // 達成度は「取れなかった」と「資料に無い」を区別する — 川崎は全事業が持つはずで、
    // 分布が概要 PDF の記載と一致することを下でまとめて確認する
    if (f.achievement == null && f.direction != null) {
      issues.push({ level: "warning", message: `${f.name}: 方向性区分はあるのに達成度が取れていません` });
    }
  }
  if (doc.facts.length === 0) issues.push({ level: "error", message: `詳細票が0件` });
  finish(doc.facts.length, "詳細票");
}

if (doc.docType !== "municipal-accounts") {
  throw new Error(`未知の docType: ${(doc as { docType: string }).docType}`);
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

  // 項レベル内訳の和 = 款（資料は整数の千円なので厳密一致）
  for (const [kan, detail] of Object.entries(f.expenditureByPurposeDetail ?? {})) {
    const kanTotal = f.expenditureByPurpose[kan];
    if (kanTotal == null) {
      issues.push({ level: "warning", muniCode: f.muniCode, message: `${tag}: ${kan} の内訳はあるが款の総額がない` });
      continue;
    }
    const sum = Object.values(detail).reduce((a, b) => a + b, 0);
    if (sum !== kanTotal) {
      issues.push({
        level: "error",
        muniCode: f.muniCode,
        message: `${tag}: ${kan} の項の和 ${sum} が款 ${kanTotal} と一致しません（差 ${sum - kanTotal}）`,
      });
    }
  }

  // 歳入科目の和 = 歳入総額（どちらも決算額なので原則一致）
  if (f.revenueByCategory && f.revenueTotal != null) {
    const sum = Object.values(f.revenueByCategory).reduce((a, b) => a + b, 0);
    if (sum !== f.revenueTotal) {
      const diff = Math.abs(sum - f.revenueTotal) / f.revenueTotal;
      issues.push({
        level: diff > 0.005 ? "error" : "warning",
        muniCode: f.muniCode,
        message: `${tag}: 歳入科目の和 ${sum} が歳入総額 ${f.revenueTotal} と一致しません（差 ${sum - f.revenueTotal}）`,
      });
    }
  }
  // 歳入内訳の和 vs 科目総額。「うち〜」の部分列挙は Σ ≤ 総額のみ確認
  for (const [cat, detail] of Object.entries(f.revenueByCategoryDetail ?? {})) {
    const catTotal = f.revenueByCategory?.[cat];
    if (catTotal == null) continue;
    const names = Object.keys(detail);
    const sum = Object.values(detail).reduce((a, b) => a + b, 0);
    const isPartial = names.some((n) => n.startsWith("うち"));
    if (isPartial) {
      if (sum > catTotal) {
        issues.push({ level: "error", muniCode: f.muniCode, message: `${tag}: ${cat} の内訳（うち〜）の和 ${sum} が総額 ${catTotal} を超過` });
      }
    } else if (sum !== catTotal) {
      issues.push({
        level: "error",
        muniCode: f.muniCode,
        message: `${tag}: ${cat} の内訳の和 ${sum} が総額 ${catTotal} と一致しません（差 ${sum - catTotal}）`,
      });
    }
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
