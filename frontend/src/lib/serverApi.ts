import type { BlogPost } from "@/types";

function getApiBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_URL || "https://inkotea.onrender.com/api";
  return raw.replace(/\/+$/, "");
}

const API_BASE = getApiBase();

async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  retries = 3,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const res = await fetch(url, init);
      if (res.ok || res.status === 404) return res;
      lastError = new Error(`Request failed with status ${res.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, 3000 * (attempt + 1)));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to fetch from API");
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetchWithRetry(`${API_BASE}/blog`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  const data = (await res.json()) as { posts: BlogPost[] };
  return data.posts;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetchWithRetry(`${API_BASE}/blog/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }
  const data = (await res.json()) as { post: BlogPost };
  return data.post;
}
