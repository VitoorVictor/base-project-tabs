"use client";

import { CustomInput } from "@/components/CustomInputs/custom-input";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "./schema";
import { FooterModal } from "@/components/FooterModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import { Button } from "@/components/ui/button";
import {
  useCreatePessoa,
  usePessoa,
  useUpdatePessoa,
} from "@/hooks/tanstack/usePessoa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabCadastro } from "./tabs/tab-cadastro";
import { TabFiscal } from "./tabs/tab-fiscal";
import { TabVendas } from "./tabs/tab-vendas";
import { TabAnexos } from "./tabs/tab-anexos";

interface FormContentProps {
  // onSubmit?: () => void;
  onClose: () => void;
  isDetails?: boolean;
  id?: string;
}

export function FormContent({
  onClose,
  isDetails = false,
  id,
}: FormContentProps) {
  const isUpdate = Boolean(id);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = usePessoa(id!, isUpdate);
  const createPessoa = useCreatePessoa();
  const updatePessoa = useUpdatePessoa();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataCadastro: new Date().toISOString().split("T")[0],
      cidade: {},
      cpfCnpj: "",
    },
  });

  const { handleSubmit, reset } = form;

  // useEffect(() => {
  //   if (data) {
  //     reset(data);
  //   }
  // }, [data]);

  const onSubmitForm = async (values: FormSchema) => {
    setLoading(true);
    try {
      const res = isUpdate
        ? await updatePessoa.mutateAsync({ id: id!, data: values })
        : await createPessoa.mutateAsync(values);
      if (res && res.error === "") {
        toast.success(
          res.message ||
            `Sucesso ao ${isUpdate ? "alterar" : "cadastrar"} pessoa`
        );
        onClose();
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(
        message || `Erro ao ${isUpdate ? "alterar" : "cadastrar"} pessoa`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="grid gap-4 py-4">
        <Tabs defaultValue="cadastro" className="max-w-[716px] overflow-hidden">
          <TabsList
            className={`grid w-full border mb-5 ${
              isUpdate ? "grid-cols-4" : "grid-cols-3"
            }`}
          >
            <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
            <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
            {isUpdate && <TabsTrigger value="anexos">Anexos</TabsTrigger>}
          </TabsList>
          <TabCadastro isDetails={isDetails} isLoading={isLoading} />
          <TabFiscal isDetails={isDetails} isLoading={isLoading} />
          <TabVendas isDetails={isDetails} isLoading={isLoading} />
          {isUpdate && (
            <TabAnexos isDetails={isDetails} isLoading={isLoading} />
          )}
        </Tabs>
        {isDetails ? (
          <div className="flex gap-2 justify-end mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Voltar
            </Button>
          </div>
        ) : (
          <FooterModal onClose={onClose!} isLoading={loading} />
        )}
      </form>
    </FormProvider>
  );
}
