
import { createNotification } from "../api/notificationsService";

export const useNotifications = () => {
  const createNotificationForUser = async (type, message, userId, createdAt, read) => {
      
    if (!userId) return { ok: false, errorMessage: "user ID is required" };

    return await createNotification(type, message, userId, createdAt, read);
  };

  return { createNotificationForUser };
};
