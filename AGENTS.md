# AGENTS.md

## Basics

- Astro blog powered by the `astro-pure` theme integration.
- Local dev: `pnpm install && pnpm dev`
- Build: `pnpm build` (runs `astro check && astro build`)
- Preview: `pnpm preview`

## Package Manager

- Use Node 24 and the pnpm version pinned in `package.json`. Commit `pnpm-lock.yaml`.
- `pnpm-workspace.yaml` configures a single project. `astro-pure` comes from the registry; there is no vendored theme or Bun link step.

## Scripts Worth Knowing

- `pnpm dev` — Start Astro dev server.
- `pnpm dev:check` — Runs `astro check --watch` alongside the dev server.
- Run `pnpm lint` and `pnpm build` before committing. `pnpm lint` applies fixes; inspect the diff.
- `pnpm date` — Updates `updatedDate` frontmatter for blog posts by comparing content hashes against `scripts/blog-metadata.json`.
- `pnpm cache:avatars` — Caches friend-link avatars into `public/avatars/`.
- `pnpm new` — Scaffold a new blog post via `astro-pure new`.

## Content

- Blog posts live in `src/content/blog/` as `.md` or `.mdx`.
- Content collections are defined in `src/content.config.ts` using Astro's `glob` loader.
- `src/site.config.ts` is the single source of truth for theme settings (menu, footer, integrations, etc.).

## Styling & Tooling

- **UnoCSS** is used, not Tailwind. Config lives in `uno.config.ts`.
- `trailingSlash: 'ignore'` lets Astro serve paths with or without a trailing slash.
- Prettier config: single quotes, no semicolons, 2-space indent, printWidth 100, astro parser for `.astro` files.
- ESLint ignores: `public/scripts/*`, `scripts/*`, `.astro/`, `src/env.d.ts`.

## TypeScript Paths

- `tsconfig.json` aliases: `@/components/*`, `@/layouts/*`, `@/pages/*`, `@/utils`, `@/plugins/*`, `@/assets/*`, `@/site-config`.

## Build / Deploy Notes

- No adapter is currently configured; this builds to static output by default.
- `site` in `astro.config.ts` points to `https://mariverse.github.io/` — update if deploying elsewhere.
- `ecosystem.config.cjs` runs `pnpm preview` for PM2.
