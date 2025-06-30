"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Form validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const requestData = { email, password };

      const response = await axios.post("/api/stores/owner/signin", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      // Check for store existence
      if (!response.data.data.store) {
        router.push("/auth/create-store");
        return;
      }

      // Save auth data with store info
      localStorage.setItem("loginResponse", JSON.stringify(response.data));
      router.push("/dashboard/");
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Login failed";
        setError(errorMessage);
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };


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
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome back</CardTitle>
            <CardDescription className="text-gray-600">Sign in to your account to continue</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            {/* <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 space-y-2">
                <p className="font-medium">Demo accounts:</p>
                <p>Store Owner: store@example.com / password</p>
                <p>Customer: customer@example.com / password</p>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}