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
import { fyRank } from "./lib/fy";

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
// 款名に紛れ込む「表ヘッダ・単位・注記の断片」（2026-07-16 追加）。
//
// **Σ が守らない領域を、語彙で守る**（§2-4）。折返しの取りこぼしやヘッダ行の連結は
// **金額が正しいまま款名だけ壊す**ので、Σ も款名重複ゲートも素通りする。実害の履歴:
//   横浜「千円千円千円市税」・神戸「一般財源…議会費」・岡山「歳ゴルフ場利用税交付金」・
//   仙台「交付金地方特例交付金」・江東「歳入特別区税」・葛飾「款名特別区税」・中央「（特別区債）－」
//   → **いずれも画面を見て気づいた**。2026-07-16 に全224ソースを機械的に洗ったところ、
//     **横浜 R3 の「一般財源国県支出金市債その他議会費」が本番に残っていた**（gen まで到達）。
//
// ここに挙げるのは**款名として原典にあり得ない語**だけ（実在の款名を巻き込まない）:
//   - `千円`/`百万円`/`単位` … 単位行の断片。**款名に単位は出ない**
//   - `一般財源`/`特定財源`/`国県支出金` … 財源内訳のヘッダ。**歳出款は「〜費」で、財源名は付かない**
//     （歳入の実在款名は `国庫支出金`・`県支出金` で別物。`国県支出金` はヘッダにしか無い）
//   - `予算額`/`前年度`/`比較`/`増減`/`構成比` … 列見出しの断片
//   - `総括`/`一覧`/`款名` … 表題・表側ラベルの断片
// **これに当てはまったら抽出の壊れ**なので error（原典どおりの款名が誤検出される余地が無い語を選ぶ）。
const KANNAME_JUNK_RE =
  /千円|百万円|単位|一般財源|特定財源|国県支出金|予算額|前年度|比較増減|構成比|総括|一覧|款名/;

// 款名に紛れ込む**部首の異体字**（2026-07-17 追加・港区で発覚）。
//
// **上の語彙ゲートと違い、これは「語」ではなく「文字」で守る。** 原典の PDF が
// **Kangxi Radicals（U+2F00–U+2FDF）/ CJK Radicals Supplement（U+2E80–U+2EFF）**の
// 文字を混ぜて組版していることがある。港区 R2・R4・H31 の実測:
//   `⺠⽣費`（U+2EA0 + U+2F63）・`⼟⽊費`・`諸⽀出⾦`・`利⼦割交付⾦`・`使⽤料及び⼿数料`
// **見た目が正字とほぼ同じ**（`⺠生費` と `民生費`）ので目視でも見落としうる。しかも:
//   - **Σ は4系統すべて差0**（金額は正しい）
//   - **上の語彙ゲートも素通り**（部首の語彙を持たないため）
//   - **同一 PDF の中で混在する**（港 R2 は `土木費` がクリーンなのに `⺠⽣費` が壊れる）
//   - **年度の新旧と無関係**（R3 クリーン → R4 は歳出だけ汚染 → R2 は両側汚染）
// ＝**このリポジトリで初めての「文字レベルで静かに壊れる」型**。§2-4 の一覧に入る。
//
// **款名に部首文字が正当に現れることはない**（部首は辞書の見出し用の文字で、地方自治法の
// 款名は常用漢字で書かれる）ので、1文字でも出たら抽出か原典の組版の異常＝error にしてよい。
// ⚠ **NFKC 正規化だけでは足りない** — `⼊⽣⾦⼟⽊⽀⽐⽬` 等（U+2F00 台）は NFKC で正字に落ちるが、
//   **`⺠`（U+2EA0・CJK部首補助）は NFKC で変化しない**（実測）。パーサ側で明示的に対応する。
const KANNAME_RADICAL_RE = /[⺀-⻿⼀-⿟]/;

function validateBudgetBook(d: BudgetBookDoc): void {
  for (const side of ["revenue", "expenditure"] as const) {
    const label = side === "revenue" ? "歳入" : "歳出";
    const lines = d.facts.filter((f) => f.side === side);
    const total = side === "revenue" ? d.revenueTotal : d.expenditureTotal;

    // 款名の破損（表ヘッダ・単位・注記の断片の混入）。KANNAME_JUNK_RE のコメント参照
    for (const f of lines) {
      const m = KANNAME_JUNK_RE.exec(f.kanName);
      if (m) {
        issues.push({
          level: "error",
          message:
            `${label} 款${f.kanNo ?? "-"}「${f.kanName}」に表ヘッダ/単位の断片「${m[0]}」が混入しています。` +
            `**金額は正しく Σ も通る**型の壊れ（§2-4）。該当側の HeaderExtra でヘッダ行を落とすこと`,
        });
      }
      // 款名の破損（部首の異体字）。KANNAME_RADICAL_RE のコメント参照
      const r = KANNAME_RADICAL_RE.exec(f.kanName);
      if (r) {
        const cp = `U+${r[0]!.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`;
        issues.push({
          level: "error",
          message:
            `${label} 款${f.kanNo ?? "-"}「${f.kanName}」に部首の異体字「${r[0]}」（${cp}）が混入しています。` +
            `**見た目は正字とほぼ同じで、金額も Σ も正しい**型の壊れ（§2-4）。原典の組版が Kangxi 部首を` +
            `混ぜているので、パーサ側で正規化すること（NFKC だけでは U+2EA0 ⺠ が残る）`,
        });
      }
    }

    // 款番号の重複・順序。**款番号なし（廃止款）は対象外**。
    //
    // かつては「1,2,3,… でなければ warning」だったが、**偽陽性しか生んでいなかった**
    // （2026-07-16 に全ソースを洗って確認）:
    //   - 富士河口湖 歳出 `1..10,12` … 款11（災害復旧費）が**実在しない**だけ
    //   - 相模原 歳入 `5,10,13,16,…,90` … 原典が**5刻み前後で独自採番**している
    // どちらも原典どおりで、warning は「データの注意」として市民の画面に出てしまう。
    // **欠番なら Σ が合わない**（金額ごと落ちる）ので Σ ゲートが本命であり、番号の連番性は要らない。
    // 一方**重複と順序の逆転は抽出の壊れ**なので、そこだけ見る。
    const nos = lines.map((f) => f.kanNo).filter((n): n is number => n != null);
    const seen = new Map<number, number>();
    for (const n of nos) seen.set(n, (seen.get(n) ?? 0) + 1);
    for (const [n, c] of seen) {
      if (c > 1) issues.push({ level: "error", message: `${label}: 款番号 ${n} が重複` });
    }
    for (let i = 1; i < nos.length; i++) {
      if (nos[i]! <= nos[i - 1]!) {
        issues.push({
          level: "warning",
          message: `${label}: 款番号が昇順ではありません（${nos.join(",")}）。行の取り違えの可能性`,
        });
        break;
      }
    }
    // **款名の重複**（2026-07-16 追加）。同じ側に同じ款名は立たないので、重複＝抽出の壊れ。
    // 狙いは**款名の折返しの取りこぼし**を捕まえること — 金額は正しいまま款名だけが化けるので
    // Σ のゲートを素通りする（横浜「千円千円千円市税」・広島「交付金」型）。折返しに失敗すると
    // 頭の断片が落ちて後半だけが残るため、**衝突して重複になる**（広島 R8 なら
    // 法人事業税/地方消費税/ゴルフ場利用税 が揃って「交付金」になる）。
    // 款番号を持たない資料（広島の資料1）では款番号の重複チェックが効かないので、ここが唯一の網。
    const names = new Map<string, number>();
    for (const f of lines) names.set(f.kanName, (names.get(f.kanName) ?? 0) + 1);
    for (const [name, n] of names) {
      if (n > 1) {
        issues.push({
          level: "error",
          message: `${label}: 款名「${name}」が ${n} 件重複（款名の折返しを取りこぼしている可能性）`,
        });
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
      // No・款は表形式（R6〜）のみ。箇条書き形式（R2・R3）は null なので対象外。
      // ⚠ **`projectNoResetsPerKo` を宣言した資料は資料通しの連番ではない**（北区・項ごとに 1..M）。
      //   その2件だけ外す。パーサ側が項ごとの 1..M をより厳しく検査しているので網は弱くならない。
      if (p.no != null && !d.projectNoResetsPerKo) {
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

// ---- 当初予算の款項目節（項以下の内訳・#191） ----------------------------------
// **葉ノードだけを持つ資料**なので、Σ が立つ場所が3つある。どれも原典が自分で持っている数字。
if (doc.docType === "budget-detail") {
  // ① **予算は均衡編成**（歳入 = 歳出）。一般会計と全会計の両方で見る。
  //    ⚠ **横浜 R7 はここが破れる**（歳入 CSV だけ +379,539千円）ので収録していない。
  //    この等式を緩めると「資料内部で矛盾している版を静かに通す」型に化ける。
  for (const [label, rev, exp] of [
    ["一般会計", doc.generalRevenueTotal, doc.generalExpenditureTotal],
    ["全会計", doc.allRevenueTotal, doc.allExpenditureTotal],
  ] as const) {
    if (rev !== exp) {
      issues.push({
        level: "error",
        message:
          `${label}の歳入 ${rev.toLocaleString()} と歳出 ${exp.toLocaleString()} が一致しません` +
          `（差 ${(rev - exp).toLocaleString()}）。予算は均衡編成なので、**原典の側が矛盾している**` +
          `可能性がある（横浜 R7 は実際にそうだった）。原因を突き止めるまで収録しないこと`,
      });
    }
  }

  // ①' **前年度も均衡している**（前年度列を持つ資料だけ）。
  //    ⚠ **横浜 R2・H31 はここが破れる**（歳入と歳出で前年度 Σ が食い違う）ので収録していない。
  //    当年度だけ見ていると通ってしまうので、前年度も同じゲートに掛ける
  //    （§9「前年度列が静かに壊れる」— 甲府 R2 で実害を出した型の再来）。
  if (doc.prevRevenueTotal != null && doc.prevExpenditureTotal != null &&
      doc.prevRevenueTotal !== doc.prevExpenditureTotal) {
    issues.push({
      level: "error",
      message:
        `前年度の歳入 ${doc.prevRevenueTotal.toLocaleString()} と歳出 ${doc.prevExpenditureTotal.toLocaleString()} が` +
        `一致しません（差 ${(doc.prevRevenueTotal - doc.prevExpenditureTotal).toLocaleString()}）。` +
        `**当年度が合っていても前年度列だけが壊れていることがある**（横浜 R2・H31 が実例）`,
    });
  }
  // ①'' **Σ前年度（葉） ≤ 前年度合計**。
  //    ⚠⚠ **等号にしてはいけない**（実測して分かった）。この様式は**当年度の構造**を並べるので、
  //    **前年度に在って当年度に廃止された目・項は行として現れない**。その分の前年度額は
  //    上位（款）の合計にだけ残るため、**葉の前年度の和は款の合計より少なくなる**
  //    （実測: 横浜 R5 歳出で 30,256,840千円・R3 歳入で 11,525,608千円 少ない）。
  //    **当年度は 款 = 項 = 目 で厳密に閉じる**（パーサ側で assert 済み）。
  //    ここで見るのは「**多い**」＝二重計上だけ。
  //    ⚠ **前年度が空の行があるのも正常**（その年に新設された目＝皆増）。空を 0 と読み替えない
  //    （甲府 R2 は空欄の皆増を比較列と読み違えて +190,691 ずれた＝§9）。
  if (doc.prevRevenueTotal != null && doc.prevExpenditureTotal != null) {
    for (const [label, side, want] of [
      ["歳入", "revenue", doc.prevRevenueTotal],
      ["歳出", "expenditure", doc.prevExpenditureTotal],
    ] as const) {
      const got = doc.facts.filter((f) => f.side === side).reduce((a, f) => a + (f.prevAmount ?? 0), 0);
      if (got > want) {
        issues.push({
          level: "error",
          message:
            `${label}: 葉の前年度の和 ${got.toLocaleString()} が前年度合計 ${want.toLocaleString()} を` +
            `**超えています**（差 +${(got - want).toLocaleString()}）＝二重計上。` +
            `（少ないのは正常 — 当年度に廃止された目は行として現れないため）`,
        });
      }
    }
  }

  // ①''' **前年度の階層が「上ほど大きい」で揃っている** — Σ目prev ≦ 項行prev ≦ … ≦ 款行prev。
  //    ⚠⚠ **①'' だけでは足りなかった**（#192 のレビューで発覚）。①'' は**全体の和**しか見ないので、
  //    「ある項では目が廃止されて足りない」「別の項では二重に足している」が**相殺して素通りする**。
  //    しかも当時は項の前年度を **Σ目で作っていた**ため、**画面の前年比が符号ごと逆になった**
  //    （R5 歳出「選挙費」は項行 2,833,438 に対し Σ目 1,499,819 で、実際は減なのに +50.1% と表示）。
  //    → **項ごと・款ごとに**張る。等号でなく `≦`（廃止された下位は行として現れないため）。
  //    ⚠⚠ **款は「Σ目 ≦ 款行」でなく「Σ項行 ≦ 款行」で張る**（レビューの2巡目で発覚）。
  //    Σ目 で張ると、**項行の前年度だけが（項内で一様に）過大**な壊れ方が
  //    「下から見れば Σ目 ≦ 項行」も「款は款別一覧と一致」も通って**素通りする**
  //    ＝ 実害を出した壊れ方のちょうど鏡像。**1段上とだけ比べる**のが正しい張り方。
  {
    /** 項ごと・款ごとの「行に印字された前年度額」。同じ項・款の葉は同じ値を持つはず */
    const koPrinted = new Map<string, number | null>();
    const kanPrinted = new Map<string, number | null>();
    const koOfKan = new Map<string, string>();
    const nameOf = new Map<string, string>();
    /** 項ごとの Σ目prev */
    const mokuSum = new Map<string, number>();
    let anyPrinted = false;
    for (const f of doc.facts) {
      const kk = `${f.side}/${f.accountCode}/${f.kanNo}`;
      const kok = `${kk}/${f.koNo}`;
      nameOf.set(kk, f.kanName);
      nameOf.set(kok, `${f.kanName}/${f.koName}`);
      koOfKan.set(kok, kk);
      mokuSum.set(kok, (mokuSum.get(kok) ?? 0) + (f.prevAmount ?? 0));
      // ⚠ **null と非 null の混在も error**（片方だけ見て continue すると、derive 側の
      //   last-wins で「皆増」に化ける経路が残る）。資料が前年度を持たないなら全部 null のはず
      for (const [m, v] of [
        [koPrinted, f.koPrevAmount] as const,
        [kanPrinted, f.kanPrevAmount] as const,
      ]) {
        const k = m === koPrinted ? kok : kk;
        if (v != null) anyPrinted = true;
        if (m.has(k) && m.get(k) !== v) {
          issues.push({
            level: "error",
            message:
              `${nameOf.get(k)}: 行に印字された前年度額が葉ごとに違います` +
              `（${m.get(k) ?? "空"} と ${v ?? "空"}）。行の階層判定を疑うこと`,
          });
        }
        m.set(k, v);
      }
    }
    if (anyPrinted) {
      // Σ目prev ≦ 項行prev
      for (const [k, got] of mokuSum) {
        const want = koPrinted.get(k);
        if (want == null) continue;
        if (got > want) {
          issues.push({
            level: "error",
            message:
              `${nameOf.get(k)}: 目の前年度の和 ${got.toLocaleString()} が項行の前年度額 ` +
              `${want.toLocaleString()} を**超えています**（差 +${(got - want).toLocaleString()}）＝二重計上`,
          });
        }
      }
      // Σ項行prev ≦ 款行prev（**目の和ではなく項行の和**）
      const koSum = new Map<string, number>();
      for (const [kok, v] of koPrinted) {
        if (v == null) continue;
        const kk = koOfKan.get(kok)!;
        koSum.set(kk, (koSum.get(kk) ?? 0) + v);
      }
      for (const [k, got] of koSum) {
        const want = kanPrinted.get(k);
        if (want == null) continue;
        if (got > want) {
          issues.push({
            level: "error",
            message:
              `${nameOf.get(k)}: 項の前年度の和 ${got.toLocaleString()} が款行の前年度額 ` +
              `${want.toLocaleString()} を**超えています**（差 +${(got - want).toLocaleString()}）＝二重計上`,
          });
        }
      }
    }
  }

  // ② 原典の `総計` 行 = 葉の Σ（総計行がある側・年度だけ。横浜は R8・R7 の歳出に在る）
  for (const [label, stated, leaves] of [
    ["歳入", doc.statedRevenueTotal, doc.allRevenueTotal],
    ["歳出", doc.statedExpenditureTotal, doc.allExpenditureTotal],
  ] as const) {
    if (stated != null && stated !== leaves) {
      issues.push({
        level: "error",
        message:
          `${label}の原典の総計行 ${stated.toLocaleString()} と葉の Σ ${leaves.toLocaleString()} が` +
          `一致しません（差 ${(leaves - stated).toLocaleString()}）。` +
          `総計行を葉として拾っている（二重計上）か、行を落としている`,
      });
    }
  }

  // ③ 細節の在り方。⚠ **これは横浜の様式であって款項目節の一般則ではない**
  //    （細節を持たない資料は当然あり得る）。**「歳出に細節がある資料」だと分かっている場合だけ**
  //    その一貫性を検査する — 全 doc に一般則として効かせると、細節の無い自治体を足した瞬間に
  //    偽陽性 error になり、**ゲートを緩める圧力**が生まれる（レビュー指摘）。
  {
    const expHasSaisetsu = doc.facts.some((f) => f.side === "expenditure" && f.saisetsuNo);
    if (expHasSaisetsu) {
      const missing = doc.facts.find((f) => f.side === "expenditure" && !f.saisetsuNo);
      if (missing) {
        issues.push({
          level: "error",
          message: `歳出の一部にだけ細節がありません（${missing.kanName}/${missing.koName}/${missing.mokuName}）— 行の取り違えを疑う`,
        });
      }
    }
    // 歳入に細節が付くのは側の取り違え（歳入 CSV に細節列は無い）
    const revSaisetsu = doc.facts.find((f) => f.side === "revenue" && f.saisetsuNo);
    if (revSaisetsu) {
      issues.push({ level: "error", message: `歳入に細節が付いています（${revSaisetsu.kanName}/${revSaisetsu.koName}）— 側の取り違えを疑う` });
    }
  }

  // ⑤ **科目名の破損**（款別と同じ網を項以下にも効かせる）。#192 で予定している
  //    R5〜H29 のレイアウト型 XLSX は、まさにヘッダ繰返し・結合セルで名前が壊れる型なので、
  //    そのとき効かなければ意味が無い（レビュー指摘）。
  //
  // ⚠⚠ **語彙の網（KANNAME_JUNK_RE）は款名にしか当ててはいけない。**
  //    あれは「**款名として**原典にあり得ない語」を選んだもので、**下の階層では実在の科目名**に
  //    なる。実際に `前年度繰越金`（歳入 繰越金 の節）が `前年度` で誤検出された（実測）。
  //    → **語彙は款名だけ。部首の網（文字クラス）は階層に依らず安全なので全階層に当てる。**
  for (const f of doc.facts) {
    const j = KANNAME_JUNK_RE.exec(f.kanName);
    if (j) {
      issues.push({ level: "error", message: `款名「${f.kanName}」に表ヘッダ/単位の断片「${j[0]}」が混入しています` });
      break;
    }
  }
  for (const f of doc.facts) {
    const hit = ([["款", f.kanName], ["項", f.koName], ["目", f.mokuName], ["節", f.setsuName], ["細節", f.saisetsuName]] as const)
      .find(([, nm]) => nm && KANNAME_RADICAL_RE.test(nm));
    if (hit) {
      issues.push({
        level: "error",
        message: `${hit[0]}名「${hit[1]}」に部首の異体字が混入しています（見た目は正字とほぼ同じで Σ も通る）`,
      });
      break;
    }
  }

  // ④ 一般会計の款が1つも無い、は様式の取り違え
  const genKan = new Set(doc.facts.filter((f) => f.accountCode === "01" && f.side === "expenditure").map((f) => f.kanName));
  if (genKan.size < 5) {
    issues.push({ level: "error", message: `一般会計の歳出款が ${genKan.size} 種しかありません（会計コードの取り違えを疑う）` });
  }
  finish(doc.facts.length, "行");
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
  // 達成度（1〜5の数値）を資料が採用しているか（川崎は全事業が持つ想定）。
  // **北九州の「順調/概ね順調/やや遅れ/遅れ」は achievement ではなく progress**（別の語彙・§後述）
  // なので、achievement を1件も使わない資料で「方向性はあるのに達成度が無い」と毎回警告すると
  // 206/198件が偽陽性になる。資料単位で achievement を使っているかどうかで判定する。
  const docUsesAchievement = doc.facts.some((f) => f.achievement != null);
  for (const f of doc.facts) {
    if (seenNo.has(f.no)) issues.push({ level: "error", message: `詳細票 No.${f.no} が重複` });
    seenNo.add(f.no);
    // ⚠ **`noPerProjectCost` を宣言した資料だけ「コスト空」を許す**（2026-07-30・京都府 §12）。
    //   原典が事業ごとの金額を印字しない資料が実在する（京都府は金額が目レベルにしかなく、
    //   1つの目に複数の施策がぶら下がるので**目の額を施策へ配ると二重計上**になる）。
    //   宣言は parsed 側（パーサが原典を見て立てる）にあり、既定ではゲートは効いたまま。
    if (!f.cost.length && !doc.noPerProjectCost) {
      issues.push({ level: "error", message: `${f.name}: コスト経年が空` });
    }
    // 事業費がどの年度も取れていない＝列ずれの疑い。
    // ⚠ **`cost` が空の場合は対象外**（`[].every()` は true なので、素で書くと「空」と
    //   「列ずれ」の2件が必ず同時に出る＝ゲートの意味が薄れる）。列ずれの検出はここが本体なので、
    //   **`noPerProjectCost` を宣言した資料でも、cost を持つ事業には効かせる**。
    if (f.cost.length > 0 && f.cost.every((c) => c.jigyohi == null)) {
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
    // ---- 差引 = 当年度 − 前年度（横浜の事業評価書）----
    // **列の対応が正しいことの証明**。資料が載せている「差引（増減）」と、我々が別々の列から
    // 拾った当年度・前年度の差を突き合わせる。列を1つ取り違えれば必ず落ちる。
    // 横浜は年度ヘッダが同ページに3組あり、事業決算額と細事業費は x が1ptも違わないので、
    // このゲートが無いと静かに混ざる（実測 1,508/1,508 厳密一致・例外0）。
    if (f.costDiff != null && f.cost.length >= 2) {
      // 並べ替えは fyRank（pipeline/lib/fy.ts・R > H）。`Number(fy.slice(1))` だと **H31 が R2 より
      // 後ろに来て**、年号をまたぐ資料（札幌の事業報告は H24〜R7）で「最後の2年」を取り違える。
      // ここは差引の突合ゲートなので、取り違えると**誤った対で照合して静かに通る**。
      const ys = [...f.cost].sort((a, b) => fyRank(a.fy) - fyRank(b.fy));
      const prev = ys[ys.length - 2]!.jigyohi;
      const cur = ys[ys.length - 1]!.jigyohi;
      if (prev != null && cur != null && cur - prev !== f.costDiff) {
        // **列を取り違えていれば桁ごと違う**（実測: 符号を落としたときは差が2倍になった）。
        // 差が小さいのは**原典側の誤植**（実測: 横浜 R7 の都筑区「区庁舎管理費」は
        // 263,659 − 255,960 = 7,699 なのに資料の差引が 7,609。3つとも原典どおり抽出できている）。
        // 桁が変わらない程度のズレは warning にして原典どおり収録し、それ以外は error で止める。
        const d = Math.abs(cur - prev - f.costDiff);
        const scale = Math.max(Math.abs(cur - prev), 1);
        issues.push({
          level: d < scale * 0.05 ? "warning" : "error",
          message:
            `${f.name}: 資料の差引 ${f.costDiff} が ${ys[ys.length - 1]!.fy} ${cur} − ${ys[ys.length - 2]!.fy} ${prev} = ${cur - prev} と一致しません（差 ${cur - prev - f.costDiff}）。` +
            (d < scale * 0.05
              ? "ズレが小さいので原典側の誤植と判断し、資料どおり収録しています"
              : "年度の列を取り違えている可能性があります"),
        });
      }
    }
    // 達成度は「取れなかった」と「資料に無い」を区別する — 川崎は全事業が持つはずで、
    // 分布が概要 PDF の記載と一致することを下でまとめて確認する
    if (docUsesAchievement && f.achievement == null && f.direction != null) {
      issues.push({ level: "warning", message: `${f.name}: 方向性区分はあるのに達成度が取れていません` });
    }
  }
  if (doc.facts.length === 0) issues.push({ level: "error", message: `詳細票が0件` });
  finish(doc.facts.length, "詳細票");
}

// ---- budget-projects（主な事業だけの独立資料・#164 横浜の事業計画書）------------
if (doc.docType === "budget-projects") {
  // ⚠ **「Σ事業 = 目の「計」」はパーサ側が持つ**（validate では張れない）。
  //   パーサは目次のグループを閉じるときに厳密照合しているが、その**後で**
  //   「目次が款どまり」「1つの目次に複数の目が混在」を詳細シートで補正するため、
  //   parsed に残る項・目は目次のグループとは一致しない。ここで張り直すと、
  //   **正しく補正した結果を誤りとして落とす**（実測でそうなった）。
  // ② 事業名の重複（同じ会計・款項目に同名同額が2つある＝重複の落とし漏れ）
  const seenKey = new Set<string>();
  for (const f of doc.facts) {
    const k = [f.accountName, f.kanNo, f.koNo, f.mokuNo, f.name, f.amount].join("/");
    if (seenKey.has(k)) {
      issues.push({ level: "error", message: `${f.name}（${f.kanNo}款${f.koNo}項${f.mokuNo}目）が重複しています` });
    }
    seenKey.add(k);
  }
  // ③ 会計が一般会計だけになっているか（scope の宣言どおり）
  const accs = [...new Set(doc.facts.map((f) => f.accountName))];
  if (accs.some((a) => a !== "一般会計")) {
    issues.push({ level: "error", message: `一般会計以外が混ざっています: ${accs.join(" / ")}` });
  }
  // ④ 事業名の汚染（見出し語・印の混入）。**金額でないので Σ が立たない領域**
  for (const f of doc.facts) {
    if (/^[○〇◎]/.test(f.name)) {
      issues.push({ level: "error", message: `事業名に新規・拡充の印が混ざっています: ${f.name}` });
    }
    if (/\d+款\d*項?\d*目?/.test(f.name)) {
      issues.push({ level: "error", message: `事業名に見出しの款項目が混ざっています: ${f.name}` });
    }
    if (/^(計|合計)$/.test(f.name) || /課計/.test(f.name)) {
      issues.push({ level: "error", message: `小計・合計の行が事業として入っています: ${f.name}` });
    }
  }
  if (doc.facts.length === 0) issues.push({ level: "error", message: `事業が0件` });
  finish(doc.facts.length, "事業");
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
