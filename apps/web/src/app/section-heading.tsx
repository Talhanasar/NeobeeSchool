import type { ReactNode } from "react";
import { Icon } from "./icon-component";
import type { IconName } from "./icon-component";
import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title, lead, centered = false }: Readonly<{ eyebrow: string; title: ReactNode; lead: string; centered?: boolean }>) {
  return (
    <Reveal>
      <div className={`section-heading${centered ? " centered" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
    </Reveal>
  );
}

export function ContactItem({ icon, title, children }: Readonly<{ icon: IconName; title: string; children: ReactNode }>) {
  return (
    <div className="contact-item">
      <span className="hex-icon"><Icon name={icon} /></span>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}
