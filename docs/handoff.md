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
- 実装済み: 全画面 UI（トップ日本地図 / ダッシュボード / 款項目節→事業ドリルダウン /
  政策テーマ / 事業詳細 / 前年比較 / 過年度実績 / 類似自治体 / 基本情報 / 出典）、
  データ収集パイプライン（sources → raw → parsed → normalized、フィクスチャで e2e 検証済み）
- **総務省 R6 実データ投入済み**: `data/normalized/municipal-accounts/R6.json` に
  全1,741市区町村（特別区含む・47都道府県）の人口・歳入歳出総額・目的別歳出が入っている。
  検証ゲートは error 0 / warning 0（全自治体で目的別合計＝歳出総額が ±0.5% 以内）。
  再現は `bun run pipeline:fetch soumu-shichoson-kessan-r6` → parse → validate → normalize
- **甲府市 R8 予算書（款別）投入済み**: `kofu-yosansho-r8`（当初予算案資料 PDF、原本アーカイブ済み・
  sha256 9a3cb941…）から歳入21款・歳出14款＋前年度額を `pdftotext` で決定的にパースし
  `data/parsed/kofu-yosansho-r8.json` に格納（docType: "budget-book"、locator はページ番号）。
  検証 error 0（款の和＝合計が歳入・歳出とも厳密一致、歳入合計＝歳出合計 91,787,060千円）。
  budget-book は normalize 対象外で、アプリへは今後 derive で接続する
- **類似自治体タブは実データ接続済み（エビデンス付き）**: `bun run pipeline:derive` が
  normalized から甲府市＋人口帯の近い4市＋帯内70市平均を選出して
  `src/client/lib/similar.gen.ts` を生成し、`data.ts` が re-export する
  （1.6MB の JSON をバンドルに入れない方式）。各行に出典位置（例「都市別・概況 436行目」、
  title 属性に機械可読 ref）、テーブル下に一次資料カード（総務省への実リンク＋sha256＋取得日。
  raw-meta とレジストリから生成、表示行を裏付けるファイルのみ掲載）を表示する
- **それ以外のアプリデータはまだ `src/client/lib/data.ts` の静的データ**（款レベルは甲府市公表の
  実データ、項以下・補正・執行率はダミー）
- サーバー層（`src/server/` ほか）は**スケルトンのみ**。Hono/Inversify/CASL/Postgres は未導入
- デプロイ未構築（Vercel 想定: GitHub 連携で main 自動デプロイ）

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

1. **予算書の続き**: 款別一覧は投入済み（下記）。残りは
   (a) 「主な事業一覧」（p.14-23、事業名・予算額・内容・総合計画の施策紐付け）の抽出
   — 表が複雑なので LLM 併用（抽出 → Zod 検証 → 整合チェック）を設計する、
   (b) アプリ接続 — `data.ts` の KOFU 款レベル（丸め値）を parsed の正確な値＋出典位置で
   置換する derive。項以下のダミー children は款合計に合わせて再スケールが必要
2. **Vercel 接続**（GitHub 連携・main 自動デプロイ）
3. サーバー層導入（Hono/Inversify/CASL/Postgres + Testcontainers）— data/ の DB 移行、
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
