// ============================================================================
// 予算トレース — データレイヤー
// 款レベルの数値は甲府市公表の令和8年度当初予算（総額918億円）の実データ。
// 項以下の内訳・補正・執行率・議会の会派別賛否などは推計・ダミー。
// ============================================================================

// ---- 型 --------------------------------------------------------------------
export interface BudgetNode {
  name: string;
  v: number;
  children?: BudgetNode[];
  synth?: boolean;
  share?: number;
  proj?: Project;
}

export interface Party {
  name: string;
  seats: number;
  stance: string;
}

export interface Council {
  body: string;
  seats: number;
  decided: string;
  vote: { approve: number; oppose: number; absent: number };
  parties: Party[];
}

export interface Municipality {
  name: string;
  total: number;
  yoy: string;
  year: string;
  pop: number;
  households: number;
  council: Council;
  revenue: BudgetNode[];
  expenditure: BudgetNode[];
}

export interface Contract {
  to: string;
  desc: string;
  method: string;
  amt: number;
  bid?: string;
}

export interface Kpi {
  n: string;
  t: string;
  a: string;
  ok: boolean;
}

export interface Evidence {
  title: string;
  type: string;
  source: string;
  thumb: string;
}

export interface Project {
  id: string;
  name: string;
  kan: string;
  ko: string;
  moku: string;
  dept: string;
  period: string;
  themes: string[];
  budget: number;
  spent: number;
  hosei?: { delta: number; reason: string };
  summary: string;
  purpose: string;
  desc: string;
  plan: number[];
  actual: number[];
  kpis?: Kpi[];
  contracts: Contract[];
  evidence: Evidence[];
  past: { y: string; b: number; e: number }[];
}

export interface Theme {
  name: string;
  intent: string;
  ids: string[];
}

// ---- パレット --------------------------------------------------------------
export const P_BLUE = ['#55BBE4','#31586E','#6FC5E9','#84A0B0','#0F5E84','#A9D9EC','#527E96','#C5DFEC','#0C82B4','#93AEBD','#8494A0','#3EA9D8'];
// カラフルモード：Okabe-Ito（色覚多様性に配慮した配色）ベース
export const P_VIVID = ['#0072B2','#E69F00','#009E73','#CC79A7','#56B4E9','#D55E00','#7B5AA6','#8C564B','#66A61E','#B8A016','#17A2B8','#5C6B77'];

// 現在アクティブなパレット（colorMode に応じて描画前に setPalette() で切り替え）
export let PALETTE: string[] = P_VIVID;
export function setPalette(mode: string) {
  PALETTE = mode === '青系' ? P_BLUE : P_VIVID;
}

// ---- 地域 ------------------------------------------------------------------
export const REGIONS = [
  { name:'北海道', color:'#DCE4EE', prefs:[['北海道',14,1]] },
  { name:'東北', color:'#D9E8E1', prefs:[['青森県',14,2],['秋田県',13,3],['岩手県',14,3],['山形県',13,4],['宮城県',14,4],['福島県',13,5]] },
  { name:'関東', color:'#F0E4D3', prefs:[['群馬県',12,6],['栃木県',13,6],['茨城県',14,6],['埼玉県',12,7],['千葉県',14,7],['東京都',13,7],['神奈川県',12,8]] },
  { name:'中部', color:'#E6DFEE', prefs:[['新潟県',12,5],['富山県',10,6],['石川県',9,6],['福井県',9,7],['長野県',11,6],['岐阜県',10,7],['山梨県',11,7],['静岡県',11,8],['愛知県',10,8]] },
  { name:'近畿', color:'#DCE9EC', prefs:[['滋賀県',8,7],['京都府',7,7],['兵庫県',6,7],['大阪府',7,8],['奈良県',8,8],['三重県',9,8],['和歌山県',7,9]] },
  { name:'中国', color:'#EAE8D6', prefs:[['鳥取県',5,7],['島根県',4,7],['岡山県',5,8],['広島県',4,8],['山口県',3,8]] },
  { name:'四国', color:'#F0DEDC', prefs:[['香川県',5,9],['徳島県',6,9],['愛媛県',4,9],['高知県',5,10]] },
  { name:'九州・沖縄', color:'#E4E0D6', prefs:[['福岡県',2,9],['佐賀県',1,9],['長崎県',1,10],['大分県',3,9],['熊本県',2,10],['宮崎県',3,10],['鹿児島県',2,11],['沖縄県',1,13]] },
];

export const YAMANASHI_MUNIS = ['甲府市','富士吉田市','都留市','山梨市','大月市','韮崎市','南アルプス市','北杜市','甲斐市','笛吹市','上野原市','甲州市','中央市','市川三郷町','身延町','富士川町','昭和町','忍野村','山中湖村','富士河口湖町'];

// ---- 甲府市 R8 当初予算（款レベル実データ） --------------------------------
export const KOFU: Municipality = {
  name:'甲府市', total: 918.0, yoy:'+4.2%', year:'令和8年度 当初予算', pop:186000, households:89000,
  council: { body:'甲府市議会', seats:32, decided:'令和8年3月定例会（令和8年3月24日）',
    vote:{ approve:26, oppose:4, absent:2 },
    parties:[
      { name:'創政こうふ（自民党系）', seats:9, stance:'賛成' },
      { name:'政友クラブ（自民党系）', seats:7, stance:'賛成' },
      { name:'公明党', seats:5, stance:'賛成' },
      { name:'立憲・市民フォーラム', seats:5, stance:'賛成' },
      { name:'日本共産党', seats:4, stance:'反対' },
      { name:'無所属', seats:2, stance:'退席・欠席' } ] },
  revenue: [
    { name:'市税', v:317.0, children:[
      { name:'市民税', v:139.8 },{ name:'固定資産税', v:135.8 },{ name:'都市計画税', v:19.2 },{ name:'市たばこ税', v:13.5 },{ name:'軽自動車税', v:4.9 },{ name:'その他市税', v:3.8 }] },
    { name:'国庫支出金', v:173.0 },
    { name:'地方交付税', v:111.0 },
    { name:'県支出金', v:79.0 },
    { name:'地方消費税交付金', v:60.0 },
    { name:'繰入金', v:51.0 },
    { name:'寄附金', v:45.0 },
    { name:'市債', v:33.0 },
    { name:'諸収入・その他', v:49.0 },
  ],
  expenditure: [
    { name:'民生費', v:389.0, children:[
      { name:'社会福祉費', v:142.5 },
      { name:'児童福祉費', v:151.0, children:[
        { name:'児童福祉総務費', v:40.1 },
        { name:'児童措置費', v:68.4, children:[
          { name:'扶助費', v:58.4 },{ name:'委託料', v:6.1 },{ name:'負担金、補助及び交付金', v:2.8 },{ name:'需用費', v:1.1 }] },
        { name:'保育所費', v:32.4 },
        { name:'児童福祉施設費', v:10.1 }] },
      { name:'生活保護費', v:84.6 },
      { name:'国民年金費', v:10.4 },
      { name:'災害救助費', v:0.5 }] },
    { name:'総務費', v:135.0, children:[{ name:'総務管理費', v:97.6 },{ name:'徴税費', v:14.0 },{ name:'企画費', v:10.0 },{ name:'戸籍住民基本台帳費', v:9.2 },{ name:'選挙費', v:3.0 },{ name:'統計調査費', v:1.2 }] },
    { name:'衛生費', v:101.0, children:[{ name:'保健衛生費', v:47.4 },{ name:'清掃費', v:53.6 }] },
    { name:'教育費', v:88.0, children:[{ name:'教育総務費', v:18.0 },{ name:'小学校費', v:21.1 },{ name:'中学校費', v:12.5 },{ name:'幼稚園費', v:6.0 },{ name:'社会教育費', v:14.5 },{ name:'保健体育費', v:15.9 }] },
    { name:'公債費', v:80.0, children:[{ name:'元金', v:70.0 },{ name:'利子', v:9.7 },{ name:'公債諸費', v:0.3 }] },
    { name:'土木費', v:67.0, children:[
      { name:'道路橋りょう費', v:24.2, children:[
        { name:'道路橋りょう総務費', v:3.6 },
        { name:'道路維持費', v:12.4, children:[{ name:'工事請負費', v:8.3 },{ name:'委託料', v:2.6 },{ name:'需用費', v:0.9 },{ name:'原材料費', v:0.6 }] },
        { name:'道路新設改良費', v:6.1 },
        { name:'橋りょう維持費', v:2.1 }] },
      { name:'都市計画費', v:27.8 },{ name:'住宅費', v:7.8 },{ name:'土木管理費', v:7.2 }] },
    { name:'消防費', v:25.0, children:[{ name:'常備消防費', v:20.9 },{ name:'非常備消防費', v:2.1 },{ name:'消防施設費', v:2.0 }] },
    { name:'商工費', v:14.0, children:[{ name:'商工振興費', v:9.1 },{ name:'観光費', v:4.9 }] },
    { name:'農林水産業費', v:11.0, children:[{ name:'農業費', v:8.0 },{ name:'林業費', v:3.0 }] },
    { name:'議会費', v:6.0 },
    { name:'労働費', v:2.0 },
  ],
};

export const YAMANASHI: Municipality = {
  name:'山梨県', total: 5360.0, yoy:'+1.4%', year:'令和8年度 当初予算', pop:790000, households:350000,
  council: { body:'山梨県議会', seats:37, decided:'令和8年2月定例会（令和8年3月18日）',
    vote:{ approve:33, oppose:2, absent:2 },
    parties:[
      { name:'自由民主党誠心会', seats:17, stance:'賛成' },
      { name:'未来やまなし', seats:8, stance:'賛成' },
      { name:'無所属', seats:5, stance:'賛成3・欠席2' },
      { name:'立憲民主党', seats:3, stance:'賛成' },
      { name:'公明党', seats:2, stance:'賛成' },
      { name:'日本共産党', seats:2, stance:'反対' } ] },
  revenue: [
    { name:'県税', v:1210.0 },{ name:'地方交付税', v:1720.0 },{ name:'国庫支出金', v:660.0 },{ name:'県債', v:480.0 },{ name:'諸収入・その他', v:1290.0 },
  ],
  expenditure: [
    { name:'教育費', v:1010.0 },{ name:'民生費', v:810.0 },{ name:'公債費', v:690.0 },{ name:'土木費', v:620.0 },{ name:'商工費', v:520.0 },{ name:'総務費', v:460.0 },{ name:'農林水産業費', v:390.0 },{ name:'衛生費', v:310.0 },{ name:'警察費', v:280.0 },{ name:'その他', v:270.0 },
  ],
};

export const PROJECTS: Project[] = [
  { id:'p1', name:'保育所等運営支援事業', kan:'民生費', ko:'児童福祉費', moku:'児童措置費', dept:'子ども保育課', period:'継続（通年）',
    themes:['子育て・教育','少子化対策'], budget:49.8, spent:13.2,
    hosei:{ delta:1.8, reason:'物価高騰に伴う給付単価の改定・保育所等整備（国庫内示対応）' },
    summary:'私立保育所・認定こども園等への施設型給付',
    purpose:'保護者の就労等により保育を必要とする児童が、居住地域にかかわらず安心して質の高い保育を受けられる環境を確保する。',
    desc:'私立保育所・認定こども園・地域型保育事業者（市内42園）への施設型給付費等の給付、副食費補足給付、保育補助者雇上支援などを実施。',
    plan:[25,50,75,100], actual:[26.5],
    kpis:[ { n:'待機児童数（4月1日時点）', t:'0人', a:'3人', ok:false }, { n:'保育定員', t:'5,600人', a:'5,620人', ok:true } ],
    contracts:[
      { to:'市内私立保育所・認定こども園（42園）', desc:'施設型給付費の給付', method:'法定給付', amt:12.1 },
      { to:'保育団体連合会', desc:'副食費補足給付事務', method:'随意契約', amt:0.6 },
      { to:'システム事業者', desc:'給付管理システム保守', method:'指名競争入札', amt:0.3, bid:'落札率 91.2%・応札3者' } ],
    evidence:[
      { title:'令和8年度 当初予算書（民生費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.132 スクリーンショット' },
      { title:'保育所等の利用状況（月次）', type:'ページ', source:'city.kofu.yamanashi.jp', thumb:'利用状況ページ キャプチャ' },
      { title:'子ども・子育て支援事業計画（第3期）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'計画書 表紙' } ],
    past:[ { y:'R5', b:45.2, e:44.8 },{ y:'R6', b:46.9, e:46.1 },{ y:'R7', b:48.4, e:47.6 } ] },
  { id:'p2', name:'こうふ子育て応援金給付事業', kan:'民生費', ko:'児童福祉費', moku:'児童福祉総務費', dept:'子ども支援課', period:'R6〜R9',
    themes:['少子化対策','子育て・教育'], budget:6.2, spent:1.4,
    hosei:{ delta:0.8, reason:'応援金の対象拡大（第2子以降の加算引上げ）' },
    summary:'第2子以降の出生世帯へ応援金を給付',
    purpose:'出産・子育てに伴う経済的負担を軽減し、安心して第2子以降を持てる環境をつくることで出生数の反転を図る。',
    desc:'第2子以降の出生1人につき応援金を給付（所得制限なし）。申請はオンライン完結。給付実績・効果検証は年度末に公表。',
    plan:[20,45,75,100], actual:[22.6],
    kpis:[ { n:'第2子以降の出生数', t:'950人', a:'912人', ok:false }, { n:'オンライン申請率', t:'90%', a:'93.2%', ok:true } ],
    contracts:[
      { to:'給付対象世帯（約1,150件見込）', desc:'応援金給付', method:'直接給付', amt:1.3 },
      { to:'決済代行事業者', desc:'オンライン給付事務', method:'公募型プロポーザル', amt:0.1 } ],
    evidence:[
      { title:'令和8年度 当初予算書（民生費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.128 スクリーンショット' },
      { title:'応援金給付実績（R7年度）', type:'ページ', source:'city.kofu.yamanashi.jp', thumb:'給付実績ページ キャプチャ' } ],
    past:[ { y:'R6', b:5.4, e:5.1 },{ y:'R7', b:5.9, e:5.7 } ] },
  { id:'p3', name:'放課後児童クラブ運営事業', kan:'民生費', ko:'児童福祉費', moku:'児童福祉総務費', dept:'子ども支援課', period:'継続（通年）',
    themes:['子育て・教育'], budget:4.1, spent:1.0,
    summary:'市内小学校区の放課後児童クラブ運営',
    purpose:'就労家庭等の小学生に放課後の安全な生活・遊びの場を保障し、保護者の就労継続を支える。',
    desc:'市内25小学校区・38クラブの運営委託、支援員の処遇改善、長期休業期間の開所時間延長を実施。',
    plan:[25,50,75,100], actual:[24.4],
    kpis:[ { n:'放課後児童クラブの待機児童数', t:'0人', a:'12人', ok:false }, { n:'開所クラブ数', t:'38クラブ', a:'38クラブ', ok:true } ],
    contracts:[
      { to:'社会福祉協議会ほか運営法人', desc:'クラブ運営委託（38クラブ）', method:'随意契約（公募）', amt:0.9 },
      { to:'施設管理事業者', desc:'専用施設の維持管理', method:'指名競争入札', amt:0.1, bid:'落札率 89.5%・応札3者' } ],
    evidence:[
      { title:'令和8年度 当初予算書（民生費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.130 スクリーンショット' },
      { title:'放課後児童クラブ一覧・空き状況', type:'ページ', source:'city.kofu.yamanashi.jp', thumb:'クラブ一覧ページ キャプチャ' } ],
    past:[ { y:'R5', b:3.6, e:3.5 },{ y:'R6', b:3.8, e:3.7 },{ y:'R7', b:4.0, e:3.9 } ] },
  { id:'p4', name:'道路橋りょう長寿命化事業', kan:'土木費', ko:'道路橋りょう費', moku:'道路維持費', dept:'道路河川課', period:'R4〜R13（長寿命化計画）',
    themes:['インフラ・都市基盤','防災・安全'], budget:12.4, spent:2.2,
    summary:'舗装・橋りょうの点検と計画的な修繕',
    purpose:'高度成長期に整備した道路・橋りょうの老朽化に対し、事後対応から予防保全へ転換し、更新費用の平準化と安全確保を両立する。',
    desc:'舗装修繕（約8.2km）、橋りょう定期点検（52橋）、判定区分Ⅲの橋りょう5橋の補修工事を実施。工事箇所は地図で公開。',
    plan:[15,40,75,100], actual:[17.7],
    kpis:[ { n:'舗装修繕延長（年間）', t:'8.2km', a:'7.9km', ok:false }, { n:'判定区分Ⅲ橋りょうの補修完了', t:'5橋', a:'2橋（3橋は工事中）', ok:false } ],
    contracts:[
      { to:'市内建設業者（6社・工区別）', desc:'舗装修繕工事', method:'一般競争入札', amt:1.6, bid:'落札率 92.4%・応札6者' },
      { to:'橋梁点検コンサルタント', desc:'定期点検業務委託', method:'指名競争入札', amt:0.4, bid:'落札率 88.7%・応札4者' },
      { to:'補修工事JV', desc:'橋りょう補修工事（2橋着手）', method:'一般競争入札', amt:0.2, bid:'落札率 94.1%・応札2者' } ],
    evidence:[
      { title:'令和8年度 当初予算書（土木費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.156 スクリーンショット' },
      { title:'道路メンテナンス年報', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'年報 橋りょう健全度グラフ' },
      { title:'工事発注情報・入札結果', type:'ページ', source:'city.kofu.yamanashi.jp', thumb:'入札結果ページ キャプチャ' } ],
    past:[ { y:'R5', b:10.8, e:10.2 },{ y:'R6', b:11.5, e:10.9 },{ y:'R7', b:12.0, e:11.3 } ] },
  { id:'p5', name:'中心市街地にぎわい創出事業', kan:'商工費', ko:'商工振興費', moku:'商工振興費', dept:'産業振興課', period:'R7〜R11',
    themes:['産業・にぎわい'], budget:3.8, spent:0.7,
    hosei:{ delta:0.5, reason:'プレミアム付商品券の発行支援を追加（物価高騰対策）' },
    summary:'甲府駅周辺のリノベーション・出店支援',
    purpose:'甲府駅南口〜中央商店街エリアの空き店舗を減らし、歩行者通行量と若年層の出店を回復させる。',
    desc:'空き店舗リノベーション補助（上限500万円）、チャレンジショップ運営、オープンストリート社会実験（年4回）を実施。',
    plan:[18,45,72,100], actual:[18.4],
    kpis:[ { n:'歩行者通行量（対R6比）', t:'+10%', a:'+4.2%', ok:false }, { n:'空き店舗への新規出店', t:'12件', a:'14件', ok:true } ],
    contracts:[
      { to:'出店者・物件オーナー（12件）', desc:'リノベーション補助金', method:'公募・審査', amt:0.5 },
      { to:'まちづくり会社', desc:'チャレンジショップ運営委託', method:'公募型プロポーザル', amt:0.2 } ],
    evidence:[
      { title:'令和8年度 当初予算書（商工費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.148 スクリーンショット' },
      { title:'中心市街地活性化基本計画 進捗評価', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'通行量調査グラフ' } ],
    past:[ { y:'R7', b:3.2, e:2.8 } ] },
  { id:'p6', name:'地域防災力強化事業', kan:'消防費', ko:'非常備消防費', moku:'非常備消防費', dept:'防災企画課', period:'継続（通年）',
    themes:['防災・安全'], budget:2.6, spent:0.6,
    summary:'自主防災組織・備蓄・訓練の底上げ',
    purpose:'南海トラフ地震等の大規模災害に備え、自助・共助の中核となる自主防災組織の活動率と資機材整備率を高める。',
    desc:'自主防災組織への資機材購入補助、避難所備蓄品の計画更新、総合防災訓練・地区別訓練の実施。',
    plan:[20,55,80,100], actual:[23.1],
    kpis:[ { n:'自主防災組織の活動率', t:'85%', a:'78%', ok:false }, { n:'備蓄品の更新計画達成率', t:'100%', a:'100%', ok:true } ],
    contracts:[
      { to:'自主防災組織（86団体）', desc:'資機材整備補助', method:'交付決定', amt:0.4 },
      { to:'防災用品納入業者', desc:'備蓄品更新（食料・毛布等）', method:'指名競争入札', amt:0.2, bid:'落札率 90.8%・応札5者' } ],
    evidence:[
      { title:'令和8年度 当初予算書（消防費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.162 スクリーンショット' },
      { title:'地域防災計画・訓練実施報告', type:'ページ', source:'city.kofu.yamanashi.jp', thumb:'訓練報告ページ キャプチャ' } ],
    past:[ { y:'R5', b:2.2, e:2.1 },{ y:'R6', b:2.4, e:2.2 },{ y:'R7', b:2.5, e:2.4 } ] },
  { id:'p7', name:'ごみ処理施設維持管理事業', kan:'衛生費', ko:'清掃費', moku:'清掃費', dept:'環境総室', period:'継続（通年）',
    themes:['環境・循環'], budget:9.7, spent:2.5,
    hosei:{ delta:0.8, reason:'燃料費・電気料金の高騰への対応' },
    summary:'クリーンセンターの運転・基幹改良',
    purpose:'一般廃棄物を安定的・衛生的に処理しつつ、焼却熱の発電利用により施設の環境負荷とコストを低減する。',
    desc:'焼却施設の運転管理委託、基幹的設備改良工事（2か年）、最終処分場の水質モニタリングを実施。',
    plan:[25,50,75,100], actual:[25.8],
    kpis:[ { n:'リサイクル率', t:'28%', a:'24.6%', ok:false }, { n:'施設稼働率（計画停止除く）', t:'95%', a:'97.1%', ok:true } ],
    contracts:[
      { to:'施設運転管理事業者', desc:'運転管理業務委託（長期包括）', method:'総合評価一般競争入札', amt:2.1, bid:'総合評価・応札2者' },
      { to:'プラントメーカー', desc:'基幹的設備改良工事', method:'随意契約（技術特定）', amt:0.4 } ],
    evidence:[
      { title:'令和8年度 当初予算書（衛生費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.142 スクリーンショット' },
      { title:'一般廃棄物処理実態調査 結果', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'処理量推移グラフ' } ],
    past:[ { y:'R5', b:8.9, e:8.8 },{ y:'R6', b:9.2, e:9.0 },{ y:'R7', b:9.5, e:9.4 } ] },
  { id:'p8', name:'高齢者見守り・地域包括ケア推進事業', kan:'民生費', ko:'社会福祉費', moku:'社会福祉費', dept:'長寿介護課', period:'継続（通年）',
    themes:['健康・福祉'], budget:1.9, spent:0.5,
    summary:'地域包括支援センターと見守りネットワーク',
    purpose:'独居高齢者等が住み慣れた地域で安心して暮らし続けられるよう、医療・介護・生活支援の連携体制を維持・強化する。',
    desc:'市内9か所の地域包括支援センター運営委託、見守り協定事業者ネットワークの拡充、認知症初期集中支援チームの運営。',
    plan:[25,50,75,100], actual:[26.3],
    kpis:[ { n:'見守りネットワーク登録者数', t:'3,000人', a:'2,750人', ok:false }, { n:'包括支援センター相談件数', t:'12,000件', a:'13,400件', ok:true } ],
    contracts:[
      { to:'社会福祉法人等（9法人）', desc:'地域包括支援センター運営委託', method:'公募型プロポーザル', amt:0.5 } ],
    evidence:[
      { title:'令和8年度 当初予算書（民生費）', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'予算書 P.124 スクリーンショット' },
      { title:'高齢者保健福祉計画 進捗報告', type:'PDF', source:'city.kofu.yamanashi.jp', thumb:'計画進捗 評価表' } ],
    past:[ { y:'R5', b:1.7, e:1.7 },{ y:'R6', b:1.8, e:1.8 },{ y:'R7', b:1.9, e:1.8 } ] },
];

// 節×事業マッピング — 各事業の予算を節別に配分（実運用では予算書の節内訳から取得・ここではダミー）
export const PROJ_SETSU: Record<string, Record<string, number>> = {
  p1: { '負担金、補助及び交付金': 0.62, '委託料': 0.30, '需用費': 0.08 },
  p2: { '負担金、補助及び交付金': 0.85, '需用費': 0.10, '報酬・給料等': 0.05 },
  p3: { '委託料': 0.72, '需用費': 0.18, '報酬・給料等': 0.10 },
  p4: { '工事請負費': 0.78, '委託料': 0.17, '需用費': 0.05 },
  p5: { '負担金、補助及び交付金': 0.45, '委託料': 0.38, '需用費': 0.17 },
  p6: { '需用費': 0.40, '負担金、補助及び交付金': 0.35, '報酬・給料等': 0.25 },
  p7: { '委託料': 0.66, '工事請負費': 0.22, '需用費': 0.12 },
  p8: { '委託料': 0.58, '報酬・給料等': 0.30, '需用費': 0.12 },
};

export const THEMES: Theme[] = [
  { name:'子育て・教育', intent:'保育の受け皿確保と放課後の居場所づくりを両輪に、「子育てするなら甲府」を掲げて関連予算を前年度比+8.2%と重点配分しています。', ids:['p1','p2','p3'] },
  { name:'少子化対策', intent:'経済的負担の軽減（応援金）と保育環境の充実を組み合わせ、出生数反転を狙う分野横断のテーマです。', ids:['p2','p1'] },
  { name:'インフラ・都市基盤', intent:'新設から予防保全へ。長寿命化計画に基づき、修繕費を平準化しながら道路・橋りょうの安全を確保します。', ids:['p4'] },
  { name:'防災・安全', intent:'大規模地震に備えた自助・共助の強化と、インフラの耐震・保全を一体で進めます。', ids:['p6','p4'] },
  { name:'環境・循環', intent:'ごみ処理の安定運転と施設改良による省エネ・発電利用で、環境負荷とコストの同時低減を図ります。', ids:['p7'] },
  { name:'健康・福祉', intent:'地域包括ケアの体制維持を軸に、高齢者が地域で暮らし続けられる支援ネットワークを広げます。', ids:['p8'] },
  { name:'産業・にぎわい', intent:'中心市街地の空き店舗解消と若年層の出店支援で、まちなかの回遊とにぎわいを取り戻します。', ids:['p5'] },
];

// 用語解説（インラインヘルプ）
export const GLOSS: Record<string, string> = {
  '歳入':'1年間に入ってくるお金。税金、国・県からの交付金・補助金、借入（市債）などで構成されます。',
  '歳出':'1年間に使うお金。予算では歳入と同額になるように編成されます。',
  '款・項・目・節':'予算書の階層構造。款（大分類）→ 項（中分類）→ 目（小分類）→ 節（支出の性質別）の順に細かくなります。',
  '予算現額':'当初予算に補正予算（追加・減額）や前年度からの繰越を反映した、現在時点の予算総額。執行率の分母になります。',
  '執行率':'予算現額のうち、実際に支出した割合。年度末に向けて100%に近づいていきます。',
  '不用額':'使わずに残った予算。翌年度への繰越分を含む場合があります。理由は決算資料で確認できます。',
};

// 類似自治体比較 — 総務省「令和6年度 市町村別決算状況調」からの導出実データ。
// 再生成: bun run pipeline:derive（normalized → similar.gen.ts）
export { SIMILAR, SIM_MIX_COLS, SIMILAR_FY_LABEL, SIMILAR_EVIDENCE } from './similar.gen';

// データ出典・更新日一覧（ダミー）
export const SOURCES = [
  { title:'令和8年度 当初予算書', type:'PDF', org:'甲府市 財政課', date:'2026-07-01', used:'ダッシュボード／款・項・目・節' },
  { title:'令和8年度 補正予算書（第1号）', type:'PDF', org:'甲府市 財政課', date:'2026-07-01', used:'予算の変遷／事業詳細' },
  { title:'令和8年度 施政方針', type:'PDF', org:'甲府市', date:'2026-07-01', used:'政策テーマ（政策意図サマリー）' },
  { title:'第七次甲府市総合計画', type:'PDF', org:'甲府市', date:'2026-06-15', used:'政策テーマ' },
  { title:'令和6年度 歳入歳出決算書', type:'PDF', org:'甲府市 会計課', date:'2026-06-15', used:'過年度実績' },
  { title:'主要な施策の成果報告書（R6・R7）', type:'PDF', org:'甲府市', date:'2026-06-15', used:'過年度実績／成果指標（KPI）' },
  { title:'監査委員 決算審査意見書', type:'PDF', org:'甲府市監査委員', date:'2026-06-15', used:'過年度実績' },
  { title:'本会議 会議録（3月・6月定例会）', type:'ページ', org:'甲府市議会', date:'2026-07-01', used:'議会の構成／予算の変遷' },
  { title:'入札・契約情報（入札結果の公表）', type:'ページ', org:'甲府市 契約課', date:'2026-07-01', used:'事業詳細（契約・支出先）' },
  { title:'令和6年度 市町村別決算状況調', type:'Excel', org:'総務省 自治財政局', date:'2026-07-11', used:'類似自治体との比較' },
  { title:'国勢調査 人口・世帯数', type:'統計', org:'総務省統計局', date:'2026-06-01', used:'1人あたり換算' },
  { title:'都道府県形状（japanese-prefectures）', type:'SVG', org:'Geolonia（GFDL）', date:'2026-07-10', used:'トップページの地図' },
  { title:'市区町村形状（japan-topography）', type:'GeoJSON', org:'国土数値情報（国土交通省）を加工／SMRI', date:'2026-07-10', used:'トップページの地図' },
];

// 基本情報（人口動態・面積・産業・歴代首長・気候）※数値はダミーを含む
export interface BasicInfo {
  sub: string;
  facts: { label: string; v: string; note: string }[];
  popTrend: [string, number][];
  popStats: { label: string; v: string }[];
  industry: { name: string; share: number }[];
  specialties: string[];
  leaderTitle: string;
  leaders: { term: string; name: string; note: string }[];
  climate: { label: string; v: string }[];
  climateNote: string;
}

export const BASIC_INFO: Record<string, BasicInfo> = {
  '甲府市': {
    sub:'山梨県の県庁所在地 ・ 甲府盆地の中央に位置',
    facts: [
      { label:'面積', v:'212.47 km²', note:'南北に細長い市域' },
      { label:'総人口', v:'18.6万人', note:'令和7年推計' },
      { label:'世帯数', v:'9.3万世帯', note:'1世帯平均 約2.0人' },
      { label:'人口密度', v:'875人/km²', note:'市街地は盆地中央に集中' },
    ],
    popTrend: [['1985',20.2],['1995',19.7],['2005',19.9],['2015',19.3],['2025',18.6]],
    popStats: [
      { label:'高齢化率（65歳以上）', v:'31.2%' },
      { label:'年少人口率（15歳未満）', v:'10.8%' },
      { label:'年間出生数', v:'約1,100人' },
      { label:'社会増減（転入−転出）', v:'−320人/年' },
    ],
    industry: [
      { name:'第3次産業（商業・サービス等）', share:74.9 },
      { name:'第2次産業（製造・建設）', share:21.6 },
      { name:'第1次産業（農業等）', share:3.5 },
    ],
    specialties: ['宝飾・ジュエリー（国内有数の集積地）','ワイン醸造','果樹（ぶどう・もも）','機械電子部品','観光（昇仙峡・武田神社）'],
    leaderTitle:'歴代市長（近年）',
    leaders: [
      { term:'2015 −（現職）', name:'樋口 雄一', note:'3期目' },
      { term:'2003 − 2015', name:'宮島 雅展', note:'3期' },
      { term:'1991 − 2003', name:'山本 栄彦', note:'3期' },
      { term:'1979 − 1991', name:'原 忠三', note:'3期' },
    ],
    climate: [
      { label:'年平均気温', v:'15.1℃' },
      { label:'年降水量', v:'1,161 mm' },
      { label:'年間日照時間', v:'2,225時間' },
      { label:'猛暑日（年間）', v:'約20日' },
    ],
    climateNote:'甲府盆地特有の内陸性気候。夏は全国有数の猛暑となる一方で降水量は少なく、長い日照時間が果樹栽培やワイン醸造を支えています。冬は放射冷却により朝晩の冷え込みが強くなります。',
  },
  '山梨県': {
    sub:'中部地方（甲信越） ・ 県庁所在地は甲府市',
    facts: [
      { label:'面積', v:'4,465 km²', note:'約8割を山地が占める' },
      { label:'総人口', v:'79.5万人', note:'令和7年推計' },
      { label:'世帯数', v:'35.4万世帯', note:'1世帯平均 約2.2人' },
      { label:'人口密度', v:'178人/km²', note:'可住地は盆地部に集中' },
    ],
    popTrend: [['1985',83.3],['1995',88.1],['2005',88.4],['2015',83.5],['2025',79.5]],
    popStats: [
      { label:'高齢化率（65歳以上）', v:'31.7%' },
      { label:'年少人口率（15歳未満）', v:'10.9%' },
      { label:'年間出生数', v:'約4,400人' },
      { label:'社会増減（転入−転出）', v:'+210人/年' },
    ],
    industry: [
      { name:'第3次産業（商業・サービス等）', share:66.5 },
      { name:'第2次産業（製造・建設）', share:27.3 },
      { name:'第1次産業（農業等）', share:6.2 },
    ],
    specialties: ['果樹（ぶどう・もも 生産量全国1位）','ワイン（ワイナリー数全国1位）','ミネラルウォーター（採水量全国1位）','機械電子・産業用ロボット','観光（富士山・富士五湖・温泉）'],
    leaderTitle:'歴代知事（近年）',
    leaders: [
      { term:'2019 −（現職）', name:'長崎 幸太郎', note:'2期目' },
      { term:'2015 − 2019', name:'後藤 斎', note:'1期' },
      { term:'2007 − 2015', name:'横内 正明', note:'2期' },
      { term:'2003 − 2007', name:'山本 栄彦', note:'1期' },
    ],
    climate: [
      { label:'年平均気温（甲府）', v:'15.1℃' },
      { label:'年降水量（甲府）', v:'1,161 mm' },
      { label:'年間日照時間', v:'全国トップ級' },
      { label:'標高差', v:'約3,500 m' },
    ],
    climateNote:'内陸性気候で寒暖差が大きく、日照時間の長さは全国トップ級。富士山麓から甲府盆地まで標高差が大きく、地域ごとの気候の違いが果樹・高原野菜など多様な農業を生んでいます。',
  },
};

// 補正予算（甲府市・令和8年度 第1号補正、ダミー）：款・区分レベルの増減額（億円）
export const HOSEI = {
  total: 4.2, label:'第1号補正', decidedShort:'令和8年6月20日 議決',
  desc:'物価高騰対策給付・保育所等整備（国庫内示対応）ほか',
  exp: { '民生費':2.6, '衛生費':0.8, '商工費':0.5, '総務費':0.3 } as Record<string, number>,
  rev: { '国庫支出金':3.1, '県支出金':0.6, '諸収入・その他':0.5 } as Record<string, number>,
};

// 前年比較用：款・区分ごとの対前年増減率（%）（甲府市は令和8/7年度当初予算の実データ、県はダミー）
export const YOY_EXP: Record<string, number> = { '民生費':3.7, '総務費':4.7, '教育費':20.5, '土木費':6.3, '公債費':-5.9, '衛生費':2.0, '商工費':40.0, '消防費':-13.8, '農林水産業費':0.0, '議会費':20.0, '労働費':0.0, 'その他':-8.0, '警察費':1.1 };
export const YOY_REV: Record<string, number> = { '市税':2.6, '県税':1.6, '国庫支出金':6.1, '地方交付税':-5.1, '県支出金':14.5, '地方消費税交付金':17.6, '寄附金':0.0, '市債':-17.5, '県債':3.8, '繰入金':13.3, '諸収入・その他':1.2 };

export const HIST: Record<string, { title: string; scale: number; rates: Record<string, number> }> = {
  // scale は甲府市当初予算の実データ比（R7:881億 / R6:808億 ÷ R8:918億）。執行率はダミー
  R7: { title:'令和7年度（決算見込）', scale:0.960, rates:{ '民生費':0.985,'総務費':0.952,'教育費':0.941,'土木費':0.902,'公債費':0.999,'衛生費':0.968,'商工費':0.914,'消防費':0.961,'農林水産業費':0.925,'議会費':0.987,'その他':0.872 } },
  R6: { title:'令和6年度（決算）', scale:0.880, rates:{ '民生費':0.981,'総務費':0.944,'教育費':0.936,'土木費':0.889,'公債費':0.999,'衛生費':0.972,'商工費':0.905,'消防費':0.955,'農林水産業費':0.918,'議会費':0.985,'その他':0.861 } },
};

// ---- ヘルパー --------------------------------------------------------------
export function fmtOku(v: number): string {
  if (v >= 10000) return (v/10000).toFixed(2) + '兆円';
  if (v >= 1) return (v >= 100 ? Math.round(v).toLocaleString() : v.toFixed(1)) + '億円';
  return Math.round(v*10000).toLocaleString() + '万円';
}
export function pctOf(v: number, total: number): string { return (v/total*100).toFixed(1) + '%'; }
// 億円 → 1人あたり金額
export function fmtPerCap(oku: number, pop: number): string {
  const yen = oku * 1e8 / pop;
  return yen >= 10000 ? (yen/1e4).toFixed(1) + '万円' : Math.round(yen).toLocaleString() + '円';
}
export function hash(s: string): number { let h = 0; for (let i=0;i<s.length;i++) { h = (h*31 + s.charCodeAt(i)) >>> 0; } return h; }
export function fadeColor(c: string): string { return `color-mix(in srgb, ${c} 26%, #F2F6F9)`; }
export function donutBg(items: BudgetNode[], hi: number | null): string {
  const total = items.reduce((a,b)=>a+b.v,0);
  let acc = 0; const stops: string[] = [];
  items.forEach((it,i)=>{ const from = acc/total*100; acc += it.v; const to = acc/total*100; const col = PALETTE[i%PALETTE.length]; stops.push(`${(hi==null||hi===i)?col:fadeColor(col)} ${from.toFixed(2)}% ${to.toFixed(2)}%`); });
  return `conic-gradient(${stops.join(', ')})`;
}
export function synthChildren(node: BudgetNode, level: number): BudgetNode[] {
  const base = node.name.replace(/費$/,'').replace(/^その他/,'諸');
  let names: string[];
  if (level === 1) names = [base+'総務費', base+'振興費', base+'施設費'];
  else if (level === 2) names = [base+'管理費', base+'運営費', base+'整備費'];
  else names = ['報酬・給料等','需用費','委託料','工事請負費','負担金、補助及び交付金'];
  const ws = names.map((n,i)=> 0.5 + (hash(node.name+n+i)%100)/70);
  const wsum = ws.reduce((a,b)=>a+b,0);
  let rem = node.v;
  return names.map((n,i)=>{
    let v = i === names.length-1 ? rem : Math.max(0.1, Math.round(node.v*ws[i]/wsum*10)/10);
    if (v > rem) v = rem;
    rem = Math.round((rem - v)*10)/10;
    return { name:n, v, synth:true };
  }).filter(c => c.v > 0.05);
}
