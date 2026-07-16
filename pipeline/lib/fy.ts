// 年度コード（"R8" / "H31"）の解釈。derive と registry が共用する。
//
// かつて derive・registry の各所が `令和${fy.slice(1)}` を直書きしており、H 年度を足すと
// 画面に「令和30年度」と出た（特別区の過年度は中央 H29・江東 H28・大田 H20 まで現存する）。
// 年号のラベル付けはここ1か所に集約する。
//
// 元年の表記は「1」のまま（「元」に変換しない）。既存の gen（甲府の執行 R1・評価 R1 等）が
// 「令和1年度」で出ており、変換すると既存 gen 全体に差分が波及するため。画面の前年比較ラベル
// だけは従来から「令和元年度」と出しているが、それはクライアント側（src/client/lib/data.ts の
// fyEraLabel）の責務で、こちらは資料タイトル・fyLabel 用。

/** "R8" → "令和8"、"H31" → "平成31"（年度・当初予算などの接尾辞は呼び出し側で付ける） */
export const eraYear = (fy: string): string => {
  const m = /^([HR])(\d+)$/.exec(fy);
  if (!m) throw new Error(`年度の表記を解釈できません: ${fy}（R8 / H31 形式のみ）`);
  return `${m[1] === "H" ? "平成" : "令和"}${m[2]}`;
};

/** 年度の新旧比較用ランク（大きいほど新しい）。平成は令和より必ず古い */
export const fyRank = (fy: string): number => {
  const m = /^([HR])(\d+)$/.exec(fy);
  if (!m) throw new Error(`年度の表記を解釈できません: ${fy}（R8 / H31 形式のみ）`);
  return (m[1] === "R" ? 1000 : 0) + Number(m[2]);
};
