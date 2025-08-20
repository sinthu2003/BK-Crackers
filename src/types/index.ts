// Product types
export interface Product {
  id: string
  name: string
  sku: string
  description?: string
  price: number
  discountedPrice?: number
  discountPercentage?: number
  stock: number
  category?: string
  categoryName?: string
  brand?: string
  brandName?: string
  images?: string[]
  packType?: string
  pieces?: number
  isFeatured?: boolean
  isNewArrival?: boolean
  isSpecial?: boolean
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

// Category types
export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  productCount?: number
}

// Brand types
export interface Brand {
  id: string
  name: string
  description?: string
  logo?: string
  productCount?: number
}

// Cart types
export interface CartItem {
  product: Product
  quantity: number
  amount: number
}

// User types
export interface User {
  id: string
  name?: string
  email?: string
  mobile?: string
  role?: string
  createdAt?: string
}

// Address types
export interface Address {
  id?: string
  label: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  isDefault?: boolean
}

// Order types
export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName?: string
  items: OrderItem[]
  totalAmount: number
  discountAmount?: number
  finalAmount: number
  status: OrderStatus
  deliveryAddress?: Address
  lorryService?: string
  lorryLocation?: string
  pickupInstructions?: string
  additionalNotes?: string
  couponCode?: string
  paymentProofs?: PaymentProof[]
  createdAt?: string
  updatedAt?: string
}

export interface OrderItem {
  productId: string
  productName: string
  sku: string
  price: number
  quantity: number
  amount: number
  discountedPrice?: number
}

export type OrderStatus = 'pending' | 'unpaid' | 'pending_verification' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface PaymentProof {
  id: string
  fileName: string
  uploadedAt: string
  status: 'pending' | 'verified' | 'rejected'
}

// Coupon types
export interface Coupon {
  id: string
  code: string
  description?: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  isPublic: boolean
  isActive: boolean
  validFrom?: string
  validUntil?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string | null
  message?: string
  timestamp?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Service Response types
export interface ServiceResponse<T> {
  success: boolean
  data: T
  error?: string
  message?: string
}

// Flash News types
export interface FlashNews {
  id: string
  title: string
  content: string
  isActive: boolean
  priority?: number
}

// Company types
export interface CompanyInfo {
  name: string
  slogan?: string
  description?: string
  address?: string
  email?: string
  phone?: string[]
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
}