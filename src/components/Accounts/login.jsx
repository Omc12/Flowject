import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        const handleEmailChange = (e) => {
            setEmail(e.target.value);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'example@example.com' && password === 'password') {
            console.log('Login successful');
        } else {
            console.log('Invalid email or password');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;