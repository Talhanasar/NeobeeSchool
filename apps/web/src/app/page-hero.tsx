export function PageHero({ eyebrow, title, lead }: Readonly<{ eyebrow?: string; title: string; lead?: string }>) {
  return (
    <section className="page-hero honeycomb-bg">
      <div className="container">
        {eyebrow && <p className="eyebrow light">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
      </div>
    </section>
  );
}
