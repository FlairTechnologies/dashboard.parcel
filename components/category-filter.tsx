"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Smartphone, Shirt, Home, Heart, Dumbbell, Filter } from "lucide-react"

const categories = [
  { id: "all", label: "All Stores", icon: ShoppingBag, count: 500 },
  { id: "groceries", label: "Groceries", icon: ShoppingBag, count: 120 },
  { id: "electronics", label: "Electronics", icon: Smartphone, count: 85 },
  { id: "fashion", label: "Fashion", icon: Shirt, count: 95 },
  { id: "home", label: "Home & Garden", icon: Home, count: 75 },
  { id: "health", label: "Health & Beauty", icon: Heart, count: 65 },
  { id: "sports", label: "Sports", icon: Dumbbell, count: 45 },
]

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Shop by Category</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isSelected
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm"
                  : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:border-yellow-400"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{category.label}</span>
              <Badge
                variant="secondary"
                className={`ml-1 ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                {category.count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </section>
  )
}
