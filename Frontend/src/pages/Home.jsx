import React, { useEffect, useState } from 'react';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Cards from '../components/Cards';

function Home() {
  const [loggedUser, setLoggedUser] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));

    // ✅ fetch rooms
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

  //delete the
  const logOut = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('UserLogged out!');
    setTimeout(() => {
      //sec baad logout ho jyege
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      {/* <h2>{loggedUser}</h2> */}
      <Navbar></Navbar>

      {/* hero section */}
      <HeroSection></HeroSection>

      {/* all room infomation */}
      <Cards rooms={rooms}></Cards>

      <ToastContainer />
    </div>
  );
}

export default Home;
