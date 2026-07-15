// パスベースのURLルーティング（各画面に共有可能な ASCII の実URLを割り当てる）。
//
//   /                          トップ（全国マップ）
//   /yamanashi                 市区町村選択（screen=muni）
//   /yamanashi/kofu            ダッシュボード（screen=dash）
//   /yamanashi/kofu/compare    前年比較（画面スラグを1つ足す）
//   /nagano/202011             decision 自治体（ローマ字未整備なので団体コード）
//   /sources                   データ出典（自治体スコープ外のときのみ）
//   /coverage                  データ整備状況（自治体×データセットの ○×・エビデンス保管・ライセンス）
//   /roadmap                   進捗と計画（プロジェクト全体の現在地とロードマップ）
//
// マルチバイト（日本語）のパスは共有時に %XX へエンコードされ視認性が悪いため、
// 都道府県は定型ローマ字、収録済み自治体（full/budget）は手当てしたローマ字スラグ、
// 残りの decision 自治体は団体コード（読みデータが無いため）を使う。
// 画面内の細かな状態（表示年度・ドリル位置・単位）はクエリに載せてパスを短く保つ。
import { PREF_CODES } from "./decision-index.gen";
import { MUNI_BUDGETS, BUDGET_MUNIS } from "./munibudgets.gen";

export interface RouteState {
  screen: string;
  pref: string | null;
  muni: string | null;
  muniCode?: string;
  budgetFy?: string;
  reportNo?: string;
  drillSide: string;
  drillPath: string[];
  theme: string | null;
  execFy?: string;
  execSide?: string;
  compSide?: string;
  simAxis?: string;
  simVs?: string[];
  unit?: string;
}

// 都道府県名 → ローマ字スラグ（47・ヘボン式・長音記号なし）
const PREF_ROMAJI: Record<string, string> = {
  北海道: "hokkaido", 青森県: "aomori", 岩手県: "iwate", 宮城県: "miyagi", 秋田県: "akita",
  山形県: "yamagata", 福島県: "fukushima", 茨城県: "ibaraki", 栃木県: "tochigi", 群馬県: "gunma",
  埼玉県: "saitama", 千葉県: "chiba", 東京都: "tokyo", 神奈川県: "kanagawa", 新潟県: "niigata",
  富山県: "toyama", 石川県: "ishikawa", 福井県: "fukui", 山梨県: "yamanashi", 長野県: "nagano",
  岐阜県: "gifu", 静岡県: "shizuoka", 愛知県: "aichi", 三重県: "mie", 滋賀県: "shiga",
  京都府: "kyoto", 大阪府: "osaka", 兵庫県: "hyogo", 奈良県: "nara", 和歌山県: "wakayama",
  鳥取県: "tottori", 島根県: "shimane", 岡山県: "okayama", 広島県: "hiroshima", 山口県: "yamaguchi",
  徳島県: "tokushima", 香川県: "kagawa", 愛媛県: "ehime", 高知県: "kochi", 福岡県: "fukuoka",
  佐賀県: "saga", 長崎県: "nagasaki", 熊本県: "kumamoto", 大分県: "oita", 宮崎県: "miyazaki",
  鹿児島県: "kagoshima", 沖縄県: "okinawa",
};
const PREF_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(PREF_ROMAJI).map(([name, slug]) => [slug, name]),
);

// 収録済み自治体（full=甲府 + budget 12）の団体コード → ローマ字スラグ。
// 県エンティティ（山梨県の当初予算・190004）は市区町村選択 /yamanashi と衝突しないよう ken。
const MUNI_SLUGS: Record<string, string> = {
  "192015": "kofu", "192112": "fuefuki", "192023": "fujiyoshida", "192082": "minami-alps",
  "192091": "hokuto", "192066": "otsuki", "192040": "tsuru", "192139": "koshu",
  "194301": "fujikawaguchiko",
  "232076": "toyokawa", "352039": "yamaguchi", "222038": "numazu", "272191": "izumi",
  // 政令指定都市（2026-07-15）
  "141003": "yokohama", "231002": "nagoya", "011002": "sapporo",
  "401307": "fukuoka", "141305": "kawasaki", "271004": "osaka",
  "111007": "saitama",
  "341002": "hiroshima",
  "281000": "kobe",
  "261009": "kyoto",
  "401005": "kitakyushu",
  "121002": "chiba",
  "041009": "sendai",
  "271403": "sakai",
  "190004": "ken",
};

interface KnownMuni { code: string; name: string; pref: string; slug: string; }
const KNOWN_MUNIS: KnownMuni[] = (() => {
  const list: KnownMuni[] = [{ code: "192015", name: "甲府市", pref: "山梨県", slug: "kofu" }];
  for (const c of BUDGET_MUNIS) {
    const b = MUNI_BUDGETS[c];
    if (b && MUNI_SLUGS[c]) list.push({ code: c, name: b.muniName, pref: b.prefName, slug: MUNI_SLUGS[c]! });
  }
  return list;
})();

const PREF_NAMES = new Set(Object.keys(PREF_CODES));
const APP_SLUGS = new Set(["drill", "compare", "themes", "execution", "similar", "sources"]);
// 自治体スコープを持たない全体ページ（/sources /coverage /roadmap）
const GLOBAL_SLUGS = new Set(["sources", "coverage", "roadmap"]);

/** 自治体の URL セグメント（収録済み＝ローマ字スラグ、それ以外＝団体コード） */
function muniSegment(code: string | undefined, muni: string | null): string | null {
  if (code && MUNI_SLUGS[code]) return MUNI_SLUGS[code]!;
  if (code) return code; // decision 自治体は団体コード
  return muni; // コード未解決時は名前（decision 冷リンクの一時状態。通常は起きない）
}

/** pref 名 + muni セグメント → 収録済み自治体（full/budget）。無ければ null */
function knownByMuniSegment(prefName: string | null, seg: string): KnownMuni | undefined {
  if (!prefName) return undefined;
  return KNOWN_MUNIS.find((k) => k.pref === prefName && k.slug === seg);
}

const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

/** state → パス（+クエリ）。先頭 / つき。 */
export function stateToPath(t: RouteState): string {
  const seg: string[] = [];
  const q = new URLSearchParams();
  const prefSlug = t.pref ? PREF_ROMAJI[t.pref] : undefined;
  if (t.screen === "top") {
    // ルート
  } else if (t.screen === "muni") {
    if (prefSlug) seg.push(prefSlug);
  } else if (t.screen === "coverage" || t.screen === "roadmap") {
    seg.push(t.screen); // 常に全体ページ（自治体スコープを持たない）
  } else if (t.screen === "sources" && !t.muni) {
    seg.push("sources");
  } else {
    // 自治体スコープの画面（dash はスラグ無し）
    if (prefSlug) seg.push(prefSlug);
    const ms = muniSegment(t.muniCode, t.muni);
    if (ms) seg.push(ms);
    if (t.screen !== "dash") seg.push(t.screen);
  }
  if (t.budgetFy) q.set("fy", t.budgetFy);
  if (t.screen === "dash" && t.reportNo) q.set("rno", t.reportNo);
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
  if (t.screen === "similar") {
    // 比較軸と比較相手（団体コード）。共有すると同じ比較表が開く
    if (t.simAxis && t.simAxis !== "pop") q.set("axis", t.simAxis);
    if (t.simVs?.length) q.set("vs", t.simVs.join(","));
  }
  if (t.unit === "per") q.set("unit", "per");
  // ドリルパス（日本語）はクエリなので encodeURIComponent される。パスセグメントは ASCII。
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
  let muniCode: string | undefined;

  if (segments.length === 0) {
    screen = "top";
  } else if (segments.length === 1 && GLOBAL_SLUGS.has(segments[0]!)) {
    screen = segments[0]!;
  } else if (PREF_BY_SLUG[segments[0]!]) {
    pref = PREF_BY_SLUG[segments[0]!]!;
    if (segments.length === 1) {
      screen = "muni";
    } else {
      const seg1 = segments[1]!;
      const known = knownByMuniSegment(pref, seg1);
      if (known) {
        muni = known.name;
        muniCode = known.code;
      } else if (/^\d{6}$/.test(seg1)) {
        // decision 自治体は団体コード。名前は県シャード取得後に解決する
        muniCode = seg1;
      } else {
        // 未知の自治体セグメント → 市区町村選択に丸める
        screen = "muni";
      }
      if (muni !== null || muniCode) {
        const slug = segments[2];
        screen = slug && APP_SLUGS.has(slug) ? slug : "dash";
      }
    }
  } else if (PREF_NAMES.has(segments[0]!)) {
    // 後方互換: 旧・日本語パス（/山梨県/甲府市…）も受ける
    pref = segments[0]!;
    if (segments.length === 1) {
      screen = "muni";
    } else {
      muni = segments[1]!;
      const k = KNOWN_MUNIS.find((x) => x.pref === pref && x.name === muni);
      muniCode = k?.code;
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
    muniCode,
    budgetFy: g("fy") ?? undefined,
    reportNo: g("rno") ?? undefined,
    drillSide: g("side") ?? "exp",
    drillPath: g("path")?.split("/").filter(Boolean) ?? [],
    theme: g("theme") ?? null,
    execFy: g("efy") ?? undefined,
    execSide: g("eside") ?? "exp",
    compSide: g("cside") ?? "exp",
    simAxis: g("axis") ?? undefined,
    // 団体コード（6桁）以外は捨てる。未指定なら軸のサジェストが既定で載る
    simVs: g("vs")?.split(",").filter((c) => /^\d{6}$/.test(c)) ?? undefined,
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
  coverage: "データ整備状況",
  roadmap: "進捗と計画",
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
