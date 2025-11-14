import { createOrder, getUserOrders } from "../api/ordersService";
import { createShipment } from "../api/shipmentService";

export const useOrders = () => {
  // Create a new order
  const createNewOrder = async (orderData) => {
    if (!orderData.userId || !orderData.products || orderData.products.length === 0) {
      return {
        ok: false,
        errorMessage: "Datos de orden inválidos",
      };
    }

    // Validate minimum order amount
    if (!orderData.total || orderData.total < 50000) {
      return {
        ok: false,
        errorMessage: "Orden mínima es $50,000 COP",
      };
    }

    // Validate shipping address
    if (!orderData.address || orderData.address.trim().length < 10) {
      return {
        ok: false,
        errorMessage: "Dirección de envío inválida",
      };
    }

    // Create the order
    const orderRes = await createOrder(orderData);
    
    if (!orderRes.ok) {
      return orderRes;
    }

    // If order was created successfully, create shipment automatically
    const orderId = orderRes.order?.id;
    if (orderId) {
      const shipmentData = {
        orderId: orderId,
        status: "PENDIENTE",
        carrier: "Por definir",
        trackingId: `TRK-${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
      };

      try {
        const shipmentRes = await createShipment(shipmentData);
        console.log("Shipment created:", shipmentRes);
      } catch (error) {
        console.error("Warning: Shipment creation failed, but order was created:", error);
        // Don't fail the entire flow if shipment creation fails
      }
    }

    return orderRes;
  };

  // Fetch user orders
  const fetchUserOrders = async (userId) => {
    if (!userId) {
      return {
        ok: false,
        errorMessage: "userId requerido",
      };
    }

    return await getUserOrders(userId);
  };

  return {
    createNewOrder,
    fetchUserOrders,
  };
};
