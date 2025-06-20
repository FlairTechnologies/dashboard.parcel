"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your store's product inventory</p>
          </div>
          <Link href="/dashboard/products/add">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 mb-4">₦{product.price.toLocaleString()}</p>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or add a new product.</p>
              <Link href="/dashboard/products/add">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
