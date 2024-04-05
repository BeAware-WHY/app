import React, { useState, useEffect, useRef } from 'react';
import './DashBoard.css';
// import './CreateStream/CreateStream.css'
// import './src/components/pages/CreateStream/CreateStream.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
import { faUserAlt, faPencilAlt, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../firebase";
import useAuthToken from "../../../constants/useAuthToken";
import { getUserIDFromAuthToken } from './../firebase';

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
    const [streamName, setStreamName] = useState('');
    const [streamDescription, setStreamDescription] = useState('');
    const [streamColor, setStreamColor] = useState(''); // This will be used if you decide to use the color dynamically
    const [streamLink, setStreamLink] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [qrUrl, setQRUrl] = useState('');
    const navigate = useNavigate();
    const storage = getStorage();

    useEffect(() => {
        (async () => {
            const userId = await getUserIDFromAuthToken();
            const fetchLatestStream = async () => {
                const q = query(collection(database, "streamData"), where("userId", "==", userId), orderBy("streamDate", "desc"), limit(1));
                console.log(q);
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const latestStream = querySnapshot.docs[0].data();
                    setStreamName(latestStream.streamName);
                    setStreamDescription(latestStream.streamDescription);
                    setStreamColor(latestStream.streamColor); // Assuming color is directly usable
                    setStreamLink(latestStream.filePath);

                    if (latestStream.logoImageUrl) {
                        const logoRef = ref(storage, latestStream.logoImageUrl);
                        const logoDownloadUrl = await getDownloadURL(logoRef);
                        setLogoUrl(logoDownloadUrl);
                    }
                    if (latestStream.qrCodeDataURL) {
                        const qrRef = ref(storage, latestStream.qrCodeDataURL + ".jpg");
                        const qrDownloadUrl = await getDownloadURL(qrRef);
                        setQRUrl(qrDownloadUrl);
                        localStorage.setItem('qrCodeUrl', qrDownloadUrl);
                    }
                }
            };

            await fetchLatestStream();
        })();
    }, []);

    const handleEditStream = () => {
        navigate(`/editstream/${encodeURIComponent(streamName)}`);
    };

    const handleDownloadQR = async () => {
        const qrUrl = localStorage.getItem('qrCodeUrl'); // Retrieve the URL from localStorage
        if (!qrUrl) {
            console.error('QR code URL is missing');
            return;
        }

        // Prepend the CORS proxy URL to the target URL
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const proxyUrl = 'http://localhost:8080/';
        const proxiedUrl = proxyUrl + qrUrl;

        try {
            const response = await fetch(proxiedUrl, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // Some CORS proxies require this header
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);

            const a = document.createElement('a');
            a.href = imageObjectURL;
            a.download = 'QRCode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => URL.revokeObjectURL(imageObjectURL), 100);
        } catch (error) {
            console.error("Error downloading QR code:", error);
        }
    };


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(streamLink);
            alert('Text copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy text:', error);
            alert('Failed to copy text!');
        }
    };
    const handleDownloadPDF = async () => {
        try {
            // Assuming your development server or production build process serves files from the public directory
            // Adjust the path to match your project structure if needed
            const storage = getStorage();
            const pdfRef = ref(storage, 'pdf/ConferenceCaptioning-Instructions 2.pdf');
            const url = await getDownloadURL(pdfRef);

            // `url` is the download URL for the PDF
            const proxyUrl = 'http://localhost:8080/';
            const proxiedUrl = proxyUrl + url;

            // Fetch the PDF through a proxy
            const response = await fetch(proxiedUrl, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // Some CORS proxies require this header
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const pdfBlob = await response.blob();
            const pdfObjectURL = URL.createObjectURL(pdfBlob);

            // Create an anchor element and trigger the download
            const a = document.createElement('a');
            a.href = pdfObjectURL;
            a.download = 'ConferenceCaptioning-Instructions.pdf'; // Update the filename as needed
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Clean up the object URL
            setTimeout(() => URL.revokeObjectURL(pdfObjectURL), 100);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <div className="currentstream-main">
            <div className="image-corner-left-currentstream">
                {/* Static image, can be replaced or removed as needed */}
                <img src="./src/assets/images/dashboard.png" alt="Dashboard" />
            </div>
            <div className="stream-card-container-currentstream">
                <div className="stream-card-currentstream" style={{ borderColor: streamColor }}> {/* Border color could be used to indicate stream color */}
                    <div className="logo-column">

                        <div className="logo-placeholder">
                            {/* Dynamically loaded stream logo */}
                            <img src={logoUrl} alt="Company Logo" />

                        </div>
                        <div className="download-buttons-pdf">
                            <button type="button" className="eventbutton" onClick={handleDownloadPDF}>Download PDF</button> {/* Assuming this will be implemented */}
                        </div>
                    </div>
                    <div className="column-main">
                        <div className="semi-circle" style={{ backgroundColor: streamColor }}></div> {/* Semi-circle showing stream color */}
                        <div className="streamname-from-database">Name - {streamName}</div>
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                            {/* Stream link input field */}
                            <input
                                type="text"
                                value={streamLink}
                                readOnly
                                style={{ width: '300px', padding: '10px', marginRight: '40px', borderRadius: '5px', marginLeft: '40px' }}
                            />
                            {/* Copy to clipboard button */}
                            <button className="copy-button" onClick={handleCopy} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* Stream description textarea */}
                        <textarea
                            readOnly
                            className="stream-desc-from-database"
                            value={streamDescription}
                            style={{ width: '300px', padding: '10px', borderRadius: '5px', minHeight: '100px' }}
                        />
                    </div>
                    <div className="edit-column">
                        <div className="image-download-wrapper">
                            <img src={qrUrl} alt="QR Code" className="qr-image" />
                            {/* <button type="button" className="download-qr-button" onClick={handleDownloadQR}>
                                <FontAwesomeIcon icon={faDownload} />
                            </button> */}
                        </div>
                        <div className="download-buttons-qr">
                            <button type="submit" className="eventbutton" onClick={handleDownloadQR}>Download QR</button>
                        </div>
                    </div>
                </div>
                <div className="edit-icon-createstream" onClick={handleEditStream} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </div>
            </div>
        </div>
    );
}


function PastStream() {
    const [items, setItems] = useState([]);
    const storage = getStorage();
    // Generate an array of 8 elements
    // const items = Array.from({ length: 8 }, (_, index) => index + 1);
    const handleDeleteStream = async (streamNameToDelete) => {
        // Confirmation dialog
        const q = query(collection(database, "streamData"), where("streamName", "==", streamNameToDelete));
        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("No matching documents found.");
                return;
            }

            const response = await fetch('/api/stream/DeleteStream', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldName: streamNameToDelete
                })
            });

            if (response.ok) {
                querySnapshot.forEach(async (document) => {
                    await deleteDoc(document.ref);
                    console.log(`Stream ${streamNameToDelete} deleted successfully.`);
                });
            }

            // Optionally: Refresh the items shown in the UI
            // setItems(prevItems => prevItems.filter(item => item.streamName !== streamNameToDelete));
            const fetchStreams = async () => {
                const userId = await getUserIDFromAuthToken();
                const q = query(collection(database, "streamData"), where("userId", "==", userId), orderBy("streamDate", "desc"));
                const querySnapshot = await getDocs(q);
                const streams = [];

                for (let doc of querySnapshot.docs) {
                    const data = doc.data();
                    // Convert streamDate from Timestamp to JavaScript Date, if necessary
                    const streamDate = data.streamDate?.toDate ? data.streamDate.toDate() : data.streamDate;
                    const logoUrl = await getDownloadURL(ref(storage, data.logoImageUrl));
                    streams.push({ ...data, logoUrl, backgroundColor: data.streamColor, streamDate });
                }

                // Remove the first element (the latest stream) if there's more than one stream
                if (streams.length > 1) {
                    streams.shift(); // Removes the first element from the array
                }

                setItems(streams);
            };
            await fetchStreams();
        } catch (error) {
            console.error("Error deleting stream:", error);
        }

        if (!window.confirm(`Are you sure you want to delete the stream "${streamNameToDelete}"?`)) {
            return;
        }
    };

    useEffect(() => {
        (async () => {
            const userId = await getUserIDFromAuthToken();
            console.log(userId);
            const fetchStreams = async () => {
                const q = query(collection(database, "streamData"), where("userId", "==", userId), orderBy("streamDate", "desc"));
                const querySnapshot = await getDocs(q);
                const streams = [];

                for (let doc of querySnapshot.docs) {
                    const data = doc.data();
                    // Convert streamDate from Timestamp to JavaScript Date, if necessary
                    const streamDate = data.streamDate?.toDate ? data.streamDate.toDate() : data.streamDate;
                    const logoUrl = await getDownloadURL(ref(storage, data.logoImageUrl));
                    streams.push({ ...data, logoUrl, backgroundColor: data.streamColor, streamDate });
                }

                // Remove the first element (the latest stream) if there's more than one stream
                if (streams.length > 1) {
                    streams.shift(); // Removes the first element from the array
                }

                setItems(streams);
            };

            await fetchStreams();
        })();
    }, []); // Dependency array remains empty if getUserIDFromAuthToken doesn't depend on any state or props      

    return (
        <div className="container">
            <div className="scrollable-container">
                {items.map((item, index) => (
                    <div key={index} className="past-stream-container">
                        <div className="past-streams-card">
                            {/* Uncomment if you want to include the rounded square */}
                            {/* <div className="past-streams-rounded-square"></div> */}
                            <div className="past-streams-rectangle" style={{ backgroundColor: item.backgroundColor }}></div>
                            <div className="past-streams-logo">
                                <img src={item.logoUrl} alt="Company Logo" />
                            </div>
                            <div className="past-streams-company-name">{item.streamName}</div> {/* Replace `item.name` with your actual field name for the stream name */}
                        </div>
                        <div className="edit-icon-paststream" style={{ cursor: 'pointer' }} onClick={() => handleDeleteStream(item.streamName)}>
                            <FontAwesomeIcon icon={faTrash} />
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
