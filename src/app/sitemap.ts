import { promises as fs } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { stateToPath } from "@/client/lib/routing";
import { PREF_CODES } from "@/client/lib/decision-index.gen";
import { MUNI_BUDGET_INDEX, BUDGET_MUNIS } from "@/client/lib/munibudgets.gen";
import { SITE_URL } from "@/client/lib/site";

/**
 * サイトマップ。**URL は必ず `stateToPath` に作らせる** — ここでパスを組み立て直すと、
 * ローマ字スラグの手当て（`kofu`・県エンティティの `ken`）や旧パスの正規化と二重管理になり、
 * サイトマップだけが 404 を指す状態が静かにできあがる。
 *
 * 収録が進めば `MUNI_BUDGET_INDEX` と決算シャードが増え、ここも黙って追随する（列挙を手書きしない）。
 *
 * ⚠ **クエリ（?fy= ?path= 等）は載せない** — 画面内の状態であって別ページではない。
 * ⚠ full 専用画面（/compare など）は甲府だけに出るので、一覧には自治体のトップだけを載せる。
 */

const st = (screen: string, pref: string | null, muni: string | null, muniCode?: string) =>
  stateToPath({ screen, pref, muni, muniCode, drillSide: "exp", drillPath: [], theme: null });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entry = (p: string, priority: number) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority });

  // 全体ページ
  const out: MetadataRoute.Sitemap = [
    entry("/", 1.0),
    entry(st("coverage", null, null), 0.8),
    entry(st("roadmap", null, null), 0.6),
    entry(st("sources", null, null), 0.6),
  ];

  // 都道府県の市区町村選択（47）
  for (const pref of Object.keys(PREF_CODES)) out.push(entry(st("muni", pref, null), 0.7));

  // 予算資料まで収録した団体（full の甲府 + budget の全エンティティ）＝このサイトの深いページ
  const recorded = new Set<string>(["192015"]);
  out.push(entry(st("dash", "山梨県", "甲府市", "192015"), 0.9));
  for (const code of BUDGET_MUNIS) {
    const b = MUNI_BUDGET_INDEX[code];
    if (!b) continue;
    recorded.add(code);
    out.push(entry(st("dash", b.prefName, b.muniName, code), 0.9));
  }

  // 決算ベースで閲覧できる全市町村。**このサイトの本体はここ**（全1,741団体が実データで見られる）
  // ので、サイトマップから落とすと99%が発見されない。
  // ⚠ decision の本文はクライアントで県シャードを取ってから描くので、JS を実行しない
  //    クローラには見出しとタイトルしか見えない。タイトルは generateMetadata が
  //    サーバー側で解決している（page.tsx の resolveDecisionName）。
  for (const [pref, code2] of Object.entries(PREF_CODES)) {
    let shard: { munis?: Record<string, { name: string }> };
    try {
      shard = JSON.parse(await fs.readFile(path.join(process.cwd(), "public", "decision", `${code2}.json`), "utf8"));
    } catch {
      continue; // シャードが無い県は静かに飛ばす（derive 前のビルドでも壊さない）
    }
    for (const [code, m] of Object.entries(shard.munis ?? {})) {
      if (recorded.has(code)) continue; // 収録済みは上で priority を上げて入れてある
      out.push(entry(st("dash", pref, m.name, code), 0.5));
    }
  }

  return out;
}
