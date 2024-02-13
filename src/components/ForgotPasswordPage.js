import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Config from '../utils/Config.js';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation for matching passwords
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch(Config.forgotPasswordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          new_password: newPassword,
          new_password_confirm: confirmPassword,
        }),
      });
  
      if (response.ok) {
        // Handle success response
        alert('Password reset successful. You can now log in with your new password.');
        navigate('/login'); // Redirect user to login page
      } else {
        // Handle non-successful responses
        const errorData = await response.json();
        alert(`Failed to reset password: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('Password reset error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/login');
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
          <label className="block mb-1" htmlFor="newPassword">New Password</label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <FaLock className="text-gray-400" />
            <input
              id="newPassword"
              className="pl-2 outline-none border-none"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="confirmPassword">Confirm New Password</label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <FaLock className="text-gray-400" />
            <input
              id="confirmPassword"
              className="pl-2 outline-none border-none"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-6 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Reset Password
          </button>
          <button
            className="border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 focus:outline-none"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default ForgotPasswordPage;
