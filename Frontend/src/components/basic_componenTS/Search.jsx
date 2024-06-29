
import { useState } from "react";
import Search_Recommendations from "./Search_Recommendations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBox() {
 
 const [searchInput,setSearchInput]=useState('')
 const [recommendVisibility,setRecommendVisibility] = useState(false)
 function setOnchange(value) {
    if(value) {
        setSearchInput(value);
        setRecommendVisibility(true);
      }
    else{
        setSearchInput('');
        setRecommendVisibility(false);
    }
 }
  return (
    <div className="mb-3 ">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      {/* input */}
      <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="search"
          className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search" 
          value={searchInput}
          onChange={(e)=>{setOnchange(e.target.value)}}
          aria-describedby="button-addon2"
        />

        {/* <!--Search icon--> */}
        {/* <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        > */}
          {/* <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button> */}
        {/* </span> */}

      </div>
      {recommendVisibility?  <div  className="align-baseline text-white w-full border-solid border-primary border-rad h-[200px] text-black no-scrollbar  overflow-scroll " >
<Search_Recommendations  searchInput={searchInput}/>
</div> : null}
     
    </div>
  );
}
