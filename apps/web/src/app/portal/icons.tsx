import type { ReactNode } from "react";

// Stroke-based 24x24 icons, mirroring the style used in site-header.tsx/page.tsx.
// Single source for icons used inside the portal demo shell.

type PortalIconName =
  | "dashboard"
  | "attendance"
  | "diary"
  | "invoice"
  | "notice"
  | "users"
  | "pipeline"
  | "growth"
  | "settings"
  | "logout"
  | "switch"
  | "back"
  | "menu"
  | "close"
  | "check"
  | "plus"
  | "spark"
  | "lock";

const paths: Record<PortalIconName, ReactNode> = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="8" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
      <rect x="3.5" y="14.5" width="7" height="6" rx="1.5" />
    </>
  ),
  attendance: (
    <>
      <path d="M4 7h16" />
      <path d="m6 12 3 3 5-6" />
      <path d="M16 11h4M16 15h4" />
    </>
  ),
  diary: (
    <>
      <path d="M6 3.5h9l3 3V20a.5.5 0 0 1-.5.5H6A.5.5 0 0 1 5.5 20V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M14 3.5V7h4" />
      <path d="M8 11h8M8 14h8M8 17h5" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3.5h9l3 3V20l-3-2-3 2-3-2-3 2V3.5Z" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </>
  ),
  notice: (
    <>
      <path d="M5 5h14v11H8l-3 3V5Z" />
      <path d="M9 9h6M9 12h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19c.6-3 2.7-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <circle cx="16.5" cy="8" r="2.6" />
      <path d="M14.5 14.5c2.7 0 4.4 1.4 5 4" />
    </>
  ),
  pipeline: (
    <>
      <rect x="3.5" y="4" width="5" height="16" rx="1.5" />
      <rect x="9.5" y="4" width="5" height="16" rx="1.5" />
      <rect x="15.5" y="4" width="5" height="16" rx="1.5" />
      <path d="M5.5 9h1M11.5 12h1M17.5 7h1" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19h16" />
      <path d="M6 16V11M10 16V8M14 16V13M18 16V6" />
      <path d="m5 8 3-3 3 2 4-5 4 3" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 8l-4 4 4 4" />
      <path d="M6 12h11" />
    </>
  ),
  switch: (
    <>
      <path d="M4 8h13" />
      <path d="m14 5 3 3-3 3" />
      <path d="M20 16H7" />
      <path d="m10 13-3 3 3 3" />
    </>
  ),
  back: (
    <>
      <path d="M5 12h14" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  spark: (
    <>
      <path d="M12 4v6" />
      <path d="M12 14v6" />
      <path d="M4 12h6" />
      <path d="M14 12h6" />
      <path d="m6.3 6.3 4.2 4.2" />
      <path d="m13.5 13.5 4.2 4.2" />
      <path d="m17.7 6.3-4.2 4.2" />
      <path d="m10.5 13.5-4.2 4.2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.2" />
    </>
  ),
};

export function PortalIcon({ name }: Readonly<{ name: PortalIconName }>) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export type { PortalIconName };
