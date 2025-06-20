"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Search, Menu, X, User, Heart, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
              <span>Free delivery on orders above ₦5,000</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/help" className="hover:text-gray-900 transition-colors">
                Help
              </Link>
              <Link href="/track" className="hover:text-gray-900 transition-colors">
                Track Order
              </Link>
            </div>
          </div>

          {/* Main navigation */}
          <div className="flex items-center justify-between py-4">
            <Link href="/stores" className="flex items-center group">
              <div>
                <Package className="text-yellow-500" size={40}/>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">Parcel</span>
                {/* <div className="text-xs text-gray-500 -mt-1">Your Local Market</div> */}
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for stores, products, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 bg-white transition-all"
                />
                {searchQuery && (
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Search
                  </Button>
                )}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Mobile search */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link href="/cart" className="flex flex-row items-center ">
                <Button variant="ghost" size="icon" className="relative w-10">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-yellow-500 text-white text-xs font-semibold">
                      {cartItemCount}
                    </Badge>
                  )}
                  
                </Button>
                <p>Cart</p>
              </Link>

            </div>
          </div>

        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="text" placeholder="Search..." className="pl-10 rounded-lg border-gray-300" />
              </div>
            </div>

            {/* Mobile navigation */}
            {/* <nav className="space-y-4">
              <Link href="/stores" className="block py-2 text-gray-700 hover:text-yellow-600 font-medium">
                All Stores
              </Link>
              <Link href="/stores?category=groceries" className="block py-2 text-gray-700 hover:text-yellow-600">
                Groceries
              </Link>
              <Link href="/stores?category=electronics" className="block py-2 text-gray-700 hover:text-yellow-600">
                Electronics
              </Link>
              <Link href="/stores?category=fashion" className="block py-2 text-gray-700 hover:text-yellow-600">
                Fashion
              </Link>
              <Link href="/stores?category=home" className="block py-2 text-gray-700 hover:text-yellow-600">
                Home & Garden
              </Link>
              <Link href="/cart" className="block py-2 text-gray-700 hover:text-yellow-600">
                Cart ({cartItemCount})
              </Link>
              <Link href="/wishlist" className="block py-2 text-gray-700 hover:text-yellow-600">
                Wishlist
              </Link>
              <Link href="/orders" className="block py-2 text-gray-700 hover:text-yellow-600">
                My Orders
              </Link>
              <Link href="/help" className="block py-2 text-gray-700 hover:text-yellow-600">
                Help & Support
              </Link>
            </nav> */}

            {/* <div className="mt-8 pt-6 border-t">
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">Sign In</Button>
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}
