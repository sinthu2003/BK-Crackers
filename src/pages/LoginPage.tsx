import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/authService'

type LoginMethod = 'mobile' | 'whatsapp' | 'email'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('mobile')
  const [inputValue, setInputValue] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otpTimer, setOtpTimer] = useState(0)
  
  // New user profile collection
  const [isNewUser, setIsNewUser] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userMobile, setUserMobile] = useState('')
  const [tempUserData, setTempUserData] = useState<any>(null)

  const from = location.state?.from?.pathname || '/'

  const validateInput = () => {
    if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(inputValue)
    } else {
      const mobileRegex = /^[6-9]\d{9}$/
      return mobileRegex.test(inputValue)
    }
  }

  const handleSendOTP = async () => {
    setError('')
    
    if (!validateInput()) {
      setError(loginMethod === 'email' ? 'Please enter a valid email' : 'Please enter a valid 10-digit mobile number')
      return
    }
    
    setLoading(true)
    try {
      const response = await authService.sendOTP(loginMethod, inputValue)
      
      if (response.success) {
        setShowOtpInput(true)
        setOtpTimer(60)
        
        // Start countdown timer
        const interval = setInterval(() => {
          setOtpTimer(prev => {
            if (prev <= 1) {
              clearInterval(interval)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(response.error || 'Failed to send OTP')
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setError('')
    
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }
    
    setLoading(true)
    try {
      const response = await authService.verifyOTP(loginMethod, inputValue, otp)
      
      if (response.success && response.data) {
        const { token, user, isNewUser: newUser } = response.data
        
        if (newUser) {
          // New user - collect profile information
          setIsNewUser(true)
          setTempUserData({ token, user })
          
          // Pre-fill known information
          if (loginMethod === 'email') {
            setUserEmail(inputValue)
          } else {
            setUserMobile(inputValue)
          }
        } else {
          // Existing user - login directly
          login(token, user)
          navigate(from, { replace: true })
        }
      } else {
        setError(response.error || 'Invalid OTP')
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteProfile = async () => {
    setError('')
    
    if (!userName.trim()) {
      setError('Please enter your name')
      return
    }
    
    if (loginMethod !== 'email' && !userEmail) {
      setError('Please enter your email')
      return
    }
    
    if (loginMethod === 'email' && !userMobile) {
      setError('Please enter your mobile number')
      return
    }
    
    setLoading(true)
    try {
      const profileData = {
        name: userName,
        email: userEmail || inputValue,
        mobile: userMobile || inputValue
      }
      
      const response = await authService.updateProfile(tempUserData.user.id, profileData)
      
      if (response.success) {
        const updatedUser = { ...tempUserData.user, ...profileData }
        login(tempUserData.token, updatedUser)
        navigate(from, { replace: true })
      } else {
        setError('Failed to update profile')
      }
    } catch (err) {
      setError('Failed to complete registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getPlaceholder = () => {
    switch (loginMethod) {
      case 'email':
        return 'Enter your email address'
      case 'mobile':
        return 'Enter your mobile number'
      case 'whatsapp':
        return 'Enter your WhatsApp number'
      default:
        return 'Enter your contact'
    }
  }

  if (isNewUser) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-garderobe-black mb-2 text-center uppercase tracking-wider">
              Complete Your Profile
            </h1>
            <p className="text-garderobe-gray-600 text-center mb-8">
              Welcome! Please provide your details to continue
            </p>
            
            <div className="bg-white border border-garderobe-gray-200 p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-garderobe-black mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    placeholder="Enter your full name"
                  />
                </div>
                
                {loginMethod !== 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-garderobe-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                      placeholder="Enter your email"
                    />
                  </div>
                )}
                
                {loginMethod === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-garderobe-black mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={userMobile}
                      onChange={(e) => setUserMobile(e.target.value)}
                      className="w-full px-4 py-2 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                      placeholder="Enter your mobile number"
                      maxLength={10}
                    />
                  </div>
                )}
                
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                
                <button
                  onClick={handleCompleteProfile}
                  disabled={loading}
                  className="w-full bg-garderobe-black text-white py-3 px-4 text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors disabled:bg-garderobe-gray-300"
                >
                  {loading ? 'Please wait...' : 'Complete Registration'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-garderobe-black mb-2 text-center uppercase tracking-wider">
            Sign In
          </h1>
          <p className="text-garderobe-gray-600 text-center mb-8">
            No registration required. Login with OTP
          </p>
          
          <div className="bg-white border border-garderobe-gray-200 p-8">
            {!showOtpInput ? (
              <>
                {/* Login Method Selection */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setLoginMethod('mobile')}
                    className={`flex-1 py-2 px-4 text-sm uppercase tracking-wider transition-colors ${
                      loginMethod === 'mobile'
                        ? 'bg-garderobe-black text-white'
                        : 'border border-garderobe-gray-300 text-garderobe-black hover:bg-garderobe-gray-50'
                    }`}
                  >
                    Mobile
                  </button>
                  <button
                    onClick={() => setLoginMethod('whatsapp')}
                    className={`flex-1 py-2 px-4 text-sm uppercase tracking-wider transition-colors ${
                      loginMethod === 'whatsapp'
                        ? 'bg-garderobe-black text-white'
                        : 'border border-garderobe-gray-300 text-garderobe-black hover:bg-garderobe-gray-50'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2 px-4 text-sm uppercase tracking-wider transition-colors ${
                      loginMethod === 'email'
                        ? 'bg-garderobe-black text-white'
                        : 'border border-garderobe-gray-300 text-garderobe-black hover:bg-garderobe-gray-50'
                    }`}
                  >
                    Email
                  </button>
                </div>
                
                {/* Input Field */}
                <div className="mb-4">
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-3 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black"
                    placeholder={getPlaceholder()}
                    maxLength={loginMethod === 'email' ? undefined : 10}
                  />
                </div>
                
                {error && (
                  <div className="text-red-600 text-sm mb-4">{error}</div>
                )}
                
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full bg-garderobe-black text-white py-3 px-4 text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors disabled:bg-garderobe-gray-300"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </>
            ) : (
              <>
                {/* OTP Verification */}
                <div className="mb-4">
                  <p className="text-sm text-garderobe-gray-600 mb-4">
                    Enter the 6-digit OTP sent to {inputValue}
                  </p>
                  
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-garderobe-gray-300 focus:outline-none focus:border-garderobe-black text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
                
                {error && (
                  <div className="text-red-600 text-sm mb-4">{error}</div>
                )}
                
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-garderobe-black text-white py-3 px-4 text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors disabled:bg-garderobe-gray-300"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
                <div className="mt-4 text-center">
                  {otpTimer > 0 ? (
                    <p className="text-sm text-garderobe-gray-600">
                      Resend OTP in {otpTimer} seconds
                    </p>
                  ) : (
                    <button
                      onClick={() => {
                        setShowOtpInput(false)
                        setOtp('')
                        setError('')
                      }}
                      className="text-sm text-garderobe-black hover:text-garderobe-red transition-colors"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}