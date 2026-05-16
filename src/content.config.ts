import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      heroAlt: z.string(),
      tags: z.array(z.string()).min(1),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      essay: z.boolean().default(false),
    }),
});

const photosCollection = defineCollection({
  loader: glob({
    pattern: "**/index.yaml",
    base: "./src/content/photos",
    generateId: ({ entry }) => entry.replace(/\/index\.yaml$/, ""),
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      cover: z.string(),
      location: z.array(z.string()).optional(),
      captions: z.record(z.string(), z.string()).optional(),
      order: z.array(z.string()).optional(),
    }),
});

const photosIndexCollection = defineCollection({
  loader: file("./src/content/photos-index.yaml"),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    albums: z.array(z.string()).min(1),
  }),
});

export const collections = {
  blog: blogCollection,
  photos: photosCollection,
  photosIndex: photosIndexCollection,
};
