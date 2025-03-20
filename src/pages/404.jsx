import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mb-2 text-5xl text-red-500" />
            <p className="text-lg text-red-500">Oops! Something went wrong.</p>
            <p className="text-gray-400">Please try again later.</p>
        </div>
    );
};

export default Error;
