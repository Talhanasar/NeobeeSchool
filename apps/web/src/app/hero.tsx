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
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BeeIcon } from "./site-header";

const REVEAL_TIMEOUT_MS = 15000;
const POLL_INTERVAL_MS = 150;
const MAX_MISSED_POLLS = 8;
const STAGE_SELECTOR = "[data-om-exportable-video-with-duration-secs]";
const REWIND_FRAMES = 3;
const REVEAL_BACKSTOP_MS = 400;
const FRAME_SRC = "/admission-video.html";
// Mirrors the bundle's own `persistKey + ':t'` with persistKey at its default
// 'animstage' — neither SceneStage nor the bundled template overrides it. The
// bundle restores this value as its *initial* playhead, so a stale entry is
// why the animation used to start mid-timeline on every reload.
const PLAYHEAD_KEY = "animstage:t";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const pollRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const missRef = useRef(0);
  const mountedRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  const backstopRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (backstopRef.current !== null) {
      window.clearTimeout(backstopRef.current);
      backstopRef.current = null;
    }
  }, []);

  const rewind = useCallback(() => {
    try {
      const win = frameRef.current?.contentWindow;
      if (!win) return;
      const K = (win as Window & typeof globalThis).KeyboardEvent || KeyboardEvent;
      // The bundled Stage listens for the Home key to seek to frame 0.
      win.dispatchEvent(
        new K("keydown", { code: "Home", key: "Home", bubbles: true })
      );
    } catch {
      // Cross-origin or not-yet-mounted bundle must never block reveal.
    }
  }, []);

  const reveal = useCallback(() => {
    clearTimers();

    // Idempotent: the rAF chain and the backstop below both race to reveal,
    // and whichever lands first wins.
    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      if (mountedRef.current) setReady(true);
    };

    // rAF is suspended in a hidden/background tab, so a rAF-gated reveal would
    // trap the visitor behind the loader until they foreground the tab. Nothing
    // is visible to rewind for either, so flip straight away.
    if (document.hidden) {
      finish();
      return;
    }

    // Rewind repeatedly for a bounded number of frames so the Home-key dispatch
    // is not lost if Stage has not yet mounted its keydown listener.
    let frames = 0;
    const tick = () => {
      frames += 1;
      rewind();
      if (frames < REWIND_FRAMES) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      rafRef.current = null;
      finish();
    };
    rafRef.current = window.requestAnimationFrame(tick);
    // Backstop in case rAF stops being serviced mid-chain (tab backgrounded
    // after the first tick).
    backstopRef.current = window.setTimeout(() => {
      backstopRef.current = null;
      finish();
    }, REVEAL_BACKSTOP_MS);
  }, [clearTimers, rewind]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Clear the bundle's persisted playhead before its document can read it. The
  // frame is rendered with no src at all, so it has no document to run until
  // this effect commits one — that is what makes the ordering deterministic
  // rather than a race we happen to win.
  useLayoutEffect(() => {
    try {
      window.localStorage.removeItem(PLAYHEAD_KEY);
    } catch {
      // Private browsing, disabled storage or a SecurityError must never break
      // the hero: a stale playhead is survivable, a dead frame is not.
    }
    const frame = frameRef.current;
    if (frame) frame.src = FRAME_SRC;
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
      const stageReady = doc.querySelector(STAGE_SELECTOR) !== null;

      if (hasContent && !unpacking && stageReady) reveal();
    }, POLL_INTERVAL_MS);
  }, [reveal]);

  return (
    <section className="hero">
      <iframe
        ref={frameRef}
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
