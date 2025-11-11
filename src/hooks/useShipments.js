import { getByTrackingNumber, getAllShipments, updateShipmentStatus } from "../api/shipmentService";

export const useShipments = () => {
  // Buscar envío por trackingNumber
  const searchByTrackingNumber = async (trackingNumber) => {
    console.log("Searching for tracking number:", trackingNumber);
    if (!trackingNumber) return { ok: false, errorMessage: "Tracking number requerido" };
    return await getByTrackingNumber(trackingNumber);
  };

  // Obtener lista paginada de shipments
  const fetchShipments = async (page = 1, limit = 10) => {
    return await getAllShipments(page, limit);
  };

  // Actualizar estado de un shipment
  const changeShipmentStatus = async (shipmentId, status) => {
    
    if (!shipmentId) return { ok: false, errorMessage: "shipmentId requerido" };

    console.log("Updating shipmentId:", shipmentId, "to status:", status, "updatedAt:", new Date().toISOString());
    return await updateShipmentStatus(shipmentId, status, new Date().toISOString());
  };

  return { searchByTrackingNumber, fetchShipments, changeShipmentStatus };
};
