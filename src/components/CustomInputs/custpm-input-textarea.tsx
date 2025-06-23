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
import { Textarea } from "../ui/textarea";

interface CustomInputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  hint?: string;
  loading?: boolean;
  containerClassName?: string;
}

export function CustomInputTextarea({
  name,
  label,
  hint,
  loading = false,
  containerClassName,
  className,
  ...props
}: CustomInputTextareaProps) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "CustomInputTextarea deve ser usado dentro de um FormProvider"
    );
  }

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
              <Textarea
                {...field}
                {...props}
                className={cn(
                  "transition-colors",
                  fieldState.error &&
                    "border-destructive focus-visible:ring-destructive",
                  className
                )}
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
