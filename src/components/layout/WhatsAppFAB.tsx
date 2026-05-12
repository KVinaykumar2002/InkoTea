"use client";

import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { BRAND } from "@/lib/brand";

/**
 * Floating WhatsApp button anchored bottom-right. Pre-fills a context message
 * so franchise enquiries arrive with intent already declared.
 */
export function WhatsAppFAB() {
  const message = encodeURIComponent(
    "Hi INKOTEA team, I'd like to know more about the franchise opportunity.",
  );
  const href = `${BRAND.whatsappLink}?text=${message}`;

  return (
    <Fab
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with INKOTEA on WhatsApp"
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 1200,
        bgcolor: "#25D366",
        color: "#fff",
        boxShadow: "0 8px 24px -6px rgba(37, 211, 102, 0.6)",
        "&:hover": { bgcolor: "#1ebe5a" },
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
}
