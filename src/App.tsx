import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import HomePage from './pages/HomePage'
import QuickBuyPage from './pages/QuickBuyPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SuccessPage from './pages/SuccessPage'
import MyEnquiriesPage from './pages/MyEnquiriesPage'
import MyFavoritesPage from './pages/MyFavoritesPage'
import MyProfilePage from './pages/MyProfilePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import SafetyPage from './pages/SafetyPage'
import CategoriesPage from './pages/CategoriesPage'
import ShippingPage from './pages/ShippingPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/quickbuy" element={<QuickBuyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/favorites" element={<MyFavoritesPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/my-enquiries" element={<MyEnquiriesPage />} />
                <Route path="/my-profile" element={<MyProfilePage />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App