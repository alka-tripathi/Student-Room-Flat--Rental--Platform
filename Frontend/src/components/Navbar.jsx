import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/navbar.css';
import ProfileDropDown from '../components/ProfileDropDown';
import AddIcon from '@mui/icons-material/Add';

function Navbar({ searchTerm, setSearchTerm }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">Rental.co</div>

      {/* Hamburger */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <div className={`nav-right ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/home"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addroom"
              onClick={() => setMenuOpen(false)}
            >
              <div className="sell-btn">
                <AddIcon /> Sell
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/liked_rooms"
              onClick={() => setMenuOpen(false)}
            >
              Liked
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
          </li>

          {/* Search */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <li className="profile-btn">
            <ProfileDropDown />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
