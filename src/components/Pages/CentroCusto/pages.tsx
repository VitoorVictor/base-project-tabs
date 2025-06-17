"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ICentroCusto } from "@/interfaces/centro-custo";
import { IResponse } from "@/interfaces/comum";
import CustomTable from "@/components/CustomTable";
import { columns, dropdowns } from "./columns";
import { Header } from "../Header";
import SearchBar from "@/components/SearchBar";
import { CustomPagesPagination } from "@/components/CustomPagination/custom-pages-pagination";
import { serviceCentroCusto } from "@/services/centro-custo";
import { CustomIndexPagination } from "@/components/CustomPagination/custom-index-pagination";

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
  const [type, setType] = useState<"asc" | "desc">("asc");
  const [order, setOrder] = useState("descricao");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IResponse<ICentroCusto> | null>(null);

  const fetch = useCallback(async () => {
    try {
      const data = await serviceCentroCusto.getAll({
        page: 1,
        order,
        type,
      });
      setData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [type, order]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Simulação de permissões - substitua pela sua lógica
  const havePermission = (permissionName: string): boolean => {
    return true; // Simular que tem todas as permissões
  };

  return (
    <div className="space-y-4 bg-background p-4">
      <Header
        title="Centros de Custos"
        // subtitle="Gerencie os centros de custos do sistema"
      />
      <div className="flex items-center justify-between">
        <div className="max-w-[400px] w-full">
          <SearchBar placeholder="Buscar centro de custos..." nameSearch={""} />
        </div>
        {havePermission("centro_custos_create") && (
          <>
            <Button
              onClick={() => console.log("create")}
              className="md:flex hidden"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Centro de Custo
            </Button>
            <Button onClick={() => console.log("create")} className="md:hidden">
              <Plus className="mr-2 h-4 w-4" />
              Novo
            </Button>
          </>
        )}
      </div>
      <div className="flex-1">
        {isLoading && !data && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {data && (
          <CustomTable
            columns={columns}
            dropdowns={dropdowns}
            minWidth="lg"
            data={mockData}
            actionsReference="secureId"
            order={order}
            type={type}
            onOrderChange={(column: string) => {
              if (order === order) {
                setType(type === "asc" ? "desc" : "asc");
              } else {
                setOrder(column);
                setType("asc");
              }
            }}
          />
        )}
      </div>
      {data && <CustomIndexPagination metaData={data.meta} />}
      {data && <CustomPagesPagination metaData={data.meta} />}
    </div>
  );
}
