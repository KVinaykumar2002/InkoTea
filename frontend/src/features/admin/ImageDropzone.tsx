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

interface ImageDropzoneProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageDropzone({
  label = "Image",
  value,
  onChange,
}: ImageDropzoneProps) {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const inputRef = useRef<HTMLInputElement>(null);
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
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) upload(file);
    },
    [upload],
  );

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
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
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
          accept="image/*"
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
            src={value}
            alt="Preview"
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
