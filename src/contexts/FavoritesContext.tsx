import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../types'

interface FavoritesContextType {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
  totalValue: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const FAVORITES_STORAGE_KEY = 'bk-crackers-favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (stored) {
      try {
        const storedFavorites = JSON.parse(stored)
        setFavorites(storedFavorites)
      } catch (error) {
        console.error('Failed to load favorites:', error)
        localStorage.removeItem(FAVORITES_STORAGE_KEY)
      }
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } else {
      localStorage.removeItem(FAVORITES_STORAGE_KEY)
    }
  }, [favorites])

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(item => item.id === product.id)
      if (exists) {
        return prevFavorites
      }
      return [...prevFavorites, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== productId)
    )
  }

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId)
  }

  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem(FAVORITES_STORAGE_KEY)
  }

  const totalValue = favorites.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price),
    0
  )

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites,
      totalValue,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}