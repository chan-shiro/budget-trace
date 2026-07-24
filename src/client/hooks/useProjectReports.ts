"use client";
// 事業報告（成果）の全量公開シャード（public/reports/<団体コード>.json）を、
// その自治体を見ているときだけ取得するフック。
//
// 甲府は公表サンプル5件なので静的 gen（report.gen.ts）で足りるが、**川崎は572事業で696KB**あり、
// 静的 import すると gen の合計（既に2.1MB）が倍になって全ページのバンドルに載る。
// 決算シャード（useDecisionData）・similar-index・coverage.json と同じ方針で、
// **この断面が要る画面でだけ**取得する。札幌（R7=666件）・横浜を足しても同じ形に乗る。
import { useEffect, useState } from "react";

export interface ReportCost {
  fy: string;
  kind: "決算" | "当初" | "計画" | "予算";
  jigyohi: number | null;
  jinkenhi: number | null;
  totalCost: number | null;
  ippanZaigen: number | null;
  /** 決算額が見込み（評価年度のため確定値でない）。川崎 R6 の決算額が該当 */
  est?: 1;
}
export interface ReportItem {
  /** 事務事業コード。**年度をまたいで安定**するので経年追跡に使える */
  code: string;
  name: string;
  buka: string;
  policy: string;
  measure: string;
  /** 達成度 1〜5。**1が最良で5が最悪**（甲府の A〜F とは向きが逆） */
  achievement: number | null;
  /** 方向性区分 Ⅰ〜Ⅴ */
  direction: string;
  /** 進捗の自己評価（北九州の「順調/概ね順調/やや遅れ/遅れ」。achievement/grade とは別語彙） */
  progress: string;
  /**
   * 款名（歳出予算科目の款番号を**対象年度の予算**で解決したもの）。
   * **横浜だけが持つ** — これがあると款ドリルから事業→成果へ降りられる。解決できなければ null
   */
  kanName: string | null;
  cost: ReportCost[];
  /** 自サーバーの原本コピー（該当ページ） */
  ref: string;
  refLabel: string;
}
export interface ProjectReportShard {
  muniCode: string;
  muniName: string;
  /** 資料の呼び名。市ごとに違う（川崎=事務事業評価シート / 横浜=事業評価書 / 札幌=事業評価調書） */
  docLabel: string;
  /** 評価様式の説明文（カテゴリ評価を持たない資料のみ・derive が資料ごとに書く）。無ければ null */
  evalNote: string | null;
  /** 一般会計以外（特別会計）で除外した事業数 */
  excluded: number;
  /**
   * **その資料が実際に持つ項目**。画面の説明文をこれで組み立てる。
   * 川崎と横浜は持ち物が違う（横浜は人件費・総コスト・達成度・方向性のいずれも持たず、
   * 代わりに**款項目を持つ唯一の資料**）。決め打ちすると嘘になる。
   */
  has: {
    jinkenhi: boolean;
    totalCost: boolean;
    achievement: boolean;
    direction: boolean;
    progress: boolean;
    kanKoumoku: boolean;
    estimate: boolean;
  };
  fy: string;
  fyLabel: string;
  sourceTitle: string;
  originUrl: string;
  landingPage: string;
  achievementLabels: Record<string, string>;
  directionLabels: Record<string, string>;
  achievementCounts: Record<string, number>;
  reports: ReportItem[];
}

const cache: Record<string, ProjectReportShard> = {};
const inflight: Record<string, Promise<ProjectReportShard>> = {};

function load(muniCode: string): Promise<ProjectReportShard> {
  const hit = cache[muniCode];
  if (hit) return Promise.resolve(hit);
  const running = inflight[muniCode];
  if (running) return running;
  const p = fetch(`/reports/${muniCode}.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`事業報告の取得に失敗しました: ${r.status}`);
      return r.json() as Promise<ProjectReportShard>;
    })
    .then((d) => {
      cache[muniCode] = d;
      delete inflight[muniCode];
      return d;
    })
    .catch((e) => {
      delete inflight[muniCode];
      throw e;
    });
  inflight[muniCode] = p;
  return p;
}

/** muniCode が null / 全量公開が無い自治体なら取得しない */
export function useProjectReports(muniCode: string | null): {
  data: ProjectReportShard | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<ProjectReportShard | null>(muniCode ? cache[muniCode] ?? null : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!muniCode) {
      setData(null);
      return;
    }
    const hit = cache[muniCode];
    if (hit) {
      setData(hit);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    load(muniCode)
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
  }, [muniCode]);

  return { data, loading, error };
}
