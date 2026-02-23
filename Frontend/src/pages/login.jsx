// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../style/LoginPage.css';

// export default function LoginPage() {
//   const [role, setRole] = useState('renter');

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="input-field"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="input-field"
//         />

//         {/* Role Selection */}
//         <div className="role-container">
//           <button
//             className={role === 'renter' ? 'role-btn active-role' : 'role-btn'}
//             onClick={() => setRole('renter')}
//           >
//             Renter
//           </button>
//           <button
//             className={role === 'owner' ? 'role-btn active-role' : 'role-btn'}
//             onClick={() => setRole('owner')}
//           >
//             Owner
//           </button>
//         </div>

//         <button className="login-btn" >Login</button>
//       </div>
//     </div>
//   );
// }

import React from 'react';

function Login() {
  return (
    <div>
      <h2>Login page</h2>
    </div>
  );
}

export default Login;
