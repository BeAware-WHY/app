<<<<<<< HEAD
import "./Signup.css";
import React from "react";
import "./Signup.css"; // Import CSS file for styling
import { useState } from "react";
=======
import React, { useState } from "react";
import "./Signup.css"; // Import CSS file for styling
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
import SwitchSelector from "react-switch-selector";
import { database, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../resources/Button/button";
import Loader from "../../resources/Loader/loader";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";


const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
=======
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthToken from "../../../constants/useAuthToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State for displaying error message
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
<<<<<<< HEAD
=======
  const [showPassword, setShowPassword] = useState(false);
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  const validateInputs = () => {
    if (firstName.trim() === "") {
<<<<<<< HEAD
      alert("Please enter your First Name");
=======
      setError("Please enter your First Name");
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
      return false;
    }

    if (lastName.trim() === "") {
<<<<<<< HEAD
      alert("Please enter your Last Name");
=======
      setError("Please enter your Last Name");
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
      return false;
    }

    if (!email || !email.includes("@")) {
<<<<<<< HEAD
      alert("Please enter a valid email address");
=======
      setError("Please enter a valid email address");
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
      return false;
    }

    if (password.length < 5) {
<<<<<<< HEAD
      alert("Password must be at least 6 characters long");
=======
      setError("Password must be at least 6 characters long");
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
      return false;
    }

    if (!isChecked) {
<<<<<<< HEAD
      alert("Please agree to the Terms and Privacy Policy");
=======
      setError("Please agree to the Terms and Privacy Policy");
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
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

<<<<<<< HEAD
      // Store user data in Firestore with user's UID as document ID
      //await setDoc(doc(database, "users", userCredential.user.uid), formData);

      await setDoc(doc(database, "users", userCredential.user.uid), formData)
        .then(() => {
          // User signed up and data stored successfully
          console.log("User signed up and data stored successfully");

          // Log in the user
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              // Login successful
              console.log("Login successful");

              navigate("/createstream");
            })
            .catch((error) => {
              console.error("Error logging in:", error);
            });
        })
        .catch((error) => {
          console.error("Error storing user data:", error);
        });
    } catch (error) {
      console.error("Error signing up:", error.message);
=======
      await setDoc(doc(database, "users", userCredential.user.uid), formData);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = res.user.stsTokenManager.accessToken;
      saveToken(accessToken);
      // Login successful
      // User signed up and data stored successfully
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
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
    } finally {
      setIsLoading(false); // Set loading state to false after signup process completes
    }
  };
<<<<<<< HEAD

=======
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
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
<<<<<<< HEAD

=======
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
      selectedBackgroundColor: "#1B4375",
      selectedFontColor: "#ffffff",
    },
  ];

  const onChange = () => {
<<<<<<< HEAD
    navigate('/Signin');
=======
    navigate("/CreateStream");
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Sign up"
  );

<<<<<<< HEAD
  // Render loader if isLoading is true
  if (isLoading) {
    return <div className="loader">{Loader}</div>;
  }

  return (
    <div className="font-face-gm">
       <nav className="navbar-signin">
        <div className="navbar-logo-signin">
          <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
        </div>
      </nav>
=======
  return (
    <div className="font-face-gm">
      {isLoading && <Loader />}
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
      <div className="login-container">
        <div className="login-form">
          <div className="switch">
            <SwitchSelector
              onChange={onChange}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#E5E5E5"}
              fontColor={"#000000"}
              selectedBackgroundColor={"#1B4375"}
              fontFamily="Poppins, sans-serif"
              selectionIndicatorMargin={6}
              disabled={false}
            />
          </div>
<<<<<<< HEAD
=======
          {error && <p className="error-message">{error}</p>}
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
          <p className="signin-txt">Sign Up</p>
          <p className="no-account">
            If you have already registered.
            <span className="register-here" onClick={() => navigate("/signin")}>
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
                <label className="label">First Name</label>
                <input
<<<<<<< HEAD
                  className="input-field-style"
=======
                  className="input-firstname"
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
                  type="text"
                  name="firstName"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></input>
              </div>
              <div style={{ margin: 0, marginTop: 0 }}>
                <label className="label">Last Name</label>

                <input
<<<<<<< HEAD
                  className="input-field-style"
=======
                  className="input-lastname"
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
                  type="text"
                  name="lastName"
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
              </div>
            </div>

            <label className="label">Email</label>

            <input
              className="input-field-style"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
<<<<<<< HEAD

            <label className="label">Password</label>

            <input
              className="input-field-style"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
=======
            

            <div>
            <label className="label">Password</label>
            </div>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
              <input
                className="input-field-style"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
            <div className="frgt-pass">
              <div className="chkbox">
                <input
                  className="chkbox"
                  type="checkbox"
                  checked={isChecked}
                  name="lsRememberMe"
                  onChange={handleCheckboxChange}
                />
                <label> I agree to all the Terms and Privacy Policy </label>
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
<<<<<<< HEAD
=======
     
>>>>>>> 9a60d3effa723b9c09f102f102b1a60bdd70d378
    </div>
  );
};

export default Signup;
