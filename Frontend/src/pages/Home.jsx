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

  //  Get logged user
  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []);

  //  Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:8000/room/getrooms');
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on location
  const filteredRooms = rooms.filter((room) =>
    room.location?.toLowerCase().includes(searchRooms.toLowerCase()),
  );

  //  Logout
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      {/* Navbar with search */}
      <Navbar
        searchTerm={searchRooms}
        setSearchTerm={setSearchRooms}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Cards Section */}
      <CardItem
        rooms={filteredRooms}
        likedRooms={likedRooms}
        setLikedRooms={setLikedRooms}
      />
    </div>
  );
}

export default Home;
