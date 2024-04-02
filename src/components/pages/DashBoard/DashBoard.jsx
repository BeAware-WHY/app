import React, { useState, useEffect, useRef } from 'react';
import './DashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import useAuthToken from "../../../constants/useAuthToken";
import { decodeToken } from '../../../utils/authUtils';
import { fetchDataForUserId, auth } from "../firebase"; // Import fetchDataForUserId and auth from firebase file

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

function CurrentStream({ streamData }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const handleEditStream = () => {
        navigate('/editstream');
    };
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Text copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy text:', error);
            alert('Failed to copy text!');
        }
    };
    console.log("38----",streamData.logoImageUrl )
    return (
        <div className="currentstream-main">
            <div className="image-corner-left-currentstream">
                <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
            </div>
            <div className="stream-card-container-currentstream">
                <div className="stream-card-currentstream">
                    <div className="logo-column">
                        <div className="logo-placeholder">
                            <img src={streamData.logoImageUrl ? streamData.logoImageUrl : ''} alt="Company Logo" />
                        </div>
                        <div className="download-buttons-pdf">
                            <button type="submit" className="eventbutton">Download PDF</button>
                        </div>
                    </div>
                    <div className="column-main">
                        <div className="semi-circle"></div>
                        <div className="streamname-from-database"> Name - {streamData.streamName ? streamData.streamName : 'Stream Name'}</div>
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={streamData.filePath ? streamData.filePath : 'Stream Link'}
                                onChange={(e) => setText(e.target.value)}
                                disabled
                                style={{ width: '300px', padding: '10px', marginRight: '40px', borderRadius: '5px', marginLeft: '40px' }}
                                placeholder="Enter text here..."
                            />
                            <button className="copy-button" onClick={handleCopy}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <textarea value={streamData.streamDescription ? streamData.streamDescription : ''} disabled className="stream-desc-from-database" placeholder="Enter Stream Description"></textarea>
                    </div>
                    <div className="edit-column">
                        <div className="download-buttons-qr">
                            <button type="submit" className="eventbutton">Download QR</button>
                        </div>
                    </div>
                </div>
                <div className="edit-icon-createstream" onClick={handleEditStream}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </div>
            </div>
        </div>
    );
}

function PastStream() {
    const items = Array.from({ length: 8 }, (_, index) => index + 1);

    return (
        <div className="container">
            <div className="scrollable-container">
                {items.map((item) => (
                    <div key={item} className="past-stream-container">
                        <div className="past-streams-card">
                            <div className="past-streams-rectangle"></div>
                            <div className="past-streams-logo">
                                <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                            </div>
                            <div className="past-streams-company-name">Company Name</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DashBoard() {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedOption, setHighlightedOption] = useState(null);
    const [streamData, setStreamData] = useState({
    filePath: '',
    streamName: '',
    logoImageUrl: '',
    streamQr: '',
    streamDesc: '',
    streamColor: ''
});
    
    const decodedPayload = decodeToken(localStorage.getItem('authToken'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataForUserId();
                    setStreamData(data[0]); // Update stream link state
                    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const { removeToken } = useAuthToken();
    console
    const newStream = () => {
        navigate('/createstream');
    };

    const handleLogout = async () => {
        try {
            await auth.signOut(auth);
            removeToken();
            navigate('/signin');
            window.location.reload();
            alert('User signed out successfully');
        } catch (error) {
            console.error('Error occurred during logout:', error);
            alert('Error occurred during logout:', error);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        if (option === 'Logout') {
            handleLogout();
        } else {
            navigate("/userprofile");
        }
        setIsOpen(false);
    };

    const handleCurrentStreamClick = () => {
        setIsCurrentStreamActive(true);
    };

    const handlePastStreamClick = () => {
        setIsCurrentStreamActive(false);
    };

    const [isCurrentStreamActive, setIsCurrentStreamActive] = useState(true);

    return (
        <div className="background">
            <nav className="navbar-dashboard">
                <div className="navbar-logo-dashboard">
                    <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                </div>
                <div className='navbar-dashboard-right'>
                    <button className="new-stream-button" onClick={newStream}>
                        New Stream
                    </button>
                    <div className="dropdown" ref={dropdownRef}>
                        <button className={`dropdown-toggle ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                            <FontAwesomeIcon className='dropdown-dashboard-icon' icon={faUserAlt} />
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                <button
                                    className={`dropdown-option ${highlightedOption === 'Profile' ? 'highlighted' : ''}`}
                                    onClick={() => handleOptionClick('Profile')}
                                    onMouseEnter={() => setHighlightedOption('Profile')}
                                    onMouseLeave={() => setHighlightedOption(null)}
                                >
                                    Profile
                                </button>
                                <button
                                    className={`dropdown-option ${highlightedOption === 'Logout' ? 'highlighted' : ''}`}
                                    onClick={() => handleOptionClick('Logout')}
                                    onMouseEnter={() => setHighlightedOption('Logout')}
                                    onMouseLeave={() => setHighlightedOption(null)}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="image-corner-right">
                <img src="./src/assets/images/bgglobe.png" alt="Background Globe" />
            </div>
            <br />
            {isCurrentStreamActive ? (
                <CurrentStreamHeading />
            ) : (
                <PastStreamHeading />
            )}
            <br />
            <div className="stream-buttons">
                <div className="toggle-button-bg">
                    <button
                        className={
                            isCurrentStreamActive ? "activeButton" : "inactiveButton"
                        }
                        onClick={handleCurrentStreamClick}
                    >
                        <b>Current Stream</b>
                    </button>
                    <button
                        className={
                            !isCurrentStreamActive ? "activeButton" : "inactiveButton"
                        }
                        onClick={handlePastStreamClick}
                    >
                        <b>Past Stream</b>
                    </button>
                </div>
            </div>
            <br />
            {isCurrentStreamActive ? <CurrentStream streamData={streamData} /> : <PastStream />}

        </div>
    );
}

export default DashBoard;
