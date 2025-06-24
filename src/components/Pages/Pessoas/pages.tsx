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
import { useDeletePessoa, usePessoas } from "@/hooks/tanstack/usePessoa";
import { IPessoa } from "@/interfaces/pessoa";
import { FormContentAnexo } from "./form-content-anexo";
import { IAnexo } from "@/interfaces/anexo";
import { FormSchemaAnexo } from "./schema";
import { useCreateAnexo } from "@/hooks/tanstack/useAnexo";

export function PessoaPage() {
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
  const [showAttachment, setShowAttachment] = useState(false);

  const isCreate = !id;

  const createAnexo = useCreateAnexo();
  const deletePessoa = useDeletePessoa();
  const {
    data,
    isLoading,
    isError,
    error: e,
    refetch,
  } = usePessoas({
    order,
    type,
    page,
    search,
  });

  const createAttachment = async (values: FormSchemaAnexo) => {
    try {
      if (!id) return;
      const formData = new FormData();
      formData.append("titulo", values.titulo);
      if (values.observacao) {
        formData.append("observacao", values.observacao);
      }
      formData.append("vinculoId", String(values.vinculoId));
      formData.append("file", values.file[0]);
      const res = await createAnexo.mutateAsync({
        tipoAnexo: "pessoas",
        formData,
      });
      if (res) {
        toast.success(res.message || "Anexo criado com êxito");
        setShowAttachment(false);
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(message || "Erro ao criar anexo");
    }
  };
  const deleteItem = async (password: string) => {
    try {
      if (!id) return;
      const res = await deletePessoa.mutateAsync({ id, password });
      if (res && res.error === "") {
        setShowDialog(false);
        toast.success(res.message || "Exclusão de pessoa realizada com êxito");
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(message || "Erro ao excluír pessoa");
    }
  };

  const addItem = () => {
    if (!hasPermission("pessoas_create")) {
      toast.warning(messageToastHelper.accessDenied("o cadastro de pessoa"));
      return;
    }
    setShowModal(true);
  };

  const actions: TableActions<IPessoa> = {
    onUpdate: (id) => {
      if (!hasPermission("pessoas_update")) {
        toast.warning(messageToastHelper.accessDenied("a alteração de pessoa"));
        return;
      }
      setShowModal(true);
      setId(id);
    },
    onDelete: (id) => {
      if (!hasPermission("pessoas_delete")) {
        toast.warning(messageToastHelper.accessDenied("a exclusão de pessoa"));
        return;
      }
      setShowDialog(true);
      setId(id);
    },
    onDetails: (id) => {
      if (!hasPermission("pessoas_findOne")) {
        toast.warning(messageToastHelper.accessDenied("o detalhes de pessoa"));
        return;
      }
      setShowDetails(true);
      setId(id);
    },
    onAttachment: (_id, row) => {
      if (!hasPermission("pessoas_anexos_create")) {
        toast.warning(messageToastHelper.accessDenied("o anexos de pessoa"));
        return;
      }
      setShowAttachment(true);
      setId(String(row.id));
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
        <CustomHeader title="Pessoas" />
        <div className="flex items-center justify-between">
          <div className="max-w-[400px] w-full">
            <SearchBar
              placeholder="Buscar por código, razão social, fantasia e CPF/CNPJ..."
              search={search}
              onSubmit={searchingItem}
            />
          </div>
          <Button
            onClick={addItem}
            className="h-8 flex items-center cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-0 md:ml-2" />
            <span className="hidden md:inline">Nova Pessoa</span>
          </Button>
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
              data={data}
              actionsReference="secureId"
              order={order}
              type={type}
              onOrderChange={changeOrder}
              actions={actions}
              onRowClick={(row) =>
                actions.onUpdate && actions.onUpdate(row.secureId, row)
              }
            />
          )}
        </div>
        {data && <CustomIndexPagination metaData={data.meta} />}
        {data && (
          <CustomPagesPagination metaData={data.meta} setPage={setPage} />
        )}
      </div>
      <ResponsiveModal
        title={isCreate ? "Nova pessoa" : "Atualizar pessoa"}
        description={
          isCreate
            ? "Preencha os dados de pessoa e clique em salvar."
            : "Atualize os dados de pessoa e clique em salvar."
        }
        open={showModal || showDetails}
        onOpenChange={(open) => {
          setShowModal(open);
          setShowDetails(open);
        }}
        className="w-full sm:max-w-[716px] max-h-[95%] overflow-auto custom-scrollbar bg-background-overlay"
      >
        <FormContent
          onClose={() => {
            setShowModal(false), setShowDetails(false), setId(null);
          }}
          isDetails={showDetails}
          id={id!}
        />
      </ResponsiveModal>
      <ResponsiveModal
        title="Novo anexo"
        description="Preencha os dados do anexo e clique em salvar."
        open={showAttachment}
        onOpenChange={setShowAttachment}
        className="max-h-[95%] overflow-auto custom-scrollbar bg-background-alt"
      >
        <FormContentAnexo
          onClose={() => {
            setShowAttachment(false), setId(null);
          }}
          onSubmit={createAttachment}
          id={Number(id)}
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
