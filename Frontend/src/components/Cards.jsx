
import { useState, useEffect } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import '../style/card.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cards({ room, onUnlike, onUnbook }) {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Logged in user
  const user = JSON.parse(localStorage.getItem('user'));

  // Like state
  const [liked, setLiked] = useState(false);

  // Check if room already liked
  useEffect(() => {
    if (user && room.likes) {
      const isLiked = room.likes.some((id) => id.toString() === user.id);

      setLiked(isLiked);
    }
  }, [room, user]);

  // Like / Unlike handler
  const handleLike = async (e) => {
    e.stopPropagation();

    // Prevent liking booked rooms
    if (!room.available) {
      toast.error('Room already booked ❌');
      return;
    }

    try {
      let res;

      if (!liked) {
        // LIKE
        res = await fetch(`${API_URL}/room/like/${room._id}`, {
          method: 'POST',
          credentials: 'include',
        });

        if (res.status === 401) {
          toast.error('Please login first');
          return;
        }

        toast.success('Added to liked ❤️');
      } else {
        // UNLIKE
        res = await fetch(`${API_URL}/room/unlike/${room._id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (res.status === 401) {
          toast.error('Please login first');
          return;
        }

        toast.info('Removed from liked 💔');
      }

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || 'Something went wrong');
        return;
      }

      setLiked(!liked);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  // Navigate to details page
  const showRoomDetails = () => {
    navigate(`/room/${room._id}`);
  };

  return (
    <div className="card">
      {/* Room Image */}
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

      {/* Room Info */}
      <h2>{room.title}</h2>

      <p>📍 {room.location}</p>

      <p>₹ {room.price}</p>

      <p>{room.description}</p>

      {/* Bottom Section */}
      <div className="card-bottom">
        <span className="contact">📞 {room.contactNumber}</span>

        <span className={room.available ? 'available' : 'not-available'}>
          {room.available ? 'Available' : 'Booked'}
        </span>

        {/* Like icon only on normal pages */}
        {!onUnlike && !onUnbook && (
          <>
            {liked ? (
              <StarIcon
                className={`star-icon liked ${
                  !room.available ? 'disabled' : ''
                }`}
                onClick={handleLike}
              />
            ) : (
              <StarBorderIcon
                className={`star-icon ${!room.available ? 'disabled' : ''}`}
                onClick={handleLike}
              />
            )}
          </>
        )}
      </div>

      {/* Remove From Liked */}
      {onUnlike && (
        <button
          className="remove-btn"
          onClick={() => onUnlike(room._id)}
        >
          Remove from Liked
        </button>
      )}

      {/* Unbook Button */}
      {onUnbook && (
        <button
          className="unbook-btn"
          onClick={() => onUnbook(room._id)}
        >
          Unbook
        </button>
      )}
    </div>
  );
}

export default Cards;
