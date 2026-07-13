// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 全国 決算シャード（public/decision/<県コード>.json）の索引・出典メタ。
// 出典: 総務省「市町村別決算状況調」R2〜R6（普通会計決算）

export interface DecisionEvidenceCard {
  title: string;
  type: string;
  /** 一次資料へのリンク（Wayback コピー優先） */
  url: string;
  /** 自サーバー配信の原本コピー */
  localUrl: string;
  source: string;
  thumb: string;
}

/** 都道府県名 → 県コード（2桁）。決算シャードのファイル名になる */
export const PREF_CODES: Record<string, string> = {
  "北海道": "01",
  "青森県": "02",
  "岩手県": "03",
  "宮城県": "04",
  "秋田県": "05",
  "山形県": "06",
  "福島県": "07",
  "茨城県": "08",
  "栃木県": "09",
  "群馬県": "10",
  "埼玉県": "11",
  "千葉県": "12",
  "東京都": "13",
  "神奈川県": "14",
  "新潟県": "15",
  "富山県": "16",
  "石川県": "17",
  "福井県": "18",
  "山梨県": "19",
  "長野県": "20",
  "岐阜県": "21",
  "静岡県": "22",
  "愛知県": "23",
  "三重県": "24",
  "滋賀県": "25",
  "京都府": "26",
  "大阪府": "27",
  "兵庫県": "28",
  "奈良県": "29",
  "和歌山県": "30",
  "鳥取県": "31",
  "島根県": "32",
  "岡山県": "33",
  "広島県": "34",
  "山口県": "35",
  "徳島県": "36",
  "香川県": "37",
  "愛媛県": "38",
  "高知県": "39",
  "福岡県": "40",
  "佐賀県": "41",
  "長崎県": "42",
  "熊本県": "43",
  "大分県": "44",
  "宮崎県": "45",
  "鹿児島県": "46",
  "沖縄県": "47"
};

/** 決算の収録年度（新しい順） */
export const DECISION_YEARS = ["R6","R5","R4","R3","R2"] as const;

/** 年度 → 表示ラベル */
export const DECISION_FY_LABELS: Record<string, string> = {
  "R6": "令和6年度 決算",
  "R5": "令和5年度 決算",
  "R4": "令和4年度 決算",
  "R3": "令和3年度 決算",
  "R2": "令和2年度 決算"
};

/** full 階層（予算ベースの詳細画面を持つ）自治体の団体コード */
export const FULL_MUNIS: string[] = ["192015"];

/** fy → 出典 Excel（都市別/町村別の3ファイルずつ）。エビデンスドロワー用 */
export const DECISION_SOURCES: Record<string, { city: DecisionEvidenceCard[]; town: DecisionEvidenceCard[] }> = {
  "R6": {
    "city": [
      {
        "title": "令和6年度 市町村別決算状況調 都市別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712083739/https://www.soumu.go.jp/main_content/001061669.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061669.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "001061669.xlsx ・ sha256 700fc73e7547cc7b… ・ 2026-07-11 取得"
      },
      {
        "title": "令和6年度 市町村別決算状況調 都市別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712083826/https://www.soumu.go.jp/main_content/001061670.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061670.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "001061670.xlsx ・ sha256 0353d207daec494d… ・ 2026-07-11 取得"
      },
      {
        "title": "令和6年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712083915/https://www.soumu.go.jp/main_content/001061671.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061671.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "001061671.xlsx ・ sha256 a5928ea0f8134d93… ・ 2026-07-11 取得"
      }
    ],
    "town": [
      {
        "title": "令和6年度 市町村別決算状況調 町村別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712084033/https://www.soumu.go.jp/main_content/001061674.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061674.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "001061674.xlsx ・ sha256 dbd2306e0814524e… ・ 2026-07-11 取得"
      },
      {
        "title": "令和6年度 市町村別決算状況調 町村別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712084200/https://www.soumu.go.jp/main_content/001061675.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061675.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "001061675.xlsx ・ sha256 d39dc896172d94c8… ・ 2026-07-11 取得"
      },
      {
        "title": "令和6年度 市町村別決算状況調 町村別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712084335/https://www.soumu.go.jp/main_content/001061676.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061676.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "001061676.xlsx ・ sha256 b1ecb4af94638244… ・ 2026-07-11 取得"
      }
    ]
  },
  "R5": {
    "city": [
      {
        "title": "令和5年度 市町村別決算状況調 都市別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712084605/https://www.soumu.go.jp/main_content/000999900.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999900.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000999900.xlsx ・ sha256 fa95397dba35425c… ・ 2026-07-12 取得"
      },
      {
        "title": "令和5年度 市町村別決算状況調 都市別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712084726/https://www.soumu.go.jp/main_content/000999901.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999901.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000999901.xlsx ・ sha256 4f959c19fe8490d6… ・ 2026-07-12 取得"
      },
      {
        "title": "令和5年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712084838/https://www.soumu.go.jp/main_content/000999902.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999902.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000999902.xlsx ・ sha256 4961e05a6f8436da… ・ 2026-07-12 取得"
      }
    ],
    "town": [
      {
        "title": "令和5年度 市町村別決算状況調 町村別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712085011/https://www.soumu.go.jp/main_content/000999905.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999905.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000999905.xlsx ・ sha256 e59baacdc93b14c5… ・ 2026-07-12 取得"
      },
      {
        "title": "令和5年度 市町村別決算状況調 町村別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712085102/https://www.soumu.go.jp/main_content/000999906.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999906.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000999906.xlsx ・ sha256 72ba069f50d97b31… ・ 2026-07-12 取得"
      },
      {
        "title": "令和5年度 市町村別決算状況調 町村別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20260712090256/https://www.soumu.go.jp/main_content/000999908.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999908.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000999908.xlsx ・ sha256 f3dfe992968fb158… ・ 2026-07-12 取得"
      }
    ]
  },
  "R4": {
    "city": [
      {
        "title": "令和4年度 市町村別決算状況調 都市別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20240522135002/https://www.soumu.go.jp/main_content/000937287.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937287.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000937287.xlsx ・ sha256 ef99b54fe09564e0… ・ 2026-07-12 取得"
      },
      {
        "title": "令和4年度 市町村別決算状況調 都市別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20240522133324/https://www.soumu.go.jp/main_content/000937288.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937288.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000937288.xlsx ・ sha256 46872f188fe4bff6… ・ 2026-07-12 取得"
      },
      {
        "title": "令和4年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20240522174029/https://www.soumu.go.jp/main_content/000937289.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937289.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000937289.xlsx ・ sha256 1258b17653882dae… ・ 2026-07-12 取得"
      }
    ],
    "town": [
      {
        "title": "令和4年度 市町村別決算状況調 町村別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20240522204319/https://www.soumu.go.jp/main_content/000937292.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937292.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000937292.xlsx ・ sha256 35efd29b58ef8d56… ・ 2026-07-12 取得"
      },
      {
        "title": "令和4年度 市町村別決算状況調 町村別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20240522181639/https://www.soumu.go.jp/main_content/000937293.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937293.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000937293.xlsx ・ sha256 72786ac738c41bbe… ・ 2026-07-12 取得"
      },
      {
        "title": "令和4年度 市町村別決算状況調 町村別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20240522173752/https://www.soumu.go.jp/main_content/000937294.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937294.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000937294.xlsx ・ sha256 0e27938eead1becc… ・ 2026-07-12 取得"
      }
    ]
  },
  "R3": {
    "city": [
      {
        "title": "令和3年度 市町村別決算状況調 都市別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20230329151625/https://www.soumu.go.jp/main_content/000871018.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871018.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000871018.xlsx ・ sha256 bb03a28b1aac6633… ・ 2026-07-12 取得"
      },
      {
        "title": "令和3年度 市町村別決算状況調 都市別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20230329152442/https://www.soumu.go.jp/main_content/000871019.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871019.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000871019.xlsx ・ sha256 66869a6fd61be8bd… ・ 2026-07-12 取得"
      },
      {
        "title": "令和3年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20230329161010/https://www.soumu.go.jp/main_content/000871020.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871020.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000871020.xlsx ・ sha256 75fb9b341570ec89… ・ 2026-07-12 取得"
      }
    ],
    "town": [
      {
        "title": "令和3年度 市町村別決算状況調 町村別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20230329161611/https://www.soumu.go.jp/main_content/000871023.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871023.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000871023.xlsx ・ sha256 8cc35c1e946769e0… ・ 2026-07-12 取得"
      },
      {
        "title": "令和3年度 市町村別決算状況調 町村別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20230329151102/https://www.soumu.go.jp/main_content/000871024.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871024.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000871024.xlsx ・ sha256 580e45fb7e938621… ・ 2026-07-12 取得"
      },
      {
        "title": "令和3年度 市町村別決算状況調 町村別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20230329160253/https://www.soumu.go.jp/main_content/000871025.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871025.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000871025.xlsx ・ sha256 18246ccfb29afc45… ・ 2026-07-12 取得"
      }
    ]
  },
  "R2": {
    "city": [
      {
        "title": "令和2年度 市町村別決算状況調 都市別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20220401110434/https://www.soumu.go.jp/main_content/000800819.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800819.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000800819.xlsx ・ sha256 b2a9dc2dc3f4995d… ・ 2026-07-12 取得"
      },
      {
        "title": "令和2年度 市町村別決算状況調 都市別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20220401110512/https://www.soumu.go.jp/main_content/000800820.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800820.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000800820.xlsx ・ sha256 17151f110da218b8… ・ 2026-07-12 取得"
      },
      {
        "title": "令和2年度 市町村別決算状況調 都市別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20220401110433/https://www.soumu.go.jp/main_content/000800822.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800822.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000800822.xlsx ・ sha256 711f1c576b9b7a4b… ・ 2026-07-12 取得"
      }
    ],
    "town": [
      {
        "title": "令和2年度 市町村別決算状況調 町村別（1）概況",
        "type": "Excel",
        "url": "https://web.archive.org/web/20220401110436/https://www.soumu.go.jp/main_content/000800826.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800826.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000800826.xlsx ・ sha256 426064dae1358c3f… ・ 2026-07-12 取得"
      },
      {
        "title": "令和2年度 市町村別決算状況調 町村別（2）歳入内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20220401110456/https://www.soumu.go.jp/main_content/000800828.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800828.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000800828.xlsx ・ sha256 7efe3fff556d71a7… ・ 2026-07-12 取得"
      },
      {
        "title": "令和2年度 市町村別決算状況調 町村別（3）目的別歳出内訳",
        "type": "Excel",
        "url": "https://web.archive.org/web/20220401110554/https://www.soumu.go.jp/main_content/000800830.xlsx",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800830.xlsx",
        "source": "www.soumu.go.jp",
        "thumb": "000800830.xlsx ・ sha256 fd4fcf11c7eb7ff1… ・ 2026-07-12 取得"
      }
    ]
  }
};
