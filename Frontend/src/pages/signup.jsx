import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../style/signup.css';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
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
      return handleError('All Field is required !!');
    }
    try {
      const url = 'http://localhost:8000/auth/signup'; //Ye backend server ka URL hai.
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error?.details?.length > 0) {
        const details = error.details[0];
        handleError(details);
      } else if (!success) {
        handleError(message || 'signup failed');
      }
      console.log(result);
    } catch (err) {
      handleError(err.message || 'Signup  failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    const copysignup = { ...signupInfo };
    copysignup[name] = value;
    setsignup(copysignup);
  };
  console.log('login info:', signupInfo);

  return (
    <div className="signup-page">
      <div className="login-logo">Rental.co</div>
      <div className="left-section">
        <img
          src="https://i.pinimg.com/1200x/43/56/60/435660a0b77945971c07daca4c554bdd.jpg"
          alt="signup-image"
        />
      </div>
      <div className="right-section">
        <div className="container">
          <h1 style={{ color: '#0D3B66' }}>Signup</h1>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                required
                onChange={handleChange}
                value={signupInfo.name}
                type="text"
                name="name"
                placeholder="Enter your name.."
              ></input>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                onChange={handleChange}
                value={signupInfo.email}
                type="email"
                name="email"
                placeholder="Enter your email.."
              ></input>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                onChange={handleChange}
                value={signupInfo.password}
                type="password"
                name="password"
                placeholder="Enter your password.."
              ></input>
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
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
}

export default Signup;
