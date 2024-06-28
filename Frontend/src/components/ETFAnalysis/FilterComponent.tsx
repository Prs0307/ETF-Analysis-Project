import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange, onSortChange }) => {
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [sortField, setSortField] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const sectors = [
    'Information Technology',
    'Health',
    'Industrials',
    'Financials',
    // Add more sector options here
  ];

  const handleFilterChange = () => {
    onFilterChange({ location: locationFilter, sectors: selectedSectors }); // Update parent on filter change
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
    handleFilterChange(); // Trigger filter update on location change
  };

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    const updatedSectors = selectedSectors.includes(selectedSector)
      ? selectedSectors.filter((sector) => sector !== selectedSector) // Remove if already selected
      : [...selectedSectors, selectedSector]; // Add if not selected
    setSelectedSectors(updatedSectors);
    handleFilterChange(); // Trigger filter update on sector change
  };

  const handleSortChange = (event) => {
    setSortField(event.target.value);
    onSortChange(event.target.value); // Update parent on sort change
  };

  const handleDateChange = (event, dateType) => { // Reusable function for date pickers
    if (dateType === 'start') {
      setStartDate(event.target.value);
    } else if (dateType === 'end') {
      setEndDate(event.target.value);
    }
    // You might want to add validation or processing here
  };

  return (
    <div className="filter-container grid grid-cols-5 gap-4"> {/* Use CSS grid for layout */}
      <div className="filter-item">
        <label htmlFor="location">Location:</label>
        <select id="location" value={locationFilter} onChange={handleLocationChange}>
          <option value="">All</option>
          <option value="USA">USA</option>
          {/* Add more location options here */}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="sectors">Sector:</label>
        <ul className="sectors-list">
          {sectors.map((sector) => (
            <li key={sector}>
              <input
                type="checkbox"
                id={`sector-${sector}`}
                value={sector}
                checked={selectedSectors.includes(sector)}
                onChange={handleSectorChange}
              />
              <label htmlFor={`sector-${sector}`}>{sector}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-item">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortField} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="shares">Shares</option>
          <option value="marketValue">Market Value</option>
          <option value="assetClass">Asset Class</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => handleDateChange(event, 'start')}
        />
      </div>
      <div className="filter-item">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => handleDateChange(event, 'end')}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
