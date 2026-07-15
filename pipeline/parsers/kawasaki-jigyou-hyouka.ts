// 川崎市 事務事業評価シート パーサ — 事業報告（成果）
//
// 予算 → 執行 → **成果** の鎖の最後。甲府は詳細票が公表サンプル5枚のみ（全量は情報公開請求）
// だったが、**川崎は572事業の全量がウェブ公開**されている。docs/data-sources.md §8c。
//
// 構成: 政策別に23 PDF。各ファイルは先頭が政策体系図で、以降は**1事業1シート**（可変長2〜3p）。
// シートの先頭ページに 事務事業コード・事務事業名・所属・予決算表・政策体系があり、
// 続くページに 達成度・方向性区分・成果指標がある。
//
// **予決算表は `-tsv` の座標で読む**（`-layout` のトークン順に頼らない）:
// R7 の決算額は 事業費A では空欄・人件費B では 0 なので、行ごとにトークン数が変わる
// （A=10 / B=11 / 総コスト=11）。**トークン数で列を対応させると静かにずれる**。
// 列境界はヘッダ（予算額 / 決算額 / 計画事業費）の x 座標から毎回導く（決め打ちしない）。
// 空セルは `-` トークンとして現れるので、欠測と 0 を区別できる。
//
// 検証は validate 側（総コスト = 事業費A + 人件費B / 財源内訳の和 = 事業費A / Σ事業数 = 572）。
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Word {
  x: number;
  xEnd: number;
  y: number;
  text: string;
}

/** pdftotext -tsv の1ページぶんを単語座標へ */
function pageWords(filePath: string, page: number): Word[] {
  const tsv = execFileSync(
    "pdftotext",
    ["-tsv", "-f", String(page), "-l", String(page), filePath, "-"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  const out: Word[] = [];
  for (const line of tsv.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12) continue;
    const text = (c[11] ?? "").trim();
    // ###FLOW###/###LINE###/###PARA### は pdftotext の構造マーカーで中身ではない
    if (!text || text.startsWith("###")) continue;
    const x = Number(c[6]);
    const y = Number(c[7]);
    const w = Number(c[8]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    out.push({ x, xEnd: x + (Number.isFinite(w) ? w : 0), y, text });
  }
  return out;
}

function pageText(filePath: string, from: number, to: number): string {
  return execFileSync(
    "pdftotext",
    ["-layout", "-f", String(from), "-l", String(to), filePath, "-"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
}

const compact = (s: string) => s.replace(/[\s　]/g, "");
const toNum = (s: string): number | null => {
  const t = s.replace(/,/g, "").replace(/△/, "-");
  if (!/^-?\d+(\.\d+)?$/.test(t)) return null;
  return Number(t);
};

/** 同じ行（y が近い）の単語を束ねる */
function rowsOf(words: Word[], tol = 3): Word[][] {
  const sorted = [...words].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: Word[][] = [];
  for (const w of sorted) {
    const last = rows[rows.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) <= tol) last.push(w);
    else rows.push([w]);
  }
  return rows.map((r) => r.sort((a, b) => a.x - b.x));
}

/** 予決算表の11列。ヘッダの x から導く（年度は R4..R7 の順・決め打ちしない） */
interface Col {
  fy: string;
  kind: "予算" | "決算" | "計画";
  x0: number;
  x1: number;
  isEstimate: boolean;
}

function costColumns(words: Word[], filename: string, page: number): Col[] {
  // 年度ヘッダ（R4年度…）の x を取り、各年度の直下にある 予算額/決算額/計画事業費 を割り当てる
  // **同じページに年度ヘッダが2組ある**（予決算表と、下方の成果指標の表）。全部を x でソートすると
  // R4,R5,R4,R6… と混ざり、年度が静かにずれる（実測: 予決算表 y=250.85 / 成果指標 y=731.63）。
  // 予決算表はページ上方に来るので、**最も上の年度ヘッダ行だけ**に絞る。
  const allFy = words.filter((w) => /^R\d年度$/.test(compact(w.text)));
  if (allFy.length < 2) return [];
  const topY = Math.min(...allFy.map((w) => w.y));
  const fyHeads = allFy.filter((w) => Math.abs(w.y - topY) <= 3).sort((a, b) => a.x - b.x);
  if (fyHeads.length < 2) return [];
  const headY = fyHeads[0]!.y;
  const subs = words
    .filter((w) => w.y > headY && w.y < headY + 22 && /^(予算額|決算額|決算額\(見込）|計画事業費)$/.test(compact(w.text)))
    .sort((a, b) => a.x - b.x);
  if (subs.length === 0) return [];
  // **年度は「x が最も近いヘッダ」で決めてはいけない** — 年度ヘッダ（R4年度…）は3列にまたがる
  // セルの中央に置かれるが、pdftotext が返すのはラベル自身の箱なので、R4 の「計画事業費」は
  // R4年度 より R5年度 の中央に近くなり、静かに1年ずれる（実測: R4計画 中心261 / R4年度 中心208 /
  // R5年度 中心295）。**「予算額」が各年度グループの先頭**という資料の構造を使う。
  const cols: Col[] = [];
  let fyIdx = -1;
  for (const s of subs) {
    const c = compact(s.text);
    if (c.startsWith("予算")) fyIdx++; // 予算額 → 次の年度グループへ
    if (fyIdx < 0 || fyIdx >= fyHeads.length) {
      throw new Error(`${filename} p.${page}: 予決算表の年度グループを決められません（小見出し「${c}」が年度ヘッダの前に出た）`);
    }
    cols.push({
      fy: compact(fyHeads[fyIdx]!.text).replace("年度", ""),
      kind: c.startsWith("予算") ? "予算" : c.startsWith("決算") ? "決算" : "計画",
      // 値は列の右端に右揃え。小見出しの左右に少し余裕を持たせる
      x0: s.x - 6,
      x1: s.xEnd + 6,
      isEstimate: c.includes("見込"),
    });
  }
  // 構造の自己検証: 年度ごとの列数と、年度が昇順で連続していること
  // （ヘッダの読み違いをここで落とす。ゲート①②は列内の縦の整合しか見ないので年度ずれを検出できない）
  const byFy = new Map<string, number>();
  for (const c of cols) byFy.set(c.fy, (byFy.get(c.fy) ?? 0) + 1);
  const fys = [...byFy.keys()];
  for (let i = 1; i < fys.length; i++) {
    const a = Number(fys[i - 1]!.slice(1));
    const b = Number(fys[i]!.slice(1));
    if (b !== a + 1) {
      throw new Error(`${filename} p.${page}: 予決算表の年度が連続していません（${fys.join(",")}）`);
    }
  }
  for (const [fy, n] of byFy) {
    if (n > 3) throw new Error(`${filename} p.${page}: ${fy} の列が ${n} 個あります（予算額/決算額/計画事業費 の3つまで）`);
  }
  if (cols.length < 8) {
    throw new Error(`${filename} p.${page}: 予決算表の列を特定できません（${cols.length}列）`);
  }
  return cols;
}

/** ラベル行の値を列へ割り当てる。`-`（空セル）は null。列に入らない値があれば throw */
function bindRow(row: Word[], cols: Col[], filename: string, page: number, label: string): (number | null)[] {
  const out: (number | null)[] = cols.map(() => null);
  for (const w of row) {
    const t = compact(w.text);
    if (t === "-" || t === "－" || t === "―") continue; // 空セル（欠測。0 ではない）
    const n = toNum(t);
    if (n == null) continue;
    const mid = (w.x + w.xEnd) / 2;
    const i = cols.findIndex((c) => mid >= c.x0 - 8 && mid <= c.x1 + 8);
    if (i < 0) continue; // 表の外（行ラベル側の数字など）
    if (out[i] != null) {
      throw new Error(`${filename} p.${page}: ${label} の列 ${i} に値が2つ入りました（列境界の判定が誤っている可能性）`);
    }
    out[i] = n;
  }
  return out;
}

/** 「事業費 A」「人件費 B」等のラベルを含む行を返す */
function findRow(rows: Word[][], pred: (c: string) => boolean): Word[] | null {
  for (const r of rows) {
    const c = compact(r.map((w) => w.text).join(""));
    if (pred(c)) return r;
  }
  return null;
}

function parseSheet(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): ProjectReportFact | null {
  const words = pageWords(filePath, from);
  const rows = rowsOf(words);
  const flat = pageText(filePath, from, to);
  const c = compact(flat);

  // 事務事業コード（8桁）と事務事業名
  const codeM = /事務事業コード/.test(c) ? /(\d{8})/.exec(c.slice(c.indexOf("事務事業コード"), c.indexOf("事務事業コード") + 80)) : null;
  const code = codeM?.[1] ?? null;
  // 事業名はコード直後（-layout の行から取る）。**行末で終わる様式がある**ので後続の空白を要求しない
  // — 区の「事務事業評価シート（地域課題対応事業用）」は 事務事業（4層） ラベルつきで
  // `50103040   地域課題対応事業（川崎区）` が行末で終わり、`\s{2,}` を要求すると7件が静かに落ちる。
  let name = "";
  if (code) {
    for (const line of pageText(filePath, from, from).split("\n")) {
      const m = new RegExp(code + "\\s+(\\S.*?)\\s*$").exec(line);
      if (m) {
        // 通常様式は名前の後ろに「有/無」（政策体系別計画の記載）が続くので、そこで切る
        name = m[1]!.replace(/\s{2,}.*$/, "").trim();
        break;
      }
    }
  }
  if (!code || !name) {
    // **黙って落とさない**。1件でも取りこぼすと Σ事業数 = 572 のゲートで気づけるが、
    // どのシートが落ちたかを追うコストが高い。ここで場所つきで落とす
    throw new Error(
      `${filename} p.${from}: 事務事業コード（8桁）または事務事業名を抽出できません` +
        `（code=${code ?? "なし"} name=${name || "なし"}）。様式が違う可能性があります`,
    );
  }

  // 所属名
  const bukaM = /所属名([^\n]{2,40}?)(?:実施形態|実施期間|事業の)/.exec(c);
  const buka = bukaM?.[1]?.trim() ?? "";

  // 政策・施策
  const policyM = /政\s*策\s*([^\n]{2,40}?)施\s*策/.exec(flat.replace(/\n/g, " "));
  const measureM = /施\s*策\s*([^\n]{2,40}?)直接目標/.exec(flat.replace(/\n/g, " "));

  // 予決算表
  const cols = costColumns(words, filename, from);
  const aRow = findRow(rows, (t) => t.includes("事業費A") || /^事業費A/.test(t));
  // **`※` が 人件費 と B の間に入る**（`人件費 ※ B` の順に並ぶ）。単純な includes("人件費B") では
  // 572件中565件を静かに取りこぼす（脚注「※ 人件費は…人工を乗じて算出」の ※ が本体行に属する）
  const bRow = findRow(rows, (t) => /人件費[※\s]*B/.test(t));
  const tRow = findRow(rows, (t) => t.includes("総コスト"));
  const genRow = findRow(rows, (t) => t.includes("一般財源"));
  const kokkoRow = findRow(rows, (t) => t.includes("国庫支出金"));
  const shisaiRow = findRow(rows, (t) => /市債/.test(t));
  const tokuRow = findRow(rows, (t) => t.includes("その他特財"));
  const ninkuRow = findRow(rows, (t) => t.includes("人工"));
  if (!aRow || !tRow) {
    throw new Error(`${filename} p.${from}: 予決算表の「事業費A」または「総コスト」行が見つかりません`);
  }
  const A = bindRow(aRow, cols, filename, from, "事業費A");
  const B = bRow ? bindRow(bRow, cols, filename, from, "人件費B") : cols.map(() => null);
  const T = bindRow(tRow, cols, filename, from, "総コスト");
  const GEN = genRow ? bindRow(genRow, cols, filename, from, "一般財源") : cols.map(() => null);
  const KOK = kokkoRow ? bindRow(kokkoRow, cols, filename, from, "国庫支出金") : cols.map(() => null);
  const SHI = shisaiRow ? bindRow(shisaiRow, cols, filename, from, "市債") : cols.map(() => null);
  const TOK = tokuRow ? bindRow(tokuRow, cols, filename, from, "その他特財") : cols.map(() => null);
  const NIN = ninkuRow ? bindRow(ninkuRow, cols, filename, from, "人工") : cols.map(() => null);

  const cost = cols.map((col, i) => ({
    fy: col.fy,
    kind: col.kind,
    jigyohi: A[i] ?? null,
    ippanZaigen: GEN[i] ?? null,
    totalCost: T[i] ?? null,
    jinkenhi: B[i] ?? null,
    ninku: NIN[i] ?? null,
    kokkoShishutsukin: KOK[i] ?? null,
    shisai: SHI[i] ?? null,
    sonotaTokuzai: TOK[i] ?? null,
    ...(col.isEstimate ? { isEstimate: true } : {}),
  }));

  // 達成度（1〜5）。**テキストの前後関係で取ってはいけない** — 選択値のセルは
  // 「達成度」ラベルの上に来ることがあり（選択肢の並び順が資料内で一定しない）、
  // `/達成度\s*([1-5])/` では取りこぼす（実測: 3-3.pdf の「魅力的な公園整備事業」で
  // 値 `3` がラベルの13ポイント上にある）。**座標で取る**:
  // 選択値は半角の単独数字で、達成度ラベルより右・選択肢（全角「１．…」）の列より左、
  // ラベルとほぼ同じ高さのブロック内にある。
  let achievement: number | null = null;
  for (let pg = from; pg <= Math.min(to, from + 2) && achievement == null; pg++) {
    const pw = pg === from ? words : pageWords(filePath, pg);
    const label = pw.find((w) => compact(w.text) === "達成度");
    if (!label) continue;
    const opts = pw.filter((w) => /^[１-５]．/.test(w.text.trim()) && Math.abs(w.y - label.y) < 40);
    if (opts.length === 0) continue;
    const optX = Math.min(...opts.map((o) => o.x));
    const cand = pw.filter(
      (w) => /^[1-5]$/.test(w.text.trim()) && w.x > label.x && w.x < optX - 5 && Math.abs(w.y - label.y) <= 25,
    );
    if (cand.length === 1) achievement = Number(cand[0]!.text.trim());
    else if (cand.length > 1) {
      throw new Error(`${filename} p.${pg}: 達成度の候補が ${cand.length} 個あります（${cand.map((c) => c.text).join(",")}）`);
    }
  }
  // 区の「地域課題対応事業用」様式は選択値がラベル直後に読み順で来る（座標条件に当たらない）。
  // 座標で取れなかったときだけ読み順で拾う（順序は逆にしない — 座標の方が誤りにくい）
  if (achievement == null) {
    const m = /達成度\s*([1-5])(?![\d.])/.exec(compact(flat));
    if (m) achievement = Number(m[1]);
  }
  // 方向性区分（Ⅰ〜Ⅴ）。選択肢の一覧とは別に、単独トークンで選択値が出る
  let direction: string | null = null;
  {
    const seg = flat.slice(flat.indexOf("方向性区分"));
    for (const r of rowsOf(pageWords(filePath, Math.min(to, from + 2)))) {
      for (const w of r) {
        if (/^[ⅠⅡⅢⅣⅤ]$/.test(w.text.trim())) direction = w.text.trim();
      }
    }
    if (!direction && seg) {
      const m = /([ⅠⅡⅢⅣⅤ])\s*$/m.exec(seg);
      if (m) direction = m[1]!;
    }
  }

  return {
    no: code,
    name,
    buka,
    kubun: null,
    implementation: null,
    grade: null, // 川崎は A〜F 体系を持たない（達成度・方向性で表す）
    score: null,
    code,
    achievement,
    direction,
    policy: policyM?.[1]?.trim() ?? null,
    measure: measureM?.[1]?.trim() ?? null,
    cost,
    indicators: [],
    locator: { file: filename, page: from },
  };
}

export function parseKawasakiJigyouHyouka(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const facts: ProjectReportFact[] = [];
  for (const f of files) {
    if (f.filename === "gaiyou.pdf") continue; // 全体概要（検証の基準値。シートは無い）
    const all = pageText(f.path, 1, 9999);
    // pdftotext は末尾に \f を出すので split すると空の要素が1つ余る。落とさないと
    // 最終シートのページ範囲が実ページ数を1つ超え、pdftotext が範囲エラーで落ちる
    const pages = all.split("\f").filter((p, i, a) => i < a.length - 1 || p.trim() !== "");
    // シートの開始ページ＝「令和N年度 事務事業評価シート」を含むページ
    const starts: number[] = [];
    pages.forEach((p, i) => {
      if (compact(p).includes("事務事業評価シート")) starts.push(i + 1);
    });
    if (starts.length === 0) throw new Error(`${f.filename}: 事務事業評価シートが1件もありません`);
    starts.forEach((from, i) => {
      const to = (starts[i + 1] ?? pages.length + 1) - 1; // 最終シートは末尾ページまで
      const fact = parseSheet(f.path, f.filename, from, Math.max(from, to));
      if (fact) facts.push(fact);
    });
  }
  if (facts.length === 0) throw new Error(`${source.id}: 事業が1件も抽出できませんでした`);
  return {
    docType: "project-report",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    targetFy: source.fiscalYear, // 令和6年度の評価＝令和6年度事業（甲府は評価年度と対象年度が1年ずれる）
    facts,
  };
}
