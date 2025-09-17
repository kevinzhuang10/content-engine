'use client'

import { useState } from 'react'
import { sendOTP, verifyOTP } from '@/lib/auth'
import { useAuth } from './use-auth'

interface OTPAuthState {
  loading: boolean
  error: string | null
  emailSent: boolean
}

export function useOTPAuth() {
  const [state, setState] = useState<OTPAuthState>({
    loading: false,
    error: null,
    emailSent: false,
  })

  const { refresh } = useAuth()

  const sendCode = async (email: string): Promise<boolean> => {
    setState({ loading: true, error: null, emailSent: false })

    try {
      const result = await sendOTP(email)

      if (result.success) {
        setState({ loading: false, error: null, emailSent: true })
        return true
      } else {
        setState({ loading: false, error: result.error || 'Failed to send code', emailSent: false })
        return false
      }
    } catch (error) {
      console.error('Unexpected error sending OTP:', error)
      setState({ loading: false, error: 'An unexpected error occurred', emailSent: false })
      return false
    }
  }

  const verifyCode = async (email: string, code: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await verifyOTP(email, code)

      if (result.success) {
        setState(prev => ({ ...prev, loading: false, error: null }))
        // Refresh the auth context
        await refresh()
        return true
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: result.error || 'Invalid code. Please try again.'
        }))
        return false
      }
    } catch (error) {
      console.error('Unexpected error verifying OTP:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'An unexpected error occurred'
      }))
      return false
    }
  }

  const reset = () => {
    setState({ loading: false, error: null, emailSent: false })
  }

  return {
    ...state,
    sendCode,
    verifyCode,
    reset,
  }
}