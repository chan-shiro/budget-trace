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
 * 比較行そのものは全国索引 public/decision/similar-index.json（全1741市町村）に
 * 書き出してあり、どの自治体をどの軸で比べるかはアプリ側で決める。ここは画面の
 * 定数（年度ラベル・構成比の科目・エビデンスカード）だけを持つ。
 */

export const SIMILAR_FY_LABEL = "令和6年度（普通会計決算）";

/** 全国索引の取得先（この画面でだけフェッチする） */
export const SIMILAR_INDEX_URL = "/decision/similar-index.json";

export interface SimilarEvidence {
  /** このカードが裏付ける行の種別（市＝city／町村＝town） */
  family: "city" | "town";
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
    "family": "city",
    "title": "令和6年度 市町村別決算状況調 都市別（1）概況",
    "type": "Excel",
    "url": "https://web.archive.org/web/20260712083739/https://www.soumu.go.jp/main_content/001061669.xlsx",
    "localUrl": "/sources/soumu-shichoson-kessan-r6/001061669.xlsx",
    "source": "www.soumu.go.jp",
    "thumb": "001061669.xlsx ・ sha256 700fc73e7547cc7b… ・ 2026-07-11 取得"
  },
  {
    "family": "city",
    "title": "令和6年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
    "type": "Excel",
    "url": "https://web.archive.org/web/20260712083915/https://www.soumu.go.jp/main_content/001061671.xlsx",
    "localUrl": "/sources/soumu-shichoson-kessan-r6/001061671.xlsx",
    "source": "www.soumu.go.jp",
    "thumb": "001061671.xlsx ・ sha256 a5928ea0f8134d93… ・ 2026-07-11 取得"
  },
  {
    "family": "town",
    "title": "令和6年度 市町村別決算状況調 町村別（1）概況",
    "type": "Excel",
    "url": "https://web.archive.org/web/20260712084033/https://www.soumu.go.jp/main_content/001061674.xlsx",
    "localUrl": "/sources/soumu-shichoson-kessan-r6/001061674.xlsx",
    "source": "www.soumu.go.jp",
    "thumb": "001061674.xlsx ・ sha256 dbd2306e0814524e… ・ 2026-07-11 取得"
  },
  {
    "family": "town",
    "title": "令和6年度 市町村別決算状況調 町村別（3）目的別歳出内訳",
    "type": "Excel",
    "url": "https://web.archive.org/web/20260712084335/https://www.soumu.go.jp/main_content/001061676.xlsx",
    "localUrl": "/sources/soumu-shichoson-kessan-r6/001061676.xlsx",
    "source": "www.soumu.go.jp",
    "thumb": "001061676.xlsx ・ sha256 b1ecb4af94638244… ・ 2026-07-11 取得"
  }
];
