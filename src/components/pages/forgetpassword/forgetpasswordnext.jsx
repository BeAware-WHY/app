
import Button from "../../resources/Button/button";
import "./forgetpass.css";
import { useNavigate } from "react-router-dom";

const forgetpasswordreview = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Handle next functionality
    navigate("/forgetpassword");
    console.log("Next clicked");
    // Perform validation and other logic here
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
          <p className="frgt-pass-review-txt">Reset your password !</p>
          <p className="frgt-pass-no-account" style={{ paddingBottom: "60px" }}>
            Type in your registered email to reset<br />
            your password
          </p>
          <form>
            {/* <label className="label">Password</label>
            <InputField
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}

            <Button text="RESEND EMAIL" onClick={handleNext} />

            <p style={{ paddingBottom: "20px" }}></p>

            <Button text="BACK TO LOGIN" onClick={() => navigate("/signin")} />
            <p style={{ paddingBottom: "40px" }}></p>
            <p className="frgt-pass-review-label"></p>
            <div className="frgt-pass-review-label">
              <span>Terms and Conditions &bull;</span>
              <span>&nbsp;Privacy Policy &bull;</span>
              <span>&nbsp;Contact Us</span>
            </div>

          </form>
          <h1></h1>
          <h1></h1>
        </div>
        <div className="frgt-pass-image">
          <img src="./src/assets/images/frgt_pass_img.png" alt="Login Image" />
          <p className="frgt-pass-review-see-you-soon-txt">See you soon!</p>
        </div>

      </div>

    </div>
  );
};

export default forgetpasswordreview;
