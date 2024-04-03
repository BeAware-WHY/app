import React, { useState, useEffect, useRef } from 'react';
import './DashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { database, auth, fetchDataForUserId } from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
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


function CurrentStream({ streamData }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const handleEditStream = () => {
        // Navigate to the dashboard screen
        navigate('/editstream');
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

    const handleDownloadPDF = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = '../../../../ConferenceCaptioning-Instructions 2.pdf';
        downloadLink.download = 'ConferenceCaptioning-Instructions.pdf';
        downloadLink.click();
    };
    console.log("50----",streamData);
    return (
    <div className="currentstream-main">
        <div className="image-corner-left-currentstream">
            <img src="./src/assets/images/dashboard.png" alt="personstreamcreate" />
        </div>
        <div className="stream-card-container-currentstream">
            <div className="stream-card-currentstream">
                <div className="logo-column">
                    <div className="logo-placeholder">
                        <img src={streamData && streamData.length > 0 ? streamData[1] : ''} alt="Company Logo" />
                    </div>
                    <div className="download-buttons-pdf">
                        <button type="submit" onClick={handleDownloadPDF} className="eventbutton">Download PDF</button>
                    </div>
                </div>
                <div className="column-main">
                    <div className="semi-circle"></div>
                    <div className="streamname-from-database"> Name -  {streamData && streamData.length > 0 ? streamData[0].streamName : 'Stream Name'}</div>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                        <input
                            type="text"
                            value={streamData && streamData.length > 0 ? streamData[0].filePath : {text}}
                            onChange={(e) => setText(e.target.value)}
                            disabled
                            style={{ width: '300px', padding: '10px', marginRight: '40px', borderRadius: '5px', marginLeft: '40px' }}
                            placeholder="Enter text here..."
                        />
                        <button className="copy-button" onClick={handleCopy}>
                            <FontAwesomeIcon icon={faCopy} />
                        </button>
                    </div>
                    <textarea value={streamData && streamData.length > 0 ? streamData[0].streamDescription : ''} disabled className="stream-desc-from-database" placeholder="Enter Stream Description"></textarea>
                </div>
                <div className="edit-column">
                    {/* <div className="edit-icon-createstream" onClick={handleEditStream}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div> */}
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
    const [items, setItems] = useState([]);
    const storage = getStorage();
    // Generate an array of 8 elements
    // const items = Array.from({ length: 8 }, (_, index) => index + 1);
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
    const [streamData, setStreamData] = useState({
    filePath: '',
    streamName: '',
    logoImageUrl: '',
    streamQr: '',
    streamDesc: '',
    streamColor: ''
});
    const storage = getStorage();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataForUserId();
                console.log("180----",data[0]);
                await getDownloadURL(ref(storage, data[0].logoImageUrl));
                // await getDownloadURL(ref(storage, data[0].qrCodeDataURL));
                const logoUrl = await getDownloadURL(ref(storage, data[0].logoImageUrl));
                // const qrCodeDataURL = await getDownloadURL(ref(storage, data[0].qrCodeDataURL));
                const qrCodeDataURL=''
                console.log("163----",qrCodeDataURL)
                const updatedStreamData = [data[0], logoUrl, qrCodeDataURL];
                setStreamData(updatedStreamData); // Update stream link state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
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
