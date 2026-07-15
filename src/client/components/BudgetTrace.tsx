"use client";

import React from "react";
import { CountUpNum } from "./ui";
import * as D from "@/client/lib/data";
import { useDecisionData } from "@/client/hooks/useDecisionData";
import { useCoverage } from "@/client/hooks/useCoverage";
import { useProjectReports } from "@/client/hooks/useProjectReports";
import { REPORT_MUNIS } from "@/client/lib/reports-index.gen";
// データの注意（validate の warning から derive が生成。手書きしない）
import { CAVEATS } from "@/client/lib/caveats.gen";
import { useSimilarIndex } from "@/client/hooks/useSimilarIndex";
import { stateToPath, locationToState, type RouteState } from "@/client/lib/routing";
// 進捗（実データから derive が算出）と計画（pipeline/registry/roadmap.ts が唯一の手書き）。
// 数KBなので静的 import でよい（130KB級の coverage.json はフェッチしている）
import { ROADMAP_PROGRESS, ROADMAP_PLAN } from "@/client/lib/roadmap.gen";
import BudgetTraceView from "./BudgetTraceView";

const {
  GLOSS, SIMILAR_EVIDENCE,
  KOFU_BUDGET_YEARS, KOFU_PROJECT_YEARS, KOFU_EXECUTION_YEARS, KOFU_EVALUATION_YEARS, KOFU_OUTTURN_YEARS, KOFU_R6_DETAIL, KOFU_TREND, KOFU_COUNCIL, KOFU_COUNCIL_YEARS, KOFU_REPORT_YEARS,
  muniFromBudget, fmtOku, pctOf, fmtPerCap, fmtPop, fmtYen, fadeColor, donutBg, setPalette,
} = D;
type SimilarAxisKey = D.SimilarAxisKey;

/* eslint-disable @typescript-eslint/no-explicit-any */

interface St {
  screen: string;
  pref: string | null;
  muni: string | null;
  /** 選択自治体の団体コード（6桁）。full 階層=甲府は "192015"、decision 階層は各コード */
  muniCode?: string;
  drillSide: string;
  drillPath: string[];
  theme: string | null;
  searchQ: string;
  unit?: string;
  compSide?: string;
  execSide?: string;
  /** 予算執行状況タブの表示年度（"R7" など。未指定は最新） */
  execFy?: string;
  /** 表示中の当初予算年度（"R8" など。未指定は最新年度） */
  budgetFy?: string;
  /** 事業報告（成果）で開いている事務事業の番号（詳細票の No。未指定は先頭） */
  reportNo?: string;
  /** 類似自治体比較の比較軸（"pop" など。未指定は人口） */
  simAxis?: string;
  /** 類似自治体比較で表に載せている比較相手（団体コード）。未指定は軸のサジェスト上位 */
  simVs?: string[];
  /** 類似自治体比較の検索語（任意の自治体を比較相手に足す） */
  simQ?: string;
  /** データ整備状況の検索語 */
  covQ?: string;
  srcQ?: string;
  srcPage?: number;
  repQ?: string;
  repPage?: number;
  /** データ整備状況で展開中の都道府県 */
  covOpen?: string[];
  /** データ整備状況で資料を開いている自治体（団体コード） */
  covMuni?: string | null;
  /** 一次資料ドロワー（自サーバー配信の原本コピーをその場でレビュー） */
  viewer?: {
    /** 自サーバーのコピー URL（/sources/...。フラグメントなし） */
    url: string;
    /** 初期表示ページ（1-origin） */
    page: number;
    /** 「新しいタブで開く」用 URL（#page=N 付き） */
    tabUrl: string;
    title: string;
    /** 位置・来歴の補足（例: "主な事業一覧 p.17"） */
    sub: string;
    /** 発行元の元 URL（最新版に差し替わっている可能性あり） */
    originUrl: string;
    /** Wayback Machine のコピー */
    archiveUrl: string;
  } | null;
  tip?: any;
}

const DEFAULT_ST: St = {
  screen: "top", pref: null, muni: null,
  drillSide: "exp", drillPath: [], theme: null,
  searchQ: "", unit: "total", compSide: "exp", tip: null,
  simQ: "", covQ: "", covOpen: [], covMuni: null, srcQ: "", srcPage: 1, repQ: "", repPage: 1,
};

// 総合計画の基本目標（= 政策テーマ）。各年度の主な事業の basicGoal から集計する。
// R8〜は第七次総合計画（ひと/まち/魅力）。それ以前（第六次: 基本目標1〜4・
// 基本構想の推進）は事業データから動的に目標一覧を作る
const PLAN_BY_FY: Record<string, { plan: string; goals?: { name: string; label: string }[] }> = {
  R8: {
    plan: "第七次甲府市総合計画",
    goals: [
      { name: "ひと", label: "未来に輝く『ひと』を育む" },
      { name: "まち", label: "安全・安心で快適な『まち』を創る" },
      { name: "魅力", label: "都市機能と自然が調和する甲府の『魅力』を磨く" },
    ],
  },
  R7: { plan: "第六次甲府市総合計画" },
  R6: { plan: "第六次甲府市総合計画" },
  R5: { plan: "第六次甲府市総合計画" },
  R4: { plan: "第六次甲府市総合計画" },
  R3: { plan: "第六次甲府市総合計画" },
  R2: { plan: "第六次甲府市総合計画" },
};

export default function BudgetTrace({ initial }: { initial?: Partial<St> } = {}) {
  // 初期 state はサーバ側でパスから解決済み（初回描画から正しい画面＝チラつき無し）
  const [st, setStRaw] = React.useState<St>({ ...DEFAULT_ST, ...(initial ?? {}) });
  const tipTimer = React.useRef<any>(null);

  const setSt = (patch: Partial<St>) => setStRaw((s) => ({ ...s, ...patch }));
  const nav = (patch: Partial<St>) => {
    setSt(patch);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  // --- URL 同期（ディープリンク） ---
  // 各画面をパスに反映し、共有・リロード・ブラウザバックに対応する。初期 state は
  // サーバ側（catch-all ルート）でパスから解決済みなので、マウント時の復元は不要
  // （＝共有リンクを開いても初回からその画面が出る／トップのチラつきが無い）。
  const patchFromLocation = (): Partial<St> => {
    const r = locationToState(location.pathname, location.search) as Partial<St>;
    return { ...r, viewer: null, tip: null };
  };
  const urlReady = React.useRef(false);
  const lastScreen = React.useRef(st.screen);
  React.useEffect(() => {
    // popstate（戻る/進む）でパスから state を復元する
    urlReady.current = true;
    const onPop = () => setStRaw((prev) => ({ ...prev, ...patchFromLocation() }));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (!urlReady.current) return;
    const url = stateToPath(st as RouteState);
    if (`${location.pathname}${location.search}` === url) return;
    // 画面遷移は履歴に積む（戻るで前の画面へ）。同一画面内の切替は置き換え
    if (st.screen !== lastScreen.current) history.pushState(null, "", url);
    else history.replaceState(null, "", url);
    lastScreen.current = st.screen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.screen, st.pref, st.muni, st.muniCode, st.budgetFy, st.reportNo, st.drillSide, st.drillPath, st.theme, st.execFy, st.execSide, st.compSide, st.simAxis, st.simVs, st.unit]);

  // --- 一次資料ドロワー ---
  // 呼び出し側は #page=N 付き URL を渡してよい（ここで分離して PDF.js ビューアへ渡す）
  const openViewer = (p: Omit<NonNullable<St["viewer"]>, "page" | "tabUrl">) => {
    const m = p.url.match(/^([^#]*)(?:#page=(\d+))?$/);
    setSt({ viewer: { ...p, url: m?.[1] ?? p.url, page: m?.[2] ? Number(m[2]) : 1, tabUrl: p.url } });
  };
  const closeViewer = () => setSt({ viewer: null });
  const viewerOpen = !!st.viewer;
  React.useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStRaw((s) => ({ ...s, viewer: null }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen]);

  // --- チャート近傍ツールチップ（ホバー／タップ） ---
  const showTip = (e: any, title: string, amt: string, pct: string, sw: string, desc?: string, hover?: any) => {
    setSt({ tip: { x: e.clientX, y: e.clientY - 12, title, amt, pct, sw, desc: desc || "", hover: hover || null } });
    clearTimeout(tipTimer.current);
    tipTimer.current = setTimeout(() => setSt({ tip: null }), 3200);
  };
  const hideTip = () => { clearTimeout(tipTimer.current); setSt({ tip: null }); };
  const mkDonutTip = (items: any[], total: number, pop: number, key: string) => (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy), R = rect.width / 2;
    if (dist > R || dist < R * 0.58) { setSt({ tip: null }); return; }
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    let acc = 0, seg = items[items.length - 1], idx = items.length - 1;
    for (let i = 0; i < items.length; i++) {
      acc += (items[i].v / total) * 360;
      if (deg <= acc) { seg = items[i]; idx = i; break; }
    }
    showTip(e, seg.name, fmtOku(seg.v), pctOf(seg.v, total), D.PALETTE[idx % D.PALETTE.length],
      pop ? `1人あたり ${fmtPerCap(seg.v, pop)}` : "", key ? { key, idx } : null);
  };
  const mkSegTip = (title: string, amt: string, pct: string, sw: string, hover?: any) => (e: any) => showTip(e, title, amt, pct, sw, "", hover);
  const mkGloss = (term: string) => (e: any) => showTip(e, term, "", "", "#1798D0", GLOSS[term]);

  // ========================================================================
  // renderVals 相当
  // ========================================================================
  const s = st;
  const props = { colorMode: "カラフル", showEvidence: true };
  const showEvidence = props.showEvidence ?? true;
  const mapColorMode = props.colorMode ?? "カラフル";
  setPalette(mapColorMode);
  const screen = s.screen;
  const isApp = ["dash", "drill", "compare", "themes", "execution", "similar", "sources"].includes(screen);
  // データ整備状況は自治体スコープを持たない全体ページ（シャード取得も不要）
  const isCoverage = screen === "coverage";
  const isRoadmap = screen === "roadmap";
  const isSources = screen === "sources";
  // /coverage と /sources はどちらも「全資料の台帳」が要る。同じ coverage.json を共有する
  // （useCoverage はモジュールキャッシュを持つので、両方を見ても取得は1回）
  const { data: covData, loading: covLoading, error: covError } = useCoverage(isCoverage || isSources);

  // --- カバレッジ階層 ---
  // full = 甲府市（予算ベースの詳細: 主な事業・執行・評価・補正・前年当初比較）。
  // budget = 類似4市（当初予算の款別＋前年当初比較のみ・静的 gen）。
  // decision = 総務省 決算状況調ベース（全1,741市町村・県シャードを選択時に取得）。
  const prefName = s.pref || "山梨県";
  const prefCode = D.prefCodeOf(prefName);
  const muniCode = s.muniCode ?? null;
  const tier = D.tierOf(muniCode);
  const isFull = tier === "full";
  // シャードを取得する場面: 市区町村選択（グリッド描画）／ decision 自治体の閲覧
  const needShard = !!prefCode && (screen === "muni" || (isApp && tier === "decision"));
  const { shard, loading: shardLoading } = useDecisionData(needShard ? prefCode : null);
  const decisionView = React.useMemo(
    () =>
      isApp && tier === "decision" && shard && shard.prefCode === prefCode && muniCode
        ? D.buildDecisionView(shard, muniCode, s.budgetFy ?? "")
        : null,
    [isApp, tier, shard, prefCode, muniCode, s.budgetFy],
  );
  const isDecision = !!decisionView;
  // decision 自治体だがまだ表示できない（シャード取得待ち・名前解決前）
  const decisionPending = isApp && tier === "decision" && !decisionView;

  // budget 階層（当初予算・静的 gen）。政令市は R2〜R8 の7年前後を収録しているので、
  // full（甲府）と同じく**年度ドロップダウンで切り替える**。1年度しか無い自治体は要素1つの配列。
  // 事業報告（成果）の全量公開シャード。**索引にある自治体をダッシュボードで見ているときだけ**取得する
  // （696KB。決算シャード・coverage.json と同じ方針）
  const reportMuni = isApp && muniCode && REPORT_MUNIS[muniCode] ? muniCode : null;
  const { data: repData, loading: repLoading, error: repError } = useProjectReports(reportMuni);

  const muniBudgetYears = tier === "budget" && muniCode ? D.MUNI_BUDGET_YEARS[muniCode] ?? null : null;
  const muniBudget = muniBudgetYears
    ? muniBudgetYears.find((b) => b.fy === s.budgetFy) ?? muniBudgetYears[0]!
    : null;
  const isBudget = !!muniBudget;
  // 都道府県エンティティ（県全体）か。市町村向けの機能（類似自治体比較・主な事業）は出さない
  const isPref = !!muniBudget?.isPref;
  // この都道府県の「県全体」エンティティ（市区町村選択の県全体ボタン用）
  const prefEntity = Object.values(D.MUNI_BUDGETS).find((b) => b.isPref && b.prefName === prefName) ?? null;

  // 収録済み（full）の年度は当初予算の収録年度（R8〜R6・R3〜R2）から選択
  const budget = KOFU_BUDGET_YEARS.find((b) => b.fy === s.budgetFy) ?? KOFU_BUDGET_YEARS[0]!;
  // 議会の構成は「その予算を議決した議会」を表示年度に連動させる（無ければ最新へフォールバック）
  const councilForFy = KOFU_COUNCIL_YEARS.find((c) => c.fy === budget.fy) ?? KOFU_COUNCIL;
  const projYear = KOFU_PROJECT_YEARS.find((y) => y.fy === budget.fy);
  const KOFU_PROJECTS = React.useMemo(() => projYear?.projects ?? [], [projYear]);
  const KOFU_PROJECTS_SOURCE = projYear?.source ?? { title: "", url: "", originUrl: "", localUrl: "", pagesLabel: "" };
  const kofuData = React.useMemo(() => muniFromBudget(budget), [budget]);
  // 表示データ: decision=ビルダ出力 / budget=類似4市の当初予算 gen / full（甲府）=予算パース値
  const data: D.Municipality = decisionView
    ? {
        name: decisionView.name,
        total: decisionView.total,
        yoy: decisionView.yoy,
        year: decisionView.fyLabel,
        pop: decisionView.pop,
        revenue: decisionView.revenue,
        expenditure: decisionView.expenditure,
      }
    : muniBudget
      ? {
          name: muniBudget.muniName,
          total: muniBudget.totalOku,
          yoy: muniBudget.yoyLabel,
          year: muniBudget.fyLabel,
          pop: muniBudget.population,
          revenue: muniBudget.revenue,
          expenditure: muniBudget.expenditure,
        }
      : kofuData;
  // フッター右の SOURCE 表示。**表示中の自治体・階層の出典**を出す。
  // 以前は「甲府市 当初予算資料 R2–R8」を固定表示しており、横浜市を見ていても decision 階層の
  // 全1,741市町村を見ていても甲府の資料を出典として示していた（2026-07-15 修正）。
  // 資料は増えるので個別に列挙しない（トップのフッターと同じ方針）— 発行元と年度だけを出し、
  // 網羅的な収録状況は /coverage（実データから自動生成）へ誘導する。
  // 自治体スコープを持たない画面（/sources・/coverage）では出典が定まらないので出さない。
  const sourceLabel: string | null = isDecision
    ? `総務省 市町村別決算状況調 ${D.DECISION_YEARS[D.DECISION_YEARS.length - 1]}–${D.DECISION_YEARS[0]}`
    : isBudget
      ? `${muniBudget!.muniName} ${muniBudget!.fyLabel}`
      : isFull
        ? `甲府市 当初予算資料 ${KOFU_BUDGET_YEARS[KOFU_BUDGET_YEARS.length - 1]!.fy}–${KOFU_BUDGET_YEARS[0]!.fy}`
        : null;

  // 当初予算ベース（full＝甲府 or budget＝類似4市）。決算（decision）と対比
  const isPredose = isFull || isBudget;
  const goalProjects = (goal: string) => KOFU_PROJECTS.filter((p) => p.basicGoal.split("・").includes(goal));
  // 政策テーマの目標一覧（R8 はラベル付き定義、過年度は事業データから動的に）
  const planInfo = PLAN_BY_FY[budget.fy] ?? { plan: "甲府市総合計画" };
  const GOALS = React.useMemo(
    () =>
      planInfo.goals ??
      Array.from(new Set(KOFU_PROJECTS.flatMap((p) => p.basicGoal.split("・").filter(Boolean))))
        // 「基本目標1〜4」を先に、「基本構想の推進」等はその後ろに
        .sort((a, b) => {
          const num = (g: string) => (/^基本目標/.test(g) ? 0 : 1);
          return num(a) - num(b) || a.localeCompare(b, "ja");
        })
        // 見出しの名称が資料にある年度（R2・R3 の箇条書き形式）はラベルに使う
        .map((name) => ({
          name,
          label: KOFU_PROJECTS.find((p) => p.basicGoal === name && p.basicGoalLabel)?.basicGoalLabel ?? "",
        })),
    [planInfo.goals, KOFU_PROJECTS],
  );
  // 事務事業評価（同年度の評価を予算名 or 事業名の完全一致でだけ紐付ける — 曖昧マッチしない）
  const evalYear = KOFU_EVALUATION_YEARS.find((y) => y.fy === budget.fy);
  const evalFor = React.useMemo(() => {
    const byKey = new Map<string, { grade: string; ref: string; fyLabel: string; sourceTitle: string }>();
    for (const it of evalYear?.items ?? []) {
      const val = { grade: it.grade, ref: it.ref, fyLabel: evalYear!.fyLabel, sourceTitle: evalYear!.sourceTitle };
      if (it.budgetName) byKey.set(`b:${it.budgetName}`, val);
      byKey.set(`n:${it.name}`, val);
    }
    return (p: { name: string; budgetBookName: string | null }) =>
      (p.budgetBookName ? byKey.get(`b:${p.budgetBookName}`) : undefined) ??
      byKey.get(`n:${p.name}`) ??
      (p.budgetBookName ? byKey.get(`n:${p.budgetBookName}`) : undefined) ??
      null;
  }, [evalYear]);
  const accent = "#1798D0";

  // --- 表示単位（総額 / 1人あたり） ---
  const unit = s.unit || "total";
  const isPer = unit === "per";
  const fmtV = (oku: number) => (isPer ? fmtPerCap(oku, data.pop) + "/人" : fmtOku(oku));
  const subV = (oku: number) => (isPer ? "総額 " + fmtOku(oku) : fmtPerCap(oku, data.pop) + "/人");
  const unitTabs = [
    { label: "総額", pick: () => setSt({ unit: "total" }), bg: !isPer ? "#14181C" : "#FFFFFF", fg: !isPer ? "#F7FAFC" : "#5C6B77" },
    { label: "1人あたり", pick: () => setSt({ unit: "per" }), bg: isPer ? "#14181C" : "#FFFFFF", fg: isPer ? "#F7FAFC" : "#5C6B77" },
  ];

  const revItems = data.revenue;
  const expItems = data.expenditure;
  const totalNow = data.total; // 歳出（決算 or 予算）総額
  // 歳入・歳出それぞれの構成比の分母。予算（full）は均衡するので等しいが、
  // 決算（decision）は歳入決算 ≠ 歳出決算なので側ごとに分母を分ける
  const revSum = revItems.reduce((a: number, b: any) => a + b.v, 0);
  const expSum = expItems.reduce((a: number, b: any) => a + b.v, 0);
  const yearLabel = data.year;

  const openMuni = (muniName: string, code: string) => () =>
    nav({ screen: "dash", muni: muniName, muniCode: code, drillPath: [], theme: null, budgetFy: undefined });

  // --- ホバー強調（強調セグメント以外を淡色化） ---
  const hoverFor = (key: string) => (s.tip && s.tip.hover && s.tip.hover.key === key ? s.tip.hover.idx : null);
  const hoverOnFn = (key: string, idx: number) => () => setSt({ tip: { hover: { key, idx } } });

  // --- muni select ---
  // シャード（総務省 決算・全1,741市町村）からその県の市町村一覧を作る。全県が
  // 最低でも decision（決算ベース）で閲覧可。甲府だけ full（予算ベースの詳細）。
  const muniEntries =
    shard && shard.prefCode === prefCode
      ? Object.entries(shard.munis).map(([code, m]) => ({ code, name: (m as { name: string }).name }))
      : [];
  // decision 自治体へパスで直接来た場合、団体コード（/nagano/202011）か名前（旧・日本語パス）の
  // 片方しか無い。県シャード取得後にもう片方を引き当てて state に補い、名前を画面に出せるようにする。
  React.useEffect(() => {
    if (!isApp || muniEntries.length === 0) return;
    if (!s.muniCode && s.muni) {
      const hit = muniEntries.find((e) => e.name === s.muni);
      if (hit) setSt({ muniCode: hit.code });
    } else if (s.muniCode && !s.muni) {
      const hit = muniEntries.find((e) => e.code === s.muniCode);
      if (hit) setSt({ muni: hit.name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApp, s.muniCode, s.muni, muniEntries.length]);
  const muniList = muniEntries.map(({ code, name }) => {
    const t = D.tierOf(code);
    const badge =
      t === "full"
        ? `収録済 当初予算${KOFU_BUDGET_YEARS.length}年度分＋決算`
        : t === "budget"
          ? "当初予算＋決算（総務省）"
          : "決算ベース（総務省）";
    const strong = t !== "decision";
    return {
      name,
      badge,
      badgeFg: strong ? accent : "#4B95C4",
      bg: "#FFFFFF",
      bd: strong ? accent : "#CFE0EA",
      fg: "#14181C",
      cursor: "pointer",
      open: openMuni(name, code),
      requestUrl: "", // 全市町村が閲覧可能なのでリクエスト不要
    };
  });
  const muniLoading = needShard && screen === "muni" && shardLoading && muniEntries.length === 0;
  // 都道府県レベルの予算（県全体）は未収録なのでリクエストへ
  const prefRequestUrl = D.buildRequestUrl(
    `${prefName}（都道府県）の予算・決算資料の収録`,
    `自治体リクエスト: ${prefName} の県全体（都道府県会計）を収録してほしい（市区町村選択画面より）`,
    prefName,
  );

  // --- dashboard panels ---
  const mkLegend = (items: any[], side: string, total: number) => {
    const hv = hoverFor(side);
    return items.map((it, i) => ({
      name: it.name, amtFmt: fmtV(it.v), pctFmt: pctOf(it.v, total),
      sw: hv == null || hv === i ? D.PALETTE[i % D.PALETTE.length] : fadeColor(D.PALETTE[i % D.PALETTE.length]),
      hoverOn: hoverOnFn(side, i), hoverOff: hideTip,
      open: () => nav({ screen: "drill", drillSide: side, drillPath: [it.name] }),
    }));
  };
  const dashPanels = [
    { title: "歳入（どこから来るお金か）", donutBg: donutBg(revItems, hoverFor("rev")), centerLabel: "歳入合計", centerAmt: <CountUpNum value={revSum} fmt={fmtV} />, legend: mkLegend(revItems, "rev", revSum), openDrill: () => nav({ screen: "drill", drillSide: "rev", drillPath: [] }), tipMove: mkDonutTip(revItems, revSum, data.pop, "rev"), gloss: mkGloss("歳入") },
    { title: "歳出（なにに使うお金か）", donutBg: donutBg(expItems, hoverFor("exp")), centerLabel: "歳出合計", centerAmt: <CountUpNum value={expSum} fmt={fmtV} />, legend: mkLegend(expItems, "exp", expSum), openDrill: () => nav({ screen: "drill", drillSide: "exp", drillPath: [] }), tipMove: mkDonutTip(expItems, expSum, data.pop, "exp"), gloss: mkGloss("歳出") },
  ];

  // --- 政策テーマ（総合計画の基本目標 × 83事業の実データ集計） ---
  const openTheme = (name: string) => () => nav({ screen: "themes", theme: name });
  const goalCards = GOALS.map((g) => {
    const ps = goalProjects(g.name);
    const total = ps.reduce((a, p) => a + p.amountOku, 0);
    return { goal: g, ps, total };
  });
  const themeStrip = goalCards.map(({ goal, ps, total }) => ({
    name: `『${goal.name}』`, sub2: goal.label,
    totalFmt: fmtV(total), sub: subV(total), count: String(ps.length), open: openTheme(goal.name),
  }));

  // --- 注目の事業（予算額上位・実データ）。full=甲府 / budget=類似市（muniBudget.projects）---
  const projectsForDisplay: {
    name: string; kan: string | null; kubun: string | null;
    amountOku: number; prevAmountOku?: number | null; description: string;
    shisaku?: string; refLabel?: string; refLocalUrl?: string;
  }[] = isBudget ? (muniBudget!.projects ?? []) : isFull ? KOFU_PROJECTS : [];
  const featured = [...projectsForDisplay]
    .sort((a, b) => b.amountOku - a.amountOku)
    .slice(0, 3)
    .map((p) => ({
      name: p.name, kanPath: p.kan ?? p.shisaku ?? "", kubun: p.kubun ?? "",
      budgetFmt: fmtV(p.amountOku), sub: subV(p.amountOku), desc: p.description,
    }));
  // 主な事業1行の描画用オブジェクト（一覧・施策グループで共用）
  const toProjRow = (p: (typeof projectsForDisplay)[number]) => ({
    name: p.name,
    kan: p.kan ?? "",
    kubun: p.kubun ?? "",
    amountFmt: fmtV(p.amountOku),
    sub: p.prevAmountOku != null ? `前年 ${fmtOku(p.prevAmountOku)}` : subV(p.amountOku),
    desc: p.description,
    refLabel: p.refLabel ?? "",
    refOpen: p.refLocalUrl
      ? () => openViewer({
          url: p.refLocalUrl!, title: muniBudget!.sourceTitle, sub: p.refLabel ?? "主な事業",
          originUrl: muniBudget!.originUrl, archiveUrl: muniBudget!.sourceUrl,
        })
      : () => {},
  });
  // budget 階層の「主な事業一覧」（款のない和泉も含め上位を一覧。full は款ドリル/テーマで見せる）
  const budgetProjectRows = isBudget
    ? [...projectsForDisplay].sort((a, b) => b.amountOku - a.amountOku).slice(0, 20).map(toProjRow)
    : [];
  // 施策別グループ（山梨県＝中項目《…》別に全件）。資料の施策順を保ち、グループ内は金額降順。
  // 施策の無い市（和泉・山口）は空 → View は従来の一覧を出す
  const budgetProjectGroups =
    isBudget && projectsForDisplay.some((p) => p.shisaku)
      ? (() => {
          const order: string[] = [];
          const map = new Map<string, typeof projectsForDisplay>();
          for (const p of projectsForDisplay) {
            const key = p.shisaku || "その他";
            if (!map.has(key)) { map.set(key, []); order.push(key); }
            map.get(key)!.push(p);
          }
          return order.map((key) => {
            const rows = map.get(key)!;
            return {
              shisaku: key,
              count: rows.length,
              totalFmt: fmtV(rows.reduce((a, p) => a + p.amountOku, 0)),
              rows: [...rows].sort((a, b) => b.amountOku - a.amountOku).map(toProjRow),
            };
          });
        })()
      : [];

  // --- drill（款 → 内訳/主な事業） ---
  const side = s.drillSide;
  const rootItems = side === "rev" ? revItems : expItems;
  let nodeItems: any[] = rootItems; let nodeTotal = side === "rev" ? revSum : expSum; let nodeName = side === "rev" ? "歳入合計" : "歳出合計";
  const pathNodes: any[] = [];
  s.drillPath.forEach((nm) => {
    const found = nodeItems.find((n) => n.name === nm);
    if (!found) return;
    pathNodes.push(found);
    nodeName = found.name; nodeTotal = found.v;
    nodeItems = found.children ?? [];
  });
  const depth = pathNodes.length;
  // 款は「実データの内訳・主な事業・R6決算の項内訳」のいずれかがあれば掘れる。
  // decision（総務省決算）は款→項の children を持つのでそれで判定する（full 専用の
  // 主な事業・R6決算内訳による掘り下げは甲府のみ）
  const canDrillDeeper = (it: any) =>
    !!(it.children && it.children.length > 0) ||
    (isFull &&
      side === "exp" &&
      depth === 0 &&
      (!!KOFU_R6_DETAIL.byKan[it.name] || KOFU_PROJECTS.some((p) => p.kan === it.name)));
  const drillCrumbs: any[] = [{ label: side === "rev" ? "歳入" : "歳出", jump: () => setSt({ drillPath: [] }), bg: depth === 0 ? "#14181C" : "transparent", fg: depth === 0 ? "#F7FAFC" : "#5C6B77", fw: depth === 0 ? "700" : "500", sep: s.drillPath.length ? "inline" : "none" }];
  s.drillPath.forEach((nm, i) => {
    const last = i === s.drillPath.length - 1;
    drillCrumbs.push({ label: nm, jump: () => setSt({ drillPath: s.drillPath.slice(0, i + 1) }), bg: last ? "#14181C" : "transparent", fg: last ? "#F7FAFC" : "#5C6B77", fw: last ? "700" : "500", sep: last ? "none" : "inline" });
  });
  const dHover = hoverFor("drill");
  const donutItems = nodeItems.length > 0 ? nodeItems : pathNodes.length > 0 ? [pathNodes[pathNodes.length - 1]] : rootItems;
  const drillRows = nodeItems.map((it, i) => {
    const clickable = canDrillDeeper(it);
    return {
      name: it.name, amtFmt: fmtV(it.v),
      sub: subV(it.v),
      pctFmt: pctOf(it.v, nodeTotal), barW: ((it.v / (nodeItems[0].v || 1)) * 100).toFixed(1),
      sw: dHover == null || dHover === i ? D.PALETTE[i % D.PALETTE.length] : fadeColor(D.PALETTE[i % D.PALETTE.length]),
      hoverOn: hoverOnFn("drill", i), hoverOff: hideTip,
      cursor: clickable ? "pointer" : "default", arrow: clickable ? "›" : "",
      open: clickable ? () => setSt({ drillPath: [...s.drillPath, it.name] }) : () => {},
    };
  });
  const drillEvidence = isDecision
    ? `${decisionView!.primaryEvidence?.title ?? "総務省 市町村別決算状況調"}${depth > 0 ? `「${nodeName}」` : ""}`
    : isBudget
      ? `${muniBudget!.sourceTitle}${depth > 0 ? `「${nodeName}」` : ""}`
      : `${budget.sourceTitle} ${budget.pagesLabel}${depth > 0 ? `「${nodeName}」` : ""}`;
  const drillSideTabs = [
    { label: "歳出", pick: () => setSt({ drillSide: "exp", drillPath: [] }), bg: side === "exp" ? "#14181C" : "#FFFFFF", fg: side === "exp" ? "#F7FAFC" : "#5C6B77" },
    { label: "歳入", pick: () => setSt({ drillSide: "rev", drillPath: [] }), bg: side === "rev" ? "#14181C" : "#FFFFFF", fg: side === "rev" ? "#F7FAFC" : "#5C6B77" },
  ];

  // --- themes 詳細 ---
  const themeCards = goalCards.map(({ goal, ps, total }) => ({
    name: `『${goal.name}』`, sub2: goal.label, totalFmt: fmtV(total), sub: subV(total), count: String(ps.length),
    open: openTheme(goal.name), bg: s.theme === goal.name ? "#E3F4FC" : "#FFFFFF", bd: s.theme === goal.name ? accent : "#DFE7EC",
  }));
  const curGoal = GOALS.find((g) => g.name === s.theme);
  let themeVals: any = { hasTheme: false, themeName: "", themeIntent: "", themeTotalFmt: "", themeCount: "", themeKanChips: [], themeProjects: [], themePer: "", themeSub: "" };
  if (curGoal) {
    const ps = goalProjects(curGoal.name);
    const total = ps.reduce((a, p) => a + p.amountOku, 0);
    // 款チップ（款別ドリルへのリンク）。款の記載が無い年度（R2・R3）はチップなし
    const kanAgg: Record<string, number> = {};
    ps.forEach((p) => { if (p.kan != null) kanAgg[p.kan] = (kanAgg[p.kan] || 0) + p.amountOku; });
    const kanIdx = (nm: string) => Math.max(0, data.expenditure.findIndex((k) => k.name === nm));
    themeVals = {
      hasTheme: true,
      // 「基本目標1」のように名前自体が「基本目標」で始まる年度では接頭辞を重ねない
      themeName: curGoal.label
        ? `${curGoal.name.startsWith("基本") ? `『${curGoal.name}』` : `基本目標『${curGoal.name}』`} — ${curGoal.label}`
        : `『${curGoal.name}』`,
      themeIntent: `${planInfo.plan}の基本目標「${curGoal.name}」に紐づく主な事業（予算資料の主な事業一覧に掲載された ${ps.length}事業）の集計です。複数の基本目標を持つ事業は各目標に計上しています。`,
      themeTotalFmt: fmtV(total), themeSub: subV(total), themeCount: String(ps.length),
      themePer: fmtPerCap(total, data.pop),
      themeKanChips: Object.entries(kanAgg).map(([nm, v]) => ({ name: nm, amtFmt: fmtV(v), sw: D.PALETTE[kanIdx(nm) % D.PALETTE.length], open: () => nav({ screen: "drill", drillSide: "exp", drillPath: [nm] }) })),
      themeRequestUrl: D.buildRequestUrl(
        "事務事業評価票（全事業分・各年度）",
        `政策テーマ「${curGoal.name}」の事業について、事業費の決算額・成果指標の実績（評価詳細票）まで見たい`,
      ),
      themeProjects: ps.map((p) => ({
        evaluation: evalFor(p),
        name: p.name, summary: p.description, kanPath: p.kan ?? p.shisaku, kubun: p.kubun ?? "",
        budgetFmt: fmtV(p.amountOku), sub: subV(p.amountOku), shisaku: p.shisaku,
        refLabel: p.refLabel, refUrl: p.refLocalUrl,
        refOpen: () => openViewer({
          url: p.refLocalUrl, title: KOFU_PROJECTS_SOURCE.title, sub: `主な事業一覧 ${p.refLabel}`,
          originUrl: KOFU_PROJECTS_SOURCE.originUrl, archiveUrl: p.refUrl,
        }),
      })),
    };
  }

  // --- compare (前年比較・予算書の前年度当初額をそのまま使用) ---
  // full=甲府 or budget=類似4市。どちらも款行に prevV を持つ（予算書の前年度当初額）
  const compSrc = isBudget ? muniBudget! : budget;
  const compSide = s.compSide || "exp";
  const compKans = compSide === "rev" ? compSrc.revenue : compSrc.expenditure;
  const compCurSum = compSrc.totalOku;
  const compPrevSum = compSrc.prevTotalOku ?? 0;
  const compMax = Math.max(...compKans.map((it) => it.v));
  const compRows = compKans.map((it, i) => {
    const prev = it.prevV ?? 0;
    const g = prev > 0 ? (it.v / prev - 1) * 100 : 0;
    const dd = it.v - prev;
    const up = dd >= 0;
    return {
      name: it.name, sw: D.PALETTE[i % D.PALETTE.length],
      prevFmt: fmtV(prev), curFmt: fmtV(it.v),
      prevW: ((prev / compMax) * 100).toFixed(1), curW: ((it.v / compMax) * 100).toFixed(1),
      deltaFmt: (up ? "+" : "−") + fmtV(Math.abs(dd)) + "（" + (up ? "+" : "−") + Math.abs(g).toFixed(1) + "%）",
      deltaFg: up ? "#0F76A3" : "#C25400",
      open: () => nav({ screen: "drill", drillSide: compSide, drillPath: [it.name] }),
    };
  });
  const compDelta = compCurSum - compPrevSum;
  const compTabs = [
    { label: "歳出", pick: () => setSt({ compSide: "exp" }), bg: compSide === "exp" ? "#14181C" : "#FFFFFF", fg: compSide === "exp" ? "#F7FAFC" : "#5C6B77" },
    { label: "歳入", pick: () => setSt({ compSide: "rev" }), bg: compSide === "rev" ? "#14181C" : "#FFFFFF", fg: compSide === "rev" ? "#F7FAFC" : "#5C6B77" },
  ];

  // --- 予算執行状況（full=甲府 R7速報〜R1確定。budget=山梨県 R6決算・確定） ---
  const execSide = s.execSide || "exp";
  // 執行データ源: full=甲府（KOFU_EXECUTION_YEARS・複数年度）、budget=その自治体の
  // 決算（現状は山梨県のみ・当初予算とは別年度）。持たない階層は空 → 執行画面を出さない。
  const execSource: D.MuniExecutionYear[] = isFull
    ? (KOFU_EXECUTION_YEARS as unknown as D.MuniExecutionYear[])
    : muniBudget?.execution ?? [];
  const hasExec = execSource.length > 0;
  // 執行データを持たない階層向けの空スタブ（isExecution=false なので描画されない）
  const EMPTY_EXEC_YEAR: D.MuniExecutionYear = {
    fy: "", basis: "確定", fyLabel: "", asOf: "", asOfNote: "", population: null,
    revenueBudgetTotalOku: 0, revenueSettledTotalOku: 0,
    expenditureBudgetTotalOku: 0, expenditureSettledTotalOku: 0,
    revenue: [], expenditure: [],
    sourceTitle: "", sourceUrl: "", originUrl: "", sourceLocalUrl: "", evidence: [],
  };
  // 年度の既定はヘッダの年度ドロップダウンに追従する（full の過去年度閲覧時）。
  // ピルで明示選択したらそちらが優先。budget は単一年度。
  const execYear =
    execSource.find((y) => y.fy === s.execFy) ??
    execSource.find((y) => y.fy === budget.fy) ??
    execSource[0] ??
    EMPTY_EXEC_YEAR;
  const execRows0 = execSide === "rev" ? execYear.revenue : execYear.expenditure;
  const execBudgetTotal = execSide === "rev" ? execYear.revenueBudgetTotalOku : execYear.expenditureBudgetTotalOku;
  const execSettledTotal = execSide === "rev" ? execYear.revenueSettledTotalOku : execYear.expenditureSettledTotalOku;
  const execOverallRate = (execSettledTotal / execBudgetTotal) * 100;
  const execRows = execRows0.map((r, i) => ({
    name: r.name, sw: D.PALETTE[i % D.PALETTE.length],
    budgetFmt: fmtOku(r.budgetOku), settledFmt: fmtOku(r.settledOku),
    rateFmt: r.ratePct != null ? r.ratePct.toFixed(1) + "%" : "—",
    barW: r.ratePct != null ? Math.min(100, r.ratePct).toFixed(1) : "0",
    restFmt: fmtOku(Math.max(0, r.budgetOku - r.settledOku)),
    refLabel: r.refLabel, ref: r.ref,
    breakdownNote: r.breakdownNote ?? "",
  }));
  const execTabs = [
    { label: "歳出", pick: () => setSt({ execSide: "exp" }), bg: execSide === "exp" ? "#14181C" : "#FFFFFF", fg: execSide === "exp" ? "#F7FAFC" : "#5C6B77" },
    { label: "歳入", pick: () => setSt({ execSide: "rev" }), bg: execSide === "rev" ? "#14181C" : "#FFFFFF", fg: execSide === "rev" ? "#F7FAFC" : "#5C6B77" },
  ];

  // --- 事業報告（成果）＝事務事業評価 詳細票。full（甲府）のみ ---
  // ヘッダの年度ドロップダウンに連動する。公表は各年サンプル数件なので全年度分は揃わない:
  //   ① 同じ評価年度の詳細票があればそれ（R7予算 → R7評価）
  //   ② 無ければ、その予算年度をコスト経年に含む最新の詳細票へフォールバック
  //      （R8予算 → R8計画 列を持つ R7評価。R8 の評価は R8 中に行われるためまだ存在しない）
  //   ③ どちらも無ければ未収録 → リクエスト導線
  const reportYear = React.useMemo(() => {
    if (!isFull) return null;
    const withItems = KOFU_REPORT_YEARS.filter((y) => y.reports.length > 0);
    return (
      withItems.find((y) => y.fy === budget.fy) ??
      // KOFU_REPORT_YEARS は新しい年度順なので、先頭一致＝その年度に触れている最新の詳細票
      withItems.find((y) => y.reports.some((r) => r.cost.some((c) => c.fy === budget.fy))) ??
      null
    );
  }, [isFull, budget.fy]);
  // タブ（事務事業）の選択。年度をまたぐと No が変わるので、無ければ先頭へ落とす
  const reportItem =
    reportYear?.reports.find((r) => r.no === s.reportNo) ?? reportYear?.reports[0] ?? null;
  // フォールバック時（②）の注記。ズレの理由は年度の前後で別物なので言い分ける:
  //   予算年度 > 評価年度 → その年度の評価はまだ行われていない（評価は年度終了後）
  //   予算年度 < 評価年度 → 評価自体はあったが詳細票が未収録（公表は各年サンプル数件）
  // どちらも「表示中の詳細票がその年度をどの列で載せているか」を添えて対応を明示する。
  const reportFallbackNote = (() => {
    if (!reportYear || reportYear.fy === budget.fy) return "";
    const fyNum = (fy: string) => Number(fy.replace(/^R/, "")) || 0;
    const shortFy = budget.fyLabel.replace(" 当初予算", "");
    const col = reportYear.reports[0]?.cost.find((c) => c.fy === budget.fy)?.kind ?? null;
    const shown = `${reportYear.fyLabel}評価（対象 ${reportYear.targetFyLabel}実績）`;
    const where = col ? `${shortFy}を「${col}」の列に載せている` : "";
    return fyNum(budget.fy) > fyNum(reportYear.fy)
      ? `${shortFy}の評価はまだ行われていません（事務事業評価は年度終了後）。${where}最新の${shown}を表示しています。`
      : `${shortFy}の詳細票は未収録です（甲府市が詳細票を公表するのは各年サンプル数件のみ）。${where}${shown}を表示しています。`;
  })();

  // --- 決算の推移（決算状況調 R2〜R6・実データ） ---
  const trendMax = Math.max(...KOFU_TREND.map((r) => r.expenditureTotalOku));
  const trendBars = KOFU_TREND.map((r, i) => ({
    label: r.fy, fyLabel: r.fyLabel,
    amtFmt: fmtOku(r.expenditureTotalOku),
    h: ((r.expenditureTotalOku / trendMax) * 100).toFixed(1),
    bg: i === KOFU_TREND.length - 1 ? accent : "#B8D9EA",
    landingUrl: r.landingUrl, ref: r.ref,
  }));
  const trendIndicators = [
    { name: "歳入決算総額", vals: KOFU_TREND.map((r) => fmtOku(r.revenueTotalOku)) },
    { name: "人口（住基）", vals: KOFU_TREND.map((r) => (r.population != null ? (r.population / 10000).toFixed(1) + "万人" : "—")) },
    { name: "財政力指数", vals: KOFU_TREND.map((r) => (r.financialIndex != null ? r.financialIndex.toFixed(2) : "—")) },
    { name: "経常収支比率", vals: KOFU_TREND.map((r) => (r.keijoShushiPct != null ? r.keijoShushiPct.toFixed(1) + "%" : "—")) },
    { name: "実質公債費比率", vals: KOFU_TREND.map((r) => (r.jisshitsuKosaihiPct != null ? r.jisshitsuKosaihiPct.toFixed(1) + "%" : "—")) },
    // 歳出執行率 = 支出済額/予算現額（決算状況 収入支出詳細の確定値。R3 は資料消失で欠落）
    { name: "歳出執行率（確定）", vals: KOFU_TREND.map((r) => {
      const e = KOFU_EXECUTION_YEARS.find((y) => y.fy === r.fy && y.basis === "確定");
      return e ? ((e.expenditureSettledTotalOku / e.expenditureBudgetTotalOku) * 100).toFixed(1) + "%" : "—";
    }) },
  ];
  const trendYearLabels = KOFU_TREND.map((r) => r.fy);

  // --- header nav ---
  // decision（総務省決算）は款別ドリルダウン・類似自治体まで。前年比較・政策テーマ・
  // 予算執行状況は予算資料が要る full 専用（甲府）。
  const navDefsFull: [string, string, () => void][] = [
    ["ダッシュボード", "dash", () => nav({ screen: "dash" })],
    ["款別ドリルダウン", "drill", () => nav({ screen: "drill" })],
    ["前年比較", "compare", () => nav({ screen: "compare" })],
    ["政策テーマ", "themes", () => nav({ screen: "themes" })],
    ["予算執行状況", "execution", () => nav({ screen: "execution" })],
    ["類似自治体", "similar", () => nav({ screen: "similar" })],
  ];
  // budget（類似市）は前年比較まで（主な事業・政策テーマ・執行は資料なし）。
  // 都道府県エンティティ（県全体）は市町村の類似自治体比較を出さない
  const navDefsBudget: [string, string, () => void][] = [
    ["ダッシュボード", "dash", () => nav({ screen: "dash" })],
    ["款別ドリルダウン", "drill", () => nav({ screen: "drill" })],
    ["前年比較", "compare", () => nav({ screen: "compare" })],
    // 決算＋執行率を収録した budget 自治体（山梨県）のみ執行タブを出す
    ...(hasExec ? ([["予算執行状況", "execution", () => nav({ screen: "execution" })]] as [string, string, () => void][]) : []),
    ...(isPref ? [] : ([["類似自治体", "similar", () => nav({ screen: "similar" })]] as [string, string, () => void][])),
  ];
  const navDefsDecision: [string, string, () => void][] = [
    ["ダッシュボード", "dash", () => nav({ screen: "dash" })],
    ["款別ドリルダウン", "drill", () => nav({ screen: "drill" })],
    ["類似自治体", "similar", () => nav({ screen: "similar" })],
  ];
  const navDefs = isFull ? navDefsFull : isBudget ? navDefsBudget : navDefsDecision;
  const navTabs = navDefs.map(([label, key, open]) => ({ label, open, fg: screen === key ? "#14181C" : "#5C6B77", fw: screen === key ? "700" : "500", ul: screen === key ? accent : "transparent" }));

  // 専用画面を指す URL に来たら、その階層で出せない画面はダッシュボードにフォールバック。
  // 政策テーマ・予算執行は full 専用。前年比較は full+budget（decision のみ不可）
  const gatedToDash =
    (isDecision && ["compare", "themes", "execution"].includes(screen)) ||
    // budget は政策テーマ不可。執行は決算を収録した自治体（hasExec）のみ許可
    (isBudget && (screen === "themes" || (screen === "execution" && !hasExec))) ||
    // 都道府県は市町村の類似自治体比較を出さない
    (isPref && screen === "similar");

  // ========================================================================
  // 類似自治体との比較 — 「何で比べるか（軸）」を選んでから比較相手を選ぶ。
  // 行は表示中の自治体を基準に組み立てる（以前は導出時に決め打ちした甲府市＋4市の
  // 静的リストを全自治体で使い回していたため、どの自治体を見ても甲府市が「このまち」
  // として出ていた）。全国索引はこの画面でだけ取得する（260KB・全1,741市町村）。
  // 軸ごとの距離計算・帯平均は lib/similar.ts。
  // ========================================================================
  const simOn = screen === "similar" && !gatedToDash;
  const { data: simIndex, loading: simLoading, error: simError } = useSimilarIndex(simOn);
  const simAxisKey: SimilarAxisKey = D.isSimilarAxis(s.simAxis) ? s.simAxis : D.DEFAULT_SIMILAR_AXIS;
  const simSelf = simIndex && muniCode ? simIndex.munis.find((m) => m.c === muniCode) ?? null : null;
  // 軸で近い順の全国母集団（同じ種別のみ）。サジェスト・帯平均の両方がここから出る
  const simRanked = React.useMemo(
    () => (simIndex && simSelf ? D.rankPeers(simIndex, simSelf, simAxisKey) : []),
    [simIndex, simSelf, simAxisKey],
  );
  const simVals = (() => {
    const axis = D.axisOf(simAxisKey);
    const base = {
      simAxes: D.SIMILAR_AXES.map((a) => ({
        key: a.key, label: a.label, desc: a.desc, active: a.key === simAxisKey,
        // 軸を変えると既定のサジェストも変わるので、手動で選んだ相手はリセットする
        select: () => setSt({ simAxis: a.key, simVs: undefined, simQ: "" }),
      })),
      simAxisDesc: axis.desc,
      simLoading, simError,
      simQ: s.simQ ?? "",
      setSimQ: (val: string) => setSt({ simQ: val }),
      simResults: [] as any[],
      simSuggest: [] as any[],
      simPoolLabel: "",
      simCustom: !!s.simVs,
      simReset: () => setSt({ simVs: undefined, simQ: "" }),
      similarRows: [] as any[],
      simLegend: [] as any[],
      similarEvidence: [] as any[],
      simFyLabel: simIndex?.fyLabel ?? D.SIMILAR_FY_LABEL,
      simReady: false,
      // 索引に無い自治体（Σ款≠歳出総額で決算シャードにも載らない団体）
      simMissing: !!simIndex && !simSelf,
    };
    if (!simIndex || !simSelf) return base;

    const cols = [D.PALETTE[0], D.PALETTE[1], D.PALETTE[2], D.PALETTE[4], "#C6D2DA"];
    // 人口・財政規模・1人あたり歳出は比較表に列があるので、行内で軸の値を繰り返さない。
    // 財政力指数・歳出構成は表に出ない値で並んでいるので、行にも根拠として出す
    const axisInTable = simAxisKey === "pop" || simAxisKey === "exp" || simAxisKey === "perCap";
    /** 軸の値そのもの（サジェストの並びが腑に落ちるよう、行にも同じ値を出す） */
    const axisLabel = (m: D.SimilarIndexRow): string => {
      switch (simAxisKey) {
        case "pop": return fmtPop(m.pop);
        case "exp": return fmtOku(m.exp);
        case "perCap": return fmtYen(m.pc);
        case "finIdx": return m.fi != null ? m.fi.toFixed(2) : "—";
        case "mix": {
          const d = D.axisDistance(simSelf, m, "mix");
          return d == null ? "—" : `差 ${d.toFixed(1)}pt`;
        }
      }
    };
    const vsCodes = s.simVs ?? simRanked.slice(0, D.DEFAULT_PEER_COUNT).map((m) => m.c);
    const selected = new Set(vsCodes);
    const toggle = (code: string) => {
      const next = selected.has(code) ? vsCodes.filter((c) => c !== code) : [...vsCodes, code];
      setSt({ simVs: next });
    };
    const band = simRanked.slice(0, D.BAND_SIZE);
    const avg = D.bandAverage(simIndex, simSelf, simAxisKey, band);
    const vsRows = vsCodes.flatMap((c) => {
      const m = simIndex.munis.find((x) => x.c === c);
      return m ? [m] : []; // 未知のコード（手で URL を書き換えた等）は黙って落とす
    });

    /** 索引の1行 → 表示行 */
    const toRow = (m: D.SimilarIndexRow, self: boolean) => {
      const sHover = hoverFor("sim-" + m.c);
      return {
        key: m.c, name: m.n, sub: m.p, self,
        pop: fmtPop(m.pop), totalFmt: fmtOku(m.exp), perCap: fmtYen(m.pc),
        // 歳出構成軸の基準行は「差 0.0pt」にしかならないので出さない（構成は帯グラフが示す）
        axisVal: axisInTable || (self && simAxisKey === "mix") ? "" : `${axis.label} ${axisLabel(m)}`,
        ref: D.refOf(simIndex, m), refLabel: D.refLabelOf(simIndex, m),
        bg: self ? "#E3F4FC" : "transparent", fw: self ? "700" : "500",
        badge: self ? "このまち" : "",
        clickable: !self,
        open: self ? () => {} : () => nav({
          screen: "dash", muni: m.n, muniCode: m.c, pref: m.p,
          drillPath: [], theme: null, budgetFy: undefined,
        }),
        // 比較相手は表からも外せる（サジェストのチップと同じ選択状態を共有する）
        remove: self ? null : () => toggle(m.c),
        segs: m.mix.map((p, i) => ({
          w: String(p), sw: sHover == null || sHover === i ? cols[i] : fadeColor(cols[i]),
          tipMove: mkSegTip(`${m.n}・${simIndex.mixCols[i]}`, p + "%", "歳出構成比", cols[i]!, { key: "sim-" + m.c, idx: i }),
        })),
      };
    };
    /** 帯平均の行（実在の自治体ではないので導出値と明示し、リンクも張らない） */
    const avgRow = avg
      ? (() => {
          const sHover = hoverFor("sim-avg");
          return {
            key: "__avg", name: avg.name, sub: "", self: false, avg: true,
            pop: fmtPop(avg.pop), totalFmt: fmtOku(avg.exp), perCap: fmtYen(avg.pc),
            axisVal: "",
            ref: avg.note, refLabel: `帯内${avg.count}団体から算出（導出値）`,
            bg: "transparent", fw: "500", badge: "", clickable: false, open: () => {}, remove: null,
            segs: avg.mix.map((p, i) => ({
              w: String(p), sw: sHover == null || sHover === i ? cols[i] : fadeColor(cols[i]),
              tipMove: mkSegTip(`${avg.name}・${simIndex.mixCols[i]}`, p + "%", "歳出構成比", cols[i]!, { key: "sim-avg", idx: i }),
            })),
          };
        })()
      : null;

    const rows = [toRow(simSelf, true), ...vsRows.map((m) => toRow(m, false)), ...(avgRow ? [avgRow] : [])];
    // エビデンスは「表示中の行が実際に使ったファイル」だけに絞る（市だけなら町村別は出さない）
    const families = new Set([simSelf.f, ...vsRows.map((m) => m.f), ...(avgRow ? [simSelf.f] : [])]);
    const poolCount = simIndex.munis.filter((m) => m.f === simSelf.f).length;

    return {
      ...base,
      simReady: true,
      simPoolLabel: `全国の${poolCount.toLocaleString("ja-JP")}${D.familyLabel(simSelf.f)}から`,
      simSuggest: simRanked.slice(0, D.SUGGEST_COUNT).map((m) => ({
        code: m.c, name: m.n, pref: m.p, axisVal: axisLabel(m),
        selected: selected.has(m.c), toggle: () => toggle(m.c),
      })),
      simResults: D.searchMunis(simIndex, s.simQ ?? "", new Set([simSelf.c, ...selected])).map((m) => ({
        code: m.c, name: m.n, pref: m.p, axisVal: axisLabel(m),
        // 種別が違う相手は財政構造が違うので、選べるが注意書きを添える
        crossFamily: m.f !== simSelf.f ? `${D.familyLabel(m.f)}（種別が違います）` : "",
        add: () => setSt({ simVs: [...vsCodes, m.c], simQ: "" }),
      })),
      similarRows: rows,
      simLegend: simIndex.mixCols.map((n, i) => ({ name: n, sw: cols[i] })),
      similarEvidence: SIMILAR_EVIDENCE.filter((ev) => families.has(ev.family)).map((ev) => ({
        ...ev,
        open: () => openViewer({
          url: ev.localUrl, title: ev.title, sub: ev.thumb,
          originUrl: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html", archiveUrl: ev.url,
        }),
      })),
    };
  })();

  const v: any = {
    isTop: screen === "top", isMuni: screen === "muni", isApp,
    isDash: screen === "dash" || gatedToDash, isDrill: screen === "drill",
    // 政策テーマ・執行は full 専用。前年比較は full+budget（decision 不可）
    isThemes: screen === "themes" && isFull, isCompare: screen === "compare" && !isDecision,
    // 執行画面は full（甲府）＋ 決算を収録した budget（山梨県）
    isExecution: screen === "execution" && (isFull || (isBudget && hasExec)),
    // 決算ベース（総務省・decision 階層）の自治体か。予算資料ベースの full 画面は出さない
    isDecision,
    // 予算のみ収録（budget 階層・類似市）。主な事業/執行/評価は未収録
    isBudget,
    // full（甲府）: 主な事業・政策テーマ・執行まで出す
    isFull,
    // 都道府県エンティティ（県全体）か
    isPref,
    // budget 案内パネルの本文（都道府県は市町村向け文言を出さない）
    budgetPanelTitle: isPref
      ? `${data.name}（都道府県会計）の当初予算を収録しています`
      : "この自治体は当初予算（款別）を収録しています",
    budgetPanelBody: isPref
      ? hasExec
        ? `款別の歳入・歳出・前年当初比較・1人あたり（県内市町村人口合計）に加え、${execYear.fyLabel}の款別決算・執行率も確認できます。主な事業一覧は未収録です。`
        : "款別の歳入・歳出・前年当初比較・1人あたり（県内市町村人口合計）を確認できます。決算・執行状況・主な事業は未収録です。"
      : "款別の歳入・歳出・前年当初比較・1人あたり・類似自治体比較・決算の経年（総務省）を確認できます。主な事業一覧・予算執行状況・事務事業評価は市によって未収録です。",
    // decision 自治体のシャード取得待ち（ダッシュボードでスケルトンを出す）
    loading: decisionPending,
    // decision 自治体の未収録機能（主な事業・執行・評価・補正）のその場リクエスト
    decisionRequestUrl: isDecision
      ? D.buildRequestUrl(
          `${data.name}の予算資料（当初予算・主な事業・執行状況）の収録`,
          `自治体リクエスト: ${prefName} ${data.name} は決算ベース（総務省）で収録済み。当初予算・主な事業・執行状況などの予算資料も見たい`,
          data.name,
        )
      : "",
    decisionEvidence: isDecision
      ? (decisionView!.evidence ?? []).map((ev) => ({
          ...ev,
          open: () => openViewer({
            url: ev.localUrl, title: ev.title, sub: ev.thumb,
            originUrl: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html", archiveUrl: ev.url,
          }),
        }))
      : [],
    // 性質別歳出（決算・R6のみ・総務省(4)）。人件費/扶助費/普通建設費…をバー表示
    hasNature: isDecision && !!decisionView!.nature,
    natureFyLabel: isDecision ? `${decisionView!.fyLabel}（性質別）` : "",
    natureRows:
      isDecision && decisionView!.nature
        ? decisionView!.nature.map((n, i) => ({
            name: n.name,
            amtFmt: fmtV(n.v),
            pctFmt: pctOf(n.v, decisionView!.total),
            barW: ((n.v / (decisionView!.nature![0]?.v || 1)) * 100).toFixed(1),
            sw: D.PALETTE[i % D.PALETTE.length],
          }))
        : [],
    // 地方債現在高ほか（決算・R6のみ・総務省(5)）
    bondItems:
      isDecision && decisionView!.bond
        ? [
            { name: "地方債現在高", v: fmtOku(decisionView!.bond.balanceOku), strong: true },
            { name: "積立金現在高", v: decisionView!.bond.reserveOku != null ? fmtOku(decisionView!.bond.reserveOku) : "—", strong: false },
            { name: "うち財政調整基金", v: decisionView!.bond.chouseiOku != null ? fmtOku(decisionView!.bond.chouseiOku) : "—", strong: false },
            { name: "債務負担行為（翌年度以降）", v: decisionView!.bond.debtBurdenOku != null ? fmtOku(decisionView!.bond.debtBurdenOku) : "—", strong: false },
          ]
        : [],
    // budget 階層の未収録機能のリクエスト。都道府県は決算、市は主な事業/執行/評価
    budgetRequestUrl: isBudget
      ? isPref
        ? hasExec
          ? D.buildRequestUrl(
              `${data.name}（都道府県）の主な事業の収録`,
              `リクエスト: ${data.name}（都道府県会計）は当初予算（款別）＋決算・執行率を収録済み。主な事業（施策別）も見たい`,
              data.name,
            )
          : D.buildRequestUrl(
              `${data.name}（都道府県）の決算・執行状況の収録`,
              `リクエスト: ${data.name}（都道府県会計）は当初予算（款別）を収録済み。決算・執行率も見たい`,
              data.name,
            )
        : D.buildRequestUrl(
            `${data.name}の主な事業・執行状況・事務事業評価の収録`,
            `自治体リクエスト: ${prefName} ${data.name} は当初予算（款別）を収録済み。主な事業一覧・予算執行状況・事務事業評価も見たい`,
            data.name,
          )
      : "",
    // リクエストチップのラベル（都道府県は決算収録済みなら主な事業、未収録なら決算）
    budgetRequestLabel: isPref
      ? hasExec
        ? "主な事業の収録をリクエスト ↗"
        : "決算・執行状況の収録をリクエスト ↗"
      : "この自治体の事業・執行・評価の収録をリクエスト ↗",
    execTabs, execRows,
    // 年度切替（full=甲府は複数年度。budget=山梨県は単一年度なので1ピル）
    execYearTabs: execSource.map((y) => ({
      label: `${y.fy}${y.basis === "速報" ? "（速報）" : ""}`,
      pick: () => setSt({ execFy: y.fy }),
      bg: y.fy === execYear.fy ? "#14181C" : "#FFFFFF",
      fg: y.fy === execYear.fy ? "#F7FAFC" : "#5C6B77",
    })),
    // full（甲府）は R3 が資料消失で WARP 回収の注記。budget は当初予算と別年度の注記
    execGapNote: isFull
      ? "令和3年度は発行元サイトから削除済みのため、国立国会図書館 WARP の保存版から収録しています"
      : `決算は最新の${execYear.fyLabel}を収録しています（当初予算とは年度が異なります）`,
    execFyLabel: execYear.fyLabel, execAsOfNote: execYear.asOfNote,
    execSideLabel: execSide === "rev" ? "歳入" : "歳出",
    execRateLabel: execSide === "rev" ? "収入率" : "執行率",
    execSettledColLabel: execSide === "rev" ? "収入済額" : "支出済額",
    execOverallRate: execOverallRate.toFixed(1) + "%",
    execOverallBarW: Math.min(100, execOverallRate).toFixed(1),
    execBudgetFmt: fmtOku(execBudgetTotal), execSettledFmt: fmtOku(execSettledTotal),
    // エビデンスは常に自サーバーの原本コピーをドロワーで開く（HTML はサンドボックス表示）
    execEvidence: execYear.evidence.map((he) => ({
      ...he,
      open: () => openViewer({
        url: he.localUrl, title: he.title, sub: he.thumb,
        originUrl: execYear.originUrl, archiveUrl: he.url,
      }),
    })),
    execSourceUrl: execYear.sourceLocalUrl,
    execSourceOpen: () => openViewer({
      url: execYear.sourceLocalUrl, title: execYear.sourceTitle, sub: execYear.fyLabel,
      originUrl: execYear.originUrl, archiveUrl: execYear.sourceUrl,
    }),
    trendBars, trendIndicators, trendYearLabels,
    trendSourceUrl: KOFU_TREND[KOFU_TREND.length - 1]?.landingUrl ?? "",
    // 決算の推移は KOFU_TREND（甲府の総務省決算）ベース。full（甲府）だけで出す
    showTrend: isFull,
    // 議会の構成（予算議決時）。full（甲府）だけ。会派別議席数の横バー＋一覧＋議決チップ。
    // 賛否内訳は非公表なので出さない（会派ごとの stance 列も持たない）。
    council: isFull
      ? {
          body: councilForFy.body,
          seats: councilForFy.seats,
          asOfLabel: councilForFy.asOfLabel,
          fyLabel: councilForFy.fyLabel,
          factions: councilForFy.factions.map((f, i) => {
            const sw = D.PALETTE[i % D.PALETTE.length];
            const pct = ((f.seats / councilForFy.seats) * 100).toFixed(1);
            return {
              name: f.name,
              seatsLabel: `${f.seats}議席`,
              w: pct,
              sw,
              tipMove: mkSegTip(f.name, `${f.seats}議席`, `${pct}%`, sw, { key: "council", idx: i }),
            };
          }),
          resolution: councilForFy.resolution,
          sourceTitle: councilForFy.sourceTitle,
          rosterOpen: () =>
            openViewer({
              url: councilForFy.roster.localUrl, title: councilForFy.roster.title,
              sub: `${councilForFy.asOfLabel}現在`, originUrl: councilForFy.roster.originUrl,
              archiveUrl: councilForFy.roster.archiveUrl,
            }),
          resultOpen: () =>
            openViewer({
              url: councilForFy.result.localUrl, title: councilForFy.result.title,
              sub: councilForFy.resolution.decidedDateLabel, originUrl: councilForFy.result.originUrl,
              archiveUrl: councilForFy.result.archiveUrl,
            }),
          minutesUrl: councilForFy.minutesUrl,
          newsletterUrl: councilForFy.newsletterUrl,
        }
      : null,
    // 事業報告（成果）＝事務事業評価 詳細票。full（甲府）のみ。予算→執行→成果を1事業で通す。
    // 表示年度に連動して1年度分だけ出し、事務事業はタブで切り替える（全事業を並べると
    // 1事業あたりの評価・実績が読めないため）。年度の解決は reportYear を参照。
    report:
      reportYear && reportItem
        ? {
            fyLabel: reportYear.fyLabel,
            targetFyLabel: reportYear.targetFyLabel,
            // 予算年度と評価年度がズレたとき（②のフォールバック）だけ理由を明示する
            fallbackNote: reportFallbackNote,
            sourceOpen: () =>
              openViewer({
                url: reportYear.sourceLocalUrl, title: reportYear.sourceTitle,
                sub: `${reportYear.fyLabel}（対象 ${reportYear.targetFyLabel}）`,
                originUrl: reportYear.originUrl, archiveUrl: reportYear.sourceUrl,
              }),
            tabs: reportYear.reports.map((r) => ({
              label: r.name,
              grade: r.grade,
              active: r.no === reportItem.no,
              pick: () => setSt({ reportNo: r.no }),
            })),
            item: {
              no: reportItem.no,
              name: reportItem.name,
              buka: reportItem.buka,
              kubun: reportItem.kubun,
              grade: reportItem.grade,
              score: reportItem.score,
              scorePct: reportItem.score != null ? Math.round((reportItem.score / 24) * 100) : null,
              impl: reportItem.implementation,
              ref: reportItem.ref,
              // 事業費・トータルコスト（千円）は総額/1人あたりトグルに追従（÷10万で億へ）。
              // 表示中の予算年度に一致する列を強調し、予算↔成果の年度対応を分かるようにする。
              cost: reportItem.cost.map((c) => ({
                fy: c.fy,
                kindLabel: c.kind,
                current: c.fy === budget.fy,
                jigyohiFmt: c.jigyohi != null ? fmtV(c.jigyohi / 100000) : "—",
                totalFmt: c.totalCost != null ? fmtV(c.totalCost / 100000) : "—",
              })),
              // 指標は targets/actuals がコスト経年（cost）と 1:1 で並ぶ。年度ごとに
              // 目標→実績を出して、どの年に届いた／届かなかったかを読めるようにする。
              indicators: reportItem.indicators.map((ind) => ({
                category: ind.category,
                name: ind.name,
                years: reportItem.cost.map((c, i) => {
                  const target = ind.targets[i] ?? null;
                  const actual = ind.actuals[i] ?? null;
                  const pct = target != null && target !== 0 && actual != null
                    ? Math.round((actual / target) * 100)
                    : null;
                  return {
                    fy: c.fy,
                    kindLabel: c.kind,
                    current: c.fy === budget.fy,
                    targetFmt: target != null ? target.toLocaleString() : "—",
                    actualFmt: actual != null ? actual.toLocaleString() : "—",
                    // 実績が未到来の年度（当初・計画）は目標だけ。バーは出さない
                    pending: actual == null,
                    pct,
                    barW: pct != null ? Math.min(100, pct) : 0,
                    over: pct != null && pct >= 100,
                  };
                }),
              })),
            },
          }
        : null,
    // 詳細票がまったく無い年度（R2 など）。黙って消さずリクエスト導線に変える
    reportMissing:
      isFull && !reportYear
        ? {
            note: `${budget.fyLabel.replace(" 当初予算", "")}の事業費・成果を載せた事務事業評価 詳細票は未収録です。甲府市が詳細票を公表するのは各年サンプル数件のみで、収録済みの詳細票（${KOFU_REPORT_YEARS.filter((y) => y.reports.length > 0).map((y) => `${y.fyLabel}評価`).join("・")}）はいずれもこの年度に触れていません。`,
            requestUrl: D.buildRequestUrl(
              "事務事業評価 詳細票（事業報告・成果）",
              `年度リクエスト: 甲府市 ${budget.fyLabel} の事業について、事業費の決算額・成果指標の目標／実績・総合評価（詳細票）を見たい`,
            ),
          }
        : null,
    showEvidence,
    onPrefSelect: (name: string) => nav({ screen: "muni", pref: name }),
    mapColorMode,
    onMuniSelect: (pfName: string, muniName: string | null, code5?: string) => {
      // 地図で市区町村をクリックしたら、その自治体のダッシュボードへ直行する。
      // 以前は**甲府だけ**を名指しでダッシュボードへ送り、他は全部「市区町村選択」の一覧へ
      // 落としていた（全1,741市町村が決算ベースで見られるようになった後も残っていた）。
      // 地図は GeoJSON の5桁コードを持っているので、6桁へ変換すればどの自治体にも直行できる。
      if (!muniName) { nav({ screen: "muni", pref: pfName }); return; } // 「県全体」チップ
      const code = code5 ? D.muniCode6(code5) : undefined;
      nav({ screen: "dash", pref: pfName, muni: muniName, muniCode: code, drillPath: [], theme: null, budgetFy: undefined });
    },
    searchQ: s.searchQ,
    openKofuLink: (e: any) => { if (e && e.preventDefault) e.preventDefault(); nav({ screen: "dash", muni: "甲府市", muniCode: "192015", pref: "山梨県", budgetFy: undefined }); },
    goTop: () => nav({ screen: "top" }), goMuniSelect: () => nav({ screen: "muni", muni: null, muniCode: undefined }),
    muniPrefName: prefName,
    // 市区町村選択画面: シャード取得中はローディング、全県が決算ベースで閲覧可
    muniLoading,
    muniIntro:
      prefName === "山梨県"
        ? `甲府市は当初予算ベースの詳細（主な事業・執行・評価・前年比較）まで収録。${muniEntries.filter((e) => D.tierOf(e.code) === "budget").map((e) => e.name).join("・")}は当初予算（款別・前年当初比較）まで、他の市町村は総務省の決算ベースで閲覧できます。`
        : muniEntries.some((e) => D.tierOf(e.code) === "budget")
          ? `${muniEntries.filter((e) => D.tierOf(e.code) === "budget").map((e) => e.name).join("・")}は当初予算（款別・前年当初比較）まで収録。他の市町村は総務省の決算ベースで閲覧できます。`
          : `${prefName}の市区町村は総務省の決算ベース（款別歳出・歳入内訳・1人あたり・類似比較）で閲覧できます。予算資料ベースの詳細は収録リクエストできます。`,
    // 「県全体（都道府県レベル）」ボタン。県の当初予算エンティティがあれば飛べる
    prefAllOpen: prefEntity
      ? () => nav({ screen: "dash", muni: prefEntity.muniName, muniCode: prefEntity.muniCode, pref: prefName, drillPath: [], theme: null, budgetFy: undefined })
      : () => {},
    prefAllBg: prefEntity ? "#FFFFFF" : "#F0F5F8",
    prefAllFg: prefEntity ? "#14181C" : "#8494A0",
    prefAllBd: prefEntity ? accent : "#DFE7EC",
    prefAllBadge: prefEntity ? "当初予算 収録済" : "準備中",
    prefAllNote: prefEntity
      ? `${prefName}（都道府県会計）の当初予算を款別で閲覧できます`
      : "都道府県（県全体）レベルの会計データは未収録です",
    muniList,
    prefRequestUrl,
    // 全市町村が最低でも決算ベースで閲覧可能になったので、空県カードは出さない
    prefIsEmpty: false,
    crumbPref: s.pref || "山梨県", crumbMuni: data.name || s.muni || "甲府市", yearLabel,
    // 年度切り替え。full=当初予算(複数年)、budget=当初予算(1年)、decision=決算年度
    yearOptions: isDecision
      ? [
          ...decisionView!.availableFys.map((fy) => ({ value: fy, label: D.DECISION_FY_LABELS[fy] ?? `令和${fy.slice(1)}年度 決算` })),
          { value: "__request", label: "＋ 他の年度をリクエスト…" },
        ]
      : isBudget
        ? [
            ...muniBudgetYears!.map((b) => ({ value: b.fy, label: b.fyLabel })),
            { value: "__request", label: "＋ 他の年度をリクエスト…" },
          ]
        : [
            ...KOFU_BUDGET_YEARS.map((b) => ({ value: b.fy, label: b.fyLabel })),
            { value: "__request", label: "＋ 他の年度をリクエスト…" },
          ],
    yearSel: isDecision ? decisionView!.fy : isBudget ? muniBudget!.fy : budget.fy,
    pickYear: (fy: string) => {
      if (fy === "__request") {
        window.open(
          isDecision
            ? D.buildRequestUrl(
                `${data.name}の未収録年度の資料`,
                `年度リクエスト: ${prefName} ${data.name} の、総務省決算（R2〜R6）に無い年度を見たい`,
                data.name,
              )
            : isBudget
              ? D.buildRequestUrl(
                  `${data.name}の未収録年度の当初予算`,
                  `年度リクエスト: ${prefName} ${data.name} の、収録済み（${muniBudget!.fyLabel}）以外の年度を見たい`,
                  data.name,
                )
              : D.buildRequestUrl(
                  "当初予算・決算資料（未収録の年度）",
                  `年度リクエスト: 現在の収録（当初予算 R2〜R8・執行 R1〜R7）に無い年度を見たい`,
                ),
          "_blank",
          "noopener",
        );
        return; // 選択状態は変えない
      }
      setSt({ budgetFy: fy, drillPath: [], theme: null, execFy: undefined, reportNo: undefined });
    },
    navTabs,
    dashTitle: isDecision ? `${data.name}の決算` : `${data.name}の予算`,
    dashSubtitle: isDecision
      ? "普通会計 決算（総務省 市町村別決算状況調） ・ 款別歳出と歳入科目の内訳"
      : "一般会計 当初予算 ・ 歳入と歳出は同額で編成されます",
    totalFmt: fmtV(totalNow),
    totalFmtAnim: <CountUpNum value={totalNow} fmt={fmtV} />,
    yoy: data.yoy,
    yoyCaption: isDecision
      ? "対前年度（決算比）"
      : isBudget
        ? "対前年度（当初比）"
        : budget.prevBasis === "補正後"
          ? "対前年度（補正後予算比）"
          : "対前年度",
    // 政策テーマ・注目の事業は主な事業一覧が要る full 専用
    // 注目の事業は full（甲府）＋budget（豊川・和泉）で出す。政策テーマは full 専用
    dashPanels, themeStrip: isFull ? themeStrip : [], featured: isFull || isBudget ? featured : [],
    // budget 階層の主な事業一覧（款のない和泉も含む）。full は款ドリル/テーマで見せる
    hasBudgetProjects: isBudget && budgetProjectRows.length > 0,
    budgetProjectRows,
    // 施策別グループ（山梨県）。空なら View は従来の一覧を出す
    budgetProjectGroups,
    hasBudgetProjectGroups: budgetProjectGroups.length > 0,
    budgetProjectsCountLabel: isBudget ? `全${projectsForDisplay.length}事業` : "",
    budgetProjectsSourceLabel: isBudget ? `出典：${muniBudget!.sourceTitle}` : "",
    budgetProjectsSourceOpen: isBudget
      ? () => openViewer({
          url: muniBudget!.sourceLocalUrl, title: muniBudget!.sourceTitle,
          sub: "主な事業", originUrl: muniBudget!.originUrl, archiveUrl: muniBudget!.sourceUrl,
        })
      : () => {},
    goThemes: () => nav({ screen: "themes" }),
    drillSideTabs, drillCrumbs, drillLevelLabel: depth === 0 ? "款" : "内訳",
    drillTitle: nodeName, drillTotalFmt: fmtOku(nodeTotal), drillDonutBg: donutBg(donutItems, hoverFor("drill")),
    drillRows, drillEvidence,
    // 款詳細の項テーブル: 表示中の予算年度と一致する統計書データ（当初→最終→決算）が
    // あればそれを出す。無い年度（R7・R8 = 決算前）は従来どおり R6 決算の項内訳を参考表示
    ...(() => {
      const outturn = isFull ? KOFU_OUTTURN_YEARS.find((y) => y.fy === budget.fy) : undefined;
      const oRows = side === "exp" && depth === 1 && outturn
        ? outturn.expenditure.filter((r) => r.kan === nodeName && r.kou != null)
        : [];
      const oKan = outturn?.expenditure.find((r) => r.kan === nodeName && r.kou == null);
      return {
        hasOutturn: oRows.length > 0,
        outturnFyLabel: outturn ? `${outturn.fyLabel}（統計書・確定）` : "",
        outturnInitialNote: outturn?.initialNote ?? "",
        outturnRows: oRows.map((r, i) => ({
          name: r.kou,
          initialFmt: r.initialOku != null ? fmtOku(r.initialOku) : "―",
          finalFmt: fmtOku(r.finalOku),
          settledFmt: fmtOku(r.settledOku),
          execFmt: r.execPct != null ? r.execPct.toFixed(1) + "%" : "―",
          sw: D.PALETTE[i % D.PALETTE.length],
          ref: r.ref,
        })),
        outturnKan: oKan
          ? {
              initialFmt: oKan.initialOku != null ? fmtOku(oKan.initialOku) : "―",
              finalFmt: fmtOku(oKan.finalOku),
              settledFmt: fmtOku(oKan.settledOku),
              execFmt: oKan.execPct != null ? oKan.execPct.toFixed(1) + "%" : "―",
            }
          : null,
        outturnSourceLabel: outturn ? `出典：${outturn.sourceTitle}` : "",
        outturnSourceOpen: outturn
          ? () => openViewer({
              url: outturn.sourceLocalUrl, title: outturn.sourceTitle, sub: `${outturn.fyLabel} 一般会計歳入歳出状況（歳出）`,
              originUrl: outturn.originUrl, archiveUrl: outturn.sourceUrl,
            })
          : null,
      };
    })(),
    // R8 予算の項以下は原典未公開のため、R6 決算の項内訳を年度明示で参考表示する
    ...(() => {
      const rows = isFull && side === "exp" && depth === 1 ? KOFU_R6_DETAIL.byKan[nodeName] ?? [] : [];
      const kanTotal = rows.reduce((a, r) => a + r.v, 0);
      return {
        hasR6Detail: rows.length > 0,
        r6DetailFyLabel: KOFU_R6_DETAIL.fyLabel,
        r6DetailRows: rows.map((r, i) => ({
          name: r.name, amtFmt: fmtOku(r.v), pctFmt: pctOf(r.v, kanTotal),
          barW: ((r.v / (rows[0]?.v || 1)) * 100).toFixed(1),
          sw: D.PALETTE[i % D.PALETTE.length],
        })),
        r6DetailKanTotalFmt: fmtOku(kanTotal),
        r6DetailRequestUrl: D.buildRequestUrl(
          `予算書 本編（款項目節・令和${budget.fy.slice(1)}年度）`,
          `款別ドリルダウンの「${nodeName}」で、令和${budget.fy.slice(1)}年度予算の項別内訳を見たい（現在は直近決算の参考表示のみ）`,
        ),
        r6DetailSourceUrl: KOFU_R6_DETAIL.sourceLocalUrl,
        r6DetailSourceOpen: () => openViewer({
          url: KOFU_R6_DETAIL.sourceLocalUrl, title: KOFU_R6_DETAIL.sourceTitle,
          sub: KOFU_R6_DETAIL.refLabel,
          originUrl: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html", archiveUrl: KOFU_R6_DETAIL.sourceUrl,
        }),
        r6DetailSourceLabel: `出典：${KOFU_R6_DETAIL.sourceTitle} 目的別歳出内訳（${KOFU_R6_DETAIL.refLabel}）`,
      };
    })(),
    drillNoChildrenNote: depth > 0 && nodeItems.length === 0,
    // 款ドリルの「この款の主な事業」（歳出・款レベル）。full=甲府 / budget=豊川（款あり）。
    // 和泉は款が取れない様式なので款ドリルには出さず、ダッシュボードの主な事業一覧で見せる
    ...(() => {
      const rows: any[] =
        side === "exp" && depth === 1
          ? isFull
            ? KOFU_PROJECTS.filter((p) => p.kan === nodeName)
            : isBudget
              ? muniBudget!.projects.filter((p) => p.kan === nodeName)
              : []
          : [];
      const covered = rows.reduce((a, p) => a + p.amountOku, 0);
      const uncovered = Math.max(0, nodeTotal - covered);
      const projTitle = isBudget ? muniBudget!.sourceTitle : KOFU_PROJECTS_SOURCE.title;
      return {
        hasRealProjects: rows.length > 0,
        realProjects: rows.map((p) => ({
          evaluation: isFull ? evalFor(p) : null,
          no: p.no ?? null, kubun: p.kubun ?? "", name: p.name,
          bookName: p.budgetBookName ? `（${p.budgetBookName}）` : "",
          amountFmt: fmtOku(p.amountOku),
          desc: p.description ?? "",
          goal: p.basicGoal ?? "", shisaku: p.shisaku ?? "",
          refLabel: p.refLabel, refTitle: p.ref ?? "", refUrl: p.refLocalUrl,
          refOpen: () => openViewer({
            url: p.refLocalUrl, title: projTitle, sub: `主な事業 ${p.refLabel}`,
            originUrl: isBudget ? muniBudget!.originUrl : KOFU_PROJECTS_SOURCE.originUrl,
            archiveUrl: isBudget ? muniBudget!.sourceUrl : p.refUrl,
          }),
        })),
        realProjectsCoveredFmt: fmtOku(covered),
        realProjectsCoveredPct: nodeTotal > 0 ? ((covered / nodeTotal) * 100).toFixed(1) : "0",
        realProjectsCoveredBarW: nodeTotal > 0 ? Math.min(100, (covered / nodeTotal) * 100).toFixed(1) : "0",
        realProjectsUncoveredFmt: fmtOku(uncovered),
        uncoveredRequestUrl:
          isFull && uncovered > 0.005
            ? D.buildRequestUrl(
                `予算書 本編（款項目節・令和${budget.fy.slice(1)}年度）`,
                `款別ドリルダウンの「${nodeName}」で、主な事業一覧に掲載のない ${fmtOku(uncovered)} の内訳（項・目・節、事業別）を知りたい`,
              )
            : "",
        realProjectsSourceUrl: isBudget ? muniBudget!.sourceLocalUrl : KOFU_PROJECTS_SOURCE.localUrl,
        realProjectsSourceLabel: `出典：${projTitle} 主な事業`,
        realProjectsSourceOpen: () => openViewer({
          url: isBudget ? muniBudget!.sourceLocalUrl : KOFU_PROJECTS_SOURCE.localUrl,
          title: projTitle, sub: "主な事業",
          originUrl: isBudget ? muniBudget!.originUrl : KOFU_PROJECTS_SOURCE.originUrl,
          archiveUrl: isBudget ? muniBudget!.sourceUrl : KOFU_PROJECTS_SOURCE.url,
        }),
      };
    })(),
    // 全体のエビデンス充足度（一般会計の款に属する主な事業の合計 vs 歳出総額）
    ...(() => {
      const general = isFull ? KOFU_PROJECTS.filter((p) => budget.expenditure.some((k) => k.name === p.kan)) : [];
      const covered = general.reduce((a, p) => a + p.amountOku, 0);
      return {
        hasProjCoverage: general.length > 0,
        projCoverageCoveredFmt: fmtOku(covered),
        projCoverageCount: String(general.length),
        projCoveragePct: ((covered / budget.totalOku) * 100).toFixed(1),
        projCoverageBarW: Math.min(100, (covered / budget.totalOku) * 100).toFixed(1),
        projCoverageRestFmt: fmtOku(Math.max(0, budget.totalOku - covered)),
      };
    })(),
    // エビデンスは自サーバーのコピーをドロワーで開く（発行元・Wayback はドロワー内の補助リンク）
    viewer: s.viewer ?? null,
    closeViewer,
    drillPdfUrl: isDecision ? "" : isBudget ? muniBudget!.sourceLocalUrl : budget.sourceLocalUrl,
    dashSourceLabel: isDecision
      ? `出典：${decisionView!.primaryEvidence?.title ?? "総務省 市町村別決算状況調"}（${decisionView!.refLabel}）`
      : isBudget
        ? `出典：${muniBudget!.sourceTitle}`
        : `出典：${budget.sourceTitle} ${budget.pagesLabel}`,
    dashSourceUrl: isDecision ? decisionView!.primaryEvidence?.localUrl ?? "" : isBudget ? muniBudget!.sourceLocalUrl : budget.sourceLocalUrl,
    dashSourceTitle: isDecision ? decisionView!.primaryEvidence?.title ?? "総務省 市町村別決算状況調" : isBudget ? muniBudget!.sourceTitle : budget.sourceTitle,
    dashSourceOpen: isDecision
      ? (decisionView!.primaryEvidence
          ? () => openViewer({
              url: decisionView!.primaryEvidence!.localUrl,
              title: decisionView!.primaryEvidence!.title,
              sub: `${decisionView!.fyLabel} ・ ${decisionView!.refLabel}`,
              originUrl: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html",
              archiveUrl: decisionView!.primaryEvidence!.url,
            })
          : () => {})
      : isBudget
        ? () => openViewer({
            url: muniBudget!.sourceLocalUrl, title: muniBudget!.sourceTitle,
            sub: `${muniBudget!.fyLabel} ・ 款別歳入歳出`,
            originUrl: muniBudget!.originUrl, archiveUrl: muniBudget!.sourceUrl,
          })
        : () => openViewer({
            // 表紙でなく款別一覧の先頭ページ（pagesLabel の最初の数値）から開く
            url: `${budget.sourceLocalUrl}#page=${budget.pagesLabel.match(/\d+/)?.[0] ?? 1}`,
            title: budget.sourceTitle, sub: `款別一覧 ${budget.pagesLabel}`,
            originUrl: budget.originUrl, archiveUrl: budget.sourceUrl,
          }),
    themesIntro: `${planInfo.plan}の基本目標（${GOALS.map((g) => `「${g.name}」`).join("")}）別に、予算資料「主な事業一覧」に掲載された${KOFU_PROJECTS.length}事業を、資料記載の基本目標・施策の紐付けどおりに集計しています。`,
    drillTipMove: mkDonutTip(donutItems, nodeTotal, data.pop, "drill"),
    drillSub: subV(nodeTotal),
    tipShow: !!(s.tip && s.tip.title), tipX: s.tip ? s.tip.x : 0, tipY: s.tip ? s.tip.y : 0,
    tipTitle: s.tip ? s.tip.title : "", tipSw: s.tip ? s.tip.sw : "#14181C",
    tipAmtLine: s.tip && s.tip.amt ? `${s.tip.amt}（${s.tip.pct}）` : "",
    tipDesc: s.tip ? s.tip.desc || "" : "",
    hideTip,
    gKan: mkGloss("款"),
    perCapitaLine: isPer
      ? `総額 ${fmtOku(totalNow)}`
      : `市民1人あたり ${((totalNow * 1e8) / data.pop / 1e4).toFixed(1)}万円（${isDecision ? "住民基本台帳人口" : isBudget ? muniBudget!.populationLabel : budget.populationLabel} ${data.pop.toLocaleString()}人）`,
    unitTabs,
    unitLabel: isPer ? "1人あたり" : "総額",
    isSimilar: screen === "similar", isSources,
    isCoverage,
    goCoverage: () => nav({ screen: "coverage", pref: null, muni: null, muniCode: undefined }),
    // データ整備状況: 全1,741市町村を都道府県ごとに ○× で網羅する単一の表。
    // 手付かずの自治体も必ず載せる（空欄＝ToDo が見えることがこのページの価値）。
    cov: (() => {
      const q = (s.covQ ?? "").trim();
      const openPrefs = s.covOpen ?? [];
      const d = covData;
      if (!d) return { loading: covLoading, error: covError, ready: false as const };
      const ents = d.entities;
      // 検索は自治体名・都道府県名・団体コードに前方/部分一致（入力即時フィルタ）
      const hit = (name: string, code: string, pref: string) =>
        !q || name.includes(q) || pref.includes(q) || code.startsWith(q);
      const groups = d.prefs
        .map((p) => {
          const prefMatched = !q || p.name.includes(q);
          const rows = p.munis.filter((m) => prefMatched || hit(m.n, m.c, p.name));
          return { pref: p, rows, prefMatched };
        })
        .filter((g) => g.rows.length > 0)
        .map((g) => {
          // 検索中はヒットした県を自動で開く（探して即見えるように）
          const open = q ? true : openPrefs.includes(g.pref.name);
          const deep = g.rows.filter((m) => ents[m.c]).length;
          return {
            name: g.pref.name,
            code: g.pref.code,
            count: g.rows.length,
            deep,
            open,
            toggle: () =>
              setSt({
                covOpen: openPrefs.includes(g.pref.name)
                  ? openPrefs.filter((x) => x !== g.pref.name)
                  : [...openPrefs, g.pref.name],
              }),
            rows: open
              ? g.rows.map((m) => {
                  const e = ents[m.c];
                  // 未収録の列 → その場でリクエスト（＝この表がそのまま参加導線になる）
                  const missing = d.datasets.filter((ds, i) => m.f[i] !== "1");
                  const missLabel = missing.map((x) => x.label).join("・");
                  return {
                    code: m.c,
                    name: m.n,
                    tier: e?.tier ?? null,
                    // 列ごとの ○×（true=収録済み）と、収録済みなら中身の説明
                    marks: d.datasets.map((ds, i) => ({
                      key: ds.key,
                      ok: m.f[i] === "1",
                      detail: e?.detail[ds.key] ?? "",
                    })),
                    missingCount: missing.length,
                    missLabel,
                    requestUrl: missing.length
                      ? D.buildRequestUrl(
                          `${m.n}の${missLabel}の収録`,
                          `データ整備状況より: ${g.pref.name} ${m.n}（団体コード ${m.c}）の「${missing.map((x) => x.full).join("」「")}」が未収録。収録してほしい`,
                          m.n.replace(/（県全体）$/, ""),
                        )
                      : "",
                    sourceCount: e?.sources.length ?? 0,
                    sourcesOpen: s.covMuni === m.c,
                    toggleSources: () => setSt({ covMuni: s.covMuni === m.c ? null : m.c }),
                    sources: (e?.sources ?? []).map((src) => ({
                      ...src,
                      files: src.files.map((f) => ({
                        ...f,
                        open: () =>
                          openViewer({
                            url: f.localUrl, title: src.title, sub: `${f.filename} ・ ${f.fetchedAt} 取得`,
                            originUrl: src.originUrl, archiveUrl: src.archiveUrl ?? src.originUrl,
                          }),
                      })),
                    })),
                  };
                })
              : [],
          };
        });
      const matched = groups.reduce((a, g) => a + g.count, 0);
      return {
        ready: true as const,
        loading: false,
        error: null,
        summary: d.summary,
        datasets: d.datasets,
        q,
        setQ: (val: string) => setSt({ covQ: val }),
        groups,
        matched,
        allOpen: openPrefs.length > 0 && !q,
        expandAll: () => setSt({ covOpen: d.prefs.map((p) => p.name) }),
        collapseAll: () => setSt({ covOpen: [] }),
        // ライセンス上の懸念（③の再配布に許諾が要る資料）
        permissionSources: [...Object.values(d.entities).flatMap((e) => e.sources), ...d.national].filter(
          (x) => x.licenseClass === "permission-required",
        ),
        national: d.national,
        unclassified: d.unclassified,
      };
    })(),
    goSources: () => nav({ screen: "sources" }), goDash: () => nav({ screen: "dash" }),
    // 類似自治体との比較（軸で選ぶ）は simVals にまとめてある
    ...simVals,
    uncollected: D.UNCOLLECTED,
    requestListUrl: D.REQUEST_LIST_URL,
    sourceLabel,
    // --- データの注意 -------------------------------------------------------
    // 「この数値のここが不確か」を隠さずダッシュボードに出す。**手で書かない** —
    // validate の warning（＝検証ゲートが検出し、原典側の事情と説明できるもの）をそのまま出す。
    // 表示年度に関わらずその自治体の全資料ぶんを出す（年度を切り替えて初めて効く注意もあるため）。
    caveats: (() => {
      const list = muniCode ? CAVEATS[muniCode] ?? [] : [];
      if (list.length === 0) return null;
      return {
        count: list.length,
        items: list.map((c) => ({
          fyLabel: c.fy.startsWith("H") ? `平成${c.fy.slice(1)}年度` : `令和${c.fy.slice(1)}年度`,
          title: c.title,
          plain: c.plain, // 市民向けの一行（未知のパターンは null）
          message: c.message, // 検証の原文。丸めず併記する
        })),
      };
    })(),
    // --- 事業報告（成果）の全量公開（川崎 572件）------------------------------
    // 甲府の `report`（公表サンプル5件・A〜F の総合評価）とは**別のセクション**にする。
    // 評価体系が違う（川崎は達成度1〜5＋方向性Ⅰ〜Ⅴ で、**達成度は数字が小さいほど良い**＝
    // A〜F と向きが逆）ので、既存のバッジへ丸めると意味が反転する。
    repAll: (() => {
      if (!reportMuni) return null;
      if (!repData) return { ready: false as const, loading: repLoading, error: repError };
      const q = (s.repQ ?? "").trim();
      const rows = repData.reports.filter(
        (r) => !q || r.name.includes(q) || r.buka.includes(q) || r.policy.includes(q) || r.measure.includes(q) || r.code.startsWith(q),
      );
      const PER = 20;
      const pages = Math.max(1, Math.ceil(rows.length / PER));
      const page = Math.min(Math.max(1, s.repPage ?? 1), pages);
      const start = (page - 1) * PER;
      // 表示年度の決算（見込み含む）を代表値にする。無ければ予算
      const pick = (r: (typeof repData.reports)[number]) => {
        const fy = repData.fy;
        return r.cost.find((c) => c.fy === fy && c.kind === "決算") ?? r.cost.find((c) => c.fy === fy && c.kind === "予算") ?? null;
      };
      return {
        ready: true as const,
        loading: false,
        error: null,
        muniName: repData.muniName,
        fyLabel: repData.fyLabel,
        sourceTitle: repData.sourceTitle,
        total: repData.reports.length,
        hits: rows.length,
        page,
        pages,
        from: rows.length === 0 ? 0 : start + 1,
        to: Math.min(start + PER, rows.length),
        q,
        setQ: (val: string) => setSt({ repQ: val, repPage: 1 }),
        setPage: (n: number) => setSt({ repPage: Math.min(Math.max(1, n), pages) }),
        achievementLabels: repData.achievementLabels,
        directionLabels: repData.directionLabels,
        // 金額は総額/1人あたりトグルに追従させる（成果指標は金額でないので per capita 化しない）。
        // シャードは千円なので億円へ直してから既存の整形に通す
        fmt: (thousandYen: number) => fmtV(thousandYen / 1e5),
        // 達成度の分布（発行元の集計と一致することを確認済み）。1が最良
        dist: Object.entries(repData.achievementCounts)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([k, n]) => ({
            k,
            n,
            label: repData.achievementLabels[k] ?? k,
            pct: ((n / repData.reports.length) * 100).toFixed(1),
          })),
        rows: rows.slice(start, start + PER).map((r) => {
          const c = pick(r);
          return {
            code: r.code,
            name: r.name,
            buka: r.buka,
            policy: r.policy,
            measure: r.measure,
            achievement: r.achievement,
            achievementLabel: r.achievement != null ? repData.achievementLabels[String(r.achievement)] ?? "" : "",
            direction: r.direction,
            directionLabel: r.direction ? repData.directionLabels[r.direction] ?? "" : "",
            // 総コスト（人件費込み）。単位トグルに追従させる（金額なので per capita 化してよい）
            totalCost: c?.totalCost ?? null,
            jigyohi: c?.jigyohi ?? null,
            jinkenhi: c?.jinkenhi ?? null,
            costLabel: c ? `${repData.fyLabel}${c.kind}${c.est ? "（見込）" : ""}` : "",
            // href にも入れる（onClick だけだと中クリック・キーボードでリンクとして扱えない）
            ref: r.ref,
            refLabel: r.refLabel,
            open: () =>
              openViewer({
                url: r.ref,
                title: repData.sourceTitle,
                sub: `${r.name}（${r.refLabel}）`,
                originUrl: repData.originUrl,
                archiveUrl: repData.originUrl,
              }),
          };
        }),
      };
    })(),
    // --- /roadmap（進捗と計画）---------------------------------------------
    // 進捗の数字は **roadmap.gen.ts が実データから算出したもの**（手書きの数字は無い）。
    // 計画だけが手書き（pipeline/registry/roadmap.ts）。ここでは並べ替えと表示整形のみ行う
    isRoadmap,
    goRoadmap: () => nav({ screen: "roadmap", pref: null, muni: null, muniCode: undefined }),
    rm: (() => {
      const p = ROADMAP_PROGRESS;
      const label: Record<string, string> = {
        kessan: "決算", budget: "当初予算", projects: "主な事業", report: "事業報告（成果）",
        council: "議会の構成", execution: "予算執行", evaluation: "事務事業評価", outturn: "統計書 款項",
      };
      return {
        progress: p,
        // 甲府（full）で何がどこまで収録できているか＝「1自治体を深く掘るとどうなるか」の見本
        kofuRows: Object.entries(p.kofuDetail).map(([k, v]) => ({ label: label[k] ?? k, detail: v as string })),
        // 当初予算を複数年度収録している自治体（年度の多い順）
        depth: p.budgetDepth,
        groups: (["now", "next", "later"] as const).map((st) => ({
          status: st,
          title: { now: "着手している", next: "次にやる", later: "その先" }[st],
          note: {
            now: "いま手を動かしているもの",
            next: "前提が揃っていて、次に着手するもの",
            later: "やりたいが、前提が未確定 or 発行元の判断待ちのもの",
          }[st],
          items: ROADMAP_PLAN.filter((r) => r.status === st),
        })),
      };
    })(),
    // データ出典: **収録している全資料**を出す。以前は data.ts の SOURCES（甲府市＋総務省だけを
    // 手で並べた配列）を使っており、budget 階層18団体の資料が1件も載っていなかった
    // （2026-07-15 修正）。coverage.json はレジストリと魚拓台帳から自動生成されるので、
    // 資料を足せば黙って増える＝実態とズレない。
    src: (() => {
      const d = covData;
      if (!d) return { loading: covLoading, error: covError, ready: false as const };
      const all = [
        ...Object.values(d.entities).flatMap((e) => e.sources),
        ...d.national,
        ...d.unclassified,
      ];
      const q = (s.srcQ ?? "").trim();
      // 資料名・発行元・年度・使用箇所に部分一致（入力即時フィルタ）
      const rows = all.filter(
        (c) => !q || c.title.includes(q) || c.publisher.includes(q) || c.fiscalYear.includes(q) || c.used.includes(q),
      );
      const PER = 25;
      const pages = Math.max(1, Math.ceil(rows.length / PER));
      const page = Math.min(Math.max(1, s.srcPage ?? 1), pages); // 検索で件数が減ったら範囲内へ丸める
      const start = (page - 1) * PER;
      const view = rows.slice(start, start + PER);
      return {
        ready: true as const,
        loading: false,
        error: null,
        total: all.length,
        hits: rows.length,
        page,
        pages,
        from: rows.length === 0 ? 0 : start + 1,
        to: Math.min(start + PER, rows.length),
        q,
        setQ: (val: string) => setSt({ srcQ: val, srcPage: 1 }), // 検索したら1ページ目へ
        setPage: (n: number) => setSt({ srcPage: Math.min(Math.max(1, n), pages) }),
        rows: view.map((c) => {
          const f = c.files[0];
          return {
            sourceId: c.sourceId,
            title: c.title,
            type: c.kind === "pdf" ? "PDF" : c.kind === "html" ? "Web" : c.kind === "excel" ? "Excel" : c.kind,
            org: c.publisher,
            fy: c.fiscalYear,
            date: f?.fetchedAt ?? "",
            used: c.used,
            licenseClass: c.licenseClass,
            localUrl: f?.localUrl ?? null,
            originUrl: c.originUrl,
            archiveUrl: c.archiveUrl,
            // ドロワーで自サーバーの原本コピーを開く（エビデンス3層の③。発行元・魚拓は補助リンク）
            open: f?.localUrl
              ? () =>
                  openViewer({
                    url: f.localUrl,
                    title: c.title,
                    sub: `${c.publisher}・${c.fiscalYear}`,
                    originUrl: c.originUrl,
                    archiveUrl: c.archiveUrl ?? c.originUrl,
                  })
              : null,
          };
        }),
      };
    })(),
    themeCards, ...themeVals,
    compTabs, compRows,
    // 前年ラベル。full=甲府 or budget=類似4市（compSrc）の年度・基準を使う。
    // R2 の前年（令和元年度）は「6月補正後予算額」との比較なので基準を明示する
    compPrevLabel:
      `令和${Number(compSrc.fy.slice(1)) - 1 === 1 ? "元" : Number(compSrc.fy.slice(1)) - 1}年度` +
      (compSrc.prevBasis === "補正後" ? "（補正後予算額）" : ""),
    compCurLabel: `令和${compSrc.fy.slice(1)}年度`,
    // 比較の基準を文章でも言う。**「前年度当初額を使用」と決め打ちしない** — 前年度列が当初でない
    // 資料がある（甲府 R2 の6月補正後・札幌 R6/R2 の骨格予算→肉付後）。基準と文章が食い違うと
    // 「補正後予算額」ラベルの隣で「当初額を使用」と書く自己矛盾になる（2026-07-15 修正）
    compBasisNote:
      compSrc.prevBasis === "補正後"
        ? "前年度は当初額ではなく補正後予算額"
        : "予算資料の前年度当初額を使用",
    // 前年度列の資料注記（甲府 R6:「※令和5年度当初予算額は6月補正の政策的予算を含む」）
    compPrevNote: (compSrc as { prevNote?: string }).prevNote ? `※資料注記: ${(compSrc as { prevNote?: string }).prevNote}` : "",
    compPrevTotal: fmtV(compPrevSum), compCurTotal: fmtV(compCurSum), compSub: subV(compCurSum),
    compTotalDelta: (compDelta >= 0 ? "+" : "−") + fmtV(Math.abs(compDelta)),
    compTotalPct: (compDelta >= 0 ? "+" : "−") + ((Math.abs(compDelta) / compPrevSum) * 100).toFixed(1) + "%",
    compTotalFg: compDelta >= 0 ? "#0F76A3" : "#C25400",
  };

  return <BudgetTraceView v={v} />;
}
