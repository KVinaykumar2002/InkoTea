"use client";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { BlogPost } from "@/types";
import { BLOG_CATEGORIES } from "@/data/blogPosts";

interface Props {
  post: BlogPost;
  variant?: "default" | "feature";
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function BlogCard({ post, variant = "default" }: Props) {
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.key === post.category)?.label ?? post.category;
  const isFeature = variant === "feature";

  return (
    <Card
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: isFeature ? { xs: "column", md: "row" } : "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 50px -20px rgba(0,0,0,0.18)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/blog/${post.slug}`}
        sx={{
          display: "flex",
          flexDirection: isFeature ? { xs: "column", md: "row" } : "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: isFeature ? { xs: "100%", md: "50%" } : "100%",
            aspectRatio: isFeature ? { xs: "16/10", md: "auto" } : "16 / 10",
            minHeight: isFeature ? { md: 320 } : undefined,
            bgcolor: "background.default",
          }}
        >
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes={
              isFeature
                ? "(max-width: 900px) 100vw, 50vw"
                : "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Stack
          spacing={1.5}
          sx={{
            p: { xs: 3, md: isFeature ? 5 : 3 },
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={categoryLabel}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{ color: "text.secondary" }}
            >
              <AccessTimeIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption">
                {post.readingMinutes} min read
              </Typography>
            </Stack>
          </Stack>
          <Typography variant={isFeature ? "h3" : "h5"}>{post.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {post.excerpt}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Typography variant="caption" color="text.secondary">
              {post.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.publishedAt)}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
