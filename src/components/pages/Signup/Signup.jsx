// eslint-disable-next-line no-unused-vars
import React from "react";
import "./../../../assets/css/style.css"; // Import CSS file for styling
import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import { database, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../resources/Button/button";
import Loader from "../../resources/Loader/loader";

const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  const validateInputs = () => {
    if (firstName.trim() === "") {
      alert("Please enter your First Name");
      return false;
    }

    if (lastName.trim() === "") {
      alert("Please enter your Last Name");
      return false;
    }

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }

    if (password.length < 5) {
      alert("Password must be at least 6 characters long");
      return false;
    }

    if (!isChecked) {
      alert("Please agree to the Terms and Privacy Policy");
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
    } finally {
      setIsLoading(false); // Set loading state to false after signup process completes
    }
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

  const onChange = (newValue) => {
    console.log(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Sign up"
  );

  // Render loader if isLoading is true
  if (isLoading) {
    return <div className="loader">{Loader}</div>;
  }

  return (
    <div className="font-face-gm">
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
              forcedSelectedIndex={1}
            />
          </div>
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
                  className="input-field-style"
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
                  className="input-field-style"
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
    </div>
  );
};

export default Signup;
