# 予算トレース — 地方自治体の予算執行可視化サイト

税金のゆくえを、執行まで。地方公共団体の予算（歳入・歳出）から執行率・事業報告までを
一次資料（エビデンス）付きでたどれる可視化サイトです。

**本番: https://budget-trace-tawny.vercel.app**

掲載数値は**すべて一次資料由来の実データ**です（ダミー・推計値は置かない — 2026-07-12 に全廃）。
一次資料が無い機能は「未収録」と表示し、資料を収録してから追加します。
画面のどの数値も、出典チップから原本（PDF 等の写し）まで遡れます。

このリポジトリは、Claude Design で作成された HTML/CSS/JS プロトタイプ
（`project/予算トレース.dc.html`）を **Next.js + React + TypeScript** で本実装した
ものです。デザインの元データは `project/` に残しています（会話ログは git 履歴にのみ残る）。

## 収録データ（2026-07-18 時点・最新は [/coverage](https://budget-trace-tawny.vercel.app/coverage)）

3つの階層で、どの自治体を選んでも何かしら見られる構成です:

| 階層 | 対象 | 見られるもの |
| --- | --- | --- |
| **full** | 甲府市 | 予算 → 主な事業 → 執行状況 → 事務事業評価 → 事業報告 → 議会の議決まで一気通貫 |
| **budget** | 50団体（全20政令指定都市・東京特別区17区・山梨県内・類似市・山梨県） | 当初予算の款別歳入歳出＋前年当初比較。**年度切替つき**（最長は新宿区の H13〜R8=26年度） |
| **decision** | 全1,741市町村 | 総務省決算ベース（款別歳出→項・歳入科目→内訳・1人あたり・財政指標・類似比較・決算経年 R2〜R6） |

このほか横浜市・川崎市は**事業報告の全量**（横浜 2,313件・川崎 572件）を収録しています。

**エビデンスは3層で保全**します — ① git 上の原本（sha256 固定）② Wayback Machine の魚拓
③ 自サーバー配信のコピー。画面のリンクは原則③をドロワーで開き、再利用許諾の無い資料だけ
発行元へのリンクに振り替えます（区分は /coverage で全件開示）。詳細は
[docs/data-strategy.md](docs/data-strategy.md)。

## 主な画面

- **トップ** — 日本地図（地域 → 都道府県 → 市区町村へズームイン。フリーワード検索、
  島しょ部の別枠、政令市の区・東京23区・北海道振興局のエリアズーム。形状データは同梱＝
  オフライン動作）と、**「収録の深さから選ぶ」**（収録済み全団体を深さ3段で並べる。
  件数も割り当ても実データから自動生成）
- **ダッシュボード** — 歳入・歳出のドーナツと款別内訳、対前年比、1人あたり換算、
  「データの注意」（検証ゲートの検出結果から自動生成）、出典チップ
- **款・項ドリルダウン** — 会計項目を段階的に掘り下げ（full は目・節 → 事業まで接続）
- **前年比較** — 款ごとの当初予算比較（full・budget）
- **類似自治体比較** — 比較軸（人口／財政規模／1人あたり歳出／財政力指数／歳出構成）を
  選んでから相手を選ぶ方式。全1,741市町村から検索
- **full 専用（甲府）** — 政策テーマ別ビュー・予算執行状況（R1〜R7）・事務事業評価・
  事業報告・議会の構成と議決
- **データ出典 [/sources](https://budget-trace-tawny.vercel.app/sources)・
  整備状況 [/coverage](https://budget-trace-tawny.vercel.app/coverage)・
  進捗と計画 [/roadmap](https://budget-trace-tawny.vercel.app/roadmap)** —
  何を・どこから・どんな利用条件で収録しているかの全件開示と、プロジェクトの現在地
  （進捗の数字は実データから自動算出）
- 表示単位トグル（総額 ⇄ 1人あたり）、実 URL でのディープリンク・共有、
  レスポンシブ、`prefers-reduced-motion` 対応

## 技術構成

- **Next.js 16**（App Router）/ **React 19** / TypeScript / パッケージマネージャは **bun**
- 状態駆動の SPA（画面遷移はコンポーネント内 state で管理しつつ、パスベースの
  ASCII 実 URL に同期 — ディープリンク・共有・戻る/進む対応）
- **データパイプライン**（`pipeline/`）— 一次資料を
  sources（台帳）→ raw（原本）→ parsed（locator 付き抽出）→ normalized（比較可能化）→
  gen（アプリ用断面）の層で扱う。**検証ゲート**（合計＝内訳の和）を通らないデータは
  アプリに載らない。規約は [docs/architecture.md](docs/architecture.md) §10
- チャート色は Okabe-Ito ベースの色覚多様性対応パレット、数値は IBM Plex Mono
- 地図：`geolonia/japanese-prefectures`（都道府県 SVG・GFDL）＋
  `smartnews-smri/japan-topography`（市区町村 GeoJSON・国土数値情報を加工）を
  `public/mapdata/` に同梱

## ディレクトリ

```
src/
  app/                 Next.js App Router（catch-all ルートが全パスを受ける）
  client/
    components/
      BudgetTrace.tsx    アプリ本体：全 state と算出ロジック
      BudgetTraceView.tsx 全画面の描画（JSX・ロジックなし）
      JapanMap.tsx       日本地図コンポーネント
      ui.tsx             CountUpNum / HoverBox / cssToStyle ヘルパー
    lib/                 生成モジュール（*.gen.ts）の re-export・整形関数・ルーティング
    hooks/               useDecisionData（決算シャード取得）/ useSimilarIndex（類似比較索引）
  server/, shared/, test/  サーバー層導入時に使用（現状スケルトン・docs/architecture.md 参照）
pipeline/              データパイプライン（registry 台帳・パーサ・fetch/validate/derive）
data/                  一次資料の層（raw 原本・parsed・normalized・魚拓台帳）
docs/                  規約と引き継ぎ（architecture / handoff / data-sources / data-strategy）
public/mapdata/        同梱した地図形状データ（SVG + 47都道府県の市区町村 GeoJSON）
public/decision/       決算の県別シャード・類似比較索引（derive が生成）
project/               元となった Claude Design のプロトタイプ（参考・編集しない）
```

## 開発

パッケージマネージャは [bun](https://bun.sh)（Next.js の実行ランタイムには Node.js 18.17+ も必要）。
**コントリビューションの入口は [CONTRIBUTING.md](CONTRIBUTING.md)**（読み順・タスクの拾い方・破ってはいけないルール）。

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # 本番ビルド
bun run start      # 本番サーバ
bun run typecheck  # 型チェック
```

データパイプラインを触る場合は poppler（`pdftotext`）も必要です: `brew install poppler`

コードを書く前に [CLAUDE.md](CLAUDE.md) と [docs/architecture.md](docs/architecture.md)（アーキテクチャ規約）を参照してください。
デプロイは Vercel（構築済み）。`main` への push がそのまま本番デプロイになるため、
**変更は必ず作業ブランチ → PR → squash マージ**で入れます。

## 注意

本サイトはプロトタイプです。掲載数値はすべて一次資料由来の実データですが、
機能・画面は開発中で、収録範囲は自治体・年度により異なります（[/coverage](https://budget-trace-tawny.vercel.app/coverage) が正）。
一次資料の利用条件は発行元ごとに異なり、区分（再利用可／要許可／未確認）を
/coverage で開示しています。
