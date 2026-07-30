import type { MetadataRoute } from "next";
import { SITE_URL } from "@/client/lib/site";

/**
 * 公開サイトなので全体をクロール可にする。
 * ⚠ **`/sources/` は除外する** — エビデンスの原本コピー（PDF・HTML・Excel）を配信している
 * ディレクトリで、発行元の資料そのものが検索結果に載ると**発行元より上位に出かねない**。
 * 資料への導線は `/sources`（一覧ページ・スラッシュ無し）と各画面のドロワーで足りる。
 * 同じ理由で、配信用に生成した大きな JSON（決算シャード等）もクロールさせない。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sources/", "/decision/", "/reports/", "/mapdata/", "/vendor/", "/coverage.json"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
