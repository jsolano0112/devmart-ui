import api from "./apiClient";

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/products");
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



export const createProduct = async (newProduct) => {
  try {
    const { data } = await api.post("/products", newProduct);
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

export const deleteProductBySku = async (sku) => {
  try {
    const { data } = await api.delete("/products/"+sku);
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

export const updateProduct = async (productData) => {
  try {
    const { sku, ...restOfData } = productData;
    const { data } = await api.put("/products/"+sku, restOfData);
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