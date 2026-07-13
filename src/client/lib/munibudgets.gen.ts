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
  "192023": {
    "muniCode": "192023",
    "muniName": "富士吉田市",
    "prefName": "山梨県",
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 46364,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 310.6,
    "prevTotalOku": 289.7,
    "yoyLabel": "+7.2%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 72.2799,
        "prevV": 70.04879,
        "yoy": 3.2
      },
      {
        "name": "繰入金",
        "v": 64.51858,
        "prevV": 50.80238,
        "yoy": 27
      },
      {
        "name": "国庫支出金",
        "v": 41.05637,
        "prevV": 37.42543,
        "yoy": 9.7
      },
      {
        "name": "地方交付税",
        "v": 31.5,
        "prevV": 31.5,
        "yoy": 0
      },
      {
        "name": "寄附金",
        "v": 20.13013,
        "prevV": 20.00013,
        "yoy": 0.6
      },
      {
        "name": "県支出金",
        "v": 16.30618,
        "prevV": 14.64527,
        "yoy": 11.3
      },
      {
        "name": "地方消費税交付金",
        "v": 13.3,
        "prevV": 13.3,
        "yoy": 0
      },
      {
        "name": "諸収入",
        "v": 12.50153,
        "prevV": 12.68347,
        "yoy": -1.4
      },
      {
        "name": "その他",
        "v": 39.007310000000004,
        "prevV": 39.294529999999995,
        "yoy": null,
        "children": [
          {
            "name": "市債",
            "v": 12.477,
            "prevV": 16.354,
            "yoy": -23.7
          },
          {
            "name": "分担金及び負担金",
            "v": 12.14069,
            "prevV": 9.85062,
            "yoy": 23.2
          },
          {
            "name": "使用料及び手数料",
            "v": 5.8363,
            "prevV": 5.69921,
            "yoy": 2.4
          },
          {
            "name": "国有提供施設等所在市町",
            "v": 1.66617,
            "prevV": 1.66072,
            "yoy": 0.3
          },
          {
            "name": "財産収入",
            "v": 1.6661,
            "prevV": 0.90843,
            "yoy": 83.4
          },
          {
            "name": "法人事業税交付金",
            "v": 1.45,
            "prevV": 1.45,
            "yoy": 0
          },
          {
            "name": "地方譲与税",
            "v": 1.33722,
            "prevV": 1.38055,
            "yoy": -3.1
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.75,
            "prevV": 0.55,
            "yoy": 36.4
          },
          {
            "name": "地方特例交付金",
            "v": 0.65382,
            "prevV": 0.386,
            "yoy": 69.4
          },
          {
            "name": "配当割交付金",
            "v": 0.5,
            "prevV": 0.41,
            "yoy": 22
          },
          {
            "name": "繰越金",
            "v": 0.3,
            "prevV": 0.3,
            "yoy": 0
          },
          {
            "name": "利子割交付金",
            "v": 0.14,
            "prevV": 0.045,
            "yoy": 211.1
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.05,
            "prevV": 0.05,
            "yoy": 0
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.04,
            "prevV": 0.04,
            "yoy": 0
          },
          {
            "name": "環境性能割交付金",
            "v": 0.00001,
            "prevV": 0.21,
            "yoy": -100
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 84.71264,
        "prevV": 82.0597,
        "yoy": 3.2
      },
      {
        "name": "総務費",
        "v": 62.59953,
        "prevV": 56.49035,
        "yoy": 10.8
      },
      {
        "name": "衛生費",
        "v": 43.25198,
        "prevV": 40.1235,
        "yoy": 7.8
      },
      {
        "name": "教育費",
        "v": 30.51916,
        "prevV": 36.61359,
        "yoy": -16.6
      },
      {
        "name": "土木費",
        "v": 30.4354,
        "prevV": 28.64401,
        "yoy": 6.3
      },
      {
        "name": "商工費",
        "v": 26.45787,
        "prevV": 14.4158,
        "yoy": 83.5
      },
      {
        "name": "公債費",
        "v": 17.3643,
        "prevV": 16.81463,
        "yoy": 3.3
      },
      {
        "name": "消防費",
        "v": 9.51193,
        "prevV": 9.51682,
        "yoy": -0.1
      },
      {
        "name": "農林水産業費",
        "v": 3.23501,
        "prevV": 2.80412,
        "yoy": 15.4
      },
      {
        "name": "議会費",
        "v": 2.21215,
        "prevV": 1.91745,
        "yoy": 15.4
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.00003,
        "prevV": 0.00003,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 富士吉田市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "originUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "sourceLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 富士吉田市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
        "localUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
        "source": "www.city.fujiyoshida.yamanashi.jp",
        "thumb": "7412.pdf ・ sha256 879613ffbf544674… ・ 2026-07-13 取得"
      }
    ]
  },
  "192082": {
    "muniCode": "192082",
    "muniName": "南アルプス市",
    "prefName": "山梨県",
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 71726,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 429.94462,
    "prevTotalOku": 417.24947,
    "yoyLabel": "+3.0%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 98.47041,
        "prevV": 94.53314,
        "yoy": 4.2
      },
      {
        "name": "地方交付税",
        "v": 92,
        "prevV": 92,
        "yoy": 0
      },
      {
        "name": "国庫支出金",
        "v": 56.5664,
        "prevV": 58.8448,
        "yoy": -3.9
      },
      {
        "name": "寄附金",
        "v": 42.003,
        "prevV": 40.05758,
        "yoy": 4.9
      },
      {
        "name": "繰入金",
        "v": 39.13907,
        "prevV": 38.50831,
        "yoy": 1.6
      },
      {
        "name": "市債",
        "v": 32.648,
        "prevV": 32.57,
        "yoy": 0.2
      },
      {
        "name": "県支出金",
        "v": 29.9742,
        "prevV": 25.33661,
        "yoy": 18.3
      },
      {
        "name": "地方消費税交付金",
        "v": 20.98,
        "prevV": 18.38,
        "yoy": 14.1
      },
      {
        "name": "その他",
        "v": 18.163539999999998,
        "prevV": 17.01903,
        "yoy": null,
        "children": [
          {
            "name": "繰越金",
            "v": 3,
            "prevV": 3,
            "yoy": 0
          },
          {
            "name": "諸収入",
            "v": 2.87723,
            "prevV": 3.55315,
            "yoy": -19
          },
          {
            "name": "地方譲与税",
            "v": 2.78658,
            "prevV": 2.5434,
            "yoy": 9.6
          },
          {
            "name": "法人事業税交付金",
            "v": 1.49,
            "prevV": 1.39,
            "yoy": 7.2
          },
          {
            "name": "分担金及び負担金",
            "v": 1.42964,
            "prevV": 1.39063,
            "yoy": 2.8
          },
          {
            "name": "使用料及び手数料",
            "v": 1.30315,
            "prevV": 1.31663,
            "yoy": -1
          },
          {
            "name": "地方特例交付金",
            "v": 1.27,
            "prevV": 1.13,
            "yoy": 12.4
          },
          {
            "name": "財産収入",
            "v": 1.26698,
            "prevV": 0.82322,
            "yoy": 53.9
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.13,
            "prevV": 0.89,
            "yoy": 27
          },
          {
            "name": "配当割交付金",
            "v": 0.83,
            "prevV": 0.53,
            "yoy": 56.6
          },
          {
            "name": "環境性能割交付金",
            "v": 0.41,
            "prevV": 0.34,
            "yoy": 20.6
          },
          {
            "name": "利子割交付金",
            "v": 0.3,
            "prevV": 0.04,
            "yoy": 650
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.06996,
            "prevV": 0.072,
            "yoy": -2.8
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 156.10461,
        "prevV": 142.24555,
        "yoy": 9.7
      },
      {
        "name": "総務費",
        "v": 68.41606,
        "prevV": 60.78356,
        "yoy": 12.6
      },
      {
        "name": "教育費",
        "v": 60.68884,
        "prevV": 68.59359,
        "yoy": -11.5
      },
      {
        "name": "公債費",
        "v": 34.53767,
        "prevV": 33.70282,
        "yoy": 2.5
      },
      {
        "name": "土木費",
        "v": 27.39609,
        "prevV": 28.14368,
        "yoy": -2.7
      },
      {
        "name": "衛生費",
        "v": 27.19604,
        "prevV": 26.67195,
        "yoy": 2
      },
      {
        "name": "諸支出金",
        "v": 22.33791,
        "prevV": 21.11781,
        "yoy": 5.8
      },
      {
        "name": "消防費",
        "v": 13.25368,
        "prevV": 16.31723,
        "yoy": -18.8
      },
      {
        "name": "農林水産業費",
        "v": 9.83993,
        "prevV": 8.43024,
        "yoy": 16.7
      },
      {
        "name": "商工費",
        "v": 7.5365,
        "prevV": 8.61103,
        "yoy": -12.5
      },
      {
        "name": "議会費",
        "v": 2.10952,
        "prevV": 2.11366,
        "yoy": -0.2
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.22774,
        "prevV": 0.21832,
        "yoy": 4.3
      },
      {
        "name": "災害復旧費",
        "v": 0.00003,
        "prevV": 0.00003,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "originUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "sourceLocalUrl": "/sources/minami-alps-yosansho-r8/__8____________.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
        "localUrl": "/sources/minami-alps-yosansho-r8/__8____________.pdf",
        "source": "www.city.minami-alps.yamanashi.jp",
        "thumb": "__8____________.pdf ・ sha256 65371756356e8a05… ・ 2026-07-13 取得"
      }
    ]
  },
  "192112": {
    "muniCode": "192112",
    "muniName": "笛吹市",
    "prefName": "山梨県",
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 66857,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 481.59288,
    "prevTotalOku": 454.93102,
    "yoyLabel": "+5.9%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 101.95973,
        "prevV": 99.33332,
        "yoy": 2.6
      },
      {
        "name": "地方交付税",
        "v": 82.844,
        "prevV": 82.991,
        "yoy": -0.2
      },
      {
        "name": "繰入金",
        "v": 76.34442,
        "prevV": 61.44256,
        "yoy": 24.3
      },
      {
        "name": "国庫支出金",
        "v": 57.88451,
        "prevV": 58.8311,
        "yoy": -1.6
      },
      {
        "name": "寄附金",
        "v": 49.3506,
        "prevV": 36.3375,
        "yoy": 35.8
      },
      {
        "name": "市債",
        "v": 47.13836,
        "prevV": 55.991,
        "yoy": -15.8
      },
      {
        "name": "県支出金",
        "v": 26.592,
        "prevV": 23.66648,
        "yoy": 12.4
      },
      {
        "name": "地方消費税交付金",
        "v": 20.836,
        "prevV": 18.256,
        "yoy": 14.1
      },
      {
        "name": "その他",
        "v": 18.643259999999994,
        "prevV": 18.082060000000002,
        "yoy": null,
        "children": [
          {
            "name": "繰越金",
            "v": 4,
            "prevV": 4,
            "yoy": 0
          },
          {
            "name": "地方譲与税",
            "v": 2.809,
            "prevV": 2.803,
            "yoy": 0.2
          },
          {
            "name": "諸収入",
            "v": 2.49536,
            "prevV": 2.50587,
            "yoy": -0.4
          },
          {
            "name": "使用料及び手数料",
            "v": 2.05749,
            "prevV": 1.93856,
            "yoy": 6.1
          },
          {
            "name": "法人事業税交付金",
            "v": 1.671,
            "prevV": 1.613,
            "yoy": 3.6
          },
          {
            "name": "財産収入",
            "v": 1.29248,
            "prevV": 0.90231,
            "yoy": 43.2
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.068,
            "prevV": 0.937,
            "yoy": 14
          },
          {
            "name": "配当割交付金",
            "v": 0.783,
            "prevV": 0.551,
            "yoy": 42.1
          },
          {
            "name": "分担金及び負担金",
            "v": 0.65994,
            "prevV": 1.42991,
            "yoy": -53.8
          },
          {
            "name": "地方特例交付金",
            "v": 0.629,
            "prevV": 0.582,
            "yoy": 8.1
          },
          {
            "name": "環境性能割交付金",
            "v": 0.419,
            "prevV": 0.378,
            "yoy": 10.8
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.374,
            "prevV": 0.358,
            "yoy": 4.5
          },
          {
            "name": "利子割交付金",
            "v": 0.316,
            "prevV": 0.005,
            "yoy": 6220
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.06899,
            "prevV": 0.07841,
            "yoy": -12
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 158.63187,
        "prevV": 151.29775,
        "yoy": 4.8
      },
      {
        "name": "総務費",
        "v": 81.60682,
        "prevV": 66.74248,
        "yoy": 22.3
      },
      {
        "name": "公債費",
        "v": 57.05305,
        "prevV": 62.47448,
        "yoy": -8.7
      },
      {
        "name": "諸支出金",
        "v": 49.69162,
        "prevV": 36.41323,
        "yoy": 36.5
      },
      {
        "name": "教育費",
        "v": 47.91088,
        "prevV": 52.22834,
        "yoy": -8.3
      },
      {
        "name": "土木費",
        "v": 28.3608,
        "prevV": 29.36758,
        "yoy": -3.4
      },
      {
        "name": "消防費",
        "v": 21.3606,
        "prevV": 20.32385,
        "yoy": 5.1
      },
      {
        "name": "衛生費",
        "v": 19.29771,
        "prevV": 18.96967,
        "yoy": 1.7
      },
      {
        "name": "農林水産業費",
        "v": 9.54016,
        "prevV": 9.8201,
        "yoy": -2.9
      },
      {
        "name": "商工費",
        "v": 5.38371,
        "prevV": 4.61096,
        "yoy": 16.8
      },
      {
        "name": "議会費",
        "v": 2.32582,
        "prevV": 2.25552,
        "yoy": 3.1
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.12984,
        "prevV": 0.12706,
        "yoy": 2.2
      },
      {
        "name": "災害復旧費",
        "v": 0,
        "prevV": 0,
        "yoy": null
      }
    ],
    "sourceTitle": "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
    "originUrl": "https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
    "sourceLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
        "localUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf",
        "source": "www.city.fuefuki.yamanashi.jp",
        "thumb": "r8toushoyosangaiyou.pdf ・ sha256 9344be2cda43aeb6… ・ 2026-07-13 取得"
      }
    ]
  },
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
export const BUDGET_MUNIS: string[] = ["232076","352039","222038","272191","192112","192023","192082"];
