import { IMeta } from "@/interfaces/comum";

export function CustomIndexPagination({ metaData }: { metaData: IMeta }) {
  return (
    metaData && (
      <div className="mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="text-sm text-muted-foreground">
          Mostrando{" "}
          {metaData.currentPage === 1
            ? 1
            : metaData.totalItems * (metaData.currentPage - 1) + 1}
          -{metaData.currentPage * metaData.totalItems} de {metaData.totalItems}{" "}
          registros
        </div>
        <div className="text-sm text-muted-foreground">
          Página {metaData.currentPage} de {metaData.totalPages}
        </div>
      </div>
    )
  );
}
