import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(undefined);

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Call this from ANY page/component to push a live notification.
  // type: "info" | "success" | "warning" | "error"
  const addNotification = useCallback((message, type = "info") => {
    idCounter += 1;
    const notification = { id: idCounter, message, type, time: new Date(), read: false };
    setNotifications((prev) => [notification, ...prev].slice(0, 30));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllRead, clearAll, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return ctx;
}
