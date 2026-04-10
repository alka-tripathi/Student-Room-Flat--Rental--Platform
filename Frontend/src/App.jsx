import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/Signup';
import Home from './pages/Home.jsx';
import './App.css';
import LoginPage from './pages/Login';
import NewRoom from './pages/NewRoom.jsx';
import LikedRoom from './pages/LikedRoom.jsx';
import RoomDetails from './pages/RoomDetails.jsx';

/* 🔥 ADD THIS */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [likedRooms, setLikedRooms] = useState([]);

  useEffect(() => {
    const fetchLikedRooms = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8000/room/liked_rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLikedRooms(data);
        }
      } catch (error) {
        console.error('Error fetching liked rooms:', error);
      }
    };

    fetchLikedRooms();
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/home"
          element={
            <Home
              likedRooms={likedRooms}
              setLikedRooms={setLikedRooms}
            />
          }
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/addroom"
          element={<NewRoom />}
        />
        <Route
          path="/liked_rooms"
          element={<LikedRoom />}
        />
        <Route
          path="/room/:id"
          element={<RoomDetails />}
        />

        <Route
          path="*"
          element={<LoginPage />}
        />
      </Routes>

      {/* 🔥 ADD TOAST HERE (ONLY ONCE) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        hideProgressBar={true}
        theme="light"
      />
    </div>
  );
}

export default App;
