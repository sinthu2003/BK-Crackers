import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import confetti from 'canvas-confetti'

export default function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const orderId = location.state?.orderId

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Fireworks from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#e8363c', '#131117', '#ffffff']
      })
      
      // Fireworks from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#e8363c', '#131117', '#ffffff']
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        {/* Boom Animation */}
        <div className="mb-8 relative">
          <div className="text-8xl animate-bounce">
            🎉
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-garderobe-red animate-pulse">
              BOOM!
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-garderobe-black mb-4 uppercase tracking-wider">
          Enquiry Submitted Successfully!
        </h1>
        
        <p className="text-lg text-garderobe-gray-600 mb-2">
          Thank you for your enquiry!
        </p>
        
        {orderId && (
          <p className="text-sm text-garderobe-gray-500 mb-8">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>
        )}
        
        <p className="text-garderobe-gray-600 mb-8">
          We will review your enquiry and contact you soon with pricing and delivery details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/my-enquiries')}
            className="px-8 py-3 bg-garderobe-black text-white text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors"
          >
            View My Enquiries
          </button>
          
          <button
            onClick={() => navigate('/quickbuy')}
            className="px-8 py-3 border border-garderobe-black text-garderobe-black text-sm uppercase tracking-wider hover:bg-garderobe-black hover:text-white transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}