---
name: expo-go-gate
description: Use before adding any new npm/yarn/pnpm package to this project, and whenever a task might touch custom native code, a config plugin, or leaving Expo Go for a dev client. Checks library compatibility with Expo Go and defines the escalation path when something isn't compatible. Trigger on "add library X", "install package", "implement camera/bluetooth/background-task/other device feature", or any mention of "expo prebuild" or "dev client".
---

# Expo Go compatibility gate

This project runs in Expo Go (managed workflow, no dev client). Expo Go ships with a fixed set of native modules — the Expo SDK — and cannot load third-party native code, custom config plugins, or `expo prebuild` output. If a library needs any of those, it will not run here, regardless of how carefully it's installed.

## Before installing any package

1. **Check compatibility first.**
   - Use `npx expo install <package>` instead of `npm install` / `yarn add` — it picks the SDK-matched version and warns about known incompatibilities.
   - If unsure, check the package against the React Native Directory (reactnative.directory) for its Expo Go compatibility badge before installing.
2. **If it needs native code, stop.** Signs: an `android/` or `ios/` folder in the package, a required config plugin, or docs that say "requires a development build." Don't install it, and don't run `expo prebuild` to work around it — that's a workflow change, not a fix.
3. **Escalate instead of improvising.** Report:
   - What the library is and why the task needs it
   - That it requires leaving Expo Go
   - 1–2 alternatives if any exist (an Expo SDK equivalent, a JS-only fork, or a different approach that avoids the native dependency)
   - Let the user decide whether to swap approach or move the project to a dev client — don't decide this unilaterally.

## Common gotchas
- Expo Go only supports the current/latest Expo SDK release at any given time. A project pinned to an older SDK won't open in a freshly updated Expo Go app. Keep `expo` and all `expo-*` packages on matching versions — `npx expo install --check` catches drift.
- `npx expo install` ≠ `npm install`. Always use the former here.
- A "config plugin" mentioned in a package's README is itself the tell that it needs a dev client — config plugins only apply via `expo prebuild`, which Expo Go can't run.
- Camera, notifications, secure storage, filesystem, location, and most common sensors are already covered by first-party `expo-*` packages and work fine in Expo Go. Check the Expo SDK reference before assuming a third-party native library is needed.

## When the user explicitly wants to leave Expo Go
Don't self-initiate this. If asked, point to the official `expo-dev-client` skill (`npx skills add expo/skills --skill expo-dev-client`) rather than improvising a prebuild by hand.
