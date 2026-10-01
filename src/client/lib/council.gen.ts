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
        },
        {
          "name": "無会派",
          "seats": 3,
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
          "name": "自由民主党岡山市議会",
          "seats": 23,
          "isIndependent": false
        },
        {
          "name": "懐かしい未来",
          "seats": 2,
          "isIndependent": false
        },
        {
          "name": "みらいえ",
          "seats": 3,
          "isIndependent": false
        },
        {
          "name": "おかやま創政会",
          "seats": 4,
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
  ]
};
