import React, { useState, useEffect, useRef } from 'react';
import './EditStream.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useAuthToken from "../../../constants/useAuthToken";

function EditStream() {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const { removeToken } = useAuthToken();
    const [streamName, setStreamName] = useState('');
    const [streamColor, setStreamColor] = useState('#000000');
    const [streamDescription, setStreamDescription] = useState('');
    const [logoImage, setLogoImage] = useState(null); // State to store the uploaded logo image
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedOption, setHighlightedOption] = useState(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
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
    const handleEditStream = () => {
        // Navigate to the dashboard screen
        navigate('/editstream');
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
    const handleCancel = () => {
        // Navigate to the dashboard screen
        navigate('/dashboard');
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // try {
        //     const response = await fetch('https://localhost:7050/api/v1.0/stream/create-stream', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             name: streamName,
        //             bannerColor: streamColor,
        //             logoUrl: logoImage // Assuming logoImage is the URL of the uploaded logo
        //         })
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log('File Path:', data.filePath);

        //         const qrCodeData = JSON.stringify({
        //             name: streamName,
        //             bannerColor: streamColor,
        //             logoUrl: logoImage,
        //             filePath: data.filePath
        //         });
        //         const qrCodeDataURL = `data:image/svg+xml;base64,${btoa(qrCodeData)}`;

        //         // Store form data and API response in Firebase
        //         const formData = {
        //             streamName,
        //             streamColor,
        //             streamDescription,
        //             logoImage,
        //             qrCodeDataURL,
        //             filePath: data.filePath,
        //             streamDate: streamDate.toISOString()
        //         };

        //         // Add a document to the "streamData" collection in Firebase
        //         await addDoc(collection(database, "streamData"), formData);

        //         console.log('Form data and API response saved in Firebase successfully!');

        //         // Perform any further actions based on the response from the backend, such as redirecting or displaying a success message
        //     } else {
        //         console.error('Failed to create stream:', response.statusText);
        //         // Handle error
        //     }
        // } catch (error) {
        //     console.error('Error occurred while creating stream:', error);
        //     // Handle error
        // }
    };
    return (
        <div className="background">
            <nav className="navbar-editstream">
                <div className="navbar-logo-editstream">
                    <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                </div>
                <div className='navbar-editstream-right'>

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
            <div className="generate-stream-text">Editing is where the magic happens</div>
            <br></br>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled
                    style={{ width: '400px', padding: '10px', marginRight: '40px', borderRadius: '20px', marginLeft: '40px', height: '50px' }}
                    placeholder="Enter text here..."
                />
                <button className="copy-button" onClick={handleCopy}>
                    <FontAwesomeIcon icon={faCopy} />
                </button>
            </div>
            <div className="image-corner-left-editstream">
                <img src="./src/assets/images/editstream.png" alt="personstreamcreate" />
            </div>
            <div className="card-container-editstream">
                <div className="card-editstream">
                    <div className="top-content-editstream">
                        <div className="left-content-editstream">
                            <div className="logo-container">
                                <div className="logo-placeholder" onClick={() => document.getElementById('logoInput').click()}>
                                    {logoImage ? (
                                        <img src={logoImage} alt="Upload Logo*" />
                                    ) : (
                                        <img src="logo.png" alt="Upload Logo*" required />
                                    )}
                                </div>
                                <div className="edit-icon-editstream" onClick={() => document.getElementById('logoInput').click()}>
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
                        </div>
                        <div className="right-content-editstream">
                            <div className="streamName-editstream">
                                <label htmlFor="streamName"><b style={{ width: '150px' }}>Stream Name:</b><b style={{ color: '#cc0000' }}>*</b></label>
                                <input
                                    type="text"
                                    className="streamNameInput-editstream"
                                    id="streamName"
                                    placeholder="E.g. XYZ Stream"
                                    value={streamName}
                                    onChange={(e) => setStreamName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="streamColor-editstream">
                                <label htmlFor="streamColor" style={{ width: '150px' }}><b>Stream Color:</b><b style={{ color: '#cc0000' }}>*</b></label>
                                <input
                                    type="color"
                                    className="streamColorInput-editstream"
                                    id="streamColor"
                                    value={streamColor}
                                    onChange={(e) => setStreamColor(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bottom-content-editstream">
                        <label htmlFor="streamDescription"><b>Stream Description:</b></label>
                        <textarea
                            id="streamDescription"
                            placeholder="You can write what is the purpose of this stream"
                            // style={{width : '500px', height : '80px', borderRadius: '5px', marginTop: '5px'}}
                            className="stream-desc-from-database-editstream"
                            value={streamDescription}
                            onChange={(e) => setStreamDescription(e.target.value)}
                        ></textarea>
                        <div className="buttons-editstream">
                            <button type="button" className="eventbutton-editstream" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="save-icon-editstream" onClick={handleEditStream}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
        </div>
    );

}

export default EditStream;