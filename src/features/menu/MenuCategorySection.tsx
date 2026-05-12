"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuCategoryMeta, MenuItem } from "@/types";

interface Props {
  category: MenuCategoryMeta;
  items: MenuItem[];
  bgcolor?: string;
}

export function MenuCategorySection({ category, items, bgcolor }: Props) {
  return (
    <Box
      component="section"
      id={`menu-${category.key}`}
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor,
        scrollMarginTop: { xs: 130, md: 160 },
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <Stack
            spacing={2}
            sx={{
              mb: { xs: 5, md: 6 },
              maxWidth: 720,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.dark",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                }}
              >
                {category.shortLabel}
              </Typography>
              <Chip
                label={category.priceRange}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Stack>
            <Typography variant="h2">{category.label}</Typography>
            <Typography variant="body1" color="text.secondary">
              {category.description}
            </Typography>
          </Stack>
        </ScrollReveal>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {items.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.06}>
              <MenuItemCard item={item} />
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
