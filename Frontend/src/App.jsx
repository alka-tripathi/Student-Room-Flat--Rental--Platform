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
import BookedRooms from './pages/BookedRooms.jsx';

import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


  const [likedRooms, setLikedRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  const location = useLocation();

  const hideFooterRoutes = ['/login', '/signup'];

  //  Fetch all rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/getrooms`);
        const data = await res.json();

        // const data = await res.json();

        setRooms(data.rooms || []);
      } catch (err) {
        console.log('Rooms fetch error:', err);
      }
    };

    if (API_URL) {
      fetchRooms();
    }
  }, [API_URL]);

  //  Fetch liked rooms
  useEffect(() => {
    const fetchLikedRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/liked_rooms`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Request failed');
        }

        const data = await res.json();

        setLikedRooms(data.rooms || []);
      } catch (error) {
        console.error('Liked rooms fetch error:', error);
      }
    };

    fetchLikedRooms();
  }, [API_URL]);


  const refreshRooms = async () => {
    const res = await fetch(`${API_URL}/room/getrooms`);
    const data = await res.json();
    setRooms(data.rooms || []);
  };

  return (
    <div className="app-container">
      <Routes>
        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Home */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Add Room */}
        <Route
          path="/addroom"
          element={<NewRoom />}
        />

        {/* Liked Rooms */}
        <Route
          path="/liked_rooms"
          element={<LikedRoom />}
        />

        {/* Room Details */}
        <Route
          path="/room/:id"
          element={<RoomDetails />}
        />

        {/* Invalid route */}
        <Route
          path="*"
          element={<Login />}
        />

        <Route
          path="/booked_rooms"
          element={<BookedRooms />}
        />

        {/* 
        <Route path="/book/:id" element={<BookRoom />} /> */}
      </Routes>

      {/* Footer */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}

      {/* Toast */}
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
