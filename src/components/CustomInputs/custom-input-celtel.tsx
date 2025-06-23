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

interface CustomInputCelTelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hint?: string;
  loading?: boolean;
  containerClassName?: string;
  mask: "cel" | "tel" | "celTel";
}

export function CustomInputCelTel({
  name,
  label,
  hint,
  loading = false,
  containerClassName,
  className,
  mask,
  ...props
}: CustomInputCelTelProps) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "CustomInputCelTel deve ser usado dentro de um FormProvider"
    );
  }

  const insertMaskInCelTel = (celTel: string) => {
    const noMask = celTel.replace(/\D/g, ""); // Remove tudo que não for número

    if (mask === "cel") {
      // Para celular: (##) # ####-####
      return noMask
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/^(\(\d{2}\)\s)(\d{1})(\d)/, "$1$2 $3")
        .replace(/^(\(\d{2}\)\s\d{1}\s)(\d{4})(\d{1})/, "$1$2-$3");
    } else if (mask === "tel") {
      // Para telefone: (##) ####-####
      return noMask
        .replace(/^(\d{2})(\d{4})(\d{1})/, "($1) $2-$3")
        .replace(/^(\(\d{2}\)\s\d{4})(\d{1})/, "$1-$2");
    } else if (mask === "celTel") {
      // Para celular e telefone com até 10 dígitos: (##) ####-####
      // Para mais de 10 dígitos: (##) # ####-####
      if (noMask.length <= 10) {
        return noMask
          .replace(/^(\d{2})(\d{4})(\d{1})/, "($1) $2-$3")
          .replace(/^(\(\d{2}\)\s\d{4})(\d{1})/, "$1-$2");
      } else {
        return noMask
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/^(\(\d{2}\)\s)(\d{1})(\d{4})(\d{1})/, "$1$2 $3-$4")
          .replace(/^(\(\d{2}\)\s\d{1}\s\d{4})(\d{1})/, "$1-$2");
      }
    }

    return celTel; // Retorna o valor sem máscara se não for nenhum dos casos
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
              <Input
                maxLength={mask === "celTel" || mask === "cel" ? 16 : 14}
                {...field}
                {...props}
                className={cn(
                  "transition-colors",
                  fieldState.error &&
                    "border-destructive focus-visible:ring-destructive",
                  className
                )}
                onChange={(e) => {
                  const maskedValue = insertMaskInCelTel(e.target.value); // Aplica a máscara
                  field.onChange(maskedValue); // Atualiza o estado do formulário
                }}
                disabled={props.disabled || loading}
              />
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
