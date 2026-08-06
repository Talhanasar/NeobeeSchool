# AGENTS.md

## Project
NeobeeSchool — React Native mobile app built with Expo, developed and tested in **Expo Go** (managed workflow, not a dev build). Iteration happens by scanning the QR code from `npx expo start` in the Expo Go app on a physical device or simulator.

## Stack
- Expo SDK: latest stable — check `package.json` for the exact version currently pinned; don't bump it without an explicit instruction (see "Upgrades" below)
- Router: `expo-router`, file-based under `app/`, using a `(tabs)` group.
- Styling: typed design tokens in `theme/tokens.ts`, applied as inline styles. No Tailwind, no NativeWind, no `StyleSheet.create`.
- Backend: none. All content is local typed constants in `lib/content.ts`. No API, no Prisma, no Supabase, no auth, no network calls.
- Package manager: pnpm (pnpm workspaces, pnpm 10.13.1, Node >=20).

## Hard constraint: Expo Go only
This project stays in Expo Go for now. In practice that means:
- No custom native modules, no config plugins, no `expo prebuild`, no dev client.
- A library is only usable here if it's pure JS/TS or already shipped as part of the Expo SDK.
- **Before installing any new package**, run it through the compatibility gate — see `.agents/skills/expo-go-gate/SKILL.md`. Don't install first and discover the incompatibility after `expo start` breaks; that burns a cycle and usually means undoing a chain of edits.

## Installed Expo Skills
Official Expo Skills (`expo/skills`, installed via `npx skills add expo/skills --skill <name>`). Currently in use:
- `expo-native-ui` — Expo Router, screens, navigation, styling patterns
- `expo-data-fetching` — fetch / React Query patterns against the backend
- `expo-upgrade` — SDK upgrade procedure; only invoked on explicit instruction, never proactively
- `expo-examples` — canonical, version-matched integration patterns when wiring up a third-party service

**Not installed** — add only on demand, never pre-emptively: `expo-dev-client`, `expo-cicd-workflows`, `expo-deployment`, `expo-module`, `expo-brownfield`, `add-app-clip`. Every one of these assumes leaving Expo Go. A subagent reaching for one of these mid-task is itself a signal that scope is expanding — treat it as an escalation, not routine setup.

## Standing directives
- No git operations (`commit`, `push`, `merge`, branch changes) without explicit confirmation first.
- No silent scope expansion — if a task implies leaving Expo Go (native module, config plugin, dev client), stop and ask rather than switching workflows underneath the user.
- Subagents escalate rather than improvise: if a needed package is Expo-Go-incompatible, report it and propose alternatives (Expo SDK equivalent, JS-only fork, different approach) instead of quietly working around it or reaching for `expo prebuild`.
- "For now" in an instruction means deferred, not abandoned — don't reverse a "for now" decision without being asked.

## Structure
```
app/            # expo-router screens; (tabs) group with index, classes, campus, admissions
components/     # shared UI primitives + composites
theme/          # tokens.ts (brand tokens), typography.ts (font loading)
lib/            # content.ts (local typed content constants)
.agents/skills/ # project-local skills (expo-go-gate, expo-native-ui, etc.)
```

## Conventions
- Shadow via CSS `boxShadow` strings only — never `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius`/`elevation`.
- `process.env.EXPO_OS`, never `Platform.OS`.
- Navigation imports from `expo-router`, not `@react-navigation/*` directly (SDK 56+).
- Gradients via React Native's `experimental_backgroundImage` — not `expo-linear-gradient`, which is not installed and not needed.
- Fonts: Fredoka (headings) / Nunito (body), loaded at runtime via `useAppFonts()` in `theme/typography.ts`. No `expo-font` config plugin — it was removed because config plugins are inert in Expo Go and these fonts load at runtime.
- kebab-case filenames.
- Android needs an explicit top safe-area inset: `contentInsetAdjustmentBehavior` is iOS-only, and `edgeToEdgeEnabled: true` is set in `app.json`.

Additional Expo Go-safe dependencies installed via `npx expo install`: `expo-font`, `@expo-google-fonts/fredoka`, `@expo-google-fonts/nunito`, `react-native-svg`.

## Upgrades
SDK upgrades go through the official `expo-upgrade` skill, one version at a time, only when explicitly requested. Expo Go only supports the current/latest SDK release — bumping `expo` without also having a matching Expo Go build installed will make the project fail to open.
