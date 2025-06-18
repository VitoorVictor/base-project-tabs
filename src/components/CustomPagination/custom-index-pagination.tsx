import { IMeta } from "@/interfaces/comum";

export function CustomIndexPagination({ metaData }: { metaData: IMeta }) {
  return (
    metaData && (
      <div className="mb-1 flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 px-1">
        <div className="text-sm text-muted-foreground">
          Exibindo de{" "}
          {metaData.currentPage === 1
            ? 1
            : metaData.totalItems * (metaData.currentPage - 1) + 1}
          até {metaData.currentPage * metaData.totalItems} de um total de{" "}
          {metaData.totalItems}{" "}
          {metaData.totalItems > 1 ? "registros" : "registro"}
        </div>
        {/* <div className="text-sm text-muted-foreground">
         Página {metaData.currentPage} de {metaData.totalPages}
        </div> */}
      </div>
    )
  );
}
