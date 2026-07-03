# Handoff
Last completed: Deployment validation — final build (10 pages, 0 errors), all routes verified, workflow ready, all static assets in dist. Project is ready for production deployment. Push to main to trigger GitHub Pages deployment.

Notes:
- Dark mode flips entirely via CSS variables in `global.css` (`.dark` block). Avoid adding `dark:` utility variants — add/adjust tokens instead to keep both themes consistent.
- Primary buttons use `bg-ink-950 text-button-fg`; `--color-button-fg` inverts in dark so they stay readable.
- Theme choice persists in `localStorage` under key `theme`; the inline head script sets the `dark` class before paint to avoid flashes.
- Sections remain JSON-driven; pages compose sections inside BaseLayout.
