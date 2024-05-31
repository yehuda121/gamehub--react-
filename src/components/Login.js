// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Validate credentials
    if (username === 'manager' && password === 'password') {
      onLogin(username);
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
