import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../style/loginPage.css';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyInfo = { ...loginInfo };
    copyInfo[name] = value;
    setLoginInfo(copyInfo);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('All Field is required !!');
    }
    try {
      const url = `${API_URL}/auth/login`; //Ye backend server ka URL hai.
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtTokens, name, error } = result;
      if (success) {
        handleSuccess(message);
        // localStorage.setItem('Jwttoken', token);
        // localStorage.setItem('loggedInUser', name);
        localStorage.setItem(
          'user',
          JSON.stringify({
            jwtTokens: jwtTokens, // FIXED
            id: result._id, //  IMPORTANT
            name: name,
          }),
        );
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error?.details?.length > 0) {
        const details = error.details[0];
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err.message || 'Signup failed');
    }
    console.log(JSON.parse(localStorage.getItem('user')));
    console.log(user);
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
            hideProgressBar={true}
            theme="colored"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
