import { useState } from "react";

export const usePagination = <T,>(items: T[], initialPageSize = 10) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(pageStart, pageStart + pageSize);

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    setPage(1);
  };

  return {
    page: currentPage,
    pageSize,
    totalPages,
    pageStart,
    paginatedItems,
    setPage,
    setPageSize,
  };
};
