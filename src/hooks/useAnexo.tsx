import { useEffect, useState } from "react";
import {
  useAnexoAssinatura,
  useAnexoLink,
  useDeleteAnexo,
} from "./tanstack/useAnexo";

export const useAnexoActions = () => {
  const [id, setId] = useState<string | null>(null);

  const { data: assinatura } = useAnexoAssinatura(id!, Boolean(id));

  const { data: blob } = useAnexoLink(
    id!,
    encodeURIComponent(assinatura?.assinatura || ""),
    Boolean(id && assinatura?.assinatura)
  );

  const { mutateAsync: deleteAnexo } = useDeleteAnexo();

  useEffect(() => {
    if (blob) {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
      setTimeout(() => URL.revokeObjectURL(fileURL), 60000);
    }
  }, [blob]);

  const openAnexo = (anexoId: string) => setId(anexoId);

  const removeAnexo = (tipoAnexo: string, anexoId: string, password: string) => {
    return deleteAnexo({ tipoAnexo, id: anexoId, password });
  };

  return {
    openAnexo,
    removeAnexo,
  };
};
