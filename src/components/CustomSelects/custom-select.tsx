"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  name: string;
  label: string;
  options: Option[];
  hint?: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  containerClassName?: string;
  className?: string;
}

export function CustomSelect({
  name,
  label,
  options,
  hint,
  loading = false,
  disabled = false,
  placeholder = "Selecione uma opção",
  containerClassName,
  className,
}: CustomSelectProps) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("CustomSelect deve ser usado dentro de um FormProvider");
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-2", containerClassName)}>
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </FormLabel>

          <FormControl>
            {loading ? (
              <Skeleton className="h-8 w-full rounded-md" />
            ) : (
              <Select
                disabled={disabled}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  className={cn(
                    "h-8 transition-colors",
                    fieldState.error &&
                      "border-destructive focus-visible:ring-destructive",
                    className
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
