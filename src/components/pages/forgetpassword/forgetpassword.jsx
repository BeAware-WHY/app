import React, { useState } from "react";
import InputField from "../../resources/Input/input_field";
import Button from "../../resources/Button/button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");



  return (
    <div className="font-face-gm">
      <div className="login-container">
        <div className="login-form">
          <p className="signin-txt">Forget your Password</p>
          <p className="no-account">Type in your registered email to reset your password</p>
          <form>
            <label className="label">Email</label>
            <InputField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
         <Button text="Next" onClick={()=> window.location.href='/forgetpasswordnext'} />

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
