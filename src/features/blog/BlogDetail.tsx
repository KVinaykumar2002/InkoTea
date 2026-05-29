"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Link from "next/link";
import { SafeImage } from "@/components/common/SafeImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReactMarkdown from "react-markdown";
import { fonts } from "@/theme/fonts";
import { BLOG_CATEGORIES } from "@/data/blogPosts";
import type { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function BlogDetail({ post }: Props) {
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.key === post.category)?.label ?? post.category;

  return (
    <Box component="article">
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
          mt: { xs: -8, md: -10 },
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Button
              component={Link}
              href="/blog"
              startIcon={<ArrowBackIcon />}
              variant="text"
              sx={{ alignSelf: "flex-start", color: "primary.main" }}
            >
              Back to all posts
            </Button>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Chip
                label={categoryLabel}
                color="primary"
                size="small"
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
            <Typography variant="h1" sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}>
              {post.title}
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 400 }}>
              {post.excerpt}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {post.author.charAt(0)}
              </Box>
              <Stack>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {post.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Published {formatDate(post.publishedAt)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 3,
            overflow: "hidden",
            mb: 6,
            boxShadow: "0 18px 50px -20px rgba(0,0,0,0.18)",
          }}
        >
          <SafeImage
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 900px) 100vw, 800px"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Box
          sx={{
            "& h1, & h2, & h3, & h4": {
              fontFamily: fonts.display,
              fontWeight: 700,
              mt: 5,
              mb: 2,
              color: "text.primary",
            },
            "& h2": { fontSize: "1.75rem" },
            "& h3": { fontSize: "1.4rem" },
            "& p": {
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "text.secondary",
              mb: 2.5,
            },
            "& strong": { color: "text.primary", fontWeight: 700 },
            "& blockquote": {
              borderLeft: (t) => `3px solid ${t.palette.secondary.main}`,
              pl: 3,
              py: 0.5,
              my: 3,
              color: "text.primary",
              fontFamily: fonts.display,
              fontStyle: "italic",
              fontSize: "1.25rem",
            },
            "& ul, & ol": { pl: 3, mb: 3 },
            "& li": {
              fontSize: "1.0625rem",
              color: "text.secondary",
              mb: 1,
              lineHeight: 1.7,
            },
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              my: 3,
            },
            "& th, & td": {
              px: 2,
              py: 1.5,
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
              textAlign: "left",
            },
            "& th": {
              fontWeight: 700,
              color: "text.primary",
              bgcolor: "background.paper",
            },
            "& code": {
              bgcolor: "background.paper",
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.95em",
              fontFamily: fonts.body,
            },
          }}
        >
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            Enjoyed this read? Share it with someone who'd appreciate it.
          </Typography>
          <Button
            component={Link}
            href="/franchise"
            variant="contained"
            color="primary"
          >
            Apply for Franchise
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
