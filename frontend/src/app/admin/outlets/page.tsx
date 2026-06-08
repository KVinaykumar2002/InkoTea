"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormModal } from "@/features/admin/AdminFormModal";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api, type Outlet } from "@/lib/api";
import type { FranchiseModelKey } from "@/types";

const empty: Outlet = {
  id: "",
  name: "",
  city: "",
  area: "",
  address: "",
  type: "kiosk",
  image: "",
  mapsQuery: "",
  openingYear: new Date().getFullYear(),
};

function OutletsContent() {
  const { token } = useAdminAuth();
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [form, setForm] = useState<Outlet>(empty);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = useCallback(() => {
    api.getOutlets().then((r) => setOutlets(r.outlets));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...empty, id: `outlet-${Date.now()}` });
    setEditing(false);
    setOpen(true);
  };

  const openEdit = (o: Outlet) => {
    setForm(o);
    setEditing(true);
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    if (editing) await api.updateOutlet(token, form.id, form);
    else await api.createOutlet(token, form);
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this outlet?")) return;
    await api.deleteOutlet(token, id);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Outlets
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openCreate}>
          Add outlet
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Year</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {outlets.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.name}</TableCell>
              <TableCell>{o.city}</TableCell>
              <TableCell>{o.type}</TableCell>
              <TableCell>{o.openingYear}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(o)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(o.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AdminFormModal
        open={open}
        title={editing ? "Edit outlet" : "New outlet"}
        subtitle="Store locations shown on the outlets page"
        onClose={() => setOpen(false)}
        onSave={save}
      >
        <AdminFormField
          label="ID"
          value={form.id}
          disabled={editing}
          onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
        />
        <AdminFormField
          label="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <AdminFormField
          label="City"
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        />
        <AdminFormField
          label="Area"
          value={form.area}
          onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
        />
        <AdminFormField
          label="Address"
          multiline
          rows={2}
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
        />
        <AdminFormField
          label="Type"
          value={form.type}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              type: e.target.value as FranchiseModelKey,
            }))
          }
          hint="kiosk or cafe"
        />
        <ImageDropzone
          label="Outlet photo"
          value={form.image}
          onChange={(url) => setForm((f) => ({ ...f, image: url }))}
        />
        <AdminFormField
          label="Maps query"
          value={form.mapsQuery}
          onChange={(e) => setForm((f) => ({ ...f, mapsQuery: e.target.value }))}
        />
        <AdminFormField
          label="Opening year"
          type="number"
          value={form.openingYear}
          onChange={(e) =>
            setForm((f) => ({ ...f, openingYear: Number(e.target.value) }))
          }
        />
      </AdminFormModal>
    </Box>
  );
}

export default function AdminOutletsPage() {
  return (
    <AdminGuard>
      <OutletsContent />
    </AdminGuard>
  );
}
