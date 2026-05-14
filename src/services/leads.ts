import type { LeadPayload, LeadResponse } from "@/types";

/**
 * Demo-grade mocked lead submission. Simulates a 1.2s network round-trip and
 * returns a fake server-issued lead id. Swap with a real fetch() call when a
 * backend is wired up.
 */
export const submitLead = (payload: LeadPayload): Promise<LeadResponse> =>
  new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      // Dev-only mirror of the would-be POST payload so engineers can
      // sanity-check field shape without opening the network panel.
      console.info("[INKOTEA lead]", payload);
    }
    setTimeout(() => {
      resolve({
        ok: true,
        id: `LEAD-${Date.now().toString(36).toUpperCase()}`,
        message:
          "Thanks for reaching out. Our franchise team will contact you within 24 hours.",
      });
    }, 1200);
  });
