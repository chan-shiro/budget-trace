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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
        "archiveUrl": "https://www.city.kashiwa.lg.jp/documents/45575/gikaidayori253goup2.pdf"
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
        "archiveUrl": "https://www.city.hachioji.tokyo.jp/contents/shigikai_1/giin/kakushu/p010679_d/fil/R7-6-9.pdf"
      },
      "result": {
        "title": "令和8年(2026年)第1回市議会定例会 議案の一覧",
        "localUrl": "/sources/hachioji-shigikai-r8/p037014.html",
        "originUrl": "https://www.city.hachioji.tokyo.jp/contents/shigikai_1/gikainokatudou/honnkaigi/reiwa8/p037014.html",
        "archiveUrl": "https://web.archive.org/web/20260420122418/https://www.city.hachioji.tokyo.jp/contents/shigikai_1/gikainokatudou/honnkaigi/reiwa8/p037014.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
        "archiveUrl": "https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/007/118/sanpi-r0803-2.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
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
        "archiveUrl": "https://www.city.fukui.lg.jp/sisei/gikai/shingigian/p004023_d/fil/R803t.pdf"
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
        "archiveUrl": "https://www.city.nagano.nagano.jp/n440500/contents/p005627.html"
      },
      "minutesUrl": null,
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
        "archiveUrl": "https://www.city.nara.lg.jp/uploaded/attachment/208608.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
        "archiveUrl": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/023/399/0318giannitiran.pdf"
      },
      "minutesUrl": null,
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
        "archiveUrl": "https://web.archive.org/web/20261001163846/https://kumamoto-shigikai.jp/agenda/pub/detail.aspx?c_id=4&coy_id=16&co_id=207&dis_id=3"
      },
      "minutesUrl": null,
      "newsletterUrl": null
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
        "archiveUrl": "https://web.archive.org/web/20251012180017/https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf"
      },
      "result": {
        "title": "令和８年第１回定例会 議決結果賛否一覧表",
        "localUrl": "/sources/oita-shigikai-r8/giketukekka.pdf",
        "originUrl": "https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf",
        "archiveUrl": "https://web.archive.org/web/20251012180017/https://www.city.oita.oita.jp/o186/shigikai/kaiginokekka/documents/giketukekka.pdf"
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
      "newsletterUrl": null
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
        "result": "可決"
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
        "archiveUrl": "https://www.city.fukushima.fukushima.jp/material/files/group/72/vol230.pdf"
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
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
      "newsletterUrl": null
    }
  ]
};
