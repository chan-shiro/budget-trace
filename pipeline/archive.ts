// [1]→ 一次資料の外部アーカイブ（Wayback Machine）登録。
// 使い方: bun run pipeline:archive [sourceId] [--force]
//
// 目的: 一次資料は発行元サイトから削除され得る（実例: 甲府市 R4・R5 当初予算資料は
// 市サイトから削除済みで Wayback にも無く入手不可になった）。raw 層の git アーカイブが
// 一義的な保全だが、それは「私たちの写し」でしかない。**第三者が検証できる中立な写し**
// として Wayback Machine（Internet Archive）にも登録し、スナップショット URL を
// data/archives.json（台帳・コミット対象）に記録する。
//
// 動作:
// 1. registry の全ソースの直リンク（urls）とランディングページを対象にする
// 2. CDX API で既存スナップショットを確認。あれば記録して終わり（登録済み）
// 3. 無ければ Save Page Now（https://web.archive.org/save/<url>）で登録を要求し、
//    CDX に現れるまでポーリングして記録する
// 4. --force は既存スナップショットがあっても新規登録を要求する
//    （直リンクが同じパスへ上書きされる資料 — kofu-zaisei-jokyo — の版の保全に使う）
//
// 行儀: 逐次実行・リクエスト間に間隔を置く（SPN の匿名レートリミットに配慮）。
// 失敗はエラーにせず台帳に記録しない（次回実行で再試行される）。
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { SOURCES } from "./registry/sources";
import { DATA_DIR, readJson, readRawMeta, writeJson } from "./lib/store";
import { archivesLedgerSchema, type ArchiveEntry } from "./types";

const ARCHIVES_PATH = join(DATA_DIR, "archives.json");
const UA = "budget-trace archive step (github.com/chan-shiro/budget-trace)";
const SAVE_INTERVAL_MS = 6_000; // SPN への連続要求の間隔
const POLL_TRIES = 10;
const POLL_INTERVAL_MS = 6_000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** CDX API で最新の 200 スナップショットを探す */
async function latestSnapshot(url: string): Promise<{ timestamp: string; waybackUrl: string } | null> {
  const api = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(url)}&output=json&filter=statuscode:200&limit=-1`;
  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const rows = (await res.json()) as string[][];
  if (!Array.isArray(rows) || rows.length < 2) return null;
  const last = rows[rows.length - 1]!;
  const timestamp = last[1]!;
  const original = last[2]!;
  return { timestamp, waybackUrl: `https://web.archive.org/web/${timestamp}/${original}` };
}

/**
 * コピーが raw（私たちが parse した版）と同一バイト列かを sha256 で突合する（file のみ）。
 * Wayback の `id_` 付き URL は原本のバイト列をそのまま返す。
 * 上書き型 URL の古いスナップショットを現行版と誤認する事故を検出できる
 * （実例: 財政事情 01ipankaikei.pdf の 2024 年版スナップショット）。
 * raw に該当ファイルが無い・取得失敗は undefined（判定不能）
 */
/**
 * Wayback の一部クローラは大きなファイルを **MiB 境界ちょうど**で打ち切る。
 * **上限は1つではない**（2026-07-16 実測）: 神戸R8 24MB→**5 MiB** / 山口R7 5.3MB→5 MiB /
 * 京都R5・R4→5 MiB / **浜松R5 3.9MB→1 MiB**。
 * 最初は「5 MiB ちょうど」を定数にしていたが、1 MiB の実例が出て反証された。
 * **境界そのもの（1MiB の倍数）で判定する** — 実ファイルが 1MiB の倍数ちょうどになる確率は
 * 100万分の1程度で、かつ「raw より小さい」「sha が不一致」も同時に満たす必要があるので誤検出はしない。
 */
const MIB = 1024 * 1024;

interface VerifyResult {
  match: boolean;
  /** Wayback 側が切り詰めている（＝発行元の差し替えではない。私たちの raw が正しい） */
  truncated: boolean;
  /** 切り詰められたコピーのバイト数（打ち切りの上限がいくつだったかを出すため） */
  bytes: number;
}

async function verifySnapshot(
  sourceId: string,
  url: string,
  timestamp: string,
): Promise<VerifyResult | undefined> {
  const meta = readRawMeta(sourceId);
  if (!meta) return undefined;
  const filename = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");
  // HTML ページはテンプレート差（トークン・広告タグ等）で取得時刻によりバイト列が
  // 揺れるため sha 突合の対象外（静的ファイルのみ検証する）
  if (!/\.(pdf|xlsx?|csv)$/i.test(filename)) return undefined;
  const raw = meta.files.find((f) => f.filename === filename);
  if (!raw) return undefined;
  try {
    const res = await fetch(`https://web.archive.org/web/${timestamp}id_/${url}`, {
      headers: { "User-Agent": UA },
    });
    if (!res.ok) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    const match = createHash("sha256").update(buf).digest("hex") === raw.sha256;
    // **MiB 境界ちょうど、かつ raw の方が大きい** = Wayback 側の打ち切り。
    // 「発行元が差し替えた」と意味が正反対なので、不一致をひとまとめにしない。
    const truncated = !match && buf.length > 0 && buf.length % MIB === 0 && raw.bytes > buf.length;
    return { match, truncated, bytes: buf.length };
  } catch {
    return undefined;
  }
}

/** Save Page Now に登録を要求する（結果はポーリングで確認） */
async function requestSave(url: string): Promise<boolean> {
  const res = await fetch(`https://web.archive.org/save/${url}`, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  // 200 のほか、処理受付ページや 302 経由でも登録は進む。429 はレートリミット
  if (res.status === 429) {
    console.log(`  ! レートリミット（429）。しばらく待って再実行してください`);
    return false;
  }
  return res.ok;
}

function loadLedger(): ArchiveEntry[] {
  if (!existsSync(ARCHIVES_PATH)) return [];
  return archivesLedgerSchema.parse(readJson(ARCHIVES_PATH)).entries;
}

function saveLedger(entries: ArchiveEntry[]): void {
  entries.sort((a, b) => a.sourceId.localeCompare(b.sourceId) || a.url.localeCompare(b.url));
  writeJson(ARCHIVES_PATH, {
    note: "一次資料の Wayback Machine スナップショット台帳。再生成/追記: bun run pipeline:archive",
    entries,
  });
}

const cliArgs = process.argv.slice(2);
const arg = cliArgs.find((a) => !a.startsWith("--"));
const force = cliArgs.includes("--force");

const targets = SOURCES.filter((s) => !s.fixture && (!arg || s.id === arg));
if (targets.length === 0) {
  console.error(`ソースが見つかりません: ${arg}`);
  process.exit(1);
}

const ledger = loadLedger();
// 逐次保存: 対象が多いと実行に時間がかかるため、1件ごとに台帳へ書く（中断しても進捗が残る）。
//
// ⚠ **書き込みのたびにディスクから読み直して併合する**（2026-07-16）。以前は起動時の
// `loadLedger()` のスナップショットをメモリで持ち回り、丸ごと上書きしていたため、
// **2つの archive を並行実行すると後勝ちで相手の登録が全部消えた**（実害: 特別区の平成年度を
// 収録中、大田4件の登録が江東・中央側のプロセスに消された）。しかも**各プロセスは「新規登録 2」と
// 成功を報告する**ので、台帳を見に行くまで気づけない＝§2-4 の「静かに壊れる」型。
// これは真のロックではない（read→write の間に別プロセスが書けば取りこぼす）が、
// **ファイル丸ごとの消失は防ぐ**。Wayback 待ちが数分あるので実用上はこれで足りる。
const upsert = (e: ArchiveEntry) => {
  const merged = loadLedger();
  for (const local of ledger) {
    const j = merged.findIndex((x) => x.sourceId === local.sourceId && x.url === local.url);
    if (j >= 0) merged[j] = local;
    else merged.push(local);
  }
  const i = merged.findIndex((x) => x.sourceId === e.sourceId && x.url === e.url);
  if (i >= 0) merged[i] = e;
  else merged.push(e);
  const k = ledger.findIndex((x) => x.sourceId === e.sourceId && x.url === e.url);
  if (k >= 0) ledger[k] = e;
  else ledger.push(e);
  saveLedger(merged);
};

let saved = 0;
let already = 0;
let failed = 0;

for (const source of targets) {
  const urls: { url: string; kind: "file" | "landing" }[] = [
    ...(source.urls ?? (source.url ? [source.url] : [])).map((u) => ({ url: u, kind: "file" as const })),
    ...(source.landingPage ? [{ url: source.landingPage, kind: "landing" as const }] : []),
  ];
  for (const { url, kind } of urls) {
    // WARP（国立国会図書館）／Wayback 由来の URL はそれ自体が恒久アーカイブなので登録しない
    if (url.includes("warp.ndl.go.jp") || url.includes("web.archive.org")) continue;
    // 同じスナップショットを検証済みなら再ダウンロードしない
    const prior = ledger.find((x) => x.sourceId === source.id && x.url === url);
    const verify = async (timestamp: string, waybackUrl: string): Promise<VerifyResult | undefined> =>
      kind !== "file"
        ? undefined
        : prior?.waybackUrl === waybackUrl && prior.sha256Match !== undefined
          ? { match: prior.sha256Match, truncated: prior.waybackTruncated === true, bytes: 0 }
          : await verifySnapshot(source.id, url, timestamp);
    const verdict = (v: VerifyResult | undefined) =>
      v === undefined ? {} : { sha256Match: v.match, ...(v.truncated ? { waybackTruncated: true } : {}) };

    const existing = await latestSnapshot(url);
    if (existing && !force) {
      const match = await verify(existing.timestamp, existing.waybackUrl);
      upsert({
        sourceId: source.id, url, kind,
        waybackUrl: existing.waybackUrl, waybackTimestamp: existing.timestamp,
        checkedAt: new Date().toISOString(),
        ...verdict(match),
      });
      console.log(`✓ 登録済み ${source.id} ${kind}: ${existing.waybackUrl}`);
      if (match?.truncated) {
        console.log(`  ⚠ Wayback 側が ${match.bytes / MIB}MiB で打ち切っている（私たちの raw が正しい）。--force で再登録しても同じ上限で切られる見込み`);
      } else if (match?.match === false) {
        console.log(`  ⚠ コピーが raw と不一致（別版の可能性）。--force で現行版を再登録してください`);
      }
      already++;
      continue;
    }
    console.log(`↑ SPN 登録要求 ${source.id} ${kind}: ${url}`);
    const ok = await requestSave(url);
    await sleep(SAVE_INTERVAL_MS);
    let snap = ok ? await latestSnapshot(url) : null;
    for (let t = 0; !snap && ok && t < POLL_TRIES; t++) {
      await sleep(POLL_INTERVAL_MS);
      snap = await latestSnapshot(url);
    }
    if (snap) {
      const match = await verify(snap.timestamp, snap.waybackUrl);
      upsert({
        sourceId: source.id, url, kind,
        waybackUrl: snap.waybackUrl, waybackTimestamp: snap.timestamp,
        checkedAt: new Date().toISOString(),
        ...verdict(match),
      });
      console.log(`✓ 登録完了 ${source.id} ${kind}: ${snap.waybackUrl}`);
      if (match?.truncated) {
        console.log(`  ⚠ Wayback 側が ${match.bytes / MIB}MiB で打ち切っている（私たちの raw が正しい）`);
      } else if (match?.match === false) {
        console.log(`  ⚠ コピーが raw と不一致（SPN 反映待ちで古い版を拾った可能性。時間を置いて再実行）`);
      }
      saved++;
    } else {
      console.log(`✗ 未確認 ${source.id} ${kind}（次回実行で再試行）`);
      failed++;
    }
  }
}

// 最後の一括保存も併合で行う（上の upsert と同じ理由 — 丸ごと上書きすると並行実行で相手を消す）
const final = loadLedger();
for (const local of ledger) {
  const j = final.findIndex((x) => x.sourceId === local.sourceId && x.url === local.url);
  if (j >= 0) final[j] = local;
  else final.push(local);
}
saveLedger(final);
console.log(`\n台帳: ${ARCHIVES_PATH}`);
console.log(`新規登録 ${saved} / 登録済み ${already} / 未確認 ${failed}（計 ${final.length} 件）`);
if (failed > 0) process.exitCode = 1;
