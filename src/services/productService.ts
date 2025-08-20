import { api, transformResponse, ServiceResponse } from './api'
import { Product, PaginatedResponse } from '../types'

class ProductService {
  private transformProduct(data: any): Product {
    // Check if product has 'featured' tag for featured status
    const tags = data.tags || [];
    const isFeatured = tags.includes('featured');
    const isNewArrival = tags.includes('new') || data.isNew;
    const isSpecial = tags.includes('special') || tags.includes('bestseller');
    return {
      id: data._id || data.id,
      name: data.name,
      sku: data.sku || data.productCode,
      description: data.description || '',
      price: data.price || 0,
      discountedPrice: data.discountedPrice || data.price,
      discountPercentage: data.discountPercentage || 0,
      stock: data.stock || 0,
      category: data.category || '',
      categoryName: data.categoryName || data.category || '',
      brand: data.brand || '',
      brandName: data.brandName || data.brand || '',
      images: data.medias?.map((m: any) => m.url) || [data.image] || [],
      packType: data.packageType || data.packType || '',
      pieces: data.piecesPerBox || data.pieces || 1,
      isFeatured,
      isNewArrival,
      isSpecial,
      tags: tags,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  async getFeaturedProducts(limit: number = 4): Promise<ServiceResponse<Product[]>> {
    try {
      const response = await api.get('/products', {
        params: {
          tags: ['featured'],
          limit,
          page: 1,
        }
      })
      
      const data = transformResponse<PaginatedResponse<any>>(response)
      const products = ((data.data as any)?.data || []).map((item: any) => this.transformProduct(item))
      
      return {
        success: true,
        data: products
      }
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch featured products'
      }
    }
  }

  async getNewArrivals(limit: number = 4): Promise<ServiceResponse<Product[]>> {
    try {
      const response = await api.get('/products', {
        params: {
          isNew: true,
          limit,
          page: 1,
        }
      })
      
      const data = transformResponse<PaginatedResponse<any>>(response)
      const products = ((data.data as any)?.data || []).map((item: any) => this.transformProduct(item))
      
      return {
        success: true,
        data: products
      }
    } catch (error) {
      console.error('Error fetching new arrivals:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch new arrivals'
      }
    }
  }

  async getSpecialItems(limit: number = 4): Promise<ServiceResponse<Product[]>> {
    try {
      const response = await api.get('/products', {
        params: {
          tags: ['special', 'bestseller'],
          limit,
          page: 1,
        }
      })
      
      const data = transformResponse<PaginatedResponse<any>>(response)
      const products = ((data.data as any)?.data || []).map((item: any) => this.transformProduct(item))
      
      return {
        success: true,
        data: products
      }
    } catch (error) {
      console.error('Error fetching special items:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch special items'
      }
    }
  }

  async getAllProducts(page: number = 1, limit: number = 100, filters?: any): Promise<ServiceResponse<PaginatedResponse<Product>>> {
    try {
      // Clean up filters - remove empty values
      const cleanFilters: any = {}
      if (filters) {
        Object.keys(filters).forEach(key => {
          if (filters[key] !== '' && filters[key] !== undefined && filters[key] !== null) {
            cleanFilters[key] = filters[key]
          }
        })
      }
      
      const response = await api.get('/products', {
        params: {
          page,
          limit,
          ...cleanFilters
        }
      })
      
      const data = transformResponse<PaginatedResponse<any>>(response)
      const paginatedData = data.data as any
      const products = (paginatedData?.data || []).map((item: any) => this.transformProduct(item))
      
      return {
        success: true,
        data: {
          data: products,
          total: paginatedData?.total || 0,
          page: paginatedData?.page || page,
          limit: paginatedData?.limit || limit,
          totalPages: paginatedData?.totalPages || Math.ceil((paginatedData?.total || 0) / limit)
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      return {
        success: false,
        data: {
          data: [],
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0
        },
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      }
    }
  }
}

export const productService = new ProductService()