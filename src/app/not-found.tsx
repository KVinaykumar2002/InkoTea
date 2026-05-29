import { fontDisplayItalicSx } from "@/theme/fonts";
import Link from "next/link";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 12, md: 16 } }}>
      <Stack spacing={4} alignItems="center" textAlign="center">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5rem", md: "8rem" },
            color: "primary.main",
            ...fontDisplayItalicSx,
            lineHeight: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h3" sx={{ maxWidth: 560 }}>
          Looks like this cup got lost in the kitchen.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
          The page you're looking for doesn't exist or has moved. Let's get you
          back to something brewing.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
          >
            Go home
          </Button>
          <Button
            component={Link}
            href="/outlets"
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<StorefrontIcon />}
          >
            Find an outlet
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
