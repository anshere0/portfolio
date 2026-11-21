import { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/lib/site";
import { FEATURED_PROJECTS, COMPACT_PROJECTS } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CANONICAL_SITE_URL.replace(/\/$/, "");

  const projectUrls = [
    ...FEATURED_PROJECTS.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...COMPACT_PROJECTS.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/styleguide`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    ...projectUrls,
  ];
}
