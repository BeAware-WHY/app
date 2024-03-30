import React, { useState } from "react";

import "./forgetpass.css";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";



const ForgetPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  return (
    <div className="font-face-gm">
       <nav className="navbar-signin">
        <div className="navbar-logo-signin">
          <img src="./src/assets/images/logo-white.png" alt="Company Logo" />
        </div>
      </nav>
      <div className="login-container">
        <div className="login-form">
          <p className="signin-txt">Reset your Password</p>
          <p className="no-account">
            Type in your registered email to reset your password
          </p>
          <p className="no-account" style={{ fontFamily: 'Poppins, sans-serif', marginTop: '0px', fontSize: 'small', marginBottom: '80px' }}>
           your password
          </p>
          <form>
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

           

            <button
              style={{
                border: "none",
                borderRadius: "30px",
                backgroundColor: "#1B4375",
                color: "white",
                padding: "0px 0px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                fontFamily: "Poppins, sans-serif",
                transitionDuration: "0.4s",
                cursor: "pointer",
                width: "100%",
                height: "30px", 
                marginRight:"10px",
                marginLeft:"10px",
                  
              }}
            >            
              <text
                onClick={() => {
                  navigate("/forgetpasswordreview");
                }}
              >
                Next
              </text>
              <FontAwesomeIcon icon={faArrowRight} className="input-icon" />
            </button>

            

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

export default ForgetPassword;
