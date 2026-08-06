# Neobee School, full project explanation

Written 2026-08-04. Reflects the state of the repo at commit 87e4a91 plus uncommitted work in progress.

## 1. What this project is, in one minute

Neobee School is a preschool. This repo holds two front-ends for it:

- a public marketing website (Next.js, runs in a browser)
- a mobile app (Expo/React Native, runs on a phone)

The website also contains a second area, `/portal`. That is a clickable prototype of a school-management dashboard for three kinds of users (admin, teacher, parent).

**There is no backend at all.** No database, no login, no API. Every piece of information you see on screen is typed by hand into TypeScript files inside the repo. Nothing is saved anywhere. Refreshing the page resets everything.

## 2. How much is done

As a **demo you can show someone**, this is close to finished. As a **real product people could actually use**, it is roughly a third of the way there, because the entire back half (data storage, accounts, saving anything) does not exist yet.

| Part | Status | What works | What is missing |
| --- | --- | --- | --- |
| **Public website (`/`)** | ~85% done | Every section is designed and built: announcement bar, header with mobile menu, animated hero, feature strip, About, Classes, Curriculum, Daily rhythm timeline, Campus + safety, Teachers, Notice board, Admissions steps, Inquiry form, Contact, Footer, floating call button. Fully responsive. | Real copy (teacher names and credentials are explicitly labelled placeholders in the code), the inquiry form does not send anywhere, no Open Graph share image, single page only. |
| **School portal (`/portal`)** | UI ~80%, function ~15% | Role switcher for admin/teacher/parent. Admin has 5 views (overview, admissions pipeline, attendance, students, notices). Teacher has 3 (today, class, notices). Parent has 6 (home, diary, attendance, growth, invoices, notices). Sidebar collapses on mobile. Attendance/diary/invoice changes do update on screen. | No login, no accounts, no permissions. Every action button just shows a toast that says "Demo only". Changes live in React state and vanish on reload. Today's date is hardcoded to `2026-07-25`. |
| **Mobile app** | ~70% done | 4 working tabs (Home, Classes, Campus, Admissions), custom SVG icon set, Google Fonts loaded at runtime, working inquiry form with validation and scroll-to-error, tap-to-call and tap-to-email. | No portal equivalent, form does not send anywhere, no app icon or splash screen configured in `app.json`, never been committed to git. |
| **Backend** | 0% | Nothing. | Everything: database, auth, API, form delivery, file storage. |
| **`packages/database`** | Placeholder | Exports one empty TypeScript type. | Real generated types. Neither app imports it yet. |
| **Testing / CI** | 0% | Nothing. | No test framework, no `.github/workflows`, no pre-commit hooks. |

What "done" would need, in dependency order:

1. Pick and set up a backend + database.
2. Real auth and roles for the portal.
3. Make the two inquiry forms actually deliver somewhere.
4. Replace all placeholder content with verified real content.
5. Tests + CI.

## 3. Folder map

```text
D:\Work\NeobeeSchool
├── apps
│   ├── mobile
│   │   ├── .agents
│   │   ├── app
│   │   │   └── (tabs)
│   │   ├── components
│   │   ├── lib
│   │   ├── theme
│   │   ├── app.json
│   │   ├── package.json
│   │   └── ...
│   └── web
│       ├── public
│       ├── src
│       │   └── app
│       │       ├── portal
│       │       │   ├── demo-data.ts
│       │       │   ├── icons.tsx
│       │       │   ├── page.tsx
│       │       │   └── portal-app.tsx
│       │       ├── globals.css
│       │       ├── hero.tsx
│       │       ├── inquiry-form.tsx
│       │       ├── layout.tsx
│       │       ├── page.tsx
│       │       └── site-header.tsx
│       ├── next.config.js
│       ├── package.json
│       └── ...
├── packages
│   └── database
│       └── src
│           └── index.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── ...
```

This is a **pnpm workspace monorepo** (one git repo holding several packages that share one `node_modules`).

| Folder | What lives there |
| --- | --- |
| `apps/web` | The public website and portal. |
| `apps/web/src/app` | All Next.js pages and components for the website. |
| `apps/web/src/app/portal` | The whole portal prototype. |
| `apps/web/public` | Static files served as-is, including the hero iframe bundle. |
| `apps/mobile/app` | Expo-router screens. Every file here becomes a route. |
| `apps/mobile/components` | Shared React Native components. |
| `apps/mobile/theme` | Colors, spacing, typography and tokens as TypeScript. |
| `apps/mobile/lib` | Shared helpers and the mobile content file. |
| `apps/mobile/.agents` | Agent skills for Expo Go vetting and reference. |
| `packages/database` | One placeholder package. It currently exports a single empty type. |
| Root config files | `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, etc. |

Root `package.json` has no dependencies of its own. It only forwards commands:

- `pnpm dev` → `pnpm --recursive --if-present dev`
- `pnpm build` → `pnpm --recursive --if-present build`
- `pnpm lint` → `pnpm --recursive --if-present lint`
- `pnpm typecheck` → `pnpm --recursive --if-present typecheck`
- `pnpm test` → `pnpm --recursive --if-present test`

Each command fans out to every app that has that script.

`pnpm-workspace.yaml` includes `apps/*` and `packages/*`.

There is deliberately **no Turborepo**.

Node >= 20. pnpm 10.13.1 is pinned via `packageManager`.

## 4. Every library used, and why

### Web (`apps/web`, package name `@neobee/web`)

| Package | Version | What it does here |
| --- | --- | --- |
| `next` | `16.2.11` | The framework: routing, server rendering, build. |
| `react` + `react-dom` | `19.2.0` | UI library. |
| `framer-motion` | `^12.42.2` | Animation library, **installed but never imported anywhere in `src/`. All animation is actually hand-written CSS, so this is a removable dependency.** |
| `typescript` | `5.6.3` | Type checking. |
| `eslint` + `eslint-config-next` | `^9.38.0` / `16.2.11` | Linting. |
| `@types/node` | `^26.1.1` | TypeScript types for Node built-ins. |
| `@types/react` | `^19.2.17` | TypeScript types for React. |
| `@types/react-dom` | `^19.2.3` | TypeScript types for React DOM. |

Scripts:

- `dev` = `next dev`
- `build` = `next build`
- `start` = `next start`
- `lint` = `eslint .`

**There is no Tailwind and no CSS framework.** No `postcss.config`, no `tailwind.config`, no CSS Modules. Just one global stylesheet.

### Mobile (`apps/mobile`, package name `@neobee/mobile`)

| Package | Version | What it does here |
| --- | --- | --- |
| `expo` | `~57.0.8` | The toolchain that lets the app run without native build tools. |
| `expo-router` | `~57.0.8` | File-based navigation, same idea as Next.js routing but for screens. |
| `expo-font` | `~57.0.1` | Loads custom fonts at runtime. |
| `expo-status-bar` | `~57.0.1` | Controls the status bar appearance. |
| `react` | `19.2.3` | UI library. |
| `react-native` | `0.86.0` | Native UI layer. |
| `react-native-safe-area-context` | `~5.7.0` | Keeps content clear of notches. |
| `react-native-screens` | `~4.26.0` | Screen optimization for navigation. |
| `react-native-svg` | `15.15.4` | Draws all the icons. |
| `@expo-google-fonts/fredoka` | `^0.4.1` | One of the two brand fonts. |
| `@expo-google-fonts/nunito` | `^0.4.2` | The other brand font. |
| `typescript` | `~6.0.3` | Type checking. |
| `@types/react` | `~19.2.2` | TypeScript types for React. |

Scripts:

- `start` = `expo start`
- `android` = `expo start --android`
- `ios` = `expo start --ios`
- `web` = `expo start --web`

Notes:

- `main` is `expo-router/entry`.
- `app.json` has `plugins: ["expo-router"]`, `scheme: "neobee"`, `experiments.typedRoutes: true`, `orientation: "portrait"`, `userInterfaceStyle: "light"`, `ios.supportsTablet: true`, `android.edgeToEdgeEnabled: true`.

## 5. How the website works, step by step

1. The browser asks for `/`.
2. `src/app/layout.tsx` runs on the server. It is the outer shell: `<html lang="en">`, `<body>`, imports `globals.css`, and exports the page `metadata` (title, description, keywords, OpenGraph).
3. `src/app/page.tsx` runs on the server too. This single file is the **entire public homepage**, 272 lines. It holds small helper components inside it (`Icon`, an inline SVG map for 20 icon names; `SectionHeading`; `ContactItem`) and, importantly, **all the page content as hardcoded arrays at the top of the file**: `classes` (4), `curriculum` (4), `day` (6 timeline steps), `facilities` (4), `safety` (5), `teachers` (4), `notices` (3).
4. Three pieces are marked `"use client"`, meaning they ship JavaScript to the browser because they need to be interactive: `site-header.tsx`, `hero.tsx`, `inquiry-form.tsx`. The rule of thumb in Next.js is: a component is a server component by default, and you only make it a client component when it needs browser state or events.
5. `favicon.ico` sits in `src/app/` and Next.js serves it automatically.

### The hero, and why it is unusual

The hero is not a video file and not a React animation. It is a **separate self-contained HTML page**, `apps/web/public/admission-video.html`, loaded inside an `<iframe>`.

`hero.tsx` shows a bee loader until that iframe is ready. Readiness is tracked by a `ready` boolean state.

To detect readiness it clears `localStorage["animstage:t"]`, then polls the iframe's document every 150ms (giving up after 8 tries) looking for the element `[data-om-exportable-video-with-duration-secs]`, and fires a `Home` keydown into the iframe three times to rewind the animation to the start.

Safety nets: it reveals anyway after 15000ms (`REVEAL_TIMEOUT_MS`), plus a 400ms backstop (`REVEAL_BACKSTOP_MS`).

This is a workaround, not a normal pattern. The animation was exported as a standalone HTML bundle that must run as its own document, so it could not be inlined into React. If you ever replace the hero, you replace that HTML file and most of `hero.tsx` goes away with it.

### The inquiry form

Fields are `parentName`, `phone`, `childName`, `classLevel` (select), `message` (textarea).

It validates in the browser, focuses the first bad field, and the phone must match `/^[+\d][\d\s-]{7,}$/`.

On success it calls `form.reset()` and sets `sent` to true.

It never sends a network request. The code itself says "Demo form only, nothing is sent or stored".

### The header

7 anchor links plus a link to the portal, all defined in an array at the top of `site-header.tsx`.

On mobile a hamburger button flips an `open` state, which adds `.is-open` and CSS animates three lines into an X. Links close the menu on tap.

## 6. How the portal works

Entry: `/portal` → `portal/page.tsx` (server, just sets metadata) → `portal/portal-app.tsx`, a single 1473-line client component that is the whole prototype.

State it holds:

- `role` (`admin | teacher | parent`)
- `view` (which screen inside that role)
- `mobileNav`
- `toast`
- three "override" objects: `attendanceOverrides`, `diaryOverrides`, `invoiceOverrides`

What overrides mean: the seed data is read-only, so edits are stored as a separate patch layer on top of it in memory.

There is **no login**. You pick a role from a picker and it swaps the whole dashboard. `itemsForRole` decides the sidebar menu, `defaultViewFor` decides the landing view.

| Role | Views available | What each view shows |
| --- | --- | --- |
| Admin | Overview, Admissions, Attendance, Students, Notices | Overview shows 4 metric cards. Admissions shows a 5-stage pipeline with leads. Attendance shows a roster table. Students shows a table. Notices shows notices. |
| Teacher | Today, Class, Notices | Today is the daily dashboard. Class is class details. Notices is notices. |
| Parent | Home, Diary, Attendance, Growth, Invoices, Notices | Home is the parent dashboard. Diary shows daily diary entries. Attendance shows attendance. Growth shows growth summary. Invoices shows invoices. Notices shows notices. |

Data source: `portal/demo-data.ts`, 538 lines, pure TypeScript constants.

It exports these types:

`Role`, `ClassId`, `TeacherId`, `StudentId`, `AttendanceStatus`, `Mood`, `InvoiceStatus`, `PipelineStage`, `DemoClass`, `Teacher`, `Student`, `AttendanceRecord`, `DiaryEntry`, `GrowthSummary`, `Invoice`, `Notice`, `PipelineColumn`, `AdminMetric`, `Persona`.

It exports these seed arrays:

- `classes` (4)
- `teachers` (4)
- `students` (6)
- `attendance` (16)
- `diaryEntries` (5)
- `growthSummaries` (1)
- `invoices` (3)
- `notices` (4)
- `pipeline` (5 columns)
- `adminMetrics` (4)
- `personas` (3)

Plus `linkedChildId = "stu-ariaan"` (which child the parent role is tied to) and lookup helpers `findClass`, `findTeacher`, `findStudent`, `studentsInClass`.

Here is the shape of an invoice:

```ts
{
  id: "inv-2026-07",
  studentId: "stu-ariaan",
  month: "July 2026",
  item: "Monthly tuition · Honey Bees",
  amountBdt: 8500,
  status: "due",
  dueDate: "2026-07-10",
  paidOn: null
}
```

`portal/icons.tsx` holds 17 inline SVG icons behind a `PortalIcon` component with a `PortalIconName` union type.

Be blunt about the limits: buttons like "Add inquiry", "Send fee reminder", "Post a notice", "Export roster", "Message guardian", "Mark as paid", "Send to parent" all just call `showToast(... "Demo only")`.

`today` is hardcoded as `"2026-07-25"` in four places.

A banner in the UI already says "Demo data only, Supabase connection comes next."

## 7. How the mobile app works

Launch path: `package.json` `main` is `expo-router/entry` → `app/_layout.tsx` → `app/(tabs)/_layout.tsx` → `app/(tabs)/index.tsx`.

`app/_layout.tsx` wraps everything in `SafeAreaProvider`, sets the status bar, renders `<Stack screenOptions={{ headerShown: false }} />`, and calls `useAppFonts()`. While fonts load it renders a plain cream `View`, so there is no flash of the wrong font.

Expo-router in one sentence: every file inside `app/` becomes a screen automatically, based on its filename. A folder in parentheses like `(tabs)` groups screens without adding to the URL.

That is why the hard rule exists: **never put a non-screen file inside `app/`**. This is why `components/`, `theme/` and `lib/` sit at the mobile root instead.

| File | Tab label | What it shows |
| --- | --- | --- |
| `app/(tabs)/index.tsx` | Home | Gradient hero, 4 stats, 6-step daily rhythm timeline, top 3 notices, two buttons that both `router.push('/admissions')`. |
| `app/(tabs)/classes.tsx` | Classes | 4 class cards, then a cream card listing the 4 curriculum points. |
| `app/(tabs)/campus.tsx` | Campus | 4 facility rows, a green card with 5 safety points, 4 teacher cards, and a contact card where tapping phone or email opens the device dialler/mail app via `Linking.openURL`. |
| `app/(tabs)/admissions.tsx` | Admissions | 3 admission steps, the inquiry form, then the full notices list. |

The tab bar is declared in `app/(tabs)/_layout.tsx`:

- active colour: `colors.honeyDeep`
- inactive colour: `colors.hiveSoft`
- labels in `Nunito_600SemiBold` at `text.xs`

### Components

| File | What it is | Used by |
| --- | --- | --- |
| `badge.tsx` | A small badge component. | **Currently unused.** |
| `button.tsx` | 3 variants, supports loading, disabled and icon. | Tabs, forms, cards. |
| `card.tsx` | Card wrapper with 6 tones. | Multiple screens. |
| `chip.tsx` | Small label chip. | Cards, lists. |
| `class-card.tsx` | Class summary card. | Classes tab. |
| `field.tsx` | A `forwardRef` text input with label, error and required handling. | Inquiry form. |
| `icon.tsx` | About 24 inline SVG paths, exports `IconName`. | Throughout. |
| `info-row.tsx` | Label/value row. | Campus, admissions. |
| `inquiry-form.tsx` | The mobile inquiry form. | Admissions tab. |
| `notice-card.tsx` | Notice item card. | Home, admissions. |
| `section-heading.tsx` | Shrinks its title below 560px wide. | Multiple screens. |
| `teacher-card.tsx` | Teacher card. | Campus tab. |
| `timeline-row.tsx` | Daily rhythm row. | Home tab. |
| `index.ts` | Barrel export. | Imported by screens. |

Mobile inquiry form: local `values`/`errors`/`status` state, validates parent name >= 2 chars, phone against a regex, child name >= 2 chars, class level required, measures field positions so it can scroll to the first error, then fakes success with a 1200ms `setTimeout`. Same as web: **nothing is sent**.

Navigation reality check: the only in-app navigation calls in the whole app are the two Home buttons pointing at `/admissions`. Everything else is tab taps.

## 8. Styling, the part you most need to understand

The two apps share a **design language** but not a codebase. Every visual token exists twice and must be edited in both places to stay in sync.

### Web styling

One file does all of it: `apps/web/src/app/globals.css`, 1449 lines, plain global CSS with class names. No Tailwind, no CSS Modules. Only one inline style in the whole app (a pipeline progress bar width).

All tokens live in `:root` at lines 3 to 77.

Colours:

| Token | Value |
| --- | --- |
| `--cream` | `#fffaf0` |
| `--cream-2` | `#fff5dc` |
| `--cream-hover` | `#fef6e3` |
| `--hive` | `#2a1f0c` |
| `--hive-soft` | `#665738` |
| `--hive-hover` | `#1a1408` |
| `--hive-2` | `#3a2c14` |
| `--honey` | `#f5a81c` |
| `--honey-light` | `#ffc757` |
| `--honey-deep` | `#c97800` |
| `--honey-deep-hover` | `#a86400` |
| `--nectar` | `#ffe8ac` |
| `--nectar-soft` | `#fff4d6` |
| `--leaf` | `#5f8f4e` |
| `--leaf-soft` | `#e9f3e3` |
| `--leaf-hover` | `#4a7a3d` |
| `--sky` | `#eaf4f8` |
| `--sky-deep` | `#cfe6f0` |
| `--rose` | `#f7e2df` |
| `--white` | `#fff` |
| `--danger` | `#a43326` |
| `--success` | `#275e31` |
| `--border` | `rgba(83,61,19,0.13)` |

Shadows:

| Token | Value |
| --- | --- |
| `--shadow` | `0 14px 38px rgba(104,70,8,0.11)` |
| `--shadow-lg` | `0 28px 70px rgba(104,70,8,0.17)` |

Spacing, `--space-0` to `--space-9`:

0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6 rem.

Type scale, `--text-xs` to `--text-5xl`:

0.75, 0.875, 1, 1.125, 1.25, 1.5, 2, 3, 4 rem.

Motion:

| Token | Value |
| --- | --- |
| `--duration-fast` | `150ms` |
| `--duration-normal` | `200ms` |
| `--duration-slow` | `400ms` |
| `--easing-standard` | `cubic-bezier(0.4,0,0.2,1)` |

Plus `--easing-decelerate` and `--easing-accelerate`.

Layout:

| Token | Value |
| --- | --- |
| `--radius` | `24px` |
| `--container` | `1180px` |

Fonts are loaded from Google Fonts at the top of the file:

- Fredoka for headings
- Nunito for body (17px, line-height 1.65)
- Baloo 2, Caveat, Lora also loaded

Body stack is `"Nunito", ui-rounded, system-ui, sans-serif`.

Breakpoints actually used: 1080px, 820px, 560px. They exist only as comments in `:root`, not as usable variables, because CSS custom properties cannot be used inside media queries.

The hexagon look: a repeated `clip-path: polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0 50%)` on the brand mark, timeline markers, class cards and status pills, plus an inline SVG honeycomb data-URI background on `.honeycomb-bg`.

All animation is CSS, not framer-motion: hamburger to X, `heroBeeHover` keyframes, card hover lifts of -2px/-5px, portal sidebar slide-in, `portalToastIn`.

`@media (prefers-reduced-motion: reduce)` switches all of it off.

### Mobile styling

No stylesheet at all. Tokens are TypeScript in `apps/mobile/theme/tokens.ts` and applied as **inline style objects**. `AGENTS.md` forbids `StyleSheet.create`, Tailwind and NativeWind here.

Exports:

| Export | What it holds |
| --- | --- |
| `colors` | Same palette as web but camelCase: `cream`, `cream2`, `hive`, `hiveSoft`, `honey`, `honeyDeep`, `nectar`, `leaf`, `leafSoft`, `sky`, `rose`, `danger`, `success`, `border`, etc. |
| `space` | `s0..s9` = 0, 4, 8, 12, 16, 24, 32, 48, 64, 96 (numbers, not rem). |
| `text` | Sizes `xs` 12 up to `xxxxxl` 64. |
| `radius` | `24`. |
| `shadows` | CSS `boxShadow` strings. |
| `breakpoints` | `sm` 560 / `md` 820 / `lg` 1080. |
| `tokens` | Aggregate object, also the default export. |

Fonts: `apps/mobile/theme/typography.ts` exports `fontFamily` (`Fredoka_600SemiBold` for headings, `Nunito_400Regular` for body) and the `useAppFonts()` hook, which returns `loaded || failed` on purpose so a font download failure cannot freeze the app on a blank screen.

Gradients use React Native's `experimental_backgroundImage` instead of a gradient library.

Important difference for editing: **web spacing is in rem strings, mobile spacing is in plain numbers.** They are not interchangeable.

## 9. Where the content lives (read this before editing text)

This is the most practical section.

The same information (class names, teachers, notices) is typed out in **three separate places** with no shared source:

1. `apps/web/src/app/page.tsx` (top of file) for the public website.
2. `apps/web/src/app/portal/demo-data.ts` for the portal.
3. `apps/mobile/lib/content.ts` for the mobile app.

So changing a teacher's name means three edits. This is the single biggest piece of technical debt in the repo.

The obvious future fix is to move shared content into `packages/` as one shared module that both apps import. The workspace setup already makes this possible. `packages/database` is the only package there today, exporting one empty type, unused by either app.

What `apps/mobile/lib/content.ts` exports:

- `IconName` (a union of 20 icon names)
- `ClassItem` type
- `classes` (4)
- `curriculum` (4)
- `dailyRhythm` (6)
- `facilities` (4)
- `safety` (5)
- `teachers` (4)
- `notices` (3)
- `stats` (4)
- `contact` (address, phone `+88 013 4744 9472`, email `neobeepreschool@gmail.com`, hours, `mapQuery` which is currently unused)
- `admissionSteps` (3)

All `as const` and readonly.

Here is the shape of a `ClassItem`:

```ts
{
  name: 'Baby Bees',
  age: 'Ages 2–3',
  tagline: 'Gentle beginnings',
  description: 'Nurturing routines, sensory discovery, language-rich play, and patient settling-in support.',
  skills: ['Sensory play', 'Songs & rhymes', 'Colors & shapes', 'Daily dua'],
  color: 'gold'
}
```

## 10. Cheat sheet: I want to change X

| I want to... | Edit this |
| --- | --- |
| Change class info | All three content files: `apps/web/src/app/page.tsx`, `apps/web/src/app/portal/demo-data.ts`, `apps/mobile/lib/content.ts`. |
| Change nav links | `apps/web/src/app/site-header.tsx`, lines 5-13. |
| Change a colour site-wide | Web: `apps/web/src/app/globals.css` `:root`. Mobile: `apps/mobile/theme/tokens.ts`. Do both. |
| Change phone or email | Web: `apps/web/src/app/page.tsx` contact section. Mobile: `apps/mobile/lib/content.ts` `contact`, plus the two `Linking.openURL` calls in `apps/mobile/app/(tabs)/campus.tsx`. |
| Add a homepage section | Edit `apps/web/src/app/page.tsx`, add CSS to `apps/web/src/app/globals.css`, add a nav link in `apps/web/src/app/site-header.tsx`. |
| Add a mobile tab | Create the file in `apps/mobile/app/(tabs)/`, add a `<Tabs.Screen>` in `apps/mobile/app/(tabs)/_layout.tsx`, add an icon to `apps/mobile/components/icon.tsx`. |
| Add a mobile icon | `apps/mobile/components/icon.tsx` and widen the `IconName` union. |
| Change portal demo data | `apps/web/src/app/portal/demo-data.ts`. |
| Add a portal view | `apps/web/src/app/portal/portal-app.tsx` plus `itemsForRole`. |
| Replace the hero | `apps/web/public/admission-video.html` and `apps/web/src/app/hero.tsx`. |
| Change fonts | Web: Google Fonts import in `apps/web/src/app/globals.css`. Mobile: `apps/mobile/theme/typography.ts` plus the `@expo-google-fonts/*` dependency. |
| Make the forms actually work | Needs a backend first, so this is a design decision not an edit. |

## 11. How to run it

```bash
# Install everything once, from the repo root
pnpm install
```

```bash
# Website
pnpm --filter @neobee/web dev
# Or: cd apps/web && pnpm dev
# Opens on localhost:3000
# Portal is at localhost:3000/portal
```

```bash
# Mobile app
pnpm --filter @neobee/mobile start
# Then scan the QR code with Expo Go
```

```bash
# Root shortcuts
pnpm dev   # runs both in parallel
pnpm build
pnpm lint
```

`pnpm typecheck` and `pnpm test` exist at root but **no package defines those scripts**, so they currently do nothing.

`.env.example` files exist (`apps/web` has `NEXT_PUBLIC_SITE_URL`, `apps/mobile` has `EXPO_PUBLIC_APP_NAME`) and neither app actually reads an env var yet.

## 12. Rules this repo follows

Each rule and why it matters, so you know when it matters:

- **Expo Go only** for `apps/mobile`: no custom native modules, no config plugins, no `expo prebuild`, no dev client. A library is only allowed if it is pure JS/TS or ships inside the Expo SDK. Why it matters: this is what lets the app run by scanning a QR code with no Xcode or Android Studio. Adding one wrong package breaks that permanently. There is a checklist skill at `apps/mobile/.agents/skills/expo-go-gate/SKILL.md` for vetting packages before install.
- **No Tailwind anywhere.** Web uses CSS custom properties, mobile uses typed inline styles.
- **Nothing but screens inside `apps/mobile/app/`**, because expo-router turns every file there into a route.
- **kebab-case filenames** in mobile.
- **Use `process.env.EXPO_OS`, not `Platform.OS`** for platform checks in mobile.
- **`expo-router` only**, never import `@react-navigation/*` directly.
- **Never read or commit `.env`.** Only `.env.example`.
- **No dependency added without naming the package and version first.**
- **No git commit, push or branch change without explicit confirmation.**
- **Do not edit `skills-lock.json`** (managed by the `npx skills` CLI).

Agent skills in `apps/mobile/.agents/skills/`:

- `expo-go-gate` (local, package vetting)
- `expo-native-ui`
- `expo-data-fetching`
- `expo-upgrade`
- `expo-examples`

The last four come from `expo/skills` and are pinned in `skills-lock.json`.

## 13. Loose ends and known issues

- **The whole mobile app is untracked in git.** `apps/mobile/app/`, `components/`, `lib/`, `theme/`, `AGENTS.md`, `.agents/` and `skills-lock.json` have never been committed. Currently modified but uncommitted: `apps/mobile/app.json`, `apps/mobile/package.json`, `apps/web/next-env.d.ts`, `apps/web/src/app/hero.tsx`, `pnpm-lock.yaml`. Only 5 commits exist on `main`, all web work. This is the most urgent thing to fix, because none of the mobile work is backed up.
- **`framer-motion` is installed but never imported.** Removable.
- **Dead assets in `apps/web/public/`**: `images/hero-poster.png` (1.27 MB), `images/neobee-bee.png` (75 KB), `images/neobee-logo.png` (213 KB), `videos/hero-audio.wav` (1.76 MB). None are referenced anywhere in `src/`. That is roughly 3.3 MB of unused files, because the brand marks are inline SVG and the hero is the iframe bundle.
- **`components/badge.tsx`** in mobile is exported but unused.
- **Unused mobile tokens**: `duration`, `container`, and `breakpoints.md` / `breakpoints.lg`. `section-heading.tsx` hardcodes `width < 560` instead of reading `breakpoints.sm`.
- **`chip.tsx` has duplicate tones**: `leafSoft`/`nectar`/`sky` are the same colours as `green`/`gold`/`blue`.
- **`contact.mapQuery`** in mobile content is never used.
- **All teacher names and credentials are placeholders**, and the code says so explicitly. Must be replaced before this is public.
- **All notices are prefixed "Demo notice".**
- **`today` is hardcoded to `2026-07-25`** in the portal.
- **No error, loading or not-found screens** in either app. Web has no `error.tsx`, `loading.tsx` or `not-found.tsx`; mobile has no `+not-found`.
- **No tests, no CI, no pre-commit hooks.**
- **`app.json` has no icon or splash configuration**, so the mobile app currently uses Expo defaults.

## 14. If you only remember five things

1. No backend. Everything is hardcoded and nothing saves.
2. Content lives in three separate files. Edit all three.
3. Web styling is `globals.css` tokens; mobile styling is `theme/tokens.ts` inline styles. No Tailwind.
4. `apps/mobile/app/` is routes only. Put everything else in `components/`, `theme/`, `lib/`.
5. Commit the mobile app. It is not in git yet.
