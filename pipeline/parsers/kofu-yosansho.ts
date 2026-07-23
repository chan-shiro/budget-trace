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
// **この前提が逆順の様式がある**（足立 R5〜R8 = [前年度, 当年度, 増減額]）— Options.prevColumnFirst 参照。
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
  /**
   * **款名が次行へ続く款の番号**（側ごと）。**第4の折返し型**（2026-07-16・仙台 R8 で発見）。
   *
   * 既存の3型はどれも幾何で見分けられた:
   *   - 上段折返し（豊川・和泉）    断片が款行の**前**            → pendName を前置
   *   - 中央寄せ3行（名古屋・札幌・京都款5） 上段＋**款行(名前欄が空)**＋下段 → awaitTail
   *   - 款番号が単独行（甲府 R2/R3） 款番号だけの行                → pendNo
   * これは**款行の名前欄が非空のまま下段へ続く**型で、上段折返しと**幾何が完全に同じ**:
   *   仙台 `13 国有提供施設等所在市助成 286,000 …` / `   交付金` / `14 地方特例交付金 …`
   *   豊川 `   国有提供施設等所在`      / `4  市町村助成交付金 3,000 …`
   * どちらも「款行・日本語だけの断片行・款行」で、**断片が前後どちらの款を完成させるかは
   * 版面から決められない**（＝推測すると必ずどちらかを壊す）。だから明示する。
   *
   * 放置すると**その款が切れ、次の款の頭が汚れる**（仙台なら款13「国有提供施設等所在市助成」・
   * 款14「交付金地方特例交付金」）。**金額は全件正しく Σ も4系統一致するので validate を素通りする。**
   */
  kanNameContinues?: { revenue?: number[]; expenditure?: number[] };
  /**
   * **見開き2ページ型**（2026-07-16・新潟 R8 で発見）。**款名と金額が別ページに載る**様式:
   *   p.8 =「款番号＋款名」だけ（金額なし）  /  p.9 =「本年度・前年度・比較」だけ（款名なし）
   * `revenuePages`（複数ページを**縦に**連結）とも `samePage`（1ページに2側）とも別方向で、
   * **2ページを行順で1:1に組む**必要がある。指定すると `revenuePage(s)` の代わりに使われる。
   *
   * 対応しないと**款が1件も取れず throw する**（＝静かには壊れない）。
   * **件数の一致を必ず assert する**こと — 象徴計上（`1` 千円）のような1桁の行を取りこぼすと
   * **以降が丸ごと1つずれ、Σ も款名も「それらしく」合ってしまう**。
   */
  revenueSpread?: { namePage: number; amountPage: number };
  expenditureSpread?: { namePage: number; amountPage: number };
  /**
   * **左右2側が同一ページ（横並び）**（2026-07-16・静岡 R8 で発見）。ページの**横方向を pt で切り出す**。
   * `revenuePage` と `expenditurePage` に**同じページ番号**を入れ、側ごとに範囲を与える。
   * ```
   * １ 市 税  148,938,000  145,700,000  3,238,000  │  １ 議 会 費  1,021,222  1,026,482  △5,260
   * ```
   * 既存の3つとも別方向:
   *   - `revenuePages`  複数ページを**縦に**連結（横浜・神戸・北九州）
   *   - `samePage`      **1ページに2側が縦積み**（南アルプス・岡山）
   *   - `revenueSpread` **2ページを行順で1:1**（新潟）
   * 対応しないと `-layout` が2表を1行に融合し、**歳入だけ偶然正しく出て歳出が1件も取れない**
   * （＝「款行が1件も抽出できませんでした」で throw する。静かには壊れない）。
   *
   * **切り出しは pdftotext 自身の -x/-W に任せる**（座標を自前で組み直さない）。
   * 静岡は A4 横（842pt）で、歳入の右端が約400pt・歳出の左端が約425pt＝**ガター幅24〜26pt**。
   */
  revenueCropX?: CropX;
  expenditureCropX?: CropX;
  /**
   * **`pdftotext` のテキスト抽出モード**。既定は `-layout`（列がスペースで揃うので行パーサが素直）。
   *
   * `"raw"` を指定すると **`-raw`**（内容ストリーム順）で読む。**原典が健全なのに `-layout` が
   * 行を壊す資料**のための逃げ道で、**資料ごとに実測して明示的に指定する**（2026-07-17・大田 H26/H25）。
   *
   * ⚠ **「Σ が合うまでモードを変えて試す」ことは絶対にしない**。それは検証ゲートに合わせて
   *   データの読み方を選ぶ＝ゲートを無意味にする行為。**人が原典と突き合わせて「この資料は
   *   -raw が正しい」と確かめてから**ここに書く。
   *
   * 大田 H26/H25 の実測: 款9 特別区交付金の行が PDF 上で**二重に描かれて**おり、`-layout` は
   * 重なりを解こうとして**3行に割り、カンマを別行へ剥離する**:
   * ```
   *    別区交付金
   * 9 特 区                    64,100,000
   *                            ,           26.5    59,606,000
   * ```
   * → Σ が巨大にずれて **error で必ず止まる**（静かには壊れない）。`-raw` は同じ行を
   * `9 特別区交付金 64,100,000 26.5 59,606,000 25.7 4,494,000 7.5` と**正しく1行で返し**、
   * 重なりの残骸は `特 区 , , , , , ,` という別行に落ちる（`HeaderExtra` で捨てる）。
   *
   * **座標ベース（`-tsv`）ではこの資料は救えない**（実測）。視覚順には戻るが、重なった
   * 残骸も同じ行に拾うため款9 が `9特別区交付金区64,100,000,26.5…` と汚染される。
   * ＝**`-layout` が壊す資料の逃げ道は1つではない**。千代田 R3 は逆に `-tsv` 側が要る（§10a）。
   *
   * ⚠ `-raw` は**視覚順を保証しない** — 表題や列見出しが表の途中に紛れ込む（大田 H26 では
   *   款9 と款10 の間に出る）。**見出し・`HeaderExtra` で確実に捨てること**。
   *   合計行はラベルが数字の後ろに来る（`242,022,354 … 4.2 合 計`）が、合計検出は空白を
   *   畳んでから `includes` するので当たる。
   */
  textSource?: "layout" | "raw";
  /**
   * **款と項が同一表に混在する様式**（大阪 §8e・相模原 §8p）で、**款行の字下げの上限**。
   * 指定するとこれより深く字下げされた行は款のパースから外れる（＝項・目の行を款と誤認しない）。
   *
   * 相模原の款項別は 款が字下げ1・項が字下げ19 ではっきり分かれる:
   * ```
   *  5 市税                149,300,000  36.8  143,800,000  38.4  5,500,000  3.8
   *                     5 市民税         75,698,121  18.6   72,435,672  19.3  3,262,449  4.5
   * ```
   * 指定しないと**項がすべて款として拾われ、Σ が2倍以上に膨らむ**（＝Σ ゲートが止める）。
   */
  kanIndentMax?: number;
  /**
   * **款番号を持たない様式**（2026-07-16・岡山 R8 で発見）。指定すると、款番号が無くても
   * 「日本語の款名＋整数金額2つ以上」の行を款として拾う（`kanNo: null`）。
   * ```
   *  市税              143,589,274   140,001,610      3,587,664   2.6   33.4   34.2
   *  地方譲与税           2,579,000     2,696,000      △ 117,000  △4.3   0.6    0.7
   * ```
   * 対応しないと**款が1件も取れず throw する**（＝静かには壊れない）。
   * **緩めると注記行を拾う**ので、款名に日本語があることと合計行の手前であることで絞っている。
   */
  kanNoless?: boolean;
  /**
   * **款名の先頭から落とす1文字**（正規表現の文字クラスの中身）。
   * 表の左端に**縦書きの表側ラベル**が置かれ、`-layout` で**款名の頭に1文字だけ紛れ込む**様式のため
   * （岡山: `歳 ゴルフ場利用税交付金` `入 使用料及び手数料` `出 教育費` — 毎年同じ4行で必発）。
   * **金額は全件正しく Σ も4系統一致するので validate を素通りする**＝目視しないと気づけない型。
   */
  kanNamePrefixStrip?: string;
  /** 「主な事業一覧」のページ範囲（1-origin・両端含む） */
  projectPages?: { from: number; to: number };
  /** 分冊形式（R2・R3）: 款別一覧表のファイル名。未指定なら単一ファイル */
  kanFile?: string;
  /**
   * 原典の金額単位（既定 thousandYen）。**millionYen は ×1000 で千円へ正規化**して保存する
   * （2026-07-23・板橋 #125。原典自身が「千円単位の表を百万円単位に簡略化した」と注記する資料。
   * 財政事情の万円→千円変換と同じ「印字値の等価変換」であり推計ではない）。
   * doc.unit は常に thousandYen（変換済み）。
   */
  unit?: "thousandYen" | "millionYen";
  /**
   * 歳入と歳出が**別ファイル**の資料（品川 R7・台東 R2/H31/H27・熊本の過年度 — 2026-07-23 #125）。
   * 指定するときは**両方**を指定する（片方だけだと「残りは kanFile」という暗黙が生まれ、
   * ファイルの取り違えが静かに通るため throw する）。kanFile とは併用しない。
   */
  revenueFile?: string;
  expenditureFile?: string;
  /** 分冊形式: 主な事業のファイル名 */
  projectsFile?: string;
  /**
   * 主な事業のレイアウト。
   * - "table"（甲府 R6〜: No/款/内容の座標ベース表）
   * - "bullets"（甲府 R2・R3: ●事業名…金額 の箇条書き。款・連番なし）
   * - "coded-sections"（豊川: N款 費目 / 【課】/ n 事業名［款項目事業コード］当年度 前年度）
   * - "marked-bullets"（和泉: 拡/新 ◎ 事業名 … 予算額 千円 の重点事業リスト。款・前年度なし）
   * - "kan-tree"（相模原: 款→項→目 の木に `○ 事業名 事業費 財源内訳 説明`。**款が付く**・座標で親と内訳を分ける）
   * - "table-lines"（山口: 事業名 予算額 内容 担当課 の事業別表。施策見出しつき・款/前年度なし）
   */
  projectFormat?: "table" | "bullets" | "coded-sections" | "marked-bullets" | "table-lines" | "pref-bullets" | "dept-bullets" | "coord-table" | "kan-tree" | "meisai-tree" | "numbered-rows";
  /**
   * numbered-rows（浜松）: 款セルを持てない事業を何件まで許容するか（既定0）。
   * R7 は p.65「重度障害者等就労・大学修学支援事業」の1件だけ**原本に款セルが無い**（±180pt を
   * 実測して欠落を確認）。無条件に許すと括弧の変種を静かに落とすので、明示した件数だけ許す。
   */
  projectKanlessAllowed?: number;
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
  /**
   * **列順が [前年度, 当年度, 比較] の様式**（2026-07-16・足立 R5〜R8 で発見）。
   * ファイル冒頭の前提「整数列は [当年度, 前年度, 増減額] の順」が丸ごと逆になる。
   *
   * 指定せずに読むと**当年度と前年度が入れ替わったまま完走する** — 合計行も同じ順で
   * 反転するため **Σ照合は両側とも差0で素通りする**＝「静かに通ってしまうが中身が違う」
   * 最危険型。**年度間クロスチェック**（当年度資料の前年度列 = 前年度資料の当年度列）
   * だけが検出する。皆増・皆減の行は例外で正しい向きに置かれるため、皆減行があると
   * その行だけ逆になり Σ がずれる（足立 R6 歳入の特別区債 ±1,535,000 で発覚する型）。
   *
   * 足立は **R2〜R4 が標準順・R5〜R8 が前年先行**で、同じ自治体の中で反転した。
   * ヘッダの原文（`７年度当初予算 ８年度当初予算 比較増減`）を年度ごとに確認して指定する
   * （**年度を外挿しない**）。
   */
  prevColumnFirst?: boolean;
}

/** 全角数字・全角カンマ → 半角（豊川の款番号・北杜の小計見出しが全角） */
const toHalfDigits = (s: string): string =>
  s.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/，/g, ",");

/** CJK（かな・漢字）を含むか。事業名判定に使う */
const hasCJKChars = (s: string): boolean => /[぀-ヿ㐀-鿿々〆ヶ]/.test(s);

/** 金額トークンの正規表現（負号 △/▲ を許容） */
const AMOUNT_RE = /[△▲]?[\d,]+(?:\.\d+)?/g;

/**
 * **百分率トークンを金額から除く**（2026-07-16・新宿 R8）。
 *
 * 構成比・増減率は小数（`32.4`）なので呼び出し側の小数フィルタが落としてきた。が、
 * **合計行の構成比は「ちょうど 100%」＝整数**でフィルタを素通りする:
 *
 *   `歳入合計   187,835,560   100%   188,460,229   100%   △ 624,669   △0.3%`
 *   → ints = [187835560, **100**, 188460229, 100, 624669] → `prevTotal = ints[1]` が **100**
 *
 * 既存自治体は構成比に必ず小数点が付いていたため露出していなかった。前年度Σ検査は
 * **error ではなく warning** なので**パイプラインは止まらず derive まで流れ**、
 * 「前年度合計 100」という無意味な注意書きが画面に載る＝§9 の「静かに壊れる」型の第3。
 *
 * `％` が数字から離れて単独で並ぶ単位行（`千円 ％ 千円 ％`）には当たらない（数字が無いため）ので、
 * 既存の `isUnitOnly` / ヘッダ判定は影響を受けない。小数の百分率に対しては no-op。
 */
const stripPercents = (s: string): string => s.replace(/[\d,]+(?:\.\d+)?\s*[%％]/g, " ");

/** "1,234" / "△1,234" / "▲1,234" → number。構成比などの小数は対象外（呼び出し側で弾く） */
function toAmount(token: string): number {
  const neg = /^[△▲-]/.test(token);
  const n = Number(token.replace(/[△▲\-,]/g, ""));
  if (!Number.isFinite(n)) throw new Error(`金額を解釈できません: ${token}`);
  return neg ? -n : n;
}

/** ページの横方向の切り出し（Options.revenueCropX 参照）。pt 単位・PDF 座標系 */
interface CropX {
  from: number;
  to: number;
}

function pdfPageText(
  filePath: string,
  page: number,
  crop?: CropX,
  source: "layout" | "raw" = "layout",
): string {
  try {
    return execFileSync(
      "pdftotext",
      [
        "-f", String(page), "-l", String(page), source === "raw" ? "-raw" : "-layout",
        // 横並び2側の切り出しは **pdftotext 自身の -x/-W** に任せる（座標計算を自前でやらない）。
        // -H は用紙高より十分大きい値でよい（縦は切らない）。
        ...(crop ? ["-x", String(crop.from), "-y", "0", "-W", String(crop.to - crop.from), "-H", "2000"] : []),
        filePath, "-",
      ],
      { encoding: "utf8" },
    );
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("pdftotext が見つかりません。poppler を入れてください（brew install poppler）");
    }
    throw e;
  }
}

// **部首の異体字を正字へ直す**（2026-07-17・港区 R2・R4・H31）。
//
// 原典の PDF が **Kangxi Radicals（U+2F00–U+2FDF）/ CJK Radicals Supplement（U+2E80–U+2EFF）**を
// 混ぜて組版していることがある（`⺠⽣費` = U+2EA0 + U+2F63）。**見た目は正字とほぼ同じ**で、
// **金額も Σ も正しい**ので、`validate` の語彙ゲートも Σ も素通りする（＝§2-4 の新しい型）。
// **同一 PDF の中で混在**し（港 R2 は `土木費` がクリーンなのに `⺠⽣費` が壊れる）、
// **年度の新旧とも無関係**（R3 クリーン → R4 は歳出だけ → R2 は両側）。
//
// ⚠ **款名に丸ごと NFKC をかけてはいけない**（実測）。原典どおりに残すと決めた表記まで壊す:
//     `（特別区債）` → `(特別区債)`          ← 文京 H19 の半角/全角の区別が消える
//     `環境清掃費（⑲環境費）` → `…(19環境費)` ← 新宿 H20 の発行元による改称注記が壊れる
//   → **部首ブロックの文字だけを1文字ずつ**直す。
// ⚠ **NFKC は U+2E80 台を落とさない**（実測: `⽣`(U+2F63)→`生` は落ちるが `⺠`(U+2EA0) は不変）。
//   落とせない部首は**そのまま残す** — `validate` の部首ゲートが error にするので、
//   **黙って通ることはない**。新しい部首に出会ったらここへ足す。
const RADICAL_RE = /[⺀-⻿⼀-⿟]/g;
const RADICAL_FIX: Record<string, string> = { "⺠": "民" }; // NFKC が落とさないもの（実測で足す）
const fixRadicals = (s: string): string =>
  s.replace(RADICAL_RE, (c) => RADICAL_FIX[c] ?? c.normalize("NFKC"));

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
  // 款名が次行へ続く款（Options.kanNameContinues 参照）
  const tailKans = new Set(
    (side === "revenue" ? opts.kanNameContinues?.revenue : opts.kanNameContinues?.expenditure) ?? [],
  );
  const headerRe = extraHeader ? new RegExp(`${KAN_HEADER_RE.source}|${extraHeader}`) : KAN_HEADER_RE;
  const spread = side === "revenue" ? opts.revenueSpread : opts.expenditureSpread;
  const cropX = side === "revenue" ? opts.revenueCropX : opts.expenditureCropX;
  // テキスト抽出モード（Options.textSource 参照）。既定 -layout。
  const src = opts.textSource ?? "layout";
  let text = spread
    ? pdfPageText(filePath, spread.namePage, undefined, src) +
      "\n" +
      pdfPageText(filePath, spread.amountPage, undefined, src)
    : pages.map((p) => pdfPageText(filePath, p, cropX, src)).join("\n");
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
  // 見開き2ページ型（Options.revenueSpread 参照）: 款名ページと金額ページを**行順で1:1に組み**、
  // 以降は通常の1ページ表と同じ経路で読む（皆減・折返し・ヘッダ除外・合計検出をそのまま使えるため）。
  if (spread) {
    const [nameText, amountText] = [
      pdfPageText(filePath, spread.namePage, cropX, src),
      pdfPageText(filePath, spread.amountPage, cropX, src),
    ];
    // 款名ページ: 見出し（（歳入）等）より後ろの「款番号で始まる行」＋合計ラベル行だけを採る。
    // 見出しより前を捨てるのは `１ 総 括` を款1 と取り違えないため（全角1が半角化される）。
    const nameLines: string[] = [];
    let started = false;
    for (const l of nameText.split("\n")) {
      const c = l.replace(/[\s　]/g, "");
      if (!started) {
        if (c.includes(headingCompact)) started = true;
        continue;
      }
      if (headerRe.test(c)) continue; // 列見出し `款` 等
      if (c.includes(totalLabel)) {
        nameLines.push(l);
        break; // 合計行が最後
      }
      if (/^\s*[○◎●]*\s*\d+(?![\d,])/.test(toHalfDigits(l))) nameLines.push(l);
    }
    // 金額ページ: 整数金額を2つ以上持つ行だけ（ページ番号は1つなので落ちる）
    const amountLines = amountText.split("\n").filter((l) => {
      const ints = (l.match(AMOUNT_RE) ?? []).filter((t) => !t.includes("."));
      return ints.length >= 2;
    });
    // **件数の一致は必須**。ずれたまま組むと Σ も款名も「それらしく」合ってしまう
    if (nameLines.length !== amountLines.length || nameLines.length === 0) {
      throw new Error(
        `${filename} p.${spread.namePage}+${spread.amountPage}: 見開きの行数が合いません` +
          `（款名 ${nameLines.length} 行 / 金額 ${amountLines.length} 行）。` +
          `どちらかの行を取りこぼすと以降が丸ごと1つずれるので組みません。`,
      );
    }
    text = nameLines.map((n, i) => `${n.trimEnd()}   ${amountLines[i]!.trim()}`).join("\n");
  }
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
  // 「金額はあるが款番号が無く、どの款にも結び付かない行」＝孤児。直後に款番号の単独行が来たら
  // その款の上段だったと分かる（Options 参照なしの構造判定。静岡 R8 の第5の折返し型）
  let orphan: { namePart: string; ints: string[]; raw: string } | null = null;
  let orphanLi = -1;
  const emit = (kanNo: number | null, name: string, ints: string[], raw: string, awaitTail = false) => {
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
    // ⚠ **`ほぼ皆増` / `ほぼ皆減` を「皆増/皆減」と読まない**（2026-07-17・台東）。原典は
    //   **前年度が 0 ではなく象徴計上の1千円**のときにこう書く:
    //     `18　繰越金　1,000,000　0.8　1　0.0　999,999 ほぼ皆増`  ← 前年度は **0 ではなく 1**
    //   `includes("皆増")` は `ほぼ皆増` にも当たるので前年度を 0 と読み、**Σ が 1 ずれて error** に
    //   なっていた（＝静かには壊れないが収録できない）。**registry 全体で台東が初出**（既存264ソースに
    //   `ほぼ皆` は0件＝実測）。皆増/皆減は「相手側のセルが 0」を意味する原典の記号なので、
    //   **「ほぼ」が付いたら 0 ではない**＝この判定から外すのが原典に忠実。
    const zeroPrev = /(?<!ほぼ)皆増/.test(compactRaw); // 前年度は 0（当年度に新設）
    const zeroAmount = /(?<!ほぼ)皆減/.test(compactRaw); // 当年度は 0（廃止）
    // 皆減の行では**前年度が ints のどこに来るかが様式で変わる**（2026-07-16）:
    //   - 当年度セルに 0 が印字される様式 → ints = [0, 前年度, 比較]（札幌・北九州）
    //   - 当年度セルが空欄／`-`／`−` の様式 → ints = [前年度, 比較]（福岡・川崎・甲府）
    // 皆減は「当年度＝0」を意味するので、**ints[0] が 0 なら 0 が印字されている**と判る。
    // これを見ずに常に ints[1] を前年度にすると、福岡 R8（`▲ 自動車取得税交付金 - - 1 0.0 △1 皆減`）で
    // 前年度が **△1 → −1** になる（正: 1）。
    let amount: number;
    let prevAmount: number;
    if (opts.prevColumnFirst) {
      // 逆順様式（Options.prevColumnFirst 参照）: ints = [前年度, 当年度, 比較]。
      // 添字ロジックは正順の**鏡像**になる — 前年度は常に ints[0]。当年度は ints[1] だが、
      // **皆増で前年度セルが空欄**の様式では ints が [当年度, 比較] に詰まるので ints[0]
      // （正順の「皆減で当年度セルが空欄」と対称。足立 R6 の皆減
      // `22 特別区債 1,535,000 0.5 0 0.0 △1,535,000 皆減` は 0 が印字される様式で ints[1]=0）。
      const amountIdx = zeroPrev && toAmount(ints[0]!) !== 0 ? 0 : 1;
      amount = zeroAmount ? 0 : toAmount(ints[amountIdx]!);
      prevAmount = zeroPrev ? 0 : toAmount(ints[0]!);
    } else {
      const prevIdx = zeroAmount && toAmount(ints[0]!) !== 0 ? 0 : 1;
      amount = zeroAmount ? 0 : toAmount(ints[0]!);
      // **「皆増」なのに前年度セルに非0が印字されている行は、印字値を採る**（2026-07-22・墨田 H18）:
      //   `5 株式等譲渡所得割交付金  202,000  0.2  1,000  0.0  201,000  皆増`  ← 前年度 1,000 を印字
      // 台東の「ほぼ皆増」（前年度1千円・語で区別）とは別の型で、**原典自身が印字値とラベルで
      // 矛盾している**。皆増を優先して 0 に潰すと前年度Σが -1,000 割れる（増減 201,000 =
      // 202,000 − 1,000 とも整合するので印字値が正）。ints が3つ以上（当年度・前年度・増減が
      // すべて印字されている）ときだけ印字を信じる — 前年度セルが空欄で ints=[当年度, 増減] の
      // 2つに詰まる通常の皆増（甲府 R2 款6）は従来どおり 0。
      const printedPrev = ints.length >= 3 ? toAmount(ints[1]!) : 0;
      prevAmount = zeroPrev ? printedPrev : toAmount(ints[prevIdx]!);
    }
    const line: BudgetLineFact = { side, kanNo, kanName: name, amount, prevAmount, locator };
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
      // 構成比 100%（＝整数）が前年度合計に化けるのを防ぐ（stripPercents 参照）
      const ints = (stripPercents(raw).match(AMOUNT_RE) ?? []).filter((t) => !t.includes("."));
      if (ints.length > bestInts) {
        bestInts = ints.length;
        totalIdx = i;
        // 逆順様式では合計行も [前年度, 当年度] の順（Options.prevColumnFirst 参照）。
        // bestInts > 1 が保証するとおりここは常に整数2個以上なので ints[1] は存在する。
        if (opts.prevColumnFirst) {
          total = toAmount(ints[1]!);
          prevTotal = toAmount(ints[0]!);
        } else {
          total = toAmount(ints[0]!);
          prevTotal = ints[1] != null ? toAmount(ints[1]!) : null;
        }
      }
    });
  }

  // 前年列の注記（※〜）は**合計行の後**に置かれる（甲府 R6 は合計行の直下）。款パースは
  // 合計行の手前で打ち切るので、注記はその打切りとは独立に全行から拾う。
  // （fd3a500 で打切りを入れた際、この注記ごと切り落としていた — 2026-07-15 修正）
  //
  // **年度への言及を要求する**（2026-07-16・中野 R2 で発覚）。`※`＋`予算` だけだと、
  // **前年度列と無関係な注記**を拾って前年比較画面に「※資料注記」として出してしまう
  // （中野 R2 の `※主な事業について、経費が複数の部にわたる場合は、予算額を合算して表記しています。`
  // ＝主な事業の表の注記であって前年度列の話ではない）。prevNote は「前年度額がどの基準か」を
  // 読者に伝えるためのものなので、**年度を名指ししていない注記はこの役目を負えない**。
  // 既存の正当な注記は全件が年度に言及している（甲府 R6「令和5年度当初予算額は…」・
  // 千代田 R4「令和3年度予算額は…」・福岡 R4「令和4年度に…令和3年度予算」）ので回帰しない。
  const PREV_NOTE_RE = /前年度|[令和平成\d]+\d年度|\d+年度/;
  for (const l of allLines) {
    const c = l.replace(/[\s　]/g, "");
    if (c.startsWith("※") && c.includes("予算") && PREV_NOTE_RE.test(c)) { prevNote = c.slice(1); break; }
  }

  for (let li = 0; li < allLines.length; li++) {
    if (li >= totalIdx) break; // 合計行以降（凡例・注記）は款ではない
    const raw = allLines[li]!; // 全角款番号（豊川）を半角化済み
    const compact = raw.replace(/[\s　]/g, "");
    // 款項が同一表に混在する様式（Options.kanIndentMax 参照）: 深く字下げされた項・目を外す
    if (opts.kanIndentMax != null && compact !== "") {
      const indent = raw.length - raw.trimStart().length;
      if (indent > opts.kanIndentMax) continue;
    }
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
    // ⚠ 桁数を1〜2桁に制限する（2026-07-23・板橋 R5）。CropX で増減率を切った後に「金額のみの行」
    // が残る資料では、無制限だと `931 909 22` の連結 `93190922` を款番号として食い、直後の款が
    // 丸ごと落ちる（Σ ゲートは捕まえるが原因が見えにくい）。款番号は全収録ソースで2桁以内
    // （最大は相模原の 90）。
    const bare = compact.match(/^[○◎●]*(\d{1,2})$/);
    if (bare) {
      // **金額が款番号より前（上段）に来る第5の折返し型**（2026-07-16・静岡 R8）:
      //   `     農    林     5,152,466   4,616,851   535,615 …`  ← 上段に款名前半＋金額
      //   `６`                                                    ← 款番号が単独行
      //   `     水 産 業費`                                        ← 下段に款名後半
      // 既存の pendNo は「款番号 → 金額行」の順（甲府 R2/R3）を前提にしており、この順では
      // **上段が孤児として黙って捨てられ、款が丸ごと落ちる**（静岡 R8 は款6・款11 が消えて
      // Σ が 10,976,396 千円不足し、さらに下段「復旧費」が次の款へ漏れて「復旧費公債費」になった）。
      // Σ ゲートが止めるので静かには壊れないが、款名の汚染は Σ を素通りする。
      if (orphan && orphanLi === li - 1) {
        emit(Number(bare[1]), orphan.namePart, orphan.ints, orphan.raw, true);
        orphan = null;
        continue;
      }
      if (pendNo == null) pendNo = Number(bare[1]);
      continue;
    }

    // 行頭の款番号（○ 2 のような付番マーカー接頭辞を許容）。款名が両端揃えで
    // 款番号と名前が密着する様式（富士吉田「1議会費」）に対応するため、番号直後の
    // 空白は必須にせず「次が数字・カンマでない（＝金額の一部でない）」ことだけ要求する。
    // **0 は款番号として認めない**（`[1-9]\d*`・2026-07-16・葛飾 R2）。原典は款に 0 を振らないので、
    // 行頭の 0 は款番号ではなく**廃止款の当年度額**である:
    //   `     自動車取得税`                                        ← 上段（款名）
    //   `○                    0    182,000   △ 182,000   皆減`   ← ○ は廃止マーカー（U+25CB）
    // ここで 0 を款番号として読むと `kanNo: 0` になり、しかも `!lead` を条件とする廃止款の分岐
    // （下記 abolished）に入れなくなる。**schema が kanNo>0 を要求するので parse で落ちる**＝
    // 静かには壊れないが、廃止款を1件取り落とす。§9c の「記号が自治体ごとに全部違う」に加えて
    // **同じ葛飾の中で年度ごとに違う**（R2 は ○ U+25CB・R4 は 〇 U+3007）ため、マーカーの字を
    // 足して回るのではなく**「款番号に 0 は無い」という不変条件のほうを効かせる**。
    const lead = raw.match(/^\s*[○◎●]*\s*([1-9]\d*)(?![\d,])/);
    // 款行でも整数の百分率（`0%`・`100%`）が金額に紛れうるので合計行と同じ扱いにする。
    // **lead の判定より後**に置くこと（款番号は百分率ではないので剥がしてはいけない）。
    const rest = stripPercents(lead ? raw.slice(raw.indexOf(lead[1]!) + lead[1]!.length) : raw);
    const tokens = rest.match(AMOUNT_RE) ?? [];
    const ints = tokens.filter((t) => !t.includes("."));
    // 款名の三点リーダを落とす（2026-07-16）。堺 R2 は折返しの上段末尾に `…` が入る
    // （`ゴ ル フ 場 利 用 税…` / `国有提供施設等所在…` / `交 通 安 全 対 策…`）が、
    // **同じ款・同じ折返しの R3 には無い**ので款名の一部ではなく R2 の組版の体裁記号。
    // 款名に三点リーダが入る自治体は無いので一律で落とす。
    const namePart = fixRadicals(tokens[0] != null ? rest.slice(0, rest.indexOf(tokens[0])) : rest)
      .replace(/[\s　]/g, "")
      .replace(/[…‥]/g, "")
      // **脚注マーカーを落とす**（2026-07-17・北区）。北区は款名の末尾に半角カナの参照記号を置く:
      //   `21 特 別 区 債 (ｱ)   4,124,000 …`  → 款名が `特別区債(ｱ)` になる
      // これは**款名の一部ではない** — 原典が巻末の公債依存度の算式 `(ｱ)/(ｲ)` から参照するための
      // 記号で、`(ｲ)` は歳入合計行に付く。**款名は原典どおりに残す**のが原則（§9c の「括弧は
      // 原典が印字している款名の一部だから落とさない」）だが、**脚注マーカーは款名ではない**ので
      // 落とす側。ダッシュ（値セルの滲み）と同じ「款名欄に紛れ込んだ別物」の扱い。
      // ⚠ **Σ も validate も止めない**（`(ｱ)` は KANNAME_JUNK_RE の語彙に無い）。北区は
      //   H24・H26〜R5 の12年度で汚れ、**R6〜R8 はクリーン**＝「新しい年度ほど汚れる」ではない。
      //   放置すると**年度間の款名結合が R5↔R6 の境界で切れる**（`特別区債(ｱ)` ≠ `特別区債`）。
      // 半角カナ1文字の括弧書きだけを対象にする（全角括弧の `（特別区債）` 等の廃止款表記や、
      // 新宿 H20 の `環境清掃費（⑲環境費）` のような**原典が意味を持たせた注記**は落とさない）。
      .replace(/\([ｱ-ﾝ]\)$/, "")
      // 縦書きの表側ラベルが1文字だけ紛れ込む様式（Options.kanNamePrefixStrip 参照）
      .replace(opts.kanNamePrefixStrip ? new RegExp(`^[${opts.kanNamePrefixStrip}]`) : /(?!)/, "");

    // **廃止款**（当年度に廃止された税目）。原典は款番号の代わりに記号を置くか、何も置かない:
    //   甲府 R2   `廃款 （自動車取得税交付金）        76,900  △ 76,900   皆減`
    //   福岡 R8   `▲ 自動車取得税交付金   -   -   1  0.0  △1  皆減`
    //   北九州 R3 `〇 自動車取得税交付金        0        10  △   10`     ← U+3007。皆減の語が無い
    //   札幌 R8   `△ 〈款名は上下段に折返し〉  0  0.0  694,000  0.1  △694,000  皆減`
    //   川崎 R2   `   自動車取得税交付金   −   −   861,318  0.1  △861,318  皆減`  ← 記号すら無い
    // 款番号（正の整数）を款行の判定に使っていたため**行ごと落ち、前年度Σだけが静かに不足**していた
    // （川崎 R2 で 861,318 千円＝8.6億）。docs §9c。大阪 §8e で kanNo を nullable にしたので、
    // **原典が番号を振っていないことをそのまま持って**拾えるようになった。
    //
    // 判定は「款番号が無い」かつ「廃止の印がある」の2条件に絞る（緩めると注記行を拾う）:
    //   印 = 行頭の廃止マーカー（廃款/△/▲/〇。〇 は U+3007 で ○ U+25CB とは別字）
    //        または 皆減（＝当年度0。原典自身の記号）
    const abolished =
      !lead &&
      ints.length >= 2 &&
      (/^\s*(?:廃款|[△▲〇])/.test(raw) || compact.includes("皆減"));
    if (abolished) {
      // 款名から**廃止マーカーと空セルのダッシュ**を落とす（`▲自動車取得税交付金--` `自動車税環境△`）。
      // 表示専用なので Σ も款名重複ゲートも守ってくれない領域＝出力を目視して確かめること。
      // マーカーを落として名前欄が空になる様式（札幌の中央寄せ3行折返し）では、
      // **落としてから awaitTail を判定しないと下段（`性能割交付金`）が次の款へ漏れる**。
      // **`○`（U+25CB）も落とす**（2026-07-16・葛飾 R2）。葛飾は上段に款名・下段にマーカーが来る型で、
      // 落とさないと款名が `自動車取得税○` になる（**Σ は差0 のまま＝目視でしか気づけない**）。
      // マーカーの検出自体は `皆減` が担っているのでここは表示の掃除だけ。§9c の記号の揺れは
      // 自治体間だけでなく**同じ葛飾の R2（○ U+25CB）と R4（〇 U+3007）でも起きる**。
      // **`－`（U+FF0D 全角ハイフンマイナス）も落とす**（2026-07-16・中央 H29）。空セルのダッシュは
      // 半角/全角でも揺れ、**同じ中央区の R6 は `0`（数値）・H29 は `－`**。落とさないと款名が
      // `（特別区債）－` になる（**Σ は差0 のまま＝目視でしか気づけない**）。
      // **`―`（U+2015 HORIZONTAL BAR）も落とす**（2026-07-17・文京 H27/H21）。上の U+FF0D 対応で
      // **隣のコードポイントを取りこぼしていた** — ダッシュ類は「1つ踏んだら周辺も来る」と考えて
      // 文字クラスごと広げる。文京は同じ廃止行が H27/H21 は `―`・H19 は無印と、**同一自治体の
      // 年度間でも揺れる**（中央 R6/H29 と同じ）。
      const cleaned = namePart.replace(/^(?:廃款|[△▲〇○])/, "").replace(/[○〇]$/, "").replace(/[-−–—－―]/g, "");
      emit(null, pendName + cleaned, ints, raw, cleaned === "");
    } else if (pendNo != null && lead && namePart === "" && ints.length >= 1) {
      // **折返し款の金額行なのに、当年度額そのものが lead に食われる**（2026-07-17・台東 R8 の
      // 款7 環境性能割交付金）。原典は**象徴計上の1千円**を置く:
      //     環境性能割
      //   7   交付金
      //                        1     0.0    137,474   0.1  △ 137,473 △ 100.0
      // 金額行が `1` で始まるため lead 正規表現が**その 1 を款番号と誤読**し、
      // `款1 環境性能割交付金 137,474/137,473`（正: 款7・1・137,474）になる。しかも `rest` は
      // lead の後ろなので**当年度額 1 そのものが消える**。
      // ⚠ **§10b-5 の「款番号に 0 は無い」ガード（`[1-9]`）は 0 は弾けるが 1 は弾けない。**
      //   杉並 §10i の `kanNoless × 象徴計上の1桁金額` と同根で、**象徴計上は款番号と区別できない**。
      // → **pendNo が立っている＝折返しの途中なら、行頭の整数は款番号ではない**（款番号は
      //   既に前の行で読んでいる）。raw から取り直して金額として扱う。
      // ⚠ **`namePart === ""` の条件は必須**。外すと `13 繰入金 31,292,496 …` のような
      //   **完結した款行**まで拾い、款番号 13 を金額と読んで amount=13 になる（京都・相模原で実害）。
      const allInts = (stripPercents(raw).match(AMOUNT_RE) ?? []).filter((t) => !t.includes("."));
      emit(pendNo, pendName + namePart, allInts, raw);
    } else if (lead && ints.length >= 2) {
      // 完結した款行（従来形式）。直前の折返し断片があれば款名の先頭に足す。
      // 名前欄が空なら款名は上下の断片にある → 下段を待つ（awaitTail）
      const kanNo = Number(lead[1]);
      emit(kanNo, pendName + namePart, ints, raw, namePart === "" || tailKans.has(kanNo));
    } else if (opts.kanNoless && ints.length >= 2 && hasCJK(pendName + namePart)) {
      // 款番号を持たない様式（Options.kanNoless 参照）。原典が振っていないので kanNo は null。
      // 断片（`入 使用料及び手数料` のように款名だけが別行に出る）も pendName 経由で拾う。
      //
      // **awaitTail を渡す**（2026-07-16 修正・杉並で発覚）。上の abolished 分岐・lead 分岐は
      // どちらも「名前欄が空なら下段を待つ」を渡しているのに、**この分岐だけ渡していなかった**。
      // 款番号なし＋中央寄せ3行折返しの様式では**下段が次の款へ漏れる**:
      //   `株 式 等 譲 渡`                                  ← 上段（pendName）
      //   `            4,140,000  2,520,000  1,620,000`   ← 款行・名前欄が空
      //   `所 得 割 交 付 金`                                ← 下段。**待たないと次の款名に化ける**
      //   → `株式等譲渡` / `所得割交付金地方消費税交付金`（実測）
      // **金額は全件正しく Σ も4系統すべて差0 で通る＝検証ゲートを完全に素通りする**。
      // 既存の唯一の kanNoless ソース（岡山）は款行に折返しが無く、この穴は潜在していた。
      emit(null, pendName + namePart, ints, raw, namePart === "");
    } else if (tokens.length === 0) {
      // 金額のない款名断片（折返しの上段/下段）。日本語断片のみ採る。
      // 「款名 （A）（%）…」等の列見出し行は款名に混ぜない。
      // **弾くのは英字と％であって、全角括弧そのものではない**（2026-07-16 に修正）。
      // 括弧ごと弾いていたため、**括弧書きの廃止款が3行に折返す様式**（堺 R8 の
      // `（環境性能割` / `861,000 … 皆減` / `交付金）`）で上下段が両方とも捨てられ、
      // 款名が空になって**行ごと落ちていた**（前年度Σが 861,000 = 合計の0.18% 不足）。
      // 列見出しは `（A）`・`（%）` のように**中身が英字か％**なので、そちらで弾けば足りる。
      if (hasCJK(namePart) && !/[()%％ＡＢＣA-Za-z]/.test(namePart) && !isUnitOnly(namePart)) {
        // **款番号と款名の下段が同じ行にある折返し**（2026-07-17・台東）:
        //     株式等譲渡          ← 上段（款番号なし）
        //   5    所得割交付金      ← 款番号＋下段（**金額が無い**）
        //                    1,591,581  1.0  447,324 …   ← 金額行（款番号なし）
        // 従来は**この `5` を捨てて**款名だけ pendName に足していたので、続く金額行がどの款の
        // ものか分からず**行ごと落ちていた**（台東 R8 で7款・Σ −13,807,483）。**Σ が捕まえる**ので
        // 静かには壊れないが、収録できなかった。→ 款番号を覚えておけば既存の「折返し款の金額行」
        // 分岐がそのまま拾える。`pendNo == null` の条件で、先に立った款番号を上書きしない。
        if (lead && pendNo == null) pendNo = Number(lead[1]);
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
    } else if (ints.length >= 2 && hasCJK(namePart)) {
      // 款番号が無く、どの款にも結び付かない金額行。**直後に款番号の単独行が来れば**
      // その款の上段（bare の分岐で拾う）。来なければ従来どおり無視される。
      orphan = { namePart: pendName + namePart, ints, raw };
      orphanLi = li;
    }
    // 上記以外（ページ番号など）は無視
  }

  if (lines.length === 0) throw new Error(`${filename} ${pageLabel}: 款行が1件も抽出できませんでした`);
  if (total == null) throw new Error(`${filename} ${pageLabel}: ${totalLabel} 行が見つかりません`);
  // **閉じ括弧を伴わない行頭の開き括弧を落とす**（2026-07-22・墨田 R8）。墨田の廃止款括弧行は
  //   `(環境性能割交付金        0   185,000 …`  ← -layout 経路で閉じ括弧が別トークンに割れる
  // ため、款名が `(環境性能割交付金` になる（Σ は差0 のまま＝目視でしか気づけない。同じ行を
  // R2 の -raw 経路で読むと括弧が分離されてクリーン＝抽出経路依存の滲み）。
  // ⚠ **バランスした括弧は落とさない** — `（特別区債）`（文京・中央の廃止款表記）や
  //   `環境清掃費（⑲環境費）`（新宿 H20 の原典注記）は原典が意味を持たせた款名の一部。
  // ⚠ **折返しの組み立てが終わった款名に対して判定する**こと。namePart（断片）の段階で掃除すると、
  //   `（環境性能割` ＋ `交付金）` のような**折返しの上段だけを見て「閉じが無い」と誤判定**し、
  //   既存の `（環境性能割交付金）` を `環境性能割交付金）` に壊す（全293ソースの再 parse で実測）。
  for (const l of lines) l.kanName = l.kanName.replace(/^[（(](?=[^）)]*$)/, "");
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

// ---- 主な事業「kan-tree」（相模原 R8）--------------------------------------
// 款→項→目 の木の中に事業が並ぶ様式。**政令市で款が付く数少ない主な事業**
// （§8b の「政令市はどの市も款が紐付かない」が覆る）。
//
// **`-layout` の文字列では親と内訳を区別できない** — 款項目の文字が前に詰まるので
// 同じ階層の行が別の列に見える（親の `○` が表示列27、内訳の `○` が22 に来るなど逆転する）。
// **列の x（pt）を実測して使う**（-tsv。全ページで安定）:
//   款     番号 47.8 / 名前 56.4      親事業  マーカー 172.6 / 名前 187.1
//   項     65.1 / 73.7               内訳    マーカー 187.1 / 名前 201.6
//   目     82.3 / 91.0               事業費  右揃え xMax 398
//
// **新規は `㊟新`（丸囲みの新）で、`○`/`・` を置き換える**。`-tsv` では ○+●+新 の3語に割れる
// ので、マーカーではなく**事業名の x** で階層を決める。
//
// **債務負担行為は歳入歳出予算とは別ではなく、事業費の内訳**（2026-07-16 実測）:
//   `○   総合計画策定経費              60,449`   ← 親（名前 x=187.1）
//   `㊟新 総合計画策定経費（債務負担行為） 50,204`  ← 内訳（名前 x=201.6）
//   説明欄に「限度額 71,082千円 / 令和8年度の支出見込額 50,204 / 令和9年度の支出予定額 20,878」
//   ＝ **R8 ぶんの 50,204 は親の 60,449 に含まれる**。`・`（細事業）も同じく親の内訳
//   （p.19 の文化施設改修事業費は親 1,004,475 / 内訳 863,103 で**一般財源 95,267 が親子で同一**）。
// → **親だけを採る**。債務負担行為ぶんは親の事業費に自動的に含まれ、二重計上にならない。
//   翌年度ぶん（上の例なら 20,878）は R8 の歳入歳出予算に無い＝別物だが、説明欄の自由文なので未収録。
function parseProjectsKanTree(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const KAN_NAME_X = [55, 62] as const; // 款名（ページで 56.4〜59.7 と動く）
  const OWN_NAME_X = [184, 192] as const; // 親事業の事業名
  const SUB_NAME_X = [198, 206] as const; // 内訳の事業名（親に含まれるので採らない）
  const OWN_MARK_X = [168, 178] as const; // 親事業のマーカー（○ / ㊟新 の丸）
  const AMOUNT_XMAX = [390, 402] as const; // 事業費（右揃え）
  // **`○`(U+25CB) と `〇`(U+3007) が混在する**（親のマーカー列に 342件 と 7件・実測）。
  // 北九州 §8j の廃止款と同じ罠で、片方だけ数えると件数が合わない。
  const MARKS = new Set(["○", "〇", "・", "●", "新", "◎"]);
  const inX = (v: number, r: readonly [number, number]) => v >= r[0] && v <= r[1];

  const out: BudgetProjectFact[] = [];
  let kan: string | null = null;
  let expected = 0;
  for (let page = from; page <= to; page++) {
    const ws = pdfPageWords(filePath, page);
    if (ws.length === 0) continue;
    // 行にまとめる（y が 4pt 以内）
    const rows: Word[][] = [];
    for (const w of [...ws].sort((a, b) => a.y - b.y || a.x - b.x)) {
      const last = rows[rows.length - 1];
      if (last && Math.abs(last[0]!.y - w.y) <= 4) last.push(w);
      else rows.push([w]);
    }
    let open: BudgetProjectFact | null = null; // 名前が次行へ続く親事業
    for (const row of rows) {
      expected += row.filter((w) => (w.text === "○" || w.text === "〇") && inX(w.x, OWN_MARK_X)).length;
      // 表ヘッダ（`款 項 目 / 事 業 名 / 事業費 / 財源内訳`）は毎ページ繰り返される。
      // ヘッダの「事」は x=194.2 で親（187）とも内訳（201）とも違うため、除外しないと
      // 下の階層チェックが必ず throw する（＝ゲートが先に教えてくれた）。
      // **ヘッダの x はページで微妙に動く**（款が 56.5 のページと 59.7 のページがある）ので
      // 位置ではなく「款・項・目 が同じ行に揃う」ことで判定する。
      const t = new Set(row.map((w) => w.text));
      if (t.has("款") && t.has("項") && t.has("目")) continue;
      const kanW = row.find((w) => inX(w.x, KAN_NAME_X) && hasCJKChars(w.text));
      if (kanW) {
        kan = kanW.text;
        open = null;
        continue;
      }
      // 事業名の語（マーカーは除く）。x で親（187）と内訳（201）を分ける
      const nameW = row.filter((w) => !MARKS.has(w.text) && w.x >= 180 && w.x <= 210);
      if (nameW.length === 0) {
        open = null;
        continue;
      }
      // **中黒が名前に密着する行がある**（`・上溝学校給食センター` が1語・実測3件）。
      // その語は内訳のマーカー位置（x=187）から始まるので、x だけ見ると親に見える。
      if (/^[・○〇]/.test(nameW[0]!.text)) {
        open = null; // 内訳
        continue;
      }
      const x = nameW[0]!.x;
      if (inX(x, SUB_NAME_X)) {
        open = null; // 内訳は親の事業費に含まれるので採らない
        continue;
      }
      if (!inX(x, OWN_NAME_X)) {
        throw new Error(
          `${filename} p.${page}: 事業名の x=${x.toFixed(1)} が親（${OWN_NAME_X.join("-")}）にも` +
            `内訳（${SUB_NAME_X.join("-")}）にも当たりません: 「${nameW.map((w) => w.text).join("")}」。` +
            `階層を推測すると二重計上か取りこぼしになるので組みません`,
        );
      }
      const name = nameW.map((w) => w.text).join("");
      const amtW = row.find((w) => /^[\d,]+$/.test(w.text) && inX(w.x + w.w, AMOUNT_XMAX));
      if (!amtW) {
        // 事業名が次行へ折返す（`スポーツ施設維持管理計画策定` / `経費`・`（債務負担行為）`）
        if (open) open.name += name;
        continue;
      }
      if (!kan) continue;
      const line: BudgetProjectFact = {
        kan,
        no: null,
        // ㊟新 は ○+●+新 に割れる。親レベルの `新` があれば新規
        kubun: row.some((w) => w.text === "新" && w.x < 180) ? "新規" : null,
        name,
        budgetBookName: null,
        amount: toAmount(amtW.text),
        description: "",
        basicGoal: "",
        shisaku: "",
        locator: { file: filename, page },
      };
      out.push(line);
      open = line;
    }
  }
  // **親のマーカー（○）の数と、拾えた事業の数が一致すること**。
  // 一致を要求しないと、様式の変種を**黙って落とす**（座標で切る前は新規の親事業を
  // 36件まるごと落としていた）。
  if (out.length !== expected) {
    throw new Error(
      `${filename} p.${from}-${to}: 親事業のマーカーが ${expected} 件あるのに ${out.length} 件しか` +
        `組めませんでした（差 ${expected - out.length}）`,
    );
  }
  if (out.length === 0) throw new Error(`${filename} p.${from}-${to}: 事業が1件も抽出できませんでした`);
  return out;
}

// 北九州「一般会計予算に関する説明書」歳出事項別明細書の説明欄（2026-07-23・#126）。
// 款別（kitakyushu-yosansho-*）と**同一ファイル**の p.123-258（R8）に、〇マーカーの親事業が
// 款項目つきで並ぶ。相模原 kan-tree の変種だが座標体系が違う（横置き・x が全て別）ので別実装:
//   款見出し   `1 款 議会費`（番号28.5 / 「款」34.5 / 款名43.5・独立行）
//   概要行     x=580.3（金額なし・「議会及び事務局運営に要する経費」等）→ 無視
//   親事業     **〇が事業名に1語密着**（`〇市民体育…` x=587.2-587.3）・金額 右揃え xMax≈820.8
//   内訳       x=594.2・**マーカーなし**・金額 xMax≈779.0 → 親に含まれるので採らない
//   親名の折返し継続行は親と同じ x=587.3 に来る（〇の有無で判別）。金額は継続行か単独行に載る。
// **債務負担行為の行は歳出明細に存在しない**（巻末の233条調書に分離・R4〜R8 で語の出現0を実測）
// ＝相模原型の親子重複問題は起きない。**Σ親=目・Σ内訳=親の完全分解**が成り立つ資料
// （R8 で機械検証済み。目161件中158一致・残差3件は折返し金額の取りこぼしと特定）。
// 廃止項/目マーカー ○(U+25CB) は x=16.6/45.1 に出るが、親の x 窓（585-590）で自動排除される。
function parseProjectsMeisaiTree(
  filePath: string,
  filename: string,
  from: number,
  to: number,
): BudgetProjectFact[] {
  const OWN_X = [584, 591] as const; // 親事業（〇密着の事業名・折返し継続行も同じ列）
  const SUB_X = [592, 599] as const; // 内訳（マーカーなし・親に含まれるので採らない）
  const OWN_AMOUNT_XMAX = [814, 826] as const; // 親の事業費（右揃え）
  const inX = (v: number, r: readonly [number, number]) => v >= r[0] && v <= r[1];

  const out: BudgetProjectFact[] = [];
  let kan: string | null = null;
  let expected = 0;
  // 金額待ちの親（〇行に金額が無く、継続行・単独行に載る型）
  let pending: { fact: BudgetProjectFact; page: number } | null = null;
  const flush = () => {
    if (!pending) return;
    throw new Error(
      `${filename} p.${pending.page}: 親事業「${pending.fact.name}」の事業費が見つからないまま` +
        `次の構造が始まりました（折返しの金額行を取りこぼすと Σ親=目 が割れるので組みません）`,
    );
  };
  for (let page = from; page <= to; page++) {
    const ws = pdfPageWords(filePath, page);
    if (ws.length === 0) continue;
    const rows: Word[][] = [];
    for (const w of [...ws].sort((a, b) => a.y - b.y || a.x - b.x)) {
      const last = rows[rows.length - 1];
      if (last && Math.abs(last[0]!.y - w.y) <= 4) last.push(w);
      else rows.push([w]);
    }
    for (const row of rows) {
      expected += row.filter((w) => /^[〇○]./.test(w.text) && inX(w.x, OWN_X)).length;
      // 款見出し `1 款 議会費`。「款」が独立の語で x≈34.5 に来る（表ヘッダは範囲内に無い様式）
      const kanMark = row.find((w) => w.text === "款" && w.x >= 28 && w.x <= 42);
      if (kanMark) {
        const nameW = row.filter((w) => w.x > kanMark.x && w.x <= 60 && hasCJKChars(w.text));
        if (nameW.length > 0) {
          flush();
          kan = nameW.map((w) => w.text).join("");
        }
        continue;
      }
      const ownW = row.filter((w) => inX(w.x, OWN_X));
      const amtW = row.find((w) => /^[\d,]+$/.test(w.text) && inX(w.x + w.w, OWN_AMOUNT_XMAX));
      if (ownW.length === 0) {
        // 親名ゾーンに語が無い行: 金額の単独行なら金額待ちの親に与える。それ以外（内訳・概要・
        // 目行・節金額など）は無視。⚠ 内訳の金額は xMax≈779 なので OWN_AMOUNT_XMAX に当たらない
        if (amtW && pending) {
          pending.fact.amount = toAmount(amtW.text);
          out.push(pending.fact);
          pending = null;
        }
        continue;
      }
      const joined = ownW.map((w) => w.text).join("");
      if (/^[〇○]/.test(joined)) {
        // 新しい親事業の開始
        flush();
        if (kan == null) throw new Error(`${filename} p.${page}: 款見出しの前に事業が現れました: 「${joined}」`);
        const kanNow: string = kan;
        const fact: BudgetProjectFact = {
          kan: kanNow,
          no: null,
          kubun: null,
          name: joined.replace(/^[〇○]/, ""),
          budgetBookName: null,
          amount: 0,
          description: "",
          basicGoal: "",
          shisaku: "",
          locator: { file: filename, page },
        };
        if (amtW) {
          fact.amount = toAmount(amtW.text);
          out.push(fact);
        } else {
          pending = { fact, page };
        }
      } else if (pending) {
        // 親名の折返し継続行（〇なし・同じ x 窓）。金額が同じ行に載ることもある
        pending.fact.name += joined;
        if (amtW) {
          pending.fact.amount = toAmount(amtW.text);
          out.push(pending.fact);
          pending = null;
        }
      }
      // pending が無いのに継続行らしき語が来るのは、直前の親が金額確定済みで名前だけ折返した型。
      // 名前の後半が落ちる（表示専用の欠け）が、金額と件数は正しいまま。件数 assert で検出できないため
      // ここは黙って捨てず、直前の親に追記する
      else if (out.length > 0 && !/^[\d,]+$/.test(joined)) {
        out[out.length - 1]!.name += joined;
      }
    }
  }
  flush();
  if (out.length !== expected) {
    throw new Error(
      `${filename} p.${from}-${to}: 親事業のマーカー（〇）が ${expected} 件あるのに ${out.length} 件しか` +
        `組めませんでした（差 ${expected - out.length}）`,
    );
  }
  if (out.length === 0) throw new Error(`${filename} p.${from}-${to}: 事業が1件も抽出できませんでした`);
  return out;
}

// 浜松 資料02「市政運営の基本方針の主要事業」（2026-07-23・#126）。R8: 414事業・97p 全域が
// 番号つきの行表（節ごとに1から振り直す27節・全行に款セルと金額と所管課）。座標（実測）:
//   事業番号 x=64.4-70.1（1〜2桁・半角）/ 事業名 x=79.4（折返し継続行・（新規）タグも同x）/
//   説明・細目 x≥99.5（金額なし・名前と x で分かれる）/ 款セル x=268-368 で変動（固定xで切れない）/
//   金額 右端 xMax≈465（左端418-442）/ 所管課 x=470.1
// **行が y 1pt ずれて割れる**（R7 で款が番号行の1pt上に来る実測例）→ ブロック＝番号行＋続く2行で組む。
// ⚠ **款セルの括弧が3種混在**（半角390・全角/混合24・R8実測）。ASCII 括弧だけの正規表現だと
//   24件（衛生費の大半を含む）を**静かに落とす**ので、開き・閉じとも両方の字を受ける。
// ⚠ **特別会計・企業会計の事業が11件、ページで切れずに混在**（款セルが「…会計」）。一般会計の
//   款ドリルに載せられないので**除外し、件数 assert は「番号行数 = 採用 + 特会除外」**で張る。
// ⚠ **複合款7件**（「民生費、教育費」等・内訳金額なし＝按分不可）は kan を null で保持
//   （款別一覧に無い款名は validate の error になるため。事業自体は実データなので落とさない）。
// ⚠ 「※…の一部」の再掲（59行）があるため **Σ事業と款予算の照合ゲートは張れない**（北九州
//   meisai-tree の等式とは資料の性質が違う）。番号の節内連番チェックをパーサ内で行う
//   （validate の No 連番・重複チェックは節ごとリセットと相性が悪いので no は null にする）。
function parseProjectsNumberedRows(
  filePath: string,
  filename: string,
  from: number,
  to: number,
  kanlessAllowed: number,
): BudgetProjectFact[] {
  const NO_X = [55, 76] as const;
  const NAME_X = [77, 96] as const; // 名前の開始 x（説明 99.5 と分ける）
  const KAN_X = [250, 430] as const;
  const AMOUNT_XMAX = [455, 475] as const;
  const KAN_RE = /^[（(][^0-9０-９（）()]+[）)]$/;
  const inX = (v: number, r: readonly [number, number]) => v >= r[0] && v <= r[1];

  interface Block { no: number; page: number; rows: Word[][]; isNew: boolean }
  // まずページごとに行へまとめ、番号行でブロックに割る。
  // ⚠ **（新規）タグは番号行の1行前**（独立行・x=79.4）に来る（R7 p.28 で実測）。素直に割ると
  //   前のブロックの末尾に付いて**新規が1つ前の事業へずれる**（実際にそうなった）ので、
  //   タグ行はブロックへ入れず「次のブロックの新規フラグ」として持ち越す。
  const NEW_TAG_RE = /^[（(〈]新規[）)〉]$/;
  const blocks: Block[] = [];
  let numberRows = 0;
  let pendingNew = false;
  for (let page = from; page <= to; page++) {
    const ws = pdfPageWords(filePath, page);
    if (ws.length === 0) continue;
    const rows: Word[][] = [];
    for (const w of [...ws].sort((a, b) => a.y - b.y || a.x - b.x)) {
      const last = rows[rows.length - 1];
      if (last && Math.abs(last[0]!.y - w.y) <= 2) last.push(w);
      else rows.push([w]);
    }
    for (const row of rows) {
      if (row.length === 1 && NEW_TAG_RE.test(row[0]!.text)) {
        pendingNew = true;
        continue;
      }
      const noW = row.find((w) => /^\d{1,3}$/.test(w.text) && inX(w.x, NO_X));
      if (noW) {
        blocks.push({ no: Number(noW.text), page, rows: [row], isNew: pendingNew });
        pendingNew = false;
        numberRows++;
      } else if (blocks.length > 0 && blocks[blocks.length - 1]!.page === page) {
        blocks[blocks.length - 1]!.rows.push(row);
      }
    }
  }

  const out: BudgetProjectFact[] = [];
  let excludedTokkai = 0;
  const kanless: string[] = [];
  let prevNo = 0;
  for (const b of blocks) {
    // 節内連番（次番号 = 前+1 か、節の切り替わりで 1）。R8・R7 で成立を実測済み —
    // 破れたら番号行の取り違え（説明中の数字を番号と誤認等）なので throw
    if (b.no !== prevNo + 1 && b.no !== 1) {
      throw new Error(`${filename} p.${b.page}: 事業番号が連番でありません（直前 ${prevNo} → ${b.no}）`);
    }
    prevNo = b.no;
    let name = "";
    let kan: string | null = null;
    let amount: number | null = null;
    let isNew = b.isNew;
    for (const [i, row] of b.rows.entries()) {
      for (const w of row) {
        if (i === 0 && inX(w.x, NO_X) && /^\d{1,3}$/.test(w.text)) continue; // 番号
        if (KAN_RE.test(w.text) && inX(w.x, KAN_X) && kan == null) {
          kan = w.text.replace(/^[（(]/, "").replace(/[）)]$/, "");
          continue;
        }
        if (/^[\d,]+$/.test(w.text) && inX(w.x + w.w, AMOUNT_XMAX) && amount == null) {
          amount = toAmount(w.text);
          continue;
        }
        if (w.x >= 468) continue; // 所管課
        // 名前: 番号行では x77 以降（款・金額は上で消費済み）。継続行は行頭 x が NAME_X の行だけ
        //（説明・細目 x≥99.5 の行は名前に混ぜない）
        const rowStart = row.find((r2) => r2.x >= NAME_X[0])?.x ?? 999;
        if (i === 0 ? w.x >= NAME_X[0] && w.x < 450 : inX(rowStart, NAME_X) && w.x < 450) {
          if (/^[（(〈]新規[）)〉]$/.test(w.text)) { isNew = true; continue; }
          name += w.text;
        }
      }
    }
    if (kan != null && /会計/.test(kan)) { excludedTokkai++; continue; } // 特会・企業会計は対象外
    // 複合款（「民生費、教育費」等・内訳金額なし＝按分不可）は kan を null にして事業は保持
    //（款別一覧に無い款名は validate の error になる）。**款セル自体は拾えている**ので
    // kanless（＝括弧の変種の取りこぼし検知）には数えない
    let compoundKan = false;
    if (kan != null && /[、，]/.test(kan)) { kan = null; compoundKan = true; }
    if (kan == null && !compoundKan) kanless.push(`p.${b.page} No.${b.no}「${name.slice(0, 20)}」`);
    if (amount == null) {
      throw new Error(`${filename} p.${b.page} No.${b.no}「${name.slice(0, 20)}」: 金額が見つかりません`);
    }
    // 「※…の一部」「※…の合計」の注記行は名前と同じ x=79.4 に来る（説明 x≥99.5 とは別）。
    // 名前に混ぜず description へ分ける — **別事業の金額の一部を切り出した再掲**（R8 で59行）で
    // あることが画面で読めるように、原典の注記をそのまま残す
    let description = "";
    const starIdx = name.indexOf("※");
    if (starIdx >= 0) {
      description = name.slice(starIdx);
      name = name.slice(0, starIdx);
    }
    if (!name) throw new Error(`${filename} p.${b.page} No.${b.no}: 事業名が空です`);
    out.push({
      kan, no: null, kubun: isNew ? "新規" : null, name, budgetBookName: null,
      amount, description, basicGoal: "", shisaku: "",
      locator: { file: filename, page: b.page },
    });
  }
  // 件数の網: 番号行の数 = 採用した事業 + 特会除外。どちらかを静かに落とすと合わなくなる
  if (out.length + excludedTokkai !== numberRows) {
    throw new Error(
      `${filename}: 番号行 ${numberRows} 件に対し 採用 ${out.length} + 特会除外 ${excludedTokkai} で` +
        `一致しません（差 ${numberRows - out.length - excludedTokkai}）`,
    );
  }
  // kanless は「款セルそのものが拾えなかった」件数（括弧の変種の取りこぼし検知）。
  const trulyKanless = kanless.length;
  if (trulyKanless > kanlessAllowed) {
    throw new Error(
      `${filename}: 款セルを持てない事業が ${trulyKanless} 件あります（許容 ${kanlessAllowed}）:\n  ` +
        kanless.join("\n  ") +
        `\n  括弧の変種（全角/混合）の取りこぼしを疑うこと`,
    );
  }
  if (out.length === 0) throw new Error(`${filename} p.${from}-${to}: 事業が1件も抽出できませんでした`);
  return out;
}

// meisai-tree（北九州）は**Σ事業 = 款の完全分解**が成り立つ資料（説明欄が歳出予算を漏れなく
// 分解している。R8 で16款すべて厳密一致を実測）。「主な事業の Σ ≤ 款」（抜粋・§2-4）より強い
// **等式**で張れる、収録中では唯一の網。折返し金額の取り違え・事業の取り落としを款単位で捕まえる。
function assertMeisaiTreeDecomposition(
  projects: BudgetProjectFact[],
  expLines: BudgetLineFact[],
  sourceId: string,
): BudgetProjectFact[] {
  const kanAmount = new Map(expLines.map((l) => [l.kanName, l.amount]));
  const sums = new Map<string, number>();
  // meisai-tree は全事業に款が付く（付かない行はパース時に throw 済み）。型上の null だけ弾く
  for (const p of projects) {
    if (p.kan == null) continue;
    sums.set(p.kan, (sums.get(p.kan) ?? 0) + p.amount);
  }
  for (const [kan, sum] of sums) {
    const want = kanAmount.get(kan);
    if (want == null) throw new Error(`${sourceId}: 事業の款「${kan}」が歳出の款別一覧にありません`);
    if (sum !== want) {
      throw new Error(
        `${sourceId}: 款「${kan}」の Σ事業 ${sum.toLocaleString()} が款予算 ${want.toLocaleString()} と` +
          `一致しません（差 ${(sum - want).toLocaleString()}。この資料は完全分解なので等式で張る）`,
      );
    }
  }
  return projects;
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
    spread?: { namePage: number; amountPage: number },
  ): number[] => {
    // 見開き2ページ型は spread がページ指定を兼ねる（locator は款名ページを指す）
    if (spread) {
      if (single || range) {
        throw new Error(`${source.id}: parserOptions.${key}Spread と ${key}/${key}s は併用できません`);
      }
      return [spread.namePage];
    }
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
  const revenuePages = sidePages(opts.revenuePage, opts.revenuePages, "revenuePage", opts.revenueSpread);
  const expenditurePages = sidePages(
    opts.expenditurePage, opts.expenditurePages, "expenditurePage", opts.expenditureSpread,
  );
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
  // 歳入・歳出が別ファイルの分冊形式（revenueFile/expenditureFile）。片方だけの指定は
  // ファイル取り違えの温床なので認めない（両方指定 or 両方なし）
  if ((opts.revenueFile == null) !== (opts.expenditureFile == null)) {
    throw new Error(`${source.id}: revenueFile / expenditureFile は両方指定してください（片方だけは不可）`);
  }
  if (opts.revenueFile != null && opts.kanFile != null) {
    throw new Error(`${source.id}: kanFile と revenueFile/expenditureFile は併用できません`);
  }
  const sideFiles = opts.revenueFile != null;
  const revFile = sideFiles ? pick(opts.revenueFile, "歳入の款別一覧") : pick(opts.kanFile, "款別一覧");
  const expFile = sideFiles ? pick(opts.expenditureFile, "歳出の款別一覧") : revFile;
  // 主な事業ファイルは projectPages を使うときだけ解決する（分冊2ファイル構成で projectsFile
  // 未指定のとき、pick の「1ファイル前提」チェックが誤って throw するため）
  const projFile = opts.projectPages ? pick(opts.projectsFile, "主な事業") : revFile;

  const rev = parseKanPage(revFile.path, revFile.filename, revenuePages, "revenue", opts);
  const exp = parseKanPage(expFile.path, expFile.filename, expenditurePages, "expenditure", opts);
  if (opts.unit === "millionYen") {
    // 百万円 → 千円（×1000・印字値の等価変換）。facts と合計の両方
    for (const side of [rev, exp]) {
      for (const l of side.lines) {
        l.amount *= 1000;
        if (l.prevAmount != null) l.prevAmount *= 1000;
      }
      side.total *= 1000;
      if (side.prevTotal != null) side.prevTotal *= 1000;
    }
  }
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
                : projFmt === "kan-tree"
                  ? parseProjectsKanTree(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to)
                : projFmt === "numbered-rows"
                  ? parseProjectsNumberedRows(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to, opts.projectKanlessAllowed ?? 0)
                : projFmt === "meisai-tree"
                  ? assertMeisaiTreeDecomposition(
                      parseProjectsMeisaiTree(projFile.path, projFile.filename, opts.projectPages.from, opts.projectPages.to),
                      exp.lines, source.id)
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
