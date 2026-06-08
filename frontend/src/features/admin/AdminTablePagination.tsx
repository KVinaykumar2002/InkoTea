"use client";

import { Box, Pagination, Typography } from "@mui/material";

interface AdminTablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AdminTablePagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: AdminTablePaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: 2,
        mt: 2,
        pt: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: { xs: "center", sm: "left" } }}
      >
        Showing {start}–{end} of {totalItems}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
          size="small"
          showFirstButton
          showLastButton
          siblingCount={0}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              minWidth: { xs: 30, sm: 32 },
              height: { xs: 30, sm: 32 },
            },
          }}
        />
      </Box>
    </Box>
  );
}
