import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/Signup';
import Home from './pages/Home.jsx';
import './App.css';
import LoginPage from './pages/Login';
import NewRoom from './pages/NewRoom.jsx';
import LikedRoom from './pages/LikedRoom.jsx';
import RoomDetails from './pages/RoomDetails.jsx';


function App() {
  const [likedRooms, setLikedRooms] = useState([]);

  useEffect(() => {
    // Fetch liked rooms from backend when user is logged in
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
          element={<Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/home"
          element={
            <Home
              likedRooms={likedRooms}
              setLikedRooms={setLikedRooms}
            ></Home>
          }
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
          path="/addroom"
          element={<NewRoom></NewRoom>}
        ></Route>

        <Route
          path="/liked_rooms"
          element={<LikedRoom></LikedRoom>}
        ></Route>
        {/* <Route
          path="/:id"
          element={<SingleRoom />}
        /> */}


         <Route path="/room/:id" element={<RoomDetails />} />

        <Route
          path="*"
          element={<LoginPage></LoginPage>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
