import React from 'react';

const ForgetPassword = () => {
  const redirectToForgetPasswordReview = () => {
    window.location.href = "forgetpasswordreview.html";
  };

  const validateEmail = () => {
    var emailInput = document.getElementById('email');
    var email = emailInput.value;
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!pattern.test(email)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return false;
    }

    // Continue with form submission or other actions
    return true;
  };

  return (
    <html>
      <head>
        <title>Icon inside Input Field - Demo Preview</title>
        <meta content="noindex, nofollow" name="robots" />
        <link href="forgetpass.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="card">
          <div className="container">
            <label><strong>Reset your password</strong></label>
            <label>Type in your registered email to reset your password</label>
            <label>Email</label>
            <input id="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" placeholder="Enter your Email" className="placeicon" type="text" />
            <br />
            <input id="submit" type="submit" value="Submit" onClick={redirectToForgetPasswordReview} />
          </div>
        </div>
        <img src="pic_img.png" alt="Image" className="icon" />
      </body>
    </html>
  );
}

export default ForgetPassword;
