"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import EastIcon from "@mui/icons-material/East";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const NODES = [
  {
    icon: StorefrontIcon,
    label: "Kiosks",
    title: "Volume engine",
    text: "Capture daily-use chai demand in high-footfall transit and IT corridors. ₹2.5L entry, fast break-even.",
    color: "primary",
  },
  {
    icon: LocalCafeIcon,
    label: "Cafés",
    title: "Brand & ticket",
    text: "Build brand asset and average-ticket lift through experience-led social spaces. Starting from ₹6.5L entry.",
    color: "success",
  },
];

export function BusinessModelDeck() {
  return (
    <Section bgcolor="background.paper" id="deck">
      <SectionHeading
        eyebrow="Business Model"
        title="Two formats. One network. Compounding returns."
        description="The dual-format strategy lets INKOTEA enter cities at the kiosk price-point and graduate proven catchments into cafés."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 60px 1fr" },
          gap: { xs: 3, md: 0 },
          alignItems: "center",
        }}
      >
        <ScrollReveal>
          <ModelNode node={NODES[0]} />
        </ScrollReveal>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          <EastIcon
            sx={{
              fontSize: 48,
              transform: { xs: "rotate(90deg)", md: "rotate(0)" },
            }}
          />
        </Box>
        <ScrollReveal delay={0.15}>
          <ModelNode node={NODES[1]} />
        </ScrollReveal>
      </Box>
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mt: 6, fontStyle: "italic", maxWidth: 720, mx: "auto" }}
      >
        Each city follows the same playbook: kiosks first to validate demand,
        cafés next to capture lifestyle and brand premium.
      </Typography>
    </Section>
  );
}

function ModelNode({ node }: { node: (typeof NODES)[number] }) {
  const Icon = node.icon;
  const accentBg = node.color === "primary" ? "primary.main" : "success.main";

  return (
    <Stack
      spacing={2}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        bgcolor: accentBg,
        color: "primary.contrastText",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: "rgba(255,255,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Icon />
      </Box>
      <Typography
        variant="overline"
        sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
      >
        {node.label}
      </Typography>
      <Typography variant="h4" sx={{ color: "inherit", fontStyle: "italic" }}>
        {node.title}
      </Typography>
      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.92)" }}>
        {node.text}
      </Typography>
    </Stack>
  );
}
