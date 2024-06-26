// App.jsx
'use client';
import React from 'react';
import SearchBox from '../SearchBox/SearchBox'; // Import your SearchBox component
import Card from './card'; // Import your Card component
import Logo from '../SearchBox/logo'; // Import your Logo component

const App = () => {
  const cardsData = [
    { 
      title: 'Acme Plus', 
      sales: 24780, 
      percentage: 49, 
      trend: [
        { name: 'Jan', uv: 400 },
        { name: 'Feb', uv: 300 },
        { name: 'Mar', uv: 200 },
        { name: 'Apr', uv: 278 },
        { name: 'May', uv: 189 },
      ]
    },
    { 
      title: 'Acme Advanced', 
      sales: 17489, 
      percentage: -14, 
      trend: [
        { name: 'Jan', uv: 300 },
        { name: 'Feb', uv: 400 },
        { name: 'Mar', uv: 250 },
        { name: 'Apr', uv: 300 },
        { name: 'May', uv: 200 },
      ]
    },
    { 
      title: 'Acme Professional', 
      sales: 9962, 
      percentage: 49, 
      trend: [
        { name: 'Jan', uv: 200 },
        { name: 'Feb', uv: 150 },
        { name: 'Mar', uv: 300 },
        { name: 'Apr', uv: 278 },
        { name: 'May', uv: 400 },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Logo /> {/* Display your logo component */}
      <SearchBox /> {/* Display your search box component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            sales={card.sales}
            percentage={card.percentage}
            trend={card.trend}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
