import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { orderService } from '../services/orderService'
import { Address, Coupon } from '../types'

const MINIMUM_ORDER_AMOUNT = 500

// Mock lorry services data
const LORRY_SERVICES = [
  { id: 'ls1', name: 'Express Lorry Service', locations: ['Chennai', 'Kanchipuram', 'Thiruvallur'] },
  { id: 'ls2', name: 'Fast Track Logistics', locations: ['Chennai', 'Vellore', 'Tiruvannamalai'] },
  { id: 'ls3', name: 'Quick Delivery Service', locations: ['Chennai', 'Chengalpattu', 'Villupuram'] },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user: _user } = useAuth()
  const { items, totalAmount, clearCart } = useCart()
  
  // Address Management
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState<Address>({
    label: 'Home',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  })
  
  // Delivery Location
  const [selectedLorryService, setSelectedLorryService] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [pickupInstructions, setPickupInstructions] = useState('')
  
  // Coupon
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [publicCoupons, setPublicCoupons] = useState<Coupon[]>([])
  const [couponError, setCouponError] = useState('')
  
  // Additional Notes
  const [additionalNotes, setAdditionalNotes] = useState('')
  
  // Loading and Error States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load saved addresses from localStorage
  useEffect(() => {
    const savedAddresses = localStorage.getItem('user-addresses')
    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses)
      setAddresses(parsed)
      const defaultAddr = parsed.find((a: Address) => a.isDefault)
      if (defaultAddr) {
        setSelectedAddress(defaultAddr)
      }
    }
  }, [])

  // Fetch public coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await orderService.getPublicCoupons()
      if (response.success) {
        setPublicCoupons(response.data)
      }
    }
    fetchCoupons()
  }, [])

  const handleAddAddress = () => {
    if (!newAddress.streetAddress || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      setError('Please fill all address fields')
      return
    }
    
    const addressWithId = { ...newAddress, id: Date.now().toString() }
    const updatedAddresses = [...addresses, addressWithId]
    setAddresses(updatedAddresses)
    localStorage.setItem('user-addresses', JSON.stringify(updatedAddresses))
    setSelectedAddress(addressWithId)
    setShowAddressForm(false)
    setNewAddress({
      label: 'Home',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    })
    setError('')
  }

  const handleApplyCoupon = async () => {
    setCouponError('')
    if (!couponCode) return
    
    const response = await orderService.validateCoupon(couponCode, totalAmount)
    if (response.success && response.data.valid) {
      setAppliedCoupon({
        code: couponCode,
        discount: response.data.discount
      })
      setCouponCode('')
    } else {
      setCouponError(response.data.message || 'Invalid coupon')
    }
  }

  const handleApplyPublicCoupon = (coupon: any) => {
    setCouponCode(coupon.code)
    handleApplyCoupon()
  }

  const finalAmount = totalAmount - (appliedCoupon?.discount || 0)

  const handleSubmitEnquiry = async () => {
    setError('')
    
    // Validation
    if (!selectedAddress) {
      setError('Please select a delivery address')
      return
    }
    
    if (!selectedLorryService && !pickupInstructions) {
      setError('Please select a lorry service or provide pickup instructions')
      return
    }
    
    setLoading(true)
    try {
      const orderPayload = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          discountedPrice: item.product.discountedPrice
        })),
        deliveryAddress: selectedAddress,
        lorryService: selectedLorryService,
        lorryLocation: selectedLocation,
        pickupInstructions: pickupInstructions,
        additionalNotes: additionalNotes,
        couponCode: appliedCoupon?.code,
        totalAmount: totalAmount,
        discountAmount: appliedCoupon?.discount
      }
      
      const response = await orderService.createOrder(orderPayload)
      
      if (response.success) {
        clearCart()
        navigate('/success', { state: { orderId: response.data.id } })
      } else {
        setError(response.error || 'Failed to submit enquiry')
      }
    } catch (err) {
      setError('Failed to submit enquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-garderobe-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
          Submit Enquiry
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Address Selection */}
            <div className="bg-white border border-garderobe-gray-200 p-6">
              <h2 className="text-lg font-semibold text-garderobe-black mb-4 uppercase tracking-wider">
                1. Delivery Address
              </h2>
              
              {addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address)}
                      className={`p-4 border rounded cursor-pointer transition-colors ${
                        selectedAddress?.id === address.id
                          ? 'border-garderobe-black bg-garderobe-gray-50'
                          : 'border-garderobe-gray-300 hover:border-garderobe-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-semibold">{address.label}</span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-garderobe-black text-white px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          <p className="text-sm text-garderobe-gray-600 mt-1">
                            {address.streetAddress}<br />
                            {address.city}, {address.state} - {address.zipCode}
                          </p>
                        </div>
                        <input
                          type="radio"
                          checked={selectedAddress?.id === address.id}
                          onChange={() => setSelectedAddress(address)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {!showAddressForm ? (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="w-full py-2 px-4 border border-garderobe-black text-garderobe-black hover:bg-garderobe-black hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Add New Address
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-garderobe-black mb-1">
                      Address Label *
                    </label>
                    <select
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                      className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-garderobe-black mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={newAddress.streetAddress}
                      onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                      placeholder="Enter street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-garderobe-black mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                        placeholder="Enter city"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-garderobe-black mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                        placeholder="Enter state"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-garderobe-black mb-1">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                      placeholder="Enter zip code"
                      maxLength={6}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="default-address"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="default-address" className="text-sm">
                      Save as default address
                    </label>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 py-2 px-4 bg-garderobe-black text-white hover:bg-garderobe-red transition-colors text-sm uppercase tracking-wider"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => {
                        setShowAddressForm(false)
                        setNewAddress({
                          label: 'Home',
                          streetAddress: '',
                          city: '',
                          state: '',
                          zipCode: '',
                          isDefault: false
                        })
                      }}
                      className="flex-1 py-2 px-4 border border-garderobe-gray-300 text-garderobe-black hover:bg-garderobe-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* 2. Delivery Location */}
            <div className="bg-white border border-garderobe-gray-200 p-6">
              <h2 className="text-lg font-semibold text-garderobe-black mb-4 uppercase tracking-wider">
                2. Delivery Location (Optional)
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-garderobe-black mb-2">
                    Select Lorry Service
                  </label>
                  <select
                    value={selectedLorryService}
                    onChange={(e) => {
                      setSelectedLorryService(e.target.value)
                      setSelectedLocation('')
                    }}
                    className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                  >
                    <option value="">Select a service</option>
                    {LORRY_SERVICES.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
                
                {selectedLorryService && (
                  <div>
                    <label className="block text-sm font-medium text-garderobe-black mb-2">
                      Select Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    >
                      <option value="">Select a location</option>
                      {LORRY_SERVICES.find(s => s.id === selectedLorryService)?.locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-garderobe-black mb-2">
                    Pickup Instructions {!selectedLorryService && '(Required if no location selected)'}
                  </label>
                  <textarea
                    value={pickupInstructions}
                    onChange={(e) => setPickupInstructions(e.target.value)}
                    className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    rows={3}
                    placeholder="Enter any specific pickup instructions..."
                  />
                </div>
              </div>
            </div>
            
            {/* 3. Coupon */}
            <div className="bg-white border border-garderobe-gray-200 p-6">
              <h2 className="text-lg font-semibold text-garderobe-black mb-4 uppercase tracking-wider">
                3. Have a Coupon?
              </h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                  placeholder="Enter coupon code"
                  disabled={!!appliedCoupon}
                />
                {!appliedCoupon ? (
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-2 bg-garderobe-black text-white hover:bg-garderobe-red transition-colors text-sm uppercase tracking-wider"
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors text-sm uppercase tracking-wider"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {couponError && (
                <p className="text-red-600 text-sm mb-4">{couponError}</p>
              )}
              
              {appliedCoupon && (
                <div className="bg-green-50 border border-green-200 p-3 mb-4">
                  <p className="text-green-700 text-sm">
                    Coupon <strong>{appliedCoupon.code}</strong> applied! 
                    You saved ₹{appliedCoupon.discount.toFixed(2)}
                  </p>
                </div>
              )}
              
              {/* Public Coupons */}
              {publicCoupons.length > 0 && (
                <div>
                  <p className="text-sm text-garderobe-gray-600 mb-3">Available Coupons:</p>
                  <div className="space-y-2">
                    {publicCoupons.map((coupon: any) => (
                      <div key={coupon.id} className="flex justify-between items-center p-3 border border-garderobe-gray-200 rounded">
                        <div>
                          <span className="font-semibold text-sm">{coupon.code}</span>
                          <p className="text-xs text-garderobe-gray-600">{coupon.description}</p>
                        </div>
                        <button
                          onClick={() => handleApplyPublicCoupon(coupon)}
                          disabled={!!appliedCoupon}
                          className="text-sm text-garderobe-black hover:text-garderobe-red"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 5. Additional Notes */}
            <div className="bg-white border border-garderobe-gray-200 p-6">
              <h2 className="text-lg font-semibold text-garderobe-black mb-4 uppercase tracking-wider">
                4. Additional Notes (Optional)
              </h2>
              
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full px-3 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                rows={4}
                placeholder="Any special instructions or notes for your order..."
              />
            </div>
          </div>
          
          {/* 4. Enquiry Summary - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-garderobe-gray-200 p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-garderobe-black mb-4 uppercase tracking-wider">
                Enquiry Summary
              </h2>
              
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-garderobe-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>₹{item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-garderobe-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-garderobe-gray-600">Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="bg-garderobe-gray-50 p-3 text-sm">
                  <p className="text-garderobe-gray-600">
                    <span className="font-semibold">Note:</span> Shipping charges will be decided by the lorry service
                  </p>
                </div>
                
                <div className="border-t border-garderobe-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Final Total</span>
                    <span className="text-garderobe-black">₹{finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              <button
                onClick={handleSubmitEnquiry}
                disabled={loading || finalAmount < MINIMUM_ORDER_AMOUNT}
                className={`w-full mt-6 py-3 px-4 text-sm uppercase tracking-wider transition-colors ${
                  !loading && finalAmount >= MINIMUM_ORDER_AMOUNT
                    ? 'bg-garderobe-black text-white hover:bg-garderobe-red'
                    : 'bg-garderobe-gray-300 text-garderobe-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Submitting...' : `Submit Enquiry (₹${finalAmount.toFixed(2)})`}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}