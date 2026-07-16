import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import BudgetTrace from "@/client/components/BudgetTrace";
import { pathToState, pageTitle } from "@/client/lib/routing";
import { PREF_CODES } from "@/client/lib/decision-index.gen";

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
  return { title: pageTitle({ ...state, muni }) };
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
