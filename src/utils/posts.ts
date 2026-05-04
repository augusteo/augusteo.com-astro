import type { CollectionEntry } from "astro:content";

export function isPostVisible(post: CollectionEntry<"blog">) {
  return !post.data.draft || import.meta.env.DEV;
}
