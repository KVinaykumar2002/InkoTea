"use client";

import { memo } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import type { MenuItem } from "@/types";

interface Props {
  item: MenuItem;
}

export const MenuItemCard = memo(function MenuItemCard({ item }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 50px -20px rgba(0,0,0,0.18)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          bgcolor: "background.default",
        }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        {item.isBestSeller ? (
          <Chip
            icon={<StarIcon />}
            label="Best Seller"
            size="small"
            color="secondary"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: 700,
              "& .MuiChip-icon": { color: "inherit" },
            }}
          />
        ) : null}
      </Box>
      <Stack spacing={1.25} sx={{ p: 3, flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1.5}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {item.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {item.priceRange}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {item.description}
        </Typography>
      </Stack>
    </Card>
  );
});
