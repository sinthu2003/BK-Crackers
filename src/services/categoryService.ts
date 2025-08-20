import { api, transformResponse, ServiceResponse } from './api'
import { Category } from '../types'

class CategoryService {
  private transformCategory(data: any): Category {
    return {
      id: data._id || data.id,
      name: data.name,
      description: data.description,
      image: data.image,
      productCount: data.productCount || 0
    }
  }

  async getAllCategories(): Promise<ServiceResponse<Category[]>> {
    try {
      const response = await api.get('/categories')
      const data = transformResponse<any[]>(response)
      const categories = Array.isArray(data.data) ? data.data.map((item: any) => this.transformCategory(item)) : []
      
      return {
        success: true,
        data: categories
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch categories'
      }
    }
  }
}

export const categoryService = new CategoryService()