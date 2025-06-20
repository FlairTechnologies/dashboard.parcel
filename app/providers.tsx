"use client"

import type { ReactNode } from "react"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
