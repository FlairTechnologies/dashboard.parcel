"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "customer" | "store_owner"
  storeId?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, role: "customer" | "store_owner") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: "user-1",
        email,
        name: email.split("@")[0],
        role: email.includes("store") ? "store_owner" : "customer",
        storeId: email.includes("store") ? "store-1" : undefined,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: "customer" | "store_owner",
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password && name) {
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role,
        storeId: role === "store_owner" ? `store-${Date.now()}` : undefined,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
