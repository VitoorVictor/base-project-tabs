import { ColumnConfig } from "@/components/CustomTable";
import { Badge } from "@/components/ui/badge";
import { IPlanoConta } from "@/interfaces/plano-conta";
import {
  CheckCircle2,
  ClipboardList,
  Pencil,
  Trash2,
  XCircle,
} from "lucide-react";

export const columns: ColumnConfig<IPlanoConta>[] = [
  {
    key: "descricao",
    label: "Descrição",
    sorted: true,
    className: "w-[35%] lg:w-[50%]",
    headerClassName: "w-[35%] lg:w-[50%]",
  },
  {
    key: "natureza",
    label: "Natureza",
    sorted: true,
    className: "w-[10%]",
    headerClassName: "w-[10%]",
  },
  {
    key: "conta",
    label: "Conta",
    sorted: true,
    className: "w-[17%] lg:w-[12%]",
    headerClassName: "w-[17%] lg:w-[12%]",
    render: (value) => {
      const raw = value.toString() || "";

      const formatted =
        raw.length === 9
          ? `${raw[0]}.${raw.slice(1, 3)}.${raw.slice(3, 5)}.${raw.slice(5)}`
          : raw;

      return formatted;
    },
  },
  {
    key: "participaAnaliseResultado",
    label: "Análise",
    sorted: true,
    className: "w-[18%] lg:w-[13%]",
    headerClassName: "w-[18%] lg:w-[13%]",
    render: (value) => (
      <div className="flex items-center gap-2">
        {value ? (
          <>
            <CheckCircle2 className="text-green-500 w-4 h-4" />
            <span className="text-green-600 font-medium">Participa</span>
          </>
        ) : (
          <>
            <XCircle className="text-red-500 w-4 h-4" />
            <span className="text-red-600 font-medium">Não Part.</span>
          </>
        )}
      </div>
    ),
  },
  {
    key: "ativo",
    label: "Ativo",
    sorted: true,
    className: "w-[10%]",
    headerClassName: "w-[10%]",
    render: (value) => {
      return (
        <Badge
          variant={value ? "default" : "destructive"}
          className="text-white"
        >
          {value ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
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
