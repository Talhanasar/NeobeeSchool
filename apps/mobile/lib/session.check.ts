// Runnable self-check for session + demo-data additions.
// Run with: npx tsx lib/session.check.ts  (or via node --import tsx)

import {
  checkCredentials,
  demoCredentials,
  rosterSummary,
  teacherClass,
} from './demo-data';
import type { Role } from './session';

// Minimal assert — no dependency needed.
function assertEqual<T>(actual: T, expected: T, msg: string): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${msg}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}
function assertOk(value: boolean, msg: string): void {
  if (!value) throw new Error(msg);
}

// -- demoCredentials shape --------------------------------------------------

const credKeys = Object.keys(demoCredentials).sort();
assertEqual(credKeys, ['parent', 'teacher'], 'demoCredentials must have exactly the keys "parent" and "teacher"');

for (const role of ['parent', 'teacher'] as const satisfies readonly Role[]) {
  const entry = demoCredentials[role];
  assertOk(entry.phone.length > 0, `${role} phone must be non-empty`);
  assertOk(entry.password.length > 0, `${role} password must be non-empty`);
}

// -- checkCredentials -------------------------------------------------------

const parentOk = checkCredentials('parent', '01711 000 111', 'neobee123');
assertEqual(parentOk, true, 'correct parent credentials should match');

const parentOkNoSpaces = checkCredentials('parent', '01711000111', 'neobee123');
assertEqual(parentOkNoSpaces, true, 'phone comparison should ignore spaces');

const parentWrong = checkCredentials('parent', '01711 000 111', 'wrongpass');
assertEqual(parentWrong, false, 'wrong password should not match');

const teacherOk = checkCredentials('teacher', '01711000222', 'neobee123');
assertEqual(teacherOk, true, 'correct teacher credentials should match');

// -- rosterSummary ---------------------------------------------------------

const summary = rosterSummary(teacherClass.roster);
assertEqual(
  summary.present + summary.absent + summary.late,
  teacherClass.roster.length,
  'rosterSummary counts must sum to roster length',
);

console.log('session.check: all assertions passed.');
