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

export interface MuniBudget {
  muniCode: string;
  muniName: string;
  prefName: string;
  fy: string;
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  prevBasis: "当初" | "補正後";
  revenue: MuniKanRow[];
  expenditure: MuniKanRow[];
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  pagesLabel: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/** 団体コード → 当初予算（budget 階層の4市） */
export const MUNI_BUDGETS: Record<string, MuniBudget> = {
  "222038": {
    "muniCode": "222038",
    "muniName": "沼津市",
    "prefName": "静岡県",
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185758,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 956,
    "prevTotalOku": 879.6,
    "yoyLabel": "+8.7%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 353,
        "prevV": 343,
        "yoy": 2.9
      },
      {
        "name": "国庫支出金",
        "v": 183.65862,
        "prevV": 160.22076,
        "yoy": 14.6
      },
      {
        "name": "市債",
        "v": 98.828,
        "prevV": 89.816,
        "yoy": 10
      },
      {
        "name": "県支出金",
        "v": 73.38807,
        "prevV": 67.32679,
        "yoy": 9
      },
      {
        "name": "地方消費税交付金",
        "v": 50,
        "prevV": 50,
        "yoy": 0
      },
      {
        "name": "繰入金",
        "v": 46.09275,
        "prevV": 33.38144,
        "yoy": 38.1
      },
      {
        "name": "寄附金",
        "v": 45.00002,
        "prevV": 40.00002,
        "yoy": 12.5
      },
      {
        "name": "地方交付税",
        "v": 39.1,
        "prevV": 34.1,
        "yoy": 14.7
      },
      {
        "name": "その他",
        "v": 66.93254,
        "prevV": 61.75498999999999,
        "yoy": null,
        "children": [
          {
            "name": "諸収入",
            "v": 22.36022,
            "prevV": 18.51552,
            "yoy": 20.8
          },
          {
            "name": "使用料及び手数料",
            "v": 11.47459,
            "prevV": 11.31472,
            "yoy": 1.4
          },
          {
            "name": "法人事業税交付金",
            "v": 5.8,
            "prevV": 5.8,
            "yoy": 0
          },
          {
            "name": "分担金及び負担金",
            "v": 5.17495,
            "prevV": 5.42915,
            "yoy": -4.7
          },
          {
            "name": "地方譲与税",
            "v": 4.97,
            "prevV": 5.25,
            "yoy": -5.3
          },
          {
            "name": "繰越金",
            "v": 4.20761,
            "prevV": 4.10335,
            "yoy": 2.5
          },
          {
            "name": "財産収入",
            "v": 4.16217,
            "prevV": 3.95925,
            "yoy": 5.1
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 3,
            "prevV": 1.5,
            "yoy": 100
          },
          {
            "name": "地方特例交付金",
            "v": 1.85,
            "prevV": 1.95,
            "yoy": -5.1
          },
          {
            "name": "配当割交付金",
            "v": 1.8,
            "prevV": 1.8,
            "yoy": 0
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 1,
            "prevV": 1,
            "yoy": 0
          },
          {
            "name": "環境性能割交付金",
            "v": 0.5,
            "prevV": 0.5,
            "yoy": 0
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.5,
            "prevV": 0.5,
            "yoy": 0
          },
          {
            "name": "利子割交付金",
            "v": 0.13,
            "prevV": 0.13,
            "yoy": 0
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 0.003,
            "prevV": 0.003,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 338.68977,
        "prevV": 303.08896,
        "yoy": 11.7
      },
      {
        "name": "土木費",
        "v": 182.86031,
        "prevV": 176.54397,
        "yoy": 3.6
      },
      {
        "name": "総務費",
        "v": 113.61324,
        "prevV": 104.65779,
        "yoy": 8.6
      },
      {
        "name": "教育費",
        "v": 97.5133,
        "prevV": 84.41782,
        "yoy": 15.5
      },
      {
        "name": "衛生費",
        "v": 96.29153,
        "prevV": 88.82092,
        "yoy": 8.4
      },
      {
        "name": "公債費",
        "v": 66.71735,
        "prevV": 65.32308,
        "yoy": 2.1
      },
      {
        "name": "消防費",
        "v": 30.6765,
        "prevV": 29.49873,
        "yoy": 4
      },
      {
        "name": "商工費",
        "v": 13.72135,
        "prevV": 11.99435,
        "yoy": 14.4
      },
      {
        "name": "農林水産業費",
        "v": 9.11815,
        "prevV": 8.30155,
        "yoy": 9.8
      },
      {
        "name": "議会費",
        "v": 4.59875,
        "prevV": 4.60162,
        "yoy": -0.1
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.95755,
        "prevV": 0.99701,
        "yoy": -4
      },
      {
        "name": "災害復旧費",
        "v": 0.2422,
        "prevV": 0.3542,
        "yoy": -31.6
      }
    ],
    "sourceTitle": "令和7年度 沼津市予算（款別歳入歳出前年度比較表）",
    "sourceUrl": "https://web.archive.org/web/20260713094056/https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
    "originUrl": "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
    "sourceLocalUrl": "/sources/numazu-yosansho-r7/s-1.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和7年度 沼津市予算（款別歳入歳出前年度比較表）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713094056/https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
        "localUrl": "/sources/numazu-yosansho-r7/s-1.pdf",
        "source": "www.city.numazu.shizuoka.jp",
        "thumb": "s-1.pdf ・ sha256 b51832efcaf08f5e… ・ 2026-07-13 取得"
      }
    ]
  },
  "232076": {
    "muniCode": "232076",
    "muniName": "豊川市",
    "prefName": "愛知県",
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185900,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 835.5,
    "prevTotalOku": 723.7,
    "yoyLabel": "+15.4%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 308.94889,
        "prevV": 290.9084,
        "yoy": 6.2
      },
      {
        "name": "国庫支出金",
        "v": 149.87674,
        "prevV": 114.90677,
        "yoy": 30.4
      },
      {
        "name": "地方交付税",
        "v": 74.5,
        "prevV": 66.5,
        "yoy": 12
      },
      {
        "name": "市債",
        "v": 70.228,
        "prevV": 39.851,
        "yoy": 76.2
      },
      {
        "name": "県支出金",
        "v": 62.64717,
        "prevV": 54.08068,
        "yoy": 15.8
      },
      {
        "name": "地方消費税交付金",
        "v": 46,
        "prevV": 45,
        "yoy": 2.2
      },
      {
        "name": "繰入金",
        "v": 40.5791,
        "prevV": 27.54841,
        "yoy": 47.3
      },
      {
        "name": "諸収入",
        "v": 34.37902,
        "prevV": 32.06282,
        "yoy": 7.2
      },
      {
        "name": "その他",
        "v": 48.34108000000001,
        "prevV": 52.84192,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 9.9171,
            "prevV": 9.52008,
            "yoy": 4.2
          },
          {
            "name": "財産収入",
            "v": 7.15943,
            "prevV": 4.81156,
            "yoy": 48.8
          },
          {
            "name": "繰越金",
            "v": 7,
            "prevV": 7,
            "yoy": 0
          },
          {
            "name": "法人事業税交付金",
            "v": 6.5,
            "prevV": 5.3,
            "yoy": 22.6
          },
          {
            "name": "地方譲与税",
            "v": 6.22,
            "prevV": 6.17,
            "yoy": 0.8
          },
          {
            "name": "地方特例交付金",
            "v": 2.61001,
            "prevV": 11.14001,
            "yoy": -76.6
          },
          {
            "name": "分担金及び負担金",
            "v": 2.41811,
            "prevV": 3.19253,
            "yoy": -24.3
          },
          {
            "name": "配当割交付金",
            "v": 2.2,
            "prevV": 2,
            "yoy": 10
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.6,
            "prevV": 1,
            "yoy": 60
          },
          {
            "name": "環境性能割交付金",
            "v": 1.6,
            "prevV": 1.4,
            "yoy": 14.3
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.57,
            "prevV": 0.74,
            "yoy": -23
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.28,
            "prevV": 0.31,
            "yoy": -9.7
          },
          {
            "name": "国有提供施設等",
            "v": 0.15641,
            "prevV": 0.15772,
            "yoy": -0.8
          },
          {
            "name": "利子割交付金",
            "v": 0.11,
            "prevV": 0.1,
            "yoy": 10
          },
          {
            "name": "自動車取得税交付金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          },
          {
            "name": "寄附金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 336.25394,
        "prevV": 310.50441,
        "yoy": 8.3
      },
      {
        "name": "総務費",
        "v": 101.34081,
        "prevV": 76.61691,
        "yoy": 32.3
      },
      {
        "name": "衛生費",
        "v": 96.71328,
        "prevV": 58.37248,
        "yoy": 65.7
      },
      {
        "name": "教育費",
        "v": 89.73728,
        "prevV": 83.00343,
        "yoy": 8.1
      },
      {
        "name": "土木費",
        "v": 62.01289,
        "prevV": 58.22041,
        "yoy": 6.5
      },
      {
        "name": "公債費",
        "v": 52.43475,
        "prevV": 51.56451,
        "yoy": 1.7
      },
      {
        "name": "消防費",
        "v": 36.07701,
        "prevV": 24.44737,
        "yoy": 47.6
      },
      {
        "name": "諸支出金",
        "v": 29.86657,
        "prevV": 27.63507,
        "yoy": 8.1
      },
      {
        "name": "商工費",
        "v": 17.65334,
        "prevV": 20.22871,
        "yoy": -12.7
      },
      {
        "name": "農林水産業費",
        "v": 7.32296,
        "prevV": 7.16481,
        "yoy": 2.2
      },
      {
        "name": "議会費",
        "v": 4.16854,
        "prevV": 4.17277,
        "yoy": -0.1
      },
      {
        "name": "労働費",
        "v": 1.36363,
        "prevV": 1.21412,
        "yoy": 12.3
      },
      {
        "name": "予備費",
        "v": 0.4,
        "prevV": 0.4,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.155,
        "prevV": 0.155,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和7年度 豊川市予算（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260208071246/https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
    "originUrl": "https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
    "sourceLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和7年度 豊川市予算（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260208071246/https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
        "localUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf",
        "source": "www.city.toyokawa.lg.jp",
        "thumb": "R7_yosann.pdf ・ sha256 f59f68ba2279d311… ・ 2026-07-13 取得"
      }
    ]
  },
  "272191": {
    "muniCode": "272191",
    "muniName": "和泉市",
    "prefName": "大阪府",
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 182481,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 904,
    "prevTotalOku": 832,
    "yoyLabel": "+8.7%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 259.51735,
        "prevV": 250.79276,
        "yoy": 3.5
      },
      {
        "name": "国庫支出金",
        "v": 221.08682,
        "prevV": 214.0801,
        "yoy": 3.3
      },
      {
        "name": "地方交付税",
        "v": 120,
        "prevV": 110,
        "yoy": 9.1
      },
      {
        "name": "府支出金",
        "v": 77.18845,
        "prevV": 69.30654,
        "yoy": 11.4
      },
      {
        "name": "市債",
        "v": 72.322,
        "prevV": 42.044,
        "yoy": 72
      },
      {
        "name": "地方消費税交付金",
        "v": 48,
        "prevV": 44,
        "yoy": 9.1
      },
      {
        "name": "繰入金",
        "v": 46.16109,
        "prevV": 45.36523,
        "yoy": 1.8
      },
      {
        "name": "寄附金",
        "v": 15.75,
        "prevV": 13.35,
        "yoy": 18
      },
      {
        "name": "その他",
        "v": 43.974289999999996,
        "prevV": 43.06137,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 11.7078,
            "prevV": 11.64223,
            "yoy": 0.6
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 4.5,
            "prevV": 4,
            "yoy": 12.5
          },
          {
            "name": "法人事業税交付金",
            "v": 4.5,
            "prevV": 5.1,
            "yoy": -11.8
          },
          {
            "name": "諸収入",
            "v": 4.29646,
            "prevV": 4.55266,
            "yoy": -5.6
          },
          {
            "name": "地方譲与税",
            "v": 3.61476,
            "prevV": 3.61476,
            "yoy": 0
          },
          {
            "name": "配当割交付金",
            "v": 3.5,
            "prevV": 2.6,
            "yoy": 34.6
          },
          {
            "name": "助成交付金地方特例交付金",
            "v": 2.82305,
            "prevV": 2.10012,
            "yoy": 34.4
          },
          {
            "name": "財産収入",
            "v": 2.70594,
            "prevV": 2.71274,
            "yoy": -0.3
          },
          {
            "name": "分担金及び負担金",
            "v": 2.46836,
            "prevV": 2.2124,
            "yoy": 11.6
          },
          {
            "name": "国有提供施設等所在市町村",
            "v": 2.22282,
            "prevV": 2.16082,
            "yoy": 2.9
          },
          {
            "name": "利子割交付金",
            "v": 0.9,
            "prevV": 0.7,
            "yoy": 28.6
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.38,
            "prevV": 0.38,
            "yoy": 0
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.2051,
            "prevV": 0.23564,
            "yoy": -13
          },
          {
            "name": "環境性能割交付金",
            "v": 0.15,
            "prevV": 1.05,
            "yoy": -85.7
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 448.55735,
        "prevV": 421.81456,
        "yoy": 6.3
      },
      {
        "name": "教育費",
        "v": 149.50858,
        "prevV": 103.89179,
        "yoy": 43.9
      },
      {
        "name": "総務費",
        "v": 70.4305,
        "prevV": 85.95277,
        "yoy": -18.1
      },
      {
        "name": "衛生費",
        "v": 63.86919,
        "prevV": 61.48605,
        "yoy": 3.9
      },
      {
        "name": "土木費",
        "v": 56.06067,
        "prevV": 57.32635,
        "yoy": -2.2
      },
      {
        "name": "公債費",
        "v": 55.53361,
        "prevV": 55.56034,
        "yoy": 0
      },
      {
        "name": "消防費",
        "v": 21.06485,
        "prevV": 19.863,
        "yoy": 6.1
      },
      {
        "name": "諸支出金",
        "v": 19.11303,
        "prevV": 12.57817,
        "yoy": 52
      },
      {
        "name": "商工費",
        "v": 10.87849,
        "prevV": 4.25318,
        "yoy": 155.8
      },
      {
        "name": "議会費",
        "v": 4.47618,
        "prevV": 4.28449,
        "yoy": 4.5
      },
      {
        "name": "農林水産業費",
        "v": 3.50751,
        "prevV": 3.98926,
        "yoy": -12.1
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括）",
    "sourceUrl": "https://web.archive.org/web/20260713094338/https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
    "originUrl": "https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
    "sourceLocalUrl": "/sources/izumi-yosansho-r8/02_R8_ippan.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713094338/https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
        "localUrl": "/sources/izumi-yosansho-r8/02_R8_ippan.pdf",
        "source": "www.city.osaka-izumi.lg.jp",
        "thumb": "02_R8_ippan.pdf ・ sha256 9131903e5be481cc… ・ 2026-07-13 取得"
      }
    ]
  },
  "352039": {
    "muniCode": "352039",
    "muniName": "山口市",
    "prefName": "山口県",
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185982,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 969,
    "prevTotalOku": 1092,
    "yoyLabel": "-11.3%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 287.55798,
        "prevV": 275.94032,
        "yoy": 4.2
      },
      {
        "name": "地方交付税",
        "v": 178.97,
        "prevV": 178.6,
        "yoy": 0.2
      },
      {
        "name": "国庫支出金",
        "v": 144.71722,
        "prevV": 149.73492,
        "yoy": -3.4
      },
      {
        "name": "市債",
        "v": 94.682,
        "prevV": 202.588,
        "yoy": -53.3
      },
      {
        "name": "県支出金",
        "v": 77.15205,
        "prevV": 69.78553,
        "yoy": 10.6
      },
      {
        "name": "地方消費税交付金",
        "v": 55.7,
        "prevV": 47.3,
        "yoy": 17.8
      },
      {
        "name": "繰入金",
        "v": 48.68268,
        "prevV": 70.78437,
        "yoy": -31.2
      },
      {
        "name": "諸収入",
        "v": 31.94902,
        "prevV": 32.85137,
        "yoy": -2.7
      },
      {
        "name": "その他",
        "v": 49.58904999999999,
        "prevV": 64.41549,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 10.1454,
            "prevV": 10.53793,
            "yoy": -3.7
          },
          {
            "name": "分担金及び負担金",
            "v": 8.32124,
            "prevV": 17.05189,
            "yoy": -51.2
          },
          {
            "name": "地方譲与税",
            "v": 8.22216,
            "prevV": 7.34476,
            "yoy": 11.9
          },
          {
            "name": "寄附金",
            "v": 6.13135,
            "prevV": 6.13136,
            "yoy": 0
          },
          {
            "name": "法人事業税交付金",
            "v": 5.44,
            "prevV": 4.66,
            "yoy": 16.7
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 3.01,
            "prevV": 1.5,
            "yoy": 100.7
          },
          {
            "name": "財産収入",
            "v": 2.18889,
            "prevV": 3.71954,
            "yoy": -41.2
          },
          {
            "name": "配当割交付金",
            "v": 1.87,
            "prevV": 1.19,
            "yoy": 57.1
          },
          {
            "name": "地方特例交付金",
            "v": 1.75,
            "prevV": 10.27,
            "yoy": -83
          },
          {
            "name": "環境性能割交付金",
            "v": 0.98,
            "prevV": 0.7,
            "yoy": 40
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.51,
            "prevV": 0.51,
            "yoy": 0
          },
          {
            "name": "利子割交付金",
            "v": 0.39,
            "prevV": 0.17,
            "yoy": 129.4
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.35,
            "prevV": 0.35,
            "yoy": 0
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 0.28,
            "prevV": 0.28,
            "yoy": 0
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 357.22138,
        "prevV": 343.02905,
        "yoy": 4.1
      },
      {
        "name": "総務費",
        "v": 140.12129,
        "prevV": 233.2113,
        "yoy": -39.9
      },
      {
        "name": "公債費",
        "v": 108.15089,
        "prevV": 102.7464,
        "yoy": 5.3
      },
      {
        "name": "土木費",
        "v": 82.73864,
        "prevV": 91.3529,
        "yoy": -9.4
      },
      {
        "name": "衛生費",
        "v": 72.72104,
        "prevV": 69.63722,
        "yoy": 4.4
      },
      {
        "name": "教育費",
        "v": 68.82377,
        "prevV": 71.82561,
        "yoy": -4.2
      },
      {
        "name": "消防費",
        "v": 47.26333,
        "prevV": 64.07741,
        "yoy": -26.2
      },
      {
        "name": "農林水産業費",
        "v": 47.21214,
        "prevV": 40.09788,
        "yoy": 17.7
      },
      {
        "name": "商工費",
        "v": 34.93878,
        "prevV": 67.16884,
        "yoy": -48
      },
      {
        "name": "議会費",
        "v": 4.03818,
        "prevV": 4.23641,
        "yoy": -4.7
      },
      {
        "name": "災害復旧費",
        "v": 3.59456,
        "prevV": 2.09756,
        "yoy": 71.4
      },
      {
        "name": "労働費",
        "v": 1.176,
        "prevV": 1.51942,
        "yoy": -22.6
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和7年度 山口市当初予算資料（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20250815060151/https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
    "originUrl": "https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
    "sourceLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和7年度 山口市当初予算資料（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20250815060151/https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
        "localUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf",
        "source": "www.city.yamaguchi.lg.jp",
        "thumb": "105329.pdf ・ sha256 bf258ef90f57f599… ・ 2026-07-13 取得"
      }
    ]
  }
};

/** budget 階層（予算ベースの款別ダッシュボードを持つ）自治体の団体コード */
export const BUDGET_MUNIS: string[] = ["232076","352039","222038","272191"];
