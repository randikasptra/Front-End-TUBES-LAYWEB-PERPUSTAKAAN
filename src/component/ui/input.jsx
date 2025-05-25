// src/components/ui/input.jsx
import React from "react";

const Input = ({ className = "", ...rest }) => {
    return (
        <input
            {...rest}
            className={`px-4 py-2 bg-slate-700 text-white border border-slate-500 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
};


export { Input };
