"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HandymanIcon from "@mui/icons-material/Handyman";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { RESPONSIBILITY_SPLITS } from "@/data/franchiseModels";
import type { FranchiseModelKey } from "@/types";

const MODEL_LABELS: Record<FranchiseModelKey, string> = {
  kiosk: "Kiosk Model",
  cafe: "Social Café Model",
};

const MODEL_ICONS: Record<FranchiseModelKey, typeof StorefrontIcon> = {
  kiosk: StorefrontIcon,
  cafe: LocalCafeIcon,
};

/**
 * "What You Get vs What You Provide" — present in both brochures
 * (Kiosk page 9 and the Social Café not-included sections). Rendered
 * as tabs so partners can flip between the two formats without
 * scrolling past two giant tables.
 */
export function WhatYouGetProvide() {
  const [activeKey, setActiveKey] = useState<FranchiseModelKey>("kiosk");

  const active = useMemo(
    () => RESPONSIBILITY_SPLITS.find((s) => s.modelKey === activeKey),
    [activeKey],
  );

  if (!active) return null;

  return (
    <Section
      bgcolor="background.paper"
      pt={{ xs: 4, md: 5 }}
      pb={{ xs: 2, md: 3 }}
    >
      <SectionHeading
        eyebrow="Roles & Responsibilities"
        title="What You Get vs What You Provide"
        description="Transparent split of who handles what. Pick a format below to see the exact responsibilities."
        sx={compactSectionHeadingSx}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Tabs
          value={activeKey}
          onChange={(_, v: FranchiseModelKey) => setActiveKey(v)}
          variant="standard"
          textColor="primary"
          indicatorColor="primary"
          aria-label="Choose franchise model"
        >
          {(Object.keys(MODEL_LABELS) as FranchiseModelKey[]).map((key) => {
            const Icon = MODEL_ICONS[key];
            return (
              <Tab
                key={key}
                value={key}
                label={MODEL_LABELS[key]}
                icon={<Icon fontSize="small" />}
                iconPosition="start"
                sx={{
                  textTransform: "none",
                  minHeight: 48,
                  fontWeight: 600,
                }}
              />
            );
          })}
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <ScrollReveal>
          <ResponsibilityCard
            title="INKOTEA Provides"
            tone="primary"
            icon={<CheckCircleIcon />}
            items={active.inkoteaProvides}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ResponsibilityCard
            title="You Provide"
            tone="success"
            icon={<HandymanIcon />}
            items={active.youProvide}
          />
        </ScrollReveal>
      </Box>
    </Section>
  );
}

interface ResponsibilityCardProps {
  title: string;
  tone: "primary" | "success";
  icon: React.ReactNode;
  items: string[];
}

function ResponsibilityCard({
  title,
  tone,
  icon,
  items,
}: ResponsibilityCardProps) {
  const accentBg = tone === "primary" ? "primary.main" : "success.main";

  return (
    <Card sx={{ height: "100%" }}>
      <Box
        sx={{
          bgcolor: accentBg,
          color: "primary.contrastText",
          px: 4,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" sx={{ color: "inherit", ...fontDisplayItalicSx }}>
          {title}
        </Typography>
      </Box>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={1.75}>
          {items.map((item) => (
            <Stack
              key={item}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
            >
              <Box
                sx={{
                  flexShrink: 0,
                  mt: "8px",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: accentBg,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
