"use client";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { parseVideoUrl } from "@/lib/videoEmbed";
import { resolveMediaUrl } from "@/lib/resolveMediaUrl";

interface TestimonialVideoDialogProps {
  open: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export function TestimonialVideoDialog({
  open,
  videoUrl,
  title,
  onClose,
}: TestimonialVideoDialogProps) {
  const parsed = open ? parseVideoUrl(videoUrl) : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="testimonial-video-title"
      PaperProps={{
        sx: {
          bgcolor: "#000",
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          ...(parsed?.fixedHeight
            ? { height: parsed.fixedHeight, minHeight: parsed.fixedHeight }
            : { pt: parsed?.aspectPadding ?? "56.25%" }),
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Close video"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            bgcolor: "rgba(0,0,0,0.55)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {parsed?.kind === "direct" ? (
          <Box
            component="video"
            key={parsed.embedUrl}
            controls
            autoPlay
            playsInline
            src={resolveMediaUrl(parsed.embedUrl)}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              bgcolor: "#000",
            }}
          />
        ) : parsed ? (
          <Box
            component="iframe"
            key={parsed.embedUrl}
            title={title}
            id="testimonial-video-title"
            src={parsed.embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
              bgcolor: "#000",
            }}
          />
        ) : open ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              px: 3,
              textAlign: "center",
            }}
          >
            Unable to play this video URL. Please check the link in admin.
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
}
