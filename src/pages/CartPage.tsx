import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const MINIMUM_ORDER_AMOUNT = 500

export default function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else if (quantity <= 99) {
      updateQuantity(productId, quantity)
    }
  }

  const handleProceedToEnquiry = () => {
    if (totalAmount < MINIMUM_ORDER_AMOUNT) {
      alert(`Minimum order amount is ₹${MINIMUM_ORDER_AMOUNT}. Please add more items.`)
      return
    }
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
    } else {
      navigate('/checkout')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-garderobe-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-garderobe-black mb-2">Your Cart is Empty</h2>
            <p className="text-garderobe-gray-600 mb-8">Add some amazing fireworks to your cart!</p>
            <button
              onClick={() => navigate('/quickbuy')}
              className="bg-garderobe-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
          Your Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-garderobe-gray-200">
              <div className="p-4 border-b border-garderobe-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-garderobe-black">
                    Cart Items ({items.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-garderobe-red hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-garderobe-gray-200">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-garderobe-gray-100 flex-shrink-0">
                        {item.product.images && item.product.images[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-garderobe-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-garderobe-black mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-garderobe-gray-600 mb-2">
                          SKU: {item.product.sku}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-garderobe-black">
                              ₹{(item.product.discountedPrice || item.product.price).toFixed(2)}
                            </span>
                            {item.product.discountedPrice && item.product.discountedPrice < item.product.price && (
                              <span className="text-sm text-garderobe-gray-500 line-through">
                                ₹{item.product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-garderobe-gray-300">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-garderobe-gray-50 transition-colors"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 text-center border-l border-r border-garderobe-gray-300 focus:outline-none"
                              min="1"
                              max="99"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-garderobe-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex justify-between items-center">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-sm text-garderobe-red hover:underline"
                          >
                            Remove
                          </button>
                          <span className="font-semibold text-garderobe-black">
                            Total: ₹{item.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enquiry Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-garderobe-gray-200 p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-garderobe-black mb-4 uppercase tracking-wider">
                Enquiry Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-garderobe-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-garderobe-gray-600">Discount</span>
                  <span className="text-green-600">-₹0.00</span>
                </div>
                
                <div className="border-t border-garderobe-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-garderobe-black">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Shipping Note */}
              <div className="bg-garderobe-gray-50 p-4 mb-6 text-sm">
                <p className="text-garderobe-gray-600">
                  <span className="font-semibold">Note:</span> Shipping charges will be decided by the lorry service
                </p>
              </div>
              
              {/* Minimum Order Check */}
              {totalAmount < MINIMUM_ORDER_AMOUNT && (
                <div className="bg-red-50 border border-red-200 p-4 mb-6 text-sm">
                  <p className="text-red-600">
                    Minimum order amount is ₹{MINIMUM_ORDER_AMOUNT}
                  </p>
                  <p className="text-red-600 font-semibold">
                    Add ₹{(MINIMUM_ORDER_AMOUNT - totalAmount).toFixed(2)} more to proceed
                  </p>
                </div>
              )}
              
              {/* Action Buttons */}
              <button
                onClick={handleProceedToEnquiry}
                disabled={totalAmount < MINIMUM_ORDER_AMOUNT}
                className={`w-full py-3 px-4 text-sm uppercase tracking-wider transition-colors mb-3 ${
                  totalAmount >= MINIMUM_ORDER_AMOUNT
                    ? 'bg-garderobe-black text-white hover:bg-garderobe-red'
                    : 'bg-garderobe-gray-300 text-garderobe-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Enquiry
              </button>
              
              <button
                onClick={() => navigate('/quickbuy')}
                className="w-full py-3 px-4 text-sm uppercase tracking-wider border border-garderobe-black text-garderobe-black hover:bg-garderobe-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}