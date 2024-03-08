

import "./Signup.css";


import React from "react";
import "./Signup.css"; // Import CSS file for styling
import InputField from "../../resources/Input/input_field";
import { useState } from "react";
import SwitchSelector from "react-switch-selector";

import { database } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const Signup = () => {
 
  const history = useNavigate();
 
  const handleSubmit = (e) => {

    const email = e.target.email.value
    const password = e.target.email.value

    
    createUserWithEmailAndPassword(database, email, password).then(data=>{
      console.log(data, "authData");
      console.log("Login clicked");
      
      history("/signin")
    }) 

    console.log("Login clicked");
  };

  const onBtnClick = () => {
    <Link to="/signin"></Link>
  }

  const [isChecked, setIsChecked] = useState(() => false);

  const options = [
    {
      label: "Signin",
      value: "Signin",

      selectedBackgroundColor: "#1B4375",
      selectedFontColor: "#ffffff",
    },
    {
      label: "Signup",

      value: {
        Signup: true,
      },

      selectedBackgroundColor: "#1B4375",
      selectedFontColor: "#ffffff",
    },
  ];

  const onChange = (newValue) => {
    console.log(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Signup"
  );

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
              selectionIndicatorMargin={5}
            />
          </div>
          <p className="signin-txt">Sign Up</p>
          <p className="no-account">
            If you have already registered.
            <span
              className="register-here"
              onClick={() => (window.location.href = "/signin")}
            >
              {" "}
              Click here!
            </span>
          </p>

          <form onSubmit={(e)=>handleSubmit(e)}>

            <div style={{ display: "flex", marginTop:"10px",  marginBottom: "-5px", justifyContent:"space-between"   }}>
              <div style={{ marginRight: "1rem" }}>
                <label className="label">First Name</label>    
                <input className="input-field-style" type="text" placeholder="Enter your First Name"/> 
              </div>
              <div style={{margin: 0, marginTop:0}}>
                <label className="label">Last Name</label>
               
                <input className="input-field-style" type="text" placeholder="Enter your Last Name"/> 
              </div>
            </div>

            <label className="label">Email</label>
           
            
            <input className="input-field-style" type="email" placeholder="Enter your email address"/> 

            <label className="label">Password</label>
           
            <input className="input-field-style" type="password" placeholder="Enter your password"/> 

            <div className="frgt-pass">
              <div className="chkbox">
                <input
                  className="chkbox"
                  type="checkbox"
                  checked={isChecked}
                  name="lsRememberMe"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label> I agree to all the Terms and Privacy Policy </label>
              </div>
              <label style={{ fontFamily: "Poppins, sans-serif" }}>
                Forget Password
              </label>
            </div>

           

           
    <button  className="rounded-button" onSubmit={onBtnClick} >Next</button>
    

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
