import { useEffect, useState } from 'react'

export default function FirecrackerAnimations() {
  const [showAnimations, setShowAnimations] = useState(false)

  useEffect(() => {
    // Start animations after component mounts
    const timer = setTimeout(() => setShowAnimations(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!showAnimations) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Sparkle Effects - Top corners */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle"></div>
      <div className="absolute top-32 left-40 w-3 h-3 bg-orange-400 rounded-full animate-sparkle animation-delay-400"></div>
      <div className="absolute top-40 left-60 w-2 h-2 bg-red-400 rounded-full animate-sparkle animation-delay-600"></div>
      
      <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-sparkle animation-delay-200"></div>
      <div className="absolute top-32 right-40 w-3 h-3 bg-purple-400 rounded-full animate-sparkle animation-delay-600"></div>
      <div className="absolute top-40 right-60 w-2 h-2 bg-pink-400 rounded-full animate-sparkle animation-delay-400"></div>

      {/* Firework Bursts - Various positions */}
      <div className="absolute top-1/4 left-1/4">
        <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-firework opacity-70"></div>
      </div>
      <div className="absolute top-1/3 right-1/4">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-firework animation-delay-400 opacity-60"></div>
      </div>
      <div className="absolute top-1/2 left-1/6">
        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full animate-firework animation-delay-600 opacity-50"></div>
      </div>

      {/* Rocket Trails */}
      <div className="absolute bottom-1/4 left-1/8">
        <div className="w-2 h-8 bg-gradient-to-t from-orange-500 to-yellow-400 animate-rocket opacity-80"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/8">
        <div className="w-2 h-6 bg-gradient-to-t from-red-500 to-orange-400 animate-rocket animation-delay-400 opacity-70"></div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute top-[60%] left-[15%] w-3 h-3 bg-yellow-300 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-[70%] right-[20%] w-2 h-2 bg-orange-300 rounded-full animate-float animation-delay-200 opacity-50"></div>
      <div className="absolute top-[80%] left-[80%] w-4 h-4 bg-red-300 rounded-full animate-float animation-delay-400 opacity-40"></div>

      {/* Burst Effects */}
      <div className="absolute top-[45%] left-[60%]">
        <div className="w-12 h-12 border-2 border-yellow-400 rounded-full animate-burst opacity-30"></div>
      </div>
      <div className="absolute top-[55%] right-[30%]">
        <div className="w-10 h-10 border-2 border-orange-400 rounded-full animate-burst animation-delay-400 opacity-25"></div>
      </div>

      {/* Trail Effects */}
      <div className="absolute top-[35%] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-trail opacity-30"></div>
      <div className="absolute top-[65%] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-trail animation-delay-600 opacity-20"></div>

      {/* Star Sparkles */}
      <div className="absolute top-[25%] left-[70%]">
        <svg className="w-6 h-6 text-yellow-400 animate-sparkle" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>
      <div className="absolute top-[75%] right-[60%]">
        <svg className="w-4 h-4 text-orange-400 animate-sparkle animation-delay-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>

      {/* Confetti Particles */}
      <div className="absolute top-[15%] left-[30%] w-2 h-6 bg-red-400 transform rotate-45 animate-float opacity-60"></div>
      <div className="absolute top-[20%] left-[50%] w-2 h-6 bg-blue-400 transform rotate-12 animate-float animation-delay-200 opacity-50"></div>
      <div className="absolute top-[85%] right-[40%] w-2 h-6 bg-green-400 transform -rotate-30 animate-float animation-delay-400 opacity-40"></div>

      {/* Diamond Shapes */}
      <div className="absolute top-[40%] right-[10%] w-3 h-3 bg-purple-400 transform rotate-45 animate-sparkle animation-delay-600"></div>
      <div className="absolute top-[90%] left-[25%] w-4 h-4 bg-pink-400 transform rotate-45 animate-sparkle animation-delay-200"></div>
    </div>
  )
}