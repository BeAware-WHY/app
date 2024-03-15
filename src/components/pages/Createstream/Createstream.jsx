import React, { useState } from 'react';
import './CreateStream.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getUserIDFromAuthToken } from './../firebase';


function CreateStream() {
    const [profileClicked, setProfileClicked] = useState(false);
    const [streamName, setStreamName] = useState('');
    const [streamColor, setStreamColor] = useState('#000000');
    const [streamDescription, setStreamDescription] = useState('');
    const [logoImage, setLogoImage] = useState(null);
    const [streamDate] = useState(new Date());
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/dashboard');
    };
    const handleCreate = () => {
        navigate('/dashboard');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            

            const userId = await getUserIDFromAuthToken();

            const response = await fetch('https://localhost:7050/api/v1.0/stream/create-stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: streamName,
                    bannerColor: streamColor,
                    logoUrl: logoImage,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File Path:', data.filePath);
                const formData = {
                    userId,
                    streamName,
                    streamColor,
                    streamDescription,
                    logoImage,
                    filePath: data.filePath,
                    streamDate: streamDate.toISOString(),
                };
                console.log('Form data:', formData);
                await addDoc(collection(database, 'streamData'), formData);
                console.log('Form data and API response saved in Firebase successfully!');
            } else {
                console.error('Failed to create stream:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while creating stream:', error);
        }
    };

    return (
        <div className="background">
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
            <div className="image-corner-right">
                <img src="./src/assets/images/bgglobe.png" alt="Background Globe" />
            </div>
            <div className="image-corner-left">
                <img src="./src/assets/images/personstreamcreate.png" alt="personstreamcreate" />
            </div>
            <div className="generate-stream-text">Let&apos;s GENERATE greatness together!</div>

            <div className="stream-card-container">
                <div className="stream-card">
                    <div className="left-content">
                        <div className="logo-container">
                            <div className="logo-placeholder" onClick={() => document.getElementById('logoInput').click()}>
                                {logoImage ? (
                                    <img src={logoImage} alt="Upload Logo*" />
                                ) : (
                                    <img src="logo.png" alt="Upload Logo*" required />
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
                        <div className="message-container">
                            <p>Stream link will be displayed after this step</p>
                            <p><b>Free links left - 2</b></p>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="content-container">
                            <div className="stream-details">
                                <form onSubmit={handleSubmit}>
                                    <div className="streamColorName">
                                        <div className="streamName">
                                            <label htmlFor="streamName"><b style={{ width: '150px' }}>Stream Name:</b><b style={{ color: '#cc0000' }}>*</b></label>
                                            <input
                                                type="text"
                                                className="streamNameleft"
                                                id="streamName"
                                                placeholder="E.g. XYZ Stream"
                                                value={streamName}
                                                onChange={(e) => setStreamName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="streamColor">
                                            <label htmlFor="streamColor" style={{ width: '150px' }}><b>Stream Color:</b><b style={{ color: '#cc0000' }}>*</b></label>
                                            <input
                                                type="color"
                                                className="streamColorRight"
                                                id="streamColor"
                                                value={streamColor}
                                                onChange={(e) => setStreamColor(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="streamDescription"><b>Stream Description:</b></label>
                                    <textarea
                                        id="streamDescription"
                                        placeholder="You can write what is the purpose of this stream"
                                        value={streamDescription}
                                        onChange={(e) => setStreamDescription(e.target.value)}
                                    ></textarea>
                                    <div className="buttons">
                                        <button type="button" className="eventbutton" onClick={handleCancel}>Cancel</button>
                                        <button type="submit" className="eventbutton" onClick={handleCreate}>Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateStream;
