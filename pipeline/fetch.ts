// [0]→[1] 資料レジストリの URL から raw 層へダウンロードする。
// 使い方: bun run pipeline:fetch [sourceId]（省略時は url を持つ全ソース）
//
// 注: 政府系サイトはデータセンターIPからの自動取得を弾くことがある。
//     403 等で取れない場合は landingPage から手動ダウンロードして
//     `bun run pipeline:ingest <sourceId> <ファイルパス>` で投入する。
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { SOURCES, findSource } from "./registry/sources";
import { registerRawFile } from "./lib/store";

// 政府系サイトは既定 UA のプログラム的アクセスを弾くことがあるため、ブラウザ相当の UA を名乗る
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};

async function fetchOne(id: string, url: string): Promise<void> {
  console.log(`↓ ${id}: ${url}`);
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (!res.ok) {
    throw new Error(
      `${id}: HTTP ${res.status}。自動取得が拒否された場合は landingPage から手動取得 → pipeline:ingest してください。`,
    );
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = decodeURIComponent(new URL(url).pathname.split("/").pop() || `${id}.bin`);
  const tmp = join(tmpdir(), filename);
  mkdirSync(tmpdir(), { recursive: true });
  writeFileSync(tmp, buf);
  const { meta } = registerRawFile(id, tmp, url);
  const f = meta.files.find((x) => x.filename === filename)!;
  console.log(`✓ ${id}/${filename} (${f.bytes.toLocaleString()} bytes, sha256=${f.sha256.slice(0, 12)}…)`);
}

async function fetchSource(id: string): Promise<void> {
  const source = findSource(id);
  const urls = source.urls ?? (source.url ? [source.url] : []);
  if (urls.length === 0) {
    console.log(
      `– ${id}: url 未設定のためスキップ（手動投入: pipeline:ingest）` +
        (source.landingPage ? `\n  ランディングページ: ${source.landingPage}` : ""),
    );
    return;
  }
  for (const url of urls) {
    await fetchOne(id, url);
    // 多ファイル資料（札幌の事業評価調書は634本）で発行元へ連続アクセスしない
    if (urls.length > 1) await new Promise((r) => setTimeout(r, 300));
  }
}

const arg = process.argv[2];
const targets = arg ? [arg] : SOURCES.filter((s) => !s.fixture).map((s) => s.id);
for (const id of targets) {
  await fetchSource(id);
}
