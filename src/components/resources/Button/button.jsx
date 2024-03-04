// Button.js
import React from 'react';
import './Button.css'; // Import CSS for styling and animation

const Button = ({ text, onClick }) => {
  return (
    <div className='font-face-gm'>
    <button className="rounded-button" onClick={onClick}>
      {text}
    </button>
    </div>
  );
}

export default Button;
