import { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { toast } from 'react-toastify';

function BookedRooms() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const res = await fetch(`${API_URL}/room/booked_rooms`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          toast.error('Please login first');
          return;
        }

        const data = await res.json();

        if (data.success) {
          setRooms(data.rooms || []);
        } else {
          setRooms([]);
        }
      } catch (err) {
        console.log(err);
        toast.error('Failed to load booked rooms');
      }
    };

    if (API_URL) {
      fetchBooked();
    }
  }, [API_URL]);

  // ✅ Unbook handler (clean & reusable)
  const handleUnbook = async (roomId) => {
    try {
      const res = await fetch(`${API_URL}/room/unbook/${roomId}`, {
        method: 'PUT',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Room unbooked');

        // remove instantly from UI
        setRooms((prev) => prev.filter((room) => room._id !== roomId));
      } else {
        toast.error(data.message || 'Failed to unbook');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to unbook');
    }
  };

  return (
    <div className="liked-container">
      <h1>My Booked Rooms 🏠</h1>

      {rooms.length === 0 ? (
        <p>No booked rooms yet</p>
      ) : (
        <div className="cards-grid">
          {rooms.map((room) => (
            <Cards
              key={room._id}
              room={room}
              onUnbook={handleUnbook}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookedRooms;
