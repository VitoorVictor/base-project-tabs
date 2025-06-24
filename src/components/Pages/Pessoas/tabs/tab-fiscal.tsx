import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { CustomInput } from "@/components/CustomInputs/custom-input";
import { CustomInputCurrency } from "@/components/CustomInputs/custom-input-currency";
import { CustomSwitch } from "@/components/CustomInputs/custom-switch";
import { CustomSelect } from "@/components/CustomSelects/custom-select";
import { FormLabel } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

interface TabFiscalProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabFiscal({ isDetails, isLoading }: TabFiscalProps) {
  return (
    <TabsContent value="fiscal" className="p-6 space-y-6 m-0">
      <div className="relative p-4 pt-8 bg-background rounded-lg border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold bg-background text-base text-primary px-1">
            <FileText className="h-4 w-4" />
            Informações Fiscais
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Inscrição Municipal"
            name="inscricaoMunicipal"
            loading={isLoading}
            disabled={isDetails}
            className="h-8 bg-white"
            containerClassName="flex-1"
          />
          <CustomInput
            label="Inscricação Suframa"
            name="inscricaoSuframa"
            loading={isLoading}
            disabled={isDetails}
            className="h-8 bg-white"
            containerClassName="flex-1"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomSelect
            name="tipoContribuinte"
            label="Tipo de Contribuinte"
            placeholder="Selecione o tipo"
            options={[
              {
                value: 0,
                label: "Contribuinte ICMS",
              },
              {
                value: 1,
                label: "Contribuinte Isento Insc. Cadastro ICMS",
              },
              {
                value: 2,
                label: "Não Contribuinte (ou Exterior)",
              },
            ]}
            loading={isLoading}
            disabled={isDetails}
            className="max-h-8 h-8 m-0 bg-white w-full"
            containerClassName="flex-1"
          />
          <CustomInput
            label="Documento Estrangeiro"
            name="documentoEstrangeiro"
            loading={isLoading}
            disabled={isDetails}
            className="h-8 bg-white"
            containerClassName="flex-1"
          />
          <CustomInputCurrency
            label="Limite de Crédito"
            name="limiteCredito"
            loading={isLoading}
            disabled={isDetails}
            className="h-8 bg-white"
            containerClassName="flex-1"
          />
        </div>
        <div className="px-1 flex items-center justify-between gap-2">
          <CustomSwitch
            label="Cliente Final"
            name="clienteFinal"
            //   caption={true}
            loading={isLoading}
            disabled={isDetails}
          />
          <CustomSwitch
            label="Optante Simples"
            name="optanteSimples"
            //   caption={true}
            loading={isLoading}
            disabled={isDetails}
          />
          <CustomSwitch
            label="Produtor Rural"
            name="produtorRural"
            //   caption={true}
            loading={isLoading}
            disabled={isDetails}
          />
          <CustomSwitch
            label="ISS retido"
            name="issRetido"
            //   caption={true}
            loading={isLoading}
            disabled={isDetails}
          />
        </div>
      </div>
    </TabsContent>
  );
}
