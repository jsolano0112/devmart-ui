import axios from "axios";
import { AUTH } from "./endpointPaths";
import { environment } from "../environment/environment.ts";

// ================= TOKENS =================
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

// ================= BASE URL DINÁMICA =================
const getBaseURL = (url = "") => {
  console.log(url)
  if (url.includes('auth') || url.includes('users')) {
    return environment.USERS_API;
  }
  if (url.includes('notifications')) {
    return environment.NOTIFICATIONS_API;
  }
  return environment.DEVMART_API;
};

// ================= AXIOS INSTANCE =================
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use((config) => {
  // Base URL dinámica
  config.baseURL = getBaseURL(config.url);

  // Token
  const tokens = getStoredTokens();
  const currentAccessToken = tokens.accessToken || accessToken;

  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }

  return config;
});

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const tokens = getStoredTokens();
    const currentRefreshToken = tokens.refreshToken || refreshToken;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      currentRefreshToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${environment.USERS_API}${AUTH.refresh}`,
          { refreshToken: currentRefreshToken }
        );

        const newTokens = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };

        setAuthTokens(newTokens);

        
        accessToken = newTokens.accessToken;
        refreshToken = newTokens.refreshToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        console.error("Error al refrescar token:", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;