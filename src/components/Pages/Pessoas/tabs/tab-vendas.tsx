import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { FormLabel } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";

interface TabVendasProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabVendas({ isDetails, isLoading }: TabVendasProps) {
  return (
    <TabsContent value="vendas">
      <div className="relative p-4 pt-8 bg-background-overlay rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">
            Dados de Venda
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomCombobox
            name="vendedor"
            label="Vendedor Reponsável"
            loading={isLoading}
            disabled={isDetails}
            data={[]}
            fieldLabel={"id"}
            fieldValue={"nome"}
          />
        </div>
      </div>
    </TabsContent>
  );
}
