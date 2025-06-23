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
  useCreatePlanoConta,
  usePlanoConta,
  useUpdatePlanoConta,
} from "@/hooks/tanstack/usePlanoConta";
import { CustomSwitch } from "@/components/CustomInputs/custom-switch";
import { CustomInputNumeric } from "@/components/CustomInputs/custom-input-numeric";
import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";

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
  const { data, isLoading, isError } = usePlanoConta(id!, isUpdate);
  const createPlanoConta = useCreatePlanoConta();
  const updatePlanoConta = useUpdatePlanoConta();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      natureza: "",
      participaAnaliseResultado: false,
      conta: "",
      ativo: true,
    },
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const onSubmitForm = async (values: FormSchema) => {
    setLoading(true);
    try {
      const res = isUpdate
        ? await updatePlanoConta.mutateAsync({ id: id!, data: values })
        : await createPlanoConta.mutateAsync(values);
      if (res && res.error === "") {
        toast.success(
          res.message ||
            `Sucesso ao ${isUpdate ? "alterar" : "cadastrar"} plano de conta`
        );
        onClose();
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(
        message ||
          `Erro ao ${isUpdate ? "alterar" : "cadastrar"} plano de conta`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="grid gap-4 py-4">
        <CustomInput
          label="Descrição"
          name="descricao"
          className="h-8"
          loading={isLoading}
          disabled={isDetails}
        />
        <CustomInputNumeric
          label="Conta"
          name="conta"
          className="h-8"
          loading={isLoading}
          disabled={isDetails}
          format={"#.##.##.####"}
        />
        <CustomCombobox
          label="Natureza"
          name="natureza"
          loading={isLoading}
          disabled={isDetails}
          data={[
            {
              id: "C",
              descrição: "C - Crédito",
            },
            {
              id: "D",
              descrição: "D - Débito",
            },
          ]}
          fieldLabel="descrição"
          fieldValue="id"
        />
        <div className="flex justify-between gap-2">
          <CustomSwitch
            label={"Part. Análise de Resultados?"}
            name="participaAnaliseResultado"
            loading={isLoading}
            disabled={isDetails}
          />
          <CustomSwitch
            label={"Está Ativo?"}
            name="ativo"
            className="mx-auto"
            loading={isLoading}
            disabled={isDetails}
          />
        </div>
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
