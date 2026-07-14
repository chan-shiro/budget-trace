// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 甲府の類似4市（豊川・山口・沼津・和泉）の当初予算（款別歳入歳出・前年当初比較つき）。
// budget 階層: 予算資料に主な事業・執行・評価が無いため款別＋前年比較のみ。金額は億円

export interface MuniKanRow {
  name: string;
  /** 当年度予算額（億円） */
  v: number;
  /** 前年度予算額（億円） */
  prevV: number | null;
  /** 対前年度（%） */
  yoy: number | null;
  /** 「その他」集約の内訳（実款） */
  children?: MuniKanRow[];
}

export interface MuniProject {
  name: string;
  /** 予算額（億円） */
  amountOku: number;
  /** 属する款（豊川など款が取れる様式のみ。和泉の重点事業は null） */
  kan: string | null;
  /** 施策（山梨県の中項目《…》など施策別グルーピング。無い様式は空文字） */
  shisaku: string;
  /** 新規/拡充/繰越 */
  kubun: "新規" | "拡充" | "繰越" | null;
  /** 前年度予算額（億円。事業単位の前年度がある豊川のみ、他は null） */
  prevAmountOku: number | null;
  description: string;
  refLabel: string;
  /** 自サーバー配信の原本コピー（#page=N 付き） */
  refLocalUrl: string;
}

/** 決算＋執行率の1行（款別）。KofuExecRow と同形 */
export interface MuniExecRow {
  name: string;
  /** 予算現額（億円・補正/繰越込み） */
  budgetOku: number;
  /** 収入済額（歳入）/ 支出済額（歳出）（億円） */
  settledOku: number;
  /** 資料記載の収入率/執行率（%）。予算現額0の款は null */
  ratePct: number | null;
  ref: string;
  refLabel: string;
  /** 内訳（甲府の市税内訳など。山梨県決算にはないので通常 undefined） */
  breakdownNote?: string;
}

/** 決算＋執行率の1年度分（款別歳入歳出・KofuExecutionYear と同形） */
export interface MuniExecutionYear {
  fy: string;
  basis: "速報" | "確定";
  fyLabel: string;
  asOf: string;
  asOfNote: string;
  population: number | null;
  revenueBudgetTotalOku: number;
  revenueSettledTotalOku: number;
  expenditureBudgetTotalOku: number;
  expenditureSettledTotalOku: number;
  revenue: MuniExecRow[];
  expenditure: MuniExecRow[];
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

export interface MuniBudget {
  muniCode: string;
  muniName: string;
  prefName: string;
  /** 都道府県エンティティ（県全体）か。市町村比較・主な事業は出さない */
  isPref: boolean;
  fy: string;
  fyLabel: string;
  population: number;
  populationLabel: string;
  totalOku: number;
  prevTotalOku: number | null;
  yoyLabel: string;
  prevBasis: "当初" | "補正後";
  revenue: MuniKanRow[];
  expenditure: MuniKanRow[];
  /** 主な事業（豊川・和泉のみ。他市は空配列） */
  projects: MuniProject[];
  /** 決算＋執行率（山梨県のみ。当初予算とは別年度。他は空配列） */
  execution: MuniExecutionYear[];
  sourceTitle: string;
  sourceUrl: string;
  originUrl: string;
  sourceLocalUrl: string;
  pagesLabel: string;
  evidence: { title: string; type: string; url: string; localUrl: string; source: string; thumb: string }[];
}

/** 団体コード → 当初予算（budget 階層の4市） */
export const MUNI_BUDGETS: Record<string, MuniBudget> = {
  "190004": {
    "muniCode": "190004",
    "muniName": "山梨県",
    "prefName": "山梨県",
    "isPref": true,
    "projects": [
      {
        "name": "商工業振興資金貸付金",
        "amountOku": 451.62207,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "中小企業の金融の円滑化を促進し、経営の安定化を図るため、金融機関の協調を得て",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "高等学校等就学支援金交付事業費",
        "amountOku": 69.6403,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "全ての意志ある生徒が安心して勉学に打ち込めるよう、高校生等に対し、所得の状況",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "小学校給食費負担軽減事業費補助金",
        "amountOku": 20.3053,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "公立小学校に通う児童が安心して学校給食の提供を受けられるよう、給食費の負担を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "少人数教育推進事業費",
        "amountOku": 19.56395,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "児童一人ひとりに向き合ったきめ細かな質の高い教育を実現するため、公立小学校に",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "消防防災ヘリコプター整備事業費",
        "amountOku": 14.73844,
        "kan": null,
        "shisaku": "防災・減災、県土の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "山岳遭難救助や林野火災消火などの活動時における安定的な運航体制を確保するため、",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.1",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=1"
      },
      {
        "name": "スタートアップ支援センター事業費",
        "amountOku": 1.4187,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県内企業との共創による新たなビジネス創出や雇用の促進を図るため、スタートアッ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "部活動地域展開推進事業費",
        "amountOku": 1.20753,
        "kan": null,
        "shisaku": "スポーツの振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "将来にわたり子どもたちがスポーツ・文化芸術活動に親しむことができる機会を確保",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      },
      {
        "name": "ツキノワグマ被害防止対策強化事業費",
        "amountOku": 0.95149,
        "kan": null,
        "shisaku": "「上質な空間」づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県民の安全・安心を確保するため、クマによる被害を防止する取り組みを強化する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.14",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=14"
      },
      {
        "name": "成長産業総合支援センター設置事業費補助金",
        "amountOku": 0.77952,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県内企業の成長分野(医療機器、水素・燃料電池、航空宇宙防衛)進出を一体的に促進",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
      },
      {
        "name": "キャリアアップ・ユニバーシティ運営事業費補助金",
        "amountOku": 0.7723,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "働き手のスキルアップを図るため、教育機関や研修企業等と連携してリスキリングを",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
      },
      {
        "name": "空き家活用住宅整備モデル事業費補助金",
        "amountOku": 0.7665,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "空き家の活用を促進するとともに、移住者の受け入れに向けた良好な住環境の形成を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
      },
      {
        "name": "富士トラム推進事業費",
        "amountOku": 0.75868,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "富士山における諸課題の解決による高付加価値化を図るため、富士トラムの導入を通",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
      },
      {
        "name": "二次交通高度化推進事業費",
        "amountOku": 0.74071,
        "kan": null,
        "shisaku": "海と空に開かれた「開の国」交通ネットワークの充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "観光地や地域の移動手段の確保に向け、既存の交通資源を有効活用し、利便性向上を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
      },
      {
        "name": "木造住宅居住安心支援事業費",
        "amountOku": 0.70959,
        "kan": null,
        "shisaku": "防災・減災、県土の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "地震に強い安全で安心なまちづくりを目指し、木造住宅の耐震診断・改修事業への助",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
      },
      {
        "name": "高校入試システム構築事業費",
        "amountOku": 0.66541,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "高校入試におけるＷｅｂ出願を実施するため、入試システムを再構築する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "メディカル・デバイス・コリドー創生事業費",
        "amountOku": 0.62049,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "医療機器関連産業の集積を加速化させるため、県内企業が行う機器開発や部材供給に",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.3",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=3"
      },
      {
        "name": "コーポレートブランド「やまなし」推進事業費",
        "amountOku": 0.60848,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "地域経済の活性化を図るため、本県のブランド価値向上に向けた取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "校内教育支援センター支援員配置事業費補助金",
        "amountOku": 0.58112,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "不登校児童生徒の登校復帰の支援等を行う者を配置する市町村等に対し助成する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "やまふくプラス推進事業費",
        "amountOku": 0.51184,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "障害者の社会参加の促進と工賃向上を図るための取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "縁結び支援事業費",
        "amountOku": 0.50806,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "若者が抱く結婚へのネガティブなイメージや不安を払拭し、前向きな価値観を醸成す",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
      },
      {
        "name": "水素・燃料電池分野基幹産業化推進事業費",
        "amountOku": 0.49491,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "水素・燃料電池関連産業の基幹産業化を図るため、県内企業が行う機器開発や部材供",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.3",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=3"
      },
      {
        "name": "富士五湖自然首都圏フォーラム運営事業費",
        "amountOku": 0.47235,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "域内外の民間との連携により地域の高付加価値化を図るため、観光リゾート地と首都",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
      },
      {
        "name": "プレコンセプションケア推進事業費",
        "amountOku": 0.46149,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子どもを望む誰もが安心して妊娠・出産できるよう、将来の妊娠・出産に備えた健康",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "富士山世界遺産センター機能強化事業費",
        "amountOku": 0.44825,
        "kan": null,
        "shisaku": "「上質な空間」づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "開館10周年を契機に、富士山世界遺産センターの機能強化に向けた取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.15",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=15"
      },
      {
        "name": "第81回国民スポーツ大会冬季大会開催費",
        "amountOku": 0.43043,
        "kan": null,
        "shisaku": "スポーツの振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      },
      {
        "name": "妊産婦等生活援助事業費",
        "amountOku": 0.41135,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "家庭生活に困難な問題を抱える妊産婦等の生活の安定と自立の促進を図るため、就労",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "地域医療構想推進事業費",
        "amountOku": 0.39286,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "峡南南部地域の医療提供体制を確保するため、病院等の再編に向けた取り組みに対し",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "富士北麓県有地高度活用事業費",
        "amountOku": 0.38346,
        "kan": null,
        "shisaku": "県有資産や地域資源の可能性の発揮",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域のブランド力向上と自主財源の確保を図るため、県有地の活用により生み出され",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
      },
      {
        "name": "空飛ぶクルマ社会実装加速化事業費",
        "amountOku": 0.29986,
        "kan": null,
        "shisaku": "海と空に開かれた「開の国」交通ネットワークの充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "利便性の高い新たな交通ネットワークを構築するため、本県における次世代空モビリ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.12",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=12"
      },
      {
        "name": "国際保育推進事業費",
        "amountOku": 0.26135,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "外国人が地域社会で安心して子育てを行い、子どもが言語や文化の違いにかかわらず",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
      },
      {
        "name": "私立高等学校等入学金サポート事業費",
        "amountOku": 0.2605,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "経済的に余裕のない世帯の私立高等学校等入学に要する費用負担の軽減を図るため、",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "郡内織物国際価値創出推進事業費",
        "amountOku": 0.25771,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "郡内織物の新たな価値創出に向け、先進的な感性を持つ若手デザイナーの理解促進を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "外国人材確保・定着支援事業費",
        "amountOku": 0.25733,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県内企業等において深刻化する人手不足に対応するため、外国人材の確保や定着に向",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "水素コンソーシアム情報発信事業費",
        "amountOku": 0.25182,
        "kan": null,
        "shisaku": "「自然首都圏」創出のための基盤整備",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "グリーン水素技術の社会実装を推進するため、本県の知見・データの集積、議論を行",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.13",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=13"
      },
      {
        "name": "人口減少危機対策支援事業費",
        "amountOku": 0.22702,
        "kan": null,
        "shisaku": "全ての県民・あらゆる主体との連帯に基づく県政の推進",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県と市町村が連携して人口減少危機に対応するため、地域の実情に応じた市町村の取",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
      },
      {
        "name": "特別支援学校冷房設備設置費",
        "amountOku": 0.19651,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "児童生徒に快適な学習環境を提供するため、特別支援学校の屋内運動場へ冷房設備を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "介護福祉士修学資金等貸付事業費",
        "amountOku": 0.18842,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": null,
        "prevAmountOku": null,
        "description": "介護福祉士及び社会福祉士の資格取得や潜在介護職員の復職を推進するため、修学資",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "富士山いにしえの登山道再興事業費",
        "amountOku": 0.16894,
        "kan": null,
        "shisaku": "「上質な空間」づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "富士山の文化的価値への理解を深めるとともに、登山者の分散化を図るため、麓から",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.14",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=14"
      },
      {
        "name": "子ども未来進学支援事業費",
        "amountOku": 0.14832,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "大学等への進学を希望する生活保護世帯の子どもを支援するため、学習塾等において",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "図書館を活用した探究活動等支援事業費",
        "amountOku": 0.14126,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "若者の探究活動や誰もが利用しやすい読書環境の充実を図るため、知の拠点である図",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "ワーク・ライフ・ケアバランス推進事業費",
        "amountOku": 0.12232,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "就業者の仕事、生活、育児・介護の調和を図るため、県内企業が行う業務改善や柔軟",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.2",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=2"
      },
      {
        "name": "富士山降灰対策ガイドライン策定事業費",
        "amountOku": 0.12078,
        "kan": null,
        "shisaku": "防災・減災、県土の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "富士山周辺の住民等が適切な避難行動を取れるよう、噴火による降灰の建物への影響",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.1",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=1"
      },
      {
        "name": "介護職員宿舎施設整備事業費補助金",
        "amountOku": 0.118,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "介護人材の確保・定着を促進するため、介護事業者等が行う良好な住環境を備えた職",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "フィールドシアター推進モデル事業費補助金",
        "amountOku": 0.1,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "本県の魅力的な自然景観や文化財等と調和した文化芸術イベントを創出するため、自",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "熱中症予防対策事業費",
        "amountOku": 0.09936,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "熱中症による健康被害を防止するため、公民館や集会所を開放する市町村の取り組み",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "山梨魅力再発見事業費",
        "amountOku": 0.09837,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域への愛着の醸成と地域ブランド価値の向上を図るための取り組みを行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "もも未来担い手育成プロジェクト事業費",
        "amountOku": 0.0823,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "本県の主要農産物であるももの生産量維持を図るため、新規就農者を確保・育成する",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
      },
      {
        "name": "夜間中学・学びの多様化学校設置事業費",
        "amountOku": 0.07309,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "義務教育未修了者や不登校児童生徒等の教育機会を確保するため、夜間中学・学びの",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "航空宇宙防衛関連産業参入支援事業費",
        "amountOku": 0.0723,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": null,
        "prevAmountOku": null,
        "description": "県内企業の収益拡大を図るため、市場の拡大が見込まれる航空・宇宙・防衛関連産業",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "県産農畜水産物等小ロット流通体制調査研究事業費",
        "amountOku": 0.0682,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "特色はあるが生産量の少ない県産農畜水産物等の県内での消費拡大を図るため、効率",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "やまなし「にじきら」アンバサダー情報発信事業費",
        "amountOku": 0.06487,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県内米農家の所得向上を図るため、高温耐性に優れた高品質米である「にじのきらめ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "保育士養成施設就職等促進支援事業費補助金",
        "amountOku": 0.056,
        "kan": null,
        "shisaku": "子育て支援の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "保育人材の確保を図るため、保育士養成施設が実施する保育所等への就職促進や保育",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.6",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=6"
      },
      {
        "name": "外国人介護人材資格取得等支援事業費",
        "amountOku": 0.05424,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "技能実習生等に対し、日常生活や介護福祉士国家資格の取得を支援する取り組みを行",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "高校生世代学習支援事業費",
        "amountOku": 0.05081,
        "kan": null,
        "shisaku": "困難からの脱却・再挑戦に開かれた社会づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "大学等への進学を希望する経済的に余裕のない世帯の高校生を支援するため、安心し",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "外国人介護人材獲得強化事業費補助金",
        "amountOku": 0.05,
        "kan": null,
        "shisaku": "生活基盤の保障",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "介護分野において深刻化する人手不足に対応するため、介護事業者や介護福祉士養成",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.9",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=9"
      },
      {
        "name": "南山梨エリア周遊観光推進事業費",
        "amountOku": 0.048,
        "kan": null,
        "shisaku": "地域経済基盤の強靱化",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "南山梨エリアの地域資源の高付加価値化を図るため、地元自治体と連携した取り組み",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "孤独・孤立対策推進事業費",
        "amountOku": 0.04737,
        "kan": null,
        "shisaku": "安全・安心、快適なまちづくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "孤独・孤立がもたらす健康問題等のリスクを低減するため、ひきこもり状態にある者",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.5",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=5"
      },
      {
        "name": "ふるさと山梨甲州財閥学習推進事業費",
        "amountOku": 0.04552,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "児童生徒の郷土への関心を深め、自主性や公益的な視点を育むため、本県発展の礎を",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "フィッシングツーリズム推進事業費",
        "amountOku": 0.04499,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県内漁業の活性化と水産資源を活用した観光振興を図るため、漁協や市町村等と連携",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "パラスポーツ教育活動支援事業費",
        "amountOku": 0.04341,
        "kan": null,
        "shisaku": "スポーツの振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "障害のある子どもたちがスポーツに親しむことができる機会を確保するため、パラス",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      },
      {
        "name": "やまなし探究シンポジウム開催費",
        "amountOku": 0.04324,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "県立高校における探究的な学びの質の向上を支援するとともに、中学生に対して県立",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "日本創生のための将来世代応援知事同盟サミット開催費",
        "amountOku": 0.04295,
        "kan": null,
        "shisaku": "全ての県民・あらゆる主体との連帯に基づく県政の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "将来を担う世代を社会全体で応援する気運を高めるため、子育て支援をはじめとした",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.21",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=21"
      },
      {
        "name": "料理人技術力向上支援事業費補助金",
        "amountOku": 0.0375,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "技術研鑽に励む料理人の活躍を支援する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "帰国・外国人児童生徒等教育推進支援事業費",
        "amountOku": 0.02485,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "日本語指導の充実を図るため、日本語指導教員の資質向上研修会等を開催する。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.8",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=8"
      },
      {
        "name": "やまなし地域おこし協力隊サポート事業費",
        "amountOku": 0.02453,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域おこし協力隊員が活動しやすい環境整備を促進し、安定的な隊員の確保につなげ",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.11",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=11"
      },
      {
        "name": "少人数教育の質の向上プラン推進事業費",
        "amountOku": 0.02292,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "教育の質の更なる向上を図るため、少人数教育の環境を生かした探究的な学びを推進",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.17",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=17"
      },
      {
        "name": "市町村職員人材確保支援事業費",
        "amountOku": 0.02119,
        "kan": null,
        "shisaku": "地域を担う人財づくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "市町村の行政サービスを安定的に提供できる体制を維持するため、広域連携による採",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.10",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=10"
      },
      {
        "name": "ひとり親家庭養育費確保支援事業費補助金",
        "amountOku": 0.0173,
        "kan": null,
        "shisaku": "共生社会化の推進",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "ひとり親家庭の生活の安定と子どもの健やかな育成を図るため、養育費確保の手続き",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.7",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=7"
      },
      {
        "name": "ジュエリー産地やまなし技能五輪プロモーション等事業費補助金",
        "amountOku": 0.015,
        "kan": null,
        "shisaku": "地域経済の収益力向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "技能五輪全国大会貴金属装身具部門の開催を好機に、協同組合県ジュエリー協会が行",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.18",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=18"
      },
      {
        "name": "ワークサポートケアマネジャー養成事業費補助金",
        "amountOku": 0.0108,
        "kan": null,
        "shisaku": "安全・安心、快適なまちづくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "介護離職を防ぐため、仕事と介護の両立に関する専門人材の養成に向けた取り組みに",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.5",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=5"
      },
      {
        "name": "山梨緑化100年構想検討事業費",
        "amountOku": 0.00884,
        "kan": null,
        "shisaku": "安全・安心、快適なまちづくり",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "自然と共生する持続可能なまちづくりの実現に向け、100年先を見据えた都市環境の",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.4",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=4"
      },
      {
        "name": "少人数教育効果検証事業費",
        "amountOku": 0.00754,
        "kan": null,
        "shisaku": "教育の充実",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "児童生徒一人ひとりに向き合ったきめ細かな質の高い教育を実現するため、25人学級",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.16",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=16"
      },
      {
        "name": "情報発信拠点設置検討事業費",
        "amountOku": 0.00424,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "ジャパンワインの魅力を発信する新たな情報発信拠点の県内設置に向けた検討を行う。",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.19",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=19"
      },
      {
        "name": "ふるさと山梨郷土人物発信事業費",
        "amountOku": 0.00409,
        "kan": null,
        "shisaku": "文化芸術の振興",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "地域の歴史や文化についての理解と関心を深めるため、博物館に先人の功績を紹介す",
        "refLabel": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業） p.20",
        "refLocalUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf#page=20"
      }
    ],
    "execution": [
      {
        "fy": "R6",
        "basis": "確定",
        "fyLabel": "令和6年度（決算・確定値）",
        "asOf": "令和6年度決算（確定値）",
        "asOfNote": "出納整理後の決算確定値。予算現額は補正・繰越を含むため当初予算とは一致しません",
        "population": null,
        "revenueBudgetTotalOku": 6700.46789557,
        "revenueSettledTotalOku": 5713.05119222,
        "expenditureBudgetTotalOku": 6700.46789557,
        "expenditureSettledTotalOku": 5530.30730401,
        "revenue": [
          {
            "name": "県税",
            "budgetOku": 1061.03382,
            "settledOku": 1073.21812008,
            "ratePct": 101.1,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方消費税清算金",
            "budgetOku": 440.5438,
            "settledOku": 440.56323589,
            "ratePct": 100,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方譲与税",
            "budgetOku": 189.41008,
            "settledOku": 189.52736,
            "ratePct": 100.1,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方特例交付金",
            "budgetOku": 28.46814,
            "settledOku": 28.46813,
            "ratePct": 99.9,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "地方交付税",
            "budgetOku": 1471.88767,
            "settledOku": 1472.5426,
            "ratePct": 100,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "交通安全対策特別交付金",
            "budgetOku": 2.16,
            "settledOku": 1.70584,
            "ratePct": 79,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "分担金及び負担金",
            "budgetOku": 42.74621429,
            "settledOku": 25.8410692,
            "ratePct": 60.5,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "使用料及び手数料",
            "budgetOku": 72.23847,
            "settledOku": 71.16983566,
            "ratePct": 98.5,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "国庫支出金",
            "budgetOku": 1149.72274716,
            "settledOku": 762.50156468,
            "ratePct": 66.3,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "財産収入",
            "budgetOku": 7.97582,
            "settledOku": 9.01988036,
            "ratePct": 113.1,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "寄附金",
            "budgetOku": 8.75826,
            "settledOku": 9.20931521,
            "ratePct": 105.2,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "繰入金",
            "budgetOku": 120.26522,
            "settledOku": 118.1177781,
            "ratePct": 98.2,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "繰越金",
            "budgetOku": 193.50488595,
            "settledOku": 193.50488185,
            "ratePct": 100,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "諸収入",
            "budgetOku": 912.03276817,
            "settledOku": 750.55158119,
            "ratePct": 82.3,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          },
          {
            "name": "県債",
            "budgetOku": 999.72,
            "settledOku": 567.11,
            "ratePct": 56.7,
            "ref": "r6kessannjokyou.pdf#p4",
            "refLabel": "決算の状況 p.4"
          }
        ],
        "expenditure": [
          {
            "name": "議会費",
            "budgetOku": 10.51474,
            "settledOku": 10.04204889,
            "ratePct": 95.5,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "総務費",
            "budgetOku": 478.09288597,
            "settledOku": 386.25792386,
            "ratePct": 80.8,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "民生費",
            "budgetOku": 728.82241547,
            "settledOku": 648.6440245,
            "ratePct": 89,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "衛生費",
            "budgetOku": 201.6026776,
            "settledOku": 177.56964626,
            "ratePct": 88.1,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "労働費",
            "budgetOku": 28.84357,
            "settledOku": 17.62693118,
            "ratePct": 61.1,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "農林水産業費",
            "budgetOku": 484.25977012,
            "settledOku": 325.45169947,
            "ratePct": 67.2,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "商工費",
            "budgetOku": 806.43396618,
            "settledOku": 609.61342937,
            "ratePct": 75.6,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "土木費",
            "budgetOku": 1548.57820205,
            "settledOku": 999.39769794,
            "ratePct": 64.5,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "警察費",
            "budgetOku": 260.7290054,
            "settledOku": 257.26142281,
            "ratePct": 98.7,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "教育費",
            "budgetOku": 931.039223,
            "settledOku": 892.24643739,
            "ratePct": 95.8,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "災害復旧費",
            "budgetOku": 24.86436978,
            "settledOku": 14.75310287,
            "ratePct": 59.3,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "公債費",
            "budgetOku": 741.39881,
            "settledOku": 740.89441505,
            "ratePct": 99.9,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "諸支出金",
            "budgetOku": 453.78629,
            "settledOku": 450.54852442,
            "ratePct": 99.3,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          },
          {
            "name": "予備費",
            "budgetOku": 1.50197,
            "settledOku": 0,
            "ratePct": 0,
            "ref": "r6kessannjokyou.pdf#p5",
            "refLabel": "決算の状況 p.5"
          }
        ],
        "sourceTitle": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
        "sourceUrl": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
        "originUrl": "https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
        "sourceLocalUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf",
        "evidence": [
          {
            "title": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
            "type": "PDF",
            "url": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
            "localUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf",
            "source": "www.pref.yamanashi.jp",
            "thumb": "r6kessannjokyou.pdf ・ sha256 4ac0b9855c4a8e1c… ・ 2026-07-14 取得"
          }
        ]
      }
    ],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 801056,
    "populationLabel": "県内市町村の住民基本台帳人口の合計（総務省 令和6年度決算）",
    "totalOku": 5321.1735,
    "prevTotalOku": 5115.43169,
    "yoyLabel": "+4.0%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "交付金地方交付税",
        "v": 1409.44,
        "prevV": 1369.85,
        "yoy": 2.9
      },
      {
        "name": "県税",
        "v": 1094.63459,
        "prevV": 1060.86256,
        "yoy": 3.2
      },
      {
        "name": "諸収入",
        "v": 727.63231,
        "prevV": 822.00693,
        "yoy": -11.5
      },
      {
        "name": "手数料国庫支出金",
        "v": 541.21052,
        "prevV": 501.27532,
        "yoy": 8
      },
      {
        "name": "地方消費税",
        "v": 515.65652,
        "prevV": 451.91967,
        "yoy": 14.1
      },
      {
        "name": "県債",
        "v": 493.68,
        "prevV": 445.36,
        "yoy": 10.8
      },
      {
        "name": "清算金地方譲与税",
        "v": 195.84254,
        "prevV": 179.4261,
        "yoy": 9.1
      },
      {
        "name": "繰入金",
        "v": 173.85699,
        "prevV": 165.61106,
        "yoy": 5
      },
      {
        "name": "その他",
        "v": 169.22003,
        "prevV": 119.12005,
        "yoy": null,
        "children": [
          {
            "name": "負担金使用料及び",
            "v": 76.96147,
            "prevV": 74.95492,
            "yoy": 2.7
          },
          {
            "name": "地方特例",
            "v": 50.26389,
            "prevV": 4.58001,
            "yoy": 997.5
          },
          {
            "name": "特別交付金分担金及び",
            "v": 26.62594,
            "prevV": 26.56239,
            "yoy": 0.2
          },
          {
            "name": "財産収入",
            "v": 12.57252,
            "prevV": 9.70059,
            "yoy": 29.6
          },
          {
            "name": "交通安全対策",
            "v": 1.9,
            "prevV": 2.06,
            "yoy": -7.8
          },
          {
            "name": "寄附金",
            "v": 0.8962,
            "prevV": 1.26213,
            "yoy": -29
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "教育費",
        "v": 1035.84677,
        "prevV": 925.85266,
        "yoy": 11.9
      },
      {
        "name": "公債費",
        "v": 700.58695,
        "prevV": 700.9522,
        "yoy": -0.1
      },
      {
        "name": "土木費",
        "v": 684.55143,
        "prevV": 682.50082,
        "yoy": 0.3
      },
      {
        "name": "民生費",
        "v": 679.34661,
        "prevV": 627.90003,
        "yoy": 8.2
      },
      {
        "name": "商工費",
        "v": 568.97801,
        "prevV": 658.59993,
        "yoy": -13.6
      },
      {
        "name": "諸支出金",
        "v": 502.30527,
        "prevV": 424.37774,
        "yoy": 18.4
      },
      {
        "name": "総務費",
        "v": 417.52979,
        "prevV": 388.58509,
        "yoy": 7.4
      },
      {
        "name": "警察費",
        "v": 244.44995,
        "prevV": 240.47558,
        "yoy": 1.7
      },
      {
        "name": "農林水産業費",
        "v": 227.887,
        "prevV": 226.649,
        "yoy": 0.5
      },
      {
        "name": "衛生費",
        "v": 191.15462,
        "prevV": 171.54614,
        "yoy": 11.4
      },
      {
        "name": "災害復旧費",
        "v": 35.05937,
        "prevV": 34.46054,
        "yoy": 1.7
      },
      {
        "name": "労働費",
        "v": 18.5314,
        "prevV": 18.36225,
        "yoy": 0.9
      },
      {
        "name": "議会費",
        "v": 9.94633,
        "prevV": 10.16971,
        "yoy": -2.2
      },
      {
        "name": "予備費",
        "v": 5,
        "prevV": 5,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
    "sourceUrl": "https://web.archive.org/web/20260520040653/https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
    "originUrl": "https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
    "sourceLocalUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260520040653/https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
        "localUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf",
        "source": "www.pref.yamanashi.jp",
        "thumb": "03_tousyoyosannkibo_1.pdf ・ sha256 742025562ff7fed1… ・ 2026-07-14 取得"
      }
    ]
  },
  "192023": {
    "muniCode": "192023",
    "muniName": "富士吉田市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 46364,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 310.6,
    "prevTotalOku": 289.7,
    "yoyLabel": "+7.2%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 72.2799,
        "prevV": 70.04879,
        "yoy": 3.2
      },
      {
        "name": "繰入金",
        "v": 64.51858,
        "prevV": 50.80238,
        "yoy": 27
      },
      {
        "name": "国庫支出金",
        "v": 41.05637,
        "prevV": 37.42543,
        "yoy": 9.7
      },
      {
        "name": "地方交付税",
        "v": 31.5,
        "prevV": 31.5,
        "yoy": 0
      },
      {
        "name": "寄附金",
        "v": 20.13013,
        "prevV": 20.00013,
        "yoy": 0.6
      },
      {
        "name": "県支出金",
        "v": 16.30618,
        "prevV": 14.64527,
        "yoy": 11.3
      },
      {
        "name": "地方消費税交付金",
        "v": 13.3,
        "prevV": 13.3,
        "yoy": 0
      },
      {
        "name": "諸収入",
        "v": 12.50153,
        "prevV": 12.68347,
        "yoy": -1.4
      },
      {
        "name": "その他",
        "v": 39.007310000000004,
        "prevV": 39.294529999999995,
        "yoy": null,
        "children": [
          {
            "name": "市債",
            "v": 12.477,
            "prevV": 16.354,
            "yoy": -23.7
          },
          {
            "name": "分担金及び負担金",
            "v": 12.14069,
            "prevV": 9.85062,
            "yoy": 23.2
          },
          {
            "name": "使用料及び手数料",
            "v": 5.8363,
            "prevV": 5.69921,
            "yoy": 2.4
          },
          {
            "name": "国有提供施設等所在市町",
            "v": 1.66617,
            "prevV": 1.66072,
            "yoy": 0.3
          },
          {
            "name": "財産収入",
            "v": 1.6661,
            "prevV": 0.90843,
            "yoy": 83.4
          },
          {
            "name": "法人事業税交付金",
            "v": 1.45,
            "prevV": 1.45,
            "yoy": 0
          },
          {
            "name": "地方譲与税",
            "v": 1.33722,
            "prevV": 1.38055,
            "yoy": -3.1
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 0.75,
            "prevV": 0.55,
            "yoy": 36.4
          },
          {
            "name": "地方特例交付金",
            "v": 0.65382,
            "prevV": 0.386,
            "yoy": 69.4
          },
          {
            "name": "配当割交付金",
            "v": 0.5,
            "prevV": 0.41,
            "yoy": 22
          },
          {
            "name": "繰越金",
            "v": 0.3,
            "prevV": 0.3,
            "yoy": 0
          },
          {
            "name": "利子割交付金",
            "v": 0.14,
            "prevV": 0.045,
            "yoy": 211.1
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.05,
            "prevV": 0.05,
            "yoy": 0
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.04,
            "prevV": 0.04,
            "yoy": 0
          },
          {
            "name": "環境性能割交付金",
            "v": 0.00001,
            "prevV": 0.21,
            "yoy": -100
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 84.71264,
        "prevV": 82.0597,
        "yoy": 3.2
      },
      {
        "name": "総務費",
        "v": 62.59953,
        "prevV": 56.49035,
        "yoy": 10.8
      },
      {
        "name": "衛生費",
        "v": 43.25198,
        "prevV": 40.1235,
        "yoy": 7.8
      },
      {
        "name": "教育費",
        "v": 30.51916,
        "prevV": 36.61359,
        "yoy": -16.6
      },
      {
        "name": "土木費",
        "v": 30.4354,
        "prevV": 28.64401,
        "yoy": 6.3
      },
      {
        "name": "商工費",
        "v": 26.45787,
        "prevV": 14.4158,
        "yoy": 83.5
      },
      {
        "name": "公債費",
        "v": 17.3643,
        "prevV": 16.81463,
        "yoy": 3.3
      },
      {
        "name": "消防費",
        "v": 9.51193,
        "prevV": 9.51682,
        "yoy": -0.1
      },
      {
        "name": "農林水産業費",
        "v": 3.23501,
        "prevV": 2.80412,
        "yoy": 15.4
      },
      {
        "name": "議会費",
        "v": 2.21215,
        "prevV": 1.91745,
        "yoy": 15.4
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.00003,
        "prevV": 0.00003,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 富士吉田市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "originUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
    "sourceLocalUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 富士吉田市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
        "localUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf",
        "source": "www.city.fujiyoshida.yamanashi.jp",
        "thumb": "7412.pdf ・ sha256 879613ffbf544674… ・ 2026-07-13 取得"
      }
    ]
  },
  "192082": {
    "muniCode": "192082",
    "muniName": "南アルプス市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 71726,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 429.94462,
    "prevTotalOku": 417.24947,
    "yoyLabel": "+3.0%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 98.47041,
        "prevV": 94.53314,
        "yoy": 4.2
      },
      {
        "name": "地方交付税",
        "v": 92,
        "prevV": 92,
        "yoy": 0
      },
      {
        "name": "国庫支出金",
        "v": 56.5664,
        "prevV": 58.8448,
        "yoy": -3.9
      },
      {
        "name": "寄附金",
        "v": 42.003,
        "prevV": 40.05758,
        "yoy": 4.9
      },
      {
        "name": "繰入金",
        "v": 39.13907,
        "prevV": 38.50831,
        "yoy": 1.6
      },
      {
        "name": "市債",
        "v": 32.648,
        "prevV": 32.57,
        "yoy": 0.2
      },
      {
        "name": "県支出金",
        "v": 29.9742,
        "prevV": 25.33661,
        "yoy": 18.3
      },
      {
        "name": "地方消費税交付金",
        "v": 20.98,
        "prevV": 18.38,
        "yoy": 14.1
      },
      {
        "name": "その他",
        "v": 18.163539999999998,
        "prevV": 17.01903,
        "yoy": null,
        "children": [
          {
            "name": "繰越金",
            "v": 3,
            "prevV": 3,
            "yoy": 0
          },
          {
            "name": "諸収入",
            "v": 2.87723,
            "prevV": 3.55315,
            "yoy": -19
          },
          {
            "name": "地方譲与税",
            "v": 2.78658,
            "prevV": 2.5434,
            "yoy": 9.6
          },
          {
            "name": "法人事業税交付金",
            "v": 1.49,
            "prevV": 1.39,
            "yoy": 7.2
          },
          {
            "name": "分担金及び負担金",
            "v": 1.42964,
            "prevV": 1.39063,
            "yoy": 2.8
          },
          {
            "name": "使用料及び手数料",
            "v": 1.30315,
            "prevV": 1.31663,
            "yoy": -1
          },
          {
            "name": "地方特例交付金",
            "v": 1.27,
            "prevV": 1.13,
            "yoy": 12.4
          },
          {
            "name": "財産収入",
            "v": 1.26698,
            "prevV": 0.82322,
            "yoy": 53.9
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.13,
            "prevV": 0.89,
            "yoy": 27
          },
          {
            "name": "配当割交付金",
            "v": 0.83,
            "prevV": 0.53,
            "yoy": 56.6
          },
          {
            "name": "環境性能割交付金",
            "v": 0.41,
            "prevV": 0.34,
            "yoy": 20.6
          },
          {
            "name": "利子割交付金",
            "v": 0.3,
            "prevV": 0.04,
            "yoy": 650
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.06996,
            "prevV": 0.072,
            "yoy": -2.8
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 156.10461,
        "prevV": 142.24555,
        "yoy": 9.7
      },
      {
        "name": "総務費",
        "v": 68.41606,
        "prevV": 60.78356,
        "yoy": 12.6
      },
      {
        "name": "教育費",
        "v": 60.68884,
        "prevV": 68.59359,
        "yoy": -11.5
      },
      {
        "name": "公債費",
        "v": 34.53767,
        "prevV": 33.70282,
        "yoy": 2.5
      },
      {
        "name": "土木費",
        "v": 27.39609,
        "prevV": 28.14368,
        "yoy": -2.7
      },
      {
        "name": "衛生費",
        "v": 27.19604,
        "prevV": 26.67195,
        "yoy": 2
      },
      {
        "name": "諸支出金",
        "v": 22.33791,
        "prevV": 21.11781,
        "yoy": 5.8
      },
      {
        "name": "消防費",
        "v": 13.25368,
        "prevV": 16.31723,
        "yoy": -18.8
      },
      {
        "name": "農林水産業費",
        "v": 9.83993,
        "prevV": 8.43024,
        "yoy": 16.7
      },
      {
        "name": "商工費",
        "v": 7.5365,
        "prevV": 8.61103,
        "yoy": -12.5
      },
      {
        "name": "議会費",
        "v": 2.10952,
        "prevV": 2.11366,
        "yoy": -0.2
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.22774,
        "prevV": 0.21832,
        "yoy": 4.3
      },
      {
        "name": "災害復旧費",
        "v": 0.00003,
        "prevV": 0.00003,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260713114137/https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "originUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "sourceLocalUrl": "/sources/minami-alps-yosansho-r8/__8____________.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713114137/https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
        "localUrl": "/sources/minami-alps-yosansho-r8/__8____________.pdf",
        "source": "www.city.minami-alps.yamanashi.jp",
        "thumb": "__8____________.pdf ・ sha256 65371756356e8a05… ・ 2026-07-13 取得"
      }
    ]
  },
  "192112": {
    "muniCode": "192112",
    "muniName": "笛吹市",
    "prefName": "山梨県",
    "isPref": false,
    "projects": [
      {
        "name": "ふるさと納税事業",
        "amountOku": 27.31138,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "自主財源の確保とシティプロモーションにつなげるため、ふるさと納税寄附金の寄",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "砂原配水場改築事業",
        "amountOku": 8.96222,
        "kan": null,
        "shisaku": "公営企業部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "砂原配水場については、新山梨環状道路工事の支障となり移転する必要があるた",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "みさかの湯改修事業",
        "amountOku": 7.85496,
        "kan": null,
        "shisaku": "市民生活部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "みさかふれあい交流センター（みさかの湯）について、市民の憩いの場としてだけ",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
      },
      {
        "name": "小中学校・保育所等給食費及び保育料無償化",
        "amountOku": 6.07835,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て世帯の負担を軽減し、未来を拓く子供たちを健やかに育むため、小中学校や",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
      },
      {
        "name": "石和第一保育所改築事業",
        "amountOku": 5.95737,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "石和第一保育所について、安全安心な保育環境の整備を図るため、個別施設計画に",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "スポーツツーリズム拠点整備事業",
        "amountOku": 4.8016,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "石和清流館を拠点に、市のスポーツ振興と地域交流の活性化、防災力強化を図るた",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "春日居福祉会館改修事業",
        "amountOku": 3.43615,
        "kan": null,
        "shisaku": "保健福祉部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "春日居福祉会館（やまゆりの湯）について、今後も高齢者の健全な憩いの場と心身",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
      },
      {
        "name": "消防本部庁舎改修事業",
        "amountOku": 3.2396,
        "kan": null,
        "shisaku": "消防本部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "消防本部庁舎及び訓練棟3棟について、建物や設備の長寿命化を図るため、個別施",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=19"
      },
      {
        "name": "英語力向上推進事業",
        "amountOku": 1.59048,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "将来にわたり国際社会を舞台に活躍し、市の未来を拓く人材を育成することを目的",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "芦川グリーンロッジ改修事業",
        "amountOku": 1.48153,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "芦川グリーンロッジについて、周辺の豊かな自然環境を生かした里山遊びなど、子",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "かすがい西保育所改築事業",
        "amountOku": 1.43709,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "かすがい西保育所について、安全安心な保育環境の整備を図るため、個別施設計画",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "新山梨環状道路関連道路整備事業",
        "amountOku": 1.38767,
        "kan": null,
        "shisaku": "建設部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "山梨県が実施している新山梨環状道路の建設ルートに合わせ、周辺地域の利便性の",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "石和北小通り・石和郵便局通り道路改良事業",
        "amountOku": 1.28302,
        "kan": null,
        "shisaku": "建設部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "通勤・通学等の日常生活の利便性の向上、物流や観光面での活用による地域活性化",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "AIデマンド交通事業",
        "amountOku": 1.00227,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "公共交通空白地帯を解消するとともに、高齢者や交通弱者の外出支援及び市民の公",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "さくら温泉通り歩道整備事業",
        "amountOku": 0.99,
        "kan": null,
        "shisaku": "建設部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "整備から20年が経過し老朽化しているさくら温泉通りのウッドデッキの歩道につい",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=16"
      },
      {
        "name": "笛吹市南部学校給食センター建設事業",
        "amountOku": 0.63927,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "御坂学校給食共同調理場、八代学校給食センター、境川小学校調理場、芦川小学校",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
      },
      {
        "name": "子育て世帯住宅取得支援事業",
        "amountOku": 0.573,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て世帯の住宅取得に係る経済的負担を軽減し、若者や子育て世帯の移住定住の",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "私立保育所等施設整備事業",
        "amountOku": 0.51424,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "市内の私立保育所等（令和8年度は、相興保育園、御所保育園、木の花保育園の3",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "子育て世帯住宅取得補助事業",
        "amountOku": 0.417,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て世帯の住宅取得に係る経済的負担を軽減するため、18歳以下の子を養育して",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "拠点備蓄倉庫整備事業",
        "amountOku": 0.37199,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "旧御坂保健センターを、地域防災計画に各地区の拠点となり、中長期の避難に必要",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "奨学金返還支援事業",
        "amountOku": 0.29527,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "奨学金を返還する若者の就労初期における経済的負担を軽減し、市内への移住定住",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "山盧施設管理運営事業",
        "amountOku": 0.28345,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "日本を代表する俳人「飯田蛇笏」と現代俳句の第一人者「飯田龍太」の生家であ",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "ハザードマップ更新事業",
        "amountOku": 0.27649,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "自然災害に対する防災対策及び被害の軽減に使用することを目的に、笛吹市ハザー",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "学校体育館等空調設備整備事業",
        "amountOku": 0.24288,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "学校体育館等は、教育活動としての利用だけではなく、災害時には地域住民の避難",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=17"
      },
      {
        "name": "結婚新生活支援事業",
        "amountOku": 0.135,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "新婚世帯の新生活を支援し、少子化対策及び子育てしやすいまちづくりを推進する",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "やまなしKAITEKI住宅普及促進事業",
        "amountOku": 0.124,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "山梨県の「やまなしKAITEKI住宅普及促進事業」を活用し、本市の人口減少対策を",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=12"
      },
      {
        "name": "収入保険加入補助事業",
        "amountOku": 0.09398,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "農業者の経営安定を図り、市の基幹産業である農業振興の推進を目的に、農産物の",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "笛吹市農業塾推進事業",
        "amountOku": 0.084,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "担い手の確保や安定した農業経営に寄与し、市の基幹産業である農業の発展につな",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "社会体育施設整備検討事業",
        "amountOku": 0.07601,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "競技レベルの向上に資する施設の整備が求められている現状を踏まえ、市全体を一",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "空き店舗活用促進補助事業",
        "amountOku": 0.072,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "空き店舗を利用した新規出店を促進し、地域のにぎわいの創出及び本市のイメージ",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      },
      {
        "name": "個別避難計画作成事業",
        "amountOku": 0.06315,
        "kan": null,
        "shisaku": "保健福祉部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "要介護者等の避難行動要支援者について、発災時又は発災のおそれがある場合に円",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=13"
      },
      {
        "name": "衛星回線導入事業",
        "amountOku": 0.05294,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "激甚災害が発生した際、現状の通信ネットワークが使用できなくなることに備え、",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "笛吹市こどもの居場所づくり支援事業",
        "amountOku": 0.035,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子どもが健やかに成長できるよう、孤立や孤独の防止、学びや成長機会の確保を目",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "フリースクール利用支援事業",
        "amountOku": 0.0288,
        "kan": null,
        "shisaku": "教育委員会",
        "kubun": null,
        "prevAmountOku": null,
        "description": "不登校児童生徒の学びの場の一つであるフリースクールについて、不登校児童の学",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=18"
      },
      {
        "name": "入札業務電子化事業",
        "amountOku": 0.0231,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "入札事務の効率化、事業者の利便性の向上及び透明性の向上などを目的に、従来紙",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "電子母子手帳活用促進事業",
        "amountOku": 0.01677,
        "kan": null,
        "shisaku": "子供すこやか部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "子育て支援の向上を図るため、母子健康手帳の記録機能やプッシュ通知型によるお",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=14"
      },
      {
        "name": "契約業務電子化事業",
        "amountOku": 0.00004,
        "kan": null,
        "shisaku": "総務部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "契約行為に係る手続きの迅速化や省力化を図るため、従来紙によって行っている契",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.10",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=10"
      },
      {
        "name": "文化施設整備検討事業",
        "amountOku": 0,
        "kan": null,
        "shisaku": "総合政策部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "既存の文化施設である青楓美術館、八代郷土館、春日居郷土館・小川正子記念館、",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=11"
      },
      {
        "name": "石橋工業団地基盤整備事業",
        "amountOku": 0,
        "kan": null,
        "shisaku": "産業観光部",
        "kubun": null,
        "prevAmountOku": null,
        "description": "地元雇用の創出や市税の税収確保のため、積極的な企業誘致を進めており、今後既",
        "refLabel": "令和8年度 笛吹市当初予算概要（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf#page=15"
      }
    ],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 66857,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 481.59288,
    "prevTotalOku": 454.93102,
    "yoyLabel": "+5.9%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 101.95973,
        "prevV": 99.33332,
        "yoy": 2.6
      },
      {
        "name": "地方交付税",
        "v": 82.844,
        "prevV": 82.991,
        "yoy": -0.2
      },
      {
        "name": "繰入金",
        "v": 76.34442,
        "prevV": 61.44256,
        "yoy": 24.3
      },
      {
        "name": "国庫支出金",
        "v": 57.88451,
        "prevV": 58.8311,
        "yoy": -1.6
      },
      {
        "name": "寄附金",
        "v": 49.3506,
        "prevV": 36.3375,
        "yoy": 35.8
      },
      {
        "name": "市債",
        "v": 47.13836,
        "prevV": 55.991,
        "yoy": -15.8
      },
      {
        "name": "県支出金",
        "v": 26.592,
        "prevV": 23.66648,
        "yoy": 12.4
      },
      {
        "name": "地方消費税交付金",
        "v": 20.836,
        "prevV": 18.256,
        "yoy": 14.1
      },
      {
        "name": "その他",
        "v": 18.643259999999994,
        "prevV": 18.082060000000002,
        "yoy": null,
        "children": [
          {
            "name": "繰越金",
            "v": 4,
            "prevV": 4,
            "yoy": 0
          },
          {
            "name": "地方譲与税",
            "v": 2.809,
            "prevV": 2.803,
            "yoy": 0.2
          },
          {
            "name": "諸収入",
            "v": 2.49536,
            "prevV": 2.50587,
            "yoy": -0.4
          },
          {
            "name": "使用料及び手数料",
            "v": 2.05749,
            "prevV": 1.93856,
            "yoy": 6.1
          },
          {
            "name": "法人事業税交付金",
            "v": 1.671,
            "prevV": 1.613,
            "yoy": 3.6
          },
          {
            "name": "財産収入",
            "v": 1.29248,
            "prevV": 0.90231,
            "yoy": 43.2
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.068,
            "prevV": 0.937,
            "yoy": 14
          },
          {
            "name": "配当割交付金",
            "v": 0.783,
            "prevV": 0.551,
            "yoy": 42.1
          },
          {
            "name": "分担金及び負担金",
            "v": 0.65994,
            "prevV": 1.42991,
            "yoy": -53.8
          },
          {
            "name": "地方特例交付金",
            "v": 0.629,
            "prevV": 0.582,
            "yoy": 8.1
          },
          {
            "name": "環境性能割交付金",
            "v": 0.419,
            "prevV": 0.378,
            "yoy": 10.8
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.374,
            "prevV": 0.358,
            "yoy": 4.5
          },
          {
            "name": "利子割交付金",
            "v": 0.316,
            "prevV": 0.005,
            "yoy": 6220
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.06899,
            "prevV": 0.07841,
            "yoy": -12
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 158.63187,
        "prevV": 151.29775,
        "yoy": 4.8
      },
      {
        "name": "総務費",
        "v": 81.60682,
        "prevV": 66.74248,
        "yoy": 22.3
      },
      {
        "name": "公債費",
        "v": 57.05305,
        "prevV": 62.47448,
        "yoy": -8.7
      },
      {
        "name": "諸支出金",
        "v": 49.69162,
        "prevV": 36.41323,
        "yoy": 36.5
      },
      {
        "name": "教育費",
        "v": 47.91088,
        "prevV": 52.22834,
        "yoy": -8.3
      },
      {
        "name": "土木費",
        "v": 28.3608,
        "prevV": 29.36758,
        "yoy": -3.4
      },
      {
        "name": "消防費",
        "v": 21.3606,
        "prevV": 20.32385,
        "yoy": 5.1
      },
      {
        "name": "衛生費",
        "v": 19.29771,
        "prevV": 18.96967,
        "yoy": 1.7
      },
      {
        "name": "農林水産業費",
        "v": 9.54016,
        "prevV": 9.8201,
        "yoy": -2.9
      },
      {
        "name": "商工費",
        "v": 5.38371,
        "prevV": 4.61096,
        "yoy": 16.8
      },
      {
        "name": "議会費",
        "v": 2.32582,
        "prevV": 2.25552,
        "yoy": 3.1
      },
      {
        "name": "予備費",
        "v": 0.3,
        "prevV": 0.3,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.12984,
        "prevV": 0.12706,
        "yoy": 2.2
      },
      {
        "name": "災害復旧費",
        "v": 0,
        "prevV": 0,
        "yoy": null
      }
    ],
    "sourceTitle": "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260713113932/https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
    "originUrl": "https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
    "sourceLocalUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713113932/https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
        "localUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf",
        "source": "www.city.fuefuki.yamanashi.jp",
        "thumb": "r8toushoyosangaiyou.pdf ・ sha256 9344be2cda43aeb6… ・ 2026-07-13 取得"
      }
    ]
  },
  "222038": {
    "muniCode": "222038",
    "muniName": "沼津市",
    "prefName": "静岡県",
    "isPref": false,
    "projects": [],
    "execution": [],
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185758,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 956,
    "prevTotalOku": 879.6,
    "yoyLabel": "+8.7%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 353,
        "prevV": 343,
        "yoy": 2.9
      },
      {
        "name": "国庫支出金",
        "v": 183.65862,
        "prevV": 160.22076,
        "yoy": 14.6
      },
      {
        "name": "市債",
        "v": 98.828,
        "prevV": 89.816,
        "yoy": 10
      },
      {
        "name": "県支出金",
        "v": 73.38807,
        "prevV": 67.32679,
        "yoy": 9
      },
      {
        "name": "地方消費税交付金",
        "v": 50,
        "prevV": 50,
        "yoy": 0
      },
      {
        "name": "繰入金",
        "v": 46.09275,
        "prevV": 33.38144,
        "yoy": 38.1
      },
      {
        "name": "寄附金",
        "v": 45.00002,
        "prevV": 40.00002,
        "yoy": 12.5
      },
      {
        "name": "地方交付税",
        "v": 39.1,
        "prevV": 34.1,
        "yoy": 14.7
      },
      {
        "name": "その他",
        "v": 66.93254,
        "prevV": 61.75498999999999,
        "yoy": null,
        "children": [
          {
            "name": "諸収入",
            "v": 22.36022,
            "prevV": 18.51552,
            "yoy": 20.8
          },
          {
            "name": "使用料及び手数料",
            "v": 11.47459,
            "prevV": 11.31472,
            "yoy": 1.4
          },
          {
            "name": "法人事業税交付金",
            "v": 5.8,
            "prevV": 5.8,
            "yoy": 0
          },
          {
            "name": "分担金及び負担金",
            "v": 5.17495,
            "prevV": 5.42915,
            "yoy": -4.7
          },
          {
            "name": "地方譲与税",
            "v": 4.97,
            "prevV": 5.25,
            "yoy": -5.3
          },
          {
            "name": "繰越金",
            "v": 4.20761,
            "prevV": 4.10335,
            "yoy": 2.5
          },
          {
            "name": "財産収入",
            "v": 4.16217,
            "prevV": 3.95925,
            "yoy": 5.1
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 3,
            "prevV": 1.5,
            "yoy": 100
          },
          {
            "name": "地方特例交付金",
            "v": 1.85,
            "prevV": 1.95,
            "yoy": -5.1
          },
          {
            "name": "配当割交付金",
            "v": 1.8,
            "prevV": 1.8,
            "yoy": 0
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 1,
            "prevV": 1,
            "yoy": 0
          },
          {
            "name": "環境性能割交付金",
            "v": 0.5,
            "prevV": 0.5,
            "yoy": 0
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.5,
            "prevV": 0.5,
            "yoy": 0
          },
          {
            "name": "利子割交付金",
            "v": 0.13,
            "prevV": 0.13,
            "yoy": 0
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 0.003,
            "prevV": 0.003,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 338.68977,
        "prevV": 303.08896,
        "yoy": 11.7
      },
      {
        "name": "土木費",
        "v": 182.86031,
        "prevV": 176.54397,
        "yoy": 3.6
      },
      {
        "name": "総務費",
        "v": 113.61324,
        "prevV": 104.65779,
        "yoy": 8.6
      },
      {
        "name": "教育費",
        "v": 97.5133,
        "prevV": 84.41782,
        "yoy": 15.5
      },
      {
        "name": "衛生費",
        "v": 96.29153,
        "prevV": 88.82092,
        "yoy": 8.4
      },
      {
        "name": "公債費",
        "v": 66.71735,
        "prevV": 65.32308,
        "yoy": 2.1
      },
      {
        "name": "消防費",
        "v": 30.6765,
        "prevV": 29.49873,
        "yoy": 4
      },
      {
        "name": "商工費",
        "v": 13.72135,
        "prevV": 11.99435,
        "yoy": 14.4
      },
      {
        "name": "農林水産業費",
        "v": 9.11815,
        "prevV": 8.30155,
        "yoy": 9.8
      },
      {
        "name": "議会費",
        "v": 4.59875,
        "prevV": 4.60162,
        "yoy": -0.1
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      },
      {
        "name": "労働費",
        "v": 0.95755,
        "prevV": 0.99701,
        "yoy": -4
      },
      {
        "name": "災害復旧費",
        "v": 0.2422,
        "prevV": 0.3542,
        "yoy": -31.6
      }
    ],
    "sourceTitle": "令和7年度 沼津市予算（款別歳入歳出前年度比較表）",
    "sourceUrl": "https://web.archive.org/web/20260713094056/https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
    "originUrl": "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
    "sourceLocalUrl": "/sources/numazu-yosansho-r7/s-1.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和7年度 沼津市予算（款別歳入歳出前年度比較表）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713094056/https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
        "localUrl": "/sources/numazu-yosansho-r7/s-1.pdf",
        "source": "www.city.numazu.shizuoka.jp",
        "thumb": "s-1.pdf ・ sha256 b51832efcaf08f5e… ・ 2026-07-13 取得"
      }
    ]
  },
  "232076": {
    "muniCode": "232076",
    "muniName": "豊川市",
    "prefName": "愛知県",
    "isPref": false,
    "projects": [
      {
        "name": "特別保育事業",
        "amountOku": 67.91993,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 62.63665,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "市債元金償還金",
        "amountOku": 50.99772,
        "kan": "公債費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 50.5192,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "障害者自立支援事業",
        "amountOku": 50.1917,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 44.08012,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "児童手当支給事業",
        "amountOku": 41.82,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 33.501,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "総合保健センター（仮称）整備事業",
        "amountOku": 38.48573,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.50794,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "東三河広域連合介護保険事業費負担金",
        "amountOku": 23.21692,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 22.80494,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "病院事業会計繰出金",
        "amountOku": 20.51778,
        "kan": "諸支出金",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 19.75593,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "後期高齢者医療療養給付費負担金",
        "amountOku": 19.59396,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 18.51675,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "生活保護扶助事業",
        "amountOku": 19.18778,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 19.32911,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "清掃工場管理運営事業",
        "amountOku": 16.7001,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 16.47104,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "学校給食管理運営事業",
        "amountOku": 14.44116,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 13.50756,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "総合体育館改修事業",
        "amountOku": 12.91059,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 9.98033,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "国民健康保険特別会計繰出金",
        "amountOku": 12.50069,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 12.18592,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "本庁舎等整備事業",
        "amountOku": 12.00438,
        "kan": "総務費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "消防署本署改築事業",
        "amountOku": 11.05259,
        "kan": "消防費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.5472,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "ＩＣＴ教育支援事業",
        "amountOku": 10.70403,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.50997,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "子ども医療費支給事業",
        "amountOku": 10.33777,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 10.10492,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "定額減税不足額給付事業費（物価高騰対応）",
        "amountOku": 8.67583,
        "kan": "総務費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "予防接種事業",
        "amountOku": 8.29204,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 6.80225,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "放課後児童健全育成事業",
        "amountOku": 7.68483,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 6.67233,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "パートタイム会計年度任用職員活用費",
        "amountOku": 6.91363,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 6.77827,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "後期高齢者医療特別会計繰出金",
        "amountOku": 6.89686,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 6.67401,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "児童扶養・遺児手当支給事業",
        "amountOku": 6.31944,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 5.91725,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "下水道事業会計繰出金",
        "amountOku": 5.8039,
        "kan": "諸支出金",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 7.86407,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "愛知御津駅周辺まちづくり整備事業",
        "amountOku": 4.58698,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.84951,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "プリオビル管理運営事業",
        "amountOku": 4.47499,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 4.24523,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "市内道路整備事業",
        "amountOku": 4.3586,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 4.71557,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "豊川駅東土地区画整理事業特別会計繰出金",
        "amountOku": 4.29337,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 12.97321,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "就学前教育・保育施設整備費補助",
        "amountOku": 3.95874,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 4.26875,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "水道事業会計繰出金（物価高騰対応）",
        "amountOku": 3.51063,
        "kan": "諸支出金",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "ごみ収集管理運営事業",
        "amountOku": 3.36264,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 3.24013,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "斎場会館管理運営事業",
        "amountOku": 2.9592,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 3.1299,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "市議会議員報酬等",
        "amountOku": 2.93683,
        "kan": "議会費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.96777,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "小中学校環境対策事業",
        "amountOku": 2.9,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 3.0292,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "健康診査事業",
        "amountOku": 2.76154,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.61876,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "消防車両等整備事業",
        "amountOku": 2.755,
        "kan": "消防費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.1,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "生涯学習センター管理事業",
        "amountOku": 2.41225,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.86136,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "一宮地域交流会館（仮称）整備事業",
        "amountOku": 2.30095,
        "kan": "総務費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "小中学校校舎施設営繕事業",
        "amountOku": 2.13,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.00072,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "三河国府跡保存整備事業",
        "amountOku": 2.0848,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.56535,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "母子保健事業（健康診査）",
        "amountOku": 2.05633,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.08756,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "道路等維持補修事業",
        "amountOku": 1.9813,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.85146,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "公共交通機関等利用促進事業",
        "amountOku": 1.97315,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.40902,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "上宿樽井線（市田野口工区）整備事業",
        "amountOku": 1.96675,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.33025,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "学校給食センター長寿命化事業",
        "amountOku": 1.9,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.29487,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "中央図書館管理運営事業",
        "amountOku": 1.87236,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 2.70433,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "給食費無料化事業",
        "amountOku": 1.82492,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.8314,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "橋りょう整備事業",
        "amountOku": 1.728,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.5202,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "市営住宅長寿命化対策事業",
        "amountOku": 1.704,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.78,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "城跡市役所線整備事業",
        "amountOku": 1.6926,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.93225,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "地区市民館施設整備事業",
        "amountOku": 1.52138,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 4.00089,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "市債等利子償還金",
        "amountOku": 1.43703,
        "kan": "公債費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.04531,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "都市公園整備事業",
        "amountOku": 1.43001,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.12777,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "豊川稲荷門前基盤整備事業",
        "amountOku": 1.37306,
        "kan": "土木費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "児童館管理運営費",
        "amountOku": 1.35006,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.212,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "急傾斜地崩壊対策事業",
        "amountOku": 1.35,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.04,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "橋りょう長寿命化対策事業",
        "amountOku": 1.314,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.47684,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "小学校校舎外壁等改修事業",
        "amountOku": 1.235,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.163,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "伊奈美和通線整備事業",
        "amountOku": 1.21654,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.222,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "豊川西部土地区画整理事業特別会計繰出金",
        "amountOku": 1.18,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.85,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "公共施設整備基金積立金",
        "amountOku": 1.15497,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.5084,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "河川維持管理事業",
        "amountOku": 1.11909,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.96239,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "指定統計調査",
        "amountOku": 1.09727,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.16394,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "交通安全施設整備事業",
        "amountOku": 1.08951,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.08051,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "学級運営支援事業",
        "amountOku": 1.08033,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.91948,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "企業再投資促進補助",
        "amountOku": 1.07713,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 3.26769,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "学校給食費保護者負担軽減事業",
        "amountOku": 1.02244,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.76791,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "小坂井中学校校舎改築等事業",
        "amountOku": 1.01516,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.4619,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "企業立地促進補助",
        "amountOku": 0.99014,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.9642,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "水泳指導支援事業",
        "amountOku": 0.97614,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.2508,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "道路等施設管理事業",
        "amountOku": 0.96709,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.12179,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "固定資産税土地評価鑑定事業",
        "amountOku": 0.95596,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.29728,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "豊川駅東西自由通路等管理事業",
        "amountOku": 0.94759,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.39093,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "マイナンバーカード交付事業",
        "amountOku": 0.93069,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.6069,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "情報技術活用推進事業",
        "amountOku": 0.84504,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 1.35685,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "選挙費",
        "amountOku": 0.75997,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.01766,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "産地パワーアップ事業費補助",
        "amountOku": 0.67637,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.72392,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "就農者確保対策事業",
        "amountOku": 0.54292,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.60507,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "分団詰所整備事業",
        "amountOku": 0.54019,
        "kan": "消防費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.08122,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "市観光協会補助",
        "amountOku": 0.53979,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.50659,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "重層的支援体制整備事業",
        "amountOku": 0.53762,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.51356,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "足山田大木線拡幅改良事業",
        "amountOku": 0.53069,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.01997,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "土地改良事業",
        "amountOku": 0.5145,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.49,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "豊川駅東土地区画整理地内公園整備事業",
        "amountOku": 0.49647,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.06506,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "高齢者能力活用推進事業",
        "amountOku": 0.47969,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.45171,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "(新）戸籍の振り仮名法制化対応事業",
        "amountOku": 0.47266,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "防犯対策事業",
        "amountOku": 0.44772,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.44563,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "一般介護予防事業",
        "amountOku": 0.42683,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.41044,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "子育て応援金支給事業",
        "amountOku": 0.42311,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.42239,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.42214,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.30185,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "市民まつり補助",
        "amountOku": 0.42,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.38,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.39655,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.25442,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "賦課計算事務等委託",
        "amountOku": 0.3885,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.40928,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "新規土地区画整理事業適地調査事業",
        "amountOku": 0.369,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.03784,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "地球温暖化対策事業",
        "amountOku": 0.36702,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.34251,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "要保護児童対策地域協議会事業",
        "amountOku": 0.36405,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.00408,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "立地適正化計画関連事業",
        "amountOku": 0.33823,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.32531,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "一宮大木土地区画整理地内公園整備事業",
        "amountOku": 0.33694,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.06006,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "児童発達相談センター管理運営事業",
        "amountOku": 0.31353,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.18386,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "牛久保駅前整備事業",
        "amountOku": 0.30627,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.06027,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "睦美保育園改築事業",
        "amountOku": 0.30158,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.25513,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "障害者ワークステーション事業",
        "amountOku": 0.28582,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.22838,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.28241,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.20411,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "自転車駐車場管理事業",
        "amountOku": 0.28126,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.14332,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "地震対策事業",
        "amountOku": 0.27809,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.27787,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "都市計画調査事業",
        "amountOku": 0.27284,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.24694,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "桜ヶ丘ミュージアム展示事業",
        "amountOku": 0.25745,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.18897,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "収入保険加入支援事業費補助",
        "amountOku": 0.24,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.24,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "庁舎管理事業",
        "amountOku": 0.23434,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.12029,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "交通安全対策推進事業",
        "amountOku": 0.21822,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.21312,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "認知症総合支援事業",
        "amountOku": 0.2177,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.19345,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "土地改良施設維持管理適正化事業",
        "amountOku": 0.21254,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.16073,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "障害者交通料金助成事業",
        "amountOku": 0.20629,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.20111,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "中心市街地活性化事業",
        "amountOku": 0.20411,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.56581,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "水害ハザードマップ作成等事業",
        "amountOku": 0.19831,
        "kan": "総務費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "空家等対策推進事業",
        "amountOku": 0.18897,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.1787,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "民生委員関係事業",
        "amountOku": 0.18607,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.18283,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "稲荷公園再整備事業",
        "amountOku": 0.18334,
        "kan": "土木費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "文化会館等運営管理検討調査事業",
        "amountOku": 0.18,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.44,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "為当地区工業用地整備推進事業",
        "amountOku": 0.16671,
        "kan": "商工費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "こぎつね教室事業",
        "amountOku": 0.16627,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.14311,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "無電柱化推進事業",
        "amountOku": 0.139,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.21025,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "文化ホール公演事業",
        "amountOku": 0.13095,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.13655,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "地区集会施設建設等事業費補助",
        "amountOku": 0.12938,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.11099,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "私立幼稚園入園応援金支給事業",
        "amountOku": 0.126,
        "kan": "民生費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "森林整備事業",
        "amountOku": 0.121,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.162,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "中部小学校校舎改修事業",
        "amountOku": 0.12,
        "kan": "教育費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "三河一宮駅周辺まちづくり整備事業",
        "amountOku": 0.11927,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.03,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.18",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=18"
      },
      {
        "name": "ＯＣＲ読取機更新事業",
        "amountOku": 0.119,
        "kan": "総務費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "御油松並木土地買上等事業",
        "amountOku": 0.1116,
        "kan": "教育費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "職員研修事業",
        "amountOku": 0.10527,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.09793,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "シティセールス推進事業",
        "amountOku": 0.10021,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.17381,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "第7次総合計画策定事業",
        "amountOku": 0.09983,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.17803,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "スクールソーシャルワーカー配置事業",
        "amountOku": 0.08976,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.07675,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "観光一般事業費",
        "amountOku": 0.08916,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.06009,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "奨学金返還支援事業",
        "amountOku": 0.08811,
        "kan": "労働費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.07371,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "拠点地区定住促進事業",
        "amountOku": 0.086,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.086,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.14",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=14"
      },
      {
        "name": "有価物回収事業費補助",
        "amountOku": 0.08,
        "kan": "衛生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.08,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "企業誘致推進事業",
        "amountOku": 0.07947,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.04616,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "スポーツ・文化活動等合宿支援事業",
        "amountOku": 0.07,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.06546,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "三河国分寺跡保存整備事業",
        "amountOku": 0.06573,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.123,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "キュパティーノ市交流事業",
        "amountOku": 0.06572,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.05616,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "交通安全指導隊支援事業",
        "amountOku": 0.06402,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.05345,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "部活動総合支援事業",
        "amountOku": 0.06076,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.04326,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "スタートアップ連携事業",
        "amountOku": 0.06052,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.04164,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "市営住宅移転事業",
        "amountOku": 0.0545,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.1358,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "中山間地域等直接支払交付金事業",
        "amountOku": 0.05366,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "スポーツ推進員報酬",
        "amountOku": 0.0518,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.0444,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "地域商業強化推進事業",
        "amountOku": 0.05125,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.135,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "白鳥地区工業用地整備推進事業",
        "amountOku": 0.051,
        "kan": "商工費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "市民意識調査事業",
        "amountOku": 0.04542,
        "kan": "総務費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "平和祈念式典開催事業",
        "amountOku": 0.04123,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.02541,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "市民協働推進事業",
        "amountOku": 0.04028,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.04231,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "結婚支援事業",
        "amountOku": 0.03708,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.02337,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "水道事業会計繰出金",
        "amountOku": 0.03426,
        "kan": "諸支出金",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.01507,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "監査委員報酬",
        "amountOku": 0.03268,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.03268,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "スポーツイベント開催支援事業",
        "amountOku": 0.0317,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.03139,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "創業・起業支援事業",
        "amountOku": 0.03112,
        "kan": "商工費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.03262,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      },
      {
        "name": "農業施設災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "林業施設災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "道路橋りょう災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "河川災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "都市計画施設災害復旧事業",
        "amountOku": 0.031,
        "kan": "災害復旧費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.031,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.20",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=20"
      },
      {
        "name": "豊川産農産物普及推進事業",
        "amountOku": 0.0303,
        "kan": "農林水産業費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.02779,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "首都圏人材確保支援事業費補助",
        "amountOku": 0.03,
        "kan": "労働費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.03,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "伝統芸能支援事業",
        "amountOku": 0.0244,
        "kan": "教育費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.01999,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.19",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=19"
      },
      {
        "name": "町内会負担軽減事業",
        "amountOku": 0.02197,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.02245,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.12",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=12"
      },
      {
        "name": "合理的配慮提供支援助成事業",
        "amountOku": 0.0175,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.01816,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "大型運転免許等取得支援事業費補助",
        "amountOku": 0.016,
        "kan": "労働費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.016,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.15",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=15"
      },
      {
        "name": "密集市街地整備事業",
        "amountOku": 0.012,
        "kan": "土木費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.008,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.17",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=17"
      },
      {
        "name": "避難行動要支援者支援事業",
        "amountOku": 0.00677,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.00515,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "難聴高齢者補聴器購入費助成事業",
        "amountOku": 0.006,
        "kan": "民生費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "避難行動要支援者支援事業",
        "amountOku": 0.00588,
        "kan": "民生費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.00368,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.13",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=13"
      },
      {
        "name": "入札及び契約制度改革推進事業",
        "amountOku": 0.00345,
        "kan": "総務費",
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": 0.00331,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.11",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=11"
      },
      {
        "name": "事業承継支援事業",
        "amountOku": 0.002,
        "kan": "商工費",
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": 0,
        "description": "",
        "refLabel": "令和7年度 豊川市予算（款別歳入歳出） p.16",
        "refLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf#page=16"
      }
    ],
    "execution": [],
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185900,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 835.5,
    "prevTotalOku": 723.7,
    "yoyLabel": "+15.4%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 308.94889,
        "prevV": 290.9084,
        "yoy": 6.2
      },
      {
        "name": "国庫支出金",
        "v": 149.87674,
        "prevV": 114.90677,
        "yoy": 30.4
      },
      {
        "name": "地方交付税",
        "v": 74.5,
        "prevV": 66.5,
        "yoy": 12
      },
      {
        "name": "市債",
        "v": 70.228,
        "prevV": 39.851,
        "yoy": 76.2
      },
      {
        "name": "県支出金",
        "v": 62.64717,
        "prevV": 54.08068,
        "yoy": 15.8
      },
      {
        "name": "地方消費税交付金",
        "v": 46,
        "prevV": 45,
        "yoy": 2.2
      },
      {
        "name": "繰入金",
        "v": 40.5791,
        "prevV": 27.54841,
        "yoy": 47.3
      },
      {
        "name": "諸収入",
        "v": 34.37902,
        "prevV": 32.06282,
        "yoy": 7.2
      },
      {
        "name": "その他",
        "v": 48.34108000000001,
        "prevV": 52.84192,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 9.9171,
            "prevV": 9.52008,
            "yoy": 4.2
          },
          {
            "name": "財産収入",
            "v": 7.15943,
            "prevV": 4.81156,
            "yoy": 48.8
          },
          {
            "name": "繰越金",
            "v": 7,
            "prevV": 7,
            "yoy": 0
          },
          {
            "name": "法人事業税交付金",
            "v": 6.5,
            "prevV": 5.3,
            "yoy": 22.6
          },
          {
            "name": "地方譲与税",
            "v": 6.22,
            "prevV": 6.17,
            "yoy": 0.8
          },
          {
            "name": "地方特例交付金",
            "v": 2.61001,
            "prevV": 11.14001,
            "yoy": -76.6
          },
          {
            "name": "分担金及び負担金",
            "v": 2.41811,
            "prevV": 3.19253,
            "yoy": -24.3
          },
          {
            "name": "配当割交付金",
            "v": 2.2,
            "prevV": 2,
            "yoy": 10
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 1.6,
            "prevV": 1,
            "yoy": 60
          },
          {
            "name": "環境性能割交付金",
            "v": 1.6,
            "prevV": 1.4,
            "yoy": 14.3
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.57,
            "prevV": 0.74,
            "yoy": -23
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.28,
            "prevV": 0.31,
            "yoy": -9.7
          },
          {
            "name": "国有提供施設等",
            "v": 0.15641,
            "prevV": 0.15772,
            "yoy": -0.8
          },
          {
            "name": "利子割交付金",
            "v": 0.11,
            "prevV": 0.1,
            "yoy": 10
          },
          {
            "name": "自動車取得税交付金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          },
          {
            "name": "寄附金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 336.25394,
        "prevV": 310.50441,
        "yoy": 8.3
      },
      {
        "name": "総務費",
        "v": 101.34081,
        "prevV": 76.61691,
        "yoy": 32.3
      },
      {
        "name": "衛生費",
        "v": 96.71328,
        "prevV": 58.37248,
        "yoy": 65.7
      },
      {
        "name": "教育費",
        "v": 89.73728,
        "prevV": 83.00343,
        "yoy": 8.1
      },
      {
        "name": "土木費",
        "v": 62.01289,
        "prevV": 58.22041,
        "yoy": 6.5
      },
      {
        "name": "公債費",
        "v": 52.43475,
        "prevV": 51.56451,
        "yoy": 1.7
      },
      {
        "name": "消防費",
        "v": 36.07701,
        "prevV": 24.44737,
        "yoy": 47.6
      },
      {
        "name": "諸支出金",
        "v": 29.86657,
        "prevV": 27.63507,
        "yoy": 8.1
      },
      {
        "name": "商工費",
        "v": 17.65334,
        "prevV": 20.22871,
        "yoy": -12.7
      },
      {
        "name": "農林水産業費",
        "v": 7.32296,
        "prevV": 7.16481,
        "yoy": 2.2
      },
      {
        "name": "議会費",
        "v": 4.16854,
        "prevV": 4.17277,
        "yoy": -0.1
      },
      {
        "name": "労働費",
        "v": 1.36363,
        "prevV": 1.21412,
        "yoy": 12.3
      },
      {
        "name": "予備費",
        "v": 0.4,
        "prevV": 0.4,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.155,
        "prevV": 0.155,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和7年度 豊川市予算（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20260208071246/https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
    "originUrl": "https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
    "sourceLocalUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和7年度 豊川市予算（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260208071246/https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
        "localUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf",
        "source": "www.city.toyokawa.lg.jp",
        "thumb": "R7_yosann.pdf ・ sha256 f59f68ba2279d311… ・ 2026-07-13 取得"
      }
    ]
  },
  "272191": {
    "muniCode": "272191",
    "muniName": "和泉市",
    "prefName": "大阪府",
    "isPref": false,
    "projects": [
      {
        "name": "（仮称）富秋学園整備事業",
        "amountOku": 59.12885,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "お買い物割引チケット事業（国の交付金を活用）",
        "amountOku": 12.18861,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "小中学校大規模改修事業",
        "amountOku": 10.5379,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "（仮称）いずみ国府こども園整備事業",
        "amountOku": 8.30087,
        "kan": null,
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "青少年の家リニューアル事業",
        "amountOku": 7.149,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "小中学校給食費補助事業",
        "amountOku": 5.98,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "新設認定こども園整備補助事業（中部地域）",
        "amountOku": 4.76915,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "（仮称）防災備蓄倉庫整備事業",
        "amountOku": 4.195,
        "kan": null,
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "富秋中学校区等まちづくり推進事業",
        "amountOku": 3.09487,
        "kan": null,
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "水道料金減額による生活支援事業（国の交付金を活用）",
        "amountOku": 2.81489,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "小中学校大型モニター（次世代型電子黒板）整備事業",
        "amountOku": 2.37,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "中学校少人数学級編制事業、学力向上推進事業",
        "amountOku": 2.17727,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "黒鳥山公園整備事業",
        "amountOku": 2.14,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "電子地域ポイント事業",
        "amountOku": 1.60321,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "池上曽根史跡公園整備事業",
        "amountOku": 0.76748,
        "kan": null,
        "shisaku": "",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "７０周年市民提案特別記念事業(ドローンショーなど)",
        "amountOku": 0.584,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "上記以外の記念事業(いずもく製「記念ものさし」、公開番組など)",
        "amountOku": 0.42177,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "こども家庭相談事業",
        "amountOku": 0.41354,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "医療的ケア機能を備えた民間保育施設への看護師配置支援事業",
        "amountOku": 0.3482,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      },
      {
        "name": "デイタイム救急隊の設立",
        "amountOku": 0.30507,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "防犯灯電気料金の全額補助",
        "amountOku": 0.30449,
        "kan": null,
        "shisaku": "",
        "kubun": "拡充",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "地域交通共創モデル事業",
        "amountOku": 0.27296,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "だんじり曳行事業",
        "amountOku": 0.27163,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "美術館記念事業(ﾌﾟﾛｼﾞｪｸｼｮﾝﾏｯﾋﾟﾝｸﾞ、ﾅｲﾄﾐｭｰｼﾞｱﾑなど)",
        "amountOku": 0.15489,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "チャレンジオフィスの開設",
        "amountOku": 0.11344,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "７０周年記念式典事業",
        "amountOku": 0.0707,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "タイムカプセル開封事業",
        "amountOku": 0.05716,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.3",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=3"
      },
      {
        "name": "５歳児健診事業",
        "amountOku": 0.02474,
        "kan": null,
        "shisaku": "",
        "kubun": "新規",
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括） p.2",
        "refLocalUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf#page=2"
      }
    ],
    "execution": [],
    "fy": "R8",
    "fyLabel": "令和8年度 当初予算",
    "population": 182481,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 904,
    "prevTotalOku": 832,
    "yoyLabel": "+8.7%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 259.51735,
        "prevV": 250.79276,
        "yoy": 3.5
      },
      {
        "name": "国庫支出金",
        "v": 221.08682,
        "prevV": 214.0801,
        "yoy": 3.3
      },
      {
        "name": "地方交付税",
        "v": 120,
        "prevV": 110,
        "yoy": 9.1
      },
      {
        "name": "府支出金",
        "v": 77.18845,
        "prevV": 69.30654,
        "yoy": 11.4
      },
      {
        "name": "市債",
        "v": 72.322,
        "prevV": 42.044,
        "yoy": 72
      },
      {
        "name": "地方消費税交付金",
        "v": 48,
        "prevV": 44,
        "yoy": 9.1
      },
      {
        "name": "繰入金",
        "v": 46.16109,
        "prevV": 45.36523,
        "yoy": 1.8
      },
      {
        "name": "寄附金",
        "v": 15.75,
        "prevV": 13.35,
        "yoy": 18
      },
      {
        "name": "その他",
        "v": 43.974289999999996,
        "prevV": 43.06137,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 11.7078,
            "prevV": 11.64223,
            "yoy": 0.6
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 4.5,
            "prevV": 4,
            "yoy": 12.5
          },
          {
            "name": "法人事業税交付金",
            "v": 4.5,
            "prevV": 5.1,
            "yoy": -11.8
          },
          {
            "name": "諸収入",
            "v": 4.29646,
            "prevV": 4.55266,
            "yoy": -5.6
          },
          {
            "name": "地方譲与税",
            "v": 3.61476,
            "prevV": 3.61476,
            "yoy": 0
          },
          {
            "name": "配当割交付金",
            "v": 3.5,
            "prevV": 2.6,
            "yoy": 34.6
          },
          {
            "name": "助成交付金地方特例交付金",
            "v": 2.82305,
            "prevV": 2.10012,
            "yoy": 34.4
          },
          {
            "name": "財産収入",
            "v": 2.70594,
            "prevV": 2.71274,
            "yoy": -0.3
          },
          {
            "name": "分担金及び負担金",
            "v": 2.46836,
            "prevV": 2.2124,
            "yoy": 11.6
          },
          {
            "name": "国有提供施設等所在市町村",
            "v": 2.22282,
            "prevV": 2.16082,
            "yoy": 2.9
          },
          {
            "name": "利子割交付金",
            "v": 0.9,
            "prevV": 0.7,
            "yoy": 28.6
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.38,
            "prevV": 0.38,
            "yoy": 0
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.2051,
            "prevV": 0.23564,
            "yoy": -13
          },
          {
            "name": "環境性能割交付金",
            "v": 0.15,
            "prevV": 1.05,
            "yoy": -85.7
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 448.55735,
        "prevV": 421.81456,
        "yoy": 6.3
      },
      {
        "name": "教育費",
        "v": 149.50858,
        "prevV": 103.89179,
        "yoy": 43.9
      },
      {
        "name": "総務費",
        "v": 70.4305,
        "prevV": 85.95277,
        "yoy": -18.1
      },
      {
        "name": "衛生費",
        "v": 63.86919,
        "prevV": 61.48605,
        "yoy": 3.9
      },
      {
        "name": "土木費",
        "v": 56.06067,
        "prevV": 57.32635,
        "yoy": -2.2
      },
      {
        "name": "公債費",
        "v": 55.53361,
        "prevV": 55.56034,
        "yoy": 0
      },
      {
        "name": "消防費",
        "v": 21.06485,
        "prevV": 19.863,
        "yoy": 6.1
      },
      {
        "name": "諸支出金",
        "v": 19.11303,
        "prevV": 12.57817,
        "yoy": 52
      },
      {
        "name": "商工費",
        "v": 10.87849,
        "prevV": 4.25318,
        "yoy": 155.8
      },
      {
        "name": "議会費",
        "v": 4.47618,
        "prevV": 4.28449,
        "yoy": 4.5
      },
      {
        "name": "農林水産業費",
        "v": 3.50751,
        "prevV": 3.98926,
        "yoy": -12.1
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      },
      {
        "name": "災害復旧費",
        "v": 0.00004,
        "prevV": 0.00004,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括）",
    "sourceUrl": "https://web.archive.org/web/20260713094338/https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
    "originUrl": "https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
    "sourceLocalUrl": "/sources/izumi-yosansho-r8/02_R8_ippan.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20260713094338/https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
        "localUrl": "/sources/izumi-yosansho-r8/02_R8_ippan.pdf",
        "source": "www.city.osaka-izumi.lg.jp",
        "thumb": "02_R8_ippan.pdf ・ sha256 9131903e5be481cc… ・ 2026-07-13 取得"
      }
    ]
  },
  "352039": {
    "muniCode": "352039",
    "muniName": "山口市",
    "prefName": "山口県",
    "isPref": false,
    "projects": [
      {
        "name": "障害福祉サービス給付事業",
        "amountOku": 41.67303,
        "kan": null,
        "shisaku": "障がい者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.119",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=119"
      },
      {
        "name": "児童手当支給費",
        "amountOku": 37.23126,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "私立保育園運営費",
        "amountOku": 31.7219,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "介護保険特別会計繰出金",
        "amountOku": 27.60644,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "生活保護扶助費",
        "amountOku": 26.158,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "山口県後期高齢者医療広域",
        "amountOku": 24.435,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "認定こども園運営費",
        "amountOku": 21.94603,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "公共下水道会計負担金",
        "amountOku": 19.17812,
        "kan": null,
        "shisaku": "適切な汚水処理による水環境の保全",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.135",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=135"
      },
      {
        "name": "新本庁舎整備事業費",
        "amountOku": 16.28043,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "国民健康保険特別会計繰出",
        "amountOku": 14.69093,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "障害児施設サービス給付事",
        "amountOku": 13.60374,
        "kan": null,
        "shisaku": "障がい者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
      },
      {
        "name": "清掃工場管理運営費",
        "amountOku": 11.44752,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      },
      {
        "name": "予防接種事業費",
        "amountOku": 11.28782,
        "kan": null,
        "shisaku": "健康づくりの推進と地域医療の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.117",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=117"
      },
      {
        "name": "学校給食運営費",
        "amountOku": 11.04549,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "平川地域交流センター建設",
        "amountOku": 10.53446,
        "kan": null,
        "shisaku": "安心して暮らせる日常生活圏の形成",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.152",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=152"
      },
      {
        "name": "放課後児童クラブ運営費",
        "amountOku": 10.09233,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "後期高齢者医療特別会計繰",
        "amountOku": 9.75662,
        "kan": null,
        "shisaku": "社会保障制度の適正な運用",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.121",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=121"
      },
      {
        "name": "仁保の郷整備事業費",
        "amountOku": 9.22714,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
      },
      {
        "name": "こども医療費助成事業費",
        "amountOku": 8.21539,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "消防指令センター共同整備",
        "amountOku": 8.10306,
        "kan": null,
        "shisaku": "消防・救急体制の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.133",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=133"
      },
      {
        "name": "重度心身障害者医療費助成",
        "amountOku": 7.62394,
        "kan": null,
        "shisaku": "障がい者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
      },
      {
        "name": "中小企業等金融対策事業費",
        "amountOku": 7.26042,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
      },
      {
        "name": "生活道路改良事業費",
        "amountOku": 7.18947,
        "kan": null,
        "shisaku": "快適な道路交通網の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
      },
      {
        "name": "児童扶養手当等支給事業費",
        "amountOku": 7.10087,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "市立保育園管理運営費",
        "amountOku": 7.00427,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "小学校施設長寿命化事業費",
        "amountOku": 5.6949,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "海岸保全施設整備事業費",
        "amountOku": 5.09373,
        "kan": null,
        "shisaku": "防災対策の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.130",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=130"
      },
      {
        "name": "立地等奨励金",
        "amountOku": 4.9893,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
      },
      {
        "name": "養護老人ホーム措置費",
        "amountOku": 4.42505,
        "kan": null,
        "shisaku": "高齢者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.118",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=118"
      },
      {
        "name": "乳幼児医療費助成事業費",
        "amountOku": 4.42392,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.114",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=114"
      },
      {
        "name": "山口市中心市街地周辺地区",
        "amountOku": 4.182,
        "kan": null,
        "shisaku": "コンパクトで暮らしやすいまちづくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.139",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=139"
      },
      {
        "name": "中学校ＩＣＴ教育推進事業費",
        "amountOku": 3.87521,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.125",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=125"
      },
      {
        "name": "小学校管理運営費",
        "amountOku": 3.85139,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "庁舎維持管理費",
        "amountOku": 3.78484,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "多面的機能支払交付金事業",
        "amountOku": 3.70108,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.148",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=148"
      },
      {
        "name": "地域型保育運営費",
        "amountOku": 3.62061,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "橋りょう長寿命化対策事業",
        "amountOku": 3.57079,
        "kan": null,
        "shisaku": "快適な道路交通網の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
      },
      {
        "name": "ＷＡＮ関連事業費",
        "amountOku": 3.55156,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "常備消防自動車整備事業費",
        "amountOku": 3.53237,
        "kan": null,
        "shisaku": "消防・救急体制の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.133",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=133"
      },
      {
        "name": "産業交流拠点施設管理運営",
        "amountOku": 3.37802,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
      },
      {
        "name": "鋳銭司第二団地整備事業特",
        "amountOku": 3.37079,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.146",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=146"
      },
      {
        "name": "ごみ収集運搬費",
        "amountOku": 3.3271,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      },
      {
        "name": "電算システム開発事業費",
        "amountOku": 3.30018,
        "kan": null,
        "shisaku": "計画的、効果的な行政経営と更なる市民サービスの向上",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.155",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=155"
      },
      {
        "name": "中学校施設長寿命化事業費",
        "amountOku": 3.23948,
        "kan": null,
        "shisaku": "教育環境の充実と整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.123",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=123"
      },
      {
        "name": "地域包括支援センター運営",
        "amountOku": 3.20311,
        "kan": null,
        "shisaku": "高齢者福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.118",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=118"
      },
      {
        "name": "ふるさと産品営業推進事業",
        "amountOku": 3.1231,
        "kan": null,
        "shisaku": "商工業・サービス業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.145",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=145"
      },
      {
        "name": "私立保育園特別保育事業費",
        "amountOku": 2.97504,
        "kan": null,
        "shisaku": "子ども・子育て支援の充実と環境整備",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.115",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=115"
      },
      {
        "name": "山口情報芸術センター管理",
        "amountOku": 2.89757,
        "kan": null,
        "shisaku": "文化・芸術・歴史の継承と創造",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.126",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=126"
      },
      {
        "name": "中間処理センター管理費",
        "amountOku": 2.89445,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      },
      {
        "name": "市議会議員報酬等",
        "amountOku": 2.7358,
        "kan": null,
        "shisaku": "公正、確実な事務の執行",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.157",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=157"
      },
      {
        "name": "社会福祉協議会助成事業費",
        "amountOku": 2.69291,
        "kan": null,
        "shisaku": "地域福祉の充実",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.120",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=120"
      },
      {
        "name": "図書館管理運営費",
        "amountOku": 2.58986,
        "kan": null,
        "shisaku": "生涯学習・社会教育の推進",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.125",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=125"
      },
      {
        "name": "農業集落排水事業経営支援",
        "amountOku": 2.58969,
        "kan": null,
        "shisaku": "適切な汚水処理による水環境の保全",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.135",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=135"
      },
      {
        "name": "湯田温泉まちなか整備事業",
        "amountOku": 2.53987,
        "kan": null,
        "shisaku": "コンパクトで暮らしやすいまちづくり",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.138",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=138"
      },
      {
        "name": "県事業負担金",
        "amountOku": 2.5374,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.148",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=148"
      },
      {
        "name": "山口情報芸術センター企画",
        "amountOku": 2.49695,
        "kan": null,
        "shisaku": "文化・芸術・歴史の継承と創造",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.126",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=126"
      },
      {
        "name": "中山間地域等直接支払事業",
        "amountOku": 2.46003,
        "kan": null,
        "shisaku": "農林業の振興",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.147",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=147"
      },
      {
        "name": "道路維持補修事業費",
        "amountOku": 2.43057,
        "kan": null,
        "shisaku": "快適な道路交通網の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.140",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=140"
      },
      {
        "name": "幹線バス確保維持事業費",
        "amountOku": 2.40117,
        "kan": null,
        "shisaku": "持続可能な公共交通の構築",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.142",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=142"
      },
      {
        "name": "環境センター管理運営費",
        "amountOku": 2.39738,
        "kan": null,
        "shisaku": "自然環境の保全と衛生的な生活環境の維持",
        "kubun": null,
        "prevAmountOku": null,
        "description": "",
        "refLabel": "令和7年度 山口市当初予算資料（款別歳入歳出） p.137",
        "refLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf#page=137"
      }
    ],
    "execution": [],
    "fy": "R7",
    "fyLabel": "令和7年度 当初予算",
    "population": 185982,
    "populationLabel": "住民基本台帳人口（総務省 令和6年度決算）",
    "totalOku": 969,
    "prevTotalOku": 1092,
    "yoyLabel": "-11.3%",
    "prevBasis": "当初",
    "revenue": [
      {
        "name": "市税",
        "v": 287.55798,
        "prevV": 275.94032,
        "yoy": 4.2
      },
      {
        "name": "地方交付税",
        "v": 178.97,
        "prevV": 178.6,
        "yoy": 0.2
      },
      {
        "name": "国庫支出金",
        "v": 144.71722,
        "prevV": 149.73492,
        "yoy": -3.4
      },
      {
        "name": "市債",
        "v": 94.682,
        "prevV": 202.588,
        "yoy": -53.3
      },
      {
        "name": "県支出金",
        "v": 77.15205,
        "prevV": 69.78553,
        "yoy": 10.6
      },
      {
        "name": "地方消費税交付金",
        "v": 55.7,
        "prevV": 47.3,
        "yoy": 17.8
      },
      {
        "name": "繰入金",
        "v": 48.68268,
        "prevV": 70.78437,
        "yoy": -31.2
      },
      {
        "name": "諸収入",
        "v": 31.94902,
        "prevV": 32.85137,
        "yoy": -2.7
      },
      {
        "name": "その他",
        "v": 49.58904999999999,
        "prevV": 64.41549,
        "yoy": null,
        "children": [
          {
            "name": "使用料及び手数料",
            "v": 10.1454,
            "prevV": 10.53793,
            "yoy": -3.7
          },
          {
            "name": "分担金及び負担金",
            "v": 8.32124,
            "prevV": 17.05189,
            "yoy": -51.2
          },
          {
            "name": "地方譲与税",
            "v": 8.22216,
            "prevV": 7.34476,
            "yoy": 11.9
          },
          {
            "name": "寄附金",
            "v": 6.13135,
            "prevV": 6.13136,
            "yoy": 0
          },
          {
            "name": "法人事業税交付金",
            "v": 5.44,
            "prevV": 4.66,
            "yoy": 16.7
          },
          {
            "name": "株式等譲渡所得割交付金",
            "v": 3.01,
            "prevV": 1.5,
            "yoy": 100.7
          },
          {
            "name": "財産収入",
            "v": 2.18889,
            "prevV": 3.71954,
            "yoy": -41.2
          },
          {
            "name": "配当割交付金",
            "v": 1.87,
            "prevV": 1.19,
            "yoy": 57.1
          },
          {
            "name": "地方特例交付金",
            "v": 1.75,
            "prevV": 10.27,
            "yoy": -83
          },
          {
            "name": "環境性能割交付金",
            "v": 0.98,
            "prevV": 0.7,
            "yoy": 40
          },
          {
            "name": "ゴルフ場利用税交付金",
            "v": 0.51,
            "prevV": 0.51,
            "yoy": 0
          },
          {
            "name": "利子割交付金",
            "v": 0.39,
            "prevV": 0.17,
            "yoy": 129.4
          },
          {
            "name": "交通安全対策特別交付金",
            "v": 0.35,
            "prevV": 0.35,
            "yoy": 0
          },
          {
            "name": "国有提供施設等所在市町村助成交付金",
            "v": 0.28,
            "prevV": 0.28,
            "yoy": 0
          },
          {
            "name": "繰越金",
            "v": 0.00001,
            "prevV": 0.00001,
            "yoy": 0
          }
        ]
      }
    ],
    "expenditure": [
      {
        "name": "民生費",
        "v": 357.22138,
        "prevV": 343.02905,
        "yoy": 4.1
      },
      {
        "name": "総務費",
        "v": 140.12129,
        "prevV": 233.2113,
        "yoy": -39.9
      },
      {
        "name": "公債費",
        "v": 108.15089,
        "prevV": 102.7464,
        "yoy": 5.3
      },
      {
        "name": "土木費",
        "v": 82.73864,
        "prevV": 91.3529,
        "yoy": -9.4
      },
      {
        "name": "衛生費",
        "v": 72.72104,
        "prevV": 69.63722,
        "yoy": 4.4
      },
      {
        "name": "教育費",
        "v": 68.82377,
        "prevV": 71.82561,
        "yoy": -4.2
      },
      {
        "name": "消防費",
        "v": 47.26333,
        "prevV": 64.07741,
        "yoy": -26.2
      },
      {
        "name": "農林水産業費",
        "v": 47.21214,
        "prevV": 40.09788,
        "yoy": 17.7
      },
      {
        "name": "商工費",
        "v": 34.93878,
        "prevV": 67.16884,
        "yoy": -48
      },
      {
        "name": "議会費",
        "v": 4.03818,
        "prevV": 4.23641,
        "yoy": -4.7
      },
      {
        "name": "災害復旧費",
        "v": 3.59456,
        "prevV": 2.09756,
        "yoy": 71.4
      },
      {
        "name": "労働費",
        "v": 1.176,
        "prevV": 1.51942,
        "yoy": -22.6
      },
      {
        "name": "予備費",
        "v": 1,
        "prevV": 1,
        "yoy": 0
      }
    ],
    "sourceTitle": "令和7年度 山口市当初予算資料（款別歳入歳出）",
    "sourceUrl": "https://web.archive.org/web/20250815060151/https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
    "originUrl": "https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
    "sourceLocalUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf",
    "pagesLabel": "款別歳入歳出",
    "evidence": [
      {
        "title": "令和7年度 山口市当初予算資料（款別歳入歳出）",
        "type": "PDF",
        "url": "https://web.archive.org/web/20250815060151/https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
        "localUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf",
        "source": "www.city.yamaguchi.lg.jp",
        "thumb": "105329.pdf ・ sha256 bf258ef90f57f599… ・ 2026-07-13 取得"
      }
    ]
  }
};

/** budget 階層（予算ベースの款別ダッシュボードを持つ）自治体の団体コード */
export const BUDGET_MUNIS: string[] = ["232076","352039","222038","272191","192112","192023","192082","190004"];
