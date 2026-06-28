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
import UploadFileIcon from "@mui/icons-material/UploadFile";
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
import { parseVideoUrl, SUPPORTED_VIDEO_HINT } from "@/lib/videoEmbed";

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
  videoUrl: "",
};

function normalizeTestimonial(t: Testimonial): Testimonial {
  const videoUrl = (t.videoUrl ?? "").trim();
  return {
    ...empty,
    ...t,
    videoUrl,
    isVideo: Boolean(t.isVideo || videoUrl),
  };
}

function TestimonialsContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Testimonial>(empty);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleVideoUpload = async (file: File) => {
    if (!token) return;
    if (!file.type.startsWith("video/")) {
      showError("Please choose a video file (MP4, WebM, MOV).");
      return;
    }
    setUploadingVideo(true);
    try {
      const { url } = await api.uploadMedia(token, file);
      setForm((f) => ({ ...f, videoUrl: url, isVideo: true }));
      showSuccess("Video uploaded — it will play in the popup.");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to upload video"));
    } finally {
      setUploadingVideo(false);
    }
  };

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
    setForm(normalizeTestimonial(t));
    setEditing(true);
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    const payload = normalizeTestimonial(form);
    const videoUrl = payload.videoUrl ?? "";

    if (videoUrl && !parseVideoUrl(videoUrl)) {
      showError(`Enter a valid video URL (${SUPPORTED_VIDEO_HINT})`);
      return;
    }

    try {
      if (editing) await api.updateTestimonial(token, payload.id, payload);
      else await api.createTestimonial(token, payload);
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
          >
            Add testimonial
          </Button>
        }
      />
      <AdminMobileCardList>
        {paginatedItems.map((t) => (
          <AdminRecordCard
            key={t.id}
            title={t.name}
            rows={[
              { label: "City", value: t.city },
              { label: "Rating", value: `${t.rating}★` },
              {
                label: "Video",
                value: t.videoUrl?.trim() ? "Yes" : t.isVideo ? "Style only" : "No",
              },
            ]}
            actions={
              <>
                <IconButton size="small" onClick={() => openEdit(t)} aria-label="Edit testimonial">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(t)} aria-label="Delete testimonial">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        ))}
      </AdminMobileCardList>

      <AdminDesktopTable>
      <AdminTableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Video</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.city}</TableCell>
              <TableCell>{t.rating}★</TableCell>
              <TableCell>
                {t.videoUrl?.trim()
                  ? "Linked"
                  : t.isVideo
                    ? "Play style"
                    : "—"}
              </TableCell>
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
                setForm((f) => ({
                  ...f,
                  isVideo: e.target.checked,
                  videoUrl: e.target.checked ? f.videoUrl : "",
                }))
              }
            />
          }
          label="Show play button on card"
        />
        <AdminFormField
          label="Video URL"
          value={form.videoUrl ?? ""}
          onChange={(e) => {
            const videoUrl = e.target.value;
            setForm((f) => ({
              ...f,
              videoUrl,
              isVideo: Boolean(videoUrl.trim()) || f.isVideo,
            }));
          }}
          placeholder="https://youtube.com/…, instagram.com/reel/…, facebook.com/…"
          hint={
            form.videoUrl?.trim()
              ? parseVideoUrl(form.videoUrl)
                ? "Valid video link — visitors can play this from the testimonial card."
                : `Unrecognized URL. Use ${SUPPORTED_VIDEO_HINT}.`
              : `Optional. Paste a ${SUPPORTED_VIDEO_HINT} to enable playback.`
          }
          error={Boolean(form.videoUrl?.trim()) && !parseVideoUrl(form.videoUrl ?? "")}
        />
        <Box>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            disabled={uploadingVideo}
          >
            {uploadingVideo ? "Uploading video…" : "Upload video file"}
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleVideoUpload(file);
                e.target.value = "";
              }}
            />
          </Button>
          <Box
            component="p"
            sx={{ mt: 1, mb: 0, fontSize: "0.8rem", color: "text.secondary" }}
          >
            Instagram & Facebook reels can&apos;t auto-play inside other sites
            (the platforms redirect to their app). To play a reel in the popup,
            download it and upload the video file here (MP4, up to 64&nbsp;MB).
          </Box>
        </Box>
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
