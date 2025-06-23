"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaAnexo, FormSchemaAnexo } from "./schema";
import { CustomInput } from "@/components/CustomInputs/custom-input";
import { CustomInputTextarea } from "@/components/CustomInputs/custpm-input-textarea";
import { FooterModal } from "@/components/FooterModal";
import { CustomInputFile } from "@/components/CustomInputs/custom-input-file";

interface FormContentAnexoProps {
  id: number;
  onClose: () => void;
  onSubmit: (values: FormSchemaAnexo) => void;
}

export function FormContentAnexo({
  id,
  onClose,
  onSubmit,
}: FormContentAnexoProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaAnexo>({
    resolver: zodResolver(formSchemaAnexo),
    defaultValues: {
      vinculoId: id,
      titulo: "",
      observacao: "",
    },
  });

  const onSubmitForm = async (values: FormSchemaAnexo) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="grid gap-4">
        <CustomInput label="Título" name="titulo" />
        <CustomInputFile label="Arquivo" name="file" required />
        <CustomInputTextarea label="Observação" name={`observacao`} />

        <FooterModal onClose={onClose!} isLoading={loading} />
      </form>
    </FormProvider>
  );
}
