// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://www.augusteo.com",
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  image: {
    layout: "constrained",
    // Default ladder runs to 6016px and mints ~7 widths per image, most of which no
    // page ever links to. Site content maxes out well under 1600px.
    breakpoints: [400, 800, 1200, 1920],
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
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
