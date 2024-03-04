import React from 'react';

const ForgetPasswordReview = () => {
  return (
    <div>
      <div className="card">
        <div className="container">
          <label><strong>Reset your password</strong></label>
          <label>Type in your registered email to reset your password</label>
          <label>Email</label>
          <input
            id="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            placeholder="Enter your Email"
            className="placeicon"
            type="text"
          />
          <br />
          <input
            id="submit"
            type="submit"
            value="Submit"
            onClick={() => window.location.href = "forgetpasswordreview.html"}
          />
        </div>
      </div>
      <img src="pic_img.png" alt="Image" className="icon" />
    </div>
  );
}

export default ForgetPasswordReview;

