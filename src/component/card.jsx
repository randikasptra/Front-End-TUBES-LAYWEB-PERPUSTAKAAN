// src/component/card.jsx
import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg p-4 shadow ${className}`}>
      {children}
    </div>
  );
};

export { Card };
