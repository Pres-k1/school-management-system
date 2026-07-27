/**
 * @file index.js
 * @description Central barrel export file for the Authentication module.
 * Simplifies imports across the application (e.g., `import { Login } from './components/auth'`).
 */

export { default as AuthLayout } from './AuthLayout.component'; // Reusable card layout wrapper[cite: 7]
export { default as FormInput } from './FormInput.component';   // Form input field component[cite: 7]
export { default as FormButton } from './FormButton.component'; // Action button component[cite: 7]
export { default as Login } from './Login.component';           // Login page view[cite: 7]
export { default as ForgotPassword } from './ForgotPassword.component'; // Forgot password recovery view[cite: 7]
export { default as ResetPassword } from './ResetPassword.component';   // Reset password view[cite: 7]
export { default as VerifyEmail } from './VerifyEmail.component';       // 6-digit email OTP verification view[cite: 7]