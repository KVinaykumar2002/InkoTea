"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { ContentState } from "@/components/common/ContentState";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { BlogCard } from "./BlogCard";
import { BLOG_CATEGORIES } from "@/features/blog/blogCategories";
import { useBlogPosts } from "@/hooks/useApiContent";

export function BlogList() {
  const { data, loading, error } = useBlogPosts();
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!data?.posts) return [];
    const sorted = [...data.posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    if (category === "all") return sorted;
    return sorted.filter((p) => p.category === category);
  }, [category, data?.posts]);

  const [feature, ...rest] = filtered;

  return (
    <ContentState loading={loading} error={error} empty={!filtered.length}>
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
                onClick={() => setCategory(c.key)}
                variant={isActive ? "filled" : "outlined"}
                color={isActive ? "primary" : "default"}
                sx={{ fontWeight: isActive ? 700 : 500 }}
              />
            );
          })}
        </Stack>

        {feature ? (
          <ScrollReveal y={16}>
            <BlogCard post={feature} variant="feature" />
          </ScrollReveal>
        ) : null}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
            mt: 4,
          }}
        >
          {rest.map((post, idx) => (
            <ScrollReveal key={post.slug} y={16} delay={idx * 0.05}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </Box>
      </Box>
    </ContentState>
  );
}
