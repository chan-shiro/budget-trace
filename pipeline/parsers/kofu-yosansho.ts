// 当初予算資料 PDF パーサ — 款別一覧（歳入・歳出）
//
// 甲府市の「歳入予算款別一覧」「歳出予算款別一覧」を起点に、類似市（豊川・山口ほか）の
// 「歳入予算（科目別）」「一般会計歳入（款別）」等にも対応する多自治体パーサ。
// PDF にテキスト層があるため pdftotext -layout（poppler）で決定的に抽出する。
//
// 行の形式（-layout 出力）:
//   "  3   民           生           費   38,933,883   37,479,942   1,453,941   42.42   3.88"
// 款名は字間スペース入り。数値トークンは自治体で並びが違うが、**小数（構成比・増減率）を
// 除いた整数列は必ず [当年度, 前年度, 増減額] の順**になるため、先頭2整数（当年度・前年度）を使う。
// 自治体差は parserOptions で吸収する: 見出し語・合計ラベル（甲府=「歳入合計」/豊川=「合計」）、
// 款番号の全角（豊川）・○接頭辞（山口）・負号 △/▲。
import { execFileSync } from "node:child_process";
import type { BudgetBookDoc, BudgetLineFact, BudgetProjectFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.2.0";

interface Options {
  /** 歳入款別一覧・歳出款別一覧の PDF ページ番号（1-origin） */
  revenuePage?: number;
  expenditurePage?: number;
  /** 「主な事業一覧」のページ範囲（1-origin・両端含む） */
  projectPages?: { from: number; to: number };
  /** 分冊形式（R2・R3）: 款別一覧表のファイル名。未指定なら単一ファイル */
  kanFile?: string;
  /** 分冊形式: 主な事業のファイル名 */
  projectsFile?: string;
  /**
   * 主な事業のレイアウト。"table"（R6〜: No/款/内容の表）または
   * "bullets"（R2・R3: ●事業名…金額 の箇条書き。款・連番なし）
   */
  projectFormat?: "table" | "bullets";
  /**
   * 表形式の列境界（X座標）。PDF の座標系が年度で違う場合に上書きする
   * （R5 の WARP 回収版は全体に右寄りのスケール）。省略時は R8 実測値
   */
  projectColumns?: { nameEnd: number; amountEnd: number; contentEnd: number; goalEnd: number };
  /**
   * 行の区切り方式。"midpoint"（既定・アンカーが行中央にある R8 系）または
   * "anchorTop"（アンカーが行上端寄りにある R5 の WARP 回収版）
   */
  projectRowBanding?: "midpoint" | "anchorTop";
  /**
   * 款別一覧ページの見出し語（空白除去で includes 判定するページ確認用）。
   * 既定は甲府の「歳入予算款別一覧」「歳出予算款別一覧」。
   * 豊川=「歳入予算」「歳出予算」、山口=「一般会計歳入」「一般会計歳出」など。
   */
  revenueHeading?: string;
  expenditureHeading?: string;
  /** 合計行のラベル。既定「歳入合計」「歳出合計」。豊川は歳入歳出とも「合計」 */
  revenueTotalLabel?: string;
  expenditureTotalLabel?: string;
}

/** 全角数字 → 半角（豊川の款番号が全角） */
const toHalfDigits = (s: string): string =>
  s.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0));

/** 金額トークンの正規表現（負号 △/▲ を許容） */
const AMOUNT_RE = /[△▲]?[\d,]+(?:\.\d+)?/g;

/** "1,234" / "△1,234" / "▲1,234" → number。構成比などの小数は対象外（呼び出し側で弾く） */
function toAmount(token: string): number {
  const neg = /^[△▲-]/.test(token);
  const n = Number(token.replace(/[△▲\-,]/g, ""));
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
  /** 前年度列の基準（R2 の一覧表は「6月補正後予算額」との比較） */
  prevBasis: "当初" | "補正後";
  /** 前年度列に関する資料注記（※〜。例: R6 の「6月補正における政策的予算を含む」） */
  prevNote?: string;
}

// 款名の収集から除外するヘッダ・注記の語
const KAN_HEADER_RE = /年度|予算額|一覧表|単位|構成比|増減|伸率|比較|^款$/;

function parseKanPage(
  filePath: string,
  filename: string,
  page: number,
  side: "revenue" | "expenditure",
  opts: Options = {},
): PageResult {
  const text = pdfPageText(filePath, page);
  const heading =
    side === "revenue"
      ? opts.revenueHeading ?? "歳入予算款別一覧"
      : opts.expenditureHeading ?? "歳出予算款別一覧";
  const headingCompact = heading.replace(/\s/g, "");
  if (!text.replace(/\s/g, "").includes(headingCompact)) {
    throw new Error(
      `${filename} p.${page}: 「${heading}」の見出しがありません。ページ構成が変わった可能性があるので parserOptions のページ番号・見出し語を確認してください。`,
    );
  }
  const totalLabel =
    side === "revenue"
      ? opts.revenueTotalLabel ?? "歳入合計"
      : opts.expenditureTotalLabel ?? "歳出合計";
  const prevBasis: "当初" | "補正後" = text.replace(/\s/g, "").includes("補正後予算額") ? "補正後" : "当初";
  const locator = { file: filename, page };

  const lines: BudgetLineFact[] = [];
  let total: number | null = null;
  let prevTotal: number | null = null;
  let prevNote: string | undefined;

  // 款名が2行に折り返し、款番号が単独行になるレイアウト（R2・R3 の一覧表）に
  // 対応するため、完結しない行の断片を空行まで持ち越して1款に組み立てる
  let pendNo: number | null = null;
  let pendName = "";
  const reset = () => {
    pendNo = null;
    pendName = "";
  };
  const emit = (kanNo: number, name: string, ints: string[], raw: string) => {
    if (!name) return;
    if (ints.length < 2) {
      throw new Error(`${filename} p.${page}: 款行の金額列を解釈できません: ${raw.trim()}`);
    }
    lines.push({
      side,
      kanNo,
      kanName: name,
      amount: toAmount(ints[0]!),
      prevAmount: toAmount(ints[1]!),
      locator,
    });
    reset();
  };

  // 款名の断片（折返し）に日本語（漢字・かな）が含まれるか。列見出し「Ａ ％ Ｂ」等の
  // 非日本語ノイズを款名に混ぜないためのガード
  const hasCJK = (s: string) => /[぀-ヿ㐀-鿿々〆ヶ]/.test(s);

  for (const rawOrig of text.split("\n")) {
    const raw = toHalfDigits(rawOrig); // 全角款番号（豊川）を半角化
    const compact = raw.replace(/[\s　]/g, "");
    if (compact === "") {
      reset(); // 行間の空行で断片を破棄（款は空行を挟まず連続する）
      continue;
    }
    // 合計行を先に判定する（見出しスキップより先。「歳入」等の短い見出し語は
    // 「歳入合計」の部分文字列なので、順序を誤ると合計行を取りこぼす）。
    // 構成比（小数）が金額の間に入る様式（豊川・山口・沼津）に対応するため小数を除く
    if (compact.includes(totalLabel)) {
      const ints = (raw.match(AMOUNT_RE) ?? []).filter((t) => !t.includes("."));
      const [t0, t1] = ints;
      if (t0 == null) {
        throw new Error(`${filename} p.${page}: 合計行を解釈できません: ${raw.trim()}`);
      }
      total = toAmount(t0);
      prevTotal = t1 != null ? toAmount(t1) : null;
      reset();
      continue;
    }
    if (headingCompact && compact.includes(headingCompact)) continue; // 見出し・節ラベル行
    if (compact.startsWith("※") && compact.includes("予算")) prevNote = compact.slice(1); // 前年列の注記
    if (KAN_HEADER_RE.test(compact)) continue; // 表ヘッダ・タイトル・注記

    // 款番号の単独行（折返し款の中間行）。○◎●の付番マーカーを許容
    const bare = compact.match(/^[○◎●]*(\d+)$/);
    if (bare) {
      if (pendNo == null) pendNo = Number(bare[1]);
      continue;
    }

    // 行頭の款番号（○ 2 のような付番マーカー接頭辞を許容）
    const lead = raw.match(/^\s*[○◎●]*\s*(\d+)\s/);
    const rest = lead ? raw.slice(raw.indexOf(lead[1]!) + lead[1]!.length) : raw;
    const tokens = rest.match(AMOUNT_RE) ?? [];
    const ints = tokens.filter((t) => !t.includes("."));
    const namePart = (tokens[0] != null ? rest.slice(0, rest.indexOf(tokens[0])) : rest)
      .replace(/[\s　]/g, "");

    if (lead && ints.length >= 2) {
      // 完結した款行（従来形式）。直前の折返し断片があれば款名の先頭に足す
      emit(Number(lead[1]), pendName + namePart, ints, raw);
    } else if (tokens.length === 0) {
      // 金額のない款名断片（折返しの上段/下段）。日本語断片のみ採る
      if (hasCJK(namePart)) pendName += namePart;
    } else if (pendNo != null && ints.length >= 2) {
      // 折返し款の金額行（行頭に款番号がない）
      emit(pendNo, pendName + namePart, ints, raw);
    }
    // 上記以外（ページ番号など）は無視
  }

  if (lines.length === 0) throw new Error(`${filename} p.${page}: 款行が1件も抽出できませんでした`);
  if (total == null) throw new Error(`${filename} p.${page}: ${totalLabel} 行が見つかりません`);
  return { lines, total, prevTotal, prevBasis, ...(prevNote ? { prevNote } : {}) };
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
  cols?: Options["projectColumns"],
  banding: "midpoint" | "anchorTop" = "midpoint",
): BudgetProjectFact[] {
  // 列境界（X座標）: [0,65)=区分 [65,nameEnd)=事業名 [nameEnd,amountEnd)=予算額
  // [amountEnd,contentEnd)=内容 [contentEnd,goalEnd)=基本目標 [goalEnd,∞)=施策
  const B = { nameEnd: 250, amountEnd: 310, contentEnd: 630, goalEnd: 685, ...(cols ?? {}) };
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

    // 行のY境界。midpoint = 隣接アンカーの中点（アンカーが行中央にある R8 系）。
    // anchorTop = 次のアンカーの少し上（アンカーが行上端寄り・行高が不揃いな R5 系）
    const centers = anchors.map((a) => a.y + a.h / 2);
    const bounds: number[] = [];
    if (banding === "anchorTop") {
      for (const c of centers) bounds.push(c - 6);
      bounds.push(centers[centers.length - 1]! + 150); // 最終行は十分な高さを確保
    } else {
      const firstGap = centers.length > 1 ? (centers[1]! - centers[0]!) / 2 : 30;
      bounds.push(centers[0]! - firstGap);
      for (let i = 1; i < anchors.length; i++) bounds.push((centers[i - 1]! + centers[i]!) / 2);
      const lastGap = centers.length > 1 ? (centers[centers.length - 1]! - centers[centers.length - 2]!) / 2 : 30;
      bounds.push(centers[centers.length - 1]! + lastGap);
    }

    for (let i = 0; i < anchors.length; i++) {
      const rowTop = bounds[i]!;
      const rowBottom = bounds[i + 1]!;
      const anchorY = centers[i]!;
      // この行の款 = 行より上にある最後の款見出し（無ければ前ページから持ち越し）
      const kanAbove = kanHeads.filter((k) => k.y < anchorY).pop();
      if (kanAbove) currentKan = kanAbove.name;
      if (!currentKan) throw new Error(`${filename} p.${page}: 款見出しが見つからないまま事業行が現れました`);

      const rowWordsAll = body.filter((w) => {
        const cy = w.y + w.h / 2;
        return cy >= rowTop && cy < rowBottom && w !== anchors[i];
      });

      // 予算額の候補（行帯全体から）。「上記のうち〜」の複合行（R5）では1つの No に
      // 親事業＋内数の子事業が縦に並び予算額が複数になるため、予算額のY中点で
      // 帯をサブ分割してそれぞれをエントリにする（子は no: null = 内数）
      const amountWords = rowWordsAll
        .filter((w) => w.x >= B.nameEnd && w.x < B.amountEnd && /^[\d,]/.test(w.text))
        .sort((a, b) => a.y - b.y);
      if (amountWords.length === 0) {
        throw new Error(`${filename} p.${page} No.${anchors[i]!.text}: 予算額列を特定できません（候補 0 件）`);
      }
      const subBounds: number[] = [rowTop];
      for (let k = 1; k < amountWords.length; k++) {
        subBounds.push((amountWords[k - 1]!.y + amountWords[k]!.y) / 2 + amountWords[k - 1]!.h / 2);
      }
      subBounds.push(rowBottom);

      amountWords.forEach((amountWord, sub) => {
        const subTop = subBounds[sub]!;
        const subBottom = subBounds[sub + 1]!;
        const rowWords = rowWordsAll.filter((w) => {
          const cy = w.y + w.h / 2;
          return cy >= subTop && cy < subBottom;
        });
        const inCol = (min: number, max: number) => rowWords.filter((w) => w.x >= min && w.x < max);

        const kubunWord = inCol(0, 65).find((w) => w.text === "新規" || w.text === "拡充");
        const nameWords = inCol(65, B.nameEnd);
        // 行間が詰まると予算額と内容の先頭が1語に結合されることがある
        // （例: "5,850「ベビージュエリー」…"）→ 先頭の数値だけを予算額とし、残りは内容列へ戻す
        const m = amountWord.text.match(/^([\d,]+)(.*)$/s)!;
        const restWord: Word | null = m[2] ? { ...amountWord, x: amountWord.x + 40, text: m[2] } : null;
        const contentWords = [
          ...rowWords.filter((w) => w.x >= B.amountEnd && w.x < B.contentEnd),
          ...(restWord ? [restWord] : []),
        ];
        const goalWords = inCol(B.contentEnd, B.goalEnd);
        const shisakuWords = inCol(B.goalEnd, 10_000);

        // 事業名等: 末尾の（ ）書きが予算書上の事業名、その前が表示名。
        // 表示名が（仮称）で始まったり（R7 No.21）、予算書名が入れ子括弧を含む
        // （例:（（仮称）〜整備事業費））ため、正規表現でなく末尾から括弧の
        // 対応を取って切り出す
        const fullName = joinWords(nameWords);
        let displayName = fullName;
        let bookName = "";
        if (fullName.endsWith("）")) {
          let depth = 0;
          for (let j = fullName.length - 1; j >= 0; j--) {
            const ch = fullName[j];
            if (ch === "）") depth++;
            else if (ch === "（") {
              depth--;
              if (depth === 0) {
                if (j > 0) {
                  displayName = fullName.slice(0, j);
                  bookName = fullName.slice(j + 1, -1);
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
          // 複合行の2段目以降（「上記のうち〜」の内数）は No を持たない
          no: sub === 0 ? Number(anchors[i]!.text) : null,
          kubun: kubunWord ? (kubunWord.text as "新規" | "拡充") : null,
          name: displayName,
          budgetBookName: bookName || null,
          amount: toAmount(m[1]!),
          description: joinWords(contentWords),
          // 複数目標は「・」連結（R8「ひと・まち」等）。R7・R6 の「基本構想の推進」は
          // セル内で2行に折り返されるため、連結後に戻す（年度クセ）
          basicGoal: goalWords.map((w) => w.text).join("・").replace("基本構想の・推進", "基本構想の推進"),
          shisaku: joinWords(shisakuWords),
          locator: { file: filename, page },
        });
      });
    }
    if (kanHeads.length > 0) currentKan = kanHeads[kanHeads.length - 1]!.name;
  }

  if (projects.length === 0) throw new Error(`${filename}: 主な事業が1件も抽出できませんでした`);
  return projects;
}

// ---- 主な事業（箇条書き形式・R2/R3） ------------------------------------------
// 「● 事業名 … N億M万円」の箇条書き。★（新規）・◆（繰越等）の補足行が続くことがある。
// 「基本目標 N 見出し」「施策の柱 見出し」「基本構想の推進」で章立てされる。
// 款・掲載番号・予算書名の記載は無い（kan / no / budgetBookName は null）。
// 字間スペース入りのため、行は空白を全除去してから解釈する。
function parseProjectBullets(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  // 補足行はエントリより後の行に現れるため、いったん desc 配列に溜めて最後に結合する
  const drafts: { fact: Omit<BudgetProjectFact, "description">; desc: string[] }[] = [];
  let basicGoal = "";
  let basicGoalLabel = "";
  let shisaku = "";
  // 直近のエントリ（補足行の追記先）
  let curDesc: string[] | null = null;

  // "2億9,307万円" → 千円
  const toThousandYen = (s: string): number => {
    const m = s.match(/^(?:([\d,]+)億)?(?:([\d,]+)万)?円$/);
    if (!m || (m[1] == null && m[2] == null)) throw new Error(`${filename}: 金額を解釈できません: ${s}`);
    const oku = m[1] ? Number(m[1].replace(/,/g, "")) : 0;
    const man = m[2] ? Number(m[2].replace(/,/g, "")) : 0;
    return oku * 100_000 + man * 10;
  };

  for (let page = from; page <= to; page++) {
    const text = pdfPageText(filePath, page);
    for (const raw of text.split("\n")) {
      const compact = raw.replace(/[\s　]/g, "");
      if (compact === "") continue;

      // 章見出し
      const goalM = compact.match(/^基本目標(\d)(.*)$/);
      if (goalM) {
        basicGoal = `基本目標${goalM[1]}`;
        basicGoalLabel = goalM[2] ?? "";
        shisaku = "";
        curDesc = null;
        continue;
      }
      if (/^基本構想の推進/.test(compact)) {
        basicGoal = "基本構想の推進";
        basicGoalLabel = "";
        shisaku = "";
        curDesc = null;
        continue;
      }
      const shisakuM = compact.match(/^施策の柱(.*)$/);
      if (shisakuM) {
        shisaku = shisakuM[1] ?? "";
        curDesc = null;
        continue;
      }

      const marker = compact[0];
      const isBullet = marker === "●" || marker === "◆" || marker === "★";
      const body = isBullet ? compact.slice(1) : compact;

      // エントリ行: 「事業名…金額円」
      const entryM = isBullet ? body.match(/^(.+?)…((?:[\d,]+億)?(?:[\d,]+万)?円)/) : null;
      if (entryM) {
        if (!basicGoal) throw new Error(`${filename} p.${page}: 章見出しの前に事業行が現れました: ${compact}`);
        const desc: string[] = [];
        drafts.push({
          fact: {
            kan: null,
            no: null,
            kubun: marker === "◆" ? "繰越" : null,
            name: entryM[1]!,
            budgetBookName: null,
            amount: toThousandYen(entryM[2]!),
            basicGoal,
            ...(basicGoalLabel ? { basicGoalLabel } : {}),
            shisaku,
            locator: { file: filename, page },
          },
          desc,
        });
        curDesc = desc;
        continue;
      }

      // 補足行（★/◆ で始まる金額なし行）または直前行の折返し
      if (curDesc != null) {
        if (isBullet) curDesc.push(compact);
        else if (curDesc.length > 0) curDesc[curDesc.length - 1] += compact;
        // エントリ直後の無印行（見出し前の前文など）は curDesc が空なら無視
      }
    }
  }

  if (drafts.length === 0) throw new Error(`${filename}: 主な事業が1件も抽出できませんでした`);
  return drafts.map(({ fact, desc }) => ({ ...fact, description: desc.join("／") }));
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
  // 単一ファイル形式（R6〜）または分冊形式（R2・R3: kanFile / projectsFile を指定）
  const pick = (name: string | undefined, role: string) => {
    if (name == null) {
      if (files.length !== 1) {
        throw new Error(
          `${source.id}: ファイルが ${files.length} 件あります。分冊形式なら parserOptions.kanFile / projectsFile で${role}のファイル名を指定してください`,
        );
      }
      return files[0]!;
    }
    const f = files.find((x) => x.filename === name);
    if (!f) throw new Error(`${source.id}: ${role}のファイル ${name} が raw にありません`);
    return f;
  };
  const kanFile = pick(opts.kanFile, "款別一覧");
  const projFile = pick(opts.projectsFile, "主な事業");

  const rev = parseKanPage(kanFile.path, kanFile.filename, revenuePage, "revenue", opts);
  const exp = parseKanPage(kanFile.path, kanFile.filename, expenditurePage, "expenditure", opts);
  if (rev.prevBasis !== exp.prevBasis) {
    throw new Error(`${source.id}: 歳入と歳出で前年度列の基準が違います（${rev.prevBasis} / ${exp.prevBasis}）`);
  }
  const projects = opts.projectPages
    ? (opts.projectFormat ?? "table") === "bullets"
      ? parseProjectBullets(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
      : parseProjectPages(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to, opts.projectColumns, opts.projectRowBanding ?? "midpoint")
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
    prevBasis: rev.prevBasis,
    ...(exp.prevNote ?? rev.prevNote ? { prevNote: exp.prevNote ?? rev.prevNote } : {}),
    facts: [...rev.lines, ...exp.lines],
    ...(projects ? { projects } : {}),
  };
}
