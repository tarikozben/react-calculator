import React from 'react';
import './Display.css';

const Display = ({ display, calculation }) => {
  return (
    <div className="display">
      {calculation && (
        <div className="calculation">
          {calculation}
        </div>
      )}
      <div className="current-value">
        {display}
      </div>
    </div>
  );
};

export default Display;