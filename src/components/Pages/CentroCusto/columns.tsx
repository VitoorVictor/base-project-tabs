import { ColumnConfig } from "@/components/CustomTable";
import { ICentroCusto } from "@/interfaces/centro-custo";
import { CheckCircle2, Pencil, Trash2, XCircle } from "lucide-react";

export const columns: ColumnConfig<ICentroCusto>[] = [
  {
    key: "descricao",
    label: "Descrição",
    sorted: true,
    className: "w-[60%] lg:w-[85%]",
    headerClassName: "w-[60%] lg:w-[85%]",
  },
  {
    key: "ativo",
    label: "Ativo",
    sorted: true,
    className: "w-[30%] lg:w-[10%]",
    headerClassName: "w-[30%] lg:w-[10%]",
    render: (value: boolean) => (
      <div className="flex items-center gap-2">
        {value ? (
          <>
            <CheckCircle2 className="text-green-500 w-4 h-4" />
            <span className="text-green-600 font-medium">Ativo</span>
          </>
        ) : (
          <>
            <XCircle className="text-red-500 w-4 h-4" />
            <span className="text-red-600 font-medium">Inativo</span>
          </>
        )}
      </div>
    ),
  },
];

export const dropdowns = [
  {
    name: "update",
    label: "Alterar",
    icon: <Pencil />,
    permission: "update",
  },
  {
    name: "delete",
    label: "Excluír",
    icon: <Trash2 />,
    permission: "delete",
  },
];
