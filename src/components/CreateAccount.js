import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import Config from '../utils/Config.js';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to the Login page
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your actual register API endpoint
      const response = await fetch(Config.createUserUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
  
      if (response.ok) {
        // Handle successful registration here
        console.log('Account created successfully');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        const data = await response.json();
        // Handle errors here
        console.error('Registration failed:', data.message);
        // Show error message to user
      }
    } catch (error) {
      console.error('Network error:', error);
      // Show network error message to user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-gray-800">Kaizntree</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email</label>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <FaUserAlt className="text-gray-400" />
              <input
                id="email"
                className="pl-2 outline-none border-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-6 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              type="submit"
            >
              <FaSignInAlt className="inline mr-2" /> Sign Up
            </button>
            <button
              className="border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 focus:outline-none"
              type="button"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
