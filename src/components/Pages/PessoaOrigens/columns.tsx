import { ColumnConfig } from "@/components/CustomTable";
import { IPessoaOrigem } from "@/interfaces/pessoa-origem";
import { ClipboardList, Pencil, Trash2 } from "lucide-react";

export const columns: ColumnConfig<IPessoaOrigem>[] = [
  {
    key: "descricao",
    label: "Descrição",
    sorted: true,
    className: "w-[95%]",
    headerClassName: "w-[95%]",
  },
];

export const dropdowns = [
  {
    name: "details",
    label: "Detalhes",
    icon: <ClipboardList />,
    permission: "findOne",
  },
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
