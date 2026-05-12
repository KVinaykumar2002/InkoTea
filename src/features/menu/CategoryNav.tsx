"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { MENU_CATEGORIES } from "@/data/menu";

/**
 * Sticky horizontal category nav. Highlights the section currently in view
 * via IntersectionObserver and scrolls the target section into view on click.
 */
export function CategoryNav() {
  const [active, setActive] = useState<string>(MENU_CATEGORIES[0]?.key ?? "");

  useEffect(() => {
    const sections = MENU_CATEGORIES.map((c) =>
      document.getElementById(`menu-${c.key}`),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id.replace("menu-", "");
          setActive(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: { xs: 64, md: 80 },
        zIndex: 5,
        bgcolor: "background.default",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        backdropFilter: "saturate(180%) blur(8px)",
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {MENU_CATEGORIES.map((c) => {
            const isActive = active === c.key;
            return (
              <Chip
                key={c.key}
                label={c.label}
                clickable
                onClick={() => {
                  document
                    .getElementById(`menu-${c.key}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                sx={{
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "primary.contrastText" : "text.primary",
                  fontWeight: 600,
                  border: (t) =>
                    `1px solid ${
                      isActive ? "transparent" : t.palette.divider
                    }`,
                  px: 2,
                  py: 2.5,
                  flexShrink: 0,
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "background.paper",
                  },
                }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
