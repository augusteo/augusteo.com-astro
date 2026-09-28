# augusteo.com

Victor Augusteo's static blog and photo site, built with Astro 7, MDX, Svelte 5,
and Tailwind CSS 4.

## Requirements

- Node.js 22.12.0 or later (including the deployment build environment)
- Bun for dependency installation and content scripts

```sh
bun install --frozen-lockfile
bun run build
bun run preview
```

The production build writes static files to `dist/` and uses the content already
checked into the repository. It does not need access to the Obsidian vault.

## Local development

`bun run dev` syncs the local Obsidian vault, watches it for changes, and starts
Astro. To work only with checked-in content, use `bun run astro dev`.

See [CLAUDE.md](CLAUDE.md) for the content pipelines and directory structure.

## Dependency maintenance

```sh
bun outdated
bun run audit
bun update
bun run build
```

Commit both `package.json` and `bun.lock` after checking the production build.
Upgrade Astro and its official integrations together when changing major versions.
Static hosting reduces server exposure, but build tools, image decoders, and
browser dependencies still need security updates.

The Astro configuration explicitly uses `@astrojs/markdown-remark`'s unified
processor for the math plugins. KaTeX stays on the version line supported by
`rehype-katex` so its generated markup and stylesheet match. `compressHTML: true`
preserves the spacing behavior used before Astro 7.
