import { useState } from "react";
import "./signup.css";

export default function SignupPage() {
  const [role, setRole] = useState("renter");

  return (
    <div className="container">

      {/* left */}
      <div className="signup-left-part">
        <div className="overlay">
          <div className="left-content">
            <h1>Find a place <br /> you'll love</h1>
            <p>Create your account and start exploring your perfect rental home today.</p>
          </div>
        </div>
      </div>

      {/*right*/}
      <div className="right-part">
        <div className="signup-container">
          <h2>Sign Up</h2>

          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Create Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />

          {/*role selecting*/}
          <div className="role-buttons">
            <button
              onClick={() => setRole("renter")}
              className={`role-button ${role === "renter" ? "active" : ""}`}
            >
              Renter
            </button>

            <button
              onClick={() => setRole("owner")}
              className={`role-button ${role === "owner" ? "active" : ""}`}
            >
              Owner
            </button>
          </div>

          <button className="signup-button">Create Account</button>

          <p className="login-link">
            Already have an account? <span>Login</span>
          </p>
        </div>
      </div>

    </div>
  );
}
