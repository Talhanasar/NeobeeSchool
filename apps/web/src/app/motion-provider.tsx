"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// The global `prefers-reduced-motion` rule in globals.css only governs CSS
// transitions and keyframes. Framer Motion drives inline styles from JS, so it is
// unaffected by that rule and needs this wrapper too. reducedMotion="user" drops
// transform and layout animation while still allowing opacity and colour.
//
// Thin client boundary: the root layout is a Server Component (it exports
// `metadata`), so MotionConfig cannot be applied there directly.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
