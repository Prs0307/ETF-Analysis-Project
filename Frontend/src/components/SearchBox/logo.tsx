'use client';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg" // corrected xmlns
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17L6 12L7.41 10.59L11 14.17L16.59 8.59L18 10L11 17Z"
          fill="#3498db"
        />
      </svg>
      <span className="text-2xl font-bold text-gray-800">CompanyName</span>
    </div>
  );
};

export default Logo;