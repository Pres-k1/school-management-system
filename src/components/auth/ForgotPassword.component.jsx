// ============================================================
// 5. ForgotPassword.jsx - Forgot password page
// ============================================================
import React, { useState } from 'react';
import AuthLayout from './AuthLayout.component';
import FormInput from './FormInput.component';
import FormButton from './FormButton.component';
import './AuthPages.css';

/**
 * Forgot Password recovery screen. Requests user email and displays a confirmation message upon dispatch.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback triggered when submitting email; receives target `email` string
 * @param {Function} props.onBackToLogin - Handler navigating user back to the login screen
 * @param {boolean} [props.loading=false] - Loading state for reset submit button
 * @param {string|null} [props.error=null] - Banner error message text
 * @param {boolean} [props.success=false] - Toggles the success confirmation view card
 * @param {React.ReactNode} [props.logo=null] - Optional logo header
 */
const ForgotPassword = ({
    onSubmit,
    onBackToLogin,
    loading = false,
    error = null,
    success = false,
    logo = null,
}) => {
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState(false);
    const [emailError, setEmailError] = useState('');

    /** Validates structure of target recovery email */
    const validateEmail = (value) => {
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';
        return '';
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (touched) {
            setEmailError(validateEmail(value));
        }
    };

    const handleBlur = () => {
        setTouched(true);
        setEmailError(validateEmail(email));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMsg = validateEmail(email);
        setEmailError(errorMsg);
        setTouched(true);

        if (errorMsg) return;

        if (onSubmit) {
            onSubmit(email);
        }
    };

    /* Icons */
    const EmailIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );

    const ArrowLeftIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );

    const CheckIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );

    const defaultLogo = (
        <span>
            📚 <span>SchoolMS</span>
        </span>
    );

    return (
        <AuthLayout
            title="Forgot Password"
            subtitle="Enter your email and we'll send you a reset link"
            logo={logo || defaultLogo}
        >
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {/* Global Error Header Banner */}
                {error && (
                    <div className="auth-form__error-banner">
                        <span>⚠</span> {error}
                    </div>
                )}

                {/* Conditional View: Render Confirmation screen if success = true, else input form */}
                {success ? (
                    <div className="auth-form__success">
                        <div className="auth-form__success-icon">
                            <CheckIcon />
                        </div>
                        <h3 className="auth-form__success-title">Check your email</h3>
                        <p className="auth-form__success-message">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <p className="auth-form__success-hint">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        <div className="auth-form__success-actions">
                            <FormButton
                                type="button"
                                variant="outline"
                                size="medium"
                                onClick={onBackToLogin}
                            >
                                <ArrowLeftIcon /> Back to Login
                            </FormButton>
                        </div>
                    </div>
                ) : (
                    <>
                        <FormInput
                            label="Email Address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="you@school.edu"
                            error={emailError}
                            touched={touched}
                            required
                            icon={<EmailIcon />}
                            autoComplete="email"
                            helperText="Enter the email address associated with your account"
                        />

                        <FormButton
                            type="submit"
                            variant="primary"
                            size="large"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                        >
                            Send Reset Link
                        </FormButton>

                        <div className="auth-form__footer">
                            <button
                                type="button"
                                className="auth-form__link auth-form__link--back"
                                onClick={onBackToLogin}
                            >
                                <ArrowLeftIcon /> Back to Login
                            </button>
                        </div>
                    </>
                )}
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;