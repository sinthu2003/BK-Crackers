import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Product, Category, Brand } from '../types'
import { productService } from '../services/productService'
import { categoryService } from '../services/categoryService'
import { brandService } from '../services/brandService'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const MINIMUM_ORDER_AMOUNT = 500

export default function QuickBuyPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToCart, updateQuantity, getCartItem, totalAmount } = useCart()
  
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [showCartSummary, setShowCartSummary] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          productService.getAllProducts(1, 200),  // Increased limit to get more products
          categoryService.getAllCategories(),
          brandService.getAllBrands()
        ])
        
        if (productsRes.success) {
          setProducts(productsRes.data.data)
        }
        if (categoriesRes.success) {
          setCategories(categoriesRes.data)
        }
        if (brandsRes.success) {
          setBrands(brandsRes.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Update showCartSummary based on totalAmount
  useEffect(() => {
    setShowCartSummary(totalAmount > 0)
  }, [totalAmount])

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand
      
      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [products, searchTerm, selectedCategory, selectedBrand])

  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {}
    filteredProducts.forEach(product => {
      const category = product.categoryName || 'Uncategorized'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(product)
    })
    return groups
  }, [filteredProducts])

  const handleQuantityChange = (productId: string, value: string) => {
    const qty = parseInt(value) || 0
    if (qty >= 0 && qty <= 99) {
      setQuantities(prev => ({ ...prev, [productId]: qty }))
      
      // Update cart if quantity > 0
      const product = products.find(p => p.id === productId)
      if (product) {
        if (qty > 0) {
          const cartItem = getCartItem(productId)
          if (cartItem) {
            updateQuantity(productId, qty)
          } else {
            addToCart(product, qty)
          }
        } else {
          updateQuantity(productId, 0)
        }
      }
    }
  }

  const handleCheckout = () => {
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

  const calculateAmount = (product: Product, quantity: number) => {
    const price = product.discountedPrice || product.price
    return price * quantity
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
          Quick Buy
        </h1>
        
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
          />
          
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-garderobe-black"></div>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-garderobe-black text-white">
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-left">S.No</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-left">Code</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-left">Brand</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-left">Pack Type</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-center">Pieces</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-right">Price</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-right">After Discount</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-center">Qty</th>
                  <th className="border border-garderobe-gray-300 px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                  <>
                    <tr key={`category-${category}`}>
                      <td colSpan={11} className="bg-garderobe-gray-100 px-4 py-2 font-semibold text-garderobe-black uppercase">
                        {category}
                      </td>
                    </tr>
                    {categoryProducts.map((product, index) => {
                      const cartItem = getCartItem(product.id)
                      const quantity = cartItem?.quantity || quantities[product.id] || 0
                      const hasDiscount = product.discountedPrice && product.discountedPrice < product.price
                      
                      return (
                        <tr key={product.id} className="hover:bg-garderobe-gray-50">
                          <td className="border border-garderobe-gray-300 px-4 py-2">{index + 1}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2">{product.sku}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2">{product.name}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2">{product.brandName || '-'}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2">{product.categoryName || '-'}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2">{product.packType || '-'}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2 text-center">{product.pieces || '-'}</td>
                          <td className="border border-garderobe-gray-300 px-4 py-2 text-right">
                            ₹{product.price.toFixed(2)}
                          </td>
                          <td className="border border-garderobe-gray-300 px-4 py-2 text-right">
                            {hasDiscount ? (
                              <span className="text-green-600 font-semibold">
                                ₹{product.discountedPrice!.toFixed(2)}
                              </span>
                            ) : (
                              <span>₹{product.price.toFixed(2)}</span>
                            )}
                          </td>
                          <td className="border border-garderobe-gray-300 px-4 py-2">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleQuantityChange(product.id, String(Math.max(0, quantity - 1)))}
                                className="px-2 py-1 border border-garderobe-gray-300 hover:bg-garderobe-gray-100"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                className="w-16 px-2 py-1 border-t border-b border-garderobe-gray-300 text-center focus:outline-none"
                                min="0"
                                max="99"
                              />
                              <button
                                onClick={() => handleQuantityChange(product.id, String(Math.min(99, quantity + 1)))}
                                className="px-2 py-1 border border-garderobe-gray-300 hover:bg-garderobe-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="border border-garderobe-gray-300 px-4 py-2 text-right font-semibold">
                            {quantity > 0 ? `₹${calculateAmount(product, quantity).toFixed(2)}` : '-'}
                          </td>
                        </tr>
                      )
                    })}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Floating Cart Summary */}
        {showCartSummary && (
          <div className="fixed bottom-4 right-4 bg-white border-2 border-garderobe-black shadow-lg p-6 rounded-lg z-40 max-w-sm">
            <h3 className="text-lg font-bold text-garderobe-black mb-4 uppercase tracking-wider">
              Cart Summary
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
              </div>
              
              {totalAmount < MINIMUM_ORDER_AMOUNT && (
                <div className="text-sm text-red-600">
                  Minimum order: ₹{MINIMUM_ORDER_AMOUNT}
                  <br />
                  Add ₹{(MINIMUM_ORDER_AMOUNT - totalAmount).toFixed(2)} more
                </div>
              )}
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={totalAmount < MINIMUM_ORDER_AMOUNT}
              className={`w-full py-2 px-4 text-sm uppercase tracking-wider transition-colors ${
                totalAmount >= MINIMUM_ORDER_AMOUNT
                  ? 'bg-garderobe-black text-white hover:bg-garderobe-red'
                  : 'bg-garderobe-gray-300 text-garderobe-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Enquiry
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}