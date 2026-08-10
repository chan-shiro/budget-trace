// このファイルは自動生成です。手で編集しないこと。
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
 * 団体コード → 当初予算の索引。**本体は載せない**（#216）。
 *
 * ⚠⚠ **予算の中身をここに焼き込まないこと**。全エンティティ・全年度を TS モジュールで持つと
 * バンドルが 6.8MB になり、**ビルドのほぼ全部がその解析時間**になる（実測: 6.8MB で
 * Compiled in 3.2min、重複込みの 8.9MB では 6.0min。**サイズに対して超線形に効く**）。
 * 本体は public/munibudgets/《団体コード》.json から useMuniBudgets が実行時に取る
 * （decision 階層の県シャードと同じ作法）。
 *
 * ここに置いてよいのは**サーバ側で同期的に要るものだけ** — サイトマップ（sitemap.ts）と
 * URL 解決（routing.ts）はビルド時に全団体の名前を引くので、フェッチでは間に合わない。
 */
export interface MuniBudgetIndexEntry {
  muniName: string;
  prefName: string;
  /** 都道府県エンティティ（県全体）か */
  isPref: boolean;
  /** 収録年度（新しい順）。年度ドロップダウンはこれで作る */
  fys: string[];
  /** いずれかの年度に主な事業があるか（トップの「収録の深さ」の段割り用） */
  hasProjects: boolean;
}

export const MUNI_BUDGET_INDEX: Record<string, MuniBudgetIndexEntry> = {
  "100005": {
    "muniName": "群馬県",
    "prefName": "群馬県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "110001": {
    "muniName": "埼玉県",
    "prefName": "埼玉県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "111007": {
    "muniName": "さいたま市",
    "prefName": "埼玉県",
    "isPref": false,
    "fys": [
      "R8",
      "R7"
    ],
    "hasProjects": false
  },
  "120006": {
    "muniName": "千葉県",
    "prefName": "千葉県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "121002": {
    "muniName": "千葉市",
    "prefName": "千葉県",
    "isPref": false,
    "fys": [
      "R8",
      "R4"
    ],
    "hasProjects": false
  },
  "130001": {
    "muniName": "東京都",
    "prefName": "東京都",
    "isPref": true,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29"
    ],
    "hasProjects": false
  },
  "131016": {
    "muniName": "千代田区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R2"
    ],
    "hasProjects": false
  },
  "131024": {
    "muniName": "中央区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29"
    ],
    "hasProjects": false
  },
  "131032": {
    "muniName": "港区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H28",
      "H27",
      "H26",
      "H25",
      "H23",
      "H22",
      "H21",
      "H20",
      "H19"
    ],
    "hasProjects": true
  },
  "131041": {
    "muniName": "新宿区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "R1",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H25",
      "H24",
      "H23",
      "H22",
      "H21",
      "H20",
      "H19",
      "H18",
      "H17",
      "H16",
      "H15",
      "H14",
      "H13"
    ],
    "hasProjects": true
  },
  "131059": {
    "muniName": "文京区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H24",
      "H23",
      "H22",
      "H21",
      "H20",
      "H19",
      "H18",
      "H17",
      "H16"
    ],
    "hasProjects": false
  },
  "131067": {
    "muniName": "台東区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28",
      "H27"
    ],
    "hasProjects": false
  },
  "131075": {
    "muniName": "墨田区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H25",
      "H24",
      "H23",
      "H22",
      "H21",
      "H20",
      "H19",
      "H18",
      "H17"
    ],
    "hasProjects": false
  },
  "131083": {
    "muniName": "江東区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28"
    ],
    "hasProjects": false
  },
  "131091": {
    "muniName": "品川区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4"
    ],
    "hasProjects": false
  },
  "131105": {
    "muniName": "目黒区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "131113": {
    "muniName": "大田区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H25",
      "H24",
      "H23",
      "H22",
      "H21",
      "H20"
    ],
    "hasProjects": false
  },
  "131121": {
    "muniName": "世田谷区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "R1",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H25",
      "H24",
      "H23",
      "H22",
      "H21"
    ],
    "hasProjects": false
  },
  "131130": {
    "muniName": "渋谷区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5"
    ],
    "hasProjects": false
  },
  "131148": {
    "muniName": "中野区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "131156": {
    "muniName": "杉並区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "131164": {
    "muniName": "豊島区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29"
    ],
    "hasProjects": false
  },
  "131172": {
    "muniName": "北区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H24"
    ],
    "hasProjects": true
  },
  "131181": {
    "muniName": "荒川区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "131199": {
    "muniName": "板橋区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5"
    ],
    "hasProjects": false
  },
  "131202": {
    "muniName": "練馬区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "R1",
      "H30",
      "H29",
      "H28",
      "H27",
      "H26",
      "H25",
      "H24",
      "H23"
    ],
    "hasProjects": false
  },
  "131211": {
    "muniName": "足立区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "131229": {
    "muniName": "葛飾区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28"
    ],
    "hasProjects": false
  },
  "131237": {
    "muniName": "江戸川区",
    "prefName": "東京都",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2",
      "H31",
      "H30",
      "H29",
      "H28",
      "H27"
    ],
    "hasProjects": false
  },
  "140007": {
    "muniName": "神奈川県",
    "prefName": "神奈川県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "141003": {
    "muniName": "横浜市",
    "prefName": "神奈川県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3"
    ],
    "hasProjects": false
  },
  "141305": {
    "muniName": "川崎市",
    "prefName": "神奈川県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "141500": {
    "muniName": "相模原市",
    "prefName": "神奈川県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": true
  },
  "150002": {
    "muniName": "新潟県",
    "prefName": "新潟県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "151009": {
    "muniName": "新潟市",
    "prefName": "新潟県",
    "isPref": false,
    "fys": [
      "R8",
      "R7"
    ],
    "hasProjects": false
  },
  "160008": {
    "muniName": "富山県",
    "prefName": "富山県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "170003": {
    "muniName": "石川県",
    "prefName": "石川県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "180009": {
    "muniName": "福井県",
    "prefName": "福井県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "190004": {
    "muniName": "山梨県",
    "prefName": "山梨県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": true
  },
  "192023": {
    "muniName": "富士吉田市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": true
  },
  "192040": {
    "muniName": "都留市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "192066": {
    "muniName": "大月市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "192082": {
    "muniName": "南アルプス市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "192091": {
    "muniName": "北杜市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "192112": {
    "muniName": "笛吹市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": true
  },
  "192139": {
    "muniName": "甲州市",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "194301": {
    "muniName": "富士河口湖町",
    "prefName": "山梨県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "200000": {
    "muniName": "長野県",
    "prefName": "長野県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "210005": {
    "muniName": "岐阜県",
    "prefName": "岐阜県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "220001": {
    "muniName": "静岡県",
    "prefName": "静岡県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "221007": {
    "muniName": "静岡市",
    "prefName": "静岡県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6"
    ],
    "hasProjects": false
  },
  "221309": {
    "muniName": "浜松市",
    "prefName": "静岡県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4"
    ],
    "hasProjects": true
  },
  "222038": {
    "muniName": "沼津市",
    "prefName": "静岡県",
    "isPref": false,
    "fys": [
      "R7"
    ],
    "hasProjects": false
  },
  "230006": {
    "muniName": "愛知県",
    "prefName": "愛知県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "231002": {
    "muniName": "名古屋市",
    "prefName": "愛知県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "232076": {
    "muniName": "豊川市",
    "prefName": "愛知県",
    "isPref": false,
    "fys": [
      "R7"
    ],
    "hasProjects": true
  },
  "240001": {
    "muniName": "三重県",
    "prefName": "三重県",
    "isPref": true,
    "fys": [
      "R8",
      "R7"
    ],
    "hasProjects": false
  },
  "250007": {
    "muniName": "滋賀県",
    "prefName": "滋賀県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "260002": {
    "muniName": "京都府",
    "prefName": "京都府",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "261009": {
    "muniName": "京都市",
    "prefName": "京都府",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "270008": {
    "muniName": "大阪府",
    "prefName": "大阪府",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "271004": {
    "muniName": "大阪市",
    "prefName": "大阪府",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "271403": {
    "muniName": "堺市",
    "prefName": "大阪府",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "272191": {
    "muniName": "和泉市",
    "prefName": "大阪府",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": true
  },
  "281000": {
    "muniName": "神戸市",
    "prefName": "兵庫県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6"
    ],
    "hasProjects": false
  },
  "290009": {
    "muniName": "奈良県",
    "prefName": "奈良県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "300004": {
    "muniName": "和歌山県",
    "prefName": "和歌山県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "310000": {
    "muniName": "鳥取県",
    "prefName": "鳥取県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "320005": {
    "muniName": "島根県",
    "prefName": "島根県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "330001": {
    "muniName": "岡山県",
    "prefName": "岡山県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "331007": {
    "muniName": "岡山市",
    "prefName": "岡山県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "340006": {
    "muniName": "広島県",
    "prefName": "広島県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "341002": {
    "muniName": "広島市",
    "prefName": "広島県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "350001": {
    "muniName": "山口県",
    "prefName": "山口県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "352039": {
    "muniName": "山口市",
    "prefName": "山口県",
    "isPref": false,
    "fys": [
      "R7"
    ],
    "hasProjects": true
  },
  "360007": {
    "muniName": "徳島県",
    "prefName": "徳島県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "370002": {
    "muniName": "香川県",
    "prefName": "香川県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "380008": {
    "muniName": "愛媛県",
    "prefName": "愛媛県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "390003": {
    "muniName": "高知県",
    "prefName": "高知県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "400009": {
    "muniName": "福岡県",
    "prefName": "福岡県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "401005": {
    "muniName": "北九州市",
    "prefName": "福岡県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": true
  },
  "401307": {
    "muniName": "福岡市",
    "prefName": "福岡県",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "410004": {
    "muniName": "佐賀県",
    "prefName": "佐賀県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "420000": {
    "muniName": "長崎県",
    "prefName": "長崎県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "430005": {
    "muniName": "熊本県",
    "prefName": "熊本県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "431001": {
    "muniName": "熊本市",
    "prefName": "熊本県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "440001": {
    "muniName": "大分県",
    "prefName": "大分県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "450006": {
    "muniName": "宮崎県",
    "prefName": "宮崎県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "460001": {
    "muniName": "鹿児島県",
    "prefName": "鹿児島県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "011002": {
    "muniName": "札幌市",
    "prefName": "北海道",
    "isPref": false,
    "fys": [
      "R8",
      "R7",
      "R6",
      "R5",
      "R4",
      "R3",
      "R2"
    ],
    "hasProjects": false
  },
  "041009": {
    "muniName": "仙台市",
    "prefName": "宮城県",
    "isPref": false,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "010006": {
    "muniName": "北海道",
    "prefName": "北海道",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "040002": {
    "muniName": "宮城県",
    "prefName": "宮城県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "080004": {
    "muniName": "茨城県",
    "prefName": "茨城県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "090000": {
    "muniName": "栃木県",
    "prefName": "栃木県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "070009": {
    "muniName": "福島県",
    "prefName": "福島県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "020001": {
    "muniName": "青森県",
    "prefName": "青森県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "030007": {
    "muniName": "岩手県",
    "prefName": "岩手県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  },
  "050008": {
    "muniName": "秋田県",
    "prefName": "秋田県",
    "isPref": true,
    "fys": [
      "R8"
    ],
    "hasProjects": false
  }
};

/** budget 階層（予算ベースの款別ダッシュボードを持つ）自治体の団体コード */
export const BUDGET_MUNIS: string[] = ["100005","110001","111007","120006","121002","130001","131016","131024","131032","131041","131059","131067","131075","131083","131091","131105","131113","131121","131130","131148","131156","131164","131172","131181","131199","131202","131211","131229","131237","140007","141003","141305","141500","150002","151009","160008","170003","180009","190004","192023","192040","192066","192082","192091","192112","192139","194301","200000","210005","220001","221007","221309","222038","230006","231002","232076","240001","250007","260002","261009","270008","271004","271403","272191","281000","290009","300004","310000","320005","330001","331007","340006","341002","350001","352039","360007","370002","380008","390003","400009","401005","401307","410004","420000","430005","431001","440001","450006","460001","011002","041009","010006","040002","080004","090000","070009","020001","030007","050008"];
