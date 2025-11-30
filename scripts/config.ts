import path from "path";

export const CONFIG = {
  // Source paths (Obsidian vault)
  obsidianPublished: "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog/published",
  obsidianFiles: "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/Files",

  // Output paths
  outputDir: path.resolve("./src/content/blog"),
  imageOutputDir: path.resolve("./src/assets/blog"),

  // Category mapping from Obsidian tags to Astro categories
  categoryMap: {
    "Travels": "travels",
    "Travel": "travels",
    "Tech": "tech",
    "Technology": "tech",
    "Book": "books",
    "Books": "books",
    "Philosophy": "philosophy",
  } as Record<string, string>,

  // Default category when none matches
  defaultCategory: "tech" as const,

  // Valid categories (must match content/config.ts schema)
  validCategories: ["travels", "tech", "books", "philosophy"] as const,
};

export type Category = typeof CONFIG.validCategories[number];
