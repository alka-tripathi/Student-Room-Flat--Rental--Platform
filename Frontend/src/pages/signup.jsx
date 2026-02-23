// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../style/signup.css';

// export default function SignupPage() {
//   const [role, setRole] = useState('renter');
//   const navigate = useNavigate();

//   function handleSignup() {
//     // after signup logic
//     navigate('/login');
//   }

//   return (
//     <div className="container">
//       {/* LEFT PART */}
//       <div className="signup-left-part">
//         <div className="overlay">
//           <div className="left-content">
//             <h1>
//               Find a place <br /> you'll love
//             </h1>
//             <p>
//               Create your account and start exploring your perfect rental home
//               today.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT PART */}
//       <div className="right-part">
//         <div className="signup-container">
//           <h2>Sign Up</h2>

//           <input
//             type="email"
//             placeholder="Email"
//             className="input-field"
//             name="email"
//           />
//           <input
//             type="password"
//             placeholder="Create Password"
//             className="input-field"
//             name="password"
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="input-field"
//             name="confirm-password"
//           />

//           {/* ROLE SELECTION */}
//           <div className="role-buttons">
//             <button
//               className={`role-button ${role === 'renter' ? 'active' : ''}`}
//               onClick={() => setRole('renter')}
//             >
//               Renter
//             </button>

//             <button
//               className={`role-button ${role === 'owner' ? 'active' : ''}`}
//               onClick={() => setRole('owner')}
//             >
//               Owner
//             </button>
//           </div>

//           <button
//             className="signup-button"
//             onClick={handleSignup}
//           >
//             Create Account
//           </button>

//           <p className="login-link">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';

function Signup() {
  return (
    <div>
      <h1>Signup page</h1>
    </div>
  );
}

export default Signup;
