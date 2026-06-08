"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { AdminTableContainer } from "@/features/admin/AdminTableContainer";
import { AdminTablePagination } from "@/features/admin/AdminTablePagination";
import { useTablePagination } from "@/features/admin/useTablePagination";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/lib/api";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function DashboardContent() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof api.getDashboardStats>
  > | null>(null);

  useEffect(() => {
    if (!token) return;
    api.getDashboardStats(token).then(setStats).catch(console.error);
  }, [token]);

  const recentLeads = stats?.leads.recent ?? [];
  const {
    page,
    setPage,
    pageSize,
    totalPages,
    showPagination,
    paginatedItems,
    totalItems,
  } = useTablePagination(recentLeads);

  if (!stats) {
    return <Typography>Loading dashboard…</Typography>;
  }

  return (
    <Box>
      <AdminPageHeader title="Overview" />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Total leads" value={stats.leads.total} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="New leads" value={stats.leads.byStatus.new || 0} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Outlets" value={stats.content.outlets} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatCard label="Menu items" value={stats.content.menuItems} />
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Recent leads
          </Typography>
          <AdminTableContainer minWidth={560}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.city}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Chip label={lead.status} size="small" />
                  </TableCell>
                  <TableCell>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {recentLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No leads yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </AdminTableContainer>
          {showPagination && (
            <AdminTablePagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
