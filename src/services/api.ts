import axios, { AxiosInstance, AxiosError } from 'axios'
import type { ApiResponse } from '../types'

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crc-srv-827015814474.asia-south1.run.app/csa-srv'
const TENANT_KEY = import.meta.env.VITE_TENANT_KEY || 'default-tenant'

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-key': TENANT_KEY,
  },
  timeout: 30000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Backend returns data wrapped in ResultEntity format
    return response.data
  },
  (error: AxiosError<ApiResponse<any>>) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    // Extract error message from response
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred'
    
    return Promise.reject(new Error(errorMessage))
  }
)

export default api
export { api }

// Service response type
export interface ServiceResponse<T> {
  success: boolean
  data: T
  error?: string
  message?: string
}

// Helper function to handle API responses
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.error || 'Failed to fetch data')
  }
  return response.data
}

// Transform axios response to ApiResponse
export function transformResponse<T = any>(response: any): ApiResponse<T> {
  // If response is already in ApiResponse format (from interceptor)
  if ('success' in response && 'data' in response) {
    return response as ApiResponse<T>
  }
  
  // If it's a raw axios response
  if (response.data && 'success' in response.data) {
    return response.data as ApiResponse<T>
  }
  
  // Fallback - wrap in ApiResponse
  return {
    success: true,
    data: response as T,
    timestamp: new Date().toISOString()
  }
}