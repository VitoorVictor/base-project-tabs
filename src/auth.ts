import axios from "axios";
import { error } from "console";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        // captcha: { label: "captcha", type: "text" },
      },

      authorize: async (credentials) => {
        //lógica de autenticação
        const { email, password } = credentials;
        try {
          const { data } = await axios.post(
            process.env.API_URL_LOGIN as string,
            {
              email,
              password,
              //   captcha,
            }
          );
          if (data) {
            const { token, refreshToken } = data;
            if (token) {
              (await cookies()).set({
                name: "token",
                value: token,
                httpOnly: false,
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
              });
            }
            if (refreshToken) {
              (await cookies()).set({
                name: "refreshToken",
                value: refreshToken,
                httpOnly: false,
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
              });
            }
            return data;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Se quiser mostrar a mensagem do backend
            const msg = error.response?.data?.message || "Erro de autenticação";
            throw new Error(msg);
          }

          throw new Error("Erro interno ao autenticar");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});
