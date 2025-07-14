"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { InventoryProvider } from "@/contexts/inventory-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { NotificationCenterProvider } from "@/contexts/notification-center-context"
import { AppShell } from "@/components/app-shell"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Pages that should not use the app shell
  const publicPages = ["/", "/login", "/signup"]
  const isPublicPage = publicPages.includes(pathname)

  // Show loading spinner while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is logged in and not on a public page, use app shell
  if (user && !isPublicPage) {
    return <AppShell>{children}</AppShell>
  }

  // Otherwise, render children directly
  return <>{children}</>
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NotificationProvider>
        <NotificationCenterProvider>
          <AuthProvider>
            <InventoryProvider>
              <LayoutContent>{children}</LayoutContent>
            </InventoryProvider>
          </AuthProvider>
        </NotificationCenterProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
