# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# はじめに

このリポジトリ（または新しいセッション）が初めてなら、本書の次に [docs/handoff.md](docs/handoff.md) を読むこと — 全体像・主要な決定事項の経緯・横断的な暗黙知・現在の状態・残タスクを集約している。

# プロジェクト概要

**予算トレース** — 地方自治体の予算（歳入・歳出）から補正・執行率・支出先・事業報告までを一次資料（エビデンス）付きでたどれる可視化サイト。甲府市の令和8年度当初予算をサンプル収録している。

- Claude Design のプロトタイプ（`project/予算トレース.dc.html`）を Next.js に本実装したもの。`project/` と `chats/` は**元デザインと会話ログの参照用アーカイブ**であり、編集・import しない（`tsconfig.json` でも除外済み）。
- **データの来歴ルール**: 款レベルの金額は甲府市公表の実データ、項以下・補正・執行率・議会の会派別賛否などは推計・ダミー。画面上の「ダミー」「推計」の注記は仕様であり、データを触るときは注記との整合を必ず保つこと。

# コマンド

パッケージマネージャは **bun**（lockfile は `bun.lock`）。npm / yarn / pnpm を使わず、`package-lock.json` を生成しないこと。

```bash
bun install        # 依存インストール
bun run dev        # 開発サーバ (http://localhost:3000)
bun run build      # 本番ビルド（型チェック込み）
bun run start      # 本番サーバ
bun run typecheck  # tsc --noEmit

# データパイプライン（一次資料の収集。詳細は docs/architecture.md §10）
bun run pipeline:fetch [sourceId]               # レジストリのURLから raw を取得
bun run pipeline:ingest <sourceId> <file>       # 手動取得ファイルの投入
bun run pipeline:parse <sourceId>               # raw → parsed（locator 付き抽出）
bun run pipeline:validate <sourceId>            # 整合チェック（検証ゲート）
bun run pipeline:normalize <sourceId> [--force] # parsed → normalized（比較可能化）
bun run pipeline:fixture                        # e2e 検証用フィクスチャ生成
bun run pipeline:derive                         # normalized → アプリ用生成モジュール（similar.gen.ts）
```

- テストランナーは未導入。サーバー層を導入するときに Vitest + Testcontainers を [docs/architecture.md](docs/architecture.md) の方針で入れる。
- 地図形状データは `public/mapdata/` に同梱済み（都道府県 SVG + 全47都道府県の市区町村 GeoJSON）。**CDN からの実行時フェッチに戻さない**（オフライン動作・サンドボックス動作のため）。

# 現在の構成（ビッグピクチャー）

現状は**サーバーレスの UI プロトタイプ**。画面遷移は URL ではなくコンポーネント内 state（`st.screen`）で管理する SPA で、プロトタイプの挙動を忠実に再現している。ディレクトリは [docs/architecture.md](docs/architecture.md) の `src/` レイアウトへ移行済み（`src/server/` `src/shared/` `src/test/` はスケルトンのみ）。

- `src/client/components/BudgetTrace.tsx` — アプリ本体。全 state と算出ロジック（プロトタイプの `renderVals` 相当）。年度スケール・補正反映・1人あたり換算・ドリルダウン木の解決などは**すべてここで計算し、描画用の値オブジェクト `v` にまとめて**渡す。
- `src/client/components/BudgetTraceView.tsx` — 全画面（トップ / 市区町村選択 / ダッシュボード / 款項目節ドリルダウン / 前年比較 / 政策テーマ / 事業詳細 / 過年度実績 / 類似自治体 / 基本情報 / 出典）の JSX。ロジックを持たない。
- `src/client/lib/data.ts` — 予算・事業・テーマ・基本情報などの全データと整形関数（`fmtOku` / `fmtPerCap` / `donutBg` / `synthChildren` 等）。チャート色 `PALETTE` は**モジュール変数を `setPalette()` で切り替える**方式なので、描画前に呼ばれる順序に注意。サーバー層導入時に型→`src/shared/`、データ→seed / fixture へ分割する。
- `src/client/components/JapanMap.tsx` — 日本地図（地域→都道府県→市区町村ズーム、島しょ部の別枠、エリアズーム、フリーワード検索）。SVG を直接 DOM 操作する React 管理外領域があるため、変更時は `boxRef` 配下と React 描画の境界を崩さないこと。
- `src/client/components/ui.tsx` — `S()`（CSS 文字列→style オブジェクト。プロトタイプの inline style を逐語移植するためのヘルパ）、`HoverBox`（style-hover 相当）、`CountUpNum`（数値カウントアップ）。既存画面のスタイルは `S("...")` の文字列を**プロトタイプと diff 可能な形で維持**する。
- `src/app/globals.css` — inline style では書けない media query を `data-mq="..."` 属性で上書きするモバイル最適化。新しいグリッド行を足すときは対応する `data-mq` ルールも確認する。

# データパイプライン

一次資料は `pipeline/`（バッチ）で **sources（台帳）→ raw（不変・原本コミット・ハッシュ来歴）→ parsed（locator 付き抽出）→ normalized（団体コード・標準科目で比較可能化）** の4層で扱う。規約は [docs/architecture.md](docs/architecture.md) §10。特に: 検証ゲート（`needs_review` を normalize に通さない）、フィクスチャ隔離（`data/normalized/_fixtures/` をアプリから import しない）、未知の科目を黙って「その他」に寄せない。

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

**このプロジェクトの既存デザインを尊重する**（専用のデザインシステム文書は置かない。実装が仕様）。UI を追加・変更するときは既存画面の視覚言語に合わせること: IBM Plex Sans JP + IBM Plex Mono、白カード + `#DFE7EC` ボーダー、アクセント `#1798D0`、チャートは `PALETTE`（Okabe-Ito ベースの色覚多様性対応・`src/client/lib/data.ts`）以外の系列色を新設しない。**数値は必ず IBM Plex Mono**、金額整形は `fmtOku` / `fmtPerCap` を再利用する。出典チップ（エビデンス）を伴わない数値表示を新設しない。アニメーションは `prefers-reduced-motion` に対応させる。

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

**Vercel（構築済み）**。チーム `philosophyhouse` のプロジェクト `budget-trace`。GitHub 連携済みで、`main` への push で本番へ自動デプロイされる（PR は Preview デプロイ）。本番 URL: https://budget-trace-tawny.vercel.app 。ビルド設定はデフォルトの Next.js プリセット + bun（`bun.lock` 自動検出）。環境変数は現状不要。CLI 操作は `bunx vercel`（`.vercel/` と `.env*` は gitignore）。
