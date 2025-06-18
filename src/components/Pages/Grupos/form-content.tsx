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
  useCreateGrupo,
  useGrupo,
  useUpdateGrupo,
} from "@/hooks/tanstack/useGrupo";

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
  const { data, isLoading, isError } = useGrupo(id!, isUpdate);
  const createGrupo = useCreateGrupo();
  const updateGrupo = useUpdateGrupo();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
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
        ? await updateGrupo.mutateAsync({ id: id!, data: values })
        : await createGrupo.mutateAsync(values);
      if (res && res.error === "") {
        toast.success(
          res.message ||
            `Sucesso ao ${isUpdate ? "alterar" : "cadastrar"} grupo`
        );
        onClose();
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast.error(
        message || `Erro ao ${isUpdate ? "alterar" : "cadastrar"} grupo`
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
