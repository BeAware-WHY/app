import React from "react";
import "../../components/pages/profile.css"; // Assuming you have a CSS file for styling
import logo from "../../assets/images/logo_internhsip.png"; // Path to your logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faTrash, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#1B4375', position: 'absolute', top: 0, right: 0, left: 0, zIndex: -1 }}>
        <div className="navbar-logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="navbar-profile" style={{ zIndex: 999 }}>
          <div className="profile-icon" style={{ zIndex: 999 }}>
            <FontAwesomeIcon icon={faHome} />
          </div>
         
        </div>
      </nav>

      <div className="vertical-navbar" style={{ backgroundColor: '#1B4375' }} >
        <div className="vn-bg" style={{ marginTop: 20, color: '#CADBEC' }}>
          <ul>
            <label style={{ fontSize: 18 }}>User Profile Management</label>
            <li>
              <FontAwesomeIcon icon={faUserAlt} />
              <span style={{ marginTop: 10 }}>Profile Management</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faTrash} />
              <span>Delete Account</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', textAlign: 'center' }}>
        <div className="profile-picture-container" style={{ marginBottom: '20px' }}>
          <img src="profile-picture.jpg" alt="Profile" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
        </div>
       

        </div>

  </div>
  );
};

export default Header;
