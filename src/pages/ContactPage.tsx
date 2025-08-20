import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', formData)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-garderobe-black mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-garderobe-black mb-2">Address</h3>
                  <p className="text-garderobe-gray-600">
                    123 Fireworks Street<br />
                    Chennai, Tamil Nadu 600001
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-garderobe-black mb-2">Phone</h3>
                  <p className="text-garderobe-gray-600">
                    <a href="tel:+919876543210" className="hover:text-garderobe-red transition-colors">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-garderobe-black mb-2">Email</h3>
                  <p className="text-garderobe-gray-600">
                    <a href="mailto:info@bkcrackers.com" className="hover:text-garderobe-red transition-colors">
                      info@bkcrackers.com
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-garderobe-black mb-2">Business Hours</h3>
                  <p className="text-garderobe-gray-600">
                    Monday - Saturday: 9:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-garderobe-black mb-6">Send Message</h2>
              
              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                  Thank you for contacting us! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Your Mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    rows={5}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-garderobe-black text-white text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}