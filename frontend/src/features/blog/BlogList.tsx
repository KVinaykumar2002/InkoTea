"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { BlogCard } from "./BlogCard";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/blogPosts";
import { useBlogPosts } from "@/hooks/useApiContent";

export function BlogList() {
  const { data } = useBlogPosts({ posts: BLOG_POSTS });
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const sorted = [...data.posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    if (category === "all") return sorted;
    return sorted.filter((p) => p.category === category);
  }, [category, data.posts]);

  const [feature, ...rest] = filtered;

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 5 }}
      >
        {BLOG_CATEGORIES.map((c) => {
          const isActive = category === c.key;
          return (
            <Chip
              key={c.key}
              label={c.label}
              clickable
              onClick={() => setCategory(c.key)}
              sx={{
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "primary.contrastText" : "text.primary",
                fontWeight: 600,
                px: 1.5,
                py: 2.5,
                border: (t) =>
                  `1px solid ${
                    isActive ? "transparent" : t.palette.divider
                  }`,
                "&:hover": {
                  bgcolor: isActive ? "primary.dark" : "background.paper",
                },
              }}
            />
          );
        })}
      </Stack>

      {feature ? (
        <ScrollReveal>
          <Box sx={{ mb: 5 }}>
            <BlogCard post={feature} variant="feature" />
          </Box>
        </ScrollReveal>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {rest.map((post, idx) => (
          <ScrollReveal key={post.slug} delay={Math.min(idx * 0.05, 0.3)}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  );
}
