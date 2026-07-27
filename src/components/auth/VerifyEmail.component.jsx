// ============================================================
// 7. VerifyEmail.jsx - Verify email page
// ============================================================
import React, { useState, useEffect } from 'react';
import AuthLayout from './AuthLayout.component';
import FormButton from './FormButton.component';
import './AuthPages.css';

/**
 * 6-digit OTP email verification screen with auto-focus shifting, paste handling, and a resend cooldown timer.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onVerify - Verification handler triggered when full code is provided; receives `code` (string)
 * @param {Function} props.onResend - Handler triggered when resending verification code; receives target `email`
 * @param {Function} props.onBackToLogin - Navigates user back to login screen
 * @param {string} [props.email=''] - Email address target for code verification
 * @param {boolean} [props.loading=false] - Submission loading state
 * @param {string|null} [props.error=null] - Banner error text string
 * @param {boolean} [props.success=false] - Shows success panel upon successful verification
 * @param {React.ReactNode} [props.logo=null] - Optional visual logo component
 */
const VerifyEmail = ({
    onVerify,
    onResend,
    onBackToLogin,
    email = '',
    loading = false,
    error = null,
    success = false,
    logo = null,
}) => {
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

    /** Countdown timer logic for Resend Code button */
    useEffect(() => {
        if (countdown > 0 && !canResend) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setCanResend(true);
        }
    }, [countdown, canResend]);

    /** Handles character entry and advances focus to next input */
    const handleCodeChange = (index, value) => {
        if (value.length > 1) return;
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto-advance focus to next field if value entered
        if (value && index < 5) {
            const nextInput = document.getElementById(`verify-code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    /** Handles backspace key navigation to automatically refocus preceding digit field */
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`verify-code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    /** Handles clipboard paste events to distribute digits across all inputs */
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        const digits = pasteData.split('');
        const newCode = [...verificationCode];
        digits.forEach((digit, i) => {
            if (i < 6 && /[0-9]/.test(digit)) {
                newCode[i] = digit;
            }
        });
        setVerificationCode(newCode);

        // Focus the first empty slot or final input box
        const lastIndex = newCode.findIndex((val) => val === '');
        const focusIndex = lastIndex === -1 ? 5 : lastIndex;
        const input = document.getElementById(`verify-code-${focusIndex}`);
        if (input) input.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = verificationCode.join('');
        if (code.length !== 6) return;
        if (onVerify) {
            onVerify(code);
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        setCountdown(60);
        setCanResend(false);
        if (onResend) {
            onResend(email);
        }
    };

    const handleBackToLogin = () => {
        if (onBackToLogin) onBackToLogin();
    };

    /* Icons */
    const MailIcon = () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4a6cf7' }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );

    const CheckIcon = () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
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
            title="Verify Your Email"
            subtitle={`We sent a 6-digit code to ${email || 'your email'}`}
            logo={logo || defaultLogo}
        >
            {success ? (
                /* Verification Confirmation Screen */
                <div className="auth-form__success auth-form__success--verify">
                    <div className="auth-form__success-icon">
                        <CheckIcon />
                    </div>
                    <h3 className="auth-form__success-title">Email Verified!</h3>
                    <p className="auth-form__success-message">
                        Your email has been successfully verified. You can now access your account.
                    </p>
                    <div className="auth-form__success-actions">
                        <FormButton
                            type="button"
                            variant="primary"
                            size="large"
                            fullWidth
                            onClick={handleBackToLogin}
                        >
                            Go to Login
                        </FormButton>
                    </div>
                </div>
            ) : (
                /* 6-Digit Code Input Form */
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="auth-form__error-banner">
                            <span>⚠</span> {error}
                        </div>
                    )}

                    <div className="auth-form__verify-icon">
                        <MailIcon />
                    </div>

                    <p className="auth-form__verify-instruction">
                        Enter the 6-digit verification code sent to your email.
                    </p>

                    {/* Array Mapping to 6 Code Input Boxes */}
                    <div className="auth-form__code-inputs">
                        {verificationCode.map((digit, index) => (
                            <input
                                key={index}
                                id={`verify-code-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined} // Attach paste listener to first slot
                                className={`auth-form__code-input ${digit ? 'auth-form__code-input--filled' : ''}`}
                                aria-label={`Digit ${index + 1} of 6`}
                                autoFocus={index === 0}
                                disabled={loading}
                            />
                        ))}
                    </div>

                    {/* Resend Code Action & Countdown Indicator */}
                    <div className="auth-form__resend">
                        <span className="auth-form__resend-text">
                            Didn't receive the code?
                        </span>
                        {canResend ? (
                            <button
                                type="button"
                                className="auth-form__link auth-form__link--resend"
                                onClick={handleResend}
                            >
                                Resend Code
                            </button>
                        ) : (
                            <span className="auth-form__resend-countdown">
                                Resend in {countdown}s
                            </span>
                        )}
                    </div>

                    <FormButton
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={loading}
                        disabled={loading || verificationCode.join('').length !== 6} // Disabled until all 6 digits entered
                    >
                        Verify Email
                    </FormButton>

                    <div className="auth-form__footer">
                        <button
                            type="button"
                            className="auth-form__link auth-form__link--back"
                            onClick={handleBackToLogin}
                        >
                            ← Back to Login
                        </button>
                    </div>
                </form>
            )}
        </AuthLayout>
    );
};

export default VerifyEmail;