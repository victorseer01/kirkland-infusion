import type { MetadataRoute } from "next";
import { SITE, ALL_ROUTES, SPECIALTIES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...ALL_ROUTES,
    ...SPECIALTIES.map((s) => `/specialties/${s.slug}`),
  ];
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
