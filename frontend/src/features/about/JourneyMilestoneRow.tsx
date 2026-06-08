"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { JOURNEY_META } from "./journeyMeta";
import { JourneyGlyph } from "./JourneyGlyph";
import { JourneyMilestone } from "./JourneyMilestone";

const SCROLL_SPRING = { stiffness: 85, damping: 22, restDelta: 0.001 } as const;

interface JourneyMilestoneRowProps {
  milestone: {
    year: string;
    title: string;
    text: string;
  };
  index: number;
  isMobile: boolean;
  glyphSize: number;
  reduced: boolean;
}

export function JourneyMilestoneRow({
  milestone,
  index,
  isMobile,
  glyphSize,
  reduced,
}: JourneyMilestoneRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const meta = JOURNEY_META[milestone.year];
  const enterX = isMobile ? (isLeft ? -16 : 16) : isLeft ? -32 : 32;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.92", "start 0.32"],
  });

  const glyphOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 1, 1]);
  const glyphScale = useTransform(scrollYProgress, [0, 0.5], [0.42, 1]);
  const glyphY = useTransform(scrollYProgress, [0, 0.5], [22, 0]);

  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.5, 1], [0, 1, 1]);
  const cardX = useTransform(scrollYProgress, [0.1, 0.58], [enterX, 0]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.58], [36, 0]);
  const stampScale = useTransform(scrollYProgress, [0.22, 0.62], [0, 1]);

  const glyphOpacityMotion = useSpring(glyphOpacity, SCROLL_SPRING);
  const glyphScaleMotion = useSpring(glyphScale, SCROLL_SPRING);
  const glyphYMotion = useSpring(glyphY, SCROLL_SPRING);
  const cardOpacityMotion = useSpring(cardOpacity, SCROLL_SPRING);
  const cardXMotion = useSpring(cardX, SCROLL_SPRING);
  const cardYMotion = useSpring(cardY, SCROLL_SPRING);
  const stampScaleMotion = useSpring(stampScale, SCROLL_SPRING);

  const glyphMotionStyle = reduced
    ? undefined
    : {
        opacity: glyphOpacityMotion,
        scale: glyphScaleMotion,
        y: glyphYMotion,
      };

  const cardMotionStyle = reduced
    ? undefined
    : {
        opacity: cardOpacityMotion,
        x: cardXMotion,
        y: cardYMotion,
      };

  const stampMotionStyle = reduced
    ? undefined
    : { scale: stampScaleMotion };

  return (
    <Box
      ref={rowRef}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "76px minmax(0, 1fr)",
          md: "1fr 88px 1fr",
        },
        columnGap: { xs: 1.5, md: 0 },
        alignItems: "center",
        mb: { xs: 4, md: 5 },
        "&:last-of-type": { mb: 0 },
      }}
    >
      <Box
        component={motion.div}
        style={glyphMotionStyle}
        sx={{
          gridColumn: { xs: 1, md: 2 },
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <JourneyGlyph kind={meta?.glyph ?? "single"} size={glyphSize} />
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          gridColumn: 1,
          pr: 2.5,
          visibility: isLeft ? "visible" : "hidden",
        }}
      >
        <Box
          component={motion.div}
          style={cardMotionStyle}
          sx={{ maxWidth: 440, width: "100%" }}
        >
          <JourneyMilestone
            {...milestone}
            align="right"
            stampMotionStyle={stampMotionStyle}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-start",
          gridColumn: 3,
          pl: 2.5,
          visibility: isLeft ? "hidden" : "visible",
        }}
      >
        <Box
          component={motion.div}
          style={cardMotionStyle}
          sx={{ maxWidth: 440, width: "100%" }}
        >
          <JourneyMilestone
            {...milestone}
            align="left"
            stampMotionStyle={stampMotionStyle}
          />
        </Box>
      </Box>

      <Box
        component={motion.div}
        style={cardMotionStyle}
        sx={{
          gridColumn: 2,
          display: { xs: "block", md: "none" },
          minWidth: 0,
          pl: { xs: 0, sm: 0.5 },
          pr: { xs: 0.25, sm: 0 },
        }}
      >
        <JourneyMilestone
          {...milestone}
          align="left"
          stampMotionStyle={stampMotionStyle}
        />
      </Box>
    </Box>
  );
}
