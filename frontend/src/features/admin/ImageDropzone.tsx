"use client";

import { useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
import { api } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/resolveMediaUrl";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface ImageDropzoneProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

function getDroppedImageFile(dataTransfer: DataTransfer): File | null {
  const fromList = dataTransfer.files?.[0];
  if (fromList?.type.startsWith("image/")) return fromList;

  for (const item of Array.from(dataTransfer.items)) {
    if (item.kind === "file" && item.type.startsWith("image/")) {
      return item.getAsFile();
    }
  }

  return null;
}

export function ImageDropzone({
  label = "Image",
  value,
  onChange,
}: ImageDropzoneProps) {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepthRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        const message = "Please upload an image file (JPEG, PNG, WebP, GIF).";
        setError(message);
        showError(message);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        const message = "Image must be 5 MB or smaller.";
        setError(message);
        showError(message);
        return;
      }
      if (!token) {
        const message = "You must be signed in to upload images.";
        setError(message);
        showError(message);
        return;
      }
      setError("");
      setUploading(true);
      try {
        const { url } = await api.uploadImage(token, file);
        onChange(url);
        showSuccess("Image uploaded");
      } catch (err) {
        const message = getAdminErrorMessage(err, "Failed to upload image");
        setError(message);
        showError(message);
      } finally {
        setUploading(false);
      }
    },
    [token, onChange, showSuccess, showError],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current = 0;
      setDragging(false);
      const file = getDroppedImageFile(e.dataTransfer);
      if (file) upload(file);
    },
    [upload],
  );

  const previewUrl = value ? resolveMediaUrl(value) : "";

  return (
    <Box>
      <Typography
        component="label"
        variant="body2"
        fontWeight={600}
        sx={{ display: "block", mb: 1, color: "text.primary" }}
      >
        {label}
      </Typography>
      <Box
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dragDepthRef.current += 1;
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dragDepthRef.current -= 1;
          if (dragDepthRef.current <= 0) {
            dragDepthRef.current = 0;
            setDragging(false);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        sx={{
          border: 2,
          borderStyle: "dashed",
          borderColor: dragging ? "primary.main" : "divider",
          borderRadius: 2,
          bgcolor: dragging ? "action.hover" : "background.paper",
          p: 2,
          textAlign: "center",
          cursor: uploading ? "default" : "pointer",
          transition: "border-color 0.2s, background-color 0.2s",
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <CircularProgress size={32} />
        ) : value ? (
          <Box
            component="img"
            src={previewUrl}
            alt="Preview"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
            sx={{
              maxHeight: 120,
              maxWidth: "100%",
              borderRadius: 1,
              objectFit: "cover",
            }}
          />
        ) : (
          <CloudUploadIcon sx={{ fontSize: 40, color: "text.secondary" }} />
        )}
        <Typography variant="body2" color="text.secondary">
          {uploading
            ? "Uploading…"
            : "Drag & drop an image here, or click to browse"}
        </Typography>
      </Box>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
