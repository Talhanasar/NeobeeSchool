import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "./icon-component";
import type { IconName } from "./icon-component";
import { PhotoFrame } from "./photo";
import type { Photo } from "./photos";

/* ─── Link helper (internal → next/link, external → <a>) ─── */

function CtaLink({
  label,
  href,
  icon,
  className,
}: Readonly<{
  label: string;
  href: string;
  icon?: IconName;
  className?: string;
}>) {
  const inner = (
    <>
      {label}
      {icon && <Icon name={icon} />}
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

/* ─── 1. Accordion ─── */

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
        <details
          key={i}
          className="accordion-item"
          open={i === defaultOpenIndex}
        >
          <summary>
            <span className="accordion-text">
              <span className="accordion-title">{item.title}</span>
              {item.preview && (
                <span className="accordion-preview">{item.preview}</span>
              )}
            </span>
            <span className="accordion-marker" aria-hidden="true" />
          </summary>
          <div className="accordion-body">{item.body}</div>
        </details>
      ))}
    </div>
  );
}

/* ─── 2. ProgramCard + ProgramGrid ─── */

export function ProgramCard({
  name,
  age,
  tagline,
  body,
  bullets,
  photo,
}: Readonly<{
  name: string;
  age: string;
  tagline: string;
  body: string;
  bullets?: readonly string[];
  photo?: Photo;
}>) {
  return (
    <article className="program-card">
      {photo && <PhotoFrame photo={photo} />}
      <h3>{name}</h3>
      <p className="program-age">{age}</p>
      <p className="program-tagline">{tagline}</p>
      <p>{body}</p>
      {bullets && bullets.length > 0 && (
        <ul className="program-bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function ProgramGrid({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="program-grid">{children}</div>;
}

/* ─── 3. FeatureTile + FeatureTileGrid ─── */

export function FeatureTile({
  title,
  body,
  icon,
}: Readonly<{
  title: string;
  body: string;
  icon?: IconName;
}>) {
  return (
    <article className="feature-tile">
      {icon && (
        <span className="icon-tile gold">
          <Icon name={icon} />
        </span>
      )}
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export function FeatureTileGrid({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="feature-tile-grid">{children}</div>;
}

/* ─── 4. CheckList + CheckListPair ─── */

export function CheckList({
  heading,
  items,
}: Readonly<{
  heading: string;
  items: readonly string[];
}>) {
  return (
    <div className="check-list">
      <h3>{heading}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Icon name="check" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CheckListPair({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="check-list-pair">{children}</div>;
}

/* ─── 5. StepList ─── */

export function StepList({
  steps,
}: Readonly<{
  steps: readonly { label?: string; title: string; body: string }[];
}>) {
  return (
    <ol className="step-list">
      {steps.map((step, i) => (
        <li key={i}>
          {/* ::before pseudo renders the CSS counter badge */}
          <div>
            {step.label && <span className="step-label">{step.label}</span>}
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ─── 6. QuestionsCta ─── */

export function QuestionsCta({
  heading,
  sub,
  primary,
  secondary,
}: Readonly<{
  heading: string;
  sub: string;
  primary: { label: string; href: string; icon?: IconName };
  secondary?: { label: string; href: string; icon?: IconName };
}>) {
  return (
    <aside className="questions-cta">
      <div className="questions-cta-copy">
        <h3>{heading}</h3>
        <p>{sub}</p>
      </div>
      <div className="questions-cta-actions">
        <CtaLink
          label={primary.label}
          href={primary.href}
          icon={primary.icon}
          className="button button-primary"
        />
        {secondary && (
          <CtaLink
            label={secondary.label}
            href={secondary.href}
            icon={secondary.icon}
            className="button button-outline"
          />
        )}
      </div>
    </aside>
  );
}

/* ─── 7. ClosingCta ─── */

export function ClosingCta({
  heading,
  body,
  primary,
  secondary,
}: Readonly<{
  heading: string;
  body?: string;
  primary: { label: string; href: string; icon?: IconName };
  secondary?: { label: string; href: string; icon?: IconName };
}>) {
  return (
    <section className="closing-cta">
      <div className="container">
        <h3>{heading}</h3>
        {body && <p>{body}</p>}
        <div className="closing-cta-actions">
          <CtaLink
            label={primary.label}
            href={primary.href}
            icon={primary.icon}
            className="button button-primary"
          />
          {secondary && (
            <CtaLink
              label={secondary.label}
              href={secondary.href}
              icon={secondary.icon}
              className="button button-outline"
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── 8. SplitSection ─── */

export function SplitSection({
  eyebrow,
  heading,
  body,
  media,
  flip = false,
}: Readonly<{
  eyebrow?: string;
  heading: string;
  body: ReactNode;
  media?: ReactNode;
  flip?: boolean;
}>) {
  return (
    <section className={`split-section${flip ? " split-section-flip" : ""}`}>
      <div className="split-section-text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3>{heading}</h3>
        <div>{body}</div>
      </div>
      {media && <div className="split-section-media">{media}</div>}
    </section>
  );
}
