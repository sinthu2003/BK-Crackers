import { api, transformResponse, ServiceResponse } from './api'
import { Brand } from '../types'

class BrandService {
  private transformBrand(data: any): Brand {
    return {
      id: data._id || data.id,
      name: data.name,
      description: data.description,
      logo: data.logo,
      productCount: data.productCount || 0
    }
  }

  async getAllBrands(): Promise<ServiceResponse<Brand[]>> {
    try {
      const response = await api.get('/brands')
      const data = transformResponse<any[]>(response)
      const brands = Array.isArray(data.data) ? data.data.map((item: any) => this.transformBrand(item)) : []
      
      return {
        success: true,
        data: brands
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch brands'
      }
    }
  }
}

export const brandService = new BrandService()