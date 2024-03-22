import React, { useState } from "react";
import "./Signin.css";
import Button from "../../resources/Button/button";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import SwitchSelector from "react-switch-selector";
import Loader from "../../resources/Loader/loader";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Validate email
      if (!email || !email.includes("@")) {
        setEmailError("Please enter a valid email address");
        return;
      } else {
        setEmailError("");
      }
  
      // Validate password
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        return;
      } else {
        setPasswordError("");
      }
  
      setIsLoading(true);
  
      // Attempt sign-in
      await signInWithEmailAndPassword(auth, email, password);
  
      // Navigate on successful sign-in
      navigate("/createstream");
    } catch (error) {
      // Handle sign-in errors
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setPasswordError("Incorrect email or password");
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid credentials. Please check your email and password.");
      } else {
        console.error("Error logging in:", error.message);
        alert("An unexpected error occurred. Please try again later.");
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
    navigate('/Signup');
  };

  const initialSelectedIndex = options.findIndex(({ value }) => value === "Sign in");

  return (
   
    <div className="font-face-gm">
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
                selectionIndicatorMargin={6}
                disabled={false} />
            </div>
            <p className="signin-txt">Sign In</p>
            <p className="no-account">If you don’t have an account</p>
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
                required />
              {emailError && <p className="error-message">{emailError}</p>}

              <label className="label">Password</label>
              <input
                className="input-field-style"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              {passwordError && <p className="error-message">{passwordError}</p>}

              <div className="frgt-pass">
                <div className="chkbox">
                  <input
                    className="chkbox"
                    type="checkbox"
                    checked={isChecked}
                    name="lsRememberMe"
                    onChange={(e) => setIsChecked(e.target.checked)} />
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
            {isLoading && <Loader />} {/* Display loader if isLoading is true */}
          </div>
          <div className="login-image">
            <img src="./src/assets/images/login_page_image.png" alt="Login Image" />
          </div>
        </div>
      </div>
  );
};

export default Signin;
