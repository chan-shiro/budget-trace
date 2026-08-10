"use client";
// 当初予算シャード（public/munibudgets/<団体コード>.json）を選択時にフェッチするフック。
//
// **バンドルに焼き込まない理由**（#216）: budget 階層の全エンティティ×全年度を TS モジュールで
// 持つと 6.8MB になり、**ビルド時間のほぼ全部がその解析**になる（実測: 6.8MB で
// `Compiled in 3.2min`、重複込みの 8.9MB では 6.0min。**サイズに対して超線形に効く**）。
// 収録が増えるほど悪化するので、決算シャード（`useDecisionData`）と同じ形に揃える。
//
// 画面が要るのは**いま見ている1団体ぶんだけ**なので、団体コードごとに1ファイルを取得する。
// 「ウェブは読み取り提供のみ」の方針と整合（静的 JSON の GET のみ）。
import { useEffect, useState } from "react";
import type { MuniBudget } from "../lib/munibudgets.gen";

// モジュールスコープのキャッシュ（画面遷移をまたいで保持。同一団体は1回だけ取得）
const cache = new Map<string, MuniBudget[]>();
const inflight = new Map<string, Promise<MuniBudget[]>>();

function load(code: string): Promise<MuniBudget[]> {
  const cached = cache.get(code);
  if (cached) return Promise.resolve(cached);
  const existing = inflight.get(code);
  if (existing) return existing;
  const q = fetch(`/munibudgets/${code}.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`当初予算データ（${code}）の取得に失敗しました: ${r.status}`);
      return r.json() as Promise<MuniBudget[]>;
    })
    .then((data) => {
      cache.set(code, data);
      inflight.delete(code);
      return data;
    })
    .catch((e) => {
      inflight.delete(code);
      throw e;
    });
  inflight.set(code, q);
  return q;
}

export interface MuniBudgetsState {
  /** 収録年度（新しい順）。未取得なら null */
  years: MuniBudget[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * 団体コードの当初予算（全収録年度）を取得する。null なら何もしない
 * （甲府など full 階層・decision 階層・未選択時）。
 * 既にキャッシュ済みなら同期的に返し、ローディングを出さない。
 */
export function useMuniBudgets(code: string | null): MuniBudgetsState {
  const [state, setState] = useState<MuniBudgetsState>(() => ({
    years: code ? cache.get(code) ?? null : null,
    loading: false,
    error: null,
  }));

  useEffect(() => {
    if (!code) {
      setState({ years: null, loading: false, error: null });
      return;
    }
    const cached = cache.get(code);
    if (cached) {
      setState({ years: cached, loading: false, error: null });
      return;
    }
    let cancelled = false;
    setState({ years: null, loading: true, error: null });
    load(code)
      .then((data) => {
        if (!cancelled) setState({ years: data, loading: false, error: null });
      })
      .catch((e) => {
        if (!cancelled) setState({ years: null, loading: false, error: String(e?.message ?? e) });
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return state;
}
