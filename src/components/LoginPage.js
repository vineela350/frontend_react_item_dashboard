import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        // Redirect to the Create Account page
        navigate('/create-account');
    };


    const handleLogin = async () => {

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            // console.log(response);

            const data = await response.json();

            if (response.ok) {
                // Handle successful login here
                localStorage.setItem('token', data.token);
                console.log('Logged in successfully:', data);
                navigate('/dashboard');
                // Redirect to dashboard or set logged in state
            } else {
                // Handle errors here
                alert("Please login with correct username and password");
                console.error('Login failed:', data.message);
                // Show error message to user
            }
        } catch (error) {
            console.error('Network error:', error);
            // Show network error message to user
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-gray-800">Kaizntree</span>
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="username">Username</label>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <FaUserAlt className="text-gray-400" />
                        <input
                            id="username"
                            className="pl-2 outline-none border-none"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <FaLock className="text-gray-400" />
                        <input
                            id="password"
                            className="pl-2 outline-none border-none"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="px-6 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                        onClick={handleLogin}
                    >
                        <FaSignInAlt className="inline mr-2" /> Log In
                    </button >

                    <a href="#" onClick={handleForgotPassword} className="text-sm text-blue-600 hover:underline">Forgot Password</a>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <button
                        className="border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 focus:outline-none"
                        type="button"
                        onClick={handleCreateAccount}

                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
