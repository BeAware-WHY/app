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
    return (<div className="currentstream-main">
        <div className="image-corner-left-currentstream">
            <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
        </div>
        <div className="stream-card-container-currentstream">
            <div className="stream-card-currentstream">
                <div className="logo-placeholder-currentstream">
                    <img src="" alt="Company Logo" />
                </div>
            </div>
        </div>
    </div>
    );
}


function PastStream() {
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
