import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type ContentStateChildren = ReactNode | (() => ReactNode);

function renderChildren(children: ContentStateChildren): ReactNode {
  return typeof children === "function" ? children() : children;
}

export function ContentState({
  loading,
  error,
  empty = false,
  emptyMessage = "No content available yet.",
  children,
}: {
  loading: boolean;
  error: string | null;
  empty?: boolean;
  emptyMessage?: string;
  children: ContentStateChildren;
}) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress aria-label="Loading content" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (empty) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    );
  }

  return <>{renderChildren(children)}</>;
}
