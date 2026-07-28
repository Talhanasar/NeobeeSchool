import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neobee International School | Preschool in Panchlaish, Chattogram",
  description:
    "A warm, play-based preschool for children ages 2–6, blending an international early-years pathway with Bangla learning and Islamic values.",
  keywords: [
    "preschool Chattogram",
    "kindergarten Panchlaish",
    "early years school Bangladesh",
    "Neobee International School",
  ],
  openGraph: {
    title: "Neobee International School — Where little bees learn to fly",
    description:
      "Play-based early learning for ages 2–6 in Panchlaish, Chattogram.",
    type: "website",
    locale: "en_BD",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
