/**
 * Production deployment URLs — single source of truth for the whole monorepo.
 * Override per environment via env vars (see .env.example files).
 */
export const FRONTEND_URL = "https://inko-tea-six.vercel.app";

export const BACKEND_URL = "https://inkotea.onrender.com";

/** Backend API base path (includes /api). */
export const API_URL = `${BACKEND_URL}/api`;

export function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Normalize env overrides — handles missing protocol, trailing slashes, and bare hostnames. */
export function resolveApiBase(raw?: string | null): string {
  const fallback = stripTrailingSlash(API_URL);
  if (!raw?.trim()) return fallback;

  let value = raw.trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }

  if (!value) return fallback;

  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value.replace(/^\/+/, "")}`;
  }

  value = stripTrailingSlash(value);

  try {
    const url = new URL(value);
    const path = url.pathname.replace(/\/+$/, "") || "";
    if (!path || path === "/") {
      value = stripTrailingSlash(`${url.origin}/api`);
    }
  } catch {
    return fallback;
  }

  try {
    new URL(value);
    return value;
  } catch {
    return fallback;
  }
}
