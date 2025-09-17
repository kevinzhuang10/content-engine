'use client'

import { OTPLoginForm, AuthStatus, SignOutButton } from '@/components/auth'
import { useAuth } from '@/hooks/use-auth'

export default function AuthTestPage() {
  const { user, loading } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Authentication Test Page
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth Status</h2>
          <AuthStatus />

          {loading && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              Authentication state loading...
            </div>
          )}

          {user && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              ✅ Successfully authenticated as: {user.email}
              <div className="mt-2">
                <SignOutButton />
              </div>
            </div>
          )}
        </div>

        {!user && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test OTP Login</h2>
            <OTPLoginForm />
          </div>
        )}

        {user && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>To test authentication:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Enter your email address in the form above</li>
              <li>Click &quot;Send Code&quot; - you&apos;ll see a 6-digit code in the Supabase Inbucket email interface</li>
              <li>Open <a href="http://127.0.0.1:54324" target="_blank" className="text-blue-500 underline">Supabase Inbucket (Email Testing)</a> to see the email</li>
              <li>Copy the 6-digit code from the email</li>
              <li>Enter the code in the verification form</li>
              <li>You should be authenticated and see your user info above</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}