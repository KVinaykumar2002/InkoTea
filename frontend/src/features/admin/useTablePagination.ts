"use client";

import { useEffect, useMemo, useState } from "react";

export const ADMIN_TABLE_PAGE_SIZE = 10;

interface UseTablePaginationOptions {
  pageSize?: number;
  /** When this value changes, the current page resets to 1. */
  resetKey?: string | number;
}

export function useTablePagination<T>(
  items: readonly T[],
  options: UseTablePaginationOptions = {},
) {
  const pageSize = options.pageSize ?? ADMIN_TABLE_PAGE_SIZE;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [options.resetKey]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const showPagination = items.length > pageSize;

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedItems = useMemo(() => {
    if (!showPagination) return items;
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize, showPagination]);

  return {
    page,
    setPage,
    pageSize,
    totalPages,
    showPagination,
    paginatedItems,
    totalItems: items.length,
  };
}
