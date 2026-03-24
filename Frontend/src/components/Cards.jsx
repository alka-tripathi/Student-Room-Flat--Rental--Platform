import '../style/card.css';
import { useState } from 'react';

function Cards({ rooms }) {
  return (
    <div className="cards-container">
      {rooms.map((room) => (
        <CardItem
          key={room._id}
          room={room}
        />
      ))}
    </div>
  );
}

// 🔥 Separate component for each card (important)
function CardItem({ room }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  return (
    <div className="card">
      {/* Image Slider */}
      <div className="card-img">
        {room.images && room.images.length > 0 && (
          <>
            <img
              src={`http://localhost:8000/uploads/${room.images[index]}`}
              alt="room"
            />

            {/* Buttons */}
            {room.images.length > 1 && (
              <>
                <button
                  className="prev"
                  onClick={prevImage}
                >
                  ⬅
                </button>
                <button
                  className="next"
                  onClick={nextImage}
                >
                  ➡
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="card-content">
        <h3>{room.title}</h3>
        <p className="location">{room.location}</p>
        <p className="price">₹{room.price}</p>
      </div>
    </div>
  );
}

export default Cards;
