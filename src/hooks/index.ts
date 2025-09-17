// Main auth hook and context
export { useAuth, useAuthProvider, AuthContext } from './use-auth'

// OTP authentication
export { useOTPAuth } from './use-otp-auth'

// Auth protection hooks
export {
  useRequireAuth,
  useRedirectIfAuthenticated,
  useAuthStatus
} from './use-require-auth'