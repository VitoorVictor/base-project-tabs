import { CustomCombobox } from "@/components/CustomComboboxs/custom-combobox";
import { CustomInput } from "@/components/CustomInputs/custom-input";
import { CustomInputCelTel } from "@/components/CustomInputs/custom-input-celtel";
import { CustomInputCep } from "@/components/CustomInputs/custom-input-cep";
import { CustomInputCpfCnpj } from "@/components/CustomInputs/custom-input-cpfcnpj";
import { CustomInputDate } from "@/components/CustomInputs/custom-input-date";
import { CustomSwitch } from "@/components/CustomInputs/custom-switch";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { ISearchCep, ISearchCnpj } from "@/interfaces/search";
import { usePermissionStore } from "@/store/permissionStore";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface TabCadastroProps {
  isDetails?: boolean;
  isLoading?: boolean;
}

export function TabCadastro({ isDetails, isLoading }: TabCadastroProps) {
  const { hasPermission } = usePermissionStore();

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

  const { control, formState, setValue } = useFormContext();

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
    setValue("cidade", endereco.cidade);
  };

  return (
    <TabsContent value="cadastro" className="grid gap-4">
      <div className="relative p-4 bg-background-content rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base bg-gradient-to-b from-background-modal to-background-content">
            Informações Cadastrais
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Data do Cadastro"
            name="dataCadastro"
            type="date"
            className="h-8"
            loading={isLoading}
            disabled={isDetails}
          />
          <div className="flex-1 flex items-end justify-between w-full gap-2">
            <div className="flex-1">
              <CustomCombobox
                name={"pessoaSituacao"}
                label={"Situação"}
                loading={isLoading}
                disabled={isDetails}
                data={[]}
                fieldLabel={"descricao"}
                fieldValue={"id"}
              />
            </div>
            {hasPermission("pessoas_situacoes_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8  mb-4 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 mb-4 shrink-0"
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            {/* {isUpdate ? (
              <CustomComboboxEmpresas
                initialData={data.pessoa.empresa}
                name={"empresaId"}
                label={"Empresa"}
                isLoading={isLoading}
                disabled={isDetails}
              />
            ) : (
              <CustomComboboxEmpresas
                name={"empresaId"}
                label={"Empresa"}
                isLoading={isLoading}
                initialData={data.empresa ? data.empresa : undefined}
                disabled={isDetails}
              />
            )} */}
          </div>
          <div className="flex-1">
            <CustomInputCpfCnpj
              label={"CPF/CNPJ"}
              name="cpfCnpj"
              loading={isLoading}
              disabled={isDetails}
              onSetEndereco={onSetEndereco}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CustomInput
              label="RG / IE"
              name="rgIe"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Orgão Emissor"
              name="rgOrgaoEmissor"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CustomInput
              label="Razão Social / Nome Completo"
              name="razaoSocial"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Nome Fantasia / Nome Social"
              name="nomeFantasia"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
      </div>
      <div className="relative p-4 bg-background-content rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base bg-gradient-to-b from-background-modal to-background-content">
            Natureza
          </FormLabel>
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
      <div className="relative p-4 bg-background-content rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base bg-gradient-to-b from-background-modal to-background-content">
            Endereços
          </FormLabel>
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
          />
          <div className="flex-1">
            <CustomInput
              label="Endereço"
              name="endereco"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CustomInput
            label="Número"
            name="numero"
            loading={isLoading}
            disabled={isDetails}
          />
          <div className="flex-1">
            <CustomInput
              label="Bairro"
              name="bairro"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            {/* {data.pessoa?.cidade && isUpdate ? (
              <CustomComboboxCidades
                name="cidadeId"
                label={"Cidade"}
                isLoading={isLoading}
                disabled={isDetails}
                initialData={{
                  ...data.pessoa.cidade,
                  cidadeEstado: `${data.pessoa.cidade.descricao} - ${data.pessoa.cidade.estado.sigla}`,
                }}
              />
            ) : (
              <CustomComboboxCidades
                name="cidadeId"
                label={"Cidade"}
                isLoading={isLoading}
                disabled={isDetails}
              />
            )} */}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Complemento"
              name="complemento"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex justify-start items-end gap-2">
          <FormLabel className="font-semibold text-base mt-4">
            Endereços Auxiliares
          </FormLabel>
          {!isDetails && (
            <Button
              variant="outline"
              className="rounded-full hover:border-primary h-4 w-4 p-3 -translate-y-0.5"
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
              className="relative border border-gray-200 p-4 rounded-md grid gap-2"
              key={field.id}
            >
              <div className="absolute -top-3 right-2 bg-white px-2">
                {!isDetails && (
                  <Button
                    variant="outline"
                    className="hover:border-red-500 rounded-full h-4 w-4 p-3 -translate-y-0.5"
                    type="button"
                    onClick={() => removeEndereco(index)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-end justify-between w-full  gap-2">
                  <div className="flex-1 ">
                    {/* {data.pessoa?.enderecoAuxiliar && isUpdate ? (
                      <CustomComboboxTipoEnderecos
                        initialData={
                          data.pessoa.enderecoAuxiliar[index]
                            ? data.pessoa.enderecoAuxiliar[index]
                                .pessoaTipoEndereco
                            : undefined
                        }
                        name={`enderecoAuxiliar.${index}.pessoaTipoEnderecoId`}
                        label={"Tipo de Endereço"}
                        isLoading={isLoading}
                        disabled={isDetails}
                      />
                    ) : (
                      <CustomComboboxTipoEnderecos
                        name={`enderecoAuxiliar.${index}.pessoaTipoEnderecoId`}
                        label={"Tipo de Endereço"}
                        isLoading={isLoading}
                        disabled={isDetails}
                      />
                    )} */}
                  </div>
                  {hasPermission("pessoa_tipo_enderecos_create") &&
                    !isDetails &&
                    (isLoading ? (
                      <Skeleton className="h-8 w-8  mb-4 shrink-0" />
                    ) : (
                      <Button
                        variant={"outline"}
                        type="button"
                        className="h-8 w-8 mb-4 shrink-0"
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
                />
                <div className="flex-1">
                  <CustomInput
                    label="Endereço"
                    name={`enderecoAuxiliar.${index}.endereco`}
                    loading={isLoading}
                    disabled={isDetails}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <CustomInput
                  label="Número"
                  name={`enderecoAuxiliar.${index}.numero`}
                  loading={isLoading}
                  disabled={isDetails}
                />
                <div className="flex-1">
                  <CustomInput
                    label="Bairro"
                    name={`enderecoAuxiliar.${index}.bairro`}
                    loading={isLoading}
                    disabled={isDetails}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  {/* {data.pessoa?.enderecoAuxiliar && isUpdate ? (
                    <CustomComboboxCidades
                      name={`enderecoAuxiliar.${index}.cidadeId`}
                      label={"Cidade"}
                      isLoading={isLoading}
                      disabled={isDetails}
                      initialData={
                        data.pessoa.enderecoAuxiliar[index]
                          ? {
                              ...data.pessoa.enderecoAuxiliar[index].cidade,
                              cidadeEstado: `${data.pessoa.enderecoAuxiliar[index].cidade.descricao} - ${data.pessoa.enderecoAuxiliar[index].cidade.estado.sigla}`,
                            }
                          : undefined
                      }
                    />
                  ) : (
                    <CustomComboboxCidades
                      name={`enderecoAuxiliar.${index}.cidadeId`}
                      label={"Cidade"}
                      isLoading={isLoading}
                      disabled={isDetails}
                    />
                  )} */}
                </div>

                <div className="flex-1">
                  <CustomInput
                    label="Complemento"
                    name={`enderecoAuxiliar.${index}.complemento`}
                    loading={isLoading}
                    disabled={isDetails}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative p-4 bg-background-content rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base bg-gradient-to-b from-background-modal to-background-content">
            Contatos
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CustomInput
              label="E-mail"
              name="email"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="E-mails Adicionais"
              placeholder="Escreva separados por ponto e vírgula (;)"
              name="emailAdicional"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CustomInputCelTel
              label="Telefone"
              name="fone"
              mask="tel"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInputCelTel
              label="Celular"
              name="celular"
              mask="cel"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInputCelTel
              label="Whatsapp"
              name="whatsapp"
              mask="cel"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex justify-start items-end gap-2">
          <FormLabel className="font-semibold text-base mt-4">
            Contatos Auxiliares
          </FormLabel>
          {!isDetails && (
            <Button
              variant="outline"
              className="rounded-full hover:border-primary h-4 w-4 p-3 -translate-y-0.5"
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
              className="relative border border-gray-200 p-4 rounded-md grid gap-2"
              key={field.id}
            >
              <div className="absolute -top-3 right-2 bg-white px-2">
                {!isDetails && (
                  <Button
                    variant="outline"
                    className="hover:border-red-500 rounded-full h-4 w-4 p-3 -translate-y-0.5"
                    type="button"
                    onClick={() => removeContato(index)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex items-end justify-between gap-2">
                  <div className="flex-1 ">
                    {/* {data.pessoa?.contato && isUpdate ? (
                      <CustomComboboxTipoContatos
                        initialData={
                          data.pessoa.contato[index]
                            ? data.pessoa.contato[index].pessoaTipoContato
                            : undefined
                        }
                        name={`contato.${index}.pessoaTipoContatoId`}
                        label={"Tipo de Contato"}
                        isLoading={isLoading}
                        disabled={isDetails}
                      />
                    ) : (
                      <CustomComboboxTipoContatos
                        name={`contato.${index}.pessoaTipoContatoId`}
                        label={"Tipo de Contato"}
                        isLoading={isLoading}
                        disabled={isDetails}
                      />
                    )} */}
                  </div>
                  {hasPermission("pessoa_tipo_contatos_create") &&
                    !isDetails &&
                    (isLoading ? (
                      <Skeleton className="h-8 w-8  mb-4 shrink-0" />
                    ) : (
                      <Button
                        variant={"outline"}
                        type="button"
                        className="h-8 w-8 mb-4 shrink-0"
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
                <div className="flex-1">
                  <CustomInput
                    label="Nome do Responsável"
                    name={`contato.${index}.nome`}
                    type="text"
                    disabled={isDetails}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <CustomInput
                    label="Departamento"
                    name={`contato.${index}.departamento`}
                    loading={isLoading}
                    disabled={isDetails}
                  />
                </div>
                <div className="flex-1">
                  {/* <CustomInputCelTel
                    label={"Fone"}
                    name={`contato.${index}.fone`}
                    mask={"cel"}
                    loading={isLoading}
                    disabled={isDetails}
                  /> */}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <CustomInput
                    label="E-mail"
                    name={`contato.${index}.email`}
                    loading={isLoading}
                    disabled={isDetails}
                  />
                </div>
                <div className="flex-1">
                  <CustomInput
                    label="Observação"
                    name={`contato.${index}.observacao`}
                    loading={isLoading}
                    disabled={isDetails}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative p-4 bg-background-content rounded-lg border">
        <div className="absolute -top-3">
          <FormLabel className="font-semibold text-base bg-gradient-to-b from-background-modal to-background-content">
            Informações Complementares
          </FormLabel>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-end justify-between gap-2">
            <div className="flex-1">
              {/* {data.pessoa?.pessoaGrupo && isUpdate ? (
                <CustomComboboxGrupos
                  initialData={data.pessoa.pessoaGrupo}
                  name={"pessoaGrupoId"}
                  label={"Grupo de Pessoas"}
                  isLoading={isLoading}
                  disabled={isDetails}
                />
              ) : (
                <CustomComboboxGrupos
                  name={"pessoaGrupoId"}
                  label={"Grupo de Pessoas"}
                  isLoading={isLoading}
                  disabled={isDetails}
                />
              )} */}
            </div>
            {hasPermission("pessoa_grupos_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8  mb-4 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 mb-4 shrink-0"
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
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-end justify-between gap-2">
            <div className="flex-1">
              {/* {data.pessoa?.pessoaOrigem && isUpdate ? (
                <CustomComboboxOrigens
                  initialData={data.pessoa.pessoaOrigem}
                  name={"pessoaOrigemId"}
                  label={"Origem"}
                  isLoading={isLoading}
                  disabled={isDetails}
                />
              ) : (
                <CustomComboboxOrigens
                  name={"pessoaOrigemId"}
                  label={"Origem"}
                  isLoading={isLoading}
                  disabled={isDetails}
                />
              )} */}
            </div>
            {hasPermission("pessoa_origens_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8  mb-4 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 mb-4 shrink-0"
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
            <div className="flex-1">
              {/* {data.pessoa?.estadoCivil && isUpdate ? (
                <CustomComboboxEstadoCivis
                  initialData={data.pessoa.estadoCivil}
                  name={"estadoCivilId"}
                  label={"Estado Civil"}
                  isLoading={isLoading}
                  disabled={isDetails}
                />
              ) : (
                <CustomComboboxEstadoCivis
                  name={"estadoCivilId"}
                  label={"Estado Civil"}
                  isLoading={isLoading}
                  disabled={isDetails}
                />
              )} */}
            </div>
            {hasPermission("estado_civis_create") &&
              !isDetails &&
              (isLoading ? (
                <Skeleton className="h-8 w-8  mb-4 shrink-0" />
              ) : (
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-8 w-8 mb-4 shrink-0"
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
          <div className="flex-1">
            <CustomInput
              label="Nacionalidade"
              name="nacionalidade"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Início de Atividade / Data de Nascimento"
              name="dataNascimento"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CustomInput
              label="Nome do Pai"
              name="pai"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Nome da Mãe"
              name="mae"
              loading={isLoading}
              disabled={isDetails}
            />
          </div>
        </div>
        <div>
          {/* <CustomInputTextarea
            label="Observação Geral"
            name={`observacaoGeral`}
            className="h-20"
            loading={isLoading}
            disabled={isDetails}
          /> */}
        </div>
      </div>
    </TabsContent>
  );
}
