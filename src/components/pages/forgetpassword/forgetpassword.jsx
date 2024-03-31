import React, { useState } from "react";
import "./forgetpass.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email field cannot be empty");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      try {
        await sendPasswordResetEmail(auth, email);
        setError("");
        navigate("/forgetpasswordreview");
      } catch (error) {
        setError("Error resetting password. Please try again.");
      }
    }
  };

  return (
    <div className="frgt-pass-font-face-gm">
      <nav className="frgt-pass-navbar-signin">
        <div className="navbar-logo-signin">
          <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
        </div>
      </nav>
      <div className="frgt-pass-container">
        <div className="frgt-pass-form">
          <p className="frgt-pass-txt">Reset your password</p>
          <p className="frgt-pass-no-account" style={{ paddingBottom: error ? "0px" : "60px" }}>
            Type in your registered email to reset<br />
            your password
          </p>
          {error && <p style={{ color: "red", fontSize: "x-small", paddingBottom: "60px" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className="frgt-pass-inpt-label">Email</label>
            <div className="input-wrapper">
              <label className="frgt-pass-inpt-label" htmlFor="email">
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

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                style={{
                  border: "none",
                  borderRadius: "30px",
                  backgroundColor: "#1B4375",
                  color: "white",
                  marginBottom: "100px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontFamily: "Poppins, sans-serif",
                  transitionDuration: "0.4s",
                  cursor: "pointer",
                  padding: "4px 60px",
                }}
                type="submit" // Change to submit button
              >
                Next
                <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "10px", height: "12px" }} />
              </button>
            </div>
          </form>
        </div>
        <div className="frgt-pass-image">
          <img src="./src/assets/images/frgt_pass_img.png" alt="Login Image" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
