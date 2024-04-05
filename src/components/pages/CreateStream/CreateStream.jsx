import React, { useState, useEffect, useRef } from 'react';
import './CreateStream.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useAuthToken from "../../../constants/useAuthToken";
import { app, getUserIDFromAuthToken } from './../firebase';
import Loader from "../../resources/Loader/loader";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import QRCode from 'qrcode';


function CreateStream() {
    // const [profileClicked, setProfileClicked] = useState(false);
    const [streamName, setStreamName] = useState('');
    const [streamColor, setStreamColor] = useState('#000000');
    const [streamDescription, setStreamDescription] = useState('');
    const [logoImage, setLogoImage] = useState(null); // State to store the uploaded logo image
    const [streamDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [streamNameError, setStreamNameError] = useState('');

    const navigate = useNavigate();
    const { removeToken } = useAuthToken();
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedOption, setHighlightedOption] = useState(null);
    const handleCancel = () => {
        // Navigate to the dashboard screen
        navigate('/dashboard');
    };
    // const toggleProfile = () => {
    //     setProfileClicked(!profileClicked);
    // };
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
    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setLogoImage(reader.result); 
            // Set the logo image preview
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const storage = getStorage(app);
    const handleInput = (e) => {
        const inputValue = e.target.value;
        const isValid = /^[A-Za-z]+$/.test(inputValue); // Check if the input contains only alphabetic characters
        
        if (isValid) {
            setStreamName(inputValue);
            setStreamNameError(''); // Clear the error message
        } else {
            setStreamNameError('Stream Name should only contain alphabetic characters.');
        }
    };
    
    const handleSubmit = async (event) => {
        setIsLoading(true);
        
        event.preventDefault();
        console.log(logoImage)
        const userId = await getUserIDFromAuthToken();
        const logoStorageRef = ref(storage, `logo/${userId}/${streamName}`);
        console.log(logoStorageRef)
        const imageBlob = await fetch(logoImage).then((res) => res.blob());
        await uploadBytes(logoStorageRef, imageBlob);

        const logoImageUploadUrl = await getDownloadURL(logoStorageRef);
        console.log(logoImageUploadUrl)

        try {
            // const userId = await getUserIDFromAuthToken();
            console.log("Started request")
            const response = await fetch('/api/stream/CreateStreamWithStyle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: streamName,
                    bannerColor: streamColor,
                    logoUrl: logoImageUploadUrl // Assuming logoImage is the URL of the uploaded logo
                })
            });
            console.log(response)
            if (response.ok) {
                window.location.reload();
                const data = await response.json();
                console.log('File Path:', data.filePath);


                const qrCodeDataURL = await QRCode.toDataURL(data.filePath);
                const qrBlob = await fetch(qrCodeDataURL).then((res) => res.blob());
                const qrStorageRef = ref(storage, `QR/${userId}/${streamName}.jpg`);
                await uploadBytes(qrStorageRef, qrBlob);

                // Store form data and API response in Firebase
                const formData = {
                    userId,
                    streamName,
                    streamColor,
                    streamDescription,
                    logoImageUrl: `logo/${userId}/${streamName}`,
                    qrCodeDataURL: `QR/${userId}/${streamName}`,
                    filePath: data.filePath,
                    streamDate: streamDate.toISOString()
                };

                // Add a document to the "streamData" collection in Firebase
                await addDoc(collection(database, "streamData"), formData);

                console.log('Form data and API response saved in Firebase successfully!');
                
                console.log("Redirecting to dashboard...");
                alert("Stream Created Successfully");
                setIsLoading(false);
                navigate("/dashboard"); 
                
                // Perform any further actions based on the response from the backend, such as redirecting or displaying a success message
            } else {
                console.error('Failed to create stream:', response.statusText);
                setIsLoading(false);
                alert("Stream Name '" + streamName + "' is already Taken !!!");
                
            }
        } catch (error) {
            console.error('Error occurred while creating stream:', error);
            alert(error);
            // Handle error
        }
    };

    return (
        <div className="background">
              {isLoading && <Loader />}
            <nav className="navbar-createstream">
                <div className="navbar-logo-createstream">
                    <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                </div>
                <div className='navbar-createstream-right'>

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
            <div className="image-corner-left">
                <img src="./src/assets/images/personstreamcreate.png" alt="personstreamcreate" />
            </div>
            <br></br>
            <div className="generate-stream-text">Let&apos;s GENERATE greatness together!</div>
            <br></br>
            <div className="stream-card-container">
                <div className="stream-card">
                    <div className="left-content">
                        <div className="logo-container">
                            <div className="logo-placeholder-createstream" onClick={() => document.getElementById('logoInput').click()}>
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
                                                onChange={handleInput}
                                                
                                                // onChange={(e) => setStreamName(e.target.value)}
                                                required
                                            />
                                            {streamNameError && <div className="error-message">{streamNameError}</div>}
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
                                        id="streamDescription-editstream"
                                        placeholder="You can write what is the purpose of this stream"
                                        value={streamDescription}
                                        onChange={(e) => setStreamDescription(e.target.value)}
                                    ></textarea>
                                    <div className="buttons">
                                        <button type="button" className="eventbutton" onClick={handleCancel}>Cancel</button>
                                        <button type="submit" className="eventbutton">Create</button>
                                    </div>
                                </form>
                                {isLoading && <Loader />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateStream;
