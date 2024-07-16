"use client";
import {
  Dashboard,
  Group,
  Payment,
  Restaurant,
  Settings,
  Bookmarks,
  LogoutTwoTone,
  PlaylistAdd,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

const Sidebar = ({ current, changecomponent }) => {
  const [selectedItem, setSelectedItem] = useState(current || "Home");

  useEffect(() => {
    setSelectedItem(current);
  }, [current]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    changecomponent(item);
  };

  return (
    <div className="text-white bg-gradient-to-b from-[#0d5b528e] overflow-y-auto scrollbar-hidden via-[#191920] max-h-screen h-screen flex flex-col z-1 p-5 pb-0 lg:w-1/5 shadow-xl shadow-white/70">
      <div className="text-center mb-10">
        <span
          className="text-2xl font-bold hover:cursor-pointer"
          onClick={() => handleItemClick("Home")}
        >
          Baksish.
        </span>
        <hr />
      </div>
      <div className="flex justify-center items-center flex-col">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
          alt="logo"
          width={40}
          height={40}
          className="hover:cursor-pointer"
        />
        <p className="font-bold uppercase text-lg mt-3 -mb-1 cursor-default">admin</p>
        <p className="font-medium text-white/30 text-[12px] cursor-default">
          Product Designer
        </p>
      </div>
      <div className="mt-10">
        {[
          { name: "Dashboard", icon: Dashboard },
          { name: "Team", icon: Group },
          { name: "Booking", icon: Bookmarks },
          { name: "Signup", icon: PlaylistAdd },
          { name: "Restaurants", icon: Restaurant },
          { name: "Payment", icon: Payment },
          { name: "Settings", icon: Settings },
        ].map((item) => (
          <div
            key={item.name}
            className={`flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 py-2 px-3 rounded-full ${
              selectedItem === item.name ? "bg-white/30" : "hover:bg-white/10"
            }`}
            onClick={() => handleItemClick(item.name)}
          >
            <item.icon className="mr-3" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto sticky bottom-2 mx-auto hover:scale-95 duration-500">
        <div className="bg-white/30 backdrop-blur-sm p-3 rounded-lg flex items-center hover:cursor-pointer">
          <LogoutTwoTone className="" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
