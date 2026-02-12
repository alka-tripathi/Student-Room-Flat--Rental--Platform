import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [role, setRole] = useState("renter");

  return (
    <div className="container">

      {/* Left part */}
      <div className="left-part">
        <div className="overlay">
          <div className="left-content">
            <h1>A place <br /> to call home</h1>
            <p>Find your perfect rental space and connect with the right people, all in one place.</p>
          </div>
        </div>
      </div>

      {/* Right part */}
      <div className="right-part">
        <div className="login-container">
          <h2>Login</h2>
          
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />

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

          <button className="login-button">Login</button>

          <p className="forgot-password">Forgot password?</p>
        </div>
      </div>
    </div>
  );
}
