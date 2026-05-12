/**
 * One-off script: build INKOTEA brand favicons from public/logo.png.
 *
 * Outputs:
 *   src/app/icon.png        (512x512, transparent — primary <link rel="icon">)
 *   src/app/apple-icon.png  (180x180, opaque cream — iOS home screen)
 *   src/app/favicon.ico     (multi-res 16/32/48 PNG-in-ICO container)
 *
 * Run:
 *   node scripts/generate-favicons.mjs
 */

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_LOGO = join(ROOT, "public", "logo.png");
const OUT_DIR = join(ROOT, "src", "app");

// Brand cream surface used as the opaque iOS icon background. Picked so the
// olive-green logo wordmark stays high-contrast on Apple home screens (iOS
// flattens transparency to black, which would swallow the dark logo).
const APPLE_BG = { r: 244, g: 236, b: 224, alpha: 1 };

/** Build a multi-resolution .ico from an array of square PNG buffers. */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + 16 * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(count, 4); // image count

  let offset = headerSize;
  pngBuffers.forEach((png, i) => {
    const size = png.size;
    const bytes = png.buffer.length;
    const entryOffset = 6 + 16 * i;

    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 0); // width
    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1); // height
    header.writeUInt8(0, entryOffset + 2); // palette
    header.writeUInt8(0, entryOffset + 3); // reserved
    header.writeUInt16LE(1, entryOffset + 4); // color planes
    header.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    header.writeUInt32LE(bytes, entryOffset + 8); // size of PNG data
    header.writeUInt32LE(offset, entryOffset + 12); // PNG data offset

    offset += bytes;
  });

  return Buffer.concat([header, ...pngBuffers.map((p) => p.buffer)]);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // 1. icon.png — primary modern favicon (transparent background, 512x512).
  await sharp(SRC_LOGO)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(OUT_DIR, "icon.png"));

  // 2. apple-icon.png — 180x180, cream background (iOS doesn't honor alpha).
  await sharp(SRC_LOGO)
    .resize(180, 180, { fit: "contain", background: APPLE_BG })
    .flatten({ background: APPLE_BG })
    .png()
    .toFile(join(OUT_DIR, "apple-icon.png"));

  // 3. favicon.ico — bundle 16, 32, 48 px PNGs (transparent) into one ICO.
  const icoSizes = [16, 32, 48];
  const icoEntries = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      buffer: await sharp(SRC_LOGO)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer(),
    }))
  );

  const ico = buildIco(icoEntries);
  await writeFile(join(OUT_DIR, "favicon.ico"), ico);

  console.log("Generated:");
  console.log("  src/app/icon.png        (512x512 transparent)");
  console.log("  src/app/apple-icon.png  (180x180 cream)");
  console.log(`  src/app/favicon.ico     (${icoSizes.join("/")} px multi-res)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
