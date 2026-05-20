# AGENTS.md

## Basics

- Astro blog powered by the `astro-pure` theme integration.
- Local dev: `pnpm install && pnpm dev`
- Build: `pnpm build` (runs `astro-pure check && astro check && astro build`)
- Preview: `pnpm preview`

## Package Manager

- **Use `pnpm`**, even though a `bun.lock` exists. The lockfile of record is `pnpm-lock.yaml`.
- There is **no pnpm workspace**. `packages/pure/` is a vendored upstream source, not a linked workspace package.

## `packages/pure/` Upstream Vendoring

- `packages/pure/` is a copy of the `astro-pure` integration source. It is **not automatically linked**.
- `astro-pure check` (run during `pnpm build`) is a no-op unless `BUN_LINK_PKG=true` is set.
- Only set `BUN_LINK_PKG=true` if you intentionally want to develop the upstream integration locally via `bun link`.
- Normally, treat `astro-pure` as a regular npm dependency installed from the registry.

## Scripts Worth Knowing

- `pnpm dev` — Start Astro dev server.
- `pnpm dev:check` — Runs `astro check --watch` alongside the dev server.
- `pnpm yijiansilian` — Sequential `lint -> sync -> check -> format`. Use this before committing.
- `pnpm date` — Updates `updatedDate` frontmatter for blog posts by comparing content hashes against `scripts/blog-metadata.json`.
- `pnpm cache:avatars` — Caches friend-link avatars into `public/avatars/`.
- `pnpm new` — Scaffold a new blog post via `astro-pure new`.

## Content

- Blog posts live in `src/content/blog/` as `.md` or `.mdx`.
- Content collections are defined in `src/content.config.ts` using Astro v5's `glob` loader.
- `src/site.config.ts` is the single source of truth for theme settings (menu, footer, integrations, etc.).

## Styling & Tooling

- **UnoCSS** is used, not Tailwind. Config lives in `uno.config.ts`.
- `trailingSlash: 'never'` is set in `astro.config.ts`.
- Prettier config: single quotes, no semicolons, 2-space indent, printWidth 100, astro parser for `.astro` files.
- ESLint ignores: `public/scripts/*`, `scripts/*`, `.astro/`, `src/env.d.ts`.

## TypeScript Paths

- `tsconfig.json` aliases: `@/components/*`, `@/layouts/*`, `@/pages/*`, `@/utils`, `@/plugins/*`, `@/assets/*`, `@/site-config`.

## Build / Deploy Notes

- No adapter is currently configured; this builds to static output by default.
- `site` in `astro.config.ts` points to `https://mariverse.github.io/` — update if deploying elsewhere.
- `ecosystem.config.cjs` is a PM2 config that references `bun run preview`; update to `pnpm preview` if using PM2 with pnpm.
