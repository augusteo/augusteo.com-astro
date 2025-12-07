import path from "path";

export const CONFIG = {
  // Source paths (Obsidian vault)
  obsidianBase: "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog",
  obsidianPublished: "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog/published",
  obsidianDrafts: "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog/drafts",
  obsidianFiles: "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/Files",

  // Output paths
  outputDir: path.resolve("./src/content/blog"),
  imageOutputDir: path.resolve("./src/assets/blog"),

  // Default tag when none provided
  defaultTag: "Tech",
};
