import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { CustomInput } from "@/components/CustomInputs/custom-input";
import { CustomSwitch } from "@/components/CustomInputs/custom-switch";
import { FormLabel } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";

interface TabFiscalProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabFiscal({ isDetails, isLoading }: TabFiscalProps) {
  return (
    <TabsContent value="fiscal">
      <div className="relative p-4 pt-8 bg-background-overlay rounded-lg border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">
            Informações Fiscais
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CustomInput
              label="Inscrição Municipal"
              name="inscricaoMunicipal"
              loading={isLoading}
              disabled={isDetails}
              className="h-8 bg-white"
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Inscricação Suframa"
              name="inscricaoSuframa"
              loading={isLoading}
              disabled={isDetails}
              className="h-8 bg-white"
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-between gap-2">
          <CustomCombobox
            data={[
              {
                id: 0,
                descricao: "Contribuinte ICMS",
              },
              {
                id: 1,
                descricao: "Contribuinte Isento Insc. Cadastro ICMS",
              },
              {
                id: 2,
                descricao: "Não Contribuinte (ou Exterior)",
              },
            ]}
            fieldLabel="descricao"
            fieldValue="id"
            //   description="Busque pelo tipo..."
            placeholder="Selecione o tipo"
            empty="Nenhum tipo localizado"
            name={"tipoContribuinte"}
            label="Tipo de Contribuinte"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
          />
        </div> */}
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Documento Estrangeiro"
            name="documentoEstrangeiro"
            type="text"
            loading={isLoading}
            disabled={isDetails}
            className="h-8 bg-white flex-1"
          />
          {/* <CustomInputCurrency
            label="Limite de Crédito"
            name="limiteCredito"
            isLoading={isLoading}
            disabled={isDetails}
          /> */}
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
