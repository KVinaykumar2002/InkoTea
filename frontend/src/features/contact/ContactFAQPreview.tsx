"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { ContentState } from "@/components/common/ContentState";
import { useFaqs } from "@/hooks/useApiContent";
import type { FAQ } from "@/types";

const FALLBACK_FAQS: FAQ[] = [
  {
    id: "response-time",
    question: "How quickly do you respond?",
    answer:
      "We reply to every enquiry within 24 hours on business days. WhatsApp messages usually receive a same-day response from our team.",
    audience: "customer",
  },
  {
    id: "services",
    question: "What can I contact you about?",
    answer:
      "Franchise opportunities, investor relations, outlet feedback, partnerships, and general questions about INKOTEA products and locations.",
    audience: "customer",
  },
  {
    id: "regions",
    question: "Which regions do you currently serve?",
    answer:
      "INKOTEA operates 40+ outlets across Telangana and Andhra Pradesh, with active expansion into neighbouring South Indian markets.",
    audience: "customer",
  },
  {
    id: "meeting",
    question: "How can I schedule a meeting?",
    answer:
      "Fill out the contact form on this page or message us on WhatsApp with your city and preferred time. Our franchise team will coordinate a call or site visit.",
    audience: "franchise",
  },
];

export function ContactFAQPreview() {
  const { data, loading, error } = useFaqs();
  const [expanded, setExpanded] = useState<string | false>(false);

  const items = useMemo<FAQ[]>(() => {
    const fromApi = data?.faqs?.slice(0, 4);
    return fromApi?.length ? fromApi : FALLBACK_FAQS;
  }, [data?.faqs]);

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: { xs: 3, md: 4 } }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <HelpOutlineIcon sx={{ color: "primary.main" }} />
          <Typography variant="h4">Frequently Asked Questions</Typography>
        </Stack>
        <Button
          component={Link}
          href="/faq"
          endIcon={<ArrowForwardIcon />}
          sx={{ textTransform: "none", fontWeight: 600, color: "text.primary" }}
        >
          View all FAQs
        </Button>
      </Stack>

      <ContentState loading={loading} error={error} empty={!items.length}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 1.5,
          }}
        >
          {items.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? faq.id : false)}
              disableGutters
              elevation={0}
              sx={{
                borderRadius: "12px !important",
                border: (t) => `1px solid ${t.palette.divider}`,
                bgcolor: "background.paper",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </ContentState>
    </Box>
  );
}
