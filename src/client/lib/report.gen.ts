// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 事務事業評価 詳細票（第2号様式）。公表は各年サンプル数件のみ。
// 全事業分の詳細票は情報公開請求（未収録＝リクエスト）。

export interface ReportCostYear {
  fy: string;
  kind: "決算" | "当初" | "計画";
  jigyohi: number | null;
  ippanZaigen: number | null;
  totalCost: number | null;
}
export interface ReportIndicator {
  category: "活動指標" | "成果指標";
  name: string;
  /** 目標値（年度順・最大5）。定性指標は null */
  targets: (number | null)[];
  /** 実績値（決算年度分） */
  actuals: (number | null)[];
}
export interface KofuReport {
  no: string;
  /** 事務事業名 */
  name: string;
  /** 担当（部室課） */
  buka: string;
  kubun: string | null;
  /** 事業実施結果（実施内容） */
  implementation: string | null;
  /** 総合評価（A〜F） */
  grade: string;
  /** 評価点（24点満点） */
  score: number | null;
  cost: ReportCostYear[];
  indicators: ReportIndicator[];
  /** 来歴（原資料内の位置） */
  ref: string;
}
export interface KofuReportYear {
  /** 評価年度 */
  fy: string;
  fyLabel: string;
  /** 対象（実績）年度 */
  targetFy: string;
  targetFyLabel: string;
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先） */
  sourceUrl: string;
  originUrl: string;
  /** 自サーバー配信コピー（Excel はダウンロードカード） */
  sourceLocalUrl: string;
  reports: KofuReport[];
}

/** 事業報告（成果）＝事務事業評価 詳細票（新しい年度順） */
export const KOFU_REPORT_YEARS: KofuReportYear[] = [
  {
    "fy": "R7",
    "fyLabel": "令和7年度",
    "targetFy": "R6",
    "targetFyLabel": "令和6年度",
    "sourceTitle": "令和7年度 甲府市 事務事業評価 詳細票（事業報告・成果）",
    "sourceUrl": "https://web.archive.org/web/20260712142225/https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
    "sourceLocalUrl": "/sources/kofu-jigyou-houkoku-r7/7kouhyouyou2.xlsx",
    "reports": [
      {
        "no": "136",
        "name": "職員研修事業",
        "buka": "総務部人事管理室人材マネジメント課",
        "kubun": "主要",
        "implementation": "職員ニーズに対応した効果的な研修により、自己啓発意欲を高め自律型人材の育成を図るとともに、職員自らが研修を提案する「提案参加型方式」を推進するほか、新たに「部局提案型視察研修」を取り入れるなど、学習風土の醸成に努めた。職位や成長ステージに求められる役割の認識と能力を継続的かつ段階的に修得するため階層別研修のほか、基本研修では「キャリアデザイン研修」を新設するとともに、職員の自己啓発意識を喚起するため各種支援要綱の周知を図った。さらには基本的な能力形成の場であるＯＪＴ（職場研修）の習慣的な実施への意識付けを行うことで、「学ぶ職場風土」づくりに努めた。",
        "grade": "A",
        "score": 22,
        "cost": [
          {
            "fy": "R4",
            "kind": "決算",
            "jigyohi": 9970,
            "ippanZaigen": 9688,
            "totalCost": 23880
          },
          {
            "fy": "R5",
            "kind": "決算",
            "jigyohi": 12538,
            "ippanZaigen": 12237,
            "totalCost": 26526
          },
          {
            "fy": "R6",
            "kind": "決算",
            "jigyohi": 12638,
            "ippanZaigen": 12255,
            "totalCost": 26964
          },
          {
            "fy": "R7",
            "kind": "当初",
            "jigyohi": 16493,
            "ippanZaigen": 16107,
            "totalCost": 31719
          },
          {
            "fy": "R8",
            "kind": "計画",
            "jigyohi": 21117,
            "ippanZaigen": 20711,
            "totalCost": 36343
          }
        ],
        "indicators": [
          {
            "category": "活動指標",
            "name": "一般・特別研修の実施回数（回）",
            "targets": [
              120,
              120,
              120,
              120,
              120
            ],
            "actuals": [
              73,
              89,
              101,
              null,
              null
            ]
          },
          {
            "category": "活動指標",
            "name": "上記指標のうち、提案参加型方式による研修の実施回数（回）",
            "targets": [
              30,
              30,
              30,
              30,
              30
            ],
            "actuals": [
              8,
              8,
              5,
              null,
              null
            ]
          },
          {
            "category": "成果指標",
            "name": "提案参加型方式による研修受講者の業務改善等の新たな取組の実践率（％）",
            "targets": [
              40,
              45,
              45,
              45,
              45
            ],
            "actuals": [
              86,
              59,
              72,
              null,
              null
            ]
          }
        ],
        "ref": "7kouhyouyou2.xlsx#136"
      },
      {
        "no": "138",
        "name": "ふるさと応援寄附金推進事業事務",
        "buka": "産業部産業総室ふるさと納税課",
        "kubun": "主要",
        "implementation": "ふるさと納税の認知度が高まり、全国の自治体が貴重な自主財源の確保としてふるさと納税に係る取組に力を注ぐ中、本市ふるさと納税においてもふるさと納税制度本来の趣旨を踏まえ、更なる財源確保をするべく様々な取組を行ってきた。これまで同様に本市が誇る地場産品であるジュエリーやシャインマスカットなどを主要返礼品とし、寄附者ニーズに合った魅力のある返礼品の充実に努めた。さらに、ポータルサイトにおけるサイト内広告やメールマガジンを強化し本市返礼品の魅力を広く発信したことに加え、株式会社マイナビのメディアを活用した情報発信をはじめ、「東京ガールズコレクション」でのステージ展開や「宝石のまち甲府 ジュエリー甲子園」を初開催するなどのプロモーション事業により「甲府ジュエリー」が確固たる地位を築くことができ寄附増額に繋がった。また、主要返礼品に次ぐ返礼品の強化にも取り組んだ結果、スイーツやトイレットペーパーなどが多くの寄附者に選ばれ更なる寄附増額が図られた。一方で、寄附者に対し再び本市へ興味をもってリピーターになっていただけるよう「寄附の使い道報告書」やジュエリーを返礼品として選んでいただいた方へ「ジュエリーカタログ」を送付するなど、リピーターを確保する取組を行った。こうした結果、令和5年度の寄附件数149,122件、寄附金額4,121,037千円に比べ、令和6年度は寄附件数約1.34倍となる199,679件、寄附金額は1.80倍となる7,415,964千円となった。",
        "grade": "A",
        "score": 24,
        "cost": [
          {
            "fy": "R4",
            "kind": "決算",
            "jigyohi": 1495382,
            "ippanZaigen": 1495382,
            "totalCost": 1516247
          },
          {
            "fy": "R5",
            "kind": "決算",
            "jigyohi": 2105298,
            "ippanZaigen": 2105298,
            "totalCost": 2133274
          },
          {
            "fy": "R6",
            "kind": "決算",
            "jigyohi": 3743398,
            "ippanZaigen": 3680205,
            "totalCost": 3779213
          },
          {
            "fy": "R7",
            "kind": "当初",
            "jigyohi": 2368499,
            "ippanZaigen": 2255619,
            "totalCost": 2406564
          },
          {
            "fy": "R8",
            "kind": "計画",
            "jigyohi": 2390046,
            "ippanZaigen": 2389890,
            "totalCost": 2428111
          }
        ],
        "indicators": [
          {
            "category": "活動指標",
            "name": "ふるさと納税の返礼品の品目数",
            "targets": [
              1600,
              2000,
              2000,
              2000,
              2000
            ],
            "actuals": [
              2247,
              2467,
              2740,
              null,
              null
            ]
          },
          {
            "category": "成果指標",
            "name": "ふるさと納税寄附額",
            "targets": [
              2000000,
              2200000,
              3000000,
              4500000,
              4500000
            ],
            "actuals": [
              3023522,
              4121037,
              7415964,
              null,
              null
            ]
          }
        ],
        "ref": "7kouhyouyou2.xlsx#138"
      }
    ]
  },
  {
    "fy": "R6",
    "fyLabel": "令和6年度",
    "targetFy": "R5",
    "targetFyLabel": "令和5年度",
    "sourceTitle": "令和6年度 甲府市 事務事業評価 詳細票（事業報告・成果）",
    "sourceUrl": "https://web.archive.org/web/20260712140404/https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
    "sourceLocalUrl": "/sources/kofu-jigyou-houkoku-r6/6kouhyouyou6.xlsx",
    "reports": [
      {
        "no": "79",
        "name": "障害者のすみよいまちづくり事業",
        "buka": "福祉部 福祉支援室 障がい福祉課",
        "kubun": "主要",
        "implementation": "重度心身障がい者の社会参加の促進と生活圏の拡大を図り、障がい者の福祉向上に寄与することを目的に、県事業の対象者範囲を拡大し、重度心身障害者タクシー利用料金を助成した。 令和3年度より、初回交付分（最大24枚）を使い切った対象者には、申請により追加交付（最大12枚）を行っている。",
        "grade": "A",
        "score": 22,
        "cost": [
          {
            "fy": "R3",
            "kind": "決算",
            "jigyohi": 13471,
            "ippanZaigen": 10846,
            "totalCost": 20438
          },
          {
            "fy": "R4",
            "kind": "決算",
            "jigyohi": 13655,
            "ippanZaigen": 11178,
            "totalCost": 20610
          },
          {
            "fy": "R5",
            "kind": "決算",
            "jigyohi": 13059,
            "ippanZaigen": 10567,
            "totalCost": 20053
          },
          {
            "fy": "R6",
            "kind": "当初",
            "jigyohi": 14319,
            "ippanZaigen": 11643,
            "totalCost": 21850
          },
          {
            "fy": "R7",
            "kind": "計画",
            "jigyohi": 17871,
            "ippanZaigen": 15195,
            "totalCost": 25402
          }
        ],
        "indicators": [
          {
            "category": "活動指標",
            "name": "重度心身障害者タクシー利用料金助成制度周知回数",
            "targets": [
              5,
              5,
              5,
              5,
              5
            ],
            "actuals": [
              5,
              5,
              5,
              null,
              null
            ]
          },
          {
            "category": "成果指標",
            "name": "タクシー券の交付者数",
            "targets": [
              1200,
              1200,
              1200,
              1200,
              1300
            ],
            "actuals": [
              1208,
              1245,
              1200,
              null,
              null
            ]
          },
          {
            "category": "成果指標",
            "name": "タクシー券の交付者数（追加分）",
            "targets": [
              360,
              370,
              370,
              380,
              420
            ],
            "actuals": [
              363,
              375,
              377,
              null,
              null
            ]
          }
        ],
        "ref": "6kouhyouyou6.xlsx#79"
      },
      {
        "no": "133",
        "name": "職員研修事業",
        "buka": "総務部人事管理室人材マネジメント課",
        "kubun": "主要",
        "implementation": "職員ニーズに対応した効果的な研修により、自己啓発意欲を高め自律型人材の育成を図るとともに、職員自らが研修を提案する「提案参加型方式」を推進するなど、学習風土の醸成に努めた。職位や成長ステージに求められる役割の認識と能力を継続的かつ段階的に修得するため階層別研修のほか、職員の自己啓発意識を喚起するため各種支援要綱の周知を図った。さらには基本的な能力形成の場であるＯＪＴ（職場研修）の習慣的な実施への意識付けを行うことで、「学ぶ職場風土」づくりに努めた。",
        "grade": "A",
        "score": 22,
        "cost": [
          {
            "fy": "R3",
            "kind": "決算",
            "jigyohi": 9889,
            "ippanZaigen": 9608,
            "totalCost": 23823
          },
          {
            "fy": "R4",
            "kind": "決算",
            "jigyohi": 9970,
            "ippanZaigen": 9688,
            "totalCost": 23880
          },
          {
            "fy": "R5",
            "kind": "決算",
            "jigyohi": 12538,
            "ippanZaigen": 12237,
            "totalCost": 26526
          },
          {
            "fy": "R6",
            "kind": "当初",
            "jigyohi": 17800,
            "ippanZaigen": 17441,
            "totalCost": 32862
          },
          {
            "fy": "R7",
            "kind": "計画",
            "jigyohi": 23042,
            "ippanZaigen": 22656,
            "totalCost": 38104
          }
        ],
        "indicators": [
          {
            "category": "活動指標",
            "name": "一般・特別研修の実施回数（回）",
            "targets": [
              120,
              120,
              120,
              120,
              120
            ],
            "actuals": [
              76,
              73,
              89,
              null,
              null
            ]
          },
          {
            "category": "活動指標",
            "name": "上記指標のうち、提案参加型方式による研修の実施回数（回）",
            "targets": [
              30,
              30,
              30,
              30,
              30
            ],
            "actuals": [
              4,
              8,
              8,
              null,
              null
            ]
          },
          {
            "category": "成果指標",
            "name": "提案参加型方式による研修受講者の業務改善等の新たな取組の実践率（％）",
            "targets": [
              35,
              40,
              45,
              45,
              45
            ],
            "actuals": [
              100,
              86,
              59,
              null,
              null
            ]
          }
        ],
        "ref": "6kouhyouyou6.xlsx#133"
      },
      {
        "no": "135",
        "name": "ふるさと応援寄附金推進事業事務",
        "buka": "産業部産業総室ふるさと納税課",
        "kubun": "主要",
        "implementation": "ふるさと納税の認知度が高まり、全国の自治体が貴重な自主財源の確保としてふるさと納税に係る取組に力を注ぐ中、本市ふるさと納税においてもふるさと納税制度本来の趣旨を踏まえ、更なる財源確保をするべく様々な取組を行ってきた。昨年同様に本市が誇る地場産品であるジュエリーやシャインマスカットなどを主要返礼品とし、寄附者ニーズに合った魅力のある返礼品の充実に努めた。さらに、ポータルサイトにおけるサイト内広告やメールマガジンを強化し本市返礼品の魅力を広く発信したことに加え、主要返礼品に次ぐ新たな返礼品の発掘にも取組んだ結果、スイーツやトイレットペーパーなどの人気返礼品が誕生し更なる寄附額増加が図られた。また、寄附者に対し本市施設の優待券を同封した「寄附の使い道報告書」や、ジュエリーを返礼品として選んでいただいた方へ「ジュエリーカタログ」を送付するなど、リピーターを確保する取組を行った。また一方で、「東京ガールズコレクション」を活用した甲府ジュエリーステージの展開による「宝石のまち甲府」のプロモーション事業を行い、「甲府ジュエリー」をＰＲすることでふるさと納税の増額を図った。こうした結果、令和4年度の寄附件数75,259件、寄附金額3,023,522千円に比べ、令和5年度は寄附件数約1.98倍となる149,122件、寄附金額は1.36倍となる4,121,037千円となった。",
        "grade": "A",
        "score": 22,
        "cost": [
          {
            "fy": "R3",
            "kind": "決算",
            "jigyohi": 1001545,
            "ippanZaigen": 1001545,
            "totalCost": 1015479
          },
          {
            "fy": "R4",
            "kind": "決算",
            "jigyohi": 1495382,
            "ippanZaigen": 1495382,
            "totalCost": 1516247
          },
          {
            "fy": "R5",
            "kind": "決算",
            "jigyohi": 2105298,
            "ippanZaigen": 2105298,
            "totalCost": 2133274
          },
          {
            "fy": "R6",
            "kind": "当初",
            "jigyohi": 1520222,
            "ippanZaigen": 1457029,
            "totalCost": 1557877
          },
          {
            "fy": "R7",
            "kind": "計画",
            "jigyohi": 2129166,
            "ippanZaigen": 2127210,
            "totalCost": 2166821
          }
        ],
        "indicators": [
          {
            "category": "活動指標",
            "name": "ふるさと納税の返礼品の品目数",
            "targets": [
              900,
              1600,
              2000,
              2000,
              2000
            ],
            "actuals": [
              1514,
              2247,
              2467,
              null,
              null
            ]
          },
          {
            "category": "成果指標",
            "name": "ふるさと納税寄附額",
            "targets": [
              1600000,
              2000000,
              2200000,
              3000000,
              4000000
            ],
            "actuals": [
              2199778,
              3023522,
              4121037,
              null,
              null
            ]
          }
        ],
        "ref": "6kouhyouyou6.xlsx#135"
      }
    ]
  }
];
