// "use client";

// import * as React from "react";
// import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/mediaQuery";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";
// import { useCallback, useEffect, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import CustomInput from "@/components/CustomInputs/CustomInput";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { serviceCentroCusto } from "@/services/centro-custo";
// import { ICentroCusto } from "@/interfaces/centro-custo";
// import { CustomSwitch } from "@/components/CustomSwitch/custom-switch";
// import CustomFooterModal from "@/components/CustomFooterModal/custom-footer-modal";
// import { handleApiError } from "@/utils/handleApiError";
// import { toast } from "react-toastify";

// interface IDrawerDialogProps {
//   id?: string;
//   onClose: () => void;
//   onConfirm?: () => void;
// }

// const formSchema = z.object({
//   descricao: z
//     .string({
//       required_error: "A descrição do centro de custo é obrigatória",
//     })
//     .min(4, "A descrição deve ter mais de 3 caracteres.")
//     .max(255, "A descrição deve ter menos de 255 caracteres."),
//   ativo: z.boolean({ required_error: "Situação de ativo é obrigatória" }),
// });

// function FormModalContent({
//   onClose,
//   onConfirm,
//   id,
// }: {
//   onConfirm?: () => void;
//   onClose: () => void;
//   id?: string;
// }) {
//   const [loadingData, setLoadingData] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<ICentroCusto | null>(null);

//   const isUpdate = Boolean(id);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       descricao: "",
//       ativo: true,
//     },
//   });

//   const fetch = useCallback(async () => {
//     if (!id) return null;
//     setLoadingData(true);
//     try {
//       const data = await serviceCentroCusto.getOne(id!);
//       setData(data);
//     } catch (err) {
//       const { message } = handleApiError(err);
//       toast.error(message || "Erro ao buscar centro de custo");
//     } finally {
//       setLoadingData(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetch();
//   }, [fetch]);

//   useEffect(() => {
//     if (data) {
//       form.reset({
//         descricao: data.descricao,
//         ativo: data.ativo,
//       });
//     }
//   }, [form, data]);

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setLoading(true);
//     try {
//       const res = isUpdate
//         ? await serviceCentroCusto.update(id!, values)
//         : await serviceCentroCusto.create(values);
//       if (res && res.error === "") {
//         toast.success(
//           res.message ||
//             `Sucesso ao ${isUpdate ? "alterar" : "cadastrar"} centro de custo`
//         );
//       }
//       if (onConfirm) {
//         onConfirm();
//       }
//     } catch (err) {
//       const { message } = handleApiError(err);
//       toast.error(
//         message ||
//           `Erro ao ${isUpdate ? "alterar" : "cadastrar"} centro de custo`
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <FormProvider {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={cn("grid items-start gap-4")}
//       >
//         <div className="flex items-top gap-2">
//           <div className="flex-1">
//             <CustomInput
//               label="Descrição"
//               name="descricao"
//               id="descricao"
//               type="text"
//               placeholder=""
//               isLoading={loadingData}
//             />
//           </div>
//           <CustomSwitch
//             label={"Está Ativo?"}
//             name="ativo"
//             caption={true}
//             isLoading={loadingData}
//           />
//         </div>
//         <CustomFooterModal onClose={() => onClose()} isLoading={loading} />
//       </form>
//     </FormProvider>
//   );
// }

// export function Modal({ onClose, onConfirm, id }: IDrawerDialogProps) {
//   const isDesktop = useMediaQuery("(min-width: 768px)");

//   const title = id ? "Atualizar centro de custo" : "Novo centro de custo";
//   const description = id
//     ? "Atualize os dados do tipo do endereço e clique em salvar."
//     : "Preencha os dados do tipo do endereço e clique em salvar.";

//   const modalContent = (
//     <FormModalContent onClose={onClose} onConfirm={onConfirm} id={id} />
//   );

//   return (
//     <>
//       {isDesktop ? (
//         <Dialog open={true} onOpenChange={(isOpen) => isOpen || onClose()}>
//           <DialogContent
//             className="sm:max-w-[420px] max-h-[600px] overflow-auto custom-scrollbar"
//             onInteractOutside={(e) => e.preventDefault()}
//           >
//             <DialogHeader>
//               <DialogTitle>{title}</DialogTitle>
//               <DialogDescription>{description}</DialogDescription>
//             </DialogHeader>
//             {modalContent}
//           </DialogContent>
//         </Dialog>
//       ) : (
//         <Drawer open={true} onOpenChange={(isOpen) => isOpen || onClose()}>
//           <DrawerContent
//             onInteractOutside={(e) => e.preventDefault()}
//             className="max-h-full w-full"
//           >
//             <DrawerHeader className="text-left">
//               <DrawerTitle>{title}</DrawerTitle>
//               <DrawerDescription>{description}</DrawerDescription>
//             </DrawerHeader>
//             <div className="px-4 overflow-y-auto max-h-full custom-scrollbar">
//               {modalContent}
//             </div>
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// }
