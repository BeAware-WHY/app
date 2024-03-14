import React, { useState } from "react";
import "./forgetpass.css"; // Assuming you have a CSS file for styling
import Button from "../../resources/Button/button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitWithValidations = () => {
  // Basic validation for Email
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  console.log("Sending password reset email to:", email);

  sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsSubmitted(true);
      console.log("Password reset email sent successfully");
      navigate("/forgetpasswordnext"); // Navigate to the next screen
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error);
    });
};

  const options = [
    {
      label: "Reset Password",
      value: "Reset Password",
      selectedBackgroundColor: "#1B4375",
      selectedFontColor: "#ffffff",
    },
  ];

  const onChange = (newValue) => {
    console.log(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Reset Password"
  );

  return (
    <div className="font-face-gmforget">
      <div className="login-containerforget">
        <div className="login-formforget">
   
          <p className="signin-txtforget">Reset Password</p>
          <p className="no-accountforget">
            Type in your registered email to reset your password
          </p>
          <form onSubmit={handleSubmitWithValidations}>
            <label className="labelforget">Email</label>
            <input
              className="input-field-style"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Button
              text={"Next"}
              onClick={handleSubmitWithValidations}
            />
            <div className="bll">
  <label className="label-back-to-login">Back to Login</label>
</div>
          </form>
          {isSubmitted && (
            <p>
              Password reset email sent! Please check your email for further
              instructions.
            </p>
          )}
        </div>
        <div className="login-imageforget">
          <img
            src="./src/assets/images/forgetpass_image.png"
            alt="Login Image"
          />
        </div>
      </div>
    </div>
    
  );
};

export default ForgetPassword;