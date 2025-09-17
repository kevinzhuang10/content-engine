import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export interface AuthResult {
  user: User
  isAuthenticated: boolean
}

/**
 * Server-side function to protect pages that require authentication
 * Call this in your page components to ensure user is authenticated
 */
export async function requireAuth(): Promise<AuthResult> {
  const supabase = await createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error || !user) {
    // Redirect to login if not authenticated
    redirect('/auth/login')
  }

  return {
    user,
    isAuthenticated: true
  }
}

/**
 * Server-side function to get current user without redirect
 * Returns null if user is not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.error('Error getting current user:', error)
    return null
  }

  return user
}

/**
 * Check if user is authenticated without throwing or redirecting
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Protect API routes - returns user or throws 401 error
 */
export async function requireAuthAPI(): Promise<User> {
  const supabase = await createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Unauthorized')
  }

  return user
}

/**
 * Redirect authenticated users away from auth pages
 */
export async function redirectIfAuthenticated(redirectTo: string = '/dashboard'): Promise<void> {
  const user = await getCurrentUser()

  if (user) {
    redirect(redirectTo)
  }
}