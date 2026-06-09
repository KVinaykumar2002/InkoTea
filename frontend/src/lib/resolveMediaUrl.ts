import { API_BASE } from "@/lib/apiBase";

/**
 * Normalise image paths from the API so they load on both local dev and
 * production (Vercel frontend + Render uploads).
 */
export function resolveMediaUrl(src: string | undefined | null): string {
  const trimmed = (src ?? "").trim();
  if (!trimmed) return "/fallback-image.svg";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }
  if (trimmed.startsWith("/uploads/")) {
    const apiOrigin = API_BASE.replace(/\/api\/?$/, "");
    return `${apiOrigin}${trimmed}`;
  }
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}
