'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Define the type for trend data used in the LineChart
interface TrendData {
  name: string;
  uv: number;
}

// Define props interface for Card component
interface CardProps {
  title: string;         // Title of the card
  sales: number;         // Total sales amount
  percentage: number;    // Percentage change in sales
  trend: TrendData[];    // Array of data points for trend line chart
}

// Functional component representing a Card with sales information and trend chart
const Card: React.FC<CardProps> = ({ title, sales, percentage, trend }) => {
  // Determine the arrow icon based on percentage change
  const arrowIcon = percentage > 0? faArrowUp : faArrowDown;

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 mt-card"
      style={{
        backgroundImage: `url('background-image.svg')`, // Add background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header section with title and icon */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FontAwesomeIcon icon={arrowIcon} className={percentage > 0? 'text-green-500' : 'text-red-500'} />
          <h2 className="ml-2 text-black font-extrabold text-[20px]">{title}</h2>
        </div>
        <div className="text-gray-500">...</div> {/* Placeholder for additional actions */}
      </div>

      {/* Sales information section */}
      <div className="mt-4">
        <div className="text-black font-bold text-[25px]">${sales.toLocaleString()}</div> {/* Formatted sales amount */}
        <div className={`flex items-center mt-1 ${percentage > 0? 'text-green-500' : 'text-red-500'}`}>
          <FontAwesomeIcon icon={arrowIcon} className="mr-1" />
          {percentage > 0? `+${percentage}%` : `${percentage}%`} {/* Display percentage change */}
        </div>
        <p className="text-gray-500 mt-2">Sales</p> {/* Sales label */}
      </div>

      {/* Trend chart section - hidden on mobile screens */}
      <div className="mt-4 hidden md:block">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={trend}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Card;