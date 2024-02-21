import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <div className="container">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div className="header">
              <div className="text"> Sign Up</div>
              <div className="underline"></div>
            </div>

            <p> If you don't have an account </p>
            <p>
              You can <span class="register-color">Register here !</span>{" "}
            </p>

            <p for="email">Email</p>
            <div className="input">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
              ></input>
            </div>

            <p for="password">Password</p>
            <div className="input">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              ></input>
            </div>
            <div className="forgot-password"> Forgot Password? </div>
            <h3></h3>

            <button class="login-button">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup
