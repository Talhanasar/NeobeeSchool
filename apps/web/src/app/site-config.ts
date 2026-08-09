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
} as const;
