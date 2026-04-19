import React from 'react';

function SingleRoom() {
  return (
    <div>
      <h1>Single Room Details</h1>
      {/* You can add more details about the room here */}
      <p>Room Title: {room.title}</p>
      <p>Room Location: {room.location}</p>
      <p>Room Price: {room.price}</p>
      <p>Room Description: {room.description}</p>
      <p>Contact Number: {room.contactNumber}</p>
    </div>
  );
}

export default SingleRoom;
