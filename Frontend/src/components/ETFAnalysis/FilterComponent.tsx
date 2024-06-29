import React, { useEffect, useState } from 'react';
import EtfDetails from './EtfDetails';
import { etfsDetails } from '../../services/BackendAPIs/ETFs_API';
const FilterComponent = ({ onFilterChange, onSortChange }) => {

  const [selectedSectors, setSelectedSectors] = useState([]);
  const [sortField,setSortField] = useState('');
  const [filter,setFilter] = useState({etfname:'', startDate:'',endDate:'',location:'',page:1})
  const [isFilterChanged,setIsFilterChanged] = useState(false)
  const [error, setError] = useState('null');

  useEffect(() =>{
    if(isFilterChanged){
      etfsDetails(filter)
      .then((data)=>{
console.log(data);

}).catch((err)=>{
  setError("An error occurred while fetching ETF data. Please try again later.");
  console.log(err);
  alert(error)
        
      }).finally(()=>{
        setIsFilterChanged(false)
      })
    }
  },[isFilterChanged])
  function handleFilterChange(key, value) {
    setFilter({ ...filter, [key]: String(value) });
    setIsFilterChanged(true)
}



  const sectors = [
    'Information Technology',
    'Health',
    'Industrials',
    'Financials',
    // Add more sector options here
  ];


   
 

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
        <select id="location" value={filter.location} onChange={(e)=>{
            handleFilterChange("location",e.target.value);
        }}>
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
                onChange={(e)=>{
                  handleFilterChange("location",e.target.value);
              }}
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
          value={filter.startDate}
          onChange={(e)=>{
            handleFilterChange("startDate",e.target.value);
        }}
        />
      </div>
      <div className="filter-item">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={filter.endDate}
          onChange={(e)=>{
            handleFilterChange("endDate",e.target.value);
        }}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
