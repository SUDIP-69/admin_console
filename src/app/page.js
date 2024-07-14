"use client";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { useState } from "react";

export default function Home() {
  const [searchquery, setsearchquery] = useState("");
  const [current, setCurrent] = useState("Home");

  const forwardsearchquery = (query) => {
    setsearchquery(query);
  };

  const changecomponent = (comp) => {
    setCurrent(comp);
  };
  return (
    <>
      {/* <Bg/> */}
      <div className="flex max-h-screen">
        <Sidebar changecomponent={changecomponent} current={current} />
        <div className="bg-[#fff9ea] w-full overflow-y-auto overflow-x-hidden flex-col">
          <Header forwardsearchquery={forwardsearchquery}/>
          <MainContent current={current} searchquery={searchquery} />
        </div>
      </div>
    </>
  );
}
