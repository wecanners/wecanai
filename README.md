# WeCan AI — Website

Static, bilingual (English + Arabic) marketing site for WeCan AI.
No framework, no build step. Plain HTML, CSS and vanilla JavaScript.
Designed to be hosted on GitHub Pages now, and moved to a custom domain
(`wecanai.me`) via Cloudflare later with zero SEO rework.

---

## 1. What is in this repo

```
index.html              English homepage
about.html              English: About
ai-upskilling.html      English: AI Upskilling program
faq.html                English: FAQ (12 Q&As, FAQPage schema)
contact.html            English: Contact (mailto form)
blog.html               English: Blog index
blog/                   6 English blog posts
ar/                     Full Arabic mirror (RTL): index, about,
                        ai-upskilling, faq, contact, blog + ar/blog/ (6 posts)
assets/css/style.css    Design system (LTR + RTL)
assets/js/main.js       Nav, FAQ accordion, scroll reveal, form
assets/img/og-default.png   Social-share image (1200x630)
robots.txt              Crawl rules  (see section 4 — IMPORTANT)
sitemap.xml             All 24 URLs with hreflang alternates
404.html                Custom not-found page
CNAME.txt               Custom domain file, INERT until cutover (see section 4)
```

24 indexable pages: 12 English, 12 Arabic. Every page has rewritten SEO
metadata, one H1, JSON-LD structured data, a canonical tag, and a full
hreflang set pairing it with its language counterpart.

---

## 2. Deploy now (GitHub Pages, staging)

1. Create a GitHub repository (for example `wecanai-site`).
2. Push the contents of this folder to the `main` branch as-is.
   The custom-domain file ships as `CNAME.txt`, which GitHub ignores, so it
   will not interfere with staging. You activate it later (section 4).
3. In the repo: **Settings → Pages → Build and deployment**.
   Set Source to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After a minute the site is live at
   `https://<username>.github.io/<repo>/`.

Because all internal links are relative, the site works correctly on the
project-pages subpath without any change.

### Why indexing is blocked on the staging URL

The `robots.txt` in this repo currently contains `Disallow: /`. This is
deliberate. While the site lives on the `github.io` address, you do **not**
want Google to index that copy, because the canonical tags and sitemap all
point at the final domain `wecanai.me`. Indexing the staging copy would
create a duplicate-content situation. The staging site stays fully testable;
it is just hidden from search engines until cutover.

---

## 3. Local preview

From this folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Opening the HTML files directly with
`file://` also works, but a local server matches production behaviour.

---

## 4. Cutover to wecanai.me (Cloudflare) — later

Do these steps when you are ready to move from the staging URL to the real
domain. After this, **no URLs change and no SEO rework is needed**, because
every canonical, every hreflang tag and the entire sitemap were written for
`https://wecanai.me` from the start.

**Step A — activate the domain file.**
Rename `CNAME.txt` to `CNAME` (no extension) and push. Its contents are
already correct, exactly:

```
wecanai.me
```

In GitHub: **Settings → Pages → Custom domain**, enter `wecanai.me`, save.

**Step B — point DNS at GitHub Pages via Cloudflare.**
In the Cloudflare dashboard for `wecanai.me`, add these DNS records:

```
Type   Name   Value
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    <username>.github.io
```

Set the records to "DNS only" (grey cloud) first. Once GitHub confirms the
custom domain and issues its certificate, you may enable Cloudflare proxying
(orange cloud) if you want Cloudflare's CDN and caching. Enable
"Enforce HTTPS" in GitHub Pages settings.

**Step C — open the site to search engines.**
Edit `robots.txt`:
- Delete the line `Disallow: /`
- Uncomment the line `Allow: /`
Commit and push.

**Step D — register with Google.**
In Google Search Console, add `https://wecanai.me` as a property and submit
`https://wecanai.me/sitemap.xml`. Optionally do the same in Bing Webmaster
Tools.

That is the whole cutover. Four steps, no link rewriting.

---

## 5. Things to replace with real assets

The build uses one generated placeholder image:

- `assets/img/og-default.png` — the social-share card. It is on-brand and
  fully functional, but you may want to swap in a photographed or
  professionally designed version. Keep the same path and the 1200x630 size
  so every page's Open Graph tag keeps working.

The original Squarespace site also linked several PDFs (enterprise brochure,
individual brochure, policy document). They are not bundled here. If you want
them on the new site, add the PDF files to the repo and link them from
`about.html` (and `ar/about.html`).

---

## 6. Editing content

### Blog posts
The 6 blog posts were migrated from the old site. The Meta AI Scandal post is
built out as the fullest example; the other five are SEO-complete and end with
a line noting the full article will be published here. To expand any post,
open the corresponding file in `blog/` (English) and `ar/blog/` (Arabic) and
replace the body text. Keep the `<h1>`, the JSON-LD blocks and the hreflang
tags intact.

To add a **new** post:
1. Copy an existing post file in `blog/` and in `ar/blog/`.
2. Update the title, description, canonical, hreflang, dates, JSON-LD and body.
3. Add a card for it on `blog.html` and `ar/blog.html`.
4. Add two new `<url>` entries to `sitemap.xml` (English + Arabic).

### Generator scripts
The Arabic pages and the blog posts were produced by Python scripts kept
outside this repo (`gen_*.py`). They are not needed to run or deploy the site.
The HTML files are the source of truth; edit the HTML directly.

---

## 7. SEO summary

- Titles rewritten, keyword-front-loaded; English titles kept short.
- One `<h1>` per page; semantic heading order.
- JSON-LD: Organization, LocalBusiness, Course, AboutPage, ContactPage,
  FAQPage, Blog, BlogPosting and BreadcrumbList, as appropriate per page.
- Canonical tag on every indexable page, pointing at `wecanai.me`.
- Full hreflang pairs (`en`, `ar`, `x-default`) on every page, reciprocal.
- `sitemap.xml` with hreflang alternates; `robots.txt` references it.
- Open Graph and Twitter Card tags on every page; all asset URLs use HTTPS.
- Accessible: skip-friendly nav, `aria` attributes, focus styles,
  `prefers-reduced-motion` support.
- Fast: two small static assets, system-friendly fonts loaded with
  `preconnect`, no framework or render-blocking scripts.

---

(c) WeCan AI. Masdar City, Abu Dhabi, United Arab Emirates.
