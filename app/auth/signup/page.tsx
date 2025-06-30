"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "customer" | "store_owner" | ""
  })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Form validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // Prepare the data for API call
      const requestData = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }

      // Make API call
      const response = await axios.post('/api/stores/owner/create', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Handle successful response
      if (response.data) {
        // Save token to localStorage if provided
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token)
        }

        // Save user data to localStorage
        if (response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user))
        }

        // Save the entire response data if needed
        localStorage.setItem('signupResponse', JSON.stringify(response.data))

        // Success - redirect based on role
        if (formData.role === 'store_owner') {
          router.push('/dashboard/store')
        } else {
          router.push('/dashboard/customer')
        }
      }

    } catch (error: any) {
      // Handle API errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Registration failed'
        setError(errorMessage)
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection and try again.')
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.')
      }
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* <div className="mb-8">
          <Link href="/stores" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to stores
          </Link>
        </div> */}

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-sm"></div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create account</CardTitle>
            <CardDescription className="text-gray-600">Join ParcelShop and start shopping or selling</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Account type
                </label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "customer" | "store_owner") => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer - Shop from stores</SelectItem>
                    <SelectItem value="store_owner">Store Owner - Sell products</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password"
                    className="pl-10 pr-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}