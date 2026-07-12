// 甲府市「当初予算（案）資料」PDF パーサ — 款別一覧（歳入・歳出）
//
// 対象は「一般会計歳入予算款別一覧」「一般会計歳出予算款別一覧」のページ。
// PDF にテキスト層があるため pdftotext -layout（poppler）で決定的に抽出する。
// LLM 併用が要る「主な事業一覧」ページは別パーサとして今後追加する。
//
// 行の形式（-layout 出力）:
//   "  3   民           生           費   38,933,883   37,479,942   1,453,941   42.42   3.88"
// 款名は字間スペース入り。数値トークンは [款番号, 当年度, 前年度, 増減額, 構成比, 増減率] の順で、
// 増減額が空欄の行（災害復旧費・予備費など）もある。先頭3トークンだけを使う。
import { execFileSync } from "node:child_process";
import type { BudgetBookDoc, BudgetLineFact, BudgetProjectFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.2.0";

interface Options {
  /** 歳入款別一覧・歳出款別一覧の PDF ページ番号（1-origin） */
  revenuePage?: number;
  expenditurePage?: number;
  /** 「主な事業一覧」のページ範囲（1-origin・両端含む） */
  projectPages?: { from: number; to: number };
}

/** "1,234" / "△1,234" → number。構成比などの小数は対象外（呼び出し側で弾く） */
function toAmount(token: string): number {
  const neg = token.startsWith("△") || token.startsWith("-");
  const n = Number(token.replace(/[△\-,]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${token}`);
  return neg ? -n : n;
}

function pdfPageText(filePath: string, page: number): string {
  try {
    return execFileSync(
      "pdftotext",
      ["-f", String(page), "-l", String(page), "-layout", filePath, "-"],
      { encoding: "utf8" },
    );
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("pdftotext が見つかりません。poppler を入れてください（brew install poppler）");
    }
    throw e;
  }
}

interface PageResult {
  lines: BudgetLineFact[];
  total: number;
  prevTotal: number | null;
}

function parseKanPage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
): PageResult {
  const text = pdfPageText(filePath, page);
  const expectTitle = side === "revenue" ? "歳入予算款別一覧" : "歳出予算款別一覧";
  if (!text.replace(/\s/g, "").includes(expectTitle)) {
    throw new Error(
      `${filename} p.${page}: 「${expectTitle}」の見出しがありません。ページ構成が変わった可能性があるので parserOptions のページ番号を確認してください。`,
    );
  }
  const totalLabel = side === "revenue" ? "歳入合計" : "歳出合計";
  const locator = { file: filename, page };

  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  for (const raw of text.split("\n")) {
    const tokens = raw.match(/△?[\d,]+(?:\.\d+)?/g) ?? [];
    const compact = raw.replace(/[\s　]/g, "");

    const [t0, t1, t2] = tokens;

    if (compact.includes(totalLabel)) {
      if (t0 == null || t1 == null || t0.includes(".")) {
        throw new Error(`${filename} p.${page}: 合計行を解釈できません: ${raw.trim()}`);
      }
      total = toAmount(t0);
      prevTotal = t1.includes(".") ? null : toAmount(t1);
      continue;
    }

    // 款行: 行頭が款番号で、数値トークンが [款番号, 当年度, 前年度, …]
    if (!/^\s*\d+\s/.test(raw) || t0 == null || t1 == null || t2 == null) continue;
    if (t1.includes(".") || t2.includes(".")) {
      throw new Error(`${filename} p.${page}: 款行の金額列を解釈できません: ${raw.trim()}`);
    }
    const kanNo = Number(t0);
    // 款名 = 款番号の直後から当年度額の手前まで（字間スペースを除去）
    const afterNo = raw.slice(raw.indexOf(t0) + t0.length);
    const name = afterNo.slice(0, afterNo.indexOf(t1)).replace(/[\s　]/g, "");
    if (!name) continue; // ページ番号などの数値だけの行
    lines.push({
      side,
      kanNo,
      kanName: name,
      amount: toAmount(t1),
      prevAmount: toAmount(t2),
      locator,
    });
  }

  if (lines.length === 0) throw new Error(`${filename} p.${page}: 款行が1件も抽出できませんでした`);
  if (total == null) throw new Error(`${filename} p.${page}: ${totalLabel} 行が見つかりません`);
  return { lines, total, prevTotal };
}

// ---- 主な事業一覧（p.14-23 想定）のレイアウト抽出 -----------------------------
// pdftotext -tsv の単語座標で列を判別する。列のX範囲は資料の実測値
// （No: <45 / 区分: <65 / 事業名等: <300 / 予算額: 右揃え・右端 300-330 /
//   内容: <630 / 基本目標: <685 / 施策: それ以降）。
// 基本目標列の左端は年度で揺れる（R8: x≈652 / R7・R6: x≈641）ため境界は 630。
// 行は No. のY中心の中点で区切り、款は見出しフォント（高さ>=12pt）の
// 「N款 ○○費」で追跡する（款は次ページへ持ち越し）。

interface Word {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
}

function pdfPageWords(filePath: string, page: number): Word[] {
  const out = execFileSync(
    "pdftotext",
    ["-f", String(page), "-l", String(page), "-tsv", filePath, "-"],
    { encoding: "utf8" },
  );
  const words: Word[] = [];
  for (const line of out.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12 || c[0] !== "5" || c[11]!.startsWith("###")) continue;
    words.push({ x: +c[6]!, y: +c[7]!, w: +c[8]!, h: +c[9]!, text: c[11]! });
  }
  return words;
}

/** 同じ行（Y が近い）の単語を結合。日本語は詰め、英数字同士は空白を挟む */
function joinWords(words: Word[]): string {
  const lines: Word[][] = [];
  for (const w of [...words].sort((a, b) => a.y - b.y || a.x - b.x)) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) < 4) last.push(w);
    else lines.push([w]);
  }
  return lines
    .map((line) =>
      line
        .sort((a, b) => a.x - b.x)
        .reduce((acc, w) => {
          const sep = /[A-Za-z0-9)）]$/.test(acc) && /^[A-Za-z0-9(（]/.test(w.text) ? " " : "";
          return acc + sep + w.text;
        }, ""),
    )
    .join("");
}

// 表ヘッダの語。R8 は「基本/目標」「施策」、R7・R6 は「基本/目標等」「施策等」と年度で揺れる
const HEADER_TOKENS = new Set(["№", "No.", "区分", "事業名等", "予算額", "（千円）", "内容", "基本", "目標", "目標等", "施策", "施策等"]);

function parseProjectPages(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const projects: BudgetProjectFact[] = [];
  let currentKan = ""; // 款はページをまたいで持ち越す

  for (let page = from; page <= to; page++) {
    const words = pdfPageWords(filePath, page);

    // セクション見出し（大きいフォント）: 「2款 総務費」（2語）または
    // 「介護保険事業特別会計」のような特別会計見出し（1語）。Y位置とともに記録
    const kanHeads: { y: number; name: string }[] = [];
    const headWords = words.filter((w) => w.h >= 12).sort((a, b) => a.y - b.y || a.x - b.x);
    for (let i = 0; i < headWords.length; i++) {
      const t = headWords[i]!.text;
      if (/^\d+款$/.test(t)) {
        const name = headWords[i + 1];
        if (name && Math.abs(name.y - headWords[i]!.y) < 6) {
          kanHeads.push({ y: headWords[i]!.y, name: name.text });
        }
      } else if (/会計$/.test(t)) {
        kanHeads.push({ y: headWords[i]!.y, name: t });
      }
    }

    // 表の中身になり得る単語（見出しフォント・表ヘッダ・欄外を除外）
    const body = words.filter(
      (w) => w.h < 12 && !HEADER_TOKENS.has(w.text) && !/^※/.test(w.text),
    );

    // 行アンカー = No 列の数値
    const anchors = body
      .filter((w) => /^\d+$/.test(w.text) && w.x < 45)
      .sort((a, b) => a.y - b.y);
    if (anchors.length === 0) {
      if (kanHeads.length > 0) currentKan = kanHeads[kanHeads.length - 1]!.name;
      continue;
    }

    // 行のY境界 = 隣接アンカーの中点。先頭行の上端・末尾行の下端は隣の行幅から外挿
    const centers = anchors.map((a) => a.y + a.h / 2);
    const bounds: number[] = [];
    const firstGap = centers.length > 1 ? (centers[1]! - centers[0]!) / 2 : 30;
    bounds.push(centers[0]! - firstGap);
    for (let i = 1; i < anchors.length; i++) bounds.push((centers[i - 1]! + centers[i]!) / 2);
    const lastGap = centers.length > 1 ? (centers[centers.length - 1]! - centers[centers.length - 2]!) / 2 : 30;
    bounds.push(centers[centers.length - 1]! + lastGap);

    for (let i = 0; i < anchors.length; i++) {
      const rowTop = bounds[i]!;
      const rowBottom = bounds[i + 1]!;
      const anchorY = centers[i]!;
      // この行の款 = 行より上にある最後の款見出し（無ければ前ページから持ち越し）
      const kanAbove = kanHeads.filter((k) => k.y < anchorY).pop();
      if (kanAbove) currentKan = kanAbove.name;
      if (!currentKan) throw new Error(`${filename} p.${page}: 款見出しが見つからないまま事業行が現れました`);

      const rowWords = body.filter((w) => {
        const cy = w.y + w.h / 2;
        return cy >= rowTop && cy < rowBottom && w !== anchors[i];
      });
      const inCol = (min: number, max: number) => rowWords.filter((w) => w.x >= min && w.x < max);

      const kubunWord = inCol(0, 65).find((w) => w.text === "新規" || w.text === "拡充");
      const nameWords = inCol(65, 250);
      // 予算額は右揃えで左端が x∈[250,310)。行間が詰まると内容の先頭と1語に
      // 結合されることがあるため（例: "5,850「ベビージュエリー」…"）、
      // 先頭の数値だけを予算額とし、残りは内容列へ戻す
      const amountCands: { amount: string; rest: Word | null }[] = [];
      const amountSrc = new Set<Word>();
      for (const w of rowWords) {
        if (w.x < 250 || w.x >= 310) continue;
        const m = w.text.match(/^([\d,]+)(.*)$/s);
        if (!m) continue;
        amountSrc.add(w);
        amountCands.push({
          amount: m[1]!,
          rest: m[2] ? { ...w, x: w.x + 40, text: m[2] } : null,
        });
      }
      const contentWords = [
        ...rowWords.filter((w) => w.x >= 310 && w.x < 630 && !amountSrc.has(w)),
        ...amountCands.flatMap((c) => (c.rest ? [c.rest] : [])),
      ];
      const goalWords = inCol(630, 685);
      const shisakuWords = inCol(685, 10_000);

      if (amountCands.length !== 1) {
        throw new Error(
          `${filename} p.${page} No.${anchors[i]!.text}: 予算額列を一意に特定できません（候補 ${amountCands.length} 件: ${amountCands.map((c) => c.amount).join(", ")}）`,
        );
      }
      // 事業名等: 末尾の（ ）書きが予算書上の事業名、その前が表示名。
      // 表示名が（仮称）で始まったり（R7 No.21）、予算書名が入れ子括弧を含む
      // （例:（（仮称）〜整備事業費））ため、正規表現でなく末尾から括弧の
      // 対応を取って切り出す
      const fullName = joinWords(nameWords);
      let displayName = fullName;
      let bookName = "";
      if (fullName.endsWith("）")) {
        let depth = 0;
        for (let i = fullName.length - 1; i >= 0; i--) {
          const ch = fullName[i];
          if (ch === "）") depth++;
          else if (ch === "（") {
            depth--;
            if (depth === 0) {
              if (i > 0) {
                displayName = fullName.slice(0, i);
                bookName = fullName.slice(i + 1, -1);
              }
              break;
            }
          }
        }
      }
      if (!displayName) {
        throw new Error(`${filename} p.${page} No.${anchors[i]!.text}: 事業名が抽出できません`);
      }

      projects.push({
        kan: currentKan,
        no: Number(anchors[i]!.text),
        kubun: kubunWord ? (kubunWord.text as "新規" | "拡充") : null,
        name: displayName,
        budgetBookName: bookName || null,
        amount: toAmount(amountCands[0]!.amount),
        description: joinWords(contentWords),
        // 複数目標は「・」連結（R8「ひと・まち」等）。R7・R6 の「基本構想の推進」は
        // セル内で2行に折り返されるため、連結後に戻す（年度クセ）
        basicGoal: goalWords.map((w) => w.text).join("・").replace("基本構想の・推進", "基本構想の推進"),
        shisaku: joinWords(shisakuWords),
        locator: { file: filename, page },
      });
    }
    if (kanHeads.length > 0) currentKan = kanHeads[kanHeads.length - 1]!.name;
  }

  if (projects.length === 0) throw new Error(`${filename}: 主な事業が1件も抽出できませんでした`);
  return projects;
}

export function parseKofuYosansho(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  const revenuePage = opts.revenuePage;
  const expenditurePage = opts.expenditurePage;
  if (!revenuePage || !expenditurePage) {
    throw new Error(
      `${source.id}: parserOptions.revenuePage / expenditurePage（款別一覧の PDF ページ番号）が必要です`,
    );
  }
  // 予算資料 PDF は1ファイル想定（複数登録されていたら先頭を使う前提にせずエラー）
  if (files.length !== 1) {
    throw new Error(`${source.id}: 予算資料 PDF は1ファイルを想定しています（現在 ${files.length} 件）`);
  }
  const [file] = files;

  const rev = parseKanPage(file.path, file.filename, revenuePage, "revenue");
  const exp = parseKanPage(file.path, file.filename, expenditurePage, "expenditure");
  const projects = opts.projectPages
    ? parseProjectPages(file.path, file.filename, opts.projectPages.from, opts.projectPages.to)
    : undefined;

  return {
    docType: "budget-book",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    account: "一般会計",
    revenueTotal: rev.total,
    expenditureTotal: exp.total,
    prevRevenueTotal: rev.prevTotal,
    prevExpenditureTotal: exp.prevTotal,
    facts: [...rev.lines, ...exp.lines],
    ...(projects ? { projects } : {}),
  };
}
