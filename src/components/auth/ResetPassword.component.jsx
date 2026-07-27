// ============================================================
// 6. ResetPassword.jsx - Reset password page
// ============================================================
import React, { useState } from 'react';
import AuthLayout from './AuthLayout.component';
import FormInput from './FormInput.component';
import FormButton from './FormButton.component';
import './AuthPages.css';

/**
 * Reset Password view where users set a new password via a reset token.
 * Enforces strong password rules (≥6 chars, uppercase letter, number, and matching confirm field).
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback triggered on submit; receives `{ password, token }`
 * @param {Function} props.onBackToLogin - Navigates user back to login view
 * @param {boolean} [props.loading=false] - Button loading state
 * @param {string|null} [props.error=null] - Banner error string
 * @param {boolean} [props.success=false] - Renders reset confirmation success panel when true
 * @param {string} [props.token=''] - Password reset verification token string passed from URL query parameters
 * @param {React.ReactNode} [props.logo=null] - Custom header branding logo
 */
const ResetPassword = ({
    onSubmit,
    onBackToLogin,
    loading = false,
    error = null,
    success = false,
    token = '',
    logo = null,
}) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false,
    });

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });

    /** Enforces uppercase, numeric character, and field match validations */
    const validateField = (name, value) => {
        switch (name) {
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters';
                if (!/(?=.*[A-Z])/.test(value)) {
                    return 'Password must contain at least one uppercase letter';
                }
                if (!/(?=.*[0-9])/.test(value)) {
                    return 'Password must contain at least one number';
                }
                return '';
            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const errorMsg = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: errorMsg }));
        }

        // Cross-validate confirmation field if main password updates
        if (name === 'password' && touched.confirmPassword) {
            const confirmError = validateField('confirmPassword', formData.confirmPassword);
            setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const errorMsg = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            password: validateField('password', formData.password),
            confirmPassword: validateField('confirmPassword', formData.confirmPassword),
        };
        setErrors(newErrors);
        setTouched({ password: true, confirmPassword: true });

        const hasError = Object.values(newErrors).some((err) => err !== '');
        if (hasError) return;

        if (onSubmit) {
            onSubmit({ password: formData.password, token });
        }
    };

    /* Icons */
    const LockIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );

    const CheckIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22c55e' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );

    const ArrowLeftIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );

    const defaultLogo = (
        <span>
            📚 <span>SchoolMS</span>
        </span>
    );

    return (
        <AuthLayout
            title="Create New Password"
            subtitle="Choose a strong password for your account"
            logo={logo || defaultLogo}
        >
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {error && (
                    <div className="auth-form__error-banner">
                        <span>⚠</span> {error}
                    </div>
                )}

                {success ? (
                    /* Success Banner State */
                    <div className="auth-form__success">
                        <div className="auth-form__success-icon">
                            <CheckIcon />
                        </div>
                        <h3 className="auth-form__success-title">Password Reset Successfully</h3>
                        <p className="auth-form__success-message">
                            Your password has been updated. You can now log in with your new password.
                        </p>
                        <div className="auth-form__success-actions">
                            <FormButton
                                type="button"
                                variant="primary"
                                size="large"
                                fullWidth
                                onClick={onBackToLogin}
                            >
                                Go to Login
                            </FormButton>
                        </div>
                    </div>
                ) : (
                    /* Password Input Fields */
                    <>
                        <FormInput
                            label="New Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter new password"
                            error={errors.password}
                            touched={touched.password}
                            required
                            icon={<LockIcon />}
                            autoComplete="new-password"
                            helperText="Must be at least 6 characters with uppercase and number"
                        />

                        <FormInput
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Confirm your password"
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            required
                            icon={<LockIcon />}
                            autoComplete="new-password"
                        />

                        <FormButton
                            type="submit"
                            variant="primary"
                            size="large"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                        >
                            Reset Password
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

export default ResetPassword;