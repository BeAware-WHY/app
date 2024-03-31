import React, { useState, useEffect, useRef } from 'react';
import './DashBoard.css';
// import './CreateStream/CreateStream.css'
// import './src/components/pages/CreateStream/CreateStream.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import { collection, addDoc } from 'firebase/firestore';
// import { database } from '../firebase';
import { useNavigate } from "react-router-dom";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../firebase";
import useAuthToken from "../../../constants/useAuthToken";

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
    return (<div className="currentstream-main">
        <div className="image-corner-left-currentstream">
            <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
        </div>
        <div className="stream-card-container-currentstream">
            <div className="stream-card-currentstream">
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
                </div>
            </div>
        </div>
    </div>
    );
}



function PastStream() {
    // Generate an array of 8 elements
    const items = Array.from({ length: 8 }, (_, index) => index + 1);

    return (
        <div className="container">
            <div className="scrollable-container">
                {items.map((item) => (
                    <div key={item} className="past-stream-container">
                        <div className="past-streams-card">
                            {/* Uncomment if you want to include the rounded square */}
                            {/* <div className="past-streams-rounded-square"></div> */}
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

    {/* Dropdown code updated start from here*/ }

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedOption, setHighlightedOption] = useState(null);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        if (option === 'Logout') {
            // Implement logout functionality
            console.log('Logging out...');
        } else {
            // Implement profile functionality
            console.log('Viewing profile...');
            navigate("/userprofile")
        }
        setIsOpen(false);
    };
    {/* Dropdown code updated till here*/ }

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



    const navigate = useNavigate();
    const { removeToken } = useAuthToken();
    const newStream = () => {
        navigate('/createstream');
    };

    {/* logout code updated working take from here */ }
    const handleLogout = async (e) => {
        try {
            await auth.signOut(auth);
            removeToken(); // Remove the authentication token
            navigate('/signin'); // Redirect to the signin page
            window.location.reload();
            alert('User signed out successfully');
        } catch (error) {
            console.error('Error occurred during logout:', error);
            alert('Error occurred during logout:', error);
            // Handle error
        }
    };
    {/* logout code updated working till here */ }




    const [isCurrentStreamActive, setIsCurrentStreamActive] = useState(true);

    const handleCurrentStreamClick = () => {
        setIsCurrentStreamActive(true);
    };

    const handlePastStreamClick = () => {
        setIsCurrentStreamActive(false);
    };
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
                    {/* <Link to="/createstream" className="new-stream-button">New Stream</Link> */}

                    {/* Dropdown code update start from here*/}
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
                                    onClick={handleLogout}
                                    onMouseEnter={() => setHighlightedOption('Logout')}
                                    onMouseLeave={() => setHighlightedOption(null)}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>



                {/* Dropdown code update till here*/}
            </nav>
            <div className="image-corner-right">
                <img src="./src/assets/images/bgglobe.png" alt="Background Globe" />
            </div>
            <br></br>
            {isCurrentStreamActive ? (
                <CurrentStreamHeading />
            ) : (
                <PastStreamHeading />
            )}
            <br></br>
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
            <br></br>
            
            {isCurrentStreamActive ? <CurrentStream /> : <PastStream />}
        </div>
    );
}

export default DashBoard;
