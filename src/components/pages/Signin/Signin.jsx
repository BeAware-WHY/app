import React from "react";
import "./Signin.css"; // Import CSS file for styling
import InputField from "../../resources/Input/input_field";
import Button from "../../resources/Button/button";
import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import { database } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth"


 // Import Firebase configuration

  

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await UserAuthContextProvider.l(email, password);
      // Login successful, handle redirection or other actions
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
    }
  };

  

  const [isChecked, setIsChecked] = useState(() => false);

  const options = [
    {
        label: "Sign in",
        value: {
             Login: true
        },
        selectedBackgroundColor: "#1B4375",
        selectedFontColor: "#ffffff"
    },
    {
        label: "Sign up",
        value: "Sign up",
        
        selectedBackgroundColor: "#1B4375",
        selectedFontColor:"#ffffff"
    }
 ];
 
 const onChange = (newValue) => {
     console.log(newValue);
 };
 
 const initialSelectedIndex = options.findIndex(({value}) => value === "Login");

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
            fontColor= {"#000000"}
            selectedBackgroundColor={"#1B4375"}
            fontFamily= "Poppins, sans-serif"
            selectionIndicatorMargin={5}   
            disabled = {false}
            forcedSelectedIndex={0} 
            

        />
    </div>
          <p className="signin-txt">Sign In</p>
          <p className="no-account">If you don’t have an account register</p>
          <div className="text">
            You can <span className="register-here" onClick={() => window.location.href='/signup'} >Register here!</span>
          </div>
          <form>
            <label className="label">Email</label>
            <InputField type="email" placeholder="Enter your email address" />
            <label className="label">Password</label>
            <InputField type="password" placeholder="Enter your password" />

            <div className="frgt-pass">
              <div className="chkbox"><input
                className="chkbox"
                type="checkbox"
                checked={isChecked}
                name="lsRememberMe"
                onChange={(e) => setIsChecked(e.target.checked)}
                
              />
              <label>Remember me</label>
              </div>
              <label style={{ fontFamily: 'Poppins, sans-serif' }} onClick={()=> window.location='/forgetpassword'}>Forget Password</label>
            </div>
            

            <Button text="Login" onClick={handleLogin} />
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

export default Signin;
