import { SITE_URL, school } from "./site-config";

const data = {
  "@context": "https://schema.org",
  "@type": ["Preschool", "EducationalOrganization"],
  "@id": `${SITE_URL}/#school`,
  name: "Neobee Preschool",
  alternateName: "Neobee International School",
  description:
    "Play-based preschool for children aged 2–6 in Panchlaish, Chattogram, offering English and Bangla early-years learning.",
  url: SITE_URL,
  telephone: school.phone,
  email: school.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: school.street,
    addressLocality: school.locality,
    addressRegion: school.region,
    addressCountry: school.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:30",
      closes: "11:30",
    },
  ],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Children aged 2 to 6",
  },
  inLanguage: ["en", "bn"],
};

export function SchoolJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
