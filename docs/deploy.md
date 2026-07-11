# デプロイ手順 (Cloud Run)

> **現状: 未構築。** このドキュメントは参照プロジェクトと同じ構成
> （Cloud Run + Terraform + Artifact Registry + Workload Identity Federation + GitHub Actions）で
> 構築するときの手順の雛形。`infra/terraform/` と `.github/workflows/deploy.yml` は未作成。

## 構成方針

- リージョン: `asia-northeast1`
- サービス: `web`（Next.js standalone）。DB 導入後は `migrate` Job を追加
- シークレットの prefix: `yosan-trace`（例: `yosan-trace-DATABASE_URL`）
- GitHub Actions からのデプロイは WIF（キーレス）。GitHub Secrets には資格情報を置かない
- 公開サイトなので Cloud Run は `allUsers` に公開（組織ポリシー `iam.allowedPolicyMemberDomains` に注意 — 下記）

## 初期構築 (一度だけ)

1. **state バケットを手で作る** (chicken-egg 回避)
   ```bash
   gcloud storage buckets create gs://<PROJECT>-tfstate \
     --location=asia-northeast1 --uniform-bucket-level-access
   gcloud storage buckets update gs://<PROJECT>-tfstate --versioning
   ```

2. **Terraform で基盤作成** (image の既定を `gcr.io/cloudrun/hello` にしておくと初回もそのまま通る)
   ```bash
   cd infra/terraform
   cp terraform.tfvars.example terraform.tfvars   # project_id, github_repository を記入
   cp backend.hcl.example backend.hcl             # state バケット名を記入
   terraform init -backend-config=backend.hcl
   terraform apply
   ```

3. **シークレットの値を投入**（DB 導入後。現状の UI のみ構成なら不要）
   ```bash
   PREFIX=yosan-trace
   for KEY in DATABASE_URL; do
     printf '%s' "${!KEY}" | gcloud secrets versions add "${PREFIX}-${KEY}" --data-file=-
   done
   ```

4. **GitHub Variables を登録** (Secrets は不要)
   ```bash
   gh variable set GCP_PROJECT_ID --body "<PROJECT>"
   gh variable set GCP_REGION     --body "asia-northeast1"
   gh variable set AR_REPO        --body "yosan-trace"
   gh variable set WIF_PROVIDER   --body "$(terraform -chdir=infra/terraform output -raw wif_provider)"
   gh variable set DEPLOYER_SA    --body "$(terraform -chdir=infra/terraform output -raw deployer_service_account)"
   ```

## 通常のデプロイ（構築後）

`main` に push (PR をマージ) すると CI が自動で:

```
build/push (web [/ migrate])
 → (migrate Job 実行 — DB 導入後。--wait, 失敗で停止)
 → web デプロイ → traffic 100% to-latest
```

手動で回すなら GitHub Actions の **Run workflow** (workflow_dispatch) でも可。

## 詰まりどころ (参照プロジェクトでの既知事象)

| 症状 | 原因 / 対応 |
| --- | --- |
| `Image '.../web:latest' not found` | 初回 image 未 push。→ image 既定を hello にしておく |
| `Secret .../versions/latest was not found` | シークレット未投入のままマウント。→ 使うものだけ値を投入してからマウント対象に追加 |
| `users named in the policy do not belong to a permitted customer` | 組織ポリシー `iam.allowedPolicyMemberDomains` が `allUsers` を拒否。→ 組織レベルで Allow All に上書き (要 `roles/orgpolicy.policyAdmin`、Owner では不可) |

## 残タスク（構築時に作るもの）

- [ ] `Dockerfile`（Next.js standalone 出力。`next.config.mjs` に `output: "standalone"` を追加）
- [ ] `infra/terraform/`（Cloud Run / Artifact Registry / Secret Manager / WIF / deployer SA）
- [ ] `.github/workflows/deploy.yml`（build → push → deploy。DB 導入後は migrate Job を挟む）
- [ ] `public/mapdata/`（約 7.7MB）を image に含める前提でサイズ確認
