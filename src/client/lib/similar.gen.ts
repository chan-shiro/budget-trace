// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 総務省「令和6年度 市町村別決算状況調」普通会計決算
/*
 * 来歴:
 *   - soumu-shichoson-kessan-r6 sha256=700fc73e7547cc7b…
 *   - soumu-shichoson-kessan-r6 sha256=0353d207daec494d…
 *   - soumu-shichoson-kessan-r6 sha256=a5928ea0f8134d93…
 *   - soumu-shichoson-kessan-r6 sha256=dbd2306e0814524e…
 *   - soumu-shichoson-kessan-r6 sha256=d39dc896172d94c8…
 *   - soumu-shichoson-kessan-r6 sha256=b1ecb4af94638244…
 * 選出: 人口15〜25万人の市から人口の近い4市 + 帯内70市の平均
 */

export const SIMILAR_FY_LABEL = "令和6年度（普通会計決算）";

export const SIM_MIX_COLS = ["民生費", "教育費", "土木費", "公債費", "その他"];

export interface SimilarRow {
  name: string;
  self?: boolean;
  /** 表示用の人口（例: "18.4万人"） */
  pop: string;
  /** 歳出総額（億円） */
  total: number;
  /** 1人あたり歳出（例: "48.7万円"） */
  perCap: string;
  /** SIM_MIX_COLS 順の歳出構成比（%、合計100） */
  mix: number[];
  /** 来歴（原資料ファイル内の位置。機械可読） */
  ref: string;
  /** 来歴の画面表示用ラベル（例: "都市別・概況 436行目"） */
  refLabel: string;
}

export const SIMILAR: SimilarRow[] = [
  {
    "name": "甲府市",
    "self": true,
    "pop": "18.4万人",
    "total": 894.8,
    "perCap": "48.7万円",
    "mix": [
      42.9,
      9,
      8.3,
      9.1,
      30.7
    ],
    "ref": "001061669.xlsx#row436",
    "refLabel": "都市別・概況 436行目"
  },
  {
    "name": "和泉市",
    "pop": "18.2万人",
    "total": 792.8,
    "perCap": "43.4万円",
    "mix": [
      50.2,
      13.9,
      5.6,
      7.2,
      23.1
    ],
    "ref": "001061669.xlsx#row635",
    "refLabel": "都市別・概況 635行目"
  },
  {
    "name": "沼津市",
    "pop": "18.6万人",
    "total": 925.6,
    "perCap": "49.8万円",
    "mix": [
      36,
      8.7,
      17.2,
      6.9,
      31.2
    ],
    "ref": "001061669.xlsx#row500",
    "refLabel": "都市別・概況 500行目"
  },
  {
    "name": "豊川市",
    "pop": "18.6万人",
    "total": 795.6,
    "perCap": "42.8万円",
    "mix": [
      43.3,
      10.3,
      8.4,
      6.8,
      31.2
    ],
    "ref": "001061669.xlsx#row531",
    "refLabel": "都市別・概況 531行目"
  },
  {
    "name": "山口市",
    "pop": "18.6万人",
    "total": 1072.4,
    "perCap": "57.7万円",
    "mix": [
      32.8,
      7.2,
      7,
      9.6,
      43.4
    ],
    "ref": "001061669.xlsx#row766",
    "refLabel": "都市別・概況 766行目"
  },
  {
    "name": "類似団体平均",
    "pop": "19.0万人",
    "total": 908,
    "perCap": "47.7万円",
    "mix": [
      42.4,
      11.8,
      9.2,
      7.2,
      29.4
    ],
    "ref": "全国の人口15〜25万人の市 70市から算出",
    "refLabel": "帯内70市から算出（導出値）"
  }
];

export interface SimilarEvidence {
  title: string;
  type: string;
  /** 一次資料へのリンク（Wayback コピー優先） */
  url: string;
  /** 自サーバー配信の原本コピー */
  localUrl: string;
  source: string;
  /** サムネイル枠に出す来歴（ファイル名・sha256・取得日） */
  thumb: string;
}

export const SIMILAR_EVIDENCE: SimilarEvidence[] = [
  {
    "title": "令和6年度 市町村別決算状況調 都市別（1）概況",
    "type": "Excel",
    "url": "https://web.archive.org/web/20260712083739/https://www.soumu.go.jp/main_content/001061669.xlsx",
    "localUrl": "/sources/soumu-shichoson-kessan-r6/001061669.xlsx",
    "source": "www.soumu.go.jp",
    "thumb": "001061669.xlsx ・ sha256 700fc73e7547cc7b… ・ 2026-07-11 取得"
  },
  {
    "title": "令和6年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
    "type": "Excel",
    "url": "https://web.archive.org/web/20260712083915/https://www.soumu.go.jp/main_content/001061671.xlsx",
    "localUrl": "/sources/soumu-shichoson-kessan-r6/001061671.xlsx",
    "source": "www.soumu.go.jp",
    "thumb": "001061671.xlsx ・ sha256 a5928ea0f8134d93… ・ 2026-07-11 取得"
  }
];
