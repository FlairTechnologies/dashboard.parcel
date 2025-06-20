import type { Store, Product } from "./types"

export const stores: Store[] = [
  {
    id: "store-1",
    name: "Everyday Groceries",
    description: "Groceries, Household Items",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "store-2",
    name: "Fresh Farms Market",
    description: "Fresh Produce, Organic Foods",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "store-3",
    name: "Quick Mart",
    description: "Convenience Store, Snacks",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "store-4",
    name: "Tech Haven",
    description: "Electronics, Gadgets",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "store-5",
    name: "Fashion Hub",
    description: "Clothing, Accessories",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "store-6",
    name: "Home Essentials",
    description: "Furniture, Decor",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export const products: Product[] = [
  {
    id: "product-1",
    storeId: "store-1",
    name: "Rice (5kg)",
    price: 2500,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-2",
    storeId: "store-1",
    name: "Vegetable Oil (1L)",
    price: 1200,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-3",
    storeId: "store-1",
    name: "Pasta Pack",
    price: 850,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-4",
    storeId: "store-1",
    name: "Laundry Detergent",
    price: 1500,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-5",
    storeId: "store-1",
    name: "Toilet Paper (6 rolls)",
    price: 1800,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-6",
    storeId: "store-1",
    name: "Dish Soap",
    price: 750,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-7",
    storeId: "store-2",
    name: "Fresh Tomatoes (1kg)",
    price: 1200,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-8",
    storeId: "store-2",
    name: "Organic Bananas (bunch)",
    price: 800,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-9",
    storeId: "store-2",
    name: "Carrots (500g)",
    price: 500,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-10",
    storeId: "store-2",
    name: "Organic Eggs (dozen)",
    price: 1500,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-11",
    storeId: "store-2",
    name: "Fresh Milk (1L)",
    price: 1100,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "product-12",
    storeId: "store-2",
    name: "Organic Honey (500ml)",
    price: 2200,
    image: "/placeholder.svg?height=200&width=200",
  },
]
