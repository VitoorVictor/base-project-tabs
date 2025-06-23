"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Usar NextAuth v5 para autenticação
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Credenciais inválidas");
        case "CallbackRouteError":
          throw new Error("Credenciais inválidas");
        default:
          throw new Error("Erro interno do servidor");
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/entrar" });
}
