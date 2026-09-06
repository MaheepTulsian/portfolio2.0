import type { MetadataRoute } from "next";
import { getData } from "@/lib/data";
import { generateSlug } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = ["", "/projects"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getData().projects.map((project) => ({
    url: `${base}/projects/${generateSlug(project.name)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
