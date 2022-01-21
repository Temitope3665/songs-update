import React from 'react';
import './Input.css'

function Input({placeholder, type, label, value, onChange, inputName}) {
  return (
    <div>
        <label className='label'>
            {label}
            <input className='input-styles' placeholder={placeholder} type={type} value={value} onChange={onChange} 
            name={inputName} />
        </label>
    </div>
  );
}

export default Input;
