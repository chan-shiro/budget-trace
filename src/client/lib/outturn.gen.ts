// このファイルは自動生成です。手で編集しないこと。
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
export const KOFU_OUTTURN_YEARS: KofuOutturnYear[] = [
  {
    "fy": "R6",
    "fyLabel": "令和6年度",
    "initialNote": "",
    "sourceTitle": "令和6年度 一般会計歳入歳出状況（甲府市統計書 令和7年版）",
    "sourceUrl": "https://web.archive.org/web/20260712153519/https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-r6/r7-15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 291.27765,
        "finalOku": 294.67765,
        "settledOku": 295.7444079,
        "execPct": 100.4,
        "ref": "r7-15-01.xls#15-01!70"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 133.1154,
        "finalOku": 136.5154,
        "settledOku": 137.83240178,
        "execPct": 101,
        "ref": "r7-15-01.xls#15-01!71"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 117.72471,
        "finalOku": 117.72471,
        "settledOku": 117.50448902,
        "execPct": 99.8,
        "ref": "r7-15-01.xls#15-01!72"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 6.52834,
        "finalOku": 6.52834,
        "settledOku": 6.55416281,
        "execPct": 100.4,
        "ref": "r7-15-01.xls#15-01!73"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 13.83859,
        "finalOku": 13.83859,
        "settledOku": 13.68371398,
        "execPct": 98.9,
        "ref": "r7-15-01.xls#15-01!74"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.4,
        "finalOku": 0.4,
        "settledOku": 0.4693905,
        "execPct": 117.3,
        "ref": "r7-15-01.xls#15-01!75"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.67061,
        "finalOku": 19.67061,
        "settledOku": 19.70024981,
        "execPct": 100.2,
        "ref": "r7-15-01.xls#15-01!76"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.25749,
        "finalOku": 4.25749,
        "settledOku": 4.24559,
        "execPct": 99.7,
        "ref": "r7-15-01.xls#15-01!77"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 0.93524,
        "finalOku": 0.93524,
        "settledOku": 0.95253,
        "execPct": 101.8,
        "ref": "r7-15-01.xls#15-01!78"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 2.93939,
        "finalOku": 2.93939,
        "settledOku": 2.91499,
        "execPct": 99.2,
        "ref": "r7-15-01.xls#15-01!79"
      },
      {
        "kan": "地方譲与税",
        "kou": "森林環境譲与税",
        "initialOku": 0.38286,
        "finalOku": 0.38286,
        "settledOku": 0.37807,
        "execPct": 98.7,
        "ref": "r7-15-01.xls#15-01!80"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.07744,
        "finalOku": 0.07744,
        "settledOku": 0.1262,
        "execPct": 163,
        "ref": "r7-15-01.xls#15-01!81"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.07744,
        "finalOku": 0.07744,
        "settledOku": 0.1262,
        "execPct": 163,
        "ref": "r7-15-01.xls#15-01!82"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 1.436,
        "finalOku": 1.436,
        "settledOku": 2.27945,
        "execPct": 158.7,
        "ref": "r7-15-01.xls#15-01!83"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 1.436,
        "finalOku": 1.436,
        "settledOku": 2.27945,
        "execPct": 158.7,
        "ref": "r7-15-01.xls#15-01!84"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 1.29809,
        "finalOku": 1.29809,
        "settledOku": 3.1608,
        "execPct": 243.5,
        "ref": "r7-15-01.xls#15-01!85"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 1.29809,
        "finalOku": 1.29809,
        "settledOku": 3.1608,
        "execPct": 243.5,
        "ref": "r7-15-01.xls#15-01!86"
      },
      {
        "kan": "法人事業税交付金",
        "kou": null,
        "initialOku": 6.0046,
        "finalOku": 6.03484,
        "settledOku": 6.10069,
        "execPct": 101.1,
        "ref": "r7-15-01.xls#15-01!87"
      },
      {
        "kan": "法人事業税交付金",
        "kou": "法人事業税交付金",
        "initialOku": 6.0046,
        "finalOku": 6.03484,
        "settledOku": 6.10069,
        "execPct": 101.1,
        "ref": "r7-15-01.xls#15-01!88"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 50.78626,
        "finalOku": 51.00252,
        "settledOku": 53.74494,
        "execPct": 105.4,
        "ref": "r7-15-01.xls#15-01!89"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 50.78626,
        "finalOku": 51.00252,
        "settledOku": 53.74494,
        "execPct": 105.4,
        "ref": "r7-15-01.xls#15-01!90"
      },
      {
        "kan": "環境性能割交付金",
        "kou": null,
        "initialOku": 0.72049,
        "finalOku": 0.72049,
        "settledOku": 0.62253,
        "execPct": 86.4,
        "ref": "r7-15-01.xls#15-01!91"
      },
      {
        "kan": "環境性能割交付金",
        "kou": "環境性能割交付金",
        "initialOku": 0.72049,
        "finalOku": 0.72049,
        "settledOku": 0.62253,
        "execPct": 86.4,
        "ref": "r7-15-01.xls#15-01!92"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 9.61976,
        "finalOku": 9.61976,
        "settledOku": 9.64318,
        "execPct": 100.2,
        "ref": "r7-15-01.xls#15-01!93"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 9.54304,
        "finalOku": 9.54304,
        "settledOku": 9.5602,
        "execPct": 100.2,
        "ref": "r7-15-01.xls#15-01!94"
      },
      {
        "kan": "地方特例交付金",
        "kou": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
        "initialOku": 0.07672,
        "finalOku": 0.07672,
        "settledOku": 0.08298,
        "execPct": 108.2,
        "ref": "r7-15-01.xls#15-01!95"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 113.55951,
        "finalOku": 122.44181,
        "settledOku": 123.06519,
        "execPct": 100.5,
        "ref": "r7-15-01.xls#15-01!96"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 113.55951,
        "finalOku": 122.44181,
        "settledOku": 123.06519,
        "execPct": 100.5,
        "ref": "r7-15-01.xls#15-01!97"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.34055,
        "finalOku": 0.34055,
        "settledOku": 0.2491,
        "execPct": 73.1,
        "ref": "r7-15-01.xls#15-01!98"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.34055,
        "finalOku": 0.34055,
        "settledOku": 0.2491,
        "execPct": 73.1,
        "ref": "r7-15-01.xls#15-01!99"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 3.38924,
        "finalOku": 3.38924,
        "settledOku": 2.41071681,
        "execPct": 71.1,
        "ref": "r7-15-01.xls#15-01!100"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 3.38924,
        "finalOku": 3.38924,
        "settledOku": 2.41071681,
        "execPct": 71.1,
        "ref": "r7-15-01.xls#15-01!101"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.41344,
        "finalOku": 9.41344,
        "settledOku": 8.87998689,
        "execPct": 94.3,
        "ref": "r7-15-01.xls#15-01!102"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 7.97391,
        "finalOku": 7.97391,
        "settledOku": 7.47574749,
        "execPct": 93.8,
        "ref": "r7-15-01.xls#15-01!103"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.43953,
        "finalOku": 1.43953,
        "settledOku": 1.4042394,
        "execPct": 97.5,
        "ref": "r7-15-01.xls#15-01!104"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 143.33127,
        "finalOku": 201.8240194,
        "settledOku": 179.51015304,
        "execPct": 88.9,
        "ref": "r7-15-01.xls#15-01!105"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 118.74988,
        "finalOku": 131.75336,
        "settledOku": 130.58423167,
        "execPct": 99.1,
        "ref": "r7-15-01.xls#15-01!106"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 24.13937,
        "finalOku": 69.6214694,
        "settledOku": 48.48323426,
        "execPct": 69.6,
        "ref": "r7-15-01.xls#15-01!107"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.44202,
        "finalOku": 0.44919,
        "settledOku": 0.44268711,
        "execPct": 98.6,
        "ref": "r7-15-01.xls#15-01!108"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 65.00382,
        "finalOku": 71.97308622,
        "settledOku": 67.52196976,
        "execPct": 93.8,
        "ref": "r7-15-01.xls#15-01!109"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 44.68263,
        "finalOku": 47.47337,
        "settledOku": 46.99702374,
        "execPct": 99,
        "ref": "r7-15-01.xls#15-01!110"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 16.70655,
        "finalOku": 20.16320622,
        "settledOku": 16.28064255,
        "execPct": 80.7,
        "ref": "r7-15-01.xls#15-01!111"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 3.61464,
        "finalOku": 4.33651,
        "settledOku": 4.24430347,
        "execPct": 97.9,
        "ref": "r7-15-01.xls#15-01!112"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 1.08275,
        "finalOku": 1.08275,
        "settledOku": 2.181227,
        "execPct": 201.5,
        "ref": "r7-15-01.xls#15-01!113"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.66911,
        "finalOku": 0.66911,
        "settledOku": 0.67633199,
        "execPct": 101.1,
        "ref": "r7-15-01.xls#15-01!114"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 0.41364,
        "finalOku": 0.41364,
        "settledOku": 1.50489501,
        "execPct": 363.8,
        "ref": "r7-15-01.xls#15-01!115"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 30,
        "finalOku": 80.13814,
        "settledOku": 74.33417566,
        "execPct": 92.8,
        "ref": "r7-15-01.xls#15-01!116"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 30,
        "finalOku": 80.13814,
        "settledOku": 74.33417566,
        "execPct": 92.8,
        "ref": "r7-15-01.xls#15-01!117"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 23.71929,
        "finalOku": 26.66411,
        "settledOku": 22.96506454,
        "execPct": 86.1,
        "ref": "r7-15-01.xls#15-01!118"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 23.6249,
        "finalOku": 26.56972,
        "settledOku": 22.8706831,
        "execPct": 86.1,
        "ref": "r7-15-01.xls#15-01!119"
      },
      {
        "kan": "繰入金",
        "kou": "特別会計繰入金",
        "initialOku": 0.09439,
        "finalOku": 0.09439,
        "settledOku": 0.09438144,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!120"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 12.83910206,
        "settledOku": 12.8391057,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!121"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 12.83910206,
        "settledOku": 12.8391057,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!122"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 20.38399,
        "finalOku": 22.91653,
        "settledOku": 19.73178076,
        "execPct": 86.1,
        "ref": "r7-15-01.xls#15-01!123"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.27797,
        "finalOku": 0.27797,
        "settledOku": 0.19506549,
        "execPct": 70.2,
        "ref": "r7-15-01.xls#15-01!124"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.00129,
        "finalOku": 0.00129,
        "settledOku": 0.03995338,
        "execPct": 3097.2,
        "ref": "r7-15-01.xls#15-01!125"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 5.78381,
        "finalOku": 5.78381,
        "settledOku": 3.7224469,
        "execPct": 64.4,
        "ref": "r7-15-01.xls#15-01!126"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.01962,
        "finalOku": 0.01962,
        "settledOku": 0.01424,
        "execPct": 72.6,
        "ref": "r7-15-01.xls#15-01!127"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 14.3013,
        "finalOku": 16.83384,
        "settledOku": 15.76007499,
        "execPct": 93.6,
        "ref": "r7-15-01.xls#15-01!128"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 32.238,
        "finalOku": 44.353,
        "settledOku": 27.0924,
        "execPct": 61.1,
        "ref": "r7-15-01.xls#15-01!129"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 32.238,
        "finalOku": 44.353,
        "settledOku": 27.0924,
        "execPct": 61.1,
        "ref": "r7-15-01.xls#15-01!130"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": 5.41205,
        "finalOku": 5.40455,
        "settledOku": 5.28550428,
        "execPct": 97.8,
        "ref": "r7-15-02.xls#15-02!64"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": 5.41205,
        "finalOku": 5.40455,
        "settledOku": 5.28550428,
        "execPct": 97.8,
        "ref": "r7-15-02.xls#15-02!65"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": 97.04066,
        "finalOku": 173.51151,
        "settledOku": 166.37213807,
        "execPct": 95.9,
        "ref": "r7-15-02.xls#15-02!66"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": 83.92196,
        "finalOku": 146.61008,
        "settledOku": 140.16692009,
        "execPct": 95.6,
        "ref": "r7-15-02.xls#15-02!67"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": 7.79928,
        "finalOku": 20.76222,
        "settledOku": 20.3714132,
        "execPct": 98.1,
        "ref": "r7-15-02.xls#15-02!68"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": 3.76372,
        "finalOku": 3.83601,
        "settledOku": 3.67388906,
        "execPct": 95.8,
        "ref": "r7-15-02.xls#15-02!69"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": 0.49129,
        "finalOku": 1.22522,
        "settledOku": 1.13572971,
        "execPct": 92.7,
        "ref": "r7-15-02.xls#15-02!70"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": 0.37462,
        "finalOku": 0.38468,
        "settledOku": 0.35136019,
        "execPct": 91.3,
        "ref": "r7-15-02.xls#15-02!71"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": 0.68979,
        "finalOku": 0.6933,
        "settledOku": 0.67282582,
        "execPct": 97,
        "ref": "r7-15-02.xls#15-02!72"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": 342.35607,
        "finalOku": 387.13142151,
        "settledOku": 367.6782447,
        "execPct": 95,
        "ref": "r7-15-02.xls#15-02!73"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": 173.31737,
        "finalOku": 180.39568,
        "settledOku": 174.32875656,
        "execPct": 96.6,
        "ref": "r7-15-02.xls#15-02!74"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": 117.17011,
        "finalOku": 137.8282,
        "settledOku": 136.43531066,
        "execPct": 99,
        "ref": "r7-15-02.xls#15-02!75"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": 51.8673,
        "finalOku": 51.98201,
        "settledOku": 51.54712274,
        "execPct": 99.2,
        "ref": "r7-15-02.xls#15-02!76"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": 0.00129,
        "finalOku": 0.00129,
        "settledOku": 0.0002079,
        "execPct": 16.1,
        "ref": "r7-15-02.xls#15-02!77"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯生活支援特別給付金給付費",
        "initialOku": 0,
        "finalOku": 0.01,
        "settledOku": 0.007,
        "execPct": 70,
        "ref": "r7-15-02.xls#15-02!78"
      },
      {
        "kan": "民生費",
        "kou": "特定世帯等臨時特別給付金給付費",
        "initialOku": 0,
        "finalOku": 16.91424151,
        "settledOku": 5.35984684,
        "execPct": 31.7,
        "ref": "r7-15-02.xls#15-02!79"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": 96.56308,
        "finalOku": 100.16624,
        "settledOku": 96.51818316,
        "execPct": 96.4,
        "ref": "r7-15-02.xls#15-02!80"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": 41.9441,
        "finalOku": 45.90966,
        "settledOku": 43.14171126,
        "execPct": 94,
        "ref": "r7-15-02.xls#15-02!81"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": 24.47015,
        "finalOku": 23.98793,
        "settledOku": 23.43910198,
        "execPct": 97.7,
        "ref": "r7-15-02.xls#15-02!82"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": 30.005,
        "finalOku": 30.005,
        "settledOku": 29.69426735,
        "execPct": 99,
        "ref": "r7-15-02.xls#15-02!83"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": 0.14383,
        "finalOku": 0.26365,
        "settledOku": 0.24310257,
        "execPct": 92.2,
        "ref": "r7-15-02.xls#15-02!84"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": 1.88232,
        "finalOku": 1.89687,
        "settledOku": 1.83636198,
        "execPct": 96.8,
        "ref": "r7-15-02.xls#15-02!85"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": 1.88232,
        "finalOku": 1.89687,
        "settledOku": 1.83636198,
        "execPct": 96.8,
        "ref": "r7-15-02.xls#15-02!86"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": 11.03256,
        "finalOku": 11.34022202,
        "settledOku": 9.31739876,
        "execPct": 82.2,
        "ref": "r7-15-02.xls#15-02!87"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": 6.85325,
        "finalOku": 7.21119202,
        "settledOku": 5.72625966,
        "execPct": 79.4,
        "ref": "r7-15-02.xls#15-02!88"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": 3.22146,
        "finalOku": 3.17118,
        "settledOku": 2.710676,
        "execPct": 85.5,
        "ref": "r7-15-02.xls#15-02!89"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": 0.95785,
        "finalOku": 0.95785,
        "settledOku": 0.8804631,
        "execPct": 91.9,
        "ref": "r7-15-02.xls#15-02!90"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": 13.73947,
        "finalOku": 26.43588,
        "settledOku": 16.28835966,
        "execPct": 61.6,
        "ref": "r7-15-02.xls#15-02!91"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": 13.73947,
        "finalOku": 26.43588,
        "settledOku": 16.28835966,
        "execPct": 61.6,
        "ref": "r7-15-02.xls#15-02!92"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": 58.65137,
        "finalOku": 68.23134415,
        "settledOku": 56.39760435,
        "execPct": 82.7,
        "ref": "r7-15-02.xls#15-02!93"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": 18.38117,
        "finalOku": 22.36352593,
        "settledOku": 18.30685207,
        "execPct": 81.9,
        "ref": "r7-15-02.xls#15-02!94"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": 2.94053,
        "finalOku": 3.3877,
        "settledOku": 2.3171646,
        "execPct": 68.4,
        "ref": "r7-15-02.xls#15-02!95"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": 33.87934,
        "finalOku": 39.04585822,
        "settledOku": 32.59436837,
        "execPct": 83.5,
        "ref": "r7-15-02.xls#15-02!96"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": 3.45033,
        "finalOku": 3.43426,
        "settledOku": 3.17921931,
        "execPct": 92.6,
        "ref": "r7-15-02.xls#15-02!97"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": 23.51926,
        "finalOku": 24.40868,
        "settledOku": 23.11545699,
        "execPct": 94.7,
        "ref": "r7-15-02.xls#15-02!98"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": 23.51926,
        "finalOku": 24.40868,
        "settledOku": 23.11545699,
        "execPct": 94.7,
        "ref": "r7-15-02.xls#15-02!99"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": 69.92413,
        "finalOku": 80.76877,
        "settledOku": 70.58634059,
        "execPct": 87.4,
        "ref": "r7-15-02.xls#15-02!100"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": 4.26875,
        "finalOku": 4.54215,
        "settledOku": 4.28614107,
        "execPct": 94.4,
        "ref": "r7-15-02.xls#15-02!101"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": 27.84344,
        "finalOku": 35.12787,
        "settledOku": 29.835262,
        "execPct": 84.9,
        "ref": "r7-15-02.xls#15-02!102"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": 12.37052,
        "finalOku": 15.29189,
        "settledOku": 12.76581419,
        "execPct": 83.5,
        "ref": "r7-15-02.xls#15-02!103"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": 8.76911,
        "finalOku": 8.7807,
        "settledOku": 8.34994504,
        "execPct": 95.1,
        "ref": "r7-15-02.xls#15-02!104"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": 1.6333,
        "finalOku": 1.66197,
        "settledOku": 1.61554905,
        "execPct": 97.2,
        "ref": "r7-15-02.xls#15-02!105"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": 11.79008,
        "finalOku": 12.00981,
        "settledOku": 10.56198769,
        "execPct": 87.9,
        "ref": "r7-15-02.xls#15-02!106"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": 2.58858,
        "finalOku": 2.63402,
        "settledOku": 2.5114052,
        "execPct": 95.3,
        "ref": "r7-15-02.xls#15-02!107"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": 0.66035,
        "finalOku": 0.72036,
        "settledOku": 0.66023635,
        "execPct": 91.7,
        "ref": "r7-15-02.xls#15-02!108"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": 0.00004,
        "finalOku": 0.00004,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!109"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!110"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!111"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!112"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": 87.47687,
        "finalOku": 86.90687,
        "settledOku": 86.8629442,
        "execPct": 99.9,
        "ref": "r7-15-02.xls#15-02!113"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": 87.47687,
        "finalOku": 86.90687,
        "settledOku": 86.8629442,
        "execPct": 99.9,
        "ref": "r7-15-02.xls#15-02!114"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": 0.14177,
        "finalOku": 0.14177,
        "settledOku": 0.13454832,
        "execPct": 94.9,
        "ref": "r7-15-02.xls#15-02!115"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!116"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": 0.14175,
        "finalOku": 0.14175,
        "settledOku": 0.13454832,
        "execPct": 94.9,
        "ref": "r7-15-02.xls#15-02!117"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": 0.2,
        "finalOku": 0.15589,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!118"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": 0.2,
        "finalOku": 0.15589,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!119"
      }
    ],
    "totals": {
      "initialOku": 807.93965,
      "finalOku": 966.50005768,
      "settledOku": 900.39308506
    }
  },
  {
    "fy": "R5",
    "fyLabel": "令和5年度",
    "initialNote": "",
    "sourceTitle": "令和5年度 一般会計歳入歳出状況（甲府市統計書 令和7年版）",
    "sourceUrl": "https://web.archive.org/web/20260712153519/https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-r5/r7-15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 291.8569,
        "finalOku": 294.2569,
        "settledOku": 299.51917459,
        "execPct": 101.8,
        "ref": "r7-15-01.xls#15-01!5"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 134.41865,
        "finalOku": 136.81865,
        "settledOku": 140.74363055,
        "execPct": 102.9,
        "ref": "r7-15-01.xls#15-01!6"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 117.6488,
        "finalOku": 117.6488,
        "settledOku": 118.15117777,
        "execPct": 100.4,
        "ref": "r7-15-01.xls#15-01!7"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 6.41566,
        "finalOku": 6.41566,
        "settledOku": 6.40251534,
        "execPct": 99.8,
        "ref": "r7-15-01.xls#15-01!8"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 13.12718,
        "finalOku": 13.12718,
        "settledOku": 13.85156933,
        "execPct": 105.5,
        "ref": "r7-15-01.xls#15-01!9"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.3,
        "finalOku": 0.3,
        "settledOku": 0.4407615,
        "execPct": 146.9,
        "ref": "r7-15-01.xls#15-01!10"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.94661,
        "finalOku": 19.94661,
        "settledOku": 19.9295201,
        "execPct": 99.9,
        "ref": "r7-15-01.xls#15-01!11"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.26027,
        "finalOku": 4.26027,
        "settledOku": 4.19993,
        "execPct": 98.6,
        "ref": "r7-15-01.xls#15-01!12"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 0.98792,
        "finalOku": 0.98792,
        "settledOku": 0.96583,
        "execPct": 97.8,
        "ref": "r7-15-01.xls#15-01!13"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 2.93899,
        "finalOku": 2.93899,
        "settledOku": 2.91174,
        "execPct": 99.1,
        "ref": "r7-15-01.xls#15-01!14"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方道路譲与税",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-01.xls#15-01!15"
      },
      {
        "kan": "地方譲与税",
        "kou": "森林環境譲与税",
        "initialOku": 0.33335,
        "finalOku": 0.33335,
        "settledOku": 0.32236,
        "execPct": 96.7,
        "ref": "r7-15-01.xls#15-01!16"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.07981,
        "finalOku": 0.07981,
        "settledOku": 0.09129,
        "execPct": 114.4,
        "ref": "r7-15-01.xls#15-01!17"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.07981,
        "finalOku": 0.07981,
        "settledOku": 0.09129,
        "execPct": 114.4,
        "ref": "r7-15-01.xls#15-01!18"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 1.69013,
        "finalOku": 1.69013,
        "settledOku": 1.60402,
        "execPct": 94.9,
        "ref": "r7-15-01.xls#15-01!19"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 1.69013,
        "finalOku": 1.69013,
        "settledOku": 1.60402,
        "execPct": 94.9,
        "ref": "r7-15-01.xls#15-01!20"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 0.87709,
        "finalOku": 0.87709,
        "settledOku": 1.84817,
        "execPct": 210.7,
        "ref": "r7-15-01.xls#15-01!21"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 0.87709,
        "finalOku": 0.87709,
        "settledOku": 1.84817,
        "execPct": 210.7,
        "ref": "r7-15-01.xls#15-01!22"
      },
      {
        "kan": "法人事業税交付金",
        "kou": null,
        "initialOku": 5.68564,
        "finalOku": 5.79815,
        "settledOku": 6.02695,
        "execPct": 103.9,
        "ref": "r7-15-01.xls#15-01!23"
      },
      {
        "kan": "法人事業税交付金",
        "kou": "法人事業税交付金",
        "initialOku": 5.68564,
        "finalOku": 5.79815,
        "settledOku": 6.02695,
        "execPct": 103.9,
        "ref": "r7-15-01.xls#15-01!24"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 51.85752,
        "finalOku": 51.85752,
        "settledOku": 51.3161,
        "execPct": 99,
        "ref": "r7-15-01.xls#15-01!25"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 51.85752,
        "finalOku": 51.85752,
        "settledOku": 51.3161,
        "execPct": 99,
        "ref": "r7-15-01.xls#15-01!26"
      },
      {
        "kan": "環境性能割交付金",
        "kou": null,
        "initialOku": 0.32902,
        "finalOku": 0.32902,
        "settledOku": 0.50322,
        "execPct": 152.9,
        "ref": "r7-15-01.xls#15-01!27"
      },
      {
        "kan": "環境性能割交付金",
        "kou": "環境性能割交付金",
        "initialOku": 0.32902,
        "finalOku": 0.32902,
        "settledOku": 0.50322,
        "execPct": 152.9,
        "ref": "r7-15-01.xls#15-01!28"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 1.64445,
        "finalOku": 1.64445,
        "settledOku": 1.7701,
        "execPct": 107.6,
        "ref": "r7-15-01.xls#15-01!29"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 1.5909,
        "finalOku": 1.5909,
        "settledOku": 1.6596,
        "execPct": 104.3,
        "ref": "r7-15-01.xls#15-01!30"
      },
      {
        "kan": "地方特例交付金",
        "kou": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
        "initialOku": 0.05355,
        "finalOku": 0.05355,
        "settledOku": 0.1105,
        "execPct": 206.3,
        "ref": "r7-15-01.xls#15-01!31"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 108.55444,
        "finalOku": 114.34513,
        "settledOku": 114.39251,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!32"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 108.55444,
        "finalOku": 114.34513,
        "settledOku": 114.39251,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!33"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.3897,
        "finalOku": 0.3897,
        "settledOku": 0.26367,
        "execPct": 67.7,
        "ref": "r7-15-01.xls#15-01!34"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.3897,
        "finalOku": 0.3897,
        "settledOku": 0.26367,
        "execPct": 67.7,
        "ref": "r7-15-01.xls#15-01!35"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 2.96923,
        "finalOku": 2.96923,
        "settledOku": 2.6639624,
        "execPct": 89.7,
        "ref": "r7-15-01.xls#15-01!36"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 2.96923,
        "finalOku": 2.96923,
        "settledOku": 2.6639624,
        "execPct": 89.7,
        "ref": "r7-15-01.xls#15-01!37"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.29798,
        "finalOku": 9.29798,
        "settledOku": 9.10103548,
        "execPct": 97.9,
        "ref": "r7-15-01.xls#15-01!38"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 7.85646,
        "finalOku": 7.85646,
        "settledOku": 7.61851811,
        "execPct": 97,
        "ref": "r7-15-01.xls#15-01!39"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.44152,
        "finalOku": 1.44152,
        "settledOku": 1.48251737,
        "execPct": 102.8,
        "ref": "r7-15-01.xls#15-01!40"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 149.91433,
        "finalOku": 212.3437092,
        "settledOku": 195.26914359,
        "execPct": 92,
        "ref": "r7-15-01.xls#15-01!41"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 124.66322,
        "finalOku": 125.5592,
        "settledOku": 125.53927086,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!42"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 24.82202,
        "finalOku": 86.3525192,
        "settledOku": 69.27162377,
        "execPct": 80.2,
        "ref": "r7-15-01.xls#15-01!43"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.42909,
        "finalOku": 0.43199,
        "settledOku": 0.45824896,
        "execPct": 106.1,
        "ref": "r7-15-01.xls#15-01!44"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 65.91516,
        "finalOku": 72.24791757,
        "settledOku": 67.66012902,
        "execPct": 93.6,
        "ref": "r7-15-01.xls#15-01!45"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 43.5058,
        "finalOku": 44.54132,
        "settledOku": 44.11591725,
        "execPct": 99,
        "ref": "r7-15-01.xls#15-01!46"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 18.35219,
        "finalOku": 24.08195757,
        "settledOku": 19.97638404,
        "execPct": 83,
        "ref": "r7-15-01.xls#15-01!47"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 4.05717,
        "finalOku": 3.62464,
        "settledOku": 3.56782773,
        "execPct": 98.4,
        "ref": "r7-15-01.xls#15-01!48"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 0.89702,
        "finalOku": 0.89702,
        "settledOku": 0.89506372,
        "execPct": 99.8,
        "ref": "r7-15-01.xls#15-01!49"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.59721,
        "finalOku": 0.59721,
        "settledOku": 0.5816198,
        "execPct": 97.4,
        "ref": "r7-15-01.xls#15-01!50"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 0.29981,
        "finalOku": 0.29981,
        "settledOku": 0.31344392,
        "execPct": 104.5,
        "ref": "r7-15-01.xls#15-01!51"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 22,
        "finalOku": 45.33769,
        "settledOku": 41.59946579,
        "execPct": 91.8,
        "ref": "r7-15-01.xls#15-01!52"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 22,
        "finalOku": 45.33769,
        "settledOku": 41.59946579,
        "execPct": 91.8,
        "ref": "r7-15-01.xls#15-01!53"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 17.84064,
        "finalOku": 22.05691,
        "settledOku": 13.98655632,
        "execPct": 63.4,
        "ref": "r7-15-01.xls#15-01!54"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 17.7713,
        "finalOku": 21.98757,
        "settledOku": 13.91721067,
        "execPct": 63.3,
        "ref": "r7-15-01.xls#15-01!55"
      },
      {
        "kan": "繰入金",
        "kou": "特別会計繰入金",
        "initialOku": 0.06934,
        "finalOku": 0.06934,
        "settledOku": 0.06934565,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!56"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 10.87255184,
        "settledOku": 10.87255035,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!57"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 10.87255184,
        "settledOku": 10.87255035,
        "execPct": 100,
        "ref": "r7-15-01.xls#15-01!58"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 18.21329,
        "finalOku": 19.12331,
        "settledOku": 18.09953905,
        "execPct": 94.6,
        "ref": "r7-15-01.xls#15-01!59"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.30583,
        "finalOku": 0.30583,
        "settledOku": 0.2310029,
        "execPct": 75.5,
        "ref": "r7-15-01.xls#15-01!60"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.00121,
        "finalOku": 0.00121,
        "settledOku": 0.00110966,
        "execPct": 91.7,
        "ref": "r7-15-01.xls#15-01!61"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 3.85807,
        "finalOku": 3.9973,
        "settledOku": 3.24228969,
        "execPct": 81.1,
        "ref": "r7-15-01.xls#15-01!62"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.01994,
        "finalOku": 0.01994,
        "settledOku": 0.01727,
        "execPct": 86.6,
        "ref": "r7-15-01.xls#15-01!63"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 14.02824,
        "finalOku": 14.79903,
        "settledOku": 14.6078668,
        "execPct": 98.7,
        "ref": "r7-15-01.xls#15-01!64"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 36.078,
        "finalOku": 43.965,
        "settledOku": 33.0258,
        "execPct": 75.1,
        "ref": "r7-15-01.xls#15-01!65"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 36.078,
        "finalOku": 43.965,
        "settledOku": 33.0258,
        "execPct": 75.1,
        "ref": "r7-15-01.xls#15-01!66"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": 5.41594,
        "finalOku": 5.3547,
        "settledOku": 5.23347508,
        "execPct": 97.7,
        "ref": "r7-15-02.xls#15-02!5"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": 5.41594,
        "finalOku": 5.3547,
        "settledOku": 5.23347508,
        "execPct": 97.7,
        "ref": "r7-15-02.xls#15-02!6"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": 85.73097,
        "finalOku": 118.75564,
        "settledOku": 112.48402045,
        "execPct": 94.7,
        "ref": "r7-15-02.xls#15-02!7"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": 71.42043,
        "finalOku": 104.21479,
        "settledOku": 98.77578056,
        "execPct": 94.8,
        "ref": "r7-15-02.xls#15-02!8"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": 7.56756,
        "finalOku": 7.90225,
        "settledOku": 7.73774981,
        "execPct": 97.9,
        "ref": "r7-15-02.xls#15-02!9"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": 3.85663,
        "finalOku": 4.07042,
        "settledOku": 3.54990439,
        "execPct": 87.2,
        "ref": "r7-15-02.xls#15-02!10"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": 1.84628,
        "finalOku": 1.46743,
        "settledOku": 1.38189205,
        "execPct": 94.2,
        "ref": "r7-15-02.xls#15-02!11"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": 0.34747,
        "finalOku": 0.34856,
        "settledOku": 0.31574267,
        "execPct": 90.6,
        "ref": "r7-15-02.xls#15-02!12"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": 0.6926,
        "finalOku": 0.75219,
        "settledOku": 0.72295097,
        "execPct": 96.1,
        "ref": "r7-15-02.xls#15-02!13"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": 342.65721,
        "finalOku": 399.07712,
        "settledOku": 381.10039667,
        "execPct": 95.5,
        "ref": "r7-15-02.xls#15-02!14"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": 168.32575,
        "finalOku": 176.56533,
        "settledOku": 168.86873969,
        "execPct": 95.6,
        "ref": "r7-15-02.xls#15-02!15"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": 119.78531,
        "finalOku": 128.89736,
        "settledOku": 124.35631579,
        "execPct": 96.5,
        "ref": "r7-15-02.xls#15-02!16"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": 54.54486,
        "finalOku": 54.34723,
        "settledOku": 51.37001415,
        "execPct": 94.5,
        "ref": "r7-15-02.xls#15-02!17"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": 0.00129,
        "finalOku": 0.00129,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!18"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯生活支援特別給付金給付費",
        "initialOku": 0,
        "finalOku": 5.14694,
        "settledOku": 4.62735679,
        "execPct": 89.9,
        "ref": "r7-15-02.xls#15-02!19"
      },
      {
        "kan": "民生費",
        "kou": "特定世帯等臨時特別給付金給付費",
        "initialOku": 0,
        "finalOku": 34.11897,
        "settledOku": 31.87797025,
        "execPct": 93.4,
        "ref": "r7-15-02.xls#15-02!20"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": 107.48371,
        "finalOku": 106.79562,
        "settledOku": 100.70105254,
        "execPct": 94.3,
        "ref": "r7-15-02.xls#15-02!21"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": 52.25644,
        "finalOku": 52.27346,
        "settledOku": 47.42066355,
        "execPct": 90.7,
        "ref": "r7-15-02.xls#15-02!22"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": 24.38849,
        "finalOku": 23.68338,
        "settledOku": 22.937263,
        "execPct": 96.8,
        "ref": "r7-15-02.xls#15-02!23"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": 30.72675,
        "finalOku": 30.72675,
        "settledOku": 30.25581573,
        "execPct": 98.5,
        "ref": "r7-15-02.xls#15-02!24"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": 0.11203,
        "finalOku": 0.11203,
        "settledOku": 0.08731026,
        "execPct": 77.9,
        "ref": "r7-15-02.xls#15-02!25"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": 1.94505,
        "finalOku": 1.90286,
        "settledOku": 1.87042721,
        "execPct": 98.3,
        "ref": "r7-15-02.xls#15-02!26"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": 1.94505,
        "finalOku": 1.90286,
        "settledOku": 1.87042721,
        "execPct": 98.3,
        "ref": "r7-15-02.xls#15-02!27"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": 10.27198,
        "finalOku": 10.70719,
        "settledOku": 9.54150687,
        "execPct": 89.1,
        "ref": "r7-15-02.xls#15-02!28"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": 6.80958,
        "finalOku": 7.14364,
        "settledOku": 6.23952442,
        "execPct": 87.3,
        "ref": "r7-15-02.xls#15-02!29"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": 2.50607,
        "finalOku": 2.60722,
        "settledOku": 2.42200979,
        "execPct": 92.9,
        "ref": "r7-15-02.xls#15-02!30"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": 0.95633,
        "finalOku": 0.95633,
        "settledOku": 0.87997266,
        "execPct": 92,
        "ref": "r7-15-02.xls#15-02!31"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": 8.90452,
        "finalOku": 22.2248,
        "settledOku": 13.04878732,
        "execPct": 58.7,
        "ref": "r7-15-02.xls#15-02!32"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": 8.90452,
        "finalOku": 22.2248,
        "settledOku": 13.04878732,
        "execPct": 58.7,
        "ref": "r7-15-02.xls#15-02!33"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": 49.70743,
        "finalOku": 65.71233861,
        "settledOku": 52.27550294,
        "execPct": 79.6,
        "ref": "r7-15-02.xls#15-02!34"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": 15.69533,
        "finalOku": 18.70669164,
        "settledOku": 13.17135685,
        "execPct": 70.4,
        "ref": "r7-15-02.xls#15-02!35"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": 1.70585,
        "finalOku": 1.75159,
        "settledOku": 1.18809008,
        "execPct": 67.8,
        "ref": "r7-15-02.xls#15-02!36"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": 29.32009,
        "finalOku": 42.21859697,
        "settledOku": 35.0794705,
        "execPct": 83.1,
        "ref": "r7-15-02.xls#15-02!37"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": 2.98616,
        "finalOku": 3.03546,
        "settledOku": 2.83658551,
        "execPct": 93.4,
        "ref": "r7-15-02.xls#15-02!38"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": 24.07683,
        "finalOku": 24.46059,
        "settledOku": 23.68034659,
        "execPct": 96.8,
        "ref": "r7-15-02.xls#15-02!39"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": 24.07683,
        "finalOku": 24.46059,
        "settledOku": 23.68034659,
        "execPct": 96.8,
        "ref": "r7-15-02.xls#15-02!40"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": 64.24261,
        "finalOku": 69.88254,
        "settledOku": 63.80602109,
        "execPct": 91.3,
        "ref": "r7-15-02.xls#15-02!41"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": 4.08992,
        "finalOku": 4.21167,
        "settledOku": 3.98862514,
        "execPct": 94.7,
        "ref": "r7-15-02.xls#15-02!42"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": 24.37295,
        "finalOku": 28.3234,
        "settledOku": 25.37801563,
        "execPct": 89.6,
        "ref": "r7-15-02.xls#15-02!43"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": 11.86985,
        "finalOku": 13.18038,
        "settledOku": 11.97750917,
        "execPct": 90.9,
        "ref": "r7-15-02.xls#15-02!44"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": 8.39714,
        "finalOku": 8.53998,
        "settledOku": 8.174585,
        "execPct": 95.7,
        "ref": "r7-15-02.xls#15-02!45"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": 1.99736,
        "finalOku": 2.01061,
        "settledOku": 1.94834058,
        "execPct": 96.9,
        "ref": "r7-15-02.xls#15-02!46"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": 10.27508,
        "finalOku": 10.26667,
        "settledOku": 9.37462061,
        "execPct": 91.3,
        "ref": "r7-15-02.xls#15-02!47"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": 2.32335,
        "finalOku": 2.40471,
        "settledOku": 2.34713718,
        "execPct": 97.6,
        "ref": "r7-15-02.xls#15-02!48"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": 0.91696,
        "finalOku": 0.94512,
        "settledOku": 0.61718778,
        "execPct": 65.3,
        "ref": "r7-15-02.xls#15-02!49"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": 0.00004,
        "finalOku": 0.00004,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!50"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!51"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!52"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!53"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": 89.57254,
        "finalOku": 89.57254,
        "settledOku": 88.98780544,
        "execPct": 99.3,
        "ref": "r7-15-02.xls#15-02!54"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": 89.57254,
        "finalOku": 89.57254,
        "settledOku": 88.98780544,
        "execPct": 99.3,
        "ref": "r7-15-02.xls#15-02!55"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": 0.1418,
        "finalOku": 0.1418,
        "settledOku": 0.13993241,
        "execPct": 98.7,
        "ref": "r7-15-02.xls#15-02!56"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!57"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": 0.14178,
        "finalOku": 0.14178,
        "settledOku": 0.13993241,
        "execPct": 98.7,
        "ref": "r7-15-02.xls#15-02!58"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": 0.2,
        "finalOku": 0.05171,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!59"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": 0.2,
        "finalOku": 0.05171,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r7-15-02.xls#15-02!60"
      }
    ],
    "totals": {
      "initialOku": 790.35063,
      "finalOku": 914.63948861,
      "settledOku": 852.86927461
    }
  },
  {
    "fy": "R4",
    "fyLabel": "令和4年度",
    "initialNote": "",
    "sourceTitle": "令和4年度 一般会計歳入歳出状況（甲府市統計書 令和6年版）",
    "sourceUrl": "https://web.archive.org/web/20260712154030/https://www.city.kofu.yamanashi.jp/somu-somu/r6toukeisyo/documents/r6-15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r6toukeisyo/documents/r6-15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-r4/r6-15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 284.86961,
        "finalOku": 286.86961,
        "settledOku": 294.10916049,
        "execPct": 102.5,
        "ref": "r6-15-01.xls#15-01!5"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 130.92288,
        "finalOku": 131.92288,
        "settledOku": 136.73256516,
        "execPct": 103.6,
        "ref": "r6-15-01.xls#15-01!6"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 115.09827,
        "finalOku": 116.09827,
        "settledOku": 117.09200729,
        "execPct": 100.9,
        "ref": "r6-15-01.xls#15-01!7"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 6.38068,
        "finalOku": 6.38068,
        "settledOku": 6.28301917,
        "execPct": 98.5,
        "ref": "r6-15-01.xls#15-01!8"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 12.58102,
        "finalOku": 12.58102,
        "settledOku": 13.87194045,
        "execPct": 110.3,
        "ref": "r6-15-01.xls#15-01!9"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.21091,
        "finalOku": 0.21091,
        "settledOku": 0.3610575,
        "execPct": 171.2,
        "ref": "r6-15-01.xls#15-01!10"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.67585,
        "finalOku": 19.67585,
        "settledOku": 19.76857092,
        "execPct": 100.5,
        "ref": "r6-15-01.xls#15-01!11"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.3743,
        "finalOku": 4.3743,
        "settledOku": 4.16012,
        "execPct": 95.1,
        "ref": "r6-15-01.xls#15-01!12"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 1.01186,
        "finalOku": 1.01186,
        "settledOku": 0.96108,
        "execPct": 95,
        "ref": "r6-15-01.xls#15-01!13"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 3.02908,
        "finalOku": 3.02908,
        "settledOku": 2.87668,
        "execPct": 95,
        "ref": "r6-15-01.xls#15-01!14"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方道路譲与税",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-01.xls#15-01!15"
      },
      {
        "kan": "地方譲与税",
        "kou": "森林環境譲与税",
        "initialOku": 0.33335,
        "finalOku": 0.33335,
        "settledOku": 0.32236,
        "execPct": 96.7,
        "ref": "r6-15-01.xls#15-01!16"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.18752,
        "finalOku": 0.18752,
        "settledOku": 0.10828,
        "execPct": 57.7,
        "ref": "r6-15-01.xls#15-01!17"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.18752,
        "finalOku": 0.18752,
        "settledOku": 0.10828,
        "execPct": 57.7,
        "ref": "r6-15-01.xls#15-01!18"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 0.98555,
        "finalOku": 1.03919,
        "settledOku": 1.32303,
        "execPct": 127.3,
        "ref": "r6-15-01.xls#15-01!19"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 0.98555,
        "finalOku": 1.03919,
        "settledOku": 1.32303,
        "execPct": 127.3,
        "ref": "r6-15-01.xls#15-01!20"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 1.20811,
        "finalOku": 1.20811,
        "settledOku": 1.1468,
        "execPct": 94.9,
        "ref": "r6-15-01.xls#15-01!21"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 1.20811,
        "finalOku": 1.20811,
        "settledOku": 1.1468,
        "execPct": 94.9,
        "ref": "r6-15-01.xls#15-01!22"
      },
      {
        "kan": "法人事業税交付金",
        "kou": null,
        "initialOku": 4.82213,
        "finalOku": 6.05972,
        "settledOku": 5.97948,
        "execPct": 98.7,
        "ref": "r6-15-01.xls#15-01!23"
      },
      {
        "kan": "法人事業税交付金",
        "kou": "法人事業税交付金",
        "initialOku": 4.82213,
        "finalOku": 6.05972,
        "settledOku": 5.97948,
        "execPct": 98.7,
        "ref": "r6-15-01.xls#15-01!24"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 48.03273,
        "finalOku": 50.5713,
        "settledOku": 51.72468,
        "execPct": 102.3,
        "ref": "r6-15-01.xls#15-01!25"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 48.03273,
        "finalOku": 50.5713,
        "settledOku": 51.72468,
        "execPct": 102.3,
        "ref": "r6-15-01.xls#15-01!26"
      },
      {
        "kan": "環境性能割交付金",
        "kou": null,
        "initialOku": 0.56538,
        "finalOku": 0.56538,
        "settledOku": 0.50192,
        "execPct": 88.8,
        "ref": "r6-15-01.xls#15-01!27"
      },
      {
        "kan": "環境性能割交付金",
        "kou": "環境性能割交付金",
        "initialOku": 0.56538,
        "finalOku": 0.56538,
        "settledOku": 0.50192,
        "execPct": 88.8,
        "ref": "r6-15-01.xls#15-01!28"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 1.4768,
        "finalOku": 1.78603,
        "settledOku": 1.78632,
        "execPct": 100,
        "ref": "r6-15-01.xls#15-01!29"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 1.4768,
        "finalOku": 1.73008,
        "settledOku": 1.73008,
        "execPct": 100,
        "ref": "r6-15-01.xls#15-01!30"
      },
      {
        "kan": "地方特例交付金",
        "kou": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
        "initialOku": 0,
        "finalOku": 0.05595,
        "settledOku": 0.05624,
        "execPct": 100.5,
        "ref": "r6-15-01.xls#15-01!31"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 98.775,
        "finalOku": 109.58583,
        "settledOku": 109.64121,
        "execPct": 100.1,
        "ref": "r6-15-01.xls#15-01!32"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 98.775,
        "finalOku": 109.58583,
        "settledOku": 109.64121,
        "execPct": 100.1,
        "ref": "r6-15-01.xls#15-01!33"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.40443,
        "finalOku": 0.40443,
        "settledOku": 0.31543,
        "execPct": 78,
        "ref": "r6-15-01.xls#15-01!34"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.40443,
        "finalOku": 0.40443,
        "settledOku": 0.31543,
        "execPct": 78,
        "ref": "r6-15-01.xls#15-01!35"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 3.28157,
        "finalOku": 3.28255,
        "settledOku": 2.51700343,
        "execPct": 76.7,
        "ref": "r6-15-01.xls#15-01!36"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 3.28157,
        "finalOku": 3.28255,
        "settledOku": 2.51700343,
        "execPct": 76.7,
        "ref": "r6-15-01.xls#15-01!37"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.89753,
        "finalOku": 9.89753,
        "settledOku": 9.28970069,
        "execPct": 93.9,
        "ref": "r6-15-01.xls#15-01!38"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 8.30697,
        "finalOku": 8.30697,
        "settledOku": 7.71103216,
        "execPct": 92.8,
        "ref": "r6-15-01.xls#15-01!39"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.59056,
        "finalOku": 1.59056,
        "settledOku": 1.57866853,
        "execPct": 99.3,
        "ref": "r6-15-01.xls#15-01!40"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 148.00508,
        "finalOku": 223.7784396,
        "settledOku": 206.93274996,
        "execPct": 92.5,
        "ref": "r6-15-01.xls#15-01!41"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 123.01816,
        "finalOku": 134.1838,
        "settledOku": 133.49947243,
        "execPct": 99.5,
        "ref": "r6-15-01.xls#15-01!42"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 24.49944,
        "finalOku": 89.1071596,
        "settledOku": 72.9925192,
        "execPct": 81.9,
        "ref": "r6-15-01.xls#15-01!43"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.48748,
        "finalOku": 0.48748,
        "settledOku": 0.44075833,
        "execPct": 90.4,
        "ref": "r6-15-01.xls#15-01!44"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 62.13384,
        "finalOku": 71.13496281,
        "settledOku": 67.39919832,
        "execPct": 94.7,
        "ref": "r6-15-01.xls#15-01!45"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 42.50646,
        "finalOku": 43.46752,
        "settledOku": 43.02586128,
        "execPct": 99,
        "ref": "r6-15-01.xls#15-01!46"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 14.44787,
        "finalOku": 22.48793281,
        "settledOku": 19.96368679,
        "execPct": 88.8,
        "ref": "r6-15-01.xls#15-01!47"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 5.17951,
        "finalOku": 5.17951,
        "settledOku": 4.40965025,
        "execPct": 85.1,
        "ref": "r6-15-01.xls#15-01!48"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 0.78613,
        "finalOku": 2.13347,
        "settledOku": 3.90929908,
        "execPct": 183.2,
        "ref": "r6-15-01.xls#15-01!49"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.5115,
        "finalOku": 0.52005,
        "settledOku": 0.63441537,
        "execPct": 122,
        "ref": "r6-15-01.xls#15-01!50"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 0.27463,
        "finalOku": 1.61342,
        "settledOku": 3.27488371,
        "execPct": 203,
        "ref": "r6-15-01.xls#15-01!51"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 20,
        "finalOku": 32.17438,
        "settledOku": 30.409595,
        "execPct": 94.5,
        "ref": "r6-15-01.xls#15-01!52"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 20,
        "finalOku": 32.17438,
        "settledOku": 30.409595,
        "execPct": 94.5,
        "ref": "r6-15-01.xls#15-01!53"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 8.33032,
        "finalOku": 17.59821,
        "settledOku": 1.8233085,
        "execPct": 10.4,
        "ref": "r6-15-01.xls#15-01!54"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 8.33032,
        "finalOku": 17.59821,
        "settledOku": 1.8233085,
        "execPct": 10.4,
        "ref": "r6-15-01.xls#15-01!55"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 21.38251213,
        "settledOku": 21.38251576,
        "execPct": 100,
        "ref": "r6-15-01.xls#15-01!56"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 21.38251213,
        "settledOku": 21.38251576,
        "execPct": 100,
        "ref": "r6-15-01.xls#15-01!57"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 19.28684,
        "finalOku": 22.69034,
        "settledOku": 19.82451168,
        "execPct": 87.4,
        "ref": "r6-15-01.xls#15-01!58"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.57196,
        "finalOku": 0.57196,
        "settledOku": 0.28834127,
        "execPct": 50.4,
        "ref": "r6-15-01.xls#15-01!59"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.0012,
        "finalOku": 0.0012,
        "settledOku": 0.00109687,
        "execPct": 91.4,
        "ref": "r6-15-01.xls#15-01!60"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 4.38587,
        "finalOku": 4.38587,
        "settledOku": 2.24592938,
        "execPct": 51.2,
        "ref": "r6-15-01.xls#15-01!61"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.02664,
        "finalOku": 0.02664,
        "settledOku": 0.01493539,
        "execPct": 56.1,
        "ref": "r6-15-01.xls#15-01!62"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 14.30117,
        "finalOku": 17.70467,
        "settledOku": 17.27420877,
        "execPct": 97.6,
        "ref": "r6-15-01.xls#15-01!63"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 77.401,
        "finalOku": 81.291,
        "settledOku": 68.2742,
        "execPct": 84,
        "ref": "r6-15-01.xls#15-01!64"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 77.401,
        "finalOku": 81.291,
        "settledOku": 68.2742,
        "execPct": 84,
        "ref": "r6-15-01.xls#15-01!65"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": 5.39091,
        "finalOku": 5.3875,
        "settledOku": 5.29093565,
        "execPct": 98.2,
        "ref": "r6-15-02.xls#15-02!5"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": 5.39091,
        "finalOku": 5.3875,
        "settledOku": 5.29093565,
        "execPct": 98.2,
        "ref": "r6-15-02.xls#15-02!6"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": 87.70002,
        "finalOku": 112.75267,
        "settledOku": 106.72765444,
        "execPct": 94.7,
        "ref": "r6-15-02.xls#15-02!7"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": 71.31456,
        "finalOku": 96.343,
        "settledOku": 92.51628823,
        "execPct": 96,
        "ref": "r6-15-02.xls#15-02!8"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": 8.03346,
        "finalOku": 8.01489,
        "settledOku": 7.63003204,
        "execPct": 95.2,
        "ref": "r6-15-02.xls#15-02!9"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": 4.18035,
        "finalOku": 4.15393,
        "settledOku": 3.50782176,
        "execPct": 84.4,
        "ref": "r6-15-02.xls#15-02!10"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": 3.1312,
        "finalOku": 3.14586,
        "settledOku": 2.03417233,
        "execPct": 64.7,
        "ref": "r6-15-02.xls#15-02!11"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": 0.35295,
        "finalOku": 0.33536,
        "settledOku": 0.30760312,
        "execPct": 91.7,
        "ref": "r6-15-02.xls#15-02!12"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": 0.6875,
        "finalOku": 0.75963,
        "settledOku": 0.73173696,
        "execPct": 96.3,
        "ref": "r6-15-02.xls#15-02!13"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": 336.56153,
        "finalOku": 401.15446658,
        "settledOku": 377.52442927,
        "execPct": 94.1,
        "ref": "r6-15-02.xls#15-02!14"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": 162.87743,
        "finalOku": 176.98190451,
        "settledOku": 172.24634966,
        "execPct": 97.3,
        "ref": "r6-15-02.xls#15-02!15"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": 119.6364,
        "finalOku": 128.80833,
        "settledOku": 122.65341639,
        "execPct": 95.2,
        "ref": "r6-15-02.xls#15-02!16"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": 54.04641,
        "finalOku": 54.1016,
        "settledOku": 51.9903059,
        "execPct": 96.1,
        "ref": "r6-15-02.xls#15-02!17"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": 0.00129,
        "finalOku": 0.00129,
        "settledOku": 0.0005841,
        "execPct": 45.3,
        "ref": "r6-15-02.xls#15-02!18"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯臨時特別給付金給付費",
        "initialOku": 0,
        "finalOku": 0.26646,
        "settledOku": 0.08145446,
        "execPct": 30.6,
        "ref": "r6-15-02.xls#15-02!19"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯生活支援特別給付金給付費",
        "initialOku": 0,
        "finalOku": 2.38243,
        "settledOku": 2.12988628,
        "execPct": 89.4,
        "ref": "r6-15-02.xls#15-02!20"
      },
      {
        "kan": "民生費",
        "kou": "特定世帯等臨時特別給付金給付費",
        "initialOku": 0,
        "finalOku": 38.61245207,
        "settledOku": 28.42243248,
        "execPct": 73.6,
        "ref": "r6-15-02.xls#15-02!21"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": 102.04399,
        "finalOku": 126.53967,
        "settledOku": 114.18610429,
        "execPct": 90.2,
        "ref": "r6-15-02.xls#15-02!22"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": 46.54636,
        "finalOku": 71.18339,
        "settledOku": 60.07900952,
        "execPct": 84.4,
        "ref": "r6-15-02.xls#15-02!23"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": 24.5716,
        "finalOku": 24.2085,
        "settledOku": 23.00692384,
        "execPct": 95,
        "ref": "r6-15-02.xls#15-02!24"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": 30.805,
        "finalOku": 31.02675,
        "settledOku": 31.00510117,
        "execPct": 99.9,
        "ref": "r6-15-02.xls#15-02!25"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": 0.12103,
        "finalOku": 0.12103,
        "settledOku": 0.09506976,
        "execPct": 78.6,
        "ref": "r6-15-02.xls#15-02!26"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": 1.87321,
        "finalOku": 1.97614,
        "settledOku": 1.92867486,
        "execPct": 97.6,
        "ref": "r6-15-02.xls#15-02!27"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": 1.87321,
        "finalOku": 1.97614,
        "settledOku": 1.92867486,
        "execPct": 97.6,
        "ref": "r6-15-02.xls#15-02!28"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": 10.29657,
        "finalOku": 10.87602,
        "settledOku": 10.29756242,
        "execPct": 94.7,
        "ref": "r6-15-02.xls#15-02!29"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": 7.35094,
        "finalOku": 7.66064,
        "settledOku": 7.21729737,
        "execPct": 94.2,
        "ref": "r6-15-02.xls#15-02!30"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": 2.00828,
        "finalOku": 2.21939,
        "settledOku": 2.11371633,
        "execPct": 95.2,
        "ref": "r6-15-02.xls#15-02!31"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": 0.93735,
        "finalOku": 0.99599,
        "settledOku": 0.96654872,
        "execPct": 97,
        "ref": "r6-15-02.xls#15-02!32"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": 9.18793,
        "finalOku": 22.10267,
        "settledOku": 15.37014806,
        "execPct": 69.5,
        "ref": "r6-15-02.xls#15-02!33"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": 9.18793,
        "finalOku": 22.10267,
        "settledOku": 15.37014806,
        "execPct": 69.5,
        "ref": "r6-15-02.xls#15-02!34"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": 43.22595,
        "finalOku": 54.34673796,
        "settledOku": 45.43218544,
        "execPct": 83.6,
        "ref": "r6-15-02.xls#15-02!35"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": 13.43672,
        "finalOku": 17.81895697,
        "settledOku": 15.72660357,
        "execPct": 88.3,
        "ref": "r6-15-02.xls#15-02!36"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": 1.31222,
        "finalOku": 1.34008,
        "settledOku": 0.61885983,
        "execPct": 46.2,
        "ref": "r6-15-02.xls#15-02!37"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": 25.66438,
        "finalOku": 32.42743099,
        "settledOku": 26.44769071,
        "execPct": 81.6,
        "ref": "r6-15-02.xls#15-02!38"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": 2.81263,
        "finalOku": 2.76027,
        "settledOku": 2.63903133,
        "execPct": 95.6,
        "ref": "r6-15-02.xls#15-02!39"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": 22.87509,
        "finalOku": 23.15619,
        "settledOku": 22.86778297,
        "execPct": 98.8,
        "ref": "r6-15-02.xls#15-02!40"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": 22.87509,
        "finalOku": 23.15619,
        "settledOku": 22.86778297,
        "execPct": 98.8,
        "ref": "r6-15-02.xls#15-02!41"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": 61.11437,
        "finalOku": 75.29476,
        "settledOku": 68.97886415,
        "execPct": 91.6,
        "ref": "r6-15-02.xls#15-02!42"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": 3.34202,
        "finalOku": 3.28335,
        "settledOku": 3.12119447,
        "execPct": 95.1,
        "ref": "r6-15-02.xls#15-02!43"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": 23.17863,
        "finalOku": 31.88531,
        "settledOku": 29.15992144,
        "execPct": 91.5,
        "ref": "r6-15-02.xls#15-02!44"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": 11.12604,
        "finalOku": 16.12971,
        "settledOku": 14.52924484,
        "execPct": 90.1,
        "ref": "r6-15-02.xls#15-02!45"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": 7.48005,
        "finalOku": 7.56718,
        "settledOku": 7.39168247,
        "execPct": 97.7,
        "ref": "r6-15-02.xls#15-02!46"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": 1.43631,
        "finalOku": 1.4878,
        "settledOku": 1.46397206,
        "execPct": 98.4,
        "ref": "r6-15-02.xls#15-02!47"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": 9.89962,
        "finalOku": 10.27629,
        "settledOku": 9.05768225,
        "execPct": 88.1,
        "ref": "r6-15-02.xls#15-02!48"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": 3.53026,
        "finalOku": 3.49545,
        "settledOku": 3.2340031,
        "execPct": 92.5,
        "ref": "r6-15-02.xls#15-02!49"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": 1.12144,
        "finalOku": 1.16967,
        "settledOku": 1.02116352,
        "execPct": 87.3,
        "ref": "r6-15-02.xls#15-02!50"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": 0.00004,
        "finalOku": 0.00004,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!51"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!52"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!53"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!54"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": 113.01584,
        "finalOku": 113.01584,
        "settledOku": 112.99880679,
        "execPct": 100,
        "ref": "r6-15-02.xls#15-02!55"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": 113.01584,
        "finalOku": 113.01584,
        "settledOku": 112.99880679,
        "execPct": 100,
        "ref": "r6-15-02.xls#15-02!56"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": 1.33843,
        "finalOku": 1.33843,
        "settledOku": 1.33281422,
        "execPct": 99.6,
        "ref": "r6-15-02.xls#15-02!57"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!58"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": 1.33841,
        "finalOku": 1.33841,
        "settledOku": 1.33281422,
        "execPct": 99.6,
        "ref": "r6-15-02.xls#15-02!59"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": 0.2,
        "finalOku": 0.07368,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!60"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": 0.2,
        "finalOku": 0.07368,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r6-15-02.xls#15-02!61"
      }
    ],
    "totals": {
      "initialOku": 794.82388,
      "finalOku": 948.01481454,
      "settledOku": 882.93596256
    }
  },
  {
    "fy": "R3",
    "fyLabel": "令和3年度",
    "initialNote": "歳出の当初予算額は原典（統計書）側の誤植（前年度値の再掲）と判定したため表示していません",
    "sourceTitle": "令和3年度 一般会計歳入歳出状況（甲府市統計書 令和5年版）",
    "sourceUrl": "https://web.archive.org/web/20260712154155/https://www.city.kofu.yamanashi.jp/somu-somu/documents/r5-15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/documents/r5-15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-r3/r5-15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 270.70575,
        "finalOku": 270.70575,
        "settledOku": 283.96548142,
        "execPct": 104.9,
        "ref": "r5-15-01.xls#15-01!5"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 122.81688,
        "finalOku": 122.81688,
        "settledOku": 133.56351818,
        "execPct": 108.8,
        "ref": "r5-15-01.xls#15-01!6"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 109.80269,
        "finalOku": 109.80269,
        "settledOku": 111.905593,
        "execPct": 101.9,
        "ref": "r5-15-01.xls#15-01!7"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 5.87016,
        "finalOku": 5.87016,
        "settledOku": 6.00330412,
        "execPct": 102.3,
        "ref": "r5-15-01.xls#15-01!8"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 12.93822,
        "finalOku": 12.93822,
        "settledOku": 13.00382924,
        "execPct": 100.5,
        "ref": "r5-15-01.xls#15-01!9"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.17576,
        "finalOku": 0.17576,
        "settledOku": 0.245313,
        "execPct": 139.6,
        "ref": "r5-15-01.xls#15-01!10"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.10204,
        "finalOku": 19.10204,
        "settledOku": 19.24392388,
        "execPct": 100.7,
        "ref": "r5-15-01.xls#15-01!11"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.06285,
        "finalOku": 4.06285,
        "settledOku": 4.3526,
        "execPct": 107.1,
        "ref": "r5-15-01.xls#15-01!12"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 0.94504,
        "finalOku": 0.94504,
        "settledOku": 1.06134,
        "execPct": 112.3,
        "ref": "r5-15-01.xls#15-01!13"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 2.86044,
        "finalOku": 2.86044,
        "settledOku": 3.03455,
        "execPct": 106.1,
        "ref": "r5-15-01.xls#15-01!14"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方道路譲与税",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-01.xls#15-01!15"
      },
      {
        "kan": "地方譲与税",
        "kou": "森林環境譲与税",
        "initialOku": 0.25736,
        "finalOku": 0.25736,
        "settledOku": 0.25671,
        "execPct": 99.7,
        "ref": "r5-15-01.xls#15-01!16"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.15892,
        "finalOku": 0.15892,
        "settledOku": 0.203,
        "execPct": 127.7,
        "ref": "r5-15-01.xls#15-01!17"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.15892,
        "finalOku": 0.15892,
        "settledOku": 0.203,
        "execPct": 127.7,
        "ref": "r5-15-01.xls#15-01!18"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 0.89949,
        "finalOku": 0.89949,
        "settledOku": 1.44058,
        "execPct": 160.2,
        "ref": "r5-15-01.xls#15-01!19"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 0.89949,
        "finalOku": 0.89949,
        "settledOku": 1.44058,
        "execPct": 160.2,
        "ref": "r5-15-01.xls#15-01!20"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 1.15641,
        "finalOku": 1.15641,
        "settledOku": 1.86896,
        "execPct": 161.6,
        "ref": "r5-15-01.xls#15-01!21"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 1.15641,
        "finalOku": 1.15641,
        "settledOku": 1.86896,
        "execPct": 161.6,
        "ref": "r5-15-01.xls#15-01!22"
      },
      {
        "kan": "法人事業税交付金",
        "kou": null,
        "initialOku": 3.23224,
        "finalOku": 4.46966,
        "settledOku": 4.4662,
        "execPct": 99.9,
        "ref": "r5-15-01.xls#15-01!23"
      },
      {
        "kan": "法人事業税交付金",
        "kou": "法人事業税交付金",
        "initialOku": 3.23224,
        "finalOku": 4.46966,
        "settledOku": 4.4662,
        "execPct": 99.9,
        "ref": "r5-15-01.xls#15-01!24"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 46.26147,
        "finalOku": 48.38563,
        "settledOku": 49.65185,
        "execPct": 102.6,
        "ref": "r5-15-01.xls#15-01!25"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 46.26147,
        "finalOku": 48.38563,
        "settledOku": 49.65185,
        "execPct": 102.6,
        "ref": "r5-15-01.xls#15-01!26"
      },
      {
        "kan": "環境性能割交付金",
        "kou": null,
        "initialOku": 0.2832,
        "finalOku": 0.2832,
        "settledOku": 0.42295,
        "execPct": 149.3,
        "ref": "r5-15-01.xls#15-01!27"
      },
      {
        "kan": "環境性能割交付金",
        "kou": "環境性能割交付金",
        "initialOku": 0.2832,
        "finalOku": 0.2832,
        "settledOku": 0.42295,
        "execPct": 149.3,
        "ref": "r5-15-01.xls#15-01!28"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 5.2171,
        "finalOku": 5.17202,
        "settledOku": 6.01471,
        "execPct": 116.3,
        "ref": "r5-15-01.xls#15-01!29"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 1.7632,
        "finalOku": 1.71812,
        "settledOku": 1.71812,
        "execPct": 100,
        "ref": "r5-15-01.xls#15-01!30"
      },
      {
        "kan": "地方特例交付金",
        "kou": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
        "initialOku": 3.4539,
        "finalOku": 3.4539,
        "settledOku": 4.29659,
        "execPct": 124.4,
        "ref": "r5-15-01.xls#15-01!31"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 93.45578,
        "finalOku": 112.19838,
        "settledOku": 112.14803,
        "execPct": 100,
        "ref": "r5-15-01.xls#15-01!32"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 93.45578,
        "finalOku": 112.19838,
        "settledOku": 112.14803,
        "execPct": 100,
        "ref": "r5-15-01.xls#15-01!33"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.40829,
        "finalOku": 0.40829,
        "settledOku": 0.38064,
        "execPct": 93.2,
        "ref": "r5-15-01.xls#15-01!34"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.40829,
        "finalOku": 0.40829,
        "settledOku": 0.38064,
        "execPct": 93.2,
        "ref": "r5-15-01.xls#15-01!35"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 3.54898,
        "finalOku": 3.65832,
        "settledOku": 2.84874465,
        "execPct": 77.9,
        "ref": "r5-15-01.xls#15-01!36"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 3.54898,
        "finalOku": 3.65832,
        "settledOku": 2.84874465,
        "execPct": 77.9,
        "ref": "r5-15-01.xls#15-01!37"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.99555,
        "finalOku": 9.99555,
        "settledOku": 9.37269075,
        "execPct": 93.8,
        "ref": "r5-15-01.xls#15-01!38"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 8.37365,
        "finalOku": 8.37365,
        "settledOku": 7.75673258,
        "execPct": 92.6,
        "ref": "r5-15-01.xls#15-01!39"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.6219,
        "finalOku": 1.6219,
        "settledOku": 1.61595817,
        "execPct": 99.6,
        "ref": "r5-15-01.xls#15-01!40"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 134.8186,
        "finalOku": 267.80462792,
        "settledOku": 232.25260774,
        "execPct": 86.7,
        "ref": "r5-15-01.xls#15-01!41"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 117.67688,
        "finalOku": 133.92725,
        "settledOku": 133.70011132,
        "execPct": 99.8,
        "ref": "r5-15-01.xls#15-01!42"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 16.65593,
        "finalOku": 133.09462792,
        "settledOku": 97.83832498,
        "execPct": 73.5,
        "ref": "r5-15-01.xls#15-01!43"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.48579,
        "finalOku": 0.78275,
        "settledOku": 0.71417144,
        "execPct": 91.2,
        "ref": "r5-15-01.xls#15-01!44"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 59.36582,
        "finalOku": 62.23250631,
        "settledOku": 59.89131799,
        "execPct": 96.2,
        "ref": "r5-15-01.xls#15-01!45"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 41.16079,
        "finalOku": 42.29922,
        "settledOku": 41.8398098,
        "execPct": 98.9,
        "ref": "r5-15-01.xls#15-01!46"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 14.18014,
        "finalOku": 15.90739631,
        "settledOku": 14.09417889,
        "execPct": 88.6,
        "ref": "r5-15-01.xls#15-01!47"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 4.02489,
        "finalOku": 4.02589,
        "settledOku": 3.9573293,
        "execPct": 98.3,
        "ref": "r5-15-01.xls#15-01!48"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 0.77557,
        "finalOku": 0.77557,
        "settledOku": 1.37105141,
        "execPct": 176.8,
        "ref": "r5-15-01.xls#15-01!49"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.50881,
        "finalOku": 0.50881,
        "settledOku": 0.50823595,
        "execPct": 99.9,
        "ref": "r5-15-01.xls#15-01!50"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 0.26676,
        "finalOku": 0.26676,
        "settledOku": 0.86281546,
        "execPct": 323.4,
        "ref": "r5-15-01.xls#15-01!51"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 16.00001,
        "finalOku": 33.01113,
        "settledOku": 23.07990474,
        "execPct": 69.9,
        "ref": "r5-15-01.xls#15-01!52"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 16.00001,
        "finalOku": 33.01113,
        "settledOku": 23.07990474,
        "execPct": 69.9,
        "ref": "r5-15-01.xls#15-01!53"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 6.05533,
        "finalOku": 6.17985,
        "settledOku": 3.99643404,
        "execPct": 64.7,
        "ref": "r5-15-01.xls#15-01!54"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 6.05533,
        "finalOku": 6.17985,
        "settledOku": 3.99643404,
        "execPct": 64.7,
        "ref": "r5-15-01.xls#15-01!55"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 8.22972223,
        "settledOku": 8.2297184,
        "execPct": 100,
        "ref": "r5-15-01.xls#15-01!56"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 8.22972223,
        "settledOku": 8.2297184,
        "execPct": 100,
        "ref": "r5-15-01.xls#15-01!57"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 15.63751,
        "finalOku": 15.71238,
        "settledOku": 13.22429667,
        "execPct": 84.2,
        "ref": "r5-15-01.xls#15-01!58"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.57865,
        "finalOku": 0.57865,
        "settledOku": 0.50717191,
        "execPct": 87.6,
        "ref": "r5-15-01.xls#15-01!59"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.00168,
        "finalOku": 0.00168,
        "settledOku": 0.00117922,
        "execPct": 70.2,
        "ref": "r5-15-01.xls#15-01!60"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 5.08723,
        "finalOku": 5.08723,
        "settledOku": 2.66287321,
        "execPct": 52.3,
        "ref": "r5-15-01.xls#15-01!61"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.02131,
        "finalOku": 0.02131,
        "settledOku": 0.01711273,
        "execPct": 80.3,
        "ref": "r5-15-01.xls#15-01!62"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 9.94864,
        "finalOku": 10.02351,
        "settledOku": 10.0359596,
        "execPct": 100.1,
        "ref": "r5-15-01.xls#15-01!63"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 86.439,
        "finalOku": 97.35,
        "settledOku": 81.7728,
        "execPct": 84,
        "ref": "r5-15-01.xls#15-01!64"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 86.439,
        "finalOku": 97.35,
        "settledOku": 81.7728,
        "execPct": 84,
        "ref": "r5-15-01.xls#15-01!65"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": null,
        "finalOku": 5.48335,
        "settledOku": 5.27916439,
        "execPct": 96.3,
        "ref": "r5-15-02.xls#15-02!5"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": null,
        "finalOku": 5.48335,
        "settledOku": 5.27916439,
        "execPct": 96.3,
        "ref": "r5-15-02.xls#15-02!6"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": null,
        "finalOku": 121.05259,
        "settledOku": 107.59563184,
        "execPct": 88.9,
        "ref": "r5-15-02.xls#15-02!7"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": null,
        "finalOku": 107.15369,
        "settledOku": 94.55873268,
        "execPct": 88.2,
        "ref": "r5-15-02.xls#15-02!8"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": null,
        "finalOku": 7.63034,
        "settledOku": 7.36402584,
        "execPct": 96.5,
        "ref": "r5-15-02.xls#15-02!9"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": null,
        "finalOku": 4.09599,
        "settledOku": 3.68130885,
        "execPct": 89.9,
        "ref": "r5-15-02.xls#15-02!10"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": null,
        "finalOku": 1.10055,
        "settledOku": 0.99943588,
        "execPct": 90.8,
        "ref": "r5-15-02.xls#15-02!11"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": null,
        "finalOku": 0.38695,
        "settledOku": 0.338471,
        "execPct": 87.5,
        "ref": "r5-15-02.xls#15-02!12"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": null,
        "finalOku": 0.68507,
        "settledOku": 0.65365759,
        "execPct": 95.4,
        "ref": "r5-15-02.xls#15-02!13"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": null,
        "finalOku": 416.85826995,
        "settledOku": 382.6527137,
        "execPct": 91.8,
        "ref": "r5-15-02.xls#15-02!14"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": null,
        "finalOku": 167.67063,
        "settledOku": 160.40936041,
        "execPct": 95.7,
        "ref": "r5-15-02.xls#15-02!15"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": null,
        "finalOku": 125.59611995,
        "settledOku": 120.62081614,
        "execPct": 96,
        "ref": "r5-15-02.xls#15-02!16"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": null,
        "finalOku": 53.93356,
        "settledOku": 52.4220238,
        "execPct": 97.2,
        "ref": "r5-15-02.xls#15-02!17"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": null,
        "finalOku": 0.0015,
        "settledOku": 0.0001947,
        "execPct": 13,
        "ref": "r5-15-02.xls#15-02!18"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯臨時特別給付金給付費",
        "initialOku": null,
        "finalOku": 27.61961,
        "settledOku": 25.06562541,
        "execPct": 90.8,
        "ref": "r5-15-02.xls#15-02!19"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯生活支援特別給付金給付費",
        "initialOku": null,
        "finalOku": 2.90662,
        "settledOku": 2.2136202,
        "execPct": 76.2,
        "ref": "r5-15-02.xls#15-02!20"
      },
      {
        "kan": "民生費",
        "kou": "特定世帯等臨時特別給付金給付費",
        "initialOku": null,
        "finalOku": 39.13023,
        "settledOku": 21.92107304,
        "execPct": 56,
        "ref": "r5-15-02.xls#15-02!21"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": null,
        "finalOku": 128.61594,
        "settledOku": 120.80157874,
        "execPct": 93.9,
        "ref": "r5-15-02.xls#15-02!22"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": null,
        "finalOku": 71.71341,
        "settledOku": 64.97862608,
        "execPct": 90.6,
        "ref": "r5-15-02.xls#15-02!23"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": null,
        "finalOku": 25.46133,
        "settledOku": 24.44062473,
        "execPct": 96,
        "ref": "r5-15-02.xls#15-02!24"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": null,
        "finalOku": 31.305,
        "settledOku": 31.27106065,
        "execPct": 99.9,
        "ref": "r5-15-02.xls#15-02!25"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": null,
        "finalOku": 0.1362,
        "settledOku": 0.11126728,
        "execPct": 81.7,
        "ref": "r5-15-02.xls#15-02!26"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": null,
        "finalOku": 2.15696,
        "settledOku": 2.09870832,
        "execPct": 97.3,
        "ref": "r5-15-02.xls#15-02!27"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": null,
        "finalOku": 2.15696,
        "settledOku": 2.09870832,
        "execPct": 97.3,
        "ref": "r5-15-02.xls#15-02!28"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": null,
        "finalOku": 10.97857,
        "settledOku": 9.97885201,
        "execPct": 90.9,
        "ref": "r5-15-02.xls#15-02!29"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": null,
        "finalOku": 8.24353,
        "settledOku": 7.60483747,
        "execPct": 92.3,
        "ref": "r5-15-02.xls#15-02!30"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": null,
        "finalOku": 1.83967,
        "settledOku": 1.52578779,
        "execPct": 82.9,
        "ref": "r5-15-02.xls#15-02!31"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": null,
        "finalOku": 0.89537,
        "settledOku": 0.84822675,
        "execPct": 94.7,
        "ref": "r5-15-02.xls#15-02!32"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": null,
        "finalOku": 15.11661,
        "settledOku": 9.76279028,
        "execPct": 64.6,
        "ref": "r5-15-02.xls#15-02!33"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": null,
        "finalOku": 15.11661,
        "settledOku": 9.76279028,
        "execPct": 64.6,
        "ref": "r5-15-02.xls#15-02!34"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": null,
        "finalOku": 53.46313631,
        "settledOku": 37.66407196,
        "execPct": 70.4,
        "ref": "r5-15-02.xls#15-02!35"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": null,
        "finalOku": 19.38271984,
        "settledOku": 14.6534867,
        "execPct": 75.6,
        "ref": "r5-15-02.xls#15-02!36"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": null,
        "finalOku": 0.9409,
        "settledOku": 0.92565141,
        "execPct": 98.4,
        "ref": "r5-15-02.xls#15-02!37"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": null,
        "finalOku": 30.33416647,
        "settledOku": 19.44021623,
        "execPct": 64.1,
        "ref": "r5-15-02.xls#15-02!38"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": null,
        "finalOku": 2.80535,
        "settledOku": 2.64471762,
        "execPct": 94.3,
        "ref": "r5-15-02.xls#15-02!39"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": null,
        "finalOku": 22.5641488,
        "settledOku": 21.7640566,
        "execPct": 96.5,
        "ref": "r5-15-02.xls#15-02!40"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": null,
        "finalOku": 22.5641488,
        "settledOku": 21.7640566,
        "execPct": 96.5,
        "ref": "r5-15-02.xls#15-02!41"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": null,
        "finalOku": 75.6451314,
        "settledOku": 63.10956096,
        "execPct": 83.4,
        "ref": "r5-15-02.xls#15-02!42"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": null,
        "finalOku": 3.35836,
        "settledOku": 3.18496179,
        "execPct": 94.8,
        "ref": "r5-15-02.xls#15-02!43"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": null,
        "finalOku": 33.36012446,
        "settledOku": 26.80942868,
        "execPct": 80.4,
        "ref": "r5-15-02.xls#15-02!44"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": null,
        "finalOku": 16.26118694,
        "settledOku": 11.96661717,
        "execPct": 73.6,
        "ref": "r5-15-02.xls#15-02!45"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": null,
        "finalOku": 7.47819,
        "settledOku": 7.17802622,
        "execPct": 96,
        "ref": "r5-15-02.xls#15-02!46"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": null,
        "finalOku": 1.38317,
        "settledOku": 1.34505462,
        "execPct": 97.2,
        "ref": "r5-15-02.xls#15-02!47"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": null,
        "finalOku": 9.99981,
        "settledOku": 9.36498414,
        "execPct": 93.7,
        "ref": "r5-15-02.xls#15-02!48"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": null,
        "finalOku": 2.46232,
        "settledOku": 2.11797987,
        "execPct": 86,
        "ref": "r5-15-02.xls#15-02!49"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": null,
        "finalOku": 1.34197,
        "settledOku": 1.14250847,
        "execPct": 85.1,
        "ref": "r5-15-02.xls#15-02!50"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": null,
        "finalOku": 0.00004,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!51"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": null,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!52"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": null,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!53"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": null,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!54"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": null,
        "finalOku": 99.48993,
        "settledOku": 99.37013279,
        "execPct": 99.9,
        "ref": "r5-15-02.xls#15-02!55"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": null,
        "finalOku": 99.48993,
        "settledOku": 99.37013279,
        "execPct": 99.9,
        "ref": "r5-15-02.xls#15-02!56"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": null,
        "finalOku": 1.3507,
        "settledOku": 1.34479046,
        "execPct": 99.6,
        "ref": "r5-15-02.xls#15-02!57"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": null,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!58"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": null,
        "finalOku": 1.35068,
        "settledOku": 1.34479046,
        "execPct": 99.6,
        "ref": "r5-15-02.xls#15-02!59"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": null,
        "finalOku": 0.07488,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!60"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": null,
        "finalOku": 0.07488,
        "settledOku": 0,
        "execPct": 0,
        "ref": "r5-15-02.xls#15-02!61"
      }
    ],
    "totals": {
      "initialOku": null,
      "finalOku": 952.85025646,
      "settledOku": 861.42205205
    }
  },
  {
    "fy": "R2",
    "fyLabel": "令和2年度",
    "initialNote": "",
    "sourceTitle": "令和2年度 一般会計歳入歳出状況（甲府市統計書 令和4年版）",
    "sourceUrl": "https://web.archive.org/web/20250313081153/https://www.city.kofu.yamanashi.jp/somu-somu/r4toukeisho/documents/15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r4toukeisho/documents/15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-r2/15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 290.41162,
        "finalOku": 290.41162,
        "settledOku": 288.30624925,
        "execPct": 99.3,
        "ref": "15-01.xls#15-01!5"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 135.51893,
        "finalOku": 135.51893,
        "settledOku": 133.43649583,
        "execPct": 98.5,
        "ref": "15-01.xls#15-01!6"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 116.18462,
        "finalOku": 116.18462,
        "settledOku": 116.58063203,
        "execPct": 100.3,
        "ref": "15-01.xls#15-01!7"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 5.78898,
        "finalOku": 5.78898,
        "settledOku": 5.93022585,
        "execPct": 102.4,
        "ref": "15-01.xls#15-01!8"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 12.86615,
        "finalOku": 12.86615,
        "settledOku": 12.21776448,
        "execPct": 95,
        "ref": "15-01.xls#15-01!9"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.23955,
        "finalOku": 0.23955,
        "settledOku": 0.13638,
        "execPct": 56.9,
        "ref": "15-01.xls#15-01!10"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.81339,
        "finalOku": 19.81339,
        "settledOku": 20.00475106,
        "execPct": 101,
        "ref": "15-01.xls#15-01!11"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.67426,
        "finalOku": 4.67426,
        "settledOku": 4.28555,
        "execPct": 91.7,
        "ref": "15-01.xls#15-01!12"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 1.06296,
        "finalOku": 1.06296,
        "settledOku": 1.03038,
        "execPct": 96.9,
        "ref": "15-01.xls#15-01!13"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 3.35394,
        "finalOku": 3.35394,
        "settledOku": 2.99781,
        "execPct": 89.4,
        "ref": "15-01.xls#15-01!14"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方道路譲与税",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-01.xls#15-01!15"
      },
      {
        "kan": "地方譲与税",
        "kou": "森林環境譲与税",
        "initialOku": 0.25735,
        "finalOku": 0.25735,
        "settledOku": 0.25736,
        "execPct": 100,
        "ref": "15-01.xls#15-01!16"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.1644,
        "finalOku": 0.1644,
        "settledOku": 0.24398,
        "execPct": 148.4,
        "ref": "15-01.xls#15-01!17"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.1644,
        "finalOku": 0.1644,
        "settledOku": 0.24398,
        "execPct": 148.4,
        "ref": "15-01.xls#15-01!18"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 1.05494,
        "finalOku": 1.05494,
        "settledOku": 0.9317,
        "execPct": 88.3,
        "ref": "15-01.xls#15-01!19"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 1.05494,
        "finalOku": 1.05494,
        "settledOku": 0.9317,
        "execPct": 88.3,
        "ref": "15-01.xls#15-01!20"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 0.74732,
        "finalOku": 0.80096,
        "settledOku": 1.26902,
        "execPct": 158.4,
        "ref": "15-01.xls#15-01!21"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 0.74732,
        "finalOku": 0.80096,
        "settledOku": 1.26902,
        "execPct": 158.4,
        "ref": "15-01.xls#15-01!22"
      },
      {
        "kan": "法人事業税交付金",
        "kou": null,
        "initialOku": 1.90691,
        "finalOku": 1.90691,
        "settledOku": 1.99638,
        "execPct": 104.7,
        "ref": "15-01.xls#15-01!23"
      },
      {
        "kan": "法人事業税交付金",
        "kou": "法人事業税交付金",
        "initialOku": 1.90691,
        "finalOku": 1.90691,
        "settledOku": 1.99638,
        "execPct": 104.7,
        "ref": "15-01.xls#15-01!24"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 49.96062,
        "finalOku": 47.70526,
        "settledOku": 45.70394,
        "execPct": 95.8,
        "ref": "15-01.xls#15-01!25"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 49.96062,
        "finalOku": 47.70526,
        "settledOku": 45.70394,
        "execPct": 95.8,
        "ref": "15-01.xls#15-01!26"
      },
      {
        "kan": "環境性能割交付金",
        "kou": null,
        "initialOku": 0.46542,
        "finalOku": 0.46542,
        "settledOku": 0.43794,
        "execPct": 94.1,
        "ref": "15-01.xls#15-01!27"
      },
      {
        "kan": "環境性能割交付金",
        "kou": "環境性能割交付金",
        "initialOku": 0.46542,
        "finalOku": 0.46542,
        "settledOku": 0.43794,
        "execPct": 94.1,
        "ref": "15-01.xls#15-01!28"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 1.66361,
        "finalOku": 1.79331,
        "settledOku": 1.79331,
        "execPct": 100,
        "ref": "15-01.xls#15-01!29"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 1.66361,
        "finalOku": 1.79331,
        "settledOku": 1.79331,
        "execPct": 100,
        "ref": "15-01.xls#15-01!30"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 89.21521,
        "finalOku": 92.95251,
        "settledOku": 92.08425,
        "execPct": 99.1,
        "ref": "15-01.xls#15-01!31"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 89.21521,
        "finalOku": 92.95251,
        "settledOku": 92.08425,
        "execPct": 99.1,
        "ref": "15-01.xls#15-01!32"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.42135,
        "finalOku": 0.42135,
        "settledOku": 0.42516,
        "execPct": 100.9,
        "ref": "15-01.xls#15-01!33"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.42135,
        "finalOku": 0.42135,
        "settledOku": 0.42516,
        "execPct": 100.9,
        "ref": "15-01.xls#15-01!34"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 4.94591,
        "finalOku": 4.94591,
        "settledOku": 3.8682698,
        "execPct": 78.2,
        "ref": "15-01.xls#15-01!35"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 4.94591,
        "finalOku": 4.94591,
        "settledOku": 3.8682698,
        "execPct": 78.2,
        "ref": "15-01.xls#15-01!36"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.97819,
        "finalOku": 9.97819,
        "settledOku": 9.18266831,
        "execPct": 92,
        "ref": "15-01.xls#15-01!37"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 8.37507,
        "finalOku": 8.37507,
        "settledOku": 7.65062447,
        "execPct": 91.3,
        "ref": "15-01.xls#15-01!38"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.60312,
        "finalOku": 1.60312,
        "settledOku": 1.53204384,
        "execPct": 95.6,
        "ref": "15-01.xls#15-01!39"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 128.35029,
        "finalOku": 380.32024211,
        "settledOku": 353.10153828,
        "execPct": 92.8,
        "ref": "15-01.xls#15-01!40"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 113.80422,
        "finalOku": 125.0655066,
        "settledOku": 119.17828916,
        "execPct": 95.3,
        "ref": "15-01.xls#15-01!41"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 14.05488,
        "finalOku": 254.71336551,
        "settledOku": 233.33974546,
        "execPct": 91.6,
        "ref": "15-01.xls#15-01!42"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.49119,
        "finalOku": 0.54137,
        "settledOku": 0.58350366,
        "execPct": 107.8,
        "ref": "15-01.xls#15-01!43"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 62.48574,
        "finalOku": 68.41537073,
        "settledOku": 64.87862557,
        "execPct": 94.8,
        "ref": "15-01.xls#15-01!44"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 39.88727,
        "finalOku": 41.74552071,
        "settledOku": 41.2538163,
        "execPct": 98.8,
        "ref": "15-01.xls#15-01!45"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 18.45177,
        "finalOku": 22.52315002,
        "settledOku": 19.4547001,
        "execPct": 86.4,
        "ref": "15-01.xls#15-01!46"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 4.1467,
        "finalOku": 4.1467,
        "settledOku": 4.17010917,
        "execPct": 100.6,
        "ref": "15-01.xls#15-01!47"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 0.77621,
        "finalOku": 0.97661,
        "settledOku": 1.25926093,
        "execPct": 128.9,
        "ref": "15-01.xls#15-01!48"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.52155,
        "finalOku": 0.52155,
        "settledOku": 0.4969369,
        "execPct": 95.3,
        "ref": "15-01.xls#15-01!49"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 0.25466,
        "finalOku": 0.45506,
        "settledOku": 0.76232403,
        "execPct": 167.5,
        "ref": "15-01.xls#15-01!50"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 1.80001,
        "finalOku": 15.01242,
        "settledOku": 12.82568384,
        "execPct": 85.4,
        "ref": "15-01.xls#15-01!51"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 1.80001,
        "finalOku": 15.01242,
        "settledOku": 12.82568384,
        "execPct": 85.4,
        "ref": "15-01.xls#15-01!52"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 11.26555,
        "finalOku": 11.2434,
        "settledOku": 10.06826,
        "execPct": 89.5,
        "ref": "15-01.xls#15-01!53"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 11.26555,
        "finalOku": 11.2434,
        "settledOku": 10.06826,
        "execPct": 89.5,
        "ref": "15-01.xls#15-01!54"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 4.04497313,
        "settledOku": 4.04496931,
        "execPct": 100,
        "ref": "15-01.xls#15-01!55"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 4.04497313,
        "settledOku": 4.04496931,
        "execPct": 100,
        "ref": "15-01.xls#15-01!56"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 21.94825,
        "finalOku": 22.46645,
        "settledOku": 19.75049034,
        "execPct": 87.9,
        "ref": "15-01.xls#15-01!57"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.54528,
        "finalOku": 0.54528,
        "settledOku": 0.70249373,
        "execPct": 128.8,
        "ref": "15-01.xls#15-01!58"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.0037,
        "finalOku": 0.0037,
        "settledOku": 0.00134534,
        "execPct": 36.4,
        "ref": "15-01.xls#15-01!59"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 5.59249,
        "finalOku": 5.59249,
        "settledOku": 3.43754725,
        "execPct": 61.5,
        "ref": "15-01.xls#15-01!60"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.02764,
        "finalOku": 0.02764,
        "settledOku": 0.02058087,
        "execPct": 74.5,
        "ref": "15-01.xls#15-01!61"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 15.77914,
        "finalOku": 16.29734,
        "settledOku": 15.58852315,
        "execPct": 95.7,
        "ref": "15-01.xls#15-01!62"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 62.064,
        "finalOku": 82.466,
        "settledOku": 73.823,
        "execPct": 89.5,
        "ref": "15-01.xls#15-01!63"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 62.064,
        "finalOku": 82.466,
        "settledOku": 73.823,
        "execPct": 89.5,
        "ref": "15-01.xls#15-01!64"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": 5.40579,
        "finalOku": 5.42903,
        "settledOku": 5.30630778,
        "execPct": 97.7,
        "ref": "15-02.xls#15-02!5"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": 5.40579,
        "finalOku": 5.42903,
        "settledOku": 5.30630778,
        "execPct": 97.7,
        "ref": "15-02.xls#15-02!6"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": 70.74316,
        "finalOku": 282.47765,
        "settledOku": 274.43859025,
        "execPct": 97.2,
        "ref": "15-02.xls#15-02!7"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": 56.50318,
        "finalOku": 78.13728,
        "settledOku": 72.928994,
        "execPct": 93.3,
        "ref": "15-02.xls#15-02!8"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": 7.98717,
        "finalOku": 8.1886,
        "settledOku": 7.69103958,
        "execPct": 93.9,
        "ref": "15-02.xls#15-02!9"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": 3.9711,
        "finalOku": 4.31965,
        "settledOku": 3.67613308,
        "execPct": 85.1,
        "ref": "15-02.xls#15-02!10"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": 0.49232,
        "finalOku": 0.51774,
        "settledOku": 0.50446053,
        "execPct": 97.4,
        "ref": "15-02.xls#15-02!11"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": 1.09938,
        "finalOku": 1.26748,
        "settledOku": 1.16889888,
        "execPct": 92.2,
        "ref": "15-02.xls#15-02!12"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": 0.69001,
        "finalOku": 0.715,
        "settledOku": 0.70452538,
        "execPct": 98.5,
        "ref": "15-02.xls#15-02!13"
      },
      {
        "kan": "総務費",
        "kou": "定額給付金給付費",
        "initialOku": 0,
        "finalOku": 189.3319,
        "settledOku": 187.7645388,
        "execPct": 99.2,
        "ref": "15-02.xls#15-02!14"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": 332.86133,
        "finalOku": 350.96569,
        "settledOku": 339.03708334,
        "execPct": 96.6,
        "ref": "15-02.xls#15-02!15"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": 158.74174,
        "finalOku": 162.42518,
        "settledOku": 157.93320625,
        "execPct": 97.2,
        "ref": "15-02.xls#15-02!16"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": 118.95608,
        "finalOku": 128.56124,
        "settledOku": 123.88840578,
        "execPct": 96.4,
        "ref": "15-02.xls#15-02!17"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": 55.16151,
        "finalOku": 54.99412,
        "settledOku": 52.692492,
        "execPct": 95.8,
        "ref": "15-02.xls#15-02!18"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": 0.002,
        "finalOku": 0.002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!19"
      },
      {
        "kan": "民生費",
        "kou": "子育て世帯臨時特別給付金給付費",
        "initialOku": 0,
        "finalOku": 2.37582,
        "settledOku": 2.20839244,
        "execPct": 93,
        "ref": "15-02.xls#15-02!20"
      },
      {
        "kan": "民生費",
        "kou": "ひとり親世帯臨時特別給付金給付費",
        "initialOku": 0,
        "finalOku": 2.60733,
        "settledOku": 2.31458687,
        "execPct": 88.8,
        "ref": "15-02.xls#15-02!21"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": 93.41515,
        "finalOku": 110.32773,
        "settledOku": 95.85237249,
        "execPct": 86.9,
        "ref": "15-02.xls#15-02!22"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": 35.90328,
        "finalOku": 52.90124,
        "settledOku": 39.37764389,
        "execPct": 74.4,
        "ref": "15-02.xls#15-02!23"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": 25.75045,
        "finalOku": 25.66507,
        "settledOku": 24.80444088,
        "execPct": 96.6,
        "ref": "15-02.xls#15-02!24"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": 31.605,
        "finalOku": 31.605,
        "settledOku": 31.54686562,
        "execPct": 99.8,
        "ref": "15-02.xls#15-02!25"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": 0.15642,
        "finalOku": 0.15642,
        "settledOku": 0.1234221,
        "execPct": 78.9,
        "ref": "15-02.xls#15-02!26"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": 2.44998,
        "finalOku": 2.41914,
        "settledOku": 2.34025454,
        "execPct": 96.7,
        "ref": "15-02.xls#15-02!27"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": 2.44998,
        "finalOku": 2.41914,
        "settledOku": 2.34025454,
        "execPct": 96.7,
        "ref": "15-02.xls#15-02!28"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": 8.02527,
        "finalOku": 10.11325,
        "settledOku": 8.05222917,
        "execPct": 79.6,
        "ref": "15-02.xls#15-02!29"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": 5.61045,
        "finalOku": 7.51877,
        "settledOku": 5.60749214,
        "execPct": 74.6,
        "ref": "15-02.xls#15-02!30"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": 1.61298,
        "finalOku": 1.72191,
        "settledOku": 1.59798172,
        "execPct": 92.8,
        "ref": "15-02.xls#15-02!31"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": 0.80184,
        "finalOku": 0.87257,
        "settledOku": 0.84675531,
        "execPct": 97,
        "ref": "15-02.xls#15-02!32"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": 7.12955,
        "finalOku": 17.62586,
        "settledOku": 13.7438822,
        "execPct": 78,
        "ref": "15-02.xls#15-02!33"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": 7.12955,
        "finalOku": 17.62586,
        "settledOku": 13.7438822,
        "execPct": 78,
        "ref": "15-02.xls#15-02!34"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": 38.49172,
        "finalOku": 57.44877597,
        "settledOku": 48.50710387,
        "execPct": 84.4,
        "ref": "15-02.xls#15-02!35"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": 13.04629,
        "finalOku": 16.7700946,
        "settledOku": 13.31943835,
        "execPct": 79.4,
        "ref": "15-02.xls#15-02!36"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": 0.92553,
        "finalOku": 0.91453,
        "settledOku": 0.8623499,
        "execPct": 94.3,
        "ref": "15-02.xls#15-02!37"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": 21.36653,
        "finalOku": 36.63879137,
        "settledOku": 31.69440562,
        "execPct": 86.5,
        "ref": "15-02.xls#15-02!38"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": 3.15337,
        "finalOku": 3.12536,
        "settledOku": 2.63091,
        "execPct": 84.2,
        "ref": "15-02.xls#15-02!39"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": 25.00875,
        "finalOku": 25.15196,
        "settledOku": 24.07397454,
        "execPct": 95.7,
        "ref": "15-02.xls#15-02!40"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": 25.00875,
        "finalOku": 25.15196,
        "settledOku": 24.07397454,
        "execPct": 95.7,
        "ref": "15-02.xls#15-02!41"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": 71.24751,
        "finalOku": 90.68193,
        "settledOku": 74.10794157,
        "execPct": 81.7,
        "ref": "15-02.xls#15-02!42"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": 3.36317,
        "finalOku": 3.24694,
        "settledOku": 3.15983522,
        "execPct": 97.3,
        "ref": "15-02.xls#15-02!43"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": 34.27072,
        "finalOku": 46.9156,
        "settledOku": 37.97112535,
        "execPct": 80.9,
        "ref": "15-02.xls#15-02!44"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": 8.49933,
        "finalOku": 14.82727,
        "settledOku": 10.53877666,
        "execPct": 71.1,
        "ref": "15-02.xls#15-02!45"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": 7.78808,
        "finalOku": 7.9052,
        "settledOku": 7.20624337,
        "execPct": 91.2,
        "ref": "15-02.xls#15-02!46"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": 1.38214,
        "finalOku": 1.39136,
        "settledOku": 1.35832216,
        "execPct": 97.6,
        "ref": "15-02.xls#15-02!47"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": 11.57833,
        "finalOku": 11.92664,
        "settledOku": 10.07686312,
        "execPct": 84.5,
        "ref": "15-02.xls#15-02!48"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": 2.56766,
        "finalOku": 2.5172,
        "settledOku": 2.1305646,
        "execPct": 84.6,
        "ref": "15-02.xls#15-02!49"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": 1.79808,
        "finalOku": 1.95172,
        "settledOku": 1.66621109,
        "execPct": 85.4,
        "ref": "15-02.xls#15-02!50"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": 0.00004,
        "finalOku": 0.14227,
        "settledOku": 0.14212,
        "execPct": 99.9,
        "ref": "15-02.xls#15-02!51"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": 0.00002,
        "finalOku": 0.12982,
        "settledOku": 0.1298,
        "execPct": 100,
        "ref": "15-02.xls#15-02!52"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!53"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!54"
      },
      {
        "kan": "災害復旧費",
        "kou": "農林水産業施設災害復旧費",
        "initialOku": 0,
        "finalOku": 0.01243,
        "settledOku": 0.01232,
        "execPct": 99.1,
        "ref": "15-02.xls#15-02!55"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": 87.86563,
        "finalOku": 87.86563,
        "settledOku": 87.59752486,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!56"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": 87.86563,
        "finalOku": 87.86563,
        "settledOku": 87.59752486,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!57"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": 1.45594,
        "finalOku": 1.45594,
        "settledOku": 1.45114262,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!58"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!59"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": 1.45592,
        "finalOku": 1.45592,
        "settledOku": 1.45114262,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!60"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": 0.2,
        "finalOku": 0.11565,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!61"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": 0.2,
        "finalOku": 0.11565,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!62"
      }
    ],
    "totals": {
      "initialOku": 744.29982,
      "finalOku": 1042.22050597,
      "settledOku": 974.65052723
    }
  },
  {
    "fy": "R1",
    "fyLabel": "令和1年度",
    "initialNote": "",
    "sourceTitle": "令和1年度 一般会計歳入歳出状況（甲府市統計書 令和2年版）",
    "sourceUrl": "https://web.archive.org/web/20260712154347/https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-r1/15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 290.36994,
        "finalOku": 290.36994,
        "settledOku": 292.42666518,
        "execPct": 100.7,
        "ref": "15-01.xls#15-01!65"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 137.95217,
        "finalOku": 137.95217,
        "settledOku": 138.83089009,
        "execPct": 100.6,
        "ref": "15-01.xls#15-01!66"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 113.91508,
        "finalOku": 113.91508,
        "settledOku": 115.48723247,
        "execPct": 101.4,
        "ref": "15-01.xls#15-01!67"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 6.03531,
        "finalOku": 6.03531,
        "settledOku": 5.42089148,
        "execPct": 89.8,
        "ref": "15-01.xls#15-01!68"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 12.50787,
        "finalOku": 12.50787,
        "settledOku": 12.68899485,
        "execPct": 101.4,
        "ref": "15-01.xls#15-01!69"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.26368,
        "finalOku": 0.26368,
        "settledOku": 0.236805,
        "execPct": 89.8,
        "ref": "15-01.xls#15-01!70"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.69583,
        "finalOku": 19.69583,
        "settledOku": 19.76185129,
        "execPct": 100.3,
        "ref": "15-01.xls#15-01!71"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.19531,
        "finalOku": 4.20214,
        "settledOku": 4.20209041,
        "execPct": 100,
        "ref": "15-01.xls#15-01!72"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 1.19541,
        "finalOku": 1.08114,
        "settledOku": 1.05184,
        "execPct": 97.3,
        "ref": "15-01.xls#15-01!73"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 2.99989,
        "finalOku": 2.99989,
        "settledOku": 3.02915,
        "execPct": 101,
        "ref": "15-01.xls#15-01!74"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方道路譲与税",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 4.1e-7,
        "execPct": 4.1,
        "ref": "15-01.xls#15-01!75"
      },
      {
        "kan": "地方譲与税",
        "kou": "森林環境譲与税",
        "initialOku": 0,
        "finalOku": 0.1211,
        "settledOku": 0.1211,
        "execPct": 100,
        "ref": "15-01.xls#15-01!76"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.56169,
        "finalOku": 0.22039,
        "settledOku": 0.22039,
        "execPct": 100,
        "ref": "15-01.xls#15-01!77"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.56169,
        "finalOku": 0.22039,
        "settledOku": 0.22039,
        "execPct": 100,
        "ref": "15-01.xls#15-01!78"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 1.41546,
        "finalOku": 1.04353,
        "settledOku": 1.04353,
        "execPct": 100,
        "ref": "15-01.xls#15-01!79"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 1.41546,
        "finalOku": 1.04353,
        "settledOku": 1.04353,
        "execPct": 100,
        "ref": "15-01.xls#15-01!80"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 1.36124,
        "finalOku": 0.67727,
        "settledOku": 0.67727,
        "execPct": 100,
        "ref": "15-01.xls#15-01!81"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 1.36124,
        "finalOku": 0.67727,
        "settledOku": 0.67727,
        "execPct": 100,
        "ref": "15-01.xls#15-01!82"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 41.21478,
        "finalOku": 37.88787,
        "settledOku": 37.88787,
        "execPct": 100,
        "ref": "15-01.xls#15-01!83"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 41.21478,
        "finalOku": 37.88787,
        "settledOku": 37.88787,
        "execPct": 100,
        "ref": "15-01.xls#15-01!84"
      },
      {
        "kan": "自動車取得税交付金",
        "kou": null,
        "initialOku": 0.769,
        "finalOku": 0.769,
        "settledOku": 0.79766811,
        "execPct": 103.7,
        "ref": "15-01.xls#15-01!85"
      },
      {
        "kan": "自動車取得税交付金",
        "kou": "自動車取得税交付金",
        "initialOku": 0.769,
        "finalOku": 0.769,
        "settledOku": 0.79766811,
        "execPct": 103.7,
        "ref": "15-01.xls#15-01!86"
      },
      {
        "kan": "環境性能割交付金",
        "kou": null,
        "initialOku": 0.2836,
        "finalOku": 0.2836,
        "settledOku": 0.1679,
        "execPct": 59.2,
        "ref": "15-01.xls#15-01!87"
      },
      {
        "kan": "環境性能割交付金",
        "kou": "環境性能割交付金",
        "initialOku": 0.2836,
        "finalOku": 0.2836,
        "settledOku": 0.1679,
        "execPct": 59.2,
        "ref": "15-01.xls#15-01!88"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 1.30746,
        "finalOku": 3.33293,
        "settledOku": 3.31822,
        "execPct": 99.6,
        "ref": "15-01.xls#15-01!89"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 1.30746,
        "finalOku": 1.30746,
        "settledOku": 1.5128,
        "execPct": 115.7,
        "ref": "15-01.xls#15-01!90"
      },
      {
        "kan": "地方特例交付金",
        "kou": "子ども・子育て支援臨時交付金",
        "initialOku": 0,
        "finalOku": 2.02547,
        "settledOku": 1.80542,
        "execPct": 89.1,
        "ref": "15-01.xls#15-01!91"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 94.23443,
        "finalOku": 93.63654,
        "settledOku": 86.8267,
        "execPct": 92.7,
        "ref": "15-01.xls#15-01!92"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 94.23443,
        "finalOku": 93.63654,
        "settledOku": 86.8267,
        "execPct": 92.7,
        "ref": "15-01.xls#15-01!93"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.44028,
        "finalOku": 0.44028,
        "settledOku": 0.40819,
        "execPct": 92.7,
        "ref": "15-01.xls#15-01!94"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.44028,
        "finalOku": 0.44028,
        "settledOku": 0.40819,
        "execPct": 92.7,
        "ref": "15-01.xls#15-01!95"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 5.21267,
        "finalOku": 5.19173,
        "settledOku": 5.07841664,
        "execPct": 97.8,
        "ref": "15-01.xls#15-01!96"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 5.21267,
        "finalOku": 5.19173,
        "settledOku": 5.07841664,
        "execPct": 97.8,
        "ref": "15-01.xls#15-01!97"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.75438,
        "finalOku": 9.75438,
        "settledOku": 9.25082865,
        "execPct": 94.8,
        "ref": "15-01.xls#15-01!98"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 8.07921,
        "finalOku": 8.07921,
        "settledOku": 7.63830985,
        "execPct": 94.5,
        "ref": "15-01.xls#15-01!99"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.67517,
        "finalOku": 1.67517,
        "settledOku": 1.6125188,
        "execPct": 96.3,
        "ref": "15-01.xls#15-01!100"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 136.22594,
        "finalOku": 158.29429398,
        "settledOku": 140.66078172,
        "execPct": 88.9,
        "ref": "15-01.xls#15-01!101"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 108.91304,
        "finalOku": 113.05486,
        "settledOku": 112.20154212,
        "execPct": 99.2,
        "ref": "15-01.xls#15-01!102"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 26.76907,
        "finalOku": 44.64127398,
        "settledOku": 27.94059835,
        "execPct": 62.6,
        "ref": "15-01.xls#15-01!103"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.54383,
        "finalOku": 0.59816,
        "settledOku": 0.51864125,
        "execPct": 86.7,
        "ref": "15-01.xls#15-01!104"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 60.70147,
        "finalOku": 67.19839,
        "settledOku": 61.03740044,
        "execPct": 90.8,
        "ref": "15-01.xls#15-01!105"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 37.47986,
        "finalOku": 40.1274,
        "settledOku": 38.70934361,
        "execPct": 96.5,
        "ref": "15-01.xls#15-01!106"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 18.83664,
        "finalOku": 22.59648,
        "settledOku": 18.07485302,
        "execPct": 80,
        "ref": "15-01.xls#15-01!107"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 4.38497,
        "finalOku": 4.47451,
        "settledOku": 4.25320381,
        "execPct": 95.1,
        "ref": "15-01.xls#15-01!108"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 0.97482,
        "finalOku": 1.00279,
        "settledOku": 0.85603572,
        "execPct": 85.4,
        "ref": "15-01.xls#15-01!109"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.52876,
        "finalOku": 0.52877,
        "settledOku": 0.50462855,
        "execPct": 95.4,
        "ref": "15-01.xls#15-01!110"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 0.44606,
        "finalOku": 0.47402,
        "settledOku": 0.35140717,
        "execPct": 74.1,
        "ref": "15-01.xls#15-01!111"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 1.30001,
        "finalOku": 1.80121,
        "settledOku": 1.8011896,
        "execPct": 100,
        "ref": "15-01.xls#15-01!112"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 1.30001,
        "finalOku": 1.80121,
        "settledOku": 1.8011896,
        "execPct": 100,
        "ref": "15-01.xls#15-01!113"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 3.88162,
        "finalOku": 10.16809,
        "settledOku": 8.03520272,
        "execPct": 79,
        "ref": "15-01.xls#15-01!114"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 3.88162,
        "finalOku": 10.16809,
        "settledOku": 8.03520272,
        "execPct": 79,
        "ref": "15-01.xls#15-01!115"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 6.19816734,
        "settledOku": 6.22136503,
        "execPct": 100.4,
        "ref": "15-01.xls#15-01!116"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 6.19816734,
        "settledOku": 6.22136503,
        "execPct": 100.4,
        "ref": "15-01.xls#15-01!117"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 23.48089,
        "finalOku": 35.12432,
        "settledOku": 31.73042178,
        "execPct": 90.3,
        "ref": "15-01.xls#15-01!118"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.52727,
        "finalOku": 0.52727,
        "settledOku": 0.67696363,
        "execPct": 128.4,
        "ref": "15-01.xls#15-01!119"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.00363,
        "finalOku": 0.00363,
        "settledOku": 0.00312979,
        "execPct": 86.2,
        "ref": "15-01.xls#15-01!120"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 7.59659,
        "finalOku": 7.59659,
        "settledOku": 4.09898659,
        "execPct": 54,
        "ref": "15-01.xls#15-01!121"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.02184,
        "finalOku": 0.02184,
        "settledOku": 0.0222354,
        "execPct": 101.8,
        "ref": "15-01.xls#15-01!122"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 15.33156,
        "finalOku": 26.97499,
        "settledOku": 26.92910637,
        "execPct": 99.8,
        "ref": "15-01.xls#15-01!123"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 66.75,
        "finalOku": 90.746,
        "settledOku": 74.263,
        "execPct": 81.8,
        "ref": "15-01.xls#15-01!124"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 66.75,
        "finalOku": 90.746,
        "settledOku": 74.263,
        "execPct": 81.8,
        "ref": "15-01.xls#15-01!125"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": 5.41193,
        "finalOku": 5.444,
        "settledOku": 5.24690196,
        "execPct": 96.4,
        "ref": "15-02.xls#15-02!63"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": 5.41193,
        "finalOku": 5.444,
        "settledOku": 5.24690196,
        "execPct": 96.4,
        "ref": "15-02.xls#15-02!64"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": 68.88597,
        "finalOku": 88.578404,
        "settledOku": 84.38043027,
        "execPct": 95.3,
        "ref": "15-02.xls#15-02!65"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": 54.3393,
        "finalOku": 73.749454,
        "settledOku": 70.42856784,
        "execPct": 95.5,
        "ref": "15-02.xls#15-02!66"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": 8.29184,
        "finalOku": 8.28051,
        "settledOku": 8.04549672,
        "execPct": 97.2,
        "ref": "15-02.xls#15-02!67"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": 2.87339,
        "finalOku": 3.14985,
        "settledOku": 2.89602846,
        "execPct": 91.9,
        "ref": "15-02.xls#15-02!68"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": 2.23973,
        "finalOku": 2.24038,
        "settledOku": 1.94608899,
        "execPct": 86.9,
        "ref": "15-02.xls#15-02!69"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": 0.45232,
        "finalOku": 0.47401,
        "settledOku": 0.39237315,
        "execPct": 82.8,
        "ref": "15-02.xls#15-02!70"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": 0.68939,
        "finalOku": 0.6842,
        "settledOku": 0.67187511,
        "execPct": 98.2,
        "ref": "15-02.xls#15-02!71"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": 321.5991,
        "finalOku": 333.99245,
        "settledOku": 324.37890693,
        "execPct": 97.1,
        "ref": "15-02.xls#15-02!72"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": 150.14779,
        "finalOku": 158.41242,
        "settledOku": 152.55431313,
        "execPct": 96.3,
        "ref": "15-02.xls#15-02!73"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": 115.86576,
        "finalOku": 120.31808,
        "settledOku": 117.93467336,
        "execPct": 98,
        "ref": "15-02.xls#15-02!74"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": 55.58305,
        "finalOku": 55.25945,
        "settledOku": 53.88955044,
        "execPct": 97.5,
        "ref": "15-02.xls#15-02!75"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": 0.0025,
        "finalOku": 0.0025,
        "settledOku": 0.00037,
        "execPct": 14.8,
        "ref": "15-02.xls#15-02!76"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": 98.41583,
        "finalOku": 106.51348,
        "settledOku": 103.44398803,
        "execPct": 97.1,
        "ref": "15-02.xls#15-02!77"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": 34.90297,
        "finalOku": 37.18797,
        "settledOku": 34.61876084,
        "execPct": 93.1,
        "ref": "15-02.xls#15-02!78"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": 27.74163,
        "finalOku": 33.55428,
        "settledOku": 33.10893254,
        "execPct": 98.7,
        "ref": "15-02.xls#15-02!79"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": 35.605,
        "finalOku": 35.605,
        "settledOku": 35.57746,
        "execPct": 99.9,
        "ref": "15-02.xls#15-02!80"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": 0.16623,
        "finalOku": 0.16623,
        "settledOku": 0.13883465,
        "execPct": 83.5,
        "ref": "15-02.xls#15-02!81"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": 2.71842,
        "finalOku": 2.69911,
        "settledOku": 2.60704494,
        "execPct": 96.6,
        "ref": "15-02.xls#15-02!82"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": 2.71842,
        "finalOku": 2.69911,
        "settledOku": 2.60704494,
        "execPct": 96.6,
        "ref": "15-02.xls#15-02!83"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": 8.18987,
        "finalOku": 8.714814,
        "settledOku": 7.86471294,
        "execPct": 90.2,
        "ref": "15-02.xls#15-02!84"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": 5.75254,
        "finalOku": 6.18356,
        "settledOku": 5.51938349,
        "execPct": 89.3,
        "ref": "15-02.xls#15-02!85"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": 1.63333,
        "finalOku": 1.727254,
        "settledOku": 1.6031745,
        "execPct": 92.8,
        "ref": "15-02.xls#15-02!86"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": 0.804,
        "finalOku": 0.804,
        "settledOku": 0.74215495,
        "execPct": 92.3,
        "ref": "15-02.xls#15-02!87"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": 8.93872,
        "finalOku": 9.76397,
        "settledOku": 5.42259732,
        "execPct": 55.5,
        "ref": "15-02.xls#15-02!88"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": 8.93872,
        "finalOku": 9.76397,
        "settledOku": 5.42259732,
        "execPct": 55.5,
        "ref": "15-02.xls#15-02!89"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": 66.81015,
        "finalOku": 87.76071352,
        "settledOku": 67.79892887,
        "execPct": 77.3,
        "ref": "15-02.xls#15-02!90"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": 15.14197,
        "finalOku": 17.0573655,
        "settledOku": 14.98870989,
        "execPct": 87.9,
        "ref": "15-02.xls#15-02!91"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": 1.06894,
        "finalOku": 1.2806684,
        "settledOku": 1.21850162,
        "execPct": 95.1,
        "ref": "15-02.xls#15-02!92"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": 32.17875,
        "finalOku": 51.13469962,
        "settledOku": 36.22676052,
        "execPct": 70.8,
        "ref": "15-02.xls#15-02!93"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": 18.42049,
        "finalOku": 18.28798,
        "settledOku": 15.36495684,
        "execPct": 84,
        "ref": "15-02.xls#15-02!94"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": 23.34351,
        "finalOku": 23.45737,
        "settledOku": 23.1172521,
        "execPct": 98.6,
        "ref": "15-02.xls#15-02!95"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": 23.34351,
        "finalOku": 23.45737,
        "settledOku": 23.1172521,
        "execPct": 98.6,
        "ref": "15-02.xls#15-02!96"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": 63.07506,
        "finalOku": 74.4951798,
        "settledOku": 59.15432479,
        "execPct": 79.4,
        "ref": "15-02.xls#15-02!97"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": 3.42862,
        "finalOku": 3.30168,
        "settledOku": 3.21131424,
        "execPct": 97.3,
        "ref": "15-02.xls#15-02!98"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": 26.92739,
        "finalOku": 33.71822,
        "settledOku": 25.23566752,
        "execPct": 74.8,
        "ref": "15-02.xls#15-02!99"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": 9.18703,
        "finalOku": 12.6792998,
        "settledOku": 8.0631332,
        "execPct": 63.6,
        "ref": "15-02.xls#15-02!100"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": 8.29507,
        "finalOku": 8.62006,
        "settledOku": 7.9017299,
        "execPct": 91.7,
        "ref": "15-02.xls#15-02!101"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": 1.4594,
        "finalOku": 1.47149,
        "settledOku": 1.44135906,
        "execPct": 98,
        "ref": "15-02.xls#15-02!102"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": 10.43483,
        "finalOku": 10.86177,
        "settledOku": 9.75851941,
        "execPct": 89.8,
        "ref": "15-02.xls#15-02!103"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": 2.14038,
        "finalOku": 2.12743,
        "settledOku": 2.03434211,
        "execPct": 95.6,
        "ref": "15-02.xls#15-02!104"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": 1.20234,
        "finalOku": 1.71523,
        "settledOku": 1.50825935,
        "execPct": 87.9,
        "ref": "15-02.xls#15-02!105"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": 0.00004,
        "finalOku": 0.26847,
        "settledOku": 0.00517,
        "execPct": 1.9,
        "ref": "15-02.xls#15-02!106"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": 0.00002,
        "finalOku": 0.25002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!107"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!108"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!109"
      },
      {
        "kan": "災害復旧費",
        "kou": "農林水産業施設災害復旧費",
        "initialOku": 0,
        "finalOku": 0.01843,
        "settledOku": 0.00517,
        "execPct": 28.1,
        "ref": "15-02.xls#15-02!110"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": 75.37688,
        "finalOku": 75.09688,
        "settledOku": 74.98058145,
        "execPct": 99.8,
        "ref": "15-02.xls#15-02!111"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": 75.37688,
        "finalOku": 75.09688,
        "settledOku": 74.98058145,
        "execPct": 99.8,
        "ref": "15-02.xls#15-02!112"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": 1.46952,
        "finalOku": 1.46952,
        "settledOku": 1.46532709,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!113"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!114"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": 1.4695,
        "finalOku": 1.4695,
        "settledOku": 1.46532709,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!115"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": 0.2,
        "finalOku": 0.0885,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!116"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": 0.2,
        "finalOku": 0.0885,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!117"
      }
    ],
    "totals": {
      "initialOku": 744.435,
      "finalOku": 818.34286132,
      "settledOku": 759.86616669
    }
  },
  {
    "fy": "H30",
    "fyLabel": "平成30年度",
    "initialNote": "",
    "sourceTitle": "平成30年度 一般会計歳入歳出状況（甲府市統計書 令和2年版）",
    "sourceUrl": "https://web.archive.org/web/20260712154347/https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-02.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-02.xls",
    "sourceLocalUrl": "/sources/kofu-toukei-zaisei-h30/15-02.xls",
    "revenue": [
      {
        "kan": "市税",
        "kou": null,
        "initialOku": 282.93405,
        "finalOku": 282.93405,
        "settledOku": 293.6817616,
        "execPct": 103.8,
        "ref": "15-01.xls#15-01!5"
      },
      {
        "kan": "市税",
        "kou": "市民税",
        "initialOku": 135.03428,
        "finalOku": 135.03428,
        "settledOku": 141.53254173,
        "execPct": 104.8,
        "ref": "15-01.xls#15-01!6"
      },
      {
        "kan": "市税",
        "kou": "固定資産税",
        "initialOku": 110.85213,
        "finalOku": 110.85213,
        "settledOku": 114.27628166,
        "execPct": 103.1,
        "ref": "15-01.xls#15-01!7"
      },
      {
        "kan": "市税",
        "kou": "軽自動車税",
        "initialOku": 5.17853,
        "finalOku": 5.17853,
        "settledOku": 5.2823313,
        "execPct": 102,
        "ref": "15-01.xls#15-01!8"
      },
      {
        "kan": "市税",
        "kou": "市たばこ税",
        "initialOku": 12.41276,
        "finalOku": 12.41276,
        "settledOku": 12.66052253,
        "execPct": 102,
        "ref": "15-01.xls#15-01!9"
      },
      {
        "kan": "市税",
        "kou": "入湯税",
        "initialOku": 0.24701,
        "finalOku": 0.24701,
        "settledOku": 0.256437,
        "execPct": 103.8,
        "ref": "15-01.xls#15-01!10"
      },
      {
        "kan": "市税",
        "kou": "都市計画税",
        "initialOku": 19.20934,
        "finalOku": 19.20934,
        "settledOku": 19.67364738,
        "execPct": 102.4,
        "ref": "15-01.xls#15-01!11"
      },
      {
        "kan": "地方譲与税",
        "kou": null,
        "initialOku": 4.33173,
        "finalOku": 4.30299,
        "settledOku": 4.11409,
        "execPct": 95.6,
        "ref": "15-01.xls#15-01!12"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方揮発油譲与税",
        "initialOku": 1.18717,
        "finalOku": 1.15843,
        "settledOku": 1.18789,
        "execPct": 102.5,
        "ref": "15-01.xls#15-01!13"
      },
      {
        "kan": "地方譲与税",
        "kou": "自動車重量譲与税",
        "initialOku": 3.14455,
        "finalOku": 3.14455,
        "settledOku": 2.9262,
        "execPct": 93.1,
        "ref": "15-01.xls#15-01!14"
      },
      {
        "kan": "地方譲与税",
        "kou": "地方道路譲与税",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-01.xls#15-01!15"
      },
      {
        "kan": "利子割交付金",
        "kou": null,
        "initialOku": 0.35875,
        "finalOku": 0.41239,
        "settledOku": 0.44439,
        "execPct": 107.8,
        "ref": "15-01.xls#15-01!16"
      },
      {
        "kan": "利子割交付金",
        "kou": "利子割交付金",
        "initialOku": 0.35875,
        "finalOku": 0.41239,
        "settledOku": 0.44439,
        "execPct": 107.8,
        "ref": "15-01.xls#15-01!17"
      },
      {
        "kan": "配当割交付金",
        "kou": null,
        "initialOku": 1.84052,
        "finalOku": 1.84052,
        "settledOku": 0.93444,
        "execPct": 50.8,
        "ref": "15-01.xls#15-01!18"
      },
      {
        "kan": "配当割交付金",
        "kou": "配当割交付金",
        "initialOku": 1.84052,
        "finalOku": 1.84052,
        "settledOku": 0.93444,
        "execPct": 50.8,
        "ref": "15-01.xls#15-01!19"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": null,
        "initialOku": 3.34284,
        "finalOku": 0.78379,
        "settledOku": 0.78379,
        "execPct": 100,
        "ref": "15-01.xls#15-01!20"
      },
      {
        "kan": "株式等譲渡所得割交付金",
        "kou": "株式等譲渡所得割交付金",
        "initialOku": 3.34284,
        "finalOku": 0.78379,
        "settledOku": 0.78379,
        "execPct": 100,
        "ref": "15-01.xls#15-01!21"
      },
      {
        "kan": "地方消費税交付金",
        "kou": null,
        "initialOku": 43.83863,
        "finalOku": 41.97268,
        "settledOku": 39.99059,
        "execPct": 95.3,
        "ref": "15-01.xls#15-01!22"
      },
      {
        "kan": "地方消費税交付金",
        "kou": "地方消費税交付金",
        "initialOku": 43.83863,
        "finalOku": 41.97268,
        "settledOku": 39.99059,
        "execPct": 95.3,
        "ref": "15-01.xls#15-01!23"
      },
      {
        "kan": "自動車取得税交付金",
        "kou": null,
        "initialOku": 1.8266,
        "finalOku": 1.8266,
        "settledOku": 1.33089,
        "execPct": 72.9,
        "ref": "15-01.xls#15-01!24"
      },
      {
        "kan": "自動車取得税交付金",
        "kou": "自動車取得税交付金",
        "initialOku": 1.8266,
        "finalOku": 1.8266,
        "settledOku": 1.33089,
        "execPct": 72.9,
        "ref": "15-01.xls#15-01!25"
      },
      {
        "kan": "地方特例交付金",
        "kou": null,
        "initialOku": 1.28024,
        "finalOku": 1.28024,
        "settledOku": 1.2398,
        "execPct": 96.8,
        "ref": "15-01.xls#15-01!26"
      },
      {
        "kan": "地方特例交付金",
        "kou": "地方特例交付金",
        "initialOku": 1.28024,
        "finalOku": 1.28024,
        "settledOku": 1.2398,
        "execPct": 96.8,
        "ref": "15-01.xls#15-01!27"
      },
      {
        "kan": "地方交付税",
        "kou": null,
        "initialOku": 86.22137,
        "finalOku": 86.22137,
        "settledOku": 78.54281,
        "execPct": 91.1,
        "ref": "15-01.xls#15-01!28"
      },
      {
        "kan": "地方交付税",
        "kou": "地方交付税",
        "initialOku": 86.22137,
        "finalOku": 86.22137,
        "settledOku": 78.54281,
        "execPct": 91.1,
        "ref": "15-01.xls#15-01!29"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": null,
        "initialOku": 0.47111,
        "finalOku": 0.45459,
        "settledOku": 0.441,
        "execPct": 97,
        "ref": "15-01.xls#15-01!30"
      },
      {
        "kan": "交通安全対策特別交付金",
        "kou": "交通安全対策特別交付金",
        "initialOku": 0.47111,
        "finalOku": 0.45459,
        "settledOku": 0.441,
        "execPct": 97,
        "ref": "15-01.xls#15-01!31"
      },
      {
        "kan": "分担金及び負担金",
        "kou": null,
        "initialOku": 6.88105,
        "finalOku": 6.94328,
        "settledOku": 6.3535187,
        "execPct": 91.5,
        "ref": "15-01.xls#15-01!32"
      },
      {
        "kan": "分担金及び負担金",
        "kou": "負担金",
        "initialOku": 6.88105,
        "finalOku": 6.94328,
        "settledOku": 6.3535187,
        "execPct": 91.5,
        "ref": "15-01.xls#15-01!33"
      },
      {
        "kan": "使用料及び手数料",
        "kou": null,
        "initialOku": 9.40438,
        "finalOku": 9.40438,
        "settledOku": 9.1082515,
        "execPct": 96.9,
        "ref": "15-01.xls#15-01!34"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "使用料",
        "initialOku": 7.87061,
        "finalOku": 7.87061,
        "settledOku": 7.61929717,
        "execPct": 96.8,
        "ref": "15-01.xls#15-01!35"
      },
      {
        "kan": "使用料及び手数料",
        "kou": "手数料",
        "initialOku": 1.53377,
        "finalOku": 1.53377,
        "settledOku": 1.48895433,
        "execPct": 97.1,
        "ref": "15-01.xls#15-01!36"
      },
      {
        "kan": "国庫支出金",
        "kou": null,
        "initialOku": 123.96247,
        "finalOku": 142.07871382,
        "settledOku": 128.71330525,
        "execPct": 90.6,
        "ref": "15-01.xls#15-01!37"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫負担金",
        "initialOku": 100.42619,
        "finalOku": 105.6824,
        "settledOku": 104.93842454,
        "execPct": 99.3,
        "ref": "15-01.xls#15-01!38"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫補助金",
        "initialOku": 23.12225,
        "finalOku": 35.98228382,
        "settledOku": 23.39450129,
        "execPct": 65,
        "ref": "15-01.xls#15-01!39"
      },
      {
        "kan": "国庫支出金",
        "kou": "国庫委託金",
        "initialOku": 0.41403,
        "finalOku": 0.41403,
        "settledOku": 0.38037942,
        "execPct": 91.9,
        "ref": "15-01.xls#15-01!40"
      },
      {
        "kan": "県支出金",
        "kou": null,
        "initialOku": 55.98525,
        "finalOku": 66.43712,
        "settledOku": 58.9443665,
        "execPct": 88.7,
        "ref": "15-01.xls#15-01!41"
      },
      {
        "kan": "県支出金",
        "kou": "県負担金",
        "initialOku": 35.0673,
        "finalOku": 36.13872,
        "settledOku": 34.86843699,
        "execPct": 96.5,
        "ref": "15-01.xls#15-01!42"
      },
      {
        "kan": "県支出金",
        "kou": "県補助金",
        "initialOku": 16.81299,
        "finalOku": 25.94479,
        "settledOku": 20.02546256,
        "execPct": 77.2,
        "ref": "15-01.xls#15-01!43"
      },
      {
        "kan": "県支出金",
        "kou": "県委託金",
        "initialOku": 4.10496,
        "finalOku": 4.35361,
        "settledOku": 4.05046695,
        "execPct": 93,
        "ref": "15-01.xls#15-01!44"
      },
      {
        "kan": "財産収入",
        "kou": null,
        "initialOku": 1.60955,
        "finalOku": 1.60955,
        "settledOku": 1.41555386,
        "execPct": 87.9,
        "ref": "15-01.xls#15-01!45"
      },
      {
        "kan": "財産収入",
        "kou": "財産運用収入",
        "initialOku": 0.50254,
        "finalOku": 0.50254,
        "settledOku": 0.52484864,
        "execPct": 104.4,
        "ref": "15-01.xls#15-01!46"
      },
      {
        "kan": "財産収入",
        "kou": "財産売払収入",
        "initialOku": 1.10701,
        "finalOku": 1.10701,
        "settledOku": 0.89070522,
        "execPct": 80.5,
        "ref": "15-01.xls#15-01!47"
      },
      {
        "kan": "寄附金",
        "kou": null,
        "initialOku": 0.75001,
        "finalOku": 1.26801,
        "settledOku": 1.24377308,
        "execPct": 98.1,
        "ref": "15-01.xls#15-01!48"
      },
      {
        "kan": "寄附金",
        "kou": "寄附金",
        "initialOku": 0.75001,
        "finalOku": 1.26801,
        "settledOku": 1.24377308,
        "execPct": 98.1,
        "ref": "15-01.xls#15-01!49"
      },
      {
        "kan": "繰入金",
        "kou": null,
        "initialOku": 5.39957,
        "finalOku": 9.74757,
        "settledOku": 7.39512201,
        "execPct": 75.9,
        "ref": "15-01.xls#15-01!50"
      },
      {
        "kan": "繰入金",
        "kou": "基金繰入金",
        "initialOku": 5.39957,
        "finalOku": 9.74757,
        "settledOku": 7.39512201,
        "execPct": 75.9,
        "ref": "15-01.xls#15-01!51"
      },
      {
        "kan": "繰越金",
        "kou": null,
        "initialOku": 0.00001,
        "finalOku": 6.04623902,
        "settledOku": 6.04623447,
        "execPct": 100,
        "ref": "15-01.xls#15-01!52"
      },
      {
        "kan": "繰越金",
        "kou": "繰越金",
        "initialOku": 0.00001,
        "finalOku": 6.04623902,
        "settledOku": 6.04623447,
        "execPct": 100,
        "ref": "15-01.xls#15-01!53"
      },
      {
        "kan": "諸収入",
        "kou": null,
        "initialOku": 16.96517,
        "finalOku": 17.54311,
        "settledOku": 14.03014931,
        "execPct": 80,
        "ref": "15-01.xls#15-01!54"
      },
      {
        "kan": "諸収入",
        "kou": "延滞金加算金及び過料",
        "initialOku": 0.45163,
        "finalOku": 0.45163,
        "settledOku": 0.53253948,
        "execPct": 117.9,
        "ref": "15-01.xls#15-01!55"
      },
      {
        "kan": "諸収入",
        "kou": "市預金利子",
        "initialOku": 0.00353,
        "finalOku": 0.00353,
        "settledOku": 0.00283461,
        "execPct": 80.3,
        "ref": "15-01.xls#15-01!56"
      },
      {
        "kan": "諸収入",
        "kou": "貸付金元利収入",
        "initialOku": 8.96018,
        "finalOku": 8.96018,
        "settledOku": 5.05459546,
        "execPct": 56.4,
        "ref": "15-01.xls#15-01!57"
      },
      {
        "kan": "諸収入",
        "kou": "受託事業収入",
        "initialOku": 0.0212,
        "finalOku": 0.0212,
        "settledOku": 0.02318789,
        "execPct": 109.4,
        "ref": "15-01.xls#15-01!58"
      },
      {
        "kan": "諸収入",
        "kou": "雑入",
        "initialOku": 7.52863,
        "finalOku": 8.10657,
        "settledOku": 8.41699187,
        "execPct": 103.8,
        "ref": "15-01.xls#15-01!59"
      },
      {
        "kan": "市債",
        "kou": null,
        "initialOku": 98.971,
        "finalOku": 111.552,
        "settledOku": 95.859,
        "execPct": 85.9,
        "ref": "15-01.xls#15-01!60"
      },
      {
        "kan": "市債",
        "kou": "市債",
        "initialOku": 98.971,
        "finalOku": 111.552,
        "settledOku": 95.859,
        "execPct": 85.9,
        "ref": "15-01.xls#15-01!61"
      }
    ],
    "expenditure": [
      {
        "kan": "議会費",
        "kou": null,
        "initialOku": 5.39699,
        "finalOku": 5.42205,
        "settledOku": 5.3165913,
        "execPct": 98.1,
        "ref": "15-02.xls#15-02!5"
      },
      {
        "kan": "議会費",
        "kou": "議会費",
        "initialOku": 5.39699,
        "finalOku": 5.42205,
        "settledOku": 5.3165913,
        "execPct": 98.1,
        "ref": "15-02.xls#15-02!6"
      },
      {
        "kan": "総務費",
        "kou": null,
        "initialOku": 72.07427,
        "finalOku": 76.13792,
        "settledOku": 73.56789879,
        "execPct": 96.6,
        "ref": "15-02.xls#15-02!7"
      },
      {
        "kan": "総務費",
        "kou": "総務管理費",
        "initialOku": 57.1667,
        "finalOku": 61.49968,
        "settledOku": 59.86487901,
        "execPct": 97.3,
        "ref": "15-02.xls#15-02!8"
      },
      {
        "kan": "総務費",
        "kou": "徴税費",
        "initialOku": 8.35451,
        "finalOku": 8.29274,
        "settledOku": 8.19291185,
        "execPct": 98.8,
        "ref": "15-02.xls#15-02!9"
      },
      {
        "kan": "総務費",
        "kou": "戸籍住民基本台帳費",
        "initialOku": 3.48594,
        "finalOku": 3.16033,
        "settledOku": 2.90188873,
        "execPct": 91.8,
        "ref": "15-02.xls#15-02!10"
      },
      {
        "kan": "総務費",
        "kou": "選挙費",
        "initialOku": 1.96033,
        "finalOku": 2.07834,
        "settledOku": 1.53740822,
        "execPct": 74,
        "ref": "15-02.xls#15-02!11"
      },
      {
        "kan": "総務費",
        "kou": "統計調査費",
        "initialOku": 0.409,
        "finalOku": 0.3636,
        "settledOku": 0.33358202,
        "execPct": 91.7,
        "ref": "15-02.xls#15-02!12"
      },
      {
        "kan": "総務費",
        "kou": "監査委員費",
        "initialOku": 0.69779,
        "finalOku": 0.74323,
        "settledOku": 0.73722896,
        "execPct": 99.2,
        "ref": "15-02.xls#15-02!13"
      },
      {
        "kan": "民生費",
        "kou": null,
        "initialOku": 306.61654,
        "finalOku": 323.13094,
        "settledOku": 315.87714192,
        "execPct": 97.8,
        "ref": "15-02.xls#15-02!14"
      },
      {
        "kan": "民生費",
        "kou": "社会福祉費",
        "initialOku": 143.83506,
        "finalOku": 156.00503,
        "settledOku": 151.96675643,
        "execPct": 97.4,
        "ref": "15-02.xls#15-02!15"
      },
      {
        "kan": "民生費",
        "kou": "児童福祉費",
        "initialOku": 110.10012,
        "finalOku": 110.94001,
        "settledOku": 109.30289805,
        "execPct": 98.5,
        "ref": "15-02.xls#15-02!16"
      },
      {
        "kan": "民生費",
        "kou": "生活保護費",
        "initialOku": 52.67886,
        "finalOku": 56.1834,
        "settledOku": 54.60621898,
        "execPct": 97.2,
        "ref": "15-02.xls#15-02!17"
      },
      {
        "kan": "民生費",
        "kou": "災害救助費",
        "initialOku": 0.0025,
        "finalOku": 0.0025,
        "settledOku": 0.00126846,
        "execPct": 50.7,
        "ref": "15-02.xls#15-02!18"
      },
      {
        "kan": "衛生費",
        "kou": null,
        "initialOku": 100.57074,
        "finalOku": 104.135868,
        "settledOku": 95.560115,
        "execPct": 91.8,
        "ref": "15-02.xls#15-02!19"
      },
      {
        "kan": "衛生費",
        "kou": "保健衛生費",
        "initialOku": 30.93547,
        "finalOku": 36.439308,
        "settledOku": 34.27537238,
        "execPct": 94.1,
        "ref": "15-02.xls#15-02!20"
      },
      {
        "kan": "衛生費",
        "kou": "清掃費",
        "initialOku": 33.69008,
        "finalOku": 31.75137,
        "settledOku": 25.37578146,
        "execPct": 79.9,
        "ref": "15-02.xls#15-02!21"
      },
      {
        "kan": "衛生費",
        "kou": "下水道費",
        "initialOku": 35.605,
        "finalOku": 35.605,
        "settledOku": 35.59554,
        "execPct": 100,
        "ref": "15-02.xls#15-02!22"
      },
      {
        "kan": "衛生費",
        "kou": "上水道費",
        "initialOku": 0.34019,
        "finalOku": 0.34019,
        "settledOku": 0.31342116,
        "execPct": 92.1,
        "ref": "15-02.xls#15-02!23"
      },
      {
        "kan": "労働費",
        "kou": null,
        "initialOku": 3.23463,
        "finalOku": 3.23792,
        "settledOku": 3.07938621,
        "execPct": 95.1,
        "ref": "15-02.xls#15-02!24"
      },
      {
        "kan": "労働費",
        "kou": "労働諸費",
        "initialOku": 3.23463,
        "finalOku": 3.23792,
        "settledOku": 3.07938621,
        "execPct": 95.1,
        "ref": "15-02.xls#15-02!25"
      },
      {
        "kan": "農林水産業費",
        "kou": null,
        "initialOku": 8.35714,
        "finalOku": 9.12563,
        "settledOku": 8.23702802,
        "execPct": 90.3,
        "ref": "15-02.xls#15-02!26"
      },
      {
        "kan": "農林水産業費",
        "kou": "農業費",
        "initialOku": 6.09771,
        "finalOku": 6.82977,
        "settledOku": 6.1344742,
        "execPct": 89.8,
        "ref": "15-02.xls#15-02!27"
      },
      {
        "kan": "農林水産業費",
        "kou": "林業費",
        "initialOku": 1.45543,
        "finalOku": 1.49186,
        "settledOku": 1.29855382,
        "execPct": 87,
        "ref": "15-02.xls#15-02!28"
      },
      {
        "kan": "農林水産業費",
        "kou": "地方卸売市場費",
        "initialOku": 0.804,
        "finalOku": 0.804,
        "settledOku": 0.804,
        "execPct": 100,
        "ref": "15-02.xls#15-02!29"
      },
      {
        "kan": "商工費",
        "kou": null,
        "initialOku": 9.83538,
        "finalOku": 9.76755,
        "settledOku": 5.69657721,
        "execPct": 58.3,
        "ref": "15-02.xls#15-02!30"
      },
      {
        "kan": "商工費",
        "kou": "商工費",
        "initialOku": 9.83538,
        "finalOku": 9.76755,
        "settledOku": 5.69657721,
        "execPct": 58.3,
        "ref": "15-02.xls#15-02!31"
      },
      {
        "kan": "土木費",
        "kou": null,
        "initialOku": 61.39535,
        "finalOku": 89.42463124,
        "settledOku": 63.37794881,
        "execPct": 70.9,
        "ref": "15-02.xls#15-02!32"
      },
      {
        "kan": "土木費",
        "kou": "道路橋りょう費",
        "initialOku": 16.50799,
        "finalOku": 19.2799082,
        "settledOku": 16.53058595,
        "execPct": 85.7,
        "ref": "15-02.xls#15-02!33"
      },
      {
        "kan": "土木費",
        "kou": "河川費",
        "initialOku": 0.89825,
        "finalOku": 0.93831,
        "settledOku": 0.68880607,
        "execPct": 73.4,
        "ref": "15-02.xls#15-02!34"
      },
      {
        "kan": "土木費",
        "kou": "都市計画費",
        "initialOku": 38.37072,
        "finalOku": 63.82997304,
        "settledOku": 41.1758887,
        "execPct": 64.5,
        "ref": "15-02.xls#15-02!35"
      },
      {
        "kan": "土木費",
        "kou": "住宅費",
        "initialOku": 5.61839,
        "finalOku": 5.37644,
        "settledOku": 4.98266809,
        "execPct": 92.7,
        "ref": "15-02.xls#15-02!36"
      },
      {
        "kan": "消防費",
        "kou": null,
        "initialOku": 23.01915,
        "finalOku": 23.079204,
        "settledOku": 22.94049076,
        "execPct": 99.4,
        "ref": "15-02.xls#15-02!37"
      },
      {
        "kan": "消防費",
        "kou": "消防費",
        "initialOku": 23.01915,
        "finalOku": 23.079204,
        "settledOku": 22.94049076,
        "execPct": 99.4,
        "ref": "15-02.xls#15-02!38"
      },
      {
        "kan": "教育費",
        "kou": null,
        "initialOku": 70.76876,
        "finalOku": 66.3546796,
        "settledOku": 62.63338662,
        "execPct": 94.4,
        "ref": "15-02.xls#15-02!39"
      },
      {
        "kan": "教育費",
        "kou": "教育総務費",
        "initialOku": 3.23923,
        "finalOku": 3.35887,
        "settledOku": 3.19681405,
        "execPct": 95.2,
        "ref": "15-02.xls#15-02!40"
      },
      {
        "kan": "教育費",
        "kou": "小学校費",
        "initialOku": 28.55086,
        "finalOku": 23.81093,
        "settledOku": 22.8585159,
        "execPct": 96,
        "ref": "15-02.xls#15-02!41"
      },
      {
        "kan": "教育費",
        "kou": "中学校費",
        "initialOku": 10.19296,
        "finalOku": 7.78855,
        "settledOku": 7.32436102,
        "execPct": 94,
        "ref": "15-02.xls#15-02!42"
      },
      {
        "kan": "教育費",
        "kou": "高等学校費",
        "initialOku": 8.16409,
        "finalOku": 8.27402,
        "settledOku": 7.99900871,
        "execPct": 96.7,
        "ref": "15-02.xls#15-02!43"
      },
      {
        "kan": "教育費",
        "kou": "専門学校費",
        "initialOku": 1.46574,
        "finalOku": 1.41487,
        "settledOku": 1.37524466,
        "execPct": 97.2,
        "ref": "15-02.xls#15-02!44"
      },
      {
        "kan": "教育費",
        "kou": "社会教育費",
        "initialOku": 15.05455,
        "finalOku": 18.0317796,
        "settledOku": 16.33258683,
        "execPct": 90.6,
        "ref": "15-02.xls#15-02!45"
      },
      {
        "kan": "教育費",
        "kou": "社会体育費",
        "initialOku": 2.87462,
        "finalOku": 2.4428,
        "settledOku": 2.35433256,
        "execPct": 96.4,
        "ref": "15-02.xls#15-02!46"
      },
      {
        "kan": "教育費",
        "kou": "幼児教育振興費",
        "initialOku": 1.22671,
        "finalOku": 1.23286,
        "settledOku": 1.19252289,
        "execPct": 96.7,
        "ref": "15-02.xls#15-02!47"
      },
      {
        "kan": "災害復旧費",
        "kou": null,
        "initialOku": 0.00004,
        "finalOku": 0.01862,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!48"
      },
      {
        "kan": "災害復旧費",
        "kou": "公共土木施設災害復旧費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!49"
      },
      {
        "kan": "災害復旧費",
        "kou": "文教施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!50"
      },
      {
        "kan": "災害復旧費",
        "kou": "その他公共施設公用施設災害復旧費",
        "initialOku": 0.00001,
        "finalOku": 0.00001,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!51"
      },
      {
        "kan": "災害復旧費",
        "kou": "農林水産業施設災害復旧費",
        "initialOku": 0,
        "finalOku": 0.01858,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!52"
      },
      {
        "kan": "公債費",
        "kou": null,
        "initialOku": 83.42115,
        "finalOku": 83.24115,
        "settledOku": 83.12470912,
        "execPct": 99.9,
        "ref": "15-02.xls#15-02!53"
      },
      {
        "kan": "公債費",
        "kou": "公債費",
        "initialOku": 83.42115,
        "finalOku": 83.24115,
        "settledOku": 83.12470912,
        "execPct": 99.9,
        "ref": "15-02.xls#15-02!54"
      },
      {
        "kan": "諸支出金",
        "kou": null,
        "initialOku": 1.48416,
        "finalOku": 1.48416,
        "settledOku": 1.48019749,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!55"
      },
      {
        "kan": "諸支出金",
        "kou": "普通財産取得費",
        "initialOku": 0.00002,
        "finalOku": 0.00002,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!56"
      },
      {
        "kan": "諸支出金",
        "kou": "土地開発基金費",
        "initialOku": 1.48414,
        "finalOku": 1.48414,
        "settledOku": 1.48019749,
        "execPct": 99.7,
        "ref": "15-02.xls#15-02!57"
      },
      {
        "kan": "予備費",
        "kou": null,
        "initialOku": 0.2,
        "finalOku": 0.09887,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!58"
      },
      {
        "kan": "予備費",
        "kou": "予備費",
        "initialOku": 0.2,
        "finalOku": 0.09887,
        "settledOku": 0,
        "execPct": 0,
        "ref": "15-02.xls#15-02!59"
      }
    ],
    "totals": {
      "initialOku": 746.3743,
      "finalOku": 794.65919284,
      "settledOku": 740.89147125
    }
  }
];
