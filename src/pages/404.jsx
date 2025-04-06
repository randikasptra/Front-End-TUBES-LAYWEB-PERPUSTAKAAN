import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
      <h1 className="text-7xl font-bold text-red-600 mb-4">Oops!</h1>
      <h2 className="text-3xl font-semibold text-red-800 mb-2">Something went wrong</h2>
      <p className="text-lg text-red-700 mb-6">
        The page you're looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
