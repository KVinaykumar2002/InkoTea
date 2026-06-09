import type { BlogPost } from "@/types";
import { API_BASE } from "@/lib/apiBase";

async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  retries = 2,
): Promise<Response | null> {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(8_000),
      });
      if (res.ok || res.status === 404) return res;
    } catch {
      // API may be cold or unreachable during build; callers handle null.
    }

    if (attempt < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  return null;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetchWithRetry(`${API_BASE}/blog`, {
    next: { revalidate: 60 },
  });
  if (!res?.ok) return [];
  const data = (await res.json()) as { posts: BlogPost[] };
  return data.posts;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetchWithRetry(`${API_BASE}/blog/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res || res.status === 404 || !res.ok) return null;
  const data = (await res.json()) as { post: BlogPost };
  return data.post;
}
