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
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import { fetchCep } from "@/services/consulta";
import { ISearchCep } from "@/interfaces/search";

interface CustomInputCepProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hint?: string;
  loading?: boolean;
  containerClassName?: string;
  onSetCep?: (cep: ISearchCep) => void;
}

export function CustomInputCep({
  name,
  label,
  hint,
  loading = false,
  containerClassName,
  className,
  onSetCep,
  ...props
}: CustomInputCepProps) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("CustomInputCep deve ser usado dentro de um FormProvider");
  }

  const insertMaskInCep = (cep: string) => {
    const onlyNumbers = cep.replace(/\D/g, ""); // Remove tudo que não for número
    return onlyNumbers
      .replace(/^(\d{5})(\d{1})/, "$1-$2")
      .replace(/^(\d{2})(\d{3})(\d{1})/, "$1.$2-$3");
  };

  const findCep = async (cep: string) => {
    if (!cep || cep.length < 9) {
      toast.warning("CEP inválido!");
      return;
    }

    try {
      const response = await fetchCep(cep);

      if (!response) {
        toast.warning("CEP não encontrado!");
        return;
      }
      if (onSetCep) {
        onSetCep(response);
      }
    } catch (error) {
      toast.warning("Erro ao buscar CEP!");
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
                  maxLength={9}
                  {...field}
                  {...props}
                  className={cn(
                    "transition-colors", 
                    fieldState.error &&
                      "border-destructive focus-visible:ring-destructive",
                    className
                  )}
                  onChange={(e) => {
                    const maskedValue = insertMaskInCep(e.target.value);
                    field.onChange(maskedValue);
                  }}
                  disabled={props.disabled || loading}
                />

                {!props.disabled && (
                  <div className="absolute right-0 bottom-0">
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className={cn(
                        "h-8 bg-transparent border border-input rounded-l-none cursor-pointer transition-colors",
                        fieldState.error &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      onClick={() => findCep(field.value)}
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
