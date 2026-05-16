# `.claude/explainer-shared/`

Shared resources used by the explainer-family skills on augusteo.com:

- [`explainer-authoring`](../skills/explainer-authoring/) — research-and-write long-form posts (topic / HTML-import / resume modes; three Codex gates).
- [`book-explainer-authoring`](../skills/book-explainer-authoring/) — book → claim-by-claim long-form post (EPUB / PDF / text input; four Codex gates, mostly autonomous).

Each skill references files here via `../../explainer-shared/<file>`. The skill keeps domain-specific knowledge local (research protocol, narrative template, HTML conversion table, book ingestion, claim spine, evidence-check protocol, etc.); shared files are the post-agnostic substrate.

## Files

| File | Used by | What it covers |
|---|---|---|
| `voice-rules.md` | both skills | "Write Like a Human, Not an AI" — banned words, sentence patterns, structural habits, voice-check rules. Book skill layers its own `book-voice-overrides.md` on top. |
| `mdx-output-spec.md` | both skills | Frontmatter schema, slug rules, file-path conventions, heading hierarchy when `essay: true`. |
| `hero-handoff.md` | both skills | Hero image prompt template + post-image flow (validate, copy to `src/assets/blog/`, propose `heroAlt`). |
| `figure-kit.md` | both skills | The seven Svelte primitives (`Figure`, `Slider`, `Toggle`, `Scrubber`, `DragArea`, `Canvas2D`, `Plot`), palette tokens, Astro hydration pattern. |
| `figure-recipes.md` | both skills | Cookbook patterns + static-default rule + four override clauses + per-figure-wrapper pattern. Book skill adds `book-figure-recipes.md` with concept-diagram patterns + the anti-cleanup rule. |
| `illustration-style.md` | both skills | Static SVG conventions — palette hex tokens, typography, viewBox, stroke widths, figcaption shape. Book skill layers its own `book-illustration-overrides.md` on top. |
| `playwright-checks.md` | both skills | Per-figure-type playwright review failure modes (universal + static-SVG + interactive). |
| `codex-runner.md` | both skills | Shared mechanics for codex gate invocation: build-prompt → invoke-codex → size-policy → Codex history row → parse findings → 3-rerun cap → Step-6a override safeguard → proof-of-fire. Each skill provides its own gate prompts (`codex-prompts.md` for explainer; `codex-gate-prompts.md` for book skill). |

## Override pattern

The book skill diverges from the explainer skill on voice and illustration. Rather than fork the shared files, the book skill layers thin override files on top:

- `book-voice-overrides.md` — citation-forward voice tilt (more locators, fewer rhetorical flourishes).
- `book-illustration-overrides.md` — anti-cleanup rule (figures must not make the book seem cleaner / more systematic than it actually is).
- `book-figure-recipes.md` — concept-diagram patterns specific to books-and-ideas explainers.

The shared files are the base. When the book skill's behavior conflicts with the shared base, the override wins.
