import { api, transformResponse, ServiceResponse } from './api'
import { Order, Address } from '../types'

interface CreateOrderPayload {
  items: Array<{
    productId: string
    quantity: number
    price: number
    discountedPrice?: number
  }>
  deliveryAddress: Address
  lorryService?: string
  lorryLocation?: string
  pickupInstructions?: string
  additionalNotes?: string
  couponCode?: string
  totalAmount: number
  discountAmount?: number
}

class OrderService {
  async createOrder(payload: CreateOrderPayload): Promise<ServiceResponse<Order>> {
    try {
      const response = await api.post('/orders', payload)
      const data = transformResponse<Order>(response)
      
      return {
        success: true,
        data: data.data || {} as Order
      }
    } catch (error) {
      console.error('Error creating order:', error)
      return {
        success: false,
        data: {} as Order,
        error: error instanceof Error ? error.message : 'Failed to create order'
      }
    }
  }

  async getMyOrders(): Promise<ServiceResponse<Order[]>> {
    try {
      const response = await api.get('/orders/my-orders')
      const data = transformResponse<Order[]>(response)
      
      return {
        success: true,
        data: Array.isArray(data.data) ? data.data : []
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch orders'
      }
    }
  }

  async validateCoupon(code: string, amount: number): Promise<ServiceResponse<{ valid: boolean; discount: number; message: string }>> {
    try {
      const response = await api.post('/coupons/validate', { code, amount })
      const data = transformResponse<any>(response)
      
      return {
        success: true,
        data: data.data || { valid: false, discount: 0, message: 'Invalid coupon' }
      }
    } catch (error) {
      console.error('Error validating coupon:', error)
      return {
        success: false,
        data: { valid: false, discount: 0, message: 'Invalid coupon' },
        error: error instanceof Error ? error.message : 'Invalid coupon'
      }
    }
  }

  async getPublicCoupons(): Promise<ServiceResponse<any[]>> {
    try {
      const response = await api.get('/coupons/public')
      const data = transformResponse<any[]>(response)
      
      return {
        success: true,
        data: Array.isArray(data.data) ? data.data : []
      }
    } catch (error) {
      console.error('Error fetching coupons:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch coupons'
      }
    }
  }
}

export const orderService = new OrderService()