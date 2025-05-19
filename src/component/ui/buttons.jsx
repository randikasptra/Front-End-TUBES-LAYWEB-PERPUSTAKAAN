import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition ${className}`}
    >
      {children}
    </button>
  );
};
