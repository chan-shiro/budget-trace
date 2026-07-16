// 偵察用のドライラン。**registry を触らず**、手元のファイルにパーサを直接当てて結果を見る。
//
// なぜ要るか: `source-scout` は registry を書き換えない制約があるため、パイプラインを走らせられず、
// 「この資料は既存パーサに乗るか／parserOptions は何か」を**読解と推論だけ**で答えていた。
// 当たることもあるが外れることもある（2026-07-16 の特別区24団体で実際に3種類の誤報が出た:
// 「見出し指定は不要」＝実際はパーサが見出しの存在を必須チェックしていて throw する、
// 「licenseClassOf の語彙が当たらない」＝docs の要約を正規表現と取り違えた、など）。
// **推論を実測に変えるための道具**。
//
// 使い方:
//   bun run pipeline:try-parse <parser> <file...> --opts '<JSON>'
//
// 例:
//   bun run pipeline:try-parse kofu-yosansho /tmp/scout/r8.pdf \
//     --opts '{"revenuePage":5,"expenditurePage":7,"revenueHeading":"歳入予算一覧表","expenditureHeading":"歳出予算一覧表（目的別）"}'
//
// 出力: 抽出できた款の全件（**款名は目視用に必ず全件出す** — Σ が通っても款名は壊れうる。
// validate は款名の破損を検出しない）＋ Σ款 vs 記載合計の照合。
//
// **これは検証ゲートではない**。ここが通っても registry へ入れたら validate を必ず通すこと。
import { getParser } from "./parsers/index";
import { sourceEntrySchema, type SourceEntry } from "./types";
import { basename, resolve } from "node:path";
import { existsSync } from "node:fs";

const argv = process.argv.slice(2);
const optsIdx = argv.indexOf("--opts");
const parserKey = argv[0];
const files = argv.slice(1, optsIdx === -1 ? undefined : optsIdx);
const optsJson = optsIdx === -1 ? "{}" : argv[optsIdx + 1] ?? "{}";

if (!parserKey || files.length === 0) {
  console.error(
    [
      "使い方: bun run pipeline:try-parse <parser> <file...> --opts '<JSON>'",
      "",
      "例:",
      "  bun run pipeline:try-parse kofu-yosansho /tmp/scout/r8.pdf \\",
      `    --opts '{"revenuePage":5,"expenditurePage":7,"revenueHeading":"歳入予算一覧表"}'`,
      "",
      "registry を書き換えずにパーサを試すためのドライラン（source-scout 用）。",
    ].join("\n"),
  );
  process.exit(1);
}

let parserOptions: Record<string, unknown>;
try {
  parserOptions = JSON.parse(optsJson);
} catch (e) {
  console.error(`--opts が JSON として読めません: ${optsJson}\n${(e as Error).message}`);
  process.exit(1);
}

for (const f of files) {
  if (!existsSync(f)) {
    console.error(`ファイルがありません: ${f}`);
    process.exit(1);
  }
}

// パーサに渡すためだけのダミー。**registry には入らない**（id も data/ も作らない）。
const source: SourceEntry = sourceEntrySchema.parse({
  id: "try-parse-dry-run",
  title: "（ドライラン）",
  publisher: "（ドライラン）",
  url: null,
  kind: files[0]!.endsWith(".pdf") ? "pdf"
    : files[0]!.endsWith(".csv") ? "csv"
    : files[0]!.match(/\.xlsx?$/) ? "excel"
    : "page",
  fiscalYear: "R8",
  scope: "（ドライラン）",
  license: "（ドライラン）",
  parser: parserKey,
  parserOptions,
});

const parser = getParser(parserKey);
const doc = parser(
  files.map((p) => ({ path: resolve(p), filename: basename(p) })),
  source,
) as Record<string, unknown>;

const facts = (doc.facts ?? []) as { side: string; kanNo: number | null; kanName: string; amount: number; prevAmount: number | null }[];
const yen = (n: number | null) => (n == null ? "—" : n.toLocaleString());

for (const side of ["revenue", "expenditure"] as const) {
  const rows = facts.filter((f) => f.side === side);
  if (rows.length === 0) continue;
  const label = side === "revenue" ? "歳入" : "歳出";
  const total = doc[side === "revenue" ? "revenueTotal" : "expenditureTotal"] as number | null;
  const prevTotal = doc[side === "revenue" ? "prevRevenueTotal" : "prevExpenditureTotal"] as number | null;
  const sum = rows.reduce((a, r) => a + r.amount, 0);
  const prevSum = rows.reduce((a, r) => a + (r.prevAmount ?? 0), 0);

  console.log(`\n=== ${label}（${rows.length}款） ===`);
  // **款名は全件出す**。Σ が通っても款名は壊れうる（連結・縦書きラベルの混入・異体字）。
  for (const r of rows) {
    console.log(`  ${String(r.kanNo ?? "—").padStart(3)} ${r.kanName.padEnd(18)} ${yen(r.amount).padStart(14)} ${yen(r.prevAmount).padStart(14)}`);
  }
  const chk = (name: string, s: number, t: number | null) => {
    if (t == null) return `  ${name}: 記載合計が取れていません（Σ=${yen(s)}）`;
    const d = s - t;
    return d === 0
      ? `  ${name}: Σ=${yen(s)} = 記載 ${yen(t)}  ✓ 差0`
      : `  ${name}: Σ=${yen(s)} vs 記載 ${yen(t)}  ✗ 差 ${d > 0 ? "+" : ""}${yen(d)}`;
  };
  console.log(chk("当年度", sum, total));
  console.log(chk("前年度", prevSum, prevTotal));
}

console.log(`\n前年度の基準: ${doc.prevBasis ?? "—"}${doc.prevNote ? `（注記: ${doc.prevNote}）` : ""}`);
console.log(
  "\n※ これはドライランで検証ゲートではない。registry へ入れたら pipeline:validate を必ず通すこと。" +
  "\n※ 款名は上に全件出してある — **Σ が差0 でも款名は壊れうる**ので目視すること。",
);
