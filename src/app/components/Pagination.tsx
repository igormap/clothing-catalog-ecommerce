"use client";

import * as P from "@/components/ui/pagination";
import { ListProductParams } from "@/services/api";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Props {
  productCount: number;
  page: number;
  pageSize: number;
  // onPageClick: (page: number) => void;
}

export function Pagination({
  productCount,
  page,
  pageSize,
}: // onPageClick,
Props) {
  const router = useRouter();
  const totalPages = Math.ceil(productCount / pageSize);

  const startIndex = useMemo(
    () => page * pageSize - (pageSize - 1),
    [page, pageSize]
  );
  const endIndex = useMemo(
    () => Math.min(page * pageSize, productCount),
    [page, pageSize, productCount]
  );

  const updateSearchParams = useCallback(
    (params: ListProductParams) => {
      const currentParams = new URLSearchParams(window.location.search);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });
      router.push(`/?${currentParams.toString()}`, { scroll: false });
    },
    [router]
  );

  return (
    <P.Pagination className="flex flex-col items-center md:flex-row md:items-center">
      <span className="italic">
        {startIndex} - {endIndex} de {productCount} produtos
      </span>
      <P.PaginationContent>
        <P.PaginationItem>
          <P.PaginationPrevious className="text-zinc-600" href="#" />
        </P.PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <P.PaginationItem key={index}>
            <P.PaginationLink
              href="#"
              isActive={page === index + 1}
              onClick={() => updateSearchParams({ page: index + 1 })}
            >
              {index + 1}
            </P.PaginationLink>
          </P.PaginationItem>
        ))}
        <P.PaginationItem>
          <P.PaginationNext className="text-zinc-600" href="#" />
        </P.PaginationItem>
      </P.PaginationContent>
    </P.Pagination>
  );
}
