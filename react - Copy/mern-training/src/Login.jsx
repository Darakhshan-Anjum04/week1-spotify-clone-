import React, { useState } from 'react';
import apiService from './apiService'; // Use apiService for login
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // For handling errors

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.loginUser(user); // Use the login function from apiService
      alert(res.message); // Show success message
    } catch (error) {
      setError(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error if any */}
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="footer">
        <span>Don't have an account? <a href="/SignUpForm">Sign Up</a></span>
      </div>
    </div>
  );
};

export default Login;
