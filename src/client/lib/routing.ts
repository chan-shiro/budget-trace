// パスベースのURLルーティング（各画面に共有可能な実URLを割り当てる）。
//
//   /                       トップ（全国マップ）
//   /山梨県                  市区町村選択（screen=muni）
//   /山梨県/甲府市           ダッシュボード（screen=dash）
//   /山梨県/甲府市/compare   前年比較（画面スラグを1つ足す）
//   /sources                データ出典（自治体スコープ外のときのみ）
//
// 画面内の細かな状態（表示年度・ドリル位置・単位など）はクエリに載せてパスを短く保つ。
// full/budget 自治体は団体コードを静的に解決できるため即時描画（チラつき無し）。
// decision 自治体は名前だけをパスに載せ、県シャード取得後にコードを後解決する。
import { PREF_CODES } from "./decision-index.gen";
import { MUNI_BUDGETS, BUDGET_MUNIS } from "./munibudgets.gen";

export interface RouteState {
  screen: string;
  pref: string | null;
  muni: string | null;
  muniCode?: string;
  budgetFy?: string;
  drillSide: string;
  drillPath: string[];
  theme: string | null;
  execFy?: string;
  execSide?: string;
  compSide?: string;
  unit?: string;
}

const PREF_NAMES = new Set(Object.keys(PREF_CODES));
// パスに使う画面スラグ（ダッシュボードはスラグ無し＝自治体ルート）
const APP_SLUGS = new Set(["drill", "compare", "themes", "execution", "similar", "sources"]);

// 静的に団体コードを解決できる自治体（full=甲府 + budget 12市/県）。pref→(muni名→code)
const KNOWN: Record<string, Record<string, string>> = (() => {
  const m: Record<string, Record<string, string>> = {};
  const add = (pref: string, name: string, code: string) => {
    (m[pref] ??= {})[name] = code;
  };
  add("山梨県", "甲府市", "192015"); // full
  for (const c of BUDGET_MUNIS) {
    const b = MUNI_BUDGETS[c];
    if (b) add(b.prefName, b.muniName, b.muniCode);
  }
  return m;
})();

/** full/budget は静的に code 解決（即時）。decision はシャードから後解決するため undefined */
export function knownMuniCode(pref: string | null, muni: string | null): string | undefined {
  if (!pref || !muni) return undefined;
  return KNOWN[pref]?.[muni];
}

const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

/** state → パス（+クエリ）。先頭 / つき。 */
export function stateToPath(t: RouteState): string {
  const seg: string[] = [];
  const q = new URLSearchParams();
  if (t.screen === "top") {
    // ルート
  } else if (t.screen === "muni") {
    if (t.pref) seg.push(t.pref);
  } else if (t.screen === "sources" && !t.muni) {
    seg.push("sources");
  } else {
    // 自治体スコープの画面（dash はスラグ無し）
    if (t.pref) seg.push(t.pref);
    if (t.muni) seg.push(t.muni);
    if (t.screen !== "dash") seg.push(t.screen);
  }
  if (t.budgetFy) q.set("fy", t.budgetFy);
  if (t.screen === "drill") {
    if (t.drillSide && t.drillSide !== "exp") q.set("side", t.drillSide);
    if (t.drillPath.length) q.set("path", t.drillPath.join("/"));
  }
  if (t.screen === "themes" && t.theme) q.set("theme", t.theme);
  if (t.screen === "execution") {
    if (t.execFy) q.set("efy", t.execFy);
    if (t.execSide && t.execSide !== "exp") q.set("eside", t.execSide);
  }
  if (t.screen === "compare" && t.compSide && t.compSide !== "exp") q.set("cside", t.compSide);
  if (t.unit === "per") q.set("unit", "per");
  const path = "/" + seg.map(encodeURIComponent).join("/");
  const qs = q.toString();
  return qs ? `${path}?${qs}` : path;
}

/** パスセグメント + クエリ → state。未知パスは top に丸める。 */
export function pathToState(
  rawSegments: string[],
  query: Record<string, string | string[] | undefined> = {},
): RouteState {
  const segments = rawSegments
    .map((s) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    })
    .filter(Boolean);
  const g = (k: string) => first(query[k]);

  let screen = "top";
  let pref: string | null = null;
  let muni: string | null = null;

  if (segments.length === 0) {
    screen = "top";
  } else if (segments.length === 1 && segments[0] === "sources") {
    screen = "sources";
  } else if (PREF_NAMES.has(segments[0]!)) {
    pref = segments[0]!;
    if (segments.length === 1) {
      screen = "muni";
    } else {
      muni = segments[1]!;
      const slug = segments[2];
      screen = slug && APP_SLUGS.has(slug) ? slug : "dash";
    }
  } else {
    screen = "top"; // 未知のパス
  }

  return {
    screen,
    pref,
    muni,
    muniCode: knownMuniCode(pref, muni),
    budgetFy: g("fy") ?? undefined,
    drillSide: g("side") ?? "exp",
    drillPath: g("path")?.split("/").filter(Boolean) ?? [],
    theme: g("theme") ?? null,
    execFy: g("efy") ?? undefined,
    execSide: g("eside") ?? "exp",
    compSide: g("cside") ?? "exp",
    unit: g("unit") === "per" ? "per" : "total",
  };
}

/** location.pathname / location.search から state を作る（popstate 用） */
export function locationToState(pathname: string, search: string): RouteState {
  const segments = pathname.split("/").filter(Boolean);
  const query = Object.fromEntries(new URLSearchParams(search));
  return pathToState(segments, query);
}

const SCREEN_LABELS: Record<string, string> = {
  muni: "市区町村を選ぶ",
  dash: "予算ダッシュボード",
  drill: "款・項・目・節",
  compare: "前年比較",
  themes: "政策テーマ",
  execution: "予算執行状況",
  similar: "類似自治体との比較",
  sources: "データ出典・更新日",
};

/** 共有時のページタイトル（link preview 用） */
export function pageTitle(t: RouteState): string {
  const base = "予算トレース";
  if (t.screen === "top") return `${base} — 地方自治体の予算執行可視化`;
  const label = SCREEN_LABELS[t.screen] ?? "";
  if (t.screen === "muni" && t.pref) return `${t.pref}の市区町村 — ${base}`;
  if (t.muni) {
    const sub = t.screen === "dash" ? "予算" : label;
    return `${t.muni}の${sub} — ${base}`;
  }
  return label ? `${label} — ${base}` : base;
}
