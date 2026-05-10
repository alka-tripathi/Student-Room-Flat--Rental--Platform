import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cards from '../components/Cards';

import '../style/likedRooms.css';
import '../style/card.css';

function LikedRooms() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [likedRooms, setLikedRooms] = useState([]);

  // ✅ FETCH LIKED ROOMS
  useEffect(() => {
    const fetchLikedRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/liked_rooms`, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status === 401) {
          toast.error('Please login again');
          setLikedRooms([]);
          return;
        }

        const data = await res.json();

        if (data.success) {
          setLikedRooms(data.rooms || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (API_URL) fetchLikedRooms();
  }, [API_URL]);

  // ✅ UNLIKE FUNCTION (REAL BACKEND CALL)
  const handleRemove = async (roomId) => {
    try {
      const res = await fetch(`${API_URL}/room/unlike/${roomId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Failed to unlike');
        return;
      }

      // ✅ update UI after success
      setLikedRooms((prev) => prev.filter((room) => room._id !== roomId));

      toast.info('Removed from liked 💔');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="liked-container">
      <h1 className="liked-heading">Liked Rooms ({likedRooms.length})</h1>

      {likedRooms.length === 0 ? (
        <p className="no-rooms">No liked rooms yet</p>
      ) : (
        <div className="cards-grid">
          {likedRooms.map((room) => (
            <Cards
              key={room._id}
              room={room}
              onUnlike={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedRooms;
