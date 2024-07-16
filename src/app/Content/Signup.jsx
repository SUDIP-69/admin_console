import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { setasverifiedhandlersignup } from "../utils/utilityfunctions";

const Signup = ({ searchquery }) => {
  console.log(searchquery);
  const [searchTerm, setSearchTerm] = useState(searchquery || "");
  const [activeFilter, setActiveFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleVerifysignup = async (status, email) => {
    console.log(status,email);
    if (status === true) {
      toast.error("Cannot verify an already verified request");
      return;
    }
    const success = await setasverifiedhandlersignup(email);
    console.log(success);
    if (success) {
      setData((prevData) =>
        prevData.map((item) =>
          item.restaurantemail === email ? { ...item, verified: true } : item
        )
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/getallrestaurantsignup");
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

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredData = data.filter((row) => {
    return (
      row.restaurantname.toLowerCase().includes(searchquery.toLowerCase()) &&
      (activeFilter === "all" || row.verified === activeFilter)
    );
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

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
          Signed up users{" "}
        </h1>

        <div className="mb-4 flex items-center">
          {["all", false, true].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 capitalize rounded-t-lg ${
                activeFilter === filter
                  ? "bg-slate-300/30 text-blue-500 font-semibold"
                  : "bg-transparent border-none text-black"
              }`}
            >
              {filter == "all"
                ? "all"
                : filter == true
                ? "verified"
                : "pending"}
            </button>
          ))}
        </div>
        <div className="mb-4 absolute top-0 right-0 flex text-[#441029]   p-2 justify-end items-center">
          <label className="mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-2 py-1 border rounded"
          >
            {[5, 10, 15].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto -mt-4 rounded-b-xl rounded-e-lg shadow-lg">
          <table className="min-w-full bg-transparent border-spacing-y-2">
            <thead className="sticky top-0 bg-slate-600 text-white">
              <tr>
                <th className="px-4 py-2 border-b">Sl No.</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone No.</th>
                <th className="px-4 py-2 border-b">GSTIN</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr
                  key={row._id}
                  className="transition text-[0.8rem] duration-200 bg-white/90"
                >
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {indexOfFirstRow + index + 1}
                  </td>
                  <td className="px-4  py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {row.restaurantname}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {row.credentials.email ?? row.restaurantemail}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {row.credentials.phoneNo || "NA"}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500">
                    {row.gstin}
                  </td>
                  <td className="px-4 py-2 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 capitalize duration-500">
                    {row.verified == true ? `verified` : `pending`}
                  </td>
                  <td className="px-4 py-5 text-zinc-600 border-b hover:cursor-pointer hover:scale-95 duration-500 flex items-center justify-center gap-2">
                    <span
                      onClick={() =>
                        handleVerifysignup(row.verified, row.restaurantemail)
                      }
                      className={` ${
                        row.verified === true
                          ? "text-white bg-green-500"
                          : "bg-transparent text-green-500"
                      } px-2 py-1 cursor-pointer border-2 border-green-500 rounded-full text-sm hover:scale-110 transition-transform duration-200 ease-in-out`}
                      aria-label="Accept"
                    >
                      {row.verified === true ? "verified" : "verify"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Signup;
