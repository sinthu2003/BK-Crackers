import Header from '../components/Header'
import NewsSection from '../components/NewsSection'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import NewArrivals from '../components/NewArrivals'
import SpecialItems from '../components/SpecialItems'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NewsSection />
      <HeroSection />
      <FeaturedProducts />
      <NewArrivals />
      <SpecialItems />
      <Footer />
    </div>
  )
}