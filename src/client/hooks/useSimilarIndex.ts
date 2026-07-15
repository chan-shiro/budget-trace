"use client";
// 類似自治体比較の全国索引（public/decision/similar-index.json）を
// /similar 画面でだけ取得するフック。
// 全1,741市町村の比較断面（人口・歳出総額・1人あたり歳出・財政力指数・歳出構成比）が
// 入っており 260KB 級になるため、静的 import して全ページのバンドルに載せない
// （coverage.json・決算シャードと同じ方針。静的 JSON の GET のみ）。
// 決算シャードは県単位なので全国横断の並べ替えができず、この画面専用の索引を別に持つ。
import { useEffect, useState } from "react";
import { SIMILAR_INDEX_URL } from "../lib/similar.gen";

/** 索引の1行（キーはファイルサイズのため短い。金額は億円、1人あたりは円） */
export interface SimilarIndexRow {
  /** 団体コード */
  c: string;
  /** 自治体名 */
  n: string;
  /** 都道府県名 */
  p: string;
  /** 市＝city／町村＝town（資料が別ファイルで財政構造も異なる） */
  f: "city" | "town";
  /** 住民基本台帳人口 */
  pop: number;
  /** 歳出決算総額（億円） */
  exp: number;
  /** 1人あたり歳出（円） */
  pc: number;
  /** 財政力指数（未公表は null） */
  fi: number | null;
  /** 索引の mixCols 順の歳出構成比（%、合計100） */
  mix: number[];
  /** 来歴: files 内の位置 */
  fx: number;
  /** 来歴: 原資料の行番号 */
  rw: number;
}

export interface SimilarIndex {
  /** 収録年度（例: "R6"） */
  fy: string;
  /** 画面表示用の年度ラベル */
  fyLabel: string;
  mixCols: string[];
  /** 来歴の参照先ファイル（fx の並び） */
  files: { name: string; short: string }[];
  munis: SimilarIndexRow[];
}

let cache: SimilarIndex | null = null;
let inflight: Promise<SimilarIndex> | null = null;

function load(): Promise<SimilarIndex> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetch(SIMILAR_INDEX_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`類似自治体の索引の取得に失敗しました: ${r.status}`);
      return r.json() as Promise<SimilarIndex>;
    })
    .then((d) => {
      cache = d;
      inflight = null;
      return d;
    })
    .catch((e) => {
      inflight = null;
      throw e;
    });
  return inflight;
}

export function useSimilarIndex(enabled: boolean): {
  data: SimilarIndex | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<SimilarIndex | null>(cache);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || cache) {
      if (cache) setData(cache);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    load()
      .then((d) => {
        if (cancelled) return;
        setData(d);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { data, loading, error };
}
