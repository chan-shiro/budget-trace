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
import { registerRawFile, readRawMeta } from "./lib/store";

// 政府系サイトは既定 UA のプログラム的アクセスを弾くことがあるため、ブラウザ相当の UA を名乗る
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};

/**
 * raw のファイル名を決める。既定は URL の basename。
 *
 * ⚠⚠ **basename だけだと、別ディレクトリの同名ファイルが静かに上書きされる**
 * （2026-08-04・#164 で実害。横浜の事業計画書は医療局と議会局がどちらも
 * `0001_20260126.pdf` で、**62本のうち61本しか raw に残らなかった**）。
 * 上書きは「旧/新 の sha256 が違う」というログを出すだけで**エラーにならない**ので、
 * 件数を数えなければ気づけない。
 *
 * → **既に別の URL から同名で登録されていたら、親ディレクトリ名を前置して分ける**。
 *   同じ URL の取り直し（更新）はそのまま上書きさせる（それは意図した動作）。
 */
function uniqueFilename(id: string, url: string): string {
  const segs = new URL(url).pathname.split("/").filter(Boolean).map(decodeURIComponent);
  const base = segs[segs.length - 1] || `${id}.bin`;
  const meta = readRawMeta(id);
  const clash = meta?.files.find((f) => f.filename === base && f.fetchedFrom !== url);
  if (!clash) return base;
  // ⚠ **「一意になる最短の名前」ではなく「実際に違うセグメント」を採る** — 直上の
  //   ディレクトリは相手と同じことが多く（横浜はどちらも `r8jigyoukeikaku.files`）、
  //   一意ではあっても**どのファイルか人が読めない名前**になる。画面の出典ラベルに出るので、
  //   相手の URL と**食い違う一番深いセグメント**（横浜なら局名 `gikai`）を前置する。
  const other = new URL(clash.fetchedFrom).pathname.split("/").filter(Boolean).map(decodeURIComponent);
  for (let up = 2; up <= Math.min(6, segs.length); up++) {
    const mine = segs[segs.length - up];
    const theirs = other[other.length - up];
    if (mine === theirs) continue; // 同じ階層は名前を分けられない
    const cand = `${mine}__${base}`;
    if (!meta!.files.some((f) => f.filename === cand && f.fetchedFrom !== url)) {
      console.log(`  ⚠ ファイル名の衝突: ${base} → ${cand}（別の URL に同名がある）`);
      return cand;
    }
  }
  throw new Error(`${id}: ${base} のファイル名衝突を解消できません（${url}）`);
}

async function fetchOne(id: string, url: string): Promise<void> {
  console.log(`↓ ${id}: ${url}`);
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (!res.ok) {
    throw new Error(
      `${id}: HTTP ${res.status}。自動取得が拒否された場合は landingPage から手動取得 → pipeline:ingest してください。`,
    );
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = uniqueFilename(id, url);
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
