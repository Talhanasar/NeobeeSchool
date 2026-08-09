import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neobee Preschool",
    short_name: "Neobee",
    description:
      "Warm, play-based preschool for ages 2–6 in Panchlaish, Chattogram. English and Bangla learning, small class groups, indoor soft play. Now enrolling — book a campus visit.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#f5a81c",
    icons: [
      {
        src: "/images/neobee-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
