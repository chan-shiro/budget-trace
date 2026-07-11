"use client";

// 日本地図 — 都道府県: geolonia/japanese-prefectures (SVG, GFDL)
//            市区町村: smartnews-smri/japan-topography (国土数値情報ベース GeoJSON)
// 地域クリック→ズーム→都道府県クリック→市区町村ズームイン→市区町村選択
// 形状データはリポジトリ内 public/mapdata に同梱（オフライン動作）。
import React from "react";

const SVG_URL = "/mapdata/map-full.svg";
const MUNI_URL = (code: number) =>
  `/mapdata/municipality/N03-21_${String(code).padStart(2, "0")}_210101.json`;
const ACCENT = "#1798D0";

const PREFS: Record<number, string> = {
  1:"北海道",2:"青森県",3:"岩手県",4:"宮城県",5:"秋田県",6:"山形県",7:"福島県",
  8:"茨城県",9:"栃木県",10:"群馬県",11:"埼玉県",12:"千葉県",13:"東京都",14:"神奈川県",
  15:"新潟県",16:"富山県",17:"石川県",18:"福井県",19:"山梨県",20:"長野県",21:"岐阜県",22:"静岡県",23:"愛知県",
  24:"三重県",25:"滋賀県",26:"京都府",27:"大阪府",28:"兵庫県",29:"奈良県",30:"和歌山県",
  31:"鳥取県",32:"島根県",33:"岡山県",34:"広島県",35:"山口県",
  36:"徳島県",37:"香川県",38:"愛媛県",39:"高知県",
  40:"福岡県",41:"佐賀県",42:"長崎県",43:"熊本県",44:"大分県",45:"宮崎県",46:"鹿児島県",47:"沖縄県",
};
// [name, from, to, 青系, カラフル(Okabe-Itoの淡色)]
const REGION_DEFS = [
  { name:"北海道", from:1, to:1, blue:"#CFE3F0", vivid:"#9CCEF0" },
  { name:"東北", from:2, to:7, blue:"#DEEBF4", vivid:"#97D8BF" },
  { name:"関東", from:8, to:14, blue:"#C5DDEE", vivid:"#F5CE8E" },
  { name:"中部", from:15, to:23, blue:"#D7E9F3", vivid:"#9FC2E8" },
  { name:"近畿", from:24, to:30, blue:"#CBE2F0", vivid:"#F0BFDA" },
  { name:"中国", from:31, to:35, blue:"#E2EFF6", vivid:"#F5B894" },
  { name:"四国", from:36, to:39, blue:"#D2E6F2", vivid:"#EFE699" },
  { name:"九州", from:40, to:46, blue:"#DAEAF4", vivid:"#C9BCE6" },
  { name:"沖縄", from:47, to:47, blue:"#D5E8F2", vivid:"#8FD8D3" },
];
const MUNI_FILLS_VIVID = ["#F5CE8E","#97D8BF","#9FC2E8","#F0BFDA","#EFE699","#F5B894","#C9BCE6","#9CCEF0"];
const MUNI_FILLS_BLUE = ["#D7E9F3","#C5DDEE","#E2EFF6","#CBE2F0","#DEEBF4","#D2E6F2"];
const AVAILABLE_PREF: Record<string, boolean> = { "山梨県": true };
const AVAILABLE_MUNI: Record<string, boolean> = { "山梨県:甲府市": true };

/* eslint-disable @typescript-eslint/no-explicit-any */

function regionOf(code: number) { return REGION_DEFS.find((r) => code >= r.from && code <= r.to)!; }
function shade(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (ch: number) => Math.max(0, Math.min(255, Math.round(ch * f)));
  return "#" + ((c(n >> 16) << 16) | (c((n >> 8) & 255) << 8) | c(n & 255)).toString(16).padStart(6, "0");
}

// GeoJSON → { munis, vw, vh, inset, areas }
function buildMunis(geo: any, prefName: string) {
  const feats = (geo.features || []).filter((f: any) => f.geometry);
  const eachRing = (geom: any, fn: (ring: any) => void) => {
    const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.type === "MultiPolygon" ? geom.coordinates : [];
    polys.forEach((poly: any) => poly.forEach((ring: any) => fn(ring)));
  };
  const recs: any[] = [];
  const meta: Record<string, any> = {};
  feats.forEach((f: any) => {
    const p = f.properties || {};
    const code = p.N03_007 || p.N03_004;
    const name = p.N03_004 || p.N03_003 || "不明";
    const city = p.N03_003 || "";
    if (!meta[code]) meta[code] = { name, city, sub: p.N03_002 || "", minLon: 999, maxLon: -999, minLat: 999, maxLat: -999 };
    eachRing(f.geometry, (ring: any) => {
      let minLon = 999, maxLon = -999, minLat = 999, maxLat = -999;
      ring.forEach(([lon, lat]: [number, number]) => {
        if (lon < minLon) minLon = lon; if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
      });
      const mm = meta[code];
      mm.minLon = Math.min(mm.minLon, minLon); mm.maxLon = Math.max(mm.maxLon, maxLon);
      mm.minLat = Math.min(mm.minLat, minLat); mm.maxLat = Math.max(mm.maxLat, maxLat);
      recs.push({ code, ring, bb: { minLon, maxLon, minLat, maxLat } });
    });
  });
  const W = 800, H = 620;
  const islandAreaOf = (code: any, bb: any) => {
    const mm = meta[code];
    if (prefName === "新潟県" && (mm.name === "佐渡市" || mm.name === "粟島浦村")) return mm.name;
    if (prefName === "島根県" && mm.city === "隠岐郡") return "隠岐諸島";
    if (prefName === "長崎県" && ["対馬市", "壱岐市", "五島市", "新上五島町", "小値賀町"].indexOf(mm.name) >= 0) return mm.name;
    const latLim = prefName === "東京都" ? 35.0 : prefName === "鹿児島県" ? 28.6 : null;
    if (latLim !== null) {
      const spans = mm.minLat < latLim && mm.maxLat >= latLim;
      const ref = spans && bb ? bb : mm;
      if (ref.maxLat < latLim) return prefName === "東京都" ? (mm.name === "小笠原村" ? "小笠原諸島" : "伊豆諸島") : "奄美群島";
      return null;
    }
    if (prefName === "沖縄県") {
      const spans = (mm.minLon < 127.0 && mm.maxLon >= 127.0) || (mm.minLon <= 131.0 && mm.maxLon > 131.0);
      const ref = spans && bb ? bb : mm;
      if (ref.maxLon < 127.0 || ref.minLon > 131.0) return "離島";
    }
    return null;
  };
  const mainAreaOf = (code: any) => {
    const mm = meta[code];
    if (prefName === "東京都" && /区$/.test(mm.name)) return "特別区（23区）";
    if (mm.city && /市$/.test(mm.city) && /区$/.test(mm.name)) return mm.city;
    if (prefName === "北海道" && mm.sub) return mm.sub.replace(/総合振興局$|振興局$/, "");
    return null;
  };
  const islandRecs: any[] = [], mainRecs: any[] = [];
  recs.forEach((r) => (islandAreaOf(r.code, r.bb) ? islandRecs : mainRecs).push(r));

  const byCode: Record<string, any> = {};
  const projectInto = (list: any[], x0: number, y0: number, w: number, h: number, pad: number) => {
    let minLon = 999, maxLon = -999, minLat = 999, maxLat = -999;
    list.forEach((r) => {
      minLon = Math.min(minLon, r.bb.minLon); maxLon = Math.max(maxLon, r.bb.maxLon);
      minLat = Math.min(minLat, r.bb.minLat); maxLat = Math.max(maxLat, r.bb.maxLat);
    });
    const kx = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180);
    const s = Math.min((w - 2 * pad) / Math.max((maxLon - minLon) * kx, 1e-6), (h - 2 * pad) / Math.max(maxLat - minLat, 1e-6));
    const ox = x0 + (w - (maxLon - minLon) * kx * s) / 2, oy = y0 + (h - (maxLat - minLat) * s) / 2;
    const Xn = (lon: number) => ox + (lon - minLon) * kx * s;
    const Yn = (lat: number) => oy + (maxLat - lat) * s;
    list.forEach((rc) => {
      const mm = meta[rc.code];
      if (!byCode[rc.code]) {
        const full = mm.city && /市$/.test(mm.city) && !mm.name.includes(mm.city) ? mm.city + mm.name : mm.name;
        byCode[rc.code] = { code: rc.code, name: full, short: mm.name, d: "", maxA: 0, lx: 0, ly: 0, bx0: 1e9, by0: 1e9, bx1: -1e9, by1: -1e9 };
      }
      const m = byCode[rc.code];
      const pts = rc.ring.map(([lon, lat]: [number, number]) => [Xn(lon), Yn(lat)]);
      m.d += "M" + pts.map((p: number[]) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L") + "Z";
      pts.forEach(([x, y]: number[]) => {
        if (x < m.bx0) m.bx0 = x; if (x > m.bx1) m.bx1 = x;
        if (y < m.by0) m.by0 = y; if (y > m.by1) m.by1 = y;
      });
      let a = 0, cx = 0, cy = 0;
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % pts.length];
        const cross = x1 * y2 - x2 * y1;
        a += cross; cx += (x1 + x2) * cross; cy += (y1 + y2) * cross;
      }
      const area = Math.abs(a / 2);
      if (area > m.maxA && a !== 0) {
        m.maxA = area;
        m.lx = cx / (3 * a);
        m.ly = cy / (3 * a);
      }
    });
  };

  let inset: any = null;
  const insetAreaNames: string[] = [];
  if (islandRecs.length) {
    const groups: Record<string, any[]> = {};
    islandRecs.forEach((r) => { (groups[r.code] = groups[r.code] || []).push(r); });
    const keys = Object.keys(groups).sort();
    const iw = 150, headH = 24, cellH = (H - headH) / keys.length;
    const degA = (r: any) => (r.bb.maxLon - r.bb.minLon) * (r.bb.maxLat - r.bb.minLat);
    const ctr = (r: any) => [(r.bb.minLon + r.bb.maxLon) / 2, (r.bb.minLat + r.bb.maxLat) / 2];
    keys.forEach((k, i) => {
      const g = groups[k];
      const big = g.reduce((a, b) => (degA(b) > degA(a) ? b : a));
      const [bx, by] = ctr(big);
      const near = g.filter((r) => { const [x, y] = ctr(r); return Math.abs(x - bx) < 0.8 && Math.abs(y - by) < 0.8; });
      projectInto(near, 6, headH + i * cellH + 3, iw - 12, cellH - 6, 8);
    });
    inset = { w: iw, rows: keys.length, headH, cellH };
  }
  const mx = inset ? inset.w + 6 : 0;
  projectInto(mainRecs, mx, 0, W - mx, H, 24);

  const munis = Object.values(byCode).sort((a: any, b: any) => String(a.code).localeCompare(String(b.code)));
  const areasByName: Record<string, any> = {};
  munis.forEach((m: any, i: number) => {
    m.area = mainAreaOf(m.code);
    m.avail = !!AVAILABLE_MUNI[prefName + ":" + m.name];
    m.idx = i;
    m.fs = Math.max(9.5, Math.min(15, Math.sqrt(m.maxA) / 8));
    if (m.area) {
      const a = (areasByName[m.area] = areasByName[m.area] || { name: m.area, x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9, isInset: insetAreaNames.indexOf(m.area) >= 0 });
      a.x0 = Math.min(a.x0, m.bx0); a.y0 = Math.min(a.y0, m.by0);
      a.x1 = Math.max(a.x1, m.bx1); a.y1 = Math.max(a.y1, m.by1);
    }
  });
  const areas = Object.values(areasByName).map((a: any) => ({ name: a.name, x: a.x0, y: a.y0, w: a.x1 - a.x0, h: a.y1 - a.y0, isInset: a.isInset }));
  return { munis, vw: W, vh: H, inset, areas };
}

export interface JapanMapProps {
  onSelect?: (prefName: string) => void;
  onSelectMuni?: (prefName: string, muniName: string | null) => void;
  colorMode?: string;
  maxWidth?: number;
}

export default function JapanMap({ onSelect, onSelectMuni, colorMode, maxWidth }: JapanMapProps) {
  const vivid = colorMode !== "青系";
  const boxRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<any>(null);
  const zoomRef = React.useRef<any>(null);
  const nodesRef = React.useRef<any[]>([]);
  const muniCache = React.useRef<Record<string, any>>({});
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = React.useState("");
  const [region, setRegion] = React.useState<string | null>(null);
  const [pref, setPref] = React.useState<any>(null);
  const [muniView, setMuniView] = React.useState<any>(null);
  const [muniZoom, setMuniZoom] = React.useState<any>(null);
  const [hover, setHover] = React.useState<any>(null);
  const [zoomT, setZoomT] = React.useState({ tx: 0, ty: 0, s: 1 });
  const isTouch = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const armedRef = React.useRef<any>(null);
  const [muniAnim, setMuniAnim] = React.useState<"in" | "out">("in");
  const outTimerRef = React.useRef<any>(null);

  const selMuni = (prefName: string, muniName: string | null) => {
    if (onSelectMuni) onSelectMuni(prefName, muniName);
    else if (onSelect) onSelect(prefName);
  };

  const paint = React.useCallback((reg: string | null, hov: any) => {
    nodesRef.current.forEach((n) => {
      const avail = AVAILABLE_PREF[n.name];
      const color = vivid ? n.vivid : n.blue;
      let fill, stroke = "#FFFFFF", sw = "0.8", op = 1;
      if (!reg) {
        fill = hov && hov.type === "region" && hov.name === n.region ? shade(color, 0.88) : color;
        if (avail) fill = ACCENT;
      } else if (n.region === reg) {
        fill = avail ? ACCENT : hov && hov.type === "pref" && hov.code === n.code ? shade(color, 0.85) : shade(color, 1.06);
        stroke = "#8899A5"; sw = "1";
        if (avail && hov && hov.type === "pref" && hov.code === n.code) fill = "#0F76A3";
      } else {
        fill = "#E9EEF2"; op = 0.45;
      }
      n.el.style.fill = fill; n.el.style.stroke = stroke;
      n.el.style.strokeWidth = sw; n.el.style.opacity = String(op);
      n.el.style.transition = "opacity .4s ease";
    });
  }, [vivid]);

  React.useEffect(() => {
    let dead = false;
    fetch(SVG_URL)
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.text(); })
      .then((text) => {
        if (dead || !boxRef.current) return;
        const holder = document.createElement("div");
        holder.innerHTML = text;
        const svg = holder.querySelector("svg");
        if (!svg) throw new Error("no svg");
        svg.removeAttribute("width"); svg.removeAttribute("height");
        svg.style.width = "100%"; svg.style.height = "auto"; svg.style.display = "block";
        svg.querySelectorAll("script").forEach((el) => el.remove());
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        while (svg.firstChild) g.appendChild(svg.firstChild);
        svg.appendChild(g);
        g.style.transformOrigin = "0 0";
        g.style.transition = "transform .75s cubic-bezier(.22,1,.36,1)";
        svgRef.current = svg; zoomRef.current = g;
        const nodes: any[] = [];
        g.querySelectorAll("[data-code]").forEach((el: any) => {
          const code = parseInt(el.getAttribute("data-code"), 10);
          if (!code || !PREFS[code]) return;
          const rg = regionOf(code);
          nodes.push({ el, code, name: PREFS[code], region: rg.name, blue: rg.blue, vivid: rg.vivid });
          el.style.cursor = "pointer";
          el.querySelectorAll("path,polygon,rect").forEach((p: any) => p.setAttribute("vector-effect", "non-scaling-stroke"));
        });
        g.querySelectorAll(".boundary-line").forEach((el: any) => {
          el.style.stroke = "#C6D2DA"; el.style.strokeDasharray = "4 4"; el.style.fill = "none";
        });
        nodesRef.current = nodes;
        boxRef.current.appendChild(svg);
        const vb0 = svg.viewBox.baseVal;
        const sr = svg.getBoundingClientRect();
        const toUser = (r: any) => ({
          x: vb0.x + (r.x - sr.x) / sr.width * vb0.width,
          y: vb0.y + (r.y - sr.y) / sr.height * vb0.height,
          w: r.width / sr.width * vb0.width,
          h: r.height / sr.height * vb0.height,
        });
        const svgNS = "http://www.w3.org/2000/svg";
        nodes.forEach((n) => {
          n.ubox = toUser(n.el.getBoundingClientRect());
          let best: any = null, bestA = 0;
          n.el.querySelectorAll("path,polygon").forEach((p: any) => {
            if (p.tagName.toLowerCase() === "polygon") {
              const r = p.getBoundingClientRect(); const a = r.width * r.height;
              if (a > bestA) { bestA = a; best = r; }
              return;
            }
            const subs = (p.getAttribute("d") || "").split(/(?=M)/).filter((s: string) => s.trim());
            if (subs.length < 2) {
              const r = p.getBoundingClientRect(); const a = r.width * r.height;
              if (a > bestA) { bestA = a; best = r; }
              return;
            }
            subs.forEach((sd: string) => {
              const tmp = document.createElementNS(svgNS, "path");
              tmp.setAttribute("d", sd); tmp.setAttribute("fill", "none"); tmp.setAttribute("stroke", "none");
              p.parentNode.appendChild(tmp);
              const r = tmp.getBoundingClientRect(); const a = r.width * r.height;
              if (a > bestA) { bestA = a; best = r; }
              tmp.remove();
            });
          });
          n.lbox = best ? toUser(best) : n.ubox;
        });
        paint(null, null);
        setStatus("ready");
      })
      .catch(() => { if (!dead) setStatus("error"); });
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => { if (status === "ready") paint(region, hover); }, [status, region, hover, paint]);

  const applyZoom = (bb: any, pad?: number) => {
    const svg = svgRef.current, g = zoomRef.current;
    if (!svg || !g) return;
    if (!bb) { g.style.transform = "none"; setZoomT({ tx: 0, ty: 0, s: 1 }); return; }
    const vb = svg.viewBox.baseVal;
    const s = Math.min(vb.width / bb.w, vb.height / bb.h) * (pad || 0.78);
    const tx = vb.x + vb.width / 2 - s * (bb.x + bb.w / 2);
    const ty = vb.y + vb.height / 2 - s * (bb.y + bb.h / 2);
    g.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    setZoomT({ tx, ty, s });
  };
  const regionBox = (regName: string) => {
    let bb: any = null;
    nodesRef.current.forEach((n) => {
      if (n.region !== regName || !n.ubox) return;
      const b = n.lbox || n.ubox;
      if (!bb) bb = { x: b.x, y: b.y, x2: b.x + b.w, y2: b.y + b.h };
      else { bb.x = Math.min(bb.x, b.x); bb.y = Math.min(bb.y, b.y); bb.x2 = Math.max(bb.x2, b.x + b.w); bb.y2 = Math.max(bb.y2, b.y + b.h); }
    });
    return bb ? { x: bb.x, y: bb.y, w: bb.x2 - bb.x, h: bb.y2 - bb.y } : null;
  };
  const leaveMuni = () => {
    if (muniView && typeof muniView === "object") {
      setMuniAnim("out");
      if (outTimerRef.current) clearTimeout(outTimerRef.current);
      outTimerRef.current = setTimeout(() => {
        outTimerRef.current = null;
        setPref(null); setMuniView(null); setMuniAnim("in"); setMuniZoom(null);
      }, 400);
    } else {
      setPref(null); setMuniView(null); setMuniZoom(null);
    }
  };
  const zoomToRegion = (regName: string | null) => {
    if (!regName) { applyZoom(null); setRegion(null); leaveMuni(); setHover(null); return; }
    applyZoom(regionBox(regName), 0.78);
    setRegion(regName); leaveMuni(); setHover(null);
  };

  const enterPref = (n: any) => {
    armedRef.current = null;
    if (outTimerRef.current) { clearTimeout(outTimerRef.current); outTimerRef.current = null; }
    setMuniAnim("in");
    setMuniZoom(null);
    setPref({ code: n.code, name: n.name, region: n.region });
    setRegion(n.region); setHover(null); setMuniView("loading");
    applyZoom(n.lbox || n.ubox, 0.9);
    const load = muniCache.current[n.code]
      ? Promise.resolve(muniCache.current[n.code])
      : fetch(MUNI_URL(n.code)).then((r) => { if (!r.ok) throw new Error("http"); return r.json(); })
          .then((geo) => { const b = buildMunis(geo, n.name); muniCache.current[n.code] = b; return b; });
    Promise.all([load, new Promise((res) => setTimeout(res, 720))])
      .then(([b]) => setMuniView((v: any) => (v === "loading" ? b : v)))
      .catch(() => setMuniView((v: any) => (v === "loading" ? "error" : v)));
  };
  const backToRegion = () => {
    const reg = pref ? pref.region : region;
    leaveMuni(); setHover(null);
    applyZoom(regionBox(reg), 0.78); setRegion(reg);
  };

  const findNode = (e: any) => {
    const t = e.target.closest && e.target.closest("[data-code]");
    return t ? nodesRef.current.find((n) => n.el === t) || null : null;
  };
  const handleClick = (e: any) => {
    if (pref) return;
    const n = findNode(e);
    if (!n) return;
    if (!region) zoomToRegion(n.region);
    else if (n.region === region) enterPref(n);
    else zoomToRegion(n.region);
  };
  const handleMove = (e: any) => {
    if (pref) return;
    const n = findNode(e);
    if (!n) { setHover(null); return; }
    setHover(region && n.region === region ? { type: "pref", name: n.name, code: n.code } : { type: "region", name: n.region });
  };

  const chipBase: React.CSSProperties = {
    border: "1px solid #C6D2DA", background: "#FFFFFF", color: "#3A4750", borderRadius: "999px",
    padding: isTouch ? "10px 16px" : "5px 13px", fontSize: isTouch ? "13px" : "12.5px", cursor: "pointer", fontFamily: "'IBM Plex Sans JP', sans-serif", fontWeight: 500,
  };
  const accentChip: React.CSSProperties = { ...chipBase, border: "1px solid " + ACCENT, color: ACCENT, fontWeight: 700 };

  const q = query.trim();
  let results: any[] = [];
  if (q) {
    Object.keys(AVAILABLE_MUNI).forEach((k) => {
      const [pn, mn] = k.split(":");
      if (mn.includes(q) || pn.includes(q)) results.push({ type: "muni", pref: pn, name: mn, avail: true });
    });
    nodesRef.current.forEach((n) => {
      if (n.name.includes(q)) results.push({ type: "pref", name: n.name, node: n, avail: !!AVAILABLE_PREF[n.name] });
    });
    Object.entries(muniCache.current).forEach(([code, b]: [string, any]) => {
      const pn = PREFS[parseInt(code, 10)];
      b.munis.forEach((m: any) => {
        if (m.name.includes(q) && !AVAILABLE_MUNI[pn + ":" + m.name]) results.push({ type: "muni", pref: pn, name: m.name, avail: false });
      });
    });
    const seen: Record<string, number> = {};
    results = results.filter((r) => { const k = r.type + ":" + (r.pref || "") + r.name; if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, 8);
  }
  const pickResult = (r: any) => {
    setQuery("");
    if (r.type === "pref") { if (r.node) enterPref(r.node); }
    else selMuni(r.pref, r.name);
  };

  const showMunis = pref && muniView && typeof muniView === "object";
  const muniLeaving = showMunis && muniAnim === "out";
  const muniFills = vivid ? MUNI_FILLS_VIVID : MUNI_FILLS_BLUE;
  const zs = muniZoom ? muniZoom.s : 1;
  const zoomMuniArea = (name: string) => {
    if (!showMunis) return;
    const a = (muniView.areas || []).find((x: any) => x.name === name);
    if (!a) return;
    const s = Math.min(muniView.vw / Math.max(a.w, 1), muniView.vh / Math.max(a.h, 1)) * 0.82;
    setMuniZoom({ name, s, tx: muniView.vw / 2 - s * (a.x + a.w / 2), ty: muniView.vh / 2 - s * (a.y + a.h / 2) });
    setHover(null); armedRef.current = null;
  };
  const needsAreaZoom = (m: any) => m.area && (!muniZoom || muniZoom.name !== m.area);

  let mapLabels: any = null;
  if (status === "ready" && (!pref || muniLeaving) && svgRef.current) {
    const vb = svgRef.current.viewBox.baseVal;
    const items: any[] = [];
    if (!region) {
      REGION_DEFS.forEach((r) => {
        const all = nodesRef.current.filter((n) => n.region === r.name && n.ubox);
        const cs = all.filter((n) => n.code !== 47 && n.code !== 13);
        const use = cs.length ? cs : all;
        if (!use.length) return;
        const cx = use.reduce((a, n) => a + (n.lbox || n.ubox).x + (n.lbox || n.ubox).w / 2, 0) / use.length;
        const cy = use.reduce((a, n) => a + (n.lbox || n.ubox).y + (n.lbox || n.ubox).h / 2, 0) / use.length;
        items.push({ key: "r" + r.name, name: r.name, cx, cy, hov: hover && hover.type === "region" && hover.name === r.name, base: 13.5 });
      });
    } else {
      const prefs = nodesRef.current.filter((n) => n.region === region && n.ubox);
      const maxA = Math.max(...prefs.map((n) => { const b = n.lbox || n.ubox; return b.w * b.h; }), 1);
      prefs.forEach((n) => {
        const b = n.lbox || n.ubox;
        const rel = Math.sqrt((b.w * b.h) / maxA);
        items.push({ key: "p" + n.code, name: n.name, cx: b.x + b.w / 2, cy: b.y + b.h / 2, hov: hover && hover.type === "pref" && hover.code === n.code, base: Math.max(10.5, Math.min(16, 8 + rel * 8)) });
      });
    }
    mapLabels = items.map((it) => {
      const x = (zoomT.tx + zoomT.s * it.cx - vb.x) / vb.width * 100;
      const y = (zoomT.ty + zoomT.s * it.cy - vb.y) / vb.height * 100;
      if (x < -5 || x > 105 || y < -5 || y > 105) return null;
      return (
        <span key={it.key} style={{
          position: "absolute", left: x + "%", top: y + "%", transform: "translate(-50%,-50%)",
          fontSize: it.hov ? 20 : it.base, fontWeight: it.hov ? 700 : 600, color: "#14181C",
          fontFamily: "'IBM Plex Sans JP', sans-serif", letterSpacing: "0.02em", whiteSpace: "nowrap",
          textShadow: "0 0 3px #FFFFFF, 0 0 6px #FFFFFF, 0 0 10px rgba(255,255,255,0.9)",
          pointerEvents: "none", zIndex: 3, animation: "jmFade .4s ease both",
          transition: "left .75s cubic-bezier(.22,1,.36,1), top .75s cubic-bezier(.22,1,.36,1), font-size .18s ease",
        }}>{it.name}</span>
      );
    });
  }

  let chips: any;
  if (pref) {
    chips = [
      <button key="all" style={AVAILABLE_PREF[pref.name] ? accentChip : chipBase} onClick={() => selMuni(pref.name, null)}>{pref.name}全体（都道府県レベル）</button>,
      ...(showMunis ? muniView.munis.map((m: any) => (
        <button key={m.code} style={m.avail ? accentChip : chipBase}
          onClick={() => selMuni(pref.name, m.name)}
          onMouseEnter={() => setHover({ type: "muni", name: m.name, code: m.code })}
          onMouseLeave={() => setHover(null)}>
          {m.name}{m.avail ? " ●" : ""}
        </button>)) : []),
    ];
  } else if (region) {
    chips = nodesRef.current.filter((n) => n.region === region).sort((a, b) => a.code - b.code).map((n) => (
      <button key={n.code} style={AVAILABLE_PREF[n.name] ? accentChip : chipBase}
        onClick={() => enterPref(n)}
        onMouseEnter={() => setHover({ type: "pref", name: n.name, code: n.code })}
        onMouseLeave={() => setHover(null)}>
        {n.name}{AVAILABLE_PREF[n.name] ? " ●" : ""}
      </button>));
  } else {
    chips = REGION_DEFS.map((r) => (
      <button key={r.name} style={chipBase}
        onClick={() => zoomToRegion(r.name)}
        onMouseEnter={() => setHover({ type: "region", name: r.name })}
        onMouseLeave={() => setHover(null)}>
        {r.name}
      </button>));
  }

  if (status === "error") {
    return (
      <div style={{ width: "100%", maxWidth: maxWidth || 820, margin: "0 auto" }}>
        <p style={{ fontSize: 13, color: "#5C6B77", margin: "0 0 12px" }}>地図データを読み込めませんでした。一覧から選択してください。</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {REGION_DEFS.map((r) => (
            <div key={r.name}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.14em", color: "#5C6B77", marginBottom: 6 }}>{r.name}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(PREFS).filter(([c]) => Number(c) >= r.from && Number(c) <= r.to).map(([c, nm]) => (
                  <button key={c} style={AVAILABLE_PREF[nm] ? accentChip : chipBase} onClick={() => onSelect && onSelect(nm)}>{nm}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: maxWidth || 820, margin: "0 auto" }}>
      <div style={{ position: "relative", zIndex: 5, marginBottom: 10 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="自治体名で検索（例：甲府、山梨）"
          style={{ width: "100%", boxSizing: "border-box", padding: "10px 16px", fontSize: isTouch ? 16 : 14, border: "1.5px solid #C6D2DA", borderRadius: 10, background: "#FFFFFF", color: "#14181C" }} />
        {q && (
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#FFFFFF", border: "1px solid #DFE7EC", borderRadius: 12, boxShadow: "0 8px 24px rgba(20,24,28,0.12)", overflow: "hidden" }}>
            {results.length === 0 && (
              <div style={{ padding: "12px 16px", fontSize: 13, color: "#5C6B77" }}>該当なし（市区町村名は、県を開くと検索対象に追加されます）</div>)}
            {results.map((r, i) => (
              <button key={i} onClick={() => pickResult(r)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, width: "100%", border: "none", borderTop: i ? "1px solid #ECF2F6" : "none", background: "none", padding: "10px 16px", fontSize: 14, cursor: "pointer", textAlign: "left", fontFamily: "'IBM Plex Sans JP', sans-serif", color: "#14181C" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F6F9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}>
                <span style={{ fontWeight: 600 }}>{r.name}<span style={{ fontWeight: 400, color: "#5C6B77", fontSize: 12, marginLeft: 8 }}>{r.type === "pref" ? "都道府県" : r.pref}</span></span>
                {r.avail && <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700, whiteSpace: "nowrap" }}>● 収録済</span>}
              </button>))}
          </div>)}
      </div>
      <div style={{ position: "relative" }}>
        <div ref={boxRef} onClick={handleClick} onMouseMove={handleMove} onMouseLeave={() => setHover(null)}
          style={{ width: "100%", minHeight: 320, overflow: "hidden", borderRadius: 16, opacity: showMunis && !muniLeaving ? 0 : 1, transition: "opacity .5s ease", pointerEvents: showMunis ? "none" : "auto" }}>
        </div>
        {mapLabels && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 16 }}>{mapLabels}</div>}

        {showMunis && (
          <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%", pointerEvents: muniLeaving ? "none" : "auto", animation: muniLeaving ? "jmMuniOut .4s ease both" : "jmMuniIn .65s cubic-bezier(.22,1,.36,1) both" }}>
            <svg viewBox={`0 0 ${muniView.vw} ${muniView.vh}`} style={{ width: "100%", height: "100%", display: "block" }}>
              <g style={{ transform: muniZoom ? `translate(${muniZoom.tx}px, ${muniZoom.ty}px) scale(${muniZoom.s})` : "none", transformOrigin: "0 0", transition: "transform .7s cubic-bezier(.22,1,.36,1)" }}>
                {muniView.munis.map((m: any) => (
                  <path key={m.code} d={m.d} vectorEffect="non-scaling-stroke"
                    fill={m.avail ? ACCENT : hover && ((hover.type === "muni" && hover.code === m.code) || (hover.type === "area" && hover.name === m.area)) ? shade(muniFills[m.idx % muniFills.length], 0.85) : muniFills[m.idx % muniFills.length]}
                    stroke="#FFFFFF" strokeWidth="1.4"
                    style={{ cursor: "pointer" }}
                    onClick={() => { if (needsAreaZoom(m)) zoomMuniArea(m.area); else selMuni(pref.name, m.name); }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      if (needsAreaZoom(m)) { zoomMuniArea(m.area); return; }
                      if (armedRef.current === m.code) { armedRef.current = null; selMuni(pref.name, m.name); }
                      else { armedRef.current = m.code; setHover({ type: "muni", name: m.name, code: m.code }); }
                    }}
                    onMouseEnter={() => setHover(needsAreaZoom(m) ? { type: "area", name: m.area } : { type: "muni", name: m.name, code: m.code })}
                    onMouseLeave={() => setHover(null)} />
                ))}
                {muniView.inset && !muniZoom && (
                  <g style={{ pointerEvents: "none" }}>
                    <line x1={muniView.inset.w} y1="0" x2={muniView.inset.w} y2={muniView.vh} stroke="#AAB8C2" strokeDasharray="5 5" strokeWidth="1.2" />
                    {Array.from({ length: muniView.inset.rows - 1 }, (_, i) => (
                      <line key={i} x1="4" y1={muniView.inset.headH + (i + 1) * muniView.inset.cellH} x2={muniView.inset.w - 4} y2={muniView.inset.headH + (i + 1) * muniView.inset.cellH} stroke="#DFE7EC" strokeDasharray="3 4" strokeWidth="1" />
                    ))}
                    <text x={muniView.inset.w / 2} y="15" textAnchor="middle" style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", fill: "#5C6B77" }}>島しょ部（縮尺別）</text>
                  </g>)}
                {[...muniView.munis].filter((m: any) => (muniZoom ? m.area === muniZoom.name : !m.area)).sort((a: any, b: any) => {
                  const hh = (m: any) => (hover && hover.type === "muni" && hover.code === m.code ? 1 : 0);
                  return hh(a) - hh(b);
                }).map((m: any) => {
                  const hov = hover && hover.type === "muni" && hover.code === m.code;
                  const base = muniZoom ? Math.max(m.fs, 11) : m.fs;
                  return (
                    <text key={"t" + m.code} x={m.lx} y={m.ly} textAnchor="middle" dominantBaseline="middle"
                      style={{
                        fontSize: (hov ? Math.max(base * 1.8, 20) : base) / zs, fontFamily: "'IBM Plex Sans JP', sans-serif",
                        fontWeight: hov || m.avail ? 700 : 600, letterSpacing: "0.02em",
                        fill: hov ? "#14181C" : m.avail ? "#FFFFFF" : "#3A4750",
                        paintOrder: "stroke",
                        stroke: m.avail && !hov ? "rgba(12,94,132,0.7)" : "rgba(255,255,255,0.92)", strokeWidth: (hov ? 3.5 : 2.5) / zs, strokeLinejoin: "round",
                        pointerEvents: "none", userSelect: "none",
                        transition: "font-size .18s ease, stroke-width .18s ease",
                      }}>{m.short || m.name}</text>
                  );
                })}
                {!muniZoom && (muniView.areas || []).map((a: any) => (
                  <text key={"a" + a.name} x={a.x + a.w / 2} y={a.y + a.h / 2} textAnchor="middle" dominantBaseline="middle"
                    style={{
                      fontSize: hover && hover.type === "area" && hover.name === a.name ? (a.isInset ? 14.5 : 18) : (a.isInset ? 12 : 15),
                      fontFamily: "'IBM Plex Sans JP', sans-serif", fontWeight: 700, letterSpacing: "0.03em",
                      fill: "#14181C", paintOrder: "stroke", stroke: "rgba(255,255,255,0.95)", strokeWidth: 3.5, strokeLinejoin: "round",
                      pointerEvents: "none", userSelect: "none", transition: "font-size .18s ease",
                    }}>{a.name}</text>
                ))}
              </g>
            </svg>
          </div>)}

        {(status === "loading" || muniView === "loading") && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#5C6B77", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", pointerEvents: "none" }}>
            LOADING…
          </div>)}
        {muniView === "error" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#5C6B77", fontSize: 13 }}>
            市区町村の形状データを読み込めませんでした。下の一覧から選択してください。
          </div>)}

        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", pointerEvents: "none" }}>
          {(region || pref) && (
            <button onClick={() => zoomToRegion(null)} style={{ pointerEvents: "auto", border: "1px solid #C6D2DA", background: "#FFFFFF", color: "#3A4750", borderRadius: 999, padding: "6px 15px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans JP', sans-serif", boxShadow: "0 2px 8px rgba(20,24,28,0.08)" }}>
              ← 全国
            </button>)}
          {pref && (
            <button onClick={backToRegion} style={{ pointerEvents: "auto", border: "1px solid #C6D2DA", background: "#FFFFFF", color: "#3A4750", borderRadius: 999, padding: "6px 15px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans JP', sans-serif", boxShadow: "0 2px 8px rgba(20,24,28,0.08)" }}>
              ← {pref.region}
            </button>)}
          {pref && muniZoom && (
            <button onClick={() => { setMuniZoom(null); setHover(null); }} style={{ pointerEvents: "auto", border: "1px solid #C6D2DA", background: "#FFFFFF", color: "#3A4750", borderRadius: 999, padding: "6px 15px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans JP', sans-serif", boxShadow: "0 2px 8px rgba(20,24,28,0.08)" }}>
              ← {pref.name}全体
            </button>)}
          {(pref || region || hover) && (
            <span style={{ background: "#14181C", color: "#F7FAFC", borderRadius: 999, padding: "6px 15px", fontSize: 12.5, fontWeight: 600 }}>
              {hover ? hover.name : pref ? pref.name + (muniZoom ? " — " + muniZoom.name : "") + " — 市区町村を選択" : region}
              {hover && (hover.type === "region" || hover.type === "area") ? " — クリックでズーム" : ""}
              {hover && hover.type === "pref" && AVAILABLE_PREF[hover.name] ? " — 収録済" : ""}
              {hover && hover.type === "muni" && pref && AVAILABLE_MUNI[pref.name + ":" + hover.name] ? " — 収録済" : ""}
              {isTouch && hover && hover.type === "muni" ? " — もう一度タップで選択" : ""}
            </span>)}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 16, maxHeight: isTouch ? 180 : 120, overflowY: "auto" }}>
        {status === "ready" ? chips : null}
      </div>
      <p style={{ textAlign: "center", fontSize: 11.5, color: "#9DACB7", margin: "12px 0 0" }}>
        都道府県形状：geolonia/japanese-prefectures（GFDL）・市区町村形状：国土数値情報（国土交通省）を加工した smartnews-smri/japan-topography ・ <span style={{ color: ACCENT, fontWeight: 600 }}>●</span> データ収録済
      </p>
    </div>
  );
}
