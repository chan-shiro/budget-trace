// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 総務省「令和6年度 市町村別決算状況調」普通会計決算
/*
 * 来歴:
 *   - soumu-shichoson-kessan-r6 sha256=700fc73e7547cc7b…
 *   - soumu-shichoson-kessan-r6 sha256=a5928ea0f8134d93…
 *   - soumu-shichoson-kessan-r6 sha256=dbd2306e0814524e…
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
  /** 来歴（原資料ファイル内の位置） */
  ref: string;
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
    "ref": "001061669.xlsx#row436"
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
    "ref": "001061669.xlsx#row635"
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
    "ref": "001061669.xlsx#row500"
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
    "ref": "001061669.xlsx#row531"
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
    "ref": "001061669.xlsx#row766"
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
    "ref": "全国の人口15〜25万人の市 70市の平均"
  }
];
