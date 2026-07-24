// さいたま市 行政報告書（決算に係る主要な施策の成果）パーサ — 事業報告（成果）
//
// 地方自治法233条5項の成果説明書。R6・500p・born-digital（DocuWorks・ToUnicode 完備）。
// **一般会計・歳出676事業が全件 `款/項/目`（番号＋款名を内包）を持つ**＝款ドリルへ直接紐付け可能
// （横浜と違い款名が報告書自身に載るので、R6予算＝罫線様式で未収録でも款名解決に困らない）。docs §8f。
//
// カード区切りは会計種別の見出し `（一般会計・歳出）` 等（全ドキュメントで853件・実測。
// 内訳: 一般会計歳入112・一般会計歳出676・特別会計歳入52・特別会計歳出13）。
// **見出しの直前にページ区切り（\f）が来ると、`\f` が見出し行の先頭にくっついて
// `^（` の行頭アンカーが外れる**（実測: 歳出689件中328件のみ `^（` が素で当たり、
// 残り361件は \f 付き）。→ 行頭アンカーを `^\x0c?（` にして \f の有無を吸収する。
// ⚠ この \f を跨いだ物理ページ計算は off-by-one を踏みやすい（§ splitCards のコメント参照）。
//
// 一般会計・歳出のカードだけが `事務事業名` ラベルを持つ（676件＝事務事業名の出現数と厳密一致）。
// 特別会計・歳出（13件）は `会計名` ラベルで款項目を持たない。**この2種を両方エミットし**、
// 会計名ベースの除外（横浜と同じ共有ロジック・derive-app-data.ts）に委ねることで、
// 除外件数が画面の「除外13件」として正しく出る（パーサ側で握りつぶすと「除外0＝会計の区別が無い
// 資料」と誤解される）。
//
// 金額11項目（当初予算額/補正予算額/前年度繰越額/流用額/予備費充用額/予算現額/支出済額/
// 翌年度繰越額/不用額/前年度支出済額/増減）は円単位・ラベルの内部スペースが不揃い
// （`当 初 予 算 額` は字間空白・`予備費充用額` は空白なし、等）。**ラベルは文字ごとに `\s*` を
// 挟んだ正規表現**で吸収する。
//
// ラベルの値は3段構えで拾う（実測689件中、tier2/3が要ったのは5件のみ）:
//  1. 同じ行でラベル直後（689件中684件はこれで足りる）
//  2. **値がラベルより先に印字される**（`予備費充用額` 4件 — 説明文が長く右カラムのラベルだけ
//     次行へ押し出される。値は単独行として1〜2行前に残る）
//     → ラベル行の1〜2行前に「数字だけの行」があればそれを使う
//  3. **ラベル自体が別の注記に割って挟まれ2行に分断される**（`流用額` 1件 — 「概要(12補)P.…」の
//     2本目の参照注記が「流」と「用額」の間に挟まる）→ 任意文字を跨いでよい緩いパターンでラスト
//     フォールバック（文字間 `.{0,40}?`・DOTALL。⚠ ゆるい分だけ誤爆しやすく、この1件も実際には
//     「流域」の「流」と無関係な後続の「用」に誤って架橋していた——たまたま値が0で正しかっただけ
//     なので、tier3 は最終手段としてのみ使い、増やさないこと）
// **予算現額はラベルを抽出せず「当初+補正+前年度繰越+流用+予備費充用」の合計から計算する**
// （このラベル自体が値より後に印字されて tier1/2 では拾えない例が689件中2件あったため、
//   そもそも抽出しない設計にして構造的に回避した）。
//
// 検証は既存スキーマのまま（新フィールドを増やさない）:
// - `costDiff`（横浜と同じ「差引」ゲート）＝資料が印字する「増減」。validate.ts が
//   支出済額(R6)−前年度支出済額(R5) と突き合わせる。
// - 予算現額の内訳合計と不用額の一致は**パーサ内部の自己検証**（件数の網。§2 の3件の壊れ方を
//   踏まえて実装したので、崩れたら真っ先にここが throw する）。
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

const fullText = (filePath: string): string =>
  execFileSync("pdftotext", ["-layout", filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** ラベルの文字間に任意個の空白を許す（字間空白の有無が語ごとにバラバラなため） */
const flexLabel = (label: string): string => [...label].map(escapeRe).join("\\s*");
/** 最終手段: ラベルの文字間に任意文字（改行含む）を許す（注記に割って分断された語を跨ぐ） */
const looseLabel = (label: string): string => [...label].map(escapeRe).join(".{0,40}?");

function toNum(raw: string): number | null {
  const s = raw.replace(/[\s　]/g, "");
  const neg = /^[△▲]/.test(s);
  const digits = s.replace(/^[△▲]/, "").replace(/,/g, "");
  if (!/^\d+$/.test(digits)) return null;
  const v = Number(digits);
  return neg ? -v : v;
}

/** 数字だけの行（空白除去後に △/▲ + 桁区切り数字のみ）なら値を返す */
function bareNumberLine(line: string): number | null {
  const s = line.trim();
  if (!s) return null;
  return /^[△▲]?[\d,　\s]+$/.test(s) ? toNum(s) : null;
}

/** ラベル1つぶんの値を3段構えで拾う（コメント冒頭の説明を参照） */
function extractLabelValue(block: string, label: string, excludePrefix?: string): number | null {
  const lines = block.split("\n");
  const strict = new RegExp(flexLabel(label), "g");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    for (const m of line.matchAll(strict)) {
      // 「支出済額」は「前年度支出済額」の部分文字列なので、直前が「前年度」なら別ラベルとして弾く
      if (excludePrefix && line.slice(Math.max(0, m.index! - excludePrefix.length), m.index!) === excludePrefix) {
        continue;
      }
      const tail = line.slice(m.index! + m[0].length);
      const v = toNum(tail);
      if (v != null) return v;
      // 値がラベルより先に印字される型（説明文の折り返しで右カラムのラベルだけ押し出される）
      for (const back of [1, 2]) {
        if (i - back >= 0) {
          const v2 = bareNumberLine(lines[i - back]!);
          if (v2 != null) return v2;
        }
      }
    }
  }
  // ラベル自体が別の注記で分断される型（最終手段。文字間に任意文字を許す）
  const loose = new RegExp(`${looseLabel(label)}\\s*([△▲]?[\\s　]*[\\d,　]+)`, "s");
  const m = loose.exec(block);
  return m ? toNum(m[1]!) : null;
}

interface Card {
  account: string;
  side: string;
  page: number;
  block: string;
}

/** カード見出し `（会計名・歳入|歳出）` で全文を分割する（\f の有無を吸収） */
function splitCards(text: string): Card[] {
  const headerRe = /^\x0c?（([^）]+)・(歳入|歳出)）/gm;
  const matches = [...text.matchAll(headerRe)];
  const cards: Card[] = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]!;
    const start = m.index!;
    const end = i + 1 < matches.length ? matches[i + 1]!.index! : text.length;
    // \f の個数+1 = 物理ページ。**見出し自身が \f で始まる場合はその \f も1個として数える**
    // （見出しは \f の直後＝新しいページの先頭にあるため）。start までで区切ると
    // この \f を跨ぐ前で止まり1ページ手前を指す（実測361/689件・ingest-reviewer で検出）。
    const page = text.slice(0, start + 1).split("\f").length;
    cards.push({ account: m[1]!, side: m[2]!, page, block: text.slice(start, end) });
  }
  return cards;
}

const MONEY_LABELS = [
  ["yosangaku", "当初予算額"],
  ["hoseigaku", "補正予算額"],
  ["zenKurikoshi", "前年度繰越額"],
  ["ryuyou", "流用額"],
  ["yobihi", "予備費充用額"],
  ["shishutsu", "支出済額"],
  ["yokuKurikoshi", "翌年度繰越額"],
  ["fuyou", "不用額"],
  ["zenShishutsu", "前年度支出済額"],
  ["zougen", "増減"],
] as const;
type MoneyKey = (typeof MONEY_LABELS)[number][0];

function extractMoney(block: string): Record<MoneyKey, number | null> {
  const out = {} as Record<MoneyKey, number | null>;
  for (const [key, label] of MONEY_LABELS) {
    out[key] = extractLabelValue(block, label, key === "shishutsu" ? "前年度" : undefined);
  }
  return out;
}

function firstLineMatch(block: string, labelRe: RegExp): string | null {
  for (const line of block.split("\n")) {
    const m = labelRe.exec(line);
    if (m) return m[1] ?? null;
  }
  return null;
}

/**
 * ラベルの右セルを、次の右カラムのラベル・参照注記が来る前で切る（最初に現れたもので切る）。
 * **2+スペースの間隔だけに頼らない** — 目名と「概要(当初)P. N」注記の間隔が半角1個のことがあり
 * （実測214/676件）、その場合 `\s{2,}` では切れず注記やラベル断片が measure に混入する
 * （ingest-reviewer で検出）。「概要」は常に固定の参照見出しなので無条件の停止語に加える。
 */
const cellBefore = (raw: string, ...stopLabels: string[]): string => {
  const stops = [/\s{2,}/, /概要/, ...stopLabels.map((l) => new RegExp(flexLabel(l)))];
  let cut = raw.length;
  for (const re of stops) {
    const m = re.exec(raw);
    if (m && m.index < cut) cut = m.index;
  }
  return raw.slice(0, cut).trim();
};

function parseCard(card: Card, filename: string, no: number): ProjectReportFact {
  const { block, account } = card;
  const isGeneral = account === "一般会計";

  let name: string | null = null;
  let buka: string | null = null;
  let measure: string | null = null;

  if (isGeneral) {
    const raw = firstLineMatch(block, /^\s*事務事業名\s*(.+)$/);
    if (raw) name = cellBefore(raw, "当初予算額");
  } else {
    const raw = firstLineMatch(block, /^\s*会計名\s*(.+)$/);
    if (raw) name = cellBefore(raw, "当初予算額");
  }
  const bukaRaw = firstLineMatch(block, /^\s*局\s*\/\s*部\s*\/\s*課\s*(.+)$/);
  if (bukaRaw) buka = cellBefore(bukaRaw, "補正予算額");

  if (isGeneral) {
    const measureRaw = firstLineMatch(block, /^\s*款\s*\/\s*項\s*\/\s*目\s*(.+)$/);
    if (measureRaw) {
      const mm = cellBefore(measureRaw, "前年度繰越額");
      const parts = /^(\d+)款\s*(.+?)\/(\d+)項\s*(.+?)\/(\d+)目\s*(.+)$/.exec(mm);
      if (parts) {
        const [, kanNo, kanName, kouNo, kouName, mokuNo, mokuName] = parts;
        // 款名を内包する形式（横浜は番号のみ・さいたまは名前まで載る）。
        // derive-app-data.ts の kanName 解決が「measure に埋め込まれた名前」を直接読めるよう、
        // `N款名前/` の形（スラッシュ区切り・名前の直後にスラッシュ）で統一する。
        measure = `${kanNo}款${kanName!.trim()}/${kouNo}項${kouName!.trim()}/${mokuNo}目${mokuName!.trim()}`;
      }
    }
  }

  if (!name) {
    throw new Error(`${filename} p.${card.page}: 事業名(事務事業名/会計名)を抽出できません`);
  }
  if (isGeneral && !measure) {
    throw new Error(`${filename} p.${card.page} 「${name}」: 款/項/目を抽出できません`);
  }

  const money = extractMoney(block);
  for (const [key, label] of MONEY_LABELS) {
    if (money[key] == null) {
      throw new Error(`${filename} p.${card.page} 「${name}」: ${label}を抽出できません（列ずれの可能性）`);
    }
  }
  const m = money as Record<MoneyKey, number>;

  // 予算現額は文字抽出に頼らず合計から計算する（コメント冒頭参照）。
  const genzaku = m.yosangaku + m.hoseigaku + m.zenKurikoshi + m.ryuyou + m.yobihi;
  // 自己検証（件数の網）: 予算現額 − 支出済額 − 翌年度繰越額 = 不用額。
  // 689件の実測で例外0（§2）なので、崩れたら列ずれ等の抽出誤りとして大声で落とす。
  const fuyouCheck = genzaku - m.shishutsu - m.yokuKurikoshi;
  if (fuyouCheck !== m.fuyou) {
    throw new Error(
      `${filename} p.${card.page} 「${name}」: 予算現額(${genzaku})−支出済額(${m.shishutsu})−翌年度繰越額` +
        `(${m.yokuKurikoshi})=${fuyouCheck} が 不用額(${m.fuyou}) と一致しません（列ずれの可能性）`,
    );
  }

  return {
    // 原典に個別の評価票番号が無いため、抽出順の通し番号を付与する（局・区の目次順）。
    no: String(no).padStart(4, "0"),
    name,
    buka: buka ?? "",
    kubun: null,
    implementation: null,
    grade: null, // さいたまは総合評価・達成度とも持たない（自由記述型。札幌に最も近い）
    score: null,
    code: null,
    achievement: null,
    direction: null,
    policy: account, // 見出し由来のリテラル「一般会計」または「特別会計」（会計名自体は name に入る）
    measure,
    // **年度は昇順**（最新年度を末尾に）。既存3市（川崎・横浜・札幌）と同じ並びで、
    // 画面側が `cost[cost.length-1]` を最新として扱うため（BudgetTrace.tsx）。
    // 降順で積むと款ドリルの成果カードが前年度決算の額で代表表示される（ingest-reviewer で検出）。
    cost: [
      { fy: "R5", kind: "決算", jigyohi: m.zenShishutsu, ippanZaigen: null, totalCost: null },
      { fy: "R6", kind: "決算", jigyohi: m.shishutsu, ippanZaigen: null, totalCost: null },
    ],
    indicators: [],
    // 資料が印字する「増減」。validate.ts が 支出済額(R6)−前年度支出済額(R5) と突き合わせる
    // （横浜と同じゲート・§ 冒頭参照）。
    costDiff: m.zougen,
    locator: { file: filename, page: card.page },
  };
}

export function parseSaitamaJigyouHoukoku(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const file = files[0];
  if (!file) throw new Error(`${source.id}: ファイルがありません`);
  const text = fullText(file.path);
  const cards = splitCards(text).filter((c) => c.side === "歳出");
  if (cards.length === 0) throw new Error(`${source.id}: 歳出カードが1件も見つかりません`);

  // 件数の網: 見出し正規表現が将来の年度で外れると、前後のカードが1ブロックへ黙って併合される
  // （first-match 抽出のため大声で落ちない・ingest-reviewer の指摘）。**各カードの本体ラベル
  // （事務事業名／会計名）がちょうど1個だけ**であることを確認する — 2個以上あれば併合の証拠。
  for (const c of cards) {
    const label = c.account === "一般会計" ? "事務事業名" : "会計名";
    const count = (c.block.match(new RegExp(`^\\s*${label}`, "gm")) ?? []).length;
    if (count !== 1) {
      throw new Error(
        `${source.id} p.${c.page}: 「${label}」がこのカード内に${count}個あります（見出しの取りこぼしで` +
          `別カードと併合されている可能性。1個のはず）`,
      );
    }
  }

  const facts: ProjectReportFact[] = cards.map((c, i) => parseCard(c, file.filename, i + 1));

  return {
    docType: "project-report",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    targetFy: source.fiscalYear, // 決算の成果説明書＝対象年度は資料自身の年度と同じ（横浜型の「評価年度≠対象年度」ではない）
    facts,
  };
}
