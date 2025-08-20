import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'

export default function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()
  const { favorites } = useFavorites()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setShowProfileDropdown(false)
    navigate('/')
  }

  return (
    <header className="h-[65px] bg-white border-b border-garderobe-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and Business Name */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-garderobe-red rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">BK</span>
          </div>
          <span className="text-xl font-bold text-garderobe-black tracking-wider uppercase">
            BK Crackers
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8 ml-12">
          <Link 
            to="/" 
            className="text-sm uppercase tracking-wider text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/quickbuy" 
            className="relative text-sm uppercase tracking-wider text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            <span className="relative">
              QuickBuy
              <span className="absolute -top-1 -right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-garderobe-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-garderobe-red"></span>
              </span>
            </span>
          </Link>
          <Link 
            to="/categories" 
            className="text-sm uppercase tracking-wider text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            Categories
          </Link>
          <Link 
            to="/about" 
            className="text-sm uppercase tracking-wider text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-sm uppercase tracking-wider text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <button 
            onClick={() => navigate('/quickbuy')}
            className="text-garderobe-black hover:text-garderobe-red transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Favorites Icon */}
          <Link 
            to="/favorites" 
            className="relative text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-garderobe-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="relative text-garderobe-black hover:text-garderobe-red transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-garderobe-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 text-garderobe-black hover:text-garderobe-red transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {isAuthenticated && user?.name && (
                <span className="text-sm hidden lg:block">{user.name}</span>
              )}
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-garderobe-gray-200 shadow-lg">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/my-profile"
                      className="block px-4 py-3 text-sm text-garderobe-black hover:bg-garderobe-gray-50 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-enquiries"
                      className="block px-4 py-3 text-sm text-garderobe-black hover:bg-garderobe-gray-50 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      My Enquiries
                    </Link>
                    <Link
                      to="/favorites"
                      className="block px-4 py-3 text-sm text-garderobe-black hover:bg-garderobe-gray-50 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      Favorites
                    </Link>
                    <hr className="border-garderobe-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-garderobe-black hover:bg-garderobe-gray-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-sm text-garderobe-black hover:bg-garderobe-gray-50 transition-colors"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}