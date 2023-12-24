import React from 'react';

function Button({ text, onClick, className }) {
  return (
    <button onClick={onClick} className={`mx-2 ${className}`}>
      {text}
    </button>
  );
}

export default Button;