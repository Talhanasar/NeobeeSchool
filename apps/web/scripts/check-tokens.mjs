// Guards the token migration: a var() with no matching definition is invalid CSS
// that fails silently — the property is simply dropped, so nothing errors and the
// regression only shows up visually. Run after any token rename.
//   node apps/web/scripts/check-tokens.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const cssPath = fileURLToPath(new URL("../src/app/globals.css", import.meta.url));
const css = readFileSync(cssPath, "utf8");

const defined = new Set([...css.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]));
const referenced = new Set([...css.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)].map((m) => m[1]));
const dangling = [...referenced].filter((t) => !defined.has(t));

console.log(`${defined.size} defined, ${referenced.size} referenced`);

if (dangling.length > 0) {
  console.error(`FAIL — ${dangling.length} unresolved var() reference(s):`);
  for (const token of dangling) console.error(`  ${token}`);
  process.exit(1);
}

console.log("PASS — every var() resolves");
