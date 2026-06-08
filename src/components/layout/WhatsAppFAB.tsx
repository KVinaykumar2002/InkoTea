"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { alpha } from "@mui/material/styles";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { brandColors } from "@/theme/palette";

const PHONE_LABEL = "Talk to expert";
const LABEL_EASE = [0.22, 1, 0.36, 1] as const;
const POPOVER_BG = brandColors.charcoal;
const AUTO_SHOW_DELAY_MS = 5000;
const AUTO_SHOW_DURATION_MS = 5000;

/**
 * Floating contact stack — phone above WhatsApp, anchored bottom-right.
 * WhatsApp pre-fills a franchise enquiry message.
 */
export function WhatsAppFAB() {
  const reducedMotion = useReducedMotion();
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [autoShowPhone, setAutoShowPhone] = useState(false);
  const phonePopoverVisible = phoneHovered || autoShowPhone;

  useEffect(() => {
    if (reducedMotion) return;

    const showTimer = window.setTimeout(() => {
      setAutoShowPhone(true);
    }, AUTO_SHOW_DELAY_MS);

    return () => window.clearTimeout(showTimer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!autoShowPhone || phoneHovered) return;

    const hideTimer = window.setTimeout(() => {
      setAutoShowPhone(false);
    }, AUTO_SHOW_DURATION_MS);

    return () => window.clearTimeout(hideTimer);
  }, [autoShowPhone, phoneHovered]);

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
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AnimatePresence>
          {phonePopoverVisible ? (
            <Box
              component={motion.div}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.9 }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, scale: 0.92 }
              }
              transition={{
                duration: reducedMotion ? 0.15 : 0.34,
                ease: LABEL_EASE,
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.75,
                pointerEvents: "none",
              }}
            >
              <TeaExpertMascot
                active={phonePopoverVisible}
                reduced={Boolean(reducedMotion)}
              />

              <Box
                sx={{
                  position: "relative",
                  px: 1.75,
                  py: 0.85,
                  borderRadius: 2.5,
                  bgcolor: POPOVER_BG,
                  color: "#FFFFFF",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                  boxShadow: `0 12px 32px -8px ${alpha(POPOVER_BG, 0.65)}`,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: -7,
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: `8px solid ${POPOVER_BG}`,
                  },
                }}
              >
                {PHONE_LABEL}
              </Box>
            </Box>
          ) : null}
        </AnimatePresence>

        <Box
          component={motion.div}
          animate={
            reducedMotion || !phonePopoverVisible
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
              boxShadow: phonePopoverVisible
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
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          "@keyframes whatsapp-pulse": {
            "0%": {
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 0.55,
            },
            "70%": {
              opacity: 0.12,
            },
            "100%": {
              transform: "translate(-50%, -50%) scale(2.5)",
              opacity: 0,
            },
          },
        }}
      >
        {!reducedMotion ? <WhatsAppPulseRings /> : null}
        <Fab
          component="a"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with INKOTEA on WhatsApp"
          sx={{
            position: "relative",
            zIndex: 1,
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
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#E53935",
              border: "2px solid #fff",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&::after": {
                content: '""',
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "#fff",
              },
            }}
          />
        </Fab>
      </Box>
    </Box>
  );
}

const PULSE_DURATION_S = 2.8;
const PULSE_RING_COUNT = 3;

function WhatsAppPulseRings() {
  return (
    <>
      {Array.from({ length: PULSE_RING_COUNT }, (_, index) => (
        <Box
          key={index}
          aria-hidden
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "2px solid rgba(0, 0, 0, 0.14)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 0,
            animation: `whatsapp-pulse ${PULSE_DURATION_S}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
            animationDelay: `${(index * PULSE_DURATION_S) / PULSE_RING_COUNT}s`,
          }}
        />
      ))}
    </>
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
      initial={reduced ? false : { scale: 0, opacity: 0 }}
      animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 480, damping: 22, delay: 0.06 }
      }
      sx={{
        position: "relative",
        width: 36,
        height: 36,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          bgcolor: POPOVER_BG,
          border: `2px solid ${brandColors.amberGold}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.25,
          boxShadow: `0 6px 18px -6px ${alpha(POPOVER_BG, 0.55)}`,
        }}
      >
        <Box sx={{ display: "flex", gap: 0.6 }}>
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
            }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
            }}
          />
        </Box>
        <Box
          sx={{
            width: 12,
            height: 6,
            borderBottom: `2px solid ${brandColors.amberGold}`,
            borderRadius: "0 0 8px 8px",
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
            : { duration: 0.9, ease: "easeInOut", delay: 0.15 }
        }
        sx={{
          position: "absolute",
          right: -8,
          top: 12,
          width: 12,
          height: 3,
          borderRadius: 999,
          bgcolor: brandColors.amberGold,
          transformOrigin: "left center",
        }}
      />
    </Box>
  );
}
