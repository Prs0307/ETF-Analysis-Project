/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { etfList } from "../../services/BackendAPIs/ETFs_API";
import { Link } from "react-router-dom";
import redirectIcon from "../../assets/images/redirectIcon.png"; 

function Search_Recommendations({searchInput}) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

  // Improved function for filtering and state management
  const filterData = () => {
    // Ensure data is loaded before filtering
    if (!data.length) return;

    const filtered = data.filter((item) => {
        
        return item.etf_shortname.toLowerCase().includes(searchInput.toLowerCase());
        
        //filter item in basis if searchInput item["etf_shortname"] and then store in filrer data
    }) 

    setFilteredData(filtered);
  };
//   for handling search input

useEffect(()=>{
    filterData()
},[filterData, searchInput])

  // Handle data fetching or receiving 
  

    useEffect(() => {
      etfList()
        .then((res) => {
          // console.log(res);
  
          setData(res);
  
          // console.log(data);
        })
        .catch((err) => {
          alert(err);
        });
    }, [data]);


    const [isHovered, setIsHovered] = useState(false); 
    const handleWheelCapture = (event) => {
        setIsHovered(true);
        // Optional logic for handling wheel events (e.g., scrolling)
        event.stopPropagation(); // Prevent bubbling of wheel events
      };

  return (
    <div>
      {filteredData ? filteredData.map((item)=>{
       return (
        <div
        onChangeCapture={handleWheelCapture} 
         className={`bg-main-dark mb-1 hover:text-main-light transition text-left pl-5 hover:bg-opacity-90 hover:transition-all ease-in duration-400 p-2 ${
        isHovered ? 'ml-48' : ''}`}
        //   className={`bg-main-dark mb-1  hover:text-main-light transition   text-left pl-5 hover:bg-opacity-90 hover:transition-all ease-in  duration-400   p-2 ${
        //     // Optional animation class (if used)
        //     isHovered ? 'ease-in-out delay-150' : ''
        //   }`}
          key={item.etf_shortname}//key is used as Ticker 
        >
          <Link to={`/etfdetails/${item.etf_shortname}`}>
          {item.etf_shortname}
          <span className="p-2">
            [{item.etf_name}]
           
          </span>
          <span className="icon justify-end">
            <img src={redirectIcon} className={ isHovered ? "ml-36" : "bg-transparent blend-multiply  inline-block" }  alt="" />
          </span>
          
          </Link>
        </div>
      );
      }):null}
    </div>
  )
}

export default Search_Recommendations
