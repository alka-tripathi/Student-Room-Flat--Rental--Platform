import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import SignupPage from './pages/signup';
import Home from './pages/Home.jsx';
import Login from './pages/login';
import NewRoom from './pages/NewRoom.jsx';
import LikedRoom from './pages/LikedRoom.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Footer from './components/Footer';

import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [likedRooms, setLikedRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  const location = useLocation();
  const hideFooterRoutes = ['/login', '/signup'];

  // ✅ Fetch all rooms (no auth needed)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/getrooms`);
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, [API_URL]);

  // ✅ Fetch liked rooms (requires auth → cookie)
  useEffect(() => {
    const fetchLikedRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/liked_rooms`, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setLikedRooms(data);
        }
      } catch (error) {
        console.error('Error fetching liked rooms:', error);
      }
    };

    fetchLikedRooms();
  }, [API_URL]);

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
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<Login />}
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
          element={<RoomDetails room={rooms} />}
        />

        <Route
          path="*"
          element={<Login />}
        />
      </Routes>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        hideProgressBar
        theme="light"
      />
    </div>
  );
}

export default App;
