// [3]→アプリ normalized データセットからアプリ用の静的モジュールを導出する。
// 現状の対象: 類似自治体比較（src/client/lib/similar.gen.ts）。
// 巨大な normalized JSON をクライアントに import せず、必要な断面だけを
// 決定的（タイムスタンプなし）に生成してコミットする。
// 使い方: bun run pipeline:derive
import { normalizedDatasetSchema, type NormalizedMuniAccount } from "./types";
import { normalizedPath, readJson, readRawMeta } from "./lib/store";
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
