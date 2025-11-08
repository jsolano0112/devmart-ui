import axios from "axios";
import { AUTH } from "./endpointPaths";
import { environment } from "../environment/environment.ts";

let accessToken = null;
let refreshToken = null;

export const setAuthTokens = (tokens) => {
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
};

export const clearAuthTokens = () => {
  accessToken = null;
  refreshToken = null;
};

const api = axios.create({
  baseURL: environment.DEVMART_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${environment.DEVMART_API}${AUTH.refresh}`, {
          refreshToken,
        });

        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        console.error("Error al refrescar token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
