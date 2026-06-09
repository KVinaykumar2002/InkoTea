"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import {
  AdminDesktopTable,
  AdminMobileCardList,
  AdminRecordCard,
} from "@/features/admin/AdminRecordCard";
import { AdminTableContainer } from "@/features/admin/AdminTableContainer";
import { AdminTablePagination } from "@/features/admin/AdminTablePagination";
import { useTablePagination } from "@/features/admin/useTablePagination";
import { useAdminDeleteConfirm } from "@/features/admin/AdminDeleteConfirmProvider";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api, type Lead } from "@/lib/api";

const STATUSES = ["new", "contacted", "qualified", "closed"] as const;

function LeadsContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [messageLead, setMessageLead] = useState<Lead | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    api.getLeads(token, params).then((r) => setLeads(r.leads));
  }, [token, search, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.updateLeadStatus(token, id, status);
      load();
      showSuccess(`Lead status updated to ${status}`);
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to update lead status"));
    }
  };

  const remove = async (lead: Lead) => {
    if (!token) return;
    const confirmed = await confirmDelete({
      title: "Delete lead",
      message: "This will permanently remove the lead from your dashboard.",
      itemName: lead.name,
    });
    if (!confirmed) return;
    try {
      await api.deleteLead(token, lead.id);
      load();
      showSuccess("Lead deleted");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to delete lead"));
    }
  };

  const {
    page,
    setPage,
    pageSize,
    totalPages,
    showPagination,
    paginatedItems,
    totalItems,
  } = useTablePagination(leads, { resetKey: `${search}-${statusFilter}` });

  return (
    <Box>
      <AdminPageHeader title="Leads" />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
        }}
      >
        <AdminFormField
          label="Search"
          placeholder="Name, phone, city, message…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: { xs: "100%", sm: 260 }, flex: { sm: 1 } }}
        />
        <FormControl
          variant="filled"
          sx={{ minWidth: { xs: "100%", sm: 160 }, width: { xs: "100%", sm: "auto" } }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {STATUSES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <AdminMobileCardList>
        {paginatedItems.map((lead) => (
          <AdminRecordCard
            key={lead.id}
            title={lead.name}
            subtitle={lead.email}
            rows={[
              { label: "Phone", value: lead.phone },
              { label: "City", value: lead.city },
              {
                label: "Source",
                value: <Chip label={lead.source} size="small" variant="outlined" />,
              },
              {
                label: "Date",
                value: new Date(lead.createdAt).toLocaleDateString(),
              },
            ]}
            actions={
              <>
                {lead.message ? (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setMessageLead(lead)}
                  >
                    View Message
                  </Button>
                ) : null}
                <IconButton size="small" onClick={() => remove(lead)} aria-label="Delete lead">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            }
          >
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AdminRecordCard>
        ))}
      </AdminMobileCardList>

      <AdminDesktopTable>
      <AdminTableContainer minWidth={1040}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={600}>
                  {lead.name}
                </Typography>
                {lead.email && (
                  <Typography variant="caption" color="text.secondary">
                    {lead.email}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.city}</TableCell>
              <TableCell>
                {lead.message ? (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setMessageLead(lead)}
                  >
                    View Message
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.disabled">
                    —
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Chip label={lead.source} size="small" variant="outlined" />
              </TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                {new Date(lead.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => remove(lead)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </AdminTableContainer>
      </AdminDesktopTable>
      {showPagination && (
        <AdminTablePagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}

      <Dialog
        open={messageLead !== null}
        onClose={() => setMessageLead(null)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          Message from {messageLead?.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {messageLead?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageLead(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function AdminLeadsPage() {
  return (
    <AdminGuard>
      <LeadsContent />
    </AdminGuard>
  );
}
