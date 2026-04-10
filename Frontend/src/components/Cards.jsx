import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import '../style/card.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cards({ room }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.jwtTokens; // ✅ your token name

  const [liked, setLiked] = useState(
    room.likes?.some((id) => id.toString() === user?.id),
  );

  const handleLike = async () => {
    try {
      if (!token) {
        alert('Please login first');
        return;
      }

      let res;

      if (!liked) {
        // ⭐ LIKE
        res = await fetch(`http://localhost:8000/room/like/${room._id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Added to liked ❤️');
      } else {
        // ❌ UNLIKE
        res = await fetch(`http://localhost:8000/room/unlike/${room._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.info('Removed from liked 💔'); // 🔥 MAIN PART
      }

      const data = await res.json();

      // ✅ sync UI with DB
      const updatedLikes = data.room.likes;

      setLiked(updatedLikes.some((id) => id.toString() === user?.id));
    } catch (err) {
      console.log(err);
    }
  };

  const showRoomDetails = () => {
    navigate(`/room/${room._id}`);
  };

  const handleRemove = (id) => {
    setLikedRooms((prev) => prev.filter((room) => room._id !== id));
  };

  return (
    <div className="card">
      <img
        src={room.images[0]}
        alt="room"
        className="card-img"
        onClick={showRoomDetails}
      />

      <h2>{room.title}</h2>
      <p>📍 {room.location}</p>
      <p>₹ {room.price}</p>
      <p>{room.description}</p>

      <div className="card-bottom">
        <span className="contact">📞 {room.contactNumber}</span>

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
