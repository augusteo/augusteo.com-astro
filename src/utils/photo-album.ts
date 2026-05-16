import type { ImageMetadata } from "astro";

// Eager glob — Astro inlines the imports at build time so each .default is a real
// ImageMetadata (src, width, height, format). Required for Astro <Image> with local assets.
const allPhotos = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/photos/**/*.{jpg,jpeg,JPG,JPEG}",
  { eager: true },
);

export interface AlbumPhoto {
  file: string;
  image: ImageMetadata;
}

export function getAlbumPhotos(albumId: string, order?: string[]): AlbumPhoto[] {
  const prefix = `/src/assets/photos/${albumId}/`;
  const entries: AlbumPhoto[] = Object.entries(allPhotos)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, mod]) => ({
      file: path.slice(prefix.length),
      image: mod.default,
    }));

  if (order && order.length > 0) {
    const orderMap = new Map(order.map((f, i) => [f, i]));
    entries.sort((a, b) => {
      const ai = orderMap.get(a.file) ?? Number.MAX_SAFE_INTEGER;
      const bi = orderMap.get(b.file) ?? Number.MAX_SAFE_INTEGER;
      if (ai !== bi) return ai - bi;
      return a.file.localeCompare(b.file);
    });
  } else {
    entries.sort((a, b) => a.file.localeCompare(b.file));
  }

  return entries;
}

export function getAlbumCover(albumId: string, coverFile: string): ImageMetadata | undefined {
  return allPhotos[`/src/assets/photos/${albumId}/${coverFile}`]?.default;
}

// Deterministic mapping of album slug → watercolor wash color.
// Used for location dots on the album page.
const WASH_COLORS = [
  "var(--color-wash-sky)",
  "var(--color-wash-sage)",
  "var(--color-wash-terracotta)",
  "var(--color-wash-ocean)",
  "var(--color-wash-sunset)",
] as const;

export function washColorFor(albumId: string): string {
  // Simple deterministic hash → index.
  let h = 0;
  for (let i = 0; i < albumId.length; i++) {
    h = (h * 31 + albumId.charCodeAt(i)) >>> 0;
  }
  return WASH_COLORS[h % WASH_COLORS.length];
}

// Partition photos into N columns left-to-right (row-by-row reading order).
// photo[i] goes to column (i % cols). Reading row-by-row across columns yields
// the original order, which is the curator's filename order.
export function partitionIntoColumns<T>(items: T[], cols: number): T[][] {
  const buckets: T[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    buckets[i % cols].push(item);
  });
  return buckets;
}
