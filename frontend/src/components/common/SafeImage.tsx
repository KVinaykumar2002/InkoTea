"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

/** Local, same-origin asset that always loads — used when the remote
 *  source fails. Lives in `/public/fallback-image.svg`. */
export const FALLBACK_IMAGE_SRC = "/fallback-image.svg";

type Props = Omit<ImageProps, "onError"> & {
  /** Override the fallback if a feature wants its own placeholder. */
  fallbackSrc?: string;
};

/**
 * Drop-in `next/image` replacement that swaps to a brand-themed local
 * placeholder when the remote `src` fails to load (404, network error,
 * blocked third-party host, etc.) so the user never sees an empty box.
 *
 * Usage is identical to `next/image` — fill, sizes, priority, style etc.
 * all pass through.
 */
export function SafeImage({
  src,
  fallbackSrc = FALLBACK_IMAGE_SRC,
  alt,
  ...rest
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  // If the parent re-renders with a different src (e.g. blog post changes),
  // reset so we try the new remote URL again before falling back.
  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      // The local SVG is small and shouldn't be optimized by Next's loader
      // (we already have `unoptimized: true` globally for static export, but
      // this is harmless future-proofing if that ever changes).
      unoptimized={currentSrc === fallbackSrc ? true : rest.unoptimized}
    />
  );
}
