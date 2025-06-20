"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomTable, { TableActions } from "@/components/CustomTable";
import { columns, dropdowns } from "./columns";
import { CustomHeader } from "../../CustomHeader";
import SearchBar from "@/components/SearchBar";
import { CustomPagesPagination } from "@/components/CustomPagination/custom-pages-pagination";
import { CustomIndexPagination } from "@/components/CustomPagination/custom-index-pagination";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { FormContent } from "./form-content";
import { DeleteDialog } from "@/components/DeleteDialog";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "react-toastify";
import { useTabStore } from "@/store/tabStore";
import { useFilterStore } from "@/store/filterStore";
import { usePermissionStore } from "@/store/permissionStore";
import { CustomError } from "@/components/CustomError";
import { messageToastHelper } from "@/helpers/messageToastHelper";
import {
  useDeleteEstadoCivil,
  useEstadoCivils,
} from "@/hooks/tanstack/useEstadoCivil";
import { IEstadoCivil } from "@/interfaces/estado-civil";

export function EstadoCivilPage() {
  const { activeKey } = useTabStore();
  const { hasPermission } = usePermissionStore();
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

  const deleteEstadoCivil = useDeleteEstadoCivil();
  const {
    data,
    isLoading,
    isError,
    error: e,
    refetch,
  } = useEstadoCivils({
    order,
    type,
    page,
    search,
  });

  const deleteItem = async (password: string) => {
    try {
      if (!id) return;
      const res = await deleteEstadoCivil.mutateAsync({ id, password });
      if (res && res.error === "") {
        setShowDialog(false);
        toast.success(
          res.message || "Exclusão de estado civil realizada com êxito"
        );
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(message || "Erro ao excluír estado civil");
    }
  };

  const addItem = () => {
    if (!hasPermission("estado_civis_create")) {
      toast.warning(
        messageToastHelper.accessDenied("o cadastro de estado civil")
      );
      return;
    }
    setShowModal(true);
  };

  const actions: TableActions<IEstadoCivil> = {
    onUpdate: (id) => {
      if (!hasPermission("estado_civis_update")) {
        toast.warning(
          messageToastHelper.accessDenied("a alteração de estado civil")
        );
        return;
      }
      setShowModal(true);
      setId(id);
    },
    onDelete: (id) => {
      if (!hasPermission("estado_civis_delete")) {
        toast.warning(
          messageToastHelper.accessDenied("a exclusão de estado civil")
        );
        return;
      }
      setShowDialog(true);
      setId(id);
    },
    onDetails: (id) => {
      if (!hasPermission("estado_civis_findOne")) {
        toast.warning(
          messageToastHelper.accessDenied("o detalhes de estado civil")
        );
        return;
      }
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

  const searchingItem = (search: string) => {
    setSearch(search);
    setPage(1);
    setFilters(activeKey, { search, page: 1 });
  };

  if (isError) {
    const { message, statusCode, error } = handleApiError(e);
    return (
      <CustomError
        error={{
          message,
          statusCode,
          error,
        }}
        onRefresh={refetch}
      />
    );
  }

  return (
    <>
      <div className="space-y-2 bg-background p-4 h-full flex flex-col">
        <CustomHeader title="Estado Civis" />
        <div className="flex items-center justify-between">
          <div className="max-w-[400px] w-full">
            <SearchBar
              placeholder="Buscar por descrição..."
              search={search}
              onSubmit={searchingItem}
            />
          </div>
          <Button onClick={addItem} className="h-8 flex items-center">
            <Plus className="h-4 w-4 mr-0 md:ml-2" />
            <span className="hidden md:inline">Novo Estado Civil</span>
          </Button>
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
        {data && (
          <CustomPagesPagination metaData={data.meta} setPage={setPage} />
        )}
      </div>
      <ResponsiveModal
        title={isCreate ? "Novo estado civil" : "Atualizar estado civil"}
        description={
          isCreate
            ? "Preencha os dados do estado civil e clique em salvar."
            : "Atualize os dados do estado civil e clique em salvar."
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
