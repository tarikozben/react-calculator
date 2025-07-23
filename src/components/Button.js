import React from 'react';
import './Button.css';

const Button = ({ onClick, className = '', children, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`calculator-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;