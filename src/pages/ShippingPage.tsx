import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
            Shipping Information
          </h1>
          
          <div className="prose prose-lg max-w-none text-garderobe-gray-600">
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Delivery Areas</h2>
            <p className="mb-4">
              We currently deliver to all areas within Tamil Nadu. Select cities in neighboring states 
              are also serviceable. Please check availability during checkout.
            </p>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Delivery Options</h2>
            
            <div className="bg-garderobe-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-garderobe-black mb-3">🚚 Standard Delivery</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Delivery within 3-5 business days</li>
                <li>Free delivery for orders above ₹2000</li>
                <li>Flat ₹150 charge for orders below ₹2000</li>
                <li>Track your order with real-time updates</li>
              </ul>
            </div>
            
            <div className="bg-garderobe-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-garderobe-black mb-3">🚛 Lorry Service (Bulk Orders)</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>For orders above ₹10,000</li>
                <li>Direct lorry delivery to your location</li>
                <li>Delivery within 2-3 business days</li>
                <li>Special handling for large quantities</li>
                <li>Unloading assistance available</li>
              </ul>
            </div>
            
            <div className="bg-garderobe-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-garderobe-black mb-3">⚡ Express Delivery</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Same-day or next-day delivery (select areas)</li>
                <li>Available for orders placed before 12 PM</li>
                <li>Additional charges apply based on location</li>
                <li>Subject to product availability</li>
              </ul>
            </div>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Minimum Order Requirements</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="font-semibold text-yellow-700">Minimum Order Value: ₹500</p>
              <p className="text-yellow-600">All orders must meet the minimum value of ₹500 for processing.</p>
            </div>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Order Processing</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Orders are processed within 24 hours of placement</li>
              <li>You will receive confirmation via SMS/Email</li>
              <li>Orders placed on weekends/holidays processed next business day</li>
              <li>Cut-off time for same-day processing: 3 PM IST</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Packaging</h2>
            <p className="mb-4">
              All products are carefully packed following safety guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Waterproof and damage-resistant packaging</li>
              <li>Proper labeling as per regulations</li>
              <li>Safety instructions included</li>
              <li>Eco-friendly packaging materials where possible</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Tracking Your Order</h2>
            <p className="mb-4">
              Once your order is dispatched, you will receive:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Order tracking number via SMS/Email</li>
              <li>Link to track real-time status</li>
              <li>Estimated delivery date and time</li>
              <li>Contact details of delivery partner</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Delivery Restrictions</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="font-semibold text-red-700">Important Note</p>
              <ul className="list-disc list-inside space-y-2 text-red-600">
                <li>Delivery only to ground floor or designated safe areas</li>
                <li>ID proof required at the time of delivery</li>
                <li>Age verification (18+ years) mandatory</li>
                <li>Delivery not available to hospitals, schools, or restricted areas</li>
              </ul>
            </div>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Cancellation & Returns</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Orders can be cancelled within 2 hours of placement</li>
              <li>No returns accepted due to safety regulations</li>
              <li>Damaged products will be replaced if reported within 24 hours</li>
              <li>Photo/video evidence required for damage claims</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-garderobe-black mt-6 mb-3">Contact for Shipping Queries</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Customer Support:</strong> +91 98765 43210</p>
              <p className="mb-2"><strong>Email:</strong> shipping@bkcrackers.com</p>
              <p><strong>Working Hours:</strong> Mon-Sat, 9 AM - 8 PM</p>
            </div>
            
            <p className="mt-8 text-sm text-garderobe-gray-500">
              Shipping policies are subject to change. Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}