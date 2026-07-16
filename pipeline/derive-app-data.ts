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
import { eraYear, fyRank } from "./lib/fy";
import { findSource, SOURCES } from "./registry/sources";
import { ROADMAP } from "./registry/roadmap";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
/** 魚拓サービスの URL か（＝この URL 自体が保存版で、発行元の生 URL ではない） */
const isArchiveUrl = (url: string): boolean => /^https?:\/\/(web\.archive\.org|warp\.ndl\.go\.jp)\//.test(url);

// ---- ライセンス区分 --------------------------------------------------------
// license 原文から推定する（表記が揺れたら安全側の unverified に落ちる）:
//   open / permission-required / unverified
// permission-required は /coverage の区分表示だけでなく、**画面のエビデンスリンクを
// 自サーバーのコピーから発行元のディープリンクへ切り替える**（evidence-policy.gen.ts）
// 判定でもあるため、ここが緩むと許諾のない資料を配信リンクで見せることになる。
//
// 「無断で複製・転用することはできません」型の禁止文言も permission-required に落とす
// （2026-07-15 追加）。それまでの語彙は「要許可|非営利」だけで、この型の明示的な禁止が
// unverified（＝可否未確認・要確認）に落ちていた — 実態より緩い区分で、未確認の山に紛れる。
// unverified が「安全側」なのは open に対してだけで、禁止文言に対しては安全側ではない。
//
// ⚠ **この分類器は文脈を読まない**。license 欄に**適用されない規約の名前**を説明として書くと
// 語で拾って**逆の区分に落ちる**（2026-07-16 に実際に踏んだ: 熊本の license に
// 「公共データ利用規約は適用範囲外」と書いたら **open に分類された** ＝ 発行元が許諾していないのに
// 「自由に使える」と画面に出すところだった）。**license 欄には適用される条件だけを書き、
// 経緯は registry のコメントに置く**こと。
//
// **この分類器は「語彙を1つ足す」たびに同じ穴を再生産する**（2026-07-16・さいたまで再発）。
// さいたまの「無断使用・転載を禁止します」は、上の語彙（複製・転用）のどれにも当たらず
// unverified へ落ちた。発行元は市ごとに違う動詞を使う（使用／複製／転用／転載／改変／販売／
// 印刷配布）ので、**動詞を列挙するのではなく「無断」＋禁止の言い回しで捕まえる**。
// **禁止を先に判定する**（2026-07-16・特別区）。オープンデータ規約は「ポータル掲載データのみに
// 適用」と自ら範囲を限る書き方が定番で、その規約文を非 open な資料の license に取り違えて
// 書くと open へ誤判定される（§9g の実害）。**明示的な禁止文言は CC BY の言及に勝たせる**＝
// 取り違えたときに厳しい側へ落ちる。既存の open 13件は禁止文言を1つも含まないことを実測確認済み。
//
// CC BY を open に足した（2026-07-16・特別区）。特別区は**予算データそのものを CC BY の
// オープンデータとして出す区**が実在し（世田谷 CSV・練馬 XLSX・千代田はサイト全体・
// 東京都の決算 XLSX）、政令市20市の「ポータルの CC BY は予算書に及ばない」とは事情が違う。
// 語彙が無いままだと**初の真正 open が unverified として画面に出る**。
const licenseClassOf = (lic: string): "open" | "permission-required" | "unverified" =>
  /要許可|非営利|無断|複製・転用|転載を禁止|使用を禁止|(?:転載|複製|二次利用|引用)[^。]{0,10}(?:禁じ|禁止)/.test(lic)
    ? "permission-required"
  : /政府標準利用規約|公共データ利用規約|クリエイティブ・コモンズ|CC[ -]?BY/i.test(lic) ? "open"
  : "unverified";
// 歳出構成の表示科目（この順で構成比を出し、残りは「その他」）
const MIX_COLS = ["民生費", "教育費", "土木費", "公債費"] as const;

// R6 のファイル構成（registry の urls と対応）。年度更新時はここも見直す。
// pair = 表示行の locator（概況）に対して、目的別歳出を供給した相方ファイル
const FILE_INFO: Record<string, { label: string; short: string; family: "city" | "town"; pair?: string }> = {
  "001061669.xlsx": { label: "都市別（1）概況", short: "都市別・概況", family: "city", pair: "001061671.xlsx" },
  "001061671.xlsx": { label: "都市別（3）目的別歳出内訳", short: "都市別・目的別", family: "city" },
  "001061674.xlsx": { label: "町村別（1）概況", short: "町村別・概況", family: "town", pair: "001061676.xlsx" },
  "001061676.xlsx": { label: "町村別（3）目的別歳出内訳", short: "町村別・目的別", family: "town" },
};
/** 索引の来歴（fx）が指すファイルの並び。index の files と同じ順 */
const SIM_FILES = Object.keys(FILE_INFO);
const SIMILAR_FY_LABEL = "令和6年度（普通会計決算）";

const ds = normalizedDatasetSchema.parse(
  readJson(normalizedPath("municipal-accounts", "R6", false)),
);

// 類似自治体比較は「軸を選んで比較相手を選ぶ」画面なので、特定の4市を導出時に
// 決め打ちせず、全1,741市町村の比較可能な断面を索引として書き出す（アプリ側で
// 軸ごとの距離を計算してサジェストする）。県シャードは県単位でしか引けず全国
// 横断の並べ替えができないため、この画面専用の索引を別に持つ。
// 静的 import すると全ページのバンドルに載るので、public/ に置いてこの画面で取得する。
const indexRows = ds.records
  .flatMap((r) => {
    if (!r.population || !r.expenditureTotal) return [];
    // 自己検証: Σ款 = 歳出総額（千円・厳密）。合わない行は決算シャードにも載らない
    // （＝ダッシュボードを開けない）ので、比較相手としても出さない
    const expSum = Object.values(r.expenditureByPurpose).reduce((a, b) => a + (b ?? 0), 0);
    if (expSum !== r.expenditureTotal) return [];
    const loc = r.sourceRef.locator;
    const info = FILE_INFO[loc.file];
    if (!info) throw new Error(`${r.muniCode}: 未知の locator ファイル ${loc.file}`);
    // 歳出構成比（MIX_COLS 順、残りは「その他」で合計をちょうど100にする）
    const mix: number[] = [];
    let rest = 100;
    for (const col of MIX_COLS) {
      const rounded = Math.round(((r.expenditureByPurpose[col] ?? 0) / r.expenditureTotal) * 1000) / 10;
      mix.push(rounded);
      rest -= rounded;
    }
    mix.push(Math.round(rest * 10) / 10);
    return [{
      c: r.muniCode,
      n: r.muniName,
      p: r.prefName,
      f: info.family,
      pop: r.population,
      exp: Math.round((r.expenditureTotal / 100_000) * 10) / 10, // 千円 → 億円
      // 1人あたり歳出（円）。決算シャード（ダッシュボード）と同じく資料の公表値を優先する
      pc: r.expenditurePerCapitaYen ?? Math.round((r.expenditureTotal * 1000) / r.population),
      fi: r.financialIndex ?? null,
      mix,
      fx: SIM_FILES.indexOf(loc.file),
      rw: loc.row,
    }];
  })
  .sort((a, b) => a.c.localeCompare(b.c));

if (!indexRows.some((r) => r.c === SELF_CODE)) {
  throw new Error(`類似自治体索引に ${SELF_CODE}（甲府市）がありません`);
}

const simDir = join(process.cwd(), "public", "decision");
mkdirSync(simDir, { recursive: true });
writeFileSync(
  join(simDir, "similar-index.json"),
  JSON.stringify({
    fy: "R6",
    fyLabel: SIMILAR_FY_LABEL,
    mixCols: [...MIX_COLS, "その他"],
    files: SIM_FILES.map((f) => ({ name: f, short: FILE_INFO[f]!.short })),
    munis: indexRows,
  }),
  "utf8",
);

// エビデンスカード: 表示行の locator が指しうるファイル（概況＋目的別歳出の相方）を
// raw-meta（sha256・取得日）と registry（URL）から組み立てる。比較相手は市にも町村にも
// なりうるので両方を載せ、画面側で「表示中の行が実際に使ったファイル」だけに絞る。
const rawMeta = readRawMeta(SOURCE_ID);
if (!rawMeta) throw new Error(`${SOURCE_ID}: raw-meta がありません（先に pipeline:fetch）`);
const source = findSource(SOURCE_ID);
const evidence = rawMeta.files
  .filter((f) => FILE_INFO[f.filename])
  .map((f) => ({
    family: FILE_INFO[f.filename]!.family,
    title: `${source.title} ${FILE_INFO[f.filename]!.label}`,
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
 * 比較行そのものは全国索引 public/decision/similar-index.json（全${indexRows.length}市町村）に
 * 書き出してあり、どの自治体をどの軸で比べるかはアプリ側で決める。ここは画面の
 * 定数（年度ラベル・構成比の科目・エビデンスカード）だけを持つ。
 */

export const SIMILAR_FY_LABEL = "${SIMILAR_FY_LABEL}";

/** 全国索引の取得先（この画面でだけフェッチする） */
export const SIMILAR_INDEX_URL = "/decision/similar-index.json";

export interface SimilarEvidence {
  /** このカードが裏付ける行の種別（市＝city／町村＝town） */
  family: "city" | "town";
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
console.log(`✓ 類似自治体比較を導出 → public/decision/similar-index.json（${indexRows.length}市町村）／ src/client/lib/similar.gen.ts`);

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
    fyLabel: `${eraYear(fy)}年度 当初予算`,
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
      fyLabel: `${eraYear(fy)}年度`,
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

function buildExecYear(entry: { srcId: string; fy: string; refLabelBase?: string }) {
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
  // 甲府（万円→千円）は toOku(/1e5)、山梨県（円）は yenToOku(/1e8）
  const okuOf = (n: number) => (doc.unit === "yen" ? n / 1e8 : n / 100_000);
  const refLabelBase = entry.refLabelBase ?? (isFinal ? "決算状況 収入支出詳細" : "財政事情");

  const row = (f: (typeof doc.facts)[number]) => ({
    name: f.name,
    budgetOku: okuOf(f.currentBudget),
    settledOku: okuOf(f.settled),
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
    fyLabel: isFinal ? `${eraYear(fy)}年度（決算・確定値）` : `${eraYear(fy)}年度（${doc.asOf}）`,
    asOf: doc.asOf,
    asOfNote: isFinal
      ? "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません"
      : "出納整理期間前の年度末速報値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    population: doc.population,
    revenueBudgetTotalOku: okuOf(doc.revenueBudgetTotal),
    revenueSettledTotalOku: okuOf(doc.revenueSettledTotal),
    expenditureBudgetTotalOku: okuOf(doc.expenditureBudgetTotal),
    expenditureSettledTotalOku: okuOf(doc.expenditureSettledTotal),
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
      fyLabel: `${eraYear(fy)}年度`,
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
// 議会の構成（予算議決時）→ src/client/lib/council.gen.ts
// 甲府市議会の会派別議席数＋当初予算の議決（会派名簿・審議結果の2 HTML）。
// 賛否内訳・会派別賛否は非公表なので持たない。エビデンスは名簿と審議結果の2件
// （各 ①発行元 ②Wayback ③自サーバー配信）＋参考の会議録検索・議会だより。
// ============================================================================
{
  const COUNCIL_FYS = ["R8", "R7", "R6", "R5", "R4", "R3", "R2"] as const;
  const councils = COUNCIL_FYS.map((fy) => {
    const srcId = `kofu-gikai-${fy.toLowerCase()}`;
    const v = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (v.status !== "ok") throw new Error(`${srcId}: 検証が ${v.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
    if (doc.docType !== "council-composition") throw new Error(`${srcId}: council-composition ではありません`);
    const meta = readRawMeta(srcId);
    if (!meta) throw new Error(`${srcId}: raw-meta がありません`);
    const src = findSource(srcId);
    const rosterFile = meta.files.find((f) => /kaiha/i.test(f.filename)) ?? meta.files[0]!;
    const resultFile = meta.files.find((f) => /kekka|shingi/i.test(f.filename)) ?? meta.files[1]!;
    const rosterOrigin = src.urls![0]!;
    const resultOrigin = src.urls![1]!;
    const asOfLabel = doc.asOf.replace(/^(\d{4})-(\d{2})-(\d{2})$/, (_m, y, mo, d) => `${y}年${Number(mo)}月${Number(d)}日`);
    return {
      fy,
      fyLabel: `${eraYear(fy)}年度 当初予算`,
      body: doc.body,
      seats: doc.seats,
      asOf: doc.asOf,
      asOfLabel,
      factions: doc.factions.map((f) => ({ name: f.name, seats: f.seats, isIndependent: f.isIndependent })),
      resolution: {
        billNo: doc.resolution.billNo,
        billName: doc.resolution.billName,
        sessionLabel: doc.resolution.sessionLabel,
        decidedDate: doc.resolution.decidedDate,
        decidedDateLabel: doc.resolution.decidedDateLabel,
        result: doc.resolution.result,
      },
      sourceTitle: src.title,
      // ①発行元 ②Wayback ③自サーバー配信（HTML はサンドボックス iframe で開く）
      roster: {
        title: "所属会派別議員名簿",
        localUrl: `/sources/${srcId}/${rosterFile.filename}`,
        originUrl: rosterOrigin,
        archiveUrl: wayback(rosterOrigin),
      },
      result: {
        title: `${doc.resolution.sessionLabel} 審議結果`,
        localUrl: `/sources/${srcId}/${resultFile.filename}`,
        originUrl: resultOrigin,
        archiveUrl: wayback(resultOrigin),
      },
      // 参考（二次エビデンス・パイプライン外の外部リンク）
      minutesUrl: "https://www.city.kofu.yamanashi.dbsr.jp/",
      newsletterUrl: "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html",
    };
  });
  const councilOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市議会 所属会派別議員名簿（各予算の議決時点のバージョン）＋各年3月定例会 審議結果。
// 会派構成は名簿の更新日でバージョンを固定（過去分は Wayback スナップショット）。
// 賛否内訳・会派別賛否は非公表（起立採決で「可決」のみ）のため持たない。

export interface CouncilFaction {
  name: string;
  seats: number;
  isIndependent: boolean;
}
export interface CouncilEvidence {
  title: string;
  /** 自サーバー配信の原本コピー（③・サンドボックス iframe で開く） */
  localUrl: string;
  /** 発行元（①） */
  originUrl: string;
  /** Wayback 魚拓（②） */
  archiveUrl: string;
}
export interface KofuCouncil {
  /** 予算年度（この議会が議決した当初予算の年度。"R8" など） */
  fy: string;
  fyLabel: string;
  /** 議会名 */
  body: string;
  /** 定数（＝現員＝会派議席合計） */
  seats: number;
  /** 会派構成の基準日 ISO（名簿の更新日） */
  asOf: string;
  asOfLabel: string;
  factions: CouncilFaction[];
  resolution: {
    billNo: string;
    billName: string;
    sessionLabel: string;
    decidedDate: string;
    decidedDateLabel: string;
    result: string;
  };
  sourceTitle: string;
  roster: CouncilEvidence;
  result: CouncilEvidence;
  minutesUrl: string;
  newsletterUrl: string;
}

/** 甲府市議会の構成（予算議決時）。新しい年度順（R8→R2）。 */
export const KOFU_COUNCIL_YEARS: KofuCouncil[] = ${JSON.stringify(councils, null, 2)};

/** 最新（R8）。年度未指定時のフォールバック。 */
export const KOFU_COUNCIL: KofuCouncil = KOFU_COUNCIL_YEARS[0]!;
`;
  writeFileSync(join(process.cwd(), "src/client/lib/council.gen.ts"), councilOut, "utf8");
  console.log(
    `✓ 議会の構成を導出 → src/client/lib/council.gen.ts（${councils.length}年度 ${councils.map((c) => `${c.fy}:${c.factions.length}会派`).join(" ")}）`,
  );
}

// ============================================================================
// 事業報告（成果）＝事務事業評価 詳細票（第2号様式）→ src/client/lib/report.gen.ts
// 予算→執行→成果を1事業で通して見られる詳細票。公表は各年サンプル数件のみ。
// 事業費（決算＋当初＋計画）・トータルコスト・成果指標の目標/実績・総合評価を持つ。
// ============================================================================
{
  const REPORT_FYS = ["R7", "R6"] as const;
  const reportYears = REPORT_FYS.map((fy) => {
    const srcId = `kofu-jigyou-houkoku-${fy.toLowerCase()}`;
    const v = validationResultSchema.parse(readJson(validationPath(srcId)));
    if (v.status !== "ok") throw new Error(`${srcId}: 検証が ${v.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(srcId)));
    if (doc.docType !== "project-report") throw new Error(`${srcId}: project-report ではありません`);
    const meta = readRawMeta(srcId);
    if (!meta) throw new Error(`${srcId}: raw-meta がありません`);
    const src = findSource(srcId);
    const file = meta.files[0]!;
    const url = src.urls?.[0] ?? src.landingPage ?? "";
    return {
      fy,
      fyLabel: `${eraYear(fy)}年度`,
      targetFy: doc.targetFy,
      targetFyLabel: doc.targetFy ? `${eraYear(doc.targetFy)}年度` : "",
      sourceTitle: src.title,
      sourceUrl: wayback(url),
      originUrl: url,
      sourceLocalUrl: `/sources/${srcId}/${file.filename}`,
      reports: doc.facts.map((f) => ({
        no: f.no,
        name: f.name,
        buka: f.buka,
        kubun: f.kubun,
        implementation: f.implementation,
        grade: f.grade,
        score: f.score,
        cost: f.cost,
        indicators: f.indicators,
        ref: `${file.filename}#${f.locator.sheet ?? ""}`,
      })),
    };
  });
  const reportOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 事務事業評価 詳細票（第2号様式）。公表は各年サンプル数件のみ。
// 全事業分の詳細票は情報公開請求（未収録＝リクエスト）。

export interface ReportCostYear {
  fy: string;
  kind: "決算" | "当初" | "計画";
  jigyohi: number | null;
  ippanZaigen: number | null;
  totalCost: number | null;
}
export interface ReportIndicator {
  category: "活動指標" | "成果指標";
  name: string;
  /** 目標値（年度順・最大5）。定性指標は null */
  targets: (number | null)[];
  /** 実績値（決算年度分） */
  actuals: (number | null)[];
}
export interface KofuReport {
  no: string;
  /** 事務事業名 */
  name: string;
  /** 担当（部室課） */
  buka: string;
  kubun: string | null;
  /** 事業実施結果（実施内容） */
  implementation: string | null;
  /** 総合評価（A〜F） */
  grade: string;
  /** 評価点（24点満点） */
  score: number | null;
  cost: ReportCostYear[];
  indicators: ReportIndicator[];
  /** 来歴（原資料内の位置） */
  ref: string;
}
export interface KofuReportYear {
  /** 評価年度 */
  fy: string;
  fyLabel: string;
  /** 対象（実績）年度 */
  targetFy: string;
  targetFyLabel: string;
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先） */
  sourceUrl: string;
  originUrl: string;
  /** 自サーバー配信コピー（Excel はダウンロードカード） */
  sourceLocalUrl: string;
  reports: KofuReport[];
}

/** 事業報告（成果）＝事務事業評価 詳細票（新しい年度順） */
export const KOFU_REPORT_YEARS: KofuReportYear[] = ${JSON.stringify(reportYears, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/report.gen.ts"), reportOut, "utf8");
  console.log(
    `✓ 事業報告（成果）を導出 → src/client/lib/report.gen.ts（${reportYears.map((y) => `${y.fy}:${y.reports.length}件`).join(" / ")}）`,
  );
}

// ============================================================================
// 事業報告（成果）— 全量公開の自治体 → public/reports/<団体コード>.json
// 甲府は公表サンプル5件なので静的 gen（上）でよいが、**川崎は572事業**（parsed 2.1MB）で、
// 静的 import すると gen の合計（既に2.1MB）が倍になる。決算シャード・similar-index・
// coverage.json と同じく**その画面でだけフェッチする**（CLAUDE.md の配信方針）。
// 札幌（R7=666件）・横浜（R3〜R7）を足すときも同じ形に乗る。
// ============================================================================
{
  const REPORT_MUNI_SOURCES: {
    srcId: string;
    muniCode: string;
    muniName: string;
    /**
     * 事業報告の「歳出予算科目 07款…」の款番号を**どの年度の予算で款名に解決するか**。
     * 事業評価は**対象年度（実績年度）の款**を指すので、評価年度ではなく**対象年度の予算**を使う
     * （横浜の R7 評価＝令和6年度事業なので R6）。**推測しない** — 実データで
     * R6 と R8 の款番号→款名が完全一致することは確認済みだが、年度で変わり得る（R5 以前は18款）。
     */
    kanFromSrc?: string;
  }[] = [
    { srcId: "kawasaki-jigyou-hyouka-r6", muniCode: "141305", muniName: "川崎市" },
    // **横浜は特別会計の事業を含む**（2,535事業中222件が16の特別会計）。scope が一般会計なので
    // 会計名（policy）で除外する。**会計名を持つのは横浜だけ**（川崎は全件が一般会計の想定）
    { srcId: "yokohama-jigyo-hyoka-r7", muniCode: "141003", muniName: "横浜市", kanFromSrc: "yokohama-yosansho-r6" },
  ];
  const byMuni: Record<string, unknown> = {};
  for (const r of REPORT_MUNI_SOURCES) {
    const v = validationResultSchema.parse(readJson(validationPath(r.srcId)));
    if (v.status !== "ok") throw new Error(`${r.srcId}: 検証が ${v.status} のため derive しません`);
    const doc = anyParsedDocSchema.parse(readJson(parsedPath(r.srcId)));
    if (doc.docType !== "project-report") throw new Error(`${r.srcId}: project-report ではありません`);
    const meta = readRawMeta(r.srcId);
    if (!meta) throw new Error(`${r.srcId}: raw-meta がありません`);
    const src = findSource(r.srcId);
    const eraLabel = (c: string) => `${eraYear(c)}年度`;
    // 款番号 → 款名。**対象年度の予算から引く**（画面側で推測させない）。
    // これがあると「款ドリル → その款の事業 → 成果」が繋がる。**款項目を持つのは横浜だけ**
    const kanNames: Record<string, string> = {};
    if (r.kanFromSrc) {
      const kd = anyParsedDocSchema.parse(readJson(parsedPath(r.kanFromSrc)));
      if (kd.docType !== "budget-book") throw new Error(`${r.kanFromSrc}: budget-book ではありません`);
      // 款番号なしの款（廃止款の括弧書き）は款番号→款名の索引に載せられないので飛ばす
      for (const f of kd.facts) {
        if (f.side === "expenditure" && f.kanNo != null) kanNames[String(f.kanNo)] = f.kanName;
      }
    }
    // 画面に出す断面だけに絞る（parsed をそのまま配ると 2.1MB）。金額は千円のまま持ち、
    // 表示側で fmtOku/fmtYen に通す
    // **一般会計に絞る**（横浜は policy に会計名が入る。2,535 → 2,313）。
    // 会計名を持たない資料（川崎）は素通りさせる — 全件が一般会計の前提で収録している
    const inScope = doc.facts.filter((f) => !/会計$/.test(f.policy ?? "") || f.policy === "一般会計");
    const excluded = doc.facts.length - inScope.length;
    const reports = inScope.map((f) => {
      const file = meta.files.find((x) => x.filename === f.locator.file) ?? meta.files[0]!;
      return {
        code: f.code ?? f.no,
        name: f.name,
        buka: f.buka,
        policy: f.policy ?? "",
        measure: f.measure ?? "",
        // **達成度は数字が小さいほど良い**（甲府の A〜F とは向きが逆）。丸めず素の値を配る
        achievement: f.achievement ?? null,
        direction: f.direction ?? "",
        // 款名（歳出予算科目の款番号を対象年度の予算で解決したもの）。解決できなければ null
        kanName: (() => {
          const m = /^(\d+)款/.exec(f.measure ?? "");
          return m ? kanNames[String(Number(m[1]))] ?? null : null;
        })(),
        cost: f.cost.map((c) => ({
          fy: c.fy,
          kind: c.kind,
          jigyohi: c.jigyohi,
          jinkenhi: c.jinkenhi ?? null,
          totalCost: c.totalCost,
          ippanZaigen: c.ippanZaigen,
          ...(c.isEstimate ? { est: 1 } : {}),
        })),
        // エビデンス: 自サーバーの原本コピーを該当ページで開く（3層の③）
        ref: `/sources/${r.srcId}/${f.locator.file}#page=${f.locator.page}`,
        refLabel: `${f.locator.file} p.${f.locator.page}`,
      };
    });
    const achievementCounts: Record<string, number> = {};
    for (const x of reports) if (x.achievement != null) achievementCounts[String(x.achievement)] = (achievementCounts[String(x.achievement)] ?? 0) + 1;
    byMuni[r.muniCode] = {
      muniCode: r.muniCode,
      muniName: r.muniName,
      /** 一般会計以外（特別会計）で除外した事業数。0 なら会計の区別が無い資料 */
      excluded,
      /**
       * 資料の呼び名。**市ごとに違う**（川崎=事務事業評価シート / 横浜=事業評価書）。
       * 画面に決め打ちしない（#72 のメダリオン: 報告どおり尊重し丸めない）
       */
      docLabel: r.srcId.startsWith("kawasaki") ? "事務事業評価シート" : "事業評価書",
      /**
       * **その資料が実際に持つ項目**。画面の説明文をこれで組み立てる。
       * 川崎と横浜で持ち物が違うのに川崎の文面を使い回すと**嘘になる**
       * （横浜は人件費・総コスト・達成度・方向性のいずれも持たない）。
       */
      has: {
        jinkenhi: reports.some((x) => x.cost.some((c) => c.jinkenhi != null)),
        totalCost: reports.some((x) => x.cost.some((c) => c.totalCost != null)),
        achievement: reports.some((x) => x.achievement != null),
        direction: reports.some((x) => x.direction),
        /** 歳出予算科目（款項目）。**横浜だけが持つ** — 事業を款ドリルへ紐付けられる */
        kanKoumoku: reports.some((x) => /\d+款/.test(x.measure ?? "")),
        estimate: reports.some((x) => x.cost.some((c) => (c as { est?: number }).est === 1)),
      },
      fy: doc.fiscalYear,
      fyLabel: eraLabel(doc.fiscalYear),
      sourceTitle: src.title,
      originUrl: src.urls?.[0] ?? src.landingPage ?? "",
      landingPage: src.landingPage ?? "",
      /** 達成度の凡例。**1が最良で5が最悪**（A〜F と向きが逆なので画面で必ず明示する） */
      achievementLabels: {
        "1": "目標を大きく上回って達成",
        "2": "目標を上回って達成",
        "3": "ほぼ目標どおり達成",
        "4": "目標を下回った",
        "5": "目標を大きく下回った",
      },
      directionLabels: {
        "Ⅰ": "現状のまま継続",
        "Ⅱ": "改善しながら継続",
        "Ⅲ": "事業規模拡大",
        "Ⅳ": "事業規模縮小",
        "Ⅴ": "事業廃止",
      },
      achievementCounts,
      reports,
    };
  }
  const dir = join(process.cwd(), "public/reports");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const sizes: string[] = [];
  for (const [code, data] of Object.entries(byMuni)) {
    const json = JSON.stringify(data);
    writeFileSync(join(dir, `${code}.json`), json, "utf8");
    sizes.push(`${(data as { muniName: string }).muniName}:${(json.length / 1024).toFixed(0)}KB`);
  }
  // 索引だけは静的に持つ（数十バイト）。**シャードが無い自治体でフェッチしない**ために要る
  const idxOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 事業報告（成果）を**全量公開**している自治体の団体コード → 件数。
// 実体は public/reports/<団体コード>.json（その画面でだけフェッチする。useProjectReports）。
// 甲府（公表サンプル5件）は静的 gen の report.gen.ts 側なのでここには入らない。

export const REPORT_MUNIS: Record<string, { name: string; fy: string; fyLabel: string; count: number }> = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(byMuni).map(([code, d]) => {
        const x = d as { muniName: string; fy: string; fyLabel: string; reports: unknown[] };
        return [code, { name: x.muniName, fy: x.fy, fyLabel: x.fyLabel, count: x.reports.length }];
      }),
    ),
    null,
    2,
  )};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/reports-index.gen.ts"), idxOut, "utf8");
  console.log(
    `✓ 事業報告（全量公開の自治体）を導出 → public/reports/（${REPORT_MUNI_SOURCES.map((r) => `${r.muniName} ${(byMuni[r.muniCode] as { reports: unknown[] }).reports.length}件`).join(" / ")}・${sizes.join(" / ")}）`,
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
      fyLabel: `${eraYear(fy)}年度`,
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
// 再利用が許諾されていない一次資料 → src/client/lib/evidence-policy.gen.ts
//
// エビデンス3層コピー（①git raw ②Wayback ③自サーバー配信）の**例外**を書き出す。
// 原則は「画面のリンクは常に③をドロワーで開く」（発行元の直リンクは中身だけ差し替えられ
// 得るため主リンクにしない）だが、**発行元が二次利用を許諾していない資料（要許可）は
// ③へのリンクを主リンクにしない** — 私たちの写しをそのまま読ませることが再配布に当たる。
// **写し自体は消さない**（来歴・SHA-256 照合・「何を持っているか」の開示は /coverage で続ける）。
// 変えるのは**リンクの向き先だけ**で、要許可の資料は発行元のディープリンクを開く
// （ユーザー方針 2026-07-16）。
//
// 向き先の決め方は「**実際にどこから取得したか**（raw-meta の fetchedFrom）」を第一の根拠に
// する。registry の url は最新版へ差し替わり得るが、fetchedFrom はその写しの出所そのもの。
//   - fetchedFrom が発行元の生 URL      → origin（発行元のその資料へ直リンク）
//   - fetchedFrom が魚拓（Wayback/WARP） → archive（**発行元から消えていて魚拓にしかない**
//                                          資料。取得時点で既に消えていた証拠なので魚拓へ繋ぐ）
//   - fetchedFrom が manual:（手動投入）  → 台帳の魚拓 → registry の URL の順で外部の宛先を探す
// **外部の宛先が1つも無い要許可資料は throw する**（＝リンクの持って行き先が無いまま
// 「発行元で開く」と表示するくらいなら derive を失敗させる。gen 同士の食い違いを止める
// 出口の整合チェックと同じ考え方）。
// ============================================================================
{
  type Link = { mode: "origin" | "archive"; href: string; license: string };
  const links: Record<string, Link> = {};
  const missing: string[] = [];
  let sourceCount = 0;
  for (const s of SOURCES) {
    if (s.fixture) continue;
    if (licenseClassOf(s.license) !== "permission-required") continue;
    sourceCount++;
    const meta = readRawMeta(s.id);
    // registry 側の宛先（ファイル直リンク → ランディングページ）。fetchedFrom が使えないときの控え
    const registryUrl = s.urls?.[0] ?? s.url ?? s.landingPage ?? null;
    for (const f of meta?.files ?? []) {
      const from = f.fetchedFrom;
      const link: Link | null = /^https?:/.test(from)
        ? { mode: isArchiveUrl(from) ? "archive" : "origin", href: from, license: s.license }
        : ARCHIVES[registryUrl ?? ""]
          ? { mode: "archive", href: ARCHIVES[registryUrl!]!, license: s.license }
          : registryUrl
            ? { mode: isArchiveUrl(registryUrl) ? "archive" : "origin", href: registryUrl, license: s.license }
            : null;
      if (!link) {
        missing.push(`${s.id}/${f.filename}`);
        continue;
      }
      links[`/sources/${s.id}/${f.filename}`] = link;
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `要許可の資料に外部リンクの宛先がありません（発行元 URL も魚拓も無い）: ${missing.join(", ")}\n` +
        `再利用が許諾されていない資料は自サーバーのコピーを主リンクにできません。` +
        `registry に url / landingPage を書くか、bun run pipeline:archive で魚拓を取ってください`,
    );
  }
  const archiveOnly = Object.values(links).filter((l) => l.mode === "archive").length;
  const policyOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive
// 発行元が二次利用を許諾していない一次資料（/coverage の「要許可」）の
// 自サーバー配信コピー → 発行元（消えている資料は魚拓）のディープリンク。
// 画面はこのキーに載っている資料だけ、ドロワーではなく外部リンクで開く。

export interface RestrictedEvidenceLink {
  /** origin = 発行元へ直リンク / archive = 発行元から消えており魚拓にしかない */
  mode: "origin" | "archive";
  href: string;
  /** 発行元が示している利用条件の原文（なぜ外部リンクなのかの根拠） */
  license: string;
}

/** キー: 自サーバー配信コピーのパス（/sources/<sourceId>/<filename>。フラグメント無し） */
export const RESTRICTED_EVIDENCE: Record<string, RestrictedEvidenceLink> = ${JSON.stringify(links, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/evidence-policy.gen.ts"), policyOut, "utf8");
  console.log(
    `✓ 要許可資料のリンク方針を導出 → src/client/lib/evidence-policy.gen.ts（${sourceCount}資料・${Object.keys(links).length}ファイル・うち魚拓へ${archiveOnly}）`,
  );
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
  // 不一致は**件数だけでなく中身を残す**（2026-07-16）。以前は数を数えるだけだったので、
  // **新しい不一致が出ても「2 → 3」に増えるだけで、どの自治体か分からなかった**。
  // 数だけの報告は「静かに壊れる」を招く（§2-4 と同じ轍。archive の「新規登録 2」も同型だった）。
  const expMismatches: string[] = [];
  const revMismatches: { label: string; diff: number; total: number }[] = [];

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
        expMismatches.push(`${fy} ${r.prefName} ${r.muniName}（${r.muniCode}）`);
        continue;
      }
      const rev = r.revenueByCategory ?? {};
      const revSum = Object.values(rev).reduce((a, b) => a + b, 0);
      // **歳入は歳出と違って除外しない** — 画面は科目和ベースで描くので、原典の合計欄と
      // 食い違っても内訳そのものは自己整合している（歳出は Σ が合わない＝内訳が壊れているので除外する）。
      // ただし**丸め（±数千円）と抽出の壊れ（桁が違う）は別物**なので分ける。
      // 以前は**どんなに大きくズレても警告のみで表示し続けていた** — 総務省の様式が変わって
      // 科目を1つ取り違えても、件数が1つ増えるだけで画面には出続ける穴だった。
      if (r.revenueTotal && revSum !== r.revenueTotal) {
        revMismatches.push({
          label: `${fy} ${r.prefName} ${r.muniName}（${r.muniCode}）`,
          diff: revSum - r.revenueTotal,
          total: r.revenueTotal,
        });
      }

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
    Object.fromEntries(DECISION_YEARS.map((fy) => [fy, `${eraYear(fy)}年度 決算`])),
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
  if (expMismatches.length) {
    console.log(`  ⚠ Σ款≠歳出総額で除外した muni-年度: ${expMismatches.length}`);
    for (const l of expMismatches.slice(0, 10)) console.log(`      ${l}`);
    if (expMismatches.length > 10) console.log(`      …他 ${expMismatches.length - 10} 件`);
  }
  // **丸めと抽出の壊れを分ける**（2026-07-16）。原典側の丸めは実測で**全部 1千円**
  // （R5・R6 の伊賀市だけ。歳入総額 約500億に対して 0.000002%）。一方、科目を1つ取り違えれば
  // **百万〜億単位**でズレる。→ **1千円以内は原典の丸めとして warning、それを超えたら error で
  // derive を止める**（総務省の様式が変わったときに黙って画面へ出さない）。
  // §9c の「2サンプルから定数を決めて反証された」轍を踏まないよう、**根拠は分布の実測**に置く:
  // 全1,741市町村×5年度で不一致は2件、どちらも1千円ちょうど。
  const ROUNDING_LIMIT = 1; // 千円
  const material = revMismatches.filter((m) => Math.abs(m.diff) > ROUNDING_LIMIT);
  if (revMismatches.length) {
    console.log(`  ⚠ Σ歳入科目≠歳入総額（表示は科目和ベース）: ${revMismatches.length}`);
    for (const m of revMismatches) {
      console.log(`      ${m.label}: 差 ${m.diff > 0 ? "+" : ""}${m.diff.toLocaleString()}千円（総額 ${m.total.toLocaleString()}）`);
    }
  }
  if (material.length) {
    console.error("✗ 歳入科目の和が歳入総額と大きく食い違っています（原典の丸めでは説明できない差）:");
    for (const m of material) {
      console.error(`  - ${m.label}: 差 ${m.diff.toLocaleString()}千円。科目の取り違え・列ズレを疑うこと`);
    }
    throw new Error(`Σ歳入科目≠歳入総額（丸めで説明できない差）が ${material.length} 件`);
  }
}

// ============================================================================
// 類似市の当初予算（款別歳入歳出）→ src/client/lib/munibudgets.gen.ts
// 甲府の類似4市（豊川・山口・沼津・和泉）の当初予算を budget 階層として収録。
// 予算資料には主な事業・執行・評価が無いので款別歳入歳出＋前年当初比較のみ。
// 人口は総務省 R6 決算（最も近い全国統一値）。金額は億円。
// ============================================================================
{
  const BUDGET_SOURCES = [
    { srcId: "toyokawa-yosansho-r7", muniCode: "232076", muniName: "豊川市", prefName: "愛知県", isPref: false },
    { srcId: "yamaguchi-yosansho-r7", muniCode: "352039", muniName: "山口市", prefName: "山口県", isPref: false },
    { srcId: "numazu-yosansho-r7", muniCode: "222038", muniName: "沼津市", prefName: "静岡県", isPref: false },
    { srcId: "izumi-yosansho-r8", muniCode: "272191", muniName: "和泉市", prefName: "大阪府", isPref: false },
    // 山梨県内（甲府に次ぐ規模）
    { srcId: "fuefuki-yosansho-r8", muniCode: "192112", muniName: "笛吹市", prefName: "山梨県", isPref: false },
    { srcId: "fujiyoshida-yosansho-r8", muniCode: "192023", muniName: "富士吉田市", prefName: "山梨県", isPref: false },
    { srcId: "minami-alps-yosansho-r8", muniCode: "192082", muniName: "南アルプス市", prefName: "山梨県", isPref: false },
    { srcId: "hokuto-yosansho-r8", muniCode: "192091", muniName: "北杜市", prefName: "山梨県", isPref: false },
    { srcId: "otsuki-yosansho-r8", muniCode: "192066", muniName: "大月市", prefName: "山梨県", isPref: false },
    { srcId: "tsuru-yosansho-r8", muniCode: "192040", muniName: "都留市", prefName: "山梨県", isPref: false },
    { srcId: "koshu-yosansho-r8", muniCode: "192139", muniName: "甲州市", prefName: "山梨県", isPref: false },
    // 県内初の「町」（2026-07-15）。町村は資料が薄い想定だったが市と同型の様式だった
    { srcId: "fujikawaguchiko-yosansho-r8", muniCode: "194301", muniName: "富士河口湖町", prefName: "山梨県", isPref: false },
    // 政令指定都市（人口の多い順に整備。2026-07-15）。款は局ベースの独自体系で、
    // 同じ市の decision 階層（総務省決算の目的別）とは款名が一致しない — registry のコメント参照。
    // **同じ muniCode を複数年度ぶん並べる**（新しい順に整列されて MUNI_BUDGET_YEARS になる）。
    ...(["r8", "r7", "r6", "r5", "r4", "r3"] as const).map((fy) => ({
      srcId: `yokohama-yosansho-${fy}`, muniCode: "141003", muniName: "横浜市", prefName: "神奈川県", isPref: false,
    })),
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `nagoya-yosansho-${fy}`, muniCode: "231002", muniName: "名古屋市", prefName: "愛知県", isPref: false,
    })),
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `sapporo-yosansetsumeisho-${fy}`, muniCode: "011002", muniName: "札幌市", prefName: "北海道", isPref: false,
    })),
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `fukuoka-yosansho-${fy}`, muniCode: "401307", muniName: "福岡市", prefName: "福岡県", isPref: false,
    })),
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `kawasaki-yosansho-${fy}`, muniCode: "141305", muniName: "川崎市", prefName: "神奈川県", isPref: false,
    })),
    // 大阪市は事項別明細書（款項目が同一表・182p）で他市と様式が違う → 専用パーサ osaka-yosansho
    { srcId: "osaka-yosansho-r8", muniCode: "271004", muniName: "大阪市", prefName: "大阪府", isPref: false },
    // さいたま市は横浜型（総括が単独ページ）で共通パーサに乗る。**款が総務省の目的別13款と一致**する初の政令市
    ...(["r8", "r7"] as const).map((fy) => ({
      srcId: `saitama-yosansho-${fy}`, muniCode: "111007", muniName: "さいたま市", prefName: "埼玉県", isPref: false,
    })),
    // 広島市は予算書本体がスキャンOCR で使えず、財政局の記者発表資料「資料1」を使う → 専用パーサ
    { srcId: "hiroshima-yosansho-r8", muniCode: "341002", muniName: "広島市", prefName: "広島県", isPref: false },
    // 神戸市は**アプリ内で初のオープンライセンス自治体**（政府標準利用規約2.0準拠・CC BY 互換・商用可）
    ...(["r8", "r7", "r6"] as const).map((fy) => ({
      srcId: `kobe-yosansho-${fy}`, muniCode: "281000", muniName: "神戸市", prefName: "兵庫県", isPref: false,
    })),
    // 京都市は**款体系が R2〜R8 で完全不変**（款番号も款名も同一）＝政令市では珍しく経年で款が繋がる
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `kyoto-yosansho-${fy}`, muniCode: "261009", muniName: "京都市", prefName: "京都府", isPref: false,
    })),
    // 北九州市。R2 だけ歳入26款で R3 以降は款番号が1つ繰下がる（福岡と同型）＝経年は款名で突合する
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `kitakyushu-yosansho-${fy}`, muniCode: "401005", muniName: "北九州市", prefName: "福岡県", isPref: false,
    })),
    // 千葉市。**歳出が総務省の目的別13款と一致**（さいたまに次ぐ2例目）。
    // 過年度は R8 の次が R4 まで飛ぶ（間の年度は原典がスキャン/OCR/款名欠落。docs §8k）
    ...(["r8", "r4"] as const).map((fy) => ({
      srcId: `chiba-yosansho-${fy}`, muniCode: "121002", muniName: "千葉市", prefName: "千葉県", isPref: false,
    })),
    // 仙台市は born-digital が R8 が初年度（R2〜R7 の説明書は総括ページがスキャン）＝単年
    { srcId: "sendai-yosansho-r8", muniCode: "041009", muniName: "仙台市", prefName: "宮城県", isPref: false },
    // 堺市は予算書本体が全文アウトライン化でテキスト層が無く、議案書の予算案説明資料に逃げる（広島型）。
    // **歳出13款が総務省の目的別と一致**（さいたま・千葉に次ぐ3例目）。R5・R4 は原典が壊れていて飛ぶ
    ...(["r8", "r7", "r6", "r3", "r2"] as const).map((fy) => ({
      srcId: `sakai-yosansho-${fy}`, muniCode: "271403", muniName: "堺市", prefName: "大阪府", isPref: false,
    })),
    // 新潟市は**歳入が見開き2ページ型**（款名 p.8 / 金額 p.9）＝第5の型。docs §9e
    ...(["r8", "r7"] as const).map((fy) => ({
      srcId: `niigata-yosansho-${fy}`, muniCode: "151009", muniName: "新潟市", prefName: "新潟県", isPref: false,
    })),
    // 浜松市。**印字 = 物理（オフセット0）**という政令市では珍しい様式。歳出13款が総務省の目的別と一致
    ...(["r8", "r7", "r6", "r5", "r4"] as const).map((fy) => ({
      srcId: `hamamatsu-yosansho-${fy}`, muniCode: "221309", muniName: "浜松市", prefName: "静岡県", isPref: false,
    })),
    // 相模原市は予算書本体が面付けで表が2回描かれるため、主要施策説明書の款項別に逃げる。docs §8p
    { srcId: "sagamihara-yosansho-r8", muniCode: "141500", muniName: "相模原市", prefName: "神奈川県", isPref: false },
    // 熊本市は説明書（10.3MB・ヘッダ汚染あり）ではなく概要（1.8MB）を採る。docs §8q
    { srcId: "kumamoto-yosansho-r8", muniCode: "431001", muniName: "熊本市", prefName: "熊本県", isPref: false },
    // 岡山市は事項別明細書の総括が歳出にしか無く概要に逃げる。**款番号が1つも無い表**。docs §8r
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `okayama-yosangaiyou-${fy}`, muniCode: "331007", muniName: "岡山市", prefName: "岡山県", isPref: false,
    })),
    // 静岡市は**左右2側が同一ページ（横並び）**＝第6の型。docs §9j。これで全20政令市が揃う
    ...(["r8", "r7", "r6"] as const).map((fy) => ({
      srcId: `shizuoka-yosansho-${fy}`, muniCode: "221007", muniName: "静岡市", prefName: "静岡県", isPref: false,
    })),
    // 東京特別区（2026-07-16）。**23区に統一様式は無く款体系が区ごとに全部違う** — registry の
    // 特別区の節を参照。制度由来の共通点（消防費なし・地方交付税なし・特別区交付金・特別区税/債）
    // だけが揃い、それ以外の款は各区が独自に立てている。
    // **R3 は欠番**（pdftotext -layout が款を静かに落とす。registry のコメント参照）。
    ...(["r8", "r7", "r6", "r5", "r4", "r2"] as const).map((fy) => ({
      srcId: `chiyoda-yosansho-${fy}`, muniCode: "131016", muniName: "千代田区", prefName: "東京都", isPref: false,
    })),
    // 大田区は**特別区で最も素直**（同一 parserOptions・款体系も不変）。registry のコメント参照。
    // **H27・H26・H25 は欠番**（H27 は ToUnicode 全面欠落、H26・H25 は `-layout` が款9 特別区交付金を
    // 静かに落とす＝千代田 R3 と同じ型で原典は健全。§10a）。**H24〜H20 も現存**するが未収録。
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2", "h31", "h30", "h29", "h28"] as const).map((fy) => ({
      srcId: `ota-yosansho-${fy}`, muniCode: "131113", muniName: "大田区", prefName: "東京都", isPref: false,
    })),
    // 中央区は**款別専用の6ページ PDF**（歳入歳出が同一ページ＝samePage）。**見出しを強くすると
    // 款名が静かに壊れる**という逆説がある（registry のコメント参照）。
    // **H29 が現行サイトの最古**＝これで10年度が打ち止め。
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2", "h31", "h30", "h29"] as const).map((fy) => ({
      srcId: `chuo-sokatsuhyo-${fy}`, muniCode: "131024", muniName: "中央区", prefName: "東京都", isPref: false,
    })),
    // 目黒区はプレス発表資料の資料編。**R2 の廃止税目行に kanNoless が必須**（無いと前年度 Σ が
    // 137,800千円 静かに欠ける＝validate は当年度しか見ない）。registry のコメント参照。
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `meguro-yosanan-${fy}`, muniCode: "131105", muniName: "目黒区", prefName: "東京都", isPref: false,
    })),
    // 江東区は歳出見出しが特会と区別できず**誤ページでも Σ差0 で静かに通る**（守るのは validate の
    // 歳入合計=歳出合計 のみ）。歳入は強い見出しの代償で款1 が汚染されるため HeaderExtra が要る。
    // **H28 が現行サイトの最古**＝これで11年度が打ち止め（H29・H28 はパス基底ごと違う）。
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2", "h31", "h30", "h29", "h28"] as const).map((fy) => ({
      srcId: `koto-yosangaiyou-${fy}`, muniCode: "131083", muniName: "江東区", prefName: "東京都", isPref: false,
    })),
    // 渋谷区は**R4 以前が収録不可**（PDF が無く HTML は前年度列を持たない）。特別区債の款が全年度で
    // 存在しない起債ゼロ型で、特別区交付金 1.6% は23区最低クラス。
    ...(["r8", "r7", "r6", "r5"] as const).map((fy) => ({
      srcId: `shibuya-yosansho-${fy}`, muniCode: "131130", muniName: "渋谷区", prefName: "東京都", isPref: false,
    })),
    // 葛飾区は**職員費の款を持つ**（全款から人件費を抜く名古屋・札幌型）ので他自治体と款別を
    // 直接比較すると民生費等が過小に見える。R8 は第6の折返し型で kanNoless が要る
    // （**H31・H30 では kanNoless は no-op**＝R8 の折返し型が無い）。H29 以前は未着手。
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2", "h31", "h30"] as const).map((fy) => ({
      srcId: `katsushika-yosangaiyou-${fy}`, muniCode: "131229", muniName: "葛飾区", prefName: "東京都", isPref: false,
    })),
    // 豊島区は**R7・R4・R2 が欠番**（R4・R2 は ToUnicode 全面欠落、R7 は OCR レイヤの重なりで
    // 数字が壊れる＝修復不可。registry のコメント参照）。R3 は Wayback から回収。
    ...(["r8", "r6", "r5", "r3"] as const).map((fy) => ({
      srcId: `toshima-yosansho-${fy}`, muniCode: "131164", muniName: "豊島区", prefName: "東京都", isPref: false,
    })),
    // 足立区。あらまし総括表。**R5〜R8 は列順が [前年度, 当年度] に反転**（prevColumnFirst・
    // registry のコメント参照）。R2〜R8 の当初チェーンは款単位で全件一致を確認済み
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `adachi-yosansho-${fy}`, muniCode: "131211", muniName: "足立区", prefName: "東京都", isPref: false,
    })),
    // 中野区。当初予算の概要。**表の直前の散文段落が款1 を汚す**ので HeaderExtra "[、。]" で
    // 句読点を含む行を落としている（R2 で実測・Σ差0 で素通りする型。registry のコメント参照）。
    // R2〜R8 の当初チェーンは6リンク×33款で全件一致（列順は標準・足立型の反転なし）
    ...(["r8", "r7", "r6", "r5", "r4", "r3", "r2"] as const).map((fy) => ({
      srcId: `nakano-yosangaiyou-${fy}`, muniCode: "131148", muniName: "中野区", prefName: "東京都", isPref: false,
    })),
    // 江戸川区。**特別区で最長の12年**（H27〜R8）。R3・R2・H30 だけ資料が別（予算書が
    // ToUnicode 欠落で読めず「主要施策の概要」へ迂回・registry のコメント参照）。
    // 歳出18款で特別区最多。R3 で15款→18款に再編（ＳＤＧｓ推進費・産業経済費が皆増、
    // 新庁舎・大型施設建設推進費→新庁舎・施設整備費に改称＝前年列 95,297 が一致）。
    // H27→R8 の11リンクは総額・款単位とも全件一致
    ...(["r8", "r7", "r6", "r5", "r4"] as const).map((fy) => ({
      srcId: `edogawa-yosansho-${fy}`, muniCode: "131237", muniName: "江戸川区", prefName: "東京都", isPref: false,
    })),
    ...(["r3", "r2"] as const).map((fy) => ({
      srcId: `edogawa-yoko-${fy}`, muniCode: "131237", muniName: "江戸川区", prefName: "東京都", isPref: false,
    })),
    { srcId: "edogawa-yosansho-h31", muniCode: "131237", muniName: "江戸川区", prefName: "東京都", isPref: false },
    { srcId: "edogawa-yoko-h30", muniCode: "131237", muniName: "江戸川区", prefName: "東京都", isPref: false },
    ...(["h29", "h28", "h27"] as const).map((fy) => ({
      srcId: `edogawa-yosansho-${fy}`, muniCode: "131237", muniName: "江戸川区", prefName: "東京都", isPref: false,
    })),
    // 都道府県エンティティ（県全体）。人口は県内市町村の合計から算出
    { srcId: "yamanashi-yosansho-r8", muniCode: "190004", muniName: "山梨県", prefName: "山梨県", isPref: true },
  ] as const;
  // budget 階層で決算＋執行率も収録できた自治体（款別 予算現額/決算額/執行率）。
  // 当初予算（BUDGET_SOURCES）と別年度でよい（山梨県: 当初R8 に対し 決算はR6 が最新）。
  const MUNI_EXEC_SOURCES: Record<string, { srcId: string; fy: string; refLabelBase: string }> = {
    "190004": { srcId: "yamanashi-kessan-r6", fy: "R6", refLabelBase: "決算の状況" },
  };
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
    // 都道府県エンティティの人口は県内市町村（団体コード先頭2桁一致）の住基人口の合計
    const prefCode = b.muniCode.slice(0, 2);
    const popRec = b.isPref
      ? {
          population: popDs.records
            .filter((r) => r.muniCode.slice(0, 2) === prefCode && r.population)
            .reduce((a, r) => a + (r.population ?? 0), 0),
        }
      : popDs.records.find((r) => r.muniCode === b.muniCode);
    if (!popRec?.population) throw new Error(`${b.srcId}: 総務省R6に ${b.muniName}(${b.muniCode}) の人口がありません`);
    // **団体コードと自治体名が総務省の実データと一致するか**（2026-07-16 追加）。
    // 浜松市を **221007（＝静岡市のコード）** で登録していた事故を受けて足した。
    // コードが「実在する別の自治体」だと **人口だけが黙って別人のものになる**（浜松の1人あたりが
    // 静岡の人口で割られて約16.5%過大になっていた）。Σ は款別の話なので通り、
    // 画面にも「浜松市 … 672,775人」と**それらしく**出るため、目視でも見落とした。
    // 名前で突合すれば一撃で落ちる。
    if (!b.isPref) {
      const rec = popDs.records.find((r) => r.muniCode === b.muniCode);
      if (rec && rec.muniName !== b.muniName) {
        throw new Error(
          `${b.srcId}: 団体コード ${b.muniCode} は総務省R6では「${rec.muniName}」です（registry は「${b.muniName}」）。` +
            `コードの取り違えです — 人口が別の自治体のものになり、1人あたりが静かに狂います`,
        );
      }
    }

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

    // 主な事業（豊川・和泉・山口を収録。他の budget 市は空配列）。金額降順。
    // 款が取れる市（豊川）は款ドリルで全件使うので全件、款のない市（和泉・山口）は
    // ダッシュボード一覧用に上位 PROJECT_CAP 件へ絞る（山口の事業別は700超あるため）
    const PROJECT_CAP = 60;
    const projectsAll = (doc.projects ?? [])
      .map((p) => ({
        name: p.name,
        amountOku: toOku(p.amount),
        kan: p.kan,
        // 施策（山梨県の中項目《…》など）。無い様式は空文字
        shisaku: p.shisaku || "",
        kubun: p.kubun,
        prevAmountOku: p.prevAmount != null ? toOku(p.prevAmount) : null,
        description: p.description || "",
        refLabel: `${src.title} p.${p.locator.page ?? "?"}`,
        refLocalUrl: `/sources/${b.srcId}/${p.locator.file}#page=${p.locator.page ?? 1}`,
      }))
      .sort((a, b2) => b2.amountOku - a.amountOku);
    // 款が取れる市（豊川）は款ドリルで全件、都道府県（施策別に全件見せる）も全件、
    // 款のない市（和泉・山口・700超）はダッシュボード一覧用に上位 PROJECT_CAP 件へ
    const projects =
      projectsAll.some((p) => p.kan) || b.isPref ? projectsAll : projectsAll.slice(0, PROJECT_CAP);

    const yoyTotal = yoyPctOf(doc.expenditureTotal, doc.prevExpenditureTotal);
    return {
      muniCode: b.muniCode,
      muniName: b.muniName,
      prefName: b.prefName,
      // 都道府県エンティティか（類似自治体比較を出さない・ラベルを変える）
      isPref: b.isPref,
      projects,
      // 決算＋執行率（収録できた自治体のみ。当初予算とは別年度でよい）
      execution: MUNI_EXEC_SOURCES[b.muniCode] ? [buildExecYear(MUNI_EXEC_SOURCES[b.muniCode]!)] : [],
      fy: doc.fiscalYear,
      fyLabel: `${eraYear(doc.fiscalYear)}年度 当初予算`,
      population: popRec.population,
      populationLabel: b.isPref
        ? "県内市町村の住民基本台帳人口の合計（総務省 令和6年度決算）"
        : "住民基本台帳人口（総務省 令和6年度決算）",
      totalOku: toOku(doc.expenditureTotal),
      prevTotalOku: doc.prevExpenditureTotal != null ? toOku(doc.prevExpenditureTotal) : null,
      yoyLabel: yoyTotal != null ? `${yoyTotal >= 0 ? "+" : ""}${yoyTotal.toFixed(1)}%` : "",
      prevBasis: doc.prevBasis,
      // 前年度列の基準が当初でないときの根拠（札幌 R6・R2 の骨格予算 → 肉付後）。
      // 資料に注記が無いケースは registry の parserOptions.prevNote で与えている
      prevNote: doc.prevNote ?? "",
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

  // budget 階層は1自治体＝複数年度になり得る（政令市は R2〜R8 の7年前後さかのぼれる）。
  // 年度は**新しい順**に並べる（画面の年度ドロップダウンの並び・既定の選択がこの順に依存する）。
  // 比較は fyRank（pipeline/lib/fy.ts・R > H）。
  const byCodeYears: Record<string, typeof budgets> = {};
  for (const b of budgets) (byCodeYears[b.muniCode] ??= []).push(b);
  for (const [code, ys] of Object.entries(byCodeYears)) {
    ys.sort((a, z) => fyRank(z.fy) - fyRank(a.fy));
    const dup = ys.map((y) => y.fy).filter((fy, i, all) => all.indexOf(fy) !== i);
    if (dup.length) throw new Error(`${code}: 同じ年度が重複しています（${dup.join(",")}）`);
  }
  // 最新年度だけの索引。市区町村選択・類似比較・coverage・routing は「その自治体の代表値」しか
  // 要らないのでこちらを使う（複数年度化しても既存の消費側を壊さないための互換レイヤ）
  const byCode = Object.fromEntries(Object.entries(byCodeYears).map(([code, ys]) => [code, ys[0]!]));
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

export interface MuniProject {
  name: string;
  /** 予算額（億円） */
  amountOku: number;
  /** 属する款（豊川など款が取れる様式のみ。和泉の重点事業は null） */
  kan: string | null;
  /** 施策（山梨県の中項目《…》など施策別グルーピング。無い様式は空文字） */
  shisaku: string;
  /** 新規/拡充/繰越 */
  kubun: "新規" | "拡充" | "繰越" | null;
  /** 前年度予算額（億円。事業単位の前年度がある豊川のみ、他は null） */
  prevAmountOku: number | null;
  description: string;
  refLabel: string;
  /** 自サーバー配信の原本コピー（#page=N 付き） */
  refLocalUrl: string;
}

/** 決算＋執行率の1行（款別）。KofuExecRow と同形 */
export interface MuniExecRow {
  name: string;
  /** 予算現額（億円・補正/繰越込み） */
  budgetOku: number;
  /** 収入済額（歳入）/ 支出済額（歳出）（億円） */
  settledOku: number;
  /** 資料記載の収入率/執行率（%）。予算現額0の款は null */
  ratePct: number | null;
  ref: string;
  refLabel: string;
  /** 内訳（甲府の市税内訳など。山梨県決算にはないので通常 undefined） */
  breakdownNote?: string;
}

/** 決算＋執行率の1年度分（款別歳入歳出・KofuExecutionYear と同形） */
export interface MuniExecutionYear {
  fy: string;
  basis: "速報" | "確定";
  fyLabel: string;
  asOf: string;
  asOfNote: string;
  population: number | null;
  revenueBudgetTotalOku: number;
  revenueSettledTotalOku: number;
  expenditureBudgetTotalOku: number;
  expenditureSettledTotalOku: number;
  revenue: MuniExecRow[];
  expenditure: MuniExecRow[];
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

export interface MuniBudget {
  muniCode: string;
  muniName: string;
  prefName: string;
  /** 都道府県エンティティ（県全体）か。市町村比較・主な事業は出さない */
  isPref: boolean;
  fy: string;
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  prevBasis: "当初" | "補正後";
  /** 前年度列に関する資料注記。基準が「当初」でないときの根拠を画面に出す。無ければ空文字 */
  prevNote: string;
  revenue: MuniKanRow[];
  expenditure: MuniKanRow[];
  /** 主な事業（豊川・和泉のみ。他市は空配列） */
  projects: MuniProject[];
  /** 決算＋執行率（山梨県のみ。当初予算とは別年度。他は空配列） */
  execution: MuniExecutionYear[];
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  pagesLabel: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/**
 * 団体コード → 当初予算の**全収録年度**（新しい順）。年度ドロップダウンはこれで作る。
 * 1年度しか収録していない自治体は要素1つの配列になる。
 */
export const MUNI_BUDGET_YEARS: Record<string, MuniBudget[]> = ${JSON.stringify(byCodeYears, null, 2)};

/**
 * 団体コード → 当初予算（**最新年度のみ**）。市区町村選択・類似比較・coverage・routing など
 * 「その自治体の代表値」だけが要る場面で使う。年度を切り替える画面は MUNI_BUDGET_YEARS を見ること。
 */
export const MUNI_BUDGETS: Record<string, MuniBudget> = ${JSON.stringify(byCode, null, 2)};

/** budget 階層（予算ベースの款別ダッシュボードを持つ）自治体の団体コード */
export const BUDGET_MUNIS: string[] = ${JSON.stringify(Object.keys(byCodeYears))};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/munibudgets.gen.ts"), muniBudgetsOut, "utf8");
  console.log(
    `✓ 類似市の当初予算を導出 → src/client/lib/munibudgets.gen.ts（${Object.values(byCodeYears)
      .map((ys) => `${ys[0]!.muniName}:${ys[0]!.totalOku.toFixed(0)}億${ys.length > 1 ? `(${ys.length}年度)` : ""}`)
      .join(" / ")}）`,
  );
}


// ============================================================================
// データ整備状況 → public/coverage.json（/coverage ページが取得する）
//
// 「全1,741市町村を網羅した ○× 一覧（手付かずも含む）」＋「原本の保管情報」＋
// 「③再配布のライセンス区分」を1つの JSON にまとめる。ToDo（空欄＝未収録）と
// 情報公開（何を保管しているか）とリスク開示（要許可なのに配信中か）を兼ねる。
//
// **バンドルに入れず public/ に置く**理由: 全市町村を載せると 130KB 級になり、
// 静的 import すると全ページのバンドルに乗ってしまう。このページでだけ取得する。
//
// ライセンス区分は license 原文から推定（表記が揺れたら安全側の unverified に落ちる）:
//   open / permission-required / unverified
// このブロックは他ブロックが書いた gen とシャードを読むので**必ず最後に置く**。
// ============================================================================
{
  const { KOFU_BUDGET_YEARS } = await import("../src/client/lib/kofu.gen");
  const { KOFU_PROJECT_YEARS } = await import("../src/client/lib/projects.gen");
  const { KOFU_REPORT_YEARS } = await import("../src/client/lib/report.gen");
  const { KOFU_COUNCIL_YEARS } = await import("../src/client/lib/council.gen");
  const { KOFU_EXECUTION_YEARS } = await import("../src/client/lib/execution.gen");
  const { KOFU_EVALUATION_YEARS } = await import("../src/client/lib/evaluations.gen");
  const { KOFU_OUTTURN_YEARS } = await import("../src/client/lib/outturn.gen");
  const { MUNI_BUDGETS, MUNI_BUDGET_YEARS, BUDGET_MUNIS } = await import("../src/client/lib/munibudgets.gen");
  const { PREF_CODES } = await import("../src/client/lib/decision-index.gen");
  const { DECISION_YEARS } = await import("../src/client/lib/decision-index.gen");

  // 列（この順で ○× を並べる）。kessan は全市町村が持つ
  const DATASETS = [
    { key: "kessan", label: "決算", full: "決算（総務省・決算状況調）" },
    { key: "budget", label: "予算", full: "当初予算（款別・前年当初比）" },
    { key: "projects", label: "事業", full: "事業単位（主な事業）" },
    { key: "report", label: "成果", full: "事業報告（成果指標・コスト）" },
    { key: "council", label: "議会", full: "議会の構成（予算議決時）" },
    { key: "execution", label: "執行", full: "執行・決算（自治体の確定値）" },
    { key: "evaluation", label: "評価", full: "事務事業評価" },
    { key: "outturn", label: "統計", full: "統計書（款項×当初/最終/決算）" },
  ] as const;

  const srcs = SOURCES.filter((s) => !s.fixture);
  const archiveEntries = (() => {
    const p = join(DATA_DIR, "archives.json");
    if (!existsSync(p)) return [];
    return archivesLedgerSchema.parse(readJson(p)).entries;
  })();
  // ライセンス区分（licenseClassOf）はファイル冒頭に置いてある — この区分は /coverage の
  // 表示だけでなく、画面のエビデンスリンクを自サーバーのコピーから発行元へ切り替える
  // 判定（evidence-policy.gen.ts）でもあるため、両方から使う。

  const KNOWN = [
    { code: "192015", name: "甲府市", pref: "山梨県" },
    ...BUDGET_MUNIS.map((c) => {
      const b = MUNI_BUDGETS[c]!;
      return { code: c, name: b.muniName, pref: b.prefName };
    }),
  ];
  const entityOf = (s: (typeof srcs)[number]): { scopeKind: "national" | "entity" | "unknown"; code?: string } => {
    if (/^全市町村/.test(s.scope)) return { scopeKind: "national" };
    const byCode = s.scope.match(/団体コード(\d{6})/)?.[1];
    if (byCode && KNOWN.some((k) => k.code === byCode)) return { scopeKind: "entity", code: byCode };
    const nm = (s.scope.split("（")[0] ?? "").replace(/議会$/, "").trim();
    const hit = KNOWN.find((k) => k.name === nm);
    return hit ? { scopeKind: "entity", code: hit.code } : { scopeKind: "unknown" };
  };
  // 「この資料が画面のどこで使われているか」。/sources（データ出典）に出す。
  // **パーサ（＝資料の種別）から導く** — 資料は増え続けるので、資料ごとに手で書くと必ず実態とズレる
  // （旧 SOURCES は甲府市＋総務省だけを手で並べた配列で、政令市18団体97資料が載っていなかった）。
  const USED_BY_PARSER: Record<string, string> = {
    "kofu-yosansho": "ダッシュボード／款別ドリルダウン／前年比較",
    "osaka-yosansho": "ダッシュボード／款別ドリルダウン／前年比較",
    "hiroshima-yosansho": "ダッシュボード／款別ドリルダウン／前年比較",
    "soumu-shichoson-kessan": "全市町村の決算ダッシュボード／款別・歳入内訳／1人あたり／類似自治体比較",
    "soumu-shichoson-seishitsu": "財政指標／性質別歳出",
    "kofu-kessan-syousai": "予算執行状況（決算・確定値）",
    "kofu-zaisei-jokyo": "予算執行状況（速報）",
    "kofu-toukei-zaisei": "款別ドリルダウンの項テーブル（当初→最終→決算→執行率）",
    "kofu-gikai": "議会の構成（会派別議席・議決）",
    "kofu-gyousei-hyouka": "主な事業の評価バッジ",
    "kofu-jigyou-houkoku": "事業報告（成果）",
    "kawasaki-jigyou-hyouka": "事業報告（成果）",
    "yokohama-jigyo-hyoka": "事業報告（成果）",
    "yamanashi-kessan": "予算執行状況（款別 執行率）",
  };
  const sourceCard = (s: (typeof srcs)[number]) => {
    const meta = readRawMeta(s.id);
    const files = (meta?.files ?? []).map((f) => ({
      filename: f.filename,
      sha256: f.sha256.slice(0, 12) + "…",
      bytes: f.bytes,
      fetchedAt: f.fetchedAt.slice(0, 10),
      localUrl: `/sources/${s.id}/${f.filename}`,
    }));
    const arch = archiveEntries.filter((a) => a.sourceId === s.id && a.kind === "file");
    const originUrl = s.urls?.[0] ?? s.url ?? s.landingPage ?? "";
    const isArchiveOrigin = /web\.archive\.org|warp\.ndl\.go\.jp/.test(originUrl);
    const used = USED_BY_PARSER[s.parser];
    if (!used) {
      throw new Error(
        `${s.id}: パーサ "${s.parser}" が USED_BY_PARSER に未登録です。` +
          `/sources に「何に使っているか」を出せません（derive-app-data.ts の USED_BY_PARSER に追加してください）`,
      );
    }
    return {
      sourceId: s.id, title: s.title, publisher: s.publisher, fiscalYear: s.fiscalYear, kind: s.kind,
      used,
      license: s.license, licenseClass: licenseClassOf(s.license),
      originUrl, landingPage: s.landingPage ?? null, files,
      archived: arch.length > 0 || isArchiveOrigin,
      archiveOrigin: isArchiveOrigin,
      archiveUrl: arch[0]?.waybackUrl ?? (isArchiveOrigin ? originUrl : null),
      shaVerified: arch.some((a) => a.sha256Match === true),
    };
  };

  const range = (fys: string[]) =>
    fys.length === 0 ? "—" : fys.length === 1 ? fys[0]! : `${fys[fys.length - 1]}〜${fys[0]}（${fys.length}年度）`;
  const kessanRange = range([...DECISION_YEARS]);

  // 収録済み13団体の詳細（データセットごとの中身＋その団体の資料）
  const entityDetail: Record<string, {
    name: string; pref: string; tier: string; isPref: boolean;
    detail: Record<string, string>;
    sources: ReturnType<typeof sourceCard>[];
  }> = {};
  // 事業報告（成果）を収録している自治体 → 中身の説明。**full 以外にも付く**。
  // 以前は full（甲府）だけが d.report を持ち、川崎の572事業を収録しても /coverage が
  // 「成果 ×」と出た（＝収録済みを未収録と偽る）。/coverage は「実際の収録内容」を示すページなので、
  // **レジストリ＋parsed（＝実際に収録したもの）から導く**（2026-07-15）。
  // **新しい事業報告パーサを足したらここにも足す** — 忘れると /coverage が「収録済みを未収録」と
  // 偽る（実際に横浜で踏んだ。2,313事業を収録したのに「成果 ×」と出た）。
  const REPORT_PARSERS = new Set(["kofu-jigyou-houkoku", "kawasaki-jigyou-hyouka", "yokohama-jigyo-hyoka"]);
  const reportDetailByCode: Record<string, string> = {};
  for (const s of srcs) {
    if (!REPORT_PARSERS.has(s.parser)) continue;
    const code = entityOf(s).code;
    if (!code) continue;
    const parsed = readJson(parsedPath(s.id)) as {
      docType?: string;
      facts?: { policy?: string | null }[];
    };
    if (parsed.docType !== "project-report") continue;
    // **画面に出している数と揃える** — scope は一般会計なので、特別会計の事業は数えない
    // （横浜は 2,535 中222件が特別会計。生の件数を出すと /coverage が 2,535、画面が 2,313 で食い違う）。
    // 会計名を持たない資料（甲府・川崎）は素通り＝全件が一般会計の前提で収録している
    const facts = (parsed.facts ?? []).filter((f) => !/会計$/.test(f.policy ?? "") || f.policy === "一般会計");
    const n = facts.length;
    const prev = reportDetailByCode[code];
    const one = `${s.fiscalYear}:${n}件`;
    reportDetailByCode[code] = prev ? `${prev} / ${one}` : one;
  }

  for (const k of KNOWN) {
    const isFull = k.code === "192015";
    const mb = MUNI_BUDGETS[k.code] ?? null;
    const d: Record<string, string> = { kessan: kessanRange };
    if (isFull) {
      d.budget = range(KOFU_BUDGET_YEARS.map((b) => b.fy));
      d.projects = `${range(KOFU_PROJECT_YEARS.map((y) => y.fy))}・計${KOFU_PROJECT_YEARS.reduce((a, y) => a + y.projects.length, 0)}件`;
      d.report = `${KOFU_REPORT_YEARS.map((y) => `${y.fyLabel}${y.reports.length}件`).join(" / ")}（公表サンプルのみ）`;
      d.council = `${range(KOFU_COUNCIL_YEARS.map((c) => c.fy))}・議決つき`;
      d.execution = range(KOFU_EXECUTION_YEARS.map((e) => e.fy));
      d.evaluation = `${range(KOFU_EVALUATION_YEARS.map((y) => y.fy))}・約1,500件`;
      d.outturn = range(KOFU_OUTTURN_YEARS.map((y) => y.fy));
    } else if (mb) {
      // **最新年度だけを書かない** — 政令市は R2〜R8 の7年前後を収録しており、`mb.fyLabel` を
      // 使うと /coverage が「令和8年度」としか言わず実態を過少申告する（2026-07-15 修正）。
      // full と同じく収録年度の範囲を出す
      const ys = MUNI_BUDGET_YEARS[k.code] ?? [mb];
      d.budget = `${range(ys.map((y) => y.fy))}・前年当初比つき`;
      // 事業報告（成果）は budget 階層でも収録し得る（川崎 R6・572事業）
      if (reportDetailByCode[k.code]) d.report = reportDetailByCode[k.code]!;
      if (mb.projects.length > 0) d.projects = `${mb.projects.length}件`;
      if ((mb.execution?.length ?? 0) > 0) d.execution = mb.execution!.map((e) => e.fyLabel).join("・");
    }
    entityDetail[k.code] = {
      name: k.name, pref: k.pref, tier: isFull ? "full" : "budget", isPref: !!mb?.isPref,
      detail: d,
      sources: srcs.filter((s) => entityOf(s).code === k.code).map(sourceCard),
    };
  }

  // 全1,741市町村を都道府県ごとに。f = 各データセットの 1/0（DATASETS の順）
  const prefs = Object.entries(PREF_CODES).map(([name, code]) => {
    const shardPath = join(process.cwd(), "public/decision", `${code}.json`);
    const munis = existsSync(shardPath)
      ? Object.entries((readJson(shardPath) as { munis?: Record<string, { name: string }> }).munis ?? {})
      : [];
    const rows = munis.map(([c, m]) => {
      const e = entityDetail[c];
      const f = DATASETS.map((ds) => (ds.key === "kessan" ? 1 : e && e.detail[ds.key] ? 1 : 0)).join("");
      return { c, n: m.name, f };
    });
    // 県エンティティ（山梨県の当初予算など。市町村シャードには居ない）を先頭に足す
    const prefEntities = KNOWN.filter((k) => entityDetail[k.code]?.isPref && k.pref === name).map((k) => {
      const e = entityDetail[k.code]!;
      const f = DATASETS.map((ds) => (ds.key === "kessan" ? 0 : e.detail[ds.key] ? 1 : 0)).join("");
      return { c: k.code, n: `${k.name}（県全体）`, f };
    });
    return { name, code, munis: [...prefEntities, ...rows] };
  });

  const national = srcs.filter((s) => entityOf(s).scopeKind === "national").map(sourceCard);
  const unclassified = srcs.filter((s) => entityOf(s).scopeKind === "unknown").map(sourceCard);
  const allCards = [...Object.values(entityDetail).flatMap((e) => e.sources), ...national, ...unclassified];
  const summary = {
    sourceCount: allCards.length,
    fileCount: allCards.reduce((a, c) => a + c.files.length, 0),
    archivedCount: allCards.filter((c) => c.archived).length,
    shaVerifiedCount: allCards.filter((c) => c.shaVerified).length,
    licenseOpen: allCards.filter((c) => c.licenseClass === "open").length,
    licensePermission: allCards.filter((c) => c.licenseClass === "permission-required").length,
    licenseUnverified: allCards.filter((c) => c.licenseClass === "unverified").length,
    fullCount: Object.values(entityDetail).filter((e) => e.tier === "full").length,
    budgetCount: Object.values(entityDetail).filter((e) => e.tier === "budget").length,
    muniCount: prefs.reduce((a, p) => a + p.munis.filter((m) => !m.n.includes("（県全体）")).length, 0),
    prefCount: prefs.filter((p) => p.munis.length > 0).length,
    kessanRange,
  };

  const out = { datasets: DATASETS, summary, prefs, entities: entityDetail, national, unclassified };
  const dir = join(process.cwd(), "public");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "coverage.json"), JSON.stringify(out), "utf8");
  const kb = (JSON.stringify(out).length / 1024).toFixed(0);
  console.log(
    `✓ データ整備状況を導出 → public/coverage.json（${summary.muniCount}市町村・${summary.sourceCount}資料・要許可${summary.licensePermission}・未確認${summary.licenseUnverified}・${kb}KB）`,
  );

  // ---- データの注意（自治体ごと）→ src/client/lib/caveats.gen.ts ----------------
  // **「この数値のここが不確か」を画面に出す。** 手で書かない —
  // `validate` の warning が既に「我々が把握している不確かさ」を機械可読で持っているので、
  // それをそのまま自治体へ割り当てる（手書きの注意書きは必ず実態とズレる。今日それを何度も見た）。
  // 原文をそのまま出す（メダリオンの原則: 発行元が報告したもの・我々が検出したものを丸めない）。
  // error は derive に来ない（検証ゲートで止まる）ので、ここに出るのは warning だけ。
  {
    // validate の原文は開発者向け（「款の前年度の和 1112829999 が…」）で市民には読めない。
    // **原文は残したまま**、パターンから一行の言い換えを付ける。
    // 「報告したものをそのまま尊重する」のは**数値を丸めない**という意味であって、
    // 説明を不親切にする理由ではない。**個別の文面を手で持たない**（分類だけをコードで持つので
    // warning が増えても実態とズレない）。未知のパターンは null＝原文だけ出す。
    const plainOf = (m: string): string | null => {
      if (m.includes("款の前年度の和")) {
        return "廃止された税目の行が、款の番号を持たないため前年度の合計に含められていません。表示している前年度の各款の額と、資料に載っている前年度の合計がわずかに合いません（当年度は一致しています）。";
      }
      if (m.includes("総コスト")) {
        return "人件費が「職員1人あたり人件費 × 人工」で計算されているため、事業費＋人件費と資料の総コストが1千円ずれています（原典の丸め）。";
      }
      if (m.includes("款番号が連番ではありません")) {
        return "款の番号に欠番があります。資料どおりで、取りこぼしではありません。";
      }
      if (m.includes("予算額が0")) {
        return "予算額が0の事業が載っています。資料どおりです。";
      }
      if (m.includes("重複しています")) {
        return "同じ事業名が複数回出てきます。資料が別の分類で再掲している可能性があります。";
      }
      if (m.includes("歳入科目の和")) {
        return "発行元（総務省）の資料上で、歳入科目の合計が1千円合いません。原典どおりに載せています。";
      }
      if (m.includes("記載率")) {
        return "資料に載っている率と、金額から計算し直した率がわずかに違います。";
      }
      return null;
    };
    const byCode: Record<string, { source: string; title: string; fy: string; plain: string | null; message: string }[]> = {};
    let n = 0;
    for (const s of srcs) {
      const code = entityOf(s).code;
      if (!code) continue; // 全国資料（総務省）は自治体に紐付かない
      // 未検証のソース（parse 前）はまだ注意を出せない
      let issues: { level: string; message: string }[];
      try {
        issues = validationResultSchema.parse(readJson(validationPath(s.id))).issues;
      } catch {
        continue;
      }
      for (const i of issues) {
        if (i.level !== "warning") continue;
        (byCode[code] ??= []).push({
          source: s.id, title: s.title, fy: s.fiscalYear,
          plain: plainOf(i.message), // 市民向けの一行（原文は message に残す）
          message: i.message,
        });
        n++;
      }
    }
    const out = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
//
// **データの注意** — 自治体ごとの「ここが不確か」。ダッシュボードに出す。
// **手で書かない**: \`validate\` の warning（＝検証ゲートが検出した不整合のうち、
// 原典側の事情と説明できるもの）をそのまま割り当てている。error は検証ゲートで止まり
// derive に来ないので、ここに出るのは warning だけ。
// 文面は validate の原文のまま（発行元が報告したもの・我々が検出したものを丸めない）。

export interface Caveat {
  /** レジストリの sourceId（どの資料の話か） */
  source: string;
  title: string;
  fy: string;
  /** 市民向けの一行。パターンから導出（未知のパターンは null → 原文だけ出す） */
  plain: string | null;
  /** validate が出した原文。**丸めずそのまま残す** */
  message: string;
}

/** 団体コード → データの注意。注意の無い自治体はキーごと存在しない */
export const CAVEATS: Record<string, Caveat[]> = ${JSON.stringify(byCode, null, 2)};
`;
    writeFileSync(join(process.cwd(), "src/client/lib/caveats.gen.ts"), out, "utf8");
    console.log(
      `✓ データの注意を導出 → src/client/lib/caveats.gen.ts（${Object.keys(byCode).length}自治体・計${n}件。validate の warning から）`,
    );
  }

  // ---- /roadmap（進捗と計画）→ src/client/lib/roadmap.gen.ts ------------------
  // **進捗の数字は1つも手で書かない** — coverage と同じ実データ（上の summary・gen 各種）から出す。
  // 手書きなのは計画（pipeline/registry/roadmap.ts）だけ。roadmap は数KBなので静的 import でよい
  // （coverage.json は130KB級なのでフェッチしているが、こちらはその必要がない）。
  const budgetDepth = Object.entries(MUNI_BUDGET_YEARS)
    .filter(([, ys]) => ys.length > 1)
    .map(([code, ys]) => ({ name: ys[0]!.muniName, code, years: ys.length, range: range(ys.map((y) => y.fy)) }))
    .sort((a, z) => z.years - a.years);
  const progress = {
    // 3階層のカバレッジ
    fullCount: summary.fullCount,
    budgetCount: summary.budgetCount,
    muniCount: summary.muniCount,
    prefCount: summary.prefCount,
    // 資料とエビデンス
    sourceCount: summary.sourceCount,
    fileCount: summary.fileCount,
    archivedCount: summary.archivedCount,
    // ライセンス区分（隠さず出す）
    licenseOpen: summary.licenseOpen,
    licensePermission: summary.licensePermission,
    licenseUnverified: summary.licenseUnverified,
    // 年度の深さ
    kessanRange,
    kofuBudgetRange: range(KOFU_BUDGET_YEARS.map((b) => b.fy)),
    kofuBudgetYears: KOFU_BUDGET_YEARS.length,
    /** 当初予算を複数年度収録している自治体（年度の多い順） */
    budgetDepth,
    /** full 甲府で収録済みのデータ種別（種別名 → 中身の説明） */
    kofuDetail: entityDetail["192015"]?.detail ?? {},
  };
  // 計画は画面に**プレーンテキストとして**描画される（Markdown を解釈しない）。
  // registry に `**強調**` を書くとアスタリスクごと表示される（実際に踏んだ）。
  // 同様に「時期を約束しない」ルールも機械的に守らせる — 公開ページなので後から効いてくる。
  for (const r of ROADMAP) {
    for (const [k, text] of Object.entries({ title: r.title, why: r.why, needs: r.needs })) {
      if (text.includes("**") || /\[.+\]\(.+\)/.test(text)) {
        throw new Error(
          `roadmap「${r.title}」の ${k}: Markdown 記法（** や リンク）は画面にそのまま出ます。プレーンテキストで書いてください`,
        );
      }
      if (/令和\d+年(度)?(まで|中|内)に|\d+月までに|今年度中に|来年度中に/.test(text)) {
        throw new Error(
          `roadmap「${r.title}」の ${k}: 時期を約束する表現が入っています。一次資料の入手可否は発行元次第なので、` +
            `「何を・なぜ・何が要るか」だけを書いてください（pipeline/registry/roadmap.ts 冒頭のルール）`,
        );
      }
      // 3つ目のルール「**進捗の数字をここに書かない**」も機械的に守らせる（2026-07-16）。
      // 宣言だけで検査が無く、実際に **`why` に「全1,741市町村」と手書きされていた**
      // （＝下の progress.muniCount と同じ値。市町村合併で片方だけ古くなる）。
      //
      // **数字一般を禁じない** — 「札幌は R7 だけで666件」のような**外部の事実**（未収録資料の規模）は
      // 計画の判断材料として要る。禁じるべきは**進捗タイルと同じ数字の二重管理**だけ。
      // → **derive が今まさに算出した値と一致する数字**だけを落とす。自己調整するので偽陽性が出ず、
      //   実態が動けば手書きのほうが自動的に検出される。
      for (const [n, unit] of [
        [progress.muniCount, "市町村"],
        [progress.budgetCount, "団体"],
        [progress.sourceCount, "件"],
      ] as const) {
        for (const form of [`${n}${unit}`, `${n.toLocaleString()}${unit}`]) {
          if (text.includes(form)) {
            throw new Error(
              `roadmap「${r.title}」の ${k}: 「${form}」は derive が実データから算出している進捗の数字です。` +
                `手書きすると必ず実態とズレます（roadmap.ts 冒頭のルール2）。数字を書かずに表現してください`,
            );
          }
        }
      }
    }
  }
  const roadmapOut = `// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 進捗（progress）は coverage.json と同じ実データから算出する。**手書きの数字は1つも無い。**
// 計画（plan）は pipeline/registry/roadmap.ts の内容をそのまま載せる（唯一の手書き）。

export interface RoadmapItem {
  title: string;
  status: "now" | "next" | "later";
  why: string;
  needs: string;
  ref?: string;
}

export const ROADMAP_PROGRESS = ${JSON.stringify(progress, null, 2)} as const;

export const ROADMAP_PLAN: RoadmapItem[] = ${JSON.stringify(ROADMAP, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src/client/lib/roadmap.gen.ts"), roadmapOut, "utf8");
  console.log(
    `✓ 進捗と計画を導出 → src/client/lib/roadmap.gen.ts（進捗は実データから算出 / 計画 ${ROADMAP.length}件: ` +
      `now ${ROADMAP.filter((r) => r.status === "now").length} / next ${ROADMAP.filter((r) => r.status === "next").length} / later ${ROADMAP.filter((r) => r.status === "later").length}）`,
  );
}

// ============================================================================
// 生成物どうしの整合チェック（derive の出口）
// ============================================================================
// **なぜ要るか**: `validate` は parsed の自己整合（Σ・算術）を守るが、**gen 同士の食い違いは
// 誰も見ていない**。2026-07-15 の1セッションで「収録済みなのに実態とズレる」型を**4回**踏んだ:
//   1. フッターの出典が「甲府市 当初予算資料 R2–R8」固定 → 全1,741自治体で甲府と表示（#62）
//   2. /coverage の予算列が最新年度のみ → 7年度あるのに「令和8年度」と過少申告（#65）
//   3. /coverage が横浜の成果を「×」→ REPORT_PARSERS への足し忘れ（#75）
//   4. /coverage が 2,535・画面が 2,313 で食い違う → 特別会計を数えていた（#75）
// いずれも**画面を見るまで気づけなかった**。ここで機械的に落とす。
// **error は throw する** — 黙って壊れた gen を出すくらいなら derive を失敗させる。
{
  const problems: string[] = [];
  const cov = readJson(join(process.cwd(), "public/coverage.json")) as {
    entities: Record<string, { name: string; detail: Record<string, string> }>;
  };
  const { REPORT_MUNIS } = await import("../src/client/lib/reports-index.gen");
  const { MUNI_BUDGET_YEARS, BUDGET_MUNIS } = await import("../src/client/lib/munibudgets.gen");
  const { FULL_MUNIS } = await import("../src/client/lib/decision-index.gen");

  // ① /coverage の「成果」の件数 = 実際に配信しているシャードの件数
  //    （生の parsed 件数を出して画面と食い違った実例がある）
  for (const [code, idx] of Object.entries(REPORT_MUNIS)) {
    const shard = readJson(join(process.cwd(), `public/reports/${code}.json`)) as { reports: unknown[] };
    if (shard.reports.length !== idx.count) {
      problems.push(
        `${idx.name}: 索引の件数 ${idx.count} とシャード public/reports/${code}.json の件数 ${shard.reports.length} が違います`,
      );
    }
    const detail = cov.entities[code]?.detail?.report ?? "";
    if (!detail.includes(String(idx.count))) {
      problems.push(
        `${idx.name}: /coverage の成果「${detail || "（無し）"}」に配信件数 ${idx.count} が出ていません` +
          `（収録済みを未収録と偽る／件数が食い違う）`,
      );
    }
  }

  // ② 事業報告を収録した自治体は、必ず /coverage の「成果」に出る
  //    （REPORT_PARSERS への足し忘れで静かに「×」になる）
  for (const s of SOURCES.filter((x) => !x.fixture)) {
    const m = /団体コード(\d{6})/.exec(s.scope ?? "");
    if (!m) continue;
    let docType: string | undefined;
    try {
      docType = (readJson(parsedPath(s.id)) as { docType?: string }).docType;
    } catch {
      continue; // 未 parse のソースは対象外
    }
    if (docType !== "project-report") continue;
    if (!cov.entities[m[1]!]?.detail?.report) {
      problems.push(
        `${s.id}: 事業報告を収録しているのに /coverage の ${cov.entities[m[1]!]?.name ?? m[1]} に「成果」が出ていません` +
          `（derive の REPORT_PARSERS に足し忘れていませんか）`,
      );
    }
  }

  // ③ 画面に出る自治体は必ず URL スラグを持つ（無いと共有リンクが壊れる）
  const slugs = readFileSync(join(process.cwd(), "src/client/lib/routing.ts"), "utf8");
  for (const code of [...BUDGET_MUNIS, ...FULL_MUNIS]) {
    if (!slugs.includes(`"${code}"`)) {
      const name = MUNI_BUDGET_YEARS[code]?.[0]?.muniName ?? code;
      problems.push(`${name}（${code}）: routing.ts の MUNI_SLUGS にローマ字スラグがありません（URL が団体コードになります）`);
    }
  }

  // ④ 年度間クロスチェーン: 連続する年度の「前年度列の合計」= 前年の「当年度の合計」
  //
  // **これが唯一、列の取り違えを捕まえる網**（2026-07-16 にゲート化）。validate は
  // parsed の自己整合しか見ないので、**歳入と歳出の列を丸ごと取り違えても Σ は両側とも差0 で
  // 素通りする**（足立で実際に起きた。あらまし R5〜R8 だけ列順が [前年度, 当年度] に反転して
  // いたのを、収録時の手作業のクロスチェックだけが見つけた）。同じ穴は**大田 H22〜H20 の
  // 「歳入と歳出の（1）（2）が逆」**にもあり、そこでは Σ ですら守れない
  // （**歳入合計 = 歳出合計 は定義上いつも成立する**）。
  //
  // **款ごとの差は見ない** — 原典が前年度列を新体系へ組み替える（restated）のは正常で、
  // 実測すると 44系列 125リンク中 15リンクが款レベルで動く（名古屋 R3 の職員費新設 274億・
  // 横浜 R6 の局再編・札幌 R4 の労働費→経済費 統合・福岡 R4 の2款付け替え等）。
  // **いずれも総額は一致する**ので、総額だけを見ればノイズ0で列の取り違えだけが落ちる。
  //
  // **総額が違ってよいのは、原典が別基準だと明示している場合だけ**（骨格予算＝市長選の年）。
  // その2件は `prevBasis`（札幌 R6・R2 = 補正後）か `prevNote`（甲府 R6 = 原典の注記
  // 「6月補正における政策的予算を含む」）を持つので、**説明が無い総額不一致だけ**を error にする。
  {
    // 同じ資料系列（= srcId から年度サフィックスを落としたもの）ごとに年度順で鎖を張る。
    // registry から組む（BUDGET_SOURCES は別ブロックのスコープ）。fixture は除く。
    const chains = new Map<string, { fy: string; srcId: string }[]>();
    for (const s of SOURCES) {
      if (s.fixture || !existsSync(parsedPath(s.id))) continue;
      const m = /^(.*)-(r\d+|h\d+)$/.exec(s.id);
      if (!m) continue;
      const arr = chains.get(m[1]!) ?? [];
      arr.push({ fy: m[2]!.toUpperCase(), srcId: s.id });
      chains.set(m[1]!, arr);
    }
    let links = 0;
    for (const [, years] of chains) {
      years.sort((a, z) => fyRank(a.fy) - fyRank(z.fy));
      for (let i = 1; i < years.length; i++) {
        const nw = years[i]!;
        const od = years[i - 1]!;
        // 欠番（収録できなかった年度）はまたがない — 鎖が張れるのは連続年度だけ
        if (fyRank(nw.fy) - fyRank(od.fy) !== 1) continue;
        const n = anyParsedDocSchema.parse(readJson(parsedPath(nw.srcId)));
        const o = anyParsedDocSchema.parse(readJson(parsedPath(od.srcId)));
        if (n.docType !== "budget-book" || o.docType !== "budget-book") continue;
        links++;
        const explained = n.prevBasis !== "当初" || !!n.prevNote;
        for (const [label, got, want] of [
          ["歳入", n.prevRevenueTotal, o.revenueTotal],
          ["歳出", n.prevExpenditureTotal, o.expenditureTotal],
        ] as const) {
          if (got == null || got === want) continue;
          if (explained) continue;
          problems.push(
            `${nw.srcId}: ${label}の前年度列の合計 ${got.toLocaleString()} が ` +
              `${od.srcId} の当年度合計 ${want.toLocaleString()} と違います（差 ${(got - want).toLocaleString()}）。` +
              `列の取り違え（足立型の列順反転・大田型の歳入歳出逆）を疑うこと。` +
              `原典が別基準（骨格予算等）なら parserOptions の prevBasis / prevNote で明示する`,
          );
        }
      }
    }
    if (problems.length === 0) console.log(`  年度間クロスチェーン: ${links} リンク（列の取り違えなし）`);
  }

  if (problems.length > 0) {
    console.error("✗ 生成物どうしの整合チェックで問題が見つかりました:");
    for (const p of problems) console.error(`  - ${p}`);
    throw new Error(`生成物の整合チェックに失敗（${problems.length}件）`);
  }
  console.log(
    `✓ 生成物どうしの整合チェック（/coverage の件数 = 配信シャードの件数 / 事業報告の収録漏れ / URL スラグ / 年度間クロスチェーン）`,
  );
}
