import React, { useEffect, useState } from 'react';
import { handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CardItem from '../components/CardItem';

import '../style/home.css';

function Home({ likedRooms, setLikedRooms }) {
  const [loggedUser, setLoggedUser] = useState('');
  const [rooms, setRooms] = useState([]);
  const [searchRooms, setSearchRooms] = useState('');

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  //  Get logged user (UI only)
  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/getrooms`);
        const data = await res.json();

        setRooms(data || []); 
      } catch (err) {
        console.error(err);
      }
    };

    if (API_URL) {
      fetchRooms();
    }
  }, [API_URL]);

  //  Filter rooms
  const filteredRooms = rooms.filter((room) =>
    room.location?.toLowerCase().includes(searchRooms.toLowerCase()),
  );

  //  REAL logout (cookie-based)
  const logOut = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', //  IMPORTANT
      });

      localStorage.removeItem('loggedInUser');

      handleSuccess('User Logged out!');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar
        searchTerm={searchRooms}
        setSearchTerm={setSearchRooms}
        logOut={logOut} //  pass logout if needed
        user={loggedUser}
      />

      {/* Hero */}
      <HeroSection />

      {/* Cards */}
      <CardItem
        rooms={filteredRooms}
        likedRooms={likedRooms}
        setLikedRooms={setLikedRooms}
      />
    </div>
  );
}

export default Home;
