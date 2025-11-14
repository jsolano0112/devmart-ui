import api from "./apiClient";

// Create order
export const createOrder = async (orderData) => {
  try {
    const { data } = await api.post("/orders", orderData);
    return {
      ok: true,
      order: data.data || data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const { data } = await api.get(`/orders/${orderId}`);
    return {
      ok: true,
      order: data.data || data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};

// Get all orders for a user
export const getUserOrders = async (userId) => {
  try {
    const { data } = await api.get(`/orders/user/${userId}`);
    console.log("Orders response:", data);
    
    // Manejar diferentes formatos de respuesta
    let orders = [];
    if (Array.isArray(data)) {
      orders = data;
    } else if (data.data && Array.isArray(data.data)) {
      orders = data.data;
    } else if (data && typeof data === 'object' && data.id) {
      // Si es un objeto único, envuelverlo en array
      orders = [data];
    }
    
    return {
      ok: true,
      orders: orders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error ?? "Error cargando órdenes",
    };
  }
};

// Update order
export const updateOrder = async (orderId, orderData) => {
  try {
    const { data } = await api.put(`/orders/${orderId}`, orderData);
    return {
      ok: true,
      order: data.data || data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/cancel`, {});
    return {
      ok: true,
      message: data.data || data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};

// Delete order
export const deleteOrder = async (orderId) => {
  try {
    const { data } = await api.delete(`/orders/${orderId}`);
    return {
      ok: true,
      message: data.data || data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error,
    };
  }
};
