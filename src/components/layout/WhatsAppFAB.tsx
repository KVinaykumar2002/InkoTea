"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { alpha } from "@mui/material/styles";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { BRAND } from "@/lib/brand";
import { brandColors } from "@/theme/palette";

const PHONE_LABEL = "Talk to an expert";

/**
 * Floating contact stack — phone above WhatsApp, anchored bottom-right.
 * WhatsApp pre-fills a franchise enquiry message.
 */
export function WhatsAppFAB() {
  const reducedMotion = useReducedMotion();
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setTouchDevice(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const message = encodeURIComponent(
    "Hi INKOTEA team, I'd like to know more about the franchise opportunity.",
  );
  const whatsappHref = `${BRAND.whatsappLink}?text=${message}`;

  const showPhoneLabel = phoneHovered || touchDevice;

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
        onMouseEnter={() => setPhoneHovered(true)}
        onMouseLeave={() => setPhoneHovered(false)}
        onFocus={() => setPhoneHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPhoneHovered(false);
          }
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          gap: 1.25,
        }}
      >
        <Box
          component={motion.div}
          animate={
            reducedMotion || !phoneHovered
              ? { scale: 1, rotate: 0 }
              : { scale: [1, 1.08, 1.05], rotate: [0, -8, 4, 0] }
          }
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        >
          <Fab
            component="a"
            href={`tel:${BRAND.phoneDigits}`}
            aria-label={`Call INKOTEA on ${BRAND.phone} — ${PHONE_LABEL}`}
            sx={{
              bgcolor: brandColors.amberGold,
              color: brandColors.charcoal,
              boxShadow: phoneHovered
                ? `0 14px 32px -8px ${alpha(brandColors.amberGold, 0.75)}`
                : `0 8px 24px -6px ${alpha(brandColors.amberGold, 0.65)}`,
              transition:
                "box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease",
              "&:hover": { bgcolor: brandColors.amberGoldDark },
              "&:focus-visible": {
                outline: `3px solid ${alpha(brandColors.amberGoldLight, 0.9)}`,
                outlineOffset: 3,
              },
            }}
          >
            <PhoneIcon />
          </Fab>
        </Box>

        <AnimatePresence>
          {showPhoneLabel ? (
            <Box
              component={motion.div}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 14, scale: 0.92 }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, scale: 1 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 10, scale: 0.94 }
              }
              transition={{
                duration: reducedMotion ? 0.15 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              sx={{ pointerEvents: "none" }}
            >
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 999,
                  bgcolor: brandColors.charcoal,
                  color: "#FFFFFF",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                  boxShadow: `0 10px 28px -10px ${alpha(brandColors.charcoal, 0.55)}`,
                }}
              >
                {PHONE_LABEL}
              </Typography>
            </Box>
          ) : null}
        </AnimatePresence>
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
          transition: "box-shadow 0.35s ease, background-color 0.25s ease, transform 0.25s ease",
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
