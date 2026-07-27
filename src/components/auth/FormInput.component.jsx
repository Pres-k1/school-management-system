// ============================================================
// 2. FormInput.jsx - Reusable input field with validation
// ============================================================
import React, { useState } from 'react';
import './FormInput.css';

/**
 * Enhanced controlled text input field with error reporting, dynamic password visibility toggles, and icon slotting.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.label] - Label text displayed above the input field
 * @param {string} [props.type='text'] - HTML input type attribute ('text', 'email', 'password', etc.)
 * @param {string} props.name - HTML input field name and ID mapping reference
 * @param {string|number} props.value - Controlled input value
 * @param {Function} props.onChange - Input value change event handler
 * @param {Function} [props.onBlur] - Blur event handler (useful for marking fields touched)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Validation error message to render beneath the input
 * @param {boolean} [props.touched] - Indicates if field was interacted with (controls error visibility)
 * @param {boolean} [props.required=false] - Adds required asterisk to label and required attribute to field
 * @param {boolean} [props.disabled=false] - Disables user input
 * @param {React.ReactNode} [props.icon] - Visual icon element inside input box
 * @param {'left'|'right'} [props.iconPosition='left'] - Position of input field icon
 * @param {string} [props.className=''] - Additional outer container class names
 * @param {string} [props.autoComplete='off'] - Browser autocomplete attribute
 * @param {number} [props.maxLength] - Maximum character limit
 * @param {number} [props.minLength] - Minimum character requirement
 * @param {string} [props.pattern] - Regex pattern constraint
 * @param {string} [props.helperText] - Supporting operational text rendered below input when no error is present
 */
const FormInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    touched,
    required = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    className = '',
    autoComplete = 'off',
    maxLength,
    minLength,
    pattern,
    helperText,
    ...rest
}) => {
    // Internal state for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine dynamic input type when field is a password mask
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const togglePassword = () => setShowPassword(!showPassword);

    // Show validation error only if field has been touched by user
    const hasError = error && touched;

    return (
        <div className={`form-input ${className}`}>
            {/* Input Label */}
            {label && (
                <label className="form-input__label" htmlFor={name}>
                    {label}
                    {required && <span className="form-input__required">*</span>}
                </label>
            )}

            {/* Field Wrapper (Icon + Input + Password Toggle Button) */}
            <div className="form-input__wrapper">
                {/* Left Icon Slot */}
                {icon && iconPosition === 'left' && (
                    <span className="form-input__icon form-input__icon--left">{icon}</span>
                )}

                <input
                    id={name}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        form-input__field
                        ${hasError ? 'form-input__field--error' : ''}
                        ${icon && iconPosition === 'left' ? 'form-input__field--has-icon-left' : ''}
                        ${icon && iconPosition === 'right' ? 'form-input__field--has-icon-right' : ''}
                        ${isPassword ? 'form-input__field--password' : ''}
                    `}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    minLength={minLength}
                    pattern={pattern}
                    required={required}
                    {...rest}
                />

                {/* Right Icon Slot (Non-password inputs) */}
                {icon && iconPosition === 'right' && !isPassword && (
                    <span className="form-input__icon form-input__icon--right">{icon}</span>
                )}

                {/* Password Show/Hide Toggle Button */}
                {isPassword && (
                    <button
                        type="button"
                        className="form-input__toggle"
                        onClick={togglePassword}
                        tabIndex="-1" // Exclude toggle button from sequential keyboard tabbing
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            /* Eye Open Icon */
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            /* Eye Off/Closed Icon */
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {/* Contextual Helper Text */}
            {helperText && !hasError && (
                <p className="form-input__helper">{helperText}</p>
            )}

            {/* Validation Error Text */}
            {hasError && <p className="form-input__error">{error}</p>}
        </div>
    );
};

export default FormInput;