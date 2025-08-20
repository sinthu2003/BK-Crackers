import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { categoriesService } from '../services/categoriesService'

interface Category {
  id: string
  name: string
  image: string
  productCount: number
  description?: string
}

export default function CategoriesPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    const response = await categoriesService.getCategories()
    if (response.success) {
      setCategories(response.data)
    }
    setLoading(false)
  }

  const handleCategoryClick = (_categoryId: string, categoryName: string) => {
    // Navigate to QuickBuy with category filter
    navigate(`/quickbuy?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="min-h-screen bg-garderobe-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-garderobe-black mb-2 text-center uppercase tracking-wider">
          Shop by Categories
        </h1>
        <p className="text-center text-garderobe-gray-600 mb-12">
          Explore our wide range of fireworks and crackers
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white border border-garderobe-gray-200 rounded-lg p-6 animate-pulse">
                <div className="bg-garderobe-gray-200 h-32 rounded mb-4"></div>
                <div className="bg-garderobe-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-garderobe-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-garderobe-gray-600">No categories available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="bg-white border border-garderobe-gray-200 rounded-lg p-6 hover:border-garderobe-black transition-colors cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded mb-4 bg-garderobe-gray-100 h-32 flex items-center justify-center">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <svg className="w-16 h-16 text-garderobe-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-garderobe-black mb-2 group-hover:text-garderobe-red transition-colors">
                  {category.name}
                </h3>
                
                {category.description && (
                  <p className="text-sm text-garderobe-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-garderobe-gray-500">
                    {category.productCount} Products
                  </span>
                  <span className="text-garderobe-red text-sm font-medium group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Popular Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-garderobe-black mb-8 text-center">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Sparklers', 'Ground Chakkars', 'Flower Pots', 'Rockets', 'Bombs', 'Fancy Items', 'Gift Boxes', 'Kids Special'].map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/quickbuy?category=${encodeURIComponent(cat)}`)}
                className="px-6 py-3 border border-garderobe-gray-300 text-garderobe-black text-sm hover:border-garderobe-black hover:bg-garderobe-black hover:text-white transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}