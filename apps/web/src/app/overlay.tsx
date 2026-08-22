"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

// Shared overlay behaviour for the two drawer-style overlays: the site nav
// drawer (AnimatePresence mount/unmount) and the portal sidebar (CSS transform
// — it is a persistent sticky element on desktop and a drawer only below the
// 820px breakpoint, so mount/unmount would need JS breakpoint awareness).
// The primitive is the behaviour contract, not the rendering strategy:
// Escape closes, Tab wraps inside the overlay (against the toggle in both
// directions), the page locks while open and restores the previous overflow
// on close, and focus returns to the toggle.
//
// Neither overlay takes --radius-xl: both are edge-anchored sheets (full-width
// under the header; left-anchored sidebar) and rounding an edge-anchored sheet
// is wrong. Centered dialogs should use --radius-xl when one exists.

type OverlayOptions = {
  open: boolean;
  onClose: () => void;
  overlayRef: RefObject<HTMLElement | null>;
  toggleRef: RefObject<HTMLElement | null>;
};

export function useOverlay({ open, onClose, overlayRef, toggleRef }: OverlayOptions) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === toggleRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, overlayRef, toggleRef]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
}
