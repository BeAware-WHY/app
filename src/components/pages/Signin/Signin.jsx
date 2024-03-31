import React, { useState } from "react";
import "./Signin.css";
import Button from "../../resources/Button/button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import SwitchSelector from "react-switch-selector";
import Loader from "../../resources/Loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useAuthToken from "../../../constants/useAuthToken";

const Signin = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuthToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
     // Basic validation for Email and Password
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      setIsLoading(false);
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    const res = await signInWithEmailAndPassword(auth, email, password);
    const accessToken = res.user.stsTokenManager.accessToken;
    saveToken(accessToken);
    // Login successful
    navigate("/Dashboard");
    window.location.reload();
    } catch (error) {
      // Handle sign-in errors
      if (error.code === "auth/wrong-password") {
        alert("Incorrect email or password");
      } else {
        console.log("58------", error);
        alert("Error logging in:", error.message);
      }
    } finally {
      setIsLoading(false);
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

  const onChange = () => {
    navigate("/Signup");
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Sign in"
  );

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
          <p className="signin-txt">Sign In</p>
          <p className="no-account">If you don’t have an account</p>
          <div className="register-here-text">
            You can{" "}
            <span
              className="register-here"
              onClick={() => (window.location.href = "/signup")}
            >
              Register here!
            </span>
          </div>
          <form onSubmit={handleLogin}>
            {emailError && <p className="error-message">{emailError}</p>}
            {passwordError && <p className="error-message">{passwordError}</p>}

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
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label className="inpt-label">Remember me</label>
              </div>
              <label
                className="inpt-label"
                onClick={() => navigate("/forgetpassword")}
              >
                Forget Password?
              </label>
            </div>

            <Button text={"Login"} onClick={handleLogin} />
          </form>
          {isLoading && <Loader />} {/* Display loader if isLoading is true */}
        </div>
        <h4></h4>
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

export default Signin;
