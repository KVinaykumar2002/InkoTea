"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SESSION_KEY = "inkotea-cta-dismissed";
const HIDDEN_ROUTES = ["/franchise", "/contact"];

/**
 * Slide-up CTA that appears after the user scrolls past 60% of the page.
 * Dismissed state is remembered for the session so it doesn't nag the user.
 *
 * On md+ the pill is anchored to the left so it never visually crowds
 * the right-anchored WhatsApp FAB. On xs/sm it stretches across the
 * viewport above the FAB.
 */
export function StickyFranchiseCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setDismissed(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? scrolled / max : 0;
      setVisible(ratio > 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  const onHiddenRoute = HIDDEN_ROUTES.some((p) => pathname.startsWith(p));
  if (onHiddenRoute || dismissed) return null;

  const motionInitial = reducedMotion
    ? { opacity: 0 }
    : { y: 100, opacity: 0 };
  const motionAnimate = reducedMotion
    ? { opacity: 1 }
    : { y: 0, opacity: 1 };
  const motionExit = reducedMotion
    ? { opacity: 0 }
    : { y: 100, opacity: 0 };
  const motionTransition = reducedMotion
    ? { duration: 0.2, ease: "easeOut" as const }
    : { type: "spring" as const, stiffness: 220, damping: 28 };

  return (
    <AnimatePresence>
      {visible ? (
        <Box
          component={motion.div}
          initial={motionInitial}
          animate={motionAnimate}
          exit={motionExit}
          transition={motionTransition}
          role="region"
          aria-label="Franchise call to action"
          sx={{
            position: "fixed",
            bottom: { xs: 80, md: 24 },
            // On xs/sm the pill spans most of the viewport (above the FAB).
            // On md+ it docks bottom-left, leaving the right gutter clear
            // for the WhatsApp FAB so the two never visually crowd.
            left: { xs: 16, md: 24 },
            right: { xs: 16, md: "auto" },
            transform: "none",
            zIndex: 1100,
            maxWidth: { xs: "none", md: 520 },
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 999,
            px: { xs: 2, sm: 3 },
            py: 1.25,
            boxShadow: "0 14px 40px -10px rgba(0,0,0,0.35)",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, sm: 2 }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              Start your own INKOTEA outlet — from ₹2.5L
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                flexGrow: 1,
                display: { xs: "block", sm: "none" },
              }}
            >
              Open your INKOTEA outlet
            </Typography>
            <Button
              component={Link}
              href="/franchise"
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<ArrowForwardIcon />}
              sx={{ flexShrink: 0 }}
            >
              Apply
            </Button>
            <IconButton
              size="small"
              aria-label="Dismiss franchise CTA"
              onClick={handleDismiss}
              sx={{ color: "inherit", opacity: 0.7 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      ) : null}
    </AnimatePresence>
  );
}
