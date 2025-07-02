"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Edit } from "lucide-react"
import { getAccessToken, getStore, getUser } from "@/lib/storage"

export default function DashboardPage() {
  const router = useRouter()
  const store = getStore()
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [error, setError] = useState("")
  const token = getAccessToken()

  useEffect(() => {
    if (!store) return
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`/api/stores/${store._id}/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
        setDashboardData(res.data.data)
      } catch (err: any) {
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [store])

  const statCards = dashboardData
    ? [
      {
        name: "Total Products",
        value: dashboardData.totalProducts.count,
        icon: Package,
        change: `${dashboardData.totalProducts.increment >= 0 ? "+" : ""}${dashboardData.totalProducts.increment} this week`,
        color: "text-blue-600",
      },
      {
        name: "Total Orders",
        value: dashboardData.totalOrders.count,
        icon: ShoppingCart,
        change: `${dashboardData.totalOrders.increment >= 0 ? "+" : ""}${dashboardData.totalOrders.increment} today`,
        color: "text-green-600",
      },
      {
        name: "Customers",
        value: dashboardData.customers.count,
        icon: Users,
        change: `${dashboardData.customers.increment >= 0 ? "+" : ""}${dashboardData.customers.increment} this week`,
        color: "text-purple-600",
      },
      {
        name: "Revenue",
        value: `₦${parseFloat(dashboardData.revenue.amount).toLocaleString()}`,
        icon: TrendingUp,
        change: `${dashboardData.revenue.percentageChange}% this month`,
        color: "text-yellow-600",
      },
    ]
    : []

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
          </div>
          {store ? (
            <Link href="/dashboard/products/add">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          ) : (
            <Link href="/auth/create-store">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Store
              </Button>
            </Link>
          )}
        </div>

        {/* Stats */}
        {loading ? (
          <p className="text-gray-500">Loading stats...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => {
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
        )}

        {/* Recent Orders & Top Products remain as mock */}
        {/* ... Keep your existing recentOrders and topProducts display below ... */}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {/* <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Edit className="h-6 w-6 mb-2" />
                  Store Settings
                </Button>
              </Link> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
