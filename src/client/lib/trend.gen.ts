// このファイルは自動生成です。手で編集しないこと。
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

export const KOFU_TREND: KofuTrendRow[] = [
  {
    "fy": "R2",
    "fyLabel": "令和2年度",
    "expenditureTotalOku": 961.83075,
    "revenueTotalOku": 977.66417,
    "population": 187048,
    "financialIndex": 0.76,
    "keijoShushiPct": 95.8,
    "jisshitsuKosaihiPct": 7,
    "byPurpose": {
      "議会費": 5.30091,
      "総務費": 272.94667,
      "民生費": 341.27048,
      "衛生費": 64.40822,
      "農林水産業費": 7.19412,
      "商工費": 14.58464,
      "土木費": 79.17042,
      "消防費": 24.07398,
      "教育費": 74.95654,
      "災害復旧費": 0.14212,
      "公債費": 75.44239,
      "労働費": 2.34026
    },
    "landingUrl": "https://www.soumu.go.jp/iken/zaisei/r02_shichouson.html",
    "ref": "000800819.xlsx 436行目"
  },
  {
    "fy": "R3",
    "fyLabel": "令和3年度",
    "expenditureTotalOku": 841.30075,
    "revenueTotalOku": 881.11485,
    "population": 186249,
    "financialIndex": 0.74,
    "keijoShushiPct": 88.8,
    "jisshitsuKosaihiPct": 7.6,
    "byPurpose": {
      "議会費": 5.27537,
      "総務費": 104.11379,
      "民生費": 386.82772,
      "衛生費": 90.14484,
      "農林水産業費": 9.11953,
      "商工費": 10.60131,
      "土木費": 66.08904,
      "消防費": 21.76406,
      "教育費": 65.37119,
      "公債費": 79.89519,
      "労働費": 2.09871
    },
    "landingUrl": "https://www.soumu.go.jp/iken/zaisei/r03_shichouson.html",
    "ref": "000871018.xlsx 436行目"
  },
  {
    "fy": "R4",
    "fyLabel": "令和4年度",
    "expenditureTotalOku": 853.16489,
    "revenueTotalOku": 873.14176,
    "population": 186393,
    "financialIndex": 0.72,
    "keijoShushiPct": 93.8,
    "jisshitsuKosaihiPct": 8,
    "byPurpose": {
      "議会費": 5.28654,
      "総務費": 100.008,
      "民生費": 380.55838,
      "衛生費": 89.50954,
      "農林水産業費": 9.31711,
      "商工費": 16.3218,
      "土木費": 71.10317,
      "消防費": 22.86778,
      "教育費": 72.41807,
      "公債費": 83.84582,
      "労働費": 1.92868
    },
    "landingUrl": "https://www.soumu.go.jp/iken/zaisei/r04_shichouson.html",
    "ref": "000937287.xlsx 436行目"
  },
  {
    "fy": "R5",
    "fyLabel": "令和5年度",
    "expenditureTotalOku": 846.01518,
    "revenueTotalOku": 868.08533,
    "population": 184827,
    "financialIndex": 0.71,
    "keijoShushiPct": 91.7,
    "jisshitsuKosaihiPct": 8.3,
    "byPurpose": {
      "議会費": 5.22777,
      "総務費": 105.85672,
      "民生費": 385.80159,
      "衛生費": 73.8086,
      "農林水産業費": 8.65314,
      "商工費": 13.90931,
      "土木費": 74.01478,
      "消防費": 23.66559,
      "教育費": 70.65836,
      "公債費": 82.54889,
      "労働費": 1.87043
    },
    "landingUrl": "https://www.soumu.go.jp/iken/zaisei/r05_shichouson.html",
    "ref": "000999900.xlsx 436行目"
  },
  {
    "fy": "R6",
    "fyLabel": "令和6年度",
    "expenditureTotalOku": 894.78327,
    "revenueTotalOku": 910.88026,
    "population": 183850,
    "financialIndex": 0.71,
    "keijoShushiPct": 89.1,
    "jisshitsuKosaihiPct": 8.4,
    "byPurpose": {
      "議会費": 5.2831,
      "総務費": 151.42765,
      "民生費": 383.68635,
      "衛生費": 67.99322,
      "農林水産業費": 8.42624,
      "商工費": 17.14802,
      "土木費": 74.15024,
      "消防費": 23.1131,
      "教育費": 80.26974,
      "公債費": 81.44925,
      "労働費": 1.83636
    },
    "landingUrl": "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html",
    "ref": "001061669.xlsx 436行目"
  }
];
