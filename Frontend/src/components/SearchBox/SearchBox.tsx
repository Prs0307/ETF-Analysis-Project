'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Call API or perform search logic here
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-3xl mx-auto mt-8 mb-16">
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an ETF"
          className="w-full pl-12 pr-4 py-3 text-lg text-gray-800 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="ml-3 px-6 py-3 text-lg text-black bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition duration-300 ease-in-out"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
