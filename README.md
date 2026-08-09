# Darshan KC — Portfolio v2

[![Build & Deploy](https://github.com/darshkc/portfolio_v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/darshkc/portfolio_v2/actions/workflows/deploy.yml)

Professional portfolio and case studies for **Darshan KC**, built as a fully static site.  
Live at **[darshanchhetri.com.np](https://darshanchhetri.com.np)**.

> **SEO:** Everything related to search optimization — meta tags, structured data, sitemap, robots, and the RSS feed — is documented in [`SEO.md`](./SEO.md).

---

## Tech Stack

| Layer         | Technology                                              |
| ------------- | ------------------------------------------------------- |
| Framework     | [Astro](https://astro.build) 7 — static site generation |
| Language      | TypeScript (strict mode)                                |
| Styling       | Tailwind CSS 3.4 + `@tailwindcss/typography`            |
| Interactivity | React 19 islands (Command Palette, Theme Toggle)        |
| Icons         | Lucide React + hand-rolled inline SVGs                  |
| Data Layer    | Plain JSON (`src/data/`)                                |
| Deployment    | GitHub Pages via GitHub Actions                         |
| Fonts         | Inter, Manrope, JetBrains Mono                          |

## Features

- **Dark/Light mode** — persisted in `localStorage`, no FOUC
- **Command palette** — `Ctrl+K` to quickly navigate anywhere
- **Scroll-reveal animations** — Intersection Observer with reduced-motion support
- **SEO & structured data** — Open Graph, Twitter Cards, JSON-LD (Person, Article schemas)
- **Responsive & accessible** — WCAG 2.2 AA target, semantic HTML, keyboard nav, `aria-*` attributes
- **Static case studies & articles** — auto-generated pages from JSON data
- **Contact form** — Formspree integration
- **Lighthouse ≥95** — optimized images, lazy loading, font-display swap

## Project Structure

```
src/
├── data/            # All content as JSON files
├── types/           # TypeScript interfaces for data layer
├── lib/             # Site-wide constants
├── layouts/         # BaseLayout (SEO, nav, footer, theme)
├── pages/           # Route pages (index, about, contact, 404, etc.)
├── sections/        # Page sections (hero, projects, skills, etc.)
├── components/      # Layout & UI components
│   ├── layout/      # Navbar, SEO
│   └── ui/          # CommandPalette, ThemeToggle, Icons, etc.
└── styles/          # Global CSS + theme variables
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Type-check + production build
npm run preview      # Preview production build locally
npm run lint         # ESLint
npm run format       # Prettier (format all files)
npm run format:check # Check formatting
```

## Architecture

Content lives in `src/data/*.json` files. Astro pages consume JSON at build time, passing data through sections and components. Only interactive elements (Command Palette, Theme Toggle) use React — everything else is static HTML. The site compiles to a fully static `dist/` deployed to GitHub Pages.

The `v1/` directory is legacy reference only — v2 must not import from it.
