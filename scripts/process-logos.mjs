// Strip black backgrounds from the supplied JPEG logos so the brand
// badge and wordmark render cleanly on cream/light surfaces. We threshold
// the luminance channel to build an alpha mask, then composite it onto
// the source RGB to produce a true transparent PNG.
//
// Inputs:  /public/logo.png            (square badge — circle on black)
//          /public/logo-wordmark.png   (full wordmark — text on black)
// Outputs: same paths, overwritten as RGBA PNG with transparency.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function makeTransparent(filename, lumaThreshold) {
  const inputPath = path.join(root, "public", filename);

  const rgb = await sharp(inputPath).removeAlpha().toBuffer();
  const meta = await sharp(rgb).metadata();
  const { width = 0, height = 0 } = meta;

  // Derive a binary alpha mask from greyscale luminance. Pixels darker
  // than `lumaThreshold` become transparent; lighter pixels stay opaque.
  // We slightly feather the threshold via a gaussian to avoid jagged edges.
  const alpha = await sharp(rgb)
    .greyscale()
    .linear(1.0, 0)
    .threshold(lumaThreshold)
    .blur(0.6)
    .toBuffer();

  await sharp(rgb)
    .joinChannel(alpha)
    .png({ compressionLevel: 9 })
    .toFile(inputPath + ".tmp");

  await sharp(inputPath + ".tmp").toFile(inputPath);

  console.log(`Processed ${filename} (${width}x${height})`);
}

await makeTransparent("logo.png", 28);
await makeTransparent("logo-wordmark.png", 28);
