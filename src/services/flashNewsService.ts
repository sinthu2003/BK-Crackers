import { api, transformResponse, ServiceResponse } from './api'
import { FlashNews } from '../types'

class FlashNewsService {
  async getActiveNews(): Promise<ServiceResponse<FlashNews[]>> {
    try {
      const response = await api.get('/flashnews/active')
      const data = transformResponse<FlashNews[]>(response)
      
      return {
        success: true,
        data: Array.isArray(data.data) ? data.data : []
      }
    } catch (error) {
      console.error('Error fetching flash news:', error)
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch news'
      }
    }
  }
}

export const flashNewsService = new FlashNewsService()