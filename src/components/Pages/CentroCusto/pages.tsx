"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ICentroCusto } from "@/interfaces/centro-custo";
import CustomTable, { TableActions } from "@/components/CustomTable";
import { columns, dropdowns } from "./columns";
import { Header } from "../Header";
import SearchBar from "@/components/SearchBar";
import { CustomPagesPagination } from "@/components/CustomPagination/custom-pages-pagination";
import { CustomIndexPagination } from "@/components/CustomPagination/custom-index-pagination";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { FormContent } from "./form-content";
import {
  useCentroCustos,
  useDeleteCentroCusto,
} from "@/hooks/tanstack/useCentroCusto";
import { DeleteDialog } from "@/components/DeleteDialog";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "react-toastify";
import { useTabStore } from "@/store/tabStore";
import { useFilterStore } from "@/store/filterStore";

export function CentroCustosContent() {
  const { activeKey } = useTabStore();
  const { filters, setFilters } = useFilterStore();

  const [order, setOrder] = useState(
    filters[activeKey] && filters[activeKey].order
      ? filters[activeKey].order
      : "descricao"
  );
  const [type, setType] = useState<"asc" | "desc">(
    filters[activeKey] && filters[activeKey].type
      ? filters[activeKey].type
      : "asc"
  );
  const [page, setPage] = useState(
    filters[activeKey] && filters[activeKey].page ? filters[activeKey].page : 1
  );
  const [search, setSearch] = useState(
    filters[activeKey] && filters[activeKey].search
      ? filters[activeKey].search
      : ""
  );

  const [id, setId] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isCreate = !id;
  const isUpdate = !!id;

  const deleteCentroCusto = useDeleteCentroCusto();
  const { data, isLoading, isError } = useCentroCustos({
    order,
    type,
    page,
    search,
  });

  // Simulação de permissões - substitua pela sua lógica
  const havePermission = (permissionName: string): boolean => {
    return true; // Simular que tem todas as permissões
  };

  const deleteItem = async (password: string) => {
    try {
      if (!id) return;
      const res = await deleteCentroCusto.mutateAsync({ id, password });
      if (res && res.error === "") {
        setShowDialog(false);
        toast.success(
          res.message || "Exclusão de centro de custo realizada com êxito"
        );
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(message || "Erro ao excluír centro de custo");
    }
  };

  const actions: TableActions<ICentroCusto> = {
    onUpdate: (id) => {
      setShowModal(true);
      setId(id);
    },
    onDelete: (id) => {
      setShowDialog(true);
      setId(id);
    },
    onDetails: (id) => {
      setShowDetails(true);
      setId(id);
    },
  };

  const changeOrder = (column: string) => {
    if (column === order) {
      const newType = type === "asc" ? "desc" : "asc";
      setType(newType);
      setFilters(activeKey, { type: newType });
    } else {
      setOrder(column);
      setType("asc");
      setFilters(activeKey, { order: column, type: "asc" });
    }
  };

  const searching = (search: string) => {
    setSearch(search);
    setPage(1);
    setFilters(activeKey, { search, page: 1 });
  };

  return (
    <>
      <div className="space-y-2 bg-background p-4 h-full flex flex-col">
        <Header title="Centros de Custos" />
        <div className="flex items-center justify-between">
          <div className="max-w-[400px] w-full">
            <SearchBar
              placeholder="Buscar por descrição..."
              search={search}
              onSubmit={searching}
            />
          </div>
          {havePermission("centro_custos_create") && (
            <>
              <Button
                onClick={() => setShowModal(true)}
                className="md:flex hidden h-8"
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Centro de Custo
              </Button>
              <Button
                onClick={() => setShowModal(true)}
                className="md:hidden ml-4 h-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <div className="h-full">
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
              data={data}
              actionsReference="secureId"
              order={order}
              type={type}
              onOrderChange={changeOrder}
              actions={actions}
            />
          )}
        </div>
        {data && <CustomIndexPagination metaData={data.meta} />}
        {data && <CustomPagesPagination metaData={data.meta} />}
      </div>
      <ResponsiveModal
        title={isCreate ? "Novo centro de custo" : "Atualizar centro de custo"}
        description={
          isCreate
            ? "Preencha os dados do tipo do endereço e clique em salvar."
            : "Atualize os dados do tipo do endereço e clique em salvar."
        }
        open={showModal || showDetails}
        onOpenChange={(open) => {
          setShowModal(open);
          setShowDetails(open);
        }}
      >
        <FormContent
          onClose={() => {
            setShowModal(false), setShowDetails(false), setId(null);
          }}
          isDetails={showDetails}
          id={id!}
        />
      </ResponsiveModal>
      <DeleteDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={deleteItem}
      />
    </>
  );
}
