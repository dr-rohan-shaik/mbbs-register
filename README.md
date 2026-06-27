# is-a.mbbs

[![Domains](https://img.shields.io/github/directory-file-count/dr-rohan-shaik/register/domains?color=4e9af1&label=domains&style=for-the-badge)](domains/)
[![Open Pull Requests](https://img.shields.io/github/issues-pr-raw/dr-rohan-shaik/register?color=4e9af1&label=pull%20requests&style=for-the-badge)](../../pulls)
[![Open Issues](https://img.shields.io/github/issues-raw/dr-rohan-shaik/register?color=4e9af1&label=issues&style=for-the-badge)](../../issues)

```
 _  _     __  __  ____  ____  ____
(_)(_)   (  \/  )(  _ \(  _ \/ ___)
 _  _    ) )  ( ( ) _ ( ) _ (\___ \
(_)(_)  (_/    \_)(____/(____/(____/
```

> **is-a.mbbs** — Free subdomains for medical students, doctors, and healthcare professionals.
> Get your own `yourname.mbbs` subdomain for your portfolio, clinic, or med project.

---

## 🩺 What is this?

**is-a.mbbs** is a free subdomain service built for the medical and healthcare community. Whether you're an MBBS student, a resident, a doctor, or building a health-tech project — you can claim a beautiful `.mbbs` subdomain and point it anywhere you want.

Examples of what you can do:
- `rohan.mbbs` → your personal medical portfolio
- `chillmedlife.mbbs` → your medical content brand
- `rxnotes.mbbs` → your study notes site
- `drsmith-clinic.mbbs` → a clinic landing page

---

## 📋 How to Register

> **Note:** `.mbbs` is a custom subdomain service. DNS is managed via Cloudflare on a domain you own (e.g., `is-a.mbbs.in` or `mbbs.community`). See [Setup Guide](#️-setup-for-maintainers) for maintainers.

1. **[Fork](../../fork)** this repository.
2. Create a new JSON file inside the `domains/` folder named `your-subdomain.json`.
3. Fill in the JSON following the [schema below](#-domain-file-schema).
4. Open a **Pull Request** — keep an eye on it in case changes are requested.
5. Once merged, your DNS records go live within minutes. 🎉

---

## 📄 Domain File Schema

Create a file at `domains/your-subdomain.json`:

```json
{
  "description": "My medical portfolio site",
  "repo": "https://github.com/your-github-username/your-repo",
  "owner": {
    "username": "your-github-username",
    "email": "your@email.com"
  },
  "record": {
    "CNAME": "your-github-username.github.io"
  }
}
```

### Supported Record Types

| Type    | Example Value                        | Use Case                        |
|---------|--------------------------------------|---------------------------------|
| `CNAME` | `yourname.github.io`                 | GitHub Pages, Vercel, Netlify   |
| `A`     | `["192.0.2.1"]`                      | VPS / custom server             |
| `AAAA`  | `["2001:db8::1"]`                    | IPv6 server                     |
| `TXT`   | `["v=spf1 include:..."]`             | Email / verification            |
| `MX`    | `[{"priority": 10, "value": "..."}]` | Email routing                   |
| `URL`   | `"https://example.com"`              | Simple redirect                 |

> ⚠️ You may only register a subdomain that represents **you or your project**. Squatting, reselling, or impersonating others is not allowed.

---

## ✅ Domain Rules

- The subdomain name must be lowercase and may contain letters, numbers, and hyphens.
- You must own or be affiliated with the content you are pointing to.
- No NSFW, harmful, or misleading content.
- No impersonation of real doctors, medical institutions, or brands.
- Medical misinformation sites will be removed.
- One domain per person per PR (you can submit more later).
- Abandoned or broken domains may be removed after notice.

See [TERMS_OF_SERVICE.md](TERMS_OF_SERVICE.md) for the full list.

---

## 🛠️ Setup for Maintainers

This repo is designed to be used with **[DNSControl](https://stackexchange.github.io/dnscontrol/)** or a custom GitHub Actions CI that reads from the `domains/` folder and pushes records to Cloudflare.

### Quick Setup

1. Register a domain (e.g. `is-a.mbbs.in` or `mbbsdev.com`).
2. Point it to Cloudflare nameservers.
3. Add `CF_API_TOKEN` and `CF_ZONE_ID` as GitHub Actions secrets.
4. The `/.github/workflows/deploy.yml` action will auto-deploy on every PR merge.

See [SETUP.md](SETUP.md) for the full maintainer guide.

---

## 🚨 Report Abuse

Found a subdomain violating the rules or spreading medical misinformation?
[Create an issue](../../issues/new?labels=report-abuse&template=report-abuse.md&title=Report+Abuse) with evidence.

---

## 💙 Credits

Inspired by [is-a.dev](https://github.com/is-a-dev/register) — the original free subdomain service for developers.

Built for the medical community. ❤️‍🩹
