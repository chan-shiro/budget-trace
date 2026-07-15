// 横浜市 事業評価書 パーサ — 事業報告（成果）
//
// 予算 → 執行 → **成果** の鎖の最後。**横浜だけが「歳出予算科目 一般会計 07 款 01 項 01 目」を持つ**
// （R7 は全2,535事業で読める）＝ 事業を款ドリルへ直接紐付けられる唯一の資料。docs §8d。
//
// 構成: 局・区別に45 PDF。各ファイルは目次（様式1）＋**1事業1シート**（可変長）。
// **1事業 = 「令和６年度事業名」の出現で区切る**（継続ページには無い）。
//
// **川崎（kawasaki-jigyou-hyouka）と決定的に違う2点**:
// 1. **同じページに年度ヘッダが3組ある**（事業決算額 y≈217 / 細事業費 y≈396 / 細事業事業量 y≈484）。
//    しかも**事業決算額と細事業費は x が1ptも違わない**（`５年度` が両方 x=191.3）。
//    → **x でソートすると必ず混ざる。y で区画を分けてから列を対応させる。**
// 2. **空セルはプレースホルダ無しで単に欠落する**（川崎の `-` に相当するものが無い）。
//    → トークン順では絶対に対応付かない。**x 座標での最近傍**で対応させる。
//
// その他の罠（実測・docs §8d）: ヘッダ左寄せ・値右寄せで必ずズレ、**符号が表ごとに逆**
// （決算額表 +25 / 事業量表 −7）だが、オフセットは列ピッチの12〜31%なので最近傍は正しく当たる。
// ラベルは2行に割れる（`事業費`(y=218.8) と `（千円）`(y=229.6) は別の語）。負号は `▲`（空白入り）。
//
// 検証は validate 側（差引 = ６年度 − ５年度 / Σ細事業費 = 事業費 ±2千円 / 目次の行数 = 評価書数）。
// **前年度側はゲートに使えない** — 細事業の改廃で前年度が積み上がらない（原典の構造）。
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Word {
  x: number;
  xEnd: number;
  y: number;
  text: string;
}

function pageWords(filePath: string, page: number): Word[] {
  const tsv = execFileSync("pdftotext", ["-tsv", "-f", String(page), "-l", String(page), filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const out: Word[] = [];
  for (const line of tsv.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12) continue;
    const text = (c[11] ?? "").trim();
    if (!text || text.startsWith("###")) continue;
    const x = Number(c[6]);
    const y = Number(c[7]);
    const w = Number(c[8]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    out.push({ x, xEnd: x + (Number.isFinite(w) ? w : 0), y, text });
  }
  return out;
}

const pageText = (filePath: string, from: number, to: number): string =>
  execFileSync("pdftotext", ["-layout", "-f", String(from), "-l", String(to), filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });

const compact = (s: string) => s.replace(/[\s　]/g, "");
/** 全角数字 → 半角。**評価書番号は全角のことがある**（実測: 介護保険事業費会計の事業が `１`） */
const toHalf = (s: string) => s.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0));
/** 金額。**負号は `▲`（空白入り）** — 川崎の `△` ではない */
const toNum = (s: string): number | null => {
  const t = compact(s).replace(/,/g, "").replace(/^[▲△]/, "-");
  if (!/^-?\d+$/.test(t)) return null;
  return Number(t);
};

/** 「５年度」等 → "R5"。全角数字を含む */
const fyOf = (label: string): string | null => {
  const m = /^([０-９0-9]+)年度$/.exec(compact(label));
  if (!m) return null;
  const n = m[1]!.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0));
  return `R${Number(n)}`;
};

/**
 * ある y の帯にある年度ヘッダから列を作る。
 * **帯を切ってから呼ぶこと** — ページ全体で年度ヘッダを集めると、事業決算額(y≈217)と
 * 細事業費(y≈396)は x が完全に一致するので混ざる（実測: `５年度` が両方 x=191.3）。
 */
function columnsAt(words: Word[], headY: number): { fy: string; x: number }[] {
  return words
    .filter((w) => Math.abs(w.y - headY) <= 3 && fyOf(w.text))
    .map((w) => ({ fy: fyOf(w.text)!, x: (w.x + w.xEnd) / 2 }))
    .sort((a, b) => a.x - b.x);
}

/**
 * 値の行（y の帯）を列へ割り当てる。**最近傍**で対応させる
 * （ヘッダ左寄せ・値右寄せで必ずズレ、符号も表ごとに逆だが、
 *   オフセットは列ピッチの12〜31%なので最近傍は正しく当たる。実測で確認済み）。
 * **空セルはプレースホルダ無しで欠落する**ので、トークン順では対応付かない。
 */
function bindAt(
  words: Word[],
  rowY: number,
  cols: { fy: string; x: number }[],
  pick: (w: Word) => number | null,
): Record<string, number> {
  const out: Record<string, number> = {};
  if (cols.length === 0) return out;
  const pitch = cols.length > 1 ? Math.abs(cols[1]!.x - cols[0]!.x) : 60;
  // **負号 `▲` は独立したトークンになる**（`▲ 7,810` が空白入りのため）。
  // 数字トークンだけを見ると符号が落ち、差引が +7,810 になって「列を取り違えた」ように見える
  // （実測: 1,009件が差引ゲートで落ちた）。**同じ行の直前にある ▲/△ を拾って負にする。**
  const row = words.filter((w) => Math.abs(w.y - rowY) <= 3).sort((a, b) => a.x - b.x);
  const negX = new Set<number>();
  row.forEach((w, i) => {
    if (/^[▲△]$/.test(compact(w.text))) {
      const next = row[i + 1];
      if (next && next.x - w.xEnd < 12) negX.add(next.x); // すぐ右の数字が負
    }
  });
  for (const w of row) {
    const v0 = pick(w);
    if (v0 == null) continue;
    const v = negX.has(w.x) ? -v0 : v0;
    const mid = (w.x + w.xEnd) / 2;
    let best: (typeof cols)[number] | null = null;
    let bestD = Infinity;
    for (const c of cols) {
      const d = Math.abs(c.x - mid);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    // 最近傍でも半ピッチ以上離れていれば表の外（行ラベル等）
    if (!best || bestD > pitch * 0.5) continue;
    if (out[best.fy] != null) continue; // 同じ列に2つ来たら先勝ち（差引ゲートで落ちる）
    out[best.fy] = v;
  }
  return out;
}

/** ラベル語の y を返す（**ラベルは2行に割れる**ので、語単位で探す） */
const labelY = (words: Word[], label: string, after = 0): number | null => {
  const hit = words.filter((w) => compact(w.text) === label && w.y > after).sort((a, b) => a.y - b.y);
  return hit[0]?.y ?? null;
};

function parseSheet(filePath: string, filename: string, from: number, to: number): ProjectReportFact | null {
  const words = pageWords(filePath, from);
  const flat = pageText(filePath, from, from);
  const lines = flat.split("\n");

  /** ラベル行の右のセル（空白2つ以上で区切る） */
  const cell = (label: RegExp, after?: RegExp): string => {
    for (const line of lines) {
      const m = label.exec(line);
      if (!m) continue;
      let rest = line.slice(m.index + m[0].length);
      if (after) {
        const a = after.exec(rest);
        if (!a) continue;
        rest = rest.slice(a.index + a[0].length);
      }
      const v = rest.trim().split(/\s{2,}/)[0]?.trim() ?? "";
      if (v) return v;
    }
    return "";
  };

  const name = cell(/令和[０-９6６]年度事業名/);
  if (!name) return null;
  const buka = cell(/所管区局・課/);

  // 歳出予算科目（**横浜だけが持つ**）。「一般会計 07 款 01 項 01 目」
  // **全角数字を半角へ**（款項目も評価書番号も全角のことがある）
  const c = toHalf(compact(flat));
  const kmoku = /歳出予算科目([^\d]{2,12}?)(\d{1,2})款(\d{1,2})項(\d{1,2})目/.exec(c);
  const account = kmoku?.[1]?.trim() ?? "";
  const kan = kmoku?.[2] ?? null;
  const kou = kmoku?.[3] ?? null;
  const moku = kmoku?.[4] ?? null;
  const noM = /評価書番号(\d+)/.exec(c);
  const no = noM?.[1] ?? "";
  if (!account || !no) {
    // **黙って落とさない**（川崎で null 返しが7件を静かに落とした）
    throw new Error(
      `${filename} p.${from}: 歳出予算科目または評価書番号を抽出できません（会計=${account || "なし"} 番号=${no || "なし"}）`,
    );
  }

  // ---- 事業決算額（**y で帯を切ってから**列を作る）----
  // ラベル「事業費」の y を基準に、その帯の年度ヘッダだけを使う（細事業費と x が完全に一致するため）
  const hiY = labelY(words, "事業費");
  const cost: ProjectReportFact["cost"] = [];
  let diff: number | null = null; // 差引（増減）。validate のゲートに使う
  if (hiY != null) {
    // 年度ヘッダは「事業費」ラベルとほぼ同じ y（実測: 事業費 y=218.8 / ５年度 y=216.8）
    const cols = columnsAt(words, hiY - 2).filter((x) => x.fy !== "R0");
    // **差引（増減）列も取る** — validate の最強ゲート「差引 = ６年度 − ５年度」に使う
    // （実測 1,508/1,508 厳密一致）。年度ヘッダと同じ帯にあるので同じ y から拾う
    const diffHead = words.find((w) => Math.abs(w.y - (hiY - 2)) <= 3 && compact(w.text).startsWith("差引"));
    const allCols = diffHead
      ? [...cols, { fy: "__diff", x: (diffHead.x + diffHead.xEnd) / 2 }]
      : cols;
    // 値の行は「決算」ラベルの y
    const decY = labelY(words, "決算", hiY - 6);
    if (cols.length && decY != null) {
      const vals = bindAt(words, decY, allCols, (w) => toNum(w.text));
      for (const col of cols) {
        if (vals[col.fy] == null) continue;
        cost.push({ fy: col.fy, kind: "決算", jigyohi: vals[col.fy]!, ippanZaigen: null, totalCost: null });
      }
      // 差引は「当年度 − 前年度」の検算用。cost には持たず diff に出す
      if (vals["__diff"] != null) diff = vals["__diff"]!;
    }
  }

  return {
    // **評価書番号は局内で一意でない**（実測: 健康福祉局277件中ユニーク55・最大99）。
    // validate の重複チェックに素の番号を渡すと2,471件が誤って error になる。
    // scout の指摘どおり **(会計, 款, 項, 目, 評価書番号) の複合**をキーにする。
    no: `${filename.replace(/\.pdf$/, "")}-${account}-${kan}-${kou}-${moku}-${no}`,
    name,
    buka,
    kubun: null,
    implementation: null,
    grade: null, // 横浜は総合評価も数値スコアも持たない（7軸のカテゴリ値のみ）
    score: null,
    code: `${account}-${kan}-${kou}-${moku}-${no}`, // **評価書番号は局内で一意でない**（複合キー）
    achievement: null,
    direction: null,
    policy: account, // 会計名（一般会計 / 各特別会計）。scope の判別に使う
    measure: kan && kou && moku ? `${kan}款${kou}項${moku}目` : null,
    cost,
    indicators: [],
    // 資料が載せている差引（増減）。validate が「差引 = 当年度 − 前年度」で検算する
    costDiff: diff,
    locator: { file: filename, page: from },
  };
}

export function parseYokohamaJigyoHyoka(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const facts: ProjectReportFact[] = [];
  for (const f of files) {
    if (/^0236_/.test(f.filename)) continue; // コードブック（評価軸の定義。シートは無い）
    const all = pageText(f.path, 1, 9999);
    const pages = all.split("\f").filter((p, i, a) => i < a.length - 1 || p.trim() !== "");
    // **1事業 = 「令和６年度事業名」の出現**（継続ページには無い）
    const starts: number[] = [];
    pages.forEach((p, i) => {
      if (/令和[０-９6６]年度事業名/.test(compact(p))) starts.push(i + 1);
    });
    if (starts.length === 0) throw new Error(`${f.filename}: 事業評価書が1件もありません`);
    starts.forEach((from, i) => {
      const to = (starts[i + 1] ?? pages.length + 1) - 1;
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
    targetFy: "R6", // 令和7年度の評価＝令和6年度事業
    facts,
  };
}
