"use client"
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Bg from '@/app/components/Bg';
import { useState } from 'react';

export default function Home() {
  const [current, setCurrent] = useState("Home");

  const changecomponent = (comp) =>
  {
    setCurrent(comp);
  }
  return (
    <>
    {/* <Bg/> */}
    <div className="flex max-h-screen">
      <Sidebar changecomponent={changecomponent} current={current} />
      <div className="flex-grow flex bg-[#fff9ea] overflow-y-auto overflow-x-hidden flex-col">
        <Header />
        <MainContent current={current} />
      </div>
    </div>
    </>
  );
}
