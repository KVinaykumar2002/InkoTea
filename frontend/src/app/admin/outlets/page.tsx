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
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { AdminTableContainer } from "@/features/admin/AdminTableContainer";
import { AdminTablePagination } from "@/features/admin/AdminTablePagination";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import { useTablePagination } from "@/features/admin/useTablePagination";
import { useAdminDeleteConfirm } from "@/features/admin/AdminDeleteConfirmProvider";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
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
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
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
    try {
      if (editing) await api.updateOutlet(token, form.id, form);
      else await api.createOutlet(token, form);
      setOpen(false);
      load();
      showSuccess(editing ? "Outlet updated" : "Outlet created");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save outlet"));
    }
  };

  const remove = async (outlet: Outlet) => {
    if (!token) return;
    const confirmed = await confirmDelete({
      title: "Delete outlet",
      message: "This will permanently remove the outlet from the website.",
      itemName: outlet.name,
    });
    if (!confirmed) return;
    try {
      await api.deleteOutlet(token, outlet.id);
      load();
      showSuccess("Outlet deleted");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to delete outlet"));
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
  } = useTablePagination(outlets);

  return (
    <Box>
      <AdminPageHeader
        title="Outlets"
        action={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openCreate}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add outlet
          </Button>
        }
      />
      <AdminTableContainer minWidth={720}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 88, minWidth: 88, whiteSpace: "nowrap" }}>
              Image
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Year</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((o) => (
            <TableRow key={o.id}>
              <TableCell sx={{ width: 88, minWidth: 88 }}>
                {o.image ? (
                  <Box
                    component="img"
                    src={o.image}
                    alt={o.name}
                    sx={{
                      width: 56,
                      height: 40,
                      borderRadius: 1,
                      objectFit: "cover",
                      display: "block",
                      bgcolor: "grey.100",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 56,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      —
                    </Typography>
                  </Box>
                )}
              </TableCell>
              <TableCell>{o.name}</TableCell>
              <TableCell>{o.city}</TableCell>
              <TableCell>{o.type}</TableCell>
              <TableCell>{o.openingYear}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(o)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(o)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
