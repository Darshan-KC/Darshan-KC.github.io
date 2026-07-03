import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = "https://darshanchhetri.com.np";

export default defineConfig({
  site,
  output: "static",
  integrations: [react(), sitemap()],
  build: {
    assets: "_assets",
  },
  prefetch: true,
});
