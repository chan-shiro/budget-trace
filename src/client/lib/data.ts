// ============================================================================
// 予算トレース — データレイヤー
// 収録データはすべて一次資料由来の実データ（生成モジュール *.gen.ts。
// 再生成は bun run pipeline:derive）。ダミー・推計値は置かない。
// - 款レベル歳入・歳出／前年度当初額: 甲府市 令和8年度当初予算（案）資料
// - 主な事業（83件）: 同資料「主な事業一覧」
// - 人口・類似自治体比較: 総務省 令和6年度 市町村別決算状況調
// ============================================================================
import { KOFU_BUDGET, KOFU_BUDGET_YEARS, type KofuBudgetYear, type KofuKanRow } from './kofu.gen';
import { KOFU_EXECUTION, KOFU_EXECUTION_YEARS } from './execution.gen';
import { WAYBACK_BY_URL } from './archives.gen';
import { KOFU_EVALUATION_YEARS } from './evaluations.gen';

// ---- 型 --------------------------------------------------------------------
export interface BudgetNode {
  name: string;
  v: number;
  children?: BudgetNode[];
}

export interface Municipality {
  name: string;
  total: number;
  yoy: string;
  year: string;
  pop: number;
  revenue: BudgetNode[];
  expenditure: BudgetNode[];
}

// ---- パレット --------------------------------------------------------------
export const P_BLUE = ['#55BBE4','#31586E','#6FC5E9','#84A0B0','#0F5E84','#A9D9EC','#527E96','#C5DFEC','#0C82B4','#93AEBD','#8494A0','#3EA9D8'];
// Okabe-Ito ベース（色覚多様性対応）+ 補助色
export const P_VIVID = ['#0072B2','#E69F00','#009E73','#CC79A7','#56B4E9','#D55E00','#7B5AA6','#8C564B','#66A61E','#B8A016','#17A2B8','#5C6B77'];

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

// ---- 甲府市 当初予算（すべて予算書パース値。R8〜R6 の複数年度） ---------------
const toNode = (r: KofuKanRow): BudgetNode => ({
  name: r.name,
  v: r.v,
  children: r.children?.map(toNode),
});

export function muniFromBudget(b: KofuBudgetYear): Municipality {
  return {
    name: '甲府市',
    total: b.totalOku,
    yoy: b.yoyLabel,
    year: b.fyLabel,
    pop: b.population,
    revenue: b.revenue.map(toNode),
    expenditure: b.expenditure.map(toNode),
  };
}

/** 最新年度（互換用） */
export const KOFU: Municipality = muniFromBudget(KOFU_BUDGET);

// 用語解説（インラインヘルプ）
export const GLOSS: Record<string, string> = {
  '歳入':'1年間に入ってくるお金。税金、国・県からの交付金・補助金、借入（市債）などで構成されます。',
  '歳出':'1年間に使うお金。予算では歳入と同額になるように編成されます。',
  '款':'予算書の大分類。歳出なら民生費・教育費など、歳入なら市税・国庫支出金などに分かれます。',
};

// 実データの生成モジュール（来歴付き）
export { SIMILAR, SIM_MIX_COLS, SIMILAR_FY_LABEL, SIMILAR_EVIDENCE } from './similar.gen';
export { KOFU_BUDGET, KOFU_BUDGET_YEARS, type KofuBudgetYear } from './kofu.gen';
export { KOFU_PROJECTS, KOFU_PROJECTS_SOURCE, KOFU_PROJECT_YEARS } from './projects.gen';
export { KOFU_EXECUTION, KOFU_EXECUTION_YEARS, type KofuExecutionYear } from './execution.gen';
export { KOFU_R6_DETAIL } from './detail.gen';
export { KOFU_TREND } from './trend.gen';
export { KOFU_EVALUATION_YEARS, type KofuEvaluationYear } from './evaluations.gen';

// データ出典・更新日一覧（数値の一次資料のみ。地図形状などの素材はトップページに記載）
// url = Wayback Machine のコピー（魚拓）を優先。直リンクは中身だけ差し替えられ得るが、
// コピーはパース時点の版に固定されるため透明性が高い。originUrl = 発行元の元 URL。
// 台帳は data/archives.json、登録は bun run pipeline:archive
const SOUMU_R6_LANDING = 'https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html';
export const SOURCES = [
  ...KOFU_BUDGET_YEARS.map((b) => ({
    title: b.sourceTitle, type: 'PDF', org: '甲府市', date: '2026-07-12',
    used: `ダッシュボード／款別ドリルダウン／前年比較／主な事業（${b.fyLabel.replace(' 当初予算', '')}）` + (b.fy === 'R8' ? '／政策テーマ' : ''),
    url: b.sourceUrl, originUrl: b.originUrl, localUrl: b.sourceLocalUrl,
  })),
  { title:'令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）', type:'PDF', org:'甲府市', date:'2026-07-12', used:'予算執行状況（款別の予算現額・収入/支出済額・執行率）', url: KOFU_EXECUTION.sourceUrl, originUrl: KOFU_EXECUTION.originUrl, localUrl: KOFU_EXECUTION.sourceLocalUrl },
  ...KOFU_EXECUTION_YEARS.filter((y) => y.basis === '確定').map((y) => ({
    title: y.sourceTitle, type: 'Web', org: '甲府市', date: '2026-07-12',
    used: `予算執行状況（${y.fyLabel.replace('（決算・確定値）', '')}の予算現額・済額・執行率＝確定値）`,
    url: y.sourceUrl, originUrl: y.originUrl, localUrl: y.sourceLocalUrl,
  })),
  ...KOFU_EVALUATION_YEARS.map((y) => ({
    title: y.sourceTitle, type: y.sourceLocalUrl ? 'PDF' : 'Excel', org: '甲府市', date: '2026-07-12',
    used: `事業の評価バッジ（${y.fyLabel}の主な事業に予算名/事業名の完全一致で表示）`,
    url: y.sourceUrl, originUrl: y.originUrl, localUrl: y.sourceLocalUrl,
  })),
  { title:'令和6年度 市町村別決算状況調', type:'Excel', org:'総務省 自治財政局', date:'2026-07-11', used:'類似自治体との比較／項別内訳（決算）／人口（1人あたり換算）', url: WAYBACK_BY_URL[SOUMU_R6_LANDING] ?? SOUMU_R6_LANDING, originUrl: SOUMU_R6_LANDING, localUrl: '' },
];

// 未収録資料のリクエスト（リクエスト駆動の情報公開請求 — docs/data-strategy.md）。
// 賛同が貯まったものから請求・収録する。台帳は GitHub Issues（ラベル: 資料リクエスト）
const REPO = 'https://github.com/chan-shiro/budget-trace';
const requestUrl = (title: string) =>
  `${REPO}/issues/new?template=source-request.yml&title=${encodeURIComponent(`[資料リクエスト] ${title}`)}`;
export const REQUEST_LIST_URL = `${REPO}/issues?q=${encodeURIComponent('is:issue label:資料リクエスト sort:reactions-+1-desc')}`;
export const UNCOLLECTED = [
  { title: '事務事業評価票（全事業分・各年度）', why: '事業単位の執行額（決算3年分・財源内訳）と成果指標。公開はサンプル数枚のみ', requestUrl: requestUrl('事務事業評価票（全事業分・各年度）') },
  { title: '主要な施策の成果報告書（各年度）', why: '決算に添付される法定書類（自治法233条5項）。施策・事業ごとの執行実績。ウェブ未掲載', requestUrl: requestUrl('主要な施策の成果報告書（各年度）') },
  { title: '予算書 本編（款項目節・各年度）', why: '款より深い「項・目・節」の内訳。ウェブ未公開', requestUrl: requestUrl('予算書 本編（款項目節・各年度）') },
  { title: '補正予算書（各年度）', why: '当初予算と予算現額（補正後）の差を補正ごとに追える', requestUrl: requestUrl('補正予算書（各年度）') },
];

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
