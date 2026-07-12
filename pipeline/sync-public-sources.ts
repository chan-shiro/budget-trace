// data/raw の一次資料 PDF を public/sources/<sourceId>/ へ同期する（dev / build の前段）。
// アプリのエビデンスリンクは自サーバーのこのコピーを開く（ドロワーでその場レビュー）。
// - コピー元は git にコミット済みの raw（sha256 で来歴固定）なので、public 側は
//   生成物として gitignore し、二重コミットしない
// - PDF・HTML・Excel を同期する（PDF はドロワーで描画、HTML はサンドボックス iframe、
//   Excel はコピーのダウンロード。エビデンスの主リンクは常に自サーバーのコピー）
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const RAW_DIR = join(process.cwd(), "data", "raw");
const OUT_DIR = join(process.cwd(), "public", "sources");

rmSync(OUT_DIR, { recursive: true, force: true });

let count = 0;
if (existsSync(RAW_DIR)) {
  for (const sourceId of readdirSync(RAW_DIR)) {
    const srcDir = join(RAW_DIR, sourceId);
    if (!statSync(srcDir).isDirectory() || sourceId.startsWith("fixture-")) continue;
    for (const filename of readdirSync(srcDir)) {
      if (!/\.(pdf|html?|xlsx?|csv)$/i.test(filename)) continue;
      mkdirSync(join(OUT_DIR, sourceId), { recursive: true });
      copyFileSync(join(srcDir, filename), join(OUT_DIR, sourceId, filename));
      count++;
    }
  }
}
console.log(`✓ 一次資料を public/sources へ同期（${count} ファイル）`);

// PDF.js のワーカーも public へ同梱する（ドロワーの PDF ビューア用。
// iframe のブラウザ内蔵ビューアは Safari で1ページ目しか描画されないため、
// PDF.js でアプリ内描画する。CDN からはフェッチしない — オフライン方針）
const WORKER_SRC = join(process.cwd(), "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const WORKER_OUT = join(process.cwd(), "public", "vendor", "pdf.worker.min.mjs");
mkdirSync(join(process.cwd(), "public", "vendor"), { recursive: true });
copyFileSync(WORKER_SRC, WORKER_OUT);
console.log("✓ PDF.js ワーカーを public/vendor へ同期");
