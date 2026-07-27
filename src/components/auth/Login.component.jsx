// src/components/auth/Login.jsx
import React, { useState } from 'react';
import AuthLayout from './AuthLayout.component';
import FormInput from './FormInput.component';
import FormButton from './FormButton.component';
import './AuthPages.css';

/**
 * User login page component supporting role selection, persistent sessions, and form validation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback triggered upon valid form submission; receives `{ email, password, role, remember }`
 * @param {Function} props.onForgotPassword - Navigation handler triggered when user clicks "Forgot password?"
 * @param {Function} props.onRegister - Navigation handler triggered when user clicks "Sign up"
 * @param {boolean} [props.loading=false] - Disables form actions and displays spinner on action button
 * @param {string|null} [props.error=null] - Server error message string to render in banner format
 * @param {React.ReactNode} [props.logo=null] - Custom header branding logo
 */
const Login = ({
    onSubmit,
    onForgotPassword,
    onRegister,
    loading = false,
    error = null,
    logo = null,
}) => {
    // Form Input State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Admin', // Default initial role[cite: 8]
        remember: false,
    });

    // Touch State (tracks if user interacted with field to prevent premature error popups)
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        role: false,
    });

    // Validation Error State
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        role: '',
    });

    /**
     * Field Validator
     * @param {string} name - Input field name
     * @param {string} value - Input value
     * @returns {string} Error message string or empty string if valid
     */
    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) return 'Email is required';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters';
                return '';
            case 'role':
                if (!value) return 'Please select a role';
                return '';
            default:
                return '';
        }
    };

    /** Handles dynamic field updates & real-time re-validation for touched inputs */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (touched[name]) {
            const errorMsg = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: errorMsg }));
        }
    };

    /** Marks fields touched on blur and performs instant validation check */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const errorMsg = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    /** Validates all fields and fires onSubmit handler if valid */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all inputs simultaneously
        const newErrors = {
            email: validateField('email', formData.email),
            password: validateField('password', formData.password),
            role: validateField('role', formData.role),
        };
        setErrors(newErrors);
        setTouched({ email: true, password: true, role: true });

        const hasError = Object.values(newErrors).some((err) => err !== '');
        if (hasError) return;

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    /* Inline Icons */
    const EmailIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );

    const LockIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );

    const defaultLogo = (
        <span>
            📚 <span>SchoolMS</span>
        </span>
    );

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
            logo={logo || defaultLogo}
        >
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {/* Global Top Error Banner */}
                {error && (
                    <div className="auth-form__error-banner">
                        <span>⚠</span> {error}
                    </div>
                )}

                {/* Email Field */}
                <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tasik.school.ug"
                    error={errors.email}
                    touched={touched.email}
                    required
                    icon={<EmailIcon />}
                    autoComplete="email"
                />

                {/* Password Field */}
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    error={errors.password}
                    touched={touched.password}
                    required
                    icon={<LockIcon />}
                    autoComplete="current-password"
                />

                {/* System Role Selection Dropdown */}
                <div className="form-input">
                    <label className="form-input__label" htmlFor="role">
                        Role <span className="form-input__required">*</span>
                    </label>
                    <div className="form-input__wrapper">
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`
                                form-input__field
                                ${errors.role && touched.role ? 'form-input__field--error' : ''}
                            `}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                            <option value="parent">Parent</option>
                        </select>
                    </div>
                    {errors.role && touched.role && (
                        <p className="form-input__error">{errors.role}</p>
                    )}
                </div>

                {/* Secondary Actions (Remember Me & Password Recovery) */}
                <div className="auth-form__options">
                    <label className="auth-form__remember">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                        />
                        <span>Remember me</span>
                    </label>
                    <button
                        type="button"
                        className="auth-form__link"
                        onClick={onForgotPassword}
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Submit Button */}
                <FormButton
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    loading={loading}
                    disabled={loading}
                >
                    Sign In
                </FormButton>

                {/* Registration Link Footer */}
                <div className="auth-form__footer">
                    <span>Don't have an account?</span>
                    <button type="button" className="auth-form__link" onClick={onRegister}>
                        Sign up
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;