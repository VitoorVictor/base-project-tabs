import { IMeta } from "@/interfaces/comum";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  meta: IMeta;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  meta,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", String(newPage));

    router.push(`?${currentParams.toString()}`);
  };

  const firstPage = () => {
    handlePageChange(1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;

      handlePageChange(newPage);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;

      handlePageChange(newPage);
    }
  };

  const lastPage = () => {
    handlePageChange(totalPages);
  };

  const renderPageNumbers = () => {
    const pages = [];

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      startPage = 2;
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(totalPages - 3, 2);
      endPage = totalPages - 1;
    }

    // Renderiza o intervalo de páginas entre startPage e endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i} className="cursor-pointer">
          <PaginationLink
            onClick={() => handlePageChange(i)}
            size={"sm"}
            className={
              i === currentPage
                ? "bg-primary hover:bg-slate-800 text-white hover:text-white"
                : ""
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="grid gap-2">
      <p className="text-xs text-center font-medium text-gray-500">
        Exibindo de{" "}
        {meta.itemCount === 0
          ? 0
          : meta.currentPage === 1
          ? 1
          : meta.itemsPerPage * (meta.currentPage - 1) + 1}{" "}
        até{" "}
        {meta.itemCount &&
          (meta.itemsPerPage * meta.currentPage < meta.totalItems
            ? meta.itemsPerPage * meta.currentPage
            : meta.totalItems)}{" "}
        de um total de {meta.itemCount ? meta.totalItems : 0}{" "}
        {meta.totalItems === 0 || 1 ? "registro" : "registros"}
      </p>
      <Pagination className="flex justify-center">
        <PaginationContent>
          {/*Previous Pagination*/}
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious size={"sm"} onClick={previousPage} />
          </PaginationItem>
          {/*First Pagination*/}
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => firstPage()}
              size={"sm"}
              className={
                currentPage === 1
                  ? "bg-primary hover:bg-slate-900 text-white hover:text-white"
                  : ""
              }
            >
              1
            </PaginationLink>
          </PaginationItem>

          {currentPage - 1 > 2 && totalPages > 5 && <PaginationEllipsis />}

          {renderPageNumbers()}

          {currentPage + 2 < totalPages && totalPages > 5 && (
            <PaginationEllipsis />
          )}

          {/*Last Pagination*/}
          {totalPages !== 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                onClick={() => lastPage()}
                size={"sm"}
                className={
                  currentPage === totalPages
                    ? "bg-primary hover:bg-slate-900 text-white hover:text-white"
                    : ""
                }
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          {/*Next Pagination*/}
          <PaginationItem className="cursor-pointer">
            <PaginationNext size={"sm"} onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
