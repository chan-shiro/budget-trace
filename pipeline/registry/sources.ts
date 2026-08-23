// ============================================================================
// 資料レジストリ — パイプラインが扱う一次資料の台帳
//
// ルール:
// - 新しい資料はまずここに登録する（URL・発行元・年度・ライセンス・パーサ）
// - url は「ファイルへの直リンク」。ページ側の構成変更で切れたら landingPage
//   から人間が直リンクを確認して更新する
// - 直リンクが取れない/自動取得が禁止されている資料は url: null にして
//   `bun run pipeline:ingest <sourceId> <ファイルパス>` で手動投入する
// ============================================================================
import { sourceEntrySchema, type SourceEntry } from "../types";
import { eraYear } from "../lib/fy";
// 札幌の事業評価調書は1事業1PDF（一般会計634件）。URL 台帳は収集器が生成する（#127）
import sapporoHyokaR7 from "./sapporo-jigyou-hyouka-r7.files.json";

export const SOURCES: SourceEntry[] = [
  {
    // 全市町村の普通会計決算（人口・歳入歳出総額・目的別内訳）が入った総務省の
    // 統一データ。normalized（全国比較）レイヤの基盤。
    // 1年度分が4ファイル構成: (都市別/町村別) × (概況/目的別歳出内訳)。
    // パーサが団体コードでマージする。直リンクは landingPage の年度ページから
    // 「(1)概況」「(3)目的別歳出内訳」を確認して更新する。
    id: "soumu-shichoson-kessan-r6",
    title: "令和6年度 市町村別決算状況調",
    publisher: "総務省 自治財政局",
    url: null,
    urls: [
      "https://www.soumu.go.jp/main_content/001061669.xlsx", // 都市別 (1)概況
      "https://www.soumu.go.jp/main_content/001061670.xlsx", // 都市別 (2)歳入内訳
      "https://www.soumu.go.jp/main_content/001061671.xlsx", // 都市別 (3)目的別歳出内訳
      "https://www.soumu.go.jp/main_content/001061674.xlsx", // 町村別 (1)概況
      "https://www.soumu.go.jp/main_content/001061675.xlsx", // 町村別 (2)歳入内訳
      "https://www.soumu.go.jp/main_content/001061676.xlsx", // 町村別 (3)目的別歳出内訳
    ],
    landingPage: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html",
    kind: "excel",
    fiscalYear: "R6",
    scope: "全市町村（普通会計）",
    license: "公共データ利用規約（政府標準利用規約準拠）",
    parser: "soumu-shichoson-kessan",
  },
  // 決算状況調の過去年度（経年比較用）。構成は R6 と同じ
  // （都市別/町村別 × 概況/歳入内訳/目的別歳出内訳）。年度ページから直リンクを確認済み
  ...([
    ["r5", "R5", "r05", ["000999900", "000999901", "000999902", "000999905", "000999906", "000999908"]],
    ["r4", "R4", "r04", ["000937287", "000937288", "000937289", "000937292", "000937293", "000937294"]],
    ["r3", "R3", "r03", ["000871018", "000871019", "000871020", "000871023", "000871024", "000871025"]],
    ["r2", "R2", "r02", ["000800819", "000800820", "000800822", "000800826", "000800828", "000800830"]],
  ] as const).map(([suffix, fy, page, ids]): SourceEntry => ({
    id: `soumu-shichoson-kessan-${suffix}`,
    title: `令和${fy.slice(1)}年度 市町村別決算状況調`,
    publisher: "総務省 自治財政局",
    url: null,
    urls: ids.map((n) => `https://www.soumu.go.jp/main_content/${n}.xlsx`),
    landingPage: `https://www.soumu.go.jp/iken/zaisei/${page}_shichouson.html`,
    kind: "excel",
    fiscalYear: fy,
    scope: "全市町村（普通会計）",
    license: "公共データ利用規約（政府標準利用規約準拠）",
    parser: "soumu-shichoson-kessan",
  })),
  {
    // 決算状況調(4)性質別歳出内訳・(5)地方債現在高（都市別＋町村別）。全1,741市町村。
    // 概況/歳入内訳/目的別（soumu-shichoson-kessan）とは別ソース・別パーサに隔離し、
    // decision シャードの derive で団体コードで結合する。Σ主要14性質＝歳出総額で自己検証。
    id: "soumu-shichoson-seishitsu-r6",
    title: "令和6年度 市町村別決算状況調（性質別歳出・地方債）",
    publisher: "総務省 自治財政局",
    url: null,
    urls: [
      "https://www.soumu.go.jp/main_content/001061672.xlsx", // 都市別 (4)性質別歳出内訳
      "https://www.soumu.go.jp/main_content/001061673.xlsx", // 都市別 (5)地方債
      "https://www.soumu.go.jp/main_content/001061677.xlsx", // 町村別 (4)性質別歳出内訳
      "https://www.soumu.go.jp/main_content/001061678.xlsx", // 町村別 (5)地方債
    ],
    landingPage: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html",
    kind: "excel",
    fiscalYear: "R6",
    scope: "全市町村（普通会計・性質別/地方債）",
    license: "公共データ利用規約（政府標準利用規約準拠）",
    parser: "soumu-shichoson-seishitsu",
  },
  // 性質別・地方債の過年度（R2〜R5）。都市別/町村別 × (4)性質別/(5)地方債 の4ファイル。
  // 年度ページから直リンクを確認済み（2026-07-13）。R6 と同じパーサ・docType。
  ...([
    ["r5", "R5", "r05", "000999903", "000999904", "000999910", "000999911"],
    ["r4", "R4", "r04", "000937290", "000937291", "000937295", "000937296"],
    ["r3", "R3", "r03", "000871021", "000871022", "000871026", "000871027"],
    ["r2", "R2", "r02", "000800823", "000800825", "000800832", "000800834"],
  ] as const).map(([suffix, fy, page, c4, c5, t4, t5]): SourceEntry => ({
    id: `soumu-shichoson-seishitsu-${suffix}`,
    title: `令和${fy.slice(1)}年度 市町村別決算状況調（性質別歳出・地方債）`,
    publisher: "総務省 自治財政局",
    url: null,
    urls: [
      `https://www.soumu.go.jp/main_content/${c4}.xlsx`, // 都市別(4)性質別
      `https://www.soumu.go.jp/main_content/${c5}.xlsx`, // 都市別(5)地方債
      `https://www.soumu.go.jp/main_content/${t4}.xlsx`, // 町村別(4)性質別
      `https://www.soumu.go.jp/main_content/${t5}.xlsx`, // 町村別(5)地方債
    ],
    landingPage: `https://www.soumu.go.jp/iken/zaisei/${page}_shichouson.html`,
    kind: "excel",
    fiscalYear: fy,
    scope: "全市町村（普通会計・性質別/地方債）",
    license: "公共データ利用規約（政府標準利用規約準拠）",
    parser: "soumu-shichoson-seishitsu",
  })),
  {
    // 甲府市の当初予算（案）資料。款別の歳入・歳出一覧（前年度比較つき）と
    // 主な事業一覧を収録。まず款別一覧を決定的にパースする（pdftotext / poppler が必要）。
    // 主な事業一覧ページ（p.14-23）の抽出は LLM 併用パーサとして今後追加。
    id: "kofu-yosansho-r8",
    title: "令和8年度 甲府市当初予算（案）資料",
    publisher: "甲府市",
    url: null,
    urls: ["https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf"],
    landingPage: "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r8yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    // 款別一覧・主な事業一覧の PDF ページ番号（1-origin）。資料の構成が変わったらここを更新する
    parserOptions: { revenuePage: 12, expenditurePage: 13, projectPages: { from: 14, to: 23 } },
  },
  {
    // 過年度の当初予算資料（R8 と同型）。ページ番号は年度ごとに異なる。
    // R5・R4 の資料は市サイトから削除済みで Wayback にも無い（未収録）。
    // R3・R2 は分冊形式（款別一覧表・主な事業が別PDF）のため別途対応。
    id: "kofu-yosansho-r7",
    title: "令和7年度 甲府市当初予算資料",
    publisher: "甲府市",
    url: null,
    urls: ["https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf"],
    landingPage: "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r7yosan.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: { revenuePage: 13, expenditurePage: 14, projectPages: { from: 15, to: 25 } },
  },
  // R5・R4 の当初予算資料は市サイトから削除済み・Wayback にも無かったが、
  // WARP（国立国会図書館）の 2024-05-09 収集分に PDF が完全残存していたため回収した
  // （2026-07-12。R8〜R6 と同型の単一 PDF。原典 URL は市サイトの documents/ 配下だった）
  {
    id: "kofu-yosansho-r5",
    title: "令和5年度 甲府市当初予算資料（WARP回収）",
    publisher: "甲府市",
    url: null,
    urls: [
      "https://warp.ndl.go.jp/20240509/20240508214211/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r5tousyoshiryou.pdf",
    ],
    landingPage: "https://warp.ndl.go.jp/20240508/20240508090506/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r05yosan.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（WARP 経由の保存版。利用条件は両者のサイト参照）",
    parser: "kofu-yosansho",
    // この PDF は座標系が右寄りのため列境界を上書き（実測: 予算額 x≈314-330・目標 x≈693）
    parserOptions: {
      revenuePage: 14,
      expenditurePage: 15,
      projectPages: { from: 16, to: 23 },
      projectColumns: { nameEnd: 295, amountEnd: 345, contentEnd: 690, goalEnd: 742 },
    },
  },
  {
    id: "kofu-yosansho-r4",
    title: "令和4年度 甲府市当初予算資料（WARP回収）",
    publisher: "甲府市",
    url: null,
    urls: [
      "https://warp.ndl.go.jp/20240509/20240508214215/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r4toushoyosan.pdf",
    ],
    landingPage: "https://warp.ndl.go.jp/20240508/20240508090506/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04yosan.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（WARP 経由の保存版。利用条件は両者のサイト参照）",
    parser: "kofu-yosansho",
    parserOptions: { revenuePage: 14, expenditurePage: 15, projectPages: { from: 16, to: 22 } },
  },
  {
    id: "kofu-yosansho-r6",
    title: "令和6年度 甲府市当初予算資料",
    publisher: "甲府市",
    url: null,
    urls: ["https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf"],
    landingPage: "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r06yosan.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: { revenuePage: 15, expenditurePage: 16, projectPages: { from: 17, to: 25 } },
  },
  {
    // R3・R2 は分冊形式: 款別一覧表と主な事業が別 PDF。主な事業は表でなく
    // 箇条書き形式（●事業名…金額、★新規/◆繰越、基本目標・施策の柱の章立て）で、
    // 款・連番が無い（projectFormat: "bullets"）
    id: "kofu-yosansho-r3",
    title: "令和3年度 甲府市当初予算資料（款別一覧表・主な事業）",
    publisher: "甲府市",
    url: null,
    urls: [
      "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/2r03ippankaikeisainyusaisyutu.pdf",
      "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/3r03omonajigyo_3.pdf",
    ],
    landingPage: "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r03yosan.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      kanFile: "2r03ippankaikeisainyusaisyutu.pdf",
      revenuePage: 1,
      expenditurePage: 2,
      projectsFile: "3r03omonajigyo_3.pdf",
      projectFormat: "bullets",
      projectPages: { from: 1, to: 3 },
    },
  },
  {
    // 注意: R2 の款別一覧表の前年列は「令和元年度 6月補正後予算額」（当初でない）。
    // パーサが prevBasis を自動検出して parsed に記録する
    id: "kofu-yosansho-r2",
    title: "令和2年度 甲府市当初予算資料（款別一覧表・主な事業）",
    publisher: "甲府市",
    url: null,
    urls: [
      "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02sainyuusaishutu.pdf",
      "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02omonajigyou.pdf",
    ],
    landingPage: "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r02yosan.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      kanFile: "r02sainyuusaishutu.pdf",
      revenuePage: 1,
      expenditurePage: 2,
      projectsFile: "r02omonajigyou.pdf",
      projectFormat: "bullets",
      projectPages: { from: 1, to: 3 },
    },
  },
  // ── 縦掘りパイロット: 甲府の類似4市の当初予算資料（款別歳入歳出）──────────────
  // 全4市ともテキスト層つき PDF で、款別歳入歳出（前年度比つき）が pdftotext -layout で
  // 決定的にパースできることを発見時に確認済み（docs/data-sources.md §7）。
  // パーサは kofu-yosansho を多自治体対応に一般化して共用する（見出し・合計ラベル・
  // 負号・款番号有無を parserOptions で吸収）。まず様式が甲府に最も近い豊川・山口から収録。
  {
    // 豊川市（愛知県・団体コード 232076）。予算冊子「令和7年度 豊川市予算」1冊に
    // 第2表=一般会計歳入予算（科目別・p.26）・第5表=歳出予算（目的別・p.29）が
    // 前年度比つきで載る（Excel→PDF 出力・テキスト層）。負号は △。単位は千円。
    id: "toyokawa-yosansho-r7",
    title: "令和7年度 豊川市予算（款別歳入歳出）",
    publisher: "豊川市",
    url: null,
    urls: ["https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf"],
    landingPage: "https://www.city.toyokawa.lg.jp/soshiki/zaimu/zaisei/2/1/1/3/22950.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "豊川市（一般会計・団体コード232076）",
    license: "豊川市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    // 見出し・合計ラベルが甲府と違う（見出し「歳入予算」、合計行「合計」）。款番号は全角。
    // 主な事業は同一PDFの p.11-20（款見出し＋【課】＋事業［款項目事業コード］＋当年度/前年度）
    parserOptions: {
      revenuePage: 26,
      expenditurePage: 29,
      revenueHeading: "歳入予算",
      expenditureHeading: "歳出予算",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      projectPages: { from: 11, to: 20 },
      projectFormat: "coded-sections",
    },
  },
  {
    // 山口市（山口県・団体コード 352039）。⚠ 2026-07-25 まで**このコメントだけ 352012（＝下関市）**と
    // 誤記していた（総務省の原本 Excel で確認）。`scope` と derive の `muniCode` はどちらも
    // 正しく 352039 だったので実害は無いが、コメントを信じると取り違える。
    // 「令和7年度 当初予算資料（全体版）」巻末の
    // 資料節に (1)一般会計歳入（款別・p.158）・(2)歳出（目的別・p.159）が前年度比つきで載る。
    // テキスト層つき PDF（179p・pdftotext -layout でパース可）。単位は千円。
    id: "yamaguchi-yosansho-r7",
    title: "令和7年度 山口市当初予算資料（款別歳入歳出）",
    publisher: "山口市",
    url: null,
    urls: ["https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf"],
    landingPage: "https://www.city.yamaguchi.lg.jp/site/shiseijoho/171302.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "山口市（一般会計・団体コード352039）",
    license: "山口市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    // 印字ページ番号(158/159)と PDF 物理ページ(160/161)がずれる。○接頭辞・負号▲。
    // 主な事業は「施策別主要事業」（事業別・PDF p.114-157。事業名 予算額 内容 担当課）
    parserOptions: {
      revenuePage: 160,
      expenditurePage: 161,
      revenueHeading: "一般会計歳入",
      expenditureHeading: "一般会計歳出",
      projectPages: { from: 114, to: 157 },
      projectFormat: "table-lines",
    },
  },
  {
    // 沼津市（静岡県・団体コード 222038）。「歳入歳出予算款別前年度比較表（1）一般会計」
    // s-1.pdf（2p）。歳入 p.1・歳出 p.2 の別ページ型。金額に「千円」「％」がインラインだが
    // amount 正規表現が無視する。款番号は半角・負号 △。見出しは節の「歳入」「歳出」。
    id: "numazu-yosansho-r7",
    title: "令和7年度 沼津市予算（款別歳入歳出前年度比較表）",
    publisher: "沼津市",
    url: null,
    urls: ["https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf"],
    landingPage: "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/index.htm",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "沼津市（一般会計・団体コード222038）",
    license: "沼津市ウェブサイト掲載資料（非営利・二次利用要許可。利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 2,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 和泉市（大阪府・団体コード 272035）。一般会計事項別明細書「1 総括」。
    // 歳入 p.5・歳出 p.6 の別ページ型。款名に字間スペース無し・負号 △（詰め）。
    // 歳入列は割合(％)つき・歳出列は割合なしだが decimal フィルタで吸収。単位は千円。
    id: "izumi-yosansho-r8",
    title: "令和8年度 和泉市当初予算（一般会計事項別明細書 総括）",
    publisher: "和泉市",
    url: null,
    // 款別＝事項別明細書、主な事業＝予算の概要（別ファイル）の分冊
    urls: [
      "https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
      "https://www.city.osaka-izumi.lg.jp/material/files/group/18/00_08_gaiyou.pdf",
    ],
    landingPage: "https://www.city.osaka-izumi.lg.jp/kakukano/soumubu/zaiseika/gyoumu/yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "和泉市（一般会計・団体コード272191）",
    license: "和泉市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      kanFile: "02_R8_ippan.pdf",
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // 歳入の款10 国有提供施設等所在市町村/助成交付金 が2行折返し（名前欄非空のまま下段へ続く型）。
      // 指定しないと「助成交付金」が款11 の頭に付き「助成交付金地方特例交付金」に化ける
      // （2026-07-16 にダッシュボード目視で発覚）。歳出は折返し無し。
      kanNameContinues: { revenue: [10] },
      // 主な事業＝概要 p.2-3 の重点事業（拡/新 ◎ 事業名 … 金額 千円）
      projectsFile: "00_08_gaiyou.pdf",
      projectPages: { from: 2, to: 3 },
      projectFormat: "marked-bullets",
    },
  },
  // ── budget 階層の拡大: 山梨県内の市（甲府に次ぐ規模）の当初予算 ──────────────
  // 「予算の概要」PDF に款別歳入歳出（前年度比つき）がテキスト層で載る。負号は △。単位=千円。
  {
    // 笛吹市（団体コード 192112）。予算の概要 R8。歳入 PDF p.7 / 歳出 p.8（印刷5/6と2ずれ）。
    // 見出し「歳入/歳出予算款別総括表」、合計「歳入合計/歳出合計」、款番号は半角、負号 △。
    id: "fuefuki-yosansho-r8",
    title: "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
    publisher: "笛吹市",
    url: null,
    urls: ["https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf"],
    landingPage: "https://www.city.fuefuki.yamanashi.jp/zaise/shisejoho/zaise/yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "笛吹市（一般会計・団体コード192112）",
    license: "笛吹市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "歳入予算款別総括表",
      expenditureHeading: "歳出予算款別総括表",
      // 重点事業（同一PDF p.10-19）: 部別に ■事業名【課】/ 予算額 千円 / 事業内容
      projectPages: { from: 10, to: 19 },
      projectFormat: "dept-bullets",
    },
  },
  {
    // 南アルプス市（団体コード 192082）。予算の概要 R8。款別は PDF p.7 の1枚に
    // 歳入21款＋歳出14款が縦積み（**同一ページ・samePage**）。見出し「歳入/歳出」、
    // 合計は歳入歳出とも「合計」、款番号は半角、負号 △。ファイル名はエンコード済み。
    id: "minami-alps-yosansho-r8",
    title: "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
    publisher: "南アルプス市",
    url: null,
    urls: ["https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf"],
    landingPage: "https://www.city.minami-alps.yamanashi.jp/docs/21143.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "南アルプス市（一般会計・団体コード192082）",
    license: "南アルプス市ウェブサイト掲載資料（二次利用は要許可。利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 7,
      samePage: true,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  },
  {
    // 大月市（団体コード 192066）。当初予算概要 R8（60p）。歳入 p.4「（歳入）」/ 歳出 p.5「（歳出）」。
    // 合計「合計」、款番号半角、負号 △。合計行の後にドーナツ凡例の数値ノイズあり（合計で打切り）。
    id: "otsuki-yosansho-r8",
    title: "令和8年度 大月市当初予算概要（款別歳入歳出）",
    publisher: "大月市",
    url: null,
    urls: ["https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf"],
    landingPage: "https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "大月市（一般会計・団体コード192066）",
    license: "大月市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      // p.4 冒頭のタイトル行「一般会計当初予算概要」を見出しとして読み飛ばす（款1に混ざるのを防ぐ）
      revenueHeading: "一般会計当初予算概要",
      expenditureHeading: "（歳出）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  },
  {
    // 都留市（団体コード 192040）。当初予算資料 R8（R8-0.pdf・37p）。歳入 p.4「（１）歳入」/
    // 歳出 p.5「（２）歳出」（目的別。p.6 は性質別なので見出しで区別）。合計「歳入合計/歳出合計」。
    // 款番号は 1-9 全角・10-22 半角（toHalfDigits で吸収）、負号 △。歳入合計の直後に「自主財源」行あり。
    id: "tsuru-yosansho-r8",
    title: "令和8年度 都留市当初予算（款別歳入歳出）",
    publisher: "都留市",
    url: null,
    urls: ["https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf"],
    landingPage: "https://www.city.tsuru.yamanashi.jp/soshiki/zaimu/zaisei_t/1/1657.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "都留市（一般会計・団体コード192040）",
    license: "都留市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      // p.4 冒頭のタイトル行「一般会計予算」を見出しとして読み飛ばす（款1に混ざるのを防ぐ）
      revenueHeading: "一般会計予算",
      expenditureHeading: "（２）歳出",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
    },
  },
  {
    // 甲州市（団体コード 192139）。当初予算 R8（R8tousyoyosan.pdf・4p）。歳入 p.2 / 歳出 p.3（目的別。
    // p.1 は会計別総括表、p.4 は性質別分析表なのでページ指定で回避）。合計「歳入合計/歳出合計」。
    // 款番号半角、負号 △。ヘッダが2行（当初予算/(A)）に折返す。
    id: "koshu-yosansho-r8",
    title: "令和8年度 甲州市当初予算（款別歳入歳出）",
    publisher: "甲州市",
    url: null,
    urls: ["https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf"],
    landingPage: "https://www.city.koshu.yamanashi.jp/docs/2021011200621/",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "甲州市（一般会計・団体コード192139）",
    license: "甲州市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 2,
      expenditurePage: 3,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
    },
  },
  {
    // 北杜市（団体コード 192091 — 192104 は甲斐市。2026-07-15 に取り違えを修正）。
    // 当初予算概要 R8（11p）。歳入 p.4「歳入合計」/ 歳出 p.5「歳出（目的別）」
    // （p.6 は性質別なので見出しで区別）。合計「歳入合計/歳出合計」。款番号半角、負号 △、款名に
    // 内部スペース（市 税）。表の上にドーナツ凡例（款番号なしなので款行にはならない）。
    id: "hokuto-yosansho-r8",
    title: "令和8年度 北杜市当初予算概要（款別歳入歳出）",
    publisher: "北杜市",
    url: null,
    urls: ["https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf"],
    landingPage: "https://www.city.hokuto.yamanashi.jp/docs/1664.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "北杜市（一般会計・団体コード192091）",
    license: "北杜市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "歳入合計",
      expenditureHeading: "歳出（目的別）",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
    },
  },
  {
    // 富士河口湖町（団体コード 194301）。当初予算の概要 R8（全48p・URL に %20 空白あり）。
    // 山梨県内で最初の「町」。町村は資料が薄いという予想に反し、市と同型の理想的な様式だった。
    // 歳入 p.3「歳入総括表」/ 歳出 p.4「歳出総括表」（別ページ）。合計ラベルは両側とも「合計」。
    // 款番号は半角、負号 △（空白入り `△ 3,556`）、単位=千円、前年度列は当初ベース。
    // 歳出は款11（災害復旧費）が欠番で 10→12（予備費）へ飛ぶ → validate は連番の warning が1件
    // 出るのが正常（error ではない）。列見出し「款名称」が単独行にあり KAN_HEADER_RE の拡張が要った。
    // ライセンスは「無断で複製・転用することはできません」明記 → permission-required（③配信のリスクを
    // /coverage で開示。沼津・南アルプスと同じ扱い。2026-07-15 ユーザー判断）。
    id: "fujikawaguchiko-yosansho-r8",
    title: "令和8年度 富士河口湖町当初予算の概要（款別歳入歳出）",
    publisher: "富士河口湖町",
    url: null,
    urls: ["https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf"],
    landingPage: "https://www.town.fujikawaguchiko.lg.jp/ka/info.php?if_id=7737",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "富士河口湖町（一般会計・団体コード194301）",
    license:
      "富士河口湖町公式ホームページに掲載している個々の情報（文章，写真，イラストなど）は，著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "歳入総括表",
      expenditureHeading: "歳出総括表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  },
  {
    // 富士吉田市（団体コード 192023）。予算の概要 R8（7412.pdf）。歳入 p.6 / 歳出 p.7（別ページ）。
    // 見出し「一般会計予算款別比較表」、合計「合計」、款番号は半角、負号 △。
    id: "fujiyoshida-yosansho-r8",
    title: "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業）",
    publisher: "富士吉田市",
    url: null,
    urls: ["https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf"],
    landingPage: "https://www.city.fujiyoshida.yamanashi.jp/page/1900.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "富士吉田市（一般会計・団体コード192023）",
    license: "富士吉田市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "款別比較表",
      expenditureHeading: "款別比較表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      // 「基本方針及び主要事業」p.21-38（部別・狭い3列テーブル）を座標ベースで抽出
      projectPages: { from: 21, to: 38 },
      projectFormat: "coord-table",
    },
  },
  {
    // 山梨県（都道府県・団体コード 190004）。「当初予算規模」PDF。p.2 歳入(15款)・
    // p.3 歳出(14款・警察費など都道府県特有款あり)、前年度当初比つき。見出し「一般会計歳入/歳出」、
    // 合計「合計」、款番号半角・款名は全角スペース分かち書き、負号 △。単位=千円。
    id: "yamanashi-yosansho-r8",
    title: "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
    publisher: "山梨県",
    url: null,
    // 款別＝「当初予算規模」、主な事業＝「当初予算の概要」主要事業（別ファイル）の分冊
    urls: [
      "https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
      "https://www.pref.yamanashi.jp/documents/6018/02_tousyonogaiyou_1.pdf",
    ],
    landingPage: "https://www.pref.yamanashi.jp/zaisei/43539671890.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "山梨県（一般会計・都道府県・団体コード190004）",
    license: "山梨県ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-yosansho",
    parserOptions: {
      kanFile: "03_tousyoyosannkibo_1.pdf",
      revenuePage: 2,
      expenditurePage: 3,
      revenueHeading: "一般会計歳入",
      expenditureHeading: "一般会計歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      // 歳入は款名が2行に折り返す（名前欄が非空のまま下段へ続く「第4の折返し型」）:
      // 款2 地方消費税/清算金・款4 地方特例/交付金・款6 交通安全対策/特別交付金・
      // 款7 分担金及び/負担金・款8 使用料及び/手数料。指定しないと下段が**次の款の頭に付き**、
      // 「清算金地方譲与税」「交付金地方交付税」等に化ける（金額と Σ は正しいまま素通りする。
      // 2026-07-16 にダッシュボード目視で発覚）。歳出は折返し無し。
      kanNameContinues: { revenue: [2, 4, 6, 7, 8] },
      // 主要事業: 概要 p.1-22 の ○（新/拡）事業名 …金額千円（中項目《…》で施策）。
      // p.1 は冒頭に総括表（単位ヘッダ・行末に千円無し→誤検出しない）＋主要事業の開始
      projectsFile: "02_tousyonogaiyou_1.pdf",
      projectPages: { from: 1, to: 22 },
      projectFormat: "pref-bullets",
    },
  },
  // ---- 都道府県エンティティ（2026-07-25 追加）--------------------------------
  // 山梨県・東京都に続く3県。**団体コードは総務省「全国地方公共団体コード」の原本 Excel
  // （soumu.go.jp/main_content/000925835.xlsx・シート「R6.1.1現在の団体」）から引いた**
  // （埼玉 110001 / 千葉 120006 / 神奈川 140007。同表で山梨 190004・東京 130001 が既存
  // エントリと一致することも確認＝出所の裏取り）。⚠ **県と県庁所在市を取り違えない** —
  // さいたま市 111007・千葉市 121002・横浜市 141003 は別団体で、id も `*-ken-` で分ける。
  //
  // 共通のクセ（個別コメントでは繰り返さない）:
  // - **都道府県固有の款**（歳入=県税・県債・地方消費税清算金 / 歳出=警察費・労働費）を持つ。
  //   市の目的別体系とは別物なので、decision 階層（総務省決算）の款名へ黙って寄せない。
  // - 総括表は歳出側に**財源内訳のサブヘッダ**（`一般財源` `国庫支出金 県債 その他`）が続く様式が多く、
  //   これが款1 に連結して `国庫支出金県債その他議会費` に化ける（神戸 §8h と同型）。
  //   **Σ は差0 のまま素通りする**ので `expenditureHeaderExtra` で外し、**款1 が `議会費` であることを
  //   画面で目視する**。⚠ `国庫支出金` は歳入では実在の款なので、必ず歳出側だけに効かせること。
  {
    // 神奈川県（都道府県・団体コード 140007）。「予算に関する説明書」（通称 青本・全414p）巻頭の
    // 「歳入歳出予算事項別明細書 1 総括」。**物理 p.7=(歳入) / p.8=(歳出)（印字とのオフセット +6）**。
    // 単位は表内の「千円」行で明記。歳入15款・歳出15款。
    //
    // ⚠ **「当初予算案の概要」PDF を使ってはいけない** — 款別表はあるが Identity-H で ToUnicode 無し
    //   （`pdffonts` の uni=no）で、**金額の数字だけが空トークンになって丸ごと消える**（東京都 §10p と同型）。
    // ⚠ 「予算議案」は款項別だが**前年度列が無い**。
    // ⚠ **URL の `/documents/<NNNNNN>/` は定例会ごとに変わる**（R8=132115・R7=118254・R6=107579）。
    //   年度を足すときは必ず f4872 索引から辿る。**外挿しない**。
    // 歳入 款2「利子割清算金」は R8 新設で前年度セルが `－`（皆増の語が無い）→ `dashAsZero` が要る。
    //   付けないと前年度に比較列を読み、前年度Σが 6,635,922千円 過大になる（Σ ゲートが捕まえる型）。
    id: "kanagawa-yosansho-r8",
    title: "令和8年度 神奈川県一般会計当初予算（歳入歳出予算事項別明細書 総括）",
    publisher: "神奈川県",
    url: null,
    urls: ["https://www.pref.kanagawa.jp/documents/132115/2026_001_aobon.pdf"],
    landingPage: "https://www.pref.kanagawa.jp/docs/v6g/cnt/f4872/0801teireikai.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "神奈川県（一般会計・都道府県・団体コード140007）",
    // ライセンス経緯（§9g に従い license 欄には適用条件だけを書く・2026-07-25 実測）:
    //   神奈川県オープンデータカタログ（CKAN）のデータセット「神奈川県議会議案（予算）、予算に
    //   関する説明書」（`license_title: クリエイティブ・コモンズ-表示(CC-BY)`）に本資料が登載されている。
    //   ⚠ **登載されているのは掲載ページ（f4872/index.html）の URL であって PDF の直リンクではない**
    //   （PDF は index → 0801teireikai → aobon.pdf の2階層下）。横浜 R3 の「同一 URL 登載」より
    //   一段弱い根拠だが、**データセット名が「予算に関する説明書」を名指ししている**ので対象は本資料と判断した。
    //   ⚠ 県サイトのサイトポリシー（「二次的利用を希望される場合は…事前にお問い合わせください」）を
    //   併記しない — `licenseClassOf` はその原文だけだと `unverified` を返すので、真正 CC BY を
    //   取りこぼす（§9g の逆方向の事故）。
    license:
      "本サイトのデータの著作権は、特別の記載がない限り、「クリエイティブ・コモンズ・ライセンス 表示 4.0 国際」のもとでライセンスされています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "(歳入)",
      expenditureHeading: "(歳出)",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
      dashAsZero: true,
      // ⚠ 歳入の款9 は実在の「国庫支出金」なので、歳出側だけに効かせる
      expenditureHeaderExtra: "国庫支出金",
    },
  },
  {
    // 埼玉県（都道府県・団体コード 110001）。「当初予算案の概要」PDF（59p）の計数表 **p.54 に
    // 歳入款別（左）と歳出款別（右）が横並び**（静岡 §9j と同型）。**款番号が1つも無い**（岡山 §9i
    // と同型）ので `kanNoless` が要る。単位は表内に「（単位 千円、％）」。フッタ印字とのズレ無し。
    //
    // ⚠ **id は `saitama-ken-`** — `saitama-yosansho-*` はさいたま市（111007）が使用中。
    // ⚠ **「議会提出予算説明書」を採らない** — 同じ数字だが R8 新設の `利子割清算金` の前年度欄が
    //   空欄で**皆増ラベルが無い**ため、当年度額を前年度と誤読して前年度Σが +5,726,000 ずれる（実測）。
    //   概要側は伸び率欄が `皆増` なので既存機構が prevAmount=0 と正しく読む。
    // ⚠ **crop 座標を年度で外挿しない** — R8/R7 は A4 横 841.92pt で cut 424 だが、
    //   **R6 はページが 780×540pt の別座標空間で cut 394**（R8 の値を当てると throw する）。
    id: "saitama-ken-yosangaiyou-r8",
    title: "令和8年度 埼玉県当初予算案の概要（計数表・款別歳入歳出）",
    publisher: "埼玉県",
    url: null,
    urls: ["https://www.pref.saitama.lg.jp/documents/274057/03-r8-02-siryou2.pdf"],
    landingPage: "https://www.pref.saitama.lg.jp/a0103/20251015reiwa8yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "埼玉県（一般会計・都道府県・団体コード110001）",
    // 「著作権・リンクについて」＞著作権について（/a0301/tyosaku-rinku.html・確認日 2026-07-25）。
    // ⚠ 埼玉県オープンデータポータルの PDL1.0 は**及ばない** — 規約が「当サイトで公開している情報」と
    //   自ら範囲を限り、かつカタログを organization=埼玉県 で実検索して**県自身の当初予算資料は0件**
    //   （ヒットするのは市町村統計）。§9g のとおり PDL1.0 を書くと open に誤分類される。
    // ⚠ **区分は `unverified` に落ちる**（実測）。原文が「許可・承諾を得ないまま…お断りします」で
    //   `無断` も `禁止` も使っておらず `licenseClassOf` のどの語彙にも当たらないため。実質は
    //   permission-required 相当だが、**意訳して要許可に寄せない**（§9g の逆方向の事故になる）。
    //   要許可に振るなら判定器側へ語彙を足すのが筋。
    license:
      "埼玉県ホームページに掲載される記事、写真、図画、その他データ類の著作権は、埼玉県、またはその情報提供者に帰属します。また、そのすべてについて、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、埼玉県の許可・承諾を得ないままほかのメディアへ転載することはお断りします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 54,
      expenditurePage: 54,
      revenueHeading: "歳入款別",
      expenditureHeading: "歳出款別",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      // 歳入の右端 417pt・歳出の左端 431.5pt ＝ ガター 14.5pt。閾値 424 は実測値（外挿しない）
      revenueCropX: { from: 0, to: 424 },
      expenditureCropX: { from: 424, to: 1000 },
    },
  },
  {
    // 千葉県（都道府県・団体コード 120006）。県議会議案の「予算に関する説明書（一般会計）」（255p）
    // 巻頭の「1 総括」。**物理 p.1=（歳入）/ p.2=（歳出）**（総括には印字ページ番号が無く、本体は
    // 物理=印字+2。総括はそのズレの外側なので素直に 1・2）。単位行に「千円」。
    //
    // ⚠ **press 側の資料を款別に使わない**（実測で全滅）: 「一般会計の状況」は表が**埋め込み画像**で
    //   テキスト層ゼロ、「歳出目的別」は**前年度列が6月現計**で当初でない、「議案書 第1表」は前年度列が無い。
    // ⚠ **歳入は14行あるが13款しか取れない** — 款12 繰越金が当年度・前年度とも**真の空欄**
    //   （`dashAsZero` が効く `－` ですらない）。Σ は一致するが**画面の款番号が 11→13 に飛ぶ**。
    //   原典が空欄であることを目視で確認済み。
    // ⚠ **R7 当初は骨格予算**（2025年3月の知事選前）。県自身の公表値「対前年度比3.0%増」は R7 の
    //   6月現計との比較で、本資料の前年当初比（+7.1%）とは基準が違う。`prevBasis` は原典どおり「当初」。
    // ⚠ 過年度の URL に規則性が無い（R7 `202502-05-y-1yosan` / R6 `…tousyo-ippan-y25` /
    //   R5 は `ippann` と n が1つ多い / R3 はアンダースコア）。**外挿しない**。
    id: "chiba-ken-yosansho-r8",
    title: "令和8年度 千葉県一般会計予算に関する説明書（歳入歳出予算事項別明細書・総括）",
    publisher: "千葉県",
    url: null,
    urls: ["https://www.pref.chiba.lg.jp/zaisei/gian/documents/202602-5-y-i-yosan.pdf"],
    landingPage: "https://www.pref.chiba.lg.jp/zaisei/gian/202602.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "千葉県（一般会計・都道府県・団体コード120006）",
    // 「リンク・著作権・プライバシー・免責事項等」（/homepage/about-site/link.html・確認日 2026-07-25）。
    // ⚠ 千葉県オープンデータサイトの PDL1.0 は**及ばない** — 規約が自ら範囲を限り、カタログを
    //   実検索しても県自身の当初予算・款別歳入歳出は0件（本 PDF の URL は非登載）。
    // リンクは「特段の制限を設けておりません」＝`noDeepLink` 不要。
    license:
      "「千葉県ホームページ」に掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、千葉県ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 2,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      // 合計ラベルは既定の「歳入合計 / 歳出合計」で当たる（原文は分かち書きの「歳 入 合 計」）
      expenditureHeaderExtra: "一般財源|国庫支出金",
    },
  },
  {
    // 大阪府（都道府県・団体コード 270008）。款別歳入歳出＋前年当初比較の**唯一の機械可読経路**は
    // 「財政のあらまし（6月号）」の分冊「当初予算の概要」PDF（9p）。
    // 物理 p.2 = 第2表 一般会計歳入予算内訳（14款）/ 物理 p.7 = 第6表 一般会計歳出予算（目的別）内訳（13款）。
    // **印字ページとのズレなし**。単位は各表の右上に「（単位：千円）」。
    //
    // ⚠ **予算書（r8_yosansyo_ippan.pdf・435p）を採らない** — Paper Capture の OCR で
    //   金額が桁ごと割れる（`2 1,1 590 ,00`）。款別総括も同様に壊れており決定的パース不可。
    // ⚠ 「当初予算案」ページの資料1／資料1-3(xlsx) は**歳入10区分・歳出10区分＋その他に丸めた
    //   再分類表**で款別ではない。
    // ⚠ 第6表「目的別内訳」は**大阪市の『目的別＝再分類表』とは違い款別そのもの**
    //   （予算書 第1表 歳出の13款と名前・順序・金額が全件一致することを偵察時に実測）。
    // ⚠ **あらまし6月号は当初予算の成立後（6月）に出る**。年度当初（2〜3月）時点では款別が無い。
    // ⚠ `documents/<id>/` の id は年度から外挿できない（13263・13265・27549・86551・133484…）。
    id: "osakafu-aramashi-yosan-r8",
    title: "令和8年度 大阪府当初予算の概要（財政のあらまし 令和8年6月号・一般会計歳入歳出款別）",
    publisher: "大阪府",
    url: null,
    urls: ["https://www.pref.osaka.lg.jp/documents/133484/08-06_03_yosan.pdf"],
    landingPage: "https://www.pref.osaka.lg.jp/o050010/zaisei/zaiara/8_6.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "大阪府（一般会計・都道府県・団体コード270008）",
    // 「このサイトのご利用について」＞著作権について（/o070050/koho/information/use.html・確認日 2026-07-25）。
    // ⚠ 府オープンデータカタログ（BODIK ODCS 270008・CC BY 4.0）は**及ばない** — 規約が「当サイトの
    //   内容」と自ら範囲を限り、全77データセットを実検索しても府自身の当初予算・款別は非登載
    //   （財政系は「府内市町村の財政状況」等3件のみ）。§9g のとおり CC BY を書くと open に誤分類される。
    license:
      "大阪府ホームページに掲載されている写真・イラスト・音声・動画及び記事は、著作権の対象となっており、著作権法により保護されています。「私的使用」や「引用」など、著作権法上認められている適切な方法で利用する場合を除き、無断使用・無断転載することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 2,
      expenditurePage: 7,
      revenueHeading: "一般会計歳入予算内訳",
      expenditureHeading: "一般会計歳出予算（目的別）内訳",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      // R8 歳入「利子割清算金」の前年度セルが `－`（皆増）
      dashAsZero: true,
      // ⚠ **この指定は危険と隣り合わせ**。左端の縦書き「自主財源」「依存財源」が款名の頭に1文字だけ
      //    混入するため剥がしているが、**集合に `財` が含まれ、款名「財産収入」の頭とぶつかる**。
      //    R8 は財産収入の行頭に縦書きの `源` が付いていたので結果的に正しく剥がれているだけで、
      //    **縦書きラベルが載らない行になった年度では「産収入」に化け、Σ は4系統とも差0のまま素通りする**。
      //    年度を足すときは必ず款名を全件目視すること（§9 の「Σ が守らない領域」）。
      kanNamePrefixStrip: "自主財源依存",
      // 自主財源計／依存財源計の小計行（字下げ12）を款から外す。款は 0〜4・合計は 8
      kanIndentMax: 8,
    },
  },
  {
    // 福岡県（都道府県・団体コード 400009）。款別歳入歳出＋前年当初比較は財政課
    // 「当初予算の編成概要」PDF（72p）の **物理 p.6 = ２．一般会計歳入予算額調（15款）/
    // 物理 p.7 = ３．一般会計歳出予算額調（14款）**。印字は -4-/-5- で**オフセット +2**。
    // 単位は各表の右上に「（単位：千円）」。列は [当初(Ａ) 構成比 当初(Ｂ) 構成比 (Ａ)-(Ｂ) (A)/(B)]
    // ＝標準順で、**前年度列が「当初」であることを原典の列見出しが明示している**。
    //
    // ⚠ **id は `fukuoka-ken-`** — `fukuoka-yosansho-*` は福岡市（401307）が使用中。
    //    県 400009 ≠ 福岡市 401307 ≠ 北九州市 401005。
    // ⚠ **「予算に関する説明書」（281298.pdf・482p）を使ってはいけない** — 巻頭 p.13/p.14 に総括表は
    //    あるが**スキャン＋OCR**で `pdftotext -layout` だと金額が桁ごと縦に割れる（大阪 §8e と同型）。
    //    実測で throw する。「予算議案」（281297.pdf）第1表は款項別だが**前年度列が無い**。
    // ⚠ **p.8 は特別会計予算額調**。歳入 p.6・歳出 p.7 と隣接するのでページを1つずらすと
    //    特別会計を読みかける（見出し指定があるので実際は throw するが、見出しも一緒にずらさないこと）。
    // ⚠ **attachment id は連番でも規則的でもない**（H30=40658 が H29=42555 より小さい）。
    //    年度を足すときは必ず索引ページ（landingPage）から辿る。**外挿しない**。
    // ⚠ **R8 歳出の前年度列は R7 から5款が組み替えられている**（総務費 +3,674,263 / 環境費 +404,153 /
    //    生活労働費 −4,048,078 / 商工費 −31,338 / 県土整備費 +1,000 ＝ 和はちょうど 0 で厳密に相殺）。
    //    §9l の「款は動くが総額は一致」の正常系で年度間ゲートは通るが、**画面の款別前年比は
    //    R7 の公表値と一致しない**（原典どおり）。
    // 福岡県は**民生費・衛生費・土木費・労働費を持たない独自の目的別体系**（保健費・生活労働費・
    // 県土整備費に統合）。大阪府と同じく decision 階層（総務省決算）の款名とは突合できない。
    id: "fukuoka-ken-yosangaiyou-r8",
    title: "令和8年度 福岡県当初予算の編成概要（一般会計歳入・歳出予算額調）",
    publisher: "福岡県",
    url: null,
    urls: ["https://www.pref.fukuoka.lg.jp/uploaded/attachment/278132.pdf"],
    landingPage: "https://www.pref.fukuoka.lg.jp/contents/hennseigaiyou.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "福岡県（一般会計・都道府県・団体コード400009）",
    // 「免責事項・著作権・利用環境・リンクについて」（/contents/this-site-mensekietc.html・確認日 2026-07-25）。
    // ⚠ 福岡県オープンデータカタログ（BODIK ODCS・org 400009・CC BY 表示2.1日本）は**及ばない** —
    //   規約が「本サイトにおける」と自ら範囲を限り、カタログ983件を実検索しても本資料は非登載
    //   （`歳入` 0件・`歳出` 0件・`予算` 5件はすべて「県土整備行政の概要」）。§9g のとおり
    //   CC BY を書くと open に誤分類される。
    // ⚠ **区分は `unverified` に落ちる**（埼玉県と同型）。原文が制限的な語彙（`無断`・`禁止` 等）を
    //   1つも使っていないため。**意訳して要許可へ寄せない**。
    // リンクは「リンクは自由に設定していただいて結構です」＝`noDeepLink` 不要。
    license:
      "「福岡県庁ホームページ」に掲載されている情報（文書、写真、イラストなど）は原則として福岡県に帰属します。また、一部の画像等の著作権は原著作者が所有しています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "一般会計歳入予算額調",
      expenditureHeading: "一般会計歳出予算額調",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      // ⚠ **必須**。款番号が `１．` `10．` と全角ピリオド付きで、lead 正規表現が数字だけを食うため
      //    款名が `．県税` になる。さらに款名が3行に折返す歳入 款6（交通安全対策／特別交付金）は
      //    namePart が `．` で非空になるため下段待ちに入らず、**款名が `交通安全対策．` に化けたまま
      //    Σ は4系統とも差0 で素通りする**（実測）＝§9 の「Σ が守らない領域」。
      //    剥がすのは全角ピリオド1字だけなので、大阪の `"自主財源依存"` と違い款名の漢字とはぶつからない
      //    （29款すべて目視確認済み）。
      kanNamePrefixStrip: "．",
    },
  },
  {
    // 広島県（都道府県・団体コード 340006）。⚠ 広島市 341002（`hiroshima-yosansho-r8`）と
    // 取り違えないので id を `hiroshimaken-` で分ける。
    //
    // 款別歳入歳出＋前年当初比較は議会提出「当初予算説明書」（408p・born-digital）巻頭の
    // 「歳入歳出予算事項別明細書 1 総括」。**物理 p.3 = 歳入（16款）/ p.4 = 歳出（14款）**、
    // 印字は「― 1 ―」「― 2 ―」で**オフセット +2**。単位は各ページ右上に「(単位：千円)」。
    //
    // ⚠ **見出しの括弧が歳入と歳出で違う**（歳入＝全角 `（歳入）` / 歳出＝**半角** `(歳出)`）。
    //    取り違えると「見出しがありません」で throw する（実測）。
    // ⚠ **同時公開の「議案書」は採らない** — 第1表は款項別だが**前年度列が無い**。
    // ⚠ **「施策及び事業案の概要」PDF は採らない** — CID フォントの ToUnicode 欠落（uni=no）で
    //    全文が化ける（`令和８年度` → `௧࿴㸶ᖺᗘ`）。神奈川の「概要」と同型。
    // ⚠ ファイル名に規則性ゼロ（`1113482_9615229_misc.pdf`）。年度追加は必ず年度インデックス
    //    （list1256-4800.html）の実リンクから辿る。**外挿しない**。
    //
    // 財源内訳サブヘッダ（神奈川・千葉で踏んだ罠）は**広島では起きない** — ヘッダ4段の直後に
    // 空行が入り、パーサの reset() が断片を破棄するため。`expenditureHeaderExtra` を足しても
    // 出力は完全に同一（差分ゼロを実測）＝**不要**。なお原典の表記は `国支出金`（`国庫支出金` ではない）。
    // R8 で利子割清算金が新設されたが前年度セルは空欄でなく `0` を明示印字するので
    // `dashAsZero` も皆増機構も不要（Σ前年度は差0）。
    id: "hiroshimaken-yosansho-r8",
    title: "令和8年度 広島県当初予算説明書（一般会計歳入歳出予算事項別明細書・総括）",
    publisher: "広島県",
    url: null,
    urls: ["https://www.pref.hiroshima.lg.jp/uploaded/life/1113482_9615229_misc.pdf"],
    landingPage: "https://www.pref.hiroshima.lg.jp/site/zaiseiyosann/r08tosyo-giansyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "広島県（一般会計・都道府県・団体コード340006）",
    // ⚠ **発行元がトップページ以外へのリンクに相談を求めている**ので `noDeepLink` を立てた
    //   （2026-07-25・人が原文を読んで判断。`pipeline/types.ts` の noDeepLink の注意書きに従う）。
    //   原文（/soshiki/19/1173052529569.html・掲載日 2023年11月9日・確認日 2026-07-25）:
    //     「【リンクを貼る際のご注意点】リンクを貼る箇所については、原則、トップページとして
    //      ください。（トップページ以外にリンクを貼る場合は、リンクしたいページの下部
    //      お問合わせ先（担当課）と相談してください。）」
    //   新宿の「（画像やＰＤＦ等）にリンクを設定することはおやめください」ほど名指しではないが、
    //   港区・北区の「原則トップページ」だけの型より一段強く、**能動的に条件を課している**。
    //   permission-required なので既定では PDF 直リンクへ振り替わる ＝ 発行元が相談を求める行為を
    //   こちらから行うことになるため、landingPage へ向ける。
    noDeepLink: true,
    // 「広島県のホームページについて」６ 著作権について（同ページ・確認日 2026-07-25）。
    // ⚠ 広島県オープンデータ規約の CC BY 2.1 日本は**及ばない** — 規約が「当サイトにおいて公開する
    //   データ」と自ら範囲を限り、カタログを実検索しても `予算` 3件・`決算` 9件はすべて三原市、
    //   `予算説明書` 0件で、**県自身の当初予算は非登載**。§9g のとおり書くと open に誤分類される。
    license:
      "広島県ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象になっています。また、広島県ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法によって保護されています。広島県ホームページの情報を許可なく複製・無断使用・転載・販売・改変・印刷・配布する行為等は、私的利用の範囲や引用など、著作権法上認められる場合を除き、禁止します。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "（歳入）",
      expenditureHeading: "(歳出)", // ⚠ 半角括弧（原典どおり・全角にすると throw）
      // 合計ラベルは既定の「歳入合計 / 歳出合計」で当たる（原文は分かち書き `歳 入 合 計`）
    },
  },
  {
    // 北海道（都道府県・団体コード 010006。⚠ 札幌市 011002 と取り違えない）。
    // 「令和8年度 予算の概要」の分冊「11 参考資料」**物理 p.2** の【歳入歳出款別内訳】
    // （歳入15款・歳出15款・**百万円**）。印字ページは 48（概要全体の通し番号）＝ズレ +46。
    //
    // ⚠ **北海道は「予算に関する説明書／歳入歳出予算事項別明細書」をウェブ公開していない**。
    //    議案（予算の要領）の「第1表 歳入歳出予算」は款項別だが**前年度列が無く**、しかも
    //    金額がセル幅で改行して割れる（`714,862,` / `942`＝愛知と同型）ので使えない。
    // ⚠ 千円表の「一般会計款別計上額」（分冊01 p.5）は**当年度のみで前年度列が無い**。
    //
    // **この資料は「静かに壊れる」経路が2つあり、どちらも Σ が原理的に守れない**（実測）:
    //   1. **歳入と歳出が同一ページに左右横並び**。CropX を外すと `-layout` が2表を1行に融合し、
    //      **歳出側に歳入15款がそのまま入る**（議会費が消えて道税が並ぶ）。`〔歳出〕` の見出しは
    //      ページ上にあるので **throw しない**。静岡 §9j は「歳出0件で throw」だったが、
    //      **北海道は歳入合計＝歳出合計なので Σ ゲートが原理的に検出できない**。
    //   2. **列順が [前年度A, 当年度B, 増減]**（足立 §9l 型）。`prevColumnFirst` を外すと
    //      **両年度が丸ごと入れ替わったまま Σ が4系統とも差0 で通る**（合計行も同じ順で反転するため）。
    //   → **どちらも網は derive の年度間クロスチェーン（§9l）だけ**。収録後に款名と前年比を目視すること。
    //
    // ⚠ **PDF 本文に「北海道」の文字列が1回も出ない**（`道税`・`道債` のみ）。取り違え検出は
    //    ホスト名＋**この PDF に印字されている総額 3,168,109（百万円）**＋款名（道税・警察費）で行う。
    //    （千円精度の 3,168,109,306 は同じ概要セットの分冊01 の千円表にある値で、**この PDF には無い**）
    // ⚠ 歳出の A列（R7当初）は **R8 の組織体系へ組み替えた額**（原典に注記が無い）。R7 議案第1表と
    //    突合すると 総務費 +7,160 / 建設費 −7,159 など6款が動くが**総額 3,050,466 は一致**する
    //    ＝§9l の正常系。歳入の A列は R7 議案と15款すべて一致。
    // ⚠ **R7 は収録不可**（概要 PDF がスキャン画像でテキスト層ゼロ）。**R6 は A列が「２定現計」＝
    //    補正後**なので `prevBasis: "補正後"` が要る。**年度で健全性が飛ぶので外挿しない**。
    id: "hokkaido-yosan-gaiyou-r8",
    title: "令和8年度 北海道予算の概要 参考資料（歳入歳出款別内訳）",
    publisher: "北海道",
    url: null,
    urls: [
      "https://www.pref.hokkaido.lg.jp/fs/1/2/9/5/9/9/3/7/_/11%20%E2%97%8B%E5%8F%82%E8%80%83%E8%B3%87%E6%96%99.pdf",
    ],
    landingPage: "https://www.pref.hokkaido.lg.jp/sm/zsi/239242.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "北海道（一般会計・都道府県・団体コード010006）",
    // ライセンス経緯（§9g に従い license 欄には適用条件だけを書く・2026-07-25 実測）:
    //   **道サイト全体が CC-BY**（サイトポリシー「著作権について」）。神奈川より根拠が一段強い:
    //   ①**掲載ページ /sm/zsi/239242.html の HTML に CC-BY バッジが実在する**
    //     （`<div class="cc-license"><a href="/site-info/sitepolicy.html#chapter-4">`）
    //   ②オープンデータ利用規約が「北海道のホームページの場合は、**「CC-BY」表示のあるページを
    //     対象とし**」と明記し、**ポータル登載を条件にしていない**（千葉・大阪型の自己限定ではない）
    //   ⚠ サイトポリシーの「禁止事項」節を license 欄に混ぜないこと（§9g の逆方向事故）。
    //     引用は「著作権について」節に限る。
    license:
      "本サイトに掲載されている文章、写真、イラスト、画像等の著作権は、北海道またはコンテンツ提供者に帰属しています。北海道のホームページは原則、全てのページがオープンデータです。特に記載の無い限り、すべてのページをCreative Commonsの表示CC-BYとします。ただし、写真、イラスト、画像等については第三者（道以外の者をいう。以下同じ。）の著作権又はその他の権利（肖像像権、パブリシティ権等）が含まれている場合があります。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 2,
      expenditurePage: 2,
      revenueHeading: "〔歳入〕",
      expenditureHeading: "〔歳出〕",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      kanNoless: true,
      // ⚠ 下記2つは**外すと Σ が差0 のまま静かに壊れる**（上記コメント参照）
      prevColumnFirst: true,
      revenueCropX: { from: 0, to: 395 },
      expenditureCropX: { from: 396, to: 780 },
      unit: "millionYen",
    },
  },
  {
    // 宮城県（都道府県・団体コード 040002。⚠ 仙台市 041009 と取り違えないので id を `miyagiken-` に）。
    // 議会提出「予算に関する説明書（一般会計、特別会計分）」（392p・Excel 出力の born-digital）巻頭の
    // 「一般会計歳入歳出予算事項別明細書 1 総括」。**物理 p.7 = 歳入（15款）/ p.8 = 歳出（14款）**、
    // 印字も「－ 7 －」「－ 8 －」で**オフセット 0**。単位は款ヘッダ直下に「千円」。
    //
    // ⚠ **合計ラベルは既定（歳入合計／歳出合計）のまま使うこと**。この資料は歳入合計＝歳出合計
    //    （1,095,923,909）なので、**Σ はページを取り違えても差0 で通る**。網は2枚あり、
    //    ①見出し（`（歳入）`/`（歳出）`）②合計ラベルの違い、の順で効く。実測で歳出ページを p.7 に
    //    取り違えると**先に見出しゲートが「『（歳出）』の見出しがありません」で throw する**（＝①が第一の網）。
    //    合計ラベルは第二の網なので、緩めると網が1枚減る。**両方を「合計」にしない**。
    // ⚠ **年度ごとに物理ページ・ファイル名・documents ID が全部変わる**（R8=p.7/8・doc 63498 /
    //    R7=p.9/10・doc 55938 / R6=p.9/10・doc 50705）。**外挿禁止**、必ず年度ページの実リンクから辿る。
    // ⚠ **「計数資料」PDF を掴まない** — 款別内訳がありそうな名前だが**全ページ貼り込み画像**で
    //    テキスト層ゼロ（実測）。**R5 以前は説明書自体がウェブに無い**（R4 は別型の款別一覧表）。
    //
    // 財源内訳サブヘッダ（神奈川・千葉で踏んだ罠）は**宮城では起きない** — 「国庫支出金 地方債
    // その他」の行と款1 の間に単位行と空行が入り断片が破棄される。`expenditureHeaderExtra` を
    // 足しても出力はバイト単位で完全同一（実測）＝**不要**。
    // 款体系は標準的な目的別（民生費・衛生費・土木費すべて有り）で、大阪・福岡・静岡・北海道のような
    // 独自体系ではない。都道府県固有は 歳入=県税・県債、歳出=警察費。
    id: "miyagiken-yosansho-r8",
    title: "令和8年度 宮城県予算に関する説明書（一般会計歳入歳出予算事項別明細書・総括）",
    publisher: "宮城県",
    url: null,
    urls: ["https://www.pref.miyagi.jp/documents/63498/aohon_ippannkaikei.pdf"],
    landingPage: "https://www.pref.miyagi.jp/soshiki/zaisei/zei-r08-yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "宮城県（一般会計・都道府県・団体コード040002）",
    // ⚠ **発行元がトップページ以外へのリンクに問い合わせを求めている**ので `noDeepLink` を立てた
    //   （2026-07-25・人が原文を読んで判断。広島県と同型と整理した）。原文
    //   （/soshiki/kohou/site-riyou.html・確認日 2026-07-25）:
    //     「宮城県のトップページへのリンクは原則フリーです。…
    //      **トップページ以外のページへのリンクを希望される場合は、それぞれ担当課へお問い合わせ願います。**」
    noDeepLink: true,
    // 「このサイトの御利用について」＞著作権について（同ページ・確認日 2026-07-25）。
    // ⚠ 宮城県オープンデータの CC BY 4.0 は**及ばない** — 規約が「オープンデータサイト以下の
    //   ディレクトリにおいて公開する」と自ら範囲を限り、カタログ187件を実検索しても
    //   **当初予算は非登載**（財政課のものは決算・財政状況の2件だけ）。掲載ページ HTML に
    //   CC-BY バッジも無い（北海道型の別根拠も潰した・実測）。
    license:
      "「宮城県ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「宮城県ホームページ」全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      // 合計ラベルは既定のまま（上のコメント参照 — 緩めると取り違えを検出できなくなる）
    },
  },
  {
    // 新潟県（都道府県・団体コード 150002）。⚠ **新潟市 151009 と取り違えない** —
    //   `kofu-yosansho` の Options.revenuePages にある「見開き2ページ型（新潟 R8）」のコメントは
    //   **新潟市**の話で、県はまったく別様式。
    // 財政課「令和8年度当初予算計数資料」（17p）の **物理 p.9 =「ア 歳入款別一覧表」/
    // 物理 p.10 =「イ 歳出款別一覧表」**。印字は −8−/−9− で**物理 = 印字 +1**。
    // 単位は表の右肩に「（単位：千円、％）」。
    //
    // ⚠ **列順が [前年度(R7当初), 当年度(R8当初), …] の逆順**（北海道と同型）。`prevColumnFirst` を
    //    外すと **Σ が4系統すべて差0 のまま両年度が丸ごと入れ替わり、款名も無傷**（実測）＝
    //    **検証ゲートが原理的に検出できない**。網は年度間クロスチェーンだけ。収録後は
    //    「県債 R7 189,561,000 → R8 70,789,000」「県債費 280,471,455 → 164,076,879」の向きを画面で確認する。
    // ⚠ 款番号が原典に一切無い（`kanNoless`）。外すと「款行が1件も抽出できませんでした」で throw
    //    （＝こちらは大声で落ちる）。
    // ⚠ 整数列は [前年度, 当年度, 特定財源, 一般財源] の4つある（構成比・前年比は小数で除かれる）。
    //    逆順指定さえ合っていれば ints[0]/ints[1] で正しく取れる。
    // ⚠ 歳出は**県独自の目的別体系** — 民生費・衛生費・商工費・公債費が無く、
    //    **福祉保健費／環境費／産業費／県債費**に置き換わる。標準款へ黙って寄せない。
    // ⚠ 代替候補は使えない（実測で棄却）: 「当初予算の概要」p.45 の款別は**円グラフ・億円丸め・
    //    前年度列なし**／「簡略版」は款別表なし／**県議会サイトに説明書・事項別明細書の掲載は無い**。
    // ⚠ 過年度の attachment ID に規則は無い（R8=486523 / R7=441165 / R6=398427 / R5=354957 …）。
    //    **R7 は款名 `繰入金※` が汚れる**（注記マーカーが款名セル内にインライン。Σ は差0 で通るので目視でしか気づけない）。
    id: "niigataken-yosan-keisu-r8",
    title: "令和8年度 新潟県当初予算計数資料（歳入・歳出款別一覧表）",
    publisher: "新潟県",
    url: null,
    urls: ["https://www.pref.niigata.lg.jp/uploaded/attachment/486523.pdf"],
    landingPage: "https://www.pref.niigata.lg.jp/sec/zaisei/r8tousho.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "新潟県（一般会計・都道府県・団体コード150002）",
    // ⚠ **発行元が「トップページとリンクフリーマーク付きページ以外は事前に電子メールで連絡」を
    //   求めている**ので `noDeepLink` を立てた（2026-07-25・人が原文を読んで判断）。原文
    //   （/site/userguide/chosakuken.html ＞ リンクについて・確認日 2026-07-25）:
    //     「新潟県ホームへのリンクは、自由に設定していただいて結構です。…また、左のマークが
    //      右下についているページについても自由に…。**その他のページにリンクを希望される場合は、
    //      事前に各ページのお問い合わせ先に、電子メールで…ご連絡ください。**」
    //   広島・宮城の「相談／問い合わせ」型より一段強く**事前連絡という能動的な条件**を課している。
    //   ⚠ ただし**掲載ページ r8tousho.html にもリンクフリーマークは無い**（実測）ので、
    //   landingPage へ向けても原文の要求を完全には満たさない。原文どおりここに残す。
    noDeepLink: true,
    // 「著作権・リンク等について」＞著作権について（同ページ・更新 2019-08-26・確認日 2026-07-25）。
    // ⚠ 県オープンデータ利用規約（CC BY 4.0）は**及ばない** — 規約 §1 が「次のバナー表示がある
    //   ページまたはオープンデータである旨の記載がされているページにおいてのみ適用されます」と
    //   自ら範囲を限り、掲載ページに**バナーも記載も無い**（実測）。さらに県 OD 一覧 971件を
    //   実検索して**所属＝財政課 0件・URL に `/sec/zaisei/` 0件**。
    license:
      "新潟県ホームページ(https://www.pref.niigata.lg.jp/，又は新潟県の各組織が左記以外のドメインで運営するサイト)(以下「当県サイト」という。）に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として新潟県に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当県サイトについては、新潟県に編集著作権があります。当県サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、新潟県に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。ただし、当県サイトの各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 9,
      expenditurePage: 10,
      revenueHeading: "歳入款別一覧表",
      expenditureHeading: "歳出款別一覧表",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
      kanNoless: true, // 外すと throw（大声）
      // ⚠ **外すと Σ が差0 のまま両年度が入れ替わる**（上記コメント参照）
      prevColumnFirst: true,
    },
  },
  {
    // 熊本県（都道府県・団体コード 430005。⚠ 熊本市 431001（`kumamoto-yosansho-r8`）と別物なので
    // id を `kumamoto-ken-` で分ける）。県議会提出「予算に関する説明書（当初予算関係）」（636p）
    // 巻頭の「歳入歳出予算事項別明細書 1 総括」。**物理 p.4 に歳入（左・15款）と歳出（右・14款）が
    // 横並び**（北海道と同型）。印字は「1」で**ズレ +3**。単位は列頭に「千円」。
    //
    // ⚠ **総括ページ（p.4）だけが機械可読**。p.5 以降の款項目明細は **JBIG2 スキャン画像**なので
    //    「項以下の内訳」には使えない。
    // ⚠ **原典は A4 縦 595×841 の rot 90**（実測）。`CropX` の座標は**回転後の空間（0〜841）**。
    // ⚠ **crop の右端は 585**。`pdftotext -bbox` の実測で、**「比較」列の右端＝584.65**・
    //    **「国支出金」列の左端＝589.39**（ヘッダ「国支出金」は 590.11 開始）＝**取れる幅は 4.7pt しかない**。
    //    **600 にすると款1 が `国議会費` に化けたまま Σ が4系統とも差0 で通る**（財源内訳ヘッダの「国」が1文字混入）。
    //    validate の `KANNAME_JUNK_RE` にも部首チェックにも当たらないので**唯一の網は款名の目視**。
    //    保険として `expenditureHeaderExtra` も入れてある（585 では no-op、600 でも款名が守られることを実測）。
    //    ⚠ 841（右半分ぜんぶ）にすると `一般財源国支出金地方債その他議会費` になるが、これは
    //    `一般財源` が JUNK に当たって**大声で落ちる**。危険なのは 600 付近の中途半端なズレだけ。
    // ⚠ **年度ごとに crop を実測し直すこと**（R7 は同じ値で通ったが幅が年度で微妙に違う）。
    //
    // 選ばなかった候補: 財政課の「歳入予算・歳出予算」PDF（199KB・3p）は款名もクリーンで軽いが
    //   **単位が百万円で原典が四捨五入**しており Σ が 1,000千円ずれて validate が止まる。
    //   「財政のあらまし」付表は**アウトライン化**（堺 §8m 型）で回収不能。
    id: "kumamoto-ken-setsumeisho-r8",
    title: "令和8年度 熊本県予算に関する説明書（歳入歳出予算事項別明細書・総括）",
    publisher: "熊本県",
    url: null,
    urls: ["https://www.pref.kumamoto.jp/uploaded/attachment/302703.pdf"],
    landingPage: "https://www.pref.kumamoto.jp/site/gikai/257747.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "熊本県（一般会計・都道府県・団体コード430005）",
    // 「免責事項・リンク等」（/soshiki/1/56078.html・確認日 2026-07-25）の著作権の項。
    // ⚠ 熊本県オープンデータ規約（CC BY 4.0）は**及ばない** — 規約が「熊本県オープンデータサイトで
    //   公開している情報」と自ら範囲を限り、BODIK カタログ425件を実検索しても本資料は非登載
    //   （`予算` の1件は R4 の「当初予算のポイント」等で款別表を持たず、しかも登載実体は BODIK 側に
    //   アップロードされたファイル）。掲載ページ HTML に CC バッジも無い。
    // リンク方針の原文（同ページ）: 「当サイトへのリンクは原則フリーです。**事前の連絡は必要ありませんが、
    //   リンクを行った場合は、熊本県広報グループ…まで、リンク元のURLと連絡先…をご連絡ください。**」
    //   「なお、リンクの設定をされる際は、**当サイトが他のホームページ中に組み込まれるようなリンクの
    //   設定はせず、必ず新しいウインドウが開かれるような設定でリンクしてください。**」
    //   → **トップページ限定の条項が無く、条件はフレーム埋め込みの禁止＋新規ウインドウ**であって
    //   ディープリンクの制限ではない。`openViewer` は `window.open(href, "_blank", "noopener,noreferrer")`
    //   で発行元を開くので条件を満たす → **`noDeepLink` は不要**（広島・宮城・新潟の「トップページ以外は
    //   要相談」型と別）。事後連絡は義務ではなく依頼（事前連絡は不要と明記）なので収録可否に影響しない。
    license:
      "当サイトに掲載されている情報（写真・イラスト・音声・動画及び記事など）は、熊本県または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められている適切な方法で利用する場合を除き、無断で複製・変更・使用等をすることはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 4,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
      revenueCropX: { from: 0, to: 320 },
      expenditureCropX: { from: 320, to: 585 },
      // 境界ドリフトの保険（上記コメント参照）
      expenditureHeaderExtra: "^国$|特定財源|一般財源|財源内訳|国支出金|地方債",
    },
  },
  {
    // 京都府（都道府県・団体コード 260002。⚠ 京都市 261009（`kyoto-yosansho-*`）と別物）。
    // 「当初予算概要」の分冊2ファイル（歳入＝1ページ・歳出＝1ページの単票）。
    //
    // ⚠ **この資料は数値列が3ブロック並ぶ**（`amountIntIndex` を導入した理由）:
    //     款 ｜ 7年度2月 ｜ **8年度当初** ｜ 合計 ｜ 構成比 ｜ 6年度2月 ｜ **7年度当初** ｜ 合計 ｜ …
    //    当年度＝整数トークンの **1番目**・前年度＝**4番目**。指定せずに当てると
    //    **Σ が4系統とも差0・款名も全件クリーンなまま「当年度＝令和7年度2月補正額（148億円）／
    //    前年度＝令和8年度当初額（1兆433億円）」**という完全に別物を収録する（実測）。
    //    ⚠ `CropX` では救えない — 必要な列が x 方向に離れた3つの帯
    //    （款名 97–204 / 当年度 290–326 / 前年度 568–604）で、`pdftotext -x/-W` は単一連続区間のみ。
    // ⚠ **「予算に関する説明書 総括」は使えない** — R6・R7・R8 とも**毎年スキャン画像**
    //    （CCITT G4）でテキスト層ゼロ。京都府では事項別明細書ルートが存在しない。
    // ⚠ 「議案 第1表」は款項別だが**前年度列が無い**。「財政状況」の歳入表は2年2列で理想的だが
    //    **府税が `法人２税／上記以外／計` の3行に割れて款行が成立しない**（Σ +301,827百万円）。
    // ⚠ **R8 は骨格予算**（2026年4月の知事選前。原典 p.1 に「骨格的な予算として編成」と明記）。
    //    千葉 R7 と同型で6月補正で肉付けされる。`prevBasis` は原典どおり「当初」。
    // ⚠ `prevNote` を空で固定してある — ページ内の `※7年度2月は、（その1）予算額` は**2月補正列**に
    //    ついての注記で前年度当初列とは無関係だが、`PREV_NOTE_RE` に当たって前年比較画面へ
    //    「前年度額の基準」として出てしまう（実測）。
    // ⚠ 歳入の `（法人２税）` は全角2が半角化されて `法人2税` になり `2` が金額として食われる
    //    （款名 `法人`・金額 2百万円）→ `revenueHeaderExtra` で内訳行を落とす。
    //    歳出の `(消費税交付金等除く)` も諸支出金・合計の両方に再掲されるので同様に落とす。
    // ⚠ PDF 本文に「京都府」の文字列が0回（`府税`・`府債` のみ）。取り違え検出はホスト名＋
    //    総額 1,043,260百万円＋款名で行う。
    // 款体系は標準的な目的別（大阪・福岡・静岡・北海道のような独自体系ではない）。
    id: "kyotofu-tosho-gaiyou-r8",
    title: "令和8年度 京都府当初予算概要（一般会計 歳入内訳・歳出目的別内訳）",
    publisher: "京都府",
    url: null,
    urls: [
      "https://www.pref.kyoto.jp/yosan/documents/r8_p1_sainyu.pdf",
      "https://www.pref.kyoto.jp/yosan/documents/r8_p5_mokuteki.pdf",
    ],
    landingPage: "https://www.pref.kyoto.jp/yosan/08tousho.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "京都府（一般会計・都道府県・団体コード260002）",
    // 「著作権・リンク等について」（/copyright.html・確認日 2026-07-25）。
    // ⚠ KYOTO DATASTORE（BODIK・府の509データセット）の CC BY は**及ばない** — `予算` で
    //   実検索して **0件**（`決算` 21件・`財政` 26件はいずれも統計書と市町村の財政状況資料集）。
    //   掲載ページ HTML に CC バッジも無い。
    // リンク方針は「トップページ以外の各ページへも**ご自由にリンクを設定していただけます**」＝
    //   広島・宮城・新潟とは逆に**直リンクを明示的に許容**しているので `noDeepLink` は不要。
    license:
      "京都府ホームページに掲載されている個々の情報(文章、写真、イラストなど)について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenueFile: "r8_p1_sainyu.pdf",
      expenditureFile: "r8_p5_mokuteki.pdf",
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: "一般会計歳入内訳",
      expenditureHeading: "一般会計歳出目的別内訳",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      unit: "millionYen",
      // ★ 3ブロック並びの列指定（上記コメント参照）
      amountIntIndex: 1,
      prevIntIndex: 4,
      revenueHeaderExtra: "^（",
      expenditureHeaderExtra: "^\\(",
      prevNote: "",
    },
  },
  {
    // 京都府の**事業報告（成果）** — 地方自治法233条5項の「主要な施策の成果に関する報告書」。
    // R6・325p・4.2MB・テキスト層あり。docs §12。**#161 の「款項つき」はこの資料**
    // （⚠ **京都市ではない**。京都市の決算実績報告書は事業に款項が付かない＝§8i の追記参照）。
    //
    // **款で章立てされた唯一の資料**（第2款 総務費 〜 第11款 災害復旧費 の10款）。
    // 1つの表に 科目（項・目）／予算現額・決算額／主要な施策・所管課／実施状況と成果 が並び、
    // `measure` に `N款款名` を入れることで**款ドリルへ直接紐付く**（⚠ **項・目は出していない**）
    // （さいたま §8f と同じ経路。derive-app-data.ts の `kanName` が款名を取り出す）。
    //
    // ⚠ **金額は目レベルであって施策レベルではない**。施策ごとの額は成果欄の本文にある
    //    `３ 執行額 …円` だけで、**目の金額を施策へ配ると二重計上**になる（配っていない）。
    //    執行額を持たない施策は `cost: []`（原典に無いものを推計しない）。**417施策中399件が執行額を持つ**。
    // ⚠ **年度ページの URL が2系統ある**（`/kessan/r6kessan.html` と `/kessan/06kessan.html`）。
    //    年度一覧は `/kessan/index.html`。R2〜R6 が現存。
    // ⚠ 京都府の当初予算（`kyotofu-tosho-gaiyou-r8`）とは**年度が違う**（当初 R8 / 決算 R6）。
    //    決算は例年9月公表なので、R7 決算が出るのは 2026年9月以降。
    id: "kyotofu-seika-houkoku-r6",
    title: "令和6年度 京都府 主要な施策の成果に関する報告書",
    publisher: "京都府",
    url: "https://www.pref.kyoto.jp/kessan/documents/01sesaku_1.pdf",
    landingPage: "https://www.pref.kyoto.jp/kessan/r6kessan.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "京都府（一般会計・都道府県・団体コード260002）",
    // 「著作権・リンク等について」（/copyright.html・確認日 2026-07-25。当初予算と同一サイト・同一条項）。
    // リンク方針は「トップページ以外の各ページへもご自由にリンクを設定していただけます」＝
    //   直リンクを明示的に許容しているので `noDeepLink` は不要（当初予算と同じ判断）。
    license:
      "京都府ホームページに掲載されている個々の情報(文章、写真、イラストなど)について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kyotofu-seika-houkoku",
    parserOptions: {
      // ⚠ **テキスト層が破損した4頁**（同じ表が多重・180°反転で重なって描かれている。
      //   `pdftotext` が `科 目 予目算 現科 予額…` と `業事等備整宅住営` を返す）。
      //   パーサが機械検出して頁ごと捨てるが、**黙って減らさない**ようにここで数を宣言する
      //   （原典が差し替わって数が変われば parse が throw する）。docs §12。
      corruptPages: 4,
      // ⚠ **執行額が本文ではなく「路線別・箇所別の表」に載る施策**（表の構造が施策ごとに違い、
      //   1つの正規表現では取れない）。**1行目の金額を採ると過少になる**（例: p.226 地域密着型
      //   社会資本整備事業は道路/河川/公園/港湾の4行＋計。原典には計 1,755,884,222円がある）ので、
      //   **推計も部分値も入れず、件数を宣言して開示する**。p.261 は本文だけが破損した頁。
      //   ⚠ 表から「計」を採る実装は将来の課題（表の見出しが施策ごとに違うため型を先に揃える）。
      execMissedAllowed: 9,
    },
  },
  {
    // 岡山県（都道府県・団体コード 330001。⚠ 岡山市 331007（`okayama-yosangaiyou-*`）と別物なので
    // id を `okayamaken-` で分ける）。「当初予算の説明（未定稿）」付表3
    // 「会計別予算額対前年度予算額及び前々年度決算額比較表 ⑴一般会計」
    // **物理 p.120 = 歳入（16款）/ p.122 = 歳出（14款）**。印字は 116/118 で**ズレ +4**。
    //
    // ⚠ **議会提出の「予算説明書」（498p・p.8/p.9）を採らなかった**（同じ数字だが warning が出る）:
    //    R8 新設の歳入款2「利子割清算金」の前年度セルが**完全な空欄**（`－` でも `―` でもなく
    //    「皆増」ラベルも無い）で ints が `[当年度, 比較]` の2個に詰まり、**前年度を 1,000 と誤読**する。
    //    validate は warning 1件（error ではない）で通ってしまうが、**そのまま収録してはいけない** —
    //    `caveats` の言い換えが「**廃止された税目**の行が、款の番号を持たないため…」（甲府R2・札幌・
    //    福岡の廃止税目の型）なので、**原因が逆（新設款）なのに市民の画面へ事実と違う説明が出る**。
    //    こちらの付表3 は空欄が `―`（U+2015）で印字されており `dashAsZero` で 0 として読める
    //    （＝Σ が4系統とも差0）。**ダッシュの文字クラスを広げたのはこのため**。
    // ⚠ 表題が「未定稿」で原典自身が「計数その他訂正を要する場合もあります」と断っているが、
    //    **総括の全数値が議会提出の説明書と完全一致する**ことを実測で確認している。
    // ⚠ 付表3 は説明書の総括に無い**款16「繰越金」（0/0）**を持つ（説明書は印字しない）。
    // ⚠ 款番号は半角で全款に印字されている → **`kanNoless` を有効にしてはいけない**
    //    （岡山「市」§9i の設定を県へ外挿しない。縦書きラベルも無いので `kanNamePrefixStrip` も不要）。
    // ⚠ URL 規則が年度で3系統に割れる。年度を足すときは年度索引（/page/613711.html）から辿る。
    id: "okayamaken-yosan-setsumei-r8",
    title: "令和8年度 岡山県当初予算の説明（付表3 会計別予算額対前年度予算額比較表・一般会計）",
    publisher: "岡山県",
    url: null,
    urls: ["https://www.pref.okayama.jp/uploaded/life/1041340_10076962_misc.pdf"],
    landingPage: "https://www.pref.okayama.jp/page/1007377.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "岡山県（一般会計・都道府県・団体コード330001）",
    // ライセンス経緯（§9g に従い license 欄には適用条件だけを書く・2026-07-25 実測）:
    //   **県サイト全体が「公共データ利用規約（第1.0版）」（PDL1.0）**（サイトポリシー「コンテンツの
    //   利用」節）。北海道と同じ**ポータル登載を条件にしない型**で、§9g の「規約が自ら範囲を限る」
    //   型には該当しない。裏取りとして、おかやまオープンデータカタログの財政課データセット
    //   「岡山県_岡山県の予算」のリソースに **ライセンス＝公共データ利用規約第1.0版**と明記があり、
    //   **発行元が自ら財政課の当初予算 PDF に PDL1.0 を適用している実例**になっている。
    //   ⚠ サイトポリシーの「1.4 本利用ルールが適用されないコンテンツ」（ロゴ・図画・写真・動画・
    //     音楽）を license 欄に混ぜないこと（§9g の逆方向事故）。引用は「コンテンツの利用」節に限る。
    //   リンクは「本サイトへのリンクは、営利、非営利を問わず原則フリーです」＝`noDeepLink` 不要。
    license:
      "本サイト上のコンテンツの著作権は、特記されていない限り岡山県に帰属し、権利表記の記載がない限り「公共データ利用規約（第1.0版）」（PDL1.0）が適用されています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 120,
      expenditurePage: 122,
      revenueHeading: "１ 歳 入",
      expenditureHeading: "２ 歳 出",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      // ★ 空欄が `―`（U+2015）。文字クラスを広げたので当たる（上記コメント参照）
      dashAsZero: true,
    },
  },
  {
    // 長野県（都道府県・団体コード 200000。⚠ 長野市 202011（decision 階層）と別物なので
    // id を `naganoken-` に分ける）。議会提出「予算に関する説明書」の巻頭を切り出した
    // 「第１号 歳入歳出予算事項別明細書 １ 総括」（**4ページ・45KB** の軽い PDF）。
    // **物理 p.1-2 = 歳入（16款）/ p.3-4 = 歳出（15款）**。印字は `1－1`〜`1－4` で**オフセット0**。
    // 単位は列見出し直下に「千円」。
    //
    // ⚠ **歳入の見出しだけ ASCII 半角括弧 `(歳入)`、歳出は全角 `（歳出）`**（同じ PDF 内で不一致・実測）。
    //    全角で書くと「『（歳入）』の見出しがありません」で throw する。
    // ⚠ **合計ラベルは既定のまま**。歳入合計＝歳出合計（1,065,851,898）なので **Σ はページ取り違えを
    //    原理的に検出できない**（宮城と同型）。網は ①見出し ②合計ラベル の2枚。
    // ⚠ `dashAsZero` は必須。R8 新設の歳入款2「利子割清算金」の前年度セルが **`―`（U+2015）**で、
    //    外すと前年度を 1,700,087 と誤読して前年度Σ +1,700,087 の **warning 止まり**になる。
    //    ⚠ **warning のまま収録してはいけない** — `caveats` の言い換えが「廃止された税目…」なので
    //    原因が逆（新設款）なのに市民の画面へ事実と違う説明が出る（岡山 §11d と同じ罠）。
    // ⚠ `expenditureHeaderExtra` は必須。歳出の財源内訳サブヘッダが款1 に連結して
    //    **`一般財源国庫支出金地方債その他議会費`** に化けたまま **Σ が4系統とも差0 で素通りする**。
    //    `一般財源` だけでは足りず `国庫支出金地方債その他議会費` が残る（実測）。
    //    ⚠ `国庫支出金` は**歳入では実在の款10**なので歳出側だけに効かせること。
    // ⚠ **総括 PDF 本文に「長野県」の文字列が1回も出ない**（北海道と同型）。取り違え検出はホスト名＋
    //    同フォルダの議案 PDF「令和８年度長野県一般会計予算案 … 1兆658億5,189万8千円」＋款名で行う。
    // ⚠ 年度 URL の規則は3回破れる（R6 は別ファイル名かつ **ToUnicode 欠落**、R5 だけディレクトリが違う）。
    //    さらに発行元が「令和8年4月組織改正等に伴うURL変更のお知らせ」を出している＝**URL が動きうる**。
    id: "naganoken-yosansho-r8",
    title: "令和8年度 長野県予算に関する説明書（歳入歳出予算事項別明細書・1 総括）",
    publisher: "長野県",
    url: null,
    urls: ["https://www.pref.nagano.lg.jp/zaisei/kensei/soshiki/yosan/r08/documents/r0802_yosetsu_sokatsu.pdf"],
    landingPage: "https://www.pref.nagano.lg.jp/zaisei/kensei/soshiki/yosan/r08/r8yosanan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "長野県（一般会計・都道府県・団体コード200000）",
    // ⚠ **発行元がトップページ以外へのリンクに問い合わせを求めている**ので `noDeepLink` を立てた
    //   （2026-07-25・人が原文を読んで判断。宮城県と**逐語同型**）。原文
    //   （/koho/kensei/koho/homepage/link.html・更新日 2026年6月16日・確認日 2026-07-25）:
    //     「**トップページ以外のページへリンクを希望される場合は、該当ページの担当課へ
    //      お問い合わせください。**」
    noDeepLink: true,
    // 「長野県公式ホームページのご利用にあたって」＞著作権について
    // （/koho/kensei/koho/homepage/riyo.html・更新日 2025年10月1日・確認日 2026-07-25）。
    // ⚠ 長野県オープンデータサイトの CC BY 4.0 は**及ばない** — 規約が「『長野県オープンデータサイト』
    //   において公開されるウェブサイト」と自ら範囲を限り、カタログは**全8データセット**で
    //   `予算`・`財政`・`決算` を実検索しても **0件**。掲載ページ HTML に CC-BY バッジも無い。
    license:
      "長野県公式ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、長野県公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 1, to: 2 },
      expenditurePages: { from: 3, to: 4 },
      revenueHeading: "(歳入)",       // ⚠ ASCII 半角括弧（原典どおり）
      expenditureHeading: "（歳出）", // ⚠ こちらは全角
      dashAsZero: true,
      expenditureHeaderExtra: "一般財源|国庫支出金",
    },
  },
  {
    // 茨城県（都道府県・団体コード 080004。県内の市は未収録なので茨城県で最初のエンティティ）。
    // 財政課「令和8年度予算案関係資料（当初）」（60p）の「８ 一般会計款別内訳（歳入）」＝物理 p.45
    // （印字43）/「９ 一般会計款別内訳（歳出）」＝物理 p.46（印字44）＝**ズレ +2**。
    // ⚠ **見出しに表番号（`８`/`９`）を含めないこと** — R7 は `９`/`１０` と採番が動く。
    //
    // 列は `[R7当初(Ａ), 構成比, R8当初(Ｂ), 構成比, 増減, 増減率]` ＝**前年度が先**（`prevColumnFirst`）。
    // ⚠ **外すと歳出側は Σ4系統とも差0・款名も無傷のまま両年度が丸ごと入れ替わる**（北海道・新潟と同型）。
    //    歳入側だけは皆増行の非対称で Σ がずれて捕まる。収録後に画面の前年当初比が **+7.6%（増）**
    //    であることを目視すること（反転すると −7.1% になる）。
    // ⚠ 単位は「（単位：百万円、％）」。**`unit` を落とすと Σ4系統とも差0 のまま金額が 1/1000 になる**
    //    （総額が13.6億円と表示される）。網は年度間クロスチェーンだけ。
    // ⚠ 合計ラベルは歳入歳出とも `合計`。既定のままだと「歳入合計 行が見つかりません」で throw。
    // ⚠ **歳入合計＝歳出合計なのでページ取り違えを Σ が検出できない**。網は見出しゲート。
    //
    // 歳入款2「利子割清算金」（R8 新設・皆増）の前年度セルと構成比セルが**半角ハイフン2つ**で、
    // 以前は款名が `利子割清算金--` になっていた（Σ 差0・語彙ゲートも部首ゲートも当たらない）。
    // **2026-07-25 に emit 側で款名前後のダッシュを落とすようにして解消**（皆減側だけ剥がしていた
    // 非対称を揃えた）。⚠ `dashAsZero` は**立てないこと** — 構成比セルのダッシュまで 0 になって
    // 整数が1つ増え、当年度Σが -1,427,000 ずれる（実測）。
    //
    // 茨城県は**独自の目的別体系**（民生費・衛生費を持たず 福祉費／保健医療費／生活環境費 に分かれ、
    // 企画開発費・防災危機管理費・営業戦略費・立地推進費 を持つ全19款）。標準款へ黙って寄せない。
    // 選ばなかった候補: 議会提出「予算に関する説明書②」の総括は**歳入ページが同じ表を二重に
    // 重ね描きしていて -layout 出力が崩壊する**／議案概要説明書の款別財源別一覧は**前年度列が無い**。
    id: "ibaraki-ken-yosan-kankeisiryou-r8",
    title: "令和8年度 茨城県予算案関係資料（当初）— 一般会計款別内訳",
    publisher: "茨城県",
    url: null,
    urls: ["https://www.pref.ibaraki.jp/somu/zaisei/kanri/documents/r08_tousyo_yosankankeisiryou.pdf"],
    landingPage: "https://www.pref.ibaraki.jp/somu/zaisei/kanri/yosann.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "茨城県（一般会計・都道府県・団体コード080004）",
    // サイトポリシー（/bugai/koho/kenmin/misc/shitepolicy.html・確認日 2026-07-25）の「著作権について」。
    // ⚠ 茨城オープンデータポータル（CC BY 4.0）は**及ばない** — 規約が自ら範囲を限り、カタログを
    //   実検索しても茨城県の当初予算は非登載（`予算` 4件・`当初予算` 3件はすべて市のもの、`款別` 0件）。
    //   県自身の財政系登載は決算・財務書類の2件だけで、どちらも掲載ページ URL 登載。CC バッジも無い。
    // リンクは「原則として自由」「事前連絡不要」で条件は**フレーム埋め込みの禁止**のみ＝熊本と同型
    //   （しかも「トップページ以外へリンクされる場合」とディープリンク自体を前提にしている）
    //   → **`noDeepLink` は不要**（人の判断）。
    license:
      "茨城県ホームページに掲載されている文章、画像等の著作権は、茨城県または文章、画像等の提供者の方にあります。これらの著作物は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転用・引用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 45,
      expenditurePage: 46,
      revenueHeading: "一般会計款別内訳（歳入）",
      expenditureHeading: "一般会計款別内訳（歳出）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      prevColumnFirst: true,
      unit: "millionYen",
    },
  },
  {
    // 岐阜県（都道府県・団体コード 210005。⚠ 岐阜市 212016（未収録）と別物なので id を
    // `gifuken-` に分け、`gifu-` は市のために空けておく）。財政課「令和8年度当初予算案に
    // ついて（計数編）」（22p・767KB）の付表2「一般会計 款別予算の対前年度比較」。
    // **物理 p.6 = 歳入（16款）/ p.8 = 歳出（14款）**。印字は －4－/－6－ で**ズレ +2**。
    // 見開きで p.7/p.9 が「比較」列の右半分だが、**款名・当年度・前年度当初は p.6/p.8 に完結する**
    // ので crop も spread も不要。
    //
    // 列は `[本年度, 構成比, 前年度当初, 構成比, 前年度6月補正後, 構成比]`。構成比は小数で除かれるので
    // 整数は `[当年度, 前年度当初, 前年度6月補正後]` に落ち、既定（ints[1]=前年度）で正しい。
    // ⚠ `amountIntIndex`/`prevIntIndex` は不要（京都府の3ブロック型ではない）。
    // ⚠ **`prevBasis` の自動判定は「補正後予算額」という語の有無で決まる**。岐阜 R8 は `６月補正後`
    //    （`予算額` が付かない）なので正しく「当初」になるが、**将来 `６月補正後予算額` と印字したら
    //    自動判定が「補正後」に反転する**。年度を足すときは try-parse の「前年度の基準」を必ず見ること。
    // ⚠ **合計ラベルが歳入・歳出とも `計`**。既定のままだと throw。
    // ⚠ **歳入合計＝歳出合計なのでページ取り違えを Σ が原理的に検出できない**（宮城型）。網は見出し1枚。
    //    **見出しを `款別` のようなページ共通語に緩めると、同じページを両側として読んで Σ が4系統とも
    //    差0 で素通りする**（実測）。必ず `歳入`/`歳出` で分けること。
    // ⚠ R8 新設の歳入款2「利子割清算金」の前年度セルが ASCII ハイフン。`dashAsZero` を外すと
    //    **款2 が丸ごと落ちて当年度Σが −1,400,000 ずれる**（＝大声で落ちる）。
    // ⚠ 歳出の前年度列は R8 体系への組替（総務費 −1,770,041 / 民生費 +1,553,569 / 衛生費 +216,472・
    //    総額は不変）。**原典に注記が無い**が §9l の正常系。
    id: "gifuken-yosan-keisu-r8",
    title: "令和8年度 岐阜県当初予算案について（計数編）付表2 款別予算の対前年度比較（一般会計）",
    publisher: "岐阜県",
    url: null,
    urls: ["https://www.pref.gifu.lg.jp/uploaded/attachment/485785.pdf"],
    landingPage: "https://www.pref.gifu.lg.jp/page/482100.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "岐阜県（一般会計・都道府県・団体コード210005）",
    // 「リンク・著作権・免責事項について」（/page/79328.html・確認日 2026-07-25）。
    // ⚠ 岐阜県オープンデータカタログの CC BY 4.0 は**及ばない** — 規約が「本利用規約の効力が及ぶ
    //   範囲は、本サイトの運用に必要な全てのサーバ及びそれらに格納されている一切の情報とします」と
    //   自ら範囲を限り、実検索でも款別当初予算 PDF は 0件（`予算` 14件はすべてカタログ側の CSV/XLSX）。
    // リンクは「原則として自由です。事前の連絡は必要ありません」＋フレーム組み込みの禁止のみ＝
    //   熊本と同型 → **`noDeepLink` は不要**（人の判断）。
    license:
      "本ホームページに掲載されている情報（文章、写真、画像、プログラムなど）は著作権の対象であり、法律によって保護されています。また本ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。これらの情報については、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、岐阜県の許可なく無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 8,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      dashAsZero: true,
    },
  },
  {
    // 山口県（都道府県・団体コード 350001。⚠ 山口市 352039（`yamaguchi-yosansho-*`）と別物なので
    // id を `yamaguchiken-` に分ける）。議会提出「令和8年度予算説明書」（490p）巻頭の
    // 「一般会計歳入歳出予算事項別明細書 1 総括」。
    // **物理 p.5 = 歳入の款行 / p.6 = 歳入合計だけの単独ページ / p.7 = 歳出**。印字は 1/2/3 で**ズレ +4**。
    // 歳入は合計行が次ページにあるので `revenuePages` で連結する（`revenueSpread` ではない）。
    //
    // ⚠ **この発行元に固有の「静かに壊れる」型**: 同じ掲載ページに「令和7年度予算説明書」が並ぶが、
    //    これは **R7 当初ではなく令和7年度3月補正の説明書**（議案第47号・「一般会計歳入歳出**補正**
    //    予算事項別明細書」・列が `[補正額, 補正前の額, 計]`）。**同じ parserOptions で Σ が4系統とも
    //    差0・款名もクリーンのまま「当年度＝補正額／前年度＝補正前の額」を収録する**（実測）。
    //    今回は当年度Σが負なので気づけるが、純増の補正年度なら気づけない。
    //    **年度を足すときの唯一の網は、PDF 内部の「（議案第1号）」と「歳入歳出予算事項別明細書」
    //    （＝『補正』の2字が無いこと）を目で確認すること**。ファイル名でもリンク文言でも区別できない。
    // ⚠ 物理ページが年度で動く（R7・R6 は歳入 p.5 に合計まで載り歳出は p.6）。外挿しない
    //    （外挿しても見出しゲート／合計行なしで**大声で落ちる**ことは実測済み）。
    // ⚠ 歳入は款14「繰越金」が印字されず kanNo が 13→15 に飛ぶ（Σ は一致）。R8 で款2「利子割清算金」
    //    が新設されて以降の款番号が1つずれた（款名は不変）。**年度間の突合は款名で行う**。
    // ⚠ **合計ラベルは既定のまま**。歳入合計＝歳出合計（786,294,830）なのでページ取り違えを
    //    Σ が検出できず、網は見出しと合計ラベルの2枚だけ（宮城と同型）。
    id: "yamaguchiken-yosan-setsumeisho-r8",
    title: "令和8年度 山口県予算説明書（一般会計歳入歳出予算事項別明細書 1 総括）",
    publisher: "山口県",
    url: null,
    urls: ["https://www.pref.yamaguchi.lg.jp/uploaded/attachment/232647.pdf"],
    landingPage: "https://www.pref.yamaguchi.lg.jp/soshiki/17/337814.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "山口県（一般会計・都道府県・団体コード350001）",
    // 「このサイトの利用について」＞著作権（/soshiki/21/26951.html・確認日 2026-07-25）。
    // ⚠ **区分は `unverified` に落ちる**（実測）。原文が「著作権法の範囲内でご使用ください」だけで
    //   `無断`・`禁止` 等の語彙をどれも使っていないため。埼玉・福岡と同型で、**意訳して要許可へ
    //   寄せない**（§9g の逆方向の事故になる）。
    // ⚠ 山口県オープンデータカタログ（PDL1.0／CC BY 互換）は**及ばない** — 規約が自ら当サイトに
    //   範囲を限り、CKAN API で全770件・山口県 org 100件を実検索しても `説明書` 0件・
    //   県自身の当初予算は非登載（`予算` 4件は他市と道路計画）。掲載ページに CC バッジも無い。
    // リンクは「原則として自由」＋事後連絡の依頼のみ＝`noDeepLink` 不要
    //   （なお `unverified` なので evidence-policy の振替分岐自体に入らない）。
    license:
      "「山口県公式ウェブサイト」に掲載されている個々の情報(文章、写真、イラスト、画像など)は著作権の対象となっています。ご利用にあたっては、著作権法の範囲内でご使用ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 }, // 歳入合計だけが p.6 に単独で載る
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 栃木県（都道府県・団体コード 090000。⚠ 宇都宮市 092011 と別物）。県議会 第412回通常会議提出
    // 「予算案(1)説明書」（527p）巻頭の「一般会計歳入歳出予算事項別明細書 1 総括」。
    // **物理 p.5 = 歳入（15款）/ p.6 = 歳出（14款）**、印字も 5/6 で**ズレ0**。単位は表頭に「（単位千円）」。
    //
    // ⚠ **ファイル名と表紙の「令和７年度」に騙されない** — 表紙は「令和７年度県議会 第412回通常会議
    //    提出 予算案(1)説明書」だが**中身は R8 当初**（本年度 960,680,000千円）。同じ会議の
    //    `412yosannann2.pdf` は **R7 の補正予算（第8号）**。取り違えても見出しゲートで throw することは
    //    実測済みだが、レビュー時に人の目でも確認すること。
    // ⚠ **計数資料ルート（歳入集計表・目的別集計表）を採らなかった**理由: そちらは列順が
    //    `[前年度A, 当年度B]` で **`prevColumnFirst` が必須**になり、外すと Σ4系統差0・款名も無傷のまま
    //    両年度が入れ替わる（北海道・新潟と同型の最危険型）。**説明書ルートは「静かに壊れる」オプションを
    //    1つも使わない**ので、そちらを本命にした。
    //    （なお計数資料は列見出しが「令７(2025) 当初予算額 A」「令８(2026) 当初予算額 B」と
    //     **両年度とも「当初」を明記**しており、`prevBasis` の根拠としては最も強い。両ルートの
    //     全29款が一致することは偵察で実測済み。）
    // ⚠ 歳出 p.6 に財源内訳サブヘッダはあるが、直後の空行で断片が破棄されるため款1 は `議会費` の
    //    まま（広島と同型）。`expenditureHeaderExtra` は不要（実測）。
    // ⚠ **合計ラベルは既定のまま**。歳入合計＝歳出合計（960,680,000）なので緩めるとページ取り違えを
    //    Σ が検出できなくなる（宮城と同型）。
    // 歳入に `利子割清算金` は**無い**（埼玉・岡山・長野・岐阜・茨城・山口では R8 に新設された款）。
    // 標準の目的別体系。
    id: "tochigiken-yosansho-r8",
    title: "令和8年度 栃木県一般会計歳入歳出予算事項別明細書（総括）",
    publisher: "栃木県",
    url: null,
    urls: ["https://www.pref.tochigi.lg.jp/b01/documents/412yosannann1.pdf"],
    landingPage: "https://www.pref.tochigi.lg.jp/b01/7gian.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "栃木県（一般会計・都道府県・団体コード090000）",
    // ⚠ **発行元が PDF への直リンクを名指しで断っている**ので `noDeepLink` を立てた
    //   （2026-07-25・人が原文を読んで判断。**新宿と同型**で、これまでで最も明確な部類）。原文
    //   （/kensei/kouhou/hp/chosakuken/index.html・確認日 2026-07-25）:
    //     「フレーム内に栃木県ホームページを表示したり、**栃木県のホームページ（html）以外のファイル
    //      （画像やPDF等）へ直接リンクしたり**するなど、貴ホームページの一部の情報であるとの誤解を
    //      招く方法でのリンクは行わないでください。」
    //   熊本・茨城・岐阜（フレーム埋め込みの禁止だけ＝立てない）とは違い、**フレームと直リンクを
    //   並列で禁じている**点が決め手。
    noDeepLink: true,
    // 「リンク・著作権・免責事項」＞著作権について（同ページ・確認日 2026-07-25）。
    // ⚠ 栃木県オープンデータ利用規約（PDL1.0）は**及ばない** — 規約が「このサイトで公開している
    //   データ等」と自ら範囲を限り、カタログ292件を実検索しても県の当初予算款別は 0件。
    //   ⚠ 登載されている `栃木県の財政（歳入）/（歳出）`（CC BY・R8 の XLSX あり）は**款別ではない**
    //   （歳入＝自主/依存の11区分・歳出＝性質別・前年度列も無い）＝兵庫の6区分を退けたのと同じ理由で
    //   budget 階層の要件を満たさない。掲載ページ HTML に CC バッジも無い。
    license:
      "栃木県ホームページに掲載されている文章、画像等の著作権は、栃木県または文章、画像等の提供者に帰属します。これらの著作物は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・引用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      // 合計ラベルは既定のまま（上のコメント参照）
    },
  },
  {
    // 鹿児島県（都道府県・団体コード 460001。⚠ 鹿児島市 462012 と別物なので id を `kagoshima-ken-` に
    // 分け、`kagoshima-` は市のために空けておく）。県議会 令和8年第1回定例会提出
    // 「予算に関する説明書〔当初関係〕」（全320p を6分割公開）の **1-50p 分冊**巻頭の
    // 「一般会計歳入歳出予算事項別明細書 1 総括」。
    // **物理 p.5 = 歳入15款 / p.6 = 歳入合計だけの単独ページ / p.7 = 歳出14款＋合計**。印字も 5/6/7 で**ズレ0**。
    //
    // ⚠ **山口と同じ「補正の説明書が同一文言で並ぶ」型**（2県目）。同じ予算インデックスに
    //    「令和8年度6月補正予算に係る議案及び予算に関する説明書」が**まったく同じリンク文言**で並び、
    //    補正書はページを 4-5/6 にずらすだけで **Σ が4系統とも差0・款名も全件クリーンのまま
    //    「当年度＝補正前の額（＝当初額）／前年度＝補正額（41億円）」を収録する**（実測）。
    //    ファイル名でもリンク文言でも区別できない。**唯一の網は PDF 内部の目視** —
    //    ①「一般会計歳入歳出予算事項別明細書」に**『補正』の2字が無い**こと
    //    ②表頭が `本年度予算額／前年度予算額／比較`（補正書は `補正前の額／補正額／合計`）であること。
    //    なお当初の opts をそのまま補正書に当てた場合は「款行が1件も抽出できませんでした」で
    //    **大声で落ちる**（ページまで合わせて初めて静かに壊れる）。
    // ⚠ **合計ラベルは既定のまま**。歳入合計＝歳出合計（920,724,000）なのでページ取り違えを Σ が
    //    検出できない（宮城と同型）。網は ①見出し ②合計ラベルの2枚。
    // ⚠ 歳入は合計行が p.6 に単独で載るので `revenuePages` で連結する（`revenueSpread` ではない）。
    //    p.6 を落とすと「歳入合計 行が見つかりません」で throw する。
    // 歳出 p.7 の財源内訳サブヘッダは、直前の列見出し行が `KAN_HEADER_RE` に当たるため款1 を汚さない
    //    （栃木・広島と同型）＝ `expenditureHeaderExtra` は不要（実測）。歳出行は整数が6個並ぶが
    //    既定の ints[0]/ints[1] で正しい。
    // ⚠ **過年度は伸ばせない** — R7・R6・R5 の説明書 PDF は born-digital だが**テキスト層が無く**
    //    `pdftotext` が 30〜50バイトしか返さない（堺 §8m と同型）。**R8 が初のテキスト層あり**。
    //    ⚠ 年度 URL の規則も完全に破れている（R8 だけ `/ab05/r8_tousyo.html`、R7 は
    //    `/ab05/kensei/zaisei/yosan/**r5**/r7yosan.html` で**ディレクトリの `r5` は年度と対応しない**）。
    // 都道府県固有の款: 歳入 `県税`・`地方消費税清算金`・`交通安全対策特別交付金`・`県債`、
    //    歳出 `警察費`・`労働費`。標準の目的別体系で、`利子割清算金`（他6県の R8 新設款）は**無い**。
    //
    // 選ばなかった候補: 「当初予算（案）の概要」は列見出しが**両年度とも「当初」を明記**していて
    //    `prevBasis` の根拠は最強、かつ**カタログに CC BY 4.0 で登載**（＝open になる）だが、
    //    **単位百万円の四捨五入で歳入Σが ±1百万円ずれ**（原典が注記で自認）、当年度Σの不一致は
    //    validate の **error** なので収録できない。丸めの許容を入れるかは別 PR の判断。
    id: "kagoshima-ken-yosan-setsumeisho-r8",
    title: "令和8年度 鹿児島県予算に関する説明書（一般会計歳入歳出予算事項別明細書 1 総括）",
    publisher: "鹿児島県",
    url: null,
    urls: ["https://www.pref.kagoshima.jp/ab05/documents/127227_20260319114612-1.pdf"],
    landingPage: "https://www.pref.kagoshima.jp/ab05/r8_tousyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "鹿児島県（一般会計・都道府県・団体コード460001）",
    // 「リンク・著作権」（/copyright.html・確認日 2026-07-26）の「著作権について」。
    // ⚠ 鹿児島県オープンデータカタログ（BODIK ODCS・CC BY 4.0）は**本資料には及ばない** —
    //   規約が自ら「当サイトの内容」に範囲を限り、org 460001 の全593件を実検索しても説明書は非登載
    //   （`予算` 5件・`明細` 0件・`歳入` 0件・`款` 0件）。掲載ページに CC バッジも無い。
    //   ⚠ ただし**カタログ側には実体がホストされており**（`data.bodik.jp/…/download/…`）、規約 §7 が
    //   「同一データセットを他サイトにも公開している場合、当サイトを利用するときに限り当サイトの規約が
    //   優先する」と明記しているので、**概要 PDF をカタログから取れば CC BY が明確に適用される**。
    // リンクは「原則としてフリー」＋「鹿児島県ホームページである旨を明記」の依頼のみで、
    //   トップページ限定・PDF 名指し・フレーム禁止のいずれも無い＝山口（第4群）と同型
    //   → **`noDeepLink` は不要**（人の判断）。
    license:
      "鹿児島県ホームページに掲載されている個々の情報及び鹿児島県ホームページ全体については著作権の対象となっており，ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き，無断転載・改変等をすることはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 }, // 歳入合計だけが p.6 に単独で載る
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 群馬県（都道府県・団体コード 100005。⚠ 前橋市 102016 と別物）。「令和8年度予算説明書」（426p）
    // 巻頭の「一般会計歳入歳出予算事項別明細書 1 総括」。**印字ページ＝物理ページ（ズレ0）**。
    // ⚠ **総括が2ページずつに割れている**（歳入 款1-8 が p.5・款9-15＋合計が p.6／歳出 款1-8 が p.7・
    //    款9-17＋合計が p.8）。単数ページ指定だと「歳入合計 行が見つかりません」で throw する。
    // ⚠ **R6 だけ物理ページが +1 ずれる**（明細書の中扉の位置が違う）。R8 の値を当てると throw。
    //    年度を足すときは必ず当て直すこと。
    // ⚠ **合計ラベルは既定のまま**。歳入合計＝歳出合計（848,600,000）なので、見出しを緩めた上に
    //    合計ラベルも「合計」に緩めてページを入れ替えると、**歳入の表を歳出として読み Σ4系統とも
    //    差0・款名も無傷のまま通る**（実測）。網は ①見出し ②合計ラベルの2枚だけ。
    // 群馬県は**独自の目的別体系**（大阪・静岡・北海道・新潟型）。**民生費・衛生費・土木費・商工費・
    //    農林水産業費・消防費を1つも持たず**、知事戦略費／地域創生費／生活こども費／健康福祉費／
    //    環境森林費／農政費／産業経済費／県土整備費 の全17款。標準款へ黙って寄せない。
    // 歳出款5「生活こども費」は原典が中央寄せ3行に割れるが既存の折返し機構で復元される（実測）。
    // 他県で続出した **R8 新設「利子割清算金」の前年度空欄問題は群馬では起きない**（款2 は
    //    `地方消費税清算金` で R7 にも実額がある）。
    // ⚠ 歳出の列見出しに単独行 `一般財源` があるが、直後の空行で断片が破棄されるため款1 は無傷
    //    （保険で `expenditureHeaderExtra: "一般財源"` を足しても出力は完全に同一＝no-op と実測）。
    // ⚠ 歳出の前年度列は R8 の組織体系への組替（生活こども費 −4,912,928 ⇔ 健康福祉費 +4,912,928 /
    //    労働費 +3,000,000 ⇔ 産業経済費 −3,000,000）。**総額は完全一致**で §9l の正常系だが、
    //    **原典に組替の注記が一切無い**（`注`・`※`・`組替` の文字列0件）。
    id: "gunma-ken-yosansetsumeisho-r8",
    title: "令和8年度 群馬県予算説明書（一般会計歳入歳出予算事項別明細書 1 総括）",
    publisher: "群馬県",
    url: null,
    urls: ["https://www.pref.gunma.jp/uploaded/attachment/690172.pdf"],
    landingPage: "https://www.pref.gunma.jp/site/gunmazaisei/743220.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "群馬県（一般会計・都道府県・団体コード100005）",
    // 「群馬県ホームページについて」＞著作権について（/page/15257.html・確認日 2026-07-26）。
    // 全ページ共通フッター「…無断転載を禁じます。(C)群馬県」が当該予算ページにも表示されている。
    // ⚠ **及ぶオープンデータ規約は存在しない** — 旧「群馬県オープンデータサイト利用規約」は 404
    //   （サイト統合で消滅）、現行の統計情報提供システムは**全24データセットが人口・経済統計で
    //   予算/決算/財政は0件**、BODIK の群馬カタログは県内市町村のもので県自身のデータは無い。
    //   掲載ページ HTML に CC バッジも無い。
    // リンクは「原則として自由」「事前にご連絡いただく必要ありません」＋条件はフレーム内表示の禁止のみ
    //   ＝熊本・京都・茨城・岐阜と同型（第3群）→ **`noDeepLink` は不要**（人の判断）。
    license:
      "群馬県ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、群馬県ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 },
      expenditurePages: { from: 7, to: 8 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      // 合計ラベルは既定のまま（上のコメント参照 — 緩めると網が1枚減る）
    },
  },
  {
    // 福島県（都道府県・団体コード 070009。⚠ 福島市 072010（未収録）と別物。id を `fukushimaken-` に
    // 分け、`fukushima-` は市のために空けておく）。議会提出「令和8年度一般会計予算 歳入歳出予算
    // 事項別明細書」（160p）巻頭の「１ 総括」。**物理 p.1-2 = 歳入（16款）/ p.3-4 = 歳出（14款）**。
    // 総括ページに印字ページ番号は無いのでズレ論点なし。単位は各ページ右上に「（単位千円）」。
    //
    // ⚠ **同じ掲載ページに「特別会計予算 歳入歳出予算事項別明細書」が並んでいる**（添付ID が
    //    734665 と **734667** で隣接し版面も同一）。⚠ ただし**この設定のままでは throw する**
    //    （特別会計は歳入 p.1／歳出 p.2 でページ割りが違い「『（歳出）』の見出しがありません」）＝
    //    鹿児島と同じく**ページまで合わせて初めて静かに壊れる**。合わせると Σ4系統差0・款名クリーンで
    //    公債管理特別会計（歳入3款/歳出1款・84,907,582千円）を収録する（実測）。
    //    なお**福島はリンク文言で区別できる**（「令和8年度**一般会計**予算…」「…**特別会計**予算…」）ので、
    //    山口・鹿児島（当初と補正が同一文言）より条件は良い。
    //    それでも収録・レビュー時は **PDF 1行目の「議 案 第１号 令和８年度福島県一般会計予算」と款数**を
    //    目視すること。
    // ⚠ **明細書は2月県議会の議決後に掲載される**（R8 は 3/19）。2〜3月の予算案時点では
    //    【資料3】対前年度比較表しか無い。年度を足すときは掲載時期に注意。
    //
    // 歳入款2「利子割清算金」（R8 新設）の前年度セルは**明示的な `0`**（ダッシュでも空欄でもない）ので、
    //    他県で続出している `dashAsZero` 問題は福島では起きない（実測）。
    // 歳出の財源内訳サブヘッダは独立行として出るため款1 を汚さない → `expenditureHeaderExtra` 不要（実測）。
    // 目的別体系は**標準型**（民生費・衛生費・土木費をすべて持つ14款）。⚠ ブリーフで懸念した
    //    復興特会の混入は無い（`復興・創生分` はポイント資料上の**一般会計内の区分**で会計ではない）。
    //
    // 選ばなかった候補: 【資料3】対前年度比較表も款別＋前年当初だが、**単位百万円の四捨五入で
    //    当年度Σが −1,000千円ずれる**（原典が注記で自認）＝ validate が止まる。款名も原典が
    //    `農林水産費`（`業` の無い略称）。
    id: "fukushimaken-yosansho-r8",
    title: "令和8年度 福島県一般会計予算 歳入歳出予算事項別明細書（1 総括）",
    publisher: "福島県",
    url: null,
    urls: ["https://www.pref.fukushima.lg.jp/uploaded/attachment/734665.pdf"],
    landingPage: "https://www.pref.fukushima.lg.jp/sec/01115b/08tousyoyosangaiyou.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "福島県（一般会計・都道府県・団体コード070009）",
    // 「リンク・著作権・免責事項などについて」（/sec/01010d/koho-chosakuken.html・確認日 2026-07-26）。
    // ⚠ 福島県オープンデータ利用規約（CC BY 2.1）は**及ばない** — 規約が「次のバナー表示がある
    //   ページ及びバナー表示があるデータにおいてのみ適用されます」と自ら範囲を限り、当初予算の
    //   掲載ページに**バナーは無い**（HTML 実検索で0件）。オープンデータライブラリ全282件を
    //   実カウントしても県自身の当初予算は非登載（財政系3件はいずれも**市町村**のデータ）。
    // リンクは「原則フリー・事前連絡不要」＋事後連絡の依頼＋フレーム内リンクの自粛のみ＝
    //   既存判断の第3群（熊本・京都・茨城・岐阜）と第4群（山口）の合成で、PDF 名指しも
    //   トップページ限定も無い → **`noDeepLink` は不要**（人の判断）。
    license:
      "「福島県ホームページ」に掲載されている個々の情報(文章、写真、イラストなど)は、著作権の対象となっています。また、「福島県ホームページ」全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転用・引用することはできません。また、当ページの内容を改変することもできません。ただし、「福島県ホームページ」の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 1, to: 2 },
      expenditurePages: { from: 3, to: 4 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 三重県（都道府県・団体コード 240001。⚠ 津市 242012・四日市市 242021 とは別物なので
    // id を `mieken-` に分け、`mie-`/`tsu-` は市のために空けておく）。財政課
    // 「令和7年度当初予算の概要」（34p）の **物理 p.3 = 歳入（15款）/ p.6 = 歳出（14款）**。
    // 印字は 2 / 5 で**ズレ −1**。単位は表の右肩に「（単位：千円、％）」。
    //
    // ⚠ **これだけ R7**（他の県エンティティは R8）。**R8 の該当資料は ToUnicode 欠落で化ける**
    //    （荒川 §10u と同じ生成系）。しかも**1つの PDF に化けの系統が2つ**あり、歳出 p.6 は
    //    既存の `decodeGarble` ルール1（ASCII − 0x1D）で復号できるが、**歳入 p.3 は
    //    ASCII + 0x3EAC という未知の帯**で、この帯は CJK 拡張Aの範囲なので `isSuspectGarble` を
    //    素通りし**数字が黙って消える**。R8 を足すには `pipeline/lib/garble-decode.ts` に
    //    数字帯の追加・`U+06B8`→`△`・約50字のマップ追加が要る（別 PR）。
    //    ⚠ R8 の数値自体は正しい（手で復号して Σ4系統差0 を検算済み・R7 の当年度列とも29行一致）。
    //    ⚠ **R8 で歳入款2 の名称が「地方消費税清算金」→「清算金」に変わる**（原典注記あり）ので、
    //    R8 を足すときに款名突合が割れる。
    //    ⚠ R6 はスキャン画像・R5 は R8 と同じ化け・R4 以前は未検証＝**年度で健全性が飛ぶ**（北海道と同型）。
    //
    // ⚠ **1ページに表が2つある**（上＝当初 vs 当初／下＝「12月・1月・2月補正予算含みベース」の
    //    16か月ベース）。パーサは合計行を「合計ラベルを含む行のうち整数**最多**」で選ぶが、
    //    **両表とも整数3個で同数**なので `>` 比較により**先に出てくる当初ベースが勝っているだけ**
    //    （実測: Σ=836,552,275＝当初総額。16か月ベースは 871,370,271）。
    //    **この「先勝ち」が唯一の網**なので、年度を足すときは必ず try-parse で総額を目視すること。
    //    **下の表に整数が1つ増える年度があれば静かに16か月ベースを収録する**。
    // ⚠ `prevColumnFirst` 必須（列順が `[前年度A, 当年度B, 増減, 増減率]`）。外すと
    //    **Σ4系統差0・款名も無傷のまま両年度が入れ替わる**。
    // ⚠ 見出しを `予算の状況` に緩めると歳入ページを両側として読んで **Σ4系統差0 で素通り**（岐阜型）。
    // ⚠ 歳入款13「繰越金」が両年度とも ASCII ハイフン → `dashAsZero` で 0/0 として拾う
    //    （立てないと行ごと落ちて14款になる。Σ はどちらでも差0）。
    // ⚠ `prevNote` は**明示指定**する。自動検出だと**16か月ベース表の注記**を拾って前年度基準の
    //    説明として画面に出る（実測）。
    // 目的別体系は標準型。都道府県固有は歳入 県税・県債・交通安全対策特別交付金、歳出 警察費・労働費。
    id: "mieken-yosan-gaiyou-r7",
    title: "令和7年度 三重県当初予算の概要（一般会計 歳入予算の状況／歳出予算の状況【款別】）",
    publisher: "三重県",
    url: null,
    urls: ["https://www.pref.mie.lg.jp/common/content/001178138.pdf"],
    landingPage: "https://www.pref.mie.lg.jp/ZAISEI/HP/m0036300272.htm",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "三重県（一般会計・都道府県・団体コード240001）",
    // ⚠ license は**サイトポリシーの著作権節（①）＋全ページ共通フッター（②）の2つを原文のまま**置く。
    //   ②は当該予算ページにも現に表示されている。**①だけだと `unverified` に落ちる** —
    //   原典が「複製、転用等する事は法律で禁止」で `複製` と `禁止` の間が11文字あり、
    //   判定器の `[^。]{0,10}` に**1文字だけ届かない**（`複製・転用` も原典は読点なので当たらない）。
    //   意訳や要約で寄せるのではなく、**実際に適用される原文をもう1つ足して判定器に決めさせる**のが
    //   §9g に沿う（実測で ①+② → permission-required）。
    // ⚠ 三重県オープンデータカタログ（BODIK ODCS・CC BY 4.0）は**及ばない** — 規約が自ら範囲を限り、
    //   カタログ全135件を実検索・目視しても `予算`/`決算`/`財政` は**0件**。掲載ページに CC バッジも無い。
    // リンクは「原則としてリンクフリー」「事前の連絡は必要ありません」＋事後連絡の依頼のみで、
    //   フレーム禁止の文言すら無い＝山口と同型（第4群）→ **`noDeepLink` は不要**（人の判断）。
    license:
      "「三重県ウェブサイト」に掲載されている情報（文章、写真、画像、プログラムなど）は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、三重県の許可なく複製、転用等する事は法律で禁止されています。／各ページの記載記事、写真の無断転載を禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 6,
      revenueHeading: "歳入予算の状況",
      expenditureHeading: "歳出予算の状況",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      prevColumnFirst: true,
      dashAsZero: true,
      // 自動検出が16か月ベース表の注記を拾うのを潰す（上記コメント参照）
      prevNote: "前年度（令和6年度）の額は当初予算額（原典の列見出しは「令和6年度 当初」）",
    },
  },
  {
    // 三重県 R8（240001）。R7 と同じ「当初予算の概要」の同じ表（歳入 p.3 / 歳出 p.6【款別】）。
    // **R8 は ToUnicode が欠落していて化ける**ので §11f では見送っていた（§11h でパーサを直して収録）。
    //
    // ⚠ **1つの PDF に化けの系統が2つある**（初例）:
    //    - 歳出 p.6 の表本体 … 既存の **ASCII − 0x1D**（荒川・豊島と同じ帯）＋ U+08xx 帯のかな
    //    - 歳入 p.3 …………… **ASCII + 0x3EAC**。結果が **CJK 拡張A**（U+3ECC–U+3F2A）に落ちるため、
    //      以前の `isSuspectGarble` は拡張A を「まっとうな漢字」として素通りさせ、**数字が黙って
    //      消えて ints 0 個**になっていた。→ `decodeGarbleBand.revenue` で帯を明示し、あわせて
    //      **拡張A を疑う側に変えた**（未マップなら列挙して throw する。garble-decode.ts 参照）。
    //    - さらに**同じ p.6 の中で、表本体は U+08xx 帯のかな・注記は U+46xx 帯のかな**と混ざる。
    // ⚠ 負号は **▲（U+06B8 / U+4566）**。荒川の △ は U+06B9 で**隣のコードポイント**なので、
    //    「U+06B9 の仲間だから △」と決め打たないこと（R7 の健全版が ▲ であることで確定した）。
    // ⚠ **款名が R7 と1つ変わる** — 歳入款2 が `地方消費税清算金`（R7）→ `清算金`（R8）。
    //    年度間の款名結合はここで切れる（原典どおりなので寄せない）。
    // 検算: 当年度合計 892,859,132 は**議案第5号「歳入歳出それぞれ 892,859,132 千円」と一致**
    //    （復号の正しさを原典の別文書で裏取りできる稀な例）。前年度合計 836,552,275 は R7 収録分の
    //    当年度合計と一致。復号後の款名・注記3行は R7 の健全版と全文一致することを1字ずつ確認した。
    // ⚠ R7 と同じく**1ページに表が2つ**（上＝当初 vs 当初／下＝16か月ベース）。合計行の選定が
    //    上の表（836,552,275 / 892,859,132）を採っていることを実測で確認済み。下の表は
    //    871,370,271 / 938,871,396 なので、取り違えたら総額が一目で違う。
    id: "mieken-yosan-gaiyou-r8",
    title: "令和8年度 三重県当初予算の概要（一般会計 歳入予算の状況／歳出予算の状況【款別】）",
    publisher: "三重県",
    url: "https://www.pref.mie.lg.jp/common/content/001238210.pdf",
    landingPage: "https://www.pref.mie.lg.jp/ZAISEI/HP/m0036300317.htm",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "三重県（一般会計・都道府県・団体コード240001）",
    // ライセンス・リンク方針の確認は R7 エントリのコメント参照（同一サイト・同一規約）。
    license:
      "「三重県ウェブサイト」に掲載されている情報（文章、写真、画像、プログラムなど）は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、三重県の許可なく複製、転用等する事は法律で禁止されています。／各ページの記載記事、写真の無断転載を禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 6,
      revenueHeading: "歳入予算の状況",
      expenditureHeading: "歳出予算の状況",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      prevColumnFirst: true,
      dashAsZero: true,
      decodeGarble: true,
      decodeGarbleBand: { revenue: 0x3eac }, // 歳入だけ帯が違う（歳出は既定の −0x1D）
      // 自動検出が16か月ベース表の注記を拾うのを潰す（R7 と同じ）
      prevNote: "前年度（令和7年度）の額は当初予算額（原典の列見出しは「令和7年度当初」）",
    },
  },
  {
    // 愛知県（都道府県・団体コード 230006。⚠ **名古屋市 231002 と別物**）。令和8年2月定例県議会
    // 提出「予算に関する説明書」（645p）巻頭の「一般会計歳入歳出予算事項別明細書 1 総括」。
    // **物理 p.7-8 = 歳入16款＋合計 / p.9-10 = 歳出13款＋合計**（総括の印字は 1〜4 で PDF 物理とは別系統）。
    //
    // ⚠ **合計行の金額が原典のセル幅で改行される**（`joinWrappedAmounts` の初例・§11g）。歳出の
    //    合計行だけ列幅が足りず `3,222,441,` / `000` に割れる。Σ款の積み上げは正しいので**壊れるのは
    //    「記載合計」の読み取りだけ**だが、外すと **Σ 差 +3,219,218,559 で validate が止まる**（実測）
    //    ＝静かには壊れない。歳入側は割れないので、片側だけで発現する。
    // ⚠ **`revenueHeaderExtra` が無いと款1 が `千円千円千円頁県税` になる**（実測）。歳入の単位行
    //    `千円 千円 千円 頁` は `頁` を含むため `isUnitOnly`（`^(?:千円|百万円|円)+$`）に当たらず、
    //    款名の断片として款1 に連結する。**Σ は4系統とも差0 のまま**＝目視でしか気づけない型。
    //    歳出側は直前の列見出し行が `KAN_HEADER_RE` に当たるので不要（鹿児島・栃木・広島と同型）。
    // ⚠ 歳入の見出しは `1 総括（歳入）` で**行頭が `1`**。`revenueHeading` に当てて読み飛ばさないと
    //    款1 として拾われ「款行の金額列を解釈できません」で落ちる。
    // 前年度列は**年度間クロスチェックで確定**: R7 説明書（550288.pdf 物理 p.8）の当年度列
    //    歳入合計 2,941,301,000 = 本資料の前年度列と一致 → 基準は当初。
    // 都道府県固有の款: 歳入 `県税`・`利子割清算金`・`地方消費税清算金`・`県債`、
    //    歳出は**独自の目的別体系**（総務企画費・県民環境費・福祉医療費・経済労働費・建設費・
    //    警察費・教育・スポーツ費）で**民生費・衛生費・土木費・商工費・農林水産業費・消防費を
    //    1つも持たない**。大阪・静岡・北海道・新潟・群馬に続く6例目 — 標準款へ黙って寄せない。
    //    ⚠ 款9 `教育・スポーツ費` の中黒（U+30FB）は原典どおり。ダッシュ類の文字クラス外なので無傷。
    // ⚠ **過年度は伸ばせない**（横展開が優先なので追わない）: R7 も同じ合計行の割れ方だが、
    //    **R6 はさらに別の形（合計ラベルが金額と別行）で throw し、R5 以前はスキャン画像**。
    //
    // 選ばなかった候補: 「あいち財政の概要」XLSX は**オープンデータカタログ登載＝CC BY 2.1 日本**で
    //    款別の数値も説明書と29款すべて一致するが、**款番号なし・款名にセル内改行**で新パーサが要る。
    //    ライセンスだけを理由に乗り換える価値はあるので、Excel 経路を作るときの第一候補にする。
    id: "aichi-yosan-setsumeisho-r8",
    title: "令和8年度 愛知県予算に関する説明書（一般会計歳入歳出予算事項別明細書 1 総括）",
    publisher: "愛知県",
    url: "https://www.pref.aichi.jp/uploaded/attachment/600028.pdf",
    landingPage: "https://www.pref.aichi.jp/soshiki/zaisei/r8-gian-kansuru.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "愛知県（一般会計・都道府県・団体コード230006）",
    // 「免責事項・リンク」（/site/userguide/menseki.html・確認日 2026-07-26）の「著作権」。
    // ⚠ 愛知県オープンデータカタログ（CC BY 2.1 日本）は**本資料には及ばない** — 規約が自ら
    //   「当サイト（https://www.pref.aichi.jp/opendata/ において公開される Web サイト）」に範囲を
    //   限っており、本資料は財政課ページ配下（/soshiki/zaisei/）にある。カタログを実検索しても
    //   非登載（`説明書` 0件・`款` 0件・`予算` 3件・`明細` 1件・`歳入` 16件のいずれにも本 PDF は無い。
    //   ⚠ カタログの検索フォームは GET だが `page=1&search=1` を付けないと結果が出ない）。
    //   掲載ページの HTML にも CC バッジは無い（`creativecommons`／`クリエイティブ・コモンズ`／
    //   `オープンデータ` の出現 0 件＝実測。北海道の型の確認）。
    // リンクは「原則自由・事前の連絡は必要ありません」＋フレーム内展開の禁止のみで、
    //   トップページ限定・PDF 名指しのいずれも無い＝熊本（原則フリー・フレーム埋め込み禁止）と同型
    //   → **`noDeepLink` は不要**（人の判断）。
    license:
      "ネットあいちに掲載されている個々の情報（文章，写真，イラストなど）は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 },
      expenditurePages: { from: 9, to: 10 },
      revenueHeading: "総括（歳入）", // 行頭 `1` を款と誤読させないため見出しに当てる
      expenditureHeading: "（歳出）",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
      revenueHeaderExtra: "^(?:千円)+頁$", // 単位行 `千円 千円 千円 頁` が款1 に連結するのを潰す
      joinWrappedAmounts: true, // 歳出の合計行が `3,222,441,` / `000` に割れる
    },
  },
  {
    // 静岡県（都道府県・団体コード 220001。⚠ **静岡市 221007・浜松市 221309 と別物**。
    // §8s で浜松を 221007 で登録して1人あたりを16.5%狂わせた前科がある帯域なので特に注意）。
    // 地方自治法243条の3の財政状況公表『県財政のあらまし』第157号（県公報 令和8年5月29日 号外別冊・81p）の
    // **〔第3表〕一般会計歳入予算の前年度比較（物理 p.13-14）**と
    // **〔第5表〕一般会計歳出予算の前年度比較（目的別）（物理 p.18-20）**。印字ページは 11-12 / 16-18 で**＋2**。
    // ⚠ **号数と年度の対応**: **5月発行の奇数号が当該年度の当初予算**（157=R8・155=R7・153=R6…）、
    //    11月発行の偶数号は決算側。年度を足すなら奇数号を辿ること（過年度は横展開優先で追っていない）。
    //
    // ⚠ **款と項が同一表**にあり、しかも**款名の折返しが項と同じ字下げ帯に落ちる**（`kanFragmentsIndented`
    //    の初例・§11g）。款は字下げ0〜1（**歳出の款9 だけ 1**）・項は4以上なので `kanIndentMax: 3` で
    //    分かれるが、断片は字下げ5〜17 にある:
    //      歳入 款7 上段 `交通安全対策` / 款8 上下段 `分担金及び`＋`負担金` / 款9 は**款行に金額が無く**
    //      金額が次行 `手数料 14,958 …`（字下げ5）に来る
    //    `kanFragmentsIndented` を外すと **款7 が `特別交付金` に化け、款8・款9 が丸ごと落ちて
    //    Σ が −20,056,000（百万円）** になる（実測。Σ ゲートが止めるので静かには壊れない）。
    // ⚠ その断片規則は**項行で破棄しないと静かに壊れる** — 項にも折返しがあり（歳入 `及び過料等`＝
    //    款15 項1 の下段、歳出 `株式等譲渡`・`性能割交付金`）、行頭に数字が無いので同じ規則で通る。
    //    破棄しないと款16 が `及び過料等県債` になり **Σ は4系統とも差0 のまま**（パーサ側で対処済み）。
    // ⚠ **原典の誤植** — 歳出款15 諸支出金の R7 額が `277,212  263.401  13,811` と**桁区切りがピリオド**。
    //    小数は構成比として捨てられるので、放置すると前年度額が比較増減 13,811 になり
    //    **前年度Σが −249,590,000 ずれる**（実測）。**R7 の第155号でも同じ箇所が同じ誤植＝毎年必発**なので
    //    `amountTypos` でピンポイント指定する（一括の正規表現にすると構成比の小数まで金額に化ける）。
    // ⚠ `dashAsZero` が要る（歳入款2 利子割清算金＝R8 新設で前年度セルが **ASCII ハイフン**）。
    // 前年度列の基準は**列見出しが両年度とも「当初予算額」と明記**（最強の根拠）。加えて第155号の
    //    当年度列 歳入合計 1,372,300 が本資料の前年度列と一致する年度間クロスチェックも取れている。
    // 都道府県固有の款: 歳入 `県税`・`利子割清算金`・`地方消費税清算金`・`県債`。歳出は**独自の目的別体系**
    //    （企画費・財務費・危機管理費・くらし環境費・スポーツ文化観光費・交通基盤費・災害対策費…）で
    //    **民生費・衛生費・土木費・商工費・農林水産業費・消防費を1つも持たない**。標準款へ黙って寄せない。
    id: "shizuokaken-zaisei-aramashi-157",
    title: "県財政のあらまし 第157号（令和8年度当初予算 第3表 一般会計歳入予算の前年度比較 / 第5表 一般会計歳出予算の前年度比較）",
    publisher: "静岡県",
    url: "https://www.pref.shizuoka.jp/_res/projects/default_project/_page_/001/011/521/aramashi157.pdf",
    landingPage: "https://www.pref.shizuoka.jp/kensei/zaiseisuito/zaisei/1011521.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "静岡県（一般会計・都道府県・団体コード220001）",
    // 「著作権・リンクについて」（/about/link.html・更新日 2023年9月7日・確認日 2026-07-26）の「著作権について」。
    // ⚠ 静岡県オープンデータ（データカタログ）は**本資料には及ばない** — カタログに『県財政のあらまし』は
    //   非登載で、本資料は広報戦略課管理の県公式サイト配下にある。掲載ページに CC バッジも無い。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。原文は「原則として自由」「他のページへの直接
    //   リンクを拒むものではありません」としつつ、**①「事前の連絡は必要ありませんが、リンクを行った場合は」
    //   pr@pref.shizuoka.lg.jp へリンク元・リンク先の URL を連絡することを求め**（＝**事後**の連絡依頼。
    //   新潟の「**事前に**電子メールで連絡」とは時点が違うが、**連絡を求める**点で同じ側）、
    //   **②注意事項で「最初に読むべきページを飛ばし、記載内容が十分に伝わらないページへの直接リンクは
    //   避けてください」と明記**している（②は PDF を名指ししてはいないが、**掲載ページを飛ばして PDF を
    //   直リンクする行為が実質的にこれに当たる**）。②は広島・宮城（トップページ以外は相談＝立てる）と
    //   同じ側なので、掲載ページへ振り替える。
    // ⚠ **振替が解消するのは②だけ** — ①の連絡依頼は掲載ページへのリンクにも掛かる（新潟と同じ扱い）。
    noDeepLink: true,
    license:
      "「静岡県ホームページ」に掲載されている情報（文章、写真、イラスト、画像など）は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 13, to: 14 },
      expenditurePages: { from: 18, to: 20 },
      revenueHeading: "一般会計歳入予算の前年度比較",
      expenditureHeading: "一般会計歳出予算の前年度比較（目的別）",
      unit: "millionYen",
      dashAsZero: true, // 歳入款2 の前年度セルが ASCII ハイフン
      kanIndentMax: 3, // 款は字下げ0〜1・項は4以上
      kanFragmentsIndented: true, // 款名の折返しが項と同じ帯（5〜17）に落ちる
      amountTypos: { expenditure: { "263.401": "263,401" } }, // 原典の桁区切り誤植（毎年必発）
    },
  },
  {
    // 滋賀県（都道府県・団体コード 250007。⚠ 大津市 252018 と別物）。議会提出
    // 「令和8年度予算に関する説明書（その1）」（589p）巻頭の「歳入歳出予算事項別明細書 １ 総括」。
    // **物理 p.7 = 歳入16款 / p.8 = 歳入合計だけの単独ページ / p.9 = 歳出15款 / p.10 = 款16＋歳出合計**。
    // 印字ページは 1/2/3/4 で**物理 = 印字 +6**。
    //
    // ⚠ **`dashAsZero` が無いと静かに壊れる**（実測）。歳入款2「利子割清算金」は R8 新設で前年度セルが
    //    `－`（U+FF0D）。外すと比較増減 985,000 を前年度額として拾い、**前年度Σが +985,000**。
    //    前年度Σの不一致は **error ではなく warning** なので derive まで流れ、
    //    caveats が「廃止された税目…」という**原因が逆（新設款）の説明**を市民の画面に出す
    //    （長野 §11e・岡山 §11d と同型）。当年度Σと款名は無傷なので、これだけでは気づけない。
    // ⚠ 歳出の財源内訳サブヘッダ（`国支出金 地方債 その他`）は `KAN_HEADER_RE` に当たらないが、
    //    **直後の空行で `reset()` が効くため款1 を汚さない**（`expenditureHeaderExtra` 無しで
    //    款1 が `議会費` のままであることを実測）。⚠ **版面が変わって空行が消えると
    //    `国支出金地方債その他議会費` に化け、Σ は4系統とも差0 のまま素通りする** — 年度を足すときは款名を目視する。
    // ⚠ **同じ掲載ページに補正予算の説明書が6本並ぶ**（6月/7月/9月…）。ただし滋賀の補正明細書は
    //    **補正の付いた款しか載せない**（R8 6月補正は歳入3款）ので、ページを合わせても Σ が大きく外れる。
    //    山口 §11e・鹿児島 §11f の「ページまで合わせると静かに通る」型には**ならない**（実測で throw）。
    //    区別の印は ①表題が「歳入歳出**補正**予算事項別明細書」②表頭が「補正前の額／補正額／計」。
    // ⚠ **年度を足すときは総括の物理ページを必ず当て直す**（R8=7/8・9/10、R7=7・8/9、R6=7・8/9、R2=5・6/7 と毎年ずれる）。
    // 前年度列は列見出しに「当初」の明記が無いが、**R7 説明書（5520679.pdf）の当年度列と歳入・歳出とも
    //    全款一致**することを実測して当初で確定（列順の反転も同時に否定できている）。
    // ⚠ **独自の目的別体系**（総合企画費・文化スポーツ費・琵琶湖環境費・健康医療福祉費・子ども若者費・
    //    商工観光労働費・農政水産業費・土木交通費）。**民生費・衛生費・土木費・商工費・農林水産業費・
    //    消防費・労働費を1つも持たない**。大阪・静岡・北海道・新潟・群馬・愛知に続く**7例目**。標準款へ寄せない。
    id: "shiga-ken-yosansho-r8",
    title: "令和8年度 滋賀県予算に関する説明書（一般会計歳入歳出予算事項別明細書 １ 総括）",
    publisher: "滋賀県",
    url: "https://www.pref.shiga.lg.jp/file/attachment/5592374.pdf",
    landingPage: "https://www.pref.shiga.lg.jp/kensei/zaiseikaikei/yosan/327233.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "滋賀県（一般会計・都道府県・団体コード250007）",
    // 「著作権・リンクの方針と免責事項について」（/kensei/koho/hpsns/copyright.html・確認日 2026-07-27）の
    //   「1.著作権について」。⚠ **滋賀県オープンデータ利用規約（CC BY 4.0）は及ばない** — 規約が自ら
    //   「『滋賀県オープンデータカタログ』および本サイトで公開している情報」に範囲を限っており、
    //   カタログ（BODIK ODCS・odcs.bodik.jp/250007/）は全22データセットで
    //   `予算` 0件・`決算` 0件・`歳入` 0件・`歳出` 0件・`款` 0件・`説明書` 0件（実検索）。掲載ページに CC バッジも無い。
    // ⚠ **この原文は判定器の窓を 10 → 20 に広げて初めて permission-required になる**
    //   （`複製、転用することは、法律で禁止` で動詞と述語の間が12文字）。三重に続く2例目で、
    //   derive-app-data.ts の `licenseClassOf` のコメントに経緯を残した。**要約して寄せてはいけない**。
    // リンクは「フリーとします。リンク設定を自由に行っていただいて結構です」で、PDF の名指し・
    //   トップページ限定・要連絡・フレーム禁止のいずれも無い（既存4群のどれよりも緩い）
    //   → **`noDeepLink` は不要**（人の判断）。
    license:
      "「滋賀県ホームページ」に掲載されている個々の情報（文字、写真、イラスト等）に関する諸権利は、滋賀県ならびに第三者が有する著作権の対象であり、法律によって保護されています。「滋賀県ホームページ」の利用者は、私的使用その他法律で認める範囲内において使用する場合にのみ、個々の情報をダウンロード等により複製することができます。また、上記目的による複製以外の場合であっても、個々の情報に著作権者による個別の利用条件が示されている場合には、当該条件に従って利用することができます。その他、私的使用その他法律で認める範囲を超えて権利者の許可なく複製、転用することは、法律で禁止されています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 }, // 歳入合計だけが p.8 に単独で載る
      expenditurePages: { from: 9, to: 10 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      dashAsZero: true, // 歳入款2 の前年度セルが －（U+FF0D）
    },
  },
  {
    // 奈良県（都道府県・団体コード 290009。⚠ 奈良市 292010 と別物なので id を `nara-ken-` に分け、
    // `nara-` は市のために空けておく）。議会提出「令和8年度予算案に関する説明書」の**分冊「総括(P1-4)」**。
    // **物理 p.1-2 = 歳入16款＋合計 / p.3-4 = 歳出16款＋合計**。印字とのズレ0（4ページだけの軽い PDF）。
    //
    // ⚠⚠ **同じ掲載ページに版面が完全に同一の特別会計の分冊がある**（`08_..._tokkai_288-415.pdf`）。
    //    1ページ目が同じ「1 総括 （歳入）」で款3件＋合計が並ぶので、**`（歳入）` を見出しに使うと
    //    歳入側は通ってしまう**（実測。歳出側の見出しが無い理由で偶然 throw するだけ）。
    //    → **見出しに柱（running head）の `奈良県一般会計予算` を使う**。特会ファイルに当てると
    //    **歳入側で即 throw する**ことを実測済み。⚠ 収録・レビュー時は p.1 の1行目が
    //    `予算に関する説明書（奈良県一般会計予算）` であることを目視すること。
    // ⚠ **`dashAsZero` が無いと Σ が外れる**（歳入款2「利子割清算金」の前年度セルが `－`・前年度Σ +715,000）。
    //    滋賀と違いこちらは**当年度Σも歳出も無傷なので warning 止まり**になる点は同じ。
    // ⚠ **「令和8年度予算案のすがた」PDF を使ってはいけない**（`forhp_r8yosanannosugata.pdf`）。歳入表に
    //    **`１７ うち臨時財政対策債` が款番号つきで並ぶ**＝款16 県債の内数が1行増える**沖縄 §11f と同じ型**。
    //    R8/R7 は臨財債が 0 なので Σ が偶然一致しうる。**説明書の総括を使うこと**（内数行が無い）。
    // 歳出の財源内訳サブヘッダは**空行2本を挟むので `reset()` が効き**款1 を汚さない（実測）。
    // 歳入款7「交通安全対策特別交付金」は中央寄せ3行折返しだが、既存の「名前欄が空→下段待ち」経路で
    //    正しく組み上がる（`kanNameContinues` 不要・実測）。
    // 前年度列は **R7 説明書の当年度列と歳入15款・歳出16款すべて一致**して当初で確定。
    //    ⚠ ただし **R7↔R6 は2款だけ一致しない**（地域創造費 +77,220 / 予備費 −77,220 で相殺・Σ は一致）。
    //    原典どおりで、予備費からの充用が前年度欄に反映されている読み。**過年度を足すときに
    //    「パースがずれた」と誤認しないこと**（R8↔R7 は完全一致）。
    // ⚠ **独自の目的別体系**（地域創造費・福祉保険費・医療政策費・環境森林費・人材・雇用政策費・
    //    食農費・産業費・県土マネジメント費）。**民生費・衛生費・土木費・商工費・農林水産業費・
    //    消防費を1つも持たない**。滋賀に続く**8例目**。⚠ `人材・雇用政策費` の中黒（U+30FB）は原典どおり。
    //    ⚠ **款体系は R6 の組織改編で変わる**（R5 以前は `文化・教育・くらし創造費`・`雇用政策費` 等）。
    //    年度をまたぐ款名結合は R6 を境に割れる。
    id: "nara-ken-yosansetsumeisho-r8",
    title: "令和8年度 奈良県予算に関する説明書（一般会計 歳入歳出予算事項別明細書 1 総括）",
    publisher: "奈良県",
    url: "https://www.pref.nara.lg.jp/documents/21175/02_r8_setsumeisyo_soukatsu_001-004.pdf",
    landingPage: "https://www.pref.nara.lg.jp/n022/71209.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "奈良県（一般会計・都道府県・団体コード290009）",
    // 「リンク・著作権・免責事項」（/link.html・更新日 2026-02-27・確認日 2026-07-27）。
    // ⚠ 奈良県オープンデータカタログは**及ばない** — 全10カテゴリ約104データセットのうち
    //   「財政」は2件（税務統計・ふるさと納税の状況）だけで、**予算・決算・款別は全カテゴリ0件**（実検索）。
    //   掲載ページ HTML に CC バッジも無い。⚠ **原文の但し書き「オープンデータカタログサイトや
    //   各ページに特段の定めがある場合には、その取り扱いが優先されます」は原文の一部なので残す** —
    //   これは「優先しうる規約が別に存在する」という条件節で、CC BY を名乗る文言ではない。
    // リンクは「特に制限は設けておりません」＋条件はフレーム内取り込みの禁止のみ
    //   ＝熊本・京都・茨城・岐阜・愛知と同型（第3群）→ **`noDeepLink` は不要**（人の判断）。
    // ⚠ 旧ホスト `www.pref.nara.jp/13393.htm` は 301 で `lg.jp` へ飛ぶ。registry には `lg.jp` を書く。
    license:
      "奈良県ホームページに掲載されている文章、画像等の著作権は、奈良県または提供者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、当県のオープンデータカタログサイトや当県サイトの各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 1, to: 2 },
      expenditurePages: { from: 3, to: 4 },
      // 柱を見出しに採る（特別会計の同型ファイルを誤って当てたときに throw させるため。上記コメント）
      revenueHeading: "奈良県一般会計予算",
      expenditureHeading: "奈良県一般会計予算",
      dashAsZero: true, // 歳入款2 の前年度セルが －（U+FF0D）
    },
  },
  {
    // 長崎県（都道府県・団体コード 420000。⚠ 長崎市 422011 と別物なので id を `nagasaki-ken-` に
    // 分け、`nagasaki-` は市のために空けておく）。「令和8年度 予算に関する説明書」の
    // **総括（歳入・歳出）分冊（5p）**。**印字ページ＝物理ページ（ズレ0）**。
    //   物理 p.1 = 歳入15款 / p.2 = 歳入合計だけの単独ページ / p.3 = 歳出14款＋合計
    //   （p.4-5 は一般財源の内訳の続きで1行1整数なので款として拾われない）
    // ⚠ 歳入は合計行が p.2 に単独で載るので `revenuePages` で連結する（`revenueSpread` ではない）。
    //
    // ⚠ **`expenditureHeaderExtra: "国支出金"` は必須**（実測）。歳出 p.3 の財源内訳サブヘッダ
    //    `国支出金 地 方 債 そ の 他` が `KAN_HEADER_RE` に当たらず、外すと款1 が
    //    **`国支出金地方債その他議会費`** に化ける。**Σ は4系統とも差0 のまま素通りする**
    //    ＝目視でしか気づけない型（神奈川・千葉・岡山・長野と同型）。
    //    ⚠ 歳入には実在の款 `国庫支出金` があるが `国支出金` はその部分文字列ではないので衝突しない
    //    （神戸で踏んだ型を避けるため**歳出側だけ**に効かせる）。
    // ⚠ **合計ラベルは既定のまま**。歳入合計＝歳出合計（708,963,230）なのでページ取り違えを Σ が
    //    検出できない（宮城・鹿児島・群馬と同型）。網は ①見出し ②合計ラベルの2枚。
    //    ⚠ **見出しの括弧は半角 ASCII**（原典が U+0028/U+0029）。全角で書くと throw する。
    // ⚠ **同じ掲載ページに補正の説明書が同一リンク文言で4群並ぶ**（当初／4月専決／6月補正／6月補正追加。
    //    山口・鹿児島・福島に続く4例目）。区別は URL のみ（当初 = `/fs/4/1/4/0/`）。
    //    ⚠ 6月補正書に当初の opts を当てると **当年度Σは差0 で通る**（補正書の第1列＝「補正前の額」＝
    //    当初額なので原理的に一致する）。捕まえているのは**前年度Σ（+248,475,561）と款名の汚染だけ**。
    //    目視の印は ①1行目が「令和８年度長崎県一般会計**予算**」（補正書は「補正予算（第２号）」）
    //    ②表頭が `本年度予算額／前年度予算額／比較`（補正書は `補正前の額／補正額／計`）。
    // ⚠ **R8 は骨格予算**（2026年4月の知事選前）。⚠ **この事実は収録した総括 PDF には書かれていない**
    //    （raw を grep して「骨格」0件）。根拠は**別資料**「令和8年度当初予算（案）の概要」
    //    （landing: https://www.pref.nagasaki.jp/doc/45051.html ）の**物理 p.2（印字1）「－予算編成の
    //    基本方針－」**の「令和８年度当初予算は、予算編成時期と知事選挙の関係から、重要な政策的予算を
    //    除いた、いわゆる骨格予算としております」。千葉 R7・京都 R8 と同型で6月補正（698億円）で肉付けされる。
    //    **`prevBasis` は原典どおり「当初」**（前年度列は R7 の通常予算の当初額なので基準は正しい）。
    //    ⚠ ただし**画面に出る「対前年当初比 −3.5%」は骨格 vs 通常の比較**なので実質的な減額ではない。
    //    `prevNote` は「前年度額がどの基準か」を書く欄なので**ここには書かない**（京都 R8 と同じ判断）。
    // 前年度列の基準は3重に裏取り: ①概要 p.3「令和７年度当初予算と比較… 25,772,979千円の減」が
    //    比較欄と一致 ②R7 の同資料の当年度列と29款すべて一致 ③当年度合計 708,963,230 が
    //    「第1号議案」の「歳入歳出それぞれ708,963,230千円と定める」と一致。
    // ⚠ **歳出は部分的に独自の目的別体系** — `民生費`・`衛生費` を持たず **`生活福祉費`・`環境保健費`**
    //    を置く（`消防費` も無い）。標準款へ黙って寄せないこと。
    // ⚠ **URL 規則は R8 だけ破れる**（R8 のみ `/fs/4/1/4/0/_/_________.pdf` と**アンダースコアのみ**の
    //    ファイル名。R7 以前は `/uploads/YYYY/MM/<epoch>.pdf` で規則性ゼロ）。年度は各年度ページから辿る。
    id: "nagasaki-ken-yosan-setsumeisho-r8",
    title: "令和8年度 長崎県予算に関する説明書 総括（歳入歳出予算事項別明細書 1 総括）",
    publisher: "長崎県",
    url: "https://www.pref.nagasaki.jp/fs/4/1/4/0/_/_________.pdf",
    landingPage: "https://www.pref.nagasaki.jp/doc/45074.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "長崎県（一般会計・都道府県・団体コード420000）",
    // 「このサイトについて」（/pages/site_info.html・確認日 2026-07-27）の「著作権について」。
    // ⚠ 長崎県オープンデータ（BODIK ODCS・CC BY 4.0）は**本資料に及ばない** — 規約第1条が自ら
    //   「当サイトの内容」に範囲を限り、CKAN API で org 420000 の全201件を実検索しても
    //   `予算` 0件・`歳入` 0件・`款` 0件（`歳出` 1件・`決算` 2件・`財政` 4件はいずれも**市町統計**）。
    //   掲載ページに CC バッジも無い。**license 欄に併記しないこと**（`クリエイティブ・コモンズ` を
    //   書くと open に誤判定される＝§9g の実害）。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。原文は「リンクは原則として自由です」と
    //   しつつ**「リンクを貼る箇所については、原則、トップページとしてください。（トップページ以外に
    //   リンクを貼る場合は、ページ下部お問合わせ先（担当課）と相談してください。）」**と明記しており、
    //   広島・宮城の第2群そのもの。**「原則トップページ」と言い切っている点で静岡より強い**。
    noDeepLink: true,
    license:
      "当県サイトに掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として長崎県に帰属します。（ただし、一部の画像等の著作権は、原著作者が所有しています。）「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 1, to: 2 }, // 歳入合計だけが p.2 に単独で載る
      expenditurePage: 3,
      revenueHeading: "(歳入)", // ⚠ 半角括弧（原典どおり）
      expenditureHeading: "(歳出)",
      expenditureHeaderExtra: "国支出金", // 外すと款1 が汚れて Σ は素通りする
    },
  },
  {
    // 愛媛県（都道府県・団体コード **380008**。⚠ 松山市 382019 と別物。
    // ⚠⚠ **偵察は 380003 と報告してきたが実在しないコードだった**（総務省「全国地方公共団体コード」
    //    原本 Excel のシート「R6.1.1現在の団体」を実引きして 380008 を確認）。存在しないコードは
    //    /coverage の「未分類」に出るので気づけるが、**実在する別団体のコードだったら誰も気づけない**
    //    （§8s の浜松 = 静岡市コードの事故）。**偵察の団体コードは必ず原本で引き直すこと**。
    //
    // 令和8年2月定例県議会提出「予算に関する説明書」のうち **（総括）単体 PDF（5p）**。
    // 数百ページの説明書から総括だけが別ファイルで出ているので巻頭ページ探しが要らない。
    // **物理 p.2-3 = 歳入15款＋合計 / p.4-5 = 歳出13款＋合計**。
    // ⚠ **印字が2系統**（フッタ上段 25-28 ＝ 物理+23／下段 21-24 ＝ 物理+19）。registry は物理ページ。
    //
    // ⚠ **`expenditureHeaderExtra: "一般財源|国支出金"` は必須**（実測・R8/R7 とも再現＝毎年必発）。
    //    歳出の財源内訳サブヘッダ `一 般 財 源` と `国 支 出 金 地 方 債 そ の 他` が
    //    `KAN_HEADER_RE` のどの語にも当たらず、外すと款1 が
    //    **`一般財源国支出金地方債その他議会費`** になる。**Σ は4系統とも差0 のまま**。
    //    ⚠ `国支出金` は**歳出側だけ**に効かせる（歳入款9 は `国庫支出金`）。
    // ⚠ **過年度は伸ばせない**: 同型は R7 まで。R6・R5・R3・R2 は罫線ダッシュ行主体の別レイアウトで
    //    「歳入合計 行が見つかりません」で throw、R4・R1 は**テキスト層が実質ゼロ**（スキャン）。
    // 前年度列は **R7 総括（138947.pdf）の当年度列と歳入15款・歳出13款・合計の全28行一致**で当初と確定。
    // ⚠ **愛媛は独自の目的別体系ではない**（議会費・総務費・民生費・衛生費・労働費・農林水産業費・
    //    商工費・土木費・警察費・教育費・災害復旧費・公債費・予備費＝標準の目的別）。
    //    県固有は歳入の `県税`・`地方消費税清算金`・`県債` のみ。
    //
    // 選ばなかった候補: 「当初予算（案）の概要（計数資料編）」p.10「歳入の状況」は**款別ではない**
    //    （自主財源/依存財源の再分類＋`その他`＋`(うち臨時財政対策債)` の内数・百万円単位）。
    //    **沖縄 §11f で踏んだ罠と同型**なので使わない。p.11「歳出の状況」は性質別。
    id: "ehime-yosan-setsumeisho-r8",
    title: "令和8年度 愛媛県予算に関する説明書（一般会計 歳入歳出予算事項別明細書 1 総括）",
    publisher: "愛媛県",
    url: "https://www.pref.ehime.jp/opendata-catalog/fs/1/6/3/7/5/_/08-03ippannsetumeisoukatu.pdf",
    landingPage: "https://www.pref.ehime.jp/opendata-catalog/dataset/3509.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "愛媛県（一般会計・都道府県・団体コード380008）",
    // ⚠⚠ **県エンティティで初の `open`**。愛媛県オープンデータ利用規約（CC BY 4.0）が
    //   **本資料に実際に及ぶ** —
    //   ⚠ license 欄は**2文書の合成**（どちらも適用される条件の原文）: 第1文は
    //   `/opendata-catalog/policy.html`、第2文「政府標準利用規約（第2.0版）に準拠」は
    //   そこからリンクされる規約 PDF `/opendata-catalog/fs/1/1/2/2/8/_/kiyaku.pdf`。確認日 2026-07-27。
    //   政令市20市や他24府県の「ポータルの CC BY は予算書に及ばない」とは事情が逆。根拠:
    //   ①カタログを実検索して `予算` 20件の中に「予算議案書等【令和８年度】」（dataset/3509・
    //     データ作成者 総務部財政課）があり、その22リソースの1つが**本資料そのもの**（＝登載は
    //     掲載ページ単位ではなく**ファイル直リンク単位**）
    //   ②カタログ配信の実体（/opendata-catalog/fs/…）は本体サイトの uploaded/attachment/171435.pdf と
    //     **sha256 一致**（1e5fa2d8cc3f…・491,993 バイト）＝同一ファイル
    //   ③データセットページの**各リソースに「表示（CC BY）」バッジが付いている**
    //     （「別に注釈が無いから既定が適用される」より強い直接の根拠）
    //   → **`url` はカタログ側を採る**（CC BY の主張がカタログ配信に依拠するため）。
    // ⚠ **同じ県でも資料ごとに区分が割れる** — 「主要施策の成果説明書」は**カタログ非登載**なので
    //   サイト共通の著作権表記（`無断で複製・転用することはできません`）＝ permission-required になる。
    //   縦掘りで足すときに本エントリの license を流用しないこと。
    // ⚠ サイト共通のリンク方針は第2群（トップページ以外は要相談）だが、**open の資料では
    //   `noDeepLink` は評価されない**（derive の振替分岐が permission-required 限定）ので立てない。
    //   カタログの利用規約自体にリンク制限の条項は無い。
    license:
      "当サイトにおいて公開するデータは、別に注釈があるものを除いて、クリエイティブ・コモンズ表示4.0国際の下に提供されており、利用規約を守れば誰でも自由に利用することができます。本規約は、政府標準利用規約（第2.0版）に準拠しています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 2, to: 3 },
      expenditurePages: { from: 4, to: 5 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "一般財源|国支出金", // 外すと款1 が汚れて Σ は素通りする
    },
  },
  {
    // 青森県（都道府県・団体コード 020001。⚠ 青森市 022012 と別物）。財政課
    // 「令和８年度一般会計当初予算款別総括表」— **1ページ・57KB の単票**で、歳入17款と歳出14款が
    // 縦積み（`samePage`）。単位は表右上に「（単位：千円）」と明記。
    //
    // ⚠⚠ **数値ブロックが3組並ぶ**（京都府と同型）。列は
    //    `[R7当初 予算額/構成比/一般財源][R7現計 …][R8当初 …][当初比 現計比]` で、小数を落とした
    //    整数トークンは **[R7当初額, R7当初一般財源, R7現計額, R7現計一般財源, R8当初額, R8当初一般財源]**
    //    の6個。**当年度=4・前年度=0**。`amountIntIndex`/`prevIntIndex` を外すと
    //    **当年度に R7当初額・前年度に R7当初の一般財源を収録し、Σ が4系統とも差0 のまま通る**（実測）。
    //    款名も全件クリーンなので **validate も款名目視も検出できない** — 年度間クロスチェックだけが捕まえる。
    // ⚠ **`samePage: true` も落とせない**。落とすと歳出区画に歳入17款がそのまま複製され、
    //    歳入合計＝歳出合計なので**これも Σ 差0 で通る**（北海道と同型・実測）。
    // ⚠ **合計ラベルが `計` の一字**で、表題 `令和８年度一般会計当初予算款別総括表`・列見出し
    //    `令和７年度現計`・`当初比 現計比` にも当たる。**この様式は青森が初出**（既存28ソースは
    //    `合計`/`歳入合計` の複数字）なので、`samePage` の合計行検出に**ヘッダ語彙の除外を足した**
    //    （kofu-yosansho.ts 参照）。入れる前は「款行が1件も抽出できませんでした」で throw する。
    // 前年度列は**年度間クロスチェックで確定**: R7 総括表の当年度列（歳入計 709,500,000／
    //    一般財源 473,776,999）が本資料の前年度列と一般財源まで含めて一致 → 基準は当初。
    // ⚠ **この PDF 自身に「青森県」の文字が1つも無い**（grep 0件）。取り違えの検出は発行元ドメインと、
    //    同県「当初予算案の概要」p.11・「財政事情」第3表の合計 709,500,000／751,400,000 との一致で行った。
    // ⚠ **歳出款4 は `衛生費` ではなく `環境保健費`**（青森県固有名）。ただし民生費・土木費・教育費は
    //    標準どおり持つので、大阪・静岡・北海道型の「独自体系」ではない。**標準款へ黙って寄せない**。
    // ⚠ **同じ年度ページに補正・専決の「款別総括表」が10本以上並ぶ**（R7 年度ページは13本）。
    //    ファイル名だけで選ぶと補正を当初として収録する（山口・鹿児島・福島・長崎と同型）。
    //    ⚠ **ファイル名に規則が無い**（`R8tousyo_kanbetu-cleaned.pdf` / `R7tousyo_kanbetu.pdf` /
    //    `2024_kanbetsu.pdf` / `H31_tosho_kanbetsu.pdf` …）。年度ページのリンク文言から辿ること。
    // ⚠ **`pdftotext -bbox` がこの PDF で poppler ごとクラッシュする**（`std::out_of_range`）。
    //    座標ベースの処理は使えない（`-layout` と `-x/-W` は正常）。
    id: "aomori-ken-kanbetsu-sokatsu-r8",
    title: "令和8年度 青森県一般会計当初予算款別総括表",
    publisher: "青森県",
    url: "https://www.pref.aomori.lg.jp/soshiki/zaimu/zaisei/files/R8tousyo_kanbetu-cleaned.pdf",
    landingPage: "https://www.pref.aomori.lg.jp/soshiki/zaimu/zaisei/yosan_2026.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "青森県（一般会計・都道府県・団体コード020001）",
    // 「著作権・リンク等」（/contents/copyright.html・更新 2021-04-01・確認日 2026-07-27）の「著作権」節。
    // ⚠ 青い森オープンデータカタログ（CC BY 4.0）は**本資料に及ばない** — 規約が自ら
    //   「opendata.pref.aomori.lg.jp 以下のディレクトリ」に範囲を限っており、本資料は
    //   www.pref.aomori.lg.jp 側にある。カタログ全1,049データセットを実検索しても
    //   `款別総括表` 0件・`当初予算` 0件・`財政課` 0件（`予算` 3件・`歳入` 3件・`決算` 9件は
    //   すべて統計年鑑由来の別データセット）。掲載ページに CC バッジも無い。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。リンク方針の注意事項が
    //   **「最初に読むべきページを飛ばし、記載内容が十分に伝わらないページへの直接リンクは
    //   避けてください。」と静岡とまったく同じ文言**で、第2群（広島・宮城・新潟・長野・静岡・長崎）。
    //   ⚠ `landingPage` は**年度ページ**にする（財政課 index ではファイルに辿り着けない）。
    noDeepLink: true,
    license:
      "青森県庁ホームページ(https://www.pref.aomori.lg.jp/)に掲載されている文章、写真、画像、動画、その他全ての情報は著作権の対象となっています。また、「青森県庁ホームページ」全体も編集著作物として著作権の対象となっており、共に著作権法により保護されています。これらの情報については、青森県または第三者が著作権を有しており、「私的利用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 1,
      samePage: true,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "計", // ⚠ 一字。ヘッダ除外が無いと表題・列見出しに当たる（上記）
      expenditureTotalLabel: "計",
      amountIntIndex: 4, // 整数トークン[4] = 令和8年度当初 予算額
      prevIntIndex: 0, //   整数トークン[0] = 令和7年度当初 予算額
    },
  },
  {
    // 岩手県（都道府県・団体コード **030007**。⚠ 盛岡市 032018 と別物）。
    // ⚠⚠ **収録指示側が 030001 と書いていたが原本に存在しないコードだった**（偵察が原本 Excel で
    //    引き直して訂正）。愛媛 380003 に続く2例目。**団体コードは指示・偵察どちらの申告も信じず
    //    総務省「全国地方公共団体コード」原本で引くこと**（§8s の浜松＝静岡市コードの事故）。
    //    裏取り2本目: 県オープンデータ一覧 CSV のファイル名が `030007_open_data_list…`。
    //
    // 地方自治法219条2項の公表ページに載る「予算に関する説明書（令和8年度）」（583p）巻頭の
    // 「一般会計歳入歳出予算事項別明細書 1 総括」。**印字ページ＝物理ページ（ズレ0）**。
    // ⚠ **歳入は p.7 に款1-15・p.8 に合計行だけ**という改ページ。`revenuePage: 7` だけにすると
    //    「歳入合計 行が見つかりません」で throw する（実測）。歳出は p.9 に款14＋合計が収まる。
    // ⚠ **見出しの括弧は半角 ASCII**（原典が 0x28/0x29）。全角で書くと throw する。
    //
    // ⚠ **`expenditureHeaderExtra: "一般財源|国支出金"` は必須**（実測）。歳出 p.9 のヘッダは3段
    //    （`本年度予算額の財源内訳` / `特定財源`＋`一般財源` / `国支出金 地方債 その他`）で、
    //    `年度` を含む段だけが `KAN_HEADER_RE` に当たり残り2段が款名断片として溜まる。外すと款1 が
    //    **`一般財源国支出金地方債その他議会費`** になり、**Σ は当年度・前年度とも差0 のまま素通りする**
    //    （神奈川・千葉・岡山・長野・長崎・愛媛と同型）。⚠ `国支出金` は**歳出側だけ**に効かせる
    //    （歳入には実在の款 `国庫支出金` がある）。
    // ⚠ **同じ掲載ページに「予算に関する説明書」が3本並び、表紙まで同一**（補正2号・補正1号・当初）。
    //    当初は**ファイル名に `tousyo`/`tousho` を含む**もの。補正書に当初の opts を当てると
    //    見出し検査で throw する（実測）ので静かには壊れないが、fetch 段階で気づくのが安全。
    //    ⚠ **ファイル名の年度規則が無い**（`setumeisyo`↔`setsumeisho`・`tousyo`↔`tousho` が年度で揺れる）。
    // 前年度列の基準は**年度間クロスチェックで確定**: R8 前年度合計 732,941,727 = R7 説明書の当年度合計、
    //    R7 前年度合計 732,217,110 = R6 の当年度合計（款単位でも一致）。列順の反転も同時に否定できている。
    // **骨格予算ではない**（あらまし・資料1 を全文 grep して「骨格」0件。岩手県知事選は 2027年9月＝R9）。
    // 外部検算: 当年度合計 774,233,557 は要領（議案）p.1 の「歳入歳出それぞれ 774,233,557 千円と定める」と一致。
    // **目的別体系は標準**（民生費・衛生費・土木費あり）。県固有は `県税`・`県債`・`警察費`・
    //    `地方消費税清算金`・`交通安全対策特別交付金`・`諸支出金`。⚠ `繰越金` は両年度とも 1千円（象徴計上・原典どおり）。
    id: "iwate-ken-yosan-setsumeisho-r8",
    title: "令和8年度 岩手県予算に関する説明書（一般会計歳入歳出予算事項別明細書 1 総括）",
    publisher: "岩手県",
    url: "https://www.pref.iwate.jp/_res/projects/default_project/_page_/001/097/070/r8tousyo_setumeisyo.pdf",
    landingPage: "https://www.pref.iwate.jp/kensei/yosan/yosan/1069687/1097070.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "岩手県（一般会計・都道府県・団体コード030007）",
    // 「岩手県公式サイトへのリンクについて」（/about/link.html・更新 令和1年7月24日・確認日 2026-07-27）の
    //   「3 著作権について」。
    // ⚠ 県オープンデータ（CC BY 4.0）は**本資料に及ばない** — 一覧 CSV 全208件を走査して
    //   「当初予算」を含むのは1件だけで、それは**『岩手県内“市町村”の当初予算の状況』**（市町村課）＝
    //   県の予算書ではない。`説明書`・`歳入`・`歳出` は0件、担当課に総務部財政課も0件。
    //   共同ポータル iwate.dataeye.jp（257件）も `予算` 1件＝同じ市町村データのみ。掲載ページに CC バッジも無い。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。「5 その他」が
    //   **「トップページ以外のページへのリンクを希望される場合は、それぞれのホームページ作成担当課まで
    //   お問い合わせください。」**と明記しており、広島・宮城の第2群そのもの
    //   （トップページへのリンクにも事後の URL 連絡を求めている）。
    //   ⚠ `landingPage` は**年度ページ**にする（要領インデックスではファイルに辿り着けない）。
    noDeepLink: true,
    license:
      "岩手県ホームページに掲載されている写真、画像、イラスト、動画などの個々の情報についての著作権は、県又はコンテンツ提供者にあります。これらの情報については、「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 }, // 歳入合計だけが p.8 に送られる
      expenditurePage: 9,
      revenueHeading: "(歳入)", // ⚠ 半角括弧（原典どおり）
      expenditureHeading: "(歳出)",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
      expenditureHeaderExtra: "一般財源|国支出金", // 外すと款1 が汚れて Σ は素通りする
    },
  },
  {
    // 石川県（都道府県・団体コード 170003。⚠ 金沢市 172014 と別物なので id を `ishikawa-ken-` に
    // 分け、`ishikawa-`／`kanazawa-` は市のために空けておく）。財政課「令和8年度石川県歳入歳出予算概要」
    // （通称 5ten・**5ページ 201KB の Excel 出力**）。**ノンブルが無いので印字とのズレは 0**。
    //   物理 p.1 = 一般会計 歳入15款＋合計 / **p.2 = 歳出（性質別）＝款別ではない** /
    //   p.3 = 一般会計 歳出16款＋合計 / p.4 = 特別会計 / p.5 = 事業会計
    // ⚠ **議会提出の「予算説明書」（465p）は使えない** — 事項別明細書が **JBIG2 のスキャン画像**で
    //    `pdffonts` が0行・`pdftotext` が1文字も返さない（京都・鹿児島 R7以前と同型）。
    // ⚠ **年度ページの URL が予算年度と1つずれる**（R8 の資料が `/zaisei/yosan/**r7**/` 配下）。
    //    ディレクトリは「公表した年度」を表す。年度規則も壊れており（`/r4/tousho.html` だけ綴り違い、
    //    ファイル名も `5ten`→`goten` に変わる）、年度追加は必ず一覧ページから辿ること。
    //
    // ⚠ **`revenueTotalLabel: "計"` は必須**。歳入 p.1 の合計行は組版が重なって
    //    `合 合  計` / `計  888,910,000 …` の**2行に割れており**、金額のある行のラベルが `計` 一字しかない。
    //    既定（`歳入合計`）だと「歳入合計 行が見つかりません」で throw する（実測）。歳出 p.3 は割れていない。
    // ⚠ **見出しの括弧が半角/全角で混在**（歳入 `（歳入）`＝全角／歳出 `(歳出:款別）`＝**開き括弧と
    //    コロンが半角 ASCII・閉じ括弧が全角**）。原典どおりに書かないと throw する。
    // ⚠ **`kanNoless` を立ててはいけない**。歳入款15 県債の下に**内数** `通常債`/`臨時財政対策債` が
    //    款番号なしで並ぶ（沖縄・奈良と同型）。立てると通常債を二重計上して Σ が
    //    +73,846,000（当年度）/ +116,399,000（前年度）ずれる（実測）。既定なら孤児として捨てられる。
    // ⚠⚠ **`prevColumnFirst` を誤って立てると静かに壊れる**（この資料唯一の静音故障・実測）。
    //    当年度と前年度が丸ごと入れ替わったまま **Σ が4系統とも差0 で通り、款名も無傷**。
    //    年度間クロスチェックだけが捕まえる。
    // ⚠ **歳出は p.3**（p.2 は性質別）。p.2 を指すと見出し検査で throw する（実測）ので静かには壊れない。
    //
    // ⚠ **R8 は骨格予算**（2026年3月の知事選前）。⚠ **この事実は収録するこの PDF にも
    //    「当初予算概要」にも書かれていない**（両方 grep して「骨格」0件＝実測）。根拠は**別資料**
    //    「令和８年度当初予算 記者発表」（令和8年1月20日・知事室・
    //    https://www.pref.ishikawa.lg.jp/chiji/kisya/r8_1_20/documents/20260120.pdf ）の
    //    **物理 p.2「令和８年度当初予算 基本方針」**の
    //    「○ 新規事業などは6月補正予算で対応する「骨格予算」として編成」（自分で当該ページを grep して確認）。
    //    長崎 R8・千葉 R7・京都 R8 と同型。**`prevBasis` は原典どおり「当初」**（前年度列は R7 の当初額）。
    //    `prevNote` には書かない（あの欄は前年度額の基準を書く場所）。
    //    ⚠ 画面の前年当初比は骨格 vs 通常の比較である旨が出ない限界が残る。
    // 前年度列は**年度間クロスチェックで確定**: R7 の同資料の「令和7年度 当初」列 837,989,000 が
    //    本資料の前年度列と一致し、歳出16款も全件一致。⚠ **石川は年度によって前年度基準が変わる**
    //    （R7・R5 の資料は前年度列が「6月現計」）。過年度を足すなら1年度ずつヘッダを読むこと。
    // ⚠ **独自の目的別体系**（危機管理費・復旧・復興費・企画振興費・文化観光スポーツ費・健康福祉費・
    //    生活環境費・商工労働費）で**民生費・衛生費・労働費を1つも持たない**。標準款へ寄せない。
    //    ⚠ `復旧・復興費` の中黒は U+30FB・`文化観光スポーツ費` のカタカナは原典どおり。
    id: "ishikawa-ken-yosan-gaiyou-r8",
    title: "令和8年度 石川県歳入歳出予算概要（当初予算）",
    publisher: "石川県",
    url: "https://www.pref.ishikawa.lg.jp/zaisei/yosan/r7/documents/r8_5ten.pdf",
    landingPage: "https://www.pref.ishikawa.lg.jp/zaisei/yosan/r7/r8tousyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "石川県（一般会計・都道府県・団体コード170003）",
    // サイトポリシー（/about_site/sitepolicy/index.html・確認日 2026-07-27）の「著作権について」。
    // ⚠ いしかわオープンデータカタログ（CKAN・全1,006件・CC BY）は**本資料に及ばない** —
    //   `resource_search url:5ten` が **0件**、`予算` 4件はいずれも県税統計・市町財政・「財政のあらまし」。
    //   ⚠ その「財政のあらまし」本体も**款別は円グラフの構成比だけで金額表も前年当初比較も無い**ので、
    //   CC BY 側へ逃げる選択肢自体が無い（偵察が実際に開いて確認）。掲載ページに CC バッジも無い。
    //   **`クリエイティブ・コモンズ` を license 欄に併記しないこと**（open に誤判定される＝§9g の実害）。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。サイトポリシーが
    //   「トップページ…へのリンクは、原則フリーです」としつつ**「なお、トップページ以外のページへの
    //   リンクを希望される場合は、それぞれのページ管理者（担当課など）までお問い合わせください。」**と
    //   明記＝広島・宮城・新潟・長野・静岡・長崎・青森・岩手と同じ第2群。
    noDeepLink: true,
    license:
      "「石川県ホームページ」に掲載されている個々の情報（文字、写真、イラスト等）は著作権の対象となっています。また、「石川県ホームページ」全体も編集著作物として著作権の対象となっており、ともに日本国著作権法及び国際条約により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、石川県の許可なく無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 3, // ⚠ p.2 は性質別
      revenueHeading: "（歳入）", // 全角括弧
      expenditureHeading: "(歳出:款別）", // ⚠ 開き括弧とコロンは半角・閉じ括弧は全角（原典どおり）
      revenueTotalLabel: "計", // ⚠ 合計行が2行に割れ、金額行のラベルは「計」一字
      expenditureTotalLabel: "合計",
    },
  },
  {
    // 大分県（都道府県・団体コード 440001。⚠ 大分市 442011 と別物なので id を `oita-ken-` に分ける）。
    // ⚠⚠ **本命は「予算に関する説明書」ではない**（registry 初の型）— 説明書（387p）巻頭の
    //    「1 総括」＝**物理 p.5-8 のテキストが全部アウトライン（ベクタパス）化**されており、
    //    `pdftotext` が各ページ9バイト（ノンブルのみ）しか返さない。`qpdf --qdf` で内容ストリームを
    //    開くと `m`/`l`/`c` が 6,230 本・`Tj` が2本だけ＝**表が図形**。R7 の説明書も同じ＝恒久的な組版の癖。
    //    ⚠ 堺 §8m の「born-digital なのにテキスト層が無い」に似るが、**あちらは全ページ・大分は総括4ページだけ**。
    // ⚠ 「一般会計当初予算案の概要」も使えない — **歳入の表が4枚の JPEG として貼られている**。
    // → 唯一の決定的パース経路が財政課の**「財政状況の公表」（地方自治法243条の3・毎年6月公表）**の
    //    **第2表（歳入）＝物理 p.10 / 第8表（歳出目的別）＝物理 p.18**。印字とのズレは **+4**。
    // ⚠ **この資料は当初予算の成立後（6月1日告示）に出る**。大阪府「財政のあらまし6月号」と同型で、
    //    **毎年2〜5月には大分県の款別歳入がテキストでどこにも存在しない**。
    //
    // ⚠ **`kanNoless` が必須**（両表とも款番号が無く列見出しが「款 別」）。外すと
    //    「款行が1件も抽出できませんでした」で throw する。
    // ⚠ **`revenueHeaderExtra: "のとおりです"` が必須**。表の直前の散文
    //    「款別の内訳については、第２表及び第２図のとおりです。」が款1 に化け、**Σ が両年度とも +2** ずれる
    //    （中野 §10e と同型）。`expenditureHeaderExtra` は R8 では no-op だが、散文の整数が2個以上に
    //    なった年度には同じ形で汚れるので保険で付けてある。
    // ⚠ **12月公表版が同じ掲載ページに並ぶ**が、12月版には当初予算の第2表が無いので当初の opts を
    //    当てると見出し検査で throw する（実測）＝静かには壊れない。
    // 前年度列は**原典が「令和７年度 当初予算額（Ｂ）」と明示**。加えて R7年6月公表版の当年度列と
    //    15款・14款すべて一致する年度間クロスチェックも取れている（`補正後` は資料中に0件）。
    // **骨格予算ではない**（収録 PDF・概要とも「骨格」0件。次期知事選は2027年）。
    // ⚠ **歳出は `民生費`・`衛生費` を持たず `福祉生活費`・`保健環境費`** — 長崎の `生活福祉費`/`環境保健費` とは
    //    **語順が違う別体系**、青森の `環境保健費` とも別物。標準款へ黙って寄せない。
    //
    // ⚠ 採らなかった「当初予算案の概要」の歳入表は**沖縄・奈良型の罠**（実測）: ①左端の縦書き
    //    「自主財源」「依存財源」が款名の頭に1文字ずつ混入 ②中間小計行が款と同型 ③`臨時財政対策債` が
    //    県債の内数として同じ列に並ぶ。R8 は臨財債が2年連続0 なので、小計を外した瞬間に
    //    **Σ 4系統とも差0 で素通りしうる**。将来テキストに戻っても使わないこと。
    id: "oita-ken-zaisei-jokyo-r8",
    title: "大分県財政状況（令和8年6月公表）— 令和8年度当初予算（第2表 一般会計歳入予算の構成 / 第8表 歳出予算の目的別内訳）",
    publisher: "大分県",
    url: "https://www.pref.oita.jp/uploaded/attachment/2269676.pdf",
    landingPage: "https://www.pref.oita.jp/site/zaiseisugata/zaisei-jyokyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "大分県（一般会計・都道府県・団体コード440001）",
    // 「免責事項・リンクについて」（/site/userguide/menseki.html・確認日 2026-07-27）の「著作権について」。
    // ⚠⚠ **カタログの CC BY を書いてはいけない（が、将来書ける見込みがある）**。大分県オープンデータ
    //   カタログ（BODIK・CC BY 4.0）には**本資料と同じシリーズ**「大分県財政のすがた（財政状況の公表）」が
    //   **ファイル直リンク単位で37件登載**されており、カタログ側のコピーと本体サイトのコピーが
    //   **sha256 一致**することまで確認済み（＝愛媛と同じ根拠の強さ）。**しかし R8年6月公表版はまだ未登載**
    //   （最新は令和7年12月公表・毎年12月にまとめて追加する運用に見える）。
    //   → **登載されていない資料を open と表示するのは §9g の逆方向の事故**なので R8 は要許可のまま。
    //   ⚠ **2026年12月以降に再確認すれば CC BY へ振替できる見込み**（license 欄の更新候補）。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。「トップページ以外のページへのリンクを
    //   希望される場合は，それぞれ担当課へお問い合わせ願います。」＝広島・宮城の第2群そのもの。
    noDeepLink: true,
    license:
      "大分県ホームページ全体及び大分県ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分県及び第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 10, // 印字 -6-（ズレ +4）
      expenditurePage: 18, // 印字 -14-
      revenueHeading: "一般会計歳入予算の構成",
      expenditureHeading: "歳出予算の目的別内訳",
      kanNoless: true, // 両表とも款番号が無い
      revenueHeaderExtra: "のとおりです", // 表の直前の散文が款1 に化けて Σ が +2 ずれる
      expenditureHeaderExtra: "のとおりで", // R8 では no-op。年度が変わったときの保険
    },
  },
  {
    // 宮崎県（都道府県・団体コード 450006。⚠ 宮崎市 452017 と別物）。議会提出「予算事項別明細書」
    // （768p）巻頭の「歳入歳出予算事項別明細書 総括」。**目次が11ページあるので印字 +14 = 物理**。
    //   歳入 印字5-6 → **物理 p.19-20** / 歳出 印字7-8 → **物理 p.21-22**（実ページを開いて確認）。
    //
    // ⚠⚠ **合計行の「ラベル」と「金額」が別行**（`totalAmountNextLine` の初例）。
    //    `歳 出 合 計` の行に整数が0個で、合計行の pre-scan が候補を立てられず
    //    **「歳出合計 行が見つかりません」で throw する**（実測）。⚠ 款行も同じ2行構成だが、
    //    そちらは既存の折返し分岐（台東型）がそのまま拾うので詰まるのは合計行だけ。
    // ⚠ **`expenditureHeaderExtra` は防御的に付けてある**。歳出のヘッダは3段で `一般財源` 段と
    //    `国庫支出金 地方債 その他` 段が `KAN_HEADER_RE` に1つも当たらない。**R5〜R8 では直後に空行が
    //    あるため `reset()` が救っていて款1 はクリーン**（付けても外しても結果同一＝実測）だが、
    //    **空行が消えた年度では款1 が `一般財源国庫支出金地方債その他議会費` になり Σ は4系統とも
    //    差0 のまま素通りする**。⚠ `国庫支出金` は**歳出側だけ**に効かせる（歳入に実在の款がある）。
    // ⚠⚠ **6月補正の明細書が同じ年度ページに並び、表紙・柱・見出し・合計ラベルが当初と完全に同じ**。
    //    総括の物理ページだけ 11-14 にずれる。**当初のページ番号を当てれば throw する**が、
    //    **補正 PDF の正しい総括ページに同じ見出しを当てると Σ 4系統とも差0・款名クリーンで静かに通る**
    //    （列が `補正前の額／補正額／計` なので**前年度列に補正額が入る**）。長崎の6月補正と同型だが、
    //    宮崎は**前年度列が当初額ですらない**ぶんタチが悪い。⚠ ただし前年度合計が 14億円と桁違いに
    //    小さくなるので、**収録レビューで前年度合計を1回見れば気づける**。fetch する URL が
    //    当初のもの（`106626/…20260219100915`）であることを必ず確認すること。
    // 前年度列は**年度間クロスチェックで確定**（R7 の当年度列と歳入15款・歳出14款・合計の29行すべて一致）。
    // **骨格予算ではない**（明細書・概要とも「骨格」0件）。⚠ ただし**宮崎県知事選は2026年12月**なので、
    //    **R9 当初が骨格予算になる可能性が高い**。R9 を足すときは原典の予算編成方針を必ず読むこと。
    // **款体系は完全に標準**（民生費・衛生費・土木費をすべて持つ）。県固有は `県税`・`県債`・
    //    `地方消費税清算金`・`交通安全対策特別交付金`・`警察費`・`労働費`。
    //    ⚠ 歳入13 繰越金は当年度・前年度とも **0 を印字**（空欄でも `－` でもない）＝`dashAsZero` は不要。
    id: "miyazaki-ken-yosansho-r8",
    title: "令和8年2月宮崎県議会定例会提出 予算事項別明細書（令和8年度当初分・歳入歳出予算事項別明細書 総括）",
    publisher: "宮崎県",
    url: "https://www.pref.miyazaki.lg.jp/documents/106626/106626_20260219100915-1.pdf",
    landingPage: "https://www.pref.miyazaki.lg.jp/zaisei/kense/zaise/20260208115417.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "宮崎県（一般会計・都道府県・団体コード450006）",
    // 「『宮崎県ホームページ』のご利用について」（/kohosenryaku/kense/koho/index-02.html・
    //   更新 2026-04-01・確認日 2026-07-27）の「著作権について」節。
    // ⚠ 宮崎県オープンデータカタログ（BODIK・CC BY 4.0）は**本資料に及ばない** — 規約が自ら
    //   `odcs.bodik.jp/450006/ 以下のディレクトリ` に範囲を限り、全484件を実検索して `予算` 7件・
    //   `決算` 0件・`明細` 0件。⚠ 愛媛型を疑って県財政課名義の「当初・補正予算データ」の中身まで
    //   開いたが、リソースは**H27.9月補正の XLSX 3本だけ**で R8 の明細書は無い。掲載ページに CC バッジも無い。
    // ⚠ **`noDeepLink` は立てない**（人が原文を読んで判断）。原文は「自由にリンクを設定していただけます。
    //   事前に連絡する必要はありません」＋条件はフレーム内表示の禁止のみ＝第3群（熊本・京都・愛知・奈良）。
    //   個別ページへの言及はあるが**「予告なしに変更・削除することがあるのでご理解の上」という免責**で、
    //   静岡・青森の「記載内容が十分に伝わらないページへの直接リンクは避けてください」のような
    //   **回避の依頼ではない**。第2群と読み違えないこと。
    license:
      "「宮崎県ホームページ」に掲載されている情報（文章、写真、イラスト等）の著作権は、県に帰属します。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 19, to: 20 },
      expenditurePages: { from: 21, to: 22 },
      revenueHeading: "総括（歳入）", // 柱（running head）。全角括弧
      expenditureHeading: "総括（歳出）",
      expenditureHeaderExtra: "一般財源|国庫支出金", // 空行に依存している汚染防止の保険（上記）
      totalAmountNextLine: true, // 合計ラベルと金額が別行
    },
  },
  {
    // 香川県（都道府県・団体コード 370002。⚠ 高松市 372013 と別物なので id を `kagawa-ken-` にする）。
    // 予算課「財政事情」＝**地方自治法243条の3 の財政状況の公表**（静岡・大分に続く3例目）。
    // 5月号／11月号の年2回で、**5月号（奇数号）の巻頭「Ⅰ 令和N年度当初予算の概要」**（14p 抜粋 PDF）に
    // 款別2表が入る。**物理 p.3 = 第1表 歳入15款 / 物理 p.8 = 第3表 歳出目的別14款**。印字ノンブルとのズレ0。
    // ⚠ **5月号は当初予算の成立後（5月下旬）に出る**（R8版の Last-Modified は 2026-05-27）ので、
    //    **毎年2〜5月は最新年度が無い**。大阪府あらまし・大分と同じ制約。
    //    その期間に議案ルートへ逃げてはいけない（下記）。
    //
    // ⚠⚠ **議案の「総括表・参考資料」を使ってはいけない**（実測・新しい「静かに壊れる」型）。
    //    同じ p.7 に**「６ 部別予算」と「７ 目的別歳出予算」が縦積み**されており、
    //    **両表の合計行の数値が完全に一致する**（`計 522,199,000 496,706,000 25,493,000`）ため、
    //    合計行の pre-scan が先に来る**部別**を掴み、**部局名12件が款として出たまま Σ 差 +8 で通りかける**
    //    （+8 は列見出しを款と誤読した分で、それが無ければ**差0 で完全に素通り**していた）。
    //    ⚠ `samePage` では救えない（歳入ページ側の「計」が1個しかない）。
    //    歳入側も `暫定税率・環境性能割の廃止補てん分`（地方特例交付金の内数）と `臨時財政対策債`
    //    （県債の内数）が同じ列に並んで Σ が +5,060,008 ずれる（沖縄・奈良・石川と同型）。
    // ⚠ 議案の「予算説明書 総括表」「歳入」「歳出」は**スキャン画像**（7016×4960 の stencil）。
    // ⚠ **`expenditureTotalLabel: "合計"` が必須**（歳出だけラベルが `合計`。歳入は既定の `歳入合計` が当たる）。
    //    外すと「歳出合計 行が見つかりません」で throw する（実測）。
    // 前年度列は**原文が「令和７年度 当初予算額B」と明記**。加えて第155号（R7）・第153号（R6）との
    //    年度間クロスチェックで全29行一致（列順の反転も同時に否定できている）。
    // **骨格予算ではない**（財政事情・概要・総括表の3ファイルを grep して「骨格」0件）。
    // **款体系は完全に標準**（民生費・衛生費・土木費をすべて持つ）。県固有は `県税`・`県債`・
    //    `地方消費税清算金`・`交通安全対策特別交付金`・`警察費`。
    id: "kagawa-ken-zaisei-jijo-r8",
    title: "香川県財政事情 第157号（令和8年5月号）— 令和8年度当初予算の概要（第1表 一般会計歳入予算の内訳 / 第3表 一般会計歳出予算の目的別内訳）",
    publisher: "香川県",
    url: "https://www.pref.kagawa.lg.jp/documents/8155/157_01-14_r8toshogaiyo.pdf",
    landingPage: "https://www.pref.kagawa.lg.jp/yosan/sogo/z-jijou.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "香川県（一般会計・都道府県・団体コード370002）",
    // 「このサイトについて」（/kocho/koho/kohosonota/about.html・確認日 2026-07-27）の「著作権について」。
    // ⚠⚠ **カタログの CC BY を書いてはいけない（が、将来書ける見込みが高い）** — 大分と同型。
    //   香川県オープンデータカタログ（全607件）には「当初予算の概要（令和N年度）」が **H28〜R7 の10年分**
    //   登載され、各リソースに「表示（CC BY）」バッジが付く（ファイル直リンク単位）。
    //   **しかし令和8年度版は 2026-07-27 時点で未登載**（`当初予算` の実検索11件の最新が R7）。
    //   かつ**登載されているのは XLSX であって本資料（財政事情 PDF）ではない**（`財政事情` は0件）。
    //   → 登載されていない資料を open と表示するのは §9g の逆方向の事故なので R8 は要許可のまま。
    //   ⚠ **R8版が登載されたら振替を再確認する**（license 欄の更新候補。大分と同じ扱い）。
    // ⚠ **`noDeepLink` は立てない**（人が原文を読んで判断）。「リンクは、原則として自由です」で、
    //   制限はフレーム内表示の禁止と事後報告のお願いのみ＝第3群＋第4群。トップページ以外を断る文言も
    //   PDF を名指しする文言も無い。⚠ ただし**フレーム内表示の禁止があるので HTML をサンドボックス
    //   iframe で開く導線には流用しない**（本資料は PDF なので PdfViewer 経路・要許可で発行元へ振替）。
    license:
      "当サイトに掲載されている個々の情報（文章・写真・イラストなど）は、著作権の対象となっています。また、当サイト全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。当サイトの内容の全部または一部については、私的使用または引用など著作権法上認められた行為として、適宜の方法により出所を明示することにより、引用・転載複製を行うことができます。ただし「無断転載を禁じます」などの注記があるものについては、それに従ってください。当サイトの内容の全部または一部について、無断で改変を行うことはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3, // 印字 -3-（ズレ0）
      expenditurePage: 8, // 印字 -8-
      revenueHeading: "一般会計歳入予算の内訳",
      expenditureHeading: "一般会計歳出予算の目的別内訳",
      expenditureTotalLabel: "合計", // 歳出だけ「合計」。外すと throw
    },
  },
  {
    // 秋田県（都道府県・団体コード 050008。⚠ 秋田市 052019 と別物）。
    // 「予算に関する説明書（事項別明細書）」（538p）巻頭の「一般会計歳入歳出予算事項別明細書 1 総括」。
    // **印字ページ＝物理ページ（ズレ0）**。歳入 p.7（15款）/ 歳出 p.8（14款）。
    // ⚠ 見出しは**全角の亀甲括弧** `〔歳入〕` `〔歳出〕`（原典が U+3014/U+3015）。省略すると throw する。
    //
    // ⚠⚠ **`expenditureHeaderExtra: "一般財源"` が無いと静かに壊れる**（実測）。歳出の財源内訳ヘッダが
    //    4段で、3段目の `一 般 財 源` だけが `KAN_HEADER_RE` のどの語にも当たらず断片として溜まり、
    //    **款1 が `一般財源議会費` に化けたまま Σ が当年度・前年度とも差0 で通る**
    //    （神奈川・千葉・岡山・岩手と同型）。収録後に款1 の款名を必ず目視すること。
    // ⚠⚠ **前年度（R7当初）が骨格予算**。⚠ **これは `prevNote` を書くべき数少ない型** —
    //    骨格なのが**前年度側**なので「前年度額がどの基準か」を伝える欄の役目にちょうど当たる
    //    （長崎 R8・石川 R8 は**当年度**が骨格なので registry コメント止まりにした。区別すること）。
    //    根拠は別資料「令和7年度当初予算の概要」物理 p.5 の
    //    「令和７年度当初予算については、４月に知事改選期を迎えることから骨格予算とするが…」。
    //    ⚠ 県自身の公表は**肉付け後**（5,986億円）に対する +0.9% で、本資料どおりの前年当初比（+4.6%）とは
    //    食い違う。読者が県の発表と突き合わせたときに気づけるよう prevNote に書いてある。
    // ⚠ 年度ページに並ぶのは**当初1本だけ**（補正の説明書は別ページ）＝山口・宮崎型の取り違えは無い。
    // ⚠ **URL にフォルダ名「新規フォルダー」が入る**（発行元の作業痕・R8 のみ。R7/R6 にはこの階層が無い）。
    //    年度ページ ID も連番でない（R8=94507 / R7=86977 / R6=79926 / R5=72425）ので年度追加は必ずページから辿る。
    // ⚠ **R5 は収録不可の候補**（未検証のため台帳には入れていない）— 歳入総括は読めるが
    //    **歳出総括（物理 p.8）が `pdftotext` でノンブルしか返さない**。大分型のアウトライン化の疑いだが
    //    `qpdf --qdf` での確認は未実施。年度を足すときに調べること。
    // 前年度列の基準は**年度間クロスチェックで確定**（R8前年度合計 577,345,000 = R7当年度合計、
    //    R7前年度合計 584,234,000 = R6当年度合計。款単位でも一致）。**款体系は完全に標準**。
    id: "akita-ken-setsumeisho-sokatsu-r8",
    title: "令和8年度 秋田県予算に関する説明書（一般会計歳入歳出予算事項別明細書 1 総括）",
    publisher: "秋田県",
    url: "https://www.pref.akita.lg.jp/uploads/public/archive_0000094507_00/%E6%96%B0%E8%A6%8F%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E3%83%BC/%E4%BA%88%E7%AE%97%E6%9B%B8%E3%80%90%EF%BC%96%E3%80%91%EF%BC%88%EF%BC%92%E6%9C%88%E8%AD%B0%E4%BC%9A%E3%83%BB%EF%BC%B2%EF%BC%98%E5%BD%93%E5%88%9D%E4%BA%88%E7%AE%97%E5%88%86%EF%BC%89.pdf",
    landingPage: "https://www.pref.akita.lg.jp/pages/archive/94507",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "秋田県（一般会計・都道府県・団体コード050008）",
    // 「著作権・リンク・免責事項」（/pages/about-copyright・確認日 2026-07-27）の「著作権について」節。
    // ⚠ 秋田県オープンデータカタログ（CC BY 4.0）は**本資料に及ばない** — 規約が自ら
    //   「『秋田県オープンデータカタログサイト』…の御利用に際しての規約」と範囲を限っており、
    //   CKAN 全263データセットを API で全件列挙して実検索しても `当初予算` 0件・`事項別明細書` 0件。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。「（２）各ページへのリンク　トップページ
    //   以外へのリンクについては、各ページ下欄に記載の部署にお問い合わせください。」＝第2群。
    noDeepLink: true,
    license:
      "「美の国あきたネット」に掲載されている文章、写真、画像、動画、その他全ての情報は著作権の対象となっています。また、「美の国あきたネット」全体も編集著作物として著作権の対象となっており、共に著作権法により保護されています。これらの情報については、秋田県または第三者が著作権を有しており、「私的利用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "〔歳入〕", // 亀甲括弧（原典どおり）
      expenditureHeading: "〔歳出〕",
      expenditureHeaderExtra: "一般財源", // ⚠ 必須。外すと款1=「一般財源議会費」で Σ 差0 のまま通る
      prevNote:
        "前年度（令和7年度）の当初予算は、知事改選期のため骨格予算として編成されています（秋田県「令和7年度当初予算の概要」p.5）。県が公表している対前年比は肉付け後（5,986億円）に対する +0.9% ですが、ここでの前年度額は骨格予算の当初額（5,773億円）です。",
    },
  },
  {
    // 富山県（都道府県・団体コード 160008。⚠ 富山市 162019 と別物）。
    // 「令和8年度当初予算説明書」（649p・InDesign 製 born-digital）巻頭の
    // 「⑴ 歳入歳出予算事項別明細書 1 総括」。歳入 **物理 p.5** / 歳出 **物理 p.6**（印字 −1−/−2− ＝**ズレ +4**）。
    //
    // ⚠⚠ **歳入款2「利子割清算金」の前年度セルが完全な空欄**（`prevBlankAsZero` の初例）。
    //    R8 新設で `－` すら印字されず「皆増」の語も無いため ints が `[当年度, 比較]` の2つに詰まり、
    //    既定は**比較列 512,000 を前年度として読んで前年度歳入Σが +512,000 ずれる**（実測）。
    //    ⚠ 前年度Σの不一致は **error ではなく warning** なので derive まで流れ、画面の前年度合計と
    //    caveats に嘘が出る。⚠ **`dashAsZero` では救えない**（ダッシュが無い）。
    //    ⚠ **`amountTypos` も使わない** — あれは「原典の誤植」用で空セルは誤植ではないし、
    //    from 文字列が版面の空白数に依存して腐る（偵察はこちらを提案してきたが採らなかった）。
    //    → 款番号で明示する `prevBlankAsZero` を新設した。**R7・R6 には書かない**（素で4系統差0）。
    //    ⚠ **R9 で発行元が前年度額を埋めたら ints が3個になり throw する**（気づける設計）。
    //    空欄が 0 であることは原典自身が別資料「予算規模」PDF 物理 p.2 で `-` ＋ `皆増` と印字して裏取り済み。
    // ⚠ **見出しは柱の `一般会計` を採る**（`歳入`/`歳出` より強い）。同じ説明書内に合計行を持つ
    //    特別会計の総括ページが3枚ある（物理 p.370 / p.389 / p.427）が、**いずれも `一般会計` を含まない**
    //    ので、ページがずれた年度で確実に throw する（奈良型の事故を構造的に防ぐ）。
    // ⚠ `expenditureHeaderExtra` は R8 では no-op（財源内訳サブヘッダの直後に空行があり `reset()` が効く）。
    //    **空行が消えた年度では `国支出金地方債その他議会費` になり Σ を素通りする**ので保険で付けてある（宮崎と同型）。
    //    ⚠ `国支出金` は歳出側だけ（歳入には実在の款 `国庫支出金` がある）。
    // ⚠ **`予算規模` PDF の歳入表を使ってはいけない** — 繰入金・県債の下に内数が並び、財産収入・寄附金・
    //    繰越金・諸収入が `諸収入・その他` 1行に丸められて13行しかない（沖縄・奈良型の再分類表）。
    // ⚠ **ファイル名の年度規則が壊れている**（`08/07yosansetsumeisyo` → R6 `0602yosansetumeisyo` →
    //    R5 `06_05tosyosetsumeisyo` → R3 `r03tousyosetumeisyo`。`setsu`↔`setu`・`tosyo`↔`tousyo` が揺れる）。
    //    `documents/` の ID も年度ごとに別。**必ず年度ページのリンク文言から辿ること**。
    // 前年度列は**年度間クロスチェックで確定**（R8前年度 = R7当年度 600,663,987、R7前年度 = R6当年度 612,655,531・全款一致）。
    // **骨格予算ではない**（説明書・議案書・予算規模・ポイントの4本を grep して0件。県知事選は2024年10月）。
    // **款体系は完全に標準**。⚠ 歳入款14 繰越金は両年度とも 1千円（象徴計上・原典どおり）。
    id: "toyama-ken-yosansetsumeisho-r8",
    title: "令和8年度 富山県当初予算説明書（歳入歳出予算事項別明細書 1 総括）",
    publisher: "富山県",
    url: "https://www.pref.toyama.jp/documents/52665/08yosansetsumeisyo.pdf",
    landingPage: "https://www.pref.toyama.jp/1105/kensei/kenseiunei/zaisei/yosan/r08yosan/r08tousyoyosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "富山県（一般会計・都道府県・団体コード160008）",
    // 「リンク・著作権・免責事項について」（/1021/kensei/kouhou/0.html・更新 2021-03-26・確認日 2026-07-27）。
    // ⚠ 旧「富山県オープンデータポータルサイト」（opendata.pref.toyama.jp）は **NXDOMAIN で消滅**して
    //   おり（県ページのリンクは残存だが死んでいる）、後継の「富山データ連携基盤」CKAN を API で
    //   実検索しても `予算` 0件・`決算` 0件・`説明書` 0件（`財政` 2件は市町村財政の XLSX）。
    //   → CC BY は本資料に及ばない。
    // ⚠ **`noDeepLink` は立てない**（人が原文を読んで判断）。「リンクは、原則として自由です」で、
    //   条件は①「トップページ以外へリンクされる場合は、ページの構成変更等によりリンクがとぎれることが
    //   ありますのでご了承ください」＝**リンク切れの免責**（回避の依頼ではない）②フレーム内取り込みの禁止、
    //   の2つだけ＝第3群（宮崎と同型）。⚠ ①を第2群と読み違えないこと。
    license:
      "このウェブサイトに掲載されている文章、画像等の著作権は、富山県または文章、画像等の提供者の方にあります。これらの著作物は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で複製・転用することはできません。利用許諾については各ページに記載されているお問い合わせ先の所属へご連絡ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "一般会計", // 柱を採る（特会の総括ページを構造的に弾く）
      expenditureHeading: "一般会計",
      expenditureHeaderExtra: "国支出金", // R8 では no-op。空行が消えた年度の保険
      prevBlankAsZero: { revenue: [2] }, // 款2 利子割清算金の前年度セルが完全な空欄
    },
  },
  {
    // 和歌山県（都道府県・団体コード 300004。⚠ 和歌山市 302015 と別物なので id を `wakayama-ken-` に
    // 分け、`wakayama-` は市のために空けておく）。「令和8年度予算の概要」の分冊
    // **Ⅳ 一般会計予算資料 (1) 款別予算額調**（5p・214KB）。歳入 p.1 / 歳出 p.2（印字 -21-/-22- ＝ズレ −20）。
    //
    // ⚠ **同じ数字が3つのファイルにある**（3つとも Σ4系統差0 を実測・数値も完全一致）。この分冊を採る理由:
    //   ①**列見出しが「令和8年度当初予算 (Ａ)／令和7年度当初予算 (Ｂ)」と原典に明記**されており、
    //     前年度列の基準を推測しなくてよい（説明書側は「前年度予算額」としか書かれていない）
    //   ②見出し `款別予算額調` は**一般会計にしか無い**ので、下記の特別会計取り違えを構造的に防ぐ
    // ⚠⚠ **特別会計の分冊が一般会計と完全に同一版面**（奈良と同型）。`bositokkai.pdf`（母子父子寡婦福祉資金
    //    特別会計）は1ページ目が `1 総括 (歳入)` ＋ `歳入合計` で、**弱い見出し `(歳入)` では弾けない**
    //    （2款だけ取れて Σ も通り、気づけるのは総額 123,284千円 が桁違いに小さいことだけ）。
    //    `款別予算額調` なら即 throw する。
    // ⚠ 6月補正のページにも**同名の `soukatu.pdf`** があり見出し・合計ラベルまで当初と同一。
    //    当初の opts を当てると Σ が大きく崩れて落ちる（静かには通らない）ことは実測済みだが、
    //    URL のディレクトリ ID（当初 = `d00221758_d`）を必ず確認すること。
    // ⚠⚠ **`prevColumnFirst` を立ててはいけない**。立てると **Σ が4系統とも差0・款名クリーンのまま
    //    両年度が入れ替わる**（実測。石川・北海道と同型）。年度間クロスチェックだけが検出する。
    // ⚠ **R7・R6・R5 の総括分冊はテキストがアウトライン化**（大分と同型・`pdftotext` が2バイト）。
    //    過年度を足すなら総括分冊ではなく**予算説明書本体**を使う（R7 は p.6/p.7 で読めることを偵察が実測）。
    // ⚠ **年度でファイル名規則が完全に壊れる**（`ippannkaikei` / `soukatu` / `03` / `01` / `00soukatu` /
    //    `zikoubetu` / `settumeisyo`）。年度追加は必ず「予算の概要」インデックスから辿ること。
    // ⚠ **R5 と R7 の当初予算額はどちらも 613,813 百万円**（原典の系列がそう書いている）。
    //    過年度追加時に「パースがずれた」と誤認しないこと。
    // **骨格予算ではない**（前知事の死去に伴う知事選は令和7年6月1日執行で、R8 当初は現職の通常予算。
    //    編成方針・概要・本資料を grep して「骨格」0件）。**款体系は完全に標準**。
    id: "wakayama-ken-yosan-shiryo-r8",
    title: "令和8年度 和歌山県予算の概要（Ⅳ 一般会計予算資料 (1) 款別予算額調）",
    publisher: "和歌山県",
    url: "https://www.pref.wakayama.lg.jp/prefg/010400/d00221758_d/fil/ippannkaikei.pdf",
    landingPage: "https://www.pref.wakayama.lg.jp/prefg/010400/d00221758.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "和歌山県（一般会計・都道府県・団体コード300004）",
    // ⚠⚠ **`open`。ただし根拠が愛媛とは違う** — 愛媛は「資料そのものがカタログに登載」だが、
    //   和歌山は**「和歌山県ホームページ公開情報利用規約」がサイト全体に適用される**
    //   （/prefg/000200/opendata/hpopendatakiyaku.html・平成28年6月1日制定・確認日 2026-07-27）。
    //   政府標準利用規約(第2.0版)型で CC BY 4.0 互換を明記し、**規約が自ら範囲を限っていない**
    //   （適用外は第三者権利物・写真/ロゴ/キャラクター・個別法令の制約・別ルールを明示したコンテンツ の4つだけ）。
    //   → 掲載ページ（d00221758.html）を実際に開いて**別ルールの明示が無い**ことを確認済み
    //   （本文・フッターとも「リンク・著作権について」への導線だけ）。
    //   ⚠ **決め手はもう1つある** — その「リンク・著作権について」（/prefg/000200/copyright.html）**自身が**
    //   「著作権やデータの二次利用等の詳細については、下記リンク先の『和歌山県ホームページ公開情報利用規約』を
    //   ご覧ください。」と**利用規約へ委譲していて、独自の禁止文言を持たない**（実測）。
    //   ＝「サイトポリシー側に別の禁止があるのでは」という疑いが構造的に消える。
    //   なお規約1(1)は「数値データ、簡単な表・グラフ等は著作権の対象ではありません」とも述べており、
    //   款別予算額表はこちらにも当たる。
    //   ⚠ BODIK カタログ（全109件）に本資料は非登載だが、**本件の open はカタログではなく
    //   サイト全体規約に依拠する**ので影響しない。
    // ⚠ **license 欄には規約の原文だけを入れる** — 「リンク・著作権について」の文言を併記しない
    //   （§9g。判定を狂わせる）。
    // ⚠ リンク方針は第2群（個別ページは要事前連絡）だが、**open の資料では `noDeepLink` は
    //   評価されない**（derive の振替分岐が permission-required 限定）ので立てない。愛媛と同じ判断。
    license:
      "県ホームページのコンテンツは、後述の2に規定する本利用ルールが適用されないコンテンツを除き、どなたでも本利用規約に従って複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます。商用利用も可能です。本利用ルールは、クリエイティブ・コモンズ・ライセンスの表示4.0 国際（https://creativecommons.org/licenses/by/4.0/legalcode.ja に規定される著作権利用許諾条件。以下「CC BY」といいます。）と互換性があり、本利用ルールが適用されるコンテンツはCC BYに従うことでも利用することができます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 2,
      revenueHeading: "款別予算額調", // ⚠ 一般会計にしか無い語。`(歳入)` だと特会分冊を弾けない
      expenditureHeading: "(歳出)", // 半角括弧
    },
  },
  {
    // 佐賀県（都道府県・団体コード 410004。⚠ 佐賀市 412015 と別物）。
    // 「令和8年2月定例県議会 予算説明書」（589p）の「1 歳入歳出予算事項別明細書（1）総括」。
    // 歳入 **物理 p.7-11** / 歳出 **物理 p.13-18**（印字 = 物理 −6。p.12 は空白ページ）。
    //
    // ⚠⚠ **款と項が同一表で、項が1つしかない款は款行に項番号＋項名が同居する**
    //    （`kanRowInlineKoNo` の初例。歳入15款中7款・歳出14款中3款で発生）:
    //      `2 地方消費税清算金   1 地方消費税清算金     47,596,000    46,366,000    1,230,000`
    //    既定は先頭の整数 `1`（項番号）を**当年度額として読み**、その款が `1` になって全列が1つずれる。
    //    Σ が大きく割れるので**静かには壊れない**が収録できなかった。
    //    ⚠ `revenueCropX` では救えない（項カラムが**款名と金額の中間帯**にあり `-x/-W` は連続1帯しか切れない）。
    // ⚠ **`kanIndentMax: 2` も必須**（項行を落とす）。外すと歳入50款・歳出69款になる。
    //    ⚠ そのとき**歳入当年度の差が +284,483 と小さい**ので「ほぼ合っている」と誤読しないこと。
    // ⚠⚠ **同じ掲載ページに補正の説明書が並び、総括の物理ページも見出し `（歳入）`『（歳出）』も同一**。
    //    → **`revenueHeading` に `歳入歳出予算事項別明細書` を採る**（補正版の柱は
    //    `歳入歳出**補正**予算事項別明細書` なので throw する＝実測）。**`（歳入）` を見出しにしない**。
    //    ⚠ 歳出側には柱が無いので `（歳出）` しか使えず、**歳出だけでは補正版と見分けられない**。
    //    ページ指定と歳入側の見出しの2枚で守っている。当初は `3_117997_up_6cba1aek.pdf`（589p）、
    //    補正は `3_117997_384404_up_ys06rk3l.pdf`（431p）で**ファイル名に年度も種別も入らない**。
    // ⚠ `比較` 欄は差が0のとき空欄になる（款13 繰越金 100/100・款14 予備費 200,000/200,000）＝
    //    **整数2個で終わる款行が正常に存在する**。項レベルでも起きる（款3 地方譲与税の項3 石油ガス譲与税）。
    // 前年度列の基準は**年度間クロスチェックで確定**（R8前年度合計 513,021,000 = R7説明書の当年度合計・款単位でも一致）。
    //    加えて「令和8年度当初予算の概要」p.1 の「対前年度当初比 340億45百万円増」が比較列合計と一致。
    // **骨格予算ではない**（概要 PDF に「骨格」0件）。⚠ ただし**佐賀県知事選は2027年1月見込み**なので
    //    **R9 が骨格になる可能性**がある。R9 を足すときは編成方針を必ず読むこと。
    // **款体系は完全に標準**。⚠ **R6 だけ掲載ページを特定できていない**（年度一覧にも Wayback にも無い）。
    id: "saga-ken-yosansho-r8",
    title: "令和8年2月佐賀県定例県議会提出 予算説明書（令和8年度当初・歳入歳出予算事項別明細書 総括）",
    publisher: "佐賀県",
    url: "https://www.pref.saga.lg.jp/kiji003117997/3_117997_up_6cba1aek.pdf",
    landingPage: "https://www.pref.saga.lg.jp/kiji003117997/index.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "佐賀県（一般会計・都道府県・団体コード410004）",
    // サイトポリシー（/kiji00348029/index.html・最終更新 2018-03-22・確認日 2026-07-27）の著作権条項。
    // ⚠ 佐賀県のオープンデータ（BODIK・組織 410004・全526データセット）は**本資料に及ばない** —
    //   CKAN API で実検索して `予算` 0件・`当初予算` 0件・`款` 0件（`決算` 5件・`財政` 14件は
    //   すべて統計年鑑の決算統計）。`resource_search url:pref.saga.lg.jp/kiji0031` も 0件
    //   （＝ファイル直リンク単位の登載も無し）。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断）。「トップページ以外のページへのリンクを
    //   希望される場合は、それぞれ担当課へお問い合わせ願います。」＝第2群。
    noDeepLink: true,
    license:
      "「佐賀県庁ホームページ」に掲載されている文字、写真、イラストなどの個々の情報及び「佐賀県庁ホームページ」全体に関する著作権は、原則として佐賀県に帰属します。（ただし、一部の画像等の著作権は、原著作者が所有しています。）「私的使用のための複製」など著作権法上認められた場合を除き、無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 11 },
      expenditurePages: { from: 13, to: 18 },
      revenueHeading: "歳入歳出予算事項別明細書", // ⚠ 補正版と識別できる語。`（歳入）` にしない
      expenditureHeading: "（歳出）",
      kanIndentMax: 2, // 項行を落とす
      kanRowInlineKoNo: true, // 款行に同居する項番号を金額として読まない
    },
  },
  // ---- 都道府県 第11弾（2026-07-30）= 47都道府県の一巡 ----------------------
  // 福井・徳島・高知・島根・鳥取。**5県とも県内の市が未収録**なのでその県で最初のエンティティ。
  // これで **収録可能な44都道府県すべてが揃う**（収録不可は兵庫・沖縄・山形の3県＝unrecordable.ts）。
  // 共通のクセ（個別コメントでは繰り返さない）:
  // - **団体コードは総務省「全国地方公共団体コード」原本 Excel（main_content/000925835.xlsx・
  //   シート「R6.1.1現在の団体」）から実引きした**（`data/normalized/.../R6.json` は市町村しか持たない）。
  //   ⚠ 県と県庁所在市を取り違えない: 福井県 180009 ≠ 福井市 182010 / 徳島県 360007 ≠ 徳島市 362018 /
  //   高知県 390003 ≠ 高知市 392014 / 島根県 320005 ≠ 松江市 322016 / 鳥取県 310000 ≠ 鳥取市 312011。
  // - **5県とも要許可**（`open` は1件も無い）。オープンデータカタログはいずれも規約が自ら適用範囲を
  //   限っており、款別の当初予算資料は非登載であることを各県で実検索して確認した。
  // - **`noDeepLink` は原文を人が読んで判断した**（§11h の5群分類。判断は個別コメント）。
  {
    // 福井県（都道府県・団体コード 180009。⚠ 福井市 182010 と別物なので id を `fukui-ken-` に分け、
    // `fukui-` は県内の市のために空けておく）。
    // 「令和8年度当初予算案説明書」（459p・Adobe InDesign 19.5・text 層あり）巻頭の
    // 「歳入歳出予算事項別明細書 １ 総括」＝**物理 p.7（歳入15款）/ p.8（歳出14款）**。
    // ⚠ **総括2ページにはノンブルの印字が無い**（印字「1」は物理 p.9 から＝以降は 物理 = 印字 +8）。
    // 総額 501,168,107 千円・前年当初比 **−0.11%**（当初比較で「減」になる県は珍しい）。
    //
    // ⚠⚠ **見出しに `（歳入）`/`(歳出)` を採ってはいけない**。同じ版面の「令和7年度2月補正予算案説明書」が
    //    別ページにあり、**総括が同じ物理 p.7/p.8・見出しも一致**するため、当初と同じ opts で当てると
    //    **Σ 4系統のうち3系統が差0 で素通りする**（残る1系統＝歳入前年度の不一致も **warning** なので
    //    derive まで流れる＝「静かに通ってしまうが中身が違う」型）。→ **列見出しの `前年度予算額` を
    //    見出しに採る**（補正版は列が `補正前の額／補正額／計` なので即 throw する＝実測）。
    //    ⚠ 加えて**括弧の全角/半角が年度で揺れる**（R8 は歳入が全角 `（歳入）`・歳出が半角 `(歳出)`）ので
    //    見出しに使うと年度追加のたびに壊れる。
    // ⚠ **款名を標準名に寄せないこと** — 原典は歳出款6 が **`農林水産費`**（`農林水産業費` ではない）、
    //    歳入款7・8 が **`分担金および負担金`・`使用料および手数料`**（`及び` ではなく**ひらがな**）。
    //    他の46都道府県とは款名の文字列が違うが**原典どおりが正**（款名の全件目視で確認済み）。
    // ⚠ **「予算の概要」PDF は使わない** — 物理 p.4-12 が**アウトライン化**（`pdftotext` がノンブル
    //    5バイトのみ・`qpdf --qdf` で全体 `Tj` 30本に対し `m` 20,843 / `l` 74,506 / `c` 166,641＝表が図形。大分型）。
    // **骨格予算ではない**（「予算の概要」物理 p.2 の推移グラフ注記「※下線年度は当初予算が骨格予算、
    //    ６月補正が肉付け予算」で下線は H27・R元・R5 のみ＝知事選の年。R8 は無印）。
    //    ⚠ **福井県知事選は2027年4月＝R9 当初が骨格になる可能性が高い**。R9 を足すときは編成方針を読むこと。
    // ⚠ ファイル名の年度規則は壊れている（R8/R7 `rNtousyo_yosanan.pdf` → R6 `r6tosyo_yosanan.pdf`＝
    //    `tousyo`→`tosyo`／R5 `r5tousyo_yosanansetsumei.pdf`）。R4 以前は年度まるごと1本の PDF で様式が変わる。
    // 前年度列の基準は**年度間クロスチェックで確定**（R8 の前年度列＝R7 説明書 p.7/p.8 の当年度列が
    //    歳入15款・歳出14款の**29行すべて一致**・合計 501,734,268）。
    id: "fukui-ken-yosansho-r8",
    title: "令和8年度当初予算案説明書（福井県一般会計・歳入歳出予算事項別明細書 １ 総括）",
    publisher: "福井県",
    url: "https://www.pref.fukui.lg.jp/doc/zaisei/fukuikenyosan/tousyo08_d/fil/r8tousyo_yosanan.pdf",
    landingPage: "https://www.pref.fukui.lg.jp/doc/zaisei/fukuikenyosan/tousyo08.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "福井県（一般会計・都道府県・団体コード180009）",
    // サイトポリシー「福井県ホームページについて」（/doc/dx-suishin/intro.html・確認日 2026-07-30）の
    // 「著作権について」の全文。
    // ⚠ **福井県オープンデータライブラリの CC BY 4.0 は本資料に及ばない** — 規約が自ら適用範囲を
    //   「`/doc/toukei-jouhou/opendata/` 以下のディレクトリにおいて展開されるウェブサイト」に限っており、
    //   本資料は `/doc/zaisei/` 配下。オープンデータ一覧 CSV（全220データ）を実検索しても県予算は
    //   **平成25〜31年の「予算の概要」CSV 10件だけ・令和年度は0件・「説明書」0件**＝本資料は非登載。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断・2026-07-30）。同ページ「福井県へのリンクに
    //   ついて」が **§11h 第2群**（トップページ以外は要問い合わせ）:
    //     「福井県のトップページ(https://www.pref.fukui.lg.jp/)へのリンクについては、ご自由に設定して
    //      ください。福井県への連絡も不要です。」
    //     「ただし、フレーム内に表示するなど、ご自分のサイト内の１コンテンツと他者に認識されるような
    //      方法でのリンクは著作権法に触れる可能性があります。」
    //     「**また、各課のページへのリンクの可否につきましては各課に個別にお問い合わせ頂きますよう
    //      お願いします。**」
    //   予算 PDF は財政課のページ配下なので後段が掛かる。振替先は landingPage。
    noDeepLink: true,
    license:
      "このサイトにおけるコンテンツの著作権は、福井県に帰属します。著作権法上認められた場合を除いては、無断での複製・転用はできません。個々の写真・文章等の二次利用をご希望の方は、それぞれのページの担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      // ⚠ 列見出しを見出しに採る（同じ物理ページ・同じ `（歳入）` を持つ2月補正版を構造的に弾くため）
      revenueHeading: "前年度予算額",
      expenditureHeading: "前年度予算額",
      // 歳出は財源内訳3段ヘッダ（国支出金／地方債／その他・一般財源）。**R8 では no-op を実測**したが、
      // ヘッダ直後の空行だけが款1 を守っているので空行が消えた年度に備えた保険（宮崎・富山と同型）。
      // ⚠ `国支出金` は歳出側だけ（歳入には実在款 `国庫支出金` がある）＝**側で分ける**。
      expenditureHeaderExtra: "国支出金|一般財源",
    },
  },
  {
    // 徳島県（都道府県・団体コード 360007。⚠ 徳島市 362018 と別物）。
    // 「令和8年度当初予算（案）の概要（計数編）」（16p・JUST PDF 4）の
    // **物理 p.3 = 一般会計款別内訳表（歳入）15款 / 物理 p.5 =（歳出）14款**（印字とズレ0）。
    // 列見出しが `令和8年度 当初予算(A)` `令和7年度 当初予算(B)` と**両年度とも「当初」を明記**、
    // 単位も表内に `（単位：千円、％）`。総額 535,758,000 千円（+3.8%）。
    //
    // ⚠⚠ **原典の款番号が `01`〜`15` とゼロ詰め**。パーサの lead は `[1-9]\d*` で 0 を款番号と
    //    認めない設計だったため **`01`〜`09` の9款が丸ごと落ちていた**（Σ が -380,374,753 と大きく
    //    割れるので静かには壊れないが収録できない）。→ **パーサ側で `0?[1-9]\d*` に一般化した**
    //    （2026-07-30・kofu-yosansho.ts のコメント参照。**既存371ソースを再 parse して差分ゼロを実測**。
    //    葛飾 R2 の「0 は廃止款の当年度額」という不変条件も保たれる）。
    //    ⚠ **偵察は `revenueCropX` で款番号列を切り落として `kanNoless` で拾う案を出してきたが採らなかった** —
    //    crop 左端 78pt に対し款番号の右端が 77.82pt・合計ラベルが 79.4pt で**マージンが 0.2pt しかなく**、
    //    版面が動けば静かに壊れる。加えて**原典が振っている款番号を捨てる**ことになる。
    // ⚠ **歳入合計＝歳出合計（どちらも 535,758,000）** なので **Σ はページ取り違えを原理的に検出できない**
    //    （宮城・長野と同型）。網は ①1行完結の見出し `一般会計款別内訳表（歳入）/（歳出）` ②ページ指定。
    //    同じ掲載ページの「令和7年度2月補正予算（案）の概要（計数編）」は表題と `（１）（ 歳 入 ）` が
    //    別行なので当初の見出しでは即 throw する（実測）。
    // ⚠ **`dashAsZero` を立ててはいけない**。R8 では no-op だが R7 以前には
    //    `うち臨時財政対策債  ―  ―  640,000  0.1  皆減` という**内数行**があり、立てると ints が3個になって
    //    廃止款として emit され**幽霊款が1件増える**（沖縄・奈良と同型）。
    // ⚠ **予算説明書ルートは使えない**（`1038895.pdf`・682p・Creator EdianWing）— 数字が
    //    Type 1C / Custom encoding / uni=no のサブセットに入っており、**金額が丸ごとテキストに出ない**
    //    （`県 税 ， ， ， ， ， ，` とカンマだけ残る。神奈川・東京都と同型の「金額ブラックホール」）。
    // **骨格予算ではない**（徳島県知事選は2023年4月＝R5 が骨格。⚠ 次は2027年4月見込みで **R9 が骨格の
    //    可能性**があるので R9 を足すときは編成方針を読むこと）。**款体系は完全に標準**。
    // ⚠ **年度 URL に規則が無い**（掲載ページ R8=7310242 / R7=7300938、添付 R8=1033755 / R7=972859）。
    //    しかも**年度一覧は直近30件しか保持しない**ので R6 以前の掲載ページは辿れない。
    //    ⚠ **R6 は前年度列が `通年予算(B)`（＝R5 の6月現計）**なので足すなら `prevBasis: "補正後"` が要る。
    // 前年度列の基準は**年度間クロスチェックで確定**（R8 の前年度列 = R7 資料 p.3/p.5 の当年度列が
    //    歳入15款・歳出14款とも全件一致・合計 516,040,000）。
    id: "tokushima-ken-yosan-gaiyou-keisu-r8",
    title: "令和8年度 徳島県当初予算（案）の概要（計数編）— 一般会計款別内訳表（歳入）／（歳出）",
    publisher: "徳島県",
    url: "https://www.pref.tokushima.lg.jp/file/attachment/1033755.pdf",
    landingPage: "https://www.pref.tokushima.lg.jp/kenseijoho/zaisei/7310242/",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "徳島県（一般会計・都道府県・団体コード360007）",
    // 「サイトポリシーについて」＞著作権について（/sitepolicy/・確認日 2026-07-30）。
    // ⚠ **オープンデータカタログの CC BY を書いてはいけない** — Our Open Data（全1,917データセット）に
    //   `徳島県予算の概要`（財政課）は登載され CC BY バッジも付くが、**リソースは
    //   `H31当初_計数編.xml` と `R0106月補正_計数編.xml` の2件だけで R8 版は未登載**＝大分・香川と同型。
    //   ⚠ **R8 版が登載されたら振替を再確認する**（そのとき機械可読の XML が手に入る）。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断・2026-07-30）。同ページ「リンクについて」が
    //   **§11h 第2群**: 「トップページ以外の各部局等のページへのリンクについては、各ページに記載の
    //   担当までお問い合わせください。」（加えて第3群相当の「フレーム内に表示させるリンク設定は
    //   行わないでください」も持つ）。
    noDeepLink: true,
    license:
      "徳島県ホームページで提供するすべての情報（文章・写真・イラストなど）について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、徳島県の許可なく複製・転用・販売することはできません。ただし、当県サイトの各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 5,
      revenueHeading: "一般会計款別内訳表（歳入）",
      expenditureHeading: "一般会計款別内訳表（歳出）",
      // 合計ラベルは既定（歳入合計／歳出合計）で当たる（原典は `歳    入   合    計` と字間が空くが compact 後に一致）
    },
  },
  {
    // 高知県（都道府県・団体コード 390003。⚠ 高知市 392014 と別物）。
    // 「第157回高知県財政状況」（R8.6.30 公表・45p）の「（２）一般会計の概要 ア 款別予算の構成」＝
    // **物理 p.5（歳入15款）/ p.6（歳出18款）**（印字 = 物理 −2）。総額 507,097,462 千円（+7.0%）。
    //
    // ⚠⚠ **予算書ルートは全滅**（2026-07-30 実測）。県議会提出議案の「当初予算議案」（65p・26MB）と
    //    「当初予算議案説明」（＝予算に関する説明書・1019p・208MB）は**どちらもアウトライン化**（大分型・
    //    `qpdf --qdf` で議案は `Tj` 0本 / `m` 109,860・`l` 604,476・`c` 852,127、説明書の総括ページは
    //    `Tj` 3本＝ノンブルのみ）。→ **財政状況の公表（地方自治法243条の3）を採る**。
    //    ⚠ **6月公表なので毎年2〜6月は最新年度が無い**（香川・大阪府あらまし・大分と同じ制約＝243条の3 で4例目）。
    //    ⚠ **偶数回（12月公表）は当初予算を扱わない**。`第(2n+1)回 = 6月公表` を選ぶこと。
    // ⚠ **同じ資料の中でも化けの帯が分かれる**（和歌山 R7 と同型）— 物理 p.3・p.4（まえがき／予算の総額）
    //    だけがアウトライン化しており**総額ページはテキストで取れない**。表本体の p.5 は健全。
    // ⚠⚠ **款体系が標準でない**（歳出18款）。`民生費`/`衛生費`/`商工費`/`農林水産業費`/`消防費` が無く、
    //    `危機管理費`・`文化生活費`・`産業振興推進費`・`商工労働費`・`観光振興費`・`農業振興費`・
    //    `林業振興環境費`・`水産振興費` を持つ。**標準款へ黙って寄せない**（山梨県の県固有款と同じ扱い）。
    // ⚠⚠ **見出しに `款別予算の構成` を採ってはいけない** — 掲載ページには第143〜157回（R元〜R8）が
    //    同型で並んでおり、**別の回を掴んでも Σ は差0 で静かに通る**。→ **列見出しの `令和８年度当初`
    //    （全角８）を見出しにして年度を構造的に固定した**（第155回に当てると throw する＝実測）。
    // ⚠ 物理 p.9 に「イ 性質別予算の構成」の（歳入）（歳出）が縦積みで載っており**同じ `令和８年度当初`
    //    を含む**（単位は百万円）。ページがずれた場合は款番号が無いので「款行が1件も抽出できません」で
    //    throw する（実測）＝二重の守り。
    // **合計ラベルは `計` の一字**（青森と同型）。**骨格予算ではない**（本資料・概要とも「骨格」0件。
    //    知事の任期満了は2027-12-06 なので R9 は通常予算の見込みだが、R10 は確認が要る）。
    // ⚠ **`file_contents` の相対リンクは canonical の `/doc/<slug>/` に解決する** —
    //    `/soshiki/110401/file_contents/...` は 301 で組織トップへ飛び、**PDF の名前で HTML が降ってくる**。
    // ⚠ ファイル名に年度規則が無い（`zaiseijoukyou`/`zaiseijyoukyou`/`zaiseijyokyou`/`file_<日時>_1` が混在）。
    // 前年度列の基準は**年度間クロスチェックで確定**（第155回の当年度列 = 本資料の前年度列が
    //    歳入15款＋歳出18款＝**33本すべて一致**）。列見出しにも `令和７年度当初` と明記されている。
    id: "kochi-ken-zaisei-jokyo-r8",
    title: "第157回高知県財政状況（令和8年6月公表）— 令和8年度当初予算の概要（一般会計の概要 ア 款別予算の構成）",
    publisher: "高知県",
    url: "https://www.pref.kochi.lg.jp/doc/zaiseijoukyou-index/file_contents/file_2026629122744_1.pdf",
    landingPage: "https://www.pref.kochi.lg.jp/doc/zaiseijoukyou-index/",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "高知県（一般会計・都道府県・団体コード390003）",
    // 「サイトの運営について」＞著作権等について（/reference/policy.html・確認日 2026-07-30）。
    // ⚠ **高知県オープンデータ利用規約（CC BY 4.0）は及ばない** — 規約が冒頭で
    //   「`http://www.pref.kochi.lg.jp/opendata/` 以下のウェブページ…の利用に際しての規約です」と
    //   **自ら適用範囲を URL で限っており**、本資料は `/doc/zaiseijoukyou-index/` 配下。
    //   カタログ7分野（計655リンク）を実検索しても財政系は「普通会計決算の推移（S44〜）」と
    //   「令和３年度県税決算」の2件だけで**当初予算・財政状況は非登載**。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断・2026-07-30）。同ページ「リンクについて」に
    //   **トップページ以外だけの別項がある**＝§11h 第2群:
    //     「高知県ホームページのトップページ以外へのリンクにつきましては、当該ページを管理する所属に
    //      お問い合わせください。」
    //   （トップページ自体は「原則として自由」＋事後連絡の依頼＋フレーム内表示の禁止）。
    noDeepLink: true,
    license:
      "高知県ホームページに掲載されている個々の情報（文字、写真、イラスト等）に関する諸権利は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上で認められた場合を除き、高知県の許可なく複製、転用等をすることは法律で禁止されています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      // ⚠ 全角８。年度を構造的に固定するための列見出し（同型の別回を掴まないため）
      revenueHeading: "令和８年度当初",
      expenditureHeading: "令和８年度当初",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
    },
  },
  {
    // 島根県（都道府県・団体コード 320005。⚠ 松江市 322016 と別物なので id を `shimane-ken-` に分ける）。
    // 「令和8年度当初予算の概要」掲載ページの計数資料 **01 科目別・目的別内訳一覧表**（1ページ）。
    // **歳入15款・歳出14款が1ページに縦積み**（`samePage`）。総額 492,402,590 千円（+4.3%）。
    //
    // ⚠⚠ **款番号の直後に全角の読点 `．` が入る**（`１．県 税`）。`toHalfDigits` が `１`→`1` は直すが
    //    `．` は残るので、指定しないと**全29款が `．県税` `．議会費` になる**。→ `kanNamePrefixStrip: "．"`。
    //    ⚠ この集合に `．` 以外を足さないこと（款名の頭とぶつかる大阪の事故の型）。
    // ⚠⚠ **表側の区画ラベル行 `歳 入` / `歳 出` が款1 の款名に前置される**（`歳入．県税`／`歳出．議会費`）。
    //    → `revenueHeaderExtra: "^歳入$"` / `expenditureHeaderExtra: "^歳出$"`。
    //    ⚠⚠ **上の2つを外すと Σ 4系統すべて差0 のまま款名だけが汚染される**（自分で実測して確認した）。
    //    ＝款名の全件目視だけが網。
    // ⚠⚠ **同じ掲載ページに同一版面の補正版がある**（`02_kamoku_2hosyoniti.pdf`＝R7 2月補正／6月補正の
    //    ページにも `04kamokubetu.pdf`）。→ **見出しに `当初予算 科目別・目的別内訳一覧表` を採って
    //    構造的に弾く**（補正版に当てると「見出しがありません」で throw する）。
    //    ⚠ 見出しを `歳入`/`歳出` にすると弾けない — 2月補正版に当てたとき**歳出側の当年度Σが差0 で通る**。
    // **合計ラベルは `合計`**（原典は `合　　計` と字間が空くが compact 後に一致）。
    // **款体系は完全に標準**（県固有の 県税・県債・警察費 等を含む）。
    // ⚠ **歳入の内数行**（`〃 （含臨時財政対策債） (187,372,290)` / `〃 （除臨時財政対策債）`）は
    //    款番号が無いので orphan として自動で捨てられる（Σ 差0 で実証済み）。⚠ **`kanNoless` を立てると
    //    二重計上になる**ので立てないこと。
    // ⚠ **本資料の版面に「島根県」の文字が1つも無い**（`pdftotext` で0件）。取り違えの検出は
    //    URL＋総額 492,402,590 千円（＝概要 PDF p.1 の「4,924億円」）で行う。
    // **骨格予算ではない**（編成方針・概要・本資料に「骨格」0件）。⚠ 知事の任期満了が 2027-04-29 なので
    //    **R9 が骨格になる可能性が高い**。R9 を足すときは編成方針を必ず読むこと。
    // ⚠ ファイル名は R8/R7/R6/R5 が同じ `01_kamoku_mokuteki.pdf` だが **R4 で `01_kamokumokutekibetu.pdf`・
    //    R3/R2 で `01_kamokumokuteki.pdf` と規則が破れる**（H26 以下は `/past_yosan/` 配下へ移る）。
    //    ⚠ R5 は 37KB と R6/R8 の 102KB より小さく**版面が違う可能性**があるので1年度ずつ当てること。
    // 前年度列の基準は**年度間クロスチェックで確定**（R8 の前年度列 = R7 資料の当年度列が
    //    歳入15款・歳出14款・合計 471,964,796 まで一致）。列見出しにも **半角の `R8当初` / `R7当初`**
    //    と明記（物理 p.1 の4行目。`(A)` `(B)` は**その2行下**に別行で印字される）。
    //    ⚠ **全角の `Ｒ７当初` ではない**ので、この文字列を見出し（heading）に転用するなら半角で書くこと。
    id: "shimane-ken-kamoku-mokuteki-r8",
    title: "令和8年度 島根県当初予算 科目別・目的別内訳一覧表（一般会計）",
    publisher: "島根県",
    url: "https://www.pref.shimane.lg.jp/admin/seisaku/zaisei/yosan/yosanr8/r8gaiyou.data/01_kamoku_mokuteki.pdf",
    landingPage: "https://www.pref.shimane.lg.jp/admin/seisaku/zaisei/yosan/yosanr8/r8gaiyou.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "島根県（一般会計・都道府県・団体コード320005）",
    // 「著作権・リンク等について」（/cl.html・確認日 2026-07-30）の「著作権について」節。
    // ⚠ **島根県オープンデータカタログ（shimane-opendata.jp・CC BY 4.0）は本資料に及ばない** —
    //   規約が自ら「『島根県オープンデータポータルサイト（https://shimane-opendata.jp/）』の利用に
    //   関する規約」と範囲を限っており、カタログを実検索しても `予算` **0件**（`決算` 5件・`財政` 2件は
    //   いずれも市町村分）＝県自身の当初予算・款別は非登載。
    // ⚠ **`noDeepLink` は立てない**（人が原文を読んで判断・2026-07-30）。同ページ「ホームページへの
    //   リンク」は **§11h 第3〜4群（原則フリー）**:
    //     「『島根県ホームページ』へのリンクは、原則としてご自由に設定していただいてかまいません。
    //      承認のためのメールは不要です。」
    //     「トップページ以外へのリンクは予告なしにファイル名を変更することがありますのでご注意ください。」
    //     「リンクを設定する個所には、島根県のホームページへのリンクである旨を明記してください。」
    //   ⚠ **「トップページ以外」に触れてはいるが、内容はファイル名変更＝リンク切れの注意**であって
    //   控えるよう求める文言ではない（第2群の「要相談／要連絡」とは別物）。フレーム埋め込みの禁止も無い。
    //   → **5県のうち島根だけが振替の対象外**（要許可なので写しは③に置かず、リンクは直リンクのまま）。
    license:
      "「島根県ホームページ」に掲載されている文章や写真、イラスト、画像などの著作権は、「島根県」又は「コンテンツ提供者」にあります。「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ホームページに記載されている所属へお問い合わせください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 1,
      samePage: true,
      // ⚠ 補正版（同一版面・同一掲載ページ）を構造的に弾くための見出し。`歳入`/`歳出` にしない
      revenueHeading: "当初予算 科目別・目的別内訳一覧表",
      expenditureHeading: "当初予算 科目別・目的別内訳一覧表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "^歳入$", // ⚠ 必須。外すと款1=`歳入．県税`（Σ 4系統差0 のまま）
      expenditureHeaderExtra: "^歳出$", // ⚠ 必須。外すと款1=`歳出．議会費`（Σ 4系統差0 のまま）
      kanNamePrefixStrip: "．", // ⚠ 必須。外すと全29款が `．〜`（Σ 4系統差0 のまま）
    },
  },
  {
    // 鳥取県（都道府県・団体コード 310000。⚠ 鳥取市 312011 と別物なので id を `tottori-ken-` に分ける。
    // ⚠ **チェックディジットの算式で 310001 と出しても信じない** — 原本が 310000（余り1→0 の型）。
    // 総務省原本 Excel から実引きした）。
    // 「令和8年度当初予算案の概要・分析」（18p・DocuWorks 製）の**分析資料** ＝
    // **物理 p.10（歳入16款）/ p.11（歳出・目的別14款）**（印字 1・2 ＝ズレ +9）。
    // 総額 396,087,279 千円（+8.5%）。⚠ 発行元のリンク表記は `(pdf:1174B)` だが実体は約1.2MB。
    //
    // ⚠ **款番号を持たない表**（岡山 §9i 型）→ `kanNoless`。款の並び・件数は同じ発行元の
    //    「令和8年度予算の説明」第1表（款番号 1〜16 付き）と全件一致することを偵察が実測している。
    // ⚠⚠ **歳入に内数行が3本ある**（`（うち、特別法人事業譲与税）`・`（臨時財政対策債）`・
    //    `（臨時財政対策債除き）`）。`kanNoless` は「日本語＋整数2個」の行を款として拾うので、
    //    外すと **Σ が当年度 +42,653,958 / 前年度 +40,219,636 ずれる**（error で止まるので静かには壊れない）。
    //    → `revenueHeaderExtra` で行ごと弾く。**`kanNoless` と内数行の除外を同時に要する初の資料**。
    // ⚠⚠ **歳出は表題行 `２ 歳 出` が款1 に連結して `歳出議会費` になる**（allLines は全角数字が
    //    半角化されるので compact は `2歳出`）。**Σ は当年度・前年度とも差0 のまま素通りする**ので
    //    `expenditureHeaderExtra: "^2歳出$"` が必須＝款名の全件目視だけが網。
    // ⚠ **「予算の説明」（46p・InDesign）は使えない** — 金額が字送りで `6 2, 2 8 1, 8 0 0` と1文字ずつ
    //    分解され（`-layout`・`-raw` の**両方**で同じ）、`AMOUNT_RE` が桁を拾えず throw する。
    // ⚠ **R7 は収録不可**（概要・分析 PDF が**スキャン画像**＝`pdftotext` が各ページ2〜3バイトの
    //    ノンブルのみ・`pdfimages` で gray jpeg ストリップを実測）。R7 の代替も無い（「予算の説明」は
    //    上記の字送りで throw）。**R6 は同型で読める**（歳入 p.11 / 歳出 p.12）が、
    //    ⚠ **R6 の前年度列は R5 の骨格予算 335,026,692** なので足すなら `prevNote` が要る。
    // **R8・R7 とも骨格予算ではない**（本資料 物理 p.13「鳥取県当初予算額の推移」の注
    //    「（注）（ ）は骨格予算である。」で括弧付きは R1・R5 等だけ。R7 365,049,229・R8 396,087,279 は無印）。
    //    ⚠ 次の知事改選は2027年4月＝**R9 が骨格になる可能性**があるので R9 追加時に必ず読む。
    // **款体系は標準**（歳入に 県税・県債、歳出に 警察費・労働費・諸支出金 を含む都道府県型）。
    // ⚠ ファイル名の年度規則は毎年壊れる（R8 `R8tousyogaiyoubunseki.pdf` / R7 `R7tousyogaiyoubunseki01.pdf` /
    //    R6 `01tousyoyosannnogaiyoubunseki.pdf`）。⚠ **年度一覧 `/17931.htm` には R7 当初のリンクが無い**
    //    （実 URL は `/321465.htm`）ので年度追加は検索も併用すること。
    // 前年度列の基準は**年度間クロスチェックで確定**（R7「予算の説明」第1表の当年度＝当初予算額が
    //    本資料の前年度列と歳入15款・歳出14款・合計 365,049,229 まで一致。R8 新設の 利子割清算金 だけ
    //    R7 に款が無く原典が `0` と `皆増` を印字）。列順は標準なので `prevColumnFirst` は立てない。
    id: "tottori-ken-yosan-gaiyou-bunseki-r8",
    title: "令和8年度 鳥取県当初予算案の概要・分析（分析資料 1 歳入 / 2 歳出（1）目的別）",
    publisher: "鳥取県",
    url: "https://www.pref.tottori.lg.jp/secure/1417694/R8tousyogaiyoubunseki.pdf",
    landingPage: "https://www.pref.tottori.lg.jp/327294.htm",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "鳥取県（一般会計・都道府県・団体コード310000）",
    // 「とりネット上の著作権の考え方」（/9314.htm・確認日 2026-07-30）。
    // ⚠ **鳥取県オープンデータ（odp-pref-tottori.tori-info.co.jp・全256件）は本資料に及ばない** —
    //   `予算` 5件・`決算` 4件・`財政` 9件を実検索したが県の当初予算 概要・分析は非登載
    //   （`予算` のヒットは鳥取**市**の H29/H30 当初予算 CSV 等）。
    //   ⚠ **要注意の1件**: データセット「鳥取県の財政状況」（総務部財政課）の説明文に
    //   「ライセンス：CC-BY」とあるが、それは**財政状況の公表ページ（/17896.htm）を指すもので本資料ではない**
    //   （しかもそのページは現在リンクが1本も無い空ページ）。**この CC-BY を license 欄に書くと
    //   §9g の逆方向の事故**になる。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断・2026-07-30）。「リンクとバナー」（/9320.htm）が
    //   **§11h 第2群**: 「**トップページ以外のリンクは担当所属へ** トップページ以外のページへのリンクに
    //   ついては、該当するページの担当所属へお問い合わせください。」
    //   （トップページは事前の了解不要＋事後連絡の依頼）。
    noDeepLink: true,
    license:
      "とりネットに掲載されている個々の情報（文章，写真，イラストなど）は，著作権の対象となっています。とりネット全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。 「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。利用許諾については該当するウェブページを所管する担当課へお問い合わせください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 10,
      expenditurePage: 11,
      revenueHeading: "当初予算案（分析資料）", // この語は分析資料 p.10 にしか無い（百万円版の p.2-3 を弾く）
      expenditureHeading: "（１）目 的 別", // 性質別（２）と区別できる
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      revenueHeaderExtra: "^（一般会計）$|^（うち、|^（臨時財政対策債", // ⚠ 必須。内数3行を弾く
      expenditureHeaderExtra: "^2歳出$", // ⚠ 必須。外すと款1=`歳出議会費`（Σ 差0 のまま）
    },
  },
  // ---- 政令指定都市（人口の多い順に整備。2026-07-15 追加）--------------------
  // 共通のクセ（個別コメントでは繰り返さない）:
  // - **款の体系が総務省の目的別（民生費・衛生費・土木費…）ではなく局ベースの独自体系**
  //   （こども未来費・にぎわいスポーツ文化費・職員費 等）。budget 階層は normalize を
  //   通さないので収録できるが、**同じ市の decision 階層（総務省決算）とは款名が食い違う**。
  //   山梨県の県固有款（警察費・県税）に先例あり。標準款へ黙って寄せてはならない。
  // - 廃止税目の行（款番号欄が △/▲、本年度 0）は款として拾えず前年度 Σ が僅かに不足する
  //   （札幌 694,000千円・福岡 1千円）。validate は当年度 Σ しか見ないので error にはならない。
  //   docs/data-sources.md §8 に記録。
  {
    // 札幌市 R7。総括表は**全年度 p.8/p.9・印字+6 で不動**（頁数が 305→346 と変わっても巻頭固定）。
    // **PDF のファイル名に規則が一切ない**ので年度追加は必ず年度インデックス（/yosan-kessan/index.html）から辿る。
    // 「予算の概要」は表が画像で決定的パース不可 → 説明書を採る（R8 と同じ判断）。
    id: "sapporo-yosansetsumeisho-r7",
    title: "令和7年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/documents/02_r7_yosansetsumeisho_ippan.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/reiwa7nendo_yosan.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 札幌市 R6。総括表は**全年度 p.8/p.9・印字+6 で不動**（頁数が 305→346 と変わっても巻頭固定）。
    // **PDF のファイル名に規則が一切ない**ので年度追加は必ず年度インデックス（/yosan-kessan/index.html）から辿る。
    // 「予算の概要」は表が画像で決定的パース不可 → 説明書を採る（R8 と同じ判断）。
    // **⚠ 前年度列が「当初」でない**。R5 は市長選の年で当初予算が骨格予算のため、
    // 本資料の前年度列は**肉付後**の額。**資料に骨格/肉付の記載が一切ない**ので自動判定は
    // 「当初」と誤る → prevBasis を明示的に上書きし、根拠を prevNote で画面に出す。
    // 次は R10（R9=2027年4月が選挙年）で再発する。docs §8b 参照。
    id: "sapporo-yosansetsumeisho-r6",
    title: "令和6年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/documents/r6_yosansetsumeisyoippann.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/reiwa6nendo_yosan.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      prevBasis: "補正後",
      prevNote: 
        "令和5年度当初予算は市長選挙に伴う骨格予算のため、前年度予算額は肉付予算（第1回臨時会・第2回定例会の補正）後の額（裏取り: 令和5年度第2回定例会 補正予算の概要「補正後予算額は対前年度比7.1％増の1兆2,442億円」）",
    },
  },
  {
    // 札幌市 R5。総括表は**全年度 p.8/p.9・印字+6 で不動**（頁数が 305→346 と変わっても巻頭固定）。
    // **PDF のファイル名に規則が一切ない**ので年度追加は必ず年度インデックス（/yosan-kessan/index.html）から辿る。
    // 「予算の概要」は表が画像で決定的パース不可 → 説明書を採る（R8 と同じ判断）。
    id: "sapporo-yosansetsumeisho-r5",
    title: "令和5年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/documents/r5kakukaikeiyosansetumeisyo.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/reiwa5nendo_yosan.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 札幌市 R4。総括表は**全年度 p.8/p.9・印字+6 で不動**（頁数が 305→346 と変わっても巻頭固定）。
    // **PDF のファイル名に規則が一切ない**ので年度追加は必ず年度インデックス（/yosan-kessan/index.html）から辿る。
    // 「予算の概要」は表が画像で決定的パース不可 → 説明書を採る（R8 と同じ判断）。
    id: "sapporo-yosansetsumeisho-r4",
    title: "令和4年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/documents/r4_yosansetsumeisho.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/reiwa4nendo_yosan.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 札幌市 R3。総括表は**全年度 p.8/p.9・印字+6 で不動**（頁数が 305→346 と変わっても巻頭固定）。
    // **PDF のファイル名に規則が一切ない**ので年度追加は必ず年度インデックス（/yosan-kessan/index.html）から辿る。
    // 「予算の概要」は表が画像で決定的パース不可 → 説明書を採る（R8 と同じ判断）。
    // R3 の歳出は13款（R4 以降は12款）→ 連番の warning が出るのが正常。
    id: "sapporo-yosansetsumeisho-r3",
    title: "令和3年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/documents/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/reiwa3nendo_yosan.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 札幌市 R2。総括表は**全年度 p.8/p.9・印字+6 で不動**（頁数が 305→346 と変わっても巻頭固定）。
    // **PDF のファイル名に規則が一切ない**ので年度追加は必ず年度インデックス（/yosan-kessan/index.html）から辿る。
    // 「予算の概要」は表が画像で決定的パース不可 → 説明書を採る（R8 と同じ判断）。
    // **⚠ 前年度列が「当初」でない**。R1 は市長選の年で当初予算が骨格予算のため、
    // 本資料の前年度列は**肉付後**の額。**資料に骨格/肉付の記載が一切ない**ので自動判定は
    // 「当初」と誤る → prevBasis を明示的に上書きし、根拠を prevNote で画面に出す。
    // 次は R10（R9=2027年4月が選挙年）で再発する。docs §8b 参照。
    id: "sapporo-yosansetsumeisho-r2",
    title: "令和2年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/documents/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/reiwa2nenndoyosann.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      prevBasis: "補正後",
      prevNote: 
        "令和元年度当初予算は市長選挙に伴う骨格予算のため、前年度予算額は肉付予算（第1回臨時会・第2回定例会の補正）後の額（裏取り: 令和元年度 補正予算のポイント「一般会計 1,022,701＝当初 1,019,300＋第1回臨時 42＋第2回定例 3,359」百万円）",
    },
  },
  {
    // 川崎市（団体コード 141305）R6 事務事業評価シート。**予算→執行→成果 の鎖の「成果」**。
    // 甲府は詳細票が公表サンプル5枚のみ（全134事業は情報公開請求）だったが、**川崎は572事業の
    // 全量がウェブ公開**されている（請求不要）。docs §8c。
    // 構成: 政策別に23 PDF（1-1〜5-2）。各ファイルは先頭が政策体系図で、以降は**1事業1シート**。
    // gaiyou.pdf は全体概要で、**事業数572と達成度の内訳（2=17/3=462/4=93）**を持つ＝検証に使う。
    // 検証ゲート（実データで成立を確認済み）:
    //   ①総コスト(A+B) = 事業費A + 人件費B（全列で厳密一致。**列の取り違えを算術で検出できる**）
    //   ②財源内訳（国庫支出金+市債+その他特財+一般財源）の和 = 事業費A
    //   ③Σ事業数 = gaiyou.pdf の 572
    // **予決算表は -tsv の座標が必須**。R7決算額が 事業費A では空欄・人件費B では 0 のため
    // 行ごとにトークン数が変わる（A=10/B=11/総コスト=11）＝トークン数で列を対応させると静かにずれる。
    // 列境界はヘッダ（予算額/決算額/計画事業費）の x から導く（決め打ちしない）。空セルは `-`。
    // ⚠ R6 の決算額は「決算額(見込)」（評価年度のため確定値でない）。R4・R5 は確定決算額。
    // ⚠ 評価体系が甲府と違う（達成度1〜5＋方向性区分Ⅰ〜Ⅴ。A〜F も点数も無い）。丸めないこと。
    // R3〜R6 の4年度が公開されているが、24ファイルで約21MB/年（data/raw は既に168MB）のため
    // **まず R6 のみ収録**し、経年に広げるかは別途判断する。R7 は第4期実施計画で未公表。
    id: "kawasaki-jigyou-hyouka-r6",
    title: "川崎市総合計画 第3期実施計画 令和6年度 事務事業評価結果（事務事業評価シート）",
    publisher: "川崎市",
    url: null,
    urls: [
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/gaiyou.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-1.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-2.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-3.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-4.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-5.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-6.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-1.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-2.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-3.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-1.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-2.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-3.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-1.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-2.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-3.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-4.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-5.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-6.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-7.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-8.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-9.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/5-1.pdf",
      "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/5-2.pdf",
    ],
    landingPage: "https://www.city.kawasaki.jp/170/page/0000178614.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kawasaki-jigyou-hyouka",
  },
  {
    // 横浜市（団体コード 141003）事業評価書 R7（＝**令和6年度事業**の評価）。docs §8d。
    // 45ファイル（局・区別）・**計2,535事業**（うち一般会計2,313）・32.3MB。川崎572事業の4.4倍。
    // **同一様式は R6・R7 の2年だけ**（R5=別文書＋文字化け / R4・R3=様式2-1 で会計名が無く
    // 一般会計を判別できない）。まず R7 のみ収録する。
    // 1事業 = 「令和６年度事業名」の出現で区切る（**継続ページには無い**。先頭277＋継続242＋目次15=534p）。
    // **横浜だけが「歳出予算科目 一般会計 07 款 01 項 01 目」を持つ**（R7 は2,535/2,535で読める）＝
    // 事業を款ドリルへ直接紐付けられる唯一の資料。企業会計は混ざらない（水道局・病院のファイルが無い）。
    // 検証ゲート（実測）:
    //   ①差引 = ６年度 − ５年度 … 1,508/1,508 厳密一致（最強）
    //   ②Σ細事業費(６年度) = 事業費(６年度) … 430/430 が **±2千円以内**（丸め許容が必須。
    //     厳密にすると67件が誤検知で落ちる）
    //   ③目次（様式1）の行数 = 評価書数（277=277。**長い事業名は3行に割れコード行に名前が無い**）
    //   ※**前年度側はゲートに使えない** — 抽出バグではなく原典の構造（細事業の改廃で前年度が
    //     積み上がらない）。ゲートは当年度のみに張る。
    // パースの罠（川崎と違う点。docs §8d）:
    //   - **同ページに年度ヘッダが3組以上・可変**。事業決算額(y≈217)と細事業費(y≈396)は
    //     **x が1ptも違わない**（191.3/270.5/335.7）→ x でソートすると混ざる。**y で区画分割**が必須
    //   - **空セルはプレースホルダ無しで単に欠落**（川崎のハイフンに相当するものが無い）→ x 座標で対応
    //   - ヘッダ左寄せ・値右寄せで必ずズレ、**符号が表ごとに逆**（決算額表 +25 / 事業量表 −7）
    //   - **ラベルが2行に割れる**（「事業費」(y=218.8) と 「（千円）」(y=229.6) は別の語）
    //   - **負号は ▲**（△ ではない）・**空白入り**（▲ 756）
    //   - **評価書番号は局内で一意でない**（277件中ユニーク55）→ キーは (会計,款,項,目,番号) の複合
    // 評価体系は**7軸のカテゴリ値で総合評価も数値スコアも無い**（甲府A〜F・川崎達成度1〜5と
    // **1つの軸に丸められない**）。コードブック 0236_20240903.pdf に全軸の定義がある。
    // 人件費込みトータルコストは**無い**（職員人件費が番号99の独立事業）。
    id: "yokohama-jigyo-hyoka-r7",
    title: "令和7年度 横浜市事業評価書（令和6年度事業）",
    publisher: "横浜市",
    url: null,
    urls: [
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/0236_20240903.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/01_R7datsutanso.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/02_R7digital.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/03_R7seisaku_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/04_R7soumu.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/05_R7zaisei_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/06_R7kokusai_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/07_R7shimin.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/08_R7nigiwai.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/09_R7keizai_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/10_R7kodomo.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/11_R7kenkoufukushi.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/12_R7iryo.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/13_R7midorikankyo_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/14_R7gesui.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/15_R7shigen.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/16_R7kentiku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/17_R7toshiseibi.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/18_R7douro.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/19_R7kouwan_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/20_R7syoubou.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/21_R7kaikei.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/22_R7kyouiku_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/23_R7senkyo.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/24_R7jinji.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/25_R7kansa.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/26_R7gikai.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/01_R7tsurumi_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/02_R7kanagawa.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/03_R7nishi_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/04_R7naka_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/05_R7minami_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/06_R7konan_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/07_R7hodogaya.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/08_R7asahi_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/09_R7isogo_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/10_R7kanazawa_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/11_R7kohoku_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/12_R7midori.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/13_R7aoba.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/14_R7tuzuki.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/15_R7totsuka.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/16_R7sakae_2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/17_R7izumi.pdf",
      "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/18_R7seya_2.pdf",
    ],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "横浜市（一般会計・団体コード141003）※特別会計の事業は会計名で除外する",
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "yokohama-jigyo-hyoka",
  },
  {
    // ==== 杉並区 事務事業評価シート（#163・特別区で初の事業報告）====================
    // **1事業ちょうど2ページ**（590事業 / シート1,180ページ・目次込みで1,195ページ。
    //   ⚠ 偵察の「836ページ」は算術が合っていない＝実測し直した）。**款項目事業コードを持つ**ので
    // 横浜と同じく「款 → 事業 → 成果」が繋がる（款1〜11 が suginami-yosansho の歳出11款に対応）。
    // ⚠ **ファイル名の連番規則が破れる** — 施策16・24・27 だけ `zimuzigyou3`（他は `zimuzigyou2`）。
    //   **URL を生成せず全32本を明示列挙する**（生成すると3本が静かに 404 になる）。
    // ⚠ **一般会計は整理番号 001〜521 の521事業**。522以降は国保/介護/後期高齢の特別会計だが、
    //   **シートに会計欄が無い**（款番号が 01 に戻るだけ）ので、整理番号レンジで切る。
    // ⚠ **R6 以前は様式が別物**（金額表の列構成が違う）。多年度化は年度ごとに実測が要る。
    id: "suginami-jimujigyou-hyouka-r7",
    title: "令和7年度 杉並区事務事業評価シート（令和6年度事業）",
    publisher: "杉並区",
    url: null,
    urls: [
      // 目次（整理番号順）— 590行あり**件数ゲートの錨**になる
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_00_mokuzi_seiribanngou.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_00_mokuzi_sisakutaikeibetu.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_01_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_02_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_03_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_04_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_05_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_06_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_07_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_08_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_09_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_10_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_11_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_12_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_13_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_14_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_15_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_16_zimuzigyou3.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_17_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_18_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_19_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_20_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_21_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_22_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_23_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_24_zimuzigyou3.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_25_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_26_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_27_zimuzigyou3.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_28_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_29_zimuzigyou2.pdf",
      "https://www.city.suginami.tokyo.jp/documents/23075/r7_99_zimuzigyou2.pdf",
    ],
    landingPage: "https://www.city.suginami.tokyo.jp/s001/23075.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "杉並区（一般会計・団体コード131156）※特別会計は整理番号522以降として除外する",
    // 「杉並区公式ホームページの利用について」（/about/17.html・確認日 2026-08-03）。
    // ⚠ 杉並区オープンデータ利用規約（CC BY 4.0）は**「杉並区が公開するオープンデータ」に自ら限定**
    //   しており、東京都オープンデータカタログの杉並区103データセットに**事務事業評価は無い**ので
    //   本資料には及ばない（§9g の「適用されない規約を license に書かない」）。
    license:
      "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "suginami-jimujigyou-hyouka",
    parserOptions: {
      // 一般会計の整理番号の上限。**パーサは款番号のリスタートから自動検出**しており、
      // ここは**宣言と実測の突合**のためだけに置く（食い違えば throw）。片方だけを信じない。
      generalAccountSeiriMax: 521,
    },
  },
  {
    // ==== 横浜市 局・統括本部 事業計画書（#164・政令市の主な事業）====================
    // ⚠⚠ **#164 は「主な事業 CSV から」と書かれていたが、実測して資料を差し替えた**。
    //   CSV（`R8yosan-shuyou.csv`・393事業）は**単位が百万円**で、資料自身が
    //   「表示単位未満を四捨五入…合計等と一致しない場合があります」「**事業計画書の事業費と
    //   一致しない場合があります**」と明記している ＝ **Σ=合計のゲートが原理的に張れない**。
    //   しかも**款項目を持たない**（局名だけ）ので款ドリルに繋がらない。
    //   事業計画書は**款項目つき・単位千円・丸め無し・1,580事業**で、CSV の弱点を全部解消する。
    //
    // ⚠⚠ **URL は局別ページから採取する。組み立ててはいけない**（実測）:
    //   ・ファイル名に規則性ゼロ（`0021_20260126.pdf` / `r8_6-2-1.pdf` / `2026_01_12.pdf` が同一年度に混在）
    //   ・**ディレクトリ名と局名が食い違う**（総務局は `/org/zaisei/`、財政局は `/org/somu/`）
    //   ・`jigyoukeikaku` と `jigyokeikaku`（"u" 無し）が局ごとに揺れる
    //   ・デジタル統括本部・国際局だけ `/org/R07izen/` 配下
    //
    id: "yokohama-jigyou-keikaku-r8",
    title: "令和8年度 横浜市 各局・統括本部事業計画書",
    publisher: "横浜市",
    url: null,
    // ⚠⚠ **「一般会計を1回ずつ含む最小集合」を人が選ぶのをやめた**（2026-08-06）。
    //   偵察が選んだ62本には**19款1項6・7・8目の見出しがどこにも無く**、諸支出金が
    //   14,820,671千円 足りなかった。**どのファイルがどの目を持つかは開けるまで分からない**ので、
    //   **発行元の全329本を入れて、重複は機械で解く**（同じ事業が一括と目別の両方に出る）。
    //   → パーサが (会計,款,項,目,事業名,金額) で重複を落とし、**同じ目が複数ファイルに
    //     分かれている場合はそのまま足す**（重複と分割を値で区別する）。
    urls: [
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho211.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho221.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho222.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho231.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho241.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho251.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho19.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho19110.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho19117.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho171.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17131.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17132.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17133.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17141.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17142.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho201.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho20111.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho20121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-jigyoukeikaku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-281-jigyoukeikaku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-282-jigyoukeikaku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-283-jigyoukeikaku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-19115-jigyoukeikaku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/seisaku/jigyokeikaku/r8jigyoukeikaku.files/0088_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/seisaku/jigyokeikaku/r8jigyoukeikaku.files/0086_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/seisaku/jigyokeikaku/r8jigyoukeikaku.files/0085_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/R07izen/digital/jigyokeikaku/r8jigyoukeikaku.files/0004_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0056_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0054_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0055_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0042_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0043_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0044_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0045_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0046_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0047_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0048_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0049_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0050_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0051_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0052_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/R07izen/kokusai/jigyoukeikaku/r8jigyoukeikaku.files/R8kokusai.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0021_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0022_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0023_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0024_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0025_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0026_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0027_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0012_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0008_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0009_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0010_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0011_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0013_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0175_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0153_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0154_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0176_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0156_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0173_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0158_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0163_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0160_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0161_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0162_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0164_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0165_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0166_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0167_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0168_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0169_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_kodomo_all.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/0002_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-1.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-3.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-4.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-5.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-1.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-2.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-3.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-4.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-5.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-6.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-7.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_19.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_kashitukekin.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0158_20260213.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0119_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0159_20260213.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0121_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0122_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0123_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0124_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0155_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0126_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0127_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0128_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0129_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0130_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0131_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0132_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0133_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0134_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0135_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0136_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0137_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0138_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0139_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0140_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0141_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0142_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0143_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0144_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0145_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0146_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0147_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0148_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0149_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0156_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0151_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0157_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0153_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0001_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0002_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0005_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0006_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0007_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo-byoin/jigyoukeikaku/r8jigyoukeikaku.files/0005_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0463_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0425_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0434_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0464_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0436_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0437_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0438_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0439_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0441_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0442_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0443_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0444_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0461_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0446_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0447_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0448_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0449_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0450_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0451_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0452_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0453_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0454_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0455_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0456_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0457_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0458_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0459_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0460_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0403_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0404_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0405_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0407_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0406_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0408_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0409_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0410_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0411_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0412_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0413_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0414_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0415_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0416_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0432_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0418_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0419_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0420_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0421_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0422_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0423_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0424_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0425_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0426_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0427_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0428_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0429_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0430_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0397_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0398_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0399_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0400_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0401_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0017_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0018_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0019_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0020_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0021_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0022_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0023_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0024_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0025_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0026_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0027_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0108_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0109_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0111_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0100_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0101_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0102_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0103_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0104_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0105_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0106_20260121.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_12.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_120101.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_120102.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_120103.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_19.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_190110.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_190117.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0101.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0102.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0103.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0105.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/R8_hosyo.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0029_20260204.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0011_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0027_20260204.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0024_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0025_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0015_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0016_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0017_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0018_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0020_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0022_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0023_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0019_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0073_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0066_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0067_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0068_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0069_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0070_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0071_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0051_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0072_20260127.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0053_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0054_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0055_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0056_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0057_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0059_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0060_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0061_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0062_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0063_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0064_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0065_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0016_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0017_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0019_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0020_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0021_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0022_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0023_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0024_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0025_20260122.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/suido/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-01syokouchiku.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-30syaryou.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-40unten.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-60unyukanri.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-73juuryouzei.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-12-01-01syaryou.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-12-01-10kouchikubutsu.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-12-01-15kikaibihin.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kanren-18-01-80kensyuujo.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kanren-18-01-90ippankanri.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-10senro.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-20denro.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-30sharyou.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-40unten.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-50unyu.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-60unyukanri.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-12-01-01kensetsu.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-12-01-05kensetsukairyou.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-12-01-07futaijigyou.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kaikei/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0211_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0212_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0213_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0214_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0215_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0239_20260204.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0217_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0218_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0219_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0220_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0221_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0222_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0223_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0224_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0225_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0226_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0227_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0228_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0229_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0230_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0231_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0232_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0233_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0234_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0235_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0236_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0240_20260209.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0238_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/senkyo/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260125.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/senkyo/jigyoukeikaku/r8jigyoukeikaku.files/0005_20260125.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/senkyo/jigyoukeikaku/r8jigyoukeikaku.files/0006_20260125.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/jinji/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260126.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kansa/jigyoukeikaku/r8jigyoukeikaku.files/0014_20260123.pdf",
      "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gikai/jigyoukeikaku/r8jigyoukeikaku.files/0001_20260126.pdf",
    ],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/jigyoukeikakusyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "横浜市（一般会計・団体コード141003）※特別会計は歳出予算科目の会計名で除外する",
    // ⚠ **CC BY は及ばない**（2026-08-04 実測）。横浜のオープンデータ CKAN の全657データセットの
    //   resources URL を走査して jigyoukeikaku / jigyokeikaku が **0件**であることを確認した。
    //   CC BY で登載されているのは zaisei_r8yosan の6リソース（款項目節の zip 等＝#191）だけ。
    //   ⚠ **CC BY 文言を併記しない**（§9g — 適用されない規約を license に書くと分類器が語で拾う）。
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "yokohama-jigyou-keikaku",
  },
  {
    // 札幌市（団体コード 011002）事業評価調書 R7（＝**令和6年度事業**の自己評価）。#127・docs §8t。
    // **1事業1PDF（一般会計634件）**のため urls は収集器（pipeline/collect-sapporo-hyoka.ts）が
    // 生成する台帳 JSON から展開する（手で並べない・年度更新は収集器を再実行して差分を見る）。
    // H24〜R7 の14年分が公開されているが、**R7 のみ収録**（raw サイズの再判断 2026-07-23:
    // R7=+105MB は「特別区を増やす程度」の範囲内 / 全14年=約9,100本・+1.4GB は git 履歴が
    // 約2.3GB になり杉並等の同類を足すと破綻する水準 → 「raw は git から出さない」判断の
    // 前提を守れる範囲に絞る。調書1枚に決算3年分が載るため R7 だけでも時系列が取れ、
    // 事業コードが年度をまたいで安定しているので後から多年度化できる）。
    // R4 以前は別ディレクトリ・R3〜H24 は www3 の ASP（静的リンク列挙不可）で収集難度も跳ねる。
    // ⚠ 発行元の命名ゆらぎ2件（規則外名・前年度調書の混入）は収集器の OVERRIDES に実見判定を固定。
    id: "sapporo-jigyou-hyouka-r7",
    title: "令和7年度札幌市行政評価 事業評価調書（自己評価・一般会計）",
    publisher: "札幌市",
    url: null,
    urls: sapporoHyokaR7.files.map((f) => f.url),
    landingPage: "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "札幌市（一般会計・団体コード011002）※特別・企業会計は収集器がファイル名の会計コードで除外",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "sapporo-jigyou-hyouka",
  },
  {
    // 大阪市（団体コード 271004・人口278万＝**未収録で最大の自治体**）。docs §8。
    // R8 当初予算（令和8年3月27日議決・原案どおり可決）。款別＋前年当初比較が取れるのは
    // **市会に上程された予算書（議案第60号）の「歳入歳出予算事項別明細書」**のみ。
    // 財政局の CC-BY 資料は歳入が7区分の粗集計で款別が無く、P8「目的別歳出予算」は款15
    // 特別会計繰出金を目的別に再配分した再分類表なので予算書の款と一致しない（実測で確認済み）。
    // 歳入 物理 p.27-48（印字1-22）/ 歳出 p.49-230（印字23-204）。**オフセット +26**。
    // **既存の kofu-yosansho には乗らない** — 「1ページ=1側の款別一覧」ではなく、
    // **款項目が同一表に混在し182ページに渡る**事項別明細書。専用パーサ osaka-yosansho。
    // 構造（実測で裏付け済み）:
    //   - **款は -layout の列0始まりの行**。歳出は182p中16行=16款ちょうどで偽陽性0、
    //     Σ款=合計が本年度・前年度とも**厳密一致**
    //   - **歳入は款5・6・13 だけ款名が2行に折返し、款番号が単独行に落ちる**
    //     （`株式等譲渡所得割` / `5` / `交   付  金  7,371,000 …`）。列0判定だけだと
    //     **20款しか取れず Σ が 8,430,001 千円不足する**（実測）
    //   - 歳入末尾に**廃止款の括弧書き**（`（自動車取得税交付金）` 本年度0・前年度1）。
    //     `△` が前年度値の直後に来る逆順配置（`1△ 1`）
    //   - 款名は字間空白の両端揃え（`1市                   税`）→ 空白の畳み込みが要る
    //   - 目行のみ右列に節（`1 現 年 課 税 分  271,517,931`）が乗る。款行は必ず3金額
    // 議案番号は年度で変わる（R8=第60号 / R7=第63号）ので、**年度更新は財政局の年度ページから**
    // 議案番号を辿ること。R7 も同型（2025gian63.pdf・歳入合計 2,030,932,348 を確認済み）。
    // **款が独自体系**（福祉費/健康費/こども青少年費/経済戦略費/港湾費/住宅費/大学費/
    // 特別会計繰出金）で標準款（民生費・衛生費…）が無い。decision 階層とは款名が食い違う。
    // ライセンス: 市会ページに CC バッジ0件 → サイトポリシー別紙「ライセンス表示のない添付
    // ファイル」に該当。**「大阪市は政府標準利用規約準拠だから予算書も open」と早合点しない**
    // （別紙で「添付ファイルは本ルールの適用外」と明記）。
    id: "osaka-yosansho-r8",
    title: "令和8年度 大阪市一般会計予算書（議案第60号・款別歳入歳出）",
    publisher: "大阪市",
    url: null,
    urls: ["https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf"],
    landingPage: "https://www.city.osaka.lg.jp/zaisei/page/0000671888.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "大阪市（一般会計・団体コード271004）",
    license:
      "ライセンス表示のない画像ファイルや添付ファイルは著作権の対象となっているため、無断での使用や転載を禁じます。私的使用のための複製や、引用など著作権法上認められた場合を除き、上記著作権の対象に該当するコンテンツを複製・転用する際は、必ず事前にそれぞれのコンテンツを所管する各担当にご相談ください。",
    parser: "osaka-yosansho",
    parserOptions: {
      revenuePages: { from: 27, to: 48 },
      expenditurePages: { from: 49, to: 230 },
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
    },
  },
  {
    // さいたま市（団体コード 111007・人口135万）。「予算及び予算説明書」(896p) の
    // 歳入歳出予算事項別明細書「１ 総括」が款別一覧。**大阪型（明細に款項目が混在）ではなく
    // 横浜型（総括が単独ページ）**なので kofu-yosansho に乗る。歳入 p.33（25款）/ 歳出 p.34（13款）。
    // **p.35 は歳出表の右側「財源内訳」の溢れ**（款列が無い）→ 範囲で 34-35 を指定してはいけない。
    // **政令市で初めて款が総務省の目的別13款と一致**（議会費〜予備費）。横浜「にぎわいスポーツ文化費」・
    // 札幌「職員費」・大阪「こども青少年費」のような局ベースの独自体系ではないので、
    // **decision 階層（総務省決算の目的別）と款名が初めて揃う**自治体。
    // 罠:
    //   - **象徴計上が4件**（歳入 款10 自動車取得税交付金 `1/1`・款23 繰越金 `1/1`・
    //     款11 環境性能割交付金 `2,941`（前年 948,000 でほぼ廃止）・歳出 款11 災害復旧費 `5/5`）。
    //     大阪 §8e で踏んだ「桁数フィルタが小額を静かに落とす」型なので、Σ で必ず検算する
    //   - 折返し款名・皆増皆減・廃止款の括弧書きは**いずれも無い**（実測）
    // **編成過程 PDF の「款別一覧」を使ってはいけない**（hennseikouhyou8.pdf p.8）。歳入は予算書と
    // 一致するが**歳出が一致しない**（事務事業ベースで人件費等が入らない。款3 民生費 263,728,073 vs
    // 予算書 283,610,456）。歳入だけ照合して早合点すると歳出が静かに壊れる。
    // **R5 以前は予算書 PDF がそもそも非掲載**（概要と編成過程のみ・リンク切れではない）。
    // 年度インデックスは規則的（/006/007/011/001/021/=R8・020=R7・019=R6）だが、
    // R6 は罫線文字（┃│─）様式かつ p.35/36 へずれるので別途の拡張が要る。
    id: "saitama-yosansho-r8",
    title: "令和8年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "さいたま市",
    url: null,
    urls: [
      "https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
    ],
    landingPage: "https://www.city.saitama.lg.jp/006/007/011/001/021/p129189.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "さいたま市（一般会計・団体コード111007）",
    license:
      "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 33, to: 33 },
      expenditurePages: { from: 34, to: 34 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // さいたま市 R7。R8 と同一ページ（p.33/34）・同一様式。
    id: "saitama-yosansho-r7",
    title: "令和7年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "さいたま市",
    url: null,
    urls: [
      "https://www.city.saitama.lg.jp/006/007/011/001/020/p119990_d/fil/reiwa7nendotousyoyosan.pdf",
    ],
    landingPage: "https://www.city.saitama.lg.jp/006/007/011/001/020/p119990.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "さいたま市（一般会計・団体コード111007）",
    license:
      "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 33, to: 33 },
      expenditurePages: { from: 34, to: 34 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // さいたま市（団体コード 111007）行政報告書（決算に係る主要な施策の成果）R6。事業報告（成果）。
    // 地方自治法233条5項の成果説明書。500p born-digital（DocuWorks）・ToUnicode 完備。
    // 一般会計・歳出676事業が全件 `款/項/目`（番号＋款名を内包）を持つ → 款ドリルへ直接紐付け可能
    // （横浜と違い款名が報告書自身に載るので、R6予算＝罫線様式で未収録でも款名解決に困らない）。
    // 会計種別がカード見出し `（一般会計・歳出）` で明示され、一般会計歳出のカードだけが `事務事業名`
    // ラベル（特別会計・歳出は `会計名` ラベルで款項目なし・13件）→ scope 除外が決定的。
    // 評価/指標体系は無し（自由記述型・札幌に最も近い）。既存3パーサ（川崎/横浜/札幌）に乗らず新パーサ。
    id: "saitama-jigyou-houkoku-r6",
    title: "令和6年度 さいたま市行政報告書（決算に係る主要な施策の成果）",
    publisher: "さいたま市",
    url: null,
    urls: [
      "https://www.city.saitama.lg.jp/006/007/011/002/p124022_d/fil/gyouseihoukokusyo.pdf",
    ],
    landingPage: "https://www.city.saitama.lg.jp/006/007/011/002/p124022.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "さいたま市（一般会計・団体コード111007）※特別会計の事業（会計名ラベルの13件）は除外する",
    license:
      "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）",
    parser: "saitama-jigyou-houkoku",
  },
  {
    // 広島市（団体コード 341002・人口119万）。R8 当初予算の概要「資料1」p.8（歳入25款）/ p.9（歳出13款）。
    // **予算書本体（事項別明細書 26002.pdf）は使えない** — 全編がスキャン画像＋OCR で、
    // pdftotext が空にならず**もっともらしい誤数字を出す**（`262,フ73,622` / `3,4四,171` /
    // 款番号24が `討`）。空のテキスト層より危険（Σ が偶然通れば気付かず誤収録する）。
    // 議案・歳入歳出予算説明資料も同じくスキャン。**born-digital なのは財政局の記者発表資料だけ**。
    // 資料1 の p.9「目的別分類表」は**款そのもの**（明細書 総括の款1議会費〜款13予備費と同順・同額）。
    // 大阪の「目的別歳出予算＝再分類表」とは違うので取り違えないこと。
    // 専用パーサ hiroshima-yosansho の理由・罠は同ファイル冒頭を参照（款番号列が無い・10列・折返し）。
    // **ファイル名に規則性がゼロ**（R8=2610.pdf / R7=258963.pdf / R6=229889.pdf）なので、
    // 年度追加は必ず年度インデックス（/shisei/zaisei/1003079/index.html）の実リンクから辿る。
    id: "hiroshima-yosansho-r8",
    title: "令和8年度 広島市当初予算の概要（資料1・款別歳入歳出）",
    publisher: "広島市",
    url: null,
    urls: ["https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/047/851/2610.pdf"],
    landingPage: "https://www.city.hiroshima.lg.jp/shisei/zaisei/1003079/1043845/1047851.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "広島市（一般会計・団体コード341002）",
    license:
      "広島市ホームページ上の文書や画像等の各ファイル及びその内容に関する諸権利は、原則として広島市に帰属します（一部の画像等の著作権は、原著作者が所有しています。）。「私的使用による複製」や「引用」など著作権法上認められる場合を除き、広島市ホームページ上に掲載されている文書や画像等を、無断で使用・複製・転載・販売・改変・印刷配布することはできません。使用等を希望される方は、各ページに記載されている担当課へ、事前に、ご相談ください。なお、広島市の各局や各課が配信するページ等に利用規約等、特別な規定がある場合は、この取り扱いに優先するものとします。",
    parser: "hiroshima-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      totalLabel: "計",
    },
  },
  {
    // 神戸市（団体コード 281000・人口149万）。各会計予算に関する説明書（581p・25MB）。
    // **横浜型**（総括が単独ページ）で kofu-yosansho に無改修で乗る。歳入 p.3-4（25款）/ 歳出 p.5（16款）。
    // 歳入は2ページに跨り**合計行は p.4 にしかない**ので単ページ指定では必ず落ちる。
    // **物理 = 印字（オフセット0）**。R8・R7・R6 とも同じ位置だが、年度追加時は必ず実確認する。
    //
    // **アプリ内で初のオープンライセンス自治体**（政府標準利用規約2.0準拠・CC BY 4.0 互換・商用可）。
    // 大阪の罠（サイトポリシー本体は政府標準利用規約準拠だが、別紙で「添付ファイルは適用外」と明記）を
    // 実測で潰してある: **神戸の規約に添付ファイル／PDF の除外は無い**（適用外は「シンボルマーク・ロゴ・
    // キャラクターデザイン」と「別の利用ルールの適用を明示しているコンテンツ」の2つだけ）。かつ
    // **説明書 PDF 自身に著作権・転載・複製・禁止・無断の制限表記が0件**であることを確認済み
    // （＝「別の利用ルールの適用を明示」に当たらない）。
    // なお data.city.kobe.lg.jp（オープンデータポータル）の CC は「本ページで公開しているデータ」限定で
    // 予算 PDF はポータルに無いため、**ポータルの規約を根拠にしてはいけない**。根拠はサイト利用規約の方。
    //
    // 罠: 象徴計上が2つ（歳入 款10 特別地方消費税交付金 `1/1`・歳出 款14 災害復旧費）＝桁数で絞ると静かに落ちる。
    //     歳入 款11 環境性能割交付金は本年度0・前年 1,069,000 の**廃止款だが款番号を持つ**（大阪型の括弧書きではない）。
    //     歳出 p.5 は比較の後ろに財源内訳5列が続き整数列が最大8個になるが、先頭2列しか見ないので影響なし。
    // **URL に規則性が無い**（2026yosansetumeisyo / 2025yosannsetsumeisho / 2024yosannsetumeisyo と綴りが毎年違う）
    // ので、年度追加は必ずランディングページの実リンクから辿ること。
    // **R5 以前は現行サイトから掲載終了**（Wayback にはある）。R2 以前は Identity-H の文字化けで
    // pdftotext が数字を丸ごと落とすため回収不能＝R3 が下限。
    id: "kobe-yosansho-r8",
    title: "令和8年度 神戸市各会計予算に関する説明書（一般会計 総括・款別歳入歳出）",
    publisher: "神戸市",
    url: null,
    urls: ["https://www.city.kobe.lg.jp/documents/48584/2026yosansetumeisyo.pdf"],
    landingPage: "https://www.city.kobe.lg.jp/a61436/shise/financial/yosankessan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "神戸市（一般会計・団体コード281000）",
    license:
      "当ウェブサイトで公開している情報（以下「コンテンツ」といいます。）は、どなたでも以下の１）〜７）に従って、複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます。商用利用も可能です。１）出典の記載について ア コンテンツを利用する際は出典を記載してください。４）本利用ルールが適用されないコンテンツについて 以下のコンテンツについては、本利用ルールの適用外です。ア 組織や特定の事業を表すシンボルマーク、ロゴ、キャラクターデザイン イ 具体的かつ合理的な根拠の説明とともに、別の利用ルールの適用を明示しているコンテンツ ７）その他 ア 本利用ルールは、著作権法上認められている引用などの利用について、制限するものではありません。 イ 本利用ルールは、政府標準利用規約(第 2.0 版)に準拠し、平成 29 年 7 月１日に定めたものです。 ウ 本利用ルールは、クリエイティブ・コモンズ・ライセンスの表示 4.0 国際（CC BY）と互換性があり、本利用ルールが適用されるコンテンツは CC BY に従うことでも利用することができます。（出典：神戸市ウェブサイト利用規約 https://www.city.kobe.lg.jp/documents/19135/20170630041802-1.pdf）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 4 },
      expenditurePages: { from: 5, to: 5 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // 歳出の財源内訳ヘッダ（`一般財源` / `国庫支出金 県支出金 地方債 その他`）が
      // KAN_HEADER_RE のどれにも当たらず、款1 の款名を
      // 「一般財源国庫支出金県支出金地方債その他議会費」に汚染する（Σ は通るので素通りする）。
      // **歳入側には足せない** — 国庫支出金・県支出金は歳入では実在する款名（款18・款19）。
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国庫支出金|県支出金|地方債|その他",
    },
  },
  {
    id: "kobe-yosansho-r7",
    title: "令和7年度 神戸市各会計予算に関する説明書（一般会計 総括・款別歳入歳出）",
    publisher: "神戸市",
    url: null,
    urls: ["https://www.city.kobe.lg.jp/documents/48584/2025yosannsetsumeisho.pdf"],
    landingPage: "https://www.city.kobe.lg.jp/a61436/shise/financial/yosankessan.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "神戸市（一般会計・団体コード281000）",
    license:
      "当ウェブサイトで公開している情報（以下「コンテンツ」といいます。）は、どなたでも以下の１）〜７）に従って、複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます。商用利用も可能です。１）出典の記載について ア コンテンツを利用する際は出典を記載してください。４）本利用ルールが適用されないコンテンツについて 以下のコンテンツについては、本利用ルールの適用外です。ア 組織や特定の事業を表すシンボルマーク、ロゴ、キャラクターデザイン イ 具体的かつ合理的な根拠の説明とともに、別の利用ルールの適用を明示しているコンテンツ ７）その他 ア 本利用ルールは、著作権法上認められている引用などの利用について、制限するものではありません。 イ 本利用ルールは、政府標準利用規約(第 2.0 版)に準拠し、平成 29 年 7 月１日に定めたものです。 ウ 本利用ルールは、クリエイティブ・コモンズ・ライセンスの表示 4.0 国際（CC BY）と互換性があり、本利用ルールが適用されるコンテンツは CC BY に従うことでも利用することができます。（出典：神戸市ウェブサイト利用規約 https://www.city.kobe.lg.jp/documents/19135/20170630041802-1.pdf）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 4 },
      expenditurePages: { from: 5, to: 5 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // 歳出の財源内訳ヘッダ（`一般財源` / `国庫支出金 県支出金 地方債 その他`）が
      // KAN_HEADER_RE のどれにも当たらず、款1 の款名を
      // 「一般財源国庫支出金県支出金地方債その他議会費」に汚染する（Σ は通るので素通りする）。
      // **歳入側には足せない** — 国庫支出金・県支出金は歳入では実在する款名（款18・款19）。
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国庫支出金|県支出金|地方債|その他",
    },
  },
  {
    id: "kobe-yosansho-r6",
    title: "令和6年度 神戸市各会計予算に関する説明書（一般会計 総括・款別歳入歳出）",
    publisher: "神戸市",
    url: null,
    urls: ["https://www.city.kobe.lg.jp/documents/48584/2024yosannsetumeisyo.pdf"],
    landingPage: "https://www.city.kobe.lg.jp/a61436/shise/financial/yosankessan.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "神戸市（一般会計・団体コード281000）",
    license:
      "当ウェブサイトで公開している情報（以下「コンテンツ」といいます。）は、どなたでも以下の１）〜７）に従って、複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます。商用利用も可能です。１）出典の記載について ア コンテンツを利用する際は出典を記載してください。４）本利用ルールが適用されないコンテンツについて 以下のコンテンツについては、本利用ルールの適用外です。ア 組織や特定の事業を表すシンボルマーク、ロゴ、キャラクターデザイン イ 具体的かつ合理的な根拠の説明とともに、別の利用ルールの適用を明示しているコンテンツ ７）その他 ア 本利用ルールは、著作権法上認められている引用などの利用について、制限するものではありません。 イ 本利用ルールは、政府標準利用規約(第 2.0 版)に準拠し、平成 29 年 7 月１日に定めたものです。 ウ 本利用ルールは、クリエイティブ・コモンズ・ライセンスの表示 4.0 国際（CC BY）と互換性があり、本利用ルールが適用されるコンテンツは CC BY に従うことでも利用することができます。（出典：神戸市ウェブサイト利用規約 https://www.city.kobe.lg.jp/documents/19135/20170630041802-1.pdf）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 4 },
      expenditurePages: { from: 5, to: 5 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // 歳出の財源内訳ヘッダ（`一般財源` / `国庫支出金 県支出金 地方債 その他`）が
      // KAN_HEADER_RE のどれにも当たらず、款1 の款名を
      // 「一般財源国庫支出金県支出金地方債その他議会費」に汚染する（Σ は通るので素通りする）。
      // **歳入側には足せない** — 国庫支出金・県支出金は歳入では実在する款名（款18・款19）。
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国庫支出金|県支出金|地方債|その他",
    },
  },
  {
    // 京都市（団体コード 261009・人口137万）。予算に関する説明書（議第1号・274p・5.4MB）。
    // **横浜型**（事項別明細書の冒頭に「(1) 総括」が単独ページ）で kofu-yosansho に乗る。
    // 歳入16款 / 歳出15款。**款体系は R2〜R8 で完全不変**（款番号も款名も同一）＝経年で款が繋がる。
    // 名古屋（職員費新設）・横浜（局再編）・福岡（款番号繰下げ）のような断層が無い数少ない政令市。
    // 款は局ベースの独自体系（民生費・衛生費が無く 文化市民費・子ども若者はぐくみ費・産業観光費・
    // 計画費・災害対策費）なので、decision 階層（総務省決算＝目的別）とは款名が食い違う。
    //
    // ⚠ **ページ位置が年度で動く**（R8=7-8/9-10・R7〜R5=5-6/7-8・R4〜R2=4-5/6-7）。
    // R8 だけ表紙が2回入るため2ページ後ろ。**外挿せず年度ごとに実確認すること**。
    // ⚠ **ファイル名に規則性が無い**（01_ippantousyo / 01_tousyoippan / 04-1_ippann_jikoubetu /
    // 01_ippannjikoubetuR4 / ippan / 01ippan）。年度追加は年度インデックス
    // （/menu5/category/69-2-2-0-0-0-0-0-0-0.html）の実リンクから辿る。
    //
    // 罠:
    //   - ヘッダの `千分比`（歳入）/ `一般財源`（歳出）が KAN_HEADER_RE に当たらず、
    //     各ページ先頭の款名を汚す（`千分比市税` / `一般財源議会費`）。**金額とΣは正しいので
    //     validate を素通りする**（横浜「千円千円千円市税」・神戸「一般財源…議会費」と同型）
    //     → revenueHeaderExtra / expenditureHeaderExtra で弾く。
    //   - 歳出 款5「子ども若者はぐくみ費」が中央寄せ3行折返し（款行の名前欄が空）。既存の下段折返し対応で復元。
    //   - 歳入 款14 繰越金が本年度・前年度とも **1千円の象徴計上**（大阪 §8e と同型）。
    //   - 皆増・皆減・廃止款の括弧書きは**無し**（7年度とも実測）。
    //
    // **「予算資料」（01_2_yosangaiyou…）を款別として使ってはいけない** — p.19 歳入は款ではなく
    // 一般財源/国府支出金等の**区分**、p.22 歳出「行政目的別予算額」は**行政目的×款のクロス表**で
    // 諸支出金・総務費・文化市民費が複数の目的に分割再掲される（大阪の「目的別＝再分類表」と同じ罠）。
    // ただし前年度基準の裏取りには有用（R7列を「当初予算額(Ｂ)」と明記・推移表に
    // 「予算額は、各年度とも当初予算額」の注記）。
    //
    // R6 は市長選（2024年2月）の年だが**札幌型の骨格予算問題は起きない**: R7 の前年度列
    // 951,393,000 は R6 の**第一次編成（＝当初・議第1号）**の本年度額と一致し、第二次編成後
    // （961,618,000＝補正込み）ではない。**収録するのは第一次編成の page/0000323068**。
    // 次の市長選は2028年2月（R10）なので R10 で再確認する。
    id: "kyoto-yosansho-r8",
    title: "令和8年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000347/347934/01_ippantousyo.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000347934.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 },
      expenditurePages: { from: 9, to: 10 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    id: "kyoto-yosansho-r7",
    title: "令和7年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000335/335933/01_tousyoippan.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000335933.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 },
      expenditurePages: { from: 7, to: 8 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    id: "kyoto-yosansho-r6",
    title: "令和6年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000323/323068/01_tousyoippan.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000323068.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 },
      expenditurePages: { from: 7, to: 8 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    id: "kyoto-yosansho-r5",
    title: "令和5年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000304/304545/04-1_ippann_jikoubetu.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000304545.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 },
      expenditurePages: { from: 7, to: 8 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    id: "kyoto-yosansho-r4",
    title: "令和4年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000290/290208/01_ippannjikoubetuR4.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000290208.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 4, to: 5 },
      expenditurePages: { from: 6, to: 7 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    id: "kyoto-yosansho-r3",
    title: "令和3年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000293/293622/ippan.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000293622.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 4, to: 5 },
      expenditurePages: { from: 6, to: 7 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    id: "kyoto-yosansho-r2",
    title: "令和2年度 京都市一般会計予算 予算に関する説明書（事項別明細書 総括・款別歳入歳出）",
    publisher: "京都市",
    url: null,
    urls: ["https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000259/259833/01ippan.pdf"],
    landingPage: "https://www.city.kyoto.lg.jp/gyozai/page/0000259833.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "京都市（一般会計・団体コード261009）",
    license:
      "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 4, to: 5 },
      expenditurePages: { from: 6, to: 7 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueHeaderExtra: "千分比",
      expenditureHeaderExtra: "一般財源",
    },
  },
  {
    // 北九州市（団体コード 401005・人口91万）。一般会計当初予算に関する説明書（332p・2.2MB）。
    // **横浜型**（事項別明細書の冒頭に「1 総括」が単独ページ）で kofu-yosansho に無改修で乗る。
    // 歳入25款 / 歳出16款。1側が2ページに跨り**合計行は最終ページにしかない**。
    //
    // ⚠ **ページ位置が年度で動く**（R8〜R4=6-7/8-9・R3=7-8/9-10・R2=11-12/13-14。R2 は表紙・目次に
    // 空白ページが挟まる）。印字とのオフセットも年度で違う（R8〜R4=+3 / R3=+2 / R2=+6）。**外挿しない**。
    // ⚠ **物理 p.3-4 は会計別歳出集計表（特別会計・企業会計を含む）**なので、ページ指定を誤ると特会が混入する。
    // ⚠ **年度インデックスの URL にもファイル名にも規則性が無い**（連番 ID）。年度追加は必ず
    // 当初予算インデックス（/shisei/menu05_0165.html）の実リンクから辿る。
    //
    // 神戸 §8h・京都 §8i と同じ財源内訳ヘッダ（`一般財源` / `国県支出金 地方債 その他`）を持つが、
    // **北九州はヘッダブロックと款1 の間に空行がある**ため断片が reset され汚染しない（実測）
    // → expenditureHeaderExtra は不要。
    //
    // 罠:
    //   - **R2 は歳入26款**（款10 に自動車取得税交付金）で、R3 以降は25款＝**款番号が1つ繰下がる**
    //     （福岡と同型）。経年比較を款番号でやると R2/R3 の境界で壊れるので款名で突合する。
    //     歳出は R2〜R8 で16款・款名とも完全不変。
    //   - **R3 歳入に款番号が `〇`（U+3007）の廃止款**（自動車取得税交付金 0 / 10）がある。
    //     パーサが許容するのは `○`（U+25CB）なので**取れず、前年度Σが 10千円 不足する**
    //     （合計の 0.0000018%）。docs §8j 参照。
    //   - **R5 は市長選（2023年2月）の年だが骨格予算問題は起きない** — R5 当初予算案は5月臨時会に
    //     出された肉付済みの当初で、`骨格` の語は資料に0件。R6 の前年度列が R5 当初と完全一致する。
    //     **次の市長選は2027年2月（R9）なので R9 収録時に再確認する。**
    id: "kitakyushu-yosansho-r8",
    title: "令和8年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/001192254.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000366_00004.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // 主な事業（同じ資料の歳出事項別明細書・説明欄・2026-07-23 #126）。〇の親事業に款項目が
      // 付き、Σ親=目・Σ内訳=親の完全分解が成り立つ（§8j-2）。ページは物理・年度ごとに実測。
      // R2・R3 は旧版面（R3 はマーカーがテキスト層に無い）のため対象外。
      projectPages: { from: 123, to: 258 },
      projectFormat: "meisai-tree",
    },
  },
  {
    // 北九州市（団体コード 401005）「令和6年度 行政評価の取組結果（事業評価）」。事業報告（成果）。
    // 局別に配信されているが、**全局を1冊にまとめた「全局分」PDF が別途あり**（42p・648KB）、
    // 18局分を個別に集める必要が無い。横置きワイド表・1行1事業・KPIは数値が無い（質的目標のみ）
    // 事業もあるため任意扱い（198事業中175件が数値KPIを1個以上持ち、うち26件は①②とも持つ）。
    // 評価は「順調/概ね順調/やや遅れ/遅れ」の4段階（`progress` フィールド・川崎の1〜5やA〜Fに
    // 当てはまらない語彙）。今後の方向性は「継続/拡充/廃止」。
    // **款/項/目はこの資料に無い**（執行実績説明書＝別資料「主要施策の成果その他予算の執行実績
    // 説明書」にのみ款がある。決算額±事業名の近似一致で機械結合できる見込みだが未実装＝
    // docs §8j「未収録（発見済み）」参照）。
    id: "kitakyushu-jigyou-hyoka-r6",
    title: "令和6年度 行政評価の取組結果（事業評価）",
    publisher: "北九州市",
    url: "https://www.city.kitakyushu.lg.jp/files/001158940.pdf",
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/092_00028.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kitakyushu-jigyou-hyoka",
  },
  {
    id: "kitakyushu-yosansho-r7",
    title: "令和7年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/001129574.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000366_00002.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      projectPages: { from: 122, to: 263 },
      projectFormat: "meisai-tree",
    },
  },
  {
    id: "kitakyushu-yosansho-r6",
    title: "令和6年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/001074934.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000366.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      projectPages: { from: 118, to: 259 },
      projectFormat: "meisai-tree",
    },
  },
  {
    id: "kitakyushu-yosansho-r5",
    title: "令和5年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/001034900.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000339.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      projectPages: { from: 121, to: 267 },
      projectFormat: "meisai-tree",
    },
  },
  {
    id: "kitakyushu-yosansho-r4",
    title: "令和4年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/000966725.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000323.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      projectPages: { from: 118, to: 263 },
      projectFormat: "meisai-tree",
    },
  },
  {
    id: "kitakyushu-yosansho-r3",
    title: "令和3年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/000917954.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000288.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 },
      expenditurePages: { from: 9, to: 10 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    id: "kitakyushu-yosansho-r2",
    title: "令和2年度 北九州市一般会計当初予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "北九州市",
    url: null,
    urls: ["https://www.city.kitakyushu.lg.jp/files/000840516.pdf"],
    landingPage: "https://www.city.kitakyushu.lg.jp/contents/09000262.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "北九州市（一般会計・団体コード401005）",
    license:
      "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 11, to: 12 },
      expenditurePages: { from: 13, to: 14 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 千葉市（団体コード 121002・人口98万）。一般会計予算書 附 予算に関する説明書（369p・4.6MB）。
    // **横浜型**（事項別明細書の冒頭に「1 総括」が単独ページ群）で kofu-yosansho に無改修で乗る。
    // 歳入26款 / 歳出13款。1側が複数ページに跨り**合計行は最終ページにしかない**。
    // 印字ページとは **+3** ずれる（物理 p.31 = 印字 28）。
    //
    // **歳出は総務省の目的別13款と一致**（さいたま §8f に次ぐ2例目）＝decision 階層と款名が揃う。
    //
    // ⚠ **過年度は R8 の次が R4 まで飛ぶ**（原典が壊れている。docs §8k）:
    //   R7=別様式（款名行と金額行が2行に割れる。パーサは「款行が1件も抽出できませんでした」で throw
    //      ＝静かには壊れない）／R6・R2=無OCRのスキャン（pdftotext が完全に空）／
    //   R3=**広島型OCR**（`県支出今`・カンマが小数点に化ける）／R5=款名がテキスト層に存在しない
    // ⚠ **R4 は歳出14款**（款11 災害復旧費）で、R5 以降は13款＝**款番号が繰り上がる**。款名で突合する。
    // ⚠ **R7 は骨格予算**（市長選 2025年3月）。ただし**札幌型の罠は起きない** — R8 の前年度列
    //    551,200,000 は R7 当初（骨格）と一致し、肉付後 553,464百万円 ではない（発行元自身が
    //    `1-4_r8kaikeibetsu_giketsugo.pdf` p.1 の推移表に「（）内数字は肉付け補正後」と明記）。
    //    **比較対象の R7 当初そのものが骨格予算**である点は残る。次の市長選は2029年3月（R11）。
    // ⚠ **`1-4_r8kaikeibetsu_giketsugo.pdf`（会計別・款別予算額）を款別として使ってはいけない** —
    //    一見「款別＋前年当初」に見えるが**残りが「その他」に丸められ**（歳入11行＋その他）、
    //    単位が百万円。さいたま §8f の編成過程 PDF と同種の罠。前年度基準の裏取りには有用。
    // ⚠ **URL に規則性が無い**（`r8yosansho_ippan` / `01_r7yosansho_ippan` / `ippannkaikei` / `r4ippan`）。
    //    年度ページも `r8yosan`〜`r4yosan` / **`r03yosan`**（ゼロ埋め）/ **`r2yosan2`** と破れる。
    //    年度追加は年度インデックス（`/zaiseikyoku/zaisei/zaisei/yosan.html`）の実リンクから辿る。
    // 罠: 象徴計上が3件（款10 自動車取得税交付金 `1/1`・款11 環境性能割交付金 `1/705,000`・
    //     款24 繰越金 `1/1`）。財源内訳ヘッダ（`一般財源` 等）はあるが**款1 の直前に空行が2行入り
    //     reset される**ため神戸 §8h の汚染は起きない（＝空行に救われているだけ。様式が変わったら疑う）。
    id: "chiba-yosansho-r8",
    title: "令和8年度 千葉市一般会計予算書 附 予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "千葉市",
    url: null,
    urls: ["https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/documents/r8yosansho_ippan.pdf"],
    landingPage: "https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/r8yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "千葉市（一般会計・団体コード121002）",
    license:
      "千葉市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として千葉市に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。千葉市ホームページは利用目的を問わず自由に閲覧していただくことが可能ですが、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、千葉市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 31, to: 33 },
      expenditurePages: { from: 34, to: 35 },
      revenueHeading: "(歳入)",
      expenditureHeading: "(歳出)",
    },
  },
  {
    id: "chiba-yosansho-r4",
    title: "令和4年度 千葉市一般会計予算書 附 予算に関する説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "千葉市",
    url: null,
    urls: ["https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/documents/r4ippan.pdf"],
    landingPage: "https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/r4yosan.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "千葉市（一般会計・団体コード121002）",
    license:
      "千葉市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として千葉市に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。千葉市ホームページは利用目的を問わず自由に閲覧していただくことが可能ですが、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、千葉市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 27, to: 29 },
      expenditurePages: { from: 30, to: 31 },
      revenueHeading: "(歳入)",
      expenditureHeading: "(歳出)",
    },
  },
  {
    // 仙台市（団体コード 041009・人口106万）。一般会計・特別会計・下水道事業会計 予算説明書（11p・0.4MB）。
    // **横浜型**（事項別明細書の冒頭に「1 総括」が単独ページ）。歳入 p.9（26款）/ 歳出 p.10（13款）。
    // **物理 = 印字 +6**。歳入も歳出も1ページ完結で合計行も同ページにあるので単数指定で足りる。
    //
    // ⚠ **p.11 を expenditurePages に含めてはいけない** — p.11 は歳出表の右側「本年度予算額の財源内訳」の
    // 溢れページで**款列が無い**（さいたま §8f の p.35 と同じ罠）。単数 expenditurePage を使う限り安全。
    //
    // ⚠ **born-digital は R8 が初年度**。R2〜R7 の予算説明書は総括ページが CCITT スキャンで
    // **テキスト層ゼロ**（pdftotext が17文字しか返さない＝完全に空。広島型の「もっともらしい誤数字」
    // ではなく安全側に落ちる）。born-digital な款別は記者発表型 PDF にあるが**列順が逆**
    // （`[前年度, 当年度]`）で**款番号も無い**ため乗らない。docs §8l。
    //
    // 罠: **款13「国有提供施設等所在市助成／交付金」が第4の折返し型**（款行の名前欄が非空のまま
    //     下段へ続く）。既存の3型（上段折返し・中央寄せ3行・款番号単独行）のどれでもなく、
    //     放置すると款13 が切れ**款14 が「交付金地方特例交付金」に汚染される**。
    //     金額は全件正しく Σ も4系統一致するので **validate を素通りする**
    //     → parserOptions.kanNameContinues で明示する。
    //     象徴計上が3件（款10 自動車取得税交付金 `1/1`・款11 環境性能割交付金 `1/551,000`・
    //     款24 繰越金 `1/1`）。皆増・皆減・廃止款は0件（実測）。
    // **款13款だが総務省の目的別13款とは別物**（民生費・衛生費が無く 市民費・健康福祉費・環境費・
    // 経済費）。さいたま §8f・千葉 §8k と違い局ベースの独自体系なので decision と款名が食い違う。
    // 仙台市長選は8月なので**骨格予算問題は起きない**。R8 一般会計は第14号議案・原案可決。
    // ⚠ **URL 規則が破れる**: R5〜R8 は `/rNterekai/rN-1/index/index/documents/`（index が2つ）、
    //    **R2〜R4 は index が1つ**。年度追加は年度インデックスの実リンクから辿る。
    id: "sendai-yosansho-r8",
    title: "令和8年度 仙台市一般会計予算説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "仙台市",
    url: null,
    urls: [
      "https://www.city.sendai.jp/yosandaichi/shise/zaise/zaimu/zaise/sendaishi/yosan/r8terekai/r8-1/index/index/documents/1_r8tousho_mokuji.pdf",
    ],
    landingPage:
      "https://www.city.sendai.jp/yosandaichi/shise/zaise/zaimu/zaise/sendaishi/yosan/r8terekai/r8-1/index/index/yosansetumei.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "仙台市（一般会計・団体コード041009）",
    license:
      "仙台市ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、仙台市ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、仙台市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 9,
      expenditurePage: 10,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // 款13「国有提供施設等所在市助成」の款名が次行の「交付金」へ続く（第4の折返し型）
      kanNameContinues: { revenue: [13] },
    },
  },
  {
    // 堺市（団体コード 271403・人口81万）。**広島型**（予算書本体が使えず別資料に逃げる）。
    // ただし広島とは壊れ方が違う: 予算説明書 `R8-2ippannkaikeiyosannsetsumeisyo.pdf`（330p）は
    // InDesign 製の born-digital でありながら**本文が全てベジエ曲線のアウトライン**で描かれており、
    // **テキスト層が無い**（p.9 のコンテンツストリームに Tj/TJ が0個・c=10,019・l=4,466。画像も0個）。
    // 330ページ全部で pdftotext が返すのは印字ページ番号だけ。
    // **広島（スキャン＋OCR＝もっともらしい誤数字）と違い堺は「空」を返す**ので静かには壊れない。
    //
    // 逃げ先は市議会の議案書に付く**予算案説明資料**（434p・born-digital）の
    // 「第2 一般会計歳入款別分類表」（物理 p.8）/「第3 一般会計歳出目的別分類表」（物理 p.9）。
    // **1ページ＝1側の単独表＝横浜型の構造**なので kofu-yosansho に乗る。**オフセット +6**。
    // ⚠ **目次（物理 p.3）にも同じ見出し語が出る**ので、ページ指定を誤ると目次を読む。
    // ⚠ **大阪の「目的別歳出予算＝再分類表」ではない**（明細書 p.12 と全款一致することを実測確認）。
    // 広島 §8g の「目的別分類表＝款そのもの」と同じ側。
    //
    // **歳出13款が総務省の目的別と一致**（さいたま §8f・千葉 §8k に次ぐ3例目）＝decision と款名が揃う。
    // **災害復旧費は存在せず** 11=公債費（欠番ではない）。款体系は R2〜R8 で不変。
    //
    // ⚠ **過年度は R5・R4 が収録不可**（鎖が R8–R6 と R3–R2 に分断される）:
    //   R5 = **歳入だけ**が MS-Mincho Identity-H・uni=no で数字が丸ごと脱落（歳出 p.9 は無傷）。
    //        Σ が立たず落ちるが、**「歳出だけ通ったから R5 は OK」と早合点しないこと**
    //   R4 = 全面文字化け（`➨ࠉ㈈ᨻつᶍẚ㍑⾲`）。数字も脱落
    // ⚠ **URL に規則性がゼロ**（年度ページ・議案ページ・ファイル名すべて）。
    //    年度追加は議案書インデックス（/shigikai/kaigi/giansyo/index.html）の実リンクから辿る。
    // ⚠ **物理 p.8/p.9 が R8〜R3 で一致するのは偶然**（**R2 だけ p.6/p.7**）。外挿しない。
    //
    // 罠:
    //   - 列見出しの `款  別` 単独行が KAN_HEADER_RE のどれにも当たらず款1 を「款別市税」に汚す
    //     （`^款$` は完全一致なので当たらない）。金額とΣは正しく素通りする → HeaderExtra で弾く
    //   - **廃止款「（環境性能割交付金）」が3行折返し・款番号なし・皆減**（前年 861,000＝合計の0.18%）。
    //     §9c の対応で拾える
    //   - 象徴計上 款22 繰越金 `1 / 1`
    //   - 中央寄せ3行折返しが歳入に4件（款5・9・11・14）。既存の awaitTail でカバー済み
    //   - 堺市長選は6月（2019・2023）で次は2027年6月＝R9。ただし**列見出しに `当初` と明記する様式**
    //     なので札幌型の無注記問題は起きない見込み（R10 で再確認）
    id: "sakai-yosansho-r8",
    title: "令和8年度 堺市予算案説明資料（第2 一般会計歳入款別分類表・第3 一般会計歳出目的別分類表）",
    publisher: "堺市",
    url: null,
    urls: ["https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/R8-1giannsyo.files/R8-2yosannannsetsumeisiryou.pdf"],
    landingPage: "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/R8-1giannsyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "堺市（一般会計・団体コード271403）",
    license:
      "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "一般会計歳入款別分類表",
      expenditureHeading: "一般会計歳出目的別分類表",
      revenueHeaderExtra: "^款別$",
      expenditureHeaderExtra: "^款別$",
    },
  },
  {
    id: "sakai-yosansho-r7",
    title: "令和7年度 堺市予算案説明資料（第2 一般会計歳入款別分類表・第3 一般会計歳出目的別分類表）",
    publisher: "堺市",
    url: null,
    urls: ["https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/giannsyo_R7-1.files/R7-1_yosannnannsetumei.pdf"],
    landingPage: "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/giannsyo_R7-1.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "堺市（一般会計・団体コード271403）",
    license:
      "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "一般会計歳入款別分類表",
      expenditureHeading: "一般会計歳出目的別分類表",
      revenueHeaderExtra: "^款別$",
      expenditureHeaderExtra: "^款別$",
    },
  },
  {
    id: "sakai-yosansho-r6",
    title: "令和6年度 堺市予算案説明資料（第2 一般会計歳入款別分類表・第3 一般会計歳出目的別分類表）",
    publisher: "堺市",
    url: null,
    urls: ["https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/75920720240209111619595.files/R6-1yosannannsetumeisyo.pdf"],
    landingPage: "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/75920720240209111619595.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "堺市（一般会計・団体コード271403）",
    license:
      "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "一般会計歳入款別分類表",
      expenditureHeading: "一般会計歳出目的別分類表",
      revenueHeaderExtra: "^款別$",
      expenditureHeaderExtra: "^款別$",
    },
  },
  {
    id: "sakai-yosansho-r3",
    title: "令和3年度 堺市予算案説明資料（第2 一般会計歳入款別分類表・第3 一般会計歳出目的別分類表）",
    publisher: "堺市",
    url: null,
    urls: ["https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0301gian.files/0301-yosannan.pdf"],
    landingPage: "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0301gian.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "堺市（一般会計・団体コード271403）",
    license:
      "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "一般会計歳入款別分類表",
      expenditureHeading: "一般会計歳出目的別分類表",
      revenueHeaderExtra: "^款別$",
      expenditureHeaderExtra: "^款別$",
    },
  },
  {
    id: "sakai-yosansho-r2",
    title: "令和2年度 堺市予算案説明資料（第2 一般会計歳入款別分類表・第3 一般会計歳出目的別分類表）",
    publisher: "堺市",
    url: null,
    urls: ["https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0207giansho.files/0201yosanansetumeishiryo.pdf"],
    landingPage: "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0207giansho.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "堺市（一般会計・団体コード271403）",
    license:
      "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "一般会計歳入款別分類表",
      expenditureHeading: "一般会計歳出目的別分類表",
      revenueHeaderExtra: "^款別$",
      expenditureHeaderExtra: "^款別$",
    },
  },
  {
    // 新潟市（団体コード 151009・人口77万）。予算説明書（一般会計・233p・1.5MB）。
    // **横浜型**（事項別明細書の冒頭に「1 総括」）だが、**歳入が見開き2ページ型**（docs §9e）:
    //   物理 p.8 =「款番号＋款名」だけ / 物理 p.9 =「本年度・前年度・比較」だけ
    // revenuePages（縦連結）では組めないので revenueSpread で行順に1:1で組む。
    // 歳出 p.10 は款名＋金額が同一行なので通常指定。**物理 = 印字 +2**。
    // ⚠ **p.11 は歳出の財源内訳**（款列なし）。expenditurePages に含めない。
    //
    // **歳出14款が総務省の目的別と一致**（さいたま §8f・千葉 §8k・堺 §8m に次ぐ4例目）。
    // **折返しは1件も無い**（款12「国有提供施設等所在市町村助成交付金」すら1行に収まる）。
    // 廃止款・三点リーダ・ヘッダ断片汚染もなし。
    //
    // 罠:
    //   - **見出しの全角/半角が同一文書内で不統一**（歳入 `（歳入）`＝全角 / 歳出 `(歳出)`＝**半角**）
    //   - 款名ページの2行目 `１ 総 括` は全角1 が半角化されると款1 に見える → 見出しより後ろだけを採る
    //   - 象徴計上 款24 繰越金 `1 / 1`。**見開きの組み立てで1桁の行を取りこぼすと以降が丸ごと1つずれ、
    //     Σ も款名も「それらしく」合ってしまう** → 件数一致の assert が唯一の網
    //   - 款5・款24 は比較欄が空欄（差0）。先頭2列運用なので無害
    // **R6 は収録しない** — 歳出 款11 災害復旧費の前年度欄が空欄なのに `皆増` の表記が無く、
    // パーサが比較列を前年度と誤読して前年度Σが +5,543,080 ずれる（皆増/皆減は原典の記号に
    // 依存する設計なので、記号が無いと救えない）。docs §8n。
    // ⚠ **ファイル名に規則性がほぼ無い**（R8=`shinen` / R7・R6=`-ippan` / R5=`_ippan_shinnen` /
    //    R3=`shinnensyosansyo`（誤植））。年度追加は年度インデックスの実リンクから辿る。
    // ⚠ **R4=74MB・R2=25MB・H31=48MB はスキャン疑い**。遡るならテキスト層の判定を先にやる。
    // **却下した代替**: 記者会見 資料3 は款名＋金額が同一行で乗るが、**款26 の名前が
    // `市債（臨時財政対` に壊れる**（§9d の第4折返し型・重複しないので validate も素通り）。
    // 独立検証には優秀（金額は予算説明書と完全一致することを確認済み）。
    id: "niigata-yosansho-r8",
    title: "令和8年度 新潟市予算説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "新潟市",
    url: null,
    urls: [
      "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.files/R8-2yosansyo_shinen-ippan.pdf",
    ],
    landingPage: "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "新潟市（一般会計・団体コード151009）",
    license:
      "市公式ホームページに掲載している文書、画像等のファイルやその内容（以下「内容等」という）については、原則として新潟市に帰属します。ただし、一部の内容等の著作権は、原著作者が所有しています。市公式ホームページ内の内容等については、著作権法上認められた「私的使用のための複製」や「引用」等の場合を除き、新潟市及び内容等の提供者に無断で転載、複製、改変、販売、貸与等の利用をすることはできません。ただし、新潟市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenueSpread: { namePage: 8, amountPage: 9 },
      revenueHeading: "（歳入）",
      expenditurePage: 10,
      expenditureHeading: "(歳出)",
    },
  },
  {
    id: "niigata-yosansho-r7",
    title: "令和7年度 新潟市予算説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "新潟市",
    url: null,
    urls: [
      "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.files/r7-2yosansyo-ippan.pdf",
    ],
    landingPage: "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "新潟市（一般会計・団体コード151009）",
    license:
      "市公式ホームページに掲載している文書、画像等のファイルやその内容（以下「内容等」という）については、原則として新潟市に帰属します。ただし、一部の内容等の著作権は、原著作者が所有しています。市公式ホームページ内の内容等については、著作権法上認められた「私的使用のための複製」や「引用」等の場合を除き、新潟市及び内容等の提供者に無断で転載、複製、改変、販売、貸与等の利用をすることはできません。ただし、新潟市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenueSpread: { namePage: 8, amountPage: 9 },
      revenueHeading: "（歳入）",
      expenditurePage: 10,
      expenditureHeading: "(歳出)",
    },
  },
  {
    // 浜松市（団体コード 221309・人口78万）。予算に関する説明書（一般会計・484p・1.4MB）。
    // **横浜型**。歳入 物理 p.6（25款）/ 歳出 p.7（13款）。**印字 = 物理（オフセット0）**で、
    // 表紙・目次を含めて採番しているため一致する（政令市では珍しい）。
    // **歳出13款が総務省の目的別と一致**（さいたま §8f・千葉 §8k・堺 §8m・新潟 §8n に次ぐ5例目）。
    //
    // 罠は**款名汚染が1件だけ・ただし必発**（神戸 §8h と同型・R4〜R8 の全5年で再現）:
    //   歳出 p.7 の `一 般 財 源` と `国県支出金 地 方 債 そ の 他` が KAN_HEADER_RE のどれにも
    //   当たらず、**款1 の直前に空行が無い**ため断片が溜まり
    //   款1 が「一般財源国県支出金地方債その他議会費」になる。
    //   **金額は全件正しく Σ も4系統一致し、款名重複ゲートも効かない**（重複しないため）
    //   ＝目視しないと気づけない型。**歳入 p.6 は空行に救われて汚染しない**。
    //   `国県支出金` は歳入の款18 国庫支出金・款19 県支出金と別語だが、側で分けるのが安全。
    // 折返し・皆増皆減・象徴計上・廃止款・三点リーダは**すべて無し**（実測）。
    // 他市で必ず折れる款12「国有提供施設等所在市町村助成交付金」すら1行に収まる。
    //
    // **R5 は市長選（2023年4月）の年だが骨格予算問題は起きない** — R5 当初は R4比 +7.0%、
    // 概要に「骨格」「肉付」の語が0件、R6 の前年度列が R5 当初と完全一致。
    // **次の市長選は2027年4月（R9）なので R9 収録時に再確認する。**
    // ⚠ **R3・R2 は説明書がそもそも非掲載**（「説明書」の語が0件＝リンク切れではない。さいたま §8f と同型）。
    //    参考資料「一般会計予算款別構成比調」で回収できる見込みだが別 parserOptions が要る（未収録）。
    // ⚠ **URL に規則性が無い**（`22_setumeisho08` / `l_yosansetsumeisho` / `l-setumeishoippan`(ハイフン) /
    //    `yosansetumeisyo_ippan` / `r4_yosansetumeisyo_ippan`。documents id も不規則）。
    //    **年度ページ自体は budget08〜budget18 と規則的**なのが救い。年度追加はそこの実リンクから辿る。
    // ⚠ **PDF の生成系が年度でバラバラ**（R8/R7=DocuWorks・R6=Microsoft Print To PDF・R5/R4=eDocument
    //    Library）。R4〜R8 は全年度テキスト層 OK を実測したが、今後の年度は必ず pdffonts から確認する。
    id: "hamamatsu-yosansho-r8",
    title: "令和8年度 浜松市予算に関する説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "浜松市",
    url: null,
    urls: [
      "https://www.city.hamamatsu.shizuoka.jp/documents/171794/22_setumeisho08.pdf",
      // 主な事業（資料02「2026年度市政運営の基本方針の主要事業」・2026-07-23 #126・§8o-2）。
      // 詳細版の資料03は5分割中2分割が画像のみでパース不可のため、全行に款+金額+所管課が付く
      // 資料02を採る（金額は純粋な当年度事業費。債務負担行為の加算は資料03側だけの性質と実測）。
      "https://www.city.hamamatsu.shizuoka.jp/documents/171794/02_syuyojigyo08.pdf",
    ],
    landingPage: "https://www.city.hamamatsu.shizuoka.jp/zaisek/budget/budget08/index.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "浜松市（一般会計・団体コード221309）",
    license:
      "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国県支出金|地方債|その他",
      kanFile: "22_setumeisho08.pdf",
      projectsFile: "02_syuyojigyo08.pdf",
      projectPages: { from: 1, to: 97 },
      projectFormat: "numbered-rows",
    },
  },
  {
    id: "hamamatsu-yosansho-r7",
    title: "令和7年度 浜松市予算に関する説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "浜松市",
    url: null,
    urls: [
      "https://www.city.hamamatsu.shizuoka.jp/documents/164874/l_yosansetsumeisho.pdf",
      // 主な事業（資料02「2025年度市政運営の基本方針の主要事業」・R8 と同型・§8o-2）
      "https://www.city.hamamatsu.shizuoka.jp/documents/164874/02_bunyabetsu.pdf",
    ],
    landingPage: "https://www.city.hamamatsu.shizuoka.jp/zaisek/budget/budget07/index.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "浜松市（一般会計・団体コード221309）",
    license:
      "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国県支出金|地方債|その他",
      kanFile: "l_yosansetsumeisho.pdf",
      projectsFile: "02_bunyabetsu.pdf",
      projectPages: { from: 1, to: 95 },
      projectFormat: "numbered-rows",
      // ⚠ p.65「重度障害者等就労・大学修学支援事業」だけ**原本に款セルが無い**（±180pt を実測して
      //    欠落を確認・偵察 2026-07-23）。この1件だけ明示的に許す
      projectKanlessAllowed: 1,
    },
  },
  {
    id: "hamamatsu-yosansho-r6",
    title: "令和6年度 浜松市予算に関する説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "浜松市",
    url: null,
    urls: ["https://www.city.hamamatsu.shizuoka.jp/documents/157760/l-setumeishoippan.pdf"],
    landingPage: "https://www.city.hamamatsu.shizuoka.jp/zaisek/budget/budget06/index.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "浜松市（一般会計・団体コード221309）",
    license:
      "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国県支出金|地方債|その他",
    },
  },
  {
    id: "hamamatsu-yosansho-r5",
    title: "令和5年度 浜松市予算に関する説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "浜松市",
    url: null,
    urls: ["https://www.city.hamamatsu.shizuoka.jp/documents/148959/yosansetumeisyo_ippan.pdf"],
    landingPage: "https://www.city.hamamatsu.shizuoka.jp/zaisek/budget/budget05/index.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "浜松市（一般会計・団体コード221309）",
    license:
      "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国県支出金|地方債|その他",
    },
  },
  {
    id: "hamamatsu-yosansho-r4",
    title: "令和4年度 浜松市予算に関する説明書（一般会計・歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    publisher: "浜松市",
    url: null,
    urls: ["https://www.city.hamamatsu.shizuoka.jp/documents/133296/r4_yosansetumeisyo_ippan.pdf"],
    landingPage: "https://www.city.hamamatsu.shizuoka.jp/zaisek/budget/budget04/index.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "浜松市（一般会計・団体コード221309）",
    license:
      "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 7,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国県支出金|地方債|その他",
    },
  },
  {
    // 相模原市（団体コード 141500・人口72万）。**予算主要施策説明書**の「一般会計歳入歳出予算の内訳」
    // （款項別）。歳入 物理 p.3-5（24款＋廃止款1）/ 歳出 p.7-8（14款）。
    //
    // **予算書本体（20260216_ippan_setumei.pdf）を使ってはいけない** — 面付けされており
    // **同じ表が2回描かれる**。`pdftotext -layout` は2コピーを微小オフセットで重ねるので
    // 文字が交互に混ざる（`歳歳入出` `本 年本度年予度算予額算 額` `５ ５` `市税 市税`）。
    // `-raw` にすると綺麗な行が出るが**表が丸ごと2回**現れ、しかも合計行にラベルが付かない
    // （ラベル付きの `歳 入 合 計 228,293,804` は一般財源列の合計であって歳入合計ではない）。
    // → **主要施策説明書の款項別に逃げる**（広島 §8g・堺 §8m と同じ判断）。**面付けされておらず
    // `-layout` が素直に効き、合計行も廃止款もあり、総括と全款一致することを確認済み**。
    //
    // 款項が同一表に混在する**大阪 §8e 型**だが、大阪と違い**款番号があり字下げで分かれる**
    // （款＝字下げ1 / 項＝字下げ19）ので kofu-yosansho + kanIndentMax で乗る。
    //
    // 罠:
    //   - **款番号が全角・非連続**（歳入 5,10,13,16,19,20,21,22,25,32,34,37,40,43,46,50,55,60,65,70,
    //     75,80,85,90 / 歳出 5〜70 の5刻み）。**アプリ内で初めて款番号が 1 始まりでない**。
    //     validate の連番チェックが warning を出す（error ではない）が、**原典どおり**。
    //   - **廃止款 `（環境性能割交付金）`**（款番号なし・本年度 `-`・前年 650,000・皆減）。§9c で拾える。
    //   - 折返し・象徴計上・三点リーダは無し（A3幅なので款12 すら1行に収まる）。
    // **歳出14款が総務省の目的別と一致**（さいたま §8f・千葉 §8k・堺 §8m・新潟 §8n・浜松 §8o に次ぐ6例目）。
    // **相模原市長選は2023年4月（R5）だが骨格予算ではない** — 発行元・報道とも「骨格とせず」。
    // R5 当初 328,600,000 が R6 の前年度列と一致することを確認済み。**次は2027年4月（R9）で再確認**。
    // ⚠ **原本の xref が壊れている**（qpdf が `file is damaged` → 再構築）。ダウンロードは完全で
    //    pdftotext は正常に読める＝**発行元ファイル自体の欠陥**。
    // ⚠ **ファイル名に規則性ゼロ**（R8=`20260216_shuyou_setumei` / R7=`04s` / R6=`04`）。
    //    **R5 以前は本体サイトに無くオープンデータポータル**（リソースURLは UUID）。
    id: "sagamihara-yosansho-r8",
    title: "令和8年度 相模原市予算主要施策説明書（一般会計歳入歳出予算の内訳・款項別）",
    publisher: "相模原市",
    url: null,
    urls: [
      "https://www.city.sagamihara.kanagawa.jp/_res/projects/default_project/_page_/001/003/978/r08nend/20260216_shuyou_setumei.pdf",
    ],
    landingPage: "https://www.city.sagamihara.kanagawa.jp/shisei/1026803/1003966/1003978.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "相模原市（一般会計・団体コード141500）",
    license:
      "相模原市のホームページに掲載されている文書や画像等の各ファイル、及びその内容に関する権利は、原則として相模原市に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、許可なく無断で複製や転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 5 },
      expenditurePages: { from: 7, to: 8 },
      revenueHeading: "歳入（款項別）",
      expenditureHeading: "歳出（款項別）",
      kanIndentMax: 2,
      // 主な事業（同じ資料の p.13-73）。**款が付く**数少ない政令市（docs §8b・§8p-2）。
      // p.74 は債務保証・p.77 以降が特別会計なので**ページ範囲だけで除外できる**
      // （p.13-73 に「特別会計」の語が0件であることを実測）。
      projectPages: { from: 13, to: 73 },
      projectFormat: "kan-tree",
    },
  },
  {
    // 熊本市（団体コード 431001・人口73万）。**当初予算（案）の概要**（22p・1.8MB）の
    // 「２．目的別集計表」（物理 p.4・歳出13款）/「４．歳入集計表」（物理 p.6・歳入24款）。
    // **物理 = 印字 +2**。横浜型（款別一覧が単独ページ）で kofu-yosansho に無改修で乗る。
    //
    // **説明書（520p・10.3MB）ではなく概要を採る理由**（数値は完全一致することを確認済み）:
    //   1. 概要は歳入が1ページで完結する（説明書は合計行が2ページ目にしかない）
    //   2. **説明書 p.11 は神戸 §8h の財源内訳ヘッダ汚染が実際に起きる**（款10 が
    //      「一般財源国県支出金地方債その他議会費」になる）
    //   3. **10.3MB は §9b の Wayback 打ち切りに掛かる**（1.8MB なら安全）
    //   4. 過年度の集計表と**同一様式**
    //
    // 罠:
    //   - **款番号が独自採番**（歳入 10,15,21,22,23,24,26,28,29,30,31,32,35,40,45,50,55,60,65,70,75,80,85,90 /
    //     歳出 10,15,20,25,35,40,45,50,55,60,65,70,75 で**30（労働費）が欠番**）。相模原 §8p と同型で §9f 参照。
    //   - **歳入だけ合計ラベルが `合計`**（歳出は `歳出合計`）。
    //   - **皆減が当年度セルに 0 を印字する型**（款29 自動車環境性能割交付金 `0 / 341,000 / △341,000 皆減`）
    //     ＝札幌・北九州型。§9c の prevIdx 判定で正しく前年 341,000 になる。**款番号を持つので廃止款ではない**。
    //   - 上段折返しが1件（款30 `国有提供施設等所在` ＋ `30 市町村助成交付金`）＝豊川・和泉型で既存対応済み。
    //   - 象徴計上・廃止款（記号型）・三点リーダは**無し**。
    //   - 歳出の合計行の直前に注記行 `（うち熊本地震関連） (10,497,884) (9,693,309) …` がある。
    //     款番号を持たず皆減も無いので無視されるが、**将来この行に皆減が付くと廃止款として拾われる**位置。
    // **歳出13款が総務省の目的別と一致**（7例目）。**熊本市長選は11月**なので骨格予算問題は起きない。
    // R8 一般会計（議第3号）は**原案可決**（会議録に「修正」の語0件）。
    // ⚠ **当初予算ページは毎年削除される**（R7 の kiji00362196 は現在 404）。過年度は**財政情報ページ**
    //    （/kiji0032422/）の「当初予算の状況」に H30〜R7 が残るが、**歳入と歳出が別 PDF** なので
    //    kofu-yosansho（1ファイル前提）に乗らない。収録するには revenueFile/expenditureFile が要る。
    // ⚠ **R5 は堺 §8m 型のアウトライン化**（TJ=0・ベジエ c=13,276）で回収不能。
    // ライセンスは**熊本市がそもそもサイト利用規約を持たない**（禁止表記も許諾も無い＝真の unverified）。
    // BODIK カタログの PDL1.0 は「本サイトのコンテンツ」限定で予算 PDF は無い（大阪・福岡と同じ罠）。
    id: "kumamoto-yosansho-r8",
    title: "令和8年度 熊本市当初予算（案）の概要（一般会計 目的別集計表・歳入集計表）",
    publisher: "熊本市",
    url: null,
    urls: ["https://www.city.kumamoto.jp/kiji00369192/3_69192_489156_up_mwyrop86.pdf"],
    landingPage: "https://www.city.kumamoto.jp/kiji00369192/index.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "熊本市（一般会計・団体コード431001）",
    // ⚠ **license 欄には「適用される条件」だけを書く**。適用**されない**規約の名前を説明として
    // 書き込むと、licenseClassOf が語で拾って**逆の区分に落ちる**（実際にここで踏んだ:
    // 「公共データ利用規約は適用範囲外」と書いたら open に分類された）。経緯はこのコメントに置く。
    // 事実関係: 熊本市はサイト利用規約を持たない。「著作権・リンク・免責事項」ページ
    // （https://www.city.kumamoto.jp/kiji0033645/index.html ・2026-07-16 確認）はリンクと免責の
    // 記述だけで、二次利用（複製・転載）の可否に関する条項が存在しない。資料 PDF 自身にも
    // 著作権・転載・複製・禁止・無断の制限表記は0件（神戸 §8h と同じ手法で grep 済み）。
    // オープンデータの「公共データ利用規約（第1.0版）」は BODIK カタログのコンテンツ限定で
    // 本 PDF は同カタログに無い（大阪・福岡と同じ罠）。**＝許諾も禁止も明示されていない**。
    license:
      "熊本市はサイト利用規約を持たず、著作権のページにはリンクと免責の記述しかなく、二次利用（複製・転載）の可否に関する条項が存在しない。資料 PDF 自身にも制限の表示は無い。＝発行元が利用条件を明示していないため、可否は未確認。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 4,
      revenueHeading: "歳入集計表",
      expenditureHeading: "目的別集計表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "歳出合計",
    },
  },

  // ───────────────────────────────────────────────────────────────────
  // 東京特別区（docs §10）。**23区に統一様式は無い** — 款体系が区ごとに全部違い、
  // 特別区長会・都が様式を配っている形跡も無いので、**他区の parserOptions を流用しない**。
  //
  // 制度由来で23区に共通するもの（全区の実資料で確認）:
  //   - 歳出に**消防費が無い**（消防は東京消防庁＝**都**の事務）
  //   - 歳入に**地方交付税の款が無い**（都が特別区分をまとめて受ける）
  //   - 歳入に**特別区交付金**（＝都区財政調整交付金）がある。**比率の幅が極端**で
  //     港 0.7%（特別区民税1,057億で実質不交付・区債ゼロ）〜 荒川 37.6%
  //   - **特別区税**（市町村民税・固定資産税は**都税**なので区に款が無い）・
  //     **特別区債**（≠地方債）・**都支出金**（≠都道府県支出金）
  //   - **職員費**の款を持つ区がある（千代田・世田谷・葛飾・杉並）＝名古屋・札幌型で
  //     全款から人件費を抜く。**他自治体と款別を直接比較すると民生費等が過小に見える**
  //     （偵察時は足立もこのリストにあったが**誤り** — R2〜R8 の実測で歳出は一貫して10款・
  //       職員費の款は存在しない。2026-07-16 の収録時に訂正）
  //   - **decision 階層（総務省＝目的別）と款が接続しない**。総務省側は区にも消防費を計上するが
  //     区の予算に消防費の款は無い。中央区は款名が1つも一致しない。**§8 の政令市と同じで仕様**
  // ───────────────────────────────────────────────────────────────────
  ...([
    // [年度, ドキュメントID/ファイル名, 歳入ページ, 歳出ページ, ランディングのページ名]
    ["R8", "34000/r8aramashi-gaikyo_1.pdf", 5, 7, "r8-yosan"],
    ["R7", "32625/r7aramashi01-gaikyo_2.pdf", 7, 9, "r7-yosan"],
    ["R6", "31124/r6aramashi-gaikyo_1.pdf", 7, 9, "r6-yosan"],
    ["R5", "28995/r5yosangaikyo_1.pdf", 7, 9, "r5-yosan"],
    ["R4", "27821/r4yosangaikyo_1.pdf", 7, 9, "r4-yosan"],
    // **R2 は現行サイトから消滅**（年度ページ・PDF とも live で 404）→ Wayback から回収。
    // Wayback 由来の URL は `pipeline:archive` の対象外（それ自体が恒久アーカイブ）。
    ["R2", "@wayback:20200829044936/19323/r2yosangaikyo_1.pdf", 5, 7, null],
  ] as const).map(([fy, path, rev, exp, page]) => ({
    // 千代田区（団体コード 131016・人口 68,835＝R6 決算状況調から実引き。特別区で最小だが
    // 1人あたり歳出は最大級）。「区の仕事のあらまし（予算編成の概況）」の款別一覧表。
    // **印字ページ＝物理ページ（ズレ0）**で政令市（+2〜+35）と違い素直。
    //
    // **kofu-yosansho にページと見出しの指定だけで乗る**（パーサ本体の改修は不要）。
    // 合計行 `歳    入    合    計` は空白除去で既定ラベル（歳入合計/歳出合計）に一致するので
    // totalLabel の指定は要らない。**見出しは指定が要る** — パーサは既定値
    // `歳入予算款別一覧` の存在を必須チェックしており、指定しないと「見出しがありません」で
    // throw する（千代田は `歳入予算一覧表`）。歳入の款1 配下に項の内訳4行
    // （特別区民税 等）があるが、**ページ内に款番号の単独行が1つも無い**ので orphan 分岐で
    // 破棄され Σ に混ざらない（実測確認済み）。→ **`kanNoless` を有効にしてはいけない**
    // （有効にするとこの4行が款として emit され Σ が二重計上になる）。
    //
    // 款体系（23区で唯一の**部ベース**。標準目的別に寄せてはならない）:
    //   歳出10款 = 議会費 / 子ども費 / 保健福祉費 / 地域振興費 / 環境まちづくり費 /
    //              総務費 / **職員費**（R8 159億＝歳出の17.4%） / 公債費 / 諸支出金 / 予備費
    //   → **民生費・衛生費・土木費・教育費・商工費・労働費・消防費・災害復旧費が存在しない**
    //      （教育は子ども費に内包）。**款体系は R2〜R8 で完全に安定**（歳入20款・歳出10款が
    //      7年間不変。名古屋 R3 の職員費新設・横浜 R5→R6 の局再編のような断層が無い）。
    //      唯一の揺れは款5 が R5 以前「株式譲渡所得割交付金」→ R6 以降「株**式等**譲渡所得割交付金」。
    //   歳入は**特別区交付金 = 5.5%**（R8 5,071,469千円）と23区で最低クラス。
    //   **特別区債・地方債の款が R2〜R8 の全年度で存在しない**（千代田区は起債ゼロ。裏付けとして
    //   歳出の公債費 = R8 **3,836千円**＝基金の繰替運用に係る利子のみ・総務省 R6 の実質公債費比率 −0.9%）。
    //
    // **廃止税目の「静かな欠落」（§9(a)）は起きない** — 廃止相当の科目は**款番号を持ったまま
    // 名目1千円**で残る（款7 自動車取得税交付金 = 1/1、款8 環境性能割交付金 = 1/85,000・△100.0%）。
    //
    // ⚠ **R3 は収録不可**（欠番の理由）。`pdftotext -layout` が款を**静かに落とす** —
    //    歳入18/20款（Σ −17,657,254千円）・歳出9/10款で「**保健福祉費が丸ごと消える**」。
    //    **原典は壊れておらず `-tsv` には座標付きで存在する**（pdftotext の重なり処理の問題）。
    //    合計行の本年度額も落ちるため合計行検出も外れる。Σ の差が巨大なので**必ず error で止まる**が、
    //    「R2・R4〜R8 と同型だから」と外挿して足すと落ちる。
    //
    //    **2026-07-17 に URL と原因を実測した（次に着手する人はここから始める）**:
    //    **資料**: `@wayback:20210620211256/27081/r3yosangaikyo_1.pdf`（485KB・10p・歳出 p.7 / 歳入 p.9）。
    //      **現行サイトから消滅**（年度ページ `r3-yosan.html`・PDF とも 404）。**Wayback にのみ現存**。
    //      ⚠ CDX のワイルドカード（`documents/27081*`）の一覧には**出てこない**ので、
    //        「捕捉なし」と誤判定しやすい。**URL を直接照会すれば出る**（実際それで見つけた）。
    //      ⚠ 同ディレクトリの `r3sankoshiryo_1.pdf`（参考資料）は**Wayback の捕捉が 1MB で切れている**
    //        ので代替経路にならない。
    //    **なぜ壊れるか**（-tsv の座標で実測）: 款3 保健福祉費の行は**3本のテキスト行で1行**を成す:
    //      ```
    //      y=218.2  9,036,263)  802,254)  9.7)        ← 当初＋同時補正
    //      y=224.1  3保健福祉費 14.1 8,234,009 12.7    ← 款名＋構成比＋前年
    //      y=229.1  (7,863,332) (△370,677) (△4.5)     ← 当初のみ
    //      ```
    //      他の款は 25pt 間隔なのに、この3本は 5〜6pt 間隔＝論理的に1行。`-layout` はこれを解けず
    //      款名を `3 保` と `健 福 祉 費` に割る。**`-raw` でも救えない**（値が1行ずつ縦に並ぶ）。
    //    **⚠ 数値の意味の問題でもある**（パースだけの話ではない）。原典の注記:
    //      **「※（ ）内は、同時補正予算を含まない、当初予算のみの数値です。」**
    //      → 保健福祉費 9,036,263（当初＋同時補正）/ (7,863,332)（当初のみ）、
    //        歳出合計 63,951,691 / (62,778,760)。差 1,172,931 は**保健福祉費だけ**が負う（R3＝コロナ対応）。
    //      **どちらを採るかは決着済み** — **収録済みの R4 の前年度列が 63,951,691（＝同時補正込み）**で、
    //      パーサが拾った資料注記も「令和3年度予算額は、同時補正予算を含む数値です」。
    //      **発行元自身が「令和3年度予算額」を同時補正込みと定義している**ので、R3 も**括弧なし**を採る。
    //    **実装は見送りで決着した（2026-07-17 のユーザー判断・#121 クローズ）** — 読むには
    //      「座標モード」「行の許容幅を広げる」「括弧系列を捨てる」の**3オプションが要り、
    //      1年度のために足すには割に合わない**（`textSource` を足したときの基準＝実測して
    //      明示的に・最小限に、から外れる）。
    //    ⚠ **「1年度のために3つ」だから割に合わないのであって、仕組み自体が筋悪なわけではない。**
    //      → **別の資料が同じ仕組みを要求したら計算が変わる**（＝再開の条件）。次のどれかが起きたら
    //        再検討する価値がある: ①他でも「論理的に1行が複数のテキスト行に分かれる」様式に当たった
    //        ②他でも「括弧付きの第2系列」を持つ表に当たった ③`textSource` に3例目・4例目が出て
    //        抽出モードの整理をまとめてやる機会が来た。
    //      やるなら `textSource: "words"` 系として設計し、括弧トークンを捨ててから x 順に組む
    //      （実測では、許容幅を 12pt にして括弧を落とすと列の x 順で正しい行に復元できる）。
    // ⚠ **千代田区には H29 に一般会計当初予算案を減額修正可決した前例がある**。年度を足すときは
    //    毎回「予算案（2月発行）と あらまし（議決後）の款別が一致するか」を突合すること
    //    （R8 は原案どおり可決＝916億1,057万で款別も完全一致することを確認済み）。
    id: `chiyoda-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 千代田区の仕事のあらまし（予算編成の概況）`,
    publisher: "千代田区",
    url: null,
    urls: [
      path.startsWith("@wayback:")
        ? `https://web.archive.org/web/${path.slice(9).split("/")[0]}if_/https://www.city.chiyoda.lg.jp/documents/${path.slice(9).split("/").slice(1).join("/")}`
        : `https://www.city.chiyoda.lg.jp/documents/${path}`,
    ],
    landingPage: page
      ? `https://www.city.chiyoda.lg.jp/koho/kuse/zaise/yosan/${page}.html`
      : "https://www.city.chiyoda.lg.jp/koho/kuse/zaise/yosan/index.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "千代田区（一般会計・団体コード131016）",
    // **registry 初の真正 `open`**（2026-07-16）。政令市20市の「オープンデータポータルの CC BY は
    // ポータル掲載データにのみ適用され、予算書はポータルに無いので及ばない」（§8）とは**構造が違う**。
    // 千代田は3つのページが連鎖して**サイト全体**を CC-BY にしており、各リンクを実際に確認した:
    //   1. サイトポリシー（/koho/kuse/homepage/sitepolicy.html）が
    //      「コンテンツ（テキスト、画像、**PDF**、そのほかのデータ）の著作権は千代田区に帰属します。
    //        **ただし**本サイト上のコンテンツは、千代田区ホームページ利用規約に基づき利用することが
    //        できます」＝**PDF を明示的にコンテンツに含めた上で**利用規約へ委ねる
    //   2. 利用規約（/koho/kuse/homepage/riyokiyaku/index.html・平成26年制定/平成27年一部改正）が
    //      「…を除き、どなたでも…自由に利用できます。商用利用も可能です」。除外は**写真等の静止画・
    //      動画・イラスト**（第三者の肖像権等のため）と「政策経営部広報広聴課長が指定するコンテンツ」
    //   3. データの二次利用（/koho/kuse/homepage/open-data.html）が
    //      「ホームページで公開し**自由な利用が可能なデータ**は…**CC-BY** で提供しています」
    // → 予算 PDF は①でコンテンツ、②で自由利用可（写真・動画・イラストのいずれでもない）、
    //   ゆえに③の「自由な利用が可能なデータ」＝CC-BY。**確認日 2026-07-16**。
    // 残る不確実性は②の「広報広聴課長が指定するコンテンツ」という**外部から検証不能な除外条項**だが、
    // 予算ページに指定を示す表示は無い（＝指定の形跡なしを確認）。
    // なお同サイトのリンクポリシーは「各ページ内の文書や画像などの各ファイルへのリンク設定は
    // 避けてください」＝**直リンクを主リンクにしない**という既存方針（③自サーバー配信をドロワーで
    // 開く）とちょうど整合する。
    license:
      "千代田区ホームページで公開している情報（以下「コンテンツ」といいます。）の利用については、千代田区が指定するコンテンツ及び別の利用ルールが適用されるコンテンツを除き、どなたでも以下の各項目に従い、複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます。商用利用も可能です。コンテンツ利用に当たっては、この利用規約に同意したものとみなします。／コンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は千代田区に帰属します。ただし本サイト上のコンテンツは、「千代田区ホームページ利用規約」に基づき利用することができます。二次利用をする際には、この利用規約に従ってください。／ホームページ利用規約に基づき、ホームページで公開し自由な利用が可能なデータは、「クリエイティブ・コモンズ表示2.1日本ライセンス」に基づき、「CC-BY」で提供しています。／コンテンツを利用する際は出典を記載してください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "歳入予算一覧表",
      expenditureHeading: "歳出予算一覧表（目的別）",
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), 年度ページ名, PDFパス]
    ["R8", 10, 11, "r08yosan/r08-yosan", "r08yosan/r08-yosan.files/02r8_kihontekikangae"],
    ["R7", 19, 20, "r07yosan/r07-yosan", "r07yosan/r07-yosan.files/02r7_kihontekikangae"],
    ["R6", 12, 13, "r06yosan/r06-yosan", "r06yosan/r06-yosan.files/02r6_kihontekikangae"],
    ["R5", 11, 12, "r05yosan/r05-yosan", "r05yosan/r05-yosan.files/02r5_kihontekikangae"],
    // ⚠ R4 以前は URL の綴りが年度ごとに破れる（連番で外挿すると 404 になる）:
    //    年度ページ R8〜R5 `-yosan` / R4・R3 `-yosann`（n 二重）/ R2 `-yosanann`（an 二重）
    //    PDF        R8〜R5 `02rN_kihontekikangae` / R4 `02kihontekikanngae`（**kanngae**）/
    //               R3 `03` / R2 `3`（連番のみで名前を持たない）
    ["R4", 11, 12, "r04yosan/r04-yosann", "r04yosan/r04-yosann.files/02kihontekikanngae"],
    ["R3", 15, 16, "r03yosan/r03-yosann", "r03yosan/r03-yosann.files/03"],
    ["R2", 13, 14, "r02yosan/r02-yosanann", "r02yosan/r02-yosanann.files/3"],
    // H31〜H28（2026-07-16 追加）。**parserOptions は R2〜R8 と完全同一で通る**（Σ 4年度×2側×2列の
    // 16系統すべて差0・款名は収録時に全件目視）。⚠ **綴りの破れは H 年度でも続く**（外挿禁止）:
    //    年度ページ H31 `31yosanann`（**ann**）/ H30 `30_yosan`（**アンダースコア**）/ H29 `29yosan` /
    //               H28 `28yosangaiyo`（**gaiyo**）
    //    PDF        H31 `3`（連番のみ・R2 と同型）/ H30 `3_yosangaiyo` / H29・H28 `gaiyo`
    // ⚠ **H30 と H29 でファイル名の意味が入れ替わる** — H29 の `yosangaiyo.pdf` は**款別表を持たない
    //    別資料**で、款別は `gaiyo.pdf` の側にある。**名前で選ぶと静かに別資料を掴む**。
    // ⚠ **H30 以前は歳入20款**（環境性能割交付金が H31 で新設＝2019年10月の税制改正・前年度 0 の皆増）。
    //    これで **H30 以前は款8=地方特例交付金・款9=特別区交付金**、H31 以降は1つずつ繰り下がる
    //    ＝**款番号で年度をまたいで結合すると壊れる**（款名で結合すること）。
    ["H31", 13, 14, "31yosan/31yosanann", "31yosan/31yosanann.files/3"],
    ["H30", 14, 15, "30yosan/30_yosan", "30yosan/30_yosan.files/3_yosangaiyo"],
    ["H29", 14, 15, "29yosan/29yosan", "29yosan/29yosan.files/gaiyo"],
    ["H28", 13, 14, "28yosan/28yosangaiyo", "28yosan/28yosangaiyo.files/gaiyo"],
  ] as const).map(([fy, rev, exp, page, path]) => ({
    // 大田区（団体コード 131113・人口 740,519＝R6 決算状況調から実引き。23区で世田谷・練馬に次ぐ3位）。
    // 「予算（案）概要」の巻頭にある款別集計表。**特別区で最も素直な部類** — R8〜R2 の7年度が
    // 現行サイトに揃い（さらに H20 まで19年度分が現存）、7年度すべてが**ページ差し替えだけの
    // 同一 parserOptions で通る**。Σ款=合計が 7年度×2側×2年度の**28系統すべて差0**、
    // 年度間クロスチェックも**6リンク×2側で款単位に全件一致**。
    //
    // 款体系（**R2〜R8 の7年間で款名まで完全に不変**。千代田の「株式譲渡所得割→株**式等**…」のような
    // 揺れすら無い。名古屋 R3 の職員費新設・横浜 R5→R6 の局再編のような断層も無い）:
    //   歳出12款 = 議会費 / 総務費 / **福祉費**（R8 1,813億＝歳出の49.2%）/ 衛生費 / 産業経済費 /
    //              **土木費** / **都市整備費** / 環境清掃費 / 教育費 / 公債費 / 諸支出金 / 予備費
    //   → **民生費ではなく「福祉費」**。**土木費と都市整備費が別款**。消防費が無いのは §10 の制度由来。
    //      商工費・労働費・農林水産業費・災害復旧費も無い。
    //   → **職員費の款を持たない**（千代田・世田谷・葛飾・足立・杉並型ではない）＝人件費が各款に
    //      配賦されているので、**他自治体との款別比較が素直に効く数少ない区**。
    //   歳入21款: 特別区交付金 896.9億（24.3%）と特別区税 916.1億（24.9%）がほぼ拮抗（§10 の
    //     「港 0.7%〜荒川 37.6%」の中庸）。特別区債の款は全年度に存在（R8 130億）。
    //
    // **廃止税目の「静かな欠落」（§9c）は起きない** — 廃止相当の科目は款番号を持ったまま名目 1千円で
    //   残る（款7 自動車取得税交付金 = R2〜R8 の全年度で `1`／款8 環境性能割交付金は R8 で `1`・
    //   前年度 341,000・△100.0%）。**R2 の前年度列（H31当初）だけは自動車取得税交付金が実額 198,651**。
    //
    // 版面のクセ:
    //   - **款名も合計ラベルも分散書き**（`1    議       会   費`・`合       計`）。パーサは空白を
    //     畳んで照合するので復元される（7年度×33款＝231件を目視でクリーン確認）。
    //   - **合計ラベルの字間が側ごとに違う**（歳入 `合       計` / 歳出 `合 計`）が、`合計` 指定で
    //     両側とも当たる。**既定の「歳入合計/歳出合計」では落ちる**ので指定必須。
    //   - **歳入だけ款1 の直下に `うち特別区民税` `うち特別区たばこ税` の内訳2行がある**（款番号なし）。
    //     款番号の単独行が続かないので孤児として破棄され Σ に混ざらない（21款で Σ差0＝実測）。
    //     → **`kanNoless` を有効にしてはいけない**（千代田と同じ理由。有効にすると二重計上になる）。
    //   - 見出し `（1） 歳入` の字間は年度で揺れる（R5 は `（2）   歳出`）が、照合は空白を畳むので通る。
    // ⚠ **印字ページと物理ページのズレが年度ごとに違う**（R8・R7 は0／R6 +5／R5 +3／R4・R3・R2 +6）。
    //    registry の値は**物理ページ**。目次から外挿しない。
    // **予算（案）と議決額の一致は発行元が明記**（千代田 H29 型の減額修正の懸念は無い）— 7年度すべての
    //    年度ページに「予算（案）のとおり、第一回区議会定例会で議決されました」と記載。
    // ライセンス経緯（§9g に従い license 欄には書かない）: 大田区の規約は「オープンデータとして公開して
    //   いるものを除き」と自ら範囲を限るが、**除外は本 PDF に及ばない** — 東京都オープンデータ
    //   カタログの大田区（t131113）に予算データセットは**実在する**（政令市20市で成り立った
    //   「ポータルに予算は無い」が大田では成り立たない）ものの、それは別ファイルの XLSX であって
    //   本 PDF は登載されていない。しかもその XLSX は**前年度列が無く**（科目・予算額・構成比の3列）
    //   budget 階層の要件を満たさない＝代替経路にならない。§10 の「CC BY だが別ファイル経路のみ」
    //   （港・台東型）。→ **CC BY を license 欄に書かない**（書くと open へ誤判定される）。
    id: `ota-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 大田区予算（案）概要（予算編成の基本的な考え方・款別集計表）`,
    publisher: "大田区",
    url: null,
    urls: [`https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/${path}.pdf`],
    landingPage: `https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "大田区（一般会計・団体コード131113）",
    license:
      "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "（1） 歳入",
      expenditureHeading: "（2） 歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // 台東区の歳入歳出**別ファイル**の3年度（2026-07-23 追加・#125）。#134 で「revenueFile/
    // expenditureFile 未実装のため後回し」としていたぶん。両側とも1ページの款別専用 PDF で、
    // 表の様式は単一ファイルの9年度と同一（弱い見出し 歳入/歳出・合計 `合計`）。
    // [年度, 年度ページ, 歳入PDF, 歳出PDF]
    ["R2", "2yosanannopointo", "2gaisansho_sainyuu.pdf", "2gaisansho_saishutu.pdf"],
    ["H31", "31yosanannopointo", "31gaisannshosainyuu.pdf", "31gaisannshosaishutu.pdf"],
    ["H27", "27yosananpoint", "sainyuu.pdf", "saishutu.pdf"],
  ] as const).map(([fy, page, revPdf, expPdf]) => ({
    // 台東区（131067）。単一ファイル年度と同じ「予算案のポイント」の概算書（款別）。
    // ⚠ PDF に「台東」の字が無い（単一ファイル年度と同じ）— 取り違え検出は URL とメタ。
    id: `taito-kanbetsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 台東区予算案のポイント 一般会計予算款別予算額（歳入・歳出）`,
    publisher: "台東区",
    url: null,
    urls: [
      `https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/${page}.files/${revPdf}`,
      `https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/${page}.files/${expPdf}`,
    ],
    landingPage: `https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "台東区（一般会計・団体コード131067）",
    // ライセンスは単一ファイル年度と同一（/aboutweb/policy.html の原文。2026-07-25 に取り違えを訂正 — 下の
    // `taito-kanbetsu-${fy}` ブロックのコメント参照）。
    license:
      "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenueFile: revPdf,
      expenditureFile: expPdf,
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), 年度ページ, PDF パス, 側の順序, 抽出モード]
    //
    // 大田区 H26〜H20（2026-07-17 追加）。**上の H28〜R8 とは資料の単位が違う** — こちらは
    // 「予算（案）概要」の**冊子まるごと**（84〜87p）で、款別集計表はその中の1見開き。
    // 既存パーサに乗ることは §10f の時点で try-parse 実測済み（Σ 各年度4系統すべて差0・款名クリーン）。
    //
    // ⚠ **H22・H21・H20 は款別表の側の順序が逆**（**歳出が（1）・歳入が（2）**）。
    //    **この誤りは Σ では絶対に捕まらない** — 歳入合計 = 歳出合計 は予算では定義上いつも成立し、
    //    左右を取り違えても両側とも差0 で通る。**款名の目視だけが唯一の網**（§10f）。
    //    → 側は `revenueHeading`/`expenditureHeading` の (1)/(2) で決まるので鏡像にする。
    // ⚠ **H20 だけ合計ラベルが既定**（`歳入合計`/`歳出合計`）。H28〜H21 の `合計` を渡すと落ちる。
    // ⚠ **H20 の歳出款8 は `清掃費`**（H21 以降の `環境清掃費` への改称前。金額一致で確認済み）。
    //    款名で年度をまたいで結合するときに効くので、改称であって別款ではないことを明記しておく。
    // ⚠ **H20 の歳入ページには性質別歳出の表が同居する**ため **`kanNoless` を有効にしてはいけない**
    //    （有効にすると款番号を持たない性質別の行を拾って二重計上になる）。上のブロックと同じ理由。
    // ⚠ **H22 は拡張子が二重**（`22yosan-gaiyou.pdf.pdf`）。url テンプレートが `.pdf` を足すので
    //    path 側に `.pdf` まで書く。**綴りの破れは H 年度でも続く**（§10f・外挿禁止）:
    //    年度ページ H20 だけ `20yosan_gaiyou`／PDF 名 `24yosan_gaiyou`（_）・`22yosan-gaiyou`（-）・`20gaiyou`
    //
    // ⚠ **H26・H25 だけ `textSource: "raw"`**（2026-07-17）。この2年度は**款9 特別区交付金の行が
    //    PDF 上で二重に描かれて**おり、`-layout` が重なりを解こうとして**3行に割り、カンマを別行へ
    //    剥離する**（`9 特 区  64,100,000` ／ 次行に `,  26.5  59,606,000`）。Σ が巨大にずれるので
    //    **error で必ず止まる**＝静かには壊れない。`-raw` は同じ行を正しく1行で返す（パーサの
    //    `textSource` のコメントに実測を残した）。**座標ベース（-tsv）では救えない**（残骸も拾う）。
    //    → **モードは「Σ が合うまで試す」のではなく、原典と突き合わせて人が決める**。
    //    裏付け: **H26 の前年度列 = H25 の当年度列**・**H25 の前年度列 = H24 の当年度列**が
    //    款9 を含めて全款一致する（独立した3資料が噛み合う）。
    // ~~H27 だけは救えない~~ → **#159 の decodeGarble で復号収録**（下の H27 行コメント参照）。大田は全year。
    // ⚠ H27 は ToUnicode 全面欠落 → decodeGarble で復号（#159・従来「大田で唯一の穴」判定を覆した）。
    //    款別表は「予算編成の概要」（yosanhenseinogaiyou.pdf・12p）の p.11/p.12。数字は素の ASCII で
    //    化けておらず、款名・記号だけが化ける（ᇞ=△ 等）。見出しは（1）が第2ガーブル族（䠄㻝䠅型・
    //    CJK拡張A域=マップ外でも throw しない）のため弱い語（歳入/歳出）で引く
    ["H27", 11, 12, "27yosan/27yosangaiyo", "27yosan/27yosangaiyo.files/yosanhenseinogaiyou", "h27", "layout"],
    ["H26", 19, 20, "26yosan", "26yosan.files/26yosan_gaiyou", "normal", "raw"],
    ["H25", 19, 20, "25yosan", "25yosan.files/25yosan_gaiyou", "normal", "raw"],
    ["H24", 19, 20, "24yosan", "24yosan.files/24yosan_gaiyou", "normal", "layout"],
    ["H23", 19, 20, "23yosan", "23yosan.files/23yosan_gaiyou", "normal", "layout"],
    ["H22", 20, 19, "22yosan", "22yosan.files/22yosan-gaiyou.pdf", "swapped", "layout"],
    ["H21", 18, 17, "21yosan", "21yosan.files/21yosan-gaiyou", "swapped", "layout"],
    ["H20", 29, 28, "20yosan_gaiyou", "20yosan_gaiyou.files/20gaiyou", "swapped", "layout"],
  ] as const).map(([fy, rev, exp, page, path, side, src]) => ({
    id: `ota-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 大田区予算（案）概要（款別集計表）`,
    publisher: "大田区",
    url: null,
    urls: [`https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/${path}.pdf`],
    landingPage: `https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "大田区（一般会計・団体コード131113）",
    // ライセンスの経緯は上のブロックのコメント参照（CC BY は本 PDF に及ばない＝§9g）。
    license:
      "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      // 側の順序（上記）。H22 以前は歳出が（1）。H27 は（1）が化けるので弱い語（上記）
      revenueHeading: side === "h27" ? "歳入" : side === "swapped" ? "（2） 歳入" : "（1） 歳入",
      expenditureHeading: side === "h27" ? "歳出" : side === "swapped" ? "（1） 歳出" : "（2） 歳出",
      // H20 だけ既定ラベル（上記）
      ...(fy === "H20" ? {} : { revenueTotalLabel: "合計", expenditureTotalLabel: "合計" }),
      // H26・H25 だけ -raw（上記）。他年度は既定の -layout で読む
      ...(src === "raw" ? { textSource: "raw" as const } : {}),
      // H27 は ToUnicode 欠落 → 復号（#159）。⚠ **帯が2つある**（2026-07-26・§11h）— 数字は素の
      //    ASCII だが、見出しの `（1）`（䠄㻝䠅）とページ番号は **ASCII+0x3EAC** の第2族で化ける。
      //    以前は拡張A を疑っていなかったので**復号されないまま素通り**していた（款名には乗らないので
      //    Σ も款名ゲートも無反応＝三重 R8 と同じ穴）。帯を明示して両側とも復号する。
      //    ⚠ **見出しは弱い語（歳入/歳出）のまま**にしてある — 帯を足せば `（1） 歳入` でも引けるが、
      //    他年度と同じ強い語に戻すのは別の変更なので混ぜない。
      ...(fy === "H27" ? { decodeGarble: true, decodeGarbleBand: { revenue: 0x3eac, expenditure: 0x3eac } } : {}),
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), PDF ファイル名]
    //
    // 北区（団体コード 131172・人口 362,089＝R6 決算状況調から実引き）。「予算の概要」（毎年2月発行・
    // 79〜118p）巻頭の「一般会計歳入歳出予算」。**H24〜R8 の15年度が現存し 14年度を収録**
    // （**H25 のみ収録不可**＝下記）。**印字＝物理−4 が15年度すべてで不変**。registry は物理ページ。
    //
    // ⚠ **偵察の申し送りは3点とも実測で覆った**（文京 §10j と同じ結果。§10 の「鵜呑みにしない」）:
    //    「R8〜R2 の7年度」→ **H24〜R8 の15年度**（**H24〜H28 は現行サイトから消滅し Wayback のみ**）／
    //    「縦書き章タブが款行に混ざる」→ **CropX が要るのは R6・R7・R8 の3年度だけ**（R5 以前は側注が無く、
    //      **付けると表の左端を切り落として壊す**）／「R5〜R2 が `特別区債(ｱ)`」→ **H24・H26〜R5 の12年度**で
    //      **R6〜R8 はクリーン**＝**「新しい年度ほど汚れる」ではなく逆**。
    //
    // 款体系: 歳入21款（H31 のみ22款）/ **歳出11款は H24〜R8 で完全不変**
    //   議会 / 総務 / **福祉**（R8 1,073億＝歳出の50.6%）/ 衛生 / **環境** / 産業経済 / 土木 / 教育 /
    //   公債 / 諸支出金 / 予備 → **民生費ではなく福祉費**。**職員費の款は無い**（大田・文京と同じ
    //   少数派＝人件費が各款に配賦済みで他自治体と款別を直接比較できる）。消防費・地方交付税が
    //   無いのは制度由来（§10）。
    //
    // ⚠ **ページ冒頭のタイトル行 `４ 一般会計歳入歳出予算` が款1 に連結する**
    //    （`一般会計歳入歳出予算特別区税`・**Σ は差0 のまま＝目視でしか気づけない**＝中野 §10e と同型）。
    //    → `revenueHeaderExtra` で落とす。歳出側にタイトル行は無い。
    // ⚠ **H24 だけ見出しの括弧が半角**（`(１) 歳 入`）。H26 以降は全角。
    // ⚠ **H24 は `kanIndentMax: 3` が必須** — 款8 地方特例交付金の**内訳**行（児童手当及び子ども手当
    //    特例交付金）が款名の折返しで**金額だけの行**になり、廃止款として拾われて前年度 Σ が
    //    +223,293 過大になる（**Σ ゲートが止めるので静かには壊れない**）。
    //    ⚠ **R2 に kanIndentMax を付けてはいけない** — R2 の `(自動車取得税交付金)` は字下げ4 の
    //      **正真正銘の廃止款**（H31 款7 と突合済み）なので、付けると本物が消える。
    // ⚠ **`kanNoless` は使ってはいけない**（歳入は款1 直下に特別区民税・軽自動車税・特別区たばこ税の
    //    内訳行が款番号なしで並ぶ＝大田・千代田と同じ理由で**二重計上**になる）。
    //
    // ⚠ **H25 は収録不可**（欠番）。`-layout` は款15 都支出金の行を2行に割り（Σ −7,249,317）、
    //    `-raw` は合計行の金額がラベルより前に出て「歳入合計 行が見つかりません」で **throw する**。
    //    **どちらのモードでも大声で落ちる**＝`textSource` では救えない（大田 H26 §10f とは別の型）。
    //    前後の H24・H26 は収録済みなので単年の欠番。
    //
    // **誤ページは throw する（安全側）**: 同一 PDF に特会の同型表・当初予算款別推移・決算款別推移が
    //   並ぶが、**強い見出し `（１） 歳 入` が守る**（中央・江東 §10b-2 の「静かに特会を読む」は起きない）。
    //   総額の独立突合先は「１ 予算の規模」（R8 物理 p.5 の「2,120億1,800万円」）。
    //
    // ライセンス経緯（§9g に従い license 欄には書かない）: **東京都カタログの北区（t131172）は
    //   全7データセットで予算・決算・財政は0件**（実検索。避難所・小中学校・AED 等）＝
    //   **§9g の「ポータルに予算は無い」が成り立つ側**（文京 §10j・大田 §10a とは逆）。
    //   リンクは「トップページ推奨」だが**直リンク禁止ではない**（新宿 §10k とは違う）。
    ["R8", 18, 20, "r8gaiyou"],
    ["R7", 16, 18, "r7gaiyou"],
    ["R6", 12, 14, "r6gaiyou"],
    ["R5", 12, 14, "r5gaiyou"],
    ["R4", 10, 12, "r4gaiyou"],
    ["R3", 6, 8, "r3gaiyou"],
    ["R2", 6, 7, "02gaiyou"],
    ["H31", 6, 7, "31gaiyou"],
    ["H30", 6, 7, "30gaiyo"],
    ["H29", 6, 7, "29gaiyo"],
    // **H28〜H24 は現行サイトから消滅**（新 CMS の同名パスも 404 を実測）→ Wayback から回収。
    // ⚠ 旧ドメイン `city.kita.tokyo.jp`（現行は `city.kita.lg.jp`）。Wayback 由来の URL は
    //   `pipeline:archive` の対象外（それ自体が恒久アーカイブ）。**H24 が現存最古**（それ以前は
    //   Wayback にも無い＝CDX 実測。WARP は未探索）。**H25 は収録不可なので飛ばす**。
    ["H28", 6, 7, "@wayback:20211130075731/28gaiyo"],
    ["H27", 6, 7, "@wayback:20211130100057/27gaiyo"],
    ["H26", 6, 7, "@wayback:20211130065453/26gaiyo"],
    ["H24", 5, 6, "@wayback:20211130091510/24gaiyo"],
  ] as const).map(([fy, rev, exp, path]) => ({
    id: `kita-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 北区予算の概要（一般会計歳入歳出予算）`,
    publisher: "北区",
    url: null,
    urls: [
      path.startsWith("@wayback:")
        ? `https://web.archive.org/web/${path.slice(9).split("/")[0]}id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/${path.slice(9).split("/")[1]}.pdf`
        : `https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/${path}.pdf`,
    ],
    landingPage: "https://www.city.kita.lg.jp/city-information/finance/1014484/1014485.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "北区（一般会計・団体コード131172）",
    // 「著作権・免責」（/about/1016811.html・確認日 2026-07-17）。**除外条項を1つも持たない**
    // （大田の「オープンデータとして公開しているものを除き」のような限定が無い）ので本 PDF に直接適用。
    license:
      "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      // H24 のみ半角括弧（上記）
      revenueHeading: fy === "H24" ? "(１) 歳 入" : "（１） 歳 入",
      expenditureHeading: fy === "H24" ? "(２) 歳 出" : "（２） 歳 出",
      // ページ冒頭のタイトル行を落とす（上記・歳入側だけに出る）
      revenueHeaderExtra: "一般会計歳入歳出予算",
      // 縦書き章タブの除去は R6〜R8 のみ（R5 以前に付けると壊す・上記）。
      // 閾値は3年度とも同一（-tsv 実測: ページ幅595・タブ x≤20・表 x≥49）＝文京 §10j のような
      // 座標空間の分裂は起きない。
      ...(["R6", "R7", "R8"].includes(fy)
        ? { revenueCropX: { from: 40, to: 1000 }, expenditureCropX: { from: 40, to: 1000 } }
        : {}),
      ...(fy === "H24" ? { kanIndentMax: 3 } : {}),
      // 主要事業（同じ PDF の `７ 主要事業`・2026-07-30・#162）。**R8 のみ**。
      // ⚠ **他年度へ外挿しない** — 章のページ位置は年度で動く（R8 は物理 p.31–70）。
      //   足すときは年度ごとに範囲を実測すること。
      //
      // **範囲を p.67 で切っているのは意図的**（p.31–70 のうち p.68–70 は**特別会計**＝
      // 国民健康保険事業会計・介護保険会計・後期高齢者医療会計で、**款が無い**。
      // 本ソースの scope は一般会計なので対象外＝取りこぼしではない）。
      //
      // 3階層（款見出し → 項見出し → 項ごとに 1..M の番号つき事業）で**款が直接付く**。
      // 原典が款ごとに件数を宣言する（`総務費 67事業`）ので **8款282件＝抽出282件**の等式が張れ、
      // さらに **Σ項合計 = 款額**（11款すべて・総額 212,018,000 まで差0）で歳出を完全分解する。
      // 公債費の1件（款見出しに件数の宣言が無い款）を足して**計283件**。
      ...(fy === "R8"
        ? { projectPages: { from: 31, to: 67 }, projectFormat: "kan-ko-numbered" as const }
        : {}),
    },
  })),

  ...([
    // [年度, ランディングページ ID, 資料3 のファイル名]
    //
    // 台東区（団体コード 131067・人口 216,084＝R6 決算状況調から実引き）。「予算案のポイント」の
    // 【資料3】一般会計予算款別予算額（2ページの款別専用 PDF・歳入 p.1 / 歳出 p.2）。
    // **H27〜R8 の12年度が現行サイトに現存**するが、**歳入歳出が別ファイルの R2・H31・H27 は
    // revenueFile/expenditureFile が未実装なので後回し**（このブロックは9年度）。
    //
    // ⚠ **PDF 本体に「台東」の文字が1つも無い**（プレス配布資料の抜き刷り・全12年度0件を実測）。
    //   取り違え検出は URL とメタに頼る。総額の独立突合先は都カタログの CC BY CSV（下記）の R7 総額
    //   130,600,000 が本 PDF の R7 当初総額と一致することで取れる。
    // ⚠ **URL 規則が年度ごとにバラバラ**（`R8yosan3` / `5gaisansho` / `s3-kanbetuyosangaku` / `29-4` …）
    //   ＝**連番で外挿できない**。年度一覧から実引きすること。⚠ 年度一覧に重複ページがあり、
    //   資料3 が付くのは前者だけ（H27 `27yosananpoint`・H28 `28point`）。
    //
    // 款体系: 歳入20款 / **歳出10款は H27〜R8 で款名まで不変**（議会 / 総務 / 民生 / 衛生 /
    //   **文化観光** / 産業経済 / 土木 / 教育 / 諸支出金 / 予備）。**職員費・公債費の款が無い**
    //   （公債費は諸支出金に内包）＝人件費配賦型。消防費が無いのは制度由来（§10）。
    //   H30〜H28 は款7 が `自動車取得税交付金`（環境性能割の前）。
    //
    // ⚠ **弱い見出し（`歳入`/`歳出`）** — 強い見出し（`一般会計予算款別予算額`）はタイトル行を
    //   skip できず款1 を汚す（中央・江東 §10b-1 と同型）。代償でページ誤指定が throw しないが、
    //   **本 PDF は2ページで特会も補正後比較の表も無い**ので §10b-2 のリスクは構造的に無い。
    // ⚠ **合計ラベルは `合計`**（分散書き `合    計`）。既定の `歳入合計` では throw する。
    // ⚠ **このブロックの収録には 2026-07-17 の3つのパーサ改修が要る**（すべて Σ が捕まえる型＝
    //   静かには壊れない。既存264ソース再 parse で差分ゼロ）:
    //   ①**款番号と款名下段が同じ行の折返し**（`5 所得割交付金` の 5 を捨てて7款が落ちていた）
    //   ②**象徴計上の 1千円が款番号に誤読される**（款7 環境性能割の当年度 `1`。§10b-5 の
    //     「款番号に 0 は無い」ガードは 1 を弾けない）
    //   ③**`ほぼ皆増`**（繰越金の前年度が 0 でなく象徴計上の1千円。registry 初出）
    //
    // ライセンス経緯（§9g に従い license 欄には書かない）: 都カタログの台東区（t131067）は
    //   187件中、予算/決算で当たるのは `台東区行政資料集 5.財政`（CC BY）**1件だけ**。その CSV は
    //   款別・H13〜R7 の25年だが、備考が「いずれも、最終補正後予算額。ただし、最新年度は当初予算額。」
    //   ＝**最新年度以外は補正後**で budget 階層の要件を満たさない＝代替経路にならない。
    // リンクは「個別ページへのリンクは…認めます」＝**禁止ではない**（新宿と違う）＝`noDeepLink` 不要。
    ["R8", "R8yosanannopoint", "R8yosan3"],
    ["R7", "R7yosanannopoint", "R7yosan3"],
    ["R6", "R6yosanannopoint", "R6yosan3"],
    ["R5", "R5yosanannopoint", "5gaisansho"],
    ["R4", "R4yosanannopoint", "s3-kanbetuyosangaku"],
    ["R3", "3point", "3gaisannsho"],
    ["H30", "30yosanpoint", "sainyuusaishutu"],
    ["H29", "29point", "29-4"],
    ["H28", "28point", "30gaisansyo"], // ⚠ ファイル名は 30 だが H28（発行元の誤記）。年度一覧で確認済み
  ] as const).map(([fy, page, file]) => ({
    id: `taito-kanbetsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 台東区予算案のポイント【資料3】一般会計予算款別予算額`,
    publisher: "台東区",
    url: null,
    urls: [`https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/${page}.files/${file}.pdf`],
    landingPage: `https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "台東区（一般会計・団体コード131067）",
    // 「サイトポリシー」＞著作権について（/aboutweb/policy.html・更新日 2019年5月21日・確認日 2026-07-25）。
    // **コンテンツに「PDF」を明示列挙**しているので本資料に直接適用される。
    // ⚠ 2026-07-25 に**原文へ差し替えた**。それまでの文言（「台東区公式ホームページ内の文章・写真・
    //    イラストなどの著作権は、区または正当な権利を有している第三者にあります。…」）は
    //    **発行元のどの版にも存在しない**（現行・Wayback 20210121 の両方を実読して0件。他ページも grep 0件）
    //    ＝転記の取り違え。**区分は permission-required のまま変わらない**（新旧とも `無断` が当たる）ので
    //    画面のエビデンス振替（発行元ディープリンク）に影響は無く、直したのは「原文をそのまま残す」ため。
    license:
      "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 2,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // [年度, 物理ページ, contentId, 年度ページのパス, HeaderExtra の追加分]
    //
    // 新宿区（団体コード 131041・人口 352,717＝R6 決算状況調から実引き）。「予算の概要」巻末の
    // 款別総括表。**H13〜R8 の26年度＝収録中で最長**（文京の22年を抜いた）。
    // Σ款=合計は 26年度×2側×2年度の **104系統すべて差0**、全年度で歳入合計=歳出合計。
    // 年度間クロスチェックは **H13→R8 の25リンクすべて一致**。
    //
    // ⚠ **偵察の申し送りは2点が覆り1点だけ正しかった**（§10 の「鵜呑みにしない」・5巡連続）:
    //    「R5 を除く14年」→ **26年度が現存し R5 も収録可**（下記）／「皆減行に全角ダッシュが残る」→
    //    **2026-07-17 の文字クラス拡張（`[-−–—－―]`）で既に解決済み＝手当て不要**（実在するのは
    //    U+002D / U+2015 / U+FF0D の3種で全部入っている。26年度の款名を全件目視してダッシュ残り0）／
    //    「samePage が使えない」→ **正しい。ただし理由が違う**（下記）。
    //
    // **年度一覧は3枚に割れている**（年度を足すときは全部辿ること）:
    //    H13〜H24 → /kusei/gaiyou_kako.html ／ H25〜R7 → /kusei/zaisei01_001014.html
    //    R8 → /kusei/file06_02_0101.html ／ R5(案) → /kucho/message/20230213-01-1.html
    // ⚠ **物理＝印字ではなく、オフセットが4通りに割れる**（実測・外挿禁止）:
    //    H13 = +3 ／ H14・H15 = +1 ／ H16〜H19 = **+0** ／ H20 以降 = +2
    //
    // ⚠⚠ **最大の罠: 同一 PDF に「補正後予算比較」の同型表がある**（H21 以降の16年度）。
    //    表題が `【一般会計歳入予算款別総括表】 8年度1号（3月）・7年度1号（3月）補正後予算比較` で、
    //    **見出し語が当初版の完全な上位文字列**なので heading では区別できない。R8 p.167 を誤指定すると
    //    **21款/13款・4系統すべて Σ差0・歳入合計=歳出合計・款名も全件クリーン**、さらに
    //    `補正後予算額` の語が無いので**「前年度の基準: 当初」とまで誤判定される**（実測）。
    //    ＝ **validate も検証ゲートも1つも捕まえない**。**年度間クロスチェーン（§9l）だけが検出する**。
    //    → **ページを動かしたら必ず derive のクロスチェーンを見ること**。
    //    （特会の同型表 p.163〜 は見出しが `【国民健康保険特別会計…】` なので throw する＝安全。
    //      §10b-2 と逆で、ここでは強い見出しが効く）
    //
    // ⚠ **`samePage` は使えない**（実測。理由は「歳入歳出が別ページだから」ではなく**1ページに縦積み**）。
    //    samePage は totalLabel の出現位置2つで割る実装だが、新宿は合計ラベルが `歳入合計`/`歳出合計` と
    //    **側で違う**ので側ごとに1件しか出ず throw する。共通語 `合計` に寄せても、両表の直後の注記
    //    「項目単位で四捨五入しているため**合計**と合わないことがあります」が割り込んで歳出が0款になる。
    //    → **`expenditureHeaderExtra` で歳入の款行を落とす**のが唯一の経路。
    // **その安全性**（実測）: これは「歳入款名の denylist」なので、取りこぼし（歳入款が歳出へ漏れる）も
    //    過剰一致（歳出款が消える）も**必ず Σ が壊れて error になる**＝静かには壊れない。
    // ⚠ **R8 だけ `^（環境性能割交付金）` の追加が要る**（皆減行が丸括弧つきで款番号を持たない）。
    //    **これを全年度に `^（` として一般化してはならない** — **H28 は歳出側に丸括弧の皆減行
    //    `（地域文化費）`『（産業経済費）』が実在**し、消すと歳出 Σ が 9,771,138千円 不足する（実測）。
    //    歳入に丸括弧行があるのは R8 だけ・歳出にあるのは H28 だけで、**両者は年度が重ならない**。
    //
    // 款体系: **歳出は R1〜R8 で13款不変**（議会 / 総務 / 地域振興 / 文化観光産業 / 福祉 / 子ども家庭 /
    //   健康 / 環境清掃 / 土木 / 教育 / 公債 / 諸支出金 / 予備）。**職員費の款は無い**（人件費配賦型）。
    //   断層は H16（衛生→健康）・H17（区民→地域文化）・H20（子ども家庭費 新設）・
    //   **H28（地域文化＋産業経済 → 地域振興＋文化観光産業）**。歳入は 18→20→21款
    //   （H16 で配当割・株式等譲渡所得割が新設、R1 で環境性能割が新設、**R8 で環境性能割が皆減**）。
    // ⚠ **H20 の歳出款8 は `環境清掃費（⑲環境費）`** — **原典がそう印字している**（H19 の `環境費` からの
    //   改称を発行元が注記）。**款名の一部なので落とさない**（北区 §10l の脚注マーカーとは別物）。
    //   H16 歳出の `(衛生費)` も**原典が半角丸括弧**（H28・R8 は全角）＝原典どおり。
    ["R8", 160, "000451451", "kusei/file06_02_0101.html", "|^（環境性能割交付金）"],
    ["R7", 149, "000448143", "kusei/zaisei01_001014.html", ""],
    ["R6", 154, "000418377", "kusei/zaisei01_001014.html", ""],
    // ⚠ **R5 は年度一覧が載せているファイル（000389826）を使ってはいけない** — **スキャン＋OCR** で
    //   数字が複数行に砕ける（`5\n2,9\n71,\n915`）。**pdftotext は動くが値が壊れる**＝静かに壊れる型。
    //   代わりに**区長記者会見（令和5年度予算案プレス発表）の「予算（案）の概要」= 000359952** を使う。
    //   born-digital で完全にクリーン。**registry 初の「予算(案)版を採る」ケース**。
    //   **R5案 = R5 当初であることは年度間クロスチェックで確定済み**（推定ではない）:
    //     R4 当年度 166,426,174 = R5案 前年度 ✓ ／ **R5案 当年度 169,460,569 = R6 前年度 169,460,569 ✓**
    //     ＝ 議会修正が無かったことの証明。
    ["R5", 171, "000359952", "kucho/message/20230213-01-1.html", ""],
    ["R4", 165, "000359947", "kusei/zaisei01_001014.html", ""],
    ["R3", 171, "000331346", "kusei/zaisei01_001014.html", ""],
    ["R2", 173, "000304338", "kusei/zaisei01_001014.html", ""],
    ["R1", 182, "000283543", "kusei/zaisei01_001014.html", ""],
    ["H30", 182, "000254899", "kusei/zaisei01_001014.html", ""],
    ["H29", 170, "000233794", "kusei/zaisei01_001014.html", ""],
    ["H28", 195, "000192291", "kusei/zaisei01_001014.html", ""], // 歳出15款（丸括弧の皆減2行・上記）
    ["H27", 180, "000189437", "kusei/zaisei01_001014.html", ""],
    ["H26", 158, "000168755", "kusei/zaisei01_001014.html", ""],
    ["H25", 152, "000139123", "kusei/zaisei01_001014.html", ""],
    ["H24", 154, "000121180", "kusei/gaiyou_kako.html", ""],
    ["H23", 190, "000103085", "kusei/gaiyou_kako.html", ""],
    ["H22", 174, "000062569", "kusei/gaiyou_kako.html", ""],
    ["H21", 174, "000059941", "kusei/gaiyou_kako.html", ""],
    ["H20", 154, "000050579", "kusei/gaiyou_kako.html", ""], // 款8 が `環境清掃費（⑲環境費）`（原典・上記）
    ["H19", 125, "000050580", "kusei/gaiyou_kako.html", ""],
    ["H18", 109, "000050581", "kusei/gaiyou_kako.html", ""],
    ["H17", 101, "000050582", "kusei/gaiyou_kako.html", ""],
    ["H16", 107, "000050585", "kusei/gaiyou_kako.html", ""], // 歳出13款（`(衛生費)` の皆減・原典が半角括弧）
    ["H15", 93, "000050586", "kusei/gaiyou_kako.html", ""],
    ["H14", 82, "000050587", "kusei/gaiyou_kako.html", ""],
    ["H13", 73, "000050588", "kusei/gaiyou_kako.html", ""],
  ] as const).map(([fy, page, cid, landing, extra]) => ({
    id: `shinjuku-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 新宿区予算${fy === "R5" ? "（案）" : ""}の概要`,
    publisher: "新宿区",
    url: null,
    urls: [`https://www.city.shinjuku.lg.jp/content/${cid}.pdf`],
    landingPage: `https://www.city.shinjuku.lg.jp/${landing}`,
    // ⚠ **発行元がファイルへの直リンクを断っている**（SourceEntry.noDeepLink 参照）。
    //   原文（/kusei/about.html「新宿区公式ホームページへのリンク」・確認日 2026-07-17）:
    //     「また、一部のコンテンツ（画像やＰＤＦ等）にリンクを設定することはおやめください。」
    //   （原文の「ＰＤＦ」は全角。「禁止」ではなく「おやめください」という依頼形だが明示的）
    //   → 要許可の資料の振替先を**ランディングページ**にする。registry 初のケース。
    noDeepLink: true,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "新宿区（一般会計・団体コード131041）",
    // 「本ホームページについて」＞著作権（/kusei/about.html・最終更新 2025年4月1日・確認日 2026-07-17）。
    // **コンテンツに「PDF」を明示列挙**しているので本資料に直接適用される。**特別区で最も厳格**。
    // ⚠ **CC BY を license 欄に書かないこと**（§9g）。東京都カタログの新宿区（t131041）は137データセット
    //   あるが、予算/決算/財政/歳入/歳出/款を含むものは「新宿区の財政白書（基礎資料）」の**1件だけ**で、
    //   それも実体が 500 で死んでおり、内容も決算ベースで**当初予算の款別＋前年度列を持たない**
    //   ＝代替経路にも独立検証にもならない。**本 PDF はポータル非登載＝CC BY は及ばない**。
    license:
      "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: page,
      expenditurePage: page, // 1ページに縦積み。samePage は使えない（上記）
      revenueHeading: "【一般会計歳入予算款別総括表】",
      expenditureHeading: "【一般会計歳出予算款別総括表】",
      // 歳入の款行を歳出側から落とす denylist（上記。取りこぼしも過剰一致も Σ が捕まえる）
      expenditureHeaderExtra:
        "^[0-9]+[^0-9]*(?:税|交付金|分担金|負担金|使用料|手数料|庫支出金|都支出金|財産収入|寄附金|繰入金|繰越金|諸収入|区債)" +
        extra,
      // 主要施策事業（同じ PDF の「Ⅴ 主要施策事業」・2026-07-31・#162）。**R8 のみ**。
      // ⚠ **他年度へ外挿しない** — 章のページ位置も列の座標も年度で動く。足すときは年度ごとに実測する。
      //
      // **★ 検証は原典が用意している** — **物理 p.41**（範囲の直前）の「Ⅳ 基本政策事業予算額等」に
      // 「本表は次頁以降の『Ⅴ 主要施策事業』を集計したものです」と明記された集計表があり、
      // **合計 251事業 / 41,653,453千円**（基本政策別の内訳つき）。前年度列が無く年度間
      // クロスチェックが張れないので、**これが唯一の網**。パーサは `projectPages.from - 1` を読む。
      //
      // ⚠ **偵察の「約183事業」は誤り**（原典は251）。⚠ 収録は**抜粋**（歳出の完全分解ではない）。
      // ⚠ **予算額が `―` の事業が3件**ある（p.82・p.95・p.130。原典が別事業への計上を注記）。
      //    amount は 0 で入れ、注記を description に残している。
      // ⚠⚠ **特別会計の事業は kan を付けない**（介護保険特会にも `総務費` があり、そのまま
      //    載せると一般会計の総務費ドリルに他会計の事業が混ざる）。
      ...(fy === "R8"
        ? { projectPages: { from: 42, to: 143 }, projectFormat: "policy-blocks" as const }
        : {}),
    },
  })),

  {
    // 新宿区 款別予算決算対照表（2026-07-23 追加・#138）。決算書・実績報告ページの単独 PDF
    // （R6 は 2p・8KB・born-digital）。款別の予算現額・収入/支出済額・率＝**「執行」画面の2例目**
    // （甲府・山梨県に次ぎ、区で初）。当初予算26年（shinjuku-yosan-gaiyou-*）と組で
    // 予算→執行が繋がる。H23〜R6 の14年が現存するが、執行画面は最新年度のみ使う運用
    // （MUNI_EXEC_SOURCES）なので R6 だけ収録。過年度を足すなら年度ごとに実測してから。
    // パーサは専用（yamanashi-kessan は款番号列と整数率で静かに誤読する — parsers のコメント参照）。
    id: "shinjuku-kessan-taisho-r6",
    title: "令和6年度 新宿区一般会計款別予算決算対照表",
    publisher: "新宿区",
    url: null,
    urls: ["https://www.city.shinjuku.lg.jp/content/000434904.pdf"],
    landingPage: "https://www.city.shinjuku.lg.jp/kusei/kaikei01_001000_00006.html",
    // 予算側と同じ（/kusei/about.html・§10k）: 「一部のコンテンツ（画像やＰＤＦ等）にリンクを
    // 設定することはおやめください。」→ 振替先はランディングページ。
    noDeepLink: true,
    kind: "pdf" as const,
    fiscalYear: "R6",
    scope: "新宿区（一般会計・団体コード131041）",
    license:
      "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    parser: "shinjuku-kessan-taisho" as const,
    parserOptions: {},
  },

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), PDF ファイル名, 様式世代]
    //
    // 港区（団体コード 131032・人口 267,780＝R6 決算状況調から実引き）。「港区予算概要」の
    // 歳入予算内訳表・目的別歳出予算内訳表。**R8〜H19 の20年度が1つの年度ページに全部並ぶ**
    // （現行サイト・Wayback 不要）。**うち18年度を収録**（H29・H24 は下記＝収録不可）。
    // 印字＝物理−4。registry は物理ページ。
    //
    // 款体系: **歳入19款 / 歳出11款が H19〜R8 の20年間まったく不変**（議会 / 総務 / 環境清掃 /
    //   民生 / 衛生 / 産業経済 / 土木 / 教育 / 公債 / 諸支出金 / 予備）。**職員費の款は無い**（配賦型）。
    // ⚠ **概要 PDF の歳入に「特別区債」の款が無いのは、款が存在しないからではない** —
    //   区の CC BY CSV は特別区債=0 の行を持ち歳入20款。**起債ゼロで概要 PDF が行ごと落としている
    //   だけ**（港は §10 のとおり特別区交付金 0.7%・公債費 R8 で1千円の実質不交付区）。
    //
    // ⚠⚠ **R2・R4・H31 の款名が「部首の異体字」で壊れる**（2026-07-17・**このリポジトリ初の型**）。
    //   原典が Kangxi Radicals（U+2F00–U+2FDF）/ CJK部首補助（U+2E80–U+2EFF）を混ぜて組版する:
    //     R2 歳出 `⺠⽣費`（U+2EA0 + U+2F63）・`諸⽀出⾦` ／ R4 は歳出だけ ／ H31 は見出しまで Kangxi。
    //   **見た目は正字とほぼ同じ・金額も Σ も正しい・validate の語彙ゲートも素通り**（＝§2-4 の新型）。
    //   **同一 PDF で混在**（R2 は `土木費` はクリーン）・**年度の新旧と無関係**（R3 クリーン→R4 歳出のみ→R2 両側）。
    //   → パーサの `fixRadicals` が正規化する（NFKC＋`⺠→民`）。validate に部首レンジの error ゲートも追加。
    //   H31 は見出しも Kangxi なので `revenueHeading`/`expenditureHeading` を Kangxi 表記で与える（下記）。
    //
    // ⚠ **歳入の表に「主な内訳」の子行が埋まっている**（特別区民税・特別区たばこ税・一般財源分・
    //   社会保障財源分）。素で当てると款として拾われ Σ +130,116,498（R8）＝大声で落ちる。
    //   → `revenueHeaderExtra` の denylist で落とす。⚠ **denylist は正規化前の生テキストに当たる**ので
    //   `特別区民税` の `民` が `⺠`（U+2EA0）で来る年度に備え `特別区[民⺠]税` と書く。
    // ⚠ **H30 以前は表の直前に散文が入る**（中野 §10e と同型）。⚠ **H26 の散文は半角読点 `､`（U+FF64）**
    //   を使い `３億3,761万２千` が款に化ける（Σ +3,761 で止まる）→ `[、。､]|億` で落とす。
    //
    // ⚠ **H29 は収録不可**（震災復興基金380億を除いた括弧2段組で合計行が割れ `合計 行が見つかりません`
    //   で throw）。**H24 は歳出のみ不可**（同型で民生費・諸支出金が割れ Σ −44,831,527）＝どちらも
    //   大声で落ちる。→ **H29 を除外し、H24 も年度ごと外した**（歳入だけの収録はしない方針）。
    //
    // ライセンス経緯（§9g）: 都カタログの港区（t131032）は268件中 `q=予算` 1件＝【行政資料集】財務
    //   （CC BY・一般会計歳入/歳出の款別 CSV が H30〜R7 の8年度・**前年当初比較の要件を満たす**）。
    //   ただし港区オープンデータ規約は「本サイト（opendata.city.minato…）で公開しているコンテンツは」と
    //   自ら範囲を限るので**本 PDF には及ばない**。**CSV は有力な第2経路だが別パーサが要る**（未収録）。
    // リンクは「原則トップページ」だが直リンク禁止ではない（新宿と違う）＝`noDeepLink` 不要。
    ["R8", 3, 5, "20260202131316", "reiwa"],
    ["R7", 3, 5, "r7nishou", "reiwa"],
    ["R6", 3, 5, "nishou", "reiwa"],
    ["R5", 3, 5, "2sho", "reiwa"],
    ["R4", 3, 5, "02_section2", "reiwa"], // ⚠ 歳出款名が Kangxi（fixRadicals が直す）
    ["R3", 3, 5, "04sainyusaisyutu", "reiwa"],
    ["R2", 3, 5, "section2", "reiwa"], // ⚠ 両側 Kangxi。廃止款「（自動車取得税交付金）」あり
    ["H31", 3, 5, "15-24", "h31"], // ⚠ 両側 Kangxi・見出しも Kangxi
    ["H30", 3, 4, "05kibo_1", "h30"],
    ["H28", 2, 3, "03", "old"],
    ["H27", 2, 3, "h27yosangaiyou03", "old"],
    ["H26", 2, 3, "h26_yosangaiyo_03", "old"], // ⚠ 散文に半角読点 U+FF64
    ["H25", 2, 3, "h25_yosangaiyo_02pdf", "old"],
    ["H23", 3, 4, "h23_yosangaiyo_02", "old"],
    ["H22", 3, 4, "h22_yosangaiyo_03", "old"],
    ["H21", 3, 4, "h21_yosangaiyo_03", "old"],
    ["H20", 3, 4, "h20_yosangaiyo_03", "old"],
    ["H19", 3, 4, "h19_yosangaiyo_03", "old"],
  ] as const).map(([fy, rev, exp, path, gen]) => ({
    id: `minato-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 港区予算概要（歳入予算内訳表・目的別歳出予算内訳表${
      fy === "R8" ? "・所管部署別新規・臨時・レベルアップ事業一覧" : ""
    }）`,
    publisher: "港区",
    url: null,
    // R8 だけ**2ファイル**（Ⅱ章＝款別表 ＋ Ⅳ章＝主要事業）。⚠ 他年度へ外挿しない（下記）
    urls: [
      `https://www.city.minato.tokyo.jp/documents/4694/${path}.pdf`,
      ...(fy === "R8" ? ["https://www.city.minato.tokyo.jp/documents/4694/20260202131436.pdf"] : []),
    ],
    landingPage: "https://www.city.minato.tokyo.jp/kuse/zaise/yosan/",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "港区（一般会計・団体コード131032）",
    // 「港区ホームページのご利用にあたって」＞著作権について（/kouhou/portal/riyo/index.html・
    // 確認日 2026-07-17）。本 PDF は city.minato.tokyo.jp 配下＝「港区ホームページ上の各ファイル」。
    license:
      "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      // ⚠ H31 は見出しも Kangxi 部首（⼊=U+2F0A・⽐=U+2F50・⽬=U+2F6C）で組まれている。
      //   見出し照合は正規化前に走るので、Kangxi 表記のまま与える。
      revenueHeading:
        gen === "reiwa" ? "歳入予算内訳表"
        : gen === "h31" ? "歳⼊予算の内訳（対前年度⽐較）"
        : gen === "h30" ? "歳入予算の内訳（対前年度比較）"
        : "（１）歳入",
      expenditureHeading:
        gen === "reiwa" ? "目的別歳出予算内訳表"
        : gen === "h31" ? "⽬的別歳出予算内訳表"
        : "（２）目的別歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true, // 原典が款番号を振らない（20年度すべて）
      // 「主な内訳」子行を落とす（上記）。H30 以前は表の直前の散文（半角読点・億）も落とす
      revenueHeaderExtra:
        (gen === "reiwa" || gen === "h31" ? "" : "[、。､]|億|") +
        "特別区[民⺠]税|特別区たばこ税|般財源分|社会保障財源分",
      ...(gen === "reiwa" || gen === "h31" ? {} : { expenditureHeaderExtra: "[、。､]|億" }),
      // 主要事業（Ⅳ章 参考資料 `２ 所管部署別新規・臨時・レベルアップ事業一覧`・2026-07-31・#162）。
      // **R8 のみ**。⚠ **他年度へ外挿しない** — 列の x が年度で全部ずれる（R7 は区分 79.7・
      // 名前 133.3・所管課 377.3 で、`うちレベルアップ分` 列そのものが無い）。物理ページも動く
      // （R7 p.5–15 / R6 p.5–14 / R5 p.7–18 / R4 p.6–13 / R3 p.12–19 / R2 p.5–13 / H31 p.4–11 /
      // H30 p.4–12。**H29 以前は締めの表が無く検証ゲートを設計できない**。詳細は docs §10n-2）。
      //
      // ⚠ **収録するのは「新規・臨時・レベルアップ」だけ**（原典がそういう表）。歳出の 26.4%
      //   （56,648,478 / 214,300,000）で、**北区のような完全分解ではない**。継続の通常事業は載らない。
      // ⚠ **同じ予算概要の「Ⅲ章 新規・臨時・レベルアップ事業」を採ってはいけない** —
      //   款が `民生費ほか` と**複合款で潰れる**（按分不可）うえ、原典に合計が無く検証が張れない。
      ...(fy === "R8"
        ? {
            kanFile: `${path}.pdf`,
            projectsFile: "20260202131436.pdf",
            projectPages: { from: 5, to: 17 },
            projectFormat: "dept-kan-table" as const,
          }
        : {}),
    },
  })),

  ...([
    // [年度, ドキュメントID/ファイル名, 年度ページのパス]
    ["R8", "17921/r8_sokatsuhyo.pdf", "a0002/kusei/zaisei/yosan/r8/r8tousyo_press"],
    ["R7", "16917/r7_sokatsuhyo.pdf", "a0002/kusei/zaisei/yosan/r7/r7tousyo_press"],
    ["R6", "15419/r6_sokatsuhyo.pdf", "a0002/kusei/zaisei/yosan/r6/r6tousyo_press"],
    // ⚠ R5 以降は年度ディレクトリが `rNnendo` になり、ページ名も規則を失う（タイムスタンプ名）。
    //    ファイル名も sokatsuhyo / soukatuhyou とローマ字転写が揺れる。**外挿できない**。
    ["R5", "13525/r5soukatuhyou.pdf", "a0002/kusei/zaisei/yosan/r5/20230126"],
    ["R4", "2801/r4soukatuhyou.pdf", "a0002/kusei/zaisei/yosan/r4nendo/zaisei_time_20220208"],
    ["R3", "2791/r3tousyo_soukatuhyou.pdf", "a0002/kusei/zaisei/yosan/r3nendo/r3_tousyoyosanan"],
    ["R2", "2786/r2tousyo_soukatuhyou.pdf", "a0002/kusei/zaisei/yosan/r2nendo/zaisei_20200207"],
    // H31〜H29（2026-07-16 追加）。**parserOptions は R2〜R8 と完全同一で通る**（Σ 3年度×2側×
    // 2列の12系統すべて差0・款名は収録時に全件目視）。弱い見出しの区なので**3年度とも「予算（案）
    // の概要」PDF（総括表とは別ファイル）と総額を突合済み**（H31=1,031億3,274万9千・H30=897億
    // 9,121万9千・H29=953億2,171万3千）。原典が自ら「前年度当初予算」と書いており prevBasis も裏取れる。
    // ⚠ **H31 の年度ディレクトリは `r1nendo`**（`h31nendo` ではない）。サイトは「令和元年度（平成31
    //    年度）」と併記するが、**PDF の表題は「平成３１年度」**なので fiscalYear は H31。
    //    ファイル名の転写も 31/29 は `tousyoyosansoukatuhyou`・**30 だけ `tousyosoukatuhyou`**（`yosan`
    //    が無い）と揺れる。**外挿できない**。
    // ⚠ **H29 が現行サイトの最古**（これで H29〜R8 の10年度が打ち止め）。H29 の廃止款
    //    `（特別区債）` の空セルが **U+FF0D（全角ハイフンマイナス）** で、パーサのダッシュ落としに
    //    その字が無く款名が `（特別区債）－` になっていた（**Σ は差0 で validate も素通り**する表示
    //    専用の破損＝§2-4）。→ kofu-yosansho.ts の文字クラスへ `－` を足して対処済み。
    // ⚠ **H29 歳出の前年度列見出しだけ `前年度予算相当額`**（歳入側は `前年度予算額`）＝H28 を H29 の
    //    款体系へ組み替えた restated 値の可能性が高い。H29 を収録する分には影響しないが、**H28 を
    //    足すときは H29前年 ≠ H28当年 になりうる**（今回の鎖は H30前年=H29当年 までしか見ていない）。
    ["H31", "2772/31tousyoyosansoukatuhyou.pdf", "a0002/kusei/zaisei/yosan/r1nendo/20190204081418393"],
    ["H30", "2763/30tousyosoukatuhyou.pdf", "a0002/kusei/zaisei/yosan/h30nendo/20180202142459098"],
    ["H29", "2756/29tousyoyosansoukatuhyou.pdf", "a0002/kusei/zaisei/yosan/h29nendo/20170523093229437"],
  ] as const).map(([fy, path, page]) => ({
    // 中央区（団体コード 131024・人口 187,404＝R6 決算状況調から実引き）。
    // **款別専用の小さな PDF**（6ページ・「各会計予算計上額総括表」）。数百ページの予算書に
    // 総括が埋まっている政令市と違い、**物理 p.1 = 印字 p.1（ズレ0）**で p.1 に一般会計の
    // 歳入21款＋歳出11款が縦積み（＝`samePage`）、p.2 繰越明許費・p.3 債務負担行為・
    // p.4-6 が特別会計。**一般会計 scope は p.1 だけで完結する**。
    //
    // ⚠ **見出しは弱い語（`歳入`/`歳出`）でなければならない**（実測で再現確認済み）。
    //    パーサは見出しに一致する行を**行ごと skip する**設計で（`kofu-yosansho.ts` の
    //    `headingCompact` 分岐）、ページ内のタイトル行 `歳　　入` を読み飛ばさせるのが目的。
    //    見出しを `中央区一般会計予算計上額総括表` のような強い語にすると skip が効かず、
    //    **款1 が `歳入特別区税` / `歳出議会費` に静かに壊れる**（Σ は差0 のままなので validate も
    //    素通りする）。→ **「見出しは強いほど安全」ではない**。§10a の大田・千代田とは逆の作法。
    // ⚠ 弱い見出しの代償として、**p.4-6 の特別会計も同じ `歳入`/`歳出` を持つ**ため、
    //    ページ指定を誤ると **throw せず別会計を静かに収録する**。ページを動かしたら必ず総額
    //    （R8 = 198,649,755千円）を概要 PDF と突合すること。
    //
    // 款体系（歳出11款は R2〜R8 で完全に不変）:
    //   議会 / 企画 / 総務 / 区民 / 福祉保健 / 環境土木 / 都市整備 / 教育 / 公債 / 諸支出金 / 予備
    //   → 民生費・衛生費・土木費・商工費・労働費・農林水産業費・**消防費**が存在しない
    //     （民生・衛生は福祉保健費、土木は環境土木費・都市整備費に対応）。**職員費の款は無い**。
    //   歳入21款: **特別区交付金 = R8 12.1%**（24,000,000千円）。地方交付税の款は無い（§10）。
    //   ⚠ **款番号は年度をまたいで同一物を指さない** — 環境性能割交付金が R1 新設のため、
    //     H30 以前は款番号が1つずつ繰り下がる（H30 の款8=地方特例交付金 → R1 以降は款9）。
    //   なお §10 の当初の記述「中央区は款名が1つも一致しない」は**誤り**（decision の目的別と
    //   議会費・総務費・教育費・公債費の**4款が一致**する）。主旨（接続しない）は変わらない。
    //
    // **廃止款（§9c）は正しく拾えている** — 皆減の年は原典が款番号を外し括弧書きにする
    //   （R6 `（ 特 別 区 債 ）  0  11,079,000  皆減`）。kanNo=null で拾われ**前年度 Σ も差0**。
    // ⚠ **H31〜H29 も現行サイトに現存する**（計10年度）が**未収録**（年号ラベルは
    //    pipeline/lib/fy.ts の eraYear で H 対応済み＝収録の障害は解消。大田も H20 まで19年度分が現存）。
    id: `chuo-sokatsuhyo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 中央区各会計予算計上額総括表`,
    publisher: "中央区",
    url: null,
    urls: [`https://www.city.chuo.lg.jp/documents/${path}`],
    landingPage: `https://www.city.chuo.lg.jp/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "中央区（一般会計・団体コード131024）",
    // 「このホームページの詳細情報」＞著作権について（確認日 2026-07-16）。**PDF を明示的に
    // 対象に含めている**ので本資料に直接適用される。オープンデータの CC BY 4.0 は及ばない —
    // 規約自身が「当ライセンスは、本サイトに掲載しているデータのみに適用されますので、それ以外の
    // データについては、中央区ホームページにおける著作権の取扱いに準じてください」と**明示的に
    // この著作権表示へ差し戻して**おり、かつ区の36データセット・東京都カタログの47データセットとも
    // 予算・決算・財政は0件（§9g に従い CC BY は license 欄に書かない）。
    license:
      "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 1,
      samePage: true,
      // ⚠ 強い見出しに変えないこと（上記）
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), ドキュメントID/ファイル名, 年度ページ名]
    // ⚠ **URL に規則が無い**（3か所で破れる）。年度を足すときは全年度インデックス
    //    /kusei/yosan/yosan/r2izen/yosangaiyou/index.html から辿ること:
    //    ①ページ名が `gaiyo08`/`gaiyo07`/**`gaiyou06`**（u が入る）/`gaiyo05`/**`beforegaiyo04`**/
    //      **`beforegaiyo03`**/`gaiyo02` ②ドキュメントIDが不連続で **R5 と R4 で逆行**する
    //    ③R2 だけファイル名が `r02yosan_s01.pdf`（`_yosan_siryou` ではない）
    ["R8", 71, 72, "19579/r08_yosan_siryou.pdf", "gaiyo08"],
    ["R7", 63, 64, "17203/r07_yosan_siryou.pdf", "gaiyo07"],
    ["R6", 68, 69, "14537/r06_yosan_siryou.pdf", "gaiyou06"],
    ["R5", 75, 76, "2254/r05_yosan_siryou.pdf", "gaiyo05"],
    ["R4", 68, 69, "2259/r04_yosan_siryou.pdf", "beforegaiyo04"],
    ["R3", 66, 67, "2258/r03_yosan_siryou.pdf", "beforegaiyo03"],
    ["R2", 62, 63, "2257/r02yosan_s01.pdf", "gaiyo02"],
  ] as const).map(([fy, rev, exp, path, page]) => ({
    // 目黒区（団体コード 131105・人口 281,400＝R6 決算状況調から実引き）。
    // 「当初予算案プレス発表資料（資料編）」の「各会計歳入歳出予算」。**印字ページ = 物理 − 2**（全年度一貫）。
    // Σ款=合計は 7年度×2側×2年度の**28系統すべて差0**、年度間クロスチェックも6リンク全款一致。
    //
    // ⚠ **`kanNoless` は R2 のために必須**（実測で再現確認済み）。R2 の歳入には廃止税目の行があり
    //    原典が**款番号欄を空にする**:
    //      `   自動車取得税交付金   0   0.0   137,800   0.1   △137,800   0.0`
    //    無しだと20款しか取れず**前年度 Σ が 137,800千円 不足**するが、**validate は当年度 Σ しか
    //    見ないので error にならない**（札幌6.9億・福岡1千円と同じ §8 の「静かに落ちる」型）。
    //    → `kanNoless` で `kanNo: null` として拾い、前年度 Σ も差0 になる。岡山 §9i で入った拡張が
    //    政令市で既知だった欠損型を副次的に解消した形。**R8〜R3 では完全な no-op**（実測）なので
    //    全年度に一律指定して安全。
    // ⚠ **合計ラベルは `計`**（`歳入合計` ではない）。既定のままだと落ちる。
    // ⚠ **同一 PDF に特別会計（国保・後期高齢・介護）の同型表が並ぶ**。見出し語が同一なので
    //    ページ指定を誤ると **throw せず特会を静かに読む**（中央・江東と同じ弱点）。
    //    **一般会計は常に最初の対**で、直前に `１ 一 般 会 計` がある。
    //
    // 款体系（歳入20款・歳出11款）:
    //   歳出11款 = 議会 / 総務 / **区民生活** / **健康福祉** / 産業経済 / **都市整備** / **環境清掃** /
    //              教育 / 公債 / 諸支出金 / 予備
    //   → 民生費・衛生費・土木費・**消防費**が無い。**職員費の款も持たない**（千代田・葛飾型ではない）。
    //   歳入は**特別区交付金 = 13.5%**（R8 21,800,000千円）で §10 の幅（港0.7%〜荒川37.6%）の中位。
    //
    // **議決による修正の確認**（§10 の千代田 H29 型）: R6 は「主要な施策の成果等報告書」（決算後発行）の
    //   「当初予算額 130,021,510,000円」が本資料の当年度額と一致＝**修正なし**を実証済み。
    //   R8 は成果報告書が出る 2027年秋まで同じ検算ができないので、**別資料の予算編成概要**
    //   （`19674/r8_henseigaiyo.pdf` の「款別当初予算額推移」）が31款すべて一致することで代替する。
    // ⚠ **予算編成概要は年度によってテキスト層が死んでいる**（R7 版は ToUnicode 欠落で全文が空白）。
    //    プレス資料編を主資料に採る理由の1つ。乗り換えるなら年度ごとに再判定すること。
    id: `meguro-yosanan-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 目黒区当初予算案プレス発表資料（資料編・各会計歳入歳出予算）`,
    publisher: "目黒区",
    url: null,
    urls: [`https://www.city.meguro.tokyo.jp/documents/${path}`],
    landingPage: `https://www.city.meguro.tokyo.jp/zaisei/kusei/yosan/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "目黒区（一般会計・団体コード131105）",
    // 「目黒区ウェブサイト上の内容に関する著作権・商標」（確認日 2026-07-16）。
    // CC BY の例外は「目黒区オープンデータ」限定で本資料に及ばない — BODIK カタログ（組織 131105）の
    // 全169件に予算・歳入・歳出・款は0件で、「財政」に当たる1件も**総務省様式の財政状況資料集**＝
    // 決算であって当初予算ではない。§9g に従い CC BY は license 欄に書かない。
    license:
      "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "歳入予算（款別）",
      expenditureHeading: "歳出予算（款別）",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      kanNoless: true,
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), ファイル名, 年度ページ名, パス基底]
    // ⚠ **ページ位置が毎年動く**（50/56/50/48/30/12/6）。R7 だけ前付けが6ページ膨らむ。**外挿しない**。
    //    （H31〜H28 は4年度とも 6/7 で不動だが、これも4年度すべて実測で確認している）
    // ⚠ ファイル名も R4〜R8 は `{N}tousyoyosanangaiyou` / R2・R3 は `{N}yosanangaiyou` と揺れる。
    // ⚠ **H29・H28 はパス基底ごと変わる** — R8〜H30 は `/011102/…` の平坦な配置だが、H29・H28 は
    //    年度ディレクトリ配下（`/011102/kuse/yosanzaise/yosan/h29/…`）にある。**外挿できない**ので
    //    基底を列に持つ。さらに **H29 のファイル名は年度接頭辞を持たない**（`yosanangaiyou.pdf`）。
    ["R8", 50, 51, "8tousyoyosanangaiyou.pdf", "8nendotosyoyosangiketu", "011102"],
    ["R7", 56, 57, "7tousyoyosanangaiyou.pdf", "7nendotosyoyosangiketu", "011102"],
    ["R6", 50, 51, "6tousyoyosanangaiyou.pdf", "6nendotousyoyosangiketu", "011102"],
    ["R5", 48, 49, "5tousyoyosanangaiyou.pdf", "r5nendotousyoyosan", "011102"],
    ["R4", 30, 31, "4tousyoyosanangaiyou.pdf", "4tousyoyosan", "011102"],
    ["R3", 12, 13, "3yosanangaiyou.pdf", "3tousyoyosan", "011102"],
    ["R2", 6, 7, "2yosanangaiyou.pdf", "2tousyoyosan", "011102"],
    // H31〜H28（2026-07-16 追加）。**4年度とも parserOptions は R2〜R8 と完全同一で通る**
    // （Σ 4年度×2側×2列の16系統すべて差0・款名は収録時に全件目視）。この区は誤ページでも Σ差0 で
    // 通るため、**4年度とも区の発表額と総額を突合済み**（H31=2,054億700万・H30=1,929億5,200万・
    // H29=1,996億4,200万・H28=1,886億3,800万）。
    // ⚠ **H31 のファイル名は `ananngaiyou`（n が3つ）** — 原典の綴りどおり。
    // ⚠ **H28 だけ概要が2分割**。款別比較表は `28yosanan1.pdf`（14p）にあり、`28yosanngaiyou2.pdf`
    //    は「新たな取組み（主な事業）」＝別資料。**主な事業を後で収録するなら H28 は別ファイル**。
    // 歳入は H30〜H28 が21款 → **H31 で環境性能割交付金が新設され22款**（前年度 0＝皆増）。
    // 歳出10款は H28〜R8 で不変。
    ["H31", 6, 7, "31yosananngaiyou.pdf", "31tousyoyosann", "011102"],
    ["H30", 6, 7, "30yosanangaiyou.pdf", "30tousyoyosann", "011102"],
    ["H29", 6, 7, "yosanangaiyou.pdf", "29tousyoyosannann", "011102/kuse/yosanzaise/yosan/h29"],
    ["H28", 6, 7, "28yosanan1.pdf", "28tousyoyosan", "011102/kuse/yosanzaise/yosan/h28"],
  ] as const).map(([fy, rev, exp, file, page, base]) => ({
    // 江東区（団体コード 131083・人口 541,685＝R6 決算状況調から実引き）。「予算（案）概要」の
    // 「一般会計当初予算対前年度比較」。Σ款=合計は 7年度×2側×2年度の**28系統すべて差0**、
    // 年度間クロスチェックも6リンク全款一致。**H28 まで11年度が現行サイトに現存**するが未収録
    // （年号ラベルは pipeline/lib/fy.ts の eraYear で H 対応済み＝収録の障害は解消。大田・中央も同じ）。
    //
    // ⚠ **歳出ページの見出しは `歳 出` しかなく、特別会計の歳出ページと区別できない**（実測）。
    //    国保の p.55 を当てても **Σ は差0 で静かに通る**（8款・46,896,000）。守っているのは
    //    **validate の「歳入合計 ≠ 歳出合計」チェックだけ**。→ ページを動かしたら必ず validate を通す。
    //    歳入側は見出し（`一般会計当初予算対前年度比較`）が一般会計を断言するので throw で守れる。
    // ⚠ **その強い歳入見出しの代償が `revenueHeaderExtra: "^歳入$"`**（中央区と同じ罠・実測）。
    //    パーサは**見出しに一致する行を行ごと skip する**ので、見出しを表題（`一般会計当初予算対
    //    前年度比較`）に取ると、その下にあるタイトル行 `歳      入` が skip されず**款1 が
    //    `歳入特別区税` に静かに汚染される**（Σ は差0 のままで validate も素通り）。
    //    歳出側は見出しがタイトル行そのもの（`歳 出`）なので skip されて無事＝**側で非対称**。
    //    → **歳入だけ HeaderExtra でタイトル行を落とす**。偵察は「款名は全件クリーン」と報告して
    //      きたが**誤り**で、収録時に自分で全件目視して見つけた（§2-4 の「Σ が守らない領域」）。
    // ⚠ **年度ディレクトリのスラグが年度と1つずれる区間がある** — `/r1/` の中身は**令和2年度**で
    //    **`/r2/` は存在しない**（`/h31/` が平成31年度＝R1）。年度スラグを機械生成しない。
    //
    // 款体系（歳出10款は H28〜R8 で不変）:
    //   議会 / 総務 / 民生 / 衛生 / 産業経済 / 土木 / 教育 / 公債 / 諸支出金 / 予備
    //   → **総務省の目的別にかなり近い**（23区では珍しい）が、消防費・農林水産業費・災害復旧費・
    //     労働費・商工費が無く「産業経済費」がある＝**完全一致ではない**ので decision とは接続しない。
    //   → **職員費の款は持たない**（千代田・葛飾型ではない）。**特別区交付金 25.5%**（R8）。
    //
    // 版面: **款名が中央寄せ3行に折り返す**（上段＋款番号行＋下段）＝§9d の名古屋・札幌型で
    //   `awaitTail` が既に吸収済み（`株式等譲渡所得割交付金` 等8款が全年度でこの型・実測でクリーン）。
    //   廃止款の記号は `△`（R2 の自動車取得税交付金・§9c で拾える）。象徴計上 1千円あり（R8 環境性能割）。
    id: `koto-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 江東区予算（案）概要（一般会計当初予算対前年度比較）`,
    publisher: "江東区",
    url: null,
    urls: [`https://www.city.koto.lg.jp/${base}/documents/${file}`],
    landingPage: `https://www.city.koto.lg.jp/${base}/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "江東区（一般会計・団体コード131083）",
    // 「著作権・リンクについて」（確認日 2026-07-16）。**PDF を明示的に対象に含める**。
    // 東京都オープンデータカタログの CC BY は及ばない（江東区の全93データセットに予算・決算・
    // 財政・歳入・歳出は0件＝実検索）。§9g に従い CC BY は license 欄に書かない。
    license:
      "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "一般会計当初予算対前年度比較",
      expenditureHeading: "歳 出",
      revenueHeaderExtra: "^歳入$",
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), 和暦2桁, 配信アセットのハッシュ]
    // ⚠ **総括の物理ページが年度で飛ぶ**（印字はどの年度も 21/22 で同じなのに R8 だけ +10）。**外挿しない**。
    ["R8", 45, 46, "08", "c85b01cbe55648f3b5ca9e2a24f1acdc"],
    ["R7", 35, 36, "07", "adb12cdac1e243b08bf17586deb3b4e6"],
    ["R6", 35, 36, "06", "015bac93f649407c8b1b77e74679a5d0"],
    ["R5", 35, 36, "05", "e0b774174e384a5da3a056344280fea2"],
  ] as const).map(([fy, rev, exp, nn, hash]) => ({
    // 渋谷区（団体コード 131130・人口 231,402＝R6 決算状況調から実引き）。
    // 「各会計予算・各会計予算説明書」（予算書本体・約600ページ）の「歳入歳出予算事項別明細書 １．総括」。
    // Σ款=合計は 4年度×2側×2年度の**16系統すべて差0**、年度間クロスチェックも3リンク全款一致。
    //
    // 【資料の選択】区は同じ年度に2種類の PDF を出すが**予算説明書のほうしか使えない**:
    //   ①「当初予算案の概要」= PowerPoint 製の広報スライド。p.51 に款別があるが**単位が百万円**で
    //     **議会費/諸支出金/予備費が「その他」へ丸められる**。歳入に至っては款別ですらない（4区分・億円）。
    //   ②「各会計予算・各会計予算説明書」= 予算書本体。**これを採る**。
    //   なお同 PDF の「第１表 歳入歳出予算」にも款別があるが**前年度列が無い**ので不可。
    // ⚠ **R4 以前は収録不可**（欠番の理由）。予算説明書 PDF の公表が R5 開始で、R4 以前のあらましは
    //    HTML の表のみ。款別はあるが**前年度額の列が無い**（「対前年度増減率（％）」だけ）＝
    //    budget 階層の要件を満たさない（増減率からの逆算は推計になるので**しない**）。
    //    Wayback の R4 期スナップショットにも PDF リンクは無く、**消えたのではなく最初から無い**。
    // ⚠ **同 PDF に特別会計の総括が並ぶ**（物理 p.387/472/549）。見出し語が同一なので**ページ指定を
    //    誤ると throw せず別会計を静かに読む**（中央・目黒・江東と同じ弱点）。総額 152,541,000（R8）で突合する。
    //
    // 款体系（歳入19款・歳出11款が R5〜R8 の4年度で完全に不変・款名の揺れもゼロ）:
    //   歳出11款 = 議会 / 総務 / 民生 / 衛生 / **環境** / 産業経済 / 土木 / 教育 / 公債 / 諸支出金 / 予備
    //   → §10 の制度由来で**消防費・地方交付税が無い**うえ、**特別区債・地方債の款が全年度で存在しない**
    //     （千代田・港と同じ起債ゼロ型。公債費は R8 487,408千円＝既往債の償還として残る）。
    //   → **特別区交付金は R8 で 1.6%**（2,500,000/152,541,000）＝§10 の港 0.7% に次ぐ23区最低クラス。
    //     「特別区交付金は5〜30%」という見当がいかに通じないかの実例（§10）。
    id: `shibuya-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 渋谷区各会計予算・渋谷区各会計予算説明書（歳入歳出予算事項別明細書 総括）`,
    publisher: "渋谷区",
    url: null,
    urls: [
      `https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/${hash}/yosan${nn}_yosansho${nn}.pdf`,
    ],
    landingPage: `https://www.city.shibuya.tokyo.jp/kusei/zaisei/yosan-aramashi/yosan${nn}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "渋谷区（一般会計・団体コード131130）",
    // サイトポリシー「著作権について」の**全文**（確認日 2026-07-16）。
    // ⚠ **末尾の禁止文を削って引用しないこと** — `licenseClassOf` は渋谷を `無断`（渋谷は使わない）
    //   ではなく `(?:転載|複製|二次利用|引用)[^。]{0,10}(?:禁じ|禁止)` の並びで拾っている。
    //   禁止文を落とすと **unverified へ落ちる**（実測で再現。§10 の1巡目はこれを「語彙のギャップ」と
    //   誤報していた）。同ページの「ファイルドメインについて」が files.city.shibuya.tokyo.jp
    //   （＝本 PDF の配信先）を区の管理下と明示しており、本サイトの範囲に含まれる。
    //   オープンデータ（ArcGIS Hub・CC BY 4.0）は規約が自ら範囲を限り、全122件に本 PDF は無い。
    license:
      "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "歳入歳出予算事項別明細書",
      expenditureHeading: "(歳 出)",
    },
  })),

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), ファイルパス, 年度ページの記事ID]
    // ⚠ **R4〜R8 は 14/16、R2・R3 は 12/14**（前段の章立てが2ページ短い）。印字はどの年度も 2/4。
    // ⚠ **年度ページの記事IDは連番でなく不規則**。インデックス（/information/1000085/1006293/）から辿る。
    ["R8", 14, 16, "001/041/034/8yosangaiyou.pdf", "1041034"],
    ["R7", 14, 16, "001/037/487/r7yosangaiyou.pdf", "1037487"],
    ["R6", 14, 16, "001/034/308/r6yosangaiyo.pdf", "1034308"],
    ["R5", 14, 16, "001/030/965/r5_katsu_yosan2.pdf", "1030965"],
    ["R4", 14, 16, "001/027/976/r4yosanngaiyou.pdf", "1027976"],
    ["R3", 12, 14, "001/025/473/reiwa3yosangaiyou.pdf", "1025473"],
    ["R2", 12, 14, "001/022/573/yosanngaiyou.pdf", "1022573"],
    // H31・H30（2026-07-16 追加）。R3・R2 と同じ 12/14。**parserOptions は7年度と完全同一で通る**
    // （Σ 2年度×2側×2列の8系統すべて差0・款名は収録時に全件目視してクリーンを確認）。
    // ⚠ **`kanNoless` は H31・H30 では no-op**（有無で出力が1文字も変わらないことを実測）。
    //    R8 の「第6の折返し型」は H 年度には無く、折返し行でも款番号と金額が同じ行に並ぶ。
    //    → **H 年度の款は原典どおり kanNo を持つ**（R8 のように null に落ちない）。
    // ⚠ **廃止マーカー（R2 `○`/R4 `〇`）は H31・H30 には出ない** — 自動車取得税交付金は
    //    H31 款7（182,000）・H30 款7（383,000）と**款番号を持ったまま現存**する（皆減は R2 で起きる）。
    //    H31 で環境性能割交付金が款8 として新設（前年度 0＝皆増）→ 歳入は H30 20款 → H31 21款。
    // ⚠ **ファイル名が年度で全く違う**（H31 `31katsugaiyou` / H30 `yosangaiyou2`＝年度名を含まない）。
    ["H31", 12, 14, "001/020/311/31katsugaiyou.pdf", "1020311"],
    ["H30", 12, 14, "001/017/523/yosangaiyou2.pdf", "1017523"],
    // H29・H28（2026-07-22 追加・#136）。H31・H30 と同じ物理 12/14、parserOptions も完全同一で通る。
    // ⚠ §10f の申し送り「H30 の前年度列に `著増`」の実体は **H30 寄附金行の増減率欄**
    //    （29,002 / 前年 2）で、**両金額とも印字あり**＝パーサの `/(?<!ほぼ)皆増/` に当たらず
    //    前年度 2 を正しく読む（実測）。H29・H28 の一般会計2ページに 皆増/皆減/著増 は無い
    //    （H28 の `皆増` は駐車場特会＝パース対象外）。
    // ⚠ ファイル名の無規則が続く（H29 `29angaiyou`＝ "yosan" が無い / H28 `28yosangaiyou`）。
    ["H29", 12, 14, "001/013/830/29angaiyou.pdf", "1013830"],
    ["H28", 12, 14, "001/010/536/28yosangaiyou.pdf", "1010536"],
  ] as const).map(([fy, rev, exp, file, page]) => ({
    // 葛飾区（団体コード 131229・人口 469,916＝R6 決算状況調から実引き）。「予算概要」の「各会計款別表」。
    // Σ款=合計は 11年度×2側×2年度の**44系統すべて差0**、年度間クロスチェーンも R8→H28 の10リンク一致。
    // **H28 が年度インデックスの現存最古**（H27 以前は記事が無い・2026-07-22 に全件実測）＝打ち止め。
    //
    // ⚠ **R8 は「第6の折返し型」で `kanNoless` が無いと6款が落ちる**（実測で再現確認済み）。版面は
    //      `     株式等譲渡所得割`      ← 款名の上段（金額なし）
    //      `５    交付金`               ← **款番号と款名の下段が同じ行・金額は無い**
    //      `                1,940,000  953,000 …`  ← 金額だけの行
    //    で、**款番号の単独行ではない**ため `pendNo`（甲府R2・大阪 §8e）にも §9j の孤児機構にも
    //    乗らず、**5 株式等譲渡所得割交付金 / 6 地方消費税交付金 / 7 環境性能割交付金 /
    //    10 交通安全対策特別交付金 / 11 分担金及び負担金 / 12 使用料及び手数料 の6款が落ちる**
    //    （Σ −19,532,957千円＝落ちた6款の和と一致）。`kanNoless` が pendName 経由で救済する。
    //    **Σ ゲートが止めるので静かには壊れない**。代償として**この6款は `kanNo: null` になる**
    //    （原典は 5・6・7・10・11・12 と振っている）。金額・款名は正しい。
    // ⚠ **表側ラベル `款 名` と節見出し `２ 各会計款別表` が款1 へ連結する**（`款名特別区税`・
    //    `各会計款別表特別区税`）。**Σ を素通りする型**なので HeaderExtra で落とす（§2-4）。
    // ⚠ **`葛` の字が特定フォントで丸ごと消える**（`pdftotext` が `葛飾区予算概要` →
    //    **`飾区予算概要`**）。Aspose 生成 PDF のサブセットに ToUnicode が無い（本文の明朝では正しく出る）。
    //    **款名には `葛` が現れないので款別は無傷**だが、**主な事業・評価表を収録すると事業名が欠字になる**
    //    （`ゆりかご葛飾の推進` → `ゆりかご 飾の推進`）。Σ でも validate でも捕まらない＝§2-4 の型。
    //
    // 款体系（歳出12款・**職員費を持つ**＝千代田・世田谷・足立・杉並と同じ名古屋/札幌型）:
    //   → **款9 職員費 R8 29,178,805千円（10.3%）**で全款から人件費を抜くので、**他自治体と款別を
    //     直接比較すると民生費等が過小に見える**（§10）。民生費・衛生費・土木費・商工費・労働費が
    //     存在せず「福祉費・環境費・都市整備費・産業経済費」に再編されている。**世田谷のような
    //     発行元公式の再配分版は無い**。**特別区交付金 35.0%**（R8 99,000,000千円）＝§10 の幅の上位。
    //   歳入は年度で増減する: H31 まで自動車取得税交付金あり（R2 で皆減）／**R5〜R7 は特別区債が無く
    //     19款・R8 で復活**（11,571,000千円・皆増）。
    // ⚠ **R2 の廃止款マーカーは `○`（U+25CB）で R4 の `〇`（U+3007）と別の字**（§9c の字の揺れが
    //    同一自治体の年度内で起きる）。R2 は直後の金額 `0` を款番号として読むため **kanNo が 0 になる**
    //    （正しくは null）。金額は 0 / 182,000 で正しく、`皆減` 判定も効いている。
    id: `katsushika-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 葛飾区予算概要（各会計款別表）`,
    publisher: "葛飾区",
    url: null,
    urls: [`https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/${file}`],
    landingPage: `https://www.city.katsushika.lg.jp/information/1000085/1006293/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "葛飾区（一般会計・団体コード131229）",
    // 「著作権等について」（/about/copyright.html・確認日 2026-07-16）。葛飾区は独自ポータルを持たず
    // 東京都オープンデータカタログに32件を CC BY 4.0 で出しているが**予算・決算・財政は0件**（実検索）
    // ＝政令市20市と同じ「及ばない」型。§9g に従い CC BY は license 欄に書かない。
    license:
      "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "一般会計歳入予算款別表",
      expenditureHeading: "一般会計歳出予算款別表",
      revenueHeaderExtra: "^款名$|各会計款別表",
      expenditureHeaderExtra: "^款名$|各会計款別表",
      kanNoless: true,
    },
  })),

  ...([
    // 墨田区（2026-07-22 追加・#124）。[年度, 年度ページ名, PDFパス, 歳入p(物理), 歳出p(物理), 追加opts]
    // **H17〜R8 の22年が現行サイトに全year現存**（年度一覧 /yosan_gaiyou/index.html を全件辿って実測・
    // 欠番なし）。全22年度を try-parse で実測してから登録した（Σ 22年度×2側×2列の88系統すべて差0）。
    // ⚠ **CropX・textSource・ページが年度でバラバラ＝外挿禁止**。余白の印字ページ番号が款行に
    //    食い込む x 座標が年度で違い、CropX from が 30/45/95/100 の4通りに割れる。
    //    R2 は rot:270 で CropX 不可（回転前座標で切れて throw）→ textSource:"raw"。
    //    H31 も raw（-layout は余白番号の食い込みでΣ割れ）。H18・H17 は素で通る。
    // ⚠ **CropX 無しは静かに款が落ちる**（R7 は特別区交付金468億が消えΣ差 -46,816,000 等・
    //    Σゲートが捕まえるが大声では落ちない）。
    // ⚠ **年度ページ名も PDF 名も規則が毎年破れる**（H28 は拡張子前にドット2つ `28yosan-gaiyou..pdf`・
    //    H23/H22/H20 は `.pdf.pdf`・H25/H24 は `ta10…` の記事ID名）。
    // ⚠ **同一 PDF の直後ページに特会（国保・介護・後期高齢）の同型表**が同じ弱い見出しで並ぶ。
    //    **特会も歳入合計=歳出合計が成立する**（R8 国保 26,615,000 で実測）ため、ページ誤指定は
    //    validate の均衡チェックでも捕まらない。年度間クロスチェーン（22年連続）が実質の網。
    // ⚠ **H18 款5 株式等譲渡所得割交付金は「前年度 1,000 を印字しながら増減率欄に『皆増』」**
    //    — 原典自身が矛盾する新型（台東の「ほぼ皆増」＝語で区別とは別）。パーサ側で
    //    「皆増でも前年度セルに非0が印字されていれば印字値を採る」対応済み（増減 201,000 =
    //    202,000 − 1,000 とも整合するので印字値が正）。
    // 款体系: 歳出11款（議会/総務/区民生活/資源環境/民生/衛生/産業観光/土木/教育/諸支出金/予備費）。
    //   **職員費の款なし**（人件費配賦型）。⚠ H24 以前の款7 は「産業経済費」（H24〜H27 の間に
    //   産業観光費へ改称・年度をまたぐ結合は款名で行うので断層に注意）。歳入は 19〜21款
    //   （環境性能割交付金の新設・自動車取得税交付金の廃止で増減）。
    // 廃止款は款番号なしの括弧行で前年度額だけ残る（R8「(環境性能割交付金 0/185,000」・
    //   R2「自動車取得税交付金 0/93,000」）→ kanNoless で拾う（無しだと前年度Σが割れる）。
    ["R8", "r8yosangaiyou", "r8yosangaiyou.files/r8-yosangaiyou.pdf", 7, 8, { cropFrom: 30 }],
    ["R7", "r7yosangaiyou", "r7yosangaiyou.files/r7gaiyouan.pdf", 7, 8, { cropFrom: 95 }],
    ["R6", "r6yosangaiyou", "r6yosangaiyou.files/r6yosangaiyou.pdf", 7, 8, { cropFrom: 95 }],
    ["R5", "r5yosangaiyou", "r5yosangaiyou.files/r5yosanngaiyou.pdf", 7, 8, { cropFrom: 30 }],
    ["R4", "r4yosangaiyou", "r4yosangaiyou.files/r4yosangaiyou.pdf", 7, 8, { cropFrom: 100 }],
    ["R3", "R3nendoyosangaiyou", "R3nendoyosangaiyou.files/3yosangaiyou.pdf", 7, 8, { cropFrom: 30 }],
    ["R2", "r2_yosangaiyou", "r2_yosangaiyou.files/R2_yosangaiyou.pdf", 7, 8, { raw: true }],
    ["H31", "31yosangaiyou", "31yosangaiyou.files/31yosangaiyou_s.pdf", 6, 7, { raw: true }],
    ["H30", "h30yosangaiyou", "h30yosangaiyou.files/h30yosangaiyou.pdf", 8, 9, { cropFrom: 45 }],
    ["H29", "h29yosangaiyou", "h29yosangaiyou.files/h29_yosangaiyou.pdf", 12, 13, { cropFrom: 30 }],
    ["H28", "28yosan-gaiyou", "28yosan-gaiyou.files/28yosan-gaiyou..pdf", 10, 11, { cropFrom: 45 }],
    ["H27", "yosangaiyo", "yosangaiyo.files/27yosann2.pdf", 8, 9, { cropFrom: 30 }],
    // ⚠ H26 は cropFrom の帯が狭い: 95 だと**款番号列ごと切れて全款 kanNo:null**（kanNoless が
    //    款名は救うのでΣは差0のまま＝番号の消失は目視でしか気づけない）。60 なら番号を残して差0。
    ["H26", "26yosangaiyou", "26yosangaiyou.files/26gaiyou.pdf", 8, 9, { cropFrom: 60 }],
    ["H25", "ta104346037", "ta104346037.files/25gaiyou.pdf", 8, 9, { cropFrom: 45 }],
    ["H24", "ta10300020", "ta10300020.files/gaiyou.pdf", 6, 7, { cropFrom: 45 }],
    ["H23", "H23yosanngaiyou", "H23yosanngaiyou.files/23yosan-gaiyou.pdf.pdf", 6, 7, { cropFrom: 45 }],
    ["H22", "22yosangaiyou", "22yosangaiyou.files/22yosan-gaiyou.pdf.pdf", 7, 8, { cropFrom: 30 }],
    ["H21", "21yosangaiyou", "21yosangaiyou.files/21yosan-gaiyou.pdf", 8, 9, { cropFrom: 30 }],
    ["H20", "20yosangaiyo", "20yosangaiyo.files/20yosan-gaiyou.pdf.pdf", 8, 9, { cropFrom: 30 }],
    ["H19", "19yosangaiyou", "19yosangaiyou.files/19yosan-gaiyou.pdf", 7, 8, { cropFrom: 30 }],
    ["H18", "heisei18nendoyosangaiyou", "heisei18nendoyosangaiyou.files/heisei18nendoyosangaiyou.pdf", 6, 7, {}],
    ["H17", "h17_yosangaiyou", "h17_yosangaiyou.files/yosangaiyou_h17.pdf", 6, 7, {}],
  ] as const).map(([fy, page, file, rp, ep, extra]) => ({
    // 墨田区（団体コード 131075・人口 287,302＝R6 決算状況調から実引き）。「予算概要」巻頭の
    // 一般会計歳入歳出予算（案）款別表。単位千円・前年当初比較つき（列順は全年度 [当年度, 前年度, 増減]）。
    // ⚠ 本資料は**全年度「(案）」**（「計数未整理につき変動ある見込み」注記あり）。R8 は議決後の
    //   予算書 R8yosansyo.files/R8_tousyo.pdf 第1条 155,926,000千円と一致を実測（原案どおり成立）。
    //   予算書のウェブ公開は R3〜R8 のみ＝R2 以前の案=議決の突合は未実施。
    id: `sumida-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 墨田区予算概要 一般会計歳入歳出予算（案）`,
    publisher: "墨田区",
    url: null,
    urls: [`https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/${file}`],
    landingPage: `https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "墨田区（一般会計・団体コード131075）",
    // 「著作権等について」/thissite/tyosakuken.html（確認日 2026-07-22）。原文のまま。
    // 都オープンデータカタログの墨田区（t131075・199データセット）に当初予算款別は無い
    // （「財政」ヒットの行政基礎資料集は決算・財調・区税の推移のみ＝実ファイルで確認）＝CC BY は及ばない。
    // リンクは自由（/thissite/about_link.html）＝noDeepLink 不要。
    license:
      "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "^科目$",
      expenditureHeaderExtra: "^科目$",
      kanNoless: true,
      ...("cropFrom" in extra
        ? {
            revenueCropX: { from: extra.cropFrom, to: 842 },
            expenditureCropX: { from: extra.cropFrom, to: 842 },
          }
        : {}),
      ...("raw" in extra ? { textSource: "raw" as const } : {}),
    },
  })),

  {
    // 世田谷区 R8（2026-07-23 追加・#125）。「予算の見える化ボード」の CSV（歳入・歳出の2ファイル・
    // cp932・千円）。**款項目節細節の明細が 2018〜2026 の9年分入った単一ファイル（毎年上書き更新）**で、
    // 年度別にソースを増やすと 9.2MB×年数の raw 重複になるため**最新年度だけ**これを使い、
    // 過年度は下の tousyoyosan.xls（135KB・17年）で持つ。ID 系列は setagaya-kanbetsu-* で統一
    // （資料またぎでもクロスチェーンが張れる・江戸川の前例）。
    // 当年度額=「予算見積額」（Σ が R8 概要 PDF の記載合計 431,353,010 千円と差0・偵察実測）。
    // ⚠ 「現計予算額」は 2018〜2023 の歳入で全行0＝使わない。前年度額=「予算前額」（当初基準は
    // 年度間クロスチェック 8ペア×2側×款別まで全一致で確定・偵察実測）。合計行は無い（明細）。
    // ⚠ 単一 URL が毎年上書きされる型（財政事情と同じ）— R9 が出たら --force で魚拓の版を残すこと。
    id: "setagaya-kanbetsu-r8",
    title: "令和8年度 世田谷区一般会計当初予算 歳入・歳出（予算の見える化ボードCSV）",
    publisher: "世田谷区",
    url: null,
    urls: [
      "https://www.city.setagaya.lg.jp/documents/6208/ippansainyu.csv",
      "https://www.city.setagaya.lg.jp/documents/6208/ippansaisyutu.csv",
    ],
    landingPage: "https://www.city.setagaya.lg.jp/02022/6208.html",
    kind: "csv" as const,
    fiscalYear: "R8",
    scope: "世田谷区（一般会計・団体コード131121）",
    // 掲載ページ 6208.html のオープンデータ表示（確認日 2026-07-23）。原文のまま。区オープンデータ
    // カタログに「一般会計歳入予算」「一般会計歳出予算」として本 CSV の直リンクが登載済み（偵察実測）。
    // ⚠ サイト一般の著作権ページ（「無断での使用・転載、二次利用を禁じます」）は**このページには
    // 適用されない**ので license 欄に書かない（§9g）。
    license:
      "このページに掲載している添付ファイルは、オープンデータとして使用可能です。本サイトで公開しているオープンデータは、クリエイティブ・コモンズ表示4.0国際ライセンスの下に提供されています。",
    parser: "setagaya-mieruka-csv" as const,
    parserOptions: {},
  },

  ...([
    "R7", "R6", "R5", "R4", "R3", "R2", "R1", "H30", "H29", "H28", "H27", "H26", "H25", "H24", "H23", "H22", "H21",
  ] as const).map((fy) => ({
    // 世田谷区 H21〜R7（2026-07-23 追加・#125）。「年度別当初予算データ」XLS（tousyoyosan.xls・
    // 135KB）に**17年分の款別総括**（歳入（款別）/歳出（款別）シート・年度の列グループ・合計行あり）。
    // 17ソースが同一ファイルを指す（git は同一 blob を1つで持つ・raw 重複は 135KB×17=2.3MB）。
    // 前年度額は前年の列グループの予算額（最古 H21 のみ 予算額−増減額 で復元）。パーサに
    // **款ごとの等式ゲート**（当年−前年=印字の増減額）あり。⚠ R8 は未収載（CSV 側で持つ）・
    // ファイルは毎年3月頃に上書き更新される見込み → R8 が載ったら魚拓は --force で版を残す。
    id: `setagaya-kanbetsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 世田谷区一般会計当初予算 歳入・歳出款別（年度別当初予算データ）`,
    publisher: "世田谷区",
    url: null,
    urls: ["https://www.city.setagaya.lg.jp/documents/6187/tousyoyosan.xls"],
    landingPage: "https://www.city.setagaya.lg.jp/02022/6187.html",
    kind: "excel" as const,
    fiscalYear: fy,
    scope: "世田谷区（一般会計・団体コード131121）",
    // 掲載ページ 6187.html にも 6208 と同一のオープンデータ表示あり（確認日 2026-07-23）。
    license:
      "このページに掲載している添付ファイルは、オープンデータとして使用可能です。本サイトで公開しているオープンデータは、クリエイティブ・コモンズ表示4.0国際ライセンスの下に提供されています。",
    parser: "setagaya-tousho-xls" as const,
    parserOptions: {},
  })),

  ...([
    // 品川区（2026-07-23 追加・#125）。[年度, PDF群, landing, 歳入p, 歳出p, 追加opts]
    // 各会計予算・事項別明細書の「総括（歳入）/（歳出）」。歳入20款・歳出9款（特別区最少・
    // 議会/総務/民生/衛生/産業経済/土木/教育/公債/予備）。印字2頁=物理1頁の見開き結合（印字≠物理）。
    // 歳出総括は比較列の右に財源内訳4列が続くが先頭2金額（本年度・前年度）で正しく取れる（実測）。
    // ⚠ **R7 のみ歳入・歳出が別ファイル**（revenueFile/expenditureFile・#152 の機構の3例目）。
    // ⚠ **R8 は歳入の特別区債が科目存置**（当年度0・款番号なし）→ kanNoless 必須（無いと前年度Σが
    //    -6,450,000 でゲート停止＝静かには壊れない・実測）。
    // ⚠ **R3 以前は収録不可**: R3/H31/H30=スキャン+OCR崩れ・R2歳出=ToUnicode破損（豊島型）・
    //    H29=OCR無しスキャン・H28以前=明細書未掲載（款別の主な施策のみ・前年比較なし）。
    //    発行元が近年までスキャン入稿のため WARP を掘っても同じスキャンしか出ない見込み。
    // ⚠ URL 規則なし（R7/R8 は `2025tousyoyosan` 型・R2〜R6 はタイムスタンプ型・R5 だけ `_9`）。
    ["R8", ["2026tousyoyosan_3.pdf"], "2026tousyoyosan.html", 26, 92, {}],
    ["R7", ["2025tousyoyosan_4.pdf", "2025tousyoyosan_5.pdf"], "2025tousyoyosan.html", 25, 1,
      { revenueFile: "2025tousyoyosan_4.pdf", expenditureFile: "2025tousyoyosan_5.pdf" }],
    ["R6", ["20240208145918_8.pdf"], "20240208145918.html", 26, 87, {}],
    ["R5", ["20230208174032_9.pdf"], "20230208174032.html", 25, 82, {}],
    ["R4", ["20220210190000_8.pdf"], "20220210190000.html", 25, 81, {}],
  ] as const).map(([fy, pdfs, landing, rp, ep, extra]) => ({
    id: `shinagawa-kanbetsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 品川区各会計予算・事項別明細書（総括・款別歳入歳出）`,
    publisher: "品川区",
    url: null,
    urls: pdfs.map((f) => `https://www.city.shinagawa.tokyo.jp/ct/pdf/${f}`),
    landingPage: `https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "品川区（一般会計・団体コード131091）",
    // 「このホームページについて」＞著作権について（確認日 2026-07-23）。原文のまま。
    // 「引用」まで禁じる型（荒川と2例目）。リンク禁止の記述は無し＝noDeepLink 不要。
    // 都カタログ t131091 は139件中 予算・財政・決算 0件（実検索）＝CC BY は及ばない。
    license:
      "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      kanNoless: true,
      ...extra,
    },
  })),

  ...([
    // 板橋区（2026-07-23 追加・#125）。[年度, ページID, PDF名, 歳入p, 歳出p, 歳出見出し, 追加opts]
    // 「予算の概要」の一般会計当初予算総括表（歳入21款・歳出目的別11款・**百万円**・前年当初比較つき）。
    // ⚠ **単位が百万円** — 原典自身が「千円単位の表を百万円単位に簡略化したため、増減率等が合わない
    //    場合がある」と注記する資料（R7 p.11）。parserOptions.unit="millionYen" で ×1000 の等価変換を
    //    かけて千円で保存する（財政事情の万円→千円と同じ型）。**他区（千円）比で丸め粒度が粗い**。
    // ⚠ 2026-07-16 偵察の「glyph 復号が要る」の正体は **R4 の別資料（板橋区の予算）の ToUnicode
    //    欠落**で、本命の概要 R5〜R8 は健全（uni=yes）。**R4・R3・R2 は概要含め全資料がスキャン or
    //    ToUnicode 欠落で収録不可**（Wayback 捕捉でも実測）。H31 以前は実ファイル未検査。
    // ⚠ R5 は歳出の議会費だけラベル行と金額行が割れ、CropX 後の金額のみ行をパーサの款番号単独行
    //    判定が食っていた → bare 判定の1〜2桁制限（2026-07-23 のパーサ改修）とセットで通る。
    // ⚠ 年度ページ ID に規則なし（実引き）。
    ["R8", "001/059/985", "r8yosangaiyouhonpen.pdf", 4, 6, "歳出（目的別）", {}],
    ["R7", "001/054/671", "r7yosannogaiyou.pdf", 10, 11, "歳出", { expenditureCropX: { from: 0, to: 445 } }],
    ["R6", "001/049/183", "r6yosannogaiyou.pdf", 10, 11, "歳出", {}],
    ["R5", "001/041/624", "r5_yosannogaiyou_2.pdf", 9, 10, "歳出", { expenditureCropX: { from: 0, to: 445 } }],
  ] as const).map(([fy, pageId, file, rp, ep, expHeading, extra]) => ({
    id: `itabashi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 板橋区予算の概要（一般会計当初予算総括表）`,
    publisher: "板橋区",
    url: null,
    urls: [`https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/${pageId}/${file}`],
    landingPage: `https://www.city.itabashi.tokyo.jp/kusei/zaisei/yosan/${pageId.replace(/\//g, "").replace(/^0+/, "")}/index.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "板橋区（一般会計・団体コード131199）",
    // 「このサイトについて」（/kusei/kouhou/about/index.html・確認日 2026-07-23）。原文のまま。
    // 都カタログ t131199 は211件中 予算・財政 0件（実検索）＝CC BY は及ばない。
    license:
      "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: "歳入",
      expenditureHeading: expHeading,
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      unit: "millionYen" as const,
      ...extra,
    },
  })),

  ...([
    // 荒川区（2026-07-23 追加・#125）。[年度, 文書ID/ファイル名, ランディング, 歳入p, 歳出p]
    // 「予算説明書」の歳入歳出予算事項別明細書「１．総括」（歳入20〜21款・歳出11款・千円・
    // 前年当初比較つき）。**全 CID フォントが ToUnicode 欠落**だが化け方が決定論的（数字=−0x1D
    // シフト・漢字=固定ガーブル・R2〜R8 で同一マップ）で、専用パーサ arakawa-setsumei が復号する
    // （港=部首異体字/豊島=修復不可に次ぐ**第4の型**。詳細は §10u とパーサのコメント）。
    // ⚠ 復号の網: 未知の化け字は throw・比較列の等式ゲート（本年度−前年度=記載の比較）を全款で要求。
    // ⚠ R3 歳入に款番号なしの廃止款行（○ 自動車取得税交付金 0/1/△1・○は ۑ に化ける）。
    // ⚠ 説明書は R2 が現存最古（H31 以前は説明書ページ自体が無い）。URL の文書 ID・ランディング名は
    //    年度ごとに不規則（実引き）。
    ["R8", "43359/8yosansetumeisyo.pdf", "yosanangaiyo99.html", 13, 14],
    ["R7", "39324/yosansetsumeisyo.pdf", "7yosansyo/yoannsetu.html", 11, 12],
    ["R6", "35959/r6_yosan-setumeisyo.pdf", "6yosansyo.html", 11, 12],
    ["R5", "30279/r5_yosan-setumeisyo.pdf", "5yosansyo.html", 11, 12],
    ["R4", "26185/r4_yosan-setumeisyo.pdf", "4yosansyo.html", 11, 12],
    ["R3", "21692/r3_yosan-setumeisyo.pdf", "3yosannsyo.html", 9, 10],
    ["R2", "27655/r2_yosan-setumeisyo.pdf", "2yosansyo.html", 9, 10],
  ] as const).map(([fy, doc, landing, rp, ep]) => ({
    id: `arakawa-setsumei-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 荒川区予算説明書（歳入歳出予算事項別明細書 総括・款別歳入歳出）`,
    publisher: "荒川区",
    url: null,
    urls: [`https://www.city.arakawa.tokyo.jp/documents/${doc}`],
    landingPage: `https://www.city.arakawa.tokyo.jp/a002/zaisei/yosan/${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "荒川区（一般会計・団体コード131181）",
    // 「著作権について」（/a004/aboutwebsite/tyosakuken.html・確認日 2026-07-23）。原文のまま。
    // **「引用」まで禁じる型**（品川と2例）。都カタログ t131181 は33件中 予算・決算・財政 0件（実検索）。
    license:
      "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    parser: "arakawa-setsumei" as const,
    parserOptions: { revenuePage: rp, expenditurePage: ep },
  })),

  ...([
    // 練馬区（2026-07-23 追加・#125）。[年度, 単位]
    // 区オープンデータサイトの「一般会計歳入歳出予算款別一覧表」XLSX（歳入・歳出の2ファイル/年度・
    // H23〜R8 の16年・URL は {fy}sainyu/{fy}saishutu.xlsx で**完全に規則的**＝32本すべて実在を偵察で確認）。
    // 都カタログ t131202d0000000008 に同一実体が登載＝**データ自体が CC BY 4.0**（世田谷・千代田と同組）。
    // ⚠ **単位が年度で違う**: H23〜H29=円 / H30〜R8=千円。**発行元の注記はどちらも当てにならない**
    //   （都カタログ「円単位」・区ページ「千円単位」と一律表記で半分ずつ誤り。H29→H30 の年度間
    //   クロスチェックが factor=1000 で全款一致することから確定・2026-07-23 実測）。
    //   パーサが円年度を ÷1000 で正規化（端数が出たら throw — 実測で全値が1000の倍数）。
    // ⚠ シート名が揺れる（Sheet1 / "Sheet1 "（末尾スペース）/ R7 / R8）→ パーサは先頭シート固定。
    // ⚠ H24 歳出は組織改正年（新設3款=皆増・廃止2款=款番号なし行・A列空の継続行に（　）書きの
    //   修正後前年度額）— A列空行はパーサが読み飛ばす。R2〜R4 歳入の無番号廃止款行は kanNo=null で保持。
    ["R8", "thousandYen"], ["R7", "thousandYen"], ["R6", "thousandYen"], ["R5", "thousandYen"],
    ["R4", "thousandYen"], ["R3", "thousandYen"], ["R2", "thousandYen"], ["R1", "thousandYen"],
    ["H30", "thousandYen"],
    ["H29", "yen"], ["H28", "yen"], ["H27", "yen"], ["H26", "yen"],
    ["H25", "yen"], ["H24", "yen"], ["H23", "yen"],
  ] as const).map(([fy, unit]) => ({
    id: `nerima-kanbetsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 練馬区 一般会計歳入歳出予算款別一覧表（XLSX）`,
    publisher: "練馬区",
    url: null,
    urls: [
      `https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/tokei_kusei/kanbetu.files/${fy.toLowerCase()}sainyu.xlsx`,
      `https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/tokei_kusei/kanbetu.files/${fy.toLowerCase()}saishutu.xlsx`,
    ],
    landingPage: "https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/tokei_kusei/kanbetu.html",
    kind: "excel" as const,
    fiscalYear: fy,
    scope: "練馬区（一般会計・団体コード131202）",
    // 区オープンデータサイトの表示（kanbetu.html・確認日 2026-07-23）。原文のまま。XLSX は同サイト
    // 内の配布＝「サイト内のコンテンツにのみ適用」の内側で、都カタログのデータセット自体も
    // CC-BY-4.0 を宣言（§9g: 適用される条件だけを書く）。
    license:
      "本サイトで公開しているコンテンツは、クリエイティブ・コモンズ・ライセンス表示4.0国際の下に提供されています。（注釈）当ライセンスは、練馬区オープンデータサイト内のコンテンツにのみ適用されます。",
    parser: "nerima-kanbetsu-xlsx" as const,
    parserOptions: { unit },
  })),

  ...([
    // 東京都（2026-07-22 追加・#124）。[年度, 歳入URL, 歳出URL, ランディング]
    // **当初予算の PDF は3経路とも決定的パース不可**（説明書=スキャン+OCR の数字化け・
    // 概要(案)=金額フォントの ToUnicode 欠落・成立後概要=全文字ベクターアウトライン。2026-07-22 実測）。
    // **唯一の機械可読経路が「東京都予算概要CSVファイル集」**（Power BI ダッシュボード）の素の CSV。
    // URL は**ダッシュボードの公開埋め込み API（querydata）からデータセットの URL 列を直接取得**した
    // （UI の年度スライサーが指す全年度分。H30 はダッシュボード未掲載だが命名パターンから発見）。
    // ⚠ **URL の体系がサイト改修のたびに変わっている**（syukei1/…/31opendata → 2opendata →
    //    zaisei/dashboard/yosangaiyouNN → documents/d/zaimu/NN-…）。**外挿できない**。
    // ⚠ 2019〜2022（H31〜R4）の**歳出だけ合計行のラベルが空**（`,7461000000,…`）— パーサが対応済み。
    // 款体系: 歳入14款は全year不変（地方交付税なし=不交付団体・繰越金は名目1千円）。
    //   **歳出は款再編が2回**（R5: 生活文化スポーツ費→生活文化費+α で17款 / R6: 福祉保健費→
    //   福祉費+保健医療費で18款）＝年度をまたぐ款名結合はここで切れる。款番号列が無いので
    //   kanNo は全件 null（広島 §8 と同じ「捏造しない」）。
    ["R8", "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/08-03sainyukanbetsu",
      "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/08-04saishutsukanbetsu",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r8"],
    ["R7", "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/07-03sainyukanbetsu",
      "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/07-04saishutsukanbetsu",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r7"],
    ["R6", "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/06-03sainyukanbetsu",
      "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/06-04saishutsukanbetsu",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r6"],
    ["R5", "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou05/03sainyukanbetsu.csv",
      "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou05/04saishutsukanbetsu.csv",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r5"],
    ["R4", "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou04/03sainyukanbetsu.csv",
      "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou04/04saishutsukanbetsu.csv",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r4"],
    ["R3", "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/3opendata/03sainyukanbetsu.csv",
      "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/3opendata/04saishutsukanbetsu.csv",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r3"],
    ["R2", "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/2opendata/03sainyukanbetsu.csv",
      "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/2opendata/04saishutsukanbetsu.csv",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r2"],
    ["H31", "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/31opendata/03sainyukanbetsu.csv",
      "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/31opendata/04saishutsukanbetsu.csv",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/h31"],
    // H30 はダッシュボード未掲載（年度スライサーは 2019〜）だが、H31 と同じ命名の 30opendata が
    // 現存する（2026-07-22 実測・200）。ランディングは CSVファイル集を配るページ（/zaisei/yosan/h30 は 404）。
    ["H30", "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/30opendata/03sainyukanbetsu.csv",
      "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/30opendata/04saishutsukanbetsu.csv",
      "https://www.zaimu.metro.tokyo.lg.jp/zaisei/yosan/r8/8yosangaiyounituite/"],
  ] as const).map(([fy, revUrl, expUrl, landing]) => ({
    // 東京都（都道府県・団体コード 130001）。「予算概要」付表3・4 の款別CSV（cp932・千円・
    // 前年当初比較つき）。パーサ側で当年度列の見出しと fiscalYear を突合する（URL 改編で
    // 別年度を静かに掴む事故を止める）。Σ款=合計行は 10年×2側×2列の40系統すべて差0（収録時実測）。
    id: `tokyo-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 東京都予算概要 一般会計歳入・歳出予算款別内訳（CSV）`,
    publisher: "東京都財務局",
    url: null,
    urls: [revUrl, expUrl],
    landingPage: landing,
    kind: "csv" as const,
    fiscalYear: fy,
    scope: "東京都（一般会計・都道府県・団体コード130001）",
    // 財務局サイトポリシー /policy/「第１ 著作権について」（確認日 2026-07-22）。原文のまま。
    // 都オープンデータカタログの財務局（t000004）に H30〜R8 の款別CSVは非登載（実検索）＝
    // カタログの CC BY は及ばない（登載済みは H29 予算概要系と見える化ボードCSVのみ・§9g）。
    license:
      "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    parser: "tokyo-yosangaiyou-csv" as const,
    parserOptions: {},
  })),

  {
    // 東京都 H29（2026-07-22 追加・#124）。オープンデータカタログ「平成29年度予算概要①」
    // （t000004d1700000001・**CC BY 4.0**＝registry で数少ない真正 open）。上の CSVファイル集とは
    // **列形式が違う**（番号,区分,２９予算額(千円),構成比,２８予算額(千円),構成比,増減額,増減率＝
    // 款番号列があるので kanNo を持てる。合計行は番号列に「合計」が入る変則）。パーサが両形式対応。
    // ⚠ H28 以前は CSV が無い（29opendata は 404・カタログにも款別なし）＝**H29 が現存最古**。
    id: "tokyo-yosangaiyou-h29",
    title: "平成29年度 東京都予算概要 一般会計歳入・歳出予算款別内訳（CSV）",
    publisher: "東京都財務局",
    url: null,
    urls: [
      "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/29yosangaiyou5_3-1",
      "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/29yosangaiyou5_4-1",
    ],
    landingPage: "https://catalog.data.metro.tokyo.lg.jp/dataset/t000004d1700000001",
    kind: "csv" as const,
    fiscalYear: "H29",
    scope: "東京都（一般会計・都道府県・団体コード130001）",
    license: "クリエイティブ・コモンズ 表示（CC BY） https://creativecommons.org/licenses/by/4.0/deed.ja",
    parser: "tokyo-yosangaiyou-csv" as const,
    parserOptions: {},
  },

  ...([
    // [年度, 歳入ページ(物理), 歳出ページ(物理), 直リンクURL]
    // ⚠ ファイル名に規則が無い: R8 はタイムスタンプ名 / R7 `yosannsyo`（syo）/ R6・R5
    //    `yosannsho`（sho）とローマ字転写が揺れ、R4 以前は旧パス
    //    /004/kuse/shisaku/yosan/documents/0Ntoushoyosan.pdf。**外挿できない**。
    ["R8", 34, 35, "https://www.city.toshima.lg.jp/documents/12068/20260205141545.pdf"],
    ["R6", 39, 41, "https://www.city.toshima.lg.jp/documents/12068/r6_toshimaku_yosannsho.pdf"],
    ["R5", 39, 41, "https://www.city.toshima.lg.jp/documents/12068/r5_toshimaku_yosannsho.pdf"],
    // R4・R2 は **ToUnicode 欠落 → decodeGarble で復号**（#159・従来「修復不可」判定を覆した）。
    // 現行サイトから消滅 → Wayback（2023-02-02 の捕捉が完全・2025 捕捉は再圧縮で小さく別物）。
    // R4 は見開き型で歳入 p.42/歳出 p.44・R2 は歳入 p.41/歳出 p.43（いずれも左ページで完結・実測）
    ["R4", 42, 44, "https://web.archive.org/web/20230202015242id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/04toushoyosan.pdf"],
    // R3 は現行サイトから消滅 → Wayback（20211114090748 の捕捉が健全・3,234,716 bytes・パース可を実測）
    ["R3", 42, 44, "https://web.archive.org/web/20211114090748id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/03toushoyosan.pdf"],
    ["R2", 41, 43, "https://web.archive.org/web/20230202031059id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/02toushoyosan.pdf"],
    // H31〜H29 も ToUnicode 欠落 → decodeGarble（#159）。Wayback 2023-02-02 の捕捉
    // （H31 の 2025 捕捉は 1MiB ちょうどの打ち切り＝§9b なので使わない）。3年度とも歳入 p.41/歳出 p.43
    ["H31", 41, 43, "https://web.archive.org/web/20230202021859id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/31toushoyosan.pdf"],
    ["H30", 41, 43, "https://web.archive.org/web/20230202023230id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/30tousyoyosan.pdf"],
    ["H29", 41, 43, "https://web.archive.org/web/20230202031608id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/29yosansho.pdf"],
  ] as const).map(([fy, rev, exp, url]) => ({
    // 豊島区（団体コード 131164・人口 294,644＝R6 決算状況調から実引き）。
    // 「当初予算書」（議案書・全300〜570ページ）の「(1) 歳入歳出予算総括表」（一般会計）。
    // 印字ページとのズレが年度で違う: R8 ±0 / R6・R5 +3 / R3 +4。
    //
    // 表のレイアウトが年度で違うが parserOptions は同一で通る（4年度とも try-parse 実測）:
    //   - R8: 1ページに全列（款・本年度・前年度・比較・財源内訳）が収まる
    //   - R6・R5・R3: **見開き型**（款・本年度・前年度が左ページ、比較・財源内訳が右ページ）。
    //     左ページ単独で「款+本年度+前年度+合計」が完結するので revenuePages/spread は不要
    // ⚠ **見出しは弱い語（歳入/歳出）**。歳出側ページには節ラベル `歳 出` しか無いので
    //    強い見出しが選べない（中央区と同じ作法）。代償として**ページ誤指定が throw せず
    //    特別会計の総括表（R8 なら p.188 国保・p.232 後期高齢・p.264 介護）を静かに読む**。
    //    ページを動かしたら必ず総額（R8 = 168,986,053千円）を概要・あらまし等と突合すること。
    // 合計行 `歳 入 合 計`/`歳 出 合 計` は空白除去で既定ラベルに一致（totalLabel 指定不要）。
    //
    // 款体系: 歳入20款は R3〜R8 で款名まで不変。歳出は R6 以前13款 → **R7 に款再編**
    //   （文化商工費 → 文化スポーツ費＋産業観光費）で R8 は14款。**職員費の款は無い**
    //   （人件費配賦型）。民生費でなく福祉費＋子ども家庭費、土木費でなく都市整備費。消防費なし（制度由来）。
    // 前年度列の基準は「当初」— 年度間クロスチェックで確定:
    //   R6 前年度列 = R5 当年度列（歳入20款＋歳出13款の33リンク全一致・実測）。
    //   R8 前年度列 = R7 当初（R7 当初予算（案）概要 documents/50408/r7_tousyoyosanan_gaiyou.pdf と
    //   歳出14款すべて一致・歳入も直接13款＋合算2グループが厳密一致・実測）。
    //   R5 前年度列 135,791,696 = R4 当初（R5 プレス「対前年度比 3億5千9百万円 0.3％増」と整合）。
    //   R3 前年度列 128,293,228 = R2 当初（R3 プレス「対前年度比 19億3千4百万円 1.5％増」と整合）。
    // ⚠ 本資料は**議案（予算案）**。R8 は議決後の「財政状況のあらまし」（zaise/documents/2606111531.html）の
    //   当初予算 1,689億8,605万円と一致＝原案どおり成立を確認済み。年度を足すときは毎回突合すること。
    // ⚠ **R7 のみ収録不可**: 原本レイヤに OCR レイヤが重なり数字が壊れる（`(ー)`＝(1)・
    //   `干円`＝千円・`38,784,`+`326` の行割れ・実測再確認）。**置換が一貫しない＝非決定論的**
    //   なので #159 の復号でも救えない。R7 概要 PDF は歳入が款別でないため代替にならない。
    //   R4・R2・H31〜H29 の ToUnicode 欠落は #159 の decodeGarble で復号収録済み（§10d）。
    //   H28 は分冊総括表がテキスト層ゼロ（画像）＝ H29 が下限。
    id: `toshima-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 豊島区当初予算書（歳入歳出予算総括表）`,
    publisher: "豊島区",
    url: null,
    urls: [url],
    landingPage:
      fy === "R3"
        ? "https://web.archive.org/web/20210927192231/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/1601131047.html"
        : "https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/1601131047.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "豊島区（一般会計・団体コード131164）",
    // 「豊島区公式ホームページについて」＞著作権について（確認日 2026-07-16）。同ページは
    // 著作権法32条2項を【参考】として全文引用するが、その直前に一般的な禁止文がある
    // （§10 の訂正どおり「32条2項に対する禁止の指定が無い」≠「禁止表示が無い」）。
    // 区オープンデータページ（/020/kuse/electronic/open-data/1511041608.html）の CC BY 2.1 JP は
    // 「当ライセンスは、下記対象データのみに適用されますので、それ以外のデータについては、
    // 『豊島区公式ホームページについて』の取り扱いに準じてください」と自ら範囲を限り、
    // 対象データ一覧（13件）に予算・決算・財政は0件（実検索）→ 本資料には及ばない（§9g）。
    license:
      "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      // ⚠ 強い見出しに変えないこと（歳出側に弱い節ラベルしか無い。上記コメント参照）
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // R4・R2・H31〜H29 は ToUnicode 欠落 → 復号してからパース（#159・garble-decode.ts）。
      // dashAsZero: この様式は皆増を前年度セルの － で表す（H31 款8 環境性能割交付金で実測）
      ...(["R4", "R2", "H31", "H30", "H29"].includes(fy) ? { decodeGarble: true, dashAsZero: true } : {}),
      // R2 歳入に廃止款の無番号行（自動車取得税交付金・本年度－・前年度125,000）→ kanNoless で拾う
      // （拾わないと前年度Σが -125,000 割れる。dashAsZero とセットで [0, 125000] の2整数になる）
      ...(fy === "R2" ? { kanNoless: true } : {}),
    },
  })),

  ...([
    // [年度, ドキュメントID/ファイル名, 総括表の物理ページ, 列順が前年先行か]
    ["R8", "74956/r8_yosan_aramashi_link.pdf", 82, true],
    ["R7", "71328/r7_yosan_aramashi_link.pdf", 78, true],
    ["R6", "64031/1-r6aramashi.pdf", 79, true],
    ["R5", "60270/r5aramashi.pdf", 76, true],
    ["R4", "55535/r4yosanaramashi.pdf", 92, false],
    ["R3", "50963/03aramashi_1.pdf", 83, false],
    ["R2", "46120/02aramashi_1.pdf", 95, false],
  ] as const).map(([fy, path, page, prevFirst]) => ({
    // 足立区（団体コード 131211・人口 698,276＝R6 決算状況調から実引き。23区で人口4位）。
    // 「予算編成のあらまし」巻末の歳入歳出予算総括表（一般会計）。歳入21〜22款＋歳出10款が
    // **同一物理ページに縦積み**（samePage）・千円・前年当初比較つき。特別会計（国保・介護・
    // 後期高齢者）は次ページ以降で当該ページに混入しない。
    //
    // ⚠ **列順が年度の途中で反転する**（この資料の一番の罠）。あらまし R2〜R4 は標準の
    //   「当年度/前年度/比較」、**R5〜R8 は「前年度/当年度/比較」**（ヘッダ原文
    //   「７年度当初予算 ８年度当初予算 比較増減」を各年度で確認）。指定を誤っても
    //   **Σ照合は両側とも差0で素通りする**（合計行も同じ順で反転するため）ので、
    //   年度間クロスチェックだけが検出する。R2〜R8 の当初チェーンは款単位で全件一致を確認済み
    //   （R8前年=R7当年 … R3前年=R2当年。款名結合・不一致0）。**年度を足すときはヘッダ原文を
    //   必ず見て prevColumnFirst を決める**（外挿しない）。
    //
    // 款のクセ:
    //   - 歳出は R2〜R8 で一貫して10款（議会/総務/民生/産業経済/環境衛生/土木/教育/公債/
    //     諸支出金/予備）。**職員費の款は無い**（偵察ブリーフの「足立は職員費を持つ」は誤りだった）
    //   - 歳入の款数は年度で動く: R2=21款＋廃止行（ゴルフ場利用税交付金・皆減）→ R3〜R7=22款
    //     → R8=21款（特別区債が R6 で皆減 → R7 は 0/0 → R8 で款自体が消滅）
    //   - R6 歳入に皆減行 `22 特別区債 1,535,000 0.5 0 0.0 △1,535,000 皆減`。皆減行は
    //     列順反転の様式でも当年=0 が印字される（prevColumnFirst の鏡像ロジックで対応済み）
    //   - 款7 自動車取得税交付金は両年度 `1` の象徴計上（大阪 §8e と同型）
    //
    // ページ冒頭のタイトル「歳入歳出予算総括表」と列見出し「科 目（款）」が款名を汚すので
    // headerExtra で除外する（指定しないと款1 が `歳入歳出予算総括表科目（款）特別区税` に化ける）。
    // 合計行は「歳 入 合 計」「歳 出 合 計」だが samePage の分割は totalLabel の2出現で切るため
    // 両側とも `合計` を指定する（「歳入合計」を指定すると2つ見つからず throw する）。
    //
    // 公式の「各会計予算・説明書」は R6〜R8 のみネイティブテキストで、**歳入表だけ構成比が
    // 全角数字＋全角小数点**（`１６．４８`）のため前年度列が壊れる。R5 以前はスキャン
    // （R5/R4=OCR 崩れ・R3/R2=テキスト層ゼロ）で決定的パース不可。あらましは R2〜R8 の
    // 7年すべてネイティブテキストなので**あらましで統一**する。
    id: `adachi-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 足立区予算編成のあらまし（歳入歳出予算総括表）`,
    publisher: "足立区",
    url: null,
    urls: [`https://www.city.adachi.tokyo.jp/documents/${path}`],
    landingPage: `https://www.city.adachi.tokyo.jp/zaise/ku/kuse/zaise-y-${fy.toLowerCase()}tosyo.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "足立区（一般会計・団体コード131211）",
    // 「このサイトの考え方」（https://www.city.adachi.tokyo.jp/hodo/kangae/index.html・
    // 確認日 2026-07-16）。サイト全体のコンテンツ規定で予算 PDF に及ぶ。オープンデータ
    // カタログ（CC BY / Public Domain）を「予算」で実検索して 0件 — カタログのライセンスは
    // 予算資料に及ばない。「無断で転載」の明記 → permission-required（判定器の実物で確認済み）。
    license:
      "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: page,
      expenditurePage: page,
      samePage: true,
      revenueHeading: "歳入予算款別表",
      expenditureHeading: "歳出予算款別表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "総括表|科目",
      expenditureHeaderExtra: "科目",
      ...(prevFirst ? { prevColumnFirst: true } : {}),
    },
  })),

  ...([
    // [年度, documentsID, ファイル名, 歳入ページ, 歳出ページ, kanNoless]（物理ページ・印字は−16）
    ["R8", 66965, "r8toshoyosan.pdf", 45, 46, false],
    ["R7", 58935, "r7tosyo.pdf", 47, 48, false],
    ["R6", 49549, "r6tosyo.pdf", 47, 48, false],
    ["R5", 40224, "r5tosyo.pdf", 47, 48, true],
    ["R4", 31190, "r4tosyo.pdf", 55, 56, false],
    ["H31", 12531, "h31tosyo.pdf", 45, 46, false],
    ["H29", 262, "29tousho.pdf", 40, 41, false],
    ["H28", 260, "28tousho.pdf", 41, 42, false],
    ["H27", 259, "27tousho.pdf", 39, 40, true],
  ] as const).map(([fy, doc, file, rev, exp, noless]) => ({
    // 江戸川区（団体コード 131237・人口 693,570＝R6 決算状況調）。「予算書・予算説明書」
    // （第1号議案）巻頭の「Ⅰ 歳入歳出予算事項別明細書 １ 総括」。千円・前年当初比較つき・
    // 列順は標準（[本年度, 前年度, 比較]。H27→R8 の11リンクの総額チェーンが全部つながる）。
    //
    // **歳出18款で特別区最多**（ＳＤＧｓ推進費・新庁舎・施設整備費・文化共育費など独自款）。
    // R3 で15款→18款に再編（ＳＤＧｓ推進費・産業経済費が皆増）。**職員費の款は無い**＝配賦型。
    //
    // ⚠ **R5・H27 は kanNoless が要る**（この資料の一番の罠）。原典に**款番号なし・皆減の語なし・
    //   マーカーなしの廃止行**がある（R5 `特別区債 0 92,700 △92,700` / H27 `諸支出金 0 1 △1`）。
    //   無いと**前年度Σだけが静かに不足する**（validate は当年度Σしか見ないので通ってしまう）。
    // ⚠ **R3・R2・H30 は予算書が使えない**（ToUnicode 欠落・豊島 R4/R2 型で `-tsv` でも救えない）
    //   → 下の yoko（主要施策の概要）へ迂回する。**項以下を将来深掘りする場合、この3年度だけ
    //   原典が読めない**ことになる。
    // ⚠ ファイル名の転写規則が無い（toshoyosan / tosyo / tousho …）。年度ページ URL も
    //   R3・R2 だけ `nenndo`（n二重）・H29 は `h29_yosan.html` と破れる。**外挿しない**。
    id: `edogawa-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 江戸川区予算書・予算説明書（歳入歳出予算事項別明細書 総括）`,
    publisher: "江戸川区",
    url: null,
    urls: [`https://www.city.edogawa.tokyo.jp/documents/${doc}/${file}`],
    landingPage:
      fy === "H29"
        ? "https://www.city.edogawa.tokyo.jp/e002/kuseijoho/zaisei/toshoyosan/h29_yosan.html"
        : `https://www.city.edogawa.tokyo.jp/e002/kuseijoho/zaisei/toshoyosan/${fy.toLowerCase()}nendo.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "江戸川区（一般会計・団体コード131237）",
    // 「江戸川区ホームページの著作権・リンク」（/e004/aboutweb/riyo.html・確認日 2026-07-16）。
    // 「PDFなどのデータ」を明示的に含むサイト全体規定で本資料に及ぶ。区オープンデータ
    // （CC-BY 2.1 JP）は対象8データセット（統計・世論調査・広報誌・人口・刊行物・ごみ・
    // 環境衛生施設）に予算・決算・財政が0件（実検索）＝及ばない（§9g）。→ permission-required。
    license:
      "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "歳入歳出予算事項別明細書",
      // 歳出ページには単独の「歳 出」ラベルしか無い（弱い見出し）。強い語に変えないこと
      expenditureHeading: "歳出",
      ...(noless ? { kanNoless: true } : {}),
    },
  })),

  ...([
    // R3・R2・H30 は予算書が ToUnicode 欠落で読めないため「主要施策の概要」（yoko）巻頭の
    // 一般会計歳入歳出予算表へ迂回する。**款構成は予算書と同一**（R4 予算書の前年度列と
    // R3 yoko の当年度列が歳入20款・歳出18款とも全一致を実測）。
    // ⚠ 款番号が `01`〜`20` のゼロ埋めで lead 正規表現（[1-9]\d*）に乗らず、AMOUNT_RE が
    //   `01` を金額と誤認する → cropX{from:112} で区分（縦書き）と款番号の列ごと落とす。
    //   その結果 kanNo は null になる（原典は振っているが、読めないので kanNoless で拾う）。
    // ⚠ 同一 PDF の後続ページに特別会計の同型表（国保 p.6 等）が並ぶ＝ページ誤指定は
    //   静かに特会を読む（中央 §10b 罠2 と同型）。ページを動かしたら総額を突合すること。
    ["R3", 23048, "r3yoko.pdf", "r3nenndo"],
    ["R2", 17473, "r2yoko.pdf", "r2nenndo"],
    ["H30", 261, "h30yoko_1.pdf", "h30nendo"],
  ] as const).map(([fy, doc, file, landing]) => ({
    id: `edogawa-yoko-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 江戸川区主要施策の概要（一般会計歳入歳出予算）`,
    publisher: "江戸川区",
    url: null,
    urls: [`https://www.city.edogawa.tokyo.jp/documents/${doc}/${file}`],
    landingPage: `https://www.city.edogawa.tokyo.jp/e002/kuseijoho/zaisei/toshoyosan/${landing}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "江戸川区（一般会計・団体コード131237）",
    license:
      "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 5,
      samePage: true,
      revenueHeading: "歳入歳出予算",
      expenditureHeading: "歳入歳出予算",
      // 「歳入合計」を指定すると samePage の2出現分割が立たず throw する
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      revenueCropX: { from: 112, to: 842 },
      expenditureCropX: { from: 112, to: 842 },
    },
  })),

  ...([
    // [年度, documentsID/ファイル名, 歳入 from, 歳入 to, 歳出ページ, 年度ページID]（物理ページ）
    // ⚠ ファイル名の転写規則が無い（`r5yosannsyo` は n が二重・`r04-tousyo` だけハイフンと0埋め）。
    //   年度ページ ID も H13〜R6 は 7135〜7159 の連番だが **R7=12499・R8=22830 で破れる**。外挿禁止。
    // ⚠ 予算書の総括ページは**テキスト層に印字ページ番号が無い**（目次上は 38 相当で物理46＝+8）。
    ["R8", "22830/r8yosansho.pdf", 46, 47, 48, "22830"],
    ["R7", "12499/r7yosansho.pdf", 46, 47, 48, "12499"],
    ["R6", "7159/r6yosan0209.pdf", 44, 45, 46, "7159"],
    ["R5", "7158/r5yosannsyo.pdf", 42, 43, 44, "7158"],
    ["R4", "7157/r04-tousyo.pdf", 44, 45, 46, "7157"],
  ] as const).map(([fy, path, rFrom, rTo, ePage, pageId]) => ({
    // 杉並区（団体コード 131156・人口 570,494＝R6 決算状況調）。「予算書」（議案書・全320〜329p）の
    // 一般会計歳入歳出予算事項別明細書「１ 総括」。**歳入20款が2物理ページにまたがる**
    // （合計行は2枚目にしか無いので revenuePages で連結する）・歳出11款は1ページ。
    // 款番号は全角・千円・負号 △・列順は標準 [本年度, 前年度, 比較増(△)減]（足立型の反転なし）。
    //
    // **職員費の款を持つ区**（歳出款8・R8 は歳出の18.5%）。§10 の千代田・世田谷・葛飾と同じで、
    // **他自治体と款別を直接比較すると民生費等が過小に見える**（名古屋・札幌型）。
    //
    // 歳出総括の財源内訳ヘッダ（一般財源/国都支出金/特別区債/その他）は**直後の空行の reset に
    // 救われて**款名を汚さない（千葉 §8k と同じ「空行に救われているだけ」型なので、
    // 様式が変わると壊れる。HeaderExtra を足す前提でページを疑うこと）。
    // ⚠ 同一 PDF の後方（物理283以降）に特別会計の同型総括があり**見出しも同じ**なので、
    //   ページ誤指定は throw せず静かに特会を読む（§10b 罠2）。ページを動かしたら
    //   validate の歳入合計=歳出合計と総額突合を必ず通すこと。
    id: `suginami-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 杉並区予算書（歳入歳出予算事項別明細書 総括）`,
    publisher: "杉並区",
    url: null,
    urls: [`https://www.city.suginami.tokyo.jp/documents/${path}`],
    landingPage: `https://www.city.suginami.tokyo.jp/s004/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "杉並区（一般会計・団体コード131156）",
    // 「杉並区公式ホームページの利用について」（/about/17.html・確認日 2026-07-16）。
    // サイト全体規定で同ドメイン配信の予算 PDF に及ぶ。東京都オープンデータカタログ（t131156）に
    // 予算 CSV 4件（CC BY）が実在するが**億円丸めの別ファイル**で本 PDF は登載されていない
    // ＝CC BY は及ばない（§9g・大田 §10a と同型。CSV は精度不足で budget 階層の代替にもならない）。
    license:
      "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePages: { from: rFrom, to: rTo },
      expenditurePage: ePage,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  })),

  ...([
    // R3・R2 は**予算書がスキャン画像**（101ページで総テキスト約240字＝印字ページ番号のみ・
    // 決定的パース不可）なので、区政経営計画書の「1 一般会計予算総括表」へ迂回する。
    // 款体系は予算書経路と同一（歳入20款・歳出11款）。
    // ⚠ **款番号が無い様式**（→ kanNoless）。`kanNo` は null になるが原典も振っていない。
    // ⚠ **この様式は kanNoless × 象徴計上の1桁金額で壊れる**（R8 で実測: 自動車税環境性能割交付金の
    //   `1` を lead 正規表現が款番号と誤読し `款1 …300,000/299,999` に化ける。Σ が
    //   当年度+299,999・前年度−1 でずれて捕まるので静かには通らない）。**R3・R2 には
    //   そのような行が無いことを実測済み**。年度を足すときは必ず try-parse で当てること。
    // 中央寄せ3行の折返し（株式等譲渡所得割交付金・自動車税環境性能割交付金・
    // 交通安全対策特別交付金）は kanNoless の awaitTail（2026-07-16 修正）が正しく結合する。
    // R2 歳入は21款（廃止の自動車取得税交付金が名目 0/210,000 で残る＝欠落しない）。
    ["R3", "7156/4ippannkaikei.pdf", 6, 4, "7156"],
    ["R2", "7155/r2kuseikeieikeikakusho.pdf", 146, 144, "7155"],
  ] as const).map(([fy, path, rPage, ePage, pageId]) => ({
    id: `suginami-keikakusho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 杉並区区政経営計画書（一般会計予算総括表）`,
    publisher: "杉並区",
    url: null,
    urls: [`https://www.city.suginami.tokyo.jp/documents/${path}`],
    landingPage: `https://www.city.suginami.tokyo.jp/s004/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "杉並区（一般会計・団体コード131156）",
    license:
      "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rPage,
      expenditurePage: ePage,
      kanNoless: true,
      // 弱い見出し（ページ誤指定が throw しない — 同一 PDF に特会の同型表あり）
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // [年度, 物理ページ, revenueCropX.to（＝expenditureCropX.from）, ドキュメントID/ファイル名, 年度ページID]
    //
    // 文京区（団体コード 131059・人口 235,345＝R6 決算状況調から実引き）。「当初予算総括表」
    // （9〜10ページの款別専用 PDF。「当初予算の概要」とは別ファイル）の「当初予算対前年度比較」。
    // **H16〜R8 の23年度が現行サイトに現存し、22年度を収録した**（H25 のみ収録不可＝下記）。
    // **年度の深さは全自治体トップ**（江戸川 H27〜R8 の12年を超える）。**物理 = 印字（ズレ0）**。
    //
    // ⚠ **左右2側が同一ページ（横並び）＝ §9j の第2例**（1例目は静岡）。歳入が左・歳出が右で、
    //    `revenuePage` と `expenditurePage` に**同じページ**を入れて CropX で切る。
    //    対応しないと `-layout` が2表を1行に融合し、**歳出が1件も取れず throw** する。
    //
    // ⚠ **CropX の値は4つの座標空間・5グループに割れる**（実測。`pdftotext -tsv` のページ幅）:
    //      R8〜R4・R2 = 915.13 → cut 460/461     R3        = 925.19 → cut 456
    //      H31〜H24   = 841.68 → cut 417/418     H23       = 841.68 だが cut 451
    //      H22〜H16   = 595 + **Page rot: 90**（描画幅 842）→ cut 416〜444（年度ごとに違う）
    //    **向きではなく座標系の差**なので「A4 横だから同じ」は成り立たない（偵察の申し送り
    //    「H31 は A4 横で境界が違う」は理由が誤り。H31 は R8 と同じ横向き）。ガターは 19〜45pt。
    //    **cut は年度ごとの実測値なので外挿しないこと** — H23 は隣接の H24 と 34pt 違う。
    //    `to: 1000` は全グループで用紙幅を超える安全値（全年度で実測）。
    //
    // ⚠ **見出しは弱い語（`歳入`/`歳出`）**でなければならない（中央・§10b-1 と同じ作法）。
    //    ページ内のタイトル行 `１　歳　入` を行ごと skip させるのが目的。
    // ⚠ その代償で**同一 PDF の特別会計を静かに読む**（§10b-2）。R8 p.9 を誤指定すると
    //    **8款/6款・Σ差0・しかも歳入合計 = 歳出合計 = 20,758,000 で validate も素通りする**（実測）。
    //    → ページを動かしたら必ず**会計別総括表（物理 p.3）の一般会計額**と突合すること
    //      （R8 = 160,482,000千円）。p.9 は国保＋介護が縦積み・p.10 は後期高齢者医療。
    // ⚠ **総括表 PDF には「文京区」の文字列が1つも無い**（全23年度で grep 0件）。取り違えの検出は
    //    p.1 の年度表題（`令和８年度当初予算総括表`）で行う。
    //
    // 款体系: **歳出12款は H16〜R8 の23年間まったく不変**
    //   議会 / 総務 / 区民 / 産業経済 / 民生 / 衛生 / 都市整備 / 土木 / 資源環境 / 教育 / 諸支出金 / 予備
    //   → **職員費の款は無い**（千代田・世田谷・葛飾・杉並型ではない）＝人件費が各款に配賦済みで
    //     他自治体と款別を直接比較できる。消防費・地方交付税が無いのは制度由来（§10）。
    //   歳入は 19〜21款で動く（特別区債の皆減・環境性能割交付金の新設等）。
    //
    // ⚠ **前年度列は歳出だけ「組み替え後」** — 文京区は前年度列を当年度の款体系へ restate する。
    //   実測で**21リンク中8リンクの歳出が款レベルで動く**（例: R2 の前年度 民生費 45,443,775 に対し
    //   H31 の当年度 45,431,183 ＝ 衛生費との間で ±12,592）。**Σ差は必ず 0**（款間の付替え）。
    //   歳入は21リンクすべて款単位で完全一致。→ derive の年度間クロスチェーン（§9l）は
    //   総額しか見ないので素通りする（restated を想定済みの設計）。
    ["R8", 8, 460, "12708/r08_tosyoyosan_sokatsuhyo.pdf", "p007692"],
    ["R7", 8, 461, "10873/r07_tosyoyosansoukatsuhyo.pdf", "p007690"],
    ["R6", 8, 461, "8579/202437164616.pdf", "p007676"],
    ["R5", 7, 461, "5568/20233614280_1.pdf", "p005773"],
    ["R4", 7, 461, "5569/2022324164654.pdf", "p005774"],
    ["R3", 7, 456, "5570/2021soukatuhyo.pdf", "p005775"],
    ["R2", 7, 461, "5571/2020soukatsuhyou.pdf", "p005776"],
    ["H31", 7, 418, "5572/310208_gian_31tousyo_shiryo1_soukatsuhyou.pdf", "p005777"],
    ["H30", 7, 417, "49/300208_gian_tousyo_shiryo1_soukatsuhyou.pdf", "p005778"],
    ["H29", 7, 417, "5573/29soukatsuhyou.pdf", "p005779"],
    ["H28", 7, 417, "5574/28soukatsuhyou.pdf", "p005780"],
    // ⚠ H27 のファイル名は `26soukatsuhyo.pdf`（**26 は発行元の誤記**）。中身は p.1「平成２７年度
    //   当初予算総括表」・ヘッダ「２７年度 ２６年度」で**確かに H27**（実ファイルで確認済み）。
    //   H26 は別ファイル（`26soukatsuhyo_1.pdf`）。
    ["H27", 7, 417, "5575/26soukatsuhyo.pdf", "p005781"],
    ["H26", 7, 417, "5576/26soukatsuhyo_1.pdf", "p005782"],
    // H25 は**欠番**（収録不可）。現行サイトの H25 はスキャン＋OCR で、`歳入合計` 行が
    // 見つからず parse が **throw する**（静かには壊れない）。Wayback の捕捉も0件で別版は無い。
    ["H24", 7, 417, "5578/24yosansoukatsuhyou.pdf", "p005784"],
    ["H23", 7, 451, "5579/23soukatuhyo.pdf", "p005785"],
    ["H22", 7, 439, "5580/22soukatsu.pdf", "p005786"],
    ["H21", 7, 444, "5581/21sokatuhyo.pdf", "p005787"],
    ["H20", 7, 438, "5582/20soukatupdf.pdf", "p005788"],
    ["H19", 7, 438, "5583/19soukatu.pdf", "p005789"],
    ["H18", 7, 438, "5584/soukatu.pdf", "p005790"],
    ["H17", 7, 427, "5585/soukatu.pdf", "p005791"],
    ["H16", 7, 416, "5586/soukatu.pdf", "p005792"],
  ] as const).map(([fy, page, cut, path, pageId]) => ({
    id: `bunkyo-sokatsuhyo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 文京区当初予算総括表`,
    publisher: "文京区",
    url: null,
    urls: [`https://www.city.bunkyo.lg.jp/documents/${path}`],
    // ⚠ **年度ページの URL に規則が無い**（`b002/pNNNNNN.html` が不連続）。年度を足すときは
    //    全年度インデックス /kuseijouhou/zaisei/yosan/toushoyosan/index.html から辿ること。
    landingPage: `https://www.city.bunkyo.lg.jp/b002/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "文京区（一般会計・団体コード131059）",
    // 「このサイトについて」＞文京区ホームページの著作権について（/b003/p006007/index.html・
    // 確認日 2026-07-17）。**コンテンツに「PDF」を明示列挙**しているので本資料に直接適用される。
    // ⚠ **CC BY を license 欄に書かないこと**（§9g）。文京区は**東京都カタログに「予算総括表」を
    //   CC BY 4.0 で公開している数少ない区**（政令市20市・多くの区で成り立った「ポータルに予算は
    //   無い」が成り立たない）だが、それは**オープンデータサイト掲載の CSV/Excel の ZIP** であって
    //   **本 PDF は登載されていない**（ポータル /b004/p006286.html 内を実検索して0件）。かつ
    //   文京区オープンデータ利用規約が「本規約は、文京区公式ホームページ掲載の全ての情報に
    //   該当するものではありません」と**自ら適用範囲を限っている**。→ 本 PDF には下記が及ぶ。
    //   なお CC BY の CSV は **R8 単年のみ**（Wayback 捕捉0＝過年度は回収不可）で、値は R8 の
    //   PDF と21款/12款・款名まで全件一致することを突合実測済み（＝R8 の独立検証に使えた）。
    license:
      "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: page,
      expenditurePage: page,
      // 左右2側が同一ページ（§9j）。cut は年度ごとの実測値 — **外挿しないこと**
      revenueCropX: { from: 0, to: cut },
      expenditureCropX: { from: cut, to: 1000 },
      // ⚠ 強い見出しに変えないこと（上記）
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  })),

  ...([
    // [年度, ファイル名, 歳入ページ, 歳出ページ]（物理ページ）
    // ⚠ **ファイル名の規則が破れるので外挿しない**。R8 だけ `R08_2026gaiyo`（0埋め・アンダースコア・
    //   `gaiyou` でなく `gaiyo`）、R5 だけ小文字 `r5-`、R7 は `syuusei2`（公表 PDF の正誤修正版。
    //   本文に予算修正の記載は無く、R8 前年度列・R6 当年度列と**両方向で款単位一致**＝健全）。
    // 印字ページとのズレも年度で違う（R8 は +3・R7〜R2 は +2）。**年度を足すときは必ず実測する**。
    ["R8", "R08_2026gaiyo.pdf", 7, 21],
    ["R7", "R7-2025gaiyousyuusei2.pdf", 6, 19],
    ["R6", "R6-2024gaiyou.pdf", 15, 29],
    ["R5", "r5-2023gaiyou.pdf", 17, 32],
    ["R4", "R4-2022gaiyou.pdf", 7, 29],
    ["R3", "R3-2021gaiyou.pdf", 8, 24],
    ["R2", "R2-2020gaiyou.pdf", 6, 20],
  ] as const).map(([fy, file, rev, exp]) => ({
    // 中野区（団体コード 131148・人口 341,322＝R6 決算状況調）。「当初予算の概要」の
    // ■歳入予算（款別）・■歳出予算（目的別）。千円・前年当初比較つき・列順は標準
    // （足立 §10c の反転は無い。ヘッダ原文「８年度 ７年度 比較」を R2〜R8 の全年度で確認）。
    // 同一ランディングページに **H15〜R8 の24年分が現存**する（H15 は見出しが
    // `歳入予算（目的別）`（原文ママ・歳入なのに「目的別」）で款体系も旧。H16〜H30 は未実測）。
    //
    // ⚠ **表の直前に散文の説明段落がある**（この資料の肝）。金額を含まない行が款名の断片として
    //   溜まり、**款1 が `近くを占め、区の基幹収入となっています。…特別区税` に汚染される**（R2 で実測）。
    //   **Σ は差0 のまま validate も素通りする**＝§9 の「静かに壊れる」型。`HeaderExtra: "[、。]"` で
    //   句読点を含む行を落として防ぐ（款名・その折返しに句読点は出ないので安全。R8〜R3 では no-op）。
    //
    // 款のクセ:
    //   - 歳出13款（R1〜R8 で款名まで不変）。**職員費の款は無い**＝人件費配賦型（§10 の
    //     「杉並・千代田型」ではない）。消防費・地方交付税が無いのは特別区の制度由来（§10）
    //   - 歳入は R3〜R8 が20款・R2 は＋廃止行（自動車取得税交付金・皆減。既存分岐が処理）
    id: `nakano-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 中野区当初予算の概要（歳入予算（款別）・歳出予算（目的別））`,
    publisher: "中野区",
    url: null,
    urls: [`https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/${file}`],
    landingPage: "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "中野区（一般会計・団体コード131148）",
    // サイトポリシー（https://www.city.tokyo-nakano.lg.jp/about/policy.html・確認日 2026-07-16）。
    // 「ホームページ上の文書や画像等のファイル」を対象と明記し同ドメイン配信の本 PDF に及ぶ。
    // 東京都オープンデータカタログの中野区（t131148・167データセット）を実検索して予算・歳出・
    // 決算は0件 ＝ カタログの CC BY は本資料に及ばない。「無断で二次利用することを禁じます」
    // → permission-required。
    license:
      "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "■歳入予算（款別）",
      expenditureHeading: "■歳出予算（目的別）",
      revenueHeaderExtra: "[、。]",
      expenditureHeaderExtra: "[、。]",
    },
  })),

  {
    // 岡山市（団体コード 331007・人口70万）。**予算書本体が使えず概要に逃げる**（広島 §8g・堺 §8m・
    // 相模原 §8p 型）。ただし**逃げる理由が3市と違う** — テキスト層は健全で、
    // **事項別明細書の「総括」が歳出にしか無い**（歳入は総括ゼロ）。
    //   歳入は大阪型（款項目混在）が**偶数ページのみ**に載り（奇数ページは節/説明）、範囲指定が
    //   原理的に使えない（奇数ページの `1 現年課税分 …` を款1 として拾う）。さらに款の継続ページで
    //   **項番号が列0に来る**（`23 都市計画税` は款1 市税の項23）ので kanIndentMax でも切れない。
    // → **概要 p.55「一般会計歳入・歳出」に逃げる**。**予算書本体は R7 までしか無く**、
    //   概要は R2〜R8 の7年すべてにあるので**概要が唯一の経路**でもある。
    //
    // 罠:
    //   - ⚠ **款番号が1つも無い**（→ kanNoless）。§9h。
    //   - ⚠ **縦書きの表側ラベルが款名の頭に1文字だけ紛れ込む**（`歳 ゴルフ場利用税交付金`・
    //     `入 使用料及び手数料`・`出 教育費`）。毎年同じ4行で必発。**金額もΣも通るので目視しないと
    //     気づけない**（→ kanNamePrefixStrip）。§9h。
    //   - **R8 だけ「使用料及び手数料」の款名と金額が別行に割れる**（版面の都合。R7〜R2 では1行）。
    //     断片機構（pendName）で拾える。**来年再発しうる**。
    //   - **皆増・皆減は R2 のみ**で、どちらも当年度/前年度セルが `−`（空欄型）＝§9c の prevIdx で通る。
    //     **R2 だけ歳入25款・R3〜R8 は24款**（自動車取得税交付金が R2 で廃止）。
    //   - **廃止款の記号が資料間で食い違う**: R8 の環境性能割交付金は概要では `0 457,000 △457,000 △100.0`
    //     と**0 が印字され記号も皆減も無い**ので通常行。予算書では `11 （環境性能割交付金）` と括弧書き。
    //   - **款名が略称**（概要 `国有提供施設交付金` ← 予算書 `国有提供施設等所在市町村助成交付金`）。
    //     原典どおりに持つ（他市と款名が揃わない）。折返しは1件も無い。
    // ⚠ **ページ位置が毎年動く**（55/53/47/48/48/44/36）。印字とのズレも年度で違う。**外挿しない**。
    // ⚠ **ファイル名も年度ページの記事IDも規則性ゼロ**。カテゴリページ
    //    /shisei/category/4-13-12-0-0-0-0-0-0-0.html から辿る。
    // ライセンス経緯（§9g に従い license 欄には書かない）: 岡山市はオープンデータで CC BY 4.0 を採るが
    // **適用対象はカタログ掲載データのみ**で、市が公表する「岡山市オープンデータ一覧」（492項目）に
    // 予算・決算・財政の項目は0件＝本 PDF はカタログに無い（大阪・福岡・熊本と同じ罠）。
    // 資料 PDF 自身の制限表記も0件。効くのはサイト全体の著作権ページだけ。
    id: "okayama-yosangaiyou-r8",
    title: "令和8年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000075/75851/R8tousyogaiyou.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000075851.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 55,
      expenditurePage: 55,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    id: "okayama-yosangaiyou-r7",
    title: "令和7年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000065/65008/01yosangaiyou.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000065008.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 53,
      expenditurePage: 53,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    id: "okayama-yosangaiyou-r6",
    title: "令和6年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000053/53555/gaiyou.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000053555.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 47,
      expenditurePage: 47,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    id: "okayama-yosangaiyou-r5",
    title: "令和5年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000042/42016/R5tousyoyosan.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000042016.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 48,
      expenditurePage: 48,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    id: "okayama-yosangaiyou-r4",
    title: "令和4年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000032/32749/R4tousho.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000032749.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 48,
      expenditurePage: 48,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    id: "okayama-yosangaiyou-r3",
    title: "令和3年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000025/25283/R3gaiyou.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000025283.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 44,
      expenditurePage: 44,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    id: "okayama-yosangaiyou-r2",
    title: "令和2年度 岡山市当初予算（案）の概要（一般会計歳入・歳出 款別・前年度当初比較）",
    publisher: "岡山市",
    url: null,
    urls: ["https://www.city.okayama.jp/shisei/cmsfiles/contents/0000020/20277/000400556.pdf"],
    landingPage: "https://www.city.okayama.jp/shisei/0000020277.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "岡山市（一般会計・団体コード331007）",
    license:
      "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 36,
      expenditurePage: 36,
      samePage: true,
      revenueHeading: "一般会計歳入・歳出",
      expenditureHeading: "一般会計歳入・歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      kanNamePrefixStrip: "歳入出",
    },
  },
  {
    // 静岡市（団体コード 221007・人口67万）。予算事項別明細書（一般会計・280p・4.6MB）。
    // **左右2側が同一ページ（横並び）**＝第6の型。総括 物理 p.5 に歳入（左）と歳出（右）が並ぶ。
    // `-layout` は2表を1行に融合するので、**歳入だけ偶然正しく出て歳出が1件も取れない**
    // （＝throw する。静かには壊れない）。→ revenueCropX / expenditureCropX でページを横に切る。
    // **切り出しは pdftotext 自身の -x/-W に任せる**（座標を自前で組み直さない）。
    // A4 横（842pt）で歳入の右端が約400pt・歳出の左端が約425pt＝**ガター24〜26pt**。閾値 412 が安全。
    // **印字 = 物理（オフセット0）**。歳入24款 / 歳出14款（**総務省の目的別と一致**・8例目）。
    //
    // ⚠ **浜松市は 221309**。静岡市が 221007 で、**かつて浜松を 221007 で登録して1人あたりを
    //    16.5%狂わせた**（§9h）。derive にコードと名前の突合ゲートを入れてある。
    //
    // 罠:
    //   - 歳出の財源内訳ヘッダ（`一般財源` / `国庫支出金 県支出金 市債 その他`）が款名を汚す
    //     （神戸 §8h・浜松 §8o と同型）→ **歳出側だけ**に語彙を足す。
    //     `国庫支出金`・`県支出金`・`市債` は**歳入の款17/18/24 の実名**なので共通語彙に足すと歳入が消える。
    //   - 中央寄せ3行折返しが歳出に2件（款6 農林水産業費・款11 災害復旧費）＝既存の awaitTail で復元。
    //   - **皆増・皆減は無い**（0 が明示的に印字される）。象徴計上・廃止款・三点リーダも無し。
    //   - 款12「国有提供施設等所在市町村助成交付金」は**静岡には存在しない**（折返しの心配が無い）。
    // ⚠ **R5 は別型**（縦向き・歳入 p.8 / 歳出 p.9 の従来型）だが、**△ が text layer から丸ごと欠落する**
    //    （版面には印字されているのに pdftotext が返さない）。本年度・前年度は正なので我々の用途では
    //    無害だが、**比較列を使うと全減少が符号反転して「もっともらしく」通る**。
    //    さらに款11 が「上段折返し＋款番号単独行」のハイブリッド。**未収録**。
    // ⚠ **R4 はスキャン**（Type3・uni=no・150dpi JPEG）。OCR されていないので空で落ちる（安全側）。R3 以前は非掲載。
    // ⚠ **URL に規則性なし**（ディレクトリ番号もファイル名も毎年別）。年度ページも s012583/s012576/s012571 と不規則。
    id: "shizuoka-yosansho-r8",
    title: "令和8年度 静岡市予算事項別明細書（一般会計・総括・款別歳入歳出）",
    publisher: "静岡市",
    url: null,
    urls: ["https://www.city.shizuoka.lg.jp/documents/56762/06_r8jikoubetumeisaisyo_ippankaikei.pdf"],
    landingPage: "https://www.city.shizuoka.lg.jp/s3627/s012583.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "静岡市（一般会計・団体コード221007）",
    license:
      "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 5,
      revenueCropX: { from: 0, to: 412 },
      expenditureCropX: { from: 412, to: 842 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国庫支出金|県支出金|市債|その他",
    },
  },
  {
    id: "shizuoka-yosansho-r7",
    title: "令和7年度 静岡市予算事項別明細書（一般会計・総括・款別歳入歳出）",
    publisher: "静岡市",
    url: null,
    urls: ["https://www.city.shizuoka.lg.jp/documents/53981/01jikoubetumeisaisyoippannkaikei.pdf"],
    landingPage: "https://www.city.shizuoka.lg.jp/s3627/s012576.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "静岡市（一般会計・団体コード221007）",
    license:
      "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 5,
      revenueCropX: { from: 0, to: 412 },
      expenditureCropX: { from: 412, to: 842 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国庫支出金|県支出金|市債|その他",
    },
  },
  {
    id: "shizuoka-yosansho-r6",
    title: "令和6年度 静岡市予算事項別明細書（一般会計・総括・款別歳入歳出）",
    publisher: "静岡市",
    url: null,
    urls: ["https://www.city.shizuoka.lg.jp/documents/10691/r6ippannkaikeiyosannsetsumeisyo.pdf"],
    landingPage: "https://www.city.shizuoka.lg.jp/s3627/s012571.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "静岡市（一般会計・団体コード221007）",
    license:
      "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 5,
      revenueCropX: { from: 0, to: 412 },
      expenditureCropX: { from: 412, to: 842 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      expenditureHeaderExtra: "一般財源|特定財源|財源内訳|国庫支出金|県支出金|市債|その他",
    },
  },
  // ---- 政令市の過年度（2026-07-15）。ページ位置は年度で動くので必ず物理ページを実確認する。
  //      年度 URL の規則も破れる（福岡 R3/R2 の命名・川崎の分冊番号）。docs §8b 参照 ----
  {
    // 横浜市 R7。歳入 p.3-4 / 歳出 p.5-6（**年度で位置が動く**: R6-R8=3-4/5-6・R4-R5=7-8/9-10・R3=6-7/8-9）。
    // 年度ページ名も揺れる（R8 だけ r8yosan.html・R7 以降は r7.html）。歳出款は R5 以前が18款・R6 以降が20款
    // （局再編で 文化観光費→にぎわいスポーツ文化費・環境創造費→みどり環境費+河川費・医療費 新設）＝**経年で款が繋がらない**。
    id: "yokohama-yosansho-r7",
    title: "令和7年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    publisher: "横浜市",
    url: null,
    urls: ["https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7ippan.pdf"],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "横浜市（一般会計・団体コード141003）",
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 4 },
      expenditurePages: { from: 5, to: 6 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // ⚠ **財源内訳のヘッダ（`一般財源` / `国県支出金 市債 その他`）が款名を汚す**（R3 で実害・2026-07-16 修正）。
      //    歳出の**各ページ先頭の款**に連結し、R3 は款1 が `一般財源国県支出金市債その他議会費`・
      //    款12 が `…道路費` になっていた（p.8-9 の2ページ連結なので先頭が2つある）。
      //    **金額は正しく Σ も差0 なので validate は「ok」を返す**＝§2-4 の「Σ が守らない領域」で、
      //    gen まで到達して画面に出ていた。R4〜R8 は「千円」行と款1 の間に**空行があって断片が
      //    リセットされる**ため無事だっただけ＝版面が1行変われば同じ事が起きるので**全年度に効かせる**
      //    （R4〜R8 は再 parse して出力不変を実測）。`国県支出金` は歳出側にしか無い語
      //    （歳入の実在款名は `国庫支出金`・`県支出金` で別物）なので、側で分ければ安全。
      expenditureHeaderExtra: "^一般財源$|^国県支出金",
    },
  },
  {
    // 横浜市 R6。歳入 p.3-4 / 歳出 p.5-6（**年度で位置が動く**: R6-R8=3-4/5-6・R4-R5=7-8/9-10・R3=6-7/8-9）。
    // 年度ページ名も揺れる（R8 だけ r8yosan.html・R7 以降は r6.html）。歳出款は R5 以前が18款・R6 以降が20款
    // （局再編で 文化観光費→にぎわいスポーツ文化費・環境創造費→みどり環境費+河川費・医療費 新設）＝**経年で款が繋がらない**。
    id: "yokohama-yosansho-r6",
    title: "令和6年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    publisher: "横浜市",
    url: null,
    urls: ["https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6ippan.pdf"],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "横浜市（一般会計・団体コード141003）",
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 4 },
      expenditurePages: { from: 5, to: 6 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // ⚠ **財源内訳のヘッダ（`一般財源` / `国県支出金 市債 その他`）が款名を汚す**（R3 で実害・2026-07-16 修正）。
      //    歳出の**各ページ先頭の款**に連結し、R3 は款1 が `一般財源国県支出金市債その他議会費`・
      //    款12 が `…道路費` になっていた（p.8-9 の2ページ連結なので先頭が2つある）。
      //    **金額は正しく Σ も差0 なので validate は「ok」を返す**＝§2-4 の「Σ が守らない領域」で、
      //    gen まで到達して画面に出ていた。R4〜R8 は「千円」行と款1 の間に**空行があって断片が
      //    リセットされる**ため無事だっただけ＝版面が1行変われば同じ事が起きるので**全年度に効かせる**
      //    （R4〜R8 は再 parse して出力不変を実測）。`国県支出金` は歳出側にしか無い語
      //    （歳入の実在款名は `国庫支出金`・`県支出金` で別物）なので、側で分ければ安全。
      expenditureHeaderExtra: "^一般財源$|^国県支出金",
    },
  },
  {
    // 横浜市 R5。歳入 p.7-8 / 歳出 p.9-10（**年度で位置が動く**: R6-R8=3-4/5-6・R4-R5=7-8/9-10・R3=6-7/8-9）。
    // 年度ページ名も揺れる（R8 だけ r8yosan.html・R7 以降は r5.html）。歳出款は R5 以前が18款・R6 以降が20款
    // （局再編で 文化観光費→にぎわいスポーツ文化費・環境創造費→みどり環境費+河川費・医療費 新設）＝**経年で款が繋がらない**。
    id: "yokohama-yosansho-r5",
    title: "令和5年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    publisher: "横浜市",
    url: null,
    urls: ["https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.pdf"],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "横浜市（一般会計・団体コード141003）",
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 },
      expenditurePages: { from: 9, to: 10 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // ⚠ **財源内訳のヘッダ（`一般財源` / `国県支出金 市債 その他`）が款名を汚す**（R3 で実害・2026-07-16 修正）。
      //    歳出の**各ページ先頭の款**に連結し、R3 は款1 が `一般財源国県支出金市債その他議会費`・
      //    款12 が `…道路費` になっていた（p.8-9 の2ページ連結なので先頭が2つある）。
      //    **金額は正しく Σ も差0 なので validate は「ok」を返す**＝§2-4 の「Σ が守らない領域」で、
      //    gen まで到達して画面に出ていた。R4〜R8 は「千円」行と款1 の間に**空行があって断片が
      //    リセットされる**ため無事だっただけ＝版面が1行変われば同じ事が起きるので**全年度に効かせる**
      //    （R4〜R8 は再 parse して出力不変を実測）。`国県支出金` は歳出側にしか無い語
      //    （歳入の実在款名は `国庫支出金`・`県支出金` で別物）なので、側で分ければ安全。
      expenditureHeaderExtra: "^一般財源$|^国県支出金",
    },
  },
  {
    // 横浜市 R4。歳入 p.7-8 / 歳出 p.9-10（**年度で位置が動く**: R6-R8=3-4/5-6・R4-R5=7-8/9-10・R3=6-7/8-9）。
    // 年度ページ名も揺れる（R8 だけ r8yosan.html・R7 以降は r4.html）。歳出款は R5 以前が18款・R6 以降が20款
    // （局再編で 文化観光費→にぎわいスポーツ文化費・環境創造費→みどり環境費+河川費・医療費 新設）＝**経年で款が繋がらない**。
    id: "yokohama-yosansho-r4",
    title: "令和4年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    publisher: "横浜市",
    url: null,
    urls: ["https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.pdf"],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "横浜市（一般会計・団体コード141003）",
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 7, to: 8 },
      expenditurePages: { from: 9, to: 10 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // ⚠ **財源内訳のヘッダ（`一般財源` / `国県支出金 市債 その他`）が款名を汚す**（R3 で実害・2026-07-16 修正）。
      //    歳出の**各ページ先頭の款**に連結し、R3 は款1 が `一般財源国県支出金市債その他議会費`・
      //    款12 が `…道路費` になっていた（p.8-9 の2ページ連結なので先頭が2つある）。
      //    **金額は正しく Σ も差0 なので validate は「ok」を返す**＝§2-4 の「Σ が守らない領域」で、
      //    gen まで到達して画面に出ていた。R4〜R8 は「千円」行と款1 の間に**空行があって断片が
      //    リセットされる**ため無事だっただけ＝版面が1行変われば同じ事が起きるので**全年度に効かせる**
      //    （R4〜R8 は再 parse して出力不変を実測）。`国県支出金` は歳出側にしか無い語
      //    （歳入の実在款名は `国庫支出金`・`県支出金` で別物）なので、側で分ければ安全。
      expenditureHeaderExtra: "^一般財源$|^国県支出金",
    },
  },
  {
    // 横浜市 R3。歳入 p.6-7 / 歳出 p.8-9（**年度で位置が動く**: R6-R8=3-4/5-6・R4-R5=7-8/9-10・R3=6-7/8-9）。
    // 年度ページ名も揺れる（R8 だけ r8yosan.html・R7 以降は r3.html）。歳出款は R5 以前が18款・R6 以降が20款
    // （局再編で 文化観光費→にぎわいスポーツ文化費・環境創造費→みどり環境費+河川費・医療費 新設）＝**経年で款が繋がらない**。
    id: "yokohama-yosansho-r3",
    title: "令和3年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    publisher: "横浜市",
    url: null,
    urls: ["https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.pdf"],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "横浜市（一般会計・団体コード141003）",
    // ライセンス経緯（§9g に従い license 欄には適用条件だけを書く・2026-07-25 実測）:
    //   **この R3 だけ CC BY**。横浜市オープンデータポータル（data.city.yokohama.lg.jp）の
    //   データセット `zaisei_r3` に、**上の urls と同一の `r3ippan.pdf` がリソースとして登載**
    //   されている（CKAN `package_show` で `license_id: cc-by`・全24リソース中に URL 完全一致）。
    //   §9g の「ポータル規約が自サイトに範囲を限る」型に**該当しない** — 一覧に本ファイルの
    //   URL そのものが載っており、かつ同規約 §6 が「他のサイトの利用規約と異なるときは本サイトの
    //   利用規約が優先する」と**発行元自身が優先関係を明文化している**（原文を下の license に含めた）。
    //   ⚠ **R4〜R8 の `rNippan.pdf` はカタログ未登載**（同 API で6年度を実測。R4・R5 は ZIP 版のみ、
    //   R6〜R8 は説明書 PDF 自体がリソースに無い）＝**この振替を他年度へ広げないこと**。
    //   ⚠ **サイトポリシー原文を併記しない** — `licenseClassOf` は禁止文言を CC BY より優先させる
    //   ので、併記した瞬間「無断で複製・転用」に当たって permission-required へ落ちる（実測）。
    //   下の license は同規約 §2 の2文＋§6 の1文の**逐語**（出典の註記も足さない — この振替自体が
    //   「原文をそのまま残す」ための修正なので、経緯はこのコメントに置く）。
    license:
      "本サイトに存在する著作物（掲載されている情報等を含みます。）の著作権は、特別の記載がない限り、クリエイティブ・コモンズ・ライセンス 表示 4.0 国際のもとでライセンスされています。本利用規約以外の別の利用ルールが個別に適用されるコンテンツを除き、本利用規約に従う限り、どなたでも、商用利用を含め、自由に、複製、公衆送信、翻訳・変形・翻案等の編集・加工して利用を行うことができます。本サイトに掲載されているコンテンツが他のサイトにおいても公開されている場合において、当該他のサイトの利用規約（法令に定める利用条件とは別に、当該サイトにおいて独自に設けられた利用条件をいいます。）と本サイトの利用規約が異なるときは、本サイトの利用規約が優先するものとします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // ⚠ **財源内訳のヘッダ（`一般財源` / `国県支出金 市債 その他`）が款名を汚す**（R3 で実害・2026-07-16 修正）。
      //    歳出の**各ページ先頭の款**に連結し、R3 は款1 が `一般財源国県支出金市債その他議会費`・
      //    款12 が `…道路費` になっていた（p.8-9 の2ページ連結なので先頭が2つある）。
      //    **金額は正しく Σ も差0 なので validate は「ok」を返す**＝§2-4 の「Σ が守らない領域」で、
      //    gen まで到達して画面に出ていた。R4〜R8 は「千円」行と款1 の間に**空行があって断片が
      //    リセットされる**ため無事だっただけ＝版面が1行変われば同じ事が起きるので**全年度に効かせる**
      //    （R4〜R8 は再 parse して出力不変を実測）。`国県支出金` は歳出側にしか無い語
      //    （歳入の実在款名は `国庫支出金`・`県支出金` で別物）なので、側で分ければ安全。
      expenditureHeaderExtra: "^一般財源$|^国県支出金",
    },
  },
  {
    // 名古屋市 R7。R8 と完全同型（歳入 p.5 / 歳出 p.6・印字+4 で全年度不変）。修正可決は R8 のみで、
    // R7 以前は発行元が原案しか出していない＝取り違えの余地なし。
    id: "nagoya-yosansho-r7",
    title: "令和7年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/032/007/r7ippannmeisai.pdf"],
    landingPage: "https://www.city.nagoya.jp/shisei/zaisei/1002655/1002657/1002658/1032005/1032006/index.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 名古屋市 R6。R8 と完全同型（歳入 p.5 / 歳出 p.6・印字+4 で全年度不変）。修正可決は R8 のみで、
    // R7 以前は発行元が原案しか出していない＝取り違えの余地なし。
    id: "nagoya-yosansho-r6",
    title: "令和6年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/667/ippanmeisai.pdf"],
    landingPage: "https://www.city.nagoya.jp/zaisei/page/0000172292.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 名古屋市 R5。R8 と完全同型（歳入 p.5 / 歳出 p.6・印字+4 で全年度不変）。修正可決は R8 のみで、
    // R7 以前は発行元が原案しか出していない＝取り違えの余地なし。
    id: "nagoya-yosansho-r5",
    title: "令和5年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/706/r5.ippanmeisai.pdf"],
    landingPage: "https://www.city.nagoya.jp/zaisei/page/0000161170.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 名古屋市 R4。R8 と完全同型（歳入 p.5 / 歳出 p.6・印字+4 で全年度不変）。修正可決は R8 のみで、
    // R7 以前は発行元が原案しか出していない＝取り違えの余地なし。
    id: "nagoya-yosansho-r4",
    title: "令和4年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/742/r4.ippan.pdf"],
    landingPage: "https://www.city.nagoya.jp/zaisei/page/0000149788.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 名古屋市 R3。R8 と完全同型（歳入 p.5 / 歳出 p.6・印字+4 で全年度不変）。修正可決は R8 のみで、
    // R7 以前は発行元が原案しか出していない＝取り違えの余地なし。
    id: "nagoya-yosansho-r3",
    title: "令和3年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/783/3ippanmeisai.pdf"],
    landingPage: "https://www.city.nagoya.jp/zaisei/page/0000137945.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 名古屋市 R2。R8 と完全同型（歳入 p.5 / 歳出 p.6・印字+4 で全年度不変）。修正可決は R8 のみで、
    // R7 以前は発行元が原案しか出していない＝取り違えの余地なし。
    // **R2 は歳出15款で「職員費」が無い**（R3 で新設され全款から人件費が抜かれた）。R3 以降と
    // 同一系列で款別を並べると誤読を生む（教育費 R2 1,852億 → R8 1,287億）。歳入は R2-R8 とも16款で安定。
    id: "nagoya-yosansho-r2",
    title: "令和2年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/830/2ippanmeisai.pdf"],
    landingPage: "https://www.city.nagoya.jp/shisei/zaisei/1002655/1034927/1002826/1002827/1002828/1002829/index.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 福岡市 R7。歳入 p.4 / 歳出 p.5。**R7・R8 は p.4/p.5・R2〜R6 は p.3/p.4**（R7 で注記ページが
    // 1枚入り全体が +1 ずれた）。印字は全年度 2/3 なので**印字から外挿すると必ず外れる**。
    // 年度ページの `_2` は R6〜R8 のみ。
    id: "fukuoka-yosansho-r7",
    title: "令和7年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R7_keisuusiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/7Ntoushoyosanan_2.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 福岡市 R6。歳入 p.3 / 歳出 p.4。**R7・R8 は p.4/p.5・R2〜R6 は p.3/p.4**（R7 で注記ページが
    // 1枚入り全体が +1 ずれた）。印字は全年度 2/3 なので**印字から外挿すると必ず外れる**。
    // 年度ページの `_2` は R6〜R8 のみ。
    id: "fukuoka-yosansho-r6",
    title: "令和6年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R6_keisuusiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/6Ntoushoyosanan_2.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 福岡市 R5。歳入 p.3 / 歳出 p.4。**R7・R8 は p.4/p.5・R2〜R6 は p.3/p.4**（R7 で注記ページが
    // 1枚入り全体が +1 ずれた）。印字は全年度 2/3 なので**印字から外挿すると必ず外れる**。
    // 年度ページの `_2` は R6〜R8 のみ。
    id: "fukuoka-yosansho-r5",
    title: "令和5年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R5_keisuusiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/5Ntoushoyosanan.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 福岡市 R4。歳入 p.3 / 歳出 p.4。**R7・R8 は p.4/p.5・R2〜R6 は p.3/p.4**（R7 で注記ページが
    // 1枚入り全体が +1 ずれた）。印字は全年度 2/3 なので**印字から外挿すると必ず外れる**。
    // 年度ページの `_2` は R6〜R8 のみ。
    id: "fukuoka-yosansho-r4",
    title: "令和4年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R4_keisuusiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/4Ntoushoyosanan.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 福岡市 R3。歳入 p.3 / 歳出 p.4。**R7・R8 は p.4/p.5・R2〜R6 は p.3/p.4**（R7 で注記ページが
    // 1枚入り全体が +1 ずれた）。印字は全年度 2/3 なので**印字から外挿すると必ず外れる**。
    // 年度ページの `_2` は R6〜R8 のみ。
    // **ファイル名の規則が破れる**: R3 は `04.R3…`（区切りがドット）・R2 はさらに `keisuu`+`shi`ryou。
    id: "fukuoka-yosansho-r3",
    title: "令和3年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R3keisuusiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/3Ntoushoyosanan.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 福岡市 R2。歳入 p.3 / 歳出 p.4。**R7・R8 は p.4/p.5・R2〜R6 は p.3/p.4**（R7 で注記ページが
    // 1枚入り全体が +1 ずれた）。印字は全年度 2/3 なので**印字から外挿すると必ず外れる**。
    // 年度ページの `_2` は R6〜R8 のみ。
    // **ファイル名の規則が破れる**: R3 は `04.R3…`（区切りがドット）・R2 はさらに `keisuu`+`shi`ryou。
    // R2 は款7「法人事業税交付金」が新設で前年度欄が空＋伸率「皆増」。パーサの皆増対応（#63）が前提。
    // 款番号は年度間で安定しない（R2 でこの款が入り以降が繰り下がる）→ **年度比較を款番号で突合しない**。
    id: "fukuoka-yosansho-r2",
    title: "令和2年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R2keisuushiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/2Ntoushoyosanan.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 川崎市 R7。**R7 以前は「予算案について」しかない**（確定版は R8 が初）。R8 で案版と確定版の
    // 款別数値が完全一致することを確認済み＝無修正可決なので過年度は案版で正しい。
    // **分冊番号が年度で変わる**（R6=bunkatuban6 / R5以前=bunkatuban7。23bunkatuban6.pdf は実在するが中身は別物）。
    // 印字とのズレは年度ごとに +35〜+140 と乱高下する（分冊は大冊子の抜粋）＝**物理ページ必須**。
    id: "kawasaki-yosansho-r7",
    title: "令和7年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000173/173806/25bunkatuban6.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000173806.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 },
      expenditurePage: 7,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  {
    // 川崎市 R6。**R7 以前は「予算案について」しかない**（確定版は R8 が初）。R8 で案版と確定版の
    // 款別数値が完全一致することを確認済み＝無修正可決なので過年度は案版で正しい。
    // **分冊番号が年度で変わる**（R6=bunkatuban6 / R5以前=bunkatuban7。23bunkatuban6.pdf は実在するが中身は別物）。
    // 印字とのズレは年度ごとに +35〜+140 と乱高下する（分冊は大冊子の抜粋）＝**物理ページ必須**。
    id: "kawasaki-yosansho-r6",
    title: "令和6年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000158/158395/24bunkatuban6.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000158395.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  {
    // 川崎市 R5。**R7 以前は「予算案について」しかない**（確定版は R8 が初）。R8 で案版と確定版の
    // 款別数値が完全一致することを確認済み＝無修正可決なので過年度は案版で正しい。
    // **分冊番号が年度で変わる**（R6=bunkatuban6 / R5以前=bunkatuban7。23bunkatuban6.pdf は実在するが中身は別物）。
    // 印字とのズレは年度ごとに +35〜+140 と乱高下する（分冊は大冊子の抜粋）＝**物理ページ必須**。
    id: "kawasaki-yosansho-r5",
    title: "令和5年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000147/147869/23bunkatuban7.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000147869.html",
    kind: "pdf",
    fiscalYear: "R5",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  {
    // 川崎市 R4。**R7 以前は「予算案について」しかない**（確定版は R8 が初）。R8 で案版と確定版の
    // 款別数値が完全一致することを確認済み＝無修正可決なので過年度は案版で正しい。
    // **分冊番号が年度で変わる**（R6=bunkatuban6 / R5以前=bunkatuban7。23bunkatuban6.pdf は実在するが中身は別物）。
    // 印字とのズレは年度ごとに +35〜+140 と乱高下する（分冊は大冊子の抜粋）＝**物理ページ必須**。
    id: "kawasaki-yosansho-r4",
    title: "令和4年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000136/136966/22bunkatuban7.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000136966.html",
    kind: "pdf",
    fiscalYear: "R4",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  {
    // 川崎市 R3。**R7 以前は「予算案について」しかない**（確定版は R8 が初）。R8 で案版と確定版の
    // 款別数値が完全一致することを確認済み＝無修正可決なので過年度は案版で正しい。
    // **分冊番号が年度で変わる**（R6=bunkatuban6 / R5以前=bunkatuban7。23bunkatuban6.pdf は実在するが中身は別物）。
    // 印字とのズレは年度ごとに +35〜+140 と乱高下する（分冊は大冊子の抜粋）＝**物理ページ必須**。
    id: "kawasaki-yosansho-r3",
    title: "令和3年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000125/125926/21bunkatuban7.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000125926.html",
    kind: "pdf",
    fiscalYear: "R3",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  {
    // 川崎市 R2。**R7 以前は「予算案について」しかない**（確定版は R8 が初）。R8 で案版と確定版の
    // 款別数値が完全一致することを確認済み＝無修正可決なので過年度は案版で正しい。
    // **分冊番号が年度で変わる**（R6=bunkatuban6 / R5以前=bunkatuban7。23bunkatuban6.pdf は実在するが中身は別物）。
    // 印字とのズレは年度ごとに +35〜+140 と乱高下する（分冊は大冊子の抜粋）＝**物理ページ必須**。
    // R2 は款7「法人事業税交付金」が新設で前年度欄が `-`＋「皆増」。パーサの皆増対応（#63）が前提。
    id: "kawasaki-yosansho-r2",
    title: "令和2年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000114/114574/20bunkatuban7.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000114574.html",
    kind: "pdf",
    fiscalYear: "R2",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  {
    // 横浜市（団体コード 141003・人口 375万＝全国最大）。一般会計予算 R8（r8ippan.pdf・282p）。
    // 款別＋前年当初比較は「事項別明細書 1 総括」。**歳入・歳出とも2ページにまたがる**
    // （款数が多い）→ revenuePages/expenditurePages（範囲）を使う初の資料。
    // 印字ページと物理ページが +2 ずれる（registry は物理）。単位=千円・款番号は半角・負号 △・ゼロは「―」。
    // 歳出は比較の後ろに財源内訳4列が続き整数列が計7個になるが、パーサは先頭2列しか見ないので影響なし。
    // 合計行も ints=7 だが「整数最多の行」判定で正しく選ばれる。
    // ライセンスは「無断で複製・転用をすることはできません」→ permission-required。
    // ただし同じ規約に「数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、
    // 自由に利用できます」という**発行元自身による明示的な適用除外**があり、款別金額はこれに直接当たる。
    // 原文どおり permission-required に落として ③配信のリスクを /coverage で開示する（先例どおり・
    // 安全側）が、実質は open と読める。docs/data-strategy.md の32条2項の未決論点より根拠が強い事例。
    id: "yokohama-yosansho-r8",
    title: "令和8年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    publisher: "横浜市",
    url: null,
    urls: ["https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf"],
    landingPage: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "横浜市（一般会計・団体コード141003）",
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 3, to: 4 },
      expenditurePages: { from: 5, to: 6 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      // ⚠ **財源内訳のヘッダ（`一般財源` / `国県支出金 市債 その他`）が款名を汚す**（R3 で実害・2026-07-16 修正）。
      //    歳出の**各ページ先頭の款**に連結し、R3 は款1 が `一般財源国県支出金市債その他議会費`・
      //    款12 が `…道路費` になっていた（p.8-9 の2ページ連結なので先頭が2つある）。
      //    **金額は正しく Σ も差0 なので validate は「ok」を返す**＝§2-4 の「Σ が守らない領域」で、
      //    gen まで到達して画面に出ていた。R4〜R8 は「千円」行と款1 の間に**空行があって断片が
      //    リセットされる**ため無事だっただけ＝版面が1行変われば同じ事が起きるので**全年度に効かせる**
      //    （R4〜R8 は再 parse して出力不変を実測）。`国県支出金` は歳出側にしか無い語
      //    （歳入の実在款名は `国庫支出金`・`県支出金` で別物）なので、側で分ければ安全。
      expenditureHeaderExtra: "^一般財源$|^国県支出金",
    },
  },
  ...([
    // [年度, zip の URL パス, ランディング]
    //
    // 横浜市（団体コード 141003）。**予算に関する説明書「歳入・歳出予算」CSV（zip）**。
    // **プロジェクト初の「款より下」に届く資料**（#191・docs §8d-2）。全自治体で款別までしか
    // 収録できておらず、`/roadmap` の later「款より下（項・目・節）の内訳」はここで初めて解ける。
    // 款・項・目・節（歳出はさらに細節）の5階層。一般会計は R8 で歳入 799行 / 歳出 4,571行。
    //
    // ⚠ **URL のパスが年度で違う** — R8 は `r8/r8yosan.files/`、**R7・R6 は `rN/rN.files/`**。
    //   ⚠ 偵察の申し送りは `rNyosan.files` で統一されていたが**R8 でしか成り立たない**。
    //   URL は**横浜のオープンデータ CKAN（`package_show`）から実引き**した（下記ライセンスも同じ）。
    //
    // ⚠⚠ **R7 は収録しない**（2026-08-02 実測・unrecordable.ts に記録）。
    //   **歳入 CSV だけが +379,539千円 大きく、CSV 自身の中で歳入 Σ ≠ 歳出 Σ**
    //   （一般会計 1,984,787,527 vs 1,984,407,988）＝**資料内部で矛盾している**。
    //   既収録の款別 parsed とも歳出側だけが一致する。zip 内 mtime も歳入 2025-01-30 /
    //   歳出 2025-07-15 で**歳出だけ後から差し替えられている**。原因は未確認。
    //
    // ⚠ **単位は原典のどこにも書かれていない**（練馬型）。**千円**は外部突合で確定した
    //   （一般会計 Σ = 既収録 `yokohama-yosansho-rN` の総額と差0）。
    //
    // ライセンスは **CC BY**（`data.city.yokohama.lg.jp` の CKAN で `zaisei_r8yosan` /
    //   `zaisei_r6` とも `license_id: cc-by`、**この zip の URL が完全一致で登載**されているのを
    //   API で実引きした）。⚠ **§8 の「横浜は R3 だけ open」は `rNippan.pdf` の話**であって別物。
    //   ⚠⚠ **サイトポリシー原文（「無断で複製・転用…」）を併記しないこと** — `licenseClassOf` は
    //   禁止文言を CC BY より優先させる設計なので、**併記した瞬間 permission-required へ落ちる**（§9g）。
    ["R8", "r8/r8yosan.files/r8sainyu_saisyutsu.zip", "r8/r8yosan.html"],
    // ⚠ landing は `r6/index.html` だと 301（`r6/` へ）。兄弟の `yokohama-yosansho-r6` と同じ
    //   `r6/r6.html`（200）を指す。魚拓は 301 の URL では張れない
    ["R6", "r6/r6.files/r6sainyu_saisyutsu.zip", "r6/r6.html"],
  ] as const).map(([fy, path, landing]) => ({
    id: `yokohama-yosan-meisai-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 横浜市予算に関する説明書（歳入・歳出予算 款項目節 CSV）`,
    publisher: "横浜市",
    url: null,
    urls: [`https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/${path}`],
    landingPage: `https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/${landing}`,
    kind: "zip" as const,
    fiscalYear: fy,
    scope: "横浜市（全17会計・団体コード141003）",
    // CC BY（横浜市オープンデータ CKAN の登載。上記のとおりサイトポリシーは併記しない）
    license:
      "クリエイティブ・コモンズ 表示 4.0 国際（CC BY 4.0）。横浜市オープンデータポータル（data.city.yokohama.lg.jp）のデータセット「令和８年度予算」「令和６年度予算」に、本ファイルの URL が license_id: cc-by で登載されている（API package_show で確認・確認日 2026-08-02）。",
    parser: "yokohama-yosan-meisai-csv" as const,
    parserOptions: { generalAccountCode: "01" },
  })),

  ...([
    // [年度, zip の URL パス, ランディング]
    //
    // 横浜市（団体コード 141003）。**予算に関する説明書（一般会計）XLSX**（`rNippan.zip` 内）。
    // #191（歳入歳出 CSV）の**過年度への延伸**（#192・docs §8d-3）。CSV があるのは R6〜R8 だけで、
    // **R5 以前はこの XLSX**。⚠ **CSV に無い「前年度」列を持つ**のが強みで、
    // **項・目レベルの前年比較**は CSV 版では出せない。
    //
    // ⚠ **URL のパスが年度で違う**（#191 と同じ轍）。**CKAN（`package_show`）から実引き**した。
    //   R5〜R3 は `rN/rN.files/rNippan.zip`。R2 は `r2/02yosan.files/`、H31 は `h31/31yosan.files/`。
    //
    // ⚠⚠ **R2・H31 は収録しない**（2026-08-02 実測）。**歳入と歳出で「前年度」列の Σ が食い違う**:
    //   R2  歳入 1,759,429,383 / 歳出 1,761,506,383（差 2,077,000）
    //   H31 歳入 1,713,697,299 / 歳出 1,726,435,299（差 12,738,000）
    //   当年度は両側とも一致するので**前年度列だけが壊れている**。**前年度列こそがこの資料の
    //   価値**なので、そこが検証できない年度は入れない（#191 の R7 と同じ判断）。
    //
    // **検証**（実測・R5〜R3 の3年とも）: Σ款 = Σ項 = Σ目（当年度）が**既収録の款別と差0**、
    //   前年度も**既収録の前年度合計と差0**。さらに**年度の鎖**が閉じる
    //   （R5 の前年度 = R4 の当年度 = 1,974,874,143 / R4 の前年度 = R3 の当年度 = 2,007,260,724）。
    //
    // ライセンスは **CC BY**（CKAN の `zaisei_r5` / `zaisei_r4` / `zaisei_r3` で登載を実引き）。
    //   ⚠ サイトポリシー原文を併記しないこと（§9g・併記すると permission-required に落ちる）。
    ["R5", "r5/r5.files/r5ippan.zip", "r5/r5.html"],
    ["R4", "r4/r4.files/r4ippan.zip", "r4/r4.html"],
    ["R3", "r3/r3.files/r3ippan.zip", "r3/r3.html"],
  ] as const).map(([fy, path, landing]) => ({
    id: `yokohama-setsumeisho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 横浜市予算に関する説明書（一般会計・款項目＋前年度）`,
    publisher: "横浜市",
    url: null,
    urls: [`https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/${path}`],
    landingPage: `https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/${landing}`,
    kind: "zip" as const,
    fiscalYear: fy,
    scope: "横浜市（一般会計・団体コード141003）",
    license:
      "クリエイティブ・コモンズ 表示 4.0 国際（CC BY 4.0）。横浜市オープンデータポータル（data.city.yokohama.lg.jp）のデータセット「令和５年度予算」「令和４年度予算」「令和３年度予算」に、本ファイルの URL が license_id: cc-by で登載されている（API package_show で確認・確認日 2026-08-02）。",
    parser: "yokohama-setsumeisho-xlsx" as const,
    parserOptions: { entryPrefix: "02_" },
  })),

  {
    // 名古屋市（団体コード 231002）。一般会計予算に関する説明書 R8（修正後版・158p・16.9MB）。
    // **2月定例会で修正可決**されており、発行元は「（修正後）」版のみを掲載している
    // （修正は歳入内訳のみで総額は不変）。款別は「予算の概要」ではなく**説明書の総括**を使う
    // （概要 p.24/25 は款番号が無く整数列5本＝当初・現計の2本立てで、既存パーサの前提に合わない）。
    // 歳入 p.5（印字1）/ 歳出 p.6（印字2）。物理 = 印字 +4。
    // 前年度列は**当初**（概要の「(ｲ)令和7年度当初予算額」と全款一致で確認。現計とは別物）。
    // 歳入の款4・7 が「中央寄せ3行折返し」（名前が款行の上下に分かれ款行の名前欄が空）→
    // パーサの下段折返し対応（2026-07-15）が要る。歳出は無改修で通る。
    // ライセンスは「組織外に向けて発行するものへの利用は特例の適用外」で実質 permission-required だが、
    // 現行の licenseClassOf の語彙（無断複製・転用・要許可・非営利）に当たらず **unverified に落ちる**。
    // 沼津・南アルプスと同じ「実質制限的だが語彙が当たらない」型。docs/data-sources.md §8。
    id: "nagoya-yosansho-r8",
    title: "令和8年度 名古屋市一般会計予算に関する説明書（修正後）（歳入歳出予算事項別明細書 総括）",
    publisher: "名古屋市",
    url: null,
    urls: ["https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf"],
    landingPage: "https://www.city.nagoya.jp/shisei/zaisei/1002655/1042582/1042583/1046227/1046325/index.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "名古屋市（一般会計・団体コード231002）",
    license:
      "原則として名古屋市公式ウェブサイト内のコンテンツについては、別添の免責事項に同意して利用されているものだと見なしますので、閲覧及び利用に制限はありません。ただし、名古屋市公式ウェブサイト内のコンテンツを再利用する場合については、以下のような取り扱いとしておりますのでご留意ください。コンテンツ内に特に記載のない場合は、内容の改変を一切行わないこと／著作権者が名古屋市であることを明記すること の2つの条件を満たした上であれば、以下の特例利用を認めます。組織内部において、名古屋市公式ウェブサイトのコンテンツを複製して利用する場合は、その利用が組織内に限られるという前提であれば特に制限無く複製してご利用いただけます。ただし、組織外に向けて発行するもの(パンフレット、チラシ、小冊子)への利用はこの特例の適用外とします。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "総括",
      expenditureHeading: "（歳出）",
    },
  },
  {
    // 札幌市（団体コード 011002）。各会計予算説明書 R8（一般会計・346p）の「総括表」。
    // 歳入 p.8（印字2頁）/ 歳出 p.9（印字3頁）。**物理 = 印字 +6**。
    // 「予算の概要」PDF は**表本体が画像**（pdftotext が空）で決定的パース不可 → 説明書を採る。
    // 合計ラベルは字間スペース入り（「歳 入 合 計」）だがパーサは空白除去で判定するので既定のまま。
    // 歳入の款5/6/7/9/10/14/15 が下段折返し型（→ パーサ対応済み）。歳出は無改修で通る。
    // **廃止科目行**「自動車税環境性能割交付金」（款番号欄が △・本年度 0・前年度 694,000・増減率「皆減」）
    // は款番号が無いため拾えず、前年度 Σ が 694,000千円（合計の 0.05%）不足する。
    // 当年度 Σ は合計と厳密一致するので validate は通る。上の共通コメント参照。
    id: "sapporo-yosansetsumeisho-r8",
    title: "令和8年度 札幌市各会計予算説明書（一般会計・総括表）",
    publisher: "札幌市",
    url: null,
    urls: ["https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf"],
    landingPage: "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/reiwa8nendo_yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "札幌市（一般会計・団体コード011002）",
    license:
      "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 8,
      expenditurePage: 9,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
    },
  },
  {
    // 福岡市（団体コード 401307）。当初予算案計数資料 R8（04_R8_keisuusiryou.pdf・8p）。
    // 歳入 p.4（印字2）「一般会計款別比較（歳入）」/ 歳出 p.5（印字3）。物理 = 印字 +2。
    // タイトル行「一般会計款別比較（…）」は KAN_HEADER_RE の「比較」で自動スキップされるが、
    // 直下の「【 当 初 】」行が歳入 p.4 で款1に混ざる（p.4 は【当初】の後に空行が無い）ため、
    // これを見出しに指定して読み飛ばす（大月・都留と同じ手口）。
    // 前年度列は【当初】明記＋R7 資料の当年度額と完全一致で確認済み。款番号は10未満が全角。
    // 歳入の款5/12 が下段折返し型（→ パーサ対応済み）。
    // 歳入末尾に廃止税目行「▲ 自動車取得税交付金」（前年度 1千円）があり前年度 Σ が 1千円不足する。
    // ライセンスは富士河口湖町と一字一句同じ定型表記 → permission-required（先例どおり）。
    id: "fukuoka-yosansho-r8",
    title: "令和8年度 福岡市当初予算案計数資料（款別歳入歳出）",
    publisher: "福岡市",
    url: null,
    urls: ["https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf"],
    landingPage: "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/8Ntoushoyosanan_2.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "福岡市（一般会計・団体コード401307）",
    license:
      "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "【当初】",
      expenditureHeading: "【当初】",
    },
  },
  {
    // 川崎市（団体コード 141305）。「令和8年度 川崎市予算について」計数資料編（分割版6・33p）。
    // ファイル名の `-antore`（案取れ）＝**議決後の確定版**（予算案は別ページ）。
    // **歳入が2ページに分割**（p.5=款1-13・合計なし / p.6=款14-24＋合計）→ revenuePages を使う。
    // 歳出は p.7 単独。**印字ページと物理ページが +35 ずれる**（既知で最大のズレ）。
    // 見出しの枝番は R8 が「（１）（２）」・R7 が「①②」と揺れるので、見出し語は枝番を含めない。
    // 歳出は当年度・前年度・増減額の後ろに特定財源・一般財源の2列が続くが先頭2列しか見ないので影響なし。
    // 款16（予備費）は増減額が「-」で整数列が [700,000, 700,000, 700,000] にずれるが、
    // 使うのは先頭2列なので結果は正しい（将来 ints[2] を増減額として使う実装にすると静かに壊れる）。
    // ライセンスは定型表記に加えて「転載を行いたい場合は事前にご連絡ください（改変しないことが条件）」と
    // **能動的に手続と条件を課している** → 富士河口湖町型ではなく沼津型。permission-required。
    id: "kawasaki-yosansho-r8",
    title: "令和8年度 川崎市予算について 計数資料編（一般会計歳入歳出予算 款別）",
    publisher: "川崎市",
    url: null,
    urls: ["https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf"],
    landingPage: "https://www.city.kawasaki.jp/230/page/0000186101.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "川崎市（一般会計・団体コード141305）",
    license:
      "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 5, to: 6 },
      expenditurePage: 7,
      revenueHeading: "一般会計歳入予算（款別）",
      expenditureHeading: "一般会計歳出予算（款別）",
    },
  },
  // ---- 中核市（人口の多い順に整備。2026-08-22 追加・loop.md の第1巡）--------------------
  // 候補は手書きせず「総務省の人口 × BUDGET_SOURCES に無い団体」で機械的に出した（loop.md §1-c-1）。
  // 5市とも**款体系は総務省の目的別標準**（政令市型の局ベース独自款ではない）。
  // **八王子だけが open（資料そのものがオープンデータカタログに登載・CC BY 4.0）**。他4市は要許可（サイト全体の
  // 著作権表示）で、オープンデータカタログの CC BY は予算資料に及ばない（各市で実検索・§9g）。

  {
    // 船橋市（千葉県・中核市・団体コード 122041）。R8・R7 は「予算参考資料」冒頭部の**分冊 PDF**
    // （歳入=sainyu.pdf / 歳出=saisyutu.pdf・各 PDF の物理 p.1 が当該表）→ revenueFile/expenditureFile。
    // ⚠ 款番号が 10,15,20,21,23… の**5刻み・非連番**（原典どおり。§9f で連番チェックは撤去済み）。
    // ⚠ 表の上に**本文段落**があり、R7 歳出は「３７億２，８５０万円、率にして…」の行頭 ３７ が
    //    半角化されて款37 として拾われ Σ +2,850 で止まる（実測）→ `HeaderExtra: "億|万円"` で段落行を
    //    捨てる。R8 は無くても通るが同型なので付ける。
    // ⚠ 款名の中央寄せ3行折返し（株式等譲渡所得割交付金・国有提供施設等所在市助成交付金 等5款）は
    //    既知の型でパーサが吸収する（実測・款名全件クリーン）。
    // ⚠ この分冊 PDF には「船橋市」の文字列が**0回**（表題は「一般会計 歳入予算の概要」のみ）。
    //    取り違え検出はホスト名＋総額 270,640,000千円（同ページの kaikei.pdf・gaiyo.pdf と一致）で行う。
    // 前年度列は**当初**（年度間クロスチェック R8→R7→…→R1 の7リンク×36款で不一致0・偵察と収録で実測）。
    // 年度ページは `pNNNNNN` の個別 ID で**規則が無い**（年度一覧 /shisei/zaisei/001/index.html から辿る）。
    id: "funabashi-yosan-gaiyou-r8",
    title: "令和8年度 船橋市予算参考資料（歳入予算の概要・歳出予算の概要（款別））",
    publisher: "船橋市",
    url: null,
    urls: [
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p144524_d/fil/sainyu.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p144524_d/fil/saisyutu.pdf",
    ],
    landingPage: "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p144524.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "船橋市（一般会計・団体コード122041）",
    // 「著作権・リンク・免責事項」（/other/0002/p011401.html・確認日 2026-08-22）。
    // ⚠ オープンデータ利用規約（CC BY 4.0）は「本ページ（odcs.bodik.jp/122041/）に掲載されている
    //   全てのデータについてのみ適用」と自ら範囲を限り、市のオープンデータ一覧 xlsx を実検索して
    //   予算/決算/財政/歳入/歳出 は 0件 → 本 PDF には**及ばない**（license 欄に書かない・§9g）。
    // リンク方針は「原則として自由」＋「なるべくトップページ」＋事後連絡の依頼＝禁止ではない
    //   （北区 §10l・山口と同型・§11h 第3/5群）ので `noDeepLink` は立てない。
    license:
      "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenueFile: "sainyu.pdf",
      expenditureFile: "saisyutu.pdf",
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: "歳入予算額対前年度比較",
      expenditureHeading: "歳出予算額対前年度比較（款別）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "億|万円",
      expenditureHeaderExtra: "億|万円",
    },
  },
  {
    // 船橋市 R7。R8 と同型の分冊（ファイル名だけ sanko-2 / sanko-3）。`HeaderExtra` は**必須**（上記）。
    id: "funabashi-yosan-gaiyou-r7",
    title: "令和7年度 船橋市予算参考資料（歳入予算の概要・歳出予算の概要（款別））",
    publisher: "船橋市",
    url: null,
    urls: [
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p134434_d/fil/sanko-2.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p134434_d/fil/sanko-3.pdf",
    ],
    landingPage: "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p134434.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "船橋市（一般会計・団体コード122041）",
    license:
      "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenueFile: "sanko-2.pdf",
      expenditureFile: "sanko-3.pdf",
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: "歳入予算額対前年度比較",
      expenditureHeading: "歳出予算額対前年度比較（款別）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "億|万円",
      expenditureHeaderExtra: "億|万円",
    },
  },

  ...([
    // 船橋市 R6〜R1 は「当初予算案の概要」の同型表（**款番号なし**＝`kanNoless`・岡山と同型・kanNo は null）。
    // [年度, PDF, ランディング, 歳入ページ, 歳出ページ]（物理ページ）
    // ⚠ 予算参考資料の「会計別予算額・歳入歳出予算額対前年度比較」PDF は**この6年度では使えない**:
    //    R4/R3/R1 は CCITT スキャン（テキスト層0）、R6/R5/R2 はテキスト層が OCR 化け
    //    （R6 は款名「区ノ」「゜」・数字が行に割れて Σ −102,702,654 / R5 は合計行が見つからず throw・偵察が実測）。
    // ⚠ 表の前の本文段落が款1「市税」の頭に溜まる（「【一般会計歳入】景気や雇用状況が…市税」）。
    //    `HeaderExtra` が `億|万円` だけだと**Σ 差0 のまま静かに通る**（実測）→ `[、。【]` を足して
    //    句読点を含む行を捨てる（款名に句読点は無い）。
    // ⚠ R6 は歳出見出しの括弧が半角 `(目的別)` なので見出し語は括弧抜きで指定する（includes 判定）。
    // ⚠ R1 は表紙だけが「平成３１年度」表記で、**年度一覧のページ名も資料名も「令和元年度」**。
    //    `fiscalYear` は発行元の呼称に従い `R1` とする（大田・中央が H31 なのはサイト側も「平成31年度」と呼ぶため）。
    ["R6", "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p123980_d/fil/gaiyo.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p123980.html", 3, 5],
    ["R5", "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p125141_d/fil/R5gaiyo.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p125141.html", 4, 7],
    ["R4", "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p118949_d/fil/R4gaiyo.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p118949.html", 4, 7],
    ["R3", "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p124347_d/fil/gaiyo.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p124347.html", 4, 7],
    ["R2", "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p124633_d/fil/R2gaiyou.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p124633.html", 4, 7],
    ["R1", "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p125198_d/fil/gaiyo.pdf",
      "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p125198.html", 4, 7],
  ] as const).map(([fy, url, landing, revPage, expPage]) => ({
    id: `funabashi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 船橋市当初予算案の概要（歳入予算額対前年度比較・歳出予算額対前年度比較（目的別））`,
    publisher: "船橋市",
    url,
    landingPage: landing,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "船橋市（一般会計・団体コード122041）",
    license:
      "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      kanNoless: true,
      revenueHeading: "歳入予算額対前年度比較",
      expenditureHeading: "歳出予算額対前年度比較",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "億|万円|[、。【]",
      expenditureHeaderExtra: "億|万円|[、。【]",
    },
  })),

  ...([
    // 鹿児島市（鹿児島県・中核市・団体コード 462012。⚠ 鹿児島県 460001＝`kagoshima-ken-` とは別団体）。
    // 財政課「当初予算の概要」巻頭の「(2) 一般会計歳入予算款別前年度比較表」= 物理 p.5 /
    // 「(3) 一般会計歳出予算（目的別）前年度比較表」= 物理 p.6（印字ノンブルとズレ0）。
    // R8・R7 は主要事業を同梱した単一 PDF（R8 は 133p・20.4MB）、R6 以前は概要部分 11p の分冊だが、
    // **款別表の位置と様式は H31 から8年間同一**（同じ opts で8年度とも Σ 4系統差0・偵察と収録で実測）。
    // ⚠ **款番号を持たない表**（岡山 §9i 型）→ `kanNoless: true`。無いと「款が1件も抽出できない」で throw。
    // ⚠⚠ **歳出(3)目的別 p.6 と (4)性質別 p.7 は同じ列構成・同じ合計**なので、ページを取り違えても
    //    Σ は差0 のまま性質別を収録してしまう。歳入合計＝歳出合計でもあるので歳入/歳出の取り違えも
    //    Σ では捕まらない。**網は見出し語の1枚**＝レビュー時に歳出13款名（議会費〜予備費）を目視する。
    // 前年度列は列見出し「令和７年度（Ｂ）当初予算額」＝当初。年度間クロスチェック R8→…→H31 の
    //    7鎖×35款で不一致0（偵察が実測）。R2 は末尾に廃款 `自動車取得税交付金 0/111,000 皆減` が付く（23款）。
    // ⚠ **年度 URL の規則は毎年破れる** — 当初予算ページ・PDF は**公開時の年度ディレクトリ**に置かれ
    //    （R8 は `jokyo/r7/`、R6・R5 は `r4/`、H31 は `jokyo/documents/` 直下）、ファイル名も毎年別。外挿不可。
    // ⚠ R8 のファイル名は `r8yosan**an**gaiyo.pdf` だが表紙は「当初予算の概要」（案の字なし）。
    //    「（案）の概要」版 `r8yosanangaiyo2.pdf` は 2026-08-22 時点で 404（差し替え済み）。
    // ⚠ R8 は 20MB なので Wayback の既存魚拓（2026-05-20）は **5 MiB で打ち切り**（§9b 型・偵察が実測）。
    // [年度, PDF, ランディング]（`https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/` 以下）
    ["R8", "r7/documents/r8yosanangaiyo.pdf", "r7/r08yosantosyo1.html"],
    ["R7", "r7/documents/r7yosangaiyo.pdf", "r7/r07yosantosyo2.html"],
    ["R6", "r4/documents/gaiyouannnasir61-8.pdf", "r4/r6tousyoyosan.html"],
    ["R5", "r4/documents/gaiyou.pdf", "r4/r5tousyoyosan.html"],
    ["R4", "r4/documents/annnashisyuyoujigyou.pdf", "r4/r4toushoyosan.html"],
    ["R3", "r3/documents/r3pointannasi.pdf", "r3/r3toushoyosanan.html"],
    ["R2", "r2/documents/2gaiyo-1_0-8.pdf", "r2/r2tousyoyosan-1.html"],
    ["H31", "documents/31-gaiyou.pdf", "31toushoyosan.html"],
  ] as const).map(([fy, pdf, landing]) => ({
    id: `kagoshima-yosangaiyo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 鹿児島市当初予算の概要（一般会計歳入予算款別・歳出予算（目的別）前年度比較表）`,
    publisher: "鹿児島市",
    url: `https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/${pdf}`,
    landingPage: `https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "鹿児島市（一般会計・団体コード462012）",
    // 「リンク・著作権・免責事項・商標登録表示」（/soumu/shichoshitu/kouhou/shise/koho/homepage/menseki.html・
    //   確認日 2026-08-22）の「著作権」。「文書や画像等の各ファイル」とファイルを名指ししているので本 PDF に及ぶ。
    // ⚠ 鹿児島市オープンデータ（BODIK ODCS・CC BY 4.0）は**本資料には及ばない** — 規約は「本サイトにある
    //   データ」に範囲を限り、全118件を 予算・決算・財政 で実検索していずれも0件（市サイト側の掲載も
    //   2024-09-30 で終了）。license 欄に書かない（§9g）。
    // リンク文言は「原則としてリンクフリー」「連絡の必要はありません」＋「リンクをする場合はできるだけ
    //   トップページにお願いします」＋フレーム表示の遠慮依頼。PDF の名指し・相談要請は無く、トップページは
    //   「URL が変更されることがある」を理由とする**お願い**（北区「トップページ推奨」と同型・§11h 第3群寄り）
    //   → `noDeepLink` は立てない（人が原文を読んで判断・2026-08-22）。
    license:
      "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "一般会計歳入予算款別前年度比較表",
      expenditureHeading: "一般会計歳出予算（目的別）前年度比較表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
    },
  })),

  ...([
    // 姫路市（兵庫県・中核市・団体コード 282014。⚠ 兵庫県は歳入の款別がウェブに無く収録不可だが市は別）。
    // 「予算の概要」年度ページに**歳入・歳出が別 PDF**（各1ページ・Excel 出力）→ revenueFile/expenditureFile。
    // R8〜R4 の5年度が完全同型（同じ opts で款名クリーン・Σ 4系統差0・偵察と収録で実測）。
    // ⚠⚠ 列見出し「科 目」が単独行にあり既定の KAN_HEADER_RE に無いため、外すと**款1 の頭に「科目」が付く**
    //    （`科目市税`・`科目議会費`。**Σ は差0 のまま＝静かに通る型**・実測）→ `HeaderExtra: "^科目$"` が必須。
    // ⚠ 款番号は連番でなく 10,15,17,…,90 / 10,…,95 のコード（原典どおり）。
    // ⚠ R8 歳入 款28 環境性能割交付金は当年度「－」＋伸率「皆減」→ 0（実測 0 / 348,000）。
    // ⚠ 年度ごとに cmsfiles の**コンテンツ番号が変わる**（下表）。ファイル名の「ippann」「yosann」の n 重複は原典のまま。
    // ⚠ 同ページの「一般会計予算」（382p）・「予算参考資料」は Type3 フォントでテキスト層が無い（使わない）。
    // ⚠ R3 以前は「予算概要」PDF のみ（H19〜R3 が現行サイトに残る）で、款番号なし＋歳入に内訳行
    //    （譲与税4内訳・交付金計・普通/特別交付税）が混在し、既存オプションでは歳入が Σ +26,966,500 で
    //    落ちる（偵察が R3 で実測）。足すなら歳入側の除外設計が要る（未着手）。
    // [年度, コンテンツ番号ディレクトリ, ランディングの記事番号]
    ["R8", "0000032/32701", "0000032701"],
    ["R7", "0000030/30034", "0000030034"],
    ["R6", "0000026/26326", "0000026326"],
    ["R5", "0000023/23499", "0000023499"],
    ["R4", "0000020/20103", "0000020103"],
  ] as const).map(([fy, dir, article]) => ({
    id: `himeji-yosan-soukatsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 姫路市一般会計予算総括表（歳入／歳出・目的別）`,
    publisher: "姫路市",
    url: null,
    urls: [
      `https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/${dir}/${fy}ippannkaikeiyosannsoukatuhyousainyuu.pdf`,
      `https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/${dir}/${fy}ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf`,
    ],
    landingPage: `https://www.city.himeji.lg.jp/shisei/${article}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "姫路市（一般会計・団体コード282014）",
    // 「著作権・リンク・免責事項」（/site_policy/0000000009.html・更新日 2024-12-26・確認日 2026-08-22）。
    //   サイト全体の規約で「当サイトに掲載しているすべてのコンテンツ」が対象＝本 PDF に及ぶ。
    // ⚠ オープンデータカタログ（city.himeji.gkan.jp・CC BY 4.0）は「本サイトで公開しているデータ」限定で、
    //   全110データセット中 予算 0件・決算 0件・財政 2件（基本地形図）＝本 PDF には**及ばない**（§9g）。
    // リンクは「自由にしていただいて構いません」「承認を求める必要もありません」＋フレーム表示の遠慮依頼
    //   ＝§11h 第3群（熊本・京都・茨城と同型）→ `noDeepLink` は立てない。
    license:
      "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenueFile: `${fy}ippannkaikeiyosannsoukatuhyousainyuu.pdf`,
      expenditureFile: `${fy}ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf`,
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: "一般会計予算総括表（歳入）",
      expenditureHeading: "一般会計予算総括表（歳出・目的別）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "^科目$",
      expenditureHeaderExtra: "^科目$",
    },
  })),

  {
    // 川口市（埼玉県・中核市・団体コード 112038）。財政課「予算概要」（61p・DocuWorks 出力・テキスト層あり）
    // の「２ 一般会計予算款別一覧表」= 物理 p.4 歳入 23款 / p.5 歳出 13款（印字 +2）。
    // ⚠ 歳出ページの冒頭は `（歳   出）` だけ（表題は p.4 にしか無い）ので見出し語は `（歳` の前方一致。
    //    合計行は `歳 入 合 計` / `歳 出 合 計` の空白詰めで既定ラベルに当たる（実測）。
    // ⚠ 歳入款5〜10・13〜15 は款名が金額行の上下に3行折返し（款行の名前欄が空）＝既知型でパーサが復元。
    //    増減率欄の「3.3倍」「4.0倍」は小数として無視される（実測）。款9 自動車取得税交付金・款10
    //    環境性能割交付金は当年度 1千円の名目計上（廃止税目の経過措置）。
    // ⚠⚠ **R7 以前は収録不可** — 年度ページ R3〜R7 の同名「予算概要」PDF は**5年分すべて非テキスト PDF**
    //    （`pdftotext` が 55〜63文字。R7 の「当初予算書 一般会計」426p も同様・Wayback の R7 写しも同一
    //    バイナリ）。`unrecordable.ts` に記録。R2 以前は年度一覧に無い。
    // 前年度列は**当初**（R7 概要の本年度列と全36款＋合計 273,720,000 が一致・偵察が画像で目視。
    //    R8 の「当初予算書」事項別明細書 総括とも 23/13款・Σ差0 で一致）。
    // 年度ディレクトリは R8 `4_11` / R7 `4_10` / … / R3 `4_4`（`4_5` `4_6` は 404）＝規則が破れる。
    id: "kawaguchi-yosan-gaiyou-r8",
    title: "令和8年度 川口市予算概要（一般会計予算款別一覧表）",
    publisher: "川口市",
    url: "https://www.city.kawaguchi.lg.jp/material/files/group/9/R8_yosanngaiyou.pdf",
    landingPage: "https://www.city.kawaguchi.lg.jp/soshiki/01020/030/3/4_11/50456.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "川口市（一般会計・団体コード112038）",
    // 「このサイトについて」（/homepage/4467.html・更新日 2024-04-02・確認日 2026-08-22）の著作権。
    //   サイト全体の条項なので PDF にも及ぶ。資料の表紙・奥付に利用条件の記載は無い。
    // ⚠ オープンデータ一覧（/soshiki/01020/020/5/4512.html）の CC BY は「本ページで公開しているデータ」
    //   限定で、21データセット中 予算・決算・財政 は0件（実検索）＝本 PDF には**及ばない**（§9g）。
    // リンクは「トップページへのリンクは原則自由。ただしトップページ以外のページにおいてリンクの制限等の
    //   注記がある場合はこの限りではありません」＋「リンクである旨を明記」。予算概要ページに注記は無い
    //   （実測 grep 0）。相談・連絡・PDF 名指しの文言が無いので §11h 第2群の決め手を欠く → `noDeepLink` は
    //   立てない（人が原文を読んで判断・2026-08-22）。
    license:
      "川口市ホームページに掲載されている文章、写真、イラスト、画像等の著作権は、川口市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転載することはできません。「引用」を行う際は、必ず出典を明示してください。また、利用許諾については各ページの担当課へお問い合わせください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "一般会計予算款別一覧表",
      expenditureHeading: "（歳",
    },
  },

  ...([
    // 八王子市（東京都・中核市・団体コード 132012）。「予算の概要」の「総括」PDF。
    // **市のオープンデータカタログページ（p005883）に H22〜R8 の17年分が登載**されており、
    // 同じ PDF を「予算の概要」ページ（p037011）が章ごとに分割して配っている（R8 は md5 同一を偵察が実測）
    // → 規則的でライセンスが明示されたカタログ側を採る。
    // 物理 p.3 = ３.一般会計歳入歳出（１）歳入 ア 性質別（款別）22款（印字 6）/ p.6 = （２）歳出 ア 目的別（款別）13款（印字 9）。
    // ⚠ 合計行のラベルは歳入歳出とも **「計」**（「歳入合計」ではない）。
    // ⚠ 歳出表は右側に財源内訳（国庫/都/市債/その他/一般財源）の整数列が続くが款名・Σ とも汚さない（実測）。
    // ⚠ **R6 だけ歳入 p.4 / 歳出 p.7**（+1p）。
    // 前年度列は資料に基準の明記なし → R8 前年度列 = R7 総括の当年度列（全款・235,900,000）を実測して
    //    「当初」と確定（R8→H24 の全隣接ペアで全款一致・偵察が実測）。
    // ⚠⚠ **R3・R2 は #226 のパーサ改修で収録できた**（2026-08-22・第3巡）:
    //    R3 = 歳出款11 災害復旧費が皆増（前年度セル空欄）で、財源内訳の整数が後続するため ints≥3 になり、
    //      改修前は比較列 548,001 を前年度として読んでいた（前年度Σ +548,001・warning で derive まで流れる型）。
    //      `prevBlankAsZero.expenditure: [11]` を指定（改修で「ints[2] が当年度−前年度と整合するときだけ印字値」になった）。
    //    R2 = 廃止款「〇 自動車取得税交付金」の当年度セルが **U+2500 `─`** で款名末尾に残っていた
    //      （`自動車取得税交付金─`・Σ 差0 のまま）。DASHES 文字クラスに U+2500/U+2501 を足して解消。
    //    H31〜H22 の12年度は同型で読める（H30 は `dashAsZero: true` が要る・H23/H22 は見出し語が違う）が
    //      年度延伸は優先しない方針につき未収録。申し送りは data-sources.md §13 参照。
    // [年度, ファイル名, 歳入ページ, 歳出ページ, 追加オプション]
    ["R8", "R08soukatu.pdf", 3, 6, {}],
    ["R7", "R07soukatu.pdf", 3, 6, {}],
    ["R6", "R06soukatu.pdf", 4, 7, {}],
    ["R5", "R05soukatu.pdf", 3, 6, {}],
    ["R4", "R04soukatu.pdf", 3, 6, {}],
    ["R3", "R03soukatu.pdf", 3, 6, { prevBlankAsZero: { expenditure: [11] } }],
    ["R2", "R02soukatu.pdf", 3, 6, {}],
  ] as const).map(([fy, file, revPage, expPage, extra]) => ({
    id: `hachioji-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 八王子市予算の概要 総括（一般会計歳入歳出 款別）`,
    publisher: "八王子市",
    url: `https://www.city.hachioji.tokyo.jp/contents/open/002/p005883_d/fil/${file}`,
    landingPage: "https://www.city.hachioji.tokyo.jp/contents/open/002/p005883.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "八王子市（一般会計・団体コード132012）",
    // オープンデータカタログページ p005883 の「ライセンス表示について」（確認日 2026-08-22・収録時に
    //   ページを取得して5年度とも PDF が一覧に登載されていることを実測）。**資料そのものがカタログに
    //   登載されている**ので規約が及ぶ（愛媛 §11i と同じ系統。和歌山のサイト全体規約型ではない）。
    //   「オープンデータとは」（/contents/open/001/p005861.html）も「カタログページで提供するデータは CC BY」と同旨。
    // ⚠ カタログ**外**の資料（主な事業の款別 PDF・予算説明書・成果報告書・評価シート）には「著作権について」
    //   （/987/p012154.html・「無断使用・複製・転載…を禁止」）が適用される＝要許可。**本エントリの license を
    //   それらに流用しないこと**。
    // リンクは「自由に設定していただいて構いません。また、設定後のご連絡も不要です」「トップページに限らず
    //   すべてのページを同様」＋フレーム埋め込みのみ禁止＝§11h 第3群 → `noDeepLink` 不要。
    license:
      "オープンデータカタログページ（以下、「カタログページ」と言います。）で提供するデータのライセンスは、クリエイティブ・コモンズ・ライセンスにおける「CC BY（表示）」としています。二次著作物を作成する場合は、以下のとおり、利用するデータの出典を表示してください。（1）提供されているデータを改変せず、そのまま複製して利用する場合 「データのタイトル」、八王子市、クリエイティブ・コモンズ・ライセンス 表示 4.0",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "性質別（款別）",
      expenditureHeading: "目的別（款別）",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      ...extra,
    },
  })),

  // ---- 中核市 第2弾（2026-08-22・loop.md の第2巡）--------------------------------------------
  {
    // 松戸市（千葉県・団体コード 122076）R8。款別＋前年当初比較は「一般会計・特別会計予算に関する説明書」
    // （599p・13.7MB）の歳入歳出予算事項別明細書「１．総括」（物理 p.7 歳入 / p.8 歳出・印字ノンブルとズレ0）。
    // ⚠ 同ページの「参考表」（R8sankouhyou.pdf）は**款別ページ pp.4-7 だけテキストがアウトライン化**
    //    （大分 §11j 型・pdftotext が空）。R7 以前の参考表は読めるので、R8 だけ説明書ルート。
    // ⚠⚠ 款番号が `1.` `2.` の**半角ピリオド付き**で、`kanNamePrefixStrip: "."` が無いと款名が
    //    `.市税` `.議会費` になる（**Σ は差0 のまま素通り**・実測）＝款名の全件目視だけが網。
    // 見出しは「（歳   入）」「（歳   出）」（字間スペース・パーサが空白除去で照合）。合計ラベルは既定。
    // 象徴計上 1千円（自動車取得税交付金・災害復旧費・R8 の環境性能割交付金）と 2千円（諸支出金）が毎年ある。
    // 前年度列は**当初**（R7 参考表・R7 説明書の本年度列と 37款すべて一致・偵察と収録で実測）。
    // 款体系は総務省の目的別標準（歳入23・歳出14）。
    id: "matsudo-yosan-setsumeisho-r8",
    title: "令和8年度 松戸市一般会計・特別会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
    publisher: "松戸市",
    url: "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/R8setsumeisho.pdf",
    landingPage: "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "松戸市（一般会計・団体コード122076）",
    // 「サイトポリシー」3．著作権（/site-gaiyou/site-policy.html・確認日 2026-08-22）。
    // ⚠ オープンデータ（CC BY 4.0）は「下記対象データのみ適用」と自ら範囲を限り、カタログ（katarogu.html）は
    //   地図6種＋統計書18章＋人流データのみで 予算/決算/財政 は0件（実検索）→ 本 PDF には**及ばない**（§9g）。
    // リンクは「原則として自由」＋「フレーム内…行わないでください」＋「トップページへのリンクを推奨」＝
    //   §11h 第3群（鹿児島・川口と同じ「トップページ」言及の境界型・相談/連絡の要求なし）→ `noDeepLink` は立てない。
    license:
      "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      kanNamePrefixStrip: ".",
    },
  },

  ...([
    // 松戸市 R7〜H28 は「参考表」の「２．一般会計款別歳入歳出状況」（物理 p.6 歳入 / p.7 歳出・印字 3/4＝+3）。
    // 列は 本年度｜前年度｜比較｜構成比｜伸長率。R7 は説明書（p.7/p.8）でも読めて結果は完全一致（偵察が実測）。
    // ファイル名は R7 `07_sankouhyou.pdf`・R6 `3_sankouhyou.pdf`・R5 以前 `sankouhyou_<年度>.pdf`（規則は毎年揺れる）。
    // ⚠ **R4 だけ表紙・目次が無く物理 p.4/p.5**。
    // ⚠⚠ **H30 は歳出款11 災害復旧費が `1  5,001  △ 5,000  0.0  皆減` と「本年度 1千円なのに皆減」**と印字される。
    //    既定の皆減処理（当年度=0・前年度=ints[0]）だと Σ −1 / −5,000 の **error**（ゲートが捕まえる型）。
    //    `amountIntIndex: 0, prevIntIndex: 1` で列位置を固定すると差0（実測）。他年度には付けない。
    // 款数: R2〜R8 歳入23（R2 で法人事業税交付金が皆増）・H31 22（環境性能割交付金が皆増）・H30 以前 21。歳出は全年度14。
    // H27 以前は参考表が年度一覧に無い（「当初予算の概要」のみ・未確認・年度延伸なので未収録）。
    // [年度, ファイル名, 歳入ページ, 歳出ページ, 追加オプション]
    ["R7", "07_sankouhyou.pdf", 6, 7, {}],
    ["R6", "3_sankouhyou.pdf", 6, 7, {}],
    ["R5", "sankouhyou_R5.pdf", 6, 7, {}],
    ["R4", "sankouhyou_R4.pdf", 4, 5, {}],
    ["R3", "sankouhyou_R3.pdf", 6, 7, {}],
    ["R2", "sankouhyou_R2.pdf", 6, 7, {}],
    ["H31", "sankouhyou_H31.pdf", 6, 7, {}],
    ["H30", "sankouhyou_H30.pdf", 6, 7, { amountIntIndex: 0, prevIntIndex: 1 }],
    ["H29", "sankouhyou_H29.pdf", 6, 7, {}],
    ["H28", "sankouhyou_H28.pdf", 6, 7, {}],
  ] as const).map(([fy, file, revPage, expPage, extra]) => ({
    id: `matsudo-sankouhyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 松戸市当初予算 参考表（一般会計款別歳入歳出状況）`,
    publisher: "松戸市",
    url: `https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/${file}`,
    landingPage: "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "松戸市（一般会計・団体コード122076）",
    license:
      "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（１）歳入",
      expenditureHeading: "（２）歳出",
      kanNamePrefixStrip: ".",
      ...extra,
    },
  })),

  ...([
    // 松山市（愛媛県・中核市・団体コード 382019。愛媛県エンティティ（ehime-*）とは別サイト・別団体）。
    // 財政課の年度ページに並ぶ単体 PDF「一般会計当初予算総括表（目的別）」（2p・Excel 出力・議決後の確定値）。
    // p.1 = (歳入) 22〜24款 / p.2 = (歳出) 13款。印字ノンブル無し（物理ページそのまま）。
    // ⚠ 年度ページの URL も PDF 名も毎年不規則（下表）。⚠ 年度一覧 `yosan/yosan.html` には **R7 のリンクが無い**
    //    （各年度ページのサイドバーからは辿れる）。
    // 見出しはタイトル行「令和N年度 一般会計当初予算総括表 （目的別）」の一部（R5 以前は字間スペース入りだが
    //    空白除去で当たる。括弧の全角/半角が年度で揺れる `(歳入)`/`（歳入）` は見出しに使わない）。合計ラベルは既定。
    // ⚠⚠ 歳入に「款行の名前欄が非空のまま下段へ続く」折返し型が年度ごとに違う款で出る
    //    （R8: 8 ゴルフ場利用/税交付金・9 所在市町村/助成交付金・10 地方特例/交付金・12 交通安全対策/特別交付金）。
    //    指定しないと款8 が `ゴルフ場利用`・款9 が `税交付金国有提供施設等所在市町村`… になる
    //    （**Σ は4系統差0 のまま＝静かに壊れる型**・偵察と収録で実測）。年度ごとに原典を見て `kanNameContinues` を書いた。
    // ⚠ R8 は廃止款行が款番号欄 `・`（環境性能割交付金 0/120,000・災害復旧費 0/1,008,934）で kanNo=null として拾われる。
    //    `kanNamePrefixStrip: "・"` で `・` を落とす。**環境性能割交付金は上段「環境性能割」＋下段「交付金」**で、
    //    kanNo が無いので `kanNameContinues` では指せない → `abolishedAwaitTail.revenue: ["環境性能割"]`（#226・2026-08-22）。
    //    改修前は `環境性能割` で確定していた（Σ は差0・表示だけの欠け）。
    // 前年度列は**当初**（R8↔R7 … R2↔H31 の7リンクで全款一致・偵察が実測）。H31 の款名は原典どおり
    //    `株式譲渡所得割交付金`・`国有提供所在市町村交付金`（R2 以降と表記が違う＝年度をまたぐ結合はここで切れる）。
    // ⚠ PDF 本文に「松山市」の文字列が無い。同ページの「各会計別予算総括表」（松山城観光事業特別会計 等）と
    //    一般会計総額 235,160,000千円（予算の概要）で同定した。
    // [年度, 年度ページ, PDF ファイル名, 歳入の kanNameContinues]
    ["R8", "R8tousyo", "06_R8_ippan_mokutekibetu.pdf", [8, 9, 10, 12]],
    ["R7", "14591120250213", "06_R7_ippan_mokutekibetu.pdf", [8, 9, 10, 11, 13]],
    ["R6", "R06tousyo", "06_R6_ippan_mokutekibetu.pdf", [10]],
    ["R5", "2023_tosho_yosan", "07_R5_ippan_soukatsuhyo.pdf", [10]],
    ["R4", "2022_tosho_yosan", "07_R4_ippan_soukatsuhyo.pdf", [10]],
    ["R3", "2021_tosho_yosan", "07_R3_ippan_soukatsuhyo.pdf", [10]],
    ["R2", "2020_tosho_yosan", "05_R2_ippan_soukatsuhyo.pdf", [10]],
    ["H31", "2019_tosho_yosan", "05_H31_ippan_soukatsuhyo.pdf", []],
  ] as const).map(([fy, page, file, cont]) => ({
    id: `matsuyama-yosan-soukatsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 松山市一般会計当初予算総括表（目的別）`,
    publisher: "松山市",
    url: `https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/${page}.files/${file}`,
    landingPage: `https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "松山市（一般会計・団体コード382019）",
    // 「著作権・リンク等」（/aboutweb/copyright.html・更新日 2016-03-18・確認日 2026-08-22）。サイト全体の条項なので PDF に及ぶ。
    // ⚠ 市オープンデータサイトの「各会計別予算総括表」（CC-BY・R3〜R7 の XLSX）は**会計別の総額だけで款別を含まず**、
    //    利用規約も「オープンデータサイト内の対象データのみに適用」と自ら範囲を限る＝本 PDF には**及ばない**（§9g）。
    //    愛媛県カタログの「予算」9件はすべて県財政課の資料。
    // リンクは「原則として自由です」「本市の承諾は必要ありません」＋「トップページ以外のページへリンク設定すると…
    //    正常に表示されない場合があります」（告知であって依頼ではない。PDF 名指し・相談/連絡・フレーム禁止のいずれも無い）
    //    ＝§11h 第3〜4群 → `noDeepLink` は立てない（人が原文を読んで判断・2026-08-22）。
    license:
      "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 2,
      revenueHeading: "当初予算総括表",
      expenditureHeading: "当初予算総括表",
      ...(cont.length ? { kanNameContinues: { revenue: [...cont] } } : {}),
      ...(fy === "R8" ? { kanNamePrefixStrip: "・", abolishedAwaitTail: { revenue: ["環境性能割"] } } : {}),
    },
  })),

  ...([
    // 市川市（千葉県・団体コード 122033）。「一般会計予算」（議案・400p 超）の「歳入歳出予算事項別明細書 総括」。
    // R8〜R6 は物理=印字（p.17 歳入 / p.18 歳出）。**R5〜R3 は A3 見開き2面付け**で物理 p.9/10（R5）・p.8/9（R4・R3）。
    // ⚠ 款番号が `1.`（ピリオド付き）の**単独行**で、款名＋金額は次行 → 既存の款行判定に当たらない。
    //    **`kanNoless` で番号を捨てて読む**（岡山 §9i 型・kanNo は null）。パーサで `\.?` を許せば番号を保てる（未実装・§13-2）。
    // ⚠⚠ 歳入は見出し行 `歳 入` が款1 に連結する（`歳入市税`）→ `revenueHeaderExtra: "^歳入$"`。
    //    歳出は款1 の番号行に単位が同居する（`1.  千円 千円 千円`）→ `^[0-9]+[.](千円)+$` で捨てる。
    //    どちらも **Σ は差0 のまま素通りする型**（款名の全件目視が網）。
    // ⚠ 廃止款「△ 環境性能割交付金」（R8）は △ が単独行・当年度セルが `―`（U+2015）→ `dashAsZero` で 0。
    //    無いと当年度Σが +176,000 で止まる（ゲートが捕まえる型）。
    // 款体系は総務省の目的別標準＋**観光費**（款8・市川市固有）。歳入の地方交付税は象徴計上 1千円。
    // 前年度列は**当初**（R8↔R7 … R4↔R3 の5リンクで 35款全件一致・偵察が実測）。
    // ⚠ **R2 は予算書が非テキスト**（Type3 フォント）。「当初予算の概要」p.7/8 で読めるが廃止款が
    //    `.自動車取得税交付金` のまま Σ 差0 で通る（`kanNamePrefixStrip` は1文字しか剥がさない）ので**入れない**（§13-2）。
    //    H31 以前は現行サイトに無い（Wayback に旧 URL あり・未検証・年度延伸なので未着手）。
    // [年度, attachment 番号, 歳入ページ, 歳出ページ]
    ["R8", "41372", 17, 18],
    ["R7", "5288", 17, 18],
    ["R6", "8731", 17, 18],
    ["R5", "5364", 9, 10],
    ["R4", "5331", 8, 9],
    ["R3", "8783", 8, 9],
  ] as const).map(([fy, att, revPage, expPage]) => ({
    id: `ichikawa-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 市川市一般会計予算（歳入歳出予算事項別明細書 総括）`,
    publisher: "市川市",
    url: `https://www.city.ichikawa.lg.jp/uploaded/attachment/${att}.pdf`,
    // ⚠ 旧 URL（/fin01/1111000080.html・/fin01/1111000093.html）は 301 で /page/ へ飛ぶ。**旧 URL のまま登録すると
    //    Wayback は 2015 年の旧サイト捕捉（当該年度の PDF を含まない）を「登録済み」にする**（レビューが発見）ので、
    //    リダイレクト先を landingPage にする。
    landingPage: fy === "R8"
      ? "https://www.city.ichikawa.lg.jp/page/3174.html"
      : "https://www.city.ichikawa.lg.jp/page/4121.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "市川市（一般会計・団体コード122033）",
    // 「このサイトのご利用について」（/page/2414.html・更新日 2025-10-23・確認日 2026-08-22）。
    // ⚠ オープンデータカタログ（/page/4744.html）の CC BY 4.0 は「本サイトで公開している情報」に自ら範囲を限り、
    //    43データセットに予算/決算/財政は0件（実検索）→ 本 PDF には**及ばない**（§9g）。
    // リンクは「トップページへのリンクは原則フリー」＋「利用者の利便性が向上する場合には、市の特定のページへの
    //    リンクも認めます」＋フレーム表示は削除依頼＝§11h 第3群寄り（「トップページ」言及の境界型）→ `noDeepLink` は立てない。
    license:
      "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "総括",
      expenditureHeading: "歳出",
      kanNoless: true,
      dashAsZero: true,
      revenueHeaderExtra: "^歳入$",
      expenditureHeaderExtra: "^[0-9]+[.](千円)+$",
    },
  })),

  // ---- 中核市 第2弾の見送り2市（2026-08-22・loop.md の第3巡・#226 のパーサ改修後）----------------
  ...([
    // 宇都宮市（栃木県・中核市・団体コード 092011）。財政課「当初予算案の大綱」巻末【参考資料】の
    // 「一般会計（歳入）」「一般会計（歳出：目的別）」。印字ノンブルと物理ページのズレは年度で +2〜+5 と動く（下表が正）。
    // ⚠ 歳入は**款番号なし**（`kanNoless`）で、自主財源/依存財源の**小計行**を `revenueHeaderExtra` で落とす
    //    （落とし忘れは Σ 2倍で止まる）。歳出は款番号 1〜14 あり・折返しなし。
    // ⚠⚠ **歳入の款名は「上段2行＋名前欄が空の金額行」の折返しで下段が無い** → `kanNolessUpperOnly`（#226）。
    //    無いと kanNoless の分岐が下段を待って次の款の上段を食い、`地方消費税交付金ゴルフ場利用税` / `交付金` になる
    //    （**Σ 4系統差0 のまま**・R8〜R3 は2款・R2 は3款・H31 は4款・H30 以前は5款が壊れる＝最も危険な型）。
    // ⚠ `dashAsZero` は**付けない**。皆減行（R8 環境性能割交付金 `－ － 211,000 … 皆減`・R2 自動車取得税）は
    //    abolished 分岐が当年度0/前年度 211,000 と正しく読む。付けると ints=[0,0,…] で前年度が 0 になり
    //    前年度Σが −211,000（R8）/ −232,000（R2）ずれる（偵察が実測）。
    // ⚠⚠ **R3 は未収録** — R3 の大綱は**議会修正前の「案」**（229,000,000）で、可決された当初は修正後 229,140,000
    //    （同ページ `r3teisei.pdf`「令和３年第２回市議会定例会予算（修正案）総括表」）。R4 大綱の前年度列・統計書 17-3 は
    //    どちらも修正後なので、R3 を入れると derive の年度間クロスチェーンが R4↔R3 で割れる（歳入4款・歳出 教育費 +140,000）。
    //    `unrecordable.ts`（format-mismatch）に記録。修正後の款別は統計書 17-3 XLSX にある（別様式・未収録）。
    // 前年度列は**当初**（両年度とも列見出しが「当初予算」。R8→R7 … H29→H28 の全隣接ペアで歳入歳出とも全款一致・偵察が実測）。
    // ⚠ 年度 URL は規則なし（ファイル名が毎年違う・下表）。年度一覧は `1010664.html` に H16〜R8 が1ページ。
    // [年度, ファイル名, 歳入ページ, 歳出ページ]（物理）
    ["R8", "r8yosantaikou.pdf", 66, 68],
    ["R7", "r7yosantaikou.pdf", 105, 107],
    ["R6", "r6yosantaikou-2.pdf", 106, 108],
    ["R5", "r5yosantaikou2.pdf", 86, 88],
    ["R4", "r4yosanntaikou.pdf", 66, 68],
    // R3 `03taikou.pdf`（68/70）は案のため未収録（上記）
    ["R2", "r2taikou.pdf", 62, 64],
    ["H31", "31taikou2.pdf", 60, 62],
    ["H30", "30taikou.pdf", 58, 60],
    ["H29", "29yosantaikou.pdf", 58, 60],
    ["H28", "28toushoyosanannotaikou.pdf", 58, 60],
  ] as const).map(([fy, file, revPage, expPage]) => ({
    id: `utsunomiya-yosan-taikou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 宇都宮市当初予算案の大綱（参考資料 一般会計 歳入／歳出：目的別）`,
    publisher: "宇都宮市",
    url: `https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/${file}`,
    landingPage: "https://www.city.utsunomiya.lg.jp/shisei/johokokai/zaisei/1010664.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "宇都宮市（一般会計・団体コード092011）",
    // 「著作権等について」（/about/1010747.html・更新日 2024-03-08・確認日 2026-08-22）。サイト全体の条項で大綱 PDF に及ぶ。
    // ⚠ オープンデータカタログ（CKAN・全295件）に予算・決算・財政は0件（実検索）＝CC BY は大綱に及ばない（§9g）。
    //    ⚠ 市統計書「17-3 一般会計予算額及び決算額」XLSX は掲載ページが CC BY を宣言する**別資料**（八王子型の open）。
    //    **本エントリの license を流用しない／統計書の CC BY を本エントリに書かない**。
    // リンクは「リンクは自由です…特にお知らせいただく必要はありません。リンク先は原則としてトップページへお願いしますが、
    //    必要なページに直接リンクしても構いません」（/about/1008437.html）＝直リンクを明示的に許容 → `noDeepLink` 不要。
    license:
      "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計（歳入）",
      expenditureHeading: "一般会計（歳出：目的別）",
      kanNoless: true,
      kanNolessUpperOnly: true,
      revenueHeaderExtra: "自主財源|依存財源",
    },
  })),

  ...([
    // 西宮市（兵庫県・中核市・団体コード 282049。⚠ 兵庫県は歳入款別がウェブに無く収録不可だが市は別サイト）。
    // 財政課「当初予算の概要」（19p）の p.4「■２．一般会計歳入予算の概要」22款 / p.8「■３．（１）目的別内訳」14款
    // （物理＝印字 +2）。R8〜R1・H30・H29 の10年度が完全同型。
    // ⚠ 款番号なし → `kanNoless`。合計ラベルは「計」の一字。
    // ⚠ 表の前に本文段落があり、句読点なしで改行された行（R7「…120億3,474万」）が款として拾われる →
    //    HeaderExtra `[、。]|\d億`（R7 は外すと歳出 Σ +31 で止まる）。
    // ⚠⚠ **歳出は款名が単独行で、金額行の名前欄に原典の注記「（市議会運営のために）」が来る**（14款すべて）。
    //    `kanNameSuffixStrip.expenditure: "（[^）]*に）$"` で落とす（#226）。無いと `議会費（市議会運営のために）` が
    //    **Σ 差0・validate の款名ゲートも素通り**で画面に出る。
    // ⚠ **H30 は合計行の同点**（本文「…16億9,924万1千円の」が「会計」の『計』を含み整数3個）。#226 で同点時は
    //    ラベルで始まる行を優先するようにして通った（偵察時は款0件で throw していた）。
    // ⚠ 歳出款6 は原典が `農林水産費`（総務省標準の 農林水産業費 ではない）。寄せない。
    // ⚠ R7 の概要は「修正後」（223,329,255）。記者発表の主要事業 p.4 は修正前 222,663,230 なので混ぜない。
    // ⚠ R4 のファイル名は `toushohosei` だが p.1 は「令和４年度 当初予算の概要」（偵察が実測）。R1 は表紙「平成３１年度」だが
    //    年度ページは `r1yosanannogaiyou`（令和元年度）＝発行元の呼称に従い R1。
    // 前年度列は**当初**（R8→R7 … R2→R1 で全款一致・H29 の前年度合計は H28 オープンデータ CSV の Σ と一致・偵察が実測）。
    // [年度, 年度ページ, ファイルディレクトリ, PDF ファイル名]
    ["R8", "R8yosan", "R8yosan.files", "R8yosannogaiyou.pdf"],
    ["R7", "R7yosanan", "R7yosanan.files", "R7gaiyou.pdf"],
    ["R6", "R6yosan", "R6yosan.files", "R6yosannogaiyou.pdf"],
    ["R5", "20230203091643212", "20230203091643212.files", "R5.toushoyosan_gaiyo.pdf"],
    ["R4", "20220209144503509", "20220209144503509.files", "R4.toushohosei_gaiyo.pdf"],
    ["R3", "R3yosannogaiyou", "R3yosannogaiyou.files", "R3.toushoyosan_gaiyo.pdf"],
    ["R2", "R2yosannogaiyou", "R2yosannogaiyou.files", "R2toushoyosannogaiyo.pdf"],
    ["R1", "r1yosanannogaiyou", "r1yosanannogaiyou.files", "H31tousyoyosannogaiyo1900320.pdf"],
    ["H30", "H30yosannogaiyou", "H30yosannogaiyou.files", "H30yosannogaiyou1.pdf"],
    ["H29", "h29yosangaiyo", "h29yosangaiyo.files", "H29yosannogaiyou1.pdf"],
  ] as const).map(([fy, page, dir, file]) => ({
    id: `nishinomiya-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 西宮市当初予算の概要（一般会計歳入・歳出予算の概要）`,
    publisher: "西宮市",
    url: `https://www.nishi.or.jp/shisei/zaiseijoho/yosan/${dir}/${file}`,
    landingPage: `https://www.nishi.or.jp/shisei/zaiseijoho/yosan/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "西宮市（一般会計・団体コード282049）",
    // 「サイトポリシー」（/aboutweb/sitepolicy.html・更新日 2025-08-19・確認日 2026-08-22）の「著作権について」。
    //    サイト全体の条項なので本 PDF に及ぶ。PDF 自体に利用条件の記載は無い。
    // ⚠ オープンデータカタログ（opendata.nishi.or.jp・PDL1.0）に「財政情報（予算の概要）」（d_id 90020）が登載されているが
    //    **ファイルは無く、関連リンクで予算の概要 index を指すだけ**。規約は「本サイトで掲載・発信している情報」が対象で、
    //    本 PDF は本体サイト配信＝愛媛・八王子型の「ファイル直リンク単位の登載」ではない → 保守的に要許可のまま（§9g）。
    //    同カタログの「西宮市当初予算データ」CSV（款項目節・H28〜R8）は**本サイト配信で open**＝別資料（§13-2）。
    // リンクは「個別のページへのリンクを設定していただいてもかまいません」＋事後連絡の依頼＋フレーム遠慮
    //    ＝§11h 第3群＋第5群（船橋・山口型）→ `noDeepLink` は立てない。
    license:
      "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 8,
      revenueHeading: "一般会計歳入予算の概要",
      expenditureHeading: "目的別内訳",
      revenueTotalLabel: "計",
      expenditureTotalLabel: "計",
      kanNoless: true,
      revenueHeaderExtra: "[、。]|\\d億",
      expenditureHeaderExtra: "[、。]|\\d億",
      kanNameSuffixStrip: { expenditure: "（[^）]*に）$" },
    },
  })),

  // ---- 中核市 第3弾（2026-08-22・loop.md の第4巡）------------------------------------------------
  ...([
    // 大分市（大分県・中核市・団体コード 442011。⚠ 大分県 440001＝`oita-ken-*` とは別団体）。
    // 財政課「当初予算（案）の概要」p.3 歳入 23款 / p.4 歳出 13款（印字 -2-/-3-・⚠ R5・R4 は p.2 が白紙で p.4/p.5）。
    // 款番号なし（`kanNoless`・岡山 §9i 型）。歳入は自主財源①／依存財源②の小計行を HeaderExtra で落とす（合計は `合 計（①+②）`）。
    // ⚠⚠ **歳出は表の左端に縦書きの表側ラベル「目的別」「性質別」があり、款名の頭に1文字混入する**（`目民生費`・`的商工費`・
    //    `別災害復旧費`＝毎年同じ3款・**Σ 差0 のまま素通り**・岡山型）→ `kanNamePrefixStrip: "目的別"`。単独行の
    //    `目`/`的`/`別`/`性`/`質` は HeaderExtra で捨てる。同じ p.4 の下段に性質別の表（計が4回）が続くが、合計ラベル「計」は
    //    目的別の「計」（最初の行・同点の先勝ち）が採られて Σ 差0（10年度で実測）。
    // ⚠⚠ **R6・R2 は前年度列が「6月補正後予算」**（列見出しに明記。前年の R5・H31 が市長選の骨格予算のため）。パーサの自動判定は
    //    「補正後予算額」の語しか見ないので「当初」に落ちる → `prevBasis: "補正後"` を明示（札幌 R6・R2 型）。
    //    裏取り: R5 6月補正の概要 203,142,000 + 13,000,000 = 216,142,000 = R6 の前年度合計、令和元年度 6月補正
    //    175,041,000 + 10,517,000 = 185,558,000 = R2 の前年度合計（偵察が実測）。
    // ⚠ 「予算に関する説明書」の総括は使えない（R8 は歳出が全文字二重描画・R6/R5 はアウトライン化＝大分県 §11j 型。R7・R4 だけ
    //    読め、概要と全款一致を偵察が実測）。
    // ⚠ **H28 以前は収録不可**（H28・H27・H24 は複合機スキャン＝テキスト層なし、H26・H25 は Canon OCR で見出しと金額が破損）。
    // 概要は「（案）」表記だが、議決結果一覧で R8・R7 とも「可決」（修正なし）を偵察が確認。R6 以前の議決は未確認。
    // 年度ページ・ファイル名は毎年不規則（下表）。H30 は `/o032/1.html`・H29 は `/o032/shisejoho/kekakuzaise/...` と階層も違う。
    // [年度, 年度ページ（/o032/ 以下）, PDF（/o032/ 以下）, 歳入p, 歳出p, 前年度の基準]
    ["R8", "r8tousyo-r7_3hosei", "documents/r8tousho-gaiyou.pdf", 3, 4, "当初"],
    ["R7", "r7tousyo-r6_3hosei", "documents/2r7tousho-gaiyou.pdf", 3, 4, "当初"],
    ["R6", "r6tousyo-r53hosei-teian", "documents/2tosyo-gaiyo.pdf", 3, 4, "補正後"],
    ["R5", "r5tousyo-r4_3hosei", "documents/r5tousyogaiyou.pdf", 4, 5, "当初"],
    ["R4", "r4tousyor33hosei", "documents/r4tousyogaiyou.pdf", 4, 5, "当初"],
    ["R3", "r3tousyor23hosei", "documents/r3gaiyou.pdf", 3, 4, "当初"],
    ["R2", "r2tousyor103hosei", "documents/r2gaiyou.pdf", 3, 4, "補正後"],
    ["H31", "31tousyo3003hosei", "documents/31tousyogaiyou.pdf", 3, 4, "当初"],
    ["H30", "1", "documents/30toushogaiyou.pdf", 3, 4, "当初"],
    ["H29", "shisejoho/kekakuzaise/1490605744697", "shisejoho/kekakuzaise/documents/29tousyogaiyou.pdf", 3, 4, "当初"],
  ] as const).map(([fy, page, file, revPage, expPage, basis]) => ({
    id: `oita-shi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 大分市当初予算（案）の概要（一般会計歳入・歳出）`,
    publisher: "大分市",
    url: `https://www.city.oita.oita.jp/o032/${file}`,
    landingPage: `https://www.city.oita.oita.jp/o032/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "大分市（一般会計・団体コード442011）",
    // 「著作権・免責事項」（/1000000010005/1000000010005.html・更新日 2022-08-10・確認日 2026-08-22）＝サイト全体の条項で本 PDF に及ぶ。
    // ⚠ 大分市オープンデータ利用規約（BODIK・CC BY 互換）は「掲載サイトで**オープンデータとして公開している情報**」だけが対象で、
    //    一覧表 CSV（1,551件）に予算・決算の名称は0件（当たるのは統計書 18章の XLSX＝予算現額と市税概要のみ）→ 本 PDF には
    //    **及ばない**（§9g）。
    // リンクは「原則としてリンクフリー…リンク承認についてのメール等は不要」＋「トップページ以外のページへリンク設定すると…
    //    正常に表示されない場合があります」（注意喚起のみ・依頼文なし）＝§11h 第2群/第3群の境界（鹿児島・川口・松山型）
    //    → `noDeepLink` は立てない（人が原文を読んで判断・2026-08-22）。
    license:
      "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "計",
      kanNoless: true,
      revenueHeaderExtra: "自主財源|依存財源",
      expenditureHeaderExtra: "^[目的別性質]$",
      kanNamePrefixStrip: "目的別",
      ...(basis === "補正後" ? { prevBasis: "補正後" as const } : {}),
    },
  })),

  ...([
    // 東大阪市（大阪府・中核市・団体コード 272272。⚠ 大阪府・大阪市とは別サイト）。
    // 「一般会計予算」（予算書・248p）の歳入歳出予算事項別明細書「１ 総括」。R8 歳入 p.12 / 歳出 p.13（印字 +2）・R7 p.11 / p.12。
    // ⚠ 同ページの「予算の概要」（R8yosangaiyou.pdf）は**性質別・財源別で款別ではない** — 取り違えない。
    // 見出しは「（歳  入）」「（歳  出）」（総括の直下）。合計ラベルは既定。歳出は右に財源内訳4列が続くが先頭2整数で読める。
    // 歳出は11款で **産業費・諸支出金** を持つ（原典どおり・標準款へ寄せない）。
    // ⚠⚠ **R6・R5・R4 は収録不可** — 同型の総括ページが**文字をアウトライン化した図形**（内容ストリームが m/l/c のパスのみ・
    //    Tj はノンブル1個・画像0枚＝大分県 §11j 型）で pdftotext にテキスト層が無い。R4 予算書は現行サイトから消えて WARP
    //    （2024-08）のみ。**R3 以前は予算書自体が未掲載**（概要＝性質別のみ）＝款別なし。`unrecordable.ts` に記録。
    // ⚠ ファイル名は 2026-07-02 のサイト改修で一斉に付け替えられた（R7 の旧 `R7tousyo_ippannyosannsyo.pdf` は 404）。landing は
    //    掲載年度を4年分に刈る運用なので、消えたら WARP へ。同じ landing に補正予算の予算書（`_H<月>_`）が並ぶ＝`_T_` が当初。
    // 前年度列は**当初**（R8 の前年度列＝R7 の本年度列が 31款すべて一致・R7 の前年度合計は R6「会計別予算額の状況」と一致・偵察が実測）。
    // [年度, ファイル名, 歳入ページ, 歳出ページ]
    ["R8", "R8yosan_T_I.pdf", 12, 13],
    ["R7", "R7yosan_T_I.pdf", 11, 12],
  ] as const).map(([fy, file, revPage, expPage]) => ({
    id: `higashiosaka-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 東大阪市一般会計予算（歳入歳出予算事項別明細書 総括）`,
    publisher: "東大阪市",
    url: `https://www.city.higashiosaka.lg.jp/cmsfiles/contents/0000000/529/${file}`,
    landingPage: "https://www.city.higashiosaka.lg.jp/0000000529.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "東大阪市（一般会計・団体コード272272）",
    // 「市ウェブサイト」（/site_policy/0000000006.html・ページ日付 2025-01-30・確認日 2026-08-22）の「著作権について」＝
    //    サイト全体の条項で cmsfiles 配信の予算書 PDF に及ぶ。
    // ⚠ オープンデータカタログ（BODIK 272272・27件・CC BY 4.0）に予算・決算・財政は0件（CKAN API で実検索）→ 及ばない（§9g）。
    // ⚠ **`noDeepLink` を立てた**（人が原文を読んで判断・2026-08-22）: 「リンクされる場合は、**原則としてトップページ**
    //    (https://www.city.higashiosaka.lg.jp)にお願いします」＝§11h **第2群**（長崎「原則、トップページとしてください」と同型）。
    //    事後連絡の依頼（第5群）も併記されているが判断の主は第2群。鹿児島・川口・松山・大分の「できるだけ／注意喚起」型より強い。
    noDeepLink: true,
    license:
      "東大阪市ウェブサイトに掲載されているすべてのコンテンツ(文書、画像、イラストなど)の著作権は、東大阪市または原著作者に帰属します。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（歳",
      expenditureHeading: "（歳",
    },
  })),

  ...([
    // 尼崎市（兵庫県・中核市・団体コード 282022。⚠ 兵庫県は歳入款別がウェブに無く収録不可だが市は別サイト）。
    // 財政課「当初予算の概要（数値編）」の「３ 一般会計歳入予算額①」（p.5・21款）／「５ 一般会計歳出款別予算額」（p.7・14款）。
    // R8〜R2 は本編と数値編が別 PDF（物理＝印字）。H31 以前は概要1冊で同じ表が p.28/30（H25 は p.27/29・印字 −2）。
    // R8〜H25 の14年度が完全同型（同じ opts で Σ 4系統差0・款名クリーン・偵察が全年度に try-parse を当てて実測）。
    // ⚠⚠ **右端の「増減額の主な理由」欄が款名を汚す**。理由欄の折返し行（金額を持たない日本語だけの行・字下げ 60桁超）が
    //    款名の上段折返しとして拾われ、`生臨時交付金国庫支出金`（R8 款40）・`阪神水道企業団補助金諸支出金`（R8 款60）・
    //    `新型コロナウイルス感染症対策地方特例交付金`（R3 款19）になる（**Σ は差0 のまま素通り**・H31 だけ偶然クリーン）。
    //    → `kanIndentMax: 10` で字下げ超過の行を款パースから外す（款行は全年度とも行頭0桁）。本来は「款項混在」用の opt-in だが
    //    コード上は字下げしか見ないので使える。**`CropX` では救えない**（増減の数字右端と理由欄左端の間隔が全28ページで
    //    2.2〜2.8pt しかなく、境界に重なる語が残る＝`人件費議会費` を実測）。
    // ⚠ 款番号は連番でなく 05,10,11,…,75 / 05,…,65 のコード（原典どおり・姫路型）。款53 災害復旧費は全年度 1千円の名目計上。
    //    歳入款55 は原典が `寄付金`（寄附金ではない・寄せない）。
    // ⚠ R2 歳入款17 自動車取得税交付金は廃止年（当年度 `-`・伸率「皆減」）で款名が `自動車取得税交付金--皆減` になる →
    //    `kanNameSuffixStrip.revenue: "-+皆減$"`（0 / 152,000）。`dashAsZero` は前年度まで 0 になり前年度Σ −152,000 なので使わない。
    // ⚠ 数値編 p.6 の「４ 一般会計歳入予算額②」は自主/依存財源の再集計で款別ではない（見出しゲートが弾く）。
    // 前年度列は**当初**（R8→R7 … H26→H25 の13ペアで歳入・歳出の全款が一致・偵察が実測）。
    // 年度ページ ID・ファイル名は毎年不規則（下表）。
    // [年度, 年度ページ ID, _page_ 配下ディレクトリ, ファイル名, 歳入ページ, 歳出ページ]
    ["R8", "1042785", "001/042/785", "R8tousyoyosannnogaiyou-suuchihenn.pdf", 5, 7],
    ["R7", "1040305", "001/040/305", "R7gaiyousuchi.pdf", 5, 7],
    ["R6", "1036379", "001/036/379", "R6yosannogaiyou02.pdf", 5, 7],
    ["R5", "1033321", "001/033/321", "R5suuchihen.pdf", 5, 7],
    ["R4", "1028205", "001/028/205", "suutihenn.pdf", 5, 7],
    ["R3", "1024209", "001/024/209", "R3touyoyosan_suuti.pdf", 5, 7],
    ["R2", "1020112", "001/020/112", "2-1yosannogaiyou.pdf", 5, 7],
    ["H31", "1015606", "001/015/606", "201902151054.pdf", 28, 30],
    ["H30", "1009184", "001/009/184", "30.pdf", 28, 30],
    ["H29", "1008210", "001/008/210", "yosannnogaiyou.pdf", 28, 30],
    ["H28", "1008212", "001/008/212", "h28toushoyosannogaiyou.pdf", 28, 30],
    ["H27", "1008214", "001/008/214", "h27toushoyosannogaiyou.pdf", 28, 30],
    ["H26", "1008216", "001/008/216", "h26toushoyosannnogaiyou.pdf", 28, 30],
    ["H25", "1008218", "001/008/218", "yosannnogaiyou.pdf", 27, 29],
  ] as const).map(([fy, page, dir, file, revPage, expPage]) => ({
    id: `amagasaki-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 尼崎市当初予算の概要（${fy.startsWith("R") ? "数値編・" : ""}一般会計歳入予算額／歳出款別予算額）`,
    publisher: "尼崎市",
    url: `https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/${dir}/${file}`,
    landingPage: `https://www.city.amagasaki.hyogo.jp/shisei/si_zaisei/yosan/gaiyou/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "尼崎市（一般会計・団体コード282022）",
    // 「このサイトのご利用について」＞著作権について（/siteinfo/site/howtouse.html・更新日 2026-02-03・確認日 2026-08-22）。
    //    サイト全体の条項なので本 PDF に及ぶ。PDF 自体に利用条件の記載は無い。
    // ⚠ 尼崎市オープンデータ利用規約（CC BY 4.0）は「オープンデータ カタログサイトに掲載する…情報」に自ら範囲を限る。カタログ
    //    （204件）の当初予算は **H27〜H23 だけ**（`_res/common/opendata/…/resourceNNNNN.PDF` の別 URL・H27 は本 PDF と sha256 一致）で
    //    **R8〜H28 は非登載＝CC BY は及ばない**（§9g）。H27 以前を open にするならカタログ側 URL で別エントリ（八王子型・未着手）。
    // リンクは「原則自由です。ただし、フレーム内に…表示するようなリンクの設定はご遠慮ください」＝§11h 第3群（姫路型）→ `noDeepLink` 不要。
    license:
      "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計歳入予算額①",
      expenditureHeading: "一般会計歳出款別予算額",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanIndentMax: 10,
      ...(fy === "R2" ? { kanNameSuffixStrip: { revenue: "-+皆減$" } } : {}),
    },
  })),

  ...([
    // 福山市（広島県・中核市・団体コード 342076。広島県・広島市とは別サイト）。
    // 財政課「予算参考資料（福山市の財政状況）」（2月・議案段階）の「２．一般会計当初予算款別比較表(歳入)」22款 /
    // 「３．一般会計当初予算款別比較表(歳出）」14款。物理＝印字 +3（p.5/p.6）、目次の次に白紙・合紙が挟まる年度は +4（p.6/p.7）。
    // ⚠⚠ **款番号が `(１)`〜`(22)` の括弧書き** → `kanNoParenthesized`（#13-4 で追加・opt-in）。偵察案の `CropX` で款番号の
    //    列を切る方式は余裕 1.5〜4.5pt で版面が動くと `)教育費` が残る（Σ 差0 の静かな型）ので採らなかった。
    // ⚠⚠ 列見出し「款 別」は `KAN_HEADER_RE` に当たらず款1 に連結する（`款別市税`・Σ 差0 のまま）→ HeaderExtra `^款別$`（両側）。
    // ⚠ 歳入は款22 市債の下に内訳行「うち臨時財政対策債」「そ の 他」が続く（R8 はダッシュ）→ `revenueHeaderExtra` で落とす
    //    （落とさないと `その他` を款として拾い Σ +8,664,100 で止まる）。歳入合計の下の自主/依存財源の再集計は合計で打ち切られる。
    // ⚠ 見出し語は**歳入が半角括弧 `(歳入)`・歳出が半角開き＋全角閉じ `(歳出）`**（全年度同じ・原文どおり）。
    // ⚠ R2 歳入の廃止款は `（自動車取得税交付金）  -  -  263,000 … 皆減`（括弧書き・款番号なし）→ kanNo null・括弧は原典。
    //    R2 款6 法人事業税交付金・R1 款9 環境性能割交付金は皆増で前年度 0。H30 は 21款。
    // ⚠⚠ **ファイル URL は掲載ページを更新するたびに付け替わる**（`uploaded/life/<ページID>_<ファイルID>_misc.pdf`・補正予算を
    //    追記するたびに旧 URL は 404。R8 は `391108_2401272` → `400655_2463920` を偵察が実測）。fetch 後すぐ archive し、
    //    切れたら landingPage（年度ページ・安定）から取り直す。Wayback に PDF 本体の捕捉は無い（R5 は 17MB で打ち切り捕捉）。
    // 前年度列は**当初**（列見出しが両年度「当初予算額」。R8→R7 … R1→H30 の8ペアで歳入歳出とも全款一致・偵察が実測）。
    //    この資料は議案段階だが翌年度資料の前年度列が一致するので R7 以前に議会修正は無い（R8 は R9 資料が出るまで確定できない）。
    // [年度, 年度ページ ID, ファイル ID, 歳入ページ, 歳出ページ]
    ["R8", "391108", "400655_2463920", 5, 6],
    ["R7", "358060", "393859_2419579", 5, 6],
    ["R6", "322016", "360984_2171418", 5, 6],
    ["R5", "287840", "324957_1908110", 5, 6],
    ["R4", "252189", "289395_1651660", 6, 7],
    ["R3", "215752", "347577_2070797", 6, 7],
    ["R2", "175041", "223768_1120938", 5, 6],
    ["R1", "178982", "347574_2070688", 6, 7],
    ["H30", "145698", "347578_2070867", 6, 7],
  ] as const).map(([fy, page, file, revPage, expPage]) => ({
    id: `fukuyama-yosan-sankou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 福山市予算参考資料（福山市の財政状況）— 一般会計当初予算款別比較表（歳入・歳出）`,
    publisher: "福山市",
    url: `https://www.city.fukuyama.hiroshima.jp/uploaded/life/${file}_misc.pdf`,
    landingPage: `https://www.city.fukuyama.hiroshima.jp/soshiki/zaisei/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "福山市（一般会計・団体コード342076）",
    // 「このホームページについて」（/site/userguide/16651.html・掲載日 2025-09-25 更新・確認日 2026-08-22）の「著作権について」。
    //    サイト全体の条項なので本 PDF に及ぶ。PDF 自体に利用条件の記載は無い。
    // ⚠ オープンデータカタログ（CKAN・56件・PDL1.0）を 予算/決算/財政 で API 検索して0件、一覧 CSV も0件＝及ばない（§9g）。
    // リンクは「原則として自由ですが、トップページへの設定をお願いします。トップページ以外に設定された場合は…リンク切れに
    //    なる場合があります」＝相談・連絡の要求なし・鹿児島・川口・松戸と同じ「お願い」の境界型 → `noDeepLink` は立てない
    //    （人が原文を読んで判断・2026-08-22。東大阪「原則としてトップページにお願いします」は立てた — 「原則として」の
    //    かかり先がリンク先の限定か自由の限定かで読み分けた）。
    license:
      "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計当初予算款別比較表(歳入)",
      expenditureHeading: "一般会計当初予算款別比較表(歳出）",
      kanNoParenthesized: true,
      revenueHeaderExtra: "^款別$|うち臨時財政対策債|^その他",
      expenditureHeaderExtra: "^款別$",
    },
  })),

  ...([
    // 倉敷市（岡山県・中核市・団体コード 332020。岡山県・岡山市は収録済みだが別サイト・別団体）。
    // 財政課「当初予算（案）の概要」（概要版）p.3「３ 一般会計（１）歳入」22款 / p.4「（２）歳出（目的別）」13〜14款（物理＝印字）。
    // ⚠ 歳入は**款番号なし**（岡山型 `kanNoless`）。左端に縦書きの表側ラベル「自主財源／依存財源」（x=51.6〜62.6pt）があり、
    //    `-layout` で款名の頭に `自 主 財 源 依 存` が1文字ずつ紛れる（`自使用料及び手数料`・`源市債`・年度でどの行に落ちるかが動く）。
    //    款名は x=71.5pt〜なので **`revenueCropX {65,595}` で帯ごと切る**（`kanNamePrefixStrip` は `財産収入`→`産収入` を
    //    巻き添えにするので使わない・偵察が実測）。
    // ⚠ 歳入に「うち 財政調整基金繰入金」等の内訳行と「小計」2行 → `revenueHeaderExtra: "^一般会計$|^うち|小計"`
    //    （`^一般会計$` は p.3 冒頭の「３ 一般会計」が crop 後に款1 の頭へ連結するのを防ぐ・無いと `一般会計市税`）。
    // ⚠⚠ **皆増・皆減で片側セルが空欄の行は整数1個**（R8 歳入 `環境性能割交付金 190,000 0.1 皆減`・R4 歳出 `災害復旧費 651,191 0.3 皆減`）。
    //    #13-4 でパーサが [x, x] に詰めて既存の皆増/皆減処理に乗せるようにした（改修前は静かに落ちて前年度Σの warning）。
    // ⚠⚠ **R7 は未収録** — 歳出 p.5 だけが「前年度額の行 → 款名＋当年度額の行 → 括弧書きの補正後比較の行」の3行組みで款行0件 throw
    //    （歳入 p.3 は読める）。`unrecordable.ts`（parser-unsupported）。p.4「（１）－２」と R3 の p.8/9「３－２」は**6月補正後との
    //    比較表**（市長選年度の肉付け予算）なので使わない。R2 は現行 404（WARP のみ）・H31 以前は Wayback＝年度延伸なので未着手。
    // ⚠ R3 年度ページの補正予算リンクは R6 のファイルを指している（CMS の誤り）。当初概要版 `r3gaiyo1.pdf` は p.1 が令和３年度で正しい。
    // 前年度列は**当初**（R8→R7 … R3→R2 の全隣接ペアで歳入歳出とも全款一致・偵察が実測。R6 は骨格予算の当初）。
    // [年度, _page_ 配下ディレクトリ, ファイル名, 年度ページ ID]
    ["R8", "001/021/840", "r8gaiyo.pdf", "1021840"],
    ["R6", "001/002/297", "r6gaiyo2.pdf", "1002297"],
    ["R5", "001/011/591", "r5gaiyo2.pdf", "1011591"],
    ["R4", "001/011/592", "r4gaiyo.pdf", "1011592"],
    ["R3", "001/011/594", "r3gaiyo1.pdf", "1011594"],
  ] as const).map(([fy, dir, file, page]) => ({
    id: `kurashiki-yosan-gaiyo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 倉敷市当初予算（案）の概要（一般会計 歳入／歳出：目的別）`,
    publisher: "倉敷市",
    url: `https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/${dir}/${file}`,
    landingPage: `https://www.city.kurashiki.okayama.jp/cityinfo/finance/1011778/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "倉敷市（一般会計・団体コード332020）",
    // 「著作権」（/about/1008316.html・更新日 2025-05-20・確認日 2026-08-22）。サイト全体の条項で概要版 PDF に及ぶ。
    //    同ページの CC-BY 条項は「CC の表示があるコンテンツ」限定で、予算ページに表示は無い（実測）。
    // ⚠ オープンデータ（kurashiki.dataeye.jp・PDL1.0）の「倉敷市_一般会計_予算」はリンク型リソース（ファイル無し）と歳出款別の
    //    当年度のみ CSV で、本 PDF は登載されていない＝PDL は及ばない（§9g・西宮型）。
    // リンクは「リンクは自由です。連絡は必要ありません。ただし、フレーム内に…表示させるリンク設定は行わないでください」
    //    （/about/1008317.html）＝§11h 第3群 → `noDeepLink` は立てない。
    license:
      "本サイト上のコンテンツは、倉敷市およびその他団体ならびに第三者が有する著作権により保護されております。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用等を希望される方は、各ページに記載されている担当所属へ、事前にご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      revenueHeaderExtra: "^一般会計$|^うち|小計",
      revenueCropX: { from: 65, to: 595 },
    },
  })),

  // ---- 中核市 第4弾（2026-08-23・loop.md の第5巡）------------------------------------------------
  ...([
    // 高松市（香川県・中核市・団体コード 372013。⚠ 香川県 370002 は収録済みだが別団体・別サイト・別様式）。
    // 財政課「当初予算の概要」（2月）の「２ 一般会計歳入予算款別表（前年度当初予算額対比）」23款 /
    // 「３ 一般会計歳出予算款別表（前年度当初予算額対比）」14款。**R8〜H21 の18年度が完全同型**
    // （偵察が18年度すべてに try-parse を当て、収録時に R8・R5・R2・H26・H21 を自分で当て直して確認）。
    // ⚠ ページは R8〜H27 が物理 p.4 / p.6（印字 +2）、**H26〜H21 だけ p.3 / p.4**（歳入・歳出の後ろの円グラフページが無い）。
    // ⚠ 合計ラベルは歳入歳出とも「合 計」＝`合計`（既定の「歳入合計/歳出合計」では合計行が見つからない）。
    // ⚠ 同じ PDF の p.5/p.7（自主財源・目的別の要約）と p.8（性質別分析表）も**合計が款別表と一致する**（香川県 §11k 型）。
    //    ページを取り違えても Σ は差0 になるが、**見出し語がゲートになって throw する**（偵察が H26 で実測）。
    // ⚠ 廃止款は款番号欄が空＋「皆減」（R5 諸支出金 0/185,200・R2 自動車取得税交付金 0/193,000・H31 諸支出金 0/1,155,000）で
    //    kanNo=null として正しく拾える（**前年度Σも差0**）。`dashAsZero` は不要。歳入款10 の上下2段の折返しも既存処理で復元。
    // ⚠ 骨格予算の年度は無い（R5＝市長選年度も通常予算・概要 PDF に「骨格」の語が0件）。
    // ⚠ 同じ概要が「市議会への提出議案」ページにも別 URL・別バイト列で置かれている（テキストは同一）。
    //    **財政課の年度ページ側を正とする** — 議案ページは会期ごとに URL が変わる。
    // 前年度列は**当初**（R8→R7 … H22→H21 の17ペア×歳入歳出＝34組すべて全款一致・偵察が実測）。
    // ⚠ 年度 URL の規則は壊れている（**R6 だけディレクトリが `r_6`**・ファイル名も年度ごとに不規則・下表が正）。
    // [年度, 年度ディレクトリ, landing の html, ファイルの相対パス, 歳入ページ, 歳出ページ]
    ["R8", "r8", "2026yosanhensei.html", "2026yosanhensei.files/R08_01gaiyou.pdf", 4, 6],
    ["R7", "r7", "2025yosanhensei.html", "2025yosanhensei.files/R07_01gaiyou.pdf", 4, 6],
    ["R6", "r_6", "2024yosannhensei.html", "2024yosannhensei.files/R06_01gaiyou.pdf", 4, 6],
    ["R5", "r5", "2023yosannhensei.html", "2023yosannhensei.files/R05_01gaiyou.pdf", 4, 6],
    ["R4", "r4", "2022yosannhensei.html", "2022yosannhensei.files/R04_01gaiyou.pdf", 4, 6],
    ["R3", "r3", "2021yosannhensei.html", "2021yosannhensei.files/R3_gaiyou.pdf", 4, 6],
    ["R2", "r2", "zaisei_up20191004.html", "zaisei_up20191004.files/R2_gaiyou_.pdf", 4, 6],
    ["H31", "2019", "2019yosanhensei.html", "2019yosanhensei.files/02_2019tousyogaiyou.pdf", 4, 6],
    ["H30", "h30", "yosanhensei_h30.html", "yosanhensei_h30.files/h30toushogaiyou.pdf", 4, 6],
    ["H29", "h29", "yosanhensei_h29.html", "yosanhensei_h29.files/29gaiyou.pdf", 4, 6],
    ["H28", "h28", "yosanhensei_28.html", "yosanhensei_28.files/28gaiyou.pdf", 4, 6],
    ["H27", "h27", "yosanhensei_27.html", "yosanhensei_27.files/24081_L21_27gaiyou.pdf", 4, 6],
    ["H26", "h26", "yosanhensei_26.html", "yosanhensei_26.files/26gaiyou.pdf", 3, 4],
    ["H25", "h25", "yosanhensei_25.html", "yosanhensei_25.files/25gaiyou.pdf", 3, 4],
    ["H24", "h24", "yosanhensei_24.html", "yosanhensei_24.files/24toushoyosannnogaiyou.pdf", 3, 4],
    ["H23", "h23", "yosanhensei_23.html", "yosanhensei_23.files/17278_L17_17278_h23_yosan_gaiyou.pdf", 3, 4],
    ["H22", "h22", "yosanhensei_22.html", "yosanhensei_22.files/13058_L17_13058_h22_yosan_gaiyou.pdf", 3, 4],
    ["H21", "h21", "yosanhensei_21.html", "yosanhensei_21.files/11406_L17_11406_h21_yosan_gaiyou.pdf", 3, 4],
  ] as const).map(([fy, dir, landing, file, revPage, expPage]) => ({
    id: `takamatsu-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 高松市当初予算の概要（一般会計歳入予算款別表／歳出予算款別表）`,
    publisher: "高松市",
    url: `https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/${dir}/${file}`,
    landingPage: `https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/${dir}/${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "高松市（一般会計・団体コード372013）",
    // 「このサイトについて」＞著作権について（/homepage/thissite.html・更新日 2018-03-01・確認日 2026-08-23）。
    //    サイト全体の条項なので本 PDF に及ぶ。PDF 自体に利用条件の記載は無い（18年度とも確認）。
    // ⚠ 「オープンデータたかまつ」（CKAN・全111件）を 予算/財政/款 で API 実検索して0件（決算は「市税決算状況」1件のみ）
    //    ＝本 PDF は非登載で CC BY は及ばない（§9g）。
    // リンクは「高松市ホームページは、リンクフリーです。」＋「トップページ以外のページへのリンクはアドレスが変わる可能性が
    //    ありますのでご注意ください」＝**注意喚起であって依頼ではない**（大分 §13-4 と同型・第4群寄り）→ `noDeepLink` は立てない。
    license:
      "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計歳入予算款別表",
      expenditureHeading: "一般会計歳出予算款別表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // 藤沢市（神奈川県・団体コード 142051）。「予算書及び予算説明書」の「歳入歳出予算事項別明細書 １ 総括」
    // （歳入22款・歳出13款・本年度/前年度の2列）。印字＝物理 −2。
    // ⚠⚠ **使ってはいけない資料が2つある**（同じ年度ページに並ぶ）: (a)「予算概要」は**歳出だけが款別**で歳入は集約7区分、
    //    (b) 同じ説明書の中の「第１表 歳入歳出予算」（p.13 前後）は**当年度のみで前年度列が無い**。⚠ (b) にも `（歳出）` の
    //    見出しがあるのでページを間違えると当たるが、款行が取れず **throw する**（偵察が実測・静かには壊れない）。
    // ⚠⚠ 歳出ページは款別表の右に財源内訳が同居し、その列見出しが款1 に連結する（`本年特国庫支出金県支出金議会費`・
    //    **Σ は差0 のまま**）→ `expenditureHeaderExtra` の3語で落とす。
    // ⚠ R4・R3・R2 の歳入款18 は原典が `寄付金`（R5 以降は `寄附金`）。金額は連続しているので**寄せない**（尼崎 §13-4 と同型）。
    // ⚠ R8 歳入款9 環境性能割交付金は本年度 **1千円**の象徴計上（前年度 274,000）。原典どおり。
    // ⚠⚠ **R2 の廃止款「自動車取得税交付金」は款番号も廃止マーカーも「皆減」の語も無い**（§9c の「記号すら無い」型）。
    //    既定では行ごと落ちて前年度Σ −229,000 → **`kanNoless: true` を R2 だけに付けると kanNo=null で拾えて Σ 4系統差0**
    //    （収録時に実測）。**同じ手が柏 R2 でも効いた**＝「記号なしの廃止款は kanNoless で拾う」が一般解（§13-5）。
    // 前年度列は**当初**（R8→R7 … R3→R2 の6ペアで歳入22款・歳出13款すべて款名・金額が一致・偵察が実測）。
    // ⚠ 年度 URL に規則は無い（R8 だけ `r8-yosan.html`・R5 は `r5_henseihosin.html`・R4 は `gaiyo.html`・R3/R2 は `houshin.html`。
    //    ファイル名も `r4yosansyo.pdf`（アンダースコアなし）・`r3yosannsyo.pdf`（n 重複）・`yosann.pdf`（年度接頭辞なし）と不規則）。
    // [年度, documents ディレクトリ, ファイル名, 年度ページのパス, 歳入ページ, 歳出ページ]
    ["R8", "34730", "r8_yosansyo.pdf", "/zaisei/shise/yosan/r8/r8-yosan.html", 24, 26],
    ["R7", "32609", "r7_yosansyo.pdf", "/zaisei/shise/yosan/r7/yosan.html", 20, 22],
    ["R6", "30625", "r6_yosansyo.pdf", "/zaisei/shise/yosan/r6/yosan.html", 20, 22],
    ["R5", "28756", "r5_yosansyo.pdf", "/zaisei/shise/yosan/r5_henseihosin.html", 20, 22],
    ["R4", "26734", "r4yosansyo.pdf", "/zaisei/shise/yosan/r4/gaiyo.html", 22, 24],
    ["R3", "24661", "r3yosannsyo.pdf", "/zaisei/shise/yosan/r3/houshin.html", 20, 22],
    ["R2", "22950", "yosann.pdf", "/zaisei/shise/yosan/r2/houshin.html", 20, 22],
  ] as const).map(([fy, dir, file, page, revPage, expPage]) => ({
    id: `fujisawa-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 藤沢市予算書及び予算説明書（歳入歳出予算事項別明細書 総括）`,
    publisher: "藤沢市",
    url: `https://www.city.fujisawa.kanagawa.jp/documents/${dir}/${file}`,
    landingPage: `https://www.city.fujisawa.kanagawa.jp${page}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "藤沢市（一般会計・団体コード142051）",
    // 「藤沢市ホームページについて」（/homepage/index.html・確認日 2026-08-23）の「著作権について」＝サイト全体の条項で
    //    本 PDF に及ぶ（PDF 自体に利用条件の記載は無い）。
    // ⚠ 「藤沢市オープンデータ利用規約」（CC BY 4.0）は規約自身が「『藤沢市オープンデータライブラリ』の利用についての規約」と
    //    範囲を限っており、同ライブラリの9件に予算・決算・財政は無い。神奈川県カタログの藤沢市50件も0件（実検索）→ 及ばない（§9g）。
    // リンクは「原則として自由」＋事後連絡の依頼のみ（トップページ限定も PDF 名指しも無い）＝§11h 第5群（山口型）→ `noDeepLink` は立てない。
    license:
      "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "^本年$|^特$|^国庫支出金県支出金$",
      ...(fy === "R2" ? { kanNoless: true } : {}),
    },
  })),

  ...([
    // 柏市（千葉県・中核市・団体コード 122173）。「一般会計・特別会計 予算に関する説明書」（846p）巻頭の
    // 「歳入予算款別明細書 １．総括」（物理 p.7 歳入 / p.8 歳出・印字 +6）。R8〜R2 の7年度が完全同型。
    // ⚠⚠ `revenueHeaderExtra: "総括"` が無いと歳入款1 が **`．総括市税`**（表題の次行「１．総　括」が連結。全角ピリオドは
    //    lead が落とさない）。⚠⚠ `expenditureHeaderExtra` が無いと歳出款1 が **`一般財源国県支出金地方債その他議会費`**
    //    （多段ヘッダの3・4行目が pendName に溜まる）。**どちらも Σ 4系統差0 のまま素通りする型**（偵察が実測）。
    // ⚠ **歳出は 0円の款を行ごと落とす**ので12款（款11 災害復旧費・款13 諸支出金が欠番＝§9f で連番チェックは撤去済み）。
    // ⚠⚠ **R2 は2つ同時に踏む**: ①歳入款6 法人事業税交付金が新設で**前年度セルが空欄**（「皆増」の語も無い）→
    //    `prevBlankAsZero.revenue: [6]`。②廃止款「自動車取得税交付金」が**款番号も廃止マーカーも「皆減」も無い**→
    //    `kanNoless: true`（藤沢 R2 と同じ手・§13-5）。両方入れて Σ 4系統差0（収録時に実測）。
    // ⚠ **H31〜H28 は説明書の歳入ページがアウトライン化**（pdftotext 7文字・画像0枚＝東大阪 §13-4 型）で使えない。
    //    「当初予算案の概要」ルートなら読めるが**単位が百万円**で款別の精度が落ちる（§13-5 に URL とオプションを残した・未収録）。
    // 前年度列は**当初**（R8→R7 … R3→R2 の6ペアで全款一致・R2→H31 も総額一致・偵察が実測）。
    // ⚠ 年度一覧は `/policy_pr/budget/budget2/index.html`（`/zaisei/` **なし**）、年度ページは
    //    `/zaisei/policy_pr/budget/budget2/<slug>.html`（`/zaisei/` **あり**）。どちらも 301 なし。slug は R4 だけ `20211029`。
    // [年度, documents ID, ファイル名, 年度ページ slug, 追加オプション]
    ["R8", "43816", "r8yosansetumei.pdf", "r8-yosan", {}],
    ["R7", "40327", "r7yosannsetsumeisho.pdf", "r7-yosan", {}],
    ["R6", "36483", "r6yosannsetsumeisho.pdf", "r6-yosan", {}],
    ["R5", "31968", "r5yosannsetsumeisho.pdf", "r5-yosan", {}],
    ["R4", "26449", "r4toushoyosan.pdf", "20211029", {}],
    ["R3", "7658", "r3setumei_1.pdf", "r3-yosan", {}],
    ["R2", "3526", "reiwa2nenndokashiwashiippannkaikeitokubetukaikeiyosannnikannsurusetumeisyo.pdf", "r2-yosan",
      { kanNoless: true, prevBlankAsZero: { revenue: [6] } }],
  ] as const).map(([fy, docId, file, slug, extra]) => ({
    id: `kashiwa-yosan-setsumeisho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 柏市一般会計・特別会計予算に関する説明書（歳入・歳出予算款別明細書 総括）`,
    publisher: "柏市",
    url: `https://www.city.kashiwa.lg.jp/documents/${docId}/${file}`,
    landingPage: `https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/${slug}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "柏市（一般会計・団体コード122173）",
    // 「リンク・著作権等」（/toplink/about-web/link-copyright.html・更新日 2024-01-16・確認日 2026-08-23）。
    // ⚠ オープンデータは「本ページに掲載されているデータは…」と自ら範囲を限り、22データセットに予算・決算・財政は0件（実検索）
    //    → 及ばない（§9g）。
    // ⚠⚠ **`noDeepLink` を立てた**（人が原文を読んで判断・2026-08-23）。**第1群（PDF を名指しで断る）と第2群（原則トップページ）の
    //    両方**に当たる稀な例: 「原則としてトップページにリンクさせることとします。ただし、トップページ以外にリンクする場合は、
    //    必ずhtmlファイルにリンクさせることとし、**画像やダウンロードファイルへの直接リンクは禁止します**。」
    //    冒頭の「原則として自由にリンクしていただけます」は直後の文で明示的に限定されている＝鹿児島・川口の境界型とは別物。
    noDeepLink: true,
    license:
      "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "歳入予算款別明細書",
      expenditureHeading: "歳出予算款別明細書",
      revenueHeaderExtra: "総括",
      expenditureHeaderExtra: "一般財源|国県支出金",
      ...extra,
    },
  })),

  {
    // 町田市（東京都・中核市ではない一般市・団体コード 132098）R8。「予算書」（279p）の
    // 「歳入歳出予算事項別明細書 １．総括」（物理 p.24 歳入22款 / p.25 歳出13款・印字とのズレ0）。
    // ⚠⚠ **同じ PDF 内に特別会計5会計の総括表があり、歳入/歳出とも列構成が同型**。ページを取り違えても Σ は差0 のまま
    //    特別会計を収録する（鹿児島 §13 と同型の危険）。**見出し語では区別できない**ので、ページの固定と物理ページの
    //    目視が唯一の網。`expenditureHeading` は総括表の合算列にしかない `国都支出金` にして取り違えに気づけるようにした
    //    （`歳出` でも同じ結果になるが識別力が無い）。
    // ⚠ 款番号は `1.` の半角ピリオド付き（松戸型・#226 の lead 改修で吸収済み＝`kanNamePrefixStrip` 不要）。
    //    歳出款6 は原典が `農林費`（農林水産業費ではない・寄せない）。歳入款9 環境性能割交付金は当年度 1千円の象徴計上。
    // ⚠ R8 は市長選（2026-02-15）を受けた骨格的予算で、**2026-03-25 付の訂正でファイル名が `_2` 付きに一斉に
    //    付け替わった**（訂正前の `R8_yosansyo.pdf` は 404・福山 §13-4 と同じ型）→ fetch 後すぐ archive。
    //    訂正後の合計 207,674,590 が6月補正の「補正前額」と一致する＝議決額であることを偵察が独立資料で確認。
    // ⚠⚠ **R7 以前は収録不可**（`unrecordable.ts`・parser-unsupported）— 予算書がウェブに載っているのは R8 の年度ページだけで、
    //    R7 以前は「予算概要説明書」しかなく、その歳出内訳表が **「金額行 → 款番号＋款名行 → 構成比行」の3行組み**
    //    （款名行に整数が0個）で款が1件も取れず throw する（偵察が R7〜R2 の6年度で実測）。倉敷 R7 と同じ「3行組み」型。
    // 前年度列は**当初**（R8 の前年度列＝R7 概要の当年度列が歳入22款・歳出13款すべて一致・偵察が実測）。
    //    ⚠ R7 には**否決された議会修正案**があるが、R7 の6月補正の「補正前額」が原案どおりなので前年度列は当初で正しい。
    id: "machida-yosansho-r8",
    title: "令和8年度 町田市予算書（歳入歳出予算事項別明細書 総括）",
    publisher: "町田市",
    url: "https://www.city.machida.tokyo.jp/shisei/gyouzaisei/siyosan/tousyo_26/2026yosansyo.files/R8_yosansyo_2.pdf",
    landingPage: "https://www.city.machida.tokyo.jp/shisei/gyouzaisei/siyosan/tousyo_26/2026yosansyo.html",
    kind: "pdf",
    fiscalYear: "R8",
    scope: "町田市（一般会計・団体コード132098）",
    // 「町田市ホームページについて」（/about/about_web.html・更新日 2026-01-08・確認日 2026-08-23）の「その他 注意事項等」。
    // ⚠ **市の CKAN カタログ（143データセット/1,436リソース）にも東京都カタログ（t132098・127データセット）にも
    //    当初予算の資料が1件も無い**（実検索）。載っているのは決算カード・歳入歳出決算書・行政評価シート等の決算系だけ
    //    ＝CC BY は本 PDF に及ばない（§9g）。⚠ 八王子（§13）は当初予算そのものがカタログ登載で open だった＝**都内でも市による**。
    // リンクは「以下に示す条件を守っていただければ、自由に設定していただいて構いません。また、設定後のご連絡も不要です」
    //    ＋フレーム表示の拒否＝§11h 第3群（八王子と同型）→ `noDeepLink` は立てない。
    license:
      "本サイトに記載された文章・画像に関する権利は町田市に帰属しています。無断で転載することを禁じます。もし、これらの文書等について転用等を希望される場合は、その旨掲載されているページの担当課へご連絡下さい。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 24,
      expenditurePage: 25,
      revenueHeading: "歳入歳出予算事項別明細書",
      expenditureHeading: "国都支出金",
    },
  },

  ...([
    // 金沢市（石川県・中核市・団体コード 172014。⚠ 石川県 170003 とは別団体）。
    // 「金沢市予算概要」巻頭の総括表「（２）一般会計款別表」（歳入 p.4・23款 / 歳出 p.5・14款・印字とのズレ0）。
    // 列は [当年度, 前年度当初, 差引, 前年度**現計**, 差引] の5系列だが、先頭2整数＝当年度・前年度当初なので既定の
    //    読み方で正しい（現計列は無視される・実測）。款名の上下2段の折返しも既存処理で復元する。
    // ⚠⚠ **R8・R7・R6 は同じ資料が CCITT スキャン＋OCR テキスト層**で金額が壊れる（`84,497,1801`・`46.フ`）＝収録不可。
    //    ⚠ 代替の「予算のあらまし」は**歳入が原典の時点で12区分に集約**されており（`交付金`＝款3〜11 の合計・
    //    `その他`＝寄附金/繰越金/諸収入等の合計）、**款別歳入ではないので採らない**（歳出だけは真の14款だが片側では入れられない）。
    //    R6 は「あらまし」自体が発行元から消え Wayback にも捕捉が無い。**H30 は文字が図形化**して pdftotext が空。
    //    → `unrecordable.ts` に scanned-image で記録（§13-5）。**最新年度が R5 になる自治体**（原典の劣化による）。
    // ⚠ **R3・R2・H31 は発行元から消えており Wayback の捕捉が唯一の写し**（R2 は `prevBlankAsZero`＋`kanNamePrefixStrip: "△"`、
    //    H31 は `prevBlankAsZero` が要る）。魚拓起点の収録になるので今回は見送り、URL を §13-5 に残した。
    // 前年度列は**当初**（R5前＝R4当・R4前＝R3当 … の4リンクで全款一致・偵察が実測）。
    // [年度, ファイル名]
    ["R5", "R5zentai.pdf"],
    ["R4", "R4zentai_040331.pdf"],
  ] as const).map(([fy, file]) => ({
    id: `kanazawa-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 金沢市予算概要（一般会計款別表）`,
    publisher: "金沢市",
    url: `https://www4.city.kanazawa.lg.jp/material/files/group/16/${file}`,
    landingPage: "https://www4.city.kanazawa.lg.jp/shiseijoho/gyozaisei/zaisei_yosan_kessan/2/13057.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "金沢市（一般会計・団体コード172014）",
    // 「リンク・著作権・免責事項について」（/11790.html・確認日 2026-08-23）。サイト全体の条項で本 PDF に及ぶ。
    // ⚠ オープンデータカタログ（CKAN・319データセット・CC BY）に 予算/決算/財政/款 は0件（API 実検索。対照の
    //    `人口` 39件はヒットするので検索は機能している）＝及ばない（§9g）。
    // リンクは「原則として自由です。事前のご連絡は必要ありません」だけで**トップページへの言及もフレーム禁止も無い**
    //    ＝§11h 第4群（滋賀型）→ `noDeepLink` は立てない。
    license:
      "私的使用のための複製や引用など著作権法上認められた場合を除き、金沢市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 5,
      revenueHeading: "［歳入］",
      expenditureHeading: "［歳出］",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
    },
  })),

  // ---- 中核市 第5弾（2026-08-23・loop.md の第6巡）------------------------------------------------
  ...([
    // 岐阜市（岐阜県・中核市・団体コード 212016。⚠ 岐阜県 210005（`gifuken-`）とは別団体。registry のコメントが
    //    「`gifu-` は市のために空けておく」と書いていたとおり、ここで初めて使う）。
    // 「岐阜市予算説明書」の「一般会計歳入歳出予算事項別明細書 １ 総括」。**歳入 物理 p.5-7 / 歳出 p.8-9**（印字＝物理 −4）。
    // ⚠⚠ **同じ PDF（441p）に競輪事業以下10特別会計の「総括」が同じ列構成・同じ見出し（（歳入）/（歳出））で並ぶ**
    //    （p.251 以降）。**ページを取り違えても Σ は差0 のまま別会計を収録する**（町田 §13-5 と同型）＝網はページの固定と物理ページの目視だけ。
    // ⚠ 歳出表は右に「本年度予算額の財源内訳」が同居して多段ヘッダになるが、既定の KAN_HEADER_RE が吸収する（実測）。
    // ⚠⚠ **R8 の歳入だけ廃止款「環境性能割交付金」に款番号も廃止マーカーも「皆減」の語も無い**（§13-5 と同型）→
    //    **R8 のみ `kanNoless: true`**。付けないと前年度Σ −182,000（warning で derive まで流れる型）。R7・R6 は不要。
    // ⚠ ファイル名の綴りが年度ごとに揺れる（`setumeisyo` / `setumeisho` / `yosansetumeisho`）。`_res` の3階層は
    //    ページ ID のゼロ埋め3桁分割（1035841 → `001/035/841`）。
    // ⚠ **R5 以前は収録不可**（`unrecordable.ts`）— R5 はスキャン＋OCR で数字が1文字ずつ空白区切り（`6 7 , 1 3 5 , 9 6 2`）に
    //    なり `AMOUNT_RE` に当たらず款名も OCR 誤り、R4 以前はテキスト層ゼロ（CCITT）。
    //    ⚠ R3〜H30 は年度ページ本文に HTML の款別表があるが**金額が「634億3,349万5千円」形式**で既存パーサでは読めない。
    //    さらに **R1 の前年度列は「当初＋6月補正」**（H30 が骨格予算）とページ自身が注記しているので `prevBasis` の設計が要る。
    // 前年度列は**当初**（R8 前年度＝R7 当年度・R7 前年度＝R6 当年度を全款で突合。R6 の前年度も R5 の当年度と一致・偵察が実測）。
    // [年度, 年度ページ ID, 資料ページ ID, ファイルの相対パス]
    ["R8", "1035840", "1035841", "001/035/841/r8yosannsetumeisyo.pdf"],
    ["R7", "1029012", "1029017", "001/029/017/r7yosannsetumeisho.pdf"],
    ["R6", "1023279", "1023302", "001/023/302/r6yosansetumeisho.pdf"],
  ] as const).map(([fy, yearId, pageId, file]) => ({
    id: `gifu-yosan-setsumeisho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 岐阜市予算説明書（一般会計歳入歳出予算事項別明細書 総括）`,
    publisher: "岐阜市",
    url: `https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/${file}`,
    landingPage: `https://www.city.gifu.lg.jp/info/zaisei/1007720/${yearId}/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "岐阜市（一般会計・団体コード212016）",
    // 「リンク・著作権・免責事項」（/info/kouhou/1008373/site/1011572.html・更新日 2021-10-01・確認日 2026-08-23）。
    //    サイト全体の条項なので本 PDF に及ぶ（PDF 自体に利用条件の記載は無い・3年度とも確認）。
    // ⚠ 岐阜県オープンデータカタログの岐阜市組織（全72件）を CKAN API で実検索し、予算/決算/財政に当たるのは
    //    「上下水道事業部決算関係データ」1件（企業会計）だけ＝**一般会計の当初予算は非登載**で CC BY は及ばない（§9g）。
    // リンクは「原則自由です。リンクはトップページに限らず、どのページに対して張っていただいても結構です」＝
    //    §11h 第4群（制限なし・滋賀型）→ `noDeepLink` は立てない。
    license:
      "岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、著作権法により保護されており、原則として著作権は、岐阜市に帰属します。岐阜市公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。また、一部の画像等の著作権については、原著作者が所有しています。私的使用のための複製や引用など著作権法上認められた場合を除き、岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePages: { from: 5, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
      ...(fy === "R8" ? { kanNoless: true } : {}),
    },
  })),

  ...([
    // 宮崎市（宮崎県・中核市・団体コード 452017。⚠ 宮崎県 450006 とは別団体）。
    // 「当初予算案の概要」の「（２）一般会計科目別予算」（歳入22〜23款・歳出14款・款番号なし＝`kanNoless`）。
    // ⚠ 資料の作りが R7 で変わる: **R8・R7 は概要が1冊**（当該表は物理 p.10 / p.11・印字とのズレ0）、
    //    **R6 以前は分冊**（13p・物理 p.2 / p.3・印字は +4〜+6）。registry に書くのは物理ページ。
    // ⚠⚠ **同じ PDF の次の見開きが「（３）一般会計性質別予算」で列構成・合計とも同一**（鹿児島 §13 型）。
    //    歳入合計＝歳出合計でもあるので**ページを取り違えても Σ は4系統とも差0**。歳出ページの冒頭は `歳出` の1語だけで
    //    性質別と見出しでは区別できない＝**網は歳入側の見出し語1枚とページの固定だけ**。
    // ⚠ 合計ラベルは歳入歳出とも `合　　計`＝`合計`（既定の「歳入合計/歳出合計」では見つからない）。
    // ⚠ 歳入は市債の下に内訳行「うち臨時財政対策債」がある。R8 は全セル `－` で自然に落ちるが、**R7 は `皆減 912,000` が
    //    入って款として拾われ前年度Σ +912,000 で止まる**（ゲートが捕まえる型）→ `revenueHeaderExtra` を全年度に付ける。
    // ⚠⚠ **R5 の前年度列は「肉付け後予算額」**（R4 が市長選年度の骨格予算）。自動判定は「補正後予算額」の語しか見ないので
    //    **静かに「当初」に落ちる** → `prevBasis: "補正後"` を R5 だけに明示（大分 §13-4 と同型）。
    // ⚠ **R8 の年度ページは「予算・決算」インデックスから未リンク**（2026-08-23 実測）。landing は年度ページ本体を書くこと
    //    （インデックスの魚拓を検査しても R8 の PDF は含まれない＝市川 §13-2 の逆パターン）。
    // ⚠ **H31 以前は入れない**（読めるが単位が百万円で旧市域/清武町域の増列もあり、**R2 の千円実額と款単位で一致しない**＝
    //    年度間クロスチェーンが割れる。H31 の前年度列も「肉付け後」）。
    // 前年度列は**当初**（R8→R7・R7→R6・R6→R5・R4→R3・R3→R2 の5ペア×歳入歳出＝10組が全款一致・偵察が実測）。
    // [年度, landing の記事 ID, ファイルパス, 歳入ページ, 歳出ページ]
    ["R8", "408626", "/fs/8/7/2/0/7/6/_/04____4_________.pdf", 10, 11],
    ["R7", "396918", "/fs/8/3/2/5/5/5/_/832555.pdf", 10, 11],
    ["R6", "367784", "/fs/7/8/5/1/7/4/_/785174.pdf", 2, 3],
    ["R5", "339393", "/fs/7/4/7/2/5/2/_/747252.pdf", 2, 3],
    ["R4", "306335", "/fs/6/7/5/9/5/5/_/675955.pdf", 2, 3],
    ["R3", "272479", "/fs/5/1/4/2/2/4/_/514224.pdf", 2, 3],
    ["R2", "220209", "/fs/3/6/8/9/8/1/_/368981.pdf", 2, 3],
  ] as const).map(([fy, pageId, file, revPage, expPage]) => ({
    id: `miyazaki-shi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 宮崎市当初予算案の概要（一般会計科目別予算）`,
    publisher: "宮崎市",
    url: `https://www.city.miyazaki.miyazaki.jp${file}`,
    landingPage: `https://www.city.miyazaki.miyazaki.jp/city/finance/budget/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "宮崎市（一般会計・団体コード452017）",
    // 「著作権・リンク・免責事項」（/notice.html・更新日 2025-04-01・確認日 2026-08-23）。サイト全体の条項で本 PDF に及ぶ。
    // ⚠⚠ **ここは他の中核市と事情が違う** — 宮崎市の BODIK カタログ（147件）には**「当初予算の概要」が CC BY 4.0 で
    //    登載されている**（H20〜R7）。ただし登載されているのは **BODIK 側にアップロードされた別コピーで、JUST PDF 4 の
    //    再保存によりアウトライン化されておりテキスト層が無い**（R7 分は fonts 0・images 0・抽出38文字。偵察が実測）。
    //    **収録するのは市サイト配信のテキスト層つき PDF＝カタログの CC BY が及ぶファイルとはバイト列も版も別**なので、
    //    保守的に要許可のままにする（§9g の「open は誤ると一番危ない向き」）。⚠ R8 はカタログ未登載（最新 R7）。
    // リンクは「宮崎市ホームページへのリンクは自由ですが、リンクによって生じたいかなる損害についても責任を負いません」
    //    だけ＝§11h 第4群（制限なし・滋賀型）→ `noDeepLink` は立てない。
    license:
      "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（２）一般会計科目別予算",
      expenditureHeading: "歳出",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      kanNoless: true,
      revenueHeaderExtra: "うち臨時財政対策債",
      ...(fy === "R5" ? { prevBasis: "補正後" as const } : {}),
    },
  })),

  ...([
    // 富山市（富山県・中核市・団体コード 162019。⚠ 富山県 160008 とは別団体）。
    // 当初予算の**「議案概要」巻末の「財務部手持資料」**にある「一般会計予算案 歳入 款別構成」／「歳出 目的（款）別構成」。
    // 印字＝物理（全年度ズレ0）。単位は原典どおり千円。合計ラベルは歳入歳出とも `合　計`＝`合計`。
    // **R8〜H27 の12年度が同型**（偵察が12年度すべてに try-parse を当て、収録時に R8・R2 を当て直して確認）。
    // ⚠⚠ **同じ PDF に「同じ列構成の別の表」が2〜3枚ある**（鹿児島 §13 型）: p.N+1「市税等の一般財源案」・
    //    p.N+3「歳出 性質別構成」（R6・R5・H30 はさらに組替後との比較）。**性質別は歳出と合計が完全に一致する**ので、
    //    ページを取り違えても **Σ 4系統は差0 のまま人件費・扶助費…が款として入る**（偵察が実測）。
    //    **網は見出し語の1枚だけ** — 正しく指定してあれば別ページには throw する（これも実測）。
    // ⚠ 歳入の廃止款は款番号欄が空で `0 / 前年度額 / ▲… / 皆減` と印字され、既存の廃止款分岐が拾う（kanNo=null。
    //    R8 自動車税環境性能割交付金・R2 自動車取得税交付金・H28 寄附金）。
    // ⚠ **ファイル名に年度の規則が無い**（`r08giangaiyou_tousyo` / `r07giangaiyou_tousyo_`（末尾 `_`）/
    //    **R6 は年度接頭辞すら無い `giangaiyou_tousyo.pdf`**＝CMS の付け替えで上書きされうるので早めに archive）。
    // ⚠ **「予算に関する説明書」ルートは採らない** — R8 は廃止款が拾えず前年度Σ −193,000、R2 は皆増款の前年度セルが
    //    空欄で +803,000 になる（偵察が実測）。議案概要ルートならどちらも起きないので、12年度すべてこちらで揃える
    //    （資料の乗り換えは derive のクロスチェーンが張られない＝松戸 §13-2 の盲点も避けられる）。
    // ⚠ **H26・H25 は収録不可**（原典のテキスト層で款10 地方交付税の金額がセル内2行に割れ `21 400` ＋ `,400,000` に
    //    なり歳入Σが 21,399,979 千円不足する。`joinWrappedAmounts` は末尾カンマ型専用で効かない）。
    //    **H24 以前の議案概要には款別構成の表そのものが無い**（H24〜H18 を全部取って実測）。
    // 前年度列は**当初**（R8→R7 … H28→H27 の隣接11ペアで歳入・歳出の全款と合計が一致・偵察が実測）。
    // [年度, ファイル名, 歳入ページ, 歳出ページ]
    ["R8", "r08giangaiyou_tousyo.pdf", 24, 26],
    ["R7", "r07giangaiyou_tousyo_.pdf", 31, 33],
    ["R6", "giangaiyou_tousyo.pdf", 57, 59],
    ["R5", "0503giangaiyou-tousyo.pdf", 24, 26],
    ["R4", "r0403giangaiyou-tousyo.pdf", 13, 15],
    ["R3", "r0303giangaiyou-tousyo.pdf", 44, 46],
    ["R2", "r0203giangaiyou-tousyo.pdf", 18, 20],
    ["H31", "3103giangaiyou-tousyo.pdf", 34, 36],
    ["H30", "3003giangaiyou-tousyo.pdf", 30, 32],
    ["H29", "2903giangaiyou-tousyo.pdf", 29, 31],
    ["H28", "2803giangaiyou-tousyo.pdf", 31, 33],
    ["H27", "2703giangaiyou-tousyo.pdf", 23, 25],
  ] as const).map(([fy, file, revPage, expPage]) => ({
    id: `toyama-shi-giangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 富山市当初予算 議案概要（一般会計予算案 歳入款別構成／歳出目的（款）別構成）`,
    publisher: "富山市",
    url: `https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/003/081/${file}`,
    landingPage: "https://www.city.toyama.lg.jp/shisei/yosan/1010829/1003081.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "富山市（一般会計・団体コード162019）",
    // 「このサイトについて」＞著作権について（/about/1002990.html・更新日 2023-01-31・確認日 2026-08-23）。
    //    サイト全体の条項で本 PDF に及ぶ。PDF 自体に利用条件の記載は無い。
    // ⚠ **区分は `unverified` になる**（著作権の帰属だけを述べ、禁止も許諾も書かない型＝山口県と同じ）。
    //    `licenseClassOf` の禁止語（無断・複製・転用…）にも open 語（CC BY・政府標準利用規約…）にも当たらない。
    // ⚠ 「富山市オープンデータ」（opdt.city.toyama.lg.jp・CKAN 全133件）を 予算/決算/財政 で API 実検索して0件。
    //    同サイトの CC BY 規約は「『富山市オープンデータサイト』の利用に関しての規約」と自ら範囲を限る＝及ばない（§9g）。
    //    ⚠ その規約の第9条にある「本サイトへのリンクは原則フリー」も `opdt` 向けで `www` の PDF には及ばない。
    // リンクについての条項は「リンク先サイトの内容に責任を負わない」旨だけで、**リンクの張り方の依頼も制限も無い**
    //    （5群のどれにも当たらない）→ `noDeepLink` は立てない。
    license:
      "本サイトに掲載している著作物（文章・画像・映像・音声・イラストなど）及び、プログラムにかかわる著作権は、富山市または原著作者に帰属します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "款別構成",
      expenditureHeading: "目的（款）別構成",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // 豊中市（大阪府・中核市・団体コード 272035。⚠ 大阪府・大阪市・堺市・東大阪市・和泉市とは別サイト・別団体）。
    // 「議案参考資料（その1）」の「（2）各会計款別内訳」の**一般会計**（歳入 p.4〜5 の2ページ・歳出 p.6）。
    // R1・H30 は同じ表が単体 PDF「各会計款別内訳」（歳入 p.1〜2 / 歳出 p.3）。物理＝印字（全年度ズレ0）。
    // 款番号は原典に無い（`kanNoless`）。歳出13款（R1 のみ災害復旧費を足して14款）。
    // ⚠⚠ **同じ PDF の p.7 以降に「同じ列構成・同じ合計ラベルの特別会計6会計」が続く**。**豊中は一般会計の歳入合計＝歳出合計**
    //    なので、ページを取り違えても Σ は差0 のまま通る。歳入側は見出し `一般会計`（p.4 にしか無い）が網になるが、
    //    **歳出側の p.6 には会計名の表記が無く見出しでは区別できない**＝**物理ページの固定と目視だけが網**（町田 §13-5 型）。
    // ⚠⚠ ページ先頭の `一般会計` を見出しに使い、`( 歳  入 )` は `revenueHeaderExtra` で捨てる（外すと款1 が
    //    `一般会計市税` になる・**Σ は差0 のまま素通り**）。
    // ⚠ 列は [当年度当初, 構成比, 前年度当初, 構成比, **前年度現計**, 構成比, 差…] の10列だが、既定の ints[0]/ints[1] で
    //    当年度・前年度当初が取れる（金沢 §13-5 と同型）。`prevBasis` の指定は不要（本文に「補正後予算額」の語が無い）。
    // ⚠ **R2 は収録不可**（`unrecordable.ts`）— 年度ページの予算書・予算説明書 総括が CCITT スキャンで、R2 だけ
    //    「各会計款別内訳」の掲載が無い（予算ページ・議会の令和2年案件ページとも）。**R3〜R8 と R1・H30 で鎖が2本に割れる**。
    // ⚠ **R3 だけ landing が議会の議案ページ**（予算ページに議案参考資料が無い）。
    // ⚠ R8 は市長選を控えた**骨格予算**（報道提供資料に明記）。R8 の前年度列は R7 当初で問題ないが、**R9 を足すときは
    //    前年度列が「6月補正後」に振れていないか必ず見る**（大分 §13-4 型）。
    // ⚠ R1・H30 の単体 PDF には**「豊中」の文字が1つも無い**（同一性の根拠は配信 URL と年度間クロスチェーン）。
    // 前年度列は**当初**（R8→R7 … R4→R3 と R1→H30 の6ペアで歳入・歳出とも全款一致・偵察が実測）。
    // [年度, landing, ファイル URL, 歳入 from, 歳入 to, 歳出ページ]
    ["R8", "joho/zaisei/yosan/r8yosan.html", "joho/zaisei/yosan/r8yosan.files/r8giansankou.pdf", 4, 5, 6],
    ["R7", "joho/zaisei/yosan/reiwa7.html", "joho/zaisei/yosan/reiwa7.files/r7giansankousiryou_0221.pdf", 4, 5, 6],
    ["R6", "joho/zaisei/yosan/reiwa6yosan.html", "joho/zaisei/yosan/reiwa6yosan.files/r6giansankousiryou_0226.pdf", 4, 5, 6],
    ["R5", "joho/zaisei/yosan/reiwa5yosan.html", "joho/zaisei/yosan/reiwa5yosan.files/r5giansankoutousyoyosan_0224.pdf", 4, 5, 6],
    ["R4", "joho/zaisei/yosan/reiwa4yosan.html", "joho/zaisei/yosan/reiwa4yosan.files/r4giansankou.pdf", 4, 5, 6],
    ["R3", "joho/shigikai_anken/r3/r3sangatuteireikai.html", "joho/shigikai_anken/r3/r3sangatuteireikai.files/giansankou01_0217.pdf", 4, 5, 6],
    ["R1", "joho/zaisei/yosan/reiwa1yosan.html", "joho/zaisei/yosan/reiwa1yosan.files/310225kanbetsu.pdf", 1, 2, 3],
    ["H30", "joho/zaisei/yosan/heisei30yosan.html", "joho/zaisei/yosan/heisei30yosan.files/300226kanbetsu.pdf", 1, 2, 3],
  ] as const).map(([fy, landing, file, revFrom, revTo, expPage]) => ({
    id: `toyonaka-kanbetsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 豊中市各会計款別内訳（一般会計 歳入・歳出）`,
    publisher: "豊中市",
    url: `https://www.city.toyonaka.osaka.jp/${file}`,
    landingPage: `https://www.city.toyonaka.osaka.jp/${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "豊中市（一般会計・団体コード272035）",
    // 「著作権・リンクについて」（/aboutweb/link.html・更新日 2021-11-08・確認日 2026-08-23）＝サイト全体の条項で本 PDF に及ぶ。
    // ⚠ オープンデータカタログ（BODIK 272035・54件）に予算・決算・財政は0件（CKAN API で実検索）。市のオープンデータページの
    //    CC 表示も「本ページおよびリンク先で公開しているオープンデータ」と自ら範囲を限る＝及ばない（§9g）。
    // リンクは「原則としてリンクフリー」＋「トップページに限らず、どのページに対して張っていただいても結構です」＝
    //    §11h 第4群（制限なし）→ `noDeepLink` は立てない。
    license:
      "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePages: { from: revFrom, to: revTo },
      expenditurePage: expPage,
      revenueHeading: "一般会計",
      expenditureHeading: "(歳出)",
      kanNoless: true,
      revenueHeaderExtra: "^\\(歳入\\)$",
    },
  })),

  ...([
    // 豊田市（愛知県・中核市・団体コード 232114）。財政課「一般会計・特別会計 予算の概要」年度ページの分冊
    // 「当初予算関連資料」の「１ 予算総括表」にある `一般会計 款別集計表`（歳入 物理 p.4・23款 / 歳出 p.8・14款。
    // **R4 だけ p.3 / p.7**。印字は −2）。列は [当年度, 構成比, 前年度, 構成比, 比較, 増減率]。
    // ⚠⚠ **旧 URL `/shisei/yosan/1004776.html` は 301**（現行は `/shisei/yosan/1073321/1004776.html`）。
    //    landingPage はリダイレクト先で登録する（市川 §13-2 の教訓）。
    // ⚠ 同じ PDF に**同じ列構成の別の表**が3種ある（p.3 各会計別総括・p.18 性質別歳出・p.19〜 特別会計）が、
    //    **見出し語が網になる**（歳出に p.18、歳入に p.20 を当てるとどちらも throw することを偵察が実測）。
    // ⚠ 款9 自動車取得税交付金・款13 諸支出金は当年度/前年度とも **1千円の名目計上**（原典どおり・`dashAsZero` の出番が無い）。
    // ⚠ **R6 は「（修正後）」版**（議会修正後の当初予算・総額 195,426,534）。R7 資料の前年度列がこの値と全款一致するので
    //    鎖は整合する（宇都宮 R3 §13-3 の「案のまま」とは逆の型）。発行元は修正前版を残していない。
    // ⚠ **R3・R2・H31 は収録不可**（CCITT スキャンで pdftotext が0文字。発行元から削除済みで Wayback・カタログの写しも同一）。
    //    H30〜H28 は Wayback にテキスト層つきで残るが R3/R2 の穴で鎖が切れるので入れない。
    // ⚠⚠ **ライセンスが年度で違う** — R6・R5・R4 は**資料そのものがオープンデータカタログ（BODIK）に登載**されており
    //    CC BY 4.0（八王子 §13 型。カタログ側ホストのファイルと市サイトの配信ファイルは **sha256 が3年度とも一致**＝
    //    同一の著作物であることを偵察が実測）。**R8・R7 はカタログ未登載**（更新が 2024-08 で止まっている）なので
    //    サイト全体の条項（著作権の帰属だけを述べる型＝`unverified`）。**年度で振り分ける**。
    // 前年度列は**当初**（R8→R7→R6→R5→R4 の4ペアで歳入23款・歳出14款すべて款名も金額も一致・偵察が実測）。
    // [年度, ファイルの相対パス, 歳入ページ, 歳出ページ]
    ["R8", "r0802/03.pdf", 4, 8],
    ["R7", "r0702/03.pdf", 4, 8],
    ["R6", "r06/06.pdf", 4, 8],
    ["R5", "r0502/03.pdf", 4, 8],
    ["R4", "r04/04_r0407.pdf", 3, 7],
  ] as const).map(([fy, path, revPage, expPage]) => ({
    id: `toyota-yosan-kanren-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 豊田市当初予算関連資料（一般会計 款別集計表）${fy === "R6" ? "（修正後）" : ""}`,
    publisher: "豊田市",
    url: `https://www.city.toyota.aichi.jp/_res/projects/default_project/_page_/001/004/776/${path}`,
    landingPage: "https://www.city.toyota.aichi.jp/shisei/yosan/1073321/1004776.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "豊田市（一般会計・団体コード232114）",
    // R6・R5・R4: 豊田市オープンデータカタログページ利用規約（odcs.bodik.jp/232114/tos/・確認日 2026-08-23）。
    //    **資料そのものがカタログに登載**され（データセット `232114_overview_budget`・全82リソース）、
    //    カタログ側ホストのファイルが市サイトの配信ファイルと **sha256 一致**（3年度とも実測）＝同一の著作物。
    // R8・R7: 「リンク・著作権について」（/about/aboutsite.html・確認日 2026-08-23）。**著作権の帰属だけを述べ、
    //    禁止も許諾も書かない型**なので `licenseClassOf` は `unverified`（埼玉・福岡・山口と同型。意訳して要許可に寄せない）。
    //    ⚠ **カタログ外の資料（施策別事業集の R8/R7・予算執行実績報告書）に CC BY を流用しないこと**。
    // リンクは「原則として自由に設定いただけます」＋「トップページに設定されることをおすすめします」（理由はリンク切れ）
    //    ＝§11h 第3群/第5群寄り（高松・福山と同型）→ `noDeepLink` は立てない。
    license:
      fy === "R6" || fy === "R5" || fy === "R4"
        ? "当ページの内容（掲載されている情報を含む。）に存在する著作物の著作権は、注があるものを除いて、クリエイティブ・コモンズ・ライセンス 表示4.0国際のもとでライセンスされています。"
        : "豊田市ホームページに掲載している文章、画像などの著作権は、豊田市または原著作者に帰属します。リンク先の著作権等はそれぞれの管理者の定めるところによります。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一 般 会 計 款 別 集 計 表",
      expenditureHeading: "( 目 的 別 歳 出 )",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  // ---- 中核市 第6弾（2026-08-23・loop.md の第7巡）------------------------------------------------
  ...([
    // 岡崎市（愛知県・中核市・団体コード 232025）。財政課「当初予算の概要」の
    // 「一般会計当初予算額調（歳入）」23款 /「（歳出）」14款。**この PDF には印字ノンブルが1つも無い**（物理ページがそのまま）。
    // ⚠⚠ **同じ PDF の次見開きに「（性質別内訳）」「（自主・依存財源内訳）」が同じ列構成・同じ合計で並ぶ**うえ、
    //    **歳入合計＝歳出合計**なので **Σ では歳入/歳出の取り違えも捕まらない**。⚠ ただし**見出し語が網になる**
    //    （歳入 p.14 や歳入/歳出の入れ替えを当てるとどちらも throw することを偵察が実測）。ページは年度で動くので表で固定する。
    // ⚠⚠ **列見出し `科 目` が単独行**で、`^科目$` を外すと款1 が `科目市税` / `科目議会費` に汚れる（姫路 §13 と同型・
    //    **Σ は4系統とも差0 のまま素通り**）。
    // ⚠ 款9 自動車取得税交付金・款21 繰越金は **1千円**、歳出款13 諸支出金は **2千円**の名目計上（`dashAsZero` 不要）。
    //    歳出款6 は原典が **`農林業費`**（農林水産業費ではない・11年度とも）。
    // ⚠ 款数は年度で変わる（R2〜R8 が23款・H31 は22款・H30〜H28 は21款）。R2 の法人事業税交付金・H31 の環境性能割交付金は
    //    皆増で既存機構が拾う。
    // ⚠ 旧 URL（`/1300/1301/1340/pNNNNNN.html` 形式）は 301 で新パスへ飛ぶ。landingPage は**現行パス**で登録（実測）。
    //    ⚠ **R8 だけページ番号が別系列**（概要 1014207）。
    // 前年度列は**当初**（R8→H28 の10ペアで当年度資料の前年度合計＝前年度資料の当年度合計が全て一致・偵察が実測）。
    // [年度, 年度ページ ID, PDF の相対パス, 歳入ページ, 歳出ページ]
    ["R8", "1014207", "001/014/207/r8nenndo/01-01.pdf", 12, 13],
    ["R7", "1006072", "001/006/072/0-1_.pdf", 12, 13],
    ["R6", "1006074", "001/006/074/gaiyou.pdf", 11, 12],
    ["R5", "1006076", "001/006/076/gaiyou.pdf", 12, 13],
    ["R4", "1006078", "001/006/078/gaiyou.pdf", 9, 10],
    ["R3", "1006080", "001/006/080/gaiyou.pdf", 9, 10],
    ["R2", "1006082", "001/006/082/gaiyou.pdf", 9, 10],
    ["H31", "1006084", "001/006/084/01-01.pdf", 9, 10],
    ["H30", "1006086", "001/006/086/01-01.pdf", 10, 11],
    ["H29", "1006088", "001/006/088/01.pdf", 11, 12],
    ["H28", "1006090", "001/006/090/01.pdf", 11, 12],
  ] as const).map(([fy, pageId, path, revPage, expPage]) => ({
    id: `okazaki-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 岡崎市当初予算の概要（一般会計当初予算額調 歳入・歳出）`,
    publisher: "岡崎市",
    url: `https://www.city.okazaki.lg.jp/_res/projects/default_project/_page_/${path}`,
    landingPage: `https://www.city.okazaki.lg.jp/shisei/yosan/1006068/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "岡崎市（一般会計・団体コード232025）",
    // 「サイトポリシー」4 著作権について（/about/1006234.html・更新日 2026-03-09・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ **オープンデータの CC BY は本 PDF に及ばない**（§9g）— 規約が「このページで公開するデータ」と自ら範囲を限り、
    //    カタログ570件を実検索しても登載は **XLSX「令和N年度当初予算額」だけ**で概要 PDF は0件（概要の年度ページに
    //    CC BY マークも無い）。⚠ **その XLSX は別資料として open**（豊田 §13-6 型・款つきで 事業3 が931件＝主な事業の候補）。
    // ⚠⚠ **`noDeepLink` を立てた**（§11h 第2群）: 「トップページへのリンクは原則自由」＋
    //    「**岡崎市ホームページ内のリンク設定について 希望するページの担当課へ直接お問い合わせください**」＝
    //    トップページ以外は要相談（/about/1006238.html・確認日 2026-08-23）。
    noDeepLink: true,
    license:
      "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計当初予算額調（歳入）",
      expenditureHeading: "一般会計当初予算額調（歳出）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "^科目$",
      expenditureHeaderExtra: "^科目$",
    },
  })),

  ...([
    // 長崎市（長崎県・中核市・団体コード 422011。⚠ 長崎県 420000 とは別サイト・別条項）。
    // 財政課「当初予算（案）について」の「一般会計当初予算款項別比較表」（R2 以前は「歳入歳出款別比較表」）。
    // ⚠⚠ **款と項が同一表に混在する**ので `kanIndentMax` が必須。**値は年度で違う** — R8・R7 は `6`、
    //    R5 以前は版面が詰まって `2`（`6` のままだと項を款として拾い Σ が2倍以上に膨らむ＝ゲートが止める）。
    // ⚠ R8・R7 は歳入が3ページにまたがる（`revenuePages`）。R5 以前は各1ページで**印字＝物理 −2**。
    // ⚠⚠ 同じ PDF に**同じ列構成・同じ合計の「性質別比較表」**が歳出の直後に並び、**長崎市は歳入合計＝歳出合計**なので
    //    Σ では取り違えを捕まえられない。⚠ ただし**見出し語 `歳入`/`歳出` が両側とも網になる**（性質別ページを指しても
    //    歳入/歳出を入れ替えても throw することを偵察が実測）＝町田 §13-5・宮崎 §13-6 より守りが厚い。
    // ⚠ 合計ラベルは歳入歳出とも `合 計`＝`合計`。**歳出に款5 労働費が無い**（12款・全年度で一貫＝原典どおり・寄せない）。
    // ⚠ R8 歳入款9 環境性能割交付金は当年度 **1千円**の象徴計上。R2 款6 法人事業税交付金は皆増（既存機構が 0 と読む）。
    // ⚠ **R5 は市長・市議改選期の骨格予算**と原典が明記するが、**R6 の前年度列が R5 当初と一致するので `prevBasis` は不要**
    //    （大分 §13-4 とは逆の型）。
    // ⚠⚠ **鎖は2本に割れる** — R6・R4・R3 が ToUnicode 欠落の化け（荒川・豊島と同一族。`GARBLE_CHAR_MAP` に漢字約72字の
    //    追加が要る。R3 はさらに表題行だけ別の帯＝三重 §11h 型）、H31 が CCITT スキャンで、いずれも `unrecordable.ts`。
    //    **H28 も入れない** — 刊行物は自己整合するが H29 の前年度列と2款が −1,380 ずれる（民生費・地方交付税）＝
    //    議会修正前の値と考えられる（宇都宮 R3 §13-3 と同型）。
    // 前年度列は**当初**（R8→R7 の35款・H30→H29 の34款がすべて一致・偵察が実測）。
    // [年度, 年度ページ ID, ファイル ID, 歳入ページ（範囲 or 単一）, 歳出ページ, kanIndentMax]
    ["R8", "77577", "56051", "10-12", "13-14", 6],
    ["R7", "50110", "42798", "10-12", "13-14", 6],
    ["R5", "5562", "23851", "8", "9", 2],
    ["R2", "4439", "16522", "8", "9", 2],
    ["H30", "4048", "12831", "8", "9", 2],
    ["H29", "3897", "11548", "8", "9", 2],
  ] as const).map(([fy, pageId, fileId, rev, exp, indent]) => {
    const pages = (spec: string) => {
      const [a, b] = spec.split("-").map(Number);
      return b == null ? { single: a } : { range: { from: a, to: b } };
    };
    const r = pages(rev), e = pages(exp);
    return {
      id: `nagasaki-shi-yosansho-${fy.toLowerCase()}`,
      title: `${eraYear(fy)}年度 長崎市当初予算（案）について（一般会計 款項別比較表）`,
      publisher: "長崎市",
      url: `https://www.city.nagasaki.lg.jp/uploaded/attachment/${fileId}.pdf`,
      landingPage: `https://www.city.nagasaki.lg.jp/page/${pageId}.html`,
      kind: "pdf" as const,
      fiscalYear: fy,
      scope: "長崎市（一般会計・団体コード422011）",
      // 「著作権・リンク・免責事項」（/page/3214.html・更新日 2024-11-11・確認日 2026-08-23）。サイト全体の条項で本 PDF に及ぶ。
      // ⚠ 長崎市のオープンデータ（BODIK・155件・全件 CC BY）を API で全件取得して 予算/決算/財政/款 を実検索 → 0件＝及ばない（§9g）。
      // リンクは「貴サイトから本市へのリンクは自由です」＋「トップページ以外は…URL の変更によりリンクできなくなる場合が
      //    ありますので了承ください」＝**注意喚起であって依頼ではない**（島根 §11l・高松 §13-5 と同型）→ `noDeepLink` は立てない。
      //    ⚠⚠ **長崎「県」は第2群（「原則、トップページとしてください」）で立てた側だが、市の条項は別物**。流用しない。
      license:
        "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
      parser: "kofu-yosansho" as const,
      parserOptions: {
        ...(r.range ? { revenuePages: r.range } : { revenuePage: r.single }),
        ...(e.range ? { expenditurePages: e.range } : { expenditurePage: e.single }),
        revenueHeading: "歳入",
        expenditureHeading: "歳出",
        revenueTotalLabel: "合計",
        expenditureTotalLabel: "合計",
        kanIndentMax: indent,
      },
    };
  }),

  ...([
    // 枚方市（大阪府・中核市・団体コード 272108。⚠ 大阪府・大阪市・堺市・東大阪市・豊中市・和泉市とは別サイト・別団体）。
    // 財政課「当初予算の概要」（議会提出の冊子）の「２ 一般会計の歳入予算の内容（１）款別の前年度比較表」（歳入21款）と
    // 「３ 一般会計の歳出予算の内容 目的別歳出（１）款別の前年度比較表」（歳出12款）。列は [当年度(A), 前年度(B), A-B, 増減率]。
    // 物理ページは R8・R7 が 歳入 p.17 / 歳出 p.23（印字 +4）、**R5 だけ p.14 / p.20**（印字 +3）。
    // ⚠⚠ **同じ PDF の p.25「（７）性質別歳出予算の推移」が同じ合計を持ち、しかも列順が [前年度, 当年度] と逆**。
    //    見出し語が網になる（歳出に p.25 を当てると throw することを偵察が実測）。
    // ⚠ **R7 の歳入だけ市債の下に内訳行「うち臨時財政対策債」がある** → `revenueHeaderExtra: "^うち"`。外すと
    //    前年度Σ +1,800,000 で**検証ゲートが捕まえる**（静かには壊れない）。R8・R5 にこの行は無いが無害なので共通で付ける。
    // ⚠⚠ **ファイル URL が毎年4月に付け替わる** — 議会資料室（45365）から「過去の会議資料」の年度ページ（53646 等）へ
    //    移送され、旧 URL は 404 になる（R7 の旧パスが現に 404 であることを偵察が実測）。福山 §13-4 と同型なので
    //    **収録直後の `pipeline:archive` が必須**。landingPage も年度ごとに別ページ。
    // ⚠ **R6 は収録不可**（`unrecordable.ts`・JBIG2 スキャン＋OCR 破損）。R4 以前は「概要」自体がウェブに無い
    //    （議会資料室の公開が令和4年5月開会議会から）。⇒ **鎖は R8↔R7 の1本だけで R5 は孤立する**（豊中 §13-6 と同型）。
    // 歳入款16 は原典が **`府支出金`**（`都道府県支出金` に寄せない）。歳出は**災害復旧費が無い12款**で款11 諸支出金・款12 予備費。
    // 前年度列は**当初**（列見出しが両年度とも「当初予算額」。R8 の前年度列＝R7 の当年度列が全33款一致・偵察が実測）。
    // [年度, landing のページ番号, ファイルの相対パス, 歳入ページ, 歳出ページ]
    ["R8", "0000045365", "0000045/45365/20260224_02_yosangaiyou.pdf", 17, 23],
    ["R7", "0000053646", "0000053/53646/02_R07yosangaiyou.pdf", 17, 23],
    ["R5", "0000053637", "0000053/53637/toushoyosanngaiyou.pdf", 14, 20],
  ] as const).map(([fy, landing, file, revPage, expPage]) => ({
    id: `hirakata-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 枚方市当初予算の概要（一般会計 款別の前年度比較表）`,
    publisher: "枚方市",
    url: `https://www.city.hirakata.osaka.jp/cmsfiles/contents/${file}`,
    landingPage: `https://www.city.hirakata.osaka.jp/${landing}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "枚方市（一般会計・団体コード272108）",
    // 「著作権・リンク等について」（/0000010379.html・更新日 2022-03-20・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ オープンデータ一覧（68件）にも BODIK 枚方市（1件のみ）にも予算・決算は無く、CC BY 2.1 JP は及ばない（§9g）。
    // ⚠⚠ **`noDeepLink` を立てた**（§11h 第2群）:「トップページ…へのリンクは原則として自由です」＋
    //    「**トップページ以外の各個別のページへのリンクについては、各ページに記載の担当課および広報課まで
    //    問い合わせてください。**」＝トップページ以外は要相談（フレーム禁止も併記）。長崎「市」より明確に強い。
    noDeepLink: true,
    license:
      "本サイトに掲載されている個々の情報（文章、写真、イラスト等）は、私的使用のための複製や引用等の著作権上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計の歳入予算の内容",
      expenditureHeading: "一般会計の歳出予算の内容",
      revenueHeaderExtra: "^うち",
    },
  })),
  ...([
    // 横須賀市（神奈川県・中核市・団体コード 142018）。「予算の概要」系の「款別予算比較（歳入）／（歳出）」
    // （歳入23款・歳出15款・単位千円）。**歳出款5 に「環境費」がある**（総務省の目的別標準に無い独自款・
    // 藤沢の環境保全費と同系）。**「衛生費」へ黙って寄せない**。
    // ⚠⚠⚠ **列順が年度の途中で反転する**（足立 §10c と同型）: **R8〜R4 は [前年度, 当年度] で `prevColumnFirst` が必須**、
    //    **R3・R2・H31 は [当年度, 前年度] で付けてはいけない**。列見出しの原文（`令和7年度｜令和8年度` ⇔
    //    `令和3年度｜令和2年度`）を全年度で確認した。⚠ **付け忘れても throw も Σ 不一致も起きず、年度が入れ替わったまま
    //    完走する**（Σ は4系統とも「差0」と表示される）＝**検証ゲートが捕まえられない型**。
    //    **網は年度間クロスチェーンだけ**（R8→H31 の7リンクが総額で繋がることを収録時に実測した）。年度を外挿しない。
    // ⚠⚠ 同じ PDF に**同じ列構成の「性質別予算比較」**があり、**歳入合計＝歳出合計**なので取り違えは Σ で捕まらない。
    //    網は見出し語1枚（性質別ページを指すと throw することを偵察が実測）。
    // ⚠ R4〜H31 の歳出ページには表題が無く `（歳 出）` だけ（性質別歳出も同じ）→ 見出し語に**年度名＋`比較款`まで含めた
    //    圧縮文字列**を与えて款別／性質別を分ける（性質別側は `比較区分…` になる）。歳入側は表題の次行 `（歳 入）` が
    //    款1 に連結する（**Σ は差0**）ので `revenueHeaderExtra: "^（歳入）$"`。
    // ⚠⚠ **R2 の廃止款「自動車取得税交付金」は `○`（U+25CB）マーカーで款番号が無い**（§9c の記号の揺れ・`abolished` 分岐の
    //    マーカークラス `[△▲〇]` に U+25CB は入っていない）→ 既定では行ごと落ちて前年度Σ −177,000。
    //    `kanNoless` ＋ `kanNamePrefixStrip: "○"` で拾える（§13-5 の一般解）。⚠ kanNoless は両側に効くので
    //    `うち 通常債` `うち 臨時財政対策債` の内訳行を HeaderExtra で捨てないと Σ が割れる。
    // ⚠ **R6・R5 の歳入款10 は原典自身が `国有提供施設等在市町村助成交付金`**（「所」が抜けた発行元の誤植・
    //    偵察がページ画像を拡大して確認）。**原典どおり残す**（寄せない）。
    // ⚠ 年度で置き場が2つある（R8・R7 は `/shisei/unei/zaisei/documents/`、R6 以前は `/1610/finas/yosan/documents/`）。
    //    次の年度更新で R7 の URL は移るので**収録直後の `pipeline:archive` が必須**。H30 以前は現行サイトに無い。
    // 前年度列は**当初**（R8→H31 の7リンク×歳入歳出＝14組すべて総額一致・収録時に実測）。
    // [年度, ファイルの相対パス, landing の別（zaisei/kako）, 歳入ページ, 歳出ページ, prevColumnFirst]
    ["R8", "shisei/unei/zaisei/documents/r8yosan-gaiyo_yokosuka.pdf", "zaisei", 93, 95, true],
    ["R7", "shisei/unei/zaisei/documents/07kannmatushiryou.pdf", "zaisei", 3, 4, true],
    ["R6", "1610/finas/yosan/documents/07_kanmatusiryou.pdf", "kako", 3, 4, true],
    ["R5", "1610/finas/yosan/documents/07kanmatusiryou.pdf", "kako", 3, 4, true],
    ["R4", "1610/finas/yosan/documents/04-2zennenhikaku.pdf", "kako", 1, 3, true],
    ["R3", "1610/finas/yosan/documents/03-2zennenhikaku.pdf", "kako", 1, 2, false],
    ["R2", "1610/finas/yosan/documents/02-2zennenhikaku.pdf", "kako", 1, 2, false],
    ["H31", "1610/finas/yosan/documents/31-2zennenhikaku.pdf", "kako", 1, 2, false],
  ] as const).map(([fy, path, landing, revPage, expPage, prevFirst]) => ({
    id: `yokosuka-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 横須賀市 一般会計予算の前年度との比較（款別予算比較 歳入・歳出）`,
    publisher: "横須賀市",
    url: `https://www.city.yokosuka.kanagawa.jp/${path}`,
    landingPage:
      landing === "zaisei"
        ? "https://www.city.yokosuka.kanagawa.jp/shisei/unei/zaisei/index.html"
        : "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/yosankako.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "横須賀市（一般会計・団体コード142018）",
    // 「横須賀市ホームページの利用について」＞著作権（/about_site/menseki.html・確認日 2026-08-23）＝サイト全体の条項。
    //    PDF 側に利用条件の記載は無い（3年度分の全文を grep して0件・偵察が実測）。
    // ⚠⚠ **同じ自治体で資料ごとにライセンスが割れる**（豊田 §13-6 は年度で割れたが、横須賀は**資料の種類**で割れる）—
    //    BODIK の全343データセットを CKAN API で走査すると **PDF リソースは0件**で本 PDF は非登載（§9g）。
    //    一方**予算の XLSX はカタログ登載で CC BY 4.0**。**この PDF に CC BY を流用しないこと**。
    // リンクは「当サイトは、原則リンクフリーですので、リンクを行った場合、私たちへのご連絡は必要ありません。」＝
    //    §11h 第4群 → `noDeepLink` は立てない（ただし書きの「各情報の注記」も財政・過去の予算・行政評価の各ページで0件）。
    license:
      "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "款別予算比較（歳入）",
      ...(fy === "R8" || fy === "R7" || fy === "R6" || fy === "R5"
        ? { expenditureHeading: "款別予算比較（歳出）" }
        : {
            // R4〜H31 は歳出ページに表題が無い（`（歳 出）` だけ）。款別／性質別を分ける唯一の圧縮文字列
            //（`比較款` が款別・`比較区分` が性質別）。年度名を含むので年度ごとに違う。
            expenditureHeading: {
              R4: "（歳出）（単位千円）令和３年度令和４年度比較款",
              R3: "（歳出）（単位千円）令和３年度令和２年度比較款",
              R2: "（歳出）（単位千円）令和２年度令和元年度比較款",
              H31: "（歳出）（単位千円）平成31年度平成30年度比較款",
            }[fy]!,
            revenueHeaderExtra: fy === "R2" ? "^（歳入）$|^うち" : "^（歳入）$",
          }),
      ...(fy === "R2"
        ? { expenditureHeaderExtra: "^（歳出）$|^うち", kanNoless: true, kanNamePrefixStrip: "○" }
        : {}),
      ...(prevFirst ? { prevColumnFirst: true } : {}),
    },
  })),

  ...([
    // 吹田市（大阪府・中核市・団体コード 272051。⚠ 大阪府・大阪市・堺市・東大阪市・豊中市・和泉市とは別サイト・別団体）。
    // 予算ページ「令和N年度 当初予算（歳入・歳出）の状況」の「令和N年度一般会計予算額」（3〜5p の軽量 PDF）。
    // 歳入 p.1（19〜21款）／歳出（目的別）p.2。**H30・H29・H28 だけ歳出が p.3**（p.2 が円グラフ）。
    // 列は [当年度当初, 構成比, 前年度当初, 構成比, **前年度現計**, 構成比, 増減×2, 増減率×2] の多列。
    // 既定の ints[0]/ints[1] で当年度・前年度当初が取れる（金沢 §13-5・豊中 §13-6 と同型の「現計列つき」）。
    // ⚠⚠ **表の左端に縦書きの表側ラベル「歳入」「歳出」が1文字ずつ落ちる**（§9i 岡山型）。ただし岡山と違い
    //    **ラベルが款番号より前に来て lead を殺すので、その款が丸ごと落ちる**（`kanNamePrefixStrip` では救えない）。
    //    → `revenueCropX` / `expenditureCropX` で左端の1文字帯を切る。⚠ **帯の x は年度ごとに違う**ので年度別に持つ。
    //    外すと R8 で歳入2款・歳出2款が消えて Σ −18,782,634 / −18,616,240 ＝**検証ゲートが大声で捕まえる**。
    // ⚠⚠ 同じ PDF に**同じ列構成・同じ合計の「歳出予算額（性質別）」**があり、しかも**吹田は歳入合計＝歳出合計**なので
    //    Σ では取り違えを捕まえられない。網は見出し語の2枚（`一般会計歳入予算額` /`一般会計歳出予算額（目的別）`・括弧は全角）
    //    ＋物理ページの固定（歳出に性質別ページを当てると throw することを偵察が実測）。
    // ⚠ 歳入 p.1 には**款9 と款10 の間に「小計」行**がある。既定では orphan として捨てられ Σ は差0（11年度とも実測）。
    //    **`kanNoless` を足すと小計が款として拾われ二重計上になる**ので足さないこと。
    // ⚠ `expenditureHeaderExtra: "当初"` は多段ヘッダの `N当初－(N-1)当初` 行を捨てるためのもの。外すと R4〜H28 で
    //    款`当初`（金額 3・4）という偽の款が混ざる（Σ +3/+4 で捕まる）。
    // ⚠⚠ **R6 だけ `|災害復旧費` を足して1行落としている**。R6 歳出の `「災害復旧費」` 行は**当年度セルも前年度当初セルも
    //    空欄で、前年度「現計」セルにだけ 1,954 がある**（前年度の補正で立った款で、R6 当初にも R5 当初にも無い）。
    //    落とさないとパーサが現計の 1,954 を前年度当初として読み、前年度Σ が +1,954 ずれる（＝収録すると嘘になる）。
    //    ⚠ **R3 の `「災害復旧費」` は前年度当初セルに 330,600 が印字されているので落としてはいけない**（R2 の当年度と一致）。
    //    年度ごとに違う指定になるのは原典の都合であって、こちらの都合ではない。
    // ⚠ R2 歳入款6（法人事業税交付金）・H31 歳入款8（環境性能割交付金）／歳出款11（災害復旧費）は皆増だが、
    //    前年度当初が空欄なのに現計・増減が並んで ints が3個以上になり印字値を前年度と誤読する → `prevBlankAsZero`。
    // ⚠ 廃止款は原典が**鉤括弧**で括る（`「環境性能割交付金」` `「災害復旧費」` `「自動車取得税交付金」`）。括弧は原典の
    //    表記なので落とさない（§9c）。前年度資料では括弧なしなので年度間の款名は一致しないが、クロスチェーンは総額しか
    //    見ない（§9l）ので鳴らない。
    // ⚠ **PDF 本体に「吹田」の文字が1つも無い**（11年度とも実測）。同一性の根拠は配信 URL と、同じ年度ページの
    //    「吹田市一般会計予算及び予算説明書」第1条の総額（R8＝181,996,567 千円）との一致。
    // ⚠ R8 の予算説明書には「原案修正表」があるが**修正は項・目・節どまりで款の額は変わらない**（偵察が実測）。
    // 前年度列は**当初**（列見出しが `令和N-1年度 当初予算 予算額` と明示・別に現計列がある。R8→H28 の10ペアが
    //  款レベルで一致することを偵察が実測。「事業別予算概要」凡例にも「前年度欄は当初予算額」と明記）。
    // [年度, landing のページ番号, ファイルの相対パス, 歳入ページ, 歳出ページ, 歳入 cropX, 歳出 cropX]
    ["R8", "1041852", "001/041/852/05_R8ippankaikeiyosangaku.pdf", 1, 2, 50, 54],
    ["R7", "1037994", "001/037/994/05_R7ippankaikeiyosangaku.pdf", 1, 2, 50, 54],
    ["R6", "1032448", "001/032/448/R6_ippankaikeiyosangaku.pdf", 1, 2, 50, 54],
    ["R5", "1026012", "001/026/012/ippannyosan.pdf", 1, 2, 50, 68],
    ["R4", "1008372", "001/008/372/12232515347.pdf", 1, 2, 50, 68],
    ["R3", "1008369", "001/008/369/121916113254.pdf", 1, 2, 50, 69],
    ["R2", "1008365", "001/008/365/12192414539.pdf", 1, 2, 79, 84],
    ["H31", "1008383", "001/008/383/121924134314.pdf", 1, 2, 54, 72],
    ["H30", "1008379", "001/008/379/12193011857.pdf", 1, 3, 72, 81],
    ["H29", "1008375", "001/008/375/121924125046.pdf", 1, 3, 64, 74],
    ["H28", "1008374", "001/008/374/121924113447.pdf", 1, 3, 71, 82],
  ] as const).map(([fy, pageNo, file, revPage, expPage, revX, expX]) => ({
    id: `suita-yosangaku-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 吹田市一般会計予算額（歳入・歳出（目的別））`,
    publisher: "吹田市",
    url: `https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/${file}`,
    landingPage: `https://www.city.suita.osaka.jp/shisei/1018870/1018873/1018875/${pageNo}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "吹田市（一般会計・団体コード272051）",
    // 「このサイトについて」＞著作権について（/about/1029496.html・更新日 2023-11-27・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ 吹田市には CC BY のオープンデータカタログがあるが、**規約が自ら範囲を限る**（「ライセンスマーク表示がないページの
    //    データについては吹田市ホームページにおける著作権の取り扱いに準じてください」）。**当初予算の年度ページに CC マークは無く**
    //    （R8・R7 の HTML を grep して0件）、カタログを「予算」で実検索しても本資料は0件 → **CC BY は及ばない**（§9g）。
    //    ⚠ 一方で**決算側（歳入歳出決算書・財政関連データ）はカタログ登載で CC BY**。予算資料の license を流用しないこと。
    // リンクは「リンクの設定は原則自由」＋「事前連絡は必要ありませんが、リンク設定を行った場合は…ご連絡ください」＝
    //    §11h **第5群**（原則フリー・事後連絡の依頼のみ・山口県と同型）→ `noDeepLink` は立てない。
    license:
      "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計歳入予算額",
      expenditureHeading: "一般会計歳出予算額（目的別）",
      revenueCropX: { from: revX, to: 842 },
      expenditureCropX: { from: expX, to: 842 },
      expenditureHeaderExtra: fy === "R6" ? "当初|災害復旧費" : "当初",
      ...(fy === "R2" ? { prevBlankAsZero: { revenue: [6] } } : {}),
      ...(fy === "H31" ? { prevBlankAsZero: { revenue: [8], expenditure: [11] } } : {}),
    },
  })),

  // ---- 中核市 第7弾（2026-08-23・loop.md の第8巡）------------------------------------------------
  ...([
    // 長野市（長野県・中核市・団体コード 202011。⚠ 長野県 200000 とは別サイト・別条項）。
    // 「一般会計・特別会計予算説明書」巻頭の「歳入歳出予算事項別明細書 １ 総括」（歳入21款・歳出13款）。
    // **単位は千円**。⚠ 同じ年度ページの「当初予算の概要」は**単位が億円・小数1桁**なので採らない
    //    （H29 だけは説明書に歳入総括が無いので概要を使う。下の別ブロック）。
    // ⚠⚠ **一般会計は歳入合計＝歳出合計**（R8 は両方 195,220,000）で、しかも**同じ PDF の p.236 以降に
    //    特別会計10会計の総括が同じ見出し `（歳 入）`/`（歳 出）`・同じ列構成で並ぶ**ので、**見出し語は網にならない**。
    //    **物理ページの固定と款名の全件目視だけが網**（町田 §13-5・豊中 §13-6 と同型）。
    // ⚠ 表題行（`一般会計` / `歳入歳出予算事項別明細書` / `１ 総 括`）が款1 に連結して
    //    `一般会計歳入歳出予算事項別明細書総括市税` になる（**Σ 差0 のまま＝静かに壊れる**）→ `revenueHeaderExtra`。
    //    歳出ページは表題の直後に空行があるので汚れない（14年度とも実測）。
    // ⚠ 歳入款9 `地方特例交付金・法人事業税交付金` は名前欄が非空のまま下段 `交付金` へ折り返す（仙台型）→
    //    `kanNameContinues`。**R1 は同じ折返しが款8**（`自動車取得税交付金・自動車税環境性能割交付金`）で年度により番号が違う。
    //    H30 以前は折返し無しで指定不要。外すと**Σ 差0 のまま**款9/款10 の名前が割れる（＝静かに壊れる型）。
    // ⚠ 歳出の款名は原典が **`衛生環境費`・`農林業費`・`商工観光費`**（標準の「衛生費/農林水産業費/商工費」に寄せない）。
    //    **諸支出金の款は無い**。款体系は R8〜H25 で不変（歳入21・歳出13）。
    // ⚠ 説明書には印字ノンブル（`－7－`）があり物理ページと一致する（R8〜R1）。H30 以前は目次が短く p.4〜6 に前倒し。
    // ⚠ **ランディングページは14年度で共有**（年度ごとの別ページが無い）→ 魚拓の landing 捕捉は §13-3 の手順に従う。
    // 列順は全14年度とも `[当年度, 構成比, 前年度, 比較]`（`prevColumnFirst` は不要。列見出しの原文を14年度とも目視）。
    // 前年度列は**当初**（隣接13ペアすべてで前年度列＝前年度資料の当年度列が総額・市税とも一致・偵察が実測）。
    // [年度, ファイル名, 歳入ページ, 歳出ページ, kanNameContinues の款番号（0 なら指定なし）]
    ["R8", "r8yosannsetumeisyoippannkaikeitou.pdf", 7, 8, 9],
    ["R7", "ippannkaikeiyosannsetumeisyo.pdf", 7, 8, 9],
    ["R6", "ippan.pdf", 7, 8, 9],
    ["R5", "yosannsetumeisyoippann.pdf", 7, 8, 9],
    ["R4", "742573_1.pdf", 7, 8, 9],
    ["R3", "358472_1.pdf", 7, 8, 9],
    ["R2", "340608_1.pdf", 7, 8, 9],
    ["R1", "322165_1.pdf", 7, 8, 8],
    ["H30", "306634_1.pdf", 4, 5, 0],
    ["H28", "100995_1.pdf", 4, 5, 0],
    ["H27", "81423_1.pdf", 5, 6, 0],
    ["H26", "63554_1.pdf", 4, 5, 0],
    ["H25", "47890_1.pdf", 4, 5, 0],
  ] as const).map(([fy, file, revPage, expPage, cont]) => ({
    id: `nagano-shi-yosan-setsumeisho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 長野市一般会計・特別会計予算説明書（歳入歳出予算事項別明細書 総括）`,
    publisher: "長野市",
    url: `https://www.city.nagano.nagano.jp/documents/1170/${file}`,
    landingPage: "https://www.city.nagano.nagano.jp/n060500/contents/p004384.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "長野市（一般会計・団体コード202011）",
    // 「著作権等」（/site_policy.html・確認日 2026-08-23）＝サイト全体の条項。予算 PDF は同一サイトの `documents/1170/` 配信。
    // ⚠ 市のオープンデータ（CC BY 4.0 を宣言）を実検索したが**全34データセットに予算・決算・財政は0件**なので及ばない（§9g）。
    //    ⚠ `odcs.bodik.jp/nagano/` は**長野県**の組織であって長野市ではない。
    // リンクは「長野市ホームページへのリンクは原則として自由です」＝§11h 第4群 → `noDeepLink` は立てない。
    //    ⚠⚠ **長野「県」は §11e で `noDeepLink` を立てているが、長野「市」は別条項**（§13-7 の長崎県/長崎市と同じ読み分け）。
    license:
      "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（歳 入）",
      expenditureHeading: "（歳 出）",
      revenueHeaderExtra: "^一般会計$|事項別明細書|総括",
      ...(cont ? { kanNameContinues: { revenue: [cont] } } : {}),
    },
  })),
  {
    // ⚠⚠ **H29 だけ資料が違う** — 同年度の予算説明書（`118402_1.pdf`）は**歳入の総括ページが発行元の PDF に存在しない**
    //    （全446ページを走査して「歳入合計」行が0件＝製本漏れ）。同年度の「当初予算の概要」に款別歳入・歳出（款別）が
    //    千円単位であるのでそちらを収録する。**id を setsumeisho にすると資料の実体と食い違う**ので `gaiyou` にした。
    // ⚠ その代償として、**derive の年度間クロスチェーンは srcId の接頭辞ごとに鎖を張る**ため
    //    H28↔H29↔H30 の2リンクが検査対象から外れる（鎖が2本に割れる）。**値そのものは収録時に手で検算した** —
    //    H30 の前年度列 148,740,000 ＝ 本資料の当年度 148,740,000、本資料の前年度 155,320,000 ＝ H28 の当年度 155,320,000
    //    （市税も 58,262,000 / 58,021,000 で一致）。
    // ⚠ 合計ラベルが説明書と違う（`合 計`）ので `revenueTotalLabel`/`expenditureTotalLabel` を明示する。
    // ⚠ 同じ概要 PDF には「歳出予算（性質別）」もあり列構成・合計が同一なので、ページ固定＋見出し語の両方が要る。
    id: "nagano-shi-yosan-gaiyou-h29",
    title: "平成29年度 長野市当初予算の概要（一般会計歳入予算・歳出予算（款別））",
    publisher: "長野市",
    url: "https://www.city.nagano.nagano.jp/documents/1170/118006_1.pdf",
    landingPage: "https://www.city.nagano.nagano.jp/n060500/contents/p004384.html",
    kind: "pdf",
    fiscalYear: "H29",
    scope: "長野市（一般会計・団体コード202011）",
    license:
      "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 14,
      expenditurePage: 16,
      revenueHeading: "一般会計歳入予算",
      expenditureHeading: "一般会計歳出予算（款別）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  },

  ...([
    // 一宮市（愛知県・中核市・団体コード 232033。⚠ 愛知県・名古屋・岡崎・豊田・豊川とは別サイト・別条項）。
    // 「一宮市一般会計予算書及び予算説明書」の「歳入歳出予算事項別明細書 １ 総括」（歳入22款・歳出13款・単位千円）。
    // ⚠⚠ **一宮は歳入合計＝歳出合計**（R8 は両側 146,740,000）なので **Σ では歳入/歳出の取り違えを捕まえられない**。
    //    同じ PDF の p.5 に「各会計歳入歳出予算総括表」、歳出の次ページに「本年度予算額の財源内訳」がある。
    //    **網は見出し語 `（歳入）`/`（歳出）` の1枚**で、①歳入を p.5 に ②歳入/歳出を入れ替え ③歳出を財源内訳ページに
    //    向けた3通りとも throw することを偵察が実測（長崎 §13-7 と同じ「見出しで守れる」型）。
    // ⚠ 印字ノンブルは物理 −4（R8・R7）／−6（R6・R5・R3）。H26・H25 は当該ページにノンブルが無い。
    // ⚠ 款8 自動車取得税交付金は R8〜R3 とも **1千円の名目計上**（廃止款ではない）。
    //    H26・H25 の歳入は **20款**（法人事業税交付金・環境性能割交付金がまだ無い＝原典どおり・寄せない）。
    // ⚠⚠ **R4・R2・H31・H30・H29・H28・H27 の7年度は予算書が ToUnicode 欠落の化け**で読めない（`unrecordable.ts`）。
    //    荒川・豊島族とは**別系統でサブセット順に依存する**ため `GARBLE_CHAR_MAP` の拡張では開かない。
    //    ⇒ **鎖は R8-R7-R6-R5 / R3 単独 / H26-H25 の3本に割れる**。
    // ⚠⚠ **ライセンスが年度で割れる**（豊田 §13-6 と同型）— **R8〜R3 は資料そのものがオープンデータカタログに登載**され
    //    CC BY 4.0（カタログのリソース URL が本 PDF と同一であることを偵察が実測）。**H26・H25 はカタログ開設
    //    （2016年12月）より前で非登載**なのでサイト側に落ちるが、**一宮市にはサイト全体の著作権条項ページが存在しない**
    //    （「このサイトについて」はリンクポリシーとプライバシーポリシーのみ）＝`unverified`。
    //    ⚠ **カタログ外の資料（予算概要説明資料・主要施策成果報告書・行政評価結果報告書）にこの CC BY を流用しない**（§9g）。
    // リンクは「一宮市ウェブサイトへのリンクは原則自由です。事前に許可・承諾等を得る必要はありません。」＝
    //    §11h 第3群 → `noDeepLink` は立てない。
    // 前年度列は**当初**（R8→R7→R6→R5 と H26→H25 の全4ペアで35行/33行が不一致0・偵察が実測。列順の反転も無い）。
    // [年度, ファイルの相対パス, landing のパス片, 歳入ページ, 歳出ページ]
    ["R8", "001/074/589/R08_tousyo_ippan_kai.pdf", "1074585/1074589", 35, 36],
    ["R7", "001/065/534/R07tousyo.pdf", "1065530/1065534", 33, 34],
    ["R6", "001/060/487/R06tousyo.pdf", "1060483/1060487", 35, 36],
    ["R5", "001/054/702/R05tousyo_ippan.pdf", "1054756/1054702", 35, 36],
    ["R3", "001/039/366/R03tousyo_ippan_annashi_kai2.pdf", "1039362/1039366", 35, 36],
    ["H26", "001/003/816/tousyoyosan-ippan.pdf", "1010376/1003816", 33, 34],
    ["H25", "001/003/815/tousyoyosan-ippan.pdf", "1010377/1003815", 33, 34],
  ] as const).map(([fy, file, land, revPage, expPage]) => ({
    id: `ichinomiya-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 一宮市一般会計予算書及び予算説明書（歳入歳出予算事項別明細書 総括）`,
    publisher: "一宮市",
    url: `https://www.city.ichinomiya.aichi.jp/_res/projects/default_project/_page_/${file}`,
    landingPage: `https://www.city.ichinomiya.aichi.jp/zaimu/zaisei/1044383/1000242/${land}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "一宮市（一般会計・団体コード232033）",
    license:
      fy === "H26" || fy === "H25"
        ? "一宮市ウェブサイト掲載資料（同市のオープンデータカタログ開設より前の年度で非登載。市のサイトには著作権・二次利用の規定ページが無く、フッターの帰属表示のみ。確認日 2026-08-23）"
        : "この作品はクリエイティブ・コモンズ 表示 4.0 国際 ライセンスの下に提供されています。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
    },
  })),
  ...([
    // 和歌山市（和歌山県・中核市・団体コード 302015。⚠ 和歌山県 300004 とは別団体）。
    // 「予算内示資料」の一般会計予算資料（歳入22款・歳出13款・単位千円）。
    // ⚠ **R8 は印字＝物理でズレ0**（原典 p.1 に「表紙及び目次を頁番号に含んでいます」と明記）だが **R7 は印字＝物理−4**。
    // ⚠⚠ **同じ PDF に「同じ列構成の別の表」が2つある**（p.6 予算総括表・p.9 歳出の性質別で**合計が p.8 と同一**）。
    //    しかも**歳入合計＝歳出合計**なので**ページを取り違えても Σ 4系統は差0 のまま素通りする**。
    //    網は見出し語1枚なので `（歳入：款別予算額）` `（歳出：目的別予算額）` を**丸ごと**指定する（共通語へ緩めない）。
    //    p.9 を歳出に当てると throw することを偵察が実測。⚠ 括弧は全角・コロンも全角（U+FF1A）。
    // ⚠ **合計行はラベルと金額が別行**（`合 計` の行に数字が無く次行に金額）→ `totalAmountNextLine` が必須。
    //    外すと「合計 行が見つかりません」で throw する（＝静かには壊れない）。
    // ⚠ **列見出し `科 目` が単独行**（姫路 §13 と同型）→ `^科目$` を両側に。外すと款1 が `科目市税`/`科目議会費` に
    //    汚れて **Σ は4系統とも差0 のまま素通りする**。
    // ⚠ 合計行の直上に `(165,558,745) …` という**借換え元金償還金を除いた別系列**の括弧行があるが、CJK が無いので
    //    款としても合計としても拾われない（Σ 差0 で確認）。
    // ⚠⚠ **R6・R5・R4 は同じ資料が CCITT スキャン**でテキスト層が無く収録不可（`unrecordable.ts`）。R3・R2 は
    //    年度ページが現行サイトから消え Wayback にも捕捉0件。⇒ **収録できるのは R8・R7 の2年度だけ**。
    // ⚠ **和歌山市のサイトには著作権・二次利用の規定ページが存在しない**（サイトポリシーは免責事項とリンクのみ・
    //    PDF 本体にも該当語0件）。BODIK の全45データセットにも予算・決算・財政は0件なので**カタログの CC0/PDL を
    //    流用しない**（§9g・横須賀 §13-7）＝ `unverified`。
    // リンクは「原則自由」＋「トップページ以外はアドレスが変わる可能性があるのでご注意ください」＝§11h 第4群 →
    //    `noDeepLink` は立てない。
    // 前年度列は**当初**（R8 の前年度列＝R7 の当年度列が35款すべて一致・偵察が実測。列順の反転も同時に否定される）。
    ["R8", "001/066/992/080219tousyoyosan.pdf", "1066991/1066992"],
    ["R7", "001/061/418/070219tousyoyosan.pdf", "1061417/1061418"],
  ] as const).map(([fy, file, land]) => ({
    id: `wakayama-shi-yosan-naiji-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 和歌山市予算内示資料（一般会計予算資料 歳入・歳出予算額）`,
    publisher: "和歌山市",
    url: `https://www.city.wakayama.wakayama.jp/_res/projects/default_project/_page_/${file}`,
    landingPage: `https://www.city.wakayama.wakayama.jp/shisei/zaisei/1033880/${land}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "和歌山市（一般会計・団体コード302015）",
    license:
      "和歌山市ウェブサイト掲載資料（同サイトに著作権・二次利用の規定ページが無く、サイトポリシーは免責事項とリンクの2つのみ。確認日 2026-08-23）",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 7,
      expenditurePage: 8,
      revenueHeading: "（歳入：款別予算額）",
      expenditureHeading: "（歳出：目的別予算額）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      totalAmountNextLine: true,
      revenueHeaderExtra: "^科目$",
      expenditureHeaderExtra: "^科目$",
    },
  })),

  ...([
    // 豊橋市（愛知県・中核市・団体コード 232017。⚠ 豊川市 232076・豊田市 232114 とは別団体）。
    // 「予算概要説明資料」p.5「一般会計（歳入）」/ p.6「一般会計（歳出）」（歳入23款・歳出14款・単位千円）。
    // ⚠⚠ **合計行の構成比だけ小数点の無い `100`** で印字されるため、既定では**前年度合計が 100 になる**
    //    （款行の構成比は必ず小数か `-` なので款行は正しい）。前年度Σの不一致は validate では **warning** で
    //    derive まで流れ、**画面に「前年度 100千円」が出る**型だった。→ 2026-08-23 に
    //    **`totalAmountIntIndex` / `totalPrevIntIndex`（合計行だけ列位置が違う様式）をパーサに足して塞いだ**。
    // ⚠ `amountIntIndex`/`prevIntIndex` も要る — R7 歳入款8 が `1 - 20,000 - △19,999 皆減` で
    //    **「皆減なのに当年度セルに名目1千円が印字」**（墨田 H18 の鏡像）。列指定にすると推測を通さず正しく読む。
    // ⚠⚠ **同じ PDF の p.7 は「一般会計 性質別分類」で列構成も合計も p.5/p.6 と同一**。しかも
    //    **歳入合計＝歳出合計**なのでページを取り違えても Σ では捕まらない。網は見出し語と物理ページの固定だけ。
    // ⚠ 款10 は原典が `国有提供施設等所在市助成交付金`（法令名の「所在市町村」ではない）。原典どおり残す。
    // ⚠⚠ **R5・R3 は「（修正後）」版を採る** — 議会修正後の当初予算で、翌年度資料の前年度列と一致する
    //    （修正前は R5 137,670,000 / R3 133,980,000 で鎖が割れる。豊田 R6 §13-6 と同型）。
    // ⚠⚠ **R7・R4・R2 は別の穴で収録できない**（パーサが **throw** するので静かには壊れない）—
    //    豊橋は前年度補正の前倒し繰越を含む額を括弧で上段に置くが、**片側だけ括弧の行**では款名行の整数が
    //    1個になりどの分岐にも入らず行ごと落ちる（R7 歳出款2／R4 歳入16・21・23＋歳出8・10／R2 歳出10）。
    //    合計行が同じ形になる年度もある。⇒ **収録は R8 / R6・R5 / R3 で、鎖は R6↔R5 の1本だけ**。
    // ⚠ **最新年度のファイルは `/secure/10519/` に置かれ、翌年に年度別バケットへ移される**（旧 URL は 404 を実測）
    //    ＝ fetch 後すぐ `pipeline:archive` すること。
    // 前年度列は**当初**（R8→R7→R6→R5(修正後)→R4→R3(修正後)→R2 の全ペアで総額・款とも一致・偵察が実測。列順の反転は無い）。
    ["R8", "10519/R8gaiyousiryou.pdf"],
    ["R6", "124208/R6gaiyousiryou.pdf"],
    ["R5", "124203/R5gaiyousiryou.pdf"],
    ["R3", "124201/R3tousyogaiyousiryou.pdf"],
  ] as const).map(([fy, path]) => ({
    id: `toyohashi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 豊橋市予算概要説明資料（一般会計 歳入・歳出）${fy === "R5" || fy === "R3" ? "（修正後）" : ""}`,
    publisher: "豊橋市",
    url: `https://www.city.toyohashi.lg.jp/secure/${path}`,
    landingPage: "https://www.city.toyohashi.lg.jp/8815.htm",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "豊橋市（一般会計・団体コード232017）",
    // 「免責事項・著作権」（/1084.htm・確認日 2026-08-23）。**禁止も許諾も書かず転載時の「届け出」を求める型**なので
    //    `licenseClassOf` は `unverified`（偵察が実測）。⚠ 市のオープンデータ（CC BY 4.0）は規約自身が
    //    「クリエイティブ・コモンズ・ライセンスが付与されているデータについて適用」と範囲を限り、財政系の登載は
    //    **決算の CSV/XLSX と財政指標だけ**で本 PDF は非登載＝ CC BY は及ばない（§9g）。
    // ⚠⚠ **`noDeepLink` を立てているが、derive の振替は permission-required 限定なので unverified では no-op**
    //    （§11i が open について書いた注意と同じ構図）。それでも立てるのは**発行元の意思の記録**として —
    //    リンク条項は「ページ内の画像等、**コンテンツそのもの**やフレームによるリンクはご遠慮ください」＝
    //    §11h **第1群（ファイルを名指しで断る）**で柏 §13-5 と同型。⚠ 区分が動いたら自動的に効く。
    //    なお画面のエビデンスは既定で③自サーバー配信なので、現状でも発行元のファイルを直接は指していない。
    noDeepLink: true,
    license:
      "豊橋市ホームページ(http://www.city.toyohashi.lg.jp/　以下本サイト)で提供する内容の著作権は、豊橋市が所有しております。本サイトの内容を転載・掲載する場合は、どのような形式・媒体を利用する場合でも本市ホームページ管理者（広報広聴課）宛てに届け出をお願いします。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 5,
      expenditurePage: 6,
      revenueHeading: "（ 歳 入 ）",
      expenditureHeading: "（ 歳 出 ）",
      totalAmountNextLine: true,
      amountIntIndex: 0,
      prevIntIndex: 1,
      totalAmountIntIndex: 0,
      totalPrevIntIndex: 2,
    },
  })),

  ...([
    // 高崎市（群馬県・中核市・団体コード 102024）。「当初予算の概要及び主要事業」の
    // 「一般会計予算の概要」歳入（23款）／歳出（目的別）（13款）。単位は「（単位：千円、％）」と明記。
    // ⚠ 年度一覧は**財政課ページ `/soshiki/15/`**（H20〜R8 が全部並ぶ）。分類ページ `/life/7/43/210/` は
    //    直近4年度しか出さないので索引に使わない（偵察が実測）。
    // ⚠⚠ 同じ PDF の**次ページが「４ 歳出（性質別）」で列構成・合計とも同一**（歳入合計＝歳出合計でもある）ので
    //    ページを取り違えても Σ は差0。網は見出し語（性質別ページに当てると throw することを実測）。
    // ⚠⚠ **H22 だけは見出しが網にならない** — 物理 p.6/p.7 が「※参考（前年度に旧吉井町を含めた場合の比較）」で
    //    **見出し語も列構成も本表と同一**。当てると Σ 4系統差0 のまま完走し前年度だけが 143,109,000 になる
    //    （本表は 134,700,000）。**物理ページの固定と目視だけが網**（町田 §13-5 型）。
    //    収録時に H22 の前年度が 134,700,000（＝H21 の当年度）であることを確認した。
    // ⚠ 見出し語は**表題行を款1 から読み飛ばす役目も兼ねる**ので `１ 歳入` のように全角番号込みで書かない
    //    （skip に当たらず `歳入市税` になる）。
    // ⚠ 歳入の表題行 `一般会計予算の概要` と款の内訳行（`うち普通交付税`・`うち臨時財政対策債` 等）を
    //    `revenueHeaderExtra` で落とす。前者を外すと `一般会計予算の概要市税`（**Σ 差0 のまま**）、
    //    後者を外すと R7 で `うち臨時財政対策債` が廃止款として拾われ前年度Σ +800,000（＝ゲートが捕まえる）。
    // ⚠ 合計ラベルは歳入歳出とも `合 計`。
    // ⚠ R2 の廃止款は款番号が無く角括弧で括られる。**印字は全角に見えるがテキスト層は半角 `[` `]`**（0x5B/0x5D を実測）
    //    ので parsed も `[自動車取得税交付金]` になる。括弧は原典の表記なので残す（§9c）。
    // ⚠ 前年度基準は当該ページに「補正後」の語が無く自動判定で**当初**。⚠ **同じ PDF の p.8/p.9 には
    //    「7年度は3月補正後の予算見込額」が出る**ので、ページを広げると静かに「補正後」に化ける。
    // ⚠⚠ **R4・H31・H28・H27・H24 は本文がアウトライン化**（CJK が0字）で読めない＝`unrecordable.ts`。
    //    H20 は歳入が11区分の集約で款別でない。⇒ **鎖は R8-R7-R6-R5 / R3-R2 / H30-H29 / H26-H25 / H23-H22-H21 の5本**。
    // 前年度列は**当初**（読める全ペアで前年度列＝前年度資料の当年度列が全款一致・偵察が実測。列順の反転も無い）。
    // [年度, landing のページ番号, 添付ファイル番号, 歳入ページ, 歳出ページ]
    ["R8", "82712", "37728", 3, 6],
    ["R7", "57668", "26854", 3, 6],
    ["R6", "22382", "15966", 3, 6],
    ["R5", "3241", "6478", 3, 6],
    ["R3", "3239", "6472", 3, 6],
    ["R2", "3238", "6469", 3, 6],
    ["H30", "3236", "6463", 3, 6],
    ["H29", "3235", "6460", 3, 6],
    ["H26", "3232", "6451", 3, 6],
    ["H25", "3231", "6448", 4, 8],
    ["H23", "3229", "6429", 4, 5],
    ["H22", "3228", "6414", 4, 5],
    ["H21", "3227", "6399", 4, 5],
  ] as const).map(([fy, pageId, att, revPage, expPage]) => ({
    id: `takasaki-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 高崎市当初予算の概要及び主要事業（一般会計予算の概要 歳入・歳出（目的別））`,
    publisher: "高崎市",
    url: `https://www.city.takasaki.gunma.jp/uploaded/attachment/${att}.pdf`,
    landingPage: `https://www.city.takasaki.gunma.jp/page/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "高崎市（一般会計・団体コード102024）",
    // 「リンク・著作権・免責事項」（/site/userguide/1964.html・更新日 2023-12-18・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ 市のオープンデータサイト（CC BY 4.0）は規約自身が範囲を「オープンデータサイトで公開されている情報」に限り、
    //    一覧の20件は避難所・体育施設・公共交通・地番図だけで**予算/決算/財政は0件**（実検索）。BODIK にも高崎市の
    //    組織は無い（380件を走査して0件）→ 及ばない（§9g）。
    // リンクは「原則としてフリーです」＋フレーム埋め込みのみ遠慮＝§11h 第3群 → `noDeepLink` は立てない。
    license:
      "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "歳入",
      expenditureHeading: "歳出（目的別）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "^一般会計予算の概要$|^うち",
    },
  })),

  // ---- 中核市 第8弾（2026-08-23・loop.md の第9巡）------------------------------------------------
  ...([
    // 奈良市（奈良県・中核市・団体コード 292010。⚠ 奈良県 290009 とは別サイト・別条項）。
    // 財政課「当初予算の概要」ページの分冊「予算案の概要」の
    // 「令和N年度一般会計歳入予算」（22款）/「同 歳出予算」（15款）。単位は表頭に「( 単位 : 千円 、％ )」。
    // ⚠⚠ **この市の最大の罠は議会修正** — 奈良市議会は当初予算案を修正議決することがあり、
    //    **発行元が修正後の値で PDF を差し替える年と、案のまま放置する年がある**。
    //    R8 は 2026-03-25 の修正可決で 195,000,000 → **193,425,597**（差し替え済み・last-modified 2026-04-09）。
    //    ⚠ 同じページの「主要な施策項目」PDF は2月時点の**修正前**なので混ぜない。
    //    ⚠ **H31・H30・H29 は案のまま放置**されており、当年度合計が翌年度資料の前年度列と一致しない
    //    （H29 △138,003 / H30 △473,600 / H31 △10,000）＝`unrecordable.ts`（宇都宮 R3 §13-3 と同型）。
    // ⚠⚠ **H31・H30・H29 は「分冊」で収録する**（下の別ブロック）— **同じ年度ページに (9)「予算案の概要」（一括）とは別に
    //    (2)一般会計歳入予算・(3)歳出予算の分冊 PDF があり、分冊だけが修正後の値に差し替えられている**。
    //    概要（一括）だけを見ると「案のまま放置されている」と誤判定する（レビューで発覚・2026-08-23）。
    //    ⇒ **H28〜R8 の鎖が完全に閉じる**（H28 の孤立も解消）。
    // ⚠ 款8 の番号が全角ピリオド `8．` で lead が落とさず款名が `．観光費` になる（**Σ 差0 のまま素通り**）
    //    → `kanNamePrefixStrip: "．"`。柏 §13-5 の `．総括` と同族。
    // ⚠ 同じ PDF の次ページは「一般会計予算性質別経費分析表」で**列構成が同一**だが、**見出し語が網になる**
    //    （当てると throw することを偵察が実測）。高崎 H22 §13-8 のような「見出しも同一の別表」は無い。
    // ⚠ 歳出款8 は原典が **`観光費`**（総務省の目的別標準に無い独自款）。**商工費へ黙って寄せない**。
    // ⚠ 歳入の款11 地方交付税の下に内訳行（普通交付税・特別交付税）があるが款番号が無いので拾われない（Σ 差0）。
    //    廃止款 `△ 環境性能割交付金`（当年度セルが `-`）も既存の廃止款分岐が正しく処理する（`dashAsZero` 不要）。
    // ⚠ **R2 だけ物理ページが1つ手前**（印字ノンブルは全年度 3/4 で、物理とのズレが年度で変わる）。
    // 前年度列は**当初**（隣接ペアがすべて一致することを収録時に実測。加えて同 PDF の「予算規模推移（当初予算）」が
    //  H9〜R8 の当初額を持ち独立の裏取りになる）。列順の反転は無い。
    // [年度, 年度ページ ID, 添付ファイル ID, 歳入ページ, 歳出ページ, 見出しの年号]
    ["R8", "259233", "209549", 5, 6, "令和８"],
    ["R7", "228872", "193354", 5, 6, "令和７"],
    ["R6", "198916", "174848", 5, 6, "令和６"],
    ["R5", "168533", "157157", 5, 6, "令和５"],
    ["R4", "136300", "141146", 5, 6, "令和４"],
    ["R3", "102187", "122732", 5, 6, "令和３"],
    ["R2", "51295", "101115", 4, 5, "令和２"],
    ["H28", "4718", "14021", 5, 6, "平成28"],
  ] as const).map(([fy, pageId, att, revPage, expPage, nen]) => ({
    id: `nara-shi-yosanan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 奈良市予算案の概要（一般会計歳入予算・歳出予算）`,
    publisher: "奈良市",
    url: `https://www.city.nara.lg.jp/uploaded/attachment/${att}.pdf`,
    landingPage: `https://www.city.nara.lg.jp/site/zaisei/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "奈良市（一般会計・団体コード292010）",
    // 「リンク・免責事項」＞著作権について（/site/userguide/8771.html・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ 市のオープンデータカタログ（CC BY 2.1 JP）の「行財政 > 財政」は**「決算の概要」1件だけ**（しかも本体サイトへの
    //    リンク型でファイル添付なし）で、**当初予算は1件も登載されていない**（一覧を実検索）→ 及ばない（§9g）。
    // リンクは「リンクフリー」＋「**トップページに限らずどのページに対して張っていただいてもかまいません**」＝
    //    §11h 第3群（フレーム埋め込みのみ禁止）で、**直リンクを明示的に許容している** → `noDeepLink` は立てない。
    license:
      "奈良市公式ホームページに掲載の文章、画像などの著作権は、奈良市または原著作者に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、当ホームページに掲載の文章、画像などについて無断で複製・転用することを禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: `${nen}年度一般会計歳入予算`,
      expenditureHeading: `${nen}年度一般会計歳出予算`,
      kanNamePrefixStrip: "．",
    },
  })),

  ...([
    // 奈良市 H31・H30・H29 — **同じ年度ページの「分冊」**（(2)一般会計歳入予算 /(3)一般会計歳出予算）。
    // ⚠⚠ **一括の「予算案の概要」は議会修正前の案のまま放置されているが、分冊だけが修正後の値に差し替えられている**
    //    （H29 127,700,000→**127,561,997** / H30 131,000,000→**130,526,400** / H31 133,800,000→**133,790,000**）。
    //    概要（一括）だけを見て「案のまま＝収録不可」と判定したのを、レビューが分冊を見つけて覆した（2026-08-23）。
    //    **同じ年度ページに一括版と分冊版が並ぶ資料では、両方の値を突き合わせること**。
    // ⚠ 分冊は歳入と歳出が別ファイルなので `revenueFile`/`expenditureFile` を使う（表はどちらも物理 p.1）。
    // ⚠ **H29 だけ見出しの年号が全角**（`平成２９年度`）で H30・H31 は半角（`平成30年度`）。年度で外挿しない。
    // 前年度列は**当初**（H31 前年度＝H30 当年度、H30 前年度＝H29 当年度、H29 前年度＝**収録済み H28 の当年度**
    //  128,496,754 とすべて一致することを収録時に実測。R2 の前年度 133,790,000 とも繋がり **H28〜R8 の鎖が閉じる**）。
    // [年度, 年度ページ ID, 歳入ファイル ID, 歳出ファイル ID, 見出しの年号]
    ["H31", "10054", "28764", "28765", "平成31"],
    ["H30", "7705", "22053", "22054", "平成30"],
    ["H29", "4908", "14539", "14540", "平成２９"],
  ] as const).map(([fy, pageId, revId, expId, nen]) => ({
    id: `nara-shi-yosanan-bunsatsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 奈良市当初予算（一般会計歳入予算・歳出予算）`,
    publisher: "奈良市",
    url: null,
    urls: [
      `https://www.city.nara.lg.jp/uploaded/attachment/${revId}.pdf`,
      `https://www.city.nara.lg.jp/uploaded/attachment/${expId}.pdf`,
    ],
    landingPage: `https://www.city.nara.lg.jp/site/zaisei/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "奈良市（一般会計・団体コード292010）",
    license:
      "奈良市公式ホームページに掲載の文章、画像などの著作権は、奈良市または原著作者に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、当ホームページに掲載の文章、画像などについて無断で複製・転用することを禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenueFile: `${revId}.pdf`,
      expenditureFile: `${expId}.pdf`,
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: `${nen}年度一般会計歳入予算`,
      expenditureHeading: `${nen}年度一般会計歳出予算`,
      kanNamePrefixStrip: "．",
    },
  })),

  ...([
    // 川越市（埼玉県・中核市・団体コード 112011。⚠ **三重県川越町 243442 と別団体**・埼玉県 110001／
    //    さいたま市 111007／川口市 112038 とも別サイト・別条項）。
    // 「予算関係参考資料」（会派説明用の4ページの単体 PDF）の「２ 一般会計予算の款別一覧表」
    //    （１）歳入＝物理 p.2（22款）/（２）歳出＝物理 p.3（14款）。単位は表頭に「（単位 千円）」。
    //    **印字ノンブルが無い**ので物理ページが唯一の番号。
    // 列は [予算額(A), 構成比, **当初(B)**, 最終予算(C), (A)-(B), %, (A)-(C), %] で、構成比が小数なので
    //    既定の ints[0]/ints[1] が当年度・前年度**当初**を掴む。⚠ 合計行の構成比も `100.0` と小数なので
    //    豊橋 §13-8 の `totalAmountIntIndex` 型にはならない。
    // ⚠⚠ **同じ PDF の物理 p.4 が「３ 一般会計歳出予算の性質別一覧表」で列構成・合計とも同一**
    //    （しかも**歳入合計＝歳出合計**）。⚠ 見出し語を弱く（`歳出合計` 等に）すると **Σ 4系統差0 のまま
    //    完走して款名が `人件費` `物件費` … になる**（偵察が実測）。`（２）歳出` のように**丸番号ごと**
    //    指定すれば p.4 で throw する。p.1 は特別会計込みの「会計別比較一覧表」なので p.1 も踏まない。
    // ⚠⚠ **PDF の表紙に「川越市」の字が無い**（4ページとも）。同一性は p.1 の特別会計名
    //    `川越駅東口公共地下駐車場事業`（川越市固有）と、一般会計 143,850,000 が「予算の概要」表紙の
    //    総額と一致することで確認した。**他市の参考資料と取り違えても字面では気づけない**ので取得元 URL を見る。
    // ⚠⚠ **「予算の概要」PDF の款別表は使わない** — 前年度列が原典の注記どおり「令和７年度当初予算額と
    //    令和７年６月補正予算における政策的経費に係る当初予算追加事業に係る予算額の**合算額**」（138,859,302）で、
    //    参考資料の当初 136,970,000 と款単位でも違う。採ると年度間クロスチェーンが割れる。
    // ⚠ **R2 だけ `prevBlankAsZero.revenue: [6]`** — 款6 法人事業税交付金が R2 新設で前年度セルが `―`＋「皆増」だが、
    //    比較列が2本（(A)-(B) と (A)-(C)）あるため ints が3個になり、墨田 H18 由来の「皆増でも印字値を採る」分岐が
    //    発火して前年度が 400,000 になる（**前年度Σ +400,000 は validate では warning 止まり**）。
    //    ⚠ 同年の廃止款「自動車取得税交付金」は既定の廃止款分岐が正しく処理するので `dashAsZero` は不要。
    // ⚠ ファイル名の年度規則は R5 で破れる（`r8sanko`…`r5sanko` → `r4sanko`/`r3sanko` → `r2sanko`）。
    //    ⚠ R8 は概要・ポイントだけ `-2` 付きに差し替えられている（掲載ページ更新でファイル名が付け替わる型・
    //    福山 §13-4 と同じ疑い）ので **fetch 後すぐ archive** すること。
    // ⚠ **R1（令和元年度）の参考資料が回収できない** — 旧サイトの掲載ページは Wayback にありリンクも実在するが
    //    PDF 自体の捕捉が CDX で0件、発行元は 404。⇒ 鎖は R8〜R2 の6リンクで、H30・H29（Wayback にあり同型で
    //    読めることは偵察が実測）とは繋がらない。
    // 前年度列は**当初**（R8→R2 の6ペアで36款の款名と金額が前年度資料の当年度列と完全一致・偵察がスクリプトで
    //    全件突合）。列順の反転は無い。議会修正の痕跡も無い。
    // [年度, landing の末尾2セグメント, 添付ディレクトリ, ファイル名]
    ["R8", "1019982/1016409", "001/016/409", "r8sanko"],
    ["R7", "1015632/1020589", "001/020/589", "r7sanko"],
    ["R6", "1010991/1010992", "001/010/992", "r6sanko"],
    ["R5", "1010995/1010997", "001/010/997", "r5sanko"],
    ["R4", "1010999/1011000", "001/011/000", "r4sankousiryo"],
    ["R3", "1011003/1011004", "001/011/004", "r3sankousiryo"],
    ["R2", "1011007/1011009", "001/011/009", "r2tousyoyosannsannkousiryo"],
  ] as const).map(([fy, page, dir, file]) => ({
    id: `kawagoe-yosan-sankou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 川越市予算関係参考資料（一般会計予算の款別一覧表 歳入・歳出）`,
    publisher: "川越市",
    url: `https://www.city.kawagoe.saitama.jp/_res/projects/default_project/_page_/${dir}/${file}.pdf`,
    landingPage: `https://www.city.kawagoe.saitama.jp/shisei/zaisei/1010980/1010990/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "川越市（一般会計・団体コード112011）",
    // 「著作権について」（/shisei/about/1013538.html・更新日 2024-11-22・確認日 2026-08-23）＝
    //    条項が**「テキスト、画像、PDF、音声そのほかのデータ」を名指し**でサイト全体に掛けており本 PDF に及ぶ。
    // ⚠ 川越市は独自のオープンデータサイトを持たず、埼玉県ポータルの川越市データセット**全40件**を実列挙しても
    //    予算・決算・財政は0件（§9g）。
    // リンクは「原則として自由」＋フレーム埋め込みのみ禁止＋「トップページ以外の URL は予告なく変更することが
    //    あります」＝§11h 第3群＋第4群の注意喚起（島根 §11l・長崎市 §13-7 と同じ読み分け）→ `noDeepLink` は立てない。
    license:
      "市ホームページから発信する情報（テキスト、画像、PDF、音声そのほかのデータ）の著作権は、川越市に帰属します。また、一部の写真、イラスト画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 2,
      expenditurePage: 3,
      revenueHeading: "（１）歳入",
      expenditureHeading: "（２）歳出",
      ...(fy === "R2" ? { prevBlankAsZero: { revenue: [6] } } : {}),
    },
  })),

  ...([
    // 高槻市（大阪府・中核市・団体コード 272078）。「予算の概況」の分冊 PDF。**歳入と歳出が別ファイル**で、
    // どちらも表は物理 p.1（印字ノンブルは無い）。単位は「（単位：千円）」。
    // ⚠⚠ **PDF 本体に「高槻市」の文字が1つも無い**（全ページ grep で0件）。取り違えても本文からは分からないので、
    //    取得元 URL と p.2 の注記（住民基本台帳人口 R8=343,439人 / R7=345,034人）で同一性を確かめること。
    // ⚠⚠ **同じ PDF の物理 p.2 が「（市民一人あたりの額）」で、見出し語・合計ラベル・款構成が本表と同一**
    //    （高崎 H22 §13-8 型）＝**物理ページの固定と目視だけが網**。⚠ 歳入合計＝歳出合計なので取り違えも Σ では
    //    捕まらないが、歳入/歳出は**見出し語が違うので入れ替えると throw する**（偵察が実測）。
    // ⚠ 款番号は全角 `１．`（全角ピリオド）→ `kanNamePrefixStrip` が無いと全款が `．市税` になる（**Σ 差0 のまま**）。
    // ⚠ 列見出し `科 目` が単独行（姫路 §13 型）。さらに**歳入だけ**款1 の下に縦書きの表側ラベル「主 な 内 訳」があり、
    //    `な` の行が款2 の頭に混入して `な地方譲与税` になる（§9i 岡山型・**Σ 差0**）→ `^科目$|^な$`。
    // ⚠⚠ **R5・R4 は発行元から削除済み**（live の attachment は 404 を実測）。**このページは常に直近3年度分しか
    //    置かず、落ちた年度は PDF ごとサーバーから消える**。⇒ **Wayback の写しが唯一の経路**（`id_` の replay URL を
    //    そのまま url に置く。甲府 R5 の WARP 経由と同型）。**R3 以前は Wayback にも捕捉が無い**（`unrecordable.ts`）。
    // ⚠⚠ **R5 は市長選（2023年4月）の年で当年度が骨格予算**。発行元は「骨格」と「肉付け（6月補正後）」の2本を
    //    公表しているが、**当初予算は骨格のほう**を採る（§11k のルールどおり当年度が骨格なら `prevNote` に書かない）。
    // ⚠⚠ **`prevBasis` の自動判定が2年度で逆に落ちる**（新しい型）:
    //    - **R6 は前年度列が「６月補正後 予算額」（R5 骨格の肉付け後）なのに自動判定は「当初」に落ちる** —
    //      「６月補正後」と「予算額」が原典で**別行**にあり「補正後予算額」の連続文字列にならないため。
    //      → `prevBasis: "補正後"` を明示する。⚠ **高槻は R6 について前年度当初との比較を一切公表していない**
    //      （予算参考資料ルートでも同じ6月補正後）ので、この年度だけは補正後で収録するしかない。
    //    - （参考）R5 の**肉付け**版は前年度が R4 当初なのに自動判定が「補正後」に落ちる（当年度側の `６月補正後` と
    //      隣列の `予算額` が空白除去で連結するため）。骨格を採るので該当しないが、次に触る人のために記す。
    // ⚠ **R4 の歳出款11 災害復旧費は全4セルが ASCII ハイフン**（整数0個）で、`dashAsZero` が無いと款名が溜まって
    //    `災害復旧費----公債費` になる（**Σ 4系統差0 のまま静かに通る**）。ダッシュ行が出るのは R4 歳出だけ。
    // ⚠ 款体系が R5 で切り替わる（歳入は R5・R4 が22款で款20 に**繰越金**・R6 以降21款／歳出は R4 が14款で
    //    款11 に**災害復旧費**・R5 以降13款）。総額は連続するのでクロスチェーンは通る。
    // 前年度列は R8・R7・R5 が**当初**（隣接ペアが一致・偵察が実測）、R6 のみ**補正後**。
    // [年度, 歳入 URL, 歳出 URL]
    ["R8", "https://www.city.takatsuki.osaka.jp/uploaded/attachment/64584.pdf", "https://www.city.takatsuki.osaka.jp/uploaded/attachment/64570.pdf"],
    ["R7", "https://www.city.takatsuki.osaka.jp/uploaded/attachment/52675.pdf", "https://www.city.takatsuki.osaka.jp/uploaded/attachment/52627.pdf"],
    ["R6", "https://www.city.takatsuki.osaka.jp/uploaded/attachment/41479.pdf", "https://www.city.takatsuki.osaka.jp/uploaded/attachment/41484.pdf"],
    ["R5", "https://web.archive.org/web/20250617172858id_/https://www.city.takatsuki.osaka.jp/uploaded/attachment/33368.pdf", "https://web.archive.org/web/20250617163115id_/https://www.city.takatsuki.osaka.jp/uploaded/attachment/29086.pdf"],
    ["R4", "https://web.archive.org/web/20250328150344id_/https://www.city.takatsuki.osaka.jp/uploaded/attachment/19938.pdf", "https://web.archive.org/web/20250328143150id_/https://www.city.takatsuki.osaka.jp/uploaded/attachment/19937.pdf"],
  ] as const).map(([fy, rev, exp]) => ({
    id: `takatsuki-yosan-gaikyo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 高槻市予算の概況（一般会計歳入予算・歳出予算（目的別分類）対前年度比較表）${fy === "R5" ? "（骨格予算）" : ""}`,
    publisher: "高槻市",
    url: null,
    urls: [rev, exp],
    landingPage: "https://www.city.takatsuki.osaka.jp/soshiki/7/56048.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "高槻市（一般会計・団体コード272078）",
    // 「アクセシビリティ・個人情報・著作権など」（/soshiki/6/38436.html・更新 2024-12-09・確認日 2026-08-23）
    //    ＝サイト全体の条項で対象を限定する文言が無いので本 PDF に及ぶ。
    // ⚠ BODIK の高槻市（org 272078・**全28データセット**）を CKAN API で全件走査したが予算資料は非登載
    //    （ヒットする「高槻市統計書(財政)」は**決算**の XLSX）。オープンデータページも「左記のクレジットを
    //    掲載しているデータは」と自ら範囲を限る ＝ CC BY は及ばない（§9g）。
    // リンクは「本サイトへのリンクはフリーです。市に承認を求める必要はありません。」＋「リンクは**なるべく**
    //    フロントページに…（フロントページ以外は）リンク切れになる場合がありますのでご了承ください」＋フレーム禁止
    //    ＝**リンク切れの注意喚起**（高松 §13-5 と同型）＋§11h 第3群 → `noDeepLink` は立てない。
    //    ⚠ 「なるべくフロントページ」は鹿児島・川口 §13 と同じ第2群との**境界**。
    license:
      "本サイトに掲載の文章、画像などの著作権は、高槻市または原著作者に帰属します。著作権法上認められている適切な方法で利用する場合を除き、無断使用・無断転載することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenueFile: rev.split("/").pop()!,
      expenditureFile: exp.split("/").pop()!,
      revenuePage: 1,
      expenditurePage: 1,
      revenueHeading: "一般会計歳入予算対前年度比較表",
      expenditureHeading: "一般会計歳出予算（目的別分類）対前年度比較表",
      revenueHeaderExtra: "^科目$|^な$",
      expenditureHeaderExtra: "^科目$",
      kanNamePrefixStrip: "．",
      ...(fy === "R6"
        ? {
            prevBasis: "補正後" as const,
            prevNote:
              "前年度（令和5年度）欄は6月補正後予算額。令和5年度は市長選挙の年で当初予算が骨格予算であったため、原典が肉付け後の額を比較対象にしている。",
          }
        : {}),
      ...(fy === "R4" ? { dashAsZero: true } : {}),
    },
  })),

  ...([
    // 大津市（滋賀県・中核市・団体コード 252018。⚠ 収録済みの滋賀県 250007 とは別法人・別サイト・別条項）。
    // 「各会計予算及び予算説明書」巻頭の「一般会計歳入歳出予算事項別明細書 １ 総括」（歳入23款・歳出13款）。
    // ⚠ **年度ごとに総括の物理ページがずれる**（R8=51/52・R7=45/46・R6=49/50・R5=47/48・R4=45/46）ので外挿しない。
    //    印字ノンブルとのズレも年度で違う（R8 は +12）。
    // ⚠⚠ **歳入合計＝歳出合計**なので歳入/歳出のページを取り違えても Σ は差0 のまま素通りする。網は見出し語1枚。
    //    ⚠ 同じ PDF の特別会計・企業会計の「第1表 歳入歳出予算」は**前年度列を持たない**ので取り違えると throw する。
    // ⚠⚠⚠ **前年度列の基準が年度ごとに割れ、規則性が無い**（R4＝補正後・R5＝当初・R6＝補正後・R7＝補正後・R8＝当初）。
    //    発行元が「予算の概要」p.1 に「（ ）内は前年度当初**第1次補正後**との比較」と明記する年と、
    //    「前年度当初予算との比較」と書く年があり、**R8 では注記そのものが消えている**（R7 の当年度と全款一致するので当初と確定）。
    //    ⚠ **市税は「補正後」の年度でも一致する** — 動くのは国庫支出金・県支出金・繰入金・総務費・民生費など補正が乗った款だけ。
    //    **款を1つだけ見て「当初だ」と判断してはいけない**。⚠ `prevBasis` を付け忘れると **derive の年度間クロスチェーンが
    //    error で止まる**（validate は Σ が自己整合するので通る）＝静かには壊れないが、新年度を足すときは必ず注記を読むこと。
    // ⚠⚠ **R7 以前は発行元から完全に消えている**（ページも PDF も 404）。しかも **Wayback には予算説明書の捕捉が1件も無い**
    //    （`material/files/group/114/*` の CDX 全31件を実取得して確認）ので、**WARP（waid/11252）が唯一の写し**。
    //    ⇒ url・landingPage とも WARP の pywb URL を置く（甲府 R5 と同型）。R5〜R4 は 4.5MB 級なので §9b の
    //    MiB 打ち切りに注意し、archive の sha256 照合を必ず見ること。
    // ⚠ **R3 は収録しない** — 資料自体は同型で読めるが、**前年度列（113,090,000）の基準が確認できない**
    //    （R2 の予算説明書がウェブに無く突合できない）。丸い数字なので当初らしいが確証が無く、R2 が無いので
    //    derive のクロスチェーンも張られない＝**間違った prevBasis を静かに収録してしまう**ため落とした。
    // ⚠ ファイル名に規則が無い（`r8tousyo` / `r7tousyo` / `reiwa6tousyo` / `r5tousyo` / `toushoyosan`）。年度から外挿しない。
    // 款名は全件クリーンで、款10 `国有提供施設等所在市町村助成交付金` も**折返しの切れが無く完全形**（豊川・和泉とは違う）。
    // [年度, url, landingPage, 歳入ページ, 歳出ページ, prevBasis（"-" なら当初）]
    ["R8", "https://www.city.otsu.lg.jp/material/files/group/114/r8tousyo.pdf", "https://www.city.otsu.lg.jp/soshiki/005/1207/g/zaisei/yg/72927.html", 51, 52, "-"],
    ["R7", "https://warp.ndl.go.jp/20250517/20250515112703/https://www.city.otsu.lg.jp/material/files/group/114/r7tousyo.pdf", "https://warp.ndl.go.jp/20250512/20250512052325/https://www.city.otsu.lg.jp/soshiki/005/1207/g/zaisei/yg/66756.html", 45, 46, "補正後"],
    ["R6", "https://warp.ndl.go.jp/20240517/20240515024644/https://www.city.otsu.lg.jp/material/files/group/114/reiwa6tousyo.pdf", "https://warp.ndl.go.jp/20240517/20240515024644/https://www.city.otsu.lg.jp/soshiki/005/1207/g/zaisei/yg/60670.html", 49, 50, "補正後"],
    ["R5", "https://warp.ndl.go.jp/20230516/20230513045555/https://www.city.otsu.lg.jp/material/files/group/114/r5tousyo.pdf", "https://warp.ndl.go.jp/20230516/20230513045555/https://www.city.otsu.lg.jp/soshiki/005/1207/g/zaisei/yg/54010.html", 47, 48, "-"],
    ["R4", "https://warp.ndl.go.jp/20221114/20221112063843/https://www.city.otsu.lg.jp/material/files/group/114/toushoyosan.pdf", "https://warp.ndl.go.jp/20221114/20221112063843/https://www.city.otsu.lg.jp/soshiki/005/1207/g/zaisei/yg/47181.html", 45, 46, "補正後"],
  ] as const).map(([fy, url, landing, revPage, expPage, basis]) => ({
    id: `otsu-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 大津市各会計予算及び予算説明書（一般会計歳入歳出予算事項別明細書 総括）`,
    publisher: "大津市",
    url,
    landingPage: landing,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "大津市（一般会計・団体コード252018）",
    // 「ホームページ 著作権・免責事項について」（/shisei/koho/hp/5184.html・更新日 2025-04-25・確認日 2026-08-23）。
    //    条項が「（文章、写真、イラスト、**PDFなど**）」と PDF を名指ししている。
    // ⚠ 例外は「大津市オープンデータポータルサイト」に限られており、そのカタログ（BODIK・**全519データセット**）を
    //    CKAN API で実検索すると 予算2件・決算2件（いずれも「統計年鑑 平成29年版」の XLSX）・財政0件で、
    //    予算説明書は**非登載**＝CC BY は及ばない（§9g）。
    // リンクは「**どのページに対してリンクしていただいてもかまいません**が、トップページへのリンクをおすすめします」
    //    ＋フレーム禁止＝§11h 第3群（「おすすめ」は要相談ではない）→ `noDeepLink` は立てない。
    license:
      "大津市ホームページに掲載しているコンテンツ（文章、写真、イラスト、PDFなど）に関する著作権は原則として大津市に帰属します。ただし、一部の画像などの著作権は、大津市以外の原著作者が所有しています。「私的使用のための複製」や「引用」など、法律で認められている場合を除き、無断で複製、転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      ...(basis === "補正後"
        ? {
            prevBasis: "補正後" as const,
            prevNote:
              "前年度欄は前年度当初予算の第1次補正後の額（発行元が「予算の概要」に明記）。年度によって当初との比較に戻るため、年度から外挿できない。",
          }
        : {}),
    },
  })),

  ...([
    // 所沢市（埼玉県・施行時特例市・団体コード 112089）。**市サイトの「予算書」ではなく議会の「議案資料」**を採る。
    // 理由: 予算書は **R7・R6 が金額の数字だけ ToUnicode 無しのサブセットで抽出時に消え**（印刷面には数字がある＝
    //   偵察が 200dpi 描画で目視確認）、**R5〜R3 はテキスト層ゼロのスキャン**。議案資料は R8〜R2 で版面が同一。
    // ⚠⚠ **R8 は議案第7号（原案 132,180,000千円）が否決され、議案第42号（再提出）が可決**された異例の年度。
    //   施政方針（2026-02-18 発表）の「1,321億8,000万円」は**否決された原案**なので、press を根拠に総額を書くと
    //   30億円ずれる。可決額は 129,186,104千円で、本資料（第42号・第43号資料）と市サイトの予算書の両方がこの額
    //   （偵察が両ルートを try-parse して一致を実測）。
    // ⚠ 同じ PDF の次ページに「一般会計予算性質別一覧表」が**同じ列構成・同じ合計**で並び、しかも歳入合計＝歳出合計。
    //   **Σ ではページ取り違えを捕まえられない**。⚠ ただし見出し語 `〈歳入〉` `〈歳出〉`（山括弧は全角）は
    //   **各 PDF 内でそれぞれ1ページにしか出現しない**（全年度で走査して確認）ので、取り違えると throw する。
    // ⚠⚠ **R6 以前は発行元から消えている**（議案ページは R6 第2回＝2024年6月以降しか残っていない）ので
    //   **Wayback の写しが唯一の経路**。⚠ **打ち切り版を掴まないこと**（§9b）— R6 は 2026-02-07 の捕捉が
    //   5,072,540 B の打ち切りで正は 2024-12-15 の版、R2 は 2020-11 の捕捉が**ちょうど 1 MiB で打ち切られ
    //   pdftotext が落ちる**。⚠ 資料は 6.8〜13MB と大きく打ち切りに当たりやすい系統なので archive の sha256 照合を必ず見る。
    // ⚠ **R3 は収録不可**（`unrecordable.ts`）— 議案資料が**議会修正前の案**（107,440,000）で、可決額 107,400,000 と
    //   歳入款23 市債・歳出款8 土木費が各 △40,000 違う（偵察が全款突合して不一致がこの2款だけであることを実測）。
    //   ⇒ **鎖は R8〜R4 の4リンク**で切れる（R2 も読めるが孤立するので今回は入れていない）。
    // ⚠ 款10 の名称はルートで違う（議案資料＝`国有提供施設交付金` / 予算書＝`国有提供施設等所在市町村助成交付金等`）。
    //   **どちらも各原典どおり**なので寄せない。議案資料で統一するので全年度が前者になる。
    // 前年度列は**当初**（列見出しが両年度とも「当初予算額」＋隣接ペアで23款＋13款が全件一致・偵察が実測）。
    // [年度, url, landingPage, 歳入ページ, 歳出ページ]
    ["R8", "https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/reiwa8nendai2kai.files/siryo-R08-042-043.pdf", "https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/reiwa8nendai2kai.html", 37, 38],
    ["R7", "https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/reiwa7nendai1kaiteireikai.files/siryou-R7-009-018.pdf", "https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/reiwa7nendai1kaiteireikai.html", 38, 39],
    ["R6", "https://web.archive.org/web/20241215224253id_/https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/reiwa6nendai1kaiteireikai.files/siryo-R6-008-017.pdf", "https://web.archive.org/web/20250214111844/https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/reiwa6nendai1kaiteireikai.html", 38, 39],
    ["R5", "https://web.archive.org/web/20230307132338id_/https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/bunsyo.files/siryoR5-9-18.pdf", "https://web.archive.org/web/20230306080104/https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/bunsyo20230208.html", 39, 40],
    ["R4", "https://web.archive.org/web/20220217075820id_/https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/bunsyo20220216101931943.files/siryo-R4-011-020.pdf", "https://web.archive.org/web/20220217075546/https://www.city.tokorozawa.saitama.jp/shiseijoho/shichougian/bunsyo20220216101931943.html", 37, 38],
  ] as const).map(([fy, url, landing, revPage, expPage]) => ({
    id: `tokorozawa-yosan-siryo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 所沢市当初予算 議案資料（一般会計予算款別一覧表 歳入・歳出）`,
    publisher: "所沢市",
    url,
    landingPage: landing,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "所沢市（一般会計・団体コード112089）",
    // 「著作権について」（/aboutweb/copyrightpolicy.html・更新日 2022-11-18・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ 所沢市のオープンデータは**埼玉県ポータル**に登録されており（PDL1.0）、所沢市の登録は統計書・地図・観光地情報の
    //    19件だけで**予算・決算・財政は0件**（ポータルを 所沢／予算／決算 で実検索）＝及ばない（§9g）。
    //    ⚠ 統計書リソースの PDL1.0 を予算 PDF に流用しないこと。
    // ⚠⚠ **`noDeepLink` を立てた**（§11h 第2群）: リンクは「原則として自由に設定していただいてかまいません」だが、
    //    留意事項に「**リンクを設定する際には、事前に『お名前、ご連絡先…リンクを設定するウェブサイトの URL』を
    //    ご連絡下さい**」＝**事前連絡の要求**（山口県型の第5群＝事後連絡の依頼とは「事前か事後か」で分かれる）。
    noDeepLink: true,
    license:
      "所沢市ホームページ上に掲載されている文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として所沢市に帰属します。（一部の画像等の著作権は、原著作者が所有しています。）また、所沢市ホームページ内にて掲載された会社名・製品名などの名称は、一般に各社の商標あるいは登録商標です。著作権法上認められる場合を除き、所沢市の許可なく所沢市ホームページ上に掲載されている文書や画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。なお、所沢市の各課が配信するページ等に利用規約等、特段の定めがある場合は、この取り扱いに優先するものとします。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "〈歳入〉",
      expenditureHeading: "〈歳出〉",
    },
  })),

  // ---- 中核市など 第9弾（2026-08-23・loop.md の第10巡）--------------------------------------------
  ...([
    // 前橋市（群馬県・中核市・団体コード 102016。⚠ 収録済みの高崎市 102024・群馬県 100005 とは別サイト・別条項）。
    // 財政課「予算の編成方針・概要」に R8〜H29 の「当初予算資料」（予算内示資料）が**1ページに10年度並ぶ**。
    // 第2表「一般会計歳入・歳出予算計上額款別一覧表」＝歳入 物理 p.6 / 歳出 物理 p.8（10年度とも不動）。
    // ⚠⚠⚠ **同じ PDF の p.10 が第3表「一般会計予算性質別計上額一覧表」で、見出しも `【歳出】` で同じ・合計も同額**。
    //    **`expenditurePage: 10` を当てても throw せず Σ も4系統差0 のまま完走し、款1 が `人件費` になる**
    //    （収録時に実際に再現した）。しかも**歳入合計＝歳出合計**なので歳入/歳出の取り違えも Σ では捕まらない。
    //    ⇒ **物理ページの固定と款名の目視だけが網**（町田 §13-5・宮崎 §13-6・高崎 H22 §13-8 と同型）。
    //    収録時に10年度すべてで**款1 が `議会費` であること**を確認した。
    //    ⚠ ただし歳入/歳出の入れ替えは `【歳入】` の角括弧つき見出しが throw で止める（実測）。
    // ⚠ **ファイル名に規則が無い**（R8 だけ末尾 `2`・R4 は `_annwonozoku`・H31〜H29 は `syousai31`/`yosannsyousai`/`syousai`）。
    //    **年度から外挿して URL を組まない**。
    // ⚠ 印字ノンブルは R8〜H30 が物理 −3、**H29 だけ −2**。registry は物理ページ。
    // ⚠ **資料本体に自治体名が乏しい**（川越・高槻 §13-9 型）— 10ファイルとも先頭2ページに「前橋市」の字が無い。
    //    同一性は固有の特別会計名（**競輪・新エネルギー発電事業・産業立地推進事業**）と取得元 URL で確認した。
    // ⚠ **Wayback に PDF 本体の捕捉が1件も無い**（CDX が空）ので**収録後すぐ archive**（福山 §13-4 型のリスク）。
    // ⚠ R2 の廃止款は原典が **`（自動車取得税交付金）`**（全角括弧つき）。原典どおり残す（§9c）。
    // 前年度列は10年度とも**当初**（隣接9ペアで全款一致・偵察が実測）。列順の反転は無い。合計行の構成比も小数なので
    //    豊橋 §13-8 の `totalAmountIntIndex` 型にはならない。R8 の議会修正なし（6月補正の「補正前の額」と一致）。
    // [年度, ファイル名]
    ["R8", "R8tousyoyosannsiryou2.pdf"],
    ["R7", "R7_yosannaijishiryou.pdf"],
    ["R6", "R6toushoyosanshiryou.pdf"],
    ["R5", "R5_tousyo_naijisiryou.pdf"],
    ["R4", "R4tousyo_naijisiryou_annwonozoku.pdf"],
    ["R3", "R3_tousyoyosan.pdf"],
    ["R2", "R2_naiji.pdf"],
    ["H31", "syousai31.pdf"],
    ["H30", "yosannsyousai.pdf"],
    ["H29", "syousai.pdf"],
  ] as const).map(([fy, file]) => ({
    id: `maebashi-yosan-siryou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 前橋市当初予算資料（第2表 一般会計歳入・歳出予算計上額款別一覧表）`,
    publisher: "前橋市",
    url: `https://www.city.maebashi.gunma.jp/material/files/group/12/${file}`,
    landingPage: "https://www.city.maebashi.gunma.jp/soshiki/zaimu/zaisei/gyomu/3/2/4/24148.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "前橋市（一般会計・団体コード102016）",
    // 「前橋市ホームページについて」（/site/14135.html・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ 市のオープンデータカタログ（BODIK・全25データセット）は 予算/決算/財政/行財政 の実検索がいずれも0件＝
    //    本 PDF は非登載なので CC BY は及ばない（§9g）。
    // リンクは「トップページへのリンクは、原則として、ご自由に設定していただけます。ただし、トップページ以外の
    //    ページにおいてリンクの制限等の注記がある場合はこの限りではありません」＋URL 変更の注意喚起＝
    //    川口 §13・高松 §13-5 と同じ**第4群の注意喚起**（予算ページに制限の注記は無いことを実検索）→ `noDeepLink` は立てない。
    license:
      "前橋市ホームページに掲載されている文章、写真、イラスト、画像等の著作権は、前橋市またはコンテンツ提供者にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転載することはできません。「引用」を行う際は、必ず出典を明示してください。また、利用許諾については各ページの担当課へお問い合わせください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 6,
      expenditurePage: 8,
      revenueHeading: "【歳入】",
      expenditureHeading: "【歳出】",
    },
  })),

  ...([
    // 旭川市（北海道・中核市・団体コード 012041。⚠ 北海道 010006・札幌市 011002 とは別サイト・別条項）。
    // 「予算案の概要（記者発表資料）」の Ⅲ-1「歳入歳出予算の概要」＝**左＝歳入 / 右＝歳出 の同一ページ横並び**
    // （§9j 静岡型）なので `CropX` で切る。⚠⚠ **境界は年度ごとに違う**（判型が A4横のほか 967×684 / 915×647 /
    //    895×633 / 867×613 と年度でバラバラ）。**年度から外挿せず各年度で実測すること**。
    // ⚠⚠ **旭川は歳入合計＝歳出合計**なので側の取り違えは Σ では捕まらない。網は crop 後の見出し語
    //    `【歳入】`/`【歳出】` の1枚だけ（crop がずれれば heading が無くて throw する＝静かには壊れない）。
    // ⚠ 歳出款13 は **`職員費`**（総務省の目的別標準に無い独自款・人件費を各款へ配賦していない）。寄せない。
    // ⚠ **R7 だけ歳入款8 が折返しで `交通安全対策` / 款9 が `特別交付金地方譲与税` になる**（仙台型・**Σ は差0 のまま**）
    //    → `kanNameContinues: { revenue: [8] }`。R8 は同じ款が別の版面で指定不要。**年度を外挿しない**。
    // ⚠ `revenueHeaderExtra` が無いと H31 の款1 が `歳入歳出予算の概要市税` になる（**Σ 差0 のまま**）。両側に付ける。
    // ⚠ **H31 は歳入23款**（法人事業税交付金がまだ無く以降の款番号が繰り上がる）。款体系が年度で動く。
    // ⚠⚠ **予算参考資料の「２ 一般会計予算科目別比較表」は使ってはいけない** — 款行が `経常` の行で金額欄が
    //    **経常分だけ**（款の総額は3行目の `計` 行）。合計行も同じ構造なので **Σ経常 = 経常合計 が成立して差0 で
    //    静かに通り、一般会計の約80%だけを収録してしまう**（R8 なら 145,910,283 / 181,800,000）。既存オプションでは
    //    表現できない。⚠ R5 以前の事項別明細書も非テキストまたは金額が抽出で消えるので、**記者発表資料に統一する**。
    // ⚠ **ファイル名が年度で不規則**（`houdousiryou` / `kishahappyou` / `kisyahappyou`・R5・R4 は小文字始まり）。
    // ⚠ **R6〜H31 の表紙はテキスト層に市名が出ない**。同一性は取得元 URL と旭川市固有の特別会計名
    //    （**動物園事業・育英事業**）で確認した。
    // 前年度列は**当初**（R8→H31 の隣接7ペアが全款一致・H31 の前年度も市の HTML 表「予算額の推移」と一致）。
    // 議会修正なし（年度ページの HTML 表（可決後の更新）の当初額が8年度とも記者発表資料と一致・R8/R7/R6 は
    //    議案そのものの事項別明細書とも全款一致）。⚠ 旭川市長選は11月執行なので当該年度に骨格予算は無い。
    // [年度, 年度ページ ID, ファイル名, 物理ページ, crop 境界, 紙幅]
    ["R8", "d083385", "R8houdousiryou.pdf", 5, 440, 842],
    ["R7", "d081225", "R7houdousiryou.pdf", 5, 440, 842],
    ["R6", "d078978", "R6houdousiryou.pdf", 5, 434, 842],
    ["R5", "d076583", "r5kishahappyou.pdf", 6, 434, 842],
    ["R4", "d074733", "r4kishahappyou.pdf", 6, 500, 968],
    ["R3", "d072116", "R3kishahappyou.pdf", 6, 475, 916],
    ["R2", "d067961", "R2kisyahappyou.pdf", 6, 430, 896],
    ["H31", "d065375", "H31kishahappyou.pdf", 6, 448, 868],
  ] as const).map(([fy, pageId, file, page, cropX, width]) => ({
    id: `asahikawa-yosanan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 旭川市予算案の概要（歳入歳出予算の概要 一般会計款別）`,
    publisher: "旭川市",
    url: `https://www.city.asahikawa.hokkaido.jp/700/731/732/${pageId}_d/fil/${file}`,
    landingPage: `https://www.city.asahikawa.hokkaido.jp/700/731/732/${pageId}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "旭川市（一般会計・団体コード012041）",
    // 「旭川市ホームページについて」（/700/723/728/d054673.html・確認日 2026-08-23）。
    //    著作権条項が「テキスト、画像、**PDF**、そのほかのデータ」と PDF を名指しで対象に含めている。
    // ⚠ 市のオープンデータライブラリ（CC BY 2.1 JP）は「**本サイトで公開されているデータは**」と自ら範囲を限り、
    //    一覧128行を実検索しても当てはまるのは政務活動費・市税決算の CSV だけで当初予算は0件＝及ばない（§9g）。
    // ⚠⚠ **`noDeepLink` を立てた**（§11h **第1群**）: 「**一部のコンテンツ（画像やPDF等）にリンクを設定することは
    //    おやめください**」＝**PDF を名指しで断っている**（新宿・栃木と同型）。
    noDeepLink: true,
    license:
      "旭川市ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は旭川市、またはその情報提供者に帰属します。著作権についての取り扱いが明記されていない、本ホームページ上の文書・画像などの無断使用・転載、二次利用を禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: page,
      expenditurePage: page,
      revenueHeading: "【歳入】",
      expenditureHeading: "【歳出】",
      revenueHeaderExtra: "歳入歳出予算の概要",
      expenditureHeaderExtra: "歳入歳出予算の概要",
      revenueCropX: { from: 0, to: cropX },
      expenditureCropX: { from: cropX, to: width },
      ...(fy === "R7" ? { kanNameContinues: { revenue: [8] } } : {}),
    },
  })),

  ...([
    // 那覇市（沖縄県・中核市・団体コード 472018。⚠ `unrecordable.ts` に載っているのは**沖縄県 470007** であって
    //    那覇市ではない。市は別サイト・別資料なので県の事情は当てはまらない）。
    // 「一般会計予算及び予算に関する説明書」の**歳入歳出予算事項別明細書 １ 総括**（歳入22〜23款・歳出14款・単位千円）。
    //    歳入は2ページに割れるので `revenuePages`、歳出は1ページ。**物理＝印字＋4**。
    // ⚠⚠ **歳出の財源内訳ヘッダが2行に割れて款1 に混ざる** — `本`（単独行）と `国 県 支 出 金 地 方 債 そ の 他` が
    //    `KAN_HEADER_RE` に当たらず、**款1 が `本国県支出金地方債その他議会費` になる**（**Σ は4系統とも差0 のまま
    //    ＝静かに通る型**。偵察が実測し、収録時に款1 が `議会費` であることを確認した）→ `expenditureHeaderExtra` が必須。
    //    ⚠ `国県支出金` は**歳入では実在する款名**なので**歳出側だけ**に足す（神戸 §8h と同型）。
    // ⚠ **歳入合計＝歳出合計**なので歳入/歳出のページ取り違えは Σ では捕まらない。網は見出し語 `（歳入）`/`（歳出）`
    //    （同じ PDF の「第1表 歳入歳出予算」は `歳 入` で括弧が無く当たらない）。
    // ⚠ **R5 だけ歳入が23款**（款23 自動車取得税交付金 1,343 / 0 が新設）。原典どおりなので寄せない。
    // ⚠ 款11 災害復旧費は当年度・前年度とも **4千円の名目計上**（原典どおり）。
    // ⚠⚠ **R6 が欠けるので鎖は R8↔R7 と R5↔R4 の2本に割れる** — R6・H31・H30 は総括表の**数字が ToUnicode を持たない
    //    非埋め込みフォントで描かれ抽出時に丸ごと消える**（漢字も別系統で化ける）、R3・R2 は**本文がアウトライン化**、
    //    H29 以前は「予算書」（第1表のみ）で**前年度列が無い**。いずれも `unrecordable.ts` に登録済み（2026-08-23）。
    //    ⚠ 収録できない年度も偵察が画像で目視して**公表値が年度をまたいで動いていない**ことを確認済み。
    // ⚠ 年度ディレクトリとファイル名に規則性が無く、landing も R5 以前は `/1004391/` が挟まる。
    // 前年度列は**当初**（R8 の前年度列＝R7 の当年度列が36款すべて一致・R5↔R4 も新設款以外一致）。
    // 議会の議決は R8・R7・R5・R4 とも**原案可決**（議決結果 PDF を偵察が実測。組み替え動議はいずれも否決）。
    // [年度, ファイルのディレクトリ, ファイル名, landing のパス, 歳入の開始物理ページ]
    ["R8", "001/011/083", "02_r8_ippannkaikeiyosannsho.pdf", "1004386/1011083", 21],
    ["R7", "001/004/387", "02_ippannyosannsyo.pdf", "1004386/1004387", 23],
    ["R5", "001/004/392", "02_r5ippannkaikeiyosannsyo.pdf", "1004386/1004391/1004392", 21],
    ["R4", "001/004/393", "02_r4ippannkaikeiyosannsyo.pdf", "1004386/1004391/1004393", 21],
  ] as const).map(([fy, dir, file, page, rev]) => ({
    id: `naha-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 那覇市一般会計予算及び予算に関する説明書（歳入歳出予算事項別明細書 総括）`,
    publisher: "那覇市",
    url: `https://www.city.naha.okinawa.jp/_res/projects/default_project/_page_/${dir}/${file}`,
    landingPage: `https://www.city.naha.okinawa.jp/admin/nahashizaisei/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "那覇市（一般会計・団体コード472018）",
    // 「利用規約」（/about/1005983.html・更新日 令和7年12月24日・確認日 2026-08-23）＝
    //    「本ホームページに掲載されている文書や画像等の**各ファイル**」でサイト全体が対象。
    // ⚠ オープンデータカタログ（BODIK・CC BY 4.0）は「当サイトの内容」限定で、**全38データセット中
    //    予算0件・財政0件・歳入0件**（CKAN API で実検索）＝及ばない（§9g）。
    // リンクは「原則としてリンクフリー」＋「リンクを行った場合、特に連絡の必要はありません」＝§11h 第4群（制限なし）
    //    → `noDeepLink` は立てない。
    license:
      "「私的使用のための複製」や「引用」等著作権法上認められる場合を除き、那覇市の許可なく本ホームページに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配付することを禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePages: { from: rev, to: rev + 1 },
      expenditurePage: rev + 2,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      expenditureHeaderExtra: "^本$|^国県支出金地方債その他$",
    },
  })),

  ...([
    // 越谷市（埼玉県・中核市・団体コード 112224。⚠ 埼玉県・さいたま市・川口市・川越市・所沢市とは別サイト・別条項）。
    // 「当初予算の概要」PDF の「一般会計当初予算 １ 歳入」（21款）/「２ 歳出［目的別］」（14款）。
    // ⚠ **物理ページが年度で3段階に動く**（R8〜R3=6/8・R2〜H25=30〜36/32〜38・H24=20/22）ので年度ごとに持つ。
    // ⚠⚠ **同じ PDF に「同じ列構成の別の表」が3つある**（p.10 性質別・p.12 自主/依存財源・p.5 会計別）。
    //    **歳入合計＝歳出合計**なので取り違えは Σ では捕まらない。網は見出し語1枚（p.10 に当てると throw することを
    //    偵察が実測）。⚠ 括弧は隅付きではなく **`［ ］`**。
    // ⚠ **PDF の1ページ目に「越谷市」の字が無い**（全15年度・川越/高槻 §13-9 型）。同一性は取得元 URL と本文の
    //    固有名（越谷しらこばと基金・越谷市斎場）で確かめる。
    // ⚠⚠ **`dashAsZero` は H31 だけに付ける** — H31 は款8 環境性能割交付金が新設で前年度セルが `−` の**2行折返し**に
    //    なり、指定しないと**款が行ごと落ちて当年度Σ −60,000**（ゲートが error で捕まえる）。
    //    ⚠⚠ **逆に R2 に付けてはいけない** — 廃止款「自動車取得税交付金」の前年度 130,000 が 0 になり
    //    **前年度Σ −130,000**（**validate では warning 止まり＝derive まで流れる**）。収録時に両方を再現して確認した。
    // ⚠ 歳出款14 は **`予備費`**（総務省の目的別標準に無い独自款・120,000千円）。黙って落とさない・寄せない。
    // ⚠⚠ **ライセンスが年度で割れる**（一宮 §13-8 と同型だが**新しい年度のほうが非オープン**）—
    //    **H27〜R6 は資料そのものが埼玉県オープンデータポータル（`https://opendata.pref.saitama.lg.jp/`）に登載されて
    //    PDL1.0**（ポータル版と市サイト版が sha256 一致または本文完全一致であることを偵察が実測・確認日 2026-08-23）。
    //    リソース ID は R6=5573 / R5=5550 / R4=3494 / R3=3473 / R2=2722 / R元=2720 / H30=2732 / H29=2728 / H28=447 /
    //    H27=433（`https://opendata.pref.saitama.lg.jp/resources/<ID>`）。**R8・H26〜H24 は未登載**なので市サイトの条項
    //    （「著作権・リンク等」/aboutweb/tyosakuken.html・更新 2026-02-04 と「越谷市のオープンデータ」・更新 2025-09-29・
    //    どちらも確認日 2026-08-23）。⚠ raw は全年度**市サイトから**取得しているので、ポータル側は上の ID から辿る。
    //    ⚠ R8 は例年5月ごろ登載されるので、登載されたら license を PDL1.0 へ振り替えられる（確認日つきの実測として書く）。
    // ⚠⚠ 市サイトの条項は**2か所を併記しないと区分が変わる** — 「著作権・リンク等」の原文（「許可・承諾を得ないまま…
    //    お断りします」）**だけ**だと `licenseClassOf` が `unverified` に落ちる。オープンデータページの
    //    「**無断で転載することは禁止されています**」を併記して初めて `permission-required` になる（偵察が実測）。
    // 前年度列は**当初**（15年度の隣接ペアで合計・市税・議会費が一致。さらに R8 6月補正の「補正前 132,700,000」・
    //    R6 4月補正の「補正前 115,700,000」と一致＝**議会修正なく可決**）。
    // [年度, PDF の相対パス, landing の相対パス, 歳入物理ページ, 歳出物理ページ, ポータル登載か]
    ["R8", "r08/files/r8toushoyosannogaiyou.pdf", "r08/koshigaya_contents_r8toushogaiyo.html", 6, 8, false],
    ["R6", "R06/files/R6tousyogaiyou.pdf", "R06/koshigaya_contents_r5toushogaiyo.html", 6, 8, true],
    ["R5", "R05/files/R5yosanngaiyou.pdf", "R04/koshigaya_contents_r5toushogaiyo.html", 6, 8, true],
    ["R4", "R04/files/R4tousyoyosanngaiyou.pdf", "R04/R04toushoyosangaiyo.html", 6, 8, true],
    ["R3", "R03/R03toushoyosangaiyo_files_R03toushoyosangaiyo.pdf", "R03/R03toushoyosangaiyo.html", 6, 8, true],
    ["R2", "R02/R02toushoyosangaiyo_files_tousyo_gaiyou02.pdf", "R02/R02toushoyosangaiyo.html", 34, 36, true],
    ["H31", "h31/31toushoyosangaiyo_files_tousyo_gaiyou31.pdf", "h31/31toushoyosangaiyo.html", 34, 36, true],
    ["H30", "h30/2019tousyoyosannnogaiyou_files_H30.pdf", "h30/2019tousyoyosannnogaiyou.html", 34, 36, true],
    ["H29", "h29/H29tousyo_gaiyou_files_H29gaiyou.pdf", "h29/H29tousyo_gaiyou.html", 36, 38, true],
    ["H28", "h28/koshigaya_contents_2016yosan_files_tousyo_gaiyou28.pdf", "h28/koshigaya_contents_2016yosan.html", 34, 36, true],
    ["H27", "h27/koshigaya_contents_20150401_files_tousyo_gaiyou27.pdf", "h27/koshigaya_contents_20150401.html", 30, 32, true],
    ["H26", "h26/h26-toushoyosan-gaiyou_files_tousyo_gaiyou26.pdf", "h26/h26-toushoyosan-gaiyou.html", 32, 34, false],
    ["H25", "h25/h25_toushoyosan_gaiyou_files_tousyo_gaiyou25.pdf", "h25/h25_toushoyosan_gaiyou.html", 32, 34, false],
    ["H24", "h24/heisei24_tousyoyosan_gaiyou_files_tousyo_gaiyou24.pdf", "h24/heisei24_tousyoyosan_gaiyou.html", 20, 22, false],
  ] as const).map(([fy, file, page, rp, ep, onPortal]) => ({
    id: `koshigaya-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 越谷市当初予算の概要（一般会計当初予算 歳入・歳出［目的別］）`,
    publisher: "越谷市",
    url: `https://www.city.koshigaya.saitama.jp/kurashi_shisei/shisei/yosankessan/yosan/${file}`,
    landingPage: `https://www.city.koshigaya.saitama.jp/kurashi_shisei/shisei/yosankessan/yosan/${page}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "越谷市（一般会計・団体コード112224）",
    // リンクは「リンク先は**原則メインサイトまたはサブサイトのトップページとし**」＝§11h 第2群（長崎県と同じ構文）
    //    → `noDeepLink` を立てる。⚠ open の年度では derive の振替が効かない（no-op）が、発行元の意思の記録として立てる
    //    （豊橋 §13-8 の前例）。
    noDeepLink: true,
    license: onPortal
      ? "公共データ利用規約第1.0版（PDL1.0）"
      : "越谷市公式ホームページに掲載される記事、写真、図画、その他のデータ類の著作権は、越谷市、またはその情報提供者に帰属します。また、そのすべてについて、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、越谷市の許可・承諾を得ないままほかのメディア等へ転載・引用することはお断りします。ホームページ上で公開しているデータは、行政情報を広くお知らせするためのものであり、掲載されている情報や画像等を無断で転載することは禁止されています。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: "一般会計当初予算",
      expenditureHeading: "歳出［目的別］",
      ...(fy === "H31" ? { dashAsZero: true } : {}),
    },
  })),
  {
    // ⚠⚠ **R7 だけ「当初予算の概要」が使えない** — 本文がアウトライン化していて全46ページで抽出できる CJK が
    //    35字だけ（Producer は `Microsoft: Print To PDF`・元は DocuWorks）。**Wayback の捕捉2件も digest が現物と同一**
    //    ＝差し替え前の健全版は存在しない。⇒ 同年度の「当初予算査定状況（一般会計 款別）」で代替する。
    // ⚠ 列が4本 `[令和6年度当初予算額, 令和7年度予算要求額, 令和7年度予算（案）額, 増減（対要求額）]` なので
    //    `amountIntIndex: 2` / `prevIntIndex: 0`。前年度列の見出しは原典が「令和6年度 当初予算額」と明示。
    // ⚠ 「予算（案）額」だが、同年度の概要 XLSX（可決後の 2025-05-07 公表）と全35款が完全一致し、R8 概要の
    //    前年度列とも一致＝**議会修正は無い**（偵察が実測）。
    // ⚠ **この PDF には「越谷」の字が1つも無い**。同一性は URL と上記の値一致で確認した。
    // ⚠ **id の接頭辞が `-gaiyou-` と違うので derive の年度間クロスチェーンは R8↔R7↔R6 の2リンクが外れる**
    //    （長野 H29 §13-8 の前例）。**手検算の結果**: 査定 R7 の当年度 132,400,000 ＝ R8 概要の前年度、
    //    査定 R7 の前年度 115,700,000 ＝ R6 概要の当年度（市税・議会費も一致することを偵察が全件突合）。
    // ⚠ 査定状況 PDF は**ポータルに登載されていない**（登載は概要・予算書・事業別予算書・予算一覧の4点のみ）ので
    //    PDL1.0 は及ばない（§9g）。市サイトの条項を書く。
    id: "koshigaya-yosan-satei-r7",
    title: "令和7年度 越谷市当初予算査定状況（一般会計 款別 歳入・歳出）",
    publisher: "越谷市",
    url: "https://www.city.koshigaya.saitama.jp/kurashi_shisei/shisei/yosankessan/yosan/R07/files/r7kannbetusateijoukyou.pdf",
    landingPage:
      "https://www.city.koshigaya.saitama.jp/kurashi_shisei/shisei/yosankessan/yosan/R06/R7tousyoyosan_sateizyoukyou.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "越谷市（一般会計・団体コード112224）",
    noDeepLink: true,
    license:
      "越谷市公式ホームページに掲載される記事、写真、図画、その他のデータ類の著作権は、越谷市、またはその情報提供者に帰属します。また、そのすべてについて、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、越谷市の許可・承諾を得ないままほかのメディア等へ転載・引用することはお断りします。ホームページ上で公開しているデータは、行政情報を広くお知らせするためのものであり、掲載されている情報や画像等を無断で転載することは禁止されています。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 1,
      expenditurePage: 2,
      revenueHeading: "歳入［款別］",
      expenditureHeading: "歳出［款別］",
      amountIntIndex: 2,
      prevIntIndex: 0,
    },
  },

  ...([
    // 郡山市（福島県・中核市・団体コード 072036。⚠ 収録済みの福島県 070009 とは別法人・別サイト・別条項）。
    // 財政課「当初予算の概要」（PowerPoint 出力）の「令和X年度当初予算詳細（一般会計歳入）/（歳出）」
    // ＝歳入24款・歳出14款。合計ラベルは歳入歳出とも **`合計`**（既定ではない）。
    // ⚠⚠ **物理ページが年度ごとに大きく動く**（76/46/60/80/104/79/95）。**外挿禁止**。
    //    年度ページの URL も PDF の attachment 番号も**連番でない**ので、新年度は必ず `/life/6/39/274/` から辿る。
    // ⚠⚠⚠ **右側の円グラフのラベルが款名に混ざる**（R8 歳出は無指定だと `5 公債費労働費` `10 民生費教育費` など
    //    **6款が壊れたまま Σ 4系統差0 で完走する**）→ `CropX` で落とす。⚠ **帯の x は年度ごとに違い、見出し語も
    //    一緒に切られる**ので `to` は「見出しが21文字目まで残る」値に取る（下げすぎると見出しが無くて throw）。
    //    ⚠ R2 の歳出だけ円グラフが x=453.6 から始まって両立できないので、表直前の単独行 `目的別` を見出しにした。
    // ⚠⚠ **`HeaderExtra` は2段構え**が要る — 表の前の本文段落が款1 に連結するが、R6 は段落末が「（自主財源）」で
    //    句読点が無く、**CropX を掛けた年度（R7・R4）は段落が途中で切られて句読点を失う**。
    //    `[、。（]|^[^0-9]{20,}$`（数字を1つも含まない20字以上の行も捨てる）で7年度とも解消（偵察が実測）。
    // ⚠ 隣の「性質別」ページは**款番号が無いので当てると throw する**（静かには壊れない）。歳入⇄歳出の取り違えは
    //    見出し語が捕まえる（⚠ 郡山も歳入合計＝歳出合計なので Σ では捕まらない）。
    // ⚠⚠⚠ **R8 の前年度列は「R7 当初＋6月送り分」** — R7 は市長選（2025年4月）の**骨格予算**で、原典には
    //    **「↑Ｒ７当初予算額には、６月送り分を含む」と小さく印字されているだけ**。自動判定は「当初」に落ちるので
    //    **`prevBasis: "補正後"` の明示が必須**（付けないと derive の年度間クロスチェーンが error で止まる）。
    //    ⚠⚠ **市税・地方譲与税・地方交付税・議会費・衛生費・労働費・公債費など18款は当初と補正後で1円も違わない**
    //    （動くのは市債・繰入金・国庫/県支出金・土木費・教育費など）＝**款を1つ見て判断してはいけない**（大津 §13-9 と同型）。
    // ⚠ **R4 は前年度側（R3）が骨格予算**なので `prevNote` に書く（§11k の規約。当年度側が骨格の R7・R3 は書かない）。
    //    ⚠ 市長選は4年周期（H29 / R3 / R7）なので**次は R11 で同じことが起きる**。
    // ⚠ R2 の廃止款「自動車取得税交付金」は款番号も廃止マーカーも「皆減」の語も無い → `kanNoless`（§13-5 の一般解）。
    // ⚠ 款11 の名称はルートで違う（概要＝`国有提供施設所在交付金` / 予算に関する説明書＝`国有提供施設等所在市町村助成交付金`）。
    //    **どちらも各原典どおり**なので寄せず、概要ルートで統一する（所沢 §13-9 と同型）。
    // ⚠ 款14 `予備費` まで款として印字される（諸支出金は毎年1千円の名目計上）。標準科目へ寄せるとき落とさない。
    // 議会修正なし（令和8年3月定例会の議決結果 PDF に「議案第39号 令和８年度郡山市一般会計予算 原案可決」）。
    // [年度, attachment, 歳入p, 歳出p, 歳入見出し, 歳出見出し, 歳入crop, 歳出crop, landing]
    ["R8", "117243", 76, 79, "令和８年度当初予算詳細（一般会計歳入）", "令和８年度当初予算詳細（一般会計歳出：目的別", 0, 485, "172530"],
    ["R7", "96119", 46, 49, "（６）令和７年度当初予算詳細（一般会計歳入", "（６）令和７年度当初予算詳細（一般会計歳出", 478, 490, "135918"],
    ["R6", "74838", 60, 63, "（７）令和６年度当初予算詳細（一般会計歳入）", "（７）令和６年度当初予算詳細（一般会計歳出）", 0, 0, "101701"],
    ["R5", "54157", 80, 83, "（７）令和５年度当初予算詳細（一般会計歳入）", "（７）令和５年度当初予算詳細（一般会計歳出）", 0, 0, "65412"],
    ["R4", "32767", 104, 107, "（８）令和４年度当初予算詳細（一般会計歳入）", "（８）令和４年度当初予算詳細（一般会計歳出）", 480, 500, "24750"],
    ["R3", "19300", 79, 81, "（６）令和３年度当初予算詳細（一般会計歳入）", "（６）令和３年度当初予算詳細（一般会計歳出）", 490, 485, "4754"],
    ["R2", "19142", 95, 97, "（９）令和２年度当初予算詳細（一般会計歳入", "目的別", 460, 445, "4734"],
  ] as const).map(([fy, att, rp, ep, rh, eh, rc, ec, landing]) => ({
    id: `koriyama-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 郡山市当初予算の概要（一般会計歳入・歳出（目的別））${fy === "R7" || fy === "R3" ? "（骨格予算）" : ""}`,
    publisher: "郡山市",
    url: `https://www.city.koriyama.lg.jp/uploaded/attachment/${att}.pdf`,
    landingPage: `https://www.city.koriyama.lg.jp/soshiki/25/${landing}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "郡山市（一般会計・団体コード072036）",
    // 「リンク・著作権・免責事項」（/site/userguide/25995.html・更新 2022-02-22・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠ 市のオープンデータ（74ファイル）は利用規約 PDF が冒頭で「オープンデータサイトに掲載しているデータの利用に
    //    関する事項」と自ら範囲を限り、**予算・決算・財政は0件**（実検索）。**BODIK に郡山市の組織は存在しない**
    //    （organization_list が空・organization_show が 404）＝ CC BY は及ばない（§9g）。
    // リンクは「トップページに限らず、サイト内のどのページに対しても、していただいて結構です」＋URL 変更の注意喚起
    //    ＝島根 §11l・高松 §13-5 と同型の第3〜4群 → `noDeepLink` は立てない。
    license:
      "郡山市ホームページ上に掲載されている文書や画像等のコンテンツの無断使用・転載・引用を禁じます。郡山市公式サイト上における文書・画像等コンテンツの著作権は、郡山市に帰属します。一部の画像等の著作権は、撮影者や画像提供者などの原著作者が所有します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: rh,
      expenditureHeading: eh,
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      revenueHeaderExtra: "[、。（]|^[^0-9]{20,}$",
      expenditureHeaderExtra: "[、。（]|^[^0-9]{20,}$",
      ...(rc ? { revenueCropX: { from: 0, to: rc } } : {}),
      ...(ec ? { expenditureCropX: { from: 0, to: ec } } : {}),
      ...(fy === "R2" ? { kanNoless: true } : {}),
      ...(fy === "R8"
        ? {
            prevBasis: "補正後" as const,
            prevNote:
              "前年度（令和7年度）欄は当初予算額に「6月送り分」（骨格予算の肉付けとして令和7年6月補正で計上した政策的経費 1,058,382千円）を含む額。令和7年度は市長選挙の年で当初予算が骨格予算であったため、原典が肉付け分を含めた額を比較対象にしている。",
          }
        : {}),
      ...(fy === "R4"
        ? {
            prevNote:
              "前年度（令和3年度）は令和3年4月の市長選挙により当初予算が骨格予算。本表の前年度列は骨格の当初額で、原典は別途「肉付け予算となる6月補正後の予算と比べて1.8％増」とも注記している。",
          }
        : {}),
    },
  })),

  // ---- 中核市など 第10弾（2026-08-23・loop.md の第11巡）------------------------------------------
  ...([
    // 四日市市（三重県・中核市・団体コード 242021。⚠ 収録済みの三重県 240001 とは別サイト・別条項）。
    // 財政課「当初予算概要」の「一般会計歳入歳出予算（歳入）」＝物理 p.4 /「（歳出）」＝物理 p.6
    //（R8〜R2 の7年度とも不動・印字＝物理でズレ0）。**H12〜R8 が1ページに並ぶ**（年度ページに分かれていない）。
    // ⚠⚠ **歳入の8款だけ款番号が丸数字**（① ⑭ ⑮ ⑱ ⑲ ⑳ ㉑ ㉒＝原典の凡例「○付数字は自主財源」）で、
    //    残りは全角 `２．` 形式 → **`kanNoCircled`（2026-08-23 に追加した opt-in）**。
    //    指定しないと**丸数字の8款が丸ごと落ちて Σ −89,358,383 で error**（大声で落ちる）。
    //    ⚠ `kanNoless` + `kanNamePrefixStrip` でも Σ は通せるが**その8款の `kanNo` が null になる**ので採らない。
    // ⚠⚠ **`revenueHeaderExtra: "^うち"` を外すと R2 が静かに壊れる** — 内数行
    //    `うち普通交付税 0 85,000 △85,000 皆減` が**廃止款として拾われ前年度Σ +85,000**（validate では
    //    warning 止まりで derive まで流れる）。R8/R7 は内数が 0 なので気づけない。**全年度に付ける**。
    // ⚠ 同じ PDF の p.8「歳出予算款別（財源内訳）」・p.10「歳出予算性質別」は**合計が歳出と同額**だが、
    //    見出し語が違うので当てると throw する（偵察が実測）。⚠ ただし**歳入合計＝歳出合計**なので
    //    Σ は歳入/歳出の取り違えを捕まえない → 款名の目視は必須。
    // ⚠ 歳出の款構成は年度で動く（R3・R2 は13款＝**災害復旧費**が入る。R3 は廃止款として 0/260,000）。
    // ⚠ **URL に規則が無い**（R8/R7＝`508`/`507`、R6〜R2＝西暦、R5 だけ `01`、R2 は `tousyosiryo1`）。外挿しない。
    // ⚠ **H31 は全面文字化けで収録不可**（`平成`→`ᖹᡂ`。既定の −0x1D 帯でも三重県 R8 の +0x3EAC 帯でもない
    //    サブセット順依存）＝`unrecordable.ts`。同年度の「概要」は健全だが款別が円グラフの画像だけ。
    // 前年度列は7年度とも**当初**（R8→R2 の隣接6ペアで全款一致・偵察が実測。列順の反転なし。
    //    合計行の構成比も小数なので豊橋 §13-8 の `totalAmountIntIndex` 型にはならない）。
    // ⚠ R7 以前は翌年度資料の前年度列と一致＝**議会修正なし**が裏取り済み。**R8 だけ後継年度が無く未確認**。
    ["R8", "508yosansiryou.pdf"],
    ["R7", "507yosansiryou.pdf"],
    ["R6", "2024siryou.pdf"],
    ["R5", "2023siryou01.pdf"],
    ["R4", "2022siryou1.pdf"],
    ["R3", "2021siryou1.pdf"],
    ["R2", "2020tousyosiryo1.pdf"],
  ] as const).map(([fy, file]) => ({
    id: `yokkaichi-yosan-siryou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 四日市市当初予算資料（一般会計歳入歳出予算 歳入・歳出）`,
    publisher: "四日市市",
    url: `https://www.city.yokkaichi.lg.jp/www/contents/1001000000530/simple/${file}`,
    landingPage: "https://www.city.yokkaichi.lg.jp/www/contents/1001000000530/index.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "四日市市（一般会計・団体コード242021）",
    // 「著作権（リンクや引用）について」（/www/contents/1001000000009/index.html・更新 2025-05-28・確認日 2026-08-23）。
    // ⚠ 市のオープンデータカタログ（BODIK・全116データセット）を CKAN API で全件走査したが財政系は決算統計の
    //    XLSX 2件だけで**本 PDF は非登載＝CC BY は及ばない**（§9g）。
    // リンクは「四日市市サイトにある各ページへのリンクは、GISを除き、特に制限はありません」＝§11h 第4群 →
    //    `noDeepLink` は立てない（GIS は本資料と無関係）。
    // ⚠ 原文に `無断`・`禁止`・`要許可`・`非営利` のいずれも無いので区分は **`unverified`**（山口県・埼玉と同型）。
    //    **意訳して「要許可」に寄せない**。
    license:
      "四日市市公式サイトのコンテンツや素材は、四日市市もしくは四日市市に使用を許可した権利者が著作権等の知的財産権を保有しています。二次利用に際しては、知的財産権の侵害をしないよう、ご注意下さい。四日市市公式サイトのコンテンツを引用する場合は、引用部分がはっきりわかるようにし、引用元を明記してください。引用部分の改変を行わないで下さい。画像、動画、音声及び添付ファイルなどの素材については、権利者から四日市市に限って利用が認められたものがあります。印刷物などの形で配布する場合などは、個別にご確認下さい。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 4,
      expenditurePage: 6,
      revenueHeading: "一般会計歳入歳出予算（歳入）",
      expenditureHeading: "一般会計歳入歳出予算（歳出）",
      revenueHeaderExtra: "^うち",
      kanNoCircled: true,
    },
  })),

  ...([
    // いわき市（福島県・中核市・団体コード 072044。⚠ 収録済みの福島県 070009・郡山市 072036 とは別サイト・別条項）。
    // 「当初予算資料集」等の「一般会計歳入予算額」/「一般会計歳出予算額（目的別）」。**R8〜H20 の19年度が現存**。
    // ⚠ 資料名が4系統に割れる（R8・R7＝資料集／R6〜R4＝概要／R3〜H29＝ポイント／H28〜H20＝概要）が
    //    **中身の表は19年度とも同型**（`Ⅲ`/`Ⅳ`/`Ⅷ` の通し番号だけが動くので見出しは通し番号を含めない）。
    // ⚠⚠ **`expenditureHeading` は `（目的別）` まで含める** — `一般会計歳出予算額` だけだと隣の性質別ページでも
    //    見出しチェックを通ってしまう（前橋 §13-10 型）。⚠ この市は縦書きラベルと小計行のおかげで Σ が壊れるので
    //    静かには通らないが、**網は見出しに置くのが正**。⚠ 歳入合計＝歳出合計なので Σ は側の取り違えを捕まえない。
    // ⚠ `kanNoless` が要る年度が2つある（**外すと静かに前年度Σだけズレる**）: R8 歳出の `諸支出金`（款番号が落ちて 0/10）・
    //    R2 歳入の `（自動車取得税交付金）`・H21 歳入の `（特別地方消費税交付金）`（括弧書きの廃止款）。
    //    他16年度でも付けたまま全件クリーン（偽陽性0）であることを偵察が実測。
    // ⚠⚠ **H21 は収録しない**（`unrecordable.ts`）— 原典の「歳入合計（前年度）」が誤植で、記載 115,691,713 に対し
    //    Σ款 = 115,691,813（+100）。H20 の当年度合計が 115,691,813 なので Σ 側が正だが、**derive の年度間
    //    クロスチェーンが H20 との間で止まる**ため落とした（宇都宮 R3・長崎 H28 と同じ扱い）。
    // ⚠ 歳出款13 は **`予備費`**（総務省の目的別標準に無い独自款・前橋/越谷 §13-10 と同型）。寄せない。
    // ⚠ **R8 の資料集 PDF には「いわき市」の字が1文字も無い**（他年度には有る）。同一性は取得元 URL と
    //    固有の特別会計名（磐崎/澤渡/田人/川前/常磐湯本/川部の各財産区・いわき平競輪）で確認した。
    // ⚠ **R5 だけ歳出（p.23）が歳入（p.25）より前**に来る。⚠ URL は `contents/<数字ID>/simple/<バラバラの名前>.pdf` で
    //    年度から外挿できない。
    // 前年度列は19年度とも**当初**（R8→H20 の18リンクすべて成立・偵察が実測）。骨格予算の年度は無い
    //    （市長選が9月なので4月当初は通常予算。19年度の全文に「骨格」「肉付け」0件）。議会修正なし（議決結果 PDF で確認）。
    // [年度, contentsID, ファイル名, 歳入ページ, 歳出ページ]
    ["R8", "1761108064077", "r8tousyoyosansiryousyuu", 18, 19],
    ["R7", "1729517378184", "R7tousyoyosannsiryousyuu", 18, 19],
    ["R6", "1698135404978", "reiwa6nenndoippannkaikeitousyoyosannnogaiyou", 24, 25],
    ["R5", "1675670185830", "R5nenndoippannkaikeitousyoyosannnogaiyou", 25, 23],
    ["R4", "1636440666502", "R4nenndoippannkaikeitousyoyosannnogaiyou", 23, 24],
    ["R3", "1604468120594", "R3nenndotouyoyosannnopoinnto", 25, 26],
    ["R2", "1581555289068", "R2tousyoyosannopoint", 31, 32],
    ["H31", "1540545559169", "H31tousyoyosanpoint", 31, 32],
    ["H30", "1509502188650", "H30tousyoyosannpointo", 26, 27],
    ["H29", "1479992214405", "H29tousyoyosannnopoinntogiketugo", 26, 27],
    ["H28", "1455763178320", "h28toushogaiyou", 5, 6],
    ["H27", "1001000003480", "H27touyoyosannannnogaiyou", 5, 6],
    ["H26", "1001000003479", "h26_tousyo_gaiyou", 5, 6],
    ["H25", "1001000003478", "H25GAIYOU2", 5, 6],
    ["H24", "1455496444656", "H24_tousyo.gaiyou2", 8, 9],
    ["H23", "1455498085783", "h23_tousho_gaiyou", 8, 9],
    ["H22", "1455500996723", "h22_toshogaiyou", 6, 7],
    ["H20", "1455504020116", "h20_toushogaiyou", 6, 7],
  ] as const).map(([fy, cid, file, rp, ep]) => ({
    id: `iwaki-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 いわき市当初予算資料（一般会計歳入予算額・歳出予算額（目的別））`,
    publisher: "いわき市",
    url: `https://www.city.iwaki.lg.jp/www/contents/${cid}/simple/${file}.pdf`,
    landingPage: `https://www.city.iwaki.lg.jp/www/contents/${cid}/index.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "いわき市（一般会計・団体コード072044）",
    // 「著作権・リンクについて」（/www/contents/1454211655964/index.html・登録 2020-06-24・確認日 2026-08-23）。
    // ⚠ 市のオープンデータライブラリー（約120データセット・CC BY 2.1 JP）は**予算・決算・財政が0件**（実検索）。
    //    **BODIK にいわき市の組織は存在しない**（organization_list が空）＝ CC BY は及ばない（§9g）。
    // リンクは「トップページに限らず、どのページに対しても貼っていただいてかまいません（いわき市に承認を求める
    //    必要はありません）」＝§11h 第4群 → `noDeepLink` は立てない。
    // ⚠ 実質は「出所明示すれば引用・転載複製可」という寛容な条項だが、`無断` の語で permission-required に落ちる。
    //    **意訳して open に寄せない**（判定は原文どおりが安全側）。
    license:
      "いわき市公式ホームページ（サーバ：www.city.iwaki.lg.jp ドメイン）から発信するコンテンツ（文章や画像で構成された閲覧可能な情報を言う。）の著作権は、いわき市に帰属します。いわき市公式ホームページの内容の全部又は一部については、私的使用又は引用等著作権法上認められた行為として、適宜の方法により出所を明示することにより、引用・転載複製を行なうことができます。ただし、「無断転載を禁じます」等の注記があるものについては、それに従うようお願いします。いわき市公式ホームページの内容の全部又は一部について、いわき市に無断で改変を行なうことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: "一般会計歳入予算額",
      expenditureHeading: "一般会計歳出予算額（目的別）",
      kanNoless: true,
    },
  })),
  ...([
    // 明石市（兵庫県・中核市・団体コード 282031。⚠ 兵庫県 280003 は当初予算が unrecordable だが市は別資料）。
    // 本命は**議案（予算書）本体**の「歳入歳出予算事項別明細書 １総括」＝**全年度 歳入 p.13 / 歳出 p.14 固定**。
    //    備考欄が無いので **CropX 不要**（議案説明資料ルートは備考欄があり CropX が年度ごとに要る）。
    // ⚠⚠ **R8 と R5 は議会修正がある**（R8 は 2026-03-25 の修正可決で 151,523,674 → **151,508,494**・歳出 土木費が
    //    11,004,737 → 10,989,557）。**予算書ルートは修正前の `r8ippan.pdf` が発行元で 404 になっており、
    //    `r8ippan_shusei1.pdf`【修正後】だけが残る**＝このルートは修正前を掴みようがない（R5 も同様）。
    //    ⚠ 一方**「議案説明資料」ルートは修正前 PDF がサイトに残っており、当てると Σ 4系統差0 で完走する**。
    //    ⚠ 【資料３】当初予算案概要は**修正後に差し替えられていない**（混ぜない）。
    // ⚠⚠ 議案説明資料ルートの罠（採らないが記録）— 同 PDF の p.7 は「歳出：性質別」で**列構成・合計・款数(12) が
    //    p.9 の款別と完全に同じ**で、当てると **throw せず Σ 差0 のまま款1 が `人件費`** になる（前橋 §13-10 型）。
    //    **予算書ルートには性質別表が1つも無い**（全文 grep で「性質別」「人件費」0件）ので、この罠に当たらない。
    // ⚠ 歳出は**12款**（労働費・災害復旧費が無く、**款12 に `予備費`** が立つ＝独自款。寄せない）。
    //    歳入は 19〜20款で、環境性能割交付金の新設(H31)・廃止(R8)、自動車取得税交付金の廃止(R2)、
    //    法人事業税交付金の新設(R2) で款番号が年度ごとにずれる。廃止款は原典が款番号欄に `△` を置くので既存分岐で拾える。
    // 前年度列は**当初**（R8→R2 の6リンクすべて一致・偵察が実測）。⚠ 市長選は 2023年4月（R5）で次は R9。
    // [年度, ファイル名]
    ["R8", "r8ippan_shusei1.pdf"],
    ["R7", "r7ippan.pdf"],
    ["R6", "r6ippan.pdf"],
    ["R5", "r5ippan.pdf"],
    ["R4", "r4ippantosho.pdf"],
    ["R3", "r03_01ippann.pdf"],
    ["R2", "r02_01ippann.pdf"],
  ] as const).map(([fy, file]) => ({
    id: `akashi-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 明石市一般会計予算（歳入歳出予算事項別明細書 総括）${fy === "R8" || fy === "R5" ? "（修正後）" : ""}`,
    publisher: "明石市",
    url: `https://www.city.akashi.lg.jp/documents/2584/${file}`,
    landingPage: "https://www.city.akashi.lg.jp/zaimu/zaisei_ka/shise/zaise/aramashi/yosannaiyo/index.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "明石市（一般会計・団体コード282031）",
    // 「このサイトについて」（/seisaku/kouhou_ka/shise/koho/homepage/chosakuken.html・確認日 2026-08-23）。
    // ⚠ 市のオープンデータ利用規約（CC BY 4.0 互換）は**適用範囲を自ら限る** — 「本規約は、明石市オープンデータ
    //    ページにおいてダウンロードできるオープンデータにおいて適用されます。また、本ページを除く明石市公式
    //    ホームページ上の情報については、著作権が原則として本市に帰属します」。オープンデータ一覧 CSV（**210件**）を
    //    実検索すると予算・決算で登載されているのは **CSV だけ**（当初予算 歳入歳出 R7〜R4／決算 R6〜R3・CC BY）で、
    //    **予算書 PDF は非登載＝ CC BY は及ばない**（§9g）。⚠ **その CSV を別ソースにするならライセンスは CC BY 側**。
    // リンクは「本ホームページへのリンクは、フリーです。」＝§11h 第4群 → `noDeepLink` は立てない。
    license:
      "明石市公式ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、明石市公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されていますので、無断で複製・転用することはできません。利用許諾については各ページに記載されている課・所属などへお問い合わせください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 13,
      expenditurePage: 14,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      revenueTotalLabel: "歳入合計",
      expenditureTotalLabel: "歳出合計",
    },
  })),

  ...([
    // 高知市（高知県・中核市・団体コード 392014。⚠ **高知県 390003 とは別サイト・別条項** — license も
    //    `noDeepLink` の判断も流用しない（§13-7 長崎の教訓））。
    // 「当初予算・3月議会提出議案の概要」の巻末［資料］⑷款別歳入（一般会計）/⑸款別歳出（一般会計）。
    // ⚠ **印字ノンブルは物理ページ −2**（全年度で一致）。registry は物理ページ。
    // ⚠⚠ 同じ PDF に「⑹ 性質別歳出（一般会計）」（R8 物理 p.66）があり**合計も 168,400,000 で同じ**。
    //    p.51 には前年度3月補正の「歳入款別／歳出款別」表もある。**網は見出し語の1枚だけ**（括弧は全角）。
    //    ⚠ 歳入合計＝歳出合計なので Σ は側の取り違えも捕まえない。
    // ⚠ 歳出款13 は **`予備費`**（総務省の目的別標準に無い独自款・前橋/越谷 §13-10 と同型）。寄せない。
    // ⚠ **列の様式が年度で2種類**: R8・R5 は [当初A, 構成比, 特定財源, 一般財源, 当初B, 構成比, 増減, 指数] の
    //    広い様式で空セルが `-`（R7 の市債は U+2010）→ `dashAsZero` + `amountIntIndex:0` + `prevIntIndex:3`。
    //    R4・R3・H30 は [当初A, 当初B, 増減, 指数] の狭い様式なので**何も要らない**。**年度を外挿しない**。
    // ⚠⚠ **H30 のページ表題は Kangxi 部首の `⼀般会計予算`（U+2F00）** — `一般会計予算` と書くと当たらない
    //    （headerRe は fixRadicals の前に当たる）。`般会計予算` で落とす。付けないと款1 が `一般会計予算市税` /
    //    `一般会計予算議会費` になる（**Σ は4系統とも差0 のまま**）。
    // ⚠ R3 の歳入款18 は原典が **`寄附金`**（R4 以降は `寄付金`）。原典どおりで寄せない。
    // ⚠⚠ **収録できない年度が4つある**（`unrecordable.ts`）— R7・R6 は「※上段（ ）書きは満期一括償還及び
    //    起債借換による影響額を除いた数値」の3行組で款の金額が2行に割れ**パーサが throw**（静かには壊れない）。
    //    R2 は議会修正＋テキスト層の全面ガーブル。**H31 は Σ 4系統差0 のまま款名が11件化ける**
    //    （`匏子割交付□`＝利子割交付金 等。⚠ `U+FFFD` は validate の KANNAME_JUNK_RE にも部首ゲートにも
    //    当たらないので**目視だけが網**）。⇒ **鎖は R5-R4-R3 の2リンクだけで R8 と H30 は孤立する**。
    //    偵察が手検算した鎖（R8前=R7当・R7前=R6当・R6前=R5当・H30前=H29当）を記録として残す。
    // 前年度列は全年度**当初**（⚠ R3 の前年度は「前年度当初（議会修正可決後）」＝値としては当初）。
    // [年度, PDF ファイル名, landing のファイル名, 歳入ページ, 歳出ページ, 様式]
    ["R8", "265460_1141150", "yosan08", 64, 65, "wide"],
    ["R5", "186341_703247", "yosan05", 50, 51, "wide"],
    ["R4", "177465_659000", "yosan04", 44, 45, "narrow"],
    ["R3", "166247_603071", "yosan03", 42, 43, "narrow"],
    ["H30", "100669_269405", "yosan30", 72, 73, "h30"],
  ] as const).map(([fy, file, page, rp, ep, form]) => ({
    id: `kochi-shi-yosan-gaiyou-${fy.toLowerCase()}`,
    title:
      fy === "H30"
        ? "平成30年度 高知市当初予算のポイント（一般会計 款別歳入・款別歳出）"
        : `${eraYear(fy)}年度 高知市当初予算・3月議会提出議案の概要（一般会計 款別歳入・款別歳出）`,
    publisher: "高知市",
    url: `https://www.city.kochi.kochi.jp/uploaded/life/${file}_misc.pdf`,
    landingPage: `https://www.city.kochi.kochi.jp/soshiki/3/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "高知市（一般会計・団体コード392014）",
    // 「高知市公式HPガイドライン」（/soshiki/80/guideline.html・更新 2019-11-26・確認日 2026-08-23）。
    // ⚠ 市のオープンデータポータルは「**本ページで公開されているデータは**」と範囲を自ら限り、掲載13件に
    //    予算・決算・財政は**0件**（実検索）。高知県のポータルにも市の予算資料は無い＝ CC BY は及ばない（§9g）。
    // リンクは「原則として自由ですが、トップページへの設定をお願いします」＋「トップページ以外に設定された場合は…
    //    リンク切れになる場合がありますのでご了承ください」＝鹿児島 §13・船橋・島根 §11l と同型の**注意喚起**
    //    → `noDeepLink` は立てない。⚠⚠ **高知「県」は §11l で第2群として立てた側だが、市の条項は別物**。
    license:
      "高知市公式ホームページに掲載されている個々の情報（文字、イラスト、写真等）に関する諸権利は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上で認められている行為を除き、無断で複製、転用等をすることは法律で禁止されています。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rp,
      expenditurePage: ep,
      revenueHeading: form === "h30" ? "款別歳入" : "款別歳入（一般会計）",
      expenditureHeading: form === "h30" ? "款別歳出" : "款別歳出（一般会計）",
      ...(form === "wide" ? { dashAsZero: true, amountIntIndex: 0, prevIntIndex: 3 } : {}),
      ...(form === "h30" ? { revenueHeaderExtra: "般会計予算", expenditureHeaderExtra: "般会計予算" } : {}),
    },
  })),
  ...([
    // 春日井市（愛知県・施行時特例市・団体コード 232068）。「当初予算の概要」の「２ 一般会計歳入歳出予算一覧表」
    //    （歳入23款・歳出12款）。⚠ **年度で資料の綴じ方が変わる**（版面は同一）— R8・R7 は概要1冊の p.2/p.4、
    //    R6〜R1 は歳入/歳出が**1ページ単体の分冊 PDF**。分冊が概要の抜き刷りであることは、R6/R5/R4 の歳出 PDF に
    //    **「Ⅴ 令和４年度各会計当初予算の概要」という使い回しの表題行が残っている**ことで裏が取れる（＝同一シリーズ
    //    なので id 接頭辞を揃えて年度間クロスチェーンを繋ぐ）。
    // ⚠⚠ **R6・R5・R4 の歳出 PDF は `歳` と `出` が別行**（間に `Ⅴ` が挟まる）ので `expenditureHeading: "歳出"`
    //    だと**見出しが無いと判定されて throw する**。`"歳"` なら R6〜R1 の6年度すべてに当たる。
    // ⚠ 歳出は**12款で災害復旧費が無い**（当初計上が無いだけ・決算には立つ）。**款12 は `予備費`**（独自款）。寄せない。
    // ⚠ R2 の歳入には廃止款「自動車取得税交付金」（款番号なし・0/200,000）があり既存分岐が拾う。
    //    **`dashAsZero` は付けてはいけない**（越谷 R2 §13-10 と同じ壊れ方をしうる）。
    // ⚠ **R6〜R1 の分冊 PDF には「春日井市」の字が1字も無い**。同一性は取得元 URL と年度間クロスチェックで確認した。
    // ⚠⚠ **R2・R1 は今回収録していない**（配列は R8〜R3 の6件だけ）— 年度ページ・PDF とも発行元から 404 で、
    //    **Wayback の写しが唯一の経路**になるため。偵察は R2・R1 とも try-parse で Σ 差0 を実測しているので
    //    足すこと自体はできる（実 URL は docs §13-11 に残した）。§13-9 の高槻・大津と同じく
    //    `pipeline:archive` の対象外になるのは正常。⚠ 歳出のファイル名が R2=`saisyutu` / R1=`saisyutsu` で違う。
    // ⚠⚠ **ライセンスの区分が `unverified` に落ちる**（判定器の穴）— 発行元は「著作権者の許可なく…**利用**することは
    //    禁止します」と明確に要許可を書いているのに、`licenseClassOf` の語彙（`無断` / `転載・複製・二次利用・引用`＋
    //    `禁じ|禁止`）に1つも当たらない。⚠ 越谷 §13-10 は併記できる別条項があったが**春日井には無い**
    //    （オープンデータ側は CC BY を宣言していて逆方向）。**意訳して要許可に書き換えない**（§9g の逆方向）。
    // 前年度列は**当初**（原典の列見出しが両年度とも「当初予算額」＋R8→R1 の7ペアで全款一致）。
    //    R8 の総額 127,020,000 は議案第9号・**告示第26号（議決後）**とも一致＝議会修正なし。
    // [年度, 年度ページ ID, 歳入 URL, 歳出 URL, 歳入ページ, 歳出ページ, landing URL]
    ["R8", "001/038/130/R8gaiyou.pdf", "001/038/130/R8gaiyou.pdf", 2, 4, "https://www.city.kasugai.lg.jp/shisei/zaisei/yosan/1038130.html"],
    ["R7", "001/035/591/R7fuzokugaiyou.pdf", "001/035/591/R7fuzokugaiyou.pdf", 2, 4, "https://www.city.kasugai.lg.jp/shisei/zaisei/yosan/1035591.html"],
    ["R6", "001/032/661/sainyuu.pdf", "001/032/661/saisyutu.pdf", 1, 1, "https://www.city.kasugai.lg.jp/shisei/zaisei/yosan/1032661.html"],
    ["R5", "001/030/010/sainyuu.pdf", "001/030/010/saisyutu.pdf", 1, 1, "https://www.city.kasugai.lg.jp/shisei/zaisei/yosan/1030010.html"],
    ["R4", "001/026/515/R4sainyuu.pdf", "001/026/515/R4saisyutu.pdf", 1, 1, "https://www.city.kasugai.lg.jp/shisei/zaisei/yosan/1026515.html"],
    ["R3", "001/022/806/R3sainyuu.pdf", "001/022/806/R3saisyutu.pdf", 1, 1, "https://www.city.kasugai.lg.jp/shisei/zaisei/yosan/1022806.html"],
  ] as const).map(([fy, revPath, expPath, revPage, expPage, landing]) => {
    const base = "https://www.city.kasugai.lg.jp/_res/projects/default_project/_page_/";
    const single = revPath === expPath;
    return {
      id: `kasugai-yosan-gaiyou-${fy.toLowerCase()}`,
      title: `${eraYear(fy)}年度 春日井市当初予算の概要（一般会計歳入歳出予算一覧表）`,
      publisher: "春日井市",
      url: single ? `${base}${revPath}` : null,
      ...(single ? {} : { urls: [`${base}${revPath}`, `${base}${expPath}`] }),
      landingPage: landing,
      kind: "pdf" as const,
      fiscalYear: fy,
      scope: "春日井市（一般会計・団体コード232068）",
      // 「サイトポリシー」9 著作権（/site/sitepolicy/index.html・更新 令和6年3月15日・確認日 2026-08-23）。
      // ⚠ 市のオープンデータ一覧は「このページに掲載しているデータは…CC BY」と自ら範囲を限り、掲載12件に
      //    予算・決算・歳入・歳出は**0件**（eあいちカタログの春日井市12件も同じ・BODIK に春日井市の組織は無い）。
      // ⚠⚠ **`noDeepLink` を立てた**（§11h 第2群）: 「**リンク先は原則として https://www.city.kasugai.lg.jp/ と
      //    してください。**」＝越谷・長崎県と同じ構文。⚠ 区分が `unverified` のままだと derive の振替は発火しないが
      //    （豊橋 §13-8 と同じ構図）、**発行元の意思の記録として立てる**。
      noDeepLink: true,
      license:
        "「春日井市ホームページ」の著作権は、春日井市(写真や文章などの一部はその著作権者)に帰属します。 著作権法で認められている場合を除き、著作権者の許可なく文章や画像、データなどの一部または全部を利用することは禁止します。(注)なお、各ページに利用規約等の特段の定めがある場合は、この取扱いに優先するものとします。",
      parser: "kofu-yosansho" as const,
      parserOptions: {
        ...(single ? {} : { revenueFile: revPath.split("/").pop()!, expenditureFile: expPath.split("/").pop()! }),
        revenuePage: revPage,
        expenditurePage: expPage,
        revenueHeading: "歳入",
        expenditureHeading: single ? "歳出" : "歳",
        revenueTotalLabel: "合計",
        expenditureTotalLabel: "合計",
      },
    };
  }),

  // ---- 中核市など 第11弾（2026-08-23・loop.md の第12巡）------------------------------------------
  ...([
    // 久留米市（福岡県・中核市・団体コード 402036。⚠ 福岡県 400009・福岡市 401307・北九州市 401005 とは別団体）。
    // 財政課「予算の概要」（毎年度1本の PDF）の「一般会計（当初）予算（目的別）」歳入23款 / 歳出14款。
    // ⚠ **R5〜R8 は物理 p.10/p.11（印字 +4）、H30〜R4 は物理 p.8/p.9（印字 +3）** — R4→R5 で2ページずれる（外挿しない）。
    // ⚠ 見出しは年度で「一般会計当初予算( 目的別）」「（目的別）」「一般会計予算（目的別）」と揺れる（半角/全角括弧・
    //    「当初」の有無）ので**共通部分 `目的別` を使う**。歳出ページには表題が無く `（歳 出）` だけ。
    // ⚠⚠ **「予算のポイント」分冊（`R8ippankaikeiyosan.pdf`・3p）は使ってはいけない** — 同じ款別表だが
    //    **右側の円グラフのラベルと金額が同じ行に流れ込み**（郡山 §13-10 型）`10 国有提供施設等所在諸収入市町村助成交付金
    //    地方交付税` などに壊れて Σ が −8,000 ずれる。さらに**その p.3 は性質別で款番号 1〜13 を持ち合計も同額なので、
    //    当てると throw せず款1 が `人件費` になる**（前橋 §13-10 型を偵察が実際に再現）。**概要ルートが本命**。
    // ⚠ 概要ルートの性質別ページ（R8 p.12/p.13）は**款番号を持たない**ので当てると
    //    「款行が1件も抽出できませんでした」で **throw する**（静かには壊れない）。それでも物理ページは年度ごとに固定する。
    // ⚠ 合計ラベルは歳入歳出とも `合 計`（既定の「歳入合計/歳出合計」ではない）。単位は表の右上に `(単位:千円,％)`。
    // ⚠ 歳出款14 は **`予備費`**（総務省の目的別標準に無い独自款・いわき/高知/春日井 §13-11 と同型）。寄せない。
    // ⚠⚠ **市長選（1月・4年周期）の年は暫定予算が別にある** — H30・R4・R8 は4〜6月分の暫定（R8 は 70,670,000千円）と、
    //    6月に出る通年の「一般会計予算の概要」（R8 は 167,760,000千円）が別物。**通年版を採る**
    //    （翌年度資料の前年度列と一致するのは通年版・発行元自身も予算規模表で「当初予算額(A)」と表記）。
    //    暫定予算の PDF（`R8zanteiyosangaiyou.pdf`）と混ぜない。
    // ⚠ **H29 は収録不可**（`unrecordable.ts` に記録）— テキスト層が金額のカンマ・小数点の直後に空白を入れる
    //    （`39, 758, 003`・`51, 000`）ため桁ごとに割れて Σ が桁違いにずれる（**大声で落ちる型**）。
    //    ⚠ **`-raw` でも同じ空白が残る**（グリフ単位の字送りなので抽出方式では回避できない）。収録時に H29 概要の
    //    物理 p.8/p.9 で実測した。⚠ **H28 以前（発行元は H16 まで置いている）は年度ごとに確かめていない**ので
    //    台帳には載せていない。数字の間の `, ` を畳むパーサ改修を足せば開くが、既存全ソースへの影響検査が要る。
    // 前年度列は**当初**（H30→R8 の9鎖すべてで当年度資料の前年度列＝前年度資料の当年度列が全款一致・偵察が実測。
    //    差異は皆増/皆減款だけ）。議会修正なし（予算書「総括」と概要が完全一致）。
    // [年度, PDF の相対パス, landing の相対パス, 歳入ページ, 歳出ページ]
    ["R8", "4230yosanr08/files/R8ippankaikeiyosannogaiyou.pdf", "4230yosanr08/2026-0212-1142-6.html", 10, 11],
    ["R7", "4220yosanr07/files/R7yosannogaiyou.pdf", "4220yosanr07/2025-0207-1600-6.html", 10, 11],
    ["R6", "4210yosanr06/files/R6yosannogaiyou.pdf", "4210yosanr06/2024-0130-1545-6.html", 10, 11],
    ["R5", "4200yosanr05/files/R5_yosannnogaiyou.pdf", "4200yosanr05/2023-0210-1352-6.html", 10, 11],
    ["R4", "4190yosanr04/files/ippannkaikeiyosannnogaiyou.pdf", "4190yosanr04/2022-0530-2135-6.html", 8, 9],
    ["R3", "4180yosanr03/files/r3_yosangaiyou.pdf", "4180yosanr03/2021-0215-1507-6.html", 8, 9],
    ["R2", "4170yosanr02/files/yosannnogaiyou.pdf", "4170yosanr02/2020-0209-1536-7.html", 8, 9],
    ["H31", "4160yosan31/files/31gaiyou.pdf", "4160yosan31/2019-0215-1328-6.html", 8, 9],
    ["H30", "4150yosan30/files/h30-01yosannogaiyou.pdf", "4150yosan30/2018-0531-1713-6.html", 8, 9],
  ] as const).map(([fy, pdf, landing, rev, exp]) => ({
    id: `kurume-yosangaiyo-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 久留米市予算の概要（一般会計予算（目的別）歳入・歳出）`,
    publisher: "久留米市",
    url: `https://www.city.kurume.fukuoka.jp/1100keikaku/2070zaisei/3010yosan/${pdf}`,
    landingPage: `https://www.city.kurume.fukuoka.jp/1100keikaku/2070zaisei/3010yosan/${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "久留米市（一般会計・団体コード402036）",
    // サイトポリシー「リンク・著作権等について」（/1030website/2020sitepolicy/・更新 2024-05-23・確認日 2026-08-23）。
    //    条項が「文書や画像などの**ファイル**」とファイルを名指ししているので本 PDF に及ぶ。
    // ⚠ 市のオープンデータカタログ（BODIK・**全212件**）を CKAN API で実検索したが予算・決算の資料は0件
    //    （「行財政」11件も市税徴収状況・職員数等）＝ CC BY は及ばない（§9g）。
    // リンクは「原則として自由にリンクしていただけます」＋「**できるだけ**トップページに**お願いいたします**」
    //    （URL 変更を理由とするお願い）＝鹿児島・川口 §13 と同一構文の第3群寄り → `noDeepLink` は立てない。
    license:
      "久留米市ホームページに掲載している文書や画像などのファイル、デザイン、及びその内容に関する諸権利は、原則として久留米市に帰属します。（一部の画像の著作権は、原著作者が所有している場合があります。）久留米市ホームページの文書や画像などのファイル、デザイン、及びその内容の無断転用、転載は原則として禁止します。ただし、久留米市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "目的別",
      expenditureHeading: "（歳出）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
    },
  })),

  ...([
    // 盛岡市（岩手県・中核市・団体コード 032018。⚠ 収録済みの岩手県 030007 とは別団体）。
    // 年度ページの「一般会計予算総括表」の (１) 歳入 / (２) 歳出（目的別）。
    // ⚠ **資料の作りが R6 で変わる** — R8・R7・R6 は「各会計予算、財政指標」1冊（6p）に同梱で物理 p.2/p.3、
    //    R5〜H28 は総括表だけの単体 PDF（3p）で p.1/p.2、H26・H25 は「当初予算の概要」1冊で p.2/p.3。
    //    印字ノンブルは R8〜R6 のみ（ズレ0）で R5 以前は無い。**年度から外挿しない**。
    // ⚠⚠ **同じ PDF の次ページが「(３) 歳出（性質別）」で列構成・合計とも本表と同一**（前橋 §13-10・明石 §13-11 型）。
    //    ⚠ ただし**性質別の行には款番号が無い**ので、見出しを外して当てても「款行が1件も抽出できません」で
    //    **throw する**（偵察が R8・R5 の両方で実測）＝静かには壊れない。網は見出し語とページの固定の2枚。
    // ⚠⚠ **列見出し `科 目` が単独行で `KAN_HEADER_RE` に当たらず、款1 が `科目市税`・`科目議会費` になる**
    //    （姫路 §13 と同型・**Σ は4系統とも差0 のまま素通り**＝款名の全件目視だけが網）→ 両側に `^科目$`。
    //    収録時に款1 が `市税`・`議会費` であることを確認した。
    // ⚠ 歳出款13 は **`予備費`**（独自款）、款6 は原典が **`農林費`**（`農林水産業費` に寄せない）。
    //    款11 災害復旧費は R3〜H25 で **1千円の名目計上**（豊田 §13-6 型）なので `dashAsZero` は不要。
    // ⚠ 歳入は H31 以前が22款（款9 `自動車取得税交付金`）、R2 以降が23款（款6 `法人事業税交付金` 新設・
    //    款10 が `環境性能割交付金`）。R2 の法人事業税交付金は皆増で既存処理が正しく読む。
    // ⚠ **R5〜H27 の総括表 PDF には「盛岡市」の字が1つも無い**（川越・高槻 §13-9 型）。同一性は取得元 URL と
    //    同じ年度ページの「各会計予算」PDF・年度間クロスチェーンで確かめた。
    //    ⚠ **H26・H25 は「当初予算の概要」1冊型**で表紙に `平成25年度盛岡市予算の概要について` 等の市名が入る。
    // ⚠ `expenditureHeading` の括弧は**全角**（半角では当たらない）。
    // 前年度列は**当初**（列見出しが両年度とも「当初予算額（Ａ）／（Ｂ）」＋R8→H25 の13ペアで総額・款とも一致）。
    //    議会修正なし・骨格予算の年度なし。
    // ⚠ H24 以前は**款別が無い**（HTML 本文の9区分集約＋「億万円」表記）と偵察が報告しているが、
    //    **収録側で年度ごとに確かめていない**ので `unrecordable.ts` には載せていない（未検証を台帳に書かない）。
    // [年度, landing の記事パス, ファイルパス, 歳入ページ, 歳出ページ]
    ["R8", "1054620/1056173", "001/056/173/R8gaiyou2.pdf", 2, 3],
    ["R7", "1049725/1051327", "001/051/327/R7gaiyou02.pdf", 2, 3],
    ["R6", "1045078/1047482", "001/047/482/R6gaiyou02.pdf", 2, 3],
    ["R5", "1042424/1042427", "001/042/427/R5sankou02.pdf", 1, 2],
    ["R4", "1039414/1039417", "001/039/417/R4sankou02.pdf", 1, 2],
    ["R3", "1034441/1034444", "001/034/444/R3soukatu2.pdf", 1, 2],
    ["R2", "1030454/1030457", "001/030/457/R2soukatsu.pdf", 1, 2],
    ["H31", "1026289/1026292", "001/026/292/h31soukatu.pdf", 1, 2],
    ["H30", "1022592/1022595", "001/022/595/h30_sainyusaisyutu.pdf", 1, 2],
    ["H29", "1019127/1019130", "001/019/130/h29_sainyusaisyutu.pdf", 1, 2],
    ["H28", "1010596/1010599", "001/010/599/03_soukatuhyou_saisyutu_sainyuu.pdf", 1, 2],
    ["H27", "1010603/1010606", "001/010/606/h27soukatsu.pdf", 1, 2],
    ["H26", "1010630/1010636", "001/010/636/h26toushoyosangaiyou.pdf", 2, 3],
    ["H25", "1010655/1010661", "001/010/661/h25-toushoyosangaiyou.pdf", 2, 3],
  ] as const).map(([fy, page, file, revPage, expPage]) => ({
    id: `morioka-yosan-soukatsu-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 盛岡市一般会計予算総括表（歳入・歳出（目的別））`,
    publisher: "盛岡市",
    url: `https://www.city.morioka.iwate.jp/_res/projects/default_project/_page_/${file}`,
    landingPage: `https://www.city.morioka.iwate.jp/shisei/zaisei/suii/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "盛岡市（一般会計・団体コード032018）",
    // 「著作権について」（/site/policy.html・更新日 令和4年7月14日・確認日 2026-08-23）＝サイト全体の条項。
    // ⚠⚠ **`licenseClassOf` の語彙に1つも当たらず `unverified` に落ちる**（春日井・四日市 §13-11 と同型の3例目）。
    //    実質は「所管課へ問い合わせ」＝要許可に近いが、**意訳して書き換えない**（§9g の逆方向）。
    //    ⚠ 越谷 §13-10 と違い**併記できる別条項が無い**（オープンデータ側は逆に CC BY を宣言している）。
    // ⚠ 市のオープンデータサイト（CC BY 4.0）の**52データセットに予算・決算・財政は0件**（一覧 CSV を実取得して確認）。
    //    岩手県共同ポータルも同じ一覧を再掲しているだけ＝ CC BY は本 PDF に及ばない（§9g）。
    // リンクは「盛岡市のホームページへのリンクはフリーです」＋「**できるだけ**トップページとするようにお願いします」
    //    ＝鹿児島・川口・福山と同じ第2群との境界型 → `noDeepLink` は立てない。
    license:
      "盛岡市WWWサーバで提供する内容の著作権は、盛岡市が所有しています。盛岡市WWWサーバの内容を転載・掲載する場合は、各内容を所管する課等宛てにお問い合わせをお願いします。各ページ下部に記載されている問い合わせ先が担当課等です。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "一般会計予算総括表",
      expenditureHeading: "歳出（目的別）",
      revenueHeaderExtra: "^科目$",
      expenditureHeaderExtra: "^科目$",
    },
  })),

  ...([
    // 秋田市（秋田県・中核市・団体コード 052019。⚠ 秋田県 050008 とは別サイト・別条項・別ライセンス）。
    // 本命は**「予算書・事項別明細書」の巻頭「1 総括」**（歳入23款・歳出14款・単位は表頭に「千円」）。
    // ⚠⚠ **「当初予算案の概要」ルートは採らない** — (a) 3行折返し款の当年度額が `1` 千円のとき
    //    **`1` が款番号として食われ Σ +77,258 で落ちる**（しかも原典が `皆減` でなく **`殆減`** と印字するので
    //    既存の皆増/皆減処理にも乗らない）、(b) **概要ページにはオープンデータのブロックが無く CC BY が及ばない**。
    // ⚠⚠ **同じ PDF に特別会計12会計分の「1 総括」が並ぶ**（R8 は p.372・390・410 …）。**見出し語も合計ラベルも
    //    一般会計と完全に同一**なので見出しゲートは取り違えを捕まえない。⚠ 歳入合計＝歳出合計でもある。
    //    **物理ページの固定と款名の目視だけが網**（R8 の特会総括は金額が抽出できず throw したが、他年度で
    //    同じとは限らない）。⚠ 物理ページは年度で動く（R7=98/100・R6=96/98・他=100/102）。外挿しない。
    // ⚠ 歳出款14 は **`予備費`**（独自款）。款13 `諸支出金` は当年度・前年度とも **1千円の象徴計上**（原典どおり）。
    // ⚠ 歳入ページ先頭の `１ 総 括` は款番号 1 として一度拾われるが直後の空行で破棄され、8年度とも款1 が
    //    `市税` になる（見出しを変える必要は無い）。
    // ⚠⚠ **骨格予算が2年度ある**（秋田市長選は4年周期・H29 / R3 / R7 → 次は R11）。R7・R3 は**当年度が骨格**
    //    （§11k の規約どおり当年度側は `prevNote` に書かない）。**R8・R4 は前年度側が骨格**なので `prevNote` を書く。
    //    ⚠ 予算書の前年度列は骨格の当初額そのもので、年度間クロスチェーンは成立する（列は正しい）。
    // ⚠ **R2 の廃止款 `○ 自動車取得税交付金`** — マーカーが `○`（U+25CB）で `皆減` の語も無く、
    //    **パーサの検出側に `○` が無かったため行ごと落ちて前年度Σ −90,372**（warning 止まり）だった。
    //    2026-08-23 に**検出側へ `○` を足して塞いだ**（掃除側には最初から入っていた）。
    // ⚠ **R2・H31 は発行元が 404 で Wayback の写しが唯一**。⚠ **CDX に打ち切られた捕捉が混ざる**ので
    //    2022-07-06 の版を採る（R2 9,150,917 B・H31 4,587,207 B。偵察が実体を落として確認）。
    //    ⚠ Wayback を url に置くと `pipeline:archive` の対象外になるのは正常（§13-9 の高槻・大津と同じ）。
    // 前年度列は**当初**（R8→H31 の7連鎖すべてで総額・款とも一致・偵察が実測）。
    // [年度, url, 歳入ページ, 歳出ページ, prevNote を書くか]
    ["R8", "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/8tousyoyosansyo.pdf", 100, 102, "R7"],
    ["R7", "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/7tousyoyosansyo.pdf", 98, 100, ""],
    ["R6", "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/6tousyoyosansyo.pdf", 96, 98, ""],
    ["R5", "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/5tousyoyosansyo.pdf", 100, 102, ""],
    ["R4", "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/4tousyoyosansyo.pdf", 100, 102, "R3"],
    ["R3", "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/3tousyoyosansyo.pdf", 100, 102, ""],
    ["R2", "https://web.archive.org/web/20220706082631id_/https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/2tousyoyosansyo.pdf", 100, 102, ""],
    ["H31", "https://web.archive.org/web/20220706192612id_/https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/019/558/31tousyoyosansyo.pdf", 100, 102, ""],
  ] as const).map(([fy, url, revPage, expPage, kokkaku]) => ({
    id: `akita-shi-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 秋田市予算書（一般会計 歳入歳出予算事項別明細書 総括）`,
    publisher: "秋田市",
    url,
    landingPage: "https://www.city.akita.lg.jp/shisei/yosan-zaisei/1009189/1019558.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "秋田市（一般会計・団体コード052019）",
    // ⚠⚠ **この CC BY は本資料そのものに付いている**（八王子 §13・一宮 §13-8 型）— landing の「オープンデータ」
    //    ブロックの見出しが `予算書・事項別明細書` で、その中に R8〜R3 の6 PDF が並ぶ。市のカタログ（全758件）でも
    //    同名データセット（license `op_cc_1` = CC BY（表示））の files が**この6 PDF そのもの**（偵察が実検索）。
    // ⚠ **「当初予算案の概要」ページにはこのブロックが無い**＝概要には及ばない（§9g）。
    // ⚠ オープンデータ「利用にあたって」ページの文言は「**本ページに掲載しているデータは**」と自ら範囲を限るので
    //    license 欄には書かない（適用範囲が違う）。
    // リンクは「秋田市のホームページへのリンクはフリーです」の1文だけで禁止・要相談・フレーム禁止が**1つも無い**
    //    ＝§11h 第4群 → `noDeepLink` は立てない。⚠⚠ **秋田「県」は §11k で第2群として立てた側だが市は別条項**
    //    （長崎の教訓の3例目）。なお `open` なので振替分岐にはそもそも入らない。
    license:
      "この 作品 は クリエイティブ・コモンズ 表示 4.0 国際 ライセンスの下に提供されています。本セクションで公開しているデータは、クリエイティブ・コモンズ・ライセンスのもとで提供しております。対象データのご利用に際しては、表示されている各ライセンスの利用許諾条項に則ってご利用ください。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: revPage,
      expenditurePage: expPage,
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
      ...(kokkaku
        ? {
            prevNote:
              kokkaku === "R7"
                ? "前年度（令和7年度）の当初予算は、市長選挙のため骨格予算として編成されている（原典「令和7年度当初予算案の概要」に明記）。6月定例会の肉付け補正後は 148,791,984千円で、ここでの前年度額は骨格予算の当初額（148,390,000千円）。"
                : "前年度（令和3年度）の当初予算は、市長選挙のため骨格予算として編成されている（原典「令和3年度当初予算案の概要」に明記）。6月定例会時点の補正後は 143,091,219千円で、ここでの前年度額は骨格予算の当初額。",
          }
        : {}),
    },
  })),

  ...([
    // 津市（三重県・施行時特例市・県庁所在地・団体コード 242012。⚠ 収録済みの三重県 240001・四日市市 242021 とは
    //    別サイト・別条項。⚠ id は既存の `tsuru-`（都留市）と目視で取り違えないこと）。
    // 「当初予算書（附 予算に関する説明書）」の**「歳入歳出予算事項別明細書 １ 総括」**（歳入24款・歳出13款）。
    // ⚠⚠ **`textSource: "raw"` が必須** — `-layout` では表の行間に空行が入り、パーサが空行で折返しバッファを
    //    reset するため **`kanNameContinues` が効かず**、歳入の款5・8・11・14 の款名が `株式等譲渡所得割交`
    //    `ゴルフ場利用税交付` のように途中で切れる。**Σ は4系統とも差0 のまま**なので**款名の目視だけが網**
    //    （収録時に款5 が `株式等譲渡所得割交付金` であることを確認した）。
    // ⚠⚠ **`revenueHeaderExtra: "^1総括$"` が無いと款1 が `総括市税` になる**（-raw ではページ冒頭の `１ 総括` が
    //    空行で切れず款名の頭に付く）。これも **Σ 差0 のまま**。
    // ⚠ 同じ PDF に**特別会計の「１ 総括（歳入）/（歳出）」が7組ある**（R8 は物理 315/316・353/354 …）。
    //    見出し語・合計ラベルは一般会計と同一なので、**ページがずれると別会計を Σ 差0 のまま静かに拾う**。
    //    ⚠ 歳入合計＝歳出合計でもある。**物理ページの固定と款名の目視が唯一の網**。
    // ⚠⚠ **「当初予算の概要」の款別予算額調書は使ってはいけない**（偵察が両方の壊れ方を実測）—
    //    (a) 歳入は**印字ノンブル `- 40 -` が款11 の金額行の行頭に食い込み**款が行ごと落ちる（Σ −43,000 で error）、
    //    (b) 歳出は列が `[当年度, うち一般財源, 前年度, …]` の6個で、既定の ints[1] が「当年度のうち一般財源」を
    //    前年度として読む → **当年度Σ だけ差0 で通り、前年度Σ の +22,100 は warning 止まり**。
    //    ⚠ `amountIntIndex` は側で分けられず、`CropX` も**このページは rot 270 のランドスケープ**で列方向を切れない。
    // ⚠ 歳出は**款11 災害復旧費が当初計上なし**（10→12 に飛ぶ。決算には立つ）。**`諸支出金`・`予備費` は独自款**。
    // ⚠ 歳入款9 自動車取得税交付金は3年度とも**象徴計上の1千円**。
    // ⚠⚠ **R5 以前は収録不可**（`unrecordable.ts`）— 予算書が H23〜R5 の13年度とも**全ページ スキャン画像**で
    //    抽出文字数が全文 300〜1,700字（ノンブルのみ）。概要も款別調書のページは画像。
    // 前年度列は**当初**（R8→R7・R7→R6 の2ペアで**全37款が完全一致**・偵察が実測。列順の反転なし。
    //    R7・R6 が翌年度資料と一致する＝議会修正なしの裏取り。⚠ R8 だけ後継年度が無く未確認）。
    // ⚠ 市長選は R7（2025年4月）だが**津市 R7 は骨格予算ではない**（歳出が前年比 +11.5%・原典に骨格の記載なし）。
    // [年度, 歳入ページ, 歳出ページ, ファイル名]
    ["R8", 19, 20, "r8_toushoyosansho.pdf"],
    ["R7", 17, 18, "r7toushoyosansho.pdf"],
    ["R6", 19, 20, "r6tousyoyosannsyo.pdf"],
  ] as const).map(([fy, rev, exp, file]) => ({
    id: `tsu-shi-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 津市当初予算書（歳入歳出予算事項別明細書 総括）`,
    publisher: "津市",
    url: `https://www.info.city.tsu.mie.jp/_res/projects/default_project/_page_/001/005/575/${file}`,
    landingPage: "https://www.info.city.tsu.mie.jp/shisei/zaisei/1005573/1005575.html",
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "津市（一般会計・団体コード242012）",
    // 「著作権・免責事項」（/about/1008346.html・更新 2025-11-28・確認日 2026-08-23）。
    //    ⚠ 旧 CMS パス `/www/contents/1001000006919/` は **301** で現行の landingPage へ飛ぶ（301 先を登録した）。
    // ⚠ 津市オープンデータ「みんなのデータ」は CC BY を宣言するが登載は人口・文化財・AED・バス GTFS など9系統だけで
    //    **予算・決算・財政は0件**（BODIK の CKAN API で `242012` を全件検索＝3データセットのみ）＝及ばない（§9g）。
    //    ⚠ 検索で出る `242021_00031 決算` は**四日市市**なので取り違えない。
    // ⚠ 津市サイトには**リンクに関する条項が1つも無い**（「このサイトについて」配下を全ページ確認）ので
    //    `noDeepLink` は立てない（§11h の5群のどれにも当たらない）。
    license:
      "本サイト上の文書や画像等の各ファイルおよびその内容に関する諸権利は、原則として津市に帰属します。また、他の個人または団体が著作権を有する文書・画像等を引用している場合は、原則としてその出典を明示しています。これらの著作権はそれぞれの個人または団体に帰属します。本サイト上の文書・画像等の無断使用・転載を禁止します。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      textSource: "raw" as const,
      kanNameContinues: { revenue: [5, 8, 11, 14] },
      revenueHeaderExtra: "^1総括$",
    },
  })),

  ...([
    // 水戸市（茨城県・中核市・県庁所在地・団体コード 082015）。
    // 「当初予算の概要」の**（2）一般会計歳入内訳 /（3）一般会計歳出内訳**（歳入23款・歳出13款）。
    // ⚠⚠ **年度で列様式が2系統に割れる**（どちらも実測）:
    //   - R8/R7/R6 … 列は `[当年度, 前年度, 増減]` の素直な並び。列指定は不要。
    //   - R5/R4/H30 … **1年度あたり3列**（`[歳入, 特定財源, 一般財源]`）で、既定の ints[1] が
    //     **「当年度の特定財源」を前年度として読む**。⚠ **当年度Σ だけ差0 で通り、前年度側は
    //     記載合計まで「特定財源合計」を拾う**ので原典と突き合わせないと気づけない。
    //     ⚠ `-` が行ごとに現れて整数トークンの位置がずれるため、**`dashAsZero` で 0 に固定してから**
    //     `amountIntIndex`/`prevIntIndex` を指定する（この順序でないと index が当たらない）。
    // ⚠ 歳出の見出しは年度で3通り（`一般会計歳出内訳` / `歳出目的別内訳` / `予算総括（歳出内訳）`）。
    // ⚠ 合計ラベルは歳入 `合　計`・歳出 `一 般 会 計`（R5 以前は `一般会計 (A)`）。既定ラベルでは当たらない。
    // ⚠ 性質別の表（R8 は物理 p.7）は**款番号を持たない**ので誤指定すると「款行が1件も抽出できませんでした」で
    //    **throw する**（前橋 §13-10 型の「静かに人件費になる」には当たらない）。
    // ⚠⚠ **「予算に関する説明書」を使ってはいけない** — R8 の説明書には**まったく同じ見出しの「１ 総括」が9組**
    //    ある（一般会計＋特別会計8）。見出し語も合計ラベルも同一なので**ページを取り違えると静かに特別会計を読む**
    //    （津 §13-12 と同型）。概要を使えばこの罠に入らない。
    // ⚠ R5/R4/H30 の歳出ページは合計行の**下に特別会計と `総 計 (A+B+C)` が続く**が、パーサは合計行で打ち切る。
    // ⚠⚠ **R3・H31 は収録不可**（`unrecordable.ts` に記録）— R3 は歳入が `2～10 地方譲与税等` と集約されており
    //    款ごとの額が取れない、H31 は款別ページ（物理3〜6）だけ ToUnicode が壊れて CJK が0字（どちらも収録時に実測）。
    // ⚠ **R2 は判定していない**（台帳に載せていない）— 偵察は「全ページ スキャン画像」と報告しているが、
    //    **Wayback の当該捕捉が実体を返さず**（`id_` URL が 151KB の HTML エラーページを返す）**自分で確認できていない**。
    //    未検証を「できない」として台帳に書かない。
    // ⚠ **H30 は発行元から消えており Wayback の `id_` 実体 URL から取る**（`pipeline:archive` の対象外になるのは正常）。
    //    ⚠ H30 の歳入款7 は原典が**半角カタカナ** `ｺﾞﾙﾌ場利用税交付金`。**原典どおり保持して寄せない**
    //    （同年度のオープンデータ Excel は全角だが、こちらは概要 PDF 固有の字体）。
    // 前年度列は**当初**（R8→R4 の4ペアで歳入23款＋歳出13款が全件一致。さらに R4 の前年度列と H30 の当年度列は
    //    **別系統のオープンデータ Excel（CC BY）の款別集計とも全款一致**＝2系統での裏取り）。
    // ⚠ 水戸は**当初予算データ Excel を H26〜R8 の13年度・CC BY で登載**しており（款‑項‑目‑節‑細節・R8 は歳出5,732行）
    //    「項以下の内訳」に届くが、**前年度列を持たない**ので budget 階層の要件は単独では満たさない（別途の候補）。
    // ⚠ この概要 PDF は**オープンデータライブラリに非登載**（登載は Excel だけ）で、規約も
    //    「このライブラリに掲載している内容につきましては」と自ら範囲を限るため **CC BY は及ばない**（§9g）。
    // [年度, ファイル名, landing ID, 歳入ページ, 歳出ページ, 歳出見出し, 3列様式か]
    ["R8", "64558.pdf", "110290", 4, 6, "一般会計歳出内訳", false],
    ["R7", "52001.pdf", "94496", 4, 6, "一般会計歳出内訳", false],
    ["R6", "41506.pdf", "68583", 4, 6, "一般会計歳出内訳", false],
    ["R5", "28548.pdf", "36380", 3, 4, "歳出目的別内訳", true],
    ["R4", "17737.pdf", "5715", 3, 4, "予算総括（歳出内訳）", true],
  ] as const).map(([fy, file, page, rev, exp, expHeading, threeCol]) => ({
    id: `mito-yosangaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 水戸市当初予算の概要（一般会計歳入内訳・歳出内訳）`,
    publisher: "水戸市",
    url: `https://www.city.mito.lg.jp/uploaded/attachment/${file}`,
    landingPage: `https://www.city.mito.lg.jp/page/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "水戸市（一般会計・団体コード082015）",
    // 「リンク・著作権・免責事項」（/page/18265.html・更新 2026-01-05・確認日 2026-08-23）。
    // ⚠ 同ページにリンク条項があり「リンクを設定する場合は、リンク先のURLを水戸市ホームページの
    //    フロントページ（https://www.city.mito.lg.jp/）としてください」＝§11h 第2群（越谷・長崎県・春日井と同型）
    //    なので `noDeepLink` を立てる。前段が「原則として、リンクはフリーです」でも**能動的に宛先を指定している**。
    license:
      "市ホームページに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市ホームページ全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    noDeepLink: true,
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "一般会計歳入内訳",
      expenditureHeading: expHeading,
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "一般会計",
      ...(threeCol ? { dashAsZero: true, amountIntIndex: 0, prevIntIndex: 3 } : {}),
    },
  })),

  {
    // 水戸市 H30 — **発行元から消えており Wayback の `id_` 実体 URL が唯一の経路**。
    // ⚠ 列は R4 と同じ3列様式。⚠ 歳入22款（款8 `自動車取得税交付金`・R2 で廃止される款）。
    // ⚠ 款7 は原典が**半角カタカナ**（`ｺﾞﾙﾌ場利用税交付金`）。寄せない。
    id: "mito-yosangaiyou-h30",
    title: "平成30年度 水戸市当初予算の概要（一般会計歳入内訳・歳出内訳）",
    publisher: "水戸市",
    url: "https://web.archive.org/web/20220302161227id_/http://www.city.mito.lg.jp/000271/000273/000282/000367/p018400_d/fil/002.pdf",
    landingPage:
      "https://web.archive.org/web/20220302161030/https://www.city.mito.lg.jp/000271/000273/000282/000367/p018400.html",
    kind: "pdf",
    fiscalYear: "H30",
    scope: "水戸市（一般会計・団体コード082015）",
    license:
      "市ホームページに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市ホームページ全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    noDeepLink: true,
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePage: 3,
      expenditurePage: 4,
      revenueHeading: "一般会計歳入内訳",
      expenditureHeading: "予算総括（歳出内訳）",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "一般会計",
      dashAsZero: true,
      amountIntIndex: 0,
      prevIntIndex: 3,
    },
  },

  ...([
    // 福島市（福島県・中核市・県庁所在地・団体コード 072010）。
    // ⚠ 同じ県の**いわき市 072044・郡山市 072036 は収録済み**、**福島県は 070009**。id 接頭辞で取り違えないこと。
    // 「当初予算の概要」の**科目別歳入予算 / 科目別歳出予算**（歳入22〜24款・歳出13款）。
    // ⚠⚠ **年度で抽出経路が割れる**（どちらも実測）:
    //   - R8〜R3（PowerPoint 版）… **`textSource: "raw"` が必須**。`-layout` だと右の「主な増減理由」欄が款行に
    //     食い込み、款名が `23 中央学校給食センターの整備完了等による減市債` になり歳出が12款に潰れる
    //     （**Σ が大きく割れて error**＝静かには壊れない）。R8/R7 の歳出は**金額行が款名行より前**に来る。
    //   - R2〜H28（Word 版）… **`-layout` が必須**。`-raw` だと合計ラベル `合 計` が金額行から切り離され
    //     **「合計 行が見つかりません」で throw する**。
    // ⚠⚠ **R6・R5 は `revenueHeaderExtra` が無いと款1 が `一般会計歳入の状況市税` になる**（-raw でページ表題が
    //    表の直前に来る）。**Σ は4系統とも差0 のまま**なので**款名の全件目視だけが網**。
    //    R8/R7/R4/R3 では no-op だが年度で外さない（表題の位置は原典の都合で動く）。
    // ⚠⚠ **R2〜H28 は `^款別$` と `一般会計当初予算の内容` の両方が要る** — 表側見出し `款　別` は `KAN_HEADER_RE` に
    //    当たらず、ページ表題と合わせて款1 が `Ⅳ一般会計当初予算の内容及び財政資料款別市税` / `款別議会費` になる
    //    （これも **Σ は差0 のまま**）。
    // ⚠ 合計ラベルは全年度 `合　計`（既定の「歳入合計/歳出合計」では throw する）。
    // ⚠ 隣ページの「歳出の性質別」「自主・依存財源の内訳」は**合計が款別と同一**だが款番号を持たないので
    //    当てても throw する。⚠ ただし **R2〜H28 は p.2 の目次に見出し語が両方載る**ので、
    //    **物理ページの固定が唯一の網**。
    // ⚠ 歳入の款構成が動く: H30〜H28=22款（款8 `自動車取得税交付金`）／H31=23款（款9 `環境性能割交付金` が皆増）／
    //    R2=23款＋**廃止款 `自動車取得税交付金`**（款番号なし・皆減）／R3 以降=23款（款6 `法人事業税交付金`）。
    // ⚠ 歳出款13 は **`予備費`**（独自款）。寄せない。
    // ⚠ **R8 は訂正版 `R8yosan-tokusyuu2.pdf`（2026-06-18）を使う** — 旧版 `r8yosann-tokusyuu.pdf`（2026-03-27）が
    //    年度一覧側に残っているが本文に誤植（`維持修費`）がある。**款別ページの本文は両版で完全一致**。
    //    そのため R8 だけ landing を年度ページ（訂正版を指す）にしてある。
    // 前年度列は**当初**（R8→H28 の**全10ペア（歳入・歳出の両側で20系統）**で「翌年度の前年度列 = 前年度の当年度列」を全款突合。
    //    歳出は10ペア全13款で不一致0、歳入の3件はその年度に新設/廃止された款のみ）。骨格予算・議会修正の年度なし。
    // ライセンス「法的事項等」（/shisei/koho/4/10256.html・更新 2025-07-01・確認日 2026-08-23）。
    //    ⚠ 市のオープンデータ（CC BY 2.1 日本）は「オープンデータ一覧で公開しているデータ」に自ら範囲を限り、
    //    一覧11カテゴリに**予算・決算・財政は0件**＝及ばない（§9g）。
    //    ⚠ リンク条項は「リンクの掲載は、原則として自由とします」＝制限なし → `noDeepLink` は立てない。
    // [年度, ファイル名, 歳入ページ, 歳出ページ, textSource が raw か, landing ID]
    ["R8", "R8yosan-tokusyuu2.pdf", 47, 49, true, "17263"],
    ["R7", "r7gaiyoutokusyuu.pdf", 38, 40, true, "3286"],
    ["R6", "r6yosangaiyou.pdf", 36, 38, true, "3286"],
    ["R5", "r5-yosan_1.pdf", 37, 39, true, "3286"],
    ["R4", "r4gaiyou.pdf", 27, 29, true, "3286"],
    ["R3", "000.pdf", 28, 30, true, "3286"],
    ["R2", "r2yosan.pdf", 62, 63, false, "3286"],
    ["H31", "31yosanngaiyou.pdf", 51, 52, false, "3286"],
    ["H30", "h30yosannogaiyou.pdf", 51, 52, false, "3286"],
    ["H29", "h29yosannogaiyou.pdf", 61, 62, false, "3286"],
    ["H28", "h28yosannogaiyou.pdf", 57, 58, false, "3286"],
  ] as const).map(([fy, file, rev, exp, isRaw, page]) => ({
    id: `fukushima-shi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 福島市当初予算の概要（科目別歳入予算・科目別歳出予算）`,
    publisher: "福島市",
    url: `https://www.city.fukushima.fukushima.jp/material/files/group/14/${file}`,
    landingPage: `https://www.city.fukushima.fukushima.jp/soshiki/4/1012/1/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "福島市（一般会計・団体コード072010）",
    license:
      "ふくしまウェブに掲載されている情報等は知的財産権が法令等により保護されています。利用者は、福島市役所や福島市役所への情報等の提供元に事前の承諾を受けた場合を除いて、情報等やそれらに包含される内容（一部か全部かを問わない。）を複製・公開・送信・頒布・譲渡・貸与・使用許諾・転載・再利用できません。また、ふくしまウェブの内容の全部または一部について、無断で改変をおこなうことはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "科目別歳入予算",
      expenditureHeading: "科目別歳出予算",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      ...(isRaw
        ? {
            textSource: "raw" as const,
            revenueHeaderExtra: "一般会計歳入の状況",
            expenditureHeaderExtra: "一般会計歳出の状況",
          }
        : {
            revenueHeaderExtra: "^款別$|一般会計当初予算の内容",
            expenditureHeaderExtra: "^款別$|一般会計当初予算の内容",
          }),
    },
  })),

  ...([
    // 青森市（青森県・中核市・県庁所在地・団体コード 022012）。
    // ⚠⚠ **青森県 020002 の `aomori-ken-kanbetsu-sokatsu-*` とは別物**（県は合計ラベルが `計` の一字・
    //    歳出款4 が `環境保健費`。市は下記の様式で歳出款4 は標準の `衛生費`）。id 接頭辞を `aomorishi-` にしてある。
    // 「当初予算の概要」の**物理 p.18「歳入歳出予算款別総括表」**（歳入23款 → 合計 → 歳出14款 → 合計の縦積み＝`samePage`）。
    // ⚠ 単位は表頭に **百万円**（`unit: "millionYen"`。板橋と同じ扱い）。⚠ **千円精度の p.29 を採ると丸めは消えるが、
    //    合計ラベルが金額行の"次"の行に来る様式（`totalAmountNextLine` の逆）で既存パーサは throw する**。
    //    百万円で収録するため**款あたり最大 ±500千円の丸め**が入る（原典の表がその精度）。
    // ⚠⚠ **`amountIntIndex`/`prevIntIndex` は外せない** — 列が
    //    `[R7額, R7構成比, R7一般財源 | R8額, R8構成比, R8一般財源 | 比較額, 増減率, 比較一般財源]` で
    //    **一般財源が各年度ブロックに挟まる**ため、整数トークンは `[前年度額, 前年度一般財源, 当年度額,
    //    当年度一般財源, 比較額, 比較一般財源]` の6つになる。既定だと**当年度に前年度額・前年度に前年度一般財源**を
    //    読む。⚠ **`prevColumnFirst` では救えない**（鏡像で別の2つを掴むだけ）。京都府と同型。
    // ⚠ 合計ラベルは歳入歳出とも `合　　　計`（compact で `合計`）。`samePage` の2分割はこれで成立する。
    // ⚠ 同じ PDF の p.19 は会計別の当初予算比較（款番号なし）、p.15 は目的別歳出の比較（**一般会計の同じ数字**だが
    //    表の上の本文が偽の款を作る）、p.29 は事項別明細書（**性質別の前年度は「3月補正後現計」基準**）。
    //    **p.18 から動かさないこと** — 基準が変わる。
    // ⚠⚠ **R5 は骨格予算**（表紙に `【骨格予算】`・本文「政策的経費の一部を計上しない『骨格予算』として編成した」）。
    //    R6 の前年度列は**R5 の骨格予算額そのまま**（札幌型の「肉付後を前年度列に置く」事故は起きていない）。
    //    ⚠ **R6 の PDF には「骨格」「肉付」の語が0件**＝原典が何も断っていないので、こちらで `prevNote` を付ける。
    // 前年度列は**当初**（R8→R3 の5ペアで歳入23款・歳出14款が金額・款名とも全件一致。列反転もこれで否定）。
    // ⚠ **R2 以前は現行サイトから消失**しており、Wayback にも「概要」PDF が無い（代替候補の「わかりやすい予算書」は
    //    魚拓が 1,048,576 バイトちょうどで打ち切られていて読めない＝§9b）。WARP は未確認なので
    //    「収録できない」とは書かない（`unrecordable.ts` に載せない）。
    // ライセンス「サイトポリシー」（/about/1007400.html・更新 2025-01-18・確認日 2026-08-23）。
    //    ⚠ オープンデータ規約は「本サイト（青森市オープンデータポータルサイト）内の対象データのみに適用されます」と
    //    自ら範囲を限り、**カタログ353データセットに予算・決算・財政は0件**＝及ばない（§9g）。
    //    ⚠ **深リンクは明示的に許諾**されているので `noDeepLink` は立てない。ただし原文に
    //    「フレーム内に表示するリンク設定は行わないでください」があるので、**発行元ページを iframe に入れる導線は作らない**
    //    （現行の要許可の振替＝新規タブで発行元を開く、は条項に触れない）。
    // [年度, ディレクトリ, ファイル名, landing パス]
    ["R8", "001/010/042", "r8toushoyosannnogaiyou.pdf", "1006058/1009674/1010042"],
    ["R7", "001/008/900", "r7toushoyosannnogaiyou.pdf", "1006058/1007481/1008900"],
    ["R6", "001/006/063", "r6toushoyosannnogaiyou.pdf", "1006058/1006059/1006063"],
    ["R5", "001/006/068", "r5gaiyou.pdf", "1006058/1006064/1006068"],
    ["R4", "001/006/073", "r4_tousyogaiyou.pdf", "1006058/1006069/1006073"],
    ["R3", "001/006/078", "r3_tousyogaiyou.pdf", "1006058/1006074/1006078"],
  ] as const).map(([fy, dir, file, page]) => ({
    id: `aomorishi-yosan-gaiyou-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 青森市当初予算の概要（歳入歳出予算款別総括表）${fy === "R5" ? "【骨格予算】" : ""}`,
    publisher: "青森市",
    url: `https://www.city.aomori.aomori.jp/_res/projects/default_project/_page_/${dir}/${file}`,
    landingPage: `https://www.city.aomori.aomori.jp/shisei/gyouzaiseiunei/${page}.html`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "青森市（一般会計・団体コード022012）",
    license:
      "「青森市ホームページ」に掲載されている情報（文章、画像、イラストなど）は、著作権の対象となっています。また、「青森市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: 18,
      expenditurePage: 18,
      samePage: true,
      revenueHeading: "歳入歳出予算款別総括表",
      expenditureHeading: "歳入歳出予算款別総括表",
      revenueTotalLabel: "合計",
      expenditureTotalLabel: "合計",
      amountIntIndex: 2,
      prevIntIndex: 0,
      unit: "millionYen" as const,
      ...(fy === "R6"
        ? {
            prevNote:
              "前年度（令和5年度）の当初予算は、市長選挙のため骨格予算として編成されている（原典「令和5年度当初予算の概要」の表紙に【骨格予算】と明記）。ここでの前年度額はその骨格予算の当初額。",
          }
        : {}),
    },
  })),

  ...([
    // 市原市（千葉県・団体コード 122190）。**当初予算書「歳入歳出予算事項別明細書 １ 総括」**（歳入21〜22款・歳出13款）。
    // ⚠⚠ **発行元サイトは SPA（URBANOS 系 CMS）で HTML に本文もリンクも入っていない**。旧 URL
    //    （`/joho/zaisei/yosan/index.html` 等）は**すべて 301 で「該当するページが見つかりませんでした」に飛ぶ**。
    //    年度一覧を機械で辿るには JSON API を叩く（次に探す人が再偵察しないで済むよう手順を残す）:
    //      POST /prd/ich/portal/openapi/v1/article/detail/retrieve
    //        {"tenantId":"1","siteId":"101","langCode":"JPN","pageId":"PT_HM_S74_02","articleId":"<id>"}
    //      POST /prd/ich/portal/openapi/v1/article/category/retrieve
    //        {"tenantId":"1","siteId":"101","langCode":"JPN","pageId":"PTCGS55","categoryIdList":["30605020"],"retrievalCount":5,"bulkFlg":1}
    //    ⚠ カテゴリ側は `pageId` が `PTCGS55` でないと**5件で打ち切られる**。
    // ⚠ PDF の実体は Azure Blob だが**発行元ドメイン `/blob/images/common-article/<articleId>/<file>` でも 200** で
    //    バイト数も一致する。**発行元ドメインの方を登録する**（`robots.txt` が `/blob/images/` を Disallow するのは
    //    クロール禁止であって取得禁止ではない）。
    // ⚠⚠ **同じ PDF に特別会計の「総括」が同じ見出し・同じ合計ラベルで並ぶ**（R8 は 256/257・294/295 など）。
    //    **物理ページの固定が唯一の網**。⚠ R3 以前の分割 PDF は一般会計だけなので総括は1組。
    // ⚠⚠ **R8 の歳入だけ `-layout` が款名を壊す** — `交通安全対策特別交付金` の `策` と `特` がほぼ同じ x にあり
    //    `交通安全対特別交付策金` になる（⚠ `revenueCropX` は x/W を24通り試して全滅）。`-raw` なら正しい。
    //    ⚠ **ところが歳出は `-raw` だと合計ラベルが金額行から3行離れて throw する**ので、
    //    **`textSource` を側ごとに分ける**（この巡で足したオプション）。R7 以前は `-layout` で両側とも正しい。
    // ⚠ 廃止款は原典が `(廃) 環境性能割交付金 … 皆減` と書く（R8・R2）。検出は `皆減` が担うので **Σ は差0 のまま
    //    款名だけが `(廃)…` になる** → この巡で剥がし側に `(廃)` を足した。
    // ⚠ 歳出款13 は **`予備費`**（独自款）。寄せない。
    // ⚠ 概要 PDF の歳入表は**款別ではない**（`自主財源`・`各種交付金計` の小計行が混ざる）。**予算書側を使う**。
    // 前年度列は**当初**（R8→H21 の**17ペア**で歳入・歳出の全款を突合し不一致0。差分は款の新設・廃止だけ）。
    // ライセンス「著作権・リンク・免責事項」（articleId=60236e22ece4651c88c17aae・確認日 2026-08-23）。
    //    ⚠ 「各ページに特段の定めがある場合はその取り扱いが優先される」とあるので年度ページ本文も確認したが
    //    **利用条件の記載は一切無い**（資料名とダウンロードリンクのみ）。
    //    ⚠ オープンデータ規約は「オープンデータ専用ページで公開している情報」に自ら範囲を限り、
    //    カタログ6,277件に**予算書・決算書・主要な施策の成果は0件**（財政課の登載は固定資産台帳7件のみ）＝及ばない（§9g）。
    //    ⚠ リンクは「原則として自由」で `noDeepLink` は立てない。ただし原文が**フレーム内表示を断っている**ので、
    //    発行元ページを iframe に入れる導線は作らない（要許可の振替＝新規タブで開く現行挙動は条項に触れない）。
    // [年度, 記事ID, ファイル名, 歳入ページ, 歳出ページ, landing 記事ID]
    ["R8", "68e73985497a410889fe84ea", "R8%E5%BD%93%E5%88%9D%E4%BA%88%E7%AE%97%E6%9B%B8.pdf", 26, 27, "68e73985497a410889fe84ea"],
    ["R7", "67051fbedc0bea560b07196c", "%E4%BB%A4%E5%92%8C%EF%BC%97%E5%B9%B4%E5%BA%A6%E5%BD%93%E5%88%9D%E4%BA%88%E7%AE%97%E6%9B%B8.pdf", 29, 30, "691faa26a901f26670ed6886"],
    ["R6", "65263eb35a935c4746038075", "6toushoyosansho.pdf", 26, 27, "65263eb35a935c4746038075"],
    ["R5", "63465f763d624d4630f47a70", "R5_tousyoyosansyo.pdf", 25, 26, "63465f763d624d4630f47a70"],
    ["R4", "6166e538396461290eef8120", "r4yosannsyoan.pdf", 24, 25, "6166e538396461290eef8120"],
    ["R3", "6059850bedb86d45e1b6df83", "02%E4%B8%80%E8%88%AC%E4%BC%9A%E8%A8%88%EF%BC%8D1%E8%A1%A8%E3%81%8B%E3%82%894%E8%A1%A8%E3%83%BB%E6%98%8E%E7%B4%B0%E6%9B%B8%EF%BC%88%E7%B7%8F%E6%8B%AC%EF%BC%89.pdf", 18, 19, "6166cbb7396461290eef7758"],
    ["R2", "60237806ece4651c88c187eb", "02honbun-soukatu.pdf", 17, 18, "6023781dece4651c88c187fb"],
    ["R1", "602377f8ece4651c88c187e0", "01ippan1hyoukara.pdf", 17, 18, "6023780cece4651c88c187f1"],
    ["H30", "60237803ece4651c88c187ea", "01ippan1hyoukara.pdf", 18, 19, "6023781cece4651c88c187fa"],
    ["H29", "60237803ece4651c88c187e9", "01ippanhyousikara.pdf", 17, 18, "6023781aece4651c88c187f9"],
    ["H28", "60237801ece4651c88c187e8", "01ippan1hyoukara.pdf", 13, 14, "60237819ece4651c88c187f8"],
    ["H27", "60237801ece4651c88c187e7", "H27ippan-1.pdf", 13, 14, "60237818ece4651c88c187f7"],
    ["H26", "602377ffece4651c88c187e6", "h26ippan-1.pdf", 14, 15, "60237816ece4651c88c187f6"],
    ["H25", "602377feece4651c88c187e5", "h25ippan-1.pdf", 13, 14, "60237815ece4651c88c187f5"],
    ["H24", "602377fdece4651c88c187e4", "h24ippan-1.pdf", 12, 13, "60237812ece4651c88c187f4"],
    ["H23", "602377fcece4651c88c187e3", "h23ippan-1.pdf", 13, 14, "6023780fece4651c88c187f2"],
    ["H22", "602377fbece4651c88c187e2", "h22ippan-1.pdf", 16, 17, "60237810ece4651c88c187f3"],
    ["H21", "602377f9ece4651c88c187e1", "h21ippan-1.pdf", 16, 17, "602377f9ece4651c88c187e1"],
  ] as const).map(([fy, art, file, rev, exp, landing]) => ({
    id: `ichihara-yosansho-${fy.toLowerCase()}`,
    // ⚠ **2019年度（R1）だけ原典が西暦表記** — 表紙も総括ページも `２０１９年度市原市一般会計予算` で、
    //   元号が1文字も出てこない（改元の年に市が西暦へ逃がしたと見られる。R8・R4 は `令和８年度`、
    //   H30・H21 は `平成３０年度` と元号なので、この年度だけの例外）。**題名は原典の呼称を残す**。
    title:
      fy === "R1"
        ? "2019年度（令和元年度） 市原市当初予算書（一般会計 歳入歳出予算事項別明細書 １総括）"
        : `${eraYear(fy)}年度 市原市当初予算書（一般会計 歳入歳出予算事項別明細書 １総括）`,
    publisher: "市原市",
    url: `https://www.city.ichihara.chiba.jp/blob/images/common-article/${art}/${file}`,
    landingPage: `https://www.city.ichihara.chiba.jp/article?articleId=${landing}`,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "市原市（一般会計・団体コード122190）",
    license:
      "市原市ウェブサイトに掲載されている文章、画像等の著作権は、市原市または文章、画像等の提供者に帰属します。これらの著作権は、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・引用することはできません。ただし、市原市ウェブサイト内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "（歳入）",
      expenditureHeading: "（歳出）",
      // ページ冒頭の書名と節見出しが款1（市税）に混ざる
      revenueHeaderExtra: "^歳入歳出予算事項別明細書$|^1総括$",
      // 歳出は「本年度予算額の財源内訳」の3段ヘッダのうち2行が款1（議会費）に混ざる
      expenditureHeaderExtra: "^一般財源$|^国・県支出金地方債その他$",
      ...(fy === "R8" ? { textSource: { revenue: "raw", expenditure: "layout" } as const } : {}),
    },
  })),

  ...([
    // 八尾市（大阪府・中核市・団体コード 272124）。**当初予算書「歳入歳出予算事項別明細書 １．総括」**
    //   （歳入22款・歳出11〜12款）。⚠ 同じ府の**茨木市 272116 は全年度が収録不可**と判定済み。混同しないこと。
    // ⚠⚠ **同じ PDF に特別会計の同型「１．総括」が5つある**（R8 は p.232 国保・p.288 財産区・p.314 介護・
    //    p.416 土地取得・p.440 母子父子寡婦）。**見出しも合計ラベルも1文字も違わない**ため、
    //    偵察が p.232 を当てたところ **Σ4系統すべて差0 のまま完走した**（款名が `保険給付費` になるだけ）。
    //    ⚠ 物理ページは毎年動く（22/24/25/13/13/14）ので**年度ごとに実測して固定する**のが唯一の網。
    // ⚠⚠ **款9 `国有提供施設等所在市町村助成交付金` が R8〜R5 で切れる** — `-layout` が金額行と下段の間に
    //    空行を1本入れ、既定では折返しバッファが空行で捨てられる。**Σ は4系統とも差0 のまま款名だけ切れる**。
    //    → この巡で足した `kanNameContinuesAcrossBlank`（opt-in・空行1本まで）で拾う。
    //    ⚠ **同じ八尾でも R4・R3 は空行が入らない**（同一自治体の年度間で揺れる）。付けても no-op なので全年度に付ける。
    // ⚠ **R3 は `kanNoless` が必須** — 歳出の廃止款 `諸支出金` に款番号が無く、指定しないと前年度Σ が −5,879 ずれる。
    // ⚠ 歳出款6 は **`産業費`**（`農林水産業費`・`商工費` に分かれていない独自款）、款11/12 に `諸支出金`・`予備費`。寄せない。
    // ⚠ **`予算参考資料` の表を款別に使ってはいけない** — p.4 は2列目が「前年度」ではなく「うち一般財源」、
    //    p.5 は1ページに性質別と目的別が縦積み。当てると Σ が +140,734,800 / +253,448,707 と大きく割れる（＝安全側）。
    // ⚠ **R5 は WARP からしか完全版が取れない** — Wayback の唯一の捕捉が**きっかり 1,048,576 バイトで打ち切り**
    //    （§9b）で xref を再構成できない。R4・R3 は Wayback の `id_` 実体 URL（どちらも `pipeline:archive` の対象外）。
    // ⚠ R1（H31）以前は**全ページ スキャン画像**（502ページでテキスト計6,193字＝ノンブルのみ）。
    //    ⚠ **R2 は化けだが `GARBLE_CHAR_MAP` に13字足せば開く見込み**（項/明/細/書/有/提/供/在/町/村/助/府 と罫）。
    //    どちらも**自分で確かめていない**ので `unrecordable.ts` には載せない。
    // 前年度列は**当初**（R8→R3 の5ペアで歳入22款・歳出11款を全件突合。差は新設/廃止の款のみ）。
    // ライセンス「サイトポリシー・著作権・免責事項など」（/about/site/1013507.html・更新 2025-05-30・確認日 2026-08-23）。
    //    ⚠ オープンデータは CC BY 4.0 を宣言するが**登載はAED設置状況と地域・年齢別人口の2件だけ**で
    //    予算・決算・財政は0件、規約自身も「オープンデータページ上で公開している情報」に範囲を限る＝及ばない（§9g）。
    //    ⚠ リンク条項「このホームページへのリンク先は https://www.city.yao.osaka.jp/ としてください」＝
    //    §11h 第2群（越谷・長崎県・春日井・水戸と同型）なので **`noDeepLink` を立てる**。
    // [年度, url, landing, 歳入ページ, 歳出ページ, kanNoless]
    ["R8", "https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/017/102/r8yosansyo.pdf",
      "https://www.city.yao.osaka.jp/shisei/seisaku_keikaku_zaisei/1009738/1009740/1017102.html", 22, 23, false],
    ["R7", "https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/023/555/r7yosansyo.pdf",
      "https://www.city.yao.osaka.jp/shisei/seisaku_keikaku_zaisei/1009738/1009740/1023555.html", 24, 25, false],
    ["R6", "https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/009/741/r6yosansyo.pdf",
      "https://www.city.yao.osaka.jp/shisei/seisaku_keikaku_zaisei/1009738/1009740/1009741.html", 25, 26, false],
    ["R5", "https://warp.ndl.go.jp/20230813/20230811223340/https://www.city.yao.osaka.jp/cmsfiles/contents/0000067/67628/R5yosansho.pdf",
      "https://warp.ndl.go.jp/20230813/20230811223340/https://www.city.yao.osaka.jp/0000067628.html", 13, 14, false],
    ["R4", "https://web.archive.org/web/20220705223638id_/https://www.city.yao.osaka.jp/cmsfiles/contents/0000062/62171/R4yosansyo.pdf",
      "https://web.archive.org/web/20230529044845/https://www.city.yao.osaka.jp/0000062171.html", 13, 14, false],
    ["R3", "https://web.archive.org/web/20220706125931id_/https://www.city.yao.osaka.jp/cmsfiles/contents/0000056/56728/23yosansyo.pdf",
      "https://web.archive.org/web/20231130112349/https://www.city.yao.osaka.jp/0000056728.html", 14, 15, true],
  ] as const).map(([fy, url, landing, rev, exp, noless]) => ({
    id: `yao-yosansho-${fy.toLowerCase()}`,
    title: `${eraYear(fy)}年度 八尾市当初予算書（一般会計 歳入歳出予算事項別明細書 １．総括）`,
    publisher: "八尾市",
    url,
    landingPage: landing,
    kind: "pdf" as const,
    fiscalYear: fy,
    scope: "八尾市（一般会計・団体コード272124）",
    license:
      "八尾市ホームページ上に掲載されている写真・イラスト・音声・動画及び記事は、著作権の対象となっています。また、八尾市ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。原則、著作権は八尾市に帰属しており、一部の画像等の著作権は、原著作者が所有していますので、無断での使用や転載を禁じます。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、八尾市ホームページの掲載コンテンツを複製・転用する際は、必ず事前に広報課までお問合せください。",
    noDeepLink: true,
    parser: "kofu-yosansho" as const,
    parserOptions: {
      revenuePage: rev,
      expenditurePage: exp,
      revenueHeading: "(歳 入)",
      expenditureHeading: "(歳 出)",
      kanNameContinues: { revenue: [9] },
      kanNameContinuesAcrossBlank: true,
      ...(noless ? { kanNoless: true } : {}),
    },
  })),

  {
    // 山梨県（都道府県・団体コード 190004）R6 一般会計決算「決算の状況」PDF。
    // 款別の予算現額・決算額・執行率（歳出）／収入率（歳入）。単位=円（円→億は /1e8）。
    // 当初予算（yamanashi-yosansho-r8）と対で、budget→full へ寄せる決算・執行率の原典。
    id: "yamanashi-kessan-r6",
    title: "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
    publisher: "山梨県",
    url: null,
    urls: ["https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf"],
    landingPage: "https://www.pref.yamanashi.jp/sui-kai/163_003.html",
    kind: "pdf",
    fiscalYear: "R6",
    scope: "山梨県（一般会計・都道府県・団体コード190004）",
    license: "山梨県ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "yamanashi-kessan",
  },
  // 甲府市の決算状況「収入支出詳細」HTML ページ。款別の予算現額・収入/支出済額・
  // 収入率/執行率（出納整理後の**確定値**）＋市税の内訳（予算現額のみ）。
  // 過去の執行を確定値で辿る本命資料。R3 は年度ページ・詳細ページとも市サイトから
  // 削除済みで Wayback にも無く入手不可（R4・R5 予算資料と同じパターン）。
  ...([
    ["r6", "R6", "r6kessan/r6ippansyousai.html", "r6kessan/r6kessan.html"],
    ["r5", "R5", "r5kessan/r5ippansyousai.html", "r5kessan/r5kessan.html"],
    ["r4", "R4", "r04kessan/r4ippannsyousai.html", "r04kessan/r04kessan.html"],
    ["r2", "R2", "h28kessan/r2shuushishousai.html", "r02kessan.html"],
    ["r1", "R1", "h28kessan/r1sishutu.html", "h28kessan/r1kessann.html"],
  ] as const).map(([suffix, fy, detail, index]): SourceEntry => ({
    id: `kofu-kessan-syousai-${suffix}`,
    title: `令和${fy.slice(1)}年度 甲府市決算状況 収入支出詳細（一般会計・確定値）`,
    publisher: "甲府市",
    url: null,
    urls: [`https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/${detail}`],
    landingPage: `https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/${index}`,
    kind: "page",
    fiscalYear: fy,
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-kessan-syousai",
  })),
  {
    // R3 の収入支出詳細は市サイトから削除済み・Wayback にも無いが、
    // **WARP（国立国会図書館インターネット資料収集保存事業）**の 2023-11-06
    // スナップショットに残存していたため、そこから回収した（発見: 2026-07-12）。
    // WARP の pywb はリンク書き換えを行うがテーブルのテキストは原文のまま。
    // 原典 URL（消失済み）:
    //   https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html
    id: "kofu-kessan-syousai-r3",
    title: "令和3年度 甲府市決算状況 収入支出詳細（一般会計・確定値・WARP回収）",
    publisher: "甲府市",
    url: null,
    urls: [
      "https://warp.ndl.go.jp/20231106/20231106005608/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html",
    ],
    landingPage: "https://warp.ndl.go.jp/waid/4530",
    kind: "page",
    fiscalYear: "R3",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（WARP 経由の保存版。利用条件は両者のサイト参照）",
    parser: "kofu-kessan-syousai",
  },
  // 甲府市統計書「一般会計歳入歳出状況」（財政章）。款＋項 × 当初/最終/決算（円）の
  // 3点セットが取れる唯一のウェブ公開資料（補正の規模＝最終−当初もここから分かる）。
  // 統計書の「版」とデータ年度はズレる（R7版=R5年度…版−2年）。id・fiscalYear は
  // **データ年度**で付け、版はコメントとタイトルに残す。パーサがヘッダの年度表記を突合する。
  // R1 年度分（R3版）は統計書ページから消失（未収録 — WARP 走査は今後）。
  // 各ファイルは3年度分のブロックを持つ（N-2・N-1 = 3値、N = 当初のみ）。
  // 各データ年度は**それを含む最新の版**から取る（版の重複収録はしない）
  ...([
    ["r6", "R6", "令和7年版", "r7toukyisho/documents/r7-15-01.xls", "r7toukyisho/documents/r7-15-02.xls", "r7toukyisho/toukeisho.html"],
    ["r5", "R5", "令和7年版", "r7toukyisho/documents/r7-15-01.xls", "r7toukyisho/documents/r7-15-02.xls", "r7toukyisho/toukeisho.html"],
    ["r4", "R4", "令和6年版", "r6toukeisyo/documents/r6-15-01.xls", "r6toukeisyo/documents/r6-15-02.xls", "r6toukeisyo/toukeisyo.html"],
    ["r3", "R3", "令和5年版", "documents/r5-15-01.xls", "documents/r5-15-02.xls", "r5toukeisho.html"],
    // 令和4年版 15-01 の行65 は R1 年度の市債行の誤配置（原典事故）→ skipRows で除外
    ["r2", "R2", "令和4年版", "r4toukeisho/documents/15-01.xls", "r4toukeisho/documents/15-02.xls", "r4toukeisho/r4toukeisho.html"],
    ["r1", "R1", "令和2年版", "documents/15-01.xls", "documents/15-02.xls", "r2toukeisho.html"],
    ["h30", "H30", "令和2年版", "documents/15-01.xls", "documents/15-02.xls", "r2toukeisho.html"],
  ] as const).map(([suffix, fy, edition, revPath, expPath, page]): SourceEntry => ({
    id: `kofu-toukei-zaisei-${suffix}`,
    title: `${eraYear(fy)}年度 一般会計歳入歳出状況（甲府市統計書 ${edition}）`,
    publisher: "甲府市",
    url: null,
    urls: [
      `https://www.city.kofu.yamanashi.jp/somu-somu/${revPath}`,
      `https://www.city.kofu.yamanashi.jp/somu-somu/${expPath}`,
    ],
    landingPage: `https://www.city.kofu.yamanashi.jp/somu-somu/${page}`,
    kind: "excel",
    fiscalYear: fy,
    scope: "甲府市（一般会計・款項）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-toukei-zaisei",
    ...(suffix === "r2" ? { parserOptions: { skipRows: { "15-01.xls": [65] } } } : {}),
  })),
  // 甲府市の行政評価（事務事業評価）結果一覧。実施計画事業ごとの総合評価（A〜F）。
  // 年度で形式・ファイル種別が大きく違う（parserOptions.format）。
  // 詳細票（事業費決算額・成果指標つき）は公開がサンプルのみ → 全量は情報公開請求
  // （リクエスト制: data-strategy.md）。評価年度 = 実施計画の年度。
  ...([
    ["r7", "R7", "7kouhyouyou2.xlsx", "r7gyoseihyouka.html", { format: "form-plus-plan" }],
    ["r6", "R6", "6kouhyouyou6.xlsx", "r6gyoseihyouka.html", { format: "form-plus-plan" }],
    ["r5", "R5", "kouhyouyoudeta5-4.pdf", "r5gyouseihyouka.html", { format: "form-pdf", pages: { from: 1, to: 11 } }],
    ["r4", "R4", "kouhyouyoudeta3-4.pdf", "r4gyouseihyouka.html", { format: "form-pdf", pages: { from: 1, to: 10 } }],
    ["r3", "R3", "hyoukahyou2.xlsx", "r3gyouseihyouka.html", { format: "hyouka-form" }],
    ["r2", "R2", "r02kekkaichiran.xlsx", "r2gyouseihyouka.html", { format: "list-simple" }],
    ["r1", "R1", "r01kekkaichiran.xls", "r1gyouseihyouka.html", { format: "list-simple" }],
    ["h30", "H30", "30kekkaitiran.xls", "h30gyouseihyouka.html", { format: "list-simple" }],
    ["h29", "H29", "kekkaitiran.xls", "keikaku.html", { format: "list-simple" }],
  ] as const).map(([suffix, fy, file, page, options]): SourceEntry => ({
    id: `kofu-gyousei-hyouka-${suffix}`,
    title: `${eraYear(fy)}年度 甲府市行政評価（事務事業評価）結果一覧`,
    publisher: "甲府市",
    url: null,
    urls: [`https://www.city.kofu.yamanashi.jp/zaise/documents/${file}`],
    landingPage: `https://www.city.kofu.yamanashi.jp/zaise/${page}`,
    kind: file.endsWith(".pdf") ? "pdf" : "excel",
    fiscalYear: fy,
    scope: "甲府市（実施計画事業）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-gyousei-hyouka",
    parserOptions: options as Record<string, unknown>,
  })),
  {
    // 甲府市の財政事情の公表（地方自治法 §243の3）。年2回、款別の予算現額と
    // 収入/支出済額（＝執行状況）が出る。直リンクは公表のたびに同じパスへ
    // 上書きされるため、アーカイブ済み raw と sha256 が版を固定する。
    // 現在の版: 令和8年3月31日現在（= R7年度末・出納整理期間前）
    id: "kofu-zaisei-jokyo-r7",
    title: "令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）",
    publisher: "甲府市",
    url: null,
    urls: ["https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf"],
    landingPage: "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/r07zaiseijokyo.html",
    kind: "pdf",
    fiscalYear: "R7",
    scope: "甲府市（一般会計）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-zaisei-jokyo",
    parserOptions: { revenuePage: 1, expenditurePage: 2 },
  },
  {
    // 甲府市議会の構成（予算議決時）。2ページを束ねる:
    //   [0] 所属会派別議員名簿（会派ごとに1テーブル・各行=議員1名 → 会派別議席数）
    //   [1] 令和8年3月定例会 審議結果（議案第5号 = 令和8年度一般会計予算の議決日・結果）
    // いずれも HTML テーブル。定数32・現員32（会派の和＝32で確認）。
    // 賛否内訳・会派別賛否は非公表（起立採決で「可決」のみ）なので収録しない。
    id: "kofu-gikai-r8",
    title: "令和8年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    publisher: "甲府市議会",
    url: null,
    urls: [
      "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "https://www.city.kofu.yamanashi.jp/gijichosa/r0803/shingikekka.html",
    ],
    landingPage: "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
    kind: "page",
    fiscalYear: "R8",
    scope: "甲府市議会（定数32・団体コード192015）",
    license: "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-gikai",
  },
  // 過去年度の議会構成（R2〜R7）。会派名簿は同一URLを上書き更新するため、各予算の
  // 議決時点のバージョンを Wayback スナップショット（id_ = pywb 書換えなしの原本）で固定する。
  // 会派構成は 2019 選挙（R2〜R5）と 2023 選挙（R6〜R7）の2エラで、更新日の窓が各予算日を
  // 含むスナップショットを採用（詳細は docs/data-sources.md §6）。審議結果は発行元 live、
  // ただし R2 は発行元から削除済みのため Wayback（旧綴り shinngikekka.html）から回収。
  ...([
    // [fy, 名簿スナップTS(更新日), 審議結果URL]
    ["R7", "20240910021519", "https://www.city.kofu.yamanashi.jp/gijichosa/r0703/shingikekka.html"],
    ["R6", "20231202080331", "https://www.city.kofu.yamanashi.jp/gijichosa/r0603/shingikekka.html"],
    ["R5", "20221129001525", "https://www.city.kofu.yamanashi.jp/gijichosa/r0503/shingikekka.html"],
    ["R4", "20211130030844", "https://www.city.kofu.yamanashi.jp/gijichosa/r0403/shingikekka.html"],
    ["R3", "20191114183718", "https://www.city.kofu.yamanashi.jp/gijichosa/r0303/shingikekka.html"],
    ["R2", "20191114183718", "https://web.archive.org/web/20200813113035id_/https://www.city.kofu.yamanashi.jp/gijichosa/r0203/shinngikekka.html"],
  ] as const).map(([fy, rosterTs, kekkaUrl]): SourceEntry => ({
    id: `kofu-gikai-${fy.toLowerCase()}`,
    title: `令和${fy.slice(1)}年度 甲府市議会の構成（会派別議席数）と当初予算の議決`,
    publisher: "甲府市議会",
    url: null,
    urls: [
      `https://web.archive.org/web/${rosterTs}id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html`,
      kekkaUrl,
    ],
    landingPage: "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
    kind: "page",
    fiscalYear: fy,
    scope: "甲府市議会（定数32・団体コード192015）",
    license: "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-gikai",
  })),
  // 事業報告（成果）＝事務事業評価 詳細票（第2号様式）。行政評価の公表用 XLSX に
  // 個別事業の詳細票が数枚だけ埋め込まれている（事業番号がシート名）。事業費（決算＋当初＋計画）・
  // トータルコスト・成果指標の目標/実績・総合評価を1事業で通して見られる。公表は各年サンプルのみ。
  ...([
    ["r6", "R6", "6kouhyouyou6.xlsx"],
    ["r7", "R7", "7kouhyouyou2.xlsx"],
  ] as const).map(([suffix, fy, fname]): SourceEntry => ({
    id: `kofu-jigyou-houkoku-${suffix}`,
    title: `${fy === "R6" ? "令和6" : "令和7"}年度 甲府市 事務事業評価 詳細票（事業報告・成果）`,
    publisher: "甲府市",
    url: null,
    urls: [`https://www.city.kofu.yamanashi.jp/zaise/documents/${fname}`],
    landingPage: `https://www.city.kofu.yamanashi.jp/zaise/${suffix}gyoseihyouka.html`,
    kind: "excel",
    fiscalYear: fy,
    scope: "甲府市（事務事業評価 詳細票・公表サンプル）",
    license: "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
    parser: "kofu-jigyou-houkoku",
  })),
  {
    // 開発用フィクスチャ: 上記と同じ構造の小さな Excel を dev/make-fixture.ts が
    // 生成する。パイプラインの end-to-end 検証専用。normalized 出力は
    // data/normalized/_fixtures/ に隔離され、アプリからは import しない。
    id: "fixture-shichoson-kessan-r6",
    title: "【フィクスチャ】市町村別決算状況調（形式検証用）",
    publisher: "本リポジトリ（生成データ）",
    url: null,
    kind: "excel",
    fiscalYear: "R6",
    scope: "検証用5市",
    license: "N/A（ダミー）",
    parser: "soumu-shichoson-kessan",
    fixture: true,
  },
];

// 起動時にレジストリ自体を検証する（不正エントリの混入防止）
for (const s of SOURCES) sourceEntrySchema.parse(s);

export function findSource(id: string): SourceEntry {
  const s = SOURCES.find((x) => x.id === id);
  if (!s) {
    throw new Error(
      `未登録のソースID: ${id}\n登録済み: ${SOURCES.map((x) => x.id).join(", ")}`,
    );
  }
  return s;
}
