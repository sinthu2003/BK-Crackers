import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section 
      className="h-[900px] relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-garderobe-black leading-tight">
                CELEBRATE<br />
                <span className="text-garderobe-red">DIWALI</span><br />
                IN STYLE
              </h1>
              <p className="text-lg text-garderobe-gray-600 max-w-md">
                Premium quality fireworks for your celebrations. Safe, certified, and delivered fast to your doorstep.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-garderobe-black"></div>
                <span className="text-sm uppercase tracking-wider text-garderobe-gray-600">
                  Trusted by thousands
                </span>
              </div>
              
              <button
                onClick={() => navigate('/quickbuy')}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wider uppercase text-white bg-garderobe-black overflow-hidden transition-all duration-300 ease-out hover:bg-garderobe-red rounded-xl"
              >
                <span className="relative z-10">Shop Now</span>
                <svg 
                  className="ml-3 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content - Premium Fireworks Display */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative w-full max-w-lg h-[600px]">
              {/* Premium Fireworks Display Image - Main Content */}
              <div className="relative w-full h-full z-10">
                <img 
                  src="hero-fireworks.png"
                  alt="Premium Fireworks Collection - Gift Boxes & Crackers"
                  className="w-full h-full object-contain drop-shadow-2xl animate-float rounded-3xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(229, 56, 84, 0.3))'
                  }}
                />
              </div>

              {/* Animated badges around the main content */}
              <div className="absolute -top-10 left-0 bg-white shadow-lg px-4 py-2 rounded-2xl animate-bounce z-20">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-garderobe-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-sm font-semibold">Premium Quality</span>
                </div>
              </div>

              <div className="absolute top-1/4 -right-10 bg-white shadow-lg px-4 py-2 rounded-2xl animate-pulse z-20">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-semibold">Safe & Certified</span>
                </div>
              </div>

              <div className="absolute bottom-1/4 -left-10 bg-white shadow-lg px-4 py-2 rounded-2xl animate-bounce delay-150 z-20">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                  </svg>
                  <span className="text-sm font-semibold">Fast Delivery</span>
                </div>
              </div>

              <div className="absolute -bottom-10 right-0 bg-white shadow-lg px-4 py-2 rounded-2xl animate-pulse delay-300 z-20">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-sm font-semibold">High Rating</span>
                </div>
              </div>

              {/* Sparkle effects */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping z-30"></div>
              <div className="absolute bottom-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping animation-delay-200 z-30"></div>
              <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping animation-delay-400 z-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}