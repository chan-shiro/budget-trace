import type { Metadata } from "next";
import BudgetTrace from "@/client/components/BudgetTrace";
import { pathToState, pageTitle } from "@/client/lib/routing";

// パスベースのルーティング。全パスをここで受け、サーバ側で初期 state を解決して
// BudgetTrace に渡す（初回描画から正しい画面＝共有リンクでもトップがチラつかない）。
// public/ の静的ファイル（/sources/... /mapdata/... /decision/...）は Next が
// このルートより優先して配信するため衝突しない。
// Next 15 以降 params / searchParams は Promise なので await して使う。

type Params = { slug?: string[] };
type Search = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = pathToState(slug ?? [], {});
  return { title: pageTitle(state) };
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
  return <BudgetTrace initial={initial} />;
}
