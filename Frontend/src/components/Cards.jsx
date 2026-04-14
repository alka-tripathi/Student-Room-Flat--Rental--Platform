import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import '../style/card.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cards({ room }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.jwtTokens;

  const [liked, setLiked] = useState(
    user && room.likes?.some((id) => id.toString() === user.id),
  );

  const handleLike = async () => {
    try {
      if (!token) {
        alert('Please login first');
        return;
      }

      let res;

      if (!liked) {
        res = await fetch(`${API_URL}/room/like/${room._id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Added to liked ❤️');
      } else {
        res = await fetch(`${API_URL}/room/unlike/${room._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.info('Removed from liked 💔');
      }

      const data = await res.json();
      const updatedLikes = data.room.likes;

      setLiked(updatedLikes.some((id) => id.toString() === user?.id));
    } catch (err) {
      console.log(err);
    }
  };

  //  Navigate to details (optional block if booked)
  const showRoomDetails = () => {
    navigate(`/room/${room._id}`);
  };

  return (
    <div className="card">
      {/* Image + Overlay */}
      <div
        className="card-img-container"
        onClick={showRoomDetails}
      >
        <img
          src={room.images[0]}
          alt="room"
          className="card-img"
        />

        {!room.available && <div className="overlay">Booked</div>}
      </div>

      <h2>{room.title}</h2>
      <p>📍 {room.location}</p>
      <p>₹ {room.price}</p>
      <p>{room.description}</p>

      <div className="card-bottom">
        <span className="contact">📞 {room.contactNumber}</span>

        <span className={room.available ? 'available' : 'not-available'}>
          {room.available ? 'Available' : 'Booked'}
        </span>

        {liked ? (
          <StarIcon
            className="star-icon liked"
            onClick={handleLike}
          />
        ) : (
          <StarBorderIcon
            className="star-icon"
            onClick={handleLike}
          />
        )}
      </div>
    </div>
  );
}

export default Cards;
