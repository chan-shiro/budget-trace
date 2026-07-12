// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 当初予算資料 R8・R7・R6・R5・R4・R3・R2（各年度の sha256 は evidence 参照）
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
  /** 前年度額の基準。"補正後" の年（R2）は前年が当初予算額でない点に注意 */
  prevBasis: "当初" | "補正後";
  /** 前年度列の資料注記（原文。無ければ空文字） */
  prevNote: string;
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先。パース時点の版に固定） */
  sourceUrl: string;
  /** 発行元の元 URL */
  originUrl: string;
  /** 自サーバー配信の原本コピー（/sources/...。ドロワーでのその場レビュー用） */
  sourceLocalUrl: string;
  pagesLabel: string;
  revenue: KofuKanRow[];
  expenditure: KofuKanRow[];
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
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
    "prevBasis": "当初",
    "prevNote": "",
    "sourceTitle": "令和8年度 甲府市当初予算（案）資料",
    "sourceUrl": "https://web.archive.org/web/20260712083450/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r8/r8toushoyosansiryou.pdf",
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
        "localUrl": "/sources/kofu-yosansho-r8/r8toushoyosansiryou.pdf",
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
    "prevBasis": "当初",
    "prevNote": "",
    "sourceTitle": "令和7年度 甲府市当初予算資料",
    "sourceUrl": "https://web.archive.org/web/20260712085206/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r7/r7toushoyosansiryou.pdf",
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
        "localUrl": "/sources/kofu-yosansho-r7/r7toushoyosansiryou.pdf",
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
    "prevBasis": "当初",
    "prevNote": "令和5年度当初予算額は、6月補正における政策的予算（KOFUNEXTACTION）を含む",
    "sourceTitle": "令和6年度 甲府市当初予算資料",
    "sourceUrl": "https://web.archive.org/web/20260712085452/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r6/03r6tousyoshiryou.pdf",
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
        "localUrl": "/sources/kofu-yosansho-r6/03r6tousyoshiryou.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "03r6tousyoshiryou.pdf ・ sha256 1f07ed8057a696ba… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R5",
    "fyLabel": "令和5年度 当初予算",
    "population": 186393,
    "populationLabel": "住民基本台帳人口（令5.1.1現在）",
    "totalOku": 790.35063,
    "prevTotalOku": 794.82388,
    "yoyLabel": "-0.6%",
    "prevBasis": "当初",
    "prevNote": "",
    "sourceTitle": "令和5年度 甲府市当初予算資料（WARP回収）",
    "sourceUrl": "https://warp.ndl.go.jp/20240509/20240508214211/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r5tousyoshiryou.pdf",
    "originUrl": "https://warp.ndl.go.jp/20240509/20240508214211/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r5tousyoshiryou.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r5/03r5tousyoshiryou.pdf",
    "pagesLabel": "p.14–15",
    "revenue": [
      {
        "name": "市税",
        "v": 291.8569,
        "prevV": 284.86961,
        "yoy": 2.5,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "国庫支出金",
        "v": 149.91433,
        "prevV": 148.00508,
        "yoy": 1.3,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "地方交付税",
        "v": 108.55444,
        "prevV": 98.775,
        "yoy": 9.9,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "県支出金",
        "v": 65.91516,
        "prevV": 62.13384,
        "yoy": 6.1,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "地方消費税交付金",
        "v": 51.85752,
        "prevV": 48.03273,
        "yoy": 8,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "諸収入・その他",
        "v": 46.33364,
        "prevV": 47.2763,
        "yoy": -2,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 18.21329,
            "prevV": 19.28684,
            "yoy": -5.6,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.29798,
            "prevV": 9.89753,
            "yoy": -6.1,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "法人事業税交付金",
            "v": 5.68564,
            "prevV": 4.82213,
            "yoy": 17.9,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "地方譲与税",
            "v": 4.26027,
            "prevV": 4.3743,
            "yoy": -2.6,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "分担金及び負担金",
            "v": 2.96923,
            "prevV": 3.28157,
            "yoy": -9.5,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "配当割交付金",
            "v": 1.69013,
            "prevV": 0.98555,
            "yoy": 71.5,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "地方特例交付金",
            "v": 1.64445,
            "prevV": 1.4768,
            "yoy": 11.4,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "財産収入",
            "v": 0.89702,
            "prevV": 0.78613,
            "yoy": 14.1,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.87709,
            "prevV": 1.20811,
            "yoy": -27.4,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.3897,
            "prevV": 0.40443,
            "yoy": -3.6,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.32902,
            "prevV": 0.56538,
            "yoy": -41.8,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "利子割交付金",
            "v": 0.07981,
            "prevV": 0.18752,
            "yoy": -57.4,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0,
            "ref": "03r5tousyoshiryou.pdf#p14",
            "refLabel": "予算書 p.14"
          }
        ]
      },
      {
        "name": "市債",
        "v": 36.078,
        "prevV": 77.401,
        "yoy": -53.4,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "寄附金",
        "v": 22,
        "prevV": 20,
        "yoy": 10,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "繰入金",
        "v": 17.84064,
        "prevV": 8.33032,
        "yoy": 114.2,
        "ref": "03r5tousyoshiryou.pdf#p14",
        "refLabel": "予算書 p.14"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 342.65721,
        "prevV": 336.56153,
        "yoy": 1.8,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "衛生費",
        "v": 107.48371,
        "prevV": 102.04399,
        "yoy": 5.3,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "公債費",
        "v": 89.57254,
        "prevV": 113.01584,
        "yoy": -20.7,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "総務費",
        "v": 85.73097,
        "prevV": 87.70002,
        "yoy": -2.2,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "教育費",
        "v": 64.24261,
        "prevV": 61.11437,
        "yoy": 5.1,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "土木費",
        "v": 49.70743,
        "prevV": 43.22595,
        "yoy": 15,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "消防費",
        "v": 24.07683,
        "prevV": 22.87509,
        "yoy": 5.3,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "農林水産業費",
        "v": 10.27198,
        "prevV": 10.29657,
        "yoy": -0.2,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "商工費",
        "v": 8.90452,
        "prevV": 9.18793,
        "yoy": -3.1,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "議会費",
        "v": 5.41594,
        "prevV": 5.39091,
        "yoy": 0.5,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "労働費",
        "v": 1.94505,
        "prevV": 1.87321,
        "yoy": 3.8,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "諸支出金",
        "v": 0.1418,
        "prevV": 1.33843,
        "yoy": -89.4,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "03r5tousyoshiryou.pdf#p15",
        "refLabel": "予算書 p.15"
      }
    ],
    "evidence": [
      {
        "title": "令和5年度 甲府市当初予算資料（WARP回収）",
        "type": "PDF",
        "url": "https://warp.ndl.go.jp/20240509/20240508214211/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r5tousyoshiryou.pdf",
        "localUrl": "/sources/kofu-yosansho-r5/03r5tousyoshiryou.pdf",
        "source": "warp.ndl.go.jp",
        "thumb": "03r5tousyoshiryou.pdf ・ sha256 9f6b99df2517664e… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R4",
    "fyLabel": "令和4年度 当初予算",
    "population": 186249,
    "populationLabel": "住民基本台帳人口（令4.1.1現在）",
    "totalOku": 794.82388,
    "prevTotalOku": 758.47788,
    "yoyLabel": "+4.8%",
    "prevBasis": "当初",
    "prevNote": "",
    "sourceTitle": "令和4年度 甲府市当初予算資料（WARP回収）",
    "sourceUrl": "https://warp.ndl.go.jp/20240509/20240508214215/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r4toushoyosan.pdf",
    "originUrl": "https://warp.ndl.go.jp/20240509/20240508214215/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r4toushoyosan.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r4/r4toushoyosan.pdf",
    "pagesLabel": "p.14–15",
    "revenue": [
      {
        "name": "市税",
        "v": 284.86961,
        "prevV": 270.70575,
        "yoy": 5.2,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "国庫支出金",
        "v": 148.00508,
        "prevV": 134.8186,
        "yoy": 9.8,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "地方交付税",
        "v": 98.775,
        "prevV": 93.45578,
        "yoy": 5.7,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "市債",
        "v": 77.401,
        "prevV": 86.439,
        "yoy": -10.5,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "県支出金",
        "v": 62.13384,
        "prevV": 59.36582,
        "yoy": 4.7,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "地方消費税交付金",
        "v": 48.03273,
        "prevV": 46.26147,
        "yoy": 3.8,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "諸収入・その他",
        "v": 47.2763,
        "prevV": 45.37612,
        "yoy": 4.2,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 19.28684,
            "prevV": 15.63751,
            "yoy": 23.3,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.89753,
            "prevV": 9.99555,
            "yoy": -1,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "法人事業税交付金",
            "v": 4.82213,
            "prevV": 3.23224,
            "yoy": 49.2,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "地方譲与税",
            "v": 4.3743,
            "prevV": 4.06285,
            "yoy": 7.7,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "分担金及び負担金",
            "v": 3.28157,
            "prevV": 3.54898,
            "yoy": -7.5,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "地方特例交付金",
            "v": 1.4768,
            "prevV": 5.2171,
            "yoy": -71.7,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.20811,
            "prevV": 1.15641,
            "yoy": 4.5,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "配当割交付金",
            "v": 0.98555,
            "prevV": 0.89949,
            "yoy": 9.6,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "財産収入",
            "v": 0.78613,
            "prevV": 0.77557,
            "yoy": 1.4,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.56538,
            "prevV": 0.2832,
            "yoy": 99.6,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.40443,
            "prevV": 0.40829,
            "yoy": -0.9,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "利子割交付金",
            "v": 0.18752,
            "prevV": 0.15892,
            "yoy": 18,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0,
            "ref": "r4toushoyosan.pdf#p14",
            "refLabel": "予算書 p.14"
          }
        ]
      },
      {
        "name": "寄附金",
        "v": 20,
        "prevV": 16.00001,
        "yoy": 25,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      },
      {
        "name": "繰入金",
        "v": 8.33032,
        "prevV": 6.05533,
        "yoy": 37.6,
        "ref": "r4toushoyosan.pdf#p14",
        "refLabel": "予算書 p.14"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 336.56153,
        "prevV": 329.67737,
        "yoy": 2.1,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "公債費",
        "v": 113.01584,
        "prevV": 99.48993,
        "yoy": 13.6,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "衛生費",
        "v": 102.04399,
        "prevV": 96.49247,
        "yoy": 5.8,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "総務費",
        "v": 87.70002,
        "prevV": 83.9691,
        "yoy": 4.4,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "教育費",
        "v": 61.11437,
        "prevV": 55.1879,
        "yoy": 10.7,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "土木費",
        "v": 43.22595,
        "prevV": 45.93486,
        "yoy": -5.9,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "消防費",
        "v": 22.87509,
        "prevV": 22.22896,
        "yoy": 2.9,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "農林水産業費",
        "v": 10.29657,
        "prevV": 9.18946,
        "yoy": 12,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "商工費",
        "v": 9.18793,
        "prevV": 7.19518,
        "yoy": 27.7,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "議会費",
        "v": 5.39091,
        "prevV": 5.46668,
        "yoy": -1.4,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "労働費",
        "v": 1.87321,
        "prevV": 2.09523,
        "yoy": -10.6,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "諸支出金",
        "v": 1.33843,
        "prevV": 1.3507,
        "yoy": -0.9,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "r4toushoyosan.pdf#p15",
        "refLabel": "予算書 p.15"
      }
    ],
    "evidence": [
      {
        "title": "令和4年度 甲府市当初予算資料（WARP回収）",
        "type": "PDF",
        "url": "https://warp.ndl.go.jp/20240509/20240508214215/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r4toushoyosan.pdf",
        "localUrl": "/sources/kofu-yosansho-r4/r4toushoyosan.pdf",
        "source": "warp.ndl.go.jp",
        "thumb": "r4toushoyosan.pdf ・ sha256 67137914dc46c079… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R3",
    "fyLabel": "令和3年度 当初予算",
    "population": 187048,
    "populationLabel": "住民基本台帳人口（令3.1.1現在）",
    "totalOku": 758.47788,
    "prevTotalOku": 744.29982,
    "yoyLabel": "+1.9%",
    "prevBasis": "当初",
    "prevNote": "",
    "sourceTitle": "令和3年度 甲府市当初予算資料（款別一覧表・主な事業）",
    "sourceUrl": "https://web.archive.org/web/20260712104219/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/2r03ippankaikeisainyusaisyutu.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/2r03ippankaikeisainyusaisyutu.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r3/2r03ippankaikeisainyusaisyutu.pdf",
    "pagesLabel": "p.1–2",
    "revenue": [
      {
        "name": "市税",
        "v": 270.70575,
        "prevV": 290.41162,
        "yoy": -6.8,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "国庫支出金",
        "v": 134.8186,
        "prevV": 128.35029,
        "yoy": 5,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "地方交付税",
        "v": 93.45578,
        "prevV": 89.21521,
        "yoy": 4.8,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "市債",
        "v": 86.439,
        "prevV": 62.064,
        "yoy": 39.3,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "県支出金",
        "v": 59.36582,
        "prevV": 62.48574,
        "yoy": -5,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "地方消費税交付金",
        "v": 46.26147,
        "prevV": 49.96062,
        "yoy": -7.4,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "諸収入・その他",
        "v": 45.37612,
        "prevV": 48.74678,
        "yoy": -6.9,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 15.63751,
            "prevV": 21.94825,
            "yoy": -28.8,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.99555,
            "prevV": 9.97819,
            "yoy": 0.2,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "地方特例交付金",
            "v": 5.2171,
            "prevV": 1.66361,
            "yoy": 213.6,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "地方譲与税",
            "v": 4.06285,
            "prevV": 4.67426,
            "yoy": -13.1,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "分担金及び負担金",
            "v": 3.54898,
            "prevV": 4.94591,
            "yoy": -28.2,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "法人事業税交付金",
            "v": 3.23224,
            "prevV": 1.90691,
            "yoy": 69.5,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.15641,
            "prevV": 0.74732,
            "yoy": 54.7,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "配当割交付金",
            "v": 0.89949,
            "prevV": 1.05494,
            "yoy": -14.7,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "財産収入",
            "v": 0.77557,
            "prevV": 0.77621,
            "yoy": -0.1,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.40829,
            "prevV": 0.42135,
            "yoy": -3.1,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.2832,
            "prevV": 0.46542,
            "yoy": -39.2,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "利子割交付金",
            "v": 0.15892,
            "prevV": 0.1644,
            "yoy": -3.3,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0,
            "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
            "refLabel": "予算書 p.1"
          }
        ]
      },
      {
        "name": "寄附金",
        "v": 16.00001,
        "prevV": 1.80001,
        "yoy": 788.9,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "繰入金",
        "v": 6.05533,
        "prevV": 11.26555,
        "yoy": -46.2,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p1",
        "refLabel": "予算書 p.1"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 329.67737,
        "prevV": 332.86133,
        "yoy": -1,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "公債費",
        "v": 99.48993,
        "prevV": 87.86563,
        "yoy": 13.2,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "衛生費",
        "v": 96.49247,
        "prevV": 93.41515,
        "yoy": 3.3,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "総務費",
        "v": 83.9691,
        "prevV": 70.74316,
        "yoy": 18.7,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "教育費",
        "v": 55.1879,
        "prevV": 71.24751,
        "yoy": -22.5,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "土木費",
        "v": 45.93486,
        "prevV": 38.49172,
        "yoy": 19.3,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "消防費",
        "v": 22.22896,
        "prevV": 25.00875,
        "yoy": -11.1,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "農林水産業費",
        "v": 9.18946,
        "prevV": 8.02527,
        "yoy": 14.5,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "商工費",
        "v": 7.19518,
        "prevV": 7.12955,
        "yoy": 0.9,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "議会費",
        "v": 5.46668,
        "prevV": 5.40579,
        "yoy": 1.1,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "労働費",
        "v": 2.09523,
        "prevV": 2.44998,
        "yoy": -14.5,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "諸支出金",
        "v": 1.3507,
        "prevV": 1.45594,
        "yoy": -7.2,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "2r03ippankaikeisainyusaisyutu.pdf#p2",
        "refLabel": "予算書 p.2"
      }
    ],
    "evidence": [
      {
        "title": "令和3年度 甲府市当初予算資料（款別一覧表・主な事業）（2r03ippankaikeisainyusaisyutu.pdf）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712104219/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/2r03ippankaikeisainyusaisyutu.pdf",
        "localUrl": "/sources/kofu-yosansho-r3/2r03ippankaikeisainyusaisyutu.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "2r03ippankaikeisainyusaisyutu.pdf ・ sha256 2cf18692f58b0590… ・ 2026-07-12 取得"
      },
      {
        "title": "令和3年度 甲府市当初予算資料（款別一覧表・主な事業）（3r03omonajigyo_3.pdf）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712103850/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/3r03omonajigyo_3.pdf",
        "localUrl": "/sources/kofu-yosansho-r3/3r03omonajigyo_3.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "3r03omonajigyo_3.pdf ・ sha256 022cb23bd9e0ad24… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R2",
    "fyLabel": "令和2年度 当初予算",
    "population": 187048,
    "populationLabel": "住民基本台帳人口（令3.1.1現在）",
    "totalOku": 744.29982,
    "prevTotalOku": 749.9907,
    "yoyLabel": "-0.8%",
    "prevBasis": "補正後",
    "prevNote": "",
    "sourceTitle": "令和2年度 甲府市当初予算資料（款別一覧表・主な事業）",
    "sourceUrl": "https://web.archive.org/web/20260712104422/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02sainyuusaishutu.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02sainyuusaishutu.pdf",
    "sourceLocalUrl": "/sources/kofu-yosansho-r2/r02sainyuusaishutu.pdf",
    "pagesLabel": "p.1–2",
    "revenue": [
      {
        "name": "市税",
        "v": 290.41162,
        "prevV": 290.36994,
        "yoy": 0,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "国庫支出金",
        "v": 128.35029,
        "prevV": 139.65513,
        "yoy": -8.1,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "地方交付税",
        "v": 89.21521,
        "prevV": 94.23443,
        "yoy": -5.3,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "県支出金",
        "v": 62.48574,
        "prevV": 61.00113,
        "yoy": 2.4,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "市債",
        "v": 62.064,
        "prevV": 67.782,
        "yoy": -8.4,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "地方消費税交付金",
        "v": 49.96062,
        "prevV": 41.21478,
        "yoy": 21.2,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "諸収入・その他",
        "v": 48.74678,
        "prevV": 51.24075,
        "yoy": -4.9,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1（残り13款の合算）",
        "children": [
          {
            "name": "諸収入",
            "v": 21.94825,
            "prevV": 23.49714,
            "yoy": -6.6,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "使用料及び手数料",
            "v": 9.97819,
            "prevV": 9.75438,
            "yoy": 2.3,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "分担金及び負担金",
            "v": 4.94591,
            "prevV": 5.21267,
            "yoy": -5.1,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "地方譲与税",
            "v": 4.67426,
            "prevV": 4.31641,
            "yoy": 8.3,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "法人事業税交付金",
            "v": 1.90691,
            "prevV": 1.90691,
            "yoy": 0,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "地方特例交付金",
            "v": 1.66361,
            "prevV": 1.30746,
            "yoy": 27.2,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "配当割交付金",
            "v": 1.05494,
            "prevV": 1.41546,
            "yoy": -25.5,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "財産収入",
            "v": 0.77621,
            "prevV": 0.97483,
            "yoy": -20.4,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.74732,
            "prevV": 1.36124,
            "yoy": -45.1,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "環境性能割交付金",
            "v": 0.46542,
            "prevV": 0.2836,
            "yoy": 64.1,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.42135,
            "prevV": 0.44028,
            "yoy": -4.3,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "利子割交付金",
            "v": 0.1644,
            "prevV": 0.56169,
            "yoy": -70.7,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.20868,
            "yoy": -100,
            "ref": "r02sainyuusaishutu.pdf#p1",
            "refLabel": "予算書 p.1"
          }
        ]
      },
      {
        "name": "繰入金",
        "v": 11.26555,
        "prevV": 4.31105,
        "yoy": 161.3,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      },
      {
        "name": "寄附金",
        "v": 1.80001,
        "prevV": 1.3194,
        "yoy": 36.4,
        "ref": "r02sainyuusaishutu.pdf#p1",
        "refLabel": "予算書 p.1"
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 332.86133,
        "prevV": 322.75516,
        "yoy": 3.1,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "衛生費",
        "v": 93.41515,
        "prevV": 98.50437,
        "yoy": -5.2,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "公債費",
        "v": 87.86563,
        "prevV": 75.37688,
        "yoy": 16.6,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "教育費",
        "v": 71.24751,
        "prevV": 63.25108,
        "yoy": 12.6,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "総務費",
        "v": 70.74316,
        "prevV": 72.05963,
        "yoy": -1.8,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "土木費",
        "v": 38.49172,
        "prevV": 67.49029,
        "yoy": -43,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "消防費",
        "v": 25.00875,
        "prevV": 23.39596,
        "yoy": 6.9,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "農林水産業費",
        "v": 8.02527,
        "prevV": 8.25509,
        "yoy": -2.8,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "商工費",
        "v": 7.12955,
        "prevV": 9.10101,
        "yoy": -21.7,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "議会費",
        "v": 5.40579,
        "prevV": 5.41193,
        "yoy": -0.1,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "労働費",
        "v": 2.44998,
        "prevV": 2.71974,
        "yoy": -9.9,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "諸支出金",
        "v": 1.45594,
        "prevV": 1.46952,
        "yoy": -0.9,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0,
        "ref": "r02sainyuusaishutu.pdf#p2",
        "refLabel": "予算書 p.2"
      }
    ],
    "evidence": [
      {
        "title": "令和2年度 甲府市当初予算資料（款別一覧表・主な事業）（r02sainyuusaishutu.pdf）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712104422/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02sainyuusaishutu.pdf",
        "localUrl": "/sources/kofu-yosansho-r2/r02sainyuusaishutu.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r02sainyuusaishutu.pdf ・ sha256 3fe6f1f3e9eded91… ・ 2026-07-12 取得"
      },
      {
        "title": "令和2年度 甲府市当初予算資料（款別一覧表・主な事業）（r02omonajigyou.pdf）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712104609/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02omonajigyou.pdf",
        "localUrl": "/sources/kofu-yosansho-r2/r02omonajigyou.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r02omonajigyou.pdf ・ sha256 e3d5753f560252b0… ・ 2026-07-12 取得"
      }
    ]
  }
];

/** 最新年度（互換用） */
export const KOFU_BUDGET: KofuBudgetYear = KOFU_BUDGET_YEARS[0]!;
