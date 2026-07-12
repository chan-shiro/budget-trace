// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 財政事情の公表（R7・速報）／決算状況 収入支出詳細（R6〜R1・確定。R3 は資料消失により欠落）
// 金額は億円（資料の万円値を千円経由で変換した正確値）。率は資料記載値

export interface KofuExecRow {
  name: string;
  /** 予算現額（億円・補正/繰越込み） */
  budgetOku: number;
  /** 収入済額（歳入）/ 支出済額（歳出）（億円） */
  settledOku: number;
  /** 資料記載の収入率/執行率（%）。予算現額0の款は null */
  ratePct: number | null;
  ref: string;
  refLabel: string;
  /** 内訳（市税の税目別予算現額など。確定値ページのみ） */
  breakdownNote?: string;
}

export interface KofuExecutionYear {
  /** 年度（"R7" など） */
  fy: string;
  /** 済額の基準（速報 = 出納整理前 / 確定 = 決算値） */
  basis: "速報" | "確定";
  fyLabel: string;
  asOf: string;
  asOfNote: string;
  population: number | null;
  revenueBudgetTotalOku: number;
  revenueSettledTotalOku: number;
  expenditureBudgetTotalOku: number;
  expenditureSettledTotalOku: number;
  revenue: KofuExecRow[];
  expenditure: KofuExecRow[];
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先） */
  sourceUrl: string;
  /** 発行元の元 URL */
  originUrl: string;
  /** 自サーバー配信の原本コピー（PDF のみ。HTML ページは空文字） */
  sourceLocalUrl: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/** 収録済みの執行状況（新しい年度順。R3 は資料消失により欠落） */
export const KOFU_EXECUTION_YEARS: KofuExecutionYear[] = [
  {
    "fy": "R7",
    "basis": "速報",
    "fyLabel": "令和7年度（令和8年3月31日現在）",
    "asOf": "令和8年3月31日現在",
    "asOfNote": "出納整理期間前の年度末速報値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": 181461,
    "revenueBudgetTotalOku": 1063.6108,
    "revenueSettledTotalOku": 883.1705,
    "expenditureBudgetTotalOku": 1063.6108,
    "expenditureSettledTotalOku": 803.833,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 308.7456,
        "settledOku": 293.5643,
        "ratePct": 95.1,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.2189,
        "settledOku": 4.1549,
        "ratePct": 98.5,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.2638,
        "settledOku": 0.5179,
        "ratePct": 196.3,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 1.7909,
        "settledOku": 2.3091,
        "ratePct": 128.9,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 3.0402,
        "settledOku": 3.7831,
        "ratePct": 124.4,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "法人事業税交付金",
        "budgetOku": 6.595,
        "settledOku": 6.4611,
        "ratePct": 98,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 51.3647,
        "settledOku": 58.0398,
        "ratePct": 113,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.7574,
        "settledOku": 0.5843,
        "ratePct": 77.1,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 1.5713,
        "settledOku": 1.5242,
        "ratePct": 97,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "地方交付税",
        "budgetOku": 127.9021,
        "settledOku": 129.4324,
        "ratePct": 101.2,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.2473,
        "settledOku": 0.2603,
        "ratePct": 105.3,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 3.611,
        "settledOku": 1.2606,
        "ratePct": 34.9,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.5198,
        "settledOku": 7.5353,
        "ratePct": 79.2,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 226.1911,
        "settledOku": 186.318,
        "ratePct": 82.4,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "県支出金",
        "budgetOku": 79.3476,
        "settledOku": 46.3058,
        "ratePct": 58.4,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "財産収入",
        "budgetOku": 1.2597,
        "settledOku": 1.3814,
        "ratePct": 109.7,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "寄附金",
        "budgetOku": 110.9172,
        "settledOku": 101.4305,
        "ratePct": 91.4,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "繰入金",
        "budgetOku": 32.9498,
        "settledOku": 0.0524,
        "ratePct": 0.2,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "繰越金",
        "budgetOku": 10.0556,
        "settledOku": 10.0556,
        "ratePct": 100,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "諸収入",
        "budgetOku": 28.2148,
        "settledOku": 16.0611,
        "ratePct": 56.9,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      },
      {
        "name": "市債",
        "budgetOku": 55.047,
        "settledOku": 12.1384,
        "ratePct": 22.1,
        "ref": "01ipankaikei.pdf#p1",
        "refLabel": "財政事情 p.1"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.4571,
        "settledOku": 5.3293,
        "ratePct": 97.7,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "総務費",
        "budgetOku": 216.4725,
        "settledOku": 115.6933,
        "ratePct": 53.4,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "民生費",
        "budgetOku": 415.5682,
        "settledOku": 349.2324,
        "ratePct": 84,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "衛生費",
        "budgetOku": 106.6005,
        "settledOku": 93.2422,
        "ratePct": 87.5,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "労働費",
        "budgetOku": 1.6431,
        "settledOku": 1.5679,
        "ratePct": 95.4,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 12.1211,
        "settledOku": 7.86,
        "ratePct": 64.8,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "商工費",
        "budgetOku": 26.4974,
        "settledOku": 12.4934,
        "ratePct": 47.1,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "土木費",
        "budgetOku": 67.9199,
        "settledOku": 42.8815,
        "ratePct": 63.1,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "消防費",
        "budgetOku": 28.2629,
        "settledOku": 22.4304,
        "ratePct": 79.4,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "教育費",
        "budgetOku": 98.1186,
        "settledOku": 68.8239,
        "ratePct": 70.1,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0,
        "settledOku": 0,
        "ratePct": null,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "公債費",
        "budgetOku": 84.6201,
        "settledOku": 84.1178,
        "ratePct": 99.4,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "諸支出金",
        "budgetOku": 0.1623,
        "settledOku": 0.1609,
        "ratePct": 99.1,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      },
      {
        "name": "予備費",
        "budgetOku": 0.1671,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "01ipankaikei.pdf#p2",
        "refLabel": "財政事情 p.2"
      }
    ],
    "sourceTitle": "令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）",
    "sourceUrl": "https://web.archive.org/web/20260712091231/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf",
    "sourceLocalUrl": "/sources/kofu-zaisei-jokyo-r7/01ipankaikei.pdf",
    "evidence": [
      {
        "title": "令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260712091231/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf",
        "localUrl": "/sources/kofu-zaisei-jokyo-r7/01ipankaikei.pdf",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "01ipankaikei.pdf ・ sha256 92529cd6bd059b35… ・ 2026-07-11 取得"
      }
    ]
  },
  {
    "fy": "R6",
    "basis": "確定",
    "fyLabel": "令和6年度（決算・確定値）",
    "asOf": "決算（確定値）",
    "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": null,
    "revenueBudgetTotalOku": 966.5001,
    "revenueSettledTotalOku": 916.4487,
    "expenditureBudgetTotalOku": 966.5001,
    "expenditureSettledTotalOku": 900.3931,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 294.6777,
        "settledOku": 295.7444,
        "ratePct": 100.4,
        "ref": "r6ippansyousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目",
        "breakdownNote": "市民税 138億円・固定資産税 118億円・都市計画税 19.7億円・市たばこ税 13.7億円・軽自動車税 6.6億円・入湯税 4,694万円"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.2575,
        "settledOku": 4.2456,
        "ratePct": 99.7,
        "ref": "r6ippansyousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.0774,
        "settledOku": 0.1262,
        "ratePct": 163,
        "ref": "r6ippansyousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 1.436,
        "settledOku": 2.2795,
        "ratePct": 158.7,
        "ref": "r6ippansyousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 1.2981,
        "settledOku": 3.1608,
        "ratePct": 243.5,
        "ref": "r6ippansyousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "法人事業税交付金",
        "budgetOku": 6.0348,
        "settledOku": 6.1007,
        "ratePct": 101.1,
        "ref": "r6ippansyousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 51.0025,
        "settledOku": 53.7449,
        "ratePct": 105.4,
        "ref": "r6ippansyousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.7205,
        "settledOku": 0.6225,
        "ratePct": 86.4,
        "ref": "r6ippansyousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 9.6198,
        "settledOku": 9.6432,
        "ratePct": 100.2,
        "ref": "r6ippansyousai.html#row16",
        "refLabel": "決算状況 収入支出詳細 16行目"
      },
      {
        "name": "地方交付税",
        "budgetOku": 122.4418,
        "settledOku": 123.0652,
        "ratePct": 100.5,
        "ref": "r6ippansyousai.html#row17",
        "refLabel": "決算状況 収入支出詳細 17行目"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.3406,
        "settledOku": 0.2491,
        "ratePct": 73.1,
        "ref": "r6ippansyousai.html#row18",
        "refLabel": "決算状況 収入支出詳細 18行目"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 3.3892,
        "settledOku": 2.4107,
        "ratePct": 71.1,
        "ref": "r6ippansyousai.html#row19",
        "refLabel": "決算状況 収入支出詳細 19行目"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.4134,
        "settledOku": 8.88,
        "ratePct": 94.3,
        "ref": "r6ippansyousai.html#row20",
        "refLabel": "決算状況 収入支出詳細 20行目"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 201.824,
        "settledOku": 179.5101,
        "ratePct": 88.9,
        "ref": "r6ippansyousai.html#row21",
        "refLabel": "決算状況 収入支出詳細 21行目"
      },
      {
        "name": "県支出金",
        "budgetOku": 71.9731,
        "settledOku": 67.522,
        "ratePct": 93.8,
        "ref": "r6ippansyousai.html#row22",
        "refLabel": "決算状況 収入支出詳細 22行目"
      },
      {
        "name": "財産収入",
        "budgetOku": 1.0828,
        "settledOku": 2.1812,
        "ratePct": 201.4,
        "ref": "r6ippansyousai.html#row23",
        "refLabel": "決算状況 収入支出詳細 23行目"
      },
      {
        "name": "寄付金",
        "budgetOku": 80.1382,
        "settledOku": 74.3342,
        "ratePct": 92.8,
        "ref": "r6ippansyousai.html#row24",
        "refLabel": "決算状況 収入支出詳細 24行目"
      },
      {
        "name": "繰入金",
        "budgetOku": 26.6641,
        "settledOku": 22.9651,
        "ratePct": 86.1,
        "ref": "r6ippansyousai.html#row25",
        "refLabel": "決算状況 収入支出詳細 25行目"
      },
      {
        "name": "繰越金",
        "budgetOku": 12.8391,
        "settledOku": 12.8391,
        "ratePct": 100,
        "ref": "r6ippansyousai.html#row26",
        "refLabel": "決算状況 収入支出詳細 26行目"
      },
      {
        "name": "諸収入",
        "budgetOku": 22.9165,
        "settledOku": 19.7318,
        "ratePct": 86.1,
        "ref": "r6ippansyousai.html#row27",
        "refLabel": "決算状況 収入支出詳細 27行目"
      },
      {
        "name": "市債",
        "budgetOku": 44.353,
        "settledOku": 27.0924,
        "ratePct": 61.1,
        "ref": "r6ippansyousai.html#row28",
        "refLabel": "決算状況 収入支出詳細 28行目"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.4046,
        "settledOku": 5.2855,
        "ratePct": 97.8,
        "ref": "r6ippansyousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目"
      },
      {
        "name": "総務費",
        "budgetOku": 173.5115,
        "settledOku": 166.3721,
        "ratePct": 95.9,
        "ref": "r6ippansyousai.html#row3",
        "refLabel": "決算状況 収入支出詳細 3行目"
      },
      {
        "name": "民生費",
        "budgetOku": 387.1314,
        "settledOku": 367.6782,
        "ratePct": 95,
        "ref": "r6ippansyousai.html#row4",
        "refLabel": "決算状況 収入支出詳細 4行目"
      },
      {
        "name": "衛生費",
        "budgetOku": 100.1662,
        "settledOku": 96.5182,
        "ratePct": 96.4,
        "ref": "r6ippansyousai.html#row5",
        "refLabel": "決算状況 収入支出詳細 5行目"
      },
      {
        "name": "労働費",
        "budgetOku": 1.8969,
        "settledOku": 1.8364,
        "ratePct": 96.8,
        "ref": "r6ippansyousai.html#row6",
        "refLabel": "決算状況 収入支出詳細 6行目"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 11.3402,
        "settledOku": 9.3174,
        "ratePct": 82.2,
        "ref": "r6ippansyousai.html#row7",
        "refLabel": "決算状況 収入支出詳細 7行目"
      },
      {
        "name": "商工費",
        "budgetOku": 26.4359,
        "settledOku": 16.2884,
        "ratePct": 61.6,
        "ref": "r6ippansyousai.html#row8",
        "refLabel": "決算状況 収入支出詳細 8行目"
      },
      {
        "name": "土木費",
        "budgetOku": 68.2313,
        "settledOku": 56.3976,
        "ratePct": 82.7,
        "ref": "r6ippansyousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "消防費",
        "budgetOku": 24.4087,
        "settledOku": 23.1155,
        "ratePct": 94.7,
        "ref": "r6ippansyousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "教育費",
        "budgetOku": 80.7688,
        "settledOku": 70.5863,
        "ratePct": 87.4,
        "ref": "r6ippansyousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r6ippansyousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "公債費",
        "budgetOku": 86.9069,
        "settledOku": 86.8629,
        "ratePct": 99.9,
        "ref": "r6ippansyousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "諸支出金",
        "budgetOku": 0.1418,
        "settledOku": 0.1346,
        "ratePct": 94.9,
        "ref": "r6ippansyousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "予備費",
        "budgetOku": 0.1559,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r6ippansyousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      }
    ],
    "sourceTitle": "令和6年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
    "sourceUrl": "https://web.archive.org/web/20260712125856/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r6kessan/r6ippansyousai.html",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r6kessan/r6ippansyousai.html",
    "sourceLocalUrl": "",
    "evidence": [
      {
        "title": "令和6年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "type": "Web",
        "url": "https://web.archive.org/web/20260712125856/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r6kessan/r6ippansyousai.html",
        "localUrl": "",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r6ippansyousai.html ・ sha256 4f8155ca6cb06915… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R5",
    "basis": "確定",
    "fyLabel": "令和5年度（決算・確定値）",
    "asOf": "決算（確定値）",
    "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": null,
    "revenueBudgetTotalOku": 914.6395,
    "revenueSettledTotalOku": 874.7084,
    "expenditureBudgetTotalOku": 914.6395,
    "expenditureSettledTotalOku": 852.8693,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 294.2569,
        "settledOku": 299.5192,
        "ratePct": 101.8,
        "ref": "r5ippansyousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目",
        "breakdownNote": "市民税 141億円・固定資産税 118億円・都市計画税 19.9億円・市たばこ税 13.9億円・軽自動車税 6.4億円・入湯税 4,408万円"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.2603,
        "settledOku": 4.1999,
        "ratePct": 98.6,
        "ref": "r5ippansyousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.0798,
        "settledOku": 0.0913,
        "ratePct": 114.4,
        "ref": "r5ippansyousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 1.6901,
        "settledOku": 1.604,
        "ratePct": 94.9,
        "ref": "r5ippansyousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 0.8771,
        "settledOku": 1.8482,
        "ratePct": 210.7,
        "ref": "r5ippansyousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "法人事業税交付金",
        "budgetOku": 5.7981,
        "settledOku": 6.027,
        "ratePct": 103.9,
        "ref": "r5ippansyousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 51.8575,
        "settledOku": 51.3161,
        "ratePct": 99,
        "ref": "r5ippansyousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.329,
        "settledOku": 0.5032,
        "ratePct": 152.9,
        "ref": "r5ippansyousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 1.6445,
        "settledOku": 1.7701,
        "ratePct": 107.6,
        "ref": "r5ippansyousai.html#row16",
        "refLabel": "決算状況 収入支出詳細 16行目"
      },
      {
        "name": "地方交付税",
        "budgetOku": 114.3451,
        "settledOku": 114.3925,
        "ratePct": 100,
        "ref": "r5ippansyousai.html#row17",
        "refLabel": "決算状況 収入支出詳細 17行目"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.3897,
        "settledOku": 0.2637,
        "ratePct": 67.7,
        "ref": "r5ippansyousai.html#row18",
        "refLabel": "決算状況 収入支出詳細 18行目"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 2.9692,
        "settledOku": 2.6639,
        "ratePct": 89.7,
        "ref": "r5ippansyousai.html#row19",
        "refLabel": "決算状況 収入支出詳細 19行目"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.298,
        "settledOku": 9.101,
        "ratePct": 97.9,
        "ref": "r5ippansyousai.html#row20",
        "refLabel": "決算状況 収入支出詳細 20行目"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 212.3437,
        "settledOku": 195.2692,
        "ratePct": 92,
        "ref": "r5ippansyousai.html#row21",
        "refLabel": "決算状況 収入支出詳細 21行目"
      },
      {
        "name": "県支出金",
        "budgetOku": 72.248,
        "settledOku": 67.6601,
        "ratePct": 93.6,
        "ref": "r5ippansyousai.html#row22",
        "refLabel": "決算状況 収入支出詳細 22行目"
      },
      {
        "name": "財産収入",
        "budgetOku": 0.897,
        "settledOku": 0.8951,
        "ratePct": 99.8,
        "ref": "r5ippansyousai.html#row23",
        "refLabel": "決算状況 収入支出詳細 23行目"
      },
      {
        "name": "寄付金",
        "budgetOku": 45.3377,
        "settledOku": 41.5995,
        "ratePct": 91.8,
        "ref": "r5ippansyousai.html#row24",
        "refLabel": "決算状況 収入支出詳細 24行目"
      },
      {
        "name": "繰入金",
        "budgetOku": 22.0569,
        "settledOku": 13.9866,
        "ratePct": 63.4,
        "ref": "r5ippansyousai.html#row25",
        "refLabel": "決算状況 収入支出詳細 25行目"
      },
      {
        "name": "繰越金",
        "budgetOku": 10.8726,
        "settledOku": 10.8725,
        "ratePct": 100,
        "ref": "r5ippansyousai.html#row26",
        "refLabel": "決算状況 収入支出詳細 26行目"
      },
      {
        "name": "諸収入",
        "budgetOku": 19.1233,
        "settledOku": 18.0995,
        "ratePct": 94.6,
        "ref": "r5ippansyousai.html#row27",
        "refLabel": "決算状況 収入支出詳細 27行目"
      },
      {
        "name": "市債",
        "budgetOku": 43.965,
        "settledOku": 33.0258,
        "ratePct": 75.1,
        "ref": "r5ippansyousai.html#row28",
        "refLabel": "決算状況 収入支出詳細 28行目"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.3547,
        "settledOku": 5.2335,
        "ratePct": 97.7,
        "ref": "r5ippansyousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目"
      },
      {
        "name": "総務費",
        "budgetOku": 118.7557,
        "settledOku": 112.484,
        "ratePct": 94.7,
        "ref": "r5ippansyousai.html#row3",
        "refLabel": "決算状況 収入支出詳細 3行目"
      },
      {
        "name": "民生費",
        "budgetOku": 399.0771,
        "settledOku": 381.1004,
        "ratePct": 95.5,
        "ref": "r5ippansyousai.html#row4",
        "refLabel": "決算状況 収入支出詳細 4行目"
      },
      {
        "name": "衛生費",
        "budgetOku": 106.7956,
        "settledOku": 100.7011,
        "ratePct": 94.3,
        "ref": "r5ippansyousai.html#row5",
        "refLabel": "決算状況 収入支出詳細 5行目"
      },
      {
        "name": "労働費",
        "budgetOku": 1.9029,
        "settledOku": 1.8704,
        "ratePct": 98.3,
        "ref": "r5ippansyousai.html#row6",
        "refLabel": "決算状況 収入支出詳細 6行目"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 10.7072,
        "settledOku": 9.5415,
        "ratePct": 89.1,
        "ref": "r5ippansyousai.html#row7",
        "refLabel": "決算状況 収入支出詳細 7行目"
      },
      {
        "name": "商工費",
        "budgetOku": 22.2248,
        "settledOku": 13.0488,
        "ratePct": 58.7,
        "ref": "r5ippansyousai.html#row8",
        "refLabel": "決算状況 収入支出詳細 8行目"
      },
      {
        "name": "土木費",
        "budgetOku": 65.7123,
        "settledOku": 52.2755,
        "ratePct": 79.6,
        "ref": "r5ippansyousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "消防費",
        "budgetOku": 24.4606,
        "settledOku": 23.6804,
        "ratePct": 96.8,
        "ref": "r5ippansyousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "教育費",
        "budgetOku": 69.8825,
        "settledOku": 63.806,
        "ratePct": 91.3,
        "ref": "r5ippansyousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r5ippansyousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "公債費",
        "budgetOku": 89.5726,
        "settledOku": 88.9878,
        "ratePct": 99.3,
        "ref": "r5ippansyousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "諸支出金",
        "budgetOku": 0.1418,
        "settledOku": 0.1399,
        "ratePct": 98.7,
        "ref": "r5ippansyousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "予備費",
        "budgetOku": 0.0517,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r5ippansyousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      }
    ],
    "sourceTitle": "令和5年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
    "sourceUrl": "https://web.archive.org/web/20260712125134/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r5kessan/r5ippansyousai.html",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r5kessan/r5ippansyousai.html",
    "sourceLocalUrl": "",
    "evidence": [
      {
        "title": "令和5年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "type": "Web",
        "url": "https://web.archive.org/web/20260712125134/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r5kessan/r5ippansyousai.html",
        "localUrl": "",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r5ippansyousai.html ・ sha256 59a4a42ca20c946d… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R4",
    "basis": "確定",
    "fyLabel": "令和4年度（決算・確定値）",
    "asOf": "決算（確定値）",
    "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": null,
    "revenueBudgetTotalOku": 948.0148,
    "revenueSettledTotalOku": 902.5585,
    "expenditureBudgetTotalOku": 948.0148,
    "expenditureSettledTotalOku": 882.9359,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 286.8696,
        "settledOku": 294.1092,
        "ratePct": 102.5,
        "ref": "r4ippannsyousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目",
        "breakdownNote": "市民税 137億円・固定資産税 117億円・都市計画税 19.8億円・市たばこ税 13.9億円・軽自動車税 6.3億円・入湯税 3,611万円"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.3743,
        "settledOku": 4.1601,
        "ratePct": 95.1,
        "ref": "r4ippannsyousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.1875,
        "settledOku": 0.1083,
        "ratePct": 57.8,
        "ref": "r4ippannsyousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 1.0392,
        "settledOku": 1.323,
        "ratePct": 127.3,
        "ref": "r4ippannsyousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 1.2081,
        "settledOku": 1.1468,
        "ratePct": 94.9,
        "ref": "r4ippannsyousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "法人事業税交付金",
        "budgetOku": 6.0597,
        "settledOku": 5.9795,
        "ratePct": 98.7,
        "ref": "r4ippannsyousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 50.5713,
        "settledOku": 51.7247,
        "ratePct": 102.3,
        "ref": "r4ippannsyousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.5654,
        "settledOku": 0.5019,
        "ratePct": 88.8,
        "ref": "r4ippannsyousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 1.786,
        "settledOku": 1.7863,
        "ratePct": 100,
        "ref": "r4ippannsyousai.html#row16",
        "refLabel": "決算状況 収入支出詳細 16行目"
      },
      {
        "name": "地方交付税",
        "budgetOku": 109.5858,
        "settledOku": 109.6412,
        "ratePct": 100.1,
        "ref": "r4ippannsyousai.html#row17",
        "refLabel": "決算状況 収入支出詳細 17行目"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.4044,
        "settledOku": 0.3154,
        "ratePct": 78,
        "ref": "r4ippannsyousai.html#row18",
        "refLabel": "決算状況 収入支出詳細 18行目"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 3.2826,
        "settledOku": 2.517,
        "ratePct": 76.7,
        "ref": "r4ippannsyousai.html#row19",
        "refLabel": "決算状況 収入支出詳細 19行目"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.8975,
        "settledOku": 9.2897,
        "ratePct": 93.9,
        "ref": "r4ippannsyousai.html#row20",
        "refLabel": "決算状況 収入支出詳細 20行目"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 223.7784,
        "settledOku": 206.9328,
        "ratePct": 92.5,
        "ref": "r4ippannsyousai.html#row21",
        "refLabel": "決算状況 収入支出詳細 21行目"
      },
      {
        "name": "県支出金",
        "budgetOku": 71.135,
        "settledOku": 67.3992,
        "ratePct": 94.7,
        "ref": "r4ippannsyousai.html#row22",
        "refLabel": "決算状況 収入支出詳細 22行目"
      },
      {
        "name": "財産収入",
        "budgetOku": 2.1335,
        "settledOku": 3.9093,
        "ratePct": 183.2,
        "ref": "r4ippannsyousai.html#row23",
        "refLabel": "決算状況 収入支出詳細 23行目"
      },
      {
        "name": "寄付金",
        "budgetOku": 32.1744,
        "settledOku": 30.4096,
        "ratePct": 94.5,
        "ref": "r4ippannsyousai.html#row24",
        "refLabel": "決算状況 収入支出詳細 24行目"
      },
      {
        "name": "繰入金",
        "budgetOku": 17.5982,
        "settledOku": 1.8233,
        "ratePct": 10.4,
        "ref": "r4ippannsyousai.html#row25",
        "refLabel": "決算状況 収入支出詳細 25行目"
      },
      {
        "name": "繰越金",
        "budgetOku": 21.3825,
        "settledOku": 21.3825,
        "ratePct": 100,
        "ref": "r4ippannsyousai.html#row26",
        "refLabel": "決算状況 収入支出詳細 26行目"
      },
      {
        "name": "諸収入",
        "budgetOku": 22.6904,
        "settledOku": 19.8245,
        "ratePct": 87.4,
        "ref": "r4ippannsyousai.html#row27",
        "refLabel": "決算状況 収入支出詳細 27行目"
      },
      {
        "name": "市債",
        "budgetOku": 81.291,
        "settledOku": 68.2742,
        "ratePct": 84,
        "ref": "r4ippannsyousai.html#row28",
        "refLabel": "決算状況 収入支出詳細 28行目"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.3875,
        "settledOku": 5.2909,
        "ratePct": 98.2,
        "ref": "r4ippannsyousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目"
      },
      {
        "name": "総務費",
        "budgetOku": 112.7527,
        "settledOku": 106.7276,
        "ratePct": 94.7,
        "ref": "r4ippannsyousai.html#row3",
        "refLabel": "決算状況 収入支出詳細 3行目"
      },
      {
        "name": "民生費",
        "budgetOku": 401.1545,
        "settledOku": 377.5244,
        "ratePct": 94.1,
        "ref": "r4ippannsyousai.html#row4",
        "refLabel": "決算状況 収入支出詳細 4行目"
      },
      {
        "name": "衛生費",
        "budgetOku": 126.5397,
        "settledOku": 114.1861,
        "ratePct": 90.2,
        "ref": "r4ippannsyousai.html#row5",
        "refLabel": "決算状況 収入支出詳細 5行目"
      },
      {
        "name": "労働費",
        "budgetOku": 1.9761,
        "settledOku": 1.9287,
        "ratePct": 97.6,
        "ref": "r4ippannsyousai.html#row6",
        "refLabel": "決算状況 収入支出詳細 6行目"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 10.876,
        "settledOku": 10.2976,
        "ratePct": 94.7,
        "ref": "r4ippannsyousai.html#row7",
        "refLabel": "決算状況 収入支出詳細 7行目"
      },
      {
        "name": "商工費",
        "budgetOku": 22.1027,
        "settledOku": 15.3701,
        "ratePct": 69.5,
        "ref": "r4ippannsyousai.html#row8",
        "refLabel": "決算状況 収入支出詳細 8行目"
      },
      {
        "name": "土木費",
        "budgetOku": 54.3467,
        "settledOku": 45.4322,
        "ratePct": 83.6,
        "ref": "r4ippannsyousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "消防費",
        "budgetOku": 23.1562,
        "settledOku": 22.8678,
        "ratePct": 98.8,
        "ref": "r4ippannsyousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "教育費",
        "budgetOku": 75.2948,
        "settledOku": 68.9789,
        "ratePct": 91.6,
        "ref": "r4ippannsyousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r4ippannsyousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "公債費",
        "budgetOku": 113.0158,
        "settledOku": 112.9988,
        "ratePct": 100,
        "ref": "r4ippannsyousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "諸支出金",
        "budgetOku": 1.3384,
        "settledOku": 1.3328,
        "ratePct": 99.6,
        "ref": "r4ippannsyousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "予備費",
        "budgetOku": 0.0737,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r4ippannsyousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      }
    ],
    "sourceTitle": "令和4年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
    "sourceUrl": "https://web.archive.org/web/20260712125433/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04kessan/r4ippannsyousai.html",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04kessan/r4ippannsyousai.html",
    "sourceLocalUrl": "",
    "evidence": [
      {
        "title": "令和4年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "type": "Web",
        "url": "https://web.archive.org/web/20260712125433/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04kessan/r4ippannsyousai.html",
        "localUrl": "",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r4ippannsyousai.html ・ sha256 f75fc5e696b62811… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R3",
    "basis": "確定",
    "fyLabel": "令和3年度（決算・確定値）",
    "asOf": "決算（確定値）",
    "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": null,
    "revenueBudgetTotalOku": 952.8503,
    "revenueSettledTotalOku": 900.9546,
    "expenditureBudgetTotalOku": 952.8503,
    "expenditureSettledTotalOku": 861.4221,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 270.7057,
        "settledOku": 283.9655,
        "ratePct": 104.9,
        "ref": "r3shuushishousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目",
        "breakdownNote": "市民税 134億円・固定資産税 112億円・都市計画税 19.2億円・市たばこ税 13.0億円・軽自動車税 6.0億円・入湯税 2,453万円"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.0629,
        "settledOku": 4.3526,
        "ratePct": 107.1,
        "ref": "r3shuushishousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.1589,
        "settledOku": 0.203,
        "ratePct": 127.8,
        "ref": "r3shuushishousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 0.8995,
        "settledOku": 1.4406,
        "ratePct": 160.2,
        "ref": "r3shuushishousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 1.1564,
        "settledOku": 1.869,
        "ratePct": 161.6,
        "ref": "r3shuushishousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "法人事業税交付金",
        "budgetOku": 4.4697,
        "settledOku": 4.4662,
        "ratePct": 99.9,
        "ref": "r3shuushishousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 48.3856,
        "settledOku": 49.6518,
        "ratePct": 102.6,
        "ref": "r3shuushishousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.2832,
        "settledOku": 0.423,
        "ratePct": 149.4,
        "ref": "r3shuushishousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 5.172,
        "settledOku": 6.0147,
        "ratePct": 116.3,
        "ref": "r3shuushishousai.html#row16",
        "refLabel": "決算状況 収入支出詳細 16行目"
      },
      {
        "name": "地方交付税",
        "budgetOku": 112.1984,
        "settledOku": 112.148,
        "ratePct": 100,
        "ref": "r3shuushishousai.html#row17",
        "refLabel": "決算状況 収入支出詳細 17行目"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.4083,
        "settledOku": 0.3807,
        "ratePct": 93.2,
        "ref": "r3shuushishousai.html#row18",
        "refLabel": "決算状況 収入支出詳細 18行目"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 3.6583,
        "settledOku": 2.8487,
        "ratePct": 77.9,
        "ref": "r3shuushishousai.html#row19",
        "refLabel": "決算状況 収入支出詳細 19行目"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.9956,
        "settledOku": 9.3727,
        "ratePct": 93.8,
        "ref": "r3shuushishousai.html#row20",
        "refLabel": "決算状況 収入支出詳細 20行目"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 267.8046,
        "settledOku": 232.2526,
        "ratePct": 86.7,
        "ref": "r3shuushishousai.html#row21",
        "refLabel": "決算状況 収入支出詳細 21行目"
      },
      {
        "name": "県支出金",
        "budgetOku": 62.2325,
        "settledOku": 59.8913,
        "ratePct": 96.2,
        "ref": "r3shuushishousai.html#row22",
        "refLabel": "決算状況 収入支出詳細 22行目"
      },
      {
        "name": "財産収入",
        "budgetOku": 0.7756,
        "settledOku": 1.3711,
        "ratePct": 176.8,
        "ref": "r3shuushishousai.html#row23",
        "refLabel": "決算状況 収入支出詳細 23行目"
      },
      {
        "name": "寄付金",
        "budgetOku": 33.0111,
        "settledOku": 23.0799,
        "ratePct": 69.9,
        "ref": "r3shuushishousai.html#row24",
        "refLabel": "決算状況 収入支出詳細 24行目"
      },
      {
        "name": "繰入金",
        "budgetOku": 6.1799,
        "settledOku": 3.9964,
        "ratePct": 64.7,
        "ref": "r3shuushishousai.html#row25",
        "refLabel": "決算状況 収入支出詳細 25行目"
      },
      {
        "name": "繰越金",
        "budgetOku": 8.2297,
        "settledOku": 8.2297,
        "ratePct": 100,
        "ref": "r3shuushishousai.html#row26",
        "refLabel": "決算状況 収入支出詳細 26行目"
      },
      {
        "name": "諸収入",
        "budgetOku": 15.7124,
        "settledOku": 13.2243,
        "ratePct": 84.2,
        "ref": "r3shuushishousai.html#row27",
        "refLabel": "決算状況 収入支出詳細 27行目"
      },
      {
        "name": "市債",
        "budgetOku": 97.35,
        "settledOku": 81.7728,
        "ratePct": 84,
        "ref": "r3shuushishousai.html#row28",
        "refLabel": "決算状況 収入支出詳細 28行目"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.4834,
        "settledOku": 5.2792,
        "ratePct": 96.3,
        "ref": "r3shuushishousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目"
      },
      {
        "name": "総務費",
        "budgetOku": 121.0526,
        "settledOku": 107.5956,
        "ratePct": 88.9,
        "ref": "r3shuushishousai.html#row3",
        "refLabel": "決算状況 収入支出詳細 3行目"
      },
      {
        "name": "民生費",
        "budgetOku": 416.8583,
        "settledOku": 382.6527,
        "ratePct": 91.8,
        "ref": "r3shuushishousai.html#row4",
        "refLabel": "決算状況 収入支出詳細 4行目"
      },
      {
        "name": "衛生費",
        "budgetOku": 128.6159,
        "settledOku": 120.8016,
        "ratePct": 93.9,
        "ref": "r3shuushishousai.html#row5",
        "refLabel": "決算状況 収入支出詳細 5行目"
      },
      {
        "name": "労働費",
        "budgetOku": 2.157,
        "settledOku": 2.0987,
        "ratePct": 97.3,
        "ref": "r3shuushishousai.html#row6",
        "refLabel": "決算状況 収入支出詳細 6行目"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 10.9786,
        "settledOku": 9.9788,
        "ratePct": 90.9,
        "ref": "r3shuushishousai.html#row7",
        "refLabel": "決算状況 収入支出詳細 7行目"
      },
      {
        "name": "商工費",
        "budgetOku": 15.1166,
        "settledOku": 9.7628,
        "ratePct": 64.6,
        "ref": "r3shuushishousai.html#row8",
        "refLabel": "決算状況 収入支出詳細 8行目"
      },
      {
        "name": "土木費",
        "budgetOku": 53.4631,
        "settledOku": 37.6641,
        "ratePct": 70.4,
        "ref": "r3shuushishousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "消防費",
        "budgetOku": 22.5641,
        "settledOku": 21.7641,
        "ratePct": 96.5,
        "ref": "r3shuushishousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "教育費",
        "budgetOku": 75.6451,
        "settledOku": 63.1096,
        "ratePct": 83.4,
        "ref": "r3shuushishousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0.0001,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r3shuushishousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "公債費",
        "budgetOku": 99.4899,
        "settledOku": 99.3701,
        "ratePct": 99.9,
        "ref": "r3shuushishousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "諸支出金",
        "budgetOku": 1.3507,
        "settledOku": 1.3448,
        "ratePct": 99.6,
        "ref": "r3shuushishousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "予備費",
        "budgetOku": 0.0749,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r3shuushishousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      }
    ],
    "sourceTitle": "令和3年度 甲府市決算状況 収入支出詳細（一般会計・確定値・WARP回収）",
    "sourceUrl": "https://warp.ndl.go.jp/20231106/20231106005608/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html",
    "originUrl": "https://warp.ndl.go.jp/20231106/20231106005608/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html",
    "sourceLocalUrl": "",
    "evidence": [
      {
        "title": "令和3年度 甲府市決算状況 収入支出詳細（一般会計・確定値・WARP回収）",
        "type": "Web",
        "url": "https://warp.ndl.go.jp/20231106/20231106005608/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html",
        "localUrl": "",
        "source": "warp.ndl.go.jp",
        "thumb": "r3shuushishousai.html ・ sha256 7881a7735a83b3cc… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R2",
    "basis": "確定",
    "fyLabel": "令和2年度（決算・確定値）",
    "asOf": "決算（確定値）",
    "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": null,
    "revenueBudgetTotalOku": 1042.2205,
    "revenueSettledTotalOku": 990.2802,
    "expenditureBudgetTotalOku": 1042.2205,
    "expenditureSettledTotalOku": 974.6505,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 290.4116,
        "settledOku": 288.3062,
        "ratePct": 99.3,
        "ref": "r2shuushishousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目",
        "breakdownNote": "市民税 133億円・固定資産税 117億円・都市計画税 20.0億円・市たばこ税 12.2億円・軽自動車税 5.9億円・入湯税 1,364万円"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.6743,
        "settledOku": 4.2856,
        "ratePct": 91.7,
        "ref": "r2shuushishousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.1644,
        "settledOku": 0.244,
        "ratePct": 148.4,
        "ref": "r2shuushishousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 1.0549,
        "settledOku": 0.9317,
        "ratePct": 88.3,
        "ref": "r2shuushishousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 0.801,
        "settledOku": 1.269,
        "ratePct": 158.4,
        "ref": "r2shuushishousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "法人事業税交付金",
        "budgetOku": 1.9069,
        "settledOku": 1.9964,
        "ratePct": 104.7,
        "ref": "r2shuushishousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 47.7053,
        "settledOku": 45.704,
        "ratePct": 95.8,
        "ref": "r2shuushishousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.4654,
        "settledOku": 0.4379,
        "ratePct": 94.1,
        "ref": "r2shuushishousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 1.7933,
        "settledOku": 1.7933,
        "ratePct": 100,
        "ref": "r2shuushishousai.html#row16",
        "refLabel": "決算状況 収入支出詳細 16行目"
      },
      {
        "name": "地方交付税",
        "budgetOku": 92.9525,
        "settledOku": 92.0842,
        "ratePct": 99.1,
        "ref": "r2shuushishousai.html#row17",
        "refLabel": "決算状況 収入支出詳細 17行目"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.4214,
        "settledOku": 0.4252,
        "ratePct": 100.9,
        "ref": "r2shuushishousai.html#row18",
        "refLabel": "決算状況 収入支出詳細 18行目"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 4.9459,
        "settledOku": 3.8683,
        "ratePct": 78.2,
        "ref": "r2shuushishousai.html#row19",
        "refLabel": "決算状況 収入支出詳細 19行目"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.9782,
        "settledOku": 9.1826,
        "ratePct": 92,
        "ref": "r2shuushishousai.html#row20",
        "refLabel": "決算状況 収入支出詳細 20行目"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 380.3202,
        "settledOku": 353.1015,
        "ratePct": 92.8,
        "ref": "r2shuushishousai.html#row21",
        "refLabel": "決算状況 収入支出詳細 21行目"
      },
      {
        "name": "県支出金",
        "budgetOku": 68.4154,
        "settledOku": 64.8786,
        "ratePct": 94.8,
        "ref": "r2shuushishousai.html#row22",
        "refLabel": "決算状況 収入支出詳細 22行目"
      },
      {
        "name": "財産収入",
        "budgetOku": 0.9766,
        "settledOku": 1.2593,
        "ratePct": 128.9,
        "ref": "r2shuushishousai.html#row23",
        "refLabel": "決算状況 収入支出詳細 23行目"
      },
      {
        "name": "寄付金",
        "budgetOku": 15.0124,
        "settledOku": 12.8257,
        "ratePct": 85.4,
        "ref": "r2shuushishousai.html#row24",
        "refLabel": "決算状況 収入支出詳細 24行目"
      },
      {
        "name": "繰入金",
        "budgetOku": 11.2434,
        "settledOku": 10.0682,
        "ratePct": 89.5,
        "ref": "r2shuushishousai.html#row25",
        "refLabel": "決算状況 収入支出詳細 25行目"
      },
      {
        "name": "繰越金",
        "budgetOku": 4.045,
        "settledOku": 4.045,
        "ratePct": 100,
        "ref": "r2shuushishousai.html#row26",
        "refLabel": "決算状況 収入支出詳細 26行目"
      },
      {
        "name": "諸収入",
        "budgetOku": 22.4664,
        "settledOku": 19.7505,
        "ratePct": 87.9,
        "ref": "r2shuushishousai.html#row27",
        "refLabel": "決算状況 収入支出詳細 27行目"
      },
      {
        "name": "市債",
        "budgetOku": 82.466,
        "settledOku": 73.823,
        "ratePct": 89.5,
        "ref": "r2shuushishousai.html#row28",
        "refLabel": "決算状況 収入支出詳細 28行目"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.429,
        "settledOku": 5.3063,
        "ratePct": 97.7,
        "ref": "r2shuushishousai.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目"
      },
      {
        "name": "総務費",
        "budgetOku": 282.4776,
        "settledOku": 274.4386,
        "ratePct": 97.2,
        "ref": "r2shuushishousai.html#row3",
        "refLabel": "決算状況 収入支出詳細 3行目"
      },
      {
        "name": "民生費",
        "budgetOku": 350.9657,
        "settledOku": 339.0371,
        "ratePct": 96.6,
        "ref": "r2shuushishousai.html#row4",
        "refLabel": "決算状況 収入支出詳細 4行目"
      },
      {
        "name": "衛生費",
        "budgetOku": 110.3277,
        "settledOku": 95.8524,
        "ratePct": 86.9,
        "ref": "r2shuushishousai.html#row5",
        "refLabel": "決算状況 収入支出詳細 5行目"
      },
      {
        "name": "労働費",
        "budgetOku": 2.4191,
        "settledOku": 2.3403,
        "ratePct": 96.7,
        "ref": "r2shuushishousai.html#row6",
        "refLabel": "決算状況 収入支出詳細 6行目"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 10.1133,
        "settledOku": 8.0522,
        "ratePct": 79.6,
        "ref": "r2shuushishousai.html#row7",
        "refLabel": "決算状況 収入支出詳細 7行目"
      },
      {
        "name": "商工費",
        "budgetOku": 17.6259,
        "settledOku": 13.7439,
        "ratePct": 78,
        "ref": "r2shuushishousai.html#row8",
        "refLabel": "決算状況 収入支出詳細 8行目"
      },
      {
        "name": "土木費",
        "budgetOku": 57.4488,
        "settledOku": 48.5071,
        "ratePct": 84.4,
        "ref": "r2shuushishousai.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "消防費",
        "budgetOku": 25.152,
        "settledOku": 24.074,
        "ratePct": 95.7,
        "ref": "r2shuushishousai.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "教育費",
        "budgetOku": 90.6819,
        "settledOku": 74.1079,
        "ratePct": 81.7,
        "ref": "r2shuushishousai.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0.1423,
        "settledOku": 0.1421,
        "ratePct": 99.9,
        "ref": "r2shuushishousai.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "公債費",
        "budgetOku": 87.8656,
        "settledOku": 87.5975,
        "ratePct": 99.7,
        "ref": "r2shuushishousai.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "諸支出金",
        "budgetOku": 1.4559,
        "settledOku": 1.4511,
        "ratePct": 99.7,
        "ref": "r2shuushishousai.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "予備費",
        "budgetOku": 0.1157,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r2shuushishousai.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      }
    ],
    "sourceTitle": "令和2年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
    "sourceUrl": "https://web.archive.org/web/20260712125651/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r2shuushishousai.html",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r2shuushishousai.html",
    "sourceLocalUrl": "",
    "evidence": [
      {
        "title": "令和2年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "type": "Web",
        "url": "https://web.archive.org/web/20260712125651/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r2shuushishousai.html",
        "localUrl": "",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r2shuushishousai.html ・ sha256 62f0600e5f231bfb… ・ 2026-07-12 取得"
      }
    ]
  },
  {
    "fy": "R1",
    "basis": "確定",
    "fyLabel": "令和1年度（決算・確定値）",
    "asOf": "決算（確定値）",
    "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
    "population": null,
    "revenueBudgetTotalOku": 818.3429,
    "revenueSettledTotalOku": 766.9111,
    "expenditureBudgetTotalOku": 818.3429,
    "expenditureSettledTotalOku": 759.8661,
    "revenue": [
      {
        "name": "市税",
        "budgetOku": 290.37,
        "settledOku": 292.4267,
        "ratePct": 100.7,
        "ref": "r1sishutu.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目",
        "breakdownNote": "市民税 139億円・固定資産税 115億円・都市計画税 19.8億円・市たばこ税 12.7億円・軽自動車税 5.4億円・入湯税 2,368万円"
      },
      {
        "name": "地方譲与税",
        "budgetOku": 4.2021,
        "settledOku": 4.2021,
        "ratePct": 100,
        "ref": "r1sishutu.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "利子割交付金",
        "budgetOku": 0.2204,
        "settledOku": 0.2204,
        "ratePct": 100,
        "ref": "r1sishutu.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "配当割交付金",
        "budgetOku": 1.0435,
        "settledOku": 1.0435,
        "ratePct": 100,
        "ref": "r1sishutu.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "株式等譲渡所得割交付金",
        "budgetOku": 0.6773,
        "settledOku": 0.6773,
        "ratePct": 100,
        "ref": "r1sishutu.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "地方消費税交付金",
        "budgetOku": 37.8879,
        "settledOku": 37.8879,
        "ratePct": 100,
        "ref": "r1sishutu.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "自動車取得税交付金",
        "budgetOku": 0.769,
        "settledOku": 0.7976,
        "ratePct": 103.7,
        "ref": "r1sishutu.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "環境性能割交付金",
        "budgetOku": 0.2836,
        "settledOku": 0.1679,
        "ratePct": 59.2,
        "ref": "r1sishutu.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      },
      {
        "name": "地方特例交付金",
        "budgetOku": 3.3329,
        "settledOku": 3.3182,
        "ratePct": 99.6,
        "ref": "r1sishutu.html#row16",
        "refLabel": "決算状況 収入支出詳細 16行目"
      },
      {
        "name": "地方交付税",
        "budgetOku": 93.6365,
        "settledOku": 86.8267,
        "ratePct": 92.7,
        "ref": "r1sishutu.html#row17",
        "refLabel": "決算状況 収入支出詳細 17行目"
      },
      {
        "name": "交通安全対策特別交付金",
        "budgetOku": 0.4403,
        "settledOku": 0.4082,
        "ratePct": 92.7,
        "ref": "r1sishutu.html#row18",
        "refLabel": "決算状況 収入支出詳細 18行目"
      },
      {
        "name": "分担金及び負担金",
        "budgetOku": 5.1917,
        "settledOku": 5.0784,
        "ratePct": 97.8,
        "ref": "r1sishutu.html#row19",
        "refLabel": "決算状況 収入支出詳細 19行目"
      },
      {
        "name": "使用料及び手数料",
        "budgetOku": 9.7544,
        "settledOku": 9.2508,
        "ratePct": 94.8,
        "ref": "r1sishutu.html#row20",
        "refLabel": "決算状況 収入支出詳細 20行目"
      },
      {
        "name": "国庫支出金",
        "budgetOku": 158.2943,
        "settledOku": 140.6608,
        "ratePct": 88.9,
        "ref": "r1sishutu.html#row21",
        "refLabel": "決算状況 収入支出詳細 21行目"
      },
      {
        "name": "県支出金",
        "budgetOku": 67.1984,
        "settledOku": 61.0374,
        "ratePct": 90.8,
        "ref": "r1sishutu.html#row22",
        "refLabel": "決算状況 収入支出詳細 22行目"
      },
      {
        "name": "財産収入",
        "budgetOku": 1.0028,
        "settledOku": 0.856,
        "ratePct": 85.4,
        "ref": "r1sishutu.html#row23",
        "refLabel": "決算状況 収入支出詳細 23行目"
      },
      {
        "name": "寄付金",
        "budgetOku": 1.8012,
        "settledOku": 1.8012,
        "ratePct": 100,
        "ref": "r1sishutu.html#row24",
        "refLabel": "決算状況 収入支出詳細 24行目"
      },
      {
        "name": "繰入金",
        "budgetOku": 10.1681,
        "settledOku": 8.0352,
        "ratePct": 79,
        "ref": "r1sishutu.html#row25",
        "refLabel": "決算状況 収入支出詳細 25行目"
      },
      {
        "name": "繰越金",
        "budgetOku": 6.1982,
        "settledOku": 6.2214,
        "ratePct": 100.4,
        "ref": "r1sishutu.html#row26",
        "refLabel": "決算状況 収入支出詳細 26行目"
      },
      {
        "name": "諸収入",
        "budgetOku": 35.1243,
        "settledOku": 31.7304,
        "ratePct": 90.3,
        "ref": "r1sishutu.html#row27",
        "refLabel": "決算状況 収入支出詳細 27行目"
      },
      {
        "name": "市債",
        "budgetOku": 90.746,
        "settledOku": 74.263,
        "ratePct": 81.8,
        "ref": "r1sishutu.html#row28",
        "refLabel": "決算状況 収入支出詳細 28行目"
      }
    ],
    "expenditure": [
      {
        "name": "議会費",
        "budgetOku": 5.444,
        "settledOku": 5.2469,
        "ratePct": 96.4,
        "ref": "r1sishutu.html#row2",
        "refLabel": "決算状況 収入支出詳細 2行目"
      },
      {
        "name": "総務費",
        "budgetOku": 88.5784,
        "settledOku": 84.3804,
        "ratePct": 95.3,
        "ref": "r1sishutu.html#row3",
        "refLabel": "決算状況 収入支出詳細 3行目"
      },
      {
        "name": "民生費",
        "budgetOku": 333.9924,
        "settledOku": 324.3789,
        "ratePct": 97.1,
        "ref": "r1sishutu.html#row4",
        "refLabel": "決算状況 収入支出詳細 4行目"
      },
      {
        "name": "衛生費",
        "budgetOku": 106.5135,
        "settledOku": 103.444,
        "ratePct": 97.1,
        "ref": "r1sishutu.html#row5",
        "refLabel": "決算状況 収入支出詳細 5行目"
      },
      {
        "name": "労働費",
        "budgetOku": 2.6991,
        "settledOku": 2.607,
        "ratePct": 96.6,
        "ref": "r1sishutu.html#row6",
        "refLabel": "決算状況 収入支出詳細 6行目"
      },
      {
        "name": "農林水産業費",
        "budgetOku": 8.7148,
        "settledOku": 7.8647,
        "ratePct": 90.2,
        "ref": "r1sishutu.html#row7",
        "refLabel": "決算状況 収入支出詳細 7行目"
      },
      {
        "name": "商工費",
        "budgetOku": 9.764,
        "settledOku": 5.4226,
        "ratePct": 55.5,
        "ref": "r1sishutu.html#row8",
        "refLabel": "決算状況 収入支出詳細 8行目"
      },
      {
        "name": "土木費",
        "budgetOku": 87.7607,
        "settledOku": 67.7989,
        "ratePct": 77.3,
        "ref": "r1sishutu.html#row9",
        "refLabel": "決算状況 収入支出詳細 9行目"
      },
      {
        "name": "消防費",
        "budgetOku": 23.4574,
        "settledOku": 23.1173,
        "ratePct": 98.6,
        "ref": "r1sishutu.html#row10",
        "refLabel": "決算状況 収入支出詳細 10行目"
      },
      {
        "name": "教育費",
        "budgetOku": 74.4952,
        "settledOku": 59.1543,
        "ratePct": 79.4,
        "ref": "r1sishutu.html#row11",
        "refLabel": "決算状況 収入支出詳細 11行目"
      },
      {
        "name": "災害復旧費",
        "budgetOku": 0.2685,
        "settledOku": 0.0052,
        "ratePct": 1.9,
        "ref": "r1sishutu.html#row12",
        "refLabel": "決算状況 収入支出詳細 12行目"
      },
      {
        "name": "公債費",
        "budgetOku": 75.0969,
        "settledOku": 74.9806,
        "ratePct": 99.8,
        "ref": "r1sishutu.html#row13",
        "refLabel": "決算状況 収入支出詳細 13行目"
      },
      {
        "name": "諸支出金",
        "budgetOku": 1.4695,
        "settledOku": 1.4653,
        "ratePct": 99.7,
        "ref": "r1sishutu.html#row14",
        "refLabel": "決算状況 収入支出詳細 14行目"
      },
      {
        "name": "予備費",
        "budgetOku": 0.0885,
        "settledOku": 0,
        "ratePct": 0,
        "ref": "r1sishutu.html#row15",
        "refLabel": "決算状況 収入支出詳細 15行目"
      }
    ],
    "sourceTitle": "令和1年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
    "sourceUrl": "https://web.archive.org/web/20210128054004/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r1sishutu.html",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r1sishutu.html",
    "sourceLocalUrl": "",
    "evidence": [
      {
        "title": "令和1年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "type": "Web",
        "url": "https://web.archive.org/web/20210128054004/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r1sishutu.html",
        "localUrl": "",
        "source": "www.city.kofu.yamanashi.jp",
        "thumb": "r1sishutu.html ・ sha256 c175362570a90fe0… ・ 2026-07-12 取得"
      }
    ]
  }
];

/** 最新年度（互換用） */
export const KOFU_EXECUTION: KofuExecutionYear = KOFU_EXECUTION_YEARS[0]!;
