<!-- LIVING DOCUMENT DIRECTIVE
This file is the single source of truth for any AI agent working on this repo.
When you make changes to the project, update this document IN PLACE to reflect
current state. Remove what's no longer true. Add what's new. No dated entries,
no append-only changelog. This must always read as a clean, accurate snapshot
of the project right now. If you add a feature, update the relevant section.
If you remove something, delete its documentation here. Future agents depend
on this being correct. -->

# PickUp Sign — GitHub Pages Site Repo (`pickup-sign-pages`)

## Overview

Static HTML/CSS/JS landing site for PickUp Sign.  
**Live URL:** https://pick-up-sign.com  
**Hosting:** GitHub Pages  
**HTTPS:** Auto-provisioned by GitHub Pages  

**Company:** Skella & Co Pty Ltd, ACN 624 414 179, South Australia, Australia  
**Owner:** Jamie Skella — jamie@skella.com.au  

---

## DNS and Domain

- **Registrar/DNS:** VentraIP (account ID: 674970594)
- **DNS records:** 4× A records pointing to GitHub Pages IPs; CNAME `www` → `jamieskella.github.io`
- **`CNAME` file in repo root** — critical. If this file is deleted, the custom domain breaks immediately. Do not remove it.

---

## Required Files in Repo Root

| File | Purpose |
|---|---|
| `CNAME` | Custom domain — must always be present |
| `.nojekyll` | Tells GitHub Pages not to process with Jekyll, so `.well-known/` directories are served correctly |
| `_config.yml` | Contains `include: [".well-known"]` as a backup to ensure `.well-known/` is served |

---

## Multilingual Setup

The site is available in 12 languages:

| Language | Path |
|---|---|
| English | `/` (root) |
| Spanish | `/es/` |
| French | `/fr/` |
| Portuguese | `/pt/` |
| Chinese | `/zh/` |
| Japanese | `/ja/` |
| Hindi | `/hi/` |
| Arabic | `/ar/` |
| Korean | `/ko/` |
| German | `/de/` |
| Italian | `/it/` |
| Russian | `/ru/` |

### Generation

All non-English pages are generated from the English `index.html` as a template using:

- **Generation script:** `generate-i18n-pages.py` — this script lives OUTSIDE the repo (in the operator's workspace). It is NOT committed to this repo. If you need it, ask the project owner or check Perplexity Computer's workspace.
- **Translation source files:** `translations/{lang}.json` — also external to this repo, in the same workspace.

### After running the generation script

**CRITICAL BUG: The script adds a DUPLICATE language switcher block AND duplicate hreflang tags to the English `index.html` every time it runs.** After running the script, you MUST:
1. Open `index.html` and remove the second (duplicate) `lang-switch` div
2. Remove any duplicate `<link rel="alternate" hreflang=...>` blocks (keep only one set)

This is a known issue that has not been fixed in the script itself.

### Technical details

- All pages include `hreflang` tags; `x-default` points to English.
- The language switcher in the header uses a globe icon and a dropdown.
- A yellow auto-suggest bar detects `navigator.language` and suggests switching to the user's browser language.
- The Arabic page (`/ar/`) has `dir="rtl"` on `<html>` and loads `rtl.css`.

---

## Site Structure

```
/
├── index.html                          # English landing page
├── privacy/index.html                  # Privacy policy
├── robots.txt                          # Crawler and AI bot directives
├── llms.txt                            # Full product context for LLM ingestion
├── sitemap.xml                         # All 13 URLs with hreflang cross-references
├── humans.txt
├── og-image.png                        # 1200×630 Open Graph image
├── app-store-badge.svg                 # Official Apple Download on the App Store badge
├── google-play-badge-trimmed.png       # Google Play badge (trimmed PNG, used in HTML)
├── google-play-badge.svg               # Google Play badge SVG (grey outline added for dark bg)
├── CNAME
├── .nojekyll
├── _config.yml
├── .well-known/
│   ├── apple-app-site-association      # Universal links
│   ├── agent-skills/index.json         # AI agent skills discovery
│   ├── mcp/server-card.json            # MCP server card (SEP-1649)
│   └── api-catalog                     # Linkset pointing to llms.txt
├── es/index.html
├── fr/index.html
├── pt/index.html
├── zh/index.html
├── ja/index.html
├── hi/index.html
├── ar/index.html
├── ko/index.html
├── de/index.html
├── it/index.html
└── ru/index.html
```

### `index.html` (English landing page)

Contains the following Schema.org structured data:
- `WebSite`
- `Organization`
- `MobileApplication`
- `FAQPage`

### `privacy/index.html`

- Australian Privacy Act compliant
- References ACN 624 414 179
- Contact email `hello@skella.com.au` uses a click-to-reveal JS obfuscation pattern (sourced from the `wc-calendar` repo pattern)
- No plain-text email in the HTML source

### `robots.txt`

- Allows all major LLM bots
- Includes Content-Signal directives: `search=yes`, `ai-input=yes`, `ai-train=no`

### `sitemap.xml`

13 URLs total: 12 language homepages + privacy page. Each URL includes `xhtml:link` hreflang cross-references for all languages.

---

## Design System

### Colours

| Role | Value |
|---|---|
| Background | `#0A0A0A` (near-black) |
| Accent / headings / CTAs | `#FFCB00` (yellow) |
| Body text | White / light grey |

### Typography

- **Font:** General Sans via Fontshare
- **Fallback:** System fonts

### Copy rules

- **No em dashes anywhere in site copy.** This is a firm user directive. Use periods, commas, pipes, or parentheses instead.
- **Copy perspective:** The app is for DRIVERS displaying PASSENGER names. Write from the driver's perspective. The tagline "Their name. Your screen." reflects this correctly. Do not flip the framing.

### Testimonials section

Tongue-in-cheek humour with intentionally varied literacy levels — missing apostrophes, all-lowercase, missing punctuation. **Do not "fix" these.** They are deliberate.

### Footer

- "A Skella & Co Project" (not "Skella & Co Pty Ltd")
- No Support link
- Dynamic copyright year via inline JS
- **Brand phrases do NOT get translated.** "A Skella & Co Project" and "Skella & Co Pty Ltd" stay in English across every locale — they are brand/company names, not copy. The i18n generator does NOT rewrite the footer company line; translation JSON files no longer contain a `footer_company` key.
- **Only the `footer__company` brand phrase links to `https://skella.com.au/`** (opens in a new tab, inherits the footer text colour via `.footer__company a { color: inherit }` so it does not render blue). The `footer__copy` copyright line is intentionally NOT linked — two identical links in the same footer read as visual noise. The privacy page Section 9 contact block keeps its own link because it sits in body copy where a standard blue in-text link is contextually appropriate. These conventions survive i18n regeneration — do not strip them.

### Phone mockup name formats

Use realistic pickup sign formats in mockups and screenshots:

| Context | Name shown |
|---|---|
| Hero (landscape) | `Mr Smith` |
| Colour section | `J. Smith` |
| Bottom CTA (keyboard mockup) | `Smith, J` |

---

## Store Badges

### App Store badge

- File: `app-store-badge.svg`
- In HTML: `height="50"`

### Google Play badge

- File used in HTML: `google-play-badge-trimmed.png` (trimmed PNG version)
- The SVG version (`google-play-badge.svg`) has a grey outline rect added for dark background visibility, but it had rendering issues as an `<img>` on GitHub Pages, so the PNG is used.
- CSS controls the Google Play badge height:

```css
.app-badge--android img {
  height: 40px;
  width: auto;
  display: block;
}
```

**Visual matching rule:** The badges must appear the same visual height. The Google Play badge is set to 40px (not 50px like Apple) because the GP badge has a grey outline that adds visual padding. If they look mismatched, adjust the GP CSS height only — do not change the Apple badge height. Google Play guidelines require their badge to be "the same size or larger" than other store badges; 40px vs 50px is fine because the visual content areas match.

---

## SEO and Discovery

### Search Console verifications

- **Google Search Console:** Verified via HTML meta tag — `content="ejWFzr8iY0uzBv1Js8k1pKQPFldJk3htjXQhQB-CeZg"`
- **Bing Webmaster Tools:** Verified via meta tag — `content="299649B124E5D9AF5DEA553996F388E9"`
- Sitemaps submitted to both.

### Apple Smart Banner

Meta tag present for the app install prompt on iOS Safari.

### Agent readiness

- Score: 50/100 on isitagentready.com — this is the practical ceiling for a static GitHub Pages site.

---

## Localised Store Screenshots

Screenshots for App Store and Google Play are generated by a Python script from Jamie's original English source screenshots.

**Source sizes:**
- iPhone: 2778×1284
- iPad: 2732×2048
- Google Play featured: 1024×500

**What gets translated:** Only the top caption text. The device mockup and the name shown on the phone are left untouched.

**Font stack used for rendering:**

| Script | Font |
|---|---|
| Latin scripts | Inter ExtraBold Italic |
| Chinese, Japanese, Korean | Noto Sans CJK Bold |
| Arabic | Noto Sans Arabic Bold |
| Hindi | Noto Sans Devanagari Bold |

**Arabic numerals:** The Arabic screenshot uses Arabic-Eastern numerals (١٠٠٪ instead of 100%) to avoid missing glyphs in the Noto Arabic font.

**Paint-over region:** The region painted over for caption replacement must be precise. Painting too aggressively clips the device mockup — this happened previously and had to be corrected.

**Screenshot locations (in the app repo, not this repo):**
- App Store: `ios/fastlane/screenshots/`
- Google Play: `android/fastlane/metadata/android/`

---

## Cross-references

| Item | Value |
|---|---|
| App repo | `jamieskella/pickup-sign` |
| App Store listing | `https://apps.apple.com/app/pickup-sign/id6762237559` |
| Google Play listing | `https://play.google.com/store/apps/details?id=com.pickupsign.app` |
| Privacy policy URL (used in app) | `https://pick-up-sign.com/privacy/` |
| Terms of Use URL (used in app) | `https://www.apple.com/legal/internet-services/itunes/dev/stdeula/` |
| Marketing URLs | Per-locale paths used in App Store Connect and Google Play metadata |

---

## Pitfalls and Gotchas

- **Never delete the `CNAME` file.** The custom domain breaks instantly without it.
- **`generate-i18n-pages.py` duplicates the language switcher in `index.html` on every run.** After running it, manually remove the second `lang-switch` div from `index.html`.
- **`.nojekyll` must be present.** Without it, GitHub Pages' Jekyll processing hides `.well-known/` directories.
- **Arabic page requires `dir="rtl"` and `rtl.css`.** If you regenerate or modify the Arabic page, confirm these are in place.
- **Google Play badge visual height.** If the two store badges look mismatched, adjust the Google Play CSS `height` value, not the Apple badge.
- **Screenshot paint-over region.** Be conservative — painting too aggressively clips the device mockup.
- **Default language for Google Play is `en-GB`.** Metadata files and changelog files must use `en-GB` locale, not `en-AU`.
- **Testimonials are intentionally imperfect.** Do not correct grammar or punctuation in the testimonials section.
- **No em dashes.** This applies everywhere in site copy — body, FAQs, testimonials, footer — everywhere.
- **CSS files:** `base.css` (shared reset/variables), `style.css` (main layout), `rtl.css` (Arabic overrides). `app.js` handles the language detection bar and any interactive elements.
- **OG image:** `og-image.png` is 1200×630. If updating, keep these exact dimensions for social card rendering.
- **Google Search Console / Bing verification tags are in `<head>`.** Do not remove them during HTML edits.
