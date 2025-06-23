"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";

interface CustomComboboxProps {
  name: string;
  label: string;
  data: any[];
  fieldLabel: string;
  fieldValue: string;
  placeholder?: string;
  empty?: string;
  hint?: string;
  loading?: boolean;
  containerClassName?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
}

export function CustomCombobox({
  name,
  label,
  data,
  fieldLabel,
  fieldValue,
  placeholder = "Selecione uma opção",
  empty = "Nenhum item encontrado",
  hint,
  loading = false,
  containerClassName,
  disabled = false,
  searchPlaceholder = "Digite para procurar...",
}: CustomComboboxProps) {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();

  if (!control) {
    throw new Error("CustomCombobox deve ser usado dentro de um FormProvider");
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={cn("space-y-2", containerClassName)}>
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </FormLabel>
            )}
            <FormControl>
              {loading ? (
                <Skeleton className="h-8 w-full rounded-md" />
              ) : (
                <Popover
                  open={open}
                  onOpenChange={(isOpen) => !disabled && setOpen(isOpen)}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <div className="flex items-center rounded-md">
                      <Button
                        variant="outline"
                        role="combobox"
                        type="button"
                        aria-expanded={open}
                        disabled={disabled}
                        className={cn(
                          "flex-1 justify-between h-8 bg-background transition-colors",
                          fieldState.error &&
                            "border-destructive focus-visible:ring-destructive",
                          field.value && !disabled
                            ? "border-r-0 rounded-tr-none rounded-br-none"
                            : "",
                          disabled && "cursor-not-allowed opacity-50"
                        )}
                      >
                        {/* Exibir fieldLabel, mas armazenar fieldValue */}
                        <span className="flex-1 truncate text-left">
                          {field.value
                            ? field.value?.[fieldLabel]
                            : placeholder}
                        </span>
                        {!field.value && (
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        )}
                      </Button>

                      {field.value && !disabled && (
                        <Button
                          className="h-8 border border-input border-l-0 shadow-sm rounded-tl-none rounded-bl-none hover:bg-destructive hover:text-white cursor-pointer"
                          variant="outline"
                          type="button"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </PopoverTrigger>
                  {!disabled && (
                    <PopoverContent
                      className="w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput
                          placeholder={searchPlaceholder}
                          className="h-8"
                        />
                        <CommandList className="custom-scrollbar">
                          <CommandEmpty>{empty}</CommandEmpty>
                          <CommandGroup>
                            {data.map((item) => (
                              <CommandItem
                                key={item[fieldValue]}
                                value={item[fieldValue]}
                                onSelect={() => {
                                  field.onChange(
                                    field.value?.[fieldValue] ===
                                      item[fieldValue]
                                      ? null
                                      : {
                                          [fieldValue]: item[fieldValue],
                                          [fieldLabel]: item[fieldLabel],
                                        }
                                  );
                                  setOpen(false);
                                }}
                              >
                                {item[fieldLabel]}
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.[fieldValue] ===
                                      item[fieldValue]
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  )}
                </Popover>
              )}
            </FormControl>
            {hint && !fieldState.error && (
              <FormDescription className="text-sm text-muted-foreground">
                {hint}
              </FormDescription>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
