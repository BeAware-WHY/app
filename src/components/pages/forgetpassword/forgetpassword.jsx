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
      <div className="login-container">
        <div className="login-form">
          <p className="signin-txt">Forget your Password</p>
          <p className="no-account">
            Type in your registered email to reset your password
          </p>
          <form>
            <label className="label">Email</label>
            <InputField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="text">
              <text
                className="register-here"
                onClick={() => (window.location.href = "/forgetpasswordreview")}
              >
                Next
              </text>
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
