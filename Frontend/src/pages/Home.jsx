import React, { useEffect, useState } from 'react';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
// import Cards from '../components/Cards';
import CardItem from '../components/CardItem';
import '../style/home.css';

function Home({ likedRooms, setLikedRooms }) {
  const [loggedUser, setLoggedUser] = useState('');
  const [rooms, setRooms] = useState([]);

  //const [likedRooms, setLikedRooms] = useState([]); //lift up

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

      <CardItem></CardItem>

      {/* <div className="cards-container">
        {rooms.length === 0 ? (
          <p>Loading rooms...</p>
        ) : (
          rooms.map((room) => (
            <Cards
              key={room._id}
              room={room}
              likedRooms={likedRooms}
              setLikedRooms={setLikedRooms}
              className="card"
            />
          ))
        )}
      </div> */}

      <ToastContainer />
    </div>
  );
}

export default Home;
