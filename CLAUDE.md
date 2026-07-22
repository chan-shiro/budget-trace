# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# はじめに

このリポジトリ（または新しいセッション）が初めてなら、本書の次に [docs/handoff.md](docs/handoff.md) を読むこと — 全体像・主要な決定事項の経緯・横断的な暗黙知・現在の状態・残タスクを集約している。

# プロジェクト概要

**予算トレース** — 地方自治体の予算（歳入・歳出）から補正・執行率・支出先・事業報告までを一次資料（エビデンス）付きでたどれる可視化サイト。甲府市の令和8年度当初予算をサンプル収録している。

- Claude Design のプロトタイプ（`project/予算トレース.dc.html`）を Next.js に本実装したもの。`project/` は**元デザインの参照用アーカイブ**であり、編集・import しない（`tsconfig.json` でも除外済み）。プロトタイプ時代の会話ログ `chats/` は 2026-07-18 に追跡から外した（必要なら git 履歴にある）。
- **データの来歴ルール**: アプリに載せる数値は**すべて一次資料由来の実データのみ**（款別歳入歳出・前年度額・主な事業83件は甲府市 R8 当初予算案資料、人口・類似自治体比較は総務省 R6 決算状況調）。ダミー・推計値は置かない（2026-07-12 に全ダミーを排除済み）。一次資料が無い機能（項以下の内訳・補正・執行率・事業詳細など）は実装せず「未収録」とし、資料を収録してから追加する。

# コマンド

パッケージマネージャは **bun**（lockfile は `bun.lock`）。npm / yarn / pnpm を使わず、`package-lock.json` を生成しないこと。

**依存の約束事**（2026-07-14 に Next 16 + React 19 へ更新。`bun audit` は 0 件を維持する）:
- **Excel を読むパーサは `import * as XLSX from "../lib/xlsx"`**（`"xlsx"` を直接 import しない）。SheetJS は
  0.18.5 を最後に npm 公開を停止しており、脆弱性修正済みの版を**公式 CDN から devDependency として**入れている。
  その ESM ビルドは `readFile`/`writeFile` が fs を自動で掴まないため、`pipeline/lib/xlsx.ts` で一度だけ
  `set_fs` して re-export している。直接 import すると "Cannot access file …" で落ちる。
- `postcss` は Next が 8.4.31 を固定するが脆弱性があるため package.json の `overrides` で 8.x 最新へ上げている。
- React 19 でグローバル `JSX` 名前空間が廃止 → `React.JSX.IntrinsicElements` を使う。
- Next 15 以降 **`params` / `searchParams` は Promise** → catch-all ルートでは `await` してから使う。

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
bun run pipeline:try-parse <parser> <file...> --opts '<JSON>'  # registry を触らずパーサを試す（偵察用ドライラン）
bun run pipeline:validate <sourceId>            # 整合チェック（検証ゲート）
bun run pipeline:normalize <sourceId> [--force] # parsed → normalized（比較可能化）
bun run pipeline:fixture                        # e2e 検証用フィクスチャ生成
bun run pipeline:derive                         # normalized → アプリ用生成モジュール（*.gen.ts）＋ public/ の静的 JSON
bun run pipeline:archive [sourceId] [--force]   # Wayback Machine へ登録（魚拓台帳 data/archives.json）
```

- テストランナーは未導入。サーバー層を導入するときに Vitest + Testcontainers を [docs/architecture.md](docs/architecture.md) の方針で入れる。
- 地図形状データは `public/mapdata/` に同梱済み（都道府県 SVG + 全47都道府県の市区町村 GeoJSON）。**CDN からの実行時フェッチに戻さない**（オフライン動作・サンドボックス動作のため）。

# 現在の構成（ビッグピクチャー）

現状は**サーバーレスの UI プロトタイプ**。画面遷移はコンポーネント内 state（`st.screen`）で管理しつつ、**パスベースの ASCII 実URL**に同期する（`/yamanashi/kofu/compare` など。ディープリンク・共有・戻る/進む対応）。全パスは catch-all ルート `src/app/[[...slug]]/page.tsx` が受け、`src/client/lib/routing.ts` の `pathToState` でサーバ側から初期 state を解決して `BudgetTrace` に渡す（共有リンクでも初回からその画面が出る＝トップのチラつき無し）。**URL は視認性のため ASCII**: 都道府県は定型ローマ字（`yamanashi`）、収録済み自治体（full/budget）は手当てしたローマ字スラグ（`kofu`・`fuefuki`・県エンティティは `ken`）、読みデータの無い decision 自治体は団体コード（`/nagano/202011`）。旧・日本語パス（`/山梨県/甲府市`）も後方互換で受け、ローマ字へ自動正規化する。画面内の細かな状態（年度・ドリル位置・単位）はクエリに載せる。decision 自治体はコード↔名前を県シャード取得後に相互解決。ディレクトリは [docs/architecture.md](docs/architecture.md) の `src/` レイアウトへ移行済み（`src/server/` `src/shared/` `src/test/` はスケルトンのみ）。

**カバレッジ階層**: 自治体は3階層（`D.tierOf` が `'full'|'budget'|'decision'`）。**full**（甲府市のみ・予算＋主な事業/執行/評価/補正）、**budget**（18エンティティ＝政令市5＋類似4市＋山梨県内7市1町＋山梨県・当初予算の款別＋前年当初比較。**政令市は R2〜R8 の7年前後を収録し年度切替に対応**・`munibudgets.gen.ts` の `MUNI_BUDGET_YEARS`）、**decision**（全1,741市町村・総務省決算ベース）。判定は団体コード（`FULL_MUNIS`／`BUDGET_MUNIS`）。decision は款別歳出（→項）・歳入科目（→内訳）・1人あたり・財政指標・類似比較・決算経年まで。full 専用画面（主な事業・執行・評価・補正）は budget/decision では出さずリクエストチップにする（前年比較は full+budget）。詳細・配信モデルは [docs/data-strategy.md](docs/data-strategy.md)。

- `src/client/components/BudgetTrace.tsx` — アプリ本体。全 state と算出ロジック（プロトタイプの `renderVals` 相当）。年度スケール・補正反映・1人あたり換算・ドリルダウン木の解決などは**すべてここで計算し、描画用の値オブジェクト `v` にまとめて**渡す。tier（full/decision）でデータ源を差し替え（full=`kofu.gen` 等の静的 import、decision=`useDecisionData` で県シャードをフェッチ→`buildDecisionView`）、full 専用画面・ドリル拡張は `isDecision` でゲートする。
- `src/client/lib/decision.ts` / `src/client/hooks/useDecisionData.ts` / `src/client/lib/decision-index.gen.ts` — decision 階層。`useDecisionData(県コード)` が `public/decision/<県コード2桁>.json`（総務省決算の県シャード・選択時フェッチ・モジュールキャッシュ）を取得し、`buildDecisionView` がダッシュボード/ドリルの表示シェイプ（`BudgetNode` 互換）に変換する。索引・PREF_CODES・出典メタは `decision-index.gen.ts`（`bun run pipeline:derive` で再生成）。
- `src/client/components/BudgetTraceView.tsx` — 全画面（トップ / 市区町村選択 / ダッシュボード / 款別ドリルダウン / 前年比較 / 政策テーマ / 類似自治体 / 出典）の JSX。ロジックを持たない。
- `src/client/lib/similar.ts` / `src/client/hooks/useSimilarIndex.ts` — 類似自治体比較。**比較軸（人口／財政規模／1人あたり歳出／財政力指数／歳出構成）を選んでから相手を選ぶ**方式で、`useSimilarIndex` が全国索引 `public/decision/similar-index.json`（全1,741市町村・この画面でだけフェッチ）を取得し、`similar.ts` が軸ごとの距離・サジェスト・帯平均を計算する。**特定の比較相手を derive で決め打ちしない**（旧実装は甲府＋4市の静的リストを全自治体で使い回していた）。
- `src/client/lib/data.ts` — 実データ生成モジュール（`kofu.gen.ts` / `projects.gen.ts` / `similar.gen.ts` / `decision-index.gen.ts`、`bun run pipeline:derive` で再生成）の re-export と整形関数（`fmtOku` / `fmtPerCap` / `fmtYen` / `fmtPop` / `donutBg` 等）、階層判定（`tierOf` / `prefCodeOf`）。チャート色 `PALETTE` は**モジュール変数を `setPalette()` で切り替える**方式なので、描画前に呼ばれる順序に注意。サーバー層導入時に型→`src/shared/`、データ→ API へ分割する。
- `src/client/components/JapanMap.tsx` — 日本地図（地域→都道府県→市区町村ズーム、島しょ部の別枠、エリアズーム、フリーワード検索）。SVG を直接 DOM 操作する React 管理外領域があるため、変更時は `boxRef` 配下と React 描画の境界を崩さないこと。
- `src/client/components/ui.tsx` — `S()`（CSS 文字列→style オブジェクト。プロトタイプの inline style を逐語移植するためのヘルパ）、`HoverBox`（style-hover 相当）、`CountUpNum`（数値カウントアップ）。既存画面のスタイルは `S("...")` の文字列を**プロトタイプと diff 可能な形で維持**する。
- `pipeline/registry/roadmap.ts` / `src/client/lib/roadmap.gen.ts` — `/roadmap`（進捗と計画）。**進捗の数字は1つも手書きしない** — coverage と同じ実データから derive が算出する（手書きの数字は必ず実態とズレる）。**手書きは計画（`registry/roadmap.ts`）だけ**で、公開ページなので「時期を約束しない」「進捗の数字を書かない」「done を書かない」の3ルールを derive が機械的に検査する（Markdown 記法・時期の約束は throw）。
- `src/client/lib/caveats.gen.ts` — **データの注意**（ダッシュボードの「データの注意」セクション）。
  **手で書かない** — `validate` の warning（＝検証ゲートが検出し、原典側の事情と説明できるもの）を
  derive が自治体へ割り当てる。error は検証ゲートで止まり derive に来ないので、出るのは warning だけ。
  **検証の原文をそのまま残し**、パターンから導いた市民向けの一行を併記する（個別の文面を手で持たない）。
  **「報告されたものをそのまま尊重する」＝数値を丸めない**という意味であり、説明を不親切にする理由ではない。
- `src/app/globals.css` — inline style では書けない media query を `data-mq="..."` 属性で上書きするモバイル最適化。新しいグリッド行を足すときは対応する `data-mq` ルールも確認する。

# データパイプライン

一次資料は `pipeline/`（バッチ）で **sources（台帳）→ raw（不変・原本コミット・ハッシュ来歴）→ parsed（locator 付き抽出）→ normalized（団体コード・標準科目で比較可能化）→ gen（アプリ用断面）** の層で扱う（メダリオンの Bronze/Silver/Gold に相当）。**各資料の取得手順・構造のクセは [docs/data-sources.md](docs/data-sources.md)** に記録してあり、資料を追加・更新したら必ず追記する。多自治体への展開方針（3層戦略）は [docs/data-strategy.md](docs/data-strategy.md)。規約は [docs/architecture.md](docs/architecture.md) §10。特に: 検証ゲート（`needs_review` を normalize に通さない）、フィクスチャ隔離（`data/normalized/_fixtures/` をアプリから import しない）、未知の科目を黙って「その他」に寄せない。

**検証は2段ある**（どちらも「静かに壊れる」を防ぐためのもので、守備範囲が違う）:
- **`pipeline:validate`** — **parsed の自己整合**（Σ＝内訳の和・算術）。`error` があれば normalize/derive へ進まない
- **`pipeline:derive` の出口の整合チェック** — **gen 同士の食い違い**（/coverage の件数＝配信シャードの件数・
  事業報告の収録漏れ・URL スラグ）。**validate は gen 同士を見ない**ため、2026-07-15 の1セッションで
  「収録済みなのに実態とズレる」型を4回踏んだ（フッターの出典が甲府固定・/coverage の予算列が最新年度のみ・
  /coverage が横浜の成果を「×」・件数が画面と食い違う）。**問題があれば throw して derive を失敗させる**
- **どちらも「表示専用の項目」は守れない**（金額でないので Σ が立たない）。川崎の所属名572件が空・
  横浜の所属名456件が汚染、はいずれも**画面を見て気づいた**。**新しい資料は画面で目視すること**

**資料の発見・収録は2つの再利用可能な手続きに切り出してある**（毎回 docs から手順を組み立て直さない）:
- **発見** — `source-scout` サブエージェント（`.claude/agents/source-scout.md`）。「○○市の款別＋前年当初比較 PDF はどこか」を調べ、直リンク・物理ページ・見出し語・ライセンス原文・`parserOptions` の見込みまで報告する。**registry・data は書き換えない**。複数自治体は1体ずつ**並列**で起動する。
- **収録** — `/ingest-source` スキル（`.claude/skills/ingest-source/SKILL.md`）。registry 登録 → fetch → parse → validate → archive → derive → アプリ配線（`BUDGET_SOURCES`・`MUNI_SLUGS`）→ docs 追記を通す。

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

**このプロジェクトの既存デザインを尊重する**（専用のデザインシステム文書は置かない。実装が仕様）。UI を追加・変更するときは既存画面の視覚言語に合わせること: IBM Plex Sans JP + IBM Plex Mono、白カード + `#DFE7EC` ボーダー、アクセント `#1798D0`、チャートは `PALETTE`（Okabe-Ito ベースの色覚多様性対応・`src/client/lib/data.ts`）以外の系列色を新設しない。**数値は必ず IBM Plex Mono**、金額整形は `fmtOku` / `fmtPerCap` を再利用する。出典チップ（エビデンス）を伴わない数値表示を新設しない。**エビデンス3層コピーの原則**（[docs/data-strategy.md](docs/data-strategy.md) に正式ルール）: 一次資料は ①git raw ②Wayback ③自サーバー配信（`public/sources/`）の3つの写しを持ち、**画面のリンクは原則③をドロワーで開く**（PDF=PdfViewer、HTML=サンドボックス iframe、Excel=ダウンロードカード）。発行元・Wayback への直リンクを主リンクにしない — 両者はドロワー内の補助リンク。新しい資料を収録したら fetch → `pipeline:archive`（即時）→ sync（自動）の順で3層を揃える。**例外は「要許可」（`licenseClass === "permission-required"`）の資料**（2026-07-16）: 写しは残したまま**リンクだけ発行元へディープリンク**する（発行元から消えていて魚拓にしかない資料は魚拓へ）。宛先は取得元（raw-meta の `fetchedFrom`）から derive が決めて `evidence-policy.gen.ts` に書き出し、クライアントは `D.evidenceHref` / `D.evidenceAction` と `openViewer` の1か所で振り替える。**エビデンスを開く新しい導線を足すときは必ず `openViewer` を通す**（直接 `/sources/...` を href に置かない）。アニメーションは `prefers-reduced-motion` に対応させる。

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

## `main` へ直接 push しない（non-negotiable）

`main` への push は**そのまま本番デプロイ**になる。変更は必ず作業ブランチ → PR（Preview デプロイで確認）→ squash マージの順で入れる。ユーザーが「マージしよう」と言った場合も、`main` への直接 push ではなく **PR を作る**の意味に解釈する。`git push origin main` / `main` 上での直接コミットは、ユーザーがその都度明示的に指示しない限り実行しない。
