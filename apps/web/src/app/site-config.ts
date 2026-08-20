// Single source of truth for site-wide identity and SEO values.
// NEXT_PUBLIC_SITE_URL is declared in .env.example; the fallback below is a
// placeholder and must be replaced with the real production domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.neobeepreschool.com";

export const school = {
  name: "Neobee Preschool",
  parentBrand: "Neobee International School",
  legalName: "Neobee International School",
  tagline: "Play-based early years in Panchlaish, Chattogram",
  phone: "+8801347449472",
  phoneDisplay: "+88 013 4744 9472",
  email: "neobeepreschool@gmail.com",
  street: "Panchlaish R/A, opposite Halda Officers Apartment",
  locality: "Panchlaish",
  region: "Chattogram",
  country: "BD",
  ageRange: "2-6 years",
  admissions: {
    statusLabel: "Admissions open",
    session: "2026–27 founding session",
    headline: "Now enrolling for 2026–27",
    lead: "A warm, play-based preschool in Panchlaish. Small class groups — limited seats in every level.",
    ctaLabel: "Start your inquiry",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const academicsLinks = [
  {
    label: "Curriculum",
    href: "/academics/curriculum",
    description: "The play-based, Montessori-inspired curriculum in detail — what each bee class covers, day by day.",
  },
  {
    label: "Academic Calendar",
    href: "/academics/calendar",
    description: "Term dates, breaks, and key events for the year — in one place.",
  },
] as const;

export const footerLinks = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Curriculum", href: "/academics/curriculum" },
    { label: "Academic Calendar", href: "/academics/calendar" },
    { label: "Admissions", href: "/admissions" },
    { label: "Campus Life", href: "/campus-life" },
  ],
  families: [
    { label: "Admissions", href: "/admissions" },
    { label: "Apply Now", href: "/admissions/apply" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
