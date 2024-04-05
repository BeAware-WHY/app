
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPencilAlt, faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import "../UserProfile/UserProfile.css";
import { auth } from "../firebase";
import useAuthToken from "../../../constants/useAuthToken";

function UserProfile() {
    const navigate = useNavigate();
    const { removeToken } = useAuthToken();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedOption, setHighlightedOption] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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

    const handleOptionClick = (option) => {
        if (option === 'Logout') {
            // Implement logout functionality
            console.log('Logging out...');
        } else {
            // Implement profile functionality
            console.log('Viewing profile...');

        }
        setIsOpen(false);
    };

    const onClickSave = (option) => {
        console.log("Save")
        alert('Profile details updated successfully');
        navigate("/dashboard")
    }

    const onClickCancel = (option) => {
        console.log("Save")
        navigate("/dashboard")
    }

    const onClickDelete = (option) => {
        console.log("Save")
        alert('Profile deleted successfully');
        handleLogout()
        navigate("/signin")
    }





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







    return (
        <div className="background">
            <nav className="navbar-dashboard">
                <div className="navbar-logo-dashboard">
                    <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
                </div>
                <div className="image-corner-left">
                    <img src="./src/assets/images/personstreamcreate.png" alt="personstreamcreate" />
                </div>
                <div className='navbar-dashboard-right'>


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
                {/* Static image, can be replaced or removed as needed */}
                {/* <img src="./src/assets/images/profile_background.png" alt="Dashboard" /> */}
            </div>

            <br></br>
            <div className="generate-stream-text">Welcome to your profile!!</div>
            <br></br>
            <div className="currentstream-main">

                <div className="card-container-profile">
                    <div className="card-profile" > {/* Border color could be used to indicate stream color */}
                        <form className='profile-form'>


                            <div
                                style={{
                                    display: "flex",
                                    alignContent: "flex-start",
                                    marginTop: "10px",
                                    marginBottom: "-5px",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "self-start"
                                }}
                            >
                                <div style={{ marginRight: "6rem" }}>

                                    <label className="inpt-label-profile">First Name</label>
                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="firstname">
                                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                                        </label>
                                        <input
                                            id="firstname"
                                            className="input-field-style-profile"
                                            type="text"
                                            name="firstName"
                                            placeholder="Dhara"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />

                                    </div>
                                </div>
                                <div style={{ margin: 0, marginTop: 0 }}>
                                    <label className="inpt-label-profile">Last Name</label>
                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="lastname">
                                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                                        </label>
                                        <input
                                            id="lastname"
                                            className="input-field-style-profile"
                                            type="text"
                                            name="lastName"
                                            placeholder="Patel"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>





                            <label className="inpt-label-profile">Email</label>
                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="email">
                                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                                </label>
                                <input
                                    id="email"
                                    className="input-field-style-profile"
                                    type="email"
                                    name="email"
                                    placeholder="pateldharapravin@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>


                            <label className="inpt-label-profile">Phone number</label>
                            <div className="input-wrapper">
                                <label className="input-label" htmlFor="phone">
                                    <FontAwesomeIcon icon={faPhone} className="input-icon" />
                                </label>
                                <input
                                    id="lastname"
                                    className="input-field-style-profile"
                                    type="text"
                                    name="phone"
                                    placeholder="2269618753"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>



                            <div className='button-container'>
                                <button className="rounded-button-profile blue" onClick={onClickSave}>
                                    Save
                                </button>
                                <button className="rounded-button-profile blue" onClick={onClickCancel}>
                                    Cancel
                                </button>
                                <button className="rounded-button-profile blue" onClick={onClickDelete}>
                                    Delete Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default UserProfile;
