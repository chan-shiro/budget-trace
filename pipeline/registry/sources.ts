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
