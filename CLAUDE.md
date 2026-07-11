# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# プロジェクト概要

**予算トレース** — 地方自治体の予算（歳入・歳出）から補正・執行率・支出先・事業報告までを一次資料（エビデンス）付きでたどれる可視化サイト。甲府市の令和8年度当初予算をサンプル収録している。

- Claude Design のプロトタイプ（`project/予算トレース.dc.html`）を Next.js に本実装したもの。`project/` と `chats/` は**元デザインと会話ログの参照用アーカイブ**であり、編集・import しない（`tsconfig.json` でも除外済み）。
- **データの来歴ルール**: 款レベルの金額は甲府市公表の実データ、項以下・補正・執行率・議会の会派別賛否などは推計・ダミー。画面上の「ダミー」「推計」の注記は仕様であり、データを触るときは注記との整合を必ず保つこと。

# コマンド

```bash
npm run dev        # 開発サーバ (http://localhost:3000)
npm run build      # 本番ビルド（型チェック込み）
npm run start      # 本番サーバ
npm run typecheck  # tsc --noEmit
```

- テストランナーは未導入。サーバー層を導入するときに Vitest + Testcontainers を [docs/architecture.md](docs/architecture.md) の方針で入れる。
- 地図形状データは `public/mapdata/` に同梱済み（都道府県 SVG + 全47都道府県の市区町村 GeoJSON）。**CDN からの実行時フェッチに戻さない**（オフライン動作・サンドボックス動作のため）。

# 現在の構成（ビッグピクチャー）

現状は**サーバーレスの UI プロトタイプ**。画面遷移は URL ではなくコンポーネント内 state（`st.screen`）で管理する SPA で、プロトタイプの挙動を忠実に再現している。

- `components/BudgetTrace.tsx` — アプリ本体。全 state と算出ロジック（プロトタイプの `renderVals` 相当）。年度スケール・補正反映・1人あたり換算・ドリルダウン木の解決などは**すべてここで計算し、描画用の値オブジェクト `v` にまとめて**渡す。
- `components/BudgetTraceView.tsx` — 全画面（トップ / 市区町村選択 / ダッシュボード / 款項目節ドリルダウン / 前年比較 / 政策テーマ / 事業詳細 / 過年度実績 / 類似自治体 / 基本情報 / 出典）の JSX。ロジックを持たない。
- `lib/data.ts` — 予算・事業・テーマ・基本情報などの全データと整形関数（`fmtOku` / `fmtPerCap` / `donutBg` / `synthChildren` 等）。チャート色 `PALETTE` は**モジュール変数を `setPalette()` で切り替える**方式なので、描画前に呼ばれる順序に注意。
- `components/JapanMap.tsx` — 日本地図（地域→都道府県→市区町村ズーム、島しょ部の別枠、エリアズーム、フリーワード検索）。SVG を直接 DOM 操作する React 管理外領域があるため、変更時は `boxRef` 配下と React 描画の境界を崩さないこと。
- `components/ui.tsx` — `S()`（CSS 文字列→style オブジェクト。プロトタイプの inline style を逐語移植するためのヘルパ）、`HoverBox`（style-hover 相当）、`CountUpNum`（数値カウントアップ）。既存画面のスタイルは `S("...")` の文字列を**プロトタイプと diff 可能な形で維持**する。
- `app/globals.css` — inline style では書けない media query を `data-mq="..."` 属性で上書きするモバイル最適化。新しいグリッド行を足すときは対応する `data-mq` ルールも確認する。

# アーキテクチャ規約

サーバーサイド（実データ取込・複数自治体対応・認証など）を書き始める前に、必ず [docs/architecture.md](docs/architecture.md) を読むこと。要点（non-negotiables）:

- Next.js は UI + Route Handler のみ。サーバーは **Hono** を `app/api/[[...route]]/route.ts` にマウントする。
- クライアント⇄サーバー通信は **Hono RPC**（`hc<AppType>`）。クライアントから `fetch` を直接呼ばず、`src/client/hooks/` の **React Query** フック経由。
- バックエンドは `src/server/domains/[domain]/` に置き、`interface.ts` / `repository.ts` / `service.ts` / `route.ts` の4ファイル構成。`interface.ts` は具体実装（DB / Hono / Inversify / SDK）を import しない。
- DI は **Inversify**。コンテナ外で Service / Repository を `new` しない。
- 認可は route で **CASL**（`ability.can(...)`）。Service は認可を知らない。
- `any` 禁止。`unknown` で受けて絞り込む。
- DB は全環境 **PostgreSQL**。Repository を触るテストは **Testcontainers** の実 Postgres で走らせる（モック不可）。

# UI デザイン

UI を追加・変更する前に [docs/design-system.md](docs/design-system.md) を読むこと。IBM Plex Sans JP + IBM Plex Mono、白カード + `#DFE7EC` ボーダー、アクセント `#1798D0`、チャートは Okabe-Ito ベースの色覚多様性対応パレット。**数値は必ず IBM Plex Mono**、金額整形は `fmtOku` / `fmtPerCap` を再利用する。出典チップ（エビデンス）を伴わない数値表示を新設しない。

## Enter キーは IME 変換確定を無視する

日本語ファーストのアプリなので、`Enter` で動作する **すべての** `onKeyDown`（検索確定・フォーム送信・ダイアログ確定）は、IME（漢字変換）の確定 Enter で発火してはならない。ハンドラ先頭でガードする:

```ts
onKeyDown={(e) => {
  // IME 変換確定の Enter (isComposing / keyCode 229) では発火しない。
  if (e.nativeEvent.isComposing || e.keyCode === 229) return;
  if (e.key === "Enter" /* && modifiers… */) { e.preventDefault(); doThing(); }
}}
```

`isComposing` が現行ブラウザ、`keyCode === 229` が古い実装のカバーで、両方のチェックが意図的。現状 Enter ハンドラは存在しない（地図検索は入力即時フィルタ）が、追加する場合は必ずこの形にする。

# デプロイ

未構築。方針と初期構築手順の雛形は [docs/deploy.md](docs/deploy.md)（Cloud Run + Terraform + GitHub Actions / WIF）。
