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
import { MIB, VERIFIABLE_RE, classifyVerify } from "./lib/wayback";
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
 * 照合の結果は3通りある。**「対象外」と「できなかった」を undefined でひとまとめにしない**
 * （2026-07-16）— 台帳で両者が区別できず、江戸川 R8 が「検証できなかった」まま
 * 「魚拓が揃った」と報告されかけた。
 *   - `skipped`  … 照合対象外（HTML・設計どおり）。台帳にフィールドを置かない
 *   - `failed`   … 照合すべきなのにできなかった。`sha256Verified: false` を残す
 *   - `verified` … 照合が走った。`sha256Match` と診断用のバイト数を残す
 */
type VerifyResult =
  | { status: "skipped" }
  | { status: "failed"; reason: string }
  | {
      status: "verified";
      match: boolean;
      /**
       * コピーのバイト数（打ち切りの上限・不足量を出すため。台帳にも残して後から診断できるようにする）。
       * **一致した台帳エントリを再利用したときだけ undefined**（バイト数を残す前に登録された
       * 古いエントリ。一致の報告にバイト数は要らないので、これを埋めるためだけに
       * 数百件を再ダウンロードしない）。不一致はバイト数が無ければ必ず再照合する。
       */
      bytes?: number;
      /** raw のバイト数（不一致の原因診断はコピー単独では付かず、原本との差で見る） */
      rawBytes?: number;
      /**
       * 不一致の型。`match: true` なら "match"。
       *   - `truncated` … MiB 境界ちょうど＝**確実な打ち切り**。私たちの raw が正しい
       *   - `partial`   … raw より小さいが境界ではない＝**不完全な捕捉が濃厚**（ただし断定しない）
       *   - `other`     … 小さくもない＝**別版**の疑い。--force で再登録
       */
      kind: "match" | "truncated" | "partial" | "other";
    };

const filenameOf = (url: string) => decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");
/** raw 側のバイト数（台帳のコピーと突き合わせて不一致の型を診断するため） */
const rawBytesOf = (sourceId: string, url: string) =>
  readRawMeta(sourceId)?.files.find((f) => f.filename === filenameOf(url))?.bytes;

/**
 * コピーが raw（私たちが parse した版）と同一バイト列かを sha256 で突合する（file のみ）。
 * Wayback の `id_` 付き URL は原本のバイト列をそのまま返す。
 * 上書き型 URL の古いスナップショットを現行版と誤認する事故を検出できる
 * （実例: 財政事情 01ipankaikei.pdf の 2024 年版スナップショット）。
 *
 * **「照合できなかった」を黙って握り潰さない** — raw が無い・取得に失敗したときは
 * `failed` を返して台帳に `sha256Verified: false` を残す（照合対象外の HTML＝`skipped` とは別物）。
 */
async function verifySnapshot(sourceId: string, url: string, timestamp: string): Promise<VerifyResult> {
  const filename = filenameOf(url);
  // HTML ページはテンプレート差（トークン・広告タグ等）で取得時刻によりバイト列が
  // 揺れるため sha 突合の対象外（静的ファイルのみ検証する）＝設計どおりの skipped
  if (!VERIFIABLE_RE.test(filename)) return { status: "skipped" };
  const meta = readRawMeta(sourceId);
  if (!meta) return { status: "failed", reason: "raw-meta が無い（未 fetch）" };
  const raw = meta.files.find((f) => f.filename === filename);
  if (!raw) return { status: "failed", reason: `raw に ${filename} が無い` };
  try {
    const res = await fetch(`https://web.archive.org/web/${timestamp}id_/${url}`, {
      headers: { "User-Agent": UA },
    });
    if (!res.ok) return { status: "failed", reason: `コピーの取得が ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    const match = createHash("sha256").update(buf).digest("hex") === raw.sha256;
    return {
      status: "verified",
      match,
      bytes: buf.length,
      rawBytes: raw.bytes,
      kind: classifyVerify(match, buf.length, raw.bytes),
    };
  } catch (e) {
    return { status: "failed", reason: `コピーの取得に失敗（${e instanceof Error ? e.message : String(e)}）` };
  }
}

// バイト数は**分かっているときだけ数字を出す**。undefined を 0 に潰すと
// 「0MiB で打ち切り」のような、それ自体が嘘の診断が出る（実際に一度出した）。
const fmtBytes = (n: number | undefined) => (n === undefined ? "不明" : `${n.toLocaleString("en-US")} bytes`);

/** 照合結果を人向けの1行にする（登録済み／登録完了の両方から呼ぶので文面を1か所に置く） */
function verifyNote(v: VerifyResult): string | null {
  if (v.status === "skipped") return null;
  if (v.status === "failed") return `⚠ sha256 を照合できなかった: ${v.reason}（台帳に sha256Verified: false を記録）`;
  const sizes = `コピー ${fmtBytes(v.bytes)}・原本 ${fmtBytes(v.rawBytes)}`;
  switch (v.kind) {
    case "match":
      return null;
    case "truncated":
      return `⚠ Wayback 側が MiB 境界（${v.bytes !== undefined ? `${v.bytes / MIB}MiB・` : ""}${sizes}）で打ち切っている。私たちの raw が正しい。--force で再登録しても同じ上限で切られる見込み`;
    case "partial":
      return `⚠ コピーが原本より小さい（${sizes}）。Wayback が最後まで返していない（MiB 境界ではないので打ち切りとは断定できない）。→ **まず時間を置いて再照合**（保存直後は取り込み中で途中までしか返らず、同じスナップショットが後で完全に取れることがある）。それでも変わらなければ古い版か不完全な捕捉なので --force を試す`;
    case "other":
      return `⚠ コピーが raw と不一致（${sizes}）。別版の可能性。--force で現行版を再登録してください`;
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
    const verify = async (timestamp: string, waybackUrl: string): Promise<VerifyResult> => {
      if (kind !== "file") return { status: "skipped" };
      // 同じスナップショットを照合済みなら台帳の記録を再利用する（再ダウンロードしない）。
      // ただし **不一致でバイト数が無いエントリは再照合する** — 診断（打ち切り／不完全／別版）が
      // バイト数に依存するため。一致しているエントリはバイト数が無くても再利用でよい
      // （一致の報告に要らない）。ここを分けないと、waybackBytes を足した初回の全実行で
      // **数百件の PDF を Wayback から再ダウンロード**することになる。
      const cacheable =
        prior?.waybackUrl === waybackUrl &&
        prior.sha256Match !== undefined &&
        (prior.sha256Match === true || prior.waybackBytes !== undefined);
      if (prior && cacheable) {
        const cachedKind = prior.sha256Match
          ? ("match" as const)
          : prior.waybackTruncated
            ? ("truncated" as const)
            : prior.waybackPartial
              ? ("partial" as const)
              : ("other" as const);
        return {
          status: "verified",
          match: prior.sha256Match!,
          bytes: prior.waybackBytes,
          rawBytes: rawBytesOf(source.id, url),
          kind: cachedKind,
        };
      }
      return await verifySnapshot(source.id, url, timestamp);
    };
    // 台帳へ書く判定。**「対象外（フィールド無し）」「照合できなかった（sha256Verified: false）」
    // 「照合した（sha256Match）」の3状態を潰さない**のがこの関数の仕事。
    const verdict = (v: VerifyResult) =>
      v.status === "skipped"
        ? {}
        : v.status === "failed"
          ? { sha256Verified: false }
          : {
              sha256Match: v.match,
              ...(v.bytes !== undefined ? { waybackBytes: v.bytes } : {}),
              ...(v.kind === "truncated" ? { waybackTruncated: true } : {}),
              ...(v.kind === "partial" ? { waybackPartial: true } : {}),
            };

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
      const note = verifyNote(match);
      if (note) console.log(`  ${note}`);
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
      // 登録直後の不一致は SPN 反映待ちで古い版を拾っただけのこともあるので、その線を添える
      const note = verifyNote(match);
      if (note) console.log(`  ${note}`);
      if (match.status === "verified" && !match.match && match.kind !== "truncated") {
        console.log(`  （登録直後なので SPN 反映待ちで古い版を拾った可能性もある。時間を置いて再実行）`);
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

// **台帳全体の健康診断**（2026-07-16）。件数の報告だけでは「魚拓はあるが中身を照合していない」
// エントリが見えない — 実際に**岡山 R2・R3・R4 が `waybackUrl` を持ちながら `sha256Match` が
// 一度も付いていなかった**（登録時に照合が走らず、以後「登録済み」として素通りしていた）。
// **魚拓は消えた資料の最後の砦**なので、「あるつもりで中身が違う」を放置しない。
// ここは対象を絞った実行でも**台帳全体**を見る（1件ずつ流しても全体の穴に気づけるように）。
{
  // ⚠ 対象は `verifySnapshot` が実際に照合する種別だけ（VERIFIABLE_RE を共有している理由は
  // 定数側のコメントを参照）。
  const files = final.filter((e) => e.kind === "file" && VERIFIABLE_RE.test(filenameOf(e.url)));
  // 未照合＝「照合できなかった（sha256Verified: false）」＋「一度も照合が走っていない
  // （フィールドごと無い）」。**どちらも「魚拓の中身を誰も見ていない」ことに変わりはない**ので
  // 同じ穴として出す（区別は台帳のフィールドが持つ）。
  const unverified = files.filter((e) => e.waybackUrl && e.sha256Match == null);
  const partial = files.filter((e) => e.waybackPartial);
  const mismatched = files.filter((e) => e.sha256Match === false && !e.waybackTruncated && !e.waybackPartial);
  if (unverified.length) {
    console.log(`\n⚠ 魚拓はあるが sha256 を照合していない原本: ${unverified.length} 件`);
    for (const e of unverified.slice(0, 10)) {
      const why = e.sha256Verified === false ? "照合を試みて失敗" : "照合が走っていない";
      console.log(`    ${e.sourceId} — ${e.url.split("/").pop()}（${why}）`);
    }
    if (unverified.length > 10) console.log(`    …他 ${unverified.length - 10} 件`);
    console.log(`  → 対象を指定して再実行すると照合されます（例: bun run pipeline:archive ${unverified[0]!.sourceId}）`);
  }
  if (partial.length) {
    console.log(`\n⚠ 魚拓が原本より小さい（打ち切りとは断定できない・§9b）: ${partial.length} 件`);
    for (const e of partial.slice(0, 10)) {
      console.log(`    ${e.sourceId} — ${e.url.split("/").pop()}（コピー ${fmtBytes(e.waybackBytes)}）`);
    }
    console.log(`  → まず時間を置いて再照合してください（保存直後は取り込み中で途中までしか返らず、`);
    console.log(`     同じスナップショットが後で完全に取れることがある — 江戸川 R8 の実例）`);
  }
  if (mismatched.length) {
    console.log(`\n⚠ 魚拓が raw と不一致（小さくもない＝別版の疑い・§9b）: ${mismatched.length} 件`);
    for (const e of mismatched.slice(0, 10)) console.log(`    ${e.sourceId} — ${e.url.split("/").pop()}`);
  }
}
if (failed > 0) process.exitCode = 1;
