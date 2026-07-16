// [1b]→ Wayback スナップショットの照合まわりの純ロジック。
//
// `pipeline/archive.ts` は CLI（読み込むと即実行される）ため、判定だけを切り出して
// import 可能にしてある。ここは fetch もファイル I/O もしない。

/**
 * Wayback の一部クローラは大きなファイルを **MiB 境界ちょうど**で打ち切る。
 * **上限は1つではない**（2026-07-16 実測）: 神戸R8 24MB→**5 MiB** / 山口R7 5.3MB→5 MiB /
 * 京都R5・R4→5 MiB / **浜松R5 3.9MB→1 MiB**。
 * 最初は「5 MiB ちょうど」を定数にしていたが、1 MiB の実例が出て反証された。
 */
export const MIB = 1024 * 1024;

/**
 * sha256 を照合する種別。**HTML は設計として照合しない**（テンプレート差＝トークン・広告タグ等で
 * 取得時刻によりバイト列が揺れるため）。`verifySnapshot` と archive 末尾の健康診断が
 * **同じ定数を見る**こと — 別々に持つと、甲府の議会・決算詳細の HTML 12件が毎回「未照合」として
 * 出続ける恒久的なノイズになる（実際に一度そうなった）。
 */
export const VERIFIABLE_RE = /\.(pdf|xlsx?|csv)$/i;

export type VerifyKind = "match" | "truncated" | "partial" | "other";

/**
 * 魚拓のコピーが raw と食い違ったときの**型**を決める。この分類がそのまま人への助言になるので、
 * 意味の違うものを混ぜない（混ぜると**原因が正反対の助言**が出る）。
 *
 * - `truncated` … **MiB 境界ちょうど**で raw より小さい ＝ Wayback 側の打ち切り。
 *   **私たちの raw が正しい**。--force で再登録しても同じ上限で切られる見込み。
 *   実ファイルが 1 MiB の倍数ちょうどになる確率は100万分の1程度で、かつ「raw より小さい」
 *   「sha 不一致」も同時に満たす必要があるので**断定してよい**。
 * - `partial` … raw より小さいが境界に乗らない。**断定しない** — 原因が3つあり得る:
 *   ① **Wayback が取り込み中**（SPN で保存した直後に照合すると途中までしか返らない）。
 *   ② 古い版が単に小さいだけ。③ 恒久的に不完全な捕捉。
 *   **①は時間を置けば直る**（実例: 江戸川 R8 は保存直後に 142,235 / 4,820,529 bytes だったが、
 *   **同じスナップショットが後日 4,820,529 bytes で完全一致した** — 2026-07-16 に実測）。
 *   なので助言は「まず時間を置いて再照合」であり、いきなり --force ではない。
 *   境界判定だけだとこれが `other` に落ち、「別版なので --force で再登録を」という
 *   **原因が正反対の助言**になっていた（2026-07-16 に江戸川 R8 で発見）。
 * - `other` … 小さくもないのに sha が違う ＝ **別版**の疑い。--force で現行版の再登録が要る。
 */
export function classifyVerify(match: boolean, bytes: number, rawBytes: number): VerifyKind {
  if (match) return "match";
  const short = bytes > 0 && bytes < rawBytes;
  if (short && bytes % MIB === 0) return "truncated";
  if (short) return "partial";
  return "other";
}
