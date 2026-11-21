import { MetadataRoute } from "next";
import { PROFILE_DATA } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ansharora.dev";

  const projectUrls = PROFILE_DATA.featuredProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const compactProjectUrls = PROFILE_DATA.compactProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...projectUrls,
    ...compactProjectUrls,
  ];
}
