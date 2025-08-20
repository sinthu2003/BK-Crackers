import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useFavorites } from '../contexts/FavoritesContext'

export default function MyFavoritesPage() {
  const navigate = useNavigate()
  const { favorites, totalValue } = useFavorites()

  return (
    <div className="min-h-screen bg-garderobe-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-garderobe-black uppercase tracking-wider">
            My Favorites
          </h1>
          <p className="text-garderobe-gray-600 mt-2">Items you've saved for later</p>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-garderobe-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-garderobe-black mb-2">No Favorites Yet</h2>
            <p className="text-garderobe-gray-600 mb-8">Start adding products to your favorites!</p>
            <button
              onClick={() => navigate('/quickbuy')}
              className="bg-garderobe-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Summary Card */}
            <div className="bg-white border border-garderobe-gray-200 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-garderobe-gray-600">Total Favorites</p>
                  <p className="text-2xl font-bold text-garderobe-black">{favorites.length} items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-garderobe-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-garderobe-black">₹{totalValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {/* Favorite Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/quickbuy')}
                className="px-8 py-3 border border-garderobe-black text-garderobe-black text-sm uppercase tracking-wider hover:bg-garderobe-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  )
}