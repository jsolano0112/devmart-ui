import api from "./apiClient";

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/products");
    console.log(data)
    return {
      ok: true,
      products: data.data
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};
