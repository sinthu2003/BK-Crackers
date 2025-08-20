import { useState } from 'react'
import { Product } from '../types'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart, getCartItem, updateQuantity } = useCart()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)

  const cartItem = getCartItem(product.id)
  const inCart = isInCart(product.id)
  const favorite = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 99) {
      if (inCart && cartItem) {
        updateQuantity(product.id, newQuantity)
      } else {
        setQuantity(newQuantity)
      }
    }
  }

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const displayPrice = product.discountedPrice || product.price
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price

  return (
    <div className="group relative bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNewArrival && (
          <span className="bg-garderobe-black text-white text-xs px-2 py-1 uppercase tracking-wider rounded-full">
            New
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-garderobe-red text-white text-xs px-2 py-1 uppercase tracking-wider rounded-full">
            Featured
          </span>
        )}
        {hasDiscount && product.discountPercentage && (
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg 
          className={`w-4 h-4 ${favorite ? 'text-garderobe-red fill-current' : 'text-garderobe-gray-400'}`} 
          fill={favorite ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-garderobe-gray-50">
        {!imageError && product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/1729809/pexels-photo-1729809.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Category */}
        {product.categoryName && (
          <p className="text-xs uppercase tracking-wider text-garderobe-gray-500">
            {product.categoryName}
          </p>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-garderobe-black line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-garderobe-black">
            ₹{displayPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-garderobe-gray-500 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-2">
          {inCart ? (
            <div className="flex-1 flex items-center border border-garderobe-gray-300 rounded-xl overflow-hidden">
              <button
                onClick={() => handleQuantityChange((cartItem?.quantity || 0) - 1)}
                className="px-3 py-2 hover:bg-garderobe-gray-50 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 text-center min-w-[50px]">
                {cartItem?.quantity || 0}
              </span>
              <button
                onClick={() => handleQuantityChange((cartItem?.quantity || 0) + 1)}
                className="px-3 py-2 hover:bg-garderobe-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center border border-garderobe-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-garderobe-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-center min-w-[50px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="px-3 py-2 hover:bg-garderobe-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-garderobe-black text-white py-2 px-4 text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors rounded-xl"
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}