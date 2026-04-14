import React from 'react';
import '../style/footer.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-left">
          <h3>Rental.co</h3>
          <p>Find your perfect room with ease.</p>
        </div>

        {/* Center */}
        <div className="footer-center">
          <p>📍 India</p>
          <p>📧 tripathialka382@gmail.com</p>
        </div>

        {/* Right */}
        <div className="footer-right">
          <p>© 2026 Rental.co</p>
          <p>
            Made with <FavoriteBorderIcon /> by Alka Tripathi
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
