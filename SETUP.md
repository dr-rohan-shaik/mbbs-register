# Maintainer Setup Guide

This guide walks you through running is-a.mbbs yourself.

## Prerequisites

- A domain you own (e.g. `is-a.mbbs.in` or `mbbsdev.com`)
- A free [Cloudflare](https://cloudflare.com) account
- A GitHub account to host this repo

---

## Step 1: Register a Domain

Since `.mbbs` is not an official TLD, pick a domain that represents the concept, for example:

- `is-a.mbbs.in` (if you can register `mbbs.in`)
- `mbbsdomain.com`
- `get.mbbsdomain.in`

Register it via any domain registrar (Namecheap, GoDaddy, Hostinger, etc.).

---

## Step 2: Set Up Cloudflare

1. Create a free Cloudflare account at https://cloudflare.com
2. Add your domain and point your registrar's nameservers to Cloudflare's.
3. Go to **My Profile → API Tokens** and create a token with:
   - Permission: **Zone → DNS → Edit**
   - Zone Resources: your specific zone
4. Note down your **Zone ID** from the domain overview page.

---

## Step 3: Configure GitHub Secrets

In your GitHub repo, go to **Settings → Secrets → Actions** and add:

| Secret Name    | Value                            |
|----------------|----------------------------------|
| `CF_API_TOKEN` | Your Cloudflare API token        |
| `CF_ZONE_ID`   | Your Cloudflare Zone ID          |
| `BASE_DOMAIN`  | e.g. `is-a.mbbs.in`             |

---

## Step 4: Enable GitHub Actions

The workflows in `.github/workflows/` handle everything automatically:

- `validate.yml` — runs on every PR, checks JSON files
- `deploy.yml` — runs on merge to `main`, pushes records to Cloudflare

---

## Step 5: Merge PRs and Watch DNS Go Live

When you merge a PR, records are deployed to Cloudflare in ~30 seconds.
DNS propagation takes 1–5 minutes after that.

---

## Optional: Custom Subdomain UI

You can build a simple web interface at your base domain to let people check availability and see registered subdomains. A Next.js or Astro site reading from the `domains/` folder works great.
