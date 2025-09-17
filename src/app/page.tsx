import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gray-50 py-12 px-4">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Engine</h1>
          <p className="text-xl text-gray-600">YouTube to LinkedIn Post Generator</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">🔐 Test Authentication</h2>
            <p className="text-gray-600 mb-6">
              Test the OTP-based authentication system we just built.
            </p>

            <div className="space-y-4">
              <Link
                href="/auth/login"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded text-center transition-colors"
              >
                Go to Login Page
              </Link>

              <Link
                href="/auth-test"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded text-center transition-colors"
              >
                Auth Test Page
              </Link>

              <Link
                href="/dashboard"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded text-center transition-colors"
              >
                Protected Dashboard
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">📧 Email Testing</h2>
            <p className="text-gray-600 mb-6">
              View OTP emails sent during authentication testing.
            </p>

            <a
              href="http://127.0.0.1:54324"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded text-center transition-colors"
            >
              Open Supabase Inbucket
            </a>

            <p className="text-sm text-gray-500 mt-4">
              This opens the email testing interface where you can see the 6-digit OTP codes.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">🧪 How to Test Authentication</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Click &quot;Go to Login Page&quot; above</li>
            <li>Enter any email address (doesn&apos;t need to be real)</li>
            <li>Click &quot;Send Code&quot;</li>
            <li>Open &quot;Supabase Inbucket&quot; to see the email with the 6-digit code</li>
            <li>Copy the code from the email and enter it in the login form</li>
            <li>You should be redirected to the protected dashboard</li>
            <li>Try navigating to different pages to see route protection in action</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
