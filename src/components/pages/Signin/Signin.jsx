import React, { useState } from "react";
import "./Signin.css";
import Button from "../../resources/Button/button";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import SwitchSelector from "react-switch-selector";
import Loader from "../../resources/Loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state to true

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

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = res.user.stsTokenManager.accessToken;
      saveToken(accessToken);
      // Login successful
      navigate("/Dashboard");
      window.location.reload();
      // Handle other logic based on the response
    } catch (error) {
      // Handle login error
      if (error.code === "auth/wrong-password") {
        alert("Incorrect email or password");
      } else {
        console.log("58------", error);
        alert("Error logging in:", error.message);
      }
    } finally {
      setIsLoading(false); // Set loading state to false
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
    navigate('/Signup');
  };

  const initialSelectedIndex = options.findIndex(({ value }) => value === "Sign in");

  return (
    <div className="font-face-gm">
      {isLoading && <Loader />} {/* Display loader if isLoading is true */}
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
          <p className="signin-txt">Sign In</p>
          <p className="no-account">If you don’t have an account register</p>
          <div className="text">
            You can{" "}
            <span
              className="register-here"
              onClick={() => (window.location.href = "/signup")}
            >
              Register here!
            </span>
          </div>
          <form onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              className="input-field-style"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
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
            {passwordError && <p className="error-message">{passwordError}</p>}

            <div className="frgt-pass">
              <div className="chkbox">
                <input
                  className="chkbox"
                  type="checkbox"
                  checked={isChecked}
                  name="lsRememberMe"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label>Remember me</label>
              </div>
              <label
                className="register-here"
                style={{ fontFamily: "Poppins, sans-serif" }}
                onClick={() => (window.location = "/forgetpassword")}
              >
                Forget Password
              </label>
            </div>

            <Button text={"Login"} onClick={handleLogin} />
          </form>
        </div>
        <div className="login-image">
          <img src="./src/assets/images/login_page_image.png" alt="Login Image" />
        </div>
      </div>
    </div>
  );
};

export default Signin;

