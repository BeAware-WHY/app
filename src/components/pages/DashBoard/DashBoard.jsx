import React, { useState } from 'react';
import './DashBoard.css';
<<<<<<< HEAD
// import './CreateStream/CreateStream.css'
// import './src/components/pages/CreateStream/CreateStream.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from "react-router-dom";
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../firebase";
import useAuthToken from "../../../constants/useAuthToken";
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378

function CurrentStreamHeading() {
    return (
        <div className="generate-stream-text">Ready to make your voice Legible!!</div>
    );
}

function PastStreamHeading() {
    return (
        <div className="generate-stream-text">History of Streams</div>
    );
}


function CurrentStream() {
<<<<<<< HEAD
=======
    const [text, setText] = useState('');

    const handleCopy = async () => {
        // Copy text to clipboard logic here
        try {
            await navigator.clipboard.writeText(text);
            alert('Text copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy text:', error);
            alert('Failed to copy text!');
        }
    };
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
    return (<div className="currentstream-main">
        <div className="image-corner-left-currentstream">
            <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
        </div>
        <div className="stream-card-container-currentstream">
            <div className="stream-card-currentstream">
<<<<<<< HEAD
                <div className="logo-placeholder-currentstream">
                    <img src="" alt="Company Logo" />
=======
                <div className="logo-column">
                    <div className="logo-placeholder-currentstream">
                        <img src="" alt="Company Logo" />
                    </div>
                    <div className="download-buttons-pdf">
                        <button type="submit" className="eventbutton">Download PDF</button>
                    </div>
                </div>
                <div className="column-main">
                    <div className="semi-circle"></div>
                    <div className="streamname-from-database"> Name - Stream Name</div>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled
                            style={{ width: '300px', padding: '10px', marginRight: '40px', borderRadius: '5px', marginLeft: '40px' }}
                            placeholder="Enter text here..."
                        />
                        <button className="copy-button" onClick={handleCopy}>
                            <FontAwesomeIcon icon={faCopy} />
                        </button>
                    </div>
                    <textarea disabled className="stream-desc-from-database" placeholder="Enter Stream Description"></textarea>
                </div>
                <div className="edit-column">
                    <div className="edit-icon-createstream" onClick={() => document.getElementById('logoInput').click()}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="download-buttons-qr">
                        <button type="submit" className="eventbutton">Download QR</button>
                    </div>
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
                </div>
            </div>
        </div>
    </div>
    );
}


function PastStream() {
<<<<<<< HEAD
    return (<div className="currentstream-main">
        <div className="image-corner-left-currentstream">
            <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
        </div>
        <div className="stream-card-container-currentstream">
            <div className="stream-card-currentstream">

            </div>
        </div>
    </div>
    );
}




function DashBoard() {
    const [profileClicked, setProfileClicked] = useState(false);
    const navigate = useNavigate();

    const newStream = () => {
        navigate('/createstream');
    };
=======
    return (
        <>
            <div className="past-stream-container">
                <div className="past-streams-card">
                    <div className="past-streams-rectangle"></div>
                    <div className="past-streams-logo">
                        <img src="logo.png" alt="Company Logo" />
                    </div>
                    <div className="past-streams-company-name">Company Name</div>
                </div>
            </div>
        </>
    );
}

function DashBoard() {
    const [profileClicked, setProfileClicked] = useState(false);
    const navigate = useNavigate();
    const { removeToken } = useAuthToken();
    const newStream = () => {
        navigate('/createstream');
    };
    const handleLogout = async () => {
        try {
            removeToken(); // Remove the authentication token
            navigate('/signin'); // Redirect to the signin page
        } catch (error) {
            console.error('Error occurred during logout:', error);
            // Handle error
        }
    };
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
    const toggleProfile = () => {
        setProfileClicked(!profileClicked);
    };

    const [isCurrentStreamActive, setIsCurrentStreamActive] = useState(true);

    const handleCurrentStreamClick = () => {
        setIsCurrentStreamActive(true);
    };

    const handlePastStreamClick = () => {
        setIsCurrentStreamActive(false);
    };
    return (
        <div className="background">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                </div>
                <button className="new-stream-button" onClick={newStream}>New Stream</button>
<<<<<<< HEAD
                {/* <Link to="/createstream" className="new-stream-button">New Stream</Link> */}
=======
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
                <div className="navbar-profile" onClick={toggleProfile}>
                    <div className={`profile-icon ${profileClicked ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faUserAlt} />
                    </div>
                    {profileClicked && (
                        <div className="profile-popup">
                            <ul>
                                <li>Profile</li>
<<<<<<< HEAD
                                <li>Logout</li>
=======
                                <li onClick={handleLogout}>Logout</li>
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <div className="image-corner-right">
                <img src="./src/assets/images/bgglobe.png" alt="Background Globe" />
            </div>
            {isCurrentStreamActive ? <CurrentStreamHeading /> : <PastStreamHeading />}
            <div className="stream-buttons">
                <div className="toggle-button-bg">
                    <button className={isCurrentStreamActive ? 'activeButton' : 'inactiveButton'} onClick={handleCurrentStreamClick}><b>Current Stream</b></button>
                    <button className={!isCurrentStreamActive ? 'activeButton' : 'inactiveButton'} onClick={handlePastStreamClick}><b>Past Stream</b></button>
                </div>
            </div>
            {isCurrentStreamActive ? <CurrentStream /> : <PastStream />}
        </div>
    );
}

export default DashBoard;
