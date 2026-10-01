// 議会の構成（予算議決時）— 名簿から書き写した会派・議員を、原典の本文と突き合わせるパーサ。
//
// 甲府（`kofu-gikai`）は名簿が `<h2>会派名（N名）</h2>`＋表の HTML なので機械的に数えられるが、
// 他の議会は名簿が PDF・議会だより（縦組み）・会派欄つきの議員一覧…と様式が割れており、
// 1議会ごとにパーサを書くと割に合わない（2026-10-01 に山梨県内9団体を偵察して確認。docs §6-2）。
//
// そこで **会派と所属議員の氏名を registry（parserOptions）に書き写し**、パーサが原典と突き合わせる:
//   ① **各議員がその会派の範囲に載っていること**（会派名から次の会派名までの区間、または registry に
//      書いた会派の枠の座標を pdftotext で切り出した範囲）。枠のときは**他の会派の議員が枠に居ないこと**も見る。
//      ⚠ 「名簿のどこかにある」だけだと、正しい氏名を誤った会派に書いても通る（レビューで実測・2026-10-01）
//   ② **名簿が印字している人数**（`declared`）が書き写した人数と一致すること。印字が無い名簿は
//      `noDeclaredCount` を明示し、代わりに定数（`teisu`）との一致で1人の書き落としを捕まえる
//   ③ 基準日の表記が名簿に出ること・基準日 ≤ 議決日・（任意）議決当日の資料に全議員の氏名が出ること
//   ④ 議案番号が件名の**直前**に、結果と議決月日が件名の**直後**に出ること
// **議席数は書き写した氏名の人数**。1つでも合わなければ throw する＝書き写しの誤りは静かに通らない。
//
// ⚠ 議決時点の名簿であることは基準日 ≤ 議決日 と ③の任意の確認でしか見られない。名簿が議決後に
//   更新されていたら Wayback の議決前のスナップショットを原典にする（甲府と同じ）。議決時点の構成が
//   確定できない議会は**収録しない**（推測で埋めない）。
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { z } from "zod";
import { readRawMeta } from "../lib/store";
import type { CouncilCompositionDoc, CouncilFactionFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.5.0";

const factionSchema = z
  .object({
    name: z.string().min(1),
    members: z.array(z.string().min(1)).min(1),
    independent: z.boolean().optional(),
    /** 会派名が原典で行をまたいで割れているとき、突き合わせに使う断片（例: 「煌・フォーラ」「ム21」） */
    nameParts: z.array(z.string().min(1)).optional(),
    /**
     * 会派の枠（PDF の座標 pt・`pdftotext -x -y -W -H` に渡す）。段組み・表の名簿は「次の会派名まで」の
     * 区間が組版で崩れるので、枠で切る。座標は `pdftotext -bbox` で会派名・氏名の位置を見て決める
     */
    box: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
    page: z.number().int().positive().optional(),
    /** 名簿が印字している人数の原文（例: 「（15）」「４人」）。数字を取り出して人数と照合する */
    declared: z.string().optional(),
    /** 名簿に人数の印字が無い（`declared` を書けない）ことの明示 */
    noDeclaredCount: z.literal(true).optional(),
    /**
     * 会派ごとに名簿のページが分かれている議会（京都）。この会派はこの URL の本文全体を範囲にする。
     * URL は registry の urls に並べること。`asOfText` はそのページの基準日の原文
     */
    url: z.string().url().optional(),
    asOfText: z.string().optional(),
    /**
     * 議員ごとに会派の略称が付く名簿（熊本「大石 浩文（議長） 自民党 期数：…」）。各議員の氏名の直後
     * `labelWindow` 字で**最初に出る会派の略称**がこの会派の `label` であることを見る（区間・枠の代わり）
     */
    label: z.string().optional(),
    /** `declared` を名簿ではなく別の原典（議決当日の会派別賛否の「（14）」など）で照合する。その URL */
    declaredIn: z.string().url().optional(),
    /** declaredIn の原典での会派の略称（広島「自民党・市民クラブ」）。declared はこの略称か会派名を含むこと */
    abbr: z.string().optional(),
    /**
     * 人数の網（declared・teisu・labelSuffix）がどれも掛けられない会派で、それでも収録する理由（原典の事情）。
     * 書けば通るが、**1人の書き落としは捕まらない**ことを registry で明示するためのもの
     */
    noCountReason: z.string().min(10).optional(),
    /**
     * 印字された人数に含まれない所属議員（新潟「翔政会 20 人（翔政会の人数は議長を除いた人数です）」の議長）。
     * members の部分集合で、`declared` の数 = members − これ を要求する
     */
    declaredExcludes: z.array(z.string().min(1)).optional(),
  })
  .refine((f) => (f.declared != null) !== (f.noDeclaredCount === true), {
    message: "declared（印字された人数）か noDeclaredCount: true のどちらか一方が要ります",
  });

const optionsSchema = z.object({
  /** 議会名（例: 山梨県議会） */
  body: z.string().min(1),
  /** 会派構成の基準日 ISO（名簿に印字された「○年○月○日現在」等） */
  asOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** 基準日の原文表記。名簿の本文に出ることを確かめる */
  asOfText: z.string().min(1),
  /**
   * 条例定数（任意）。`teisuText` が `teisuUrl`（無ければ名簿・議決結果）の本文に出ることを確かめ、
   * **現員 = 定数 − 欠員** を要求する（人数の印字が無い名簿で、1人の書き落としを捕まえる網）
   */
  teisu: z.number().int().positive().optional(),
  teisuText: z.string().optional(),
  teisuUrl: z.string().url().optional(),
  vacancies: z.number().int().nonnegative().optional(),
  /** 欠員の原文が定数と別のページにあるとき（堺: 区別のページ「北区　定員9人（欠員1人）」）。無ければ teisuUrl で探す */
  vacanciesUrl: z.string().url().optional(),
  /**
   * 欠員の原文が「早良区、西区はそれぞれ欠員１人」の形のとき（福岡）、「それぞれ」の前に並ぶ地名。
   * 全部が vacanciesText に出ることを確かめ、欠員 = 印字の数 × 地名の数 として照合する
   */
  vacanciesPlaces: z.array(z.string().min(1)).optional(),
  /** 欠員の原文（vacancies > 0 のとき必須。teisuText と同じ原典で照合する） */
  vacanciesText: z.string().optional(),
  /** 欠員の原文が区ごとなど複数に分かれるとき（新潟「東区（定数8人、欠員1人）」「中央区（…欠員1人）」）。各「欠員N」の和 = vacancies */
  vacanciesTexts: z.array(z.string().min(1)).optional(),
  /**
   * 議会全体の人数の網（2026-10-02・レビューで「会派を丸ごと落としても通る」を実測）。teisu が掛けられない議会は、
   * 次のどれかで**原典に載っている全員・全会派を書き写したか**を見る:
   * - memberMarker: 名簿（-layout とページ全体）に**議員1人につき1回**出る語の正規表現（熊本「期数」）。出現数 = 現員
   * - factionMarker: 名簿に**会派ごとに1回**出る語の正規表現（「\\(\\d+人\\)」「【会派連絡先」）。出現数 = 会派の数（同名の無所属は1つ）
   * - totalText: 総数を印字した原文（「現員数37人」「出席議員（３８名）」）。数 = 現員
   */
  memberMarker: z.string().optional(),
  factionMarker: z.string().optional(),
  totalText: z.object({ text: z.string().min(1), url: z.string().url().optional() }).optional(),
  /** 議会全体の人数の網がどれも掛けられない理由（原典の事情）。書けば通るが、会派ごとの書き落としは捕まらない */
  noTotalReason: z.string().min(10).optional(),
  noFactions: z.boolean().optional(),
  roster: z.object({
    url: z.string().url(),
    title: z.string().min(1),
    /** 議決当日の資料（賛否一覧など）。**全議員の氏名がここにも出ること**を確かめる（議決時点の在籍の裏付け） */
    confirmUrls: z.array(z.string().url()).optional(),
    /**
     * 名簿（PDF）が**議決前のページからリンクされていた**ことの裏付け（静岡: 議決前の魚拓の名簿ページに
     * 「静岡市議会会派別名簿（令和7年4月25日現在）」のリンク）。text がその本文に出ることを見る
     */
    linkedFrom: z.object({ url: z.string().url(), text: z.string().min(1) }).optional(),
  }),
  factions: z.array(factionSchema).min(1),
  /** label 方式の窓（字数・既定20） */
  labelWindow: z.number().int().positive().max(60).optional(),
  /**
   * label 方式の人数の照合。名簿の本文（-layout）で「略称＋labelSuffix」（熊本「熊本自民期数」）の出現数が
   * その会派の人数と一致すること（凡例の略称は suffix が付かないので数えない）
   */
  labelSuffix: z.string().optional(),
  /**
   * 略称の照合（氏名の直後の略称）を名簿ではなくこの原典で行う（熊本: 名簿 PDF は氏名の行と略称の行が分かれて
   * 組まれ、氏名の直後に略称が来ない。議決当日の賛否一覧は「氏名 略称」の並び）。人数（labelSuffix）は名簿で数える
   */
  labelUrl: z.string().url().optional(),
  resolution: z.object({
    url: z.string().url(),
    title: z.string().min(1),
    /**
     * 議決の事実が1つの原典に揃わないときの補助の原典（例: 北杜は議会だよりに議案番号が無く、
     * 議事日程にある）。突き合わせは url ＋ alsoUrls の本文で行う。画面の出典チップは url だけ。
     */
    alsoUrls: z.array(z.string().url()).optional(),
    /** 件名の近くに無くてよい項目（原典の組版で離れるもの。理由を registry のコメントに書く） */
    farOk: z.array(z.enum(["billNo", "decidedDate"])).optional(),
    /**
     * 結果語の位置。既定は件名の直後。賛否表の行が「…○○可決＋件名…」と組まれる原典（北杜の議会だより）は "before"
     */
    resultSide: z.enum(["after", "before"]).optional(),
    /** 件名の直後の窓（字数・既定60）。件名と結果の間に付議委員会が並ぶ原典（名古屋）で広げる */
    afterWindow: z.number().int().positive().max(200).optional(),
    /**
     * HTML の議決結果の表での照合（近接の代わり）。件名を含むセルと**同じ行**（row）または**同じ列**（column・
     * 1列が1議案の転置表＝福岡）のセルに、議案番号（セル全体が一致）・結果（セル全体が一致）・議決日
     * （`decidedDateText` があればそれ、無ければ M月D日 を含むセル）があること。
     * `farOk: ["decidedDate"]` を併用すると議決日は表の外（見出し）で探す（広島「令和8年3月26日議決」）
     */
    table: z.enum(["row", "column"]).optional(),
    /**
     * 結果が件名の行に無く、**一覧の見出し**で決まる原典（南アルプスの議会だより「◆全会一致で承認・可決・同意した議案」）。
     * 件名と同じ本文に `heading` があり、件名の直後に結果語が無い（賛否表の行ではない）こと。
     * 画面の `result` は heading に含まれる語でなければならない
     */
    resultBlock: z.object({ heading: z.string().min(1) }).optional(),
    /**
     * `farOk: ["decidedDate"]` のときの議決日の原文（例: 「3月23日開催」「３月１６日（月)午前１０時開議」）。
     * 月日だけで探すと本文の別の日付に当たる（レビューで実測）ので、前後の字ごと書く。M月D日を含むこと
     */
    decidedDateText: z.string().optional(),
    billNo: z.string().min(1),
    billName: z.string().min(1),
    sessionLabel: z.string().min(1),
    decidedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** 結果。**原典の語のまま**（「原案可決」を「可決」に丸めない・合成語を作らない） */
    result: z.string().min(1),
  }),
});
export type CouncilTranscribedOptions = z.infer<typeof optionsSchema>;

/**
 * 突き合わせ用の正規化。空白を全部落とし NFKC をかけ、PDF の抽出で揺れる異体字を寄せる。
 * ⚠ **書き写す側も同じ関数を通す**ので、ここで寄せた字は registry でどちらで書いてもよい。
 */
const VARIANTS: Record<string, string> = { 髙: "高", 﨑: "崎", 𠮷: "吉", 葊: "廣", 濵: "濱", 德: "徳", 栁: "柳", 惠: "恵" };
function norm(s: string): string {
  return (
    s
      .normalize("NFKC")
      // 異体字セレクタ（IVS・SVS）は NFKC で消えない（名古屋「辻󠄀まさお」の U+E0100）
      .replace(/[\u{E0100}-\u{E01EF}︀-️]/gu, "")
      .replace(/[髙﨑𠮷葊濵德栁惠]/gu, (c) => VARIANTS[c] ?? c)
      .replace(/[\s　]+/g, "")
  );
}

function htmlText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Number(n)));
}

const isPdf = (f: { filename: string }) => /\.pdf$/i.test(f.filename);

function pdftotext(path: string, args: string[]): string {
  return execFileSync("pdftotext", [...args, "-enc", "UTF-8", path, "-"], {
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  }).toString("utf8");
}

/**
 * 原典の読み。`views` は抽出モードごと×ページごとの正規化済み本文（区間・近接の判定はモードをまたがない）。
 * PDF は -layout と -raw の両方（組版でどちらかが崩れるため）、HTML は1つ。
 */
function readDoc(f: { path: string; filename: string }): { views: { page: number; text: string }[]; pages: number } {
  if (isPdf(f)) {
    const views: { page: number; text: string }[] = [];
    let pages = 0;
    for (const mode of ["-layout", "-raw"]) {
      const ps = pdftotext(f.path, [mode]).split("\f");
      pages = Math.max(pages, ps.length);
      ps.forEach((p, i) => views.push({ page: i + 1, text: norm(p) }));
    }
    return { views, pages };
  }
  return { views: [{ page: 1, text: norm(htmlText(readHtml(f.path))) }], pages: 1 };
}

/** HTML を読む。魚拓（id_）は gzip の本文をそのまま返すことがある（広島・横浜で実測）ので展開する */
function readHtml(path: string): string {
  const raw = readFileSync(path);
  const b = raw[0] === 0x1f && raw[1] === 0x8b ? gunzipSync(raw) : raw;
  // meta の charset で読み分ける（gijiroku.com 系・草加市議会のサイトは Shift_JIS）
  const cs = b.subarray(0, 2048).toString("latin1").match(/charset=["']?([\w-]+)/i)?.[1]?.toLowerCase();
  const enc = cs && /^(shift_jis|sjis|x-sjis|windows-31j|cp932)$/.test(cs) ? "shift_jis" : cs === "euc-jp" ? "euc-jp" : "utf-8";
  return new TextDecoder(enc).decode(b);
}

/** 本文中の日付を「M月D日」にそろえて取り出す（「3月27日」「R8.3.27」の両方） */
function dateTokens(s: string): string[] {
  const n = norm(s);
  return [
    ...[...n.matchAll(/(\d+)月(\d+)日/g)].map((m) => `${Number(m[1])}月${Number(m[2])}日`),
    // 「R8.3.27」「8.3.26」「8. 3.23」（元号の字の無い年.月.日・正規化で空白は落ちている）
    ...[...n.matchAll(/(?<![\d.])R?\d{1,2}\.(\d{1,2})\.(\d{1,2})(?![\d.])/g)].map((m) => `${Number(m[1])}月${Number(m[2])}日`),
    // 「3/24」
    ...[...n.matchAll(/(?<![\d/])(\d{1,2})\/(\d{1,2})(?![\d/])/g)].map((m) => `${Number(m[1])}月${Number(m[2])}日`),
  ];
}

/** HTML → テーブルの行列（セルは正規化済み）。rowspan/colspan は展開しない */
function htmlTables(html: string): string[][][] {
  const noScript = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "");
  return (noScript.match(/<table[\s\S]*?<\/table>/gi) ?? []).map((t) =>
    (t.match(/<tr[\s\S]*?<\/tr>/gi) ?? []).map((tr) => (tr.match(/<t[hd][\s\S]*?<\/t[hd]>/gi) ?? []).map((c) => norm(htmlText(c)))),
  );
}

function toWareki(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  return `令和${y - 2018}年${m}月${d}日`;
}

/** 窓の中で最初に出る結果語とその位置 */
function m0Index(w: string, re: RegExp): { word: string; index: number } | null {
  const m = new RegExp(re.source).exec(w);
  return m ? { word: m[0], index: m.index } : null;
}

/** 「（15）」「４人」「6」→ 15 / 4 / 6。数字がちょうど1つでなければ null */
function declaredNumber(s: string): number | null {
  const ds = norm(s).match(/\d+/g);
  return ds && ds.length === 1 ? Number(ds[0]) : null;
}

export function parseCouncilTranscribed(
  files: { path: string; filename: string }[],
  source: SourceEntry,
  /** ドライラン（`pipeline:try-council`）用。URL → 手元のファイル。本番は raw-meta の fetchedFrom で引く */
  resolveFile?: (url: string) => { path: string; filename: string } | undefined,
): CouncilCompositionDoc {
  const opt = optionsSchema.parse(source.parserOptions);
  const meta = resolveFile ? null : readRawMeta(source.id);
  if (!resolveFile && !meta) throw new Error(`${source.id}: raw-meta がありません（先に pipeline:fetch）`);
  const fileFor = (url: string) => {
    if (resolveFile) {
      const f = resolveFile(url);
      if (!f) throw new Error(`${source.id}: ${url} の手元のファイルがありません（spec の files に書く）`);
      return f;
    }
    const m = meta!.files.find((f) => f.fetchedFrom === url);
    const f = m && files.find((x) => x.filename === m.filename);
    if (!f) throw new Error(`${source.id}: ${url} の raw ファイルがありません`);
    return f;
  };
  const missing: string[] = [];
  const has = (views: { text: string }[], needle: string) => views.some((v) => v.text.includes(norm(needle)));
  const pageOf = (views: { page: number; text: string }[], needle: string) =>
    views.find((v) => v.text.includes(norm(needle)))?.page ?? null;

  // ---- 名簿 ----
  const rosterFile = fileFor(opt.roster.url);
  const roster = readDoc(rosterFile);
  {
    const pools = [roster.views, ...opt.factions.filter((f) => f.url).map((f) => readDoc(fileFor(f.url!)).views)];
    if (!pools.some((v) => has(v, opt.asOfText))) missing.push(`${rosterFile.filename}: 基準日「${opt.asOfText}」が本文に見つかりません`);
  }

  const allNames = opt.factions.map((f) => (f.nameParts ?? [f.name]).map(norm));
  /** 会派 i の範囲（モード×ページごと）。枠があれば切り出し、無ければ会派名から次の会派名まで */
  const sectionsOf = (i: number): string[] => {
    const f = opt.factions[i]!;
    if (f.url) {
      const doc = readDoc(fileFor(f.url));
      if (f.asOfText && !has(doc.views, f.asOfText)) missing.push(`${f.url}: 基準日「${f.asOfText}」が本文に見つかりません`);
      return doc.views.map((v) => v.text);
    }
    if (f.box) {
      if (!isPdf(rosterFile)) throw new Error(`${source.id}: box は PDF の名簿にだけ使えます（${f.name}）`);
      const [x, y, w, h] = f.box;
      const pg = String(f.page ?? 1);
      return ["-layout", "-raw"].map((mode) =>
        norm(pdftotext(rosterFile.path, [mode, "-f", pg, "-l", pg, "-x", String(x), "-y", String(y), "-W", String(w), "-H", String(h)])),
      );
    }
    const head = allNames[i]![0]!;
    const out: string[] = [];
    for (const v of roster.views) {
      for (let st = v.text.indexOf(head); st >= 0; st = v.text.indexOf(head, st + 1)) {
        const ends = allNames
          .map((ns, j) => (j === i ? -1 : v.text.indexOf(ns[0]!, st + head.length)))
          .filter((e) => e > st);
        out.push(v.text.slice(st, ends.length ? Math.min(...ends) : v.text.length));
      }
    }
    return out;
  };

  const seen = new Map<string, string>();
  const factions: CouncilFactionFact[] = opt.factions.map((f, i) => {
    const sections = sectionsOf(i);
    if (!opt.noFactions && !f.independent) {
      for (const part of allNames[i]!) {
        if (!sections.some((s) => s.includes(part))) missing.push(`${rosterFile.filename}: 会派名「${part}」が${f.box ? "枠" : "本文"}に見つかりません`);
      }
    }
    for (const m of f.members) {
      const key = norm(m);
      const dup = seen.get(key);
      if (dup) missing.push(`議員「${m}」が「${dup}」と「${f.name}」に重複`);
      seen.set(key, f.name);
      if (f.label != null) {
        // 氏名の直後で最初に出る会派の略称がこの会派のものであること（略称どうしの部分一致は長い方を優先）
        const labels = opt.factions.filter((g) => g.label).map((g) => norm(g.label!)).sort((x, y) => y.length - x.length);
        const LW = opt.labelWindow ?? 20;
        const labelViews = opt.labelUrl ? readDoc(fileFor(opt.labelUrl)).views : roster.views;
        const ok = labelViews.some((v) => {
          for (let at = v.text.indexOf(key); at >= 0; at = v.text.indexOf(key, at + 1)) {
            const w = v.text.slice(at + key.length, at + key.length + LW);
            let best: { pos: number; lab: string } | null = null;
            for (const lab of labels) {
              const pos = w.indexOf(lab);
              if (pos >= 0 && (best == null || pos < best.pos)) best = { pos, lab };
            }
            if (best?.lab === norm(f.label!)) return true;
          }
          return false;
        });
        if (!ok) missing.push(`${opt.labelUrl ?? rosterFile.filename}: 議員「${m}」の直後${LW}字の会派の略称が「${f.label}」ではありません`);
      } else if (!sections.some((s) => s.includes(key))) {
        missing.push(`${rosterFile.filename}: 議員「${m}」が会派「${f.name}」の${f.box ? "枠" : "区間（会派名から次の会派名まで）"}に見つかりません`);
      }
    }
    // 同じ略称を持つ会派（熊本の無所属を1人ずつ並べる場合）は合計で照合する。最初の会派でだけ数える
    if (f.label != null && opt.labelSuffix && opt.factions.findIndex((g) => g.label === f.label) === i) {
      const lab = norm(f.label);
      const pat = lab + norm(opt.labelSuffix);
      const expect = opt.factions.filter((g) => g.label === f.label).reduce((a, g) => a + g.members.length, 0);
      // 長い略称が短い略称で終わる（「熊本自民」と「自民」）ときに二重に数えないよう、直前の字で区切る
      const longer = opt.factions.filter((g) => g.label && norm(g.label) !== lab && norm(g.label).endsWith(lab)).map((g) => norm(g.label!));
      const cnt = Math.max(
        ...roster.views.map((v) => {
          let c = 0;
          for (let at = v.text.indexOf(pat); at >= 0; at = v.text.indexOf(pat, at + 1)) {
            if (!longer.some((o) => v.text.slice(Math.max(0, at - (o.length - lab.length)), at).concat(lab) === o)) c++;
          }
          return c;
        }),
      );
      if (cnt !== expect) missing.push(`${rosterFile.filename}: 略称「${f.label}${opt.labelSuffix}」は名簿に ${cnt} 回、書き写しは ${expect}人`);
    }
    // 枠のときは、他の会派の議員が枠に入っていないこと（書き写しの会派違いを両側から捕まえる）
    if (f.box) {
      opt.factions.forEach((g, j) => {
        if (j === i) return;
        for (const m of g.members) {
          if (sections.some((s) => s.includes(norm(m)))) {
            missing.push(`${rosterFile.filename}: 会派「${f.name}」の枠に「${g.name}」の議員「${m}」が入っています（枠か書き写しの誤り）`);
          }
        }
      });
    }
    if (f.declared != null) {
      const n = declaredNumber(f.declared);
      if (n == null) missing.push(`${f.name}: declared「${f.declared}」から人数を1つに読めません`);
      else {
        const ex = f.declaredExcludes ?? [];
        for (const e of ex) if (!f.members.some((m) => norm(m) === norm(e))) missing.push(`${f.name}: declaredExcludes「${e}」が members にありません`);
        if (n !== f.members.length - ex.length) missing.push(`${f.name}: 名簿の印字は ${n}人、書き写しは ${f.members.length - ex.length}人${ex.length ? `（${ex.join("・")}を除く）` : ""}`);
      }
      const dN = norm(f.declared!);
      if (f.declaredIn) {
        // 別の原典では区間が無いので、印字は**会派の名前（略称）ごと**書かせる（「（1）」だけだと本文のどこかの数字に当たる。
        // 広島の 1人会派が5つ並ぶ型でレビューが指摘）
        if (![norm(f.name), ...(f.abbr ? [norm(f.abbr)] : [])].some((nm) => dN.startsWith(nm))) {
          missing.push(`${f.name}: declaredIn の declared「${f.declared}」は会派名か略称（abbr）で始める（入れ替えを捕まえるため）`);
        }
        if (!has(readDoc(fileFor(f.declaredIn)).views, f.declared!)) missing.push(`${f.declaredIn}: 会派「${f.name}」の人数の印字「${f.declared}」が見つかりません`);
      } else if (f.box || f.url) {
        if (!sections.some((s) => s.includes(dN))) missing.push(`${rosterFile.filename}: 会派「${f.name}」の人数の印字「${f.declared}」が${f.box ? "枠" : "ページ"}に見つかりません`);
      } else {
        // 区間方式では会派名の直後 80 字に限る（「（1）」が区間内の別の数字に当たらないように）
        const head = allNames[i]![0]!;
        if (!sections.some((s) => s.startsWith(head) && s.slice(0, head.length + 80).includes(dN))) {
          missing.push(`${rosterFile.filename}: 会派「${f.name}」の人数の印字「${f.declared}」が会派名の直後80字に見つかりません`);
        }
      }
    }
    const page = isPdf(rosterFile) ? (f.page ?? pageOf(roster.views, f.members[0]!)) : null;
    return {
      name: f.independent && f.members.length === 1 ? `${f.name}（${f.members[0]}）` : f.name,
      seats: f.members.length,
      isIndependent: !!f.independent,
      members: f.members,
      locator: { file: rosterFile.filename, ...(page != null ? { page } : { row: i + 1 }) },
    };
  });
  const seats = factions.reduce((s, f) => s + f.seats, 0);
  // 人数の網（印字・定数・略称の数）がどこにも無い書き写しは通さない — 1人の書き落としが誰にも捕まらない
  const unguarded = opt.factions.filter((f) => f.declared == null && !(f.label != null && opt.labelSuffix) && !f.noCountReason);
  if (unguarded.length && opt.teisu == null) {
    missing.push(`人数の網が無い会派があります（${unguarded.map((f) => f.name).join("・")}）— declared か teisu か labelSuffix が要ります`);
  }
  // 議会全体の人数の網
  const countIn = (views: { text: string }[], re: string) => Math.max(0, ...views.map((v) => (v.text.match(new RegExp(re, "g")) ?? []).length));
  const rosterAll = [...roster.views, ...opt.factions.filter((f) => f.url).flatMap((f) => readDoc(fileFor(f.url!)).views)];
  if (opt.memberMarker) {
    const c = countIn(roster.views, opt.memberMarker);
    if (c !== seats) missing.push(`${rosterFile.filename}: 議員ごとの印「${opt.memberMarker}」は名簿に ${c} 回、書き写しは ${seats}人`);
  }
  if (opt.factionMarker) {
    const c = countIn(roster.views, opt.factionMarker);
    const n = new Set(opt.factions.map((f) => f.name)).size;
    if (c !== n) missing.push(`${rosterFile.filename}: 会派ごとの印「${opt.factionMarker}」は名簿に ${c} 回、書き写しは ${n}会派`);
  }
  if (opt.totalText) {
    const tv = opt.totalText.url ? readDoc(fileFor(opt.totalText.url)).views : rosterAll;
    if (!has(tv, opt.totalText.text)) missing.push(`総数の原文「${opt.totalText.text}」が見つかりません`);
    if (declaredNumber(opt.totalText.text) !== seats) missing.push(`総数の原文「${opt.totalText.text}」の数が現員 ${seats} と合いません`);
  }
  if (opt.teisu == null && !opt.memberMarker && !opt.factionMarker && !opt.totalText && !opt.noTotalReason) {
    missing.push(`議会全体の人数の網がありません — teisu・memberMarker・factionMarker・totalText のどれか（無理なら noTotalReason）`);
  }
  if (opt.roster.linkedFrom) {
    const lf = opt.roster.linkedFrom;
    if (!has(readDoc(fileFor(lf.url)).views, lf.text)) missing.push(`${lf.url}: 名簿へのリンク「${lf.text}」が見つかりません`);
  }

  // 議決当日の資料に全議員が出ること（議決時点の在籍の裏付け）
  for (const u of opt.roster.confirmUrls ?? []) {
    const cf = fileFor(u);
    const doc = readDoc(cf);
    for (const f of opt.factions) {
      for (const m of f.members) if (!has(doc.views, m)) missing.push(`${cf.filename}: 議員「${m}」が議決当日の資料に見つかりません`);
    }
  }

  // ---- 議決 ----
  const r = opt.resolution;
  // 画面は「その予算を議決した議会」として出すので、当初の一般会計予算の議決に限る（別の議案の正しい事実を拒む）
  if (!norm(r.billName).includes("一般会計予算") || /補正/.test(r.billName)) {
    missing.push(`件名「${r.billName}」は当初の一般会計予算ではありません`);
  }
  const resultFile = fileFor(r.url);
  const mainResult = readDoc(resultFile);
  const resultViews = [
    ...mainResult.views,
    // 補助の原典はページ番号を持たせない（locator は主の原典の範囲だけ）
    ...(r.alsoUrls ?? []).flatMap((u) => readDoc(fileFor(u)).views.map((v) => ({ page: 0, text: v.text }))),
  ];

  if (opt.teisu != null) {
    if (!opt.teisuText) throw new Error(`${source.id}: teisu には teisuText（原典の表記）が要ります`);
    const tv = opt.teisuUrl ? readDoc(fileFor(opt.teisuUrl)).views : [...roster.views, ...resultViews];
    if (!has(tv, opt.teisuText)) missing.push(`定数の表記「${opt.teisuText}」が原典に見つかりません`);
    if ((opt.vacancies ?? 0) > 0 && opt.vacanciesTexts?.length) {
      const vv = opt.vacanciesUrl ? readDoc(fileFor(opt.vacanciesUrl)).views : tv;
      let sum = 0;
      if (new Set(opt.vacanciesTexts.map(norm)).size !== opt.vacanciesTexts.length) missing.push(`vacanciesTexts に同じ原文が重複しています`);
      for (const t of opt.vacanciesTexts) {
        if (!has(vv, t)) missing.push(`欠員の表記「${t}」が原典に見つかりません`);
        const m = norm(t).match(/欠員(\d+)/);
        if (!m) missing.push(`vacanciesTexts「${t}」に「欠員N」がありません`);
        else sum += Number(m[1]);
      }
      if (sum !== opt.vacancies) missing.push(`vacanciesTexts の欠員の和 ${sum} が vacancies ${opt.vacancies} と合いません`);
    } else if ((opt.vacancies ?? 0) > 0) {
      if (!opt.vacanciesText) throw new Error(`${source.id}: vacancies には vacanciesText（原典の表記）が要ります`);
      const vv = opt.vacanciesUrl ? readDoc(fileFor(opt.vacanciesUrl)).views : tv;
      if (!has(vv, opt.vacanciesText)) missing.push(`欠員の表記「${opt.vacanciesText}」が原典に見つかりません`);
      const places = opt.vacanciesPlaces ?? [];
      if (places.length && !norm(opt.vacanciesText).includes("それぞれ")) missing.push(`vacanciesPlaces は「それぞれ」を含む原文にだけ使う`);
      for (const pl of places) if (!norm(opt.vacanciesText).includes(norm(pl))) missing.push(`vacanciesText に地名「${pl}」がありません`);
      const per = declaredNumber(opt.vacanciesText);
      if (per == null || per * Math.max(1, places.length) !== opt.vacancies) {
        missing.push(`vacanciesText「${opt.vacanciesText}」${places.length ? `× ${places.length}か所` : ""}が欠員 ${opt.vacancies} と合いません`);
      }
    }
    const expect = opt.teisu - (opt.vacancies ?? 0);
    if (seats !== expect) missing.push(`現員 ${seats} が 定数 ${opt.teisu} − 欠員 ${opt.vacancies ?? 0} = ${expect} と合いません（書き落とし？）`);
  }

  // 議案番号は件名の**直前**、結果・議決月日は件名の**直後**だけを見る（2026-10-01）。
  // 一覧には別の議案が並ぶので「本文のどこかにある」では誤りが素通りし（笛吹で「議案第19号」が通った）、
  // 前後で見ると隣の行の値に当たる（直前の議案の議決日「3月12日」が通った・レビューで実測）。
  // 原典の組版で件名から離れる項目だけ `farOk` で外す（外した項目は本文のどこかにあることだけを見る）。
  const BEFORE = 20;
  const AFTER = r.afterWindow ?? 60;
  const nameN = norm(r.billName);
  const billNoN = norm(r.billNo);
  /** 件名の出現のうち、直前に議案番号があるもの（farOk の billNo なら全出現） */
  const anchors: { text: string; at: number; page: number }[] = [];
  for (const v of resultViews) {
    for (let i = v.text.indexOf(nameN); i >= 0; i = v.text.indexOf(nameN, i + 1)) {
      // 「1」「議1」のような短い番号は直前の数字に紛れるので、件名の**すぐ前**（番号の長さ＋2字）に限る
      const win = billNoN.length <= 3 ? billNoN.length + 2 : BEFORE;
      const before = v.text.slice(Math.max(0, i - win), i + (nameN.includes(billNoN) ? nameN.length : 0));
      if (r.farOk?.includes("billNo") || before.includes(billNoN)) anchors.push({ text: v.text, at: i, page: v.page });
    }
  }
  if (!resultViews.some((v) => v.text.includes(nameN))) {
    missing.push(`${resultFile.filename}: 件名「${r.billName}」が本文に見つかりません`);
  } else if (anchors.length === 0 && !r.table) {
    missing.push(`${resultFile.filename}: 議案番号「${r.billNo}」が件名の直前${BEFORE}字に見つかりません`);
  }
  if (r.farOk?.includes("billNo") && !has(resultViews, r.billNo)) {
    missing.push(`${resultFile.filename}: 議案番号「${r.billNo}」が本文に見つかりません`);
  }
  const after = (needle: string, what: string, key: "result" | "decidedDate") => {
    const n = norm(needle);
    if (key === "decidedDate" && r.farOk?.includes(key)) {
      if (!r.decidedDateText) throw new Error(`${source.id}: farOk の decidedDate には decidedDateText（原典の前後の字ごと）が要ります`);
      // 月日が**ちょうど1つ**の原文に限る（「2月20日〜3月23日開催」なら会期の初日でも通ってしまう）
      const dates = dateTokens(r.decidedDateText);
      if (dates.length !== 1 || dates[0] !== n) {
        missing.push(`decidedDateText「${r.decidedDateText}」は議決月日「${needle}」をただ1つ含む原文にする（含む月日: ${dates.join("・") || "なし"}）`);
      }
      if (!has(resultViews, r.decidedDateText)) missing.push(`${resultFile.filename}: ${what}「${r.decidedDateText}」が本文に見つかりません`);
      return;
    }
    if (r.table) return; // 表の照合で見る
    // 議決日は「M月D日」のほか「8.3.26」「R8.3.27」「3/24」の形でも窓の中にあればよい（札幌の表の議決日の欄）
    const inWin = (w: string) => w.includes(n) || (key === "decidedDate" && dateTokens(w).includes(n));
    if (anchors.length && !anchors.some((a) => inWin(a.text.slice(a.at + nameN.length, a.at + nameN.length + AFTER)))) {
      missing.push(`${resultFile.filename}: ${what}「${needle}」が件名の直後${AFTER}字に見つかりません`);
    }
  };
  // ---- 結果 ----
  const resultN = norm(r.result);
  // 結果を見る起点。議案番号が補助の原典にしか無い（北杜）と、主の原典の件名は議案番号つきの起点に
  // 入らない。主の原典に起点が無ければ、主の原典での件名の出現を起点にする
  const mainAnchors = anchors.filter((a) => a.page > 0);
  const resAnchors = mainAnchors.length
    ? mainAnchors
    : mainResult.views.flatMap((v) => {
        const out: { text: string; at: number; page: number }[] = [];
        for (let i = v.text.indexOf(nameN); i >= 0; i = v.text.indexOf(nameN, i + 1)) out.push({ text: v.text, at: i, page: v.page });
        return out;
      });
  if (r.table) {
    // HTML の表: 件名のセルと同じ行（列）のセルに、議案番号・結果（セル全体が一致）・議決日があること
    if (isPdf(resultFile)) throw new Error(`${source.id}: table は HTML の議決結果にだけ使えます`);
    const md = `${Number(r.decidedDate.slice(5, 7))}月${Number(r.decidedDate.slice(8, 10))}日`;
    const farDate = r.farOk?.includes("decidedDate");
    let found = false;
    for (const t of htmlTables(readHtml(resultFile.path))) {
      t.forEach((row, ri) =>
        row.forEach((cell, ci) => {
          if (!cell.includes(nameN)) return;
          const line = r.table === "row" ? t[ri]! : t.map((rw) => rw[ci] ?? "");
          // 番号が件名と同じセルの頭に入る原典がある（熊本「議第３号 令和８ 年度熊本市一般会計予算」）
          const okNo = r.farOk?.includes("billNo") || line.some((c) => c === billNoN || (c.includes(nameN) && c.startsWith(billNoN)));
          const okRes = line.some((c) => c === resultN);
          const okDate = farDate || line.some((c) => (r.decidedDateText ? c.includes(norm(r.decidedDateText)) : true) && dateTokens(c).includes(md));
          if (okNo && okRes && okDate) found = true;
        }),
      );
    }
    if (!found) {
      missing.push(
        `${resultFile.filename}: 表で件名「${r.billName}」と同じ${r.table === "row" ? "行" : "列"}に議案番号「${r.billNo}」・結果「${r.result}」${farDate ? "" : `・議決日「${md}」`}のセルがそろいません`,
      );
    }
  } else if (r.resultBlock) {
    // 件名が見出し（例: ◆全会一致で承認・可決・同意した議案）の一覧に属すること
    const headN = norm(r.resultBlock.heading);
    if (!headN.includes(resultN)) missing.push(`結果「${r.result}」が見出し「${r.resultBlock.heading}」の語ではありません`);
    // 見出しは「承認・可決・同意」のように複数の語を並べる。予算の議決に当たる語だけを許す
    if (!/^(原案可決|修正可決|可決|否決)$/.test(resultN)) missing.push(`結果「${r.result}」は予算の議決の語ではありません`);
    // ⚠ 見出しと一覧の並び順は抽出モードで変わる（-layout と -raw で見出しが一覧の前にも後にも出る）ので、
    //   「見出しの前に件名がある」では帰属を縛れない（2026-10-01 に実測）。代わりに、件名と同じ本文に見出しがあり、
    //   **件名の直後に結果語が無い**（＝自前の結果を持つ賛否表の行ではない）ことを見る。南アルプスの議案27は
    //   同じページの賛否表に「議案27 国民健康保険特別会計予算 可決 〇〇×…」と出るのでここで落ちる
    const ok = resAnchors.some((a) => {
      if (!a.text.includes(headN)) return false;
      const w = a.text.slice(a.at + nameN.length, a.at + nameN.length + AFTER);
      return !/原案可決|修正可決|可決|否決/.test(w);
    });
    if (!ok) missing.push(`${resultFile.filename}: 件名が見出し「${r.resultBlock.heading}」の一覧に属していません`);
  } else {
    // 結果は原典の語のまま — 窓の中で件名に最も近い結果語が、書き写した語と同じであること
    const RE = /原案可決|修正可決|可決|否決|承認|同意|認定|採択/g;
    const ok = resAnchors.some((a) => {
      if (r.resultSide === "before") {
        const w = a.text.slice(Math.max(0, a.at - BEFORE), a.at);
        const all = [...w.matchAll(RE)];
        return all.length > 0 && all[all.length - 1]![0] === resultN;
      }
      const w = a.text.slice(a.at + nameN.length, a.at + nameN.length + AFTER);
      // 「附帯決議を付して修正可決」のように結果語の前に句が付く原典がある（名古屋）。最も近い結果語が
      // 書き写した結果の末尾と同じで、書き写した結果そのものが窓にあること
      // 結果語の後ろの括弧書き（盛岡「可決(多数)」・前橋）だけは書き写してよい。前置き（「附帯決議を付して修正可決」）は
      // 近接では「修正可決」との区別が付かない（レビューで実測）ので、表（セル全体の一致）でだけ認める
      const at = m0Index(w, RE);
      if (at == null) return false;
      const m = at.word;
      if (m === resultN) return true;
      return resultN.startsWith(m) && /^[(（][^)）]{1,10}[)）]$/.test(resultN.slice(m.length)) && w.slice(at.index).startsWith(resultN);
    });
    const side = r.resultSide === "before" ? `直前${BEFORE}字` : `直後${AFTER}字`;
    if (!ok) missing.push(`${resultFile.filename}: 結果「${r.result}」が件名の${side}で最も近い結果語と一致しません`);
  }
  if (!has(resultViews, r.sessionLabel)) missing.push(`${resultFile.filename}: 会期「${r.sessionLabel}」が本文に見つかりません`);
  const [, mo, d] = r.decidedDate.split("-").map(Number) as [number, number, number];
  after(`${mo}月${d}日`, "議決月日", "decidedDate");
  if (opt.asOf > r.decidedDate) {
    missing.push(`名簿の基準日 ${opt.asOf} が議決日 ${r.decidedDate} より後（議決時点の名簿ではない）`);
  }

  if (missing.length) throw new Error(`${source.id}: 書き写しが原典と合いません\n  - ${missing.join("\n  - ")}`);

  // 議案番号が補助の原典にしか無い原典（北杜）でも、結果を照合した主の原典の件名の位置をページにする
  const billPage = isPdf(resultFile) ? (anchors.find((a) => a.page > 0)?.page ?? resAnchors.find((a) => a.page > 0)?.page ?? null) : null;
  return {
    docType: "council-composition",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    body: opt.body,
    seats,
    asOf: opt.asOf,
    ...(opt.teisu != null ? { teisu: opt.teisu } : {}),
    factions,
    ...(opt.noFactions ? { noFactions: true } : {}),
    resolution: {
      billNo: r.billNo,
      billName: r.billName,
      sessionLabel: r.sessionLabel,
      decidedDate: r.decidedDate,
      decidedDateLabel: toWareki(r.decidedDate),
      result: r.result,
      locator: { file: resultFile.filename, ...(billPage != null ? { page: billPage } : {}) },
    },
    rosterTitle: opt.roster.title,
    resultTitle: opt.resolution.title,
  };
}
