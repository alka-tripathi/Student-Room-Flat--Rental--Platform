import '../style/card.css';
function Cards({ rooms }) {
  return (
    <div className="cards-container">
      {rooms.map((room) => (
        <div
          className="card"
          key={room._id}
        >
          {/* Image */}
          <div className="card-img">
            {room.images && room.images.length > 0 && (
              <img
                src={`http://localhost:8000/uploads/${room.images[0]}`}
                alt="room"
              />
            )}
          </div>

          {/* Content */}
          <div className="card-content">
            <h3>{room.title}</h3>
            <p className="location">{room.location}</p>
            <p className="price">₹{room.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Cards;
