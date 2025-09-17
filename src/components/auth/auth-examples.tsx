'use client'

/**
 * Example components showing how to use the authentication hooks
 * These are for documentation and testing purposes
 */

import { useAuth } from '@/hooks/use-auth'
import { useOTPAuth } from '@/hooks/use-otp-auth'
import { useRequireAuth, useAuthStatus } from '@/hooks/use-require-auth'
import { useState } from 'react'

// Example 1: Simple auth status display
export function AuthStatus() {
  const { user, loading } = useAuthStatus()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {user ? (
        <p>Logged in as: {user.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}

// Example 2: Protected component that requires auth
export function ProtectedComponent() {
  const { user, loading } = useRequireAuth()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Protected Content</h2>
      <p>Welcome, {user?.email}!</p>
    </div>
  )
}

// Example 3: OTP login form
export function OTPLoginForm() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const { sendCode, verifyCode, loading, error, emailSent } = useOTPAuth()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await sendCode(email)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && code) {
      const success = await verifyCode(email, code)
      if (success) {
        // User is now authenticated, redirect will happen automatically
        console.log('Login successful!')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      {!emailSent ? (
        <form onSubmit={handleSendCode}>
          <h2 className="text-xl mb-4">Sign In</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <h2 className="text-xl mb-4">Enter Code</h2>
          <p className="mb-4 text-sm text-gray-600">
            We sent a 6-digit code to {email}
          </p>
          <div className="mb-4">
            <label htmlFor="code" className="block mb-2">6-digit code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
              className="w-full p-2 border rounded text-center text-lg"
              disabled={loading}
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  )
}

// Example 4: Sign out button
export function SignOutButton() {
  const { signOut, loading } = useAuth()

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}