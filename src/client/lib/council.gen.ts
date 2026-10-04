// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市議会 所属会派別議員名簿（各予算の議決時点のバージョン）＋各年3月定例会 審議結果。
// 会派構成は名簿の更新日でバージョンを固定（過去分は Wayback スナップショット）。
// 賛否内訳・会派別賛否は非公表（起立採決で「可決」のみ）のため持たない。

export interface CouncilFaction {
  name: string;
  seats: number;
  isIndependent: boolean;
}
export interface CouncilEvidence {
  title: string;
  /** 自サーバー配信の原本コピー（③・サンドボックス iframe で開く） */
  localUrl: string;
  /** 発行元（①） */
  originUrl: string;
  /** Wayback 魚拓（②） */
  archiveUrl: string;
}
export interface Council {
  /** 予算年度（この議会が議決した当初予算の年度。"R8" など） */
  fy: string;
  fyLabel: string;
  /** 議会名 */
  body: string;
  /** 現員（＝会派議席合計）。甲府は定数＝現員 */
  seats: number;
  /** 条例定数（原典で確かめた団体だけ。欠員があると seats より大きい） */
  teisu?: number;
  /** 会派構成の基準日 ISO（名簿の更新日） */
  asOf: string;
  asOfLabel: string;
  factions: CouncilFaction[];
  resolution: {
    billNo: string;
    billName: string;
    sessionLabel: string;
    decidedDate: string;
    decidedDateLabel: string;
    result: string;
  };
  sourceTitle: string;
  roster: CouncilEvidence;
  result: CouncilEvidence;
  /**
   * 当初予算の議決での賛否（甲府以外・原典で公表している議会だけ）。basis は原典の賛否表の列の単位
   * （member＝議員ごと、faction＝会派ごと。会派単位の表は会派の全員を同じ賛否として数える）
   */
  votes?: {
    basis: "member" | "faction";
    unanimousText?: string;
    stances: string[];
    tally: Record<string, number>;
    byFaction: { faction: string; counts: Record<string, number>; members: { name: string; stance: string }[] }[];
    source: CouncilEvidence;
  };
  /** 予算の議決が複数の採決に分かれる議会（修正可決: 修正案・修正部分を除く原案）の採決ごとの賛否 */
  voteParts?: {
    part: string;
    basis: "member" | "faction";
    /** 原典が「全会一致」の語だけで示した採決（数は議席から出したもの）。その原文 */
    unanimousText?: string;
    stances: string[];
    tally: Record<string, number>;
    byFaction: { faction: string; counts: Record<string, number>; members: { name: string; stance: string }[] }[];
    source: CouncilEvidence;
  }[];
  /** 参考リンク（会議録検索・議会だより）。甲府だけが持つ */
  minutesUrl: string | null;
  newsletterUrl: string | null;
}
/** 互換の別名（甲府） */
export type KofuCouncil = Council;

/** 甲府市議会の構成（予算議決時）。新しい年度順（R8→R2）。 */
export const KOFU_COUNCIL_YEARS: Council[] = [
  {
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2025-05-01",
    "asOfLabel": "2025年5月1日",
    "factions": [
      {
        "name": "政和こうふ",
        "seats": 10,
        "isIndependent": false
      },
      {
        "name": "こうふ明水会",
        "seats": 5,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 3,
        "isIndependent": false
      },
      {
        "name": "政友クラブ",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "市民クラブ",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "無所属（山田弘之）",
        "seats": 1,
        "isIndependent": true
      },
      {
        "name": "無所属（村松裕美）",
        "seats": 1,
        "isIndependent": true
      }
    ],
    "resolution": {
      "billNo": "議案第5号",
      "billName": "令和8年度甲府市一般会計予算",
      "sessionLabel": "令和8年3月定例会",
      "decidedDate": "2026-03-25",
      "decidedDateLabel": "令和8年3月25日",
      "result": "可決"
    },
    "sourceTitle": "令和8年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r8/h270512kaihabetu.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20260714124525/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和8年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r8/shingikekka.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0803/shingikekka.html",
      "archiveUrl": "https://web.archive.org/web/20260714124615/https://www.city.kofu.yamanashi.jp/gijichosa/r0803/shingikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  },
  {
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2023-11-28",
    "asOfLabel": "2023年11月28日",
    "factions": [
      {
        "name": "政和こうふ",
        "seats": 10,
        "isIndependent": false
      },
      {
        "name": "政友クラブ",
        "seats": 7,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 3,
        "isIndependent": false
      },
      {
        "name": "市民クラブ",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "無所属（山田弘之）",
        "seats": 1,
        "isIndependent": true
      },
      {
        "name": "無所属（村松裕美）",
        "seats": 1,
        "isIndependent": true
      }
    ],
    "resolution": {
      "billNo": "議案第2号",
      "billName": "令和7年度甲府市一般会計予算",
      "sessionLabel": "令和7年3月定例会",
      "decidedDate": "2025-03-25",
      "decidedDateLabel": "令和7年3月25日",
      "result": "可決"
    },
    "sourceTitle": "令和7年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r7/h270512kaihabetu.html",
      "originUrl": "https://web.archive.org/web/20240910021519id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20240910021519id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和7年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r7/shingikekka.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0703/shingikekka.html",
      "archiveUrl": "https://web.archive.org/web/20260714133655/https://www.city.kofu.yamanashi.jp/gijichosa/r0703/shingikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  },
  {
    "fy": "R6",
    "fyLabel": "令和6年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2023-11-28",
    "asOfLabel": "2023年11月28日",
    "factions": [
      {
        "name": "政和こうふ",
        "seats": 10,
        "isIndependent": false
      },
      {
        "name": "政友クラブ",
        "seats": 7,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 3,
        "isIndependent": false
      },
      {
        "name": "市民クラブ",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "無所属（山田弘之）",
        "seats": 1,
        "isIndependent": true
      },
      {
        "name": "無所属（村松裕美）",
        "seats": 1,
        "isIndependent": true
      }
    ],
    "resolution": {
      "billNo": "議案第2号",
      "billName": "令和6年度甲府市一般会計予算",
      "sessionLabel": "令和6年3月定例会",
      "decidedDate": "2024-03-25",
      "decidedDateLabel": "令和6年3月25日",
      "result": "可決"
    },
    "sourceTitle": "令和6年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r6/h270512kaihabetu.html",
      "originUrl": "https://web.archive.org/web/20231202080331id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20231202080331id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和6年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r6/shingikekka.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0603/shingikekka.html",
      "archiveUrl": "https://web.archive.org/web/20260513161136/https://www.city.kofu.yamanashi.jp/gijichosa/r0603/shingikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  },
  {
    "fy": "R5",
    "fyLabel": "令和5年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2022-05-30",
    "asOfLabel": "2022年5月30日",
    "factions": [
      {
        "name": "政友クラブ",
        "seats": 10,
        "isIndependent": false
      },
      {
        "name": "創政こうふ",
        "seats": 9,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 5,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "社会民主党",
        "seats": 1,
        "isIndependent": false
      },
      {
        "name": "無所属（山田弘之）",
        "seats": 1,
        "isIndependent": true
      }
    ],
    "resolution": {
      "billNo": "議案第1号",
      "billName": "令和5年度甲府市一般会計予算",
      "sessionLabel": "令和5年3月定例会",
      "decidedDate": "2023-03-23",
      "decidedDateLabel": "令和5年3月23日",
      "result": "可決"
    },
    "sourceTitle": "令和5年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r5/h270512kaihabetu.html",
      "originUrl": "https://web.archive.org/web/20221129001525id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20221129001525id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和5年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r5/shingikekka.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0503/shingikekka.html",
      "archiveUrl": "https://web.archive.org/web/20260116054107/https://www.city.kofu.yamanashi.jp/gijichosa/r0503/shingikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  },
  {
    "fy": "R4",
    "fyLabel": "令和4年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2021-05-13",
    "asOfLabel": "2021年5月13日",
    "factions": [
      {
        "name": "政友クラブ",
        "seats": 10,
        "isIndependent": false
      },
      {
        "name": "創政こうふ",
        "seats": 9,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 5,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "こうふクラブ",
        "seats": 2,
        "isIndependent": false
      }
    ],
    "resolution": {
      "billNo": "議案第3号",
      "billName": "令和4年度甲府市一般会計予算",
      "sessionLabel": "令和4年3月定例会",
      "decidedDate": "2022-03-24",
      "decidedDateLabel": "令和4年3月24日",
      "result": "可決"
    },
    "sourceTitle": "令和4年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r4/h270512kaihabetu.html",
      "originUrl": "https://web.archive.org/web/20211130030844id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20211130030844id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和4年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r4/shingikekka.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0403/shingikekka.html",
      "archiveUrl": "https://web.archive.org/web/20260610022754/https://www.city.kofu.yamanashi.jp/gijichosa/r0403/shingikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  },
  {
    "fy": "R3",
    "fyLabel": "令和3年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2019-08-02",
    "asOfLabel": "2019年8月2日",
    "factions": [
      {
        "name": "政友クラブ",
        "seats": 11,
        "isIndependent": false
      },
      {
        "name": "創政こうふ",
        "seats": 8,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 5,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "こうふクラブ",
        "seats": 2,
        "isIndependent": false
      }
    ],
    "resolution": {
      "billNo": "議案第1号",
      "billName": "令和3年度甲府市一般会計予算",
      "sessionLabel": "令和3年3月定例会",
      "decidedDate": "2021-03-23",
      "decidedDateLabel": "令和3年3月23日",
      "result": "可決"
    },
    "sourceTitle": "令和3年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r3/h270512kaihabetu.html",
      "originUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和3年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r3/shingikekka.html",
      "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0303/shingikekka.html",
      "archiveUrl": "https://web.archive.org/web/20240227080640/https://www.city.kofu.yamanashi.jp/gijichosa/r0303/shingikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  },
  {
    "fy": "R2",
    "fyLabel": "令和2年度 当初予算",
    "body": "甲府市議会",
    "seats": 32,
    "asOf": "2019-08-02",
    "asOfLabel": "2019年8月2日",
    "factions": [
      {
        "name": "政友クラブ",
        "seats": 11,
        "isIndependent": false
      },
      {
        "name": "創政こうふ",
        "seats": 8,
        "isIndependent": false
      },
      {
        "name": "公明党",
        "seats": 5,
        "isIndependent": false
      },
      {
        "name": "こうふ未来",
        "seats": 4,
        "isIndependent": false
      },
      {
        "name": "日本共産党",
        "seats": 2,
        "isIndependent": false
      },
      {
        "name": "こうふクラブ",
        "seats": 2,
        "isIndependent": false
      }
    ],
    "resolution": {
      "billNo": "議案第1号",
      "billName": "令和2年度甲府市一般会計予算",
      "sessionLabel": "令和2年3月定例会",
      "decidedDate": "2020-03-24",
      "decidedDateLabel": "令和2年3月24日",
      "result": "可決"
    },
    "sourceTitle": "令和2年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
    "roster": {
      "title": "所属会派別議員名簿",
      "localUrl": "/sources/kofu-gikai-r2/h270512kaihabetu.html",
      "originUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
      "archiveUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
    },
    "result": {
      "title": "令和2年3月定例会 審議結果",
      "localUrl": "/sources/kofu-gikai-r2/shinngikekka.html",
      "originUrl": "https://web.archive.org/web/20200813113035id_/https://www.city.kofu.yamanashi.jp/gijichosa/r0203/shinngikekka.html",
      "archiveUrl": "https://web.archive.org/web/20200813113035id_/https://www.city.kofu.yamanashi.jp/gijichosa/r0203/shinngikekka.html"
    },
    "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
    "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
  }
];

/** 最新（R8）。年度未指定時のフォールバック。 */
export const KOFU_COUNCIL: Council = KOFU_COUNCIL_YEARS[0]!;

/**
 * 甲府以外の議会の構成（予算議決時）。団体コード → 新しい年度順。
 * 会派と所属議員を名簿から書き写し、全員の氏名が原典の本文に出ることをパーサが確かめている
 * （`council-transcribed`・docs/data-sources.md §6-2）。**年度が合わなければ出さない**（別年度の構成で代用しない）。
 */
export const MUNI_COUNCIL_YEARS: Record<string, Council[]> = {
  "102016": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "前橋市議会",
      "seats": 38,
      "teisu": 38,
      "asOf": "2026-03-23",
      "asOfLabel": "2026年3月23日",
      "factions": [
        {
          "name": "前橋高志会",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "前橋令明",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "日本共産党前橋市議会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "公明党前橋市議会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "まえばし市民クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "前橋豊輪",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "七星",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "なないろ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "無所属の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "暁鐘",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "無所属クラブ",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第15号",
        "billName": "令和８年度前橋市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決(多数)"
      },
      "sourceTitle": "令和8年度 前橋市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和8年3月23日現在）",
        "localUrl": "/sources/maebashi-shigikai-r8/13314.html",
        "originUrl": "https://web.archive.org/web/20260326164618id_/https://www.city.maebashi.gunma.jp/gikai/1/13314.html",
        "archiveUrl": "https://web.archive.org/web/20260326164618id_/https://www.city.maebashi.gunma.jp/gikai/1/13314.html"
      },
      "result": {
        "title": "議案の議決結果（令和８年２月臨時会及び第１回定例会）",
        "localUrl": "/sources/maebashi-shigikai-r8/r823.pdf",
        "originUrl": "https://www.city.maebashi.gunma.jp/material/files/group/85/r823.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001172029/https://www.city.maebashi.gunma.jp/material/files/group/85/r823.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "102024": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "高崎市議会",
      "seats": 38,
      "teisu": 38,
      "asOf": "2024-10-29",
      "asOfLabel": "2024年10月29日",
      "factions": [
        {
          "name": "新風会",
          "seats": 19,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "たかさき未来",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "超党派の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党高崎市議会議員団",
          "seats": 2,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第２８号",
        "billName": "令和８年度高崎市一般会計予算",
        "sessionLabel": "令和８年第２回定例会",
        "decidedDate": "2026-03-18",
        "decidedDateLabel": "令和8年3月18日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 高崎市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派一覧（令和6年10月29日）",
        "localUrl": "/sources/takasaki-shigikai-r8/2244.html",
        "originUrl": "https://web.archive.org/web/20260307001842id_/https://www.city.takasaki.gunma.jp/site/gikai/2244.html",
        "archiveUrl": "https://web.archive.org/web/20260307001842id_/https://www.city.takasaki.gunma.jp/site/gikai/2244.html"
      },
      "result": {
        "title": "令和８年第２回定例会 議案等審議結果一覧",
        "localUrl": "/sources/takasaki-shigikai-r8/39050.pdf",
        "originUrl": "https://www.city.takasaki.gunma.jp/uploaded/attachment/39050.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001182452/https://www.city.takasaki.gunma.jp/uploaded/attachment/39050.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "112011": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "川越市議会",
      "seats": 36,
      "teisu": 36,
      "asOf": "2025-09-09",
      "asOfLabel": "2025年9月9日",
      "factions": [
        {
          "name": "初雁自由政令会",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "川越志政会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "川越政策フォーラム",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "川越未来の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本維新の会（柳沢貴雄）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "れいわ新選組（小林透）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属議員（伊藤正子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属議員（村山博紀）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属議員（川口啓介）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属議員（小林薫）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案 29",
        "billName": "令和８年度川越市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 川越市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員一覧表（令和7年9月9日現在）",
        "localUrl": "/sources/kawagoe-shigikai-r8/1007626.html",
        "originUrl": "https://web.archive.org/web/20251213125425id_/https://www.city.kawagoe.saitama.jp/shigikai/giin/1007626.html",
        "archiveUrl": "https://web.archive.org/web/20251213125425id_/https://www.city.kawagoe.saitama.jp/shigikai/giin/1007626.html"
      },
      "result": {
        "title": "議会だより（令和8年5月1日発行）議案議決結果一覧表",
        "localUrl": "/sources/kawagoe-shigikai-r8/0805shigikai4.pdf",
        "originUrl": "https://www.city.kawagoe.saitama.jp/_res/projects/default_project/_page_/001/021/435/0805shigikai4.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001172326/https://www.city.kawagoe.saitama.jp/_res/projects/default_project/_page_/001/021/435/0805shigikai4.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "112216": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "草加市議会",
      "seats": 27,
      "asOf": "2026-03-18",
      "asOfLabel": "2026年3月18日",
      "factions": [
        {
          "name": "草加自民党・無所属の会",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "ＳＯＫＡ新政",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "市民共同",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "立憲民主党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属議員（平野厚子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属議員（川﨑久範）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属議員（吉沢哲夫）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第７号議案",
        "billName": "令和８年度草加市一般会計予算",
        "sessionLabel": "令和８年２月定例会",
        "decidedDate": "2026-03-18",
        "decidedDateLabel": "令和8年3月18日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 草加市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "本会議の議決結果（令和8年2月定例会3月18日分）審議結果一覧（会派構成／議員名）",
        "localUrl": "/sources/soka-shigikai-r8/Kg571_kekka.pdf",
        "originUrl": "http://www.soka-shigikai.jp/voices/GikaiDoc/attach/Congress/Kg571_kekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001182648/http://www.soka-shigikai.jp/voices/GikaiDoc/attach/Congress/Kg571_kekka.pdf"
      },
      "result": {
        "title": "本会議の議決結果（令和8年2月定例会3月18日分）",
        "localUrl": "/sources/soka-shigikai-r8/Kg571_kekka.pdf",
        "originUrl": "http://www.soka-shigikai.jp/voices/GikaiDoc/attach/Congress/Kg571_kekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001182648/http://www.soka-shigikai.jp/voices/GikaiDoc/attach/Congress/Kg571_kekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 25,
          "議長": 1,
          "反対": 1
        },
        "byFaction": [
          {
            "faction": "草加自民党・無所属の会",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "田中宣光",
                "stance": "賛成"
              },
              {
                "name": "木村忠義",
                "stance": "賛成"
              },
              {
                "name": "矢部正平",
                "stance": "賛成"
              },
              {
                "name": "小川利八",
                "stance": "賛成"
              },
              {
                "name": "芝野勝利",
                "stance": "賛成"
              },
              {
                "name": "松井優美子",
                "stance": "賛成"
              },
              {
                "name": "白石孝雄",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "ＳＯＫＡ新政",
            "counts": {
              "賛成": 6,
              "議長": 1
            },
            "members": [
              {
                "name": "吉岡健",
                "stance": "賛成"
              },
              {
                "name": "佐藤利器",
                "stance": "賛成"
              },
              {
                "name": "平山杏香",
                "stance": "賛成"
              },
              {
                "name": "関一幸",
                "stance": "賛成"
              },
              {
                "name": "田川浩司",
                "stance": "賛成"
              },
              {
                "name": "並木正成",
                "stance": "賛成"
              },
              {
                "name": "鈴木由和",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "広田丈夫",
                "stance": "賛成"
              },
              {
                "name": "石川祐一",
                "stance": "賛成"
              },
              {
                "name": "堀込彰二",
                "stance": "賛成"
              },
              {
                "name": "金井俊治",
                "stance": "賛成"
              },
              {
                "name": "森覚",
                "stance": "賛成"
              },
              {
                "name": "藤原みどり",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民共同",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "斉藤雄二",
                "stance": "賛成"
              },
              {
                "name": "佐藤憲和",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "立憲民主党",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "菊地慶太",
                "stance": "賛成"
              },
              {
                "name": "中島綾菜",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属議員（平野厚子）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "平野厚子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属議員（川﨑久範）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "川﨑久範",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属議員（吉沢哲夫）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "吉沢哲夫",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "本会議の議決結果（令和8年2月定例会3月18日分）審議結果一覧",
          "localUrl": "/sources/soka-shigikai-r8/Kg571_kekka.pdf",
          "originUrl": "http://www.soka-shigikai.jp/voices/GikaiDoc/attach/Congress/Kg571_kekka.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001182648/http://www.soka-shigikai.jp/voices/GikaiDoc/attach/Congress/Kg571_kekka.pdf"
        }
      }
    }
  ],
  "112224": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "越谷市議会",
      "seats": 31,
      "asOf": "2025-11-21",
      "asOfLabel": "2025年11月21日",
      "factions": [
        {
          "name": "NEXT越谷",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党越谷市議団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "自由民主党越谷市議団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "こしがや無所属の会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "立憲民主党越谷市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党越谷市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 2,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第25号議案",
        "billName": "令和8年度越谷市一般会計予算について",
        "sessionLabel": "令和8年３月定例会",
        "decidedDate": "2026-03-18",
        "decidedDateLabel": "令和8年3月18日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 越谷市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派名簿（会派一覧 令和7年(2025年)11月21日現在）",
        "localUrl": "/sources/koshigaya-shigikai-r8/kaiha.html",
        "originUrl": "https://web.archive.org/web/20260415105315id_/https://www.city.koshigaya.saitama.jp/gikai/giin/kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20260415105315id_/https://www.city.koshigaya.saitama.jp/gikai/giin/kaiha.html"
      },
      "result": {
        "title": "令和8年３月定例会 審議結果",
        "localUrl": "/sources/koshigaya-shigikai-r8/gikaikekka80318.pdf",
        "originUrl": "https://www.city.koshigaya.saitama.jp/gikai/singi/gian/giketsu/files/gikaikekka80318.pdf",
        "archiveUrl": "https://web.archive.org/web/20260613034257/https://www.city.koshigaya.saitama.jp/gikai/singi/gian/giketsu/files/gikaikekka80318.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "反対": 7,
          "賛成": 23,
          "議長": 1
        },
        "byFaction": [
          {
            "faction": "NEXT越谷",
            "counts": {
              "反対": 7
            },
            "members": [
              {
                "name": "浅古高志",
                "stance": "反対"
              },
              {
                "name": "金井直樹",
                "stance": "反対"
              },
              {
                "name": "松島孝夫",
                "stance": "反対"
              },
              {
                "name": "武藤智",
                "stance": "反対"
              },
              {
                "name": "野口高明",
                "stance": "反対"
              },
              {
                "name": "立澤貴明",
                "stance": "反対"
              },
              {
                "name": "横井聖美",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "公明党越谷市議団",
            "counts": {
              "賛成": 5,
              "議長": 1
            },
            "members": [
              {
                "name": "竹内栄治",
                "stance": "賛成"
              },
              {
                "name": "瀬賀恭子",
                "stance": "賛成"
              },
              {
                "name": "畑谷茂",
                "stance": "議長"
              },
              {
                "name": "久保田茂",
                "stance": "賛成"
              },
              {
                "name": "藤部徳治",
                "stance": "賛成"
              },
              {
                "name": "和泉田宏幸",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "自由民主党越谷市議団",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "野口佳司",
                "stance": "賛成"
              },
              {
                "name": "伊藤治",
                "stance": "賛成"
              },
              {
                "name": "島田玲子",
                "stance": "賛成"
              },
              {
                "name": "小林豊代子",
                "stance": "賛成"
              },
              {
                "name": "清田巳喜男",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "こしがや無所属の会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "白川秀嗣",
                "stance": "賛成"
              },
              {
                "name": "菊地貴光",
                "stance": "賛成"
              },
              {
                "name": "大野恭子",
                "stance": "賛成"
              },
              {
                "name": "斎藤豪人",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "立憲民主党越谷市議団",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "後藤孝江",
                "stance": "賛成"
              },
              {
                "name": "小口高寛",
                "stance": "賛成"
              },
              {
                "name": "土屋来夢",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党越谷市議団",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "工藤秀次",
                "stance": "賛成"
              },
              {
                "name": "山田大助",
                "stance": "賛成"
              },
              {
                "name": "大和田哲",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本維新の会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "小林成好",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "清水泉",
                "stance": "賛成"
              },
              {
                "name": "大田ちひろ",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年３月定例会 審議結果",
          "localUrl": "/sources/koshigaya-shigikai-r8/gikaikekka80318.pdf",
          "originUrl": "https://www.city.koshigaya.saitama.jp/gikai/singi/gian/giketsu/files/gikaikekka80318.pdf",
          "archiveUrl": "https://web.archive.org/web/20260613034257/https://www.city.koshigaya.saitama.jp/gikai/singi/gian/giketsu/files/gikaikekka80318.pdf"
        }
      }
    }
  ],
  "121002": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "千葉市議会",
      "seats": 50,
      "teisu": 50,
      "asOf": "2025-04-07",
      "asOfLabel": "2025年4月7日",
      "factions": [
        {
          "name": "自由民主党千葉市議会議員団",
          "seats": 17,
          "isIndependent": false
        },
        {
          "name": "立憲民主・無所属千葉市議会議員団",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "公明党千葉市議会議員団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "日本共産党千葉市議会議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "日本維新の会ちば",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属（黒澤和泉）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（大平真弘）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（蛭田浩文）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（櫻井崇）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "15",
        "billName": "令和8年度千葉市一般会計予算",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-17",
        "decidedDateLabel": "令和8年3月17日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 千葉市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（更新日 2025年4月7日）",
        "localUrl": "/sources/chiba-shigikai-r8/kaiha.html",
        "originUrl": "https://web.archive.org/web/20251018071933id_/https://www.city.chiba.jp/shigikai/kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20251018071933id_/https://www.city.chiba.jp/shigikai/kaiha.html"
      },
      "result": {
        "title": "令和8年第1回定例会市長提出議案議決結果",
        "localUrl": "/sources/chiba-shigikai-r8/sichoteisyutu2601.html",
        "originUrl": "https://www.city.chiba.jp/shigikai/sichoteisyutu2601.html",
        "archiveUrl": "https://web.archive.org/web/20260418042512/https://www.city.chiba.jp/shigikai/sichoteisyutu2601.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 41,
          "議長": 1,
          "反対": 8
        },
        "byFaction": [
          {
            "faction": "自由民主党千葉市議会議員団",
            "counts": {
              "賛成": 16,
              "議長": 1
            },
            "members": [
              {
                "name": "松坂吉則",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "立憲民主・無所属千葉市議会議員団",
            "counts": {
              "賛成": 11
            },
            "members": []
          },
          {
            "faction": "公明党千葉市議会議員団",
            "counts": {
              "賛成": 8
            },
            "members": []
          },
          {
            "faction": "日本共産党千葉市議会議員団",
            "counts": {
              "反対": 7
            },
            "members": []
          },
          {
            "faction": "日本維新の会ちば",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "無所属（黒澤和泉）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "黒澤和泉",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属（大平真弘）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "大平真弘",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（蛭田浩文）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "蛭田浩文",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（櫻井崇）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "櫻井崇",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年第1回定例会議決結果（賛否）表",
          "localUrl": "/sources/chiba-shigikai-r8/sichoteisyutu2601.html",
          "originUrl": "https://www.city.chiba.jp/shigikai/sichoteisyutu2601.html",
          "archiveUrl": "https://web.archive.org/web/20260418042512/https://www.city.chiba.jp/shigikai/sichoteisyutu2601.html"
        }
      }
    }
  ],
  "122041": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "船橋市議会",
      "seats": 49,
      "asOf": "2026-03-25",
      "asOfLabel": "2026年3月25日",
      "factions": [
        {
          "name": "市民民主連合",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "結",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "清風会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "飛翔",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "市政会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 4,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第1号",
        "billName": "令和8年度船橋市一般会計予算",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 船橋市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議決結果（令和8年第1回定例会）の会派構成（令和8年3月25日）",
        "localUrl": "/sources/funabashi-shigikai-r8/p145453.html",
        "originUrl": "https://www.city.funabashi.lg.jp/assembly/001/39/02/p145453.html",
        "archiveUrl": "https://web.archive.org/web/20261001180932/https://www.city.funabashi.lg.jp/assembly/001/39/02/p145453.html"
      },
      "result": {
        "title": "議決結果（令和8年第1回定例会）",
        "localUrl": "/sources/funabashi-shigikai-r8/p145453.html",
        "originUrl": "https://www.city.funabashi.lg.jp/assembly/001/39/02/p145453.html",
        "archiveUrl": "https://web.archive.org/web/20261001180932/https://www.city.funabashi.lg.jp/assembly/001/39/02/p145453.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 41,
          "議長": 1,
          "欠席": 1,
          "反対": 6
        },
        "byFaction": [
          {
            "faction": "市民民主連合",
            "counts": {
              "賛成": 9,
              "議長": 1
            },
            "members": [
              {
                "name": "大沢たかのり",
                "stance": "賛成"
              },
              {
                "name": "中谷あやの",
                "stance": "賛成"
              },
              {
                "name": "池沢みちよ",
                "stance": "賛成"
              },
              {
                "name": "高橋けんたろう",
                "stance": "賛成"
              },
              {
                "name": "三橋さぶろう",
                "stance": "賛成"
              },
              {
                "name": "川井洋基",
                "stance": "賛成"
              },
              {
                "name": "浦田秀夫",
                "stance": "賛成"
              },
              {
                "name": "神田廣栄",
                "stance": "賛成"
              },
              {
                "name": "斉藤誠",
                "stance": "賛成"
              },
              {
                "name": "岡田とおる",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 8,
              "欠席": 1
            },
            "members": [
              {
                "name": "葛生正文",
                "stance": "賛成"
              },
              {
                "name": "草場智泉",
                "stance": "賛成"
              },
              {
                "name": "上田美穂",
                "stance": "欠席"
              },
              {
                "name": "鈴木心一",
                "stance": "賛成"
              },
              {
                "name": "木村修",
                "stance": "賛成"
              },
              {
                "name": "松橋浩嗣",
                "stance": "賛成"
              },
              {
                "name": "橋本和子",
                "stance": "賛成"
              },
              {
                "name": "松嵜裕次",
                "stance": "賛成"
              },
              {
                "name": "鈴木いくお",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "結",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "米原まさと",
                "stance": "賛成"
              },
              {
                "name": "青木はるか",
                "stance": "賛成"
              },
              {
                "name": "市川たけし",
                "stance": "賛成"
              },
              {
                "name": "林としのり",
                "stance": "賛成"
              },
              {
                "name": "藤代清七郎",
                "stance": "賛成"
              },
              {
                "name": "小平奈緒",
                "stance": "賛成"
              },
              {
                "name": "いとう紀子",
                "stance": "賛成"
              },
              {
                "name": "浅野賢也",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "清風会",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "島田たいぞう",
                "stance": "賛成"
              },
              {
                "name": "杉川浩",
                "stance": "賛成"
              },
              {
                "name": "七戸俊治",
                "stance": "賛成"
              },
              {
                "name": "滝口宏",
                "stance": "賛成"
              },
              {
                "name": "鈴木和美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 5
            },
            "members": [
              {
                "name": "かなみつ理恵",
                "stance": "反対"
              },
              {
                "name": "神子そよ子",
                "stance": "反対"
              },
              {
                "name": "松崎さち",
                "stance": "反対"
              },
              {
                "name": "金沢和子",
                "stance": "反対"
              },
              {
                "name": "岩井友子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "飛翔",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "かいさち",
                "stance": "賛成"
              },
              {
                "name": "今仲きいこ",
                "stance": "賛成"
              },
              {
                "name": "佐藤つぐみ",
                "stance": "賛成"
              },
              {
                "name": "齊藤和夫",
                "stance": "賛成"
              },
              {
                "name": "大沢ひろゆき",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市政会",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "滝口一馬",
                "stance": "賛成"
              },
              {
                "name": "日色健人",
                "stance": "賛成"
              },
              {
                "name": "渡辺賢次",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属",
            "counts": {
              "反対": 1,
              "賛成": 3
            },
            "members": [
              {
                "name": "はまの太郎",
                "stance": "反対"
              },
              {
                "name": "三宅けいこ",
                "stance": "賛成"
              },
              {
                "name": "佐々木克敏",
                "stance": "賛成"
              },
              {
                "name": "朝倉幹晴",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年第1回定例会 議案等に対する賛否について（令和8年3月25日議決）",
          "localUrl": "/sources/funabashi-shigikai-r8/8-3-25.pdf",
          "originUrl": "https://www.city.funabashi.lg.jp/assembly/001/39/02/p145453_d/fil/8-3-25.pdf",
          "archiveUrl": "https://web.archive.org/web/20260515063422/https://www.city.funabashi.lg.jp/assembly/001/39/02/p145453_d/fil/8-3-25.pdf"
        }
      }
    }
  ],
  "122173": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "柏市議会",
      "seats": 35,
      "asOf": "2026-03-24",
      "asOfLabel": "2026年3月24日",
      "factions": [
        {
          "name": "柏清風",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "みらい構想かしわ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "市民サイド",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "共創かしわ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "柏エナジー",
          "seats": 2,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "34",
        "billName": "令和８年度柏市一般会計予算について",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 柏市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "かしわ市議会だより253号 2面 会派名簿（令和８年３月24日現在）",
        "localUrl": "/sources/kashiwa-shigikai-r8/gikaidayori253goup2.pdf",
        "originUrl": "https://www.city.kashiwa.lg.jp/documents/45575/gikaidayori253goup2.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001193104/https://www.city.kashiwa.lg.jp/documents/45575/gikaidayori253goup2.pdf"
      },
      "result": {
        "title": "令和8年第1回定例会 議決結果一覧【3月24日】（議案）",
        "localUrl": "/sources/kashiwa-shigikai-r8/giantouhyoukekka2.pdf",
        "originUrl": "https://www.city.kashiwa.lg.jp/documents/45162/giantouhyoukekka2.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001181347/https://www.city.kashiwa.lg.jp/documents/45162/giantouhyoukekka2.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "132012": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "八王子市議会",
      "seats": 38,
      "asOf": "2025-06-09",
      "asOfLabel": "2025年6月9日",
      "factions": [
        {
          "name": "自民党新政会",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "八王子市議会公明党",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "日本共産党八王子市議会議員団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "立憲民主・市民の会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "諸派",
          "seats": 7,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第5号",
        "billName": "令和8年度八王子市一般会計予算について",
        "sessionLabel": "令和8年第1回市議会定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 八王子市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派名簿（令和7年（2025年）6月9日現在）",
        "localUrl": "/sources/hachioji-shigikai-r8/R7-6-9.pdf",
        "originUrl": "https://www.city.hachioji.tokyo.jp/contents/shigikai_1/giin/kakushu/p010679_d/fil/R7-6-9.pdf",
        "archiveUrl": "https://web.archive.org/web/20261002113757/https://www.city.hachioji.tokyo.jp/contents/shigikai_1/giin/kakushu/p010679_d/fil/R7-6-9.pdf"
      },
      "result": {
        "title": "令和8年(2026年)第1回市議会定例会 議案の一覧",
        "localUrl": "/sources/hachioji-shigikai-r8/p037014.html",
        "originUrl": "https://www.city.hachioji.tokyo.jp/contents/shigikai_1/gikainokatudou/honnkaigi/reiwa8/p037014.html",
        "archiveUrl": "https://web.archive.org/web/20260420122418/https://www.city.hachioji.tokyo.jp/contents/shigikai_1/gikainokatudou/honnkaigi/reiwa8/p037014.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 30,
          "議長": 1,
          "反対": 7
        },
        "byFaction": [
          {
            "faction": "自民党新政会",
            "counts": {
              "賛成": 11
            },
            "members": [
              {
                "name": "長谷川順子",
                "stance": "賛成"
              },
              {
                "name": "内田由香利",
                "stance": "賛成"
              },
              {
                "name": "立川寛之",
                "stance": "賛成"
              },
              {
                "name": "西室真希",
                "stance": "賛成"
              },
              {
                "name": "岸田功典",
                "stance": "賛成"
              },
              {
                "name": "川村奈緒美",
                "stance": "賛成"
              },
              {
                "name": "岩田祐樹",
                "stance": "賛成"
              },
              {
                "name": "吉本孝良",
                "stance": "賛成"
              },
              {
                "name": "鈴木玲央",
                "stance": "賛成"
              },
              {
                "name": "福安徹",
                "stance": "賛成"
              },
              {
                "name": "小林秀司",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "八王子市議会公明党",
            "counts": {
              "議長": 1,
              "賛成": 9
            },
            "members": [
              {
                "name": "美濃部弥生",
                "stance": "議長"
              },
              {
                "name": "古里幸太郎",
                "stance": "賛成"
              },
              {
                "name": "森重博正",
                "stance": "賛成"
              },
              {
                "name": "日下部広志",
                "stance": "賛成"
              },
              {
                "name": "久保井博美",
                "stance": "賛成"
              },
              {
                "name": "冨永純子",
                "stance": "賛成"
              },
              {
                "name": "渡口禎",
                "stance": "賛成"
              },
              {
                "name": "中島正寿",
                "stance": "賛成"
              },
              {
                "name": "五間浩",
                "stance": "賛成"
              },
              {
                "name": "村松徹",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党八王子市議会議員団",
            "counts": {
              "反対": 5
            },
            "members": [
              {
                "name": "綿林夕夏",
                "stance": "反対"
              },
              {
                "name": "望月翔平",
                "stance": "反対"
              },
              {
                "name": "市川克宏",
                "stance": "反対"
              },
              {
                "name": "石井宏和",
                "stance": "反対"
              },
              {
                "name": "鈴木勇次",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "立憲民主・市民の会",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "浜野正太",
                "stance": "賛成"
              },
              {
                "name": "九鬼ともみ",
                "stance": "賛成"
              },
              {
                "name": "森喜彦",
                "stance": "賛成"
              },
              {
                "name": "安藤修三",
                "stance": "賛成"
              },
              {
                "name": "小林裕恵",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "諸派",
            "counts": {
              "賛成": 5,
              "反対": 2
            },
            "members": [
              {
                "name": "高橋剛",
                "stance": "賛成"
              },
              {
                "name": "舩木翔平",
                "stance": "賛成"
              },
              {
                "name": "玉正彩加",
                "stance": "反対"
              },
              {
                "name": "金子亜希子",
                "stance": "反対"
              },
              {
                "name": "山本貴士",
                "stance": "賛成"
              },
              {
                "name": "及川賢一",
                "stance": "賛成"
              },
              {
                "name": "星野直美",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年第１回定例会 記名投票を行った議案 個人別賛否",
          "localUrl": "/sources/hachioji-shigikai-r8/r8yosan_kimei.pdf",
          "originUrl": "https://www.city.hachioji.tokyo.jp/contents/shigikai_1/gikainokatudou/honnkaigi/reiwa8/p037014_d/fil/r8yosan_kimei.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002113829/https://www.city.hachioji.tokyo.jp/contents/shigikai_1/gikainokatudou/honnkaigi/reiwa8/p037014_d/fil/r8yosan_kimei.pdf"
        }
      }
    }
  ],
  "141003": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "横浜市会",
      "seats": 86,
      "teisu": 86,
      "asOf": "2026-01-27",
      "asOfLabel": "2026年1月27日",
      "factions": [
        {
          "name": "自由民主党",
          "seats": 32,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 15,
          "isIndependent": false
        },
        {
          "name": "立憲民主党・無所属の会",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "日本維新の会・無所属の会",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "国民民主党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "地域政党よこはま",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属（太田正孝）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（井上さくら）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（梶村充）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（輿石かつ子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（荻原隆宏）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（長谷川えつこ）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（大野トモイ）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "市第76号議案",
        "billName": "令和８年度横浜市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 横浜市会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（令和8年1月27日現在）",
        "localUrl": "/sources/yokohama-shikai-r8/kaihabetsu.html",
        "originUrl": "https://web.archive.org/web/20260220080313id_/https://www.city.yokohama.lg.jp/shikai/giin/kaihabetsu.html",
        "archiveUrl": "https://web.archive.org/web/20260220080313id_/https://www.city.yokohama.lg.jp/shikai/giin/kaihabetsu.html"
      },
      "result": {
        "title": "令和８年３月24日 本会議 議決結果（議員別賛否一覧）",
        "localUrl": "/sources/yokohama-shikai-r8/20260324_sanpi.pdf",
        "originUrl": "https://www.city.yokohama.lg.jp/shikai/kiroku/kekka/kaihabetsu.files/20260324_sanpi.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001160601/https://www.city.yokohama.lg.jp/shikai/kiroku/kekka/kaihabetsu.files/20260324_sanpi.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 75,
          "欠席": 2,
          "議長": 1,
          "反対": 8
        },
        "byFaction": [
          {
            "faction": "自由民主党",
            "counts": {
              "賛成": 30,
              "欠席": 1,
              "議長": 1
            },
            "members": [
              {
                "name": "青木亮祐",
                "stance": "賛成"
              },
              {
                "name": "東みちよ",
                "stance": "賛成"
              },
              {
                "name": "伊波俊之助",
                "stance": "賛成"
              },
              {
                "name": "磯部圭太",
                "stance": "欠席"
              },
              {
                "name": "おさかべさやか",
                "stance": "賛成"
              },
              {
                "name": "大桑正貴",
                "stance": "賛成"
              },
              {
                "name": "鴨志田啓介",
                "stance": "賛成"
              },
              {
                "name": "川口広",
                "stance": "賛成"
              },
              {
                "name": "黒川勝",
                "stance": "賛成"
              },
              {
                "name": "小松範昭",
                "stance": "賛成"
              },
              {
                "name": "佐藤茂",
                "stance": "賛成"
              },
              {
                "name": "佐藤祐文",
                "stance": "賛成"
              },
              {
                "name": "斉藤達也",
                "stance": "賛成"
              },
              {
                "name": "酒井誠",
                "stance": "賛成"
              },
              {
                "name": "清水富雄",
                "stance": "賛成"
              },
              {
                "name": "白井亮次",
                "stance": "賛成"
              },
              {
                "name": "鈴木太郎",
                "stance": "賛成"
              },
              {
                "name": "瀬之間康浩",
                "stance": "賛成"
              },
              {
                "name": "関勝則",
                "stance": "賛成"
              },
              {
                "name": "田野井一雄",
                "stance": "賛成"
              },
              {
                "name": "長谷川琢磨",
                "stance": "賛成"
              },
              {
                "name": "福地茂",
                "stance": "賛成"
              },
              {
                "name": "伏見幸枝",
                "stance": "賛成"
              },
              {
                "name": "藤代哲夫",
                "stance": "賛成"
              },
              {
                "name": "増永純女",
                "stance": "賛成"
              },
              {
                "name": "松本研",
                "stance": "賛成"
              },
              {
                "name": "山下正人",
                "stance": "賛成"
              },
              {
                "name": "山田一誠",
                "stance": "賛成"
              },
              {
                "name": "横山正人",
                "stance": "賛成"
              },
              {
                "name": "横山勇太朗",
                "stance": "賛成"
              },
              {
                "name": "渡邊忠則",
                "stance": "賛成"
              },
              {
                "name": "渋谷健",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 14,
              "欠席": 1
            },
            "members": [
              {
                "name": "安西英俊",
                "stance": "賛成"
              },
              {
                "name": "市来栄美子",
                "stance": "欠席"
              },
              {
                "name": "尾崎太",
                "stance": "賛成"
              },
              {
                "name": "木内秀一",
                "stance": "賛成"
              },
              {
                "name": "行田朝仁",
                "stance": "賛成"
              },
              {
                "name": "久保和弘",
                "stance": "賛成"
              },
              {
                "name": "斉藤伸一",
                "stance": "賛成"
              },
              {
                "name": "髙橋正治",
                "stance": "賛成"
              },
              {
                "name": "竹内康洋",
                "stance": "賛成"
              },
              {
                "name": "武田勝久",
                "stance": "賛成"
              },
              {
                "name": "竹野内猛",
                "stance": "賛成"
              },
              {
                "name": "中島光徳",
                "stance": "賛成"
              },
              {
                "name": "仁田昌寿",
                "stance": "賛成"
              },
              {
                "name": "福島直子",
                "stance": "賛成"
              },
              {
                "name": "望月康弘",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "立憲民主党・無所属の会",
            "counts": {
              "賛成": 12
            },
            "members": [
              {
                "name": "越久田記子",
                "stance": "賛成"
              },
              {
                "name": "大岩真善和",
                "stance": "賛成"
              },
              {
                "name": "かざまあさみ",
                "stance": "賛成"
              },
              {
                "name": "田中ゆき",
                "stance": "賛成"
              },
              {
                "name": "髙田修平",
                "stance": "賛成"
              },
              {
                "name": "中山大輔",
                "stance": "賛成"
              },
              {
                "name": "花上喜代志",
                "stance": "賛成"
              },
              {
                "name": "藤崎浩太郎",
                "stance": "賛成"
              },
              {
                "name": "麓理恵",
                "stance": "賛成"
              },
              {
                "name": "森ひろたか",
                "stance": "賛成"
              },
              {
                "name": "谷田部孝一",
                "stance": "賛成"
              },
              {
                "name": "山浦英太",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本維新の会・無所属の会",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "いそべ尚哉",
                "stance": "賛成"
              },
              {
                "name": "伊藤くみこ",
                "stance": "賛成"
              },
              {
                "name": "大山しょうじ",
                "stance": "賛成"
              },
              {
                "name": "柏原すぐる",
                "stance": "賛成"
              },
              {
                "name": "くしだ久子",
                "stance": "賛成"
              },
              {
                "name": "坂井太",
                "stance": "賛成"
              },
              {
                "name": "田中紳一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "国民民主党",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "熊本ちひろ",
                "stance": "賛成"
              },
              {
                "name": "こがゆ康弘",
                "stance": "賛成"
              },
              {
                "name": "坂本勝司",
                "stance": "賛成"
              },
              {
                "name": "深作祐衣",
                "stance": "賛成"
              },
              {
                "name": "二井くみよ",
                "stance": "賛成"
              },
              {
                "name": "横溝じゅん子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 5
            },
            "members": [
              {
                "name": "宇佐美さやか",
                "stance": "反対"
              },
              {
                "name": "大和田あきお",
                "stance": "反対"
              },
              {
                "name": "白井正子",
                "stance": "反対"
              },
              {
                "name": "古谷靖彦",
                "stance": "反対"
              },
              {
                "name": "みわ智恵美",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "地域政党よこはま",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "関嵩史",
                "stance": "賛成"
              },
              {
                "name": "山田桂一郎",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（太田正孝）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "太田正孝",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属（井上さくら）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "井上さくら",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属（梶村充）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "梶村充",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（輿石かつ子）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "輿石かつ子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（荻原隆宏）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "荻原隆宏",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属（長谷川えつこ）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "長谷川えつこ",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（大野トモイ）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "大野トモイ",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年３月24日 本会議 議決結果（議員別賛否一覧）",
          "localUrl": "/sources/yokohama-shikai-r8/20260324_sanpi.pdf",
          "originUrl": "https://www.city.yokohama.lg.jp/shikai/kiroku/kekka/kaihabetsu.files/20260324_sanpi.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001160601/https://www.city.yokohama.lg.jp/shikai/kiroku/kekka/kaihabetsu.files/20260324_sanpi.pdf"
        }
      }
    }
  ],
  "141305": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "川崎市議会",
      "seats": 59,
      "teisu": 60,
      "asOf": "2026-01-20",
      "asOfLabel": "2026年1月20日",
      "factions": [
        {
          "name": "自由民主党川崎市議会議員団",
          "seats": 16,
          "isIndependent": false
        },
        {
          "name": "みらい川崎市議会議員団",
          "seats": 14,
          "isIndependent": false
        },
        {
          "name": "公明党川崎市議会議員団",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "日本共産党川崎市議会議員団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "あしたの川崎・日本維新の会川崎市議会議員団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "無所属（飯田満）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（月本琢也）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（三浦恵美）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（三宅隆介）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（吉沢章子）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第45号",
        "billName": "令和8年度川崎市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-18",
        "decidedDateLabel": "令和8年3月18日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 川崎市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和8年1月20日現在）",
        "localUrl": "/sources/kawasaki-gikai-r8/40-3-4-0-0-0-0-0-0-0.html",
        "originUrl": "https://www.city.kawasaki.jp/shisei/category/40-3-4-0-0-0-0-0-0-0.html",
        "archiveUrl": "https://web.archive.org/web/20260519072219/https://www.city.kawasaki.jp/shisei/category/40-3-4-0-0-0-0-0-0-0.html"
      },
      "result": {
        "title": "令和８年第１回定例会議決結果（市長提出議案）",
        "localUrl": "/sources/kawasaki-gikai-r8/0318sityou.pdf",
        "originUrl": "https://www.city.kawasaki.jp/980/cmsfiles/contents/0000183/183782/0318sityou.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001160831/https://www.city.kawasaki.jp/980/cmsfiles/contents/0000183/183782/0318sityou.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "141500": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "相模原市議会",
      "seats": 45,
      "asOf": "2025-05-21",
      "asOfLabel": "2025年5月21日",
      "factions": [
        {
          "name": "自由民主党相模原市議団",
          "seats": 14,
          "isIndependent": false
        },
        {
          "name": "民主みらい・無所属・地域政党さがみはら",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "公明党相模原市議団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "立憲民主党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本維新の会相模原市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "颯爽の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 2,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第２号",
        "billName": "令和８年度相模原市一般会計予算",
        "sessionLabel": "令和８年３月定例会議",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 相模原市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（公開日 2025年5月21日）",
        "localUrl": "/sources/sagamihara-gikai-r8/2013120600195.html",
        "originUrl": "https://web.archive.org/web/20251006233116id_/https://www.sagamihara-shigikai.jp/doc/2013120600195/",
        "archiveUrl": "https://web.archive.org/web/20251006233116id_/https://www.sagamihara-shigikai.jp/doc/2013120600195/"
      },
      "result": {
        "title": "令和８年３月定例会議・審議結果",
        "localUrl": "/sources/sagamihara-gikai-r8/2026_kekka_0324.pdf",
        "originUrl": "https://www.sagamihara-shigikai.jp/doc/2026042200084/file_contents/2026_kekka_0324.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001160928/https://www.sagamihara-shigikai.jp/doc/2026042200084/file_contents/2026_kekka_0324.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "142018": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "横須賀市議会",
      "seats": 38,
      "asOf": "2025-12-23",
      "asOfLabel": "2025年12月23日",
      "factions": [
        {
          "name": "自由民主党",
          "seats": 14,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "一市民",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "研政会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無会派",
          "seats": 5,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第18号",
        "billName": "令和８年度横須賀市一般会計予算",
        "sessionLabel": "令和８年３月定例議会",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "可決(賛成多数)"
      },
      "sourceTitle": "令和8年度 横須賀市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（更新日：2025年12月23日）",
        "localUrl": "/sources/yokosuka-shigikai-r8/giin_kaiha.html",
        "originUrl": "https://www.city.yokosuka.kanagawa.jp/7860/council/roster/giin_kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20251109223502/https://www.city.yokosuka.kanagawa.jp/7860/council/roster/giin_kaiha.html"
      },
      "result": {
        "title": "令和８年３月定例議会 提出議案等議決結果（２）",
        "localUrl": "/sources/yokosuka-shigikai-r8/20260325giketsukekka.pdf",
        "originUrl": "https://www.city.yokosuka.kanagawa.jp/7860/council/result_report/giji/documents/20260325giketsukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001181124/https://www.city.yokosuka.kanagawa.jp/7860/council/result_report/giji/documents/20260325giketsukekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 27,
          "議長": 1,
          "反対": 10
        },
        "byFaction": [
          {
            "faction": "自由民主党",
            "counts": {
              "賛成": 13,
              "議長": 1
            },
            "members": [
              {
                "name": "南まさみ",
                "stance": "賛成"
              },
              {
                "name": "青木秀介",
                "stance": "賛成"
              },
              {
                "name": "田辺昭人",
                "stance": "賛成"
              },
              {
                "name": "松岡和行",
                "stance": "賛成"
              },
              {
                "name": "大野忠之",
                "stance": "賛成"
              },
              {
                "name": "渡辺光一",
                "stance": "賛成"
              },
              {
                "name": "西郷宗範",
                "stance": "賛成"
              },
              {
                "name": "山本けんじゅ",
                "stance": "賛成"
              },
              {
                "name": "大貫次郎",
                "stance": "賛成"
              },
              {
                "name": "池田徳重",
                "stance": "賛成"
              },
              {
                "name": "髙橋いずみ",
                "stance": "賛成"
              },
              {
                "name": "泉谷翔",
                "stance": "賛成"
              },
              {
                "name": "海老あやの",
                "stance": "賛成"
              },
              {
                "name": "加藤眞道",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "土田弘之宣",
                "stance": "賛成"
              },
              {
                "name": "石山満",
                "stance": "賛成"
              },
              {
                "name": "関沢敏行",
                "stance": "賛成"
              },
              {
                "name": "本石篤志",
                "stance": "賛成"
              },
              {
                "name": "二見英一",
                "stance": "賛成"
              },
              {
                "name": "川本伸",
                "stance": "賛成"
              },
              {
                "name": "菅原恵美子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "一市民",
            "counts": {
              "反対": 5
            },
            "members": [
              {
                "name": "加藤ゆうすけ",
                "stance": "反対"
              },
              {
                "name": "小林優人",
                "stance": "反対"
              },
              {
                "name": "竹岡力",
                "stance": "反対"
              },
              {
                "name": "天白牧夫",
                "stance": "反対"
              },
              {
                "name": "堀りょういち",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "研政会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "伊関功滋",
                "stance": "賛成"
              },
              {
                "name": "長谷川昇",
                "stance": "賛成"
              },
              {
                "name": "工藤昭四郎",
                "stance": "賛成"
              },
              {
                "name": "髙橋英昭",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "大村洋子",
                "stance": "反対"
              },
              {
                "name": "井坂直",
                "stance": "反対"
              },
              {
                "name": "ふじそのあき",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無会派",
            "counts": {
              "反対": 2,
              "賛成": 3
            },
            "members": [
              {
                "name": "中川さおり",
                "stance": "反対"
              },
              {
                "name": "葉山なおし",
                "stance": "賛成"
              },
              {
                "name": "ひろなか信太郎",
                "stance": "賛成"
              },
              {
                "name": "藤野英明",
                "stance": "反対"
              },
              {
                "name": "安川健人",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年３月定例議会 提出議案等議決結果【議員別賛否】（２）",
          "localUrl": "/sources/yokosuka-shigikai-r8/260325giinbetusanpi.pdf",
          "originUrl": "https://www.city.yokosuka.kanagawa.jp/7860/council/result_report/giji/documents/260325giinbetusanpi.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002121508/https://www.city.yokosuka.kanagawa.jp/7860/council/result_report/giji/documents/260325giinbetusanpi.pdf"
        }
      }
    }
  ],
  "151009": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "新潟市議会",
      "seats": 48,
      "asOf": "2026-02-20",
      "asOfLabel": "2026年2月20日",
      "factions": [
        {
          "name": "翔政会",
          "seats": 21,
          "isIndependent": false
        },
        {
          "name": "日本共産党新潟市議会議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "新風にいがた",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "新潟市公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "ともに躍動する新潟",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "無所属の会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "市民ネットにいがた",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "会派に属さない議員（串田修平）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第1号",
        "billName": "令和８年度新潟市一般会計予算",
        "sessionLabel": "令和8年2月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 新潟市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "常任委員会 委員名簿（最終更新日 2026年2月20日）",
        "localUrl": "/sources/niigata-shigikai-r8/meibo_03jounin.html",
        "originUrl": "https://web.archive.org/web/20260305140442id_/https://www.city.niigata.lg.jp/shigikai/index_meibo/meibo_03jounin.html",
        "archiveUrl": "https://web.archive.org/web/20260305140442id_/https://www.city.niigata.lg.jp/shigikai/index_meibo/meibo_03jounin.html"
      },
      "result": {
        "title": "令和8年2月定例会 会議の結果",
        "localUrl": "/sources/niigata-shigikai-r8/r0802.html",
        "originUrl": "https://www.city.niigata.lg.jp/shigikai/index_honkaigi/honkaigi_kekka/r8kekka/r0802.html",
        "archiveUrl": "https://web.archive.org/web/20261001160224/https://www.city.niigata.lg.jp/shigikai/index_honkaigi/honkaigi_kekka/r8kekka/r0802.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 41,
          "議長": 1,
          "反対": 6
        },
        "byFaction": [
          {
            "faction": "翔政会",
            "counts": {
              "賛成": 20,
              "議長": 1
            },
            "members": [
              {
                "name": "小野清一郎",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "日本共産党新潟市議会議員団",
            "counts": {
              "反対": 6
            },
            "members": []
          },
          {
            "faction": "新風にいがた",
            "counts": {
              "賛成": 5
            },
            "members": []
          },
          {
            "faction": "新潟市公明党",
            "counts": {
              "賛成": 4
            },
            "members": []
          },
          {
            "faction": "ともに躍動する新潟",
            "counts": {
              "賛成": 4
            },
            "members": []
          },
          {
            "faction": "無所属の会",
            "counts": {
              "賛成": 4
            },
            "members": []
          },
          {
            "faction": "市民ネットにいがた",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "会派に属さない議員（串田修平）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "串田修平",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年2月定例会 会議の結果",
          "localUrl": "/sources/niigata-shigikai-r8/r0802.html",
          "originUrl": "https://www.city.niigata.lg.jp/shigikai/index_honkaigi/honkaigi_kekka/r8kekka/r0802.html",
          "archiveUrl": "https://web.archive.org/web/20261001160224/https://www.city.niigata.lg.jp/shigikai/index_honkaigi/honkaigi_kekka/r8kekka/r0802.html"
        }
      }
    }
  ],
  "162019": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "富山市議会",
      "seats": 38,
      "asOf": "2026-03-11",
      "asOfLabel": "2026年3月11日",
      "factions": [
        {
          "name": "富山市議会自由民主党",
          "seats": 15,
          "isIndependent": false
        },
        {
          "name": "自由民主党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "立憲民主党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "会派 誠政",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "政策・維新32",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "太政",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "政風会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "気魄",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "未来をつくる",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "みどり",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "参政党議員会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第１号",
        "billName": "令和８年度富山市一般会計予算",
        "sessionLabel": "令和８年３月定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 富山市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和8年3月11日現在）",
        "localUrl": "/sources/toyama-shigikai-r8/1007104.html",
        "originUrl": "https://www.city.toyama.lg.jp/gikai/giinmeibo/1007104.html",
        "archiveUrl": "https://web.archive.org/web/20260214111136/https://www.city.toyama.lg.jp/gikai/giinmeibo/1007104.html"
      },
      "result": {
        "title": "令和８年３月定例会 議案等に対する賛否について",
        "localUrl": "/sources/toyama-shigikai-r8/sanpi-r0803-2.pdf",
        "originUrl": "https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/007/118/sanpi-r0803-2.pdf",
        "archiveUrl": "https://web.archive.org/web/20261002120541/https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/007/118/sanpi-r0803-2.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 32,
          "議長": 1,
          "反対": 5
        },
        "byFaction": [
          {
            "faction": "富山市議会自由民主党",
            "counts": {
              "賛成": 14,
              "議長": 1
            },
            "members": [
              {
                "name": "木地智美",
                "stance": "賛成"
              },
              {
                "name": "飯山勝彦",
                "stance": "賛成"
              },
              {
                "name": "織田伸一",
                "stance": "賛成"
              },
              {
                "name": "高原ゆずる",
                "stance": "賛成"
              },
              {
                "name": "豊岡達郎",
                "stance": "賛成"
              },
              {
                "name": "松井邦人",
                "stance": "賛成"
              },
              {
                "name": "金谷幸則",
                "stance": "賛成"
              },
              {
                "name": "舎川智也",
                "stance": "賛成"
              },
              {
                "name": "押田大祐",
                "stance": "賛成"
              },
              {
                "name": "髙田真里",
                "stance": "賛成"
              },
              {
                "name": "髙道秋彦",
                "stance": "賛成"
              },
              {
                "name": "横野昭",
                "stance": "賛成"
              },
              {
                "name": "金厚有豊",
                "stance": "賛成"
              },
              {
                "name": "鋪田博紀",
                "stance": "賛成"
              },
              {
                "name": "高田重信",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "自由民主党",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "金岡貴裕",
                "stance": "賛成"
              },
              {
                "name": "藤田克樹",
                "stance": "賛成"
              },
              {
                "name": "久保大憲",
                "stance": "賛成"
              },
              {
                "name": "江西照康",
                "stance": "賛成"
              },
              {
                "name": "柞山数男",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "細川博徳",
                "stance": "賛成"
              },
              {
                "name": "柏佳枝",
                "stance": "賛成"
              },
              {
                "name": "松尾茂",
                "stance": "賛成"
              },
              {
                "name": "松井桂将",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "立憲民主党",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "岡部享",
                "stance": "賛成"
              },
              {
                "name": "東篤",
                "stance": "賛成"
              },
              {
                "name": "村石篤",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派 誠政",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "尾上一彦",
                "stance": "賛成"
              },
              {
                "name": "橋本雅雄",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "政策・維新32",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "金井毅俊",
                "stance": "反対"
              },
              {
                "name": "大島満",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "赤星ゆかり",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "太政",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "村上和久",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "政風会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "市田龍一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "気魄",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "谷口寿一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "未来をつくる",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "福田敏彦",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "みどり",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "野上明人",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "参政党議員会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "金山茜",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年３月定例会 議案等に対する賛否について",
          "localUrl": "/sources/toyama-shigikai-r8/sanpi-r0803-2.pdf",
          "originUrl": "https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/007/118/sanpi-r0803-2.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002120541/https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/007/118/sanpi-r0803-2.pdf"
        }
      }
    }
  ],
  "182010": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "福井市議会",
      "seats": 31,
      "asOf": "2025-06-16",
      "asOfLabel": "2025年6月16日",
      "factions": [
        {
          "name": "一真会",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "新政会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "会派に属さない議員",
          "seats": 2,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第１号議案",
        "billName": "令和８年度福井市一般会計予算",
        "sessionLabel": "令和８年３月定例会",
        "decidedDate": "2026-03-19",
        "decidedDateLabel": "令和8年3月19日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 福井市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派等名簿（令和7年6月16日現在）",
        "localUrl": "/sources/fukui-shigikai-r8/p015912.html",
        "originUrl": "https://web.archive.org/web/20251210153637id_/https://www.city.fukui.lg.jp/sisei/gikai/giin/p015912.html",
        "archiveUrl": "https://web.archive.org/web/20251210153637id_/https://www.city.fukui.lg.jp/sisei/gikai/giin/p015912.html"
      },
      "result": {
        "title": "令和８年３月定例会提出議案等及び審議結果",
        "localUrl": "/sources/fukui-shigikai-r8/R803t.pdf",
        "originUrl": "https://www.city.fukui.lg.jp/sisei/gikai/shingigian/p004023_d/fil/R803t.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001193603/https://www.city.fukui.lg.jp/sisei/gikai/shingigian/p004023_d/fil/R803t.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "190004": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "山梨県議会",
      "seats": 36,
      "asOf": "2025-09-17",
      "asOfLabel": "2025年9月17日",
      "factions": [
        {
          "name": "自由民主党 政風やまなし",
          "seats": 15,
          "isIndependent": false
        },
        {
          "name": "自由民主党新緑の会",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "未来やまなし",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "自由民主党・開の国",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "リベラル山梨",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "やまなし県民会議",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "えがお夢",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第27号",
        "billName": "令和8年度山梨県一般会計予算",
        "sessionLabel": "令和8年2月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 山梨県議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（令和7年9月17日）",
        "localUrl": "/sources/yamanashi-ken-gikai-r8/kaihabetu_meibo.html",
        "originUrl": "https://web.archive.org/web/20260209231452id_/https://www.pref.yamanashi.jp/gikaisom/kaihabetu_meibo.html",
        "archiveUrl": "https://web.archive.org/web/20260209231452id_/https://www.pref.yamanashi.jp/gikaisom/kaihabetu_meibo.html"
      },
      "result": {
        "title": "令和8年2月定例会 議決結果（3月23日）",
        "localUrl": "/sources/yamanashi-ken-gikai-r8/giketu_0323.pdf",
        "originUrl": "https://www.pref.yamanashi.jp/documents/124451/giketu_0323.pdf",
        "archiveUrl": "https://web.archive.org/web/20260710133628/https://www.pref.yamanashi.jp/documents/124451/giketu_0323.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "欠席": 1,
          "賛成": 31,
          "議長": 1,
          "反対": 3
        },
        "byFaction": [
          {
            "faction": "自由民主党 政風やまなし",
            "counts": {
              "欠席": 1,
              "賛成": 13,
              "議長": 1
            },
            "members": [
              {
                "name": "望月勝",
                "stance": "欠席"
              },
              {
                "name": "河西敏郎",
                "stance": "賛成"
              },
              {
                "name": "山田一功",
                "stance": "賛成"
              },
              {
                "name": "水岸富美男",
                "stance": "賛成"
              },
              {
                "name": "卯月政人",
                "stance": "賛成"
              },
              {
                "name": "渡辺淳也",
                "stance": "議長"
              },
              {
                "name": "宮本秀憲",
                "stance": "賛成"
              },
              {
                "name": "大久保俊雄",
                "stance": "賛成"
              },
              {
                "name": "藤本好彦",
                "stance": "賛成"
              },
              {
                "name": "向山憲稔",
                "stance": "賛成"
              },
              {
                "name": "飯島力男",
                "stance": "賛成"
              },
              {
                "name": "久嶋成美",
                "stance": "賛成"
              },
              {
                "name": "石原政信",
                "stance": "賛成"
              },
              {
                "name": "中村正仁",
                "stance": "賛成"
              },
              {
                "name": "寺田義彦",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "自由民主党新緑の会",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "流石恭史",
                "stance": "賛成"
              },
              {
                "name": "臼井友基",
                "stance": "賛成"
              },
              {
                "name": "桐原正仁",
                "stance": "賛成"
              },
              {
                "name": "長澤健",
                "stance": "賛成"
              },
              {
                "name": "小沢栄一",
                "stance": "賛成"
              },
              {
                "name": "伊藤毅",
                "stance": "賛成"
              },
              {
                "name": "望月大輔",
                "stance": "賛成"
              },
              {
                "name": "渡辺大喜",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "未来やまなし",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "土橋亨",
                "stance": "賛成"
              },
              {
                "name": "清水喜美男",
                "stance": "賛成"
              },
              {
                "name": "古屋雅夫",
                "stance": "賛成"
              },
              {
                "name": "笠井辰生",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "自由民主党・開の国",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "浅川力三",
                "stance": "賛成"
              },
              {
                "name": "白壁賢一",
                "stance": "賛成"
              },
              {
                "name": "久保田松幸",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "名取泰",
                "stance": "反対"
              },
              {
                "name": "菅野幹子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "佐野弘仁",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "リベラル山梨",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "飯島修",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "やまなし県民会議",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "志村直毅",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "えがお夢",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "福井太一",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "議案に対する賛否一覧（令和8年3月23日分）",
          "localUrl": "/sources/yamanashi-ken-gikai-r8/sanpiichiran_0323.pdf",
          "originUrl": "https://www.pref.yamanashi.jp/documents/124451/sanpiichiran_0323.pdf",
          "archiveUrl": "https://web.archive.org/web/20260710133448/https://www.pref.yamanashi.jp/documents/124451/sanpiichiran_0323.pdf"
        }
      }
    }
  ],
  "192082": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "南アルプス市議会",
      "seats": 22,
      "teisu": 22,
      "asOf": "2026-01-09",
      "asOfLabel": "2026年1月9日",
      "factions": [
        {
          "name": "新政南アルプス",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "躍進会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "かがやき21",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "未来創政の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本共産党南アルプス市議団",
          "seats": 2,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案 26",
        "billName": "一般会計予算",
        "sessionLabel": "第1回定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 南アルプス市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "各会派構成（令和8年1月9日現在）",
        "localUrl": "/sources/minami-alps-gikai-r8/______R8.1.9__.pdf",
        "originUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/0/8/0/1/_/______R8.1.9__.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001143245/https://www.city.minami-alps.yamanashi.jp/fs/1/4/0/8/0/1/_/______R8.1.9__.pdf"
      },
      "result": {
        "title": "南アルプス市議会だより No.92",
        "localUrl": "/sources/minami-alps-gikai-r8/________________92_.pdf",
        "originUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/2/8/3/4/_/________________92_.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001143322/https://www.city.minami-alps.yamanashi.jp/fs/1/4/2/8/3/4/_/________________92_.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "192091": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "北杜市議会",
      "seats": 20,
      "asOf": "2024-11-28",
      "asOfLabel": "2024年11月28日",
      "factions": [
        {
          "name": "みらい創生",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "ポラリス北杜",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "北杜クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無会派",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "北杜オール・イン・ワン",
          "seats": 2,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第28号",
        "billName": "令和8年度北杜市一般会計予算",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-16",
        "decidedDateLabel": "令和8年3月16日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 北杜市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "北杜市議会議員所属会派（令和6年11月28日現在）",
        "localUrl": "/sources/hokuto-gikai-r8/_____R6.11.28___1_.pdf",
        "originUrl": "https://www.city.hokuto.yamanashi.jp/fs/4/3/2/3/0/2/_/_____R6.11.28___1_.pdf",
        "archiveUrl": "https://web.archive.org/web/20260517091748/https://www.city.hokuto.yamanashi.jp/fs/4/3/2/3/0/2/_/_____R6.11.28___1_.pdf"
      },
      "result": {
        "title": "北杜市議会だより 第86号",
        "localUrl": "/sources/hokuto-gikai-r8/_______86_.pdf",
        "originUrl": "https://www.city.hokuto.yamanashi.jp/fs/5/0/0/6/4/8/_/_______86_.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001142745/https://www.city.hokuto.yamanashi.jp/fs/5/0/0/6/4/8/_/_______86_.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 13,
          "議長": 1,
          "反対": 6
        },
        "byFaction": [
          {
            "faction": "みらい創生",
            "counts": {
              "賛成": 3,
              "議長": 1
            },
            "members": [
              {
                "name": "保坂多枝子",
                "stance": "賛成"
              },
              {
                "name": "加藤紀雄",
                "stance": "賛成"
              },
              {
                "name": "神田正人",
                "stance": "賛成"
              },
              {
                "name": "大芝正和",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "ポラリス北杜",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "輿水崇",
                "stance": "賛成"
              },
              {
                "name": "髙見澤伸光",
                "stance": "賛成"
              },
              {
                "name": "輿石知宏",
                "stance": "賛成"
              },
              {
                "name": "大塚愛",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "北杜クラブ",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "秋山俊和",
                "stance": "賛成"
              },
              {
                "name": "齊藤功文",
                "stance": "賛成"
              },
              {
                "name": "秋山真一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "内田俊彦",
                "stance": "賛成"
              },
              {
                "name": "進藤正文",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "清水進",
                "stance": "反対"
              },
              {
                "name": "志村清",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "北杜オール・イン・ワン",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "中山喜夫",
                "stance": "反対"
              },
              {
                "name": "山﨑君江",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無会派",
            "counts": {
              "反対": 2,
              "賛成": 1
            },
            "members": [
              {
                "name": "中村典子",
                "stance": "反対"
              },
              {
                "name": "飛矢﨑雅也",
                "stance": "反対"
              },
              {
                "name": "浅川勝正",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "北杜市議会だより 第86号 賛否のあった議案等（議長を除く）",
          "localUrl": "/sources/hokuto-gikai-r8/_______86_.pdf",
          "originUrl": "https://www.city.hokuto.yamanashi.jp/fs/5/0/0/6/4/8/_/_______86_.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001142745/https://www.city.hokuto.yamanashi.jp/fs/5/0/0/6/4/8/_/_______86_.pdf"
        }
      }
    }
  ],
  "192112": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "笛吹市議会",
      "seats": 19,
      "asOf": "2025-06-10",
      "asOfLabel": "2025年6月10日",
      "factions": [
        {
          "name": "笛新会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "笛政クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "清心会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "煌・フォーラム21",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無会派",
          "seats": 2,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第18号",
        "billName": "令和8年度笛吹市一般会計予算について",
        "sessionLabel": "令和8年笛吹市議会第1回定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 笛吹市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "笛吹市議会 会派一覧表（令和7年6月10日現在）",
        "localUrl": "/sources/fuefuki-gikai-r8/kaihaitiran.pdf",
        "originUrl": "https://www.city.fuefuki.yamanashi.jp/documents/1142/kaihaitiran.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001144140/https://www.city.fuefuki.yamanashi.jp/documents/1142/kaihaitiran.pdf"
      },
      "result": {
        "title": "令和8年笛吹市議会第1回定例会 議決案件一覧",
        "localUrl": "/sources/fuefuki-gikai-r8/r81giketuitirann.pdf",
        "originUrl": "https://www.city.fuefuki.yamanashi.jp/documents/11778/r81giketuitirann.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001143123/https://www.city.fuefuki.yamanashi.jp/documents/11778/r81giketuitirann.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "202011": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "長野市議会",
      "seats": 36,
      "asOf": "2025-12-01",
      "asOfLabel": "2025年12月1日",
      "factions": [
        {
          "name": "長野市議会新友会",
          "seats": 18,
          "isIndependent": false
        },
        {
          "name": "公明党長野市議員団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党長野市会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "改革ながの市民ネット",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "次世代長野",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 3,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "1",
        "billName": "令和8年度長野市一般会計予算",
        "sessionLabel": "令和8年3月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 長野市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（令和7年12月1日現在）",
        "localUrl": "/sources/nagano-shigikai-r8/p005269.html",
        "originUrl": "https://web.archive.org/web/20260421110348id_/https://www.city.nagano.nagano.jp/n440500/shigikai/p005269.html",
        "archiveUrl": "https://web.archive.org/web/20260421110348id_/https://www.city.nagano.nagano.jp/n440500/shigikai/p005269.html"
      },
      "result": {
        "title": "令和8年3月定例会 議案の審議状況",
        "localUrl": "/sources/nagano-shigikai-r8/p005627.html",
        "originUrl": "https://www.city.nagano.nagano.jp/n440500/contents/p005627.html",
        "archiveUrl": "https://web.archive.org/web/20261002115443/https://www.city.nagano.nagano.jp/n440500/contents/p005627.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 30,
          "議長": 1,
          "反対": 5
        },
        "byFaction": [
          {
            "faction": "長野市議会新友会",
            "counts": {
              "賛成": 17,
              "議長": 1
            },
            "members": [
              {
                "name": "小泉栄正",
                "stance": "賛成"
              },
              {
                "name": "寺沢さゆり",
                "stance": "賛成"
              },
              {
                "name": "西沢利一",
                "stance": "賛成"
              },
              {
                "name": "若林祥",
                "stance": "議長"
              },
              {
                "name": "市川和彦",
                "stance": "賛成"
              },
              {
                "name": "松田光平",
                "stance": "賛成"
              },
              {
                "name": "和田一成",
                "stance": "賛成"
              },
              {
                "name": "加藤英夫",
                "stance": "賛成"
              },
              {
                "name": "桜井篤",
                "stance": "賛成"
              },
              {
                "name": "青木敏明",
                "stance": "賛成"
              },
              {
                "name": "宮崎治夫",
                "stance": "賛成"
              },
              {
                "name": "北沢哲也",
                "stance": "賛成"
              },
              {
                "name": "手塚秀樹",
                "stance": "賛成"
              },
              {
                "name": "金沢敦志",
                "stance": "賛成"
              },
              {
                "name": "箱山正一",
                "stance": "賛成"
              },
              {
                "name": "西脇かおる",
                "stance": "賛成"
              },
              {
                "name": "本木晋",
                "stance": "賛成"
              },
              {
                "name": "山岸晃",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党長野市議員団",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "堀内伸悟",
                "stance": "賛成"
              },
              {
                "name": "松井英雄",
                "stance": "賛成"
              },
              {
                "name": "清水美加子",
                "stance": "賛成"
              },
              {
                "name": "藤澤紀子",
                "stance": "賛成"
              },
              {
                "name": "浅川徹",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党長野市会議員団",
            "counts": {
              "反対": 4
            },
            "members": [
              {
                "name": "滝沢真一",
                "stance": "反対"
              },
              {
                "name": "黒沢清一",
                "stance": "反対"
              },
              {
                "name": "阿出川希",
                "stance": "反対"
              },
              {
                "name": "佐藤高志",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "改革ながの市民ネット",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "鈴木洋一",
                "stance": "賛成"
              },
              {
                "name": "東方みゆき",
                "stance": "賛成"
              },
              {
                "name": "原ようこ",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "次世代長野",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "和田凌弥",
                "stance": "賛成"
              },
              {
                "name": "内藤武道",
                "stance": "賛成"
              },
              {
                "name": "木村けいた",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属",
            "counts": {
              "賛成": 2,
              "反対": 1
            },
            "members": [
              {
                "name": "倉野立人",
                "stance": "賛成"
              },
              {
                "name": "山﨑裕子",
                "stance": "反対"
              },
              {
                "name": "山﨑昭夫",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "賛否などの態度が分かれた議案等（議員別賛否一覧）令和8年3月定例会",
          "localUrl": "/sources/nagano-shigikai-r8/r0803teireikaisinngikkekkaitiran.pdf",
          "originUrl": "https://www.city.nagano.nagano.jp/documents/22850/r0803teireikaisinngikkekkaitiran.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002115554/https://www.city.nagano.nagano.jp/documents/22850/r0803teireikaisinngikkekkaitiran.pdf"
        }
      }
    }
  ],
  "202029": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "松本市議会",
      "seats": 30,
      "asOf": "2025-05-14",
      "asOfLabel": "2025年5月14日",
      "factions": [
        {
          "name": "誠の会",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "政友会",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "開明",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "松本市議会公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "まつも都",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党松本市議団",
          "seats": 3,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第43号",
        "billName": "令和８年度松本市一般会計予算",
        "sessionLabel": "令和8年2月定例会",
        "decidedDate": "2026-03-16",
        "decidedDateLabel": "令和8年3月16日",
        "result": "修正可決"
      },
      "sourceTitle": "令和8年度 松本市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派名簿（令和7年5月14日現在）",
        "localUrl": "/sources/matsumoto-shigikai-r8/6164.html",
        "originUrl": "https://web.archive.org/web/20260213231002id_/https://www.city.matsumoto.nagano.jp/soshiki/213/6164.html",
        "archiveUrl": "https://web.archive.org/web/20260213231002id_/https://www.city.matsumoto.nagano.jp/soshiki/213/6164.html"
      },
      "result": {
        "title": "議案 議決結果 令和8年2月定例会",
        "localUrl": "/sources/matsumoto-shigikai-r8/197638.html",
        "originUrl": "https://www.city.matsumoto.nagano.jp/site/gikai/197638.html",
        "archiveUrl": "https://web.archive.org/web/20260324114104/https://www.city.matsumoto.nagano.jp/site/gikai/197638.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "voteParts": [
        {
          "part": "修正部分を除く原案",
          "basis": "member",
          "stances": [
            "賛成",
            "議長"
          ],
          "tally": {
            "賛成": 29,
            "議長": 1
          },
          "byFaction": [
            {
              "faction": "誠の会",
              "counts": {
                "賛成": 6,
                "議長": 1
              },
              "members": [
                {
                  "name": "中山英子",
                  "stance": "賛成"
                },
                {
                  "name": "宇留賀響",
                  "stance": "賛成"
                },
                {
                  "name": "土屋眞一",
                  "stance": "賛成"
                },
                {
                  "name": "今井ゆうすけ",
                  "stance": "賛成"
                },
                {
                  "name": "犬飼信雄",
                  "stance": "賛成"
                },
                {
                  "name": "阿部功祐",
                  "stance": "議長"
                },
                {
                  "name": "太田更三",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "政友会",
              "counts": {
                "賛成": 7
              },
              "members": [
                {
                  "name": "こば陽子",
                  "stance": "賛成"
                },
                {
                  "name": "太田正徳",
                  "stance": "賛成"
                },
                {
                  "name": "和久井悟",
                  "stance": "賛成"
                },
                {
                  "name": "西澤郁弥",
                  "stance": "賛成"
                },
                {
                  "name": "牛丸仁志",
                  "stance": "賛成"
                },
                {
                  "name": "村上幸雄",
                  "stance": "賛成"
                },
                {
                  "name": "中島昌子",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "開明",
              "counts": {
                "賛成": 5
              },
              "members": [
                {
                  "name": "菊地徹",
                  "stance": "賛成"
                },
                {
                  "name": "吉村幸代",
                  "stance": "賛成"
                },
                {
                  "name": "川久保文良",
                  "stance": "賛成"
                },
                {
                  "name": "上條温",
                  "stance": "賛成"
                },
                {
                  "name": "芝山稔",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "松本市議会公明党",
              "counts": {
                "賛成": 4
              },
              "members": [
                {
                  "name": "大久保美由紀",
                  "stance": "賛成"
                },
                {
                  "name": "内田麻美",
                  "stance": "賛成"
                },
                {
                  "name": "上條美智子",
                  "stance": "賛成"
                },
                {
                  "name": "近藤晴彦",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "まつも都",
              "counts": {
                "賛成": 4
              },
              "members": [
                {
                  "name": "花村恵子",
                  "stance": "賛成"
                },
                {
                  "name": "神津ゆかり",
                  "stance": "賛成"
                },
                {
                  "name": "上條一正",
                  "stance": "賛成"
                },
                {
                  "name": "横内裕治",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "日本共産党松本市議団",
              "counts": {
                "賛成": 3
              },
              "members": [
                {
                  "name": "宗田まゆ美",
                  "stance": "賛成"
                },
                {
                  "name": "塩原孝子",
                  "stance": "賛成"
                },
                {
                  "name": "犬飼明美",
                  "stance": "賛成"
                }
              ]
            }
          ],
          "source": {
            "title": "令和８年２月定例会 議案の審議結果（各議員の賛否）",
            "localUrl": "/sources/matsumoto-shigikai-r8/124997.pdf",
            "originUrl": "https://www.city.matsumoto.nagano.jp/uploaded/attachment/124997.pdf",
            "archiveUrl": "https://web.archive.org/web/20260323105519/https://www.city.matsumoto.nagano.jp/uploaded/attachment/124997.pdf"
          }
        },
        {
          "part": "修正案",
          "basis": "member",
          "stances": [
            "賛成",
            "反対",
            "議長"
          ],
          "tally": {
            "反対": 13,
            "議長": 1,
            "賛成": 16
          },
          "byFaction": [
            {
              "faction": "誠の会",
              "counts": {
                "反対": 6,
                "議長": 1
              },
              "members": [
                {
                  "name": "中山英子",
                  "stance": "反対"
                },
                {
                  "name": "宇留賀響",
                  "stance": "反対"
                },
                {
                  "name": "土屋眞一",
                  "stance": "反対"
                },
                {
                  "name": "今井ゆうすけ",
                  "stance": "反対"
                },
                {
                  "name": "犬飼信雄",
                  "stance": "反対"
                },
                {
                  "name": "阿部功祐",
                  "stance": "議長"
                },
                {
                  "name": "太田更三",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "政友会",
              "counts": {
                "反対": 7
              },
              "members": [
                {
                  "name": "こば陽子",
                  "stance": "反対"
                },
                {
                  "name": "太田正徳",
                  "stance": "反対"
                },
                {
                  "name": "和久井悟",
                  "stance": "反対"
                },
                {
                  "name": "西澤郁弥",
                  "stance": "反対"
                },
                {
                  "name": "牛丸仁志",
                  "stance": "反対"
                },
                {
                  "name": "村上幸雄",
                  "stance": "反対"
                },
                {
                  "name": "中島昌子",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "開明",
              "counts": {
                "賛成": 5
              },
              "members": [
                {
                  "name": "菊地徹",
                  "stance": "賛成"
                },
                {
                  "name": "吉村幸代",
                  "stance": "賛成"
                },
                {
                  "name": "川久保文良",
                  "stance": "賛成"
                },
                {
                  "name": "上條温",
                  "stance": "賛成"
                },
                {
                  "name": "芝山稔",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "松本市議会公明党",
              "counts": {
                "賛成": 4
              },
              "members": [
                {
                  "name": "大久保美由紀",
                  "stance": "賛成"
                },
                {
                  "name": "内田麻美",
                  "stance": "賛成"
                },
                {
                  "name": "上條美智子",
                  "stance": "賛成"
                },
                {
                  "name": "近藤晴彦",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "まつも都",
              "counts": {
                "賛成": 4
              },
              "members": [
                {
                  "name": "花村恵子",
                  "stance": "賛成"
                },
                {
                  "name": "神津ゆかり",
                  "stance": "賛成"
                },
                {
                  "name": "上條一正",
                  "stance": "賛成"
                },
                {
                  "name": "横内裕治",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "日本共産党松本市議団",
              "counts": {
                "賛成": 3
              },
              "members": [
                {
                  "name": "宗田まゆ美",
                  "stance": "賛成"
                },
                {
                  "name": "塩原孝子",
                  "stance": "賛成"
                },
                {
                  "name": "犬飼明美",
                  "stance": "賛成"
                }
              ]
            }
          ],
          "source": {
            "title": "令和８年２月定例会 議案の審議結果（各議員の賛否）",
            "localUrl": "/sources/matsumoto-shigikai-r8/124997.pdf",
            "originUrl": "https://www.city.matsumoto.nagano.jp/uploaded/attachment/124997.pdf",
            "archiveUrl": "https://web.archive.org/web/20260323105519/https://www.city.matsumoto.nagano.jp/uploaded/attachment/124997.pdf"
          }
        }
      ]
    }
  ],
  "212016": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "岐阜市議会",
      "seats": 37,
      "asOf": "2026-02-17",
      "asOfLabel": "2026年2月17日",
      "factions": [
        {
          "name": "自民岐阜",
          "seats": 17,
          "isIndependent": false
        },
        {
          "name": "岐阜市議会公明党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "岐阜市民クラブ",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "健やか緑政",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党岐阜市議会議員団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "にじいろ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "日本維新の会岐阜市議会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "会派に属さない議員（石川宗一郎）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "会派に属さない議員（大塚翔太）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "会派に属さない議員（道家康生）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "会派に属さない議員（披田麻衣）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第１号議案",
        "billName": "令和８年度岐阜市一般会計予算",
        "sessionLabel": "令和８年第１回（３月）定例会",
        "decidedDate": "2026-03-27",
        "decidedDateLabel": "令和8年3月27日",
        "result": "原案のとおり可決"
      },
      "sourceTitle": "令和8年度 岐阜市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議員の紹介（一覧表）（更新日 令和8年2月17日）",
        "localUrl": "/sources/gifu-shigikai-r8/1021215.html",
        "originUrl": "https://web.archive.org/web/20260418045437id_/https://www.city.gifu.lg.jp/info/shigikai/1009372/1021215.html",
        "archiveUrl": "https://web.archive.org/web/20260418045437id_/https://www.city.gifu.lg.jp/info/shigikai/1009372/1021215.html"
      },
      "result": {
        "title": "令和８年第１回（３月）定例会議決結果・報告一覧",
        "localUrl": "/sources/gifu-shigikai-r8/r803giketsu3.pdf",
        "originUrl": "https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/009/432/r803giketsu3.pdf",
        "archiveUrl": "https://web.archive.org/web/20260517210804/https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/009/432/r803giketsu3.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 28,
          "欠席": 1,
          "議長": 1,
          "反対": 7
        },
        "byFaction": [
          {
            "faction": "自民岐阜",
            "counts": {
              "賛成": 15,
              "欠席": 1,
              "議長": 1
            },
            "members": [
              {
                "name": "日比野浩之",
                "stance": "賛成"
              },
              {
                "name": "橋爪大",
                "stance": "賛成"
              },
              {
                "name": "佐藤幸太",
                "stance": "賛成"
              },
              {
                "name": "野本琢磨",
                "stance": "賛成"
              },
              {
                "name": "熊田由弘",
                "stance": "賛成"
              },
              {
                "name": "浅野雅樹",
                "stance": "賛成"
              },
              {
                "name": "箕輪光顕",
                "stance": "欠席"
              },
              {
                "name": "黒田育宏",
                "stance": "賛成"
              },
              {
                "name": "若山貴嗣",
                "stance": "賛成"
              },
              {
                "name": "石井浩二",
                "stance": "賛成"
              },
              {
                "name": "大野一生",
                "stance": "賛成"
              },
              {
                "name": "谷藤錦司",
                "stance": "賛成"
              },
              {
                "name": "須田眞",
                "stance": "賛成"
              },
              {
                "name": "杉山利夫",
                "stance": "賛成"
              },
              {
                "name": "竹市勲",
                "stance": "議長"
              },
              {
                "name": "浅野裕司",
                "stance": "賛成"
              },
              {
                "name": "高橋正",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "岐阜市議会公明党",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "河合智美",
                "stance": "賛成"
              },
              {
                "name": "小堀将大",
                "stance": "賛成"
              },
              {
                "name": "江崎洋子",
                "stance": "賛成"
              },
              {
                "name": "西垣信康",
                "stance": "賛成"
              },
              {
                "name": "辻󠄀孝子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "岐阜市民クラブ",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "小森忠良",
                "stance": "賛成"
              },
              {
                "name": "石原宏基",
                "stance": "賛成"
              },
              {
                "name": "富田耕二",
                "stance": "賛成"
              },
              {
                "name": "松原和生",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "健やか緑政",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "可児隆",
                "stance": "反対"
              },
              {
                "name": "田中成佳",
                "stance": "反対"
              },
              {
                "name": "服部勝弘",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "日本共産党岐阜市議会議員団",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "森下満寿美",
                "stance": "反対"
              },
              {
                "name": "堀田信夫",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "にじいろ",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "原菜穂子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "日本維新の会岐阜市議会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "林大貴",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派に属さない議員（石川宗一郎）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "石川宗一郎",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派に属さない議員（大塚翔太）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "大塚翔太",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派に属さない議員（道家康生）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "道家康生",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派に属さない議員（披田麻衣）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "披田麻衣",
                "stance": "反対"
              }
            ]
          }
        ],
        "source": {
          "title": "議案等に対する賛否の状況（令和８年３月定例会）",
          "localUrl": "/sources/gifu-shigikai-r8/r803sanpi2.pdf",
          "originUrl": "https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/009/433/r803sanpi2.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001182137/https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/009/433/r803sanpi2.pdf"
        }
      }
    }
  ],
  "221007": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "静岡市議会",
      "seats": 48,
      "teisu": 48,
      "asOf": "2025-04-25",
      "asOfLabel": "2025年4月25日",
      "factions": [
        {
          "name": "自由民主党静岡市議会議員団",
          "seats": 22,
          "isIndependent": false
        },
        {
          "name": "志政会",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党静岡市議会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党静岡市議会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "静岡市議会立憲民主党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "創生静岡",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "チェンジングしずおかプロジェクト",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "緑の党グリーンズジャパン",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第46号",
        "billName": "令和8年度静岡市一般会計予算",
        "sessionLabel": "令和8年2月定例会",
        "decidedDate": "2026-03-19",
        "decidedDateLabel": "令和8年3月19日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 静岡市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "静岡市議会会派別名簿（令和7年4月25日現在）",
        "localUrl": "/sources/shizuoka-shi-gikai-r8/01_kaihabetsumeibo.pdf",
        "originUrl": "https://web.archive.org/web/20251005163031id_/https://www.city.shizuoka.lg.jp/documents/6545/01_kaihabetsumeibo.pdf",
        "archiveUrl": "https://web.archive.org/web/20251005163031id_/https://www.city.shizuoka.lg.jp/documents/6545/01_kaihabetsumeibo.pdf"
      },
      "result": {
        "title": "令和8年2月定例会の結果",
        "localUrl": "/sources/shizuoka-shi-gikai-r8/202602gatu_gigetukekka_02.pdf",
        "originUrl": "https://www.city.shizuoka.lg.jp/documents/6558/202602gatu_gigetukekka_02.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001161110/https://www.city.shizuoka.lg.jp/documents/6558/202602gatu_gigetukekka_02.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 42,
          "議長": 1,
          "反対": 5
        },
        "byFaction": [
          {
            "faction": "自由民主党静岡市議会議員団",
            "counts": {
              "賛成": 21,
              "議長": 1
            },
            "members": [
              {
                "name": "山根田鶴子",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "志政会",
            "counts": {
              "賛成": 8
            },
            "members": []
          },
          {
            "faction": "公明党静岡市議会",
            "counts": {
              "賛成": 6
            },
            "members": []
          },
          {
            "faction": "日本共産党静岡市議会議員団",
            "counts": {
              "反対": 4
            },
            "members": []
          },
          {
            "faction": "静岡市議会立憲民主党",
            "counts": {
              "賛成": 4
            },
            "members": []
          },
          {
            "faction": "創生静岡",
            "counts": {
              "賛成": 2
            },
            "members": []
          },
          {
            "faction": "チェンジングしずおかプロジェクト",
            "counts": {
              "賛成": 1
            },
            "members": []
          },
          {
            "faction": "緑の党グリーンズジャパン",
            "counts": {
              "反対": 1
            },
            "members": []
          }
        ],
        "source": {
          "title": "令和8年2月定例会の結果",
          "localUrl": "/sources/shizuoka-shi-gikai-r8/202602gatu_gigetukekka_02.pdf",
          "originUrl": "https://www.city.shizuoka.lg.jp/documents/6558/202602gatu_gigetukekka_02.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001161110/https://www.city.shizuoka.lg.jp/documents/6558/202602gatu_gigetukekka_02.pdf"
        }
      }
    }
  ],
  "221309": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "浜松市議会",
      "seats": 44,
      "asOf": "2026-01-20",
      "asOfLabel": "2026年1月20日",
      "factions": [
        {
          "name": "自由民主党浜松",
          "seats": 23,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "創造浜松・国民民主党浜松",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党浜松市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "浜松市政向上委員会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "市民サポート浜松",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第42号議案",
        "billName": "令和8年度浜松市一般会計予算",
        "sessionLabel": "令和8年第1回浜松市議会定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 浜松市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（更新日 2026年1月20日）",
        "localUrl": "/sources/hamamatsu-gikai-r8/meibokaiha.html",
        "originUrl": "https://web.archive.org/web/20260315043410id_/https://www.city.hamamatsu.shizuoka.jp/gikai/iinkai/meibokaiha.html",
        "archiveUrl": "https://web.archive.org/web/20260315043410id_/https://www.city.hamamatsu.shizuoka.jp/gikai/iinkai/meibokaiha.html"
      },
      "result": {
        "title": "令和8年第1回浜松市議会定例会 会議議決結果（全議案）",
        "localUrl": "/sources/hamamatsu-gikai-r8/giketukekkaitirann.pdf",
        "originUrl": "https://www.city.hamamatsu.shizuoka.jp/documents/171369/giketukekkaitirann.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001153250/https://www.city.hamamatsu.shizuoka.jp/documents/171369/giketukekkaitirann.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 38,
          "欠席": 2,
          "議長": 1,
          "反対": 3
        },
        "byFaction": [
          {
            "faction": "自由民主党浜松",
            "counts": {
              "賛成": 21,
              "欠席": 1,
              "議長": 1
            },
            "members": [
              {
                "name": "鈴木裕之",
                "stance": "賛成"
              },
              {
                "name": "藤田典良",
                "stance": "賛成"
              },
              {
                "name": "辻村公子",
                "stance": "賛成"
              },
              {
                "name": "中野和幸",
                "stance": "賛成"
              },
              {
                "name": "小泉翠",
                "stance": "賛成"
              },
              {
                "name": "神間郁子",
                "stance": "賛成"
              },
              {
                "name": "小野田康弘",
                "stance": "賛成"
              },
              {
                "name": "露木里江子",
                "stance": "賛成"
              },
              {
                "name": "久米丈二",
                "stance": "賛成"
              },
              {
                "name": "井田博康",
                "stance": "欠席"
              },
              {
                "name": "齋藤和志",
                "stance": "賛成"
              },
              {
                "name": "平野岳子",
                "stance": "賛成"
              },
              {
                "name": "松本康夫",
                "stance": "賛成"
              },
              {
                "name": "加茂俊武",
                "stance": "賛成"
              },
              {
                "name": "倉田清一",
                "stance": "賛成"
              },
              {
                "name": "須藤京子",
                "stance": "賛成"
              },
              {
                "name": "戸田誠",
                "stance": "賛成"
              },
              {
                "name": "鳥井德孝",
                "stance": "賛成"
              },
              {
                "name": "花井和夫",
                "stance": "賛成"
              },
              {
                "name": "渥美誠",
                "stance": "賛成"
              },
              {
                "name": "太田康隆",
                "stance": "賛成"
              },
              {
                "name": "栁川樹一郎",
                "stance": "賛成"
              },
              {
                "name": "髙林修",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "市民クラブ",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "大城七瀬",
                "stance": "賛成"
              },
              {
                "name": "花井洋介",
                "stance": "賛成"
              },
              {
                "name": "石津陽子",
                "stance": "賛成"
              },
              {
                "name": "岩田邦泰",
                "stance": "賛成"
              },
              {
                "name": "鈴木真人",
                "stance": "賛成"
              },
              {
                "name": "斉藤晴明",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "山崎とし子",
                "stance": "賛成"
              },
              {
                "name": "丸英之",
                "stance": "賛成"
              },
              {
                "name": "幸田惠里子",
                "stance": "賛成"
              },
              {
                "name": "松下正行",
                "stance": "賛成"
              },
              {
                "name": "黒田豊",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "創造浜松・国民民主党浜松",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "森田賢児",
                "stance": "賛成"
              },
              {
                "name": "遠山将吾",
                "stance": "賛成"
              },
              {
                "name": "太田利実保",
                "stance": "賛成"
              },
              {
                "name": "湖東秀隆",
                "stance": "賛成"
              },
              {
                "name": "関イチロー",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党浜松市議団",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "酒井豊実",
                "stance": "反対"
              },
              {
                "name": "小黒啓子",
                "stance": "反対"
              },
              {
                "name": "北島定",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "浜松市政向上委員会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "鈴木恵",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民サポート浜松",
            "counts": {
              "欠席": 1
            },
            "members": [
              {
                "name": "馬塚彩矢香",
                "stance": "欠席"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年第1回浜松市議会定例会 会議議決結果（全議案）議員別賛否",
          "localUrl": "/sources/hamamatsu-gikai-r8/giinnsannpiitiran.pdf",
          "originUrl": "https://www.city.hamamatsu.shizuoka.jp/documents/171369/giinnsannpiitiran.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002114016/https://www.city.hamamatsu.shizuoka.jp/documents/171369/giinnsannpiitiran.pdf"
        }
      }
    }
  ],
  "231002": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "名古屋市会",
      "seats": 68,
      "teisu": 68,
      "asOf": "2025-10-28",
      "asOfLabel": "2025年10月28日",
      "factions": [
        {
          "name": "自由民主党名古屋市会議員団",
          "seats": 23,
          "isIndependent": false
        },
        {
          "name": "名古屋民主市会議員団",
          "seats": 17,
          "isIndependent": false
        },
        {
          "name": "公明党名古屋市会議員団",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "減税日本ナゴヤ",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "日本共産党名古屋市会議員団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "なごや陽向の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "なごや創政会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "新生会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "日本維新の会名古屋市会議員団",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第1号",
        "billName": "令和8年度名古屋市一般会計予算",
        "sessionLabel": "令和8年2月定例会",
        "decidedDate": "2026-03-19",
        "decidedDateLabel": "令和8年3月19日",
        "result": "附帯決議を付して修正可決"
      },
      "sourceTitle": "令和8年度 名古屋市会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（更新日 2025年10月28日）",
        "localUrl": "/sources/nagoya-shikai-r8/1030799.html",
        "originUrl": "https://web.archive.org/web/20260313164258id_/https://www.city.nagoya.jp/shikai/about/1030778/1030799.html",
        "archiveUrl": "https://web.archive.org/web/20260313164258id_/https://www.city.nagoya.jp/shikai/about/1030778/1030799.html"
      },
      "result": {
        "title": "令和8年2月定例会 市長提出案件",
        "localUrl": "/sources/nagoya-shikai-r8/1046530.html",
        "originUrl": "https://www.city.nagoya.jp/shikai/shingi/1030858/1030859/1046530.html",
        "archiveUrl": "https://web.archive.org/web/20261001153531/https://www.city.nagoya.jp/shikai/shingi/1030858/1030859/1046530.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 63,
          "議長": 1,
          "反対": 4
        },
        "byFaction": [
          {
            "faction": "自由民主党名古屋市会議員団",
            "counts": {
              "賛成": 22,
              "議長": 1
            },
            "members": [
              {
                "name": "伊神邦彦",
                "stance": "賛成"
              },
              {
                "name": "神ひろし",
                "stance": "賛成"
              },
              {
                "name": "上村みちよ",
                "stance": "賛成"
              },
              {
                "name": "渡辺やすのり",
                "stance": "賛成"
              },
              {
                "name": "浅野有",
                "stance": "賛成"
              },
              {
                "name": "村瀬きよみ",
                "stance": "賛成"
              },
              {
                "name": "小出昭司",
                "stance": "賛成"
              },
              {
                "name": "中田ちづこ",
                "stance": "賛成"
              },
              {
                "name": "ふじた和秀",
                "stance": "賛成"
              },
              {
                "name": "服部しんのすけ",
                "stance": "賛成"
              },
              {
                "name": "浅井正仁",
                "stance": "賛成"
              },
              {
                "name": "吉田茂",
                "stance": "賛成"
              },
              {
                "name": "沢田ひとみ",
                "stance": "賛成"
              },
              {
                "name": "横井利明",
                "stance": "賛成"
              },
              {
                "name": "藤沢ちあき",
                "stance": "賛成"
              },
              {
                "name": "松井よしのり",
                "stance": "賛成"
              },
              {
                "name": "北野よしはる",
                "stance": "賛成"
              },
              {
                "name": "中里高之",
                "stance": "賛成"
              },
              {
                "name": "岩本たかひろ",
                "stance": "賛成"
              },
              {
                "name": "くずや利枝",
                "stance": "賛成"
              },
              {
                "name": "丹羽ひろし",
                "stance": "賛成"
              },
              {
                "name": "成田たかゆき",
                "stance": "賛成"
              },
              {
                "name": "西川学",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "名古屋民主市会議員団",
            "counts": {
              "賛成": 17
            },
            "members": [
              {
                "name": "山田昌弘",
                "stance": "賛成"
              },
              {
                "name": "くにまさ直記",
                "stance": "賛成"
              },
              {
                "name": "服部将也",
                "stance": "賛成"
              },
              {
                "name": "うえぞの晋介",
                "stance": "賛成"
              },
              {
                "name": "うかい春美",
                "stance": "賛成"
              },
              {
                "name": "塚本つよし",
                "stance": "賛成"
              },
              {
                "name": "おくむら文悟",
                "stance": "賛成"
              },
              {
                "name": "久田邦博",
                "stance": "賛成"
              },
              {
                "name": "森ともお",
                "stance": "賛成"
              },
              {
                "name": "久野美穂",
                "stance": "賛成"
              },
              {
                "name": "赤松哲次",
                "stance": "賛成"
              },
              {
                "name": "加藤一登",
                "stance": "賛成"
              },
              {
                "name": "橋本ひろき",
                "stance": "賛成"
              },
              {
                "name": "小川としゆき",
                "stance": "賛成"
              },
              {
                "name": "岡本やすひろ",
                "stance": "賛成"
              },
              {
                "name": "日比美咲",
                "stance": "賛成"
              },
              {
                "name": "田中里佳",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党名古屋市会議員団",
            "counts": {
              "賛成": 12
            },
            "members": [
              {
                "name": "田辺雄一",
                "stance": "賛成"
              },
              {
                "name": "長谷川由美子",
                "stance": "賛成"
              },
              {
                "name": "さわだ晃一",
                "stance": "賛成"
              },
              {
                "name": "おか千恵",
                "stance": "賛成"
              },
              {
                "name": "木下優",
                "stance": "賛成"
              },
              {
                "name": "月森たくや",
                "stance": "賛成"
              },
              {
                "name": "吉岡正修",
                "stance": "賛成"
              },
              {
                "name": "さかい大輔",
                "stance": "賛成"
              },
              {
                "name": "金庭宜雄",
                "stance": "賛成"
              },
              {
                "name": "近藤和博",
                "stance": "賛成"
              },
              {
                "name": "中村しゅうへい",
                "stance": "賛成"
              },
              {
                "name": "辻まさお",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "減税日本ナゴヤ",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "佐藤ゆうこ",
                "stance": "賛成"
              },
              {
                "name": "田山宏之",
                "stance": "賛成"
              },
              {
                "name": "大田とみひこ",
                "stance": "賛成"
              },
              {
                "name": "豊田かおる",
                "stance": "賛成"
              },
              {
                "name": "大村光子",
                "stance": "賛成"
              },
              {
                "name": "大谷ともひろ",
                "stance": "賛成"
              },
              {
                "name": "永井ゆり",
                "stance": "賛成"
              },
              {
                "name": "鈴木孝之",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党名古屋市会議員団",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "岡田ゆき子",
                "stance": "反対"
              },
              {
                "name": "みつなか美由紀",
                "stance": "反対"
              },
              {
                "name": "田口一登",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "なごや陽向の会",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "金城ゆたか",
                "stance": "賛成"
              },
              {
                "name": "野田留美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "なごや創政会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "中川あつし",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "新生会",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "北角嘉幸",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "日本維新の会名古屋市会議員団",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "大島英勲",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "市会だより第200号 2月定例会 提出議案の賛否",
          "localUrl": "/sources/nagoya-shikai-r8/1049365.html",
          "originUrl": "https://www.city.nagoya.jp/shikai/kouhou/1030998/1030999/1051058/1045525/1049358/1049365.html",
          "archiveUrl": "https://web.archive.org/web/20261001153704/https://www.city.nagoya.jp/shikai/kouhou/1030998/1030999/1051058/1045525/1049358/1049365.html"
        }
      }
    }
  ],
  "232017": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "豊橋市議会",
      "seats": 36,
      "teisu": 36,
      "asOf": "2025-05-15",
      "asOfLabel": "2025年5月15日",
      "factions": [
        {
          "name": "自由民主党豊橋市議団",
          "seats": 18,
          "isIndependent": false
        },
        {
          "name": "公明党豊橋市議団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "新しい豊橋",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党豊橋市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "まちフォーラム",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "みらい市民",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "とよはし みんなの議会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "豊橋維新の会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "4",
        "billName": "令和8年度豊橋市一般会計予算",
        "sessionLabel": "3月定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 豊橋市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議員名簿（会派別）（令和7年5月15日現在）",
        "localUrl": "/sources/toyohashi-shigikai-r8/8130.htm",
        "originUrl": "https://web.archive.org/web/20260314231058id_/https://www.city.toyohashi.lg.jp/8130.htm",
        "archiveUrl": "https://web.archive.org/web/20260314231058id_/https://www.city.toyohashi.lg.jp/8130.htm"
      },
      "result": {
        "title": "議決結果一覧表（3月定例会）",
        "localUrl": "/sources/toyohashi-shigikai-r8/R8.3giketukekka.pdf",
        "originUrl": "https://www.city.toyohashi.lg.jp/secure/40193/R8.3giketukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001172448/https://www.city.toyohashi.lg.jp/secure/40193/R8.3giketukekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 26,
          "議長": 1,
          "反対": 9
        },
        "byFaction": [
          {
            "faction": "自由民主党豊橋市議団",
            "counts": {
              "賛成": 17,
              "議長": 1
            },
            "members": [
              {
                "name": "小原昌子",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党豊橋市議団",
            "counts": {
              "賛成": 5
            },
            "members": []
          },
          {
            "faction": "新しい豊橋",
            "counts": {
              "反対": 4
            },
            "members": []
          },
          {
            "faction": "日本共産党豊橋市議団",
            "counts": {
              "反対": 3
            },
            "members": []
          },
          {
            "faction": "まちフォーラム",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "みらい市民",
            "counts": {
              "反対": 1
            },
            "members": []
          },
          {
            "faction": "とよはし みんなの議会",
            "counts": {
              "賛成": 1
            },
            "members": []
          },
          {
            "faction": "豊橋維新の会",
            "counts": {
              "反対": 1
            },
            "members": []
          }
        ],
        "source": {
          "title": "とよはし市議会だより 第353号「賛否が分かれた議案」",
          "localUrl": "/sources/toyohashi-shigikai-r8/gikaidayori353(pink.pdf",
          "originUrl": "https://www.city.toyohashi.lg.jp/secure/9867/gikaidayori353(pink.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001184211/https://www.city.toyohashi.lg.jp/secure/9867/gikaidayori353(pink.pdf"
        }
      }
    }
  ],
  "232025": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "岡崎市議会",
      "seats": 37,
      "asOf": "2025-11-14",
      "asOfLabel": "2025年11月14日",
      "factions": [
        {
          "name": "自民清風会",
          "seats": 16,
          "isIndependent": false
        },
        {
          "name": "民政クラブ",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "チャレンジ岡崎",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 7,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "56",
        "billName": "令和８年度岡崎市一般会計予算",
        "sessionLabel": "令和８年３月岡崎市議会定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 岡崎市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議員名簿（会派別）（令和7年11月14日現在）",
        "localUrl": "/sources/okazaki-shigikai-r8/1009848.html",
        "originUrl": "https://web.archive.org/web/20260311184057id_/https://www.city.okazaki.lg.jp/shigikai/meibo/1009848.html",
        "archiveUrl": "https://web.archive.org/web/20260311184057id_/https://www.city.okazaki.lg.jp/shigikai/meibo/1009848.html"
      },
      "result": {
        "title": "議決結果一覧表（令和8年3月定例会）",
        "localUrl": "/sources/okazaki-shigikai-r8/0803gikateukekka.pdf",
        "originUrl": "https://www.city.okazaki.lg.jp/_res/projects/default_project/_page_/001/009/835/0803gikateukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001182400/https://www.city.okazaki.lg.jp/_res/projects/default_project/_page_/001/009/835/0803gikateukekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 33,
          "反対": 3,
          "議長": 1
        },
        "byFaction": [
          {
            "faction": "自民清風会",
            "counts": {
              "賛成": 16
            },
            "members": [
              {
                "name": "磯部亮次",
                "stance": "賛成"
              },
              {
                "name": "加藤史朗",
                "stance": "賛成"
              },
              {
                "name": "加藤義幸",
                "stance": "賛成"
              },
              {
                "name": "金山直樹",
                "stance": "賛成"
              },
              {
                "name": "神谷茂樹",
                "stance": "賛成"
              },
              {
                "name": "酒井正一",
                "stance": "賛成"
              },
              {
                "name": "杉浦久直",
                "stance": "賛成"
              },
              {
                "name": "鈴木静男",
                "stance": "賛成"
              },
              {
                "name": "田口正夫",
                "stance": "賛成"
              },
              {
                "name": "中根武彦",
                "stance": "賛成"
              },
              {
                "name": "野々山雄一郎",
                "stance": "賛成"
              },
              {
                "name": "野本篤",
                "stance": "賛成"
              },
              {
                "name": "蜂須賀一郎",
                "stance": "賛成"
              },
              {
                "name": "前田麗子",
                "stance": "賛成"
              },
              {
                "name": "三浦康宏",
                "stance": "賛成"
              },
              {
                "name": "簗瀬太",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "民政クラブ",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "井町圭孝",
                "stance": "賛成"
              },
              {
                "name": "加藤嘉哉",
                "stance": "賛成"
              },
              {
                "name": "佐藤哲朗",
                "stance": "賛成"
              },
              {
                "name": "柴田敏光",
                "stance": "賛成"
              },
              {
                "name": "白井正樹",
                "stance": "賛成"
              },
              {
                "name": "鈴木英樹",
                "stance": "賛成"
              },
              {
                "name": "瀬戸清太郎",
                "stance": "賛成"
              },
              {
                "name": "原紀彦",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "土谷直樹",
                "stance": "賛成"
              },
              {
                "name": "野島さつき",
                "stance": "賛成"
              },
              {
                "name": "山村栄",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "チャレンジ岡崎",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "小田高之",
                "stance": "賛成"
              },
              {
                "name": "杉山智騎",
                "stance": "賛成"
              },
              {
                "name": "福田澄代",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属",
            "counts": {
              "反対": 3,
              "賛成": 3,
              "議長": 1
            },
            "members": [
              {
                "name": "鈴木雅子",
                "stance": "反対"
              },
              {
                "name": "中根善明",
                "stance": "反対"
              },
              {
                "name": "伊藤正義",
                "stance": "賛成"
              },
              {
                "name": "大原昌幸",
                "stance": "反対"
              },
              {
                "name": "本多勝",
                "stance": "賛成"
              },
              {
                "name": "荻野秀範",
                "stance": "議長"
              },
              {
                "name": "畑尻宣長",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "おかざき議会だより vol.232（令和8年3月定例会）議案の賛否一覧表",
          "localUrl": "/sources/okazaki-shigikai-r8/232.pdf",
          "originUrl": "https://www.city.okazaki.lg.jp/_res/projects/default_project/_page_/001/009/856/232.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002115953/https://www.city.okazaki.lg.jp/_res/projects/default_project/_page_/001/009/856/232.pdf"
        }
      }
    }
  ],
  "232068": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "春日井市議会",
      "seats": 31,
      "asOf": "2025-05-14",
      "asOfLabel": "2025年5月14日",
      "factions": [
        {
          "name": "自由クラブ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "かすがい創政会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "春日井自民クラブ",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党春日井市議会議員団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無会派（長谷和哉）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無会派（奥村昇次）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無会派（鈴木昭紀）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無会派（小嶋小百合）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無会派（犬塚貴司）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "第９号議案",
        "billName": "令和８年度春日井市一般会計予算",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-12",
        "decidedDateLabel": "令和8年3月12日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 春日井市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "第21期市議会議員 会派名簿（更新日 令和7年5月14日）",
        "localUrl": "/sources/kasugai-shigikai-r8/1016752.html",
        "originUrl": "https://web.archive.org/web/20251206115725id_/https://www.city.kasugai.lg.jp/shisei/shigikai/1016752.html",
        "archiveUrl": "https://web.archive.org/web/20251206115725id_/https://www.city.kasugai.lg.jp/shisei/shigikai/1016752.html"
      },
      "result": {
        "title": "令和8年第1回定例会 議案一覧（議決日・結果）",
        "localUrl": "/sources/kasugai-shigikai-r8/R8.1giketsu.pdf",
        "originUrl": "https://www.city.kasugai.lg.jp/_res/projects/default_project/_page_/001/038/638/R8.1giketsu.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001172708/https://www.city.kasugai.lg.jp/_res/projects/default_project/_page_/001/038/638/R8.1giketsu.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 27,
          "議長": 1,
          "反対": 3
        },
        "byFaction": [
          {
            "faction": "自由クラブ",
            "counts": {
              "賛成": 5,
              "議長": 1
            },
            "members": [
              {
                "name": "金澤陽貴",
                "stance": "賛成"
              },
              {
                "name": "前田学",
                "stance": "賛成"
              },
              {
                "name": "加納満",
                "stance": "賛成"
              },
              {
                "name": "林克巳",
                "stance": "賛成"
              },
              {
                "name": "友松孝雄",
                "stance": "賛成"
              },
              {
                "name": "梶田高由",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "かすがい創政会",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "鈴木貴之",
                "stance": "賛成"
              },
              {
                "name": "安達保子",
                "stance": "賛成"
              },
              {
                "name": "鈴木秀尚",
                "stance": "賛成"
              },
              {
                "name": "加藤貴章",
                "stance": "賛成"
              },
              {
                "name": "鬼頭宏明",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "春日井自民クラブ",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "梶田正直",
                "stance": "賛成"
              },
              {
                "name": "堀尾国大",
                "stance": "賛成"
              },
              {
                "name": "長谷川達也",
                "stance": "賛成"
              },
              {
                "name": "長縄典夫",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "大村勝人",
                "stance": "賛成"
              },
              {
                "name": "日比野成利",
                "stance": "賛成"
              },
              {
                "name": "石飛厚治",
                "stance": "賛成"
              },
              {
                "name": "田口佳子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民クラブ",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "鈴木宏幸",
                "stance": "賛成"
              },
              {
                "name": "伊藤杏奈",
                "stance": "賛成"
              },
              {
                "name": "村上慎二郎",
                "stance": "賛成"
              },
              {
                "name": "小原哉",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党春日井市議会議員団",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "石田裕信",
                "stance": "反対"
              },
              {
                "name": "原田祐治",
                "stance": "反対"
              },
              {
                "name": "伊藤建治",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無会派（長谷和哉）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "長谷和哉",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無会派（奥村昇次）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "奥村昇次",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無会派（鈴木昭紀）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "鈴木昭紀",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無会派（小嶋小百合）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "小嶋小百合",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無会派（犬塚貴司）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "犬塚貴司",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "第１回定例会 議案等の表決結果",
          "localUrl": "/sources/kasugai-shigikai-r8/20260312hyouketsu.pdf",
          "originUrl": "https://www.city.kasugai.lg.jp/_res/projects/default_project/_page_/001/038/639/20260312hyouketsu.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001173004/https://www.city.kasugai.lg.jp/_res/projects/default_project/_page_/001/038/639/20260312hyouketsu.pdf"
        }
      }
    }
  ],
  "261009": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "京都市会",
      "seats": 67,
      "teisu": 67,
      "asOf": "2026-02-18",
      "asOfLabel": "2026年2月18日",
      "factions": [
        {
          "name": "自由民主党京都市会議員団",
          "seats": 19,
          "isIndependent": false
        },
        {
          "name": "維新・京都・国民市会議員団",
          "seats": 16,
          "isIndependent": false
        },
        {
          "name": "日本共産党京都市会議員団",
          "seats": 14,
          "isIndependent": false
        },
        {
          "name": "公明党京都市会議員団",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "無所属（天方ひろゆき）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（井﨑敦子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（きくち一秀）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（小島信太郎）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（繁隆夫）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（菅谷浩平）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（平田圭）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議1",
        "billName": "令和8年度京都市一般会計予算",
        "sessionLabel": "令和8年2月市会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 京都市会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（最終更新日 令和8年2月3日・2月18日）",
        "localUrl": "/sources/kyoto-shikai-r8/jimin-kyoto.html",
        "originUrl": "https://www2.city.kyoto.lg.jp/shikai/meibo/kaiha/jimin-kyoto.html",
        "archiveUrl": "https://web.archive.org/web/20260512093023/https://www2.city.kyoto.lg.jp/shikai/meibo/kaiha/jimin-kyoto.html"
      },
      "result": {
        "title": "議案・審議結果（令和8年2月市会）",
        "localUrl": "/sources/kyoto-shikai-r8/gian2.html",
        "originUrl": "https://www2.city.kyoto.lg.jp/shikai/honkaigi/R07/gian2.html",
        "archiveUrl": "https://web.archive.org/web/20260409183007/https://www2.city.kyoto.lg.jp/shikai/honkaigi/R07/gian2.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 51,
          "議長": 1,
          "反対": 15
        },
        "byFaction": [
          {
            "faction": "自由民主党京都市会議員団",
            "counts": {
              "賛成": 18,
              "議長": 1
            },
            "members": [
              {
                "name": "下村あきら",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "維新・京都・国民市会議員団",
            "counts": {
              "賛成": 16
            },
            "members": []
          },
          {
            "faction": "日本共産党京都市会議員団",
            "counts": {
              "反対": 14
            },
            "members": []
          },
          {
            "faction": "公明党京都市会議員団",
            "counts": {
              "賛成": 11
            },
            "members": []
          },
          {
            "faction": "無所属（天方ひろゆき）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "天方ひろゆき",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（井﨑敦子）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "井﨑敦子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属（きくち一秀）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "きくち一秀",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（小島信太郎）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "小島信太郎",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（繁隆夫）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "繁隆夫",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（菅谷浩平）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "菅谷浩平",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（平田圭）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "平田圭",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "議案・審議結果（令和8年2月市会）各会派の態度",
          "localUrl": "/sources/kyoto-shikai-r8/gian2.html",
          "originUrl": "https://www2.city.kyoto.lg.jp/shikai/honkaigi/R07/gian2.html",
          "archiveUrl": "https://web.archive.org/web/20260409183007/https://www2.city.kyoto.lg.jp/shikai/honkaigi/R07/gian2.html"
        }
      }
    }
  ],
  "271403": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "堺市議会",
      "seats": 47,
      "asOf": "2025-04-02",
      "asOfLabel": "2025年4月2日",
      "factions": [
        {
          "name": "大阪維新の会堺市議会議員団",
          "seats": 16,
          "isIndependent": false
        },
        {
          "name": "公明党堺市議団",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "堺創志会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "自由民主党堺市議会議員団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党堺市議会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "自由民主党・市民クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "会派に属さない議員",
          "seats": 3,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第２号",
        "billName": "令和８年度堺市一般会計予算",
        "sessionLabel": "令和８年第２回堺市議会定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 堺市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別（更新日 2025年4月2日）",
        "localUrl": "/sources/sakai-shigikai-r8/75932120220517150837343.html",
        "originUrl": "https://web.archive.org/web/20260124021742id_/https://www.city.sakai.lg.jp/shigikai/meibo/75932120220517150837343.html",
        "archiveUrl": "https://web.archive.org/web/20260124021742id_/https://www.city.sakai.lg.jp/shigikai/meibo/75932120220517150837343.html"
      },
      "result": {
        "title": "令和８年第２回堺市議会定例会議決等案件一覧",
        "localUrl": "/sources/sakai-shigikai-r8/R8-2giketsuannkennichirann.pdf",
        "originUrl": "https://www.city.sakai.lg.jp/shigikai/kekka/giketsukekka/giketsuanken.files/R8-2giketsuannkennichirann.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001154306/https://www.city.sakai.lg.jp/shigikai/kekka/giketsukekka/giketsuanken.files/R8-2giketsuannkennichirann.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "272035": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "豊中市議会",
      "seats": 31,
      "asOf": "2026-02-20",
      "asOfLabel": "2026年2月20日",
      "factions": [
        {
          "name": "公明党豊中市議会議員団",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "大阪維新の会・無所属議員団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "とよなかを共に創る会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党豊中市議会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 5,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "市議案第8号",
        "billName": "令和8年度豊中市一般会計予算",
        "sessionLabel": "令和8年(2026年)3月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 豊中市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派一覧表（更新日 2026年2月20日）",
        "localUrl": "/sources/toyonaka-shigikai-r8/kaiha.html",
        "originUrl": "https://web.archive.org/web/20260221224735id_/https://www.city.toyonaka.osaka.jp/shigikai/giinsyokai/yakuin/kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20260221224735id_/https://www.city.toyonaka.osaka.jp/shigikai/giinsyokai/yakuin/kaiha.html"
      },
      "result": {
        "title": "令和8年(2026年)3月定例会 議決結果",
        "localUrl": "/sources/toyonaka-shigikai-r8/reiwa8nenn3_giketu.html",
        "originUrl": "https://www.city.toyonaka.osaka.jp/shigikai/shigikaioshirase/giketsu_kekka/2026/reiwa8nenn3_giketu.html",
        "archiveUrl": "https://web.archive.org/web/20261001173311/https://www.city.toyonaka.osaka.jp/shigikai/shigikaioshirase/giketsu_kekka/2026/reiwa8nenn3_giketu.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 24,
          "議長": 1,
          "反対": 6
        },
        "byFaction": [
          {
            "faction": "公明党豊中市議会議員団",
            "counts": {
              "賛成": 9
            },
            "members": []
          },
          {
            "faction": "大阪維新の会・無所属議員団",
            "counts": {
              "賛成": 8
            },
            "members": []
          },
          {
            "faction": "とよなかを共に創る会",
            "counts": {
              "賛成": 4,
              "議長": 1
            },
            "members": [
              {
                "name": "井本博一",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "日本共産党豊中市議会議員団",
            "counts": {
              "反対": 4
            },
            "members": []
          },
          {
            "faction": "無所属",
            "counts": {
              "賛成": 3,
              "反対": 2
            },
            "members": [
              {
                "name": "井上弘美",
                "stance": "賛成"
              },
              {
                "name": "木村真",
                "stance": "賛成"
              },
              {
                "name": "中野宏基",
                "stance": "反対"
              },
              {
                "name": "松岡信道",
                "stance": "賛成"
              },
              {
                "name": "山田紗保",
                "stance": "反対"
              }
            ]
          }
        ],
        "source": {
          "title": "とよなか市議会のうごき VOL.291「議案などの賛否の状況」",
          "localUrl": "/sources/toyonaka-shigikai-r8/202605_gikaihou.pdf",
          "originUrl": "https://www.city.toyonaka.osaka.jp/shigikai/shigikaioshirase/gikai_ugoki/202603gikaihou.files/202605_gikaihou.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002120929/https://www.city.toyonaka.osaka.jp/shigikai/shigikaioshirase/gikai_ugoki/202603gikaihou.files/202605_gikaihou.pdf"
        }
      }
    }
  ],
  "272051": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "吹田市議会",
      "seats": 33,
      "asOf": "2026-01-27",
      "asOfLabel": "2026年1月27日",
      "factions": [
        {
          "name": "大阪維新の会",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "日本共産党 吹田市議会議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党 吹田市議会議員団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "自民党吹田・無所属の会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "吹田党・参政党議員団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "市民と歩む議員の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "立憲民主党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "参政党",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第19号",
        "billName": "令和８年度吹田市一般会計予算",
        "sessionLabel": "令和８年(2026年)２月定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 吹田市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別（令和8年（2026年）1月27日現在）",
        "localUrl": "/sources/suita-shigikai-r8/1012851.html",
        "originUrl": "https://web.archive.org/web/20260618145337id_/https://www.city.suita.osaka.jp/shigikai/1017062/1012851.html",
        "archiveUrl": "https://web.archive.org/web/20260618145337id_/https://www.city.suita.osaka.jp/shigikai/1017062/1012851.html"
      },
      "result": {
        "title": "令和８年(2026年)２月定例会議決結果・賛否一覧表",
        "localUrl": "/sources/suita-shigikai-r8/50802result.pdf",
        "originUrl": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/043/624/50802result.pdf",
        "archiveUrl": "https://web.archive.org/web/20260330161259/https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/043/624/50802result.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "272078": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "高槻市議会",
      "seats": 33,
      "asOf": "2026-01-13",
      "asOfLabel": "2026年1月13日",
      "factions": [
        {
          "name": "公明党議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "大阪維新の会高槻市議会議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "自民・無所属議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "市民連合議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党高槻市会議員団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 4,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第３２号",
        "billName": "令和８年度高槻市一般会計予算について",
        "sessionLabel": "令和８年３月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 高槻市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派の構成（更新日 2026年1月13日）",
        "localUrl": "/sources/takatsuki-shigikai-r8/1023.html",
        "originUrl": "https://web.archive.org/web/20260210090856id_/https://www.city.takatsuki.osaka.jp/site/takatsukishigikai/1023.html",
        "archiveUrl": "https://web.archive.org/web/20260210090856id_/https://www.city.takatsuki.osaka.jp/site/takatsukishigikai/1023.html"
      },
      "result": {
        "title": "令和8年第1回定例会（3月定例会）の議決結果",
        "localUrl": "/sources/takatsuki-shigikai-r8/62812.pdf",
        "originUrl": "https://www.city.takatsuki.osaka.jp/uploaded/attachment/62812.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001173416/https://www.city.takatsuki.osaka.jp/uploaded/attachment/62812.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "272108": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "枚方市議会",
      "seats": 32,
      "teisu": 32,
      "asOf": "2026-02-01",
      "asOfLabel": "2026年2月1日",
      "factions": [
        {
          "name": "大阪維新の会枚方市議会議員団",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "公明党議員団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "自由民主党・無所属の会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "連合市民の会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "命を守る政治の会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第84号",
        "billName": "令和８年度大阪府枚方市一般会計予算",
        "sessionLabel": "令和８年３月定例月議会",
        "decidedDate": "2026-03-27",
        "decidedDateLabel": "令和8年3月27日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 枚方市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "枚方市議会報第361号（令和8年2月1日号）会派等所属別議員名",
        "localUrl": "/sources/hirakata-shigikai-r8/361.pdf",
        "originUrl": "https://www.city.hirakata.osaka.jp/cmsfiles/contents/0000031/31677/361.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001173638/https://www.city.hirakata.osaka.jp/cmsfiles/contents/0000031/31677/361.pdf"
      },
      "result": {
        "title": "付議事件議決結果一覧（令和8年3月定例月議会）",
        "localUrl": "/sources/hirakata-shigikai-r8/20260327_giketsukekka.pdf",
        "originUrl": "https://www.city.hirakata.osaka.jp/cmsfiles/contents/0000000/269/20260327_giketsukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001173849/https://www.city.hirakata.osaka.jp/cmsfiles/contents/0000000/269/20260327_giketsukekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "272124": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "八尾市議会",
      "seats": 24,
      "asOf": "2025-10-03",
      "asOfLabel": "2025年10月3日",
      "factions": [
        {
          "name": "大阪維新の会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "八尾保守の会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "八尾の未来を紡ぐ会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "新声",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "至誠会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "会派に所属しない議員（鑄方淳治）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第18号",
        "billName": "令和８年度八尾市一般会計予算の件",
        "sessionLabel": "令和８年３月市議会定例会",
        "decidedDate": "2026-03-27",
        "decidedDateLabel": "令和8年3月27日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 八尾市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和7年10月3日現在）",
        "localUrl": "/sources/yao-shigikai-r8/1009487.html",
        "originUrl": "https://web.archive.org/web/20260310130721id_/https://www.city.yao.osaka.jp/shisei/yaoshigikai/1009482/1009487.html",
        "archiveUrl": "https://web.archive.org/web/20260310130721id_/https://www.city.yao.osaka.jp/shisei/yaoshigikai/1009482/1009487.html"
      },
      "result": {
        "title": "令和８年３月市議会定例会 議決結果（議員別採決態度）",
        "localUrl": "/sources/yao-shigikai-r8/0803saiketutaido.pdf",
        "originUrl": "https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/023/883/0803saiketutaido.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001174206/https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/023/883/0803saiketutaido.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 21,
          "議長": 1,
          "反対": 2
        },
        "byFaction": [
          {
            "faction": "大阪維新の会",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "景山和香",
                "stance": "賛成"
              },
              {
                "name": "木村健二",
                "stance": "賛成"
              },
              {
                "name": "坂本尚之",
                "stance": "賛成"
              },
              {
                "name": "桝井政佐美",
                "stance": "賛成"
              },
              {
                "name": "奥田信宏",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "福永美智子",
                "stance": "賛成"
              },
              {
                "name": "南方武",
                "stance": "賛成"
              },
              {
                "name": "五百井真二",
                "stance": "賛成"
              },
              {
                "name": "前園正昭",
                "stance": "賛成"
              },
              {
                "name": "西田尚美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "八尾保守の会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "川上舞",
                "stance": "賛成"
              },
              {
                "name": "松田憲幸",
                "stance": "賛成"
              },
              {
                "name": "露原行隆",
                "stance": "賛成"
              },
              {
                "name": "田中久夫",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "八尾の未来を紡ぐ会",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "柴谷匡哉",
                "stance": "賛成"
              },
              {
                "name": "西川あり",
                "stance": "賛成"
              },
              {
                "name": "吉村拓哉",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "新声",
            "counts": {
              "賛成": 1,
              "議長": 1
            },
            "members": [
              {
                "name": "山中宏",
                "stance": "賛成"
              },
              {
                "name": "竹田孝吏",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "田中裕子",
                "stance": "反対"
              },
              {
                "name": "越智妙子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "至誠会",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "稲森洋樹",
                "stance": "賛成"
              },
              {
                "name": "田中慎二",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派に所属しない議員（鑄方淳治）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "鑄方淳治",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年３月市議会定例会 議決結果（議員別採決態度）",
          "localUrl": "/sources/yao-shigikai-r8/0803saiketutaido.pdf",
          "originUrl": "https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/023/883/0803saiketutaido.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001174206/https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/023/883/0803saiketutaido.pdf"
        }
      }
    }
  ],
  "281000": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "神戸市会",
      "seats": 64,
      "teisu": 65,
      "asOf": "2026-01-27",
      "asOfLabel": "2026年1月27日",
      "factions": [
        {
          "name": "自由民主党",
          "seats": 15,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "こうべ未来",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "新しい自民党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "躍動の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "つなぐ",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属（平野章三）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（上原みなみ）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（なんのゆうこ）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "予算第1号議案",
        "billName": "令和8年度神戸市一般会計予算",
        "sessionLabel": "令和8年第1回定例市会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 神戸市会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "神戸市会 会派（最終更新日 2026年1月27日）",
        "localUrl": "/sources/kobe-shikai-r8/kaiha.html",
        "originUrl": "https://web.archive.org/web/20260309125942id_/https://www.city.kobe.lg.jp/a71064/shise/municipal/giinnmeibo/kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20260309125942id_/https://www.city.kobe.lg.jp/a71064/shise/municipal/giinnmeibo/kaiha.html"
      },
      "result": {
        "title": "2026年/令和8年第1回定例市会【2月議会】",
        "localUrl": "/sources/kobe-shikai-r8/2gatsukekka.html",
        "originUrl": "https://www.city.kobe.lg.jp/z/shikaijimukyoku/giann_etc/r8/2gatsukekka.html",
        "archiveUrl": "https://web.archive.org/web/20260317083801/https://www.city.kobe.lg.jp/z/shikaijimukyoku/giann_etc/r8/2gatsukekka.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "282014": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "姫路市議会",
      "seats": 45,
      "asOf": "2025-09-01",
      "asOfLabel": "2025年9月1日",
      "factions": [
        {
          "name": "公明党",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "自由民主党",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "新生ひめじ",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "姫路無所属の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "改革無所属の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "志政会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党議員団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "刷新の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "無所属（高見千咲）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第1号",
        "billName": "令和８年度姫路市一般会計予算",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 姫路市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "市議会議員名簿（会派別）（更新日 2025年9月1日）",
        "localUrl": "/sources/himeji-shigikai-r8/0000000374.html",
        "originUrl": "https://web.archive.org/web/20260415193403id_/https://www.city.himeji.lg.jp/shisei/0000000374.html",
        "archiveUrl": "https://web.archive.org/web/20260415193403id_/https://www.city.himeji.lg.jp/shisei/0000000374.html"
      },
      "result": {
        "title": "提出議案とその結果（令和8年第1回定例会）議案に対する議員の賛否一覧",
        "localUrl": "/sources/himeji-shigikai-r8/0325giannsinngikekka.pdf",
        "originUrl": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000032/32725/0325giannsinngikekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001174251/https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000032/32725/0325giannsinngikekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 41,
          "議長": 1,
          "反対": 3
        },
        "byFaction": [
          {
            "faction": "公明党",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "西本眞造",
                "stance": "賛成"
              },
              {
                "name": "川島淳良",
                "stance": "賛成"
              },
              {
                "name": "白井義一",
                "stance": "賛成"
              },
              {
                "name": "中西祥子",
                "stance": "賛成"
              },
              {
                "name": "阿野れい子",
                "stance": "賛成"
              },
              {
                "name": "前川藤枝",
                "stance": "賛成"
              },
              {
                "name": "有馬剛朗",
                "stance": "賛成"
              },
              {
                "name": "宮下和也",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民クラブ",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "竹尾浩司",
                "stance": "賛成"
              },
              {
                "name": "常盤真功",
                "stance": "賛成"
              },
              {
                "name": "山口悟",
                "stance": "賛成"
              },
              {
                "name": "駒田かすみ",
                "stance": "賛成"
              },
              {
                "name": "三輪敏之",
                "stance": "賛成"
              },
              {
                "name": "阿山正人",
                "stance": "賛成"
              },
              {
                "name": "八木隆次郎",
                "stance": "賛成"
              },
              {
                "name": "蔭山敏明",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "自由民主党",
            "counts": {
              "賛成": 6,
              "議長": 1
            },
            "members": [
              {
                "name": "竹中隆一",
                "stance": "賛成"
              },
              {
                "name": "井川一善",
                "stance": "賛成"
              },
              {
                "name": "重田一政",
                "stance": "賛成"
              },
              {
                "name": "仁野央子",
                "stance": "賛成"
              },
              {
                "name": "石見和之",
                "stance": "賛成"
              },
              {
                "name": "石堂大輔",
                "stance": "議長"
              },
              {
                "name": "宮本吉秀",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "新生ひめじ",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "三和衛",
                "stance": "賛成"
              },
              {
                "name": "井上太良",
                "stance": "賛成"
              },
              {
                "name": "東影昭",
                "stance": "賛成"
              },
              {
                "name": "萩原唯典",
                "stance": "賛成"
              },
              {
                "name": "杉本博昭",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本維新の会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "大西陽介",
                "stance": "賛成"
              },
              {
                "name": "竹中由佳",
                "stance": "賛成"
              },
              {
                "name": "下林崇史",
                "stance": "賛成"
              },
              {
                "name": "三浦充博",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "姫路無所属の会",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "妻鹿幸二",
                "stance": "賛成"
              },
              {
                "name": "神頭敬介",
                "stance": "賛成"
              },
              {
                "name": "嶋谷秀樹",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "改革無所属の会",
            "counts": {
              "賛成": 2,
              "反対": 1
            },
            "members": [
              {
                "name": "塚本進介",
                "stance": "賛成"
              },
              {
                "name": "牧野圭輔",
                "stance": "反対"
              },
              {
                "name": "坂本学",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "志政会",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "金内義和",
                "stance": "賛成"
              },
              {
                "name": "西村しのぶ",
                "stance": "賛成"
              },
              {
                "name": "松岡廣幸",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党議員団",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "谷川真由美",
                "stance": "反対"
              },
              {
                "name": "小田響子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "刷新の会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "岡部敦吏",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（高見千咲）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "高見千咲",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "提出議案とその結果（令和8年第1回定例会）議案に対する議員の賛否一覧",
          "localUrl": "/sources/himeji-shigikai-r8/0325giannsinngikekka.pdf",
          "originUrl": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000032/32725/0325giannsinngikekka.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001174251/https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000032/32725/0325giannsinngikekka.pdf"
        }
      }
    }
  ],
  "282031": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "明石市議会",
      "seats": 30,
      "teisu": 30,
      "asOf": "2026-02-01",
      "asOfLabel": "2026年2月1日",
      "factions": [
        {
          "name": "かがやきネット・市民の会",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "自由民主党明石",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "明石維新の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "対話の会あかし",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "スマイル会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第２９号",
        "billName": "令和８年度明石市一般会計予算",
        "sessionLabel": "第１回定例会３月議会",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "修正可決"
      },
      "sourceTitle": "令和8年度 明石市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派（令和8年2月1日現在）",
        "localUrl": "/sources/akashi-shigikai-r8/kaiha.html",
        "originUrl": "https://web.archive.org/web/20260311190050id_/https://www.city.akashi.lg.jp/gikai/youkoso/shoukai/kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20260311190050id_/https://www.city.akashi.lg.jp/gikai/youkoso/shoukai/kaiha.html"
      },
      "result": {
        "title": "第１回定例会３月議会審議結果報告のこと",
        "localUrl": "/sources/akashi-shigikai-r8/50803singikekka.pdf",
        "originUrl": "https://www.city.akashi.lg.jp/documents/31614/50803singikekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001174401/https://www.city.akashi.lg.jp/documents/31614/50803singikekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "voteParts": [
        {
          "part": "修正案",
          "basis": "member",
          "stances": [
            "賛成",
            "反対",
            "議長"
          ],
          "tally": {
            "賛成": 18,
            "反対": 11,
            "議長": 1
          },
          "byFaction": [
            {
              "faction": "かがやきネット・市民の会",
              "counts": {
                "賛成": 10
              },
              "members": [
                {
                  "name": "上田雅彦",
                  "stance": "賛成"
                },
                {
                  "name": "中川夏望",
                  "stance": "賛成"
                },
                {
                  "name": "山下祥",
                  "stance": "賛成"
                },
                {
                  "name": "金尾良信",
                  "stance": "賛成"
                },
                {
                  "name": "黒田智子",
                  "stance": "賛成"
                },
                {
                  "name": "山中裕司",
                  "stance": "賛成"
                },
                {
                  "name": "林丸美",
                  "stance": "賛成"
                },
                {
                  "name": "竹内きよ子",
                  "stance": "賛成"
                },
                {
                  "name": "宮坂祐太",
                  "stance": "賛成"
                },
                {
                  "name": "寺井吉広",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "自由民主党明石",
              "counts": {
                "反対": 8
              },
              "members": [
                {
                  "name": "出雲有希子",
                  "stance": "反対"
                },
                {
                  "name": "石井宏法",
                  "stance": "反対"
                },
                {
                  "name": "井藤圭順",
                  "stance": "反対"
                },
                {
                  "name": "灰野修平",
                  "stance": "反対"
                },
                {
                  "name": "榎本和夫",
                  "stance": "反対"
                },
                {
                  "name": "千住啓介",
                  "stance": "反対"
                },
                {
                  "name": "三好宏",
                  "stance": "反対"
                },
                {
                  "name": "辰巳浩司",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "公明党",
              "counts": {
                "賛成": 5,
                "議長": 1
              },
              "members": [
                {
                  "name": "長尾博子",
                  "stance": "賛成"
                },
                {
                  "name": "河村和歌子",
                  "stance": "賛成"
                },
                {
                  "name": "尾倉あき子",
                  "stance": "賛成"
                },
                {
                  "name": "飯田伸子",
                  "stance": "賛成"
                },
                {
                  "name": "梅田宏希",
                  "stance": "賛成"
                },
                {
                  "name": "国出拓志",
                  "stance": "議長"
                }
              ]
            },
            {
              "faction": "明石維新の会",
              "counts": {
                "反対": 3
              },
              "members": [
                {
                  "name": "正木克幸",
                  "stance": "反対"
                },
                {
                  "name": "中村茂雄",
                  "stance": "反対"
                },
                {
                  "name": "髙尾秀彰",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "日本共産党",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "辻本達也",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "対話の会あかし",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "中西礼皇",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "スマイル会",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "家根谷敦子",
                  "stance": "賛成"
                }
              ]
            }
          ],
          "source": {
            "title": "令和８年第１回定例会３月議会（３月２５日）賛否一覧",
            "localUrl": "/sources/akashi-shigikai-r8/50803sanpi_2.pdf",
            "originUrl": "https://www.city.akashi.lg.jp/documents/31615/50803sanpi_2.pdf",
            "archiveUrl": "https://web.archive.org/web/20261001174454/https://www.city.akashi.lg.jp/documents/31615/50803sanpi_2.pdf"
          }
        },
        {
          "part": "修正部分を除く原案",
          "basis": "member",
          "stances": [
            "賛成",
            "反対",
            "議長"
          ],
          "tally": {
            "賛成": 28,
            "議長": 1,
            "反対": 1
          },
          "byFaction": [
            {
              "faction": "かがやきネット・市民の会",
              "counts": {
                "賛成": 10
              },
              "members": [
                {
                  "name": "上田雅彦",
                  "stance": "賛成"
                },
                {
                  "name": "中川夏望",
                  "stance": "賛成"
                },
                {
                  "name": "山下祥",
                  "stance": "賛成"
                },
                {
                  "name": "金尾良信",
                  "stance": "賛成"
                },
                {
                  "name": "黒田智子",
                  "stance": "賛成"
                },
                {
                  "name": "山中裕司",
                  "stance": "賛成"
                },
                {
                  "name": "林丸美",
                  "stance": "賛成"
                },
                {
                  "name": "竹内きよ子",
                  "stance": "賛成"
                },
                {
                  "name": "宮坂祐太",
                  "stance": "賛成"
                },
                {
                  "name": "寺井吉広",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "自由民主党明石",
              "counts": {
                "賛成": 8
              },
              "members": [
                {
                  "name": "出雲有希子",
                  "stance": "賛成"
                },
                {
                  "name": "石井宏法",
                  "stance": "賛成"
                },
                {
                  "name": "井藤圭順",
                  "stance": "賛成"
                },
                {
                  "name": "灰野修平",
                  "stance": "賛成"
                },
                {
                  "name": "榎本和夫",
                  "stance": "賛成"
                },
                {
                  "name": "千住啓介",
                  "stance": "賛成"
                },
                {
                  "name": "三好宏",
                  "stance": "賛成"
                },
                {
                  "name": "辰巳浩司",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "公明党",
              "counts": {
                "賛成": 5,
                "議長": 1
              },
              "members": [
                {
                  "name": "長尾博子",
                  "stance": "賛成"
                },
                {
                  "name": "河村和歌子",
                  "stance": "賛成"
                },
                {
                  "name": "尾倉あき子",
                  "stance": "賛成"
                },
                {
                  "name": "飯田伸子",
                  "stance": "賛成"
                },
                {
                  "name": "梅田宏希",
                  "stance": "賛成"
                },
                {
                  "name": "国出拓志",
                  "stance": "議長"
                }
              ]
            },
            {
              "faction": "明石維新の会",
              "counts": {
                "賛成": 3
              },
              "members": [
                {
                  "name": "正木克幸",
                  "stance": "賛成"
                },
                {
                  "name": "中村茂雄",
                  "stance": "賛成"
                },
                {
                  "name": "髙尾秀彰",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "日本共産党",
              "counts": {
                "反対": 1
              },
              "members": [
                {
                  "name": "辻本達也",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "対話の会あかし",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "中西礼皇",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "スマイル会",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "家根谷敦子",
                  "stance": "賛成"
                }
              ]
            }
          ],
          "source": {
            "title": "令和８年第１回定例会３月議会（３月２５日）賛否一覧",
            "localUrl": "/sources/akashi-shigikai-r8/50803sanpi_2.pdf",
            "originUrl": "https://www.city.akashi.lg.jp/documents/31615/50803sanpi_2.pdf",
            "archiveUrl": "https://web.archive.org/web/20261001174454/https://www.city.akashi.lg.jp/documents/31615/50803sanpi_2.pdf"
          }
        }
      ]
    }
  ],
  "282049": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "西宮市議会",
      "seats": 40,
      "asOf": "2025-10-02",
      "asOfLabel": "2025年10月2日",
      "factions": [
        {
          "name": "日本維新の会　西宮市議団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "会派・ぜんしん",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "啓誠会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党西宮市会議員団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属",
          "seats": 4,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第493号",
        "billName": "令和８年度西宮市一般会計予算",
        "sessionLabel": "令和8年3月（第16回）定例会",
        "decidedDate": "2026-03-18",
        "decidedDateLabel": "令和8年3月18日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 西宮市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和7年10月2日現在）",
        "localUrl": "/sources/nishinomiya-shigikai-r8/kaihabetsu-list.html",
        "originUrl": "https://web.archive.org/web/20260112181844id_/https://www.nishi.or.jp/nishinomiyashigikai/namelist/kaihabetsu-list.html",
        "archiveUrl": "https://web.archive.org/web/20260112181844id_/https://www.nishi.or.jp/nishinomiyashigikai/namelist/kaihabetsu-list.html"
      },
      "result": {
        "title": "議決結果（令和8年3月（第16回）定例会）",
        "localUrl": "/sources/nishinomiya-shigikai-r8/g07_giketsu.asp_Sflg_1_kaigi_2026_02_16_2026_03_19_272_kensu_100.html",
        "originUrl": "https://nishi.gijiroku.com/g07_giketsu.asp?Sflg=1&kaigi=2026/02/16,2026/03/19,272&kensu=100",
        "archiveUrl": "https://web.archive.org/web/20261001175459/https://nishi.gijiroku.com/g07_giketsu.asp?Sflg=1&kaigi=2026%2F02%2F16,2026%2F03%2F19,272&kensu=100"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "292010": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "奈良市議会",
      "seats": 39,
      "teisu": 39,
      "asOf": "2025-11-19",
      "asOfLabel": "2025年11月19日",
      "factions": [
        {
          "name": "自由民主党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党奈良市議会議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本維新の会奈良市議団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党奈良市会議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "自民党・無所属の会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "市民ひろば",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "未来の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属（尾崎暢子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（松尾浩司）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（江川友梨）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（内藤智司）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（松下幸治）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（へずまりゅう）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（松石聖一）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第１６号",
        "billName": "令和８年度奈良市一般会計予算",
        "sessionLabel": "令和８年３月定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "修正可決"
      },
      "sourceTitle": "令和8年度 奈良市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和7年11月19日現在）",
        "localUrl": "/sources/nara-shigikai-r8/114364.html",
        "originUrl": "https://web.archive.org/web/20260414181844id_/https://www.city.nara.lg.jp/site/narasigikai/114364.html",
        "archiveUrl": "https://web.archive.org/web/20260414181844id_/https://www.city.nara.lg.jp/site/narasigikai/114364.html"
      },
      "result": {
        "title": "議決結果一覧表（令和８年３月定例会）",
        "localUrl": "/sources/nara-shigikai-r8/208608.pdf",
        "originUrl": "https://www.city.nara.lg.jp/uploaded/attachment/208608.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001174652/https://www.city.nara.lg.jp/uploaded/attachment/208608.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "voteParts": [
        {
          "part": "修正部分を除く原案",
          "basis": "faction",
          "unanimousText": "全会一致",
          "stances": [
            "賛成",
            "議長"
          ],
          "tally": {
            "賛成": 38,
            "議長": 1
          },
          "byFaction": [
            {
              "faction": "自由民主党",
              "counts": {
                "賛成": 6
              },
              "members": []
            },
            {
              "faction": "公明党奈良市議会議員団",
              "counts": {
                "賛成": 6
              },
              "members": []
            },
            {
              "faction": "日本維新の会奈良市議団",
              "counts": {
                "議長": 1,
                "賛成": 5
              },
              "members": [
                {
                  "name": "大西淳文",
                  "stance": "議長"
                }
              ]
            },
            {
              "faction": "日本共産党奈良市会議員団",
              "counts": {
                "賛成": 4
              },
              "members": []
            },
            {
              "faction": "自民党・無所属の会",
              "counts": {
                "賛成": 4
              },
              "members": []
            },
            {
              "faction": "市民ひろば",
              "counts": {
                "賛成": 3
              },
              "members": []
            },
            {
              "faction": "未来の会",
              "counts": {
                "賛成": 3
              },
              "members": []
            },
            {
              "faction": "無所属（尾崎暢子）",
              "counts": {
                "賛成": 1
              },
              "members": []
            },
            {
              "faction": "無所属（松尾浩司）",
              "counts": {
                "賛成": 1
              },
              "members": []
            },
            {
              "faction": "無所属（江川友梨）",
              "counts": {
                "賛成": 1
              },
              "members": []
            },
            {
              "faction": "無所属（内藤智司）",
              "counts": {
                "賛成": 1
              },
              "members": []
            },
            {
              "faction": "無所属（松下幸治）",
              "counts": {
                "賛成": 1
              },
              "members": []
            },
            {
              "faction": "無所属（へずまりゅう）",
              "counts": {
                "賛成": 1
              },
              "members": []
            },
            {
              "faction": "無所属（松石聖一）",
              "counts": {
                "賛成": 1
              },
              "members": []
            }
          ],
          "source": {
            "title": "令和8年3月定例会 議決結果・賛否一覧表",
            "localUrl": "/sources/nara-shigikai-r8/209444.pdf",
            "originUrl": "https://www.city.nara.lg.jp/uploaded/attachment/209444.pdf",
            "archiveUrl": "https://web.archive.org/web/20261001174803/https://www.city.nara.lg.jp/uploaded/attachment/209444.pdf"
          }
        },
        {
          "part": "修正案",
          "basis": "member",
          "stances": [
            "賛成",
            "反対",
            "議長"
          ],
          "tally": {
            "賛成": 29,
            "議長": 1,
            "反対": 9
          },
          "byFaction": [
            {
              "faction": "自由民主党",
              "counts": {
                "賛成": 6
              },
              "members": [
                {
                  "name": "森田一成",
                  "stance": "賛成"
                },
                {
                  "name": "井久保裕也",
                  "stance": "賛成"
                },
                {
                  "name": "植村佳史",
                  "stance": "賛成"
                },
                {
                  "name": "八尾俊宏",
                  "stance": "賛成"
                },
                {
                  "name": "太田晃司",
                  "stance": "賛成"
                },
                {
                  "name": "道端孝治",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "公明党奈良市議会議員団",
              "counts": {
                "賛成": 6
              },
              "members": [
                {
                  "name": "九里雄二",
                  "stance": "賛成"
                },
                {
                  "name": "宮池明",
                  "stance": "賛成"
                },
                {
                  "name": "山口寛",
                  "stance": "賛成"
                },
                {
                  "name": "田畑日佐恵",
                  "stance": "賛成"
                },
                {
                  "name": "真鍋弘美",
                  "stance": "賛成"
                },
                {
                  "name": "早田哲朗",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "日本維新の会奈良市議団",
              "counts": {
                "賛成": 5,
                "議長": 1
              },
              "members": [
                {
                  "name": "柳田昌孝",
                  "stance": "賛成"
                },
                {
                  "name": "北邨翔平",
                  "stance": "賛成"
                },
                {
                  "name": "中川康",
                  "stance": "賛成"
                },
                {
                  "name": "木下修平",
                  "stance": "賛成"
                },
                {
                  "name": "佐野和則",
                  "stance": "賛成"
                },
                {
                  "name": "大西淳文",
                  "stance": "議長"
                }
              ]
            },
            {
              "faction": "日本共産党奈良市会議員団",
              "counts": {
                "賛成": 4
              },
              "members": [
                {
                  "name": "山口裕司",
                  "stance": "賛成"
                },
                {
                  "name": "白川健太郎",
                  "stance": "賛成"
                },
                {
                  "name": "山本直子",
                  "stance": "賛成"
                },
                {
                  "name": "北村拓哉",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "自民党・無所属の会",
              "counts": {
                "反対": 4
              },
              "members": [
                {
                  "name": "横井雄一",
                  "stance": "反対"
                },
                {
                  "name": "榎本博一",
                  "stance": "反対"
                },
                {
                  "name": "鍵田美智子",
                  "stance": "反対"
                },
                {
                  "name": "塚本勝",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "市民ひろば",
              "counts": {
                "反対": 3
              },
              "members": [
                {
                  "name": "樋口清二郎",
                  "stance": "反対"
                },
                {
                  "name": "阪本美知子",
                  "stance": "反対"
                },
                {
                  "name": "柿本元気",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "未来の会",
              "counts": {
                "賛成": 3
              },
              "members": [
                {
                  "name": "岡本誠至",
                  "stance": "賛成"
                },
                {
                  "name": "下村千恵",
                  "stance": "賛成"
                },
                {
                  "name": "階戸幸一",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "無所属（尾崎暢子）",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "尾崎暢子",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "無所属（松尾浩司）",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "松尾浩司",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "無所属（江川友梨）",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "江川友梨",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "無所属（内藤智司）",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "内藤智司",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "無所属（松下幸治）",
              "counts": {
                "反対": 1
              },
              "members": [
                {
                  "name": "松下幸治",
                  "stance": "反対"
                }
              ]
            },
            {
              "faction": "無所属（へずまりゅう）",
              "counts": {
                "賛成": 1
              },
              "members": [
                {
                  "name": "へずまりゅう",
                  "stance": "賛成"
                }
              ]
            },
            {
              "faction": "無所属（松石聖一）",
              "counts": {
                "反対": 1
              },
              "members": [
                {
                  "name": "松石聖一",
                  "stance": "反対"
                }
              ]
            }
          ],
          "source": {
            "title": "令和8年3月定例会 議決結果・賛否一覧表",
            "localUrl": "/sources/nara-shigikai-r8/209444.pdf",
            "originUrl": "https://www.city.nara.lg.jp/uploaded/attachment/209444.pdf",
            "archiveUrl": "https://web.archive.org/web/20261001174803/https://www.city.nara.lg.jp/uploaded/attachment/209444.pdf"
          }
        }
      ]
    }
  ],
  "322016": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "松江市議会",
      "seats": 31,
      "teisu": 31,
      "asOf": "2025-04-24",
      "asOfLabel": "2025年4月24日",
      "factions": [
        {
          "name": "誠政松江",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "志翔の会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "民主ネットワーク",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "公明クラブ",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党松江市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "会派に属しない議員（舟木一真）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "会派に属しない議員（錦織伸行）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議第56号",
        "billName": "令和８年度松江市一般会計予算",
        "sessionLabel": "令和８年第１回松江市議会（定例会）",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 松江市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "松江市議会議員名簿（会派別）（令和7年4月24日現在）",
        "localUrl": "/sources/matsue-shigikai-r8/kaihabetsumeibo20250425.pdf",
        "originUrl": "https://web.archive.org/web/20250426010046id_/https://www.city.matsue.lg.jp/material/files/group/107/kaihabetsumeibo20250425.pdf",
        "archiveUrl": "https://web.archive.org/web/20250426010046id_/https://www.city.matsue.lg.jp/material/files/group/107/kaihabetsumeibo20250425.pdf"
      },
      "result": {
        "title": "令和８年第１回松江市議会（定例会）議案等一覧表",
        "localUrl": "/sources/matsue-shigikai-r8/r8_3_26giantouitiran.pdf",
        "originUrl": "https://www.city.matsue.lg.jp/material/files/group/108/r8_3_26giantouitiran.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001184423/https://www.city.matsue.lg.jp/material/files/group/108/r8_3_26giantouitiran.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 27,
          "議長": 1,
          "反対": 3
        },
        "byFaction": [
          {
            "faction": "誠政松江",
            "counts": {
              "賛成": 11,
              "議長": 1
            },
            "members": [
              {
                "name": "わたなべ良平",
                "stance": "賛成"
              },
              {
                "name": "岩田幸子",
                "stance": "賛成"
              },
              {
                "name": "長谷川浩司",
                "stance": "賛成"
              },
              {
                "name": "佐藤和彦",
                "stance": "賛成"
              },
              {
                "name": "小澤一竜",
                "stance": "賛成"
              },
              {
                "name": "三島明",
                "stance": "賛成"
              },
              {
                "name": "原田守",
                "stance": "賛成"
              },
              {
                "name": "細木明美",
                "stance": "賛成"
              },
              {
                "name": "米田ときこ",
                "stance": "賛成"
              },
              {
                "name": "柳原治",
                "stance": "賛成"
              },
              {
                "name": "野々内誠",
                "stance": "議長"
              },
              {
                "name": "森脇勇人",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "志翔の会",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "中村ひかり",
                "stance": "賛成"
              },
              {
                "name": "村松りえ",
                "stance": "賛成"
              },
              {
                "name": "岩本雅之",
                "stance": "賛成"
              },
              {
                "name": "川島光雅",
                "stance": "賛成"
              },
              {
                "name": "石倉徳章",
                "stance": "賛成"
              },
              {
                "name": "石倉茂美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "民主ネットワーク",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "石倉聡之",
                "stance": "賛成"
              },
              {
                "name": "山根宏",
                "stance": "賛成"
              },
              {
                "name": "森本秀歳",
                "stance": "賛成"
              },
              {
                "name": "津森良治",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明クラブ",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "吉岡麻美",
                "stance": "賛成"
              },
              {
                "name": "佐々田慎吾",
                "stance": "賛成"
              },
              {
                "name": "海德邦彦",
                "stance": "賛成"
              },
              {
                "name": "太田哲",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党松江市議団",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "樋野伸一",
                "stance": "反対"
              },
              {
                "name": "佐野みどり",
                "stance": "反対"
              },
              {
                "name": "たちばなふみ",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "会派に属しない議員（舟木一真）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "舟木一真",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "会派に属しない議員（錦織伸行）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "錦織伸行",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年第１回松江市議会（定例会）議員別表決結果",
          "localUrl": "/sources/matsue-shigikai-r8/r8_0326_giinbetuhyouketukekka.pdf",
          "originUrl": "https://www.city.matsue.lg.jp/material/files/group/108/r8_0326_giinbetuhyouketukekka.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001174951/https://www.city.matsue.lg.jp/material/files/group/108/r8_0326_giinbetuhyouketukekka.pdf"
        }
      }
    }
  ],
  "331007": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "岡山市議会",
      "seats": 46,
      "teisu": 46,
      "asOf": "2025-10-06",
      "asOfLabel": "2025年10月6日",
      "factions": [
        {
          "name": "自由民主党岡山市議会",
          "seats": 23,
          "isIndependent": false
        },
        {
          "name": "公明党岡山市議団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "日本共産党岡山市議団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "おかやま創政会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "みらいえ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "懐かしい未来",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "おかやま未来プロジェクト",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "日本維新の会岡山市議団",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "甲第4号議案",
        "billName": "令和8年度岡山市一般会計予算について",
        "sessionLabel": "2月定例市議会",
        "decidedDate": "2026-03-17",
        "decidedDateLabel": "令和8年3月17日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 岡山市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別一覧（令和7年10月6日現在）",
        "localUrl": "/sources/okayama-shigikai-r8/0000015562.html",
        "originUrl": "https://web.archive.org/web/20251215204755id_/https://www.city.okayama.jp/gikai/0000015562.html",
        "archiveUrl": "https://web.archive.org/web/20251215204755id_/https://www.city.okayama.jp/gikai/0000015562.html"
      },
      "result": {
        "title": "2月定例市議会議決結果（令和8年3月17日議決）",
        "localUrl": "/sources/okayama-shigikai-r8/0000078927.html",
        "originUrl": "https://www.city.okayama.jp/gikai/0000078927.html",
        "archiveUrl": "https://web.archive.org/web/20260305142947/https://www.city.okayama.jp/gikai/0000078927.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 38,
          "反対": 7,
          "議長": 1
        },
        "byFaction": [
          {
            "faction": "公明党岡山市議団",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "則武宣弘",
                "stance": "賛成"
              },
              {
                "name": "松田安義",
                "stance": "賛成"
              },
              {
                "name": "福吉智徳",
                "stance": "賛成"
              },
              {
                "name": "林敏宏",
                "stance": "賛成"
              },
              {
                "name": "平元道隆",
                "stance": "賛成"
              },
              {
                "name": "桑田桂子",
                "stance": "賛成"
              },
              {
                "name": "長岡将克",
                "stance": "賛成"
              },
              {
                "name": "早野賢一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党岡山市議団",
            "counts": {
              "反対": 4
            },
            "members": [
              {
                "name": "林潤",
                "stance": "反対"
              },
              {
                "name": "田中のぞみ",
                "stance": "反対"
              },
              {
                "name": "東毅",
                "stance": "反対"
              },
              {
                "name": "宿女和子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "自由民主党岡山市議会",
            "counts": {
              "賛成": 22,
              "議長": 1
            },
            "members": [
              {
                "name": "宮武博",
                "stance": "賛成"
              },
              {
                "name": "三木亮治",
                "stance": "賛成"
              },
              {
                "name": "和氣健",
                "stance": "賛成"
              },
              {
                "name": "成本俊一",
                "stance": "賛成"
              },
              {
                "name": "小川信幸",
                "stance": "賛成"
              },
              {
                "name": "藤原哲之",
                "stance": "賛成"
              },
              {
                "name": "森田卓司",
                "stance": "賛成"
              },
              {
                "name": "吉本賢二",
                "stance": "賛成"
              },
              {
                "name": "赤木一雄",
                "stance": "賛成"
              },
              {
                "name": "難波満津留",
                "stance": "賛成"
              },
              {
                "name": "二嶋宣人",
                "stance": "賛成"
              },
              {
                "name": "川本浩一郎",
                "stance": "賛成"
              },
              {
                "name": "山田正幸",
                "stance": "賛成"
              },
              {
                "name": "松田隆之",
                "stance": "賛成"
              },
              {
                "name": "松本好厚",
                "stance": "賛成"
              },
              {
                "name": "柳井弘",
                "stance": "賛成"
              },
              {
                "name": "岡崎隆",
                "stance": "賛成"
              },
              {
                "name": "花岡栄太郎",
                "stance": "賛成"
              },
              {
                "name": "江田厚志",
                "stance": "賛成"
              },
              {
                "name": "大月晴一",
                "stance": "賛成"
              },
              {
                "name": "安東真理",
                "stance": "賛成"
              },
              {
                "name": "髙橋誠一郎",
                "stance": "賛成"
              },
              {
                "name": "田口裕士",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "懐かしい未来",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "森山幸治",
                "stance": "賛成"
              },
              {
                "name": "川上智美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "みらいえ",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "鬼木のぞみ",
                "stance": "反対"
              },
              {
                "name": "土田貴行",
                "stance": "反対"
              },
              {
                "name": "高成壯磨",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "おかやま創政会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "小林寿雄",
                "stance": "賛成"
              },
              {
                "name": "高橋雄大",
                "stance": "賛成"
              },
              {
                "name": "太田栄司",
                "stance": "賛成"
              },
              {
                "name": "柳迫和夫",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "おかやま未来プロジェクト",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "中島純",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本維新の会岡山市議団",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "前島慶太",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "議案に対する賛否 令和8年（令和8年3月17日議決分）",
          "localUrl": "/sources/okayama-shigikai-r8/0000078068.html",
          "originUrl": "https://www.city.okayama.jp/gikai/0000078068.html",
          "archiveUrl": "https://web.archive.org/web/20260211160108/https://www.city.okayama.jp/gikai/0000078068.html"
        }
      }
    }
  ],
  "332020": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "倉敷市議会",
      "seats": 43,
      "teisu": 43,
      "asOf": "2025-02-18",
      "asOfLabel": "2025年2月18日",
      "factions": [
        {
          "name": "くらしき創生クラブ",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "未来クラブ",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "公明党倉敷市議団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "新風くらしき",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "新政クラブ",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "青空市民クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党倉敷市議会議員団",
          "seats": 3,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第２６号",
        "billName": "令和８年度倉敷市一般会計予算",
        "sessionLabel": "令和８年第３回倉敷市議会（第１回定例会）",
        "decidedDate": "2026-03-18",
        "decidedDateLabel": "令和8年3月18日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 倉敷市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（更新日 2025年2月18日）",
        "localUrl": "/sources/kurashiki-shigikai-r8/1008326.html",
        "originUrl": "https://web.archive.org/web/20250811201558id_/https://www.city.kurashiki.okayama.jp/cityinfo/assembly/1008324/1008326.html",
        "archiveUrl": "https://web.archive.org/web/20250811201558id_/https://www.city.kurashiki.okayama.jp/cityinfo/assembly/1008324/1008326.html"
      },
      "result": {
        "title": "令和８年第３回倉敷市議会（第１回定例会）議案一覧",
        "localUrl": "/sources/kurashiki-shigikai-r8/0318giannitiran.pdf",
        "originUrl": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/023/399/0318giannitiran.pdf",
        "archiveUrl": "https://web.archive.org/web/20261002115156/https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/023/399/0318giannitiran.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 39,
          "議長": 1,
          "反対": 3
        },
        "byFaction": [
          {
            "faction": "くらしき創生クラブ",
            "counts": {
              "賛成": 9,
              "議長": 1
            },
            "members": [
              {
                "name": "天野千歌",
                "stance": "賛成"
              },
              {
                "name": "荒木竜二",
                "stance": "議長"
              },
              {
                "name": "伊東裕紀",
                "stance": "賛成"
              },
              {
                "name": "北畠克彦",
                "stance": "賛成"
              },
              {
                "name": "塩田健",
                "stance": "賛成"
              },
              {
                "name": "時尾博幸",
                "stance": "賛成"
              },
              {
                "name": "難波朋裕",
                "stance": "賛成"
              },
              {
                "name": "藤原薫子",
                "stance": "賛成"
              },
              {
                "name": "三村英世",
                "stance": "賛成"
              },
              {
                "name": "守屋弘志",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "未来クラブ",
            "counts": {
              "賛成": 9
            },
            "members": [
              {
                "name": "赤澤幹温",
                "stance": "賛成"
              },
              {
                "name": "大橋賢",
                "stance": "賛成"
              },
              {
                "name": "片山貴光",
                "stance": "賛成"
              },
              {
                "name": "真田意索",
                "stance": "賛成"
              },
              {
                "name": "中西公仁",
                "stance": "賛成"
              },
              {
                "name": "原田龍五",
                "stance": "賛成"
              },
              {
                "name": "矢野周子",
                "stance": "賛成"
              },
              {
                "name": "山畑滝男",
                "stance": "賛成"
              },
              {
                "name": "若林昭雄",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党倉敷市議団",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "池田和夫",
                "stance": "賛成"
              },
              {
                "name": "太田美貴絵",
                "stance": "賛成"
              },
              {
                "name": "生水耕二",
                "stance": "賛成"
              },
              {
                "name": "近藤徹弥",
                "stance": "賛成"
              },
              {
                "name": "中西善之",
                "stance": "賛成"
              },
              {
                "name": "新垣敦子",
                "stance": "賛成"
              },
              {
                "name": "薮田尊典",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "新風くらしき",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "芦田泰宏",
                "stance": "賛成"
              },
              {
                "name": "塩津心",
                "stance": "賛成"
              },
              {
                "name": "武則史園",
                "stance": "賛成"
              },
              {
                "name": "中島光浩",
                "stance": "賛成"
              },
              {
                "name": "日向豊",
                "stance": "賛成"
              },
              {
                "name": "平井俊光",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "新政クラブ",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "大橋研",
                "stance": "賛成"
              },
              {
                "name": "大守秀行",
                "stance": "賛成"
              },
              {
                "name": "瀧本寛",
                "stance": "賛成"
              },
              {
                "name": "松成康昭",
                "stance": "賛成"
              },
              {
                "name": "山口博隆",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "青空市民クラブ",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "小郷ひな子",
                "stance": "賛成"
              },
              {
                "name": "齋藤武次郎",
                "stance": "賛成"
              },
              {
                "name": "藤井昭佐",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党倉敷市議会議員団",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "末田正彦",
                "stance": "反対"
              },
              {
                "name": "田口明子",
                "stance": "反対"
              },
              {
                "name": "田辺牧美",
                "stance": "反対"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年２月定例会 議員別表決結果一覧表",
          "localUrl": "/sources/kurashiki-shigikai-r8/0318giinnitirann.pdf",
          "originUrl": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/023/399/0318giinnitirann.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001175138/https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/023/399/0318giinnitirann.pdf"
        }
      }
    }
  ],
  "341002": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "広島市議会",
      "seats": 52,
      "asOf": "2026-02-25",
      "asOfLabel": "2026年2月25日",
      "factions": [
        {
          "name": "自由民主党・市民クラブ",
          "seats": 14,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "市民連合・市民の声",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "ひろしま清風会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "広島維新の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "新政クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無党派クラブ",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "至誠会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "清流クラブ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "鈴蘭会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "新風クラブ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "広島成長フォーラム",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "1",
        "billName": "令和8年度広島市一般会計予算",
        "sessionLabel": "令和8年第2回定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 広島市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別一覧（更新日 2026年2月25日）",
        "localUrl": "/sources/hiroshima-shigikai-r8/1010248.html",
        "originUrl": "https://web.archive.org/web/20260329150632id_/https://www.city.hiroshima.lg.jp/gikai/giin-shoukai/1010248.html",
        "archiveUrl": "https://web.archive.org/web/20260329150632id_/https://www.city.hiroshima.lg.jp/gikai/giin-shoukai/1010248.html"
      },
      "result": {
        "title": "令和8年第2回定例会（2月13日～3月26日）",
        "localUrl": "/sources/hiroshima-shigikai-r8/1048719.html",
        "originUrl": "https://www.city.hiroshima.lg.jp/gikai/nittei/1027907/1048719.html",
        "archiveUrl": "https://web.archive.org/web/20260418175802/https://www.city.hiroshima.lg.jp/gikai/nittei/1027907/1048719.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "議長"
        ],
        "tally": {
          "賛成": 51,
          "議長": 1
        },
        "byFaction": [
          {
            "faction": "自由民主党・市民クラブ",
            "counts": {
              "賛成": 13,
              "議長": 1
            },
            "members": [
              {
                "name": "八條範彦",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 8
            },
            "members": []
          },
          {
            "faction": "市民連合・市民の声",
            "counts": {
              "賛成": 7
            },
            "members": []
          },
          {
            "faction": "日本共産党",
            "counts": {
              "賛成": 6
            },
            "members": []
          },
          {
            "faction": "ひろしま清風会",
            "counts": {
              "賛成": 4
            },
            "members": []
          },
          {
            "faction": "広島維新の会",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "新政クラブ",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "無党派クラブ",
            "counts": {
              "賛成": 2
            },
            "members": []
          },
          {
            "faction": "至誠会",
            "counts": {
              "賛成": 1
            },
            "members": []
          },
          {
            "faction": "清流クラブ",
            "counts": {
              "賛成": 1
            },
            "members": []
          },
          {
            "faction": "鈴蘭会",
            "counts": {
              "賛成": 1
            },
            "members": []
          },
          {
            "faction": "新風クラブ",
            "counts": {
              "賛成": 1
            },
            "members": []
          },
          {
            "faction": "広島成長フォーラム",
            "counts": {
              "賛成": 1
            },
            "members": []
          }
        ],
        "source": {
          "title": "２月定例会の議案と議決結果など（令和８年３月26日議決分）",
          "localUrl": "/sources/hiroshima-shigikai-r8/260326.pdf",
          "originUrl": "https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/048/719/260326.pdf",
          "archiveUrl": "https://web.archive.org/web/20260518234925/https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/048/719/260326.pdf"
        }
      }
    }
  ],
  "401005": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "北九州市議会",
      "seats": 57,
      "asOf": "2026-02-02",
      "asOfLabel": "2026年2月2日",
      "factions": [
        {
          "name": "自民党・無所属の会",
          "seats": 16,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "市民とともに北九州",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "北九州会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "緑の風",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "変革と成長",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "1",
        "billName": "令和８年度北九州市一般会計予算",
        "sessionLabel": "令和８年２月定例会",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 北九州市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議員名簿 会派別（更新日 2026年2月2日）",
        "localUrl": "/sources/kitakyushu-gikai-r8/file_0056.html",
        "originUrl": "https://web.archive.org/web/20260213010153id_/https://www.city.kitakyushu.lg.jp/sigikai/file_0056.html",
        "archiveUrl": "https://web.archive.org/web/20260213010153id_/https://www.city.kitakyushu.lg.jp/sigikai/file_0056.html"
      },
      "result": {
        "title": "会議結果一覧（令和8年2月定例会）",
        "localUrl": "/sources/kitakyushu-gikai-r8/001198333.pdf",
        "originUrl": "https://www.city.kitakyushu.lg.jp/files/001198333.pdf",
        "archiveUrl": "https://web.archive.org/web/20260517132736/https://www.city.kitakyushu.lg.jp/files/001198333.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 46,
          "議長": 1,
          "反対": 10
        },
        "byFaction": [
          {
            "faction": "自民党・無所属の会",
            "counts": {
              "賛成": 15,
              "議長": 1
            },
            "members": [
              {
                "name": "中村義雄",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 13
            },
            "members": []
          },
          {
            "faction": "市民とともに北九州",
            "counts": {
              "賛成": 10
            },
            "members": []
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 7
            },
            "members": []
          },
          {
            "faction": "北九州会",
            "counts": {
              "賛成": 5
            },
            "members": []
          },
          {
            "faction": "緑の風",
            "counts": {
              "反対": 3
            },
            "members": []
          },
          {
            "faction": "日本維新の会",
            "counts": {
              "賛成": 2
            },
            "members": []
          },
          {
            "faction": "変革と成長",
            "counts": {
              "賛成": 1
            },
            "members": []
          }
        ],
        "source": {
          "title": "令和８年２月定例会 会議結果（各会派の賛否状況）",
          "localUrl": "/sources/kitakyushu-gikai-r8/001198333.pdf",
          "originUrl": "https://www.city.kitakyushu.lg.jp/files/001198333.pdf",
          "archiveUrl": "https://web.archive.org/web/20260517132736/https://www.city.kitakyushu.lg.jp/files/001198333.pdf"
        }
      }
    }
  ],
  "401307": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "福岡市議会",
      "seats": 60,
      "teisu": 62,
      "asOf": "2026-03-27",
      "asOfLabel": "2026年3月27日",
      "factions": [
        {
          "name": "自由民主党福岡市議団",
          "seats": 18,
          "isIndependent": false
        },
        {
          "name": "公明党福岡市議団",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "福岡市民クラブ",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "日本共産党福岡市議団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "新しい風ふくおか",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本維新の会福岡市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "自民党新福岡",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属（あべひでき）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（新開ゆうじ）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（木村てつあき）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（森あやこ）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（川口浩）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "27",
        "billName": "令和８年度福岡市一般会計予算案",
        "sessionLabel": "令和８年第１回福岡市議会（定例会）",
        "decidedDate": "2026-03-27",
        "decidedDateLabel": "令和8年3月27日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 福岡市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議員一覧（令和８年２月20日時点、令和８年３月27日時点）",
        "localUrl": "/sources/fukuoka-shigikai-r8/ichiran_R80327.pdf",
        "originUrl": "https://gikai.city.fukuoka.lg.jp/wp-content/uploads/2026/04/ichiran_R80327.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001154956/https://gikai.city.fukuoka.lg.jp/wp-content/uploads/2026/04/ichiran_R80327.pdf"
      },
      "result": {
        "title": "令和８年第１回福岡市議会（定例会） 議案の議決結果",
        "localUrl": "/sources/fukuoka-shigikai-r8/r8_gikai1.html",
        "originUrl": "https://gikai.city.fukuoka.lg.jp/result/r8_gikai1",
        "archiveUrl": "https://web.archive.org/web/20261001155144/https://gikai.city.fukuoka.lg.jp/result/r8_gikai1"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "faction",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 43,
          "議長": 1,
          "反対": 16
        },
        "byFaction": [
          {
            "faction": "自由民主党福岡市議団",
            "counts": {
              "賛成": 17,
              "議長": 1
            },
            "members": [
              {
                "name": "平畑雅博",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "公明党福岡市議団",
            "counts": {
              "賛成": 12
            },
            "members": []
          },
          {
            "faction": "福岡市民クラブ",
            "counts": {
              "反対": 11
            },
            "members": []
          },
          {
            "faction": "日本共産党福岡市議団",
            "counts": {
              "反対": 4
            },
            "members": []
          },
          {
            "faction": "新しい風ふくおか",
            "counts": {
              "賛成": 4
            },
            "members": []
          },
          {
            "faction": "日本維新の会福岡市議団",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "自民党新福岡",
            "counts": {
              "賛成": 3
            },
            "members": []
          },
          {
            "faction": "無所属（あべひでき）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "あべひでき",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（新開ゆうじ）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "新開ゆうじ",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（木村てつあき）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "木村てつあき",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（森あやこ）",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "森あやこ",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "無所属（川口浩）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "川口浩",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和８年第１回福岡市議会（定例会） 議案の議決結果（会派ごとの賛否）",
          "localUrl": "/sources/fukuoka-shigikai-r8/r8_gikai1.html",
          "originUrl": "https://gikai.city.fukuoka.lg.jp/result/r8_gikai1",
          "archiveUrl": "https://web.archive.org/web/20261001155144/https://gikai.city.fukuoka.lg.jp/result/r8_gikai1"
        }
      }
    }
  ],
  "402036": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "久留米市議会",
      "seats": 35,
      "asOf": "2026-06-26",
      "asOfLabel": "2026年6月26日",
      "factions": [
        {
          "name": "きずな議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "久留米たすき議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "立志会議員団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "みらい久留米議員団",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "緑水会議員団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党久留米市議団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "改革の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第45号議案",
        "billName": "令和８年度久留米市一般会計予算",
        "sessionLabel": "令和8年第2回市議会定例会",
        "decidedDate": "2026-06-26",
        "decidedDateLabel": "令和8年6月26日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 久留米市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "令和8年第2回市議会定例会（6月）における議案に対する賛否の状況（会派・団体名と議員名の列見出し）",
        "localUrl": "/sources/kurume-shigikai-r8/R8.6sanpi.pdf",
        "originUrl": "https://www.city.kurume.fukuoka.jp/1100keikaku/2040shigikai/3030hongikai/4010giankekka/files/R8.6sanpi.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001182906/https://www.city.kurume.fukuoka.jp/1100keikaku/2040shigikai/3030hongikai/4010giankekka/files/R8.6sanpi.pdf"
      },
      "result": {
        "title": "令和8年第2回市議会定例会（6月）における議案に対する賛否の状況",
        "localUrl": "/sources/kurume-shigikai-r8/R8.6sanpi.pdf",
        "originUrl": "https://www.city.kurume.fukuoka.jp/1100keikaku/2040shigikai/3030hongikai/4010giankekka/files/R8.6sanpi.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001182906/https://www.city.kurume.fukuoka.jp/1100keikaku/2040shigikai/3030hongikai/4010giankekka/files/R8.6sanpi.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 30,
          "議長": 1,
          "反対": 4
        },
        "byFaction": [
          {
            "faction": "きずな議員団",
            "counts": {
              "賛成": 5,
              "議長": 1
            },
            "members": [
              {
                "name": "吉冨巧",
                "stance": "賛成"
              },
              {
                "name": "田住和也",
                "stance": "賛成"
              },
              {
                "name": "堀田洸太朗",
                "stance": "賛成"
              },
              {
                "name": "石井秀夫",
                "stance": "議長"
              },
              {
                "name": "山田貴生",
                "stance": "賛成"
              },
              {
                "name": "古賀としかず",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "久留米たすき議員団",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "そうだ耕一郎",
                "stance": "賛成"
              },
              {
                "name": "中村博俊",
                "stance": "賛成"
              },
              {
                "name": "山﨑ケブン",
                "stance": "賛成"
              },
              {
                "name": "甲斐田義弘",
                "stance": "賛成"
              },
              {
                "name": "石井俊一",
                "stance": "賛成"
              },
              {
                "name": "松岡保治",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党議員団",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "山下尚",
                "stance": "賛成"
              },
              {
                "name": "田中貴子",
                "stance": "賛成"
              },
              {
                "name": "生野薫",
                "stance": "賛成"
              },
              {
                "name": "田中功一",
                "stance": "賛成"
              },
              {
                "name": "塚本弘道",
                "stance": "賛成"
              },
              {
                "name": "坂田光弘",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "立志会議員団",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "永田一伸",
                "stance": "賛成"
              },
              {
                "name": "堺太一郎",
                "stance": "賛成"
              },
              {
                "name": "長野哲",
                "stance": "賛成"
              },
              {
                "name": "後藤敬介",
                "stance": "賛成"
              },
              {
                "name": "権藤智喜",
                "stance": "賛成"
              },
              {
                "name": "轟照隆",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "みらい久留米議員団",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "秋永峰子",
                "stance": "賛成"
              },
              {
                "name": "古賀敏久",
                "stance": "賛成"
              },
              {
                "name": "藤林詠子",
                "stance": "賛成"
              },
              {
                "name": "石田眞一郎",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "緑水会議員団",
            "counts": {
              "反対": 2,
              "賛成": 1
            },
            "members": [
              {
                "name": "佐藤晶二",
                "stance": "反対"
              },
              {
                "name": "吉武憲治",
                "stance": "賛成"
              },
              {
                "name": "森﨑巨樹",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "日本共産党久留米市議団",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "金子むつみ",
                "stance": "反対"
              },
              {
                "name": "小林ときこ",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "改革の会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "大熊博文",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本維新の会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "草場公晴",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年第2回市議会定例会（6月）における議案に対する賛否の状況",
          "localUrl": "/sources/kurume-shigikai-r8/R8.6sanpi.pdf",
          "originUrl": "https://www.city.kurume.fukuoka.jp/1100keikaku/2040shigikai/3030hongikai/4010giankekka/files/R8.6sanpi.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001182906/https://www.city.kurume.fukuoka.jp/1100keikaku/2040shigikai/3030hongikai/4010giankekka/files/R8.6sanpi.pdf"
        }
      }
    }
  ],
  "422011": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "長崎市議会",
      "seats": 39,
      "asOf": "2025-06-04",
      "asOfLabel": "2025年6月4日",
      "factions": [
        {
          "name": "市民クラブ",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "自民創生",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "新政ミライ",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "ながさき次世代の党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "明政クラブ",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第13号議案",
        "billName": "令和8年度長崎市一般会計予算",
        "sessionLabel": "令和8年第2回（2月）定例会",
        "decidedDate": "2026-03-12",
        "decidedDateLabel": "令和8年3月12日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 長崎市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（更新日 2025年6月4日）",
        "localUrl": "/sources/nagasaki-shigikai-r8/5681.html",
        "originUrl": "https://www.city.nagasaki.lg.jp/site/gikai/5681.html",
        "archiveUrl": "https://web.archive.org/web/20260612083032/https://www.city.nagasaki.lg.jp/site/gikai/5681.html"
      },
      "result": {
        "title": "令和8年第2回（2月）定例会議決結果一覧",
        "localUrl": "/sources/nagasaki-shigikai-r8/75929.html",
        "originUrl": "https://www.city.nagasaki.lg.jp/site/gikai/75929.html",
        "archiveUrl": "https://web.archive.org/web/20260413075255/https://www.city.nagasaki.lg.jp/site/gikai/75929.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "422029": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "佐世保市議会",
      "seats": 31,
      "asOf": "2025-12-03",
      "asOfLabel": "2025年12月3日",
      "factions": [
        {
          "name": "自民党市民会議",
          "seats": 15,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "市政会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "若者議員を増やす会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "葉風会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第１８号議案",
        "billName": "令和８年度佐世保市一般会計予算",
        "sessionLabel": "令和8年3月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 佐世保市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（更新日 2025年12月3日）",
        "localUrl": "/sources/sasebo-shigikai-r8/kaihalist.html",
        "originUrl": "https://www.city.sasebo.lg.jp/gikai/gikai/ginshokai/kaihalist.html",
        "archiveUrl": "https://web.archive.org/web/20260927033730/https://www.city.sasebo.lg.jp/gikai/gikai/ginshokai/kaihalist.html"
      },
      "result": {
        "title": "令和8年3月定例会 審議結果",
        "localUrl": "/sources/sasebo-shigikai-r8/r8nen3gatukagikekka.pdf",
        "originUrl": "https://www.city.sasebo.lg.jp/documents/13185/r8nen3gatukagikekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001183542/https://www.city.sasebo.lg.jp/documents/13185/r8nen3gatukagikekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "431001": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "熊本市議会",
      "seats": 47,
      "asOf": "2026-01-07",
      "asOfLabel": "2026年1月7日",
      "factions": [
        {
          "name": "自由民主党熊本市議団",
          "seats": 14,
          "isIndependent": false
        },
        {
          "name": "熊本自由民主党市議団",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党熊本市議団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "市民連合",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "市民の会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党熊本市議団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "新風熊本市議団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "創生熊本市議団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属（瀨尾誠一）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（山中惣一郎）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（筑紫るみ子）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議第３号",
        "billName": "令和８年度熊本市一般会計予算",
        "sessionLabel": "第１回定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 熊本市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "選出区別議員名簿（令和8年（2026年）1月7日現在）",
        "localUrl": "/sources/kumamoto-shigikai-r8/UploadFileDsp.aspx_c_id_53_id_125_set_doc_1.pdf",
        "originUrl": "https://web.archive.org/web/20260421205002id_/https://kumamoto-shigikai.jp/common/UploadFileDsp.aspx?c_id=53&id=125&set_doc=1",
        "archiveUrl": "https://web.archive.org/web/20260421205002id_/https://kumamoto-shigikai.jp/common/UploadFileDsp.aspx?c_id=53&id=125&set_doc=1"
      },
      "result": {
        "title": "令和8年第1回定例会 議案および審議結果（議第３号 賛否一覧）",
        "localUrl": "/sources/kumamoto-shigikai-r8/detail.aspx_c_id_4_coy_id_16_co_id_207_dis_id_3.html",
        "originUrl": "https://kumamoto-shigikai.jp/agenda/pub/detail.aspx?c_id=4&coy_id=16&co_id=207&dis_id=3",
        "archiveUrl": "https://web.archive.org/web/20261001194138/https://kumamoto-shigikai.jp/agenda/pub/detail.aspx?c_id=4&coy_id=16&co_id=207&dis_id=3"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "賛成": 41,
          "議長": 1,
          "反対": 5
        },
        "byFaction": [
          {
            "faction": "自由民主党熊本市議団",
            "counts": {
              "賛成": 13,
              "議長": 1
            },
            "members": [
              {
                "name": "村上麿",
                "stance": "賛成"
              },
              {
                "name": "村上誠也",
                "stance": "賛成"
              },
              {
                "name": "古川智子",
                "stance": "賛成"
              },
              {
                "name": "荒川慎太郎",
                "stance": "賛成"
              },
              {
                "name": "齊藤博",
                "stance": "賛成"
              },
              {
                "name": "田島幸治",
                "stance": "賛成"
              },
              {
                "name": "日隈忍",
                "stance": "賛成"
              },
              {
                "name": "小佐井賀瑞宜",
                "stance": "賛成"
              },
              {
                "name": "寺本義勝",
                "stance": "賛成"
              },
              {
                "name": "田中敦朗",
                "stance": "賛成"
              },
              {
                "name": "田中誠一",
                "stance": "賛成"
              },
              {
                "name": "坂田誠二",
                "stance": "賛成"
              },
              {
                "name": "落水清弘",
                "stance": "賛成"
              },
              {
                "name": "大石浩文",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "熊本自由民主党市議団",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "松本幸隆",
                "stance": "賛成"
              },
              {
                "name": "中川栄一郎",
                "stance": "賛成"
              },
              {
                "name": "山本浩之",
                "stance": "賛成"
              },
              {
                "name": "北川哉",
                "stance": "賛成"
              },
              {
                "name": "平江透",
                "stance": "賛成"
              },
              {
                "name": "大嶌澄雄",
                "stance": "賛成"
              },
              {
                "name": "澤田昌作",
                "stance": "賛成"
              },
              {
                "name": "満永寿博",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党熊本市議団",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "井本正広",
                "stance": "賛成"
              },
              {
                "name": "木庭功二",
                "stance": "賛成"
              },
              {
                "name": "吉田健一",
                "stance": "賛成"
              },
              {
                "name": "伊藤和仁",
                "stance": "賛成"
              },
              {
                "name": "高瀬千鶴子",
                "stance": "賛成"
              },
              {
                "name": "三森至加",
                "stance": "賛成"
              },
              {
                "name": "浜田大介",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民連合",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "島津哲也",
                "stance": "賛成"
              },
              {
                "name": "山内勝志",
                "stance": "賛成"
              },
              {
                "name": "西岡誠也",
                "stance": "賛成"
              },
              {
                "name": "田上辰也",
                "stance": "賛成"
              },
              {
                "name": "上田芳裕",
                "stance": "賛成"
              },
              {
                "name": "村上博",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民の会",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "菊地渚沙",
                "stance": "反対"
              },
              {
                "name": "井坂隆寛",
                "stance": "反対"
              },
              {
                "name": "吉村健治",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "日本共産党熊本市議団",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "井芹栄次",
                "stance": "反対"
              },
              {
                "name": "上野美恵子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "新風熊本市議団",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "紫垣正仁",
                "stance": "賛成"
              },
              {
                "name": "藤山英美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "創生熊本市議団",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "松川善範",
                "stance": "賛成"
              },
              {
                "name": "髙本一臣",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（瀨尾誠一）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "瀨尾誠一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（山中惣一郎）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "山中惣一郎",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（筑紫るみ子）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "筑紫るみ子",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年第1回定例会 議第３号 賛否一覧",
          "localUrl": "/sources/kumamoto-shigikai-r8/detail.aspx_c_id_4_coy_id_16_co_id_207_dis_id_3.html",
          "originUrl": "https://kumamoto-shigikai.jp/agenda/pub/detail.aspx?c_id=4&coy_id=16&co_id=207&dis_id=3",
          "archiveUrl": "https://web.archive.org/web/20261001194138/https://kumamoto-shigikai.jp/agenda/pub/detail.aspx?c_id=4&coy_id=16&co_id=207&dis_id=3"
        }
      }
    }
  ],
  "442011": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "大分市議会",
      "seats": 43,
      "asOf": "2026-03-26",
      "asOfLabel": "2026年3月26日",
      "factions": [
        {
          "name": "自由民主党",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "ネットワークみらい",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "新市民クラブ",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "地域政党おおいた。",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "Ｏｉｔａ市民クラブ",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属（高松大樹）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議第１号",
        "billName": "令和８年度大分市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決（多数）"
      },
      "sourceTitle": "令和8年度 大分市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "令和８年第１回定例会 議決結果賛否一覧表（会派・議員名〔議席番号順〕の列見出し）",
        "localUrl": "/sources/oita-shigikai-r8/giketukekka.pdf",
        "originUrl": "https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001191445/https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf"
      },
      "result": {
        "title": "令和８年第１回定例会 議決結果賛否一覧表",
        "localUrl": "/sources/oita-shigikai-r8/giketukekka.pdf",
        "originUrl": "https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001191445/https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "011002": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "札幌市議会",
      "seats": 67,
      "asOf": "2025-09-29",
      "asOfLabel": "2025年9月29日",
      "factions": [
        {
          "name": "札幌市議会自由民主党議員会",
          "seats": 25,
          "isIndependent": false
        },
        {
          "name": "札幌市議会民主市民連合議員会",
          "seats": 17,
          "isIndependent": false
        },
        {
          "name": "札幌市議会公明党議員会",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "日本共産党札幌市議会議員団",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "坂元倫孝・荒井勇雄",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "山口かずさ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "未来さっぽろ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "健康さっぽろ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "大地さっぽろ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "札幌市議会市民ネットワーク北海道",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第１号",
        "billName": "令和８年度札幌市一般会計予算",
        "sessionLabel": "令和８年第１回札幌市議会定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 札幌市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（更新日 2025年9月29日）",
        "localUrl": "/sources/sapporo-shigikai-r8/meibo-kaiha.html",
        "originUrl": "https://web.archive.org/web/20260117133407id_/https://www.city.sapporo.jp/gikai/meibo/meibo-kaiha.html",
        "archiveUrl": "https://web.archive.org/web/20260117133407id_/https://www.city.sapporo.jp/gikai/meibo/meibo-kaiha.html"
      },
      "result": {
        "title": "令和8年第1回札幌市議会定例会 議決事件等一覧表",
        "localUrl": "/sources/sapporo-shigikai-r8/08_kekka1t.pdf",
        "originUrl": "https://www.city.sapporo.jp/gikai/html/documents/08_kekka1t.pdf",
        "archiveUrl": "https://web.archive.org/web/20260614192541/https://www.city.sapporo.jp/gikai/html/documents/08_kekka1t.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "041009": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "仙台市議会",
      "seats": 55,
      "teisu": 55,
      "asOf": "2025-08-27",
      "asOfLabel": "2025年8月27日",
      "factions": [
        {
          "name": "自由民主党",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "公明党仙台市議団",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "市民フォーラム仙台",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "日本共産党仙台市議団",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "せんだい自民・参政の会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "立憲民主党仙台",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "仙台維新",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "維新の会仙台市議団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "心豊かな社会をつくる会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "市民の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "自由民主党フォーラム",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "第十四号議案",
        "billName": "令和八年度仙台市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-12",
        "decidedDateLabel": "令和8年3月12日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 仙台市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（令和7年8月27日現在）",
        "localUrl": "/sources/sendai-shigikai-r8/index.html",
        "originUrl": "https://web.archive.org/web/20260201093434id_/https://www.gikai.city.sendai.jp/list/parties/index.html",
        "archiveUrl": "https://web.archive.org/web/20260201093434id_/https://www.gikai.city.sendai.jp/list/parties/index.html"
      },
      "result": {
        "title": "仙台市議会会議録 令和8年第1回定例会（第7日目）本文",
        "localUrl": "/sources/sendai-shigikai-r8/5286956_Template_view_VoiceType_all_DocumentID_3681.html",
        "originUrl": "https://www.city.sendai.miyagi.dbsr.jp/index.php/5286956?Template=view&VoiceType=all&DocumentID=3681",
        "archiveUrl": "https://web.archive.org/web/20261001155601/https://www.city.sendai.miyagi.dbsr.jp/index.php/5286956?Template=view&VoiceType=all&DocumentID=3681"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "012041": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "旭川市議会",
      "seats": 34,
      "teisu": 34,
      "asOf": "2025-10-23",
      "asOfLabel": "2025年10月23日",
      "factions": [
        {
          "name": "自民党・市民会議",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "民主・市民連合",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "旭川市民連合",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "無所属（安田佳正）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（横山啓一）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第14号",
        "billName": "令和8年度旭川市一般会計予算について",
        "sessionLabel": "令和8年第1回定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 旭川市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派等別名簿（最終更新日 2025年10月23日）",
        "localUrl": "/sources/asahikawa-shigikai-r8/d066336.html",
        "originUrl": "https://web.archive.org/web/20260116223223id_/https://www.city.asahikawa.hokkaido.jp/council/6100/6120/d066336.html",
        "archiveUrl": "https://web.archive.org/web/20260116223223id_/https://www.city.asahikawa.hokkaido.jp/council/6100/6120/d066336.html"
      },
      "result": {
        "title": "令和8年第1回定例会議決結果",
        "localUrl": "/sources/asahikawa-shigikai-r8/d083645.html",
        "originUrl": "https://www.city.asahikawa.hokkaido.jp/council/6400/6410/d083645.html",
        "archiveUrl": "https://web.archive.org/web/20261001165542/https://www.city.asahikawa.hokkaido.jp/council/6400/6410/d083645.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 28,
          "欠席": 1,
          "議長": 1,
          "反対": 4
        },
        "byFaction": [
          {
            "faction": "自民党・市民会議",
            "counts": {
              "賛成": 11,
              "欠席": 1,
              "議長": 1
            },
            "members": [
              {
                "name": "いしかわまさき",
                "stance": "賛成"
              },
              {
                "name": "笠井まなみ",
                "stance": "賛成"
              },
              {
                "name": "あべなお",
                "stance": "賛成"
              },
              {
                "name": "たけいしよういち",
                "stance": "賛成"
              },
              {
                "name": "石川まさゆき",
                "stance": "賛成"
              },
              {
                "name": "沼﨑雅之",
                "stance": "賛成"
              },
              {
                "name": "えびな安信",
                "stance": "賛成"
              },
              {
                "name": "高橋ひでとし",
                "stance": "賛成"
              },
              {
                "name": "菅原範明",
                "stance": "賛成"
              },
              {
                "name": "佐藤さだお",
                "stance": "欠席"
              },
              {
                "name": "松田卓也",
                "stance": "賛成"
              },
              {
                "name": "福居秀雄",
                "stance": "議長"
              },
              {
                "name": "杉山允孝",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "民主・市民連合",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "江川あや",
                "stance": "賛成"
              },
              {
                "name": "上野和幸",
                "stance": "賛成"
              },
              {
                "name": "髙橋紀博",
                "stance": "賛成"
              },
              {
                "name": "品田ときえ",
                "stance": "賛成"
              },
              {
                "name": "高見一典",
                "stance": "賛成"
              },
              {
                "name": "金谷美奈子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 5
            },
            "members": [
              {
                "name": "駒木おさみ",
                "stance": "賛成"
              },
              {
                "name": "皆川ゆきたけ",
                "stance": "賛成"
              },
              {
                "name": "中野ひろゆき",
                "stance": "賛成"
              },
              {
                "name": "高花えいこ",
                "stance": "賛成"
              },
              {
                "name": "中村のりゆき",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党",
            "counts": {
              "反対": 4
            },
            "members": [
              {
                "name": "中村みなこ",
                "stance": "反対"
              },
              {
                "name": "まじま隆英",
                "stance": "反対"
              },
              {
                "name": "石川厚子",
                "stance": "反対"
              },
              {
                "name": "能登谷繁",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "旭川市民連合",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "植木だいすけ",
                "stance": "賛成"
              },
              {
                "name": "小林ゆうき",
                "stance": "賛成"
              },
              {
                "name": "塩尻英明",
                "stance": "賛成"
              },
              {
                "name": "高木ひろたか",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（安田佳正）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "安田佳正",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属（横山啓一）",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "横山啓一",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年第1回定例会賛否/議案第14号",
          "localUrl": "/sources/asahikawa-shigikai-r8/d083728.html",
          "originUrl": "https://www.city.asahikawa.hokkaido.jp/council/6400/6410/d083728.html",
          "archiveUrl": "https://web.archive.org/web/20261001165948/https://www.city.asahikawa.hokkaido.jp/council/6400/6410/d083728.html"
        }
      }
    }
  ],
  "022012": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "青森市議会",
      "seats": 32,
      "teisu": 32,
      "asOf": "2025-01-27",
      "asOfLabel": "2025年1月27日",
      "factions": [
        {
          "name": "自民クラブ",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "創青会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "立憲民主・社民",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属（山田千里）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（相馬純子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（中村美津緒）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（奈良岡隆）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第２号",
        "billName": "令和８年度青森市一般会計予算",
        "sessionLabel": "令和８年第１回定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 青森市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "議員名簿（会派別）（更新日 2025年1月27日）",
        "localUrl": "/sources/aomori-shigikai-r8/1007118.html",
        "originUrl": "https://web.archive.org/web/20251108061843id_/https://www.city.aomori.aomori.jp/gikai/gaiyou/1007116/1007118.html",
        "archiveUrl": "https://web.archive.org/web/20251108061843id_/https://www.city.aomori.aomori.jp/gikai/gaiyou/1007116/1007118.html"
      },
      "result": {
        "title": "令和８年第１回定例会 議案等審議結果一覧",
        "localUrl": "/sources/aomori-shigikai-r8/r08-t1-giketsu2.pdf",
        "originUrl": "https://www.city.aomori.aomori.jp/_res/projects/default_project/_page_/001/010/095/r08-t1-giketsu2.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001170252/https://www.city.aomori.aomori.jp/_res/projects/default_project/_page_/001/010/095/r08-t1-giketsu2.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "022039": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "八戸市議会",
      "seats": 28,
      "teisu": 28,
      "asOf": "2023-05-10",
      "asOfLabel": "2023年5月10日",
      "factions": [
        {
          "name": "自民クラブ",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "きずなクラブ",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "自由民主・無所属クラブ",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "新緑・無所属の会",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属（苫米地あつ子）",
          "seats": 1,
          "isIndependent": true
        },
        {
          "name": "無所属（前田由美）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第２号",
        "billName": "令和８年度八戸市一般会計予算",
        "sessionLabel": "令和８年３月定例会",
        "decidedDate": "2026-03-23",
        "decidedDateLabel": "令和8年3月23日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 八戸市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派一覧（更新日 2023年05月10日）",
        "localUrl": "/sources/hachinohe-shigikai-r8/9032.html",
        "originUrl": "https://web.archive.org/web/20260216175742id_/https://www.city.hachinohe.aomori.jp/gyoseijoho/hachinoheshigikai/giinnoshokai/9032.html",
        "archiveUrl": "https://web.archive.org/web/20260216175742id_/https://www.city.hachinohe.aomori.jp/gyoseijoho/hachinoheshigikai/giinnoshokai/9032.html"
      },
      "result": {
        "title": "令和8年3月定例会 議案審査結果表",
        "localUrl": "/sources/hachinohe-shigikai-r8/R0803_giannsinnsakekkahyou.pdf",
        "originUrl": "https://www.city.hachinohe.aomori.jp/material/files/group/80/R0803_giannsinnsakekkahyou.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001170443/https://www.city.hachinohe.aomori.jp/material/files/group/80/R0803_giannsinnsakekkahyou.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "062014": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "山形市議会",
      "seats": 33,
      "asOf": "2025-04-16",
      "asOfLabel": "2025年4月16日",
      "factions": [
        {
          "name": "新翔会",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "緑政会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "未来やまがた",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "山形市議会公明党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "令政会",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "会派に属さない議員",
          "seats": 4,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議第8号",
        "billName": "令和8年度山形市一般会計予算",
        "sessionLabel": "令和8年3月市議会定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案のとおり可決"
      },
      "sourceTitle": "令和8年度 山形市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派（更新日 令和7年4月16日）",
        "localUrl": "/sources/yamagata-shigikai-r8/1001203.html",
        "originUrl": "https://web.archive.org/web/20260315083000id_/https://www.city.yamagata-yamagata.lg.jp/gikai/giin/1001203.html",
        "archiveUrl": "https://web.archive.org/web/20260315083000id_/https://www.city.yamagata-yamagata.lg.jp/gikai/giin/1001203.html"
      },
      "result": {
        "title": "議決議案一覧（令和8年3月定例会）",
        "localUrl": "/sources/yamagata-shigikai-r8/1018030.html",
        "originUrl": "https://www.city.yamagata-yamagata.lg.jp/gikai/kaigikekka/1001699/1018028/1018030.html",
        "archiveUrl": "https://web.archive.org/web/20260521042741/https://www.city.yamagata-yamagata.lg.jp/gikai/kaigikekka/1001699/1018028/1018030.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "072010": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "福島市議会",
      "seats": 35,
      "asOf": "2026-03-27",
      "asOfLabel": "2026年3月27日",
      "factions": [
        {
          "name": "真政会",
          "seats": 12,
          "isIndependent": false
        },
        {
          "name": "真結の会",
          "seats": 10,
          "isIndependent": false
        },
        {
          "name": "市民21",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "無所属（三浦由美子）",
          "seats": 1,
          "isIndependent": true
        }
      ],
      "resolution": {
        "billNo": "議案第5号",
        "billName": "令和8年度福島市一般会計予算",
        "sessionLabel": "令和8年3月定例会議",
        "decidedDate": "2026-03-27",
        "decidedDateLabel": "令和8年3月27日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 福島市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "ふくしま市議会だより VOL.230 p.9 電子採決システムによる採決結果（令和8年3月定例会議）",
        "localUrl": "/sources/fukushima-shigikai-r8/vol230.pdf",
        "originUrl": "https://www.city.fukushima.fukushima.jp/material/files/group/72/vol230.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001183747/https://www.city.fukushima.fukushima.jp/material/files/group/72/vol230.pdf"
      },
      "result": {
        "title": "議案の審議結果-令和8年3月定例会議-",
        "localUrl": "/sources/fukushima-shigikai-r8/3751.html",
        "originUrl": "https://www.city.fukushima.fukushima.jp/gikai/gian/2/3751.html",
        "archiveUrl": "https://web.archive.org/web/20260521163141/https://www.city.fukushima.fukushima.jp/gikai/gian/2/3751.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "072036": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "郡山市議会",
      "seats": 38,
      "asOf": "2025-09-09",
      "asOfLabel": "2025年9月9日",
      "factions": [
        {
          "name": "志翔会",
          "seats": 11,
          "isIndependent": false
        },
        {
          "name": "新政会",
          "seats": 9,
          "isIndependent": false
        },
        {
          "name": "郡山市議会公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "緑風会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "自由民主党郡山市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党郡山市議団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "立憲民主党郡山",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "無所属の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "立憲民主党",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "れいわ新選組",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第39号",
        "billName": "令和８年度郡山市一般会計予算",
        "sessionLabel": "令和８年３月定例会",
        "decidedDate": "2026-03-19",
        "decidedDateLabel": "令和8年3月19日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 郡山市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別議員名簿（更新日 2025年9月9日）",
        "localUrl": "/sources/koriyama-shigikai-r8/2655.html",
        "originUrl": "https://web.archive.org/web/20260208073645id_/https://www.city.koriyama.lg.jp/site/gikai/2655.html",
        "archiveUrl": "https://web.archive.org/web/20260208073645id_/https://www.city.koriyama.lg.jp/site/gikai/2655.html"
      },
      "result": {
        "title": "令和８年３月定例会（３月19日）議決結果",
        "localUrl": "/sources/koriyama-shigikai-r8/118874.pdf",
        "originUrl": "https://www.city.koriyama.lg.jp/uploaded/attachment/118874.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001171046/https://www.city.koriyama.lg.jp/uploaded/attachment/118874.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "議長": 1,
          "賛成": 32,
          "欠席": 1,
          "反対": 4
        },
        "byFaction": [
          {
            "faction": "志翔会",
            "counts": {
              "議長": 1,
              "賛成": 10
            },
            "members": [
              {
                "name": "近内利男",
                "stance": "議長"
              },
              {
                "name": "本田豊栄",
                "stance": "賛成"
              },
              {
                "name": "大河原裕勝",
                "stance": "賛成"
              },
              {
                "name": "薄井長広",
                "stance": "賛成"
              },
              {
                "name": "伊藤典夫",
                "stance": "賛成"
              },
              {
                "name": "加藤漢太",
                "stance": "賛成"
              },
              {
                "name": "森合秀行",
                "stance": "賛成"
              },
              {
                "name": "塩田義智",
                "stance": "賛成"
              },
              {
                "name": "久野三男",
                "stance": "賛成"
              },
              {
                "name": "佐藤政喜",
                "stance": "賛成"
              },
              {
                "name": "大城宏之",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "新政会",
            "counts": {
              "賛成": 9
            },
            "members": [
              {
                "name": "冨樫賢太郎",
                "stance": "賛成"
              },
              {
                "name": "遠藤利子",
                "stance": "賛成"
              },
              {
                "name": "福田文子",
                "stance": "賛成"
              },
              {
                "name": "會田一男",
                "stance": "賛成"
              },
              {
                "name": "折笠正",
                "stance": "賛成"
              },
              {
                "name": "良田金次郎",
                "stance": "賛成"
              },
              {
                "name": "栗原晃",
                "stance": "賛成"
              },
              {
                "name": "廣田耕一",
                "stance": "賛成"
              },
              {
                "name": "石川義和",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "郡山市議会公明党",
            "counts": {
              "賛成": 3,
              "欠席": 1
            },
            "members": [
              {
                "name": "山根悟",
                "stance": "賛成"
              },
              {
                "name": "但野光夫",
                "stance": "賛成"
              },
              {
                "name": "田川正治",
                "stance": "欠席"
              },
              {
                "name": "小島寛子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "緑風会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "池田義人",
                "stance": "賛成"
              },
              {
                "name": "名木敬一",
                "stance": "賛成"
              },
              {
                "name": "大木進",
                "stance": "賛成"
              },
              {
                "name": "諸越裕",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "自由民主党郡山市議団",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "村上晃一",
                "stance": "賛成"
              },
              {
                "name": "三瓶宗盛",
                "stance": "賛成"
              },
              {
                "name": "佐藤栄作",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党郡山市議団",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "遠藤隆",
                "stance": "反対"
              },
              {
                "name": "岡田哲夫",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "立憲民主党郡山",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "飯塚裕一",
                "stance": "賛成"
              },
              {
                "name": "八重樫小代子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "無所属の会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "箭内好彦",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "立憲民主党",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "吉田公男",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "れいわ新選組",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "古山唯",
                "stance": "反対"
              }
            ]
          }
        ],
        "source": {
          "title": "議案等に対する各議員の賛否（令和８年３月定例会・３月19日議決分）",
          "localUrl": "/sources/koriyama-shigikai-r8/118823.pdf",
          "originUrl": "https://www.city.koriyama.lg.jp/uploaded/attachment/118823.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001183829/https://www.city.koriyama.lg.jp/uploaded/attachment/118823.pdf"
        }
      }
    }
  ],
  "072044": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "いわき市議会",
      "seats": 37,
      "teisu": 37,
      "asOf": "2025-11-25",
      "asOfLabel": "2025年11月25日",
      "factions": [
        {
          "name": "政風会",
          "seats": 13,
          "isIndependent": false
        },
        {
          "name": "創世会",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "真政会",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党いわき市議団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "フォーラムいわき",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "正論の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "誠心誠意の会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第35号",
        "billName": "令和８年度いわき市一般会計予算",
        "sessionLabel": "令和８年いわき市議会２月定例会",
        "decidedDate": "2026-03-12",
        "decidedDateLabel": "令和8年3月12日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 いわき市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派別名簿（各会派のページ・議決前の魚拓）",
        "localUrl": "/sources/iwaki-shigikai-r8/index.html",
        "originUrl": "https://web.archive.org/web/20260115044311id_/https://www.city.iwaki.lg.jp/www/contents/1722583989243/index.html",
        "archiveUrl": "https://web.archive.org/web/20260115044311id_/https://www.city.iwaki.lg.jp/www/contents/1722583989243/index.html"
      },
      "result": {
        "title": "令和８年いわき市議会２月定例会 議決結果一覧",
        "localUrl": "/sources/iwaki-shigikai-r8/R8.2giketsu.pdf",
        "originUrl": "https://www.city.iwaki.lg.jp/www/contents/1001000004942/simple/R8.2giketsu.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001183922/https://www.city.iwaki.lg.jp/www/contents/1001000004942/simple/R8.2giketsu.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "082201": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "つくば市議会",
      "seats": 28,
      "asOf": "2025-06-09",
      "asOfLabel": "2025年6月9日",
      "factions": [
        {
          "name": "つくばクラブ",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "Nextつくば",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "つくば・市民ネットワーク",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "公明党つくば",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "創生クラブ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "日本共産党つくば",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "つくばチェンジチャレンジ",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "新・つくば民主主義の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "ワニナルつくば",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "縁粋会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第101号",
        "billName": "令和8年度つくば市一般会計予算",
        "sessionLabel": "2月定例会議",
        "decidedDate": "2026-03-25",
        "decidedDateLabel": "令和8年3月25日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 つくば市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派名簿（更新日 2025年06月09日）",
        "localUrl": "/sources/tsukuba-shigikai-r8/1002610.html",
        "originUrl": "https://www.city.tsukuba.lg.jp/soshikikarasagasu/gikaikyokugikaisomuka/gyomuannai/1/3/1002610.html",
        "archiveUrl": "https://web.archive.org/web/20260422153444/https://www.city.tsukuba.lg.jp/soshikikarasagasu/gikaikyokugikaisomuka/gyomuannai/1/3/1002610.html"
      },
      "result": {
        "title": "つくば市議会だより第191号（令和8年5月20日発行）",
        "localUrl": "/sources/tsukuba-shigikai-r8/shigikaidayori_191.pdf",
        "originUrl": "https://www.city.tsukuba.lg.jp/material/files/group/172/shigikaidayori_191.pdf",
        "archiveUrl": "https://web.archive.org/web/20260520005247/https://www.city.tsukuba.lg.jp/material/files/group/172/shigikaidayori_191.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
    }
  ],
  "092011": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "宇都宮市議会",
      "seats": 45,
      "teisu": 45,
      "asOf": "2025-04-01",
      "asOfLabel": "2025年4月1日",
      "factions": [
        {
          "name": "自由民主党議員会",
          "seats": 19,
          "isIndependent": false
        },
        {
          "name": "市民連合",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "公明党議員会",
          "seats": 6,
          "isIndependent": false
        },
        {
          "name": "清風クラブ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本共産党宇都宮市議員団",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "うつのみや維新",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "未来への架け橋",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "緑の地球",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "参政党　政治参加を促す会",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第18号",
        "billName": "令和8年度宇都宮市一般会計予算",
        "sessionLabel": "令和8年3月（第1回）定例会",
        "decidedDate": "2026-03-24",
        "decidedDateLabel": "令和8年3月24日",
        "result": "原案可決"
      },
      "sourceTitle": "令和8年度 宇都宮市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派紹介（令和7年4月1日現在）",
        "localUrl": "/sources/utsunomiya-shigikai-r8/1008552.html",
        "originUrl": "https://web.archive.org/web/20260207034310id_/https://www.city.utsunomiya.lg.jp/gikai/giin/1008552.html",
        "archiveUrl": "https://web.archive.org/web/20260207034310id_/https://www.city.utsunomiya.lg.jp/gikai/giin/1008552.html"
      },
      "result": {
        "title": "令和8年3月（第1回）定例会 会議結果",
        "localUrl": "/sources/utsunomiya-shigikai-r8/1044488.html",
        "originUrl": "https://www.city.utsunomiya.lg.jp/gikai/kekka/kekka/1044487/1044488.html",
        "archiveUrl": "https://web.archive.org/web/20261001171521/https://www.city.utsunomiya.lg.jp/gikai/kekka/kekka/1044487/1044488.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 37,
          "議長": 1,
          "反対": 6,
          "欠席": 1
        },
        "byFaction": [
          {
            "faction": "自由民主党議員会",
            "counts": {
              "賛成": 18,
              "議長": 1
            },
            "members": [
              {
                "name": "若林芽育",
                "stance": "賛成"
              },
              {
                "name": "手塚泉",
                "stance": "賛成"
              },
              {
                "name": "岡本源二郎",
                "stance": "賛成"
              },
              {
                "name": "今野哲也",
                "stance": "賛成"
              },
              {
                "name": "菅原一浩",
                "stance": "賛成"
              },
              {
                "name": "長谷川武士",
                "stance": "賛成"
              },
              {
                "name": "矢古宇芳一",
                "stance": "賛成"
              },
              {
                "name": "柴田賢司",
                "stance": "賛成"
              },
              {
                "name": "内藤良弘",
                "stance": "賛成"
              },
              {
                "name": "黒子英明",
                "stance": "賛成"
              },
              {
                "name": "篠崎圭一",
                "stance": "賛成"
              },
              {
                "name": "山崎昌子",
                "stance": "賛成"
              },
              {
                "name": "馬上剛",
                "stance": "賛成"
              },
              {
                "name": "今井政範",
                "stance": "賛成"
              },
              {
                "name": "小林紀夫",
                "stance": "賛成"
              },
              {
                "name": "舟本肇",
                "stance": "賛成"
              },
              {
                "name": "岡本芳明",
                "stance": "賛成"
              },
              {
                "name": "熊本和夫",
                "stance": "賛成"
              },
              {
                "name": "塚田典功",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "市民連合",
            "counts": {
              "賛成": 8
            },
            "members": [
              {
                "name": "横須賀咲紀",
                "stance": "賛成"
              },
              {
                "name": "佐藤孝明",
                "stance": "賛成"
              },
              {
                "name": "大久保順也",
                "stance": "賛成"
              },
              {
                "name": "高橋英樹",
                "stance": "賛成"
              },
              {
                "name": "中塚英範",
                "stance": "賛成"
              },
              {
                "name": "福田智恵",
                "stance": "賛成"
              },
              {
                "name": "郷間康久",
                "stance": "賛成"
              },
              {
                "name": "駒場昭夫",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党議員会",
            "counts": {
              "賛成": 6
            },
            "members": [
              {
                "name": "小倉久美",
                "stance": "賛成"
              },
              {
                "name": "岩井潤子",
                "stance": "賛成"
              },
              {
                "name": "秋成大",
                "stance": "賛成"
              },
              {
                "name": "成島隆裕",
                "stance": "賛成"
              },
              {
                "name": "菅野大造",
                "stance": "賛成"
              },
              {
                "name": "金沢力",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "清風クラブ",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "平松明夫",
                "stance": "賛成"
              },
              {
                "name": "久保井永三",
                "stance": "賛成"
              },
              {
                "name": "渡辺道仁",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党宇都宮市議員団",
            "counts": {
              "反対": 3
            },
            "members": [
              {
                "name": "小室かな子",
                "stance": "反対"
              },
              {
                "name": "原ちづる",
                "stance": "反対"
              },
              {
                "name": "福田久美子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "うつのみや維新",
            "counts": {
              "賛成": 2,
              "欠席": 1
            },
            "members": [
              {
                "name": "石川京樹",
                "stance": "賛成"
              },
              {
                "name": "佐藤恭子",
                "stance": "欠席"
              },
              {
                "name": "茂木祐佳里",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "未来への架け橋",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "保坂栄次",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "緑の地球",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "出井昌子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "参政党　政治参加を促す会",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "河田敦史",
                "stance": "反対"
              }
            ]
          }
        ],
        "source": {
          "title": "定例会会議結果（3月24日現在）議員別賛否",
          "localUrl": "/sources/utsunomiya-shigikai-r8/sannpi0324.pdf",
          "originUrl": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/044/488/sannpi0324.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001171559/https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/044/488/sannpi0324.pdf"
        }
      }
    }
  ],
  "032018": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "盛岡市議会",
      "seats": 38,
      "asOf": "2025-09-02",
      "asOfLabel": "2025年9月2日",
      "factions": [
        {
          "name": "盛友会",
          "seats": 17,
          "isIndependent": false
        },
        {
          "name": "創盛会",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "日本共産党盛岡市議団",
          "seats": 5,
          "isIndependent": false
        },
        {
          "name": "市政クラブ",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "公明党",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "日本維新の会",
          "seats": 1,
          "isIndependent": false
        },
        {
          "name": "れいわ新選組",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "議案第3号",
        "billName": "令和8年度盛岡市一般会計予算",
        "sessionLabel": "令和8年3月定例会",
        "decidedDate": "2026-03-26",
        "decidedDateLabel": "令和8年3月26日",
        "result": "可決(多数)"
      },
      "sourceTitle": "令和8年度 盛岡市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "会派等別議員名簿（更新日 令和7年9月2日）",
        "localUrl": "/sources/morioka-shigikai-r8/1014492.html",
        "originUrl": "https://web.archive.org/web/20260414124240id_/https://www.city.morioka.iwate.jp/shisei/shigikai/giinshokai/1014492.html",
        "archiveUrl": "https://web.archive.org/web/20260414124240id_/https://www.city.morioka.iwate.jp/shisei/shigikai/giinshokai/1014492.html"
      },
      "result": {
        "title": "令和8年3月定例会 提出議案・議決結果",
        "localUrl": "/sources/morioka-shigikai-r8/1055511.html",
        "originUrl": "https://www.city.morioka.iwate.jp/shisei/shigikai/giketsukekka/1055507/1055511.html",
        "archiveUrl": "https://web.archive.org/web/20261001175647/https://www.city.morioka.iwate.jp/shisei/shigikai/giketsukekka/1055507/1055511.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "議長"
        ],
        "tally": {
          "議長": 1,
          "賛成": 31,
          "反対": 6
        },
        "byFaction": [
          {
            "faction": "盛友会",
            "counts": {
              "議長": 1,
              "賛成": 16
            },
            "members": [
              {
                "name": "櫻裕子",
                "stance": "議長"
              },
              {
                "name": "鈴木真吾",
                "stance": "賛成"
              },
              {
                "name": "山崎智樹",
                "stance": "賛成"
              },
              {
                "name": "千葉順子",
                "stance": "賛成"
              },
              {
                "name": "野田尚紀",
                "stance": "賛成"
              },
              {
                "name": "佐藤明彦",
                "stance": "賛成"
              },
              {
                "name": "小笠原秀夫",
                "stance": "賛成"
              },
              {
                "name": "田山俊悦",
                "stance": "賛成"
              },
              {
                "name": "浅沼克人",
                "stance": "賛成"
              },
              {
                "name": "千葉伸行",
                "stance": "賛成"
              },
              {
                "name": "工藤健一",
                "stance": "賛成"
              },
              {
                "name": "藤澤由蔵",
                "stance": "賛成"
              },
              {
                "name": "竹田浩久",
                "stance": "賛成"
              },
              {
                "name": "天沼久純",
                "stance": "賛成"
              },
              {
                "name": "菊田隆",
                "stance": "賛成"
              },
              {
                "name": "遠藤政幸",
                "stance": "賛成"
              },
              {
                "name": "村田芳三",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "創盛会",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "細川由香里",
                "stance": "賛成"
              },
              {
                "name": "後藤百合子",
                "stance": "賛成"
              },
              {
                "name": "兼平孝信",
                "stance": "賛成"
              },
              {
                "name": "寺長根浩",
                "stance": "賛成"
              },
              {
                "name": "大畑正二",
                "stance": "賛成"
              },
              {
                "name": "豊村徹也",
                "stance": "賛成"
              },
              {
                "name": "中村一",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党盛岡市議団",
            "counts": {
              "反対": 5
            },
            "members": [
              {
                "name": "庄子春治",
                "stance": "反対"
              },
              {
                "name": "三田村亜美子",
                "stance": "反対"
              },
              {
                "name": "鈴木努",
                "stance": "反対"
              },
              {
                "name": "高橋和夫",
                "stance": "反対"
              },
              {
                "name": "神部伸也",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "市政クラブ",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "中村雅幸",
                "stance": "賛成"
              },
              {
                "name": "野中靖志",
                "stance": "賛成"
              },
              {
                "name": "中村亨",
                "stance": "賛成"
              },
              {
                "name": "伊勢志穂",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党",
            "counts": {
              "賛成": 3
            },
            "members": [
              {
                "name": "太田隆司",
                "stance": "賛成"
              },
              {
                "name": "池野直友",
                "stance": "賛成"
              },
              {
                "name": "鈴木聖子",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本維新の会",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "佐藤尚弘",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "れいわ新選組",
            "counts": {
              "反対": 1
            },
            "members": [
              {
                "name": "縄手豊子",
                "stance": "反対"
              }
            ]
          }
        ],
        "source": {
          "title": "令和8年3月定例会 賛否一覧表",
          "localUrl": "/sources/morioka-shigikai-r8/R8.3sanpikekka.pdf",
          "originUrl": "https://www.city.morioka.iwate.jp/_res/projects/default_project/_page_/001/055/511/R8.3sanpikekka.pdf",
          "archiveUrl": "https://web.archive.org/web/20261002115358/https://www.city.morioka.iwate.jp/_res/projects/default_project/_page_/001/055/511/R8.3sanpikekka.pdf"
        }
      }
    }
  ],
  "052019": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "body": "秋田市議会",
      "seats": 36,
      "asOf": "2025-06-05",
      "asOfLabel": "2025年6月5日",
      "factions": [
        {
          "name": "秋水会",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "自民党",
          "seats": 8,
          "isIndependent": false
        },
        {
          "name": "フロンティア秋田",
          "seats": 7,
          "isIndependent": false
        },
        {
          "name": "公明党秋田市議会",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "そうせいと維新",
          "seats": 4,
          "isIndependent": false
        },
        {
          "name": "日本共産党秋田市議会議員団",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "市民クラブ",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "市民のみかた",
          "seats": 1,
          "isIndependent": false
        }
      ],
      "resolution": {
        "billNo": "2",
        "billName": "令和８年度秋田市一般会計予算の件",
        "sessionLabel": "令和８年２月定例会",
        "decidedDate": "2026-03-17",
        "decidedDateLabel": "令和8年3月17日",
        "result": "可決"
      },
      "sourceTitle": "令和8年度 秋田市議会の構成（会派別議席数）と当初予算の議決",
      "roster": {
        "title": "市議会議員名簿（会派別）（令和7年6月5日現在）",
        "localUrl": "/sources/akita-shigikai-r8/1001185.html",
        "originUrl": "https://web.archive.org/web/20251108061321id_/https://www.city.akita.lg.jp/shigikai/giin/1001185.html",
        "archiveUrl": "https://web.archive.org/web/20251108061321id_/https://www.city.akita.lg.jp/shigikai/giin/1001185.html"
      },
      "result": {
        "title": "議案等に対する議員の表決状況（令和８年２月定例会・令和８年３月１７日）",
        "localUrl": "/sources/akita-shigikai-r8/r080317sanpi.pdf",
        "originUrl": "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/049/806/r080317sanpi.pdf",
        "archiveUrl": "https://web.archive.org/web/20261001180352/https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/049/806/r080317sanpi.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null,
      "votes": {
        "basis": "member",
        "stances": [
          "賛成",
          "反対",
          "欠席",
          "議長"
        ],
        "tally": {
          "賛成": 32,
          "議長": 1,
          "欠席": 1,
          "反対": 2
        },
        "byFaction": [
          {
            "faction": "秋水会",
            "counts": {
              "賛成": 7,
              "議長": 1
            },
            "members": [
              {
                "name": "荻原貴幸",
                "stance": "賛成"
              },
              {
                "name": "細川信二",
                "stance": "賛成"
              },
              {
                "name": "見上万里子",
                "stance": "賛成"
              },
              {
                "name": "佐藤宏悦",
                "stance": "賛成"
              },
              {
                "name": "伊藤一榮",
                "stance": "賛成"
              },
              {
                "name": "渡辺正宏",
                "stance": "賛成"
              },
              {
                "name": "小木田喜美雄",
                "stance": "賛成"
              },
              {
                "name": "川口雅丈",
                "stance": "議長"
              }
            ]
          },
          {
            "faction": "自民党",
            "counts": {
              "賛成": 7,
              "欠席": 1
            },
            "members": [
              {
                "name": "飯牟礼克年",
                "stance": "賛成"
              },
              {
                "name": "工藤潤平",
                "stance": "賛成"
              },
              {
                "name": "工藤知彦",
                "stance": "賛成"
              },
              {
                "name": "安井正浩",
                "stance": "賛成"
              },
              {
                "name": "伊藤巧一",
                "stance": "賛成"
              },
              {
                "name": "熊谷重隆",
                "stance": "欠席"
              },
              {
                "name": "菅原琢哉",
                "stance": "賛成"
              },
              {
                "name": "小野寺誠",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "フロンティア秋田",
            "counts": {
              "賛成": 7
            },
            "members": [
              {
                "name": "後藤良",
                "stance": "賛成"
              },
              {
                "name": "船木純",
                "stance": "賛成"
              },
              {
                "name": "藤田信",
                "stance": "賛成"
              },
              {
                "name": "藤枝隆博",
                "stance": "賛成"
              },
              {
                "name": "工藤新一",
                "stance": "賛成"
              },
              {
                "name": "倉田芳浩",
                "stance": "賛成"
              },
              {
                "name": "小林一夫",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "公明党秋田市議会",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "佐藤佳人",
                "stance": "賛成"
              },
              {
                "name": "牧野守",
                "stance": "賛成"
              },
              {
                "name": "武田正子",
                "stance": "賛成"
              },
              {
                "name": "石塚秀博",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "そうせいと維新",
            "counts": {
              "賛成": 4
            },
            "members": [
              {
                "name": "藤井翼",
                "stance": "賛成"
              },
              {
                "name": "菊地格夫",
                "stance": "賛成"
              },
              {
                "name": "若松尚利",
                "stance": "賛成"
              },
              {
                "name": "小松健",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "日本共産党秋田市議会議員団",
            "counts": {
              "反対": 2
            },
            "members": [
              {
                "name": "奈良順子",
                "stance": "反対"
              },
              {
                "name": "佐藤純子",
                "stance": "反対"
              }
            ]
          },
          {
            "faction": "市民クラブ",
            "counts": {
              "賛成": 2
            },
            "members": [
              {
                "name": "安井誠悦",
                "stance": "賛成"
              },
              {
                "name": "花田清美",
                "stance": "賛成"
              }
            ]
          },
          {
            "faction": "市民のみかた",
            "counts": {
              "賛成": 1
            },
            "members": [
              {
                "name": "佐藤哲治",
                "stance": "賛成"
              }
            ]
          }
        ],
        "source": {
          "title": "議案等に対する議員の表決状況（令和８年２月定例会・令和８年３月１７日）",
          "localUrl": "/sources/akita-shigikai-r8/r080317sanpi.pdf",
          "originUrl": "https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/049/806/r080317sanpi.pdf",
          "archiveUrl": "https://web.archive.org/web/20261001180352/https://www.city.akita.lg.jp/_res/projects/default_project/_page_/001/049/806/r080317sanpi.pdf"
        }
      }
    }
  ]
};
