// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.augusteo.com",
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  image: {
    layout: "constrained",
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@assets": "/src/assets",
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "solarized-light",
    },
  },
});
