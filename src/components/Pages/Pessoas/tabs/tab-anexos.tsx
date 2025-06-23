import {
  CustomTableAnexos,
  ColumnConfig,
} from "@/components/CustomTable/custom-table-anexos";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { useAnexos } from "@/hooks/tanstack/useAnexo";
import { useAnexoActions } from "@/hooks/useAnexo";
import { IAnexo } from "@/interfaces/anexo";
import { formatDatetime } from "@/utils/formatDatetime";
import { Eye, Trash } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface TabAnexosProps {
  isDetails?: boolean;
  isLoading?: boolean;
  onDelete?: (id: string) => void;
}

export function TabAnexos({ isDetails, isLoading, onDelete }: TabAnexosProps) {
  const { getValues } = useFormContext();
  const { openAnexo } = useAnexoActions();

  const pessoaId = getValues("id");

  const { data, isLoading: isLoadingAnexos } = useAnexos("pessoas", pessoaId, {
    enabled: !!pessoaId,
    queryKey: ["anexo", "pessoas", pessoaId],
  });

  const columns: ColumnConfig<IAnexo>[] = [
    {
      key: "createdAt",
      label: "Data de Inclusão",
      sorted: true,
      className: "w-[15%]",
      headerClassName: "w-[15%]",
      render: (value) => formatDatetime(value),
    },
    {
      key: "titulo",
      label: "Título",
      sorted: true,
      className: "w-auto",
      headerClassName: "w-auto",
    },
    {
      key: "observacao",
      label: "Observação",
      sorted: false,
      className: "w-10%",
      headerClassName: "w-10%",
      render: (value) => value ?? "",
    },
    {
      key: "ext",
      label: "Ext",
      sorted: false,
      className: "w-[8%] text-center",
      headerClassName: "w-[8%] text-center",
      render: (value) => value ?? "",
    },
    {
      key: "micrologInclusao",
      label: "Incluído por",
      sorted: false,
      className: "w-[12%]",
      headerClassName: "w-[12%]",
      render: (value) => value ?? "",
    },
    {
      key: "id",
      label: "Ações",
      sorted: false,
      className: "w-[12%]",
      headerClassName: "w-[12%]",
      render: (_, row) => (
        <div className="flex justify-center gap-2">
          <Button
            aria-label="Visualizar anexo"
            size="icon"
            variant="outline"
            className="border-primary text-primary"
            type="button"
            onClick={() => openAnexo(row.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Excluir anexo"
            size="icon"
            variant="outline"
            className="border-destructive text-destructive"
            type="button"
            onClick={() => onDelete && onDelete(row.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <TabsContent value="anexos">
      <div className="flex flex-col gap-1 bg-background-alt p-4 border rounded mb-5">
        <div className="flex gap-2 items-center">
          <FormLabel className="font-semibold text-base">Anexos</FormLabel>
        </div>

        <CustomTableAnexos
          data={data || []}
          columns={columns}
          minWidth="1000px"
        />
      </div>
    </TabsContent>
  );
}
