"use client";

// The hero is the bundled Neobee admission video, served as a self-contained
// static page and embedded same-origin in an iframe. The bundle ships its own
// loader and renders itself via JS on load (it even rewrites its own
// document.documentElement), so it must run in its own document — inlining
// it into React would replace our app. Same-origin keeps its frame
// origin-relay working.
//
// The bundle never signals readiness to us, and its own iframe load event
// fires while it is still unpacking, so we poll the same-origin document for
// real rendered content and reveal on whichever comes first: content, a hard
// timeout, or an error. Without this the visitor stares at an empty panel
// while ~6MB downloads.
import { useCallback, useEffect, useRef, useState } from "react";
import { BeeIcon } from "./site-header";

const REVEAL_TIMEOUT_MS = 15000;
const POLL_INTERVAL_MS = 150;
const MAX_MISSED_POLLS = 8;

export default function Hero() {
  const [ready, setReady] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const pollRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const missRef = useRef(0);
  const mountedRef = useRef(true);

  const clearTimers = useCallback(() => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reveal = useCallback(() => {
    clearTimers();
    if (mountedRef.current) setReady(true);
  }, [clearTimers]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Failsafe: never trap the visitor behind the loader, whatever the bundle does.
  useEffect(() => {
    timeoutRef.current = window.setTimeout(reveal, REVEAL_TIMEOUT_MS);
    return clearTimers;
  }, [reveal, clearTimers]);

  // The bundle replaces its documentElement once it has rendered, so we watch
  // for a populated body with its "Unpacking..." placeholder gone.
  const handleLoad = useCallback(() => {
    if (pollRef.current !== null) return;

    pollRef.current = window.setInterval(() => {
      let doc: Document | null = null;
      try {
        doc = frameRef.current?.contentDocument ?? null;
      } catch {
        // Cross-origin: we can never inspect it, so stop waiting.
        reveal();
        return;
      }

      // A null document is usually transient (detach, mid-navigation), so give
      // it a few ticks before concluding we will never see content.
      if (!doc) {
        missRef.current += 1;
        if (missRef.current >= MAX_MISSED_POLLS) reveal();
        return;
      }
      missRef.current = 0;

      const body = doc.body;
      if (!body) return;

      const unpacking = doc.getElementById("__bundler_loading");
      const hasContent = body.children.length > 0 && body.scrollHeight > 0;

      if (hasContent && !unpacking) reveal();
    }, POLL_INTERVAL_MS);
  }, [reveal]);

  return (
    <section className="hero">
      <iframe
        ref={frameRef}
        src="/admission-video.html"
        title="Neobee admission video"
        className={`hero-video${ready ? " is-ready" : ""}`}
        loading="eager"
        aria-busy={!ready}
        onLoad={handleLoad}
        onError={reveal}
      />
      <div
        className={`hero-loader${ready ? " is-done" : ""}`}
        role="status"
        aria-live="polite"
        aria-hidden={ready}
      >
        <span className="hero-loader-bee" aria-hidden="true">
          <BeeIcon />
        </span>
        <p className="hero-loader-text">Loading the tour…</p>
      </div>
    </section>
  );
}
