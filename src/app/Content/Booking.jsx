// components/TableComponent.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { setasverifiedhandler, setrejectedhandler } from "../utils/utilityfunctions";

const Booking = ({ searchquery }) => {
  console.log(searchquery);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleVerifyClick = async (email) => {
    const success = await setasverifiedhandler(email);
    if (success) {
      // Refetch the data from the server or update the status locally
      setData(prevData => prevData.map(item => item.email === email ? { ...item, status: 'accepted' } : item));
    }
  };
  const handleRejectClick = async (email) => {
    const success = await setrejectedhandler(email, false);
    if (success) {
      // Refetch the data from the server or update the status locally
      setData(prevData => prevData.map(item => item.email === email? {...item, status:'cancelled' } : item));
    }
  }

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/getallrequests");
        console.log(data);
        if (data.success) setData(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const filteredData = data.filter((row) => {
    return (
      row.resturant_name.toLowerCase().includes(searchquery?.toLowerCase()) &&
      (activeFilter === "all" || row.status === activeFilter)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-black">
      <Toaster />
      <div className="mb-4 flex items-center">
        {["all", "pending", "accepted","cancelled"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 capitalize rounded-t-lg ${
              activeFilter === filter
                ? "bg-slate-300/30 text-blue-500 font-semibold"
                : "bg-transparent border-none text-black"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto -mt-4 rounded-b-xl rounded-e-lg shadow-lg">
        <table className="min-w-full bg-transparent border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b bg-slate-600">Sl No.</th>
              <th className="px-4 py-2 border-b bg-slate-600">Date</th>
              <th className="px-4 py-2 border-b bg-slate-600">Name</th>
              <th className="px-4 py-2 border-b bg-slate-600">Email</th>
              <th className="px-4 py-2 border-b bg-slate-600">Phone No.</th>
              <th className="px-4 py-2 border-b bg-slate-600">Address</th>
              <th className="px-4 py-2 border-b bg-slate-600">Status</th>
              <th className="px-4 py-2 border-b bg-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row._id} className="transition duration-200 bg-white/80">
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {new Date(row.createdAt).toDateString()}
                </td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {row.resturant_name}
                </td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {row.email}
                </td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {row.phone}
                </td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {row.address}
                </td>
                <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                  {row.status}
                </td>
                <td className="px-4 py-5 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500 flex items-center justify-center gap-2">
                  
                  <span
                    onClick={() => handleVerifyClick(row.email)}
                    className={` ${row.status==='accepted'?'text-white bg-lime-500':"bg-transparent text-lime-500 "} px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 transition-transform duration-200 ease-in-out`}
                    aria-label="Accept"
                  >
                    {row.status==='accepted'?"Accepted":"Accept"}
                  </span>
                  <span
                    onClick={() => handleRejectClick(row.email)}
                    className={` ${row.status==='cancelled'?'text-white bg-rose-500':"bg-transparent text-rose-500 "} px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 transition-transform duration-200 ease-in-out`}
                    aria-label="Accept"
                  >
                    {row.status==='cancelled'?"Rejected":"Reject"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
