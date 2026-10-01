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
import { z } from "zod";
import { readRawMeta } from "../lib/store";
import type { CouncilCompositionDoc, CouncilFactionFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.2.0";

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
  noFactions: z.boolean().optional(),
  roster: z.object({
    url: z.string().url(),
    title: z.string().min(1),
    /** 議決当日の資料（賛否一覧など）。**全議員の氏名がここにも出ること**を確かめる（議決時点の在籍の裏付け） */
    confirmUrls: z.array(z.string().url()).optional(),
  }),
  factions: z.array(factionSchema).min(1),
  resolution: z.object({
    url: z.string().url(),
    title: z.string().min(1),
    /**
     * 議決の事実が1つの原典に揃わないときの補助の原典（例: 北杜は議会だよりに議案番号が無く、
     * 議事日程にある）。突き合わせは url ＋ alsoUrls の本文で行う。画面の出典チップは url だけ。
     */
    alsoUrls: z.array(z.string().url()).optional(),
    /** 件名の近くに無くてよい項目（原典の組版で離れるもの。理由を registry のコメントに書く） */
    farOk: z.array(z.enum(["billNo", "result", "decidedDate"])).optional(),
    billNo: z.string().min(1),
    billName: z.string().min(1),
    sessionLabel: z.string().min(1),
    decidedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** 結果。**原典の語のまま**（「原案可決」を「可決」に丸めない・合成語を作らない） */
    result: z.string().min(1),
    /**
     * 結果の原文が一覧の見出し側にしか無い原典（南アルプスの議会だより「◆全会一致で承認・可決・同意した議案」）
     * での突き合わせ用の原文。`farOk: ["result"]` と組で使う
     */
    resultText: z.string().optional(),
  }),
});
export type CouncilTranscribedOptions = z.infer<typeof optionsSchema>;

/**
 * 突き合わせ用の正規化。空白を全部落とし NFKC をかけ、PDF の抽出で揺れる異体字を寄せる。
 * ⚠ **書き写す側も同じ関数を通す**ので、ここで寄せた字は registry でどちらで書いてもよい。
 */
const VARIANTS: Record<string, string> = { 髙: "高", 﨑: "崎", 𠮷: "吉", 葊: "廣", 濵: "濱", 德: "徳" };
function norm(s: string): string {
  return s
    .normalize("NFKC")
    .replace(/[髙﨑𠮷葊濵德]/gu, (c) => VARIANTS[c] ?? c)
    .replace(/[\s　]+/g, "");
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
  return { views: [{ page: 1, text: norm(htmlText(readFileSync(f.path, "utf8"))) }], pages: 1 };
}

function toWareki(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  return `令和${y - 2018}年${m}月${d}日`;
}

/** 「（15）」「４人」「6」→ 15 / 4 / 6。数字がちょうど1つでなければ null */
function declaredNumber(s: string): number | null {
  const ds = norm(s).match(/\d+/g);
  return ds && ds.length === 1 ? Number(ds[0]) : null;
}

export function parseCouncilTranscribed(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): CouncilCompositionDoc {
  const opt = optionsSchema.parse(source.parserOptions);
  const meta = readRawMeta(source.id);
  if (!meta) throw new Error(`${source.id}: raw-meta がありません（先に pipeline:fetch）`);
  const fileFor = (url: string) => {
    const m = meta.files.find((f) => f.fetchedFrom === url);
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
  if (!has(roster.views, opt.asOfText)) missing.push(`${rosterFile.filename}: 基準日「${opt.asOfText}」が本文に見つかりません`);

  const allNames = opt.factions.map((f) => (f.nameParts ?? [f.name]).map(norm));
  /** 会派 i の範囲（モード×ページごと）。枠があれば切り出し、無ければ会派名から次の会派名まで */
  const sectionsOf = (i: number): string[] => {
    const f = opt.factions[i]!;
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
      if (!sections.some((s) => s.includes(key))) {
        missing.push(`${rosterFile.filename}: 議員「${m}」が会派「${f.name}」の${f.box ? "枠" : "区間（会派名から次の会派名まで）"}に見つかりません`);
      }
    }
    // 枠のときは、他の会派の議員が枠に入っていないこと（書き写しの会派違いを両側から捕まえる）
    if (f.box) {
      opt.factions.forEach((g, j) => {
        if (j === i) return;
        for (const m of g.members) {
          if (sections.every((s) => s.includes(norm(m)))) {
            missing.push(`${rosterFile.filename}: 会派「${f.name}」の枠に「${g.name}」の議員「${m}」が入っています（枠か書き写しの誤り）`);
          }
        }
      });
    }
    if (f.declared != null) {
      const n = declaredNumber(f.declared);
      if (n == null) missing.push(`${f.name}: declared「${f.declared}」から人数を1つに読めません`);
      else if (n !== f.members.length) missing.push(`${f.name}: 名簿の印字は ${n}人、書き写しは ${f.members.length}人`);
      if (!sections.some((s) => s.includes(norm(f.declared!)))) {
        missing.push(`${rosterFile.filename}: 会派「${f.name}」の人数の印字「${f.declared}」が${f.box ? "枠" : "区間"}に見つかりません`);
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
    const expect = opt.teisu - (opt.vacancies ?? 0);
    if (seats !== expect) missing.push(`現員 ${seats} が 定数 ${opt.teisu} − 欠員 ${opt.vacancies ?? 0} = ${expect} と合いません（書き落とし？）`);
  }

  // 議案番号は件名の**直前**、結果・議決月日は件名の**直後**だけを見る（2026-10-01）。
  // 一覧には別の議案が並ぶので「本文のどこかにある」では誤りが素通りし（笛吹で「議案第19号」が通った）、
  // 前後で見ると隣の行の値に当たる（直前の議案の議決日「3月12日」が通った・レビューで実測）。
  // 原典の組版で件名から離れる項目だけ `farOk` で外す（外した項目は本文のどこかにあることだけを見る）。
  const BEFORE = 20;
  const AFTER = 60;
  const nameN = norm(r.billName);
  const billNoN = norm(r.billNo);
  /** 件名の出現のうち、直前に議案番号があるもの（farOk の billNo なら全出現） */
  const anchors: { text: string; at: number; page: number }[] = [];
  for (const v of resultViews) {
    for (let i = v.text.indexOf(nameN); i >= 0; i = v.text.indexOf(nameN, i + 1)) {
      const before = v.text.slice(Math.max(0, i - BEFORE), i + (nameN.includes(billNoN) ? nameN.length : 0));
      if (r.farOk?.includes("billNo") || before.includes(billNoN)) anchors.push({ text: v.text, at: i, page: v.page });
    }
  }
  if (!resultViews.some((v) => v.text.includes(nameN))) {
    missing.push(`${resultFile.filename}: 件名「${r.billName}」が本文に見つかりません`);
  } else if (anchors.length === 0) {
    missing.push(`${resultFile.filename}: 議案番号「${r.billNo}」が件名の直前${BEFORE}字に見つかりません`);
  }
  if (r.farOk?.includes("billNo") && !has(resultViews, r.billNo)) {
    missing.push(`${resultFile.filename}: 議案番号「${r.billNo}」が本文に見つかりません`);
  }
  const after = (needle: string, what: string, key: "result" | "decidedDate") => {
    const n = norm(needle);
    if (r.farOk?.includes(key)) {
      if (!has(resultViews, needle)) missing.push(`${resultFile.filename}: ${what}「${needle}」が本文に見つかりません`);
      return;
    }
    if (anchors.length && !anchors.some((a) => a.text.slice(a.at + nameN.length, a.at + nameN.length + AFTER).includes(n))) {
      missing.push(`${resultFile.filename}: ${what}「${needle}」が件名の直後${AFTER}字に見つかりません`);
    }
  };
  after(r.resultText ?? r.result, "結果", "result");
  // 結果は原典の語のまま — 直後の窓で最初に出る結果の語が、書き写した語と同じであること（「原案可決」を「可決」に丸めない）
  if (!r.farOk?.includes("result") && anchors.length) {
    const ok = anchors.some((a) => {
      const w = a.text.slice(a.at + nameN.length, a.at + nameN.length + AFTER);
      return w.match(/原案可決|修正可決|可決|否決|承認|同意|認定|採択/)?.[0] === norm(r.result);
    });
    if (!ok) missing.push(`${resultFile.filename}: 結果「${r.result}」が原典の語（件名の直後の最初の結果語）と一致しません`);
  }
  if (!has(resultViews, r.sessionLabel)) missing.push(`${resultFile.filename}: 会期「${r.sessionLabel}」が本文に見つかりません`);
  const [, mo, d] = r.decidedDate.split("-").map(Number) as [number, number, number];
  after(`${mo}月${d}日`, "議決月日", "decidedDate");
  if (opt.asOf > r.decidedDate) {
    missing.push(`名簿の基準日 ${opt.asOf} が議決日 ${r.decidedDate} より後（議決時点の名簿ではない）`);
  }

  if (missing.length) throw new Error(`${source.id}: 書き写しが原典と合いません\n  - ${missing.join("\n  - ")}`);

  const billPage = isPdf(resultFile) ? (anchors.find((a) => a.page > 0)?.page ?? null) : null;
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
