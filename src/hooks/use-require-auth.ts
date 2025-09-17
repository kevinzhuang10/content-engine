'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './use-auth'

interface UseRequireAuthOptions {
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

/**
 * Hook to require authentication in client components
 * Redirects to login if user is not authenticated
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const {
    redirectTo = '/auth/login',
    redirectIfAuthenticated = false
  } = options

  useEffect(() => {
    if (loading) return

    if (redirectIfAuthenticated && user) {
      // Redirect authenticated users away (useful for login pages)
      router.push('/dashboard')
    } else if (!redirectIfAuthenticated && !user) {
      // Redirect unauthenticated users to login
      const currentPath = window.location.pathname
      const loginUrl = `${redirectTo}?redirectTo=${encodeURIComponent(currentPath)}`
      router.push(loginUrl)
    }
  }, [user, loading, router, redirectTo, redirectIfAuthenticated])

  return {
    user,
    loading,
    isAuthenticated: !!user,
  }
}

/**
 * Hook to redirect authenticated users away from auth pages
 */
export function useRedirectIfAuthenticated(redirectTo = '/dashboard') {
  return useRequireAuth({
    redirectTo,
    redirectIfAuthenticated: true
  })
}

/**
 * Hook that returns auth status without redirecting
 */
export function useAuthStatus() {
  const { user, loading } = useAuth()

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isLoading: loading,
  }
}