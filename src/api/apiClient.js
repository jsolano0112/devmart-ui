import axios from "axios";
import { AUTH } from "./endpointPaths";
import { environment } from "../environment/environment.ts";

const getStoredTokens = () => {
  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    return {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken
    };
  }
  return { accessToken: null, refreshToken: null };
};

let { accessToken, refreshToken } = getStoredTokens();

export const setAuthTokens = (tokens) => {
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
  
  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }
};

export const clearAuthTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.clear();
};

const api = axios.create({
  baseURL: environment.DEVMART_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  const currentAccessToken = tokens.accessToken || accessToken;
  
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    const tokens = getStoredTokens();
    const currentRefreshToken = tokens.refreshToken || refreshToken;
      
    if (error.response?.status === 401 && !originalRequest._retry && currentRefreshToken) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${environment.DEVMART_API}${AUTH.refresh}`, {
          refreshToken: currentRefreshToken,
        });

        const newTokens = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        };
        
        setAuthTokens(newTokens);
        
        accessToken = newTokens.accessToken;
        refreshToken = newTokens.refreshToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        console.error("Error al refrescar token:", refreshError);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;