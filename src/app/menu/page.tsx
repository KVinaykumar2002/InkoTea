"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy `/menu` URL — forwards to `/products`. */
export default function MenuRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/products");
  }, [router]);

  return null;
}
