import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import BudgetTrace from "@/client/components/BudgetTrace";
import { pathToState, pageTitle, stateToPath } from "@/client/lib/routing";
import { PREF_CODES } from "@/client/lib/decision-index.gen";
import { SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/client/lib/site";

// パスベースのルーティング。全パスをここで受け、サーバ側で初期 state を解決して
// BudgetTrace に渡す（初回描画から正しい画面＝共有リンクでもトップがチラつかない）。
// public/ の静的ファイル（/sources/... /mapdata/... /decision/...）は Next が
// このルートより優先して配信するため衝突しない。
// Next 15 以降 params / searchParams は Promise なので await して使う。

type Params = { slug?: string[] };
type Search = Record<string, string | string[] | undefined>;

// decision 自治体（/nagano/202011 のような団体コードパス）の名前は、クライアントでは
// 県シャード取得後にしか分からず、タイトルが「予算ダッシュボード」のままになる。
// サーバー側では同じシャード（public/decision/<県コード>.json）を fs で読めるので、
// メタデータ生成時に名前だけ引いてタイトルへ入れる（本文の解決は従来どおりクライアント）。
async function resolveDecisionName(pref: string | null, muniCode: string | undefined): Promise<string | null> {
  if (!pref || !muniCode) return null;
  const prefCode = PREF_CODES[pref];
  if (!prefCode) return null;
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "public", "decision", `${prefCode}.json`), "utf8");
    return (JSON.parse(raw).munis?.[muniCode]?.name as string | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = pathToState(slug ?? [], {});
  const muni = state.muni ?? (await resolveDecisionName(state.pref, state.muniCode));
  const title = pageTitle({ ...state, muni });
  // 共有されるのは自治体ページなので、OGP のタイトルも画面ごとに変える
  // （og:title が無いと、どのリンクを貼っても同じカードになる）。
  // description・画像はトップと共通（画面ごとの説明文を手書きすると必ず実態とズレる）。
  //
  // canonical は**パスを正規化してから**入れる。旧・日本語パス（/山梨県/甲府市）や
  // クエリ違いで来ても、正典は1本（stateToPath がローマ字スラグへ寄せる）。
  // ⚠ クエリ（?fy= ?path= 等）は画面内の状態なので canonical には載せない。
  const canonical = stateToPath({ ...state, muni }).split("?")[0]!;
  // ⚠ **画像もここで明示する** — Next は openGraph / twitter を**フィールド単位でなく
  // オブジェクトごと**子で置き換えるので、layout 側の images が丸ごと落ちる（実測した）。
  return {
    title,
    alternates: { canonical },
    openGraph: {
      title, description: SITE_DESCRIPTION, url: canonical,
      siteName: SITE_NAME, type: "website", locale: "ja_JP", images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description: SITE_DESCRIPTION, images: [OG_IMAGE.url] },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const initial = pathToState(slug ?? [], query ?? {});
  // 同意バナーを出す環境か（layout の gtmEnabled と同じ判定）。フッターの「Cookie 設定」は
  // バナーが在るときだけ出す — 無い環境では押しても何も起きないボタンになるため
  return <BudgetTrace initial={initial} consentEnabled={process.env.VERCEL_ENV === "production"} />;
}
