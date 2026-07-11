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
  fiscalYear: z.string().regex(/^R\d+$/),
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
  /** 属するセクション: 歳出款（例: "総務費"）または特別会計名（例: "介護保険事業特別会計"） */
  kan: z.string().min(1),
  /** 款内の掲載番号（資料の No. 列） */
  no: z.number().int().positive(),
  /** 区分列（新規/拡充。無印は null） */
  kubun: z.enum(["新規", "拡充"]).nullable(),
  /** 事業名（【N】【連】マーカー含む、資料の表記のまま） */
  name: z.string().min(1),
  /** 下段（ ）書きの予算書上の事業名 */
  budgetBookName: z.string().nullable(),
  /** 予算額（千円） */
  amount: z.number(),
  /** 内容列の全文 */
  description: z.string(),
  /** 基本目標（ひと/まち/魅力。複数は「・」連結） */
  basicGoal: z.string(),
  /** 総合計画の施策 */
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
  facts: z.array(budgetLineFactSchema),
  /** 「主な事業一覧」ページの抽出結果（ページ指定がある場合のみ） */
  projects: z.array(budgetProjectFactSchema).optional(),
});
export type BudgetBookDoc = z.infer<typeof budgetBookDocSchema>;

/** parse/validate が受け取り得る全ドキュメント型 */
export const anyParsedDocSchema = z.union([budgetBookDocSchema, parsedDocSchema]);
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
