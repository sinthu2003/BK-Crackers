import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '../types'

interface CartContextType {
  items: CartItem[]
  totalAmount: number
  totalItems: number
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getCartItem: (productId: string) => CartItem | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'bk-crackers-cart'
const CART_EXPIRY_HOURS = 24

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        try {
          const { items: storedItems, expiry } = JSON.parse(stored)
          if (new Date().getTime() < expiry) {
            setItems(storedItems)
          } else {
            localStorage.removeItem(CART_STORAGE_KEY)
          }
        } catch (error) {
          console.error('Failed to load cart:', error)
          localStorage.removeItem(CART_STORAGE_KEY)
        }
      }
    }
    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      const expiry = new Date().getTime() + (CART_EXPIRY_HOURS * 60 * 60 * 1000)
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, expiry }))
    } else {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [items])

  const addToCart = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id)
      
      if (existingItem) {
        // Update quantity if item exists
        const newQuantity = Math.min(existingItem.quantity + quantity, 99)
        const amount = (product.discountedPrice || product.price) * newQuantity
        
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity, amount }
            : item
        )
      } else {
        // Add new item
        const amount = (product.discountedPrice || product.price) * quantity
        return [...prevItems, { product, quantity, amount }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.min(quantity, 99)
          const amount = (item.product.discountedPrice || item.product.price) * newQuantity
          return { ...item, quantity: newQuantity, amount }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const isInCart = (productId: string) => {
    return items.some(item => item.product.id === productId)
  }

  const getCartItem = (productId: string) => {
    return items.find(item => item.product.id === productId)
  }

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      totalAmount,
      totalItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getCartItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}