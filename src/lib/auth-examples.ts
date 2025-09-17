/**
 * Examples of how to use auth middleware and route protection
 * This file is for documentation purposes and shows usage patterns
 */

// Example 1: Protecting a page component (Server Component)
/*
import { requireAuth } from '@/lib/route-protection'

export default async function DashboardPage() {
  // This will redirect to login if user is not authenticated
  const { user } = await requireAuth()

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      // ... rest of your component
    </div>
  )
}
*/

// Example 2: Checking auth status without redirect
/*
import { getCurrentUser } from '@/lib/route-protection'

export default async function OptionalAuthPage() {
  const user = await getCurrentUser()

  return (
    <div>
      {user ? (
        <p>Hello, {user.email}!</p>
      ) : (
        <p>Please <a href="/auth/login">log in</a></p>
      )}
    </div>
  )
}
*/

// Example 3: Protecting an API route
/*
import { requireAuthAPI } from '@/lib/route-protection'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // This will throw if user is not authenticated
    const user = await requireAuthAPI()

    // Your protected API logic here
    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}
*/

// Example 4: Redirecting authenticated users from auth pages
/*
import { redirectIfAuthenticated } from '@/lib/route-protection'

export default async function LoginPage() {
  // Redirect to dashboard if already authenticated
  await redirectIfAuthenticated('/dashboard')

  return (
    <div>
      // Your login form here
    </div>
  )
}
*/

// Example 5: Using auth utilities in client components
/*
'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'

export default function ClientComponent() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  if (!user) return <div>Loading...</div>

  return <div>Hello, {user.email}!</div>
}
*/

export {}