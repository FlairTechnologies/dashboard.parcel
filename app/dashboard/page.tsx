"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { getStore, getStoreName } from "@/lib/storage"

export default function DashboardPage() {
  const router = useRouter()
  const store = getStore()

  const stats = [
    { name: "Total Products", value: "24", icon: Package, change: "+2 this week", color: "text-blue-600" },
    { name: "Total Orders", value: "156", icon: ShoppingCart, change: "+12 today", color: "text-green-600" },
    { name: "Customers", value: "89", icon: Users, change: "+5 this week", color: "text-purple-600" },
    { name: "Revenue", value: "₦45,230", icon: TrendingUp, change: "+8% this month", color: "text-yellow-600" },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "₦2,500", status: "Delivered", time: "2 hours ago" },
    { id: "ORD-002", customer: "Jane Smith", amount: "₦1,800", status: "Processing", time: "4 hours ago" },
    { id: "ORD-003", customer: "Mike Johnson", amount: "₦3,200", status: "Shipped", time: "6 hours ago" },
  ]

  const topProducts = [
    { name: "Rice (5kg)", sales: 45, revenue: "₦112,500" },
    { name: "Vegetable Oil (1L)", sales: 32, revenue: "₦38,400" },
    { name: "Pasta Pack", sales: 28, revenue: "₦23,800" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, User! Here's what's happening with your store.</p>
          </div>
          {store ?
            (<Link href="/dashboard/products/add">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>)
            :
            (
              <Link href="/auth/create-store">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Store
                </Button>
              </Link>
            )}

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/orders">
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Your best-selling products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-yellow-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/products">
                  <Button variant="outline" className="w-full">
                    Manage Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/products/add">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  Add New Product
                </Button>
              </Link>
              <Link href="/dashboard/orders">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Eye className="h-6 w-6 mb-2" />
                  View Orders
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Edit className="h-6 w-6 mb-2" />
                  Store Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
