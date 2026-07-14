import type { Metadata } from "next";
import BudgetTrace from "@/client/components/BudgetTrace";
import { pathToState, pageTitle } from "@/client/lib/routing";

// パスベースのルーティング。全パスをここで受け、サーバ側で初期 state を解決して
// BudgetTrace に渡す（初回描画から正しい画面＝共有リンクでもトップがチラつかない）。
// public/ の静的ファイル（/sources/... /mapdata/... /decision/...）は Next が
// このルートより優先して配信するため衝突しない。

type Params = { slug?: string[] };
type Search = Record<string, string | string[] | undefined>;

export function generateMetadata({
  params,
}: {
  params: Params;
  searchParams: Search;
}): Metadata {
  const state = pathToState(params.slug ?? [], {});
  return { title: pageTitle(state) };
}

export default function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const initial = pathToState(params.slug ?? [], searchParams ?? {});
  return <BudgetTrace initial={initial} />;
}
