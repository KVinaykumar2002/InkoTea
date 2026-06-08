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
import { api, type Testimonial } from "@/lib/api";

const empty: Testimonial = {
  id: "",
  name: "",
  initials: "",
  city: "",
  quote: "",
  image: "",
  imageAlt: "",
  rating: 5,
  isVideo: false,
};

function TestimonialsContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Testimonial>(empty);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = useCallback(() => {
    api.getTestimonials().then((r) => setItems(r.testimonials));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...empty, id: `testimonial-${Date.now()}` });
    setEditing(false);
    setOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setForm(t);
    setEditing(true);
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    try {
      if (editing) await api.updateTestimonial(token, form.id, form);
      else await api.createTestimonial(token, form);
      setOpen(false);
      load();
      showSuccess(editing ? "Testimonial updated" : "Testimonial created");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save testimonial"));
    }
  };

  const remove = async (testimonial: Testimonial) => {
    if (!token) return;
    const confirmed = await confirmDelete({
      title: "Delete testimonial",
      message: "This will permanently remove the review from the website.",
      itemName: testimonial.name,
    });
    if (!confirmed) return;
    try {
      await api.deleteTestimonial(token, testimonial.id);
      load();
      showSuccess("Testimonial deleted");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to delete testimonial"));
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
        title="Testimonials"
        action={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openCreate}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add testimonial
          </Button>
        }
      />
      <AdminTableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.city}</TableCell>
              <TableCell>{t.rating}★</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(t)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(t)}>
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
        title={editing ? "Edit testimonial" : "New testimonial"}
        subtitle="Customer reviews shown on the website"
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
          label="Initials"
          value={form.initials}
          onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value }))}
          placeholder="PS"
        />
        <AdminFormField
          label="City"
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        />
        <AdminFormField
          label="Quote"
          multiline
          rows={4}
          value={form.quote}
          onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
        />
        <ImageDropzone
          label="Photo"
          value={form.image}
          onChange={(url) => setForm((f) => ({ ...f, image: url }))}
        />
        <AdminFormField
          label="Image alt text"
          value={form.imageAlt}
          onChange={(e) => setForm((f) => ({ ...f, imageAlt: e.target.value }))}
        />
        <AdminFormField
          label="Rating"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          value={form.rating}
          onChange={(e) =>
            setForm((f) => ({ ...f, rating: Number(e.target.value) }))
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(form.isVideo)}
              onChange={(e) =>
                setForm((f) => ({ ...f, isVideo: e.target.checked }))
              }
            />
          }
          label="Video style card"
        />
      </AdminFormModal>
    </Box>
  );
}

export default function AdminTestimonialsPage() {
  return (
    <AdminGuard>
      <TestimonialsContent />
    </AdminGuard>
  );
}
