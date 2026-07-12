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
import { existsSync, writeFileSync } from "node:fs";
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
  // R4・R5 は資料が市サイトから削除済みで入手不可（data-sources.md 参照）
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
  refLabel: string;
} = {
  fyLabel: "令和6年度 普通会計決算",
  byKan: ${JSON.stringify(byKan, null, 2)},
  sourceTitle: ${JSON.stringify(soumuSource.title)},
  sourceUrl: ${JSON.stringify(mokutekiUrl)},
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
    // PDF のみ自サーバー配信（HTML ページはドロワー対象外 → 空文字）
    sourceLocalUrl: file.filename.toLowerCase().endsWith(".pdf") ? `/sources/${srcId}/${file.filename}` : "",
    evidence: [
      {
        title: source.title,
        type: file.filename.toLowerCase().endsWith(".pdf") ? "PDF" : "Web",
        url: wayback(url),
        localUrl: file.filename.toLowerCase().endsWith(".pdf") ? `/sources/${srcId}/${file.filename}` : "",
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
