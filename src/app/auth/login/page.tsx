import { redirectIfAuthenticated } from '@/lib/route-protection'
import { OTPLoginForm } from '@/components/auth'

export default async function LoginPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Engine</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <OTPLoginForm />
        </div>

        <div className="mt-6 text-center">
          <div className="p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded text-sm">
            <p><strong>Testing Instructions:</strong></p>
            <p>Enter any email address and click &quot;Send Code&quot;.</p>
            <p>Check <a href="http://127.0.0.1:54324" target="_blank" className="underline">Supabase Inbucket</a> for the 6-digit code.</p>
          </div>
        </div>
      </div>
    </div>
  )
}