import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
            About BK Crackers
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-garderobe-gray-600 mb-6">
              Welcome to BK Crackers, your trusted partner for premium quality fireworks and crackers. 
              With over 20 years of experience in the industry, we have been bringing joy and celebration 
              to countless families across Tamil Nadu.
            </p>
            
            <h2 className="text-2xl font-semibold text-garderobe-black mt-8 mb-4">Our Mission</h2>
            <p className="text-garderobe-gray-600 mb-6">
              To provide safe, high-quality, and affordable fireworks that make every celebration memorable. 
              We believe in spreading happiness through our carefully curated selection of crackers and fireworks.
            </p>
            
            <h2 className="text-2xl font-semibold text-garderobe-black mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-garderobe-gray-600 space-y-2 mb-6">
              <li>Premium quality products from trusted manufacturers</li>
              <li>Competitive pricing with bulk discounts</li>
              <li>Safe and certified products meeting all safety standards</li>
              <li>Fast and reliable delivery services</li>
              <li>Excellent customer support</li>
              <li>Wide variety of products for all occasions</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-garderobe-black mt-8 mb-4">Our Commitment</h2>
            <p className="text-garderobe-gray-600 mb-6">
              Safety is our top priority. All our products undergo rigorous quality checks and comply with 
              government regulations. We are committed to providing you with fireworks that are not only 
              spectacular but also safe for you and your loved ones.
            </p>
            
            <div className="bg-garderobe-gray-50 p-6 rounded-lg mt-8">
              <p className="text-center text-garderobe-black font-semibold">
                "Celebrating Life's Special Moments with Light and Joy"
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}