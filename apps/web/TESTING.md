# Testing notes — apps/web

## Known browser-automation gotchas

### Playwright actionability times out on the sticky header

Playwright's `click()` timed out on both the `.menu-button` selector and
`getByRole("button", { name: "Open navigation" })`. At the same moment,
Playwright reported the element as `visible: true, enabled: true`.

The element was genuinely clickable by a human. This was not an app bug.
The probable cause is that the actionability check, including hit-target and
stability verification, struggles with `.site-header`, which is
`position: sticky` and sets `backdrop-filter: blur(14px)`. `backdrop-filter`
creates a new stacking context and a containing block, which appears to
confuse the hit-target test.

A coordinate click at the element's box centre worked reliably every time.
For a 390px-wide viewport, one observed click was at `x=336, y=77`.
Coordinate clicks produced the correct application state on every attempt:
the drawer opened and `aria-expanded` flipped.

### Locator state can go stale on animated elements

`count()` and `isVisible()` returned stale nodes for the drawer and scrim,
reporting `opacity: 1` for elements that screenshots proved were not rendered
at all.

The cause is the `AnimatePresence` mount/unmount cycle. These elements do not
exist in the DOM when closed; they are not merely hidden.

For anything inside `AnimatePresence`, assert on a screenshot or on an
observable side effect such as `aria-expanded` on the toggle or
`document.body.style.overflow`. Prefer pixels over locators when the two
disagree.

### `evaluate()` may be refused

Two `playwright.evaluate()` calls were rejected by the harness with the
message `Possible side-effect in debug-evaluate` and were not retried.
The cause was not investigated.

## What actually worked

- Use coordinate clicks over selector clicks for controls inside the sticky header.
- Use screenshots as the source of truth for drawer and scrim presence.
- Assert on side effects that outlive the animation:
  `aria-expanded` on the toggle button, `body { overflow: hidden }` while the
drawer is open and its restoration on close, and focus returning to the toggle
after Escape.
- Sweep discrete viewport widths to check the nav breakpoint instead of using
a single mobile width. The switchover is at `1080/1081px`.
