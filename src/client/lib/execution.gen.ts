// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）（01ipankaikei.pdf sha256=92529cd6bd059b35…）
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
}

export const KOFU_EXECUTION: {
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
  evidence: { title: string; type: string; url: string; source: string; thumb: string }[];
} = {
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
  "evidence": [
    {
      "title": "令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）",
      "type": "PDF",
      "url": "https://web.archive.org/web/20260712091231/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf",
      "source": "www.city.kofu.yamanashi.jp",
      "thumb": "01ipankaikei.pdf ・ sha256 92529cd6bd059b35… ・ 2026-07-11 取得"
    }
  ]
};
