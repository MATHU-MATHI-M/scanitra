"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationCenterContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationCenterContext = createContext<NotificationCenterContextType | undefined>(undefined)

// Sample initial notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Low Stock Alert",
    message: "Organic Apples running low (5 units remaining). Consider reordering soon.",
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Receipt Processed",
    message: "Receipt from Supplier ABC processed successfully. 12 items added to inventory.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Voice Entry Completed",
    message: "Added 50 units of Fresh Bread via voice command. Items are now available in inventory.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: true,
  },
  {
    id: "4",
    type: "warning",
    title: "Expiry Alert",
    message: "Dairy products (Fresh Milk, Cheese) expiring in 2 days. Check inventory for details.",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: false,
  },
  {
    id: "5",
    type: "success",
    title: "Inventory Updated",
    message: "Successfully updated 25 items in Raw Materials category. All changes saved.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
  },
]

export function NotificationCenterProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Auto-add notifications periodically for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      const demoNotifications = [
        {
          type: "info" as const,
          title: "System Update",
          message: "Scanitra has been updated with new features and improvements.",
        },
        {
          type: "warning" as const,
          title: "Stock Alert",
          message: "Multiple items are running low. Check inventory for details.",
        },
        {
          type: "success" as const,
          title: "Backup Complete",
          message: "Daily backup completed successfully. Your data is safe.",
        },
      ]

      const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)]

      // Only add if there are fewer than 10 notifications
      if (notifications.length < 10) {
        addNotification(randomNotification)
      }
    }, 60000) // Add a notification every minute

    return () => clearInterval(interval)
  }, [notifications.length])

  return (
    <NotificationCenterContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationCenterContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationCenterContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationCenterProvider")
  }
  return context
}
