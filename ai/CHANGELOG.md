# Changelog

## 1.0.0
- Deployment validation:
  - Final build: 10 pages, 0 errors, 0 warnings.
  - All routes verified: /, /about, /articles, /case-studies, /case-studies/[id]×3, /community, /contact, /resume.
  - Static assets: sitemap.xml, robots.txt, CNAME, .nojekyll, OG image, profile image all present in dist.
  - Placeholder resume PDF in dist/resume/.
  - GitHub Actions workflow correctly configured for GitHub Pages deployment.
  - Lint and type check pass with zero issues.

## 0.6.0
- Polish & accessibility audit:
  - Moved hardcoded hero copy (badge, focus, approach, aside description, why-work) to `profile.json`.
  - Moved hardcoded GitHub description and footer tagline to `settings.json`.
  - Replaced literal href with `settings.github` in GithubSection.
  - Fixed 7 lint errors: replaced `var` with `const`, optional catch binding, added keyboard handlers and `tabIndex` for accessibility in CommandPalette backdrop/dialog.
  - Lint now passes cleanly with 0 errors.

## 0.5.0
- Wired real assets:
  - Created placeholder resume PDF at `public/resume/darshan-kc-resume.pdf`.
  - Profile image (`public/images/profile.svg`) already existed.
  - Formspree form ID kept as placeholder in settings.json per instruction.

## 0.4.0
- Added Command Palette (Ctrl+K) with search overlay:
  - Created `src/components/ui/CommandPalette.tsx` React island with keyboard shortcut, search filtering, arrow navigation, and grouped results (Pages, Case Studies, Articles, Actions).
  - Integrated into `BaseLayout.astro` with data passed as props from JSON files.
  - Added a subtle `⌘K` keyboard hint badge in the navbar.

## 0.4.0
- Added TypeScript interfaces for all JSON data files in `src/types/data.ts`.
- Added barrel export `src/types/index.ts`.
- Added Manrope heading font:
  - Added `display` font family in Tailwind config (ManropeVariable, Manrope).
  - Added Google Fonts preconnect + stylesheet link in BaseLayout (Inter + Manrope).
  - Applied Manrope to all headings via `global.css`.
- Added dedicated /articles route:
  - Created `src/pages/articles/index.astro` with article cards and empty state.
  - Added `id` / `published` fields to `articles.json`.
  - Updated `Article` interface in types with new fields.
  - Added "Articles" to navigation.json between Case Studies and Community.
  - Updated homepage ArticlesSection with year display and "View all articles" link.
  - Added /articles to sitemap.xml.

## 0.3.0
- Implemented SEO assets:
  - Added `public/sitemap.xml` with all 9 routes and priorities.
  - Added `public/robots.txt` allowing all crawlers with sitemap reference.
  - Added `public/images/og-default.svg` as a placeholder OG image (branded dark background, name, title, tagline).
  - Added `og:image` and `twitter:image` meta tags to `Seo.astro`.
  - Added `ogImage` property to `site.ts` config.

## 0.3.0
- Implemented Light/Dark theme system (M2, ADR-008):
  - Enabled `darkMode: "class"` and added a `button.fg` semantic color token.
  - Added a full `.dark` token block (neutral slate palette, BG #020617) and dark body gradient in `global.css`; fixed the previously-undefined `--color-surface-soft` token.
  - Replaced literal `bg-white`/`text-white`/`border-white` with token-backed `bg-surface`/`text-button-fg`/`border-surface` so dark mode flips via tokens only (no `dark:` variants, no redesign).
  - Added a no-flash inline init script in `BaseLayout` `<head>` (reads localStorage + prefers-color-scheme).
  - Added `ThemeToggle.tsx` React island in the navbar (Sun/Moon, `localStorage` key `theme`, accessible `aria-pressed`/`aria-label`).

## 0.2.0
- Verified dependencies install and static build passes (M0).
- Implemented multi-page architecture (M1):
  - Extracted shared `Navbar.astro` with active-route highlighting.
  - Moved shared chrome (navbar, main wrapper, footer) into `BaseLayout.astro`.
  - Converted `navigation.json` to route-based links.
  - Added pages: `/about`, `/case-studies`, `/case-studies/[id]`, `/community`, `/contact`, `/resume`.
  - Reframed `/` as an overview homepage.
  - Added per-card "Read case study" links and a static case-study detail template (problem, solution, architecture, challenges, lessons).
  - Fixed cross-page links in `profile.json`, `social.json`, and `GithubSection.astro`.

## 0.1.0
- Initial documentation created.
