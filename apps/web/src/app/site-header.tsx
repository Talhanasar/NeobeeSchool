"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "./site-config";
import { useOverlay } from "./overlay";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Drawer motion. Exit is faster than enter so dismissal feels immediate.
// MotionConfig reducedMotion="user" (root layout) drops the y-transform for users
// who ask for reduced motion and keeps the opacity fade.
const drawerVariants = {
  closed: { opacity: 0, y: -8, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const } },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0, 0, 0.2, 1] as const, staggerChildren: 0.04, delayChildren: 0.06 },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: -4 },
  open: { opacity: 1, y: 0 },
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useOverlay({ open, onClose: close, overlayRef: drawerRef, toggleRef });

  return (
    <>
      {/* The scrim is a sibling of <header>, not a child. .site-header sets
          backdrop-filter, which creates a containing block AND a stacking context —
          a scrim nested inside it would resolve `inset: 0` against the header box and
          paint over the header's own background, dimming the brand and close button. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-scrim"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>

      <header className="site-header">
        <div className="container nav-shell">
          <Link className="brand" href="/" aria-label="Neobee Preschool home">
            <span className="brand-mark" aria-hidden="true"><BeeIcon /></span>
            <span className="brand-copy"><strong>Neobee Preschool</strong><small>part of Neobee International School</small></span>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(pathname, link.href) ? "is-active" : undefined}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link className="button button-primary nav-cta" href="/admissions/apply">Apply Now</Link>

          <button
            ref={toggleRef}
            className="button button-ghost button-icon menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
            <span aria-hidden="true" className={open ? "menu-lines is-open" : "menu-lines"}><i /><i /><i /></span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              ref={drawerRef}
              id="site-drawer"
              className="site-drawer"
              aria-label="Main navigation"
              aria-modal="true"
              role="dialog"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className={isActive(pathname, link.href) ? "is-active" : undefined}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="site-drawer-cta">
                <Link className="button button-primary" href="/admissions/apply" onClick={close}>
                  Apply Now
                </Link>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function BeeIcon() {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Bee">
      <path d="M19 19c-5-7-12-5-11 1 1 5 7 6 12 4m9-5c5-7 12-5 11 1-1 5-7 6-12 4" fill="#f8fdff" stroke="currentColor" strokeWidth="2" />
      <path d="M14 28c0-8 4-13 10-13s10 5 10 13-4 13-10 13-10-5-10-13Z" fill="#f5a81c" stroke="currentColor" strokeWidth="2" />
      <path d="M16 23h16M15 30h18" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="m24 41 3-4h-6l3 4ZM20 14l-3-4m11 4 3-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2" fill="currentColor" /><circle cx="31" cy="9" r="2" fill="currentColor" />
    </svg>
  );
}
