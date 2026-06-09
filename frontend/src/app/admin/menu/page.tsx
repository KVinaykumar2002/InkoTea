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
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import {
  AdminDesktopTable,
  AdminMobileCardList,
  AdminRecordCard,
} from "@/features/admin/AdminRecordCard";
import { AdminTableContainer } from "@/features/admin/AdminTableContainer";
import { resolveMediaUrl } from "@/lib/resolveMediaUrl";
import { AdminTablePagination } from "@/features/admin/AdminTablePagination";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import { useTablePagination } from "@/features/admin/useTablePagination";
import { useAdminDeleteConfirm } from "@/features/admin/AdminDeleteConfirmProvider";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
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
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
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
    try {
      if (editing) await api.updateMenuItem(token, form.id, form);
      else await api.createMenuItem(token, form);
      setOpen(false);
      load();
      showSuccess(editing ? "Menu item updated" : "Menu item created");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save menu item"));
    }
  };

  const remove = async (item: MenuItem) => {
    if (!token) return;
    const confirmed = await confirmDelete({
      title: "Delete menu item",
      message: "This will permanently remove the item from the menu.",
      itemName: item.name,
    });
    if (!confirmed) return;
    try {
      await api.deleteMenuItem(token, item.id);
      load();
      showSuccess("Menu item deleted");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to delete menu item"));
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
  } = useTablePagination(items);

  return (
    <Box>
      <AdminPageHeader
        title="Menu items"
        action={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openCreate}
          >
            Add item
          </Button>
        }
      />
      <AdminMobileCardList>
        {paginatedItems.map((item) => (
          <AdminRecordCard
            key={item.id}
            title={item.name}
            media={
              item.image ? (
                <Box
                  component="img"
                  src={resolveMediaUrl(item.image)}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    maxHeight: 140,
                    borderRadius: 1,
                    objectFit: "cover",
                    bgcolor: "grey.100",
                  }}
                />
              ) : undefined
            }
            rows={[
              { label: "Category", value: item.category },
              { label: "Price", value: item.priceRange },
              { label: "Best seller", value: item.isBestSeller ? "Yes" : "—" },
            ]}
            actions={
              <>
                <IconButton size="small" onClick={() => openEdit(item)} aria-label="Edit item">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(item)} aria-label="Delete item">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        ))}
      </AdminMobileCardList>

      <AdminDesktopTable>
      <AdminTableContainer minWidth={720}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 88, minWidth: 88, whiteSpace: "nowrap" }}>
              Image
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Best seller</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ width: 88, minWidth: 88 }}>
                {item.image ? (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
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
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.priceRange}</TableCell>
              <TableCell>{item.isBestSeller ? "Yes" : "—"}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(item)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(item)}>
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
