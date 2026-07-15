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
  /**
   * 1側の表が複数ページにまたがる様式（横浜 歳入 p.3-4・川崎 歳入 p.5-6）。
   * 範囲内のページを**連結してから**1つの表として読む（合計行は最終ページにしか無く、
   * 単ページで読むと「合計行が見つかりません」で落ちるため）。
   * revenuePage（単数）との併用は不可。両端を含む。
   */
  revenuePages?: { from: number; to: number };
  expenditurePages?: { from: number; to: number };
  /**
   * 表ヘッダ語彙の**側ごとの**追加（`KAN_HEADER_RE` に `|` で足す正規表現ソース）。
   *
   * ヘッダが多段になり、`年度|予算額|…` のどれにも当たらない行が残る様式のためのもの。
   * 放置すると**款名の断片として溜まり、そのページ先頭の款名の頭に付く**。
   * 金額と Σ は正しいままなので**検証ゲートを素通りする**（横浜「千円千円千円市税」型）。
   *
   * **側で分けているのは語彙が款名と衝突するから**。神戸の歳出は財源内訳のヘッダに
   * `国庫支出金 県支出金 地方債 その他` が並ぶが、これらは**歳入では実在する款名**なので、
   * 共通の `KAN_HEADER_RE` に足すと歳入の款18・款19 が消える。
   */
  revenueHeaderExtra?: string;
  expenditureHeaderExtra?: string;
  /** 「主な事業一覧」のページ範囲（1-origin・両端含む） */
  projectPages?: { from: number; to: number };
  /** 分冊形式（R2・R3）: 款別一覧表のファイル名。未指定なら単一ファイル */
  kanFile?: string;
  /** 分冊形式: 主な事業のファイル名 */
  projectsFile?: string;
  /**
   * 主な事業のレイアウト。
   * - "table"（甲府 R6〜: No/款/内容の座標ベース表）
   * - "bullets"（甲府 R2・R3: ●事業名…金額 の箇条書き。款・連番なし）
   * - "coded-sections"（豊川: N款 費目 / 【課】/ n 事業名［款項目事業コード］当年度 前年度）
   * - "marked-bullets"（和泉: 拡/新 ◎ 事業名 … 予算額 千円 の重点事業リスト。款・前年度なし）
   * - "table-lines"（山口: 事業名 予算額 内容 担当課 の事業別表。施策見出しつき・款/前年度なし）
   */
  projectFormat?: "table" | "bullets" | "coded-sections" | "marked-bullets" | "table-lines" | "pref-bullets" | "dept-bullets" | "coord-table";
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
  /** 歳入と歳出が同一ページに縦積み（南アルプス等）。revenuePage=expenditurePage で指定 */
  samePage?: boolean;
  /**
   * 前年度列の基準を明示的に上書きする。既定は資料本文の「補正後予算額」の有無で自動判定するが、
   * **資料に何も書いていないのに前年度列が当初でない**ことがあり、その場合は自動判定が
   * 「当初」と誤り、画面に「前年当初比」と偽って出る（＝黙って嘘をつく）。
   * 実例: 札幌 R6・R2。市長選の年（R5・R1）の当初予算は**骨格予算**で、翌年度の説明書は
   * 前年度の**肉付後**予算額を前年度列に置くが、資料には骨格/肉付の記載が一切ない。
   * 裏取りは補正予算資料（R5 補正の概要「補正後予算額は…1兆2,442億円」= R6 の前年度列 1,244,185,321千円）。
   * **次は R10（R9=2027年4月が選挙年）で再発する。**
   * 上書きするときは必ず prevNote で根拠を書き、画面に基準を明示すること。
   */
  prevBasis?: "当初" | "補正後";
  /**
   * 前年度列に関する注記を明示的に与える。既定は本文の `※〜` 行から拾うが、
   * **資料に注記が無いが事実として注記が要る**場合（上記の骨格予算）に使う。
   */
  prevNote?: string;
}

/** 全角数字・全角カンマ → 半角（豊川の款番号・北杜の小計見出しが全角） */
const toHalfDigits = (s: string): string =>
  s.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/，/g, ",");

/** CJK（かな・漢字）を含むか。事業名判定に使う */
const hasCJKChars = (s: string): boolean => /[぀-ヿ㐀-鿿々〆ヶ]/.test(s);

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

/** 全角数字・全角カンマ → 半角 */
const toHalfNum = (s: string): string =>
  s.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/，/g, ",");

interface PageResult {
  lines: BudgetLineFact[];
  total: number;
  prevTotal: number | null;
  /** 前年度列の基準（R2 の一覧表は「6月補正後予算額」との比較） */
  prevBasis: "当初" | "補正後";
  /** 前年度列に関する資料注記（※〜。例: R6 の「6月補正における政策的予算を含む」） */
  prevNote?: string;
}

// 款名の収集から除外するヘッダ・注記の語（「区分」「款名称」は款の列見出し語で款名ではない）。
// 「款名称」は単独行に置かれ、`^款$` は完全一致なので当たらず款1に連結される（富士河口湖町）。
const KAN_HEADER_RE = /年度|予算額|一覧表|単位|構成比|増減|伸率|比較|区分|款名称|^款$/;

function parseKanPage(
  filePath: string,
  filename: string,
  pages: number[],
  side: "revenue" | "expenditure",
  opts: Options = {},
): PageResult {
  // 複数ページは連結して1つの表として読む（合計行は最終ページにしかない）。
  // locator は先頭ページ（エビデンスはその表の始まりを指す）
  const page = pages[0]!;
  const pageLabel = pages.length > 1 ? `p.${pages[0]}-${pages[pages.length - 1]}` : `p.${page}`;
  // 側ごとの表ヘッダ語彙の追加（Options.revenueHeaderExtra / expenditureHeaderExtra 参照）
  const extraHeader = side === "revenue" ? opts.revenueHeaderExtra : opts.expenditureHeaderExtra;
  const headerRe = extraHeader ? new RegExp(`${KAN_HEADER_RE.source}|${extraHeader}`) : KAN_HEADER_RE;
  let text = pages.map((p) => pdfPageText(filePath, p)).join("\n");
  const heading =
    side === "revenue"
      ? opts.revenueHeading ?? "歳入予算款別一覧"
      : opts.expenditureHeading ?? "歳出予算款別一覧";
  const headingCompact = heading.replace(/\s/g, "");
  if (!text.replace(/\s/g, "").includes(headingCompact)) {
    throw new Error(
      `${filename} ${pageLabel}: 「${heading}」の見出しがありません。ページ構成が変わった可能性があるので parserOptions のページ番号・見出し語を確認してください。`,
    );
  }
  const totalLabel =
    side === "revenue"
      ? opts.revenueTotalLabel ?? "歳入合計"
      : opts.expenditureTotalLabel ?? "歳出合計";
  // samePage: 歳入と歳出が同一ページに縦積み（南アルプス等）。合計行で2区画に割り、
  // revenue=1つ目の合計まで / expenditure=1つ目の合計の次〜2つ目の合計 を処理する。
  // 両区画の合計ラベルが同じ（「合計」）様式に対応するため、totalLabel 出現位置で切る。
  if (opts.samePage) {
    const all = text.split("\n");
    const totalIdxs = all
      .map((l, i) => ({ c: l.replace(/[\s　]/g, ""), i }))
      .filter((x) => x.c.includes(totalLabel))
      .map((x) => x.i);
    if (totalIdxs.length < 2) {
      throw new Error(`${filename} ${pageLabel}: samePage 指定だが「${totalLabel}」行が2つ見つかりません（${totalIdxs.length}件）`);
    }
    const [t1, t2] = totalIdxs;
    text = (side === "revenue" ? all.slice(0, t1! + 1) : all.slice(t1! + 1, t2! + 1)).join("\n");
  }
  // 前年度列の基準。既定は本文の「補正後予算額」の有無で判定するが、資料が基準を書いていない
  // ことがある（札幌 R6・R2 の骨格予算 → 肉付後）ので parserOptions で上書きできる。
  // 上書きは「資料に書いていない事実」を入れる操作なので、registry 側に根拠を必ず書く。
  const prevBasis: "当初" | "補正後" =
    opts.prevBasis ?? (text.replace(/\s/g, "").includes("補正後予算額") ? "補正後" : "当初");
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
  // 款名が金額行の**下**へ折り返す様式（名古屋・札幌・福岡の中央寄せ3行型）:
  //   "     国有提供施設等所在"      ← 上段
  //   "4                  3,000 …"   ← 款行（名前欄が空）
  //   "     市町村助成交付金"        ← 下段 ★これが次の款へ漏れていた
  //   "5    地方特例交付金  …"
  // 款行の名前欄が空だった款だけを「下段待ち」にし、続く日本語断片をその款名の末尾に足す。
  // 名前欄が非空の款（＝行内で名前が完結）は下段待ちにしないので、上段折返し
  // （"国有提供施設等所在" + "4 市町村助成交付金 3,000"）の既存挙動は変わらない。
  let openLine: BudgetLineFact | null = null;
  const emit = (kanNo: number, name: string, ints: string[], raw: string, awaitTail = false) => {
    if (!name) return;
    if (ints.length < 2) {
      throw new Error(`${filename} ${pageLabel}: 款行の金額列を解釈できません: ${raw.trim()}`);
    }
    // 「整数列は必ず [当年度, 前年度, 比較] の順」という前提は、**セルが空**だと崩れる。
    // 当年度に新設された款は前年度欄が空欄のまま伸率欄に「皆増」と書かれ、ints が
    // [当年度, 比較] の2個になるため、ints[1]（＝比較）を前年度として読んでしまう。
    //   甲府 R2 款6: `6 法人事業税交付金  190,691          190,691  0.26  皆増`
    //   → prevAmount=190,691（正: 0）。当年度は正しいので validate も素通りしていた。
    // 皆増/皆減は「相手側のセルが 0」を意味する原典の記号なので、列位置を推測せずこれを使う。
    // （札幌 R8 の `0 0.0 694,000 0.1 △694,000 皆減` のように 0 が明記されている様式とも矛盾しない）
    const compactRaw = raw.replace(/[\s　]/g, "");
    const zeroPrev = compactRaw.includes("皆増"); // 前年度は 0（当年度に新設）
    const zeroAmount = compactRaw.includes("皆減"); // 当年度は 0（廃止）
    const line: BudgetLineFact = {
      side,
      kanNo,
      kanName: name,
      amount: zeroAmount ? 0 : toAmount(ints[0]!),
      prevAmount: zeroPrev ? 0 : toAmount(ints[1]!),
      locator,
    };
    lines.push(line);
    reset();
    openLine = awaitTail ? line : null;
  };

  // 款名の断片（折返し）に日本語（漢字・かな）が含まれるか。列見出し「Ａ ％ Ｂ」等の
  // 非日本語ノイズを款名に混ぜないためのガード
  const hasCJK = (s: string) => /[぀-ヿ㐀-鿿々〆ヶ]/.test(s);

  // 単位だけの行（横浜「千円 千円 千円」）は款名の断片ではない。KAN_HEADER_RE に「千円」を
  // 足して行ごと弾くことはできない — 款行に単位がインラインで入る様式（`35,300,000 千円`）を
  // 巻き添えにするため。断片として溜まるのを防ぐ形で弾く（「単位:千円」型は KAN_HEADER_RE 側）
  const isUnitOnly = (s: string) => /^(?:千円|百万円|円)+$/.test(s);

  // 本物の合計行を先に特定する。合計ラベルを含む行のうち**整数金額が最も多い**行が本物
  // （北杜の見出し「歳入合計 34,786,332千円」＝1個、大月の注記「合計が100%…」＝1個は除外され、
  // 本体の合計行＝当年度/前年度/増減の3個以上が選ばれる）。以降のドーナツ凡例・注記を款に
  // 誤認しないよう、款のパースは合計行の手前で打ち切る。
  const allLines = text.split("\n").map((l) => toHalfDigits(l));
  let totalIdx = allLines.length;
  {
    let bestInts = 1; // 最低2個の整数金額（当年度＋前年度）を要求
    allLines.forEach((raw, i) => {
      if (!raw.replace(/[\s　]/g, "").includes(totalLabel)) return;
      const ints = (raw.match(AMOUNT_RE) ?? []).filter((t) => !t.includes("."));
      if (ints.length > bestInts) {
        bestInts = ints.length;
        totalIdx = i;
        total = toAmount(ints[0]!);
        prevTotal = ints[1] != null ? toAmount(ints[1]!) : null;
      }
    });
  }

  // 前年列の注記（※〜）は**合計行の後**に置かれる（甲府 R6 は合計行の直下）。款パースは
  // 合計行の手前で打ち切るので、注記はその打切りとは独立に全行から拾う。
  // （fd3a500 で打切りを入れた際、この注記ごと切り落としていた — 2026-07-15 修正）
  for (const l of allLines) {
    const c = l.replace(/[\s　]/g, "");
    if (c.startsWith("※") && c.includes("予算")) { prevNote = c.slice(1); break; }
  }

  for (let li = 0; li < allLines.length; li++) {
    if (li >= totalIdx) break; // 合計行以降（凡例・注記）は款ではない
    const raw = allLines[li]!; // 全角款番号（豊川）を半角化済み
    const compact = raw.replace(/[\s　]/g, "");
    if (compact === "") {
      reset(); // 行間の空行で断片を破棄（款は空行を挟まず連続する）
      openLine = null; // 下段折返しは款行の直後に来る。空行を挟んだら別物
      continue;
    }
    // 合計行を先に判定する（見出しスキップより先。「歳入」等の短い見出し語は
    // 「歳入合計」の部分文字列なので、順序を誤ると合計行を取りこぼす）。
    // 構成比（小数）が金額の間に入る様式（豊川・山口・沼津）に対応するため小数を除く
    if (compact.includes(totalLabel)) {
      // 本物の合計は pre-scan で確定済み。ここに来るのは合計行より前にある
      // 見出し（北杜「歳入合計 34,786,332千円」）等なので、款にせず読み飛ばすだけ。
      reset();
      continue;
    }
    if (headingCompact && compact.includes(headingCompact)) continue; // 見出し・節ラベル行
    if (headerRe.test(compact)) continue; // 表ヘッダ・タイトル・注記

    // 款番号の単独行（折返し款の中間行）。○◎●の付番マーカーを許容
    const bare = compact.match(/^[○◎●]*(\d+)$/);
    if (bare) {
      if (pendNo == null) pendNo = Number(bare[1]);
      continue;
    }

    // 行頭の款番号（○ 2 のような付番マーカー接頭辞を許容）。款名が両端揃えで
    // 款番号と名前が密着する様式（富士吉田「1議会費」）に対応するため、番号直後の
    // 空白は必須にせず「次が数字・カンマでない（＝金額の一部でない）」ことだけ要求する
    const lead = raw.match(/^\s*[○◎●]*\s*(\d+)(?![\d,])/);
    const rest = lead ? raw.slice(raw.indexOf(lead[1]!) + lead[1]!.length) : raw;
    const tokens = rest.match(AMOUNT_RE) ?? [];
    const ints = tokens.filter((t) => !t.includes("."));
    const namePart = (tokens[0] != null ? rest.slice(0, rest.indexOf(tokens[0])) : rest)
      .replace(/[\s　]/g, "");

    if (lead && ints.length >= 2) {
      // 完結した款行（従来形式）。直前の折返し断片があれば款名の先頭に足す。
      // 名前欄が空なら款名は上下の断片にある → 下段を待つ（awaitTail）
      emit(Number(lead[1]), pendName + namePart, ints, raw, namePart === "");
    } else if (tokens.length === 0) {
      // 金額のない款名断片（折返しの上段/下段）。日本語断片のみ採る。
      // 「款名 （A）（%）…」等の列見出し行（括弧・％・全角ABC を含む）は款名に混ぜない
      if (hasCJK(namePart) && !/[（）()%％ＡＢＣ]/.test(namePart) && !isUnitOnly(namePart)) {
        if (openLine) {
          // 直前の款（名前欄が空だった）の下段折返し。次の款へ漏らさずその款名の末尾に足す
          openLine.kanName += namePart;
          openLine = null;
        } else {
          pendName += namePart;
        }
      }
    } else if (pendNo != null && ints.length >= 2) {
      // 折返し款の金額行（行頭に款番号がない）
      emit(pendNo, pendName + namePart, ints, raw);
    }
    // 上記以外（ページ番号など）は無視
  }

  if (lines.length === 0) throw new Error(`${filename} ${pageLabel}: 款行が1件も抽出できませんでした`);
  if (total == null) throw new Error(`${filename} ${pageLabel}: ${totalLabel} 行が見つかりません`);
  const note = opts.prevNote ?? prevNote; // 明示指定 > 本文の ※ 注記
  return { lines, total, prevTotal, prevBasis, ...(note ? { prevNote: note } : {}) };
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

// ---- 主な事業（行ベース）: 豊川「事業別・コード付」 ---------------------------
// N款 費目 当年度 前年度 → 款を追跡。【課名】は課見出し。
// n （新）事業名［款項目事業コード］ 当年度(千円) 前年度(千円) → 事業。以降の無印行は説明。
function parseProjectsCodedSections(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const facts: BudgetProjectFact[] = [];
  let currentKan = "";
  let last: BudgetProjectFact | null = null;
  for (let page = from; page <= to; page++) {
    for (const rawOrig of pdfPageText(filePath, page).split("\n")) {
      const raw = toHalfDigits(rawOrig);
      const compact = raw.replace(/[\s　]/g, "");
      if (compact === "") continue;
      // 款見出し「N款 費目 当年度 前年度」
      const kanM = raw.match(/^\s*(\d+)款\s+(.+?)\s+[\d,]+\s+[\d,]+\s*$/);
      if (kanM) {
        currentKan = kanM[2]!.replace(/[\s　]/g, "");
        last = null;
        continue;
      }
      // 課見出し【…】
      if (/^\s*【.+】/.test(raw)) {
        last = null;
        continue;
      }
      // 事業「n （新）事業名［code］（［code2］…） 当年度 前年度」。複合事業は［…］が複数続く
      const projM = raw.match(/^\s*(\d+)\s+(（新）|（拡）)?\s*(.+?)(?:［[^］]*］)+\s+([\d,]+)\s+([\d,]+)/);
      if (projM) {
        const [, _no, mark, nameRaw, amt, prev] = projM;
        const kubun = mark?.includes("新") ? "新規" : mark?.includes("拡") ? "拡充" : null;
        last = {
          kan: currentKan || null,
          // 豊川の番号は課内連番（全体の掲載番号ではない）ので掲載番号としては持たない
          no: null,
          kubun,
          name: nameRaw!.replace(/[\s　]/g, ""),
          budgetBookName: null,
          amount: toAmount(amt!),
          ...(prev ? { prevAmount: toAmount(prev) } : {}),
          description: "",
          basicGoal: "",
          shisaku: "",
          locator: { file: filename, page },
        };
        facts.push(last);
        continue;
      }
      // 説明列は多段組で -layout が列を潰して重複・内数混入するため採らない（事業名・
      // 款・当年度・前年度の確実な値だけを収録する）。last は継続チェック用に保持
      void last;
    }
  }
  if (facts.length === 0) throw new Error(`${filename}: 主な事業（coded-sections）が1件も抽出できませんでした`);
  return facts;
}

// ---- 主な事業（行ベース）: 和泉「拡/新 ◎ 事業名 … 予算額 千円」 -----------------
// 款・前年度・連番なしの重点事業リスト。◎ 行だけを拾う。
function parseProjectsMarkedBullets(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const facts: BudgetProjectFact[] = [];
  for (let page = from; page <= to; page++) {
    for (const raw of pdfPageText(filePath, page).split("\n")) {
      const m = raw.match(/^\s*(拡|新)?\s*◎\s*(.+?)\s+([\d,]+)\s*千円/);
      if (!m) continue;
      const [, mark, nameRaw, amt] = m;
      facts.push({
        kan: null,
        no: null,
        kubun: mark === "新" ? "新規" : mark === "拡" ? "拡充" : null,
        name: nameRaw!.replace(/[\s　]/g, ""),
        budgetBookName: null,
        amount: toAmount(amt!),
        description: "",
        basicGoal: "",
        shisaku: "",
        locator: { file: filename, page },
      });
    }
  }
  if (facts.length === 0) throw new Error(`${filename}: 主な事業（marked-bullets）が1件も抽出できませんでした`);
  return facts;
}

// ---- 主な事業（行ベース）: 山口「事業別」 -----------------------------------
// 政策「N …」/ 施策「（N）…」の見出しで施策を追跡。事業行は
// 「事業名  予算額(千円)  事業内容  担当課」で、行頭が非空白＝事業名、2つ以上の空白の後に金額。
// 内容の折返し行は先頭が空白なので拾わない。款・前年度は無い。
function parseProjectsTableLines(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const facts: BudgetProjectFact[] = [];
  let currentShisaku = "";
  for (let page = from; page <= to; page++) {
    for (const rawOrig of pdfPageText(filePath, page).split("\n")) {
      const raw = toHalfDigits(rawOrig);
      // 施策見出し「（N）…」
      const shM = raw.match(/^\s*（\s*\d+\s*）\s*(.+?)\s*$/);
      if (shM) {
        currentShisaku = shM[1]!.replace(/[\s　]/g, "");
        continue;
      }
      // 事業行: 行頭が非空白の事業名 → 2つ以上の空白 → 予算額（千円）
      const m = raw.match(/^(\S.+?)\s{2,}([\d,]+)(?:\s|$)/);
      if (!m) continue;
      const name = m[1]!.replace(/[\s　]/g, "");
      const amount = toAmount(m[2]!);
      // 見出し・ヘッダ・少額ノイズを除去（事業名2文字以上・10万円=100千円以上）
      if (name.length < 2 || amount < 100 || /予算額|事業名|事業内容|担当課|単位/.test(name)) continue;
      facts.push({
        kan: null,
        no: null,
        kubun: null,
        name,
        budgetBookName: null,
        amount,
        description: "",
        basicGoal: "",
        shisaku: currentShisaku,
        locator: { file: filename, page },
      });
    }
  }
  if (facts.length === 0) throw new Error(`${filename}: 主な事業（table-lines）が1件も抽出できませんでした`);
  return facts;
}

// ---- 主な事業（行ベース）: 山梨県「当初予算の概要」主要事業 --------------------
// 単一カラム。中項目《…》で施策を追跡。事業は ○ 印 ＋（任意で 新/拡 印）＋事業名 ＋
// 右寄せ金額（NN,NNN千円）。名前と金額は同一行のことも、名前が ○ 行・金額が次行のことも
// あるため、○ 行で名前を保留し、千円 行で確定する（pending 方式）。内訳（「N 事業名 2,915」＝
// 千円サフィックス無し）はトップレベル事業ではないので拾わない。
// 新/拡 印は行頭（○ の後）で「新␣」「拡␣」の形のみ（"新たな""更新"等の語中 新 は誤検出しない）。
function parseProjectsPrefBullets(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const facts: BudgetProjectFact[] = [];
  let currentShisaku = "";
  let pendingName = "";
  let pendingMark: "新" | "拡" | null = null;
  let descTarget: BudgetProjectFact | null = null; // 直近に確定した事業（次の説明行を拾う）
  const stripName = (s: string) =>
    s.replace(/[○◯]/g, "").replace(/^[\s　]*(新|拡)[\s　]/, "").replace(/[\s　]/g, "");
  // 行頭（○ 群の後）の 新/拡 印。語中の 新（新たな・更新）は空白が続かないので当たらない
  const markOf = (s: string): "新" | "拡" | null => {
    const m = s.match(/^[\s　]*(?:○[\s　]*)*(新|拡)(?:[\s　]|$)/);
    return m ? (m[1] as "新" | "拡") : null;
  };
  for (let page = from; page <= to; page++) {
    for (const rawOrig of pdfPageText(filePath, page).split("\n")) {
      const raw = toHalfDigits(rawOrig);
      if (!raw.trim()) continue;
      // 中項目《…》＝施策のまとまり
      const shM = raw.match(/《(.+?)》/);
      if (shM) {
        currentShisaku = shM[1]!.replace(/[\s　]/g, "");
        pendingName = ""; pendingMark = null; descTarget = null;
        continue;
      }
      const amtM = raw.match(/([\d,]+)\s*千円/);
      if (amtM) {
        // トップレベル事業を確定。名前は当該行にあればそれ、無ければ ○ 行の保留名
        const beforeAmt = raw.slice(0, amtM.index);
        const nameHere = stripName(beforeAmt);
        const mark = markOf(beforeAmt) ?? pendingMark;
        const name = hasCJKChars(nameHere) && nameHere.length >= 3 ? nameHere : pendingName;
        pendingName = ""; pendingMark = null; descTarget = null;
        if (!name || name.length < 3) continue;
        const fact: BudgetProjectFact = {
          kan: null,
          no: null,
          kubun: mark === "新" ? "新規" : mark === "拡" ? "拡充" : null,
          name,
          budgetBookName: null,
          amount: toAmount(amtM[1]!),
          description: "",
          basicGoal: "",
          shisaku: currentShisaku,
          locator: { file: filename, page },
        };
        facts.push(fact);
        descTarget = fact;
        continue;
      }
      // ○ で始まる事業名行（金額は次行）→ 名前を保留
      if (/^[\s　]*○/.test(raw)) {
        const nameCand = stripName(raw);
        pendingName = hasCJKChars(nameCand) && nameCand.length >= 3 ? nameCand : "";
        pendingMark = markOf(raw);
        descTarget = null;
        continue;
      }
      // 直近事業の説明文（インデントされた散文の1行目のみ）。財源・内訳・補助条件行は除く
      if (descTarget && !descTarget.description && /^[\s　]+\S/.test(raw)) {
        const t = raw.replace(/[\s　]+/g, " ").trim();
        if (
          hasCJKChars(t) && t.length >= 8 &&
          !/^\d/.test(t) &&
          !/^[（(]財源|^補\s*助|^対象|^限\s*度|^事業内容|^負担|^委託|^交付|^債務/.test(t)
        ) {
          descTarget.description = t;
        }
        descTarget = null;
      }
    }
  }
  if (facts.length === 0) throw new Error(`${filename}: 主な事業（pref-bullets）が1件も抽出できませんでした`);
  return facts;
}

// ---- 主な事業（行ベース）: 笛吹「重点事業」 ------------------------------------
// 部（総務部・建設部・教育委員会…）でグループ。事業は「■事業名【担当課】」→次行
// 「予算額 NN,NNN 千円」→「事業内容」＋説明。■ 行で名前を保留し 予算額 行で確定する。
function parseProjectsDeptBullets(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const facts: BudgetProjectFact[] = [];
  let currentDept = "";
  let pendingName = "";
  let descTarget: BudgetProjectFact | null = null;
  for (let page = from; page <= to; page++) {
    for (const raw of pdfPageText(filePath, page).split("\n")) {
      const line = raw.replace(/\s+$/, "");
      if (!line.trim()) continue;
      // 部見出し（総務部・教育委員会・消防本部…）＝行全体が短い「…部/委員会/本部」
      const deptM = line.match(/^[\s　]*(\S{2,10}(?:部|委員会|本部))[\s　]*$/);
      if (deptM && !/■|予算|事業/.test(line)) {
        currentDept = deptM[1]!;
        pendingName = ""; descTarget = null;
        continue;
      }
      // ■事業名【担当課】 → 名前を保留（金額は次の「予算額」行）
      const evM = line.match(/^[\s　]*■\s*(.+?)(?:[\s　]*【(.+?)】)?[\s　]*$/);
      if (evM) {
        pendingName = evM[1]!.replace(/[\s　]/g, "");
        descTarget = null;
        continue;
      }
      // 予算額 NN,NNN 千円（末尾に「(…総額)」等の注記が付くことがある）
      const amtM = line.match(/予算額\s+([\d,]+)\s*千円/);
      if (amtM && pendingName) {
        const fact: BudgetProjectFact = {
          kan: null,
          no: null,
          kubun: null,
          name: pendingName,
          budgetBookName: null,
          amount: toAmount(amtM[1]!),
          description: "",
          basicGoal: "",
          shisaku: currentDept,
          locator: { file: filename, page },
        };
        facts.push(fact);
        pendingName = "";
        descTarget = fact;
        continue;
      }
      // 「事業内容」の次以降、最初の散文行を説明として拾う
      if (descTarget && !descTarget.description && !/^[\s　]*事業内容/.test(line)) {
        const t = line.replace(/[\s　]+/g, " ").trim();
        if (hasCJKChars(t) && t.length >= 8 && !/^[（(]/.test(t)) {
          descTarget.description = t;
          descTarget = null;
        }
      }
    }
  }
  if (facts.length === 0) throw new Error(`${filename}: 主な事業（dept-bullets）が1件も抽出できませんでした`);
  return facts;
}

// ---- 主な事業（座標ベース）: 富士吉田「基本方針及び主要事業」------------------
// 部ごとに「事業名（主管課）| 款項目＋予算額 | 事業概要」の狭い3列テーブル。予算額列が
// 細く、款項目と金額（全角 NN，NNN千円）が縦積みになるため -layout では崩れる。-tsv の
// 単語座標で列を分ける: 事業名列 = left<nameEnd、金額 = 全角 NN千円（列不問で一意）。
// 各金額を1事業の確定点とし、その上（前の金額〜当該金額の top 範囲）の事業名列の語を
// (top,left) 順で連結して事業名にする（折返し名の文字順ズレを left で正す）。
// 部（…部/委員会/創生室）を施策グループにする。
function parseProjectsCoordTable(
  filePath: string,
  filename: string,
  from: number,
  to: number,
  nameEnd = 175,
): BudgetProjectFact[] {
  const facts: BudgetProjectFact[] = [];
  const isAmt = (t: string) => /^[０-９，]+千円$/.test(t);
  let dept = "";
  for (let page = from; page <= to; page++) {
    const ws = pdfPageWords(filePath, page).filter((w) => !w.text.startsWith("###"));
    if (ws.length === 0) continue;
    // 部（施策）: 「基本方針及び主要事業<部>」から。ページをまたいで持ち越す
    const joined = ws.map((w) => w.text).join("").replace(/[\s　]/g, "");
    const dm = joined.match(/基本方針及び主要事業(.{2,8}?(?:部|委員会|創生室|会計管理者))/);
    if (dm) {
      let d = dm[1]!;
      // 見出しと標題で部名が二重になることがあるので畳む
      if (d.length % 2 === 0 && d.slice(0, d.length / 2) === d.slice(d.length / 2)) d = d.slice(0, d.length / 2);
      dept = d;
    }
    // 「事業名（事業主管課）」ヘッダより下だけが事業（上は基本方針・目標の散文）
    const hdrs = ws.filter((w) => w.text.includes("事業名") && w.text.includes("主管課")).map((w) => w.y);
    let prev = hdrs.length ? Math.min(...hdrs) : 0;
    const amts = ws.filter((w) => isAmt(w.text)).sort((a, b) => a.y - b.y);
    for (const a of amts) {
      const names = ws
        .filter(
          (w) =>
            w.x < nameEnd && w.y > prev && w.y <= a.y &&
            !w.text.includes("事業名") && !w.text.includes("主要事業") &&
            // 予算額列の款項目マーカー（全角数字・款/項/目 単字）が事業名列にはみ出す事業を除く。
            // 款項目番号は全角（６）、事業名中の番号は半角（国道138号）なので全角のみ弾く
            !/^[０-９]+$/.test(w.text) && !/^[款項目]$/.test(w.text),
        )
        .sort((x, y) => x.y - y.y || x.x - y.x);
      let name = names.map((w) => w.text).join("");
      // 末尾の（主管課）を除去
      name = name.replace(/（[^）]*(?:課|室|局|会計管理者|事務局)）?$/, "").replace(/（.*$/, "").trim();
      const amount = toAmount(toHalfNum(a.text).replace(/千円|,/g, ""));
      prev = a.y;
      if (name.length >= 3 && amount > 0) {
        facts.push({
          kan: null,
          no: null,
          kubun: null,
          name,
          budgetBookName: null,
          amount,
          description: "",
          basicGoal: "",
          shisaku: dept,
          locator: { file: filename, page },
        });
      }
    }
  }
  if (facts.length === 0) throw new Error(`${filename}: 主な事業（coord-table）が1件も抽出できませんでした`);
  return facts;
}

export function parseKofuYosansho(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetBookDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  // 単数 revenuePage と複数 revenuePages のどちらか一方。内部は常にページ配列で扱う
  const sidePages = (
    single: number | undefined,
    range: { from: number; to: number } | undefined,
    key: string,
  ): number[] => {
    if (single && range) {
      throw new Error(`${source.id}: parserOptions.${key} と ${key}s は併用できません（どちらか一方）`);
    }
    if (range) {
      if (range.to < range.from) {
        throw new Error(`${source.id}: parserOptions.${key}s の範囲が逆です（${range.from}-${range.to}）`);
      }
      return Array.from({ length: range.to - range.from + 1 }, (_, i) => range.from + i);
    }
    if (single) return [single];
    throw new Error(
      `${source.id}: parserOptions.${key} または ${key}s（款別一覧の PDF ページ番号）が必要です`,
    );
  };
  const revenuePages = sidePages(opts.revenuePage, opts.revenuePages, "revenuePage");
  const expenditurePages = sidePages(opts.expenditurePage, opts.expenditurePages, "expenditurePage");
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

  const rev = parseKanPage(kanFile.path, kanFile.filename, revenuePages, "revenue", opts);
  const exp = parseKanPage(kanFile.path, kanFile.filename, expenditurePages, "expenditure", opts);
  if (rev.prevBasis !== exp.prevBasis) {
    throw new Error(`${source.id}: 歳入と歳出で前年度列の基準が違います（${rev.prevBasis} / ${exp.prevBasis}）`);
  }
  const projFmt = opts.projectFormat ?? "table";
  const projects = opts.projectPages
    ? projFmt === "bullets"
      ? parseProjectBullets(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
      : projFmt === "coded-sections"
        ? parseProjectsCodedSections(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
        : projFmt === "marked-bullets"
          ? parseProjectsMarkedBullets(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
          : projFmt === "table-lines"
            ? parseProjectsTableLines(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
            : projFmt === "pref-bullets"
              ? parseProjectsPrefBullets(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
              : projFmt === "dept-bullets"
                ? parseProjectsDeptBullets(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
                : projFmt === "coord-table"
                  ? parseProjectsCoordTable(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
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
