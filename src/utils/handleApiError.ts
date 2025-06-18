import { toast } from "react-toastify";

export function handleApiError(error: unknown): {
  error: string;
  message: string;
  statusCode: number;
} {
  if (error && typeof error === "object" && "response" in error) {
    const err = error as any;
    const message =
      err.response?.data?.message || "Erro inesperado do servidor";
    const statusCode = err.response?.data?.statusCode || 500;
    const errType = err.response?.data?.error || "Erro";
    return { message, statusCode, error: errType };
  }

  return {
    error: "Erro desconhecido",
    message: "Erro inesperado. Verifique sua conexão ou tente novamente.",
    statusCode: 500,
  };
}
