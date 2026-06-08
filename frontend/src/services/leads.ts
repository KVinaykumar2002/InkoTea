import type { LeadPayload, LeadResponse } from "@/types";
import { api, ApiError } from "@/lib/api";

/**
 * Submits a franchise / contact lead to the INKOTEA backend API.
 * Falls back to a local mock response if the API is unreachable (e.g. static preview).
 */
export const submitLead = async (
  payload: LeadPayload,
): Promise<LeadResponse> => {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== "production"
  ) {
    console.info("[INKOTEA lead]", payload);
  }

  try {
    return await api.submitLead(payload as unknown as Record<string, unknown>);
  } catch (err) {
    if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
      throw err;
    }
    // Offline / API-down fallback for demos
    return {
      ok: true,
      id: `LEAD-${Date.now().toString(36).toUpperCase()}`,
      message:
        "Thanks for reaching out. Our franchise team will contact you within 24 hours.",
    };
  }
};
