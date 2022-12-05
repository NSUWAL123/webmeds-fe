import React from "react";
import searchicon from "../pictures/icons/searchicon.svg";

const SearchBar = () => {
  return (
    <div className="flex w-screen justify-center font-display mb-5 md:px-10 lg:mb-0 lg:w-[100%] box-border">
      <div className="bg-[#efefef] w-[100%] mx-6 rounded-3xl flex xl:px-3 xl:py-1 shadow-lg ">
        <button className="my-2 mx-4 xl:my-1 xl:ml-1">
          <img src={searchicon} alt="" srcset="" className="xl:w-6" />
        </button>
        <input
          className="text-[14px] bg-[#efefef] w-[75%] outline-none"
          type="text"
          placeholder="Search for Products, Medicine..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
