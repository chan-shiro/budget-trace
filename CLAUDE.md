# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# はじめに

このリポジトリ（または新しいセッション）が初めてなら、本書の次に [docs/handoff.md](docs/handoff.md) を読むこと — 全体像・主要な決定事項の経緯・横断的な暗黙知・現在の状態・残タスクを集約している。

# プロジェクト概要

**予算トレース** — 地方自治体の予算（歳入・歳出）から補正・執行率・支出先・事業報告までを一次資料（エビデンス）付きでたどれる可視化サイト。甲府市の令和8年度当初予算をサンプル収録している。

- Claude Design のプロトタイプ（`project/予算トレース.dc.html`）を Next.js に本実装したもの。`project/` と `chats/` は**元デザインと会話ログの参照用アーカイブ**であり、編集・import しない（`tsconfig.json` でも除外済み）。
- **データの来歴ルール**: アプリに載せる数値は**すべて一次資料由来の実データのみ**（款別歳入歳出・前年度額・主な事業83件は甲府市 R8 当初予算案資料、人口・類似自治体比較は総務省 R6 決算状況調）。ダミー・推計値は置かない（2026-07-12 に全ダミーを排除済み）。一次資料が無い機能（項以下の内訳・補正・執行率・事業詳細など）は実装せず「未収録」とし、資料を収録してから追加する。

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
bun run pipeline:archive [sourceId] [--force]   # Wayback Machine へ登録（魚拓台帳 data/archives.json）
```

- テストランナーは未導入。サーバー層を導入するときに Vitest + Testcontainers を [docs/architecture.md](docs/architecture.md) の方針で入れる。
- 地図形状データは `public/mapdata/` に同梱済み（都道府県 SVG + 全47都道府県の市区町村 GeoJSON）。**CDN からの実行時フェッチに戻さない**（オフライン動作・サンドボックス動作のため）。

# 現在の構成（ビッグピクチャー）

現状は**サーバーレスの UI プロトタイプ**。画面遷移はコンポーネント内 state（`st.screen`）で管理しつつ、**パスベースの実URL**に同期する（`/山梨県/甲府市/compare` など。ディープリンク・共有・戻る/進む対応）。全パスは catch-all ルート `src/app/[[...slug]]/page.tsx` が受け、`src/client/lib/routing.ts` の `pathToState` でサーバ側から初期 state を解決して `BudgetTrace` に渡す（共有リンクでも初回からその画面が出る＝トップのチラつき無し）。画面内の細かな状態（年度・ドリル位置・単位）はクエリに載せる。full/budget 自治体は団体コードを静的解決、decision 自治体は名前だけをパスに載せ県シャード取得後に後解決。ディレクトリは [docs/architecture.md](docs/architecture.md) の `src/` レイアウトへ移行済み（`src/server/` `src/shared/` `src/test/` はスケルトンのみ）。

**カバレッジ階層**: 自治体は3階層（`D.tierOf` が `'full'|'budget'|'decision'`）。**full**（甲府市のみ・予算＋主な事業/執行/評価/補正）、**budget**（類似4市・当初予算の款別＋前年当初比較・`munibudgets.gen.ts`）、**decision**（全1,741市町村・総務省決算ベース）。判定は団体コード（`FULL_MUNIS`／`BUDGET_MUNIS`）。decision は款別歳出（→項）・歳入科目（→内訳）・1人あたり・財政指標・類似比較・決算経年まで。full 専用画面（主な事業・執行・評価・補正）は budget/decision では出さずリクエストチップにする（前年比較は full+budget）。詳細・配信モデルは [docs/data-strategy.md](docs/data-strategy.md)。

- `src/client/components/BudgetTrace.tsx` — アプリ本体。全 state と算出ロジック（プロトタイプの `renderVals` 相当）。年度スケール・補正反映・1人あたり換算・ドリルダウン木の解決などは**すべてここで計算し、描画用の値オブジェクト `v` にまとめて**渡す。tier（full/decision）でデータ源を差し替え（full=`kofu.gen` 等の静的 import、decision=`useDecisionData` で県シャードをフェッチ→`buildDecisionView`）、full 専用画面・ドリル拡張は `isDecision` でゲートする。
- `src/client/lib/decision.ts` / `src/client/hooks/useDecisionData.ts` / `src/client/lib/decision-index.gen.ts` — decision 階層。`useDecisionData(県コード)` が `public/decision/<県コード2桁>.json`（総務省決算の県シャード・選択時フェッチ・モジュールキャッシュ）を取得し、`buildDecisionView` がダッシュボード/ドリルの表示シェイプ（`BudgetNode` 互換）に変換する。索引・PREF_CODES・出典メタは `decision-index.gen.ts`（`bun run pipeline:derive` で再生成）。
- `src/client/components/BudgetTraceView.tsx` — 全画面（トップ / 市区町村選択 / ダッシュボード / 款別ドリルダウン / 前年比較 / 政策テーマ / 類似自治体 / 出典）の JSX。ロジックを持たない。
- `src/client/lib/data.ts` — 実データ生成モジュール（`kofu.gen.ts` / `projects.gen.ts` / `similar.gen.ts` / `decision-index.gen.ts`、`bun run pipeline:derive` で再生成）の re-export と整形関数（`fmtOku` / `fmtPerCap` / `donutBg` 等）、階層判定（`tierOf` / `prefCodeOf`）。チャート色 `PALETTE` は**モジュール変数を `setPalette()` で切り替える**方式なので、描画前に呼ばれる順序に注意。サーバー層導入時に型→`src/shared/`、データ→ API へ分割する。
- `src/client/components/JapanMap.tsx` — 日本地図（地域→都道府県→市区町村ズーム、島しょ部の別枠、エリアズーム、フリーワード検索）。SVG を直接 DOM 操作する React 管理外領域があるため、変更時は `boxRef` 配下と React 描画の境界を崩さないこと。
- `src/client/components/ui.tsx` — `S()`（CSS 文字列→style オブジェクト。プロトタイプの inline style を逐語移植するためのヘルパ）、`HoverBox`（style-hover 相当）、`CountUpNum`（数値カウントアップ）。既存画面のスタイルは `S("...")` の文字列を**プロトタイプと diff 可能な形で維持**する。
- `src/app/globals.css` — inline style では書けない media query を `data-mq="..."` 属性で上書きするモバイル最適化。新しいグリッド行を足すときは対応する `data-mq` ルールも確認する。

# データパイプライン

一次資料は `pipeline/`（バッチ）で **sources（台帳）→ raw（不変・原本コミット・ハッシュ来歴）→ parsed（locator 付き抽出）→ normalized（団体コード・標準科目で比較可能化）→ gen（アプリ用断面）** の層で扱う（メダリオンの Bronze/Silver/Gold に相当）。**各資料の取得手順・構造のクセは [docs/data-sources.md](docs/data-sources.md)** に記録してあり、資料を追加・更新したら必ず追記する。多自治体への展開方針（3層戦略）は [docs/data-strategy.md](docs/data-strategy.md)。規約は [docs/architecture.md](docs/architecture.md) §10。特に: 検証ゲート（`needs_review` を normalize に通さない）、フィクスチャ隔離（`data/normalized/_fixtures/` をアプリから import しない）、未知の科目を黙って「その他」に寄せない。

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

**このプロジェクトの既存デザインを尊重する**（専用のデザインシステム文書は置かない。実装が仕様）。UI を追加・変更するときは既存画面の視覚言語に合わせること: IBM Plex Sans JP + IBM Plex Mono、白カード + `#DFE7EC` ボーダー、アクセント `#1798D0`、チャートは `PALETTE`（Okabe-Ito ベースの色覚多様性対応・`src/client/lib/data.ts`）以外の系列色を新設しない。**数値は必ず IBM Plex Mono**、金額整形は `fmtOku` / `fmtPerCap` を再利用する。出典チップ（エビデンス）を伴わない数値表示を新設しない。**エビデンス3層コピーの原則**（[docs/data-strategy.md](docs/data-strategy.md) に正式ルール）: 一次資料は ①git raw ②Wayback ③自サーバー配信（`public/sources/`）の3つの写しを持ち、**画面のリンクは常に③をドロワーで開く**（PDF=PdfViewer、HTML=サンドボックス iframe、Excel=ダウンロードカード）。発行元・Wayback への直リンクを主リンクにしない — 両者はドロワー内の補助リンク。新しい資料を収録したら fetch → `pipeline:archive`（即時）→ sync（自動）の順で3層を揃える。アニメーションは `prefers-reduced-motion` に対応させる。

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
