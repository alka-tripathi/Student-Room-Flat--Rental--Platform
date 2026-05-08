import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cards from '../components/Cards';

import '../style/likedRooms.css';
import '../style/card.css';

function LikedRooms() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [likedRooms, setLikedRooms] = useState([]);

  useEffect(() => {
    const fetchLikedRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/room/liked_rooms`, {
          method: 'GET',
          credentials: 'include', // ✅ cookie auth
        });

        // ✅ user not logged in
        if (res.status === 401) {
          toast.error('Please login again');

          localStorage.removeItem('user');

          return;
        }

        const data = await res.json();

        if (data.success) {
          setLikedRooms(data.rooms || []);
        }
      } catch (err) {
        console.log(err);

        toast.error('Failed to load liked rooms');
      }
    };

    fetchLikedRooms();
  }, [API_URL]);

  // ✅ Remove instantly from UI after unlike
  const handleRemove = (id) => {
    setLikedRooms((prev) => prev.filter((room) => room._id !== id));

    toast.info('Removed from liked 💔');
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
