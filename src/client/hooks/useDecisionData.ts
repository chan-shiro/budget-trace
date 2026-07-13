"use client";
// 全国 決算シャード（public/decision/<県コード>.json）を選択時にフェッチするフック。
// アプリはこれまで実行時フェッチ0の SPA だが、全1,741市町村の決算断面は
// バンドルに焼き込めない（〜30MB）ため、県コードごとに1ファイルを取得しキャッシュする。
// 「ウェブは読み取り提供のみ」の方針と整合（静的 JSON の GET のみ）。
import { useEffect, useState } from "react";
import type { DecisionShard } from "../lib/decision";

// モジュールスコープのキャッシュ（画面遷移をまたいで保持。同一県は1回だけ取得）
const cache = new Map<string, DecisionShard>();
const inflight = new Map<string, Promise<DecisionShard>>();

function load(prefCode: string): Promise<DecisionShard> {
  const cached = cache.get(prefCode);
  if (cached) return Promise.resolve(cached);
  const existing = inflight.get(prefCode);
  if (existing) return existing;
  const q = fetch(`/decision/${prefCode}.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`決算データ（${prefCode}）の取得に失敗しました: ${r.status}`);
      return r.json() as Promise<DecisionShard>;
    })
    .then((data) => {
      cache.set(prefCode, data);
      inflight.delete(prefCode);
      return data;
    })
    .catch((e) => {
      inflight.delete(prefCode);
      throw e;
    });
  inflight.set(prefCode, q);
  return q;
}

export interface DecisionDataState {
  shard: DecisionShard | null;
  loading: boolean;
  error: string | null;
}

/**
 * 県コード（2桁）のシャードを取得する。null なら何もしない（甲府など full 階層や未選択時）。
 * 既にキャッシュ済みなら同期的に返し、ローディングを出さない。
 */
export function useDecisionData(prefCode: string | null): DecisionDataState {
  const [state, setState] = useState<DecisionDataState>(() => ({
    shard: prefCode ? cache.get(prefCode) ?? null : null,
    loading: false,
    error: null,
  }));

  useEffect(() => {
    if (!prefCode) {
      setState({ shard: null, loading: false, error: null });
      return;
    }
    const cached = cache.get(prefCode);
    if (cached) {
      setState({ shard: cached, loading: false, error: null });
      return;
    }
    let cancelled = false;
    setState({ shard: null, loading: true, error: null });
    load(prefCode)
      .then((data) => {
        if (!cancelled) setState({ shard: data, loading: false, error: null });
      })
      .catch((e) => {
        if (!cancelled) setState({ shard: null, loading: false, error: String(e?.message ?? e) });
      });
    return () => {
      cancelled = true;
    };
  }, [prefCode]);

  return state;
}
