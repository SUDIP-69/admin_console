import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  setasverifiedhandler,
  setrejectedhandler,
} from "../utils/utilityfunctions";

const Booking = ({ searchquery }) => {
  console.log(searchquery);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleVerifyClick = async (status, email) => {
    if (confirm("Are you sure you want to mark this as accepted")) {
      if (status === "accepted") {
        toast.error("Cannot accept a accepted request");
        return;
      }
      const success = await setasverifiedhandler(email);
      if (success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.email === email ? { ...item, status: "accepted" } : item
          )
        );
      }
    }
  };

  const handleRejectClick = async (status, email) => {
    if (confirm("Are you sure you want to mark this as cancelled")) {
      if (status === "cancelled") {
        toast.error("Cannot reject a cancelled request");
        return;
      }
      const success = await setrejectedhandler(email, false);
      if (success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.email === email ? { ...item, status: "cancelled" } : item
          )
        );
      }
    }
  };

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
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const filteredData = data.filter((row) => {
    return (
      row.restaurant_name.toLowerCase().includes(searchquery?.toLowerCase()) &&
      (activeFilter === "all" || row.status === activeFilter)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-44">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
      <div className="border-black relative mt-4">
        <h1 className="text-[#441029] font-semibold pb-3 text-3xl underline underline-offset-8 ">
          Demo Requests{" "}
        </h1>
        <div className="mb-4 flex items-center">
          {["all", "pending", "accepted", "cancelled"].map((filter) => (
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
        <div className="mb-4 flex items-center absolute right-0 top-0 text-[#441029]">
          <label className="mr-2">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 15].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
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
              {currentData.map((row, index) => (
                <tr
                  key={row._id}
                  className="text-[0.8rem] transition duration-200 bg-white/80"
                >
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {row.restaurant_name}
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
                      onClick={() => handleVerifyClick(row.status, row.email)}
                      className={` ${
                        row.status === "accepted"
                          ? "text-white bg-green-500"
                          : "bg-transparent text-green-500 "
                      } px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 transition-transform duration-200 ease-in-out`}
                      aria-label="Accept"
                    >
                      {row.status === "accepted" ? "Accepted" : "Accept"}
                    </span>
                    <span
                      onClick={() => handleRejectClick(row.status, row.email)}
                      className={` ${
                        row.status === "cancelled"
                          ? "text-white bg-red-500"
                          : "bg-transparent text-red-500 "
                      } px-2 py-1 cursor-pointer border-2 rounded-full text-sm hover:scale-110 transition-transform duration-200 ease-in-out`}
                      aria-label="Accept"
                    >
                      {row.status === "cancelled" ? "Rejected" : "Reject"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {number}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;
