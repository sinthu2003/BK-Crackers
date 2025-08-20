import { useEffect, useState } from 'react'
import { FlashNews } from '../types'
import { flashNewsService } from '../services/flashNewsService'

interface NewsItem {
  id: string
  content?: string
  message?: string
  active?: boolean
}

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<FlashNews[]>([])
  const [_loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await flashNewsService.getActiveNews()
        if (response.success) {
          setNewsItems(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNews()
  }, [])

  // Always render the section to maintain layout
  const displayItems: NewsItem[] = newsItems.length > 0 ? newsItems : [
    { id: '1', content: 'WELCOME TO BK CRACKERS - PREMIUM FIREWORKS STORE' },
    { id: '2', content: 'FREE DELIVERY ON ORDERS ABOVE ₹2000' },
    { id: '3', content: 'DIWALI SPECIAL OFFERS NOW LIVE' }
  ]

  return (
    <section className="h-[55px] bg-garderobe-black text-white overflow-hidden relative">
      <div className="absolute inset-0 flex items-center">
        <div className="flex animate-scroll whitespace-nowrap">
          {displayItems.map((item, index) => (
            <span key={item.id} className="mx-8 text-sm uppercase tracking-wider">
              {item.content || item.message}
              {index < displayItems.length - 1 && <span className="mx-4">•</span>}
            </span>
          ))}
          {/* Duplicate for seamless scrolling */}
          {displayItems.map((item, index) => (
            <span key={`dup-${item.id}`} className="mx-8 text-sm uppercase tracking-wider">
              {item.content || item.message}
              {index < displayItems.length - 1 && <span className="mx-4">•</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}