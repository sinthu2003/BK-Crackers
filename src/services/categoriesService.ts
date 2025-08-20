import { api, ServiceResponse, transformResponse } from './api'

interface Category {
  id: string
  name: string
  image: string
  productCount: number
  description?: string
}

export const categoriesService = {
  async getCategories(): Promise<ServiceResponse<Category[]>> {
    try {
      const response = await api.get('/categories')
      const data = transformResponse(response)
      
      if (data.success && data.data) {
        const categories = data.data.map(transformCategory)
        return { success: true, data: categories }
      }
      
      return { success: false, data: [], error: 'Failed to fetch categories' }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      return { 
        success: false, 
        data: [], 
        error: error instanceof Error ? error.message : 'Failed to fetch categories' 
      }
    }
  }
}

function transformCategory(data: any): Category {
  return {
    id: data._id || data.id,
    name: data.name || '',
    image: data.image || '',
    productCount: data.productCount || 0,
    description: data.description || ''
  }
}