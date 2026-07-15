// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 進捗（progress）は coverage.json と同じ実データから算出する。**手書きの数字は1つも無い。**
// 計画（plan）は pipeline/registry/roadmap.ts の内容をそのまま載せる（唯一の手書き）。

export interface RoadmapItem {
  title: string;
  status: "now" | "next" | "later";
  why: string;
  needs: string;
  ref?: string;
}

export const ROADMAP_PROGRESS = {
  "fullCount": 1,
  "budgetCount": 18,
  "muniCount": 1741,
  "prefCount": 47,
  "sourceCount": 97,
  "fileCount": 155,
  "archivedCount": 88,
  "licenseOpen": 10,
  "licensePermission": 30,
  "licenseUnverified": 57,
  "kessanRange": "R2〜R6（5年度）",
  "kofuBudgetRange": "R2〜R8（7年度）",
  "kofuBudgetYears": 7,
  "budgetDepth": [
    {
      "name": "川崎市",
      "code": "141305",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "名古屋市",
      "code": "231002",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "福岡市",
      "code": "401307",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "札幌市",
      "code": "011002",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "横浜市",
      "code": "141003",
      "years": 6,
      "range": "R3〜R8（6年度）"
    }
  ],
  "kofuDetail": {
    "kessan": "R2〜R6（5年度）",
    "budget": "R2〜R8（7年度）",
    "projects": "R2〜R8（7年度）・計482件",
    "report": "令和7年度2件 / 令和6年度3件（公表サンプルのみ）",
    "council": "R2〜R8（7年度）・議決つき",
    "execution": "R1〜R7（7年度）",
    "evaluation": "H29〜R7（9年度）・約1,500件",
    "outturn": "H30〜R6（7年度）"
  }
} as const;

export const ROADMAP_PLAN: RoadmapItem[] = [
  {
    "title": "事業報告（成果）を政令市で収録する",
    "status": "now",
    "why": "予算 → 執行 → 成果 の鎖のうち、最後の「成果」だけが甲府では公表サンプル数件しか無く、全事業分は情報公開請求が要る状態だった。政令市を調べたところ、札幌・川崎・横浜は事業単位の決算額・人件費込みコスト・成果指標の目標/実績を全量ウェブ公開していた。請求を待たずに鎖を閉じられる。",
    "needs": "様式が3市3様（札幌=1事業1PDF・川崎=事務事業評価シート・横浜=事業評価書）でパーサが要る。札幌は R7 だけで666件が1事業1PDF なので、局別一覧から辿る収集器の設計も要る。",
    "ref": "docs/data-sources.md §8b"
  },
  {
    "title": "主な事業（政令市5市）",
    "status": "next",
    "why": "款ドリルダウンで「この款は何に使われるのか」を事業名まで下ろせる。甲府では83事業を収録済み。",
    "needs": "4市とも既存の様式に当てはまらない新様式（横浜=CSV・川崎=15列の表・名古屋=1事業1シート・福岡=2階層）。どの市も款が紐付かない（局は組織であって款ではない）ため、款ドリルではなくダッシュボードの一覧になる。全市で特別会計・企業会計の混入を外す設計が要る。",
    "ref": "docs/data-sources.md §8b"
  },
  {
    "title": "大阪市（未収録で最大の自治体）",
    "status": "next",
    "why": "人口278万。未収録の自治体では最大で、款別歳入歳出＋前年当初比較は取れることを確認済み。",
    "needs": "285ページの事項別明細書で、既存パーサの「1ページ＝1側の款別一覧」という前提に合わず専用パーサが要る。CC-BY の財政局資料は款別が無く代替にならないことを実測で確認済み。",
    "ref": "docs/data-sources.md §8"
  },
  {
    "title": "東京特別区",
    "status": "next",
    "why": "未収録の人口上位に多数残っている（世田谷92万・練馬・大田・足立・江戸川…）。",
    "needs": "特別区は都区財政調整があり市とも政令市とも会計制度が違う。資料の様式を含めて別途の偵察が要る。"
  },
  {
    "title": "款より下（項・目・節）の内訳",
    "status": "later",
    "why": "「民生費 1,000億」の内訳を追えるようにする。現在は款までで、甲府の項レベルは決算値で代替表示している（予算の項以下は原典がウェブ未公開のため）。",
    "needs": "甲府は予算書本編がウェブ未公開＝情報公開請求。横浜は歳入・歳出 CSV が款項目レベルの可能性があり未評価。推計はしない（一次資料が無ければ載せない）。"
  },
  {
    "title": "ライセンス未確認の資料の棚卸し",
    "status": "later",
    "why": "一次資料の写しを自サーバーから配信しているため、利用条件の確認は「あとで」では済まない。区分は /coverage で全件公開している。",
    "needs": "未確認の多くは「利用条件は同サイト参照」のプレースホルダで、原文を調べれば区分が動く。あわせて、著作権法32条2項（行政の広報資料は出典明示のうえ転載可・ただし禁止表示があれば不可）で説明できるかの論点が未決。横浜は発行元自身が「数値データ・簡単な表は自由に利用できる」と明示している。",
    "ref": "docs/data-strategy.md【未決】"
  },
  {
    "title": "補正予算",
    "status": "later",
    "why": "当初予算がその後どう変わったかを追える。現在は当初予算のみで、補正は未収録。",
    "needs": "甲府 R8 の補正はまだ編成されていない（新年度）。9月議会以降に注視する。"
  },
  {
    "title": "自治体を全国へ広げる",
    "status": "later",
    "why": "決算ベース（総務省）では既に全1,741市町村が見られる。予算ベースは人口の多い順に整備しており、山梨県内は町村まで降りている。",
    "needs": "予算資料は自治体ごとに様式が割れる。1自治体ずつ偵察 → 収録の手続き（source-scout / ingest-source）に乗せて進める。スキャン画像 PDF の自治体は決定的にパースできず収録できない。",
    "ref": "docs/data-strategy.md"
  }
];
