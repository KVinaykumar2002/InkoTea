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
}

/**
 * Navbar CTA — white pill with arrow disc; hover fills amber left → right.
 */
export function FranchiseNavButton({
  fullWidth = false,
  onClick,
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
        pl: { xs: 2.75, md: 3 },
        pr: 0.75,
        py: 0.875,
        minHeight: 48,
        bgcolor: "#FFFFFF",
        color: brandColors.charcoal,
        fontWeight: 700,
        textTransform: "none",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 16px -6px rgba(0,0,0,0.28)",
        gap: 1.25,
        justifyContent: "space-between",
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
          fontSize: { xs: "1rem", md: "1.0625rem" },
          lineHeight: 1.2,
          transition: "color 0.35s ease 0.08s",
        }}
      >
        Apply for Franchise
      </Box>
      <Box
        className="franchise-nav-btn-icon"
        sx={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          width: 36,
          height: 36,
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
        <ArrowForwardIcon sx={{ fontSize: 20 }} />
      </Box>
    </Button>
  );
}
