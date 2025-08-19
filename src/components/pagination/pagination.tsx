"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { redirect, usePathname, useSearchParams } from "next/navigation";

import { generatePaginationNumbers } from "@/lib/generatePaginationNumbers";

interface Props {
  totalPages: number;
}
export function Paginations({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (+pageNumber <= 0) {
      params.delete("page");
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationLink href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-5 w-5" />
          </PaginationLink>
        </PaginationItem>

        {allPages.map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={createPageUrl(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink href={createPageUrl(currentPage + 1)}>
            <ChevronRight className="h-5 w-5" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
