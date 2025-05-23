// src/components/ui/input.jsx
import React from "react";

const Input = ({ type = "text", value, onChange, placeholder, className = "" }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
};

export { Input };
