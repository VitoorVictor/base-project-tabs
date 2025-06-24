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

interface CustomPagesPaginationProps {
  metaData: IMeta;
  setPage: (page: number) => void;
}
export function CustomPagesPagination({
  metaData,
  setPage,
}: CustomPagesPaginationProps) {
  const totalPages = metaData.totalPages;
  const currentPage = metaData.currentPage;
  return (
    totalPages > 0 && (
      <div className="flex justify-center pb-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  setPage(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50 h-8"
                    : "h-8  cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Páginas */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Mostrar apenas algumas páginas para não ficar muito longo
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page);
                      }}
                      className={
                        currentPage === page
                          ? "bg-primary text-white hover:bg-primary/80 hover:text-white h-8 w-8"
                          : "h-8 w-8"
                      }
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis className="h-8 w-8" />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  setPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50 h-8"
                    : "h-8  cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
