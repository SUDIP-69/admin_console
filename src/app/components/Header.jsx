"use client";
import React from "react";

const Header = ({forwardsearchquery}) => {
  const handlechange = (e) => {
    console.log(e.target.value);
    forwardsearchquery(e.target.value);
  };

  return (
    <div className="flex hover:cursor-pointer w-fit absolute right-6 top-1 justify-end p-4 bg-transparent text-white ">
      <input
        type="text"
        onChange={handlechange}
        placeholder="Search"
        className="p-2 pl-8 border border-gray-600 bg-transparent rounded-full text-gray-600 focus:outline-none placeholder:text-gray-800/40"
      />
    </div>
  );
};

export default Header;
