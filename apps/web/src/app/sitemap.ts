import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "academics", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "academics/curriculum", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "academics/calendar", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "admissions", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "admissions/apply", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "campus-life", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: SITE_URL + (route.path ? "/" + route.path : ""),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
