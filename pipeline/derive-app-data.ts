// [3]→アプリ normalized データセットからアプリ用の静的モジュールを導出する。
// 現状の対象: 類似自治体比較（src/client/lib/similar.gen.ts）。
// 巨大な normalized JSON をクライアントに import せず、必要な断面だけを
// 決定的（タイムスタンプなし）に生成してコミットする。
// 使い方: bun run pipeline:derive
import {
  anyParsedDocSchema,
  normalizedDatasetSchema,
  validationResultSchema,
  type NormalizedMuniAccount,
} from "./types";
import {
  normalizedPath,
  parsedPath,
  readJson,
  readRawMeta,
  validationPath,
} from "./lib/store";
import { findSource } from "./registry/sources";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_ID = "soumu-shichoson-kessan-r6";
const SELF_CODE = "192015"; // 甲府市
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
    url: source.urls?.find((u) => u.endsWith(f.filename)) ?? source.landingPage ?? "",
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
  /** 一次資料への実リンク（総務省サイトの直リンク） */
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
// 甲府市 R8 予算書（款別）→ src/client/lib/kofu.gen.ts
// アプリの KOFU 款レベル（従来は丸め値）を予算書パース値＋出典位置で置き換える。
// 項以下のダミー内訳の按分は data.ts 側で行う（生成物は款レベルの事実のみ）。
// ============================================================================
const KOFU_SOURCE_ID = "kofu-yosansho-r8";
// ダッシュボードの歳入表示グループ（款名の完全一致）。残りの款は「諸収入・その他」へ合算
const REVENUE_GROUPS = [
  "市税", "国庫支出金", "地方交付税", "県支出金", "地方消費税交付金", "繰入金", "寄附金", "市債",
] as const;

// 検証ゲート: needs_review の parsed を derive に通さない
const kofuValidation = validationResultSchema.parse(readJson(validationPath(KOFU_SOURCE_ID)));
if (kofuValidation.status !== "ok") {
  throw new Error(`${KOFU_SOURCE_ID}: 検証が ${kofuValidation.status} のため derive しません`);
}
const kofuDoc = anyParsedDocSchema.parse(readJson(parsedPath(KOFU_SOURCE_ID)));
if (kofuDoc.docType !== "budget-book") {
  throw new Error(`${KOFU_SOURCE_ID}: budget-book ドキュメントではありません`);
}
const kofuMeta = readRawMeta(KOFU_SOURCE_ID);
if (!kofuMeta) throw new Error(`${KOFU_SOURCE_ID}: raw-meta がありません（先に pipeline:fetch）`);
const kofuSource = findSource(KOFU_SOURCE_ID);
const kofuFile = kofuMeta.files[0]!;
const kofuUrl = kofuSource.urls?.[0] ?? kofuSource.landingPage ?? "";

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
  ref: `${kofuFile.filename}#p${page}`,
  refLabel: refLabel ?? `予算書 p.${page}`,
});

const expFacts = kofuDoc.facts.filter((f) => f.side === "expenditure");
const revFacts = kofuDoc.facts.filter((f) => f.side === "revenue");

const kofuExpenditure = expFacts
  .map((f) => kanRow(f.kanName, f.amount, f.prevAmount, f.locator.page ?? 0))
  .sort((a, b) => b.v - a.v);

const groupedRevenue: KofuKanRowGen[] = REVENUE_GROUPS.map((g) => {
  const f = revFacts.find((x) => x.kanName === g);
  if (!f) throw new Error(`歳入款「${g}」が parsed にありません（表示グループの款名を見直してください）`);
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
const kofuRevenue = [...groupedRevenue].sort((a, b) => b.v - a.v);

// 合算の自己検証（グループ化でこぼしていないか）
const revSum = kofuRevenue.reduce((a, r) => a + r.v, 0);
if (Math.abs(revSum - toOku(kofuDoc.revenueTotal)) > 1e-6) {
  throw new Error(`歳入グループの和 ${revSum} が歳入合計 ${toOku(kofuDoc.revenueTotal)} と一致しません`);
}

const yoyTotal = yoyPctOf(kofuDoc.expenditureTotal, kofuDoc.prevExpenditureTotal);
const pagesOpts = (kofuSource.parserOptions ?? {}) as {
  revenuePage?: number;
  expenditurePage?: number;
  projectPages?: { from: number; to: number };
};
const kofuBudget = {
  fyLabel: "令和8年度 当初予算",
  // 人口は総務省 R6 決算状況調の住民基本台帳人口（令7.1.1現在）。1人あたり換算に使う
  population: self.population,
  populationLabel: "住民基本台帳人口（令7.1.1現在）",
  totalOku: toOku(kofuDoc.expenditureTotal),
  prevTotalOku: kofuDoc.prevExpenditureTotal != null ? toOku(kofuDoc.prevExpenditureTotal) : null,
  yoyLabel: yoyTotal != null ? `${yoyTotal >= 0 ? "+" : ""}${yoyTotal.toFixed(1)}%` : "",
  sourceTitle: kofuSource.title,
  sourceUrl: kofuUrl,
  pagesLabel: `p.${pagesOpts.revenuePage}–${pagesOpts.expenditurePage}`,
  revenue: kofuRevenue,
  expenditure: kofuExpenditure,
  evidence: [
    {
      title: kofuSource.title,
      type: "PDF",
      url: kofuUrl,
      source: kofuUrl ? new URL(kofuUrl).hostname : "",
      thumb: `${kofuFile.filename} ・ sha256 ${kofuFile.sha256.slice(0, 16)}… ・ ${kofuFile.fetchedAt.slice(0, 10)} 取得`,
    },
  ],
};

const kofuOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: ${kofuSource.title}（${kofuFile.filename} sha256=${kofuFile.sha256.slice(0, 16)}…）
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

export const KOFU_BUDGET: {
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  sourceTitle: string;
  sourceUrl: string;
  pagesLabel: string;
  revenue: KofuKanRow[];
  expenditure: KofuKanRow[];
  evidence: { title: string; type: string; url: string; source: string; thumb: string }[];
} = ${JSON.stringify(kofuBudget, null, 2)};
`;

const kofuDest = join(process.cwd(), "src/client/lib/kofu.gen.ts");
writeFileSync(kofuDest, kofuOut, "utf8");
console.log(`✓ 甲府市 R8 款別予算を導出 → src/client/lib/kofu.gen.ts`);
console.log(
  `  総額 ${kofuBudget.totalOku}億円（前年比 ${kofuBudget.yoyLabel}） / 歳入 ${kofuRevenue.length}グループ・歳出 ${kofuExpenditure.length}款`,
);

// ---- 主な事業一覧 → src/client/lib/projects.gen.ts ---------------------------
if (kofuDoc.projects && kofuDoc.projects.length > 0) {
  const projRows = kofuDoc.projects.map((p) => ({
    kan: p.kan,
    no: p.no,
    kubun: p.kubun,
    name: p.name,
    budgetBookName: p.budgetBookName,
    amountOku: toOku(p.amount),
    description: p.description,
    basicGoal: p.basicGoal,
    shisaku: p.shisaku,
    ref: `${kofuFile.filename}#p${p.locator.page}`,
    refLabel: `予算資料 p.${p.locator.page}`,
  }));
  const projOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: ${kofuSource.title}「主な事業一覧」（${kofuFile.filename} sha256=${kofuFile.sha256.slice(0, 16)}…）
// 金額は億円（資料の千円値を 1e5 で割った正確値）

export interface KofuProject {
  /** 歳出款または特別会計名 */
  kan: string;
  /** 資料の掲載番号（全体で連番） */
  no: number;
  kubun: "新規" | "拡充" | null;
  /** 事業名（【N】=KOFU NEXT ACTION、【連】=県央ネットやまなし関連） */
  name: string;
  /** 予算書上の事業名（資料の下段（ ）書き） */
  budgetBookName: string | null;
  /** 予算額（億円） */
  amountOku: number;
  description: string;
  /** 総合計画の基本目標（ひと/まち/魅力。複数は「・」連結） */
  basicGoal: string;
  /** 総合計画の施策 */
  shisaku: string;
  ref: string;
  refLabel: string;
}

export const KOFU_PROJECTS: KofuProject[] = ${JSON.stringify(projRows, null, 2)};

export const KOFU_PROJECTS_SOURCE = {
  title: ${JSON.stringify(kofuSource.title)},
  url: ${JSON.stringify(kofuUrl)},
  pagesLabel: ${JSON.stringify(pagesOpts.projectPages ? `p.${pagesOpts.projectPages.from}–${pagesOpts.projectPages.to}` : "")},
};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/projects.gen.ts"), projOut, "utf8");
  console.log(`✓ 主な事業一覧を導出 → src/client/lib/projects.gen.ts（${projRows.length}事業）`);
}
