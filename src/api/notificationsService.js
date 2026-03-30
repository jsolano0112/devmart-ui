import api from "./apiClient";
export const createNotification = async (type, message, userId, createdAt, read) => {
  try {
    const { data } = await api.post(`/notifications`, { type, message, userId, createdAt, read });
    console.log({data})
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};