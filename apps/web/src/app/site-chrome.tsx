import Link from "next/link";
import { Icon } from "./icon-component";
import { BeeIcon } from "./site-header";
import { school, footerLinks } from "./site-config";

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement-inner">
        <span className="announcement-label">{school.admissions.statusLabel}</span>
        <p>{school.admissions.session} · Limited seats</p>
        <Link href="/admissions">Apply <Icon name="arrow" /></Link>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-inverse" href="/">
            <span className="brand-mark" aria-hidden="true"><BeeIcon /></span>
            <span className="brand-copy"><strong>Neobee Preschool</strong><small>part of Neobee International School</small></span>
          </Link>
          <p>Play-based early learning for ages 2–6 in Panchlaish, Chattogram.</p>
        </div>
        <div>
          <h2>Explore</h2>
          {footerLinks.explore.map((link) => (
            <Link key={link.label} href={link.href}>{link.label}</Link>
          ))}
        </div>
        <div>
          <h2>Families</h2>
          {footerLinks.families.map((link) => (
            <Link key={link.label} href={link.href}>{link.label}</Link>
          ))}
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`tel:${school.phone}`}>{school.phoneDisplay}</a>
          <a href={`mailto:${school.email}`}>{school.email}</a>
          <p>Panchlaish R/A<br />Chattogram, Bangladesh</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Neobee International School</p>
        <a href="#main-content">Back to top <Icon name="arrow" /></a>
      </div>
    </footer>
  );
}

export function FloatingCta() {
  return (
    <Link className="floating-cta" href="/contact" aria-label="Contact the school">
      <Icon name="phone" />
      <span>Contact</span>
    </Link>
  );
}
