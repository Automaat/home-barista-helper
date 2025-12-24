# Cloudflare Pages Deployment

## Overview

- **main** → testing/development
- **production** → Cloudflare Pages deployment (manual trigger)

## Required GitHub Secrets

Configure in repo Settings → Secrets and variables → Actions:

### CLOUDFLARE_API_TOKEN
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token → "Edit Cloudflare Workers" template
3. Permissions:
   - Account → Cloudflare Pages → Edit
4. Copy token to GitHub secret

### CLOUDFLARE_ACCOUNT_ID
1. Go to Cloudflare Dashboard
2. Select your account
3. Copy Account ID from URL or sidebar
4. Add to GitHub secret

## Workflow

### Production Deploy (`production-deploy.yml`)

**Trigger:** Manual (workflow_dispatch)

**Single workflow that:**
1. Creates/updates `production` branch from `main`
2. Builds SvelteKit app
3. Deploys to Cloudflare Pages
4. Checks deployment status
5. Comments deployment URL on production branch commit

**Usage:**
```bash
# Via GitHub UI
Actions → Production Deploy → Run workflow

# Via gh CLI
gh workflow run production-deploy.yml
```

**Deployment URL:** Posted as commit comment on production branch

## Deployment Flow

### Standard Release
```bash
# 1. Merge features to main
git checkout main
git pull

# 2. Run production deploy workflow
gh workflow run production-deploy.yml

# 3. Check deployment status
gh run list --workflow=production-deploy.yml
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
