"use client";
import Booking from "../Content/Booking";
import Dashboard from "../Content/Dashboard";
import Home from "../Content/Home";
import Payment from "../Content/Payment";
import Restaurants from "../Content/Restaurants";
import Settings from "../Content/Settings";
import Signup from "../Content/Signup";
import Team from "../Content/Team";
import React, { useState } from "react";

function MainContent({ current }) {
  const renderpage = () => {
    switch (current) {
      case "Dashboard":
        return (
          <>
            <Dashboard />
          </>
        );

      case "Team":
        return (
          <>
            <Team />
          </>
        );
      case "Payment":
        return (
          <>
            <Payment />
          </>
        );

      case "Restaurants":
        return (
          <>
            <Restaurants />
          </>
        );

      case "Settings":
        return (
          <>
            <Settings />
          </>
        );

      case "Booking":
        return (
          <>
            <Booking />
          </>
        );

      case "Home":
        return (
          <>
            <Home />
          </>
        );

      case "Signup":
        return (
          <>
            <Signup />
          </>
        );

      default:
        return (
          <>
            <Home />
          </>
        );
    }
  };

  return (
    <div className="bg-gradient-to-tl  from-[#f5c0023f] via-[#FFF9EA] h-screen">
      <div className=" h-screen  overflow-x-hidden overflow-y-auto ">
        <div className="text-white   p-10">{renderpage()}</div>
      </div>
    </div>
  );
}

export default MainContent;
