import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import '../style/cardItem.css';

function CardItem({ rooms = [] }) {

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
