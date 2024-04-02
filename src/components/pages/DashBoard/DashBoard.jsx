import  { useState, useEffect, useRef } from 'react';
import './DashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { database } from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import useAuthToken from "../../../constants/useAuthToken";
import { fetchDataForUserId, auth } from "../firebase"; // Import fetchDataForUserId and auth from firebase file
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

    const handleDownloadPDF = () => {
    // Create a new anchor element
    const downloadLink = document.createElement('a');
    // Set the href attribute to the URL of the PDF file
    downloadLink.href = '../../../../ConferenceCaptioning-Instructions 2.pdf';
    // Specify the file name for the downloaded file
    downloadLink.download = 'ConferenceCaptioning-Instructions.pdf';
    // Simulate a click on the anchor element
    downloadLink.click();
};

    console.log("41----",streamData)
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
                                value={streamData && streamData.length > 0 ? streamData[0].filePath : 'Stream Link'}
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
                        <div className="download-buttons-qr">
                            <a href={streamData && streamData.length > 0 ? streamData[2] : ''}><button type="submit" className="eventbutton">Download QR</button></a>
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
                await getDownloadURL(ref(storage, data[0].logoImageUrl));
                const logoUrl = await getDownloadURL(ref(storage, data[0].logoImageUrl));
                // const qrCodeDataURL = await getDownloadURL(ref(storage, data[0].qrCodeDataURL));
                const qrCodeDataURL=''
                console.log("163----",logoUrl)
                const updatedStreamData = [data[0], logoUrl, qrCodeDataURL];
                    setStreamData(updatedStreamData); // Update stream link state
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
