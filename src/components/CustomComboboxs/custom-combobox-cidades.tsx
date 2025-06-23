"use client";

import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";

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
import { useDebounce } from "@/hooks/useDebounce";
import { ICidade } from "@/interfaces/cidade";
import { useCidades } from "@/hooks/tanstack/useCidade";

interface CustomComboboxCidadesProps {
  name: string;
  label: string;
  placeholder?: string;
  empty?: string;
  hint?: string;
  containerClassName?: string;
  loading?: boolean;
  disabled?: boolean;
  searchPlaceholder?: string;
}

export function CustomComboboxCidades({
  name,
  label,
  placeholder = "Selecione uma opção",
  empty = "Nenhum item encontrado",
  hint,
  loading = false,
  containerClassName,
  disabled = false,
  searchPlaceholder = "Digite para procurar...",
}: CustomComboboxCidadesProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  const { control } = useFormContext();

  if (!control) {
    throw new Error(
      "CustomComboboxCidades deve ser usado dentro de um FormProvider"
    );
  }

  const { data, isLoading } = useCidades(
    { search: debouncedValue },
    {
      enabled: debouncedValue.length > 2,
      queryKey: ["cidades", debouncedValue],
    }
  );

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
                          {field.value ? field.value?.descricao : placeholder}
                        </span>
                        {!field.value && (
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        )}
                      </Button>

                      {field.value && !disabled && (
                        <Button
                          className={cn(
                            "h-8 shadow-sm border border-l-0 rounded-tl-none rounded-bl-none hover:bg-destructive hover:text-white cursor-pointer",
                            field.value && !disabled ? "border-input" : "",
                            fieldState.error
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          )}
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
                          value={value}
                          onValueChange={setValue}
                        />
                        <CommandList className="custom-scrollbar">
                          <CommandEmpty>
                            {isLoading ? (
                              <span className="flex items-center justify-center gap-2 text-slate-500">
                                <Loader2 className="animate-spin h-4 w-4" />
                                Buscando...
                              </span>
                            ) : debouncedValue.length <= 2 ? (
                              "Digite pelo menos 3 caracteres para buscar"
                            ) : (
                              empty
                            )}
                          </CommandEmpty>
                          <CommandGroup>
                            {data &&
                              data.items.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.cidadeEstado}
                                  onSelect={() => {
                                    field.onChange(
                                      field.value?.id === item.id
                                        ? null
                                        : {
                                            id: item.id,
                                            descricao: item.cidadeEstado,
                                          }
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  {item.cidadeEstado}
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.id === item.id
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
