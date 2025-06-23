"use client";

import type * as React from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
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
import { useCallback } from "react";
import { FileText, Upload } from "lucide-react";

interface CustomInputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hint?: string;
  loading?: boolean;
  containerClassName?: string;
  multiples?: boolean;
  required?: boolean;
}

export function CustomInputFile({
  name,
  label,
  hint,
  loading = false,
  containerClassName,
  className,
  multiple = false,
  required = false,
  ...props
}: CustomInputFileProps) {
  const { control, setValue, clearErrors } = useFormContext();

  if (!control) {
    throw new Error("CustomInputFile deve ser usado dentro de um FormProvider");
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, acceptedFiles); // Define no Hook Form
      clearErrors(name); // Remove erro se existir
    },
    [setValue, clearErrors]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB) * 1024 * 1024,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-2", containerClassName)}>
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </FormLabel>

          <FormControl>
            {loading ? (
              <Skeleton className="h-10 w-full rounded-md" />
            ) : (
              <div className=" bg-background w-full border-2 border-dashed rounded-lg  flex flex-col items-center">
                <div
                  {...getRootProps()}
                  className={cn(
                    "p-4 w-full flex flex-col items-center justify-center cursor-pointer transition",
                    isDragActive
                      ? "border-primary bg-blue-50"
                      : "border-gray-300"
                  )}
                >
                  <input
                    {...getInputProps()}
                    {...props}
                    className="bg-background"
                  />
                  <Upload className="w-8 h-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">
                    {isDragActive
                      ? "Solte os arquivos aqui..."
                      : "Arraste e solte arquivos ou clique para selecionar"}
                  </p>
                  <p className="text-xs mx-3 pt-1 text-gray-500 border-t border-input">
                    {`Os formatos de arquivo aceitos são JPG, JPEG, PNG, GIF, DOC, TXT, SQL, XLS, XLSX, ZIP, RAR, TXT e PDF. Tamanho máximo de ${process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB}MB`}
                  </p>
                </div>

                {/* Pré-visualização */}
                {Array.isArray(field.value) && field.value.length > 0 && (
                  <div className="w-full p-4 pt-0">
                    <h3 className="text-sm text-center font-semibold text-gray-500 ">
                      {field.value.length > 1
                        ? "Arquivos Selecionados"
                        : "Arquivo Selecionado"}
                    </h3>
                    <ul>
                      {field.value.map((file: any, index: number) => {
                        // const fileURL = URL.createObjectURL(file);
                        return (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            {/* <a
                                    href={fileURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline"
                                  > */}
                            <FileText className="w-4 h-4 inline" />{" "}
                            {file.name ?? file.path}
                            {/* </a> */}
                          </li>
                        );
                      })}
                    </ul>
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
