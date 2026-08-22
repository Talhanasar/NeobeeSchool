"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";

// Replaces the native <details> accordion: the native toggle works without JS
// but cannot animate — `display`-swapped content jumps. Each item keeps its own
// open state (the <details> version allowed multiple panels open, and so does
// this), the summary becomes a real button with aria-expanded/aria-controls, and
// the body mounts through AnimatePresence so height:auto can animate both ways.
// Under reduced motion MotionConfig drops the height/transform tween and keeps
// the opacity fade; the panel still opens instantly.

function AccordionItem({
  title,
  body,
  preview,
  defaultOpen,
}: Readonly<{ title: string; body: ReactNode; preview?: string; defaultOpen: boolean }>) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <div className={`accordion-item${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="accordion-summary"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="accordion-text">
          <span className="accordion-title">{title}</span>
          {preview && <span className="accordion-preview">{preview}</span>}
        </span>
        <span className="accordion-marker" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={bodyId}
            className="accordion-body-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          >
            <div className="accordion-body">{body}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items,
  columns = 1,
  defaultOpenIndex,
}: Readonly<{
  items: readonly { title: string; body: ReactNode; preview?: string }[];
  columns?: 1 | 2;
  defaultOpenIndex?: number;
}>) {
  return (
    <div className="accordion" data-columns={columns}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          title={item.title}
          body={item.body}
          preview={item.preview}
          defaultOpen={i === defaultOpenIndex}
        />
      ))}
    </div>
  );
}
