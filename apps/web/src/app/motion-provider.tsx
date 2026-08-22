"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// The global `prefers-reduced-motion` rule in globals.css only governs CSS
// transitions and keyframes. Framer Motion drives inline styles from JS, so it is
// unaffected by that rule and needs this wrapper too. reducedMotion="user" drops
// transform and layout animation while still allowing opacity and colour.
//
// LazyMotion + domAnimation + `strict`: every animated component in the app uses
// the `m.` prefix, and the feature bundle (variants, in-view, exit gestures —
// everything this site needs; drag and layout projection live in domMax and are
// unused) loads once here instead of being pulled into each importing chunk.
// `strict` makes any accidental `motion.` import throw at runtime rather than
// silently double-loading features.
//
// Thin client boundary: the root layout is a Server Component (it exports
// `metadata`), so neither wrapper can be applied there directly.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
