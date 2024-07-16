"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

export default function Home() {
  const [searchquery, setsearchquery] = useState("");
  const [current, setCurrent] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const forwardsearchquery = (query) => {
    setsearchquery(query);
  };

  const changecomponent = (comp) => {
    setCurrent(comp);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex max-h-screen">
        <Sidebar 
          changecomponent={changecomponent} 
          current={current} 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        <div className="bg-[#fff9ea] w-full overflow-y-auto overflow-x-hidden flex-col">
          <Header forwardsearchquery={forwardsearchquery} toggleSidebar={toggleSidebar}/>
          <MainContent current={current} searchquery={searchquery} />
        </div>
      </div>
    </>
  );
}
