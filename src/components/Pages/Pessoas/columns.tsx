import { ColumnConfig } from "@/components/CustomTable";
import { IPessoa } from "@/interfaces/pessoa";
import { ClipboardList, FileUp, Pencil, Trash2 } from "lucide-react";

export const columns: ColumnConfig<IPessoa>[] = [
  {
    key: "id",
    label: "Código",
    sorted: true,
    className: "w-[10%]",
    headerClassName: "w-[10%]",
  },
  {
    key: "razaoSocial",
    label: "Razão Social",
    sorted: true,
    className: "w-[20%]",
    headerClassName: "w-[20%]",
  },
  {
    key: "nomeFantasia",
    label: "Nome Fantasia",
    sorted: true,
    className: "w-[20%]",
    headerClassName: "w-[20%]",
  },
  {
    key: "cpfCnpj",
    label: "CPF / CNPJ",
    sorted: true,
    className: "w-[15%]",
    headerClassName: "w-[15%]",
  },
  {
    key: "fone",
    label: "Fone",
    sorted: true,
    className: "w-[15%]",
    headerClassName: "w-[15%]",
    render: (value) => (value ? value : ""),
  },
  {
    key: "celular",
    label: "Celular",
    sorted: true,
    className: "w-[15%]",
    headerClassName: "w-[15%]",
    render: (value) => (value ? value : ""),
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
    name: "anexo",
    label: "Anexar",
    icon: <FileUp />,
    permission: "anexos_create",
  },
  {
    name: "delete",
    label: "Excluír",
    icon: <Trash2 />,
    permission: "delete",
  },
];
