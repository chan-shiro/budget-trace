// 札幌市 事業評価調書 パーサ — 事業報告（成果）（#127・docs §8t）
//
// **1事業1PDF（1ページ）× 一般会計634本**。ファイル一覧は収集器
// （pipeline/collect-sapporo-hyoka.ts）が生成する台帳から registry が展開する。
//
// 様式（R7 公表分・実測）: ◎基本情報（年度・会計コード・事業コード・事業名・評価担当課）＋
// 金額4行（令和5年度決算額 / 令和6年度予算額 / 令和6年度決算額 / 令和7年度予算額 —
// 各行に「うち特定財源」「正規職員業務量（人工）」）＋ 成果・活動指標 ＋ 自由記述。
// **評価のカテゴリ値（A〜F・達成度）は R7 様式には無い**（見直し内容と方向性が自由記述）。
// 成果指標は空欄が多く様式のゆらぎも大きいため**川崎・横浜と同じく未収録**（indicators: []）。
//
// PDF は生成系が2種ある（実測）:
// - 主流型: ラベルが「令和5年度決算額」の単一トークン・金額列 x≈145
// - 少数型（dennkijidoushatyousho.pdf 等）: 「令和」「5年度決算額」が別トークン・
//   人工が「1.20人工」と単位ごと融合・丸マーカーが 〇（U+3007）
// → 行（同じ y）単位でトークンを x 順に結合し、ラベルの x 区間で値を切り出す（座標決め打ちしない）。
//
// 検証ゲート（throw = 静かに壊れない）:
// - 基本情報の**年度 = 令和6年度**（前年度調書の混入を止める — 発行元が R7 ページに
//   令和5年度の調書をリンクした実例あり・収集器の OVERRIDES 参照）
// - **会計コード = 10（一般会計）**（収集器のファイル名フィルタの二重チェック）
// - **事業コード = ファイル名の下5桁**（CMS の取り違え・差し替えミスを止める）
// - 金額行はちょうど4行・特定財源 ≤ 事業費・負値なし
// - 1 PDF = 1 事業（呼び出し側で件数 = ファイル数・事業コード重複を確認）
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Word {
  x: number;
  xEnd: number;
  y: number;
  text: string;
}

/** pdftotext -tsv の1ページぶんを単語座標へ（kawasaki-jigyou-hyouka と同じ流儀） */
function pageWords(filePath: string): Word[] {
  const tsv = execFileSync("pdftotext", ["-tsv", "-f", "1", "-l", "1", filePath, "-"], {
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

/** y が近い（±2pt）トークンを1行に束ねて x 順に並べる */
function rowsOf(words: Word[]): Word[][] {
  const sorted = [...words].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: Word[][] = [];
  for (const w of sorted) {
    const last = rows[rows.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) <= 2) last.push(w);
    else rows.push([w]);
  }
  for (const r of rows) r.sort((a, b) => a.x - b.x);
  return rows;
}

const compact = (s: string) => s.replace(/[\s　]/g, "");
const toHalfDigits = (s: string) =>
  s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/，/g, ",");

function toAmount(s: string, where: string): number {
  const n = Number(toHalfDigits(s).replace(/,/g, ""));
  if (!Number.isFinite(n)) throw new Error(`${where}: 金額を解釈できません: ${s}`);
  if (n < 0) throw new Error(`${where}: 金額が負値です: ${s}`);
  return n;
}

/** 行内でラベル（compact 一致）の x 区間 [after, before) にある数値トークンを1つ取る */
function numBetween(row: Word[], after: number, before: number, where: string): string | null {
  const cands = row.filter(
    (w) => w.x >= after && w.x < before && /^[\d,，０-９.]+$/.test(toHalfDigits(w.text)),
  );
  if (cands.length === 0) return null;
  if (cands.length > 1) {
    throw new Error(`${where}: 値の候補が${cands.length}個あります（${cands.map((c) => c.text).join(", ")}）`);
  }
  return cands[0]!.text;
}

function findLabel(row: Word[], label: string): Word | undefined {
  return row.find((w) => compact(w.text).includes(label));
}

interface MoneyRow {
  fy: string;
  kind: "決算" | "予算";
  jigyohi: number | null;
  tokuzai: number | null;
  ninku: number | null;
}

function parseChosho(filePath: string, filename: string): ProjectReportFact {
  const words = pageWords(filePath);
  if (words.length === 0) throw new Error(`${filename}: テキストが1トークンも取れません（画像PDF？）`);
  const rows = rowsOf(words);
  const rowCompact = (r: Word[]) => compact(r.map((w) => w.text).join(""));

  // ---- 基本情報（年度・会計コード・事業コード）----
  let projectCode: string | null = null;
  for (const r of rows) {
    const t = toHalfDigits(rowCompact(r));
    const m = t.match(/年度令和(\d{1,2})年度会計コード(\d{1,2})(\S*?)事業コード(\d{5})/);
    if (!m) continue;
    const [, nendo, kaikei, kaikeiName, code] = m;
    if (nendo !== "6") {
      throw new Error(`${filename}: 調書の年度が令和${nendo}年度です（R7 評価の対象は令和6年度 — 前年度調書の混入？）`);
    }
    if (kaikei !== "10" || !kaikeiName!.includes("一般会計")) {
      throw new Error(`${filename}: 会計が 10 一般会計 ではありません（${kaikei} ${kaikeiName}）`);
    }
    projectCode = code!;
    break;
  }
  if (!projectCode) throw new Error(`${filename}: 基本情報（年度・会計コード・事業コード）の行が見つかりません`);
  const nameCode = filename.match(/^\d{4}\d{2}(\d{5})(?:_\d+)?\.pdf$/)?.[1];
  if (nameCode && nameCode !== projectCode) {
    throw new Error(`${filename}: ファイル名の事業コード ${nameCode} と調書の ${projectCode} が一致しません（差し替えミス？）`);
  }

  // ---- 事業名 ----
  let name: string | null = null;
  for (const r of rows) {
    const label = r.find((w) => compact(w.text) === "事業名");
    if (!label) continue;
    const rest = r.filter((w) => w.x > label.xEnd).map((w) => w.text).join("");
    if (compact(rest)) {
      name = compact(rest);
      break;
    }
  }
  if (!name) throw new Error(`${filename}: 事業名が取れません`);

  // ---- 評価担当課（所属）----
  // 主流型はラベルが「所」「属」の2トークンに割れる（字間空白）→ 行全体で判定して
  // 「属」（最後のラベルトークン）より右を値として拾う
  let buka: string | null = null;
  for (const r of rows) {
    const rc = rowCompact(r);
    if (!rc.includes("評価担当課") || !rc.includes("所属")) continue;
    const shozoku = [...r].reverse().find((w) => compact(w.text) === "所属" || compact(w.text) === "属");
    if (!shozoku) continue;
    const denwa = findLabel(r, "電話番号");
    // 所属が空欄の調書が実在する（20251020344 公立保育所等運営費 — 電話番号も空）。
    // ラベル行があれば空文字を受ける。行そのものが無いときだけ throw（様式違いの検出）
    buka = r
      .filter((w) => w.x > shozoku.xEnd && (!denwa || w.x < denwa.x))
      .map((w) => w.text)
      .join(" ")
      .trim();
    break;
  }
  if (buka == null) throw new Error(`${filename}: 評価担当課（所属）の行が見つかりません`);

  // ---- 金額4行（令和N年度 決算額/予算額 ＋ うち特定財源 ＋ 正規職員業務量）----
  const money: MoneyRow[] = [];
  for (const r of rows) {
    const head = toHalfDigits(rowCompact(r)).match(/^令和(\d{1,2})年度(決算|予算)額/);
    if (!head) continue;
    const where = `${filename} 令和${head[1]}年度${head[2]}額`;
    const labelEnd = r.find((w) => /額$/.test(compact(w.text)))!.xEnd;
    const tokuzaiLabel = findLabel(r, "うち特定財源");
    const ninkuLabel = findLabel(r, "正規職員業務量");
    if (!tokuzaiLabel || !ninkuLabel) {
      throw new Error(`${where}: 「うち特定財源」「正規職員業務量」のラベルが行内にありません（様式が違う？）`);
    }
    const amountTok = numBetween(r, labelEnd, tokuzaiLabel.x, where);
    const tokuzaiTok = numBetween(r, tokuzaiLabel.xEnd, ninkuLabel.x, where);
    // 人工は少数型で「1.20人工」と融合する → ラベルより右のトークンから数値部を抜く
    const ninkuTok = r
      .filter((w) => w.x >= ninkuLabel.xEnd)
      .map((w) => toHalfDigits(compact(w.text)).match(/^([\d.]+)(?:人工)?$/)?.[1])
      .find((v) => v != null);
    const jigyohi = amountTok == null ? null : toAmount(amountTok, where);
    // ⚠ 特定財源 ≤ 事業費 のゲートは張れない — 人件費を職員費款に配賦する札幌の体系では
    // 特定財源が事業費を超える調書が実在する（types.ts の tokuteiZaigen のコメント参照）
    const tokuzai = tokuzaiTok == null ? null : toAmount(tokuzaiTok, where);
    money.push({
      fy: `R${head[1]}`,
      kind: head[2] as "決算" | "予算",
      jigyohi,
      tokuzai,
      ninku: ninkuTok == null ? null : Number(ninkuTok),
    });
  }
  if (money.length !== 4) {
    throw new Error(
      `${filename}: 金額行が4行ではありません（${money.length}行: ${money.map((m) => m.fy + m.kind).join(", ")}）`,
    );
  }
  const expected = ["R5決算", "R6予算", "R6決算", "R7予算"];
  const got = money.map((m) => m.fy + m.kind);
  if (got.join(",") !== expected.join(",")) {
    throw new Error(`${filename}: 金額行の構成が想定と違います（${got.join(", ")}）`);
  }

  return {
    no: projectCode,
    name,
    buka,
    kubun: null,
    implementation: null,
    grade: null, // R7 様式にカテゴリ評価は無い（見直し内容・方向性は自由記述）
    score: null,
    code: projectCode, // **年度をまたいで安定**（多年度化したとき経年追跡のキーになる）
    achievement: null,
    direction: null,
    cost: money.map((m) => ({
      fy: m.fy,
      kind: m.kind,
      jigyohi: m.jigyohi,
      ippanZaigen: null, // 事業費 − 特定財源 では出せない（特定財源が事業費を超える調書がある）
      tokuteiZaigen: m.tokuzai, // 「うち特定財源」の原文値
      totalCost: null, // 人件費込みコストは R7 様式に無い（人工のみ）
      jinkenhi: null,
      ninku: m.ninku,
    })),
    indicators: [], // 成果・活動指標は空欄が多く様式ゆらぎも大きい — 川崎・横浜と同じく未収録
    locator: { file: filename, page: 1 },
  };
}

export function parseSapporoJigyouHyouka(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const facts: ProjectReportFact[] = [];
  const seen = new Map<string, string>();
  for (const f of files) {
    const fact = parseChosho(f.path, f.filename);
    const dup = seen.get(fact.code!);
    if (dup) throw new Error(`事業コード ${fact.code} が重複しています（${dup} と ${f.filename}）`);
    seen.set(fact.code!, f.filename);
    facts.push(fact);
  }
  // 1 PDF = 1 事業。「マーカーの数 = 拾えた数」型のゲート（parseChosho が throw するので
  // 実質常に等しいが、将来 continue を入れたときに静かに欠けるのを防ぐ）
  if (facts.length !== files.length) {
    throw new Error(`${source.id}: 事業数 ${facts.length} がファイル数 ${files.length} と一致しません`);
  }
  if (facts.length === 0) throw new Error(`${source.id}: 事業が1件も抽出できませんでした`);
  return {
    docType: "project-report",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear, // R7 = 評価・公表年度
    targetFy: "R6", // 調書の年度欄（対象事業年度）。横浜と同じく1年ずれる
    facts,
  };
}
