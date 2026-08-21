import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { MotionProvider } from "./motion-provider";
import { SITE_URL } from "./site-config";
import { SchoolJsonLd } from "./structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neobee Preschool | Play-Based Early Years in Panchlaish, Chattogram",
    template: "%s | Neobee Preschool",
  },
  description:
    "Warm, play-based preschool for ages 2–6 in Panchlaish, Chattogram. English and Bangla learning, small class groups, indoor soft play. Now enrolling — book a campus visit.",
  keywords: [
    "preschool Chattogram",
    "preschool Panchlaish",
    "playgroup Chattogram",
    "kindergarten Chattogram",
    "early years school Bangladesh",
    "Neobee Preschool",
    "Neobee International School",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: SITE_URL,
    siteName: "Neobee Preschool",
    title: "Neobee Preschool — Where little bees learn to fly",
    description: "Play-based early learning for ages 2–6 in Panchlaish, Chattogram. Now enrolling.",
    images: [
      {
        url: "/images/hero-poster.png",
        width: 937,
        height: 916,
        alt: "Children playing at Neobee Preschool in Panchlaish, Chattogram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neobee Preschool — Where little bees learn to fly",
    description: "Play-based early learning for ages 2–6 in Panchlaish, Chattogram.",
    images: ["/images/hero-poster.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SchoolJsonLd />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
