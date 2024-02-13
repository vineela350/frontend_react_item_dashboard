import React, { useState } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Assuming you have created LoginPage
import ItemDashboard from './components/ItemDashboard';
import CreateAccount from './components/CreateAccount';
import ForgotPasswordPage from './components/ForgotPasswordPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogin = (credentials) => {
    // TODO: implement login logic and set isLoggedIn to true if successful
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={token ? <ItemDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
