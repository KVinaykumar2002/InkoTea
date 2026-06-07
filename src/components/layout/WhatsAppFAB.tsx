"use client";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { alpha } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { brandColors } from "@/theme/palette";

/**
 * Floating contact stack — phone above WhatsApp, anchored bottom-right.
 * WhatsApp pre-fills a franchise enquiry message.
 */
export function WhatsAppFAB() {
  const reducedMotion = useReducedMotion();

  const message = encodeURIComponent(
    "Hi INKOTEA team, I'd like to know more about the franchise opportunity.",
  );
  const whatsappHref = `${BRAND.whatsappLink}?text=${message}`;

  return (
    <Box
      component={motion.div}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.55, ease: "easeOut" }}
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 1.5,
      }}
    >
      <Box
        component={motion.div}
        whileHover={reducedMotion ? undefined : { scale: 1.06 }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Fab
          component="a"
          href={`tel:${BRAND.phoneDigits}`}
          aria-label={`Call INKOTEA on ${BRAND.phone}`}
          sx={{
            bgcolor: brandColors.amberGold,
            color: brandColors.charcoal,
            boxShadow: `0 8px 24px -6px ${alpha(brandColors.amberGold, 0.65)}`,
            transition:
              "box-shadow 0.35s ease, background-color 0.25s ease",
            "&:hover": {
              bgcolor: brandColors.amberGoldDark,
              boxShadow: `0 14px 32px -8px ${alpha(brandColors.amberGold, 0.75)}`,
            },
            "&:focus-visible": {
              outline: `3px solid ${alpha(brandColors.amberGoldLight, 0.9)}`,
              outlineOffset: 3,
            },
          }}
        >
          <PhoneIcon />
        </Fab>
      </Box>

      <Fab
        component="a"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with INKOTEA on WhatsApp"
        sx={{
          bgcolor: "#25D366",
          color: "#fff",
          boxShadow: "0 8px 24px -6px rgba(37, 211, 102, 0.6)",
          transition:
            "box-shadow 0.35s ease, background-color 0.25s ease, transform 0.25s ease",
          "&:hover": {
            bgcolor: "#1ebe5a",
            transform: "scale(1.05)",
            boxShadow: "0 12px 28px -8px rgba(37, 211, 102, 0.7)",
          },
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
}
