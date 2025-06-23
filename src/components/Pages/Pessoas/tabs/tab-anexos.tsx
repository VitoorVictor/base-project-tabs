import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { FormLabel } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";

interface TabAnexosProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabAnexos({ isDetails, isLoading }: TabAnexosProps) {
  return (
    <TabsContent value="anexos">
      <div className="flex flex-col gap-1 bg-background-alt p-4 border rounded mb-5">
        <div className="flex gap-2 items-center">
          <FormLabel className="font-semibold text-base">Anexos</FormLabel>
        </div>

        {/* <CustomTableAnexos
          data={data.anexos ?? []}
          permissions={nvp}
          onClickDelete={(anexoId: string) => {
            currentParams.set("anexoId", anexoId);
            currentParams.set("showAnexoDel", "true");
            router.push(`?${currentParams.toString()}`);
          }}
          isDetails={isDetails}
        /> */}
      </div>
    </TabsContent>
  );
}
