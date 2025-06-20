"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  BarChart3,
  Users,
  Menu,
  X,
  LogOut,
  Store,
  Plus,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Add Product", href: "/dashboard/products/add", icon: Plus },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  // { name: "Customers", href: "/dashboard/customers", icon: Users },
  // { name: "Store Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Parcel</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-6 px-3">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-colors ${isActive
                        ? "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Store Dashboard</span>
            </div>
          </div>
          <nav className="mt-6 flex-1 px-3">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-colors ${isActive
                      ? "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-gray-600">{user?.name?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-gray-700 border-gray-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <p className="hidden lg:block text-gray-600">Hi, User!</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start text-gray-700 border-gray-300 lg:hidden"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
