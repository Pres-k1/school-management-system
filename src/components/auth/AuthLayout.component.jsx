// ============================================================
// 1. AuthLayout.jsx - Reusable layout wrapper for auth pages
// ============================================================
import React from 'react';
import './AuthLayout.css';

/**
 * AuthLayout provides a consistent layout container for all authentication screens.
 * Handles viewport centering, logo display, title/subtitle header structure, and optional illustrations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form components or main body content to render inside the card
 * @param {string} [props.title] - Main heading text for the authentication page
 * @param {string} [props.subtitle] - Supporting descriptive text under the main heading
 * @param {React.ReactNode} [props.logo] - Brand logo component or element to display above the title
 * @param {React.ReactNode} [props.illustration] - Optional visual graphic rendered beneath the main form
 * @param {string} [props.maxWidth='480px'] - CSS max-width constraint for the white container card
 * 
 * @example
 * <AuthLayout title="Login" subtitle="Please enter your credentials">
 *   <form>...</form>
 * </AuthLayout>
 */
const AuthLayout = ({
    children,
    title,
    subtitle,
    logo,
    illustration,
    maxWidth = '480px',
}) => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__container" style={{ maxWidth }}>
                {/* Brand Logo Header */}
                {logo && <div className="auth-layout__logo">{logo}</div>}

                {/* Main Section Header */}
                <div className="auth-layout__header">
                    {title && <h1 className="auth-layout__title">{title}</h1>}
                    {subtitle && <p className="auth-layout__subtitle">{subtitle}</p>}
                </div>

                {/* Page Content / Form Slots */}
                <div className="auth-layout__content">{children}</div>

                {/* Optional Decorative Illustration Footer */}
                {illustration && (
                    <div className="auth-layout__illustration">{illustration}</div>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;