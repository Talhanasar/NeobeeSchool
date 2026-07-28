// The hero is the bundled Neobee admission video, served as a self-contained
// static page and embedded same-origin in an iframe. The bundle ships its own
// loader and renders itself via JS on load (it even rewrites its own
// document.documentElement), so it must run in its own document — inlining
// it into React would replace our app. Same-origin keeps its frame
// origin-relay working.
export default function Hero() {
  return (
    <section className="hero">
      <iframe
        src="/admission-video.html"
        title="Neobee admission video"
        className="hero-video"
        loading="eager"
      />
    </section>
  );
}
