# Handoff — セッション引き継ぎメモ

新しいセッション（ローカル/クラウド問わず）は CLAUDE.md → docs/architecture.md の次にこれを読む。
最終更新: 2026-07-11（総務省 R6 実データ投入完了時点）

---

## 1. これは何か

**予算トレース** — 地方自治体の予算（歳入・歳出）から補正・執行率・支出先・事業報告までを
一次資料（エビデンス）付きでたどれる可視化サイト。甲府市の令和8年度当初予算をサンプル収録。

Claude Design のプロトタイプ（`project/予算トレース.dc.html`）を Next.js で本実装したもの。
`project/` と `chats/` は元デザインと会話ログの**参照用アーカイブ**（編集・import しない）。

## 2. 現在の状態（2026-07-11 時点）

- `main` = `448e3b8`。PR #1（実装一式）・#2（bun移行）・#3（docs整理）マージ済み
  ＋ データパイプラインは直接マージ済み
- 実装済み: UI（トップ日本地図 / ダッシュボード / 款別ドリルダウン / 前年比較 /
  政策テーマ / 類似自治体 / 出典）、データ収集パイプライン
  （sources → raw → parsed → normalized、フィクスチャで e2e 検証済み）
- **全ダミーを排除済み（2026-07-12 決定）**: 画面の数値はすべて一次資料由来。
  これに伴い一次資料が無い機能を削除した — 事業詳細（KPI・契約・執行率）/ 過年度実績 /
  基本情報タブ / 予算の変遷（補正）/ 年度切替 / 議会の会派・賛否 / 項以下の按分内訳 /
  山梨県全体ダッシュボード。政策テーマは総合計画の基本目標×83事業の実集計に再構築、
  注目の事業は予算額上位に変更、人口は住基実数 183,850（世帯数表示は出典なしのため削除）。
  歳入ドリルは「諸収入・その他」のみ実の13款へ展開。復活には対応する一次資料の収録が前提
- **総務省 R6 実データ投入済み**: `data/normalized/municipal-accounts/R6.json` に
  全1,741市区町村（特別区含む・47都道府県）の人口・歳入歳出総額・目的別歳出が入っている。
  検証ゲートは error 0 / warning 0（全自治体で目的別合計＝歳出総額が ±0.5% 以内）。
  再現は `bun run pipeline:fetch soumu-shichoson-kessan-r6` → parse → validate → normalize
- **甲府市 R8 予算書（款別）投入・アプリ接続済み**: `kofu-yosansho-r8`（当初予算案資料 PDF、
  原本アーカイブ済み・sha256 9a3cb941…）から歳入21款・歳出14款＋前年度額を `pdftotext` で
  決定的にパース（docType: "budget-book"、locator はページ番号、検証 error 0）。
  `pipeline:derive` が `src/client/lib/kofu.gen.ts` を生成し、`data.ts` の KOFU は
  この正確値のみで構成（歳出14款・歳入9グループ、「諸収入・その他」は実13款の children、
  人口 183,850 も gen 経由）。前年比較は予算書の前年度当初額を使い増減額が原典と厳密一致。
  ダッシュボードとドリルダウンの EVIDENCE から予算書 PDF への実リンクあり。
  budget-book は normalize 対象外（derive で直接アプリへ）
- **「主な事業一覧」83事業も抽出・表示済み**: p.14-23 を `pdftotext -tsv` の単語座標で
  決定的にパース（列はX座標、行は No. のY中点、款は見出しフォント高で追跡。
  「介護保険事業特別会計」セクションにも対応）。検証は No 連番・款予算超過・基本目標の
  パターン等で error 0。`projects.gen.ts` に導出し、款ドリルダウンの款レベルに
  「この款の主な事業（実データ）」として表示（新規/拡充バッジ・内容・施策・出典ページ付き、
  クリック遷移なし）。LLM 併用は不要だった
- **類似自治体タブは実データ接続済み（エビデンス付き）**: `bun run pipeline:derive` が
  normalized から甲府市＋人口帯の近い4市＋帯内70市平均を選出して
  `src/client/lib/similar.gen.ts` を生成し、`data.ts` が re-export する
  （1.6MB の JSON をバンドルに入れない方式）。各行に出典位置（例「都市別・概況 436行目」、
  title 属性に機械可読 ref）、テーブル下に一次資料カード（総務省への実リンク＋sha256＋取得日。
  raw-meta とレジストリから生成、表示行を裏付けるファイルのみ掲載）を表示する
- サーバー層（`src/server/` ほか）は**スケルトンのみ**。Hono/Inversify/CASL/Postgres は未導入
- **デプロイ構築済み**: Vercel チーム `philosophyhouse` / プロジェクト `budget-trace`。
  GitHub 連携で main push → 本番自動デプロイ。本番 https://budget-trace-tawny.vercel.app

## 3. 主要な決定事項（経緯つき）

| 決定 | 理由・経緯 |
| --- | --- |
| Next.js 14 (App Router) + React 18 + TS | Claude Design ハンドオフ時にユーザーが選択 |
| パッケージマネージャは **bun**（`bun.lock`） | npm から移行済み。package-lock.json を作らない |
| デザインシステム文書は置かない | 既存実装が仕様。要点は CLAUDE.md の UI 節に集約（旧 design-system.md は削除） |
| デプロイは Vercel 想定 | 旧 deploy.md（Cloud Run + Terraform）は削除 |
| クリーンアーキテクチャ規約 | docs/architecture.md。**最初のサーバーサイド機能から適用**（現状は UI のみ） |
| パイプライン4層 + 検証ゲート | raw は不変・ハッシュ来歴、parsed は locator 必須、error は normalize 不可 |
| raw 原本はコミットしてアーカイブ | 発行元の差し替え・削除に備え原典の写しを保全（2026-07-11 決定）。フィクスチャの raw のみ gitignore |
| 比較は標準分類に寄せる | 団体コード（JIS X 0402）・目的別標準科目。独自スキーマを発明しない |
| 収集は2トラック | 総務省統一 Excel で「広く浅く」→ 予算書 PDF（LLM併用）で「深く狭く」 |
| **ダミーを置かない** | 2026-07-12 決定。画面の数値は一次資料由来のみ。資料が無い機能は「未収録」とし実装しない |

## 4. 横断的な暗黙知（ハマりどころ）

- **GitHub 運用**: このリポジトリは **squash マージが使われる**。マージ後は必ず
  `git fetch origin main && git checkout -B implement-budget-trace origin/main` でブランチを作り直す
  （古いコミットを積み直すと重複する）
- **データ来歴**: 画面の「ダミー」「推計」注記は仕様。データを触るとき整合を崩さない。
  フィクスチャ出力（`data/normalized/_fixtures/`）をアプリから import しない
- **PALETTE はモジュール変数**: `src/client/lib/data.ts` の `setPalette()` で描画前に切替。呼び出し順に注意
- **スタイルは `S("...")` の CSS 文字列**（プロトタイプと diff 可能な形を維持）。
  ホバーは `HoverBox`、モバイルは `data-mq` 属性 + `src/app/globals.css` の media query
- **JapanMap は React 管理外の直接 DOM 操作を含む**（`boxRef` 配下の SVG）。境界を崩さない
- **地図データは `public/mapdata/` に同梱**。CDN 実行時フェッチに戻さない
- **政府系サイト（総務省・e-Stat）はクラウド環境から 403**（環境の許可リスト + 先方 WAF の2層）。
  ローカルなら制限なし（fetch.ts はブラウザ相当 UA を名乗る。R6 は自動取得できた）。
  クラウドで通す場合は環境設定で `*.soumu.go.jp` 等を Custom 許可
  （「Also include default list …」に必ずチェック。外すと git/bun が壊れる）
- **決算状況調の実ファイルの構造**（R6 で確認。パーサ 0.2.0 が対応済み）:
  1年度 = 4ファイル（都市別/町村別 × 概況/目的別歳出内訳）で、団体コードでマージする。
  ヘッダは複数行（目的別は 款番号/科目名・連番/内訳名 の3段＋結合セル）。
  労働費・諸支出金は総額列がなく内訳列の合算。「（参考）一般行政経費」ブロックは
  款名を再掲するので列解決から除外。都道府県名の列はなく「団体コード空 + 団体名だけ」の
  区切り行（字間スペース入り）で県が変わる。特別区は都市別ファイルに含まれる
- **描画用値オブジェクト `v` は any のまま**（プロトタイプ移植由来・eslint-disable 付き）。
  新規コードでは倣わない。サーバー層導入時に型付けして解消する予定
- IME 変換確定 Enter のガード（CLAUDE.md 参照）— Enter ハンドラ追加時は必須

## 5. 残タスク（優先順）

1. **削除した機能の実データでの復活**: 事業詳細（執行率・支出先・KPI）は決算書・
   成果報告書・入札情報、項以下の内訳は予算書本編、基本情報は決算状況調の概況列
   （面積・産業構造など。パーサ拡張で取れる）、補正は補正予算書 — をそれぞれ収録してから。
   プロトタイプ時代の画面 JSX は git 履歴（PR #7 時点）にある
2. サーバー層導入（Hono/Inversify/CASL/Postgres + Testcontainers）— data/ の DB 移行、
   `v` の型付け解消もこのタイミング。`*.gen.ts`（pipeline:derive の生成モジュール）も
   API 化して置き換える

## 6. 動かし方（要点）

```bash
bun install && bun run dev     # アプリ (http://localhost:3000)
bun run typecheck              # 型チェック
bun run pipeline:fixture && bun run pipeline:parse fixture-shichoson-kessan-r6 \
  && bun run pipeline:validate fixture-shichoson-kessan-r6 \
  && bun run pipeline:normalize fixture-shichoson-kessan-r6   # パイプライン e2e 確認
```
