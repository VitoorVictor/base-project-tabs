"use client";

import type * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import { fetchCnpj } from "@/services/consulta";
import { ISearchCnpj } from "@/interfaces/search";

interface CustomInputCpfCnpjProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hint?: string;
  loading?: boolean;
  containerClassName?: string;
  onSetEndereco?: (endereco: ISearchCnpj) => void;
}

export function CustomInputCpfCnpj({
  name,
  label,
  hint,
  loading = false,
  containerClassName,
  className,
  onSetEndereco,
  ...props
}: CustomInputCpfCnpjProps) {
  const { control } = useFormContext();
  const [lengthMask, setLengthMask] = useState(0);

  if (!control) {
    throw new Error(
      "CustomInputCpfCnpj deve ser usado dentro de um FormProvider"
    );
  }
  const insertMaskInCpfCnpj = (cpfCnpj: string) => {
    const noMask = cpfCnpj.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
    const { length } = noMask;
    setLengthMask(length);

    if (length <= 11) {
      // Aplica a máscara para CPF
      return noMask
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3}\.\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2");
    } else {
      // Aplica a máscara para CNPJ
      return noMask
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, "$1/$2")
        .replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, "$1-$2");
    }
  };

  const getEmpresaByCNPJ = async (cnpj: string) => {
    const CNPJ = cnpj.replace(/\D/g, "");
    if (!CNPJ || CNPJ.length < 14) {
      toast.warning("CNPJ inválido!");
      return;
    }
    try {
      const response = await fetchCnpj(CNPJ);

      if (onSetEndereco) onSetEndereco(response);

      if (!response.razaoSocial) {
        toast.warning("Empresa não encontrada!");
        return;
      }
    } catch (e) {
      const { message } = handleApiError(e);
      toast(message || "Houver um erro ao buscar CNPJ!");
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-2", containerClassName)}>
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </FormLabel>

          <FormControl className="h-8">
            {loading ? (
              <Skeleton className="h-10 w-full rounded-md" />
            ) : (
              <div className="relative">
                <Input
                  {...field}
                  {...props}
                  maxLength={18}
                  className={cn(
                    "transition-colors",
                    fieldState.error &&
                      "border-destructive focus-visible:ring-destructive",
                    className
                  )}
                  disabled={props.disabled || loading}
                  onChange={(e) => {
                    const maskedValue = insertMaskInCpfCnpj(e.target.value); // Aplica a máscara
                    field.onChange(maskedValue); // Atualiza o estado do formulário
                  }}
                />
                {!props.disabled && lengthMask > 11 && (
                  <div className="absolute right-0 bottom-0">
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="h-8 bg-background"
                      onClick={() => getEmpresaByCNPJ(field.value)}
                    >
                      <Search />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </FormControl>

          {hint && !fieldState.error && (
            <FormDescription className="text-sm text-muted-foreground">
              {hint}
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
