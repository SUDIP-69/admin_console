"use client"
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
// import logo from '../public/logo.svg';

const Sidebar = ({ current, changecomponent }) => {
  return (
    <div className="text-white bg-gradient-to-b from-[#0d5b528e] overflow-y-auto scrollbar-hidden  via-[#191920] max-h-screen h-screen flex flex-col  z-1 p-5 pb-0 lg:w-1/5 shadow-xl shadow-white/70">
      <div className="text-center mb-10">
        <span
          className="text-2xl font-bold hover:cursor-pointer"
          onClick={() => changecomponent("Home")}
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
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Dashboard")}
        >
          <Dashboard className="mr-3" />
          <span>Dashboard</span>
        </div>
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Team")}
        >
          <Group className="mr-3" />
          <span>Teams</span>
        </div>
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Booking")}
        >
          <Bookmarks className="mr-3" />
          <span>New Request</span>
        </div>
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Signup")}
        >
          <PlaylistAdd className="mr-3" />
          <span>SignUp Verify</span>
        </div>
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Restaurants")}
        >
          <Restaurant className="mr-3" />
          <span>Restaurants</span>
        </div>
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Payment")}
        >
          <Payment className="mr-3" />
          <span>Payments</span>
        </div>
        <div
          className="flex items-center mb-5 hover:cursor-pointer hover:scale-95 duration-500 hover:bg-white/10 py-2 px-3 rounded-full"
          onClick={() => changecomponent("Settings")}
        >
          <Settings className="mr-3" />
          <span>Settings</span>
        </div>
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