import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../style/roomdetails.css';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(`http://localhost:8000/room/${id}`);
      const data = await res.json();
      setRoom(data);
    };

    fetchRoom();
  }, [id]);

  if (!room) return <p>Loading...</p>;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  return (
    <div className="room-details">
      <h1 className="room-title">{room.title}</h1>
      <p className="room-subtitle">
        📍 {room.location} • {room.category || 'Room'}
      </p>

      {/* 🔥 Image Slider */}
      <div className="slider">
        <button
          className="slider-btn left"
          onClick={prevSlide}
        >
          ❮
        </button>

        <img
          src={room.images[currentIndex]}
          alt="room"
          className="room-image"
        />

        <button
          className="slider-btn right"
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="dots">
        {room.images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'dot active' : 'dot'}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      <div className="room-info">
        <p className="room-description">{room.description}</p>
        <p className="room-price">
          ₹ {room.price} <span className="per-month">/ month</span>
        </p>
        <p className="room-location">📍 {room.location}</p>
        <p className="room-contact">📞 {room.contactNumber}</p>
      </div>
    </div>
  );
}

export default RoomDetails;
