"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Chip,
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api, type Lead } from "@/lib/api";

const STATUSES = ["new", "contacted", "qualified", "closed"] as const;

function LeadsContent() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
    await api.updateLeadStatus(token, id, status);
    load();
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this lead?")) return;
    await api.deleteLead(token, id);
    load();
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Leads
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <AdminFormField
          label="Search"
          placeholder="Name, phone, city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <FormControl variant="filled" sx={{ minWidth: 160 }}>
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
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
                <IconButton size="small" onClick={() => remove(lead.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
