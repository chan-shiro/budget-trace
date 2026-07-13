// ============================================================================
// データパイプラインの型定義
//
// 4層モデル: sources（資料レジストリ）→ raw（不変ファイル）→ parsed（位置情報付き
// 抽出結果）→ normalized（標準分類へマッピングした比較可能データ）
// 各層の受け渡しはすべて Zod で検証する。
// ============================================================================
import { z } from "zod";

// ---- [0] 資料レジストリ ----------------------------------------------------
export const sourceEntrySchema = z.object({
  /** 一意なID（kebab-case）。data/ 配下のディレクトリ名になる */
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  publisher: z.string(),
  /** ファイルへの直リンク。null = 手動投入（ingest-local）のみ */
  url: z.url().nullable(),
  /** 1ソースが複数ファイルで構成される場合の直リンク一覧（url より優先） */
  urls: z.array(z.url()).optional(),
  /** 人間が確認するランディングページ（直リンクが変わったときの起点） */
  landingPage: z.url().optional(),
  kind: z.enum(["excel", "csv", "pdf", "page"]),
  /** 会計年度（例: "R6"） */
  fiscalYear: z.string().regex(/^[RH]\d+$/),
  scope: z.string(),
  license: z.string(),
  /** pipeline/parsers/index.ts に登録したパーサのキー */
  parser: z.string(),
  parserOptions: z.record(z.string(), z.unknown()).optional(),
  /** true = 開発用フィクスチャ。normalized は _fixtures/ に隔離される */
  fixture: z.boolean().optional(),
});
export type SourceEntry = z.infer<typeof sourceEntrySchema>;

// ---- [1] raw メタデータ ------------------------------------------------------
// バイナリ本体は data/raw/<sourceId>/（gitignore）。このメタだけコミットして
// 「いつ・どこから・どのハッシュのファイルを取得したか」の来歴を固定する。
export const rawFileMetaSchema = z.object({
  filename: z.string(),
  sha256: z.string().length(64),
  bytes: z.number().int().positive(),
  fetchedAt: z.string(), // ISO 8601
  /** 取得元URL、または "manual:<元ファイル名>"（手動投入） */
  fetchedFrom: z.string(),
});
export const rawMetaSchema = z.object({
  sourceId: z.string(),
  files: z.array(rawFileMetaSchema).min(1),
});
export type RawMeta = z.infer<typeof rawMetaSchema>;

// ---- [1b] 外部アーカイブ台帳（data/archives.json） ----------------------------
// 一次資料の Wayback Machine スナップショット。raw 層（私たちの写し）に加えて
// 第三者が検証できる中立な写しの所在を記録する。pipeline/archive.ts が書く。
export const archiveEntrySchema = z.object({
  sourceId: z.string(),
  /** アーカイブ対象の元 URL（直リンクまたはランディングページ） */
  url: z.string().url(),
  kind: z.enum(["file", "landing"]),
  /** スナップショット URL（https://web.archive.org/web/<ts>/<url>） */
  waybackUrl: z.string().url(),
  /** スナップショットのタイムスタンプ（YYYYMMDDhhmmss） */
  waybackTimestamp: z.string(),
  /** この台帳エントリを最後に確認した日時（ISO 8601） */
  checkedAt: z.string(),
  /**
   * コピーの sha256 が raw（私たちが parse した版）と一致するか。
   * file のみ・検証済みの場合に入る。false = スナップショットが別版
   * （古い版など）を指しており、--force で現行版の再登録が必要
   */
  sha256Match: z.boolean().optional(),
});
export type ArchiveEntry = z.infer<typeof archiveEntrySchema>;
export const archivesLedgerSchema = z.object({
  note: z.string(),
  entries: z.array(archiveEntrySchema),
});

// ---- [2] parsed --------------------------------------------------------------
// 抽出した事実は必ず locator（どのファイルのどの位置から来たか）を持つ。
// UI のエビデンス表示・監査はここに依存する。
export const locatorSchema = z.object({
  file: z.string(),
  sheet: z.string().optional(),
  row: z.number().int().optional(), // 1-origin（Excelの表示行）
  page: z.number().int().optional(), // PDF 用
});
export type Locator = z.infer<typeof locatorSchema>;

/** 決算状況調の1自治体分。金額の単位は千円（資料の単位のまま保持する） */
export const muniAccountFactSchema = z.object({
  muniCode: z.string().regex(/^\d{6}$/), // 全国地方公共団体コード（JIS X 0402）
  prefName: z.string(),
  muniName: z.string(),
  population: z.number().int().nullable(),
  revenueTotal: z.number().nullable(),
  expenditureTotal: z.number().nullable(),
  /** 目的別歳出（議会費・総務費・民生費…）。キーは資料の科目名そのまま */
  expenditureByPurpose: z.record(z.string(), z.number()),
  /** 目的別歳出の項レベル内訳（款名 → 項名 → 千円）。資料に内訳列がある款のみ */
  expenditureByPurposeDetail: z
    .record(z.string(), z.record(z.string(), z.number()))
    .optional(),
  /** 歳入の科目別（地方税・地方交付税・国庫支出金…）。キーは資料の科目名そのまま */
  revenueByCategory: z.record(z.string(), z.number()).optional(),
  /** 歳入の内訳（科目名 → 内訳名 → 千円）。「うち〜」の部分列挙を含むことに注意 */
  revenueByCategoryDetail: z
    .record(z.string(), z.record(z.string(), z.number()))
    .optional(),
  /** 面積（km²・概況の記載値） */
  areaKm2: z.number().optional(),
  /** 産業構造（令和2年国調・%） */
  industryPct: z
    .object({ primary: z.number(), secondary: z.number(), tertiary: z.number() })
    .optional(),
  /** 財政力指数 */
  financialIndex: z.number().optional(),
  /** 経常収支比率（%） */
  keijoShushiPct: z.number().optional(),
  /** 実質公債費比率（%） */
  jisshitsuKosaihiPct: z.number().optional(),
  /** 将来負担比率（%）。「-」の団体は欠損 */
  shoraiFutanPct: z.number().optional(),
  /** 主たる出典位置（概況ファイルの行）。normalized の sourceRef になる */
  locator: locatorSchema,
  /** 複数ファイルから合成した場合の全出典位置（locator を含む） */
  locators: z.array(locatorSchema).optional(),
});
export type MuniAccountFact = z.infer<typeof muniAccountFactSchema>;

export const parsedDocSchema = z.object({
  /** ドキュメント種別。既存ファイルとの互換のため default 付き */
  docType: z.literal("municipal-accounts").default("municipal-accounts"),
  sourceId: z.string(),
  parser: z.string(),
  parserVersion: z.string(),
  parsedAt: z.string(),
  unit: z.literal("thousandYen"),
  facts: z.array(muniAccountFactSchema),
});
export type ParsedDoc = z.infer<typeof parsedDocSchema>;

// ---- [2'] parsed: 予算書（款別） ---------------------------------------------
// 自治体の当初予算書・予算資料から抽出した款別の歳入・歳出。単位は千円。
export const budgetLineFactSchema = z.object({
  side: z.enum(["revenue", "expenditure"]),
  kanNo: z.number().int().positive(),
  kanName: z.string().min(1),
  /** 当年度当初予算額（千円） */
  amount: z.number(),
  /** 前年度当初予算額（千円）。資料に無ければ null */
  prevAmount: z.number().nullable(),
  locator: locatorSchema,
});
export type BudgetLineFact = z.infer<typeof budgetLineFactSchema>;

/** 予算資料「主な事業一覧」の1事業 */
export const budgetProjectFactSchema = z.object({
  /**
   * 属するセクション: 歳出款（例: "総務費"）または特別会計名（例: "介護保険事業特別会計"）。
   * R2・R3 の箇条書き形式には款の記載が無く null
   */
  kan: z.string().min(1).nullable(),
  /** 款内の掲載番号（資料の No. 列）。箇条書き形式には無く null */
  no: z.number().int().positive().nullable(),
  /** 区分列（新規/拡充）または箇条書きのマーカー（◆=繰越）。無印は null */
  kubun: z.enum(["新規", "拡充", "繰越"]).nullable(),
  /** 事業名（【N】【連】マーカー含む、資料の表記のまま） */
  name: z.string().min(1),
  /** 下段（ ）書きの予算書上の事業名 */
  budgetBookName: z.string().nullable(),
  /** 予算額（千円） */
  amount: z.number(),
  /** 内容列の全文（箇条書き形式では ★/◆ の補足行。無い事業は空文字） */
  description: z.string(),
  /** 基本目標（ひと/まち/魅力、基本目標1〜4、基本構想の推進。複数は「・」連結） */
  basicGoal: z.string(),
  /** 基本目標の名称（箇条書き形式の見出しに記載がある場合のみ） */
  basicGoalLabel: z.string().optional(),
  /** 総合計画の施策（箇条書き形式では「施策の柱」） */
  shisaku: z.string(),
  locator: locatorSchema,
});
export type BudgetProjectFact = z.infer<typeof budgetProjectFactSchema>;

export const budgetBookDocSchema = z.object({
  docType: z.literal("budget-book"),
  sourceId: z.string(),
  parser: z.string(),
  parserVersion: z.string(),
  parsedAt: z.string(),
  unit: z.literal("thousandYen"),
  fiscalYear: z.string(),
  /** 会計名（現状は一般会計のみ） */
  account: z.string(),
  /** 資料記載の歳入合計・歳出合計（千円）。内訳の和との照合は validate が行う */
  revenueTotal: z.number(),
  expenditureTotal: z.number(),
  prevRevenueTotal: z.number().nullable(),
  prevExpenditureTotal: z.number().nullable(),
  /**
   * 前年度列の基準。通常は「当初」だが、R2 の款別一覧表は
   * 「令和元年度 6月補正後予算額」との比較（パーサが資料から自動検出）
   */
  prevBasis: z.enum(["当初", "補正後"]).default("当初"),
  /**
   * 前年度列に関する資料注記（あれば原文のまま）。
   * 例: R6 資料「※令和5年度当初予算額は、6月補正における政策的予算（KOFU NEXT ACTION）を含む」
   * — R5 は改選年の骨格予算のため、R6 の前年列は R5 資料の総額と一致しない（両者とも正）
   */
  prevNote: z.string().optional(),
  facts: z.array(budgetLineFactSchema),
  /** 「主な事業一覧」ページの抽出結果（ページ指定がある場合のみ） */
  projects: z.array(budgetProjectFactSchema).optional(),
});
export type BudgetBookDoc = z.infer<typeof budgetBookDocSchema>;

// ---- [2''] parsed: 予算執行状況（財政事情の公表） ------------------------------
// 地方自治法に基づく年2回の財政事情公表から抽出した款別の予算現額・収入/支出済額。
// 単位は千円（資料の万円を変換）。
export const executionLineFactSchema = z.object({
  side: z.enum(["revenue", "expenditure"]),
  /** 款名（資料表記から空白を除去） */
  name: z.string().min(1),
  /** 予算現額（千円） */
  currentBudget: z.number(),
  /** 収入済額（歳入）/ 支出済額（歳出）（千円） */
  settled: z.number(),
  /** 資料記載の収入率/執行率（%）。予算現額0の款は null */
  ratePct: z.number().nullable(),
  /** 内訳行（決算状況「収入支出詳細」の市税内訳など。予算現額のみ記載） */
  breakdown: z.array(z.object({ name: z.string().min(1), currentBudget: z.number() })).optional(),
  locator: locatorSchema,
});
export type ExecutionLineFact = z.infer<typeof executionLineFactSchema>;

export const budgetExecutionDocSchema = z.object({
  docType: z.literal("budget-execution"),
  sourceId: z.string(),
  parser: z.string(),
  parserVersion: z.string(),
  parsedAt: z.string(),
  unit: z.literal("thousandYen"),
  /** 対象会計年度（例: "R7"） */
  fiscalYear: z.string(),
  account: z.string(),
  /** 基準日（例: "令和8年3月31日現在"）または "決算（確定値）" */
  asOf: z.string(),
  /**
   * 済額の基準。速報 = 財政事情の公表（出納整理期間前の年度末値）、
   * 確定 = 決算状況の収入支出詳細（出納整理後の決算値）
   */
  basis: z.enum(["速報", "確定"]).default("速報"),
  /** 基準日現在の人口（資料記載） */
  population: z.number().nullable(),
  /** 資料記載の合計行（千円）。内訳の和との照合は validate が行う */
  revenueBudgetTotal: z.number(),
  revenueSettledTotal: z.number(),
  expenditureBudgetTotal: z.number(),
  expenditureSettledTotal: z.number(),
  facts: z.array(executionLineFactSchema),
});
export type BudgetExecutionDoc = z.infer<typeof budgetExecutionDocSchema>;

// ---- [2'''] parsed: 行政評価（事務事業評価） -----------------------------------
// 実施計画事業ごとの総合評価（A〜F）。年度により形式が違う（docs/data-sources.md）。
// 評価年度 = 実施計画の年度（例: R6 評価 = 第9次実施計画 = R6 年度事業）。
export const projectEvaluationFactSchema = z.object({
  /** 実施計画掲載事業名 / 事務事業名 */
  name: z.string().min(1),
  /** 総合評価（A〜F、完了。新規等で評価なしは "－"） */
  grade: z.string().regex(/^([A-F－]|完了)$/),
  /** 前回評価（無い年度・新規は null） */
  prevGrade: z.string().nullable(),
  /** 評価点の合計（R3 形式のみ） */
  scoreTotal: z.number().nullable(),
  /** 担当（部・課）。無い形式は null */
  bu: z.string().nullable(),
  ka: z.string().nullable(),
  /** 施策（一覧形式のみ） */
  shisaku: z.string().nullable(),
  /** 区分（主要事業/一般事業など。無い形式は null） */
  kubun: z.string().nullable(),
  /** 事業の目的（様式形式のみ） */
  purpose: z.string().nullable(),
  /** 予算名（実施計画一覧シートから join。R6・R7 のみ）— 主な事業の予算書名と突合できる */
  budgetName: z.string().nullable(),
  locator: locatorSchema,
});
export type ProjectEvaluationFact = z.infer<typeof projectEvaluationFactSchema>;

export const projectEvaluationDocSchema = z.object({
  docType: z.literal("project-evaluation"),
  sourceId: z.string(),
  parser: z.string(),
  parserVersion: z.string(),
  parsedAt: z.string(),
  /** 評価年度（= 実施計画の年度） */
  fiscalYear: z.string(),
  /** 資料の様式・実施計画次数などの注記 */
  formNote: z.string(),
  facts: z.array(projectEvaluationFactSchema),
});
export type ProjectEvaluationDoc = z.infer<typeof projectEvaluationDocSchema>;

// ---- [2''''] parsed: 統計書 財政章（款項×当初/最終/決算） ----------------------
// 甲府市統計書「一般会計歳入歳出状況」。款＋項レベルで当初予算額・最終予算額
// （補正・繰越込みの予算現額）・決算額の3点が取れる唯一のウェブ公開資料。単位は円。
export const outturnLineFactSchema = z.object({
  side: z.enum(["revenue", "expenditure"]),
  kanName: z.string().min(1),
  /** 項名。null = 款の行 */
  kouName: z.string().nullable(),
  /** 当初予算額（円） */
  initialBudget: z.number(),
  /** 最終予算額（円・補正/繰越込み） */
  finalBudget: z.number(),
  /** 決算額（円） */
  settled: z.number(),
  locator: locatorSchema,
});
export type OutturnLineFact = z.infer<typeof outturnLineFactSchema>;

export const budgetOutturnDocSchema = z.object({
  docType: z.literal("budget-outturn"),
  sourceId: z.string(),
  parser: z.string(),
  parserVersion: z.string(),
  parsedAt: z.string(),
  unit: z.literal("yen"),
  /** データの会計年度（統計書の版とはズレる — 版-2年度） */
  fiscalYear: z.string(),
  account: z.string(),
  /** 総額行（円） */
  revenueTotal: z.object({ initial: z.number(), final: z.number(), settled: z.number() }),
  expenditureTotal: z.object({ initial: z.number(), final: z.number(), settled: z.number() }),
  facts: z.array(outturnLineFactSchema),
});
export type BudgetOutturnDoc = z.infer<typeof budgetOutturnDocSchema>;

// 総務省 決算状況調(4)性質別歳出＋(5)地方債。1自治体1レコード。千円。
export const municipalNatureFactSchema = z.object({
  muniCode: z.string().regex(/^\d{6}$/),
  /** 主要14性質（人件費・扶助費・普通建設事業費・公債費…）→ 千円 */
  byNature: z.record(z.string(), z.number()),
  /** Σ主要14性質（＝歳出総額。概況と突合できる） */
  natureTotal: z.number(),
  /** 地方債現在高ほか（(5)ファイル。無い自治体は null） */
  localBond: z
    .object({
      balance: z.number(),
      reserveTotal: z.number().nullable(),
      reserveByType: z.object({
        財政調整基金: z.number().nullable(),
        減債基金: z.number().nullable(),
        その他特定目的基金: z.number().nullable(),
      }),
      debtBurdenFuture: z.number().nullable(),
      publicEnterpriseTransfer: z.number().nullable(),
    })
    .nullable(),
  locator: locatorSchema,
});
export type MunicipalNatureFact = z.infer<typeof municipalNatureFactSchema>;

export const municipalNatureDocSchema = z.object({
  docType: z.literal("municipal-nature"),
  sourceId: z.string(),
  parser: z.string(),
  parserVersion: z.string(),
  parsedAt: z.string(),
  unit: z.literal("thousandYen"),
  fiscalYear: z.string(),
  facts: z.array(municipalNatureFactSchema),
});
export type MunicipalNatureDoc = z.infer<typeof municipalNatureDocSchema>;

/** parse/validate が受け取り得る全ドキュメント型 */
export const anyParsedDocSchema = z.union([
  budgetBookDocSchema,
  budgetExecutionDocSchema,
  projectEvaluationDocSchema,
  budgetOutturnDocSchema,
  municipalNatureDocSchema,
  parsedDocSchema,
]);
export type AnyParsedDoc = z.infer<typeof anyParsedDocSchema>;

// ---- 検証ゲート ---------------------------------------------------------------
export const validationIssueSchema = z.object({
  level: z.enum(["error", "warning"]),
  muniCode: z.string().optional(),
  message: z.string(),
});
export const validationResultSchema = z.object({
  sourceId: z.string(),
  validatedAt: z.string(),
  /** needs_review のソースは normalize を通さない（--force を除く） */
  status: z.enum(["ok", "needs_review"]),
  issues: z.array(validationIssueSchema),
});
export type ValidationResult = z.infer<typeof validationResultSchema>;

// ---- [3] normalized -----------------------------------------------------------
// 比較可能レイヤ。自治体は団体コード、歳出は目的別の標準科目キーで揃える。
export const STANDARD_PURPOSES = [
  "議会費", "総務費", "民生費", "衛生費", "労働費", "農林水産業費", "商工費",
  "土木費", "消防費", "警察費", "教育費", "災害復旧費", "公債費", "諸支出金",
  "前年度繰上充用金", "その他",
] as const;
export const standardPurposeSchema = z.enum(STANDARD_PURPOSES);
export type StandardPurpose = z.infer<typeof standardPurposeSchema>;

export const normalizedMuniAccountSchema = z.object({
  muniCode: z.string().regex(/^\d{6}$/),
  prefName: z.string(),
  muniName: z.string(),
  fiscalYear: z.string(),
  population: z.number().int().nullable(),
  /** 金額は千円で統一 */
  revenueTotal: z.number().nullable(),
  expenditureTotal: z.number().nullable(),
  expenditureByPurpose: z.partialRecord(standardPurposeSchema, z.number()),
  /** 目的別歳出の項レベル内訳（款名 → 項名 → 千円） */
  expenditureByPurposeDetail: z
    .record(z.string(), z.record(z.string(), z.number()))
    .optional(),
  /** 歳入の科目別（資料の標準科目名のまま） */
  revenueByCategory: z.record(z.string(), z.number()).optional(),
  /** 歳入の内訳（「うち〜」の部分列挙を含む） */
  revenueByCategoryDetail: z
    .record(z.string(), z.record(z.string(), z.number()))
    .optional(),
  /** 基本情報・財政指標（概況の記載値） */
  areaKm2: z.number().optional(),
  industryPct: z
    .object({ primary: z.number(), secondary: z.number(), tertiary: z.number() })
    .optional(),
  financialIndex: z.number().optional(),
  keijoShushiPct: z.number().optional(),
  jisshitsuKosaihiPct: z.number().optional(),
  shoraiFutanPct: z.number().optional(),
  /** 1人あたり歳出（円）。population が無い場合は null */
  expenditurePerCapitaYen: z.number().nullable(),
  /** 来歴: どのソースのどの位置から来たか */
  sourceRef: z.object({ sourceId: z.string(), sha256: z.string(), locator: locatorSchema }),
});
export type NormalizedMuniAccount = z.infer<typeof normalizedMuniAccountSchema>;

export const normalizedDatasetSchema = z.object({
  dataset: z.literal("municipal-accounts"),
  fiscalYear: z.string(),
  unit: z.literal("thousandYen"),
  generatedAt: z.string(),
  sources: z.array(z.object({ sourceId: z.string(), sha256: z.string() })),
  records: z.array(normalizedMuniAccountSchema),
});
export type NormalizedDataset = z.infer<typeof normalizedDatasetSchema>;
