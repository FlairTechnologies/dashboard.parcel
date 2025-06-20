"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save the product to your database
    console.log("Product data:", formData)

    setIsLoading(false)
    router.push("/dashboard/products")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product for your store</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder="Product SKU"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your product..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="health">Health & Beauty</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    placeholder="Available quantity"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Set your product pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦) *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload images of your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload product images</h3>
                <p className="text-gray-600 mb-4">Drag and drop your images here, or click to browse</p>
                <Button variant="outline">Choose Files</Button>
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Product dimensions and weight for shipping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions (L x W x H cm)
                  </label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange("dimensions", e.target.value)}
                    placeholder="e.g., 20 x 15 x 10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/dashboard/products">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
