/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom"
import Table from "./Table"
import FilterComponent from './FilterComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState,useEffect } from "react"
import { etfsDetails } from "../../services/BackendAPIs/ETFs_API"
import { faArrowLeft, fas, faSearch } from "@fortawesome/free-solid-svg-icons";
function EtfDetails() {
  const {id}=useParams() //{ } object with 65
  const [data,setTableData]=useState();
  const[filterData,setFilterData]=useState();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const etfsData= async ()=> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/services/update-etfstocks/?etfname=${id}&page=${currentPage}`)
        const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      alert(error);
      console.log(error);
        
    }
};
  useEffect(() => {
    etfsData().then((res)=>{
      console.log("etfs data-> Table\n");
      // console.log(res);
      setTableData(res);
    })
  },[data]);
  function onHandlePrev(e){
    console.log("Previous Table\n");
    setCurrentPage(currentPage-1)
  }
  function onHandleNext(e){
    console.log("Next data clickes Table\n");
    setCurrentPage(currentPage+1)
  }
  
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-4">
    <div className="w-full bg-white text-primary">
        <h1 className="text-2xl font-bold pt-4 mt-10 text-justify selection:none ml-2">ETF / {id}</h1>
      </div>
      <section className="mt-6" id="table">
      <div className="flex justify-between items-center p-4">
          {/* <h1 className="text-2xl font-bold"> </h1> */}
          <div className="flex space-x-4 text-black">
          <div className="filters">

            <FilterComponent onFilterChange={undefined} onSortChange={undefined} />
          </div>
          <input
          type="text"
        className="product-textbox clearable p-2 h-[30px]"
        placeholder="Filter list by keyword"
        // value={filter}
        // onChange={handleFilterChange}
      />
       <button className='h-8 text-[12px] p-2 text-white rounded bg-primary'>Apply</button>
      
           </div>
        </div>
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <Table data={data}/>
        <div className="flex justify-center p-12 items-center">
  <div className="mr-32">
    <button className=" px-4 py-2 rounded-md bg-primary text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onHandlePrev}>
     
    &larr;  Prev
    </button>
  </div>
  <div className="ml-32">
    <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onHandleNext}>
      Next &rarr;
    </button>
  </div>
</div>

        </div>
        <div className="text-center text-primary text-4xl p-10 font-semibold justify-center">
          ...
        </div>
      </section>
      <section id="Pagination" className="mt-6">

      </section>
    </div>
  )

}

export default EtfDetails

// /*      {/* Pagination and controls */}
// <div className="flex justify-center items-center mt-4">
//   <div className="mr-4">
//     {rowsPerPage === 5 ? (
//       <button
//         className="px-4 py-2 border border-gray-300 rounded-md bg-primary text-white hover:bg-secondary"
//         onClick={showMore}
//       >
//         + Show More
//       </button>
//     ) : (
//       <button
//         className="px-4 py-2 border border-grey rounded-md text-primary bg-white hover:text-secondary hover: bg-primary"
//         onClick={showLess}
//       >
//         - Show Less
//       </button>
//     )}
//   </div>
//   <div className="flex">
//     <select
//       className="px-3 py-2 rounded-md mr-2 text-black"
//       value={rowsPerPage}
//       onChange={handleRowsPerPageChange}
//     >
//       <option value="5">5</option>
//       <option value="10">10</option>
//       <option value="20">20</option>
//       <option value="50">50</option>
//       <option value={tableData.length}>All</option>
//     </select>
//     <div className="flex">
//       <button
//         className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'bg-grey text-white' : 'bg-white text-black'
//         } hover:bg-gray-300`}
//         onClick={() => handlePageChange(1)}
//         disabled={currentPage === 1}
//       >
//         &lt;
//       </button>
//       <div className="flex-grow text-right">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={`px-3 py-2 rounded-md ${
//               currentPage === index + 1 ? 'bg-green-700 text-white' : 'bg-white text-black'
//             } hover:bg-green-600`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <button
//         className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'bg-grey text-white' : 'bg-white text-black'
//         } hover:bg-grey`}
//         onClick={() => handlePageChange(totalPages)}
//         disabled={currentPage === totalPages}
//       >
//         &gt;
//       </button>
//     </div>
//   </div>
// </div>
        
//         {/* Informational footer */}
//         <div className="p-4">
//           <p className="text-sm text-gray-500">Holdings are subject to change.</p>
//         </div> */
