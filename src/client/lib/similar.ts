// ============================================================================
// 類似自治体比較 — 「何で比べるか（軸）」を先に選び、その軸で近い自治体をサジェストする。
//
// 以前は導出時に「人口15〜25万人の市から人口の近い4市」を決め打ちして甲府市専用の
// 静的リストを吐いていたため、(a) どの自治体を見ても甲府市の行が出る (b) なぜその4市
// なのかが画面から分からない、という2つの問題があった。ここでは全国索引
// （public/decision/similar-index.json・全1,741市町村）に対して軸ごとの距離を計算し、
// 選出理由が画面に出せる形にする。比較相手は任意に足せる（サジェストは初期値でしかない）。
//
// 母集団は全国だが、既定では同じ種別（市／町村）に絞る。市と町村は財政構造が違ううえ、
// 一次資料のファイル自体が別（都市別／町村別）のため。種別を跨いだ比較は検索から手動で選ぶ。
// ============================================================================
import type { SimilarIndex, SimilarIndexRow } from "../hooks/useSimilarIndex";

export type SimilarAxisKey = "pop" | "exp" | "perCap" | "finIdx" | "mix";

export interface SimilarAxis {
  key: SimilarAxisKey;
  /** 選択チップの見出し */
  label: string;
  /** 「近い順」の説明（画面に選出理由として出す） */
  desc: string;
}

export const SIMILAR_AXES: SimilarAxis[] = [
  { key: "pop", label: "人口", desc: "人口が近い順" },
  { key: "exp", label: "財政規模", desc: "歳出決算総額が近い順" },
  { key: "perCap", label: "1人あたり歳出", desc: "1人あたり歳出が近い順" },
  { key: "finIdx", label: "財政力指数", desc: "財政力指数が近い順" },
  { key: "mix", label: "歳出構成", desc: "歳出構成比（民生費・教育費・土木費・公債費・その他）が近い順" },
];

export const DEFAULT_SIMILAR_AXIS: SimilarAxisKey = "pop";
/** 既定でサジェストから比較表に載せる件数 */
export const DEFAULT_PEER_COUNT = 4;
/** サジェストとして提示する件数 */
export const SUGGEST_COUNT = 8;
/** 平均行を算出する帯の広さ（軸で近い上位◯団体） */
export const BAND_SIZE = 20;

export const isSimilarAxis = (v: string | null | undefined): v is SimilarAxisKey =>
  SIMILAR_AXES.some((a) => a.key === v);

export const axisOf = (key: SimilarAxisKey): SimilarAxis =>
  SIMILAR_AXES.find((a) => a.key === key) ?? SIMILAR_AXES[0]!;

/** 種別の表示名（市／町村）。母集団の説明に使う */
export const familyLabel = (f: "city" | "town"): string => (f === "city" ? "市" : "町村");

/** 軸のスカラー値。財政力指数は未公表がありうるので null を返しうる */
function axisScalar(row: SimilarIndexRow, key: SimilarAxisKey): number | null {
  switch (key) {
    case "pop": return row.pop;
    case "exp": return row.exp;
    case "perCap": return row.pc;
    case "finIdx": return row.fi;
    case "mix": return null; // ベクトル軸（axisDistance で扱う）
  }
}

/**
 * 軸上の距離（小さいほど似ている）。比較できない組み合わせ（財政力指数が未公表など）は null。
 * 歳出構成はベクトル軸なので構成比のユークリッド距離（%ポイント）を使う。
 */
export function axisDistance(
  self: SimilarIndexRow,
  other: SimilarIndexRow,
  key: SimilarAxisKey,
): number | null {
  if (key === "mix") {
    let sum = 0;
    for (let i = 0; i < self.mix.length; i++) {
      const d = (self.mix[i] ?? 0) - (other.mix[i] ?? 0);
      sum += d * d;
    }
    return Math.sqrt(sum);
  }
  const a = axisScalar(self, key);
  const b = axisScalar(other, key);
  if (a == null || b == null) return null;
  return Math.abs(a - b);
}

/**
 * 母集団: 同じ種別の他団体で、その軸で比較できるものだけ（近い順）。
 * 同値は人口の近い順で解く。財政力指数のように小数2桁で公表される軸は完全同値が
 * 数十団体単位で出るため、団体コード順だと北海道の小さな市ばかりが並んで
 * 「なぜこの並び？」になる（人口が近いほうが比較相手として腑に落ちる）。
 */
export function rankPeers(
  index: SimilarIndex,
  self: SimilarIndexRow,
  key: SimilarAxisKey,
): SimilarIndexRow[] {
  return index.munis
    .filter((m) => m.c !== self.c && m.f === self.f)
    .flatMap((m) => {
      const d = axisDistance(self, m, key);
      return d == null ? [] : [{ m, d, pd: Math.abs(m.pop - self.pop) }];
    })
    .sort((a, b) => a.d - b.d || a.pd - b.pd || a.m.c.localeCompare(b.m.c))
    .map((x) => x.m);
}

/** その軸で近い上位 BAND_SIZE 団体の平均。行が1つも無ければ null */
export function bandAverage(
  index: SimilarIndex,
  self: SimilarIndexRow,
  key: SimilarAxisKey,
  band: SimilarIndexRow[],
): { name: string; note: string; pop: number; exp: number; pc: number; mix: number[]; count: number } | null {
  if (!band.length) return null;
  const n = band.length;
  const popSum = band.reduce((a, m) => a + m.pop, 0);
  const expSum = band.reduce((a, m) => a + m.exp, 0);
  // 1人あたり・構成比は「団体ごとの平均」ではなく帯の合算ベース（大小の団体を等重みにしない）
  const mix: number[] = [];
  let rest = 100;
  for (let i = 0; i < index.mixCols.length - 1; i++) {
    const share = band.reduce((a, m) => a + (m.exp * (m.mix[i] ?? 0)) / 100, 0) / expSum;
    const rounded = Math.round(share * 1000) / 10;
    mix.push(rounded);
    rest -= rounded;
  }
  mix.push(Math.round(rest * 10) / 10);
  return {
    name: `${axisOf(key).label}が近い${n}${familyLabel(self.f)}の平均`,
    note: `全国の${familyLabel(self.f)}のうち${self.n}と${axisOf(key).desc.replace(/順$/, "")}上位${n}団体から算出（導出値）`,
    pop: Math.round(popSum / n),
    exp: Math.round((expSum / n) * 10) / 10,
    pc: Math.round((expSum * 1e8) / popSum),
    mix,
    count: n,
  };
}

/** 索引の来歴（fx・rw）→ 画面表示用ラベル（例: "都市別・概況 436行目"） */
export const refLabelOf = (index: SimilarIndex, row: SimilarIndexRow): string =>
  `${index.files[row.fx]?.short ?? "原資料"} ${row.rw}行目`;

/** 索引の来歴 → 機械可読な locator（例: "001061669.xlsx#row436"） */
export const refOf = (index: SimilarIndex, row: SimilarIndexRow): string =>
  `${index.files[row.fx]?.name ?? "?"}#row${row.rw}`;

/** 検索（自治体名・都道府県名の部分一致）。選択済み・自身は除く */
export function searchMunis(
  index: SimilarIndex,
  q: string,
  exclude: Set<string>,
  limit = 12,
): SimilarIndexRow[] {
  const t = q.trim();
  if (!t) return [];
  return index.munis
    .filter((m) => !exclude.has(m.c) && (m.n.includes(t) || m.p.includes(t) || `${m.p}${m.n}`.includes(t)))
    .slice(0, limit);
}
