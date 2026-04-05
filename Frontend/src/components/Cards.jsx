import '../style/card.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
function Cards({ room }) {
  return (
    <div className="card">
      <img
        src={room.images[0]}
        alt="room"
        className="card-img"
      />

      <h2>{room.title}</h2>
      <p>📍 {room.location}</p>
      <p>₹ {room.price}</p>
      <p>{room.description}</p>
      <div className="card-bottom">
        <span className="contact">📞 {room.contactNumber}</span>

        <StarBorderIcon className="star-icon" />
      </div>
    </div>
  );
}

export default Cards;
