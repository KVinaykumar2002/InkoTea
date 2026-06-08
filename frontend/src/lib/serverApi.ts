import type { BlogPost } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://inkotea.onrender.com/api";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/blog`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  const data = (await res.json()) as { posts: BlogPost[] };
  return data.posts;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/blog/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }
  const data = (await res.json()) as { post: BlogPost };
  return data.post;
}
