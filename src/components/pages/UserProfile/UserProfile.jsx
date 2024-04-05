/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt ,faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import "../UserProfile/UserProfile.css"

function UserProfile() {
    const [profileClicked, setProfileClicked] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [logoImage, setLogoImage] = useState(null);
    const [streamDate] = useState(new Date());
    const [activeNavItem, setActiveNavItem] = useState(null);

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
    };

    const toggleProfile = () => {
        setProfileClicked(!profileClicked);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setLogoImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function ProfileInfo() {
        return (
            <div className="views" style={{ padding: '20px', minHeight: 'calc(100vh - 70px)', marginBottom: '0' }}>
                <div className="logo-container">
                    <div className="logo-placeholder" onClick={() => document.getElementById('logoInput').click()}>
                        {logoImage ? (
                            <img src={logoImage} alt="Upload Picture*" />
                        ) : (
                            <img src="logo.png" alt="Upload Picture*" required />
                        )}
                    </div>
                    <div className="edit-icon" onClick={() => document.getElementById('logoInput').click()}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <input
                        type="file"
                        id="logoInput"
                        accept="image/*"
                        onChange={handleLogoChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="profile-details">
                    {/* Your profile details */}
                </div>
            </div>
        );
    }

    function AccountSettings() {
        return (
            <div className="view">
                <h2>Account Settings</h2>
                <p>Here you can update your account settings.</p>
            </div>
        );
    }

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                </div>
                <div className="navbar-profile" onClick={toggleProfile}>
                    <div className={`profile-icon ${profileClicked ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faUserAlt} />
                    </div>
                    {profileClicked && (
                        <div className="profile-popup">
                            <ul>
                                <li>Profile</li>
                                <li>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <div className="content-container">
                <div className="vertical-nav">
                    <ul>
                        <li onClick={() => handleNavItemClick('account-settings')}>Account Settings</li>
                        <li onClick={() => handleNavItemClick('profile-info')}>Profile Info</li>
                    </ul>
                </div>
                <div className="view-container">
                    {activeNavItem === 'account-settings' && <AccountSettings />}
                    {activeNavItem === 'profile-info' && <ProfileInfo />}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
