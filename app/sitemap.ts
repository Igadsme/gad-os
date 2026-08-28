import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/experience",
    "/skills",
    "/gallery",
    "/music",
    "/about",
    "/resume",
    "/contact",
  ];
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);
  return [...routes, ...projectRoutes].map((route) => ({
    url: `${profile.website}${route}`,
    lastModified: new Date("2026-08-28"),
  }));
}
