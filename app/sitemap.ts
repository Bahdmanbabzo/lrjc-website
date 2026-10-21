import type { MetadataRoute } from "next";
import { getIssues, getPublishedArticles } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/journal-club`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/annual-journal`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/resources`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const articles = await getPublishedArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/journal-club/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  const issues = await getIssues();
  const issueRoutes: MetadataRoute.Sitemap = issues.map(({ issue }) => ({
    url: `${site.url}/annual-journal/${issue.year}`,
    lastModified: new Date(issue.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...issueRoutes, ...articleRoutes];
}
