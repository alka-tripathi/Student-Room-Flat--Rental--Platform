import { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import '../style/likedRooms.css';
import '../style/card.css';

function LikedRooms() {
  const [likedRooms, setLikedRooms] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.jwtTokens;

  useEffect(() => {
    if (!token) return; // ✅ safety

    const fetchLikedRooms = async () => {
      try {
        const res = await fetch(
          'http://localhost:8000/room/liked_rooms', // ✅ FIXED
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 401) {
          alert('Please login again');
          localStorage.removeItem('user');
          return;
        }

        const data = await res.json();
        console.log(data);

        setLikedRooms(data.rooms);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLikedRooms();
  }, [token]);

  return (
    <div className="liked-container">
      <h1 className="liked-heading">❤️ Liked Rooms ({likedRooms.length})</h1>

      {likedRooms.length === 0 ? (
        <p className="no-rooms">No liked rooms yet</p>
      ) : (
        <div className="cards-grid">
          {likedRooms.map((room) => (
            <Cards
              key={room._id}
              room={room}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedRooms;
