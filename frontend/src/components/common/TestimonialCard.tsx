"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";

import { SafeImage } from "@/components/common/SafeImage";
import { TestimonialVideoDialog } from "@/components/common/TestimonialVideoDialog";
import type { Testimonial } from "@/types";
import { brandColors } from "@/theme/palette";
import { fontDescriptionSx, fontDisplayItalicSx } from "@/theme/fonts";

interface TestimonialCardProps {
  item: Testimonial;
  /** Carousel cards truncate long quotes; full-page cards show the entire text. */
  variant?: "carousel" | "full";
}

export function TestimonialCard({ item, variant = "carousel" }: TestimonialCardProps) {
  const isCarousel = variant === "carousel";
  const [videoOpen, setVideoOpen] = useState(false);
  const hasVideo = Boolean(item.isVideo && item.videoUrl?.trim());

  return (
    <>
      <Box
        component="article"
        sx={{
          height: "100%",
          bgcolor: "#FFFFFF",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: `0 8px 32px -12px ${alpha(brandColors.charcoal, 0.12)}`,
          border: `1px solid ${alpha(brandColors.charcoal, 0.06)}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            bgcolor: brandColors.cream,
            overflow: "hidden",
          }}
        >
          <SafeImage
            src={item.image}
            alt={item.imageAlt || item.name}
            fill
            sizes={
              isCarousel
                ? "(max-width: 600px) 260px, 280px"
                : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            }
            style={{ objectFit: "cover" }}
            unoptimized
          />
          {item.isVideo ? (
            <Box
              component={hasVideo ? "button" : "div"}
              type={hasVideo ? "button" : undefined}
              onClick={hasVideo ? () => setVideoOpen(true) : undefined}
              aria-label={hasVideo ? `Play video testimonial from ${item.name}` : undefined}
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha("#000", 0.18),
                border: "none",
                p: 0,
                cursor: hasVideo ? "pointer" : "default",
                transition: "background-color 0.2s ease",
                "&:hover": hasVideo
                  ? { bgcolor: alpha("#000", 0.28) }
                  : undefined,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: alpha("#FFFFFF", 0.92),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 28, color: brandColors.charcoal, ml: 0.25 }} />
              </Box>
            </Box>
          ) : null}
        </Box>

        <Box
          sx={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            px: 2,
            pt: 4,
            pb: 2.5,
          }}
        >
          <Box sx={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)" }}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: brandColors.cream,
                  border: "2px solid #FFFFFF",
                  boxShadow: `0 4px 12px ${alpha(brandColors.charcoal, 0.1)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    ...fontDisplayItalicSx,
                    fontSize: "1.125rem",
                    color: brandColors.charcoal,
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.initials}
                </Typography>
              </Box>
              <Box
                aria-label="Verified customer"
                sx={{
                  position: "absolute",
                  right: -2,
                  bottom: 0,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: brandColors.amberGold,
                  border: "2px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckIcon sx={{ fontSize: 12, color: "#FFFFFF" }} />
              </Box>
            </Box>
          </Box>

          <Typography
            sx={{
              ...fontDisplayItalicSx,
              fontSize: "1.0625rem",
              fontWeight: 600,
              color: brandColors.charcoal,
              mb: 0.25,
            }}
          >
            {item.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              ...fontDescriptionSx,
              color: "text.secondary",
              mb: 1.5,
              display: "block",
            }}
          >
            {item.city}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              ...fontDescriptionSx,
              color: "text.secondary",
              lineHeight: 1.65,
              flex: 1,
              mb: 1.5,
              ...(isCarousel
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : {}),
            }}
          >
            &ldquo;{item.quote}&rdquo;
          </Typography>

          <Box sx={{ display: "flex", gap: 0.25, mt: "auto" }} aria-label={`${item.rating} out of 5 stars`}>
            {Array.from({ length: item.rating }, (_, i) => (
              <StarIcon
                key={i}
                sx={{ fontSize: 16, color: brandColors.amberGold }}
                aria-hidden
              />
            ))}
          </Box>
        </Box>
      </Box>

      {hasVideo && item.videoUrl ? (
        <TestimonialVideoDialog
          open={videoOpen}
          videoUrl={item.videoUrl}
          title={`Video testimonial from ${item.name}`}
          onClose={() => setVideoOpen(false)}
        />
      ) : null}
    </>
  );
}
