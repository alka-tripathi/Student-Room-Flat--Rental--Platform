import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import '../style/carditem.css';
function CardItem() {
  const [rooms, setRooms] = useState([]);

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

  return (
    <div className="home">
      <h1>Available Rooms</h1>

      <div className="card-container">
        {rooms.map((room) => (
          <Cards
            key={room._id}
            room={room}
          />
        ))}
      </div>
    </div>
  );
}

export default CardItem;
