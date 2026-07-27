// ============================================================
// 3. FormButton.jsx - Reusable button with loading state
// ============================================================
import React from 'react';
import './FormButton.css';

/**
 * Customizable button component supporting state variations, loading spinners, and icon integration.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Text or elements rendered inside the button
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Standard HTML button type attribute
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] - Visual style variant
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Sizing variant
 * @param {boolean} [props.loading=false] - Triggers loading state (replaces content with spinner & disables interactions)
 * @param {boolean} [props.disabled=false] - Disables the button from click interactions
 * @param {boolean} [props.fullWidth=false] - When true, expands the button to fill 100% of parent container width
 * @param {React.ReactNode} [props.icon] - Icon component to display alongside text
 * @param {'left'|'right'} [props.iconPosition='left'] - Determines whether icon appears before or after label
 * @param {Function} [props.onClick] - Click event handler callback
 * @param {string} [props.className=''] - Additional CSS classes to attach to the root element
 */
const FormButton = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    onClick,
    className = '',
    ...rest
}) => {
    // Dynamic class construction based on props
    const buttonClasses = `
        form-btn
        form-btn--${variant}
        form-btn--${size}
        ${fullWidth ? 'form-btn--full' : ''}
        ${loading ? 'form-btn--loading' : ''}
        ${disabled ? 'form-btn--disabled' : ''}
        ${className}
    `;

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading} // Prevent clicks during loading state
            {...rest}
        >
            {loading ? (
                /* Animated SVG Loading Spinner */
                <span className="form-btn__spinner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                </span>
            ) : (
                /* Standard Button Label & Icon Rendering */
                <>
                    {icon && iconPosition === 'left' && (
                        <span className="form-btn__icon form-btn__icon--left">{icon}</span>
                    )}
                    <span className="form-btn__text">{children}</span>
                    {icon && iconPosition === 'right' && (
                        <span className="form-btn__icon form-btn__icon--right">{icon}</span>
                    )}
                </>
            )}
        </button>
    );
};

export default FormButton;