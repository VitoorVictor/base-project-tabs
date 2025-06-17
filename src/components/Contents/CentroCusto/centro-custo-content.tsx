"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ICentroCusto } from "@/interfaces/centro-custo";
import { IResponse } from "@/interfaces/comum";
import CustomTable from "@/components/CustomTable";
import { columns, dropdowns } from "./cetro-custo-columns";
import CustomPagination from "@/components/CustomPagination";
import { Header } from "../Header";

const mockData: IResponse<ICentroCusto> = {
  items: [
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
    {
      id: 1,
      secureId: "sec1",
      descricao: "Administração",
      ativo: true,
    },
    {
      id: 2,
      secureId: "sec2",
      descricao: "Vendas",
      ativo: true,
    },
    {
      id: 3,
      secureId: "sec3",
      descricao: "Marketing",
      ativo: false,
    },
  ],
  meta: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 3,
    itemCount: 0,
    itemsPerPage: 10,
  },
};

export function CentroCustosContent() {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<IError | null>(null);
  const [data, setData] = useState<IResponse<ICentroCusto>>(mockData);

  // Simulação de permissões - substitua pela sua lógica
  const havePermission = (permissionName: string): boolean => {
    return true; // Simular que tem todas as permissões
  };

  // useEffect(() => {
  //   fetch();
  // }, [refresh, fetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex-1 h-full flex flex-col gap-4 p-4 bg-background rounded-md border custom-scrollbar overflow-y-auto">
        <div className="flex items-center justify-between">
          <Header
            title="Centros de Custos"
            subtitle="Gerencie os centros de custos do sistema"
          />
          {havePermission("centro_custos_create") && (
            <Button onClick={() => console.log("create")}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Centro de Custo
            </Button>
          )}
        </div>
        <div className="w-full flex-1">
          <CustomTable
            columns={columns}
            dropdowns={dropdowns}
            minWidth="sm"
            data={mockData}
            actionsReference="secureId"
          />
        </div>
        {data.meta.currentPage <= data.meta.totalPages && (
          <CustomPagination
            currentPage={data.meta.currentPage}
            totalPages={data.meta.totalPages}
            meta={data.meta}
          />
        )}
      </div>
    );
  }
}
