import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/Signup';
import Home from './pages/Home.jsx';
import './App.css';
import LoginPage from './pages/Login';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/home"
          element={<Home></Home>}
        ></Route>
        <Route
          path="/signup"
          element={<SignupPage></SignupPage>}
        ></Route>

        <Route
          path="/login"
          element={<LoginPage></LoginPage>}
        ></Route>

        <Route
          path="*"
          element={<LoginPage></LoginPage>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
