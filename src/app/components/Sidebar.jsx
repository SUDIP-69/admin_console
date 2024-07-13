import { Dashboard, Group, Payment, Restaurant, Settings, Create, Bookmarks, LogoutTwoTone } from '@mui/icons-material';
import Image from 'next/image';
// import logo from '../public/logo.svg';

const Sidebar = ({current,changecomponent}) => {
  return (
    <div className="text-white bg-gradient-to-b from-[#0d5b528e] overflow-y-auto scrollbar-hidden  via-[#191920] max-h-screen h-screen flex flex-col  z-1 p-5 w-1/5 shadow-xl shadow-white/70">
      <div className="text-center mb-10">
        {/* <Image src={logo} alt="logo" width={40} height={40} /> */}
        <span className="text-2xl font-bold hover:cursor-pointer" onClick={()=>changecomponent("Home")}>Baksish.</span>
        <hr/>
      </div>
      <div className="ml-5 mt-10">
        <div className="flex items-center mb-10 hover:cursor-pointer hover:scale-95 duration-500" onClick={()=>changecomponent("Dashboard")}>
          <Dashboard className="mr-3" />
          <span>Dashboard</span>
        </div>
        <div className="flex items-center mb-10 hover:cursor-pointer hover:scale-95 duration-500" onClick={()=>changecomponent("Team")}>
          <Group className="mr-3" />
          <span>Teams</span>
        </div>
        <div className="flex items-center mb-10 hover:cursor-pointer hover:scale-95 duration-500" onClick={()=>changecomponent("Booking")}>
          <Bookmarks className="mr-3" />
          <span>New Request</span>
        </div>
        <div className="flex items-center mb-10 hover:cursor-pointer hover:scale-95 duration-500" onClick={()=>changecomponent("Restaurants")}>
          <Restaurant className="mr-3" />
          <span>Restaurants</span>
        </div>
        <div className="flex items-center mb-10 hover:cursor-pointer hover:scale-95 duration-500" onClick={()=>changecomponent("Payment")}>
          <Payment className="mr-3" />
          <span>Payments</span>
        </div>
        <div className="flex items-center mb-10 hover:cursor-pointer hover:scale-95 duration-500" onClick={()=>changecomponent("Settings")}>
          <Settings className="mr-3" />
          <span>Settings</span>
        </div>

      </div>
      <div className="mt-auto sticky bottom-5 mx-auto hover:scale-95 duration-500">
        <div className="bg-white/30 backdrop-blur-sm p-3 rounded-lg flex items-center hover:cursor-pointer">
          <LogoutTwoTone className="" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
