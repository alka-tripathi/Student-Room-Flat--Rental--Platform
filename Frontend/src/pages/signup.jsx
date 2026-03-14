import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../style/signup.css';
import { handleError, handleSuccess } from '../utils';

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
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err.message || 'Login  failed');
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
    <div className="body">
      <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name.."
            ></input>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              autoFocus
              placeholder="Enter your email.."
            ></input>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password.."
            ></input>
          </div>
          <button type="submit">Signup</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
}

export default Signup;
