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
      cpfCnpj: "",
      rgIe: "",
      rgOrgaoEmissor: "",
      nacionalidade: "",
      tipoCliente: true,
      tipoFornecedor: false,
      tipoTransportador: false,
      dataNascimento: undefined,
      razaoSocial: "",
      nomeFantasia: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      complemento: "",
      email: "",
      emailAdicional: "",
      fone: "",
      celular: "",
      whatsapp: "",
      pai: "",
      mae: "",
      contato: [],
      enderecoAuxiliar: [],
      observacaoGeral: "",
      inscricaoMunicipal: "",
      inscricaoSuframa: "",
      documentoEstrangeiro: "",
      tipoContribuinte: 0,
      limiteCredito: 0,
      clienteFinal: false,
      optanteSimples: false,
      produtorRural: false,
      issRetido: false,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const normalizeValues = (values: FormSchema) => {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(values)) {
      // Ignora null ou undefined
      if (value === null || value === undefined) continue;

      // Se for objeto com apenas { id, descricao } ou similar
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        "id" in value &&
        Object.keys(value).every((k) =>
          ["id", "descricao", "nome", "razaoSocial", "cidadeEstado"].includes(k)
        )
      ) {
        result[`${key}Id`] = value.id;
      }

      // Arrays de objetos (ex: contato, enderecoAuxiliar)
      else if (Array.isArray(value)) {
        const arr = value
          .map((item) => {
            if (typeof item !== "object" || item === null) return null;

            const cleaned: Record<string, any> = {};
            for (const [k, v] of Object.entries(item)) {
              if (v === null || v === undefined) continue;

              // Se for subobjeto com id
              if (
                typeof v === "object" &&
                !Array.isArray(v) &&
                "id" in v &&
                Object.keys(v).every((kk) =>
                  ["id", "descricao", "nome", "cidadeEstado"].includes(kk)
                )
              ) {
                cleaned[`${k}Id`] = v.id;
              } else {
                cleaned[k] = v;
              }
            }

            return Object.keys(cleaned).length > 0 ? cleaned : null;
          })
          .filter(Boolean); // Remove nulos

        if (arr.length > 0) result[key] = arr;
      }

      // Se for valor simples
      else {
        result[key] = value;
      }
    }

    return result;
  };

  const onSubmitForm = async (values: FormSchema) => {
    setLoading(true);
    const normalizedValues = normalizeValues(values);
    try {
      console.log("normalizedValues:", normalizedValues);
      const res = isUpdate
        ? await updatePessoa.mutateAsync({ id: id!, data: normalizedValues })
        : await createPessoa.mutateAsync(normalizedValues);
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
