// [3]→アプリ normalized データセットからアプリ用の静的モジュールを導出する。
// 現状の対象: 類似自治体比較（src/client/lib/similar.gen.ts）。
// 巨大な normalized JSON をクライアントに import せず、必要な断面だけを
// 決定的（タイムスタンプなし）に生成してコミットする。
// 使い方: bun run pipeline:derive
import {
  anyParsedDocSchema,
  archivesLedgerSchema,
  normalizedDatasetSchema,
  validationResultSchema,
  type NormalizedMuniAccount,
} from "./types";
import {
  DATA_DIR,
  normalizedPath,
  parsedPath,
  readJson,
  readRawMeta,
  validationPath,
} from "./lib/store";
import { findSource } from "./registry/sources";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_ID = "soumu-shichoson-kessan-r6";
const SELF_CODE = "192015"; // 甲府市

// ---- 外部アーカイブ台帳（data/archives.json） --------------------------------
// 画面のエビデンスリンクは**発行元の直リンクではなく Wayback のコピー**を優先する。
// 直リンクは中身だけ差し替えられ得るが、コピーはパース時点の版に固定されるため
// 透明性が高い（ユーザー方針 2026-07-12）。未登録の URL は直リンクにフォールバック。
const ARCHIVES = (() => {
  const p = join(DATA_DIR, "archives.json");
  if (!existsSync(p)) return {} as Record<string, string>;
  const entries = archivesLedgerSchema.parse(readJson(p)).entries;
  return Object.fromEntries(entries.map((e) => [e.url, e.waybackUrl]));
})();
/** URL → Wayback コピー（未登録なら元 URL のまま） */
const wayback = (url: string): string => ARCHIVES[url] ?? url;
// 画面の説明文と揃えた人口帯（15〜25万人の市）
const BAND_MIN = 150_000;
const BAND_MAX = 250_000;
const PEER_COUNT = 4;
// 歳出構成の表示科目（この順で構成比を出し、残りは「その他」）
const MIX_COLS = ["民生費", "教育費", "土木費", "公債費"] as const;

// R6 のファイル構成（registry の urls と対応）。年度更新時はここも見直す。
// pair = 表示行の locator（概況）に対して、目的別歳出を供給した相方ファイル
const FILE_INFO: Record<string, { label: string; short: string; pair?: string }> = {
  "001061669.xlsx": { label: "都市別（1）概況", short: "都市別・概況", pair: "001061671.xlsx" },
  "001061671.xlsx": { label: "都市別（3）目的別歳出内訳", short: "都市別・目的別" },
  "001061674.xlsx": { label: "町村別（1）概況", short: "町村別・概況", pair: "001061676.xlsx" },
  "001061676.xlsx": { label: "町村別（3）目的別歳出内訳", short: "町村別・目的別" },
};

const ds = normalizedDatasetSchema.parse(
  readJson(normalizedPath("municipal-accounts", "R6", false)),
);

const self = ds.records.find((r) => r.muniCode === SELF_CODE);
if (!self) throw new Error(`normalized に ${SELF_CODE}（甲府市）がありません`);
if (!self.population || !self.expenditureTotal) {
  throw new Error(`${SELF_CODE}: 人口・歳出総額が欠損しています`);
}

// 人口帯内の「市」（自身を除く）。人口の近い順に PEER_COUNT 市を選ぶ
const band = ds.records.filter(
  (r) =>
    r.muniCode !== SELF_CODE &&
    r.muniName.endsWith("市") &&
    r.population != null &&
    r.population >= BAND_MIN &&
    r.population <= BAND_MAX &&
    r.expenditureTotal != null,
);
const peers = [...band]
  .sort(
    (a, b) =>
      Math.abs(a.population! - self.population!) - Math.abs(b.population! - self.population!) ||
      a.muniCode.localeCompare(b.muniCode),
  )
  .slice(0, PEER_COUNT);

/** 表示行を組み立てる。金額は千円 → 億円/万円へ換算 */
function toRow(r: NormalizedMuniAccount, opts: { self?: boolean } = {}) {
  const pop = r.population!;
  const totalOku = r.expenditureTotal! / 100_000; // 千円 → 億円
  const perCapYen = (r.expenditureTotal! * 1000) / pop;
  const mix: number[] = [];
  let rest = 100;
  for (const col of MIX_COLS) {
    const share = ((r.expenditureByPurpose[col] ?? 0) / r.expenditureTotal!) * 100;
    const rounded = Math.round(share * 10) / 10;
    mix.push(rounded);
    rest -= rounded;
  }
  mix.push(Math.round(rest * 10) / 10); // その他 = 残り（合計をちょうど100に）
  const loc = r.sourceRef.locator;
  return {
    name: r.muniName,
    ...(opts.self ? { self: true } : {}),
    pop: (pop / 10_000).toFixed(1) + "万人",
    total: Math.round(totalOku * 10) / 10,
    perCap: (perCapYen / 10_000).toFixed(1) + "万円",
    mix,
    ref: `${loc.file}#row${loc.row}`,
    refLabel: `${FILE_INFO[loc.file]?.short ?? loc.file} ${loc.row}行目`,
  };
}

// 類似団体平均 = 人口帯内の全市（自身を除く）の合算ベース
const agg = band.reduce(
  (a, r) => {
    a.pop += r.population!;
    a.total += r.expenditureTotal!;
    for (const col of MIX_COLS) a.byPurpose[col] += r.expenditureByPurpose[col] ?? 0;
    return a;
  },
  { pop: 0, total: 0, byPurpose: Object.fromEntries(MIX_COLS.map((c) => [c, 0])) as Record<string, number> },
);
const avgRow = (() => {
  const mix: number[] = [];
  let rest = 100;
  for (const col of MIX_COLS) {
    const rounded = Math.round(((agg.byPurpose[col] / agg.total) * 100) * 10) / 10;
    mix.push(rounded);
    rest -= rounded;
  }
  mix.push(Math.round(rest * 10) / 10);
  return {
    name: "類似団体平均",
    pop: (agg.pop / band.length / 10_000).toFixed(1) + "万人",
    total: Math.round((agg.total / band.length / 100_000) * 10) / 10,
    perCap: ((agg.total * 1000) / agg.pop / 10_000).toFixed(1) + "万円",
    mix,
    ref: `全国の人口${BAND_MIN / 10_000}〜${BAND_MAX / 10_000}万人の市 ${band.length}市から算出`,
    refLabel: `帯内${band.length}市から算出（導出値）`,
  };
})();

const rows = [toRow(self, { self: true }), ...peers.map((r) => toRow(r)), avgRow];

// エビデンスカード: 表示行の locator が実際に指すファイル（＋目的別歳出の相方）だけを
// raw-meta（sha256・取得日）と registry（URL）から組み立てる。
// 町村別ファイルは normalized には入っているが表示行（市のみ）を裏付けないため載せない。
const usedFiles = new Set<string>();
for (const r of rows) {
  const file = r.ref.split("#")[0];
  if (!FILE_INFO[file]) continue;
  usedFiles.add(file);
  const pair = FILE_INFO[file].pair;
  if (pair) usedFiles.add(pair);
}
const rawMeta = readRawMeta(SOURCE_ID);
if (!rawMeta) throw new Error(`${SOURCE_ID}: raw-meta がありません（先に pipeline:fetch）`);
const source = findSource(SOURCE_ID);
const evidence = rawMeta.files
  .filter((f) => usedFiles.has(f.filename))
  .map((f) => ({
    title: `${source.title} ${FILE_INFO[f.filename].label}`,
    type: "Excel",
    url: wayback(source.urls?.find((u) => u.endsWith(f.filename)) ?? source.landingPage ?? ""),
    localUrl: `/sources/${SOURCE_ID}/${f.filename}`,
    source: new URL(source.urls?.[0] ?? source.landingPage!).hostname,
    thumb: `${f.filename} ・ sha256 ${f.sha256.slice(0, 16)}… ・ ${f.fetchedAt.slice(0, 10)} 取得`,
  }));

const sourceLines = ds.sources
  .map((s) => ` *   - ${s.sourceId} sha256=${s.sha256.slice(0, 16)}…`)
  .join("\n");
const out = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 総務省「令和6年度 市町村別決算状況調」普通会計決算
/*
 * 来歴:
${sourceLines}
 * 選出: 人口${BAND_MIN / 10_000}〜${BAND_MAX / 10_000}万人の市から人口の近い${PEER_COUNT}市 + 帯内${band.length}市の平均
 */

export const SIMILAR_FY_LABEL = "令和6年度（普通会計決算）";

export const SIM_MIX_COLS = [${MIX_COLS.map((c) => `"${c}"`).join(", ")}, "その他"];

export interface SimilarRow {
  name: string;
  self?: boolean;
  /** 表示用の人口（例: "18.4万人"） */
  pop: string;
  /** 歳出総額（億円） */
  total: number;
  /** 1人あたり歳出（例: "48.7万円"） */
  perCap: string;
  /** SIM_MIX_COLS 順の歳出構成比（%、合計100） */
  mix: number[];
  /** 来歴（原資料ファイル内の位置。機械可読） */
  ref: string;
  /** 来歴の画面表示用ラベル（例: "都市別・概況 436行目"） */
  refLabel: string;
}

export const SIMILAR: SimilarRow[] = ${JSON.stringify(rows, null, 2)};

export interface SimilarEvidence {
  title: string;
  type: string;
  /** 一次資料へのリンク（Wayback コピー優先） */
  url: string;
  /** 自サーバー配信の原本コピー */
  localUrl: string;
  source: string;
  /** サムネイル枠に出す来歴（ファイル名・sha256・取得日） */
  thumb: string;
}

export const SIMILAR_EVIDENCE: SimilarEvidence[] = ${JSON.stringify(evidence, null, 2)};
`;

const dest = join(process.cwd(), "src/client/lib/similar.gen.ts");
writeFileSync(dest, out, "utf8");
console.log(`✓ 類似自治体比較を導出 → src/client/lib/similar.gen.ts`);
console.log(`  自身: ${self.muniName} / 近隣: ${peers.map((p) => p.muniName).join("・")} / 帯内 ${band.length}市`);

// ============================================================================
// 甲府市 当初予算（款別・複数年度）→ src/client/lib/kofu.gen.ts
// アプリの款レベルを予算資料パース値＋出典位置で供給する。年度ごとに同じ形の
// オブジェクトを作り、先頭（最新年度）を KOFU_BUDGET として互換エクスポートする。
// ============================================================================
// ダッシュボードの歳入表示グループ（款名の完全一致）。残りの款は「諸収入・その他」へ合算
const REVENUE_GROUPS = [
  "市税", "国庫支出金", "地方交付税", "県支出金", "地方消費税交付金", "繰入金", "寄附金", "市債",
] as const;

// 収録済みの当初予算資料（新しい年度順）。popFy = 1人あたり換算に使う住基人口の
// 決算状況調年度（決算状況調 R6 の人口 = 令7.1.1現在。予算年度の期首に最も近いものを選ぶ）
const BUDGET_YEARS = [
  { srcId: "kofu-yosansho-r8", fy: "R8", popFy: "R6" },
  { srcId: "kofu-yosansho-r7", fy: "R7", popFy: "R6" },
  { srcId: "kofu-yosansho-r6", fy: "R6", popFy: "R5" },
  // R5・R4 は市サイト消失後、WARP（国立国会図書館）の保存版から回収
  { srcId: "kofu-yosansho-r5", fy: "R5", popFy: "R4" },
  { srcId: "kofu-yosansho-r4", fy: "R4", popFy: "R3" },
  { srcId: "kofu-yosansho-r3", fy: "R3", popFy: "R2" },
  // R2 期首（令2.1.1）の人口は決算状況調 R1 が必要（未収録）。最も近い令3.1.1 を明示して使う
  { srcId: "kofu-yosansho-r2", fy: "R2", popFy: "R2" },
] as const;

const toOku = (thousandYen: number) => thousandYen / 100_000;
const yoyPctOf = (cur: number, prev: number | null): number | null =>
  prev != null && prev > 0 ? Math.round((cur / prev - 1) * 1000) / 10 : null;

interface KofuKanRowGen {
  name: string;
  v: number;
  prevV: number | null;
  yoy: number | null;
  ref: string;
  refLabel: string;
  /** 表示グループの内訳（実データの款）。「諸収入・その他」のみ持つ */
  children?: KofuKanRowGen[];
}

const popCache = new Map<string, { population: number; populationLabel: string }>();
function kofuPopulation(popFy: string): { population: number; populationLabel: string } {
  const cached = popCache.get(popFy);
  if (cached) return cached;
  const popDs = normalizedDatasetSchema.parse(
    readJson(normalizedPath("municipal-accounts", popFy, false)),
  );
  const rec = popDs.records.find((r) => r.muniCode === SELF_CODE);
  if (!rec?.population) throw new Error(`municipal-accounts ${popFy}: 甲府市の人口がありません`);
  const v = {
    population: rec.population,
    populationLabel: `住民基本台帳人口（令${Number(popFy.slice(1)) + 1}.1.1現在）`,
  };
  popCache.set(popFy, v);
  return v;
}

function buildKofuBudgetYear(entry: (typeof BUDGET_YEARS)[number]) {
  const { srcId, fy, popFy } = entry;
  // 検証ゲート: needs_review の parsed を derive に通さない
  const validation = validationResultSchema.parse(readJson(validationPath(srcId)));
  if (validation.status !== "ok") {
    throw new Error(`${srcId}: 検証が ${validation.status} のため derive しません`);
  }
  const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
  if (doc.docType !== "budget-book") {
    throw new Error(`${srcId}: budget-book ドキュメントではありません`);
  }
  const meta = readRawMeta(srcId);
  if (!meta) throw new Error(`${srcId}: raw-meta がありません（先に pipeline:fetch）`);
  const source = findSource(srcId);
  const optFiles = (source.parserOptions ?? {}) as { kanFile?: string; projectsFile?: string };
  const urlOf = (filename: string) =>
    source.urls?.find((u) => u.endsWith(`/${filename}`)) ?? source.urls?.[0] ?? source.landingPage ?? "";
  // 分冊形式（R2・R3）は款別一覧と主な事業が別ファイル。単一ファイル形式は同一
  const file = (optFiles.kanFile ? meta.files.find((f) => f.filename === optFiles.kanFile) : meta.files[0])!;
  const projFile =
    (optFiles.projectsFile ? meta.files.find((f) => f.filename === optFiles.projectsFile) : meta.files[0])!;
  const url = urlOf(file.filename);
  const projUrl = urlOf(projFile.filename);

  const kanRow = (
    name: string,
    amount: number,
    prevAmount: number | null,
    page: number,
    refLabel?: string,
  ): KofuKanRowGen => ({
    name,
    v: toOku(amount),
    prevV: prevAmount != null ? toOku(prevAmount) : null,
    yoy: yoyPctOf(amount, prevAmount),
    ref: `${file.filename}#p${page}`,
    refLabel: refLabel ?? `予算書 p.${page}`,
  });

  const expFacts = doc.facts.filter((f) => f.side === "expenditure");
  const revFacts = doc.facts.filter((f) => f.side === "revenue");

  const expenditure = expFacts
    .map((f) => kanRow(f.kanName, f.amount, f.prevAmount, f.locator.page ?? 0))
    .sort((a, b) => b.v - a.v);

  const groupedRevenue: KofuKanRowGen[] = REVENUE_GROUPS.map((g) => {
    const f = revFacts.find((x) => x.kanName === g);
    if (!f) throw new Error(`${srcId}: 歳入款「${g}」が parsed にありません（表示グループの款名を見直してください）`);
    return kanRow(f.kanName, f.amount, f.prevAmount, f.locator.page ?? 0);
  });
  const restFacts = revFacts.filter((f) => !(REVENUE_GROUPS as readonly string[]).includes(f.kanName));
  if (restFacts.length > 0) {
    const restPage = restFacts[0]!.locator.page ?? 0;
    groupedRevenue.push({
      ...kanRow(
        "諸収入・その他",
        restFacts.reduce((a, f) => a + f.amount, 0),
        restFacts.every((f) => f.prevAmount != null)
          ? restFacts.reduce((a, f) => a + (f.prevAmount ?? 0), 0)
          : null,
        restPage,
        `予算書 p.${restPage}（残り${restFacts.length}款の合算）`,
      ),
      // 合算グループだけは実データの款を内訳として持つ（ドリルダウン用）
      children: restFacts
        .map((f) => kanRow(f.kanName, f.amount, f.prevAmount, f.locator.page ?? 0))
        .sort((a, b) => b.v - a.v),
    });
  }
  const revenue = [...groupedRevenue].sort((a, b) => b.v - a.v);

  // 合算の自己検証（グループ化でこぼしていないか）
  const revSum = revenue.reduce((a, r) => a + r.v, 0);
  if (Math.abs(revSum - toOku(doc.revenueTotal)) > 1e-6) {
    throw new Error(`${srcId}: 歳入グループの和 ${revSum} が歳入合計 ${toOku(doc.revenueTotal)} と一致しません`);
  }

  const yoyTotal = yoyPctOf(doc.expenditureTotal, doc.prevExpenditureTotal);
  const pagesOpts = (source.parserOptions ?? {}) as {
    revenuePage?: number;
    expenditurePage?: number;
    projectPages?: { from: number; to: number };
  };
  const pop = kofuPopulation(popFy);
  const budget = {
    fy,
    fyLabel: `令和${fy.slice(1)}年度 当初予算`,
    population: pop.population,
    populationLabel: pop.populationLabel,
    totalOku: toOku(doc.expenditureTotal),
    prevTotalOku: doc.prevExpenditureTotal != null ? toOku(doc.prevExpenditureTotal) : null,
    yoyLabel: yoyTotal != null ? `${yoyTotal >= 0 ? "+" : ""}${yoyTotal.toFixed(1)}%` : "",
    // 前年度列の基準（R2 の一覧表は前年が「6月補正後予算額」であり当初でない）
    prevBasis: doc.prevBasis,
    // 前年度列の資料注記（R6:「令和5年度当初予算額は6月補正の政策的予算を含む」= R5 骨格予算）
    prevNote: doc.prevNote ?? "",
    sourceTitle: source.title,
    // リンクは Wayback コピー（パース時点の版に固定）。発行元の元 URL は originUrl。
    // sourceLocalUrl = 自サーバー配信のコピー（public/sources。ドロワーでその場レビュー）
    sourceUrl: wayback(url),
    originUrl: url,
    sourceLocalUrl: `/sources/${srcId}/${file.filename}`,
    pagesLabel: `p.${pagesOpts.revenuePage}–${pagesOpts.expenditurePage}`,
    revenue,
    expenditure,
    // 分冊形式では款別一覧・主な事業の両ファイルをエビデンスとして列挙する
    evidence: meta.files.map((f) => ({
      title: source.title + (meta.files.length > 1 ? `（${f.filename}）` : ""),
      type: "PDF",
      url: wayback(urlOf(f.filename)),
      localUrl: `/sources/${srcId}/${f.filename}`,
      source: url ? new URL(url).hostname : "",
      thumb: `${f.filename} ・ sha256 ${f.sha256.slice(0, 16)}… ・ ${f.fetchedAt.slice(0, 10)} 取得`,
    })),
  };
  return { budget, doc, file, url, projFile, projUrl, source, pagesOpts };
}

const budgetYears = BUDGET_YEARS.map(buildKofuBudgetYear);

const kofuOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 当初予算資料 ${budgetYears.map((b) => b.budget.fy).join("・")}（各年度の sha256 は evidence 参照）
// 金額は億円（予算書の千円値を 1e5 で割った正確値）。yoy は前年度当初比%（小数1桁）

export interface KofuKanRow {
  name: string;
  /** 当初予算額（億円） */
  v: number;
  /** 前年度当初予算額（億円） */
  prevV: number | null;
  /** 前年度当初比（%） */
  yoy: number | null;
  /** 来歴（原資料ファイル内の位置。機械可読） */
  ref: string;
  /** 来歴の画面表示用ラベル */
  refLabel: string;
  /** 表示グループの内訳（実データの款）。「諸収入・その他」のみ持つ */
  children?: KofuKanRow[];
}

export interface KofuBudgetYear {
  /** 年度（"R8" など） */
  fy: string;
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  /** 前年度額の基準。"補正後" の年（R2）は前年が当初予算額でない点に注意 */
  prevBasis: "当初" | "補正後";
  /** 前年度列の資料注記（原文。無ければ空文字） */
  prevNote: string;
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先。パース時点の版に固定） */
  sourceUrl: string;
  /** 発行元の元 URL */
  originUrl: string;
  /** 自サーバー配信の原本コピー（/sources/...。ドロワーでのその場レビュー用） */
  sourceLocalUrl: string;
  pagesLabel: string;
  revenue: KofuKanRow[];
  expenditure: KofuKanRow[];
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/** 収録済みの当初予算（新しい年度順） */
export const KOFU_BUDGET_YEARS: KofuBudgetYear[] = ${JSON.stringify(budgetYears.map((b) => b.budget), null, 2)};

/** 最新年度（互換用） */
export const KOFU_BUDGET: KofuBudgetYear = KOFU_BUDGET_YEARS[0]!;
`;

const kofuDest = join(process.cwd(), "src/client/lib/kofu.gen.ts");
writeFileSync(kofuDest, kofuOut, "utf8");
console.log(`✓ 甲府市 款別予算を導出 → src/client/lib/kofu.gen.ts（${budgetYears.map((b) => b.budget.fy).join("・")}）`);
for (const b of budgetYears) {
  console.log(
    `  ${b.budget.fy}: 総額 ${b.budget.totalOku}億円（前年比 ${b.budget.yoyLabel}） / 歳入 ${b.budget.revenue.length}グループ・歳出 ${b.budget.expenditure.length}款`,
  );
}

// ============================================================================
// 甲府市 決算の推移（決算状況調 R2〜R6）→ src/client/lib/trend.gen.ts
// ============================================================================
{
  const TREND_YEARS = ["R2", "R3", "R4", "R5", "R6"] as const;
  const trendRows = TREND_YEARS.map((fy) => {
    const srcId = `soumu-shichoson-kessan-${fy.toLowerCase()}`;
    const v = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (v.status !== "ok") throw new Error(`${srcId}: 検証が ${v.status} のため derive しません`);
    const src = findSource(srcId);
    const ds = normalizedDatasetSchema.parse(readJson(normalizedPath("municipal-accounts", fy, false)));
    const k = ds.records.find((r) => r.muniCode === SELF_CODE);
    if (!k?.expenditureTotal || !k.revenueTotal) throw new Error(`${srcId}: 甲府市のデータがありません`);
    return {
      fy,
      fyLabel: `令和${fy.slice(1)}年度`,
      expenditureTotalOku: toOku(k.expenditureTotal),
      revenueTotalOku: toOku(k.revenueTotal),
      population: k.population,
      financialIndex: k.financialIndex ?? null,
      keijoShushiPct: k.keijoShushiPct ?? null,
      jisshitsuKosaihiPct: k.jisshitsuKosaihiPct ?? null,
      byPurpose: Object.fromEntries(
        Object.entries(k.expenditureByPurpose).map(([name, v2]) => [name, toOku(v2 as number)]),
      ),
      landingUrl: wayback(src.landingPage ?? ""),
      ref: `${k.sourceRef.locator.file} ${k.sourceRef.locator.row}行目`,
    };
  });
  const trendOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 総務省「市町村別決算状況調」令和2〜6年度（普通会計決算）。金額は億円

export interface KofuTrendRow {
  fy: string;
  fyLabel: string;
  /** 歳出決算総額（億円） */
  expenditureTotalOku: number;
  /** 歳入決算総額（億円） */
  revenueTotalOku: number;
  /** 住民基本台帳人口 */
  population: number | null;
  financialIndex: number | null;
  keijoShushiPct: number | null;
  jisshitsuKosaihiPct: number | null;
  /** 款別歳出（億円） */
  byPurpose: Record<string, number>;
  /** 年度ページ（総務省） */
  landingUrl: string;
  /** 来歴（概況ファイル内の位置） */
  ref: string;
}

export const KOFU_TREND: KofuTrendRow[] = ${JSON.stringify(trendRows, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/trend.gen.ts"), trendOut, "utf8");
  console.log(
    `✓ 決算の推移を導出 → src/client/lib/trend.gen.ts（${trendRows[0]!.fyLabel}〜${trendRows[trendRows.length - 1]!.fyLabel}）`,
  );
}

// ============================================================================
// 甲府市 R6 決算の項レベル内訳（決算状況調）→ src/client/lib/detail.gen.ts
// R8 予算の項以下は原典未公開のため、款ドリルダウンには R6 決算の項内訳を
// 「参考」として年度を明示して出す（推計はしない）。
// ============================================================================
{
  const SOUMU_ID = "soumu-shichoson-kessan-r6";
  const soumuValidation = validationResultSchema.parse(readJson(validationPath(SOUMU_ID)));
  if (soumuValidation.status !== "ok") {
    throw new Error(`${SOUMU_ID}: 検証が ${soumuValidation.status} のため derive しません`);
  }
  const soumuDoc = anyParsedDocSchema.parse(readJson(parsedPath(SOUMU_ID)));
  if (soumuDoc.docType !== "municipal-accounts") throw new Error(`${SOUMU_ID}: municipal-accounts ではありません`);
  const kofuFact = soumuDoc.facts.find((f) => f.muniCode === SELF_CODE);
  if (!kofuFact?.expenditureByPurposeDetail) {
    throw new Error(`${SOUMU_ID}: 甲府市の項レベル内訳がありません（パーサ拡張前の parsed の可能性）`);
  }
  const soumuMeta = readRawMeta(SOUMU_ID);
  const soumuSource = findSource(SOUMU_ID);
  // 目的別歳出内訳ファイル（内訳の出典）の locator と sha256
  const mokutekiLoc = kofuFact.locators?.find((l) => l.file.includes("001061671")) ?? kofuFact.locator;
  const mokutekiFile = soumuMeta?.files.find((f) => f.filename === mokutekiLoc.file);
  const mokutekiUrl = wayback(
    soumuSource.urls?.find((u) => u.endsWith(mokutekiLoc.file)) ?? soumuSource.landingPage ?? "",
  );

  const byKan = Object.fromEntries(
    Object.entries(kofuFact.expenditureByPurposeDetail).map(([kan, kou]) => [
      kan,
      Object.entries(kou)
        .map(([name, v]) => ({ name, v: toOku(v) }))
        .sort((a, b) => b.v - a.v),
    ]),
  );
  const detailOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: ${soumuSource.title} 目的別歳出内訳（${mokutekiLoc.file} sha256=${mokutekiFile?.sha256.slice(0, 16) ?? "?"}… 行${mokutekiLoc.row}）
// 金額は億円（資料の千円値を 1e5 で割った正確値）。R6 決算であり R8 予算の内訳ではない

export const KOFU_R6_DETAIL: {
  fyLabel: string;
  /** 款名 → 項の一覧（金額降順） */
  byKan: Record<string, { name: string; v: number }[]>;
  sourceTitle: string;
  sourceUrl: string;
  /** 自サーバー配信の原本コピー */
  sourceLocalUrl: string;
  refLabel: string;
} = {
  fyLabel: "令和6年度 普通会計決算",
  byKan: ${JSON.stringify(byKan, null, 2)},
  sourceTitle: ${JSON.stringify(soumuSource.title)},
  sourceUrl: ${JSON.stringify(mokutekiUrl)},
  sourceLocalUrl: ${JSON.stringify(`/sources/${SOUMU_ID}/${mokutekiLoc.file}`)},
  refLabel: ${JSON.stringify(`${mokutekiLoc.file} ${mokutekiLoc.row}行目`)},
};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/detail.gen.ts"), detailOut, "utf8");
  console.log(`✓ R6 決算の項レベル内訳を導出 → src/client/lib/detail.gen.ts（${Object.keys(byKan).length}款）`);
}

// ============================================================================
// 甲府市 予算執行状況（複数年度）→ src/client/lib/execution.gen.ts
// R7 = 財政事情の公表（出納整理期間前の速報）。R6〜R1 = 決算状況の収入支出詳細
// （出納整理後の確定値）。R3 は市サイト消失後、WARP（国立国会図書館）の保存版から回収。
// ============================================================================
const EXEC_YEARS = [
  { srcId: "kofu-zaisei-jokyo-r7", fy: "R7" },
  { srcId: "kofu-kessan-syousai-r6", fy: "R6" },
  { srcId: "kofu-kessan-syousai-r5", fy: "R5" },
  { srcId: "kofu-kessan-syousai-r4", fy: "R4" },
  // R3 は市サイトから削除済みだったが WARP（国立国会図書館）の保存版から回収
  { srcId: "kofu-kessan-syousai-r3", fy: "R3" },
  { srcId: "kofu-kessan-syousai-r2", fy: "R2" },
  { srcId: "kofu-kessan-syousai-r1", fy: "R1" },
] as const;

function buildExecYear(entry: (typeof EXEC_YEARS)[number]) {
  const { srcId, fy } = entry;
  const validation = validationResultSchema.parse(readJson(validationPath(srcId)));
  if (validation.status !== "ok") {
    throw new Error(`${srcId}: 検証が ${validation.status} のため derive しません`);
  }
  const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
  if (doc.docType !== "budget-execution") {
    throw new Error(`${srcId}: budget-execution ドキュメントではありません`);
  }
  const meta = readRawMeta(srcId);
  if (!meta) throw new Error(`${srcId}: raw-meta がありません（先に pipeline:fetch）`);
  const source = findSource(srcId);
  const file = meta.files[0]!;
  const url = source.urls?.[0] ?? source.landingPage ?? "";
  const isFinal = doc.basis === "確定";
  const refLabelBase = isFinal ? "決算状況 収入支出詳細" : "財政事情";

  const row = (f: (typeof doc.facts)[number]) => ({
    name: f.name,
    budgetOku: toOku(f.currentBudget),
    settledOku: toOku(f.settled),
    ratePct: f.ratePct,
    ref: `${file.filename}#${f.locator.page != null ? `p${f.locator.page}` : `row${f.locator.row}`}`,
    refLabel: f.locator.page != null ? `${refLabelBase} p.${f.locator.page}` : `${refLabelBase} ${f.locator.row}行目`,
    // 市税などの内訳（予算現額のみの記載）
    ...(f.breakdown
      ? { breakdownNote: f.breakdown.map((b) => `${b.name} ${fmtBreakdownOku(b.currentBudget)}`).join("・") }
      : {}),
  });
  return {
    fy,
    basis: doc.basis,
    fyLabel: isFinal ? `令和${fy.slice(1)}年度（決算・確定値）` : `令和${fy.slice(1)}年度（${doc.asOf}）`,
    asOf: doc.asOf,
    asOfNote: isFinal
      ? "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません"
      : "出納整理期間前の年度末速報値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    population: doc.population,
    revenueBudgetTotalOku: toOku(doc.revenueBudgetTotal),
    revenueSettledTotalOku: toOku(doc.revenueSettledTotal),
    expenditureBudgetTotalOku: toOku(doc.expenditureBudgetTotal),
    expenditureSettledTotalOku: toOku(doc.expenditureSettledTotal),
    revenue: doc.facts.filter((f) => f.side === "revenue").map(row),
    expenditure: doc.facts.filter((f) => f.side === "expenditure").map(row),
    sourceTitle: source.title,
    // リンクは Wayback コピー優先（HTML ページ・上書き型 PDF とも版の固定が要る）
    sourceUrl: wayback(url),
    originUrl: url,
    // 自サーバー配信の原本コピー（PDF/HTML/Excel すべて。ドロワーが種別ごとに表示）
    sourceLocalUrl: `/sources/${srcId}/${file.filename}`,
    evidence: [
      {
        title: source.title,
        type: file.filename.toLowerCase().endsWith(".pdf") ? "PDF" : file.filename.toLowerCase().includes(".htm") ? "Web" : "Excel",
        url: wayback(url),
        localUrl: `/sources/${srcId}/${file.filename}`,
        source: url ? new URL(url).hostname : "",
        thumb: `${file.filename} ・ sha256 ${file.sha256.slice(0, 16)}… ・ ${file.fetchedAt.slice(0, 10)} 取得`,
      },
    ],
  };
}
// 内訳表示用の簡易整形（億円1桁。fmtOku 相当は gen 後の値なのでここで整形して埋め込む）
function fmtBreakdownOku(thousandYen: number): string {
  const oku = thousandYen / 100_000;
  return oku >= 1 ? `${oku >= 100 ? Math.round(oku).toLocaleString() : oku.toFixed(1)}億円` : `${Math.round(oku * 10000).toLocaleString()}万円`;
}

const execYears = EXEC_YEARS.map(buildExecYear);

const execOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 財政事情の公表（R7・速報）／決算状況 収入支出詳細（R6〜R1・確定。R3 は資料消失により欠落）
// 金額は億円（資料の万円値を千円経由で変換した正確値）。率は資料記載値

export interface KofuExecRow {
  name: string;
  /** 予算現額（億円・補正/繰越込み） */
  budgetOku: number;
  /** 収入済額（歳入）/ 支出済額（歳出）（億円） */
  settledOku: number;
  /** 資料記載の収入率/執行率（%）。予算現額0の款は null */
  ratePct: number | null;
  ref: string;
  refLabel: string;
  /** 内訳（市税の税目別予算現額など。確定値ページのみ） */
  breakdownNote?: string;
}

export interface KofuExecutionYear {
  /** 年度（"R7" など） */
  fy: string;
  /** 済額の基準（速報 = 出納整理前 / 確定 = 決算値） */
  basis: "速報" | "確定";
  fyLabel: string;
  asOf: string;
  asOfNote: string;
  population: number | null;
  revenueBudgetTotalOku: number;
  revenueSettledTotalOku: number;
  expenditureBudgetTotalOku: number;
  expenditureSettledTotalOku: number;
  revenue: KofuExecRow[];
  expenditure: KofuExecRow[];
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先） */
  sourceUrl: string;
  /** 発行元の元 URL */
  originUrl: string;
  /** 自サーバー配信の原本コピー（PDF のみ。HTML ページは空文字） */
  sourceLocalUrl: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/** 収録済みの執行状況（新しい年度順。R3 は資料消失により欠落） */
export const KOFU_EXECUTION_YEARS: KofuExecutionYear[] = ${JSON.stringify(execYears, null, 2)};

/** 最新年度（互換用） */
export const KOFU_EXECUTION: KofuExecutionYear = KOFU_EXECUTION_YEARS[0]!;
`;
writeFileSync(join(process.cwd(), "src/client/lib/execution.gen.ts"), execOut, "utf8");
console.log(
  `✓ 予算執行状況を導出 → src/client/lib/execution.gen.ts（${execYears
    .map((y) => `${y.fy}:${((y.expenditureSettledTotalOku / y.expenditureBudgetTotalOku) * 100).toFixed(1)}%${y.basis === "速報" ? "*" : ""}`)
    .join(" / ")}）`,
);

// ============================================================================
// 行政評価（事務事業評価）→ src/client/lib/evaluations.gen.ts
// 実施計画事業ごとの総合評価（H29〜R7 の9年度・計約1,500件）。
// 主な事業との紐付けは「予算名 = 予算書名」または「事業名の完全一致」のみ
// （曖昧マッチはしない — 誤った紐付けは誤エビデンスになるため）。
// ============================================================================
{
  const EVAL_YEARS = ["R7", "R6", "R5", "R4", "R3", "R2", "R1", "H30", "H29"] as const;
  const evalYears = EVAL_YEARS.map((fy) => {
    const srcId = `kofu-gyousei-hyouka-${fy.toLowerCase()}`;
    const v = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (v.status !== "ok") throw new Error(`${srcId}: 検証が ${v.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
    if (doc.docType !== "project-evaluation") throw new Error(`${srcId}: project-evaluation ではありません`);
    const meta = readRawMeta(srcId);
    if (!meta) throw new Error(`${srcId}: raw-meta がありません`);
    const src = findSource(srcId);
    const file = meta.files[0]!;
    const url = src.urls?.[0] ?? src.landingPage ?? "";
    return {
      fy,
      fyLabel: `${fy.startsWith("H") ? `平成${fy.slice(1)}` : `令和${fy.slice(1)}`}年度`,
      sourceTitle: src.title,
      sourceUrl: wayback(url),
      originUrl: url,
      sourceLocalUrl: `/sources/${srcId}/${file.filename}`,
      items: doc.facts.map((f) => ({
        name: f.name,
        grade: f.grade,
        prevGrade: f.prevGrade,
        budgetName: f.budgetName,
        bu: f.bu,
        ka: f.ka,
        ref: `${file.filename}#${f.locator.page != null ? `p${f.locator.page}` : `${f.locator.sheet ?? ""}!${f.locator.row}`}`,
      })),
    };
  });
  const evalOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 行政評価（事務事業評価）結果一覧 H29〜R7（形式の年度差は docs/data-sources.md）

export interface KofuEvaluationItem {
  /** 実施計画掲載事業名 / 事務事業名 */
  name: string;
  /** 総合評価（A〜F、完了、－=評価なし） */
  grade: string;
  prevGrade: string | null;
  /** 予算名（R6・R7 のみ。主な事業の予算書名と厳密一致で突合できる） */
  budgetName: string | null;
  bu: string | null;
  ka: string | null;
  /** 来歴（原資料ファイル内の位置） */
  ref: string;
}

export interface KofuEvaluationYear {
  fy: string;
  fyLabel: string;
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先） */
  sourceUrl: string;
  originUrl: string;
  /** 自サーバー配信コピー（PDF のみ） */
  sourceLocalUrl: string;
  items: KofuEvaluationItem[];
}

/** 事務事業評価（新しい年度順） */
export const KOFU_EVALUATION_YEARS: KofuEvaluationYear[] = ${JSON.stringify(evalYears, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/evaluations.gen.ts"), evalOut, "utf8");
  console.log(
    `✓ 事務事業評価を導出 → src/client/lib/evaluations.gen.ts（${evalYears.map((y) => `${y.fy}:${y.items.length}`).join(" / ")}）`,
  );
}

// ============================================================================
// 統計書 財政章（款項×当初/最終/決算）→ src/client/lib/outturn.gen.ts
// 款別ドリルダウンの項テーブル（当初→最終→決算）の原典。単位は円 → 億円へ変換。
// R3 歳出の「当初予算額」列は原典側の誤植（R2 の値のコピー。歳入側は正しく、
// R5版・R4版の両方が同じ値 — 予算資料との突合で 14款中12款が R2 と一致）のため
// 採用せず null にする。
// ============================================================================
{
  const OUTTURN_YEARS = ["R6", "R5", "R4", "R3", "R2", "R1", "H30"] as const;
  const yenToOku = (yen: number) => yen / 1e8;
  const outturnYears = OUTTURN_YEARS.map((fy) => {
    const srcId = `kofu-toukei-zaisei-${fy.toLowerCase()}`;
    const v = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (v.status !== "ok") throw new Error(`${srcId}: 検証が ${v.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
    if (doc.docType !== "budget-outturn") throw new Error(`${srcId}: budget-outturn ではありません`);
    const meta = readRawMeta(srcId);
    if (!meta) throw new Error(`${srcId}: raw-meta がありません`);
    const src = findSource(srcId);
    const expFile = meta.files.find((f) => f.filename.includes("15-02"))!;
    const url = src.urls?.find((u) => u.includes("15-02")) ?? src.landingPage ?? "";
    const initialSuspect = fy === "R3"; // 歳出の当初列が原典誤植（上記コメント）
    const row = (f: (typeof doc.facts)[number]) => ({
      kan: f.kanName,
      kou: f.kouName,
      initialOku: initialSuspect && f.side === "expenditure" ? null : yenToOku(f.initialBudget),
      finalOku: yenToOku(f.finalBudget),
      settledOku: yenToOku(f.settled),
      execPct: f.finalBudget > 0 ? Math.round((f.settled / f.finalBudget) * 1000) / 10 : null,
      ref: `${f.locator.file}#${f.locator.sheet}!${f.locator.row}`,
    });
    return {
      fy,
      fyLabel: `${fy.startsWith("H") ? `平成${fy.slice(1)}` : `令和${fy.slice(1)}`}年度`,
      initialNote: initialSuspect
        ? "歳出の当初予算額は原典（統計書）側の誤植（前年度値の再掲）と判定したため表示していません"
        : "",
      sourceTitle: src.title,
      sourceUrl: wayback(url),
      originUrl: url,
      sourceLocalUrl: `/sources/${srcId}/${expFile.filename}`,
      revenue: doc.facts.filter((f) => f.side === "revenue").map(row),
      expenditure: doc.facts.filter((f) => f.side === "expenditure").map(row),
      totals: {
        initialOku: initialSuspect ? null : yenToOku(doc.expenditureTotal.initial),
        finalOku: yenToOku(doc.expenditureTotal.final),
        settledOku: yenToOku(doc.expenditureTotal.settled),
      },
    };
  });
  const outturnOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市統計書「一般会計歳入歳出状況」各版（款項 × 当初/最終/決算。単位は億円 = 円/1e8）

export interface KofuOutturnRow {
  kan: string;
  /** 項名。null = 款の行 */
  kou: string | null;
  /** 当初予算額（億円）。R3 歳出は原典誤植のため null */
  initialOku: number | null;
  /** 最終予算額（億円・補正/繰越込み） */
  finalOku: number;
  /** 決算額（億円） */
  settledOku: number;
  /** 執行率 = 決算/最終（%・小数1桁） */
  execPct: number | null;
  ref: string;
}

export interface KofuOutturnYear {
  fy: string;
  fyLabel: string;
  /** 当初列に関する注記（R3 のみ） */
  initialNote: string;
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  revenue: KofuOutturnRow[];
  expenditure: KofuOutturnRow[];
  totals: { initialOku: number | null; finalOku: number; settledOku: number };
}

/** 款項の当初→最終→決算（新しい年度順） */
export const KOFU_OUTTURN_YEARS: KofuOutturnYear[] = ${JSON.stringify(outturnYears, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/outturn.gen.ts"), outturnOut, "utf8");
  console.log(
    `✓ 統計書 款項3点を導出 → src/client/lib/outturn.gen.ts（${outturnYears.map((y) => y.fy).join("・")}）`,
  );
}

// ---- 主な事業一覧（複数年度）→ src/client/lib/projects.gen.ts ----------------
{
  const projectYears = budgetYears
    .filter((b) => b.doc.projects && b.doc.projects.length > 0)
    .map((b) => ({
      fy: b.budget.fy,
      fyLabel: b.budget.fyLabel,
      projects: b.doc.projects!.map((p) => ({
        kan: p.kan,
        no: p.no,
        kubun: p.kubun,
        name: p.name,
        budgetBookName: p.budgetBookName,
        amountOku: toOku(p.amount),
        description: p.description,
        basicGoal: p.basicGoal,
        ...(p.basicGoalLabel ? { basicGoalLabel: p.basicGoalLabel } : {}),
        shisaku: p.shisaku,
        ref: `${b.projFile.filename}#p${p.locator.page}`,
        refLabel: `予算資料 p.${p.locator.page}`,
        // PDF のページアンカー付きリンク（Wayback コピー優先。フラグメントはコピーでも効く）
        refUrl: `${wayback(b.projUrl)}#page=${p.locator.page}`,
        // 自サーバー配信コピーの同ページ（ドロワー用）
        refLocalUrl: `/sources/${b.source.id}/${b.projFile.filename}#page=${p.locator.page}`,
      })),
      source: {
        title: b.source.title,
        url: wayback(b.projUrl),
        originUrl: b.projUrl,
        localUrl: `/sources/${b.source.id}/${b.projFile.filename}`,
        pagesLabel: b.pagesOpts.projectPages
          ? `p.${b.pagesOpts.projectPages.from}–${b.pagesOpts.projectPages.to}`
          : "",
      },
    }));
  if (projectYears.length === 0) throw new Error("主な事業が1年度分も導出できませんでした");
  const projOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 当初予算資料「主な事業一覧」${projectYears.map((y) => y.fy).join("・")}
// 金額は億円（資料の千円値を 1e5 で割った正確値）

export interface KofuProject {
  /** 歳出款または特別会計名。箇条書き形式の年度（R2・R3）は記載が無く null */
  kan: string | null;
  /** 資料の掲載番号（全体で連番）。箇条書き形式は null */
  no: number | null;
  /** 新規/拡充（表形式の区分列）または繰越（箇条書きの◆） */
  kubun: "新規" | "拡充" | "繰越" | null;
  /** 事業名（【N】=KOFU NEXT ACTION、【連】=県央ネットやまなし関連） */
  name: string;
  /** 予算書上の事業名（資料の下段（ ）書き） */
  budgetBookName: string | null;
  /** 予算額（億円） */
  amountOku: number;
  description: string;
  /** 総合計画の基本目標（ひと/まち/魅力、基本目標1〜4、基本構想の推進。複数は「・」連結） */
  basicGoal: string;
  /** 基本目標の名称（箇条書き形式の見出しから。表形式には無い） */
  basicGoalLabel?: string;
  /** 総合計画の施策（箇条書き形式では「施策の柱」） */
  shisaku: string;
  ref: string;
  refLabel: string;
  /** 原資料 PDF の該当ページへのリンク（Wayback コピー優先） */
  refUrl: string;
  /** 自サーバー配信コピーの該当ページ（/sources/...#page=N。ドロワー用） */
  refLocalUrl: string;
}

export interface KofuProjectYear {
  /** 年度（"R8" など） */
  fy: string;
  fyLabel: string;
  projects: KofuProject[];
  /** url = Wayback コピー / originUrl = 発行元 / localUrl = 自サーバー配信コピー */
  source: { title: string; url: string; originUrl: string; localUrl: string; pagesLabel: string };
}

/** 収録済みの主な事業一覧（新しい年度順） */
export const KOFU_PROJECT_YEARS: KofuProjectYear[] = ${JSON.stringify(projectYears, null, 2)};

/** 最新年度（互換用） */
export const KOFU_PROJECTS: KofuProject[] = KOFU_PROJECT_YEARS[0]!.projects;

export const KOFU_PROJECTS_SOURCE = KOFU_PROJECT_YEARS[0]!.source;
`;
  writeFileSync(join(process.cwd(), "src/client/lib/projects.gen.ts"), projOut, "utf8");
  console.log(
    `✓ 主な事業一覧を導出 → src/client/lib/projects.gen.ts（${projectYears.map((y) => `${y.fy}:${y.projects.length}事業`).join(" / ")}）`,
  );
}

// ============================================================================
// 外部アーカイブ台帳（data/archives.json）→ src/client/lib/archives.gen.ts
// 出典タブで「魚拓（Wayback Machine スナップショット）」リンクを出すための断面。
// 台帳が無い環境でも derive は通す（空マップを生成）
// ============================================================================
{
  const archivesPath = join(DATA_DIR, "archives.json");
  const entries = existsSync(archivesPath)
    ? archivesLedgerSchema.parse(readJson(archivesPath)).entries
    : [];
  const byUrl = Object.fromEntries(entries.map((e) => [e.url, e.waybackUrl]));
  const archOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（台帳の更新は bun run pipeline:archive）
// 一次資料の元 URL → Wayback Machine スナップショット URL

export const WAYBACK_BY_URL: Record<string, string> = ${JSON.stringify(byUrl, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/archives.gen.ts"), archOut, "utf8");
  console.log(`✓ 外部アーカイブ台帳を導出 → src/client/lib/archives.gen.ts（${entries.length}件）`);
}

// ============================================================================
// 全国 決算シャード（総務省 決算状況調 R2〜R6）→ public/decision/<県コード>.json
//   ＋ 索引 src/client/lib/decision-index.gen.ts
// 全1,741市町村に「決算ベースのダッシュボード」を出すための断面。追加取得0。
// クライアントは県コードごとに1ファイルをフェッチ（選択時・キャッシュ）。金額は億円。
// 甲府（192015）は full 階層（予算ベースの詳細画面）なので decision には載るが
// アプリ側は full を優先する。
// ============================================================================
{
  const DECISION_YEARS = ["R6", "R5", "R4", "R3", "R2"] as const;
  // 千円 → 億円（万円精度に丸めてシャードを軽くする。表示は fmtOku でさらに丸める）
  const okuR = (thousandYen: number) => Math.round((thousandYen / 1e5) * 1e4) / 1e4;
  const mapOku = (o: Record<string, number | undefined>): Record<string, number> =>
    Object.fromEntries(
      Object.entries(o)
        .filter(([, v]) => v != null)
        .map(([k, v]) => [k, okuR(v as number)]),
    );
  const mapOku2 = (o: Record<string, Record<string, number>>): Record<string, Record<string, number>> =>
    Object.fromEntries(Object.entries(o).map(([k, sub]) => [k, mapOku(sub)]));

  // fy → 出典 Excel カード（都市別/町村別の3ファイルずつ）＋概況ファイル名（family 判定用）
  const CARD_LABELS = [
    "都市別（1）概況",
    "都市別（2）歳入内訳",
    "都市別（3）目的別歳出内訳",
    "町村別（1）概況",
    "町村別（2）歳入内訳",
    "町村別（3）目的別歳出内訳",
  ];
  type Card = { title: string; type: string; url: string; localUrl: string; source: string; thumb: string };
  const decisionSources: Record<string, { city: Card[]; town: Card[]; cityGaikyo: string; townGaikyo: string }> = {};
  for (const fy of DECISION_YEARS) {
    const srcId = `soumu-shichoson-kessan-${fy.toLowerCase()}`;
    const src = findSource(srcId);
    const meta = readRawMeta(srcId);
    if (!meta) throw new Error(`${srcId}: raw-meta がありません（先に pipeline:fetch）`);
    const cards = (src.urls ?? [])
      .map((u, i) => {
        const filename = u.split("/").pop()!;
        const f = meta.files.find((x) => x.filename === filename);
        if (!f) return null;
        return {
          idx: i,
          title: `${src.title} ${CARD_LABELS[i]}`,
          type: "Excel",
          url: wayback(u),
          localUrl: `/sources/${srcId}/${filename}`,
          source: new URL(u).hostname,
          thumb: `${filename} ・ sha256 ${f.sha256.slice(0, 16)}… ・ ${f.fetchedAt.slice(0, 10)} 取得`,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c != null);
    decisionSources[fy] = {
      city: cards.filter((c) => c.idx < 3).map(({ idx: _i, ...r }) => r),
      town: cards.filter((c) => c.idx >= 3).map(({ idx: _i, ...r }) => r),
      cityGaikyo: (src.urls?.[0] ?? "").split("/").pop() ?? "",
      townGaikyo: (src.urls?.[3] ?? "").split("/").pop() ?? "",
    };
  }

  // 県コード → { 県名, 団体コード → { 市町村名, 年度→断面 } }
  const prefs = new Map<string, { prefName: string; munis: Map<string, { name: string; years: Record<string, unknown> }> }>();
  const prefCodes: Record<string, string> = {};
  let expMismatch = 0;
  let revMismatch = 0;

  // (4)性質別歳出・(5)地方債を年度ごとに団体コードで結合し、各年度スライスに付与する。億円。
  // R2〜R6 を収録済み。未取得の年度はスキップ（その年度はパネル非表示になる）。
  const seishitsuByYear = new Map<string, Map<string, { nature: Record<string, number>; bond: Record<string, number | null> | null }>>();
  for (const fy of DECISION_YEARS) {
    const srcId = `soumu-shichoson-seishitsu-${fy.toLowerCase()}`;
    if (!existsSync(parsedPath(srcId))) continue;
    const val = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (val.status !== "ok") throw new Error(`${srcId}: 検証が ${val.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
    if (doc.docType !== "municipal-nature") throw new Error(`${srcId}: municipal-nature ではありません`);
    const m = new Map<string, { nature: Record<string, number>; bond: Record<string, number | null> | null }>();
    for (const f of doc.facts) {
      const b = f.localBond;
      m.set(f.muniCode, {
        nature: mapOku(f.byNature),
        bond: b
          ? {
              balanceOku: okuR(b.balance),
              reserveOku: b.reserveTotal != null ? okuR(b.reserveTotal) : null,
              chouseiOku: b.reserveByType.財政調整基金 != null ? okuR(b.reserveByType.財政調整基金) : null,
              gensaiOku: b.reserveByType.減債基金 != null ? okuR(b.reserveByType.減債基金) : null,
              debtBurdenOku: b.debtBurdenFuture != null ? okuR(b.debtBurdenFuture) : null,
            }
          : null,
      });
    }
    seishitsuByYear.set(fy, m);
  }

  for (const fy of DECISION_YEARS) {
    const srcId = `soumu-shichoson-kessan-${fy.toLowerCase()}`;
    const v = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (v.status !== "ok") throw new Error(`${srcId}: 検証が ${v.status} のため derive しません`);
    const ds = normalizedDatasetSchema.parse(readJson(normalizedPath("municipal-accounts", fy, false)));
    const dsrc = decisionSources[fy]!;
    for (const r of ds.records) {
      if (!r.population || !r.expenditureTotal) continue;
      // 自己検証: Σ款 = 歳出総額（千円・厳密）。合わない年度は採用しない
      const expSum = Object.values(r.expenditureByPurpose).reduce((a, b) => a + (b ?? 0), 0);
      if (expSum !== r.expenditureTotal) {
        expMismatch++;
        continue;
      }
      const rev = r.revenueByCategory ?? {};
      const revSum = Object.values(rev).reduce((a, b) => a + b, 0);
      if (r.revenueTotal && revSum !== r.revenueTotal) revMismatch++; // 表示は科目和ベース。警告のみ

      const prefCode = r.muniCode.slice(0, 2);
      prefCodes[r.prefName] = prefCode;
      let pref = prefs.get(prefCode);
      if (!pref) {
        pref = { prefName: r.prefName, munis: new Map() };
        prefs.set(prefCode, pref);
      }
      let muni = pref.munis.get(r.muniCode);
      if (!muni) {
        muni = { name: r.muniName, years: {} };
        pref.munis.set(r.muniCode, muni);
      }
      const loc = r.sourceRef.locator;
      const family = loc.file === dsrc.cityGaikyo ? "city" : "town";
      muni.years[fy] = {
        pop: r.population,
        expTotalOku: okuR(r.expenditureTotal),
        revTotalOku: r.revenueTotal != null ? okuR(r.revenueTotal) : null,
        perCapYen: r.expenditurePerCapitaYen ?? Math.round((r.expenditureTotal * 1000) / r.population),
        finIdx: r.financialIndex ?? null,
        keijo: r.keijoShushiPct ?? null,
        kosai: r.jisshitsuKosaihiPct ?? null,
        shorai: r.shoraiFutanPct ?? null,
        family,
        exp: mapOku(r.expenditureByPurpose),
        expDetail: mapOku2(r.expenditureByPurposeDetail ?? {}),
        rev: mapOku(rev),
        revDetail: mapOku2(r.revenueByCategoryDetail ?? {}),
        ref: { file: loc.file, row: loc.row },
        // 性質別歳出・地方債（R2〜R6 収録済み。年度ごとに結合）
        ...(seishitsuByYear.get(fy)?.has(r.muniCode)
          ? { nature: seishitsuByYear.get(fy)!.get(r.muniCode)!.nature, bond: seishitsuByYear.get(fy)!.get(r.muniCode)!.bond }
          : {}),
      };
    }
  }

  // 県シャードを書き出す（決定的: 団体コード昇順）
  const decDir = join(process.cwd(), "public", "decision");
  mkdirSync(decDir, { recursive: true });
  let fileCount = 0;
  let muniCount = 0;
  for (const [prefCode, pref] of [...prefs.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const munis: Record<string, unknown> = {};
    for (const [code, m] of [...pref.munis.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      munis[code] = m;
      muniCount++;
    }
    const shard = { prefCode, prefName: pref.prefName, years: DECISION_YEARS, munis };
    writeFileSync(join(decDir, `${prefCode}.json`), JSON.stringify(shard), "utf8");
    fileCount++;
  }

  const prefCodeSorted = Object.fromEntries(
    Object.entries(prefCodes).sort((a, b) => a[1].localeCompare(b[1])),
  );
  const decIndexOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 全国 決算シャード（public/decision/<県コード>.json）の索引・出典メタ。
// 出典: 総務省「市町村別決算状況調」R2〜R6（普通会計決算）

export interface DecisionEvidenceCard {
  title: string;
  type: string;
  /** 一次資料へのリンク（Wayback コピー優先） */
  url: string;
  /** 自サーバー配信の原本コピー */
  localUrl: string;
  source: string;
  thumb: string;
}

/** 都道府県名 → 県コード（2桁）。決算シャードのファイル名になる */
export const PREF_CODES: Record<string, string> = ${JSON.stringify(prefCodeSorted, null, 2)};

/** 決算の収録年度（新しい順） */
export const DECISION_YEARS = ${JSON.stringify(DECISION_YEARS)} as const;

/** 年度 → 表示ラベル */
export const DECISION_FY_LABELS: Record<string, string> = ${JSON.stringify(
    Object.fromEntries(DECISION_YEARS.map((fy) => [fy, `令和${fy.slice(1)}年度 決算`])),
    null,
    2,
  )};

/** full 階層（予算ベースの詳細画面を持つ）自治体の団体コード */
export const FULL_MUNIS: string[] = ${JSON.stringify([SELF_CODE])};

/** fy → 出典 Excel（都市別/町村別の3ファイルずつ）。エビデンスドロワー用 */
export const DECISION_SOURCES: Record<string, { city: DecisionEvidenceCard[]; town: DecisionEvidenceCard[] }> = ${JSON.stringify(
    Object.fromEntries(DECISION_YEARS.map((fy) => [fy, { city: decisionSources[fy]!.city, town: decisionSources[fy]!.town }])),
    null,
    2,
  )};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/decision-index.gen.ts"), decIndexOut, "utf8");
  console.log(
    `✓ 全国 決算シャードを導出 → public/decision/（${fileCount}県・${muniCount}市町村）／ src/client/lib/decision-index.gen.ts`,
  );
  if (expMismatch) console.log(`  ⚠ Σ款≠歳出総額で除外した muni-年度: ${expMismatch}`);
  if (revMismatch) console.log(`  ⚠ Σ歳入科目≠歳入総額（表示は科目和ベース・警告のみ）: ${revMismatch}`);
}

// ============================================================================
// 類似市の当初予算（款別歳入歳出）→ src/client/lib/munibudgets.gen.ts
// 甲府の類似4市（豊川・山口・沼津・和泉）の当初予算を budget 階層として収録。
// 予算資料には主な事業・執行・評価が無いので款別歳入歳出＋前年当初比較のみ。
// 人口は総務省 R6 決算（最も近い全国統一値）。金額は億円。
// ============================================================================
{
  const BUDGET_SOURCES = [
    { srcId: "toyokawa-yosansho-r7", muniCode: "232076", muniName: "豊川市", prefName: "愛知県" },
    { srcId: "yamaguchi-yosansho-r7", muniCode: "352039", muniName: "山口市", prefName: "山口県" },
    { srcId: "numazu-yosansho-r7", muniCode: "222038", muniName: "沼津市", prefName: "静岡県" },
    { srcId: "izumi-yosansho-r8", muniCode: "272191", muniName: "和泉市", prefName: "大阪府" },
  ] as const;
  const popDs = normalizedDatasetSchema.parse(readJson(normalizedPath("municipal-accounts", "R6", false)));
  const TOP_REVENUE = 8; // 歳入ドーナツの上位款数（残りは「その他」に集約し内訳を children に）

  const budgets = BUDGET_SOURCES.map((b) => {
    const validation = validationResultSchema.parse(readJson(validationPath(b.srcId)));
    if (validation.status !== "ok") throw new Error(`${b.srcId}: 検証が ${validation.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(b.srcId)));
    if (doc.docType !== "budget-book") throw new Error(`${b.srcId}: budget-book ではありません`);
    const meta = readRawMeta(b.srcId);
    if (!meta) throw new Error(`${b.srcId}: raw-meta がありません`);
    const src = findSource(b.srcId);
    const file = meta.files[0]!;
    const url = src.urls?.[0] ?? src.landingPage ?? "";
    const popRec = popDs.records.find((r) => r.muniCode === b.muniCode);
    if (!popRec?.population) throw new Error(`${b.srcId}: 総務省R6に ${b.muniName}(${b.muniCode}) の人口がありません`);

    const row = (f: (typeof doc.facts)[number]) => ({
      name: f.kanName,
      v: toOku(f.amount),
      prevV: f.prevAmount != null ? toOku(f.prevAmount) : null,
      yoy: yoyPctOf(f.amount, f.prevAmount),
    });
    const expenditure = doc.facts.filter((f) => f.side === "expenditure").map(row).sort((a, b2) => b2.v - a.v);
    // 歳入は款数が多い（20超）ので上位 TOP_REVENUE ＋「その他」に集約（内訳は children）
    const revAll = doc.facts.filter((f) => f.side === "revenue").map(row).sort((a, b2) => b2.v - a.v);
    const revenue =
      revAll.length > TOP_REVENUE + 1
        ? [
            ...revAll.slice(0, TOP_REVENUE),
            {
              name: "その他",
              v: revAll.slice(TOP_REVENUE).reduce((a, r) => a + r.v, 0),
              prevV: revAll.slice(TOP_REVENUE).every((r) => r.prevV != null)
                ? revAll.slice(TOP_REVENUE).reduce((a, r) => a + (r.prevV ?? 0), 0)
                : null,
              yoy: null,
              children: revAll.slice(TOP_REVENUE),
            },
          ]
        : revAll;

    const yoyTotal = yoyPctOf(doc.expenditureTotal, doc.prevExpenditureTotal);
    return {
      muniCode: b.muniCode,
      muniName: b.muniName,
      prefName: b.prefName,
      fy: doc.fiscalYear,
      fyLabel: `令和${doc.fiscalYear.slice(1)}年度 当初予算`,
      population: popRec.population,
      populationLabel: "住民基本台帳人口（総務省 令和6年度決算）",
      totalOku: toOku(doc.expenditureTotal),
      prevTotalOku: doc.prevExpenditureTotal != null ? toOku(doc.prevExpenditureTotal) : null,
      yoyLabel: yoyTotal != null ? `${yoyTotal >= 0 ? "+" : ""}${yoyTotal.toFixed(1)}%` : "",
      prevBasis: doc.prevBasis,
      revenue,
      expenditure,
      sourceTitle: src.title,
      sourceUrl: wayback(url),
      originUrl: url,
      sourceLocalUrl: `/sources/${b.srcId}/${file.filename}`,
      pagesLabel: "款別歳入歳出",
      evidence: [
        {
          title: src.title,
          type: "PDF",
          url: wayback(url),
          localUrl: `/sources/${b.srcId}/${file.filename}`,
          source: url ? new URL(url).hostname : "",
          thumb: `${file.filename} ・ sha256 ${file.sha256.slice(0, 16)}… ・ ${file.fetchedAt.slice(0, 10)} 取得`,
        },
      ],
    };
  });

  const byCode = Object.fromEntries(budgets.map((b) => [b.muniCode, b]));
  const muniBudgetsOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 甲府の類似4市（豊川・山口・沼津・和泉）の当初予算（款別歳入歳出・前年当初比較つき）。
// budget 階層: 予算資料に主な事業・執行・評価が無いため款別＋前年比較のみ。金額は億円

export interface MuniKanRow {
  name: string;
  /** 当年度予算額（億円） */
  v: number;
  /** 前年度予算額（億円） */
  prevV: number | null;
  /** 対前年度（%） */
  yoy: number | null;
  /** 「その他」集約の内訳（実款） */
  children?: MuniKanRow[];
}

export interface MuniBudget {
  muniCode: string;
  muniName: string;
  prefName: string;
  fy: string;
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  prevBasis: "当初" | "補正後";
  revenue: MuniKanRow[];
  expenditure: MuniKanRow[];
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  pagesLabel: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/** 団体コード → 当初予算（budget 階層の4市） */
export const MUNI_BUDGETS: Record<string, MuniBudget> = ${JSON.stringify(byCode, null, 2)};

/** budget 階層（予算ベースの款別ダッシュボードを持つ）自治体の団体コード */
export const BUDGET_MUNIS: string[] = ${JSON.stringify(budgets.map((b) => b.muniCode))};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/munibudgets.gen.ts"), muniBudgetsOut, "utf8");
  console.log(
    `✓ 類似市の当初予算を導出 → src/client/lib/munibudgets.gen.ts（${budgets
      .map((b) => `${b.muniName}:${b.totalOku.toFixed(0)}億`)
      .join(" / ")}）`,
  );
}
