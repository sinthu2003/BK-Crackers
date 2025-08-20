import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Order } from '../types'
import { orderService } from '../services/orderService'

type FilterTab = 'all' | 'unpaid' | 'pending_verification' | 'paid'

export default function MyEnquiriesPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await orderService.getMyOrders()
        if (response.success) {
          setOrders(response.data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    return order.status === activeTab
  })

  const getTabCount = (tab: FilterTab) => {
    if (tab === 'all') return orders.length
    return orders.filter(order => order.status === tab).length
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Pending' },
      'unpaid': { bg: 'bg-red-100', text: 'text-red-700', label: 'Unpaid' },
      'pending_verification': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending Verification' },
      'paid': { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid' },
      'processing': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Processing' },
      'shipped': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Shipped' },
      'delivered': { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-garderobe-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-garderobe-black uppercase tracking-wider">
            My Enquiries
          </h1>
          <p className="text-garderobe-gray-600 mt-2">Track and manage your enquiries</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-garderobe-red text-white'
                : 'bg-white text-garderobe-black border border-garderobe-gray-300 hover:bg-garderobe-gray-50'
            }`}
          >
            All Enquiries ({getTabCount('all')})
          </button>
          <button
            onClick={() => setActiveTab('unpaid')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'unpaid'
                ? 'bg-garderobe-red text-white'
                : 'bg-white text-garderobe-black border border-garderobe-gray-300 hover:bg-garderobe-gray-50'
            }`}
          >
            Unpaid ({getTabCount('unpaid')})
          </button>
          <button
            onClick={() => setActiveTab('pending_verification')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'pending_verification'
                ? 'bg-garderobe-red text-white'
                : 'bg-white text-garderobe-black border border-garderobe-gray-300 hover:bg-garderobe-gray-50'
            }`}
          >
            Pending Verification ({getTabCount('pending_verification')})
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'paid'
                ? 'bg-garderobe-red text-white'
                : 'bg-white text-garderobe-black border border-garderobe-gray-300 hover:bg-garderobe-gray-50'
            }`}
          >
            Paid ({getTabCount('paid')})
          </button>
        </div>
        
        {/* Enquiry Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-garderobe-black"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-garderobe-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-garderobe-black mb-2">No Enquiries Found</h3>
            <p className="text-garderobe-gray-600">
              {activeTab === 'all' 
                ? "You haven't made any enquiries yet."
                : `No ${activeTab.replace('_', ' ')} enquiries found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white border border-garderobe-gray-200 rounded-lg shadow-sm p-6">
                {/* Card Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-garderobe-black">
                        {order.orderNumber || `O-${order.id.slice(-6).toUpperCase()}`}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-garderobe-gray-600">
                      Enquired on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-garderobe-red text-white rounded-full text-sm hover:bg-garderobe-black transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                </div>
                
                {/* Card Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Total Amount */}
                  <div>
                    <p className="text-sm text-garderobe-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-garderobe-black">
                      ₹{order.finalAmount?.toFixed(2) || order.totalAmount.toFixed(2)}
                    </p>
                    {order.discountAmount && order.discountAmount > 0 && (
                      <p className="text-sm text-green-600">
                        Saved ₹{order.discountAmount.toFixed(2)} {order.couponCode && `(${order.couponCode})`}
                      </p>
                    )}
                  </div>
                  
                  {/* Delivery Address */}
                  <div className="md:col-span-2">
                    <p className="text-sm text-garderobe-gray-600 mb-1">Delivery Address</p>
                    {order.deliveryAddress ? (
                      <>
                        <p className="font-semibold text-garderobe-black">
                          {order.deliveryAddress.streetAddress}
                        </p>
                        <p className="text-sm text-garderobe-gray-600">
                          {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.zipCode}
                        </p>
                      </>
                    ) : (
                      <p className="text-garderobe-gray-500">No address provided</p>
                    )}
                  </div>
                </div>
                
                {/* Payment Proofs */}
                {order.paymentProofs && order.paymentProofs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-garderobe-gray-200">
                    <p className="text-sm text-garderobe-gray-600 mb-2">
                      Payment Proofs ({order.paymentProofs.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {order.paymentProofs.map((proof) => (
                        <div
                          key={proof.id}
                          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                            proof.status === 'verified'
                              ? 'bg-green-50 text-green-700'
                              : proof.status === 'rejected'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          {proof.status === 'verified' && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span>{proof.fileName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}