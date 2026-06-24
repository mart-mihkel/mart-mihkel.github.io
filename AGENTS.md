# AGENTS.md — mart-mihkel.github.io

SolidJS + Vite static blog (RFC-style), deployed to GitHub Pages.

## Devcommands

```sh
pnpm check  # biome lint + format (auto-fixes)
pnpm tsgo   # typecheck
pnpm test   # vitest
pnpm build  # vite build
```

Order: `pnpm check` → `pnpm tsgo` → `pnpm test` → `pnpm build`

## Key setup

- **Router**: HashRouter — hash-based routes (`/#/slug`)
- **Posts**: Markdown in `src/posts/`, imported with `?raw`. Statically registered in `src/posts/index.ts`
- **Markdown**: Rendered client-side via `marked` in `Post.tsx`
- **Tailwind v4**: `@import "tailwindcss"`, no `@tailwind` directives
- **Prose styling**: Custom `.prose-custom` for markdown in `src/index.css`

## Quirks

- **Biome**: Organizes imports on `pnpm check`. Double quotes, space indentation.
- **TS strict**: `"moduleResolution": "bundler"`, `"noEmit": true`
- **Testing**: Router-dependent components need `MemoryRouter` + `Route` wrapper. Use `createMemoryHistory` with `history.set({ value, replace: true })` to set initial path. Union mock fields need `as const`.

