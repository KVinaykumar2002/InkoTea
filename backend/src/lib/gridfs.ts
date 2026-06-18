import { GridFSBucket } from "mongodb";
import type { Readable } from "node:stream";
import { getDb } from "../db/index.js";

const BUCKET_NAME = "uploads";

function bucket(): GridFSBucket {
  return new GridFSBucket(getDb(), { bucketName: BUCKET_NAME });
}

export async function storeUpload(
  data: Buffer,
  filename: string,
  contentType: string,
): Promise<void> {
  const gfs = bucket();
  await new Promise<void>((resolve, reject) => {
    const stream = gfs.openUploadStream(filename, {
      metadata: { contentType },
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve());
    stream.end(data);
  });
}

export async function openUpload(
  filename: string,
): Promise<{ stream: Readable; contentType: string } | null> {
  const gfs = bucket();
  const files = await gfs
    .find({ filename })
    .sort({ uploadDate: -1 })
    .limit(1)
    .toArray();

  if (!files.length) return null;

  const file = files[0];
  const contentType =
    (file.metadata as { contentType?: string } | undefined)?.contentType ??
    "application/octet-stream";

  return {
    stream: gfs.openDownloadStreamByName(filename),
    contentType,
  };
}
