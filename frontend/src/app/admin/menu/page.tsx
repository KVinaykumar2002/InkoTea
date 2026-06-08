"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { api, type MenuItem } from "@/lib/api";
import type { MenuCategory } from "@/types";

const empty: MenuItem = {
  id: "",
  name: "",
  category: "signature-tea",
  description: "",
  priceRange: "",
  image: "",
  isBestSeller: false,
};

function MenuContent() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<MenuItem>(empty);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = useCallback(() => {
    api.getMenu().then((r) => setItems(r.items));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...empty, id: `item-${Date.now()}` });
    setEditing(false);
    setOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setForm(item);
    setEditing(true);
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    if (editing) await api.updateMenuItem(token, form.id, form);
    else await api.createMenuItem(token, form);
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this item?")) return;
    await api.deleteMenuItem(token, id);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Menu items
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openCreate}>
          Add item
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Best seller</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.priceRange}</TableCell>
              <TableCell>{item.isBestSeller ? "Yes" : "—"}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(item)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(item.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AdminFormModal
        open={open}
        title={editing ? "Edit menu item" : "New menu item"}
        subtitle="Update product details shown on the menu page"
        onClose={() => setOpen(false)}
        onSave={save}
      >
        <AdminFormField
          label="ID"
          value={form.id}
          disabled={editing}
          onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
          hint="Unique identifier — cannot be changed after creation"
        />
        <AdminFormField
          label="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <AdminFormField
          label="Category"
          value={form.category}
          onChange={(e) =>
            setForm((f) => ({ ...f, category: e.target.value as MenuCategory }))
          }
          hint="e.g. signature-tea, coffee, social-beverages, comfort-bites"
        />
        <AdminFormField
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
        <AdminFormField
          label="Price range"
          value={form.priceRange}
          onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))}
          placeholder="₹25 – ₹40"
        />
        <ImageDropzone
          label="Product image"
          value={form.image}
          onChange={(url) => setForm((f) => ({ ...f, image: url }))}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(form.isBestSeller)}
              onChange={(e) =>
                setForm((f) => ({ ...f, isBestSeller: e.target.checked }))
              }
            />
          }
          label="Mark as best seller"
        />
      </AdminFormModal>
    </Box>
  );
}

export default function AdminMenuPage() {
  return (
    <AdminGuard>
      <MenuContent />
    </AdminGuard>
  );
}
