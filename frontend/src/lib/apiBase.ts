import { API_URL, stripTrailingSlash } from "@shared/urls";

/** Client-side API base; env override for local dev. */
export const API_BASE = stripTrailingSlash(
  process.env.NEXT_PUBLIC_API_URL || API_URL,
);
