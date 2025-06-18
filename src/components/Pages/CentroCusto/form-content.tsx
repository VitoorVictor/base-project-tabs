"use client";

import { CustomInput } from "@/components/CustomInputs/custom-input";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "./schema";
import { CustomSwitch } from "@/components/CustomInputs/custom-switch";
import { FooterModal } from "@/components/FooterModal";
import {
  useCentroCusto,
  useCreateCentroCusto,
  useUpdateCentroCusto,
} from "@/hooks/tanstack/useCentroCusto";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import { Button } from "@/components/ui/button";

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
  const { data, isLoading, isError } = useCentroCusto(id!, isUpdate);
  const createCentroCusto = useCreateCentroCusto();
  const updateCentroCusto = useUpdateCentroCusto();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
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
        ? await updateCentroCusto.mutateAsync({ id: id!, data: values })
        : await createCentroCusto.mutateAsync(values);
      if (res && res.error === "") {
        toast.success(
          res.message ||
            `Sucesso ao ${isUpdate ? "alterar" : "cadastrar"} centro de custo`
        );
        onClose();
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(
        message ||
          `Erro ao ${isUpdate ? "alterar" : "cadastrar"} centro de custo`
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="grid gap-4 py-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomInput
              label="Descrição"
              name="descricao"
              className="h-8"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <CustomSwitch
            label={"Está Ativo?"}
            name="ativo"
            className="mx-auto mt-2"
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
