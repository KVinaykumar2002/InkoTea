"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useApiContent<T>(fetcher: () => Promise<T>): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setData(null);
          setError(err instanceof Error ? err.message : "Failed to load content");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch once on mount
  }, []);

  return { data, loading, error };
}

export function useOutlets() {
  return useApiContent(() => api.getOutlets());
}

export function useMenu() {
  return useApiContent(() => api.getMenu());
}

export function useBlogPosts() {
  return useApiContent(() => api.getBlogPosts());
}

export function useFaqs() {
  return useApiContent(() => api.getFaqs());
}

export function useTestimonials() {
  return useApiContent(() => api.getTestimonials());
}

export function usePageContent<T>(slug: string, fallback: T) {
  const state = useApiContent(() => api.getPageContent<T>(slug));
  return {
    ...state,
    content: state.data?.content ?? fallback,
  };
}
