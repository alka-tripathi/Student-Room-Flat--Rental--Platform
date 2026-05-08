import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import '../style/card.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cards({ room }) {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const user = JSON.parse(localStorage.getItem('user'));

  const [liked, setLiked] = useState(
    user && room.likes?.some((id) => id.toString() === user.id),
  );

  const handleLike = async () => {
    try {
      // ✅ check login
      if (!user) {
        toast.error('Please login first');
        return;
      }

      let res;

      // ✅ LIKE ROOM
      if (!liked) {
        res = await fetch(`${API_URL}/room/like/${room._id}`, {
          method: 'POST',
          credentials: 'include', // 🔥 IMPORTANT
        });

        toast.success('Added to liked ❤️');
      }

      // ✅ UNLIKE ROOM
      else {
        res = await fetch(`${API_URL}/room/unlike/${room._id}`, {
          method: 'DELETE',
          credentials: 'include', // 🔥 IMPORTANT
        });

        toast.info('Removed from liked 💔');
      }

      // ✅ Unauthorized
      if (res.status === 401) {
        toast.error('Please login again');
        return;
      }

      const data = await res.json();

      const updatedLikes = data.room.likes;

      setLiked(updatedLikes.some((id) => id.toString() === user?.id));
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const showRoomDetails = () => {
    navigate(`/room/${room._id}`);
  };

  return (
    <div className="card">
      {/* Image */}
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
