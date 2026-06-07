"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { alpha } from "@mui/material/styles";
import { brandColors } from "@/theme/palette";

const FILL_COLOR = brandColors.amberGold;

interface FranchiseNavButtonProps {
  fullWidth?: boolean;
  onClick?: () => void;
  /** Defaults to "Apply for Franchise". */
  label?: string;
  /** Smaller pill for sticky bars and inline CTAs. */
  compact?: boolean;
}

/**
 * Franchise CTA — white pill with arrow disc; hover fills amber left → right.
 */
export function FranchiseNavButton({
  fullWidth = false,
  onClick,
  label = "Apply for Franchise",
  compact = false,
}: FranchiseNavButtonProps) {
  return (
    <Button
      component={Link}
      href="/franchise"
      onClick={onClick}
      fullWidth={fullWidth}
      disableElevation
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 999,
        pl: compact ? 2 : { xs: 2.75, md: 3 },
        pr: compact ? 0.5 : 0.75,
        py: compact ? 0.5 : 0.875,
        minHeight: compact ? 36 : 48,
        bgcolor: "#FFFFFF",
        color: brandColors.charcoal,
        fontWeight: 700,
        textTransform: "none",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 16px -6px rgba(0,0,0,0.28)",
        gap: compact ? 0.75 : 1.25,
        justifyContent: "space-between",
        flexShrink: 0,
        transition: "box-shadow 0.4s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: FILL_COLOR,
          transform: "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        },
        "&:hover": {
          bgcolor: "#FFFFFF",
          boxShadow: `0 10px 28px -8px ${alpha(FILL_COLOR, 0.55)}`,
          "&::before": {
            transform: "scaleX(1)",
          },
          "& .franchise-nav-btn-label": {
            color: "#FFFFFF",
          },
          "& .franchise-nav-btn-icon": {
            bgcolor: "rgba(255,255,255,0.28)",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "&::before": { transition: "none" },
        },
      }}
    >
      <Box
        component="span"
        className="franchise-nav-btn-label"
        sx={{
          position: "relative",
          zIndex: 1,
          fontSize: compact ? "0.875rem" : { xs: "1rem", md: "1.0625rem" },
          lineHeight: 1.2,
          transition: "color 0.35s ease 0.08s",
        }}
      >
        {label}
      </Box>
      <Box
        className="franchise-nav-btn-icon"
        sx={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          width: compact ? 28 : 36,
          height: compact ? 28 : 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: FILL_COLOR,
          color: "#FFFFFF",
          boxShadow: `0 4px 12px -4px ${alpha(brandColors.amberGoldDark, 0.45)}`,
          transition: "background-color 0.35s ease 0.12s",
        }}
      >
        <ArrowForwardIcon sx={{ fontSize: compact ? 16 : 20 }} />
      </Box>
    </Button>
  );
}
