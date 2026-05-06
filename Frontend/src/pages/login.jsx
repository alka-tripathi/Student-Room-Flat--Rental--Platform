import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../style/loginPage.css';
import { handleError, handleSuccess } from '../utils';

function Login() {
  // ❌ REMOVE localhost fallback
  const API_URL = import.meta.env.VITE_API_URL;

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('All fields are required!');
    }

    // ✅ Safety check (important)
    if (!API_URL) {
      return handleError('API URL not configured!');
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ✅ If using cookies (optional but safe)
        credentials: 'include',
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      const { success, message, jwtTokens, name, error } = result;

      if (success) {
        handleSuccess(message);

        localStorage.setItem(
          'user',
          JSON.stringify({
            jwtTokens,
            id: result._id,
            name,
          }),
        );

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error?.details?.length > 0) {
        handleError(error.details[0].message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">Rental.co</div>

      <div className="left-section">
        <img
          src="https://i.pinimg.com/1200x/2e/76/b7/2e76b7b352e21747439a3a0d6bec272c.jpg"
          alt="login"
        />
      </div>

      <div className="right-section">
        <div className="container">
          <h1 style={{ color: '#0D3B66' }}>Login</h1>

          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <input
                onChange={handleChange}
                value={loginInfo.email}
                type="email"
                name="email"
                placeholder="Enter your email.."
                className="inputs"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                onChange={handleChange}
                value={loginInfo.password}
                type="password"
                name="password"
                placeholder="Enter your password.."
                className="inputs"
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
            >
              Login
            </button>

            <span className="login-text">
              Don't have an account? <Link to="/signup">Signup</Link>
            </span>
          </form>

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            theme="colored"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
