// 北九州市「令和6年度 行政評価の取組結果（事業評価）」パーサ — 事業報告（成果）
//
// 局別に分かれた資料だが、**「全局分」に統合された1冊の PDF が別途配信されている**
// （42p・648KB）ので、18局分を個別に集める必要が無い。全198事業（局ごとに1〜複数ページ・
// 事業番号は局ごとに1からリセット）。docs §8j。#161 の偵察で「198事業は疑わしい」とされていたが、
// この統合PDFで実測したところ**ちょうど198件**で疑いは晴れた。
//
// 横置きワイド表（1行1事業・KPI①②は任意）。各ページ右上に局名が固定表示される
// （例「市長公室」）ので、局の切り替わりはページ単位で検出できる。
//
// **款/項/目は載っていない**（執行実績説明書＝別資料にのみ款がある。#161 の偵察で
// 決算額±事業名の近似一致による機械結合が可能と分かっているが、実装コストが高いため
// 本パーサは事業評価票単独で収録する。款ドリルへの紐付けは今後の課題＝docs 参照）。
//
// ---- 座標ベースの抽出（実測 2026-07-24・全198行で欠損0を確認）----
// 各行は「事業番号」（局内通し番号・x≈130-155の裸数字）を行アンカーとする。
// 予算額/決算額/評価/方向性/KPI各値は**すべてアンカーと同じ y**（±1.5pt）に単一行で並�ぶ
// （「評価」だけは「概ね順調」「やや遅れ」等2行に折り返すことがあるため ±5.5pt で拾う）。
// 事業名/事業概要/担当課/KPI事業目標名/主な取組評価は**行の縦方向の帯**（前後の行アンカーの
// 中点まで）に渡って複数行に折り返すため、帯全体から x 範囲で拾い y→x の順に結合する。
//
// 「評価」は北九州固有の4段階語彙（順調／概ね順調／やや遅れ／遅れ）で、川崎の1〜5数値（achievement）
// にも甲府のA〜F（grade）にも当てはまらないため、新設した `progress` フィールドに丸めず収める。
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";
type ProjectReportIndicator = ProjectReportFact["indicators"][number];

export const PARSER_VERSION = "0.1.0";

interface Word {
  page: number;
  x: number;
  y: number;
  text: string;
}

function allWords(filePath: string): Word[] {
  const tsv = execFileSync("pdftotext", ["-tsv", filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const out: Word[] = [];
  for (const line of tsv.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12) continue;
    const text = (c[11] ?? "").trim();
    if (!text || text.startsWith("###")) continue;
    const page = Number(c[1]);
    const x = Number(c[6]);
    const y = Number(c[7]);
    if (!Number.isFinite(page) || !Number.isFinite(x) || !Number.isFinite(y)) continue;
    out.push({ page, x, y, text });
  }
  return out;
}

/** 列の x 範囲（実測・見出し行の座標から算出。境界は隣接列の中間値） */
const COLS = {
  policy: [35, 130],
  no: [130, 155],
  name: [150, 210],
  summary: [205, 296],
  dept: [296, 320],
  kpi1Goal: [320, 373],
  kpi1TargetFy: [373, 397],
  kpi1Base: [397, 427],
  kpi1BaseFy: [427, 450],
  kpi1Target: [450, 500],
  kpi1Actual: [500, 550],
  kpi1Rate: [550, 589],
  kpi2Goal: [589, 630],
  kpi2TargetFy: [630, 655],
  kpi2Base: [655, 684],
  kpi2BaseFy: [684, 716],
  kpi2Target: [716, 750],
  kpi2Actual: [750, 800],
  kpi2Rate: [800, 845],
  budget: [845, 887],
  decision: [887, 928],
  evaluation: [928, 955],
  review: [955, 1135],
  direction: [1135, 1180],
} as const;
type ColKey = keyof typeof COLS;
const colOf = (x: number): ColKey | null => {
  for (const k of Object.keys(COLS) as ColKey[]) {
    const [lo, hi] = COLS[k];
    if (x >= lo && x < hi) return k;
  }
  return null;
};
/** 複数行に折り返す列（行の帯全体から拾う） */
const WIDE_COLS = new Set<ColKey>(["name", "summary", "dept", "kpi1Goal", "kpi2Goal", "review"]);
/**
 * 数値1個だけを持つはずの列。**予算額/決算額は実測で単一行と確認済みだが、KPI目標値/実績値は
 * 稀に値と同じ列に複数行の注記（「(R12年度までに)」等）が紛れ込み、値自体もアンカー行から
 * 数pt ずれることがある**（実測・ingest-reviewer で検出）ため、帯全体から拾って
 * 「x→yの順で最初に数値として解釈できたトークン」を値として採る（`numAt` 参照）。
 */
const NUMERIC_COLS = new Set<ColKey>(["budget", "decision", "kpi1Target", "kpi1Actual", "kpi2Target", "kpi2Actual"]);
/** 2行に折り返すことがある短い列（「概ね順調」等） */
const EVALDIR_COLS = new Set<ColKey>(["evaluation", "direction"]);

const toNum = (s: string): number | null => {
  const t = s.replace(/[,\s　]/g, "");
  const m = /^-?\d+(?:\.\d+)?/.exec(t);
  return m ? Number(m[0]) : null;
};

/**
 * 「主な施策」見出し（例: `Ⅱ「彩りあるまち」の実現`）は行アンカーに紐付かず、
 * 複数行に折り返しつつ複数の事業行の上に1回だけ現れる区分見出し（x≈35-130）。
 * 連続する語を y の隙間10pt以内で1つの見出しブロックにまとめ、各行にはその行より上にある
 * 直近のブロックを割り当てる。**見出しが見つからない行は null**（無理に埋めない）。
 */
function policyHeadingsOf(pageWords: Word[]): { y: number; text: string }[] {
  // y<75 は表ヘッダの「主な施策」ラベル自身（全ページ共通・実測 y≈58.5）なので除外する。
  // 除外しないと、本当の見出しが無いページの先頭行がこのラベル文字列を施策として誤って
  // 拾ってしまう（実測で確認・値が無いなら null のほうが安全）。
  const ws = pageWords.filter((w) => w.x >= 35 && w.x < 130 && w.y >= 75).sort((a, b) => a.y - b.y);
  const blocks: { y: number; lastY: number; text: string }[] = [];
  for (const w of ws) {
    const last = blocks[blocks.length - 1];
    if (last && w.y - last.lastY <= 10) {
      last.text += w.text;
      last.lastY = w.y;
    } else {
      blocks.push({ y: w.y, lastY: w.y, text: w.text });
    }
  }
  return blocks;
}

function parsePage(
  words: Word[],
  page: number,
  dept: string,
  policyState: { current: string | null },
): ProjectReportFact[] {
  const pageWords = words.filter((w) => w.page === page);
  const anchors = [...new Set(pageWords.filter((w) => w.x >= 130 && w.x < 155 && /^\d+$/.test(w.text)).map((w) => w.y))].sort(
    (a, b) => a - b,
  );
  const policyBlocks = policyHeadingsOf(pageWords);
  const facts: ProjectReportFact[] = [];
  for (let i = 0; i < anchors.length; i++) {
    const ay = anchors[i]!;
    // ページ先頭行は「前の行」が無いので、表ヘッダの下端（実測: 全ページ y≈67.4-67.6 で不変）を
    // 境界にする。**ay-200 のような大きな負の値にすると表ヘッダ自体（「主要事務」「事業名」等）を
    // 帯に巻き込んでしまい、name/buka/implementation の先頭にラベルが混入する**（実害・実測で検出）。
    const HEADER_BOTTOM = 70;
    const prevMid = i === 0 ? HEADER_BOTTOM : (anchors[i - 1]! + ay) / 2;
    const nextMid = i + 1 >= anchors.length ? ay + 200 : (anchors[i + 1]! + ay) / 2;
    const narrow: Record<string, { x: number; text: string }[]> = {};
    const wide: Record<string, { y: number; x: number; text: string }[]> = {};
    const evaldir: Record<string, { y: number; x: number; text: string }[]> = {};
    for (const w of pageWords) {
      const c = colOf(w.x);
      if (!c) continue;
      if (WIDE_COLS.has(c) || NUMERIC_COLS.has(c)) {
        if (w.y > prevMid && w.y <= nextMid) (wide[c] ??= []).push({ y: w.y, x: w.x, text: w.text });
      } else if (EVALDIR_COLS.has(c)) {
        if (Math.abs(w.y - ay) <= 5.5) (evaldir[c] ??= []).push({ y: w.y, x: w.x, text: w.text });
      } else {
        if (Math.abs(w.y - ay) <= 1.5) (narrow[c] ??= []).push({ x: w.x, text: w.text });
      }
    }
    const jw = (c: string) =>
      (wide[c] ?? [])
        .sort((a, b) => a.y - b.y || a.x - b.x)
        .map((v) => v.text)
        .join("");
    const jn = (c: string) =>
      (narrow[c] ?? [])
        .sort((a, b) => a.x - b.x)
        .map((v) => v.text)
        .join("");
    // 予算額/決算額/KPI目標値・実績値は帯全体（行アンカーと同じ y とは限らない）から拾う。
    // KPI目標値/実績値の列には、稀に「(R12年度までに)」のような複数行の注記が同じ列に紛れ込み、
    // **値自体もアンカー行から数pt ずれることがある**（実測: サーキュラーエコノミー基盤構築事業の
    // 実績値「283,000」はアンカーより7.25pt上・目標値「30」の右に注記の断片「2年」が並ぶ。
    // ±1.5pt の同一行連結だと前者は拾えず後者は「302年」→302 という原典に無い数になっていた・
    // ingest-reviewer で検出）。**連結せず、帯を y→x の順で走査して最初に toNum が成功した
    // トークン**を値として採る（値トークンは常に注記の断片より先に来る＝実測で確認済み）。
    const numAt = (c: string): number | null => {
      for (const { text } of (wide[c] ?? []).sort((a, b) => a.y - b.y || a.x - b.x)) {
        const v = toNum(text);
        if (v != null) return v;
      }
      return null;
    };
    const jed = (c: string) =>
      (evaldir[c] ?? [])
        .sort((a, b) => a.y - b.y || a.x - b.x)
        .map((v) => v.text)
        .join("");

    const localNo = jn("no");
    const name = jw("name");
    if (!name) {
      throw new Error(`p.${page} 事業番号${localNo}: 主要事務事業名を抽出できません（列ずれの可能性）`);
    }
    const section = jw("dept");
    const buka = `${dept}/${section}`;
    // このアンカーより上にある直近の施策見出し。**このページに見出しが無ければ前のページから
    // 引き継ぐ**（施策の区切りが局をまたいでも常に見出しを繰り返すとは限らない・実測30/198件で
    // 発生。policyState は呼び出し側でページを跨いで使い回す）。
    const foundHeading = [...policyBlocks].reverse().find((b) => b.y < ay);
    if (foundHeading) policyState.current = foundHeading.text;
    const policy = policyState.current;
    const summary = jw("summary");
    const budget = numAt("budget");
    const decision = numAt("decision");
    if (budget == null) throw new Error(`p.${page} 「${name}」: 予算額を抽出できません`);

    const indicators: ProjectReportIndicator[] = [];
    for (const [goalCol, targetCol, actualCol] of [
      ["kpi1Goal", "kpi1Target", "kpi1Actual"],
      ["kpi2Goal", "kpi2Target", "kpi2Actual"],
    ] as const) {
      const goalName = jw(goalCol);
      const target = numAt(targetCol);
      const actual = numAt(actualCol);
      if (goalName && (target != null || actual != null)) {
        indicators.push({ category: "成果指標", name: goalName, targets: [target], actuals: [actual] });
      }
    }

    // 事業概要（目的・内容）と主な取組・成果に対する評価は、どちらも自由記述で
    // 専用フィールドが無いため implementation にまとめて収める（丸めず両方とも残す）。
    const review = jw("review");
    const implementation = [summary, review].filter(Boolean).join("\n");
    facts.push({
      no: "", // 呼び出し側で通し番号を付与する
      name,
      buka,
      kubun: null,
      implementation: implementation || null,
      grade: null,
      score: null,
      code: `${dept}-${localNo}`,
      achievement: null,
      direction: jed("direction") || null,
      progress: jed("evaluation") || null,
      policy,
      measure: null, // 款/項/目はこの資料に無い（執行実績説明書は別資料。docs §8j 参照）
      // 予算額も抽出できるので決算額とあわせて残す（抽出はするが保存しない、という状態にしない）。
      // **決算額を最後に置く**（画面は cost[cost.length-1] を最新として扱うため）。
      cost: [
        { fy: "R6", kind: "予算", jigyohi: budget, ippanZaigen: null, totalCost: null },
        { fy: "R6", kind: "決算", jigyohi: decision, ippanZaigen: null, totalCost: null },
      ],
      indicators,
      locator: { file: "", page },
    });
  }
  return facts;
}

export function parseKitakyushuJigyouHyoka(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const file = files[0];
  if (!file) throw new Error(`${source.id}: ファイルがありません`);
  const words = allWords(file.path);
  const pages = [...new Set(words.map((w) => w.page))].sort((a, b) => a - b);

  const facts: ProjectReportFact[] = [];
  let seq = 0;
  const policyState = { current: null as string | null };
  for (const page of pages) {
    const dept = words.find((w) => w.page === page && w.y < 30 && w.x > 1000)?.text;
    if (!dept) throw new Error(`p.${page}: 局名（ページ右上）を抽出できません`);
    for (const f of parsePage(words, page, dept, policyState)) {
      seq += 1;
      facts.push({ ...f, no: String(seq).padStart(3, "0"), locator: { file: file.filename, page: f.locator.page } });
    }
  }
  if (facts.length === 0) throw new Error(`${source.id}: 事業が1件も抽出できませんでした`);

  return {
    docType: "project-report",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    targetFy: source.fiscalYear, // R6決算の事業評価＝対象年度は資料自身の年度と同じ（さいたまと同型）
    facts,
  };
}
