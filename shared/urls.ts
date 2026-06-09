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
