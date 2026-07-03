# Project State
Version: 1.0.0
Status: Ready for deployment
Completed: All milestones — build verification (M0), multi-page split (M1), Light/Dark theme system (M2), SEO assets (M2), TypeScript interfaces (M4), Manrope heading font (M5), /articles route (M6), Command palette (M1), Real assets (M3), Polish & lint cleanup (M7), Deployment validation (M8)
Next: Push to main to trigger GitHub Pages deployment.

## Routes
- / (home overview)
- /about
- /articles
- /case-studies
- /case-studies/[id]
- /community
- /contact
- /resume

## Theme System (ADR-008)
- `darkMode: "class"`; `dark` class on <html>.
- Tokens redefined under `.dark` in global.css (neutral slate, BG #020617). No per-component `dark:` variants.
- Literal `bg-white`/`text-white`/`border-white` replaced with `bg-surface`/`text-button-fg`/`border-surface` tokens.
- No-flash inline script in BaseLayout head; React island `ThemeToggle.tsx` in Navbar persists choice to localStorage (key: `theme`).
