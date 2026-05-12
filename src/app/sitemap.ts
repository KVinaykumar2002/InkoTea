import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "about",
    "franchise",
    "why-inkotea",
    "menu",
    "outlets",
    "investor",
    "blog",
    "faq",
    "contact",
  ].map((slug) => ({
    url: `${BRAND.siteUrl}/${slug}`.replace(/\/$/, "") || BRAND.siteUrl,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: slug === "" ? 1 : 0.8,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${BRAND.siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
