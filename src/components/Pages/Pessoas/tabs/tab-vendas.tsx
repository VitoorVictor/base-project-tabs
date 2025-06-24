import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { FormLabel } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { useUsuarios } from "@/hooks/tanstack/useUsuario";
import {  ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface TabVendasProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabVendas({ isDetails, isLoading }: TabVendasProps) {
  const { data: usuario, isLoading: isLoadingUsuario } = useUsuarios({});

  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (usuario && !getValues("vendedor")) {
      setValue("vendedor", {
        id: usuario.items[0].id,
        nome: usuario.items[0].nome,
      });
    }
  }, [usuario]);

  return (
    <TabsContent value="vendas" className="p-6 space-y-6 m-0">
      <div className="relative p-4 pt-8 bg-background rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold bg-background text-base text-primary px-1">
            <ShoppingCart className="h-4 w-4" />
            Dados da Venda
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomCombobox
            name="vendedor"
            label="Vendedor Reponsável"
            loading={isLoading || isLoadingUsuario}
            disabled={isDetails}
            data={usuario?.items || []}
            fieldLabel="nome"
            fieldValue="id"
            containerClassName="w-full"
          />
        </div>
      </div>
    </TabsContent>
  );
}
