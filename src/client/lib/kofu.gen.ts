// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 令和8年度 甲府市当初予算（案）資料（r8toushoyosansiryou.pdf sha256=9a3cb9417077a9d3…）
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

export const KOFU_BUDGET: {
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  sourceTitle: string;
  sourceUrl: string;
  pagesLabel: string;
  revenue: KofuKanRow[];
  expenditure: KofuKanRow[];
  evidence: { title: string; type: string; url: string; source: string; thumb: string }[];
} = {
  "fyLabel": "令和8年度 当初予算",
  "population": 183850,
  "populationLabel": "住民基本台帳人口（令7.1.1現在）",
  "totalOku": 917.8706,
  "prevTotalOku": 880.85032,
  "yoyLabel": "+4.2%",
  "sourceTitle": "令和8年度 甲府市当初予算（案）資料",
  "sourceUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
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
      "url": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
      "source": "www.city.kofu.yamanashi.jp",
      "thumb": "r8toushoyosansiryou.pdf ・ sha256 9a3cb9417077a9d3… ・ 2026-07-11 取得"
    }
  ]
};
