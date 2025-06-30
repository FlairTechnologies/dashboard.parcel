"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store, Package, MapPin, Building, FileText, ArrowLeft } from "lucide-react"
import { getAccessToken } from "@/lib/storage"

export default function CreateStorePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        mainGood: "",
        address: {
            city: "",
            state: "",
            address: ""
        },
        descr: ""
    })

    const router = useRouter()

    // Nigerian states for the dropdown
    const nigerianStates = [
        "Abia", "Adamawa", "AkwaIbom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
        "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
        "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
        "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
        "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
    ]

    // Common product categories
    const productCategories = [
        "clothes", "electronics", "food", "books", "shoes", "accessories",
        "home & garden", "health & beauty", "sports", "toys", "automotive", "jewelry"
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Form validation
        if (!formData.name || !formData.mainGood || !formData.address.city ||
            !formData.address.state || !formData.address.address || !formData.descr) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        if (formData.name.length < 2) {
            setError("Store name must be at least 2 characters long")
            setIsLoading(false)
            return
        }

        if (formData.descr.length < 10) {
            setError("Store description must be at least 10 characters long")
            setIsLoading(false)
            return
        }

        try {
            // Get auth token from localStorage
            const authToken = getAccessToken()

            // Prepare the data for API call
            const requestData = {
                name: formData.name,
                mainGood: formData.mainGood,
                address: {
                    city: formData.address.city,
                    state: formData.address.state,
                    address: formData.address.address
                },
                descr: formData.descr
            }

            // Make API call
            const response = await axios.post('/api/stores', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(authToken && { 'Authorization': `Bearer ${authToken}` })
                }
            })

            // Handle successful response
            if (response.data) {
                // Save the entire response data if needed
                localStorage.setItem('createStoreResponse', JSON.stringify(response.data))

                // Success - redirect to store dashboard
                router.push('/dashboard')
            }

        } catch (error: any) {
            // Handle API errors
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to create store'
                setError(errorMessage)
            } else if (error.request) {
                // Request was made but no response received
                setError('Network error. Please check your connection and try again.')
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.')
            }
            console.error('Create store error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div onClick={() => router.back()} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back To Previous Page
                    </div>
                </div>

                <Card className="shadow-lg border-0">
                    <CardHeader className="text-center pb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Create Your Store</CardTitle>
                        <CardDescription className="text-gray-600">Set up your store and start selling on ParcelShop</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Store Name
                                </label>
                                <div className="relative">
                                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your store name"
                                        className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="mainGood" className="block text-sm font-medium text-gray-700 mb-2">
                                    Main Product Category
                                </label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                                    <Select
                                        value={formData.mainGood}
                                        onValueChange={(value) => setFormData({ ...formData, mainGood: value })}
                                    >
                                        <SelectTrigger className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                                            <SelectValue placeholder="Select main product category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productCategories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Store Address</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="city"
                                                type="text"
                                                value={formData.address.city}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    address: { ...formData.address, city: e.target.value }
                                                })}
                                                placeholder="Enter city"
                                                className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                            State
                                        </label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                                            <Select
                                                value={formData.address.state}
                                                onValueChange={(value) => setFormData({
                                                    ...formData,
                                                    address: { ...formData.address, state: value }
                                                })}
                                            >
                                                <SelectTrigger className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                                                    <SelectValue placeholder="Select state" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {nigerianStates.map((state) => (
                                                        <SelectItem key={state} value={state}>
                                                            {state}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Textarea
                                            id="address"
                                            value={formData.address.address}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                address: { ...formData.address, address: e.target.value }
                                            })}
                                            placeholder="Enter complete street address"
                                            className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400 min-h-[80px]"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="descr" className="block text-sm font-medium text-gray-700 mb-2">
                                    Store Description
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Textarea
                                        id="descr"
                                        value={formData.descr}
                                        onChange={(e) => setFormData({ ...formData, descr: e.target.value })}
                                        placeholder="Describe your store and what you sell..."
                                        className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400 min-h-[120px]"
                                        required
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Tell customers about your store, products, and what makes you special.
                                </p>
                            </div>

                            {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium"
                            >
                                {isLoading ? "Creating store..." : "Create Store"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                By creating a store, you agree to our{" "}
                                <Link href="/terms" className="text-yellow-600 hover:text-yellow-700 font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700 font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}