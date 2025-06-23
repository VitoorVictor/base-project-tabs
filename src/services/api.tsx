// import { toast } from "@/hooks/use-toast";
import axios from "axios";
// import { getCookie, setCookie } from "cookies-next";
// import { signOut } from "next-auth/react";

// // Criação da instância do Axios
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL da API
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL da API
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YjQ3MWRhMi0zMTJlLTQzZjktODZkNS01NGIzMGFjYjlhNDkiLCJlbWFpbCI6ImMzcG9AeW9kYWNvcnBzLmNvbS5iciIsInR5cGUiOiJhY2Nlc3MiLCJtb2R1bG8iOjMsImlkIjozLCJub21lIjoiQy0zUE8iLCJyYW1hbCI6bnVsbCwiaWF0IjoxNzUwNzA5NjUyLCJleHAiOjE3NTA3MTY4NTJ9.Bzla6P6oW6GYFXl_JKYRq7q_w4R58q3257Wvg9G4aE8",
  },
});

// const refreshApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const refreshToken = async () => {
//   const refreshToken = getCookie("refreshToken");
//   console.log("refreshToken antigo", refreshToken);
//   if (!refreshToken) {
//     throw new Error("Refresh token não encontrado");
//   }
//   const res = await refreshApi.post("/auth/refresh", {
//     refreshToken: refreshToken,
//   });
//   if (res) {
//     setCookie("token", res.data.accessToken.token);
//     setCookie("refreshToken", res.data.accessToken.refreshToken);
//   }
//   console.log("tokens novos", res);
// };

// // Interceptor para adicionar o token automaticamente às requisições
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = getCookie("token");

//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//       return config;
//     } catch (error) {
//       console.error("Erro ao adicionar o token ao cabeçalho:", error);
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     // Manipulação de erro antes do envio da requisição
//     console.error("Erro na configuração da requisição:", error);
//     return Promise.reject(error);
//   }
// );

// // Interceptor para tratar erros de resposta
// api.interceptors.response.use(
//   (response) => response, // Retorna a resposta caso não haja erros
//   async (error) => {
//     const prevRequest = error?.config;

//     // Se deu 401 e ainda não tentamos renovar o token
//     if (error?.response?.status === 401 && !prevRequest?.sent) {
//       prevRequest.sent = true; // Evita loops infinitos

//       try {
//         await refreshToken(); // Tenta renovar o token
//         const newToken = getCookie("token"); // Obtém o novo token atualizado

//         if (newToken) {
//           prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
//           return api(prevRequest); // Reenvia a requisição original com o novo token
//         }
//       } catch (refreshError) {
//         console.warn("Erro ao renovar o token, deslogando...");
//         toast({
//           variant: "warning",
//           title: "Aviso!",
//           description: "Sessão expirada. Faça login novamente.",
//         });
//         signOut();
//         return Promise.reject(refreshError);
//       }
//     }

//     // Se já tentamos renovar e ainda assim deu 401, deslogamos o usuário
//     if (error?.response?.status === 401 && prevRequest?.sent) {
//       console.warn("Token inválido ou expirado, deslogando...");
//       toast({
//         variant: "warning",
//         title: "Aviso!",
//         description: "Sessão expirada. Faça login novamente.",
//       });
//       signOut();
//     }

//     // Se for outro erro, apenas rejeita a requisição
//     return Promise.reject(error);
//   }
// );

// export default api;
