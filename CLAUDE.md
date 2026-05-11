<!-- LIVING DOCUMENT — keep current, no dated entries, no append-only changelog -->

# PickUp Sign — GitHub Pages Site (`pickup-sign-pages`)

Static HTML/CSS/JS site at **https://pick-up-sign.com**. GitHub Pages hosting, HTTPS auto-provisioned.

**Company:** Skella & Co Pty Ltd, ACN 624 414 179 | **Owner:** jamie@skella.com.au | **DNS:** VentraIP account `674970594`

---

## Critical Files (never delete)

| File | Why |
|---|---|
| `CNAME` | Custom domain. Deleting it breaks the domain instantly. |
| `.nojekyll` | Without it, Jekyll hides `.well-known/` directories. |
| `_config.yml` | `include: [".well-known", ".nojekyll"]` — backup to ensure both are served. |

---

## Localisation

12 languages: English `/` (root), Spanish `/es/`, French `/fr/`, Portuguese `/pt/`, Chinese `/zh/`, Japanese `/ja/`, Hindi `/hi/`, Arabic `/ar/`, Korean `/ko/`, German `/de/`, Italian `/it/`, Russian `/ru/`.

**Generator:** `~/.openclaw/workspace/tools/pickup-sign-i18n/i18n-bundle/generate-i18n-pages.py`
**Translations:** `~/.openclaw/workspace/tools/pickup-sign-i18n/i18n-bundle/translations/{lang}.json`

Run `python3 generate-i18n-pages.py` from the bundle dir with `pickup-sign-pages/` as a sibling. Fully idempotent — strips existing hreflang/lang-switch before inserting fresh ones. Safe to re-run.

Arabic page (`/ar/`) requires `dir="rtl"` on `<html>` and loads `rtl.css`. Confirm both are present after any regeneration.

All pages include `hreflang` tags; `x-default` → English. Each locale is self-canonical.

**Brand phrases are NOT translated:** "A Skella & Co Project" and "Skella & Co Pty Ltd" stay in English everywhere. Translation JSON files have no `footer_company` key on purpose.

---

## Design

- **Background:** `#0A0A0A` | **Accent/headings/CTAs:** `#FFCB00` | **Font:** General Sans (Fontshare)
- **No em dashes anywhere.** Use periods, commas, pipes, or parentheses. (See Slop Cop below.)
- **Copy perspective:** drivers displaying passenger names. Tagline "Their name. Your screen." Write from the driver's POV. Do not flip.
- **No "Download" button in the header.** Removed deliberately — hero has store badges. Do not re-add.
- **Testimonials are intentionally rough** — missing apostrophes, lowercase, no punctuation. Do not correct them.
- **Footer:** `footer__company` ("A Skella & Co Project") links to `https://skella.com.au/` in a new tab, colour inherited (not blue). `footer__copy` copyright line is NOT linked. These survive i18n regeneration — do not strip them.

### Phone mockup name formats

| Context | Name |
|---|---|
| Hero (landscape) | `Mr Smith` |
| Colour section | `J. Smith` |
| Bottom CTA (keyboard mockup) | `Smith, J` |

---

## Store Badges

- **App Store:** `app-store-badge.svg`, `height="50"` in HTML.
- **Google Play:** `google-play-badge-trimmed.png` (PNG, not SVG — SVG had rendering issues on GitHub Pages). Height set to `40px` via CSS (not the HTML attribute) because the GP badge has a grey outline adding visual padding. If badges look mismatched, adjust GP CSS height only.

---

## SEO

- **Google Search Console:** meta tag `content="ejWFzr8iY0uzBv1Js8k1pKQPFldJk3htjXQhQB-CeZg"` — do not remove.
- **Bing Webmaster Tools:** meta tag `content="299649B124E5D9AF5DEA553996F388E9"` — do not remove.
- **GSC "Alternative page with proper canonical tag"** for `/<locale>/index.html` URLs is expected and benign. GitHub Pages returns 200 for both `/<locale>/` and `/<locale>/index.html`; canonical points to the clean path; Google honours it. No action needed.
- OG image: `og-image-v2.png` (1200×630). If replacing, bump the filename suffix (`v3`, etc.) — do not overwrite in place. Social platforms cache by URL.

---

## Screenshots

Generated from English source screenshots. Only the top caption text is translated — device mockup and displayed name are untouched.

**Source sizes:** iPhone 2778×1284 | iPad 2732×2048 | Play featured 1024×500

**Font stack:** Latin → Inter ExtraBold Italic | CJK → Noto Sans CJK Bold | Arabic → Noto Sans Arabic Bold | Hindi → Noto Sans Devanagari Bold

Arabic captions use Arabic-Eastern numerals (١٠٠٪ not 100%) to avoid Noto Arabic glyph gaps.

Paint-over region must be precise — painting too wide clips the device mockup.

**Screenshot locations (in app repo, not here):** iOS → `ios/fastlane/screenshots/` | Android → `android/fastlane/metadata/android/`

---

## Outreach Campaign

Campaign against chauffeur operators: 169 rows, 113 delivered, 55 bounced, 1 spam complaint. **COMPLETE.**

An earlier LLM-agent sender corrupted 23 emails (wrong URLs, hallucinated features, em dashes, personalisation leaks). Apologies sent. Cron deleted. **Any future automated sender must pass literal text from a data file to Resend with no LLM in the path.**

---

## Cross-References

| Item | Value |
|---|---|
| App repo | `jamieskella/pickup-sign` |
| App Store listing | `https://apps.apple.com/app/pickup-sign/id6762237559` |
| Google Play listing | `https://play.google.com/store/apps/details?id=com.pickupsign.app` |
| Privacy policy (used in app) | `https://pick-up-sign.com/privacy/` |
| Terms of Use (used in app) | `https://www.apple.com/legal/internet-services/itunes/dev/stdeula/` |

---

## Slop Cop

Apply to all copy and outreach. Reference: https://awnist.com/slop-cop

- **No em dashes (`—`) or en dashes (`–`).** Periods, commas, pipes, or parentheses only.
- **No concession pairs** ("worth it, or should I leave you alone").
- **No triple constructions** except "iPhone, iPad, and Android" (canonical product list).
- **No filler openers/words:** "Let's dive in", "delve", "navigate", "seamless", "leverage", "unlock", "cutting-edge", "tapestry", "realm", "robust", "ever-evolving", "testament to", "game-changer", "nestled".
- **Signing:** "Jamie Skella" for B2B/operator emails; "Jamie" for peer-to-peer. No "Best", "Cheers", or warmth-tells.
- **Flattery only if verifiably accurate** about the specific recipient. If you can't verify it, don't.
