import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types'
import { productService } from '../services/productService'
import ProductCard from './ProductCard'

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // First try to get new arrivals
        const newResponse = await productService.getNewArrivals(4)

        // If no new arrivals, get regular products
        if (!newResponse.success || newResponse.data.length === 0) {
          console.log('No new arrivals found, fetching regular products...')
          const allResponse = await productService.getAllProducts(1, 8)
          if (allResponse.success && allResponse.data.data) {
            setProducts(allResponse.data.data.slice(4, 8))
          }
        } else {
          setProducts(newResponse.data)
        }
      } catch (error) {
        console.error('Failed to fetch new arrivals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="min-h-[990px] bg-garderobe-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-garderobe-black mb-4">
            NEW ARRIVALS
          </h2>
          <div className="w-20 h-[2px] bg-garderobe-red mx-auto mb-4"></div>
          <p className="text-garderobe-gray-600 max-w-2xl mx-auto">
            Latest additions to our premium collection
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-garderobe-gray-200 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-garderobe-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-garderobe-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-garderobe-gray-500">No new arrivals at the moment. Check back soon!</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/quickbuy"
            className="inline-block bg-garderobe-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-garderobe-red transition-colors rounded-xl"
          >
            Shop All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  )
}