"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Toast {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const newToast = { ...toast, id: Date.now().toString() + Math.random() }
    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ toasts, addToast, removeToast }}>{children}</NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
