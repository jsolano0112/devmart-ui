
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

export const createCategory = async (name) => {
  try {
    await api.post("/categories", {name});
    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};

export const deleteCategory = async (id) => {
  try {
     await api.delete("/categories/"+id);
    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};