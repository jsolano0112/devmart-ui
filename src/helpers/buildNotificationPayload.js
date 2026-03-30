export const buildNotificationPayload = (status, trackingId) => {
  const statusLower = status.toLowerCase(); // Normalizamos una sola vez
  const type = `shipment.${statusLower}`;
  
  // Mensaje por defecto si no entra en los casos específicos
  let message = `El envío ${trackingId} cambió su estado a ${status}`;

  if (statusLower === 'pendiente') {
    message = `Orden creada, esperando procesamiento.`;
  } else if (statusLower === 'preparando') {
    message = `Orden en preparación.`;
  } else if (statusLower === 'en_transito') {
    message = `Enviado, en camino al destino.`;
  } else if (statusLower === 'en_entrega') {
    message = `En vehículo de reparto para entrega.`;
  } else if (statusLower === 'entregado') {
    message = `Confirmado recibido por el cliente.`;
  } else if (statusLower === 'cancelado') {
    message = `Orden cancelada por cliente o admin.`;
  }

  return { type, message };
};