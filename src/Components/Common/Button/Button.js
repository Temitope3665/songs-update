import React from 'react';

const Button = ({name, onClick, btnClass}) => {

  return (
    <div>
        <button className={btnClass} onClick={onClick}>{name}</button>
    </div>
  )
}

export default Button;
