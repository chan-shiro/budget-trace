# アーキテクチャ規約

このプロジェクトでコードを書くときは、必ず以下のルールに従う。

---

## 0. 現状と適用範囲

このリポジトリは現在 **UI のみのプロトタイプ**（データは `src/client/lib/data.ts` に静的定義、サーバー層なし）。
ディレクトリは下記の `src/` レイアウトへ**移行済み**だが、`src/server/` `src/shared/` `src/test/` は
スケルトン（空ディレクトリ）のみ。本書のサーバー側規約は **最初のサーバーサイド機能を書く時点から**適用する。
想定される契機:

- 予算書 PDF / オープンデータの取込パイプライン（甲府市以外の自治体追加）
- 管理画面（データ登録・エビデンス添付・公開フラグ）
- 認証つきの編集機能

その時点で `src/client/lib/data.ts` を分割する（型 → `src/shared/schema` / `src/shared/types`、
甲府市データ → `src/test/fixtures` と DB seed）。

---

## 1. 全体構成

- フロントエンド: Next.js（App Router）
- サーバー: Next.js Route Handler 上で **Hono** をマウントする
- クライアントとサーバー間の通信: **Hono RPC** を使い、型を `hc<AppType>` で共有する
- 状態管理 / 通信: **React Query (TanStack Query)** をフック越しに使う
- データベース: **PostgreSQL**（開発・テスト・本番すべて Postgres。SQLite 等で代用しない）
- DI: **Inversify**
- 認可: **CASL** で RBAC + 属性ベースアクセス制御
- テスト: **Vitest + Testcontainers** でインテグレーションテストを書く（Testcontainers の Postgres image を使う）

Next.js は **UI / Route Handler 経由の Hono マウント / クライアントフック** のみを担当する。
ビジネスロジックや永続化は Next.js のコードに書かない。**必ず `src/server/domains/[domain]/` の中に置く**。

---

## 2. ディレクトリ構成

```text
src/
  app/                          Next.js App Router (UI と Route Handler だけ)
    api/
      [[...route]]/route.ts     Hono アプリを Next.js にマウントするエントリ
  server/
    hono.ts                     Hono アプリ本体。各 domain の route を合成する
    container.ts                Inversify Container の組み立て
    tokens.ts                   DI トークン (Symbol) を集約
    ability.ts                  CASL の Ability factory
    middleware/
      auth.ts                   認証ミドルウェア (ユーザー解決)
      ability.ts                CASL Ability を c.set する
      error.ts                  例外 → HTTP マッピング
    domains/
      [domain]/
        interface.ts            ドメイン型と Repository/Service の interface のみ
        repository.ts           interface の具体実装 (DB アクセス)
        service.ts              interface の具体実装 (ユースケース)
        route.ts                Hono のルート定義 (Zod バリデーション含む)
        index.ts                外部公開する型と DI トークンを再エクスポート
  client/
    components/                 画面コンポーネント
    lib/
      data.ts                   予算・事業データと整形関数 (サーバー導入時に shared / fixtures へ分割)
    hooks/
      use[Resource].ts          React Query フック (Hono RPC を呼ぶ)
    rpc.ts                      hc<AppType> で作った RPC クライアント
  shared/
    schema/                     Zod スキーマ (server/client 両方で使う)
    types/                      純粋型のみ
  test/
    containers/                 Testcontainers の起動ヘルパ
    fixtures/                   テスト用データ (src/client/lib/data.ts 由来の甲府市データ含む)
```

このプロジェクトで想定するドメイン（予算トレースの言葉に合わせる）:

| domain | 扱うもの |
| --- | --- |
| `municipalities` | 自治体（都道府県・市区町村）、基本情報、人口 |
| `budgets` | 款・項・目・節の予算木、年度、補正（予算の変遷）、前年比較 |
| `projects` | 事業（目的・内容・契約・KPI・四半期執行・過年度実績） |
| `themes` | 政策テーマと事業の紐づけ、政策意図サマリー |
| `evidence` | 一次資料（PDF・ページ・スクリーンショット）と出典一覧 |

---

## 3. ドメイン層のファイル分割ルール

各ドメインは **必ず 4 ファイル構成**にする。

### `interface.ts` — 具体実装に依存しない型のみ

- DB / HTTP / Inversify / Hono / 外部 SDK など、**具体的な依存を import してはいけない**
- 持っていいもの:
  - ドメインのエンティティ型（`BudgetNode`, `Project` など）
  - `Repository` interface
  - `Service` interface
  - Service のメソッド引数・戻り値の DTO 型
- 持ってはいけないもの:
  - Drizzle / Prisma / Kysely などの DB クライアント型
  - `Context`, `Hono`, `Request`, `Response`
  - `inversify` の `injectable` などの装飾子
- Zod スキーマは `shared/schema/` に置き、interface からは「型」だけを `z.infer` で参照する

```ts
// src/server/domains/budgets/interface.ts
import type { BudgetNode, FiscalYear, BudgetSide } from "@/shared/schema/budget";

export interface BudgetRepository {
  findTree(municipalityId: string, fy: FiscalYear, side: BudgetSide): Promise<BudgetNode[]>;
  findRevisions(municipalityId: string, fy: FiscalYear): Promise<BudgetRevision[]>;
  upsertTree(municipalityId: string, fy: FiscalYear, side: BudgetSide, tree: BudgetNode[]): Promise<void>;
}

export interface BudgetService {
  getDashboard(municipalityId: string, fy: FiscalYear): Promise<BudgetDashboard>;
  drill(municipalityId: string, fy: FiscalYear, side: BudgetSide, path: string[]): Promise<BudgetNode[]>;
}
```

### `repository.ts` — Repository interface の具体実装

- DB クライアントを受け取り、`@injectable()` で登録
- ここで生 SQL / ORM / 外部 API を扱う
- ドメイン外に値を返すときは必ず `interface.ts` で定義した型で返す

### `service.ts` — Service interface の具体実装

- `@injectable()` + `@inject(TOKENS.BudgetRepository)` で Repository を受け取る
- アプリケーション固有のユースケース（年度スケール・補正反映・1人あたり換算・ドリルダウン解決など、
  現在 `src/client/components/BudgetTrace.tsx` にある計算のサーバー側対応物）を書く
- Repository を直接呼ぶのは Service だけ。route から Repository を直接触らない

### `route.ts` — Hono ルート

- `new Hono<AppEnv>()` を作って export する
- 入力は `@hono/zod-validator` で必ず検証する
- `c.get("container")` から Service を取り出して呼ぶ
- レスポンスは `c.json(...)` で返し、**戻り値の型を Hono に推論させる**（RPC のために重要）
- 認可チェックは route で行う（後述）

```ts
// src/server/domains/budgets/route.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { drillQuerySchema } from "@/shared/schema/budget";
import type { AppEnv } from "@/server/hono";
import { TOKENS } from "@/server/tokens";
import type { BudgetService } from "./interface";

export const budgetsRoute = new Hono<AppEnv>()
  .get("/:municipalityId/dashboard", async (c) => {
    c.get("ability").throwUnlessCan("read", "Budget");
    const service = c.get("container").get<BudgetService>(TOKENS.BudgetService);
    const dashboard = await service.getDashboard(c.req.param("municipalityId"), "R8");
    return c.json({ dashboard });
  })
  .get(
    "/:municipalityId/drill",
    zValidator("query", drillQuerySchema),
    async (c) => {
      c.get("ability").throwUnlessCan("read", "Budget");
      const service = c.get("container").get<BudgetService>(TOKENS.BudgetService);
      const q = c.req.valid("query");
      const nodes = await service.drill(c.req.param("municipalityId"), q.fy, q.side, q.path);
      return c.json({ nodes });
    },
  );
```

### `index.ts`

- 外部に公開する型と DI トークンだけを再エクスポート
- `route.ts` も他ドメインから import されないように、`hono.ts` 経由でのみ合成する

---

## 4. Hono のマウントと RPC

### サーバー側

```ts
// src/server/hono.ts
import { Hono } from "hono";
import type { Container } from "inversify";
import type { AppAbility } from "./ability";
import { municipalitiesRoute } from "./domains/municipalities/route";
import { budgetsRoute } from "./domains/budgets/route";
import { projectsRoute } from "./domains/projects/route";

export type AppVariables = {
  container: Container;
  userId: string | null; // 公開サイトなので匿名 (null) を許容する
  ability: AppAbility;
};

export type AppEnv = { Variables: AppVariables };

export const app = new Hono<AppEnv>()
  .basePath("/api")
  .use("*", authMiddleware)
  .use("*", abilityMiddleware)
  .route("/municipalities", municipalitiesRoute)
  .route("/budgets", budgetsRoute)
  .route("/projects", projectsRoute);

export type AppType = typeof app;
```

```ts
// src/app/api/[[...route]]/route.ts
import { handle } from "hono/vercel";
import { app } from "@/server/hono";

export const runtime = "nodejs";
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
```

### クライアント側

```ts
// src/client/rpc.ts
import { hc } from "hono/client";
import type { AppType } from "@/server/hono";

export const rpc = hc<AppType>("/");
```

`AppType` を import するだけで、エンドポイントとレスポンスの型がクライアントに伝わる。
**route から型推論できる JSON 以外を返さない**。`c.json()` 以外を多用するとクライアント側の型が崩れる。

---

## 5. React Query フックの書き方

- データ取得・更新は必ずフックに閉じる。コンポーネントから `rpc` を直接呼ばない
- `queryKey` はドメイン名 + パラメータの配列で揃える
- ミューテーション後の invalidate はフック内で完結させる

```ts
// src/client/hooks/useBudgetDrill.ts
import { useQuery } from "@tanstack/react-query";
import { rpc } from "@/client/rpc";
import type { BudgetSide, FiscalYear } from "@/shared/schema/budget";

export function useBudgetDrill(
  municipalityId: string,
  fy: FiscalYear,
  side: BudgetSide,
  path: string[],
) {
  return useQuery({
    queryKey: ["budgets", municipalityId, fy, side, ...path],
    queryFn: async () => {
      const res = await rpc.api.budgets[":municipalityId"].drill.$get({
        param: { municipalityId },
        query: { fy, side, path },
      });
      if (!res.ok) throw new Error("failed to load budget drill");
      return res.json();
    },
  });
}
```

---

## 6. 型ルール

- **`any` 禁止**。本当に「どんな値でも構わない」場面でだけ許可する（実質ほぼ無い）
  - 現行プロトタイプの `src/client/components/*.tsx` には移植由来の `any`（`eslint-disable` 付き）が残っている。
    **新規コードでは倣わない**こと。サーバー層導入時に描画用値オブジェクト `v` を型付けして解消する
- 型が決まらないときは **`unknown`** を使い、絞り込んでから扱う
- 外部 API / 取込 PDF / オープンデータのレスポンスは Zod で `parse` してから内部型に乗せる
- 関数の戻り値型は基本的に明示する。例外として、Hono の route handler は推論を活かしたいので戻り値型を書かない
- `as` キャストは最後の手段。書くなら 1 行コメントで理由を残す
- `@ts-ignore` / `@ts-expect-error` は原則禁止。やむを得ない場合は `@ts-expect-error` + 理由コメント

---

## 7. Inversify による DI

### トークン

```ts
// src/server/tokens.ts
export const TOKENS = {
  Db: Symbol.for("Db"),
  MunicipalityRepository: Symbol.for("MunicipalityRepository"),
  MunicipalityService: Symbol.for("MunicipalityService"),
  BudgetRepository: Symbol.for("BudgetRepository"),
  BudgetService: Symbol.for("BudgetService"),
  ProjectRepository: Symbol.for("ProjectRepository"),
  ProjectService: Symbol.for("ProjectService"),
  ThemeRepository: Symbol.for("ThemeRepository"),
  ThemeService: Symbol.for("ThemeService"),
  EvidenceRepository: Symbol.for("EvidenceRepository"),
  EvidenceService: Symbol.for("EvidenceService"),
  EvidenceStorage: Symbol.for("EvidenceStorage"), // PDF/スクショの保存先 (GCS 等)
  Clock: Symbol.for("Clock"),
} as const;
```

### コンテナ組み立て

```ts
// src/server/container.ts
import { Container } from "inversify";
import { TOKENS } from "./tokens";
import { BudgetRepositoryImpl } from "./domains/budgets/repository";
import { BudgetServiceImpl } from "./domains/budgets/service";
import type { BudgetRepository, BudgetService } from "./domains/budgets/interface";

export function buildContainer(deps: { db: Db }) {
  const c = new Container({ defaultScope: "Singleton" });
  c.bind(TOKENS.Db).toConstantValue(deps.db);
  c.bind<BudgetRepository>(TOKENS.BudgetRepository).to(BudgetRepositoryImpl);
  c.bind<BudgetService>(TOKENS.BudgetService).to(BudgetServiceImpl);
  return c;
}
```

### ミドルウェアで Hono Context に注入

```ts
// src/server/middleware/container.ts
import { createMiddleware } from "hono/factory";
import type { AppEnv } from "@/server/hono";
import { buildContainer } from "@/server/container";
import { db } from "@/server/db";

const singleton = buildContainer({ db });

export const containerMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  c.set("container", singleton);
  await next();
});
```

- ルールとして **Service / Repository は必ず DI 経由で取り出す**。`new XxxImpl()` を route や別 Service の中で直接呼ばない
- テスト時はコンテナを別途組み立てて差し替える

---

## 8. CASL による RBAC とアクセス制御

公開サイトなので「公開済みデータの read は匿名にも許可、書き込みと未公開データは役割で制御」が基本線。

### Ability 定義

```ts
// src/server/ability.ts
import { AbilityBuilder, createMongoAbility, type MongoAbility } from "@casl/ability";

export type Actions = "read" | "create" | "update" | "delete" | "publish";
export type Subjects =
  | "Municipality"
  | "Budget"
  | "BudgetRevision"
  | "Project"
  | "Kpi"
  | "Evidence"
  | "Source"
  | "all";

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export type AppUser = {
  id: string | null; // null = 匿名の閲覧者
  roles: ("admin" | "editor" | "viewer")[];
};

export function buildAbilityFor(user: AppUser): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  // 匿名を含む全員: 公開済みデータの閲覧
  can("read", ["Municipality", "Budget", "BudgetRevision", "Project", "Kpi", "Evidence", "Source"], {
    published: true,
  });

  if (user.roles.includes("editor")) {
    // データ取込・編集担当: 自分の担当自治体の下書きを含めて編集
    can("read", "all");
    can("create", ["Budget", "BudgetRevision", "Project", "Kpi", "Evidence", "Source"]);
    can("update", ["Budget", "BudgetRevision", "Project", "Kpi", "Evidence", "Source"]);
  }
  if (user.roles.includes("admin")) {
    can("read", "all");
    can("create", "all");
    can("update", "all");
    can("delete", "all");
    can("publish", "all");
  }

  return build();
}
```

### ルール

- 認可チェックは **必ず route で行う**。Service は「ユースケースの正しさ」に集中させる
- 行レベルの所有権チェック（未公開データ・担当自治体の分離など）が要るときは、Service が
  `subject('Budget', record)` の形でオブジェクトを返し、route 側でもう一度 `ability.can("read", subject(...))` する
- フロントエンド（管理画面）でも同じ `buildAbilityFor` を使ってボタンの表示制御をする。
  Ability を作る関数は `shared/` に置けるよう、CASL 依存だけに留めること

---

## 9. テスト方針

### レイヤ別の書き分け

| 対象 | テスト種別 | やること |
| --- | --- | --- |
| `service.ts` | 単体テスト | Repository を fake / in-memory にして検証 |
| `repository.ts` | インテグレーション | **Testcontainers で実 DB** を起動し、SQL の挙動ごと検証 |
| `route.ts` | インテグレーション | `app.request("/api/...")` を直接叩く。DI コンテナはテスト用に差し替え |
| `hooks/` | コンポーネントテスト | MSW で RPC をモックし、React Testing Library で検証 |

予算計算（年度スケール・補正反映・按分・1人あたり換算）は数値の正しさが信頼性そのものなので、
Service の単体テストでは `src/test/fixtures/` の甲府市データ（現 `src/client/lib/data.ts` 由来）を使い、
画面に出ている既知の値（例: 総額918.0億・補正後922.2億）と突き合わせる。

### Testcontainers のルール

- **本番と同じ PostgreSQL イメージ**（例: `postgres:16-alpine`）を Testcontainers で起動する。SQLite や in-memory DB で代用しない
- `src/test/containers/postgres.ts` にヘルパを置き、Vitest の `globalSetup` で 1 回だけ立ち上げて使い回す
- マイグレーションはコンテナ起動直後に流す（本番と同じマイグレーションファイルを使う）
- テストごとに DB を truncate するか、トランザクションをロールバックで戻す
- CI 上で Docker が動く前提を README に明記する

### Hono ルートテスト例

```ts
// src/server/domains/budgets/route.test.ts
import { describe, it, expect } from "vitest";
import { buildTestApp } from "@/test/build-test-app";

describe("GET /api/budgets/:municipalityId/dashboard", () => {
  it("anonymous can read published budget", async () => {
    const { app } = await buildTestApp({ roles: [] });
    const res = await app.request("/api/budgets/kofu/dashboard");
    expect(res.status).toBe(200);
  });

  it("viewer cannot update", async () => {
    const { app } = await buildTestApp({ roles: ["viewer"] });
    const res = await app.request("/api/budgets/kofu/tree", { method: "PUT" });
    expect(res.status).toBe(403);
  });
});
```

---

## 10. データパイプライン（情報収集マシン）

一次資料の収集は `pipeline/` のバッチ（bun スクリプト）で行い、アプリ本体とは分離する。
データは4層で管理する:

```
[0] sources      pipeline/registry/sources.ts — 資料の台帳
                 （URL・ランディングページ・発行元・年度・ライセンス・パーサ指定）
      ↓ pipeline:fetch（自動）/ pipeline:ingest（手動投入）
[1] raw          data/raw/<sourceId>/ — 取得したままのファイル。原本アーカイブとして
                 コミットする（発行元の差し替え・削除に備える。フィクスチャの raw のみ gitignore）。
                 来歴は data/raw-meta/<sourceId>.json（SHA-256・取得日時・取得元）をコミット
      ↓ pipeline:parse（parser_version 付き・再実行可能）
[2] parsed       data/parsed/<sourceId>.json — 資料の構造のまま抽出した事実。
                 全数値に locator（ファイル・シート・行 / PDF はページ）必須
      ↓ pipeline:validate（検証ゲート）
[3] normalized   data/normalized/<dataset>/<年度>.json — 比較可能レイヤ。
                 団体コード（JIS X 0402）・標準科目・千円単位で統一。sourceRef で来歴保持
      ↓ pipeline:derive
[4] gen          src/client/lib/*.gen.ts — アプリが読む消費目的別の断面（コミット対象）
```

メダリオンアーキテクチャで言うと **raw = Bronze、parsed / normalized = Silver（資料構造の
まま→標準分類へ conformed の2段）、gen = Gold** に相当する。sources はデータ層ではなく
カタログ（台帳）。下流は常に上流から再生成でき、層を跨ぐときに検証ゲートを通す。
単一自治体の資料（budget-book）は自治体間比較の層である normalized を意図的にスキップし、
parsed → gen に直行する。

### ルール

- **来歴が第一級**: raw は不変。読み出し時に必ずハッシュ照合し、不一致は即エラー。
  parsed の数値は locator なしで存在してはならない（エビデンス表示・監査の基盤）
- **検証ゲート**: 予算・決算データは「合計 = 内訳の和」「歳入 ≧ 歳出（決算）」等で
  自己検証できる。error が1件でもあれば `needs_review` となり normalize は通らない
  （人が確認して解消するか、明示的に `--force`）
- **標準分類に寄せる**: normalized で独自スキーマを発明しない。自治体は団体コード、
  歳出は目的別標準科目（`STANDARD_PURPOSES`）。未知の科目は黙って「その他」に
  寄せず error にする。自治体独自の款項目 → 標準分類のマッピング表もレビュー対象のデータ
- **フィクスチャ隔離**: `fixture: true` のソースの normalized 出力は
  `data/normalized/_fixtures/` に置かれ、アプリから import してはならない
- **2トラック戦略**: 総務省の統一 Excel（決算状況調・財政状況資料集）で「広く浅く」
  全国比較データを先に確保し、各自治体の予算書 PDF（LLM 併用: 抽出 → Zod 検証 →
  整合チェックで誤りを弾く）で「深く狭く」款項目節・事業・エビデンスを掘る
- **1ソース=複数ファイル可**: 実資料が複数ファイルに分かれる場合（例: 決算状況調の
  都市別/町村別 × 概況/目的別）は registry の `urls` に直リンクを列挙し、パーサが
  団体コードで facts をマージする。主 locator に加え `locators` で全出典位置を残す
- 政府系サイトは自動取得を弾くことがある（クラウド環境の DC IP は特に）。fetch は
  ブラウザ相当の UA を名乗るためローカルなら通ることが多い。弾かれたら landingPage
  から手動取得して `pipeline:ingest` で投入する（来歴には `manual:` として記録される）

### コマンド

```bash
bun run pipeline:fetch [sourceId]               # URL から raw へ取得（ハッシュ記録）
bun run pipeline:ingest <sourceId> <file>       # 手動取得ファイルの投入
bun run pipeline:parse <sourceId>               # raw → parsed（Zod 検証込み）
bun run pipeline:try-parse <parser> <file...> --opts '<JSON>'  # ドライラン（下記）
bun run pipeline:validate <sourceId>            # 整合チェック → ok / needs_review
bun run pipeline:normalize <sourceId> [--force] # parsed → normalized
bun run pipeline:fixture                        # 開発用フィクスチャ生成（e2e 検証用）
bun run pipeline:derive                         # normalized → アプリ用生成モジュール
```

予算書 PDF（テキスト層あり）のパースは poppler の `pdftotext` を使う（`brew install poppler`）。
スキャン画像 PDF や複雑な表（主な事業一覧など）は LLM 併用パーサ（抽出 → Zod 検証 →
整合チェック）で扱う。

**`pipeline:try-parse` は registry を触らないドライラン**（2026-07-16 追加）。手元のファイルに
パーサを直接当て、抽出できた款の全件と Σ照合を出す。`source-scout` は registry を書き換えない
制約があるため「この資料は既存パーサに乗るか」を**読解と推論だけ**で答えており、実際に外していた
（特別区24団体で3種類の誤報。docs/data-sources.md §10）。**推論を実測に変えるための道具**で、
収録前の当たりをつけるのにも使える。**これは検証ゲートではない** — registry に入れたら
`pipeline:validate` を必ず通す。

サーバー層ができるまでの normalized → アプリの接続は `pipeline:derive` で行う:
巨大な normalized JSON をクライアントに import せず、必要な断面だけを決定的に
`src/client/lib/*.gen.ts` へ生成してコミットする（例: 甲府の当初予算の `kofu.gen.ts`）。

断面が全国規模（数百KB〜）になるものは `.gen.ts` にせず **`public/` の静的 JSON** として
書き出し、**その画面でだけフェッチする**（静的 import は全ページのバンドルに載るため）。
現状の3つ: 決算シャード `public/decision/<県コード>.json`（県ごと）、データ整備状況
`public/coverage.json`、類似自治体比較の全国索引 `public/decision/similar-index.json`。
取得は `src/client/hooks/use*.ts`（モジュールキャッシュ＋in-flight 共有）に閉じる。

DB（Postgres）導入時は `data/parsed` `data/normalized` の中身がテーブルへ移り、
pipeline の各ステージはそのまま Repository 経由の書き込みに置き換わる。

---

## 11. 守るべきこと（チェックリスト）

新しいコードを書く前 / レビューする前に、これに沿っているか確認する。

- [ ] ビジネスロジックを `src/server/domains/[domain]/` の外に書いていない
- [ ] ドメインが `interface.ts` / `repository.ts` / `service.ts` / `route.ts` の 4 ファイル構成になっている
- [ ] `interface.ts` に DB / HTTP / Hono / Inversify の import が一切無い
- [ ] Service / Repository を `new` で直接生成していない（DI 経由のみ）
- [ ] `any` を使っていない（未確定なら `unknown` → 絞り込み）
- [ ] route で Zod バリデーションを通している
- [ ] route で CASL の `ability.can(...)` を通している
- [ ] クライアントから `fetch` を直接呼ばず、`rpc` 経由の React Query フックを使っている
- [ ] route のレスポンスは `c.json(...)` で返している（RPC 型推論のため）
- [ ] route の query を型付きで受けるなら `zValidator("query", …)` を通している（手で `c.req.query()` を読むとクライアント側に型が出ない）
- [ ] Repository を触るテストは Testcontainers の実 DB で走らせている
- [ ] `@ts-ignore` を使っていない
- [ ] Enter を扱う `onKeyDown` で IME 変換確定（`isComposing || keyCode === 229`）を無視している
- [ ] 実データとダミー・推計の区別（来歴の注記）を崩していない。金額を出す画面には出典（エビデンス）への導線がある
- [ ] 一次資料は registry に登録してから扱っている（`data/` に手でファイルを置かない）
- [ ] parsed の数値に locator（出所の位置情報）が付いている
- [ ] validate を通っていないデータを normalize していない（`--force` は理由をコミットメッセージに残す）
- [ ] フィクスチャ由来のデータ（`_fixtures/`）を実データと混ぜていない・アプリから import していない
