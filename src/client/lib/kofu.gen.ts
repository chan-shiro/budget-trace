// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 当初予算資料 R8・R7・R6（各年度の sha256 は evidence 参照）
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
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先。パース時点の版に固定） */
  sourceUrl: string;
  /** 発行元の元 URL */
  originUrl: string;
  pagesLabel: string;
  revenue: KofuKanRow[];
  expenditure: KofuKanRow[];
  evidence: { title: string; type: string; url: string; source: string; thumb: string }[];
}

/** 収録済みの当初予算（新しい年度順） */
export const KOFU_BUDGET_YEARS: KofuBudgetYear[] = [
  {
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 183850,
    "populationLabel": "住民基本台帳人口（令7.1.1現在）",
    "totalOku": 917.8706,
    "prevTotalOku": 880.85032,
    "yoyLabel": "+4.2%",
    "sourceTitle": "令和8年度 甲府市当初予算（案）資料",
    "sourceUrl": "https://web.archive.org/web/20260712083450/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
    "pagesLabel": "p.12–13",
    "revenue": [
      {
        "name": "市税",
        "v": 317.26983,
        "prevV": 308.74557,
        "yoy": 2.8,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "国庫支出金",
        "v": 172.87017,
        "prevV": 163.09329,
        "yoy": 6,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "地方交付税",
        "v": 111.36034,
        "prevV": 116.48938,
        "yoy": -4.4,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "県支出金",
        "v": 78.74863,
        "prevV": 69.0137,
        "yoy": 14.1,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "地方消費税交付金",
        "v": 59.88188,
        "prevV": 51.36472,
        "yoy": 16.6,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "繰入金",
        "v": 51.48784,
        "prevV": 26.96998,
        "yoy": 90.9,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "諸収入・その他",
        "v": 48.56191,
        "prevV": 59.95868,
        "yoy": -19,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 13.61948,
            "prevV": 27.09616,
            "yoy": -49.7,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.51077,
            "prevV": 9.51854,
            "yoy": -0.1,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "法人事業税交付金",
            "v": 6.83802,
            "prevV": 6.59498,
            "yoy": 3.7,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "地方譲与税",
            "v": 4.137,
            "prevV": 4.21887,
            "yoy": -1.9,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 3.41771,
            "prevV": 3.04016,
            "yoy": 12.4,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "地方特例交付金",
            "v": 2.55287,
            "prevV": 1.57128,
            "yoy": 62.5,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "分担金及び負担金",
            "v": 2.54892,
            "prevV": 3.61101,
            "yoy": -29.4,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "配当割交付金",
            "v": 2.51406,
            "prevV": 1.79091,
            "yoy": 40.4,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "財産収入",
            "v": 2.22573,
            "prevV": 1.24827,
            "yoy": 78.3,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "利子割交付金",
            "v": 0.95384,
            "prevV": 0.26377,
            "yoy": 261.6,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.24349,
            "prevV": 0.24729,
            "yoy": -1.5,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.00001,
            "prevV": 0.75743,
            "yoy": -100,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0,
            "ref": "r8toushoyosansiryou.pdf#p12",
            "refLabel": "予算書 p.12"
          }
        ]
      },
      {
        "name": "寄附金",
        "v": 45,
        "prevV": 45,
        "yoy": 0,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      },
      {
        "name": "市債",
        "v": 32.69,
        "prevV": 40.215,
        "yoy": -18.7,
        "ref": "r8toushoyosansiryou.pdf#p12",
        "refLabel": "予算書 p.12"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 389.33883,
        "prevV": 374.79942,
        "yoy": 3.9,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "総務費",
        "v": 135.43426,
        "prevV": 128.86262,
        "yoy": 5.1,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "衛生費",
        "v": 100.76455,
        "prevV": 99.14807,
        "yoy": 1.6,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "教育費",
        "v": 87.61949,
        "prevV": 72.52687,
        "yoy": 20.8,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "公債費",
        "v": 80.3194,
        "prevV": 84.6201,
        "yoy": -5.1,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "土木費",
        "v": 67.4764,
        "prevV": 63.49364,
        "yoy": 6.3,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "消防費",
        "v": 24.65054,
        "prevV": 28.67454,
        "yoy": -14,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "商工費",
        "v": 13.74128,
        "prevV": 9.93399,
        "yoy": 38.3,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "農林水産業費",
        "v": 10.96478,
        "prevV": 11.4603,
        "yoy": -4.3,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "議会費",
        "v": 5.48396,
        "prevV": 5.35662,
        "yoy": 2.4,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "労働費",
        "v": 1.59523,
        "prevV": 1.62331,
        "yoy": -1.7,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "諸支出金",
        "v": 0.28184,
        "prevV": 0.1508,
        "yoy": 86.9,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "r8toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      }
    ],
    "evidence": [
      {
        "title": "令和8年度 甲府市当初予算（案）資料",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712083450/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r8toushoyosansiryou.pdf ・ sha256 9a3cb9417077a9d3… ・ 2026-07-11 取得"
      }
    ]
  },
  {
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 183850,
    "populationLabel": "住民基本台帳人口（令7.1.1現在）",
    "totalOku": 880.85032,
    "prevTotalOku": 807.93965,
    "yoyLabel": "+9.0%",
    "sourceTitle": "令和7年度 甲府市当初予算資料",
    "sourceUrl": "https://web.archive.org/web/20260712085206/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
    "pagesLabel": "p.13–14",
    "revenue": [
      {
        "name": "市税",
        "v": 308.74557,
        "prevV": 291.27765,
        "yoy": 6,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "国庫支出金",
        "v": 163.09329,
        "prevV": 143.33127,
        "yoy": 13.8,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "地方交付税",
        "v": 116.48938,
        "prevV": 113.55951,
        "yoy": 2.6,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "県支出金",
        "v": 69.0137,
        "prevV": 65.00382,
        "yoy": 6.2,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "諸収入・その他",
        "v": 59.95868,
        "prevV": 58.02385,
        "yoy": 3.3,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 27.09616,
            "prevV": 20.38399,
            "yoy": 32.9,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.51854,
            "prevV": 9.41344,
            "yoy": 1.1,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "法人事業税交付金",
            "v": 6.59498,
            "prevV": 6.0046,
            "yoy": 9.8,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "地方譲与税",
            "v": 4.21887,
            "prevV": 4.25749,
            "yoy": -0.9,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "分担金及び負担金",
            "v": 3.61101,
            "prevV": 3.38924,
            "yoy": 6.5,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 3.04016,
            "prevV": 1.29809,
            "yoy": 134.2,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "配当割交付金",
            "v": 1.79091,
            "prevV": 1.436,
            "yoy": 24.7,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "地方特例交付金",
            "v": 1.57128,
            "prevV": 9.61976,
            "yoy": -83.7,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "財産収入",
            "v": 1.24827,
            "prevV": 1.08275,
            "yoy": 15.3,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.75743,
            "prevV": 0.72049,
            "yoy": 5.1,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "利子割交付金",
            "v": 0.26377,
            "prevV": 0.07744,
            "yoy": 240.6,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.24729,
            "prevV": 0.34055,
            "yoy": -27.4,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0,
            "ref": "r7toushoyosansiryou.pdf#p13",
            "refLabel": "予算書 p.13"
          }
        ]
      },
      {
        "name": "地方消費税交付金",
        "v": 51.36472,
        "prevV": 50.78626,
        "yoy": 1.1,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "寄附金",
        "v": 45,
        "prevV": 30,
        "yoy": 50,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "市債",
        "v": 40.215,
        "prevV": 32.238,
        "yoy": 24.7,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      },
      {
        "name": "繰入金",
        "v": 26.96998,
        "prevV": 23.71929,
        "yoy": 13.7,
        "ref": "r7toushoyosansiryou.pdf#p13",
        "refLabel": "予算書 p.13"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 374.79942,
        "prevV": 342.35607,
        "yoy": 9.5,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "総務費",
        "v": 128.86262,
        "prevV": 97.04066,
        "yoy": 32.8,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "衛生費",
        "v": 99.14807,
        "prevV": 96.56308,
        "yoy": 2.7,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "公債費",
        "v": 84.6201,
        "prevV": 87.47687,
        "yoy": -3.3,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "教育費",
        "v": 72.52687,
        "prevV": 69.92413,
        "yoy": 3.7,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "土木費",
        "v": 63.49364,
        "prevV": 58.65137,
        "yoy": 8.3,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "消防費",
        "v": 28.67454,
        "prevV": 23.51926,
        "yoy": 21.9,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "農林水産業費",
        "v": 11.4603,
        "prevV": 11.03256,
        "yoy": 3.9,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "商工費",
        "v": 9.93399,
        "prevV": 13.73947,
        "yoy": -27.7,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "議会費",
        "v": 5.35662,
        "prevV": 5.41205,
        "yoy": -1,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "労働費",
        "v": 1.62331,
        "prevV": 1.88232,
        "yoy": -13.8,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "諸支出金",
        "v": 0.1508,
        "prevV": 0.14177,
        "yoy": 6.4,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "r7toushoyosansiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      }
    ],
    "evidence": [
      {
        "title": "令和7年度 甲府市当初予算資料",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712085206/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r7toushoyosansiryou.pdf ・ sha256 8c98435dc455afbb… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R6",
    "fyLabel": "令和6年度 当初予算",
    "population": 184827,
    "populationLabel": "住民基本台帳人口（令6.1.1現在）",
    "totalOku": 807.93965,
    "prevTotalOku": 799.38632,
    "yoyLabel": "+1.1%",
    "sourceTitle": "令和6年度 甲府市当初予算資料",
    "sourceUrl": "https://web.archive.org/web/20260712085452/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
    "pagesLabel": "p.15–16",
    "revenue": [
      {
        "name": "市税",
        "v": 291.27765,
        "prevV": 291.8569,
        "yoy": -0.2,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "国庫支出金",
        "v": 143.33127,
        "prevV": 153.88206,
        "yoy": -6.9,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "地方交付税",
        "v": 113.55951,
        "prevV": 108.55444,
        "yoy": 4.6,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "県支出金",
        "v": 65.00382,
        "prevV": 67.97854,
        "yoy": -4.4,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "諸収入・その他",
        "v": 58.02385,
        "prevV": 46.33454,
        "yoy": 25.2,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 20.38399,
            "prevV": 18.21382,
            "yoy": 11.9,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "地方特例交付金",
            "v": 9.61976,
            "prevV": 1.64445,
            "yoy": 485,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.41344,
            "prevV": 9.29798,
            "yoy": 1.2,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "法人事業税交付金",
            "v": 6.0046,
            "prevV": 5.68564,
            "yoy": 5.6,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "地方譲与税",
            "v": 4.25749,
            "prevV": 4.26027,
            "yoy": -0.1,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "分担金及び負担金",
            "v": 3.38924,
            "prevV": 2.96923,
            "yoy": 14.1,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "配当割交付金",
            "v": 1.436,
            "prevV": 1.69013,
            "yoy": -15,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.29809,
            "prevV": 0.87709,
            "yoy": 48,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "財産収入",
            "v": 1.08275,
            "prevV": 0.89702,
            "yoy": 20.7,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.72049,
            "prevV": 0.32902,
            "yoy": 119,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.34055,
            "prevV": 0.3897,
            "yoy": -12.6,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "利子割交付金",
            "v": 0.07744,
            "prevV": 0.07981,
            "yoy": -3,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00038,
            "yoy": -97.4,
            "ref": "03r6tousyoshiryou.pdf#p15",
            "refLabel": "予算書 p.15"
          }
        ]
      },
      {
        "name": "地方消費税交付金",
        "v": 50.78626,
        "prevV": 51.85752,
        "yoy": -2.1,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "市債",
        "v": 32.238,
        "prevV": 38.526,
        "yoy": -16.3,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "寄附金",
        "v": 30,
        "prevV": 22,
        "yoy": 36.4,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "繰入金",
        "v": 23.71929,
        "prevV": 18.39632,
        "yoy": 28.9,
        "ref": "03r6tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 342.35607,
        "prevV": 343.02117,
        "yoy": -0.2,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "総務費",
        "v": 97.04066,
        "prevV": 85.80262,
        "yoy": 13.1,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "衛生費",
        "v": 96.56308,
        "prevV": 107.68953,
        "yoy": -10.3,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "公債費",
        "v": 87.47687,
        "prevV": 89.57254,
        "yoy": -2.3,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "教育費",
        "v": 69.92413,
        "prevV": 64.34534,
        "yoy": 8.7,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "土木費",
        "v": 58.65137,
        "prevV": 57.48743,
        "yoy": 2,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "消防費",
        "v": 23.51926,
        "prevV": 24.39638,
        "yoy": -3.6,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "商工費",
        "v": 13.73947,
        "prevV": 9.01715,
        "yoy": 52.4,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "農林水産業費",
        "v": 11.03256,
        "prevV": 10.35133,
        "yoy": 6.6,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "議会費",
        "v": 5.41205,
        "prevV": 5.41594,
        "yoy": -0.1,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "労働費",
        "v": 1.88232,
        "prevV": 1.94505,
        "yoy": -3.2,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "諸支出金",
        "v": 0.14177,
        "prevV": 0.1418,
        "yoy": 0,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "03r6tousyoshiryou.pdf#p16",
        "refLabel": "予算書 p.16"
      }
    ],
    "evidence": [
      {
        "title": "令和6年度 甲府市当初予算資料",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712085452/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "03r6tousyoshiryou.pdf ・ sha256 1f07ed8057a696ba… ・ 2026-07-12 取得"
      }
    ]
  }
];

/** 最新年度（互換用） */
export const KOFU_BUDGET: KofuBudgetYear = KOFU_BUDGET_YEARS[0]!;
