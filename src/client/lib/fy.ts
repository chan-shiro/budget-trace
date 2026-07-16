// 年度コード（"R8" / "H31"）→ 画面の年度ラベル。パイプライン側の対応物は pipeline/lib/fy.ts。
//
// **2つに分かれているのは意図的**: パイプライン側は資料タイトル・fyLabel 用で、元年を「1」の
// まま出す（既存 gen 互換）。こちらは画面用で「令和元年度」と出す。混ぜると gen 全体に差分が出る。
//
// data.ts ではなくここに置くのは、data.ts が decision.ts を import しており、decision.ts から
// data.ts を引くと循環するため。年号のラベル付けはクライアント側でもここ1か所に集約する。

/** "R8" → "令和8年度"、"H31" → "平成31年度"、"R1" → "令和元年度"。解釈できない値はそのまま返す */
export function fyEraLabel(fy: string): string {
  const m = /^([HR])(\d+)$/.exec(fy);
  if (!m) return fy;
  return `${m[1] === 'H' ? '平成' : '令和'}${m[2] === '1' ? '元' : m[2]}年度`;
}

/** 前年度のラベル。年号をまたぐ（R2 の前年＝令和元年度・R1 の前年＝平成30年度） */
export function prevFyEraLabel(fy: string): string {
  const m = /^([HR])(\d+)$/.exec(fy);
  if (!m) return fy;
  return fyEraLabel(m[1] === 'R' && m[2] === '1' ? 'H30' : `${m[1]}${Number(m[2]) - 1}`);
}
