# NeobeeSchool — monorepo

pnpm workspaces (pnpm 10.13.1, Node >=20). No Turbo.

- `apps/web` — `@neobee/web`. Next.js 16 + React 19, TypeScript strict. Styling is hand-written CSS custom properties in `src/app/globals.css` — **there is no Tailwind in this repo**. Animation: framer-motion.
- `apps/mobile` — `@neobee/mobile`. Expo SDK 57, expo-router, TypeScript strict.
- `packages/database` — `@neobee/database`. Placeholder type export only.

There is no backend yet: no API routes, no Prisma schema, no Supabase client, no auth. The web portal is a client-side demo running on hardcoded data. Do not assume an API exists — if a task needs one, that is a design decision to escalate, not to invent.

## Scoped rules

**Anywhere under `apps/mobile/`, the Expo Go constraint applies.** No custom native modules, no config plugins, no `expo prebuild`, no dev client. A library is usable only if it is pure JS/TS or ships in the Expo SDK. Full rules: `apps/mobile/AGENTS.md`. Package-compatibility gate: `apps/mobile/.agents/skills/expo-go-gate/SKILL.md`.

## Standing directives

- No git operations (commit, push, merge, branch changes) without explicit confirmation.
- Never read, print, or forward `.env`, `.env.local`, or any secret-bearing file. `.env.example` only.
- No adding or upgrading a dependency without naming the package and version first.
- No silent scope expansion — escalate rather than improvise.

## Out of scope — do NOT do these
- Do not modify `skills-lock.json`. It is managed by the `npx skills` CLI and does not track expo-go-gate.
- Do not touch the 4 existing skill directories or their `references/` files.
- Do not put non-route files inside `apps/mobile/app/` — expo-router turns every file there into a route. `components/`, `theme/`, and `lib/` at the mobile root are the correct home for non-route code.
- Do not modify `package.json`, `tsconfig.json`, or `app.json` unless a dependency or config genuinely requires it, and only after naming the package and version to Talha first and getting approval.
- Do not read `.env` (noting that `.env.example` exists is fine; do not print its contents).
