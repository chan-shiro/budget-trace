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
    },
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
    license:
      "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    parser: "kofu-yosansho",
    parserOptions: {
      revenuePages: { from: 6, to: 7 },
      expenditurePages: { from: 8, to: 9 },
      revenueHeading: "歳入",
      expenditureHeading: "歳出",
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
    },
  },
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
