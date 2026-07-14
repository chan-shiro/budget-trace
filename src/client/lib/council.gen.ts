// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市議会 所属会派別議員名簿（2025年5月1日現在）＋令和8年3月定例会 審議結果。
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
  /** 議会名 */
  body: string;
  /** 定数（＝現員＝会派議席合計） */
  seats: number;
  /** 会派構成の基準日 ISO */
  asOf: string;
  asOfLabel: string;
  /** 議決対象の予算 */
  fyLabel: string;
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

/** 甲府市議会の構成（予算議決時） */
export const KOFU_COUNCIL: KofuCouncil = {
  "body": "甲府市議会",
  "seats": 32,
  "asOf": "2025-05-01",
  "asOfLabel": "2025年5月1日",
  "fyLabel": "令和8年度 当初予算",
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
    "archiveUrl": "https://web.archive.org/web/20240910021519/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html"
  },
  "result": {
    "title": "令和8年3月定例会 審議結果",
    "localUrl": "/sources/kofu-gikai-r8/shingikekka.html",
    "originUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/r0803/shingikekka.html",
    "archiveUrl": "https://web.archive.org/web/20260521083518/https://www.city.kofu.yamanashi.jp/gijichosa/r0803/shingikekka.html"
  },
  "minutesUrl": "https://www.city.kofu.yamanashi.dbsr.jp/",
  "newsletterUrl": "https://www.city.kofu.yamanashi.jp/gijichosa/shise/gikai/koho/r08.html"
};
