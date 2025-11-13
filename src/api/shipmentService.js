import api from "./apiClient";

export const getAllShimpents = async () => {
  try {
    const { data } = await api.get("/shipments");
    return {
      ok: true,
      tracking: data.data
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};

// Nueva: obtener todos los shipments con paginación opcional
export const getAllShipments = async (page = 1, limit = 10) => {
  try {
    const { data } = await api.get(`/shipments?page=${page}&limit=${limit}`);
    return {
      ok: true,
      shipments: data.data || data,
      meta: data.meta || null,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};

export const getByTrackingNumber = async (trakingNumber) => {
  try {
    const { data } = await api.get("/shipments/"+trakingNumber);
    return {
      ok: true,
      tracking: data.data || data,      
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};


export const createShipment = async (newProduct) => {
  try {
    const { data } = await api.post("/shipments", newProduct);
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

export const deleteByTrackingNumber = async (sku) => {
  try {
    const { data } = await api.delete("/shipments/"+sku);
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

export const updateShipments = async (productData) => {
  try {
    const { sku, ...restOfData } = productData;
    // legacy function for products - keep behavior
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

// Nueva: actualizar estado de un shipment por trackingId
export const updateShipmentStatus = async (trackingId, status, updatedAt) => {
  try {
    const { data } = await api.put(`/shipments/${trackingId}`, { status, updatedAt });
    return {
      ok: true,
      shipment: data.data || data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};