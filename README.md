# 予算トレース — 地方自治体の予算執行可視化サイト

税金のゆくえを、執行まで。地方公共団体の予算（歳入・歳出）から執行率・支出先・
事業報告までを一次資料（エビデンス）付きでたどれる、クリック可能なプロトタイプです。

甲府市の令和8年度当初予算（款レベルは公表実データ、項以下・補正・執行率などは推計・
ダミー）をサンプルとして収録しています。

このリポジトリは、Claude Design で作成された HTML/CSS/JS プロトタイプ
（`project/予算トレース.dc.html`）を **Next.js + React + TypeScript** で本実装した
ものです。デザインの元データと会話ログは `project/` と `chats/` に残しています。

## 主な機能

- **トップページの日本地図** — 地域 → 都道府県 → 市区町村へズームイン。フリーワード
  検索、離島（島しょ部・奄美・伊豆諸島など）の別枠表示、政令市の区・東京23区・北海道
  振興局のエリアズーム。形状データはリポジトリに同梱（オフライン動作）
- **ダッシュボード** — 歳入・歳出のドーナツ、款別凡例、議会構成と議決、予算の変遷
  （当初 → 補正 → 現額）、基本情報サマリー、政策テーマ・注目事業
- **款・項・目・節 → 事業ドリルダウン** — 会計項目を段階的に掘り下げ、収録済みの目からは
  節×事業マッピングで事業へ接続
- **政策テーマ別ビュー** — 政策意図サマリーと、款 ⇄ テーマの相互集計
- **事業詳細** — 目的・内容・四半期執行推移・契約/支出先・成果指標(KPI)・エビデンス・
  過年度実績・補正の影響
- **前年比較 / 過年度実績 / 類似自治体 / 基本情報 / データ出典** の各タブ
- **表示単位トグル**（総額 ⇄ 1人あたり）、**年度切替**（R8/R7/R6）、
  グラフのホバー強調・近傍ツールチップ・カウントアップ/エントランスアニメーション、
  レスポンシブ（モバイル最適化）

## 技術構成

- Next.js 14（App Router）/ React 18 / TypeScript
- 状態駆動の SPA（画面遷移は URL ではなくコンポーネント内 state で管理し、
  プロトタイプの挙動を忠実に再現）
- 地図：`geolonia/japanese-prefectures`（都道府県 SVG・GFDL）＋
  `smartnews-smri/japan-topography`（市区町村 GeoJSON・国土数値情報を加工）を
  `public/mapdata/` に同梱

## ディレクトリ

```
src/
  app/                 Next.js App Router（layout, page, globals.css, icon）
  client/
    components/
      BudgetTrace.tsx    アプリ本体：state と算出ロジック（renderVals 相当）
      BudgetTraceView.tsx 全画面の描画（JSX）
      JapanMap.tsx       日本地図コンポーネント
      ui.tsx             CountUpNum / HoverBox / cssToStyle ヘルパー
    lib/data.ts          予算・事業・テーマ・基本情報などのデータと整形関数
    hooks/               React Query フック（サーバー層導入時に使用・現状スケルトン）
  server/                Hono サーバー層（docs/architecture.md 参照・現状スケルトン）
  shared/                Zod スキーマ / 純粋型（現状スケルトン）
  test/                  Testcontainers ヘルパ / fixtures（現状スケルトン）
docs/                  アーキテクチャ規約・デザインシステム・デプロイ方針
public/mapdata/        同梱した地図形状データ（SVG + 47都道府県の市区町村 GeoJSON）
project/, chats/       元となった Claude Design のプロトタイプと会話ログ（参考）
```

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 本番ビルド
npm run start      # 本番サーバ
npm run typecheck  # 型チェック
```

コードを書く前に [CLAUDE.md](CLAUDE.md) と [docs/architecture.md](docs/architecture.md)（アーキテクチャ規約）、
[docs/design-system.md](docs/design-system.md)（デザインシステム）を参照してください。
デプロイ方針（未構築）は [docs/deploy.md](docs/deploy.md)。

## 注意

本サイトはプロトタイプです。数値・事業名・資料名の多くはダミーを含みます。款レベルの
金額は甲府市公表の令和8年度当初予算（総額918億円）の実データですが、項以下の内訳・
補正・執行率・議会の会派別賛否などは推計・ダミーです。
