// data/raw の一次資料 PDF を public/sources/<sourceId>/ へ同期する（dev / build の前段）。
// アプリのエビデンスリンクは自サーバーのこのコピーを開く（ドロワーでその場レビュー）。
// - コピー元は git にコミット済みの raw（sha256 で来歴固定）なので、public 側は
//   生成物として gitignore し、二重コミットしない
// - PDF のみ同期する（xlsx はブラウザ内プレビュー不可のため対象外）
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const RAW_DIR = join(process.cwd(), "data", "raw");
const OUT_DIR = join(process.cwd(), "public", "sources");

rmSync(OUT_DIR, { recursive: true, force: true });

let count = 0;
if (existsSync(RAW_DIR)) {
  for (const sourceId of readdirSync(RAW_DIR)) {
    const srcDir = join(RAW_DIR, sourceId);
    if (!statSync(srcDir).isDirectory()) continue;
    for (const filename of readdirSync(srcDir)) {
      if (!filename.toLowerCase().endsWith(".pdf")) continue;
      mkdirSync(join(OUT_DIR, sourceId), { recursive: true });
      copyFileSync(join(srcDir, filename), join(OUT_DIR, sourceId, filename));
      count++;
    }
  }
}
console.log(`✓ 一次資料 PDF を public/sources へ同期（${count} ファイル）`);
