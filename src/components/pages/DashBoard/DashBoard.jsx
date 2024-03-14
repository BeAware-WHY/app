import React, { useState } from 'react';
import './DashBoard.css';
// import './CreateStream/CreateStream.css'
// import './src/components/pages/CreateStream/CreateStream.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from "react-router-dom";


function CurrentStream() {
    return <h1>Current Stream</h1>;
}


function PastStream() {
    return <h1>Past Stream</h1>;
}




function DashBoard() {
    const [profileClicked, setProfileClicked] = useState(false);
    const navigate = useNavigate();

    const newStream = () => {
        navigate('/createstream');
    };
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
                {/* <Link to="/createstream" className="new-stream-button">New Stream</Link> */}
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
            <div className="image-corner-right">
                <img src="./src/assets/images/bgglobe.png" alt="Background Globe" />
            </div>
            <div>
                <div className="toggle-button-bg">
                    <button className={isCurrentStreamActive ? 'activeButton' : 'inactiveButton'} onClick={handleCurrentStreamClick}><b>Current Stream</b></button>
                    <button className={!isCurrentStreamActive ? 'activeButton' : 'inactiveButton'} onClick={handlePastStreamClick}><b>Past Stream</b></button>
                </div>
                {isCurrentStreamActive ? <CurrentStream /> : <PastStream />}
            </div>

            <div className="image-corner-left-dashboard">
                <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
            </div>
            <div className="generate-stream-text">Ready to make your voice Legible!!</div>
            <div className="stream-card-container-dashboard">
                <div className="stream-card-dashboard">

                </div>
            </div>
        </div>
    );
}

export default DashBoard;
