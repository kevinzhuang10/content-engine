'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error refreshing auth:', error)
        setUser(null)
        setSession(null)
      } else {
        setUser(session?.user ?? null)
        setSession(session)
      }
    } catch (error) {
      console.error('Unexpected error refreshing auth:', error)
      setUser(null)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      } else {
        setUser(null)
        setSession(null)
      }
    } catch (error) {
      console.error('Unexpected error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting initial session:', error)
          setUser(null)
          setSession(null)
        } else {
          setUser(session?.user ?? null)
          setSession(session)
        }
      } catch (error) {
        console.error('Unexpected error getting initial session:', error)
        setUser(null)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)

      if (session) {
        setUser(session.user)
        setSession(session)
      } else {
        setUser(null)
        setSession(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    session,
    loading,
    signOut,
    refresh,
  }
}

export { AuthContext }