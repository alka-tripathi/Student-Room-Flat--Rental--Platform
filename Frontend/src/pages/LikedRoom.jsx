import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cards from '../components/Cards';
import '../style/likedRooms.css';
import '../style/card.css';

function LikedRooms() {
  const [likedRooms, setLikedRooms] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.jwtTokens;

  useEffect(() => {
    if (!token) return;

    const fetchLikedRooms = async () => {
      try {
        const res = await fetch('http://localhost:8000/room/liked_rooms', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          toast.error('Session expired, please login again');
          localStorage.removeItem('user');
          return;
        }

        const data = await res.json();
        setLikedRooms(data.rooms);
      } catch (err) {
        console.log(err);
        toast.error('Failed to load liked rooms');
      }
    };

    fetchLikedRooms();
  }, [token]);

  // Remove card instantly after unlike
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
              onUnlike={handleRemove} //  important
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedRooms;
