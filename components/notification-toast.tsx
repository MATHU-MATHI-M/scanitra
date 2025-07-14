"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { useNotification } from "@/contexts/notification-context"

interface Toast {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  duration?: number
}

interface NotificationToastProps {
  toast: Toast
}

export function NotificationToast({ toast }: NotificationToastProps) {
  const { removeToast } = useNotification()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, removeToast])

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBorderColor = () => {
    switch (toast.type) {
      case "success":
        return "border-l-green-500"
      case "warning":
        return "border-l-yellow-500"
      case "error":
        return "border-l-red-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <Card className={`w-80 shadow-lg border-l-4 ${getBorderColor()} animate-in slide-in-from-right`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{toast.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{toast.message}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeToast(toast.id)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Toast Container Component
export function ToastContainer() {
  const { toasts } = useNotification()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <NotificationToast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
