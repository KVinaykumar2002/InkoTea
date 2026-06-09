"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { fontDescriptionSx } from "@/theme/fonts";

export function ContactPageHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "#1A0E08",
        color: "#fff",
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 12 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BRAND_IMAGES.footerKioskScene})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "65% center", md: "center" },
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(15,10,6,0.92) 0%, rgba(15,10,6,0.72) 40%, rgba(15,10,6,0.35) 70%, rgba(15,10,6,0.1) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,10,6,0.25) 0%, rgba(15,10,6,0) 35%, rgba(15,10,6,0) 70%, rgba(15,10,6,0.6) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={3} maxWidth={760}>
          <Typography
            variant="overline"
            sx={{ color: "secondary.light", letterSpacing: "0.2em" }}
          >
            Get in touch
          </Typography>
          <Typography variant="h1" sx={{ color: "inherit" }}>
            Let&apos;s build your INKOTEA chapter together.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              ...fontDescriptionSx,
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
              lineHeight: 1.55,
            }}
          >
            Whether you want to open a franchise or just say hi — we read every
            message.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
