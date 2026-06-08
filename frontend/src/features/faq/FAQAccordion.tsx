"use client";

import { useState, useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContentState } from "@/components/common/ContentState";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useFaqs } from "@/hooks/useApiContent";
import type { FAQ } from "@/types";

type Audience = "franchise" | "customer";

export function FAQAccordion() {
  const { data, loading, error } = useFaqs();
  const [audience, setAudience] = useState<Audience>("franchise");
  const [expanded, setExpanded] = useState<string | false>(false);

  const filtered = useMemo<FAQ[]>(
    () => data?.faqs.filter((f) => f.audience === audience) ?? [],
    [audience, data?.faqs],
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        <Tabs
          value={audience}
          onChange={(_, value: Audience) => {
            setAudience(value);
            setExpanded(false);
          }}
          centered
          sx={{
            "& .MuiTab-root": { fontWeight: 600, textTransform: "none" },
          }}
        >
          <Tab label="Franchise Partners" value="franchise" />
          <Tab label="Customers" value="customer" />
        </Tabs>
      </Box>

      <ContentState loading={loading} error={error} empty={!filtered.length}>
        {filtered.map((faq, idx) => (
          <ScrollReveal key={faq.id} y={12} delay={idx * 0.04}>
            <Accordion
              expanded={expanded === faq.id}
              onChange={(_, isExpanded) =>
                setExpanded(isExpanded ? faq.id : false)
              }
              disableGutters
              elevation={0}
              sx={{
                mb: 1.5,
                borderRadius: "12px !important",
                border: (t) => `1px solid ${t.palette.divider}`,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ScrollReveal>
        ))}
      </ContentState>
    </Box>
  );
}
