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
    // 山口市（山口県・団体コード 352012）。「令和7年度 当初予算資料（全体版）」巻末の
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
      // 主要事業: 概要 p.1-22 の ○（新/拡）事業名 …金額千円（中項目《…》で施策）。
      // p.1 は冒頭に総括表（単位ヘッダ・行末に千円無し→誤検出しない）＋主要事業の開始
      projectsFile: "02_tousyonogaiyou_1.pdf",
      projectPages: { from: 1, to: 22 },
      projectFormat: "pref-bullets",
    },
  },
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
    title: `${fy.startsWith("H") ? `平成${fy.slice(1)}` : `令和${fy.slice(1)}`}年度 一般会計歳入歳出状況（甲府市統計書 ${edition}）`,
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
    title: `${fy.startsWith("H") ? `平成${fy.slice(1)}` : `令和${fy.slice(1)}`}年度 甲府市行政評価（事務事業評価）結果一覧`,
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
