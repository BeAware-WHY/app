import "./Signup.css";
import React from "react";
import "./Signup.css"; // Import CSS file for styling
import InputField from "../../resources/Input/input_field";
import Button from "../../resources/Button/button";
import { useState } from "react";
import SwitchSelector from "react-switch-selector";

const Signup = () => {
  const handleLogin = () => {
    // Handle login functionality
    console.log("Login clicked");
  };

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

          <form>

            <div style={{ display: "flex", marginTop:"10px",  marginBottom: "-5px", justifyContent:"space-between"   }}>
              <div style={{ marginRight: "1rem" }}>
                <label className="label">First Name</label>
                <InputField type="text" placeholder="Enter your First Name" />
              </div>
              <div style={{margin: 0, marginTop:0}}>
                <label className="label">Last Name</label>
                <InputField type="text" placeholder="Enter your Last Name" />
              </div>
            </div>

            <label className="label">Email</label>
            <InputField type="email" placeholder="Enter your email address" />

            <div style={{ display: "flex", justifyContent:"space-between"   }}>
              <div style={{ marginRight: "1rem" }}>
                <label className="label">Country</label>
                <InputField type="text" placeholder="Select country" />
              </div>
              <div>
                <label className="label">Phone</label>
                <InputField type="text" placeholder="Enter phone number" />
              </div>
            </div>

            <label className="label">Password</label>
            <InputField type="password" placeholder="Enter your password" />

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

           

           
    <button  className="rounded-button">Next</button>
    

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
