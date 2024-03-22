import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt ,faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import './profilestyles.css'; // Import the CSS file
import { Card, Button } from 'react-bootstrap'; // Assuming you're using Bootstrap for styling
import './Createstream/CreateStream.css';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { database } from '../pages/firebase';
import { left } from '@popperjs/core';

function ProfileHeader() {
    const [profileClicked, setProfileClicked] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [logoImage, setLogoImage] = useState(null); // State to store the uploaded logo image
    const [streamDate] = useState(new Date()); 

    const [activeNavItem, setActiveNavItem] = useState(null);

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
    };
    const toggleProfile = () => {
        setProfileClicked(!profileClicked);
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePicture(reader.result); // Set the profile picture preview
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
     const handleLogoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setLogoImage(reader.result); // Set the logo image preview
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://localhost:7050/api/v1.0/stream/create-stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    logoUrl: logoImage // Assuming logoImage is the URL of the uploaded logo
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('File Path:', data.filePath);
    
                const qrCodeData = JSON.stringify({
    
                    logoUrl: logoImage,
                    filePath: data.filePath
                });
                const qrCodeDataURL = `data:image/svg+xml;base64,${btoa(qrCodeData)}`;
    
                // Store form data and API response in Firebase
                const formData = {
                 
                    qrCodeDataURL,
                    filePath: data.filePath,
                    streamDate: streamDate.toISOString()
                };
    
                // Add a document to the "streamData" collection in Firebase
                await addDoc(collection(database, "streamData"), formData);
    
                console.log('Form data and API response saved in Firebase successfully!');
                
                // Perform any further actions based on the response from the backend, such as redirecting or displaying a success message
            } else {
                console.error('Failed to create stream:', response.statusText);
                // Handle error
            }
        } catch (error) {
            console.error('Error occurred while creating stream:', error);
            // Handle error
        }
    };

function ProfileInfo() {
    return (
       
         <div className="views" style={{ padding: '20px', minHeight: 'calc(100vh - 70px)', marginBottom: '0' }}>
            <div className="logo-container" >
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
    <div className="centered-table">
        <table className="profile-table">
            <tbody>
               <tr>
    <td className="label-cell"><label htmlFor="firstname">First Name:</label></td>
    <td><span contentEditable="true">John</span></td>
    <td className="label-cell"><label htmlFor="lastname">Last Name:</label></td>
    <td><span contentEditable="true">Doe</span></td>
</tr>
<tr>
    <td className="label-cell"><label htmlFor="email">Email Address:</label></td>
    <td><span contentEditable="true">johndoe@example.com</span></td>
    <td className="label-cell"><label htmlFor="phone">Phone Number:</label></td>
    <td><span contentEditable="true">123-456-7890</span></td>
</tr>
<tr>
   <td className="label-cell"><label htmlFor="zipcode">Zip Code:</label></td>
    <td><span contentEditable="true">10001</span></td>
    <td className="label-cell"><label htmlFor="city">City:</label></td>
    <td><span contentEditable="true">New York</span></td>
</tr>
<tr>
        <td className="label-cell"><label htmlFor="country">Country:</label></td>
    <td>
        <select id="country" name="country" className="form-control">
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="uae">UAE</option>
        </select>
    </td>
 
</tr>


            </tbody>
        </table>
    </div>
    <div style={{ display: 'inline-block' }}>
            {/* Display card view with delete account button */}
            <Card style={{ width: '100%', marginTop: '5px' }}>
                <Card.Body>
                    <Card.Title>Delete Account</Card.Title>
                    <Card.Text>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </Card.Text>
                    <Button variant="danger" style={{ borderRadius: '20px' }}>Delete Account</Button>
                </Card.Body>
            </Card>
        </div>
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

export default ProfileHeader;
