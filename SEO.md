# SEO — Search Engine Optimization

This file explains how search engine optimization works in this portfolio, what each page emits, and how to extend it. It is the single source of truth for anything related to meta tags, structured data, sitemaps, feeds, and indexing.

## Overview

The site is fully static (Astro) and ships SEO out of the box:

| Feature                                        | Status |
| ---------------------------------------------- | ------ |
| Per-page `<title>` and meta description        | ✓      |
| Canonical URLs                                 | ✓      |
| Open Graph (Facebook / LinkedIn)               | ✓      |
| Twitter cards                                  | ✓      |
| `robots` meta (index / noindex)                | ✓      |
| JSON-LD structured data (Schema.org)           | ✓      |
| `sitemap-index.xml`                            | ✓      |
| `robots.txt`                                   | ✓      |
| RSS feed (`/rss.xml`)                          | ✓      |
| Semantic heading hierarchy (one `h1` per page) | ✓      |
| Fast static HTML (Lighthouse SEO 100 target)   | ✓      |

---

## How it works

### 1. Central SEO component — `src/components/layout/Seo.astro`

Every page is wrapped in `BaseLayout` (`src/layouts/BaseLayout.astro`), which renders `<Seo />` in the `<head>`.

Supported props (all optional):

| Prop                                                | Purpose                                                  |
| --------------------------------------------------- | -------------------------------------------------------- |
| `title`                                             | `<title>` and `og:title`/`twitter:title`                 |
| `description`                                       | meta description + social descriptions                   |
| `canonicalPath`                                     | sets `<link rel="canonical">` and `og:url`               |
| `image` / `imageAlt` / `imageWidth` / `imageHeight` | Open Graph + Twitter image                               |
| `type`                                              | `og:type` — `website` (default), `article`, or `profile` |
| `noindex`                                           | emits `noindex, nofollow` (used on the 404 page)         |
| `publishedTime` / `modifiedTime`                    | `article:published_time` / `article:modified_time`       |
| `schema`                                            | JSON-LD object or array rendered as `@graph`             |

Defaults come from `src/lib/site.ts`.

### 2. Structured data — `src/lib/schema.ts`

All Schema.org builders live here as pure functions. Each page composes its own graph:

| Schema           | Where                                      |
| ---------------- | ------------------------------------------ |
| `Person`         | Homepage (via `personSchema`)              |
| `WebSite`        | Homepage                                   |
| `WebPage`        | Static pages (e.g. `/resume`)              |
| `ProfilePage`    | `/about`                                   |
| `ContactPage`    | `/contact`                                 |
| `CollectionPage` | `/articles`, `/case-studies`, `/community` |
| `Article`        | Each article detail page                   |
| `TechArticle`    | Each case study detail page                |
| `BreadcrumbList` | Every page below the homepage              |

The `Person` schema includes `sameAs` (GitHub + LinkedIn from `src/data/social.json`), `knowsAbout` (from `src/data/profile.json` focus and `src/data/skills.json`), email, location, and image — this is what powers the Google "knowledge panel" style profile signals.

### 3. Sitemap — `astro.config.mjs`

Uses `@astrojs/sitemap`. Pages are filtered so the 404 page is excluded. The generated `sitemap-index.xml` is referenced from `public/robots.txt`.

### 4. Robots — `public/robots.txt`

Allows crawling of everything except the 404 page, and points crawlers at the sitemap.

### 5. RSS feed — `src/pages/rss.xml.ts`

A static XML endpoint that renders every article from `src/data/articles.json` as an RSS 2.0 feed (newest first). The feed is linked from every page via `<link rel="alternate" type="application/rss+xml">`, which search engines and feed readers discover automatically.

### 6. On-page structure

- Every template page has exactly one `<h1>` (sections render `h2` by default; standalone pages promote the first section to `h1` via the `headingLevel` prop on `SectionWrapper`).
- Detail pages (`/articles/[slug]`, `/case-studies/[slug]`) use `article`/`TechArticle` markup.
- The 404 page is `noindex` and emits no canonical.

---

## Page-by-page breakdown

| Route                  | Title                                       | Description              | JSON-LD                            |
| ---------------------- | ------------------------------------------- | ------------------------ | ---------------------------------- |
| `/`                    | `siteConfig.title`                          | `siteConfig.description` | `WebSite`, `Person`                |
| `/about`               | About Darshan KC · Backend Engineer         | summary + location       | `ProfilePage`, `BreadcrumbList`    |
| `/contact`             | Contact Darshan KC · Backend Engineer       | role/collab pitch        | `ContactPage`, `BreadcrumbList`    |
| `/community`           | Community Work · Darshan KC                 | workshops/mentoring      | `CollectionPage`, `BreadcrumbList` |
| `/resume`              | Resume · Darshan KC · Backend Engineer      | resume pitch             | `WebPage`, `BreadcrumbList`        |
| `/articles`            | Articles · Darshan KC · Backend Engineering | articles intro           | `CollectionPage`, `BreadcrumbList` |
| `/articles/[slug]`     | `{article.title} · Darshan KC`              | `article.summary`        | `Article`, `BreadcrumbList`        |
| `/case-studies`        | Engineering Case Studies · Darshan KC       | case studies intro       | `CollectionPage`, `BreadcrumbList` |
| `/case-studies/[slug]` | `{project.title} · Case Study · Darshan KC` | `project.summary`        | `TechArticle`, `BreadcrumbList`    |
| `/404`                 | Not Found · Darshan KC                      | —                        | none (`noindex`)                   |

---

## How to update

### Titles and descriptions

- **Global defaults** → `src/lib/site.ts`
- **Per page** → the `<BaseLayout ...>` props at the top of each `src/pages/*.astro` file

### Social / profile links used in the `Person` schema

Edit `src/data/social.json`. External HTTP(S) links are automatically added to `sameAs`.

### Keywords / `knowsAbout`

Edit `profile.focus` in `src/data/profile.json` or the items in `src/data/skills.json`.

### Add a new schema

1. Add a builder function in `src/lib/schema.ts`.
2. Pass it in the `schema` prop of the page's `<BaseLayout>`.

### Open Graph images

- Default image + dimensions: `src/lib/site.ts` (`ogImage`, `ogImageWidth`, `ogImageHeight`).
- Per-page override: `image` / `imageWidth` / `imageHeight` props on `<BaseLayout>`.
- Keep the image at 1200×630 (JPG/PNG) for best social rendering.

### Twitter / X handle

Add your handle (e.g. `@yourhandle`) to `twitterHandle` in `src/lib/site.ts`. When empty, `twitter:site` / `twitter:creator` are omitted.

---

## How to verify

```bash
npm run build      # type-check + build, generates sitemap-index.xml + rss.xml
npm run preview    # serve dist/ locally
```

Then check:

1. **Per page** — view source and confirm `<title>`, meta description, canonical, `og:`, `twitter:`, and a `application/ld+json` block.
2. **Structured data** — paste a page URL into Google's [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).
3. **Sitemap** — visit `/sitemap-index.xml` and confirm the 404 page is absent.
4. **RSS** — visit `/rss.xml` and confirm valid XML with all articles.
5. **Indexing** — submit `/sitemap-index.xml` and `/rss.xml` in [Google Search Console](https://search.google.com/search-console). Add `https://darshanchhetri.com.np` as a property if not already done.
6. **Lighthouse** — run an audit; the SEO category should score 100.

---

## Related docs

- `docs/08-seo.md` — high-level SEO goals
- `docs/adr/ADR-009-seo-strategy.md` — accepted SEO strategy decision
- `README.md` — project overview and commands
