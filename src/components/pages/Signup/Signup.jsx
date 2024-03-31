import React from "react";
import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import { database, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../resources/Button/button";
import Loader from "../../resources/Loader/loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthToken from "../../../constants/useAuthToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";


const Signup = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  const validateInputs = () => {
    if (firstName.trim() === "") {
      setError("Please enter your First Name");
      return false;
    }

    if (lastName.trim() === "") {
      setError("Please enter your Last Name");
      return false;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 5) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (!isChecked) {
      setError("Please agree to the Terms and Privacy Policy");
      return false;
    }

    return true; // All validations passed
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateInputs() || !isChecked) {
      return; // Exit function if validation fails or checkbox is not checked
    }

    setIsLoading(true); // Set loading state to true

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const formData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        uid: userCredential.user.uid
      };

      // Store user data in Firestore with user's UID as document ID
      //await setDoc(doc(database, "users", userCredential.user.uid), formData);

      await setDoc(doc(database, "users", userCredential.user.uid), formData);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = res.user.stsTokenManager.accessToken;
      saveToken(accessToken);
      console.log("User signed up and data stored successfully");

      navigate("/createstream");
      window.location.reload();

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please use a different email address.");
      } else {
        console.error("Error signing up:", error.message);
        setError("Error signing up. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Set loading state to false after signup process completes
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const options = [
    {
      label: "Sign in",
      value: "Sign in",
      selectedBackgroundColor: "#1B4375",
      selectedFontColor: "#ffffff",
    },
    {
      label: "Sign up",
      value: "Sign up",
      selectedBackgroundColor: "#1B4375",
      selectedFontColor: "#ffffff",
    },
  ];

  const onChange = () => {
    navigate("/Signin");
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Sign up"
  );


  // Render loader if isLoading is true

  return (
    <div className="font-face-gm">
      {isLoading && <Loader />}
      <nav className="navbar-signin">
        <div className="navbar-logo-signin">
          <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
        </div>
      </nav>
      <div className="login-container">
        <div className="login-form">
          <div className="signin-switch">
            <SwitchSelector
              onChange={onChange}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#E5E5E5"}
              fontColor={"#000000"}
              selectedBackgroundColor={"#1B4375"}
              fontFamily="Poppins, sans-serif"
              fontSize={12}
              selectionIndicatorMargin={8}
              disabled={false}
              optionBorderRadius={30}
              wrapperBorderRadius={30}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <p className="signin-txt">Sign Up</p>
          <p className="no-account">
            If you have already registered. <span className="register-here" onClick={() => navigate("/signin")}>
              Click here!
            </span>
          </p>

          <form onSubmit={handleSignup}>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                marginBottom: "-5px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginRight: "1rem" }}>

                <label className="inpt-label">First Name</label>
                <div className="input-wrapper">
                  <label className="input-label" htmlFor="firstname">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                  </label>
                  <input
                    id="firstname"
                    className="input-field-style"
                    type="text"
                    name="firstName"
                    placeholder="Enter your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ margin: 0, marginTop: 0 }}>
                <label className="inpt-label">Last Name</label>
                <div className="input-wrapper">
                  <label className="input-label" htmlFor="lastname">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                  </label>
                  <input
                    id="lastname"
                    className="input-field-style"
                    type="text"
                    name="lastName"
                    placeholder="Enter your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>






            <label className="inpt-label">Email</label>
            <div className="input-wrapper">
              <label className="input-label" htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              </label>
              <input
                id="email"
                className="input-field-style"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>


            <label className="inpt-label">Password</label>
            <div className="input-wrapper">
              <label className="input-label" htmlFor="password">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
              </label>
              <input
                id="password"
                className="input-field-style"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className="frgt-pass">
              <div className="chkbox">
                <input
                  className="chkbox"
                  type="checkbox"
                  checked={isChecked}
                  name="lsRememberMe"
                  onChange={handleCheckboxChange}
                />

                <label className="inpt-label">
                  I agree to all the <span className="blue-txt">Terms </span> and <span className="blue-txt"> Privacy Policy </span>
                </label>
              </div>
            </div>

            <Button text={"Next"} onClick={handleSignup}></Button>
          </form>
        </div>
        <div className="login-image">
          <img
            src="./src/assets/images/login_page_image.png"
            alt="Login Image"
          />
        </div>
      </div>

    </div>
  );
};

export default Signup;
