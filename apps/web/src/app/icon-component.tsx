import type { ReactNode } from "react";

export type IconName =
  | "book"
  | "heart"
  | "leaf"
  | "blocks"
  | "language"
  | "moon"
  | "calendar"
  | "play"
  | "shield"
  | "camera"
  | "firstAid"
  | "fire"
  | "pickup"
  | "pin"
  | "phone"
  | "mail"
  | "location"
  | "clock"
  | "arrow"
  | "check";

export function Icon({ name }: Readonly<{ name: IconName }>) {
  const paths: Record<IconName, ReactNode> = {
    book: <><path d="M4 5.5c3.2-.8 5.8-.2 8 1.7v12.3c-2.2-1.9-4.8-2.5-8-1.7V5.5Zm16 0c-3.2-.8-5.8-.2-8 1.7v12.3c2.2-1.9 4.8-2.5 8-1.7V5.5Z" /></>,
    heart: <path d="M12 20S4 15.7 4 9.5C4 5 9.5 3.3 12 7c2.5-3.7 8-2 8 2.5C20 15.7 12 20 12 20Z" />,
    leaf: <><path d="M19.5 4.5C11 4.5 5.5 8.4 5.5 14.2c0 3.1 2.4 5.3 5.4 5.3 6.1 0 8.6-6.1 8.6-15Z" /><path d="M5 20c2.2-5.2 5.8-8.4 11-10.2" /></>,
    blocks: <><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /><path d="m12 3 5 8H7l5-8Z" /></>,
    language: <><path d="M4 5h10M9 5c0 6-2 9-5 11m4-7c1 3 3 5 6 7m2-5 4 9m0-9-4 9m1.2-3h5.6" /></>,
    moon: <path d="M19.5 15.5A8 8 0 0 1 8.5 4.4 8 8 0 1 0 19.5 15.5Z" />,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M8 3v4m8-4v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01" /></>,
    play: <><path d="M5 16c0-5 2.5-8 7-8s7 3 7 8" /><path d="M7 16v2m10-2v2M9 8l-1-4m7 4 1-4M8 13h8M12 13v7" /></>,
    shield: <path d="M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Zm-3 9 2 2 4-5" />,
    camera: <><rect x="3" y="7" width="18" height="12" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="m8 7 1-3h6l1 3" /></>,
    firstAid: <><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M9 6V4h6v2m-3 4v6m-3-3h6" /></>,
    fire: <path d="M13 3c1 5-4 5-2 9 1-2 3-2 4-4 3 3 4 7 2 10-2.5 3.8-9.5 3.2-11-1.4C4.8 13 7 10 9 8c0 3 1 3 1 3s-1-5 3-8Z" />,
    pickup: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3.5 20c.5-4.2 2.3-6 5.5-6s5 1.8 5.5 6m0-5c3-.2 4.8 1.5 5 5" /></>,
    pin: <><path d="M9 4h6l-.8 5 3.3 3H6.5l3.3-3L9 4Z" /><path d="M12 12v9" /></>,
    phone: <path d="M7 3 4 5c0 8.3 6.7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2-3-5Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    location: <><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
