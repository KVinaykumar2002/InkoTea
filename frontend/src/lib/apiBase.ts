import { resolveApiBase } from "@shared/urls";

/** Client-side API base; env override for local dev. */
export const API_BASE = resolveApiBase(process.env.NEXT_PUBLIC_API_URL);
