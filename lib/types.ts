export interface Store {
  id: string
  name: string
  description: string
  image: string
}

export interface Product {
  id: string
  storeId: string
  name: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
  storeName: string
}
