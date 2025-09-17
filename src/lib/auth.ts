import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

export interface OTPSendResult {
  success: boolean
  error?: string
}

export interface OTPVerifyResult {
  success: boolean
  error?: string
  user?: User | null
  session?: Session | null
}

/**
 * Send an OTP code to the user's email address
 */
export async function sendOTP(email: string): Promise<OTPSendResult> {
  try {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Prevent automatic user creation if needed
        shouldCreateUser: true,
      }
    })

    if (error) {
      console.error('OTP send error:', error)
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error sending OTP:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

/**
 * Verify the OTP code entered by the user
 */
export async function verifyOTP(email: string, token: string): Promise<OTPVerifyResult> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })

    if (error) {
      console.error('OTP verify error:', error)
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    }
  } catch (error) {
    console.error('Unexpected error verifying OTP:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Sign out error:', error)
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error signing out:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

/**
 * Get the current user session
 */
export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Get user error:', error)
      return null
    }

    return user
  } catch (error) {
    console.error('Unexpected error getting user:', error)
    return null
  }
}