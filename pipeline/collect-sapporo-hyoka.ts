// 札幌市 事業評価調書（行政評価・自己評価）の収集器（#127）
//
// 札幌の事業報告（成果）は **1事業1PDF** で、R7 公表分だけで 666 リンクが局別 21 ページに
// 散らばる。registry の `urls` に手で並べるのは非現実的なので、このスクリプトが
// 局別一覧を巡回して URL 台帳（sapporo-jigyou-hyouka-r7.files.json）を生成し、
// registry がそれを import して `urls` に展開する。
//
// 使い方: bun run pipeline/collect-sapporo-hyoka.ts
// 出力: pipeline/registry/sapporo-jigyou-hyouka-r7.files.json（コミットする＝再現可能な台帳）
//
// ファイル名の規則（偵察 2026-07-23 実測）: `西暦4桁 + 会計コード2桁 + 事業コード5桁 .pdf`
// （例 20251021231.pdf = 2025年公表・会計10=一般会計・事業コード21231）。
// **URL だけで一般会計フィルタができる**のがこの規則の価値。ただし例外が3種ある:
// - `_1` サフィックス（CMS の再アップロードで付く・14件）→ 規則どおり読める
// - `dennkijidoushatyousho.pdf`（規則外の命名・1件）→ 中身を実見して手動登録（下の OVERRIDES）
// - `20241070010.pdf`（西暦が2024・1件）→ **前年度（令和5年度）の調書**。R6 で3事業統合された
//   旧事業の参考リンクで、R7 評価の調書ではない → 除外（パーサの年度ゲートでも弾かれる）
//
// 会計コードの実測分布（R7・666リンク）: 10=一般会計 634 / 22・25・32・33・35・60・80・85・90・95=
// 特別会計・企業会計 31 / 規則外 1（dennki）。一般会計のみ収録する。
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://www.city.sapporo.jp";
const INDEX = `${BASE}/somu/hyoka/kekka/documents/zikohyouka/r7.html`;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "registry", "sapporo-jigyou-hyouka-r7.files.json");

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};

/** 規則外ファイルの手動判定（中身を実見した結果をここに固定する） */
const OVERRIDES: Record<string, { include: boolean; accountCode: string | null; projectCode: string | null; reason: string }> = {
  "dennkijidoushatyousho.pdf": {
    include: true,
    accountCode: "10",
    projectCode: "22947",
    // 調書の基本情報欄: 年度=令和6年度・会計コード10 一般会計・事業コード22947（電気自動車普及促進費）
    reason: "規則外の命名だが中身は正規の令和6年度調書（実見 2026-07-23）",
  },
  "20241070010.pdf": {
    include: false,
    accountCode: "10",
    projectCode: "70010",
    reason: "西暦2024=前年度（令和5年度）の調書。R6 で3事業統合された旧事業（スタートアップ成長支援費）の参考リンク",
  },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return await res.text();
}

interface FileEntry {
  url: string;
  filename: string;
  bureau: string;
  /** リンクテキストの事業名（「（PDF：〜KB）」を除いたもの）。照合用の参考情報 */
  linkText: string;
  accountCode: string | null;
  projectCode: string | null;
}

const stripTags = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/[\s　]+/g, "")
    .replace(/（PDF：[^）]*）$/, "");

// 1. 年度インデックスから局別ページを列挙
const indexHtml = await fetchHtml(INDEX);
const bureauPages = [...new Set(
  [...indexHtml.matchAll(/href="(\/somu\/hyoka\/kekka\/documents\/zikohyouka\/r7kyoku\/[a-z0-9-]+\.html)"/g)].map((m) => m[1]!),
)].sort();
if (bureauPages.length < 18) {
  throw new Error(`局別ページが少なすぎます（${bureauPages.length}）。インデックスの構造が変わった可能性`);
}
console.log(`局別ページ: ${bureauPages.length}`);

// 2. 各局ページから PDF リンクを列挙
const files: FileEntry[] = [];
const excluded: (FileEntry & { reason: string })[] = [];
let totalLinks = 0;
for (const page of bureauPages) {
  await sleep(500); // 静的サイトだが連続アクセスは控えめに
  const html = await fetchHtml(BASE + page);
  const bureau = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? page).replace(/／札幌市.*$/, "").trim();
  const seen = new Set<string>();
  for (const m of html.matchAll(/<a[^>]+href="([^"]*\.pdf)"[^>]*>(.*?)<\/a>/gs)) {
    const href = m[1]!;
    if (seen.has(href)) continue;
    seen.add(href);
    totalLinks++;
    const filename = decodeURIComponent(href.split("/").pop()!);
    const linkText = stripTags(m[2]!);
    const base: Omit<FileEntry, "accountCode" | "projectCode"> = {
      url: href.startsWith("http") ? href : BASE + href,
      filename,
      bureau,
      linkText,
    };
    const ov = OVERRIDES[filename];
    if (ov) {
      const e = { ...base, accountCode: ov.accountCode, projectCode: ov.projectCode };
      if (ov.include) files.push(e);
      else excluded.push({ ...e, reason: ov.reason });
      continue;
    }
    const nm = filename.match(/^(\d{4})(\d{2})(\d{5})(?:_\d+)?\.pdf$/);
    if (!nm) {
      // 規則外は黙って通さない（拾い漏れ・別資料の混入を「静かに」起こさないため throw）
      throw new Error(`${page}: 規則外のファイル名 ${filename} — 実見して OVERRIDES に判定を書いてください`);
    }
    const [, year, accountCode, projectCode] = nm;
    if (year !== "2025") {
      throw new Error(`${page}: 公表年が2025でないファイル ${filename} — 実見して OVERRIDES に判定を書いてください`);
    }
    const e = { ...base, accountCode: accountCode!, projectCode: projectCode! };
    if (accountCode === "10") files.push(e);
    else excluded.push({ ...e, reason: `会計コード ${accountCode}（一般会計でない）` });
  }
}

// 3. 台帳の健全性チェック
const codes = new Map<string, FileEntry>();
for (const f of files) {
  const dup = codes.get(f.projectCode!);
  if (dup) throw new Error(`事業コード重複: ${f.projectCode}（${dup.filename} と ${f.filename}）`);
  codes.set(f.projectCode!, f);
}
files.sort((a, b) => a.projectCode!.localeCompare(b.projectCode!));
excluded.sort((a, b) => a.filename.localeCompare(b.filename));

const out = {
  // 収集器のスナップショット来歴。再実行すると発行元の更新（差し替え・追加）で差分が出る
  collectedAt: new Date().toISOString(),
  indexUrl: INDEX,
  bureauPages: bureauPages.length,
  totalLinks,
  files,
  excluded,
};
writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`✓ 一般会計 ${files.length} / 除外 ${excluded.length}（特別・企業会計ほか）/ リンク総数 ${totalLinks}`);
console.log(`→ ${OUT}`);
