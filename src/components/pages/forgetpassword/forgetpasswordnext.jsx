
import Button from "../../resources/Button/button";

const forgetpasswordnext = () => {

  const handleNext = () => {
    // Handle next functionality
    console.log("Next clicked");
    // Perform validation and other logic here
  };

  return (
    <div className="font-face-gmforget">
      <div className="login-containerforget">
        <div className="login-formforget">
          <p className="signin-txtforget">Recovery Email Sent !</p>
          <h1></h1>
          <p className="no-accountforget">Please check your email for next steps to reset your password</p>
          <h1></h1>
          <form>          
            {/* <label className="label">Password</label>
            <InputField
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}

            <Button text="CONTACT SUPPORT" onClick={handleNext} />
            <h1></h1>
            
            <Button text="BACK TO LOGIN"  onClick={() => window.location.href='/signup'} />
          </form>
          <h1></h1>
          <h1></h1>
        </div>
        <div className="login-imageforget">
          <img
            src="./src/assets/images/login_page_image.png"
            alt="Login Image"
          />
        </div>
      </div>
    </div>
  );
};

export default forgetpasswordnext;
