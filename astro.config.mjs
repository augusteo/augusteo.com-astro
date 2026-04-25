// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

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
  integrations: [mdx(), sitemap(), svelte()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@figures": "/src/figures",
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "solarized-light",
    },
  },
});
