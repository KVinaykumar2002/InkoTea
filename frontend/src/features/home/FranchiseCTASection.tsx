"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Section } from "@/components/common/Section";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const PERKS = [
  "Low investment options",
  "Proven 40+ outlet model",
  "End-to-end franchise support",
];

export function FranchiseCTASection() {
  return (
    <Section
      bgcolor="primary.main"
      pt={{ xs: 8, md: 12 }}
      pb={{ xs: 6, md: 8 }}
      sx={{
        color: "primary.contrastText",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 50%, rgba(212,165,116,0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <ScrollReveal>
        <Stack
          alignItems="center"
          spacing={4}
          textAlign="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="overline"
            sx={{ color: "secondary.light", letterSpacing: "0.25em" }}
          >
            Ready to begin
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: "inherit", maxWidth: 760, ...fontDisplayItalicSx }}
          >
            Start your own INKOTEA outlet
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            {PERKS.map((perk) => (
              <Stack
                key={perk}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <CheckCircleIcon
                  sx={{ color: "secondary.light", fontSize: 20 }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}
                >
                  {perk}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Button
            component={Link}
            href="/franchise"
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 2,
              width: { xs: "100%", sm: "auto" },
              minWidth: { xs: 0, sm: 240 },
            }}
          >
            Apply for Franchise
          </Button>
        </Stack>
      </ScrollReveal>
    </Section>
  );
}
