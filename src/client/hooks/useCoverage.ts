"use client";
// データ整備状況（public/coverage.json）を /coverage 画面でだけ取得するフック。
// 全1,741市町村 × データセットの ○× と、全資料の保管情報・ライセンス区分が入っており
// 130KB 級になるため、静的 import して全ページのバンドルに載せず、この画面で取得する
// （決算シャードと同じ方針。静的 JSON の GET のみ）。
import { useEffect, useState } from "react";

export interface CoverageDatasetCol {
  key: string;
  /** 表の列見出し（短い） */
  label: string;
  /** 正式名（凡例・tooltip 用） */
  full: string;
}
export interface CoverageFile {
  filename: string;
  sha256: string;
  bytes: number;
  fetchedAt: string;
  localUrl: string;
}
export interface CoverageSource {
  sourceId: string;
  title: string;
  publisher: string;
  fiscalYear: string;
  kind: string;
  license: string;
  licenseClass: "open" | "permission-required" | "unverified";
  originUrl: string;
  landingPage: string | null;
  files: CoverageFile[];
  archived: boolean;
  archiveOrigin: boolean;
  archiveUrl: string | null;
  shaVerified: boolean;
}
export interface CoverageEntity {
  name: string;
  pref: string;
  tier: string;
  isPref: boolean;
  /** データセットkey → 中身の説明（存在するものだけ） */
  detail: Record<string, string>;
  sources: CoverageSource[];
}
export interface CoverageMuniRow {
  /** 団体コード */
  c: string;
  /** 団体名 */
  n: string;
  /** データセットごとの 1/0（datasets の順） */
  f: string;
}
export interface CoveragePref {
  name: string;
  code: string;
  munis: CoverageMuniRow[];
}
export interface CoverageData {
  datasets: CoverageDatasetCol[];
  summary: {
    sourceCount: number;
    fileCount: number;
    archivedCount: number;
    shaVerifiedCount: number;
    licenseOpen: number;
    licensePermission: number;
    licenseUnverified: number;
    fullCount: number;
    budgetCount: number;
    muniCount: number;
    prefCount: number;
    kessanRange: string;
  };
  prefs: CoveragePref[];
  /** 収録済み団体の詳細（団体コード → 詳細）。手付かずの団体はここに居ない */
  entities: Record<string, CoverageEntity>;
  national: CoverageSource[];
  unclassified: CoverageSource[];
}

let cache: CoverageData | null = null;
let inflight: Promise<CoverageData> | null = null;

function load(): Promise<CoverageData> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetch("/coverage.json")
    .then((r) => {
      if (!r.ok) throw new Error(`データ整備状況の取得に失敗しました: ${r.status}`);
      return r.json() as Promise<CoverageData>;
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

export function useCoverage(enabled: boolean): { data: CoverageData | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<CoverageData | null>(cache);
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
