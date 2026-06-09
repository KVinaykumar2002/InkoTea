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

function isValidApiHostname(hostname: string): boolean {
  return /^[a-z0-9.-]+$/i.test(hostname) && hostname.includes(".");
}

function normalizeOrigin(raw: string): string | null {
  let value = raw.trim().replace(/^=+/, "").trim();
  if (!value) return null;

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }

  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value.replace(/^\/+/, "")}`;
  }

  try {
    return stripTrailingSlash(new URL(value).origin);
  } catch {
    return null;
  }
}

/** Allowed browser origins for CORS — always includes production frontend + localhost. */
export function resolveCorsOrigins(raw?: string | null): string[] {
  const origins = new Set<string>([
    stripTrailingSlash(FRONTEND_URL),
    "http://localhost:3000",
  ]);

  if (raw?.trim()) {
    for (const part of raw.split(",")) {
      const normalized = normalizeOrigin(part);
      if (normalized) origins.add(normalized);
    }
  }

  return Array.from(origins);
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

  // Vercel copy-paste mistakes like "==https://inkotea.onrender.com/api"
  value = value.replace(/^=+/, "").trim();

  if (!value) return fallback;

  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value.replace(/^\/+/, "")}`;
  }

  value = stripTrailingSlash(value);

  try {
    const url = new URL(value);
    if (!isValidApiHostname(url.hostname)) {
      return fallback;
    }
    const path = url.pathname.replace(/\/+$/, "") || "";
    if (!path || path === "/") {
      value = stripTrailingSlash(`${url.origin}/api`);
    }
  } catch {
    return fallback;
  }

  try {
    const url = new URL(value);
    if (!isValidApiHostname(url.hostname)) {
      return fallback;
    }
    return value;
  } catch {
    return fallback;
  }
}
