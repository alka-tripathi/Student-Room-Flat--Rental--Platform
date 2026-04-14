import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../style/roomdetails.css';

function RoomDetails() {
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${API_URL}/room/${id}`);
        const data = await res.json();

        setRoom(data);
        setIsBooked(!data.available); //  correct place
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) return <p>Loading...</p>;

  const handleBooking = async () => {
    try {
      const res = await fetch(`${API_URL}/room/book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: false }),
      });

      const data = await res.json();

      setRoom(data); //  update UI
      setIsBooked(true); //  disable button

      alert('Room booked successfully!');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    }
  };

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

      {/*  Image Slider */}
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

      {/*  Booking Button */}
      <div className="booking-section">
        <button
          onClick={handleBooking}
          disabled={isBooked}
          className={`book-btn ${isBooked ? 'booked' : ''}`}
        >
          {isBooked ? 'Already Booked' : 'Book Now'}
        </button>
      </div>
    </div>
  );
}

export default RoomDetails;
