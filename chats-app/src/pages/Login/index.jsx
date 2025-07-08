import React, { useState } from 'react';
import { useAuth } from "../../context_rout"
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const { socketRef } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { initial, setInitial } = useAuth();
    const navigate = useNavigate();
    async function handleSubmit() {
        console.log('Login attempt:', { username, password });
        const user = { username, password };
        let response = await fetch("http://localhost:3500/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            setInitial(!initial);
            socketRef.current = io('http://localhost:4000/', {
                path: "/socket.io/",
                transports: ["websocket"],
                auth: { username }
            });
            socketRef.current.on('connect', () => {
                console.log('Connected:', socketRef.current.id);
            });
            navigate("/");
        }
    }

    return (
        <>
            <div className="whisperwire-login-page">
                <div className="whisperwire-login-container">
                    {/* Left side - Login Form */}
                    <div className="whisperwire-login-section">
                        <div className="whisperwire-login-content">
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
                                <h1>Welcome back</h1>
                                <p>Please enter your details</p>
                            </div>

                            {/* Form */}
                            <div className="whisperwire-form">
                                {/* Username Input */}
                                <div className="whisperwire-form-group">
                                    <label htmlFor="whisperwire-username" className="whisperwire-form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="whisperwire-username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="whisperwire-form-input"
                                        placeholder="Enter your username"
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="whisperwire-form-input"
                                        placeholder="Enter your password"
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
                                            // Eye-off SVG
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 012.92-4.36m2.1-1.7A9.96 9.96 0 0112 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 01-4.17 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                                            </svg>
                                        ) : (
                                            // Eye SVG
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="22" height="22">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Sign In Button */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="whisperwire-sign-in-btn"
                                >
                                    Sign in
                                </button>

                                {/* Sign Up Link */}
                                <div className="whisperwire-signup-link">
                                    Don't have an account?{' '}
                                    <a href="/signup">Sign up</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="whisperwire-image-section">
                        <img
                            src="https://images.unsplash.com/photo-1618498081964-ab0c002e0935?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Login background"
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

export default Login;