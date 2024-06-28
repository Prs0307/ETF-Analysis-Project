/* eslint-disable no-unused-vars */
// import React from 'react'
import { Link } from 'react-router-dom';
import SearchBox from '../basic_componenTS/Search';
import CardApp from '../Cards/CardApp';
export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl px-1 py-2 min-h-screen">
    <div className="flex flex-col items-center justify-center  bg-gray-100 mt-12">
        <div className="text-primary text-2xl mt-4 items-center">
            <div className="hero text-center">
                <h1 className=" font-bold text-5xl  p-8">
                The Modern ETF Screener</h1>
                <p className=' capitalize'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta veritatis dolore deleniti.
                </p>
                <div className="align-baseline">
                   <div className='p-12 '>
                   <SearchBox />
                   </div>
                </div>
                <div>  <CardApp />{/* Display your card component */}</div>
            </div>
        </div>
    </div>
</div>

     
    );
}

