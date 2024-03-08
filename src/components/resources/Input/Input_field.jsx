import React from "react";
import './Input_field.css'

const InputField = ({label,type,placeholder, value, onChange}) => {
    return (
        <div className="input">
            
            <input 
                className="input-field-style"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}            
            /> 
            

        </div>
    );
}

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