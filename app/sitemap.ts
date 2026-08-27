import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/experience",
    "/skills",
    "/assistant",
    "/lab",
    "/gallery",
    "/music",
    "/about",
    "/resume",
    "/contact",
  ];
  return routes.map((route) => ({
    url: `${profile.website}${route}`,
    lastModified: new Date("2026-08-27"),
  }));
}
