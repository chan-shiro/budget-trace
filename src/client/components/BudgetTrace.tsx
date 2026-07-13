"use client";

import React from "react";
import { CountUpNum } from "./ui";
import * as D from "@/client/lib/data";
import { useDecisionData } from "@/client/hooks/useDecisionData";
import BudgetTraceView from "./BudgetTraceView";

const {
  GLOSS, SIM_MIX_COLS, SIMILAR, SIMILAR_EVIDENCE, SOURCES,
  KOFU_BUDGET_YEARS, KOFU_PROJECT_YEARS, KOFU_EXECUTION_YEARS, KOFU_EVALUATION_YEARS, KOFU_OUTTURN_YEARS, KOFU_R6_DETAIL, KOFU_TREND,
  muniFromBudget, fmtOku, pctOf, fmtPerCap, fadeColor, donutBg, setPalette,
} = D;

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

export default function BudgetTrace() {
  const [st, setStRaw] = React.useState<St>(DEFAULT_ST);
  const tipTimer = React.useRef<any>(null);

  const setSt = (patch: Partial<St>) => setStRaw((s) => ({ ...s, ...patch }));
  const nav = (patch: Partial<St>) => {
    setSt(patch);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  // --- URL 同期（ディープリンク） ---
  // 画面・年度・ドリル位置などを URL クエリに反映し、共有・リロード・ブラウザバックに
  // 対応する。SSR は既定 state で描画されるため、URL の復元はマウント後に行う
  // （初回に一瞬トップが見えるのは静的 SPA の仕様）。
  const stToQuery = (t: St): string => {
    const p = new URLSearchParams();
    if (t.screen !== "top") p.set("s", t.screen);
    // 自治体の識別。甲府（full 既定）は後方互換のため省略。それ以外は pref/muni/mc を積む
    const isKofu = t.muniCode === "192015" || (!t.muniCode && (t.muni === "甲府市" || !t.muni));
    if (t.screen === "muni") {
      if (t.pref) p.set("pref", t.pref);
    } else if (t.screen !== "top" && !isKofu) {
      if (t.pref) p.set("pref", t.pref);
      if (t.muni) p.set("muni", t.muni);
      if (t.muniCode) p.set("mc", t.muniCode);
    }
    if (t.budgetFy) p.set("fy", t.budgetFy);
    if (t.screen === "drill") {
      if (t.drillSide !== "exp") p.set("side", t.drillSide);
      if (t.drillPath.length) p.set("path", t.drillPath.join("/"));
    }
    if (t.screen === "themes" && t.theme) p.set("theme", t.theme);
    if (t.screen === "execution") {
      if (t.execFy) p.set("efy", t.execFy);
      if (t.execSide && t.execSide !== "exp") p.set("eside", t.execSide);
    }
    if (t.screen === "compare" && t.compSide && t.compSide !== "exp") p.set("cside", t.compSide);
    if (t.unit === "per") p.set("unit", "per");
    const q = p.toString();
    return q ? `?${q}` : location.pathname;
  };
  const queryToPatch = (search: string): Partial<St> => {
    const p = new URLSearchParams(search);
    const screen = p.get("s") ?? "top";
    const mc = p.get("mc");
    // 自治体の復元。mc があれば decision 自治体、無ければ後方互換で甲府（full）
    let pref: string | null;
    let muni: string | null;
    let muniCode: string | undefined;
    if (screen === "top") {
      pref = null; muni = null; muniCode = undefined;
    } else if (screen === "muni") {
      pref = p.get("pref") ?? "山梨県"; muni = null; muniCode = undefined;
    } else if (mc) {
      pref = p.get("pref"); muni = p.get("muni"); muniCode = mc;
    } else {
      pref = "山梨県"; muni = "甲府市"; muniCode = "192015";
    }
    return {
      screen,
      pref,
      muni,
      muniCode,
      budgetFy: p.get("fy") ?? undefined,
      drillSide: p.get("side") ?? "exp",
      drillPath: p.get("path")?.split("/").filter(Boolean) ?? [],
      theme: p.get("theme"),
      execFy: p.get("efy") ?? undefined,
      execSide: p.get("eside") ?? "exp",
      compSide: p.get("cside") ?? "exp",
      unit: p.get("unit") === "per" ? "per" : "total",
      viewer: null,
      tip: null,
    };
  };
  const urlReady = React.useRef(false);
  const lastScreen = React.useRef("top");
  React.useEffect(() => {
    // マウント時: URL から state を復元し、以後の popstate（戻る/進む）にも追従する
    if (location.search) setStRaw((prev) => ({ ...prev, ...queryToPatch(location.search) }));
    urlReady.current = true;
    const onPop = () => setStRaw((prev) => ({ ...prev, ...queryToPatch(location.search) }));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (!urlReady.current) return;
    const url = stToQuery(st);
    if (`${location.pathname}${location.search}` === url || (url === location.pathname && !location.search)) return;
    // 画面遷移は履歴に積む（戻るで前の画面へ）。同一画面内の切替は置き換え
    if (st.screen !== lastScreen.current) history.pushState(null, "", url);
    else history.replaceState(null, "", url);
    lastScreen.current = st.screen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.screen, st.pref, st.muni, st.muniCode, st.budgetFy, st.drillSide, st.drillPath, st.theme, st.execFy, st.execSide, st.compSide, st.unit]);

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

  // --- カバレッジ階層 ---
  // full = 甲府市（予算ベースの詳細画面: 主な事業・執行・評価・補正・前年当初比較）。
  // decision = 総務省 決算状況調ベース（全1,741市町村）。県コードのシャードを選択時に取得する。
  const prefName = s.pref || "山梨県";
  const prefCode = D.prefCodeOf(prefName);
  const muniCode = s.muniCode ?? null;
  const tier = D.tierOf(muniCode);
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

  // 収録済み（full）の年度は当初予算の収録年度（R8〜R6・R3〜R2）から選択
  const budget = KOFU_BUDGET_YEARS.find((b) => b.fy === s.budgetFy) ?? KOFU_BUDGET_YEARS[0]!;
  const projYear = KOFU_PROJECT_YEARS.find((y) => y.fy === budget.fy);
  const KOFU_PROJECTS = React.useMemo(() => projYear?.projects ?? [], [projYear]);
  const KOFU_PROJECTS_SOURCE = projYear?.source ?? { title: "", url: "", originUrl: "", localUrl: "", pagesLabel: "" };
  const kofuData = React.useMemo(() => muniFromBudget(budget), [budget]);
  // 表示データ: decision 自治体はビルダ出力、full（甲府）は予算パース値
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
    : kofuData;
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
  const muniList = muniEntries.map(({ code, name }) => {
    const full = D.tierOf(code) === "full";
    return {
      name,
      badge: full ? `収録済 当初予算${KOFU_BUDGET_YEARS.length}年度分＋決算` : "決算ベース（総務省）",
      badgeFg: full ? accent : "#4B95C4",
      bg: "#FFFFFF",
      bd: full ? accent : "#CFE0EA",
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

  // --- 注目の事業（予算額上位・実データ） ---
  const featured = [...KOFU_PROJECTS]
    .sort((a, b) => b.amountOku - a.amountOku)
    .slice(0, 3)
    .map((p) => ({
      name: p.name, kanPath: p.kan ?? p.shisaku, kubun: p.kubun ?? "",
      budgetFmt: fmtV(p.amountOku), sub: subV(p.amountOku), desc: p.description,
    }));

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
    (!isDecision &&
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
  const compSide = s.compSide || "exp";
  const compKans = compSide === "rev" ? budget.revenue : budget.expenditure;
  const compCurSum = budget.totalOku;
  const compPrevSum = budget.prevTotalOku ?? 0;
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

  // --- 予算執行状況（R7=財政事情の速報、R6〜R1=決算状況の確定値。R3 は WARP 保存版から回収） ---
  const execSide = s.execSide || "exp";
  // 年度の既定はヘッダの年度ドロップダウンに追従する（過去年度を見ている人が
  // 執行タブを開いたらその年度の確定執行が出る）。ピルで明示選択したらそちらが優先
  const execYear =
    KOFU_EXECUTION_YEARS.find((y) => y.fy === s.execFy) ??
    KOFU_EXECUTION_YEARS.find((y) => y.fy === budget.fy) ??
    KOFU_EXECUTION_YEARS[0]!;
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
  const navDefsDecision: [string, string, () => void][] = [
    ["ダッシュボード", "dash", () => nav({ screen: "dash" })],
    ["款別ドリルダウン", "drill", () => nav({ screen: "drill" })],
    ["類似自治体", "similar", () => nav({ screen: "similar" })],
  ];
  const navDefs = isDecision ? navDefsDecision : navDefsFull;
  const navTabs = navDefs.map(([label, key, open]) => ({ label, open, fg: screen === key ? "#14181C" : "#5C6B77", fw: screen === key ? "700" : "500", ul: screen === key ? accent : "transparent" }));

  // decision 自治体で full 専用画面（前年比較・政策テーマ・予算執行）を指す URL に来たら
  // ダッシュボードにフォールバックする（ディープリンク経由の直行を吸収）
  const fullOnly = ["compare", "themes", "execution"].includes(screen);
  const gatedToDash = isDecision && fullOnly;

  const v: any = {
    isTop: screen === "top", isMuni: screen === "muni", isApp,
    isDash: screen === "dash" || gatedToDash, isDrill: screen === "drill",
    isThemes: screen === "themes" && !isDecision, isCompare: screen === "compare" && !isDecision,
    isExecution: screen === "execution" && !isDecision,
    // 決算ベース（総務省・decision 階層）の自治体か。予算資料ベースの full 画面は出さない
    isDecision,
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
    execTabs, execRows,
    // 年度切替（R3 は資料消失により欠落 — execGapNote で明示）
    execYearTabs: KOFU_EXECUTION_YEARS.map((y) => ({
      label: `${y.fy}${y.basis === "速報" ? "（速報）" : ""}`,
      pick: () => setSt({ execFy: y.fy }),
      bg: y.fy === execYear.fy ? "#14181C" : "#FFFFFF",
      fg: y.fy === execYear.fy ? "#F7FAFC" : "#5C6B77",
    })),
    execGapNote: "令和3年度は発行元サイトから削除済みのため、国立国会図書館 WARP の保存版から収録しています",
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
    showEvidence,
    onPrefSelect: (name: string) => nav({ screen: "muni", pref: name }),
    mapColorMode,
    onMuniSelect: (pfName: string, muniName: string | null) => {
      // 甲府だけ full 経路へ直行。他は県の一覧（シャード）へ — グリッドで団体コード付き選択
      if (pfName === "山梨県" && muniName === "甲府市") nav({ screen: "dash", pref: pfName, muni: "甲府市", muniCode: "192015", drillPath: [], theme: null, budgetFy: undefined });
      else nav({ screen: "muni", pref: pfName });
    },
    searchQ: s.searchQ,
    openKofuLink: (e: any) => { if (e && e.preventDefault) e.preventDefault(); nav({ screen: "dash", muni: "甲府市", muniCode: "192015", pref: "山梨県", budgetFy: undefined }); },
    goTop: () => nav({ screen: "top" }), goMuniSelect: () => nav({ screen: "muni", muni: null, muniCode: undefined }),
    muniPrefName: prefName,
    // 市区町村選択画面: シャード取得中はローディング、全県が決算ベースで閲覧可
    muniLoading,
    muniIntro:
      prefName === "山梨県"
        ? "甲府市は当初予算ベースの詳細（主な事業・執行・評価・前年比較）まで収録。他の市町村は総務省の決算ベースで閲覧できます。"
        : `${prefName}の市区町村は総務省の決算ベース（款別歳出・歳入内訳・1人あたり・類似比較）で閲覧できます。予算資料ベースの詳細は収録リクエストできます。`,
    prefAllOpen: () => {},
    prefAllBg: "#F0F5F8", prefAllFg: "#8494A0", prefAllBd: "#DFE7EC",
    prefAllBadge: "準備中",
    prefAllNote: "都道府県（県全体）レベルの会計データは未収録です",
    muniList,
    prefRequestUrl,
    // 全市町村が最低でも決算ベースで閲覧可能になったので、空県カードは出さない
    prefIsEmpty: false,
    crumbPref: s.pref || "山梨県", crumbMuni: data.name || s.muni || "甲府市", yearLabel,
    // 年度切り替え。full=当初予算年度、decision=決算年度。切替時はドリル位置・テーマをリセット
    yearOptions: isDecision
      ? [
          ...decisionView!.availableFys.map((fy) => ({ value: fy, label: D.DECISION_FY_LABELS[fy] ?? `令和${fy.slice(1)}年度 決算` })),
          { value: "__request", label: "＋ 他の年度をリクエスト…" },
        ]
      : [
          ...KOFU_BUDGET_YEARS.map((b) => ({ value: b.fy, label: b.fyLabel })),
          { value: "__request", label: "＋ 他の年度をリクエスト…" },
        ],
    yearSel: isDecision ? decisionView!.fy : budget.fy,
    pickYear: (fy: string) => {
      if (fy === "__request") {
        window.open(
          isDecision
            ? D.buildRequestUrl(
                `${data.name}の未収録年度の資料`,
                `年度リクエスト: ${prefName} ${data.name} の、総務省決算（R2〜R6）に無い年度を見たい`,
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
      setSt({ budgetFy: fy, drillPath: [], theme: null, execFy: undefined });
    },
    navTabs,
    dashTitle: isDecision ? `${data.name}の決算` : `${data.name}の予算`,
    dashSubtitle: isDecision
      ? "普通会計 決算（総務省 市町村別決算状況調） ・ 款別歳出と歳入科目の内訳"
      : "一般会計 当初予算 ・ 歳入と歳出は同額で編成されます",
    totalFmt: fmtV(totalNow),
    totalFmtAnim: <CountUpNum value={totalNow} fmt={fmtV} />,
    yoy: data.yoy,
    yoyCaption: isDecision ? "対前年度（決算比）" : budget.prevBasis === "補正後" ? "対前年度（補正後予算比）" : "対前年度",
    dashPanels, themeStrip: isDecision ? [] : themeStrip, featured: isDecision ? [] : featured,
    goThemes: () => nav({ screen: "themes" }),
    drillSideTabs, drillCrumbs, drillLevelLabel: depth === 0 ? "款" : "内訳",
    drillTitle: nodeName, drillTotalFmt: fmtOku(nodeTotal), drillDonutBg: donutBg(donutItems, hoverFor("drill")),
    drillRows, drillEvidence,
    // 款詳細の項テーブル: 表示中の予算年度と一致する統計書データ（当初→最終→決算）が
    // あればそれを出す。無い年度（R7・R8 = 決算前）は従来どおり R6 決算の項内訳を参考表示
    ...(() => {
      const outturn = isDecision ? undefined : KOFU_OUTTURN_YEARS.find((y) => y.fy === budget.fy);
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
      const rows = !isDecision && side === "exp" && depth === 1 ? KOFU_R6_DETAIL.byKan[nodeName] ?? [] : [];
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
    // 予算資料「主な事業一覧」の実データ（款レベル・歳出のみ。full=甲府のみ）
    ...(() => {
      const rows = !isDecision && side === "exp" && depth === 1 ? KOFU_PROJECTS.filter((p) => p.kan === nodeName) : [];
      // 事業単位のエビデンスで説明できる額と、款のうち事業掲載が無い残額（詳細不明）
      const covered = rows.reduce((a, p) => a + p.amountOku, 0);
      const uncovered = Math.max(0, nodeTotal - covered);
      return {
        hasRealProjects: rows.length > 0,
        realProjects: rows.map((p) => ({
          evaluation: evalFor(p),
          no: p.no, kubun: p.kubun ?? "", name: p.name,
          bookName: p.budgetBookName ? `（${p.budgetBookName}）` : "",
          amountFmt: fmtOku(p.amountOku), desc: p.description,
          goal: p.basicGoal, shisaku: p.shisaku,
          refLabel: p.refLabel, refTitle: p.ref, refUrl: p.refLocalUrl,
          refOpen: () => openViewer({
            url: p.refLocalUrl, title: KOFU_PROJECTS_SOURCE.title, sub: `主な事業一覧 ${p.refLabel}`,
            originUrl: KOFU_PROJECTS_SOURCE.originUrl, archiveUrl: p.refUrl,
          }),
        })),
        realProjectsCoveredFmt: fmtOku(covered),
        realProjectsCoveredPct: nodeTotal > 0 ? ((covered / nodeTotal) * 100).toFixed(1) : "0",
        realProjectsCoveredBarW: nodeTotal > 0 ? Math.min(100, (covered / nodeTotal) * 100).toFixed(1) : "0",
        realProjectsUncoveredFmt: fmtOku(uncovered),
        // 詳細不明分（事業掲載なし）のその場リクエスト（文脈をプリフィル）
        uncoveredRequestUrl: uncovered > 0.005
          ? D.buildRequestUrl(
              `予算書 本編（款項目節・令和${budget.fy.slice(1)}年度）`,
              `款別ドリルダウンの「${nodeName}」で、主な事業一覧に掲載のない ${fmtOku(uncovered)} の内訳（項・目・節、事業別）を知りたい`,
            )
          : "",
        realProjectsSourceUrl: KOFU_PROJECTS_SOURCE.localUrl,
        realProjectsSourceLabel: `出典：${KOFU_PROJECTS_SOURCE.title} 主な事業一覧 ${KOFU_PROJECTS_SOURCE.pagesLabel}`,
        realProjectsSourceOpen: () => openViewer({
          url: KOFU_PROJECTS_SOURCE.localUrl, title: KOFU_PROJECTS_SOURCE.title,
          sub: `主な事業一覧 ${KOFU_PROJECTS_SOURCE.pagesLabel}`,
          originUrl: KOFU_PROJECTS_SOURCE.originUrl, archiveUrl: KOFU_PROJECTS_SOURCE.url,
        }),
      };
    })(),
    // 全体のエビデンス充足度（一般会計の款に属する主な事業の合計 vs 歳出総額）
    ...(() => {
      const general = isDecision ? [] : KOFU_PROJECTS.filter((p) => budget.expenditure.some((k) => k.name === p.kan));
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
    drillPdfUrl: isDecision ? "" : budget.sourceLocalUrl,
    dashSourceLabel: isDecision
      ? `出典：${decisionView!.primaryEvidence?.title ?? "総務省 市町村別決算状況調"}（${decisionView!.refLabel}）`
      : `出典：${budget.sourceTitle} ${budget.pagesLabel}`,
    dashSourceUrl: isDecision ? decisionView!.primaryEvidence?.localUrl ?? "" : budget.sourceLocalUrl,
    dashSourceTitle: isDecision ? decisionView!.primaryEvidence?.title ?? "総務省 市町村別決算状況調" : budget.sourceTitle,
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
      : `市民1人あたり ${((totalNow * 1e8) / data.pop / 1e4).toFixed(1)}万円（${isDecision ? "住民基本台帳人口" : budget.populationLabel} ${data.pop.toLocaleString()}人）`,
    unitTabs,
    isSimilar: screen === "similar", isSources: screen === "sources",
    goSources: () => nav({ screen: "sources" }), goDash: () => nav({ screen: "dash" }),
    similarRows: SIMILAR.map((r) => {
      const cols = [D.PALETTE[0], D.PALETTE[1], D.PALETTE[2], D.PALETTE[4], "#C6D2DA"];
      const sHover = hoverFor("sim-" + r.name);
      return {
        name: r.name, pop: r.pop, totalFmt: fmtOku(r.total), perCap: r.perCap,
        ref: r.ref, refLabel: r.refLabel,
        bg: r.self ? "#E3F4FC" : "transparent", fw: r.self ? "700" : "500",
        badge: r.self ? "このまち" : "",
        segs: r.mix.map((p, i) => ({ w: String(p), sw: sHover == null || sHover === i ? cols[i] : fadeColor(cols[i]), tipMove: mkSegTip(`${r.name}・${SIM_MIX_COLS[i]}`, p + "%", "歳出構成比", cols[i], { key: "sim-" + r.name, idx: i }) })),
      };
    }),
    simLegend: SIM_MIX_COLS.map((n, i) => ({ name: n, sw: [D.PALETTE[0], D.PALETTE[1], D.PALETTE[2], D.PALETTE[4], "#C6D2DA"][i] })),
    similarEvidence: SIMILAR_EVIDENCE.map((ev: any) => ({
      ...ev,
      open: () => openViewer({
        url: ev.localUrl, title: ev.title, sub: ev.thumb,
        originUrl: "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html", archiveUrl: ev.url,
      }),
    })),
    uncollected: D.UNCOLLECTED,
    requestListUrl: D.REQUEST_LIST_URL,
    sourcesRows: SOURCES.map((row: any) => ({
      ...row,
      open: row.localUrl
        ? () => openViewer({ url: row.localUrl, title: row.title, sub: row.type, originUrl: row.originUrl, archiveUrl: row.url })
        : null,
    })),
    themeCards, ...themeVals,
    compTabs, compRows,
    // 前年ラベル。R2 の前年（令和元年度）は「6月補正後予算額」との比較なので基準を明示する
    compPrevLabel:
      `令和${Number(budget.fy.slice(1)) - 1 === 1 ? "元" : Number(budget.fy.slice(1)) - 1}年度` +
      (budget.prevBasis === "補正後" ? "（補正後予算額）" : ""),
    compCurLabel: `令和${budget.fy.slice(1)}年度`,
    // 前年度列の資料注記（R6 選択時:「※令和5年度当初予算額は6月補正の政策的予算を含む」）
    compPrevNote: budget.prevNote ? `※資料注記: ${budget.prevNote}` : "",
    compPrevTotal: fmtV(compPrevSum), compCurTotal: fmtV(compCurSum), compSub: subV(compCurSum),
    compTotalDelta: (compDelta >= 0 ? "+" : "−") + fmtV(Math.abs(compDelta)),
    compTotalPct: (compDelta >= 0 ? "+" : "−") + ((Math.abs(compDelta) / compPrevSum) * 100).toFixed(1) + "%",
    compTotalFg: compDelta >= 0 ? "#0F76A3" : "#C25400",
  };

  return <BudgetTraceView v={v} />;
}
