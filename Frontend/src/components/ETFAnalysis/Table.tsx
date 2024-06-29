"use client";
import React, { useState } from 'react';
import FilterComponent from './FilterComponent';
import { etfList } from '../../services/BackendAPIs/ETFs_API';
import { etfsSectors } from '../../services/BackendAPIs/ETFs_API';

// import FilterByDate from './FilterByDate';
interface TableData {
  ticker: string;
  name: string;
  sector: string;
  assetClass: string;
  marketValue: string;
  weight: string;
  notionalValue: string;
  shares: string;
  cusip: string;
  isin: string;
  sedol: string;
  accrualDate: string;
}

const Table: React.FC = () => {
  const tableData: TableData[] = [
    { ticker: 'NVDA', name: 'NVIDIA CORP', sector: 'Information Technology', assetClass: 'Equity', marketValue: '$742,300,179.20', weight: '7.13', notionalValue: '742,300,179.20', shares: '5,872,628.00', cusip: '67066G104', isin: 'US67066G1040', sedol: '2379504', accrualDate: '-' },
    { ticker: 'AVGO', name: 'BROADCOM INC', sector: 'Information Technology', assetClass: 'Equity', marketValue: '$637,365,160.00', weight: '6.13', notionalValue: '637,365,160.00', shares: '400,355.00', cusip: '11135F101', isin: 'US11135F1012', sedol: 'BDZ78H9', accrualDate: '-' },
    { ticker: 'LLY', name: 'ELI LILLY', sector: 'Health Care', assetClass: 'Equity', marketValue: '$604,786,016.70', weight: '5.81', notionalValue: '604,786,016.70', shares: '671,045.00', cusip: '532457108', isin: 'US5324571083', sedol: '2516152', accrualDate: '-' },
    { ticker: 'AMZN', name: 'AMAZON COM INC', sector: 'Consumer Discretionary', assetClass: 'Equity', marketValue: '$478,240,707.64', weight: '4.60', notionalValue: '478,240,707.64', shares: '2,470,124.00', cusip: '023135106', isin: 'US0231351067', sedol: '2000019', accrualDate: '-' },
    { ticker: 'META', name: 'META PLATFORMS INC CLASS A', sector: 'Communication', assetClass: 'Equity', marketValue: '$476,007,569.76', weight: '4.58', notionalValue: '476,007,569.76', shares: '927,673.00', cusip: '30303M102', isin: 'US30303M1027', sedol: 'B7TL820', accrualDate: '-' },
    { ticker: 'JPM', name: 'JPMORGAN CHASE & CO', sector: 'Financials', assetClass: 'Equity', marketValue: '$447,728,002.83', weight: '4.30', notionalValue: '447,728,002.83', shares: '2,267,781.00', cusip: '46625H100', isin: 'US46625H1005', sedol: '2190385', accrualDate: '-' },
    { ticker: 'COST', name: 'COSTCO WHOLESALE CORP', sector: 'Consumer Staples', assetClass: 'Equity', marketValue: '$334,720,261.80', weight: '3.22', notionalValue: '334,720,261.80', shares: '390,645.00', cusip: '22160K105', isin: 'US22160K1051', sedol: '2701271', accrualDate: '-' },
    { ticker: 'GE', name: 'GE AEROSPACE', sector: 'Industrials', assetClass: 'Equity', marketValue: '$302,266,007.04', weight: '2.91', notionalValue: '302,266,007.04', shares: '1,881,636.00', cusip: '369604301', isin: 'US3696043013', sedol: 'BL59CR9', accrualDate: '-' },
    { ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', sector: 'Information Technology', assetClass: 'Equity', marketValue: '$276,686,399.22', weight: '2.66', notionalValue: '276,686,399.22', shares: '1,756,293.00', cusip: '007903107', isin: 'US0079031078', sedol: '2007849', accrualDate: '-' },
    { ticker: 'NFLX', name: 'NETFLIX INC', sector: 'Communication', assetClass: 'Equity', marketValue: '$257,476,117.08', weight: '2.47', notionalValue: '257,476,117.08', shares: '379,932.00', cusip: '64110L106', isin: 'US64110L1061', sedol: '2857817', accrualDate: '-' },
    { ticker: 'AAPL', name: 'APPLE INC', sector: 'Information Technology', assetClass: 'Equity', marketValue: '$2,411,329,542.30', weight: '23.20', notionalValue: '2,411,329,542.30', shares: '1,177,275.00', cusip: '037833100', isin: 'US0378331005', sedol: '2046251', accrualDate: '-' },
    { ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', sector: 'Communication', assetClass: 'Equity', marketValue: '$1,998,454,379.20', weight: '19.24', notionalValue: '1,998,454,379.20', shares: '1,129,568.00', cusip: '02079K305', isin: 'US02079K3059', sedol: 'BYVY8G0', accrualDate: '-' },
    { ticker: 'MSFT', name: 'MICROSOFT CORP', sector: 'Information Technology', assetClass: 'Equity', marketValue: '$1,885,629,408.10', weight: '18.16', notionalValue: '1,885,629,408.10', shares: '6,680,960.00', cusip: '594918104', isin: 'US5949181045', sedol: '2588173', accrualDate: '-' },
    { ticker: 'BABA', name: 'ALIBABA GROUP HOLDING LTD', sector: 'Consumer Discretionary', assetClass: 'Equity', marketValue: '$1,339,726,003.90', weight: '12.90', notionalValue: '1,339,726,003.90', shares: '1,574,220.00', cusip: '01609W102', isin: 'US01609W1027', sedol: 'BK6YZP5', accrualDate: '-' },
    { ticker: 'TSLA', name: 'TESLA INC', sector: 'Consumer Discretionary', assetClass: 'Stocks', marketValue: '$1,010,545,377.60', weight: '9.73', notionalValue: '1,010,545,377.60', shares: '3,222,001.00', cusip: '88160R101', isin: 'US88160R1014', sedol: 'BMT64K2', accrualDate: '-' },
    { ticker: 'V', name: 'VISA INC', sector: 'Information Technology', assetClass: 'Equity', marketValue: '$939,111,183.10', weight: '9.05', notionalValue: '939,111,183.10', shares: '2,137,875.00', cusip: '92826C839', isin: 'US92826C8394', sedol: 'B0TNW45', accrualDate: '-' },
  ];
    // Your table data array remains unchanged
  

  // State variables
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);


  // const [selectedDate, setSelectedDate] = useState<string>('');

  // Calculate total pages based on rowsPerPage
  const totalPages: number = Math.ceil(tableData.length / rowsPerPage);

  // Handlers for page navigation and filtering
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
  //   setSelectedDate(event.target.value);
  // };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value);
  };

  // Calculate visible data based on current page and filter
  const startIndex: number = (currentPage - 1) * rowsPerPage;
  const endIndex: number = startIndex + rowsPerPage;
  const visibleData: TableData[] = tableData
    .filter((data) => data.ticker.toLowerCase().includes(filter.toLowerCase()))
    .slice(startIndex, endIndex);

  // Function to show more or fewer rows
  const showMore = () => {
    setRowsPerPage(tableData.length);
    setCurrentPage(1);
  };

  const showLess = () => {
    setRowsPerPage(5);
    setCurrentPage(1);
  };

  function applyFilters(filter: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex justify-center items-center h-[100] bg-white ">
      <div className="w-full bg-white shadow-md rounded-lg no-scrollbar  overflow-scroll no-scrollbar" style={{ boxShadow: '1px 14px 6px rgba(0, 0, 0, 0.1)' }}>
        {/* Table header with title and filter */}
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
        value={filter}
        onChange={handleFilterChange}
      />
       <button className='h-8 text-[12px] p-2 text-white rounded bg-primary' onClick={() => applyFilters(filter)}>Apply</button>
      
           </div>
        </div>
        
        {/* Table body with scrollable content */}
        <div className="overflow-x-auto overflow-y-auto h-96 shadow-xl">
          <table className="w-full divide-y divide-secondary text-black">
            <thead className="bg-white text-black sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ticker</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Asset Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Market Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Weight (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Notional Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Shares</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CUSIP</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ISIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SEDOL</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Accrual Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {visibleData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#c3e4f2]'}>
                  <td className="px-6 py-4 whitespace-nowrap">{data.ticker}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.assetClass}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.marketValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.notionalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.shares}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.cusip}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.isin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.sedol}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.accrualDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      {/* Pagination and controls */}
<div className="flex justify-center items-center mt-4">
  <div className="mr-4">
    {rowsPerPage === 5 ? (
      <button
        className="px-4 py-2 border border-gray-300 rounded-md bg-primary text-white hover:bg-secondary"
        onClick={showMore}
      >
        + Show More
      </button>
    ) : (
      <button
        className="px-4 py-2 border border-grey rounded-md text-primary bg-white hover:text-secondary hover: bg-primary"
        onClick={showLess}
      >
        - Show Less
      </button>
    )}
  </div>
  <div className="flex">
    <select
      className="px-3 py-2 rounded-md mr-2 text-black"
      value={rowsPerPage}
      onChange={handleRowsPerPageChange}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value={tableData.length}>All</option>
    </select>
    <div className="flex">
      <button
        className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'bg-grey text-white' : 'bg-white text-black'
        } hover:bg-gray-300`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className="flex-grow text-right">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded-md ${
              currentPage === index + 1 ? 'bg-green-700 text-white' : 'bg-white text-black'
            } hover:bg-green-600`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'bg-grey text-white' : 'bg-white text-black'
        } hover:bg-grey`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  </div>
</div>
        
        {/* Informational footer */}
        <div className="p-4">
          <p className="text-sm text-gray-500">Holdings are subject to change.</p>
        </div>
      </div>
    </div>
  );
};

export default Table;