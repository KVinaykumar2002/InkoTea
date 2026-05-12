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
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { FAQS } from "@/data/faqs";
import type { FAQ } from "@/types";

type Audience = "franchise" | "customer";

export function FAQAccordion() {
  const [audience, setAudience] = useState<Audience>("franchise");
  const [expanded, setExpanded] = useState<string | false>(false);

  const filtered = useMemo<FAQ[]>(
    () => FAQS.filter((f) => f.audience === audience),
    [audience],
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
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              px: 3,
            },
          }}
        >
          <Tab label="Franchise Questions" value="franchise" />
          <Tab label="Customer Questions" value="customer" />
        </Tabs>
      </Box>

      <Box sx={{ maxWidth: 880, mx: "auto" }}>
        {filtered.map((faq, idx) => (
          <ScrollReveal key={faq.id} delay={Math.min(idx * 0.04, 0.3)}>
            <Accordion
              expanded={expanded === faq.id}
              onChange={(_, isOpen) => setExpanded(isOpen ? faq.id : false)}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: (t) => `1px solid ${t.palette.divider}`,
                boxShadow: "none",
                "&::before": { display: "none" },
                "&.Mui-expanded": {
                  borderColor: "primary.main",
                  boxShadow: "0 14px 40px -16px rgba(0,0,0,0.12)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  py: 1,
                  px: 3,
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ pr: 2 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  );
}
