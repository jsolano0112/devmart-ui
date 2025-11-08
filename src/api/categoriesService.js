
import api from "./apiClient";
export const getAllCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    return {
      ok: true,
      categories: data
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};