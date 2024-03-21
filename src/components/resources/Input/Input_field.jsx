import React from "react";
import './Input_field.css'

const InputField = ({ type, placeholder, name, value }) => {
    return (
      <input
        className="input-field-style"
        type={type}
        name={name} // Pass down the 'name' prop
        value={value}
        placeholder={placeholder}
      />
    );
  };
  

export default InputField;


/*
import React from 'react';

const InputField = ({ label, type, placeholder, value, onChange }) => {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}

export default InputField;
*/