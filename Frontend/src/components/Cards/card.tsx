import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TrendData {
  name: string;
  uv: number;
}

interface CardProps {
  title: string;
  sales: number;
  percentage: number;
  trend: TrendData[];
}

const Card: React.FC<CardProps> = ({ title, sales, percentage, trend }) => {
  const arrowIcon = percentage > 0 ? faArrowUp : faArrowDown;

  return (
    <div className="bg-white shadow-2xl shadow-cyan-500/50 rounded-lg p-6 mt-4 md:mt-0 max-w-2xl "
         style={{
           backgroundImage: `url('/path/to/your/background-image.svg')`, // Replace with your SVG background image path
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FontAwesomeIcon icon={arrowIcon} className={percentage > 0 ? 'text-green-500' : 'text-red-500'} />
          <h2 className="ml-2 text-black font-extrabold text-lg">{title}</h2>
        </div>
        <div className="text-gray-500">...</div>
      </div>

      <div className="mt-4">
        <div className="text-black mr-4 font-bold text-2xl" style={{ marginRight: '14rem' , marginBottom:'1rem'}}>
          ${sales.toLocaleString()}
        </div>
        <div className={`flex items-center mt-1 ${percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
          <FontAwesomeIcon icon={arrowIcon} className="mr-1" />
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
        </div>
        <p className="text-gray-500 mt-2">Sales</p>
      </div>

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
