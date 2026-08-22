"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

// Scroll-reveal primitives. `whileInView` with once:true fires a single reveal
// when 30% of the element crosses a viewport 80px inside the edge — far enough
// that the element is genuinely on screen, not just peeking. opacity + y 16→0
// over 300ms; MotionConfig reducedMotion="user" drops the y-shift and keeps the
// fade for users who ask for less motion.
//
// These are the ONLY hover-free animations on static content: button and card
// hover/press deliberately stay in CSS (see the Phase 6 note in globals.css) —
// they are composited, work before hydration on this fully prerendered site,
// and would otherwise need to drag server components into the client bundle.

const viewport = { once: true, amount: 0.3, margin: "-80px" } as const;

export function Reveal({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <m.div
      className="js-reveal"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as const }}
    >
      {children}
    </m.div>
  );
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as const } },
};

export function RevealGrid({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <m.div
      className={className}
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <m.div className="reveal-item js-reveal" variants={itemVariants}>
      {children}
    </m.div>
  );
}
