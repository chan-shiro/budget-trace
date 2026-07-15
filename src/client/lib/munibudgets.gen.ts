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
 * 団体コード → 当初予算の**全収録年度**（新しい順）。年度ドロップダウンはこれで作る。
 * 1年度しか収録していない自治体は要素1つの配列になる。
 */
export const MUNI_BUDGET_YEARS: Record<string, MuniBudget[]> = {
  "111007": [
    {
      "muniCode": "111007",
      "muniName": "さいたま市",
      "prefName": "埼玉県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 1350500,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 7160,
      "prevTotalOku": 7034,
      "yoyLabel": "+1.8%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3161.58003,
          "prevV": 3037.53003,
          "yoy": 4.1
        },
        {
          "name": "国庫支出金",
          "v": 1491.4343,
          "prevV": 1515.41772,
          "yoy": -1.6
        },
        {
          "name": "市債",
          "v": 536.283,
          "prevV": 654.918,
          "yoy": -18.1
        },
        {
          "name": "県支出金",
          "v": 418.34396,
          "prevV": 385.28615,
          "yoy": 8.6
        },
        {
          "name": "地方消費税交付金",
          "v": 367.74,
          "prevV": 330.42,
          "yoy": 11.3
        },
        {
          "name": "諸収入",
          "v": 348.85904,
          "prevV": 394.5441,
          "yoy": -11.6
        },
        {
          "name": "繰入金",
          "v": 285.05101,
          "prevV": 209.22279,
          "yoy": 36.2
        },
        {
          "name": "地方交付税",
          "v": 134,
          "prevV": 89,
          "yoy": 50.6
        },
        {
          "name": "その他",
          "v": 416.70865999999995,
          "prevV": 417.66121,
          "yoy": null,
          "children": [
            {
              "name": "使用料及び手数料",
              "v": 82.32733,
              "prevV": 81.00987,
              "yoy": 1.6
            },
            {
              "name": "地方特例交付金",
              "v": 54.17,
              "prevV": 19.6,
              "yoy": 176.4
            },
            {
              "name": "財産収入",
              "v": 51.98604,
              "prevV": 74.00515,
              "yoy": -29.8
            },
            {
              "name": "分担金及び負担金",
              "v": 43.32165,
              "prevV": 41.3125,
              "yoy": 4.9
            },
            {
              "name": "軽油引取税交付金",
              "v": 37.16,
              "prevV": 61.9,
              "yoy": -40
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 35.28,
              "prevV": 30.46,
              "yoy": 15.8
            },
            {
              "name": "法人事業税交付金",
              "v": 30.49,
              "prevV": 28.15,
              "yoy": 8.3
            },
            {
              "name": "地方譲与税",
              "v": 29.22,
              "prevV": 30.6,
              "yoy": -4.5
            },
            {
              "name": "配当割交付金",
              "v": 24.86,
              "prevV": 18.16,
              "yoy": 36.9
            },
            {
              "name": "寄附金",
              "v": 14.07421,
              "prevV": 14.05367,
              "yoy": 0.1
            },
            {
              "name": "利子割交付金",
              "v": 7.22,
              "prevV": 2.17,
              "yoy": 232.7
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.73,
              "prevV": 3.75,
              "yoy": -0.5
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 2.4,
              "prevV": 2.5,
              "yoy": -4
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.44,
              "prevV": 0.51,
              "yoy": -13.7
            },
            {
              "name": "環境性能割交付金",
              "v": 0.02941,
              "prevV": 9.48,
              "yoy": -99.7
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
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
          "v": 2836.10456,
          "prevV": 2757.23852,
          "yoy": 2.9
        },
        {
          "name": "教育費",
          "v": 1201.4108,
          "prevV": 1198.44486,
          "yoy": 0.2
        },
        {
          "name": "土木費",
          "v": 765.67994,
          "prevV": 832.69886,
          "yoy": -8
        },
        {
          "name": "総務費",
          "v": 666.27306,
          "prevV": 593.09488,
          "yoy": 12.3
        },
        {
          "name": "公債費",
          "v": 595.93288,
          "prevV": 558.35639,
          "yoy": 6.7
        },
        {
          "name": "衛生費",
          "v": 582.41849,
          "prevV": 577.93152,
          "yoy": 0.8
        },
        {
          "name": "商工費",
          "v": 259.10657,
          "prevV": 279.99448,
          "yoy": -7.5
        },
        {
          "name": "消防費",
          "v": 199.05159,
          "prevV": 191.0896,
          "yoy": 4.2
        },
        {
          "name": "農林水産業費",
          "v": 32.4095,
          "prevV": 24.01865,
          "yoy": 34.9
        },
        {
          "name": "議会費",
          "v": 17.38979,
          "prevV": 16.97217,
          "yoy": 2.5
        },
        {
          "name": "労働費",
          "v": 2.22277,
          "prevV": 2.16002,
          "yoy": 2.9
        },
        {
          "name": "予備費",
          "v": 2,
          "prevV": 2,
          "yoy": 0
        },
        {
          "name": "災害復旧費",
          "v": 0.00005,
          "prevV": 0.00005,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260509164516/https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
      "originUrl": "https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
      "sourceLocalUrl": "/sources/saitama-yosansho-r8/reiwa8nendotousyoyosan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260509164516/https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
          "localUrl": "/sources/saitama-yosansho-r8/reiwa8nendotousyoyosan.pdf",
          "source": "www.city.saitama.lg.jp",
          "thumb": "reiwa8nendotousyoyosan.pdf ・ sha256 8509236e27fced49… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "111007",
      "muniName": "さいたま市",
      "prefName": "埼玉県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 1350500,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 7034,
      "prevTotalOku": 7120,
      "yoyLabel": "-1.2%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3037.53003,
          "prevV": 2828.28003,
          "yoy": 7.4
        },
        {
          "name": "国庫支出金",
          "v": 1515.41772,
          "prevV": 1465.97751,
          "yoy": 3.4
        },
        {
          "name": "市債",
          "v": 654.918,
          "prevV": 898.871,
          "yoy": -27.1
        },
        {
          "name": "諸収入",
          "v": 394.5441,
          "prevV": 448.83779,
          "yoy": -12.1
        },
        {
          "name": "県支出金",
          "v": 385.28615,
          "prevV": 356.55421,
          "yoy": 8.1
        },
        {
          "name": "地方消費税交付金",
          "v": 330.42,
          "prevV": 301.68,
          "yoy": 9.5
        },
        {
          "name": "繰入金",
          "v": 209.22279,
          "prevV": 258.96555,
          "yoy": -19.2
        },
        {
          "name": "地方交付税",
          "v": 89,
          "prevV": 84,
          "yoy": 6
        },
        {
          "name": "その他",
          "v": 417.66121000000004,
          "prevV": 476.83391,
          "yoy": null,
          "children": [
            {
              "name": "使用料及び手数料",
              "v": 81.00987,
              "prevV": 80.77133,
              "yoy": 0.3
            },
            {
              "name": "財産収入",
              "v": 74.00515,
              "prevV": 72.36873,
              "yoy": 2.3
            },
            {
              "name": "軽油引取税交付金",
              "v": 61.9,
              "prevV": 61.73,
              "yoy": 0.3
            },
            {
              "name": "分担金及び負担金",
              "v": 41.3125,
              "prevV": 42.67008,
              "yoy": -3.2
            },
            {
              "name": "地方譲与税",
              "v": 30.6,
              "prevV": 30.28,
              "yoy": 1.1
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 30.46,
              "prevV": 17.62,
              "yoy": 72.9
            },
            {
              "name": "法人事業税交付金",
              "v": 28.15,
              "prevV": 26.22,
              "yoy": 7.4
            },
            {
              "name": "地方特例交付金",
              "v": 19.6,
              "prevV": 104.05,
              "yoy": -81.2
            },
            {
              "name": "配当割交付金",
              "v": 18.16,
              "prevV": 15.25,
              "yoy": 19.1
            },
            {
              "name": "寄附金",
              "v": 14.05367,
              "prevV": 9.48375,
              "yoy": 48.2
            },
            {
              "name": "環境性能割交付金",
              "v": 9.48,
              "prevV": 8.59,
              "yoy": 10.4
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.75,
              "prevV": 3.42,
              "yoy": 9.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 2.5,
              "prevV": 2.7,
              "yoy": -7.4
            },
            {
              "name": "利子割交付金",
              "v": 2.17,
              "prevV": 1.08,
              "yoy": 100.9
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.51,
              "prevV": 0.6,
              "yoy": -15
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
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
          "v": 2757.23852,
          "prevV": 2629.76022,
          "yoy": 4.8
        },
        {
          "name": "教育費",
          "v": 1198.44486,
          "prevV": 1164.5557,
          "yoy": 2.9
        },
        {
          "name": "土木費",
          "v": 832.69886,
          "prevV": 801.55345,
          "yoy": 3.9
        },
        {
          "name": "総務費",
          "v": 593.09488,
          "prevV": 568.75308,
          "yoy": 4.3
        },
        {
          "name": "衛生費",
          "v": 577.93152,
          "prevV": 844.53502,
          "yoy": -31.6
        },
        {
          "name": "公債費",
          "v": 558.35639,
          "prevV": 542.63059,
          "yoy": 2.9
        },
        {
          "name": "商工費",
          "v": 279.99448,
          "prevV": 331.83089,
          "yoy": -15.6
        },
        {
          "name": "消防費",
          "v": 191.0896,
          "prevV": 195.83699,
          "yoy": -2.4
        },
        {
          "name": "農林水産業費",
          "v": 24.01865,
          "prevV": 19.17737,
          "yoy": 25.2
        },
        {
          "name": "議会費",
          "v": 16.97217,
          "prevV": 17.064,
          "yoy": -0.5
        },
        {
          "name": "労働費",
          "v": 2.16002,
          "prevV": 2.30264,
          "yoy": -6.2
        },
        {
          "name": "予備費",
          "v": 2,
          "prevV": 2,
          "yoy": 0
        },
        {
          "name": "災害復旧費",
          "v": 0.00005,
          "prevV": 0.00005,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和7年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715151305/https://www.city.saitama.lg.jp/006/007/011/001/020/p119990_d/fil/reiwa7nendotousyoyosan.pdf",
      "originUrl": "https://www.city.saitama.lg.jp/006/007/011/001/020/p119990_d/fil/reiwa7nendotousyoyosan.pdf",
      "sourceLocalUrl": "/sources/saitama-yosansho-r7/reiwa7nendotousyoyosan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和7年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715151305/https://www.city.saitama.lg.jp/006/007/011/001/020/p119990_d/fil/reiwa7nendotousyoyosan.pdf",
          "localUrl": "/sources/saitama-yosansho-r7/reiwa7nendotousyoyosan.pdf",
          "source": "www.city.saitama.lg.jp",
          "thumb": "reiwa7nendotousyoyosan.pdf ・ sha256 d375aaf74b19eb5f… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "141003": [
    {
      "muniCode": "141003",
      "muniName": "横浜市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 3753398,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 20993.42124,
      "prevTotalOku": 19844.07988,
      "yoyLabel": "+5.8%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 9758.97,
          "prevV": 9428.73,
          "yoy": 3.5
        },
        {
          "name": "国庫支出金",
          "v": 4492.80714,
          "prevV": 4264.76103,
          "yoy": 5.3
        },
        {
          "name": "市債",
          "v": 1304.9,
          "prevV": 1026.88,
          "yoy": 27.1
        },
        {
          "name": "県支出金",
          "v": 1284.44562,
          "prevV": 1176.52639,
          "yoy": 9.2
        },
        {
          "name": "地方消費税交付金",
          "v": 1073.01,
          "prevV": 994.29,
          "yoy": 7.9
        },
        {
          "name": "諸収入",
          "v": 693.68678,
          "prevV": 764.03368,
          "yoy": -9.2
        },
        {
          "name": "繰入金",
          "v": 506.21217,
          "prevV": 367.66335,
          "yoy": 37.7
        },
        {
          "name": "使用料及び手数料",
          "v": 501.4774,
          "prevV": 495.26056,
          "yoy": 1.3
        },
        {
          "name": "その他",
          "v": 1377.91213,
          "prevV": 1325.9348699999998,
          "yoy": null,
          "children": [
            {
              "name": "地方交付税",
              "v": 280,
              "prevV": 250,
              "yoy": 12
            },
            {
              "name": "分担金及び負担金",
              "v": 224.68794,
              "prevV": 303.81884,
              "yoy": -26
            },
            {
              "name": "財産収入",
              "v": 133.41917,
              "prevV": 125.85781,
              "yoy": 6
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 126.66,
              "prevV": 62.7,
              "yoy": 102
            },
            {
              "name": "地方特例交付金",
              "v": 122.01,
              "prevV": 44.65,
              "yoy": 173.3
            },
            {
              "name": "法人事業税交付金",
              "v": 107.6,
              "prevV": 108.06,
              "yoy": -0.4
            },
            {
              "name": "配当割交付金",
              "v": 94.53,
              "prevV": 65.35,
              "yoy": 44.7
            },
            {
              "name": "地方譲与税",
              "v": 87.27,
              "prevV": 89.98,
              "yoy": -3
            },
            {
              "name": "寄附金",
              "v": 78.12501,
              "prevV": 84.00821,
              "yoy": -7
            },
            {
              "name": "軽油引取税交付金",
              "v": 76.5698,
              "prevV": 122.16,
              "yoy": -37.3
            },
            {
              "name": "利子割交付金",
              "v": 19.88,
              "prevV": 9.71,
              "yoy": 104.7
            },
            {
              "name": "分離課税所得割交付金",
              "v": 14.06,
              "prevV": 11.81,
              "yoy": 19.1
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 6.55,
              "prevV": 7.24,
              "yoy": -9.5
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.55,
              "prevV": 1.5,
              "yoy": 3.3
            },
            {
              "name": "環境性能割交付金",
              "v": 0.0002,
              "prevV": 34.09,
              "yoy": -100
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
          "name": "こども青少年費",
          "v": 4225.51271,
          "prevV": 4124.06274,
          "yoy": 2.5
        },
        {
          "name": "健康福祉費",
          "v": 4159.46165,
          "prevV": 3808.47558,
          "yoy": 9.2
        },
        {
          "name": "教育費",
          "v": 3337.3366,
          "prevV": 2978.26468,
          "yoy": 12.1
        },
        {
          "name": "諸支出金",
          "v": 2105.59924,
          "prevV": 2011.98013,
          "yoy": 4.7
        },
        {
          "name": "公債費",
          "v": 1772.85013,
          "prevV": 1663.5826,
          "yoy": 6.6
        },
        {
          "name": "総務費",
          "v": 1435.48983,
          "prevV": 1262.11455,
          "yoy": 13.7
        },
        {
          "name": "道路費",
          "v": 574.40489,
          "prevV": 564.74916,
          "yoy": 1.7
        },
        {
          "name": "資源循環費",
          "v": 550.86003,
          "prevV": 510.37942,
          "yoy": 7.9
        },
        {
          "name": "消防費",
          "v": 457.64721,
          "prevV": 464.66262,
          "yoy": -1.5
        },
        {
          "name": "市民費",
          "v": 457.20301,
          "prevV": 494.09349,
          "yoy": -7.5
        },
        {
          "name": "経済費",
          "v": 453.40124,
          "prevV": 537.04712,
          "yoy": -15.6
        },
        {
          "name": "みどり環境費",
          "v": 351.38369,
          "prevV": 329.09944,
          "yoy": 6.8
        },
        {
          "name": "建築費",
          "v": 329.22756,
          "prevV": 313.80009,
          "yoy": 4.9
        },
        {
          "name": "医療費",
          "v": 273.85168,
          "prevV": 262.97707,
          "yoy": 4.1
        },
        {
          "name": "にぎわいスポーツ文化費",
          "v": 171.60109,
          "prevV": 180.57676,
          "yoy": -5
        },
        {
          "name": "港湾費",
          "v": 138.00797,
          "prevV": 147.36337,
          "yoy": -6.3
        },
        {
          "name": "都市整備費",
          "v": 108.52808,
          "prevV": 94.11008,
          "yoy": 15.3
        },
        {
          "name": "河川費",
          "v": 49.00827,
          "prevV": 54.73586,
          "yoy": -10.5
        },
        {
          "name": "議会費",
          "v": 32.04636,
          "prevV": 32.00512,
          "yoy": 0.1
        },
        {
          "name": "予備費",
          "v": 10,
          "prevV": 10,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
      "sourceLocalUrl": "/sources/yokohama-yosansho-r8/r8ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
          "localUrl": "/sources/yokohama-yosansho-r8/r8ippan.pdf",
          "source": "www.city.yokohama.lg.jp",
          "thumb": "r8ippan.pdf ・ sha256 4778573fa49f3257… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141003",
      "muniName": "横浜市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 3753398,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 19844.07988,
      "prevTotalOku": 19155.53874,
      "yoyLabel": "+3.6%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 9428.73,
          "prevV": 8809.97,
          "yoy": 7
        },
        {
          "name": "国庫支出金",
          "v": 4264.76103,
          "prevV": 3839.71325,
          "yoy": 11.1
        },
        {
          "name": "県支出金",
          "v": 1176.52639,
          "prevV": 1061.51706,
          "yoy": 10.8
        },
        {
          "name": "市債",
          "v": 1026.88,
          "prevV": 1065.77,
          "yoy": -3.6
        },
        {
          "name": "地方消費税交付金",
          "v": 994.29,
          "prevV": 833.98,
          "yoy": 19.2
        },
        {
          "name": "諸収入",
          "v": 764.03368,
          "prevV": 1057.6598,
          "yoy": -27.8
        },
        {
          "name": "使用料及び手数料",
          "v": 495.26056,
          "prevV": 494.66208,
          "yoy": 0.1
        },
        {
          "name": "繰入金",
          "v": 367.66335,
          "prevV": 514.4931,
          "yoy": -28.5
        },
        {
          "name": "その他",
          "v": 1325.9348699999998,
          "prevV": 1477.77345,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 303.81884,
              "prevV": 288.41114,
              "yoy": 5.3
            },
            {
              "name": "地方交付税",
              "v": 250,
              "prevV": 270,
              "yoy": -7.4
            },
            {
              "name": "財産収入",
              "v": 125.85781,
              "prevV": 130.74407,
              "yoy": -3.7
            },
            {
              "name": "軽油引取税交付金",
              "v": 122.16,
              "prevV": 121.44,
              "yoy": 0.6
            },
            {
              "name": "法人事業税交付金",
              "v": 108.06,
              "prevV": 100.76,
              "yoy": 7.2
            },
            {
              "name": "地方譲与税",
              "v": 89.98,
              "prevV": 86.95,
              "yoy": 3.5
            },
            {
              "name": "寄附金",
              "v": 84.00821,
              "prevV": 54.22823,
              "yoy": 54.9
            },
            {
              "name": "配当割交付金",
              "v": 65.35,
              "prevV": 53.82,
              "yoy": 21.4
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 62.7,
              "prevV": 45.44,
              "yoy": 38
            },
            {
              "name": "地方特例交付金",
              "v": 44.65,
              "prevV": 272.54,
              "yoy": -83.6
            },
            {
              "name": "環境性能割交付金",
              "v": 34.09,
              "prevV": 26.99,
              "yoy": 26.3
            },
            {
              "name": "分離課税所得割交付金",
              "v": 11.81,
              "prevV": 10.36,
              "yoy": 14
            },
            {
              "name": "利子割交付金",
              "v": 9.71,
              "prevV": 2.2,
              "yoy": 341.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 7.24,
              "prevV": 7.43,
              "yoy": -2.6
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.5,
              "prevV": 1.46,
              "yoy": 2.7
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
          "name": "こども青少年費",
          "v": 4124.06274,
          "prevV": 3695.20043,
          "yoy": 11.6
        },
        {
          "name": "健康福祉費",
          "v": 3808.47558,
          "prevV": 3620.77981,
          "yoy": 5.2
        },
        {
          "name": "教育費",
          "v": 2977.05448,
          "prevV": 2860.32208,
          "yoy": 4.1
        },
        {
          "name": "諸支出金",
          "v": 2011.98013,
          "prevV": 1939.7037,
          "yoy": 3.7
        },
        {
          "name": "公債費",
          "v": 1663.5826,
          "prevV": 1741.11326,
          "yoy": -4.5
        },
        {
          "name": "総務費",
          "v": 1263.32475,
          "prevV": 968.5634,
          "yoy": 30.4
        },
        {
          "name": "道路費",
          "v": 564.74916,
          "prevV": 662.64141,
          "yoy": -14.8
        },
        {
          "name": "経済費",
          "v": 537.04712,
          "prevV": 824.49344,
          "yoy": -34.9
        },
        {
          "name": "資源循環費",
          "v": 510.37942,
          "prevV": 481.69328,
          "yoy": 6
        },
        {
          "name": "市民費",
          "v": 494.09349,
          "prevV": 446.03487,
          "yoy": 10.8
        },
        {
          "name": "消防費",
          "v": 464.66262,
          "prevV": 437.66511,
          "yoy": 6.2
        },
        {
          "name": "みどり環境費",
          "v": 329.09944,
          "prevV": 336.00413,
          "yoy": -2.1
        },
        {
          "name": "建築費",
          "v": 313.80009,
          "prevV": 288.91741,
          "yoy": 8.6
        },
        {
          "name": "医療費",
          "v": 262.97707,
          "prevV": 266.55184,
          "yoy": -1.3
        },
        {
          "name": "にぎわいスポーツ文化費",
          "v": 180.57676,
          "prevV": 218.7826,
          "yoy": -17.5
        },
        {
          "name": "港湾費",
          "v": 147.36337,
          "prevV": 172.60927,
          "yoy": -14.6
        },
        {
          "name": "都市整備費",
          "v": 94.11008,
          "prevV": 108.32023,
          "yoy": -13.1
        },
        {
          "name": "河川費",
          "v": 54.73586,
          "prevV": 44.38132,
          "yoy": 23.3
        },
        {
          "name": "議会費",
          "v": 32.00512,
          "prevV": 31.76115,
          "yoy": 0.8
        },
        {
          "name": "予備費",
          "v": 10,
          "prevV": 10,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和7年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20250316084637/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7ippan.pdf",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7ippan.pdf",
      "sourceLocalUrl": "/sources/yokohama-yosansho-r7/r7ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和7年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20250316084637/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7ippan.pdf",
          "localUrl": "/sources/yokohama-yosansho-r7/r7ippan.pdf",
          "source": "www.city.yokohama.lg.jp",
          "thumb": "r7ippan.pdf ・ sha256 eb068408635fdc68… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141003",
      "muniName": "横浜市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R6",
      "fyLabel": "令和6年度 当初予算",
      "population": 3753398,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 19155.53874,
      "prevTotalOku": 19022.22467,
      "yoyLabel": "+0.7%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 8809.97,
          "prevV": 8618.89,
          "yoy": 2.2
        },
        {
          "name": "国庫支出金",
          "v": 3839.71325,
          "prevV": 4018.42875,
          "yoy": -4.4
        },
        {
          "name": "市債",
          "v": 1065.77,
          "prevV": 1148.03,
          "yoy": -7.2
        },
        {
          "name": "県支出金",
          "v": 1061.51706,
          "prevV": 1106.32496,
          "yoy": -4.1
        },
        {
          "name": "諸収入",
          "v": 1057.6598,
          "prevV": 1007.19799,
          "yoy": 5
        },
        {
          "name": "地方消費税交付金",
          "v": 833.98,
          "prevV": 911.06,
          "yoy": -8.5
        },
        {
          "name": "繰入金",
          "v": 514.4931,
          "prevV": 370.12344,
          "yoy": 39
        },
        {
          "name": "使用料及び手数料",
          "v": 494.66208,
          "prevV": 490.82427,
          "yoy": 0.8
        },
        {
          "name": "その他",
          "v": 1477.77345,
          "prevV": 1351.3452599999998,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 288.41114,
              "prevV": 298.51338,
              "yoy": -3.4
            },
            {
              "name": "地方特例交付金",
              "v": 272.54,
              "prevV": 52.45,
              "yoy": 419.6
            },
            {
              "name": "地方交付税",
              "v": 270,
              "prevV": 330,
              "yoy": -18.2
            },
            {
              "name": "財産収入",
              "v": 130.74407,
              "prevV": 123.05695,
              "yoy": 6.2
            },
            {
              "name": "軽油引取税交付金",
              "v": 121.44,
              "prevV": 120.34,
              "yoy": 0.9
            },
            {
              "name": "法人事業税交付金",
              "v": 100.76,
              "prevV": 95.39,
              "yoy": 5.6
            },
            {
              "name": "地方譲与税",
              "v": 86.95,
              "prevV": 86.58,
              "yoy": 0.4
            },
            {
              "name": "寄附金",
              "v": 54.22823,
              "prevV": 89.95492,
              "yoy": -39.7
            },
            {
              "name": "配当割交付金",
              "v": 53.82,
              "prevV": 60.06,
              "yoy": -10.4
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 45.44,
              "prevV": 42.14,
              "yoy": 7.8
            },
            {
              "name": "環境性能割交付金",
              "v": 26.99,
              "prevV": 24.16,
              "yoy": 11.7
            },
            {
              "name": "分離課税所得割交付金",
              "v": 10.36,
              "prevV": 10.36,
              "yoy": 0
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 7.43,
              "prevV": 8.37,
              "yoy": -11.2
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 2.2,
              "prevV": 3.46,
              "yoy": -36.4
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.46,
              "prevV": 1.51,
              "yoy": -3.3
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
          "name": "こども青少年費",
          "v": 3695.20043,
          "prevV": 3435.01408,
          "yoy": 7.6
        },
        {
          "name": "健康福祉費",
          "v": 3620.77981,
          "prevV": 3583.30786,
          "yoy": 1
        },
        {
          "name": "教育費",
          "v": 2860.32208,
          "prevV": 2729.12758,
          "yoy": 4.8
        },
        {
          "name": "諸支出金",
          "v": 1939.7037,
          "prevV": 1942.75419,
          "yoy": -0.2
        },
        {
          "name": "公債費",
          "v": 1741.11326,
          "prevV": 1777.34726,
          "yoy": -2
        },
        {
          "name": "総務費",
          "v": 971.31197,
          "prevV": 925.99045,
          "yoy": 4.9
        },
        {
          "name": "経済費",
          "v": 824.49344,
          "prevV": 806.26615,
          "yoy": 2.3
        },
        {
          "name": "道路費",
          "v": 662.53843,
          "prevV": 678.73837,
          "yoy": -2.4
        },
        {
          "name": "資源循環費",
          "v": 481.69328,
          "prevV": 420.7119,
          "yoy": 14.5
        },
        {
          "name": "市民費",
          "v": 443.2863,
          "prevV": 450.03224,
          "yoy": -1.5
        },
        {
          "name": "消防費",
          "v": 437.66511,
          "prevV": 515.7277,
          "yoy": -15.1
        },
        {
          "name": "みどり環境費",
          "v": 336.00413,
          "prevV": 325.32893,
          "yoy": 3.3
        },
        {
          "name": "建築費",
          "v": 288.91741,
          "prevV": 275.32802,
          "yoy": 4.9
        },
        {
          "name": "医療費",
          "v": 266.55184,
          "prevV": 563.87322,
          "yoy": -52.7
        },
        {
          "name": "にぎわいスポーツ文化費",
          "v": 218.7826,
          "prevV": 230.15921,
          "yoy": -4.9
        },
        {
          "name": "港湾費",
          "v": 172.60927,
          "prevV": 109.37369,
          "yoy": 57.8
        },
        {
          "name": "都市整備費",
          "v": 108.42321,
          "prevV": 167.42833,
          "yoy": -35.2
        },
        {
          "name": "河川費",
          "v": 44.38132,
          "prevV": 45.00769,
          "yoy": -1.4
        },
        {
          "name": "議会費",
          "v": 31.76115,
          "prevV": 30.7078,
          "yoy": 3.4
        },
        {
          "name": "予備費",
          "v": 10,
          "prevV": 10,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和6年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20251210144812/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6ippan.pdf",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6ippan.pdf",
      "sourceLocalUrl": "/sources/yokohama-yosansho-r6/r6ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和6年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20251210144812/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6ippan.pdf",
          "localUrl": "/sources/yokohama-yosansho-r6/r6ippan.pdf",
          "source": "www.city.yokohama.lg.jp",
          "thumb": "r6ippan.pdf ・ sha256 a54e2174b0b8262b… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141003",
      "muniName": "横浜市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R5",
      "fyLabel": "令和5年度 当初予算",
      "population": 3753398,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 19022.22467,
      "prevTotalOku": 19748.74143,
      "yoyLabel": "-3.7%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 8618.89,
          "prevV": 8438.12,
          "yoy": 2.1
        },
        {
          "name": "国庫支出金",
          "v": 4018.42875,
          "prevV": 4010.5705,
          "yoy": 0.2
        },
        {
          "name": "市債",
          "v": 1148.03,
          "prevV": 1360,
          "yoy": -15.6
        },
        {
          "name": "県支出金",
          "v": 1106.32496,
          "prevV": 1037.09768,
          "yoy": 6.7
        },
        {
          "name": "諸収入",
          "v": 1007.19799,
          "prevV": 1732.76616,
          "yoy": -41.9
        },
        {
          "name": "地方消費税交付金",
          "v": 911.06,
          "prevV": 829.07,
          "yoy": 9.9
        },
        {
          "name": "使用料及び手数料",
          "v": 490.82427,
          "prevV": 491.716,
          "yoy": -0.2
        },
        {
          "name": "繰入金",
          "v": 370.12344,
          "prevV": 432.16065,
          "yoy": -14.4
        },
        {
          "name": "その他",
          "v": 1351.3452599999998,
          "prevV": 1417.24044,
          "yoy": null,
          "children": [
            {
              "name": "地方交付税",
              "v": 330,
              "prevV": 265,
              "yoy": 24.5
            },
            {
              "name": "分担金及び負担金",
              "v": 298.51338,
              "prevV": 290.52799,
              "yoy": 2.7
            },
            {
              "name": "財産収入",
              "v": 123.05695,
              "prevV": 390.07352,
              "yoy": -68.5
            },
            {
              "name": "軽油引取税交付金",
              "v": 120.34,
              "prevV": 114.88,
              "yoy": 4.8
            },
            {
              "name": "法人事業税交付金",
              "v": 95.39,
              "prevV": 84.25,
              "yoy": 13.2
            },
            {
              "name": "寄附金",
              "v": 89.95492,
              "prevV": 8.10891,
              "yoy": 1009.3
            },
            {
              "name": "地方譲与税",
              "v": 86.58,
              "prevV": 85.61001,
              "yoy": 1.1
            },
            {
              "name": "配当割交付金",
              "v": 60.06,
              "prevV": 41.35,
              "yoy": 45.2
            },
            {
              "name": "地方特例交付金",
              "v": 52.45,
              "prevV": 50.8,
              "yoy": 3.2
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 42.14,
              "prevV": 32.42,
              "yoy": 30
            },
            {
              "name": "環境性能割交付金",
              "v": 24.16,
              "prevV": 25.28,
              "yoy": -4.4
            },
            {
              "name": "分離課税所得割交付金",
              "v": 10.36,
              "prevV": 10.59,
              "yoy": -2.2
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8.37,
              "prevV": 8.4,
              "yoy": -0.4
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 3.46,
              "prevV": 3.5,
              "yoy": -1.1
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.51,
              "prevV": 1.45,
              "yoy": 4.1
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
          "name": "健康福祉費",
          "v": 4147.18108,
          "prevV": 4083.99363,
          "yoy": 1.5
        },
        {
          "name": "こども青少年費",
          "v": 3435.01408,
          "prevV": 3290.48039,
          "yoy": 4.4
        },
        {
          "name": "教育費",
          "v": 2729.12758,
          "prevV": 2682.58021,
          "yoy": 1.7
        },
        {
          "name": "諸支出金",
          "v": 1942.75419,
          "prevV": 1935.05333,
          "yoy": 0.4
        },
        {
          "name": "公債費",
          "v": 1777.34726,
          "prevV": 2130.28579,
          "yoy": -16.6
        },
        {
          "name": "総務費",
          "v": 826.7704,
          "prevV": 776.18323,
          "yoy": 6.5
        },
        {
          "name": "経済費",
          "v": 806.26615,
          "prevV": 1551.96056,
          "yoy": -48
        },
        {
          "name": "道路費",
          "v": 727.30583,
          "prevV": 779.79768,
          "yoy": -6.7
        },
        {
          "name": "消防費",
          "v": 515.7277,
          "prevV": 432.87495,
          "yoy": 19.1
        },
        {
          "name": "市民費",
          "v": 499.479,
          "prevV": 489.80828,
          "yoy": 2
        },
        {
          "name": "資源循環費",
          "v": 420.7119,
          "prevV": 422.18603,
          "yoy": -0.3
        },
        {
          "name": "環境創造費",
          "v": 386.78727,
          "prevV": 363.63943,
          "yoy": 6.4
        },
        {
          "name": "建築費",
          "v": 275.32802,
          "prevV": 250.69658,
          "yoy": 9.8
        },
        {
          "name": "都市整備費",
          "v": 201.63027,
          "prevV": 176.11643,
          "yoy": 14.5
        },
        {
          "name": "文化観光費",
          "v": 180.71245,
          "prevV": 225.4929,
          "yoy": -19.9
        },
        {
          "name": "港湾費",
          "v": 109.37369,
          "prevV": 116.98572,
          "yoy": -6.5
        },
        {
          "name": "議会費",
          "v": 30.7078,
          "prevV": 30.60629,
          "yoy": 0.3
        },
        {
          "name": "予備費",
          "v": 10,
          "prevV": 10,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和5年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20250908133030/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.pdf",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.pdf",
      "sourceLocalUrl": "/sources/yokohama-yosansho-r5/r5ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和5年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20250908133030/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.pdf",
          "localUrl": "/sources/yokohama-yosansho-r5/r5ippan.pdf",
          "source": "www.city.yokohama.lg.jp",
          "thumb": "r5ippan.pdf ・ sha256 87e0c5107e271938… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141003",
      "muniName": "横浜市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R4",
      "fyLabel": "令和4年度 当初予算",
      "population": 3753398,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 19748.74143,
      "prevTotalOku": 20072.60724,
      "yoyLabel": "-1.6%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 8438.12,
          "prevV": 7923.09,
          "yoy": 6.5
        },
        {
          "name": "国庫支出金",
          "v": 4010.5705,
          "prevV": 3861.94526,
          "yoy": 3.8
        },
        {
          "name": "諸収入",
          "v": 1732.76616,
          "prevV": 2509.25623,
          "yoy": -30.9
        },
        {
          "name": "市債",
          "v": 1360,
          "prevV": 1717.9,
          "yoy": -20.8
        },
        {
          "name": "県支出金",
          "v": 1037.09768,
          "prevV": 944.48597,
          "yoy": 9.8
        },
        {
          "name": "地方消費税交付金",
          "v": 829.07,
          "prevV": 750.88,
          "yoy": 10.4
        },
        {
          "name": "使用料及び手数料",
          "v": 491.716,
          "prevV": 492.6848,
          "yoy": -0.2
        },
        {
          "name": "繰入金",
          "v": 432.16065,
          "prevV": 350.49411,
          "yoy": 23.3
        },
        {
          "name": "その他",
          "v": 1417.24044,
          "prevV": 1521.8708700000004,
          "yoy": null,
          "children": [
            {
              "name": "財産収入",
              "v": 390.07352,
              "prevV": 479.22118,
              "yoy": -18.6
            },
            {
              "name": "分担金及び負担金",
              "v": 290.52799,
              "prevV": 282.76962,
              "yoy": 2.7
            },
            {
              "name": "地方交付税",
              "v": 265,
              "prevV": 230,
              "yoy": 15.2
            },
            {
              "name": "軽油引取税交付金",
              "v": 114.88,
              "prevV": 116.47,
              "yoy": -1.4
            },
            {
              "name": "地方譲与税",
              "v": 85.61001,
              "prevV": 86.72001,
              "yoy": -1.3
            },
            {
              "name": "法人事業税交付金",
              "v": 84.25,
              "prevV": 74.12,
              "yoy": 13.7
            },
            {
              "name": "地方特例交付金",
              "v": 50.8,
              "prevV": 113.06,
              "yoy": -55.1
            },
            {
              "name": "配当割交付金",
              "v": 41.35,
              "prevV": 43.66,
              "yoy": -5.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 32.42,
              "prevV": 34.64,
              "yoy": -6.4
            },
            {
              "name": "環境性能割交付金",
              "v": 25.28,
              "prevV": 21.83,
              "yoy": 15.8
            },
            {
              "name": "分離課税所得割交付金",
              "v": 10.59,
              "prevV": 9.91,
              "yoy": 6.9
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8.4,
              "prevV": 8.14,
              "yoy": 3.2
            },
            {
              "name": "寄附金",
              "v": 8.10891,
              "prevV": 11.61005,
              "yoy": -30.2
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 3.5,
              "prevV": 3.39,
              "yoy": 3.2
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.45,
              "prevV": 1.33,
              "yoy": 9
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
          "name": "健康福祉費",
          "v": 4083.99363,
          "prevV": 3820.66054,
          "yoy": 6.9
        },
        {
          "name": "こども青少年費",
          "v": 3290.48039,
          "prevV": 3188.23769,
          "yoy": 3.2
        },
        {
          "name": "教育費",
          "v": 2682.58021,
          "prevV": 2613.56162,
          "yoy": 2.6
        },
        {
          "name": "公債費",
          "v": 2130.28579,
          "prevV": 1888.31785,
          "yoy": 12.8
        },
        {
          "name": "諸支出金",
          "v": 1935.05333,
          "prevV": 1887.00723,
          "yoy": 2.5
        },
        {
          "name": "経済費",
          "v": 1551.96056,
          "prevV": 2055.05039,
          "yoy": -24.5
        },
        {
          "name": "道路費",
          "v": 779.79768,
          "prevV": 1357.05651,
          "yoy": -42.5
        },
        {
          "name": "総務費",
          "v": 767.75803,
          "prevV": 741.00656,
          "yoy": 3.6
        },
        {
          "name": "市民費",
          "v": 497.86205,
          "prevV": 522.78846,
          "yoy": -4.8
        },
        {
          "name": "消防費",
          "v": 432.87495,
          "prevV": 407.99905,
          "yoy": 6.1
        },
        {
          "name": "資源循環費",
          "v": 422.18603,
          "prevV": 428.37985,
          "yoy": -1.4
        },
        {
          "name": "環境創造費",
          "v": 363.63943,
          "prevV": 369.18775,
          "yoy": -1.5
        },
        {
          "name": "建築費",
          "v": 250.69658,
          "prevV": 242.71771,
          "yoy": 3.3
        },
        {
          "name": "文化観光費",
          "v": 226.26433,
          "prevV": 184.71621,
          "yoy": 22.5
        },
        {
          "name": "都市整備費",
          "v": 175.71643,
          "prevV": 193.57814,
          "yoy": -9.2
        },
        {
          "name": "港湾費",
          "v": 116.98572,
          "prevV": 131.38181,
          "yoy": -11
        },
        {
          "name": "議会費",
          "v": 30.60629,
          "prevV": 30.95987,
          "yoy": -1.1
        },
        {
          "name": "予備費",
          "v": 10,
          "prevV": 10,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和4年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20220202122123/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.pdf",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.pdf",
      "sourceLocalUrl": "/sources/yokohama-yosansho-r4/r4ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和4年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20220202122123/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.pdf",
          "localUrl": "/sources/yokohama-yosansho-r4/r4ippan.pdf",
          "source": "www.city.yokohama.lg.jp",
          "thumb": "r4ippan.pdf ・ sha256 8f4966e197780a8a… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141003",
      "muniName": "横浜市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R3",
      "fyLabel": "令和3年度 当初予算",
      "population": 3753398,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 20072.60724,
      "prevTotalOku": 17400.16406,
      "yoyLabel": "+15.4%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 7923.09,
          "prevV": 8440.82,
          "yoy": -6.1
        },
        {
          "name": "国庫支出金",
          "v": 3861.94526,
          "prevV": 3354.16392,
          "yoy": 15.1
        },
        {
          "name": "諸収入",
          "v": 2509.25623,
          "prevV": 725.19753,
          "yoy": 246
        },
        {
          "name": "市債",
          "v": 1717.9,
          "prevV": 1266.61,
          "yoy": 35.6
        },
        {
          "name": "県支出金",
          "v": 944.48597,
          "prevV": 898.71685,
          "yoy": 5.1
        },
        {
          "name": "地方消費税交付金",
          "v": 750.88,
          "prevV": 823.69,
          "yoy": -8.8
        },
        {
          "name": "使用料及び手数料",
          "v": 492.6848,
          "prevV": 498.76279,
          "yoy": -1.2
        },
        {
          "name": "財産収入",
          "v": 479.22118,
          "prevV": 145.96267,
          "yoy": 228.3
        },
        {
          "name": "その他",
          "v": 1393.1438,
          "prevV": 1246.2403000000004,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 350.49411,
              "prevV": 330.17635,
              "yoy": 6.2
            },
            {
              "name": "分担金及び負担金",
              "v": 282.76962,
              "prevV": 274.05572,
              "yoy": 3.2
            },
            {
              "name": "地方交付税",
              "v": 230,
              "prevV": 200,
              "yoy": 15
            },
            {
              "name": "軽油引取税交付金",
              "v": 116.47,
              "prevV": 118.95,
              "yoy": -2.1
            },
            {
              "name": "地方特例交付金",
              "v": 113.06,
              "prevV": 50.51,
              "yoy": 123.8
            },
            {
              "name": "地方譲与税",
              "v": 86.72001,
              "prevV": 89.62001,
              "yoy": -3.2
            },
            {
              "name": "法人事業税交付金",
              "v": 74.12,
              "prevV": 38.81,
              "yoy": 91
            },
            {
              "name": "配当割交付金",
              "v": 43.66,
              "prevV": 46.48,
              "yoy": -6.1
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 34.64,
              "prevV": 33.96,
              "yoy": 2
            },
            {
              "name": "環境性能割交付金",
              "v": 21.83,
              "prevV": 23.54,
              "yoy": -7.3
            },
            {
              "name": "寄附金",
              "v": 11.61005,
              "prevV": 10.79821,
              "yoy": 7.5
            },
            {
              "name": "分離課税所得割交付金",
              "v": 9.91,
              "prevV": 9.91,
              "yoy": 0
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8.14,
              "prevV": 8.4,
              "yoy": -3.1
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 3.39,
              "prevV": 4.64,
              "yoy": -26.9
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.33,
              "prevV": 1.39,
              "yoy": -4.3
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
          "name": "健康福祉費",
          "v": 3820.66054,
          "prevV": 3394.88045,
          "yoy": 12.5
        },
        {
          "name": "こども青少年費",
          "v": 3188.23769,
          "prevV": 3079.30695,
          "yoy": 3.5
        },
        {
          "name": "教育費",
          "v": 2613.56162,
          "prevV": 2583.71357,
          "yoy": 1.2
        },
        {
          "name": "経済費",
          "v": 2055.05039,
          "prevV": 436.09572,
          "yoy": 371.2
        },
        {
          "name": "公債費",
          "v": 1888.31785,
          "prevV": 1891.69042,
          "yoy": -0.2
        },
        {
          "name": "諸支出金",
          "v": 1887.00723,
          "prevV": 1830.20638,
          "yoy": 3.1
        },
        {
          "name": "一般財源国県支出金市債その他道路費",
          "v": 1357.05651,
          "prevV": 817.74943,
          "yoy": 66
        },
        {
          "name": "総務費",
          "v": 741.01534,
          "prevV": 839.7832,
          "yoy": -11.8
        },
        {
          "name": "市民費",
          "v": 522.77968,
          "prevV": 516.62729,
          "yoy": 1.2
        },
        {
          "name": "資源循環費",
          "v": 428.37985,
          "prevV": 419.93265,
          "yoy": 2
        },
        {
          "name": "消防費",
          "v": 407.99905,
          "prevV": 395.22528,
          "yoy": 3.2
        },
        {
          "name": "環境創造費",
          "v": 369.18775,
          "prevV": 363.71268,
          "yoy": 1.5
        },
        {
          "name": "建築費",
          "v": 242.71771,
          "prevV": 249.1429,
          "yoy": -2.6
        },
        {
          "name": "都市整備費",
          "v": 193.57814,
          "prevV": 207.72826,
          "yoy": -6.8
        },
        {
          "name": "文化観光費",
          "v": 184.71621,
          "prevV": 142.83901,
          "yoy": 29.3
        },
        {
          "name": "港湾費",
          "v": 131.38181,
          "prevV": 190.34944,
          "yoy": -31
        },
        {
          "name": "一般財源国県支出金市債その他議会費",
          "v": 30.95987,
          "prevV": 31.18043,
          "yoy": -0.7
        },
        {
          "name": "予備費",
          "v": 10,
          "prevV": 10,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和3年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
      "sourceUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.pdf",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.pdf",
      "sourceLocalUrl": "/sources/yokohama-yosansho-r3/r3ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和3年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
          "type": "PDF",
          "url": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.pdf",
          "localUrl": "/sources/yokohama-yosansho-r3/r3ippan.pdf",
          "source": "www.city.yokohama.lg.jp",
          "thumb": "r3ippan.pdf ・ sha256 2f9c21fb2abb3d3b… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "141305": [
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 9377.53481,
      "prevTotalOku": 8927.4988,
      "yoyLabel": "+5.0%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 4271.8638,
          "prevV": 4047.56733,
          "yoy": 5.5
        },
        {
          "name": "国庫支出金",
          "v": 1802.38732,
          "prevV": 1749.70585,
          "yoy": 3
        },
        {
          "name": "市債",
          "v": 756.88,
          "prevV": 574.09,
          "yoy": 31.8
        },
        {
          "name": "繰入金",
          "v": 664.82512,
          "prevV": 809.97425,
          "yoy": -17.9
        },
        {
          "name": "県支出金",
          "v": 500.11116,
          "prevV": 450.83905,
          "yoy": 10.9
        },
        {
          "name": "地方消費税交付金",
          "v": 419.38935,
          "prevV": 364.68834,
          "yoy": 15
        },
        {
          "name": "諸収入",
          "v": 342.4738,
          "prevV": 330.92503,
          "yoy": 3.5
        },
        {
          "name": "使用料及び手数料",
          "v": 165.10598,
          "prevV": 166.27363,
          "yoy": -0.7
        },
        {
          "name": "その他",
          "v": 454.49828,
          "prevV": 433.43532,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 87.88581,
              "prevV": 86.39574,
              "yoy": 1.7
            },
            {
              "name": "財産収入",
              "v": 79.05597,
              "prevV": 109.74971,
              "yoy": -28
            },
            {
              "name": "寄附金",
              "v": 59.84871,
              "prevV": 40.24922,
              "yoy": 48.7
            },
            {
              "name": "地方特例交付金",
              "v": 44.62704,
              "prevV": 15.38763,
              "yoy": 190
            },
            {
              "name": "法人事業税交付金",
              "v": 40.42655,
              "prevV": 38.08408,
              "yoy": 6.2
            },
            {
              "name": "配当割交付金",
              "v": 40.13788,
              "prevV": 27.92393,
              "yoy": 43.7
            },
            {
              "name": "地方譲与税",
              "v": 29.30203,
              "prevV": 29.27273,
              "yoy": 0.1
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 25.94573,
              "prevV": 21.18598,
              "yoy": 22.5
            },
            {
              "name": "軽油引取税交付金",
              "v": 21.00006,
              "prevV": 38.36592,
              "yoy": -45.3
            },
            {
              "name": "利子割交付金",
              "v": 12.24823,
              "prevV": 2.07761,
              "yoy": 489.5
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.89754,
              "prevV": 4.2044,
              "yoy": 16.5
            },
            {
              "name": "地方交付税",
              "v": 4.82602,
              "prevV": 4.06962,
              "yoy": 18.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 2.92663,
              "prevV": 3.17654,
              "yoy": -7.9
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.37007,
              "prevV": 0.34665,
              "yoy": 6.8
            },
            {
              "name": "環境性能割交付金",
              "v": 0.00001,
              "prevV": 11.94556,
              "yoy": -100
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1830.74758,
          "prevV": 1833.26548,
          "yoy": -0.1
        },
        {
          "name": "こども未来費",
          "v": 1599.211,
          "prevV": 1564.96283,
          "yoy": 2.2
        },
        {
          "name": "教育費",
          "v": 1371.70732,
          "prevV": 1302.46844,
          "yoy": 5.3
        },
        {
          "name": "諸支出金",
          "v": 1199.98182,
          "prevV": 1235.73487,
          "yoy": -2.9
        },
        {
          "name": "公債費",
          "v": 759.59256,
          "prevV": 748.8006,
          "yoy": 1.4
        },
        {
          "name": "総務費",
          "v": 678.22905,
          "prevV": 628.8584,
          "yoy": 7.9
        },
        {
          "name": "建設緑政費",
          "v": 497.12316,
          "prevV": 307.60049,
          "yoy": 61.6
        },
        {
          "name": "まちづくり費",
          "v": 268.09647,
          "prevV": 238.36668,
          "yoy": 12.5
        },
        {
          "name": "環境費",
          "v": 244.03643,
          "prevV": 231.51865,
          "yoy": 5.4
        },
        {
          "name": "経済労働費",
          "v": 238.30161,
          "prevV": 241.90033,
          "yoy": -1.5
        },
        {
          "name": "区役所費",
          "v": 212.7659,
          "prevV": 195.79984,
          "yoy": 8.7
        },
        {
          "name": "消防費",
          "v": 200.45838,
          "prevV": 194.00262,
          "yoy": 3.3
        },
        {
          "name": "港湾費",
          "v": 128.53026,
          "prevV": 88.47885,
          "yoy": 45.3
        },
        {
          "name": "市民文化費",
          "v": 124.74526,
          "prevV": 91.96656,
          "yoy": 35.6
        },
        {
          "name": "議会費",
          "v": 17.00801,
          "prevV": 16.77416,
          "yoy": 1.4
        },
        {
          "name": "予備費",
          "v": 7,
          "prevV": 7,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 川崎市予算について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r8/26bunkatuban6_antore.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 川崎市予算について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r8/26bunkatuban6_antore.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "26bunkatuban6_antore.pdf ・ sha256 b3d21d21dea1d487… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 8927.4988,
      "prevTotalOku": 8712.33696,
      "yoyLabel": "+2.5%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 4047.56733,
          "prevV": 3854.47057,
          "yoy": 5
        },
        {
          "name": "国庫支出金",
          "v": 1749.70585,
          "prevV": 1565.088,
          "yoy": 11.8
        },
        {
          "name": "繰入金",
          "v": 809.97425,
          "prevV": 855.95086,
          "yoy": -5.4
        },
        {
          "name": "市債",
          "v": 574.09,
          "prevV": 642.23,
          "yoy": -10.6
        },
        {
          "name": "県支出金",
          "v": 450.83905,
          "prevV": 423.22066,
          "yoy": 6.5
        },
        {
          "name": "地方消費税交付金",
          "v": 364.68834,
          "prevV": 353.11446,
          "yoy": 3.3
        },
        {
          "name": "諸収入",
          "v": 330.92503,
          "prevV": 337.48504,
          "yoy": -1.9
        },
        {
          "name": "使用料及び手数料",
          "v": 166.27363,
          "prevV": 168.07786,
          "yoy": -1.1
        },
        {
          "name": "その他",
          "v": 433.43532,
          "prevV": 512.6995099999999,
          "yoy": null,
          "children": [
            {
              "name": "財産収入",
              "v": 109.74971,
              "prevV": 101.22628,
              "yoy": 8.4
            },
            {
              "name": "分担金及び負担金",
              "v": 86.39574,
              "prevV": 85.76708,
              "yoy": 0.7
            },
            {
              "name": "寄附金",
              "v": 40.24922,
              "prevV": 20.97951,
              "yoy": 91.9
            },
            {
              "name": "軽油引取税交付金",
              "v": 38.36592,
              "prevV": 37.11305,
              "yoy": 3.4
            },
            {
              "name": "法人事業税交付金",
              "v": 38.08408,
              "prevV": 36.02721,
              "yoy": 5.7
            },
            {
              "name": "地方譲与税",
              "v": 29.27273,
              "prevV": 30.86608,
              "yoy": -5.2
            },
            {
              "name": "配当割交付金",
              "v": 27.92393,
              "prevV": 28.97162,
              "yoy": -3.6
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 21.18598,
              "prevV": 29.61658,
              "yoy": -28.5
            },
            {
              "name": "地方特例交付金",
              "v": 15.38763,
              "prevV": 117.91654,
              "yoy": -87
            },
            {
              "name": "環境性能割交付金",
              "v": 11.94556,
              "prevV": 10.65,
              "yoy": 12.2
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.2044,
              "prevV": 4.09423,
              "yoy": 2.7
            },
            {
              "name": "地方交付税",
              "v": 4.06962,
              "prevV": 4.00948,
              "yoy": 1.5
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 3.17654,
              "prevV": 3.22245,
              "yoy": -1.4
            },
            {
              "name": "利子割交付金",
              "v": 2.07761,
              "prevV": 0.90781,
              "yoy": 128.9
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.34665,
              "prevV": 0.33159,
              "yoy": 4.5
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1833.26548,
          "prevV": 1735.93481,
          "yoy": 5.6
        },
        {
          "name": "こども未来費",
          "v": 1564.96283,
          "prevV": 1424.7771,
          "yoy": 9.8
        },
        {
          "name": "教育費",
          "v": 1302.46844,
          "prevV": 1334.77611,
          "yoy": -2.4
        },
        {
          "name": "諸支出金",
          "v": 1235.73487,
          "prevV": 1211.32827,
          "yoy": 2
        },
        {
          "name": "公債費",
          "v": 748.8006,
          "prevV": 764.57546,
          "yoy": -2.1
        },
        {
          "name": "総務費",
          "v": 628.8584,
          "prevV": 577.55891,
          "yoy": 8.9
        },
        {
          "name": "建設緑政費",
          "v": 307.60049,
          "prevV": 357.11609,
          "yoy": -13.9
        },
        {
          "name": "経済労働費",
          "v": 241.90033,
          "prevV": 249.7948,
          "yoy": -3.2
        },
        {
          "name": "まちづくり費",
          "v": 238.36668,
          "prevV": 237.95329,
          "yoy": 0.2
        },
        {
          "name": "環境費",
          "v": 231.51865,
          "prevV": 232.75215,
          "yoy": -0.5
        },
        {
          "name": "区役所費",
          "v": 195.79984,
          "prevV": 193.2917,
          "yoy": 1.3
        },
        {
          "name": "消防費",
          "v": 194.00262,
          "prevV": 182.36324,
          "yoy": 6.4
        },
        {
          "name": "市民文化費",
          "v": 91.96656,
          "prevV": 84.91702,
          "yoy": 8.3
        },
        {
          "name": "港湾費",
          "v": 88.47885,
          "prevV": 100.90858,
          "yoy": -12.3
        },
        {
          "name": "議会費",
          "v": 16.77416,
          "prevV": 17.28943,
          "yoy": -3
        },
        {
          "name": "予備費",
          "v": 7,
          "prevV": 7,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和7年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://web.archive.org/web/20260514103709/https://www.city.kawasaki.jp/230/cmsfiles/contents/0000173/173806/25bunkatuban6.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000173/173806/25bunkatuban6.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r7/25bunkatuban6.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和7年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260514103709/https://www.city.kawasaki.jp/230/cmsfiles/contents/0000173/173806/25bunkatuban6.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r7/25bunkatuban6.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "25bunkatuban6.pdf ・ sha256 e6d1dce21053b47b… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R6",
      "fyLabel": "令和6年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 8712.33696,
      "prevTotalOku": 8672.6212,
      "yoyLabel": "+0.5%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3854.47057,
          "prevV": 3811.83553,
          "yoy": 1.1
        },
        {
          "name": "国庫支出金",
          "v": 1565.088,
          "prevV": 1630.26629,
          "yoy": -4
        },
        {
          "name": "繰入金",
          "v": 855.95086,
          "prevV": 892.05624,
          "yoy": -4
        },
        {
          "name": "市債",
          "v": 642.23,
          "prevV": 657.06,
          "yoy": -2.3
        },
        {
          "name": "県支出金",
          "v": 423.22066,
          "prevV": 421.00083,
          "yoy": 0.5
        },
        {
          "name": "地方消費税交付金",
          "v": 353.11446,
          "prevV": 356.33981,
          "yoy": -0.9
        },
        {
          "name": "諸収入",
          "v": 337.48504,
          "prevV": 340.84794,
          "yoy": -1
        },
        {
          "name": "使用料及び手数料",
          "v": 168.07786,
          "prevV": 169.41647,
          "yoy": -0.8
        },
        {
          "name": "その他",
          "v": 512.69951,
          "prevV": 393.7980900000001,
          "yoy": null,
          "children": [
            {
              "name": "地方特例交付金",
              "v": 117.91654,
              "prevV": 20.65941,
              "yoy": 470.8
            },
            {
              "name": "財産収入",
              "v": 101.22628,
              "prevV": 85.6359,
              "yoy": 18.2
            },
            {
              "name": "分担金及び負担金",
              "v": 85.76708,
              "prevV": 89.37204,
              "yoy": -4
            },
            {
              "name": "軽油引取税交付金",
              "v": 37.11305,
              "prevV": 37.47899,
              "yoy": -1
            },
            {
              "name": "法人事業税交付金",
              "v": 36.02721,
              "prevV": 36.79409,
              "yoy": -2.1
            },
            {
              "name": "地方譲与税",
              "v": 30.86608,
              "prevV": 30.44853,
              "yoy": 1.4
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 29.61658,
              "prevV": 28.94729,
              "yoy": 2.3
            },
            {
              "name": "配当割交付金",
              "v": 28.97162,
              "prevV": 28.83174,
              "yoy": 0.5
            },
            {
              "name": "寄附金",
              "v": 20.97951,
              "prevV": 12.7182,
              "yoy": 65
            },
            {
              "name": "環境性能割交付金",
              "v": 10.65,
              "prevV": 8.78208,
              "yoy": 21.3
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.09423,
              "prevV": 4.09114,
              "yoy": 0.1
            },
            {
              "name": "地方交付税",
              "v": 4.00948,
              "prevV": 3.94634,
              "yoy": 1.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 3.22245,
              "prevV": 3.46278,
              "yoy": -6.9
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 0.90781,
              "prevV": 1.27107,
              "yoy": -28.6
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.33159,
              "prevV": 0.35849,
              "yoy": -7.5
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1735.93481,
          "prevV": 1838.8627,
          "yoy": -5.6
        },
        {
          "name": "こども未来費",
          "v": 1424.7771,
          "prevV": 1363.31206,
          "yoy": 4.5
        },
        {
          "name": "教育費",
          "v": 1334.77611,
          "prevV": 1155.66499,
          "yoy": 15.5
        },
        {
          "name": "諸支出金",
          "v": 1211.32827,
          "prevV": 1306.51006,
          "yoy": -7.3
        },
        {
          "name": "公債費",
          "v": 764.57546,
          "prevV": 740.19775,
          "yoy": 3.3
        },
        {
          "name": "総務費",
          "v": 577.55891,
          "prevV": 567.97796,
          "yoy": 1.7
        },
        {
          "name": "建設緑政費",
          "v": 357.11609,
          "prevV": 292.5355,
          "yoy": 22.1
        },
        {
          "name": "経済労働費",
          "v": 249.7948,
          "prevV": 256.3108,
          "yoy": -2.5
        },
        {
          "name": "まちづくり費",
          "v": 237.95329,
          "prevV": 195.19618,
          "yoy": 21.9
        },
        {
          "name": "環境費",
          "v": 232.75215,
          "prevV": 389.6062,
          "yoy": -40.3
        },
        {
          "name": "区役所費",
          "v": 193.2917,
          "prevV": 184.6249,
          "yoy": 4.7
        },
        {
          "name": "消防費",
          "v": 182.36324,
          "prevV": 166.86768,
          "yoy": 9.3
        },
        {
          "name": "港湾費",
          "v": 100.90858,
          "prevV": 104.04271,
          "yoy": -3
        },
        {
          "name": "市民文化費",
          "v": 84.91702,
          "prevV": 85.39345,
          "yoy": -0.6
        },
        {
          "name": "議会費",
          "v": 17.28943,
          "prevV": 18.51826,
          "yoy": -6.6
        },
        {
          "name": "予備費",
          "v": 7,
          "prevV": 7,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和6年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://web.archive.org/web/20241119102107/https://www.city.kawasaki.jp/230/cmsfiles/contents/0000158/158395/24bunkatuban6.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000158/158395/24bunkatuban6.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r6/24bunkatuban6.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和6年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20241119102107/https://www.city.kawasaki.jp/230/cmsfiles/contents/0000158/158395/24bunkatuban6.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r6/24bunkatuban6.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "24bunkatuban6.pdf ・ sha256 f30526260b1e9f2f… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R5",
      "fyLabel": "令和5年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 8672.6212,
      "prevTotalOku": 8785.12742,
      "yoyLabel": "-1.3%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3811.83553,
          "prevV": 3670.66832,
          "yoy": 3.8
        },
        {
          "name": "国庫支出金",
          "v": 1630.26629,
          "prevV": 1620.56488,
          "yoy": 0.6
        },
        {
          "name": "繰入金",
          "v": 892.05624,
          "prevV": 944.8893,
          "yoy": -5.6
        },
        {
          "name": "市債",
          "v": 657.06,
          "prevV": 931.33,
          "yoy": -29.4
        },
        {
          "name": "県支出金",
          "v": 421.00083,
          "prevV": 401.19371,
          "yoy": 4.9
        },
        {
          "name": "地方消費税交付金",
          "v": 356.33981,
          "prevV": 324.60743,
          "yoy": 9.8
        },
        {
          "name": "諸収入",
          "v": 340.84794,
          "prevV": 358.07265,
          "yoy": -4.8
        },
        {
          "name": "使用料及び手数料",
          "v": 169.41647,
          "prevV": 170.95176,
          "yoy": -0.9
        },
        {
          "name": "その他",
          "v": 393.7980900000001,
          "prevV": 362.84937,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 89.37204,
              "prevV": 90.68975,
              "yoy": -1.5
            },
            {
              "name": "財産収入",
              "v": 85.6359,
              "prevV": 85.00691,
              "yoy": 0.7
            },
            {
              "name": "軽油引取税交付金",
              "v": 37.47899,
              "prevV": 38.69554,
              "yoy": -3.1
            },
            {
              "name": "法人事業税交付金",
              "v": 36.79409,
              "prevV": 30.60325,
              "yoy": 20.2
            },
            {
              "name": "地方譲与税",
              "v": 30.44853,
              "prevV": 34.90346,
              "yoy": -12.8
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 28.94729,
              "prevV": 12.21842,
              "yoy": 136.9
            },
            {
              "name": "配当割交付金",
              "v": 28.83174,
              "prevV": 17.3916,
              "yoy": 65.8
            },
            {
              "name": "地方特例交付金",
              "v": 20.65941,
              "prevV": 21.86975,
              "yoy": -5.5
            },
            {
              "name": "寄附金",
              "v": 12.7182,
              "prevV": 7.76485,
              "yoy": 63.8
            },
            {
              "name": "環境性能割交付金",
              "v": 8.78208,
              "prevV": 10.15498,
              "yoy": -13.5
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.09114,
              "prevV": 3.68318,
              "yoy": 11.1
            },
            {
              "name": "地方交付税",
              "v": 3.94634,
              "prevV": 3.88252,
              "yoy": 1.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 3.46278,
              "prevV": 3.18633,
              "yoy": 8.7
            },
            {
              "name": "利子割交付金",
              "v": 1.27107,
              "prevV": 1.45092,
              "yoy": -12.4
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.35849,
              "prevV": 0.34791,
              "yoy": 3
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1838.8627,
          "prevV": 1794.81535,
          "yoy": 2.5
        },
        {
          "name": "こども未来費",
          "v": 1363.31206,
          "prevV": 1346.53114,
          "yoy": 1.2
        },
        {
          "name": "諸支出金",
          "v": 1306.51006,
          "prevV": 1205.91153,
          "yoy": 8.3
        },
        {
          "name": "教育費",
          "v": 1155.66499,
          "prevV": 1117.1544,
          "yoy": 3.4
        },
        {
          "name": "公債費",
          "v": 740.19775,
          "prevV": 729.60596,
          "yoy": 1.5
        },
        {
          "name": "総務費",
          "v": 567.97796,
          "prevV": 893.50595,
          "yoy": -36.4
        },
        {
          "name": "環境費",
          "v": 389.6062,
          "prevV": 387.48892,
          "yoy": 0.5
        },
        {
          "name": "建設緑政費",
          "v": 292.5355,
          "prevV": 270.7715,
          "yoy": 8
        },
        {
          "name": "経済労働費",
          "v": 256.3108,
          "prevV": 246.89203,
          "yoy": 3.8
        },
        {
          "name": "まちづくり費",
          "v": 195.19618,
          "prevV": 211.24972,
          "yoy": -7.6
        },
        {
          "name": "区役所費",
          "v": 184.6249,
          "prevV": 181.68943,
          "yoy": 1.6
        },
        {
          "name": "消防費",
          "v": 166.86768,
          "prevV": 171.41035,
          "yoy": -2.7
        },
        {
          "name": "港湾費",
          "v": 104.04271,
          "prevV": 114.3105,
          "yoy": -9
        },
        {
          "name": "市民文化費",
          "v": 85.39345,
          "prevV": 89.82548,
          "yoy": -4.9
        },
        {
          "name": "議会費",
          "v": 18.51826,
          "prevV": 16.96516,
          "yoy": 9.2
        },
        {
          "name": "予備費",
          "v": 7,
          "prevV": 7,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和5年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://web.archive.org/web/20250711080725/https://www.city.kawasaki.jp/230/cmsfiles/contents/0000147/147869/23bunkatuban7.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000147/147869/23bunkatuban7.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r5/23bunkatuban7.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和5年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20250711080725/https://www.city.kawasaki.jp/230/cmsfiles/contents/0000147/147869/23bunkatuban7.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r5/23bunkatuban7.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "23bunkatuban7.pdf ・ sha256 66450e429cb96596… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R4",
      "fyLabel": "令和4年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 8785.12742,
      "prevTotalOku": 8208.41311,
      "yoyLabel": "+7.0%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3670.66832,
          "prevV": 3453.90359,
          "yoy": 6.3
        },
        {
          "name": "国庫支出金",
          "v": 1620.56488,
          "prevV": 1466.74843,
          "yoy": 10.5
        },
        {
          "name": "繰入金",
          "v": 944.8893,
          "prevV": 984.07104,
          "yoy": -4
        },
        {
          "name": "市債",
          "v": 931.33,
          "prevV": 733.26,
          "yoy": 27
        },
        {
          "name": "県支出金",
          "v": 401.19371,
          "prevV": 361.37837,
          "yoy": 11
        },
        {
          "name": "諸収入",
          "v": 358.07265,
          "prevV": 338.05977,
          "yoy": 5.9
        },
        {
          "name": "地方消費税交付金",
          "v": 324.60743,
          "prevV": 329.27238,
          "yoy": -1.4
        },
        {
          "name": "使用料及び手数料",
          "v": 170.95176,
          "prevV": 168.04731,
          "yoy": 1.7
        },
        {
          "name": "その他",
          "v": 362.84937,
          "prevV": 373.67222000000004,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 90.68975,
              "prevV": 90.6968,
              "yoy": 0
            },
            {
              "name": "財産収入",
              "v": 85.00691,
              "prevV": 83.8509,
              "yoy": 1.4
            },
            {
              "name": "軽油引取税交付金",
              "v": 38.69554,
              "prevV": 39.79684,
              "yoy": -2.8
            },
            {
              "name": "地方譲与税",
              "v": 34.90346,
              "prevV": 29.5488,
              "yoy": 18.1
            },
            {
              "name": "法人事業税交付金",
              "v": 30.60325,
              "prevV": 22.72085,
              "yoy": 34.7
            },
            {
              "name": "地方特例交付金",
              "v": 21.86975,
              "prevV": 49.73414,
              "yoy": -56
            },
            {
              "name": "配当割交付金",
              "v": 17.3916,
              "prevV": 12.67422,
              "yoy": 37.2
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 12.21842,
              "prevV": 10.40089,
              "yoy": 17.5
            },
            {
              "name": "環境性能割交付金",
              "v": 10.15498,
              "prevV": 7.62713,
              "yoy": 33.1
            },
            {
              "name": "寄附金",
              "v": 7.76485,
              "prevV": 6.32719,
              "yoy": 22.7
            },
            {
              "name": "地方交付税",
              "v": 3.88252,
              "prevV": 11.05444,
              "yoy": -64.9
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.68318,
              "prevV": 3.4296,
              "yoy": 7.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 3.18633,
              "prevV": 2.94376,
              "yoy": 8.2
            },
            {
              "name": "利子割交付金",
              "v": 1.45092,
              "prevV": 1.52798,
              "yoy": -5
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.34791,
              "prevV": 0.33868,
              "yoy": 2.7
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1794.81535,
          "prevV": 1608.05819,
          "yoy": 11.6
        },
        {
          "name": "こども未来費",
          "v": 1346.53114,
          "prevV": 1277.39277,
          "yoy": 5.4
        },
        {
          "name": "諸支出金",
          "v": 1205.91153,
          "prevV": 1180.48694,
          "yoy": 2.2
        },
        {
          "name": "教育費",
          "v": 1117.1544,
          "prevV": 1141.31374,
          "yoy": -2.1
        },
        {
          "name": "総務費",
          "v": 893.50595,
          "prevV": 613.45539,
          "yoy": 45.7
        },
        {
          "name": "公債費",
          "v": 729.60596,
          "prevV": 711.86572,
          "yoy": 2.5
        },
        {
          "name": "環境費",
          "v": 387.48892,
          "prevV": 297.72058,
          "yoy": 30.2
        },
        {
          "name": "建設緑政費",
          "v": 270.7715,
          "prevV": 253.74555,
          "yoy": 6.7
        },
        {
          "name": "経済労働費",
          "v": 246.89203,
          "prevV": 330.7882,
          "yoy": -25.4
        },
        {
          "name": "まちづくり費",
          "v": 211.24972,
          "prevV": 204.73924,
          "yoy": 3.2
        },
        {
          "name": "区役所費",
          "v": 181.68943,
          "prevV": 184.42166,
          "yoy": -1.5
        },
        {
          "name": "消防費",
          "v": 171.41035,
          "prevV": 173.25234,
          "yoy": -1.1
        },
        {
          "name": "港湾費",
          "v": 114.3105,
          "prevV": 123.44261,
          "yoy": -7.4
        },
        {
          "name": "市民文化費",
          "v": 89.82548,
          "prevV": 83.72849,
          "yoy": 7.3
        },
        {
          "name": "議会費",
          "v": 16.96516,
          "prevV": 17.00169,
          "yoy": -0.2
        },
        {
          "name": "予備費",
          "v": 7,
          "prevV": 7,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和4年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000136/136966/22bunkatuban7.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000136/136966/22bunkatuban7.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r4/22bunkatuban7.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和4年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000136/136966/22bunkatuban7.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r4/22bunkatuban7.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "22bunkatuban7.pdf ・ sha256 ef677d1d227b4a2a… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R3",
      "fyLabel": "令和3年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 8208.41311,
      "prevTotalOku": 7924.63317,
      "yoyLabel": "+3.6%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3453.90359,
          "prevV": 3634.07622,
          "yoy": -5
        },
        {
          "name": "国庫支出金",
          "v": 1466.74843,
          "prevV": 1417.60592,
          "yoy": 3.5
        },
        {
          "name": "繰入金",
          "v": 984.07104,
          "prevV": 712.45748,
          "yoy": 38.1
        },
        {
          "name": "市債",
          "v": 733.26,
          "prevV": 654.19,
          "yoy": 12.1
        },
        {
          "name": "県支出金",
          "v": 361.37837,
          "prevV": 352.43431,
          "yoy": 2.5
        },
        {
          "name": "諸収入",
          "v": 338.05977,
          "prevV": 341.79721,
          "yoy": -1.1
        },
        {
          "name": "地方消費税交付金",
          "v": 329.27238,
          "prevV": 328.88387,
          "yoy": 0.1
        },
        {
          "name": "使用料及び手数料",
          "v": 168.04731,
          "prevV": 161.48304,
          "yoy": 4.1
        },
        {
          "name": "その他",
          "v": 373.67222,
          "prevV": 321.7051199999999,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 90.6968,
              "prevV": 122.59989,
              "yoy": -26
            },
            {
              "name": "財産収入",
              "v": 83.8509,
              "prevV": 25.79922,
              "yoy": 225
            },
            {
              "name": "地方特例交付金",
              "v": 49.73414,
              "prevV": 21.40569,
              "yoy": 132.3
            },
            {
              "name": "軽油引取税交付金",
              "v": 39.79684,
              "prevV": 40.26269,
              "yoy": -1.2
            },
            {
              "name": "地方譲与税",
              "v": 29.5488,
              "prevV": 31.06755,
              "yoy": -4.9
            },
            {
              "name": "法人事業税交付金",
              "v": 22.72085,
              "prevV": 19.89619,
              "yoy": 14.2
            },
            {
              "name": "配当割交付金",
              "v": 12.67422,
              "prevV": 15.86121,
              "yoy": -20.1
            },
            {
              "name": "地方交付税",
              "v": 11.05444,
              "prevV": 11.788,
              "yoy": -6.2
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 10.40089,
              "prevV": 10.22529,
              "yoy": 1.7
            },
            {
              "name": "環境性能割交付金",
              "v": 7.62713,
              "prevV": 8.3529,
              "yoy": -8.7
            },
            {
              "name": "寄附金",
              "v": 6.32719,
              "prevV": 4.90211,
              "yoy": 29.1
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.4296,
              "prevV": 3.24183,
              "yoy": 5.8
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 2.94376,
              "prevV": 3.03182,
              "yoy": -2.9
            },
            {
              "name": "利子割交付金",
              "v": 1.52798,
              "prevV": 1.92648,
              "yoy": -20.7
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.33868,
              "prevV": 0.34425,
              "yoy": -1.6
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1608.05819,
          "prevV": 1541.30048,
          "yoy": 4.3
        },
        {
          "name": "こども未来費",
          "v": 1277.39277,
          "prevV": 1267.82499,
          "yoy": 0.8
        },
        {
          "name": "諸支出金",
          "v": 1180.48694,
          "prevV": 1115.58199,
          "yoy": 5.8
        },
        {
          "name": "教育費",
          "v": 1141.31374,
          "prevV": 1011.94431,
          "yoy": 12.8
        },
        {
          "name": "公債費",
          "v": 711.86572,
          "prevV": 714.70254,
          "yoy": -0.4
        },
        {
          "name": "総務費",
          "v": 613.45539,
          "prevV": 534.61824,
          "yoy": 14.7
        },
        {
          "name": "経済労働費",
          "v": 330.7882,
          "prevV": 229.07573,
          "yoy": 44.4
        },
        {
          "name": "環境費",
          "v": 297.72058,
          "prevV": 250.50583,
          "yoy": 18.8
        },
        {
          "name": "建設緑政費",
          "v": 253.74555,
          "prevV": 444.38502,
          "yoy": -42.9
        },
        {
          "name": "まちづくり費",
          "v": 204.73924,
          "prevV": 245.14973,
          "yoy": -16.5
        },
        {
          "name": "区役所費",
          "v": 184.42166,
          "prevV": 175.24926,
          "yoy": 5.2
        },
        {
          "name": "消防費",
          "v": 173.25234,
          "prevV": 171.47744,
          "yoy": 1
        },
        {
          "name": "港湾費",
          "v": 123.44261,
          "prevV": 103.64782,
          "yoy": 19.1
        },
        {
          "name": "市民文化費",
          "v": 83.72849,
          "prevV": 97.29094,
          "yoy": -13.9
        },
        {
          "name": "議会費",
          "v": 17.00169,
          "prevV": 16.87885,
          "yoy": 0.7
        },
        {
          "name": "予備費",
          "v": 7,
          "prevV": 5,
          "yoy": 40
        }
      ],
      "sourceTitle": "令和3年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000125/125926/21bunkatuban7.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000125/125926/21bunkatuban7.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r3/21bunkatuban7.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和3年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000125/125926/21bunkatuban7.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r3/21bunkatuban7.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "21bunkatuban7.pdf ・ sha256 48d0e26b78589b57… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "141305",
      "muniName": "川崎市",
      "prefName": "神奈川県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R2",
      "fyLabel": "令和2年度 当初予算",
      "population": 1535141,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 7924.63317,
      "prevTotalOku": 7590.66283,
      "yoyLabel": "+4.4%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3634.07622,
          "prevV": 3637.27801,
          "yoy": -0.1
        },
        {
          "name": "国庫支出金",
          "v": 1417.60592,
          "prevV": 1332.51965,
          "yoy": 6.4
        },
        {
          "name": "繰入金",
          "v": 712.45748,
          "prevV": 673.51861,
          "yoy": 5.8
        },
        {
          "name": "市債",
          "v": 654.19,
          "prevV": 546.84,
          "yoy": 19.6
        },
        {
          "name": "県支出金",
          "v": 352.43431,
          "prevV": 301.83884,
          "yoy": 16.8
        },
        {
          "name": "諸収入",
          "v": 341.79721,
          "prevV": 350.20458,
          "yoy": -2.4
        },
        {
          "name": "地方消費税交付金",
          "v": 328.88387,
          "prevV": 248.69855,
          "yoy": 32.2
        },
        {
          "name": "使用料及び手数料",
          "v": 161.48304,
          "prevV": 163.87681,
          "yoy": -1.5
        },
        {
          "name": "その他",
          "v": 321.7051199999999,
          "prevV": 327.27459999999996,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 122.59989,
              "prevV": 134.32871,
              "yoy": -8.7
            },
            {
              "name": "軽油引取税交付金",
              "v": 40.26269,
              "prevV": 39.96104,
              "yoy": 0.8
            },
            {
              "name": "地方譲与税",
              "v": 31.06755,
              "prevV": 29.39575,
              "yoy": 5.7
            },
            {
              "name": "財産収入",
              "v": 25.79922,
              "prevV": 24.8171,
              "yoy": 4
            },
            {
              "name": "地方特例交付金",
              "v": 21.40569,
              "prevV": 45.94159,
              "yoy": -53.4
            },
            {
              "name": "法人事業税交付金",
              "v": 19.89619,
              "prevV": 0,
              "yoy": null
            },
            {
              "name": "配当割交付金",
              "v": 15.86121,
              "prevV": 17.73496,
              "yoy": -10.6
            },
            {
              "name": "地方交付税",
              "v": 11.788,
              "prevV": 4.27987,
              "yoy": 175.4
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 10.22529,
              "prevV": 12.69737,
              "yoy": -19.5
            },
            {
              "name": "環境性能割交付金",
              "v": 8.3529,
              "prevV": 3.65304,
              "yoy": 128.7
            },
            {
              "name": "寄附金",
              "v": 4.90211,
              "prevV": 3.99892,
              "yoy": 22.6
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.24183,
              "prevV": 3.14199,
              "yoy": 3.2
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 3.03182,
              "prevV": 3.16835,
              "yoy": -4.3
            },
            {
              "name": "利子割交付金",
              "v": 1.92648,
              "prevV": 2.8124,
              "yoy": -31.5
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.34425,
              "prevV": 0.34351,
              "yoy": 0.2
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "健康福祉費",
          "v": 1541.30048,
          "prevV": 1470.26832,
          "yoy": 4.8
        },
        {
          "name": "こども未来費",
          "v": 1267.82499,
          "prevV": 1212.11544,
          "yoy": 4.6
        },
        {
          "name": "諸支出金",
          "v": 1115.58199,
          "prevV": 1045.32862,
          "yoy": 6.7
        },
        {
          "name": "教育費",
          "v": 1011.94431,
          "prevV": 1101.17933,
          "yoy": -8.1
        },
        {
          "name": "公債費",
          "v": 714.70254,
          "prevV": 730.98565,
          "yoy": -2.2
        },
        {
          "name": "総務費",
          "v": 534.61824,
          "prevV": 496.40256,
          "yoy": 7.7
        },
        {
          "name": "建設緑政費",
          "v": 444.38502,
          "prevV": 329.64313,
          "yoy": 34.8
        },
        {
          "name": "環境費",
          "v": 250.50583,
          "prevV": 193.16533,
          "yoy": 29.7
        },
        {
          "name": "まちづくり費",
          "v": 245.14973,
          "prevV": 254.38066,
          "yoy": -3.6
        },
        {
          "name": "経済労働費",
          "v": 229.07573,
          "prevV": 263.46573,
          "yoy": -13.1
        },
        {
          "name": "区役所費",
          "v": 175.24926,
          "prevV": 144.91081,
          "yoy": 20.9
        },
        {
          "name": "消防費",
          "v": 171.47744,
          "prevV": 173.94868,
          "yoy": -1.4
        },
        {
          "name": "港湾費",
          "v": 103.64782,
          "prevV": 76.93503,
          "yoy": 34.7
        },
        {
          "name": "市民文化費",
          "v": 97.29094,
          "prevV": 76.18967,
          "yoy": 27.7
        },
        {
          "name": "議会費",
          "v": 16.87885,
          "prevV": 16.74387,
          "yoy": 0.8
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和2年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
      "sourceUrl": "https://web.archive.org/web/20200527013400/http://www.city.kawasaki.jp/230/cmsfiles/contents/0000114/114574/20bunkatuban7.pdf",
      "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000114/114574/20bunkatuban7.pdf",
      "sourceLocalUrl": "/sources/kawasaki-yosansho-r2/20bunkatuban7.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和2年度 川崎市予算案について 計数資料編（一般会計歳入歳出予算 款別）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20200527013400/http://www.city.kawasaki.jp/230/cmsfiles/contents/0000114/114574/20bunkatuban7.pdf",
          "localUrl": "/sources/kawasaki-yosansho-r2/20bunkatuban7.pdf",
          "source": "www.city.kawasaki.jp",
          "thumb": "20bunkatuban7.pdf ・ sha256 5decb1f8e48c573f… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "190004": [
    {
      "muniCode": "190004",
      "muniName": "山梨県",
      "prefName": "山梨県",
      "isPref": true,
      "projects": [
        {
          "name": "商工業振興資金貸付金",
          "amountOku": 451.62207,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": null,
          "prevAmountOku": null,
          "description": "中小企業の金融の円滑化を促進し、経営の安定化を図るため、金融機関の協調を得て",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
        },
        {
          "name": "高等学校等就学支援金交付事業費",
          "amountOku": 69.6403,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "全ての意志ある生徒が安心して勉学に打ち込めるよう、高校生等に対し、所得の状況",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "小学校給食費負担軽減事業費補助金",
          "amountOku": 20.3053,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "公立小学校に通う児童が安心して学校給食の提供を受けられるよう、給食費の負担を",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
        },
        {
          "name": "少人数教育推進事業費",
          "amountOku": 19.56395,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "児童一人ひとりに向き合ったきめ細かな質の高い教育を実現するため、公立小学校に",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "消防防災ヘリコプター整備事業費",
          "amountOku": 14.73844,
          "kan": null,
          "shisaku": "防災・減災、県土の強靱化",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "山岳遭難救助や林野火災消火などの活動時における安定的な運航体制を確保するため、",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.1",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=1"
        },
        {
          "name": "スタートアップ支援センター事業費",
          "amountOku": 1.4187,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "県内企業との共創による新たなビジネス創出や雇用の促進を図るため、スタートアッ",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
        },
        {
          "name": "部活動地域展開推進事業費",
          "amountOku": 1.20753,
          "kan": null,
          "shisaku": "スポーツの振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "将来にわたり子どもたちがスポーツ・文化芸術活動に親しむことができる機会を確保",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
        },
        {
          "name": "ツキノワグマ被害防止対策強化事業費",
          "amountOku": 0.95149,
          "kan": null,
          "shisaku": "「上質な空間」づくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "県民の安全・安心を確保するため、クマによる被害を防止する取り組みを強化する。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.14",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=14"
        },
        {
          "name": "成長産業総合支援センター設置事業費補助金",
          "amountOku": 0.77952,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "県内企業の成長分野(医療機器、水素・燃料電池、航空宇宙防衛)進出を一体的に促進",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
        },
        {
          "name": "キャリアアップ・ユニバーシティ運営事業費補助金",
          "amountOku": 0.7723,
          "kan": null,
          "shisaku": "地域を担う人財づくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "働き手のスキルアップを図るため、教育機関や研修企業等と連携してリスキリングを",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
        },
        {
          "name": "空き家活用住宅整備モデル事業費補助金",
          "amountOku": 0.7665,
          "kan": null,
          "shisaku": "「自然首都圏」創出のための基盤整備",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "空き家の活用を促進するとともに、移住者の受け入れに向けた良好な住環境の形成を",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
        },
        {
          "name": "富士トラム推進事業費",
          "amountOku": 0.75868,
          "kan": null,
          "shisaku": "「自然首都圏」創出のための基盤整備",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "富士山における諸課題の解決による高付加価値化を図るため、富士トラムの導入を通",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
        },
        {
          "name": "二次交通高度化推進事業費",
          "amountOku": 0.74071,
          "kan": null,
          "shisaku": "海と空に開かれた「開の国」交通ネットワークの充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "観光地や地域の移動手段の確保に向け、既存の交通資源を有効活用し、利便性向上を",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
        },
        {
          "name": "木造住宅居住安心支援事業費",
          "amountOku": 0.70959,
          "kan": null,
          "shisaku": "防災・減災、県土の強靱化",
          "kubun": null,
          "prevAmountOku": null,
          "description": "地震に強い安全で安心なまちづくりを目指し、木造住宅の耐震診断・改修事業への助",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
        },
        {
          "name": "高校入試システム構築事業費",
          "amountOku": 0.66541,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "高校入試におけるＷｅｂ出願を実施するため、入試システムを再構築する。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "メディカル・デバイス・コリドー創生事業費",
          "amountOku": 0.62049,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": null,
          "prevAmountOku": null,
          "description": "医療機器関連産業の集積を加速化させるため、県内企業が行う機器開発や部材供給に",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.3",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=3"
        },
        {
          "name": "コーポレートブランド「やまなし」推進事業費",
          "amountOku": 0.60848,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "地域経済の活性化を図るため、本県のブランド価値向上に向けた取り組みを行う。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
        },
        {
          "name": "校内教育支援センター支援員配置事業費補助金",
          "amountOku": 0.58112,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "不登校児童生徒の登校復帰の支援等を行う者を配置する市町村等に対し助成する。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "やまふくプラス推進事業費",
          "amountOku": 0.51184,
          "kan": null,
          "shisaku": "共生社会化の推進",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "障害者の社会参加の促進と工賃向上を図るための取り組みを行う。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
        },
        {
          "name": "縁結び支援事業費",
          "amountOku": 0.50806,
          "kan": null,
          "shisaku": "子育て支援の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "若者が抱く結婚へのネガティブなイメージや不安を払拭し、前向きな価値観を醸成す",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
        },
        {
          "name": "水素・燃料電池分野基幹産業化推進事業費",
          "amountOku": 0.49491,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": null,
          "prevAmountOku": null,
          "description": "水素・燃料電池関連産業の基幹産業化を図るため、県内企業が行う機器開発や部材供",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.3",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=3"
        },
        {
          "name": "富士五湖自然首都圏フォーラム運営事業費",
          "amountOku": 0.47235,
          "kan": null,
          "shisaku": "「自然首都圏」創出のための基盤整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "域内外の民間との連携により地域の高付加価値化を図るため、観光リゾート地と首都",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
        },
        {
          "name": "プレコンセプションケア推進事業費",
          "amountOku": 0.46149,
          "kan": null,
          "shisaku": "子育て支援の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "子どもを望む誰もが安心して妊娠・出産できるよう、将来の妊娠・出産に備えた健康",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
        },
        {
          "name": "富士山世界遺産センター機能強化事業費",
          "amountOku": 0.44825,
          "kan": null,
          "shisaku": "「上質な空間」づくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "開館10周年を契機に、富士山世界遺産センターの機能強化に向けた取り組みを行う。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.15",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=15"
        },
        {
          "name": "第81回国民スポーツ大会冬季大会開催費",
          "amountOku": 0.43043,
          "kan": null,
          "shisaku": "スポーツの振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
        },
        {
          "name": "妊産婦等生活援助事業費",
          "amountOku": 0.41135,
          "kan": null,
          "shisaku": "子育て支援の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "家庭生活に困難な問題を抱える妊産婦等の生活の安定と自立の促進を図るため、就労",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
        },
        {
          "name": "地域医療構想推進事業費",
          "amountOku": 0.39286,
          "kan": null,
          "shisaku": "生活基盤の保障",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "峡南南部地域の医療提供体制を確保するため、病院等の再編に向けた取り組みに対し",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
        },
        {
          "name": "富士北麓県有地高度活用事業費",
          "amountOku": 0.38346,
          "kan": null,
          "shisaku": "県有資産や地域資源の可能性の発揮",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "地域のブランド力向上と自主財源の確保を図るため、県有地の活用により生み出され",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
        },
        {
          "name": "空飛ぶクルマ社会実装加速化事業費",
          "amountOku": 0.29986,
          "kan": null,
          "shisaku": "海と空に開かれた「開の国」交通ネットワークの充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "利便性の高い新たな交通ネットワークを構築するため、本県における次世代空モビリ",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
        },
        {
          "name": "国際保育推進事業費",
          "amountOku": 0.26135,
          "kan": null,
          "shisaku": "子育て支援の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "外国人が地域社会で安心して子育てを行い、子どもが言語や文化の違いにかかわらず",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
        },
        {
          "name": "私立高等学校等入学金サポート事業費",
          "amountOku": 0.2605,
          "kan": null,
          "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "経済的に余裕のない世帯の私立高等学校等入学に要する費用負担の軽減を図るため、",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
        },
        {
          "name": "郡内織物国際価値創出推進事業費",
          "amountOku": 0.25771,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "郡内織物の新たな価値創出に向け、先進的な感性を持つ若手デザイナーの理解促進を",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "外国人材確保・定着支援事業費",
          "amountOku": 0.25733,
          "kan": null,
          "shisaku": "共生社会化の推進",
          "kubun": null,
          "prevAmountOku": null,
          "description": "県内企業等において深刻化する人手不足に対応するため、外国人材の確保や定着に向",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
        },
        {
          "name": "水素コンソーシアム情報発信事業費",
          "amountOku": 0.25182,
          "kan": null,
          "shisaku": "「自然首都圏」創出のための基盤整備",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "グリーン水素技術の社会実装を推進するため、本県の知見・データの集積、議論を行",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
        },
        {
          "name": "人口減少危機対策支援事業費",
          "amountOku": 0.22702,
          "kan": null,
          "shisaku": "全ての県民・あらゆる主体との連帯に基づく県政の推進",
          "kubun": null,
          "prevAmountOku": null,
          "description": "県と市町村が連携して人口減少危機に対応するため、地域の実情に応じた市町村の取",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
        },
        {
          "name": "特別支援学校冷房設備設置費",
          "amountOku": 0.19651,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "児童生徒に快適な学習環境を提供するため、特別支援学校の屋内運動場へ冷房設備を",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "介護福祉士修学資金等貸付事業費",
          "amountOku": 0.18842,
          "kan": null,
          "shisaku": "生活基盤の保障",
          "kubun": null,
          "prevAmountOku": null,
          "description": "介護福祉士及び社会福祉士の資格取得や潜在介護職員の復職を推進するため、修学資",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
        },
        {
          "name": "富士山いにしえの登山道再興事業費",
          "amountOku": 0.16894,
          "kan": null,
          "shisaku": "「上質な空間」づくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "富士山の文化的価値への理解を深めるとともに、登山者の分散化を図るため、麓から",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.14",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=14"
        },
        {
          "name": "子ども未来進学支援事業費",
          "amountOku": 0.14832,
          "kan": null,
          "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "大学等への進学を希望する生活保護世帯の子どもを支援するため、学習塾等において",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
        },
        {
          "name": "図書館を活用した探究活動等支援事業費",
          "amountOku": 0.14126,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "若者の探究活動や誰もが利用しやすい読書環境の充実を図るため、知の拠点である図",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
        },
        {
          "name": "ワーク・ライフ・ケアバランス推進事業費",
          "amountOku": 0.12232,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "就業者の仕事、生活、育児・介護の調和を図るため、県内企業が行う業務改善や柔軟",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
        },
        {
          "name": "富士山降灰対策ガイドライン策定事業費",
          "amountOku": 0.12078,
          "kan": null,
          "shisaku": "防災・減災、県土の強靱化",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "富士山周辺の住民等が適切な避難行動を取れるよう、噴火による降灰の建物への影響",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.1",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=1"
        },
        {
          "name": "介護職員宿舎施設整備事業費補助金",
          "amountOku": 0.118,
          "kan": null,
          "shisaku": "生活基盤の保障",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "介護人材の確保・定着を促進するため、介護事業者等が行う良好な住環境を備えた職",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
        },
        {
          "name": "フィールドシアター推進モデル事業費補助金",
          "amountOku": 0.1,
          "kan": null,
          "shisaku": "文化芸術の振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "本県の魅力的な自然景観や文化財等と調和した文化芸術イベントを創出するため、自",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "熱中症予防対策事業費",
          "amountOku": 0.09936,
          "kan": null,
          "shisaku": "生活基盤の保障",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "熱中症による健康被害を防止するため、公民館や集会所を開放する市町村の取り組み",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
        },
        {
          "name": "山梨魅力再発見事業費",
          "amountOku": 0.09837,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "地域への愛着の醸成と地域ブランド価値の向上を図るための取り組みを行う。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
        },
        {
          "name": "もも未来担い手育成プロジェクト事業費",
          "amountOku": 0.0823,
          "kan": null,
          "shisaku": "地域を担う人財づくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "本県の主要農産物であるももの生産量維持を図るため、新規就農者を確保・育成する",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
        },
        {
          "name": "夜間中学・学びの多様化学校設置事業費",
          "amountOku": 0.07309,
          "kan": null,
          "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "義務教育未修了者や不登校児童生徒等の教育機会を確保するため、夜間中学・学びの",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
        },
        {
          "name": "航空宇宙防衛関連産業参入支援事業費",
          "amountOku": 0.0723,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": null,
          "prevAmountOku": null,
          "description": "県内企業の収益拡大を図るため、市場の拡大が見込まれる航空・宇宙・防衛関連産業",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
        },
        {
          "name": "県産農畜水産物等小ロット流通体制調査研究事業費",
          "amountOku": 0.0682,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "特色はあるが生産量の少ない県産農畜水産物等の県内での消費拡大を図るため、効率",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "やまなし「にじきら」アンバサダー情報発信事業費",
          "amountOku": 0.06487,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "県内米農家の所得向上を図るため、高温耐性に優れた高品質米である「にじのきらめ",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "保育士養成施設就職等促進支援事業費補助金",
          "amountOku": 0.056,
          "kan": null,
          "shisaku": "子育て支援の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "保育人材の確保を図るため、保育士養成施設が実施する保育所等への就職促進や保育",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
        },
        {
          "name": "外国人介護人材資格取得等支援事業費",
          "amountOku": 0.05424,
          "kan": null,
          "shisaku": "生活基盤の保障",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "技能実習生等に対し、日常生活や介護福祉士国家資格の取得を支援する取り組みを行",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
        },
        {
          "name": "高校生世代学習支援事業費",
          "amountOku": 0.05081,
          "kan": null,
          "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "大学等への進学を希望する経済的に余裕のない世帯の高校生を支援するため、安心し",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
        },
        {
          "name": "外国人介護人材獲得強化事業費補助金",
          "amountOku": 0.05,
          "kan": null,
          "shisaku": "生活基盤の保障",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "介護分野において深刻化する人手不足に対応するため、介護事業者や介護福祉士養成",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
        },
        {
          "name": "南山梨エリア周遊観光推進事業費",
          "amountOku": 0.048,
          "kan": null,
          "shisaku": "地域経済基盤の強靱化",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "南山梨エリアの地域資源の高付加価値化を図るため、地元自治体と連携した取り組み",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
        },
        {
          "name": "孤独・孤立対策推進事業費",
          "amountOku": 0.04737,
          "kan": null,
          "shisaku": "安全・安心、快適なまちづくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "孤独・孤立がもたらす健康問題等のリスクを低減するため、ひきこもり状態にある者",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.5",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=5"
        },
        {
          "name": "ふるさと山梨甲州財閥学習推進事業費",
          "amountOku": 0.04552,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "児童生徒の郷土への関心を深め、自主性や公益的な視点を育むため、本県発展の礎を",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "フィッシングツーリズム推進事業費",
          "amountOku": 0.04499,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "県内漁業の活性化と水産資源を活用した観光振興を図るため、漁協や市町村等と連携",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "パラスポーツ教育活動支援事業費",
          "amountOku": 0.04341,
          "kan": null,
          "shisaku": "スポーツの振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "障害のある子どもたちがスポーツに親しむことができる機会を確保するため、パラス",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
        },
        {
          "name": "やまなし探究シンポジウム開催費",
          "amountOku": 0.04324,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "県立高校における探究的な学びの質の向上を支援するとともに、中学生に対して県立",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
        },
        {
          "name": "日本創生のための将来世代応援知事同盟サミット開催費",
          "amountOku": 0.04295,
          "kan": null,
          "shisaku": "全ての県民・あらゆる主体との連帯に基づく県政の推進",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "将来を担う世代を社会全体で応援する気運を高めるため、子育て支援をはじめとした",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
        },
        {
          "name": "料理人技術力向上支援事業費補助金",
          "amountOku": 0.0375,
          "kan": null,
          "shisaku": "文化芸術の振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "技術研鑽に励む料理人の活躍を支援する。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "帰国・外国人児童生徒等教育推進支援事業費",
          "amountOku": 0.02485,
          "kan": null,
          "shisaku": "共生社会化の推進",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "日本語指導の充実を図るため、日本語指導教員の資質向上研修会等を開催する。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
        },
        {
          "name": "やまなし地域おこし協力隊サポート事業費",
          "amountOku": 0.02453,
          "kan": null,
          "shisaku": "地域を担う人財づくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "地域おこし協力隊員が活動しやすい環境整備を促進し、安定的な隊員の確保につなげ",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
        },
        {
          "name": "少人数教育の質の向上プラン推進事業費",
          "amountOku": 0.02292,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "教育の質の更なる向上を図るため、少人数教育の環境を生かした探究的な学びを推進",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
        },
        {
          "name": "市町村職員人材確保支援事業費",
          "amountOku": 0.02119,
          "kan": null,
          "shisaku": "地域を担う人財づくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "市町村の行政サービスを安定的に提供できる体制を維持するため、広域連携による採",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
        },
        {
          "name": "ひとり親家庭養育費確保支援事業費補助金",
          "amountOku": 0.0173,
          "kan": null,
          "shisaku": "共生社会化の推進",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "ひとり親家庭の生活の安定と子どもの健やかな育成を図るため、養育費確保の手続き",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
        },
        {
          "name": "ジュエリー産地やまなし技能五輪プロモーション等事業費補助金",
          "amountOku": 0.015,
          "kan": null,
          "shisaku": "地域経済の収益力向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "技能五輪全国大会貴金属装身具部門の開催を好機に、協同組合県ジュエリー協会が行",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
        },
        {
          "name": "ワークサポートケアマネジャー養成事業費補助金",
          "amountOku": 0.0108,
          "kan": null,
          "shisaku": "安全・安心、快適なまちづくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "介護離職を防ぐため、仕事と介護の両立に関する専門人材の養成に向けた取り組みに",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.5",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=5"
        },
        {
          "name": "山梨緑化100年構想検討事業費",
          "amountOku": 0.00884,
          "kan": null,
          "shisaku": "安全・安心、快適なまちづくり",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "自然と共生する持続可能なまちづくりの実現に向け、100年先を見据えた都市環境の",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
        },
        {
          "name": "少人数教育効果検証事業費",
          "amountOku": 0.00754,
          "kan": null,
          "shisaku": "教育の充実",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "児童生徒一人ひとりに向き合ったきめ細かな質の高い教育を実現するため、25人学級",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
        },
        {
          "name": "情報発信拠点設置検討事業費",
          "amountOku": 0.00424,
          "kan": null,
          "shisaku": "文化芸術の振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "ジャパンワインの魅力を発信する新たな情報発信拠点の県内設置に向けた検討を行う。",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
        },
        {
          "name": "ふるさと山梨郷土人物発信事業費",
          "amountOku": 0.00409,
          "kan": null,
          "shisaku": "文化芸術の振興",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "地域の歴史や文化についての理解と関心を深めるため、博物館に先人の功績を紹介す",
          "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
          "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
        }
      ],
      "execution": [
        {
          "fy": "R6",
          "basis": "確定",
          "fyLabel": "令和6年度（決算・確定値）",
          "asOf": "令和6年度決算（確定値）",
          "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
          "population": null,
          "revenueBudgetTotalOku": 6700.46789557,
          "revenueSettledTotalOku": 5713.05119222,
          "expenditureBudgetTotalOku": 6700.46789557,
          "expenditureSettledTotalOku": 5530.30730401,
          "revenue": [
            {
              "name": "県税",
              "budgetOku": 1061.03382,
              "settledOku": 1073.21812008,
              "ratePct": 101.1,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "地方消費税清算金",
              "budgetOku": 440.5438,
              "settledOku": 440.56323589,
              "ratePct": 100,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "地方譲与税",
              "budgetOku": 189.41008,
              "settledOku": 189.52736,
              "ratePct": 100.1,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "地方特例交付金",
              "budgetOku": 28.46814,
              "settledOku": 28.46813,
              "ratePct": 99.9,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "地方交付税",
              "budgetOku": 1471.88767,
              "settledOku": 1472.5426,
              "ratePct": 100,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "交通安全対策特別交付金",
              "budgetOku": 2.16,
              "settledOku": 1.70584,
              "ratePct": 79,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "分担金及び負担金",
              "budgetOku": 42.74621429,
              "settledOku": 25.8410692,
              "ratePct": 60.5,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "使用料及び手数料",
              "budgetOku": 72.23847,
              "settledOku": 71.16983566,
              "ratePct": 98.5,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "国庫支出金",
              "budgetOku": 1149.72274716,
              "settledOku": 762.50156468,
              "ratePct": 66.3,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "財産収入",
              "budgetOku": 7.97582,
              "settledOku": 9.01988036,
              "ratePct": 113.1,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "寄附金",
              "budgetOku": 8.75826,
              "settledOku": 9.20931521,
              "ratePct": 105.2,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "繰入金",
              "budgetOku": 120.26522,
              "settledOku": 118.1177781,
              "ratePct": 98.2,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "繰越金",
              "budgetOku": 193.50488595,
              "settledOku": 193.50488185,
              "ratePct": 100,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "諸収入",
              "budgetOku": 912.03276817,
              "settledOku": 750.55158119,
              "ratePct": 82.3,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            },
            {
              "name": "県債",
              "budgetOku": 999.72,
              "settledOku": 567.11,
              "ratePct": 56.7,
              "ref": "r6kessannjokyou.pdf#p4",
              "refLabel": "決算の状況 p.4"
            }
          ],
          "expenditure": [
            {
              "name": "議会費",
              "budgetOku": 10.51474,
              "settledOku": 10.04204889,
              "ratePct": 95.5,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "総務費",
              "budgetOku": 478.09288597,
              "settledOku": 386.25792386,
              "ratePct": 80.8,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "民生費",
              "budgetOku": 728.82241547,
              "settledOku": 648.6440245,
              "ratePct": 89,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "衛生費",
              "budgetOku": 201.6026776,
              "settledOku": 177.56964626,
              "ratePct": 88.1,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "労働費",
              "budgetOku": 28.84357,
              "settledOku": 17.62693118,
              "ratePct": 61.1,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "農林水産業費",
              "budgetOku": 484.25977012,
              "settledOku": 325.45169947,
              "ratePct": 67.2,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "商工費",
              "budgetOku": 806.43396618,
              "settledOku": 609.61342937,
              "ratePct": 75.6,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "土木費",
              "budgetOku": 1548.57820205,
              "settledOku": 999.39769794,
              "ratePct": 64.5,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "警察費",
              "budgetOku": 260.7290054,
              "settledOku": 257.26142281,
              "ratePct": 98.7,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "教育費",
              "budgetOku": 931.039223,
              "settledOku": 892.24643739,
              "ratePct": 95.8,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "災害復旧費",
              "budgetOku": 24.86436978,
              "settledOku": 14.75310287,
              "ratePct": 59.3,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "公債費",
              "budgetOku": 741.39881,
              "settledOku": 740.89441505,
              "ratePct": 99.9,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "諸支出金",
              "budgetOku": 453.78629,
              "settledOku": 450.54852442,
              "ratePct": 99.3,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            },
            {
              "name": "予備費",
              "budgetOku": 1.50197,
              "settledOku": 0,
              "ratePct": 0,
              "ref": "r6kessannjokyou.pdf#p5",
              "refLabel": "決算の状況 p.5"
            }
          ],
          "sourceTitle": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
          "sourceUrl": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
          "originUrl": "https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
          "sourceLocalUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf",
          "evidence": [
            {
              "title": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
              "type": "PDF",
              "url": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
              "localUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf",
              "source": "www.pref.yamanashi.jp",
              "thumb": "r6kessannjokyou.pdf ・ sha256 4ac0b9855c4a8e1c… ・ 2026-07-14 取得"
            }
          ]
        }
      ],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 801056,
      "populationLabel": "県内市町村の住民基本台帳人口の合計（総務省 令和6年度決算）",
      "totalOku": 5321.1735,
      "prevTotalOku": 5115.43169,
      "yoyLabel": "+4.0%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "交付金地方交付税",
          "v": 1409.44,
          "prevV": 1369.85,
          "yoy": 2.9
        },
        {
          "name": "県税",
          "v": 1094.63459,
          "prevV": 1060.86256,
          "yoy": 3.2
        },
        {
          "name": "諸収入",
          "v": 727.63231,
          "prevV": 822.00693,
          "yoy": -11.5
        },
        {
          "name": "手数料国庫支出金",
          "v": 541.21052,
          "prevV": 501.27532,
          "yoy": 8
        },
        {
          "name": "地方消費税",
          "v": 515.65652,
          "prevV": 451.91967,
          "yoy": 14.1
        },
        {
          "name": "県債",
          "v": 493.68,
          "prevV": 445.36,
          "yoy": 10.8
        },
        {
          "name": "清算金地方譲与税",
          "v": 195.84254,
          "prevV": 179.4261,
          "yoy": 9.1
        },
        {
          "name": "繰入金",
          "v": 173.85699,
          "prevV": 165.61106,
          "yoy": 5
        },
        {
          "name": "その他",
          "v": 169.22003,
          "prevV": 119.12005,
          "yoy": null,
          "children": [
            {
              "name": "負担金使用料及び",
              "v": 76.96147,
              "prevV": 74.95492,
              "yoy": 2.7
            },
            {
              "name": "地方特例",
              "v": 50.26389,
              "prevV": 4.58001,
              "yoy": 997.5
            },
            {
              "name": "特別交付金分担金及び",
              "v": 26.62594,
              "prevV": 26.56239,
              "yoy": 0.2
            },
            {
              "name": "財産収入",
              "v": 12.57252,
              "prevV": 9.70059,
              "yoy": 29.6
            },
            {
              "name": "交通安全対策",
              "v": 1.9,
              "prevV": 2.06,
              "yoy": -7.8
            },
            {
              "name": "寄附金",
              "v": 0.8962,
              "prevV": 1.26213,
              "yoy": -29
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
          "name": "教育費",
          "v": 1035.84677,
          "prevV": 925.85266,
          "yoy": 11.9
        },
        {
          "name": "公債費",
          "v": 700.58695,
          "prevV": 700.9522,
          "yoy": -0.1
        },
        {
          "name": "土木費",
          "v": 684.55143,
          "prevV": 682.50082,
          "yoy": 0.3
        },
        {
          "name": "民生費",
          "v": 679.34661,
          "prevV": 627.90003,
          "yoy": 8.2
        },
        {
          "name": "商工費",
          "v": 568.97801,
          "prevV": 658.59993,
          "yoy": -13.6
        },
        {
          "name": "諸支出金",
          "v": 502.30527,
          "prevV": 424.37774,
          "yoy": 18.4
        },
        {
          "name": "総務費",
          "v": 417.52979,
          "prevV": 388.58509,
          "yoy": 7.4
        },
        {
          "name": "警察費",
          "v": 244.44995,
          "prevV": 240.47558,
          "yoy": 1.7
        },
        {
          "name": "農林水産業費",
          "v": 227.887,
          "prevV": 226.649,
          "yoy": 0.5
        },
        {
          "name": "衛生費",
          "v": 191.15462,
          "prevV": 171.54614,
          "yoy": 11.4
        },
        {
          "name": "災害復旧費",
          "v": 35.05937,
          "prevV": 34.46054,
          "yoy": 1.7
        },
        {
          "name": "労働費",
          "v": 18.5314,
          "prevV": 18.36225,
          "yoy": 0.9
        },
        {
          "name": "議会費",
          "v": 9.94633,
          "prevV": 10.16971,
          "yoy": -2.2
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
      "sourceUrl": "https://web.archive.org/web/20260520040653/https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
      "originUrl": "https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
      "sourceLocalUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260520040653/https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
          "localUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf",
          "source": "www.pref.yamanashi.jp",
          "thumb": "03_tousyoyosannkibo_1.pdf ・ sha256 742025562ff7fed1… ・ 2026-07-14 取得"
        }
      ]
    }
  ],
  "192023": [
    {
      "muniCode": "192023",
      "muniName": "富士吉田市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [
        {
          "name": "下水道事業",
          "amountOku": 10.402,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
        },
        {
          "name": "道の駅富士吉田リニューアル事業",
          "amountOku": 8.68006,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.30",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=30"
        },
        {
          "name": "水道事業",
          "amountOku": 8.46237,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
        },
        {
          "name": "学校給食センター運営事業",
          "amountOku": 7.5285,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
        },
        {
          "name": "市道等建設事業",
          "amountOku": 3.92134,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
        },
        {
          "name": "行政ネットワーク運用管理事業",
          "amountOku": 3.19763,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
        },
        {
          "name": "中学校校舎等維持管理事業",
          "amountOku": 3.07449,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
        },
        {
          "name": "小中学校情報教育推進事業",
          "amountOku": 2.93639,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
        },
        {
          "name": "財産管理事業",
          "amountOku": 2.57125,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
        },
        {
          "name": "コミュニティセンター等大規模改修事業",
          "amountOku": 2.55413,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
        },
        {
          "name": "公園管理運営事業",
          "amountOku": 2.46273,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
        },
        {
          "name": "横町熊穴線外２路線整備事業",
          "amountOku": 2.39897,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
        },
        {
          "name": "観光宣伝・観光客誘致推進事業",
          "amountOku": 2.16266,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.30",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=30"
        },
        {
          "name": "ごみ収集事業",
          "amountOku": 2.14197,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.32",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=32"
        },
        {
          "name": "市営住宅管理事業",
          "amountOku": 2.00129,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.33",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=33"
        },
        {
          "name": "小学校校舎等維持管理事業",
          "amountOku": 1.72928,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
        },
        {
          "name": "企画・調整事業",
          "amountOku": 1.70431,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.21",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=21"
        },
        {
          "name": "特定防衛施設周辺公共用施設整備事業",
          "amountOku": 1.664,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
        },
        {
          "name": "市民会館管理運営事業",
          "amountOku": 1.39584,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
        },
        {
          "name": "定住促進関連事業",
          "amountOku": 1.26163,
          "kan": null,
          "shisaku": "ふるさと創生室",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.36",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=36"
        },
        {
          "name": "ふるさと寄附推進事業",
          "amountOku": 1.18619,
          "kan": null,
          "shisaku": "ふるさと創生室",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.36",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=36"
        },
        {
          "name": "こども子育て支援事業",
          "amountOku": 1.16949,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
        },
        {
          "name": "非常備消防事業",
          "amountOku": 1.02143,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
        },
        {
          "name": "富士吉田市観光施設管理運営事業",
          "amountOku": 0.9823,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.30",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=30"
        },
        {
          "name": "防災対策事業",
          "amountOku": 0.90832,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
        },
        {
          "name": "木造住宅耐震改修等事業",
          "amountOku": 0.76186,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.33",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=33"
        },
        {
          "name": "区画整理事業",
          "amountOku": 0.72327,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
        },
        {
          "name": "コミュニティセンター等管理運営事業",
          "amountOku": 0.69545,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.21",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=21"
        },
        {
          "name": "中小企業等への融資斡旋・利子補給事業",
          "amountOku": 0.66534,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
        },
        {
          "name": "放課後児童対策事業",
          "amountOku": 0.55715,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
        },
        {
          "name": "健康総務事業",
          "amountOku": 0.54128,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
        },
        {
          "name": "リサイクル推進事業",
          "amountOku": 0.50823,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.32",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=32"
        },
        {
          "name": "介護保険特別会計包括的支援事業･任意事業",
          "amountOku": 0.46014,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
        },
        {
          "name": "商業活性化対策事業",
          "amountOku": 0.45205,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
        },
        {
          "name": "まちづくりパートナーシップ事業",
          "amountOku": 0.40629,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
        },
        {
          "name": "人事管理事務事業",
          "amountOku": 0.40399,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.23",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=23"
        },
        {
          "name": "鳥獣対策事業",
          "amountOku": 0.31424,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
        },
        {
          "name": "こども福祉事業",
          "amountOku": 0.305,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
        },
        {
          "name": "地域支え合い事業",
          "amountOku": 0.29543,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
        },
        {
          "name": "子育て見守り事業",
          "amountOku": 0.28801,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
        },
        {
          "name": "教育委員会管理事業",
          "amountOku": 0.26572,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.37",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=37"
        },
        {
          "name": "自治体ＤＸ推進事業",
          "amountOku": 0.25418,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
        },
        {
          "name": "富士山安全対策・環境保全推進事業",
          "amountOku": 0.24526,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
        },
        {
          "name": "自然エネルギー設置事業",
          "amountOku": 0.22211,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
        },
        {
          "name": "国道138号対策事業",
          "amountOku": 0.21485,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
        },
        {
          "name": "子育て支援センター管理運営事業",
          "amountOku": 0.18708,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.25",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=25"
        },
        {
          "name": "人口ビジョン・地域創生推進事業",
          "amountOku": 0.17292,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.21",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=21"
        },
        {
          "name": "不妊治療費助成事業",
          "amountOku": 0.15,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
        },
        {
          "name": "雇用促進支援事業",
          "amountOku": 0.12627,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
        },
        {
          "name": "森林環境整備事業",
          "amountOku": 0.10397,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
        },
        {
          "name": "生活困窮者自立促進支援事業",
          "amountOku": 0.09379,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.25",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=25"
        },
        {
          "name": "徴収事業",
          "amountOku": 0.07523,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
        },
        {
          "name": "建築営繕事業",
          "amountOku": 0.05846,
          "kan": null,
          "shisaku": "都市基盤部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
        },
        {
          "name": "富士山火山対策事業",
          "amountOku": 0.05407,
          "kan": null,
          "shisaku": "企画部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
        },
        {
          "name": "農業振興事業",
          "amountOku": 0.04298,
          "kan": null,
          "shisaku": "経済環境部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
          "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
        }
      ],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 46364,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 310.6,
      "prevTotalOku": 289.7,
      "yoyLabel": "+7.2%",
      "prevBasis": "当初",
      "prevNote": "",
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
              "name": "国有提供施設等所在市町村助成交付金",
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
      "sourceTitle": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業）",
      "sourceUrl": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
      "originUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
      "sourceLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
          "localUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
          "source": "www.city.fujiyoshida.yamanashi.jp",
          "thumb": "7412.pdf ・ sha256 879613ffbf544674… ・ 2026-07-13 取得"
        }
      ]
    }
  ],
  "192040": [
    {
      "muniCode": "192040",
      "muniName": "都留市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 28509,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 192.87,
      "prevTotalOku": 172.28,
      "yoyLabel": "+12.0%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "地方交付税",
          "v": 52.85,
          "prevV": 48.1,
          "yoy": 9.9
        },
        {
          "name": "市税",
          "v": 40.62747,
          "prevV": 39.43726,
          "yoy": 3
        },
        {
          "name": "国庫支出金",
          "v": 24.24713,
          "prevV": 21.3095,
          "yoy": 13.8
        },
        {
          "name": "繰入金",
          "v": 22.38637,
          "prevV": 19.33057,
          "yoy": 15.8
        },
        {
          "name": "市債",
          "v": 10.254,
          "prevV": 9.574,
          "yoy": 7.1
        },
        {
          "name": "県支出金",
          "v": 10.00455,
          "prevV": 9.9477,
          "yoy": 0.6
        },
        {
          "name": "地方消費税交付金",
          "v": 9.65635,
          "prevV": 8.43098,
          "yoy": 14.5
        },
        {
          "name": "諸収入",
          "v": 7.78653,
          "prevV": 1.42266,
          "yoy": 447.3
        },
        {
          "name": "その他",
          "v": 15.057600000000003,
          "prevV": 14.727329999999998,
          "yoy": null,
          "children": [
            {
              "name": "寄附金",
              "v": 6.00003,
              "prevV": 6.00003,
              "yoy": 0
            },
            {
              "name": "使用料及び手数料",
              "v": 2.17665,
              "prevV": 2.14171,
              "yoy": 1.6
            },
            {
              "name": "分担金及び負担金",
              "v": 1.53912,
              "prevV": 2.09145,
              "yoy": -26.4
            },
            {
              "name": "地方譲与税",
              "v": 1.17121,
              "prevV": 1.19415,
              "yoy": -1.9
            },
            {
              "name": "財産収入",
              "v": 1.07186,
              "prevV": 0.76582,
              "yoy": 40
            },
            {
              "name": "法人事業税交付金",
              "v": 0.89588,
              "prevV": 0.80733,
              "yoy": 11
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.81662,
              "prevV": 0.73598,
              "yoy": 11
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 0.45453,
              "prevV": 0.38264,
              "yoy": 18.8
            },
            {
              "name": "配当割交付金",
              "v": 0.33094,
              "prevV": 0.22448,
              "yoy": 47.4
            },
            {
              "name": "地方特例交付金",
              "v": 0.27996,
              "prevV": 0.21195,
              "yoy": 32.1
            },
            {
              "name": "利子割交付金",
              "v": 0.16413,
              "prevV": 0.0218,
              "yoy": 652.9
            },
            {
              "name": "環境性能割交付金",
              "v": 0.13157,
              "prevV": 0.12215,
              "yoy": 7.7
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 0.02509,
              "prevV": 0.02783,
              "yoy": -9.8
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
          "name": "教育費",
          "v": 52.25945,
          "prevV": 40.09441,
          "yoy": 30.3
        },
        {
          "name": "民生費",
          "v": 46.44394,
          "prevV": 45.33175,
          "yoy": 2.5
        },
        {
          "name": "総務費",
          "v": 24.35832,
          "prevV": 23.96431,
          "yoy": 1.6
        },
        {
          "name": "土木費",
          "v": 21.77629,
          "prevV": 16.25536,
          "yoy": 34
        },
        {
          "name": "衛生費",
          "v": 21.24471,
          "prevV": 20.61828,
          "yoy": 3
        },
        {
          "name": "公債費",
          "v": 12.50211,
          "prevV": 12.17999,
          "yoy": 2.6
        },
        {
          "name": "消防費",
          "v": 7.10239,
          "prevV": 7.0379,
          "yoy": 0.9
        },
        {
          "name": "農林水産業費",
          "v": 3.37864,
          "prevV": 3.19337,
          "yoy": 5.8
        },
        {
          "name": "商工費",
          "v": 1.93735,
          "prevV": 1.75103,
          "yoy": 10.6
        },
        {
          "name": "議会費",
          "v": 1.51052,
          "prevV": 1.56429,
          "yoy": -3.4
        },
        {
          "name": "予備費",
          "v": 0.2,
          "prevV": 0.2,
          "yoy": 0
        },
        {
          "name": "諸支出金",
          "v": 0.15625,
          "prevV": 0.08928,
          "yoy": 75
        },
        {
          "name": "災害復旧費",
          "v": 0.00003,
          "prevV": 0.00003,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 都留市当初予算（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260714071801/https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
      "originUrl": "https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
      "sourceLocalUrl": "/sources/tsuru-yosansho-r8/R8-0.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 都留市当初予算（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260714071801/https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
          "localUrl": "/sources/tsuru-yosansho-r8/R8-0.pdf",
          "source": "www.city.tsuru.yamanashi.jp",
          "thumb": "R8-0.pdf ・ sha256 f11b50887ab13c8f… ・ 2026-07-14 取得"
        }
      ]
    }
  ],
  "192066": [
    {
      "muniCode": "192066",
      "muniName": "大月市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 21314,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 141.35,
      "prevTotalOku": 130.85,
      "yoyLabel": "+8.0%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 41.17125,
          "prevV": 40.96423,
          "yoy": 0.5
        },
        {
          "name": "地方交付税",
          "v": 29.15,
          "prevV": 30.55,
          "yoy": -4.6
        },
        {
          "name": "国庫支出金",
          "v": 19.77473,
          "prevV": 17.06691,
          "yoy": 15.9
        },
        {
          "name": "繰入金",
          "v": 15.74636,
          "prevV": 9.56185,
          "yoy": 64.7
        },
        {
          "name": "市債",
          "v": 10.169,
          "prevV": 8.331,
          "yoy": 22.1
        },
        {
          "name": "県支出金",
          "v": 7.49486,
          "prevV": 7.17224,
          "yoy": 4.5
        },
        {
          "name": "地方消費税交付金",
          "v": 6.1,
          "prevV": 5.9,
          "yoy": 3.4
        },
        {
          "name": "諸収入",
          "v": 2.68726,
          "prevV": 2.64664,
          "yoy": 1.5
        },
        {
          "name": "その他",
          "v": 9.056540000000002,
          "prevV": 8.657129999999999,
          "yoy": null,
          "children": [
            {
              "name": "寄附金",
              "v": 2.00102,
              "prevV": 2.00102,
              "yoy": 0
            },
            {
              "name": "使用料及び手数料",
              "v": 1.78232,
              "prevV": 1.79239,
              "yoy": -0.6
            },
            {
              "name": "分担金及び負担金",
              "v": 1.53575,
              "prevV": 1.5899,
              "yoy": -3.4
            },
            {
              "name": "地方譲与税",
              "v": 1.24051,
              "prevV": 1.24827,
              "yoy": -0.6
            },
            {
              "name": "財産収入",
              "v": 0.75187,
              "prevV": 0.51354,
              "yoy": 46.4
            },
            {
              "name": "法人事業税交付金",
              "v": 0.52,
              "prevV": 0.51,
              "yoy": 2
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 0.32,
              "prevV": 0.29,
              "yoy": 10.3
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.31,
              "prevV": 0.3,
              "yoy": 3.3
            },
            {
              "name": "配当割交付金",
              "v": 0.23,
              "prevV": 0.17,
              "yoy": 35.3
            },
            {
              "name": "環境性能割交付金",
              "v": 0.13,
              "prevV": 0.11,
              "yoy": 18.2
            },
            {
              "name": "地方特例交付金",
              "v": 0.13,
              "prevV": 0.1,
              "yoy": 30
            },
            {
              "name": "利子割交付金",
              "v": 0.08506,
              "prevV": 0.012,
              "yoy": 608.8
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 0.02,
              "prevV": 0.02,
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
          "v": 37.30489,
          "prevV": 35.42982,
          "yoy": 5.3
        },
        {
          "name": "総務費",
          "v": 21.44286,
          "prevV": 23.05056,
          "yoy": -7
        },
        {
          "name": "土木費",
          "v": 20.33918,
          "prevV": 15.75749,
          "yoy": 29.1
        },
        {
          "name": "教育費",
          "v": 17.84848,
          "prevV": 13.03933,
          "yoy": 36.9
        },
        {
          "name": "衛生費",
          "v": 17.19379,
          "prevV": 16.80418,
          "yoy": 2.3
        },
        {
          "name": "公債費",
          "v": 15.57062,
          "prevV": 15.3723,
          "yoy": 1.3
        },
        {
          "name": "消防費",
          "v": 6.70371,
          "prevV": 6.66342,
          "yoy": 0.6
        },
        {
          "name": "農林水産業費",
          "v": 2.70419,
          "prevV": 2.48252,
          "yoy": 8.9
        },
        {
          "name": "議会費",
          "v": 1.29549,
          "prevV": 1.2905,
          "yoy": 0.4
        },
        {
          "name": "商工費",
          "v": 0.84274,
          "prevV": 0.859,
          "yoy": -1.9
        },
        {
          "name": "予備費",
          "v": 0.1,
          "prevV": 0.1,
          "yoy": 0
        },
        {
          "name": "諸支出金",
          "v": 0.00402,
          "prevV": 0.00085,
          "yoy": 372.9
        },
        {
          "name": "災害復旧費",
          "v": 0.00003,
          "prevV": 0.00003,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 大月市当初予算概要（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260714071536/https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
      "originUrl": "https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
      "sourceLocalUrl": "/sources/otsuki-yosansho-r8/R08_yosangaiyou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 大月市当初予算概要（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260714071536/https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
          "localUrl": "/sources/otsuki-yosansho-r8/R08_yosangaiyou.pdf",
          "source": "www.city.otsuki.yamanashi.jp",
          "thumb": "R08_yosangaiyou.pdf ・ sha256 a2dd179b68d6a341… ・ 2026-07-14 取得"
        }
      ]
    }
  ],
  "192082": [
    {
      "muniCode": "192082",
      "muniName": "南アルプス市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 71726,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 429.94462,
      "prevTotalOku": 417.24947,
      "yoyLabel": "+3.0%",
      "prevBasis": "当初",
      "prevNote": "",
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
    }
  ],
  "192091": [
    {
      "muniCode": "192091",
      "muniName": "北杜市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 45380,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 347.86332,
      "prevTotalOku": 339.17716,
      "yoyLabel": "+2.6%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "地方交付税",
          "v": 100,
          "prevV": 101.5,
          "yoy": -1.5
        },
        {
          "name": "市税",
          "v": 81.29114,
          "prevV": 78.64763,
          "yoy": 3.4
        },
        {
          "name": "国庫支出金",
          "v": 29.65003,
          "prevV": 28.49546,
          "yoy": 4.1
        },
        {
          "name": "市債",
          "v": 28.601,
          "prevV": 32.07,
          "yoy": -10.8
        },
        {
          "name": "繰入金",
          "v": 27.37843,
          "prevV": 23.03463,
          "yoy": 18.9
        },
        {
          "name": "寄附金",
          "v": 23.80001,
          "prevV": 20.50001,
          "yoy": 16.1
        },
        {
          "name": "県支出金",
          "v": 23.26803,
          "prevV": 24.15166,
          "yoy": -3.7
        },
        {
          "name": "地方消費税交付金",
          "v": 12.68,
          "prevV": 10.36,
          "yoy": 22.4
        },
        {
          "name": "その他",
          "v": 21.19468,
          "prevV": 20.417770000000004,
          "yoy": null,
          "children": [
            {
              "name": "使用料及び手数料",
              "v": 5.26053,
              "prevV": 4.99902,
              "yoy": 5.2
            },
            {
              "name": "繰越金",
              "v": 4.4155,
              "prevV": 3.64724,
              "yoy": 21.1
            },
            {
              "name": "地方譲与税",
              "v": 3.19598,
              "prevV": 3.21354,
              "yoy": -0.5
            },
            {
              "name": "諸収入",
              "v": 3.12394,
              "prevV": 3.9013,
              "yoy": -19.9
            },
            {
              "name": "財産収入",
              "v": 1.229,
              "prevV": 0.94127,
              "yoy": 30.6
            },
            {
              "name": "法人事業税交付金",
              "v": 1.01,
              "prevV": 0.99,
              "yoy": 2
            },
            {
              "name": "分担金及び負担金",
              "v": 0.81644,
              "prevV": 1.12284,
              "yoy": -27.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 0.51,
              "prevV": 0.44,
              "yoy": 15.9
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.4,
              "prevV": 0.37,
              "yoy": 8.1
            },
            {
              "name": "配当割交付金",
              "v": 0.37,
              "prevV": 0.26,
              "yoy": 42.3
            },
            {
              "name": "環境性能割交付金",
              "v": 0.32,
              "prevV": 0.3,
              "yoy": 6.7
            },
            {
              "name": "地方特例交付金",
              "v": 0.32,
              "prevV": 0.17,
              "yoy": 88.2
            },
            {
              "name": "利子割交付金",
              "v": 0.18,
              "prevV": 0.02,
              "yoy": 800
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 0.04329,
              "prevV": 0.04256,
              "yoy": 1.7
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "民生費",
          "v": 85.86624,
          "prevV": 86.96634,
          "yoy": -1.3
        },
        {
          "name": "教育費",
          "v": 63.84417,
          "prevV": 58.03183,
          "yoy": 10
        },
        {
          "name": "総務費",
          "v": 49.66288,
          "prevV": 49.05406,
          "yoy": 1.2
        },
        {
          "name": "衛生費",
          "v": 34.25388,
          "prevV": 34.3123,
          "yoy": -0.2
        },
        {
          "name": "土木費",
          "v": 33.46014,
          "prevV": 34.27268,
          "yoy": -2.4
        },
        {
          "name": "農林水産業費",
          "v": 26.3384,
          "prevV": 26.60056,
          "yoy": -1
        },
        {
          "name": "公債費",
          "v": 25.09761,
          "prevV": 23.64716,
          "yoy": 6.1
        },
        {
          "name": "消防費",
          "v": 11.83487,
          "prevV": 12.03113,
          "yoy": -1.6
        },
        {
          "name": "商工費",
          "v": 9.15704,
          "prevV": 7.84747,
          "yoy": 16.7
        },
        {
          "name": "諸支出金",
          "v": 5.43545,
          "prevV": 3.06762,
          "yoy": 77.2
        },
        {
          "name": "議会費",
          "v": 1.8881,
          "prevV": 2.31481,
          "yoy": -18.4
        },
        {
          "name": "災害復旧費",
          "v": 0.45134,
          "prevV": 0.45134,
          "yoy": 0
        },
        {
          "name": "予備費",
          "v": 0.3,
          "prevV": 0.3,
          "yoy": 0
        },
        {
          "name": "労働費",
          "v": 0.2732,
          "prevV": 0.27986,
          "yoy": -2.4
        }
      ],
      "sourceTitle": "令和8年度 北杜市当初予算概要（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260714071224/https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
      "originUrl": "https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
      "sourceLocalUrl": "/sources/hokuto-yosansho-r8/__8__________.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 北杜市当初予算概要（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260714071224/https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
          "localUrl": "/sources/hokuto-yosansho-r8/__8__________.pdf",
          "source": "www.city.hokuto.yamanashi.jp",
          "thumb": "__8__________.pdf ・ sha256 a5766d9905a1ecb2… ・ 2026-07-14 取得"
        }
      ]
    }
  ],
  "192112": [
    {
      "muniCode": "192112",
      "muniName": "笛吹市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [
        {
          "name": "ふるさと納税事業",
          "amountOku": 27.31138,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "自主財源の確保とシティプロモーションにつなげるため、ふるさと納税寄附金の寄",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
        },
        {
          "name": "砂原配水場改築事業",
          "amountOku": 8.96222,
          "kan": null,
          "shisaku": "公営企業部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "砂原配水場については、新山梨環状道路工事の支障となり移転する必要があるた",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
        },
        {
          "name": "みさかの湯改修事業",
          "amountOku": 7.85496,
          "kan": null,
          "shisaku": "市民生活部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "みさかふれあい交流センター（みさかの湯）について、市民の憩いの場としてだけ",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
        },
        {
          "name": "小中学校・保育所等給食費及び保育料無償化",
          "amountOku": 6.07835,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "子育て世帯の負担を軽減し、未来を拓く子供たちを健やかに育むため、小中学校や",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
        },
        {
          "name": "石和第一保育所改築事業",
          "amountOku": 5.95737,
          "kan": null,
          "shisaku": "子供すこやか部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "石和第一保育所について、安全安心な保育環境の整備を図るため、個別施設計画に",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
        },
        {
          "name": "スポーツツーリズム拠点整備事業",
          "amountOku": 4.8016,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "石和清流館を拠点に、市のスポーツ振興と地域交流の活性化、防災力強化を図るた",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
        },
        {
          "name": "春日居福祉会館改修事業",
          "amountOku": 3.43615,
          "kan": null,
          "shisaku": "保健福祉部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "春日居福祉会館（やまゆりの湯）について、今後も高齢者の健全な憩いの場と心身",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
        },
        {
          "name": "消防本部庁舎改修事業",
          "amountOku": 3.2396,
          "kan": null,
          "shisaku": "消防本部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "消防本部庁舎及び訓練棟3棟について、建物や設備の長寿命化を図るため、個別施",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.19",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=19"
        },
        {
          "name": "英語力向上推進事業",
          "amountOku": 1.59048,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "将来にわたり国際社会を舞台に活躍し、市の未来を拓く人材を育成することを目的",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
        },
        {
          "name": "芦川グリーンロッジ改修事業",
          "amountOku": 1.48153,
          "kan": null,
          "shisaku": "産業観光部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "芦川グリーンロッジについて、周辺の豊かな自然環境を生かした里山遊びなど、子",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
        },
        {
          "name": "かすがい西保育所改築事業",
          "amountOku": 1.43709,
          "kan": null,
          "shisaku": "子供すこやか部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "かすがい西保育所について、安全安心な保育環境の整備を図るため、個別施設計画",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
        },
        {
          "name": "新山梨環状道路関連道路整備事業",
          "amountOku": 1.38767,
          "kan": null,
          "shisaku": "建設部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "山梨県が実施している新山梨環状道路の建設ルートに合わせ、周辺地域の利便性の",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
        },
        {
          "name": "石和北小通り・石和郵便局通り道路改良事業",
          "amountOku": 1.28302,
          "kan": null,
          "shisaku": "建設部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "通勤・通学等の日常生活の利便性の向上、物流や観光面での活用による地域活性化",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
        },
        {
          "name": "AIデマンド交通事業",
          "amountOku": 1.00227,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "公共交通空白地帯を解消するとともに、高齢者や交通弱者の外出支援及び市民の公",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
        },
        {
          "name": "さくら温泉通り歩道整備事業",
          "amountOku": 0.99,
          "kan": null,
          "shisaku": "建設部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "整備から20年が経過し老朽化しているさくら温泉通りのウッドデッキの歩道につい",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
        },
        {
          "name": "笛吹市南部学校給食センター建設事業",
          "amountOku": 0.63927,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "御坂学校給食共同調理場、八代学校給食センター、境川小学校調理場、芦川小学校",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
        },
        {
          "name": "子育て世帯住宅取得支援事業",
          "amountOku": 0.573,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "子育て世帯の住宅取得に係る経済的負担を軽減し、若者や子育て世帯の移住定住の",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
        },
        {
          "name": "私立保育所等施設整備事業",
          "amountOku": 0.51424,
          "kan": null,
          "shisaku": "子供すこやか部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "市内の私立保育所等（令和8年度は、相興保育園、御所保育園、木の花保育園の3",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
        },
        {
          "name": "子育て世帯住宅取得補助事業",
          "amountOku": 0.417,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "子育て世帯の住宅取得に係る経済的負担を軽減するため、18歳以下の子を養育して",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
        },
        {
          "name": "拠点備蓄倉庫整備事業",
          "amountOku": 0.37199,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "旧御坂保健センターを、地域防災計画に各地区の拠点となり、中長期の避難に必要",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
        },
        {
          "name": "奨学金返還支援事業",
          "amountOku": 0.29527,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "奨学金を返還する若者の就労初期における経済的負担を軽減し、市内への移住定住",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
        },
        {
          "name": "山盧施設管理運営事業",
          "amountOku": 0.28345,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "日本を代表する俳人「飯田蛇笏」と現代俳句の第一人者「飯田龍太」の生家であ",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
        },
        {
          "name": "ハザードマップ更新事業",
          "amountOku": 0.27649,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "自然災害に対する防災対策及び被害の軽減に使用することを目的に、笛吹市ハザー",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
        },
        {
          "name": "学校体育館等空調設備整備事業",
          "amountOku": 0.24288,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "学校体育館等は、教育活動としての利用だけではなく、災害時には地域住民の避難",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
        },
        {
          "name": "結婚新生活支援事業",
          "amountOku": 0.135,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "新婚世帯の新生活を支援し、少子化対策及び子育てしやすいまちづくりを推進する",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
        },
        {
          "name": "やまなしKAITEKI住宅普及促進事業",
          "amountOku": 0.124,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "山梨県の「やまなしKAITEKI住宅普及促進事業」を活用し、本市の人口減少対策を",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
        },
        {
          "name": "収入保険加入補助事業",
          "amountOku": 0.09398,
          "kan": null,
          "shisaku": "産業観光部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "農業者の経営安定を図り、市の基幹産業である農業振興の推進を目的に、農産物の",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
        },
        {
          "name": "笛吹市農業塾推進事業",
          "amountOku": 0.084,
          "kan": null,
          "shisaku": "産業観光部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "担い手の確保や安定した農業経営に寄与し、市の基幹産業である農業の発展につな",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
        },
        {
          "name": "社会体育施設整備検討事業",
          "amountOku": 0.07601,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "競技レベルの向上に資する施設の整備が求められている現状を踏まえ、市全体を一",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
        },
        {
          "name": "空き店舗活用促進補助事業",
          "amountOku": 0.072,
          "kan": null,
          "shisaku": "産業観光部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "空き店舗を利用した新規出店を促進し、地域のにぎわいの創出及び本市のイメージ",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
        },
        {
          "name": "個別避難計画作成事業",
          "amountOku": 0.06315,
          "kan": null,
          "shisaku": "保健福祉部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "要介護者等の避難行動要支援者について、発災時又は発災のおそれがある場合に円",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
        },
        {
          "name": "衛星回線導入事業",
          "amountOku": 0.05294,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "激甚災害が発生した際、現状の通信ネットワークが使用できなくなることに備え、",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
        },
        {
          "name": "笛吹市こどもの居場所づくり支援事業",
          "amountOku": 0.035,
          "kan": null,
          "shisaku": "子供すこやか部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "子どもが健やかに成長できるよう、孤立や孤独の防止、学びや成長機会の確保を目",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
        },
        {
          "name": "フリースクール利用支援事業",
          "amountOku": 0.0288,
          "kan": null,
          "shisaku": "教育委員会",
          "kubun": null,
          "prevAmountOku": null,
          "description": "不登校児童生徒の学びの場の一つであるフリースクールについて、不登校児童の学",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
        },
        {
          "name": "入札業務電子化事業",
          "amountOku": 0.0231,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "入札事務の効率化、事業者の利便性の向上及び透明性の向上などを目的に、従来紙",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
        },
        {
          "name": "電子母子手帳活用促進事業",
          "amountOku": 0.01677,
          "kan": null,
          "shisaku": "子供すこやか部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "子育て支援の向上を図るため、母子健康手帳の記録機能やプッシュ通知型によるお",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
        },
        {
          "name": "契約業務電子化事業",
          "amountOku": 0.00004,
          "kan": null,
          "shisaku": "総務部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "契約行為に係る手続きの迅速化や省力化を図るため、従来紙によって行っている契",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
        },
        {
          "name": "文化施設整備検討事業",
          "amountOku": 0,
          "kan": null,
          "shisaku": "総合政策部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "既存の文化施設である青楓美術館、八代郷土館、春日居郷土館・小川正子記念館、",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
        },
        {
          "name": "石橋工業団地基盤整備事業",
          "amountOku": 0,
          "kan": null,
          "shisaku": "産業観光部",
          "kubun": null,
          "prevAmountOku": null,
          "description": "地元雇用の創出や市税の税収確保のため、積極的な企業誘致を進めており、今後既",
          "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
          "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
        }
      ],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 66857,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 481.59288,
      "prevTotalOku": 454.93102,
      "yoyLabel": "+5.9%",
      "prevBasis": "当初",
      "prevNote": "",
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
    }
  ],
  "192139": [
    {
      "muniCode": "192139",
      "muniName": "甲州市",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 29079,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 219.28,
      "prevTotalOku": 208,
      "yoyLabel": "+5.4%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "地方交付税",
          "v": 56.94285,
          "prevV": 56.43053,
          "yoy": 0.9
        },
        {
          "name": "市税",
          "v": 42.96965,
          "prevV": 42.11828,
          "yoy": 2
        },
        {
          "name": "繰入金",
          "v": 27.78691,
          "prevV": 24.81938,
          "yoy": 12
        },
        {
          "name": "国庫支出金",
          "v": 23.13397,
          "prevV": 22.60973,
          "yoy": 2.3
        },
        {
          "name": "寄附金",
          "v": 23.051,
          "prevV": 20.051,
          "yoy": 15
        },
        {
          "name": "市債",
          "v": 13.436,
          "prevV": 10.437,
          "yoy": 28.7
        },
        {
          "name": "県支出金",
          "v": 12.27453,
          "prevV": 12.34482,
          "yoy": -0.6
        },
        {
          "name": "地方消費税交付金",
          "v": 8.8,
          "prevV": 7.7,
          "yoy": 14.3
        },
        {
          "name": "その他",
          "v": 10.885090000000003,
          "prevV": 11.48926,
          "yoy": null,
          "children": [
            {
              "name": "諸収入",
              "v": 2.62044,
              "prevV": 3.95761,
              "yoy": -33.8
            },
            {
              "name": "繰越金",
              "v": 2,
              "prevV": 2,
              "yoy": 0
            },
            {
              "name": "使用料及び手数料",
              "v": 1.7531,
              "prevV": 1.7484,
              "yoy": 0.3
            },
            {
              "name": "地方譲与税",
              "v": 1.34786,
              "prevV": 1.36386,
              "yoy": -1.2
            },
            {
              "name": "法人事業税交付金",
              "v": 0.69,
              "prevV": 0.59,
              "yoy": 16.9
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 0.48,
              "prevV": 0.34,
              "yoy": 41.2
            },
            {
              "name": "分担金及び負担金",
              "v": 0.42824,
              "prevV": 0.42686,
              "yoy": 0.3
            },
            {
              "name": "配当割交付金",
              "v": 0.4,
              "prevV": 0.26,
              "yoy": 53.8
            },
            {
              "name": "財産収入",
              "v": 0.36039,
              "prevV": 0.24127,
              "yoy": 49.4
            },
            {
              "name": "地方特例交付金",
              "v": 0.275,
              "prevV": 0.169,
              "yoy": 62.7
            },
            {
              "name": "環境性能割交付金",
              "v": 0.18,
              "prevV": 0.21,
              "yoy": -14.3
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.17,
              "prevV": 0.14,
              "yoy": 21.4
            },
            {
              "name": "利子割交付金",
              "v": 0.16,
              "prevV": 0.02,
              "yoy": 700
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 0.02006,
              "prevV": 0.02226,
              "yoy": -9.9
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "総務費",
          "v": 62.5471,
          "prevV": 56.7582,
          "yoy": 10.2
        },
        {
          "name": "民生費",
          "v": 57.54719,
          "prevV": 54.26982,
          "yoy": 6
        },
        {
          "name": "教育費",
          "v": 20.24234,
          "prevV": 18.17985,
          "yoy": 11.3
        },
        {
          "name": "公債費",
          "v": 19.68687,
          "prevV": 20.88246,
          "yoy": -5.7
        },
        {
          "name": "土木費",
          "v": 19.55464,
          "prevV": 22.07701,
          "yoy": -11.4
        },
        {
          "name": "衛生費",
          "v": 16.03954,
          "prevV": 16.08132,
          "yoy": -0.3
        },
        {
          "name": "消防費",
          "v": 10.52005,
          "prevV": 7.49962,
          "yoy": 40.3
        },
        {
          "name": "農林水産業費",
          "v": 6.70251,
          "prevV": 6.20319,
          "yoy": 8
        },
        {
          "name": "商工費",
          "v": 4.06691,
          "prevV": 3.82344,
          "yoy": 6.4
        },
        {
          "name": "議会費",
          "v": 1.84086,
          "prevV": 1.69336,
          "yoy": 8.7
        },
        {
          "name": "予備費",
          "v": 0.35,
          "prevV": 0.35,
          "yoy": 0
        },
        {
          "name": "労働費",
          "v": 0.18199,
          "prevV": 0.18173,
          "yoy": 0.1
        }
      ],
      "sourceTitle": "令和8年度 甲州市当初予算（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260714072236/https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
      "originUrl": "https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
      "sourceLocalUrl": "/sources/koshu-yosansho-r8/R8tousyoyosan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 甲州市当初予算（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260714072236/https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
          "localUrl": "/sources/koshu-yosansho-r8/R8tousyoyosan.pdf",
          "source": "www.city.koshu.yamanashi.jp",
          "thumb": "R8tousyoyosan.pdf ・ sha256 108e376a89df693a… ・ 2026-07-14 取得"
        }
      ]
    }
  ],
  "194301": [
    {
      "muniCode": "194301",
      "muniName": "富士河口湖町",
      "prefName": "山梨県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 27115,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 157.7,
      "prevTotalOku": 147.53,
      "yoyLabel": "+6.9%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "町税",
          "v": 49.59744,
          "prevV": 48.36017,
          "yoy": 2.6
        },
        {
          "name": "地方交付税",
          "v": 30,
          "prevV": 31,
          "yoy": -3.2
        },
        {
          "name": "繰入金",
          "v": 21.46669,
          "prevV": 17.86853,
          "yoy": 20.1
        },
        {
          "name": "国庫支出金",
          "v": 13.30948,
          "prevV": 11.33578,
          "yoy": 17.4
        },
        {
          "name": "寄附金",
          "v": 10.47003,
          "prevV": 10.35003,
          "yoy": 1.2
        },
        {
          "name": "県支出金",
          "v": 7.80487,
          "prevV": 7.29547,
          "yoy": 7
        },
        {
          "name": "地方消費税交付金",
          "v": 7.5,
          "prevV": 6.8,
          "yoy": 10.3
        },
        {
          "name": "町債",
          "v": 6.367,
          "prevV": 4.015,
          "yoy": 58.6
        },
        {
          "name": "その他",
          "v": 11.18449,
          "prevV": 10.505019999999996,
          "yoy": null,
          "children": [
            {
              "name": "繰越金",
              "v": 4.1,
              "prevV": 4,
              "yoy": 2.5
            },
            {
              "name": "諸収入",
              "v": 1.53879,
              "prevV": 1.69586,
              "yoy": -9.3
            },
            {
              "name": "使用料及び手数料",
              "v": 1.051,
              "prevV": 1.03659,
              "yoy": 1.4
            },
            {
              "name": "地方譲与税",
              "v": 1.01224,
              "prevV": 1.0478,
              "yoy": -3.4
            },
            {
              "name": "財産収入",
              "v": 0.90147,
              "prevV": 0.72852,
              "yoy": 23.7
            },
            {
              "name": "法人事業税交付金",
              "v": 0.8,
              "prevV": 0.7,
              "yoy": 14.3
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.45,
              "prevV": 0.45,
              "yoy": 0
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 0.35,
              "prevV": 0.11,
              "yoy": 218.2
            },
            {
              "name": "地方特例交付金",
              "v": 0.34,
              "prevV": 0.2,
              "yoy": 70
            },
            {
              "name": "分担金及び負担金",
              "v": 0.26599,
              "prevV": 0.27625,
              "yoy": -3.7
            },
            {
              "name": "配当割交付金",
              "v": 0.25,
              "prevV": 0.16,
              "yoy": 56.3
            },
            {
              "name": "利子割交付金",
              "v": 0.1,
              "prevV": 0.01,
              "yoy": 900
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 0.02,
              "prevV": 0.02,
              "yoy": 0
            },
            {
              "name": "環境性能割交付金",
              "v": 0.005,
              "prevV": 0.07,
              "yoy": -92.9
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "民生費",
          "v": 48.31944,
          "prevV": 41.18204,
          "yoy": 17.3
        },
        {
          "name": "総務費",
          "v": 26.22004,
          "prevV": 27.0206,
          "yoy": -3
        },
        {
          "name": "教育費",
          "v": 19.30958,
          "prevV": 18.1143,
          "yoy": 6.6
        },
        {
          "name": "公債費",
          "v": 17.68039,
          "prevV": 18.33456,
          "yoy": -3.6
        },
        {
          "name": "衛生費",
          "v": 16.868,
          "prevV": 16.05451,
          "yoy": 5.1
        },
        {
          "name": "土木費",
          "v": 11.33118,
          "prevV": 11.28603,
          "yoy": 0.4
        },
        {
          "name": "商工費",
          "v": 7.87669,
          "prevV": 5.66963,
          "yoy": 38.9
        },
        {
          "name": "消防費",
          "v": 7.0564,
          "prevV": 6.81792,
          "yoy": 3.5
        },
        {
          "name": "農林水産業費",
          "v": 1.60036,
          "prevV": 1.61354,
          "yoy": -0.8
        },
        {
          "name": "議会費",
          "v": 1.23792,
          "prevV": 1.23687,
          "yoy": 0.1
        },
        {
          "name": "予備費",
          "v": 0.2,
          "prevV": 0.2,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 富士河口湖町当初予算の概要（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715062541/https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
      "originUrl": "https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
      "sourceLocalUrl": "/sources/fujikawaguchiko-yosansho-r8/R8yosan ga.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 富士河口湖町当初予算の概要（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715062541/https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
          "localUrl": "/sources/fujikawaguchiko-yosansho-r8/R8yosan ga.pdf",
          "source": "www.town.fujikawaguchiko.lg.jp",
          "thumb": "R8yosan ga.pdf ・ sha256 fe5c31f78067c6c7… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "222038": [
    {
      "muniCode": "222038",
      "muniName": "沼津市",
      "prefName": "静岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 185758,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 956,
      "prevTotalOku": 879.6,
      "yoyLabel": "+8.7%",
      "prevBasis": "当初",
      "prevNote": "",
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
    }
  ],
  "231002": [
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 16960.86,
      "prevTotalOku": 16171.87,
      "yoyLabel": "+4.9%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 6900.87526,
          "prevV": 6674.01,
          "yoy": 3.4
        },
        {
          "name": "国庫支出金",
          "v": 3038.79007,
          "prevV": 2950.84431,
          "yoy": 3
        },
        {
          "name": "市債",
          "v": 2169.52,
          "prevV": 2166.06,
          "yoy": 0.2
        },
        {
          "name": "県税交付金",
          "v": 1071.08,
          "prevV": 1035.16,
          "yoy": 3.5
        },
        {
          "name": "繰入金",
          "v": 977.71525,
          "prevV": 779.95962,
          "yoy": 25.4
        },
        {
          "name": "県支出金",
          "v": 977.49617,
          "prevV": 868.00515,
          "yoy": 12.6
        },
        {
          "name": "諸収入",
          "v": 960.22277,
          "prevV": 978.73928,
          "yoy": -1.9
        },
        {
          "name": "使用料及び手数料",
          "v": 401.40236,
          "prevV": 382.54519,
          "yoy": 4.9
        },
        {
          "name": "その他",
          "v": 463.75811999999996,
          "prevV": 336.54645,
          "yoy": null,
          "children": [
            {
              "name": "寄附金",
              "v": 193.22315,
              "prevV": 156.55126,
              "yoy": 23.4
            },
            {
              "name": "地方特例交付金",
              "v": 111.41,
              "prevV": 29.22,
              "yoy": 281.3
            },
            {
              "name": "財産収入",
              "v": 90.85396,
              "prevV": 67.93418,
              "yoy": 33.7
            },
            {
              "name": "地方譲与税",
              "v": 55.241,
              "prevV": 63.781,
              "yoy": -13.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 7,
              "prevV": 7,
              "yoy": 0
            },
            {
              "name": "地方交付税",
              "v": 6,
              "prevV": 12,
              "yoy": -50
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.03,
              "prevV": 0.06,
              "yoy": -50
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
          "name": "健康福祉費",
          "v": 4110.86253,
          "prevV": 3924.23739,
          "yoy": 4.8
        },
        {
          "name": "職員費",
          "v": 3057.65463,
          "prevV": 2928.23822,
          "yoy": 4.4
        },
        {
          "name": "子ども青少年費",
          "v": 2441.48285,
          "prevV": 2316.88441,
          "yoy": 5.4
        },
        {
          "name": "公債費",
          "v": 1400.86798,
          "prevV": 1380.77167,
          "yoy": 1.5
        },
        {
          "name": "教育費",
          "v": 1287.82271,
          "prevV": 1030.99577,
          "yoy": 24.9
        },
        {
          "name": "総務費",
          "v": 1067.33892,
          "prevV": 563.2021,
          "yoy": 89.5
        },
        {
          "name": "緑政土木費",
          "v": 786.92484,
          "prevV": 974.26525,
          "yoy": -19.2
        },
        {
          "name": "経済費",
          "v": 601.548,
          "prevV": 573.82723,
          "yoy": 4.8
        },
        {
          "name": "諸支出金",
          "v": 544.02814,
          "prevV": 545.25557,
          "yoy": -0.2
        },
        {
          "name": "住宅都市費",
          "v": 511.403,
          "prevV": 432.85849,
          "yoy": 18.1
        },
        {
          "name": "観光文化交流費",
          "v": 407.85604,
          "prevV": 349.05011,
          "yoy": 16.8
        },
        {
          "name": "環境費",
          "v": 374.95175,
          "prevV": 555.07502,
          "yoy": -32.5
        },
        {
          "name": "スポーツ市民費",
          "v": 240.89517,
          "prevV": 503.37066,
          "yoy": -52.1
        },
        {
          "name": "消防費",
          "v": 108.02628,
          "prevV": 74.46322,
          "yoy": 45.1
        },
        {
          "name": "議会費",
          "v": 18.19716,
          "prevV": 18.37489,
          "yoy": -1
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 名古屋市一般会計予算に関する説明書（修正後）（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715082734/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r8/ippannmeisaisyuusei.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 名古屋市一般会計予算に関する説明書（修正後）（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715082734/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf",
          "localUrl": "/sources/nagoya-yosansho-r8/ippannmeisaisyuusei.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "ippannmeisaisyuusei.pdf ・ sha256 f1fd669a4bd899d0… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 16171.87,
      "prevTotalOku": 14853,
      "yoyLabel": "+8.9%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 6674.01,
          "prevV": 6276.31,
          "yoy": 6.3
        },
        {
          "name": "国庫支出金",
          "v": 2950.84431,
          "prevV": 2703.91139,
          "yoy": 9.1
        },
        {
          "name": "市債",
          "v": 2166.06,
          "prevV": 1672.33,
          "yoy": 29.5
        },
        {
          "name": "県税交付金",
          "v": 1035.16,
          "prevV": 939.9,
          "yoy": 10.1
        },
        {
          "name": "諸収入",
          "v": 978.73928,
          "prevV": 1001.70013,
          "yoy": -2.3
        },
        {
          "name": "県支出金",
          "v": 868.00515,
          "prevV": 793.98784,
          "yoy": 9.3
        },
        {
          "name": "繰入金",
          "v": 779.95962,
          "prevV": 596.08549,
          "yoy": 30.8
        },
        {
          "name": "使用料及び手数料",
          "v": 382.54519,
          "prevV": 395.68213,
          "yoy": -3.3
        },
        {
          "name": "その他",
          "v": 336.54645,
          "prevV": 473.0930199999999,
          "yoy": null,
          "children": [
            {
              "name": "寄附金",
              "v": 156.55126,
              "prevV": 131.72724,
              "yoy": 18.8
            },
            {
              "name": "財産収入",
              "v": 67.93418,
              "prevV": 75.15477,
              "yoy": -9.6
            },
            {
              "name": "地方譲与税",
              "v": 63.781,
              "prevV": 62.671,
              "yoy": 1.8
            },
            {
              "name": "地方特例交付金",
              "v": 29.22,
              "prevV": 163.45,
              "yoy": -82.1
            },
            {
              "name": "地方交付税",
              "v": 12,
              "prevV": 32,
              "yoy": -62.5
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 7,
              "prevV": 8,
              "yoy": -12.5
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.06,
              "prevV": 0.09,
              "yoy": -33.3
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
          "name": "健康福祉費",
          "v": 3924.23739,
          "prevV": 3808.86929,
          "yoy": 3
        },
        {
          "name": "職員費",
          "v": 2928.23822,
          "prevV": 2852.60359,
          "yoy": 2.7
        },
        {
          "name": "子ども青少年費",
          "v": 2316.88441,
          "prevV": 2000.23254,
          "yoy": 15.8
        },
        {
          "name": "公債費",
          "v": 1380.77167,
          "prevV": 1327.23715,
          "yoy": 4
        },
        {
          "name": "教育費",
          "v": 1030.99577,
          "prevV": 898.23896,
          "yoy": 14.8
        },
        {
          "name": "緑政土木費",
          "v": 974.26525,
          "prevV": 832.65872,
          "yoy": 17
        },
        {
          "name": "経済費",
          "v": 573.82723,
          "prevV": 702.19072,
          "yoy": -18.3
        },
        {
          "name": "総務費",
          "v": 559.04916,
          "prevV": 403.20038,
          "yoy": 38.7
        },
        {
          "name": "環境費",
          "v": 555.07502,
          "prevV": 379.88208,
          "yoy": 46.1
        },
        {
          "name": "諸支出金",
          "v": 545.25557,
          "prevV": 530.16809,
          "yoy": 2.8
        },
        {
          "name": "スポーツ市民費",
          "v": 500.59093,
          "prevV": 444.67278,
          "yoy": 12.6
        },
        {
          "name": "住宅都市費",
          "v": 432.85849,
          "prevV": 436.97856,
          "yoy": -0.9
        },
        {
          "name": "観光文化交流費",
          "v": 355.98278,
          "prevV": 100.36696,
          "yoy": 254.7
        },
        {
          "name": "消防費",
          "v": 74.46322,
          "prevV": 116.1829,
          "yoy": -35.9
        },
        {
          "name": "議会費",
          "v": 18.37489,
          "prevV": 18.51728,
          "yoy": -0.8
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和7年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715101530/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/032/007/r7ippannmeisai.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/032/007/r7ippannmeisai.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r7/r7ippannmeisai.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和7年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715101530/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/032/007/r7ippannmeisai.pdf",
          "localUrl": "/sources/nagoya-yosansho-r7/r7ippannmeisai.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "r7ippannmeisai.pdf ・ sha256 9187146f050e7d78… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R6",
      "fyLabel": "令和6年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 14853,
      "prevTotalOku": 14120.48,
      "yoyLabel": "+5.2%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 6276.31,
          "prevV": 6141.93,
          "yoy": 2.2
        },
        {
          "name": "国庫支出金",
          "v": 2703.91139,
          "prevV": 2608.88308,
          "yoy": 3.6
        },
        {
          "name": "市債",
          "v": 1672.33,
          "prevV": 1158.31,
          "yoy": 44.4
        },
        {
          "name": "諸収入",
          "v": 1001.70013,
          "prevV": 1111.11572,
          "yoy": -9.8
        },
        {
          "name": "県税交付金",
          "v": 939.9,
          "prevV": 963.03,
          "yoy": -2.4
        },
        {
          "name": "県支出金",
          "v": 793.98784,
          "prevV": 933.78766,
          "yoy": -15
        },
        {
          "name": "繰入金",
          "v": 596.08549,
          "prevV": 487.41412,
          "yoy": 22.3
        },
        {
          "name": "使用料及び手数料",
          "v": 395.68213,
          "prevV": 391.47222,
          "yoy": 1.1
        },
        {
          "name": "その他",
          "v": 473.0930199999999,
          "prevV": 324.5371999999999,
          "yoy": null,
          "children": [
            {
              "name": "地方特例交付金",
              "v": 163.45,
              "prevV": 32.28,
              "yoy": 406.4
            },
            {
              "name": "寄附金",
              "v": 131.72724,
              "prevV": 87.83648,
              "yoy": 50
            },
            {
              "name": "財産収入",
              "v": 75.15477,
              "prevV": 72.69971,
              "yoy": 3.4
            },
            {
              "name": "地方譲与税",
              "v": 62.671,
              "prevV": 61.631,
              "yoy": 1.7
            },
            {
              "name": "地方交付税",
              "v": 32,
              "prevV": 62,
              "yoy": -48.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8,
              "prevV": 8,
              "yoy": 0
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.09,
              "prevV": 0.09,
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
          "name": "健康福祉費",
          "v": 3808.86929,
          "prevV": 3961.58215,
          "yoy": -3.9
        },
        {
          "name": "職員費",
          "v": 2852.60359,
          "prevV": 2714.81734,
          "yoy": 5.1
        },
        {
          "name": "子ども青少年費",
          "v": 1950.69088,
          "prevV": 1791.76818,
          "yoy": 8.9
        },
        {
          "name": "公債費",
          "v": 1327.23715,
          "prevV": 1318.13614,
          "yoy": 0.7
        },
        {
          "name": "教育費",
          "v": 947.78062,
          "prevV": 815.39947,
          "yoy": 16.2
        },
        {
          "name": "緑政土木費",
          "v": 832.65872,
          "prevV": 767.28623,
          "yoy": 8.5
        },
        {
          "name": "経済費",
          "v": 702.19072,
          "prevV": 830.56757,
          "yoy": -15.5
        },
        {
          "name": "諸支出金",
          "v": 530.16809,
          "prevV": 551.33623,
          "yoy": -3.8
        },
        {
          "name": "スポーツ市民費",
          "v": 444.67278,
          "prevV": 218.58999,
          "yoy": 103.4
        },
        {
          "name": "住宅都市費",
          "v": 436.97856,
          "prevV": 400.80308,
          "yoy": 9
        },
        {
          "name": "総務費",
          "v": 403.20038,
          "prevV": 220.25161,
          "yoy": 83.1
        },
        {
          "name": "環境費",
          "v": 379.88208,
          "prevV": 307.40712,
          "yoy": 23.6
        },
        {
          "name": "消防費",
          "v": 116.1829,
          "prevV": 106.26987,
          "yoy": 9.3
        },
        {
          "name": "観光文化交流費",
          "v": 100.36696,
          "prevV": 96.67675,
          "yoy": 3.8
        },
        {
          "name": "議会費",
          "v": 18.51728,
          "prevV": 18.58827,
          "yoy": -0.4
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和6年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715101644/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/667/ippanmeisai.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/667/ippanmeisai.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r6/ippanmeisai.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和6年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715101644/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/667/ippanmeisai.pdf",
          "localUrl": "/sources/nagoya-yosansho-r6/ippanmeisai.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "ippanmeisai.pdf ・ sha256 55819a73b4f38629… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R5",
      "fyLabel": "令和5年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 14120.48,
      "prevTotalOku": 13794.09,
      "yoyLabel": "+2.4%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 6141.93,
          "prevV": 6009.85,
          "yoy": 2.2
        },
        {
          "name": "国庫支出金",
          "v": 2608.88308,
          "prevV": 2507.48365,
          "yoy": 4
        },
        {
          "name": "市債",
          "v": 1158.31,
          "prevV": 1230.48,
          "yoy": -5.9
        },
        {
          "name": "諸収入",
          "v": 1111.11572,
          "prevV": 1318.02886,
          "yoy": -15.7
        },
        {
          "name": "県税交付金",
          "v": 963.03,
          "prevV": 889.74,
          "yoy": 8.2
        },
        {
          "name": "県支出金",
          "v": 933.78766,
          "prevV": 763.49629,
          "yoy": 22.3
        },
        {
          "name": "繰入金",
          "v": 487.41412,
          "prevV": 228.48176,
          "yoy": 113.3
        },
        {
          "name": "使用料及び手数料",
          "v": 391.47222,
          "prevV": 400.95756,
          "yoy": -2.4
        },
        {
          "name": "その他",
          "v": 324.5371999999999,
          "prevV": 445.57187999999996,
          "yoy": null,
          "children": [
            {
              "name": "寄附金",
              "v": 87.83648,
              "prevV": 38.36696,
              "yoy": 128.9
            },
            {
              "name": "財産収入",
              "v": 72.69971,
              "prevV": 213.40391,
              "yoy": -65.9
            },
            {
              "name": "地方交付税",
              "v": 62,
              "prevV": 91,
              "yoy": -31.9
            },
            {
              "name": "地方譲与税",
              "v": 61.631,
              "prevV": 61.161,
              "yoy": 0.8
            },
            {
              "name": "地方特例交付金",
              "v": 32.28,
              "prevV": 33.55,
              "yoy": -3.8
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8,
              "prevV": 8,
              "yoy": 0
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.09,
              "prevV": 0.09,
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
          "name": "健康福祉費",
          "v": 3961.58215,
          "prevV": 3598.6598,
          "yoy": 10.1
        },
        {
          "name": "職員費",
          "v": 2714.81734,
          "prevV": 2748.08153,
          "yoy": -1.2
        },
        {
          "name": "子ども青少年費",
          "v": 1791.76818,
          "prevV": 1712.46432,
          "yoy": 4.6
        },
        {
          "name": "公債費",
          "v": 1318.13614,
          "prevV": 1289.09515,
          "yoy": 2.3
        },
        {
          "name": "経済費",
          "v": 830.56757,
          "prevV": 1017.87,
          "yoy": -18.4
        },
        {
          "name": "教育費",
          "v": 815.39947,
          "prevV": 674.03939,
          "yoy": 21
        },
        {
          "name": "緑政土木費",
          "v": 767.28623,
          "prevV": 747.11256,
          "yoy": 2.7
        },
        {
          "name": "諸支出金",
          "v": 551.33623,
          "prevV": 486.55546,
          "yoy": 13.3
        },
        {
          "name": "住宅都市費",
          "v": 400.80308,
          "prevV": 457.14095,
          "yoy": -12.3
        },
        {
          "name": "環境費",
          "v": 307.40712,
          "prevV": 285.46842,
          "yoy": 7.7
        },
        {
          "name": "総務費",
          "v": 220.25161,
          "prevV": 336.06764,
          "yoy": -34.5
        },
        {
          "name": "スポーツ市民費",
          "v": 218.58999,
          "prevV": 193.77188,
          "yoy": 12.8
        },
        {
          "name": "消防費",
          "v": 106.26987,
          "prevV": 73.75443,
          "yoy": 44.1
        },
        {
          "name": "観光文化交流費",
          "v": 96.67675,
          "prevV": 154.18881,
          "yoy": -37.3
        },
        {
          "name": "議会費",
          "v": 18.58827,
          "prevV": 18.81966,
          "yoy": -1.2
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和5年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715101847/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/706/r5.ippanmeisai.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/706/r5.ippanmeisai.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r5/r5.ippanmeisai.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和5年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715101847/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/706/r5.ippanmeisai.pdf",
          "localUrl": "/sources/nagoya-yosansho-r5/r5.ippanmeisai.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "r5.ippanmeisai.pdf ・ sha256 4b836c5f8de44777… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R4",
      "fyLabel": "令和4年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 13794.09,
      "prevTotalOku": 13193.9,
      "yoyLabel": "+4.5%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 6009.85,
          "prevV": 5591.26001,
          "yoy": 7.5
        },
        {
          "name": "国庫支出金",
          "v": 2507.48365,
          "prevV": 2266.48444,
          "yoy": 10.6
        },
        {
          "name": "諸収入",
          "v": 1318.02886,
          "prevV": 1428.74858,
          "yoy": -7.7
        },
        {
          "name": "市債",
          "v": 1230.48,
          "prevV": 1290.65,
          "yoy": -4.7
        },
        {
          "name": "県税交付金",
          "v": 889.74,
          "prevV": 805.12001,
          "yoy": 10.5
        },
        {
          "name": "県支出金",
          "v": 763.49629,
          "prevV": 680.52994,
          "yoy": 12.2
        },
        {
          "name": "使用料及び手数料",
          "v": 400.95756,
          "prevV": 419.45433,
          "yoy": -4.4
        },
        {
          "name": "繰入金",
          "v": 228.48176,
          "prevV": 271.89571,
          "yoy": -16
        },
        {
          "name": "その他",
          "v": 445.57187999999996,
          "prevV": 439.75697999999994,
          "yoy": null,
          "children": [
            {
              "name": "財産収入",
              "v": 213.40391,
              "prevV": 62.06864,
              "yoy": 243.8
            },
            {
              "name": "地方交付税",
              "v": 91,
              "prevV": 89,
              "yoy": 2.2
            },
            {
              "name": "地方譲与税",
              "v": 61.161,
              "prevV": 61.35101,
              "yoy": -0.3
            },
            {
              "name": "寄附金",
              "v": 38.36696,
              "prevV": 6.54732,
              "yoy": 486
            },
            {
              "name": "地方特例交付金",
              "v": 33.55,
              "prevV": 212.7,
              "yoy": -84.2
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8,
              "prevV": 8,
              "yoy": 0
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.09,
              "prevV": 0.09,
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
          "name": "健康福祉費",
          "v": 3598.6598,
          "prevV": 3334.95709,
          "yoy": 7.9
        },
        {
          "name": "職員費",
          "v": 2748.08153,
          "prevV": 2761.25217,
          "yoy": -0.5
        },
        {
          "name": "子ども青少年費",
          "v": 1712.46432,
          "prevV": 1649.79671,
          "yoy": 3.8
        },
        {
          "name": "公債費",
          "v": 1289.09515,
          "prevV": 1301.00425,
          "yoy": -0.9
        },
        {
          "name": "経済費",
          "v": 1017.87,
          "prevV": 1019.87179,
          "yoy": -0.2
        },
        {
          "name": "緑政土木費",
          "v": 747.11256,
          "prevV": 692.61449,
          "yoy": 7.9
        },
        {
          "name": "教育費",
          "v": 674.03939,
          "prevV": 624.87654,
          "yoy": 7.9
        },
        {
          "name": "諸支出金",
          "v": 486.55546,
          "prevV": 483.33788,
          "yoy": 0.7
        },
        {
          "name": "住宅都市費",
          "v": 456.68095,
          "prevV": 409.94256,
          "yoy": 11.4
        },
        {
          "name": "総務費",
          "v": 336.06764,
          "prevV": 168.41072,
          "yoy": 99.6
        },
        {
          "name": "環境費",
          "v": 285.46842,
          "prevV": 267.60073,
          "yoy": 6.7
        },
        {
          "name": "スポーツ市民費",
          "v": 193.77188,
          "prevV": 157.21479,
          "yoy": 23.3
        },
        {
          "name": "観光文化交流費",
          "v": 154.64881,
          "prevV": 245.70991,
          "yoy": -37.1
        },
        {
          "name": "消防費",
          "v": 73.75443,
          "prevV": 57.57495,
          "yoy": 28.1
        },
        {
          "name": "議会費",
          "v": 18.81966,
          "prevV": 18.73542,
          "yoy": 0.4
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和4年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715101951/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/742/r4.ippan.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/742/r4.ippan.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r4/r4.ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和4年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715101951/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/742/r4.ippan.pdf",
          "localUrl": "/sources/nagoya-yosansho-r4/r4.ippan.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "r4.ippan.pdf ・ sha256 c2e1c88c4dc97d78… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R3",
      "fyLabel": "令和3年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 13193.9,
      "prevTotalOku": 12543.8,
      "yoyLabel": "+5.2%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 5591.26001,
          "prevV": 5978.78001,
          "yoy": -6.5
        },
        {
          "name": "国庫支出金",
          "v": 2266.48444,
          "prevV": 2241.95786,
          "yoy": 1.1
        },
        {
          "name": "諸収入",
          "v": 1428.74858,
          "prevV": 1127.05476,
          "yoy": 26.8
        },
        {
          "name": "市債",
          "v": 1290.65,
          "prevV": 819.08,
          "yoy": 57.6
        },
        {
          "name": "県税交付金",
          "v": 805.12001,
          "prevV": 801.742,
          "yoy": 0.4
        },
        {
          "name": "県支出金",
          "v": 680.52994,
          "prevV": 660.45833,
          "yoy": 3
        },
        {
          "name": "使用料及び手数料",
          "v": 419.45433,
          "prevV": 433.97257,
          "yoy": -3.3
        },
        {
          "name": "繰入金",
          "v": 271.89571,
          "prevV": 240.9332,
          "yoy": 12.9
        },
        {
          "name": "その他",
          "v": 439.75697999999994,
          "prevV": 239.82126999999997,
          "yoy": null,
          "children": [
            {
              "name": "地方特例交付金",
              "v": 212.7,
              "prevV": 29,
              "yoy": 633.4
            },
            {
              "name": "地方交付税",
              "v": 89,
              "prevV": 63,
              "yoy": 41.3
            },
            {
              "name": "財産収入",
              "v": 62.06864,
              "prevV": 69.93972,
              "yoy": -11.3
            },
            {
              "name": "地方譲与税",
              "v": 61.35101,
              "prevV": 64.81101,
              "yoy": -5.3
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8,
              "prevV": 8,
              "yoy": 0
            },
            {
              "name": "寄附金",
              "v": 6.54732,
              "prevV": 4.98053,
              "yoy": 31.5
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.09,
              "prevV": 0.09,
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
          "name": "健康福祉費",
          "v": 3334.95709,
          "prevV": 3149.23933,
          "yoy": 5.9
        },
        {
          "name": "職員費",
          "v": 2761.25217,
          "prevV": 2742.64606,
          "yoy": 0.7
        },
        {
          "name": "子ども青少年費",
          "v": 1649.79671,
          "prevV": 1585.89786,
          "yoy": 4
        },
        {
          "name": "公債費",
          "v": 1301.00425,
          "prevV": 1288.09701,
          "yoy": 1
        },
        {
          "name": "経済費",
          "v": 1019.87179,
          "prevV": 750.1323,
          "yoy": 36
        },
        {
          "name": "緑政土木費",
          "v": 692.61449,
          "prevV": 698.13829,
          "yoy": -0.8
        },
        {
          "name": "教育費",
          "v": 624.87654,
          "prevV": 551.50384,
          "yoy": 13.3
        },
        {
          "name": "諸支出金",
          "v": 483.33788,
          "prevV": 537.27939,
          "yoy": -10
        },
        {
          "name": "住宅都市費",
          "v": 409.94256,
          "prevV": 384.39845,
          "yoy": 6.6
        },
        {
          "name": "環境費",
          "v": 267.60073,
          "prevV": 271.1194,
          "yoy": -1.3
        },
        {
          "name": "観光文化交流費",
          "v": 245.70991,
          "prevV": 125.04181,
          "yoy": 96.5
        },
        {
          "name": "総務費",
          "v": 168.41072,
          "prevV": 191.39439,
          "yoy": -12
        },
        {
          "name": "スポーツ市民費",
          "v": 157.21479,
          "prevV": 198.03541,
          "yoy": -20.6
        },
        {
          "name": "消防費",
          "v": 57.57495,
          "prevV": 51.25528,
          "yoy": 12.3
        },
        {
          "name": "議会費",
          "v": 18.73542,
          "prevV": 18.62118,
          "yoy": 0.6
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和3年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715102038/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/783/3ippanmeisai.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/783/3ippanmeisai.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r3/3ippanmeisai.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和3年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715102038/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/783/3ippanmeisai.pdf",
          "localUrl": "/sources/nagoya-yosansho-r3/3ippanmeisai.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "3ippanmeisai.pdf ・ sha256 c2cf0f0e2b1f8357… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "231002",
      "muniName": "名古屋市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R2",
      "fyLabel": "令和2年度 当初予算",
      "population": 2303004,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 12543.8,
      "prevTotalOku": 12498.89,
      "yoyLabel": "+0.4%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 5978.78001,
          "prevV": 5945.02001,
          "yoy": 0.6
        },
        {
          "name": "国庫支出金",
          "v": 2241.95786,
          "prevV": 2126.26245,
          "yoy": 5.4
        },
        {
          "name": "諸収入",
          "v": 1127.05476,
          "prevV": 1206.32692,
          "yoy": -6.6
        },
        {
          "name": "市債",
          "v": 819.08,
          "prevV": 903.86,
          "yoy": -9.4
        },
        {
          "name": "県税交付金",
          "v": 801.742,
          "prevV": 680.9,
          "yoy": 17.7
        },
        {
          "name": "県支出金",
          "v": 660.45833,
          "prevV": 589.981,
          "yoy": 11.9
        },
        {
          "name": "使用料及び手数料",
          "v": 433.97257,
          "prevV": 454.99657,
          "yoy": -4.6
        },
        {
          "name": "繰入金",
          "v": 240.9332,
          "prevV": 217.93969,
          "yoy": 10.6
        },
        {
          "name": "その他",
          "v": 239.82126999999997,
          "prevV": 373.60336,
          "yoy": null,
          "children": [
            {
              "name": "財産収入",
              "v": 69.93972,
              "prevV": 163.02534,
              "yoy": -57.1
            },
            {
              "name": "地方譲与税",
              "v": 64.81101,
              "prevV": 64.54101,
              "yoy": 0.4
            },
            {
              "name": "地方交付税",
              "v": 63,
              "prevV": 68,
              "yoy": -7.4
            },
            {
              "name": "地方特例交付金",
              "v": 29,
              "prevV": 65.9,
              "yoy": -56
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 8,
              "prevV": 9,
              "yoy": -11.1
            },
            {
              "name": "寄附金",
              "v": 4.98053,
              "prevV": 3.057,
              "yoy": 62.9
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.09,
              "prevV": 0.08,
              "yoy": 12.5
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
          "name": "健康福祉費",
          "v": 3378.02343,
          "prevV": 3307.52722,
          "yoy": 2.1
        },
        {
          "name": "教育費",
          "v": 1852.63191,
          "prevV": 1795.01619,
          "yoy": 3.2
        },
        {
          "name": "子ども青少年費",
          "v": 1812.52242,
          "prevV": 1741.50671,
          "yoy": 4.1
        },
        {
          "name": "公債費",
          "v": 1288.09701,
          "prevV": 1291.16312,
          "yoy": -0.2
        },
        {
          "name": "緑政土木費",
          "v": 812.3038,
          "prevV": 741.12146,
          "yoy": 9.6
        },
        {
          "name": "経済費",
          "v": 768.87177,
          "prevV": 830.18447,
          "yoy": -7.4
        },
        {
          "name": "諸支出金",
          "v": 537.27939,
          "prevV": 560.50532,
          "yoy": -4.1
        },
        {
          "name": "住宅都市費",
          "v": 450.99082,
          "prevV": 510.68724,
          "yoy": -11.7
        },
        {
          "name": "総務費",
          "v": 440.16189,
          "prevV": 503.48076,
          "yoy": -12.6
        },
        {
          "name": "環境費",
          "v": 418.78621,
          "prevV": 540.43946,
          "yoy": -22.5
        },
        {
          "name": "スポーツ市民費",
          "v": 330.59744,
          "prevV": 250.63267,
          "yoy": 31.9
        },
        {
          "name": "消防費",
          "v": 289.83965,
          "prevV": 292.61611,
          "yoy": -0.9
        },
        {
          "name": "観光文化交流費",
          "v": 139.63717,
          "prevV": 109.19033,
          "yoy": 27.9
        },
        {
          "name": "議会費",
          "v": 23.05709,
          "prevV": 23.81894,
          "yoy": -3.2
        },
        {
          "name": "予備費",
          "v": 1,
          "prevV": 1,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和2年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
      "sourceUrl": "https://web.archive.org/web/20260715102818/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/830/2ippanmeisai.pdf",
      "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/830/2ippanmeisai.pdf",
      "sourceLocalUrl": "/sources/nagoya-yosansho-r2/2ippanmeisai.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和2年度 名古屋市一般会計予算に関する説明書（歳入歳出予算事項別明細書 総括）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715102818/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/002/830/2ippanmeisai.pdf",
          "localUrl": "/sources/nagoya-yosansho-r2/2ippanmeisai.pdf",
          "source": "www.city.nagoya.jp",
          "thumb": "2ippanmeisai.pdf ・ sha256 d0a992f90fbe4923… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "232076": [
    {
      "muniCode": "232076",
      "muniName": "豊川市",
      "prefName": "愛知県",
      "isPref": false,
      "projects": [
        {
          "name": "特別保育事業",
          "amountOku": 67.91993,
          "kan": "民生費",
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
          "kubun": "新規",
          "prevAmountOku": 0,
          "description": "",
          "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
          "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
        }
      ],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 185900,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 835.5,
      "prevTotalOku": 723.7,
      "yoyLabel": "+15.4%",
      "prevBasis": "当初",
      "prevNote": "",
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
              "name": "国有提供施設等所在市町村助成交付金",
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
    }
  ],
  "271004": [
    {
      "muniCode": "271004",
      "muniName": "大阪市",
      "prefName": "大阪府",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 2778917,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 21882.21198,
      "prevTotalOku": 20309.32348,
      "yoyLabel": "+7.7%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 9105.45774,
          "prevV": 8531.60698,
          "yoy": 6.7
        },
        {
          "name": "国庫支出金",
          "v": 6051.09719,
          "prevV": 5669.25821,
          "yoy": 6.7
        },
        {
          "name": "府支出金",
          "v": 1427.78679,
          "prevV": 1324.95121,
          "yoy": 7.8
        },
        {
          "name": "市債",
          "v": 1351.84,
          "prevV": 1145.985,
          "yoy": 18
        },
        {
          "name": "地方消費税交付金",
          "v": 938.37,
          "prevV": 807.29,
          "yoy": 16.2
        },
        {
          "name": "使用料及手数料",
          "v": 719.40874,
          "prevV": 719.57799,
          "yoy": 0
        },
        {
          "name": "諸収入",
          "v": 641.70871,
          "prevV": 836.27278,
          "yoy": -23.3
        },
        {
          "name": "財産売却代",
          "v": 357.76419,
          "prevV": 58.40262,
          "yoy": 512.6
        },
        {
          "name": "その他",
          "v": 1288.7786199999996,
          "prevV": 1215.9786900000001,
          "yoy": null,
          "children": [
            {
              "name": "財産収入",
              "v": 308.00363,
              "prevV": 259.79595,
              "yoy": 18.6
            },
            {
              "name": "地方交付税",
              "v": 190,
              "prevV": 150,
              "yoy": 26.7
            },
            {
              "name": "法人事業税交付金",
              "v": 181.11,
              "prevV": 170.25,
              "yoy": 6.4
            },
            {
              "name": "繰入金",
              "v": 164.34162,
              "prevV": 262.09687,
              "yoy": -37.3
            },
            {
              "name": "地方特例交付金",
              "v": 101.63,
              "prevV": 28.39624,
              "yoy": 257.9
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 73.71,
              "prevV": 57.61,
              "yoy": 27.9
            },
            {
              "name": "軽油引取税交付金",
              "v": 66.51,
              "prevV": 110.84,
              "yoy": -40
            },
            {
              "name": "配当割交付金",
              "v": 61.08,
              "prevV": 39.24,
              "yoy": 55.7
            },
            {
              "name": "地方譲与税",
              "v": 59.09,
              "prevV": 61.66,
              "yoy": -4.2
            },
            {
              "name": "寄附金",
              "v": 51.85034,
              "prevV": 24.15209,
              "yoy": 114.7
            },
            {
              "name": "利子割交付金",
              "v": 11.76,
              "prevV": 8.48,
              "yoy": 38.7
            },
            {
              "name": "分担金及負担金",
              "v": 8.23302,
              "prevV": 8.83752,
              "yoy": -6.8
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.51,
              "prevV": 6.1,
              "yoy": -9.7
            },
            {
              "name": "分離課税所得割交付金",
              "v": 5.08,
              "prevV": 5.08,
              "yoy": 0
            },
            {
              "name": "環境性能割交付金",
              "v": 0.87,
              "prevV": 23.44,
              "yoy": -96.3
            },
            {
              "name": "繰越金",
              "v": 0.00001,
              "prevV": 0.00001,
              "yoy": 0
            },
            {
              "name": "（自動車取得税交付金）",
              "v": 0,
              "prevV": 0.00001,
              "yoy": -100
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "福祉費",
          "v": 6551.45236,
          "prevV": 5841.04002,
          "yoy": 12.2
        },
        {
          "name": "こども青少年費",
          "v": 3196.4595,
          "prevV": 3118.19137,
          "yoy": 2.5
        },
        {
          "name": "教育費",
          "v": 2512.35613,
          "prevV": 2316.37786,
          "yoy": 8.5
        },
        {
          "name": "総務費",
          "v": 1529.00177,
          "prevV": 1550.02864,
          "yoy": -1.4
        },
        {
          "name": "土木費",
          "v": 1508.68131,
          "prevV": 1237.89017,
          "yoy": 21.9
        },
        {
          "name": "公債費",
          "v": 1488.77907,
          "prevV": 1467.29077,
          "yoy": 1.5
        },
        {
          "name": "特別会計繰出金",
          "v": 1373.02751,
          "prevV": 1331.2333,
          "yoy": 3.1
        },
        {
          "name": "健康費",
          "v": 856.89267,
          "prevV": 825.75324,
          "yoy": 3.8
        },
        {
          "name": "住宅費",
          "v": 737.5748,
          "prevV": 641.84577,
          "yoy": 14.9
        },
        {
          "name": "経済戦略費",
          "v": 637.48632,
          "prevV": 565.70969,
          "yoy": 12.7
        },
        {
          "name": "環境費",
          "v": 481.99983,
          "prevV": 443.27681,
          "yoy": 8.7
        },
        {
          "name": "消防費",
          "v": 458.74751,
          "prevV": 425.94469,
          "yoy": 7.7
        },
        {
          "name": "港湾費",
          "v": 252.51078,
          "prevV": 249.97229,
          "yoy": 1
        },
        {
          "name": "大学費",
          "v": 250.48128,
          "prevV": 248.31618,
          "yoy": 0.9
        },
        {
          "name": "議会費",
          "v": 26.76114,
          "prevV": 26.45268,
          "yoy": 1.2
        },
        {
          "name": "予備費",
          "v": 20,
          "prevV": 20,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 大阪市一般会計予算書（議案第60号・款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715144902/https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
      "originUrl": "https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
      "sourceLocalUrl": "/sources/osaka-yosansho-r8/2026gian60.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 大阪市一般会計予算書（議案第60号・款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715144902/https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
          "localUrl": "/sources/osaka-yosansho-r8/2026gian60.pdf",
          "source": "www.city.osaka.lg.jp",
          "thumb": "2026gian60.pdf ・ sha256 56c244de872c623d… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "272191": [
    {
      "muniCode": "272191",
      "muniName": "和泉市",
      "prefName": "大阪府",
      "isPref": false,
      "projects": [
        {
          "name": "（仮称）富秋学園整備事業",
          "amountOku": 59.12885,
          "kan": null,
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
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
          "shisaku": "",
          "kubun": "新規",
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
          "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
        }
      ],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 182481,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 904,
      "prevTotalOku": 832,
      "yoyLabel": "+8.7%",
      "prevBasis": "当初",
      "prevNote": "",
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
    }
  ],
  "352039": [
    {
      "muniCode": "352039",
      "muniName": "山口市",
      "prefName": "山口県",
      "isPref": false,
      "projects": [
        {
          "name": "障害福祉サービス給付事業",
          "amountOku": 41.67303,
          "kan": null,
          "shisaku": "障がい者福祉の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.119",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=119"
        },
        {
          "name": "児童手当支給費",
          "amountOku": 37.23126,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
        },
        {
          "name": "私立保育園運営費",
          "amountOku": 31.7219,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
        },
        {
          "name": "介護保険特別会計繰出金",
          "amountOku": 27.60644,
          "kan": null,
          "shisaku": "社会保障制度の適正な運用",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
        },
        {
          "name": "生活保護扶助費",
          "amountOku": 26.158,
          "kan": null,
          "shisaku": "社会保障制度の適正な運用",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
        },
        {
          "name": "山口県後期高齢者医療広域",
          "amountOku": 24.435,
          "kan": null,
          "shisaku": "社会保障制度の適正な運用",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
        },
        {
          "name": "認定こども園運営費",
          "amountOku": 21.94603,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
        },
        {
          "name": "公共下水道会計負担金",
          "amountOku": 19.17812,
          "kan": null,
          "shisaku": "適切な汚水処理による水環境の保全",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.135",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=135"
        },
        {
          "name": "新本庁舎整備事業費",
          "amountOku": 16.28043,
          "kan": null,
          "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
        },
        {
          "name": "国民健康保険特別会計繰出",
          "amountOku": 14.69093,
          "kan": null,
          "shisaku": "社会保障制度の適正な運用",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
        },
        {
          "name": "障害児施設サービス給付事",
          "amountOku": 13.60374,
          "kan": null,
          "shisaku": "障がい者福祉の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
        },
        {
          "name": "清掃工場管理運営費",
          "amountOku": 11.44752,
          "kan": null,
          "shisaku": "自然環境の保全と衛生的な生活環境の維持",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
        },
        {
          "name": "予防接種事業費",
          "amountOku": 11.28782,
          "kan": null,
          "shisaku": "健康づくりの推進と地域医療の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.117",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=117"
        },
        {
          "name": "学校給食運営費",
          "amountOku": 11.04549,
          "kan": null,
          "shisaku": "教育環境の充実と整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
        },
        {
          "name": "平川地域交流センター建設",
          "amountOku": 10.53446,
          "kan": null,
          "shisaku": "安心して暮らせる日常生活圏の形成",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.152",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=152"
        },
        {
          "name": "放課後児童クラブ運営費",
          "amountOku": 10.09233,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
        },
        {
          "name": "後期高齢者医療特別会計繰",
          "amountOku": 9.75662,
          "kan": null,
          "shisaku": "社会保障制度の適正な運用",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
        },
        {
          "name": "仁保の郷整備事業費",
          "amountOku": 9.22714,
          "kan": null,
          "shisaku": "農林業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
        },
        {
          "name": "こども医療費助成事業費",
          "amountOku": 8.21539,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
        },
        {
          "name": "消防指令センター共同整備",
          "amountOku": 8.10306,
          "kan": null,
          "shisaku": "消防・救急体制の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.133",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=133"
        },
        {
          "name": "重度心身障害者医療費助成",
          "amountOku": 7.62394,
          "kan": null,
          "shisaku": "障がい者福祉の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
        },
        {
          "name": "中小企業等金融対策事業費",
          "amountOku": 7.26042,
          "kan": null,
          "shisaku": "商工業・サービス業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
        },
        {
          "name": "生活道路改良事業費",
          "amountOku": 7.18947,
          "kan": null,
          "shisaku": "快適な道路交通網の構築",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
        },
        {
          "name": "児童扶養手当等支給事業費",
          "amountOku": 7.10087,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
        },
        {
          "name": "市立保育園管理運営費",
          "amountOku": 7.00427,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
        },
        {
          "name": "小学校施設長寿命化事業費",
          "amountOku": 5.6949,
          "kan": null,
          "shisaku": "教育環境の充実と整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
        },
        {
          "name": "海岸保全施設整備事業費",
          "amountOku": 5.09373,
          "kan": null,
          "shisaku": "防災対策の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.130",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=130"
        },
        {
          "name": "立地等奨励金",
          "amountOku": 4.9893,
          "kan": null,
          "shisaku": "商工業・サービス業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
        },
        {
          "name": "養護老人ホーム措置費",
          "amountOku": 4.42505,
          "kan": null,
          "shisaku": "高齢者福祉の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.118",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=118"
        },
        {
          "name": "乳幼児医療費助成事業費",
          "amountOku": 4.42392,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
        },
        {
          "name": "山口市中心市街地周辺地区",
          "amountOku": 4.182,
          "kan": null,
          "shisaku": "コンパクトで暮らしやすいまちづくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.139",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=139"
        },
        {
          "name": "中学校ＩＣＴ教育推進事業費",
          "amountOku": 3.87521,
          "kan": null,
          "shisaku": "教育環境の充実と整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.125",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=125"
        },
        {
          "name": "小学校管理運営費",
          "amountOku": 3.85139,
          "kan": null,
          "shisaku": "教育環境の充実と整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
        },
        {
          "name": "庁舎維持管理費",
          "amountOku": 3.78484,
          "kan": null,
          "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
        },
        {
          "name": "多面的機能支払交付金事業",
          "amountOku": 3.70108,
          "kan": null,
          "shisaku": "農林業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.148",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=148"
        },
        {
          "name": "地域型保育運営費",
          "amountOku": 3.62061,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
        },
        {
          "name": "橋りょう長寿命化対策事業",
          "amountOku": 3.57079,
          "kan": null,
          "shisaku": "快適な道路交通網の構築",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
        },
        {
          "name": "ＷＡＮ関連事業費",
          "amountOku": 3.55156,
          "kan": null,
          "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
        },
        {
          "name": "常備消防自動車整備事業費",
          "amountOku": 3.53237,
          "kan": null,
          "shisaku": "消防・救急体制の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.133",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=133"
        },
        {
          "name": "産業交流拠点施設管理運営",
          "amountOku": 3.37802,
          "kan": null,
          "shisaku": "商工業・サービス業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
        },
        {
          "name": "鋳銭司第二団地整備事業特",
          "amountOku": 3.37079,
          "kan": null,
          "shisaku": "商工業・サービス業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
        },
        {
          "name": "ごみ収集運搬費",
          "amountOku": 3.3271,
          "kan": null,
          "shisaku": "自然環境の保全と衛生的な生活環境の維持",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
        },
        {
          "name": "電算システム開発事業費",
          "amountOku": 3.30018,
          "kan": null,
          "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
        },
        {
          "name": "中学校施設長寿命化事業費",
          "amountOku": 3.23948,
          "kan": null,
          "shisaku": "教育環境の充実と整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
        },
        {
          "name": "地域包括支援センター運営",
          "amountOku": 3.20311,
          "kan": null,
          "shisaku": "高齢者福祉の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.118",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=118"
        },
        {
          "name": "ふるさと産品営業推進事業",
          "amountOku": 3.1231,
          "kan": null,
          "shisaku": "商工業・サービス業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
        },
        {
          "name": "私立保育園特別保育事業費",
          "amountOku": 2.97504,
          "kan": null,
          "shisaku": "子ども・子育て支援の充実と環境整備",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
        },
        {
          "name": "山口情報芸術センター管理",
          "amountOku": 2.89757,
          "kan": null,
          "shisaku": "文化・芸術・歴史の継承と創造",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.126",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=126"
        },
        {
          "name": "中間処理センター管理費",
          "amountOku": 2.89445,
          "kan": null,
          "shisaku": "自然環境の保全と衛生的な生活環境の維持",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
        },
        {
          "name": "市議会議員報酬等",
          "amountOku": 2.7358,
          "kan": null,
          "shisaku": "公正、確実な事務の執行",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.157",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=157"
        },
        {
          "name": "社会福祉協議会助成事業費",
          "amountOku": 2.69291,
          "kan": null,
          "shisaku": "地域福祉の充実",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
        },
        {
          "name": "図書館管理運営費",
          "amountOku": 2.58986,
          "kan": null,
          "shisaku": "生涯学習・社会教育の推進",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.125",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=125"
        },
        {
          "name": "農業集落排水事業経営支援",
          "amountOku": 2.58969,
          "kan": null,
          "shisaku": "適切な汚水処理による水環境の保全",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.135",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=135"
        },
        {
          "name": "湯田温泉まちなか整備事業",
          "amountOku": 2.53987,
          "kan": null,
          "shisaku": "コンパクトで暮らしやすいまちづくり",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.138",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=138"
        },
        {
          "name": "県事業負担金",
          "amountOku": 2.5374,
          "kan": null,
          "shisaku": "農林業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.148",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=148"
        },
        {
          "name": "山口情報芸術センター企画",
          "amountOku": 2.49695,
          "kan": null,
          "shisaku": "文化・芸術・歴史の継承と創造",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.126",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=126"
        },
        {
          "name": "中山間地域等直接支払事業",
          "amountOku": 2.46003,
          "kan": null,
          "shisaku": "農林業の振興",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.147",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=147"
        },
        {
          "name": "道路維持補修事業費",
          "amountOku": 2.43057,
          "kan": null,
          "shisaku": "快適な道路交通網の構築",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
        },
        {
          "name": "幹線バス確保維持事業費",
          "amountOku": 2.40117,
          "kan": null,
          "shisaku": "持続可能な公共交通の構築",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.142",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=142"
        },
        {
          "name": "環境センター管理運営費",
          "amountOku": 2.39738,
          "kan": null,
          "shisaku": "自然環境の保全と衛生的な生活環境の維持",
          "kubun": null,
          "prevAmountOku": null,
          "description": "",
          "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
          "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
        }
      ],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 185982,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 969,
      "prevTotalOku": 1092,
      "yoyLabel": "-11.3%",
      "prevBasis": "当初",
      "prevNote": "",
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
  ],
  "401307": [
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 11318.11,
      "prevTotalOku": 11128.3,
      "yoyLabel": "+1.7%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 4263.20009,
          "prevV": 4034.58594,
          "yoy": 5.7
        },
        {
          "name": "国庫支出金",
          "v": 2297.02922,
          "prevV": 2218.0737,
          "yoy": 3.6
        },
        {
          "name": "諸収入",
          "v": 1779.59303,
          "prevV": 1986.43127,
          "yoy": -10.4
        },
        {
          "name": "県支出金",
          "v": 626.97122,
          "prevV": 555.0106,
          "yoy": 13
        },
        {
          "name": "市債",
          "v": 531.02333,
          "prevV": 545.17333,
          "yoy": -2.6
        },
        {
          "name": "地方消費税交付金",
          "v": 495.91,
          "prevV": 460.95,
          "yoy": 7.6
        },
        {
          "name": "地方交付税",
          "v": 435,
          "prevV": 495,
          "yoy": -12.1
        },
        {
          "name": "使用料及び手数料",
          "v": 278.22557,
          "prevV": 278.29492,
          "yoy": 0
        },
        {
          "name": "その他",
          "v": 611.15754,
          "prevV": 554.7802299999998,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 209.02814,
              "prevV": 157.86186,
              "yoy": 32.4
            },
            {
              "name": "地方譲与税",
              "v": 67,
              "prevV": 70.36,
              "yoy": -4.8
            },
            {
              "name": "法人事業税交付金",
              "v": 62.41,
              "prevV": 59.03,
              "yoy": 5.7
            },
            {
              "name": "分担金及び負担金",
              "v": 59.27412,
              "prevV": 80.31011,
              "yoy": -26.2
            },
            {
              "name": "地方特例交付金",
              "v": 50.53,
              "prevV": 18.1,
              "yoy": 179.2
            },
            {
              "name": "財産収入",
              "v": 46.17513,
              "prevV": 45.18928,
              "yoy": 2.2
            },
            {
              "name": "寄附金",
              "v": 43.07015,
              "prevV": 33.32898,
              "yoy": 29.2
            },
            {
              "name": "軽油引取税交付金",
              "v": 25.87,
              "prevV": 50.99,
              "yoy": -49.3
            },
            {
              "name": "配当割交付金",
              "v": 16.66,
              "prevV": 14.42,
              "yoy": 15.5
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 16.62,
              "prevV": 5.68,
              "yoy": 192.6
            },
            {
              "name": "利子割交付金",
              "v": 5.84,
              "prevV": 0.89,
              "yoy": 556.2
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 4.1,
              "prevV": 4.1,
              "yoy": 0
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.57,
              "prevV": 0.56,
              "yoy": 1.8
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.33,
              "prevV": 0.34,
              "yoy": -2.9
            },
            {
              "name": "環境性能割交付金",
              "v": 0.02,
              "prevV": 9.96,
              "yoy": -99.8
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 2634.7688,
          "prevV": 2606.07727,
          "yoy": 1.1
        },
        {
          "name": "こども育成費",
          "v": 1777.30337,
          "prevV": 1681.12263,
          "yoy": 5.7
        },
        {
          "name": "経済観光文化費",
          "v": 1751.46143,
          "prevV": 1993.95812,
          "yoy": -12.2
        },
        {
          "name": "教育費",
          "v": 1653.65489,
          "prevV": 1528.90994,
          "yoy": 8.2
        },
        {
          "name": "公債費",
          "v": 901.55934,
          "prevV": 915.31123,
          "yoy": -1.5
        },
        {
          "name": "総務費",
          "v": 739.21422,
          "prevV": 683.8827,
          "yoy": 8.1
        },
        {
          "name": "土木費",
          "v": 551.22571,
          "prevV": 483.98996,
          "yoy": 13.9
        },
        {
          "name": "都市計画費",
          "v": 523.22153,
          "prevV": 502.34455,
          "yoy": 4.2
        },
        {
          "name": "環境費",
          "v": 357.29937,
          "prevV": 326.79348,
          "yoy": 9.3
        },
        {
          "name": "消防費",
          "v": 208.80466,
          "prevV": 198.08499,
          "yoy": 5.4
        },
        {
          "name": "港湾空港費",
          "v": 101.3497,
          "prevV": 101.6313,
          "yoy": -0.3
        },
        {
          "name": "農林水産業費",
          "v": 95.81807,
          "prevV": 83.6638,
          "yoy": 14.5
        },
        {
          "name": "議会費",
          "v": 18.76555,
          "prevV": 19.13149,
          "yoy": -1.9
        },
        {
          "name": "予備費",
          "v": 3,
          "prevV": 3,
          "yoy": 0
        },
        {
          "name": "諸支出金",
          "v": 0.61336,
          "prevV": 0.34854,
          "yoy": 76
        },
        {
          "name": "災害復旧費",
          "v": 0.05,
          "prevV": 0.05,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715084154/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r8/04_R8_keisuusiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715084154/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r8/04_R8_keisuusiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04_R8_keisuusiryou.pdf ・ sha256 ca0865888b352040… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 11128.3,
      "prevTotalOku": 10825.37,
      "yoyLabel": "+2.8%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 4034.58594,
          "prevV": 3705.52587,
          "yoy": 8.9
        },
        {
          "name": "国庫支出金",
          "v": 2218.0737,
          "prevV": 2106.95427,
          "yoy": 5.3
        },
        {
          "name": "諸収入",
          "v": 1986.43127,
          "prevV": 1989.40163,
          "yoy": -0.1
        },
        {
          "name": "県支出金",
          "v": 555.0106,
          "prevV": 508.49881,
          "yoy": 9.1
        },
        {
          "name": "市債",
          "v": 545.17333,
          "prevV": 600.01333,
          "yoy": -9.1
        },
        {
          "name": "地方交付税",
          "v": 495,
          "prevV": 430,
          "yoy": 15.1
        },
        {
          "name": "地方消費税交付金",
          "v": 460.95,
          "prevV": 436.18,
          "yoy": 5.7
        },
        {
          "name": "使用料及び手数料",
          "v": 278.29492,
          "prevV": 277.67786,
          "yoy": 0.2
        },
        {
          "name": "その他",
          "v": 554.7802399999998,
          "prevV": 771.1182299999998,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 157.86186,
              "prevV": 255.43309,
              "yoy": -38.2
            },
            {
              "name": "分担金及び負担金",
              "v": 80.31011,
              "prevV": 106.18046,
              "yoy": -24.4
            },
            {
              "name": "地方譲与税",
              "v": 70.36,
              "prevV": 67.26,
              "yoy": 4.6
            },
            {
              "name": "法人事業税交付金",
              "v": 59.03,
              "prevV": 54.03,
              "yoy": 9.3
            },
            {
              "name": "軽油引取税交付金",
              "v": 50.99,
              "prevV": 51.27,
              "yoy": -0.5
            },
            {
              "name": "財産収入",
              "v": 45.18928,
              "prevV": 47.45367,
              "yoy": -4.8
            },
            {
              "name": "寄附金",
              "v": 33.32898,
              "prevV": 40.831,
              "yoy": -18.4
            },
            {
              "name": "地方特例交付金",
              "v": 18.1,
              "prevV": 110.38,
              "yoy": -83.6
            },
            {
              "name": "配当割交付金",
              "v": 14.42,
              "prevV": 13.26,
              "yoy": 8.7
            },
            {
              "name": "環境性能割交付金",
              "v": 9.96,
              "prevV": 9.24,
              "yoy": 7.8
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 5.68,
              "prevV": 5.68,
              "yoy": 0
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 4.1,
              "prevV": 4.9,
              "yoy": -16.3
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 0.89,
              "prevV": 0.62,
              "yoy": 43.5
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.56,
              "prevV": 0.56,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.34,
              "prevV": 0.36,
              "yoy": -5.6
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 2606.07727,
          "prevV": 2575.13787,
          "yoy": 1.2
        },
        {
          "name": "経済観光文化費",
          "v": 1993.95812,
          "prevV": 1948.63466,
          "yoy": 2.3
        },
        {
          "name": "こども育成費",
          "v": 1681.12263,
          "prevV": 1511.26013,
          "yoy": 11.2
        },
        {
          "name": "教育費",
          "v": 1528.90994,
          "prevV": 1528.49417,
          "yoy": 0
        },
        {
          "name": "公債費",
          "v": 915.31123,
          "prevV": 927.97648,
          "yoy": -1.4
        },
        {
          "name": "総務費",
          "v": 683.8827,
          "prevV": 655.84143,
          "yoy": 4.3
        },
        {
          "name": "都市計画費",
          "v": 502.34455,
          "prevV": 499.96671,
          "yoy": 0.5
        },
        {
          "name": "土木費",
          "v": 483.98996,
          "prevV": 465.52441,
          "yoy": 4
        },
        {
          "name": "環境費",
          "v": 326.79348,
          "prevV": 323.93973,
          "yoy": 0.9
        },
        {
          "name": "消防費",
          "v": 198.08499,
          "prevV": 164.37602,
          "yoy": 20.5
        },
        {
          "name": "港湾空港費",
          "v": 101.6313,
          "prevV": 108.11544,
          "yoy": -6
        },
        {
          "name": "農林水産業費",
          "v": 83.6638,
          "prevV": 93.23527,
          "yoy": -10.3
        },
        {
          "name": "議会費",
          "v": 19.13149,
          "prevV": 19.02488,
          "yoy": 0.6
        },
        {
          "name": "予備費",
          "v": 3,
          "prevV": 3,
          "yoy": 0
        },
        {
          "name": "諸支出金",
          "v": 0.34854,
          "prevV": 0.7928,
          "yoy": -56
        },
        {
          "name": "災害復旧費",
          "v": 0.05,
          "prevV": 0.05,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和7年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260311021942/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R7_keisuusiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R7_keisuusiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r7/04_R7_keisuusiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和7年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260311021942/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R7_keisuusiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r7/04_R7_keisuusiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04_R7_keisuusiryou.pdf ・ sha256 fa91e4256aee8072… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R6",
      "fyLabel": "令和6年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 10825.37,
      "prevTotalOku": 10497.56,
      "yoyLabel": "+3.1%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3705.52587,
          "prevV": 3655.70928,
          "yoy": 1.4
        },
        {
          "name": "国庫支出金",
          "v": 2106.95427,
          "prevV": 1838.71111,
          "yoy": 14.6
        },
        {
          "name": "諸収入",
          "v": 1989.40163,
          "prevV": 2184.89408,
          "yoy": -8.9
        },
        {
          "name": "市債",
          "v": 600.01333,
          "prevV": 663.60333,
          "yoy": -9.6
        },
        {
          "name": "県支出金",
          "v": 508.49881,
          "prevV": 487.80769,
          "yoy": 4.2
        },
        {
          "name": "地方消費税交付金",
          "v": 436.18,
          "prevV": 429.37,
          "yoy": 1.6
        },
        {
          "name": "地方交付税",
          "v": 430,
          "prevV": 365,
          "yoy": 17.8
        },
        {
          "name": "使用料及び手数料",
          "v": 277.67786,
          "prevV": 263.63722,
          "yoy": 5.3
        },
        {
          "name": "その他",
          "v": 771.1182299999998,
          "prevV": 608.8272899999998,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 255.43309,
              "prevV": 203.13655,
              "yoy": 25.7
            },
            {
              "name": "地方特例交付金",
              "v": 110.38,
              "prevV": 19.19,
              "yoy": 475.2
            },
            {
              "name": "分担金及び負担金",
              "v": 106.18046,
              "prevV": 121.93391,
              "yoy": -12.9
            },
            {
              "name": "地方譲与税",
              "v": 67.26,
              "prevV": 66.68,
              "yoy": 0.9
            },
            {
              "name": "法人事業税交付金",
              "v": 54.03,
              "prevV": 47.85,
              "yoy": 12.9
            },
            {
              "name": "軽油引取税交付金",
              "v": 51.27,
              "prevV": 46.4,
              "yoy": 10.5
            },
            {
              "name": "財産収入",
              "v": 47.45367,
              "prevV": 41.48373,
              "yoy": 14.4
            },
            {
              "name": "寄附金",
              "v": 40.831,
              "prevV": 26.65309,
              "yoy": 53.2
            },
            {
              "name": "配当割交付金",
              "v": 13.26,
              "prevV": 12.56,
              "yoy": 5.6
            },
            {
              "name": "環境性能割交付金",
              "v": 9.24,
              "prevV": 6.19,
              "yoy": 49.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 5.68,
              "prevV": 5.68,
              "yoy": 0
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 4.9,
              "prevV": 5.7,
              "yoy": -14
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 0.62,
              "prevV": 0.76,
              "yoy": -18.4
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.56,
              "prevV": 0.56,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.36,
              "prevV": 0.39,
              "yoy": -7.7
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 2575.13787,
          "prevV": 2335.29087,
          "yoy": 10.3
        },
        {
          "name": "経済観光文化費",
          "v": 1948.63466,
          "prevV": 2090.58434,
          "yoy": -6.8
        },
        {
          "name": "教育費",
          "v": 1528.49417,
          "prevV": 1390.14812,
          "yoy": 10
        },
        {
          "name": "こども育成費",
          "v": 1511.26013,
          "prevV": 1341.89753,
          "yoy": 12.6
        },
        {
          "name": "公債費",
          "v": 927.97648,
          "prevV": 948.01408,
          "yoy": -2.1
        },
        {
          "name": "総務費",
          "v": 655.84143,
          "prevV": 715.46617,
          "yoy": -8.3
        },
        {
          "name": "都市計画費",
          "v": 499.96671,
          "prevV": 476.94863,
          "yoy": 4.8
        },
        {
          "name": "土木費",
          "v": 465.52441,
          "prevV": 451.40088,
          "yoy": 3.1
        },
        {
          "name": "環境費",
          "v": 323.93973,
          "prevV": 337.24979,
          "yoy": -3.9
        },
        {
          "name": "消防費",
          "v": 164.37602,
          "prevV": 172.36027,
          "yoy": -4.6
        },
        {
          "name": "港湾空港費",
          "v": 108.11544,
          "prevV": 99.13249,
          "yoy": 9.1
        },
        {
          "name": "農林水産業費",
          "v": 93.23527,
          "prevV": 95.09659,
          "yoy": -2
        },
        {
          "name": "議会費",
          "v": 19.02488,
          "prevV": 20.06819,
          "yoy": -5.2
        },
        {
          "name": "予備費",
          "v": 3,
          "prevV": 23,
          "yoy": -87
        },
        {
          "name": "諸支出金",
          "v": 0.7928,
          "prevV": 0.85205,
          "yoy": -7
        },
        {
          "name": "災害復旧費",
          "v": 0.05,
          "prevV": 0.05,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和6年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R6_keisuusiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R6_keisuusiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r6/04_R6_keisuusiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和6年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R6_keisuusiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r6/04_R6_keisuusiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04_R6_keisuusiryou.pdf ・ sha256 9e476d37724294f4… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R5",
      "fyLabel": "令和5年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 10497.56,
      "prevTotalOku": 10410.1,
      "yoyLabel": "+0.8%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3655.70928,
          "prevV": 3455.24015,
          "yoy": 5.8
        },
        {
          "name": "諸収入",
          "v": 2184.89408,
          "prevV": 2286.88829,
          "yoy": -4.5
        },
        {
          "name": "国庫支出金",
          "v": 1838.71111,
          "prevV": 1880.78395,
          "yoy": -2.2
        },
        {
          "name": "市債",
          "v": 663.60333,
          "prevV": 698.40333,
          "yoy": -5
        },
        {
          "name": "県支出金",
          "v": 487.80769,
          "prevV": 475.65271,
          "yoy": 2.6
        },
        {
          "name": "地方消費税交付金",
          "v": 429.37,
          "prevV": 395.39,
          "yoy": 8.6
        },
        {
          "name": "地方交付税",
          "v": 365,
          "prevV": 385,
          "yoy": -5.2
        },
        {
          "name": "使用料及び手数料",
          "v": 263.63722,
          "prevV": 264.108,
          "yoy": -0.2
        },
        {
          "name": "その他",
          "v": 608.82729,
          "prevV": 568.6335699999997,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 203.13655,
              "prevV": 123.37813,
              "yoy": 64.6
            },
            {
              "name": "分担金及び負担金",
              "v": 121.93391,
              "prevV": 127.7582,
              "yoy": -4.6
            },
            {
              "name": "地方譲与税",
              "v": 66.68,
              "prevV": 67.37001,
              "yoy": -1
            },
            {
              "name": "法人事業税交付金",
              "v": 47.85,
              "prevV": 57.82,
              "yoy": -17.2
            },
            {
              "name": "軽油引取税交付金",
              "v": 46.4,
              "prevV": 46.95,
              "yoy": -1.2
            },
            {
              "name": "財産収入",
              "v": 41.48373,
              "prevV": 75.83342,
              "yoy": -45.3
            },
            {
              "name": "寄附金",
              "v": 26.65309,
              "prevV": 16.4838,
              "yoy": 61.7
            },
            {
              "name": "地方特例交付金",
              "v": 19.19,
              "prevV": 18.21,
              "yoy": 5.4
            },
            {
              "name": "配当割交付金",
              "v": 12.56,
              "prevV": 9.78,
              "yoy": 28.4
            },
            {
              "name": "環境性能割交付金",
              "v": 6.19,
              "prevV": 7.78,
              "yoy": -20.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.7,
              "prevV": 5.9,
              "yoy": -3.4
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 5.68,
              "prevV": 5.68,
              "yoy": 0
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 0.76,
              "prevV": 1.35,
              "yoy": -43.7
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.56,
              "prevV": 0.31,
              "yoy": 80.6
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.39,
              "prevV": 0.37,
              "yoy": 5.4
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 2335.29087,
          "prevV": 2377.63176,
          "yoy": -1.8
        },
        {
          "name": "経済観光文化費",
          "v": 2090.58434,
          "prevV": 2154.82146,
          "yoy": -3
        },
        {
          "name": "教育費",
          "v": 1390.14812,
          "prevV": 1359.46268,
          "yoy": 2.3
        },
        {
          "name": "こども育成費",
          "v": 1341.89753,
          "prevV": 1304.36256,
          "yoy": 2.9
        },
        {
          "name": "公債費",
          "v": 948.01408,
          "prevV": 1019.72487,
          "yoy": -7
        },
        {
          "name": "総務費",
          "v": 715.46617,
          "prevV": 594.46555,
          "yoy": 20.4
        },
        {
          "name": "都市計画費",
          "v": 476.94863,
          "prevV": 494.64245,
          "yoy": -3.6
        },
        {
          "name": "土木費",
          "v": 451.40088,
          "prevV": 412.20505,
          "yoy": 9.5
        },
        {
          "name": "環境費",
          "v": 337.24979,
          "prevV": 309.17601,
          "yoy": 9.1
        },
        {
          "name": "消防費",
          "v": 172.36027,
          "prevV": 164.1676,
          "yoy": 5
        },
        {
          "name": "港湾空港費",
          "v": 99.13249,
          "prevV": 79.46797,
          "yoy": 24.7
        },
        {
          "name": "農林水産業費",
          "v": 95.09659,
          "prevV": 93.14213,
          "yoy": 2.1
        },
        {
          "name": "予備費",
          "v": 23,
          "prevV": 23,
          "yoy": 0
        },
        {
          "name": "議会費",
          "v": 20.06819,
          "prevV": 18.75682,
          "yoy": 7
        },
        {
          "name": "諸支出金",
          "v": 0.85205,
          "prevV": 0.98723,
          "yoy": -13.7
        },
        {
          "name": "災害復旧費",
          "v": 0.05,
          "prevV": 4.08586,
          "yoy": -98.8
        }
      ],
      "sourceTitle": "令和5年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715103017/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R5_keisuusiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R5_keisuusiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r5/04_R5_keisuusiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和5年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715103017/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R5_keisuusiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r5/04_R5_keisuusiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04_R5_keisuusiryou.pdf ・ sha256 13211dae8a31eda4… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R4",
      "fyLabel": "令和4年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 10410.1,
      "prevTotalOku": 10545.44,
      "yoyLabel": "-1.3%",
      "prevBasis": "当初",
      "prevNote": "令和4年度に環境局の所管する事業の一部が、保健医療局に移管されることに伴い、当該事業にかかる令和3年度予算",
      "revenue": [
        {
          "name": "市税",
          "v": 3455.24015,
          "prevV": 3165.7921,
          "yoy": 9.1
        },
        {
          "name": "諸収入",
          "v": 2286.88829,
          "prevV": 2759.74172,
          "yoy": -17.1
        },
        {
          "name": "国庫支出金",
          "v": 1880.78395,
          "prevV": 1683.489,
          "yoy": 11.7
        },
        {
          "name": "市債",
          "v": 698.40333,
          "prevV": 921.01333,
          "yoy": -24.2
        },
        {
          "name": "県支出金",
          "v": 475.65271,
          "prevV": 457.18665,
          "yoy": 4
        },
        {
          "name": "地方消費税交付金",
          "v": 395.39,
          "prevV": 364.9,
          "yoy": 8.4
        },
        {
          "name": "地方交付税",
          "v": 385,
          "prevV": 315,
          "yoy": 22.2
        },
        {
          "name": "使用料及び手数料",
          "v": 264.108,
          "prevV": 261.88714,
          "yoy": 0.8
        },
        {
          "name": "その他",
          "v": 568.6335699999997,
          "prevV": 616.4300599999998,
          "yoy": null,
          "children": [
            {
              "name": "分担金及び負担金",
              "v": 127.7582,
              "prevV": 123.72697,
              "yoy": 3.3
            },
            {
              "name": "繰入金",
              "v": 123.37813,
              "prevV": 195.88363,
              "yoy": -37
            },
            {
              "name": "財産収入",
              "v": 75.83342,
              "prevV": 66.1245,
              "yoy": 14.7
            },
            {
              "name": "地方譲与税",
              "v": 67.37001,
              "prevV": 70.51001,
              "yoy": -4.5
            },
            {
              "name": "法人事業税交付金",
              "v": 57.82,
              "prevV": 43.82,
              "yoy": 31.9
            },
            {
              "name": "軽油引取税交付金",
              "v": 46.95,
              "prevV": 47.59,
              "yoy": -1.3
            },
            {
              "name": "地方特例交付金",
              "v": 18.21,
              "prevV": 32.15,
              "yoy": -43.4
            },
            {
              "name": "寄附金",
              "v": 16.4838,
              "prevV": 4.24494,
              "yoy": 288.3
            },
            {
              "name": "配当割交付金",
              "v": 9.78,
              "prevV": 8.41,
              "yoy": 16.3
            },
            {
              "name": "環境性能割交付金",
              "v": 7.78,
              "prevV": 5.65,
              "yoy": 37.7
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.9,
              "prevV": 5.3,
              "yoy": 11.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 5.68,
              "prevV": 7.23,
              "yoy": -21.4
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 1.35,
              "prevV": 1.53,
              "yoy": -11.8
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.37,
              "prevV": 0.33,
              "yoy": 12.1
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.31,
              "prevV": 0.27,
              "yoy": 14.8
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 2377.63176,
          "prevV": 2167.77711,
          "yoy": 9.7
        },
        {
          "name": "経済観光文化費",
          "v": 2154.82146,
          "prevV": 2696.3401,
          "yoy": -20.1
        },
        {
          "name": "教育費",
          "v": 1359.46268,
          "prevV": 1334.47622,
          "yoy": 1.9
        },
        {
          "name": "こども育成費",
          "v": 1304.36256,
          "prevV": 1247.9888,
          "yoy": 4.5
        },
        {
          "name": "公債費",
          "v": 1019.72487,
          "prevV": 973.34042,
          "yoy": 4.8
        },
        {
          "name": "総務費",
          "v": 594.46555,
          "prevV": 649.03079,
          "yoy": -8.4
        },
        {
          "name": "都市計画費",
          "v": 494.64245,
          "prevV": 490.79485,
          "yoy": 0.8
        },
        {
          "name": "土木費",
          "v": 412.20505,
          "prevV": 359.62343,
          "yoy": 14.6
        },
        {
          "name": "環境費",
          "v": 309.17601,
          "prevV": 262.10695,
          "yoy": 18
        },
        {
          "name": "消防費",
          "v": 164.1676,
          "prevV": 141.8236,
          "yoy": 15.8
        },
        {
          "name": "農林水産業費",
          "v": 93.14213,
          "prevV": 79.96399,
          "yoy": 16.5
        },
        {
          "name": "港湾空港費",
          "v": 79.46797,
          "prevV": 79.42392,
          "yoy": 0.1
        },
        {
          "name": "予備費",
          "v": 23,
          "prevV": 23,
          "yoy": 0
        },
        {
          "name": "議会費",
          "v": 18.75682,
          "prevV": 18.64523,
          "yoy": 0.6
        },
        {
          "name": "災害復旧費",
          "v": 4.08586,
          "prevV": 1.55,
          "yoy": 163.6
        },
        {
          "name": "諸支出金",
          "v": 0.98723,
          "prevV": 19.55459,
          "yoy": -95
        }
      ],
      "sourceTitle": "令和4年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20250326113420/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R4_keisuusiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R4_keisuusiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r4/04_R4_keisuusiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和4年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20250326113420/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R4_keisuusiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r4/04_R4_keisuusiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04_R4_keisuusiryou.pdf ・ sha256 e1252572fff19865… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R3",
      "fyLabel": "令和3年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 10545.44,
      "prevTotalOku": 8874.58,
      "yoyLabel": "+18.8%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3165.7921,
          "prevV": 3397.26639,
          "yoy": -6.8
        },
        {
          "name": "諸収入",
          "v": 2759.74172,
          "prevV": 1020.01314,
          "yoy": 170.6
        },
        {
          "name": "国庫支出金",
          "v": 1683.489,
          "prevV": 1716.52051,
          "yoy": -1.9
        },
        {
          "name": "市債",
          "v": 921.01333,
          "prevV": 774.62167,
          "yoy": 18.9
        },
        {
          "name": "県支出金",
          "v": 457.18665,
          "prevV": 409.16579,
          "yoy": 11.7
        },
        {
          "name": "地方消費税交付金",
          "v": 364.9,
          "prevV": 374.2,
          "yoy": -2.5
        },
        {
          "name": "地方交付税",
          "v": 315,
          "prevV": 310,
          "yoy": 1.6
        },
        {
          "name": "使用料及び手数料",
          "v": 261.88714,
          "prevV": 267.75648,
          "yoy": -2.2
        },
        {
          "name": "その他",
          "v": 616.4300599999999,
          "prevV": 605.03602,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 195.88363,
              "prevV": 229.86938,
              "yoy": -14.8
            },
            {
              "name": "分担金及び負担金",
              "v": 123.72697,
              "prevV": 128.71076,
              "yoy": -3.9
            },
            {
              "name": "地方譲与税",
              "v": 70.51001,
              "prevV": 66.33001,
              "yoy": 6.3
            },
            {
              "name": "財産収入",
              "v": 66.1245,
              "prevV": 39.5863,
              "yoy": 67
            },
            {
              "name": "軽油引取税交付金",
              "v": 47.59,
              "prevV": 48.81,
              "yoy": -2.5
            },
            {
              "name": "法人事業税交付金",
              "v": 43.82,
              "prevV": 40.99,
              "yoy": 6.9
            },
            {
              "name": "地方特例交付金",
              "v": 32.15,
              "prevV": 14.63,
              "yoy": 119.8
            },
            {
              "name": "配当割交付金",
              "v": 8.41,
              "prevV": 8.88,
              "yoy": -5.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 7.23,
              "prevV": 3.93,
              "yoy": 84
            },
            {
              "name": "環境性能割交付金",
              "v": 5.65,
              "prevV": 6.86,
              "yoy": -17.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.3,
              "prevV": 5.7,
              "yoy": -7
            },
            {
              "name": "寄附金",
              "v": 4.24494,
              "prevV": 4.43956,
              "yoy": -4.4
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 1.53,
              "prevV": 1.99,
              "yoy": -23.1
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.33,
              "prevV": 0.36,
              "yoy": -8.3
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.27,
              "prevV": 0.29,
              "yoy": -6.9
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 0.00001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "経済観光文化費",
          "v": 2696.3401,
          "prevV": 900.54907,
          "yoy": 199.4
        },
        {
          "name": "保健福祉費",
          "v": 2162.75672,
          "prevV": 2127.65391,
          "yoy": 1.6
        },
        {
          "name": "教育費",
          "v": 1334.47622,
          "prevV": 1322.49729,
          "yoy": 0.9
        },
        {
          "name": "こども育成費",
          "v": 1247.9888,
          "prevV": 1300.54829,
          "yoy": -4
        },
        {
          "name": "公債費",
          "v": 973.34042,
          "prevV": 980.2448,
          "yoy": -0.7
        },
        {
          "name": "総務費",
          "v": 649.03079,
          "prevV": 581.45216,
          "yoy": 11.6
        },
        {
          "name": "都市計画費",
          "v": 490.79485,
          "prevV": 536.22056,
          "yoy": -8.5
        },
        {
          "name": "土木費",
          "v": 359.62343,
          "prevV": 417.77288,
          "yoy": -13.9
        },
        {
          "name": "環境費",
          "v": 267.12734,
          "prevV": 330.5295,
          "yoy": -19.2
        },
        {
          "name": "消防費",
          "v": 141.8236,
          "prevV": 147.24568,
          "yoy": -3.7
        },
        {
          "name": "農林水産業費",
          "v": 79.96399,
          "prevV": 80.77365,
          "yoy": -1
        },
        {
          "name": "港湾空港費",
          "v": 79.42392,
          "prevV": 126.65767,
          "yoy": -37.3
        },
        {
          "name": "予備費",
          "v": 23,
          "prevV": 3,
          "yoy": 666.7
        },
        {
          "name": "諸支出金",
          "v": 19.55459,
          "prevV": 0.44078,
          "yoy": 4336.4
        },
        {
          "name": "議会費",
          "v": 18.64523,
          "prevV": 18.94376,
          "yoy": -1.6
        },
        {
          "name": "災害復旧費",
          "v": 1.55,
          "prevV": 0.05,
          "yoy": 3000
        }
      ],
      "sourceTitle": "令和3年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715103133/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R3keisuusiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R3keisuusiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r3/04.R3keisuusiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和3年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715103133/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R3keisuusiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r3/04.R3keisuusiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04.R3keisuusiryou.pdf ・ sha256 ead53aad96f9c1c8… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "401307",
      "muniName": "福岡市",
      "prefName": "福岡県",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R2",
      "fyLabel": "令和2年度 当初予算",
      "population": 1608140,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 8874.58,
      "prevTotalOku": 8666.4,
      "yoyLabel": "+2.4%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3397.26639,
          "prevV": 3358.36198,
          "yoy": 1.2
        },
        {
          "name": "国庫支出金",
          "v": 1716.52051,
          "prevV": 1665.86604,
          "yoy": 3
        },
        {
          "name": "諸収入",
          "v": 1020.01314,
          "prevV": 1055.95796,
          "yoy": -3.4
        },
        {
          "name": "市債",
          "v": 774.62167,
          "prevV": 761.96167,
          "yoy": 1.7
        },
        {
          "name": "県支出金",
          "v": 409.16579,
          "prevV": 374.27068,
          "yoy": 9.3
        },
        {
          "name": "地方消費税交付金",
          "v": 374.2,
          "prevV": 284.49,
          "yoy": 31.5
        },
        {
          "name": "地方交付税",
          "v": 310,
          "prevV": 355,
          "yoy": -12.7
        },
        {
          "name": "使用料及び手数料",
          "v": 267.75648,
          "prevV": 266.28709,
          "yoy": 0.6
        },
        {
          "name": "その他",
          "v": 605.03602,
          "prevV": 544.20458,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 229.86938,
              "prevV": 179.28117,
              "yoy": 28.2
            },
            {
              "name": "分担金及び負担金",
              "v": 128.71076,
              "prevV": 144.41629,
              "yoy": -10.9
            },
            {
              "name": "地方譲与税",
              "v": 66.33001,
              "prevV": 63.27001,
              "yoy": 4.8
            },
            {
              "name": "軽油引取税交付金",
              "v": 48.81,
              "prevV": 49.5,
              "yoy": -1.4
            },
            {
              "name": "法人事業税交付金",
              "v": 40.99,
              "prevV": 0,
              "yoy": null
            },
            {
              "name": "財産収入",
              "v": 39.5863,
              "prevV": 36.62958,
              "yoy": 8.1
            },
            {
              "name": "地方特例交付金",
              "v": 14.63,
              "prevV": 27.43416,
              "yoy": -46.7
            },
            {
              "name": "配当割交付金",
              "v": 8.88,
              "prevV": 9.89,
              "yoy": -10.2
            },
            {
              "name": "環境性能割交付金",
              "v": 6.86,
              "prevV": 2.9,
              "yoy": 136.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.7,
              "prevV": 6.6,
              "yoy": -13.6
            },
            {
              "name": "寄附金",
              "v": 4.43956,
              "prevV": 3.43337,
              "yoy": 29.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 3.93,
              "prevV": 7.08,
              "yoy": -44.5
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.66,
              "prevV": 2.66,
              "yoy": 0
            },
            {
              "name": "利子割交付金",
              "v": 1.99,
              "prevV": 3.33,
              "yoy": -40.2
            },
            {
              "name": "繰越金",
              "v": 1,
              "prevV": 1,
              "yoy": 0
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.36,
              "prevV": 0.35,
              "yoy": 2.9
            },
            {
              "name": "国有提供施設等所在市助成交付金",
              "v": 0.29,
              "prevV": 0.3,
              "yoy": -3.3
            },
            {
              "name": "自動車取得税交付金",
              "v": 0.00001,
              "prevV": 6.13,
              "yoy": -100
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 2127.65391,
          "prevV": 2083.71314,
          "yoy": 2.1
        },
        {
          "name": "教育費",
          "v": 1322.49729,
          "prevV": 1226.60088,
          "yoy": 7.8
        },
        {
          "name": "こども育成費",
          "v": 1300.54829,
          "prevV": 1243.69539,
          "yoy": 4.6
        },
        {
          "name": "公債費",
          "v": 980.2448,
          "prevV": 1008.80426,
          "yoy": -2.8
        },
        {
          "name": "経済観光文化費",
          "v": 900.54907,
          "prevV": 925.54419,
          "yoy": -2.7
        },
        {
          "name": "総務費",
          "v": 581.45216,
          "prevV": 531.23719,
          "yoy": 9.5
        },
        {
          "name": "都市計画費",
          "v": 536.22056,
          "prevV": 521.38163,
          "yoy": 2.8
        },
        {
          "name": "土木費",
          "v": 417.77288,
          "prevV": 413.84852,
          "yoy": 0.9
        },
        {
          "name": "環境費",
          "v": 330.5295,
          "prevV": 321.59229,
          "yoy": 2.8
        },
        {
          "name": "消防費",
          "v": 147.24568,
          "prevV": 150.30444,
          "yoy": -2
        },
        {
          "name": "港湾空港費",
          "v": 126.65767,
          "prevV": 127.99419,
          "yoy": -1
        },
        {
          "name": "農林水産業費",
          "v": 80.77365,
          "prevV": 83.29398,
          "yoy": -3
        },
        {
          "name": "議会費",
          "v": 18.94376,
          "prevV": 19.23602,
          "yoy": -1.5
        },
        {
          "name": "予備費",
          "v": 3,
          "prevV": 3.5,
          "yoy": -14.3
        },
        {
          "name": "諸支出金",
          "v": 0.44078,
          "prevV": 0.79706,
          "yoy": -44.7
        },
        {
          "name": "災害復旧費",
          "v": 0.05,
          "prevV": 4.85682,
          "yoy": -99
        }
      ],
      "sourceTitle": "令和2年度 福岡市当初予算案計数資料（款別歳入歳出）",
      "sourceUrl": "https://web.archive.org/web/20260715103216/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R2keisuushiryou.pdf",
      "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R2keisuushiryou.pdf",
      "sourceLocalUrl": "/sources/fukuoka-yosansho-r2/04.R2keisuushiryou.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和2年度 福岡市当初予算案計数資料（款別歳入歳出）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715103216/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R2keisuushiryou.pdf",
          "localUrl": "/sources/fukuoka-yosansho-r2/04.R2keisuushiryou.pdf",
          "source": "www.city.fukuoka.lg.jp",
          "thumb": "04.R2keisuushiryou.pdf ・ sha256 541f5302e40dcadf… ・ 2026-07-15 取得"
        }
      ]
    }
  ],
  "011002": [
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 13185,
      "prevTotalOku": 12666,
      "yoyLabel": "+4.1%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3987,
          "prevV": 3723,
          "yoy": 7.1
        },
        {
          "name": "国庫支出金",
          "v": 3202.62366,
          "prevV": 3077.30121,
          "yoy": 4.1
        },
        {
          "name": "地方交付税",
          "v": 1569,
          "prevV": 1563,
          "yoy": 0.4
        },
        {
          "name": "諸収入",
          "v": 1090.36615,
          "prevV": 1153.18018,
          "yoy": -5.4
        },
        {
          "name": "市債",
          "v": 928.46,
          "prevV": 854.79,
          "yoy": 8.6
        },
        {
          "name": "道支出金",
          "v": 848.64632,
          "prevV": 771.71883,
          "yoy": 10
        },
        {
          "name": "地方消費税交付金",
          "v": 630.32,
          "prevV": 542.48,
          "yoy": 16.2
        },
        {
          "name": "繰入金",
          "v": 286.793,
          "prevV": 312.11043,
          "yoy": -8.1
        },
        {
          "name": "その他",
          "v": 641.7908700000002,
          "prevV": 661.47935,
          "yoy": null,
          "children": [
            {
              "name": "使用料及び手数料",
              "v": 240.61254,
              "prevV": 228.85668,
              "yoy": 5.1
            },
            {
              "name": "寄附金",
              "v": 67.71271,
              "prevV": 57.74549,
              "yoy": 17.3
            },
            {
              "name": "地方特例交付金",
              "v": 64.65,
              "prevV": 23.52,
              "yoy": 174.9
            },
            {
              "name": "財産収入",
              "v": 54.69177,
              "prevV": 104.6858,
              "yoy": -47.8
            },
            {
              "name": "地方譲与税",
              "v": 54.09,
              "prevV": 56.42,
              "yoy": -4.1
            },
            {
              "name": "法人事業税交付金",
              "v": 47.95,
              "prevV": 47.46,
              "yoy": 1
            },
            {
              "name": "軽油引取税交付金",
              "v": 38.18,
              "prevV": 71.08,
              "yoy": -46.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 30.5,
              "prevV": 16.72,
              "yoy": 82.4
            },
            {
              "name": "配当割交付金",
              "v": 12.22,
              "prevV": 9.66,
              "yoy": 26.5
            },
            {
              "name": "分担金及び負担金",
              "v": 11.10375,
              "prevV": 32.70128,
              "yoy": -66
            },
            {
              "name": "利子割交付金",
              "v": 9.71,
              "prevV": 2.51,
              "yoy": 286.9
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 4.97,
              "prevV": 5.24,
              "yoy": -5.2
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.94,
              "prevV": 3.45,
              "yoy": 14.2
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.94,
              "prevV": 0.92,
              "yoy": 2.2
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.52,
              "prevV": 0.51,
              "yoy": 2
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.0001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 5286.47192,
          "prevV": 5124.03993,
          "yoy": 3.2
        },
        {
          "name": "職員費",
          "v": 1749.289,
          "prevV": 1634.306,
          "yoy": 7
        },
        {
          "name": "土木費",
          "v": 1380.13013,
          "prevV": 1272.20481,
          "yoy": 8.5
        },
        {
          "name": "経済費",
          "v": 1130.72228,
          "prevV": 1031.89189,
          "yoy": 9.6
        },
        {
          "name": "公債費",
          "v": 1083.08,
          "prevV": 931.62,
          "yoy": 16.3
        },
        {
          "name": "諸支出金",
          "v": 937.37101,
          "prevV": 895.21573,
          "yoy": 4.7
        },
        {
          "name": "教育費",
          "v": 681.54942,
          "prevV": 726.1276,
          "yoy": -6.1
        },
        {
          "name": "総務費",
          "v": 560.00538,
          "prevV": 566.56234,
          "yoy": -1.2
        },
        {
          "name": "環境費",
          "v": 283.66866,
          "prevV": 345.02631,
          "yoy": -17.8
        },
        {
          "name": "消防費",
          "v": 71.39409,
          "prevV": 117.34843,
          "yoy": -39.2
        },
        {
          "name": "議会費",
          "v": 16.31811,
          "prevV": 16.65696,
          "yoy": -2
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和8年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://web.archive.org/web/20260715083207/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r8/02_r8_yosansetsumeisho_ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和8年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715083207/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r8/02_r8_yosansetsumeisho_ippan.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "02_r8_yosansetsumeisho_ippan.pdf ・ sha256 897c2bb58c50b009… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R7",
      "fyLabel": "令和7年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 12666,
      "prevTotalOku": 12417,
      "yoyLabel": "+2.0%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3723,
          "prevV": 3465,
          "yoy": 7.4
        },
        {
          "name": "国庫支出金",
          "v": 3077.30121,
          "prevV": 2755.09806,
          "yoy": 11.7
        },
        {
          "name": "地方交付税",
          "v": 1563,
          "prevV": 1431,
          "yoy": 9.2
        },
        {
          "name": "諸収入",
          "v": 1153.18018,
          "prevV": 1172.88687,
          "yoy": -1.7
        },
        {
          "name": "市債",
          "v": 854.79,
          "prevV": 1109.35,
          "yoy": -22.9
        },
        {
          "name": "道支出金",
          "v": 771.71883,
          "prevV": 690.15473,
          "yoy": 11.8
        },
        {
          "name": "地方消費税交付金",
          "v": 542.48,
          "prevV": 490.41498,
          "yoy": 10.6
        },
        {
          "name": "繰入金",
          "v": 312.11043,
          "prevV": 313.43919,
          "yoy": -0.4
        },
        {
          "name": "その他",
          "v": 668.41935,
          "prevV": 989.65617,
          "yoy": null,
          "children": [
            {
              "name": "使用料及び手数料",
              "v": 228.85668,
              "prevV": 227.14801,
              "yoy": 0.8
            },
            {
              "name": "財産収入",
              "v": 104.6858,
              "prevV": 355.99758,
              "yoy": -70.6
            },
            {
              "name": "軽油引取税交付金",
              "v": 71.08,
              "prevV": 72.82,
              "yoy": -2.4
            },
            {
              "name": "寄附金",
              "v": 57.74549,
              "prevV": 46.4172,
              "yoy": 24.4
            },
            {
              "name": "地方譲与税",
              "v": 56.42,
              "prevV": 55.87702,
              "yoy": 1
            },
            {
              "name": "法人事業税交付金",
              "v": 47.46,
              "prevV": 40.62082,
              "yoy": 16.8
            },
            {
              "name": "分担金及び負担金",
              "v": 32.70128,
              "prevV": 19.11544,
              "yoy": 71.1
            },
            {
              "name": "地方特例交付金",
              "v": 23.52,
              "prevV": 136.35,
              "yoy": -82.8
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 16.72,
              "prevV": 9.8,
              "yoy": 70.6
            },
            {
              "name": "配当割交付金",
              "v": 9.66,
              "prevV": 8.16,
              "yoy": 18.4
            },
            {
              "name": "自動車税環境性能割交付金",
              "v": 6.94,
              "prevV": 6.22,
              "yoy": 11.6
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.24,
              "prevV": 5.63,
              "yoy": -6.9
            },
            {
              "name": "分離課税所得割交付金",
              "v": 3.45,
              "prevV": 2.86,
              "yoy": 20.6
            },
            {
              "name": "利子割交付金",
              "v": 2.51,
              "prevV": 1.22,
              "yoy": 105.7
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.92,
              "prevV": 0.9,
              "yoy": 2.2
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.51,
              "prevV": 0.52,
              "yoy": -1.9
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.0001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 5124.03993,
          "prevV": 4698.79498,
          "yoy": 9.1
        },
        {
          "name": "職員費",
          "v": 1634.306,
          "prevV": 1617.46,
          "yoy": 1
        },
        {
          "name": "土木費",
          "v": 1272.20481,
          "prevV": 1524.14659,
          "yoy": -16.5
        },
        {
          "name": "経済費",
          "v": 1029.56189,
          "prevV": 1009.83288,
          "yoy": 2
        },
        {
          "name": "公債費",
          "v": 931.62,
          "prevV": 923.62,
          "yoy": 0.9
        },
        {
          "name": "諸支出金",
          "v": 895.21573,
          "prevV": 878.02869,
          "yoy": 2
        },
        {
          "name": "教育費",
          "v": 726.1276,
          "prevV": 667.36322,
          "yoy": 8.8
        },
        {
          "name": "総務費",
          "v": 568.89234,
          "prevV": 567.5078,
          "yoy": 0.2
        },
        {
          "name": "環境費",
          "v": 345.02631,
          "prevV": 439.51813,
          "yoy": -21.5
        },
        {
          "name": "消防費",
          "v": 117.34843,
          "prevV": 69.14378,
          "yoy": 69.7
        },
        {
          "name": "議会費",
          "v": 16.65696,
          "prevV": 16.58393,
          "yoy": 0.4
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和7年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://web.archive.org/web/20251120171848/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/documents/02_r7_yosansetsumeisho_ippan.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/documents/02_r7_yosansetsumeisho_ippan.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r7/02_r7_yosansetsumeisho_ippan.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和7年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20251120171848/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/documents/02_r7_yosansetsumeisho_ippan.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r7/02_r7_yosansetsumeisho_ippan.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "02_r7_yosansetsumeisho_ippan.pdf ・ sha256 85fab3a6748ddb47… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R6",
      "fyLabel": "令和6年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 12417,
      "prevTotalOku": 12441.85321,
      "yoyLabel": "-0.2%",
      "prevBasis": "補正後",
      "prevNote": "令和5年度当初予算は市長選挙に伴う骨格予算のため、前年度予算額は肉付予算（第1回臨時会・第2回定例会の補正）後の額（裏取り: 令和5年度第2回定例会 補正予算の概要「補正後予算額は対前年度比7.1％増の1兆2,442億円」）",
      "revenue": [
        {
          "name": "市税",
          "v": 3465,
          "prevV": 3501,
          "yoy": -1
        },
        {
          "name": "国庫支出金",
          "v": 2755.09806,
          "prevV": 3094.51889,
          "yoy": -11
        },
        {
          "name": "地方交付税",
          "v": 1431,
          "prevV": 1264,
          "yoy": 13.2
        },
        {
          "name": "諸収入",
          "v": 1172.88687,
          "prevV": 1197.99048,
          "yoy": -2.1
        },
        {
          "name": "市債",
          "v": 1109.35,
          "prevV": 919.26,
          "yoy": 20.7
        },
        {
          "name": "道支出金",
          "v": 690.15473,
          "prevV": 797.19458,
          "yoy": -13.4
        },
        {
          "name": "地方消費税交付金",
          "v": 490.41498,
          "prevV": 533.64,
          "yoy": -8.1
        },
        {
          "name": "財産収入",
          "v": 355.99758,
          "prevV": 348.53016,
          "yoy": 2.1
        },
        {
          "name": "その他",
          "v": 947.09778,
          "prevV": 785.7190999999998,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 313.43919,
              "prevV": 271.87455,
              "yoy": 15.3
            },
            {
              "name": "使用料及び手数料",
              "v": 227.14801,
              "prevV": 227.75094,
              "yoy": -0.3
            },
            {
              "name": "地方特例交付金",
              "v": 136.35,
              "prevV": 24.55,
              "yoy": 455.4
            },
            {
              "name": "軽油引取税交付金",
              "v": 72.82,
              "prevV": 74.2,
              "yoy": -1.9
            },
            {
              "name": "地方譲与税",
              "v": 55.87702,
              "prevV": 54.88482,
              "yoy": 1.8
            },
            {
              "name": "寄附金",
              "v": 46.4172,
              "prevV": 39.36057,
              "yoy": 17.9
            },
            {
              "name": "法人事業税交付金",
              "v": 40.62082,
              "prevV": 38.82646,
              "yoy": 4.6
            },
            {
              "name": "分担金及び負担金",
              "v": 19.11544,
              "prevV": 19.30065,
              "yoy": -1
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 9.8,
              "prevV": 6.62,
              "yoy": 48
            },
            {
              "name": "配当割交付金",
              "v": 8.16,
              "prevV": 9.39,
              "yoy": -13.1
            },
            {
              "name": "自動車税環境性能割交付金",
              "v": 6.22,
              "prevV": 4.3516,
              "yoy": 42.9
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.63,
              "prevV": 6.43,
              "yoy": -12.4
            },
            {
              "name": "分離課税所得割交付金",
              "v": 2.86,
              "prevV": 4.67,
              "yoy": -38.8
            },
            {
              "name": "利子割交付金",
              "v": 1.22,
              "prevV": 1.43,
              "yoy": -14.7
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.9,
              "prevV": 0.91,
              "yoy": -1.1
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.52,
              "prevV": 0.54,
              "yoy": -3.7
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.62951,
              "yoy": -100
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 4698.79498,
          "prevV": 5042.76583,
          "yoy": -6.8
        },
        {
          "name": "職員費",
          "v": 1617.46,
          "prevV": 1546.19,
          "yoy": 4.6
        },
        {
          "name": "土木費",
          "v": 1524.14659,
          "prevV": 1473.84157,
          "yoy": 3.4
        },
        {
          "name": "経済費",
          "v": 1009.83288,
          "prevV": 1080.20594,
          "yoy": -6.5
        },
        {
          "name": "公債費",
          "v": 923.62,
          "prevV": 917.94,
          "yoy": 0.6
        },
        {
          "name": "諸支出金",
          "v": 878.02869,
          "prevV": 836.63554,
          "yoy": 4.9
        },
        {
          "name": "教育費",
          "v": 667.36322,
          "prevV": 575.17024,
          "yoy": 16
        },
        {
          "name": "総務費",
          "v": 567.5078,
          "prevV": 499.08844,
          "yoy": 13.7
        },
        {
          "name": "環境費",
          "v": 439.51813,
          "prevV": 388.30781,
          "yoy": 13.2
        },
        {
          "name": "消防費",
          "v": 69.14378,
          "prevV": 60.09398,
          "yoy": 15.1
        },
        {
          "name": "議会費",
          "v": 16.58393,
          "prevV": 16.61386,
          "yoy": -0.2
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和6年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/documents/r6_yosansetsumeisyoippann.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/documents/r6_yosansetsumeisyoippann.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r6/r6_yosansetsumeisyoippann.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和6年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/documents/r6_yosansetsumeisyoippann.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r6/r6_yosansetsumeisyoippann.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "r6_yosansetsumeisyoippann.pdf ・ sha256 76821020f7dae62e… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R5",
      "fyLabel": "令和5年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 11922,
      "prevTotalOku": 11616,
      "yoyLabel": "+2.6%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3501,
          "prevV": 3399,
          "yoy": 3
        },
        {
          "name": "国庫支出金",
          "v": 2900.3653,
          "prevV": 2815.12493,
          "yoy": 3
        },
        {
          "name": "地方交付税",
          "v": 1234,
          "prevV": 1162,
          "yoy": 6.2
        },
        {
          "name": "諸収入",
          "v": 1187.40848,
          "prevV": 1225.17508,
          "yoy": -3.1
        },
        {
          "name": "市債",
          "v": 919.22,
          "prevV": 959.04,
          "yoy": -4.2
        },
        {
          "name": "道支出金",
          "v": 797.19458,
          "prevV": 704.92234,
          "yoy": 13.1
        },
        {
          "name": "地方消費税交付金",
          "v": 533.64,
          "prevV": 488.07,
          "yoy": 9.3
        },
        {
          "name": "繰入金",
          "v": 240.92634,
          "prevV": 200.72804,
          "yoy": 20
        },
        {
          "name": "その他",
          "v": 608.2452999999997,
          "prevV": 661.9396099999999,
          "yoy": null,
          "children": [
            {
              "name": "使用料及び手数料",
              "v": 227.75094,
              "prevV": 231.26746,
              "yoy": -1.5
            },
            {
              "name": "財産収入",
              "v": 96.10016,
              "prevV": 160.93498,
              "yoy": -40.3
            },
            {
              "name": "軽油引取税交付金",
              "v": 74.2,
              "prevV": 74.46,
              "yoy": -0.3
            },
            {
              "name": "地方譲与税",
              "v": 54.88482,
              "prevV": 55.81351,
              "yoy": -1.7
            },
            {
              "name": "法人事業税交付金",
              "v": 38.82646,
              "prevV": 41.27,
              "yoy": -5.9
            },
            {
              "name": "寄附金",
              "v": 38.29057,
              "prevV": 16.55252,
              "yoy": 131.3
            },
            {
              "name": "地方特例交付金",
              "v": 24.55,
              "prevV": 25.24,
              "yoy": -2.7
            },
            {
              "name": "分担金及び負担金",
              "v": 19.30065,
              "prevV": 20.27104,
              "yoy": -4.8
            },
            {
              "name": "配当割交付金",
              "v": 9.39,
              "prevV": 5.97,
              "yoy": 57.3
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 6.62,
              "prevV": 9.12,
              "yoy": -27.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 6.43,
              "prevV": 6.95,
              "yoy": -7.5
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.67,
              "prevV": 4.78,
              "yoy": -2.3
            },
            {
              "name": "自動車税環境性能割交付金",
              "v": 4.3516,
              "prevV": 6.15,
              "yoy": -29.2
            },
            {
              "name": "利子割交付金",
              "v": 1.43,
              "prevV": 1.79,
              "yoy": -20.1
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.91,
              "prevV": 0.85,
              "yoy": 7.1
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.54,
              "prevV": 0.52,
              "yoy": 3.8
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.0001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 4874.36183,
          "prevV": 4763.54398,
          "yoy": 2.3
        },
        {
          "name": "職員費",
          "v": 1546.19,
          "prevV": 1566.17,
          "yoy": -1.3
        },
        {
          "name": "土木費",
          "v": 1193.64157,
          "prevV": 1098.40333,
          "yoy": 8.7
        },
        {
          "name": "経済費",
          "v": 1070.41594,
          "prevV": 1174.6791,
          "yoy": -8.9
        },
        {
          "name": "公債費",
          "v": 917.94,
          "prevV": 891.81,
          "yoy": 2.9
        },
        {
          "name": "諸支出金",
          "v": 836.30554,
          "prevV": 845.67538,
          "yoy": -1.1
        },
        {
          "name": "教育費",
          "v": 534.24424,
          "prevV": 427.72465,
          "yoy": 24.9
        },
        {
          "name": "総務費",
          "v": 484.22423,
          "prevV": 528.85665,
          "yoy": -8.4
        },
        {
          "name": "環境費",
          "v": 383.06881,
          "prevV": 250.26097,
          "yoy": 53.1
        },
        {
          "name": "消防費",
          "v": 59.99398,
          "prevV": 47.09325,
          "yoy": 27.4
        },
        {
          "name": "議会費",
          "v": 16.61386,
          "prevV": 16.78269,
          "yoy": -1
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和5年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://web.archive.org/web/20230411085735/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/documents/r5kakukaikeiyosansetumeisyo.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/documents/r5kakukaikeiyosansetumeisyo.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r5/r5kakukaikeiyosansetumeisyo.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和5年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20230411085735/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/documents/r5kakukaikeiyosansetumeisyo.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r5/r5kakukaikeiyosansetumeisyo.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "r5kakukaikeiyosansetumeisyo.pdf ・ sha256 d9d13f91a87fdead… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R4",
      "fyLabel": "令和4年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 11616,
      "prevTotalOku": 11140,
      "yoyLabel": "+4.3%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3399,
          "prevV": 3210,
          "yoy": 5.9
        },
        {
          "name": "国庫支出金",
          "v": 2815.12493,
          "prevV": 2427.7758,
          "yoy": 16
        },
        {
          "name": "諸収入",
          "v": 1225.17508,
          "prevV": 1557.09265,
          "yoy": -21.3
        },
        {
          "name": "地方交付税",
          "v": 1162,
          "prevV": 1052,
          "yoy": 10.5
        },
        {
          "name": "市債",
          "v": 959.04,
          "prevV": 1175.29,
          "yoy": -18.4
        },
        {
          "name": "道支出金",
          "v": 704.92234,
          "prevV": 623.1571,
          "yoy": 13.1
        },
        {
          "name": "地方消費税交付金",
          "v": 488.07,
          "prevV": 454.22,
          "yoy": 7.5
        },
        {
          "name": "使用料及び手数料",
          "v": 231.26746,
          "prevV": 231.29626,
          "yoy": 0
        },
        {
          "name": "その他",
          "v": 631.4001899999998,
          "prevV": 409.16819000000004,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 200.72804,
              "prevV": 90.16526,
              "yoy": 122.6
            },
            {
              "name": "財産収入",
              "v": 160.93498,
              "prevV": 50.59011,
              "yoy": 218.1
            },
            {
              "name": "軽油引取税交付金",
              "v": 74.46,
              "prevV": 74.4,
              "yoy": 0.1
            },
            {
              "name": "地方譲与税",
              "v": 55.81351,
              "prevV": 54.51123,
              "yoy": 2.4
            },
            {
              "name": "法人事業税交付金",
              "v": 41.27,
              "prevV": 33.57,
              "yoy": 22.9
            },
            {
              "name": "地方特例交付金",
              "v": 25.24,
              "prevV": 39.07,
              "yoy": -35.4
            },
            {
              "name": "分担金及び負担金",
              "v": 20.27104,
              "prevV": 21.82179,
              "yoy": -7.1
            },
            {
              "name": "寄附金",
              "v": 16.55252,
              "prevV": 15.1997,
              "yoy": 8.9
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 9.12,
              "prevV": 6.36,
              "yoy": 43.4
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 6.95,
              "prevV": 6.11,
              "yoy": 13.7
            },
            {
              "name": "自動車税環境性能割交付金",
              "v": 6.15,
              "prevV": 3.73,
              "yoy": 64.9
            },
            {
              "name": "配当割交付金",
              "v": 5.97,
              "prevV": 5.95,
              "yoy": 0.3
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.78,
              "prevV": 4.3,
              "yoy": 11.2
            },
            {
              "name": "利子割交付金",
              "v": 1.79,
              "prevV": 1.96,
              "yoy": -8.7
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.85,
              "prevV": 0.89,
              "yoy": -4.5
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.52,
              "prevV": 0.54,
              "yoy": -3.7
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.0001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 4763.54398,
          "prevV": 4240.45734,
          "yoy": 12.3
        },
        {
          "name": "職員費",
          "v": 1566.17,
          "prevV": 1561.31,
          "yoy": 0.3
        },
        {
          "name": "経済費",
          "v": 1174.6791,
          "prevV": 1438.60312,
          "yoy": -18.3
        },
        {
          "name": "土木費",
          "v": 1098.40333,
          "prevV": 1050.90185,
          "yoy": 4.5
        },
        {
          "name": "公債費",
          "v": 891.81,
          "prevV": 896.18,
          "yoy": -0.5
        },
        {
          "name": "諸支出金",
          "v": 845.67538,
          "prevV": 838.34023,
          "yoy": 0.9
        },
        {
          "name": "総務費",
          "v": 528.85665,
          "prevV": 422.54855,
          "yoy": 25.2
        },
        {
          "name": "教育費",
          "v": 427.72465,
          "prevV": 439.07701,
          "yoy": -2.6
        },
        {
          "name": "環境費",
          "v": 250.26097,
          "prevV": 179.77341,
          "yoy": 39.2
        },
        {
          "name": "消防費",
          "v": 47.09325,
          "prevV": 51.49637,
          "yoy": -8.6
        },
        {
          "name": "議会費",
          "v": 16.78269,
          "prevV": 16.31212,
          "yoy": 2.9
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和4年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://web.archive.org/web/20240517214904/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/documents/r4_yosansetsumeisho.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/documents/r4_yosansetsumeisho.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r4/r4_yosansetsumeisho.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和4年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20240517214904/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/documents/r4_yosansetsumeisho.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r4/r4_yosansetsumeisho.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "r4_yosansetsumeisho.pdf ・ sha256 1bec144a4700a082… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R3",
      "fyLabel": "令和3年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 11140,
      "prevTotalOku": 10295,
      "yoyLabel": "+8.2%",
      "prevBasis": "当初",
      "prevNote": "",
      "revenue": [
        {
          "name": "市税",
          "v": 3210,
          "prevV": 3366,
          "yoy": -4.6
        },
        {
          "name": "国庫支出金",
          "v": 2427.7758,
          "prevV": 2418.63055,
          "yoy": 0.4
        },
        {
          "name": "諸収入",
          "v": 1557.09265,
          "prevV": 832.51081,
          "yoy": 87
        },
        {
          "name": "市債",
          "v": 1175.29,
          "prevV": 985.81,
          "yoy": 19.2
        },
        {
          "name": "地方交付税",
          "v": 1052,
          "prevV": 1060,
          "yoy": -0.8
        },
        {
          "name": "道支出金",
          "v": 623.1571,
          "prevV": 584.25732,
          "yoy": 6.7
        },
        {
          "name": "地方消費税交付金",
          "v": 454.22,
          "prevV": 459.86,
          "yoy": -1.2
        },
        {
          "name": "使用料及び手数料",
          "v": 231.29626,
          "prevV": 238.52794,
          "yoy": -3
        },
        {
          "name": "その他",
          "v": 409.16819000000004,
          "prevV": 349.4033800000001,
          "yoy": null,
          "children": [
            {
              "name": "繰入金",
              "v": 90.16526,
              "prevV": 63.99163,
              "yoy": 40.9
            },
            {
              "name": "軽油引取税交付金",
              "v": 74.4,
              "prevV": 78.09,
              "yoy": -4.7
            },
            {
              "name": "地方譲与税",
              "v": 54.51123,
              "prevV": 56.22907,
              "yoy": -3.1
            },
            {
              "name": "財産収入",
              "v": 50.59011,
              "prevV": 44.59787,
              "yoy": 13.4
            },
            {
              "name": "地方特例交付金",
              "v": 39.07,
              "prevV": 20.73,
              "yoy": 88.5
            },
            {
              "name": "法人事業税交付金",
              "v": 33.57,
              "prevV": 33,
              "yoy": 1.7
            },
            {
              "name": "分担金及び負担金",
              "v": 21.82179,
              "prevV": 22.43199,
              "yoy": -2.7
            },
            {
              "name": "寄附金",
              "v": 15.1997,
              "prevV": 3.42272,
              "yoy": 344.1
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 6.36,
              "prevV": 3.47,
              "yoy": 83.3
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 6.11,
              "prevV": 5.7,
              "yoy": 7.2
            },
            {
              "name": "配当割交付金",
              "v": 5.95,
              "prevV": 6.54,
              "yoy": -9
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.3,
              "prevV": 4.12,
              "yoy": 4.4
            },
            {
              "name": "自動車税環境性能割交付金",
              "v": 3.73,
              "prevV": 3.23,
              "yoy": 15.5
            },
            {
              "name": "利子割交付金",
              "v": 1.96,
              "prevV": 2.41,
              "yoy": -18.7
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.89,
              "prevV": 0.9,
              "yoy": -1.1
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.54,
              "prevV": 0.54,
              "yoy": 0
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.0001,
              "yoy": 0
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 4240.45734,
          "prevV": 4139.27711,
          "yoy": 2.4
        },
        {
          "name": "職員費",
          "v": 1561.31,
          "prevV": 1580.39,
          "yoy": -1.2
        },
        {
          "name": "経済費",
          "v": 1427.56189,
          "prevV": 694.60527,
          "yoy": 105.5
        },
        {
          "name": "土木費",
          "v": 1051.09185,
          "prevV": 1076.67633,
          "yoy": -2.4
        },
        {
          "name": "公債費",
          "v": 896.18,
          "prevV": 902.82,
          "yoy": -0.7
        },
        {
          "name": "諸支出金",
          "v": 838.34023,
          "prevV": 842.95196,
          "yoy": -0.5
        },
        {
          "name": "教育費",
          "v": 439.07701,
          "prevV": 410.04098,
          "yoy": 7.1
        },
        {
          "name": "総務費",
          "v": 422.35855,
          "prevV": 390.7874,
          "yoy": 8.1
        },
        {
          "name": "環境費",
          "v": 179.77341,
          "prevV": 178.39432,
          "yoy": 0.8
        },
        {
          "name": "消防費",
          "v": 51.49637,
          "prevV": 49.91022,
          "yoy": 3.2
        },
        {
          "name": "議会費",
          "v": 16.31212,
          "prevV": 16.83877,
          "yoy": -3.1
        },
        {
          "name": "労働費",
          "v": 11.04123,
          "prevV": 7.30764,
          "yoy": 51.1
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和3年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://web.archive.org/web/20260715104030/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/documents/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/documents/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r3/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和3年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20260715104030/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/documents/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r3/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf ・ sha256 d423fa2014d9916e… ・ 2026-07-15 取得"
        }
      ]
    },
    {
      "muniCode": "011002",
      "muniName": "札幌市",
      "prefName": "北海道",
      "isPref": false,
      "projects": [],
      "execution": [],
      "fy": "R2",
      "fyLabel": "令和2年度 当初予算",
      "population": 1955678,
      "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
      "totalOku": 10295,
      "prevTotalOku": 10227.013,
      "yoyLabel": "+0.7%",
      "prevBasis": "補正後",
      "prevNote": "令和元年度当初予算は市長選挙に伴う骨格予算のため、前年度予算額は肉付予算（第1回臨時会・第2回定例会の補正）後の額（裏取り: 令和元年度 補正予算のポイント「一般会計 1,022,701＝当初 1,019,300＋第1回臨時 42＋第2回定例 3,359」百万円）",
      "revenue": [
        {
          "name": "市税",
          "v": 3366,
          "prevV": 3309,
          "yoy": 1.7
        },
        {
          "name": "国庫支出金",
          "v": 2418.63055,
          "prevV": 2368.76855,
          "yoy": 2.1
        },
        {
          "name": "地方交付税",
          "v": 1060,
          "prevV": 1103,
          "yoy": -3.9
        },
        {
          "name": "市債",
          "v": 985.81,
          "prevV": 1031.69,
          "yoy": -4.4
        },
        {
          "name": "諸収入",
          "v": 832.51081,
          "prevV": 895.7695,
          "yoy": -7.1
        },
        {
          "name": "道支出金",
          "v": 584.25732,
          "prevV": 542.48585,
          "yoy": 7.7
        },
        {
          "name": "地方消費税交付金",
          "v": 459.86,
          "prevV": 385.68,
          "yoy": 19.2
        },
        {
          "name": "使用料及び手数料",
          "v": 238.52794,
          "prevV": 237.28543,
          "yoy": 0.5
        },
        {
          "name": "その他",
          "v": 349.40338000000014,
          "prevV": 347.6736699999999,
          "yoy": null,
          "children": [
            {
              "name": "軽油引取税交付金",
              "v": 78.09,
              "prevV": 78.2,
              "yoy": -0.1
            },
            {
              "name": "繰入金",
              "v": 63.99163,
              "prevV": 51.86928,
              "yoy": 23.4
            },
            {
              "name": "地方譲与税",
              "v": 56.22907,
              "prevV": 53.88477,
              "yoy": 4.4
            },
            {
              "name": "財産収入",
              "v": 44.59787,
              "prevV": 51.41019,
              "yoy": -13.3
            },
            {
              "name": "法人事業税交付金",
              "v": 33,
              "prevV": 0,
              "yoy": null
            },
            {
              "name": "分担金及び負担金",
              "v": 22.43199,
              "prevV": 39.18261,
              "yoy": -42.8
            },
            {
              "name": "地方特例交付金",
              "v": 20.73,
              "prevV": 37.97,
              "yoy": -45.4
            },
            {
              "name": "配当割交付金",
              "v": 6.54,
              "prevV": 7.44,
              "yoy": -12.1
            },
            {
              "name": "交通安全対策特別交付金",
              "v": 5.7,
              "prevV": 6.36,
              "yoy": -10.4
            },
            {
              "name": "分離課税所得割交付金",
              "v": 4.12,
              "prevV": 3.71,
              "yoy": 11.1
            },
            {
              "name": "株式等譲渡所得割交付金",
              "v": 3.47,
              "prevV": 6.15,
              "yoy": -43.6
            },
            {
              "name": "寄附金",
              "v": 3.42272,
              "prevV": 3.1174,
              "yoy": 9.8
            },
            {
              "name": "自動車税環境性能割交付金",
              "v": 3.23,
              "prevV": 2.86,
              "yoy": 12.9
            },
            {
              "name": "利子割交付金",
              "v": 2.41,
              "prevV": 3.12,
              "yoy": -22.8
            },
            {
              "name": "ゴルフ場利用税交付金",
              "v": 0.9,
              "prevV": 0.96,
              "yoy": -6.2
            },
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 0.54,
              "prevV": 0.55,
              "yoy": -1.8
            },
            {
              "name": "繰越金",
              "v": 0.0001,
              "prevV": 0.88942,
              "yoy": -100
            }
          ]
        }
      ],
      "expenditure": [
        {
          "name": "保健福祉費",
          "v": 4139.05711,
          "prevV": 3972.94039,
          "yoy": 4.2
        },
        {
          "name": "職員費",
          "v": 1580.39,
          "prevV": 1577.283,
          "yoy": 0.2
        },
        {
          "name": "土木費",
          "v": 1076.67633,
          "prevV": 1065.14715,
          "yoy": 1.1
        },
        {
          "name": "公債費",
          "v": 902.82,
          "prevV": 875.04,
          "yoy": 3.2
        },
        {
          "name": "諸支出金",
          "v": 842.95196,
          "prevV": 845.01854,
          "yoy": -0.2
        },
        {
          "name": "経済費",
          "v": 694.82527,
          "prevV": 781.16742,
          "yoy": -11.1
        },
        {
          "name": "教育費",
          "v": 410.04098,
          "prevV": 465.30645,
          "yoy": -11.9
        },
        {
          "name": "総務費",
          "v": 390.8874,
          "prevV": 383.76959,
          "yoy": 1.9
        },
        {
          "name": "環境費",
          "v": 178.29432,
          "prevV": 177.76862,
          "yoy": 0.3
        },
        {
          "name": "消防費",
          "v": 49.91022,
          "prevV": 54.08959,
          "yoy": -7.7
        },
        {
          "name": "議会費",
          "v": 16.83877,
          "prevV": 16.91819,
          "yoy": -0.5
        },
        {
          "name": "労働費",
          "v": 7.30764,
          "prevV": 7.56406,
          "yoy": -3.4
        },
        {
          "name": "予備費",
          "v": 5,
          "prevV": 5,
          "yoy": 0
        }
      ],
      "sourceTitle": "令和2年度 札幌市各会計予算説明書（一般会計・総括表）",
      "sourceUrl": "https://web.archive.org/web/20240712010952/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/documents/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
      "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/documents/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
      "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r2/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
      "pagesLabel": "款別歳入歳出",
      "evidence": [
        {
          "title": "令和2年度 札幌市各会計予算説明書（一般会計・総括表）",
          "type": "PDF",
          "url": "https://web.archive.org/web/20240712010952/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/documents/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
          "localUrl": "/sources/sapporo-yosansetsumeisho-r2/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
          "source": "www.city.sapporo.jp",
          "thumb": "reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf ・ sha256 829da4d042b74e4b… ・ 2026-07-15 取得"
        }
      ]
    }
  ]
};

/**
 * 団体コード → 当初予算（**最新年度のみ**）。市区町村選択・類似比較・coverage・routing など
 * 「その自治体の代表値」だけが要る場面で使う。年度を切り替える画面は MUNI_BUDGET_YEARS を見ること。
 */
export const MUNI_BUDGETS: Record<string, MuniBudget> = {
  "111007": {
    "muniCode": "111007",
    "muniName": "さいたま市",
    "prefName": "埼玉県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 1350500,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 7160,
    "prevTotalOku": 7034,
    "yoyLabel": "+1.8%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 3161.58003,
        "prevV": 3037.53003,
        "yoy": 4.1
      },
      {
        "name": "国庫支出金",
        "v": 1491.4343,
        "prevV": 1515.41772,
        "yoy": -1.6
      },
      {
        "name": "市債",
        "v": 536.283,
        "prevV": 654.918,
        "yoy": -18.1
      },
      {
        "name": "県支出金",
        "v": 418.34396,
        "prevV": 385.28615,
        "yoy": 8.6
      },
      {
        "name": "地方消費税交付金",
        "v": 367.74,
        "prevV": 330.42,
        "yoy": 11.3
      },
      {
        "name": "諸収入",
        "v": 348.85904,
        "prevV": 394.5441,
        "yoy": -11.6
      },
      {
        "name": "繰入金",
        "v": 285.05101,
        "prevV": 209.22279,
        "yoy": 36.2
      },
      {
        "name": "地方交付税",
        "v": 134,
        "prevV": 89,
        "yoy": 50.6
      },
      {
        "name": "その他",
        "v": 416.70865999999995,
        "prevV": 417.66121,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 82.32733,
            "prevV": 81.00987,
            "yoy": 1.6
          },
          {
            "name": "地方特例交付金",
            "v": 54.17,
            "prevV": 19.6,
            "yoy": 176.4
          },
          {
            "name": "財産収入",
            "v": 51.98604,
            "prevV": 74.00515,
            "yoy": -29.8
          },
          {
            "name": "分担金及び負担金",
            "v": 43.32165,
            "prevV": 41.3125,
            "yoy": 4.9
          },
          {
            "name": "軽油引取税交付金",
            "v": 37.16,
            "prevV": 61.9,
            "yoy": -40
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 35.28,
            "prevV": 30.46,
            "yoy": 15.8
          },
          {
            "name": "法人事業税交付金",
            "v": 30.49,
            "prevV": 28.15,
            "yoy": 8.3
          },
          {
            "name": "地方譲与税",
            "v": 29.22,
            "prevV": 30.6,
            "yoy": -4.5
          },
          {
            "name": "配当割交付金",
            "v": 24.86,
            "prevV": 18.16,
            "yoy": 36.9
          },
          {
            "name": "寄附金",
            "v": 14.07421,
            "prevV": 14.05367,
            "yoy": 0.1
          },
          {
            "name": "利子割交付金",
            "v": 7.22,
            "prevV": 2.17,
            "yoy": 232.7
          },
          {
            "name": "分離課税所得割交付金",
            "v": 3.73,
            "prevV": 3.75,
            "yoy": -0.5
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 2.4,
            "prevV": 2.5,
            "yoy": -4
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.44,
            "prevV": 0.51,
            "yoy": -13.7
          },
          {
            "name": "環境性能割交付金",
            "v": 0.02941,
            "prevV": 9.48,
            "yoy": -99.7
          },
          {
            "name": "自動車取得税交付金",
            "v": 0.00001,
            "prevV": 0.00001,
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
        "v": 2836.10456,
        "prevV": 2757.23852,
        "yoy": 2.9
      },
      {
        "name": "教育費",
        "v": 1201.4108,
        "prevV": 1198.44486,
        "yoy": 0.2
      },
      {
        "name": "土木費",
        "v": 765.67994,
        "prevV": 832.69886,
        "yoy": -8
      },
      {
        "name": "総務費",
        "v": 666.27306,
        "prevV": 593.09488,
        "yoy": 12.3
      },
      {
        "name": "公債費",
        "v": 595.93288,
        "prevV": 558.35639,
        "yoy": 6.7
      },
      {
        "name": "衛生費",
        "v": 582.41849,
        "prevV": 577.93152,
        "yoy": 0.8
      },
      {
        "name": "商工費",
        "v": 259.10657,
        "prevV": 279.99448,
        "yoy": -7.5
      },
      {
        "name": "消防費",
        "v": 199.05159,
        "prevV": 191.0896,
        "yoy": 4.2
      },
      {
        "name": "農林水産業費",
        "v": 32.4095,
        "prevV": 24.01865,
        "yoy": 34.9
      },
      {
        "name": "議会費",
        "v": 17.38979,
        "prevV": 16.97217,
        "yoy": 2.5
      },
      {
        "name": "労働費",
        "v": 2.22277,
        "prevV": 2.16002,
        "yoy": 2.9
      },
      {
        "name": "予備費",
        "v": 2,
        "prevV": 2,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.00005,
        "prevV": 0.00005,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260509164516/https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
    "originUrl": "https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
    "sourceLocalUrl": "/sources/saitama-yosansho-r8/reiwa8nendotousyoyosan.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 さいたま市一般会計予算（歳入歳出予算事項別明細書 総括・款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260509164516/https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
        "localUrl": "/sources/saitama-yosansho-r8/reiwa8nendotousyoyosan.pdf",
        "source": "www.city.saitama.lg.jp",
        "thumb": "reiwa8nendotousyoyosan.pdf ・ sha256 8509236e27fced49… ・ 2026-07-15 取得"
      }
    ]
  },
  "141003": {
    "muniCode": "141003",
    "muniName": "横浜市",
    "prefName": "神奈川県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 3753398,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 20993.42124,
    "prevTotalOku": 19844.07988,
    "yoyLabel": "+5.8%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 9758.97,
        "prevV": 9428.73,
        "yoy": 3.5
      },
      {
        "name": "国庫支出金",
        "v": 4492.80714,
        "prevV": 4264.76103,
        "yoy": 5.3
      },
      {
        "name": "市債",
        "v": 1304.9,
        "prevV": 1026.88,
        "yoy": 27.1
      },
      {
        "name": "県支出金",
        "v": 1284.44562,
        "prevV": 1176.52639,
        "yoy": 9.2
      },
      {
        "name": "地方消費税交付金",
        "v": 1073.01,
        "prevV": 994.29,
        "yoy": 7.9
      },
      {
        "name": "諸収入",
        "v": 693.68678,
        "prevV": 764.03368,
        "yoy": -9.2
      },
      {
        "name": "繰入金",
        "v": 506.21217,
        "prevV": 367.66335,
        "yoy": 37.7
      },
      {
        "name": "使用料及び手数料",
        "v": 501.4774,
        "prevV": 495.26056,
        "yoy": 1.3
      },
      {
        "name": "その他",
        "v": 1377.91213,
        "prevV": 1325.9348699999998,
        "yoy": null,
        "children": [
          {
            "name": "地方交付税",
            "v": 280,
            "prevV": 250,
            "yoy": 12
          },
          {
            "name": "分担金及び負担金",
            "v": 224.68794,
            "prevV": 303.81884,
            "yoy": -26
          },
          {
            "name": "財産収入",
            "v": 133.41917,
            "prevV": 125.85781,
            "yoy": 6
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 126.66,
            "prevV": 62.7,
            "yoy": 102
          },
          {
            "name": "地方特例交付金",
            "v": 122.01,
            "prevV": 44.65,
            "yoy": 173.3
          },
          {
            "name": "法人事業税交付金",
            "v": 107.6,
            "prevV": 108.06,
            "yoy": -0.4
          },
          {
            "name": "配当割交付金",
            "v": 94.53,
            "prevV": 65.35,
            "yoy": 44.7
          },
          {
            "name": "地方譲与税",
            "v": 87.27,
            "prevV": 89.98,
            "yoy": -3
          },
          {
            "name": "寄附金",
            "v": 78.12501,
            "prevV": 84.00821,
            "yoy": -7
          },
          {
            "name": "軽油引取税交付金",
            "v": 76.5698,
            "prevV": 122.16,
            "yoy": -37.3
          },
          {
            "name": "利子割交付金",
            "v": 19.88,
            "prevV": 9.71,
            "yoy": 104.7
          },
          {
            "name": "分離課税所得割交付金",
            "v": 14.06,
            "prevV": 11.81,
            "yoy": 19.1
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 6.55,
            "prevV": 7.24,
            "yoy": -9.5
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 5,
            "prevV": 5,
            "yoy": 0
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 1.55,
            "prevV": 1.5,
            "yoy": 3.3
          },
          {
            "name": "環境性能割交付金",
            "v": 0.0002,
            "prevV": 34.09,
            "yoy": -100
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
        "name": "こども青少年費",
        "v": 4225.51271,
        "prevV": 4124.06274,
        "yoy": 2.5
      },
      {
        "name": "健康福祉費",
        "v": 4159.46165,
        "prevV": 3808.47558,
        "yoy": 9.2
      },
      {
        "name": "教育費",
        "v": 3337.3366,
        "prevV": 2978.26468,
        "yoy": 12.1
      },
      {
        "name": "諸支出金",
        "v": 2105.59924,
        "prevV": 2011.98013,
        "yoy": 4.7
      },
      {
        "name": "公債費",
        "v": 1772.85013,
        "prevV": 1663.5826,
        "yoy": 6.6
      },
      {
        "name": "総務費",
        "v": 1435.48983,
        "prevV": 1262.11455,
        "yoy": 13.7
      },
      {
        "name": "道路費",
        "v": 574.40489,
        "prevV": 564.74916,
        "yoy": 1.7
      },
      {
        "name": "資源循環費",
        "v": 550.86003,
        "prevV": 510.37942,
        "yoy": 7.9
      },
      {
        "name": "消防費",
        "v": 457.64721,
        "prevV": 464.66262,
        "yoy": -1.5
      },
      {
        "name": "市民費",
        "v": 457.20301,
        "prevV": 494.09349,
        "yoy": -7.5
      },
      {
        "name": "経済費",
        "v": 453.40124,
        "prevV": 537.04712,
        "yoy": -15.6
      },
      {
        "name": "みどり環境費",
        "v": 351.38369,
        "prevV": 329.09944,
        "yoy": 6.8
      },
      {
        "name": "建築費",
        "v": 329.22756,
        "prevV": 313.80009,
        "yoy": 4.9
      },
      {
        "name": "医療費",
        "v": 273.85168,
        "prevV": 262.97707,
        "yoy": 4.1
      },
      {
        "name": "にぎわいスポーツ文化費",
        "v": 171.60109,
        "prevV": 180.57676,
        "yoy": -5
      },
      {
        "name": "港湾費",
        "v": 138.00797,
        "prevV": 147.36337,
        "yoy": -6.3
      },
      {
        "name": "都市整備費",
        "v": 108.52808,
        "prevV": 94.11008,
        "yoy": 15.3
      },
      {
        "name": "河川費",
        "v": 49.00827,
        "prevV": 54.73586,
        "yoy": -10.5
      },
      {
        "name": "議会費",
        "v": 32.04636,
        "prevV": 32.00512,
        "yoy": 0.1
      },
      {
        "name": "予備費",
        "v": 10,
        "prevV": 10,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
    "sourceUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
    "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
    "sourceLocalUrl": "/sources/yokohama-yosansho-r8/r8ippan.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 横浜市一般会計予算（事項別明細書 総括・款別歳入歳出）",
        "type": "PDF",
        "url": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
        "localUrl": "/sources/yokohama-yosansho-r8/r8ippan.pdf",
        "source": "www.city.yokohama.lg.jp",
        "thumb": "r8ippan.pdf ・ sha256 4778573fa49f3257… ・ 2026-07-15 取得"
      }
    ]
  },
  "141305": {
    "muniCode": "141305",
    "muniName": "川崎市",
    "prefName": "神奈川県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 1535141,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 9377.53481,
    "prevTotalOku": 8927.4988,
    "yoyLabel": "+5.0%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 4271.8638,
        "prevV": 4047.56733,
        "yoy": 5.5
      },
      {
        "name": "国庫支出金",
        "v": 1802.38732,
        "prevV": 1749.70585,
        "yoy": 3
      },
      {
        "name": "市債",
        "v": 756.88,
        "prevV": 574.09,
        "yoy": 31.8
      },
      {
        "name": "繰入金",
        "v": 664.82512,
        "prevV": 809.97425,
        "yoy": -17.9
      },
      {
        "name": "県支出金",
        "v": 500.11116,
        "prevV": 450.83905,
        "yoy": 10.9
      },
      {
        "name": "地方消費税交付金",
        "v": 419.38935,
        "prevV": 364.68834,
        "yoy": 15
      },
      {
        "name": "諸収入",
        "v": 342.4738,
        "prevV": 330.92503,
        "yoy": 3.5
      },
      {
        "name": "使用料及び手数料",
        "v": 165.10598,
        "prevV": 166.27363,
        "yoy": -0.7
      },
      {
        "name": "その他",
        "v": 454.49828,
        "prevV": 433.43532,
        "yoy": null,
        "children": [
          {
            "name": "分担金及び負担金",
            "v": 87.88581,
            "prevV": 86.39574,
            "yoy": 1.7
          },
          {
            "name": "財産収入",
            "v": 79.05597,
            "prevV": 109.74971,
            "yoy": -28
          },
          {
            "name": "寄附金",
            "v": 59.84871,
            "prevV": 40.24922,
            "yoy": 48.7
          },
          {
            "name": "地方特例交付金",
            "v": 44.62704,
            "prevV": 15.38763,
            "yoy": 190
          },
          {
            "name": "法人事業税交付金",
            "v": 40.42655,
            "prevV": 38.08408,
            "yoy": 6.2
          },
          {
            "name": "配当割交付金",
            "v": 40.13788,
            "prevV": 27.92393,
            "yoy": 43.7
          },
          {
            "name": "地方譲与税",
            "v": 29.30203,
            "prevV": 29.27273,
            "yoy": 0.1
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 25.94573,
            "prevV": 21.18598,
            "yoy": 22.5
          },
          {
            "name": "軽油引取税交付金",
            "v": 21.00006,
            "prevV": 38.36592,
            "yoy": -45.3
          },
          {
            "name": "利子割交付金",
            "v": 12.24823,
            "prevV": 2.07761,
            "yoy": 489.5
          },
          {
            "name": "分離課税所得割交付金",
            "v": 4.89754,
            "prevV": 4.2044,
            "yoy": 16.5
          },
          {
            "name": "地方交付税",
            "v": 4.82602,
            "prevV": 4.06962,
            "yoy": 18.6
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 2.92663,
            "prevV": 3.17654,
            "yoy": -7.9
          },
          {
            "name": "繰越金",
            "v": 1,
            "prevV": 1,
            "yoy": 0
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.37007,
            "prevV": 0.34665,
            "yoy": 6.8
          },
          {
            "name": "環境性能割交付金",
            "v": 0.00001,
            "prevV": 11.94556,
            "yoy": -100
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "健康福祉費",
        "v": 1830.74758,
        "prevV": 1833.26548,
        "yoy": -0.1
      },
      {
        "name": "こども未来費",
        "v": 1599.211,
        "prevV": 1564.96283,
        "yoy": 2.2
      },
      {
        "name": "教育費",
        "v": 1371.70732,
        "prevV": 1302.46844,
        "yoy": 5.3
      },
      {
        "name": "諸支出金",
        "v": 1199.98182,
        "prevV": 1235.73487,
        "yoy": -2.9
      },
      {
        "name": "公債費",
        "v": 759.59256,
        "prevV": 748.8006,
        "yoy": 1.4
      },
      {
        "name": "総務費",
        "v": 678.22905,
        "prevV": 628.8584,
        "yoy": 7.9
      },
      {
        "name": "建設緑政費",
        "v": 497.12316,
        "prevV": 307.60049,
        "yoy": 61.6
      },
      {
        "name": "まちづくり費",
        "v": 268.09647,
        "prevV": 238.36668,
        "yoy": 12.5
      },
      {
        "name": "環境費",
        "v": 244.03643,
        "prevV": 231.51865,
        "yoy": 5.4
      },
      {
        "name": "経済労働費",
        "v": 238.30161,
        "prevV": 241.90033,
        "yoy": -1.5
      },
      {
        "name": "区役所費",
        "v": 212.7659,
        "prevV": 195.79984,
        "yoy": 8.7
      },
      {
        "name": "消防費",
        "v": 200.45838,
        "prevV": 194.00262,
        "yoy": 3.3
      },
      {
        "name": "港湾費",
        "v": 128.53026,
        "prevV": 88.47885,
        "yoy": 45.3
      },
      {
        "name": "市民文化費",
        "v": 124.74526,
        "prevV": 91.96656,
        "yoy": 35.6
      },
      {
        "name": "議会費",
        "v": 17.00801,
        "prevV": 16.77416,
        "yoy": 1.4
      },
      {
        "name": "予備費",
        "v": 7,
        "prevV": 7,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 川崎市予算について 計数資料編（一般会計歳入歳出予算 款別）",
    "sourceUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
    "originUrl": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
    "sourceLocalUrl": "/sources/kawasaki-yosansho-r8/26bunkatuban6_antore.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 川崎市予算について 計数資料編（一般会計歳入歳出予算 款別）",
        "type": "PDF",
        "url": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
        "localUrl": "/sources/kawasaki-yosansho-r8/26bunkatuban6_antore.pdf",
        "source": "www.city.kawasaki.jp",
        "thumb": "26bunkatuban6_antore.pdf ・ sha256 b3d21d21dea1d487… ・ 2026-07-15 取得"
      }
    ]
  },
  "190004": {
    "muniCode": "190004",
    "muniName": "山梨県",
    "prefName": "山梨県",
    "isPref": true,
    "projects": [
      {
        "name": "商工業振興資金貸付金",
        "amountOku": 451.62207,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "中小企業の金融の円滑化を促進し、経営の安定化を図るため、金融機関の協調を得て",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "高等学校等就学支援金交付事業費",
        "amountOku": 69.6403,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "全ての意志ある生徒が安心して勉学に打ち込めるよう、高校生等に対し、所得の状況",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "小学校給食費負担軽減事業費補助金",
        "amountOku": 20.3053,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "公立小学校に通う児童が安心して学校給食の提供を受けられるよう、給食費の負担を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "少人数教育推進事業費",
        "amountOku": 19.56395,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "児童一人ひとりに向き合ったきめ細かな質の高い教育を実現するため、公立小学校に",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "消防防災ヘリコプター整備事業費",
        "amountOku": 14.73844,
        "kan": null,
        "shisaku": "防災・減災、県土の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "山岳遭難救助や林野火災消火などの活動時における安定的な運航体制を確保するため、",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.1",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=1"
      },
      {
        "name": "スタートアップ支援センター事業費",
        "amountOku": 1.4187,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県内企業との共創による新たなビジネス創出や雇用の促進を図るため、スタートアッ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "部活動地域展開推進事業費",
        "amountOku": 1.20753,
        "kan": null,
        "shisaku": "スポーツの振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "将来にわたり子どもたちがスポーツ・文化芸術活動に親しむことができる機会を確保",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      },
      {
        "name": "ツキノワグマ被害防止対策強化事業費",
        "amountOku": 0.95149,
        "kan": null,
        "shisaku": "「上質な空間」づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県民の安全・安心を確保するため、クマによる被害を防止する取り組みを強化する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.14",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=14"
      },
      {
        "name": "成長産業総合支援センター設置事業費補助金",
        "amountOku": 0.77952,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県内企業の成長分野(医療機器、水素・燃料電池、航空宇宙防衛)進出を一体的に促進",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
      },
      {
        "name": "キャリアアップ・ユニバーシティ運営事業費補助金",
        "amountOku": 0.7723,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "働き手のスキルアップを図るため、教育機関や研修企業等と連携してリスキリングを",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
      },
      {
        "name": "空き家活用住宅整備モデル事業費補助金",
        "amountOku": 0.7665,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "空き家の活用を促進するとともに、移住者の受け入れに向けた良好な住環境の形成を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
      },
      {
        "name": "富士トラム推進事業費",
        "amountOku": 0.75868,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "富士山における諸課題の解決による高付加価値化を図るため、富士トラムの導入を通",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
      },
      {
        "name": "二次交通高度化推進事業費",
        "amountOku": 0.74071,
        "kan": null,
        "shisaku": "海と空に開かれた「開の国」交通ネットワークの充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "観光地や地域の移動手段の確保に向け、既存の交通資源を有効活用し、利便性向上を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
      },
      {
        "name": "木造住宅居住安心支援事業費",
        "amountOku": 0.70959,
        "kan": null,
        "shisaku": "防災・減災、県土の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "地震に強い安全で安心なまちづくりを目指し、木造住宅の耐震診断・改修事業への助",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
      },
      {
        "name": "高校入試システム構築事業費",
        "amountOku": 0.66541,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "高校入試におけるＷｅｂ出願を実施するため、入試システムを再構築する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "メディカル・デバイス・コリドー創生事業費",
        "amountOku": 0.62049,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "医療機器関連産業の集積を加速化させるため、県内企業が行う機器開発や部材供給に",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.3",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=3"
      },
      {
        "name": "コーポレートブランド「やまなし」推進事業費",
        "amountOku": 0.60848,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "地域経済の活性化を図るため、本県のブランド価値向上に向けた取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "校内教育支援センター支援員配置事業費補助金",
        "amountOku": 0.58112,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "不登校児童生徒の登校復帰の支援等を行う者を配置する市町村等に対し助成する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "やまふくプラス推進事業費",
        "amountOku": 0.51184,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "障害者の社会参加の促進と工賃向上を図るための取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "縁結び支援事業費",
        "amountOku": 0.50806,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "若者が抱く結婚へのネガティブなイメージや不安を払拭し、前向きな価値観を醸成す",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
      },
      {
        "name": "水素・燃料電池分野基幹産業化推進事業費",
        "amountOku": 0.49491,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "水素・燃料電池関連産業の基幹産業化を図るため、県内企業が行う機器開発や部材供",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.3",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=3"
      },
      {
        "name": "富士五湖自然首都圏フォーラム運営事業費",
        "amountOku": 0.47235,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "域内外の民間との連携により地域の高付加価値化を図るため、観光リゾート地と首都",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
      },
      {
        "name": "プレコンセプションケア推進事業費",
        "amountOku": 0.46149,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子どもを望む誰もが安心して妊娠・出産できるよう、将来の妊娠・出産に備えた健康",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "富士山世界遺産センター機能強化事業費",
        "amountOku": 0.44825,
        "kan": null,
        "shisaku": "「上質な空間」づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "開館10周年を契機に、富士山世界遺産センターの機能強化に向けた取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.15",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=15"
      },
      {
        "name": "第81回国民スポーツ大会冬季大会開催費",
        "amountOku": 0.43043,
        "kan": null,
        "shisaku": "スポーツの振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      },
      {
        "name": "妊産婦等生活援助事業費",
        "amountOku": 0.41135,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "家庭生活に困難な問題を抱える妊産婦等の生活の安定と自立の促進を図るため、就労",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "地域医療構想推進事業費",
        "amountOku": 0.39286,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "峡南南部地域の医療提供体制を確保するため、病院等の再編に向けた取り組みに対し",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "富士北麓県有地高度活用事業費",
        "amountOku": 0.38346,
        "kan": null,
        "shisaku": "県有資産や地域資源の可能性の発揮",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域のブランド力向上と自主財源の確保を図るため、県有地の活用により生み出され",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
      },
      {
        "name": "空飛ぶクルマ社会実装加速化事業費",
        "amountOku": 0.29986,
        "kan": null,
        "shisaku": "海と空に開かれた「開の国」交通ネットワークの充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "利便性の高い新たな交通ネットワークを構築するため、本県における次世代空モビリ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
      },
      {
        "name": "国際保育推進事業費",
        "amountOku": 0.26135,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "外国人が地域社会で安心して子育てを行い、子どもが言語や文化の違いにかかわらず",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
      },
      {
        "name": "私立高等学校等入学金サポート事業費",
        "amountOku": 0.2605,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "経済的に余裕のない世帯の私立高等学校等入学に要する費用負担の軽減を図るため、",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "郡内織物国際価値創出推進事業費",
        "amountOku": 0.25771,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "郡内織物の新たな価値創出に向け、先進的な感性を持つ若手デザイナーの理解促進を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "外国人材確保・定着支援事業費",
        "amountOku": 0.25733,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県内企業等において深刻化する人手不足に対応するため、外国人材の確保や定着に向",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "水素コンソーシアム情報発信事業費",
        "amountOku": 0.25182,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "グリーン水素技術の社会実装を推進するため、本県の知見・データの集積、議論を行",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
      },
      {
        "name": "人口減少危機対策支援事業費",
        "amountOku": 0.22702,
        "kan": null,
        "shisaku": "全ての県民・あらゆる主体との連帯に基づく県政の推進",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県と市町村が連携して人口減少危機に対応するため、地域の実情に応じた市町村の取",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
      },
      {
        "name": "特別支援学校冷房設備設置費",
        "amountOku": 0.19651,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "児童生徒に快適な学習環境を提供するため、特別支援学校の屋内運動場へ冷房設備を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "介護福祉士修学資金等貸付事業費",
        "amountOku": 0.18842,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": null,
        "prevAmountOku": null,
        "description": "介護福祉士及び社会福祉士の資格取得や潜在介護職員の復職を推進するため、修学資",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "富士山いにしえの登山道再興事業費",
        "amountOku": 0.16894,
        "kan": null,
        "shisaku": "「上質な空間」づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "富士山の文化的価値への理解を深めるとともに、登山者の分散化を図るため、麓から",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.14",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=14"
      },
      {
        "name": "子ども未来進学支援事業費",
        "amountOku": 0.14832,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "大学等への進学を希望する生活保護世帯の子どもを支援するため、学習塾等において",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "図書館を活用した探究活動等支援事業費",
        "amountOku": 0.14126,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "若者の探究活動や誰もが利用しやすい読書環境の充実を図るため、知の拠点である図",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "ワーク・ライフ・ケアバランス推進事業費",
        "amountOku": 0.12232,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "就業者の仕事、生活、育児・介護の調和を図るため、県内企業が行う業務改善や柔軟",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
      },
      {
        "name": "富士山降灰対策ガイドライン策定事業費",
        "amountOku": 0.12078,
        "kan": null,
        "shisaku": "防災・減災、県土の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "富士山周辺の住民等が適切な避難行動を取れるよう、噴火による降灰の建物への影響",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.1",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=1"
      },
      {
        "name": "介護職員宿舎施設整備事業費補助金",
        "amountOku": 0.118,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "介護人材の確保・定着を促進するため、介護事業者等が行う良好な住環境を備えた職",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "フィールドシアター推進モデル事業費補助金",
        "amountOku": 0.1,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "本県の魅力的な自然景観や文化財等と調和した文化芸術イベントを創出するため、自",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "熱中症予防対策事業費",
        "amountOku": 0.09936,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "熱中症による健康被害を防止するため、公民館や集会所を開放する市町村の取り組み",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "山梨魅力再発見事業費",
        "amountOku": 0.09837,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域への愛着の醸成と地域ブランド価値の向上を図るための取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "もも未来担い手育成プロジェクト事業費",
        "amountOku": 0.0823,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "本県の主要農産物であるももの生産量維持を図るため、新規就農者を確保・育成する",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
      },
      {
        "name": "夜間中学・学びの多様化学校設置事業費",
        "amountOku": 0.07309,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "義務教育未修了者や不登校児童生徒等の教育機会を確保するため、夜間中学・学びの",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "航空宇宙防衛関連産業参入支援事業費",
        "amountOku": 0.0723,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県内企業の収益拡大を図るため、市場の拡大が見込まれる航空・宇宙・防衛関連産業",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "県産農畜水産物等小ロット流通体制調査研究事業費",
        "amountOku": 0.0682,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "特色はあるが生産量の少ない県産農畜水産物等の県内での消費拡大を図るため、効率",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "やまなし「にじきら」アンバサダー情報発信事業費",
        "amountOku": 0.06487,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県内米農家の所得向上を図るため、高温耐性に優れた高品質米である「にじのきらめ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "保育士養成施設就職等促進支援事業費補助金",
        "amountOku": 0.056,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "保育人材の確保を図るため、保育士養成施設が実施する保育所等への就職促進や保育",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
      },
      {
        "name": "外国人介護人材資格取得等支援事業費",
        "amountOku": 0.05424,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "技能実習生等に対し、日常生活や介護福祉士国家資格の取得を支援する取り組みを行",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "高校生世代学習支援事業費",
        "amountOku": 0.05081,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "大学等への進学を希望する経済的に余裕のない世帯の高校生を支援するため、安心し",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "外国人介護人材獲得強化事業費補助金",
        "amountOku": 0.05,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "介護分野において深刻化する人手不足に対応するため、介護事業者や介護福祉士養成",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "南山梨エリア周遊観光推進事業費",
        "amountOku": 0.048,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "南山梨エリアの地域資源の高付加価値化を図るため、地元自治体と連携した取り組み",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "孤独・孤立対策推進事業費",
        "amountOku": 0.04737,
        "kan": null,
        "shisaku": "安全・安心、快適なまちづくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "孤独・孤立がもたらす健康問題等のリスクを低減するため、ひきこもり状態にある者",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.5",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=5"
      },
      {
        "name": "ふるさと山梨甲州財閥学習推進事業費",
        "amountOku": 0.04552,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "児童生徒の郷土への関心を深め、自主性や公益的な視点を育むため、本県発展の礎を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "フィッシングツーリズム推進事業費",
        "amountOku": 0.04499,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県内漁業の活性化と水産資源を活用した観光振興を図るため、漁協や市町村等と連携",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "パラスポーツ教育活動支援事業費",
        "amountOku": 0.04341,
        "kan": null,
        "shisaku": "スポーツの振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "障害のある子どもたちがスポーツに親しむことができる機会を確保するため、パラス",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      },
      {
        "name": "やまなし探究シンポジウム開催費",
        "amountOku": 0.04324,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県立高校における探究的な学びの質の向上を支援するとともに、中学生に対して県立",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "日本創生のための将来世代応援知事同盟サミット開催費",
        "amountOku": 0.04295,
        "kan": null,
        "shisaku": "全ての県民・あらゆる主体との連帯に基づく県政の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "将来を担う世代を社会全体で応援する気運を高めるため、子育て支援をはじめとした",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
      },
      {
        "name": "料理人技術力向上支援事業費補助金",
        "amountOku": 0.0375,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "技術研鑽に励む料理人の活躍を支援する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "帰国・外国人児童生徒等教育推進支援事業費",
        "amountOku": 0.02485,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "日本語指導の充実を図るため、日本語指導教員の資質向上研修会等を開催する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "やまなし地域おこし協力隊サポート事業費",
        "amountOku": 0.02453,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域おこし協力隊員が活動しやすい環境整備を促進し、安定的な隊員の確保につなげ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
      },
      {
        "name": "少人数教育の質の向上プラン推進事業費",
        "amountOku": 0.02292,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "教育の質の更なる向上を図るため、少人数教育の環境を生かした探究的な学びを推進",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "市町村職員人材確保支援事業費",
        "amountOku": 0.02119,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "市町村の行政サービスを安定的に提供できる体制を維持するため、広域連携による採",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "ひとり親家庭養育費確保支援事業費補助金",
        "amountOku": 0.0173,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "ひとり親家庭の生活の安定と子どもの健やかな育成を図るため、養育費確保の手続き",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "ジュエリー産地やまなし技能五輪プロモーション等事業費補助金",
        "amountOku": 0.015,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "技能五輪全国大会貴金属装身具部門の開催を好機に、協同組合県ジュエリー協会が行",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "ワークサポートケアマネジャー養成事業費補助金",
        "amountOku": 0.0108,
        "kan": null,
        "shisaku": "安全・安心、快適なまちづくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "介護離職を防ぐため、仕事と介護の両立に関する専門人材の養成に向けた取り組みに",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.5",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=5"
      },
      {
        "name": "山梨緑化100年構想検討事業費",
        "amountOku": 0.00884,
        "kan": null,
        "shisaku": "安全・安心、快適なまちづくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "自然と共生する持続可能なまちづくりの実現に向け、100年先を見据えた都市環境の",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "少人数教育効果検証事業費",
        "amountOku": 0.00754,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "児童生徒一人ひとりに向き合ったきめ細かな質の高い教育を実現するため、25人学級",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "情報発信拠点設置検討事業費",
        "amountOku": 0.00424,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "ジャパンワインの魅力を発信する新たな情報発信拠点の県内設置に向けた検討を行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "ふるさと山梨郷土人物発信事業費",
        "amountOku": 0.00409,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域の歴史や文化についての理解と関心を深めるため、博物館に先人の功績を紹介す",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      }
    ],
    "execution": [
      {
        "fy": "R6",
        "basis": "確定",
        "fyLabel": "令和6年度（決算・確定値）",
        "asOf": "令和6年度決算（確定値）",
        "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
        "population": null,
        "revenueBudgetTotalOku": 6700.46789557,
        "revenueSettledTotalOku": 5713.05119222,
        "expenditureBudgetTotalOku": 6700.46789557,
        "expenditureSettledTotalOku": 5530.30730401,
        "revenue": [
          {
            "name": "県税",
            "budgetOku": 1061.03382,
            "settledOku": 1073.21812008,
            "ratePct": 101.1,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方消費税清算金",
            "budgetOku": 440.5438,
            "settledOku": 440.56323589,
            "ratePct": 100,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方譲与税",
            "budgetOku": 189.41008,
            "settledOku": 189.52736,
            "ratePct": 100.1,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方特例交付金",
            "budgetOku": 28.46814,
            "settledOku": 28.46813,
            "ratePct": 99.9,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方交付税",
            "budgetOku": 1471.88767,
            "settledOku": 1472.5426,
            "ratePct": 100,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "交通安全対策特別交付金",
            "budgetOku": 2.16,
            "settledOku": 1.70584,
            "ratePct": 79,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "分担金及び負担金",
            "budgetOku": 42.74621429,
            "settledOku": 25.8410692,
            "ratePct": 60.5,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "使用料及び手数料",
            "budgetOku": 72.23847,
            "settledOku": 71.16983566,
            "ratePct": 98.5,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "国庫支出金",
            "budgetOku": 1149.72274716,
            "settledOku": 762.50156468,
            "ratePct": 66.3,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "財産収入",
            "budgetOku": 7.97582,
            "settledOku": 9.01988036,
            "ratePct": 113.1,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "寄附金",
            "budgetOku": 8.75826,
            "settledOku": 9.20931521,
            "ratePct": 105.2,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "繰入金",
            "budgetOku": 120.26522,
            "settledOku": 118.1177781,
            "ratePct": 98.2,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "繰越金",
            "budgetOku": 193.50488595,
            "settledOku": 193.50488185,
            "ratePct": 100,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "諸収入",
            "budgetOku": 912.03276817,
            "settledOku": 750.55158119,
            "ratePct": 82.3,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "県債",
            "budgetOku": 999.72,
            "settledOku": 567.11,
            "ratePct": 56.7,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          }
        ],
        "expenditure": [
          {
            "name": "議会費",
            "budgetOku": 10.51474,
            "settledOku": 10.04204889,
            "ratePct": 95.5,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "総務費",
            "budgetOku": 478.09288597,
            "settledOku": 386.25792386,
            "ratePct": 80.8,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "民生費",
            "budgetOku": 728.82241547,
            "settledOku": 648.6440245,
            "ratePct": 89,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "衛生費",
            "budgetOku": 201.6026776,
            "settledOku": 177.56964626,
            "ratePct": 88.1,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "労働費",
            "budgetOku": 28.84357,
            "settledOku": 17.62693118,
            "ratePct": 61.1,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "農林水産業費",
            "budgetOku": 484.25977012,
            "settledOku": 325.45169947,
            "ratePct": 67.2,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "商工費",
            "budgetOku": 806.43396618,
            "settledOku": 609.61342937,
            "ratePct": 75.6,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "土木費",
            "budgetOku": 1548.57820205,
            "settledOku": 999.39769794,
            "ratePct": 64.5,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "警察費",
            "budgetOku": 260.7290054,
            "settledOku": 257.26142281,
            "ratePct": 98.7,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "教育費",
            "budgetOku": 931.039223,
            "settledOku": 892.24643739,
            "ratePct": 95.8,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "災害復旧費",
            "budgetOku": 24.86436978,
            "settledOku": 14.75310287,
            "ratePct": 59.3,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "公債費",
            "budgetOku": 741.39881,
            "settledOku": 740.89441505,
            "ratePct": 99.9,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "諸支出金",
            "budgetOku": 453.78629,
            "settledOku": 450.54852442,
            "ratePct": 99.3,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "予備費",
            "budgetOku": 1.50197,
            "settledOku": 0,
            "ratePct": 0,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          }
        ],
        "sourceTitle": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
        "sourceUrl": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
        "originUrl": "https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
        "sourceLocalUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf",
        "evidence": [
          {
            "title": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
            "type": "PDF",
            "url": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
            "localUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf",
            "source": "www.pref.yamanashi.jp",
            "thumb": "r6kessannjokyou.pdf ・ sha256 4ac0b9855c4a8e1c… ・ 2026-07-14 取得"
          }
        ]
      }
    ],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 801056,
    "populationLabel": "県内市町村の住民基本台帳人口の合計（総務省 令和6年度決算）",
    "totalOku": 5321.1735,
    "prevTotalOku": 5115.43169,
    "yoyLabel": "+4.0%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "交付金地方交付税",
        "v": 1409.44,
        "prevV": 1369.85,
        "yoy": 2.9
      },
      {
        "name": "県税",
        "v": 1094.63459,
        "prevV": 1060.86256,
        "yoy": 3.2
      },
      {
        "name": "諸収入",
        "v": 727.63231,
        "prevV": 822.00693,
        "yoy": -11.5
      },
      {
        "name": "手数料国庫支出金",
        "v": 541.21052,
        "prevV": 501.27532,
        "yoy": 8
      },
      {
        "name": "地方消費税",
        "v": 515.65652,
        "prevV": 451.91967,
        "yoy": 14.1
      },
      {
        "name": "県債",
        "v": 493.68,
        "prevV": 445.36,
        "yoy": 10.8
      },
      {
        "name": "清算金地方譲与税",
        "v": 195.84254,
        "prevV": 179.4261,
        "yoy": 9.1
      },
      {
        "name": "繰入金",
        "v": 173.85699,
        "prevV": 165.61106,
        "yoy": 5
      },
      {
        "name": "その他",
        "v": 169.22003,
        "prevV": 119.12005,
        "yoy": null,
        "children": [
          {
            "name": "負担金使用料及び",
            "v": 76.96147,
            "prevV": 74.95492,
            "yoy": 2.7
          },
          {
            "name": "地方特例",
            "v": 50.26389,
            "prevV": 4.58001,
            "yoy": 997.5
          },
          {
            "name": "特別交付金分担金及び",
            "v": 26.62594,
            "prevV": 26.56239,
            "yoy": 0.2
          },
          {
            "name": "財産収入",
            "v": 12.57252,
            "prevV": 9.70059,
            "yoy": 29.6
          },
          {
            "name": "交通安全対策",
            "v": 1.9,
            "prevV": 2.06,
            "yoy": -7.8
          },
          {
            "name": "寄附金",
            "v": 0.8962,
            "prevV": 1.26213,
            "yoy": -29
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
        "name": "教育費",
        "v": 1035.84677,
        "prevV": 925.85266,
        "yoy": 11.9
      },
      {
        "name": "公債費",
        "v": 700.58695,
        "prevV": 700.9522,
        "yoy": -0.1
      },
      {
        "name": "土木費",
        "v": 684.55143,
        "prevV": 682.50082,
        "yoy": 0.3
      },
      {
        "name": "民生費",
        "v": 679.34661,
        "prevV": 627.90003,
        "yoy": 8.2
      },
      {
        "name": "商工費",
        "v": 568.97801,
        "prevV": 658.59993,
        "yoy": -13.6
      },
      {
        "name": "諸支出金",
        "v": 502.30527,
        "prevV": 424.37774,
        "yoy": 18.4
      },
      {
        "name": "総務費",
        "v": 417.52979,
        "prevV": 388.58509,
        "yoy": 7.4
      },
      {
        "name": "警察費",
        "v": 244.44995,
        "prevV": 240.47558,
        "yoy": 1.7
      },
      {
        "name": "農林水産業費",
        "v": 227.887,
        "prevV": 226.649,
        "yoy": 0.5
      },
      {
        "name": "衛生費",
        "v": 191.15462,
        "prevV": 171.54614,
        "yoy": 11.4
      },
      {
        "name": "災害復旧費",
        "v": 35.05937,
        "prevV": 34.46054,
        "yoy": 1.7
      },
      {
        "name": "労働費",
        "v": 18.5314,
        "prevV": 18.36225,
        "yoy": 0.9
      },
      {
        "name": "議会費",
        "v": 9.94633,
        "prevV": 10.16971,
        "yoy": -2.2
      },
      {
        "name": "予備費",
        "v": 5,
        "prevV": 5,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
    "sourceUrl": "https://web.archive.org/web/20260520040653/https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
    "originUrl": "https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
    "sourceLocalUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260520040653/https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
        "localUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf",
        "source": "www.pref.yamanashi.jp",
        "thumb": "03_tousyoyosannkibo_1.pdf ・ sha256 742025562ff7fed1… ・ 2026-07-14 取得"
      }
    ]
  },
  "192023": {
    "muniCode": "192023",
    "muniName": "富士吉田市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [
      {
        "name": "下水道事業",
        "amountOku": 10.402,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
      },
      {
        "name": "道の駅富士吉田リニューアル事業",
        "amountOku": 8.68006,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.30",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=30"
      },
      {
        "name": "水道事業",
        "amountOku": 8.46237,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
      },
      {
        "name": "学校給食センター運営事業",
        "amountOku": 7.5285,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
      },
      {
        "name": "市道等建設事業",
        "amountOku": 3.92134,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
      },
      {
        "name": "行政ネットワーク運用管理事業",
        "amountOku": 3.19763,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
      },
      {
        "name": "中学校校舎等維持管理事業",
        "amountOku": 3.07449,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
      },
      {
        "name": "小中学校情報教育推進事業",
        "amountOku": 2.93639,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
      },
      {
        "name": "財産管理事業",
        "amountOku": 2.57125,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
      },
      {
        "name": "コミュニティセンター等大規模改修事業",
        "amountOku": 2.55413,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
      },
      {
        "name": "公園管理運営事業",
        "amountOku": 2.46273,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
      },
      {
        "name": "横町熊穴線外２路線整備事業",
        "amountOku": 2.39897,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
      },
      {
        "name": "観光宣伝・観光客誘致推進事業",
        "amountOku": 2.16266,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.30",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=30"
      },
      {
        "name": "ごみ収集事業",
        "amountOku": 2.14197,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.32",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=32"
      },
      {
        "name": "市営住宅管理事業",
        "amountOku": 2.00129,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.33",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=33"
      },
      {
        "name": "小学校校舎等維持管理事業",
        "amountOku": 1.72928,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
      },
      {
        "name": "企画・調整事業",
        "amountOku": 1.70431,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=21"
      },
      {
        "name": "特定防衛施設周辺公共用施設整備事業",
        "amountOku": 1.664,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
      },
      {
        "name": "市民会館管理運営事業",
        "amountOku": 1.39584,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.38",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=38"
      },
      {
        "name": "定住促進関連事業",
        "amountOku": 1.26163,
        "kan": null,
        "shisaku": "ふるさと創生室",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.36",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=36"
      },
      {
        "name": "ふるさと寄附推進事業",
        "amountOku": 1.18619,
        "kan": null,
        "shisaku": "ふるさと創生室",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.36",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=36"
      },
      {
        "name": "こども子育て支援事業",
        "amountOku": 1.16949,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
      },
      {
        "name": "非常備消防事業",
        "amountOku": 1.02143,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
      },
      {
        "name": "富士吉田市観光施設管理運営事業",
        "amountOku": 0.9823,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.30",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=30"
      },
      {
        "name": "防災対策事業",
        "amountOku": 0.90832,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
      },
      {
        "name": "木造住宅耐震改修等事業",
        "amountOku": 0.76186,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.33",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=33"
      },
      {
        "name": "区画整理事業",
        "amountOku": 0.72327,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
      },
      {
        "name": "コミュニティセンター等管理運営事業",
        "amountOku": 0.69545,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=21"
      },
      {
        "name": "中小企業等への融資斡旋・利子補給事業",
        "amountOku": 0.66534,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
      },
      {
        "name": "放課後児童対策事業",
        "amountOku": 0.55715,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
      },
      {
        "name": "健康総務事業",
        "amountOku": 0.54128,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
      },
      {
        "name": "リサイクル推進事業",
        "amountOku": 0.50823,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.32",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=32"
      },
      {
        "name": "介護保険特別会計包括的支援事業･任意事業",
        "amountOku": 0.46014,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
      },
      {
        "name": "商業活性化対策事業",
        "amountOku": 0.45205,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
      },
      {
        "name": "まちづくりパートナーシップ事業",
        "amountOku": 0.40629,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
      },
      {
        "name": "人事管理事務事業",
        "amountOku": 0.40399,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.23",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=23"
      },
      {
        "name": "鳥獣対策事業",
        "amountOku": 0.31424,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
      },
      {
        "name": "こども福祉事業",
        "amountOku": 0.305,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
      },
      {
        "name": "地域支え合い事業",
        "amountOku": 0.29543,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
      },
      {
        "name": "子育て見守り事業",
        "amountOku": 0.28801,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.26",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=26"
      },
      {
        "name": "教育委員会管理事業",
        "amountOku": 0.26572,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.37",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=37"
      },
      {
        "name": "自治体ＤＸ推進事業",
        "amountOku": 0.25418,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
      },
      {
        "name": "富士山安全対策・環境保全推進事業",
        "amountOku": 0.24526,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
      },
      {
        "name": "自然エネルギー設置事業",
        "amountOku": 0.22211,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
      },
      {
        "name": "国道138号対策事業",
        "amountOku": 0.21485,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.34",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=34"
      },
      {
        "name": "子育て支援センター管理運営事業",
        "amountOku": 0.18708,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.25",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=25"
      },
      {
        "name": "人口ビジョン・地域創生推進事業",
        "amountOku": 0.17292,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=21"
      },
      {
        "name": "不妊治療費助成事業",
        "amountOku": 0.15,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.27",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=27"
      },
      {
        "name": "雇用促進支援事業",
        "amountOku": 0.12627,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.29",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=29"
      },
      {
        "name": "森林環境整備事業",
        "amountOku": 0.10397,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
      },
      {
        "name": "生活困窮者自立促進支援事業",
        "amountOku": 0.09379,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.25",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=25"
      },
      {
        "name": "徴収事業",
        "amountOku": 0.07523,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.24",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=24"
      },
      {
        "name": "建築営繕事業",
        "amountOku": 0.05846,
        "kan": null,
        "shisaku": "都市基盤部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.35",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=35"
      },
      {
        "name": "富士山火山対策事業",
        "amountOku": 0.05407,
        "kan": null,
        "shisaku": "企画部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.22",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=22"
      },
      {
        "name": "農業振興事業",
        "amountOku": 0.04298,
        "kan": null,
        "shisaku": "経済環境部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業） p.31",
        "refLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf#page=31"
      }
    ],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 46364,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 310.6,
    "prevTotalOku": 289.7,
    "yoyLabel": "+7.2%",
    "prevBasis": "当初",
    "prevNote": "",
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
            "name": "国有提供施設等所在市町村助成交付金",
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
    "sourceTitle": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業）",
    "sourceUrl": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "originUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "sourceLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
        "localUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
        "source": "www.city.fujiyoshida.yamanashi.jp",
        "thumb": "7412.pdf ・ sha256 879613ffbf544674… ・ 2026-07-13 取得"
      }
    ]
  },
  "192040": {
    "muniCode": "192040",
    "muniName": "都留市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 28509,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 192.87,
    "prevTotalOku": 172.28,
    "yoyLabel": "+12.0%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "地方交付税",
        "v": 52.85,
        "prevV": 48.1,
        "yoy": 9.9
      },
      {
        "name": "市税",
        "v": 40.62747,
        "prevV": 39.43726,
        "yoy": 3
      },
      {
        "name": "国庫支出金",
        "v": 24.24713,
        "prevV": 21.3095,
        "yoy": 13.8
      },
      {
        "name": "繰入金",
        "v": 22.38637,
        "prevV": 19.33057,
        "yoy": 15.8
      },
      {
        "name": "市債",
        "v": 10.254,
        "prevV": 9.574,
        "yoy": 7.1
      },
      {
        "name": "県支出金",
        "v": 10.00455,
        "prevV": 9.9477,
        "yoy": 0.6
      },
      {
        "name": "地方消費税交付金",
        "v": 9.65635,
        "prevV": 8.43098,
        "yoy": 14.5
      },
      {
        "name": "諸収入",
        "v": 7.78653,
        "prevV": 1.42266,
        "yoy": 447.3
      },
      {
        "name": "その他",
        "v": 15.057600000000003,
        "prevV": 14.727329999999998,
        "yoy": null,
        "children": [
          {
            "name": "寄附金",
            "v": 6.00003,
            "prevV": 6.00003,
            "yoy": 0
          },
          {
            "name": "使用料及び手数料",
            "v": 2.17665,
            "prevV": 2.14171,
            "yoy": 1.6
          },
          {
            "name": "分担金及び負担金",
            "v": 1.53912,
            "prevV": 2.09145,
            "yoy": -26.4
          },
          {
            "name": "地方譲与税",
            "v": 1.17121,
            "prevV": 1.19415,
            "yoy": -1.9
          },
          {
            "name": "財産収入",
            "v": 1.07186,
            "prevV": 0.76582,
            "yoy": 40
          },
          {
            "name": "法人事業税交付金",
            "v": 0.89588,
            "prevV": 0.80733,
            "yoy": 11
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.81662,
            "prevV": 0.73598,
            "yoy": 11
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.45453,
            "prevV": 0.38264,
            "yoy": 18.8
          },
          {
            "name": "配当割交付金",
            "v": 0.33094,
            "prevV": 0.22448,
            "yoy": 47.4
          },
          {
            "name": "地方特例交付金",
            "v": 0.27996,
            "prevV": 0.21195,
            "yoy": 32.1
          },
          {
            "name": "利子割交付金",
            "v": 0.16413,
            "prevV": 0.0218,
            "yoy": 652.9
          },
          {
            "name": "環境性能割交付金",
            "v": 0.13157,
            "prevV": 0.12215,
            "yoy": 7.7
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.02509,
            "prevV": 0.02783,
            "yoy": -9.8
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
        "name": "教育費",
        "v": 52.25945,
        "prevV": 40.09441,
        "yoy": 30.3
      },
      {
        "name": "民生費",
        "v": 46.44394,
        "prevV": 45.33175,
        "yoy": 2.5
      },
      {
        "name": "総務費",
        "v": 24.35832,
        "prevV": 23.96431,
        "yoy": 1.6
      },
      {
        "name": "土木費",
        "v": 21.77629,
        "prevV": 16.25536,
        "yoy": 34
      },
      {
        "name": "衛生費",
        "v": 21.24471,
        "prevV": 20.61828,
        "yoy": 3
      },
      {
        "name": "公債費",
        "v": 12.50211,
        "prevV": 12.17999,
        "yoy": 2.6
      },
      {
        "name": "消防費",
        "v": 7.10239,
        "prevV": 7.0379,
        "yoy": 0.9
      },
      {
        "name": "農林水産業費",
        "v": 3.37864,
        "prevV": 3.19337,
        "yoy": 5.8
      },
      {
        "name": "商工費",
        "v": 1.93735,
        "prevV": 1.75103,
        "yoy": 10.6
      },
      {
        "name": "議会費",
        "v": 1.51052,
        "prevV": 1.56429,
        "yoy": -3.4
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0
      },
      {
        "name": "諸支出金",
        "v": 0.15625,
        "prevV": 0.08928,
        "yoy": 75
      },
      {
        "name": "災害復旧費",
        "v": 0.00003,
        "prevV": 0.00003,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 都留市当初予算（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260714071801/https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
    "originUrl": "https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
    "sourceLocalUrl": "/sources/tsuru-yosansho-r8/R8-0.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 都留市当初予算（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260714071801/https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
        "localUrl": "/sources/tsuru-yosansho-r8/R8-0.pdf",
        "source": "www.city.tsuru.yamanashi.jp",
        "thumb": "R8-0.pdf ・ sha256 f11b50887ab13c8f… ・ 2026-07-14 取得"
      }
    ]
  },
  "192066": {
    "muniCode": "192066",
    "muniName": "大月市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 21314,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 141.35,
    "prevTotalOku": 130.85,
    "yoyLabel": "+8.0%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 41.17125,
        "prevV": 40.96423,
        "yoy": 0.5
      },
      {
        "name": "地方交付税",
        "v": 29.15,
        "prevV": 30.55,
        "yoy": -4.6
      },
      {
        "name": "国庫支出金",
        "v": 19.77473,
        "prevV": 17.06691,
        "yoy": 15.9
      },
      {
        "name": "繰入金",
        "v": 15.74636,
        "prevV": 9.56185,
        "yoy": 64.7
      },
      {
        "name": "市債",
        "v": 10.169,
        "prevV": 8.331,
        "yoy": 22.1
      },
      {
        "name": "県支出金",
        "v": 7.49486,
        "prevV": 7.17224,
        "yoy": 4.5
      },
      {
        "name": "地方消費税交付金",
        "v": 6.1,
        "prevV": 5.9,
        "yoy": 3.4
      },
      {
        "name": "諸収入",
        "v": 2.68726,
        "prevV": 2.64664,
        "yoy": 1.5
      },
      {
        "name": "その他",
        "v": 9.056540000000002,
        "prevV": 8.657129999999999,
        "yoy": null,
        "children": [
          {
            "name": "寄附金",
            "v": 2.00102,
            "prevV": 2.00102,
            "yoy": 0
          },
          {
            "name": "使用料及び手数料",
            "v": 1.78232,
            "prevV": 1.79239,
            "yoy": -0.6
          },
          {
            "name": "分担金及び負担金",
            "v": 1.53575,
            "prevV": 1.5899,
            "yoy": -3.4
          },
          {
            "name": "地方譲与税",
            "v": 1.24051,
            "prevV": 1.24827,
            "yoy": -0.6
          },
          {
            "name": "財産収入",
            "v": 0.75187,
            "prevV": 0.51354,
            "yoy": 46.4
          },
          {
            "name": "法人事業税交付金",
            "v": 0.52,
            "prevV": 0.51,
            "yoy": 2
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.32,
            "prevV": 0.29,
            "yoy": 10.3
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.31,
            "prevV": 0.3,
            "yoy": 3.3
          },
          {
            "name": "配当割交付金",
            "v": 0.23,
            "prevV": 0.17,
            "yoy": 35.3
          },
          {
            "name": "環境性能割交付金",
            "v": 0.13,
            "prevV": 0.11,
            "yoy": 18.2
          },
          {
            "name": "地方特例交付金",
            "v": 0.13,
            "prevV": 0.1,
            "yoy": 30
          },
          {
            "name": "利子割交付金",
            "v": 0.08506,
            "prevV": 0.012,
            "yoy": 608.8
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.02,
            "prevV": 0.02,
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
        "v": 37.30489,
        "prevV": 35.42982,
        "yoy": 5.3
      },
      {
        "name": "総務費",
        "v": 21.44286,
        "prevV": 23.05056,
        "yoy": -7
      },
      {
        "name": "土木費",
        "v": 20.33918,
        "prevV": 15.75749,
        "yoy": 29.1
      },
      {
        "name": "教育費",
        "v": 17.84848,
        "prevV": 13.03933,
        "yoy": 36.9
      },
      {
        "name": "衛生費",
        "v": 17.19379,
        "prevV": 16.80418,
        "yoy": 2.3
      },
      {
        "name": "公債費",
        "v": 15.57062,
        "prevV": 15.3723,
        "yoy": 1.3
      },
      {
        "name": "消防費",
        "v": 6.70371,
        "prevV": 6.66342,
        "yoy": 0.6
      },
      {
        "name": "農林水産業費",
        "v": 2.70419,
        "prevV": 2.48252,
        "yoy": 8.9
      },
      {
        "name": "議会費",
        "v": 1.29549,
        "prevV": 1.2905,
        "yoy": 0.4
      },
      {
        "name": "商工費",
        "v": 0.84274,
        "prevV": 0.859,
        "yoy": -1.9
      },
      {
        "name": "予備費",
        "v": 0.1,
        "prevV": 0.1,
        "yoy": 0
      },
      {
        "name": "諸支出金",
        "v": 0.00402,
        "prevV": 0.00085,
        "yoy": 372.9
      },
      {
        "name": "災害復旧費",
        "v": 0.00003,
        "prevV": 0.00003,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 大月市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260714071536/https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
    "originUrl": "https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
    "sourceLocalUrl": "/sources/otsuki-yosansho-r8/R08_yosangaiyou.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 大月市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260714071536/https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
        "localUrl": "/sources/otsuki-yosansho-r8/R08_yosangaiyou.pdf",
        "source": "www.city.otsuki.yamanashi.jp",
        "thumb": "R08_yosangaiyou.pdf ・ sha256 a2dd179b68d6a341… ・ 2026-07-14 取得"
      }
    ]
  },
  "192082": {
    "muniCode": "192082",
    "muniName": "南アルプス市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 71726,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 429.94462,
    "prevTotalOku": 417.24947,
    "yoyLabel": "+3.0%",
    "prevBasis": "当初",
    "prevNote": "",
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
  "192091": {
    "muniCode": "192091",
    "muniName": "北杜市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 45380,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 347.86332,
    "prevTotalOku": 339.17716,
    "yoyLabel": "+2.6%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "地方交付税",
        "v": 100,
        "prevV": 101.5,
        "yoy": -1.5
      },
      {
        "name": "市税",
        "v": 81.29114,
        "prevV": 78.64763,
        "yoy": 3.4
      },
      {
        "name": "国庫支出金",
        "v": 29.65003,
        "prevV": 28.49546,
        "yoy": 4.1
      },
      {
        "name": "市債",
        "v": 28.601,
        "prevV": 32.07,
        "yoy": -10.8
      },
      {
        "name": "繰入金",
        "v": 27.37843,
        "prevV": 23.03463,
        "yoy": 18.9
      },
      {
        "name": "寄附金",
        "v": 23.80001,
        "prevV": 20.50001,
        "yoy": 16.1
      },
      {
        "name": "県支出金",
        "v": 23.26803,
        "prevV": 24.15166,
        "yoy": -3.7
      },
      {
        "name": "地方消費税交付金",
        "v": 12.68,
        "prevV": 10.36,
        "yoy": 22.4
      },
      {
        "name": "その他",
        "v": 21.19468,
        "prevV": 20.417770000000004,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 5.26053,
            "prevV": 4.99902,
            "yoy": 5.2
          },
          {
            "name": "繰越金",
            "v": 4.4155,
            "prevV": 3.64724,
            "yoy": 21.1
          },
          {
            "name": "地方譲与税",
            "v": 3.19598,
            "prevV": 3.21354,
            "yoy": -0.5
          },
          {
            "name": "諸収入",
            "v": 3.12394,
            "prevV": 3.9013,
            "yoy": -19.9
          },
          {
            "name": "財産収入",
            "v": 1.229,
            "prevV": 0.94127,
            "yoy": 30.6
          },
          {
            "name": "法人事業税交付金",
            "v": 1.01,
            "prevV": 0.99,
            "yoy": 2
          },
          {
            "name": "分担金及び負担金",
            "v": 0.81644,
            "prevV": 1.12284,
            "yoy": -27.3
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.51,
            "prevV": 0.44,
            "yoy": 15.9
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.4,
            "prevV": 0.37,
            "yoy": 8.1
          },
          {
            "name": "配当割交付金",
            "v": 0.37,
            "prevV": 0.26,
            "yoy": 42.3
          },
          {
            "name": "環境性能割交付金",
            "v": 0.32,
            "prevV": 0.3,
            "yoy": 6.7
          },
          {
            "name": "地方特例交付金",
            "v": 0.32,
            "prevV": 0.17,
            "yoy": 88.2
          },
          {
            "name": "利子割交付金",
            "v": 0.18,
            "prevV": 0.02,
            "yoy": 800
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.04329,
            "prevV": 0.04256,
            "yoy": 1.7
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 85.86624,
        "prevV": 86.96634,
        "yoy": -1.3
      },
      {
        "name": "教育費",
        "v": 63.84417,
        "prevV": 58.03183,
        "yoy": 10
      },
      {
        "name": "総務費",
        "v": 49.66288,
        "prevV": 49.05406,
        "yoy": 1.2
      },
      {
        "name": "衛生費",
        "v": 34.25388,
        "prevV": 34.3123,
        "yoy": -0.2
      },
      {
        "name": "土木費",
        "v": 33.46014,
        "prevV": 34.27268,
        "yoy": -2.4
      },
      {
        "name": "農林水産業費",
        "v": 26.3384,
        "prevV": 26.60056,
        "yoy": -1
      },
      {
        "name": "公債費",
        "v": 25.09761,
        "prevV": 23.64716,
        "yoy": 6.1
      },
      {
        "name": "消防費",
        "v": 11.83487,
        "prevV": 12.03113,
        "yoy": -1.6
      },
      {
        "name": "商工費",
        "v": 9.15704,
        "prevV": 7.84747,
        "yoy": 16.7
      },
      {
        "name": "諸支出金",
        "v": 5.43545,
        "prevV": 3.06762,
        "yoy": 77.2
      },
      {
        "name": "議会費",
        "v": 1.8881,
        "prevV": 2.31481,
        "yoy": -18.4
      },
      {
        "name": "災害復旧費",
        "v": 0.45134,
        "prevV": 0.45134,
        "yoy": 0
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.2732,
        "prevV": 0.27986,
        "yoy": -2.4
      }
    ],
    "sourceTitle": "令和8年度 北杜市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260714071224/https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
    "originUrl": "https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
    "sourceLocalUrl": "/sources/hokuto-yosansho-r8/__8__________.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 北杜市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260714071224/https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
        "localUrl": "/sources/hokuto-yosansho-r8/__8__________.pdf",
        "source": "www.city.hokuto.yamanashi.jp",
        "thumb": "__8__________.pdf ・ sha256 a5766d9905a1ecb2… ・ 2026-07-14 取得"
      }
    ]
  },
  "192112": {
    "muniCode": "192112",
    "muniName": "笛吹市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [
      {
        "name": "ふるさと納税事業",
        "amountOku": 27.31138,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "自主財源の確保とシティプロモーションにつなげるため、ふるさと納税寄附金の寄",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "砂原配水場改築事業",
        "amountOku": 8.96222,
        "kan": null,
        "shisaku": "公営企業部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "砂原配水場については、新山梨環状道路工事の支障となり移転する必要があるた",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "みさかの湯改修事業",
        "amountOku": 7.85496,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "みさかふれあい交流センター（みさかの湯）について、市民の憩いの場としてだけ",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
      },
      {
        "name": "小中学校・保育所等給食費及び保育料無償化",
        "amountOku": 6.07835,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て世帯の負担を軽減し、未来を拓く子供たちを健やかに育むため、小中学校や",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
      },
      {
        "name": "石和第一保育所改築事業",
        "amountOku": 5.95737,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "石和第一保育所について、安全安心な保育環境の整備を図るため、個別施設計画に",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "スポーツツーリズム拠点整備事業",
        "amountOku": 4.8016,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "石和清流館を拠点に、市のスポーツ振興と地域交流の活性化、防災力強化を図るた",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "春日居福祉会館改修事業",
        "amountOku": 3.43615,
        "kan": null,
        "shisaku": "保健福祉部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "春日居福祉会館（やまゆりの湯）について、今後も高齢者の健全な憩いの場と心身",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
      },
      {
        "name": "消防本部庁舎改修事業",
        "amountOku": 3.2396,
        "kan": null,
        "shisaku": "消防本部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "消防本部庁舎及び訓練棟3棟について、建物や設備の長寿命化を図るため、個別施",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=19"
      },
      {
        "name": "英語力向上推進事業",
        "amountOku": 1.59048,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "将来にわたり国際社会を舞台に活躍し、市の未来を拓く人材を育成することを目的",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "芦川グリーンロッジ改修事業",
        "amountOku": 1.48153,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "芦川グリーンロッジについて、周辺の豊かな自然環境を生かした里山遊びなど、子",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "かすがい西保育所改築事業",
        "amountOku": 1.43709,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "かすがい西保育所について、安全安心な保育環境の整備を図るため、個別施設計画",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "新山梨環状道路関連道路整備事業",
        "amountOku": 1.38767,
        "kan": null,
        "shisaku": "建設部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "山梨県が実施している新山梨環状道路の建設ルートに合わせ、周辺地域の利便性の",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "石和北小通り・石和郵便局通り道路改良事業",
        "amountOku": 1.28302,
        "kan": null,
        "shisaku": "建設部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "通勤・通学等の日常生活の利便性の向上、物流や観光面での活用による地域活性化",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "AIデマンド交通事業",
        "amountOku": 1.00227,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "公共交通空白地帯を解消するとともに、高齢者や交通弱者の外出支援及び市民の公",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "さくら温泉通り歩道整備事業",
        "amountOku": 0.99,
        "kan": null,
        "shisaku": "建設部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "整備から20年が経過し老朽化しているさくら温泉通りのウッドデッキの歩道につい",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "笛吹市南部学校給食センター建設事業",
        "amountOku": 0.63927,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "御坂学校給食共同調理場、八代学校給食センター、境川小学校調理場、芦川小学校",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
      },
      {
        "name": "子育て世帯住宅取得支援事業",
        "amountOku": 0.573,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て世帯の住宅取得に係る経済的負担を軽減し、若者や子育て世帯の移住定住の",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "私立保育所等施設整備事業",
        "amountOku": 0.51424,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "市内の私立保育所等（令和8年度は、相興保育園、御所保育園、木の花保育園の3",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "子育て世帯住宅取得補助事業",
        "amountOku": 0.417,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て世帯の住宅取得に係る経済的負担を軽減するため、18歳以下の子を養育して",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "拠点備蓄倉庫整備事業",
        "amountOku": 0.37199,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "旧御坂保健センターを、地域防災計画に各地区の拠点となり、中長期の避難に必要",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "奨学金返還支援事業",
        "amountOku": 0.29527,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "奨学金を返還する若者の就労初期における経済的負担を軽減し、市内への移住定住",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "山盧施設管理運営事業",
        "amountOku": 0.28345,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "日本を代表する俳人「飯田蛇笏」と現代俳句の第一人者「飯田龍太」の生家であ",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "ハザードマップ更新事業",
        "amountOku": 0.27649,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "自然災害に対する防災対策及び被害の軽減に使用することを目的に、笛吹市ハザー",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "学校体育館等空調設備整備事業",
        "amountOku": 0.24288,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "学校体育館等は、教育活動としての利用だけではなく、災害時には地域住民の避難",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
      },
      {
        "name": "結婚新生活支援事業",
        "amountOku": 0.135,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "新婚世帯の新生活を支援し、少子化対策及び子育てしやすいまちづくりを推進する",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "やまなしKAITEKI住宅普及促進事業",
        "amountOku": 0.124,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "山梨県の「やまなしKAITEKI住宅普及促進事業」を活用し、本市の人口減少対策を",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "収入保険加入補助事業",
        "amountOku": 0.09398,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "農業者の経営安定を図り、市の基幹産業である農業振興の推進を目的に、農産物の",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "笛吹市農業塾推進事業",
        "amountOku": 0.084,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "担い手の確保や安定した農業経営に寄与し、市の基幹産業である農業の発展につな",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "社会体育施設整備検討事業",
        "amountOku": 0.07601,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "競技レベルの向上に資する施設の整備が求められている現状を踏まえ、市全体を一",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "空き店舗活用促進補助事業",
        "amountOku": 0.072,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "空き店舗を利用した新規出店を促進し、地域のにぎわいの創出及び本市のイメージ",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "個別避難計画作成事業",
        "amountOku": 0.06315,
        "kan": null,
        "shisaku": "保健福祉部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "要介護者等の避難行動要支援者について、発災時又は発災のおそれがある場合に円",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
      },
      {
        "name": "衛星回線導入事業",
        "amountOku": 0.05294,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "激甚災害が発生した際、現状の通信ネットワークが使用できなくなることに備え、",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "笛吹市こどもの居場所づくり支援事業",
        "amountOku": 0.035,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子どもが健やかに成長できるよう、孤立や孤独の防止、学びや成長機会の確保を目",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "フリースクール利用支援事業",
        "amountOku": 0.0288,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "不登校児童生徒の学びの場の一つであるフリースクールについて、不登校児童の学",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "入札業務電子化事業",
        "amountOku": 0.0231,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "入札事務の効率化、事業者の利便性の向上及び透明性の向上などを目的に、従来紙",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "電子母子手帳活用促進事業",
        "amountOku": 0.01677,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て支援の向上を図るため、母子健康手帳の記録機能やプッシュ通知型によるお",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "契約業務電子化事業",
        "amountOku": 0.00004,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "契約行為に係る手続きの迅速化や省力化を図るため、従来紙によって行っている契",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "文化施設整備検討事業",
        "amountOku": 0,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "既存の文化施設である青楓美術館、八代郷土館、春日居郷土館・小川正子記念館、",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "石橋工業団地基盤整備事業",
        "amountOku": 0,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "地元雇用の創出や市税の税収確保のため、積極的な企業誘致を進めており、今後既",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      }
    ],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 66857,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 481.59288,
    "prevTotalOku": 454.93102,
    "yoyLabel": "+5.9%",
    "prevBasis": "当初",
    "prevNote": "",
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
  "192139": {
    "muniCode": "192139",
    "muniName": "甲州市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 29079,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 219.28,
    "prevTotalOku": 208,
    "yoyLabel": "+5.4%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "地方交付税",
        "v": 56.94285,
        "prevV": 56.43053,
        "yoy": 0.9
      },
      {
        "name": "市税",
        "v": 42.96965,
        "prevV": 42.11828,
        "yoy": 2
      },
      {
        "name": "繰入金",
        "v": 27.78691,
        "prevV": 24.81938,
        "yoy": 12
      },
      {
        "name": "国庫支出金",
        "v": 23.13397,
        "prevV": 22.60973,
        "yoy": 2.3
      },
      {
        "name": "寄附金",
        "v": 23.051,
        "prevV": 20.051,
        "yoy": 15
      },
      {
        "name": "市債",
        "v": 13.436,
        "prevV": 10.437,
        "yoy": 28.7
      },
      {
        "name": "県支出金",
        "v": 12.27453,
        "prevV": 12.34482,
        "yoy": -0.6
      },
      {
        "name": "地方消費税交付金",
        "v": 8.8,
        "prevV": 7.7,
        "yoy": 14.3
      },
      {
        "name": "その他",
        "v": 10.885090000000003,
        "prevV": 11.48926,
        "yoy": null,
        "children": [
          {
            "name": "諸収入",
            "v": 2.62044,
            "prevV": 3.95761,
            "yoy": -33.8
          },
          {
            "name": "繰越金",
            "v": 2,
            "prevV": 2,
            "yoy": 0
          },
          {
            "name": "使用料及び手数料",
            "v": 1.7531,
            "prevV": 1.7484,
            "yoy": 0.3
          },
          {
            "name": "地方譲与税",
            "v": 1.34786,
            "prevV": 1.36386,
            "yoy": -1.2
          },
          {
            "name": "法人事業税交付金",
            "v": 0.69,
            "prevV": 0.59,
            "yoy": 16.9
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.48,
            "prevV": 0.34,
            "yoy": 41.2
          },
          {
            "name": "分担金及び負担金",
            "v": 0.42824,
            "prevV": 0.42686,
            "yoy": 0.3
          },
          {
            "name": "配当割交付金",
            "v": 0.4,
            "prevV": 0.26,
            "yoy": 53.8
          },
          {
            "name": "財産収入",
            "v": 0.36039,
            "prevV": 0.24127,
            "yoy": 49.4
          },
          {
            "name": "地方特例交付金",
            "v": 0.275,
            "prevV": 0.169,
            "yoy": 62.7
          },
          {
            "name": "環境性能割交付金",
            "v": 0.18,
            "prevV": 0.21,
            "yoy": -14.3
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.17,
            "prevV": 0.14,
            "yoy": 21.4
          },
          {
            "name": "利子割交付金",
            "v": 0.16,
            "prevV": 0.02,
            "yoy": 700
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.02006,
            "prevV": 0.02226,
            "yoy": -9.9
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "総務費",
        "v": 62.5471,
        "prevV": 56.7582,
        "yoy": 10.2
      },
      {
        "name": "民生費",
        "v": 57.54719,
        "prevV": 54.26982,
        "yoy": 6
      },
      {
        "name": "教育費",
        "v": 20.24234,
        "prevV": 18.17985,
        "yoy": 11.3
      },
      {
        "name": "公債費",
        "v": 19.68687,
        "prevV": 20.88246,
        "yoy": -5.7
      },
      {
        "name": "土木費",
        "v": 19.55464,
        "prevV": 22.07701,
        "yoy": -11.4
      },
      {
        "name": "衛生費",
        "v": 16.03954,
        "prevV": 16.08132,
        "yoy": -0.3
      },
      {
        "name": "消防費",
        "v": 10.52005,
        "prevV": 7.49962,
        "yoy": 40.3
      },
      {
        "name": "農林水産業費",
        "v": 6.70251,
        "prevV": 6.20319,
        "yoy": 8
      },
      {
        "name": "商工費",
        "v": 4.06691,
        "prevV": 3.82344,
        "yoy": 6.4
      },
      {
        "name": "議会費",
        "v": 1.84086,
        "prevV": 1.69336,
        "yoy": 8.7
      },
      {
        "name": "予備費",
        "v": 0.35,
        "prevV": 0.35,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.18199,
        "prevV": 0.18173,
        "yoy": 0.1
      }
    ],
    "sourceTitle": "令和8年度 甲州市当初予算（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260714072236/https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
    "originUrl": "https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
    "sourceLocalUrl": "/sources/koshu-yosansho-r8/R8tousyoyosan.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 甲州市当初予算（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260714072236/https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
        "localUrl": "/sources/koshu-yosansho-r8/R8tousyoyosan.pdf",
        "source": "www.city.koshu.yamanashi.jp",
        "thumb": "R8tousyoyosan.pdf ・ sha256 108e376a89df693a… ・ 2026-07-14 取得"
      }
    ]
  },
  "194301": {
    "muniCode": "194301",
    "muniName": "富士河口湖町",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 27115,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 157.7,
    "prevTotalOku": 147.53,
    "yoyLabel": "+6.9%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "町税",
        "v": 49.59744,
        "prevV": 48.36017,
        "yoy": 2.6
      },
      {
        "name": "地方交付税",
        "v": 30,
        "prevV": 31,
        "yoy": -3.2
      },
      {
        "name": "繰入金",
        "v": 21.46669,
        "prevV": 17.86853,
        "yoy": 20.1
      },
      {
        "name": "国庫支出金",
        "v": 13.30948,
        "prevV": 11.33578,
        "yoy": 17.4
      },
      {
        "name": "寄附金",
        "v": 10.47003,
        "prevV": 10.35003,
        "yoy": 1.2
      },
      {
        "name": "県支出金",
        "v": 7.80487,
        "prevV": 7.29547,
        "yoy": 7
      },
      {
        "name": "地方消費税交付金",
        "v": 7.5,
        "prevV": 6.8,
        "yoy": 10.3
      },
      {
        "name": "町債",
        "v": 6.367,
        "prevV": 4.015,
        "yoy": 58.6
      },
      {
        "name": "その他",
        "v": 11.18449,
        "prevV": 10.505019999999996,
        "yoy": null,
        "children": [
          {
            "name": "繰越金",
            "v": 4.1,
            "prevV": 4,
            "yoy": 2.5
          },
          {
            "name": "諸収入",
            "v": 1.53879,
            "prevV": 1.69586,
            "yoy": -9.3
          },
          {
            "name": "使用料及び手数料",
            "v": 1.051,
            "prevV": 1.03659,
            "yoy": 1.4
          },
          {
            "name": "地方譲与税",
            "v": 1.01224,
            "prevV": 1.0478,
            "yoy": -3.4
          },
          {
            "name": "財産収入",
            "v": 0.90147,
            "prevV": 0.72852,
            "yoy": 23.7
          },
          {
            "name": "法人事業税交付金",
            "v": 0.8,
            "prevV": 0.7,
            "yoy": 14.3
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.45,
            "prevV": 0.45,
            "yoy": 0
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.35,
            "prevV": 0.11,
            "yoy": 218.2
          },
          {
            "name": "地方特例交付金",
            "v": 0.34,
            "prevV": 0.2,
            "yoy": 70
          },
          {
            "name": "分担金及び負担金",
            "v": 0.26599,
            "prevV": 0.27625,
            "yoy": -3.7
          },
          {
            "name": "配当割交付金",
            "v": 0.25,
            "prevV": 0.16,
            "yoy": 56.3
          },
          {
            "name": "利子割交付金",
            "v": 0.1,
            "prevV": 0.01,
            "yoy": 900
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.02,
            "prevV": 0.02,
            "yoy": 0
          },
          {
            "name": "環境性能割交付金",
            "v": 0.005,
            "prevV": 0.07,
            "yoy": -92.9
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 48.31944,
        "prevV": 41.18204,
        "yoy": 17.3
      },
      {
        "name": "総務費",
        "v": 26.22004,
        "prevV": 27.0206,
        "yoy": -3
      },
      {
        "name": "教育費",
        "v": 19.30958,
        "prevV": 18.1143,
        "yoy": 6.6
      },
      {
        "name": "公債費",
        "v": 17.68039,
        "prevV": 18.33456,
        "yoy": -3.6
      },
      {
        "name": "衛生費",
        "v": 16.868,
        "prevV": 16.05451,
        "yoy": 5.1
      },
      {
        "name": "土木費",
        "v": 11.33118,
        "prevV": 11.28603,
        "yoy": 0.4
      },
      {
        "name": "商工費",
        "v": 7.87669,
        "prevV": 5.66963,
        "yoy": 38.9
      },
      {
        "name": "消防費",
        "v": 7.0564,
        "prevV": 6.81792,
        "yoy": 3.5
      },
      {
        "name": "農林水産業費",
        "v": 1.60036,
        "prevV": 1.61354,
        "yoy": -0.8
      },
      {
        "name": "議会費",
        "v": 1.23792,
        "prevV": 1.23687,
        "yoy": 0.1
      },
      {
        "name": "予備費",
        "v": 0.2,
        "prevV": 0.2,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 富士河口湖町当初予算の概要（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260715062541/https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
    "originUrl": "https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
    "sourceLocalUrl": "/sources/fujikawaguchiko-yosansho-r8/R8yosan ga.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 富士河口湖町当初予算の概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260715062541/https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
        "localUrl": "/sources/fujikawaguchiko-yosansho-r8/R8yosan ga.pdf",
        "source": "www.town.fujikawaguchiko.lg.jp",
        "thumb": "R8yosan ga.pdf ・ sha256 fe5c31f78067c6c7… ・ 2026-07-15 取得"
      }
    ]
  },
  "222038": {
    "muniCode": "222038",
    "muniName": "沼津市",
    "prefName": "静岡県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185758,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 956,
    "prevTotalOku": 879.6,
    "yoyLabel": "+8.7%",
    "prevBasis": "当初",
    "prevNote": "",
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
  "231002": {
    "muniCode": "231002",
    "muniName": "名古屋市",
    "prefName": "愛知県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 2303004,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 16960.86,
    "prevTotalOku": 16171.87,
    "yoyLabel": "+4.9%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 6900.87526,
        "prevV": 6674.01,
        "yoy": 3.4
      },
      {
        "name": "国庫支出金",
        "v": 3038.79007,
        "prevV": 2950.84431,
        "yoy": 3
      },
      {
        "name": "市債",
        "v": 2169.52,
        "prevV": 2166.06,
        "yoy": 0.2
      },
      {
        "name": "県税交付金",
        "v": 1071.08,
        "prevV": 1035.16,
        "yoy": 3.5
      },
      {
        "name": "繰入金",
        "v": 977.71525,
        "prevV": 779.95962,
        "yoy": 25.4
      },
      {
        "name": "県支出金",
        "v": 977.49617,
        "prevV": 868.00515,
        "yoy": 12.6
      },
      {
        "name": "諸収入",
        "v": 960.22277,
        "prevV": 978.73928,
        "yoy": -1.9
      },
      {
        "name": "使用料及び手数料",
        "v": 401.40236,
        "prevV": 382.54519,
        "yoy": 4.9
      },
      {
        "name": "その他",
        "v": 463.75811999999996,
        "prevV": 336.54645,
        "yoy": null,
        "children": [
          {
            "name": "寄附金",
            "v": 193.22315,
            "prevV": 156.55126,
            "yoy": 23.4
          },
          {
            "name": "地方特例交付金",
            "v": 111.41,
            "prevV": 29.22,
            "yoy": 281.3
          },
          {
            "name": "財産収入",
            "v": 90.85396,
            "prevV": 67.93418,
            "yoy": 33.7
          },
          {
            "name": "地方譲与税",
            "v": 55.241,
            "prevV": 63.781,
            "yoy": -13.4
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 7,
            "prevV": 7,
            "yoy": 0
          },
          {
            "name": "地方交付税",
            "v": 6,
            "prevV": 12,
            "yoy": -50
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 0.03,
            "prevV": 0.06,
            "yoy": -50
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
        "name": "健康福祉費",
        "v": 4110.86253,
        "prevV": 3924.23739,
        "yoy": 4.8
      },
      {
        "name": "職員費",
        "v": 3057.65463,
        "prevV": 2928.23822,
        "yoy": 4.4
      },
      {
        "name": "子ども青少年費",
        "v": 2441.48285,
        "prevV": 2316.88441,
        "yoy": 5.4
      },
      {
        "name": "公債費",
        "v": 1400.86798,
        "prevV": 1380.77167,
        "yoy": 1.5
      },
      {
        "name": "教育費",
        "v": 1287.82271,
        "prevV": 1030.99577,
        "yoy": 24.9
      },
      {
        "name": "総務費",
        "v": 1067.33892,
        "prevV": 563.2021,
        "yoy": 89.5
      },
      {
        "name": "緑政土木費",
        "v": 786.92484,
        "prevV": 974.26525,
        "yoy": -19.2
      },
      {
        "name": "経済費",
        "v": 601.548,
        "prevV": 573.82723,
        "yoy": 4.8
      },
      {
        "name": "諸支出金",
        "v": 544.02814,
        "prevV": 545.25557,
        "yoy": -0.2
      },
      {
        "name": "住宅都市費",
        "v": 511.403,
        "prevV": 432.85849,
        "yoy": 18.1
      },
      {
        "name": "観光文化交流費",
        "v": 407.85604,
        "prevV": 349.05011,
        "yoy": 16.8
      },
      {
        "name": "環境費",
        "v": 374.95175,
        "prevV": 555.07502,
        "yoy": -32.5
      },
      {
        "name": "スポーツ市民費",
        "v": 240.89517,
        "prevV": 503.37066,
        "yoy": -52.1
      },
      {
        "name": "消防費",
        "v": 108.02628,
        "prevV": 74.46322,
        "yoy": 45.1
      },
      {
        "name": "議会費",
        "v": 18.19716,
        "prevV": 18.37489,
        "yoy": -1
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 名古屋市一般会計予算に関する説明書（修正後）（歳入歳出予算事項別明細書 総括）",
    "sourceUrl": "https://web.archive.org/web/20260715082734/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf",
    "originUrl": "https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf",
    "sourceLocalUrl": "/sources/nagoya-yosansho-r8/ippannmeisaisyuusei.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 名古屋市一般会計予算に関する説明書（修正後）（歳入歳出予算事項別明細書 総括）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260715082734/https://www.city.nagoya.jp/_res/projects/default_project/_page_/001/046/332/ippannmeisaisyuusei.pdf",
        "localUrl": "/sources/nagoya-yosansho-r8/ippannmeisaisyuusei.pdf",
        "source": "www.city.nagoya.jp",
        "thumb": "ippannmeisaisyuusei.pdf ・ sha256 f1fd669a4bd899d0… ・ 2026-07-15 取得"
      }
    ]
  },
  "232076": {
    "muniCode": "232076",
    "muniName": "豊川市",
    "prefName": "愛知県",
    "isPref": false,
    "projects": [
      {
        "name": "特別保育事業",
        "amountOku": 67.91993,
        "kan": "民生費",
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      }
    ],
    "execution": [],
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185900,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 835.5,
    "prevTotalOku": 723.7,
    "yoyLabel": "+15.4%",
    "prevBasis": "当初",
    "prevNote": "",
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
            "name": "国有提供施設等所在市町村助成交付金",
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
  "271004": {
    "muniCode": "271004",
    "muniName": "大阪市",
    "prefName": "大阪府",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 2778917,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 21882.21198,
    "prevTotalOku": 20309.32348,
    "yoyLabel": "+7.7%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 9105.45774,
        "prevV": 8531.60698,
        "yoy": 6.7
      },
      {
        "name": "国庫支出金",
        "v": 6051.09719,
        "prevV": 5669.25821,
        "yoy": 6.7
      },
      {
        "name": "府支出金",
        "v": 1427.78679,
        "prevV": 1324.95121,
        "yoy": 7.8
      },
      {
        "name": "市債",
        "v": 1351.84,
        "prevV": 1145.985,
        "yoy": 18
      },
      {
        "name": "地方消費税交付金",
        "v": 938.37,
        "prevV": 807.29,
        "yoy": 16.2
      },
      {
        "name": "使用料及手数料",
        "v": 719.40874,
        "prevV": 719.57799,
        "yoy": 0
      },
      {
        "name": "諸収入",
        "v": 641.70871,
        "prevV": 836.27278,
        "yoy": -23.3
      },
      {
        "name": "財産売却代",
        "v": 357.76419,
        "prevV": 58.40262,
        "yoy": 512.6
      },
      {
        "name": "その他",
        "v": 1288.7786199999996,
        "prevV": 1215.9786900000001,
        "yoy": null,
        "children": [
          {
            "name": "財産収入",
            "v": 308.00363,
            "prevV": 259.79595,
            "yoy": 18.6
          },
          {
            "name": "地方交付税",
            "v": 190,
            "prevV": 150,
            "yoy": 26.7
          },
          {
            "name": "法人事業税交付金",
            "v": 181.11,
            "prevV": 170.25,
            "yoy": 6.4
          },
          {
            "name": "繰入金",
            "v": 164.34162,
            "prevV": 262.09687,
            "yoy": -37.3
          },
          {
            "name": "地方特例交付金",
            "v": 101.63,
            "prevV": 28.39624,
            "yoy": 257.9
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 73.71,
            "prevV": 57.61,
            "yoy": 27.9
          },
          {
            "name": "軽油引取税交付金",
            "v": 66.51,
            "prevV": 110.84,
            "yoy": -40
          },
          {
            "name": "配当割交付金",
            "v": 61.08,
            "prevV": 39.24,
            "yoy": 55.7
          },
          {
            "name": "地方譲与税",
            "v": 59.09,
            "prevV": 61.66,
            "yoy": -4.2
          },
          {
            "name": "寄附金",
            "v": 51.85034,
            "prevV": 24.15209,
            "yoy": 114.7
          },
          {
            "name": "利子割交付金",
            "v": 11.76,
            "prevV": 8.48,
            "yoy": 38.7
          },
          {
            "name": "分担金及負担金",
            "v": 8.23302,
            "prevV": 8.83752,
            "yoy": -6.8
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 5.51,
            "prevV": 6.1,
            "yoy": -9.7
          },
          {
            "name": "分離課税所得割交付金",
            "v": 5.08,
            "prevV": 5.08,
            "yoy": 0
          },
          {
            "name": "環境性能割交付金",
            "v": 0.87,
            "prevV": 23.44,
            "yoy": -96.3
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          },
          {
            "name": "（自動車取得税交付金）",
            "v": 0,
            "prevV": 0.00001,
            "yoy": -100
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "福祉費",
        "v": 6551.45236,
        "prevV": 5841.04002,
        "yoy": 12.2
      },
      {
        "name": "こども青少年費",
        "v": 3196.4595,
        "prevV": 3118.19137,
        "yoy": 2.5
      },
      {
        "name": "教育費",
        "v": 2512.35613,
        "prevV": 2316.37786,
        "yoy": 8.5
      },
      {
        "name": "総務費",
        "v": 1529.00177,
        "prevV": 1550.02864,
        "yoy": -1.4
      },
      {
        "name": "土木費",
        "v": 1508.68131,
        "prevV": 1237.89017,
        "yoy": 21.9
      },
      {
        "name": "公債費",
        "v": 1488.77907,
        "prevV": 1467.29077,
        "yoy": 1.5
      },
      {
        "name": "特別会計繰出金",
        "v": 1373.02751,
        "prevV": 1331.2333,
        "yoy": 3.1
      },
      {
        "name": "健康費",
        "v": 856.89267,
        "prevV": 825.75324,
        "yoy": 3.8
      },
      {
        "name": "住宅費",
        "v": 737.5748,
        "prevV": 641.84577,
        "yoy": 14.9
      },
      {
        "name": "経済戦略費",
        "v": 637.48632,
        "prevV": 565.70969,
        "yoy": 12.7
      },
      {
        "name": "環境費",
        "v": 481.99983,
        "prevV": 443.27681,
        "yoy": 8.7
      },
      {
        "name": "消防費",
        "v": 458.74751,
        "prevV": 425.94469,
        "yoy": 7.7
      },
      {
        "name": "港湾費",
        "v": 252.51078,
        "prevV": 249.97229,
        "yoy": 1
      },
      {
        "name": "大学費",
        "v": 250.48128,
        "prevV": 248.31618,
        "yoy": 0.9
      },
      {
        "name": "議会費",
        "v": 26.76114,
        "prevV": 26.45268,
        "yoy": 1.2
      },
      {
        "name": "予備費",
        "v": 20,
        "prevV": 20,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 大阪市一般会計予算書（議案第60号・款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260715144902/https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
    "originUrl": "https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
    "sourceLocalUrl": "/sources/osaka-yosansho-r8/2026gian60.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 大阪市一般会計予算書（議案第60号・款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260715144902/https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
        "localUrl": "/sources/osaka-yosansho-r8/2026gian60.pdf",
        "source": "www.city.osaka.lg.jp",
        "thumb": "2026gian60.pdf ・ sha256 56c244de872c623d… ・ 2026-07-15 取得"
      }
    ]
  },
  "272191": {
    "muniCode": "272191",
    "muniName": "和泉市",
    "prefName": "大阪府",
    "isPref": false,
    "projects": [
      {
        "name": "（仮称）富秋学園整備事業",
        "amountOku": 59.12885,
        "kan": null,
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
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
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      }
    ],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 182481,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 904,
    "prevTotalOku": 832,
    "yoyLabel": "+8.7%",
    "prevBasis": "当初",
    "prevNote": "",
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
    "isPref": false,
    "projects": [
      {
        "name": "障害福祉サービス給付事業",
        "amountOku": 41.67303,
        "kan": null,
        "shisaku": "障がい者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.119",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=119"
      },
      {
        "name": "児童手当支給費",
        "amountOku": 37.23126,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "私立保育園運営費",
        "amountOku": 31.7219,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "介護保険特別会計繰出金",
        "amountOku": 27.60644,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "生活保護扶助費",
        "amountOku": 26.158,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "山口県後期高齢者医療広域",
        "amountOku": 24.435,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "認定こども園運営費",
        "amountOku": 21.94603,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "公共下水道会計負担金",
        "amountOku": 19.17812,
        "kan": null,
        "shisaku": "適切な汚水処理による水環境の保全",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.135",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=135"
      },
      {
        "name": "新本庁舎整備事業費",
        "amountOku": 16.28043,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "国民健康保険特別会計繰出",
        "amountOku": 14.69093,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "障害児施設サービス給付事",
        "amountOku": 13.60374,
        "kan": null,
        "shisaku": "障がい者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
      },
      {
        "name": "清掃工場管理運営費",
        "amountOku": 11.44752,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      },
      {
        "name": "予防接種事業費",
        "amountOku": 11.28782,
        "kan": null,
        "shisaku": "健康づくりの推進と地域医療の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.117",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=117"
      },
      {
        "name": "学校給食運営費",
        "amountOku": 11.04549,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "平川地域交流センター建設",
        "amountOku": 10.53446,
        "kan": null,
        "shisaku": "安心して暮らせる日常生活圏の形成",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.152",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=152"
      },
      {
        "name": "放課後児童クラブ運営費",
        "amountOku": 10.09233,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "後期高齢者医療特別会計繰",
        "amountOku": 9.75662,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "仁保の郷整備事業費",
        "amountOku": 9.22714,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
      },
      {
        "name": "こども医療費助成事業費",
        "amountOku": 8.21539,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "消防指令センター共同整備",
        "amountOku": 8.10306,
        "kan": null,
        "shisaku": "消防・救急体制の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.133",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=133"
      },
      {
        "name": "重度心身障害者医療費助成",
        "amountOku": 7.62394,
        "kan": null,
        "shisaku": "障がい者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
      },
      {
        "name": "中小企業等金融対策事業費",
        "amountOku": 7.26042,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
      },
      {
        "name": "生活道路改良事業費",
        "amountOku": 7.18947,
        "kan": null,
        "shisaku": "快適な道路交通網の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
      },
      {
        "name": "児童扶養手当等支給事業費",
        "amountOku": 7.10087,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "市立保育園管理運営費",
        "amountOku": 7.00427,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "小学校施設長寿命化事業費",
        "amountOku": 5.6949,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "海岸保全施設整備事業費",
        "amountOku": 5.09373,
        "kan": null,
        "shisaku": "防災対策の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.130",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=130"
      },
      {
        "name": "立地等奨励金",
        "amountOku": 4.9893,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
      },
      {
        "name": "養護老人ホーム措置費",
        "amountOku": 4.42505,
        "kan": null,
        "shisaku": "高齢者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.118",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=118"
      },
      {
        "name": "乳幼児医療費助成事業費",
        "amountOku": 4.42392,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "山口市中心市街地周辺地区",
        "amountOku": 4.182,
        "kan": null,
        "shisaku": "コンパクトで暮らしやすいまちづくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.139",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=139"
      },
      {
        "name": "中学校ＩＣＴ教育推進事業費",
        "amountOku": 3.87521,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.125",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=125"
      },
      {
        "name": "小学校管理運営費",
        "amountOku": 3.85139,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "庁舎維持管理費",
        "amountOku": 3.78484,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "多面的機能支払交付金事業",
        "amountOku": 3.70108,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.148",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=148"
      },
      {
        "name": "地域型保育運営費",
        "amountOku": 3.62061,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "橋りょう長寿命化対策事業",
        "amountOku": 3.57079,
        "kan": null,
        "shisaku": "快適な道路交通網の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
      },
      {
        "name": "ＷＡＮ関連事業費",
        "amountOku": 3.55156,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "常備消防自動車整備事業費",
        "amountOku": 3.53237,
        "kan": null,
        "shisaku": "消防・救急体制の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.133",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=133"
      },
      {
        "name": "産業交流拠点施設管理運営",
        "amountOku": 3.37802,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
      },
      {
        "name": "鋳銭司第二団地整備事業特",
        "amountOku": 3.37079,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
      },
      {
        "name": "ごみ収集運搬費",
        "amountOku": 3.3271,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      },
      {
        "name": "電算システム開発事業費",
        "amountOku": 3.30018,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "中学校施設長寿命化事業費",
        "amountOku": 3.23948,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "地域包括支援センター運営",
        "amountOku": 3.20311,
        "kan": null,
        "shisaku": "高齢者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.118",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=118"
      },
      {
        "name": "ふるさと産品営業推進事業",
        "amountOku": 3.1231,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
      },
      {
        "name": "私立保育園特別保育事業費",
        "amountOku": 2.97504,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "山口情報芸術センター管理",
        "amountOku": 2.89757,
        "kan": null,
        "shisaku": "文化・芸術・歴史の継承と創造",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.126",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=126"
      },
      {
        "name": "中間処理センター管理費",
        "amountOku": 2.89445,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      },
      {
        "name": "市議会議員報酬等",
        "amountOku": 2.7358,
        "kan": null,
        "shisaku": "公正、確実な事務の執行",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.157",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=157"
      },
      {
        "name": "社会福祉協議会助成事業費",
        "amountOku": 2.69291,
        "kan": null,
        "shisaku": "地域福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
      },
      {
        "name": "図書館管理運営費",
        "amountOku": 2.58986,
        "kan": null,
        "shisaku": "生涯学習・社会教育の推進",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.125",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=125"
      },
      {
        "name": "農業集落排水事業経営支援",
        "amountOku": 2.58969,
        "kan": null,
        "shisaku": "適切な汚水処理による水環境の保全",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.135",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=135"
      },
      {
        "name": "湯田温泉まちなか整備事業",
        "amountOku": 2.53987,
        "kan": null,
        "shisaku": "コンパクトで暮らしやすいまちづくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.138",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=138"
      },
      {
        "name": "県事業負担金",
        "amountOku": 2.5374,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.148",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=148"
      },
      {
        "name": "山口情報芸術センター企画",
        "amountOku": 2.49695,
        "kan": null,
        "shisaku": "文化・芸術・歴史の継承と創造",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.126",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=126"
      },
      {
        "name": "中山間地域等直接支払事業",
        "amountOku": 2.46003,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.147",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=147"
      },
      {
        "name": "道路維持補修事業費",
        "amountOku": 2.43057,
        "kan": null,
        "shisaku": "快適な道路交通網の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
      },
      {
        "name": "幹線バス確保維持事業費",
        "amountOku": 2.40117,
        "kan": null,
        "shisaku": "持続可能な公共交通の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.142",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=142"
      },
      {
        "name": "環境センター管理運営費",
        "amountOku": 2.39738,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      }
    ],
    "execution": [],
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185982,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 969,
    "prevTotalOku": 1092,
    "yoyLabel": "-11.3%",
    "prevBasis": "当初",
    "prevNote": "",
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
  },
  "401307": {
    "muniCode": "401307",
    "muniName": "福岡市",
    "prefName": "福岡県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 1608140,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 11318.11,
    "prevTotalOku": 11128.3,
    "yoyLabel": "+1.7%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 4263.20009,
        "prevV": 4034.58594,
        "yoy": 5.7
      },
      {
        "name": "国庫支出金",
        "v": 2297.02922,
        "prevV": 2218.0737,
        "yoy": 3.6
      },
      {
        "name": "諸収入",
        "v": 1779.59303,
        "prevV": 1986.43127,
        "yoy": -10.4
      },
      {
        "name": "県支出金",
        "v": 626.97122,
        "prevV": 555.0106,
        "yoy": 13
      },
      {
        "name": "市債",
        "v": 531.02333,
        "prevV": 545.17333,
        "yoy": -2.6
      },
      {
        "name": "地方消費税交付金",
        "v": 495.91,
        "prevV": 460.95,
        "yoy": 7.6
      },
      {
        "name": "地方交付税",
        "v": 435,
        "prevV": 495,
        "yoy": -12.1
      },
      {
        "name": "使用料及び手数料",
        "v": 278.22557,
        "prevV": 278.29492,
        "yoy": 0
      },
      {
        "name": "その他",
        "v": 611.15754,
        "prevV": 554.7802299999998,
        "yoy": null,
        "children": [
          {
            "name": "繰入金",
            "v": 209.02814,
            "prevV": 157.86186,
            "yoy": 32.4
          },
          {
            "name": "地方譲与税",
            "v": 67,
            "prevV": 70.36,
            "yoy": -4.8
          },
          {
            "name": "法人事業税交付金",
            "v": 62.41,
            "prevV": 59.03,
            "yoy": 5.7
          },
          {
            "name": "分担金及び負担金",
            "v": 59.27412,
            "prevV": 80.31011,
            "yoy": -26.2
          },
          {
            "name": "地方特例交付金",
            "v": 50.53,
            "prevV": 18.1,
            "yoy": 179.2
          },
          {
            "name": "財産収入",
            "v": 46.17513,
            "prevV": 45.18928,
            "yoy": 2.2
          },
          {
            "name": "寄附金",
            "v": 43.07015,
            "prevV": 33.32898,
            "yoy": 29.2
          },
          {
            "name": "軽油引取税交付金",
            "v": 25.87,
            "prevV": 50.99,
            "yoy": -49.3
          },
          {
            "name": "配当割交付金",
            "v": 16.66,
            "prevV": 14.42,
            "yoy": 15.5
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 16.62,
            "prevV": 5.68,
            "yoy": 192.6
          },
          {
            "name": "利子割交付金",
            "v": 5.84,
            "prevV": 0.89,
            "yoy": 556.2
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 4.1,
            "prevV": 4.1,
            "yoy": 0
          },
          {
            "name": "分離課税所得割交付金",
            "v": 2.66,
            "prevV": 2.66,
            "yoy": 0
          },
          {
            "name": "繰越金",
            "v": 1,
            "prevV": 1,
            "yoy": 0
          },
          {
            "name": "国有提供施設等所在市助成交付金",
            "v": 0.57,
            "prevV": 0.56,
            "yoy": 1.8
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.33,
            "prevV": 0.34,
            "yoy": -2.9
          },
          {
            "name": "環境性能割交付金",
            "v": 0.02,
            "prevV": 9.96,
            "yoy": -99.8
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "保健福祉費",
        "v": 2634.7688,
        "prevV": 2606.07727,
        "yoy": 1.1
      },
      {
        "name": "こども育成費",
        "v": 1777.30337,
        "prevV": 1681.12263,
        "yoy": 5.7
      },
      {
        "name": "経済観光文化費",
        "v": 1751.46143,
        "prevV": 1993.95812,
        "yoy": -12.2
      },
      {
        "name": "教育費",
        "v": 1653.65489,
        "prevV": 1528.90994,
        "yoy": 8.2
      },
      {
        "name": "公債費",
        "v": 901.55934,
        "prevV": 915.31123,
        "yoy": -1.5
      },
      {
        "name": "総務費",
        "v": 739.21422,
        "prevV": 683.8827,
        "yoy": 8.1
      },
      {
        "name": "土木費",
        "v": 551.22571,
        "prevV": 483.98996,
        "yoy": 13.9
      },
      {
        "name": "都市計画費",
        "v": 523.22153,
        "prevV": 502.34455,
        "yoy": 4.2
      },
      {
        "name": "環境費",
        "v": 357.29937,
        "prevV": 326.79348,
        "yoy": 9.3
      },
      {
        "name": "消防費",
        "v": 208.80466,
        "prevV": 198.08499,
        "yoy": 5.4
      },
      {
        "name": "港湾空港費",
        "v": 101.3497,
        "prevV": 101.6313,
        "yoy": -0.3
      },
      {
        "name": "農林水産業費",
        "v": 95.81807,
        "prevV": 83.6638,
        "yoy": 14.5
      },
      {
        "name": "議会費",
        "v": 18.76555,
        "prevV": 19.13149,
        "yoy": -1.9
      },
      {
        "name": "予備費",
        "v": 3,
        "prevV": 3,
        "yoy": 0
      },
      {
        "name": "諸支出金",
        "v": 0.61336,
        "prevV": 0.34854,
        "yoy": 76
      },
      {
        "name": "災害復旧費",
        "v": 0.05,
        "prevV": 0.05,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 福岡市当初予算案計数資料（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260715084154/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
    "originUrl": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
    "sourceLocalUrl": "/sources/fukuoka-yosansho-r8/04_R8_keisuusiryou.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 福岡市当初予算案計数資料（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260715084154/https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
        "localUrl": "/sources/fukuoka-yosansho-r8/04_R8_keisuusiryou.pdf",
        "source": "www.city.fukuoka.lg.jp",
        "thumb": "04_R8_keisuusiryou.pdf ・ sha256 ca0865888b352040… ・ 2026-07-15 取得"
      }
    ]
  },
  "011002": {
    "muniCode": "011002",
    "muniName": "札幌市",
    "prefName": "北海道",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 1955678,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 13185,
    "prevTotalOku": 12666,
    "yoyLabel": "+4.1%",
    "prevBasis": "当初",
    "prevNote": "",
    "revenue": [
      {
        "name": "市税",
        "v": 3987,
        "prevV": 3723,
        "yoy": 7.1
      },
      {
        "name": "国庫支出金",
        "v": 3202.62366,
        "prevV": 3077.30121,
        "yoy": 4.1
      },
      {
        "name": "地方交付税",
        "v": 1569,
        "prevV": 1563,
        "yoy": 0.4
      },
      {
        "name": "諸収入",
        "v": 1090.36615,
        "prevV": 1153.18018,
        "yoy": -5.4
      },
      {
        "name": "市債",
        "v": 928.46,
        "prevV": 854.79,
        "yoy": 8.6
      },
      {
        "name": "道支出金",
        "v": 848.64632,
        "prevV": 771.71883,
        "yoy": 10
      },
      {
        "name": "地方消費税交付金",
        "v": 630.32,
        "prevV": 542.48,
        "yoy": 16.2
      },
      {
        "name": "繰入金",
        "v": 286.793,
        "prevV": 312.11043,
        "yoy": -8.1
      },
      {
        "name": "その他",
        "v": 641.7908700000002,
        "prevV": 661.47935,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 240.61254,
            "prevV": 228.85668,
            "yoy": 5.1
          },
          {
            "name": "寄附金",
            "v": 67.71271,
            "prevV": 57.74549,
            "yoy": 17.3
          },
          {
            "name": "地方特例交付金",
            "v": 64.65,
            "prevV": 23.52,
            "yoy": 174.9
          },
          {
            "name": "財産収入",
            "v": 54.69177,
            "prevV": 104.6858,
            "yoy": -47.8
          },
          {
            "name": "地方譲与税",
            "v": 54.09,
            "prevV": 56.42,
            "yoy": -4.1
          },
          {
            "name": "法人事業税交付金",
            "v": 47.95,
            "prevV": 47.46,
            "yoy": 1
          },
          {
            "name": "軽油引取税交付金",
            "v": 38.18,
            "prevV": 71.08,
            "yoy": -46.3
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 30.5,
            "prevV": 16.72,
            "yoy": 82.4
          },
          {
            "name": "配当割交付金",
            "v": 12.22,
            "prevV": 9.66,
            "yoy": 26.5
          },
          {
            "name": "分担金及び負担金",
            "v": 11.10375,
            "prevV": 32.70128,
            "yoy": -66
          },
          {
            "name": "利子割交付金",
            "v": 9.71,
            "prevV": 2.51,
            "yoy": 286.9
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 4.97,
            "prevV": 5.24,
            "yoy": -5.2
          },
          {
            "name": "分離課税所得割交付金",
            "v": 3.94,
            "prevV": 3.45,
            "yoy": 14.2
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.94,
            "prevV": 0.92,
            "yoy": 2.2
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 0.52,
            "prevV": 0.51,
            "yoy": 2
          },
          {
            "name": "繰越金",
            "v": 0.0001,
            "prevV": 0.0001,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "保健福祉費",
        "v": 5286.47192,
        "prevV": 5124.03993,
        "yoy": 3.2
      },
      {
        "name": "職員費",
        "v": 1749.289,
        "prevV": 1634.306,
        "yoy": 7
      },
      {
        "name": "土木費",
        "v": 1380.13013,
        "prevV": 1272.20481,
        "yoy": 8.5
      },
      {
        "name": "経済費",
        "v": 1130.72228,
        "prevV": 1031.89189,
        "yoy": 9.6
      },
      {
        "name": "公債費",
        "v": 1083.08,
        "prevV": 931.62,
        "yoy": 16.3
      },
      {
        "name": "諸支出金",
        "v": 937.37101,
        "prevV": 895.21573,
        "yoy": 4.7
      },
      {
        "name": "教育費",
        "v": 681.54942,
        "prevV": 726.1276,
        "yoy": -6.1
      },
      {
        "name": "総務費",
        "v": 560.00538,
        "prevV": 566.56234,
        "yoy": -1.2
      },
      {
        "name": "環境費",
        "v": 283.66866,
        "prevV": 345.02631,
        "yoy": -17.8
      },
      {
        "name": "消防費",
        "v": 71.39409,
        "prevV": 117.34843,
        "yoy": -39.2
      },
      {
        "name": "議会費",
        "v": 16.31811,
        "prevV": 16.65696,
        "yoy": -2
      },
      {
        "name": "予備費",
        "v": 5,
        "prevV": 5,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 札幌市各会計予算説明書（一般会計・総括表）",
    "sourceUrl": "https://web.archive.org/web/20260715083207/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
    "originUrl": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
    "sourceLocalUrl": "/sources/sapporo-yosansetsumeisho-r8/02_r8_yosansetsumeisho_ippan.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 札幌市各会計予算説明書（一般会計・総括表）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260715083207/https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
        "localUrl": "/sources/sapporo-yosansetsumeisho-r8/02_r8_yosansetsumeisho_ippan.pdf",
        "source": "www.city.sapporo.jp",
        "thumb": "02_r8_yosansetsumeisho_ippan.pdf ・ sha256 897c2bb58c50b009… ・ 2026-07-15 取得"
      }
    ]
  }
};

/** budget 階層（予算ベースの款別ダッシュボードを持つ）自治体の団体コード */
export const BUDGET_MUNIS: string[] = ["111007","141003","141305","190004","192023","192040","192066","192082","192091","192112","192139","194301","222038","231002","232076","271004","272191","352039","401307","011002"];
