import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "var(--color-ink-950)",
          900: "var(--color-ink-900)",
          800: "var(--color-ink-800)",
          700: "var(--color-ink-700)",
          600: "var(--color-ink-600)",
          500: "var(--color-ink-500)",
        },
        paper: {
          50: "var(--color-paper-50)",
          100: "var(--color-paper-100)",
          200: "var(--color-paper-200)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          soft: "var(--color-surface-soft)",
          muted: "var(--color-surface-muted)",
        },
        accent: {
          100: "var(--color-accent-light)",
          500: "var(--color-accent)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
        },
        signal: {
          green: "#16a34a",
          cyan: "#0891b2",
          amber: "#d97706",
        },
        button: {
          fg: "var(--color-button-fg)",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      fontFamily: {
        sans: [
          "InterVariable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "ManropeVariable",
          "Manrope",
          "InterVariable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [typography],
};
