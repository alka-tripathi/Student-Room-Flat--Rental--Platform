import React, { useEffect, useState } from 'react';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Home() {
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []);
  const navigate = useNavigate();

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

      <ToastContainer />
    </div>
  );
}

export default Home;
