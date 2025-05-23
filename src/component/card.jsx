// src/components/ui/card.jsx
import React from "react";

const Card = ({ children, className = "" }) => {
    return (
        <div className={`rounded-2xl shadow-md bg-white p-4 ${className}`}>
            {children}
        </div>
    );
};

export { Card };
