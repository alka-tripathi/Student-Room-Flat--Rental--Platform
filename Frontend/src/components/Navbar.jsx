import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/navbar.css';
import ProfileDropDown from '../components/ProfileDropDown';
import AddIcon from '@mui/icons-material/Add';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };
  return (
    <div className="navbar">
      <div className="logo">Rental.co</div>

      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/addroom">
              <div
                style={{
                  textAlign: 'center',

                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px',
                }}
              >
                {' '}
                <AddIcon></AddIcon>Sell
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/liked_rooms">Liked</NavLink>
          </li>

          <form
            className="search-bar"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search Room.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <li className="profile-btn">
            <ProfileDropDown></ProfileDropDown>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
