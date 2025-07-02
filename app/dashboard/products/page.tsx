"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { getAccessToken, getUser } from "@/lib/storage"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  type Product = {
    _id: string
    descr?: string
    price: string | number
    imgs?: string[]
    inStock?: boolean
    discount?: number
    discountPrice?: string | number
    store?: any
  }

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const store = getUser()
  const token = getAccessToken()

  // Get storeId from somewhere (props, context, or route params)
  const storeId = store?.id // Replace with actual storeId

  useEffect(() => {
    const fetchProducts = async () => {

      try {
        setLoading(true)
        const response = await axios.get(`/api/products/stores/${storeId}`, { headers: { Authorization: `Bearer ${token}` } })


        if (response.status === 200) {
          setProducts(response.data.data)
        } else {
          setError(response.data || "Failed to fetch products")
        }
      } catch (err) {
        setError("An error occurred while fetching products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [storeId])

  const filteredProducts = products.filter((product) =>
    product.descr?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Transform API data to match component expectations
  const transformProduct = (product: any) => ({
    id: product._id,
    name: product.descr || "Unnamed Product",
    price: parseFloat(product.price) || 0,
    image: product.imgs?.[0] || "/placeholder.svg",
    inStock: product.inStock,
    discount: product.discount,
    discountPrice: parseFloat(product.discountPrice) || 0,
    store: product.store
  })

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Products</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

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
          {filteredProducts.map((product) => {
            const transformedProduct = transformProduct(product)
            const finalPrice = transformedProduct.discount > 0 ? transformedProduct.discountPrice : transformedProduct.price

            return (
              <Card key={transformedProduct.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={transformedProduct.image}
                    alt={transformedProduct.name}
                    fill
                    className="object-cover"
                    onError={(e: any) => {
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={`${transformedProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transformedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  {transformedProduct.discount > 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white">
                        -{transformedProduct.discount}%
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {transformedProduct.name}
                  </h3>
                  <div className="mb-4">
                    {transformedProduct.discount > 0 ? (
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          ₦{finalPrice.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₦{transformedProduct.price.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-gray-900">
                        ₦{transformedProduct.price.toLocaleString()}
                      </p>
                    )}
                  </div>

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
            )
          })}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? "No products found" : "No products yet"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? "Try adjusting your search or add a new product."
                  : "Start by adding your first product to your store."
                }
              </p>
              <Link href="/dashboard/products/add">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  {searchQuery ? "Add Product" : "Add Your First Product"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}