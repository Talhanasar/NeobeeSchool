import type { ReactNode } from "react";
import { SiteHeader } from "../site-header";
import { AnnouncementBar, SiteFooter, FloatingCta } from "../site-chrome";

export default function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
