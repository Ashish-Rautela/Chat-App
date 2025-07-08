import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log('Signup attempt:', formData);
            const response = await fetch("http://localhost:3500/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Signup Successful. Redirecting To Login");
                
                navigate("/login");
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert("Signup failed. " + (errorData.error || "Please try again."));
            }
        } catch (error) {
            console.error("Error details:", error);
            alert("Failed to connect to the server. Please check your internet connection or server status.");
        }
    }

    return (
        <>

            <div className="whisperwire-signup-page">
                <div className="whisperwire-signup-container">
                    {/* Left side - Signup Form */}
                    <div className="whisperwire-signup-section">
                        <div className="whisperwire-signup-content">
                            {/* Logo */}
                            <div className="whisperwire-logo">
                                <div className="whisperwire-logo-container">
                                    <div className="whisperwire-logo-icon">
                                        <div className="whisperwire-logo-icon-inner"></div>
                                    </div>
                                    WhisperWire
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <div className="whisperwire-welcome">
                                <h1>Create your account</h1>
                                <p>Join WhisperWire and start your secure journey</p>
                            </div>

                            {/* Form */}
                            <div className="whisperwire-form">
                                {/* Name Fields */}
                                <div className="whisperwire-form-row">
                                    <div className="whisperwire-form-group">
                                        <label htmlFor="whisperwire-firstname" className="whisperwire-form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="whisperwire-firstname"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="whisperwire-form-input"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div className="whisperwire-form-group">
                                        <label htmlFor="whisperwire-lastname" className="whisperwire-form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="whisperwire-lastname"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="whisperwire-form-input"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Username Input */}
                                <div className="whisperwire-form-group">
                                    <label htmlFor="whisperwire-username" className="whisperwire-form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="whisperwire-username"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        className="whisperwire-form-input"
                                        placeholder="johndoe"
                                        required
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="whisperwire-form-group" style={{ position: 'relative' }}>
                                    <label htmlFor="whisperwire-password" className="whisperwire-form-label">
                                        Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="whisperwire-password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="whisperwire-form-input"
                                        placeholder="Create a strong password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '2.6rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#6b7280',
                                            fontSize: '1.2rem',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 012.92-4.36m2.1-1.7A9.96 9.96 0 0112 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 01-4.17 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Confirm Password Input */}
                                <div className="whisperwire-form-group" style={{ position: 'relative' }}>
                                    <label htmlFor="whisperwire-confirm-password" className="whisperwire-form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="whisperwire-confirm-password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className="whisperwire-form-input"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '2.6rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#6b7280',
                                            fontSize: '1.2rem',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        tabIndex={-1}
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 012.92-4.36m2.1-1.7A9.96 9.96 0 0112 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 01-4.17 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Sign Up Button */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="whisperwire-sign-up-btn"
                                >
                                    Create Account
                                </button>

                                {/* Login Link */}
                                <div className="whisperwire-login-link">
                                    Already have an account?{' '}
                                    <a href="/login">Sign in</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="whisperwire-image-section">
                        <img
                            src="https://images.unsplash.com/photo-1618498081964-ab0c002e0935?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Signup background"
                            className="whisperwire-background-image"
                        />

                        {/* Text overlay */}
                        <div className="whisperwire-text-overlay">
                            <h2>
                                Secure by Design. Private by Nature.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;