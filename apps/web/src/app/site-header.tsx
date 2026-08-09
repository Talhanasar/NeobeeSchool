"use client";

import { useState } from "react";

const links = [
  ["Classes", "#classes"],
  ["A day here", "#day"],
  ["Campus", "#campus"],
  ["Admissions", "#admissions"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#main-content" aria-label="Neobee Preschool home">
          <span className="brand-mark" aria-hidden="true"><BeeIcon /></span>
          <span className="brand-copy"><strong>Neobee Preschool</strong><small>part of Neobee International School</small></span>
        </a>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden="true" className={open ? "menu-lines is-open" : "menu-lines"}><i /><i /><i /></span>
        </button>
        <nav id="site-navigation" className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <a className="button button-primary nav-cta" href="#admissions">Enquire now</a>
      </div>
    </header>
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
