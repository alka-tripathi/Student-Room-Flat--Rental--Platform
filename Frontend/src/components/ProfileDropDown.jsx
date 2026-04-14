import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/profileBtn.css';
import PersonIcon from '@mui/icons-material/Person';

function ProfileDropDown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtTokens');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        <div>
          <PersonIcon></PersonIcon>
        </div>
        {localStorage.getItem('loggedInUser')}
      </button>

      {open && (
        <div className="profile-dropdown">
          <p onClick={() => navigate('/home')}>View Profile</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
