import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { fetchBlogPosts } from "@/lib/serverApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = [
    "",
    "about",
    "franchise",
    "why-inkotea",
    "products",
    "testimonials",
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

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogPages = posts.map((p) => ({
      url: `${BRAND.siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    blogPages = [];
  }

  return [...staticPages, ...blogPages];
}
