# MDX output spec

Shared frontmatter, file-path, and slug rules for the two skills that emit blog posts on this site: `explainer-authoring` (research-and-write) and `html-explainer-to-post` (HTML transcode). Anything either skill writes to `src/content/blog/` follows these rules.

The schema is defined in `src/content.config.ts` and rendered by `src/pages/blog/[slug].astro`. This file is the prose summary of that schema plus the conventions that aren't enforceable by Zod.

## Frontmatter schema

| Field | Type | Source / value |
|---|---|---|
| `title` | `z.string()` | The post title. **Strip Markdown emphasis markers entirely** (YAML frontmatter does not render). Example: `<h1>Image generators are <em>quietly</em> becoming the best vision models</h1>` → `"Image generators are quietly becoming the best vision models"`. |
| `description` | `z.string()` | One-sentence summary, ~100-200 chars. Plain text. Used in post-card listings and the `<meta name="description">` tag. |
| `pubDate` | `z.coerce.date()` | Today (ISO date, e.g. `2026-05-01`) at write time. |
| `heroAlt` | `z.string()` (required key, may be empty) | The schema is bare `z.string()` — the key must be present, but the empty string `""` is a valid value. The two skills use different initial values; see "Initial heroAlt values" below. |
| `heroImage` | `image().optional()` | Omitted until a hero image is supplied; then set to `"@assets/blog/<slug>/hero.<ext>"`. The `@assets` alias resolves to `/src/assets` (configured in `astro.config.mjs`). |
| `tags` | `z.array(z.string())`, at least one | Freeform strings. **First grep `src/content/blog/*/index.mdx` for the existing tag vocabulary** and prefer tags Vic has used before (commonly `"AI"`, `"ML"`, `"Tech"`). Only invent a new tag if no existing one fits. If genuinely uncertain, default to `["Tech"]`. The first tag in the array is used as the primary tag for display and filtering. |
| `featured` | `z.boolean()` | `false` for new posts. Vic flips to `true` manually for the small set of featured cards on the home page. |
| `draft` | `z.boolean()` | `true` at write time. **Both skills always create posts as `draft: true`.** Vic flips to `draft: false` explicitly when ready to ship — the skill never auto-flips. Do not toggle the flag between figure / section commits during development; it stays `true` until Vic's explicit ship action. |
| `essay` | `z.boolean()` | `true` for every long-form post the two skills produce. Opts the post into the 3-tier heading hierarchy: h2 = chapter (act divider), h3 = section, h4 = subsection. |

## Initial `heroAlt` values

The schema (`z.string()`) accepts both empty and non-empty strings. The two skills choose different initial values based on when the hero hand-off happens in their pipeline:

- **`html-explainer-to-post`** writes `heroAlt: ""` in Phase 1, then replaces it in Phase 2 if Vic supplies a hero. Empty is fine because the post is generally not loaded in a dev browser between Phase 1 and Phase 2 — Vic either supplies a hero or ships heroless within the same session.
- **`explainer-authoring`** writes `heroAlt: "TODO: hero image not yet selected"` in Phase 4 (draft prose) and replaces it in Phase 7 (freshness pass + Gate 2 + hero hand-off + ship). The non-empty placeholder is preferred here because Phase 6's playwright review loads the post in a dev browser before the hero is supplied; a non-empty alt makes the rendered page (and snapshot) easier to read at a glance.

Both are valid. Do not "normalize" one to the other — the difference reflects pipeline timing, not a schema requirement.

## File path conventions

```
src/content/blog/<post-slug>/index.mdx     # the post body, with frontmatter
src/assets/blog/<post-slug>/hero.<ext>     # hero image, when supplied
```

Image references inside MDX use the `@assets` alias: `heroImage: "@assets/blog/<post-slug>/hero.png"`. The alias is configured in `astro.config.mjs`.

For posts with inline (non-hero) images, the Obsidian sync pipeline copies them to `src/assets/blog/<post-slug>/` and rewrites the wikilinks. The two MDX-emitting skills do not generate inline images — they emit inline SVG (in MDX) or, for interactive figures, refer to Svelte wrappers under `src/components/figures/<post-slug>/`.

## Slug rules

- Kebab-case the title.
- Drop articles and prepositions: "the", "a", "and", "is", "are", "of".
- Cap at ~6 words. Aim for 3-4 to match Vic's existing convention.
- Examples: `unified-vision-stack`, `claude-code-plugin-stack`, `claude-code-workflow-planning`, `multi-gpu-training`.
- **Slug collision check.** Before writing, both skills must check whether `src/content/blog/<slug>/` already exists. If yes: halt and ask Vic for an alternative slug. Never overwrite an existing post.

## Heading hierarchy (when `essay: true`)

The site stylesheet at `src/styles/global.css` styles essay posts with a three-tier hierarchy:

- `## Heading` — chapter / act divider. Largest. Usually used with the `## Act 1 — Title` pattern from `unified-vision-stack`.
- `### N. Heading` — numbered section, the workhorse heading.
- `#### Heading` — subsection inside a section.

If a post has no act dividers, it just has no h2s — that's fine. The numbered `### N.` sections are the structural backbone.

## When this spec is the source of truth

When either skill's `SKILL.md` describes frontmatter or paths, it should reference this file rather than duplicate the rules. Concretely:

- `explainer-authoring/SKILL.md` Phase 4 step 1 references this file for the full frontmatter schema.
- `html-explainer-to-post/SKILL.md` references this file in lieu of the per-skill frontmatter table.

If you find yourself updating frontmatter rules in only one skill's SKILL.md, stop — the change belongs here.
