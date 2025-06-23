import { logoutAction } from "@/actions/auth";
import { signOut } from "@/auth";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) {
    throw new Error("Refresh token não encontrado");
  }
  const res = await refreshApi.post("/auth/refresh", {
    refreshToken: refreshToken,
  });
  if (res) {
    setCookie("token", res.data.accessToken.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie("refreshToken", res.data.accessToken.refreshToken, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res.data.accessToken.token;
  }
  throw new Error("Erro ao atualizar o token");
};

api.interceptors.request.use(
  async (config) => {
    try {
      const token = getCookie("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Erro ao adicionar o token ao cabeçalho:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Erro na configuração da requisição:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        toast.warning("Sessão expirada. Faça login novamente.", {
          toastId: "session-expired",
        });
        logoutAction();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error?.response?.status === 401 && originalRequest?._retry) {
      toast.warning("Sessão expirada. Faça login novamente.", {
        toastId: "session-expired",
      });
      logoutAction();
    }

    return Promise.reject(error);
  }
);
