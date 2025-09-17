import { requireAuth } from '@/lib/route-protection'
import { SignOutButton } from '@/components/auth'

export default async function DashboardPage() {
  // This will redirect to login if user is not authenticated
  const { user } = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
            <p className="text-gray-600">
              You are successfully authenticated as: <strong>{user.email}</strong>
            </p>
          </div>

          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded mb-6">
            ✅ This is a protected page that requires authentication.
            The middleware automatically redirected you here after login, or would redirect you to login if you weren&apos;t authenticated.
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">User ID:</h3>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{user.id}</code>
            </div>

            <div>
              <h3 className="font-semibold">Created:</h3>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {new Date(user.created_at).toLocaleString()}
              </code>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  )
}