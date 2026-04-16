import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import '../style/cardItem.css';

function CardItem({ rooms = [] }) {
  // const [rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       const res = await fetch('http://localhost:8000/room/getrooms');
  //       const data = await res.json();
  //       setRooms(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchRooms();
  // }, []);

  return (
    <div className="home">
      <h1>Available Rooms</h1>

      <div className="cards-container">
        {rooms.length === 0 ? (
          <p className="no-data">No matching rooms found 🔍</p>
        ) : (
          rooms.map((room) => (
            <Cards
              key={room._id}
              room={room}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CardItem;
