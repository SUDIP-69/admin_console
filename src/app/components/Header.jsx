"use client";
import React from "react";

const Header = ({forwardsearchquery}) => {
  const handlechange = (e) => {
    console.log(e.target.value);
    forwardsearchquery(e.target.value);
  };

  return (
    <div className="flex z-10 hover:cursor-pointer hover:scale-95 duration-500 w-fit fixed right-6 top-1 justify-end p-4 bg-transparent text-white ">
      <input
        type="text"
        onChange={handlechange}
        placeholder="Search"
        className="p-2 pl-8 border border-gray-300 bg-transparent rounded-full text-gray-600 focus:outline-none placeholder:text-gray-400/40"
      />
    </div>
  );
};

export default Header;
