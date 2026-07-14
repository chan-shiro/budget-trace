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
export interface KofuCouncil {
  /** 予算年度（この議会が議決した当初予算の年度。"R8" など） */
  fy: string;
  fyLabel: string;
  /** 議会名 */
  body: string;
  /** 定数（＝現員＝会派議席合計） */
  seats: number;
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
  minutesUrl: string;
  newsletterUrl: string;
}

/** 甲府市議会の構成（予算議決時）。新しい年度順（R8→R2）。 */
export const KOFU_COUNCIL_YEARS: KofuCouncil[] = [
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
      "archiveUrl": "https://web.archive.org/web/20260215161610/https://www.city.kofu.yamanashi.jp/gijichosa/r0403/shingikekka.html"
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
export const KOFU_COUNCIL: KofuCouncil = KOFU_COUNCIL_YEARS[0]!;
