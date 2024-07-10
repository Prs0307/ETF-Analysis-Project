import React, { useEffect, useState } from 'react';
import EtfDetails from './EtfDetails';
import { etfsDetails } from '../../services/BackendAPIs/ETFs_API';
import { etfsSectors } from '../../services/BackendAPIs/ETFs_API';
const FilterComponent = ({ data, setTableData }) => {
  const [currentPage,setCurrentPage]=useState(1);
  const [sortField,setSortField] = useState('');
  const [filter,setFilter] = useState({etfname:'',sector:'', startDate:'',endDate:'',page:currentPage})
  const [isFilterChanged,setIsFilterChanged] = useState(true)
  const [error, setError] = useState('null');
  const [sectors,setSectors]=useState([])
  const [selectedSector, setSelectedSector] = useState('');
  const [isSectorChanged, setIsSectorChanged] = useState(false);
  const handleRadioChange = (event) => {
    // const { checked, value } = event.target;
    setSelectedSector(event.target.value);
    setIsSectorChanged(true);
    setFilter({...filter, sector: event.target.value});
    setIsFilterChanged(true);
    console.log(selectedSector);
  }

  useEffect(()=>{

    etfsSectors()
    .then((data)=>{
      if(data.sector)
        {
          
      setSectors(data.sector.slice(0, 3));

        }
      console.log(data)
    })
    .catch((err)=>{
      setError("An error occurred while fetching ETF data. Please try again later.");
      console.log(err);
      alert(error)
  })
  },[])

  
  useEffect(() =>{
    if(isFilterChanged){
      etfsDetails(filter)
      .then((data)=>{
        console.log(data);
        if(data)
        setTableData(data);

console.log(data);

}).catch((err)=>{
  setError("An error occurred while fetching ETF data. Please try again later.");
  console.log(err);
  alert(error)
        
      }).finally(()=>{
        setIsFilterChanged(false)

      })
    
}},[isFilterChanged])
  function handleFilterChange(key, value) {
    setFilter({ ...filter, [key]: String(value) });
    setIsFilterChanged(true)
}


const [rowsPerPage, setRowsPerPage] = useState(20);
function onHandlePrev(e){
  console.log("Previous Table\n");
  if (currentPage>1) {
    
    setCurrentPage(currentPage-1)
  }else
  alert("You are on first page\n");
}
function onHandleNext(e){
  console.log("Next data clickes Table\n");
  const totalPages=data["total_pages"]
  
  if (currentPage<totalPages) {
    
  setCurrentPage(currentPage+1)
  setIsFilterChanged(true)
  }
  else
  {
    alert("You are Already on Last page\n");
  }
}
 

  // const handleSortChange = (event) => {
  //   setSortField(event.target.value);
  //   onSortChange(event.target.value); // Update parent on sort change
  // };

  // const handleDateChange = (event, dateType) => { // Reusable function for date pickers
  //   if (dateType === 'start') {
  //     setStartDate(event.target.value);
  //   } else if (dateType === 'end') {
  //     setEndDate(event.target.value);
  //   }
  //   // You might want to add validation or processing here
  // };
  

  return (
    <div className="filter-container grid grid-cols-5 gap-4"> {/* Use CSS grid for layout */}
      <div className="filter-item">
        <label htmlFor="location">Location:</label>
        <select id="location" >
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
                type="radio"
                id={`sector-${sector}`}
                value={sector}
                name="selectedSector" // Shared name for radio buttons
                checked={selectedSector === sector} // Check if current sector matches selected one
                // checked={selectedSector.includes(sector)}
                onChange={handleRadioChange}
              />
              <label htmlFor={`sector-${sector}`}>{sector}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-item">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortField}>
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
        <button onClick={onHandleNext}>Next</button>
      </div>
      
    </div>
  );
};

export default FilterComponent;
