"use client";

import React from "react";
import { CountUpNum } from "./ui";
import * as D from "@/client/lib/data";
import BudgetTraceView from "./BudgetTraceView";

const {
  KOFU, YAMANASHI, PROJECTS, PROJ_SETSU, THEMES, GLOSS, SIM_MIX_COLS, SIMILAR,
  SOURCES, BASIC_INFO, HOSEI, YOY_EXP, YOY_REV, HIST, YAMANASHI_MUNIS, REGIONS,
  fmtOku, pctOf, fmtPerCap, hash, fadeColor, donutBg, synthChildren, setPalette,
} = D;

/* eslint-disable @typescript-eslint/no-explicit-any */

interface St {
  screen: string;
  variantOverride: string | null;
  pref: string | null;
  muni: string | null;
  drillSide: string;
  drillPath: string[];
  theme: string | null;
  project: string | null;
  histYear: string;
  fy: string;
  fyOpen: boolean;
  fyX: number;
  fyY: number;
  searchQ: string;
  prevScreen: string;
  unit?: string;
  stage?: string;
  compSide?: string;
  tip?: any;
}

const DEFAULT_ST: St = {
  screen: "top", variantOverride: null, pref: null, muni: null,
  drillSide: "exp", drillPath: [], theme: null, project: null, histYear: "R7",
  fy: "R8", fyOpen: false, fyX: 0, fyY: 0,
  searchQ: "", prevScreen: "dash",
  unit: "total", stage: "tousho", compSide: "exp", tip: null,
};

export default function BudgetTrace() {
  const [st, setStRaw] = React.useState<St>(DEFAULT_ST);
  const tipTimer = React.useRef<any>(null);

  const setSt = (patch: Partial<St>) => setStRaw((s) => ({ ...s, ...patch }));
  const nav = (patch: Partial<St>) => {
    setSt(patch);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

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

  const getMuniData = () => (st.muni === "山梨県全体" ? YAMANASHI : KOFU);

  // ========================================================================
  // renderVals 相当
  // ========================================================================
  const s = st;
  const props = { colorMode: "カラフル", showEvidence: true };
  const variant = "c"; // トップページはC案（スプリット）固定
  const showEvidence = props.showEvidence ?? true;
  const mapColorMode = props.colorMode ?? "カラフル";
  setPalette(mapColorMode);
  const screen = s.screen;
  const isApp = ["dash", "basic", "drill", "compare", "themes", "project", "history", "similar", "sources"].includes(screen);
  const data = getMuniData();
  const accent = "#1798D0";

  // --- 会計年度（令和8 / 7 / 6） ---
  const fy = s.fy || "R8";
  const isCurFy = fy === "R8";
  const fyScale = isCurFy ? 1 : HIST[fy].scale;
  const FY_NUM: Record<string, number> = { R8: 8, R7: 7, R6: 6 };
  const FY_YOY: Record<string, string> = { R7: "+9.0%", R6: "+1.9%" };
  const scaleNode = (it: any): any => ({ ...it, v: Math.round(it.v * fyScale * 10) / 10, children: it.children ? it.children.map(scaleNode) : it.children });
  const fyToggle = (e: any) => { const r = e.currentTarget.getBoundingClientRect(); setSt({ fyOpen: !s.fyOpen, fyX: r.right, fyY: r.bottom + 6 }); };
  const fyOptions = [
    { y: "R8", label: "令和8年度", note: "当初予算・執行中" },
    { y: "R7", label: "令和7年度", note: "決算見込" },
    { y: "R6", label: "令和6年度", note: "決算" },
  ].map((o) => ({ label: o.label, note: o.note, fw: fy === o.y ? "700" : "500", bg: fy === o.y ? "#E3F4FC" : "transparent", pick: () => setSt({ fy: o.y, fyOpen: false }) }));

  // --- 表示単位（総額 / 1人あたり） ---
  const unit = s.unit || "total";
  const isPer = unit === "per";
  const fmtV = (oku: number) => (isPer ? fmtPerCap(oku, data.pop) + "/人" : fmtOku(oku));
  const subV = (oku: number) => (isPer ? "総額 " + fmtOku(oku) : fmtPerCap(oku, data.pop) + "/人");
  const unitTabs = [
    { label: "総額", pick: () => setSt({ unit: "total" }), bg: !isPer ? "#14181C" : "#FFFFFF", fg: !isPer ? "#F7FAFC" : "#5C6B77" },
    { label: "1人あたり", pick: () => setSt({ unit: "per" }), bg: isPer ? "#14181C" : "#FFFFFF", fg: isPer ? "#F7FAFC" : "#5C6B77" },
  ];

  // --- 予算の変遷（当初 → 補正 → 現額） ---
  const hasStages = data === KOFU && isCurFy;
  const stage = hasStages ? s.stage || "tousho" : "tousho";
  const isGenkei = hasStages && stage === "genkei";
  const stAdj = (items: any[], adjMap: Record<string, number>) =>
    isGenkei ? items.map((it) => { const a = adjMap[it.name]; return a ? { ...it, v: Math.round((it.v + a) * 10) / 10 } : it; }) : items;
  const revItems = stAdj(data.revenue, HOSEI.rev).map(scaleNode);
  const expItems = stAdj(data.expenditure, HOSEI.exp).map(scaleNode);
  const totalNow = Math.round((isGenkei ? data.total + HOSEI.total : data.total) * fyScale * 10) / 10;
  const yearLabel = isCurFy ? (isGenkei ? "令和8年度 予算現額（第1号補正後）" : data.year) : HIST[fy].title;
  const yearDocBase = isCurFy ? data.year : `令和${FY_NUM[fy]}年度 当初予算`;
  const pickStage = (stg: string) => () => setSt({ stage: stg });
  const stageTabs = [
    { label: "当初予算", pick: pickStage("tousho"), bg: stage === "tousho" ? "#14181C" : "#FFFFFF", fg: stage === "tousho" ? "#F7FAFC" : "#5C6B77" },
    { label: "補正後（現額）", pick: pickStage("genkei"), bg: stage === "genkei" ? "#14181C" : "#FFFFFF", fg: stage === "genkei" ? "#F7FAFC" : "#5C6B77" },
  ];
  const stageFlow = [
    { t: "当初予算", amt: <CountUpNum value={data.total} fmt={fmtOku} />, sub: "令和8年3月24日 議決", pick: pickStage("tousho"), bd: stage === "tousho" ? "#1798D0" : "#DFE7EC", bg: stage === "tousho" ? "#E3F4FC" : "#F7FAFC", labelFg: "#5C6B77", amtFg: "#14181C", sep: "inline" },
    { t: HOSEI.label + "（追加）", amt: <CountUpNum value={HOSEI.total} fmt={(v) => "+" + fmtOku(v)} />, sub: HOSEI.decidedShort + " — " + HOSEI.desc, pick: pickStage("genkei"), bd: "#DFE7EC", bg: "#F7FAFC", labelFg: "#5C6B77", amtFg: "#0F76A3", sep: "inline" },
    { t: "予算現額", amt: <CountUpNum value={data.total + HOSEI.total} fmt={fmtOku} />, sub: "現在の予算総額（執行の分母）", pick: pickStage("genkei"), bd: stage === "genkei" ? "#1798D0" : "#DFE7EC", bg: stage === "genkei" ? "#E3F4FC" : "#F7FAFC", labelFg: "#5C6B77", amtFg: "#14181C", sep: "none" },
  ];

  const openPref = (prefName: string) => () => nav({ screen: "muni", pref: prefName });
  const openMuni = (muniName: string) => () => nav({ screen: "dash", muni: muniName, drillPath: [], theme: null });

  // --- ホバー強調（強調セグメント以外を淡色化） ---
  const hoverFor = (key: string) => (s.tip && s.tip.hover && s.tip.hover.key === key ? s.tip.hover.idx : null);
  const hoverOnFn = (key: string, idx: number) => () => setSt({ tip: { hover: { key, idx } } });

  // --- council ---
  const council = data.council;
  const cHover = hoverFor("council");
  const councilParties = council.parties.map((p, i) => ({
    name: p.name, seats: String(p.seats), w: ((p.seats / council.seats) * 100).toFixed(1),
    sw: cHover == null || cHover === i ? D.PALETTE[i % D.PALETTE.length] : fadeColor(D.PALETTE[i % D.PALETTE.length]), stance: p.stance,
    stanceFg: p.stance.includes("反対") ? "#A85A45" : p.stance.includes("賛成") ? "#0F76A3" : "#5C6B77",
    tipMove: mkSegTip(p.name, p.seats + "議席", ((p.seats / council.seats) * 100).toFixed(1) + "%", D.PALETTE[i % D.PALETTE.length], { key: "council", idx: i }),
  }));
  const councilVote = [
    { label: "賛成", n: String(council.vote.approve), fg: "#0F76A3" },
    { label: "反対", n: String(council.vote.oppose), fg: "#A85A45" },
    { label: "退席・欠席", n: String(council.vote.absent), fg: "#5C6B77" },
  ];

  // --- muni select ---
  const prefName = s.pref || "山梨県";
  const prefAvail = prefName === "山梨県";
  const muniList = (prefAvail ? YAMANASHI_MUNIS : []).map((m) => {
    const avail = m === "甲府市";
    return {
      name: m, badge: avail ? "収録済 R8予算+執行" : "準備中", badgeFg: avail ? accent : "#9DACB7",
      bg: avail ? "#FFFFFF" : "#F0F5F8", bd: avail ? accent : "#DFE7EC",
      fg: avail ? "#14181C" : "#8494A0", cursor: avail ? "pointer" : "default",
      open: avail ? openMuni(m) : () => {},
    };
  });

  // --- dashboard panels ---
  const mkLegend = (items: any[], side: string) => {
    const hv = hoverFor(side);
    return items.map((it, i) => ({
      name: it.name, amtFmt: fmtV(it.v), pctFmt: pctOf(it.v, totalNow),
      sw: hv == null || hv === i ? D.PALETTE[i % D.PALETTE.length] : fadeColor(D.PALETTE[i % D.PALETTE.length]),
      hoverOn: hoverOnFn(side, i), hoverOff: hideTip,
      open: () => nav({ screen: "drill", drillSide: side, drillPath: [it.name] }),
    }));
  };
  const dashPanels = [
    { title: "歳入（どこから来るお金か）", donutBg: donutBg(revItems, hoverFor("rev")), centerLabel: "歳入合計", centerAmt: <CountUpNum value={totalNow} fmt={fmtV} />, legend: mkLegend(revItems, "rev"), openDrill: () => nav({ screen: "drill", drillSide: "rev", drillPath: [] }), tipMove: mkDonutTip(revItems, totalNow, data.pop, "rev"), gloss: mkGloss("歳入") },
    { title: "歳出（なにに使うお金か）", donutBg: donutBg(expItems, hoverFor("exp")), centerLabel: "歳出合計", centerAmt: <CountUpNum value={totalNow} fmt={fmtV} />, legend: mkLegend(expItems, "exp"), openDrill: () => nav({ screen: "drill", drillSide: "exp", drillPath: [] }), tipMove: mkDonutTip(expItems, totalNow, data.pop, "exp"), gloss: mkGloss("歳出") },
  ];

  const projOf = (id: string) => PROJECTS.find((p) => p.id === id)!;
  const pPast = (p: any) => (isCurFy ? null : (p.past || []).find((x: any) => x.y === fy));
  const pBudget = (p: any): number => { const pe = pPast(p); return pe ? pe.b : Math.round(p.budget * fyScale * 10) / 10; };
  const pSpent = (p: any): number => { const pe = pPast(p); return pe ? pe.e : Math.round(pBudget(p) * (((HIST[fy] && HIST[fy].rates[p.kan]) as number) || 0.94) * 10) / 10; };
  const themeTotal = (t: any) => { const seen: Record<string, number> = {}; return t.ids.reduce((a: number, id: string) => { if (seen[id]) return a; seen[id] = 1; return a + (isCurFy ? projOf(id).budget : pBudget(projOf(id))); }, 0); };
  const openTheme = (t: any) => () => nav({ screen: "themes", theme: t.name });
  const openProject = (p: any) => () => nav({ screen: "project", project: p.id, prevScreen: screen });

  const themeStrip = THEMES.slice(0, 4).map((t) => ({ name: t.name, totalFmt: fmtV(themeTotal(t)), sub: subV(themeTotal(t)), count: String(t.ids.length), open: openTheme(t) }));
  const effBudget = (p: any): number => (isCurFy ? (isGenkei && p.hosei ? Math.round((p.budget + p.hosei.delta) * 10) / 10 : p.budget) : pBudget(p));
  const rateOf = (p: any) => (isCurFy ? (p.spent / effBudget(p)) * 100 : (pSpent(p) / pBudget(p)) * 100);
  const featured = ["p1", "p4", "p5"].map((id) => { const p = projOf(id); return { name: p.name, kanPath: `${p.kan} › ${p.ko}`, budgetFmt: fmtV(effBudget(p)), sub: subV(effBudget(p)), rateFmt: rateOf(p).toFixed(1) + "%", barW: rateOf(p).toFixed(1), open: openProject(p) }; });

  // --- drill ---
  const side = s.drillSide;
  const rootItems = side === "rev" ? revItems : expItems;
  const levelNames = side === "rev" ? ["税目・区分", "内訳", "内訳", "内訳"] : ["款", "項", "目", "節"];
  let nodeItems: any[] = rootItems; let nodeTotal = totalNow; let nodeName = side === "rev" ? "歳入合計" : "歳出合計";
  const pathNodes: any[] = [];
  s.drillPath.forEach((nm, dep) => {
    const found = nodeItems.find((n) => n.name === nm);
    if (!found) return;
    pathNodes.push(found);
    nodeName = found.name; nodeTotal = found.v;
    nodeItems = found.children || synthChildren(found, dep + 1);
  });
  const depth = pathNodes.length;
  const isProjLevel = side === "exp" && depth >= 4;
  const mokuProjects = side === "exp" && s.drillPath.length >= 3 ? PROJECTS.filter((p) => p.kan === s.drillPath[0] && [p.ko, p.moku].includes(s.drillPath[2])) : [];
  const setsuProjects = (nm: string) => mokuProjects.filter((p) => PROJ_SETSU[p.id] && PROJ_SETSU[p.id][nm]).map((p) => ({ name: p.name, v: Math.round(effBudget(p) * PROJ_SETSU[p.id][nm] * 100) / 100, share: PROJ_SETSU[p.id][nm], proj: p }));
  if (isProjLevel) {
    nodeName = s.drillPath[3];
    nodeItems = setsuProjects(nodeName);
    nodeTotal = nodeItems.reduce((a, b) => a + b.v, 0) || 1;
  }
  const canDrillDeeper = (nm: string) => depth < 3 || (depth === 3 && side === "exp" && setsuProjects(nm).length > 0);
  const drillCrumbs: any[] = [{ label: side === "rev" ? "歳入" : "歳出", jump: () => setSt({ drillPath: [] }), bg: depth === 0 ? "#14181C" : "transparent", fg: depth === 0 ? "#F7FAFC" : "#5C6B77", fw: depth === 0 ? "700" : "500", sep: s.drillPath.length ? "inline" : "none" }];
  s.drillPath.forEach((nm, i) => {
    const last = i === s.drillPath.length - 1;
    drillCrumbs.push({ label: nm, jump: () => setSt({ drillPath: s.drillPath.slice(0, i + 1) }), bg: last ? "#14181C" : "transparent", fg: last ? "#F7FAFC" : "#5C6B77", fw: last ? "700" : "500", sep: last ? "none" : "inline" });
  });
  const dHover = hoverFor("drill");
  const drillRows = nodeItems.map((it, i) => {
    const clickable = isProjLevel ? true : canDrillDeeper(it.name);
    return {
      name: it.name, amtFmt: fmtV(it.v),
      sub: isProjLevel ? `事業予算の${Math.round(it.share * 100)}%を配分` : subV(it.v),
      pctFmt: pctOf(it.v, nodeTotal), barW: ((it.v / (nodeItems[0].v || 1)) * 100).toFixed(1),
      sw: dHover == null || dHover === i ? D.PALETTE[i % D.PALETTE.length] : fadeColor(D.PALETTE[i % D.PALETTE.length]),
      hoverOn: hoverOnFn("drill", i), hoverOff: hideTip,
      cursor: clickable ? "pointer" : "default", arrow: clickable ? "›" : "",
      open: clickable ? (isProjLevel ? openProject(it.proj) : () => setSt({ drillPath: [...s.drillPath, it.name] })) : () => {},
    };
  });
  const related = side === "exp" && s.muni !== "山梨県全体" ? PROJECTS.filter((p) => (depth === 0 ? false : [p.kan, p.ko, p.moku].includes(nodeName))) : [];
  const drillRelated = related.map((p) => ({ name: p.name, themes: p.themes.join(" / "), budgetFmt: fmtV(effBudget(p)), rateFmt: rateOf(p).toFixed(1) + "%", open: openProject(p) }));
  const synthNote = pathNodes.some((n) => n.synth) || nodeItems.some((n) => n.synth);
  const drillEvidence = isProjLevel
    ? `「${nodeName}」に予算を配分している事業 ${nodeItems.length}件（節×事業の配分率はダミー）。事業をクリックすると契約・支出先・KPI・一次資料へ。`
    : `${yearDocBase.replace(" ", "")}書 「${nodeName}」 該当ページ${synthNote ? "（この階層はダミー生成値）" : ""}`;
  const drillSideTabs = [
    { label: "歳出", pick: () => setSt({ drillSide: "exp", drillPath: [] }), bg: side === "exp" ? "#14181C" : "#FFFFFF", fg: side === "exp" ? "#F7FAFC" : "#5C6B77" },
    { label: "歳入", pick: () => setSt({ drillSide: "rev", drillPath: [] }), bg: side === "rev" ? "#14181C" : "#FFFFFF", fg: side === "rev" ? "#F7FAFC" : "#5C6B77" },
  ];

  // --- themes ---
  const themeCards = THEMES.map((t) => ({ name: t.name, totalFmt: fmtV(themeTotal(t)), sub: subV(themeTotal(t)), count: String(t.ids.length), open: openTheme(t), bg: s.theme === t.name ? "#E3F4FC" : "#FFFFFF", bd: s.theme === t.name ? accent : "#DFE7EC" }));
  const curTheme = THEMES.find((t) => t.name === s.theme);
  let themeVals: any = { hasTheme: false, themeName: "", themeIntent: "", themeTotalFmt: "", themeCount: "", themeKanChips: [], themeProjects: [], themePer: "", themeSub: "" };
  if (curTheme) {
    const ps = [...new Set(curTheme.ids)].map(projOf);
    const kanAgg: Record<string, number> = {};
    ps.forEach((p) => { kanAgg[p.kan] = (kanAgg[p.kan] || 0) + p.budget; });
    const kanIdx = (nm: string) => Math.max(0, data.expenditure.findIndex((k) => k.name === nm));
    themeVals = {
      hasTheme: true, themeName: curTheme.name, themeIntent: curTheme.intent,
      themeTotalFmt: fmtV(themeTotal(curTheme)), themeSub: subV(themeTotal(curTheme)), themeCount: String(ps.length),
      themePer: fmtPerCap(themeTotal(curTheme), data.pop),
      themeKanChips: Object.entries(kanAgg).map(([nm, v]) => ({ name: nm, amtFmt: fmtV(v), sw: D.PALETTE[kanIdx(nm) % D.PALETTE.length], open: () => nav({ screen: "drill", drillSide: "exp", drillPath: [nm] }) })),
      themeProjects: ps.map((p) => ({ name: p.name, summary: p.summary, kanPath: `${p.kan}›${p.ko}›${p.moku}`, budgetFmt: fmtV(effBudget(p)), sub: subV(effBudget(p)), rateFmt: rateOf(p).toFixed(1) + "%", barW: rateOf(p).toFixed(1), open: openProject(p) })),
    };
  }

  // --- project ---
  const proj = PROJECTS.find((p) => p.id === s.project) || PROJECTS[0];
  const pr = rateOf(proj);
  const projQuarters = proj.plan.map((pl, i) => {
    const act = isCurFy ? proj.actual[i] : Math.round(pl * rateOf(proj)) / 100;
    const has = act != null;
    return { label: `Q${i + 1}`, planH: Math.round(pl * 1.15), actH: has ? Math.max(3, Math.round(act * 1.15)) : Math.round(pl * 1.15), actBg: has ? accent : "transparent", actBorder: has ? "none" : "1.5px dashed #9DACB7", actLabel: has ? act.toFixed(1) + "%" : "—" };
  });
  const projVals: any = {
    projName: proj.name, projStatus: isCurFy ? "令和8年度 執行中（第1四半期時点）" : HIST[fy].title,
    projThemes: proj.themes.map((nm) => ({ name: nm, open: () => nav({ screen: "themes", theme: nm }) })),
    projKanPath: `${proj.kan} › ${proj.ko} › ${proj.moku}`,
    projKanOpen: () => nav({ screen: "drill", drillSide: "exp", drillPath: [proj.kan, proj.ko, proj.moku].filter((x, i, a) => a.indexOf(x) === i) }),
    projDept: proj.dept, projPeriod: proj.period, projPurpose: proj.purpose, projDesc: proj.desc,
    projBudgetLabel: isGenkei && proj.hosei ? "予算現額（補正後）" : "予算現額（当初）",
    projBudgetFmt: fmtV(effBudget(proj)), projBudgetSub: subV(effBudget(proj)), projSpentFmt: fmtV(isCurFy ? proj.spent : pSpent(proj)), projRateFmt: pr.toFixed(1) + "%", projBarW: pr.toFixed(1),
    projHoseiShow: !!(hasStages && proj.hosei),
    projHoseiText: proj.hosei ? `${HOSEI.label} +${fmtOku(proj.hosei.delta)}（${HOSEI.decidedShort}）— ${proj.hosei.reason}` : "",
    projHoseiAfter: proj.hosei ? `当初 ${fmtOku(proj.budget)} → 現額 ${fmtOku(Math.round((proj.budget + proj.hosei.delta) * 10) / 10)}` : "",
    projQuarters,
    projContracts: proj.contracts.map((c) => ({ to: c.to, desc: c.desc, method: c.method, amtFmt: fmtV(isCurFy ? c.amt : Math.round(c.amt * fyScale * 100) / 100), bid: c.bid || "" })),
    projKpis: (proj.kpis || []).map((k) => ({ name: k.n, target: k.t, actual: k.a, status: k.ok ? "達成" : "未達", stFg: k.ok ? "#0F76A3" : "#C25400", stBg: k.ok ? "#E3F4FC" : "#FBEDE3" })),
    projEvidence: proj.evidence,
    projPast: proj.past.map((py) => ({ year: py.y, budgetFmt: fmtV(py.b), execFmt: fmtV(py.e), rateFmt: ((py.e / py.b) * 100).toFixed(1) + "%", barW: ((py.e / py.b) * 100).toFixed(1) })),
  };

  // --- history ---
  const hist = HIST[s.histYear];
  const histRows = KOFU.expenditure.map((k, i) => {
    const budget = k.v * hist.scale;
    const rate = hist.rates[k.name] ?? 0.94;
    const spent = budget * rate;
    return { name: k.name, sw: D.PALETTE[i % D.PALETTE.length], budgetFmt: fmtV(budget), spentFmt: fmtV(spent), rateFmt: (rate * 100).toFixed(1) + "%", barW: (rate * 100).toFixed(1), unusedFmt: fmtV(budget - spent), open: () => nav({ screen: "drill", drillSide: "exp", drillPath: [k.name] }) };
  });
  const hBudget = KOFU.expenditure.reduce((a, k) => a + k.v * hist.scale, 0);
  const hSpent = KOFU.expenditure.reduce((a, k) => a + k.v * hist.scale * (hist.rates[k.name] ?? 0.94), 0);
  const histTabs = ["R7", "R6"].map((y) => ({ label: HIST[y].title, pick: () => setSt({ histYear: y }), bg: s.histYear === y ? "#14181C" : "#FFFFFF", fg: s.histYear === y ? "#F7FAFC" : "#5C6B77" }));
  const histEvidence = [
    { title: `${hist.title.replace(/（.*/, "")} 歳入歳出決算書`, type: "PDF", source: "city.kofu.yamanashi.jp", thumb: "決算書 総括表 スクリーンショット" },
    { title: "主要な施策の成果報告書", type: "PDF", source: "city.kofu.yamanashi.jp", thumb: "成果報告書 目次ページ" },
    { title: "監査委員 決算審査意見書", type: "PDF", source: "city.kofu.yamanashi.jp", thumb: "意見書 表紙" },
  ];

  // --- compare (前年比較) ---
  const compSide = s.compSide || "exp";
  const compItems = (compSide === "rev" ? data.revenue : data.expenditure).map((it) => ({ name: it.name, v: Math.round(it.v * fyScale * 10) / 10 }));
  const compCurSum = Math.round(data.total * fyScale * 10) / 10;
  const compGrowth = compSide === "rev" ? YOY_REV : YOY_EXP;
  const gOf = (nm: string) => compGrowth[nm] ?? ((hash(nm) % 90) - 40) / 10;
  const compMax = Math.max(...compItems.map((it) => it.v));
  let compPrevSum = 0;
  const compRows = compItems.map((it, i) => {
    const g = gOf(it.name);
    const prev = it.v / (1 + g / 100);
    compPrevSum += prev;
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

  // --- header nav ---
  const navDefs: [string, string, () => void][] = [
    ["ダッシュボード", "dash", () => nav({ screen: "dash" })],
    ["基本情報", "basic", () => nav({ screen: "basic" })],
    ["款・項・目・節", "drill", () => nav({ screen: "drill" })],
    ["前年比較", "compare", () => nav({ screen: "compare" })],
    ["政策テーマ", "themes", () => nav({ screen: "themes" })],
    ["過年度実績", "history", () => nav({ screen: "history" })],
    ["類似自治体", "similar", () => nav({ screen: "similar" })],
  ];
  const navList = data === KOFU ? navDefs : navDefs.filter((d) => d[1] !== "similar");
  const navTabs = navList.map(([label, key, open]) => ({ label, open, fg: screen === key ? "#14181C" : "#5C6B77", fw: screen === key ? "700" : "500", ul: screen === key ? accent : "transparent" }));

  // --- 基本情報 ---
  const binfo = BASIC_INFO[data.name] || BASIC_INFO["甲府市"];
  const popMax = Math.max(...binfo.popTrend.map((p) => p[1]));
  const popMin = Math.min(...binfo.popTrend.map((p) => p[1]));
  const popH = (v: number) => (popMax === popMin ? 100 : Math.round(35 + ((v - popMin) / (popMax - popMin)) * 65));
  const basicVals: any = {
    basicTitle: `${data.name}の基本情報`,
    basicSub: binfo.sub,
    basicFacts: binfo.facts,
    basicPopTrend: binfo.popTrend.map(([y, v], i, arr) => ({ y, v: v.toFixed(1) + "万", h: popH(v), bg: i === arr.length - 1 ? accent : "#B8D9EA" })),
    basicPopStats: binfo.popStats,
    basicIndustry: binfo.industry.map((it, i) => ({ name: it.name, share: it.share.toFixed(1) + "%", w: it.share, sw: D.PALETTE[i % D.PALETTE.length] })),
    basicSpecialties: binfo.specialties.map((nm) => ({ name: nm })),
    basicLeaderTitle: binfo.leaderTitle,
    basicLeaders: binfo.leaders.map((l, i) => ({ ...l, fw: i === 0 ? "700" : "500" })),
    basicClimate: binfo.climate,
    basicClimateNote: binfo.climateNote,
    goBasic: () => nav({ screen: "basic" }),
    basicSummary: [
      { label: "総人口", v: binfo.facts[1].v },
      { label: "面積", v: binfo.facts[0].v },
      { label: "高齢化率", v: binfo.popStats[0].v },
      { label: binfo.leaderTitle.includes("知事") ? "知事" : "市長", v: binfo.leaders[0].name },
      { label: "特色ある産業", v: binfo.specialties.slice(0, 2).map((nm) => nm.split("（")[0]).join("・") },
    ],
  };

  const v: any = {
    isTop: screen === "top", isMuni: screen === "muni", isApp,
    isDash: screen === "dash", isDrill: screen === "drill", isThemes: screen === "themes", isCompare: screen === "compare",
    isBasic: screen === "basic", ...basicVals,
    isProject: screen === "project", isHistory: screen === "history",
    showEvidence,
    onPrefSelect: (name: string) => nav({ screen: "muni", pref: name }),
    mapColorMode,
    onMuniSelect: (pfName: string, muniName: string | null) => {
      if (pfName === "山梨県" && muniName === null) nav({ screen: "dash", pref: pfName, muni: "山梨県全体", drillPath: [], theme: null });
      else if (pfName === "山梨県" && muniName === "甲府市") nav({ screen: "dash", pref: pfName, muni: "甲府市", drillPath: [], theme: null });
      else nav({ screen: "muni", pref: pfName });
    },
    councilBody: council.body, councilSeats: String(council.seats), councilDecided: council.decided,
    councilParties, councilVote,
    searchQ: s.searchQ,
    openKofuLink: (e: any) => { if (e && e.preventDefault) e.preventDefault(); nav({ screen: "dash", muni: "甲府市", pref: "山梨県" }); },
    goTop: () => nav({ screen: "top" }), goMuniSelect: () => nav({ screen: "muni" }),
    muniPrefName: prefName,
    prefAllOpen: prefAvail ? openMuni("山梨県全体") : () => {},
    prefAllBg: prefAvail ? "#14181C" : "#F0F5F8", prefAllFg: prefAvail ? "#F7FAFC" : "#8494A0", prefAllBd: prefAvail ? "#14181C" : "#DFE7EC",
    prefAllBadge: prefAvail ? "収録済" : "準備中",
    prefAllNote: prefAvail ? "県の一般会計 約5,360億円を表示" : "この都道府県のデータは順次収録予定です",
    muniList,
    crumbPref: s.pref || "山梨県", crumbMuni: s.muni || "甲府市", yearLabel,
    fyToggle, fyClose: () => setSt({ fyOpen: false }), fyOpen: !!s.fyOpen, fyX: s.fyX || 0, fyY: s.fyY || 0, fyOptions,
    hasStages, stageTabs, stageFlow,
    navTabs,
    dashTitle: `${data.name}の予算`, totalFmt: fmtV(totalNow),
    totalFmtAnim: <CountUpNum value={totalNow} fmt={fmtV} />,
    yoy: isCurFy ? data.yoy : FY_YOY[fy],
    dashPanels, themeStrip, featured,
    goThemes: () => nav({ screen: "themes" }), goHistory: () => nav({ screen: "history" }),
    drillSideTabs, drillCrumbs, drillLevelLabel: isProjLevel ? "事業" : levelNames[Math.min(depth, 3)],
    drillTitle: nodeName, drillTotalFmt: fmtOku(nodeTotal), drillDonutBg: donutBg(nodeItems, hoverFor("drill")),
    drillRows, hasRelated: drillRelated.length > 0, drillRelated, drillEvidence,
    drillTipMove: mkDonutTip(nodeItems, nodeTotal, data.pop, "drill"),
    drillSub: subV(nodeTotal),
    tipShow: !!(s.tip && s.tip.title), tipX: s.tip ? s.tip.x : 0, tipY: s.tip ? s.tip.y : 0,
    tipTitle: s.tip ? s.tip.title : "", tipSw: s.tip ? s.tip.sw : "#14181C",
    tipAmtLine: s.tip && s.tip.amt ? `${s.tip.amt}（${s.tip.pct}）` : "",
    tipDesc: s.tip ? s.tip.desc || "" : "",
    hideTip,
    gKanmoku: mkGloss("款・項・目・節"),
    gGenkei: mkGloss("予算現額"), gRate: mkGloss("執行率"), gFuyou: mkGloss("不用額"),
    perCapitaLine: isPer
      ? `総額 ${fmtOku(totalNow)} ・ 1世帯あたり ${((totalNow * 1e8) / data.households / 1e4).toFixed(1)}万円`
      : `市民1人あたり ${((totalNow * 1e8) / data.pop / 1e4).toFixed(1)}万円 ・ 1世帯あたり ${((totalNow * 1e8) / data.households / 1e4).toFixed(1)}万円`,
    unitTabs,
    isSimilar: screen === "similar", isSources: screen === "sources",
    goSources: () => nav({ screen: "sources" }), goDash: () => nav({ screen: "dash" }),
    similarRows: SIMILAR.map((r) => {
      const cols = [D.PALETTE[0], D.PALETTE[1], D.PALETTE[2], D.PALETTE[4], "#C6D2DA"];
      const sHover = hoverFor("sim-" + r.name);
      return {
        name: r.name, pop: r.pop, totalFmt: fmtOku(r.total), perCap: r.perCap,
        bg: r.self ? "#E3F4FC" : "transparent", fw: r.self ? "700" : "500",
        badge: r.self ? "このまち" : "",
        segs: r.mix.map((p, i) => ({ w: String(p), sw: sHover == null || sHover === i ? cols[i] : fadeColor(cols[i]), tipMove: mkSegTip(`${r.name}・${SIM_MIX_COLS[i]}`, p + "%", "歳出構成比", cols[i], { key: "sim-" + r.name, idx: i }) })),
      };
    }),
    simLegend: SIM_MIX_COLS.map((n, i) => ({ name: n, sw: [D.PALETTE[0], D.PALETTE[1], D.PALETTE[2], D.PALETTE[4], "#C6D2DA"][i] })),
    sourcesRows: SOURCES,
    themeCards, ...themeVals,
    ...projVals, goBack: () => nav({ screen: s.prevScreen || "dash" }),
    compTabs, compRows,
    compPrevLabel: `令和${FY_NUM[fy] - 1}年度`, compCurLabel: `令和${FY_NUM[fy]}年度`,
    compPrevTotal: fmtV(compPrevSum), compCurTotal: fmtV(compCurSum), compSub: subV(compCurSum),
    compTotalDelta: (compDelta >= 0 ? "+" : "−") + fmtV(Math.abs(compDelta)),
    compTotalPct: (compDelta >= 0 ? "+" : "−") + ((Math.abs(compDelta) / compPrevSum) * 100).toFixed(1) + "%",
    compTotalFg: compDelta >= 0 ? "#0F76A3" : "#C25400",
    histTabs, histYearTitle: hist.title, histOverallRate: ((hSpent / hBudget) * 100).toFixed(1) + "%",
    histOverallBarW: ((hSpent / hBudget) * 100).toFixed(1), histBudgetFmt: fmtV(hBudget), histSpentFmt: fmtV(hSpent),
    histSub: subV(hSpent),
    histRows, histEvidence,
  };

  return <BudgetTraceView v={v} />;
}
