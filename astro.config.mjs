import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = "https://darshanchhetri.com.np";

export default defineConfig({
  site,
  output: "static",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  build: {
    assets: "_assets",
  },
  prefetch: true,
});
