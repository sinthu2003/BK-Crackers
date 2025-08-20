import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-garderobe-gray-600">
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">2. Use of Website</h2>
            <p className="mb-4">This website is for personal and non-commercial use only. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from this website.</p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">3. Product Information</h2>
            <p className="mb-4">We strive to provide accurate product information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">4. Pricing</h2>
            <p className="mb-4">All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice.</p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">5. Order Acceptance</h2>
            <p className="mb-4">We reserve the right to refuse or cancel any order for any reason. Your order is accepted only after payment verification.</p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">6. Limitation of Liability</h2>
            <p className="mb-4">BK Crackers shall not be liable for any direct, indirect, incidental, special or consequential damages resulting from the use or inability to use our products or services.</p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">7. Contact Information</h2>
            <p className="mb-4">For any questions regarding these terms, please contact us at info@bkcrackers.com</p>
            
            <p className="mt-8 text-sm text-garderobe-gray-500">Last updated: January 2025</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}