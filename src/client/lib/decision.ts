// ============================================================================
// 全国 決算ビュー — 総務省「市町村別決算状況調」の県シャード（public/decision/<県コード>.json）
// を、ダッシュボード/ドリルが読む表示シェイプ（BudgetNode 互換）へ変換する。
// 甲府市（full 階層）は予算ベースの専用経路なので、ここは decision 階層
// （全1,741市町村の決算ベース）専用。金額はすべて億円（シャード生成時に換算済み）。
// シャードの生成は pipeline/derive-app-data.ts（bun run pipeline:derive）。
// ============================================================================
import { DECISION_FY_LABELS, DECISION_SOURCES, type DecisionEvidenceCard } from "./decision-index.gen";
import { fyEraLabel } from "./fy";

// ---- シャードの型（derive-app-data.ts が書き出す構造）------------------------
export interface DecisionYearSlice {
  /** 住民基本台帳人口 */
  pop: number;
  /** 歳出決算総額（億円） */
  expTotalOku: number;
  /** 歳入決算総額（億円） */
  revTotalOku: number | null;
  /** 1人あたり歳出（円） */
  perCapYen: number;
  /** 財政力指数 */
  finIdx: number | null;
  /** 経常収支比率（%） */
  keijo: number | null;
  /** 実質公債費比率（%） */
  kosai: number | null;
  /** 将来負担比率（%） */
  shorai: number | null;
  /** 都市別（city）/ 町村別（town）— エビデンスの出典ファイル群を選ぶ */
  family: "city" | "town";
  /** 款別歳出（款名 → 億円） */
  exp: Record<string, number>;
  /** 款別歳出の項内訳（款名 → 項名 → 億円） */
  expDetail: Record<string, Record<string, number>>;
  /** 歳入科目（科目名 → 億円） */
  rev: Record<string, number>;
  /** 歳入科目の内訳（科目名 → 内訳名 → 億円） */
  revDetail: Record<string, Record<string, number>>;
  /** 来歴（概況ファイル内の位置） */
  ref: { file: string; row: number };
  /** 性質別歳出（性質名 → 億円）。R6 のみ（(4)性質別ファイル） */
  nature?: Record<string, number>;
  /** 地方債現在高ほか（億円）。R6 のみ（(5)地方債ファイル） */
  bond?: {
    balanceOku: number;
    reserveOku: number | null;
    chouseiOku: number | null;
    gensaiOku: number | null;
    debtBurdenOku: number | null;
  } | null;
}
export interface DecisionMuni {
  name: string;
  years: Record<string, DecisionYearSlice>;
}
export interface DecisionShard {
  prefCode: string;
  prefName: string;
  /** 収録年度（新しい順） */
  years: string[];
  /** 団体コード → 自治体 */
  munis: Record<string, DecisionMuni>;
}

// BudgetNode（data.ts）互換のノード。ダッシュボード/ドリルが構造的に受け取る。
export interface DecisionNode {
  name: string;
  v: number;
  children?: DecisionNode[];
}

export interface DecisionView {
  muniCode: string;
  name: string;
  prefName: string;
  fy: string;
  fyLabel: string;
  pop: number;
  perCapYen: number;
  /** 歳出決算総額（億円） */
  total: number;
  /** 歳入決算総額（億円） */
  revTotal: number | null;
  /** 前年度決算比（歳出総額）。無ければ "" */
  yoy: string;
  /** 前年度 歳出決算総額（億円）。無ければ null */
  prevTotal: number | null;
  finIdx: number | null;
  keijo: number | null;
  kosai: number | null;
  shorai: number | null;
  revenue: DecisionNode[];
  expenditure: DecisionNode[];
  /** このシャードでこの自治体が持つ年度（新しい順） */
  availableFys: string[];
  /** エビデンス（総務省 決算状況調の Excel。都市別/町村別の3ファイル） */
  evidence: DecisionEvidenceCard[];
  /** ドロワーの主リンク（概況ファイル） */
  primaryEvidence: DecisionEvidenceCard | null;
  /** 概況の来歴表示 */
  refLabel: string;
  /** 性質別歳出（億円・降順）。R6 のみ、無ければ null */
  nature: DecisionNode[] | null;
  /** 地方債現在高ほか（億円）。R6 のみ、無ければ null */
  bond: DecisionYearSlice["bond"] | null;
}

// 歳入科目の表示グループ（ドーナツを読みやすく。members に載らない科目は「その他」へ）。
// single=true の単一科目グループは、内訳（「うち〜」）を children にする。
// それ以外は member 科目自体を children にする。どの科目も捨てずに必ずどこかへ入れる。
const REV_GROUPS: { label: string; members: string[]; single?: boolean }[] = [
  { label: "地方税", members: ["地方税"], single: true },
  { label: "地方交付税", members: ["地方交付税"], single: true },
  { label: "国庫支出金", members: ["国庫支出金"], single: true },
  { label: "県支出金", members: ["都道府県支出金"], single: true },
  { label: "地方債", members: ["地方債"], single: true },
  {
    label: "各種交付金・譲与税",
    members: [
      "地方譲与税",
      "地方揮発油譲与税",
      "利子割交付金",
      "配当割交付金",
      "株式等譲渡所得割交付金",
      "地方消費税交付金",
      "ゴルフ場利用税交付金",
      "自動車税環境性能割交付金",
      "自動車取得税交付金",
      "軽油引取税交付金",
      "法人事業税交付金",
      "分離課税所得割交付金",
      "地方特例交付金等",
      "交通安全対策特別交付金",
    ],
  },
];

function yoyLabel(cur: number, prev: number | null): string {
  if (prev == null || prev <= 0) return "";
  const p = Math.round((cur / prev - 1) * 1000) / 10;
  return (p >= 0 ? "+" : "−") + Math.abs(p).toFixed(1) + "%";
}

function sortedNodes(o: Record<string, number>): DecisionNode[] {
  return Object.entries(o)
    .map(([name, v]) => ({ name, v }))
    .sort((a, b) => b.v - a.v);
}

function buildRevenue(
  rev: Record<string, number>,
  revDetail: Record<string, Record<string, number>>,
): DecisionNode[] {
  const claimed = new Set<string>();
  const nodes: DecisionNode[] = [];
  for (const g of REV_GROUPS) {
    const members = g.members.filter((m) => rev[m] != null);
    if (!members.length) continue;
    members.forEach((m) => claimed.add(m));
    const v = members.reduce((a, m) => a + rev[m]!, 0);
    let children: DecisionNode[] | undefined;
    if (g.single && members.length === 1) {
      const d = revDetail[members[0]!];
      if (d && Object.keys(d).length) children = sortedNodes(d);
    } else if (members.length > 1) {
      children = members.map((m) => ({ name: m, v: rev[m]! })).sort((a, b) => b.v - a.v);
    }
    nodes.push({ name: g.label, v, children });
  }
  // その他 = どのグループにも割り当てられなかった科目（黙って捨てない）
  const rest = Object.entries(rev).filter(([k]) => !claimed.has(k));
  if (rest.length) {
    const v = rest.reduce((a, [, vv]) => a + vv, 0);
    nodes.push({
      name: "その他",
      v,
      children: rest.map(([name, vv]) => ({ name, v: vv })).sort((a, b) => b.v - a.v),
    });
  }
  return nodes.sort((a, b) => b.v - a.v);
}

/** シャード内で自治体名から団体コードを引く（地図クリックの名前解決用） */
export function findMuniCodeByName(shard: DecisionShard, muniName: string): string | null {
  const hit = Object.entries(shard.munis).find(([, m]) => m.name === muniName);
  return hit ? hit[0] : null;
}

/**
 * 県シャード＋団体コード＋年度 → 表示シェイプ。
 * fy がその自治体に無ければ最新の収録年度にフォールバックする。
 */
export function buildDecisionView(
  shard: DecisionShard,
  muniCode: string,
  fy: string,
): DecisionView | null {
  const muni = shard.munis[muniCode];
  if (!muni) return null;
  // shard.years は新しい順。その自治体が実際に持つ年度に絞る
  const availableFys = shard.years.filter((y) => muni.years[y]);
  const useFy = muni.years[fy] ? fy : availableFys[0];
  if (!useFy) return null;
  const y = muni.years[useFy]!;

  const idx = availableFys.indexOf(useFy);
  const prevSlice = idx >= 0 && idx < availableFys.length - 1 ? muni.years[availableFys[idx + 1]!] : null;
  const prevTotal = prevSlice ? prevSlice.expTotalOku : null;

  const expenditure = Object.entries(y.exp)
    .map(([kan, v]) => {
      const kou = y.expDetail[kan];
      return { name: kan, v, children: kou && Object.keys(kou).length ? sortedNodes(kou) : undefined };
    })
    .sort((a, b) => b.v - a.v);
  const revenue = buildRevenue(y.rev, y.revDetail);

  const src = DECISION_SOURCES[useFy];
  const cards = (y.family === "town" ? src?.town : src?.city) ?? [];
  const primary = cards.find((c) => c.title.includes("概況")) ?? cards[0] ?? null;

  return {
    muniCode,
    name: muni.name,
    prefName: shard.prefName,
    fy: useFy,
    fyLabel: DECISION_FY_LABELS[useFy] ?? `${fyEraLabel(useFy)} 決算`,
    pop: y.pop,
    perCapYen: y.perCapYen,
    total: y.expTotalOku,
    revTotal: y.revTotalOku,
    yoy: yoyLabel(y.expTotalOku, prevTotal),
    prevTotal,
    finIdx: y.finIdx,
    keijo: y.keijo,
    kosai: y.kosai,
    shorai: y.shorai,
    revenue,
    expenditure,
    availableFys,
    evidence: cards,
    primaryEvidence: primary,
    refLabel: `${y.ref.file} ${y.ref.row}行目`,
    nature: y.nature ? sortedNodes(y.nature).filter((n) => n.v > 0) : null,
    bond: y.bond ?? null,
  };
}
