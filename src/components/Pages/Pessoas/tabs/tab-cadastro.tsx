import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { CustomComboboxCidades } from "@/components/CustomComboboxs/custom-combobox-cidades";
import { CustomInput } from "@/components/CustomInputs/custom-input";
import { CustomInputCelTel } from "@/components/CustomInputs/custom-input-celtel";
import { CustomInputCep } from "@/components/CustomInputs/custom-input-cep";
import { CustomInputCpfCnpj } from "@/components/CustomInputs/custom-input-cpfcnpj";
import { CustomSwitch } from "@/components/CustomInputs/custom-switch";
import { CustomInputTextarea } from "@/components/CustomInputs/custpm-input-textarea";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { useEmpresas } from "@/hooks/tanstack/useEmpresa";
import { useEstadoCivis } from "@/hooks/tanstack/useEstadoCivil";
import { usePessoaGrupos } from "@/hooks/tanstack/usePessoaGrupo";
import { usePessoaOrigens } from "@/hooks/tanstack/usePessoaOrigem";
import { usePessoaSituacoes } from "@/hooks/tanstack/usePessoaSituacao";
import { usePessoaTipoContatos } from "@/hooks/tanstack/usePessoaTipoContato";
import { usePessoaTipoEnderecos } from "@/hooks/tanstack/usePessoaTipoEndereco";
import { ISearchCep, ISearchCnpj } from "@/interfaces/search";
import { usePermissionStore } from "@/store/permissionStore";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface TabCadastroProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabCadastro({ isDetails, isLoading }: TabCadastroProps) {
  const { hasPermission } = usePermissionStore();
  const { control, formState, setValue, getValues, watch } = useFormContext();

  const { data: situacao, isLoading: isLoadingSituacao } = usePessoaSituacoes(
    {}
  );

  const { data: empresa, isLoading: isLoadingEmpresa } = useEmpresas({});

  const { data: tipoEndereco, isLoading: isLoadingTipoEndereco } =
    usePessoaTipoEnderecos({});

  const { data: tipoContato, isLoading: isLoadingTipoContato } =
    usePessoaTipoContatos({});

  const { data: pessoaGrupos, isLoading: isLoadingGrupoPessoas } =
    usePessoaGrupos({});

  const { data: pessoaOrigem, isLoading: isLoadingPessoaOrigem } =
    usePessoaOrigens({});

  const { data: estadoCivil, isLoading: isLoadingEstadoCivil } = useEstadoCivis(
    {}
  );

  useEffect(() => {
    if (empresa && !getValues("empresa")) {
      setValue("empresa", {
        id: empresa[0].id,
        razaoSocial: empresa[0].razaoSocial,
      });
    }
  }, [empresa]);

  const [modal, setModal] = useState<{
    showSituacao: boolean;
    showGrupo: boolean;
    showOrigem: boolean;
    showEstadoCivil: boolean;
    showTipoContato: boolean;
    showTipoEndereco: boolean;
  }>({
    showSituacao: false,
    showGrupo: false,
    showOrigem: false,
    showEstadoCivil: false,
    showTipoContato: false,
    showTipoEndereco: false,
  });

  const {
    fields: fieldsEnderecos,
    append: appendEndereco,
    remove: removeEndereco,
  } = useFieldArray({
    control,
    name: "enderecoAuxiliar",
  });

  const {
    fields: fieldsContatos,
    append: appendContato,
    remove: removeContato,
  } = useFieldArray({
    control,
    name: "contato",
  });

  const handleAddEndereco = () => {
    appendEndereco({
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidadeId: 0,
      complemento: "",
      pessoaTipoEnderecoId: 0,
    });
  };

  const handleAddContato = () => {
    appendContato({
      pessoaTipoContatoId: 0,
      nome: "",
      departamento: "",
      fone: "",
      email: "",
      observacao: "",
    });
  };

  const onSetEndereco = (endereco: ISearchCnpj) => {
    setValue("razaoSocial", endereco.razaoSocial);
    setValue("nomeFantasia", endereco.nomeFantasia);
    setValue("endereco", endereco.endereco);
    setValue("bairro", endereco.bairro);
    setValue("cep", endereco.cep);
    setValue("numero", endereco.numero);
    setValue("email", endereco.email);
    setValue("dataNascimento", endereco.dataNascimento);
    setValue("cidade.id", endereco.cidadeId);
    setValue("cidade.descricao", `${endereco.cidade} - ${endereco.uf}`);
  };

  return (
    <TabsContent value="cadastro" className="grid gap-4">
      <div className="relative p-4 pt-8 bg-background-overlay rounded border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">Natureza</FormLabel>
        </div>
        <div className="px-1 flex items-center justify-between gap-2">
          <div className="text-ellipsis w-auto">
            <CustomSwitch
              label="Cliente"
              name="tipoCliente"
              //   caption={true}
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="text-ellipsis w-auto">
            <CustomSwitch
              label="Fornecedor"
              name="tipoFornecedor"
              //   caption={true}
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="text-ellipsis w-auto">
            <CustomSwitch
              label="Transportadora"
              name="tipoTransportador"
              //   caption={true}
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        {formState?.errors && (
          <FormMessage>{formState.errors.root?.message}</FormMessage>
        )}
      </div>
      <div className="relative p-4 pt-8 bg-background-overlay rounded border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">
            Informações Cadastrais
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Data do Cadastro"
            name="dataCadastro"
            type="date"
            className="h-8 bg-white"
            loading={isLoading}
            disabled={isDetails}
          />
          <div className="flex-1 flex items-end justify-between w-full gap-2">
            <CustomCombobox
              name={"pessoaSituacao"}
              label={"Situação"}
              loading={isLoading || isLoadingSituacao}
              disabled={isDetails}
              data={situacao?.items || []}
              fieldLabel="descricao"
              fieldValue="id"
              containerClassName="flex-1"
            />
            {hasPermission("pessoas_situacoes_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 shrink-0"
                  onClick={() =>
                    setModal((prev) => {
                      return { ...prev, showSituacao: true };
                    })
                  }
                >
                  <Plus />
                </Button>
              ))}
          </div>
        </div>
        <CustomCombobox
          name="empresa"
          label={"Empresa"}
          loading={isLoading || isLoadingEmpresa}
          disabled={isDetails}
          data={empresa || []}
          fieldValue="id"
          fieldLabel="razaoSocial"
          containerClassName="flex-1"
        />
        <div className="flex items-center justify-between gap-2">
          <CustomInputCpfCnpj
            label={"CPF/CNPJ"}
            name="cpfCnpj"
            loading={isLoading}
            disabled={isDetails}
            onSetEndereco={onSetEndereco}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInput
            label="RG / IE"
            name="rgIe"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInput
            label="Orgão Emissor"
            name="rgOrgaoEmissor"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="w-36"
            className="h-8 bg-white"
          />
        </div>
        <CustomInput
          label="Razão Social / Nome Completo"
          name="razaoSocial"
          loading={isLoading}
          disabled={isDetails}
          containerClassName="flex-1"
          className="h-8 bg-white"
        />
        <CustomInput
          label="Nome Fantasia / Nome Social"
          name="nomeFantasia"
          loading={isLoading}
          disabled={isDetails}
          containerClassName="flex-1"
          className="h-8 bg-white"
        />
      </div>
      <div className="relative p-4 pt-8 bg-background-overlay rounded border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">Endereços</FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInputCep
            label="CEP"
            name="cep"
            loading={isLoading}
            disabled={isDetails}
            onSetCep={(response: ISearchCep) => {
              setValue("endereco", response.endereco);
              setValue("bairro", response.bairro);
              setValue("cidade", response.cidade);
            }}
            className="h-8 bg-white"
          />
          <CustomInput
            label="Endereço"
            name="endereco"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Número"
            name="numero"
            loading={isLoading}
            disabled={isDetails}
            className="h-8 bg-white"
          />
          <CustomInput
            label="Bairro"
            name="bairro"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomComboboxCidades
            name="cidade"
            label="Cidade"
            disabled={isDetails}
            containerClassName="flex-1"
          />
          <CustomInput
            label="Complemento"
            name="complemento"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <div className="flex justify-start items-end gap-2">
          <FormLabel className="font-semibold text-base mt-4">
            Endereços Auxiliares
          </FormLabel>
          {!isDetails && (
            <Button
              variant="outline"
              className="rounded-full hover:border-primary h-4 w-4 p-3 -translate-y-0.5 cursor-pointer"
              type="button"
              onClick={handleAddEndereco}
            >
              <Plus />
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {fieldsEnderecos.map((field, index) => (
            <div
              className="relative border border-gray-200 p-4 rounded grid gap-4 bg-background-alt"
              key={field.id}
            >
              <div className="absolute -top-3 right-2 bg-transparent px-2">
                {!isDetails && (
                  <Button
                    variant="outline"
                    className="hover:border-red-500 rounded-full h-4 w-4 p-3 -translate-y-0.5 cursor-pointer"
                    type="button"
                    onClick={() => removeEndereco(index)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
              <div className="flex items-end justify-between gap-2">
                <CustomCombobox
                  name={`enderecoAuxiliar.${index}.pessoaTipoEndereco`}
                  label={"Tipo de Endereço"}
                  loading={isLoading || isLoadingTipoEndereco}
                  disabled={isDetails}
                  data={tipoEndereco?.items || []}
                  fieldValue="id"
                  fieldLabel="descricao"
                  containerClassName="flex-1"
                />
                {hasPermission("pessoa_tipo_enderecos_create") &&
                  !isDetails &&
                  (isLoading ? (
                    <Skeleton className="h-8 w-8 shrink-0" />
                  ) : (
                    <Button
                      variant={"outline"}
                      type="button"
                      className="h-8 w-8 shrink-0"
                      onClick={() =>
                        setModal((prev) => {
                          return {
                            ...prev,
                            showTipoEndereco: true,
                          };
                        })
                      }
                    >
                      <Plus />
                    </Button>
                  ))}
              </div>
              <div className="flex items-center justify-between gap-2">
                <CustomInputCep
                  label="CEP"
                  name={`enderecoAuxiliar.${index}.cep`}
                  loading={isLoading}
                  disabled={isDetails}
                  onSetCep={(response: ISearchCep) => {
                    setValue(
                      `enderecoAuxiliar.${index}.endereco`,
                      response.endereco
                    );
                    setValue(
                      `enderecoAuxiliar.${index}.bairro`,
                      response.bairro
                    );
                    setValue(
                      `enderecoAuxiliar.${index}.cidade`,
                      response.cidade
                    );
                  }}
                  className="h-8 bg-white"
                />
                <CustomInput
                  label="Endereço"
                  name={`enderecoAuxiliar.${index}.endereco`}
                  loading={isLoading}
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <CustomInput
                  label="Número"
                  name={`enderecoAuxiliar.${index}.numero`}
                  loading={isLoading}
                  disabled={isDetails}
                  className="h-8 bg-white"
                />
                <CustomInput
                  label="Bairro"
                  name={`enderecoAuxiliar.${index}.bairro`}
                  loading={isLoading}
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <CustomComboboxCidades
                  name={`enderecoAuxiliar.${index}.cidade`}
                  label={"Cidade"}
                  disabled={isDetails}
                  containerClassName="flex-1"
                />
                <CustomInput
                  label="Complemento"
                  name={`enderecoAuxiliar.${index}.complemento`}
                  loading={isLoading}
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative p-4 pt-8 bg-background-overlay rounded border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">Contatos</FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="E-mail"
            name="email"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInput
            label="E-mails Adicionais"
            placeholder="Escreva separados por ponto e vírgula (;)"
            name="emailAdicional"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInputCelTel
            label="Telefone"
            name="fone"
            mask="tel"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInputCelTel
            label="Celular"
            name="celular"
            mask="cel"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInputCelTel
            label="Whatsapp"
            name="whatsapp"
            mask="cel"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <div className="flex justify-start items-end gap-2">
          <FormLabel className="font-semibold text-base mt-4">
            Contatos Auxiliares
          </FormLabel>
          {!isDetails && (
            <Button
              variant="outline"
              className="rounded-full hover:border-primary h-4 w-4 p-3 -translate-y-0.5 cursor-pointer"
              type="button"
              onClick={handleAddContato}
            >
              <Plus />
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {fieldsContatos.map((field, index) => (
            <div
              className="relative border border-gray-200 p-4 rounded grid gap-4 bg-background-alt"
              key={field.id}
            >
              <div className="absolute -top-3 right-2 bg-transparent px-2">
                {!isDetails && (
                  <Button
                    variant="outline"
                    className="hover:border-red-500 rounded-full h-4 w-4 p-3 -translate-y-0.5 cursor-pointer"
                    type="button"
                    onClick={() => removeContato(index)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex items-end justify-between gap-2">
                  <CustomCombobox
                    name={`contato.${index}.pessoaTipoContato`}
                    label={"Tipo de Contato"}
                    loading={isLoading || isLoadingTipoContato}
                    disabled={isDetails}
                    data={tipoContato?.items || []}
                    fieldValue="id"
                    fieldLabel="descricao"
                    containerClassName="flex-1"
                  />
                  {hasPermission("pessoa_tipo_contatos_create") &&
                    !isDetails &&
                    (isLoading ? (
                      <Skeleton className="h-8 w-8 shrink-0" />
                    ) : (
                      <Button
                        variant={"outline"}
                        type="button"
                        className="h-8 w-8 shrink-0"
                        onClick={() =>
                          setModal((prev) => {
                            return {
                              ...prev,
                              showTipoContato: true,
                            };
                          })
                        }
                      >
                        <Plus />
                      </Button>
                    ))}
                </div>
                <CustomInput
                  label="Nome do Responsável"
                  name={`contato.${index}.nome`}
                  type="text"
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <CustomInput
                  label="Departamento"
                  name={`contato.${index}.departamento`}
                  loading={isLoading}
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
                <CustomInputCelTel
                  label="Fone"
                  name={`contato.${index}.fone`}
                  mask="cel"
                  loading={isLoading}
                  disabled={isDetails}
                  className="h-8 bg-white"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <CustomInput
                  label="E-mail"
                  name={`contato.${index}.email`}
                  loading={isLoading}
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
                <CustomInput
                  label="Observação"
                  name={`contato.${index}.observacao`}
                  loading={isLoading}
                  disabled={isDetails}
                  containerClassName="flex-1"
                  className="h-8 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative p-4 pt-8 bg-background-overlay rounded border space-y-4">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base">
            Informações Complementares
          </FormLabel>
        </div>
        <div className="flex items-end justify-between gap-2">
          <CustomCombobox
            name={"pessoaGrupo"}
            label={"Grupo de Pessoas"}
            loading={isLoading || isLoadingGrupoPessoas}
            disabled={isDetails}
            data={pessoaGrupos?.items || []}
            fieldValue="id"
            fieldLabel="descricao"
            containerClassName="flex-1"
          />
          {hasPermission("pessoa_grupos_create") &&
            !isDetails &&
            (isLoading ? (
              <Skeleton className="h-8 w-8 shrink-0" />
            ) : (
              <Button
                variant="outline"
                type="button"
                className="h-8 w-8 shrink-0"
                onClick={() =>
                  setModal((prev) => {
                    return {
                      ...prev,
                      showGrupo: true,
                    };
                  })
                }
              >
                <Plus />
              </Button>
            ))}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-end justify-between gap-2">
            <CustomCombobox
              name={"pessoaOrigem"}
              label={"Origem"}
              loading={isLoading || isLoadingPessoaOrigem}
              disabled={isDetails}
              data={pessoaOrigem?.items || []}
              fieldValue="id"
              fieldLabel="descricao"
              containerClassName="flex-1"
            />
            {hasPermission("pessoa_origens_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 shrink-0"
                  onClick={() =>
                    setModal((prev) => {
                      return {
                        ...prev,
                        showOrigem: true,
                      };
                    })
                  }
                >
                  <Plus />
                </Button>
              ))}
          </div>
          <div className="flex-1 flex items-end justify-between gap-2">
            <CustomCombobox
              name={"estadoCivil"}
              label={"Estado Civil"}
              loading={isLoading || isLoadingEstadoCivil}
              disabled={isDetails}
              data={estadoCivil?.items || []}
              fieldValue="id"
              fieldLabel="descricao"
              containerClassName="flex-1"
            />
            {hasPermission("estado_civis_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 shrink-0"
                  onClick={() =>
                    setModal((prev) => {
                      return {
                        ...prev,
                        showEstadoCivil: true,
                      };
                    })
                  }
                >
                  <Plus />
                </Button>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Nacionalidade"
            name="nacionalidade"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInput
            label="Início de Atividade / Data de Nascimento"
            name="dataNascimento"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Nome do Pai"
            name="pai"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
          <CustomInput
            label="Nome da Mãe"
            name="mae"
            loading={isLoading}
            disabled={isDetails}
            containerClassName="flex-1"
            className="h-8 bg-white"
          />
        </div>
        <CustomInputTextarea
          label="Observação Geral"
          name="observacaoGeral"
          className="h-20 bg-white"
          loading={isLoading}
          disabled={isDetails}
        />
      </div>
    </TabsContent>
  );
}
