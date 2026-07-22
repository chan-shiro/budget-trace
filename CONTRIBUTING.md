# コントリビューションガイド

**予算トレース** — 地方自治体の予算から執行・事業報告までを一次資料（エビデンス）付きでたどれる可視化サイト。
本番: https://budget-trace-tawny.vercel.app

このファイルは**入口の地図**です。ルールの正はすべて docs 側にあり、ここには要約と読み順だけを置きます
（重複させると必ずズレるため）。

## 最初に読むもの（この順で）

1. **[CLAUDE.md](CLAUDE.md)** — 全ルールの要約。AI エージェント向けの体裁だが、**人間にとってもここが正**
2. **[docs/handoff.md](docs/handoff.md)** — 全体像・主要な決定の経緯・ハマりどころ・現在地
3. 触る領域に応じて:
   - 一次資料・パイプライン → **[docs/data-sources.md](docs/data-sources.md)**（資料ごとの取得手順とクセ。§番号で相互参照される）
   - 多自治体展開・エビデンスの扱い → **[docs/data-strategy.md](docs/data-strategy.md)**
   - サーバー層 → **[docs/architecture.md](docs/architecture.md)**（non-negotiables あり・着手前に必読）

## セットアップ

パッケージマネージャは **bun** 固定（npm / yarn / pnpm を使わない。`package-lock.json` を作らない）。

```bash
bun install
bun run dev        # http://localhost:3000
bun run typecheck  # tsc --noEmit
```

データパイプラインを触る場合は **poppler** も必要:

```bash
brew install poppler   # pdftotext
```

## タスクの拾い方

- **[GitHub Issues](https://github.com/chan-shiro/budget-trace/issues) がタスク表の唯一の正**。
  ピン留めの3件が優先順。各 issue は背景・作法・参照先つきで、単独で拾えるように書いてある
- ラベルの意味:
  - `収録` — 一次資料の収録（`/ingest-source` の手続きで完結）
  - `偵察` — 資料がどこにあるか未確定（`source-scout` での発見フェーズが先）
  - `パーサ` — パーサ本体の改修が要る（**既存全ソースの再 parse 必須**・下記）
  - `パイプライン` — fetch / archive / validate / derive 等の基盤
  - `設計` — アーキテクチャ判断が要る（docs/architecture.md が先）
  - `good first issue` — 手順が確立済みで入りやすい
- 着手するときは issue にコメントを残す（重複作業の防止）

## 変更の流れ

- **`main` へ直接 push しない（non-negotiable）** — push はそのまま本番デプロイになる。
  必ず作業ブランチ → PR（Preview デプロイで確認）→ **squash マージ**
- PR 本文に `Closes #N` を入れる（マージで issue が自動クローズ）
- コミットメッセージ・PR は日本語で「何を・なぜ・**どう検証したか**」を書く（既存ログが手本）
- ⚠ PR を積む（base を main 以外にする）場合、**親のマージで `--delete-branch` を使わない**
  （base が消えると子が自動クローズされ、復旧はブランチの立て直しになる）

## 破ってはいけないルール（要約 — 正は CLAUDE.md と docs）

1. **実データのみ**。アプリに載せる数値はすべて一次資料由来。ダミー・推計値は置かない。
   一次資料が無い機能は「未収録」にする
2. **検証ゲートを緩めない**。`pipeline:validate` の error は、ゲートではなくパーサか資料の理解を直す
3. **款名は全件目視**。Σ も validate も守らない領域がある（表示専用フィールド・部首の異体字
   U+2E80–U+2FDF・側の取り違え）。「目視した」と言えるまで収録を終えない
4. **パーサを触ったら既存全ソースを再 parse**し、`parsedAt` 以外の差分ゼロを確認する
5. **発見・クセは docs/data-sources.md に記録してから終える**（発見コストを二度払わない）
6. エビデンスを開く導線は必ず `openViewer` を通す（`/sources/...` を直接 href に置かない）
7. `Enter` で動く `onKeyDown` は必ず IME ガードを入れる（CLAUDE.md に定型あり）
8. UI は既存の視覚言語に合わせる（IBM Plex Sans JP / Mono・`PALETTE` 以外の系列色を新設しない・
   数値は `fmtOku` / `fmtPerCap` を再利用・出典チップの無い数値表示を作らない）

## データ収録のクイックスタート

Claude Code で作業する場合は2つの再利用可能な手続きがある:

- **発見**: `source-scout` サブエージェント（`.claude/agents/source-scout.md`）— どこに資料があるかを
  調べ、直リンク・ページ・ライセンス原文・parserOptions の見込みまで報告する
- **収録**: `/ingest-source` スキル（`.claude/skills/ingest-source/SKILL.md`）— registry 登録から
  docs 追記まで一気通貫

手動でやる場合の流れ（詳細は CLAUDE.md の「データパイプライン」）:

```bash
bun run pipeline:fetch <sourceId>      # raw を取得（コミットする）
bun run pipeline:parse <sourceId>      # → parsed
bun run pipeline:validate <sourceId>   # 検証ゲート（error があれば先に進まない）
bun run pipeline:archive <sourceId>    # Wayback へ魚拓（並行実行しない）
bun run pipeline:derive                # → アプリ用 gen（coverage.json はコミット）
```

最後に `bun run dev` で**必ず画面を目視**する（Σ も validate も守れない壊れ方は画面でしか見つからない）。

## 質問・提案

Issue へどうぞ。設計の相談は `設計` ラベルの issue か新規 issue で。
