import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../style/signup.css';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const API_URL = import.meta.env.VITE_API_URL; 

  const [signupInfo, setsignup] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('All fields are required!');
    }

    if (!API_URL) {
      return handleError('API URL not configured!');
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error?.details?.length > 0) {
        handleError(error.details[0].message);
      } else {
        handleError(message || 'Signup failed');
      }
    } catch (err) {
      handleError(err.message || 'Signup failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setsignup({
      ...signupInfo,
      [name]: value,
    });
  };

  return (
    <div className="signup-page">
      <div className="login-logo">Rental.co</div>

      <div className="left-section">
        <img
          src="https://i.pinimg.com/1200x/43/56/60/435660a0b77945971c07daca4c554bdd.jpg"
          alt="signup"
        />
      </div>

      <div className="right-section">
        <div className="container">
          <h1 style={{ color: '#0D3B66' }}>Signup</h1>

          <form onSubmit={handleSignup}>
            <div>
              <label>Name</label>
              <input
                required
                onChange={handleChange}
                value={signupInfo.name}
                type="text"
                name="name"
                placeholder="Enter your name.."
              />
            </div>

            <div>
              <label>Email</label>
              <input
                required
                onChange={handleChange}
                value={signupInfo.email}
                type="email"
                name="email"
                placeholder="Enter your email.."
              />
            </div>

            <div>
              <label>Password</label>
              <input
                required
                onChange={handleChange}
                value={signupInfo.password}
                type="password"
                name="password"
                placeholder="Enter your password.."
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Signup
            </button>

            <span className="signup-text">
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
