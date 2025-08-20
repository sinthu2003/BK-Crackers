import { api, transformResponse, ServiceResponse } from './api'
import { User } from '../types'

interface OTPResponse {
  message: string
  otpSent: boolean
}

interface VerifyOTPResponse {
  token: string
  user: User
  isNewUser: boolean
}

class AuthService {
  async sendOTP(type: 'mobile' | 'whatsapp' | 'email', value: string): Promise<ServiceResponse<OTPResponse>> {
    try {
      const endpoint = type === 'email' ? '/auth/send-email-otp' : '/auth/send-mobile-otp'
      const payload = type === 'email' ? { email: value } : { mobile: value, via: type }
      
      const response = await api.post(endpoint, payload)
      const data = transformResponse<OTPResponse>(response)
      
      return {
        success: true,
        data: data.data || { message: 'OTP sent', otpSent: true }
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      return {
        success: false,
        data: { message: 'Failed to send OTP', otpSent: false },
        error: error instanceof Error ? error.message : 'Failed to send OTP'
      }
    }
  }

  async verifyOTP(type: 'mobile' | 'whatsapp' | 'email', value: string, otp: string): Promise<ServiceResponse<VerifyOTPResponse>> {
    try {
      const endpoint = type === 'email' ? '/auth/verify-email-otp' : '/auth/verify-mobile-otp'
      const payload = type === 'email' 
        ? { email: value, otp } 
        : { mobile: value, otp }
      
      const response = await api.post(endpoint, payload)
      const data = transformResponse<VerifyOTPResponse>(response)
      
      return {
        success: true,
        data: data.data || { token: '', user: { id: '', name: '' }, isNewUser: false }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      return {
        success: false,
        data: { token: '', user: { id: '', name: '' }, isNewUser: false },
        error: error instanceof Error ? error.message : 'Invalid OTP'
      }
    }
  }

  async updateProfile(userId: string, profile: { name?: string; email?: string; mobile?: string }): Promise<ServiceResponse<User>> {
    try {
      const response = await api.put(`/users/${userId}`, profile)
      const data = transformResponse<User>(response)
      
      return {
        success: true,
        data: data.data || { id: userId, ...profile }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      return {
        success: false,
        data: { id: userId, ...profile },
        error: error instanceof Error ? error.message : 'Failed to update profile'
      }
    }
  }
}

export const authService = new AuthService()