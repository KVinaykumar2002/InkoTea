"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/**
 * Fetches public content from the backend with a static fallback.
 * Keeps the marketing site usable when the API is offline.
 */
export function useApiContent<T>(
  fetcher: () => Promise<T>,
  fallback: T,
): { data: T; loading: boolean; fromApi: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setFromApi(true);
        }
      })
      .catch(() => {
        if (!cancelled) setData(fallback);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch once on mount
  }, []);

  return { data, loading, fromApi };
}

export function useOutlets(fallback: { outlets: import("@/lib/api").Outlet[]; cities: string[] }) {
  return useApiContent(
    () => api.getOutlets(),
    fallback,
  );
}

export function useMenu(fallback: {
  categories: import("@/types").MenuCategoryMeta[];
  items: import("@/types").MenuItem[];
}) {
  return useApiContent(() => api.getMenu(), fallback);
}

export function useBlogPosts(fallback: { posts: import("@/lib/api").BlogPost[] }) {
  return useApiContent(() => api.getBlogPosts(), fallback);
}

export function useFaqs(fallback: { faqs: import("@/lib/api").FAQ[] }) {
  return useApiContent(() => api.getFaqs(), fallback);
}

export function useTestimonials(fallback: { testimonials: import("@/lib/api").Testimonial[] }) {
  return useApiContent(() => api.getTestimonials(), fallback);
}
