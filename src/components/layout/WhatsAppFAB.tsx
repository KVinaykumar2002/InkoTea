"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { alpha } from "@mui/material/styles";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { BRAND } from "@/lib/brand";
import { brandColors } from "@/theme/palette";

const PHONE_LABEL = "Call an Expert!";
const LABEL_EASE = [0.22, 1, 0.36, 1] as const;
const POPOVER_BG = brandColors.charcoal;

const popoverContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.02 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const bubbleVariants: Variants = {
  hidden: { opacity: 0, x: 28, scale: 0.78 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 24 },
  },
  exit: { opacity: 0, x: 16, scale: 0.9, transition: { duration: 0.2 } },
};

const mascotVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -18 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 500, damping: 20, delay: 0.08 },
  },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.15 } },
};

/**
 * Floating contact stack — phone above WhatsApp, anchored bottom-right.
 * WhatsApp pre-fills a franchise enquiry message.
 */
export function WhatsAppFAB() {
  const reducedMotion = useReducedMotion();
  const [phoneHovered, setPhoneHovered] = useState(false);

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
          gap: 1,
        }}
      >
        <Box
          component={motion.div}
          animate={
            reducedMotion || !phoneHovered
              ? { scale: 1 }
              : { scale: [1, 1.1, 1.04] }
          }
          transition={{ duration: 0.45, ease: LABEL_EASE }}
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        >
          <Fab
            component="a"
            href={`tel:${BRAND.phoneDigits}`}
            aria-label={`Call INKOTEA on ${BRAND.phone} — ${PHONE_LABEL}`}
            sx={{
              bgcolor: POPOVER_BG,
              color: "#FFFFFF",
              boxShadow: phoneHovered
                ? `0 14px 36px -8px ${alpha(POPOVER_BG, 0.75)}`
                : `0 8px 24px -6px ${alpha(POPOVER_BG, 0.55)}`,
              transition:
                "box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                bgcolor: brandColors.charcoalLight,
                transform: "scale(1.04)",
              },
              "&:focus-visible": {
                outline: `3px solid ${alpha(brandColors.amberGold, 0.9)}`,
                outlineOffset: 3,
              },
            }}
          >
            <PhoneIcon />
          </Fab>
        </Box>

        <AnimatePresence>
          {phoneHovered ? (
            <Box
              component={motion.div}
              variants={reducedMotion ? undefined : popoverContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pointerEvents: "none",
              }}
            >
              <Box
                component={motion.div}
                variants={reducedMotion ? undefined : bubbleVariants}
                sx={{
                  position: "relative",
                  px: 2,
                  py: 1,
                  borderRadius: 2.5,
                  bgcolor: POPOVER_BG,
                  color: "#FFFFFF",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                  boxShadow: `0 12px 32px -8px ${alpha(POPOVER_BG, 0.6)}`,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: -7,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 0,
                    height: 0,
                    borderTop: "7px solid transparent",
                    borderBottom: "7px solid transparent",
                    borderLeft: `8px solid ${POPOVER_BG}`,
                  },
                }}
              >
                {PHONE_LABEL}
              </Box>

              <TeaExpertMascot
                active={phoneHovered}
                reduced={Boolean(reducedMotion)}
              />
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

function TeaExpertMascot({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  return (
    <Box
      component={motion.div}
      variants={reduced ? undefined : mascotVariants}
      sx={{
        position: "relative",
        width: 40,
        height: 40,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: POPOVER_BG,
          border: `2px solid ${brandColors.amberGold}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.35,
          boxShadow: `0 6px 18px -6px ${alpha(POPOVER_BG, 0.55)}`,
        }}
      >
        <Box sx={{ display: "flex", gap: 0.75 }}>
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
            }}
          />
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
            }}
          />
        </Box>
        <Box
          sx={{
            width: 14,
            height: 7,
            borderBottom: `2.5px solid ${brandColors.amberGold}`,
            borderRadius: "0 0 10px 10px",
          }}
        />
      </Box>

      <Box
        component={motion.span}
        aria-hidden
        animate={
          reduced || !active
            ? { rotate: 0 }
            : { rotate: [0, 22, -8, 18, 0] }
        }
        transition={
          reduced
            ? undefined
            : { duration: 0.9, ease: "easeInOut", delay: 0.2 }
        }
        sx={{
          position: "absolute",
          left: -9,
          top: 14,
          width: 14,
          height: 3,
          borderRadius: 999,
          bgcolor: brandColors.amberGold,
          transformOrigin: "right center",
        }}
      />
    </Box>
  );
}
