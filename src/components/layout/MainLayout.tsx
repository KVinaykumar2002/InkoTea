"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFAB } from "./WhatsAppFAB";
import { StickyFranchiseCTA } from "./StickyFranchiseCTA";

/**
 * App-wide layout shell. Adds the fixed navbar (with content offset),
 * footer, sticky CTA and WhatsApp FAB. Wraps every route segment.
 *
 * The first focusable element is a "Skip to main content" link that is
 * visually hidden until focused — keyboard and screen-reader users can
 * jump past the nav on every page.
 */
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Box
        component="main"
        id="main"
        tabIndex={-1}
        sx={{ flexGrow: 1, pt: { xs: 8, md: 10 }, outline: "none" }}
      >
        {children}
      </Box>
      <Footer />
      <StickyFranchiseCTA />
      <WhatsAppFAB />
    </Box>
  );
}
