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
  /** 新規/拡充/繰越 */
  kubun: "新規" | "拡充" | "繰越" | null;
  /** 前年度予算額（億円。事業単位の前年度がある豊川のみ、他は null） */
  prevAmountOku: number | null;
  description: string;
  refLabel: string;
  /** 自サーバー配信の原本コピー（#page=N 付き） */
  refLocalUrl: string;
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
  /** 主な事業（豊川・和泉のみ。他市は空配列） */
  projects: MuniProject[];
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
    "projects": [],
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
    "sourceUrl": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "originUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "sourceLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 富士吉田市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
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
    "projects": [],
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
    "sourceUrl": "https://web.archive.org/web/20260713114137/https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "originUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "sourceLocalUrl": "/sources/minami-alps-yosansho-r8/__8____________.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713114137/https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
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
    "projects": [],
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
    "sourceUrl": "https://web.archive.org/web/20260713113932/https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
    "originUrl": "https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
    "sourceLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713113932/https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
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
    "projects": [],
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
    "projects": [
      {
        "name": "特別保育事業",
        "amountOku": 67.91993,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 62.63665,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "市債元金償還金",
        "amountOku": 50.99772,
        "kan": "公債費",
        "kubun": null,
        "prevAmountOku": 50.5192,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "障害者自立支援事業",
        "amountOku": 50.1917,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 44.08012,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "児童手当支給事業",
        "amountOku": 41.82,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 33.501,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "総合保健センター（仮称）整備事業",
        "amountOku": 38.48573,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 2.50794,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "東三河広域連合介護保険事業費負担金",
        "amountOku": 23.21692,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 22.80494,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "病院事業会計繰出金",
        "amountOku": 20.51778,
        "kan": "諸支出金",
        "kubun": null,
        "prevAmountOku": 19.75593,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "後期高齢者医療療養給付費負担金",
        "amountOku": 19.59396,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 18.51675,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "生活保護扶助事業",
        "amountOku": 19.18778,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 19.32911,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "清掃工場管理運営事業",
        "amountOku": 16.7001,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 16.47104,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "学校給食管理運営事業",
        "amountOku": 14.44116,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 13.50756,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "総合体育館改修事業",
        "amountOku": 12.91059,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 9.98033,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "国民健康保険特別会計繰出金",
        "amountOku": 12.50069,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 12.18592,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "本庁舎等整備事業",
        "amountOku": 12.00438,
        "kan": "総務費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "消防署本署改築事業",
        "amountOku": 11.05259,
        "kan": "消防費",
        "kubun": null,
        "prevAmountOku": 2.5472,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "ＩＣＴ教育支援事業",
        "amountOku": 10.70403,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.50997,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "子ども医療費支給事業",
        "amountOku": 10.33777,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 10.10492,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "定額減税不足額給付事業費（物価高騰対応）",
        "amountOku": 8.67583,
        "kan": "総務費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "予防接種事業",
        "amountOku": 8.29204,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 6.80225,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "放課後児童健全育成事業",
        "amountOku": 7.68483,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 6.67233,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "パートタイム会計年度任用職員活用費",
        "amountOku": 6.91363,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 6.77827,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "後期高齢者医療特別会計繰出金",
        "amountOku": 6.89686,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 6.67401,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "児童扶養・遺児手当支給事業",
        "amountOku": 6.31944,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 5.91725,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "下水道事業会計繰出金",
        "amountOku": 5.8039,
        "kan": "諸支出金",
        "kubun": null,
        "prevAmountOku": 7.86407,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "愛知御津駅周辺まちづくり整備事業",
        "amountOku": 4.58698,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.84951,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "プリオビル管理運営事業",
        "amountOku": 4.47499,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 4.24523,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "市内道路整備事業",
        "amountOku": 4.3586,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 4.71557,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "豊川駅東土地区画整理事業特別会計繰出金",
        "amountOku": 4.29337,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 12.97321,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "就学前教育・保育施設整備費補助",
        "amountOku": 3.95874,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 4.26875,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "水道事業会計繰出金（物価高騰対応）",
        "amountOku": 3.51063,
        "kan": "諸支出金",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "ごみ収集管理運営事業",
        "amountOku": 3.36264,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 3.24013,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "斎場会館管理運営事業",
        "amountOku": 2.9592,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 3.1299,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "市議会議員報酬等",
        "amountOku": 2.93683,
        "kan": "議会費",
        "kubun": null,
        "prevAmountOku": 2.96777,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "小中学校環境対策事業",
        "amountOku": 2.9,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 3.0292,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "健康診査事業",
        "amountOku": 2.76154,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 2.61876,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "消防車両等整備事業",
        "amountOku": 2.755,
        "kan": "消防費",
        "kubun": null,
        "prevAmountOku": 2.1,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "生涯学習センター管理事業",
        "amountOku": 2.41225,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 2.86136,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "一宮地域交流会館（仮称）整備事業",
        "amountOku": 2.30095,
        "kan": "総務費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "小中学校校舎施設営繕事業",
        "amountOku": 2.13,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 1.00072,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "三河国府跡保存整備事業",
        "amountOku": 2.0848,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 2.56535,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "母子保健事業（健康診査）",
        "amountOku": 2.05633,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 2.08756,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "道路等維持補修事業",
        "amountOku": 1.9813,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.85146,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "公共交通機関等利用促進事業",
        "amountOku": 1.97315,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.40902,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "上宿樽井線（市田野口工区）整備事業",
        "amountOku": 1.96675,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.33025,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "学校給食センター長寿命化事業",
        "amountOku": 1.9,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 1.29487,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "中央図書館管理運営事業",
        "amountOku": 1.87236,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 2.70433,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "給食費無料化事業",
        "amountOku": 1.82492,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 1.8314,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "橋りょう整備事業",
        "amountOku": 1.728,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.5202,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "市営住宅長寿命化対策事業",
        "amountOku": 1.704,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.78,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "城跡市役所線整備事業",
        "amountOku": 1.6926,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.93225,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "地区市民館施設整備事業",
        "amountOku": 1.52138,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 4.00089,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "市債等利子償還金",
        "amountOku": 1.43703,
        "kan": "公債費",
        "kubun": null,
        "prevAmountOku": 1.04531,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "都市公園整備事業",
        "amountOku": 1.43001,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.12777,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "豊川稲荷門前基盤整備事業",
        "amountOku": 1.37306,
        "kan": "土木費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "児童館管理運営費",
        "amountOku": 1.35006,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 1.212,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "急傾斜地崩壊対策事業",
        "amountOku": 1.35,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.04,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "橋りょう長寿命化対策事業",
        "amountOku": 1.314,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.47684,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "小学校校舎外壁等改修事業",
        "amountOku": 1.235,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 1.163,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "伊奈美和通線整備事業",
        "amountOku": 1.21654,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.222,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "豊川西部土地区画整理事業特別会計繰出金",
        "amountOku": 1.18,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.85,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "公共施設整備基金積立金",
        "amountOku": 1.15497,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.5084,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "河川維持管理事業",
        "amountOku": 1.11909,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 1.96239,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "指定統計調査",
        "amountOku": 1.09727,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.16394,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "交通安全施設整備事業",
        "amountOku": 1.08951,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 1.08051,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "学級運営支援事業",
        "amountOku": 1.08033,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.91948,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "企業再投資促進補助",
        "amountOku": 1.07713,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 3.26769,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "学校給食費保護者負担軽減事業",
        "amountOku": 1.02244,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.76791,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "小坂井中学校校舎改築等事業",
        "amountOku": 1.01516,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 1.4619,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "企業立地促進補助",
        "amountOku": 0.99014,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.9642,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "水泳指導支援事業",
        "amountOku": 0.97614,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.2508,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "道路等施設管理事業",
        "amountOku": 0.96709,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.12179,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "固定資産税土地評価鑑定事業",
        "amountOku": 0.95596,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.29728,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "豊川駅東西自由通路等管理事業",
        "amountOku": 0.94759,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.39093,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "マイナンバーカード交付事業",
        "amountOku": 0.93069,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.6069,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "情報技術活用推進事業",
        "amountOku": 0.84504,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 1.35685,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "選挙費",
        "amountOku": 0.75997,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.01766,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "産地パワーアップ事業費補助",
        "amountOku": 0.67637,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.72392,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "就農者確保対策事業",
        "amountOku": 0.54292,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.60507,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "分団詰所整備事業",
        "amountOku": 0.54019,
        "kan": "消防費",
        "kubun": null,
        "prevAmountOku": 0.08122,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "市観光協会補助",
        "amountOku": 0.53979,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.50659,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "重層的支援体制整備事業",
        "amountOku": 0.53762,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.51356,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "足山田大木線拡幅改良事業",
        "amountOku": 0.53069,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.01997,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "土地改良事業",
        "amountOku": 0.5145,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.49,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "豊川駅東土地区画整理地内公園整備事業",
        "amountOku": 0.49647,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.06506,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "高齢者能力活用推進事業",
        "amountOku": 0.47969,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.45171,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "(新）戸籍の振り仮名法制化対応事業",
        "amountOku": 0.47266,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "防犯対策事業",
        "amountOku": 0.44772,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.44563,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "一般介護予防事業",
        "amountOku": 0.42683,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.41044,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "子育て応援金支給事業",
        "amountOku": 0.42311,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.42239,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.42214,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.30185,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "市民まつり補助",
        "amountOku": 0.42,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.38,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.39655,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.25442,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "賦課計算事務等委託",
        "amountOku": 0.3885,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.40928,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "新規土地区画整理事業適地調査事業",
        "amountOku": 0.369,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.03784,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "地球温暖化対策事業",
        "amountOku": 0.36702,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 0.34251,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "要保護児童対策地域協議会事業",
        "amountOku": 0.36405,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.00408,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "立地適正化計画関連事業",
        "amountOku": 0.33823,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.32531,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "一宮大木土地区画整理地内公園整備事業",
        "amountOku": 0.33694,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.06006,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "児童発達相談センター管理運営事業",
        "amountOku": 0.31353,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.18386,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "牛久保駅前整備事業",
        "amountOku": 0.30627,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.06027,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "睦美保育園改築事業",
        "amountOku": 0.30158,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.25513,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "障害者ワークステーション事業",
        "amountOku": 0.28582,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.22838,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.28241,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.20411,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "自転車駐車場管理事業",
        "amountOku": 0.28126,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.14332,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "地震対策事業",
        "amountOku": 0.27809,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.27787,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "都市計画調査事業",
        "amountOku": 0.27284,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.24694,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "桜ヶ丘ミュージアム展示事業",
        "amountOku": 0.25745,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.18897,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "収入保険加入支援事業費補助",
        "amountOku": 0.24,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.24,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.23434,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.12029,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "交通安全対策推進事業",
        "amountOku": 0.21822,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.21312,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "認知症総合支援事業",
        "amountOku": 0.2177,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.19345,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "土地改良施設維持管理適正化事業",
        "amountOku": 0.21254,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.16073,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "障害者交通料金助成事業",
        "amountOku": 0.20629,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.20111,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "中心市街地活性化事業",
        "amountOku": 0.20411,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.56581,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "水害ハザードマップ作成等事業",
        "amountOku": 0.19831,
        "kan": "総務費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "空家等対策推進事業",
        "amountOku": 0.18897,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.1787,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "民生委員関係事業",
        "amountOku": 0.18607,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.18283,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "稲荷公園再整備事業",
        "amountOku": 0.18334,
        "kan": "土木費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "文化会館等運営管理検討調査事業",
        "amountOku": 0.18,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.44,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "為当地区工業用地整備推進事業",
        "amountOku": 0.16671,
        "kan": "商工費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "こぎつね教室事業",
        "amountOku": 0.16627,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.14311,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "無電柱化推進事業",
        "amountOku": 0.139,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.21025,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "文化ホール公演事業",
        "amountOku": 0.13095,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.13655,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "地区集会施設建設等事業費補助",
        "amountOku": 0.12938,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.11099,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "私立幼稚園入園応援金支給事業",
        "amountOku": 0.126,
        "kan": "民生費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "森林整備事業",
        "amountOku": 0.121,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.162,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "中部小学校校舎改修事業",
        "amountOku": 0.12,
        "kan": "教育費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "三河一宮駅周辺まちづくり整備事業",
        "amountOku": 0.11927,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.03,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "ＯＣＲ読取機更新事業",
        "amountOku": 0.119,
        "kan": "総務費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "御油松並木土地買上等事業",
        "amountOku": 0.1116,
        "kan": "教育費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "職員研修事業",
        "amountOku": 0.10527,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.09793,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "シティセールス推進事業",
        "amountOku": 0.10021,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.17381,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "第7次総合計画策定事業",
        "amountOku": 0.09983,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.17803,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "スクールソーシャルワーカー配置事業",
        "amountOku": 0.08976,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.07675,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "観光一般事業費",
        "amountOku": 0.08916,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.06009,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "奨学金返還支援事業",
        "amountOku": 0.08811,
        "kan": "労働費",
        "kubun": null,
        "prevAmountOku": 0.07371,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "拠点地区定住促進事業",
        "amountOku": 0.086,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.086,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "有価物回収事業費補助",
        "amountOku": 0.08,
        "kan": "衛生費",
        "kubun": null,
        "prevAmountOku": 0.08,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "企業誘致推進事業",
        "amountOku": 0.07947,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.04616,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "スポーツ・文化活動等合宿支援事業",
        "amountOku": 0.07,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.06546,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "三河国分寺跡保存整備事業",
        "amountOku": 0.06573,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.123,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "キュパティーノ市交流事業",
        "amountOku": 0.06572,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.05616,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "交通安全指導隊支援事業",
        "amountOku": 0.06402,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.05345,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "部活動総合支援事業",
        "amountOku": 0.06076,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.04326,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "スタートアップ連携事業",
        "amountOku": 0.06052,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.04164,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "市営住宅移転事業",
        "amountOku": 0.0545,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.1358,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "中山間地域等直接支払交付金事業",
        "amountOku": 0.05366,
        "kan": "農林水産業費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "スポーツ推進員報酬",
        "amountOku": 0.0518,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.0444,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "地域商業強化推進事業",
        "amountOku": 0.05125,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.135,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "白鳥地区工業用地整備推進事業",
        "amountOku": 0.051,
        "kan": "商工費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "市民意識調査事業",
        "amountOku": 0.04542,
        "kan": "総務費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "平和祈念式典開催事業",
        "amountOku": 0.04123,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.02541,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "市民協働推進事業",
        "amountOku": 0.04028,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.04231,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "結婚支援事業",
        "amountOku": 0.03708,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.02337,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "水道事業会計繰出金",
        "amountOku": 0.03426,
        "kan": "諸支出金",
        "kubun": null,
        "prevAmountOku": 0.01507,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "監査委員報酬",
        "amountOku": 0.03268,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.03268,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "スポーツイベント開催支援事業",
        "amountOku": 0.0317,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.03139,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "創業・起業支援事業",
        "amountOku": 0.03112,
        "kan": "商工費",
        "kubun": null,
        "prevAmountOku": 0.03262,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "農業施設災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "林業施設災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "道路橋りょう災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "河川災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "都市計画施設災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "豊川産農産物普及推進事業",
        "amountOku": 0.0303,
        "kan": "農林水産業費",
        "kubun": null,
        "prevAmountOku": 0.02779,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "首都圏人材確保支援事業費補助",
        "amountOku": 0.03,
        "kan": "労働費",
        "kubun": null,
        "prevAmountOku": 0.03,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "伝統芸能支援事業",
        "amountOku": 0.0244,
        "kan": "教育費",
        "kubun": null,
        "prevAmountOku": 0.01999,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "町内会負担軽減事業",
        "amountOku": 0.02197,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.02245,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "合理的配慮提供支援助成事業",
        "amountOku": 0.0175,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.01816,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "大型運転免許等取得支援事業費補助",
        "amountOku": 0.016,
        "kan": "労働費",
        "kubun": null,
        "prevAmountOku": 0.016,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "密集市街地整備事業",
        "amountOku": 0.012,
        "kan": "土木費",
        "kubun": null,
        "prevAmountOku": 0.008,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "避難行動要支援者支援事業",
        "amountOku": 0.00677,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.00515,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "難聴高齢者補聴器購入費助成事業",
        "amountOku": 0.006,
        "kan": "民生費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "避難行動要支援者支援事業",
        "amountOku": 0.00588,
        "kan": "民生費",
        "kubun": null,
        "prevAmountOku": 0.00368,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "入札及び契約制度改革推進事業",
        "amountOku": 0.00345,
        "kan": "総務費",
        "kubun": null,
        "prevAmountOku": 0.00331,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "事業承継支援事業",
        "amountOku": 0.002,
        "kan": "商工費",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      }
    ],
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
    "projects": [
      {
        "name": "（仮称）富秋学園整備事業",
        "amountOku": 59.12885,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "お買い物割引チケット事業（国の交付金を活用）",
        "amountOku": 12.18861,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "小中学校大規模改修事業",
        "amountOku": 10.5379,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "（仮称）いずみ国府こども園整備事業",
        "amountOku": 8.30087,
        "kan": null,
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "青少年の家リニューアル事業",
        "amountOku": 7.149,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "小中学校給食費補助事業",
        "amountOku": 5.98,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "新設認定こども園整備補助事業（中部地域）",
        "amountOku": 4.76915,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "（仮称）防災備蓄倉庫整備事業",
        "amountOku": 4.195,
        "kan": null,
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "富秋中学校区等まちづくり推進事業",
        "amountOku": 3.09487,
        "kan": null,
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "水道料金減額による生活支援事業（国の交付金を活用）",
        "amountOku": 2.81489,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "小中学校大型モニター（次世代型電子黒板）整備事業",
        "amountOku": 2.37,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "中学校少人数学級編制事業、学力向上推進事業",
        "amountOku": 2.17727,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "黒鳥山公園整備事業",
        "amountOku": 2.14,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "電子地域ポイント事業",
        "amountOku": 1.60321,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "池上曽根史跡公園整備事業",
        "amountOku": 0.76748,
        "kan": null,
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "７０周年市民提案特別記念事業(ドローンショーなど)",
        "amountOku": 0.584,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "上記以外の記念事業(いずもく製「記念ものさし」、公開番組など)",
        "amountOku": 0.42177,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "こども家庭相談事業",
        "amountOku": 0.41354,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "医療的ケア機能を備えた民間保育施設への看護師配置支援事業",
        "amountOku": 0.3482,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "デイタイム救急隊の設立",
        "amountOku": 0.30507,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "防犯灯電気料金の全額補助",
        "amountOku": 0.30449,
        "kan": null,
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "地域交通共創モデル事業",
        "amountOku": 0.27296,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "だんじり曳行事業",
        "amountOku": 0.27163,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "美術館記念事業(ﾌﾟﾛｼﾞｪｸｼｮﾝﾏｯﾋﾟﾝｸﾞ、ﾅｲﾄﾐｭｰｼﾞｱﾑなど)",
        "amountOku": 0.15489,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "チャレンジオフィスの開設",
        "amountOku": 0.11344,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "７０周年記念式典事業",
        "amountOku": 0.0707,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "タイムカプセル開封事業",
        "amountOku": 0.05716,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "５歳児健診事業",
        "amountOku": 0.02474,
        "kan": null,
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      }
    ],
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
    "projects": [],
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
