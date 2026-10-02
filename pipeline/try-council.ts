// 議会の構成（`council-transcribed`）のドライラン。**registry も data/ も触らず**、書き写しの spec を
// 手元の原典と突き合わせる（本番と同じパーサ・同じ照合）。偵察役が書き写しを仕上げるための道具。
//
// 使い方:
//   bun run pipeline:try-council <spec.json>
//
// spec.json は1団体または配列。各要素:
//   { "id", "title", "publisher", "urls": [...], "landingPage", "kind", "scope", "license",
//     "comments": [...]（任意・registry に書くコメント）,
//     "options": { …parserOptions… },
//     "files": { "<url>": "<手元のファイルのパス>", … } }   ← urls の全件ぶん
//
// 通ったものは registry に入れて fetch → parse → validate を必ず通すこと（**これは検証ゲートではない**）。
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { parseCouncilTranscribed } from "./parsers/council-transcribed";
import { sourceEntrySchema } from "./types";

const specPath = process.argv[2];
if (!specPath) {
  console.error("使い方: bun run pipeline:try-council <spec.json>");
  process.exit(1);
}
const raw: unknown = JSON.parse(readFileSync(specPath, "utf8"));
const specs = (Array.isArray(raw) ? raw : [raw]) as Record<string, unknown>[];
let failed = 0;
for (const sp of specs) {
  const files = (sp.files ?? {}) as Record<string, string>;
  const base = dirname(resolve(specPath));
  const source = sourceEntrySchema.parse({
    id: sp.id, title: sp.title, publisher: sp.publisher, url: null, urls: sp.urls, landingPage: sp.landingPage,
    kind: sp.kind, fiscalYear: "R8", scope: sp.scope, license: sp.license, parser: "council-transcribed", parserOptions: sp.options,
  });
  for (const u of source.urls ?? []) {
    if (!files[u]) console.log(`  ⚠ ${source.id}: urls の ${u} に手元のファイルがありません（files に書く）`);
  }
  try {
    const doc = parseCouncilTranscribed([], source, (url) => {
      const p = files[url];
      if (!p) return undefined;
      const abs = resolve(base, p);
      return existsSync(abs) ? { path: abs, filename: basename(abs) } : undefined;
    });
    console.log(`✓ ${source.id}: ${doc.body} 現員${doc.seats}${doc.teisu ? `（定数${doc.teisu}）` : ""}・${doc.factions.length}会派 ／ ${doc.resolution.billNo} ${doc.resolution.billName} ${doc.resolution.decidedDateLabel} ${doc.resolution.result}`);
    for (const f of doc.factions) console.log(`    ${f.name}: ${f.seats}`);
    if (doc.votes) {
      const t: Record<string, number> = {};
      for (const c of doc.votes.columns) {
        const n = doc.votes.basis === "member" || c.member ? 1 : (doc.factions.find((f) => f.name === c.faction)?.seats ?? 0) - doc.votes.columns.filter((o) => o.faction === c.faction && o.member).length;
        t[c.stance] = (t[c.stance] ?? 0) + n;
      }
      console.log(`    賛否（${doc.votes.basis === "member" ? "議員ごと" : "会派ごと"}・${doc.votes.columns.length}列）: ${Object.entries(t).map(([k, n]) => `${k}${n}`).join("・")}`);
      for (const c of doc.votes.columns.filter((c) => c.stance !== "賛成")) console.log(`      ${c.stance}: ${c.member ?? c.label}（${c.faction}）`);
    }
  } catch (e) {
    failed++;
    console.log(`✗ ${String((e as Error).message)}`);
  }
}
process.exit(failed ? 1 : 0);
