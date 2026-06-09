"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  pillarCardPadding,
  pillarCardSpacing,
  pillarIconSx,
} from "@/components/common/pillarCardStyles";
import {
  DEFAULT_CONTACT_CONTENT,
  formatQuickChatDescription,
} from "@shared/pageContent";
import { usePageContent } from "@/hooks/useApiContent";

export function ContactChannels() {
  const { content } = usePageContent("contact", DEFAULT_CONTACT_CONTENT);
  const { quickChat } = content;

  return (
    <Box sx={{ maxWidth: 520, mx: "auto" }}>
      <ScrollReveal>
        <Stack
          spacing={pillarCardSpacing}
          sx={{
            p: pillarCardPadding,
            borderRadius: 3,
            bgcolor: "success.main",
            color: "success.contrastText",
            transition: "transform 0.25s ease",
            "&:hover": { transform: "translateY(-4px)" },
          }}
        >
          <Box
            sx={{
              ...pillarIconSx,
              bgcolor: "rgba(255,255,255,0.18)",
              color: "inherit",
            }}
          >
            <WhatsAppIcon />
          </Box>
          <Typography
            variant="overline"
            sx={{
              color: "inherit",
              opacity: 0.9,
              letterSpacing: "0.18em",
            }}
          >
            Quick Chat
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "inherit",
              ...fontDisplayItalicSx,
            }}
          >
            {quickChat.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "inherit",
              opacity: 0.88,
              flexGrow: 1,
            }}
          >
            {formatQuickChatDescription(quickChat)}
          </Typography>
          <Button
            component="a"
            href={quickChat.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              alignSelf: "flex-start",
              fontWeight: 700,
              borderColor: "rgba(255,255,255,0.5)",
              color: "inherit",
              "&:hover": {
                borderColor: "currentColor",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            {quickChat.ctaLabel}
          </Button>
        </Stack>
      </ScrollReveal>
    </Box>
  );
}
