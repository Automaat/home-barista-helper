# Cloudflare Pages Deployment

## Overview

- **main** → testing/development
- **production** → auto-deploys to Cloudflare Pages (configured in Cloudflare)

## How It Works

1. Workflow syncs main → production branch
2. Cloudflare Pages auto-deploys on production push
3. Workflow waits for deployment and reports status

## Required GitHub Secrets

### Step 1: Get CLOUDFLARE_ACCOUNT_ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **Workers & Pages** from sidebar
3. Copy **Account ID** from right sidebar (under Account details)

OR find it in URL: `https://dash.cloudflare.com/<ACCOUNT_ID>/pages`

### Step 2: Get CLOUDFLARE_API_TOKEN

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **"Edit Cloudflare Workers"** template (or create custom)
4. Set permissions:
   - Account → Cloudflare Pages → **Read**
5. Click **Continue to summary**
6. Click **Create Token**
7. **Copy the token** (shown once only!)

### Step 3: Add Secrets to GitHub

1. Go to your repo: **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add first secret:
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (paste account ID)
4. Click **Add secret**
5. Add second secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (paste API token)
6. Click **Add secret**

## Workflow

### Production Deploy (`production-deploy.yml`)

**Trigger:** Manual (workflow_dispatch)

**Actions:**

1. Creates/updates `production` branch from `main`
2. Pushes to `production` branch
3. Waits for Cloudflare Pages deployment
4. Reports deployment URL and status

**Uses:** [WalshyDev/cf-pages-await](https://github.com/WalshyDev/cf-pages-await) to monitor deployment

**Usage:**

```bash
# Via GitHub UI
Actions → Production Deploy → Run workflow

# Via gh CLI
gh workflow run production-deploy.yml
```

## Deployment Flow

### Standard Release

```bash
# 1. Merge features to main
git checkout main
git pull

# 2. Trigger production sync
gh workflow run production-deploy.yml

# 3. Cloudflare deploys automatically
# Monitor: Cloudflare Pages dashboard or workflow logs
```

### Manual Deploy (Without Workflow)

```bash
git checkout production
git merge main
git push origin production
# Cloudflare auto-deploys
```

## Configuration

### Cloudflare Pages Project

**Project name:** `home-barista-helper` (change in `production-deploy.yml:61`)

**Build settings:**

- Framework: SvelteKit
- Build command: `pnpm build`
- Output directory: `build`
- Node version: 22 (from mise)

### Branch Protection (Recommended)

**production branch:**

- Require pull request reviews (optional)
- Require status checks (CI from main)
- Restrict push access

## Monitoring

**Deployment status:**

- GitHub Actions logs
- Cloudflare Pages dashboard
- Commit comments (deployment URL)

**Check deployment:**

```bash
gh run list --workflow=production-deploy.yml
gh run view <run-id>
```
