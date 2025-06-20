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
  useDeletePessoaTipoContato,
  usePessoaTipoContatos,
} from "@/hooks/tanstack/usePessoaTipoContato";
import { IPessoaTipoContato } from "@/interfaces/pessoa-tipo-contato";

export function PessoaTipoContatoPage() {
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

  const deletePessoaTipoContato = useDeletePessoaTipoContato();
  const {
    data,
    isLoading,
    isError,
    error: e,
    refetch,
  } = usePessoaTipoContatos({
    order,
    type,
    page,
    search,
  });

  const deleteItem = async (password: string) => {
    try {
      if (!id) return;
      const res = await deletePessoaTipoContato.mutateAsync({ id, password });
      if (res && res.error === "") {
        setShowDialog(false);
        toast.success(
          res.message || "Exclusão de tipo contato realizada com êxito"
        );
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(message || "Erro ao excluír tipo contato");
    }
  };

  const addItem = () => {
    if (!hasPermission("pessoa_tipo_contatos_create")) {
      toast.warning(
        messageToastHelper.accessDenied("o cadastro de tipo contato")
      );
      return;
    }
    setShowModal(true);
  };

  const actions: TableActions<IPessoaTipoContato> = {
    onUpdate: (id) => {
      if (!hasPermission("pessoa_tipo_contatos_update")) {
        toast.warning(
          messageToastHelper.accessDenied("a alteração de tipo contato")
        );
        return;
      }
      setShowModal(true);
      setId(id);
    },
    onDelete: (id) => {
      if (!hasPermission("pessoa_tipo_contatos_delete")) {
        toast.warning(
          messageToastHelper.accessDenied("a exclusão de tipo contato")
        );
        return;
      }
      setShowDialog(true);
      setId(id);
    },
    onDetails: (id) => {
      if (!hasPermission("pessoa_tipo_contatos_findOne")) {
        toast.warning(
          messageToastHelper.accessDenied("o detalhes de tipo contato")
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
        <CustomHeader title="Tipo de Contatos" />
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
            <span className="hidden md:inline">Novo Tipo de Contato</span>
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
        title={isCreate ? "Novo tipo de contato" : "Atualizar tipo de contato"}
        description={
          isCreate
            ? "Preencha os dados do tipo de contato e clique em salvar."
            : "Atualize os dados do tipo de contato e clique em salvar."
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
