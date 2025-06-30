"use client"

import type React from "react"
import axios from "axios"
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
import { getAccessToken, getStore, getUserId } from "@/lib/storage"

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  // You'll need to get the storeId from somewhere (props, context, or route params)
  const store = getStore()
  const token = getAccessToken()

  const [formData, setFormData] = useState({
    price: "",
    discount: "0",
    descr: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Prepare data according to API format
      const apiData = {
        price: formData.price,
        discount: parseInt(formData.discount) || 0,
        descr: formData.descr,
        imgs: uploadedImages.length > 0 ? uploadedImages : [],
      }

      // Make API call
      const response = await axios.post(`/api/products/${store?._id}`, apiData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
      )

      console.log("Product created successfully:", response.data)

      // Redirect to products page on success
      router.push("/dashboard/products")

    } catch (err: any) {
      console.error("Error creating product:", err)
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to create product. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle file upload to Cloudinary
 const handleImageUpload = async (files: FileList) => {
  setIsUploading(true)
  setError(null)

  try {
    const uploadPreset = "ecommerce_preset" // ⚠️ replace with actual preset
    const cloudName = "kamounation"

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000, // optional: fail gracefully if it takes too long
        }
      )

      return response.data.secure_url
    })

    const uploadedUrls = await Promise.all(uploadPromises)
    setUploadedImages(prev => [...prev, ...uploadedUrls])
  } catch (err: any) {
    console.error("Error uploading images:", err)

    if (err.response) {
      console.error("Cloudinary error response:", err.response.data)
      setError(`Upload failed: ${err.response.data.error?.message || 'Unknown error'}`)
    } else {
      setError("Failed to upload images. Please try again.")
    }
  } finally {
    setIsUploading(false)
  }
}


  // Remove uploaded image
  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove))
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Essential details about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="descr" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description *
                </label>
                <Textarea
                  id="descr"
                  value={formData.descr}
                  onChange={(e) => handleInputChange("descr", e.target.value)}
                  placeholder="Describe your product..."
                  rows={4}
                  required
                />
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
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => handleInputChange("discount", e.target.value)}
                    placeholder="0"
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
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="hidden"
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Choose Files"}
                </Button>
              </div>

              {/* Display uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Uploaded images:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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