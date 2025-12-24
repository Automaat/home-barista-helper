# Cloudflare Pages Deployment

## Overview

- **main** → testing/development
- **production** → auto-deploys to Cloudflare Pages (configured in Cloudflare)

## How It Works

1. Workflow syncs main → production branch
2. Cloudflare Pages auto-deploys on production push
3. Workflow waits for deployment and reports status

## Required GitHub Secrets

### CLOUDFLARE_API_TOKEN
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token → "Edit Cloudflare Workers" template
3. Permissions:
   - Account → Cloudflare Pages → Read
4. Copy token to GitHub secret

### CLOUDFLARE_ACCOUNT_ID
1. Go to Cloudflare Dashboard
2. Copy Account ID from URL or sidebar
3. Add to GitHub secret

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

**Project name:** `home-barista-helper` (change in `deploy-production.yml:43`)

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
gh run list --workflow=deploy-production.yml
gh run view <run-id>
```
