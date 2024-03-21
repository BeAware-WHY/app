import React from "react";
import "../Header/header.css";

const Header = () => {
  return (
    <div className="app-container">
      <header className="header">
        <img
          src="./src/assets/images/beaware-logo.png"
          alt="Blog Logo"
          className="logoimg"
        />
      </header>
    </div>
  );
};

export default Header;

/*

 <nav>
          <ul>
            <li>Home</li>
            <li>Technology</li>
            <li>Travel</li>
            <li>Lifestyle</li>
          </ul>
        </nav>

*/
